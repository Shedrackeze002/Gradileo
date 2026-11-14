/**
 * Motion for the physics videos: blocks, carts and balls on straight tracks, moved by the forces
 * drawn on them (src/video/motion.ts works the motion out). Force arrows grow from each body, a
 * velocity arrow rides above it, strobe marks show where it was at equal time steps, and momentum
 * bars change as it moves.
 */
import type { ReactElement } from 'react';
import type { MotionBody, MotionEl, Tone } from '../script.ts';
import { motionAt, netForce, widthOf, type MotionState } from '../motion.ts';
import { easeOut, ownPart, type ElState } from '../timeline.ts';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const FONT = "'Lexend Variable', 'Inter Variable', system-ui, sans-serif";
const INK2 = 'rgb(201 198 232)';

/** Body colours when the script gives none, by the body's place in the list. */
const BODY_TONES: Tone[] = ['adj', 'opp', 'hyp', 'brand'];
/** The colour of velocity, the net force and the total momentum in every physics video. */
const VELOCITY = TONES.good;
const NET = TONES.theta;

/** A number for a label: whole when it is whole, one decimal otherwise. */
const short = (n: number) => {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};
/** A changing number: always one decimal, so it does not jump about, and never "-0.0". */
const live = (n: number) => (Math.abs(n) < 0.05 ? '0.0' : n.toFixed(1)).replace('-', '−');

/** An arrow from (x, y) of the given signed length along x or y, growing from its tail. */
function Arrow({ x, y, len, axis = 'x', color, weight = 9, opacity = 1 }: { x: number; y: number; len: number; axis?: 'x' | 'y'; color: string; weight?: number; opacity?: number }) {
  const l = Math.abs(len);
  if (l < 1) return null;
  const s = Math.sign(len);
  const head = Math.min(weight * 2.4, l);
  const hw = weight * 1.35;
  // Drawn along +x, then turned: up is negative y on the screen.
  const angle = axis === 'x' ? (s > 0 ? 0 : 180) : s > 0 ? -90 : 90;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity} style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}>
      {l > head && <line x1={0} y1={0} x2={l - head + 0.5} y2={0} stroke={color} strokeWidth={weight} strokeLinecap="round" />}
      <polygon points={`${l},0 ${l - head},${hw} ${l - head},${-hw}`} fill={color} />
    </g>
  );
}

function Text({ x, y, children, color = INK, size = 21, anchor = 'middle', weight = 600, opacity = 1 }: { x: number; y: number; children: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number; opacity?: number }) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

