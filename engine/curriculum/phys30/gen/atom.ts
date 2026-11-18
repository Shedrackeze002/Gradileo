/**
 * Grade 12 Physics, Unit 4, lessons 4.1 to 4.3: the electron, the nucleus and the Bohr atom
 * (30-D1). Thomson's charge-to-mass ratio, Rutherford's scattering and the closest approach of an
 * alpha particle, and the energy levels and spectrum of hydrogen. Every constant a question needs
 * is in the question.
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { ALPHA, ELECTRON, E_CHARGE, E_NOTE, K, K_NOTE, PROTON, SCI_ASK, SCI_BOTH, rounded, sci, sciPart, sciTex, type Particle, type Sci } from './common.ts';
import { C, C_NOTE, C_TEX } from './light.ts';

const L = (n: number) => `p30-4-${n}`;
/** Planck's constant, in joule seconds. */
const H = 6.63e-34;
const H_TEX = '6.63 \\times 10^{-34}';
const H_NOTE = `Planck's constant is $${H_TEX}\\ \\text{J·s}$.`;
/** One electronvolt, in joules. */
const EV = 1.6e-19;
const EV_TEX = '1.60 \\times 10^{-19}';
const EV_NOTE = `One electronvolt is $${EV_TEX}\\ \\text{J}$.`;
/** One megaelectronvolt, in joules. */
const MEV = 1.6e-13;
const MEV_TEX = '1.60 \\times 10^{-13}';
const MEV_NOTE = `($1\\ \\text{MeV} = ${MEV_TEX}\\ \\text{J}$)`;
const NM_NOTE = '($1\\ \\text{nm} = 10^{-9}\\ \\text{m}$)';
const sig = (x: number, n = 3) => Number(x.toPrecision(n));

// ---------------------------------------------------------------------------- 4.1 cathode rays

const CATHODE_1: Q[] = [
  { q: 'What are cathode rays?', a: 'Streams of fast electrons', w: ['Beams of light', 'Streams of positive ions', 'Waves like X-rays'], why: 'Thomson showed that cathode rays are negative particles, far lighter than any atom. We call them electrons.' },
  { q: 'In a cathode ray tube, which way do the rays travel?', a: 'From the negative electrode, the cathode, towards the positive electrode, the anode', w: ['From the positive electrode towards the negative electrode', 'Out from both electrodes at once', 'From the glass wall towards the centre of the tube'], why: 'The rays are negative, so they are repelled by the cathode and attracted by the anode.' },
  { q: 'Cathode rays pass between two charged plates. Which way do they bend?', a: 'Towards the positive plate', w: ['Towards the negative plate', 'They do not bend', 'In a circle round the plates'], why: 'Cathode rays carry negative charge, so the positive plate attracts them.' },
  { q: 'Why is most of the air pumped out of a cathode ray tube?', a: 'So that the particles can cross the tube without striking many gas molecules', w: ['So that the glass does not get hot', 'So that the air cannot conduct heat away', 'So that the rays travel at the speed of light'], why: 'In air at normal pressure the particles are stopped almost at once.' },
  { q: 'A light paddle wheel in the path of cathode rays begins to turn. What does this suggest?', a: 'The rays are made of particles that have mass and carry momentum', w: ['The rays are a kind of light', 'The rays have no charge', 'The rays are attracted by the wheel'], why: 'Something that can push a wheel round carries momentum, as a stream of particles does.' },
  { q: 'Who showed, in 1897, that cathode rays are particles much lighter than atoms?', a: 'J. J. Thomson', w: ['Ernest Rutherford', 'Niels Bohr', 'Robert Millikan'], why: 'Thomson measured the charge-to-mass ratio of the particles and found it far larger than that of any ion.' },
  { q: 'A magnet is brought near a beam of cathode rays. What happens to the beam?', a: 'It is deflected, at right angles to the field and to its own motion', w: ['Nothing, since the rays are not magnetic', 'It speeds up', 'It is pulled straight towards the north pole'], why: 'A magnetic field pushes on a moving charge, at right angles to its velocity and to the field.' },
];

const CATHODE_2: Q[] = [
  { q: 'Thomson changed the metal of the cathode and the gas in the tube. What did he find?', a: 'The charge-to-mass ratio of the particles was always the same', w: ['Each metal gave particles with a different ratio', 'The rays only appeared with some metals', 'The particles changed the sign of their charge'], why: 'The same particle came out of every material, so it must be a part of every atom.' },
  { q: 'What did Thomson measure for the particles of cathode rays?', a: 'The ratio of their charge to their mass', w: ['Their charge alone', 'Their mass alone', 'Their diameter'], why: 'The charge and the mass only appear together in the equations for the deflection of the beam, so only their ratio can be found.' },
  { q: 'The charge-to-mass ratio of the electron is about 1800 times that of a hydrogen ion, and the two carry charges of the same size. What does this show?', a: 'The electron has about one 1800th of the mass of a hydrogen ion', w: ['The electron has 1800 times the mass of a hydrogen ion', 'The electron has 1800 times the charge of a hydrogen ion', 'The electron moves 1800 times faster'], why: 'With equal charges, a ratio 1800 times larger means a mass 1800 times smaller.' },
  { q: 'How did Thomson find the speed of the particles in the beam?', a: 'He balanced an electric force against a magnetic force, so that the beam went straight', w: ['He timed the beam along the tube with a clock', 'He measured the colour of the glow', 'He weighed the cathode before and after'], why: 'When the beam is straight, $qE = qvB$, so $v = \\dfrac{E}{B}$.' },
  { q: 'What was Thomson\'s model of the atom?', a: 'A ball of positive charge with electrons dotted through it', w: ['A tiny positive nucleus with electrons in orbit round it', 'A solid ball with no parts', 'Electrons in fixed energy levels round a nucleus'], why: 'This is often called the plum pudding model. The nucleus was not known until Rutherford\'s work.' },
  { q: 'Atoms are neutral, but they contain negative electrons. What else must be true?', a: 'Atoms contain an equal amount of positive charge', w: ['Atoms contain no other charge', 'Electrons lose their charge inside an atom', 'Atoms contain more negative charge elsewhere'], why: 'The charges must add up to zero.' },
  { q: 'Thomson found only the ratio of charge to mass. Whose experiment then made it possible to find the mass of the electron?', a: 'Millikan\'s, which measured the charge of the electron', w: ['Rutherford\'s, which found the nucleus', 'Young\'s, which showed that light is a wave', 'Hertz\'s, which made radio waves'], why: 'Once the charge is known, the mass is the charge divided by the charge-to-mass ratio.' },
];

