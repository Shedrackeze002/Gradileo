/**
 * Bodies in space that attract one another (src/video/gravity.ts works out the forces). A planet
 * is drawn to scale, so a satellite sits as close to its surface as it really is, and the distance
 * that matters, between the centres, is marked under the picture. The pull on each body is a pink
 * arrow, as weight is in every physics video, with its size beside it: the two arrows of a pair
 * are always the same length. The field of the first body is a ring of thin arrows that shorten
 * with the square of the distance. A body in orbit, or one thrown from a mountain, leaves a dotted
 * trail, and its velocity is green, as in every physics video.
 */
import type { ReactElement } from 'react';
import type { GravityEl, Tone } from '../script.ts';
import { BIG_G, fieldStrength, gravityAt, written } from '../gravity.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, BODY_TONES, clamp01, Clock, FONT, INK2, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

const PULL = TONES.hyp;
const FIELD = '#bcd9ff';
const rad = (deg: number) => (deg * Math.PI) / 180;
const minus = (s: string) => s.replace('-', '−');
const frac = (x: number) => x - Math.floor(x);

/** A number with its unit, with the power of ten raised when it is in scientific notation ("6.53 × 10³ N"). */
function Num({ x, y, pre = '', n, unit, figures = 3, sci = false, color = INK, size = 21, anchor = 'middle', opacity = 1 }: { x: number; y: number; pre?: string; n: number; unit: string; figures?: number; sci?: boolean; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; opacity?: number }) {
  const { text, power } = written(n, figures, sci);
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={600} textAnchor={anchor} dominantBaseline="central" opacity={opacity} style={{ fontFamily: FONT, fontVariantNumeric: 'tabular-nums', paintOrder: 'stroke', stroke: 'rgb(13 12 36 / 0.85)', strokeWidth: 4, strokeLinejoin: 'round' }}>
      {`${pre}${minus(text)}`}
      {power !== null && (
        <>
          {' × 10'}
          <tspan dy="-0.6em" fontSize="0.7em">
            {minus(String(power))}
          </tspan>
        </>
      )}
      <tspan dy={power !== null ? '0.42em' : 0}>{` ${unit}`}</tspan>
    </text>
  );
}

/** A dimension line between two points, with a tick at each end. */
function Span({ a, b, opacity }: { a: [number, number]; b: [number, number]; opacity: number }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const n: [number, number] = [(-(b[1] - a[1]) / len) * 7, ((b[0] - a[0]) / len) * 7];
  return (
    <g opacity={opacity} stroke={INK2} strokeWidth={2} strokeLinecap="round">
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
      <line x1={a[0] - n[0]} y1={a[1] - n[1]} x2={a[0] + n[0]} y2={a[1] + n[1]} />
      <line x1={b[0] - n[0]} y1={b[1] - n[1]} x2={b[0] + n[0]} y2={b[1] + n[1]} />
    </g>
  );
}

