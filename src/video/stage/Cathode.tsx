/**
 * A cathode ray tube (src/video/cathode.ts works it all out).
 *
 * The tube is drawn to scale, from the side: the cathode on the left, the anode with its slit,
 * two plates with the magnetic field between them, and the screen on the right, which glows
 * where the beam lands. The beam is the path that the model works out for the fields as they are
 * now, with electrons streaming along it.
 *
 * A wheel: the rays push a paddle wheel along its rails, away from the cathode.
 *
 * A shadow: a metal cross stands in the way of a broad beam, and the end of the tube, drawn from
 * the front as well, glows everywhere but in the sharp shadow of the cross.
 */
import type { ReactElement } from 'react';
import type { CathodeEl } from '../script.ts';
import { CHARGE, CROSS, TUBE, WHEEL, beamPath, cathodeAt, firstSpeed, radiusOf, speedFromVolts, through, type CathodeState } from '../cathode.ts';
import { chance } from '../matter.ts';
import { ownPart, type ElState } from '../timeline.ts';
import { FIELD, NEGATIVE, POSITIVE } from './Charges.tsx';
import { Value } from './Light.tsx';
import { Arrow, clamp01, FONT, INK2, Text, VELOCITY } from './motionKit.tsx';
import { TONES } from './tex.ts';
import { INK, INK3 } from './Triangle.tsx';

/** The size the pictures are designed at; they are scaled to the room they are given. */
const WIDE = 1136;
const GLOW = TONES.good;
const PUSH = TONES.opp;
const METAL = '#c9c6e8';
const GLASS = 'rgb(188 217 255 / 0.5)';
/** The glass begins this far behind the cathode and ends this far past the screen, in metres. */
const BACK = 0.02;
const PAST = 0.006;
/** How far apart the electrons of the beam are drawn, and how fast they stream along it, in pixels and pixels each second. */
const APART = 38;
const STREAM = 540;

type P = [number, number];

interface Frame {
  out: ReactElement[];
  el: CathodeEl;
  state: CathodeState;
  left: number;
  across: number;
  top: number;
  HIGH: number;
  /** Pixels for each metre, and the places on the screen of a distance along the tube and a height above the beam. */
  S: number;
  X: (metres: number) => number;
  Y: (metres: number) => number;
  part: (name: string) => number;
}

