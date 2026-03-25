import AppLayout from "@/components/AppLayout";

export default function Home() {
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
                <select className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded">
                  <option>Vilnius</option>
                  <option>Kaunas</option>
                  <option>Klaipėda</option>
                </select>
              </div>
              <div className="col-span-4 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Kvartalas
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded"
                  placeholder="pvz. Senamiestis"
                  type="text"
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
                <select className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded">
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
                  className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded"
                  type="text"
                  defaultValue="75,5"
                />
              </div>
              <div className="col-span-3 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Statybos metai
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none text-sm text-on-surface px-4 py-3 focus:ring-0 focus:border-b-2 focus:border-primary transition-all rounded"
                  type="number"
                  defaultValue="2022"
                />
              </div>
              <div className="col-span-3 space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Energinis reitingas
                </label>
                <div className="flex gap-1">
                  <button className="flex-1 py-3 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded">
                    A++
                  </button>
                  <button className="flex-1 py-3 bg-surface-container-highest text-outline text-[10px] font-bold rounded">
                    A+
                  </button>
                  <button className="flex-1 py-3 bg-surface-container-highest text-outline text-[10px] font-bold rounded">
                    B
                  </button>
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
                  <div className="flex items-center gap-3 p-3 bg-surface-container-highest rounded border-l-2 border-primary">
                    <span className="material-symbols-outlined text-primary">
                      heat_pump
                    </span>
                    <div className="text-[10px] font-bold">Aeroterminė</div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded opacity-40">
                    <span className="material-symbols-outlined">
                      gas_meter
                    </span>
                    <div className="text-[10px] font-bold">
                      Centrinis dujos
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <label className="text-[10px] font-bold text-outline uppercase block mb-2">
                    Sistemos efektyvumas (%)
                  </label>
                  <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[92%]" />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] font-mono text-outline">
                      NOMINALI: 85%
                    </span>
                    <span className="text-[9px] font-mono text-secondary">
                      FAKTINĖ: 92%
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
                    <span className="text-[10px] font-mono bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded">
                      OPTIMALUS
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">Vidaus apdaila</span>
                    <span className="text-[10px] font-mono bg-primary-container text-on-primary-container px-2 py-0.5 rounded">
                      AUKŠTA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">
                      Inžinerinės sistemos
                    </span>
                    <span className="text-[10px] font-mono bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">
                      NAUJA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-8 border-t border-white/5">
            <button className="w-full h-20 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed rounded-xl flex flex-col items-center justify-center group relative overflow-hidden">
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
          {/* History Item 1 */}
          <div className="p-4 bg-surface-container-high rounded-lg space-y-3 group hover:ring-1 ring-primary/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-primary">#4091</div>
                <div className="text-xs font-semibold">
                  Konstitucijos pr. 21
                </div>
              </div>
              <span className="text-[9px] font-mono text-outline">
                prieš 2 min.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[9px] text-outline uppercase">Vertė</div>
                <div className="text-sm font-bold">345 000 €</div>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <div className="text-[9px] text-outline uppercase">
                  Pelningumas
                </div>
                <div className="text-sm font-bold text-secondary">5,2%</div>
              </div>
            </div>
          </div>

          {/* History Item 2 */}
          <div className="p-4 bg-surface-container-high rounded-lg space-y-3 opacity-60 hover:opacity-100 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-primary">#4088</div>
                <div className="text-xs font-semibold">Jogailos g. 4</div>
              </div>
              <span className="text-[9px] font-mono text-outline">
                prieš 1 val.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[9px] text-outline uppercase">Vertė</div>
                <div className="text-sm font-bold">1 280 000 €</div>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <div className="text-[9px] text-outline uppercase">
                  Pelningumas
                </div>
                <div className="text-sm font-bold text-secondary">4,8%</div>
              </div>
            </div>
          </div>

          {/* History Item 3 */}
          <div className="p-4 bg-surface-container-high rounded-lg space-y-3 opacity-40 hover:opacity-100 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-primary">#4087</div>
                <div className="text-xs font-semibold">Vokiečių g. 12</div>
              </div>
              <span className="text-[9px] font-mono text-outline">
                prieš 4 val.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[9px] text-outline uppercase">Vertė</div>
                <div className="text-sm font-bold">890 000 €</div>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <div className="text-[9px] text-outline uppercase">
                  Pelningumas
                </div>
                <div className="text-sm font-bold text-secondary">6,1%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="p-4 space-y-2">
          <div className="h-32 w-full rounded-lg relative overflow-hidden bg-gradient-to-br from-surface-container-high via-primary-container/20 to-surface-container">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse ring-4 ring-primary/20" />
            </div>
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
