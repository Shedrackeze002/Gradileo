/**
 * The three radiations (the `radiation` element; src/video/stage/Radiation.tsx draws it).
 *
 * A source gives out alpha particles, beta particles and gamma rays. The element has two pictures:
 *
 * - `through`: each radiation in a lane of its own, with a sheet of paper, a plate of aluminium
 *   and a block of lead that slide into the way. An alpha particle is stopped by the paper (or by
 *   a few centimetres of air), a beta particle by the aluminium, and most of the gamma rays by
 *   the lead. Each leaves ions behind it: an alpha particle a dense trail, a beta particle a thin
 *   one and a gamma ray hardly any. A counter at the end clicks for every particle that reaches
 *   it, and now and then for the background.
 * - `fields`: the three in one beam, between two charged plates or through a magnetic field.
 *   Alpha and beta particles bend opposite ways, the beta particles far more, and the gamma rays
 *   go straight on.
 *
 * The pictures are sketches of what each radiation does, not measurements: the speeds, the
 * distances and the sizes of the bends are chosen to be seen.
 */
import type { RadiationEl } from './script.ts';
import { chance } from './matter.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

export type Ray = 'alpha' | 'beta' | 'gamma';
export type Shield = 'paper' | 'aluminium' | 'lead';
export type Field = 'off' | 'electric' | 'magnetic';

/** Each radiation: what it is, its charge in units of e, how fast it is drawn (pixels a second), the seconds between one particle and the next, and the pixels between the ions it leaves. */
export const RAYS: Record<Ray, { name: string; what: string; charge: number; speed: number; every: number; ions: number }> = {
  alpha: { name: 'Alpha', what: 'A helium nucleus', charge: 2, speed: 150, every: 0.9, ions: 10 },
  beta: { name: 'Beta', what: 'A fast electron', charge: -1, speed: 330, every: 0.75, ions: 46 },
  gamma: { name: 'Gamma', what: 'A photon of very high energy', charge: 0, speed: 430, every: 0.6, ions: 210 },
};
export const ALL: Ray[] = ['alpha', 'beta', 'gamma'];

/** The picture, 1136 wide: where the particles leave the source, the three shields (the left face and the thickness of each), how far an alpha particle gets in air, and the counter. */
export const SOURCE = 150;
export const SHIELDS: Record<Shield, { x: number; w: number; name: string }> = {
  paper: { x: 400, w: 8, name: 'Paper' },
  aluminium: { x: 590, w: 34, name: 'Aluminium' },
  lead: { x: 790, w: 100, name: 'Lead' },
};
export const AIR = 540;
export const COUNTER = 990;
/** The share of the gamma rays that a block of lead stops. */
export const LEAD_STOPS = 2 / 3;
/** The seconds a shield takes to slide in or out, and a field to come on or go off. */
export const SLIDE = 0.8;
export const TURN = 1.2;

/** What is in the picture from a moment on: which shields are in the way, whether the source is open, and the field. */
export interface Step {
  at: number;
  paper: boolean;
  aluminium: boolean;
  lead: boolean;
  open: boolean;
  field: Field;
}

export interface RadiationState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** Every change so far, in order; the first is the start. */
  steps: Step[];
  now: Step;
  /** How far each shield is in the way, from 0 (out) to 1 (in). */
  slide: Record<Shield, number>;
  /** The field that is drawn (the one going off, while it goes), and how strong it is, from 0 to 1. */
  field: Field;
  strength: number;
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/** The state of a radiation element after its clips. */
export function radiationAt(el: RadiationEl, plays: Plays = []): RadiationState {
  let now: Step = { at: 0, paper: el.paper ?? false, aluminium: el.aluminium ?? false, lead: el.lead ?? false, open: el.open ?? true, field: el.field ?? 'off' };
  const steps: Step[] = [now];
  let time = 0;
  for (const [clipName, seconds] of plays) {
    const clip = el.clips[clipName];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const next: Step = { at: time, paper: ph.paper ?? now.paper, aluminium: ph.aluminium ?? now.aluminium, lead: ph.lead ?? now.lead, open: ph.open ?? now.open, field: ph.field ?? now.field };
      if (next.paper !== now.paper || next.aluminium !== now.aluminium || next.lead !== now.lead || next.open !== now.open || next.field !== now.field) {
        steps.push(next);
        now = next;
      }
      time += Math.min(left, ph.dur);
      left -= ph.dur;
    }
  }
  // How long ago each shield last moved, and the field last changed.
  const since = (same: (a: Step, b: Step) => boolean) => {
    for (let i = steps.length - 1; i > 0; i--) if (!same(steps[i], steps[i - 1])) return { at: steps[i].at, before: steps[i - 1] };
    return undefined;
  };
  const slide = {} as Record<Shield, number>;
  for (const shield of ['paper', 'aluminium', 'lead'] as const) {
    const moved = since((a, b) => a[shield] === b[shield]);
    const gone = moved ? ease((time - moved.at) / SLIDE) : 1;
    slide[shield] = now[shield] ? gone : 1 - gone;
  }
  const turned = since((a, b) => a.field === b.field);
  const gone = turned ? ease((time - turned.at) / TURN) : 1;
  const off = now.field === 'off';
  return { time, steps, now, slide, field: off ? (turned && gone < 1 ? turned.before.field : 'off') : now.field, strength: off ? (turned ? 1 - gone : 0) : gone };
}

