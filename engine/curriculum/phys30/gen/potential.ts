/**
 * Grade 12 Physics, Unit 2, lessons 2.4 to 2.6: electric potential difference, charges between
 * parallel plates, and circuits (30-B2). Energy for each coulomb, the uniform field between
 * plates, particles sped up and turned by a field, Millikan's oil drops, and circuits with
 * resistors in series and parallel and a battery that has internal resistance. Every constant a
 * question needs is in the question.
 */
import { mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { ALPHA, An, ELECTRON, E_CHARGE, E_NOTE, G, PARTICLES, PROTON, SCI_ASK, SCI_BOTH, an, clean, facts, micro, ohm, rounded, sci, sciPart, sciTex, type Particle } from './common.ts';

const L = (n: number) => `p30-2-${n}`;
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$.';
const ET = '1.60 \\times 10^{-19}';
/** A signed number as a charge is written: +3, −4.5. */
const sgn = (v: number) => (v < 0 ? `-${num(-v, 2)}` : `+${num(v, 2)}`);
/** How many elementary charges a particle carries. */
const count = (p: Particle) => Math.round(p.q / E_CHARGE);

// ---------------------------------------------------------------------------- 2.4 potential difference

const POTENTIAL_IDEAS: Q[] = [
  { q: 'What does a potential difference of 1 volt between two points mean?', a: 'Each coulomb of charge that moves between the points gains or loses 1 joule of energy', w: ['One coulomb of charge passes each second', 'Each coulomb of charge feels a force of 1 newton', 'Each electron gains 1 joule of energy'], why: 'Potential difference is the change in electric potential energy for each coulomb: one volt is one joule per coulomb.' },
  { q: 'A positive charge is released from rest between two plates with opposite charges. What happens to it?', a: 'It moves towards the negative plate, losing electric potential energy and gaining kinetic energy', w: ['It moves towards the positive plate, gaining electric potential energy', 'It stays at rest, because the field is uniform', 'It moves towards the negative plate, gaining electric potential energy'], why: 'The field pushes a positive charge towards the negative plate. The electric potential energy it loses becomes kinetic energy.' },
  { q: 'A positive charge is pushed closer to another positive charge. What happens to the electric potential energy of the pair?', a: 'It increases, because work is done against the repulsion', w: ['It decreases, because the charges are closer', 'It stays the same', 'It becomes zero'], why: 'Work done against an electric force is stored as electric potential energy, as lifting a mass stores gravitational potential energy.' },
  { q: 'What is the electronvolt a unit of?', a: 'Energy', w: ['Potential difference', 'Charge', 'Electric field strength'], why: 'One electronvolt is the energy that one elementary charge gains when it moves through a potential difference of 1 volt.' },
  { q: 'An electron moves from the negative plate to the positive plate of a pair of charged plates. What happens to its electric potential energy?', a: 'It decreases, and the electron speeds up', w: ['It increases, and the electron slows down', 'It stays the same', 'It increases, and the electron speeds up'], why: 'The field pushes the electron towards the positive plate, so the field does work on it: potential energy becomes kinetic energy.' },
  { q: 'How is the potential difference between two points defined?', a: 'The change in electric potential energy for each coulomb of charge moved between them', w: ['The force on each coulomb of charge at the first point', 'The charge that passes between them each second', 'The total energy of all the charge between them'], why: '$\\Delta V = \\dfrac{\\Delta E}{q}$: energy for each unit of charge.' },
];

const BATTERY_V = [1.5, 6, 9, 12, 24, 120];

function voltageFromEnergy(rng: Rng): GenOutput {
  const V = rng.pick(BATTERY_V);
  const c = rng.pick([2, 3, 5, 20, 40, 50]);
  const W = clean(V * c);
  return {
    prompt: `A power supply does ${q(W, 'J')} of work on ${q(c, 'C')} of charge that passes through it. What is the potential difference across the supply?`,
    parts: [numPart(V, { suffix: 'V' })],
    hints: ['Potential difference is the energy for each coulomb: $\\Delta V = \\dfrac{\\Delta E}{q}$'],
    solution: [`$\\Delta V = \\dfrac{\\Delta E}{q} = \\dfrac{${W}}{${c}} = ${V}$ V`],
  };
}

function workFromVoltage(rng: Rng): GenOutput {
  const V = rng.pick(BATTERY_V);
  const c = rng.pick([2, 3, 5, 20, 40, 50]);
  const W = clean(V * c);
  return {
    prompt: `How much energy does ${an(V)} ${q(V, 'V')} battery give to ${q(c, 'C')} of charge that passes through it?`,
    parts: [numPart(W, { suffix: 'J' })],
    hints: ['Rearrange $\\Delta V = \\dfrac{\\Delta E}{q}$: the energy is the charge × the potential difference.'],
    solution: [`$\\Delta E = q\\Delta V = ${c} \\times ${V} = ${W}$ J`],
  };
}

const EV_PREFIX = [
  { unit: 'eV', e: 0 },
  { unit: 'keV', e: 3 },
  { unit: 'MeV', e: 6 },
];

function electronVolts(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const k = rng.pick(EV_PREFIX);
    const n = rng.float(1.5, 9.5, 1);
    const J = n * 10 ** k.e * E_CHARGE;
    return {
      prompt: `One electronvolt is $${ET}\\ \\text{J}$. A particle has a kinetic energy of ${q(n.toFixed(1), k.unit)}. What is this energy in joules? ${SCI_ASK}`,
      parts: [sciPart(J, 3, 'J')],
      hints: [k.e === 0 ? 'Multiply the number of electronvolts by the joules in one electronvolt.' : `Change the ${k.unit} to eV first: $1\\ \\text{${k.unit}} = 10^{${k.e}}$ eV.`, 'Multiply the number of electronvolts by the joules in one electronvolt.'],
      solution: [`$${n.toFixed(1)}${k.e === 0 ? '' : ` \\times 10^{${k.e}}`} \\times ${ET} = ${sciTex(J)}$ J`],
    };
  }
  const J = sci(rng.float(1.2, 9.6, 1), rng.int(-19, -14));
  const eV = J.v / E_CHARGE;
  return {
    prompt: `One electronvolt is $${ET}\\ \\text{J}$. A particle has a kinetic energy of $${J.tex}\\ \\text{J}$. What is this energy in electronvolts? ${SCI_ASK}`,
    parts: [sciPart(eV, 3, 'eV')],
    hints: ['Divide the energy in joules by the joules in one electronvolt.'],
    solution: [`$\\dfrac{${J.tex}}{${ET}} = ${sciTex(eV)}$ eV`],
  };
}

