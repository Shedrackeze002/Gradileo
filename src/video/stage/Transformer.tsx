/**
 * A transformer, and a power line (src/video/transformer.ts works out both).
 *
 * The transformer is an iron core with a coil on each side: the primary on the left, joined to
 * its supply (an alternating supply, or a battery and a switch), and the secondary on the right,
 * joined to a lamp. The flux in the core is violet: it brightens as it grows, and its arrowheads
 * turn round when it reverses. A small screen beside each coil draws its voltage against time, to
 * one scale, so a taller wave is a larger voltage.
 *
 * The power line runs from a power station over three pylons to a town. Its current is yellow
 * dots that move faster when the current is larger, and the wire glows orange with the heat that
 * is wasted in it.
 */
import type { ReactElement } from 'react';
import type { PowerlineEl, TransformerEl } from '../script.ts';
import { lineLoss, peakLineAmps, peakVolts, powerlineAt, primaryAmps, secondaryAmps, secondaryVolts, sweepOf, transformerAt, transformerWatts } from '../transformer.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { clamp01, FONT, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const FIELD = TONES.brand;
const CURRENT = TONES.theta;
const HEAT = TONES.opp;
const WIRE = '#d9d5f2';
const BACK = '#17143c';
const IRON = '#454269';
/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;

/** A quantity with a subscript: V with a small p, then the rest. */
function Named({ x, y, letter, sub, rest, color = INK, anchor = 'middle', size = 21, opacity = 1 }: { x: number; y: number; letter: string; sub: string; rest: string; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number; opacity?: number }) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={600} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      {letter}
      <tspan dy="0.32em" fontSize="0.68em">
        {sub}
      </tspan>
      <tspan dy="-0.32em">{rest}</tspan>
    </text>
  );
}

/** A number written to so many figures, with a zero kept at the end ("3.0"). From ten thousand up, the thousands are set apart by a thin space ("12 500"), as in the maths of the videos. */
function figuresOf(n: number, figures: number): string {
  if (!(Math.abs(n) > 0)) return '0';
  const rounded = Number(n.toPrecision(figures));
  const whole = Math.floor(Math.log10(Math.abs(rounded))) + 1;
  const places = Math.max(0, figures - whole);
  const written = rounded.toLocaleString('en-US', { minimumFractionDigits: places, maximumFractionDigits: places });
  return written.replace(/,/g, Math.abs(rounded) >= 10000 ? '\u2009' : '');
}

/** A whole number, such as a number of turns. */
const whole = (n: number) => figuresOf(Math.round(n), String(Math.round(n)).length);

/** A lamp: a ring with a cross, filled as brightly as the power it is given (0 to 1). */
function Lamp({ x, y, r, bright }: { x: number; y: number; r: number; bright: number }) {
  const d = r * 0.62;
  return (
    <>
      <circle cx={x} cy={y} r={r + 16 * bright} fill={CURRENT} opacity={0.3 * bright} />
      <circle cx={x} cy={y} r={r} fill={BACK} stroke={INK2} strokeWidth={2.5} />
      <circle cx={x} cy={y} r={r} fill={CURRENT} opacity={0.95 * bright} />
      <path d={`M${x - d},${y - d} L${x + d},${y + d} M${x - d},${y + d} L${x + d},${y - d}`} stroke={bright > 0.5 ? '#0d0c24' : INK2} strokeWidth={2.4} strokeLinecap="round" />
    </>
  );
}

