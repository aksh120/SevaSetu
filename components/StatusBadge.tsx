import type { StepStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  StepStatus,
  { label: string; icon: string; className: string }
> = {
  "not-started": {
    label: "Not started",
    icon: "○",
    className: "border-mist bg-surface text-ink/70",
  },
  "in-progress": {
    label: "In progress",
    icon: "◐",
    className: "border-status-warning/30 bg-status-warning-bg text-status-warning",
  },
  submitted: {
    label: "Submitted",
    icon: "●",
    className: "border-status-info/30 bg-status-info-bg text-status-info",
  },
  approved: {
    label: "Approved",
    icon: "✓",
    className: "border-status-success/30 bg-status-success-bg text-status-success",
  },
};

export default function StatusBadge({ status }: { status: StepStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-[3px] border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors ${config.className}`}
    >
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
}
