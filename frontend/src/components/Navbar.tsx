
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../lib/api";
import UiIcon from "./UiIcon";

const navLinks = [
  { name: "Home", href: "/", icon: "home" as const },
  { name: "About", href: "/about", icon: "info" as const },
  { name: "Catalog", href: "/catalog", icon: "tag" as const },
  { name: "Help", href: "/help", icon: "help" as const },
  { name: "Submit", href: "/submit", icon: "tag" as const },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const router = useRouter();
const [user, setUser] = useState<{ id: number; name: string; email: string; is_admin: boolean } | null>(null);

// Re-check the session on every page change, so the navbar updates right after login
useEffect(() => {
  let cancelled = false;
  apiGet("/me")
    .then((data) => {
      if (!cancelled) setUser(data);
    })
    .catch(() => {
      if (!cancelled) setUser(null);
    });
  return () => {
    cancelled = true;
  };
}, [pathname]);

async function handleLogout() {
  try {
    await apiPost("/logout", {});
  } finally {
    setUser(null);
    setAccountOpen(false);
    router.push("/");
    router.refresh();
  }
}

  return (
    <header className="sticky top-0 z-50 border-b border-[#547084]/30 bg-[#071b2b]/75 shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-5"
      >
        <div className="flex min-h-20 items-center justify-between gap-4">

          <Link
            href="/"
            className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B779]"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D5B779]/50 bg-[#103A52]/50 text-[#D5B779] shadow-inner shadow-[#1c6378]/20">
              <UiIcon name="compass" size={29} />
            </div>

            <div>
              <span className="block text-lg font-bold tracking-[0.12em] text-[#F4F7FA]">
                HARBOUR ISLAND
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.22em] text-[#D5B779]">
                DEALS, DISCOVERIES, & DISCOUNTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-12 items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5B779] ${
                    active
                      ? "bg-[#1c6378]/25 text-[#D5B779]"
                      : "text-[#B8C7D3] hover:bg-[#103A52]/60 hover:text-white"
                  }`}
                >
                  <UiIcon name={link.icon} size={20} />
                  {link.name}

                  {active && (
                    <span className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-[#D5B779]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Account Menu */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setAccountOpen(!accountOpen)}
              aria-label="Account menu"
              aria-expanded={accountOpen}
              aria-controls="account-dropdown"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D5B779]/50 bg-[#103A52]/50 text-[#D5B779] transition-all hover:border-[#D5B779] hover:bg-[#1c6378]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B779]"
            >
              <UiIcon name="user" size={25} />
            </button>

            {accountOpen && (
  <div
    id="account-dropdown"
    className="absolute right-0 top-16 z-50 w-64 rounded-xl border border-[#547084]/50 bg-[#0d293d] p-4 shadow-2xl shadow-black/30"
  >
    {user ? (
      <>
  <div className="mb-4 border-b border-[#254357] pb-4">
    <p className="font-bold text-white">Hi, {user.name.split(" ")[0]}!</p>
    <p className="mt-1 truncate text-sm text-[#B8C7D3]">{user.email}</p>
  </div>

  <div className="flex flex-col gap-2">
    <Link
      href="/feedback"
      onClick={() => setAccountOpen(false)}
      className="flex min-h-11 items-center justify-center rounded-lg border border-[#547084]/60 px-4 py-2 font-semibold text-[#F4F7FA] transition-colors hover:bg-[#103A52]"
    >
      Give Feedback
    </Link>

    {user.is_admin && (
      <Link
        href="/admin/feedback"
        onClick={() => setAccountOpen(false)}
        className="flex min-h-11 items-center justify-center rounded-lg bg-[#D5B779] px-4 py-2 font-bold text-[#071B2B] transition-colors hover:bg-[#E7CB91]"
      >
        Feedback Inbox
      </Link>
    )}

    <button
      type="button"
      onClick={handleLogout}
      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#547084]/60 px-4 py-2 font-semibold text-[#F4F7FA] transition-colors hover:bg-[#103A52]"
    >
      Log Out
    </button>
  </div>
</>
    ) : (
      <>
        <div className="mb-4 border-b border-[#254357] pb-4">
          <p className="font-bold text-white">Welcome aboard!</p>
          <p className="mt-1 text-sm text-[#B8C7D3]">
            Sign in or create an account to get started.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/login"
            onClick={() => setAccountOpen(false)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#D5B779] px-4 py-2 font-bold text-[#071B2B] transition-colors hover:bg-[#E7CB91]"
          >
            <UiIcon name="user" size={18} />
            Login
          </Link>

          <Link
            href="/register"
            onClick={() => setAccountOpen(false)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#547084]/60 px-4 py-2 font-semibold text-[#F4F7FA] transition-colors hover:bg-[#103A52]"
          >
            <UiIcon name="users" size={18} />
            Create Account
          </Link>
        </div>
      </>
    )}
  </div>
)}
          </div>



          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-lg border border-[#547084]/60 px-4 text-sm font-semibold text-[#F4F7FA] transition-colors hover:bg-[#103A52]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5B779] md:hidden"
          >
            <UiIcon name={menuOpen ? "close" : "menu"} />
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-[#547084]/30 py-3 md:hidden"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 items-center gap-4 rounded-lg px-5 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#D5B779] ${
                    active
                      ? "bg-[#1c6378]/25 text-[#D5B779]"
                      : "text-[#B8C7D3] hover:bg-[#103A52]/60 hover:text-white"
                  }`}
                >
                  <UiIcon name={link.icon} size={23} />
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}