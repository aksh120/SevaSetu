export default function MockedBadge({
  label = "Mocked",
}: {
  label?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm border border-status-warning/30 bg-status-warning-bg px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-status-warning"
      title="This touchpoint would contact a real government system in production  -  it is simulated in this prototype."
    >
      <span aria-hidden="true">◇</span>
      {label}
    </span>
  );
}
