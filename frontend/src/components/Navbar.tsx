
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UiIcon from "./UiIcon";

const navLinks = [
  { name: "Home", href: "/", icon: "home" as const },
  { name: "About", href: "/about", icon: "info" as const },
  { name: "Catalog", href: "/catalog", icon: "tag" as const },
  { name: "Help", href: "/help", icon: "help" as const },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#254357] bg-[#071B2B]">
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
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#D5B779] text-2xl font-bold text-[#071B2B]">
              H
            </div>

            <div>
              <span className="block text-lg font-bold tracking-wide text-white">
                HARBOUR ISLAND
              </span>
              <span className="block text-xs font-bold tracking-widest text-[#D5B779]">
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
                  className={`flex min-h-14 items-center gap-2 rounded-lg border-b-4 px-5 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5B779] ${
                    active
                      ? "border-[#D5B779] bg-[#103A52] text-white"
                      : "border-transparent text-[#F4F7FA] hover:bg-[#103A52]"
                  }`}
                >
                  <UiIcon name={link.icon} size={23} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-lg border border-[#547084] px-4 text-base font-bold text-white hover:bg-[#103A52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5B779] md:hidden"
          >
            <UiIcon name={menuOpen ? "close" : "menu"} />
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-[#254357] py-3 md:hidden"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 items-center gap-4 rounded-lg px-5 py-3 text-lg font-bold focus-visible:outline-2 focus-visible:outline-[#D5B779] ${
                    active
                      ? "bg-[#103A52] text-[#D5B779]"
                      : "text-white hover:bg-[#103A52]"
                  }`}
                >
                  <UiIcon name={link.icon} size={26} />
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