/** What was in the picture at a moment. */
export function stepAt(steps: Step[], t: number): Step {
  let found = steps[0];
  for (const step of steps) if (step.at <= t) found = step;
  return found;
}

/** The flight of one particle: when it left the source, where it ends, and what stops it (nothing, if it reaches the counter). */
export interface Flight {
  ray: Ray;
  n: number;
  born: number;
  end: number;
  stops?: Shield | 'air';
}

/** When the nth particle of a radiation leaves the source. */
export const bornAt = (ray: Ray, n: number) => 0.25 + ALL.indexOf(ray) * 0.17 + n * RAYS[ray].every;

/** The flight of the nth particle of a radiation, or nothing if the source was closed when it would have left. */
export function flightOf(ray: Ray, n: number, steps: Step[]): Flight | undefined {
  const born = bornAt(ray, n);
  if (!stepAt(steps, born).open) return undefined;
  const { speed } = RAYS[ray];
  // Whether a shield is in the way when the particle gets to it.
  const meets = (shield: Shield) => stepAt(steps, born + (SHIELDS[shield].x - SOURCE) / speed)[shield];
  const inside = (shield: Shield, salt: number) => SHIELDS[shield].x + 4 + chance(n + 1, salt) * (SHIELDS[shield].w - 8);
  if (ray === 'alpha') {
    // Paper stops an alpha particle at its surface, and so does anything thicker. With nothing in the way, a few centimetres of air does.
    if (meets('paper')) return { ray, n, born, end: SHIELDS.paper.x, stops: 'paper' };
    return { ray, n, born, end: AIR - 30 * chance(n + 1, 71), stops: 'air' };
  }
  if (ray === 'beta') {
    if (meets('aluminium')) return { ray, n, born, end: inside('aluminium', 72), stops: 'aluminium' };
    if (meets('lead')) return { ray, n, born, end: SHIELDS.lead.x + 4 + chance(n + 1, 73) * 16, stops: 'lead' };
    return { ray, n, born, end: COUNTER };
  }
  if (meets('lead') && chance(n + 1, 74) < LEAD_STOPS) return { ray, n, born, end: inside('lead', 75), stops: 'lead' };
  return { ray, n, born, end: COUNTER };
}

/** The particles that have left the source so far, with where each is now and the seconds since it ended (below zero while it is still on its way). */
export function flights(el: RadiationEl, st: RadiationState): Array<Flight & { x: number; ended: number }> {
  const out: Array<Flight & { x: number; ended: number }> = [];
  for (const ray of el.rays ?? ALL) {
    for (let n = 0; bornAt(ray, n) <= st.time; n++) {
      const flight = flightOf(ray, n, st.steps);
      if (!flight) continue;
      const x = SOURCE + RAYS[ray].speed * (st.time - flight.born);
      out.push({ ...flight, x: Math.min(x, flight.end), ended: (x - flight.end) / RAYS[ray].speed });
    }
  }
  return out;
}

/** When the counter has clicked so far: once for each particle that reached it, and now and then for the background (every `background` seconds or so; never, if it is 0). */
export function clicks(el: RadiationEl, st: RadiationState): number[] {
  const times: number[] = [];
  for (const flight of flights(el, st)) if (flight.stops === undefined && flight.ended >= 0) times.push(st.time - flight.ended);
  const every = el.background ?? 2.4;
  if (every > 0) for (let n = 0; ; n++) {
    const at = (n + 0.2 + 0.8 * chance(n + 1, 76)) * every;
    if (at > st.time) break;
    times.push(at);
  }
  return times.sort((a, b) => a - b);
}

/**
 * How far a radiation has been bent, in pixels down the picture, by the time it has gone a share
 * `u` (0 to 1) of the way through a field of a strength from 0 to 1. Between the plates (the
 * positive one above), alpha particles bend down towards the negative plate and beta particles up.
 * In a magnetic field into the page they bend the other way round. Beta particles bend far more.
 */
export const BENDS: Record<Exclude<Field, 'off'>, Record<Ray, number>> = {
  electric: { alpha: 22, beta: -84, gamma: 0 },
  magnetic: { alpha: -16, beta: 92, gamma: 0 },
};
export const bendOf = (ray: Ray, field: Field, strength: number, u: number) => (field === 'off' ? 0 : BENDS[field][ray] * strength * u * u);
/** The slope of the path as it leaves the field, in pixels down for each share of the field's length. */
export const slopeOf = (ray: Ray, field: Field, strength: number) => (field === 'off' ? 0 : 2 * BENDS[field][ray] * strength);
