const TOKENS = {
  bridge: "rgb(var(--color-bridge))",
  marigold: "#C1861F",
  ink: "rgb(var(--color-ink))",
  muted: "rgb(var(--color-mist))",
  paper: "rgb(var(--color-paper))",
};

interface BridgeProgressProps {
  total: number;
  completed: number;
  current?: number | null;
  compact?: boolean;
}

type TowerState = "complete" | "current" | "todo";

export default function BridgeProgress({
  total,
  completed,
  current,
  compact = false,
}: BridgeProgressProps) {
  const currentIndex = current ?? Math.min(completed, total - 1);
  const H = compact ? 100 : 164;
  const margin = compact ? 25 : 48;
  const gap = compact ? 48 : 92;
  const W = margin * 2 + gap * Math.max(total - 1, 0);
  const towerTop = compact ? 18 : 24;
  const deckY = H - (compact ? 26 : 42);
  const deckH = compact ? 5 : 7;
  const hw = compact ? 5 : 8;
  const towerX = (i: number) => margin + i * gap;
  const stateOf = (i: number): TowerState => {
    if (i < completed) return "complete";
    if (i === currentIndex) return "current";
    return "todo";
  };
  const spanColor = (a: number, b: number) =>
    stateOf(a) === "complete" && stateOf(b) === "complete" ? TOKENS.bridge : TOKENS.ink;
  const sag = (deckY - towerTop) * 0.62;
  const cableY = (t: number) => {
    const y0 = towerTop;
    const yc = towerTop + sag;
    return (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * yc + t * t * y0;
  };
  const hangerTs = compact ? [0.25, 0.5, 0.75] : [0.2, 0.4, 0.6, 0.8];
  const spans: React.ReactNode[] = [];

  for (let i = 0; i < total - 1; i++) {
    const x1 = towerX(i);
    const x2 = towerX(i + 1);
    const mid = (x1 + x2) / 2;
    const color = spanColor(i, i + 1);
    const isCompletedSpan = color === TOKENS.bridge;
    spans.push(
      <path
        key={`cable-${i}`}
        d={`M ${x1} ${towerTop} Q ${mid} ${towerTop + sag} ${x2} ${towerTop}`}
        stroke={color}
        strokeWidth={compact ? 2 : 2.6}
        strokeOpacity={isCompletedSpan ? 1 : 0.85}
        fill="none"
        strokeLinecap="round"
      />
    );
    hangerTs.forEach((t, j) => {
      const hx = x1 + (x2 - x1) * t;
      spans.push(
        <line
          key={`h-${i}-${j}`}
          x1={hx}
          y1={cableY(t)}
          x2={hx}
          y2={deckY}
          stroke={color}
          strokeWidth={compact ? 1 : 1.3}
          strokeOpacity={isCompletedSpan ? 0.9 : 0.8}
        />
      );
    });
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Roadmap progress: ${completed} of ${total} steps complete`} className="w-full max-w-full h-auto block overflow-hidden shrink min-w-0" preserveAspectRatio="xMidYMid meet">
      <line x1={6} y1={deckY + deckH + (compact ? 8 : 13)} x2={W - 6} y2={deckY + deckH + (compact ? 8 : 13)} stroke={TOKENS.ink} strokeOpacity={0.25} strokeWidth={1.5} strokeDasharray="2 6" />
      {spans}
      <rect x={2} y={deckY} width={W - 4} height={deckH} rx={3} fill={TOKENS.bridge} />
      <rect x={0} y={deckY - (compact ? 7 : 10)} width={compact ? 12 : 18} height={(compact ? 7 : 10) + deckH} rx={3} fill={TOKENS.ink} opacity={0.72} />
      <rect x={W - (compact ? 12 : 18)} y={deckY - (compact ? 7 : 10)} width={compact ? 12 : 18} height={(compact ? 7 : 10) + deckH} rx={3} fill={TOKENS.ink} opacity={0.72} />
      {Array.from({ length: total }, (_, i) => {
        const x = towerX(i);
        const state = stateOf(i);
        const fill = state === "complete" ? TOKENS.bridge : state === "current" ? TOKENS.marigold : TOKENS.paper;
        const stroke = state === "todo" ? TOKENS.ink : fill;
        return (
          <g key={`tower-${i}`}>
            {state === "current" && <circle cx={x} cy={towerTop + 4} r={compact ? 10 : 14} fill={TOKENS.marigold} opacity={0.16} />}
            <path d={`M ${x - hw} ${deckY + 4} L ${x - hw * 0.6} ${towerTop} L ${x + hw * 0.6} ${towerTop} L ${x + hw} ${deckY + 4} Z`} fill={fill} stroke={stroke} strokeWidth={state === "todo" ? 1.5 : 0} strokeOpacity={state === "todo" ? 0.85 : 1} />
            {!compact && <line x1={x - hw - 3} y1={towerTop + 9} x2={x + hw + 3} y2={towerTop + 9} stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeOpacity={state === "todo" ? 0.85 : 1} />}
            <circle cx={x} cy={deckY + deckH + (compact ? 8 : 13)} r={compact ? 2.5 : 3.5} fill={state === "todo" ? TOKENS.ink : state === "current" ? TOKENS.marigold : TOKENS.bridge} fillOpacity={state === "todo" ? 0.4 : 1} />
          </g>
        );
      })}
    </svg>
  );
}
