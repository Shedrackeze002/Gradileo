/**
 * Boxes of moving particles for the chemistry videos (src/video/particles.ts moves them): glass
 * containers, with a lid, a piston or none, the particles themselves, and what can be shown over
 * them: a thermometer by each box, a pressure gauge, a flash where a particle hits a wall, a count
 * of the hits each second and the trail of one followed particle.
 */
import type { ParticleBox, ParticlesEl, Tone } from '../script.ts';
import { boxSize, FLASH, particlesAt, pressureOf, type BoxFrame, type PlayAt } from '../particles.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const FONT = "'Lexend Variable', 'Inter Variable', system-ui, sans-serif";
const GLASS = 'rgb(176 196 255)';
const HOT = TONES.bad;
const KIND_TONES: Tone[] = ['adj', 'opp', 'good', 'hyp'];
/** The hottest temperature a thermometer shows (a gas is about 4). */
const THERMO_MAX = 5;

function Text({ x, y, children, color = INK, size = 22, anchor = 'middle', weight = 600, opacity = 1 }: { x: number; y: number; children: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number; opacity?: number }) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

/** A thermometer: a tube with a bulb, filled to the temperature. */
function Thermometer({ x, top, bottom, level, opacity }: { x: number; top: number; bottom: number; level: number; opacity: number }) {
  const bulb = 15;
  const tube = 9;
  const y0 = bottom - bulb;
  const fill = (y0 - top - 6) * clamp01(level);
  return (
    <g opacity={opacity}>
      <rect x={x - tube - 3} y={top - 3} width={2 * tube + 6} height={y0 - top + 6} rx={tube + 3} fill="#15123a" stroke={INK3} strokeWidth={2.5} />
      <circle cx={x} cy={y0 + 4} r={bulb + 3} fill="#15123a" stroke={INK3} strokeWidth={2.5} />
      <rect x={x - tube + 3} y={y0 - fill} width={2 * tube - 6} height={fill + 6} rx={tube - 3} fill={HOT} />
      <circle cx={x} cy={y0 + 4} r={bulb - 2} fill={HOT} style={{ filter: `drop-shadow(0 0 ${4 + 10 * level}px ${HOT})` }} />
      {[0.25, 0.5, 0.75].map((k) => (
        <line key={k} x1={x + tube + 3} x2={x + tube + 11} y1={y0 - (y0 - top - 6) * k} y2={y0 - (y0 - top - 6) * k} stroke={INK3} strokeWidth={2} />
      ))}
    </g>
  );
}

/** A dial gauge: the needle sweeps from `0` to `max` and the reading is written under it. */
function Gauge({ cx, cy, r, value, max, unit, opacity, glow }: { cx: number; cy: number; r: number; value: number; max: number; unit: string; opacity: number; glow: number }) {
  const a0 = (-225 * Math.PI) / 180;
  const sweep = (270 * Math.PI) / 180;
  const at = (k: number, rr: number): [number, number] => [cx + rr * Math.cos(a0 + sweep * k), cy + rr * Math.sin(a0 + sweep * k)];
  const k = clamp01(value / max);
  const [nx, ny] = at(k, r - 14);
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill="#15123a" stroke={TONES.theta} strokeWidth={3 + 2 * glow} style={{ filter: glow ? `drop-shadow(0 0 ${10 * glow}px ${TONES.theta})` : undefined }} />
      {Array.from({ length: 9 }, (_, i) => {
        const [x1, y1] = at(i / 8, r - 4);
        const [x2, y2] = at(i / 8, r - (i % 2 ? 10 : 16));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK3} strokeWidth={2.5} />;
      })}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={TONES.theta} strokeWidth={5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={7} fill={TONES.theta} />
      <Text x={cx} y={cy + r * 0.5} size={22}>{`${Math.round(value)} ${unit}`}</Text>
      <Text x={cx} y={cy - r - 18} size={19} color={INK3} weight={500}>pressure</Text>
    </g>
  );
}

