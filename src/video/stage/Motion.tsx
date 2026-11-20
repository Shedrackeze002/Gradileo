/**
 * Motion for the physics videos: blocks, carts and balls on straight tracks, moved by the forces
 * drawn on them (src/video/motion.ts works the motion out). Force arrows grow from each body, a
 * velocity arrow rides above it, strobe marks show where it was at equal time steps, and momentum
 * bars change as it moves.
 */
import type { ReactElement } from 'react';
import type { MotionBody, MotionEl } from '../script.ts';
import { amplitudeOf, displacementOf, motionAt, netForce, oscillations, SPRING, widthOf, type MotionState } from '../motion.ts';
import { easeOut, ownPart, type ElState } from '../timeline.ts';
import { Count, labelCase, offset, offsetStep, Arrow, BODY_TONES, clamp01, Clock, ENERGY_ROW, EnergyBars, energyRows, FONT, INK2, live, NET, short, speedText, Text, VELOCITY } from './motionKit.tsx';
import { ForceGraph, niceStep } from './ForceGraph.tsx';
import { PathView } from './MotionPath.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** Displacement is violet, and the path travelled a pale grey, in every physics video. */
const DISPLACEMENT = TONES.brand;
/** A changing number with its sign always written ("+5.0", "−3.0"), for a vector along the track. */
const signed = (n: number) => (Math.abs(n) < 0.05 ? '0.0' : `${n > 0 ? '+' : '−'}${Math.abs(n).toFixed(1)}`);
/** The step between the numbers on a graph's axis that reaches `max`. */
/** Past 120 (a jet car's 2,000 m) it grows with the axis, so that the numbers stay a few to a side. */
const axisStep = (max: number) => (max <= 6 ? 1 : max <= 12 ? 2 : max <= 30 ? 5 : max <= 60 ? 10 : max <= 120 ? 20 : niceStep(max));

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

/** The area between a line of [x, y] points and the x axis. */
const areaOf = (pts: Array<[number, number]>) => pts.reduce((n, [x, y], i) => (i ? n + ((y + pts[i - 1][1]) / 2) * (x - pts[i - 1][0]) : 0), 0);

/**
 * A graph against time that draws itself as the bodies move: their velocity, the distance travelled, or their position on the track.
 * With `y: 'impulse'` it is the force on one body against time: the area under it is the impulse so far, written over the graph.
 */
