/**
 * A force-displacement graph for a motion element (`graph: { y: 'force' }`): the force on one body
 * against the distance it has moved, or the force of its spring against the extension. The whole
 * shape is there from the start as a faint line; the area under it fills in as the body moves, and
 * the work done so far (that area) is written over the graph.
 */
import type { MotionEl, MotionForce } from '../script.ts';
import { areaUnder, type MotionState } from '../motion.ts';
import { FONT, INK2 } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** A round step between the numbers on an axis that reaches `max`: about five of them. */
export function niceStep(max: number): number {
  const rough = max / 5;
  const ten = 10 ** Math.floor(Math.log10(rough));
  const lead = rough / ten;
  return (lead <= 1 ? 1 : lead <= 2 ? 2 : lead <= 5 ? 5 : 10) * ten;
}

/** A number on an axis, with only the decimals its step needs. */
const onAxis = (n: number, step: number) => (step >= 1 ? String(Math.round(n)) : n.toFixed(step >= 0.1 ? 1 : step >= 0.01 ? 2 : 3));

/**
 * Joules as they are written beside a graph, for a number that changes: whole when the graph holds
 * a hundred joules or more, one decimal from ten, and two decimals for a small energy.
 */
export const someJoules = (n: number, most: number) => (most >= 100 ? String(Math.round(n) + 0) : most >= 10 ? n.toFixed(1) : n.toFixed(2)).replace('-', '−');
/** Joules for a number that stays: no more decimals than it has (up to two). */
const exactJoules = (n: number) => String(Math.round(n * 100) / 100);

/** The force of a motion that its force-displacement graph is of: one that changes with distance, or none (the spring's). */
export function graphedForce(el: MotionEl): MotionForce | null {
  const id = el.graph?.of[0];
  for (const clip of Object.values(el.clips)) for (const ph of clip.phases) for (const f of ph.forces ?? []) if (f.on === id && (el.graph?.force ? f.name === el.graph.force : f.profile)) return f;
  return null;
}