export function ParticlesView({ el, st, w, h, age, played }: { el: ParticlesEl; st: ElState | undefined; w: number; h: number; age?: number; played?: PlayAt[] }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const part = (name: string) => ownPart(st, name);
  const thermo = part('thermo');
  const gauge = part('gauge');
  const hits = part('hits');
  const trail = part('trail');
  const labels = part('labels');
  const rate = part('rate');
  const volume = part('volume');
  const now = age ?? st?.age ?? 0;
  const frames: BoxFrame[] = particlesAt(el, played ?? st?.started ?? [], now);

  // Room beside each box for its thermometer, and beside the gauge's box for the gauge; they keep
  // their room from the start so the boxes do not move when they appear.
  const hasThermo = !!el.thermometers;
  const THERMO_W = hasThermo ? 56 : 0;
  const GAUGE_R = 70;
  const GAUGE_W = el.gauge ? 2 * GAUGE_R + 40 : 0;
  const GAP = 70;
  const TOP = el.boxes.some((b) => b.piston) ? 56 : 24;
  const BOTTOM = 76;
  const sizes = el.boxes.map(boxSize);
  const sumW = sizes.reduce((s, b) => s + b.w, 0);
  const maxH = Math.max(...sizes.map((b) => b.h));
  const fixed = GAP * (el.boxes.length - 1) + THERMO_W * el.boxes.length + GAUGE_W;
  const S = Math.min((w - fixed - 40) / sumW, (h - TOP - BOTTOM) / maxH, 60);
  const totalW = sumW * S + fixed;
  let left = (w - totalW) / 2;
  const floor = TOP + maxH * S;

  return (
    <svg width={w} height={h} style={{ overflow: 'visible', opacity: p }}>
      <defs>
        {[...KIND_TONES, 'theta' as Tone].map((t) => (
          <radialGradient key={t} id={`pg-${el.id}-${t}`} cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
            <stop offset="28%" stopColor={TONES[t]} />
            <stop offset="100%" stopColor={TONES[t]} stopOpacity={0.75} />
          </radialGradient>
        ))}
      </defs>
      {el.boxes.map((b: ParticleBox, bi) => {
        const f = frames[bi];
        const { w: bw, h: bh } = sizes[bi];
        const x0 = left;
        const X = (x: number) => x0 + x * S;
        const Y = (y: number) => floor - y * S;
        left += bw * S + THERMO_W + (el.gauge?.box === b.id ? GAUGE_W : 0) + GAP;
        const glow = st?.focus[b.id] ?? 0;
        const kinds = b.kinds ?? [{ n: f.x.length, tone: b.tone }];
        const toneOf = (k: number) => kinds[k]?.tone ?? KIND_TONES[k % KIND_TONES.length];
        const r = 0.47 * S;
        const lidY = Y(f.lidY);
        const wallTop = Y(bh) - 4;
        const glass = { stroke: GLASS, strokeWidth: 5 + 3 * glow, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none', style: { filter: `drop-shadow(0 0 ${6 + 14 * glow}px ${glow ? TONES.theta : GLASS}66)` } };
        const trailPts = f.trail;
        return (
          <g key={b.id}>
            {/* The box: glass walls and floor, tinted inside. */}
            <rect x={X(0)} y={wallTop} width={bw * S} height={floor - wallTop} fill="rgb(120 140 255 / 0.06)" />
            <path d={`M ${X(0)} ${wallTop} L ${X(0)} ${floor} L ${X(bw)} ${floor} L ${X(bw)} ${wallTop}`} {...glass} />
            {/* The trail of the followed particle, fading towards its oldest point. */}
            {trail > 0 &&
              trailPts.slice(1).map(([x, y], i) => {
                const [px, py] = trailPts[i];
                return <line key={i} x1={X(px)} y1={Y(py)} x2={X(x)} y2={Y(y)} stroke={TONES.theta} strokeWidth={4} strokeLinecap="round" opacity={trail * 0.85 * ((i + 1) / trailPts.length)} />;
              })}
            {f.x.map((x, i) => {
              const followed = b.follow === i;
              const t = followed ? 'theta' : toneOf(f.kind[i]);
              return <circle key={i} cx={X(x)} cy={Y(f.y[i])} r={r} fill={`url(#pg-${el.id}-${t})`} style={followed ? { filter: `drop-shadow(0 0 8px ${TONES.theta})` } : undefined} />;
            })}
            {/* A flash wherever a particle has just hit a wall. */}
            {hits > 0 &&
              f.hits.map((hh, i) => {
                const k = clamp01((now - hh.at) / FLASH);
                return <circle key={i} cx={X(hh.x)} cy={Y(hh.y)} r={5 + 0.5 * S * k} fill="none" stroke={TONES.theta} strokeWidth={3.5 * (1 - k)} opacity={hits * (1 - k)} />;
              })}
            {/* The lid: a piston with a rod and handle, a plain lid, or nothing for a beaker. */}
            {b.piston ? (
              <g>
                <rect x={X(0) + 4} y={lidY - 14} width={bw * S - 8} height={14} rx={4} fill="rgb(120 116 170)" stroke={INK} strokeWidth={2} />
                <rect x={X(bw / 2) - 7} y={TOP - 44} width={14} height={lidY - 14 - (TOP - 44)} fill="rgb(120 116 170)" />
                <rect x={X(bw / 2) - 60} y={TOP - 50} width={120} height={14} rx={7} fill="rgb(120 116 170)" stroke={INK} strokeWidth={2} />
              </g>
            ) : b.open ? null : (
              <line x1={X(0)} y1={lidY} x2={X(bw)} y2={lidY} {...glass} />
            )}
            {hasThermo && <Thermometer x={X(bw) + THERMO_W / 2 + 6} top={wallTop + 10} bottom={floor} level={f.temp / THERMO_MAX} opacity={thermo} />}
            {el.gauge?.box === b.id && (
              <Gauge
                cx={X(bw) + THERMO_W + GAUGE_W / 2}
                cy={(wallTop + floor) / 2}
                r={GAUGE_R}
                value={pressureOf(el, b, f.temp, f.lidY / bh)}
                max={(el.gauge.start ?? 100) * 5}
                unit={el.gauge.unit ?? 'kPa'}
                opacity={gauge}
                glow={st?.focus.gauge ?? 0}
              />
            )}
            {b.label && <Text x={X(bw / 2)} y={floor + 30} size={26} opacity={labels}>{b.label}</Text>}
            {el.volume?.box === b.id && (
              <Text x={X(bw / 2)} y={floor + (b.label ? 62 : 30)} size={26} color={TONES.adj} opacity={volume}>
                {`volume ${(el.volume.start * (f.lidY / bh) / (b.lid ?? 1)).toFixed(el.volume.decimals ?? 2)} ${el.volume.unit ?? 'L'}`}
              </Text>
            )}
            {rate > 0 && (
              <Text x={X(bw / 2)} y={floor + 30 + (b.label ? 32 : 0) + (el.volume?.box === b.id ? 32 : 0)} size={20} color={TONES.theta} opacity={rate}>{`${f.hitRate} wall hits a second`}</Text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