const CATHODE_3: Q[] = [
  { q: 'In Thomson\'s apparatus the beam passes straight through crossed electric and magnetic fields. What must be true of the two forces on each electron?', a: 'They are equal in size and opposite in direction', w: ['They are both zero', 'They act in the same direction', 'The magnetic force is twice the electric force'], why: 'A straight path at steady speed means that the net force is zero.' },
  { q: 'Electric and magnetic fields are balanced so that a beam passes straight through. The magnetic field is then made twice as strong. What must be done to keep the same beam straight?', a: 'The electric field must be made twice as strong', w: ['The electric field must be halved', 'The electric field must be switched off', 'Nothing: the beam stays straight'], why: 'The beam is straight when $v = \\dfrac{E}{B}$. The speed has not changed, so the ratio of the fields must stay the same.' },
  { q: 'A beam of electrons moves in a circle in a magnetic field. The electrons are replaced by protons that move at the same speed. How does the path change?', a: 'It curves the opposite way, in a much larger circle', w: ['It curves the same way, in a smaller circle', 'It does not change', 'It becomes a straight line'], why: 'The charge has the opposite sign, and $r = \\dfrac{mv}{qB}$ is much larger for the much heavier proton.' },
  { q: 'Several kinds of particle move at the same speed through the same magnetic field. Which moves in the smallest circle?', a: 'The one with the largest charge-to-mass ratio', w: ['The one with the smallest charge-to-mass ratio', 'The one with the largest mass', 'They all move in the same circle'], why: '$r = \\dfrac{mv}{qB} = \\dfrac{v}{(q/m)B}$: a large ratio gives a small radius.' },
  { q: 'Why could Thomson\'s experiment not give the mass of the electron by itself?', a: 'The charge and the mass appear in his equations only as a ratio', w: ['The electron has no mass', 'The beam was too faint to see', 'The mass changes from metal to metal'], why: 'Any charge and mass with the same ratio would follow the same path.' },
  { q: 'Why was the discovery of the electron a problem for the idea that atoms cannot be divided?', a: 'It showed that atoms have smaller parts inside them', w: ['It showed that atoms do not exist', 'It showed that atoms are made only of electrons', 'It showed that atoms have no charge'], why: 'A particle with far less mass than any atom, found in every material, must come from inside atoms.' },
  { q: 'A beam of cathode rays bends towards a positive plate. X-rays pass between the same plates without bending. What is the difference?', a: 'Cathode rays are charged particles, and X-rays are electromagnetic waves with no charge', w: ['X-rays are heavier than cathode rays', 'X-rays are positive and cathode rays are negative', 'Cathode rays travel at the speed of light'], why: 'Only something with charge is pushed by an electric field.' },
];

interface Beam {
  plural: string;
  p: Particle;
}
const BEAMS: Beam[] = [
  { plural: 'electrons', p: ELECTRON },
  { plural: 'protons', p: PROTON },
  { plural: 'alpha particles', p: ALPHA },
];
const RATIO_TABLE = 'The charge-to-mass ratios of three particles are: electron $1.76 \\times 10^{11}\\ \\text{C/kg}$, proton $9.58 \\times 10^{7}\\ \\text{C/kg}$, alpha particle $4.82 \\times 10^{7}\\ \\text{C/kg}$.';

interface Field {
  /** The field in teslas. */
  B: number;
  /** The field as it is written in the question, with its unit. */
  text: string;
  /** The field in teslas, in LaTeX. */
  tex: string;
}
/** A magnetic field of a size that suits the particle: millitesla for electrons, tenths of a tesla for ions. */
function field(rng: Rng, electron: boolean): Field {
  if (electron) {
    const mT = rng.float(0.5, 5, 1);
    return { B: mT * 1e-3, text: q(mT.toFixed(1), 'mT'), tex: `${mT.toFixed(1)} \\times 10^{-3}` };
  }
  const B = rng.float(0.05, 0.9, 2);
  return { B, text: q(B.toFixed(2), 'T'), tex: B.toFixed(2) };
}

interface Bend {
  beam: Beam;
  v: Sci;
  f: Field;
  cm: number;
  /** The ratio that the rounded measurements give. */
  ratio: number;
}
/** A beam of known speed bent into a circle by a magnetic field. */
function bend(rng: Rng): Bend {
  return retry(
    () => {
      const beam = rng.pick(BEAMS);
      const electron = beam.p === ELECTRON;
      const v = electron ? sci(rng.float(1, 4, 1), rng.pick([6, 7]), 1) : sci(rng.float(1, 9.5, 1), rng.pick([5, 6]), 1);
      const f = field(rng, electron);
      const cm = sig((v.v / ((beam.p.q / beam.p.m) * f.B)) * 100);
      return { beam, v, f, cm, ratio: v.v / (f.B * cm * 1e-2) };
    },
    (x) => x.cm >= 1 && x.cm <= 60,
  );
}

function speedFromFields(rng: Rng): GenOutput {
  const t = retry(
    () => {
      const E = sci(rng.float(1, 9.5, 1), rng.pick([3, 4]), 1);
      const mT = rng.float(0.5, 9.5, 1);
      return { E, mT, v: E.v / (mT * 1e-3) };
    },
    (x) => x.v >= 5e5 && x.v <= 4e7,
  );
  return {
    prompt: `A beam of electrons passes straight through a region where an electric field of $${t.E.tex}\\ \\text{V/m}$ is at right angles to a magnetic field of ${q(t.mT.toFixed(1), 'mT')}. The electric force and the magnetic force on each electron balance. Find the speed of the electrons. ${SCI_ASK}`,
    parts: [sciPart(t.v, 3, 'm/s')],
    hints: ['The forces balance: $qE = qvB$, so $v = \\dfrac{E}{B}$', 'Change the magnetic field to teslas first.'],
    solution: [`$v = \\dfrac{E}{B} = \\dfrac{${t.E.tex}}{${t.mT.toFixed(1)} \\times 10^{-3}} = ${sciTex(t.v)}$ m/s`],
  };
}

function ratioFromCircle(rng: Rng): GenOutput {
  const t = bend(rng);
  return {
    prompt: `A beam of charged particles moves at $${t.v.tex}\\ \\text{m/s}$ at right angles to a magnetic field of ${t.f.text}. The beam follows a circle with a radius of ${q(t.cm, 'cm')}. Find the charge-to-mass ratio of the particles. ${SCI_ASK}`,
    parts: [sciPart(t.ratio, 3, 'C/kg')],
    hints: ['The magnetic force is the centripetal force: $qvB = \\dfrac{mv^2}{r}$', 'Rearrange: $\\dfrac{q}{m} = \\dfrac{v}{Br}$, with the field in teslas and the radius in metres.'],
    solution: [`$\\dfrac{q}{m} = \\dfrac{v}{Br} = \\dfrac{${t.v.tex}}{${t.f.tex} \\times ${num(t.cm * 1e-2, 5)}} = ${sciTex(t.ratio)}$ C/kg`],
  };
}

function thomson(rng: Rng): GenOutput {
  const t = retry(
    () => {
      const E = sci(rng.float(1, 9.5, 1), rng.pick([3, 4, 5]), 1);
      const f = field(rng, true);
      const v = E.v / f.B;
      const cm = sig((v / ((ELECTRON.q / ELECTRON.m) * f.B)) * 100);
      return { E, f, v, cm };
    },
    (x) => x.v >= 2e6 && x.v <= 4e7 && x.cm >= 1 && x.cm <= 50,
  );
  const ratio = t.v / (t.f.B * t.cm * 1e-2);
  return {
    prompt: `In an experiment like Thomson's, a beam of cathode rays passes straight through crossed fields: an electric field of $${t.E.tex}\\ \\text{V/m}$ and a magnetic field of ${t.f.text}. With the electric field switched off, the same magnetic field bends the beam into a circle with a radius of ${q(t.cm, 'cm')}. Find the speed of the particles, and their charge-to-mass ratio. ${SCI_BOTH}`,
    parts: [sciPart(t.v, 3, 'm/s', 'Speed'), sciPart(ratio, 3, 'C/kg', 'Charge-to-mass ratio')],
    hints: ['In the crossed fields the forces balance: $v = \\dfrac{E}{B}$', 'In the magnetic field alone, $qvB = \\dfrac{mv^2}{r}$, so $\\dfrac{q}{m} = \\dfrac{v}{Br}$, with the radius in metres.'],
    solution: [`$v = \\dfrac{E}{B} = \\dfrac{${t.E.tex}}{${t.f.tex}} = ${sciTex(t.v)}$ m/s`, `$\\dfrac{q}{m} = \\dfrac{v}{Br} = \\dfrac{${sciTex(t.v)}}{${t.f.tex} \\times ${num(t.cm * 1e-2, 5)}} = ${sciTex(ratio)}$ C/kg`],
  };
}

