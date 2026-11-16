/**
 * One object with forces that point any way in a plane (src/video/forces.ts works them out). Seen
 * from above on ice, the forces of a clip add to a net force, drawn yellow as in every physics
 * video, and the object moves off along it. Hung from two cables, the object is at rest: its
 * weight is pink, the two tensions violet, and they change as the cables tilt. The two parts of a
 * slanted force are dashed arrows in its colour, drawn head to tail so that they end at its tip.
 * Every arrow starts at the middle of the object, so the arrows close exactly.
 */
import type { ReactElement } from 'react';
import type { ForcesEl } from '../script.ts';
import { forcesAt, type ForceArrow } from '../forces.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, clamp01, Clock, FONT, INK2, live, NET, short, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK3 } from './Triangle.tsx';

const TRACK = '#bcd9ff';
const ROPE = 'rgb(201 198 232 / 0.75)';
const COLOR: Record<ForceArrow['kind'], string> = { weight: TONES.hyp, tension: TONES.brand, applied: TONES.opp };
const rad = (deg: number) => (deg * Math.PI) / 180;
const easeOut = (x: number) => 1 - (1 - clamp01(x)) ** 3;
const newtons = (n: number) => (Math.abs(n) >= 999.5 || Math.abs(n - Math.round(n)) < 0.005 ? String(Math.round(n) + 0) : live(n));
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

