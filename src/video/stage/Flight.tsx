/**
 * Motion in two dimensions, for the physics videos (src/video/flight.ts works out where every
 * body is). The picture is drawn to one scale, so angles are true. A velocity is a green arrow
 * on its body, as in every physics video; its horizontal part is blue and its vertical part
 * orange, and each changes on its own, which is the point of projectile motion. On a river or in
 * a wind the body's own velocity is blue and the stream's pink, drawn head to tail so that the
 * green velocity over the ground closes the triangle. A displacement is a purple arrow from where
 * the body started. The numbers for the arrows shown sit in a panel, in the arrows' colours.
 */
import type { ReactElement } from 'react';
import type { FlightBody, FlightEl } from '../script.ts';
import { carried, fastest, flightAt, momentumOf, radiusOf } from '../flight.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { Arrow, BODY_TONES, clamp01, Clock, FONT, INK2, live, NET, short, speedText, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK3 } from './Triangle.tsx';

const ACROSS = TONES.adj;
const UP = TONES.opp;
const STREAM = TONES.hyp;
const DISPLACEMENT = TONES.brand;
const DEG = 180 / Math.PI;

/** A gap between ruler marks that gives about eight of them across a span. */
function niceStep(span: number): number {
  const raw = span / 8;
  const p = 10 ** Math.floor(Math.log10(raw));
  const f = raw / p;
  return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
}

/** An angle for a label: whole degrees, or to the places given. */
const degrees = (a: number, places = 0) => `${Math.abs(a).toFixed(places)}°`;

/** A momentum for a bar: to a sensible number of places for the largest the bars hold, thousands set apart by a thin space. */
function momentumText(p: number, max: number): string {
  const places = max >= 100 ? 0 : max >= 10 ? 1 : 2;
  const n = Math.abs(p) < 0.5 * 10 ** -places ? 0 : p;
  const [whole, part] = Math.abs(n).toFixed(places).split('.');
  return `${n < 0 ? '−' : ''}${whole.replace(/\B(?=(\d{3})+$)/g, ' ')}${part ? `.${part}` : ''}`;
}