export function ForceGraph({ el, state, opacity, box }: { el: MotionEl; state: MotionState; opacity: number; box: [gx0: number, gy0: number, gx1: number, gy1: number] }) {
  if (!el.graph) return null;
  const [gx0, gy0, gx1, gy1] = box;
  const id = el.graph.of[0];
  const metres = el.graph.metres ?? 1;
  const max = el.graph.max;
  const force = graphedForce(el);
  const sprung = !force && el.spring?.on === id;
  const c = sprung ? TONES.brand : TONES[force?.tone ?? 'opp'];
  const gx = (d: number) => gx0 + (Math.max(0, Math.min(d, metres)) / metres) * (gx1 - gx0);
  const gy = (n: number) => gy1 - (Math.max(0, Math.min(n, max)) / max) * (gy1 - gy0);
  const [xStep, yStep] = [niceStep(metres), niceStep(max)];
  const count = (to: number, step: number) => Array.from({ length: Math.floor(to / step + 1e-9) + 1 }, (_, i) => Math.round(i * step * 1e6) / 1e6);
  const pts = state.pull[id] ?? [];
  const last = pts[pts.length - 1];
  // The whole shape, before the body has moved: the points of a force that changes, a level line for a steady one, or Hooke's law.
  const plan: Array<[number, number]> = force?.profile ?? (force ? [[0, Math.abs(force.n)], [metres, Math.abs(force.n)]] : sprung ? [[0, 0], [Math.min(metres, max / el.spring!.k), Math.min(max, el.spring!.k * metres)]] : []);
  const done = last ? last[0] : 0;
  const value = sprung ? state.energy[id].elastic : state.energy[id].work;
  // The whole area under the shape: it decides how many decimals the work is written with.
  const most = areaUnder(plan.length > 1 ? plan : [[0, max], [metres, max]], 0, metres);
  return (
    <g opacity={opacity}>
      <rect x={gx0 - 64} y={gy0 - 44} width={gx1 - gx0 + 98} height={gy1 - gy0 + 96} rx={16} fill="rgb(255 255 255 / 0.045)" stroke="rgb(255 255 255 / 0.1)" />
      {count(max, yStep).map((n) => (
        <g key={`gn${n}`}>
          <line x1={gx0} y1={gy(n)} x2={gx1} y2={gy(n)} stroke={INK3} strokeWidth={1} opacity={n === 0 ? 0 : 0.28} />
          <text x={gx0 - 10} y={gy(n)} fill={INK3} fontSize={15} textAnchor="end" dominantBaseline="central" style={{ fontFamily: FONT }}>
            {onAxis(n, yStep)}
          </text>
        </g>
      ))}
      {count(metres, xStep).map((d) => (
        <g key={`gd${d}`}>
          <line x1={gx(d)} y1={gy1} x2={gx(d)} y2={gy1 + 6} stroke={INK3} strokeWidth={1.5} />
          <text x={gx(d)} y={gy1 + 20} fill={INK3} fontSize={15} textAnchor="middle" style={{ fontFamily: FONT }}>
            {onAxis(d, xStep)}
          </text>
        </g>
      ))}
      <line x1={gx0} y1={gy0 - 8} x2={gx0} y2={gy1} stroke={INK2} strokeWidth={2} />
      <line x1={gx0} y1={gy1} x2={gx1 + 8} y2={gy1} stroke={INK2} strokeWidth={2} />
      <text x={gx0 - 46} y={(gy0 + gy1) / 2} fill={c} fontSize={16} fontWeight={600} textAnchor="middle" transform={`rotate(-90 ${gx0 - 46} ${(gy0 + gy1) / 2})`} style={{ fontFamily: FONT }}>
        force (N)
      </text>
      <text x={(gx0 + gx1) / 2} y={gy1 + 40} fill={INK2} fontSize={16} fontWeight={600} textAnchor="middle" style={{ fontFamily: FONT }}>
        {sprung ? 'extension (m)' : 'displacement (m)'}
      </text>
      {plan.length > 1 && <polyline points={plan.map(([d, n]) => `${gx(d)},${gy(n)}`).join(' ')} fill="none" stroke={c} strokeWidth={2.5} strokeDasharray="7 7" opacity={0.55} />}
      {/* Where the shape changes, a faint line splits the area into simple pieces; each piece shows its area once the body has passed it. */}
      {force?.profile?.slice(1).map(([d1, n1], i) => {
        const [d0, n0] = force.profile![i];
        const passed = done >= d1 - 1e-6;
        const piece = areaUnder(force.profile!, d0, d1);
        return (
          <g key={`piece${i}`}>
            {i < force.profile!.length - 2 && <line x1={gx(d1)} y1={gy1} x2={gx(d1)} y2={gy(n1)} stroke={INK2} strokeWidth={1.5} strokeDasharray="4 5" opacity={0.6} />}
            {passed && piece > 0 && (
              <text x={gx((d0 + d1) / 2) + (n1 < n0 ? -0.12 : n1 > n0 ? 0.12 : 0) * (gx(d1) - gx(d0))} y={gy((n0 + n1) / 5)} fill={INK} fontSize={18} fontWeight={700} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT, paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.7)', strokeWidth: 4 }}>
                {`${exactJoules(piece)} J`}
              </text>
            )}
          </g>
        );
      })}
      {last && (
        <g>
          <polygon points={`${gx(pts[0][0])},${gy(0)} ${pts.map(([d, n]) => `${gx(d)},${gy(n)}`).join(' ')} ${gx(last[0])},${gy(0)}`} fill={c} opacity={0.32} />
          <polyline points={pts.map(([d, n]) => `${gx(d)},${gy(n)}`).join(' ')} fill="none" stroke={c} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${c}88)` }} />
          <circle cx={gx(last[0])} cy={gy(last[1])} r={7} fill={c} stroke="#0d0c24" strokeWidth={2} />
        </g>
      )}
      <text x={gx1 + 22} y={gy0 - 20} fill={c} fontSize={19} fontWeight={700} textAnchor="end" dominantBaseline="central" style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums' }}>
        {`${el.graph.area ?? 'Work'} = area = ${someJoules(value, most)} J`}
      </text>
    </g>
  );
}
