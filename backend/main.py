from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Harbour Island Deals is running!"}