import type { BarChartFigure, BoxPlotFigure, CircleGraphFigure, DotPlotFigure } from '@engine/types.ts';
import { texToText } from '@/lib/texText.ts';

const INK = 'rgb(var(--ink))';
const GRID = 'rgb(var(--line))';
const SURFACE = 'rgb(var(--surface))';
const SERIES = 'rgb(var(--series-1))';
const SLICE = (i: number) => `rgb(var(--cat-${(i % 6) + 1}))`;

const numberText = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 2 });
const fmt = (v: number) => numberText.format(v).replace('-', '−');

/** A grid step of 1, 2, 2.5 or 5 times a power of ten giving about five grid lines. */
function niceStep(top: number): number {
  if (top <= 0) return 1;
  const raw = top / 5;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const m = [1, 2, 2.5, 5, 10].find((x) => x * pow >= raw) ?? 10;
  return m * pow;
}

/** Split a long label over two lines at the space nearest its middle. */
function wrap(label: string, maxChars: number): string[] {
  if (label.length <= maxChars || !label.includes(' ')) return [label];
  const mid = label.length / 2;
  let best = -1;
  for (let i = 0; i < label.length; i++) if (label[i] === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  return [label.slice(0, best), label.slice(best + 1)];
}

export function BarChart({ fig }: { fig: BarChartFigure }) {
  const W = 460;
  const H = 300;
  const left = fig.valueLabel ? 62 : 46;
  const right = 12;
  const top = 22;
  const bottom = fig.categoryLabel ? 62 : 44;
  const plotW = W - left - right;
  const plotH = H - top - bottom;
  const dataMax = Math.max(0, ...fig.values);
  const step = fig.step ?? niceStep(fig.max ?? dataMax);
  const max = fig.max ?? Math.max(step, Math.ceil(dataMax / step - 1e-9) * step);
  const toY = (v: number) => top + plotH - (Math.min(Math.max(v, 0), max) / max) * plotH;
  const ticks: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
  const n = fig.categories.length;
  const band = plotW / Math.max(n, 1);
  const barW = Math.min(56, band * 0.62);
  const baseY = toY(0);
  const labels = fig.categories.map((c) => wrap(texToText(c), n > 5 ? 9 : 14));
  const summary = fig.categories.map((c, i) => `${texToText(c)}: ${fmt(fig.values[i] ?? 0)}`).join(', ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="figure-svg mx-auto h-auto w-full max-w-[520px]" role="img" aria-label={`Bar graph${fig.caption ? `: ${texToText(fig.caption)}` : fig.valueLabel ? ` of ${texToText(fig.valueLabel)}` : ''}. ${summary}`}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} x2={W - right} y1={toY(t)} y2={toY(t)} stroke={GRID} strokeWidth={1} />
          <text x={left - 8} y={toY(t) + 4} fontSize={13} textAnchor="end" className="fig-muted">
            {fmt(t)}
          </text>
        </g>
      ))}
      {fig.values.map((v, i) => {
        const x = left + band * i + (band - barW) / 2;
        const y = toY(v);
        const h = baseY - y;
        const r = Math.min(4, h / 2, barW / 2);
        const d = h <= 0 ? '' : `M${x},${baseY} V${y + r} Q${x},${y} ${x + r},${y} H${x + barW - r} Q${x + barW},${y} ${x + barW},${y + r} V${baseY} Z`;
        return (
          <g key={i}>
            {d && (
              <path d={d} fill={SERIES}>
                <title>{`${texToText(fig.categories[i] ?? '')}: ${fmt(v)}`}</title>
              </path>
            )}
            {fig.showValues && (
              <text x={x + barW / 2} y={y - 6} fontSize={13} fontWeight={600} textAnchor="middle" fill={INK}>
                {fmt(v)}
              </text>
            )}
          </g>
        );
      })}
      <line x1={left} x2={W - right} y1={baseY} y2={baseY} stroke={INK} strokeWidth={1.5} />
      {labels.map((lines, i) => (
        <text key={i} x={left + band * i + band / 2} y={baseY + 17} fontSize={n > 6 ? 12 : 13} textAnchor="middle" fill={INK}>
          {lines.map((l, j) => (
            <tspan key={j} x={left + band * i + band / 2} dy={j === 0 ? 0 : 14}>
              {l}
            </tspan>
          ))}
        </text>
      ))}
      {fig.categoryLabel && (
        <text x={left + plotW / 2} y={H - 8} fontSize={13} fontWeight={600} textAnchor="middle" fill={INK}>
          {texToText(fig.categoryLabel)}
        </text>
      )}
      {fig.valueLabel && (
        <text x={14} y={top + plotH / 2} fontSize={13} fontWeight={600} textAnchor="middle" fill={INK} transform={`rotate(-90 14 ${top + plotH / 2})`}>
          {texToText(fig.valueLabel)}
        </text>
      )}
    </svg>
  );
}

