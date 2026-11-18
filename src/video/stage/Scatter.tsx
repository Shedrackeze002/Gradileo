/**
 * Rutherford's gold foil (src/video/scatter.ts works out every path): a source on the left fires
 * alpha particles in a beam at a column of gold nuclei, each shot a bright dot with a fading tail
 * that leaves a faint track, so by the end the picture shows most tracks straight through, a few
 * bent and one or two thrown back.
 */
import type { ScatterEl } from '../script.ts';
import { BEAM, FOIL_X, fateOf, nucleiOf, scatterAt, shotsOf, VIEW } from '../scatter.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const FONT = "'Lexend Variable', 'Inter Variable', system-ui, sans-serif";
const GOLD = TONES.theta;
const ALPHA = TONES.bad;
/** How many points of a path make the bright tail behind a moving shot. */
const TAIL = 40;

export function ScatterView({ el, st, w, h, plays }: { el: ScatterEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const labels = ownPart(st, 'labels');
  const atoms = ownPart(st, 'atoms');
  const count = ownPart(st, 'count');
  const shots = shotsOf(el);
  const frame = scatterAt(el, plays ?? st?.plays ?? []);
  const nuclei = nucleiOf(el);
  // Room under the picture for the count.
  const below = 56;
  const S = Math.min(w / VIEW.w, (h - below) / VIEW.h);
  const ox = (w - VIEW.w * S) / 2;
  const X = (x: number) => ox + x * S;
  const Y = (y: number) => (VIEW.h - y) * S;
  const pts = (path: Array<[number, number]>, from: number, to: number) =>
    path
      .slice(Math.max(0, from), to + 1)
      .filter((_, i, a) => i % 3 === 0 || i === a.length - 1)
      .map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`)
      .join(' ');
  const tally = { through: 0, turned: 0, back: 0 };
  for (const s of frame.shots) if (s.fate) tally[s.fate]++;
  const foilL = X(FOIL_X - 0.9);
  const foilR = X(FOIL_X + 0.9);
  // The nucleus named by the labels: the one nearest the middle of the foil.
  const named = nuclei.reduce((b, n) => (Math.abs(n[1] - VIEW.h / 2) + Math.abs(n[0] - FOIL_X) < Math.abs(b[1] - VIEW.h / 2) + Math.abs(b[0] - FOIL_X) ? n : b));
  return (
    <svg width={w} height={h} style={{ overflow: 'visible', opacity: p }}>
      <defs>
        <clipPath id={`sc-${el.id}`}>
          <rect x={X(0)} y={Y(VIEW.h)} width={VIEW.w * S} height={VIEW.h * S} rx={14} />
        </clipPath>
        <radialGradient id={`sc-n-${el.id}`} cx="35%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#FFF4CC" />
          <stop offset="100%" stopColor={GOLD} />
        </radialGradient>
      </defs>
      <rect x={X(0)} y={Y(VIEW.h)} width={VIEW.w * S} height={VIEW.h * S} rx={14} fill="rgb(120 140 255 / 0.05)" stroke="rgb(176 196 255 / 0.25)" strokeWidth={1.5} />
      <g clipPath={`url(#sc-${el.id})`}>
        {/* The foil: a thin gold strip, its atoms each far bigger than its nucleus. */}
        <rect x={foilL} y={Y(VIEW.h)} width={foilR - foilL} height={VIEW.h * S} fill={GOLD} opacity={0.07} />
        {atoms > 0 &&
          nuclei.map(([x, y], i) => <circle key={`a${i}`} cx={X(x)} cy={Y(y)} r={0.56 * S} fill="rgb(255 209 102 / 0.06)" stroke={GOLD} strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="4 5" opacity={atoms} />)}
        {nuclei.map(([x, y], i) => (
          <circle key={`n${i}`} cx={X(x)} cy={Y(y)} r={Math.max(3.5, 0.075 * S)} fill={`url(#sc-n-${el.id})`} />
        ))}
        {/* The tracks: faint once a shot has passed, with a bright tail behind a moving one. */}
        {frame.shots.map((s) => {
          const path = shots[s.i].path;
          const fate = fateOf(shots[s.i].angle);
          const bent = s.fate !== null && fate !== 'through';
          return (
            <g key={s.i}>
              <polyline points={pts(path, 0, s.upto)} fill="none" stroke={bent ? ALPHA : 'rgb(255 138 138)'} strokeOpacity={bent ? 0.75 : 0.22} strokeWidth={bent ? 2.5 : 1.6} />
              {s.at && (
                <>
                  <polyline points={pts(path, s.upto - TAIL, s.upto)} fill="none" stroke={ALPHA} strokeWidth={3.5} strokeLinecap="round" opacity={0.8} />
                  <circle cx={X(s.at[0])} cy={Y(s.at[1])} r={7} fill={ALPHA} />
                </>
              )}
            </g>
          );
        })}
      </g>
      {/* The source: a box on the left the beam leaves from. */}
      <rect x={X(0.15)} y={Y(BEAM[1] + 0.3)} width={0.95 * S} height={(BEAM[1] - BEAM[0] + 0.6) * S} rx={8} fill="rgb(120 116 170)" stroke={INK} strokeWidth={2} />
      {labels > 0 && (
        <g opacity={labels} style={{ fontFamily: FONT }}>
          <text x={X(0.15)} y={Y(BEAM[1] + 0.3) - 12} fill={ALPHA} fontSize={22} fontWeight={600} textAnchor="start">
            alpha particles
          </text>
          <text x={X(FOIL_X)} y={Y(VIEW.h) - 12} fill={GOLD} fontSize={22} fontWeight={600} textAnchor="middle">
            gold foil
          </text>
          <line x1={X(named[0]) + 8} y1={Y(named[1]) - 6} x2={X(named[0]) + 0.9 * S} y2={Y(named[1]) - 0.75 * S} stroke={INK3} strokeWidth={2} />
          <text x={X(named[0]) + 0.95 * S} y={Y(named[1]) - 0.8 * S} fill={INK} fontSize={20} fontWeight={600}>
            nucleus
          </text>
        </g>
      )}
      {count > 0 && (
        <g opacity={count} style={{ fontFamily: FONT }}>
          <text x={w / 2} y={VIEW.h * S + 38} fill={INK} fontSize={24} fontWeight={600} textAnchor="middle">
            <tspan fill={INK}>{tally.through} straight through</tspan>
            <tspan fill={INK3}>{'   ·   '}</tspan>
            <tspan fill={ALPHA}>{tally.turned} turned aside</tspan>
            <tspan fill={INK3}>{'   ·   '}</tspan>
            <tspan fill={GOLD}>{tally.back} bounced back</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}
