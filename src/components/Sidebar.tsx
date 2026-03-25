"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavItems = [
  {
    label: "ĮVESTIES TERMINALAS",
    icon: "edit_note",
    id: "input-terminal",
    href: "/",
  },
  {
    label: "RINKOS MODELIAI",
    icon: "query_stats",
    id: "market-models",
    href: "/market-models",
  },
  {
    label: "VERTINIMO VARIKLIS",
    icon: "calculate",
    id: "valuation-engine",
    href: "/analytics",
  },
  {
    label: "JAUTRUMO ANALIZĖ",
    icon: "analytics",
    id: "sensitivity-analysis",
    href: "/sensitivity",
  },
  {
    label: "GALUTINIS EKSPORTAS",
    icon: "ios_share",
    id: "final-export",
    href: "/reports",
  },
];

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem }: SidebarProps) {
  const pathname = usePathname();

  function isItemActive(item: { id: string; href: string }) {
    if (activeItem) return item.id === activeItem;
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  }

  return (
    <aside className="flex flex-col h-full py-4 space-y-2 bg-[#121317] w-64 flex-shrink-0 z-40">
      {/* Asset ID Indicator */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-fixed">
              token
            </span>
          </div>
          <div>
            <div className="font-black text-primary text-sm">
              ASSET_ID: 4092
            </div>
            <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
              Tikslus režimas
            </div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1">
        {mainNavItems.map((item) => {
          const active = isItemActive(item);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={
                active
                  ? "flex items-center gap-3 px-3 py-3 bg-surface-container-high text-primary border-r-2 border-primary text-[11px] font-semibold tracking-wider uppercase transition-all duration-150 ease-in-out"
                  : "flex items-center gap-3 px-3 py-3 text-slate-500 hover:bg-surface-container-high hover:text-slate-200 text-[11px] font-semibold tracking-wider uppercase transition-all duration-150 ease-in-out"
              }
            >
              <span className="material-symbols-outlined text-lg">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Simulation Button */}
      <div className="px-6 py-4">
        <Link
          href="/analytics"
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold text-xs tracking-widest rounded-lg hover:opacity-90 transition-opacity uppercase flex items-center justify-center"
        >
          PALEISTI SIMULIACIJĄ
        </Link>
      </div>

      {/* Footer Links */}
      <div className="px-3 pb-4 border-t border-white/5 pt-4">
        <Link
          href="/help"
          className={`flex items-center gap-3 px-3 py-2 transition-colors ${
            pathname === "/help"
              ? "text-primary"
              : "text-slate-500 hover:text-slate-200"
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            help_outline
          </span>
          <span className="text-[11px] font-semibold uppercase">PAGALBA</span>
        </Link>
        <Link
          href="/api-status"
          className={`flex items-center gap-3 px-3 py-2 transition-colors ${
            pathname === "/api-status"
              ? "text-primary"
              : "text-slate-500 hover:text-slate-200"
          }`}
        >
          <span className="material-symbols-outlined text-sm">terminal</span>
          <span className="text-[11px] font-semibold uppercase">
            API BŪSENA
          </span>
        </Link>
      </div>
    </aside>
  );
}