function energyGained(rng: Rng): GenOutput {
  const p = rng.pick(PARTICLES);
  const V = rng.pick([50, 120, 250, 400, 750, 1500, 2500, 5000]);
  const J = p.q * V;
  const eV = count(p) * V;
  return {
    prompt: `${facts(p, false)} The ${p.name} is accelerated from rest through a potential difference of ${q(V, 'V')}. Find the kinetic energy it gains, in joules, in scientific notation to 3 significant digits, and in electronvolts.`,
    parts: [sciPart(J, 3, 'J', 'In joules'), numPart(eV, { suffix: 'eV', label: 'In electronvolts' })],
    hints: ['The energy gained is the size of the charge × the potential difference: $\\Delta E = q\\Delta V$.', `One elementary charge moved through 1 V gains 1 eV. ${p.name === 'alpha particle' ? 'An alpha particle carries two elementary charges.' : `The ${p.name} carries one elementary charge.`}`],
    solution: [`$\\Delta E = q\\Delta V = ${p.qTex} \\times ${V} = ${sciTex(J)}$ J`, `In electronvolts: ${count(p)} elementary ${count(p) === 1 ? 'charge' : 'charges'} $\\times\\ ${V}$ V $= ${eV}$ eV`],
  };
}

function energyChange(rng: Rng): GenOutput {
  const c = retry(
    () => ({ VA: 50 * rng.int(0, 12), VB: 50 * rng.int(0, 12), qv: rng.sign() * rng.pick([0.5, 1.5, 2, 3, 4, 6]) }),
    (t) => t.VA !== t.VB,
  );
  const dE = clean(c.qv * (c.VB - c.VA));
  return {
    prompt: `Point A is at an electric potential of ${q(c.VA, 'V')}, and point B is at ${q(c.VB, 'V')}. A charge of ${micro(sgn(c.qv))} moves from A to B. Find the change in its electric potential energy, in microjoules. Include a minus sign if the energy decreases.`,
    parts: [numPart(dE, { suffix: 'μJ' })],
    hints: ['The potential difference is the potential at the end − the potential at the start.', '$\\Delta E = q\\Delta V$, with the sign of the charge. Microcoulombs × volts gives microjoules.'],
    solution: [`$\\Delta V = V_B - V_A = ${c.VB} - ${c.VA} = ${c.VB - c.VA}$ V`, `$\\Delta E = q\\Delta V = (${sgn(c.qv)}) \\times (${c.VB - c.VA}) = ${dE}\\ \\mu\\text{J}$, so the charge ${dE > 0 ? 'gains' : 'loses'} electric potential energy`],
  };
}

function chargeNumber(rng: Rng): GenOutput {
  const n = rng.int(1, 3);
  const V = rng.pick([250, 500, 750, 1200, 2000, 4500]);
  const J = n * E_CHARGE * V;
  return {
    prompt: `${E_NOTE} An ion gains $${sciTex(J)}\\ \\text{J}$ of kinetic energy when it is accelerated from rest through a potential difference of ${q(V, 'V')}. How many elementary charges does the ion carry?`,
    parts: [numPart(n)],
    hints: ['Find the charge of the ion: $q = \\dfrac{\\Delta E}{\\Delta V}$.', 'Divide the charge by the elementary charge.'],
    solution: [`$q = \\dfrac{\\Delta E}{\\Delta V} = \\dfrac{${sciTex(J)}}{${V}} = ${sciTex(n * E_CHARGE)}$ C`, `$\\dfrac{${sciTex(n * E_CHARGE)}}{${ET}} = ${n}$ elementary ${n === 1 ? 'charge' : 'charges'}`],
  };
}

// ---------------------------------------------------------------------------- 2.4 the field between parallel plates

const PLATE_V = [120, 240, 300, 450, 600, 900, 1200, 1500];
const PLATE_CM = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
/** The field between plates, in V/m, from the volts across them and the centimetres between them. */
const plateField = (V: number, cm: number) => clean((100 * V) / cm);

function platesField(rng: Rng): GenOutput {
  const V = rng.pick(PLATE_V);
  const d = rng.pick(PLATE_CM);
  const E = plateField(V, d);
  return {
    prompt: `Two parallel metal plates are ${q(d, 'cm')} apart, with a potential difference of ${q(V, 'V')} between them. What is the electric field strength between the plates, in volts per metre?`,
    parts: [numPart(E, { suffix: 'V/m' })],
    hints: ['Between parallel plates the field is uniform: $E = \\dfrac{\\Delta V}{d}$.', 'Change the centimetres to metres.'],
    solution: [`$d = ${d}\\ \\text{cm} = ${clean(d / 100)}$ m`, `$E = \\dfrac{\\Delta V}{d} = \\dfrac{${V}}{${clean(d / 100)}} = ${E}$ V/m`],
  };
}

function platesVoltage(rng: Rng): GenOutput {
  const V = rng.pick(PLATE_V);
  const d = rng.pick(PLATE_CM);
  const E = plateField(V, d);
  return {
    prompt: `The electric field between two parallel plates is ${q(E, 'V/m')}, and the plates are ${q(d, 'cm')} apart. What is the potential difference between the plates?`,
    parts: [numPart(V, { suffix: 'V' })],
    hints: ['Rearrange $E = \\dfrac{\\Delta V}{d}$: the potential difference is the field strength × the distance between the plates.', 'Change the centimetres to metres.'],
    solution: [`$\\Delta V = Ed = ${E} \\times ${clean(d / 100)} = ${V}$ V`],
  };
}