/** The length of a path in pixels, and the point a distance along it. */
const lengthPx = (pts: P[]) => pts.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
function along(pts: P[], far: number): P {
  let left = far;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (left <= d && d > 0) return [pts[i - 1][0] + ((pts[i][0] - pts[i - 1][0]) * left) / d, pts[i - 1][1] + ((pts[i][1] - pts[i - 1][1]) * left) / d];
    left -= d;
  }
  return pts[pts.length - 1];
}
/** The first part of a path, as far as a distance along it. */
function upTo(pts: P[], far: number): P[] {
  const kept: P[] = [pts[0]];
  let left = far;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (left <= d) {
      if (d > 0) kept.push([pts[i - 1][0] + ((pts[i][0] - pts[i - 1][0]) * left) / d, pts[i - 1][1] + ((pts[i][1] - pts[i - 1][1]) * left) / d]);
      return kept;
    }
    kept.push(pts[i]);
    left -= d;
  }
  return kept;
}
const line = (pts: P[]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/** A ray: a soft line with electrons streaming along it, as far as it has reached. */
function Ray({ pts, lit, time, shift = 0, weight = 5 }: { pts: P[]; lit: number; time: number; shift?: number; weight?: number }) {
  if (lit <= 1) return null;
  const dots: P[] = [];
  for (let s = (time * STREAM + shift * APART) % APART; s < lit; s += APART) dots.push(along(pts, s));
  return (
    <g>
      <polyline points={line(upTo(pts, lit))} fill="none" stroke={NEGATIVE} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" opacity={0.3} style={{ filter: `drop-shadow(0 0 6px ${NEGATIVE})` }} />
      <path d={dots.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0.01`).join('')} fill="none" stroke={NEGATIVE} strokeWidth={7} strokeLinecap="round" />
    </g>
  );
}

/** The glass of the tube, with the lead of the cathode through its end. */
function glass({ out, X, Y }: Frame): void {
  const [x0, x1, y0, y1] = [X(-BACK), X(TUBE.screen + PAST), Y(TUBE.wall), Y(-TUBE.wall)];
  out.push(<rect key="glass" x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={(y1 - y0) * 0.24} fill="rgb(188 217 255 / 0.05)" stroke={GLASS} strokeWidth={2.2} />);
  out.push(<line key="lead" x1={x0 - 26} y1={Y(0)} x2={X(0)} y2={Y(0)} stroke={METAL} strokeWidth={3} />);
}

/** The air left in the tube: molecules that drift about, fewer as it is pumped out. */
function air({ out, state, X, Y }: Frame): void {
  const many = Math.round(90 * state.air);
  const dots: ReactElement[] = [];
  for (let i = 1; i <= many; i++) {
    const x = -BACK + 0.008 + chance(i, 21) * (TUBE.screen + BACK - 0.012) + 0.0016 * Math.sin(state.time * 2.1 + i);
    const y = (chance(i, 22) * 2 - 1) * (TUBE.wall - 0.005) + 0.0016 * Math.cos(state.time * 1.7 + 2 * i);
    dots.push(<circle key={i} cx={X(x)} cy={Y(y)} r={3.6} fill="#8fa3c8" opacity={0.75} />);
  }
  out.push(<g key="air">{dots}</g>);
}

/** A sign beside an electrode. */
const Sign = ({ x, y, plus, opacity = 1 }: { x: number; y: number; plus: boolean; opacity?: number }) => (
  <g opacity={opacity}>
    <circle cx={x} cy={y} r={11} fill={plus ? POSITIVE : NEGATIVE} stroke="#0d0c24" strokeWidth={1.5} />
    <line x1={x - 5.5} y1={y} x2={x + 5.5} y2={y} stroke="#fff" strokeWidth={2.6} strokeLinecap="round" />
    {plus && <line x1={x} y1={y - 5.5} x2={x} y2={y + 5.5} stroke="#fff" strokeWidth={2.6} strokeLinecap="round" />}
  </g>
);

/** The numbers of a tube, in a column on the right of it when there is room, or else in a row under it. */
function readouts(frame: Frame, rows: Array<(x: number, y: number, anchor: 'start' | 'middle') => ReactElement>): void {
  const { out, left, across, X, Y, HIGH } = frame;
  if (!rows.length) return;
  const room = left + across - X(TUBE.screen + PAST);
  if (room >= 250) {
    const x = X(TUBE.screen + PAST) + 34;
    rows.forEach((row, i) => out.push(row(x, Y(0) + (i - (rows.length - 1) / 2) * 40, 'start')));
  } else {
    const y = Math.min(HIGH - 26, Y(-TUBE.wall) + 40);
    rows.forEach((row, i) => out.push(row(left + ((i + 0.5) / rows.length) * across, y, 'middle')));
  }
}

function drawRay(frame: Frame): void {
  const { out, el, state, top, HIGH, S, X, Y, part, left, across } = frame;
  const T = TUBE;
  const [names, values, speedPart, straight, force, circle, made] = [part('names'), part('values'), part('speed'), part('straight'), part('force'), part('circle'), part('made')];
  const plates = el.field !== undefined;
  const magnet = el.tesla !== undefined;
  const phases = Object.values(el.clips).flatMap((clip) => clip.phases);
  const mostField = Math.max(Math.abs(el.field ?? 0), ...phases.map((ph) => Math.abs(ph.field ?? 0)), 1e-9);
  const mostTesla = Math.max(Math.abs(el.tesla ?? 0), ...phases.map((ph) => Math.abs(ph.tesla ?? 0)), 1e-12);
  const mostSpeed = Math.max(firstSpeed(el), ...phases.map((ph) => ph.speed ?? (ph.volts ? speedFromVolts(ph.volts) : 0)));
  glass(frame);
  if (state.air > 0.005) air(frame);

  // The screen, the cathode, and the anode with its slit.
  out.push(<rect key="screen" x={X(T.screen)} y={Y(T.wall - 0.006)} width={5} height={(T.wall - 0.006) * 2 * S} rx={2.5} fill={GLOW} opacity={0.2} />);
  out.push(<rect key="cathode" x={X(0) - 7} y={Y(0.011)} width={7} height={0.022 * S} rx={2} fill={METAL} />);
  out.push(
    <g key="anode">
      <rect x={X(T.anode) - 3} y={Y(0.022)} width={6} height={(0.022 - T.slit) * S} rx={2} fill={METAL} />
      <rect x={X(T.anode) - 3} y={Y(-T.slit)} width={6} height={(0.022 - T.slit) * S} rx={2} fill={METAL} />
      <line x1={X(T.anode)} y1={Y(0.022)} x2={X(T.anode)} y2={Y(T.wall) - 12} stroke={METAL} strokeWidth={3} />
    </g>,
  );

  // The magnetic field between the plates: a cross where it goes into the picture, a dot where it comes out.
  if (magnet) {
    const k = clamp01(Math.abs(state.tesla) / mostTesla);
    const reach = plates ? T.gap / 2 - 0.005 : T.wall - 0.008;
    const marks: ReactElement[] = [];
    // The rows sit on either side of the beam, so that no mark lies on it.
    const rows = Math.floor(reach / 0.009 + 0.5);
    for (let x = T.from + 0.005; x < T.to; x += 0.01)
      for (let j = -rows; j < rows; j++) {
        const y = (j + 0.5) * 0.009;
        const [cx, cy] = [X(x), Y(y)];
        marks.push(
          state.tesla > 0 ? (
            <path key={`${x.toFixed(3)}:${y.toFixed(3)}`} d={`M ${cx - 5} ${cy - 5} L ${cx + 5} ${cy + 5} M ${cx - 5} ${cy + 5} L ${cx + 5} ${cy - 5}`} stroke={FIELD} strokeWidth={2.2} strokeLinecap="round" />
          ) : (
            <g key={`${x.toFixed(3)}:${y.toFixed(3)}`}>
              <circle cx={cx} cy={cy} r={6.5} fill="none" stroke={FIELD} strokeWidth={1.6} />
              <circle cx={cx} cy={cy} r={2.4} fill={FIELD} />
            </g>
          ),
        );
      }
    out.push(
      <g key="magnet" opacity={k}>
        <rect x={X(T.from) - 6} y={Y(reach + 0.004)} width={(T.to - T.from) * S + 12} height={(reach + 0.004) * 2 * S} rx={10} fill={FIELD} fillOpacity={0.07} stroke={FIELD} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="5 6" />
        <g opacity={0.7}>{marks}</g>
      </g>,
    );
  }

  // The plates: the positive one red, the negative one blue, more strongly for a stronger field.
  if (plates) {
    const k = clamp01(Math.abs(state.field) / mostField);
    const up = state.field >= 0;
    for (const side of [1, -1]) {
      const plus = (side > 0) === up;
      const y = Y((side * T.gap) / 2) - (side > 0 ? 8 : 0);
      out.push(
        <g key={`plate${side}`}>
          <rect x={X(T.from)} y={y} width={(T.to - T.from) * S} height={8} rx={3} fill={METAL} />
          <rect x={X(T.from)} y={y} width={(T.to - T.from) * S} height={8} rx={3} fill={plus ? POSITIVE : NEGATIVE} opacity={k} />
          <line x1={X((T.from + T.to) / 2)} y1={y + (side > 0 ? 0 : 8)} x2={X((T.from + T.to) / 2)} y2={Y(side * T.wall) - side * 12} stroke={METAL} strokeWidth={3} />
          <Sign x={X(T.from) - 20} y={y + 4} plus={plus} opacity={k} />
        </g>,
      );
    }
  }

  // The path with no fields, dashed.
  if (straight > 0) out.push(<line key="straight" x1={X(T.from)} y1={Y(0)} x2={X(T.screen)} y2={Y(0)} stroke={INK2} strokeWidth={1.6} strokeDasharray="6 8" opacity={0.6 * straight} />);

  // The circle that the magnetic field bends the beam along, and its radius.
  if (circle > 0 && Math.abs(state.tesla) > 1e-9) {
    const r = radiusOf(state.speed, state.tesla);
    if (r < 5) {
      const below = state.tesla > 0 ? 1 : -1;
      const [cx, cy, R] = [X(T.from), Y(0) + below * r * S, r * S];
      const clip = `cathode-circle-${el.id}`;
      const inside = cy > top + 16 && cy < HIGH - 16;
      out.push(
        <g key="circle" opacity={circle}>
          <clipPath id={clip}>
            <rect x={left + 4} y={top + 4} width={across - 8} height={HIGH - top - 8} />
          </clipPath>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={FIELD} strokeWidth={2} strokeDasharray="7 8" opacity={0.75} clipPath={`url(#${clip})`} />
          {inside && <line x1={cx} y1={cy} x2={cx} y2={Y(0)} stroke={FIELD} strokeWidth={2.4} />}
          {inside && <circle cx={cx} cy={cy} r={4.5} fill={FIELD} />}
          <Text x={cx + 14} y={inside ? (cy + Y(0)) / 2 + below * T.wall * S * 0.62 : Y(0) + below * (T.wall * S + 30)} color={FIELD} size={20} anchor="start">
            {`r = ${r < 1 ? `${(r * 100).toPrecision(3)} cm` : `${r.toPrecision(3)} m`}`}
          </Text>
        </g>,
      );
    }
  }

  // The beam, as far as it has reached, and the glow where it lands.
  const beam = beamPath(state.speed, state.field, state.tesla, plates);
  const pts = beam.points.map(([x, y]): P => [X(x), Y(y)]);
  const total = lengthPx(pts);
  const lit = Math.min(total * through(state.air), state.on ? state.reach * S : 0);
  out.push(<Ray key="beam" pts={pts} lit={lit} time={state.time} />);
  if (lit >= total - 0.5) {
    const [x, y] = pts[pts.length - 1];
    const bright = beam.ends === 'screen';
    out.push(
      <g key="spot" style={{ filter: `drop-shadow(0 0 ${bright ? 12 : 7}px ${GLOW})` }}>
        <circle cx={x + (bright ? 2.5 : 0)} cy={y} r={bright ? 10 : 6.5} fill={GLOW} opacity={bright ? 0.95 : 0.7} />
      </g>,
    );
  }

  // The two forces on one electron, half way through the fields.
  if (force > 0 && lit >= X(beam.middle[0]) - X(0)) {
    const [mx, my] = [X(beam.middle[0]), Y(beam.middle[1])];
    const most = CHARGE * Math.max(mostField, mostSpeed * mostTesla);
    const fs = Math.min(64, (T.gap / 2) * S * 0.74) / most;
    const electric = CHARGE * state.field * fs;
    const magnetic = CHARGE * state.speed * Math.abs(state.tesla) * fs;
    const way = state.tesla > 0 ? 1 : -1;
    const [dx, dy] = [beam.heading[1] * way, -beam.heading[0] * way];
    out.push(
      <g key="forces" opacity={force}>
        <Arrow x={mx} y={my} len={electric} axis="y" color={PUSH} weight={7} />
        <Arrow x={mx} y={my} len={magnetic} turn={(Math.atan2(dy, dx) * 180) / Math.PI} color={FIELD} weight={7} />
        <circle cx={mx} cy={my} r={9} fill={NEGATIVE} stroke="#0d0c24" strokeWidth={1.5} />
        <line x1={mx - 4.5} y1={my} x2={mx + 4.5} y2={my} stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
        {Math.abs(electric) > 12 && (
          <Text x={mx + 16} y={my - Math.sign(electric) * Math.max(22, Math.abs(electric) - 8)} color={PUSH} size={17} anchor="start">
            Electric force
          </Text>
        )}
        {magnetic > 12 && (
          <Text x={mx + 16 + dx * magnetic} y={my - dy * Math.max(22, magnetic - 8)} color={FIELD} size={17} anchor="start">
            Magnetic force
          </Text>
        )}
      </g>,
    );
  }

  if (names > 0) {
    const y = Y(T.wall) - 30;
    out.push(<Text key="n-cathode" x={X(0) + 14} y={y} color={NEGATIVE} size={19} anchor="end" opacity={names}>Cathode (−)</Text>);
    out.push(<Text key="n-anode" x={X(T.anode) - 12} y={y} color={POSITIVE} size={19} anchor="start" opacity={names}>Anode (+)</Text>);
    out.push(<Text key="n-screen" x={X(T.screen) + 6} y={y} color={INK2} size={19} anchor="end" opacity={names}>Screen</Text>);
    if (plates) out.push(<Text key="n-plates" x={X((T.from + T.to) / 2) + 14} y={y} color={INK2} size={19} anchor="start" opacity={names}>{magnet ? 'Plates and magnetic field' : 'Plates'}</Text>);
    else if (magnet) out.push(<Text key="n-plates" x={X((T.from + T.to) / 2)} y={y} color={INK2} size={19} opacity={names}>Magnetic field</Text>);
  }
  if (made > 0) {
    const y = Y(-T.wall) + 30;
    if (state.metal) out.push(<Text key="m-metal" x={X(-BACK)} y={y} color={INK} size={20} anchor="start" opacity={made}>{`Cathode: ${state.metal}`}</Text>);
    if (state.gas) out.push(<Text key="m-gas" x={X(T.screen + PAST)} y={y} color={INK} size={20} anchor="end" opacity={made}>{`Gas left in the tube: ${state.gas}`}</Text>);
  }

  const rows: Array<(x: number, y: number, anchor: 'start' | 'middle') => ReactElement> = [];
  if (values > 0 && state.volts > 0) rows.push((x, y, anchor) => <Text key="v-volts" x={x} y={y} color={INK} size={21} anchor={anchor} opacity={values}>{`V = ${Math.round(state.volts)} V`}</Text>);
  if (values > 0 && plates) rows.push((x, y, anchor) => (Math.abs(state.field) < 0.5 ? <Text key="v-field" x={x} y={y} color={PUSH} size={21} anchor={anchor} opacity={values}>E = 0</Text> : <Value key="v-field" x={x} y={y} pre="E = " n={Math.abs(state.field)} unit="V/m" color={PUSH} anchor={anchor} opacity={values} />));
  if (values > 0 && magnet) rows.push((x, y, anchor) => <Text key="v-tesla" x={x} y={y} color={FIELD} size={21} anchor={anchor} opacity={values}>{Math.abs(state.tesla) < 5e-7 ? 'B = 0' : `B = ${(Math.abs(state.tesla) * 1000).toFixed(2)} mT`}</Text>);
  if (speedPart > 0) rows.push((x, y, anchor) => <Value key="v-speed" x={x} y={y} pre="v = " n={state.speed} unit="m/s" color={VELOCITY} anchor={anchor} opacity={speedPart} />);
  readouts(frame, rows);
}

function drawWheel(frame: Frame): void {
  const { out, state, S, X, Y, part } = frame;
  const names = part('names');
  const W = WHEEL;
  glass(frame);
  out.push(<rect key="cathode" x={X(0) - 7} y={Y(0.016)} width={7} height={0.032 * S} rx={2} fill={METAL} />);
  out.push(
    <g key="anode">
      <rect x={X(W.anode)} y={Y(0.016)} width={7} height={0.032 * S} rx={2} fill={METAL} />
      <line x1={X(W.anode) + 7} y1={Y(0)} x2={X(TUBE.screen + PAST) + 26} y2={Y(0)} stroke={METAL} strokeWidth={3} />
    </g>,
  );
  // The rails, at the height of the axle, with a stop at each end.
  const ry = Y(-W.below);
  out.push(
    <g key="rails">
      <line x1={X(W.from - 0.012)} y1={ry} x2={X(W.to + 0.012)} y2={ry} stroke={GLASS} strokeWidth={4} strokeLinecap="round" />
      <line x1={X(W.from - 0.012)} y1={ry - 9} x2={X(W.from - 0.012)} y2={ry + 9} stroke={GLASS} strokeWidth={4} strokeLinecap="round" />
      <line x1={X(W.to + 0.012)} y1={ry - 9} x2={X(W.to + 0.012)} y2={ry + 9} stroke={GLASS} strokeWidth={4} strokeLinecap="round" />
    </g>,
  );
  // The rays: three of them, which stop at the paddles above the axle.
  const lit = state.on ? state.reach * S : 0;
  [0.004, 0, -0.004].forEach((y, i) => {
    const stop = state.wheel.x - Math.sqrt(Math.max(0, W.radius * W.radius - (y + W.below) * (y + W.below)));
    const pts: P[] = [
      [X(0), Y(y)],
      [X(stop), Y(y)],
    ];
    out.push(<Ray key={`ray${i}`} pts={pts} lit={Math.min(lit, pts[1][0] - pts[0][0])} time={state.time} shift={i / 3} weight={4} />);
  });
  // The wheel: six vanes on an axle, which turns as it rolls.
  const [wx, R] = [X(state.wheel.x), W.radius * S];
  const vanes: ReactElement[] = [];
  for (let i = 0; i < 6; i++) vanes.push(<line key={i} x1={0.18 * R} y1={0} x2={R} y2={0} stroke={i === 0 ? TONES.theta : '#e9e6ff'} strokeWidth={5} strokeLinecap="round" transform={`rotate(${i * 60})`} />);
  out.push(
    <g key="wheel" transform={`translate(${wx.toFixed(1)} ${ry.toFixed(1)}) rotate(${((state.wheel.angle * 180) / Math.PI).toFixed(1)})`}>
      {vanes}
      <circle r={6} fill={METAL} stroke="#0d0c24" strokeWidth={1.5} />
    </g>,
  );
  if (names > 0) {
    const y = Y(TUBE.wall) - 24;
    out.push(<Text key="n-cathode" x={X(0)} y={y} color={NEGATIVE} size={19} opacity={names}>Cathode (−)</Text>);
    out.push(<Text key="n-anode" x={X(W.anode)} y={y} color={POSITIVE} size={19} opacity={names}>Anode (+)</Text>);
    out.push(<Text key="n-wheel" x={X((W.from + W.to) / 2)} y={Y(-TUBE.wall) + 28} color={INK2} size={19} opacity={names}>A paddle wheel on glass rails</Text>);
  }
}

function drawShadow(frame: Frame): void {
  const { out, el, state, left, across, S, X, Y, part } = frame;
  const [names, face] = [part('names'), part('face')];
  const C = CROSS;
  const wall = TUBE.wall;
  glass(frame);
  out.push(<rect key="cathode" x={X(0) - 7} y={Y(C.rays + 0.002)} width={7} height={(C.rays + 0.002) * 2 * S} rx={2} fill={METAL} />);
  out.push(
    <g key="anode">
      <line x1={X(C.anode)} y1={Y(-wall) + 14} x2={X(C.anode)} y2={Y(-wall + 0.006)} stroke={METAL} strokeWidth={3} />
      <rect x={X(C.anode) - 12} y={Y(-wall + 0.006) - 5} width={24} height={5} rx={2} fill={METAL} />
    </g>,
  );
  // The cross, on a stem hinged at the glass: upright, or folded down flat.
  const fold = (1 - state.stand) * 90;
  const cos = Math.cos((fold * Math.PI) / 180);
  const sin = Math.sin((fold * Math.PI) / 180);
  const hinge = wall - 0.005;
  const [low, high] = [hinge - C.half, hinge + C.half];
  out.push(<line key="post" x1={X(C.at)} y1={Y(-wall) + 12} x2={X(C.at)} y2={Y(-hinge)} stroke={METAL} strokeWidth={2.5} />);
  out.push(
    <g key="cross" transform={`translate(${X(C.at).toFixed(1)} ${Y(-hinge).toFixed(1)}) rotate(${fold.toFixed(1)})`}>
      <line x1={0} y1={0} x2={0} y2={-low * S} stroke={METAL} strokeWidth={2.5} />
      <rect x={-4} y={-high * S} width={8} height={(high - low) * S} rx={2} fill="#e9e6ff" stroke="#0d0c24" strokeWidth={1} />
    </g>,
  );
  // The rays: each goes straight on until it meets the cross, or the end of the tube.
  const reach = state.on ? state.reach * S : 0;
  const count = 9;
  const blocked: boolean[] = [];
  let arrived = false;
  for (let j = 0; j < count; j++) {
    const y = C.rays * ((2 * j) / (count - 1) - 1);
    const h = cos > 0.02 ? (y + hinge) / cos : Infinity;
    const hit = h >= low && h <= high;
    blocked.push(hit);
    const end = hit ? C.at + h * sin : TUBE.screen;
    const pts: P[] = [
      [X(0), Y(y)],
      [X(end) - (hit ? 4 : 0), Y(y)],
    ];
    const lit = Math.min(reach, pts[1][0] - pts[0][0]);
    if (!hit && lit >= pts[1][0] - pts[0][0] - 0.5) arrived = true;
    out.push(<Ray key={`ray${j}`} pts={pts} lit={lit} time={state.time} shift={chance(j + 1, 31)} weight={3.5} />);
  }
  // The end of the tube glows where the rays land, and stays dark in the shadow.
  const [shadowLow, shadowHigh] = [-hinge + low * cos, -hinge + high * cos];
  if (arrived) {
    const bands: Array<[number, number]> = cos > 0.02 && shadowHigh > -C.rays ? [[-C.rays - 0.003, Math.max(-C.rays - 0.003, shadowLow)], [Math.min(C.rays + 0.003, shadowHigh), C.rays + 0.003]] : [[-C.rays - 0.003, C.rays + 0.003]];
    out.push(
      <g key="glow" style={{ filter: `drop-shadow(0 0 9px ${GLOW})` }}>
        {bands.filter(([a, b]) => b - a > 0.0005).map(([a, b], i) => (
          <rect key={i} x={X(TUBE.screen)} y={Y(b)} width={6} height={(b - a) * S} rx={3} fill={GLOW} opacity={0.9} />
        ))}
      </g>,
    );
  }
  // The end of the tube from the front: a glowing disc, with the shadow of the cross on it.
  if (face > 0) {
    const room = left + across - X(TUBE.screen + PAST);
    const R = Math.min(wall * S, room / 2 - 34);
    const [fx, fy] = [X(TUBE.screen + PAST) + room / 2, Y(0)];
    const k = R / wall;
    const clip = `cathode-face-${el.id}`;
    const arm = C.half * 0.3;
    const cy = fy - (-hinge + hinge * cos) * k;
    out.push(
      <g key="face" opacity={face}>
        <clipPath id={clip}>
          <circle cx={fx} cy={fy} r={(C.rays + 0.003) * k} />
        </clipPath>
        <circle cx={fx} cy={fy} r={R} fill="rgb(188 217 255 / 0.05)" stroke={GLASS} strokeWidth={2.2} />
        {arrived && <circle cx={fx} cy={fy} r={(C.rays + 0.003) * k} fill={GLOW} opacity={0.6} style={{ filter: `drop-shadow(0 0 10px ${GLOW})` }} />}
        {arrived && cos > 0.02 && (
          <g clipPath={`url(#${clip})`}>
            <g transform={`translate(${fx.toFixed(1)} ${cy.toFixed(1)}) scale(1 ${cos.toFixed(3)})`} fill="#0c0b24">
              <rect x={-arm * k} y={-C.half * k} width={2 * arm * k} height={2 * C.half * k} />
              <rect x={-C.half * k} y={-arm * k} width={2 * C.half * k} height={2 * arm * k} />
              <rect x={-1.2} y={0} width={2.4} height={wall * k} />
            </g>
          </g>
        )}
        <Text x={fx} y={fy + R + 24} color={INK2} size={18}>
          The end, from the front
        </Text>
      </g>,
    );
  }
  if (names > 0) {
    const y = Y(wall) - 24;
    out.push(<Text key="n-cathode" x={X(0)} y={y} color={NEGATIVE} size={19} opacity={names}>Cathode (−)</Text>);
    out.push(<Text key="n-cross" x={X(C.at)} y={y} color={INK2} size={19} opacity={names}>Metal cross</Text>);
    out.push(<Text key="n-anode" x={X(C.anode)} y={Y(-wall) + 30} color={POSITIVE} size={19} opacity={names}>Anode (+)</Text>);
  }
}

export function CathodeView({ el, st, w, h, plays, fit }: { el: CathodeEl; st: ElState | undefined; w: number; h: number; plays?: Array<[string, number]>; fit?: number }) {
  const p = st?.p ?? 0;
  if (p <= 0) return <div style={{ width: w, height: h }} />;
  const played = plays ?? st?.plays ?? [];
  const out: ReactElement[] = [];
  const HIGH = fit ?? WIDE * (h / w);
  const across = fit ? (fit * w) / h : WIDE;
  const left = (WIDE - across) / 2;
  if (el.label)
    out.push(
      <text key="label" x={left} y={14} fill={INK3} fontSize={18} fontWeight={600} style={{ fontFamily: FONT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {el.label}
      </text>,
    );
  const top = el.label ? 30 : 0;
  out.push(<rect key="panel" x={left} y={top} width={across} height={HIGH - top} rx={14} fill="rgb(8 7 28 / 0.55)" stroke="rgb(188 217 255 / 0.25)" strokeWidth={1.5} />);
  // The tube is drawn to scale: `scale` pixels to a centimetre, with its beam at a share of the height.
  const S = (el.scale ?? 44) * 100;
  const long = (BACK + TUBE.screen + PAST) * S;
  const x0 = (el.left !== undefined ? left + el.left : left + (across - long) / 2) + BACK * S;
  const ay = top + (HIGH - top) * (el.axis ?? 0.5);
  const state = cathodeAt(el, played);
  const frame: Frame = { out, el, state, left, across, top, HIGH, S, X: (m) => x0 + m * S, Y: (m) => ay - m * S, part: (name) => ownPart(st, name) };
  if (el.picture === 'wheel') drawWheel(frame);
  else if (el.picture === 'shadow') drawShadow(frame);
  else drawRay(frame);
  return (
    <div style={{ width: w, height: h, opacity: clamp01(p), transform: `translateY(${(1 - clamp01(p)) * 14}px)` }}>
      <svg width={w} height={h} viewBox={`${left} 0 ${across} ${HIGH}`} style={{ overflow: 'visible', display: 'block' }}>
        {out}
      </svg>
    </div>
  );
}
