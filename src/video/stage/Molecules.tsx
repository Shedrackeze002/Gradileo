/**
 * Molecules as balls and sticks (src/video/molecules.ts works out where everything is): each atom a
 * shaded ball with its symbol, joined by one, two or three sticks. A bond that breaks turns red
 * as it fades, and a new one comes in green.
 */
import type { MoleculesEl, Tone } from '../script.ts';
import { atomElement, moleculesAt, type MolPlay } from '../molecules.ts';
import { type ElState } from '../timeline.ts';
import { TONES } from './tex.ts';
import { INK } from './Triangle.tsx';
import { chargeText } from './Atoms.tsx';

const FONT = "'Lexend Variable', 'Inter Variable', system-ui, sans-serif";
const SUPER: Record<string, string> = { '1': '¹', '2': '²', '3': '³', '+': '⁺', '-': '⁻' };

/** Each element's colour, close to the usual model-kit colours, and its ball's radius. */
const LOOK: Record<string, { color: string; r: number }> = {
  H: { color: '#F4F3FF', r: 0.27 },
  C: { color: '#A3A9C2', r: 0.38 },
  N: { color: TONES.adj, r: 0.38 },
  O: { color: TONES.bad, r: 0.38 },
  F: { color: TONES.good, r: 0.36 },
  Cl: { color: TONES.good, r: 0.44 },
  Br: { color: TONES.opp, r: 0.48 },
  I: { color: TONES.hyp, r: 0.52 },
  Na: { color: TONES.brand, r: 0.5 },
  K: { color: TONES.brand, r: 0.55 },
};
const STICK = 'rgb(200 197 230)';

export function atomLook(el: MoleculesEl, name: string): { color: string; r: number } {
  const a = el.atoms[name];
  const look = LOOK[atomElement(el, name)] ?? { color: TONES.theta, r: 0.42 };
  return typeof a !== 'string' && a.tone ? { ...look, color: TONES[a.tone as Tone] } : look;
}

/** Mixes two "#rrggbb" or "rgb(r g b)" colours. */
function mix(a: string, b: string, t: number): string {
  const rgb = (c: string) => (c.startsWith('#') ? [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)) : (c.match(/\d+/g) ?? []).map(Number));
  const [x, y] = [rgb(a), rgb(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(' ')})`;
}

export function MoleculesView({ el, st, w, h, age, played }: { el: MoleculesEl; st: ElState | undefined; w: number; h: number; age?: number; played?: MolPlay[] }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const f = moleculesAt(el, played ?? st?.started ?? [], age ?? st?.age ?? 0);
  const S = Math.min(w / el.span[0], h / el.span[1], 110);
  const ox = (w - el.span[0] * S) / 2;
  const oy = (h - el.span[1] * S) / 2;
  const X = (x: number) => ox + x * S;
  const Y = (y: number) => oy + y * S;
  const at = new Map(f.atoms.map((a) => [a.name, a]));
  const elements = [...new Set(Object.keys(el.atoms).map((n) => atomLook(el, n).color))];
  const grad = (color: string) => `mg-${el.id}-${elements.indexOf(color)}`;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible', opacity: p }}>
      <defs>
        {elements.map((c, i) => (
          <radialGradient key={i} id={`mg-${el.id}-${i}`} cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
            <stop offset="35%" stopColor={c} />
            <stop offset="100%" stopColor={mix(c, '#14112e', 0.35)} />
          </radialGradient>
        ))}
      </defs>
      {f.bonds.map((b, i) => {
        const A = at.get(b.a)!;
        const B = at.get(b.b)!;
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const len = Math.hypot(dx, dy) || 1;
        const [nx, ny] = [-dy / len, dx / len];
        const color = b.tint ? mix(STICK, TONES[b.tint.tone], b.tint.amount) : STICK;
        const glow = b.tint ? b.tint.amount : 0;
        return (
          <line
            key={i}
            x1={X(A.x + nx * b.offset)}
            y1={Y(A.y + ny * b.offset)}
            x2={X(B.x + nx * b.offset)}
            y2={Y(B.y + ny * b.offset)}
            stroke={color}
            strokeWidth={Math.max(4, 0.09 * S)}
            strokeLinecap="round"
            opacity={b.opacity * Math.min(A.opacity, B.opacity)}
            style={{ filter: glow ? `drop-shadow(0 0 ${8 * glow}px ${color})` : undefined }}
          />
        );
      })}
      {f.rings.map((r, i) => (
        <circle key={i} cx={X(r.x)} cy={Y(r.y)} r={r.r * S} fill="none" stroke={STICK} strokeWidth={Math.max(4, 0.09 * S)} opacity={r.opacity} />
      ))}
      {f.atoms.map((a) => {
        const look = atomLook(el, a.name);
        const glow = st?.focus[a.name] ?? 0;
        const r = look.r * S;
        return (
          <g key={a.name} opacity={a.opacity}>
            <circle cx={X(a.x)} cy={Y(a.y)} r={r} fill={`url(#${grad(look.color)})`} style={{ filter: `drop-shadow(0 0 ${3 + 14 * glow}px ${look.color})` }} />
            <text x={X(a.x)} y={Y(a.y)} fill="#14112e" fontSize={Math.max(14, r * (a.el.length > 1 ? 0.95 : 1.15))} fontWeight={800} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT }}>
              {a.el}
            </text>
            {a.charge !== 0 && (
              <text x={X(a.x) + a.chargeDir[0] * r * 1.35} y={Y(a.y) + a.chargeDir[1] * r * 1.35} fill={a.charge > 0 ? TONES.adj : TONES.bad} opacity={a.chargeOpacity} fontSize={Math.max(22, 0.42 * S)} fontWeight={800} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT, paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 5 }}>
                {[...chargeText(a.charge)].map((c) => SUPER[c] ?? c).join('')}
              </text>
            )}
          </g>
        );
      })}
      {f.arrows.map((a, i) => {
        // The head points along the curve's last stretch (from the bend towards the end).
        const [hx, hy] = [X(a.x2), Y(a.y2)];
        const l = Math.hypot(X(a.x2) - X(a.cx), Y(a.y2) - Y(a.cy)) || 1;
        const [ux, uy] = [(X(a.x2) - X(a.cx)) / l, (Y(a.y2) - Y(a.cy)) / l];
        const head = Math.max(14, 0.22 * S);
        const back = [hx - ux * head, hy - uy * head];
        const pts = `${hx},${hy} ${back[0] - uy * head * 0.5},${back[1] + ux * head * 0.5} ${back[0] + uy * head * 0.5},${back[1] - ux * head * 0.5}`;
        return (
          <g key={i} opacity={a.opacity} style={{ filter: `drop-shadow(0 0 6px ${TONES.theta})` }}>
            <path d={`M ${X(a.x1)} ${Y(a.y1)} Q ${X(a.cx)} ${Y(a.cy)} ${back[0]} ${back[1]}`} fill="none" stroke={TONES.theta} strokeWidth={Math.max(3.5, 0.06 * S)} strokeLinecap="round" />
            <polygon points={pts} fill={TONES.theta} />
          </g>
        );
      })}
      {f.names.map((n, i) => (
        <text key={i} x={X(n.x)} y={Y(n.y)} fill={n.tone ? TONES[n.tone] : INK} opacity={n.opacity} fontSize={26} fontWeight={700} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT, paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 5 }}>
          {n.text}
        </text>
      ))}
    </svg>
  );
}