function identifyParticle(rng: Rng): GenOutput {
  const t = bend(rng);
  const names = ['Electrons', 'Protons', 'Alpha particles'];
  const idx = BEAMS.indexOf(t.beam);
  return {
    prompt: `${RATIO_TABLE} A beam of unknown particles moves at $${t.v.tex}\\ \\text{m/s}$ at right angles to a magnetic field of ${t.f.text}, and follows a circle with a radius of ${q(t.cm, 'cm')}. Find the charge-to-mass ratio of the particles, in scientific notation to 3 significant digits, and say what they are.`,
    parts: [sciPart(t.ratio, 3, 'C/kg', 'Charge-to-mass ratio'), part(fixedChoice(names, idx), { label: 'The particles are' })],
    hints: ['$qvB = \\dfrac{mv^2}{r}$, so $\\dfrac{q}{m} = \\dfrac{v}{Br}$, with the field in teslas and the radius in metres.', 'Compare your ratio with the three in the question.'],
    solution: [`$\\dfrac{q}{m} = \\dfrac{v}{Br} = \\dfrac{${t.v.tex}}{${t.f.tex} \\times ${num(t.cm * 1e-2, 5)}} = ${sciTex(t.ratio)}$ C/kg`, `This matches the ratio of ${t.beam.plural}.`],
  };
}

function massFromRatio(rng: Rng): GenOutput {
  if (rng.chance(0.15)) {
    const m = E_CHARGE / 1.76e11;
    return {
      prompt: `Thomson found that the particles of cathode rays have a charge-to-mass ratio of $1.76 \\times 10^{11}\\ \\text{C/kg}$. Millikan later found that each one carries a charge of size $1.60 \\times 10^{-19}\\ \\text{C}$. Use the two results to find the mass of the particle. ${SCI_ASK}`,
      parts: [sciPart(m, 3, 'kg')],
      hints: ['The ratio is the charge ÷ the mass, so the mass is the charge ÷ the ratio.'],
      solution: [`$m = \\dfrac{q}{q/m} = \\dfrac{1.60 \\times 10^{-19}}{1.76 \\times 10^{11}} = ${sciTex(m)}$ kg`],
    };
  }
  const A = rng.pick([4, 7, 9, 12, 14, 16, 20, 23, 24, 27, 32, 35, 39, 40]);
  const z = rng.pick([1, 2]);
  const charge = z * E_CHARGE;
  const ratio = sig(charge / (A * 1.66e-27));
  const m = charge / ratio;
  return {
    prompt: `In an experiment like Thomson's, a beam of positive ions is found to have a charge-to-mass ratio of $${sciTex(ratio)}\\ \\text{C/kg}$. Each ion carries a charge of $${sciTex(charge)}\\ \\text{C}$. Find the mass of one ion. ${SCI_ASK}`,
    parts: [sciPart(m, 3, 'kg')],
    hints: ['The ratio is the charge ÷ the mass, so the mass is the charge ÷ the ratio.'],
    solution: [`$m = \\dfrac{q}{q/m} = \\dfrac{${sciTex(charge)}}{${sciTex(ratio)}} = ${sciTex(m)}$ kg`],
  };
}

function acceleratedRatio(rng: Rng): GenOutput {
  const t = retry(
    () => {
      const beam = rng.pick(BEAMS);
      const electron = beam.p === ELECTRON;
      const V = electron ? rng.int(2, 40) * 50 : rng.int(5, 60) * 100;
      const f = field(rng, electron);
      const cm = sig((Math.sqrt((2 * V) / (beam.p.q / beam.p.m)) / f.B) * 100);
      return { V, f, cm };
    },
    (x) => x.cm >= 1 && x.cm <= 60,
  );
  const r = t.cm * 1e-2;
  const ratio = (2 * t.V) / (t.f.B * t.f.B * r * r);
  return {
    prompt: `Charged particles are accelerated from rest through a potential difference of ${q(t.V, 'V')}. They then enter a magnetic field of ${t.f.text} at right angles, and move in a circle with a radius of ${q(t.cm, 'cm')}. Find the charge-to-mass ratio of the particles. ${SCI_ASK}`,
    parts: [sciPart(ratio, 3, 'C/kg')],
    hints: ['The particles gain kinetic energy $qV = \\dfrac{1}{2}mv^2$, and in the field $qvB = \\dfrac{mv^2}{r}$.', 'Put $v = \\dfrac{qBr}{m}$ into the energy equation: $\\dfrac{q}{m} = \\dfrac{2V}{B^2r^2}$, with the radius in metres.'],
    solution: [`From $qvB = \\dfrac{mv^2}{r}$, $v = \\dfrac{qBr}{m}$. Then $qV = \\dfrac{1}{2}mv^2$ gives $\\dfrac{q}{m} = \\dfrac{2V}{B^2r^2}$`, `$\\dfrac{q}{m} = \\dfrac{2 \\times ${t.V}}{(${t.f.tex})^2 \\times ${num(r, 5)}^2} = ${sciTex(ratio)}$ C/kg`],
  };
}

// ---------------------------------------------------------------------------- 4.2 Rutherford's nucleus

const RUTHERFORD_1: Q[] = [
  { q: 'In the gold foil experiment, what was fired at the foil?', a: 'Alpha particles', w: ['Electrons', 'Neutrons', 'Gamma rays'], why: 'Geiger and Marsden, working for Rutherford, fired alpha particles from a radioactive source at a very thin gold foil.' },
  { q: 'What happened to most of the alpha particles in the gold foil experiment?', a: 'They passed through the foil with little or no deflection', w: ['They bounced straight back', 'They were absorbed by the foil', 'They were turned through 90°'], why: 'Most of each atom is empty space, so most alpha particles met nothing that could turn them.' },
  { q: 'What surprising result did Geiger and Marsden find?', a: 'A few alpha particles bounced back from the foil', w: ['Every alpha particle was absorbed', 'The foil gave out electrons', 'The alpha particles speeded up'], why: 'About one in 8000 was turned through more than 90°. Thomson\'s model could not explain this.' },
  { q: 'What did Rutherford conclude from the alpha particles that passed straight through the foil?', a: 'Most of an atom is empty space', w: ['Atoms are solid balls', 'Alpha particles have no mass', 'Gold atoms have no charge'], why: 'An alpha particle that meets nothing carries straight on.' },
  { q: 'What is at the centre of Rutherford\'s model of the atom?', a: 'A tiny, dense nucleus with a positive charge', w: ['A cloud of electrons', 'A large ball of positive charge that fills the atom', 'Nothing: the centre is empty'], why: 'Only a small, massive, positive centre could turn a fast alpha particle back.' },
  { q: 'What charge does an alpha particle carry?', a: 'Positive, twice the size of the charge of an electron', w: ['Negative, the same as an electron', 'No charge', 'Positive, the same size as the charge of an electron'], why: 'An alpha particle is a helium nucleus, with two protons.' },
  { q: 'How were the scattered alpha particles detected?', a: 'By the tiny flashes of light they made on a screen coated with zinc sulfide', w: ['By the sound they made when they struck the foil', 'By weighing the foil', 'By the colour of the gold'], why: 'The observers counted the flashes through a microscope, at each angle round the foil.' },
];

