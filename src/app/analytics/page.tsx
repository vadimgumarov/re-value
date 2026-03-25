"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import AppLayout from "@/components/AppLayout";

const LithuaniaHeatmap = dynamic(() => import("@/components/maps/LithuaniaHeatmap"), {
  ssr: false,
  loading: () => <div className="bg-surface-container-lowest animate-pulse" style={{ height: "500px" }} />,
});
const DistrictMap = dynamic(() => import("@/components/maps/DistrictMap"), {
  ssr: false,
  loading: () => <div className="bg-surface-container-lowest animate-pulse" style={{ height: "500px" }} />,
});

const pricePerM2: Record<string, number> = {
  Vilnius: 4200,
  Kaunas: 2800,
  "Klaipėda": 3100,
};

const allComparables = [
  { address: "Didžioji g. 22", area: "82 m²", price: 435000, deviation: "+1,2%", deviationColor: "text-secondary", city: "Vilnius" },
  { address: "Subačiaus g. 14", area: "75 m²", price: 412000, deviation: "-4,1%", deviationColor: "text-error", city: "Vilnius" },
  { address: "Pylimo g. 8", area: "91 m²", price: 460000, deviation: "+7,2%", deviationColor: "text-secondary", city: "Vilnius" },
  { address: "Vokiečių g. 3", area: "68 m²", price: 421000, deviation: "0,0%", deviationColor: "text-slate-400", city: "Vilnius" },
  { address: "Laisvės al. 45", area: "85 m²", price: 238000, deviation: "+2,8%", deviationColor: "text-secondary", city: "Kaunas" },
  { address: "Savanorių pr. 12", area: "72 m²", price: 198000, deviation: "-1,5%", deviationColor: "text-error", city: "Kaunas" },
  { address: "Danės g. 5", area: "78 m²", price: 245000, deviation: "+3,4%", deviationColor: "text-secondary", city: "Klaipėda" },
  { address: "Tiltų g. 9", area: "65 m²", price: 198000, deviation: "-2,1%", deviationColor: "text-error", city: "Klaipėda" },
];

function formatEur(n: number) {
  return n.toLocaleString("lt-LT").replace(/,/g, " ") + " €";
}

