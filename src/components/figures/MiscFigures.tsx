import type { ArrowDiagramFigure, AreaModelFigure, CaliperFigure, NumberLineFigure, RulerFigure, TableFigure } from '@engine/types.ts';
import { texToText } from '@/lib/texText.ts';
import { Markdown, Tex } from '@/components/math/Markdown.tsx';
import { cn } from '@/lib/cn.ts';

const INK = 'rgb(var(--ink))';
const SERIES = 'rgb(var(--series-1))';

export function NumberLine({ fig }: { fig: NumberLineFigure }) {
  const W = 460;
  const x0 = 30;
  const x1 = W - 30;
  const y = 70;
  const step = fig.step ?? 1;
  const toX = (v: number) => x0 + ((v - fig.min) / (fig.max - fig.min)) * (x1 - x0);
  const ticks: number[] = [];
  for (let v = fig.min; v <= fig.max + 1e-9; v += step) ticks.push(Math.round(v * 1000) / 1000);
  const labelEvery = ticks.length > 12 ? Math.ceil(ticks.length / 10) : 1;
  const pts = [...(fig.points ?? [])].sort((a, b) => a.value - b.value);
  return (
    <svg viewBox={`0 0 ${W} 120`} className="figure-svg mx-auto h-auto w-full max-w-[520px]" role="img" aria-label="Number line">
      <line x1={x0 - 12} x2={x1 + 12} y1={y} y2={y} stroke={INK} strokeWidth={2} />
      <path d={`M${x1 + 16},${y} l-8,-5 v10 Z`} fill={INK} />
      <path d={`M${x0 - 16},${y} l8,-5 v10 Z`} fill={INK} />
      {ticks.map((t, i) => {
        const major = i % labelEvery === 0 && (fig.ticksLabelled ?? true) && (Number.isInteger(t) || ticks.length <= 12);
        return (
          <g key={t}>
            <line x1={toX(t)} x2={toX(t)} y1={y - (Number.isInteger(t) ? 8 : 5)} y2={y + (Number.isInteger(t) ? 8 : 5)} stroke={INK} strokeWidth={Number.isInteger(t) ? 1.6 : 1} />
            {major && (
              <text x={toX(t)} y={y + 24} fontSize={12} textAnchor="middle" className="fig-muted">
                {`${t}`.replace('-', '−')}
              </text>
            )}
          </g>
        );
      })}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={toX(p.value)} cy={y} r={5} fill={SERIES} />
          <line x1={toX(p.value)} x2={toX(p.value)} y1={y - 8} y2={i % 2 ? y - 34 : y - 20} stroke={SERIES} strokeWidth={1} />
          <text x={toX(p.value)} y={i % 2 ? y - 40 : y - 26} fontSize={13} fontWeight={600} textAnchor="middle" stroke="rgb(var(--surface))" strokeWidth={4} paintOrder="stroke">
            {texToText(p.label)}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Ruler({ fig }: { fig: RulerFigure }) {
  const metric = fig.system === 'metric';
  const unitPx = metric ? 40 : 88;
  const sub = metric ? 10 : fig.division ?? 16;
  const pad = 22;
  const W = fig.length * unitPx + pad * 2;
  const top = 64;
  const H = 150;
  const toX = (v: number) => pad + v * unitPx;
  const marks: Array<{ x: number; h: number; label?: string }> = [];
  for (let i = 0; i <= fig.length * sub; i++) {
    const v = i / sub;
    let h: number;
    if (i % sub === 0) h = 26;
    else if (metric) h = i % 5 === 0 ? 17 : 10;
    else if (i % (sub / 2) === 0) h = 21;
    else if (i % (sub / 4) === 0) h = 16;
    else if (i % (sub / 8) === 0) h = 12;
    else h = 8;
    marks.push({ x: toX(v), h, label: i % sub === 0 ? String(i / sub) : undefined });
  }
  return (
    // Fine marks (millimetres, sixteenths) need the drawing near full size: on a phone it scrolls sideways instead of shrinking.
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: Math.min(W, 640) }} className="figure-svg mx-auto h-auto w-full" role="img" aria-label={`${metric ? 'Metric' : 'Imperial'} ruler measuring a bar`}>
      <rect x={toX(fig.start)} y={20} width={toX(fig.end) - toX(fig.start)} height={34} rx={3} fill="rgb(var(--series-1) / 0.22)" stroke={SERIES} strokeWidth={1.5} />
      <line x1={toX(fig.start)} x2={toX(fig.start)} y1={14} y2={top} stroke={SERIES} strokeDasharray="3 3" />
      <line x1={toX(fig.end)} x2={toX(fig.end)} y1={14} y2={top} stroke={SERIES} strokeDasharray="3 3" />
      <rect x={pad - 10} y={top} width={W - 2 * pad + 20} height={70} rx={6} fill="rgb(var(--warn-soft))" stroke="rgb(var(--line-strong))" />
      {marks.map((m, i) => (
        <g key={i}>
          <line x1={m.x} x2={m.x} y1={top} y2={top + m.h} stroke={INK} strokeWidth={m.h >= 26 ? 1.6 : 1} />
          {m.label && (
            <text x={m.x} y={top + 42} fontSize={12} textAnchor="middle" fontWeight={600}>
              {m.label}
            </text>
          )}
        </g>
      ))}
      <text x={W - pad} y={top + 62} fontSize={11} textAnchor="end" className="fig-muted">
        {metric ? 'cm' : 'inches'}
      </text>
      </svg>
    </div>
  );
}

