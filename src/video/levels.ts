/**
 * The energy levels of an atom (the `levels` element; src/video/stage/Levels.tsx draws it).
 *
 * In Bohr's model the electron of an atom can have only certain energies. For hydrogen the
 * levels are Eₙ = −13.6 ÷ n² eV, and an atom gives out or takes in one photon when its electron
 * jumps between two of them: E = E(higher) − E(lower) = hf = hc ÷ λ. The lessons' constants are
 * used: h = 6.63 × 10⁻³⁴ J·s, c = 3.00 × 10⁸ m/s and 1 eV = 1.60 × 10⁻¹⁹ J, and the levels of
 * hydrogen are rounded to three figures as the lessons write them (−13.6, −3.40, −1.51, −0.850,
 * −0.544 …), so a photon's energy here is the one a student works out.
 *
 * The element has three pictures:
 *
 * - `atom`: the atom with its allowed orbits, beside a ladder of its energy levels. The electron
 *   drops and a photon leaves, or a photon arrives and the electron rises (or a collision lifts
 *   it); a photon that matches no jump passes straight through, and one with enough energy
 *   frees the electron.
 * - `spectrum`: light from a hot solid, a glowing gas, or a hot solid seen through a cool gas,
 *   spread out by a prism: every colour, bright lines, or dark lines at the same wavelengths.
 * - `wave`: the electron as a wave bent round its orbit, which joins up with itself only when a
 *   whole number of wavelengths fits.
 */
import type { LevelsEl } from './script.ts';
import { C, EV, PLANCK } from './photons.ts';

/** How long each clip of an element has played, in order. */
export type Plays = Array<[clip: string, seconds: number]>;

/** The energy of level n of hydrogen, in electronvolts, to three figures. */
export const hydrogen = (n: number) => Number((-13.6 / (n * n)).toPrecision(3));
/** The radius of the smallest orbit of hydrogen, in metres, and of orbit n: n² times as large. */
export const BOHR = 5.29e-11;
export const orbitRadius = (n: number) => n * n * BOHR;
/** The different photon energies that a gas can give out when its atoms are excited to level n. */
export const linesFrom = (n: number) => (n * (n - 1)) / 2;

/** The energies of the levels of an element's atom, in electronvolts, lowest first. */
export const levelsOf = (el: LevelsEl): number[] => el.levels ?? Array.from({ length: el.top ?? (el.picture === 'spectrum' ? 6 : 4) }, (_, i) => hydrogen(i + 1));
/** The energy of the photon of a jump between two levels (numbered from 1), in electronvolts. */
export const jumpVolts = (levels: number[], a: number, b: number) => Number(Math.abs(levels[a - 1] - levels[b - 1]).toPrecision(4));
/** The wavelength, in nanometres, and the frequency, in hertz, of a photon with an energy in electronvolts. */
export const nmOf = (volts: number) => ((PLANCK * C) / (volts * EV)) * 1e9;
export const hertzOf = (volts: number) => (volts * EV) / PLANCK;
/** The part of the spectrum that a wavelength in nanometres belongs to. */
export const bandOf = (nm: number): 'ultraviolet' | 'visible' | 'infrared' => (nm < 380 ? 'ultraviolet' : nm > 750 ? 'infrared' : 'visible');

/** Every jump down between the levels of an atom, with its photon. */
export interface Line {
  from: number;
  to: number;
  volts: number;
  nm: number;
}
export function linesOf(levels: number[]): Line[] {
  const lines: Line[] = [];
  for (let a = 2; a <= levels.length; a++)
    for (let b = 1; b < a; b++) {
      const volts = jumpVolts(levels, a, b);
      lines.push({ from: a, to: b, volts, nm: nmOf(volts) });
    }
  return lines;
}

/** What a photon of an energy does to an atom whose electron is in a level: lifts it to a level whose gap it matches (to within 0.5%), frees it, or passes. */
export function meets(levels: number[], level: number, volts: number): { kind: 'absorb'; to: number } | { kind: 'free' } | { kind: 'pass' } {
  for (let to = level + 1; to <= levels.length; to++) if (Math.abs(jumpVolts(levels, to, level) - volts) <= 0.005 * volts) return { kind: 'absorb', to };
  if (volts >= -levels[level - 1]) return { kind: 'free' };
  return { kind: 'pass' };
}

