/**
 * Blocks on a surface, level or tilted, with every force on them drawn (src/video/ramp.ts works
 * the forces and the motion out). It is a free-body diagram that moves: weight is pink and points
 * straight down, the normal force is blue and stands at right angles to the surface, friction is
 * red where the block meets the surface, a push or a pull is orange, and tension is violet along
 * its string. The two parts of the weight on a ramp, or of a pull at an angle, are dashed arrows
 * in the colour of the force they belong to. Velocity is green and the net force yellow, as in
 * every physics video. A surface tilted to 90 degrees is not drawn: its block hangs from the
 * other side of the pulley, which makes an Atwood machine.
 */
import type { ReactElement } from 'react';
import type { RampEl, Tone } from '../script.ts';
import { RAMP_G, rampAt, tilts, type RampArrow, type RampBodyState } from '../ramp.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, BODY_TONES, clamp01, Clock, FONT, INK2, live, NET, short, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK3 } from './Triangle.tsx';

const TRACK = '#bcd9ff';
const ROPE = 'rgb(201 198 232 / 0.75)';
const COLOR: Record<RampArrow['kind'], string> = { weight: TONES.hyp, normal: TONES.adj, friction: TONES.bad, applied: TONES.opp, tension: TONES.brand };
const rad = (deg: number) => (deg * Math.PI) / 180;
const easeOut = (x: number) => 1 - (1 - clamp01(x)) ** 3;
/** Newtons for a label: whole from a thousand up and when the number is whole, one decimal otherwise. */
const newtons = (n: number) => (Math.abs(n) >= 999.5 || Math.abs(n - Math.round(n)) < 0.005 ? String(Math.round(n) + 0) : live(n));
/** A unit vector on the screen for a direction in degrees anticlockwise from the right. */
const dir = (turn: number): [number, number] => [Math.cos(rad(turn)), -Math.sin(rad(turn))];

/** A thin dashed arrow, for one part of a force. */
function Part({ x, y, len, turn, color, opacity }: { x: number; y: number; len: number; turn: number; color: string; opacity: number }) {
  if (len < 6) return null;
  const head = Math.min(13, len);
  return (
    <g transform={`translate(${x} ${y}) rotate(${-turn})`} opacity={opacity}>
      <line x1={0} y1={0} x2={len - head} y2={0} stroke={color} strokeWidth={4} strokeDasharray="9 6" strokeLinecap="round" />
      <polygon points={`${len},0 ${len - head},7 ${len - head},-7`} fill={color} />
    </g>
  );
}

/** A label at the tip of an arrow: beside a level arrow, and to one side of an upright one. */
function tipLabel(key: string, tip: [number, number], turn: number, text: string, color: string, opacity: number, lean = 1): ReactElement {
  const [dx, dy] = dir(turn);
  if (Math.abs(dx) > 0.71)
    return (
      <Text key={key} x={tip[0] + Math.sign(dx) * 12} y={tip[1] + dy * 16} anchor={dx > 0 ? 'start' : 'end'} color={color} opacity={opacity}>
        {text}
      </Text>
    );
  return (
    <Text key={key} x={tip[0] + lean * 22} y={tip[1] - dy * 12} anchor={lean > 0 ? 'start' : 'end'} color={color} opacity={opacity}>
      {text}
    </Text>
  );
}

