"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";

const faqItems = [
  {
    question: "Kaip veikia automatinis turto vertinimas?",
    answer:
      "Sistema naudoja tris pagrindinius modelius: DCF (diskontuotų pinigų srautai), CMA (palyginamoji rinkos analizė) ir pajamų kapitalizacijos metodą. Kiekvienas modelis analizuoja skirtingus duomenų šaltinius — registrų centro sandorius, energetinio naudingumo sertifikatus ir makroekonominius rodiklius — kad pateiktų tikslų vertinimo intervalą.",
  },
  {
    question: "Kokius duomenų šaltinius naudoja platforma?",
    answer:
      "Platforma integruoja duomenis iš VĮ Registrų centras, Lietuvos statistikos departamento, Eurostat, Lietuvos banko palūkanų normų duomenų bazės, savivaldybių statybos leidimų registro ir nekilnojamojo turto portalų. Visi duomenys atnaujinami kasdien.",
  },
  {
    question: "Ar galiu eksportuoti vertinimo ataskaitą?",
    answer:
      "Taip, sistema palaiko CSV eksportą visoms ataskaitoms ir archyvo duomenims. PDF eksporto funkcija šiuo metu yra kuriama ir bus prieinama artimiausiu metu. Eksportuoti galite iš Ataskaitų arba Archyvo puslapių.",
  },
  {
    question: "Koks yra vertinimo patikimumo balas?",
    answer:
      "Patikimumo balas (0–100%) rodo, kiek tikslus yra vertinimas pagal turimų duomenų kiekį ir kokybę. Bazinis balas yra 85%, o kiekvienas papildomas užpildytas parametras (energinis reitingas, šildymo sistema, būklė ir kt.) padidina balą. Aukštesnis balas reiškia didesnį pasitikėjimą rezultatu.",
  },
  {
    question: "Kaip naudoti jautrumo analizę?",
    answer:
      "Jautrumo analizės puslapyje rasite keturis slankiklius: plotas, statybos metai, energinis reitingas ir lokacijos koeficientas. Keisdami šiuos parametrus realiu laiku matysite, kaip jie veikia galutinę turto vertę. Tai padeda suprasti, kurie veiksniai turi didžiausią įtaką kainai.",
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFaq(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Header */}
          <header>
            <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase block mb-2">
              Sistema / Pagalba
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-on-surface">
              PAGALBA
            </h1>
            <p className="text-sm text-outline mt-2">
              Dažniausiai užduodami klausimai ir sistemos informacija.
            </p>
          </header>

          {/* FAQ Accordion */}
          <section className="space-y-2">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              Dažnai užduodami klausimai
            </h2>
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-surface-container overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-high transition-colors"
                >
                  <span className="text-sm font-semibold text-on-surface pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-primary text-lg flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p className="text-xs text-on-surface-variant leading-relaxed border-l-2 border-primary/30 pl-4">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Contact Section */}
          <section className="bg-surface-container p-6 border-l-4 border-primary">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              Susisiekite su mumis
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">
                  mail
                </span>
                <span className="text-xs text-on-surface">
                  pagalba@vertinimo-terminalas.lt
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">
                  phone
                </span>
                <span className="text-xs text-on-surface">
                  +370 5 123 4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-sm">
                  schedule
                </span>
                <span className="text-xs text-on-surface">
                  Darbo laikas: I–V, 8:00–17:00
                </span>
              </div>
            </div>
          </section>

          {/* System Info */}
          <section className="bg-surface-container p-6">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              Sistemos informacija
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-high p-4 rounded">
                <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                  Versija
                </div>
                <div className="text-sm font-bold text-on-surface font-mono">
                  v2.4.0
                </div>
              </div>
              <div className="bg-surface-container-high p-4 rounded">
                <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                  Platforma
                </div>
                <div className="text-sm font-bold text-on-surface font-mono">
                  Next.js 16
                </div>
              </div>
              <div className="bg-surface-container-high p-4 rounded">
                <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                  Paskutinis atnaujinimas
                </div>
                <div className="text-sm font-bold text-on-surface font-mono">
                  2026.03.24
                </div>
              </div>
              <div className="bg-surface-container-high p-4 rounded">
                <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                  Licencija
                </div>
                <div className="text-sm font-bold text-on-surface font-mono">
                  ENTERPRISE
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