export function Caliper({ fig }: { fig: CaliperFigure }) {
  const mm = 22; // px per mm
  const base = Math.floor(fig.reading);
  const from = Math.max(0, Math.floor((base - 6) / 10) * 10);
  const to = from + 30;
  const pad = 20;
  const W = (to - from) * mm + pad * 2;
  const toX = (v: number) => pad + (v - from) * mm;
  const yMain = 40;
  const yVern = 92;
  const v0 = toX(fig.reading);
  return (
    <svg viewBox={`0 0 ${W} 170`} className="figure-svg mx-auto h-auto w-full" role="img" aria-label="Vernier caliper scales">
      <rect x={pad - 10} y={yMain - 26} width={W - 2 * pad + 20} height={66} rx={4} fill="rgb(var(--surface-2))" stroke="rgb(var(--line-strong))" />
      {Array.from({ length: to - from + 1 }, (_, i) => from + i).map((v) => (
        <g key={v}>
          <line x1={toX(v)} x2={toX(v)} y1={yMain + 40 - (v % 10 === 0 ? 26 : v % 5 === 0 ? 18 : 12)} y2={yMain + 40} stroke={INK} strokeWidth={v % 10 === 0 ? 1.6 : 1} />
          {v % 10 === 0 && (
            <text x={toX(v)} y={yMain - 6} fontSize={13} fontWeight={700} textAnchor="middle">
              {v / 10}
            </text>
          )}
        </g>
      ))}
      <text x={W - pad} y={yMain - 10} fontSize={11} textAnchor="end" className="fig-muted">
        main scale (cm, marks in mm)
      </text>
      <rect x={v0 - 14} y={yVern - 12} width={9 * mm + 28} height={58} rx={4} fill="rgb(var(--series-1) / 0.12)" stroke={SERIES} />
      {Array.from({ length: 11 }, (_, k) => k).map((k) => (
        <g key={k}>
          <line x1={v0 + k * 0.9 * mm} x2={v0 + k * 0.9 * mm} y1={yVern - 12} y2={yVern - 12 + (k % 5 === 0 ? 22 : 14)} stroke={INK} strokeWidth={k % 5 === 0 ? 1.6 : 1} />
          {k % 5 === 0 && (
            <text x={v0 + k * 0.9 * mm} y={yVern + 26} fontSize={12} fontWeight={600} textAnchor="middle">
              {k}
            </text>
          )}
        </g>
      ))}
      <text x={v0 + 4.5 * mm} y={yVern + 42} fontSize={11} textAnchor="middle" className="fig-muted">
        vernier scale (0.1 mm)
      </text>
    </svg>
  );
}

