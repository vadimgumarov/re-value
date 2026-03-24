export default function Archive() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 rounded-sm bg-text-muted" />
          <h1 className="text-3xl font-semibold tracking-tight">Archive</h1>
        </div>
        <p className="text-text-muted text-lg leading-relaxed">
          Historical data and past analyses. Access previous valuations,
          archived market snapshots, and completed report records.
        </p>
        <div className="rounded-lg border border-border bg-surface p-6 font-mono text-sm text-text-muted">
          Archive empty. Completed analyses will appear here.
        </div>
      </div>
    </div>
  );
}
