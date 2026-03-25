import AppLayout from "@/components/AppLayout";

export default function Archive() {
  return (
    <AppLayout activeItem="final-export">
      <div className="flex-1 overflow-y-auto bg-background p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header & Filter Section */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-2">
                  Sistemos saugykla
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-on-surface">
                  ARCHYVAS_01.LBR
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-surface-container-high p-1 rounded-lg">
                  <button className="px-4 py-1.5 bg-surface-container-highest text-primary rounded shadow-sm">
                    <span className="material-symbols-outlined text-sm">
                      grid_view
                    </span>
                  </button>
                  <button className="px-4 py-1.5 text-outline-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      view_list
                    </span>
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface text-xs font-semibold rounded-lg hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    filter_list
                  </span>
                  IŠPLĖSTINIAI_FILTRAI
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface text-xs font-semibold rounded-lg hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>
                  EKSPORTAS_CSV
                </button>
              </div>
            </div>

            {/* Active Filters Bar */}
            <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-lg">
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase pl-2">
                AKTYVIOS_ŽYMOS:
              </span>
              <div className="flex gap-2">
                <span className="bg-primary-container/20 text-primary px-3 py-1 rounded text-[10px] font-bold flex items-center gap-2">
                  REGIONAS: VILNIUS
                  <span className="material-symbols-outlined text-[12px] cursor-pointer">
                    close
                  </span>
                </span>
                <span className="bg-tertiary-container/20 text-tertiary px-3 py-1 rounded text-[10px] font-bold flex items-center gap-2">
                  PELNINGUMAS &gt; 5%
                  <span className="material-symbols-outlined text-[12px] cursor-pointer">
                    close
                  </span>
                </span>
                <span className="bg-surface-container-highest text-outline px-3 py-1 rounded text-[10px] font-bold flex items-center gap-2 cursor-pointer hover:text-on-surface">
                  IŠVALYTI_VISKĄ
                </span>
              </div>
            </div>
          </div>

          {/* Project Library Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Archive Card 01 */}
            <div className="bg-surface-container-low flex flex-col group overflow-hidden border-t-2 border-transparent hover:border-primary transition-all duration-300">
              <div className="relative h-48 bg-surface-container-high overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-surface-container-high to-primary-container/10 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-2 py-1 text-[10px] font-bold text-primary border border-primary/20">
                  ID: VIL-00452-X
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-1 text-[9px] font-bold uppercase rounded">
                    Stabilus
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface mb-1">
                      Žirmūnų Loft Terrace
                    </h3>
                    <p className="text-xs text-outline-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        location_on
                      </span>
                      Žirmūnų g. 68, Vilnius, Lietuva
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">
                      Rinkos kaina
                    </div>
                    <div className="text-lg font-bold text-on-surface">
                      3 450 €/m²
                    </div>
                  </div>
                </div>
                {/* Core Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      Projekto pelningumas
                    </div>
                    <div className="text-xl font-bold text-secondary">
                      6,42%
                    </div>
                  </div>
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      IG (3 m.)
                    </div>
                    <div className="text-xl font-bold text-primary">18,5%</div>
                  </div>
                </div>
                {/* History Log */}
                <div className="space-y-3 mb-6">
                  <div className="text-[10px] font-bold text-slate-600 tracking-[0.1em] border-b border-outline-variant/10 pb-1">
                    ISTORIJOS_ŽURNALAS
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-outline-variant">
                      Momentinė kopija užfiksuota
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      2023 SPL 12
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-outline-variant">
                      Pakartotinis vertinimas
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      2024 SAU 04
                    </span>
                  </div>
                </div>
                <button className="w-full py-2 bg-surface-container-highest text-on-surface text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all">
                  ATIDARYTI_PILNĄ_BYLĄ
                </button>
              </div>
            </div>

            {/* Archive Card 02 */}
            <div className="bg-surface-container-low flex flex-col group overflow-hidden border-t-2 border-transparent hover:border-primary transition-all duration-300">
              <div className="relative h-48 bg-surface-container-high overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-tertiary/15 via-surface-container-high to-error/10 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-2 py-1 text-[10px] font-bold text-primary border border-primary/20">
                  ID: KAU-00128-B
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <span className="bg-error-container text-on-error-container px-2 py-1 text-[9px] font-bold uppercase rounded">
                    Dėmesio
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface mb-1">
                      Nerimi Park Heights
                    </h3>
                    <p className="text-xs text-outline-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        location_on
                      </span>
                      Kęstučio g. 14, Kaunas, Lietuva
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">
                      Rinkos kaina
                    </div>
                    <div className="text-lg font-bold text-on-surface">
                      2 120 €/m²
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      Projekto pelningumas
                    </div>
                    <div className="text-xl font-bold text-error">3,88%</div>
                  </div>
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      IG (3 m.)
                    </div>
                    <div className="text-xl font-bold text-primary">9,2%</div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="text-[10px] font-bold text-slate-600 tracking-[0.1em] border-b border-outline-variant/10 pb-1">
                    ISTORIJOS_ŽURNALAS
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-outline-variant">
                      Pradinis įvertinimas
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      2023 LAP 15
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-outline-variant">
                      Archyvas sukurtas
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      2023 LAP 15
                    </span>
                  </div>
                </div>
                <button className="w-full py-2 bg-surface-container-highest text-on-surface text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all">
                  ATIDARYTI_PILNĄ_BYLĄ
                </button>
              </div>
            </div>

            {/* Archive Card 03 */}
            <div className="bg-surface-container-low flex flex-col group overflow-hidden border-t-2 border-transparent hover:border-primary transition-all duration-300">
              <div className="relative h-48 bg-surface-container-high overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-secondary/15 via-surface-container-high to-primary/10 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-2 py-1 text-[10px] font-bold text-primary border border-primary/20">
                  ID: KLA-00089-V
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <span className="bg-primary-container text-on-primary-container px-2 py-1 text-[9px] font-bold uppercase rounded">
                    Augimas
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface mb-1">
                      Memel Quarter Hub
                    </h3>
                    <p className="text-xs text-outline-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        location_on
                      </span>
                      Danės g. 1, Klaipėda, Lietuva
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">
                      Rinkos kaina
                    </div>
                    <div className="text-lg font-bold text-on-surface">
                      2 980 €/m²
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      Projekto pelningumas
                    </div>
                    <div className="text-xl font-bold text-secondary">
                      5,95%
                    </div>
                  </div>
                  <div className="bg-surface-container-high p-3 rounded">
                    <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                      IG (3 m.)
                    </div>
                    <div className="text-xl font-bold text-primary">22,1%</div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="text-[10px] font-bold text-slate-600 tracking-[0.1em] border-b border-outline-variant/10 pb-1">
                    ISTORIJOS_ŽURNALAS
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-outline-variant">
                      Rinkos pokyčio adaptacija
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      2024 VAS 02
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-outline-variant">
                      Paskutinis atnaujinimas
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      2024 VAS 10
                    </span>
                  </div>
                </div>
                <button className="w-full py-2 bg-surface-container-highest text-on-surface text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all">
                  ATIDARYTI_PILNĄ_BYLĄ
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-between items-center py-6 border-t border-outline-variant/10">
            <div className="text-[10px] font-medium text-slate-500 tracking-wider">
              RODOMA 12 IŠ 284 ARCHYVUOTŲ PROJEKTŲ
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-surface-container-high flex items-center justify-center rounded hover:bg-surface-variant text-outline hover:text-on-surface transition-all">
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center rounded font-bold text-xs">
                1
              </button>
              <button className="w-8 h-8 bg-surface-container-high flex items-center justify-center rounded hover:bg-surface-variant text-on-surface-variant font-bold text-xs">
                2
              </button>
              <button className="w-8 h-8 bg-surface-container-high flex items-center justify-center rounded hover:bg-surface-variant text-on-surface-variant font-bold text-xs">
                3
              </button>
              <span className="px-2 text-slate-600 self-center">...</span>
              <button className="w-8 h-8 bg-surface-container-high flex items-center justify-center rounded hover:bg-surface-variant text-on-surface-variant font-bold text-xs">
                24
              </button>
              <button className="w-8 h-8 bg-surface-container-high flex items-center justify-center rounded hover:bg-surface-variant text-outline hover:text-on-surface transition-all">
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