export function AreaModel({ fig }: { fig: AreaModelFigure }) {
  return (
    <div className="mx-auto w-fit overflow-x-auto">
      <table className="border-separate border-spacing-1 text-center">
        <thead>
          <tr>
            <th className="w-14" />
            {fig.top.map((t, i) => (
              <th key={i} className="px-3 py-1 text-[15px] font-semibold text-brand-700">
                <Tex tex={t} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fig.side.map((s, r) => (
            <tr key={r}>
              <th className="px-2 text-[15px] font-semibold text-brand-700">
                <Tex tex={s} />
              </th>
              {fig.top.map((_, c) => {
                const cell = fig.cells?.[r]?.[c];
                return (
                  <td key={c} className="h-16 min-w-[80px] rounded-lg border border-brand-200 bg-brand-50 px-3 text-[16px]">
                    {cell && cell !== '?' ? <Tex tex={cell} /> : <span className="text-ink-3">?</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ArrowDiagram({ fig }: { fig: ArrowDiagramFigure }) {
  const n = Math.max(fig.left.length, fig.right.length);
  const rowH = 30;
  const H = n * rowH + 70;
  const lx = 90;
  const rx = 290;
  const ly = (i: number) => 50 + i * rowH + ((n - fig.left.length) * rowH) / 2;
  const ry = (i: number) => 50 + i * rowH + ((n - fig.right.length) * rowH) / 2;
  return (
    <svg viewBox={`0 0 380 ${H}`} className="figure-svg mx-auto h-auto w-full max-w-[400px]" role="img" aria-label="Arrow diagram">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={SERIES} />
        </marker>
      </defs>
      <ellipse cx={lx} cy={(ly(0) + ly(fig.left.length - 1)) / 2} rx={52} ry={(fig.left.length * rowH) / 2 + 16} fill="rgb(var(--surface-2))" stroke="rgb(var(--line-strong))" />
      <ellipse cx={rx} cy={(ry(0) + ry(fig.right.length - 1)) / 2} rx={52} ry={(fig.right.length * rowH) / 2 + 16} fill="rgb(var(--surface-2))" stroke="rgb(var(--line-strong))" />
      {fig.leftTitle && (
        <text x={lx} y={18} fontSize={13} fontWeight={700} textAnchor="middle">
          {fig.leftTitle}
        </text>
      )}
      {fig.rightTitle && (
        <text x={rx} y={18} fontSize={13} fontWeight={700} textAnchor="middle">
          {fig.rightTitle}
        </text>
      )}
      {fig.arrows.map(([i, j], k) => (
        <line key={k} x1={lx + 22} y1={ly(i)} x2={rx - 24} y2={ry(j)} stroke={SERIES} strokeWidth={1.6} markerEnd="url(#arrowhead)" />
      ))}
      {fig.left.map((t, i) => (
        <text key={`l${i}`} x={lx} y={ly(i) + 4} fontSize={14} textAnchor="middle" fontWeight={600}>
          {texToText(t).replace('-', '−')}
        </text>
      ))}
      {fig.right.map((t, i) => (
        <text key={`r${i}`} x={rx} y={ry(i) + 4} fontSize={14} textAnchor="middle" fontWeight={600}>
          {texToText(t).replace('-', '−')}
        </text>
      ))}
    </svg>
  );
}

/** A table cell: plain text, or Markdown when it holds a formula ($\\dfrac{x}{2}$, $x^{2}$); a lone money "$12.50" stays text. */
function Cell({ text, markdown }: { text: string; markdown?: boolean }) {
  if (markdown) return <Markdown md={text} inline />;
  if (/\$[^$]+\$/.test(text) && /\\[a-zA-Z]|\^|_/.test(text)) return <Markdown md={text} inline />;
  return <>{text.replace(/^-/, '−')}</>;
}

export function TableFig({ fig }: { fig: TableFigure }) {
  if (fig.horizontal) {
    return (
      <div className="table-wrap">
        <table className="mx-auto border-separate border-spacing-0 overflow-hidden rounded-xl border border-line text-center text-[15px]">
          <tbody>
            {fig.headers.map((h, r) => (
              <tr key={r}>
                <th className="border-b border-line bg-surface-2 px-3 py-2 font-semibold text-ink-2">
                  <Markdown md={h} inline />
                </th>
                {fig.rows.map((row, c) => (
                  <td key={c} className="min-w-[48px] border-b border-l border-line px-3 py-2 font-mono">
                    {row[r] === undefined ? null : <Cell text={row[r].replace('-', '−')} markdown={fig.markdown} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="table-wrap">
      <table className="mx-auto border-separate border-spacing-0 overflow-hidden rounded-xl border border-line text-center text-[15px]">
        <thead>
          <tr>
            {fig.headers.map((h, i) => (
              <th key={i} className="bg-surface-2 px-4 py-2 font-semibold text-ink-2">
                <Markdown md={h} inline />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fig.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                // Words (an item on a receipt, a day on a timecard) read better in the text font.
                <td key={c} className={cn('border-t border-line px-4 py-1.5', /[A-Za-z]{3,}/.test(cell) ? 'text-left' : 'font-mono tabular-nums')}>
                  <Cell text={cell} markdown={fig.markdown} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