/** `crop` draws the picture between two values of x (1136 across in all, with the core in the middle): a thumbnail is wider than the picture. The screens are left out when they would be cut. */
export function TransformerView({ el, st, w, h, plays, crop }: { el: TransformerEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; crop?: [number, number] }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = transformerAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const [fluxPart, turnsPart, voltagePart, currentPart, powerPart] = ['flux', 'turns', 'voltage', 'current', 'power'].map(part);
  const figures = el.figures ?? 2;
  const out: ReactElement[] = [];
  const [left, wide] = crop ? [crop[0], crop[1] - crop[0]] : [0, WIDE];
  const HIGH = wide * (h / w);
  const mid = HIGH / 2 + (el.label ? 12 : 0);

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  const top = el.label ? 30 : 0;
  out.push(<rect key="panel" x={left} y={top} width={wide} height={HIGH - top} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />);

  // The iron core: a frame, with a limb for each coil.
  const [cl, cr, ct, cb, T] = [438, 698, mid - 130, mid + 130, 50];
  out.push(
    <g key="core">
      <path d={`M${cl},${ct} H${cr} V${cb} H${cl} Z M${cl + T},${ct + T} V${cb - T} H${cr - T} V${ct + T} Z`} fill={IRON} fillRule="evenodd" stroke={INK3} strokeWidth={2.5} strokeLinejoin="round" />
      <Text x={(cl + cr) / 2} y={mid} size={19} color={INK3}>Iron core</Text>
    </g>,
  );

  // The flux in the core: a loop round the frame, brighter as the flux grows, with arrowheads that show which way it goes.
  if (fluxPart > 0) {
    const [fl, fr, ft, fb] = [cl + T / 2, cr - T / 2, ct + T / 2, cb - T / 2];
    const size = Math.abs(state.flux);
    const way = state.flux >= 0 ? 1 : -1;
    const heads: Array<[number, number, number]> = [
      [(fl + fr) / 2, ft, 0],
      [fr, (ft + fb) / 2, 90],
      [(fl + fr) / 2, fb, 180],
      [fl, (ft + fb) / 2, 270],
    ];
    out.push(
      <g key="flux" opacity={fluxPart}>
        <rect x={fl} y={ft} width={fr - fl} height={fb - ft} rx={10} fill="none" stroke={FIELD} strokeWidth={3 + 5 * size} opacity={0.18 + 0.82 * size} />
        {size > 0.04 &&
          heads.map(([x, y, turn], k) => (
            <polygon key={k} points="13,0 -9,9 -9,-9" transform={`translate(${x} ${y}) rotate(${turn + (way > 0 ? 0 : 180)}) scale(${0.55 + 0.6 * size})`} fill={FIELD} stroke="#0d0c24" strokeWidth={1.2} />
          ))}
      </g>,
    );
  }

  // The two coils: so many turns are drawn that the larger coil has twelve, and each has at least two.
  const most = Math.max(el.turns[0], el.turns[1], ...Object.values(el.clips).flatMap((clip) => clip.phases.map((ph) => ph.secondary ?? 0)));
  const drawn = (turns: number) => Math.max(2, Math.min(12, Math.round((12 * turns) / most)));
  const coil = (key: string, left: number, turns: number) => {
    const n = drawn(turns);
    const gap = Math.min(14, 150 / Math.max(1, n - 1));
    const first = mid - (gap * (n - 1)) / 2;
    return {
      first,
      last: first + gap * (n - 1),
      drawing: (
        <g key={key}>
          {Array.from({ length: n }, (_, k) => (
            <line key={k} x1={left - 9} y1={first + k * gap + 5} x2={left + T + 9} y2={first + k * gap - 5} stroke={WIRE} strokeWidth={5} strokeLinecap="round" />
          ))}
        </g>
      ),
    };
  };
  const primary = coil('primary', cl, el.turns[0]);
  const secondary = coil('secondary', cr - T, state.secondary);

  // The primary circuit: its leads, and an alternating supply, or a battery and a switch.
  const sx = 344;
  const [py0, py1] = [primary.first + 5, primary.last + 5];
  out.push(
    <g key="supply">
      <path d={`M${cl - 9},${py0} H${el.dc ? sx + 62 : sx} M${sx},${py0} V${mid - 26} M${cl - 9},${py1} H${sx} V${mid + 26}`} fill="none" stroke={WIRE} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      {el.dc ? (
        <>
          {/* The switch in the top lead: its arm lies along the lead when it is closed. */}
          <line x1={sx} y1={py0} x2={sx + 22} y2={py0} stroke={WIRE} strokeWidth={3.5} strokeLinecap="round" />
          <line x1={sx + 22} y1={py0} x2={sx + 22 + 40 * Math.cos(state.on ? 0 : 0.6)} y2={py0 - 40 * Math.sin(state.on ? 0 : 0.6)} stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <circle cx={sx + 22} cy={py0} r={5} fill={INK} />
          <circle cx={sx + 62} cy={py0} r={5} fill={INK} />
          <path d={`M${sx},${mid - 26} V${mid - 9} M${sx},${mid + 9} V${mid + 26}`} stroke={WIRE} strokeWidth={3.5} />
          <line x1={sx - 24} y1={mid - 9} x2={sx + 24} y2={mid - 9} stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <line x1={sx - 12} y1={mid + 9} x2={sx + 12} y2={mid + 9} stroke={INK} strokeWidth={7} strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={sx} cy={mid} r={26} fill={BACK} stroke={INK} strokeWidth={3} />
          <path d={`M${sx - 15},${mid} q7.5,-17 15,0 t15,0`} fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        </>
      )}
      {primary.drawing}
    </g>,
  );

  // The secondary circuit: its leads, and the lamp it lights (or two bare ends).
  const lx = 792;
  const [sy0, sy1] = [secondary.first - 5, secondary.last - 5];
  const full = (el.volts * state.secondary) / el.turns[0];
  const bright = el.load && full > 0 ? clamp01((state.vs / full) ** 2) : 0;
  out.push(
    <g key="load">
      <path d={`M${cr + 9},${sy0} H${lx} V${mid - (el.load ? 22 : 12)} M${cr + 9},${sy1} H${lx} V${mid + (el.load ? 22 : 12)}`} fill="none" stroke={WIRE} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      {el.load ? (
        <Lamp x={lx} y={mid} r={22} bright={bright} />
      ) : (
        <>
          <circle cx={lx} cy={mid - 12} r={5} fill={INK} />
          <circle cx={lx} cy={mid + 12} r={5} fill={INK} />
        </>
      )}
      {secondary.drawing}
    </g>,
  );

  // The name of each coil, over it.
  out.push(
    <g key="names">
      <Text x={cl + T / 2 - 34} y={ct - 24} size={19} color={INK2}>Primary coil</Text>
      <Text x={cr - T / 2 + 34} y={ct - 24} size={19} color={INK2}>Secondary coil</Text>
    </g>,
  );

  // How many turns each coil has, under it.
  if (turnsPart > 0)
    out.push(
      <g key="turns" opacity={turnsPart}>
        <Named x={cl + T / 2 + 14} y={cb + 28} anchor="end" letter="N" sub="p" rest={` = ${whole(el.turns[0])} turns`} />
        <Named x={cr - T / 2 - 14} y={cb + 28} anchor="start" letter="N" sub="s" rest={` = ${whole(state.secondary)} turns`} />
      </g>,
    );

  // A screen beside each coil draws its voltage against time, both to one scale.
  const peak = peakVolts(el);
  const sweep = sweepOf(el);
  const screen = (key: string, left: number, which: 1 | 2, sub: string, volts: number, amps: number) => {
    const [gl, gr, gt, gb] = [left, left + 236, mid - 74, mid + 74];
    const TX = (seconds: number) => gl + (seconds / sweep) * (gr - gl);
    const TY = (v: number) => mid - Math.max(-1.1, Math.min(1.1, v / peak)) * 62;
    const last = state.trace[state.trace.length - 1];
    return (
      <g key={key}>
        {voltagePart > 0 && (
          <g opacity={voltagePart}>
            <rect x={gl} y={gt} width={gr - gl} height={gb - gt} rx={6} fill="rgb(13 12 36 / 0.8)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />
            <line x1={gl} y1={mid} x2={gr} y2={mid} stroke={INK3} strokeWidth={1.5} strokeDasharray="4 7" />
            {state.trace.length > 1 && <polyline points={state.trace.map((point) => `${TX(point[0]).toFixed(1)},${TY(point[which]).toFixed(1)}`).join(' ')} fill="none" stroke={CURRENT} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />}
            {last && <circle cx={TX(last[0])} cy={TY(last[which])} r={5.5} fill={CURRENT} stroke="#0d0c24" strokeWidth={1.5} />}
            <Named x={gl} y={gt - 26} anchor="start" letter="V" sub={sub} rest={` = ${figuresOf(volts, figures)} V`} color={CURRENT} size={23} />
          </g>
        )}
        {currentPart > 0 && <Named x={gl} y={gb + 28} anchor="start" letter="I" sub={sub} rest={` = ${figuresOf(amps, figures)} A`} opacity={currentPart} />}
        {powerPart > 0 && <Named x={gr} y={gb + 28} anchor="end" letter="P" sub={sub} rest={` = ${figuresOf(transformerWatts(el, state), figures)} W`} color={TONES.good} opacity={powerPart} />}
      </g>
    );
  };
  if (!crop || (crop[0] <= 40 && crop[1] >= WIDE - 40)) {
    out.push(screen('screen-p', 40, 1, 'p', el.dc ? Math.abs(state.vp) : state.on ? el.volts : 0, primaryAmps(el, state)));
    out.push(screen('screen-s', 860, 2, 's', secondaryVolts(el, state), secondaryAmps(el, state)));
  }

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${wide} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}