const RUTHERFORD_2: Q[] = [
  { q: 'What did Thomson\'s model of the atom predict for alpha particles fired at a thin foil?', a: 'They would all pass through with hardly any deflection', w: ['Most of them would bounce back', 'They would all be absorbed', 'Half of them would be turned through 90°'], why: 'Positive charge spread through the whole atom could not push hard enough on a fast alpha particle to turn it far.' },
  { q: 'Why did a few alpha particles bounce back from the foil?', a: 'They came close to a small, massive, positive nucleus, which repelled them strongly', w: ['They struck electrons head on', 'They were attracted by the nucleus', 'They ran out of energy in the foil'], why: 'All of the positive charge and nearly all of the mass of the atom are in the nucleus, so the force close to it is very large.' },
  { q: 'Which force turned the alpha particles aside?', a: 'The electric repulsion between the positive alpha particle and the positive nucleus', w: ['Gravity', 'The attraction of the electrons', 'The magnetic force of the foil'], why: 'Like charges repel, and the force grows very large at small distances.' },
  { q: 'Why did the electrons in the gold atoms hardly affect the alpha particles?', a: 'An electron has only about one seven-thousandth of the mass of an alpha particle', w: ['Electrons have no charge', 'Electrons repel alpha particles', 'There are no electrons in gold'], why: 'A heavy particle that strikes a very light one is hardly turned at all, like a bowling ball that strikes a table tennis ball.' },
  { q: 'Only about 1 alpha particle in 8000 was turned through more than 90°. What does this say about the nucleus?', a: 'It is very small compared with the atom', w: ['It is nearly as large as the atom', 'It has a negative charge', 'It has very little mass'], why: 'Close approaches to the nucleus are rare, so the nucleus must be a very small target.' },
  { q: 'Why was the gold foil made extremely thin?', a: 'So that an alpha particle would be scattered by one nucleus at most on its way through', w: ['So that it would be cheap', 'So that light could pass through it', 'So that the alpha particles would speed up'], why: 'In a thick foil each particle would be scattered many times, and the effect of a single nucleus would be hidden.' },
  { q: 'About how large is a nucleus compared with its atom?', a: 'Between one ten-thousandth and one hundred-thousandth of the diameter', w: ['About half of the diameter', 'About one tenth of the diameter', 'The same size: the nucleus fills the atom'], why: 'An atom is about $10^{-10}$ m across, and a nucleus is about $10^{-15}$ m to $10^{-14}$ m across.' },
];

const RUTHERFORD_3: Q[] = [
  { q: 'An alpha particle heads straight for a gold nucleus. What happens to its kinetic energy as it approaches?', a: 'It changes into electric potential energy, until the particle stops for an instant and is pushed back', w: ['It stays the same all the way', 'It increases as the nucleus attracts the particle', 'It is given to the electrons of the atom'], why: 'The repulsion does negative work on the particle. At the closest approach all of its kinetic energy has become potential energy.' },
  { q: 'The gold foil is replaced by a foil of a metal with fewer protons in each nucleus. How does the scattering change?', a: 'Fewer alpha particles are turned through large angles', w: ['More alpha particles are turned through large angles', 'There is no change', 'Every alpha particle bounces back'], why: 'A nucleus with less charge repels the alpha particles less strongly.' },
  { q: 'Faster alpha particles are fired at a nucleus. How close can they get, compared with slower ones?', a: 'Closer, since they have more kinetic energy to change into potential energy', w: ['Not as close', 'Exactly as close', 'They cannot approach at all'], why: 'At the closest approach $E_k = \\dfrac{kq_1q_2}{r}$, so more energy gives a smaller $r$.' },
  { q: 'What was the main fault of Rutherford\'s model of the atom?', a: 'An orbiting electron is accelerating, so it should radiate energy and spiral into the nucleus', w: ['It had no electrons', 'It made the atom too heavy', 'It gave the nucleus a negative charge'], why: 'Maxwell\'s theory says that an accelerating charge radiates. Rutherford\'s atom should collapse in a fraction of a second, but atoms are stable.' },
  { q: 'Rutherford\'s model could not explain one well-known observation about hot gases. Which one?', a: 'Each element gives out light of only certain wavelengths', w: ['Hot gases expand', 'Hot gases conduct electricity', 'Hot gases rise'], why: 'An electron that spiralled inwards would give out a continuous range of wavelengths, not sharp lines.' },
  { q: 'One alpha particle passes a nucleus at a distance and is turned through a small angle. A second one passes much closer. How is its path different?', a: 'It is turned through a larger angle', w: ['It is turned through a smaller angle', 'It is not turned at all', 'It is pulled into the nucleus'], why: 'The force of repulsion is much larger close to the nucleus.' },
  { q: 'In Rutherford\'s model, what keeps the electrons in the atom?', a: 'The electric attraction of the positive nucleus', w: ['Gravity', 'The strong nuclear force', 'The pressure of the other atoms'], why: 'The attraction of the nucleus is the centripetal force on an orbiting electron, as gravity is for a planet.' },
];

type Metal = [name: string, protons: number];
const METALS: Metal[] = [['aluminium', 13], ['iron', 26], ['copper', 29], ['silver', 47], ['tin', 50], ['platinum', 78], ['gold', 79], ['lead', 82]];
const ALPHA_NOTE = 'An alpha particle has a charge of $+2e$.';

function nuclearCharge(rng: Rng): GenOutput {
  const m = rng.pick([...METALS, ['carbon', 6], ['calcium', 20], ['zinc', 30], ['uranium', 92], ['tungsten', 74], ['nickel', 28]] as Metal[]);
  const charge = m[1] * E_CHARGE;
  return {
    prompt: `${E_NOTE} A nucleus of ${m[0]} contains ${m[1]} protons. Find the charge of the nucleus. ${SCI_ASK}`,
    parts: [sciPart(charge, 3, 'C')],
    hints: ['Each proton carries one elementary charge, so the charge of the nucleus is the number of protons × $e$.'],
    solution: [`$q = ${m[1]} \\times 1.60 \\times 10^{-19} = ${sciTex(charge)}$ C`],
  };
}

function alphaJoules(rng: Rng): GenOutput {
  const MeV = rng.float(3, 9.5, 1);
  const E = MeV * MEV;
  return {
    prompt: `An alpha particle leaves a radioactive source with a kinetic energy of ${q(MeV.toFixed(1), 'MeV')} ${MEV_NOTE}. Find its kinetic energy in joules. ${SCI_ASK}`,
    parts: [sciPart(E, 3, 'J')],
    hints: ['Multiply the energy in megaelectronvolts by $1.60 \\times 10^{-13}$.'],
    solution: [`$E_k = ${MeV.toFixed(1)} \\times ${MEV_TEX} = ${sciTex(E)}$ J`],
  };
}