export function GravityView({ el, st, w, h, plays }: { el: GravityEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = gravityAt(el, plays ?? st?.plays ?? []);
  const first = gravityAt(el);
  const part = (name: string) => ownPart(st, name);
  const force = part('force');
  const distance = part('distance');
  const radius = part('radius');
  const height = part('height');
  const field = part('field');
  const gPart = part('g');
  const [vel, trail, orbit, clock, turns] = ['velocity', 'trail', 'orbit', 'clock', 'turns'].map(part);
  const G = el.G ?? BIG_G;
  const out: ReactElement[] = [];

  // One scale both ways: the view fills a panel of space under the label.
  const [x0, x1, y0, y1] = el.view;
  const top = el.label ? 30 : 0;
  const S = Math.min(w / (x1 - x0), (h - top) / (y1 - y0));
  const [pw, ph] = [(x1 - x0) * S, (y1 - y0) * S];
  const [ox, oy] = [(w - pw) / 2, top + (h - top - ph) / 2];
  const X = (x: number) => ox + (x - x0) * S;
  const Y = (y: number) => oy + (y1 - y) * S;
  const clip = `space-${el.id}`;
  /** Where a label of about that width must be put so that it stays inside the panel. */
  const within = (x: number, anchor: 'start' | 'middle' | 'end', wide: number) => {
    const left = anchor === 'start' ? x : anchor === 'end' ? x - wide : x - wide / 2;
    return x + Math.max(0, ox + 10 - left) - Math.max(0, left + wide - (ox + pw - 10));
  };

  if (el.label)
    out.push(
      <text key="label" x={0} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  const stars = Array.from({ length: 70 }, (_, i) => <circle key={i} cx={ox + frac(Math.sin((i + 1) * 12.9898) * 43758.5453) * pw} cy={oy + frac(Math.sin((i + 1) * 78.233) * 12543.21) * ph} r={0.8 + frac(i * 0.37) * 1.1} fill="#fff" opacity={0.12 + frac(i * 0.61) * 0.3} />);
  out.push(
    <g key="space">
      <defs>
        <clipPath id={clip}>
          <rect x={ox} y={oy} width={pw} height={ph} rx={14} />
        </clipPath>
      </defs>
      <rect x={ox} y={oy} width={pw} height={ph} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />
      {stars}
    </g>,
  );

  // Where each body is on the screen, and how large it is drawn.
  const boxes = el.bodies.map((b, i) => {
    const s = state.bodies[b.id];
    const r = b.radius !== undefined ? b.radius * S : (b.size ?? 16) * Math.cbrt(s.mass / b.mass);
    const tone: Tone = b.tone ?? BODY_TONES[i % BODY_TONES.length];
    return { b, s, c: [X(s.x), Y(s.y)] as [number, number], r, color: TONES[tone], planet: b.radius !== undefined };
  });
  const source = boxes[0];
  const fs = el.forceScale ?? 110 / Math.max(1e-300, ...Object.values(first.bodies).map((b) => b.force.n));
  // The fastest body at the start, or the fastest throw of any clip, has a velocity arrow of 80 pixels.
  const throws = Object.values(el.clips).flatMap((c) => c.phases.flatMap((ph) => Object.values(ph.launch ?? {}).map((v) => Math.hypot(v[0], v[1]))));
  const vs = el.velocityScale ?? 80 / Math.max(1e-300, ...Object.values(first.bodies).map((b) => b.speed), ...throws);

  // The field of the first body: rings of arrows towards it, each as long as the field is strong there.
  if (field > 0 && source) {
    const R = source.b.radius ?? (source.b.size ?? 16) / S;
    const scale = el.fieldScale ?? 56 / fieldStrength(source.s.mass, R, G);
    const far = Math.max(...[x0, x1].flatMap((x) => [y0, y1].map((y) => Math.hypot(x - source.s.x, y - source.s.y))));
    const arrows: ReactElement[] = [];
    for (let k = 0, r = R * 1.3; r < far && k < 12; k++, r *= 1.32) {
      const count = 16;
      const len = Math.max(5, Math.min(scale * fieldStrength(source.s.mass, r, G), (r - R) * S - 4));
      for (let j = 0; j < count; j++) {
        const a = rad((360 * (j + (k % 2) / 2)) / count);
        const [dx, dy] = [Math.cos(a), -Math.sin(a)];
        const [tx, ty] = [source.c[0] + dx * r * S, source.c[1] + dy * r * S];
        const head = Math.min(8, len);
        arrows.push(
          <g key={`${k}-${j}`} transform={`translate(${tx.toFixed(1)} ${ty.toFixed(1)}) rotate(${((Math.atan2(-dy, -dx) * 180) / Math.PI).toFixed(1)})`}>
            {len > head && <line x1={0} y1={0} x2={len - head} y2={0} stroke={FIELD} strokeWidth={2.6} strokeLinecap="round" />}
            <polygon points={`${len},0 ${len - head},4.5 ${len - head},-4.5`} fill={FIELD} />
          </g>,
        );
      }
    }
    out.push(
      <g key="field" clipPath={`url(#${clip})`} opacity={0.75 * field}>
        {arrows}
      </g>,
    );
  }

  // A mountain on the first body, to throw from; the paths of earlier throws, faded; and the trail and the orbit of each body.
  const paths: ReactElement[] = [];
  const line = (pts: Array<[number, number]>) => pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');
  if (el.mountain && source?.planet) {
    const [bx, by, half] = [source.c[0], source.c[1] - source.r, Math.max(10, el.mountain * S * 0.42)];
    paths.push(<polygon key="mountain" points={`${bx - half},${by + 6} ${bx},${by - el.mountain * S + 6} ${bx + half},${by + 6}`} fill="#1b1846" stroke={source.color} strokeWidth={3} strokeLinejoin="round" />);
  }
  if (trail > 0) {
    state.ghosts.forEach((g, i) => paths.push(<polyline key={`ghost-${i}`} points={line(g)} fill="none" stroke={INK2} strokeWidth={3} strokeLinecap="round" strokeDasharray="2 8" opacity={0.5 * trail} />));
    for (const k of boxes) if (k.s.trail.length > 1) paths.push(<polyline key={`trail-${k.b.id}`} points={line(k.s.trail)} fill="none" stroke={k.color} strokeWidth={3.5} strokeLinecap="round" strokeDasharray="2 8" opacity={0.9 * trail} />);
  }
  if (orbit > 0 && source) for (const k of boxes) if (k.b.orbit) paths.push(<circle key={`orbit-${k.b.id}`} cx={source.c[0]} cy={source.c[1]} r={Math.hypot(k.c[0] - source.c[0], k.c[1] - source.c[1])} fill="none" stroke={INK3} strokeWidth={2} strokeDasharray="5 8" opacity={0.85 * orbit} />);
  out.push(
    <g key="paths" clipPath={`url(#${clip})`}>
      {paths}
    </g>,
  );

  // The bodies: a planet to scale, cut off at the edge of the picture, or a small ball.
  for (const k of boxes) {
    const f = st?.focus[k.b.id] ?? 0;
    out.push(
      <g key={`b-${k.b.id}`} clipPath={k.planet ? `url(#${clip})` : undefined}>
        <g style={f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${k.color})` } : undefined}>
          <circle cx={k.c[0]} cy={k.c[1]} r={k.r} fill="#1b1846" stroke={k.color} strokeWidth={3} />
          <circle cx={k.c[0]} cy={k.c[1]} r={k.r} fill={k.color} fillOpacity={0.3} />
          {k.planet && <circle cx={k.c[0]} cy={k.c[1]} r={4} fill={k.color} />}
        </g>
      </g>,
    );
  }

  // Distances: between the centres of the first two bodies, and the radius and the height that add up to it.
  const labels: ReactElement[] = [];
  const other = boxes[1];
  if (source && other) {
    const d = Math.hypot(other.c[0] - source.c[0], other.c[1] - source.c[1]) || 1;
    const u: [number, number] = [(other.c[0] - source.c[0]) / d, (other.c[1] - source.c[1]) / d];
    // Marked on the side of the line of centres that is lower on the screen.
    const n: [number, number] = u[0] >= 0 ? [-u[1], u[0]] : [u[1], -u[0]];
    const off = (px: number, at: [number, number]): [number, number] => [at[0] + n[0] * px, at[1] + n[1] * px];
    const unit = el.unit ?? { metres: 1, symbol: 'm' };
    const metres = Math.hypot(other.s.x - source.s.x, other.s.y - source.s.y);
    const split = Math.max(radius, height);
    const low = 52 + 46 * split;
    const guide = Math.max(distance, split);
    if (guide > 0)
      out.push(
        <g key="guides" opacity={0.7 * guide} stroke={INK3} strokeWidth={1.5} strokeDasharray="3 6">
          <line x1={source.c[0]} y1={source.c[1]} x2={off(low + 8, source.c)[0]} y2={off(low + 8, source.c)[1]} />
          <line x1={other.c[0]} y1={other.c[1]} x2={off(low + 8, other.c)[0]} y2={off(low + 8, other.c)[1]} />
        </g>,
      );
    if (distance > 0) {
      const [a, b] = [off(low, source.c), off(low, other.c)];
      out.push(<Span key="r" a={a} b={b} opacity={distance} />);
      labels.push(<Num key="r-t" x={(a[0] + b[0]) / 2 + n[0] * 20} y={(a[1] + b[1]) / 2 + n[1] * 20} pre="r = " n={metres / unit.metres} unit={unit.symbol} figures={el.figures ?? 2} color={INK} opacity={distance} />);
    }
    if (source.planet && split > 0) {
      const edge: [number, number] = [source.c[0] + u[0] * source.r, source.c[1] + u[1] * source.r];
      const [a, m, b] = [off(52, source.c), off(52, edge), off(52, other.c)];
      if (radius > 0) {
        out.push(<Span key="R" a={a} b={m} opacity={radius} />);
        labels.push(<Num key="R-t" x={(a[0] + m[0]) / 2 + n[0] * 20} y={(a[1] + m[1]) / 2 + n[1] * 20} pre="radius " n={source.b.radius! / unit.metres} unit={unit.symbol} figures={el.figures ?? 2} color={source.color} opacity={radius} />);
      }
      if (height > 0) {
        out.push(<Span key="h" a={m} b={b} opacity={height} />);
        // Over a short stretch the words would not fit: they start at its near end, on the other side of the line from the radius.
        const wide = Math.hypot(b[0] - m[0], b[1] - m[1]) >= 200;
        labels.push(<Num key="h-t" x={within((wide ? (m[0] + b[0]) / 2 : m[0] + 8) + n[0] * (wide ? 20 : -25), wide ? 'middle' : 'start', 200)} y={(wide ? (m[1] + b[1]) / 2 : m[1]) + n[1] * (wide ? 20 : -25)} pre="height " n={(metres - source.b.radius!) / unit.metres} unit={unit.symbol} figures={el.figures ?? 2} anchor={wide ? 'middle' : 'start'} color={other.color} opacity={height} />);
      }
    }
  }

  // The pull on each body, the names of the bodies, and the field strength where the small ones are.
  for (const [i, k] of boxes.entries()) {
    const near = boxes.filter((o) => o !== k).sort((a, b) => Math.hypot(a.c[0] - k.c[0], a.c[1] - k.c[1]) - Math.hypot(b.c[0] - k.c[0], b.c[1] - k.c[1]))[0];
    const side = near ? Math.sign(k.c[0] - near.c[0]) || 1 : 1;
    const name = (x: number, y: number, anchor: 'start' | 'middle' | 'end') =>
      k.b.label !== undefined ? (
        <Text key={`n-${k.b.id}`} x={x} y={y} anchor={anchor} color={k.color}>
          {k.b.label}
        </Text>
      ) : (
        <Num key={`n-${k.b.id}`} x={x} y={y} anchor={anchor} n={k.s.mass} unit="kg" figures={2} color={k.color} />
      );
    // A planet's name is written inside it, over its centre; a ball's beside it, away from its neighbour.
    // (A planet's name leans away from its neighbour, to leave room for what is written over that one.)
    labels.push(k.planet ? name(k.c[0] + side * Math.min(k.r * 0.4, 60), k.c[1] - 34, 'middle') : name(k.c[0] + side * (k.r + 14), k.c[1], side > 0 ? 'start' : 'end'));
    let rows = k.c[1] - k.r - 24;
    if (force > 0 && k.s.force.n > 0 && (!el.pulls || el.pulls.includes(k.b.id))) {
      const len = Math.max(12, k.s.force.n * fs);
      const [dx, dy] = [Math.cos(rad(k.s.force.angle)), -Math.sin(rad(k.s.force.angle))];
      // The pull on a planet is drawn from its centre; on a ball, from its edge, so that a short arrow still shows.
      const from = k.planet ? 0 : k.r;
      out.push(<Arrow key={`f-${k.b.id}`} x={k.c[0] + dx * from} y={k.c[1] + dy * from} len={len} turn={k.s.force.angle} color={PULL} opacity={force} />);
      if (k.planet) labels.push(<Num key={`f-t-${k.b.id}`} x={k.c[0] + (dx * len) / 2} y={k.c[1] + (dy * len) / 2 + 28} n={k.s.force.n} unit="N" sci={el.notation === 'sci'} color={PULL} opacity={force} />);
      else if (k.s.flying && k.s.speed > 0) {
        // A body in flight has its velocity arrow too: the size of the pull goes beside the middle of its arrow, behind the body.
        const [tx, ty] = [-k.s.v[0] / k.s.speed, k.s.v[1] / k.s.speed];
        const [mx, my] = [k.c[0] + dx * (from + Math.max(len * 0.55, 40)), k.c[1] + dy * (from + Math.max(len * 0.55, 40))];
        const flat = Math.abs(tx) >= 0.35;
        labels.push(<Num key={`f-t-${k.b.id}`} x={mx + tx * (flat ? 18 : 0)} y={my + (flat ? ty * 18 : Math.sign(ty || 1) * 26)} anchor={flat ? (tx > 0 ? 'start' : 'end') : 'middle'} n={k.s.force.n} unit="N" sci={el.notation === 'sci'} color={PULL} opacity={force} />);
      } else {
        labels.push(<Num key={`f-t-${k.b.id}`} x={k.c[0]} y={rows} n={k.s.force.n} unit="N" sci={el.notation === 'sci'} color={PULL} opacity={force} />);
        rows -= 30;
      }
    }
    if (gPart > 0 && i > 0 && !k.planet) labels.push(<Num key={`g-${k.b.id}`} x={k.c[0]} y={rows} pre="g = " n={k.s.g} unit="N/kg" color={FIELD} opacity={gPart} />);
    // The velocity of a body that is flying, from its edge, with the speed past its tip.
    if (vel > 0 && k.s.flying && k.s.speed * vs >= 1) {
      const len = Math.max(12, k.s.speed * vs);
      const [dx, dy] = [k.s.v[0] / k.s.speed, -k.s.v[1] / k.s.speed];
      out.push(<Arrow key={`v-${k.b.id}`} x={k.c[0] + dx * k.r} y={k.c[1] + dy * k.r} len={len} turn={(Math.atan2(k.s.v[1], k.s.v[0]) * 180) / Math.PI} color={VELOCITY} weight={7} opacity={vel} />);
      const tip: [number, number] = [k.c[0] + dx * (k.r + len), k.c[1] + dy * (k.r + len)];
      const flat = Math.abs(dx) >= 0.35;
      const anchor = flat ? (dx > 0 ? 'start' : 'end') : 'middle';
      const at = tip[0] + (flat ? Math.sign(dx) * 12 : 0);
      // Near the edge of the picture the speed moves in, and goes past the tip of the arrow instead of beside it.
      const lx = within(at, anchor, el.notation === 'sci' ? 150 : 100);
      const moved = Math.abs(lx - at) > 1;
      labels.push(<Num key={`v-t-${k.b.id}`} x={lx} y={tip[1] + (flat && !moved ? dy * 12 : (Math.sign(dy) || 1) * 20)} anchor={anchor} n={k.s.speed >= 1000 ? Math.round(k.s.speed) : k.s.speed} unit="m/s" sci={el.notation === 'sci'} color={VELOCITY} opacity={vel} />);
    }
  }
  // How many times each body in orbit has been round, in the top left corner of the picture.
  if (turns > 0)
    boxes
      .filter((k) => k.b.orbit)
      .forEach((k, i) => {
        const n = Math.floor(k.s.turns + 1e-6);
        labels.push(
          <Text key={`turns-${k.b.id}`} x={ox + 18} y={oy + 26 + i * 30} anchor="start" size={20} color={k.color} opacity={turns}>
            {`${k.b.label ?? k.b.id}: ${n} ${n === 1 ? 'orbit' : 'orbits'}`}
          </Text>,
        );
      });
  if (clock > 0)
    out.push(
      <g key="clock" transform={`translate(${ox + pw - w - 12} ${oy + 12})`}>
        <Clock w={w} time={state.time / (el.clock?.seconds ?? 1)} unit={el.clock?.unit ?? 's'} opacity={clock} />
      </g>,
    );
  out.push(<g key="labels">{labels}</g>);

  if (state.note)
    out.push(
      <g key="note">
        <rect x={w / 2 - 120} y={h - 50} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={h - 30.5} size={19} color="#fff">
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
