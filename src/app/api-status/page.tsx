"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";

interface ServiceStatus {
  name: string;
  icon: string;
  status: "AKTYVUS" | "NEAKTYVUS" | "NESTABILUS";
  uptime: string;
  latency: string;
  lastCheck: string;
}

const initialServices: ServiceStatus[] = [
  {
    name: "Vertinimo variklis",
    icon: "calculate",
    status: "AKTYVUS",
    uptime: "99,97%",
    latency: "42ms",
    lastCheck: "2026.03.24 14:32:01",
  },
  {
    name: "Duomenų bazė",
    icon: "database",
    status: "AKTYVUS",
    uptime: "99,99%",
    latency: "8ms",
    lastCheck: "2026.03.24 14:32:01",
  },
  {
    name: "Žemėlapių tarnyba",
    icon: "map",
    status: "AKTYVUS",
    uptime: "99,84%",
    latency: "120ms",
    lastCheck: "2026.03.24 14:31:58",
  },
  {
    name: "Geocodavimo API",
    icon: "pin_drop",
    status: "AKTYVUS",
    uptime: "99,91%",
    latency: "65ms",
    lastCheck: "2026.03.24 14:32:00",
  },
];

function statusColor(status: string) {
  switch (status) {
    case "AKTYVUS":
      return "bg-secondary";
    case "NEAKTYVUS":
      return "bg-error";
    case "NESTABILUS":
      return "bg-tertiary";
    default:
      return "bg-outline";
  }
}

function statusTextColor(status: string) {
  switch (status) {
    case "AKTYVUS":
      return "text-secondary";
    case "NEAKTYVUS":
      return "text-error";
    case "NESTABILUS":
      return "text-tertiary";
    default:
      return "text-outline";
  }
}

export default function ApiStatus() {
  const [services, setServices] = useState(initialServices);
  const [lastRefresh, setLastRefresh] = useState<string>("");

  useEffect(() => {
    setLastRefresh(new Date().toLocaleString("lt-LT"));
  }, []);

  function handleRefresh() {
    // Simulate a refresh with updated timestamps
    const now = new Date();
    const timestamp = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setServices((prev) =>
      prev.map((s) => ({ ...s, lastCheck: timestamp }))
    );
    setLastRefresh(now.toLocaleString("lt-LT"));
  }

  const allActive = services.every((s) => s.status === "AKTYVUS");

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <header className="flex justify-between items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase block mb-2">
                Sistema / Diagnostika
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-on-surface">
                API BŪSENA
              </h1>
              <p className="text-sm text-outline mt-2">
                Realaus laiko sistemos komponentų stebėsena ir būsenos
                diagnostika.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface text-xs font-bold rounded-lg hover:bg-surface-variant transition-colors uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-sm">
                refresh
              </span>
              Atnaujinti
            </button>
          </header>

          {/* Overall Status */}
          <div
            className={`p-6 border-l-4 ${
              allActive ? "bg-secondary/5 border-secondary" : "bg-error/5 border-error"
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`material-symbols-outlined text-2xl ${
                  allActive ? "text-secondary" : "text-error"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {allActive ? "check_circle" : "error"}
              </span>
              <div>
                <div className="text-lg font-bold text-on-surface">
                  {allActive
                    ? "Visos sistemos veikia normaliai"
                    : "Aptikta sistemos problemų"}
                </div>
                <div className="text-[10px] text-outline uppercase tracking-widest">
                  Paskutinis patikrinimas: {lastRefresh}
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-surface-container p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        {service.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${statusColor(service.status)} animate-pulse`}
                    />
                    <span
                      className={`text-[10px] font-black tracking-widest uppercase ${statusTextColor(service.status)}`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      Veikimo laikas
                    </div>
                    <div className="text-sm font-bold text-on-surface">
                      {service.uptime}
                    </div>
                  </div>
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      Delsa
                    </div>
                    <div className="text-sm font-bold text-on-surface">
                      {service.latency}
                    </div>
                  </div>
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      Patikrinta
                    </div>
                    <div className="text-[10px] font-mono text-on-surface-variant">
                      {service.lastCheck}
                    </div>
                  </div>
                </div>

                {/* Uptime bar */}
                <div>
                  <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className={`h-full ${statusColor(service.status)} transition-all`}
                      style={{
                        width: service.uptime.replace(",", ".").replace("%", "") + "%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* System Info Footer */}
          <div className="bg-surface-container p-6">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              Techniniai duomenys
            </div>
            <div className="grid grid-cols-4 gap-4 text-[10px]">
              <div>
                <span className="text-outline block">Aplinka</span>
                <span className="font-bold text-on-surface">GAMYBA</span>
              </div>
              <div>
                <span className="text-outline block">Regionas</span>
                <span className="font-bold text-on-surface">EU-NORTH-1</span>
              </div>
              <div>
                <span className="text-outline block">API versija</span>
                <span className="font-bold text-on-surface">v3.1.2</span>
              </div>
              <div>
                <span className="text-outline block">Protokolas</span>
                <span className="font-bold text-on-surface">HTTPS/2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