function closestApproach(rng: Rng): GenOutput {
  const m = rng.pick(METALS);
  const MeV = rng.float(4, 9, 1);
  const r = (K * 2 * E_CHARGE * m[1] * E_CHARGE) / (MeV * MEV);
  return {
    prompt: `${K_NOTE} ${E_NOTE} ${ALPHA_NOTE} An alpha particle with a kinetic energy of ${q(MeV.toFixed(1), 'MeV')} ${MEV_NOTE} heads straight for a nucleus of ${m[0]}, which contains ${m[1]} protons. Find the closest distance that the alpha particle reaches from the centre of the nucleus. ${SCI_ASK}`,
    parts: [sciPart(r, 3, 'm')],
    hints: ['At the closest approach, all of the kinetic energy has become electric potential energy: $E_k = \\dfrac{kq_1q_2}{r}$', `The charges are $q_1 = 2e$ and $q_2 = ${m[1]}e$. Change the energy to joules first.`],
    solution: [`$E_k = ${MeV.toFixed(1)} \\times ${MEV_TEX} = ${sciTex(MeV * MEV)}$ J`, `$r = \\dfrac{kq_1q_2}{E_k} = \\dfrac{8.99 \\times 10^{9} \\times ${sciTex(2 * E_CHARGE)} \\times ${sciTex(m[1] * E_CHARGE)}}{${sciTex(MeV * MEV)}} = ${sciTex(r)}$ m`],
  };
}

function forceAtDistance(rng: Rng): GenOutput {
  const m = rng.pick(METALS);
  const d = sci(rng.float(1, 9.5, 1), -14, 1);
  const F = (K * 2 * E_CHARGE * m[1] * E_CHARGE) / (d.v * d.v);
  return {
    prompt: `${K_NOTE} ${E_NOTE} ${ALPHA_NOTE} An alpha particle is $${d.tex}\\ \\text{m}$ from the centre of a nucleus of ${m[0]}, which contains ${m[1]} protons. Find the size of the electric force on the alpha particle, to 2 decimal places.`,
    parts: [rounded(F, 2, 'N')],
    hints: ['Coulomb\'s law: $F = \\dfrac{kq_1q_2}{r^2}$', `The charges are $q_1 = 2e$ and $q_2 = ${m[1]}e$.`],
    solution: [`$F = \\dfrac{kq_1q_2}{r^2} = \\dfrac{8.99 \\times 10^{9} \\times ${sciTex(2 * E_CHARGE)} \\times ${sciTex(m[1] * E_CHARGE)}}{(${d.tex})^2} = ${num(F, 2)}$ N`, 'This is a very large force on a particle with so little mass.'],
  };
}

function speedApproach(rng: Rng): GenOutput {
  const m = rng.pick(METALS);
  const v = sci(rng.float(1.2, 2.2, 2), 7, 2);
  const Ek = 0.5 * ALPHA.m * v.v * v.v;
  const r = (K * 2 * E_CHARGE * m[1] * E_CHARGE) / Ek;
  return {
    prompt: `${K_NOTE} ${E_NOTE} An alpha particle has a mass of $${ALPHA.mTex}\\ \\text{kg}$ and a charge of $+2e$. It heads straight for a nucleus of ${m[0]}, which contains ${m[1]} protons, at a speed of $${v.tex}\\ \\text{m/s}$. Find its kinetic energy, and the closest distance it reaches from the centre of the nucleus. ${SCI_BOTH}`,
    parts: [sciPart(Ek, 3, 'J', 'Kinetic energy'), sciPart(r, 3, 'm', 'Closest distance')],
    hints: ['$E_k = \\dfrac{1}{2}mv^2$', 'At the closest approach, $E_k = \\dfrac{kq_1q_2}{r}$, so $r = \\dfrac{kq_1q_2}{E_k}$.'],
    solution: [`$E_k = \\dfrac{1}{2} \\times ${ALPHA.mTex} \\times (${v.tex})^2 = ${sciTex(Ek)}$ J`, `$r = \\dfrac{kq_1q_2}{E_k} = \\dfrac{8.99 \\times 10^{9} \\times ${sciTex(2 * E_CHARGE)} \\times ${sciTex(m[1] * E_CHARGE)}}{${sciTex(Ek)}} = ${sciTex(r)}$ m`],
  };
}

function energyToReach(rng: Rng): GenOutput {
  const m = rng.pick(METALS);
  const R = sci(rng.float(3, 9, 1), -15, 1);
  const E = (K * 2 * E_CHARGE * m[1] * E_CHARGE) / R.v;
  return {
    prompt: `${K_NOTE} ${E_NOTE} ${ALPHA_NOTE} How much kinetic energy must an alpha particle have, far from a nucleus of ${m[0]}, to come within $${R.tex}\\ \\text{m}$ of its centre in a head-on approach? The nucleus contains ${m[1]} protons. Give the energy in joules, in scientific notation to 3 significant digits, and in megaelectronvolts to 1 decimal place ${MEV_NOTE}.`,
    parts: [sciPart(E, 3, 'J', 'Energy in joules'), rounded(E / MEV, 1, 'MeV', 'Energy in megaelectronvolts')],
    hints: ['The kinetic energy must equal the electric potential energy at that distance: $E_k = \\dfrac{kq_1q_2}{r}$', 'To change joules to megaelectronvolts, divide by $1.60 \\times 10^{-13}$.'],
    solution: [`$E_k = \\dfrac{kq_1q_2}{r} = \\dfrac{8.99 \\times 10^{9} \\times ${sciTex(2 * E_CHARGE)} \\times ${sciTex(m[1] * E_CHARGE)}}{${R.tex}} = ${sciTex(E)}$ J`, `$\\dfrac{${sciTex(E)}}{${MEV_TEX}} = ${num(E / MEV, 1)}$ MeV`],
  };
}

function scaleModel(rng: Rng): GenOutput {
  const nucleus = sci(rng.float(2, 9.5, 1), -15, 1);
  const atom = sci(rng.float(1, 4, 1), -10, 1);
  const ball = rng.pick([1, 2, 4, 5]);
  const width = ((atom.v / nucleus.v) * ball) / 100;
  return {
    prompt: `The nucleus of an atom is about $${nucleus.tex}\\ \\text{m}$ across, and the whole atom is about $${atom.tex}\\ \\text{m}$ across. A teacher makes a scale model in which the nucleus is a ball ${q(ball, 'cm')} across. How wide would the whole atom be in the model? Give your answer in metres, to the nearest metre.`,
    parts: [rounded(width, 0, 'm')],
    hints: ['Find how many times wider the atom is than its nucleus.', 'The model atom is wider than the model nucleus by the same factor. Change centimetres to metres at the end.'],
    solution: [`The atom is $\\dfrac{${atom.tex}}{${nucleus.tex}} = ${num(atom.v / nucleus.v, 0)}$ times as wide as the nucleus`, `$${num(atom.v / nucleus.v, 0)} \\times ${ball}\\ \\text{cm} = ${num(width, 0)}$ m, to the nearest metre`],
  };
}

// ---------------------------------------------------------------------------- 4.3 the Bohr model

const HYD_NOTE = 'The energy levels of a hydrogen atom are $E_n = -\\dfrac{13.6}{n^2}$ eV.';
const level = (n: number) => -13.6 / (n * n);
const ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
const nm = (eV: number) => ((H * C) / (eV * EV)) * 1e9;

