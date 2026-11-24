"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiPost, apiUpload } from "../../lib/api";

const input =
  "min-h-12 w-full rounded-lg border border-[#254357] bg-[#071b2b] px-4 text-white placeholder:text-[#71899a] outline-none transition focus:border-[#D5B779] focus:ring-1 focus:ring-[#D5B779]";
const label = "text-sm font-semibold text-[#F4F7FA]";

export default function SubmitDealPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"link" | "qr">("link");
  const [message, setMessage] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Read form values before any await
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "").trim();
    const expires = String(fd.get("expires_on") ?? "");

    setMessage("");
    setNeedsLogin(false);
    setBusy(true);

    try {
      if (mode === "link") {
        const url = String(fd.get("url") ?? "").trim();
        let valid = false;
        try {
          valid = /^https?:$/.test(new URL(url).protocol);
        } catch {}
        if (!valid) {
          setMessage("Enter a valid link starting with http:// or https://.");
          return;
        }
        await apiPost("/deals", { title, url, expires_on: expires || null });
      } else {
        const file = fd.get("file");
        if (!(file instanceof File) || file.size === 0) {
          setMessage("Choose a QR code image to upload.");
          return;
        }
        const body = new FormData();
        body.append("file", file);
        body.append("title", title);
        if (expires) body.append("expires_on", expires); // an empty string would fail date parsing
        await apiUpload("/deals/qr", body);
      }
      router.push("/catalog");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setNeedsLogin(/authenticated|session/i.test(msg));
      setMessage(msg);
    } finally {
      setBusy(false);
    }
  }

  const tab = (active: boolean) =>
    `flex-1 min-h-11 rounded-lg px-4 font-bold transition-colors ${
      active ? "bg-[#D5B779] text-[#071B2B]" : "text-[#B8C7D3] hover:bg-[#103A52]"
    }`;

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#254357] bg-[#0d293d]/90 p-8 shadow-2xl shadow-black/20 sm:p-10">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#D5B779]">
          Share a deal
        </p>
        <h1 className="mb-6 text-center text-3xl font-bold text-white">Submit a Deal</h1>

        <div className="mb-6 flex gap-2 rounded-xl border border-[#254357] bg-[#071b2b] p-1" role="tablist">
          <button type="button" role="tab" aria-selected={mode === "link"} onClick={() => setMode("link")} className={tab(mode === "link")}>
            Link
          </button>
          <button type="button" role="tab" aria-selected={mode === "qr"} onClick={() => setMode("qr")} className={tab(mode === "qr")}>
            QR code
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className={label}>Deal title</label>
            <input id="title" name="title" type="text" required maxLength={150} placeholder="e.g. 15% off marine paint" className={input} />
          </div>

          {mode === "link" ? (
            <div className="flex flex-col gap-2">
              <label htmlFor="url" className={label}>Deal link</label>
              <input id="url" name="url" type="text" required placeholder="https://..." className={input} />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label htmlFor="file" className={label}>QR code image</label>
              <input id="file" name="file" type="file" accept="image/*" required className={`${input} py-2.5`} />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="expires_on" className={label}>Expiration date (optional)</label>
            <input id="expires_on" name="expires_on" type="date" className={input} />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-2 min-h-12 rounded-lg bg-[#D5B779] px-5 py-3 font-bold text-[#071B2B] transition-colors hover:bg-[#E7CB91] disabled:opacity-60"
          >
            {busy ? "Submitting..." : "Submit Deal"}
          </button>

          {message && (
            <p role="alert" className="text-center text-sm text-[#D5B779]">
              {message}{" "}
              {needsLogin && (
                <Link href="/login" className="font-bold underline">
                  Sign in
                </Link>
              )}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}