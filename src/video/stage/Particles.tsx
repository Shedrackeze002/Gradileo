/**
 * Boxes of moving particles for the chemistry videos (src/video/particles.ts moves them): glass
 * containers, with a lid, a piston or none, the particles themselves, and what can be shown over
 * them: a thermometer by each box, a pressure gauge, a flash where a particle hits a wall, a count
 * of the hits each second and the trail of one followed particle.
 */
import type { ParticleBox, ParticlesEl, Tone } from '../script.ts';
import { boxSize, FLASH, PAPER_START, particlesAt, pressureOf, tempOf, TEMPS, type BoxFrame, type PlayAt } from '../particles.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const FONT = "'Lexend Variable', 'Inter Variable', system-ui, sans-serif";
const GLASS = 'rgb(176 196 255)';
const HOT = TONES.bad;
const KIND_TONES: Tone[] = ['adj', 'opp', 'good', 'hyp'];
/** Chromatography paper, and the solvent soaking up it. */
const PAPER = 'rgb(236 232 222)';
const WET = 'rgb(150 185 235)';
/** The hottest temperature a thermometer shows (a gas is about 4). */
const THERMO_MAX = 5;
/** The width of the strip a bath heats or cools (as in particles.ts). */
const BATH_W = 2;
/** How far up its tube a thermometer reads (on a square-root scale, so a solid and a liquid are not crowded at the bottom). */
const thermoLevel = (t: number) => Math.sqrt(clamp01(t / THERMO_MAX));

/** A colour part way between two "#rrggbb" or "rgb(r g b)" colours. */
function mix(a: string, b: string, k: number) {
  const rgb = (c: string) => (c.startsWith('#') ? [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)) : (c.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number));
  const [p, q] = [rgb(a), rgb(b)];
  return `rgb(${p.map((v, i) => Math.round(v + (q[i] - v) * k)).join(' ')})`;
}

function Text({ x, y, children, color = INK, size = 22, anchor = 'middle', weight = 600, opacity = 1 }: { x: number; y: number; children: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number; opacity?: number }) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

/** A thermometer: a tube with a bulb, filled to the temperature. */
function Thermometer({ x, top, bottom, level, opacity, marks = [] }: { x: number; top: number; bottom: number; level: number; opacity: number; marks?: Array<{ level: number; label: string }> }) {
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
      {(marks.length ? [] : [0.25, 0.5, 0.75]).map((k) => (
        <line key={k} x1={x + tube + 3} x2={x + tube + 11} y1={y0 - (y0 - top - 6) * k} y2={y0 - (y0 - top - 6) * k} stroke={INK3} strokeWidth={2} />
      ))}
      {marks.map((m) => {
        const y = y0 - (y0 - top - 6) * m.level;
        const past = level >= m.level;
        return (
          <g key={m.label}>
            <line x1={x - tube - 3} x2={x + tube + 14} y1={y} y2={y} stroke={past ? TONES.theta : INK3} strokeWidth={3} />
            <Text x={x + tube + 20} y={y} size={19} anchor="start" color={past ? TONES.theta : INK3} weight={600}>{m.label}</Text>
          </g>
        );
      })}
    </g>
  );
}

