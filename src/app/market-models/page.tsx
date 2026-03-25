"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

const models = [
  {
    id: "dcf",
    icon: "account_balance",
    title: "DCF MODELIS",
    subtitle: "Diskontuotų pinigų srautai",
    description:
      "Prognozuoja būsimus pinigų srautus ir diskontuoja juos iki dabartinės vertės, naudodamas tinkamą diskonto normą. Idealus investicinio turto vertinimui su ilgalaikiais nuomos kontraktais.",
    metrics: [
      { label: "Tikslumas", value: "92%" },
      { label: "Laikotarpis", value: "10 metų" },
    ],
  },
  {
    id: "cma",
    icon: "compare_arrows",
    title: "CMA MODELIS",
    subtitle: "Palyginamoji rinkos analizė",
    description:
      "Lygina vertinamo turto savybes su neseniai parduotais panašiais objektais. Taiko korekcijas pagal vietos, ploto, būklės ir kitus parametrus. Tinkamiausias gyvenamajam turtui.",
    metrics: [
      { label: "Tikslumas", value: "95%" },
      { label: "Etalonai", value: "N=12" },
    ],
  },
  {
    id: "income",
    icon: "payments",
    title: "PAJAMŲ KAPITALIZACIJA",
    subtitle: "Pajamų metodas",
    description:
      "Vertina turtą pagal jo gebėjimą generuoti pajamas. Konvertuoja grynąsias veiklos pajamas į turto vertę naudodamas kapitalizacijos normą. Geriausiai tinka komerciniams objektams.",
    metrics: [
      { label: "Tikslumas", value: "89%" },
      { label: "Cap Rate", value: "6,2%" },
    ],
  },
];

export default function MarketModels() {
  const router = useRouter();
  const [activeModel, setActiveModel] = useState<string | null>(null);

  return (
    <AppLayout activeItem="market-models">
      <div className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <header>
            <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase block mb-2">
              Analitikos moduliai / Modeliai
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-on-surface">
              RINKOS MODELIAI
            </h1>
            <p className="text-sm text-outline mt-2 max-w-2xl">
              Pasirinkite vertinimo metodologiją pagal turto tipą ir tikslą.
              Kiekvienas modelis naudoja skirtingą duomenų rinkinį ir
              skaičiavimo logiką.
            </p>
          </header>

          {/* Model Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {models.map((model) => {
              const isActive = activeModel === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => setActiveModel(isActive ? null : model.id)}
                  className={`bg-surface-container p-6 flex flex-col cursor-pointer transition-all duration-300 border-t-2 ${
                    isActive
                      ? "border-primary ring-1 ring-primary/30"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-highest text-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {model.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black tracking-wider uppercase text-on-surface">
                        {model.title}
                      </h3>
                      <p className="text-[10px] text-outline uppercase tracking-widest">
                        {model.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-6 flex-1">
                    {model.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-4 mb-6">
                    {model.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="bg-surface-container-high p-3 rounded flex-1"
                      >
                        <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                          {m.label}
                        </div>
                        <div className="text-lg font-bold text-primary">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/analytics");
                    }}
                    className={`w-full py-3 text-[10px] font-bold tracking-widest uppercase transition-all rounded-lg ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed hover:opacity-90"
                        : "bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary"
                    }`}
                  >
                    PALEISTI
                  </button>
                </div>
              );
            })}
          </div>

          {/* Info Footer */}
          <div className="bg-surface-container p-6 border-l-4 border-primary/50">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-xl">
                info
              </span>
              <div>
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Modelių atrankos gairės
                </h4>
                <p className="text-[11px] text-outline leading-relaxed">
                  DCF modelis rekomenduojamas investiciniams objektams su
                  ilgalaikiais nuomos kontraktais. CMA geriausiai tinka
                  gyvenamajam nekilnojamajam turtui, kur yra pakankamai
                  palyginamų sandorių. Pajamų kapitalizacija optimali
                  komerciniams objektams su stabiliais nuomos srautais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
