import AppLayout from "@/components/AppLayout";

export default function Analytics() {
  return (
    <AppLayout activeItem="input-terminal">
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
                  412 400 €{" "}
                  <span className="text-2xl text-slate-600">&mdash;</span>{" "}
                  438 900 €
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
                  425 150 €
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
              94<span className="text-3xl">%</span>
            </div>
            <div className="w-full h-1 bg-on-primary-fixed/20 mt-2 z-10 overflow-hidden">
              <div className="w-[94%] h-full bg-on-primary-fixed" />
            </div>
            <p className="text-[10px] font-medium mt-4 z-10 text-center uppercase tracking-tighter">
              Agreguota iš 12 aktyvių rinkos rodiklių
            </p>
          </div>
        </section>

        {/* MIDDLE SECTION: Map & Analytics */}
        <section className="grid grid-cols-12 gap-6">
          {/* Map */}
          <div className="col-span-12 xl:col-span-7 bg-surface-container h-[500px] relative overflow-hidden">
            <div className="absolute top-6 left-6 z-10">
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-1">
                Regioninė žvalgyba
              </span>
              <h3 className="text-xl font-bold tracking-tight">
                VILNIAUS_METRO_RAJONAI
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
            {/* Abstract Map */}
            <div className="w-full h-full bg-surface-container flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-surface-container via-surface-container-high/30 to-surface-container-low relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 grid grid-cols-6 grid-rows-6 opacity-60">
                    <div className="col-start-3 row-start-2 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#a0c9ff]" />
                    <div className="col-start-5 row-start-4 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#6bde80]" />
                    <div className="col-start-2 row-start-5 w-4 h-4 bg-primary-container rounded-full opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-white/5 flex justify-between items-center">
              <div className="flex space-x-8">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">
                    Karštasis taškas
                  </span>
                  <div className="text-sm font-bold">
                    Senamiestis / Šnipiškės
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
              <button className="bg-surface-container-highest px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-colors">
                Išplėsti vaizdą
              </button>
            </div>
          </div>

          {/* Table & Chart Area */}
          <div className="col-span-12 xl:col-span-5 flex flex-col space-y-6">
            {/* CMA Table */}
            <div className="bg-surface-container p-6 flex-1 overflow-hidden flex flex-col">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    Lyginamoji rinkos analizė
                  </span>
                  <h4 className="text-sm font-bold tracking-tight mt-1 uppercase">
                    Aktyvūs etalonai (N=5)
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
                    <tr className="hover:bg-surface-container-high transition-colors">
                      <td className="py-3 font-medium text-on-surface">
                        Didžioji g. 22
                      </td>
                      <td className="py-3 text-slate-400">82 m²</td>
                      <td className="py-3 font-semibold">435 tūkst. €</td>
                      <td className="py-3 text-right text-secondary font-bold">
                        +1,2%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-high transition-colors">
                      <td className="py-3 font-medium text-on-surface">
                        Subačiaus g. 14
                      </td>
                      <td className="py-3 text-slate-400">75 m²</td>
                      <td className="py-3 font-semibold">412 tūkst. €</td>
                      <td className="py-3 text-right text-error font-bold">
                        -4,1%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-high transition-colors">
                      <td className="py-3 font-medium text-on-surface">
                        Pylimo g. 8
                      </td>
                      <td className="py-3 text-slate-400">91 m²</td>
                      <td className="py-3 font-semibold">460 tūkst. €</td>
                      <td className="py-3 text-right text-secondary font-bold">
                        +7,2%
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-high transition-colors">
                      <td className="py-3 font-medium text-on-surface">
                        Vokiečių g. 3
                      </td>
                      <td className="py-3 text-slate-400">68 m²</td>
                      <td className="py-3 font-semibold">421 tūkst. €</td>
                      <td className="py-3 text-right text-slate-400 font-bold">
                        0,0%
                      </td>
                    </tr>
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
            {/* Scatter Plot */}
            <div className="flex-1 min-h-[220px] border-l border-b border-outline-variant/30 relative mt-4 mx-4">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-10">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-t border-slate-400"
                  />
                ))}
              </div>
              <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-slate-700 rounded-full opacity-60" />
              <div className="absolute bottom-[45%] left-[30%] w-3 h-3 bg-slate-700 rounded-full opacity-60" />
              <div className="absolute bottom-[30%] left-[55%] w-2.5 h-2.5 bg-slate-700 rounded-full opacity-60" />
              <div className="absolute bottom-[65%] left-[45%] w-4 h-4 bg-slate-700 rounded-full opacity-40" />
              <div className="absolute bottom-[75%] left-[75%] w-2 h-2 bg-slate-700 rounded-full opacity-60" />
              <div className="absolute bottom-[55%] left-[85%] w-3 h-3 bg-slate-700 rounded-full opacity-60" />
              {/* Subject */}
              <div className="absolute bottom-[52%] left-[42%] w-5 h-5 bg-primary rounded-full shadow-[0_0_15px_#a0c9ff] flex items-center justify-center">
                <div className="w-2 h-2 bg-on-primary rounded-full" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                Plotas (m²)
              </div>
              <div className="absolute -left-10 top-1/2 -rotate-90 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                Pardavimo kaina (€)
              </div>
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
                    <span className="text-primary">Objektas: A++</span>
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
                    <span className="text-primary">Objektas: OPTIMALUS</span>
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
