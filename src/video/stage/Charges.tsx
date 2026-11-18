/**
 * Charged bodies on a bench (src/video/charges.ts works out where the electrons are and the
 * forces). A body that shows its charges has red + marks that stay where they are and blue
 * electrons that move: they cross from a cloth to a rod, from a rod to a sphere, or down a wire to
 * the ground, and they lean to one side of a metal sphere when a charged body is near. The
 * electric force on a body is an orange arrow, with its size beside it, and the sum of several is
 * yellow, like every net force. Positive is red and negative is blue throughout.
 */
import type { ReactElement } from 'react';
import type { ChargesEl, Tone } from '../script.ts';
import { ATOM_NUCLEUS, ATOM_SHELLS, chargesAt, peakForce } from '../charges.ts';
import { written } from '../gravity.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Num, Span } from './Gravity.tsx';
import { Arrow, clamp01, FONT, INK2, NET, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

export const POSITIVE = TONES.bad;
export const NEGATIVE = TONES.adj;
const PUSH = TONES.opp;
const METAL = '#c9c6e8';
const rad = (deg: number) => (deg * Math.PI) / 180;

/** An electron: a blue dot with a minus sign on it. */
function Electron({ x, y, r, glow = false }: { x: number; y: number; r: number; glow?: boolean }) {
  return (
    <g style={glow ? { filter: `drop-shadow(0 0 7px ${NEGATIVE})` } : undefined}>
      <circle cx={x} cy={y} r={r} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.5} />
      <line x1={x - r * 0.5} y1={y} x2={x + r * 0.5} y2={y} stroke="#fff" strokeWidth={Math.max(1.6, r * 0.3)} strokeLinecap="round" />
    </g>
  );
}

/** A + mark: a positive charge that stays where it is. */
function Plus({ x, y, r }: { x: number; y: number; r: number }) {
  const [half, weight] = [r * 0.85, Math.max(2.4, r * 0.4)];
  return (
    <g stroke={POSITIVE} strokeWidth={weight} strokeLinecap="round">
      <line x1={x - half} y1={y} x2={x + half} y2={y} />
      <line x1={x} y1={y - half} x2={x} y2={y + half} />
    </g>
  );
}

/** A charge as it is written: "+3.0 μC", "−4 nC", or "neutral" for a body that shows its charges. */
export function chargeText(q: number, unit: string, decimals: number, marked: boolean): string {
  const zero = Math.abs(q) < 0.5 * 10 ** -decimals;
  if (zero) return marked ? 'neutral' : `0 ${unit}`;
  // In elementary charges: "+e", "−2e".
  if (unit === 'e') return `${q > 0 ? '+' : '−'}${Math.abs(q - Math.round(q)) < 1e-9 ? (Math.abs(Math.round(q)) === 1 ? '' : Math.abs(Math.round(q))) : Math.abs(q).toFixed(decimals)}e`;
  return `${q > 0 ? '+' : '−'}${Math.abs(q).toFixed(decimals)} ${unit}`;
}