function Graph({ el, state, opacity, box, tone }: { el: MotionEl; state: MotionState; opacity: number; box: [gx0: number, gy0: number, gx1: number, gy1: number]; tone: (b: MotionBody) => string }) {
  if (!el.graph) return null;
  const [gx0, gy0, gx1, gy1] = box;
  const what = el.graph.y ?? 'velocity';
  const push = what === 'impulse';
  const far = what !== 'velocity' && !push;
  const swing = what === 'displacement';
  const unit = swing && el.cm ? 100 : 1;
  const series: MotionState['trace'] =
    push ? Object.fromEntries(el.graph.of.map((id) => [id, state.push[id]?.length ? state.push[id] : [[0, 0] as [number, number]]])) : what === 'distance' ? state.path : what === 'position' ? state.place : swing ? Object.fromEntries(Object.entries(state.place).map(([id, pts]) => [id, pts.map(([t, x]): [number, number] => [t, displacementOf(el, x) * unit])])) : state.trace;
  const { seconds, max } = el.graph;
  const min = Math.min(0, el.graph.min ?? 0);
  const gx = (t: number) => gx0 + (Math.min(t, seconds) / seconds) * (gx1 - gx0);
  const gy = (v: number) => gy1 - ((Math.max(min, Math.min(v, max)) - min) / (max - min)) * (gy1 - gy0);
  const range = max - min;
  // A displacement may be a few hundredths of a metre, and an oscillation takes a second or less.
  const vStep = push ? niceStep(range) : swing ? ([0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20].find((n) => range / n <= 6) ?? 50) : far || range > 12 ? axisStep(range) : range > 6 ? 2 : 1;
  // A collision's time axis is numbered in milliseconds.
  const ms = el.graph.ms ? 1000 : 1;
  const tStep = el.graph.ms ? niceStep(seconds * 1000) / 1000 : seconds > 12 ? axisStep(seconds) : swing && seconds <= 1.5 ? 0.25 : swing && seconds <= 4 ? 0.5 : 1;
  const values: number[] = [];
  for (let v = Math.ceil(min / vStep - 1e-9) * vStep; v <= max + 1e-9; v += vStep) values.push(Math.round(v * 1e6) / 1e6 + 0);
  return (
    <g opacity={opacity}>
      <rect x={gx0 - 64} y={gy0 - 30} width={gx1 - gx0 + 98} height={gy1 - gy0 + 82} rx={16} fill="rgb(255 255 255 / 0.045)" stroke="rgb(255 255 255 / 0.1)" />
      {values.map((v) => (
        <g key={`gv${v}`}>
          <line x1={gx0} y1={gy(v)} x2={gx1} y2={gy(v)} stroke={INK3} strokeWidth={1} opacity={v === 0 ? 0 : 0.28} />
          <text x={gx0 - 10} y={gy(v)} fill={INK3} fontSize={15} textAnchor="end" dominantBaseline="central" style={{ fontFamily: FONT }}>
            {String(v).replace('-', '−')}
          </text>
        </g>
      ))}
      {Array.from({ length: Math.floor(seconds / tStep + 1e-9) + 1 }, (_, i) => Math.round(i * tStep * 1e5) / 1e5).map((t) => (
        <g key={`gt${t}`}>
          <line x1={gx(t)} y1={gy1} x2={gx(t)} y2={gy1 + 6} stroke={INK3} strokeWidth={1.5} />
          <text x={gx(t)} y={gy1 + 20} fill={INK3} fontSize={15} textAnchor="middle" style={{ fontFamily: FONT }}>
            {Math.round(t * ms * 100) / 100}
          </text>
        </g>
      ))}
      <line x1={gx0} y1={gy0 - 8} x2={gx0} y2={gy1} stroke={INK2} strokeWidth={2} />
      {/* The time axis is the line of zero; its numbers stay along the bottom of the graph. */}
      <line x1={gx0} y1={gy(0)} x2={gx1 + 8} y2={gy(0)} stroke={INK2} strokeWidth={2} />
      {min < 0 && <line x1={gx0} y1={gy1} x2={gx1} y2={gy1} stroke={INK3} strokeWidth={1} opacity={0.28} />}
      <text x={gx0 - 46} y={(gy0 + gy1) / 2} fill={push ? TONES.opp : far ? INK : VELOCITY} fontSize={16} fontWeight={600} textAnchor="middle" transform={`rotate(-90 ${gx0 - 46} ${(gy0 + gy1) / 2})`} style={{ fontFamily: FONT }}>
        {push ? 'force (N)' : what === 'distance' ? 'distance (m)' : what === 'position' ? 'position (m)' : swing ? `displacement (${el.cm ? 'cm' : 'm'})` : el.speedWord ? 'speed (m/s)' : 'velocity (m/s)'}
      </text>
      <text x={(gx0 + gx1) / 2} y={gy1 + 40} fill={INK2} fontSize={16} fontWeight={600} textAnchor="middle" style={{ fontFamily: FONT }}>
        {el.graph.ms ? 'time (ms)' : 'time (s)'}
      </text>
      {el.graph.of.map((id) => {
        const b = el.bodies.find((q) => q.id === id)!;
        const pts = series[id];
        const last = pts[pts.length - 1];
        const c = push ? TONES.opp : el.graph!.of.length > 1 ? tone(b) : far ? TONES.theta : VELOCITY;
        return (
          <g key={id}>
            {!far && <polygon points={`${gx(pts[0][0])},${gy(0)} ${pts.map(([t, v]) => `${gx(t)},${gy(v)}`).join(' ')} ${gx(last[0])},${gy(0)}`} fill={c} opacity={push ? 0.32 : 0.12} />}
            <polyline points={pts.map(([t, v]) => `${gx(t)},${gy(v)}`).join(' ')} fill="none" stroke={c} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${c}88)` }} />
            <circle cx={gx(last[0])} cy={gy(last[1])} r={7} fill={c} stroke="#0d0c24" strokeWidth={2} />
            {push && (
              <text x={gx1} y={gy0 - 8} fill={INK} fontSize={19} fontWeight={700} textAnchor="end" style={{ fontFamily: FONT }}>
                {`${el.graph!.area ?? 'Impulse'} = area = ${areaOf(pts).toFixed(1).replace('-', '−')} N·s`}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

/**
 * A drop: the same bodies, forces and clips, with the track turned to point down the screen. A
 * body's `x` is the distance it has fallen, so weight (a positive force) is drawn downwards and
 * air resistance upwards. Each lane is a column with a ruler of the distance fallen at its left
 * and the ground at its foot; a graph or energy bars, when there are any, take the right half.
 * A lift (`vertical: 'up'`) is the same picture with `x` the height above the ground.
 */
function FallView({ el, st, w, h, state }: { el: MotionEl; st: ElState | undefined; w: number; h: number; state: MotionState }) {
  const p = st?.p ?? 0;
  const part = (name: string) => ownPart(st, name);
  const vel = part('velocity');
  const readout = part('readout');
  const net = part('net');
  const clock = part('clock');
  const strobe = part('strobe');
  const graph = part('graph');
  const energy = part('energy');
  const total = part('total');
  // In a lift, `x` is the height above the ground: up the screen is positive.
  const up = el.vertical === 'up';
  const lanes = el.lanes ?? [{}];
  const tone = (b: MotionBody) => TONES[b.tone ?? BODY_TONES[el.bodies.indexOf(b) % BODY_TONES.length]];
  const fs = el.forceScale ?? 4;
  const vs = el.velocityScale ?? 8;
  const top = 58;
  const foot = 26;
  const BIG = 40;
  const beside = Boolean(el.graph ?? el.energy);
  const heights = !up && Boolean(el.energy?.bars.includes('potential'));
  const cw = (beside ? w * 0.5 : w) / lanes.length;
  const S = (h - top - foot - 2 * BIG) / (el.span[1] - el.span[0]);
  // Where the foot of a body is when it has fallen `m` metres (or, in a lift, when it is `m` metres
  // up): every body lands on the same ground.
  const ground = top + 2 * BIG + (el.span[1] - el.span[0]) * S;
  const Y = (m: number) => (up ? ground - (m - el.span[0]) * S : top + 2 * BIG + (m - el.span[0]) * S);
  const R = (b: MotionBody) => Math.max(24, Math.min(BIG, (widthOf(b) * S) / 2));
  // The note of a phase sits between the columns, or over the graph when there is one; in a narrow
  // picture it moves left to clear the clock. A narrow picture of one column has its support in
  // the way there, so the note goes under the clock (and under the count of the oscillations).
  const tucked = !beside && lanes.length === 1 && clock > 0 && w - 302 < w / 2;
  const noteX = tucked ? w - 120 : Math.min(beside ? w * 0.5 + 150 : w / 2, clock > 0 ? w - 302 : w);
  const noteY = tucked ? (part('count') > 0 ? 92 : 46) : 0;
  const out: ReactElement[] = [];

  lanes.forEach((lane, li) => {
    const x0 = cw * li;
    const rx = x0 + 46;
    out.push(
      <g key={`col${li}`}>
        <rect x={rx - 7} y={ground} width={cw - 53} height={9} rx={3} fill="rgb(77 163 255 / 0.2)" />
        <line x1={rx - 7} y1={ground} x2={x0 + cw - 14} y2={ground} stroke="#bcd9ff" strokeWidth={3} strokeLinecap="round" />
        <line x1={rx} y1={ground - (el.span[1] - el.span[0]) * S} x2={rx} y2={ground} stroke={INK3} strokeWidth={1.5} opacity={0.7} />
        {lane.label && (
          <text x={x0 + cw / 2} y={14} textAnchor="middle" fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: labelCase(lane.label) }}>
            {lane.label}
          </text>
        )}
      </g>,
    );
    // An oscillation is read from its equilibrium position: the ruler counts up and down from there.
    if (el.equilibrium !== undefined) {
      const u = offsetStep(S, 30);
      for (let i = Math.ceil((el.span[0] - el.equilibrium) / u - 1e-9); el.equilibrium + i * u <= el.span[1] + 1e-9; i++) {
        const y = Y(el.equilibrium + i * u);
        out.push(<line key={`tick${li}-${i}`} x1={rx - 7} y1={y} x2={rx} y2={y} stroke={INK3} strokeWidth={1.5} opacity={0.7} />);
        out.push(
          <text key={`num${li}-${i}`} x={rx - 12} y={y} fill={INK3} fontSize={15} textAnchor="end" dominantBaseline="central" style={{ fontFamily: FONT }}>
            {i === 0 ? '0' : `${i < 0 ? '+' : '−'}${Math.round(Math.abs(i) * u * (el.cm ? 100 : 1) * 100) / 100}`}
          </text>,
        );
      }
      out.push(
        <text key={`unit${li}`} x={rx - 12} y={Y(el.span[0]) - 22} fill={INK3} fontSize={15} textAnchor="end" style={{ fontFamily: FONT }}>
          {el.cm ? 'cm' : 'm'}
        </text>,
      );
      return;
    }
    // A drop of two metres or less (a mass hung from a spring) is marked in parts of a metre.
    const every = [...(el.span[1] - el.span[0] <= 2 ? [0.05, 0.1, 0.2] : []), 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500].find((n) => n * S >= 34) ?? 1000;
    for (let i = Math.ceil(el.span[0] / every - 1e-9); i * every <= el.span[1] + 1e-9; i++) {
      const m = Math.round(i * every * 1000) / 1000;
      // A drop with a bar for potential energy is read by height, so its ruler counts up from the ground.
      const at = heights ? el.span[1] - m : m;
      out.push(<line key={`tick${li}-${m}`} x1={rx - 7} y1={Y(at)} x2={rx} y2={Y(at)} stroke={INK3} strokeWidth={1.5} opacity={0.7} />);
      out.push(
        <text key={`num${li}-${m}`} x={rx - 12} y={Y(at)} fill={INK3} fontSize={15} textAnchor="end" dominantBaseline="central" style={{ fontFamily: FONT }}>
          {m + every > el.span[1] + 1e-9 ? `${m} m` : m}
        </text>,
      );
    }
  });

  // A spring that hangs from a beam over the drop, with the body on its end.
  const sprung = el.spring ? el.bodies.find((b) => b.id === el.spring!.on) : undefined;
  if (el.spring && sprung) {
    const cx = cw * (sprung.lane ?? 0) + cw / 2;
    const beam = top - 14;
    const end = Y(state.bodies[sprung.id].x) - 2 * R(sprung);
    const turns = 10;
    const [lead, amp] = [10, 12];
    const run = Math.max(4, end - beam - 2 * lead);
    const zig = Array.from({ length: 2 * turns + 1 }, (_, i) => `${cx + (i === 0 || i === 2 * turns ? 0 : i % 2 ? -amp : amp)},${beam + lead + (run * i) / (2 * turns)}`);
    out.push(
      <g key="spring">
        <rect x={cx - 90} y={beam - 14} width={180} height={14} rx={3} fill="rgb(188 217 255 / 0.22)" stroke="#bcd9ff" strokeWidth={2} />
        <polyline points={`${cx},${beam} ${zig.join(' ')} ${cx},${end}`} fill="none" stroke="#d9d4ff" strokeWidth={3.2} strokeLinejoin="round" strokeLinecap="round" />
      </g>,
    );
  }

  for (const b of el.bodies) {
    const li = b.lane ?? 0;
    const c = tone(b);
    const s = state.bodies[b.id];
    const r = R(b);
    const cx = cw * li + cw / 2;
    const rx = cw * li + 46;
    const cy = Y(s.x) - r;
    const mine = state.forces.filter((f) => f.on === b.id && f.axis !== 'y' && !f.hidden && Math.abs(f.n) > 1e-9);
    const shape = (y: number, key: string, ghost: boolean) =>
      b.shape === 'ball' ? (
        <circle key={key} cx={cx} cy={y} r={r - 1.5} fill={ghost ? c : '#1b1846'} fillOpacity={ghost ? 0.05 : 1} stroke={c} strokeOpacity={ghost ? 0.4 : 1} strokeWidth={ghost ? 1.5 : 3} strokeDasharray={ghost ? '5 5' : undefined} />
      ) : (
        <rect key={key} x={cx - r + 1.5} y={y - r + 1.5} width={2 * r - 3} height={2 * r - 3} rx={10} fill={ghost ? c : '#1b1846'} fillOpacity={ghost ? 0.05 : 1} stroke={c} strokeOpacity={ghost ? 0.4 : 1} strokeWidth={ghost ? 1.5 : 3} strokeDasharray={ghost ? '5 5' : undefined} />
      );

    // Strobe marks: where the body was at equal time steps, and a dot on the ruler for each.
    if (strobe > 0) {
      let drawn = Number.NEGATIVE_INFINITY;
      state.marks[b.id].forEach((m, i) => {
        const y = Y(m) - r;
        const outline = Math.abs(y - cy) >= r * 1.9 && Math.abs(y - drawn) >= r * 1.1;
        if (outline) drawn = y;
        out.push(
          <g key={`mark-${b.id}-${i}`} opacity={strobe}>
            {outline && shape(y, 'o', true)}
            <circle cx={rx} cy={Y(m)} r={4.5} fill={c} />
          </g>,
        );
      });
    }

    // Speed lines above a falling body, unless air resistance has its arrow there.
    if (Math.abs(s.v) >= 0.3 && !mine.some((f) => Math.sign(f.n) === -Math.sign(s.v))) {
      const dir = Math.sign(s.v) * (up ? -1 : 1);
      const len = Math.min(80, Math.abs(s.v) * 9);
      [0.2, 0.5, 0.8].forEach((f, i) => {
        const ph = (state.time * 2.6 + i * 0.37) % 1;
        const x = cx - r + 2 * r * f;
        const back = cy - dir * (r + 8);
        out.push(<line key={`streak-${b.id}-${i}`} x1={x} y1={back - dir * ph * 14} x2={x} y2={back - dir * (ph * 14 + len * (0.55 + (0.45 * ((i * 7) % 3)) / 2))} stroke={c} strokeWidth={3} strokeLinecap="round" opacity={0.5 * (1 - ph * 0.6) * clamp01(Math.abs(s.v) / 1.5)} />);
      });
    }

    const f = st?.focus[b.id] ?? 0;
    out.push(
      <g key={b.id} style={f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${c})` } : undefined}>
        {shape(cy, 'b', false)}
        {b.shape === 'ball' ? <circle cx={cx} cy={cy} r={r - 1.5} fill={c} fillOpacity={0.3} /> : <rect x={cx - r + 1.5} y={cy - r + 1.5} width={2 * r - 3} height={2 * r - 3} rx={10} fill={c} fillOpacity={0.3} />}
        <Text x={cx} y={cy} size={Math.min(22, r * 0.62)} weight={700}>
          {b.label ?? `${short(b.mass)} kg`}
        </Text>
      </g>,
    );

    // Forces: weight hangs below the body, and what resists the fall rises from its top, so two
    // balanced forces are two arrows of one length. Hundreds of newtons are written whole.
    const whole = mine.some((force) => Math.abs(force.n) >= 100);
    const newtons = (n: number) => (whole ? String(Math.round(n) + 0) : live(n));
    const downward = (force: (typeof mine)[number]) => (up ? force.n < 0 : force.n > 0);
    for (const force of mine) {
      const size = Math.abs(force.n);
      const fc = TONES[force.tone ?? (force.drag || force.resist ? 'bad' : 'hyp')];
      // The force of a spring grows from nothing with its extension, as air resistance does with speed.
      const coil = force.name === SPRING;
      if (coil && size * fs < 3) continue;
      const grow = force.drag || coil ? 1 : easeOut(force.age / 0.35);
      const len = (force.drag || coil ? size * fs : Math.max(12, size * fs)) * grow;
      const down = downward(force);
      const y0 = down ? cy + r + 2 : cy - r - 3;
      const mid = Math.max(14, len / 2);
      // Two forces the same way (weight and friction on a load being lifted) stand side by side,
      // the first with its name on its left.
      const same = mine.filter((other) => downward(other) === down);
      const place = same.indexOf(force);
      // The pull of a spring would lie along its coil: its arrow stands just to the right of it.
      const fx = cx + (same.length > 1 ? (place - (same.length - 1) / 2) * Math.max(30, 0.9 * r) : coil && !down ? Math.min(28, r - 10) : 0);
      const left = same.length > 1 && place === 0;
      out.push(<Arrow key={`f-${b.id}-${force.name}`} x={fx} y={y0} len={down ? -len : len} axis="y" color={fc} />);
      out.push(
        <Text key={`ft-${b.id}-${force.name}`} x={fx + (left ? -18 : 18)} y={down ? y0 + mid : y0 - mid} anchor={left ? 'end' : 'start'} color={fc} opacity={force.drag || coil ? clamp01(len / 10) : clamp01(grow * 1.5)}>
          {`${force.name} ${force.drag || coil ? newtons(size) : size >= 999.5 ? Math.round(size) : short(size)} N`}
        </Text>,
      );
    }

    // To the left of the body: its velocity (with an arrow), its acceleration and the net force.
    const moving = Math.abs(s.v) >= 0.05;
    const rows: Array<[text: string, color: string, opacity: number]> = [];
    if (vel > 0) rows.push([moving ? (el.speedWord ? `speed = ${live(Math.abs(s.v))} m/s` : `v = ${live(s.v)} m/s`) : 'at rest', VELOCITY, vel]);
    if (readout > 0) rows.push([`a = ${live(s.a)} m/s²`, INK2, readout]);
    if (net > 0) rows.push([`Net force ${newtons(Math.abs(netForce(state.forces, b.id)))} N`, NET, net]);
    // The velocity arrow starts level with the end of the body it is leaving.
    const rise = (up ? 1 : -1) * s.v;
    if (vel > 0 && moving) out.push(<Arrow key={`v-${b.id}`} x={cx - r - 20} y={rise > 0 ? cy + r : cy - r} len={rise * vs} axis="y" color={VELOCITY} weight={6} opacity={vel} />);
    rows.forEach(([text, color, opacity], i) => {
      out.push(
        <Text key={`row-${b.id}-${i}`} x={cx - r - 38} y={cy + (i - (rows.length - 1) / 2) * 30} anchor="end" color={color} size={i === 0 && vel > 0 ? 21 : 19} opacity={opacity}>
          {text}
        </Text>,
      );
    });
  }

  // The extension of a hanging spring: from where the foot of the body is at the spring's natural length to where it is now.
  const extension = part('extension');
  if (extension > 0 && el.spring && sprung) {
    const cx = cw * (sprung.lane ?? 0) + cw / 2;
    const r = R(sprung);
    const [from, to] = [Y(el.spring.rest), Y(state.bodies[sprung.id].x)];
    const x = state.bodies[sprung.id].x - el.spring.rest;
    const ax = cx - r - 30;
    out.push(
      <g key="extension" opacity={extension}>
        <line x1={cw * (sprung.lane ?? 0) + 52} y1={from} x2={cx + r + 16} y2={from} stroke={DISPLACEMENT} strokeWidth={2} strokeDasharray="6 6" opacity={0.8} />
        <Text x={ax + 12} y={from - 16} anchor="end" color={DISPLACEMENT} size={18}>
          natural length
        </Text>
        {Math.abs(to - from) >= 2 && <Arrow x={ax} y={from} len={from - to} axis="y" color={DISPLACEMENT} weight={6} />}
        {Math.abs(to - from) >= 2 && (
          <Text x={ax - 16} y={Math.max((from + to) / 2, from + 28)} anchor="end" color={DISPLACEMENT}>
            {`x = ${Math.abs(x).toFixed(el.spring.decimals ?? 2)} m${x < -1e-9 ? ' (compressed)' : ''}`}
          </Text>
        )}
      </g>,
    );
  }

  // An oscillation: the two extremes of the motion, and the displacement from the equilibrium
  // position to where the foot of the body is now (upwards is positive).
  const swinger = el.equilibrium !== undefined ? (sprung ?? el.bodies[0]) : undefined;
  if (swinger && el.equilibrium !== undefined) {
    const zero = el.equilibrium;
    const cx = cw * (swinger.lane ?? 0) + cw / 2;
    const r = R(swinger);
    const x0 = cw * (swinger.lane ?? 0) + 52;
    const amplitude = part('amplitude');
    const displacement = part('displacement');
    if (amplitude > 0) {
      const A = amplitudeOf(el, state, swinger.id);
      const ax = cx + r + 34;
      out.push(
        <g key="amplitude" opacity={amplitude}>
          <line x1={x0} y1={Y(zero)} x2={ax + 14} y2={Y(zero)} stroke={INK2} strokeWidth={2} strokeDasharray="6 6" opacity={0.85} />
          <Text x={x0 + 4} y={Y(zero) - 14} anchor="start" color={INK2} size={17}>
            equilibrium
          </Text>
          {A * S >= 6 &&
            [-1, 1].map((k) => <line key={k} x1={x0} y1={Y(zero + k * A)} x2={ax + 14} y2={Y(zero + k * A)} stroke={DISPLACEMENT} strokeWidth={2} strokeDasharray="3 7" opacity={0.75} />)}
          {A * S >= 6 && <Arrow x={ax} y={Y(zero)} len={A * S} axis="y" color={DISPLACEMENT} weight={5} />}
          {A * S >= 6 && (
            <Text x={ax + 14} y={Y(zero - A / 2)} anchor="start" color={DISPLACEMENT} size={19}>
              {`A = ${offset(A, el.cm, false)}`}
            </Text>
          )}
        </g>,
      );
    }
    if (displacement > 0) {
      const here = state.bodies[swinger.id].x;
      const [from, to] = [Y(zero), Y(here)];
      const ax = cx - r - 30;
      out.push(
        <g key="displacement" opacity={displacement}>
          {Math.abs(to - from) >= 2 && <Arrow x={ax} y={from} len={from - to} axis="y" color={DISPLACEMENT} weight={6} />}
          <Text x={ax - 16} y={(from + to) / 2} anchor="end" color={DISPLACEMENT}>
            {`x = ${offset(displacementOf(el, here), el.cm)}`}
          </Text>
        </g>,
      );
    }
  }
  const count = part('count');
  if (count > 0) out.push(<Count key="count" n={oscillations(state, (sprung ?? el.bodies[0]).id)} opacity={count} under={beside ? w * 0.5 : w} />);

  if (graph > 0 && el.graph) out.push(<Graph key="graph" el={el} state={state} opacity={graph} box={[w * 0.5 + 100, 88, w - 34, h - 78]} tone={tone} />);
  // Energy bars take the right half when there is no graph, level with the middle of the fall.
  else if (el.energy && (energy > 0 || total > 0)) {
    const rowsH = energyRows(el) * 62;
    out.push(<EnergyBars key="energy" el={el} state={state} x={w * 0.5 + 40} y={Math.max(top, (top + ground - rowsH) / 2)} w={w * 0.5 - 40} opacity={energy} total={total} stacked />);
  }
  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time} opacity={clock} decimals={el.clockDecimals} />);
  if (state.note)
    out.push(
      <g key="note">
        <rect x={noteX - noteW(state.note) / 2} y={noteY} width={noteW(state.note)} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={noteX} y={noteY + 19.5} size={19} color="#fff">
          {state.note}
        </Text>
      </g>,
    );

  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}

