"use client";

import Link from "next/link";
import { useState } from "react";
import { apiPost } from "../../lib/api";

export default function FeedbackPage() {
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = text.trim();
    if (!message) {
      setNotice("Please write a message first.");
      return;
    }

    setBusy(true);
    setNotice("");
    setSent(false);
    setNeedsLogin(false);

    try {
      await apiPost("/feedback", { message });
      setText("");
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not send feedback.";
      setNeedsLogin(/authenticated|session/i.test(msg));
      setNotice(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-[#254357] bg-[#0d293d]/90 p-8 shadow-2xl shadow-black/20 sm:p-10">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#D5B779]">
          We’re listening
        </p>
        <h1 className="mb-3 text-center text-3xl font-bold text-white">Send Feedback</h1>
        <p className="mb-6 text-center text-sm leading-relaxed text-[#B8C7D3]">
          Found a problem or have an idea? Let us know and we’ll take a look.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="feedback" className="text-sm font-semibold text-[#F4F7FA]">
              Your message
            </label>
            <textarea
              id="feedback"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={2000}
              rows={6}
              required
              placeholder="Tell us what happened or what you’d like to see..."
              className="rounded-lg border border-[#254357] bg-[#071b2b] px-4 py-3 text-white placeholder:text-[#71899a] outline-none transition focus:border-[#D5B779] focus:ring-1 focus:ring-[#D5B779]"
            />
            <p className="text-right text-xs text-[#B8C7D3]">{text.length}/2000</p>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="min-h-12 rounded-lg bg-[#D5B779] px-5 py-3 font-bold text-[#071B2B] transition-colors hover:bg-[#E7CB91] disabled:opacity-60"
          >
            {busy ? "Sending..." : "Send Feedback"}
          </button>

          {sent && (
            <p role="status" className="text-center text-sm text-[#D5B779]">
              Thanks for your feedback!
            </p>
          )}
          {notice && (
            <p role="alert" className="text-center text-sm text-[#D5B779]">
              {notice}{" "}
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