/** One photon and what happened: the electron dropped and gave it out, rose as it arrived, was freed by it, or let it pass. `at` is when the photon left the atom or reached it, in seconds of video. A `bump` is a rise with no photon: a collision lifted the electron. */
export interface Jump {
  at: number;
  kind: 'emit' | 'absorb' | 'free' | 'pass' | 'bump';
  /** The level before and after (0: the electron is free). */
  from: number;
  to: number;
  volts: number;
  nm: number;
}

/** The seconds a photon sent at the atom takes to reach it, and the seconds an electron takes to move from one orbit to another. */
export const ARRIVE = 1.6;
export const HOP = 0.4;
/** The seconds into its phase that a collision lifts the electron. */
export const BUMP = 0.3;
/** The radians that the electron of orbit 1 turns through each second; further out it turns more slowly. */
export const SPIN = 3.4;
export const spinOf = (n: number) => SPIN / Math.pow(Math.max(1, n), 1.5);

export interface LevelsState {
  /** Seconds of video that the clips have played. */
  time: number;
  /** The level the electron is in now (0: free). */
  level: number;
  /** The angle the electron has turned through round its orbit, in radians. */
  turn: number;
  jumps: Jump[];
  /** A `spectrum` picture: the source now, the one before it, and how far the change has gone, from 0 to 1. */
  source: 'solid' | 'gas' | 'through';
  before: 'solid' | 'gas' | 'through';
  mix: number;
  /** A `wave` picture: the wavelengths round the orbit. */
  waves: number;
}

/** The angle, in radians, that an electron which began in a level has turned through after t seconds: it turns at the rate of each orbit it has been in. */
export function turnAt(start: number, jumps: Jump[], t: number): number {
  let [level, turn, since] = [start, 0, 0];
  for (const jump of [...jumps].sort((a, b) => a.at - b.at)) {
    if (jump.at > t) break;
    turn += spinOf(level) * (jump.at - since);
    [level, since] = [jump.to, jump.at];
  }
  return turn + spinOf(level) * (t - since);
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
/** The seconds a spectrum takes to change when its source does. */
export const CHANGE = 1.4;

/** The state of a levels element after its clips. */
export function levelsAt(el: LevelsEl, plays: Plays = []): LevelsState {
  const levels = levelsOf(el);
  // The level the electron will be in once every photon on its way has arrived.
  let planned = el.start ?? 1;
  let time = 0;
  const jumps: Jump[] = [];
  let [source, before, changed] = [el.source ?? 'solid', el.source ?? 'solid', -Infinity];
  let waves = el.waves ?? 3;
  for (const [clipName, seconds] of plays) {
    const clip = el.clips[clipName];
    if (!clip) continue;
    let left = seconds;
    for (const ph of clip.phases) {
      if (left <= 0) break;
      const run = Math.min(left, ph.dur);
      if (ph.to !== undefined && ph.to !== planned && planned > 0) {
        const volts = jumpVolts(levels, ph.to, planned);
        // A drop gives out its photon at once; a rise waits for its photon to arrive, unless a collision does the lifting.
        const drop = ph.to < planned;
        jumps.push({ at: drop ? time : ph.bump ? time + BUMP : time + ARRIVE, kind: drop ? 'emit' : ph.bump ? 'bump' : 'absorb', from: planned, to: ph.to, volts, nm: nmOf(volts) });
        planned = ph.to;
      }
      if (ph.photon !== undefined && planned > 0) {
        const met = meets(levels, planned, ph.photon);
        const to = met.kind === 'absorb' ? met.to : met.kind === 'free' ? 0 : planned;
        jumps.push({ at: time + ARRIVE, kind: met.kind, from: planned, to, volts: ph.photon, nm: nmOf(ph.photon) });
        planned = to;
      }
      if (ph.source !== undefined && ph.source !== source) [before, source, changed] = [source, ph.source, time];
      if (ph.waves !== undefined) waves = waves + (ph.waves - waves) * ease(run / ph.dur);
      time += run;
      left -= ph.dur;
    }
  }
  // Where the electron is now: in the level that the last photon to have left or arrived put it in.
  let level = el.start ?? 1;
  for (const jump of [...jumps].sort((a, b) => a.at - b.at)) if (jump.at <= time) level = jump.to;
  return { time, level, turn: turnAt(el.start ?? 1, jumps, time), jumps, source, before, mix: ease((time - changed) / CHANGE), waves };
}