/** How wide a phase's note pill is: 240 px, or wider for a long note. */
const noteW = (note: string) => Math.max(240, 10.5 * note.length + 44);

export function MotionView({ el, st, w, h, plays }: { el: MotionEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state: MotionState = motionAt(el, plays ?? st?.plays ?? []);
  if (el.path) return <PathView el={el} st={st} w={w} h={h} state={state} />;
  if (el.vertical) return <FallView el={el} st={st} w={w} h={h} state={state} />;
  const part = (name: string) => ownPart(st, name);
  const energy = part('energy');
  const vel = part('velocity');
  const readout = part('readout');
  const net = part('net');
  const bars = part('bars');
  const total = part('total');
  const clock = part('clock');
  const strobe = part('strobe');
  const graph = part('graph');
  const distance = part('distance');
  const displacement = part('displacement');
  const extension = part('extension');

  const lanes = el.lanes ?? [{}];
  const tone = (b: MotionBody) => TONES[b.tone ?? BODY_TONES[el.bodies.indexOf(b) % BODY_TONES.length]];
  const fs = el.forceScale ?? 4;
  const vs = el.velocityScale ?? 24;

  // The bars keep their room from the start, so the tracks do not jump when they appear.
  const barBodies = el.bodies.filter((b) => !b.fixed);
  const barRows = el.momentumMax ? barBodies.length + (el.momentumTotal === false ? 0 : 1) : 0;
  const ROW = 44;
  const barsH = barRows ? barRows * ROW + 50 : energyRows(el) ? energyRows(el) * ENERGY_ROW + 24 : 0;
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
    const height = b.fixed ? BLOCK_H * 1.3 : b.shape === 'block' ? BLOCK_H : b.shape === 'cart' ? CART_H + WHEEL + 4 : half * 2;
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
          <text x={lane.labelSide === 'right' ? w - PAD + 10 : PAD - 10} y={top + laneH * li + 14} textAnchor={lane.labelSide === 'right' ? 'end' : 'start'} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: labelCase(lane.label) }}>
            {lane.label}
          </text>
        )}
      </g>,
    );
    // An oscillation is read from its equilibrium position: the ruler counts both ways from there.
    if (el.equilibrium !== undefined && !el.plain) {
      const u = offsetStep(S, 58);
      const last = Math.floor((el.span[1] - el.equilibrium) / u + 1e-9);
      for (let i = Math.ceil((el.span[0] - el.equilibrium) / u - 1e-9); i <= last; i++) {
        const x = X(el.equilibrium + i * u);
        out.push(<line key={`tick${li}-${i}`} x1={x} y1={g + (rough ? 12 : 9)} x2={x} y2={g + 22} stroke={INK3} strokeWidth={1.5} opacity={0.7} />);
        out.push(
          <text key={`num${li}-${i}`} x={x} y={g + 36} fill={INK3} fontSize={16} textAnchor="middle" style={{ fontFamily: FONT }}>
            {`${i === 0 ? '0' : `${i > 0 ? '+' : '−'}${Math.round(Math.abs(i) * u * (el.cm ? 100 : 1) * 100) / 100}`}${i === last ? (el.cm ? ' cm' : ' m') : ''}`}
          </text>,
        );
      }
      return;
    }
    // A track of two metres or less (a spring on a bench) is marked in tenths of a metre.
    // A very long one (a jog of kilometres) is marked every 10, 100 or 1,000 metres instead, so
    // that the marks stay at least 4 pixels apart.
    let tick = el.span[1] - el.span[0] <= 2 ? 0.1 : 1;
    while (S * tick < 4) tick *= 10;
    const gap = S * tick;
    // A long road is numbered every ten or twenty metres, so that the numbers do not run together.
    let every = gap >= 46 ? 1 : gap >= 24 ? 2 : gap >= 8 ? 5 : gap >= 4 ? 10 : 20;
    // Numbers of four figures or more (a drive of 2 or 10 km) need wider gaps, or they run together.
    const figures = String(Math.round(Math.max(Math.abs(el.span[0]), Math.abs(el.span[1])))).length;
    const STEPS = [1, 2, 5, 10, 20, 50, 100];
    if (figures >= 4) while (gap * every < figures * 10 + 22 && every < 100) every = STEPS[STEPS.indexOf(every) + 1];
    const lastMajor = Math.floor(el.span[1] / tick / every + 1e-9) * every;
    for (let i = Math.ceil(el.span[0] / tick - 1e-9); !el.plain && i <= Math.floor(el.span[1] / tick + 1e-9); i++) {
      const m = Math.round(i * tick * 10) / 10;
      const major = i % every === 0;
      out.push(<line key={`tick${li}-${i}`} x1={X(m)} y1={g + (rough ? 12 : 9)} x2={X(m)} y2={g + (major ? 22 : 16)} stroke={INK3} strokeWidth={1.5} opacity={0.7} />);
      if (major)
        out.push(
          <text key={`num${li}-${i}`} x={X(m)} y={g + 36} fill={INK3} fontSize={16} textAnchor="middle" style={{ fontFamily: FONT }}>
            {`${tick < 1 ? m.toFixed(1) : m}${i === lastMajor ? ' m' : ''}`}
          </text>,
        );
    }
  });

  // A spring: a wall at the left end of the track, and a coil from it to the body (or, for a
  // spring that only pushes, to a plate that stays at its natural length once the body has left).
  const sprung = el.spring ? el.bodies.find((b) => b.id === el.spring!.on) : undefined;
  const coilY = (b: MotionBody) => ground(b.lane ?? 0) - (b.shape === 'cart' ? WHEEL + 4 + CART_H / 2 - 8 : b.shape === 'ball' ? (widthOf(b) * S) / 2 : BLOCK_H * 0.3);
  if (el.spring && sprung) {
    const g = ground(sprung.lane ?? 0);
    const y = coilY(sprung);
    const here = state.bodies[sprung.id].x;
    const end = X(el.spring.loose ? Math.min(here, el.spring.rest) : here) - (widthOf(sprung) * S) / 2;
    const wall = X(el.span[0]);
    const turns = 12;
    const [lead, amp] = [12, 11];
    const run = Math.max(4, end - wall - 2 * lead);
    const zig = Array.from({ length: 2 * turns + 1 }, (_, i) => `${wall + lead + (run * i) / (2 * turns)},${y + (i === 0 || i === 2 * turns ? 0 : i % 2 ? -amp : amp)}`);
    out.push(
      <g key="spring">
        <rect x={wall - 16} y={g - BLOCK_H * 1.25} width={16} height={BLOCK_H * 1.25} rx={3} fill="rgb(188 217 255 / 0.22)" stroke="#bcd9ff" strokeWidth={2} />
        <polyline points={`${wall},${y} ${zig.join(' ')} ${end},${y}`} fill="none" stroke="#d9d4ff" strokeWidth={3.2} strokeLinejoin="round" strokeLinecap="round" />
        {el.spring.loose && <rect x={end - 5} y={y - 20} width={5} height={40} rx={2} fill="#d9d4ff" />}
      </g>,
    );
  }

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
    if (b.fixed) {
      // A wall: a tall slab with slanted hatching, the mark of something that does not move.
      const wide = k.right - k.left;
      const tall = g - k.top;
      const marks = Math.floor(tall / 22);
      out.push(
        <g key={b.id} style={glow}>
          <rect x={k.left} y={k.top} width={wide} height={tall} rx={5} fill="#1b1846" />
          <rect x={k.left} y={k.top} width={wide} height={tall} rx={5} fill={c} fillOpacity={0.22} stroke={c} strokeWidth={3} />
          {Array.from({ length: marks }, (_, i) => (
            <line key={i} x1={k.left + 5} y1={k.top + 26 + i * 22} x2={k.right - 5} y2={k.top + 8 + i * 22} stroke={c} strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />
          ))}
          <Text x={k.cx} y={k.top - 18} size={20} weight={700}>
            {label}
          </Text>
        </g>,
      );
    } else if (b.shape === 'block') {
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
      // On a bench of two metres or less the bumpers keep to a share of the cart, so that it still has a body.
      const bump = el.span[1] - el.span[0] <= 2 ? Math.min(BUMPER * S, 0.15 * (k.right - k.left)) : BUMPER * S;
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
          {!el.plain && <line x1={k.cx} y1={g - r} x2={k.cx + (r - 5) * Math.cos((turn * Math.PI) / 180)} y2={g - r + (r - 5) * Math.sin((turn * Math.PI) / 180)} stroke={c} strokeWidth={3} strokeLinecap="round" opacity={0.8} />}
          <Text x={k.cx} y={el.plain ? g - r + 1 : k.top - 16} size={el.plain ? Math.min(34, r * 1.2) : 20} weight={700}>
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
    // A spring's force, or one that changes with distance, shrinks all the way to nothing: its arrow has no shortest length.
    const changing = f.name === SPRING || Boolean(f.profile) || f.to !== undefined;
    if (changing && Math.abs(f.n) * fs < 3) continue;
    const len = (changing ? Math.abs(f.n) * fs : Math.max(26, Math.abs(f.n) * fs)) * grow * Math.sign(f.n);
    const text = el.plain ? f.name : `${f.name} ${short(Math.abs(f.n))} N`;
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
    // A force towards the wall (the spring's pull, or a hand that holds the spring compressed) would
    // lie along the coil: its arrow is drawn just above the coil instead.
    const overCoil = sprung === b && f.n < 0;
    const y = f.resist ? g - 12 : overCoil ? coilY(b) - 34 - nth * 32 : k.mid - nth * 32 - (b.shape === 'cart' ? WHEEL * 0.7 : 0);
    const x0 = f.n > 0 ? k.right + 3 : k.left - 3;
    out.push(<Arrow key={`f-${f.on}-${f.name}`} x={x0} y={y} len={len} color={c} />);
    out.push(
      <Text key={`ft-${f.on}-${f.name}`} x={x0 + len + (f.n > 0 ? 12 : -12)} y={y} anchor={f.n > 0 ? 'start' : 'end'} color={c} opacity={clamp01(grow * 1.5)}>
        {text}
      </Text>,
    );
  }

  // A body that has gone right inside one drawn after it (a bullet in a block) is covered by it:
  // it moves with that body, whose labels now speak for both.
  const covered = (b: MotionBody) =>
    el.bodies.some((o, oi) => {
      if (oi <= el.bodies.indexOf(b) || (o.lane ?? 0) !== (b.lane ?? 0) || widthOf(o) <= widthOf(b)) return false;
      const [bx, ox] = [state.bodies[b.id].x, state.bodies[o.id].x];
      return bx - widthOf(b) / 2 >= ox - widthOf(o) / 2 - 1e-6 && bx + widthOf(b) / 2 <= ox + widthOf(o) / 2 + 1e-6;
    });

  // Two bodies close together on a track (coupled carts) take turns to have their labels higher.
  const raised: Record<string, number> = {};
  for (let lane = 0; lane < lanes.length; lane++) {
    const row = el.bodies.filter((b) => (b.lane ?? 0) === lane && !covered(b)).sort((p1, p2) => state.bodies[p1.id].x - state.bodies[p2.id].x);
    row.forEach((b, i) => {
      const near = i > 0 && (state.bodies[b.id].x - state.bodies[row[i - 1].id].x) * S < 132;
      raised[b.id] = near && !raised[row[i - 1].id] ? 1 : 0;
    });
  }

  for (const b of el.bodies) {
    if (b.fixed || covered(b)) continue;
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
          {moving ? (el.speedWord ? `speed = ${speedText(Math.abs(s.v), el.velocityDecimals)} m/s` : `v = ${speedText(s.v, el.velocityDecimals)} m/s`) : 'at rest'}
        </Text>,
      );
      y -= 30;
    }
    if (distance > 0) {
      out.push(
        <Text key={`d-${b.id}`} x={k.cx} y={y} color={INK} size={20} opacity={distance}>
          {`distance = ${live(state.travelled[b.id])} m`}
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

  // Under a single track: the path each body took, leg by leg, and its displacement, one arrow
  // from where it started to where it is now.
  if (lanes.length === 1 && !barRows) {
    for (const b of el.bodies) {
      const g = ground(b.lane ?? 0);
      const here = state.bodies[b.id].x;
      const from = el.equilibrium ?? state.turns[b.id][0];
      if (distance > 0) {
        const stops = [...state.turns[b.id], here];
        stops.slice(1).forEach((to, i) => {
          const len = (to - stops[i]) * S;
          if (Math.abs(len) < 2) return;
          const y = g + 55 + Math.min(i, 2) * 12;
          out.push(
            <g key={`leg-${b.id}-${i}`} opacity={distance * 0.9}>
              <line x1={X(stops[i])} y1={y - 6} x2={X(stops[i])} y2={y + 6} stroke={INK2} strokeWidth={2} />
              <Arrow x={X(stops[i])} y={y} len={len} color={INK2} weight={3.5} />
            </g>,
          );
        });
      }
      if (displacement > 0) {
        const len = (here - from) * S;
        const y = g + 96;
        const right = Math.max(X(from), X(here));
        const room = right + 300 < w;
        out.push(
          <g key={`disp-${b.id}`} opacity={displacement}>
            <line x1={X(from)} y1={y - 9} x2={X(from)} y2={y + 9} stroke={DISPLACEMENT} strokeWidth={2.5} />
            <Arrow x={X(from)} y={y} len={len} color={DISPLACEMENT} weight={7} />
            <Text x={room ? right + 16 : Math.min(X(from), X(here)) - 16} y={y} anchor={room ? 'start' : 'end'} color={DISPLACEMENT}>
              {el.equilibrium !== undefined ? `x = ${offset(here - from, el.cm)}` : `displacement = ${signed(here - from)} m`}
            </Text>
          </g>,
        );
      }
    }
  }

  // The extension of the spring, under the track: from where its end is at its natural length to where it is now.
  if (extension > 0 && el.spring && sprung) {
    const g = ground(sprung.lane ?? 0);
    const half = (widthOf(sprung) * S) / 2;
    const here = el.spring.loose ? Math.min(state.bodies[sprung.id].x, el.spring.rest) : state.bodies[sprung.id].x;
    const [from, to] = [X(el.spring.rest) - half, X(here) - half];
    const x = here - el.spring.rest;
    const y = g + 58;
    out.push(
      <g key="extension" opacity={extension}>
        <line x1={from} y1={g - BLOCK_H * 1.25} x2={from} y2={y + 12} stroke={DISPLACEMENT} strokeWidth={2} strokeDasharray="6 6" opacity={0.8} />
        <Text x={from} y={g - BLOCK_H * 1.25 - 16} color={DISPLACEMENT} size={18}>
          natural length
        </Text>
        {Math.abs(to - from) >= 2 && <Arrow x={from} y={y} len={to - from} color={DISPLACEMENT} weight={6} />}
        <Text x={Math.max(from, to) + 14} y={y + (Math.abs(to - from) >= 2 ? 0 : 0)} anchor="start" color={DISPLACEMENT}>
          {`x = ${Math.abs(x).toFixed(el.spring.decimals ?? 2)} m${x < -1e-9 ? ' (compressed)' : ''}`}
        </Text>
      </g>,
    );
  }

  // An oscillation: the equilibrium position and the two extremes of the motion, marked through
  // the middle of the body, with the amplitude between them under the ruler.
  const amplitude = part('amplitude');
  const swinger = el.equilibrium !== undefined ? (sprung ?? el.bodies[0]) : undefined;
  if (swinger && el.equilibrium !== undefined && amplitude > 0) {
    const zero = el.equilibrium;
    const g = ground(swinger.lane ?? 0);
    const A = amplitudeOf(el, state, swinger.id);
    const [y0, y1] = [g - BLOCK_H * 1.25, g + 50];
    const here = X(state.bodies[swinger.id].x);
    out.push(
      <g key="amplitude" opacity={amplitude}>
        <line x1={X(zero)} y1={y0 + 14} x2={X(zero)} y2={y1 + 22} stroke={INK2} strokeWidth={2} strokeDasharray="6 6" opacity={0.85} />
        {/* Its name sits under the ruler, clear of the velocity and the acceleration written over the body. */}
        <Text x={X(zero) - 12} y={y1 + 12} anchor="end" color={INK2} size={18}>
          equilibrium
        </Text>
        {/* The line at the far extreme stops at the track when it would run through the word "equilibrium". */}
        {A * S >= 6 && [-1, 1].map((k) => <line key={k} x1={X(zero + k * A)} y1={y0 + 14} x2={X(zero + k * A)} y2={k < 0 && A * S < 130 ? g + 10 : y1 + 22} stroke={DISPLACEMENT} strokeWidth={2} strokeDasharray="3 7" opacity={0.75} />)}
        {A * S >= 6 && <Arrow x={X(zero)} y={y1 + 12} len={A * S} color={DISPLACEMENT} weight={5} />}
        {A * S >= 6 && (
          <Text x={X(zero + A) + 14} y={y1 + 12} anchor="start" color={DISPLACEMENT} size={19}>
            {`A = ${offset(A, el.cm, false)}`}
          </Text>
        )}
        {/* The point of the body that is followed: its middle. */}
        <path d={`M ${here} ${g + 3} l -7 11 h 14 z`} fill={DISPLACEMENT} />
      </g>,
    );
  }
  const count = part('count');
  if (count > 0) out.push(<Count key="count" n={oscillations(state, (sprung ?? el.bodies[0]).id)} opacity={count} />);

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
  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time} opacity={clock} decimals={el.clockDecimals} />);
  if (state.note)
    out.push(
      <g key="note">
        <rect x={w / 2 - noteW(state.note) / 2} y={0} width={noteW(state.note)} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={19.5} size={19} color="#fff">
          {state.note}
        </Text>
      </g>,
    );

  // A velocity-time (or distance-time) graph that draws itself as the bodies move, above the track on the right.
  // A force-displacement graph stands over the track and shares its scale: the point on the line is straight above the body.
  if (graph > 0 && el.graph?.y === 'force') {
    const b = el.bodies.find((q) => q.id === el.graph!.of[0])!;
    const from = el.spring?.on === b.id ? el.spring.rest : b.x;
    out.push(<ForceGraph key="graph" el={el} state={state} opacity={graph} box={[X(from), top + 58, X(from + (el.graph.metres ?? 1)), box(b).top - 66]} />);
  }
  // A force-time graph is wider: its shape, and the area under it, are what the scene is about.
  if (graph > 0 && el.graph && el.graph.y !== 'force') out.push(<Graph key="graph" el={el} state={state} opacity={graph} box={[w * (el.graph.y === 'impulse' ? 0.3 : 0.47), top + 44, w - 34, ground(0) - BLOCK_H - 150]} tone={tone} />);

  // Energy bars, under the tracks.
  if (el.energy && !el.momentumMax && (energy > 0 || total > 0)) out.push(<EnergyBars key="energy" el={el} state={state} x={0} y={h - barsH + 22} w={w} opacity={energy} total={total} />);

  // Momentum bars: one for each body and one for the total, which a collision leaves unchanged.
  if (bars > 0 && el.momentumMax) {
    const y0 = h - barsH + 40;
    const left = 170;
    const room = w - left - 220;
    // With negative momentum to show, the zero line sits part way along and the bars share the room.
    const low = Math.min(0, el.momentumMin ?? 0);
    const full = (room * el.momentumMax) / (el.momentumMax - low);
    const x0 = left + room - full;
    const rows = [
      ...barBodies.map((b) => ({ name: b.label ?? b.id, p: b.mass * state.bodies[b.id].v, c: tone(b) })),
      { name: 'Total', p: barBodies.reduce((n, b) => n + b.mass * state.bodies[b.id].v, 0), c: NET },
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
            <g key={i} opacity={last ? total : 1}>
              <Text x={left - 16} y={y + 18} anchor="end" color={last ? NET : INK}>
                {r.name}
              </Text>
              <rect x={left} y={y + 2} width={room} height={32} rx={8} fill="rgb(255 255 255 / 0.05)" />
              <rect x={r.p < 0 ? x0 - len : x0} y={y + 2} width={Math.max(0, len)} height={32} rx={8} fill={r.c} fillOpacity={last ? 0.85 : 0.75} />
              <Text x={x0 + (r.p < 0 ? 0 : Math.max(len, 0)) + 14} y={y + 18} anchor="start" color={r.c}>
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
