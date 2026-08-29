export default function PhaseBanner() {
  return (
    <div className="border-b border-mist bg-surface print:hidden overflow-hidden w-full max-w-[100vw]">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2.5 px-3 py-1.5 sm:px-6 sm:py-2 min-w-0">
        <span className="shrink-0 rounded-[3px] border border-status-warning/40 bg-status-warning-bg px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-status-warning">
          Prototype
        </span>
        <p className="text-xs leading-snug text-ink/70 break-words min-w-0">
          Demonstration build. No real government system is contacted, not even to
          read data.
        </p>
      </div>
    </div>
  );
}
