"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AppLayout from "@/components/AppLayout";

const MapPreview = dynamic(() => import("@/components/maps/MapPreview"), {
  ssr: false,
  loading: () => <div className="bg-surface-container-lowest animate-pulse" style={{ height: "192px" }} />,
});

interface ArchiveItem {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  pricePerM2: string;
  yieldPct: string;
  yieldColor: string;
  roi: string;
  statusLabel: string;
  statusColor: string;
  gradient: string;
  history: { label: string; date: string }[];
}

const archiveItems: ArchiveItem[] = [
  {
    id: "VIL-00452-X",
    name: "Žirmūnų Loft Terrace",
    address: "Žirmūnų g. 68, Vilnius, Lietuva",
    city: "Vilnius",
    lat: 54.7167,
    lng: 25.2667,
    pricePerM2: "3 450 €/m²",
    yieldPct: "6,42%",
    yieldColor: "text-secondary",
    roi: "18,5%",
    statusLabel: "Stabilus",
    statusColor: "bg-secondary-container text-on-secondary-container",
    gradient: "from-primary/20 via-surface-container-high to-primary-container/10",
    history: [
      { label: "Momentinė kopija užfiksuota", date: "2023 SPL 12" },
      { label: "Pakartotinis vertinimas", date: "2024 SAU 04" },
    ],
  },
  {
    id: "KAU-00128-B",
    name: "Nerimi Park Heights",
    address: "Kęstučio g. 14, Kaunas, Lietuva",
    city: "Kaunas",
    lat: 54.8985,
    lng: 23.9036,
    pricePerM2: "2 120 €/m²",
    yieldPct: "3,88%",
    yieldColor: "text-error",
    roi: "9,2%",
    statusLabel: "Dėmesio",
    statusColor: "bg-error-container text-on-error-container",
    gradient: "from-tertiary/15 via-surface-container-high to-error/10",
    history: [
      { label: "Pradinis įvertinimas", date: "2023 LAP 15" },
      { label: "Archyvas sukurtas", date: "2023 LAP 15" },
    ],
  },
  {
    id: "KLA-00089-V",
    name: "Memel Quarter Hub",
    address: "Danės g. 1, Klaipėda, Lietuva",
    city: "Klaipėda",
    lat: 55.7033,
    lng: 21.1443,
    pricePerM2: "2 980 €/m²",
    yieldPct: "5,95%",
    yieldColor: "text-secondary",
    roi: "22,1%",
    statusLabel: "Augimas",
    statusColor: "bg-primary-container text-on-primary-container",
    gradient: "from-secondary/15 via-surface-container-high to-primary/10",
    history: [
      { label: "Rinkos pokyčio adaptacija", date: "2024 VAS 02" },
      { label: "Paskutinis atnaujinimas", date: "2024 VAS 10" },
    ],
  },
  {
    id: "VIL-00501-K",
    name: "Antakalnis Residence",
    address: "Antakalnio g. 32, Vilnius, Lietuva",
    city: "Vilnius",
    lat: 54.6986,
    lng: 25.3100,
    pricePerM2: "3 890 €/m²",
    yieldPct: "5,12%",
    yieldColor: "text-secondary",
    roi: "15,8%",
    statusLabel: "Stabilus",
    statusColor: "bg-secondary-container text-on-secondary-container",
    gradient: "from-primary/20 via-surface-container-high to-secondary/10",
    history: [
      { label: "Pradinis įvertinimas", date: "2024 KOV 01" },
      { label: "Rinkos koregavimas", date: "2024 KOV 15" },
    ],
  },
  {
    id: "VIL-00523-M",
    name: "Šnipiškių Tower View",
    address: "Lvovo g. 25, Vilnius, Lietuva",
    city: "Vilnius",
    lat: 54.6944,
    lng: 25.2756,
    pricePerM2: "4 120 €/m²",
    yieldPct: "4,65%",
    yieldColor: "text-secondary",
    roi: "14,2%",
    statusLabel: "Augimas",
    statusColor: "bg-primary-container text-on-primary-container",
    gradient: "from-tertiary/15 via-surface-container-high to-primary/10",
    history: [
      { label: "Archyvas sukurtas", date: "2024 BAL 10" },
      { label: "Paskutinis atnaujinimas", date: "2024 GEG 01" },
    ],
  },
  {
    id: "KAU-00145-R",
    name: "Aleksotas River Edge",
    address: "Veiverių g. 8, Kaunas, Lietuva",
    city: "Kaunas",
    lat: 54.8879,
    lng: 23.9128,
    pricePerM2: "1 950 €/m²",
    yieldPct: "7,10%",
    yieldColor: "text-secondary",
    roi: "20,3%",
    statusLabel: "Stabilus",
    statusColor: "bg-secondary-container text-on-secondary-container",
    gradient: "from-secondary/15 via-surface-container-high to-primary/10",
    history: [
      { label: "Momentinė kopija užfiksuota", date: "2024 SAU 20" },
      { label: "Pakartotinis vertinimas", date: "2024 VAS 28" },
    ],
  },
];

interface FilterTag {
  id: string;
  label: string;
  colorClass: string;
}

const ITEMS_PER_PAGE = 3;

