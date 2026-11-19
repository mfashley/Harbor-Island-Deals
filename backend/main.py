import os
from datetime import date, datetime, timedelta, timezone
from typing import Optional

import re
import bcrypt
import cv2
import jwt
import numpy as np
from fastapi import Cookie, Depends, FastAPI, File, Form, HTTPException, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, HttpUrl, TypeAdapter, ValidationError
from sqlalchemy import Boolean, Date, DateTime, ForeignKey, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

SECRET_KEY = os.getenv("SECRET_KEY", "dev-only-change-me")
ALGORITHM = "HS256"
TOKEN_HOURS = 24
COOKIE_NAME = "access_token"

# ---------- Database ----------
engine = create_engine("sqlite:///./app.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, server_default="0")

class Deal(Base):
    __tablename__ = "deals"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150))
    url: Mapped[str] = mapped_column(String(2048))
    expires_on: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    source: Mapped[str] = mapped_column(String(10))  # "link" or "qr"
    submitted_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

class Feedback(Base):
    __tablename__ = "feedback"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    message: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )


Base.metadata.create_all(engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- Schemas ----------
class RegisterIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)  # bcrypt limit is 72 bytes


class LoginIn(BaseModel):
    email: EmailStr
    password: str

class DealIn(BaseModel):
    title: str = Field(min_length=1, max_length=150)
    url: HttpUrl  # rejects anything that isn't a valid http(s) URL
    expires_on: date | None = None


class FeedbackIn(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


MAX_QR_BYTES = 5 * 1024 * 1024


def deal_out(d: Deal) -> dict:
    return {
        "id": d.id,
        "title": d.title,
        "url": d.url,
        "expires_on": d.expires_on.isoformat() if d.expires_on else None,  # story 7
        "expired": bool(d.expires_on and d.expires_on < date.today()),
        "source": d.source,
        "created_at": d.created_at.isoformat(),
    }





# ---------- App ----------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_token(user_id: int) -> str:
    expires = datetime.now(timezone.utc) + timedelta(hours=TOKEN_HOURS)
    return jwt.encode({"sub": str(user_id), "exp": expires}, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
) -> User:
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        user = db.get(User, int(payload["sub"]))
    except (jwt.PyJWTError, KeyError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid or expired session.")
    if not user:
        raise HTTPException(status_code=401, detail="User not found.")
    return user

def require_admin(user: User = Depends(get_current_user)) -> User:
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admins only.")
    return user    


@app.get("/")
def home():
    return {"message": "Harbour Island Deals is running!"}


@app.post("/register", status_code=201)
def register(data: RegisterIn, db: Session = Depends(get_db)):
    email = data.email.lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="An account with that email already exists.")

    hashed = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt()).decode()
    user = User(name=data.name.strip(), email=email, password_hash=hashed)
    db.add(user)
    db.commit()
    return {"message": "Account created."}


@app.post("/login")
def login(data: LoginIn, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email.lower()).first()
    if not user or not bcrypt.checkpw(data.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    response.set_cookie(
        key=COOKIE_NAME,
        value=create_token(user.id),
        httponly=True,
        samesite="lax",
        secure=False,  # set True when served over HTTPS in production
        max_age=TOKEN_HOURS * 3600,
    )
    return {"id": user.id, "name": user.name, "email": user.email}


@app.post("/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE_NAME)
    return {"message": "Logged out."}


@app.get("/me")
def me(user: User = Depends(get_current_user)):
    return {"id": user.id, "name": user.name, "email": user.email, "is_admin": user.is_admin}

# ---------- Deals (stories 7, 10, 11) ----------
@app.get("/deals")
def list_deals(db: Session = Depends(get_db)):
    deals = db.query(Deal).order_by(Deal.created_at.desc()).all()
    return [deal_out(d) for d in deals]


@app.post("/deals", status_code=201)  # story 11
def submit_deal(
    data: DealIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    deal = Deal(
        title=data.title.strip(),
        url=str(data.url),
        expires_on=data.expires_on,
        source="link",
        submitted_by=user.id,
    )
    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal_out(deal)


@app.post("/deals/qr", status_code=201)  # story 10
async def submit_deal_qr(
    file: UploadFile = File(...),
    title: str = Form(..., min_length=1, max_length=150),
    expires_on: date | None = Form(None),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    contents = await file.read()
    if len(contents) > MAX_QR_BYTES:
        raise HTTPException(status_code=413, detail="Image too large (5 MB max).")

    img = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="That file is not a valid image.")

    text, _, _ = cv2.QRCodeDetector().detectAndDecode(img)
    if not text:
        raise HTTPException(status_code=400, detail="No readable QR code found.")

        text = text.strip()

    if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*://", text):
        candidate = text  # already has a scheme
    elif re.match(r"^(www\.)?[\w-]+(\.[\w-]+)+(/\S*)?$", text):
        candidate = f"https://{text}"  # looks like a bare domain/link
    else:
        candidate = text  # will fail validation below

    try:
        url = str(TypeAdapter(HttpUrl).validate_python(candidate))
    except ValidationError:
        raise HTTPException(
            status_code=400,
            detail=f"QR code contains “{text[:60]}”, which is not a web link.",
        )

    deal = Deal(
        title=title.strip(),
        url=url,
        expires_on=expires_on,
        source="qr",
        submitted_by=user.id,
    )
    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal_out(deal)


# ---------- Feedback (story 12) ----------
@app.post("/feedback", status_code=201)
def submit_feedback(
    data: FeedbackIn,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.add(Feedback(user_id=user.id, message=data.message.strip()))
    db.commit()
    return {"message": "Thanks for your feedback."}


@app.get("/feedback")
def list_feedback(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    rows = (
        db.query(Feedback, User)
        .join(User, Feedback.user_id == User.id)
        .order_by(Feedback.created_at.desc())
        .all()
    )
    return [
        {
            "id": f.id,
            "date": f.created_at.isoformat(),
            "message": f.message,
            "user": {"id": u.id, "name": u.name, "email": u.email},
        }
        for f, u in rows
    ]