/**
 * What the views of a motion element share (the tracks of Motion.tsx and the curved tracks of
 * MotionPath.tsx): the arrow and the label, the colours with a fixed meaning in every physics
 * video, and the energy bars.
 */
import type { EnergyBar, MotionBody, MotionEl, Tone } from '../script.ts';
import type { MotionState } from '../motion.ts';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const FONT = "'Lexend Variable', 'Inter Variable', system-ui, sans-serif";
export const INK2 = 'rgb(201 198 232)';

/** Body colours when the script gives none, by the body's place in the list. */
export const BODY_TONES: Tone[] = ['adj', 'opp', 'hyp', 'brand'];
export const toneOf = (el: MotionEl, b: MotionBody): string => TONES[b.tone ?? BODY_TONES[el.bodies.indexOf(b) % BODY_TONES.length]];
/** The colour of velocity, the net force and the total momentum in every physics video. */
export const VELOCITY = TONES.good;
export const NET = TONES.theta;
/**
 * Energy keeps the colour of what it comes from: kinetic energy is green like velocity, potential
 * energy pink like weight, work orange like an applied force, heat red like friction, and the
 * total yellow like every other total.
 */
export const ENERGY: Record<EnergyBar, { name: string; color: string }> = {
  work: { name: 'Work done', color: TONES.opp },
  kinetic: { name: 'Kinetic energy', color: VELOCITY },
  potential: { name: 'Potential energy', color: TONES.hyp },
  heat: { name: 'Heat', color: TONES.bad },
  total: { name: 'Total energy', color: NET },
};

/** A number for a label: whole when it is whole, one decimal otherwise. */
export const short = (n: number) => {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};
/** A changing number: always one decimal, so it does not jump about, and never "-0.0". */
export const live = (n: number) => (Math.abs(n) < 0.05 ? '0.0' : n.toFixed(1)).replace('-', '−');

/** An arrow from (x, y) of the given signed length along x or y, growing from its tail; `turn` points it any way instead, in degrees anticlockwise from the right. */
export function Arrow({ x, y, len, axis = 'x', turn, color, weight = 9, opacity = 1 }: { x: number; y: number; len: number; axis?: 'x' | 'y'; turn?: number; color: string; weight?: number; opacity?: number }) {
  const l = Math.abs(len);
  if (l < 1) return null;
  const s = Math.sign(len);
  const head = Math.min(weight * 2.4, l);
  const hw = weight * 1.35;
  // Drawn along +x, then turned: up is negative y on the screen.
  const angle = turn !== undefined ? -turn + (s > 0 ? 0 : 180) : axis === 'x' ? (s > 0 ? 0 : 180) : s > 0 ? -90 : 90;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity} style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}>
      {l > head && <line x1={0} y1={0} x2={l - head + 0.5} y2={0} stroke={color} strokeWidth={weight} strokeLinecap="round" />}
      <polygon points={`${l},0 ${l - head},${hw} ${l - head},${-hw}`} fill={color} />
    </g>
  );
}

export function Text({ x, y, children, color = INK, size = 21, anchor = 'middle', weight = 600, opacity = 1 }: { x: number; y: number; children: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number; opacity?: number }) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

/** The clock of a motion, at the top right of its view. */
export function Clock({ w, time, opacity }: { w: number; time: number; opacity: number }) {
  return (
    <g opacity={opacity}>
      <rect x={w - 170} y={0} width={170} height={38} rx={19} fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.14)" />
      <Text x={w - 85} y={19.5} size={19} color={INK2}>
        {`t = ${time.toFixed(1)} s`}
      </Text>
    </g>
  );
}

/** The bodies whose energy is shown, and the rows of bars that takes. */
export const energyBodies = (el: MotionEl): MotionBody[] => (el.energy ? (el.energy.of ? el.bodies.filter((b) => el.energy!.of!.includes(b.id)) : el.bodies.slice(0, 1)) : []);
export const energyRows = (el: MotionEl): number => energyBodies(el).length * (el.energy?.bars.length ?? 0);
export const ENERGY_ROW = 40;

/** Joules, or kilojoules when the bars reach ten thousand joules; whole numbers from a hundred up. */
function joules(n: number, max: number): string {
  if (max >= 10000) return `${live(n / 1000)} kJ`;
  return max >= 100 ? `${Math.round(n) + 0} J` : `${live(n)} J`;
}

/**
 * Energy bars: one row for each bar of each body listed, the name on the left and the amount at
 * the end of the bar. The bar for the total has its own opacity, so it can come in after the others.
 * In a narrow space (`stacked`) the name sits over its bar.
 */
export function EnergyBars({ el, state, x, y, w, opacity, total, stacked = false }: { el: MotionEl; state: MotionState; x: number; y: number; w: number; opacity: number; total: number; stacked?: boolean }) {
  if (!el.energy) return null;
  const { bars, max, names, labels } = el.energy;
  const bodies = energyBodies(el);
  const rows = bodies.flatMap((b) =>
    bars.map((bar) => {
      const e = state.energy[b.id];
      const value = bar === 'total' ? e.kinetic + e.potential + e.heat : e[bar];
      const name = names?.[bar] ?? ENERGY[bar].name;
      return { key: `${b.id}-${bar}`, bar, value, name: bodies.length > 1 ? `${labels?.[b.id] ?? b.label ?? b.id}: ${name.toLowerCase()}` : name };
    }),
  );
  const labelW = stacked ? 0 : 290;
  const x0 = x + labelW;
  const full = w - labelW - 130;
  const rowH = stacked ? 62 : ENERGY_ROW;
  return (
    <g>
      {!stacked && <line x1={x0} y1={y} x2={x0} y2={y + rows.length * rowH - 6} stroke={INK3} strokeWidth={2} opacity={Math.max(opacity, total)} />}
      {rows.map((r, i) => {
        const len = clamp01(Math.abs(r.value) / max) * full;
        const top = y + i * rowH + (stacked ? 26 : 0);
        const c = ENERGY[r.bar].color;
        return (
          <g key={r.key} opacity={r.bar === 'total' ? total : opacity}>
            {stacked ? (
              <Text x={x0} y={top - 13} anchor="start" size={19} color={r.bar === 'total' ? NET : INK}>
                {r.name}
              </Text>
            ) : (
              <Text x={x0 - 16} y={top + 16} anchor="end" size={20} color={r.bar === 'total' ? NET : INK}>
                {r.name}
              </Text>
            )}
            <rect x={x0} y={top + 2} width={full} height={28} rx={7} fill="rgb(255 255 255 / 0.05)" />
            <rect x={x0} y={top + 2} width={len} height={28} rx={Math.min(7, len / 2)} fill={c} fillOpacity={0.8} />
            <Text x={x0 + len + 12} y={top + 16} anchor="start" size={20} color={c}>
              {joules(r.value, max)}
            </Text>
          </g>
        );
      })}
    </g>
  );
}
