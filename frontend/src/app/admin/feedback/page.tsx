"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "../../../lib/api";

type Entry = {
  id: number;
  date: string;
  message: string;
  user: { id: number; name: string; email: string };
};

type View = "loading" | "login" | "denied" | "error" | "ready";

// The backend sends UTC timestamps without a "Z", so add one before parsing
function formatDate(iso: string) {
  const hasZone = iso.endsWith("Z") || /[+-]\d\d:\d\d$/.test(iso);
  return new Date(hasZone ? iso : `${iso}Z`).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminFeedbackPage() {
  const [view, setView] = useState<View>("loading");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let me;
      try {
        me = await apiGet("/me");
      } catch (err) {
        if (!cancelled) setView(err instanceof TypeError ? "error" : "login");
        return;
      }

      if (!me.is_admin) {
        if (!cancelled) setView("denied");
        return;
      }

      try {
        const data: Entry[] = await apiGet("/feedback");
        if (!cancelled) {
          setEntries(data);
          setView("ready");
        }
      } catch {
        if (!cancelled) setView("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const box = "rounded-2xl border border-[#254357] bg-[#0D293D] px-6 py-12 text-center";

  return (
    <div className="min-h-screen bg-[#071B2B]">
      <section className="mx-auto max-w-4xl px-6 py-10 md:py-16">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#D5B779]">Admin</p>
        <h1 className="mb-8 text-4xl font-bold text-white">User Feedback</h1>

        {view === "loading" && <p className="text-[#B8C7D3]">Loading...</p>}

        {view === "login" && (
          <div className={box}>
            <p className="text-[#B8C7D3]">Please sign in to continue.</p>
            <Link href="/login" className="mt-4 inline-block font-bold text-[#D5B779] underline">
              Sign in
            </Link>
          </div>
        )}

        {view === "denied" && (
          <div className={box}>
            <h2 className="text-2xl font-bold text-white">Access denied</h2>
            <p className="mt-2 text-[#B8C7D3]">Only system administrators can view feedback.</p>
          </div>
        )}

        {view === "error" && (
          <div className={box} role="alert">
            <p className="text-[#D5B779]">Couldn’t load feedback. Is the backend running?</p>
          </div>
        )}

        {view === "ready" &&
          (entries.length === 0 ? (
            <div className={box}>
              <p className="text-[#B8C7D3]">No feedback has been submitted yet.</p>
            </div>
          ) : (
            <>
              <p role="status" className="mb-4 text-sm text-[#B8C7D3]">
                {entries.length} {entries.length === 1 ? "entry" : "entries"}, newest first
              </p>
              <ul className="flex flex-col gap-4">
                {entries.map((entry) => (
                  <li key={entry.id} className="rounded-2xl border border-[#254357] bg-[#0D293D] p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#254357] pb-3 text-sm">
                      <span className="font-bold text-white">
                        {entry.user.name}{" "}
                        <span className="font-normal text-[#B8C7D3]">({entry.user.email})</span>
                      </span>
                      <time className="text-[#D5B779]">{formatDate(entry.date)}</time>
                    </div>
                    <p className="whitespace-pre-wrap break-words leading-relaxed text-[#F4F7FA]">
                      {entry.message}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ))}
      </section>
    </div>
  );
}