export default function CommandBar() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-3 bg-surface-container-highest/70 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl z-50">
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <span className="material-symbols-outlined text-lg">search</span>
      </button>
      <div className="h-4 w-[1px] bg-white/10 mx-1" />
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <span className="material-symbols-outlined text-lg text-primary">
          add_circle
        </span>
      </button>
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <span className="material-symbols-outlined text-lg">folder_open</span>
      </button>
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <span className="material-symbols-outlined text-lg">ios_share</span>
      </button>
      <div className="h-4 w-[1px] bg-white/10 mx-1" />
      <div className="px-2 text-[10px] font-mono font-bold text-outline">
        CMD + K
      </div>
    </div>
  );
}