/** A dial gauge: the needle sweeps from `0` to `max` and the reading is written under it. */
function Gauge({ cx, cy, r, value, max, unit, opacity, glow, decimals = 0 }: { cx: number; cy: number; r: number; value: number; max: number; unit: string; opacity: number; glow: number; decimals?: number }) {
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
      <Text x={cx} y={cy + r * 0.5} size={22}>{`${value.toFixed(decimals)} ${unit}`}</Text>
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
  const flow = part('flow');
  const count = part('count');
  const tally = part('tally');
  const width = part('width');
  const middle = part('middle');
  const now = age ?? st?.age ?? 0;
  const frames: BoxFrame[] = particlesAt(el, played ?? st?.started ?? [], now);

  // Room beside each box for its thermometer, and beside the gauge's box for the gauge; they keep
  // their room from the start so the boxes do not move when they appear.
  const hasThermo = !!el.thermometers;
  const marks = typeof el.thermometers === 'object' ? (el.thermometers.marks ?? []) : [];
  const THERMO_W = hasThermo ? (marks.length ? 150 : 56) : 0;
  const GAUGE_R = 70;
  const GAUGE_W = el.gauge ? 2 * GAUGE_R + 40 : 0;
  const GAP = el.flow ? 170 : 70;
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
  // Where each box's left wall is, worked out before they are drawn (the heat arrow needs them).
  const boxLefts: number[] = [];
  {
    let l = left;
    for (const [bi, b] of el.boxes.entries()) {
      boxLefts.push(l);
      l += sizes[bi].w * S + THERMO_W + (el.gauge?.box === b.id ? GAUGE_W : 0) + GAP;
    }
  }

  return (
    <svg width={w} height={h} style={{ overflow: 'visible', opacity: p }}>
      <defs>
        {[...new Set([...KIND_TONES, 'theta' as Tone, ...el.boxes.flatMap((b) => (b.kinds ?? []).map((k) => k.tone).filter((t): t is Tone => !!t))])].map((t) => (
          <radialGradient key={t} id={`pg-${el.id}-${t}`} cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
            <stop offset="28%" stopColor={TONES[t]} />
            <stop offset="100%" stopColor={TONES[t]} stopOpacity={0.75} />
          </radialGradient>
        ))}
        {/* The shine on a particle coloured by its heat, laid over its plain colour. */}
        <radialGradient id={`pg-${el.id}-shine`} cx="35%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
          <stop offset="30%" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.2} />
        </radialGradient>
      </defs>
      {flow > 0 && el.flow && (() => {
        // The arrow sits in the gap between the two boxes and points from the hotter to the cooler;
        // it thins as their temperatures meet.
        const ia = el.boxes.findIndex((b) => b.id === el.flow!.from);
        const ib = el.boxes.findIndex((b) => b.id === el.flow!.to);
        const lo = Math.min(ia, ib);
        const gapLeft = boxLefts[lo] + sizes[lo].w * S + THERMO_W;
        const gapRight = boxLefts[lo + 1];
        const t0 = (i: number) => tempOf(el.boxes[i].temp, TEMPS[el.boxes[i].state]);
        const diff = frames[ia].temp - frames[ib].temp;
        const k = clamp01(Math.abs(diff) / Math.max(1e-6, Math.abs(t0(ia) - t0(ib))));
        const dir = (diff >= 0 ? ia < ib : ib < ia) ? 1 : -1;
        const y = TOP + (maxH * S) / 2;
        const [x1, x2] = dir > 0 ? [gapLeft + 14, gapRight - 14] : [gapRight - 14, gapLeft + 14];
        const thick = 4 + 14 * k;
        const head = 12 + 14 * k;
        return (
          <g opacity={flow * (0.25 + 0.75 * clamp01(k * 4))}>
            <line x1={x1} y1={y} x2={x2 - dir * head} y2={y} stroke={HOT} strokeWidth={thick} strokeLinecap="round" />
            <path d={`M ${x2} ${y} L ${x2 - dir * head * 1.3} ${y - head} L ${x2 - dir * head * 1.3} ${y + head} Z`} fill={HOT} />
            <Text x={(x1 + x2) / 2} y={y - 22 - head} size={24} color={HOT}>{el.flow.label ?? 'heat'}</Text>
          </g>
        );
      })()}
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
        const rOf = (k: number) => r * (kinds[k]?.size ?? 1);
        const lidY = Y(f.lidY);
        const wallTop = Y(bh) - 4;
        const glass = { stroke: GLASS, strokeWidth: 5 + 3 * glow, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none', style: { filter: `drop-shadow(0 0 ${6 + 14 * glow}px ${glow ? TONES.theta : GLASS}66)` } };
        const trailPts = f.trail;
        return (
          <g key={b.id}>
            {/* The box: glass walls and floor, tinted inside (none for a bare box). */}
            {!b.bare && !b.paper && <rect x={X(0)} y={wallTop} width={bw * S} height={floor - wallTop} fill="rgb(120 140 255 / 0.06)" />}
            {!b.bare && !b.paper && <path d={`M ${X(0)} ${wallTop} L ${X(0)} ${floor} L ${X(bw)} ${floor} L ${X(bw)} ${wallTop}`} {...glass} />}
            {/* A paper strip: wet as far as the solvent has soaked, with a pencil start line under the dot. */}
            {b.paper && (
              <g style={{ filter: glow ? `drop-shadow(0 0 ${14 * glow}px ${TONES.theta})` : undefined }}>
                <rect x={X(0)} y={wallTop} width={bw * S} height={floor - wallTop} fill={PAPER} rx={4} />
                <rect x={X(0)} y={Y(f.front)} width={bw * S} height={floor - Y(f.front)} fill={WET} opacity={0.45} />
                <line x1={X(0)} x2={X(bw)} y1={Y(f.front)} y2={Y(f.front)} stroke={TONES.adj} strokeWidth={3} opacity={0.8} />
                <rect x={X(0)} y={Y(0.6)} width={bw * S} height={floor - Y(0.6)} fill={TONES.adj} opacity={0.55} />
                <line x1={X(0.4)} x2={X(bw - 0.4)} y1={Y(PAPER_START - 0.7)} y2={Y(PAPER_START - 0.7)} stroke="rgb(90 90 100)" strokeWidth={2.5} />
              </g>
            )}
            {/* Parts of the box held hot or cold: a hot plate tinted red, a condenser blue. */}
            {b.zones?.map((z, zi) => {
              const t0 = tempOf(b.temp, TEMPS[b.state]);
              const zt = z.temp === undefined ? f.temp : tempOf(z.temp, f.temp);
              const k = clamp01(Math.abs(zt - t0) / Math.max(0.05, t0));
              return <rect key={zi} x={X(z.x[0] * bw)} y={Y(z.y[1] * bh)} width={(z.x[1] - z.x[0]) * bw * S} height={(z.y[1] - z.y[0]) * bh * S} fill={zt >= t0 ? HOT : TONES.adj} opacity={0.06 + 0.22 * k} />;
            })}
            {/* The side where a box is heated or cooled, tinted red when hotter than it began and blue when colder. */}
            {b.bath && (() => {
              const t0 = tempOf(b.temp, TEMPS[b.state]);
              const k = clamp01(Math.abs(f.temp - t0) / Math.max(0.05, t0));
              const tint = f.temp >= t0 ? HOT : TONES.adj;
              const [x, y, ww, hh] = b.bath === 'left' ? [X(0), wallTop, BATH_W * S, floor - wallTop] : b.bath === 'right' ? [X(bw - BATH_W), wallTop, BATH_W * S, floor - wallTop] : [X(0), Y(BATH_W), bw * S, BATH_W * S];
              const grad = `pb-${el.id}-${b.id}`;
              const [x1, y1, x2, y2] = b.bath === 'left' ? [0, 0, 1, 0] : b.bath === 'right' ? [1, 0, 0, 0] : [0, 1, 0, 0];
              return (
                <g opacity={0.15 + 0.6 * k}>
                  <defs>
                    <linearGradient id={grad} x1={x1} y1={y1} x2={x2} y2={y2}>
                      <stop offset="0%" stopColor={tint} stopOpacity={0.75} />
                      <stop offset="100%" stopColor={tint} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <rect x={x} y={y} width={ww} height={hh} fill={`url(#${grad})`} />
                </g>
              );
            })()}
            {/* The trail of the followed particle, fading towards its oldest point. */}
            {trail > 0 &&
              trailPts.slice(1).map(([x, y], i) => {
                const [px, py] = trailPts[i];
                return <line key={i} x1={X(px)} y1={Y(py)} x2={X(x)} y2={Y(y)} stroke={TONES.theta} strokeWidth={4} strokeLinecap="round" opacity={trail * 0.85 * ((i + 1) / trailPts.length)} />;
              })}
            {/* Bonds joining atoms into molecules, under the atoms. */}
            {f.bonds.map(([i, j]) => (
              <line key={`b${i}-${j}`} x1={X(f.x[i])} y1={Y(f.y[i])} x2={X(f.x[j])} y2={Y(f.y[j])} stroke="rgb(230 232 255)" strokeWidth={0.32 * r} strokeLinecap="round" />
            ))}
            {f.x.map((x, i) => {
              const followed = b.follow === i;
              if (f.ke && b.heatColor && !followed) {
                // Blue when moving as slowly as at the first temperature, red as fast as at the second.
                const [lo, hi] = b.heatColor.map((t) => tempOf(t, TEMPS.liquid));
                const k = clamp01((f.ke[i] - lo) / (hi - lo));
                return (
                  <g key={i}>
                    <circle cx={X(x)} cy={Y(f.y[i])} r={rOf(f.kind[i])} fill={k < 0.5 ? mix(TONES.adj, TONES.theta, k * 2) : mix(TONES.theta, TONES.bad, k * 2 - 1)} />
                    <circle cx={X(x)} cy={Y(f.y[i])} r={rOf(f.kind[i])} fill={`url(#pg-${el.id}-shine)`} />
                  </g>
                );
              }
              const t = followed ? 'theta' : toneOf(f.kind[i]);
              return <circle key={i} cx={X(x)} cy={Y(f.y[i])} r={rOf(f.kind[i])} fill={`url(#pg-${el.id}-${t})`} style={followed ? { filter: `drop-shadow(0 0 8px ${TONES.theta})` } : undefined} />;
            })}
            {/* A divider across the box, slid up and out when it is lifted. */}
            {f.divider && f.divider.out < 1 && (
              <line x1={X(f.divider.x)} x2={X(f.divider.x)} y1={floor - 3 - f.divider.out * (floor - wallTop)} y2={wallTop - f.divider.out * (floor - wallTop)} {...glass} opacity={1 - f.divider.out} />
            )}
            {/* A low wall that never lifts (a still's flask on the left, the collecting side on the right). */}
            {b.wall && <line x1={X(b.wall.at * bw)} x2={X(b.wall.at * bw)} y1={floor - 3} y2={Y(b.wall.height * bh)} {...glass} />}
            {/* A filter or sieve: a mesh across the box, dashed for its holes. */}
            {f.filter && (
              <line x1={X(0) + 3} x2={X(bw) - 3} y1={Y(f.filter.y) + 3} y2={Y(f.filter.y) + 3} stroke={f.filter.open ? 'rgb(225 220 205)' : INK3} strokeWidth={6} strokeDasharray={`${0.6 * S} ${0.25 * S}`} />
            )}
            {/* A magnet held over the box while it pulls. */}
            {f.magnet > 0.02 && (() => {
              const mx = X(bw / 2);
              const top = wallTop - 96 + 30 * clamp01(f.magnet);
              const arm = 26;
              return (
                <g opacity={clamp01(f.magnet / 0.3)}>
                  <path d={`M ${mx - 2.2 * arm} ${top + 70} L ${mx - 2.2 * arm} ${top + 18} A ${2.2 * arm} ${2.2 * arm} 0 0 1 ${mx + 2.2 * arm} ${top + 18} L ${mx + 2.2 * arm} ${top + 70}`} fill="none" stroke="rgb(214 64 72)" strokeWidth={arm} />
                  <rect x={mx - 2.2 * arm - arm / 2} y={top + 56} width={arm} height={18} fill="rgb(200 205 220)" />
                  <rect x={mx + 2.2 * arm - arm / 2} y={top + 56} width={arm} height={18} fill="rgb(200 205 220)" />
                </g>
              );
            })()}
            {/* A bracket over the particles' width, with dashed marks as wide as they were at first. */}
            {width > 0 && b.state !== 'gas' && (() => {
              const top = Y(Math.max(...f.y)) - r - 18;
              const [a, z] = [X(f.span[0]) - r, X(f.span[1]) + r];
              return (
                <g opacity={width}>
                  {/* The first width, centred on where the particles are now (a solid may drift a little). */}
                  {[-1, 1].map((k) => {
                    const xx = X((f.span[0] + f.span[1]) / 2 + (k * (f.span0[1] - f.span0[0])) / 2) + k * r;
                    return <line key={k} x1={xx} x2={xx} y1={floor - 2} y2={top - 14} stroke={INK3} strokeWidth={2.5} strokeDasharray="7 7" />;
                  })}
                  <path d={`M ${a} ${top + 10} L ${a} ${top} L ${z} ${top} L ${z} ${top + 10}`} fill="none" stroke={TONES.theta} strokeWidth={4} strokeLinejoin="round" />
                </g>
              );
            })()}
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
            ) : b.open || b.bare || b.escape || b.paper ? null : (
              <line x1={X(0)} y1={lidY} x2={X(bw)} y2={lidY} {...glass} />
            )}
            {hasThermo && (
              <Thermometer
                x={X(bw) + (marks.length ? 34 : THERMO_W / 2 + 6)}
                top={wallTop + 10}
                bottom={floor}
                level={thermoLevel(f.temp)}
                opacity={thermo}
                marks={marks.map((m) => ({ level: thermoLevel(tempOf(m.at, 0)), label: m.label }))}
              />
            )}
            {el.gauge?.box === b.id && (
              <Gauge
                cx={X(bw) + THERMO_W + GAUGE_W / 2}
                cy={(wallTop + floor) / 2}
                r={GAUGE_R}
                value={pressureOf(el, b, f.temp, f.lidY / bh)}
                max={(el.gauge.start ?? 100) * 5}
                unit={el.gauge.unit ?? 'kPa'}
                decimals={el.gauge.decimals}
                opacity={gauge}
                glow={st?.focus.gauge ?? 0}
              />
            )}
            {b.label && <Text x={X(bw / 2)} y={floor + 30} size={26} opacity={labels}>{b.label}</Text>}
            {/* What is packed at each end of a box with `ends` (under the ends, with the labels). */}
            {b.endLabels &&
              b.endLabels.map((t, k) => {
                const e = (b.ends ?? 0.1) * bw;
                return (
                  <Text key={k} x={X(k ? bw - e / 2 : e / 2)} y={floor + 30} size={24} color={TONES[(b.kinds?.[k ? b.kinds.length - 1 : 0]?.tone ?? (k ? 'opp' : 'adj')) as keyof typeof TONES]} anchor={k ? 'end' : 'start'} opacity={labels}>
                    {t}
                  </Text>
                );
              })}
            {/* A dashed line down the middle of the box, to see which end something is nearer. */}
            {middle > 0 && (
              <g opacity={middle}>
                <line x1={X(bw / 2)} x2={X(bw / 2)} y1={wallTop - 10} y2={floor + 6} stroke={INK3} strokeWidth={2.5} strokeDasharray="8 8" />
                <Text x={X(bw / 2)} y={wallTop - 28} size={20} color={INK3}>middle</Text>
              </g>
            )}
            {el.volume?.box === b.id && (
              <Text x={X(bw / 2)} y={floor + (b.label ? 62 : 30)} size={26} color={TONES.adj} opacity={volume}>
                {`volume ${(el.volume.start * (f.lidY / bh) / (b.lid ?? 1)).toFixed(el.volume.decimals ?? 2)} ${el.volume.unit ?? 'L'}`}
              </Text>
            )}
            {/* A stirring rod, swept to and fro while the box is stirred. */}
            {f.stir > 0.02 && (() => {
              const sx = X(bw / 2 + Math.sin(now * 5) * bw * 0.18);
              return <line x1={sx} y1={wallTop - 30} x2={sx + Math.sin(now * 5) * 14} y2={Y(1.2)} stroke="rgb(200 210 255 / 0.85)" strokeWidth={9} strokeLinecap="round" opacity={clamp01(f.stir / 0.4)} />;
            })()}
            {count > 0 && b.kinds && b.kinds.length > 1 && (
              <Text x={X(bw / 2)} y={floor + (b.label ? 62 : 30)} size={24} color={TONES.theta} opacity={count}>{`${f.loose} of ${b.kinds[0].n} dissolved`}</Text>
            )}
            {tally > 0 && b.tally && (
              <Text x={X(bw / 2)} y={floor + (b.label ? 62 : 30)} size={24} color={TONES.theta} opacity={tally}>{`${f.tally} ${b.tally.label}`}</Text>
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
