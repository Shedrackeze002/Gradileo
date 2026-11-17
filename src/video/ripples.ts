/**
 * The waves of a `ripples` element (see RipplesEl in script.ts): waves seen from above, spreading
 * in circles from their sources. Each crest is a circle that grows at the speed of the waves, and
 * its centre is where the source was when it sent that crest out. That one rule gives everything
 * drawn: two sources whose crests cross (interference), and a source that moves, whose crests are
 * crowded together ahead of it and spread out behind it (the Doppler effect).
 *
 * What reaches a place now left its source a little earlier: at the time the wave needed to cover
 * the distance between them. For a source that moves, that distance is measured from where the
 * source was then, not from where it is now.
 */
import type { RippleSource, RipplesEl } from './script.ts';

const TAU = 2 * Math.PI;
export type Point = [number, number];

/** What reaches a place from one source at a time. */
export interface Arrival {
  /** Where the source was when it sent what is arriving now. */
  from: Point;
  /** How far that has travelled, in metres. */
  path: number;
  /** When it was sent, in seconds of the waves' own time. */
  sent: number;
  /** Whether anything from the source has got here yet. */
  arrived: boolean;
  /** The frequency received here: the source's own, unless the source is moving towards or away from the place. */
  frequency: number;
  /** The displacement the source gives here, from −1 to 1 (0 until its waves arrive). */
  signal: number;
}

/** Where a source is at a time: it keeps a steady velocity. */
export function sourceAt(s: RippleSource, time: number): Point {
  const [vx, vy] = s.velocity ?? [0, 0];
  return [s.at[0] + vx * time, s.at[1] + vy * time];
}

/** What reaches the place `p` from the source `s` at a time. */
export function arrival(el: RipplesEl, s: RippleSource, p: Point, time: number): Arrival {
  const [vx, vy] = s.velocity ?? [0, 0];
  const c = el.speed;
  // From where the source is now to the place. The wave left a time u ago, from a source that was
  // then u × its velocity farther back, and has covered c × u since: |d + v u| = c u.
  const now = sourceAt(s, time);
  const [dx, dy] = [p[0] - now[0], p[1] - now[1]];
  const dv = dx * vx + dy * vy;
  const k = c * c - vx * vx - vy * vy;
  const u = (dv + Math.sqrt(dv * dv + k * (dx * dx + dy * dy))) / k;
  const sent = time - u;
  const from = sourceAt(s, sent);
  const path = c * u;
  const arrived = el.full === true || sent >= 0;
  // The part of the source's velocity that was towards the place squeezes the waves sent that way.
  const towards = path > 1e-12 ? ((p[0] - from[0]) * vx + (p[1] - from[1]) * vy) / path : 0;
  return { from, path, sent, arrived, frequency: s.frequency / (1 - towards / c), signal: arrived ? Math.sin(TAU * s.frequency * sent) : 0 };
}

/** The number of the newest crest a source had sent by a time: crest n leaves a quarter of a period after n whole periods. */
const newest = (s: RippleSource, time: number) => Math.floor(s.frequency * time - 0.25 + 1e-9);

/**
 * The crests of a source that are in the picture, newest first: each with its centre (where the
 * source was when it left) and its radius now. With `every`, only one crest in so many is given.
 */
export function crestsOf(el: RipplesEl, s: RippleSource, time: number): Array<{ centre: Point; radius: number }> {
  const out: Array<{ centre: Point; radius: number }> = [];
  if (!(s.frequency > 0)) return out;
  const [x0, y0, x1, y1] = el.view;
  const every = Math.max(1, Math.round(el.every ?? 1));
  for (let n = newest(s, time), tries = 0; tries < 4000; n--, tries++) {
    // A source that starts at time 0 has sent nothing before it.
    if (!el.full && n < 0) break;
    const t = (n + 0.25) / s.frequency;
    const centre = sourceAt(s, t);
    const radius = el.speed * (time - t);
    // Older crests lie outside newer ones, so once a crest is past every corner the rest are too.
    const far = Math.max(...[x0, x1].flatMap((x) => [y0, y1].map((y) => Math.hypot(x - centre[0], y - centre[1]))));
    if (radius > far) break;
    if (((n % every) + every) % every === 0) out.push({ centre, radius });
  }
  return out;
}

/** The crests of a source that have reached a place since time 0. */
export function received(el: RipplesEl, s: RippleSource, p: Point, time: number): number {
  // Waves that have been spreading for ever were already passing at time 0; otherwise the first to arrive is crest 0.
  const before = el.full ? newest(s, arrival(el, s, p, 0).sent) : -1;
  return Math.max(0, newest(s, arrival(el, s, p, time).sent) - before);
}

/**
 * How large the waves are at a place when those from every source are added, from 0 (they cancel)
 * to 1 (they all arrive in step): the size of the sum of the waves, against the most it could be.
 */
export function loudness(el: RipplesEl, p: Point, time: number): number {
  let [re, im] = [0, 0];
  for (const s of el.sources) {
    const a = arrival(el, s, p, time);
    if (!a.arrived) continue;
    re += Math.cos(TAU * s.frequency * a.sent);
    im += Math.sin(TAU * s.frequency * a.sent);
  }
  return el.sources.length ? Math.hypot(re, im) / el.sources.length : 0;
}

export interface RipplesState {
  /** Seconds of the waves' own time played so far. */
  time: number;
  note?: string;
  /** Where each listener is now. */
  listeners: Record<string, Point>;
}

/**
 * The state of a ripples element after its clips: `plays` lists each clip played so far, in order,
 * with the seconds of video it has run for (a clip not yet finished is the last one).
 */
export function ripplesAt(el: RipplesEl, plays: Array<[clip: string, seconds: number]> = []): RipplesState {
  const start = (): Record<string, Point> => Object.fromEntries((el.listeners ?? []).map((l) => [l.id, [l.at[0], l.at[1]] as Point]));
  let listeners = start();
  let time = 0;
  let note: string | undefined;
  for (const [name, seconds] of plays) {
    const clip = el.clips[name];
    if (!clip) continue;
    if (clip.reset) {
      listeners = start();
      time = 0;
    }
    let left = seconds;
    note = undefined;
    for (const ph of clip.phases) {
      if (left < 0) break;
      const slow = ph.slow ?? 1;
      const video = ph.dur * slow;
      const run = Math.min(left, video);
      time += run / slow;
      // A listener who walks sets off gently and stops gently.
      const done = video > 0 ? run / video : 1;
      const eased = done * done * (3 - 2 * done);
      for (const [id, to] of Object.entries(ph.move ?? {})) {
        const from = listeners[id];
        if (from) listeners[id] = [from[0] + (to[0] - from[0]) * eased, from[1] + (to[1] - from[1]) * eased];
      }
      // The note of the phase that is playing; it goes when the clip has finished (to within the
      // thousandth of a second that the times of a video are kept to).
      note = left < video - 0.002 ? ph.note : undefined;
      left -= video;
    }
  }
  return { time, note, listeners };
}