/** A wheel that turns as the cart rolls: `turn` is the angle in degrees. */
function Wheel({ cx, cy, r, turn, color }: { cx: number; cy: number; r: number; turn: number; color: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${turn})`}>
      <circle r={r} fill="#15123a" stroke={color} strokeWidth={3} />
      {[0, 60, 120].map((a) => (
        <line key={a} x1={-r + 3} y1={0} x2={r - 3} y2={0} stroke={color} strokeWidth={2} opacity={0.75} transform={`rotate(${a})`} />
      ))}
      <circle r={2.6} fill={color} />
    </g>
  );
}

interface Box {
  /** Left and right edges and top, in pixels; the body stands on `ground`. */
  left: number;
  right: number;
  top: number;
  cx: number;
  mid: number;
}

/** A cart's bumper at each end, in metres: it squeezes when carts touch. */
const BUMPER = 0.12;

export function MotionView({ el, st, w, h, plays }: { el: MotionEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state: MotionState = motionAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const vel = part('velocity');
  const readout = part('readout');
  const net = part('net');
  const bars = part('bars');
  const total = part('total');
  const clock = part('clock');
  const strobe = part('strobe');
  const graph = part('graph');

  const lanes = el.lanes ?? [{}];
  const tone = (b: MotionBody) => TONES[b.tone ?? BODY_TONES[el.bodies.indexOf(b) % BODY_TONES.length]];
  const fs = el.forceScale ?? 4;
  const vs = el.velocityScale ?? 24;

  // The bars keep their room from the start, so the tracks do not jump when they appear.
  const barRows = el.momentumMax ? el.bodies.length + (el.momentumTotal === false ? 0 : 1) : 0;
  const ROW = 44;
  const barsH = barRows ? barRows * ROW + 50 : 0;
  const top = 40;
  const laneH = (h - top - barsH) / lanes.length;
  // Under each track: the ruler, and on a single track room for the net force.
  const below = lanes.length > 1 || barRows ? 52 : 104;
  const PAD = 26;
  const S = (w - 2 * PAD) / (el.span[1] - el.span[0]);
  // Bodies are drawn to the track's scale, within limits that keep their labels readable.
  const BLOCK_H = Math.max(56, Math.min(96, 0.66 * S));
  const CART_H = Math.max(42, Math.min(72, 0.5 * S));
  const WHEEL = Math.max(11, Math.min(18, 0.14 * S));
  const X = (m: number) => PAD + (m - el.span[0]) * S;
  const ground = (lane: number) => top + laneH * (lane + 1) - below;

  // How far each body's bumpers are squeezed by a neighbour on the same track.
  const squeeze: Record<string, { l: number; r: number }> = Object.fromEntries(el.bodies.map((b) => [b.id, { l: 0, r: 0 }]));
  for (const a of el.bodies) {
    for (const b of el.bodies) {
      if (a === b || (a.lane ?? 0) !== (b.lane ?? 0) || state.bodies[a.id].x > state.bodies[b.id].x) continue;
      const over = state.bodies[a.id].x + widthOf(a) / 2 - (state.bodies[b.id].x - widthOf(b) / 2);
      if (over > 0) {
        squeeze[a.id].r = Math.max(squeeze[a.id].r, over / 2);
        squeeze[b.id].l = Math.max(squeeze[b.id].l, over / 2);
      }
    }
  }

  const box = (b: MotionBody, x = state.bodies[b.id].x): Box => {
    const g = ground(b.lane ?? 0);
    const half = (widthOf(b) * S) / 2;
    const cx = X(x);
    const height = b.shape === 'block' ? BLOCK_H : b.shape === 'cart' ? CART_H + WHEEL + 4 : half * 2;
    return { left: cx - half, right: cx + half, top: g - height, cx, mid: g - height / 2 };
  };

  const out: ReactElement[] = [];

  // Tracks: the surface, a ruler in metres and the lane's name.
  lanes.forEach((lane, li) => {
    const g = ground(li);
    const rough = lane.surface === 'rough';
    out.push(
      <g key={`lane${li}`}>
        <rect x={PAD - 12} y={g} width={w - 2 * PAD + 24} height={rough ? 12 : 9} rx={3} fill={rough ? 'rgb(248 113 113 / 0.16)' : 'rgb(77 163 255 / 0.2)'} />
        <line x1={PAD - 12} y1={g} x2={w - PAD + 12} y2={g} stroke={rough ? '#c9a08c' : '#bcd9ff'} strokeWidth={3} strokeLinecap="round" />
        {rough &&
          Array.from({ length: Math.floor((w - 2 * PAD + 24) / 11) }, (_, i) => (
            <line key={i} x1={PAD - 8 + i * 11} y1={g + 11} x2={PAD - 2 + i * 11} y2={g + 2} stroke="#c9a08c" strokeWidth={1.6} opacity={0.75} />
          ))}
        {lane.label && (
          <text x={lane.labelSide === 'right' ? w - PAD + 10 : PAD - 10} y={top + laneH * li + 14} textAnchor={lane.labelSide === 'right' ? 'end' : 'start'} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {lane.label}
          </text>
        )}
      </g>,
    );
    const every = S >= 46 ? 1 : S >= 24 ? 2 : 5;
    for (let m = Math.ceil(el.span[0]); m <= Math.floor(el.span[1]); m++) {
      const major = m % every === 0;
      out.push(<line key={`tick${li}-${m}`} x1={X(m)} y1={g + (rough ? 12 : 9)} x2={X(m)} y2={g + (major ? 22 : 16)} stroke={INK3} strokeWidth={1.5} opacity={0.7} />);
      if (major)
        out.push(
          <text key={`num${li}-${m}`} x={X(m)} y={g + 36} fill={INK3} fontSize={16} textAnchor="middle" style={{ fontFamily: FONT }}>
            {m === Math.floor(el.span[1] / every) * every ? `${m} m` : m}
          </text>,
        );
    }
  });

  // Strobe marks: where each body was at equal time steps. Wide gaps mean it was moving fast.
  if (strobe > 0) {
    for (const b of el.bodies) {
      const c = tone(b);
      const g = ground(b.lane ?? 0);
      // An outline at each mark, except where it would sit on top of the last one drawn (a body
      // that has barely moved leaves only its dots).
      let drawn = Number.NEGATIVE_INFINITY;
      state.marks[b.id].forEach((x, i) => {
        const k = box(b, x);
        const clear = Math.abs(x - state.bodies[b.id].x) >= widthOf(b) * 0.55;
        const outline = clear && Math.abs(x - drawn) >= widthOf(b) * 0.55;
        if (outline) drawn = x;
        out.push(
          <g key={`mark-${b.id}-${i}`} opacity={strobe}>
            {outline && <rect x={k.left + 2} y={k.top + 2} width={k.right - k.left - 4} height={g - k.top - (b.shape === 'cart' ? WHEEL + 6 : 4)} rx={b.shape === 'ball' ? 999 : 9} fill={c} fillOpacity={0.05} stroke={c} strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="5 5" />}
            <circle cx={k.cx} cy={g} r={4.5} fill={c} />
          </g>,
        );
      });
    }
  }

  // Speed lines behind a moving body, longer the faster it goes, and dust where friction rubs.
  for (const b of el.bodies) {
    const s = state.bodies[b.id];
    if (Math.abs(s.v) < 0.3) continue;
    const k = box(b);
    const g = ground(b.lane ?? 0);
    const dir = Math.sign(s.v);
    // No lines where a force arrow leaves the back of the body (the push of a collision).
    const clearBack = !state.forces.some((f) => f.on === b.id && f.axis !== 'y' && !f.resist && !f.hidden && Math.sign(f.n) === -dir);
    const back = dir > 0 ? k.left - 8 : k.right + 8;
    const len = Math.min(90, Math.abs(s.v) * 11);
    const c = tone(b);
    (clearBack ? [0.22, 0.5, 0.78] : []).forEach((f, i) => {
      // Each line slides back and fades, out of step with the others.
      const ph = (state.time * 2.6 + i * 0.37) % 1;
      const y = k.top + (g - k.top) * f;
      out.push(<line key={`streak-${b.id}-${i}`} x1={back - dir * ph * 14} y1={y} x2={back - dir * (ph * 14 + len * (0.55 + 0.45 * ((i * 7) % 3) / 2))} y2={y} stroke={c} strokeWidth={3} strokeLinecap="round" opacity={0.5 * (1 - ph * 0.6) * clamp01(Math.abs(s.v) / 1.5)} />);
    });
    if (state.forces.some((f) => f.on === b.id && f.resist)) {
      for (let i = 0; i < 5; i++) {
        const ph = (state.time * 2.2 + i * 0.2) % 1;
        out.push(<circle key={`dust-${b.id}-${i}`} cx={back - dir * ph * 34} cy={g - 5 - ph * (8 + 5 * (i % 3))} r={2 + 5 * ph} fill="#c9a08c" opacity={0.55 * (1 - ph)} />);
      }
    }
  }

  // Bodies.
  for (const b of el.bodies) {
    const c = tone(b);
    const s = state.bodies[b.id];
    const k = box(b);
    const g = ground(b.lane ?? 0);
    const f = st?.focus[b.id] ?? 0;
    const glow = f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${c})` } : undefined;
    const label = b.label ?? `${short(b.mass)} kg`;
    if (b.shape === 'block') {
      out.push(
        <g key={b.id} style={glow}>
          <rect x={k.left} y={k.top} width={k.right - k.left} height={BLOCK_H - 1.5} rx={10} fill="#1b1846" />
          <rect x={k.left} y={k.top} width={k.right - k.left} height={BLOCK_H - 1.5} rx={10} fill={c} fillOpacity={0.3} stroke={c} strokeWidth={3} />
          <rect x={k.left + 8} y={k.top + 7} width={k.right - k.left - 16} height={7} rx={3.5} fill="#fff" opacity={0.13} />
          <Text x={k.cx} y={k.mid} size={Math.min(28, 0.3 * (k.right - k.left))} weight={700}>
            {label}
          </Text>
        </g>,
      );
    } else if (b.shape === 'cart') {
      const bump = BUMPER * S;
      const bl = Math.max(2, bump - squeeze[b.id].l * S);
      const br = Math.max(2, bump - squeeze[b.id].r * S);
      const cl = k.left + bump;
      const cr = k.right - bump;
      const bodyBottom = g - WHEEL - 4;
      const bodyTop = bodyBottom - CART_H;
      const turn = ((s.x * S) / WHEEL) * (180 / Math.PI);
      const cy = (bodyTop + bodyBottom) / 2 + 8;
      out.push(
        <g key={b.id} style={glow}>
          {/* Bumpers: a rod and a pad, which shorten as the carts squeeze together. */}
          <line x1={cl} y1={cy} x2={cl - bl} y2={cy} stroke={c} strokeWidth={5} />
          <rect x={cl - bl - 3.5} y={cy - 14} width={7} height={28} rx={3.5} fill={c} />
          <line x1={cr} y1={cy} x2={cr + br} y2={cy} stroke={c} strokeWidth={5} />
          <rect x={cr + br - 3.5} y={cy - 14} width={7} height={28} rx={3.5} fill={c} />
          <rect x={cl} y={bodyTop} width={cr - cl} height={CART_H} rx={9} fill="#1b1846" />
          <rect x={cl} y={bodyTop} width={cr - cl} height={CART_H} rx={9} fill={c} fillOpacity={0.3} stroke={c} strokeWidth={3} />
          <rect x={cl + 8} y={bodyTop + 6} width={cr - cl - 16} height={6} rx={3} fill="#fff" opacity={0.13} />
          <Wheel cx={cl + (cr - cl) * 0.22} cy={g - WHEEL} r={WHEEL} turn={turn} color={c} />
          <Wheel cx={cl + (cr - cl) * 0.78} cy={g - WHEEL} r={WHEEL} turn={turn} color={c} />
          <Text x={k.cx} y={bodyTop + CART_H / 2 - 1} size={Math.min(26, 0.2 * (cr - cl))} weight={700}>
            {label}
          </Text>
        </g>,
      );
    } else {
      const r = (k.right - k.left) / 2;
      const turn = ((s.x * S) / r) * (180 / Math.PI);
      out.push(
        <g key={b.id} style={glow}>
          <circle cx={k.cx} cy={g - r} r={r - 1.5} fill="#1b1846" />
          <circle cx={k.cx} cy={g - r} r={r - 1.5} fill={c} fillOpacity={0.3} stroke={c} strokeWidth={3} />
          <line x1={k.cx} y1={g - r} x2={k.cx + (r - 5) * Math.cos((turn * Math.PI) / 180)} y2={g - r + (r - 5) * Math.sin((turn * Math.PI) / 180)} stroke={c} strokeWidth={3} strokeLinecap="round" opacity={0.8} />
          <Text x={k.cx} y={k.top - 16} size={20} weight={700}>
            {label}
          </Text>
        </g>,
      );
    }
  }

  // Forces: an arrow from the body, as long as the force is large, with its name and size.
  const lift: Record<string, number> = {};
  const side: Record<string, number> = {};
  for (const f of state.forces) {
    const b = el.bodies.find((q) => q.id === f.on);
    if (!b || f.hidden || Math.abs(f.n) < 1e-9) continue;
    const k = box(b);
    const g = ground(b.lane ?? 0);
    const c = TONES[f.tone ?? (f.resist ? 'bad' : 'opp')];
    const grow = easeOut(f.age / 0.35);
    const len = Math.max(26, Math.abs(f.n) * fs) * grow * Math.sign(f.n);
    const text = `${f.name} ${short(Math.abs(f.n))} N`;
    if (f.axis === 'y') {
      // Weight hangs from the middle of the body; the normal force rises from its top.
      const y0 = f.n > 0 ? k.top - 2 : k.mid + BLOCK_H * 0.22;
      out.push(<Arrow key={`f-${f.on}-${f.name}`} x={k.cx} y={y0} len={len} axis="y" color={c} />);
      out.push(
        <Text key={`ft-${f.on}-${f.name}`} x={k.cx + 18} y={y0 - len + (f.n > 0 ? 12 : -12)} anchor="start" color={c} opacity={clamp01(grow * 1.5)}>
          {text}
        </Text>,
      );
      if (f.n > 0) lift[f.on] = Math.max(lift[f.on] ?? 0, Math.abs(len) + 10);
      continue;
    }
    // Friction acts where the body meets the track; other forces act at its middle. Two forces
    // on the same side of a body sit one above the other.
    const key = `${f.on}${Math.sign(f.n)}`;
    const nth = side[key] ?? 0;
    side[key] = nth + 1;
    const y = f.resist ? g - 12 : k.mid - nth * 32 - (b.shape === 'cart' ? WHEEL * 0.7 : 0);
    const x0 = f.n > 0 ? k.right + 3 : k.left - 3;
    out.push(<Arrow key={`f-${f.on}-${f.name}`} x={x0} y={y} len={len} color={c} />);
    out.push(
      <Text key={`ft-${f.on}-${f.name}`} x={x0 + len + (f.n > 0 ? 12 : -12)} y={y} anchor={f.n > 0 ? 'start' : 'end'} color={c} opacity={clamp01(grow * 1.5)}>
        {text}
      </Text>,
    );
  }

  // Two bodies close together on a track (coupled carts) take turns to have their labels higher.
  const raised: Record<string, number> = {};
  for (let lane = 0; lane < lanes.length; lane++) {
    const row = el.bodies.filter((b) => (b.lane ?? 0) === lane).sort((p1, p2) => state.bodies[p1.id].x - state.bodies[p2.id].x);
    row.forEach((b, i) => {
      const near = i > 0 && (state.bodies[b.id].x - state.bodies[row[i - 1].id].x) * S < 132;
      raised[b.id] = near && !raised[row[i - 1].id] ? 1 : 0;
    });
  }

  for (const b of el.bodies) {
    const s = state.bodies[b.id];
    const k = box(b);
    const g = ground(b.lane ?? 0);
    // Velocity: an arrow above the body, longer the faster it goes; the acceleration above that.
    let y = k.top - 24 - (lift[b.id] ?? 0) - (b.shape === 'ball' ? 28 : 0) - raised[b.id] * 54;
    if (vel > 0) {
      const moving = Math.abs(s.v) >= 0.05;
      if (moving) out.push(<Arrow key={`v-${b.id}`} x={k.cx} y={y} len={s.v * vs} color={VELOCITY} weight={6} opacity={vel} />);
      y -= moving ? 26 : 6;
      out.push(
        <Text key={`vt-${b.id}`} x={k.cx} y={y} color={VELOCITY} opacity={vel}>
          {moving ? `v = ${live(s.v)} m/s` : 'at rest'}
        </Text>,
      );
      y -= 30;
    }
    if (readout > 0) {
      out.push(
        <Text key={`a-${b.id}`} x={k.cx} y={y} color={INK2} size={19} opacity={readout}>
          {`a = ${live(s.a)} m/s²`}
        </Text>,
      );
    }
    // The net force, under the track: what is left when the forces along it are added.
    if (net > 0) {
      const sum = netForce(state.forces, b.id);
      out.push(
        <Text key={`nt-${b.id}`} x={k.cx} y={g + 64} color={NET} opacity={net}>
          {`Net force ${short(Math.abs(sum))} N`}
        </Text>,
      );
      if (Math.abs(sum) > 1e-9) out.push(<Arrow key={`n-${b.id}`} x={k.cx - (sum * fs) / 2} y={g + 92} len={sum * fs} color={NET} weight={8} opacity={net} />);
    }
  }

  // A collision: a flash where the bodies touch.
  if (state.contact && state.contact.age < 0.7) {
    const { x, age } = state.contact;
    const lane = el.bodies.find((b) => Math.abs(state.bodies[b.id].x - x) < widthOf(b))?.lane ?? 0;
    const y = ground(lane) - 34;
    const k = easeOut(age / 0.7);
    out.push(
      <g key="contact" opacity={1 - k}>
        <circle cx={X(x)} cy={y} r={8 + 46 * k} fill="none" stroke="#fff" strokeWidth={3} />
        {[20, 70, 110, 160, 200, 250, 290, 340].map((a) => (
          <line key={a} x1={X(x) + (14 + 20 * k) * Math.cos((a * Math.PI) / 180)} y1={y + (14 + 20 * k) * Math.sin((a * Math.PI) / 180)} x2={X(x) + (26 + 44 * k) * Math.cos((a * Math.PI) / 180)} y2={y + (26 + 44 * k) * Math.sin((a * Math.PI) / 180)} stroke={TONES.theta} strokeWidth={3} strokeLinecap="round" />
        ))}
      </g>,
    );
  }

  // The clock and the note of the phase ("Slow motion").
  if (clock > 0)
    out.push(
      <g key="clock" opacity={clock}>
        <rect x={w - 170} y={0} width={170} height={38} rx={19} fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.14)" />
        <Text x={w - 85} y={19.5} size={19} color={INK2}>
          {`t = ${state.time.toFixed(1)} s`}
        </Text>
      </g>,
    );
  if (state.note)
    out.push(
      <g key="note">
        <rect x={w / 2 - 120} y={0} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={19.5} size={19} color="#fff">
          {state.note}
        </Text>
      </g>,
    );

  // A velocity-time graph that draws itself as the bodies move, above the track on the right.
  if (graph > 0 && el.graph) {
    const gx0 = w * 0.47;
    const gx1 = w - 34;
    const gy0 = top + 44;
    const gy1 = ground(0) - BLOCK_H - 150;
    const { seconds, max } = el.graph;
    const gx = (t: number) => gx0 + (Math.min(t, seconds) / seconds) * (gx1 - gx0);
    const gy = (v: number) => gy1 - (Math.max(0, Math.min(v, max)) / max) * (gy1 - gy0);
    const vStep = max > 6 ? 2 : 1;
    out.push(
      <g key="graph" opacity={graph}>
        <rect x={gx0 - 64} y={gy0 - 30} width={gx1 - gx0 + 98} height={gy1 - gy0 + 82} rx={16} fill="rgb(255 255 255 / 0.045)" stroke="rgb(255 255 255 / 0.1)" />
        {Array.from({ length: Math.floor(max / vStep) + 1 }, (_, i) => i * vStep).map((v) => (
          <g key={`gv${v}`}>
            <line x1={gx0} y1={gy(v)} x2={gx1} y2={gy(v)} stroke={INK3} strokeWidth={1} opacity={v === 0 ? 0 : 0.28} />
            <text x={gx0 - 10} y={gy(v)} fill={INK3} fontSize={15} textAnchor="end" dominantBaseline="central" style={{ fontFamily: FONT }}>
              {v}
            </text>
          </g>
        ))}
        {Array.from({ length: Math.floor(seconds) + 1 }, (_, i) => i).map((t) => (
          <g key={`gt${t}`}>
            <line x1={gx(t)} y1={gy1} x2={gx(t)} y2={gy1 + 6} stroke={INK3} strokeWidth={1.5} />
            <text x={gx(t)} y={gy1 + 20} fill={INK3} fontSize={15} textAnchor="middle" style={{ fontFamily: FONT }}>
              {t}
            </text>
          </g>
        ))}
        <line x1={gx0} y1={gy0 - 8} x2={gx0} y2={gy1} stroke={INK2} strokeWidth={2} />
        <line x1={gx0} y1={gy1} x2={gx1 + 8} y2={gy1} stroke={INK2} strokeWidth={2} />
        <text x={gx0 - 46} y={(gy0 + gy1) / 2} fill={VELOCITY} fontSize={16} fontWeight={600} textAnchor="middle" transform={`rotate(-90 ${gx0 - 46} ${(gy0 + gy1) / 2})`} style={{ fontFamily: FONT }}>
          velocity (m/s)
        </text>
        <text x={(gx0 + gx1) / 2} y={gy1 + 40} fill={INK2} fontSize={16} fontWeight={600} textAnchor="middle" style={{ fontFamily: FONT }}>
          time (s)
        </text>
        {el.graph.of.map((id) => {
          const b = el.bodies.find((q) => q.id === id)!;
          const pts = state.trace[id];
          const last = pts[pts.length - 1];
          const c = el.graph!.of.length > 1 ? tone(b) : VELOCITY;
          return (
            <g key={id}>
              <polygon points={`${gx(0)},${gy1} ${pts.map(([t, v]) => `${gx(t)},${gy(v)}`).join(' ')} ${gx(last[0])},${gy1}`} fill={c} opacity={0.12} />
              <polyline points={pts.map(([t, v]) => `${gx(t)},${gy(v)}`).join(' ')} fill="none" stroke={c} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${c}88)` }} />
              <circle cx={gx(last[0])} cy={gy(last[1])} r={7} fill={c} stroke="#0d0c24" strokeWidth={2} />
            </g>
          );
        })}
      </g>,
    );
  }

  // Momentum bars: one for each body and one for the total, which a collision leaves unchanged.
  if (bars > 0 && el.momentumMax) {
    const y0 = h - barsH + 40;
    const x0 = 170;
    const full = w - x0 - 220;
    const rows = [
      ...el.bodies.map((b) => ({ name: b.label ?? b.id, p: b.mass * state.bodies[b.id].v, c: tone(b) })),
      { name: 'Total', p: el.bodies.reduce((n, b) => n + b.mass * state.bodies[b.id].v, 0), c: NET },
    ];
    out.push(
      <g key="bars" opacity={bars}>
        <text x={0} y={y0 - 16} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Momentum = mass × velocity
        </text>
        <line x1={x0} y1={y0} x2={x0} y2={y0 + (rows.length - (total > 0 ? 0 : 1)) * ROW - 6} stroke={INK3} strokeWidth={2} />
        {rows.map((r, i) => {
          const len = (Math.abs(r.p) / el.momentumMax!) * full;
          const y = y0 + i * ROW;
          const last = i === rows.length - 1;
          if (last && total <= 0) return null;
          return (
            <g key={r.name} opacity={last ? total : 1}>
              <Text x={x0 - 16} y={y + 18} anchor="end" color={last ? NET : INK}>
                {r.name}
              </Text>
              <rect x={x0} y={y + 2} width={full} height={32} rx={8} fill="rgb(255 255 255 / 0.05)" />
              <rect x={r.p < 0 ? x0 - len : x0} y={y + 2} width={Math.max(0, len)} height={32} rx={8} fill={r.c} fillOpacity={last ? 0.85 : 0.75} />
              <Text x={x0 + Math.max(len, 0) + 14} y={y + 18} anchor="start" color={r.c}>
                {`${live(r.p)} kg·m/s`}
              </Text>
            </g>
          );
        })}
      </g>,
    );
  }

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
