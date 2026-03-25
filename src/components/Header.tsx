"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "SKYDELIS", href: "/" },
  { label: "ANALITIKA", href: "/analytics" },
  { label: "ATASKAITOS", href: "/reports" },
  { label: "ARCHYVAS", href: "/archive" },
];

export default function Header() {
  const pathname = usePathname();

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
        <button
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="Pranešimai"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="Nustatymai"
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
