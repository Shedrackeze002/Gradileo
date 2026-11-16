/**
 * A ray of light meeting a mirror or the boundary between two materials, for the physics videos
 * (src/video/rays.ts works out where the ray goes). The surface lies across the picture and the
 * normal stands on it where the ray lands; the angles from the normal are drawn as arcs, each in
 * its own colour, with their sizes written at the edges of the picture so that they can be read
 * while the ray turns. A wide beam can be drawn over the ray, with its wavefronts marching along.
 */
import type { ReactElement } from 'react';
import type { RaysEl } from '../script.ts';
import { fronts, raysAt } from '../rays.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { clamp01, INK2, Text } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** Light is yellow; each angle keeps one colour: incidence blue, reflection orange, refraction pink. */
const LIGHT = TONES.theta;
const INCIDENCE = TONES.adj;
const REFLECTION = TONES.opp;
const REFRACTION = TONES.hyp;
const RAD = Math.PI / 180;

/** Wavefronts: how far apart before the surface, in pixels, and how many pass each second. */
const GAP = 38;
const PER_SECOND = 1.6;
const BEAM = 96;

/** Degrees for a readout: whole, or one decimal when it is not. */
const degrees = (a: number) => `${Math.abs(a - Math.round(a)) < 0.05 ? Math.round(a) : a.toFixed(1)}°`;

