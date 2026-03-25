"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AppLayout from "@/components/AppLayout";

const MapPreview = dynamic(() => import("@/components/maps/MapPreview"), {
  ssr: false,
  loading: () => <div className="bg-surface-container-lowest animate-pulse" style={{ height: "128px" }} />,
});

const historyItems = [
  {
    id: "4091",
    address: "Konstitucijos pr. 21",
    value: "345 000 €",
    yield: "5,2%",
    time: "prieš 2 min.",
  },
  {
    id: "4088",
    address: "Jogailos g. 4",
    value: "1 280 000 €",
    yield: "4,8%",
    time: "prieš 1 val.",
  },
  {
    id: "4087",
    address: "Vokiečių g. 12",
    value: "890 000 €",
    yield: "6,1%",
    time: "prieš 4 val.",
  },
];

export default function Home() {
  const router = useRouter();

  const [city, setCity] = useState("Vilnius");
  const [quarter, setQuarter] = useState("");
  const [street, setStreet] = useState("");
  const [assetType, setAssetType] = useState("Gyvenamasis butas");
  const [area, setArea] = useState("75,5");
  const [buildYear, setBuildYear] = useState("2022");
  const [energyRating, setEnergyRating] = useState("A++");
  const [heatingSystem, setHeatingSystem] = useState("aerothermal");
  const [structuralCondition, setStructuralCondition] = useState("OPTIMALUS");
  const [interiorFinish, setInteriorFinish] = useState("AUKŠTA");
  const [utilitySystems, setUtilitySystems] = useState("NAUJA");
  const [activeHistoryId, setActiveHistoryId] = useState("4091");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleGenerate() {
    const newErrors: Record<string, string> = {};
    if (!city) newErrors.city = "Privalomas laukas";
    if (!area || area === "0") newErrors.area = "Privalomas laukas";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const params = new URLSearchParams({
      city,
      quarter,
      street,
      assetType,
      area,
      buildYear,
      energyRating,
      heatingSystem,
      structuralCondition,
      interiorFinish,
      utilitySystems,
    });

    router.push(`/analytics?${params.toString()}`);
  }

  return (
    <AppLayout activeItem="input-terminal">
      {/* Input Form Section */}
      <section className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <header className="flex justify-between items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase block mb-2">
                Sistemos konfigūracija / Įvestis
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-on-surface">
                Vertinimo variklis{" "}
                <span className="text-outline">v2.4.0</span>
              </h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-outline block">
                STOTIS_ID: ALPHA_01
              </span>
              <span className="text-[10px] font-mono text-outline block">
                KOORD: 54,6872° N, 25,2797° E
              </span>
            </div>
          </header>

          {/* 01. GEOGRAFINIS KONTEKSTAS */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-surface-container-highest tracking-tighter">
                01
              </span>
              <h2 className="text-lg font-semibold uppercase tracking-widest border-l-2 border-primary pl-4">
                Geografinis kontekstas
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Miestas / Regionas
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors((prev) => {
                      const n = { ...prev };
                      delete n.city;
                      return n;
                    });
                  }}
                  className={`w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded ${errors.city ? "ring-1 ring-error" : ""}`}
                >
                  <option>Vilnius</option>
                  <option>Kaunas</option>
                  <option>Klaipėda</option>
                </select>
                {errors.city && (
                  <span className="text-[9px] text-error">{errors.city}</span>
                )}
              </div>
              <div className="col-span-4 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Kvartalas
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded"
                  placeholder="pvz. Senamiestis"
                  type="text"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                />
              </div>
              <div className="col-span-4 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Gatvės adresas
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded"
                  placeholder="Įveskite tikslią vietą"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 02. FIZINĖS SPECIFIKACIJOS */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-surface-container-highest tracking-tighter">
                02
              </span>
              <h2 className="text-lg font-semibold uppercase tracking-widest border-l-2 border-primary pl-4">
                Fizinės specifikacijos
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Turto tipas
                </label>
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded"
                >
                  <option>Gyvenamasis butas</option>
                  <option>Komercinis objektas</option>
                  <option>Pramoninė patalpa</option>
                </select>
              </div>
              <div className="col-span-3 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Plotas (m²)
                </label>
                <input
                  className={`w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded ${errors.area ? "ring-1 ring-error" : ""}`}
                  type="text"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
                    if (errors.area) setErrors((prev) => {
                      const n = { ...prev };
                      delete n.area;
                      return n;
                    });
                  }}
                />
                {errors.area && (
                  <span className="text-[9px] text-error">{errors.area}</span>
                )}
              </div>
              <div className="col-span-3 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Statybos metai
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded"
                  type="number"
                  value={buildYear}
                  onChange={(e) => setBuildYear(e.target.value)}
                />
              </div>
              <div className="col-span-3 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Energinis reitingas
                </label>
                <div className="flex gap-1">
                  {["A++", "A+", "B"].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setEnergyRating(rating)}
                      className={`flex-1 py-3 text-[10px] font-bold rounded transition-colors ${
                        energyRating === rating
                          ? "bg-secondary-container text-on-secondary-container"
                          : "bg-surface-container-highest text-outline hover:text-on-surface"
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 03. INŽINERINĖS DETALĖS */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-surface-container-highest tracking-tighter">
                03
              </span>
              <h2 className="text-lg font-semibold uppercase tracking-widest border-l-2 border-primary pl-4">
                Inžinerinės detalės
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {/* Heating System Analysis */}
              <div className="col-span-6 p-6 bg-surface-container-high rounded-xl space-y-4">
                <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
                  Šildymo sistemos analizė
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setHeatingSystem("aerothermal")}
                    className={`flex items-center gap-3 p-3 rounded transition-all ${
                      heatingSystem === "aerothermal"
                        ? "bg-surface-container-highest border-l-2 border-primary"
                        : "bg-surface-container-low opacity-40 hover:opacity-70"
                    }`}
                  >
                    <span className={`material-symbols-outlined ${heatingSystem === "aerothermal" ? "text-primary" : ""}`}>
                      heat_pump
                    </span>
                    <div className="text-[10px] font-bold">Aeroterminė</div>
                  </button>
                  <button
                    onClick={() => setHeatingSystem("central-gas")}
                    className={`flex items-center gap-3 p-3 rounded transition-all ${
                      heatingSystem === "central-gas"
                        ? "bg-surface-container-highest border-l-2 border-primary"
                        : "bg-surface-container-low opacity-40 hover:opacity-70"
                    }`}
                  >
                    <span className={`material-symbols-outlined ${heatingSystem === "central-gas" ? "text-primary" : ""}`}>
                      gas_meter
                    </span>
                    <div className="text-[10px] font-bold">
                      Centrinis dujos
                    </div>
                  </button>
                </div>
                <div className="pt-2">
                  <label className="text-[10px] font-bold text-outline uppercase block mb-2">
                    Sistemos efektyvumas (%)
                  </label>
                  <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all"
                      style={{
                        width: heatingSystem === "aerothermal" ? "92%" : "78%",
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] font-mono text-outline">
                      NOMINALI: {heatingSystem === "aerothermal" ? "85%" : "72%"}
                    </span>
                    <span className="text-[9px] font-mono text-secondary">
                      FAKTINĖ: {heatingSystem === "aerothermal" ? "92%" : "78%"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Condition & Wear */}
              <div className="col-span-6 p-6 bg-surface-container-high rounded-xl space-y-4">
                <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
                  Būklė ir nusidėvėjimas
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">
                      Struktūrinis vientisumas
                    </span>
                    <div className="flex gap-1">
                      {["OPTIMALUS", "GERAS", "VIDUTINIS"].map((cond) => (
                        <button
                          key={cond}
                          onClick={() => setStructuralCondition(cond)}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                            structuralCondition === cond
                              ? "bg-tertiary-container text-on-tertiary-container"
                              : "bg-surface-container text-outline hover:text-on-surface"
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">Vidaus apdaila</span>
                    <div className="flex gap-1">
                      {["AUKŠTA", "STANDARTINĖ", "DALINĖ"].map((cond) => (
                        <button
                          key={cond}
                          onClick={() => setInteriorFinish(cond)}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                            interiorFinish === cond
                              ? "bg-primary-container text-on-primary-container"
                              : "bg-surface-container text-outline hover:text-on-surface"
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">
                      Inžinerinės sistemos
                    </span>
                    <div className="flex gap-1">
                      {["NAUJA", "ATNAUJINTA", "SENA"].map((cond) => (
                        <button
                          key={cond}
                          onClick={() => setUtilitySystems(cond)}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                            utilitySystems === cond
                              ? "bg-secondary-container text-on-secondary-container"
                              : "bg-surface-container text-outline hover:text-on-surface"
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-8 border-t border-white/5">
            <button
              onClick={handleGenerate}
              className="w-full h-20 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed rounded-xl flex flex-col items-center justify-center group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-black tracking-[0.4em] uppercase">
                GENERUOTI ANALIZĘ
              </span>
              <span className="text-[10px] opacity-70 mt-1 font-mono tracking-widest">
                NUMATOMAS SKAIČIAVIMO LAIKAS: 4,2s
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Right Panel: Project History */}
      <aside className="w-80 bg-surface-container-low border-l border-white/5 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/5 bg-[#121317]">
          <h3 className="text-xs font-black text-outline uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">history</span>
            Projektų istorija
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveHistoryId(item.id)}
              className={`p-4 bg-surface-container-high rounded-lg space-y-3 group hover:ring-1 ring-primary/30 transition-all cursor-pointer ${
                activeHistoryId === item.id
                  ? "ring-1 ring-primary/50 opacity-100"
                  : activeHistoryId === "4091" && item.id === "4091"
                  ? "opacity-100"
                  : item.id === "4088"
                  ? "opacity-60 hover:opacity-100"
                  : "opacity-40 hover:opacity-100"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-bold text-primary">
                    #{item.id}
                  </div>
                  <div className="text-xs font-semibold">{item.address}</div>
                </div>
                <span className="text-[9px] font-mono text-outline">
                  {item.time}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-[9px] text-outline uppercase">Vertė</div>
                  <div className="text-sm font-bold">{item.value}</div>
                </div>
                <div className="h-6 w-[1px] bg-white/10" />
                <div>
                  <div className="text-[9px] text-outline uppercase">
                    Pelningumas
                  </div>
                  <div className="text-sm font-bold text-secondary">
                    {item.yield}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Preview */}
        <div className="p-4 space-y-2">
          <div className="w-full rounded-lg relative overflow-hidden">
            <MapPreview lat={54.6872} lng={25.2797} height={128} />
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[9px] font-mono tracking-tighter">
              LAT: 54,687 | LON: 25,279
            </div>
          </div>
          <p className="text-[10px] text-outline italic text-center">
            Palydovinis signalas susietas su esamu adreso kontekstu
          </p>
        </div>
      </aside>
    </AppLayout>
  );
}
