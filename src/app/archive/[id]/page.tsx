"use client";

import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AppLayout from "@/components/AppLayout";

const DarkMap = dynamic(() => import("@/components/maps/DarkMap"), {
  ssr: false,
  loading: () => <div className="bg-surface-container-lowest animate-pulse" style={{ height: "256px" }} />,
});

const propertyData: Record<
  string,
  {
    name: string;
    address: string;
    city: string;
    lat: number;
    lng: number;
    pricePerM2: string;
    totalValue: string;
    area: string;
    buildYear: string;
    energyRating: string;
    yieldPct: string;
    roi: string;
    status: string;
    timeline: { date: string; event: string }[];
  }
> = {
  "VIL-00452-X": {
    name: "Žirmūnų Loft Terrace",
    address: "Žirmūnų g. 68, Vilnius, Lietuva",
    city: "Vilnius",
    lat: 54.7167,
    lng: 25.2667,
    pricePerM2: "3 450 €/m²",
    totalValue: "258 750 €",
    area: "75 m²",
    buildYear: "2022",
    energyRating: "A++",
    yieldPct: "6,42%",
    roi: "18,5%",
    status: "Stabilus",
    timeline: [
      { date: "2024 SAU 04", event: "Pakartotinis vertinimas atliktas" },
      { date: "2023 SPL 12", event: "Momentinė kopija užfiksuota" },
      { date: "2023 RGS 20", event: "Pradinis vertinimas pateiktas" },
      { date: "2023 LIE 15", event: "Turto byla sukurta sistemoje" },
    ],
  },
  "KAU-00128-B": {
    name: "Nerimi Park Heights",
    address: "Kęstučio g. 14, Kaunas, Lietuva",
    city: "Kaunas",
    lat: 54.8985,
    lng: 23.9036,
    pricePerM2: "2 120 €/m²",
    totalValue: "169 600 €",
    area: "80 m²",
    buildYear: "2018",
    energyRating: "A+",
    yieldPct: "3,88%",
    roi: "9,2%",
    status: "Dėmesio",
    timeline: [
      { date: "2023 LAP 15", event: "Archyvas sukurtas" },
      { date: "2023 LAP 15", event: "Pradinis įvertinimas" },
      { date: "2023 SPL 28", event: "Rinkos analizė užbaigta" },
    ],
  },
  "KLA-00089-V": {
    name: "Memel Quarter Hub",
    address: "Danės g. 1, Klaipėda, Lietuva",
    city: "Klaipėda",
    lat: 55.7033,
    lng: 21.1443,
    pricePerM2: "2 980 €/m²",
    totalValue: "232 440 €",
    area: "78 m²",
    buildYear: "2020",
    energyRating: "A+",
    yieldPct: "5,95%",
    roi: "22,1%",
    status: "Augimas",
    timeline: [
      { date: "2024 VAS 10", event: "Paskutinis atnaujinimas" },
      { date: "2024 VAS 02", event: "Rinkos pokyčio adaptacija" },
      { date: "2023 GRD 15", event: "Pradinis vertinimas" },
    ],
  },
};

const defaultProperty = {
  name: "Nežinomas turtas",
  address: "Adresas nenustatytas",
  city: "—",
  lat: 54.6872,
  lng: 25.2797,
  pricePerM2: "— €/m²",
  totalValue: "— €",
  area: "— m²",
  buildYear: "—",
  energyRating: "—",
  yieldPct: "—",
  roi: "—",
  status: "Nežinoma",
  timeline: [
    { date: "—", event: "Duomenų nėra" },
  ],
};

export default function PropertyDossier() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const property = propertyData[id] || defaultProperty;

  return (
    <AppLayout activeItem="final-export">
      <div className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
          <button
            onClick={() => router.push("/archive")}
            className="flex items-center gap-2 text-xs font-bold text-primary hover:text-on-surface transition-colors uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            GRĮŽTI Į ARCHYVĄ
          </button>

          {/* Header */}
          <header className="flex justify-between items-end">
            <div>
              <div className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mb-1">
                Turto byla / {id}
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-on-surface">
                {property.name}
              </h1>
              <p className="text-sm text-outline-variant flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>
                {property.address}
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Bendra vertė
              </div>
              <div className="text-3xl font-bold text-primary">
                {property.totalValue}
              </div>
            </div>
          </header>

          {/* Key Metrics */}
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-3 bg-surface-container p-5">
              <div className="text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Kaina / m²
              </div>
              <div className="text-2xl font-bold text-on-surface">
                {property.pricePerM2}
              </div>
            </div>
            <div className="col-span-3 bg-surface-container p-5">
              <div className="text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Plotas
              </div>
              <div className="text-2xl font-bold text-on-surface">
                {property.area}
              </div>
            </div>
            <div className="col-span-3 bg-surface-container p-5">
              <div className="text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Statybos metai
              </div>
              <div className="text-2xl font-bold text-on-surface">
                {property.buildYear}
              </div>
            </div>
            <div className="col-span-3 bg-surface-container p-5">
              <div className="text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-widest">
                Energinis reitingas
              </div>
              <div className="text-2xl font-bold text-secondary">
                {property.energyRating}
              </div>
            </div>
          </section>

          {/* Performance & Map */}
          <section className="grid grid-cols-12 gap-6">
            {/* Performance */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="bg-surface-container p-6 border-l-4 border-secondary">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Investiciniai rodikliai
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-on-surface">
                      Projekto pelningumas
                    </span>
                    <span className="text-lg font-bold text-secondary">
                      {property.yieldPct}
                    </span>
                  </div>
                  <div className="h-[1px] bg-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-on-surface">
                      IG (3 metai)
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {property.roi}
                    </span>
                  </div>
                  <div className="h-[1px] bg-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-on-surface">
                      Būsena
                    </span>
                    <span className="text-sm font-bold text-tertiary uppercase">
                      {property.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container p-6 border-l-4 border-primary">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Miestas / Regionas
                </div>
                <div className="text-xl font-bold text-on-surface">
                  {property.city}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="col-span-12 lg:col-span-7 bg-surface-container h-64 relative overflow-hidden">
              <DarkMap
                center={[property.lat, property.lng]}
                zoom={15}
                height="256px"
                markers={[{ lat: property.lat, lng: property.lng, label: property.name, color: "#a0c9ff" }]}
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded text-[9px] font-mono tracking-tighter z-[1000]">
                {property.address}
              </div>
              <div className="absolute top-4 left-4 z-[1000]">
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  Vietos žemėlapis
                </span>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="bg-surface-container p-6">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
              Vertinimo laiko juosta
            </div>
            <div className="space-y-0">
              {property.timeline.map((entry, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  {/* Vertical line */}
                  {i < property.timeline.length - 1 && (
                    <div className="absolute left-[7px] top-4 w-[2px] h-full bg-outline-variant/20" />
                  )}
                  <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0 mt-0.5 relative z-10" />
                  <div className="pb-6">
                    <div className="text-[10px] font-mono text-primary font-bold">
                      {entry.date}
                    </div>
                    <div className="text-xs text-on-surface-variant mt-1">
                      {entry.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