/** A pylon: a tapering tower with one arm, standing on the ground. */
function Pylon({ x, ground, top }: { x: number; ground: number; top: number }) {
  return (
    <path
      d={`M${x - 20},${ground} L${x - 5},${top} H${x + 5} L${x + 20},${ground} M${x - 26},${top + 10} H${x + 26} M${x - 15},${ground - (ground - top) * 0.33} L${x + 11},${ground - (ground - top) * 0.62} M${x + 15},${ground - (ground - top) * 0.33} L${x - 11},${ground - (ground - top) * 0.62}`}
      fill="none"
      stroke={INK3}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function PowerlineView({ el, st, w, h, plays }: { el: PowerlineEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = powerlineAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const [voltagePart, currentPart, lossPart] = ['voltage', 'current', 'loss'].map(part);
  const out: ReactElement[] = [];
  const HIGH = WIDE * (h / w);
  const top = el.label ? 30 : 0;
  const ground = HIGH - 118;
  const arm = top + 96;

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  out.push(<rect key="panel" x={0} y={top} width={WIDE} height={HIGH - top} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />);

  // The ground, the power station on the left and the town on the right.
  out.push(
    <g key="land">
      <line x1={24} y1={ground} x2={WIDE - 24} y2={ground} stroke={INK3} strokeWidth={2.5} strokeLinecap="round" />
      <path d={`M52,${ground} V${ground - 62} H132 V${ground} Z`} fill="#3b3866" stroke={INK2} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={`M140,${ground} C150,${ground - 40} 150,${ground - 66} 146,${ground - 92} H180 C176,${ground - 66} 176,${ground - 40} 186,${ground} Z`} fill="#3b3866" stroke={INK2} strokeWidth={2.5} strokeLinejoin="round" />
      {[66, 92, 118].map((x) => (
        <rect key={x} x={x - 6} y={ground - 46} width={12} height={14} rx={2} fill={CURRENT} opacity={0.85} />
      ))}
      <Text x={118} y={ground + 26} size={19} color={INK2}>Power station</Text>
      {[
        [968, 46],
        [1022, 58],
        [1076, 42],
      ].map(([x, tall]) => (
        <g key={x}>
          <path d={`M${x - 22},${ground} V${ground - tall} L${x},${ground - tall - 22} L${x + 22},${ground - tall} V${ground} Z`} fill="#3b3866" stroke={INK2} strokeWidth={2.5} strokeLinejoin="round" />
          <rect x={x - 7} y={ground - tall + 8} width={14} height={14} rx={2} fill={CURRENT} opacity={0.85} />
        </g>
      ))}
      <Text x={1022} y={ground + 26} size={19} color={INK2}>Town</Text>
    </g>,
  );

  // The line: up from the station, over three pylons with a little sag between them, and down to the town.
  const pylons = [372, 568, 764];
  const ends: Array<[number, number]> = [[216, ground - 30], ...pylons.map((x): [number, number] => [x, arm + 10]), [920, ground - 30]];
  const points: Array<[number, number]> = [];
  for (let k = 0; k < ends.length - 1; k++) {
    const [a, b] = [ends[k], ends[k + 1]];
    const sag = k === 0 || k === ends.length - 2 ? 10 : 22;
    for (let j = 0; j <= 24; j++) {
      const f = j / 24;
      if (k > 0 && j === 0) continue;
      points.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f + sag * 4 * f * (1 - f)]);
    }
  }
  const lengths = points.slice(1).map((q, j) => Math.hypot(q[0] - points[j][0], q[1] - points[j][1]));
  const total = lengths.reduce((n, l) => n + l, 0);
  const along = (d: number): [number, number] => {
    let [left, j] = [d, 0];
    while (j < lengths.length - 1 && left > lengths[j]) left -= lengths[j++];
    const f = lengths[j] > 0 ? Math.min(1, left / lengths[j]) : 0;
    return [points[j][0] + (points[j + 1][0] - points[j][0]) * f, points[j][1] + (points[j + 1][1] - points[j][1]) * f];
  };
  const path = points.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ');
  const worst = lineLoss(el, el.watts / peakLineAmps(el));
  const hot = worst > 0 ? clamp01(state.loss / worst) : 0;
  out.push(
    <g key="line">
      {/* A transformer at each end of the line, as a box with two coils. */}
      {[216, 920].map((x) => (
        <g key={x}>
          <rect x={x - 24} y={ground - 30} width={48} height={30} rx={4} fill="#2a2752" stroke={INK2} strokeWidth={2.5} />
          <path d={`M${x - 13},${ground - 22} q8,3.5 0,7 q8,3.5 0,7 M${x + 13},${ground - 22} q-8,3.5 0,7 q-8,3.5 0,7`} fill="none" stroke={WIRE} strokeWidth={2.2} strokeLinecap="round" />
        </g>
      ))}
      {pylons.map((x) => (
        <Pylon key={x} x={x} ground={ground} top={arm} />
      ))}
      {lossPart > 0 && <polyline points={path} fill="none" stroke={HEAT} strokeWidth={5 + 17 * Math.sqrt(hot)} strokeLinecap="round" strokeLinejoin="round" opacity={lossPart * (0.12 + 0.5 * Math.sqrt(hot))} />}
      <polyline points={path} fill="none" stroke={WIRE} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </g>,
  );

  // The current: dots that move along the line, faster for a larger current.
  if (currentPart > 0) {
    const gap = 56;
    const peak = peakLineAmps(el);
    const shift = peak > 0 ? ((state.drift / peak) * 120) % gap : 0;
    const dots: ReactElement[] = [];
    for (let d = shift; d < total; d += gap) {
      const [x, y] = along(d);
      dots.push(<circle key={d.toFixed(1)} cx={x} cy={y} r={5.5} fill={CURRENT} stroke="#0d0c24" strokeWidth={1.2} />);
    }
    out.push(
      <g key="current" opacity={currentPart}>
        {dots}
      </g>,
    );
  }

  // The power sent, the voltage of the line and its current, in a row above it.
  const row = top + 40;
  out.push(<Text key="sent" x={40} y={row} anchor="start" size={23}>{`P = ${figuresOf(el.watts / 1000, 3)} kW`}</Text>);
  if (voltagePart > 0) out.push(<Text key="volts" x={WIDE / 2} y={row} size={23} opacity={voltagePart}>{`V = ${figuresOf(state.volts, 3)} V`}</Text>);
  if (currentPart > 0) out.push(<Text key="amps" x={WIDE - 40} y={row} anchor="end" size={23} color={CURRENT} opacity={currentPart}>{`I = P ÷ V = ${figuresOf(state.amps, 2)} A`}</Text>);

  // The power wasted as heat in the line, as a number and as its share of a bar that stands for the power sent.
  if (lossPart > 0) {
    const [bl, br, by] = [300, 836, HIGH - 40];
    const share = clamp01(state.loss / el.watts);
    out.push(
      <g key="loss" opacity={lossPart}>
        <Text x={bl} y={by - 28} anchor="start" size={23} color={HEAT}>{`Wasted as heat: I²R = ${figuresOf(state.loss, 3)} W`}</Text>
        <rect x={bl} y={by - 8} width={br - bl} height={16} rx={5} fill={TONES.good} opacity={0.85} />
        <rect x={bl} y={by - 8} width={Math.max(1.5, (br - bl) * share)} height={16} rx={Math.min(5, ((br - bl) * share) / 2)} fill={HEAT} />
        <Text x={br + 16} y={by} anchor="start" size={19} color={INK2}>{`${figuresOf(share * 100, 2)}% wasted`}</Text>
      </g>,
    );
  }

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`0 0 ${WIDE} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