const BOHR_IDEAS: Q[] = [
  { q: 'In the Bohr model, what is special about the orbits of the electron?', a: 'Only certain orbits are allowed, each with a fixed energy', w: ['The electron can orbit at any distance from the nucleus', 'The electron does not move', 'Every orbit has the same energy'], why: 'Bohr assumed that the energy of the atom is quantized: it can have only certain values.' },
  { q: 'Which energy level of hydrogen has the lowest energy?', a: 'The level with $n = 1$, the ground state', w: ['The level with the largest $n$', 'The level with $n = 2$', 'All of the levels have the same energy'], why: '$E_1 = -13.6$ eV is the most negative, so it is the lowest.' },
  { q: 'The energy of a level of hydrogen is negative. What does this mean?', a: 'The electron is bound to the nucleus, and energy must be supplied to free it', w: ['The electron has negative mass', 'The electron is moving backwards', 'The atom has lost its electron'], why: 'A free electron at rest, far from the nucleus, has zero energy. A bound electron has less than that.' },
  { q: 'How much energy is needed to ionize a hydrogen atom from its ground state?', a: '13.6 eV', w: ['3.4 eV', '1.0 eV', '27.2 eV'], why: 'The electron must be lifted from $-13.6$ eV to zero.' },
  { q: 'An electron in hydrogen moves from $n = 1$ to $n = 3$. What must happen?', a: 'The atom absorbs energy equal to the difference between the two levels', w: ['The atom gives out a photon', 'Nothing: the levels have the same energy', 'The atom loses its electron'], why: 'A higher level has more energy, so the atom must take energy in.' },
  { q: 'As $n$ increases, what happens to the energy levels of hydrogen?', a: 'They get closer together, and approach zero', w: ['They get further apart', 'They are evenly spaced', 'They become more negative'], why: '$E_n = -\\dfrac{13.6}{n^2}$ eV: the values are $-13.6$, $-3.40$, $-1.51$, $-0.85$ and so on, closing in on zero.' },
];

function levelEnergy(rng: Rng): GenOutput {
  const n = rng.int(2, 9);
  return {
    prompt: `${HYD_NOTE} Find the energy of the level with $n = ${n}$, in electronvolts to 2 decimal places. Include the minus sign.`,
    parts: [rounded(level(n), 2, 'eV')],
    hints: ['Put the value of $n$ into the formula, and remember to square it.'],
    solution: [`$E_${n} = -\\dfrac{13.6}{${n}^2} = ${num(level(n), 2)}$ eV`],
  };
}

function ionization(rng: Rng): GenOutput {
  const n = rng.int(2, 9);
  return {
    prompt: `${HYD_NOTE} The electron of a hydrogen atom is in the level with $n = ${n}$. How much energy must the atom absorb for the electron to escape completely? Give your answer in electronvolts, to 2 decimal places.`,
    parts: [rounded(-level(n), 2, 'eV')],
    hints: ['A free electron has zero energy, so the atom must absorb enough to bring its energy up to zero.'],
    solution: [`$E_${n} = -\\dfrac{13.6}{${n}^2} = ${num(level(n), 2)}$ eV`, `The atom must absorb ${num(-level(n), 2)} eV`],
  };
}

function orbitRadius(rng: Rng): GenOutput {
  const n = rng.int(2, 9);
  const r = n * n * 5.29e-11;
  return {
    prompt: `In the Bohr model of hydrogen, the radius of the orbit with number $n$ is $r_n = n^2 r_1$, where $r_1 = 5.29 \\times 10^{-11}\\ \\text{m}$. Find the radius of the orbit with $n = ${n}$. ${SCI_ASK}`,
    parts: [sciPart(r, 3, 'm')],
    hints: ['Square the number of the orbit, then multiply by the radius of the first orbit.'],
    solution: [`$r_${n} = ${n}^2 \\times 5.29 \\times 10^{-11} = ${sciTex(r)}$ m`],
  };
}

/** A pair of levels that an electron can move between: the lower is 1, 2 or 3. */
function pair(rng: Rng, top: number): { lo: number; hi: number } {
  const lo = rng.int(1, 3);
  return { lo, hi: rng.int(lo + 1, top) };
}

function transitionPhoton(rng: Rng): GenOutput {
  const { lo, hi } = pair(rng, 7);
  const absorb = rng.chance(0.4);
  const dE = level(hi) - level(lo);
  const wave = nm(dE);
  return {
    prompt: `${HYD_NOTE} ${H_NOTE} ${C_NOTE} ${EV_NOTE} ${absorb ? `A hydrogen atom absorbs a photon, and its electron jumps from $n = ${lo}$ to $n = ${hi}$` : `The electron of a hydrogen atom drops from $n = ${hi}$ to $n = ${lo}$, and the atom gives out a photon`}. Find the energy of the photon, in electronvolts to 2 decimal places, and its wavelength, to the nearest nanometre ${NM_NOTE}.`,
    parts: [rounded(dE, 2, 'eV', 'Photon energy'), rounded(wave, 0, 'nm', 'Wavelength')],
    hints: ['The energy of the photon is the difference between the energies of the two levels.', 'Change the energy to joules, then use $\\lambda = \\dfrac{hc}{E}$.'],
    solution: [
      `$E_${hi} = ${num(level(hi), 3)}$ eV and $E_${lo} = ${num(level(lo), 3)}$ eV`,
      `Photon energy $= ${num(level(hi), 3)} - (${num(level(lo), 3)}) = ${num(dE, 2)}$ eV, which is $${sciTex(dE * EV)}$ J`,
      `$\\lambda = \\dfrac{hc}{E} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${sciTex(dE * EV)}} = ${sciTex(wave * 1e-9)}$ m, which is ${num(wave, 0)} nm`,
    ],
  };
}

function transitionFrequency(rng: Rng): GenOutput {
  const { lo, hi } = pair(rng, 7);
  const dE = (level(hi) - level(lo)) * EV;
  const f = dE / H;
  return {
    prompt: `${HYD_NOTE} ${H_NOTE} ${EV_NOTE} The electron of a hydrogen atom drops from the ${ORD[hi]} level to the ${ORD[lo]} level. Find the energy of the photon that the atom gives out, in joules, and the frequency of the photon. ${SCI_BOTH}`,
    parts: [sciPart(dE, 3, 'J', 'Photon energy'), sciPart(f, 3, 'Hz', 'Frequency')],
    hints: ['Find the two level energies in electronvolts, subtract, and change the difference to joules.', 'A photon of energy $E$ has a frequency $f = \\dfrac{E}{h}$.'],
    solution: [
      `$E_${hi} - E_${lo} = ${num(level(hi), 3)} - (${num(level(lo), 3)}) = ${num(level(hi) - level(lo), 3)}$ eV`,
      `$${num(level(hi) - level(lo), 3)} \\times ${EV_TEX} = ${sciTex(dE)}$ J`,
      `$f = \\dfrac{E}{h} = \\dfrac{${sciTex(dE)}}{${H_TEX}} = ${sciTex(f)}$ Hz`,
    ],
  };
}