export function FlightView({ el, st, w, h, plays }: { el: FlightEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = flightAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const vel = part('velocity');
  const comps = part('components');
  const own = part('own');
  const trail = part('trail');
  const strobe = part('strobe');
  const shadows = part('shadows');
  const disp = part('displacement');
  const legs = part('legs');
  const angle = part('angle');
  const readout = part('readout');
  const clock = part('clock');
  const speed = part('speed');
  const bars = part('bars');
  const total = part('total');
  const sum = part('sum');

  const scene = el.scene ?? 'ground';
  const [x0, x1, y0, y1] = el.view;
  const len = el.units?.length ?? 'm';
  const per = `${len}/${el.units?.time ?? 's'}`;
  const tone = (b: FlightBody) => TONES[b.tone ?? BODY_TONES[el.bodies.indexOf(b) % BODY_TONES.length]];

  // One scale both ways. With `readout` set, the panel of numbers has a column of its own beside the picture.
  // Momentum bars take the same column, wider, on the right.
  const PANEL = el.readout ? 330 : el.momentum ? Math.round(w * 0.42) : 0;
  const side = el.readout?.side ?? 'right';
  const top = 46;
  const bottom = (scene === 'ground' ? 44 : 12) + (el.below ?? 0);
  // Heights are written to the left of a ground scene.
  const left = scene === 'ground' ? 64 : 8;
  const roomW = w - PANEL - left - 8;
  const roomH = h - top - bottom;
  const S = Math.min(roomW / (x1 - x0), roomH / (y1 - y0));
  const pw = (x1 - x0) * S;
  const ph = (y1 - y0) * S;
  const px = (side === 'right' ? left : PANEL + left) + (roomW - pw) / 2;
  const py = top + (roomH - ph) / 2;
  const X = (x: number) => px + (x - x0) * S;
  const Y = (y: number) => py + (y1 - y) * S;
  const vs = el.velocityScale ?? 150 / (fastest(el) || 1);
  // A puck or a car is drawn to the picture's scale; anything else is a mark of a fixed size.
  const round = (b: FlightBody) => b.shape === 'puck' || b.shape === 'car';
  const sizeOf = (b: FlightBody) => (round(b) ? Math.max(12, radiusOf(b) * S) : b.shape === 'dot' ? 9 : 15);
  // Bodies locked together by a collision move as one: the first of them carries the arrow, from
  // their centre of mass, and the others stay quiet.
  const lead: Record<string, FlightBody> = {};
  const massive = el.bodies.filter((b) => b.mass !== undefined);
  if (el.collisions?.stick && state.hit) {
    for (const [i, a] of massive.entries()) {
      for (const b of massive.slice(i + 1)) {
        const [sa, sb] = [state.bodies[a.id], state.bodies[b.id]];
        if (Math.hypot(sa.vx - sb.vx, sa.vy - sb.vy) < 1e-9 && Math.hypot(sa.x - sb.x, sa.y - sb.y) <= radiusOf(a) + radiusOf(b) + 1e-6) lead[b.id] = lead[a.id] ?? a;
      }
    }
  }
  const group = (b: FlightBody) => [b, ...el.bodies.filter((o) => lead[o.id] === b)];
  /** Where a body's arrow starts, in pixels: its middle, or the centre of mass of the bodies locked to it. */
  const origin = (b: FlightBody): [number, number] => {
    const g = group(b);
    const m = g.reduce((n, o) => n + (o.mass ?? 1), 0);
    return [X(g.reduce((n, o) => n + (o.mass ?? 1) * state.bodies[o.id].x, 0) / m), Y(g.reduce((n, o) => n + (o.mass ?? 1) * state.bodies[o.id].y, 0) / m)];
  };
  /** How far from that start the arrow begins: at the edge of a puck or a car on its own. */
  const edge = (b: FlightBody) => (round(b) && group(b).length === 1 ? sizeOf(b) : 0);
  const tick = el.tick ?? niceStep(Math.max(x1 - x0, y1 - y0));
  const out: Array<ReactElement | null> = [];
  const clip = `flight-clip-${el.id}`;
  out.push(
    <defs key="defs">
      <clipPath id={clip}>
        <rect x={px} y={py} width={pw} height={ph} rx={12} />
      </clipPath>
    </defs>,
  );

  // The scene.
  if (scene === 'ground') {
    out.push(<rect key="sky" x={px} y={py} width={pw} height={ph} rx={12} fill="rgb(255 255 255 / 0.03)" />);
    if (el.ledge) {
      const [lx, ly] = el.ledge;
      out.push(
        <g key="ledge">
          <rect x={X(x0)} y={Y(ly)} width={X(lx) - X(x0)} height={Y(0) - Y(ly)} fill="rgb(167 139 250 / 0.14)" stroke={INK3} strokeWidth={2} />
          <line x1={X(x0)} y1={Y(ly)} x2={X(lx)} y2={Y(ly)} stroke={INK2} strokeWidth={4} strokeLinecap="round" />
        </g>,
      );
    }
    if (y0 <= 0) {
      out.push(<line key="ground" x1={px} y1={Y(0)} x2={px + pw} y2={Y(0)} stroke={INK2} strokeWidth={4} strokeLinecap="round" />);
      // A ruler along the ground; the last mark carries the unit.
      const first = Math.ceil(x0 / tick - 1e-9);
      const last = Math.floor(x1 / tick + 1e-9);
      for (let k = first; k <= last; k++) {
        const m = k * tick;
        out.push(
          <g key={`tx${k}`}>
            <line x1={X(m)} y1={Y(0) + 4} x2={X(m)} y2={Y(0) + 13} stroke={INK3} strokeWidth={1.5} />
            <Text x={X(m)} y={Y(0) + 28} size={17} color={INK3} weight={500}>{k === last ? `${short(m)} ${len}` : short(m)}</Text>
          </g>,
        );
      }
    }
    // Heights, up the left edge.
    for (let m = Math.max(tick, Math.ceil(y0 / tick) * tick); m <= y1 - tick * 0.2; m += tick) {
      out.push(
        <g key={`ty${m.toFixed(4)}`} opacity={0.8}>
          <line x1={px - 9} y1={Y(m)} x2={px} y2={Y(m)} stroke={INK3} strokeWidth={1.5} />
          <Text x={px - 14} y={Y(m)} anchor="end" size={17} color={INK3} weight={500}>{`${short(m)} ${len}`}</Text>
        </g>,
      );
    }
  } else if (scene === 'map') {
    out.push(<rect key="map" x={px} y={py} width={pw} height={ph} rx={12} fill="rgb(255 255 255 / 0.03)" stroke="rgb(255 255 255 / 0.1)" />);
    for (let m = Math.ceil(x0 / tick) * tick; m <= x1 + 1e-9; m += tick) out.push(<line key={`gx${m.toFixed(4)}`} x1={X(m)} y1={py} x2={X(m)} y2={py + ph} stroke="#fff" strokeWidth={1} opacity={0.07} />);
    for (let m = Math.ceil(y0 / tick) * tick; m <= y1 + 1e-9; m += tick) out.push(<line key={`gy${m.toFixed(4)}`} x1={px} y1={Y(m)} x2={px + pw} y2={Y(m)} stroke="#fff" strokeWidth={1} opacity={0.07} />);
    // Two roads that cross at the origin, seen from above.
    if (el.roads) {
      const half = (el.roads * S) / 2;
      const [mx, my] = [X(0), Y(0)];
      out.push(
        <g key="roads" clipPath={`url(#${clip})`}>
          <rect x={px} y={my - half} width={pw} height={2 * half} fill="rgb(255 255 255 / 0.06)" />
          <rect x={mx - half} y={py} width={2 * half} height={ph} fill="rgb(255 255 255 / 0.06)" />
          {[-1, 1].map((k) => (
            <g key={k} stroke={INK3} strokeWidth={2} opacity={0.7}>
              <line x1={px} y1={my + k * half} x2={mx - half} y2={my + k * half} />
              <line x1={mx + half} y1={my + k * half} x2={px + pw} y2={my + k * half} />
              <line x1={mx + k * half} y1={py} x2={mx + k * half} y2={my - half} />
              <line x1={mx + k * half} y1={my + half} x2={mx + k * half} y2={py + ph} />
            </g>
          ))}
          <g stroke="#fff" strokeWidth={2} strokeDasharray="14 14" opacity={0.22}>
            <line x1={px} y1={my} x2={mx - half} y2={my} />
            <line x1={mx + half} y1={my} x2={px + pw} y2={my} />
            <line x1={mx} y1={py} x2={mx} y2={my - half} />
            <line x1={mx} y1={my + half} x2={mx} y2={py + ph} />
          </g>
        </g>,
      );
    }
    // A compass, and the size of one square.
    const cx = px + pw - 34;
    const cy = py + 46;
    out.push(
      <g key="compass" opacity={0.85}>
        <line x1={cx} y1={cy + 20} x2={cx} y2={cy - 14} stroke={INK2} strokeWidth={2.5} />
        <polygon points={`${cx},${cy - 24} ${cx - 7},${cy - 10} ${cx + 7},${cy - 10}`} fill={INK2} />
        <Text x={cx} y={cy - 36} size={17} color={INK2}>N</Text>
        <Text x={px + 12} y={py + ph - 16} anchor="start" size={16} color={INK3} weight={500}>{`1 square = ${short(tick)} ${len}`}</Text>
      </g>,
    );
  } else {
    // A river: land on each bank, water between, and marks that drift with the current.
    const [b0, b1] = el.stream?.band ?? [y0, y1];
    out.push(
      <g key="river" clipPath={`url(#${clip})`}>
        <rect x={px} y={py} width={pw} height={ph} fill="rgb(52 211 153 / 0.1)" />
        <rect x={px} y={Y(b1)} width={pw} height={Y(b0) - Y(b1)} fill="rgb(77 163 255 / 0.16)" />
        <line x1={px} y1={Y(b0)} x2={px + pw} y2={Y(b0)} stroke={INK2} strokeWidth={3} />
        <line x1={px} y1={Y(b1)} x2={px + pw} y2={Y(b1)} stroke={INK2} strokeWidth={3} />
      </g>,
    );
    // A ruler along the near bank, where there is land to write on (the last mark carries the unit), and its marks alone along the far bank.
    if (el.tick !== undefined) {
      const first = Math.ceil(x0 / tick + 0.15);
      const last = Math.floor(x1 / tick - 0.15);
      for (let k = first; k <= last; k++) {
        const m = k * tick;
        const name = k === last ? `${short(m)} ${len}` : short(m);
        if (Y(b0) + 30 <= py + ph)
          out.push(
            <g key={`rn${k}`}>
              <line x1={X(m)} y1={Y(b0) + 2} x2={X(m)} y2={Y(b0) + 10} stroke={INK3} strokeWidth={1.5} />
              <Text x={X(m)} y={Y(b0) + 22} size={16} color={INK3} weight={500}>{name}</Text>
            </g>,
          );
        if (Y(b1) - 12 >= py) out.push(<line key={`rf${k}`} x1={X(m)} y1={Y(b1) - 10} x2={X(m)} y2={Y(b1) - 2} stroke={INK3} strokeWidth={1.5} />);
      }
    }
  }

  // The stream: short streaks on a lattice, carried along at the stream's velocity.
  if (el.stream && (el.stream.v[0] !== 0 || el.stream.v[1] !== 0)) {
    const [b0, b1] = scene === 'river' ? (el.stream.band ?? [y0, y1]) : [y0, y1];
    const gap = 96;
    const [fx, fy] = [state.flow[0] * S, -state.flow[1] * S];
    const speed = Math.hypot(el.stream.v[0], el.stream.v[1]);
    const [ux, uy] = [el.stream.v[0] / speed, -el.stream.v[1] / speed];
    const streaks: ReactElement[] = [];
    const yTop = Y(b1);
    const yBot = Y(b0);
    for (let r = 0; r * gap < yBot - yTop + gap; r++) {
      for (let c = -1; c * gap < pw + gap; c++) {
        const mod = (n: number, m: number) => ((n % m) + m) % m;
        const sx = px + mod(c * gap + (r % 2) * (gap / 2) + fx, pw + gap) - gap / 2;
        const sy = yTop + mod(r * gap + gap / 2 + fy, Math.max(gap, yBot - yTop));
        if (sy < yTop + 8 || sy > yBot - 8) continue;
        streaks.push(<line key={`${r}-${c}`} x1={sx - ux * 13} y1={sy - uy * 13} x2={sx + ux * 13} y2={sy + uy * 13} stroke={STREAM} strokeWidth={3} strokeLinecap="round" opacity={0.3} />);
      }
    }
    out.push(
      <g key="stream" clipPath={`url(#${clip})`}>
        {streaks}
      </g>,
    );
    if (el.stream.name) out.push(<Text key="stream-name" x={px + 14} y={Y(b1) + 22} anchor="start" size={19} color={STREAM}>{el.stream.name}</Text>);
  }

  // Paths and strobe marks, under the bodies.
  for (const b of el.bodies) {
    const c = tone(b);
    const s = state.bodies[b.id];
    if (trail > 0 && state.trails[b.id].length > 1) {
      out.push(<polyline key={`trail-${b.id}`} points={state.trails[b.id].map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')} fill="none" stroke={c} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 9" opacity={0.75 * trail} />);
    }
    if (strobe > 0) {
      state.marks[b.id].forEach(([x, y], i) => {
        if (Math.hypot(X(x) - X(s.x), Y(y) - Y(s.y)) < 9) return;
        out.push(<circle key={`mark-${b.id}-${i}`} cx={X(x)} cy={Y(y)} r={8} fill={c} fillOpacity={0.12} stroke={c} strokeOpacity={0.65} strokeWidth={2} opacity={strobe} />);
      });
    }
    // The two motions taken apart: a mark that only moves along the ground, and one that only moves up and down the wall.
    if (shadows > 0) {
      const gy = Y(Math.max(y0, 0)) - 2;
      const wx = px + 2;
      out.push(
        <g key={`shadow-${b.id}`} opacity={shadows}>
          <line x1={X(s.x)} y1={Y(s.y)} x2={X(s.x)} y2={gy} stroke={ACROSS} strokeWidth={1.5} strokeDasharray="3 7" opacity={0.6} />
          <line x1={X(s.x)} y1={Y(s.y)} x2={wx} y2={Y(s.y)} stroke={UP} strokeWidth={1.5} strokeDasharray="3 7" opacity={0.6} />
          {state.marks[b.id].map(([x], i) => (
            <circle key={`sx${i}`} cx={X(x)} cy={gy} r={4} fill={ACROSS} opacity={0.55} />
          ))}
          {state.marks[b.id].map(([, y], i) => (
            <circle key={`sy${i}`} cx={wx} cy={Y(y)} r={4} fill={UP} opacity={0.55} />
          ))}
          <circle cx={X(s.x)} cy={gy} r={7} fill={ACROSS} />
          <circle cx={wx} cy={Y(s.y)} r={7} fill={UP} />
        </g>,
      );
    }
  }

  // Displacement: an arrow from the start, its two parts, and its angle.
  const reader = el.bodies.find((b) => b.id === el.readout?.of) ?? el.bodies[0];
  for (const b of el.bodies) {
    const s = state.bodies[b.id];
    const [ax, ay] = b.at;
    const [dx, dy] = [s.x - ax, s.y - ay];
    const d = Math.hypot(dx, dy);
    if (legs > 0 && d * S > 4) {
      // In a stream: the body's own motion, and then how far the stream has carried it. Otherwise along x, and then along y.
      const inStream = carried(el, b);
      const [mx, my] = inStream ? [s.x - s.driftX, s.y - s.driftY] : [s.x, ay];
      out.push(
        <g key={`legs-${b.id}`} opacity={legs}>
          <line x1={X(ax)} y1={Y(ay)} x2={X(mx)} y2={Y(my)} stroke={ACROSS} strokeWidth={3.5} strokeDasharray="8 7" strokeLinecap="round" />
          <line x1={X(mx)} y1={Y(my)} x2={X(s.x)} y2={Y(s.y)} stroke={inStream ? STREAM : UP} strokeWidth={3.5} strokeDasharray="8 7" strokeLinecap="round" />
        </g>,
      );
    }
    if (disp > 0 && d * S > 4) {
      out.push(
        <g key={`disp-${b.id}`} opacity={disp}>
          <circle cx={X(ax)} cy={Y(ay)} r={6} fill={DISPLACEMENT} />
          <Arrow x={X(ax)} y={Y(ay)} len={d * S} turn={Math.atan2(dy, dx) * DEG} color={DISPLACEMENT} weight={7} />
        </g>,
      );
    }
    // The angle: of the displacement at the start, or of the velocity at the body, from the x
    // direction on the side the vector leans to. For a body in a stream, with no displacement
    // shown: between the way it points (its own velocity) and the way it travels.
    const ofVelocity = disp <= 0;
    const steered = ofVelocity && carried(el, b) && !s.stopped;
    const [qx, qy] = ofVelocity ? [s.vx, s.vy] : [dx, dy];
    const [ox, oy] = ofVelocity ? origin(b) : [X(ax), Y(ay)];
    const ownSpeed = Math.hypot(s.ownX, s.ownY);
    // A body locked to another leaves the angle to the one that carries their arrow.
    const reach = ofVelocity ? (lead[b.id] ? 0 : Math.min(Math.hypot(qx, qy), steered ? ownSpeed : Infinity) * vs + edge(b)) : d * S;
    const a = Math.atan2(qy, qx);
    const base = steered ? Math.atan2(s.ownY, s.ownX) : qx >= 0 ? 0 : Math.PI;
    // The turn from the base to the vector, between −180° and 180°.
    const turned = Math.atan2(Math.sin(a - base), Math.cos(a - base));
    if (angle > 0 && reach > 60 && Math.abs(turned) > 0.02 && Math.abs(turned) < Math.PI - 0.02) {
      // The arc clears a puck or a car that the arrow starts at the edge of.
      // Round bodies locked together it is wide enough to clear them all.
      const r = Math.max(Math.min(58, reach * 0.5), ofVelocity && edge(b) ? edge(b) + 20 : 0, ofVelocity && group(b).length > 1 ? 70 : 0);
      const mid = base + turned / 2;
      const far = Math.max(Math.hypot(qx, qy), ownSpeed) * vs;
      out.push(
        <g key={`angle-${b.id}`} opacity={angle}>
          {!steered && <line x1={ox} y1={oy} x2={ox + Math.cos(base) * (r + 26)} y2={oy} stroke={INK3} strokeWidth={2} strokeDasharray="5 6" />}
          <path d={`M${(ox + r * Math.cos(base)).toFixed(1)},${(oy - r * Math.sin(base)).toFixed(1)} A${r},${r} 0 0 ${turned > 0 ? 0 : 1} ${(ox + r * Math.cos(a)).toFixed(1)},${(oy - r * Math.sin(a)).toFixed(1)}`} fill="none" stroke={TONES.theta} strokeWidth={4} strokeLinecap="round" />
          {/* Between a heading and a track the label goes beyond the arrows, clear of the stream's arrow that joins their tips. */}
          <Text x={ox + (steered ? far + 26 : r + 30) * Math.cos(mid)} y={oy - (steered ? far + 26 : r + 30) * Math.sin(mid)} size={21} color={TONES.theta}>{degrees(turned * DEG, el.angleDecimals)}</Text>
        </g>,
      );
    }
  }

  // Bodies, and the arrows on them.
  for (const b of el.bodies) {
    const c = tone(b);
    const s = state.bodies[b.id];
    const [bx, by] = [X(s.x), Y(s.y)];
    const f = st?.focus[b.id] ?? 0;
    const glow = f > 0 ? { filter: `drop-shadow(0 0 ${16 * f}px ${c})` } : undefined;
    const shape = b.shape ?? 'ball';
    // A boat or an aircraft points the way it is steered: along its own velocity.
    const steer = Math.hypot(s.ownX, s.ownY) > 1e-9 ? Math.atan2(s.ownY, s.ownX) * DEG : Math.hypot(b.v?.[0] ?? 0, b.v?.[1] ?? 0) > 1e-9 ? Math.atan2(b.v![1], b.v![0]) * DEG : 90;
    const R = sizeOf(b);
    if (shape === 'puck') {
      // A disc seen from above, to scale, with its name inside.
      out.push(
        <g key={b.id} style={glow}>
          <circle cx={bx} cy={by} r={R - 1.5} fill="#1b1846" />
          <circle cx={bx} cy={by} r={R - 1.5} fill={c} fillOpacity={0.3} stroke={c} strokeWidth={3} />
          <circle cx={bx} cy={by} r={R * 0.62} fill="none" stroke={c} strokeOpacity={0.35} strokeWidth={1.5} />
          {b.label && b.label.length <= 2 && <Text x={bx} y={by + 1} size={Math.min(24, R * 0.8)} weight={700}>{b.label}</Text>}
        </g>,
      );
    } else if (shape === 'car') {
      // A car seen from above, as long as the disc it collides as, pointing the way it was driven.
      const [long, wide] = [R * 2, R * 1.08];
      out.push(
        <g key={b.id} transform={`translate(${bx} ${by}) rotate(${-s.heading})`} style={glow}>
          <rect x={-long / 2} y={-wide / 2} width={long} height={wide} rx={wide * 0.28} fill="#1b1846" />
          <rect x={-long / 2} y={-wide / 2} width={long} height={wide} rx={wide * 0.28} fill={c} fillOpacity={0.35} stroke={c} strokeWidth={3} />
          <rect x={long * 0.08} y={-wide * 0.36} width={long * 0.2} height={wide * 0.72} rx={3} fill="#fff" opacity={0.28} />
          <rect x={-long * 0.36} y={-wide * 0.34} width={long * 0.12} height={wide * 0.68} rx={3} fill="#fff" opacity={0.14} />
        </g>,
      );
    } else if (shape === 'boat') {
      out.push(
        <g key={b.id} transform={`translate(${bx} ${by}) rotate(${-steer})`} style={glow}>
          <path d="M-22,-11 L8,-11 Q24,-6 28,0 Q24,6 8,11 L-22,11 Z" fill="#1b1846" />
          <path d="M-22,-11 L8,-11 Q24,-6 28,0 Q24,6 8,11 L-22,11 Z" fill={c} fillOpacity={0.4} stroke={c} strokeWidth={3} strokeLinejoin="round" />
          <rect x={-12} y={-5} width={14} height={10} rx={3} fill="#fff" opacity={0.25} />
        </g>,
      );
    } else if (shape === 'plane') {
      out.push(
        <g key={b.id} transform={`translate(${bx} ${by}) rotate(${-steer})`} style={glow}>
          <path d="M28,0 L8,-5 L0,-24 L-7,-24 L-3,-5 L-18,-4 L-23,-12 L-28,-12 L-25,0 L-28,12 L-23,12 L-18,4 L-3,5 L-7,24 L0,24 L8,5 Z" fill="#1b1846" />
          <path d="M28,0 L8,-5 L0,-24 L-7,-24 L-3,-5 L-18,-4 L-23,-12 L-28,-12 L-25,0 L-28,12 L-23,12 L-18,4 L-3,5 L-7,24 L0,24 L8,5 Z" fill={c} fillOpacity={0.45} stroke={c} strokeWidth={2.5} strokeLinejoin="round" />
        </g>,
      );
    } else {
      out.push(
        <g key={b.id} style={glow}>
          <circle cx={bx} cy={by} r={R} fill="#1b1846" />
          <circle cx={bx} cy={by} r={R} fill={c} fillOpacity={0.45} stroke={c} strokeWidth={3} />
          {shape === 'ball' && <circle cx={bx - 5} cy={by - 5} r={4} fill="#fff" opacity={0.3} />}
        </g>,
      );
    }
    const turn = (vx: number, vy: number) => Math.atan2(vy, vx) * DEG;
    // With a stream: the body's own velocity, then the stream's from its tip.
    // Along one line (straight downstream or upstream) the three arrows would lie on top of each
    // other, so the stream's arrow is lifted to one side of the body's own and the sum drawn on the other.
    let aside: [number, number] = [0, 0];
    let lifted = false;
    if (own > 0 && carried(el, b) && !s.stopped) {
      const [sx, sy] = el.stream!.v;
      const ownLen = Math.hypot(s.ownX, s.ownY) * vs;
      const flow = Math.hypot(sx, sy);
      const inLine = flow > 0 && Math.abs(s.ownX * sy - s.ownY * sx) < 1e-9;
      if (inLine) aside = [-sy / flow, -sx / flow];
      lifted = inLine && ownLen >= 1;
      const lift = inLine && ownLen >= 1 ? 20 : 0;
      out.push(
        <g key={`own-${b.id}`} opacity={own}>
          <Arrow x={bx} y={by} len={ownLen} turn={turn(s.ownX, s.ownY)} color={ACROSS} weight={7} />
          <Arrow x={bx + s.ownX * vs + aside[0] * lift} y={by - s.ownY * vs + aside[1] * lift} len={flow * vs} turn={turn(sx, sy)} color={STREAM} weight={7} />
        </g>,
      );
    }
    // The two parts of the velocity, each from the body.
    if (comps > 0) {
      out.push(
        <g key={`comps-${b.id}`} opacity={comps}>
          <Arrow x={bx} y={by} len={s.vx * vs} axis="x" color={ACROSS} weight={7} />
          <Arrow x={bx} y={by} len={s.vy * vs} axis="y" color={UP} weight={7} />
        </g>,
      );
    }
    if (b.label && !(shape === 'puck' && b.label.length <= 2)) {
      // The name sits over the body, or under it while it climbs, unless the script gives it a side
      // (where it is lifted clear of the ground line once the body has landed). Over a lifted
      // stream arrow it goes higher. While the total momentum of several bodies is drawn at their
      // centre of mass, their names give way to its numbers (the bars keep the names).
      const where = b.labelAt ?? (s.vy > 0 && by + 46 < py + ph ? 'below' : 'above');
      const [lx, ly, anchor] = where === 'left' ? [bx - R - 12, by - (s.landed ? 16 : 0), 'end' as const] : where === 'right' ? [bx + R + 12, by - (s.landed ? 16 : 0), 'start' as const] : [bx, by + (where === 'below' ? R + 19 : lifted ? -R - 37 : -R - 19), 'middle' as const];
      out.push(<Text key={`name-${b.id}`} x={lx} y={ly} anchor={anchor} size={19} color={c} opacity={massive.length > 1 ? 1 - sum : 1}>{b.label}</Text>);
    }
    // The velocity: from the body (the edge of a puck or a car), or once for bodies locked together, from their centre of mass.
    const fast = Math.hypot(s.vx, s.vy);
    const [ux, uy] = fast > 1e-9 ? [s.vx / fast, -s.vy / fast] : [0, 0];
    const [ox, oy] = origin(b);
    const [ax, ay] = [ox + ux * edge(b) - aside[0] * 24, oy + uy * edge(b) - aside[1] * 24];
    if (vel > 0 && !lead[b.id]) out.push(<Arrow key={`vel-${b.id}`} x={ax} y={ay} len={fast * vs} turn={turn(s.vx, s.vy)} color={VELOCITY} weight={8} opacity={vel} />);
    // The speed, beyond the tip of the arrow; a body at rest says so.
    if (speed > 0 && !lead[b.id]) {
      const tip = fast * vs;
      out.push(
        tip < 6 ? (
          <Text key={`speed-${b.id}`} x={bx} y={by - R - (b.label && !(shape === 'puck' && b.label.length <= 2) ? 44 : 18)} size={20} color={VELOCITY} opacity={speed}>at rest</Text>
        ) : (
          <Text key={`speed-${b.id}`} x={ax + ux * (tip + 16 + 46 * Math.abs(ux))} y={ay + uy * (tip + 18)} size={20} color={VELOCITY} opacity={speed}>{`${speedText(fast, el.speedDecimals)} ${per}`}</Text>
        ),
      );
    }
  }

  // The total momentum, at the centre of mass: its two parts head to tail, and the total closing the triangle.
  const moving = momentumOf(el, state);
  if (sum > 0 && moving.centre) {
    const ms = el.momentum?.scale ?? 150 / (el.momentum?.max ?? (Math.hypot(moving.total[0], moving.total[1]) || 1));
    const [cx, cy] = [X(moving.centre[0]), Y(moving.centre[1])];
    const [east, north] = [moving.total[0] * ms, moving.total[1] * ms];
    const size = Math.hypot(east, north);
    const most = el.momentum?.max ?? Math.hypot(moving.total[0], moving.total[1]);
    // Each side carries its size: the two parts outside the triangle, and the total on the far side of its arrow from the right angle.
    // The east part's number sits past the middle of its arrow, clear of the bodies at the centre of mass.
    const both = Math.abs(east) > 30 && Math.abs(north) > 30;
    const away = east * north >= 0 ? 1 : -1;
    const [nx, ny] = size > 0 ? [(away * -north) / size, (away * -east) / size] : [0, 0];
    out.push(
      <g key="sum" opacity={sum}>
        <Arrow x={cx} y={cy} len={east} axis="x" color={ACROSS} weight={7} />
        <Arrow x={cx + east} y={cy} len={north} axis="y" color={UP} weight={7} />
        <Arrow x={cx} y={cy} len={size} turn={Math.atan2(moving.total[1], moving.total[0]) * DEG} color={NET} weight={8} />
        {massive.length > 1 && <circle cx={cx} cy={cy} r={5} fill={NET} />}
        {both && <Text x={cx + east * 0.6} y={cy + (north >= 0 ? 22 : -22)} size={19} color={ACROSS}>{momentumText(moving.total[0], most)}</Text>}
        {both && <Text x={cx + east + (east >= 0 ? 14 : -14)} y={cy - north / 2} anchor={east >= 0 ? 'start' : 'end'} size={19} color={UP}>{momentumText(moving.total[1], most)}</Text>}
        {size > 40 && <Text x={cx + east / 2 + nx * 20} y={cy - north / 2 + ny * 20} anchor={nx < -0.3 ? 'end' : nx > 0.3 ? 'start' : 'middle'} size={19} color={NET}>{`${momentumText(Math.hypot(moving.total[0], moving.total[1]), most)} kg·m/s`}</Text>}
      </g>,
    );
  }

  // A collision or an explosion: a flash where it happened.
  if (state.hit && (state.time - state.hit.t) * state.slow < 0.7) {
    const k = 1 - (1 - ((state.time - state.hit.t) * state.slow) / 0.7) ** 3;
    const [hx, hy] = [X(state.hit.x), Y(state.hit.y)];
    out.push(
      <g key="hit" opacity={1 - k}>
        <circle cx={hx} cy={hy} r={8 + 46 * k} fill="none" stroke="#fff" strokeWidth={3} />
        {[20, 70, 110, 160, 200, 250, 290, 340].map((a) => (
          <line key={a} x1={hx + (14 + 20 * k) * Math.cos(a / DEG)} y1={hy + (14 + 20 * k) * Math.sin(a / DEG)} x2={hx + (26 + 44 * k) * Math.cos(a / DEG)} y2={hy + (26 + 44 * k) * Math.sin(a / DEG)} stroke={TONES.theta} strokeWidth={3} strokeLinecap="round" />
        ))}
      </g>,
    );
  }

  // Momentum bars, in the column beside the picture: a group for each direction, a bar for each
  // body and one for their total.
  if (el.momentum && (bars > 0 || total > 0)) {
    const axes = el.axes ?? (scene === 'map' ? ['East', 'North'] : ['Horizontal', 'Vertical']);
    const { max, min = 0 } = el.momentum;
    const ROW = 40;
    const x = w - PANEL + 28;
    const nameW = 78;
    const room = PANEL - 28 - nameW - 12 - 96;
    const zero = x + nameW + 12 + (room * -min) / (max - min);
    const unit = room / (max - min);
    const column = (k: 0 | 1, y: number) => {
      // A body on its own needs no total.
      const rows = [...massive.map((b) => ({ name: b.label ?? b.id, p: moving.of[b.id][k], c: tone(b), show: bars })), ...(massive.length > 1 ? [{ name: 'Total', p: moving.total[k], c: NET, show: total }] : [])];
      return (
        <g key={`bars${k}`}>
          <text x={x} y={y + 14} fill={INK3} fontSize={17} fontWeight={600} opacity={Math.max(bars, total)} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{`${axes[k]} momentum (kg·m/s)`}</text>
          {rows.map((r, i) => {
            const len = r.p * unit;
            const ry = y + 30 + i * ROW;
            return (
              <g key={r.name} opacity={r.show}>
                <Text x={x + nameW} y={ry + 17} anchor="end" size={19} color={r.name === 'Total' ? NET : '#fff'}>{r.name}</Text>
                <rect x={x + nameW + 12} y={ry + 3} width={room} height={28} rx={7} fill="rgb(255 255 255 / 0.05)" />
                <rect x={len < 0 ? zero + len : zero} y={ry + 3} width={Math.abs(len)} height={28} rx={7} fill={r.c} fillOpacity={0.8} />
                <Text x={zero + Math.max(len, 0) + 10} y={ry + 17} anchor="start" size={19} color={r.c}>{momentumText(r.p, max)}</Text>
              </g>
            );
          })}
          <line x1={zero} y1={y + 28} x2={zero} y2={y + 30 + rows.length * ROW} stroke={INK2} strokeWidth={1.5} opacity={0.6 * Math.max(bars, total)} />
        </g>
      );
    };
    const tall = 30 + (massive.length + (massive.length > 1 ? 1 : 0)) * ROW;
    const y0b = Math.max(top, (h - 2 * tall - 26) / 2);
    out.push(column(0, y0b), column(1, y0b + tall + 26));
  }

  // The panel: the numbers for the arrows shown, for one body.
  if (readout > 0 && reader) {
    const s = state.bodies[reader.id];
    const axes = el.axes ?? (scene === 'map' ? ['East', 'North'] : ['Horizontal', 'Vertical']);
    const rows: Array<{ name: string; value: string; color: string; show: number }> = [];
    const inStream = carried(el, reader);
    if (own > 0 && inStream) {
      rows.push({ name: `Velocity relative to the ${scene === 'river' ? 'water' : 'air'}`, value: `${live(Math.hypot(s.ownX, s.ownY))} ${per}`, color: ACROSS, show: own });
      rows.push({ name: el.stream!.name ?? (scene === 'river' ? 'Current' : 'Wind'), value: `${live(Math.hypot(el.stream!.v[0], el.stream!.v[1]))} ${per}`, color: STREAM, show: own });
    }
    if (comps > 0) {
      rows.push({ name: `${axes[0]} velocity`, value: `${live(s.vx)} ${per}`, color: ACROSS, show: comps });
      rows.push({ name: `${axes[1]} velocity`, value: `${live(s.vy)} ${per}`, color: UP, show: comps });
    }
    if (vel > 0) rows.push({ name: inStream ? `Velocity relative to the ${scene === 'river' ? 'bank' : 'ground'}` : comps > 0 ? 'Speed' : 'Velocity', value: `${live(Math.hypot(s.vx, s.vy))} ${per}`, color: VELOCITY, show: vel });
    const [dx, dy] = [s.x - reader.at[0], s.y - reader.at[1]];
    if (legs > 0 && inStream) {
      const names = el.axes ?? ['Its own motion', 'Carried by the stream'];
      rows.push({ name: names[0], value: `${live(Math.hypot(dx - s.driftX, dy - s.driftY))} ${len}`, color: ACROSS, show: legs });
      rows.push({ name: names[1], value: `${live(Math.hypot(s.driftX, s.driftY))} ${len}`, color: STREAM, show: legs });
    } else if (legs > 0) {
      rows.push({ name: axes[0], value: `${live(dx)} ${len}`, color: ACROSS, show: legs });
      rows.push({ name: axes[1], value: `${live(dy)} ${len}`, color: UP, show: legs });
    }
    if (disp > 0) rows.push({ name: 'Displacement', value: `${live(Math.hypot(dx, dy))} ${len}`, color: DISPLACEMENT, show: disp });
    const ROW = 62;
    const x = side === 'right' ? w - PANEL + 26 : 0;
    const y = top + 28;
    out.push(
      <g key="panel" opacity={readout}>
        {rows.map((r, i) => (
          <g key={r.name} opacity={r.show}>
            <rect x={x} y={y + i * ROW} width={5} height={ROW - 14} rx={2.5} fill={r.color} />
            <Text x={x + 18} y={y + i * ROW + 11} anchor="start" size={18} color={INK2} weight={500}>{r.name}</Text>
            <Text x={x + 18} y={y + i * ROW + 36} anchor="start" size={25} color={r.color} weight={700}>{r.value}</Text>
          </g>
        ))}
      </g>,
    );
  }

  if (clock > 0) out.push(<Clock key="clock" w={w} time={state.time} opacity={clock} unit={el.units?.time} />);
  if (state.note)
    out.push(
      <g key="note">
        <rect x={px + pw / 2 - 120} y={0} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={px + pw / 2} y={19.5} size={19} color="#fff">
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
