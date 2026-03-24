export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 rounded-full bg-accent-green animate-pulse" />
          <h1 className="text-3xl font-semibold tracking-tight">
            Data Input Terminal
          </h1>
        </div>
        <p className="text-text-muted text-lg leading-relaxed">
          Real estate data ingestion and processing interface. Upload property
          records, market data, and comparable sales for analysis.
        </p>
        <div className="rounded-lg border border-border bg-surface p-6 font-mono text-sm text-text-muted">
          <span className="text-accent-green">$</span> Awaiting data input...
        </div>
      </div>
    </div>
  );
}