function findLevel(rng: Rng): GenOutput {
  const { lo, hi } = pair(rng, 6);
  const photon = Math.round((level(hi) - level(lo)) * 100) / 100;
  const after = level(lo) + photon;
  return {
    prompt: `${HYD_NOTE} A hydrogen atom with its electron in the level $n = ${lo}$ absorbs a photon with an energy of ${q(photon.toFixed(2), 'eV')}. Which level does the electron reach? Give the value of $n$.`,
    parts: [numPart(hi, { label: 'n' })],
    hints: ['Add the energy of the photon to the energy of the starting level.', 'Then solve $-\\dfrac{13.6}{n^2}$ = the new energy for $n$, and take the nearest whole number.'],
    solution: [`$E_${lo} = ${num(level(lo), 3)}$ eV, so the new energy is $${num(level(lo), 3)} + ${photon.toFixed(2)} = ${num(after, 3)}$ eV`, `$n^2 = \\dfrac{13.6}{${num(-after, 3)}} = ${num(13.6 / -after, 2)}$, so $n = ${hi}$`],
  };
}

function otherAtom(rng: Rng): GenOutput {
  const levels = [-rng.float(8, 12, 1), -rng.float(4.5, 6.5, 1), -rng.float(2.5, 3.9, 1), -rng.float(0.8, 1.9, 1)];
  const lo = rng.int(0, 2);
  const hi = rng.int(lo + 1, 3);
  const dE = Math.round((levels[hi] - levels[lo]) * 10) / 10;
  const wave = nm(dE);
  const list = levels.map((e) => `$${e.toFixed(1)}$`).join(', ');
  return {
    prompt: `${H_NOTE} ${C_NOTE} ${EV_NOTE} The four lowest energy levels of an atom are at ${list} eV. An electron drops from the ${q(levels[hi].toFixed(1), 'eV')} level to the ${q(levels[lo].toFixed(1), 'eV')} level. Find the energy of the photon that is given out, in electronvolts to 1 decimal place, and its wavelength, to the nearest nanometre ${NM_NOTE}.`,
    parts: [rounded(dE, 1, 'eV', 'Photon energy'), rounded(wave, 0, 'nm', 'Wavelength')],
    hints: ['The energy of the photon is the difference between the two levels.', 'Change the energy to joules, then use $\\lambda = \\dfrac{hc}{E}$.'],
    solution: [
      `Photon energy $= ${levels[hi].toFixed(1)} - (${levels[lo].toFixed(1)}) = ${dE.toFixed(1)}$ eV, which is $${sciTex(dE * EV)}$ J`,
      `$\\lambda = \\dfrac{hc}{E} = \\dfrac{${H_TEX} \\times ${C_TEX}}{${sciTex(dE * EV)}} = ${sciTex(wave * 1e-9)}$ m, which is ${num(wave, 0)} nm`,
    ],
  };
}

function lineCount(rng: Rng): GenOutput {
  const n = rng.int(3, 6);
  const lines = (n * (n - 1)) / 2;
  const top = level(n) - level(1);
  return {
    prompt: `${HYD_NOTE} The atoms of a sample of hydrogen gas are excited to the level $n = ${n}$. The electrons then drop back to the ground state, in one step or in several. How many different photon energies can the gas give out, and what is the largest of them, in electronvolts to 2 decimal places?`,
    parts: [numPart(lines, { label: 'Number of different photon energies' }), rounded(top, 2, 'eV', 'Largest photon energy')],
    hints: ['Count every pair of levels from 1 up to the top one: each pair gives one photon energy.', 'The largest photon comes from the largest drop, straight to the ground state.'],
    solution: [`There are ${n} levels, and each pair gives one line: $\\dfrac{${n} \\times ${n - 1}}{2} = ${lines}$`, `The largest drop is from $n = ${n}$ to $n = 1$: $${num(level(n), 3)} - (-13.6) = ${num(top, 2)}$ eV`],
  };
}

const SPECTRA_1: Q[] = [
  { q: 'A hot solid, such as the filament of a lamp, gives out light. What kind of spectrum does it give?', a: 'A continuous spectrum, with every colour', w: ['A few bright lines', 'Dark lines on a black background', 'Only one colour'], why: 'The atoms of a hot solid are packed so closely that their energy levels blur into bands, so every wavelength is given out.' },
  { q: 'A glowing gas at low pressure, such as the neon in a sign, gives out light. What does its spectrum look like?', a: 'A few bright lines of certain colours on a dark background', w: ['A full rainbow of colours', 'A rainbow crossed by dark lines', 'A single white line'], why: 'This is an emission line spectrum. Each line is one wavelength that the atoms of the gas can give out.' },
  { q: 'White light passes through a cool gas. What does the spectrum of the light look like afterwards?', a: 'A continuous spectrum crossed by dark lines', w: ['A few bright lines on a dark background', 'A continuous spectrum with no change', 'Complete darkness'], why: 'This is an absorption spectrum. The gas takes out the wavelengths that its atoms can absorb.' },
  { q: 'Why can a line spectrum be used to identify an element?', a: 'Each element has its own set of lines, like a fingerprint', w: ['Every element gives the same lines', 'The lines depend only on the temperature', 'Only hydrogen gives lines'], why: 'The lines come from the energy levels of the atom, and each element has its own levels.' },
  { q: 'In the Bohr model, when does an atom give out a photon?', a: 'When an electron drops from a higher energy level to a lower one', w: ['When an electron jumps to a higher level', 'Whenever an electron moves round its orbit', 'When the nucleus splits'], why: 'The atom loses energy, and the photon carries it away.' },
  { q: 'What is the ground state of an atom?', a: 'Its lowest energy level', w: ['Its highest energy level', 'The state in which it has lost an electron', 'The state in which it is at rest on the ground'], why: 'An atom is normally in its ground state. When it has more energy than that, it is in an excited state.' },
  { q: 'What does it mean to say that the energy of an atom is quantized?', a: 'The atom can have only certain energies, and none in between', w: ['The atom can have any energy', 'The energy of the atom is always zero', 'The atom is always losing energy'], why: 'The allowed energies are the energy levels of the atom.' },
];

const SPECTRA_2: Q[] = [
  { q: 'An electron drops from one energy level to a lower one. What is the energy of the photon that is given out?', a: 'The difference between the energies of the two levels', w: ['The energy of the higher level', 'The energy of the lower level', 'The sum of the energies of the two levels'], why: 'Energy is conserved: $hf = E_{\\text{upper}} - E_{\\text{lower}}$.' },
  { q: 'The dark lines in the absorption spectrum of a gas are at the same wavelengths as the bright lines in its emission spectrum. Why?', a: 'The atoms absorb photons with exactly the energies that they can give out', w: ['The gas blocks all of the light', 'The dark lines are shadows of the atoms', 'It is a coincidence'], why: 'A jump up between two levels needs the same energy that the drop back down releases.' },
  { q: 'The visible lines of hydrogen, called the Balmer series, come from electrons that drop to which level?', a: 'The second level, $n = 2$', w: ['The ground state, $n = 1$', 'The third level, $n = 3$', 'Any level'], why: 'Drops to $n = 2$ release between 1.9 eV and 3.4 eV, and the lowest of these are photons of visible light.' },
  { q: 'Hydrogen lines from electrons that drop to the ground state, $n = 1$, are in which part of the spectrum?', a: 'Ultraviolet', w: ['Visible light', 'Infrared', 'Radio waves'], why: 'These drops release at least 10.2 eV, far more than a photon of visible light carries.' },
  { q: 'What is an atom called when it has lost an electron completely?', a: 'An ion: the atom has been ionized', w: ['An isotope', 'An excited atom', 'A photon'], why: 'The energy needed to remove the electron is the ionization energy.' },
  { q: 'A photon has a little less energy than the gap between the ground state and the next level of an atom. What happens when it meets the atom?', a: 'It is not absorbed: the atom can only absorb a photon that matches a gap between its levels', w: ['It is absorbed, and the atom keeps part of the gap', 'It is absorbed, and the electron stops between two levels', 'It splits into two photons'], why: 'An electron cannot stop between two levels, so the whole photon must match a gap.' },
  { q: 'How do astronomers know which elements are in the outer layers of the Sun?', a: 'From the dark lines in the spectrum of sunlight', w: ['From the brightness of the Sun', 'From samples brought back by spacecraft', 'From the colour of the sky'], why: 'Each set of dark lines matches the absorption spectrum of one element.' },
  { q: 'The energy levels of an atom are negative. What does a negative energy mean?', a: 'The electron is bound to the atom, and energy must be supplied to free it', w: ['The electron has a negative mass', 'The atom is giving out light', 'The electron has left the atom'], why: 'Zero energy is the energy of an electron that has just escaped.' },
];

