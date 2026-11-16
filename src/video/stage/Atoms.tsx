/**
 * Atoms for the chemistry videos (src/video/atoms.ts works out where everything is): a nucleus
 * with its symbol, its shells as rings, and its electrons circling them in the atom's colour.
 * Under each atom go its name, its electron arrangement and, once it has one, its charge.
 */
import type { AtomsEl, Tone } from '../script.ts';
import { atomsAt, SHELL_R, type AtomsPlay } from '../atoms.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const FONT = "'Lexend Variable', 'Inter Variable', system-ui, sans-serif";
const DEFAULT_TONES: Tone[] = ['adj', 'bad', 'good', 'theta', 'brand', 'hyp'];
const SUPER: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻' };

/** A charge as written after a symbol: "+", "2−", nothing for none. */
export function chargeText(q: number): string {
  if (!q) return '';
  return `${Math.abs(q) > 1 ? Math.abs(q) : ''}${q > 0 ? '+' : '-'}`;
}

export function AtomsView({ el, st, w, h, age, played }: { el: AtomsEl; st: ElState | undefined; w: number; h: number; age?: number; played?: AtomsPlay[] }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const labels = ownPart(st, 'labels');
  const arrangement = ownPart(st, 'arrangement');
  const charges = ownPart(st, 'charges');
  const f = atomsAt(el, played ?? st?.started ?? [], age ?? st?.age ?? 0);
  // Room under the atoms for their name and arrangement.
  const under = 70;
  const S = Math.min(w / el.span[0], (h - under) / el.span[1], 70);
  const ox = (w - el.span[0] * S) / 2;
  const oy = (h - under - el.span[1] * S) / 2;
  const X = (x: number) => ox + x * S;
  const Y = (y: number) => oy + y * S;
  const tone = (i: number) => TONES[el.atoms[i].tone ?? DEFAULT_TONES[i % DEFAULT_TONES.length]];
  return (
    <svg width={w} height={h} style={{ overflow: 'visible', opacity: p }}>
      <defs>
        {el.atoms.map((_, i) => (
          <radialGradient key={i} id={`ag-${el.id}-${i}`} cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.85} />
            <stop offset="30%" stopColor={tone(i)} />
            <stop offset="100%" stopColor={tone(i)} stopOpacity={0.8} />
          </radialGradient>
        ))}
      </defs>
      {el.atoms.map((a, i) => {
        const [cx, cy] = f.centres[i];
        const glow = st?.focus[a.id] ?? 0;
        const shells = f.rings[i];
        return (
          <g key={a.id}>
            {shells.map((n, s) => (
              <circle key={s} cx={X(cx)} cy={Y(cy)} r={SHELL_R[s] * S} fill="none" stroke={glow ? tone(i) : INK3} strokeOpacity={n ? 0.75 + 0.25 * glow : 0.25} strokeWidth={2 + 1.5 * glow} style={{ filter: glow ? `drop-shadow(0 0 ${10 * glow}px ${tone(i)})` : undefined }} />
            ))}
            <circle cx={X(cx)} cy={Y(cy)} r={0.55 * S} fill={`url(#ag-${el.id}-${i})`} style={{ filter: `drop-shadow(0 0 ${4 + 12 * glow}px ${tone(i)})` }} />
            <text x={X(cx)} y={Y(cy)} fill="#14112e" fontSize={0.5 * S} fontWeight={800} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT }}>
              {a.symbol}
            </text>
          </g>
        );
      })}
      {f.electrons.map((e, j) => (
        <circle key={j} cx={X(e.x)} cy={Y(e.y)} r={Math.max(6, 0.15 * S)} fill={tone(e.home)} stroke="#ffffff" strokeOpacity={0.85} strokeWidth={2} opacity={e.opacity} style={{ filter: `drop-shadow(0 0 6px ${tone(e.home)})` }} />
      ))}
      {el.atoms.map((a, i) => {
        const [cx, cy] = f.centres[i];
        const outer = SHELL_R[Math.max(0, f.shells[i].length - 1)];
        const below = !a.labelAbove;
        const q = f.charges[i];
        const shown = [labels > 0 && a.name ? { t: a.name, o: labels, size: 22, color: INK } : null, arrangement > 0 && f.shells[i].length ? { t: f.shells[i].join(', '), o: arrangement, size: 24, color: TONES.theta } : null].filter((x): x is { t: string; o: number; size: number; color: string } => !!x);
        return (
          <g key={a.id}>
            {shown.map((line, k) => (
              <text key={k} x={X(cx)} y={below ? Y(cy + outer) + 26 + k * 32 : Y(cy - outer) - 26 - (shown.length - 1 - k) * 32} fill={line.color} opacity={line.o} fontSize={line.size} fontWeight={k === 0 && labels > 0 && a.name ? 600 : 700} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4 }}>
                {line.t}
              </text>
            ))}
            {charges > 0 && q !== 0 && (
              <text x={X(cx + outer * 0.72) + 6} y={Y(cy - outer * 0.72) - 6} fill={q > 0 ? TONES.adj : TONES.bad} opacity={charges} fontSize={34} fontWeight={800} textAnchor="start" dominantBaseline="central" style={{ fontFamily: FONT, paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 5 }}>
                {`${a.symbol}${[...chargeText(q)].map((c) => SUPER[c] ?? c).join('').replace('⁻', '⁻')}`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