export function ForcesView({ el, st, w, h, plays }: { el: ForcesEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = forcesAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const comps = part('components');
  const net = part('net');
  const vel = part('velocity');
  const readout = part('readout');
  const trail = part('trail');
  const angles = part('angles');
  const clock = part('clock');
  const shown: Record<ForceArrow['kind'], number> = { applied: 1, weight: part('weight'), tension: part('tension') };
  const fs = el.forceScale ?? 3;
  const vs = el.velocityScale ?? 24;
  const hung = state.cables;
  const tone = TONES[el.body.tone ?? 'adj'];
  const out: ReactElement[] = [];

  // Where the object is on the screen: at the origin of a floor seen from above, or under its cables.
  const [x0, x1, y0, y1] = el.view ?? [-1, 1, -1, 1];
  const top = el.label && !hung ? 30 : 0;
  const S = Math.min(w / (x1 - x0), (h - 20 - top) / (y1 - y0));
  const ox = (w - (x1 - x0) * S) / 2;
  const X = (x: number) => ox + (x - x0) * S;
  const Y = (y: number) => h - 10 - (y - y0) * S;
  const ceiling = el.label ? 46 : 26;
  const wall = Math.min(w / 2 - 30, 470);
  const [cx, cy] = hung ? [w / 2, h * 0.5] : [X(state.at[0]), Y(state.at[1])];
  const half: [number, number] = hung ? [58, 34] : [27, 27];

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );

  if (hung) {
    // A ceiling and two walls: each cable runs from the object to whichever it meets first.
    const cables = [180 - hung[0], hung[1]].map((turn, i) => {
      const [dx, dy] = dir(turn);
      const t = Math.min(dy < -0.01 ? (cy - ceiling) / -dy : Infinity, Math.abs(dx) > 0.01 ? wall / Math.abs(dx) : Infinity);
      return <line key={i} x1={cx} y1={cy} x2={cx + dx * t} y2={cy + dy * t} stroke={ROPE} strokeWidth={3} />;
    });
    out.push(
      <g key="frame">
        <line x1={cx - wall} y1={ceiling} x2={cx + wall} y2={ceiling} stroke={TRACK} strokeWidth={5} strokeLinecap="round" />
        <line x1={cx - wall} y1={ceiling} x2={cx - wall} y2={cy + 60} stroke={TRACK} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
        <line x1={cx + wall} y1={ceiling} x2={cx + wall} y2={cy + 60} stroke={TRACK} strokeWidth={5} strokeLinecap="round" opacity={0.5} />
        {cables}
      </g>,
    );
    if (angles > 0) {
      const r = 96;
      const arcs = [
        { a: hung[0], from: 180, to: 180 - hung[0], sweep: 1 },
        { a: hung[1], from: 0, to: hung[1], sweep: 0 },
      ].map(({ a, from, to, sweep }, i) => {
        if (a < 3) return null;
        const [p1, p2, mid] = [dir(from), dir(to), dir((from + to) / 2)];
        return (
          <g key={i}>
            <path d={`M ${cx + p1[0] * r} ${cy + p1[1] * r} A ${r} ${r} 0 0 ${sweep} ${cx + p2[0] * r} ${cy + p2[1] * r}`} fill="none" stroke={TONES.theta} strokeWidth={3} />
            <Text x={cx + mid[0] * (r + 34)} y={cy + mid[1] * (r + 34)} color={TONES.theta} size={21}>
              {`${short(a)}°`}
            </Text>
          </g>
        );
      });
      out.push(
        <g key="angles" opacity={angles}>
          <line x1={cx - 190} y1={cy} x2={cx + 190} y2={cy} stroke={INK3} strokeWidth={2} strokeDasharray="5 6" />
          {arcs}
        </g>,
      );
    }
  } else {
    const lines: ReactElement[] = [];
    for (let x = Math.ceil(x0); x <= x1 + 1e-9; x++) lines.push(<line key={`x${x}`} x1={X(x)} y1={Y(y0)} x2={X(x)} y2={Y(y1)} stroke={INK3} strokeWidth={1} opacity={0.18} />);
    for (let y = Math.ceil(y0); y <= y1 + 1e-9; y++) lines.push(<line key={`y${y}`} x1={X(x0)} y1={Y(y)} x2={X(x1)} y2={Y(y)} stroke={INK3} strokeWidth={1} opacity={0.18} />);
    out.push(
      <g key="floor">
        <rect x={X(x0)} y={Y(y1)} width={(x1 - x0) * S} height={(y1 - y0) * S} rx={14} fill="rgb(77 163 255 / 0.07)" stroke="rgb(188 217 255 / 0.3)" strokeWidth={1.5} />
        {lines}
        <Arrow x={X(x1) - 34} y={Y(y1) + 76} len={40} axis="y" color={INK2} weight={4} />
        <Text x={X(x1) - 34} y={Y(y1) + 20} color={INK2} size={18}>
          N
        </Text>
      </g>,
    );
    if (trail > 0) out.push(<polyline key="trail" points={state.trail.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')} fill="none" stroke={tone} strokeWidth={3.5} strokeLinecap="round" strokeDasharray="2 9" opacity={0.75 * trail} />);
  }

  // Forces: every arrow starts at the middle of the object, so that the parts and the net force close.
  const labels: ReactElement[] = [];
  const tips: Array<[number, number]> = [];
  for (const [i, f] of state.forces.entries()) {
    const o = shown[f.kind];
    if (o <= 0) continue;
    const color = f.kind === 'applied' && f.tone ? TONES[f.tone] : COLOR[f.kind];
    const grow = easeOut(f.age / 0.35);
    const len = Math.max(30, f.n * fs) * grow;
    const [dx, dy] = dir(f.angle);
    const tip: [number, number] = [cx + dx * len, cy + dy * len];
    tips.push(tip);
    out.push(<Arrow key={`f-${i}`} x={cx} y={cy} len={len} turn={f.angle} color={color} opacity={o} />);
    const text = `${f.name} ${newtons(f.n)} N`;
    const fade = o * clamp01(grow * 1.5);
    if (f.kind === 'tension' && Math.abs(dx) >= 0.3)
      // A cable runs on past the tip of its tension: the label goes under it.
      labels.push(
        <Text key={`t-${i}`} x={tip[0] + Math.sign(dx) * 14} y={tip[1] + 16} anchor={dx > 0 ? 'start' : 'end'} color={color} opacity={fade}>
          {text}
        </Text>,
      );
    else if (Math.abs(dx) < 0.3)
      labels.push(
        <Text key={`t-${i}`} x={tip[0]} y={tip[1] + (dy > 0 ? 24 : -22)} color={color} opacity={fade}>
          {text}
        </Text>,
      );
    else
      labels.push(
        <Text key={`t-${i}`} x={tip[0] + Math.sign(dx) * 14} y={tip[1] + dy * 14} anchor={dx > 0 ? 'start' : 'end'} color={color} opacity={fade}>
          {text}
        </Text>,
      );
    // The two parts of a slanted force, head to tail: across first, then up or down to its tip.
    const [fx, fy] = [f.n * Math.cos(rad(f.angle)), f.n * Math.sin(rad(f.angle))];
    const split = Math.abs(fx) > 0.02 * f.n && Math.abs(fy) > 0.02 * f.n ? comps * fade : 0;
    if (split > 0) {
      const corner: [number, number] = [tip[0], cy];
      out.push(
        <g key={`c-${i}`}>
          <Part x={cx} y={cy} len={Math.abs(tip[0] - cx)} turn={fx > 0 ? 0 : 180} color={color} opacity={split} />
          <Part x={corner[0]} y={corner[1]} len={Math.abs(tip[1] - cy)} turn={fy > 0 ? 90 : -90} color={color} opacity={split} />
        </g>,
      );
      labels.push(
        <Text key={`cx-${i}`} x={(cx + corner[0]) / 2 + Math.sign(fx) * half[0] * 0.5} y={cy + (fy > 0 ? 24 : -24)} color={color} size={20} opacity={split}>
          {`${newtons(Math.abs(fx))} N`}
        </Text>,
        <Text key={`cy-${i}`} x={corner[0] + Math.sign(fx) * 14} y={(cy + tip[1]) / 2 + 14} anchor={fx > 0 ? 'start' : 'end'} color={color} size={20} opacity={split}>
          {`${newtons(Math.abs(fy))} N`}
        </Text>,
      );
    }
  }

  // The net force, with the lines that complete the parallelogram of two forces.
  if (net > 0) {
    const len = state.net.n * fs;
    const [dx, dy] = dir(state.net.angle);
    const tip: [number, number] = [cx + dx * len, cy + dy * len];
    if (len >= 1) {
      if (tips.length === 2) for (const [i, t] of tips.entries()) out.push(<line key={`p-${i}`} x1={t[0]} y1={t[1]} x2={tip[0]} y2={tip[1]} stroke={NET} strokeWidth={2} strokeDasharray="3 7" opacity={0.8 * net} />);
      out.push(<Arrow key="net" x={cx} y={cy} len={len} turn={state.net.angle} color={NET} opacity={net} />);
      labels.push(
        <Text key="net-t" x={tip[0] + (dx >= 0 ? 14 : -14)} y={tip[1] + dy * 16 - 6} anchor={dx >= 0 ? 'start' : 'end'} color={NET} opacity={net}>
          {`Net force ${newtons(state.net.n)} N`}
        </Text>,
      );
      // Its direction, measured from east.
      const a = state.net.angle;
      if (Math.abs(a % 90) > 0.5) {
        const r = 74;
        const mid = dir(a / 2);
        out.push(
          <g key="net-a" opacity={net}>
            <path d={`M ${cx + r} ${cy} A ${r} ${r} 0 0 ${a > 0 ? 0 : 1} ${cx + dx * r} ${cy + dy * r}`} fill="none" stroke={NET} strokeWidth={3} />
            <Text x={cx + mid[0] * (r + 36)} y={cy + mid[1] * (r + 36)} color={NET} size={21}>
              {`${short(Math.abs(a))}°`}
            </Text>
          </g>,
        );
      }
    } else {
      const low = Math.max(cy + half[1], ...tips.map((t) => t[1]));
      labels.push(
        <Text key="net-t" x={cx} y={low + 58} color={NET} opacity={net}>
          Net force 0 N
        </Text>,
      );
    }
  }

  // The velocity arrow runs beside the net force, a little to its right.
  const speed = Math.hypot(state.v[0], state.v[1]);
  if (vel > 0 && speed >= 0.05) {
    const turn = (Math.atan2(state.v[1], state.v[0]) * 180) / Math.PI;
    const side = dir(turn - 90);
    out.push(<Arrow key="v" x={cx + side[0] * 40} y={cy + side[1] * 40} len={speed * vs} turn={turn} color={VELOCITY} weight={6} opacity={vel} />);
  }

  const f = st?.focus.body ?? 0;
  out.push(
    <g key="body" style={f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${tone})` } : undefined}>
      {hung ? (
        <>
          <rect x={cx - half[0]} y={cy - half[1]} width={2 * half[0]} height={2 * half[1]} rx={10} fill="#1b1846" stroke={tone} strokeWidth={3} />
          <rect x={cx - half[0]} y={cy - half[1]} width={2 * half[0]} height={2 * half[1]} rx={10} fill={tone} fillOpacity={0.3} />
        </>
      ) : (
        <>
          <circle cx={cx} cy={cy} r={half[0]} fill="#1b1846" stroke={tone} strokeWidth={3} />
          <circle cx={cx} cy={cy} r={half[0]} fill={tone} fillOpacity={0.3} />
        </>
      )}
      <Text x={cx} y={cy} size={hung ? 21 : 15} weight={700}>
        {el.body.label ?? `${short(el.body.mass)} kg`}
      </Text>
    </g>,
  );
  out.push(<g key="labels">{labels}</g>);

  // The numbers of the motion, at the top left (in the corner of a floor seen from above).
  const rows: Array<[string, string, number]> = [];
  if (vel > 0 || readout > 0) rows.push([speed >= 0.05 ? `v = ${live(speed)} m/s` : 'at rest', VELOCITY, Math.max(vel, readout)]);
  if (readout > 0) rows.push([`a = ${Math.hypot(state.a[0], state.a[1]).toFixed(2)} m/s²`, INK2, readout]);
  rows.forEach(([text, color, o], i) =>
    out.push(
      <Text key={`row-${i}`} x={hung ? 0 : X(x0) + 18} y={(hung ? (el.label ? 54 : 16) : Y(y1) + 30) + i * 32} anchor="start" color={color} opacity={o}>
        {text}
      </Text>,
    ),
  );

  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time} opacity={clock} />);
  if (state.note)
    out.push(
      <g key="note">
        <rect x={w / 2 - 120} y={h - 62} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={h - 42.5} size={19} color="#fff">
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
