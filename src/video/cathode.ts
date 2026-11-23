/**
 * A cathode ray tube (the `cathode` element; src/video/stage/Cathode.tsx draws it).
 *
 * Electrons leave the cathode, pass the anode, and cross the tube to a screen that glows where
 * they land. On the way they can pass between two charged plates and through a magnetic field
 * at right angles to the picture, and the path of the beam is worked out from the two forces on
 * each electron, with the charge-to-mass ratio the lessons use (1.76 × 10¹¹ C/kg):
 *
 * - between the plates the electric force qE pushes each electron towards the positive plate;
 * - the magnetic force qvB is always at right angles to the motion, so alone it bends the beam
 *   into a part of a circle of radius v ÷ (B q/m);
 * - with both, the beam goes straight when the two forces are equal: v = E ÷ B.
 *
 * The electrons cross the tube in a few billionths of a second, so the whole beam takes its new
 * shape as soon as a field changes. Two more pictures show what the rays do with no fields: a
 * paddle wheel that the rays push along its rails, and a metal cross that casts a sharp shadow.
 */
import type { CathodeEl } from './script.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

type P = [number, number];

/** The charge-to-mass ratio of the electron that the lessons use, in coulombs per kilogram, and the size of its charge. */
export const RATIO = 1.76e11;
export const CHARGE = 1.6e-19;

/**
 * The tube, in metres, measured along the beam from the cathode: the anode and half the width of
 * its slit, where the plates and the magnetic field begin and end, the gap between the plates,
 * the glass (half its height) and the screen.
 */
export const TUBE = { anode: 0.03, slit: 0.0025, from: 0.07, to: 0.12, gap: 0.04, wall: 0.034, screen: 0.2 } as const;

/** The speed, in metres per second, of an electron that starts from rest and is accelerated through a voltage: qV = ½mv². */
export const speedFromVolts = (volts: number) => Math.sqrt(2 * RATIO * volts);

/** The radius, in metres, of the circle that a magnetic field bends the beam into: qvB = mv² ÷ r. */
export const radiusOf = (speed: number, tesla: number) => speed / (RATIO * Math.abs(tesla));

/** The electric field, in volts per metre, that keeps a beam straight in a magnetic field: qE = qvB. */
export const balanceField = (speed: number, tesla: number) => speed * tesla;

/** The charge-to-mass ratio from the speed, the field and the radius of the circle, and with no speed, from the accelerating voltage. */
export const ratioFromCircle = (speed: number, tesla: number, radius: number) => speed / (tesla * radius);
export const ratioFromVolts = (volts: number, tesla: number, radius: number) => (2 * volts) / (tesla * tesla * radius * radius);

/** The path of the beam: its points in metres (x along the tube from the cathode, y up), and what it lands on. */
export interface Beam {
  points: P[];
  ends: 'screen' | 'plate' | 'wall' | 'anode';
  /** The direction of the beam, as a unit vector, half way through the fields. */
  heading: P;
  /** The point half way through the fields. */
  middle: P;
}

/**
 * The path of the beam for a speed, an electric field between the plates (volts per metre; a
 * positive field has the top plate positive, so the electrons are pushed up) and a magnetic
 * field (teslas; a positive field goes into the picture, so electrons that move to the right
 * are pushed down). Each step gives the electron half the electric push, turns its velocity
 * through the angle the magnetic field turns it in that time, and gives it the other half: the
 * speed is then unchanged by the magnetic field, as it should be.
 */
export function beamPath(speed: number, field = 0, tesla = 0, plates = true): Beam {
  const T = TUBE;
  const points: P[] = [
    [0, 0],
    [T.from, 0],
  ];
  let [x, y, vx, vy] = [T.from as number, 0, speed, 0];
  let [heading, middle]: [P, P] = [
    [1, 0],
    [(T.from + T.to) / 2, 0],
  ];
  let halfway = false;
  const note = () => {
    if (halfway || x < (T.from + T.to) / 2) return;
    halfway = true;
    const v = Math.hypot(vx, vy);
    heading = [vx / v, vy / v];
    middle = [x, y];
  };
  if (field !== 0 || tesla !== 0) {
    const dt = (T.to - T.from) / speed / 240;
    const turn = -RATIO * tesla * dt;
    const [c, s] = [Math.cos(turn), Math.sin(turn)];
    const kick = (RATIO * field * dt) / 2;
    for (let i = 0; i < 6000; i++) {
      vy += kick;
      [vx, vy] = [vx * c - vy * s, vx * s + vy * c];
      vy += kick;
      x += vx * dt;
      y += vy * dt;
      points.push([x, y]);
      note();
      if (plates && Math.abs(y) >= T.gap / 2) return { points, ends: 'plate', heading, middle };
      if (Math.abs(y) >= T.wall) return { points, ends: 'wall', heading, middle };
      if (x >= T.to || x < T.from) break;
    }
  } else {
    x = T.to;
    points.push([x, 0]);
  }
  // Past the fields the beam goes straight on, to the screen, the glass, or back to the anode.
  const far = vx > 0 ? (T.screen - x) / vx : vx < 0 ? (T.anode - x) / vx : Infinity;
  const side = vy > 0 ? (T.wall - y) / vy : vy < 0 ? (-T.wall - y) / vy : Infinity;
  const t = Math.min(far, side);
  points.push([x + vx * t, y + vy * t]);
  return { points, ends: side < far ? 'wall' : vx > 0 ? 'screen' : 'anode', heading, middle };
}

