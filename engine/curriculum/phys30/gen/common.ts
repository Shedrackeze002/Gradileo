/**
 * Helpers shared by the Grade 12 Physics generators. The rounded answers and the constants are the
 * ones Grade 11 Physics uses, so an answer is marked the same way in both courses.
 */
import { fixedChoice, part } from '../../helpers.ts';
import type { Part } from '../../../types.ts';

export { An, G, RAD, an, br, clean, direction, dpWords, round, rounded, sciPart, sciTex, SCI_TIP } from '../../phys20/gen/common.ts';
import { SCI_TIP } from '../../phys20/gen/common.ts';

/** A line that motion happens along: its positive direction and its negative one, as a sentence says them. */
export interface Axis {
  pos: string;
  neg: string;
}
export const AXES: Axis[] = [
  { pos: 'east', neg: 'west' },
  { pos: 'north', neg: 'south' },
  { pos: 'to the right', neg: 'to the left' },
];
export const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** The direction of a signed quantity along an axis. */
export const way = (ax: Axis, v: number) => (v >= 0 ? ax.pos : ax.neg);
/** "Take east as the positive direction." */
export const positive = (ax: Axis) => `Take ${ax.pos} as the positive direction.`;
/** "Include a minus sign if it is west." */
export const minusIf = (ax: Axis, what = 'it is') => `Include a minus sign if ${what} ${ax.neg}.`;
/** A choice between the two directions of an axis. */
export const whichWay = (ax: Axis, v: number, label = 'Direction'): Part => part(fixedChoice([cap(ax.pos), cap(ax.neg)], v >= 0 ? 0 : 1), { label });
/** A signed number as a line of working writes it: +4, −2.5. */
export const signed = (x: number, dp = 2) => {
  const r = Math.round(x * 10 ** dp) / 10 ** dp;
  return r < 0 ? `-${String(-r)}` : `+${String(r)}`;
};

// ---------------------------------------------------------------------------- charges and fields (Unit 2)

/** Coulomb's constant, in N·m²/C². */
export const K = 8.99e9;
export const K_NOTE = 'Use $k = 8.99 \\times 10^{9}\\ \\text{N·m}^2/\\text{C}^2$.';
/** The elementary charge, in coulombs. */
export const E_CHARGE = 1.6e-19;
export const E_NOTE = 'The elementary charge is $1.60 \\times 10^{-19}\\ \\text{C}$.';
export const SCI_ASK = `Give your answer in scientific notation to 3 significant digits. ${SCI_TIP}`;
export const SCI_BOTH = `Give both answers in scientific notation to 3 significant digits. ${SCI_TIP}`;
/** Asks for one part of an answer in scientific notation: sciAsk('the number of electrons'). */
export const sciAsk = (what: string) => `Give ${what} in scientific notation to 3 significant digits. ${SCI_TIP}`;
/** A charge in microcoulombs, as maths: micro(3) is 3 μC. */
export const micro = (v: number | string) => `$${v}\\ \\mu\\text{C}$`;
/** A resistance as maths: ohm(6) is 6 Ω. */
export const ohm = (v: number | string) => `$${v}\\ \\Omega$`;

/** A value m × 10^e and how a question writes it. */
export interface Sci {
  v: number;
  tex: string;
}
export const sci = (m: number, e: number, dp = 1): Sci => ({ v: Number(`${m}e${e}`), tex: `${m.toFixed(dp)} \\times 10^{${e}}` });

/** The particles that questions send through fields, with the charge and the mass a question states. */
export interface Particle {
  name: string;
  /** The size of its charge, in coulombs. */
  q: number;
  qTex: string;
  /** Its mass, in kilograms. */
  m: number;
  mTex: string;
  sign: 1 | -1;
}
export const ELECTRON: Particle = { name: 'electron', q: 1.6e-19, qTex: '1.60 \\times 10^{-19}', m: 9.11e-31, mTex: '9.11 \\times 10^{-31}', sign: -1 };
export const PROTON: Particle = { name: 'proton', q: 1.6e-19, qTex: '1.60 \\times 10^{-19}', m: 1.67e-27, mTex: '1.67 \\times 10^{-27}', sign: 1 };
export const ALPHA: Particle = { name: 'alpha particle', q: 3.2e-19, qTex: '3.20 \\times 10^{-19}', m: 6.64e-27, mTex: '6.64 \\times 10^{-27}', sign: 1 };
export const PARTICLES: Particle[] = [ELECTRON, PROTON, ALPHA];
/** "An electron has a charge of −1.60 × 10⁻¹⁹ C and a mass of 9.11 × 10⁻³¹ kg." */
export const facts = (p: Particle, mass = true) =>
  `${p.name === 'proton' ? 'A' : 'An'} ${p.name} has a charge of $${p.sign < 0 ? '-' : '+'}${p.qTex}\\ \\text{C}$${mass ? ` and a mass of $${p.mTex}\\ \\text{kg}$` : ''}.`;
