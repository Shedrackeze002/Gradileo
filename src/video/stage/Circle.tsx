/**
 * Bodies that go round a circle (src/video/circle.ts works out the motion and the forces). The
 * velocity is green and lies along the tangent, as in every physics video; the acceleration and
 * the net force are yellow and point to the centre; the force that does the turning keeps its own
 * colour (tension violet, friction red, the normal force blue), and on an upright circle the
 * weight is pink. A body that is let go leaves along the tangent, and its trail shows it.
 */
import type { ReactElement } from 'react';
import type { CircleEl, Tone } from '../script.ts';
import { circleAt, type CircleForce } from '../circle.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, BODY_TONES, clamp01, Clock, FONT, INK2, live, NET, short, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK3 } from './Triangle.tsx';

const TRACK = '#bcd9ff';
const ROPE = 'rgb(201 198 232 / 0.8)';
const COLOR: Record<CircleForce['kind'], string> = { tension: TONES.brand, friction: TONES.bad, normal: TONES.adj, weight: TONES.hyp };
const newtons = (n: number) => (Math.abs(n) >= 999.5 || Math.abs(n - Math.round(n)) < 0.005 ? String(Math.round(n) + 0) : live(n));
const figures = (n: number) => (Math.abs(n) >= 99.95 ? String(Math.round(n)) : Math.abs(n) >= 9.995 ? n.toFixed(1) : n.toFixed(2));
/** Where a label goes beside a point, given the way it is pushed off from it: to one side, or over or under it. */
const beside = (x: number, y: number, dx: number, dy: number, gap: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } =>
  Math.abs(dx) >= 0.35 ? { x: x + dx * gap, y: y + dy * gap, anchor: dx > 0 ? 'start' : 'end' } : { x: x + dx * gap, y: y + Math.sign(dy || 1) * (gap + 6), anchor: 'middle' };