/** How far up the screen the beam lands, in metres, or nothing when it does not reach the screen. */
export function landing(beam: Beam): number | undefined {
  return beam.ends === 'screen' ? beam.points[beam.points.length - 1][1] : undefined;
}

/** The length of a path, in metres. */
export const lengthOf = (points: P[]) => points.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]), 0);

// ── The paddle wheel and the cross ───────────────────────────────────────────────────────────

/** The paddle wheel: its radius, where its rails begin and end, how far below the beam its axle is, and the anode at the far end of its tube, in metres. */
export const WHEEL = { radius: 0.013, from: 0.05, to: 0.155, below: 0.007, anode: 0.185 } as const;
/** The most the wheel rolls in each second of video, and how quickly it picks up and loses speed, in metres. */
const ROLL = 0.008;
const PICK_UP = 0.006;

/** The metal cross: where it stands, half its height, and the anode near the cathode, in metres. */
export const CROSS = { at: 0.105, half: 0.014, anode: 0.035, rays: 0.026 } as const;

// ── The state of a tube after its clips ──────────────────────────────────────────────────────

export interface CathodeState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** Whether the high voltage is on, and how far from the cathode the rays have reached since, in metres. */
  on: boolean;
  reach: number;
  /** The speed of the electrons, in metres per second, and the voltage that accelerated them (0 when the element gives a speed). */
  speed: number;
  volts: number;
  /** The electric field between the plates, in volts per metre, and the magnetic field, in teslas. */
  field: number;
  tesla: number;
  /** The air left in the tube, from 0 (pumped out) to 1. */
  air: number;
  /** How far the cross has been stood up, from 0 (flat) to 1. */
  stand: number;
  /** The paddle wheel: where its axle is, in metres from the cathode, how far it has turned, in radians, and its speed. */
  wheel: { x: number; angle: number; speed: number };
  /** The metal of the cathode and the gas left in the tube, when a clip names them. */
  metal?: string;
  gas?: string;
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const STEP = 1 / 30;
/** How fast the front of the rays crosses the picture when the voltage is switched on, in metres each second of video. */
const FRONT = 0.42;

/** The speed that a tube starts with: the one it is given, or the one that its accelerating voltage gives an electron. */
export const firstSpeed = (el: CathodeEl) => el.speed ?? speedFromVolts(el.volts ?? 1000);

/** How far the rays get through the air left in the tube, as a share of the way across: all the way once the air is pumped out. */
export const through = (air: number) => (air <= 0.02 ? 1 : Math.max(0.06, (1 - air) * (1 - air)));

/** The state of a tube after its clips. A phase can switch the voltage, and slide the fields, the speed, the air and the cross to new values, gently. */
export function cathodeAt(el: CathodeEl, plays: Plays = []): CathodeState {
  const byVolts = el.speed === undefined;
  let [speed, volts, field, tesla, air, stand] = [firstSpeed(el), byVolts ? (el.volts ?? 1000) : 0, el.field ?? 0, el.tesla ?? 0, el.air ?? 0, el.flat ? 0 : 1];
  let on = !el.off;
  let [time, reach] = [0, on ? 1 : 0];
  const wheel = { x: WHEEL.from as number, angle: 0, speed: 0 };
  let [metal, gas] = [el.metal, el.gas];
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      if (ph.on !== undefined && ph.on !== on) {
        on = ph.on;
        reach = 0;
      }
      if (ph.metal !== undefined) metal = ph.metal;
      if (ph.gas !== undefined) gas = ph.gas;
      const from = { speed, volts, field, tesla, air, stand };
      const k = ease(run / ph.dur);
      if (el.picture === 'wheel' || !on || reach < 1)
        for (let t0 = 0; t0 < run - 1e-9; t0 += STEP) {
          const dt = Math.min(STEP, run - t0);
          if (on) reach += FRONT * dt;
          // The rays push the wheel once they reach it; with the voltage off it rolls to a stop.
          const pushed = on && reach >= wheel.x - WHEEL.radius && wheel.x < WHEEL.to;
          wheel.speed = pushed ? Math.min(ROLL, wheel.speed + PICK_UP * dt) : Math.max(0, wheel.speed - 2 * PICK_UP * dt);
          const step = Math.min(wheel.speed * dt, WHEEL.to - wheel.x);
          if (step <= 0) wheel.speed = 0;
          wheel.x += Math.max(0, step);
          wheel.angle += Math.max(0, step) / WHEEL.radius;
        }
      volts = mix(from.volts, ph.volts ?? from.volts, k);
      speed = byVolts ? speedFromVolts(volts) : mix(from.speed, ph.speed ?? from.speed, k);
      field = mix(from.field, ph.field ?? from.field, k);
      tesla = mix(from.tesla, ph.tesla ?? from.tesla, k);
      air = mix(from.air, ph.air ?? from.air, k);
      stand = mix(from.stand, ph.stand === undefined ? from.stand : ph.stand ? 1 : 0, k);
      time += run;
      left -= ph.dur;
    }
  }
  return { time, on, reach, speed, volts, field, tesla, air, stand, wheel, metal, gas };
}
