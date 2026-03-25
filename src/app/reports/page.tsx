"use client";

import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";

interface ReportRow {
  id: string;
  address: string;
  date: string;
  confidence: number;
  status: "Patvirtinta" | "Apdorojama";
}

const reportData: ReportRow[] = [
  { id: "#RP-9821-X", address: "Vilniaus g. 25, Vilnius, LT-01119", date: "2023.10.24 / 14:02", confidence: 94, status: "Patvirtinta" },
  { id: "#RP-9819-B", address: "Konstitucijos pr. 21, Vilnius, LT-08105", date: "2023.10.22 / 09:45", confidence: 88, status: "Patvirtinta" },
  { id: "#RP-9744-S", address: "Islandijos g. 3, Vilnius, LT-01402", date: "2023.10.21 / 18:12", confidence: 62, status: "Apdorojama" },
  { id: "#RP-9701-Q", address: "Jogailos g. 4, Vilnius, LT-01116", date: "2023.10.20 / 11:20", confidence: 91, status: "Patvirtinta" },
];

type SortKey = "id" | "address" | "date" | "confidence" | "status";
type SortDir = "asc" | "desc";

export default function Reports() {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filteredAndSorted = useMemo(() => {
    let rows = reportData.filter(
      (r) =>
        r.id.toLowerCase().includes(filter.toLowerCase()) ||
        r.address.toLowerCase().includes(filter.toLowerCase())
    );

    rows.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "confidence") {
        cmp = a.confidence - b.confidence;
      } else {
        cmp = (a[sortKey] as string).localeCompare(b[sortKey] as string, "lt");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return rows;
  }, [filter, sortKey, sortDir]);

  function handleCsvExport() {
    const headers = ["Ataskaitos ID", "Turto adresas", "Vertinimo data", "Patikimumas %", "Būsena"];
    const csvRows = [headers.join(";")];
    for (const r of filteredAndSorted) {
      csvRows.push([r.id, r.address, r.date, r.confidence.toString(), r.status].join(";"));
    }
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ataskaitos_eksportas.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handlePdfExport() {
    alert("PDF eksportas bus prieinamas greitai");
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " \u25B2" : " \u25BC";
  }

  return (
    <AppLayout activeItem="final-export">
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
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <button
              onClick={handleCsvExport}
              className="bg-surface-container-highest px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-sm">
                download
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                CSV eksportas
              </span>
            </button>
          </div>
        </header>

        {/* Report Table */}
        <div className="bg-surface-container-high rounded-lg overflow-hidden border-t-2 border-primary/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/50">
                <th
                  onClick={() => handleSort("id")}
                  className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase cursor-pointer hover:text-primary transition-colors select-none"
                >
                  Ataskaitos ID{sortIndicator("id")}
                </th>
                <th
                  onClick={() => handleSort("address")}
                  className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase cursor-pointer hover:text-primary transition-colors select-none"
                >
                  Turto adresas{sortIndicator("address")}
                </th>
                <th
                  onClick={() => handleSort("date")}
                  className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase cursor-pointer hover:text-primary transition-colors select-none"
                >
                  Vertinimo data{sortIndicator("date")}
                </th>
                <th
                  onClick={() => handleSort("confidence")}
                  className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase cursor-pointer hover:text-primary transition-colors select-none"
                >
                  Patikimumas{sortIndicator("confidence")}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase cursor-pointer hover:text-primary transition-colors select-none"
                >
                  Būsena{sortIndicator("status")}
                </th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase text-right">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredAndSorted.map((row, idx) => {
                const isProcessing = row.status === "Apdorojama";
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-surface-bright/30 transition-colors group ${idx % 2 !== 0 ? "bg-surface-container-low/20" : ""}`}
                  >
                    <td className="px-6 py-5">
                      <span className="font-mono text-xs text-primary">
                        {row.id}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-on-surface">
                        {row.address}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs text-on-surface-variant">
                        {row.date}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className={`h-full ${row.confidence >= 80 ? "bg-secondary" : "bg-error"}`}
                            style={{ width: `${row.confidence}%` }}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-bold ${row.confidence >= 80 ? "text-secondary" : "text-error"}`}
                        >
                          {row.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
                          isProcessing
                            ? "bg-tertiary-container/20 text-tertiary"
                            : "bg-secondary-container/20 text-secondary"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button
                        className={`p-2 transition-colors ${isProcessing ? "opacity-30 cursor-not-allowed" : "hover:text-primary"}`}
                        title="Eksportuoti PDF"
                        onClick={isProcessing ? undefined : handlePdfExport}
                        disabled={isProcessing}
                      >
                        <span className="material-symbols-outlined text-lg">
                          picture_as_pdf
                        </span>
                      </button>
                      <button
                        className={`p-2 transition-colors ${isProcessing ? "opacity-30 cursor-not-allowed" : "hover:text-primary"}`}
                        title="Eksportuoti CSV"
                        onClick={isProcessing ? undefined : handleCsvExport}
                        disabled={isProcessing}
                      >
                        <span className="material-symbols-outlined text-lg">
                          csv
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredAndSorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-outline">
                    Ataskaitų pagal šį filtrą nerasta
                  </td>
                </tr>
              )}
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
