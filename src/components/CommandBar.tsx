"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const recentSearches = [
  { label: "Konstitucijos pr. 21, Vilnius", type: "Adresas" },
  { label: "Žirmūnų Loft Terrace", type: "Projektas" },
  { label: "Jogailos g. 4", type: "Adresas" },
  { label: "Nerimi Park Heights", type: "Projektas" },
];

const quickActions = [
  { label: "Naujas vertinimas", icon: "add_circle", href: "/" },
  { label: "Ataskaitos", icon: "folder_open", href: "/reports" },
  { label: "Eksportas", icon: "ios_share", href: "/reports" },
  { label: "Archyvas", icon: "inventory_2", href: "/archive" },
];

export default function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  const filteredSearches = recentSearches.filter(
    (s) =>
      !query || s.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Command Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-3 bg-surface-container-highest/70 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl z-50">
        <button
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <span className="material-symbols-outlined text-lg">search</span>
        </button>
        <div className="h-4 w-[1px] bg-white/10 mx-1" />
        <button
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <span className="material-symbols-outlined text-lg text-primary">
            add_circle
          </span>
        </button>
        <button
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <span className="material-symbols-outlined text-lg">folder_open</span>
        </button>
        <button
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <span className="material-symbols-outlined text-lg">ios_share</span>
        </button>
        <div className="h-4 w-[1px] bg-white/10 mx-1" />
        <button
          onClick={() => setIsOpen(true)}
          className="px-2 text-[10px] font-mono font-bold text-outline hover:text-on-surface transition-colors cursor-pointer"
        >
          CMD + K
        </button>
      </div>

      {/* Search Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="w-full max-w-lg bg-surface-container-highest border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <span className="material-symbols-outlined text-primary">
                search
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ieškoti adreso, projekto..."
                className="flex-1 bg-transparent border-none text-sm text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none p-0"
              />
              <kbd className="text-[9px] font-mono text-outline bg-surface-container px-2 py-0.5 rounded border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Quick Actions */}
            <div className="px-5 py-3 border-b border-white/5">
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                Greiti veiksmai
              </span>
              <div className="flex gap-2 mt-2">
                {quickActions.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(a.href);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-surface-container-high rounded-lg text-[10px] font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {a.icon}
                    </span>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div className="px-5 py-3">
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                {query ? "Rezultatai" : "Naujausi ieškojimai"}
              </span>
              <div className="mt-2 space-y-1">
                {filteredSearches.length > 0 ? (
                  filteredSearches.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/archive");
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary">
                          history
                        </span>
                        <span className="text-xs text-on-surface">
                          {s.label}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                        {s.type}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs text-outline">
                    Rezultatų nerasta
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
