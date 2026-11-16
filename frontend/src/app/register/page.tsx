
"use client";

import Link from "next/link";
import { useState } from "react";
import UiIcon from "../../components/UiIcon";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Registration is not connected to authentication yet.");
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#254357] bg-[#0d293d]/90 p-8 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-10">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5B779]/50 bg-[#103A52] text-[#D5B779]">
            <UiIcon name="users" size={32} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D5B779]">
            Join Our Community
          </p>

          <h1 className="text-3xl font-bold text-white">
            Create an Account
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#B8C7D3]">
            Join Harbour Island Deals and keep your favorite maritime deals in one place.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-[#F4F7FA]">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              required
              className="min-h-12 rounded-lg border border-[#254357] bg-[#071b2b] px-4 text-white placeholder:text-[#71899a] outline-none transition focus:border-[#D5B779] focus:ring-1 focus:ring-[#D5B779]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-[#F4F7FA]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="min-h-12 rounded-lg border border-[#254357] bg-[#071b2b] px-4 text-white placeholder:text-[#71899a] outline-none transition focus:border-[#D5B779] focus:ring-1 focus:ring-[#D5B779]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-[#F4F7FA]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              minLength={8}
              required
              className="min-h-12 rounded-lg border border-[#254357] bg-[#071b2b] px-4 text-white placeholder:text-[#71899a] outline-none transition focus:border-[#D5B779] focus:ring-1 focus:ring-[#D5B779]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-[#F4F7FA]">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              minLength={8}
              required
              className="min-h-12 rounded-lg border border-[#254357] bg-[#071b2b] px-4 text-white placeholder:text-[#71899a] outline-none transition focus:border-[#D5B779] focus:ring-1 focus:ring-[#D5B779]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#D5B779] px-5 py-3 font-bold text-[#071B2B] transition-colors hover:bg-[#E7CB91] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Create Account
            <UiIcon name="chevron-right" size={19} />
          </button>

          {message && (
            <p role="status" className="text-center text-sm text-[#D5B779]">
              {message}
            </p>
          )}
        </form>

        <div className="mt-8 border-t border-[#254357] pt-6 text-center">
          <p className="text-sm text-[#B8C7D3]">
            Already have an account?
          </p>
          <Link
            href="/login"
            className="mt-2 inline-block font-bold text-[#D5B779] transition-colors hover:text-[#E7CB91]"
          >
            Sign In
          </Link>
        </div>

      </div>
    </main>
  );
}
