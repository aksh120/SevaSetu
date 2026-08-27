import { useId } from "react";

export function BridgeMark({ className = "h-4 w-8" }: { className?: string }) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 32 18"
      fill="none"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      <path d="M2 15.5h28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M7 15.5V5.5M16 15.5V3M25 15.5V5.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M4.5 5.5h5M13.5 3h5M22.5 5.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 5.5c3 4.9 6 7.2 9 7.2s6-2.3 9-7.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.68" />
      <title id={id}>SevaSetu bridge mark</title>
    </svg>
  );
}