function percentText(p: number): string {
  return `${Math.round(p * 10) / 10}%`;
}

export function CircleGraph({ fig }: { fig: CircleGraphFigure }) {
  const slices = fig.slices.slice(0, 6);
  const cx = 100;
  const cy = 100;
  const r = 96;
  const total = slices.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  const show = fig.show ?? 'percent';
  const detail = (s: { value: number }) => (show === 'percent' ? percentText((s.value / total) * 100) : show === 'value' ? fmt(s.value) : '');
  let angle = -Math.PI / 2;
  const paths = slices.map((s, i) => {
    const sweep = (Math.max(0, s.value) / total) * Math.PI * 2;
    const a0 = angle;
    const a1 = angle + sweep;
    angle = a1;
    if (sweep >= Math.PI * 2 - 1e-9) return <circle key={i} cx={cx} cy={cy} r={r} fill={SLICE(i)} />;
    if (sweep <= 0) return null;
    const p = (a: number) => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    const large = sweep > Math.PI ? 1 : 0;
    return <path key={i} d={`M${cx},${cy} L${p(a0)} A${r},${r} 0 ${large} 1 ${p(a1)} Z`} fill={SLICE(i)} stroke={SURFACE} strokeWidth={2} strokeLinejoin="round" />;
  });
  const summary = slices.map((s) => `${texToText(s.label)}${show === 'none' ? '' : ` ${detail(s)}`}`).join(', ');
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-1">
      <svg viewBox="0 0 200 200" className="figure-svg h-auto w-full max-w-[200px]" role="img" aria-label={`Circle graph${fig.caption ? `: ${texToText(fig.caption)}` : ''}. ${summary}`}>
        {paths}
      </svg>
      <ul className="space-y-1.5 text-sm text-ink" aria-hidden="true">
        {slices.map((s, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 shrink-0 rounded-[3px]" style={{ background: SLICE(i) }} />
            <span>{texToText(s.label)}</span>
            {show !== 'none' && <span className="font-semibold tabular-nums">{detail(s)}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ticks from min to max every step (rounded to avoid 0.30000000000000004). */
function lineTicks(min: number, max: number, step: number): number[] {
  const out: number[] = [];
  for (let v = min; v <= max + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

/** The number line under a dot plot or box plot, with its ticks and title. */
function NumberAxis({ y, left, right, ticks, toX, label }: { y: number; left: number; right: number; ticks: number[]; toX: (v: number) => number; label?: string }) {
  const every = ticks.length > 16 ? Math.ceil(ticks.length / 12) : 1;
  return (
    <g>
      <line x1={left} x2={right} y1={y} y2={y} stroke={INK} strokeWidth={1.5} />
      {ticks.map((t, i) => (
        <g key={t}>
          <line x1={toX(t)} x2={toX(t)} y1={y} y2={y + (i % every === 0 ? 7 : 4)} stroke={INK} strokeWidth={1} />
          {i % every === 0 && (
            <text x={toX(t)} y={y + 22} fontSize={13} textAnchor="middle" fill={INK}>
              {fmt(t)}
            </text>
          )}
        </g>
      ))}
      {label && (
        <text x={(left + right) / 2} y={y + 44} fontSize={13} fontWeight={600} textAnchor="middle" fill={INK}>
          {texToText(label)}
        </text>
      )}
    </g>
  );
}

export function DotPlot({ fig }: { fig: DotPlotFigure }) {
  const W = 460;
  const left = 22;
  const right = W - 22;
  const step = fig.step ?? 1;
  const ticks = lineTicks(fig.min, fig.max, step);
  const toX = (v: number) => left + ((v - fig.min) / Math.max(fig.max - fig.min, 1e-9)) * (right - left);
  const counts = new Map<number, number>();
  for (const v of fig.values) counts.set(v, (counts.get(v) ?? 0) + 1);
  const tallest = Math.max(1, ...counts.values());
  const gap = Math.min(22, ((right - left) / Math.max(ticks.length - 1, 1)) * 0.9);
  const r = Math.min(8, gap / 2 - 1);
  const top = 14;
  const axisY = top + tallest * gap + 6;
  const H = axisY + (fig.label ? 54 : 32);
  const summary = [...counts].sort((a, b) => a[0] - b[0]).map(([v, k]) => `${fmt(v)}: ${k}`).join(', ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="figure-svg mx-auto h-auto w-full max-w-[520px]" role="img" aria-label={`Dot plot${fig.label ? ` of ${texToText(fig.label)}` : ''}. ${summary}`}>
      {[...counts].map(([v, k]) =>
        Array.from({ length: k }, (_, j) => <circle key={`${v}-${j}`} cx={toX(v)} cy={axisY - 6 - gap / 2 - j * gap} r={r} fill={SERIES} />),
      )}
      <NumberAxis y={axisY} left={left} right={right} ticks={ticks} toX={toX} label={fig.label} />
    </svg>
  );
}

export function BoxPlot({ fig }: { fig: BoxPlotFigure }) {
  const W = 460;
  const named = fig.plots.some((p) => p.label);
  const left = named ? 96 : 22;
  const right = W - 22;
  const step = fig.step ?? niceStep(fig.max - fig.min) / 2;
  const ticks = lineTicks(fig.min, fig.max, step);
  const toX = (v: number) => left + ((v - fig.min) / Math.max(fig.max - fig.min, 1e-9)) * (right - left);
  const row = 54;
  const top = 10;
  const axisY = top + fig.plots.length * row + 4;
  const H = axisY + (fig.label ? 54 : 32);
  const summary = fig.plots
    .map((p) => `${p.label ? `${texToText(p.label)}: ` : ''}minimum ${fmt(p.min)}, lower quartile ${fmt(p.q1)}, median ${fmt(p.median)}, upper quartile ${fmt(p.q3)}, maximum ${fmt(p.max)}`)
    .join('; ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="figure-svg mx-auto h-auto w-full max-w-[520px]" role="img" aria-label={`Box plot${fig.label ? ` of ${texToText(fig.label)}` : ''}. ${summary}`}>
      {ticks.map((t) => (
        <line key={t} x1={toX(t)} x2={toX(t)} y1={top} y2={axisY} stroke={GRID} strokeWidth={1} />
      ))}
      {fig.plots.map((p, i) => {
        const mid = top + i * row + row / 2;
        const h = 30;
        return (
          <g key={i}>
            {p.label && (
              <text x={left - 10} y={mid + 4} fontSize={13} textAnchor="end" fill={INK}>
                {texToText(p.label)}
              </text>
            )}
            <line x1={toX(p.min)} x2={toX(p.q1)} y1={mid} y2={mid} stroke={INK} strokeWidth={1.5} />
            <line x1={toX(p.q3)} x2={toX(p.max)} y1={mid} y2={mid} stroke={INK} strokeWidth={1.5} />
            <line x1={toX(p.min)} x2={toX(p.min)} y1={mid - 9} y2={mid + 9} stroke={INK} strokeWidth={1.5} />
            <line x1={toX(p.max)} x2={toX(p.max)} y1={mid - 9} y2={mid + 9} stroke={INK} strokeWidth={1.5} />
            <rect x={toX(p.q1)} y={mid - h / 2} width={Math.max(toX(p.q3) - toX(p.q1), 1)} height={h} fill={SURFACE} stroke={SERIES} strokeWidth={2} />
            <line x1={toX(p.median)} x2={toX(p.median)} y1={mid - h / 2} y2={mid + h / 2} stroke={SERIES} strokeWidth={3} />
          </g>
        );
      })}
      <NumberAxis y={axisY} left={left} right={right} ticks={ticks} toX={toX} label={fig.label} />
    </svg>
  );
}
