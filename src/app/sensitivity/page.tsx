"use client";

import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";

function formatEur(n: number) {
  return n.toLocaleString("lt-LT").replace(/,/g, " ") + " €";
}

export default function Sensitivity() {
  const [area, setArea] = useState(75);
  const [buildYear, setBuildYear] = useState(2022);
  const [energyIndex, setEnergyIndex] = useState(90);
  const [locationCoef, setLocationCoef] = useState(1.0);

  const basePrice = 4200; // €/m²

  const valuation = useMemo(() => {
    // Energy bonus: higher index = higher multiplier
    const energyMultiplier = 0.85 + (energyIndex / 100) * 0.25;
    // Build year bonus: newer = higher
    const yearBonus = Math.max(0, (buildYear - 1990) / 40) * 0.15;
    // Location coefficient directly multiplies
    const value = Math.round(area * basePrice * energyMultiplier * (1 + yearBonus) * locationCoef);
    return value;
  }, [area, buildYear, energyIndex, locationCoef]);

  const lowValue = Math.round(valuation * 0.95);
  const highValue = Math.round(valuation * 1.05);

  const energyLabel = energyIndex >= 85 ? "A++" : energyIndex >= 70 ? "A+" : energyIndex >= 50 ? "B" : "C";

  return (
    <AppLayout activeItem="sensitivity-analysis">
      <div className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <header>
            <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase block mb-2">
              Analitikos moduliai / Jautrumas
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-on-surface">
              JAUTRUMO ANALIZĖ
            </h1>
            <p className="text-sm text-outline mt-2 max-w-2xl">
              Keiskite parametrus ir stebėkite, kaip jie veikia galutinę turto
              vertę. Kiekvienas slankiklis atspindi vieną vertinimo kintamąjį.
            </p>
          </header>

          <div className="grid grid-cols-12 gap-8">
            {/* Sliders Panel */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              {/* Area Slider */}
              <div className="bg-surface-container p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      square_foot
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                      Plotas m²
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary font-mono">
                    {area} m²
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={300}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] font-mono text-outline">
                  <span>20 m²</span>
                  <span>300 m²</span>
                </div>
              </div>

              {/* Build Year Slider */}
              <div className="bg-surface-container p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      calendar_month
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                      Statybos metai
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary font-mono">
                    {buildYear}
                  </span>
                </div>
                <input
                  type="range"
                  min={1960}
                  max={2026}
                  value={buildYear}
                  onChange={(e) => setBuildYear(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] font-mono text-outline">
                  <span>1960</span>
                  <span>2026</span>
                </div>
              </div>

              {/* Energy Rating Slider */}
              <div className="bg-surface-container p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      bolt
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                      Energinis reitingas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary font-mono">
                      {energyLabel}
                    </span>
                    <span className="text-[10px] text-outline">
                      ({energyIndex}%)
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={energyIndex}
                  onChange={(e) => setEnergyIndex(Number(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-[9px] font-mono text-outline">
                  <span>C (žemas)</span>
                  <span>A++ (aukštas)</span>
                </div>
              </div>

              {/* Location Coefficient Slider */}
              <div className="bg-surface-container p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      location_on
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                      Lokacijos koeficientas
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary font-mono">
                    {locationCoef.toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={180}
                  value={Math.round(locationCoef * 100)}
                  onChange={(e) =>
                    setLocationCoef(Number(e.target.value) / 100)
                  }
                  className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-tertiary"
                />
                <div className="flex justify-between text-[9px] font-mono text-outline">
                  <span>0.50x (periferija)</span>
                  <span>1.80x (centras)</span>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              {/* Main Valuation */}
              <div className="bg-primary text-on-primary-fixed p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">
                    Apskaičiuota vertė
                  </span>
                  <div className="text-4xl font-black mt-2 tracking-tighter">
                    {formatEur(valuation)}
                  </div>
                  <div className="mt-4 flex gap-4 text-[10px] uppercase tracking-widest">
                    <div>
                      <span className="opacity-60 block">Žemutinė riba</span>
                      <span className="font-bold">{formatEur(lowValue)}</span>
                    </div>
                    <div>
                      <span className="opacity-60 block">Viršutinė riba</span>
                      <span className="font-bold">{formatEur(highValue)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Per m2 */}
              <div className="bg-surface-container p-6 border-l-4 border-primary">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Kaina už m²
                </span>
                <div className="text-2xl font-bold text-on-surface mt-1">
                  {formatEur(area > 0 ? Math.round(valuation / area) : 0)}
                  <span className="text-sm text-outline">/m²</span>
                </div>
              </div>

              {/* Impact Breakdown */}
              <div className="bg-surface-container p-6 space-y-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Parametrų poveikis
                </span>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                      <span>Plotas</span>
                      <span className="text-primary">
                        {((area / 75) * 100 - 100).toFixed(0)}% nuo bazės
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${Math.min(100, (area / 300) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                      <span>Statybos metai</span>
                      <span className="text-primary">{buildYear}</span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${((buildYear - 1960) / 66) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                      <span>Energinis reitingas</span>
                      <span className="text-secondary">{energyLabel}</span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary transition-all"
                        style={{ width: `${energyIndex}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                      <span>Lokacija</span>
                      <span className="text-tertiary">
                        {locationCoef.toFixed(2)}x
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-tertiary transition-all"
                        style={{
                          width: `${((locationCoef - 0.5) / 1.3) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
