import AppLayout from "@/components/AppLayout";

export default function Reports() {
  return (
    <AppLayout activeItem="valuation-engine">
      <div className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        {/* Header */}
        <header className="mb-10 flex justify-between items-end">
          <div className="space-y-1">
            <div className="text-[10px] text-primary font-semibold tracking-widest uppercase">
              Sistema / Variklis / Diagnostika
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-on-surface">
              VERTINIMO_ATASKAITOS
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-high px-4 py-2 rounded-lg flex items-center gap-2 border border-outline-variant/10">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">
                search
              </span>
              <input
                className="bg-transparent border-none text-[10px] focus:ring-0 text-on-surface p-0 w-48 placeholder:text-outline-variant uppercase"
                placeholder="FILTRUOTI PAGAL ID AR ADRESĄ..."
                type="text"
              />
            </div>
            <button className="bg-surface-container-highest px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/20">
              <span className="material-symbols-outlined text-sm">
                filter_list
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Globalus filtras
              </span>
            </button>
          </div>
        </header>

        {/* Report Table */}
        <div className="bg-surface-container-high rounded-lg overflow-hidden border-t-2 border-primary/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/50">
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                  Ataskaitos ID
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                  Turto adresas
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                  Vertinimo data
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                  Patikimumas
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                  Būsena
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase text-right">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Row 1 */}
              <tr className="hover:bg-surface-bright/30 transition-colors group">
                <td className="px-6 py-5">
                  <span className="font-mono text-xs text-primary">
                    #RP-9821-X
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium text-on-surface">
                    Vilniaus g. 25, Vilnius, LT-01119
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs text-on-surface-variant">
                    2023.10.24 / 14:02
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[94%]" />
                    </div>
                    <span className="text-[10px] font-bold text-secondary">
                      94%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container/20 text-secondary uppercase tracking-tight">
                    Patvirtinta
                  </span>
                </td>
                <td className="px-6 py-5 text-right space-x-2">
                  <button
                    className="p-2 hover:text-primary transition-colors"
                    title="Eksportuoti PDF"
                  >
                    <span className="material-symbols-outlined text-lg">
                      picture_as_pdf
                    </span>
                  </button>
                  <button
                    className="p-2 hover:text-primary transition-colors"
                    title="Eksportuoti CSV"
                  >
                    <span className="material-symbols-outlined text-lg">
                      csv
                    </span>
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-surface-container-low/20 hover:bg-surface-bright/30 transition-colors group">
                <td className="px-6 py-5">
                  <span className="font-mono text-xs text-primary">
                    #RP-9819-B
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium text-on-surface">
                    Konstitucijos pr. 21, Vilnius, LT-08105
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs text-on-surface-variant">
                    2023.10.22 / 09:45
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[88%]" />
                    </div>
                    <span className="text-[10px] font-bold text-secondary">
                      88%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container/20 text-secondary uppercase tracking-tight">
                    Patvirtinta
                  </span>
                </td>
                <td className="px-6 py-5 text-right space-x-2">
                  <button
                    className="p-2 hover:text-primary transition-colors"
                    title="Eksportuoti PDF"
                  >
                    <span className="material-symbols-outlined text-lg">
                      picture_as_pdf
                    </span>
                  </button>
                  <button
                    className="p-2 hover:text-primary transition-colors"
                    title="Eksportuoti CSV"
                  >
                    <span className="material-symbols-outlined text-lg">
                      csv
                    </span>
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-surface-bright/30 transition-colors group">
                <td className="px-6 py-5">
                  <span className="font-mono text-xs text-primary">
                    #RP-9744-S
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium text-on-surface">
                    Islandijos g. 3, Vilnius, LT-01402
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs text-on-surface-variant">
                    2023.10.21 / 18:12
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-error h-full w-[62%]" />
                    </div>
                    <span className="text-[10px] font-bold text-error">
                      62%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary-container/20 text-tertiary uppercase tracking-tight">
                    Apdorojama
                  </span>
                </td>
                <td className="px-6 py-5 text-right space-x-2">
                  <button className="p-2 opacity-30 cursor-not-allowed">
                    <span className="material-symbols-outlined text-lg">
                      picture_as_pdf
                    </span>
                  </button>
                  <button className="p-2 opacity-30 cursor-not-allowed">
                    <span className="material-symbols-outlined text-lg">
                      csv
                    </span>
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="bg-surface-container-low/20 hover:bg-surface-bright/30 transition-colors group">
                <td className="px-6 py-5">
                  <span className="font-mono text-xs text-primary">
                    #RP-9701-Q
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium text-on-surface">
                    Jogailos g. 4, Vilnius, LT-01116
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs text-on-surface-variant">
                    2023.10.20 / 11:20
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[91%]" />
                    </div>
                    <span className="text-[10px] font-bold text-secondary">
                      91%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container/20 text-secondary uppercase tracking-tight">
                    Patvirtinta
                  </span>
                </td>
                <td className="px-6 py-5 text-right space-x-2">
                  <button
                    className="p-2 hover:text-primary transition-colors"
                    title="Eksportuoti PDF"
                  >
                    <span className="material-symbols-outlined text-lg">
                      picture_as_pdf
                    </span>
                  </button>
                  <button
                    className="p-2 hover:text-primary transition-colors"
                    title="Eksportuoti CSV"
                  >
                    <span className="material-symbols-outlined text-lg">
                      csv
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dashboard Analytics Bottom Panel */}
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className="col-span-12 md:col-span-8 bg-surface-container p-6 rounded-lg flex flex-col justify-between h-48">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-primary uppercase mb-4">
                Gamybos pralaidumas
              </div>
              <div className="flex items-end gap-1 h-20">
                <div className="flex-1 bg-surface-container-high h-[40%] rounded-sm" />
                <div className="flex-1 bg-surface-container-high h-[60%] rounded-sm" />
                <div className="flex-1 bg-surface-container-high h-[30%] rounded-sm" />
                <div className="flex-1 bg-primary h-[85%] rounded-sm" />
                <div className="flex-1 bg-surface-container-high h-[55%] rounded-sm" />
                <div className="flex-1 bg-surface-container-high h-[70%] rounded-sm" />
                <div className="flex-1 bg-surface-container-high h-[45%] rounded-sm" />
                <div className="flex-1 bg-surface-container-high h-[65%] rounded-sm" />
                <div className="flex-1 bg-primary h-[95%] rounded-sm" />
                <div className="flex-1 bg-surface-container-high h-[50%] rounded-sm" />
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-bold tracking-tighter">
              <span>PASKUTINĖ_CIKLO_ANALIZĖ</span>
              <span className="text-secondary">+12,4% EFEKTYVUMAS</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-surface-container-high p-6 rounded-lg flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <div className="text-[10px] font-bold tracking-widest text-on-surface uppercase">
                Sistemos būsena
              </div>
              <span
                className="material-symbols-outlined text-secondary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <div>
              <div className="text-3xl font-bold text-on-surface">NORMALI</div>
              <div className="text-[10px] text-on-surface-variant">
                DELSA: 42MS / CPU: 12%
              </div>
            </div>
            <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