function AnalyticsContent() {
  const searchParams = useSearchParams();
  const [mapExpanded, setMapExpanded] = useState(false);

  const city = searchParams.get("city") || "Vilnius";
  const areaStr = searchParams.get("area") || "75,5";
  const areaNum = parseFloat(areaStr.replace(",", ".")) || 75.5;
  const quarter = searchParams.get("quarter") || "";
  const street = searchParams.get("street") || "";
  const energyRating = searchParams.get("energyRating") || "";
  const buildYear = searchParams.get("buildYear") || "";
  const heatingSystem = searchParams.get("heatingSystem") || "";
  const structuralCondition = searchParams.get("structuralCondition") || "";
  const interiorFinish = searchParams.get("interiorFinish") || "";
  const utilitySystems = searchParams.get("utilitySystems") || "";

  const basePrice = pricePerM2[city] || 4200;
  const baseValue = Math.round(areaNum * basePrice);
  const lowValue = Math.round(baseValue * 0.97);
  const highValue = Math.round(baseValue * 1.03);

  // Confidence: base 85% + bonuses for filled fields
  const filledFields = [city, quarter, street, energyRating, buildYear, heatingSystem, structuralCondition, interiorFinish, utilitySystems].filter(Boolean).length;
  const confidence = Math.min(99, 85 + filledFields);

  const comparables = useMemo(() => {
    return allComparables.filter((c) => c.city === city);
  }, [city]);

  return (
    <AppLayout activeItem="valuation-engine">
      <div className="flex-1 overflow-y-auto bg-surface-container-low p-8 space-y-8">
        {/* TOP SECTION: Valuation Brackets */}
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-surface-container p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                Numatoma rinkos vertės ribos
              </span>
              <div className="flex items-baseline mt-2 space-x-4">
                <h2 className="text-5xl font-bold tracking-tighter text-on-surface">
                  {formatEur(lowValue)}{" "}
                  <span className="text-2xl text-slate-600">&mdash;</span>{" "}
                  {formatEur(highValue)}
                </h2>
                <div className="flex items-center text-secondary bg-secondary-container/10 px-2 py-0.5 rounded text-[10px] font-bold">
                  <span className="material-symbols-outlined text-xs mr-1">
                    trending_up
                  </span>
                  +2,4% mėn./mėn.
                </div>
              </div>
            </div>
            <div className="mt-8 flex space-x-12">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Bazinis įvertinimas
                </span>
                <div className="text-lg font-semibold text-primary">
                  {formatEur(baseValue)}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Rinkos likvidumas
                </span>
                <div className="text-lg font-semibold">AUKŠTAS</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Numatomas pardavimo laikas
                </span>
                <div className="text-lg font-semibold text-tertiary">
                  14–22 DIENOS
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 bg-primary text-on-primary-fixed p-6 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 z-10">
              Patikimumo balas
            </span>
            <div className="text-7xl font-black my-2 z-10">
              {confidence}<span className="text-3xl">%</span>
            </div>
            <div className="w-full h-1 bg-on-primary-fixed/20 mt-2 z-10 overflow-hidden">
              <div className="h-full bg-on-primary-fixed transition-all" style={{ width: `${confidence}%` }} />
            </div>
            <p className="text-[10px] font-medium mt-4 z-10 text-center uppercase tracking-tighter">
              Agreguota iš {filledFields + 3} aktyvių rinkos rodiklių
            </p>
          </div>
        </section>

        {/* MIDDLE SECTION: Map & Analytics */}
        <section className="grid grid-cols-12 gap-6">
          {/* Map */}
          <div className={`col-span-12 ${mapExpanded ? "" : "xl:col-span-7"} bg-surface-container relative overflow-hidden transition-all duration-300 ${mapExpanded ? "h-[700px]" : "h-[500px]"}`}>
            <div className="absolute top-6 left-6 z-10">
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-1">
                Regioninė žvalgyba
              </span>
              <h3 className="text-xl font-bold tracking-tight">
                {city.toUpperCase()}_METRO_RAJONAI
              </h3>
            </div>
            <div className="absolute top-6 right-6 z-10 flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary" />
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  Premium zonos
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-container" />
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  Augimo koridoriai
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-surface-container-high" />
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  Stabilios zonos
                </span>
              </div>
            </div>
            {/* Lithuania Heatmap */}
            <div className="w-full h-full">
              <LithuaniaHeatmap
                data={[
                  { region: "Vilnius", value: 85, label: "4 200 \u20AC/m\u00B2" },
                  { region: "Kaunas", value: 55, label: "2 800 \u20AC/m\u00B2" },
                  { region: "Klaip\u0117da", value: 60, label: "3 100 \u20AC/m\u00B2" },
                  { region: "\u0160iauliai", value: 30, label: "1 600 \u20AC/m\u00B2" },
                  { region: "Panev\u0117\u017Eys", value: 25, label: "1 400 \u20AC/m\u00B2" },
                ]}
                selectedCity={city}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-white/5 flex justify-between items-center">
              <div className="flex space-x-8">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">
                    Karštasis taškas
                  </span>
                  <div className="text-sm font-bold">
                    {quarter || "Senamiestis"} / {street || "Šnipiškės"}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">
                    Pelningumas %
                  </span>
                  <div className="text-sm font-bold text-secondary">
                    5,2% vid.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMapExpanded((v) => !v)}
                className="bg-surface-container-highest px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
              >
                {mapExpanded ? "Sutraukti vaizdą" : "Išplėsti vaizdą"}
              </button>
            </div>
          </div>

          {/* Table & Chart Area */}
          <div className={`col-span-12 ${mapExpanded ? "" : "xl:col-span-5"} flex flex-col space-y-6`}>
            {/* CMA Table */}
            <div className="bg-surface-container p-6 flex-1 overflow-hidden flex flex-col">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    Lyginamoji rinkos analizė
                  </span>
                  <h4 className="text-sm font-bold tracking-tight mt-1 uppercase">
                    Aktyvūs etalonai (N={comparables.length})
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">
                  FILTRAS_XLS
                </span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="border-b border-outline-variant/30 text-slate-500 uppercase tracking-tighter">
                    <tr>
                      <th className="pb-2 font-semibold">Adresas</th>
                      <th className="pb-2 font-semibold">Plotas</th>
                      <th className="pb-2 font-semibold">Kaina</th>
                      <th className="pb-2 font-semibold text-right">Nukr.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {comparables.map((c) => (
                      <tr key={c.address} className="hover:bg-surface-container-high transition-colors">
                        <td className="py-3 font-medium text-on-surface">{c.address}</td>
                        <td className="py-3 text-slate-400">{c.area}</td>
                        <td className="py-3 font-semibold">{Math.round(c.price / 1000)} tūkst. €</td>
                        <td className={`py-3 text-right font-bold ${c.deviationColor}`}>{c.deviation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Historical Chart */}
            <div className="bg-surface-container p-6 h-48 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  Istorinė kainų delta (5 m.)
                </span>
                <span className="text-[10px] font-bold text-slate-300">
                  CAGR: +8,4%
                </span>
              </div>
              <div className="flex-1 flex items-end space-x-1">
                <div className="bg-surface-container-highest flex-1 h-[40%] rounded-t-sm hover:bg-primary transition-all cursor-crosshair" />
                <div className="bg-surface-container-highest flex-1 h-[55%] rounded-t-sm hover:bg-primary transition-all cursor-crosshair" />
                <div className="bg-surface-container-highest flex-1 h-[48%] rounded-t-sm hover:bg-primary transition-all cursor-crosshair" />
                <div className="bg-surface-container-highest flex-1 h-[62%] rounded-t-sm hover:bg-primary transition-all cursor-crosshair" />
                <div className="bg-surface-container-highest flex-1 h-[75%] rounded-t-sm hover:bg-primary transition-all cursor-crosshair" />
                <div className="bg-surface-container-highest flex-1 h-[82%] rounded-t-sm hover:bg-primary transition-all cursor-crosshair" />
                <div className="bg-primary flex-1 h-[95%] rounded-t-sm" />
              </div>
              <div className="flex justify-between text-[8px] font-bold text-slate-600 mt-2 tracking-widest uppercase">
                <span>2019</span>
                <span>2020</span>
                <span>2021</span>
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
                <span className="text-primary">PROGNOZĖ</span>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Market Comparisons */}
        <section className="grid grid-cols-12 gap-6">
          {/* Price vs Floor Area */}
          <div className="col-span-12 xl:col-span-6 bg-surface-container p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  Pažangus rinkos koreliavimas
                </span>
                <h4 className="text-sm font-bold tracking-tight mt-1 uppercase">
                  Kaina vs. ploto analizė
                </h4>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[8px] font-bold text-slate-500 uppercase">
                    Objektas
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                  <span className="text-[8px] font-bold text-slate-500 uppercase">
                    Kvartalas
                  </span>
                </div>
              </div>
            </div>
            {/* District Map */}
            <div className="flex-1 min-h-[220px] mt-4 mx-4">
              <DistrictMap
                selectedDistrict="Senamiestis"
                onDistrictClick={(d) => console.log(d)}
              />
            </div>
          </div>

          {/* Structural Comparison */}
          <div className="col-span-12 xl:col-span-6 bg-surface-container p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  Struktūrinis palyginimas
                </span>
                <h4 className="text-sm font-bold tracking-tight mt-1 uppercase">
                  Inžinerinės spec. vs. regioninis vid.
                </h4>
              </div>
            </div>
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              {/* Spec 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                  <span className="text-on-surface">Energinis efektyvumas</span>
                  <div className="space-x-4">
                    <span className="text-primary">Objektas: {searchParams.get("energyRating") || "A++"}</span>
                    <span className="text-slate-500">Vid.: B</span>
                  </div>
                </div>
                <div className="relative h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-slate-600 w-[60%]" />
                  <div className="absolute top-0 left-0 h-full bg-primary w-[95%] shadow-[0_0_8px_#a0c9ff]" />
                </div>
              </div>
              {/* Spec 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                  <span className="text-on-surface">Statybos kokybė</span>
                  <div className="space-x-4">
                    <span className="text-primary">Objektas: 9,4/10</span>
                    <span className="text-slate-500">Vid.: 7,2/10</span>
                  </div>
                </div>
                <div className="relative h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-slate-600 w-[72%]" />
                  <div className="absolute top-0 left-0 h-full bg-primary w-[94%] shadow-[0_0_8px_#a0c9ff]" />
                </div>
              </div>
              {/* Spec 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                  <span className="text-on-surface">
                    Struktūrinis vientisumas
                  </span>
                  <div className="space-x-4">
                    <span className="text-primary">Objektas: {searchParams.get("structuralCondition") || "OPTIMALUS"}</span>
                    <span className="text-slate-500">Vid.: GERAS</span>
                  </div>
                </div>
                <div className="relative h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-slate-600 w-[78%]" />
                  <div className="absolute top-0 left-0 h-full bg-primary w-[98%] shadow-[0_0_8px_#a0c9ff]" />
                </div>
              </div>
            </div>
            <p className="text-[9px] text-slate-500 font-medium italic mt-4 uppercase">
              Spec. duomenys agreguoti iš savivaldybės statybos leidimų ir
              sertifikuotų auditorių ataskaitų.
            </p>
          </div>
        </section>

        {/* BOTTOM SECTION: Benchmarks & Risk */}
        <section className="grid grid-cols-12 gap-6">
          {/* Forecast Card */}
          <div className="col-span-12 md:col-span-4 bg-surface-container p-6 border-l-4 border-primary">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              12 mėnesių augimo prognozė
            </span>
            <div className="flex items-center mt-3">
              <div className="text-4xl font-black text-primary tracking-tighter">
                +12,4%
              </div>
              <div className="ml-4 p-2 bg-primary/10 rounded">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trending_up
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              Skatina mažas būstų pasiūlos lygis ir nuolatinis institucinio
              kapitalo srautas aukšto tankumo sektoriuose.
            </p>
          </div>

          {/* Neighborhood Benchmarks */}
          <div className="col-span-12 md:col-span-4 bg-surface-container p-6 border-l-4 border-tertiary">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Kvartalo indeksas
            </span>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-on-surface uppercase tracking-tight">
                  Pėsčiųjų pasiekiamumas
                </span>
                <span className="text-[11px] font-bold text-tertiary">
                  98/100
                </span>
              </div>
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-tertiary" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold text-on-surface uppercase tracking-tight">
                  Saugumo reitingas
                </span>
                <span className="text-[11px] font-bold text-tertiary">A+</span>
              </div>
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-tertiary" />
              </div>
            </div>
          </div>

          {/* Macro Risk Card */}
          <div className="col-span-12 md:col-span-4 bg-surface-container p-6 border-l-4 border-error">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Makroekonominės rizikos
            </span>
            <div className="mt-4 flex space-x-2">
              <span className="px-2 py-1 bg-error-container/20 text-error text-[9px] font-black tracking-widest uppercase rounded">
                Palūkanų normos
              </span>
              <span className="px-2 py-1 bg-error-container/20 text-error text-[9px] font-black tracking-widest uppercase rounded">
                Geopolitika
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Bendrasis nepastovumas
              </div>
              <div className="text-xl font-bold text-error">VID_AUKŠTAS</div>
            </div>
            <div className="w-full h-1 bg-surface-container-high mt-2 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-error" />
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default function Analytics() {
  return (
    <Suspense
      fallback={
        <AppLayout activeItem="valuation-engine">
          <div className="flex-1 flex items-center justify-center bg-surface-container-low">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                Skaičiuojama...
              </span>
            </div>
          </div>
        </AppLayout>
      }
    >
      <AnalyticsContent />
    </Suspense>
  );
}