export function RaysView({ el, st, w, h, plays }: { el: RaysEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]> }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const state = raysAt(el, plays ?? st?.plays ?? []);
  const part = (name: string) => ownPart(st, name);
  const normal = part('normal');
  const angles = part('angles');
  const toSurface = part('toSurface');
  const beam = part('fronts');
  const mirror = el.surface === 'mirror';
  const top = 46;
  // The ray lands in the middle: at the foot of the picture on a mirror, half way up at a boundary.
  const ox = w / 2;
  const low = mirror && !el.behind;
  const oy = low ? h - 40 : top + (h - top) / 2;
  const R = Math.min(low ? h - top - 64 : (h - top) / 2 - 14, w / 2 - 30);
  // From x along the surface and y up from it, to the screen.
  const X = (x: number) => ox + x;
  const Y = (y: number) => oy - y;
  const i = state.angle * RAD;
  const reflects = mirror || state.out === null;
  const o = (state.out ?? state.angle) * RAD;
  // Where the light comes from, and where it goes.
  const from: [number, number] = [-R * Math.sin(i), R * Math.cos(i)];
  const to: [number, number] = reflects ? [R * Math.sin(o), R * Math.cos(o)] : [R * Math.sin(o), -R * Math.cos(o)];
  const out: Array<ReactElement | null> = [];

  // The second material: the one light is slower in is shaded.
  if (!mirror) {
    const [before, after] = el.speeds!;
    const shade = 'rgb(77 163 255 / 0.14)';
    if (after < before) out.push(<rect key="below" x={0} y={oy} width={w} height={h - oy} rx={14} fill={shade} />);
    if (after > before) out.push(<rect key="above" x={0} y={top} width={w} height={oy - top} rx={14} fill={shade} />);
    out.push(<line key="surface" x1={0} y1={oy} x2={w} y2={oy} stroke={INK2} strokeWidth={3} />);
    if (el.media) {
      out.push(
        <Text key="m0" x={w - 14} y={top + 22} anchor="end" size={21} color={INK2}>{el.media[0]}</Text>,
        <Text key="m1" x={14} y={h - 22} anchor="start" size={21} color={INK2}>{el.media[1]}</Text>,
      );
    }
  } else {
    const half = Math.min(w / 2 - 20, R + 120);
    out.push(
      <g key="mirror">
        {Array.from({ length: Math.floor((2 * half) / 22) }, (_, k) => (
          <line key={k} x1={ox - half + 12 + k * 22} y1={oy + 3} x2={ox - half + k * 22} y2={oy + 17} stroke={INK3} strokeWidth={2} opacity={0.7} />
        ))}
        <line x1={ox - half} y1={oy} x2={ox + half} y2={oy} stroke="#dfe7ff" strokeWidth={5} strokeLinecap="round" />
        <Text x={ox + half} y={oy + 30} anchor="end" size={19} color={INK3}>mirror</Text>
      </g>,
    );
  }

  // A wide beam, with its wavefronts.
  if (beam > 0) {
    const half = BEAM / 2;
    const ci = Math.cos(i);
    const co = Math.cos(o);
    const halfOut = reflects ? half : (half * co) / ci;
    const edge = half / ci;
    // The front lies along (cos, −sin) of the angle after a reflection, and (cos, sin) after a refraction.
    const ny = reflects ? -Math.sin(o) : Math.sin(o);
    const poly = (pts: Array<[number, number]>) => pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');
    const ratio = mirror ? 1 : el.speeds![1] / el.speeds![0];
    const f = fronts(state.angle, state.out, mirror, BEAM, GAP, ratio, state.time * PER_SECOND, R);
    out.push(
      <g key="beam" opacity={beam}>
        <polygon points={poly([[from[0] - half * ci, from[1] - half * Math.sin(i)], [from[0] + half * ci, from[1] + half * Math.sin(i)], [edge, 0], [-edge, 0]])} fill={LIGHT} fillOpacity={0.1} />
        <polygon points={poly([[-edge, 0], [edge, 0], [to[0] + halfOut * co, to[1] + halfOut * ny], [to[0] - halfOut * co, to[1] - halfOut * ny]])} fill={LIGHT} fillOpacity={0.1} />
        {[...f.incoming, ...f.outgoing].map(([x1, y1, x2, y2], k) => (
          <line key={k} x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={LIGHT} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
        ))}
      </g>,
    );
  }

  // The normal: at right angles to the surface, where the ray lands.
  if (normal > 0)
    out.push(
      <g key="normal" opacity={normal}>
        <line x1={ox} y1={Y(R + 8)} x2={ox} y2={mirror ? oy : Y(-R - 8)} stroke={INK} strokeWidth={2.5} strokeDasharray="9 8" opacity={0.8} />
        <Text x={ox + 12} y={Y(R - 4)} anchor="start" size={19} color={INK2}>normal</Text>
      </g>,
    );

  // The rays, each with an arrowhead half way along, and the lamp.
  const ray = (key: string, [x1, y1]: [number, number], [x2, y2]: [number, number], forward: boolean) => {
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const [ux, uy] = forward ? [(x2 - x1) / len, (y2 - y1) / len] : [(x1 - x2) / len, (y1 - y2) / len];
    const [mx, my] = [(x1 + x2) / 2 + ux * 9, (y1 + y2) / 2 + uy * 9];
    const head = (dx: number, dy: number) => `${X(mx + dx).toFixed(1)},${Y(my + dy).toFixed(1)}`;
    return (
      <g key={key} style={{ filter: `drop-shadow(0 0 7px ${LIGHT}88)` }} opacity={beam > 0 ? 1 - 0.45 * beam : 1}>
        <line x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={LIGHT} strokeWidth={5} strokeLinecap="round" />
        <polygon points={`${head(0, 0)} ${head(-ux * 22 - uy * 10, -uy * 22 + ux * 10)} ${head(-ux * 22 + uy * 10, -uy * 22 - ux * 10)}`} fill={LIGHT} />
      </g>
    );
  };
  out.push(ray('in', from, [0, 0], true), ray('out', [0, 0], to, true));
  out.push(<circle key="lamp" cx={X(from[0])} cy={Y(from[1])} r={10} fill={LIGHT} stroke="#15123a" strokeWidth={2} style={{ filter: `drop-shadow(0 0 10px ${LIGHT})` }} />);

  // The image in a mirror: the reflected ray seems to come from a lamp as far behind the mirror as the real one is in front.
  const image = part('image');
  if (image > 0 && mirror && el.behind) {
    const [lx, ly] = from;
    const tick = (y: number) => <line x1={X(lx) - 8} y1={Y(y)} x2={X(lx) + 8} y2={Y(y)} stroke={INK2} strokeWidth={2.5} />;
    out.push(
      <g key="image" opacity={image}>
        <line x1={X(0)} y1={Y(0)} x2={X(lx)} y2={Y(-ly)} stroke={LIGHT} strokeWidth={3} strokeDasharray="4 9" strokeLinecap="round" opacity={0.75} />
        <line x1={X(lx)} y1={Y(ly) + 14} x2={X(lx)} y2={Y(-ly) - 14} stroke={INK3} strokeWidth={2} strokeDasharray="3 7" />
        {tick(ly / 2)}
        {tick(-ly / 2)}
        <circle cx={X(lx)} cy={Y(-ly)} r={10} fill={LIGHT} fillOpacity={0.3} stroke={LIGHT} strokeWidth={2} strokeDasharray="4 4" />
        <Text x={X(lx) - 18} y={Y(ly)} anchor="end" size={20} color={INK2}>lamp</Text>
        <Text x={X(lx) - 18} y={Y(-ly)} anchor="end" size={20} color={INK2}>image</Text>
      </g>,
    );
  }

  // An arc about the landing point between two directions, in degrees anticlockwise from the right.
  const arc = (key: string, a1: number, a2: number, r: number, color: string, opacity: number, label?: string) => {
    if (Math.abs(a2 - a1) < 0.4) return null;
    const pt = (a: number, rr = r): [number, number] => [X(rr * Math.cos(a * RAD)), Y(rr * Math.sin(a * RAD))];
    const [sx, sy] = pt(a1);
    const [ex, ey] = pt(a2);
    const [lx, ly] = pt((a1 + a2) / 2, r + 30);
    // The size is written inside the angle when it is wide enough to hold it.
    const room = clamp01((Math.abs(a2 - a1) - 28) / 7);
    return (
      <g key={key} opacity={opacity}>
        <path d={`M${sx.toFixed(1)},${sy.toFixed(1)} A${r},${r} 0 0 ${a2 > a1 ? 0 : 1} ${ex.toFixed(1)},${ey.toFixed(1)}`} fill="none" stroke={color} strokeWidth={4.5} strokeLinecap="round" />
        {label && room > 0 && <Text x={lx} y={ly} size={20} color={color} opacity={room}>{label}</Text>}
      </g>
    );
  };
  if (angles > 0) {
    out.push(arc('ai', 90, 90 + state.angle, 78, INCIDENCE, angles, degrees(state.angle)));
    if (reflects) out.push(arc('ar', 90 - state.angle, 90, 78, REFLECTION, angles, degrees(state.angle)));
    else out.push(arc('at', 270, 270 + state.out!, 78, REFRACTION, angles, degrees(state.out!)));
    // The sizes again, where they can be read while the ray turns.
    out.push(
      <g key="readout" opacity={angles}>
        <Text x={14} y={top + 22} anchor="start" size={22} color={INCIDENCE}>{`Angle of incidence ${degrees(state.angle)}`}</Text>
        {reflects ? (
          <Text x={mirror ? w - 14 : 14} y={mirror ? top + 22 : top + 54} anchor={mirror ? 'end' : 'start'} size={22} color={REFLECTION}>{`Angle of reflection ${degrees(state.angle)}`}</Text>
        ) : (
          <Text x={w - 14} y={h - 22} anchor="end" size={22} color={REFRACTION}>{`Angle of refraction ${degrees(state.out!)}`}</Text>
        )}
      </g>,
    );
  }
  // The angle between the incoming ray and the surface: not the angle of incidence.
  if (toSurface > 0) {
    out.push(arc('as', 90 + state.angle, 180, 124, INK3, toSurface));
    const a = (135 + state.angle / 2) * RAD;
    out.push(<Text key="ast" x={X(160 * Math.cos(a))} y={Y(160 * Math.sin(a))} size={20} color={INK2} opacity={toSurface}>{degrees(90 - state.angle)}</Text>);
  }

  if (state.note)
    out.push(
      <g key="note">
        <rect x={w / 2 - 120} y={0} width={240} height={38} rx={19} fill="rgb(167 139 250 / 0.2)" stroke="rgb(167 139 250 / 0.6)" />
        <Text x={w / 2} y={19.5} size={19} color="#fff">
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