export function CircleView({ el, st, w, h, plays, thumb = false }: { el: CircleEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; /** On a thumbnail: no panel under a level surface, and no list of numbers. */ thumb?: boolean }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = circleAt(el, plays ?? st?.plays ?? []);
  const first = circleAt(el);
  const part = (name: string) => ownPart(st, name);
  const [vel, acc, force, net, radius, tangent, trail, strobe, readout, period, meter, clock, turns] = ['velocity', 'accel', 'force', 'net', 'radius', 'tangent', 'trail', 'strobe', 'readout', 'period', 'meter', 'clock', 'turns'].map(part);
  const out: ReactElement[] = [];
  const labels: ReactElement[] = [];
  // On an upright circle the forces change all the way round, and their names would run into one another beside the
  // arrows: they are listed at the top left instead, each in the colour of its arrow.
  const beside_ = !el.vertical;

  // One scale for the whole picture: metres from the centre of the circle to pixels.
  const top = el.label ? 30 : 0;
  const reach = el.span ?? Math.max(...el.bodies.map((b) => b.r), el.disc ?? 0) * 1.5;
  const S = (h - 20 - top) / 2 / reach;
  const cx = w / 2 + (el.shift ?? 0);
  const cy = top + (h - top) / 2;
  const X = (x: number) => cx + x * S;
  const Y = (y: number) => cy - y * S;
  const starts = Object.values(first.bodies);
  const fs = el.forceScale ?? 90 / Math.max(1e-9, ...starts.flatMap((b) => [b.net.n, ...b.forces.map((f) => f.n)]));
  const vs = el.velocityScale ?? 90 / Math.max(1e-9, ...starts.map((b) => b.speed));
  const as = el.accelScale ?? 70 / Math.max(1e-9, ...starts.map((b) => b.ac));
  const toneOf = (i: number): string => TONES[(el.bodies[i].tone ?? BODY_TONES[i % BODY_TONES.length]) as Tone];

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );

  // A level surface seen from above is a panel; an upright circle hangs from a pin in the open.
  if (!el.vertical && !thumb) out.push(<rect key="floor" x={0} y={top} width={w} height={h - top} rx={14} fill="rgb(77 163 255 / 0.07)" stroke="rgb(188 217 255 / 0.3)" strokeWidth={1.5} />);
  const scene: ReactElement[] = [];
  if (el.disc) {
    const turn = -(state.bodies[el.bodies[0].id].angle - (el.bodies[0].at ?? 0));
    scene.push(
      <g key="disc" transform={`rotate(${turn} ${cx} ${cy})`}>
        <circle cx={cx} cy={cy} r={el.disc * S} fill="rgb(188 217 255 / 0.1)" stroke={TRACK} strokeOpacity={0.55} strokeWidth={3} />
        {[0, 45, 90, 135].map((a) => (
          <line key={a} x1={cx - el.disc! * S} y1={cy} x2={cx + el.disc! * S} y2={cy} stroke={TRACK} strokeOpacity={0.22} strokeWidth={2} transform={`rotate(${a} ${cx} ${cy})`} />
        ))}
      </g>,
    );
  }
  for (const r of new Set(el.bodies.map((b) => b.r))) {
    if (el.by === 'friction') scene.push(<circle key={`road-${r}`} cx={cx} cy={cy} r={r * S} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth={52} />);
    if (el.by === 'track') scene.push(<circle key={`track-${r}`} cx={cx} cy={cy} r={r * S + 20} fill="none" stroke={TRACK} strokeOpacity={0.7} strokeWidth={5} />);
    scene.push(<circle key={`path-${r}`} cx={cx} cy={cy} r={r * S} fill="none" stroke={INK3} strokeWidth={2} strokeDasharray="5 8" opacity={el.by === 'track' ? 0.35 : 0.8} />);
  }
  scene.push(<circle key="pin" cx={cx} cy={cy} r={el.by === 'string' || el.disc ? 6 : 3.5} fill={el.by === 'string' ? ROPE : INK3} />);

  const balls: ReactElement[] = [];
  el.bodies.forEach((b, i) => {
    const s = state.bodies[b.id];
    const tone = toneOf(i);
    const [bx, by] = [X(s.x), Y(s.y)];
    // On the screen: the way it is going, and the way out from the centre.
    const t: [number, number] = s.speed > 1e-9 ? [s.v[0] / s.speed, -s.v[1] / s.speed] : [1, 0];
    const far = Math.hypot(s.x, s.y) || 1;
    const o: [number, number] = [s.x / far, -s.y / far];
    const half = b.shape === 'car' ? 24 : 16;

    if (trail > 0 && s.trail.length > 1) scene.push(<polyline key={`trail-${b.id}`} points={s.trail.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')} fill="none" stroke={tone} strokeWidth={3.5} strokeLinecap="round" strokeDasharray="2 9" opacity={0.8 * trail} />);
    if (strobe > 0)
      s.marks.forEach((m, mi) => {
        const [mx, my] = [X(m.x), Y(m.y)];
        // The mark it has only just left would sit under it.
        if (Math.hypot(mx - bx, my - by) < half + 6) return;
        scene.push(
          <g key={`mark-${b.id}-${mi}`} opacity={0.42 * strobe}>
            <circle cx={mx} cy={my} r={9} fill={tone} />
            {vel > 0 && <Arrow x={mx} y={my} len={Math.hypot(m.v[0], m.v[1]) * vs} turn={(Math.atan2(m.v[1], m.v[0]) * 180) / Math.PI} color={VELOCITY} weight={5} />}
            {acc > 0 && <Arrow x={mx} y={my} len={Math.hypot(m.a[0], m.a[1]) * as} turn={(Math.atan2(m.a[1], m.a[0]) * 180) / Math.PI} color={NET} weight={5} />}
          </g>,
        );
      });
    if (el.by === 'string' && !s.free) scene.push(<line key={`string-${b.id}`} x1={cx} y1={cy} x2={bx} y2={by} stroke={ROPE} strokeWidth={3} />);
    if (radius > 0 && !s.free) {
      if (el.by !== 'string') scene.push(<line key={`r-${b.id}`} x1={cx} y1={cy} x2={bx} y2={by} stroke={INK2} strokeWidth={2} strokeDasharray="6 6" opacity={radius} />);
      const at = beside((cx + bx) / 2, (cy + by) / 2, t[0], t[1], 14);
      labels.push(
        <Text key={`rt-${b.id}`} x={at.x} y={at.y} anchor={at.anchor} color={INK2} size={20} opacity={radius}>
          {`r = ${short(b.r)} m`}
        </Text>,
      );
    }
    if (tangent > 0) scene.push(<line key={`tan-${b.id}`} x1={bx - t[0] * 150} y1={by - t[1] * 150} x2={bx + t[0] * 230} y2={by + t[1] * 230} stroke={VELOCITY} strokeWidth={2} strokeDasharray="7 7" opacity={0.6 * tangent} />);

    const arrows: ReactElement[] = [];
    // Two real forces along one line (the string and the weight, at the top and the bottom) are drawn side by side.
    const along = (f: CircleForce): [number, number] => [Math.cos((f.angle * Math.PI) / 180), -Math.sin((f.angle * Math.PI) / 180)];
    const lined = s.forces.length === 2 ? Math.max(0, (Math.abs(along(s.forces[0])[0] * along(s.forces[1])[0] + along(s.forces[0])[1] * along(s.forces[1])[1]) - 0.7) / 0.3) : 0;
    if (force > 0)
      s.forces.forEach((f, fi) => {
        if (f.n * fs < 1) return;
        const d = along(f);
        const side = f.kind === 'weight' ? 1 : -1;
        const [ax, ay] = [bx + t[0] * side * 11 * lined, by + t[1] * side * 11 * lined];
        const len = Math.max(14, f.n * fs);
        arrows.push(<Arrow key={`f-${fi}`} x={ax} y={ay} len={len} turn={f.angle} color={COLOR[f.kind]} opacity={force} />);
        const text = `${f.name} ${newtons(f.n)} N`;
        // The weight is named under its tip; the turning force beside its middle, behind the body.
        const at = f.kind === 'weight' ? { x: ax + t[0] * 12 * lined, y: ay + len + 22, anchor: (lined > 0.5 ? (t[0] > 0 ? 'start' : 'end') : 'middle') as 'start' | 'middle' | 'end' } : beside(ax + d[0] * Math.max(len * 0.55, 58), ay + d[1] * Math.max(len * 0.55, 58), -t[0], -t[1], 24);
        if (beside_)
          labels.push(
          <Text key={`ft-${b.id}-${fi}`} x={at.x} y={at.y} anchor={at.anchor} color={COLOR[f.kind]} opacity={force}>
            {text}
          </Text>,
        );
      });
    if (net > 0 && s.net.n * fs >= 1) {
      const len = Math.max(14, s.net.n * fs);
      const d: [number, number] = [Math.cos((s.net.angle * Math.PI) / 180), -Math.sin((s.net.angle * Math.PI) / 180)];
      arrows.push(<Arrow key="net" x={bx} y={by} len={len} turn={s.net.angle} color={NET} opacity={net} />);
      const at = beside(bx + d[0] * Math.max(len * 0.55, 58), by + d[1] * Math.max(len * 0.55, 58), force > 0.5 ? t[0] : -t[0], force > 0.5 ? t[1] : -t[1], 24);
      if (beside_)
        labels.push(
        <Text key={`nt-${b.id}`} x={at.x} y={at.y} anchor={at.anchor} color={NET} opacity={net}>
          {`Net force ${newtons(s.net.n)} N`}
        </Text>,
      );
    }
    if (acc > 0 && s.ac * as >= 1) {
      const size = Math.hypot(s.a[0], s.a[1]);
      const len = Math.max(14, size * as);
      const turn = (Math.atan2(s.a[1], s.a[0]) * 180) / Math.PI;
      const d: [number, number] = [Math.cos((turn * Math.PI) / 180), -Math.sin((turn * Math.PI) / 180)];
      arrows.push(<Arrow key="a" x={bx} y={by} len={len} turn={turn} color={NET} weight={7} opacity={acc} />);
      const at = beside(bx + d[0] * Math.max(len * 0.55, 58), by + d[1] * Math.max(len * 0.55, 58), -t[0], -t[1], 24);
      if (beside_)
        labels.push(
        <Text key={`at-${b.id}`} x={at.x} y={at.y} anchor={at.anchor} color={NET} opacity={acc}>
          {`a = ${figures(size)} m/s²`}
        </Text>,
      );
    }
    if (vel > 0 && s.speed * vs >= 1) {
      const len = s.speed * vs;
      arrows.push(<Arrow key="v" x={bx} y={by} len={len} turn={(Math.atan2(s.v[1], s.v[0]) * 180) / Math.PI} color={VELOCITY} weight={7} opacity={vel} />);
      const at = beside(bx + t[0] * (len + 4) + o[0] * 8, by + t[1] * (len + 4) + o[1] * 8, t[0], t[1], 12);
      if (beside_)
        labels.push(
        <Text key={`vt-${b.id}`} x={at.x} y={at.y} anchor={at.anchor} color={VELOCITY} opacity={vel}>
          {`${figures(s.speed)} m/s`}
        </Text>,
      );
    }

    const f = st?.focus[b.id] ?? 0;
    const name = b.label ?? `${short(b.mass)} kg`;
    const inside = name.length <= 2;
    balls.push(
      <g key={b.id}>
        {arrows}
        <g style={f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${tone})` } : undefined}>
          {b.shape === 'car' ? (
            <g transform={`translate(${bx} ${by}) rotate(${(Math.atan2(t[1], t[0]) * 180) / Math.PI})`}>
              <rect x={-24} y={-13} width={48} height={26} rx={8} fill="#1b1846" stroke={tone} strokeWidth={3} />
              <rect x={-24} y={-13} width={48} height={26} rx={8} fill={tone} fillOpacity={0.35} />
              <rect x={4} y={-9} width={10} height={18} rx={3} fill={tone} fillOpacity={0.7} />
            </g>
          ) : (
            <>
              <circle cx={bx} cy={by} r={16} fill="#1b1846" stroke={tone} strokeWidth={3} />
              <circle cx={bx} cy={by} r={16} fill={tone} fillOpacity={0.35} />
            </>
          )}
        </g>
      </g>,
    );
    if (s.free) {
      // Let go, it trails its name behind it, clear of its velocity arrow.
      if (name) {
        const at = beside(bx - t[0] * (half + 2), by - t[1] * (half + 2), -t[0], -t[1], 10);
        labels.push(
          <Text key={`name-${b.id}`} x={at.x} y={at.y} anchor={at.anchor} size={19} color={tone}>
            {name}
          </Text>,
        );
      }
    } else if (inside && b.shape !== 'car')
      labels.push(
        <Text key={`name-${b.id}`} x={bx} y={by} size={17} weight={700}>
          {name}
        </Text>,
      );
    else {
      // Its name sits outside the circle, clear of the arrows that point inwards and along the tangent.
      const at = beside(bx + o[0] * (half + 4) - t[0] * 10, by + o[1] * (half + 4) - t[1] * 10, o[0] - t[0] * 0.4, o[1] - t[1] * 0.4, 12);
      labels.push(
        <Text key={`name-${b.id}`} x={at.x} y={at.y} anchor={at.anchor} size={19} color={tone}>
          {name}
        </Text>,
      );
    }
  });
  const clip = `circle-${el.id}`;
  out.push(
    <g key="scene" clipPath={el.vertical || thumb ? undefined : `url(#${clip})`}>
      {!el.vertical && !thumb && (
        <clipPath id={clip}>
          <rect x={0} y={top} width={w} height={h - top} rx={14} />
        </clipPath>
      )}
      {scene}
      {balls}
      {labels}
    </g>,
  );

  // The numbers of the motion, in the top left corner: a row for each body when there are several.
  const rows: Array<[string, string, number]> = [];
  el.bodies.forEach((b, i) => {
    const s = state.bodies[b.id];
    const who = el.bodies.length > 1 ? `${b.label ?? b.id}: ` : '';
    if (!beside_ && !thumb) {
      if (vel > 0) rows.push([`${who}Speed ${figures(s.speed)} m/s`, VELOCITY, vel]);
      for (const f of s.forces) if (force > 0) rows.push([`${who}${f.name} ${newtons(f.n)} N`, COLOR[f.kind], force]);
      if (net > 0) rows.push([`${who}Net force ${newtons(s.net.n)} N`, NET, net]);
      if (acc > 0) rows.push([`${who}a = ${figures(Math.hypot(s.a[0], s.a[1]))} m/s²`, NET, acc]);
    }
    if (readout > 0) rows.push([`${who}v = ${figures(s.speed)} m/s`, el.bodies.length > 1 ? toneOf(i) : VELOCITY, readout]);
    if (readout > 0 && !s.free) rows.push([`${who}a = ${figures(s.ac)} m/s²`, el.bodies.length > 1 ? toneOf(i) : NET, readout]);
    if (period > 0 && !s.free) rows.push([`${who}T = ${figures(s.period)} s`, el.bodies.length > 1 ? toneOf(i) : INK2, period]);
  });
  rows.forEach(([text, color, o], i) =>
    out.push(
      <Text key={`row-${i}`} x={el.vertical ? Math.max(0, cx - reach * S - 250) : 18} y={top + (el.vertical ? 16 : 30) + i * 32} anchor="start" color={color} opacity={o}>
        {text}
      </Text>,
    ),
  );

  // The meter: the force the turn needs, beside the greatest the string or the road can give.
  if (meter > 0 && el.limit) {
    const s = state.bodies[el.bodies[0].id];
    const kind = s.forces.find((f) => f.kind !== 'weight');
    const color = kind ? COLOR[kind.kind] : NET;
    const [mx, my, mw] = [18, h - 92, 300];
    const full = el.limit * 1.3;
    const over = s.needed > el.limit + 1e-6;
    out.push(
      <g key="meter" opacity={meter}>
        <Text x={mx} y={my} anchor="start" size={19} color={over ? TONES.bad : color}>
          {s.free ? 'No force towards the centre' : `${kind?.name ?? 'Force'} needed: ${newtons(s.needed)} N`}
        </Text>
        <rect x={mx} y={my + 18} width={mw} height={22} rx={6} fill="rgb(255 255 255 / 0.06)" />
        <rect x={mx} y={my + 18} width={clamp01(s.needed / full) * mw} height={22} rx={6} fill={over ? TONES.bad : color} fillOpacity={0.85} />
        <line x1={mx + (el.limit / full) * mw} y1={my + 12} x2={mx + (el.limit / full) * mw} y2={my + 46} stroke="#fff" strokeWidth={3} strokeLinecap="round" />
        <Text x={mx} y={my + 62} anchor="start" size={18} color={INK2}>
          {`Greatest it can be: ${newtons(el.limit)} N`}
        </Text>
      </g>,
    );
  }

  if (clock > 0) out.push(<Clock key="clock" w={w - 14} time={state.time} opacity={clock} />);
  if (turns > 0)
    out.push(
      <Text key="turns" x={w - 32} y={(clock > 0 ? 62 : 22) + top} anchor="end" size={19} color={INK2} opacity={turns}>
        {`Turns: ${Math.floor(state.bodies[el.bodies[0].id].turns + 1e-6)}`}
      </Text>,
    );
  if (state.note) {
    // In a narrow picture the meter fills the bottom, so the note goes to the top.
    const ny = meter > 0 && w < 700 ? top + 12 : h - 56;
    out.push(
      <g key="note">
        <rect x={w / 2 - 130} y={ny} width={260} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={ny + 19.5} size={19} color="#fff">
          {state.note}
        </Text>
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