const SPECTRA_3: Q[] = [
  { q: 'Which of these did Bohr assume?', a: 'An electron in an allowed orbit does not radiate energy', w: ['An electron can orbit at any distance from the nucleus', 'Electrons spiral slowly into the nucleus', 'The positive charge is spread through the whole atom'], why: 'This broke the rules of Maxwell\'s theory, but it explained why atoms are stable and why spectra have sharp lines.' },
  { q: 'How did de Broglie\'s matter waves explain Bohr\'s allowed orbits?', a: 'A whole number of electron wavelengths must fit round the orbit, like a standing wave', w: ['The electron stops moving in an allowed orbit', 'The electron has no wavelength in an allowed orbit', 'The orbit must be one wavelength from the nucleus'], why: 'A wave that does not join up with itself round the orbit cancels itself, so only certain orbits can exist.' },
  { q: 'What was a weakness of the Bohr model?', a: 'It gave the right spectrum only for hydrogen and for ions with a single electron', w: ['It could not explain the spectrum of hydrogen', 'It had no nucleus', 'It made atoms unstable'], why: 'For atoms with more than one electron its predictions do not match the measured lines.' },
  { q: 'In the quantum mechanical model that replaced Bohr\'s, how is the electron described?', a: 'By a wave that gives the chance of finding the electron at each place', w: ['As a tiny planet in a fixed circular orbit', 'As a particle at rest beside the nucleus', 'As a ball of positive charge'], why: 'The electron has no definite path. The model gives regions, called orbitals, where it is likely to be found.' },
  { q: 'The gaps between the energy levels of hydrogen get smaller as $n$ gets larger. What does this mean for the lines of one series in its spectrum?', a: 'They crowd closer together towards the short-wavelength end', w: ['They are evenly spaced', 'They spread further apart towards the short-wavelength end', 'There is only one line in each series'], why: 'Drops from higher and higher levels release energies that differ less and less.' },
  { q: 'An electron in hydrogen drops from $n = 4$ to $n = 2$ in one step. Another drops from $n = 4$ to $n = 3$ and then to $n = 2$. How do the photon energies compare?', a: 'The two smaller photons together have the same energy as the single photon', w: ['The single photon has more energy than the two together', 'The single photon has less energy than the two together', 'All three photons have the same energy'], why: 'The total drop in energy is the same by either route.' },
  { q: 'A hydrogen atom in its ground state absorbs a photon with more than 13.6 eV of energy. What can happen?', a: 'The electron is freed, and carries off the extra energy as kinetic energy', w: ['Nothing: the photon cannot be absorbed', 'The electron stops between two levels', 'The nucleus splits'], why: 'A free electron can have any kinetic energy, so any photon above the ionization energy can be absorbed.' },
  { q: 'Which of these transitions in hydrogen gives out the photon with the longest wavelength?', a: 'From $n = 4$ to $n = 3$', w: ['From $n = 2$ to $n = 1$', 'From $n = 3$ to $n = 2$', 'From $n = 4$ to $n = 1$'], why: 'The longest wavelength goes with the smallest energy, and the gap from 4 to 3 is the smallest of these.' },
];

export const ATOM_SKILLS: SkillDef[] = [
  skill({ id: 'p30-cathode-rays', name: 'Cathode rays and the electron', description: 'Describe cathode rays, the evidence that they are negative particles, and what Thomson concluded from them.', outcomes: ['30-D1'], lessonId: L(1), format: 'mc', gen: bank([CATHODE_1, CATHODE_2, CATHODE_3], ['Cathode rays are streams of electrons: negative particles, far lighter than atoms, that come out of every material.']) }),
  skill({ id: 'p30-charge-mass', name: 'The charge-to-mass ratio', description: 'Use balanced electric and magnetic forces and the circular path of a beam to find the speed and the charge-to-mass ratio of its particles.', outcomes: ['30-D1'], lessonId: L(1), calculator: true, gen: bank([either(speedFromFields, ratioFromCircle), either(thomson, identifyParticle), either(massFromRatio, acceleratedRatio)], ['In crossed fields $v = \\dfrac{E}{B}$, and in a magnetic field alone $\\dfrac{q}{m} = \\dfrac{v}{Br}$']) }),
  skill({ id: 'p30-rutherford', name: 'Rutherford\'s scattering experiment', description: 'Describe the gold foil experiment, and explain what its results show about the nucleus.', outcomes: ['30-D1'], lessonId: L(2), format: 'mc', gen: bank([RUTHERFORD_1, RUTHERFORD_2, RUTHERFORD_3], ['Most alpha particles went straight through, so the atom is mostly empty. A few bounced back, so the nucleus is small, massive and positive.']) }),
  skill({ id: 'p30-closest-approach', name: 'An alpha particle near a nucleus', description: 'Find the charge of a nucleus, the force on an alpha particle near it, and the closest approach of an alpha particle from its kinetic energy.', outcomes: ['30-D1'], lessonId: L(2), calculator: true, gen: bank([either(nuclearCharge, alphaJoules), either(closestApproach, forceAtDistance), either(speedApproach, energyToReach, scaleModel)], ['At the closest approach, the kinetic energy has all become electric potential energy: $E_k = \\dfrac{kq_1q_2}{r}$']) }),
  skill({ id: 'p30-energy-levels', name: 'The energy levels of hydrogen', description: 'Use the energy levels of the Bohr model to find the energy, wavelength and frequency of the photons that an atom gives out or absorbs.', outcomes: ['30-D1'], lessonId: L(3), calculator: true, gen: bank([either(levelEnergy, ionization, orbitRadius, fromBank(BOHR_IDEAS, ['The energy of an atom is quantized: only certain levels are allowed, and the lowest is the ground state.'])), either(transitionPhoton, transitionFrequency), either(findLevel, otherAtom, lineCount)], ['The energy of the photon is the difference between the two levels: $hf = E_{\\text{upper}} - E_{\\text{lower}}$']) }),
  skill({ id: 'p30-spectra', name: 'Spectra and the Bohr model', description: 'Tell continuous, emission and absorption spectra apart, and explain line spectra with the energy levels of the atom.', outcomes: ['30-D1'], lessonId: L(3), format: 'mc', gen: bank([SPECTRA_1, SPECTRA_2, SPECTRA_3], ['Each line of a spectrum is a photon whose energy equals the gap between two energy levels of the atom.']) }),
];

// Shared with the nuclear questions of lessons 4.4 to 4.7.
export { MEV, MEV_NOTE, MEV_TEX, sig };