export function RampView({ el, st, w, h, plays }: { el: RampEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = rampAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const shown: Record<RampArrow['kind'], number> = { weight: part('weight'), normal: part('normal'), friction: part('friction'), tension: part('tension'), applied: 1 };
  const comps = part('components');
  const net = part('net');
  const vel = part('velocity');
  const readout = part('readout');
  const clock = part('clock');
  const strobe = part('strobe');
  const fs = el.forceScale ?? 1.5;
  const vs = el.velocityScale ?? 24;
  const upright = el.angle === 90;
  const th = state.angle;
  const out: ReactElement[] = [];
  const tone = (id: string, t?: Tone) => TONES[t ?? BODY_TONES[[...el.bodies.map((b) => b.id), el.hanging?.id].indexOf(id) % BODY_TONES.length]];

  // One scale both ways, chosen so that the surface fits at every tilt it takes.
  const all = tilts(el);
  const [lo, hi] = [Math.min(...all), Math.max(...all)];
  const raise = el.raise ?? 0;
  const [top, bottom] = el.pad ?? [150, raise > 0 || hi > 0 ? 44 : 130];
  const padL = 70;
  const padR = el.hanging ? 300 : 70;
  const RP = upright ? 62 : 20;
  const floorY = h - bottom;
  // How far the surface climbs at its steepest; a level floor climbs nothing, and only its length sets the scale.
  const rise = raise + el.length * Math.sin(rad(hi));
  const S = upright ? (floorY - top - RP - 30) / el.length : Math.min((w - padL - padR) / (el.length * Math.cos(rad(lo))), rise > 1e-6 ? (floorY - top) / rise : Infinity);
  const span = el.length * Math.cos(rad(lo)) * S;
  const ox = upright ? w / 2 : padL + (w - padL - padR - span) / 2;
  // The surface: from its lower end A to its upper end B; `u` points up it and `nrm` away from it.
  const u = dir(th);
  const nrm = dir(th + 90);
  const A: [number, number] = [ox, floorY - raise * S];
  const B: [number, number] = [A[0] + u[0] * el.length * S, A[1] + u[1] * el.length * S];
  const size = (width: number | undefined): [number, number] => {
    const bw = Math.max(72, Math.min(130, (width ?? 1) * S));
    return [bw, Math.max(48, Math.min(82, 0.62 * bw))];
  };
  const heights = el.bodies.map((b) => size(b.width)[1]);
  const line = Math.max(...heights) / 2;
  // The pulley: its rim touches the line of the string, which runs through the middle of the blocks.
  const pulley: [number, number] | null = !el.hanging ? null : upright ? [w / 2, top] : [B[0] + u[0] * (RP + 8) + nrm[0] * (line - RP), B[1] + u[1] * (RP + 8) + nrm[1] * (line - RP)];

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );

  if (upright && pulley) {
    out.push(
      <g key="surface">
        <line x1={pulley[0] - 150} y1={12} x2={pulley[0] + 150} y2={12} stroke={TRACK} strokeWidth={5} strokeLinecap="round" />
        <line x1={pulley[0]} y1={12} x2={pulley[0]} y2={pulley[1]} stroke={INK3} strokeWidth={4} />
        <line x1={pulley[0] - 260} y1={floorY} x2={pulley[0] + 260} y2={floorY} stroke={INK3} strokeWidth={1.5} opacity={0.7} />
      </g>,
    );
  } else {
    const rough = (el.friction?.[1] ?? 0) > 0 || (el.friction?.[0] ?? 0) > 0;
    const marks: ReactElement[] = [];
    const every = el.length > 30 ? 5 : el.length > 14 ? 2 : 1;
    for (let m = 0; m <= el.length + 1e-9; m += every) {
      const [x, y] = [A[0] + u[0] * m * S, A[1] + u[1] * m * S];
      marks.push(<line key={`t${m}`} x1={x} y1={y} x2={x - nrm[0] * 9} y2={y - nrm[1] * 9} stroke={INK3} strokeWidth={1.5} opacity={0.8} />);
      if (hi === 0)
        marks.push(
          <text key={`n${m}`} x={x} y={y + 26} fill={INK3} fontSize={15} textAnchor="middle" style={{ fontFamily: FONT }}>
            {m}
          </text>,
        );
    }
    // A rough surface is hatched just under its line.
    if (rough) for (let d = 7; d < el.length * S; d += 14) marks.push(<line key={`r${d}`} x1={A[0] + u[0] * d} y1={A[1] + u[1] * d} x2={A[0] + u[0] * (d - 6) - nrm[0] * 6} y2={A[1] + u[1] * (d - 6) - nrm[1] * 6} stroke={TRACK} strokeWidth={1.5} opacity={0.45} />);
    out.push(
      <g key="surface">
        {(raise > 0 || th > 0.05) && <polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${B[0]},${floorY} ${A[0]},${floorY}`} fill="rgb(77 163 255 / 0.1)" />}
        {(raise > 0 || hi > 0) && <line x1={A[0] - 40} y1={floorY} x2={Math.max(B[0], A[0] + span) + (el.hanging ? 220 : 40)} y2={floorY} stroke={INK3} strokeWidth={1.5} opacity={0.7} />}
        {marks}
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={TRACK} strokeWidth={4} strokeLinecap="round" />
      </g>,
    );
    // The tilt, marked at the lower end.
    if (hi > 0) {
      const r = 74;
      const mid = dir(th / 2);
      out.push(
        <g key="tilt">
          <line x1={A[0]} y1={A[1]} x2={A[0] + 130} y2={A[1]} stroke={INK3} strokeWidth={2} strokeDasharray="5 6" opacity={raise > 0 || th < 0.05 ? 0 : 0.9} />
          {th > 0.5 && <path d={`M ${A[0] + r} ${A[1]} A ${r} ${r} 0 0 0 ${A[0] + u[0] * r} ${A[1] + u[1] * r}`} fill="none" stroke={TONES.theta} strokeWidth={3} />}
          <Text x={A[0] + mid[0] * (r + 34)} y={A[1] + mid[1] * (r + 34) - (th < 8 ? 14 : 0)} color={TONES.theta} size={22}>
            {`${short(th)}°`}
          </Text>
        </g>,
      );
    }
    if (pulley) {
      out.push(
        <g key="pulley">
          <line x1={B[0]} y1={B[1]} x2={pulley[0]} y2={pulley[1]} stroke={INK3} strokeWidth={5} strokeLinecap="round" />
          <circle cx={pulley[0]} cy={pulley[1]} r={RP} fill="#1b1846" stroke={INK2} strokeWidth={3} />
          <circle cx={pulley[0]} cy={pulley[1]} r={3.5} fill={INK2} />
        </g>,
      );
    }
  }
  if (upright && pulley)
    out.push(
      <g key="pulley">
        <circle cx={pulley[0]} cy={pulley[1]} r={RP} fill="#1b1846" stroke={INK2} strokeWidth={3} />
        <circle cx={pulley[0]} cy={pulley[1]} r={5} fill={INK2} />
      </g>,
    );

  // Where everything is: a block's foot on the surface and its middle, or a hanging body's middle.
  interface Box {
    id: string;
    label: string;
    c: [number, number];
    /** Half its length along the surface and half its height, in pixels. */
    half: [number, number];
    /** Degrees it is turned through with the surface. */
    turned: number;
    /** A body that hangs: the side of it that its labels go on (-1 left, 1 right). */
    hangs: 0 | 1 | -1;
    s: RampBodyState;
    mark: (x: number) => [number, number];
  }
  const boxes: Box[] = el.bodies.map((b) => {
    const s = state.bodies[b.id];
    const [bw, bh] = size(b.width);
    const label = b.label ?? `${short(b.mass)} kg`;
    if (upright && pulley) {
      const at = (x: number): [number, number] => [pulley[0] - RP, floorY - x * S];
      return { id: b.id, label, c: at(s.x), half: [bw / 2, bh / 2], turned: 0, hangs: -1, s, mark: at };
    }
    const at = (x: number): [number, number] => [A[0] + u[0] * x * S + nrm[0] * (bh / 2), A[1] + u[1] * x * S + nrm[1] * (bh / 2)];
    return { id: b.id, label, c: at(s.x), half: [bw / 2, bh / 2], turned: th, hangs: 0, s, mark: at };
  });
  if (el.hanging && pulley) {
    const s = state.bodies[el.hanging.id];
    const [bw, bh] = size(el.hanging.width ?? 0.8);
    const at = (x: number): [number, number] => [pulley[0] + RP, pulley[1] + x * S];
    boxes.push({ id: el.hanging.id, label: el.hanging.label ?? `${short(el.hanging.mass)} kg`, c: at(s.x), half: [bw / 2, bh / 2], turned: 0, hangs: 1, s, mark: at });
  }
  const boxOf = (id: string) => boxes.find((k) => k.id === id)!;
  /** The point where a line from a box's middle leaves it, a little way clear. */
  const edge = (k: Box, turn: number, clear = 3): [number, number] => {
    const [dx, dy] = dir(turn);
    const a = rad(turn - k.turned);
    const r = Math.min(k.half[0] / Math.max(Math.abs(Math.cos(a)), 1e-6), k.half[1] / Math.max(Math.abs(Math.sin(a)), 1e-6)) + clear;
    return [k.c[0] + dx * r, k.c[1] + dy * r];
  };

  // Strings: between tied blocks, and over the pulley to the hanging body.
  const ropes: ReactElement[] = [];
  for (const [a, b] of el.ropes ?? []) {
    const [lower, upper] = state.bodies[a].x <= state.bodies[b].x ? [boxOf(a), boxOf(b)] : [boxOf(b), boxOf(a)];
    const [p1, p2] = [edge(lower, th, 0), edge(upper, th + 180, 0)];
    ropes.push(<line key={`rope-${a}-${b}`} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke={ROPE} strokeWidth={3} />);
  }
  if (el.hanging && pulley) {
    const last = [...el.bodies].sort((a, b) => a.x - b.x).at(-1)!;
    const from = boxOf(last.id);
    const hung = boxOf(el.hanging.id);
    const p1 = upright ? ([from.c[0], from.c[1] - from.half[1]] as [number, number]) : edge(from, th, 0);
    const t1: [number, number] = upright ? [pulley[0] - RP, pulley[1]] : [pulley[0] + nrm[0] * RP, pulley[1] + nrm[1] * RP];
    ropes.push(<path key="rope-pulley" d={`M ${p1[0]} ${p1[1]} L ${t1[0]} ${t1[1]} A ${RP} ${RP} 0 0 1 ${pulley[0] + RP} ${pulley[1]} L ${hung.c[0]} ${hung.c[1] - hung.half[1]}`} fill="none" stroke={ROPE} strokeWidth={3} strokeLinejoin="round" />);
  }
  out.push(<g key="ropes">{ropes}</g>);

  if (strobe > 0)
    for (const k of boxes)
      out.push(
        <g key={`marks-${k.id}`} opacity={0.75 * strobe}>
          {state.marks[k.id].map((x, i) => {
            const [mx, my] = k.mark(x);
            return <circle key={i} cx={mx} cy={my} r={5} fill="none" stroke={tone(k.id)} strokeWidth={2} />;
          })}
        </g>,
      );

  for (const k of boxes) {
    const c = tone(k.id, k.hangs === 1 ? el.hanging?.tone : el.bodies.find((b) => b.id === k.id)?.tone);
    const f = st?.focus[k.id] ?? 0;
    out.push(
      <g key={k.id} style={f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${c})` } : undefined}>
        <g transform={`translate(${k.c[0]} ${k.c[1]}) rotate(${-k.turned})`}>
          <rect x={-k.half[0]} y={-k.half[1]} width={2 * k.half[0]} height={2 * k.half[1]} rx={9} fill="#1b1846" stroke={c} strokeWidth={3} />
          <rect x={-k.half[0]} y={-k.half[1]} width={2 * k.half[0]} height={2 * k.half[1]} rx={9} fill={c} fillOpacity={0.3} />
        </g>
        <Text x={k.c[0]} y={k.c[1] - (k.hangs ? 0 : 2)} size={Math.min(21, k.half[0] * 0.42)} weight={700}>
          {k.label}
        </Text>
      </g>,
    );
  }

  // Forces: an arrow as long as the force is large, from where it acts, with its name and size.
  for (const k of boxes) {
    const side = k.hangs || 1;
    for (const [i, f] of k.s.forces.entries()) {
      const o = shown[f.kind];
      // On a level surface a block's weight and normal force balance: they can be left out.
      if (o <= 0 || ((f.kind === 'weight' || f.kind === 'normal') && el.balanced?.includes(k.id))) continue;
      const color = f.kind === 'applied' && f.tone ? TONES[f.tone] : COLOR[f.kind];
      const grow = f.kind === 'applied' ? easeOut((f.age ?? 1) / 0.35) : 1;
      const len = Math.max(26, f.n * fs) * grow;
      const [dx, dy] = dir(f.turn);
      // Weight acts at the middle of a body, friction where the block meets the surface, and
      // everything else is drawn from the face it leaves by.
      const local = f.turn - th;
      const up = Math.cos(rad(local)) > 0 ? 1 : -1;
      // A push that presses the block into the surface ends at the face it presses on.
      const into = f.kind === 'applied' && !k.hangs && Math.sin(rad(local)) < -0.02;
      // A push straight down on a block, or a pull straight up, shares the middle of its top
      // with the normal force: the two stand side by side.
      const steep = (q: RampArrow) => q.kind === 'applied' && Math.abs(Math.cos(rad(q.turn - th))) < 0.3;
      const aside = k.hangs ? 0 : steep(f) ? k.half[0] * 0.5 : f.kind === 'normal' && k.s.forces.some(steep) ? -k.half[0] * 0.5 : 0;
      const from = (): [number, number] => {
        if (f.kind === 'weight') return [k.c[0], k.c[1] + k.half[1] * 0.42];
        if (f.kind === 'friction') return [k.c[0] + u[0] * up * (k.half[0] + 3) - nrm[0] * (k.half[1] - 10), k.c[1] + u[1] * up * (k.half[0] + 3) - nrm[1] * (k.half[1] - 10)];
        if (!into) return edge(k, f.turn);
        const face = edge(k, f.turn + 180);
        return [face[0] - dx * len, face[1] - dy * len];
      };
      const tail: [number, number] = [from()[0] + u[0] * aside, from()[1] + u[1] * aside];
      const tip: [number, number] = [tail[0] + dx * len, tail[1] + dy * len];
      const key = `${k.id}-${f.kind}-${i}`;
      out.push(<Arrow key={`f-${key}`} x={tail[0]} y={tail[1]} len={len} turn={f.turn} color={color} opacity={o} />);
      // The parts of a force that lies along neither the surface nor the line at right angles to it.
      const [along, away] = [f.n * Math.cos(rad(local)), f.n * Math.sin(rad(local))];
      const slanted = !upright && !k.hangs && Math.abs(along) > 0.02 * f.n && Math.abs(away) > 0.02 * f.n && (f.kind === 'weight' || f.kind === 'applied');
      const split = slanted ? comps * o * clamp01(grow * 1.5) : 0;
      if (split > 0) {
        const [ta, tb] = [along > 0 ? th : th + 180, away > 0 ? th + 90 : th - 90];
        const [la, lb] = [Math.abs(along) * fs, Math.abs(away) * fs];
        const [pa, pb] = [dir(ta), dir(tb)];
        const [ea, eb]: Array<[number, number]> = [
          [tail[0] + pa[0] * la, tail[1] + pa[1] * la],
          [tail[0] + pb[0] * lb, tail[1] + pb[1] * lb],
        ];
        out.push(
          <g key={`c-${key}`}>
            <line x1={ea[0]} y1={ea[1]} x2={tip[0]} y2={tip[1]} stroke={color} strokeWidth={1.5} strokeDasharray="2 6" opacity={0.7 * split} />
            <line x1={eb[0]} y1={eb[1]} x2={tip[0]} y2={tip[1]} stroke={color} strokeWidth={1.5} strokeDasharray="2 6" opacity={0.7 * split} />
            <Part x={tail[0]} y={tail[1]} len={la} turn={ta} color={color} opacity={split} />
            <Part x={tail[0]} y={tail[1]} len={lb} turn={tb} color={color} opacity={split} />
          </g>,
        );
        const names = f.kind === 'weight' ? ['Along the ramp ', 'Into the ramp '] : ['', ''];
        out.push(tipLabel(`ca-${key}`, ea, ta, `${names[0]}${newtons(Math.abs(along))} N`, color, split, Math.sign(pa[0]) || 1));
        // The part of a pull that lifts is written over its tip, clear of the pull itself.
        if (f.kind === 'applied' && away > 0)
          out.push(
            <Text key={`cb-${key}`} x={eb[0] + nrm[0] * 20} y={eb[1] + nrm[1] * 20} color={color} opacity={split}>
              {`${newtons(Math.abs(away))} N`}
            </Text>,
          );
        else out.push(tipLabel(`cb-${key}`, eb, tb, `${names[1]}${newtons(Math.abs(away))} N`, color, split, Math.sign(pb[0]) || 1));
      }
      const text = `${f.name} ${newtons(f.n)} N`;
      if (f.kind === 'weight')
        // Under its tip, clear of its two parts.
        out.push(
          <Text key={`t-${key}`} x={tip[0]} y={tip[1] + 24} color={color} opacity={o}>
            {text}
          </Text>,
        );
      else if (f.kind === 'tension' && !k.hangs) {
        // A string has one tension: it is written once, over the arrow that points up the surface.
        if (Math.cos(rad(local)) > 0)
          out.push(
            <Text key={`t-${key}`} x={tail[0] + dx * 8 + nrm[0] * 26} y={tail[1] + dy * 8 + nrm[1] * 26} anchor="start" color={color} opacity={o}>
              {text}
            </Text>,
          );
      } else {
        // On a tilted surface, friction's label stands clear of the surface line.
        const off = f.kind === 'friction' ? 8 + 12 * clamp01(th / 10) : 0;
        const at = into ? tail : tip;
        out.push(tipLabel(`t-${key}`, [at[0] + nrm[0] * off, at[1] + nrm[1] * off], into ? f.turn + 180 : f.turn, text, color, o * clamp01(grow * 1.5), aside < 0 ? -1 : side));
      }
    }
  }

  for (const k of boxes) {
    const s = k.s;
    const moving = Math.abs(s.v) >= 0.05;
    if (k.hangs) {
      // Beside a hanging body: its velocity arrow, then the numbers.
      const x = k.c[0] + k.hangs * (k.half[0] + 26);
      const way = k.hangs === 1 ? -1 : 1;
      if (vel > 0 && moving) out.push(<Arrow key={`v-${k.id}`} x={x} y={k.c[1] + (way * s.v * vs) / 2} len={way * s.v * vs} axis="y" color={VELOCITY} weight={6} opacity={vel} />);
      const rows: Array<[string, string, number]> = [];
      if (vel > 0) rows.push([moving ? `v = ${live(Math.abs(s.v))} m/s` : 'at rest', VELOCITY, vel]);
      if (readout > 0) rows.push([`a = ${Math.abs(s.a).toFixed(2)} m/s²`, INK2, readout]);
      if (net > 0) rows.push([`Net force ${newtons(Math.abs(s.net))} N`, NET, net]);
      rows.forEach(([text, color, o], i) =>
        out.push(
          <Text key={`row-${k.id}-${i}`} x={x + k.hangs * 22} y={k.c[1] + (i - (rows.length - 1) / 2) * 30} anchor={k.hangs === 1 ? 'start' : 'end'} color={color} size={i === 0 ? 21 : 20} opacity={o}>
            {text}
          </Text>,
        ),
      );
      continue;
    }
    // Over a block, past the tip of the normal force and of any pull that lifts: its velocity arrow, the speed and the acceleration.
    const normal = s.forces.find((f) => f.kind === 'normal');
    // A pull that slants away from the surface rises over the block as well.
    const lift = Math.max(0, ...s.forces.filter((f) => f.kind === 'applied').map((f) => f.n * Math.sin(rad(f.turn - th)) * fs));
    let d = k.half[1] + Math.max(normal && shown.normal > 0.5 ? Math.max(26, normal.n * fs) + 30 : 0, lift > 12 ? lift + 40 : 0) + 24;
    const over = (dist: number): [number, number] => [k.c[0] + nrm[0] * dist, k.c[1] + nrm[1] * dist];
    if (vel > 0) {
      const len = s.v * vs;
      const [x, y] = over(d);
      if (moving) out.push(<Arrow key={`v-${k.id}`} x={x - (u[0] * len) / 2} y={y - (u[1] * len) / 2} len={len} turn={th} color={VELOCITY} weight={6} opacity={vel} />);
      d += moving ? 26 : 6;
      out.push(
        <Text key={`vt-${k.id}`} x={over(d)[0]} y={over(d)[1]} color={VELOCITY} opacity={vel}>
          {moving ? `v = ${live(Math.abs(s.v))} m/s` : 'at rest'}
        </Text>,
      );
      d += 30;
    }
    if (readout > 0)
      out.push(
        <Text key={`a-${k.id}`} x={over(d)[0]} y={over(d)[1]} color={INK2} size={19} opacity={readout}>
          {`a = ${Math.abs(s.a).toFixed(2)} m/s²`}
        </Text>,
      );
    // The net force, under the surface: what is left when the forces along it are added.
    if (net > 0) {
      const foot: [number, number] = [k.c[0] - nrm[0] * (k.half[1] + 30), k.c[1] - nrm[1] * (k.half[1] + 30)];
      const len = s.net * fs;
      if (Math.abs(len) >= 1) out.push(<Arrow key={`n-${k.id}`} x={foot[0] - (u[0] * len) / 2} y={foot[1] - (u[1] * len) / 2} len={len} turn={th} color={NET} weight={8} opacity={net} />);
      out.push(
        <Text key={`nt-${k.id}`} x={foot[0] - nrm[0] * 30} y={foot[1] - nrm[1] * 30} color={NET} opacity={net}>
          {`Net force ${newtons(Math.abs(s.net))} N`}
        </Text>,
      );
    }
  }

  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time} opacity={clock} />);
  if (state.note)
    out.push(
      <g key="note">
        <rect x={w / 2 - 120} y={upright ? h - 38 : 0} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={upright ? h - 18.5 : 19.5} size={19} color="#fff">
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

/** The largest force a ramp's arrows must show, in newtons: the heaviest body's weight. */
export const heaviest = (el: RampEl): number => Math.max(...el.bodies.map((b) => b.mass), el.hanging?.mass ?? 0) * (el.g ?? RAMP_G);
