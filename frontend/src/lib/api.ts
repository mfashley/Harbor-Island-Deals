export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function handle(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    let detail = "Something went wrong.";
    if (typeof data.detail === "string") {
      detail = data.detail;
    } else if (Array.isArray(data.detail)) {
      detail =
        data.detail
          .map((d: { msg?: string }) => d.msg)
          .filter(Boolean)
          .join(" ") || detail;
    }
    throw new Error(detail);
  }
  return data;
}

export async function apiPost(path: string, body: unknown) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return handle(res);
}

// For file uploads: do NOT set Content-Type, the browser adds the multipart boundary
export async function apiUpload(path: string, body: FormData) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    body,
  });
  return handle(res);
}

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`, { credentials: "include" });
  return handle(res);
}