function platesSeparation(rng: Rng): GenOutput {
  const V = rng.pick(PLATE_V);
  const d = rng.pick(PLATE_CM);
  const E = plateField(V, d);
  return {
    prompt: `Two parallel plates have a potential difference of ${q(V, 'V')} between them. How far apart must they be for the electric field between them to be ${q(E, 'V/m')}? Give your answer in centimetres.`,
    parts: [numPart(d, { suffix: 'cm' })],
    hints: ['Rearrange $E = \\dfrac{\\Delta V}{d}$: the distance is the potential difference ÷ the field strength.', 'That gives the distance in metres. Multiply by 100 for centimetres.'],
    solution: [`$d = \\dfrac{\\Delta V}{E} = \\dfrac{${V}}{${E}} = ${clean(d / 100)}$ m $= ${d}$ cm`],
  };
}

function platesForce(rng: Rng): GenOutput {
  const p = rng.pick(PARTICLES);
  const V = rng.pick(PLATE_V);
  const d = rng.pick(PLATE_CM);
  const E = plateField(V, d);
  const F = p.q * E;
  return {
    prompt: `${facts(p, false)} The ${p.name} is between two parallel plates that are ${q(d, 'cm')} apart, with a potential difference of ${q(V, 'V')} between them. Find the size of the electric force on the ${p.name}. ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['Find the field between the plates first: $E = \\dfrac{\\Delta V}{d}$, with the distance in metres.', 'Then $F = qE$.'],
    solution: [`$E = \\dfrac{\\Delta V}{d} = \\dfrac{${V}}{${clean(d / 100)}} = ${E}$ V/m`, `$F = qE = ${p.qTex} \\times ${E} = ${sciTex(F)}$ N`],
  };
}

function platesPartWay(rng: Rng): GenOutput {
  const c = retry(
    () => {
      const d = rng.pick([2, 4, 5, 8, 10]);
      return { d, x: rng.pick([1, 2, 2.5, 4, 5, 6]), V: rng.pick([200, 400, 600, 800, 1000, 2000]) };
    },
    (t) => t.x < t.d && Number.isInteger((t.V * t.x) / t.d),
  );
  const p = rng.pick([PROTON, ALPHA]);
  const dV = (c.V * c.x) / c.d;
  const J = p.q * dV;
  return {
    prompt: `${facts(p, false)} Two parallel plates are ${q(c.d, 'cm')} apart, with a potential difference of ${q(c.V, 'V')} between them. The ${p.name} moves ${q(c.x, 'cm')} in the direction of the field. Find the potential difference it moves through, and the kinetic energy it gains, in joules, in scientific notation to 3 significant digits.`,
    parts: [numPart(dV, { suffix: 'V', label: 'Potential difference' }), sciPart(J, 3, 'J', 'Energy gained')],
    hints: ['The field is uniform, so the potential changes evenly from one plate to the other.', `Moving ${c.x} cm of the ${c.d} cm takes the particle through $\\dfrac{${c.x}}{${c.d}}$ of the potential difference.`, 'The energy gained is $q\\Delta V$.'],
    solution: [`$\\Delta V = \\dfrac{${c.x}}{${c.d}} \\times ${c.V} = ${dV}$ V`, `$\\Delta E = q\\Delta V = ${p.qTex} \\times ${dV} = ${sciTex(J)}$ J`],
  };
}

const PLATES_IDEAS: Q[] = [
  { q: 'A proton is between two parallel charged plates. How does the electric force on it change as it moves from near the positive plate to near the negative plate?', a: 'It does not change, because the field between the plates is uniform', w: ['It gets larger as the proton nears the negative plate', 'It gets smaller as the proton leaves the positive plate', 'It is zero halfway between the plates'], why: 'The field has the same strength everywhere between parallel plates, so the force $F = qE$ is the same everywhere.' },
  { q: 'Two parallel plates are connected to a battery. The plates are moved to twice the distance apart, still connected to the battery. What happens to the electric field between them?', a: 'It halves', w: ['It doubles', 'It stays the same', 'It becomes a quarter as large'], why: 'The battery keeps the potential difference the same, and $E = \\dfrac{\\Delta V}{d}$, so twice the distance gives half the field.' },
  { q: 'Electric field strength can be given in N/C or in V/m. How do the two units compare?', a: 'They are the same size: 1 N/C = 1 V/m', w: ['1 V/m = 100 N/C', '1 N/C = 100 V/m', 'They measure different quantities'], why: 'A volt is a joule per coulomb, and a joule is a newton metre, so a volt per metre is a newton per coulomb.' },
  { q: 'An electron and a proton are both between the same pair of charged plates. How do the electric forces on them compare?', a: 'They are equal in size and opposite in direction', w: ['They are equal in size and in the same direction', 'The force on the proton is much larger', 'The force on the electron is much larger'], why: 'The two have charges of the same size and opposite signs, so $F = qE$ has the same size and the opposite direction. The electron has far less mass, so its acceleration is far greater.' },
  { q: 'Which way does the electric field point between two parallel charged plates?', a: 'From the positive plate to the negative plate', w: ['From the negative plate to the positive plate', 'Parallel to the plates', 'Out from the middle towards both plates'], why: 'The field points the way a positive charge is pushed: away from the positive plate and towards the negative plate.' },
];

// ---------------------------------------------------------------------------- 2.5 charges moving between plates

function fieldAcceleration(rng: Rng): GenOutput {
  const p = rng.pick(PARTICLES);
  const E = 100 * rng.int(2, 120);
  const F = p.q * E;
  const a = F / p.m;
  return {
    prompt: `${facts(p)} The ${p.name} is in a uniform electric field of ${q(E, 'N/C')}. Find the size of the electric force on it, and the size of its acceleration. ${SCI_BOTH}`,
    parts: [sciPart(F, 3, 'N', 'Force'), sciPart(a, 3, 'm/s²', 'Acceleration')],
    hints: ['$F = qE$', 'Newton’s second law: $a = \\dfrac{F}{m}$'],
    solution: [`$F = qE = ${p.qTex} \\times ${E} = ${sciTex(F)}$ N`, `$a = \\dfrac{F}{m} = \\dfrac{${sciTex(F)}}{${p.mTex}} = ${sciTex(a)}$ m/s²`],
  };
}

function speedFromVoltage(rng: Rng): GenOutput {
  const p = rng.pick(PARTICLES);
  const V = p === ELECTRON ? rng.pick([50, 100, 200, 400, 750, 1200, 2000]) : rng.pick([500, 2000, 5000, 12000, 25000, 50000]);
  const v = Math.sqrt((2 * p.q * V) / p.m);
  return {
    prompt: `${facts(p)} The ${p.name} is accelerated from rest through a potential difference of ${q(V, 'V')}. How fast is it moving at the end? ${SCI_ASK}`,
    parts: [sciPart(v, 3, 'm/s')],
    hints: ['The electric potential energy it loses becomes kinetic energy: $q\\Delta V = \\dfrac{1}{2}mv^2$.', 'Rearrange: $v = \\sqrt{\\dfrac{2q\\Delta V}{m}}$'],
    solution: [`$q\\Delta V = \\dfrac{1}{2}mv^2$, so $v = \\sqrt{\\dfrac{2q\\Delta V}{m}} = \\sqrt{\\dfrac{2 \\times ${p.qTex} \\times ${V}}{${p.mTex}}} = ${sciTex(v)}$ m/s`],
  };
}

function voltageForSpeed(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const v = sci(rng.float(1.5, 9.5, 1), p === ELECTRON ? 6 : 5);
  const V = (p.m * v.v * v.v) / (2 * p.q);
  return {
    prompt: `${facts(p)} What potential difference accelerates the ${p.name} from rest to a speed of $${v.tex}\\ \\text{m/s}$? Give your answer to 1 decimal place.`,
    parts: [rounded(V, 1, 'V')],
    hints: ['The electric potential energy it loses becomes kinetic energy: $q\\Delta V = \\dfrac{1}{2}mv^2$.', 'Rearrange: $\\Delta V = \\dfrac{mv^2}{2q}$'],
    solution: [`$\\Delta V = \\dfrac{mv^2}{2q} = \\dfrac{${p.mTex} \\times (${v.tex})^2}{2 \\times ${p.qTex}} = ${num(V, 1)}$ V`],
  };
}

function crossPlates(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const V = rng.pick([100, 200, 300, 500, 800]);
  const d = rng.pick([1, 2, 2.5, 4, 5]);
  const a = (p.q * V) / (p.m * (d / 100));
  const t = Math.sqrt((2 * (d / 100)) / a);
  return {
    prompt: `${facts(p)} Two parallel plates are ${q(d, 'cm')} apart, with a potential difference of ${q(V, 'V')} between them. The ${p.name} starts from rest at the ${p.sign > 0 ? 'positive' : 'negative'} plate. Find its acceleration, and the time it takes to reach the other plate. ${SCI_BOTH}`,
    parts: [sciPart(a, 3, 'm/s²', 'Acceleration'), sciPart(t, 3, 's', 'Time')],
    hints: ['The field is $E = \\dfrac{\\Delta V}{d}$ and the force is $qE$, so $a = \\dfrac{q\\Delta V}{md}$.', 'The acceleration is constant, and the particle starts from rest: $d = \\dfrac{1}{2}at^2$.'],
    solution: [
      `$a = \\dfrac{q\\Delta V}{md} = \\dfrac{${p.qTex} \\times ${V}}{${p.mTex} \\times ${clean(d / 100)}} = ${sciTex(a)}$ m/s²`,
      `$d = \\dfrac{1}{2}at^2$, so $t = \\sqrt{\\dfrac{2d}{a}} = \\sqrt{\\dfrac{2 \\times ${clean(d / 100)}}{${sciTex(a)}}} = ${sciTex(t)}$ s`,
    ],
  };
}

function deflection(rng: Rng): GenOutput {
  const c = retry(
    () => ({ v: sci(rng.float(1, 3, 1), 7), len: rng.pick([4, 5, 6, 8, 10]), E: rng.pick([500, 800, 1200, 2000, 3000, 5000]) }),
    (t) => {
      const y = 0.5 * ((ELECTRON.q * t.E) / ELECTRON.m) * (t.len / 100 / t.v.v) ** 2;
      return y >= 2e-4 && y <= 0.02;
    },
  );
  const a = (ELECTRON.q * c.E) / ELECTRON.m;
  const t = c.len / 100 / c.v.v;
  const y = 0.5 * a * t * t;
  return {
    prompt: `${facts(ELECTRON)} The electron enters the space between two horizontal parallel plates, moving horizontally at $${c.v.tex}\\ \\text{m/s}$. The plates are ${q(c.len, 'cm')} long, and the field between them is ${q(c.E, 'N/C')}, straight down. Find the time the electron spends between the plates, and how far it is deflected upward in that time. ${SCI_BOTH} Ignore gravity.`,
    parts: [sciPart(t, 3, 's', 'Time'), sciPart(y, 3, 'm', 'Deflection')],
    hints: ['Treat it like a projectile: the horizontal speed does not change, so the time is the length of the plates ÷ the speed.', 'Vertically the electron starts from rest and has the acceleration $a = \\dfrac{qE}{m}$.', '$y = \\dfrac{1}{2}at^2$'],
    solution: [
      `$t = \\dfrac{${clean(c.len / 100)}}{${c.v.tex}} = ${sciTex(t)}$ s`,
      `$a = \\dfrac{qE}{m} = \\dfrac{${ELECTRON.qTex} \\times ${c.E}}{${ELECTRON.mTex}} = ${sciTex(a)}$ m/s², upward, because the electron is negative`,
      `$y = \\dfrac{1}{2}at^2 = \\dfrac{1}{2} \\times ${sciTex(a)} \\times (${sciTex(t)})^2 = ${sciTex(y)}$ m`,
    ],
  };
}

// ---------------------------------------------------------------------------- 2.5 Millikan's oil drops

const MILLIKAN_IDEAS: Q[] = [
  { q: 'In Millikan’s experiment an oil drop hangs at rest between two charged plates. Which two forces on the drop balance?', a: 'The electric force, upward, and the weight of the drop, downward', w: ['The electric force and the magnetic force', 'The weight of the drop and the air resistance', 'The electric forces of the two plates'], why: 'A drop at rest has no net force: the upward electric force equals its weight, $qE = mg$.' },
  { q: 'What did Millikan’s oil drop experiment show about electric charge?', a: 'The charge of every drop was a whole number of one smallest charge', w: ['Every drop had the same charge', 'Charge can have any value at all', 'Oil drops cannot be charged'], why: 'Every charge Millikan measured was a whole-number multiple of $1.60 \\times 10^{-19}$ C, the elementary charge.' },
  { q: 'An oil drop hangs at rest between two horizontal plates. The upper plate is positive. What is the sign of the charge of the drop?', a: 'Negative', w: ['Positive', 'The drop is neutral', 'It cannot be told'], why: 'The electric force must point up to balance the weight, so the drop is attracted to the positive upper plate: it is negative.' },
  { q: 'An oil drop hangs at rest between two charged plates. The potential difference between the plates is then increased. What does the drop do?', a: 'It accelerates upward', w: ['It accelerates downward', 'It stays at rest', 'It moves sideways'], why: 'A larger potential difference gives a stronger field, so the upward electric force is now greater than the weight.' },
  { q: 'Two oil drops of the same mass hang at rest between the same plates, at different times. The first needs twice the potential difference of the second. How do their charges compare?', a: 'The first has half the charge of the second', w: ['The first has twice the charge of the second', 'They have the same charge', 'The first has four times the charge of the second'], why: 'For balance $q\\dfrac{\\Delta V}{d} = mg$. With the same weight, the charge is inversely proportional to the potential difference.' },
];

function balancedWeight(rng: Rng): GenOutput {
  const n = rng.int(1, 9);
  const E = sci(rng.float(1.5, 9.5, 1), rng.pick([4, 5]));
  const W = Number((n * E_CHARGE * E.v).toPrecision(3));
  const c = W / E.v;
  return {
    prompt: `An oil drop of weight $${sciTex(W)}\\ \\text{N}$ hangs at rest in an electric field of $${E.tex}\\ \\text{N/C}$. Find the size of the charge of the drop. ${SCI_ASK}`,
    parts: [sciPart(c, 3, 'C')],
    hints: ['The drop is at rest, so the electric force equals its weight: $qE = mg$.', 'The charge is the weight ÷ the field strength.'],
    solution: [`$qE = mg$, so $q = \\dfrac{mg}{E} = \\dfrac{${sciTex(W)}}{${E.tex}} = ${sciTex(c)}$ C`],
  };
}

function dropCharge(rng: Rng): GenOutput {
  const n = rng.int(1, 8);
  const V = rng.pick([200, 300, 450, 600, 800, 1000]);
  const d = rng.pick([0.5, 0.8, 1, 1.2, 1.5, 2]);
  const m = Number(((n * E_CHARGE * V) / ((d / 100) * G)).toPrecision(3));
  const c = (m * G * (d / 100)) / V;
  return {
    prompt: `${G_NOTE} ${E_NOTE} An oil drop of mass $${sciTex(m)}\\ \\text{kg}$ hangs at rest between two horizontal plates that are ${q(d, 'cm')} apart, with a potential difference of ${q(V, 'V')} between them. Find the size of the charge of the drop, in scientific notation to 3 significant digits, and the number of excess electrons on it.`,
    parts: [sciPart(c, 3, 'C', 'Charge'), numPart(n, { label: 'Number of excess electrons' })],
    hints: ['The field between the plates is $E = \\dfrac{\\Delta V}{d}$, with the distance in metres.', 'The drop is at rest: $qE = mg$, so $q = \\dfrac{mgd}{\\Delta V}$.', 'Divide the charge by the elementary charge, and round to a whole number.'],
    solution: [
      `$q = \\dfrac{mgd}{\\Delta V} = \\dfrac{${sciTex(m)} \\times 9.81 \\times ${clean(d / 100)}}{${V}} = ${sciTex(c)}$ C`,
      `$\\dfrac{${sciTex(c)}}{${ET}} = ${num(c / E_CHARGE, 2)}$, so the drop carries ${n} excess ${n === 1 ? 'electron' : 'electrons'}`,
    ],
  };
}

function balanceVoltage(rng: Rng): GenOutput {
  const c = retry(
    () => ({ m: sci(rng.float(1.2, 9.5, 1), -15), n: rng.int(2, 10), d: rng.pick([0.5, 0.8, 1, 1.2, 1.5, 2]) }),
    (t) => {
      const V = (t.m.v * G * (t.d / 100)) / (t.n * E_CHARGE);
      return V >= 50 && V <= 3000;
    },
  );
  const V = (c.m.v * G * (c.d / 100)) / (c.n * E_CHARGE);
  return {
    prompt: `${G_NOTE} ${E_NOTE} An oil drop of mass $${c.m.tex}\\ \\text{kg}$ carries ${c.n} excess electrons. It is between two horizontal plates that are ${q(c.d, 'cm')} apart. What potential difference between the plates holds the drop at rest? Give your answer to the nearest volt.`,
    parts: [rounded(V, 0, 'V')],
    hints: ['The charge of the drop is the number of electrons × the elementary charge.', 'For balance, $q\\dfrac{\\Delta V}{d} = mg$, so $\\Delta V = \\dfrac{mgd}{q}$.'],
    solution: [`$q = ${c.n} \\times ${ET} = ${sciTex(c.n * E_CHARGE)}$ C`, `$\\Delta V = \\dfrac{mgd}{q} = \\dfrac{${c.m.tex} \\times 9.81 \\times ${clean(c.d / 100)}}{${sciTex(c.n * E_CHARGE)}} = ${num(V, 0)}$ V`],
  };
}

const MULTIPLES = [[2, 3, 5, 8], [3, 4, 7, 10], [2, 5, 7, 9], [3, 5, 8, 11], [4, 6, 9, 13], [2, 3, 7, 12]];

function commonFactor(rng: Rng): GenOutput {
  const base = rng.pick([0.8, 1.2, 1.5, 1.8, 2.4]);
  const ks = rng.shuffle(rng.pick(MULTIPLES));
  const values = ks.map((k) => clean(base * k));
  return {
    prompt: `In a computer model of Millikan’s experiment, the charges of four drops are measured in a made-up unit, the "unit charge" u. The four charges are ${values.slice(0, 3).map((v) => `${v} u`).join(', ')} and ${values[3]} u. Every charge is a whole number of one smallest charge. What is the largest that the smallest charge could be, in u?`,
    parts: [numPart(base, { suffix: 'u' })],
    hints: ['Look for the largest number that divides into all four charges a whole number of times.', 'The differences between the charges must also be whole numbers of the smallest charge.'],
    solution: [`${values.map((v, i) => `$${v} = ${ks[i]} \\times ${base}$`).join(', ')}.`, `The whole numbers ${[...ks].sort((a, b) => a - b).join(', ')} share no factor, so the smallest charge is ${base} u`],
  };
}

function impossibleCharge(rng: Rng): GenOutput {
  const ks = rng.sample([1, 2, 3, 4, 5, 6, 8, 10], 3);
  const bad = rng.pick([1.5, 2.5, 3.5, 4.5, 0.5]);
  const tex = (k: number) => `$${sciTex(k * E_CHARGE)}\\ \\text{C}$`;
  return {
    prompt: `${E_NOTE} Which of these charges can an oil drop not have?`,
    parts: [part(mc(rng, tex(bad), ks.map(tex)))],
    hints: ['Divide each charge by the elementary charge.', 'The charge of an object is always a whole number of elementary charges.'],
    solution: [`$\\dfrac{${sciTex(bad * E_CHARGE)}}{${ET}} = ${bad}$, which is not a whole number.`, `The others are ${[...ks].sort((a, b) => a - b).join(', ')} elementary charges. Answer: ${tex(bad)}`],
  };
}

// ---------------------------------------------------------------------------- 2.6 circuits

/** Pairs of resistors whose parallel total is a whole number of ohms. */
const PAIRS: Array<[number, number, number]> = [[6, 3, 2], [12, 6, 4], [12, 4, 3], [20, 5, 4], [30, 20, 12], [10, 15, 6], [40, 10, 8], [60, 30, 20], [60, 40, 24], [24, 8, 6], [24, 12, 8], [30, 6, 5]];

function seriesReview(rng: Rng): GenOutput {
  const rs = [rng.pick([2, 3, 4, 5]), rng.pick([6, 8, 10]), rng.pick([4, 7, 12])];
  const total = rs[0] + rs[1] + rs[2];
  const I = rng.pick([0.5, 1, 1.5, 2]);
  const V = clean(I * total);
  return {
    prompt: `Three resistors of ${ohm(rs[0])}, ${ohm(rs[1])} and ${ohm(rs[2])} are connected in series to ${an(V)} ${q(V, 'V')} battery. Find the total resistance, and the current in the circuit.`,
    parts: [numPart(total, { suffix: 'Ω', label: 'Total resistance' }), numPart(I, { suffix: 'A', label: 'Current' })],
    hints: ['Resistances in series add.', 'Ohm’s law for the whole circuit: $I = \\dfrac{V}{R}$'],
    solution: [`$R = ${rs[0]} + ${rs[1]} + ${rs[2]} = ${total}\\ \\Omega$`, `$I = \\dfrac{V}{R} = \\dfrac{${V}}{${total}} = ${I}$ A`],
  };
}

function parallelReview(rng: Rng): GenOutput {
  const [a, b, total] = rng.pick(PAIRS);
  const I = rng.pick([0.5, 1, 1.5, 2, 3]);
  const V = clean(I * total);
  return {
    prompt: `Two resistors of ${ohm(a)} and ${ohm(b)} are connected in parallel to ${an(V)} ${q(V, 'V')} battery. Find the total resistance of the pair, and the current from the battery.`,
    parts: [numPart(total, { suffix: 'Ω', label: 'Total resistance' }), numPart(I, { suffix: 'A', label: 'Current from the battery' })],
    hints: ['For resistors in parallel: $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$', 'Ohm’s law for the whole circuit: $I = \\dfrac{V}{R}$'],
    solution: [`$\\dfrac{1}{R} = \\dfrac{1}{${a}} + \\dfrac{1}{${b}} = \\dfrac{${(a + b) / gcd(a + b, a * b)}}{${(a * b) / gcd(a + b, a * b)}}$, so $R = ${total}\\ \\Omega$`, `$I = \\dfrac{V}{R} = \\dfrac{${V}}{${total}} = ${I}$ A`],
  };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

interface Combined {
  V: number;
  r1: number;
  a: number;
  b: number;
  pair: number;
  total: number;
  I: number;
}
function combinedCase(rng: Rng): Combined {
  return retry(
    () => {
      const [a, b, pair] = rng.pick(PAIRS);
      const r1 = rng.pick([2, 3, 4, 6, 8, 10, 12, 16]);
      const I = rng.pick([0.5, 1, 1.5, 2, 3]);
      const total = r1 + pair;
      return { V: clean(I * total), r1, a, b, pair, total, I };
    },
    (t) => Number.isInteger(t.V) && t.V <= 60,
  );
}
const combinedSetup = (c: Combined) => `${An(c.V)} ${q(c.V, 'V')} battery is connected to ${an(c.r1)} ${ohm(c.r1)} resistor in series with a pair of resistors, of ${ohm(c.a)} and ${ohm(c.b)}, that are in parallel with each other.`;
const combinedTotal = (c: Combined) => [`The parallel pair: $\\dfrac{1}{R} = \\dfrac{1}{${c.a}} + \\dfrac{1}{${c.b}}$, so $R = ${c.pair}\\ \\Omega$`, `Total: $${c.r1} + ${c.pair} = ${c.total}\\ \\Omega$, so the battery current is $I = \\dfrac{${c.V}}{${c.total}} = ${c.I}$ A`];
const COMBINED_HINTS = ['Replace the parallel pair by one resistor: $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$.', 'That resistor is in series with the other one, so add the two.'];

function combined(rng: Rng): GenOutput {
  const c = combinedCase(rng);
  return {
    prompt: `${combinedSetup(c)} Find the total resistance of the circuit, and the current from the battery.`,
    parts: [numPart(c.total, { suffix: 'Ω', label: 'Total resistance' }), numPart(c.I, { suffix: 'A', label: 'Current from the battery' })],
    hints: [...COMBINED_HINTS, 'Ohm’s law for the whole circuit gives the current from the battery.'],
    solution: combinedTotal(c),
  };
}

function combinedBranch(rng: Rng): GenOutput {
  const c = combinedCase(rng);
  const Vp = clean(c.I * c.pair);
  const Ia = Vp / c.a;
  return {
    prompt: `${combinedSetup(c)} Find the potential difference across the parallel pair, and the current in the ${ohm(c.a)} resistor, to 2 decimal places.`,
    parts: [numPart(Vp, { suffix: 'V', label: 'Across the parallel pair' }), rounded(Ia, 2, 'A', `Current in the ${c.a} Ω resistor`)],
    hints: [...COMBINED_HINTS, 'The potential difference across the pair is the battery current × the resistance of the pair.', 'Each resistor of the pair has that potential difference across it.'],
    solution: [...combinedTotal(c), `Across the pair: $V = IR = ${c.I} \\times ${c.pair} = ${Vp}$ V`, `In the ${c.a} Ω resistor: $I = \\dfrac{${Vp}}{${c.a}} = ${num(Ia, 2)}$ A`],
  };
}

function combinedPower(rng: Rng): GenOutput {
  const c = combinedCase(rng);
  const P1 = clean(c.I * c.I * c.r1);
  const P = clean(c.V * c.I);
  return {
    prompt: `${combinedSetup(c)} Find the power of the ${ohm(c.r1)} resistor, and the total power the battery supplies.`,
    parts: [numPart(P1, { suffix: 'W', label: `Power of the ${c.r1} Ω resistor` }), numPart(P, { suffix: 'W', label: 'Total power' })],
    hints: [...COMBINED_HINTS, 'All of the battery current passes through the series resistor: $P = I^2R$.', 'The total power is the battery voltage × the battery current.'],
    solution: [...combinedTotal(c), `The ${c.r1} Ω resistor: $P = I^2R = ${c.I}^2 \\times ${c.r1} = ${P1}$ W`, `Total: $P = VI = ${c.V} \\times ${c.I} = ${P}$ W`],
  };
}

// ---------------------------------------------------------------------------- 2.6 emf and internal resistance

const EMF_IDEAS: Q[] = [
  { q: 'What is the emf of a battery?', a: 'The energy the battery gives to each coulomb of charge that passes through it', w: ['The force that pushes the charge round the circuit', 'The current the battery supplies', 'The resistance inside the battery'], why: 'Emf is measured in volts: joules of energy for each coulomb. It is not a force, despite its old name.' },
  { q: 'When is the potential difference across the terminals of a battery equal to its emf?', a: 'When no current passes through the battery', w: ['When the current is as large as it can be', 'Always', 'When the battery is connected to a very small resistance'], why: 'With no current there are no volts lost across the internal resistance, so the terminal potential difference equals the emf.' },
  { q: 'A battery is connected to a lamp, and a second lamp is added in parallel with the first. The terminal potential difference of the battery falls a little. Why?', a: 'The battery supplies more current, so more volts are lost across its internal resistance', w: ['The emf of the battery falls when it supplies more current', 'The second lamp uses up some of the charge', 'The internal resistance of the battery increases'], why: 'Terminal potential difference $= \\varepsilon - Ir$. A larger current gives a larger $Ir$, so less is left for the circuit.' },
  { q: 'What happens to the energy that is transferred in the internal resistance of a battery?', a: 'It heats the battery', w: ['It is stored in the battery', 'It is passed on to the circuit', 'It is destroyed'], why: 'Charge does work to pass through the battery itself, and that energy warms the battery. This is why a battery gets warm when it supplies a large current.' },
];

function terminalVoltage(rng: Rng): GenOutput {
  const emf = rng.pick([1.5, 6, 9, 12, 24]);
  const r = rng.pick([0.2, 0.4, 0.5, 0.8, 1]);
  const I = retry(
    () => rng.pick([0.25, 0.5, 1, 1.5, 2, 2.5]),
    (i) => i * r < emf * 0.4,
  );
  const V = clean(emf - I * r);
  return {
    prompt: `A battery has an emf of ${q(emf, 'V')} and an internal resistance of ${ohm(r)}. What is the potential difference across its terminals when it supplies a current of ${q(I, 'A')}?`,
    parts: [numPart(V, { suffix: 'V' })],
    hints: ['Some of the emf is lost across the internal resistance: the lost volts are $Ir$.', 'terminal potential difference $= \\varepsilon - Ir$'],
    solution: [`Lost volts: $Ir = ${I} \\times ${r} = ${clean(I * r)}$ V`, `$V = \\varepsilon - Ir = ${emf} - ${clean(I * r)} = ${V}$ V`],
  };
}

interface Cell {
  emf: number;
  r: number;
  R: number;
  I: number;
}
function cell(rng: Rng): Cell {
  return retry(
    () => {
      const emf = rng.pick([1.5, 3, 4.5, 6, 9, 12, 24]);
      const r = rng.pick([0.2, 0.25, 0.5, 1, 1.5, 2]);
      const I = rng.pick([0.2, 0.25, 0.5, 0.75, 1, 1.5, 2, 3]);
      return { emf, r, I, R: clean(emf / I - r) };
    },
    (t) => t.R >= 1 && Number.isInteger(clean(t.R * 2)) && t.R >= 2 * t.r && Number.isInteger(clean(t.I * t.R * 100)),
  );
}

function emfCircuit(rng: Rng): GenOutput {
  const c = cell(rng);
  const V = clean(c.I * c.R);
  return {
    prompt: `A battery with an emf of ${q(c.emf, 'V')} and an internal resistance of ${ohm(c.r)} is connected to ${an(c.R)} ${ohm(c.R)} resistor. Find the current in the circuit, and the potential difference across the terminals of the battery.`,
    parts: [numPart(c.I, { suffix: 'A', label: 'Current' }), numPart(V, { suffix: 'V', label: 'Terminal potential difference' })],
    hints: ['The internal resistance is in series with the resistor: $I = \\dfrac{\\varepsilon}{R + r}$.', 'The terminal potential difference is the potential difference across the resistor: $V = IR$.'],
    solution: [`$I = \\dfrac{\\varepsilon}{R + r} = \\dfrac{${c.emf}}{${c.R} + ${c.r}} = ${c.I}$ A`, `$V = IR = ${c.I} \\times ${c.R} = ${V}$ V, which is also $\\varepsilon - Ir = ${c.emf} - ${clean(c.I * c.r)}$`],
  };
}

function internalFromReadings(rng: Rng): GenOutput {
  const c = cell(rng);
  const V = clean(c.I * c.R);
  return {
    prompt: `A voltmeter across the terminals of a battery reads ${q(c.emf, 'V')} when the battery supplies no current. When the battery is connected to ${an(c.R)} ${ohm(c.R)} resistor, the voltmeter reads ${q(V, 'V')}. Find the current in the resistor, and the internal resistance of the battery.`,
    parts: [numPart(c.I, { suffix: 'A', label: 'Current' }), numPart(c.r, { suffix: 'Ω', label: 'Internal resistance' })],
    hints: ['With no current, the voltmeter reads the emf.', 'The current is the potential difference across the resistor ÷ its resistance.', 'The volts lost inside the battery are $\\varepsilon - V = Ir$.'],
    solution: [`$I = \\dfrac{V}{R} = \\dfrac{${V}}{${c.R}} = ${c.I}$ A`, `Lost volts: $${c.emf} - ${V} = ${clean(c.emf - V)}$ V, so $r = \\dfrac{${clean(c.emf - V)}}{${c.I}} = ${c.r}\\ \\Omega$`],
  };
}

function powerWasted(rng: Rng): GenOutput {
  const c = cell(rng);
  const useful = clean(c.I * c.I * c.R);
  const wasted = clean(c.I * c.I * c.r);
  return {
    prompt: `A battery with an emf of ${q(c.emf, 'V')} and an internal resistance of ${ohm(c.r)} is connected to ${an(c.R)} ${ohm(c.R)} resistor. Find the power delivered to the resistor, and the power wasted inside the battery. Give both answers to 2 decimal places.`,
    parts: [rounded(useful, 2, 'W', 'Power of the resistor'), rounded(wasted, 2, 'W', 'Power wasted in the battery')],
    hints: ['Find the current first: $I = \\dfrac{\\varepsilon}{R + r}$.', 'The power in a resistance is $P = I^2R$. Use it for the resistor, and for the internal resistance.'],
    solution: [`$I = \\dfrac{${c.emf}}{${c.R} + ${c.r}} = ${c.I}$ A`, `Resistor: $P = I^2R = ${c.I}^2 \\times ${c.R} = ${num(useful, 2)}$ W`, `Inside the battery: $P = I^2r = ${c.I}^2 \\times ${c.r} = ${num(wasted, 2)}$ W`],
  };
}

export const POTENTIAL_SKILLS: SkillDef[] = [
  skill({ id: 'p30-potential', name: 'Potential difference and energy', description: 'Relate potential difference to the energy of each coulomb, in joules and in electronvolts, and find the energy a charge gains or loses.', outcomes: ['30-B2'], lessonId: L(4), calculator: true, gen: bank([either(voltageFromEnergy, workFromVoltage, fromBank(POTENTIAL_IDEAS, ['Potential difference is the change in electric potential energy for each coulomb.'])), either(electronVolts, energyGained), either(energyChange, chargeNumber)], ['Potential difference is energy for each coulomb: $\\Delta V = \\dfrac{\\Delta E}{q}$']) }),
  skill({ id: 'p30-plates-field', name: 'The field between parallel plates', description: 'Use E = ΔV ÷ d for the uniform field between parallel plates, and find the force on a charge and the energy it gains there.', outcomes: ['30-B2'], lessonId: L(4), calculator: true, gen: bank([platesField, either(platesVoltage, platesSeparation, platesForce), either(platesPartWay, fromBank(PLATES_IDEAS, ['The field between parallel plates is uniform, from the positive plate to the negative plate: $E = \\dfrac{\\Delta V}{d}$.']))], ['Between parallel plates the field is uniform: $E = \\dfrac{\\Delta V}{d}$, with the distance in metres']) }),
  skill({ id: 'p30-accelerate', name: 'Charges moving in a uniform field', description: 'Find the acceleration of a charged particle in a uniform field, the speed it gains from a potential difference, and its motion between plates.', outcomes: ['30-B2'], lessonId: L(5), calculator: true, gen: bank([fieldAcceleration, either(speedFromVoltage, voltageForSpeed), either(crossPlates, deflection)], ['The force is $F = qE$, and the energy gained is $q\\Delta V = \\dfrac{1}{2}mv^2$ for a particle that starts from rest']) }),
  skill({ id: 'p30-millikan', name: 'Millikan’s oil drops', description: 'Balance the electric force on a charged drop against its weight to find its charge, and explain how the experiment shows that charge is quantized.', outcomes: ['30-B2'], lessonId: L(5), calculator: true, gen: bank([either(balancedWeight, fromBank(MILLIKAN_IDEAS, ['A drop at rest has balanced forces: the electric force up equals the weight down.'])), dropCharge, either(balanceVoltage, commonFactor, impossibleCharge)], ['For a drop held at rest, $qE = mg$, with $E = \\dfrac{\\Delta V}{d}$ between the plates']) }),
  skill({ id: 'p30-circuits', name: 'Series and parallel circuits', description: 'Find the total resistance, the currents, the potential differences and the power in circuits that combine resistors in series and in parallel.', outcomes: ['30-B2'], lessonId: L(6), calculator: true, gen: bank([either(seriesReview, parallelReview), combined, either(combinedBranch, combinedPower)], ['In series, resistances add. In parallel, $\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$. Ohm’s law: $V = IR$']) }),
  skill({ id: 'p30-emf', name: 'Emf and internal resistance', description: 'Use emf and internal resistance to find the current a battery supplies, its terminal potential difference and the power wasted inside it.', outcomes: ['30-B2'], lessonId: L(6), calculator: true, gen: bank([either(terminalVoltage, fromBank(EMF_IDEAS, ['terminal potential difference = emf − the volts lost across the internal resistance'])), emfCircuit, either(internalFromReadings, powerWasted)], ['$\\varepsilon = I(R + r)$, and the terminal potential difference is $V = \\varepsilon - Ir$']) }),
];