export default function Archive() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterTag[]>([
    { id: "region-vilnius", label: "REGIONAS: VILNIUS", colorClass: "bg-primary-container/20 text-primary" },
    { id: "yield-5", label: "PELNINGUMAS > 5%", colorClass: "bg-tertiary-container/20 text-tertiary" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  function removeFilter(id: string) {
    setFilters((f) => f.filter((tag) => tag.id !== id));
    setCurrentPage(1);
  }

  function clearAllFilters() {
    setFilters([]);
    setCurrentPage(1);
  }

  const filteredItems = useMemo(() => {
    let items = archiveItems;
    for (const f of filters) {
      if (f.id === "region-vilnius") {
        items = items.filter((i) => i.city === "Vilnius");
      }
      if (f.id === "yield-5") {
        items = items.filter((i) => parseFloat(i.yieldPct.replace(",", ".")) > 5);
      }
    }
    return items;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const visibleItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleCsvExport() {
    const headers = ["ID", "Pavadinimas", "Adresas", "Kaina/m²", "Pelningumas", "IG (3 m.)"];
    const csvRows = [headers.join(";")];
    for (const item of filteredItems) {
      csvRows.push([item.id, item.name, item.address, item.pricePerM2, item.yieldPct, item.roi].join(";"));
    }
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archyvas_eksportas.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

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
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-1.5 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-surface-container-highest text-primary shadow-sm"
                        : "text-outline-variant hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      grid_view
                    </span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-1.5 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-surface-container-highest text-primary shadow-sm"
                        : "text-outline-variant hover:text-on-surface"
                    }`}
                  >
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
                <button
                  onClick={handleCsvExport}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface text-xs font-semibold rounded-lg hover:bg-surface-variant transition-colors"
                >
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
                {filters.map((f) => (
                  <span
                    key={f.id}
                    className={`${f.colorClass} px-3 py-1 rounded text-[10px] font-bold flex items-center gap-2`}
                  >
                    {f.label}
                    <span
                      className="material-symbols-outlined text-[12px] cursor-pointer hover:opacity-70"
                      onClick={() => removeFilter(f.id)}
                    >
                      close
                    </span>
                  </span>
                ))}
                {filters.length > 0 && (
                  <span
                    onClick={clearAllFilters}
                    className="bg-surface-container-highest text-outline px-3 py-1 rounded text-[10px] font-bold flex items-center gap-2 cursor-pointer hover:text-on-surface transition-colors"
                  >
                    IŠVALYTI_VISKĄ
                  </span>
                )}
                {filters.length === 0 && (
                  <span className="text-[10px] text-outline italic">
                    Filtrų nėra
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Project Library */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-low flex flex-col group overflow-hidden border-t-2 border-transparent hover:border-primary transition-all duration-300"
                >
                  <div className="relative h-48 bg-surface-container-high overflow-hidden">
                    <MapPreview lat={item.lat} lng={item.lng} height={192} />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-2 py-1 text-[10px] font-bold text-primary border border-primary/20">
                      ID: {item.id}
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <span
                        className={`${item.statusColor} px-2 py-1 text-[9px] font-bold uppercase rounded`}
                      >
                        {item.statusLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-on-surface mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-outline-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            location_on
                          </span>
                          {item.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">
                          Rinkos kaina
                        </div>
                        <div className="text-lg font-bold text-on-surface">
                          {item.pricePerM2}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-surface-container-high p-3 rounded">
                        <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                          Projekto pelningumas
                        </div>
                        <div className={`text-xl font-bold ${item.yieldColor}`}>
                          {item.yieldPct}
                        </div>
                      </div>
                      <div className="bg-surface-container-high p-3 rounded">
                        <div className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                          IG (3 m.)
                        </div>
                        <div className="text-xl font-bold text-primary">
                          {item.roi}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="text-[10px] font-bold text-slate-600 tracking-[0.1em] border-b border-outline-variant/10 pb-1">
                        ISTORIJOS_ŽURNALAS
                      </div>
                      {item.history.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-[10px]"
                        >
                          <span className="text-outline-variant">
                            {h.label}
                          </span>
                          <span className="text-on-surface-variant font-medium">
                            {h.date}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => router.push(`/archive/${item.id}`)}
                      className="w-full py-2 bg-surface-container-highest text-on-surface text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all"
                    >
                      ATIDARYTI_PILNĄ_BYLĄ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-low p-6 flex items-center gap-6 group hover:ring-1 ring-primary/30 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="text-[10px] font-bold text-primary">
                      {item.id}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-on-surface">
                      {item.name}
                    </h3>
                    <p className="text-xs text-outline-variant truncate">
                      {item.address}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-on-surface">
                      {item.pricePerM2}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 w-20">
                    <div className={`text-sm font-bold ${item.yieldColor}`}>
                      {item.yieldPct}
                    </div>
                    <div className="text-[9px] text-outline uppercase">
                      Pelningumas
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`${item.statusColor} px-2 py-1 text-[9px] font-bold uppercase rounded`}
                    >
                      {item.statusLabel}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push(`/archive/${item.id}`)}
                    className="flex-shrink-0 px-4 py-2 bg-surface-container-highest text-on-surface text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all"
                  >
                    ATIDARYTI
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-between items-center py-6 border-t border-outline-variant/10">
            <div className="text-[10px] font-medium text-slate-500 tracking-wider">
              RODOMA {visibleItems.length} IŠ {filteredItems.length} ARCHYVUOTŲ PROJEKTŲ
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 bg-surface-container-high flex items-center justify-center rounded hover:bg-surface-variant text-outline hover:text-on-surface transition-all disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded font-bold text-xs transition-all ${
                    currentPage === i + 1
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-high hover:bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 bg-surface-container-high flex items-center justify-center rounded hover:bg-surface-variant text-outline hover:text-on-surface transition-all disabled:opacity-30"
              >
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