export function ChargesView({ el, st, w, h, plays, age }: { el: ChargesEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; age?: number }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = chargesAt(el, plays ?? st?.plays ?? [], age ?? st?.age ?? 0);
  const part = (name: string) => ownPart(st, name);
  const [chargePart, force, net, anglePart, distance, vel] = ['charge', 'force', 'net', 'angle', 'distance', 'velocity'].map(part);
  const unit = el.unit ?? 'μC';
  const out: ReactElement[] = [];

  // One scale both ways: the view fills a panel under the label.
  const [x0, x1, y0, y1] = el.view;
  const top = el.label ? 30 : 0;
  const S = Math.min(w / (x1 - x0), (h - top) / (y1 - y0));
  const [pw, ph] = [(x1 - x0) * S, (y1 - y0) * S];
  const [ox, oy] = [(w - pw) / 2, top + (h - top - ph) / 2];
  const X = (x: number) => ox + (x - x0) * S;
  const Y = (y: number) => oy + (y1 - y) * S;
  const clip = `bench-${el.id}`;

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  out.push(
    <g key="bench">
      <defs>
        <clipPath id={clip}>
          <rect x={ox} y={oy} width={pw} height={ph} rx={14} />
        </clipPath>
      </defs>
      <rect x={ox} y={oy} width={pw} height={ph} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />
      {state.floor !== null && (
        <g clipPath={`url(#${clip})`}>
          <rect x={ox} y={Y(state.floor)} width={pw} height={Math.max(0, oy + ph - Y(state.floor))} fill="rgb(255 255 255 / 0.05)" />
          <line x1={ox} y1={Y(state.floor)} x2={ox + pw} y2={Y(state.floor)} stroke={INK3} strokeWidth={2} />
        </g>
      )}
    </g>,
  );

  // Where each body is on the screen, how large it is drawn, and how far it reaches each way.
  const boxes = el.bodies.map((b) => {
    const s = state.bodies[b.id];
    const shape = b.shape ?? 'point';
    const turn = shape === 'rod' || shape === 'cloth' ? rad(b.turn ?? 0) : 0;
    const L = shape === 'point' ? (b.radius !== undefined ? b.radius * S : b.test ? 11 : 20) : (b.radius ?? 0) * S;
    const T = shape === 'rod' || shape === 'cloth' ? (b.thick ?? (b.radius ?? 0) * (shape === 'cloth' ? 0.6 : 0.2)) * S : L;
    const [ex, ey] = [Math.abs(L * Math.cos(turn)) + Math.abs(T * Math.sin(turn)), Math.abs(L * Math.sin(turn)) + Math.abs(T * Math.cos(turn))];
    /** How far the edge is from the centre, in a direction on the screen. */
    const edge = (dx: number, dy: number) => {
      if (shape !== 'rod' && shape !== 'cloth') return L;
      const [u, v] = [dx * Math.cos(turn) - dy * Math.sin(turn), dx * Math.sin(turn) + dy * Math.cos(turn)];
      return 1 / Math.hypot(u / L, v / T);
    };
    const tone: Tone = b.tone ?? (shape === 'rod' ? 'brand' : 'theta');
    const sign = Math.abs(s.charge) < 1e-9 ? INK2 : s.charge > 0 ? POSITIVE : NEGATIVE;
    return { b, s, shape, turn, L, T, ex, ey, edge, c: [X(s.x), Y(s.y)] as [number, number], color: TONES[tone], sign, mark: Math.max(5.5, Math.min(10, shape === 'sphere' ? L * 0.13 : shape === 'atom' ? L * 0.085 : T * 0.34)) };
  });
  type Box = (typeof boxes)[number];

  // The stands and the wires go behind the bodies.
  for (const k of boxes) {
    if (k.shape !== 'sphere') continue;
    if (k.b.stand !== false && state.floor !== null) {
      const foot = Y(state.floor);
      out.push(
        <g key={`stand-${k.b.id}`}>
          <rect x={k.c[0] - 5} y={k.c[1] + k.L - 2} width={10} height={Math.max(0, foot - k.c[1] - k.L + 2)} fill="#5b5786" />
          <rect x={k.c[0] - k.L * 0.5} y={foot - 9} width={k.L} height={9} rx={3} fill="#5b5786" />
        </g>,
      );
    }
    if (k.s.wire > 0) {
      const pts = k.s.wirePath.map(([x, y]): [number, number] => [X(x), Y(y)]);
      const length = pts.slice(1).reduce((n, q, i) => n + Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]), 0);
      const end = pts[pts.length - 1];
      const earth = clamp01((k.s.wire - 0.7) / 0.3);
      out.push(
        <g key={`wire-${k.b.id}`} stroke={METAL} strokeLinecap="round" fill="none">
          <polyline points={pts.map((q) => q.join(',')).join(' ')} strokeWidth={3} strokeDasharray={`${(length * k.s.wire).toFixed(1)} ${(length + 10).toFixed(1)}`} strokeLinejoin="round" />
          <g opacity={earth} strokeWidth={3}>
            <line x1={end[0] - 16} y1={end[1]} x2={end[0] + 16} y2={end[1]} />
            <line x1={end[0] - 10} y1={end[1] + 7} x2={end[0] + 10} y2={end[1] + 7} />
            <line x1={end[0] - 4} y1={end[1] + 14} x2={end[0] + 4} y2={end[1] + 14} />
          </g>
        </g>,
      );
    }
  }

  // The bodies, with their + marks and the electrons at rest on them.
  for (const k of boxes) {
    const f = st?.focus[k.b.id] ?? 0;
    const glow = f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${k.shape === 'point' ? k.sign : k.color})` } : undefined;
    let shape: ReactElement;
    if (k.shape === 'point') {
      const half = k.L * 0.45;
      shape = (
        <g>
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill="#1b1846" stroke={k.sign} strokeWidth={3} strokeDasharray={k.b.test ? '4 4' : undefined} />
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill={k.sign} fillOpacity={0.35} />
          {Math.abs(k.s.charge) > 1e-9 && (
            <g stroke="#fff" strokeWidth={Math.max(2.2, k.L * 0.16)} strokeLinecap="round">
              <line x1={k.c[0] - half} y1={k.c[1]} x2={k.c[0] + half} y2={k.c[1]} />
              {k.s.charge > 0 && <line x1={k.c[0]} y1={k.c[1] - half} x2={k.c[0]} y2={k.c[1] + half} />}
            </g>
          )}
        </g>
      );
    } else if (k.shape === 'atom') {
      shape = (
        <g>
          {ATOM_SHELLS.map((r, i) => (
            <circle key={i} cx={k.c[0]} cy={k.c[1]} r={r * k.L} fill="none" stroke={INK3} strokeWidth={2} strokeOpacity={i === 0 || (k.b.pairs ?? 0) > 2 || k.s.minus.length > 2 ? 0.8 : 0.3} />
          ))}
          <circle cx={k.c[0]} cy={k.c[1]} r={ATOM_NUCLEUS * k.L} fill="#1b1846" stroke={POSITIVE} strokeWidth={2.5} />
          <circle cx={k.c[0]} cy={k.c[1]} r={ATOM_NUCLEUS * k.L} fill={POSITIVE} fillOpacity={0.22} />
        </g>
      );
    } else if (k.shape === 'sphere') {
      shape = (
        <g>
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill="#1b1846" stroke={METAL} strokeWidth={3} />
          <circle cx={k.c[0]} cy={k.c[1]} r={k.L} fill="#fff" fillOpacity={0.06} />
        </g>
      );
    } else {
      const cloth = k.shape === 'cloth';
      shape = (
        <g transform={`translate(${k.c[0]} ${k.c[1]}) rotate(${-(k.b.turn ?? 0)})`}>
          <rect x={-k.L} y={-k.T} width={2 * k.L} height={2 * k.T} rx={cloth ? 16 : k.T * 0.6} fill="#1b1846" />
          <rect x={-k.L} y={-k.T} width={2 * k.L} height={2 * k.T} rx={cloth ? 16 : k.T * 0.6} fill={k.color} fillOpacity={cloth ? 0.16 : 0.24} stroke={k.color} strokeWidth={3} strokeDasharray={cloth ? '1 7' : undefined} strokeLinecap="round" />
        </g>
      );
    }
    out.push(
      <g key={`b-${k.b.id}`} style={glow}>
        {shape}
        {k.s.plus.map(([x, y], i) => (
          <Plus key={`p${i}`} x={X(x)} y={Y(y)} r={k.shape === 'atom' ? Math.max(4, k.mark * 0.6) : k.mark} />
        ))}
        {k.s.minus.map(([x, y], i) => (
          <Electron key={`e${i}`} x={X(x)} y={Y(y)} r={k.mark} />
        ))}
      </g>,
    );
  }
  out.push(
    <g key="flying">
      {state.flying.map(([x, y], i) => (
        <Electron key={i} x={X(x)} y={Y(y)} r={9} glow />
      ))}
    </g>,
  );

  // The distance between the centres of each pair that is marked, on the side of the line of centres that is lower on the screen.
  const labels: ReactElement[] = [];
  const find = (id: string) => boxes.find((k) => k.b.id === id);
  const spans = (el.spans ?? (boxes.length > 1 ? [[boxes[0].b.id, boxes[1].b.id] as [string, string]] : [])).map(([a, b]) => [find(a), find(b)]).filter((pair): pair is [Box, Box] => !!pair[0] && !!pair[1]);
  if (distance > 0)
    spans.forEach(([a, b], i) => {
      const d = Math.hypot(b.c[0] - a.c[0], b.c[1] - a.c[1]) || 1;
      const u: [number, number] = [(b.c[0] - a.c[0]) / d, (b.c[1] - a.c[1]) / d];
      const n: [number, number] = u[0] >= 0 ? [-u[1], u[0]] : [u[1], -u[0]];
      const length = el.length ?? { metres: 1, symbol: 'm' };
      const metres = Math.hypot(b.s.x - a.s.x, b.s.y - a.s.y);
      if (el.join) {
        // A dashed line from edge to edge, with the distance beside it two thirds of the way along: clear of the arrows on the first body.
        const [ra, rb] = [a.edge(u[0], u[1]) + 4, b.edge(-u[0], -u[1]) + 4];
        const at: [number, number] = [a.c[0] + u[0] * d * 0.66, a.c[1] + u[1] * d * 0.66];
        const level = Math.abs(n[0]) <= 0.7;
        out.push(<line key={`span-${i}`} x1={a.c[0] + u[0] * ra} y1={a.c[1] + u[1] * ra} x2={b.c[0] - u[0] * rb} y2={b.c[1] - u[1] * rb} stroke={INK3} strokeWidth={2} strokeDasharray="5 7" opacity={distance} />);
        labels.push(<Num key={`span-t-${i}`} x={at[0] + n[0] * (level ? 0 : 14)} y={at[1] + n[1] * (level ? 22 : 0)} n={metres / length.metres} unit={length.symbol} figures={el.figures ?? 2} keep anchor={level ? 'middle' : n[0] > 0 ? 'start' : 'end'} color={INK2} opacity={distance} />);
        return;
      }
      const low = Math.max(a.edge(n[0], n[1]), b.edge(n[0], n[1])) + 32;
      const off = (px: number, at: [number, number]): [number, number] => [at[0] + n[0] * px, at[1] + n[1] * px];
      const [from, to] = [off(low, a.c), off(low, b.c)];
      const upright = Math.abs(n[0]) > 0.7;
      out.push(
        <g key={`span-${i}`}>
          <g opacity={0.7 * distance} stroke={INK3} strokeWidth={1.5} strokeDasharray="3 6">
            <line x1={a.c[0]} y1={a.c[1]} x2={off(low + 8, a.c)[0]} y2={off(low + 8, a.c)[1]} />
            <line x1={b.c[0]} y1={b.c[1]} x2={off(low + 8, b.c)[0]} y2={off(low + 8, b.c)[1]} />
          </g>
          <Span a={from} b={to} opacity={distance} />
        </g>,
      );
      const [tx, ty, anchor] = [(from[0] + to[0]) / 2 + n[0] * (upright ? 14 : 22), (from[1] + to[1]) / 2 + n[1] * 22, upright ? (n[0] > 0 ? 'start' : 'end') : 'middle'] as const;
      // A picture that is not to scale has no number to give: the distance is only named.
      if (el.plain)
        labels.push(
          <text key={`span-t-${i}`} x={tx} y={ty} fill={INK} fontSize={24} fontStyle="italic" fontWeight={600} textAnchor={anchor} dominantBaseline="central" opacity={distance} style={{ fontFamily: FONT }}>
            r
          </text>,
        );
      else labels.push(<Num key={`span-t-${i}`} x={tx} y={ty} pre={spans.length === 1 ? 'r = ' : ''} n={metres / length.metres} unit={length.symbol} figures={el.figures ?? 2} keep anchor={anchor} color={INK} opacity={distance} />);
    });

  // The name of each body and its charge, the forces on it, and its velocity.
  const fs = el.forceScale ?? 110 / Math.max(1e-300, peakForce(el));
  const vs = el.velocityScale ?? 60;
  const sources = el.bodies.filter((b) => !b.test).length;
  for (const k of boxes) {
    const at = k.b.labelAt ?? 'above';
    const drawn = !el.pulls || el.pulls.includes(k.b.id);
    const pushes = Object.entries(k.s.from).filter(([, f]) => f.n > 0);
    // The sum is drawn when there is more than one force to add, or when the forces themselves are not shown.
    const summed = drawn && net > 0 && k.s.force.n > 0 && (pushes.length > 1 || force <= 0);
    const level = Math.abs(Math.sin(rad(k.s.force.angle))) < 0.35;
    // A level sum goes over a force that points the same way, where the name of the body is: the name makes room for it.
    const lift = summed && level && force > 0 && pushes.some(([, f]) => Math.abs(((f.angle - k.s.force.angle + 540) % 360) - 180) < 25) ? 24 * net : 0;
    const lines = [k.b.label !== undefined ? { text: k.b.label, color: INK, opacity: 1 } : null, chargePart > 0 ? { text: chargeText(k.s.charge, unit, el.decimals ?? 0, k.b.pairs !== undefined), color: k.sign, opacity: chargePart } : null].filter((l): l is { text: string; color: string; opacity: number } => !!l);
    lines.forEach((l, i) => {
      // The charge is written next to the body, and the name beyond it.
      const row = lines.length - 1 - i;
      const [x, y, anchor] =
        at === 'above'
          ? ([k.c[0], k.c[1] - k.ey - 22 - lift - 28 * row * (lines[1]?.opacity ?? 1), 'middle'] as const)
          : at === 'below'
            ? ([k.c[0], k.c[1] + k.ey + 24 + 28 * i, 'middle'] as const)
            : ([k.c[0] + (at === 'left' ? -1 : 1) * (k.ex + 14), k.c[1] + (lines.length > 1 ? (i === 0 ? -14 : 14) : 0), at === 'left' ? 'end' : 'start'] as const);
      labels.push(
        <Text key={`n-${k.b.id}-${i}`} x={x} y={y} anchor={anchor} color={l.color} opacity={l.opacity}>
          {l.text}
        </Text>,
      );
    });

    const shown: number[] = [];
    /** How many arrows already drawn on this body point nearly the same way. */
    const beside = (angle: number) => shown.filter((a) => Math.abs(((a - angle + 540) % 360) - 180) < 25).length;
    const arrow = (key: string, f: { n: number; angle: number }, color: string, opacity: number, words: string, weight: number) => {
      // A picture that is not to scale keeps its arrows short enough to read as two bodies come together.
      const len = Math.min(el.plain ? 150 : Infinity, Math.max(10, f.n * fs));
      const [dx, dy] = [Math.cos(rad(f.angle)), -Math.sin(rad(f.angle))];
      const flat = Math.abs(dy) < 0.35;
      // A second arrow the same way goes beside the first: over it when they are level, to its left otherwise.
      const lane = beside(f.angle);
      shown.push(f.angle);
      const shift: [number, number] = flat ? [0, -26 * lane] : [-26 * lane, 0];
      const reach = k.edge(dx, dy) + 4;
      // With no room for it before the body it points at, the arrow is drawn behind its own body, pointing into it.
      // In a picture that is not to scale every pull is drawn that way, so that no arrow jumps as two bodies come together.
      let room = Infinity;
      let ahead: Box | undefined;
      for (const o of boxes) {
        const [ux, uy] = [o.c[0] - k.c[0], o.c[1] - k.c[1]];
        const d = Math.hypot(ux, uy) || 1;
        if (o === k || (ux * dx + uy * dy) / d <= 0.94 || d - o.edge(-dx, -dy) - reach >= room) continue;
        [room, ahead] = [d - o.edge(-dx, -dy) - reach, o];
      }
      // The body ahead has an arrow of its own that points back this way, with its size written under it.
      const facing = !!ahead && (!el.pulls || el.pulls.includes(ahead.b.id)) && k.b.id in ahead.s.from;
      const behind = el.plain ? room < Infinity : len > room - 6;
      const start = behind ? -(k.edge(-dx, -dy) + 4 + len) : reach;
      const from: [number, number] = [k.c[0] + dx * start + shift[0], k.c[1] + dy * start + shift[1]];
      const tip: [number, number] = [from[0] + dx * len, from[1] + dy * len];
      out.push(<Arrow key={key} x={from[0]} y={from[1]} len={len} turn={f.angle} color={color} weight={weight} opacity={opacity} />);
      if (el.plain) return;
      const side = dx > 0 ? 'start' : 'end';
      const figures = el.forceFigures ?? 3;
      // Two bodies that pull each other have their sizes written between them; when there is no room for both there, each goes under its own body, on the far side.
      const size = written(f.n, figures, el.notation === 'sci', true);
      const wide = (size.text.length + (size.power !== null ? 5 + String(size.power).length * 0.7 : 0) + 2 + words.length) * 12;
      const outward = flat && !behind && lane === 0 && facing && wide > (room + reach) / 2 - 12;
      const [x, y, anchor] = outward
        ? ([k.c[0] - Math.sign(dx) * 6, from[1] + k.ey + 14, dx > 0 ? 'end' : 'start'] as const)
        : flat
          ? lane > 0
            ? ([tip[0] + Math.sign(dx) * 12, tip[1], side] as const)
            : ([from[0] + Math.sign(dx) * 4, from[1] + 28, side] as const)
          : Math.abs(dx) < 0.35
            ? // Straight up or down: beside the middle of the arrow, to its right (a second one the same way, to its left).
              ([(from[0] + tip[0]) / 2 + (lane > 0 ? -16 : 16), (from[1] + tip[1]) / 2, lane > 0 ? 'end' : 'start'] as const)
            : ([tip[0] + dx * 16, tip[1] + dy * 20, side] as const);
      if (el.forceDecimals !== undefined)
        labels.push(
          <Text key={`${key}-t`} x={x} y={y} anchor={anchor} color={color} opacity={opacity}>
            {`${f.n.toFixed(el.forceDecimals)} N${words}`}
          </Text>,
        );
      else labels.push(<Num key={`${key}-t`} x={x} y={y} anchor={anchor} n={f.n} unit={`N${words}`} figures={figures} keep sci={el.notation === 'sci'} color={color} opacity={opacity} />);
    };
    if (summed && anglePart > 0) {
      const a = k.s.force.angle;
      const [dx, dy] = [Math.cos(rad(a)), -Math.sin(rad(a))];
      const acute = Math.min(Math.abs(a), 180 - Math.abs(a));
      // Measured from the east-west line, on the side the force leans to. The line itself lies under the arrows.
      if (acute > 2 && acute < 88) {
        const west = dx < 0 ? -1 : 1;
        const r = k.edge(dx, dy) + 44;
        const mid = rad(west > 0 ? (Math.sign(a) * acute) / 2 : Math.sign(a) * (180 - acute / 2));
        out.push(<line key={`east-${k.b.id}`} x1={k.c[0]} y1={k.c[1]} x2={k.c[0] + west * (r + 40)} y2={k.c[1]} stroke={INK3} strokeWidth={2} strokeDasharray="5 7" opacity={anglePart} />);
        labels.push(
          <g key={`angle-${k.b.id}`} opacity={anglePart}>
            <path d={`M ${k.c[0] + west * r} ${k.c[1]} A ${r} ${r} 0 0 ${(west > 0) === (dy < 0) ? 0 : 1} ${k.c[0] + dx * r} ${k.c[1] + dy * r}`} fill="none" stroke={NET} strokeWidth={2.5} />
            <Text x={k.c[0] + Math.cos(mid) * (r + 34)} y={k.c[1] - Math.sin(mid) * (r + 20)} color={NET} size={20}>
              {`${acute.toFixed(el.angleDecimals ?? 1)}°`}
            </Text>
          </g>,
        );
      }
    }
    if (drawn && force > 0)
      for (const [id, f] of pushes) {
        const by = find(id)?.b.label;
        arrow(`f-${k.b.id}-${id}`, f, PUSH, force, pushes.length > 1 && sources > 2 && by !== undefined ? ` from ${by}` : '', 9);
      }
    if (summed) arrow(`net-${k.b.id}`, k.s.force, NET, net, '', 10);
    if (vel > 0 && k.b.mass && k.s.speed * vs >= 1) {
      const len = Math.max(12, k.s.speed * vs);
      const [dx, dy] = [k.s.v[0] / k.s.speed, -k.s.v[1] / k.s.speed];
      const reach = k.edge(dx, dy) + 4;
      const flat = Math.abs(dy) < 0.35;
      out.push(<Arrow key={`v-${k.b.id}`} x={k.c[0] + dx * reach} y={k.c[1] + dy * reach - (flat ? 26 * beside((Math.atan2(k.s.v[1], k.s.v[0]) * 180) / Math.PI) : 0)} len={len} turn={(Math.atan2(k.s.v[1], k.s.v[0]) * 180) / Math.PI} color={VELOCITY} weight={7} opacity={vel} />);
    }
  }
  out.push(<g key="labels">{labels}</g>);

  // The note of a phase, in the top left corner of the bench: the table and the stands are at the bottom.
  if (state.note) {
    const wide = Math.max(160, state.note.length * 10.5 + 40);
    out.push(
      <g key="note">
        <rect x={ox + 14} y={oy + 14} width={wide} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={ox + 14 + wide / 2} y={oy + 33.5} size={19} color="#fff">
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
