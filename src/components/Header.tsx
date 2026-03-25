"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "SKYDELIS", href: "/" },
  { label: "ANALITIKA", href: "/analytics" },
  { label: "ATASKAITOS", href: "/reports" },
  { label: "ARCHYVAS", href: "/archive" },
];

const mockNotifications = [
  {
    id: 1,
    title: "Vertinimas užbaigtas",
    description: "Konstitucijos pr. 21 — #RP-9819-B patvirtinta",
    time: "prieš 5 min.",
    unread: true,
  },
  {
    id: 2,
    title: "Naujas rinkos atnaujinimas",
    description: "Vilniaus Senamiestis: kainų pokytis +2,1%",
    time: "prieš 32 min.",
    unread: true,
  },
  {
    id: 3,
    title: "Archyvas atnaujintas",
    description: "KLA-00089-V — Memel Quarter Hub perkainota",
    time: "prieš 2 val.",
    unread: false,
  },
  {
    id: 4,
    title: "API būsenos pasikeitimas",
    description: "Geocodavimo tarnyba vėl aktyvi",
    time: "prieš 4 val.",
    unread: false,
  },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  return (
    <header className="flex items-center justify-between px-6 w-full sticky top-0 z-50 h-14 bg-[#121317]">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tighter text-primary uppercase"
        >
          VERTINIMO_TERMINALAS
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1 font-medium tracking-tight text-sm"
                    : "text-slate-400 font-normal tracking-tight text-sm hover:text-white transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-slate-400 hover:text-white transition-colors relative"
            aria-label="Pranešimai"
            onClick={() => setShowNotifications((v) => !v)}
          >
            <span className="material-symbols-outlined">notifications</span>
            {mockNotifications.some((n) => n.unread) && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 bg-surface-container-highest border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[100]">
              <div className="px-4 py-3 border-b border-white/5">
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  Pranešimai
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-white/5 hover:bg-surface-container-high transition-colors cursor-pointer ${
                      n.unread ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-on-surface">
                        {n.title}
                      </span>
                      {n.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[10px] text-outline mt-1">
                      {n.description}
                    </p>
                    <span className="text-[9px] text-slate-600 mt-1 block">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="Nustatymai"
          onClick={() => router.push("/help")}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden flex items-center justify-center border border-white/10">
          <span className="material-symbols-outlined text-on-surface-variant text-lg">
            person
          </span>
        </div>
      </div>
    </header>
  );
}
