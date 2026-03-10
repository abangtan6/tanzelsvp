export default function Footer({ person }) {
  return (
    <footer className="border-t border-black/10 bg-[#050505] text-[#efe8de]">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.08em]">
          <span className="text-accent">+</span>
          <span>{person.name}&apos;s Visual Pharmacy</span>
        </div>
        <div className="inline-flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.28em] text-white/70">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Clinic Operational
        </div>
      </div>
    </footer>
  );
}
