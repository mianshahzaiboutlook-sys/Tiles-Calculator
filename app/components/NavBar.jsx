"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/washroom-calculator", label: "Washroom" },
  { href: "/single-wall", label: "Single Wall" },
  { href: "/floor", label: "Floor" },
  { href: "/tile-quantity", label: "Tile Quantity" },
  { href: "/box", label: "Box" },
  { href: "/cost", label: "Cost" },
  { href: "/tile-patterns", label: "Patterns" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Jasim Tiles Home"
            >
              <div
                className="w-14 h-14 flex items-center justify-center rounded-md bg-white/12 hover:scale-105 transition-transform"
                aria-hidden
                style={{ boxShadow: "4px 6px 12px rgba(0,0,0,0.12)" }}
              >
                <svg
                  viewBox="0 0 48 48"
                  className="w-10 h-10"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="navLogoGradient" x1="0" x2="1">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>

                  <rect
                    x="4"
                    y="6"
                    width="16"
                    height="16"
                    rx="2"
                    fill="url(#navLogoGradient)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="28"
                    y="6"
                    width="16"
                    height="16"
                    rx="2"
                    fill="#EC4899"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="4"
                    y="26"
                    width="16"
                    height="16"
                    rx="2"
                    fill="#6366F1"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="28"
                    y="26"
                    width="16"
                    height="16"
                    rx="2"
                    fill="#06B6D4"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>

              <div className="flex flex-col leading-none">
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight  text-linear-to-r from-amber-400 via-pink-500 to-indigo-600">
                  Jasim Tiles
                </div>
                <div className="text-xs text-white/90 mt-0.5 hidden md:block">
                  Quality Tiles & Estimates
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              {links.map((l) => {
                const active =
                  pathname === l.href ||
                  (l.href !== "/" && pathname?.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`px-3 py-2 rounded-md text-sm transition ${active ? "bg-white/20" : "hover:bg-white/10"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md hover:bg-white/10"
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-1">
            {links.map((l) => {
              const active =
                pathname === l.href ||
                (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-3 py-2 rounded-md text-sm transition ${active ? "bg-white/20" : "hover:bg-white/10"}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
