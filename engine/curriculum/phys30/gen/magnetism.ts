/**
 * Grade 12 Physics, Unit 2, lessons 2.7 to 2.10: magnetic fields and forces, and electromagnetic
 * induction (30-B3). Magnets and the fields of currents, the force on a moving charge and the
 * circle it follows, the force on a current-carrying wire and the motor it drives, and the emf
 * induced by a changing field, with generators and transformers. Every constant a question needs
 * is in the question. Directions use the right hand for positive charges and for conventional
 * current.
 */
import { mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
// The question-bank helper was written for junior chemistry; it is not about chemistry.
import { bank, either, fromBank, num, q, type Q } from '../../chemjr/bank.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { ELECTRON, G, PARTICLES, PROTON, RAD, SCI_ASK, SCI_BOTH, an, clean, facts, ohm, rounded, sci, sciPart, sciTex, type Particle, type Sci } from './common.ts';

const L = (n: number) => `p30-2-${n}`;
const G_NOTE = 'Use $g = 9.81\\ \\text{m/s}^2$.';
const MU_NOTE = 'Use $\\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T·m/A}$.';
const MU = 4 * Math.PI * 1e-7;
const AP = (p: Particle) => `${p.name === 'proton' ? 'A' : 'An'} ${p.name}`;
/** True when a value has at most three decimal places, so it can be typed exactly. */
const threeDp = (x: number) => Number.isInteger(clean(x * 1000));

// ---------------------------------------------------------------------------- directions in three dimensions

interface Dir {
  axis: 0 | 1 | 2;
  sign: 1 | -1;
}
const DIR_NAMES = [['east', 'west'], ['north', 'south'], ['straight up', 'straight down']];
const dirName = (d: Dir) => DIR_NAMES[d.axis][d.sign > 0 ? 0 : 1];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const flip = (d: Dir): Dir => ({ axis: d.axis, sign: d.sign > 0 ? -1 : 1 });
/** The direction of a × b for two directions along different axes: east × north is up. */
function cross(a: Dir, b: Dir): Dir {
  const axis = (3 - a.axis - b.axis) as 0 | 1 | 2;
  const cyclic = (b.axis - a.axis + 3) % 3 === 1;
  return { axis, sign: (a.sign * b.sign * (cyclic ? 1 : -1)) as 1 | -1 };
}
/** Two directions at right angles. */
function twoDirs(rng: Rng): [Dir, Dir] {
  const [i, j] = rng.sample([0, 1, 2], 2) as Array<0 | 1 | 2>;
  return [{ axis: i, sign: rng.sign() }, { axis: j, sign: rng.sign() }];
}

// ---------------------------------------------------------------------------- 2.7 magnets and magnetic fields

const MAGNET_1: Q[] = [
  { q: 'The north poles of two bar magnets are brought close together. What do they do?', a: 'They repel each other', w: ['They attract each other', 'They exert no force on each other', 'They attract and then repel'], why: 'Like poles repel, and unlike poles attract.' },
  { q: 'Which way do magnetic field lines point outside a bar magnet?', a: 'From the north pole round to the south pole', w: ['From the south pole round to the north pole', 'Straight out from both poles', 'In circles round the middle of the magnet'], why: 'The field points the way the north pole of a compass would point: away from a north pole and towards a south pole.' },
  { q: 'A bar magnet is cut in half. What is each half?', a: 'A complete magnet, with a north pole and a south pole', w: ['One half is a north pole and the other is a south pole', 'Neither half is magnetic', 'Each half has two north poles'], why: 'Poles always come in pairs. However small the piece, it has a north pole and a south pole.' },
  { q: 'Where is the magnetic field of a bar magnet strongest?', a: 'Near its poles', w: ['Near its middle', 'It is the same everywhere', 'Far from the magnet'], why: 'The field lines are closest together at the poles, and close lines show a strong field.' },
  { q: 'Which of these metals is strongly attracted to a magnet?', a: 'Iron', w: ['Copper', 'Aluminium', 'Gold'], why: 'Iron, nickel and cobalt are the common ferromagnetic metals. Copper, aluminium and gold are not.' },
  { q: 'What does the needle of a compass show?', a: 'The direction of the magnetic field where the compass is', w: ['The direction of the nearest electric charge', 'The direction of the force of gravity', 'The strength of the magnetic field'], why: 'A compass needle is a small magnet that turns to line up with the field, its north pole pointing along the field.' },
  { q: 'What is the SI unit of magnetic field strength?', a: 'The tesla (T)', w: ['The newton (N)', 'The coulomb (C)', 'The volt (V)'], why: 'Magnetic field strength is measured in teslas. The field of the Earth is about 0.00005 T at the surface.' },
];

const MAGNET_2: Q[] = [
  { q: 'The north pole of a compass needle points towards the geographic north of the Earth. What does this say about the Earth’s magnetism?', a: 'There is a magnetic south pole near the geographic north pole', w: ['There is a magnetic north pole near the geographic north pole', 'The Earth has no magnetic poles', 'The needle is pulled by the gravity of the Earth'], why: 'Unlike poles attract. The north pole of the needle is pulled towards a magnetic south pole, which lies near the geographic north.' },
  { q: 'A bar of iron is made of tiny regions called domains, each of which is a small magnet. Why is an ordinary bar of iron not a magnet?', a: 'Its domains point in all directions, so their fields cancel', w: ['It has no domains', 'Its domains have no magnetic field', 'All of its domains point the same way'], why: 'In unmagnetized iron the domains are jumbled. Lining them up makes the bar a magnet.' },
  { q: 'What happens to the domains of an iron bar when it is magnetized?', a: 'More of them line up in the same direction', w: ['They are destroyed', 'New domains are created', 'They start to move through the bar'], why: 'An outside field turns the domains to point one way, so their fields add.' },
  { q: 'Which of these weakens a permanent magnet?', a: 'Heating it strongly or hammering it', w: ['Leaving it near a piece of copper', 'Cooling it', 'Painting it'], why: 'Heat and shocks shake the domains out of line, so their fields no longer add.' },
  { q: 'The north pole of one magnet faces the south pole of another, a short distance away. What is the field in the gap like?', a: 'It runs straight across from the north pole to the south pole, and is nearly uniform', w: ['It is zero in the middle of the gap', 'It runs straight across from the south pole to the north pole', 'It runs in circles round the gap'], why: 'Field lines leave a north pole and enter a south pole. Between flat facing poles they are straight and evenly spaced.' },
  { q: 'The north poles of two identical magnets face each other. What is the field at the point halfway between them?', a: 'Zero, because the two fields there are equal and opposite', w: ['Twice the field of one magnet', 'The same as the field of one magnet', 'Directed from one north pole to the other'], why: 'The fields of the two north poles point in opposite directions at the midpoint and cancel. It is called a neutral point.' },
  { q: 'A steel paper clip is attracted to the north pole of a magnet, and also to the south pole. Why?', a: 'The magnet makes the clip a temporary magnet, with the unlike pole nearest to it', w: ['The clip has two south poles', 'The clip carries an electric charge', 'Steel is attracted to every object'], why: 'The field lines up the domains of the clip. This induced magnetism always gives attraction.' },
];

const MAGNET_3: Q[] = [
  { q: 'Which way do the magnetic field lines run inside a bar magnet?', a: 'From the south pole to the north pole, so that each line is a closed loop', w: ['From the north pole to the south pole', 'There is no field inside a magnet', 'Across the magnet, from one side to the other'], why: 'Magnetic field lines have no beginning and no end. Outside the magnet they run from north to south, and inside they run back from south to north.' },
  { q: 'How do magnetic field lines differ from electric field lines?', a: 'Magnetic field lines are closed loops, but electric field lines begin and end on charges', w: ['Magnetic field lines can cross, but electric field lines cannot', 'Magnetic field lines show a force, but electric field lines do not', 'There is no difference'], why: 'There is no single magnetic pole for a line to begin or end on, so every magnetic field line closes on itself.' },
  { q: 'Soft iron is used for the core of an electromagnet, and steel for a permanent magnet. Why?', a: 'Soft iron loses its magnetism as soon as the current stops, and steel keeps it', w: ['Soft iron cannot be magnetized, and steel can', 'Soft iron is a better conductor than steel', 'Steel loses its magnetism as soon as the current stops, and soft iron keeps it'], why: 'The domains of soft iron turn easily and fall out of line when the field is removed. Those of steel stay lined up.' },
  { q: 'On which of these does a magnetic field exert a force?', a: 'A charge that moves across the field', w: ['Any charge, moving or at rest', 'Any mass', 'A charge at rest only'], why: 'An electric field acts on any charge. A magnetic field acts only on a charge that is moving, and not along the field.' },
  { q: 'Charged particles from the Sun reach the Earth. Why do most of them arrive near the poles, where they cause the aurora?', a: 'The Earth’s magnetic field makes them spiral along its field lines, which come down near the poles', w: ['The poles are closer to the Sun', 'The gravity of the Earth is stronger at the poles', 'The particles are attracted to the ice'], why: 'A moving charge is pushed sideways by a magnetic field, so it winds round the field lines and follows them to the polar regions.' },
  { q: 'Gravitational, electric and magnetic fields are compared. Which statement is correct?', a: 'Masses always attract, but charges and magnetic poles can attract or repel', w: ['All three kinds of field can only attract', 'All three kinds of field can attract or repel', 'Charges always attract, but masses can attract or repel'], why: 'There is one kind of mass, so gravity only attracts. There are two kinds of charge and two kinds of pole, so those forces can go either way.' },
];

// ---------------------------------------------------------------------------- 2.7 the field of a current

const CURRENT_FIELD_IDEAS: Q[] = [
  { q: 'Oersted found that a compass needle near a wire turns when a current is switched on in the wire. What does this show?', a: 'An electric current produces a magnetic field', w: ['A magnetic field produces an electric current', 'A wire is a permanent magnet', 'A compass needle carries a charge'], why: 'Moving charges make a magnetic field around them. This was the first link found between electricity and magnetism.' },
  { q: 'What is the shape of the magnetic field lines round a long straight wire that carries a current?', a: 'Circles centred on the wire', w: ['Straight lines parallel to the wire', 'Straight lines pointing away from the wire', 'Loops from one end of the wire to the other'], why: 'The field circles the wire, and it is weaker further from the wire.' },
  { q: 'The right-hand rule gives the direction of the field round a straight wire. What do the thumb and the fingers show?', a: 'The thumb points along the conventional current, and the curled fingers show the field', w: ['The thumb shows the field, and the fingers point along the current', 'The thumb points along the electron flow, and the fingers show the field', 'The thumb shows the force, and the fingers show the field'], why: 'Grip the wire with the right hand, thumb along the conventional current: the fingers curl the way the field circles.' },
  { q: 'The current in a straight wire is reversed. What happens to the magnetic field round it?', a: 'It circles the wire in the opposite direction', w: ['It disappears', 'It stays the same', 'It becomes twice as strong'], why: 'The direction of the field follows the direction of the current.' },
  { q: 'A wire carries a conventional current straight up through a horizontal table. Seen from above, which way does the magnetic field circle the wire?', a: 'Anticlockwise', w: ['Clockwise', 'Straight up', 'Outwards from the wire'], why: 'Point the right thumb up, towards the viewer above: the fingers curl anticlockwise.' },
  { q: 'What does the magnetic field of a solenoid, a long coil that carries a current, look like?', a: 'The field of a bar magnet, with a north pole at one end and a south pole at the other', w: ['Circles centred on the middle of the coil', 'The field of a single north pole', 'It has no field outside the coil'], why: 'Inside the coil the field is strong and nearly uniform, and outside it loops round from one end to the other like that of a bar magnet.' },
  { q: 'Which change does not make an electromagnet stronger?', a: 'Using thicker insulation on the wire', w: ['Increasing the current', 'Winding more turns on the coil', 'Putting a soft iron core inside the coil'], why: 'The field depends on the current, the number of turns for each metre and the core. The insulation makes no difference.' },
];

function wireField(rng: Rng): GenOutput {
  const I = rng.pick([2, 5, 8, 10, 15, 20, 30]);
  const r = rng.pick([1, 2, 4, 5, 8, 10, 20]);
  const B = (MU * I) / (2 * Math.PI * (r / 100));
  return {
    prompt: `${MU_NOTE} A long straight wire carries a current of ${q(I, 'A')}. Find the magnetic field strength ${q(r, 'cm')} from the wire. ${SCI_ASK}`,
    parts: [sciPart(B, 3, 'T')],
    hints: ['The field of a long straight wire: $B = \\dfrac{\\mu_0 I}{2\\pi r}$', 'Change the centimetres to metres.'],
    solution: [`$B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{4\\pi \\times 10^{-7} \\times ${I}}{2\\pi \\times ${clean(r / 100)}} = ${sciTex(B)}$ T`],
  };
}

function wireFieldCurrent(rng: Rng): GenOutput {
  const I0 = rng.pick([2.5, 4, 6, 7.5, 12, 16, 25]);
  const r = rng.pick([1, 2, 4, 5, 8, 10]);
  const B = Number(((MU * I0) / (2 * Math.PI * (r / 100))).toPrecision(3));
  const I = (B * 2 * Math.PI * (r / 100)) / MU;
  return {
    prompt: `${MU_NOTE} The magnetic field strength ${q(r, 'cm')} from a long straight wire is $${sciTex(B)}\\ \\text{T}$. What is the current in the wire? Give your answer to 2 decimal places.`,
    parts: [rounded(I, 2, 'A')],
    hints: ['Rearrange $B = \\dfrac{\\mu_0 I}{2\\pi r}$ for the current: $I = \\dfrac{2\\pi rB}{\\mu_0}$.', 'Change the centimetres to metres.'],
    solution: [`$I = \\dfrac{2\\pi rB}{\\mu_0} = \\dfrac{2\\pi \\times ${clean(r / 100)} \\times ${sciTex(B)}}{4\\pi \\times 10^{-7}} = ${num(I, 2)}$ A`],
  };
}

function solenoidField(rng: Rng): GenOutput {
  const N = rng.pick([200, 400, 500, 800, 1000, 1200]);
  const len = rng.pick([10, 20, 25, 40, 50]);
  const I = rng.pick([0.5, 1, 1.5, 2, 3, 5]);
  const B = (MU * N * I) / (len / 100);
  return {
    prompt: `${MU_NOTE} A solenoid has ${N} turns along a length of ${q(len, 'cm')}, and carries a current of ${q(I, 'A')}. Find the magnetic field strength inside it. ${SCI_ASK}`,
    parts: [sciPart(B, 3, 'T')],
    hints: ['Inside a long solenoid: $B = \\dfrac{\\mu_0 NI}{L}$, where $N$ is the number of turns and $L$ is the length of the coil.', 'Change the centimetres to metres.'],
    solution: [`$B = \\dfrac{\\mu_0 NI}{L} = \\dfrac{4\\pi \\times 10^{-7} \\times ${N} \\times ${I}}{${clean(len / 100)}} = ${sciTex(B)}$ T`],
  };
}

// ---------------------------------------------------------------------------- 2.8 the force on a moving charge

/** A speed that suits a particle, well below the speed of light. */
function speed(rng: Rng, p: Particle): Sci {
  if (p === ELECTRON) return rng.chance(0.5) ? sci(rng.float(1.2, 9.5, 1), 6) : sci(rng.float(1, 3, 1), 7);
  return sci(rng.float(1.2, 9.5, 1), rng.pick([5, 6]));
}
/** A field that turns a particle in a circle of laboratory size: milliteslas for an electron. */
function fieldFor(rng: Rng, p: Particle): { v: number; text: string; tex: string } {
  if (p === ELECTRON) {
    const mT = rng.pick([0.5, 0.8, 1.2, 2, 2.5, 4, 5]);
    return { v: mT / 1000, text: q(mT, 'mT'), tex: `${mT} \\times 10^{-3}` };
  }
  const T = rng.pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.8, 1.2]);
  return { v: T, text: q(T, 'T'), tex: String(T) };
}
const TESLAS = [0.02, 0.05, 0.1, 0.25, 0.4, 0.8, 1.2];

function forceOnCharge(rng: Rng): GenOutput {
  const p = rng.pick(PARTICLES);
  const v = speed(rng, p);
  const B = rng.pick(TESLAS);
  const F = p.q * v.v * B;
  return {
    prompt: `${facts(p, false)} The ${p.name} moves at $${v.tex}\\ \\text{m/s}$ at right angles to a magnetic field of ${q(B, 'T')}. Find the size of the magnetic force on it. ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['For a charge that moves at right angles to a magnetic field: $F = qvB$'],
    solution: [`$F = qvB = ${p.qTex} \\times ${v.tex} \\times ${B} = ${sciTex(F)}$ N`],
  };
}

function forceAngle(rng: Rng): GenOutput {
  const p = rng.pick(PARTICLES);
  const v = speed(rng, p);
  const B = rng.pick(TESLAS);
  const angle = rng.pick([20, 30, 40, 45, 50, 60, 70]);
  const F = p.q * v.v * B * Math.sin(angle * RAD);
  return {
    prompt: `${facts(p, false)} The ${p.name} moves at $${v.tex}\\ \\text{m/s}$ through a magnetic field of ${q(B, 'T')}. Its velocity makes an angle of ${angle}° with the field. Find the size of the magnetic force on it. ${SCI_ASK}`,
    parts: [sciPart(F, 3, 'N')],
    hints: ['Only the part of the velocity that is at right angles to the field counts: $F = qvB\\sin\\theta$'],
    solution: [`$F = qvB\\sin\\theta = ${p.qTex} \\times ${v.tex} \\times ${B} \\times \\sin ${angle}° = ${sciTex(F)}$ N`],
  };
}

function fieldFromForce(rng: Rng): GenOutput {
  const p = rng.pick(PARTICLES);
  const v = speed(rng, p);
  const B0 = rng.pick([0.05, 0.08, 0.12, 0.15, 0.25, 0.35, 0.6, 0.9]);
  const F = Number((p.q * v.v * B0).toPrecision(3));
  const B = F / (p.q * v.v);
  return {
    prompt: `${facts(p, false)} The ${p.name} moves at $${v.tex}\\ \\text{m/s}$ at right angles to a magnetic field, and feels a magnetic force of $${sciTex(F)}\\ \\text{N}$. Find the magnetic field strength, to 3 decimal places.`,
    parts: [rounded(B, 3, 'T')],
    hints: ['Rearrange $F = qvB$: the field strength is the force ÷ (the charge × the speed).'],
    solution: [`$B = \\dfrac{F}{qv} = \\dfrac{${sciTex(F)}}{${p.qTex} \\times ${v.tex}} = ${num(B, 3)}$ T`],
  };
}

function chargeDirection(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const [v, B] = twoDirs(rng);
  const positive = cross(v, B);
  const F = p.sign > 0 ? positive : flip(positive);
  return {
    prompt: `${AP(p)} moves ${dirName(v)} through a magnetic field that points ${dirName(B)}. Which way does the magnetic force on the ${p.name} point?`,
    parts: [part(mc(rng, cap(dirName(F)), [cap(dirName(flip(F))), cap(dirName(v)), cap(dirName(B))]))],
    hints: ['Use the right hand for a positive charge: point the thumb along the velocity and the fingers along the field. The palm pushes in the direction of the force.', 'For a negative charge, the force is the opposite way.', 'The force is at right angles to both the velocity and the field.'],
    solution: [
      `Right hand, thumb ${dirName(v)} and fingers ${dirName(B)}: the palm pushes ${dirName(positive)}. That is the force on a positive charge.`,
      p.sign > 0 ? `A proton is positive, so the force points ${dirName(F)}. Answer: ${cap(dirName(F))}` : `An electron is negative, so the force is the opposite way: ${dirName(F)}. Answer: ${cap(dirName(F))}`,
    ],
  };
}

const FORCE_CHARGE_IDEAS: Q[] = [
  { q: 'A proton moves parallel to the lines of a magnetic field. What is the magnetic force on it?', a: 'Zero', w: ['As large as it can be', 'Half as large as it can be', 'It depends on the mass of the proton'], why: 'Only motion across the field gives a force: $F = qvB\\sin\\theta$, and $\\sin 0° = 0$.' },
  { q: 'An electron is at rest in a strong magnetic field. What is the magnetic force on it?', a: 'Zero, because a magnetic field acts only on a moving charge', w: ['Large, because the field is strong', 'Equal to its weight', 'Equal to $qB$'], why: '$F = qvB$: with no speed there is no magnetic force.' },
  { q: 'A neutron moves at right angles to a magnetic field. What is the magnetic force on it?', a: 'Zero, because it has no charge', w: ['The same as the force on a proton', 'Smaller than the force on a proton', 'Larger than the force on a proton'], why: '$F = qvB$: a particle with no charge feels no magnetic force.' },
  { q: 'A magnetic force acts on a moving charged particle. What does the force do to the speed of the particle?', a: 'Nothing: it changes the direction of the particle, not its speed', w: ['It speeds the particle up', 'It slows the particle down', 'It stops the particle'], why: 'The magnetic force is always at right angles to the velocity, so it does no work and the kinetic energy stays the same.' },
  { q: 'The speed of a charged particle that moves at right angles to a magnetic field doubles. What happens to the magnetic force on it?', a: 'It doubles', w: ['It stays the same', 'It becomes four times as large', 'It halves'], why: '$F = qvB$: the force is proportional to the speed.' },
];

function velocitySelector(rng: Rng): GenOutput {
  const c = retry(
    () => ({ E: sci(rng.float(1.5, 9.5, 1), rng.pick([4, 5])), B: rng.pick([0.02, 0.05, 0.1, 0.25, 0.4, 0.5]) }),
    (t) => t.E.v / t.B <= 2.5e7 && t.E.v / t.B >= 5e4,
  );
  const v = c.E.v / c.B;
  return {
    prompt: `In a velocity selector, charged particles pass through an electric field of $${c.E.tex}\\ \\text{N/C}$ and a magnetic field of ${q(c.B, 'T')}. The fields are at right angles to each other and to the path of the particles. Particles of one speed pass straight through, because the electric force and the magnetic force on them balance. Find that speed. ${SCI_ASK}`,
    parts: [sciPart(v, 3, 'm/s')],
    hints: ['The two forces balance: $qE = qvB$.', 'The charge cancels: $v = \\dfrac{E}{B}$'],
    solution: [`$qE = qvB$, so $v = \\dfrac{E}{B} = \\dfrac{${c.E.tex}}{${c.B}} = ${sciTex(v)}$ m/s`],
  };
}

function magneticAcceleration(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const v = speed(rng, p);
  const B = fieldFor(rng, p);
  const F = p.q * v.v * B.v;
  const a = F / p.m;
  return {
    prompt: `${facts(p)} The ${p.name} moves at $${v.tex}\\ \\text{m/s}$ at right angles to a magnetic field of ${B.text}. Find the size of the magnetic force on it, and the size of its acceleration. ${SCI_BOTH}`,
    parts: [sciPart(F, 3, 'N', 'Force'), sciPart(a, 3, 'm/s²', 'Acceleration')],
    hints: ['$F = qvB$, with the field in teslas.', 'Newton’s second law: $a = \\dfrac{F}{m}$'],
    solution: [`$F = qvB = ${p.qTex} \\times ${v.tex} \\times ${B.tex} = ${sciTex(F)}$ N`, `$a = \\dfrac{F}{m} = \\dfrac{${sciTex(F)}}{${p.mTex}} = ${sciTex(a)}$ m/s², towards the centre of the circle the ${p.name} follows`],
  };
}

// ---------------------------------------------------------------------------- 2.8 circular paths

function orbitRadius(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const v = speed(rng, p);
  const B = fieldFor(rng, p);
  const r = (p.m * v.v) / (p.q * B.v);
  return {
    prompt: `${facts(p)} The ${p.name} moves at $${v.tex}\\ \\text{m/s}$ at right angles to a magnetic field of ${B.text}. Find the radius of the circle it follows. ${SCI_ASK}`,
    parts: [sciPart(r, 3, 'm')],
    hints: ['The magnetic force provides the centripetal force: $qvB = \\dfrac{mv^2}{r}$.', 'Rearrange: $r = \\dfrac{mv}{qB}$, with the field in teslas.'],
    solution: [`$qvB = \\dfrac{mv^2}{r}$, so $r = \\dfrac{mv}{qB} = \\dfrac{${p.mTex} \\times ${v.tex}}{${p.qTex} \\times ${B.tex}} = ${sciTex(r)}$ m`],
  };
}

function speedFromRadius(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const c = retry(
    () => ({ B: fieldFor(rng, p), r: rng.pick([1.5, 2, 3, 4, 5, 6, 8, 12, 20]) }),
    (t) => (p.q * t.B.v * (t.r / 100)) / p.m <= 3e7,
  );
  const v = (p.q * c.B.v * (c.r / 100)) / p.m;
  return {
    prompt: `${facts(p)} The ${p.name} moves in a circle of radius ${q(c.r, 'cm')}, at right angles to a magnetic field of ${c.B.text}. How fast is it moving? ${SCI_ASK}`,
    parts: [sciPart(v, 3, 'm/s')],
    hints: ['The magnetic force provides the centripetal force: $qvB = \\dfrac{mv^2}{r}$.', 'Rearrange: $v = \\dfrac{qBr}{m}$, with the radius in metres and the field in teslas.'],
    solution: [`$v = \\dfrac{qBr}{m} = \\dfrac{${p.qTex} \\times ${c.B.tex} \\times ${clean(c.r / 100)}}{${p.mTex}} = ${sciTex(v)}$ m/s`],
  };
}

function fieldForRadius(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const { v, r } = retry(
    () => ({ v: speed(rng, p), r: rng.pick([2, 4, 5, 8, 10, 15, 25]) }),
    (t) => (p.m * t.v.v) / (p.q * (t.r / 100)) <= 2,
  );
  const B = (p.m * v.v) / (p.q * (r / 100));
  return {
    prompt: `${facts(p)} What magnetic field strength makes the ${p.name}, moving at $${v.tex}\\ \\text{m/s}$ at right angles to the field, follow a circle of radius ${q(r, 'cm')}? ${SCI_ASK}`,
    parts: [sciPart(B, 3, 'T')],
    hints: ['The magnetic force provides the centripetal force: $qvB = \\dfrac{mv^2}{r}$.', 'Rearrange: $B = \\dfrac{mv}{qr}$, with the radius in metres.'],
    solution: [`$B = \\dfrac{mv}{qr} = \\dfrac{${p.mTex} \\times ${v.tex}}{${p.qTex} \\times ${clean(r / 100)}} = ${sciTex(B)}$ T`],
  };
}

const CIRCLE_IDEAS: Q[] = [
  { q: 'A charged particle moves at right angles to a uniform magnetic field. Why does it follow a circle?', a: 'The magnetic force is always at right angles to its velocity, so it acts as a centripetal force', w: ['The magnetic force is always along its velocity', 'The magnetic field lines are circles', 'The particle is attracted to the centre of the field'], why: 'A force of constant size that is always at right angles to the velocity turns the particle steadily without changing its speed.' },
  { q: 'A proton circles in a magnetic field. Its speed is doubled. What happens to the radius of its circle?', a: 'It doubles', w: ['It halves', 'It stays the same', 'It becomes four times as large'], why: '$r = \\dfrac{mv}{qB}$: the radius is proportional to the speed.' },
  { q: 'Two ions with the same charge and the same speed enter the same magnetic field. One has twice the mass of the other. How do their paths compare?', a: 'The heavier ion follows a circle of twice the radius', w: ['The heavier ion follows a circle of half the radius', 'They follow the same circle', 'The heavier ion moves in a straight line'], why: '$r = \\dfrac{mv}{qB}$: the radius is proportional to the mass. A mass spectrometer separates ions this way.' },
  { q: 'An electron and a proton enter the same magnetic field with the same velocity. How do their paths compare?', a: 'They curve in opposite directions, and the electron follows a much smaller circle', w: ['They curve the same way, in circles of the same size', 'They curve in opposite directions, in circles of the same size', 'They curve the same way, and the proton follows a much smaller circle'], why: 'Opposite charges feel opposite forces. The electron has far less mass, and $r = \\dfrac{mv}{qB}$.' },
  { q: 'The magnetic field in which a charged particle circles is made stronger. What happens to its path?', a: 'The circle becomes smaller', w: ['The circle becomes larger', 'The path becomes a straight line', 'Nothing changes'], why: '$r = \\dfrac{mv}{qB}$: a stronger field gives a larger force and a tighter circle.' },
];

/** Ions that a mass spectrometer sorts, by their mass in atomic mass units. */
const IONS = [
  { name: 'carbon-12', u: 12 },
  { name: 'nitrogen-14', u: 14 },
  { name: 'oxygen-16', u: 16 },
  { name: 'neon-20', u: 20 },
  { name: 'sodium-23', u: 23 },
  { name: 'chlorine-35', u: 35 },
  { name: 'chlorine-37', u: 37 },
  { name: 'potassium-39', u: 39 },
];
const U = 1.66e-27;
const ION_NOTE = 'Each ion has a charge of $+1.60 \\times 10^{-19}\\ \\text{C}$.';

function spectrometerMass(rng: Rng): GenOutput {
  const ion = rng.pick(IONS);
  const v = sci(rng.float(1.5, 9.5, 1), 5);
  const B = rng.pick([0.2, 0.25, 0.4, 0.5, 0.8]);
  const r = Number((((ion.u * U * v.v) / (1.6e-19 * B)) * 100).toPrecision(3));
  const m = (1.6e-19 * B * (r / 100)) / v.v;
  return {
    prompt: `${ION_NOTE} In a mass spectrometer, ions moving at $${v.tex}\\ \\text{m/s}$ enter a magnetic field of ${q(B, 'T')} at right angles. They follow a circle of radius ${q(r, 'cm')}. Find the mass of one ion. ${SCI_ASK}`,
    parts: [sciPart(m, 3, 'kg')],
    hints: ['The magnetic force provides the centripetal force: $qvB = \\dfrac{mv^2}{r}$.', 'Rearrange: $m = \\dfrac{qBr}{v}$, with the radius in metres.'],
    solution: [`$m = \\dfrac{qBr}{v} = \\dfrac{1.60 \\times 10^{-19} \\times ${B} \\times ${clean(r / 100)}}{${v.tex}} = ${sciTex(m)}$ kg, the mass of an ion of ${ion.name}`],
  };
}

function orbitPeriod(rng: Rng): GenOutput {
  const p = rng.pick([ELECTRON, PROTON]);
  const B = fieldFor(rng, p);
  const T = (2 * Math.PI * p.m) / (p.q * B.v);
  return {
    prompt: `${facts(p)} The ${p.name} circles at right angles to a magnetic field of ${B.text}. How long does it take to go once round? ${SCI_ASK}`,
    parts: [sciPart(T, 3, 's')],
    hints: ['The radius is $r = \\dfrac{mv}{qB}$, and the time for one circle is $T = \\dfrac{2\\pi r}{v}$.', 'The speed cancels: $T = \\dfrac{2\\pi m}{qB}$'],
    solution: [`$T = \\dfrac{2\\pi r}{v} = \\dfrac{2\\pi m}{qB} = \\dfrac{2\\pi \\times ${p.mTex}}{${p.qTex} \\times ${B.tex}} = ${sciTex(T)}$ s. The time does not depend on the speed.`],
  };
}

function selectorSpectrometer(rng: Rng): GenOutput {
  const ion = rng.pick(IONS);
  const c = retry(
    () => ({ E: sci(rng.float(1.5, 9.5, 1), 4), B1: rng.pick([0.05, 0.1, 0.2, 0.25]), B2: rng.pick([0.2, 0.25, 0.4, 0.5]) }),
    (t) => t.E.v / t.B1 >= 1e5 && t.E.v / t.B1 <= 1e6,
  );
  const v = c.E.v / c.B1;
  const r = Number((((ion.u * U * v) / (1.6e-19 * c.B2)) * 100).toPrecision(3));
  const m = (1.6e-19 * c.B2 * (r / 100)) / v;
  return {
    prompt: `${ION_NOTE} Ions pass straight through a velocity selector that has an electric field of $${c.E.tex}\\ \\text{N/C}$ and a magnetic field of ${q(c.B1, 'T')}. They then enter a second magnetic field, of ${q(c.B2, 'T')}, at right angles, and follow a circle of radius ${q(r, 'cm')}. Find the speed of the ions, and the mass of one ion. ${SCI_BOTH}`,
    parts: [sciPart(v, 3, 'm/s', 'Speed'), sciPart(m, 3, 'kg', 'Mass')],
    hints: ['In the selector the electric and magnetic forces balance: $qE = qvB$, so $v = \\dfrac{E}{B}$.', 'In the second field the magnetic force provides the centripetal force: $m = \\dfrac{qBr}{v}$, with the radius in metres.'],
    solution: [`$v = \\dfrac{E}{B} = \\dfrac{${c.E.tex}}{${c.B1}} = ${sciTex(v)}$ m/s`, `$m = \\dfrac{qBr}{v} = \\dfrac{1.60 \\times 10^{-19} \\times ${c.B2} \\times ${clean(r / 100)}}{${sciTex(v)}} = ${sciTex(m)}$ kg, the mass of an ion of ${ion.name}`],
  };
}

// ---------------------------------------------------------------------------- 2.9 the force on a wire

interface Wire {
  B: number;
  I: number;
  len: number;
  F: number;
}
function wire(rng: Rng): Wire {
  return retry(
    () => {
      const B = rng.pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5, 0.8]);
      const I = rng.pick([1.5, 2, 3, 4, 5, 8, 10, 12]);
      const len = rng.pick([0.1, 0.2, 0.25, 0.3, 0.5, 0.8, 1.2, 2]);
      return { B, I, len, F: clean(B * I * len) };
    },
    (t) => threeDp(t.F) && t.F >= 0.02,
  );
}

function wireForce(rng: Rng): GenOutput {
  const w = wire(rng);
  return {
    prompt: `A straight wire of length ${q(w.len, 'm')} carries a current of ${q(w.I, 'A')} at right angles to a magnetic field of ${q(w.B, 'T')}. What is the size of the magnetic force on the wire?`,
    parts: [numPart(w.F, { suffix: 'N' })],
    hints: ['For a wire at right angles to a magnetic field: $F = BIL$'],
    solution: [`$F = BIL = ${w.B} \\times ${w.I} \\times ${w.len} = ${w.F}$ N`],
  };
}

function wireAngle(rng: Rng): GenOutput {
  const w = wire(rng);
  const angle = rng.pick([20, 30, 40, 45, 50, 60, 70]);
  const F = w.F * Math.sin(angle * RAD);
  return {
    prompt: `A straight wire of length ${q(w.len, 'm')} carries a current of ${q(w.I, 'A')} through a magnetic field of ${q(w.B, 'T')}. The wire makes an angle of ${angle}° with the field. Find the size of the magnetic force on the wire, to 3 decimal places.`,
    parts: [rounded(F, 3, 'N')],
    hints: ['Only the part of the wire that lies across the field counts: $F = BIL\\sin\\theta$'],
    solution: [`$F = BIL\\sin\\theta = ${w.B} \\times ${w.I} \\times ${w.len} \\times \\sin ${angle}° = ${num(F, 3)}$ N`],
  };
}

function wireFind(rng: Rng): GenOutput {
  const w = wire(rng);
  const find = rng.pick(['B', 'I', 'L'] as const);
  if (find === 'B') {
    return {
      prompt: `A straight wire of length ${q(w.len, 'm')} carries a current of ${q(w.I, 'A')} at right angles to a magnetic field. The magnetic force on the wire is ${q(w.F, 'N')}. What is the magnetic field strength?`,
      parts: [numPart(w.B, { suffix: 'T' })],
      hints: ['Rearrange $F = BIL$: the field strength is the force ÷ (the current × the length).'],
      solution: [`$B = \\dfrac{F}{IL} = \\dfrac{${w.F}}{${w.I} \\times ${w.len}} = ${w.B}$ T`],
    };
  }
  if (find === 'I') {
    return {
      prompt: `A straight wire of length ${q(w.len, 'm')} lies at right angles to a magnetic field of ${q(w.B, 'T')}. The magnetic force on the wire is ${q(w.F, 'N')}. What is the current in the wire?`,
      parts: [numPart(w.I, { suffix: 'A' })],
      hints: ['Rearrange $F = BIL$: the current is the force ÷ (the field strength × the length).'],
      solution: [`$I = \\dfrac{F}{BL} = \\dfrac{${w.F}}{${w.B} \\times ${w.len}} = ${w.I}$ A`],
    };
  }
  return {
    prompt: `A straight wire carries a current of ${q(w.I, 'A')} at right angles to a magnetic field of ${q(w.B, 'T')}. The magnetic force on the wire is ${q(w.F, 'N')}. What length of the wire is in the field?`,
    parts: [numPart(w.len, { suffix: 'm' })],
    hints: ['Rearrange $F = BIL$: the length is the force ÷ (the field strength × the current).'],
    solution: [`$L = \\dfrac{F}{BI} = \\dfrac{${w.F}}{${w.B} \\times ${w.I}} = ${w.len}$ m`],
  };
}

function wireDirection(rng: Rng): GenOutput {
  const [I, B] = twoDirs(rng);
  const F = cross(I, B);
  return {
    prompt: `A straight wire carries a conventional current ${dirName(I)} through a magnetic field that points ${dirName(B)}. Which way does the magnetic force on the wire point?`,
    parts: [part(mc(rng, cap(dirName(F)), [cap(dirName(flip(F))), cap(dirName(I)), cap(dirName(B))]))],
    hints: ['Use the right hand: point the thumb along the conventional current and the fingers along the field. The palm pushes in the direction of the force.', 'The force is at right angles to both the current and the field.'],
    solution: [`Right hand, thumb ${dirName(I)} and fingers ${dirName(B)}: the palm pushes ${dirName(F)}.`, `Answer: ${cap(dirName(F))}`],
  };
}

function wireFloat(rng: Rng): GenOutput {
  const c = retry(
    () => ({ m: rng.pick([5, 8, 10, 15, 20, 30, 50]), len: rng.pick([0.2, 0.25, 0.4, 0.5, 0.8]), B: rng.pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5]) }),
    (t) => {
      const I = ((t.m / 1000) * G) / (t.B * t.len);
      return I >= 0.3 && I <= 30;
    },
  );
  const I = ((c.m / 1000) * G) / (c.B * c.len);
  return {
    prompt: `${G_NOTE} A straight horizontal wire has a mass of ${q(c.m, 'g')} and a length of ${q(c.len, 'm')}. It lies at right angles to a horizontal magnetic field of ${q(c.B, 'T')}. What current in the wire makes the magnetic force on it just balance its weight? Give your answer to 2 decimal places.`,
    parts: [rounded(I, 2, 'A')],
    hints: ['For balance, the magnetic force equals the weight: $BIL = mg$.', 'Change the grams to kilograms, and rearrange: $I = \\dfrac{mg}{BL}$'],
    solution: [`$BIL = mg$, so $I = \\dfrac{mg}{BL} = \\dfrac{${c.m / 1000} \\times 9.81}{${c.B} \\times ${c.len}} = ${num(I, 2)}$ A`],
  };
}

function currentBalance(rng: Rng): GenOutput {
  const c = retry(
    () => ({ B0: rng.pick([0.05, 0.08, 0.12, 0.15, 0.25, 0.3]), I: rng.pick([1.5, 2, 2.5, 4, 5]), len: rng.pick([4, 5, 6, 8, 10]) }),
    (t) => ((t.B0 * t.I * (t.len / 100)) / G) * 1000 >= 0.5,
  );
  const grams = Number((((c.B0 * c.I * (c.len / 100)) / G) * 1000).toFixed(2));
  const B = ((grams / 1000) * G) / (c.I * (c.len / 100));
  return {
    prompt: `${G_NOTE} A magnet sits on an electronic balance. A horizontal wire is held in the field between its poles, at right angles to the field, with ${q(c.len, 'cm')} of the wire in the field. When a current of ${q(c.I, 'A')} is switched on in the wire, the reading of the balance rises by ${q(grams.toFixed(2), 'g')}. Find the magnetic field strength between the poles, to 3 decimal places.`,
    parts: [rounded(B, 3, 'T')],
    hints: ['The field pushes the wire up, and the wire pushes the magnet down with an equal force. That force is the weight of the extra mass the balance shows.', '$F = mg$, with the mass in kilograms.', 'Then $B = \\dfrac{F}{IL}$, with the length in metres.'],
    solution: [`$F = mg = ${num(grams / 1000, 5)} \\times 9.81 = ${num((grams / 1000) * G, 5)}$ N`, `$B = \\dfrac{F}{IL} = \\dfrac{${num((grams / 1000) * G, 5)}}{${c.I} \\times ${clean(c.len / 100)}} = ${num(B, 3)}$ T`],
  };
}

// ---------------------------------------------------------------------------- 2.9 the motor

const MOTOR_1: Q[] = [
  { q: 'What energy change does an electric motor make?', a: 'Electrical energy to kinetic energy', w: ['Kinetic energy to electrical energy', 'Chemical energy to electrical energy', 'Thermal energy to electrical energy'], why: 'A motor takes an electric current and turns. A generator does the reverse.' },
  { q: 'What is the motor effect?', a: 'A wire that carries a current across a magnetic field feels a force', w: ['A wire that moves across a magnetic field has a current induced in it', 'A current heats the wire it passes through', 'Two magnets attract or repel each other'], why: 'The field pushes on the moving charges in the wire, and so on the wire.' },
  { q: 'A wire carries a current in a magnetic field. For which position of the wire is the magnetic force on it greatest?', a: 'At right angles to the field', w: ['Parallel to the field', 'At 45° to the field', 'The force is the same for every position'], why: '$F = BIL\\sin\\theta$ is greatest when the angle between the wire and the field is 90°.' },
  { q: 'A wire carries a current parallel to the lines of a magnetic field. What is the magnetic force on the wire?', a: 'Zero', w: ['As large as it can be', 'Half as large as it can be', 'Equal to $BIL$'], why: 'Charges that move along the field feel no magnetic force.' },
  { q: 'The current in a wire in a magnetic field is reversed. What happens to the force on the wire?', a: 'It reverses direction', w: ['It stays the same', 'It becomes zero', 'It doubles'], why: 'The direction of the force depends on the direction of the current and of the field. Reversing one of them reverses the force.' },
  { q: 'Both the current in a wire and the magnetic field it is in are reversed. What happens to the force on the wire?', a: 'It stays in the same direction', w: ['It reverses direction', 'It becomes zero', 'It turns through 90°'], why: 'Each reversal reverses the force once, so two reversals leave it as it was.' },
];

const MOTOR_2: Q[] = [
  { q: 'A coil that carries a current sits between the poles of a magnet. Why does the coil turn?', a: 'The currents in its two sides are in opposite directions, so the forces on them are opposite and turn the coil', w: ['Both sides of the coil are pushed the same way', 'The coil is attracted to the north pole', 'The current heats one side of the coil more than the other'], why: 'One side is pushed up and the other is pushed down. The two forces together turn the coil about its axle.' },
  { q: 'What does the split-ring commutator of a direct current motor do?', a: 'It reverses the current in the coil every half turn, so the coil keeps turning the same way', w: ['It makes the current in the coil larger', 'It changes direct current to alternating current for the supply', 'It stops the coil from getting hot'], why: 'Without the reversal, the forces would turn the coil back once it passed the upright position.' },
  { q: 'What do the brushes of a direct current motor do?', a: 'They carry the current between the fixed circuit and the turning commutator', w: ['They clean the coil', 'They make the magnetic field', 'They reverse the magnetic field every half turn'], why: 'The brushes press on the commutator and keep contact with it as it turns.' },
  { q: 'Which change does not increase the turning effect of a motor?', a: 'Reversing the current', w: ['Increasing the current', 'Winding more turns on the coil', 'Using a stronger magnet'], why: 'Reversing the current only reverses the direction in which the motor turns.' },
  { q: 'How can the direction in which a direct current motor turns be reversed?', a: 'Reverse the current, or reverse the magnetic field, but not both', w: ['Reverse both the current and the magnetic field', 'Increase the current', 'Add more turns to the coil'], why: 'Reversing one of the two reverses the forces on the coil. Reversing both leaves them as they were.' },
  { q: 'A motor coil is connected to its supply through two complete rings instead of a split ring. What does the coil do?', a: 'It swings to the upright position, rocks there and stops', w: ['It turns steadily, as before', 'It turns twice as fast', 'It does not move at all'], why: 'With no reversal of the current, the forces past the upright position turn the coil back, so it settles there.' },
];

function coilForce(rng: Rng): GenOutput {
  const c = retry(
    () => ({ N: rng.pick([20, 40, 50, 80, 100, 200]), B: rng.pick([0.05, 0.1, 0.2, 0.25, 0.4]), I: rng.pick([0.5, 1, 1.5, 2, 3]), len: rng.pick([2, 4, 5, 6, 8, 10]) }),
    (t) => threeDp(t.N * t.B * t.I * (t.len / 100)),
  );
  const F = clean(c.N * c.B * c.I * (c.len / 100));
  return {
    prompt: `The coil of a motor has ${c.N} turns. One side of the coil is ${q(c.len, 'cm')} long and lies at right angles to a magnetic field of ${q(c.B, 'T')}. The current in the coil is ${q(c.I, 'A')}. What is the size of the magnetic force on that side of the coil?`,
    parts: [numPart(F, { suffix: 'N' })],
    hints: ['Each turn of the side is a wire that feels a force $BIL$.', 'With $N$ turns, the force on the side is $F = NBIL$. Change the centimetres to metres.'],
    solution: [`$F = NBIL = ${c.N} \\times ${c.B} \\times ${c.I} \\times ${clean(c.len / 100)} = ${F}$ N`],
  };
}

const COIL_CHANGES = [
  { change: 'the number of turns is doubled', f: 2 },
  { change: 'the current is tripled', f: 3 },
  { change: 'the number of turns is doubled and the current is halved', f: 1 },
  { change: 'the magnetic field strength is halved', f: 0.5 },
  { change: 'the number of turns is tripled and the magnetic field strength is doubled', f: 6 },
  { change: 'the current is doubled and the magnetic field strength is doubled', f: 4 },
];

function coilScale(rng: Rng): GenOutput {
  const F = rng.pick([0.6, 1.2, 2.4, 3.6]);
  const k = rng.pick(COIL_CHANGES);
  const now = clean(F * k.f);
  return {
    prompt: `The magnetic force on one side of a motor coil is ${q(F, 'N')}. What is the force on that side if ${k.change}?`,
    parts: [numPart(now, { suffix: 'N' })],
    hints: ['The force on one side of the coil is $F = NBIL$.', 'The force is proportional to the number of turns, to the field strength and to the current.'],
    solution: [`$F = NBIL$, so the force is multiplied by ${k.f}.`, `$${F} \\times ${k.f} = ${now}$ N`],
  };
}

const MOTOR_3: Q[] = [
  { q: 'A motor coil lies flat, with its plane parallel to the magnetic field. How does the turning effect of the forces on it compare with other positions?', a: 'It is greatest in this position', w: ['It is zero in this position', 'It is the same in every position', 'It is half of its greatest value'], why: 'The forces on the two sides are then as far from the axle as they can be, so they turn the coil most strongly.' },
  { q: 'A motor coil is upright, with its plane at right angles to the magnetic field. What is the turning effect of the forces on its two sides?', a: 'Zero, because the two forces act along the same line through the axle', w: ['As large as it can be', 'Half of its greatest value', 'It depends on the current'], why: 'The forces are still there, but they pull straight outward and do not turn the coil. The motor relies on the coil’s motion to carry it past this position.' },
  { q: 'Real motors have several coils at different angles on the same axle. Why?', a: 'So that some coil is always in a position with a large turning effect, and the motor runs smoothly', w: ['So that less current is needed', 'So that the motor needs no magnet', 'So that the commutator is not needed'], why: 'One coil gives a turning effect that falls to zero twice in each turn. Several coils even it out.' },
];

// ---------------------------------------------------------------------------- 2.10 electromagnetic induction

const INDUCTION_1: Q[] = [
  { q: 'A bar magnet is pushed into a coil that is connected to a sensitive meter. What does the meter show?', a: 'A current while the magnet is moving', w: ['A steady current for as long as the magnet is inside the coil', 'No current at any time', 'A current only after the magnet stops'], why: 'A changing magnetic field through a coil induces an emf, which drives a current in a complete circuit.' },
  { q: 'A bar magnet is held still inside a coil that is connected to a meter. What does the meter show?', a: 'No current, because the magnetic field through the coil is not changing', w: ['A steady current', 'A current that grows steadily', 'A current that changes direction again and again'], why: 'Only a change in the magnetic field through the coil induces an emf.' },
  { q: 'A magnet is pushed into a coil, and then pushed in again at twice the speed. How does the induced emf compare?', a: 'It is larger the second time', w: ['It is smaller the second time', 'It is the same both times', 'It is zero the second time'], why: 'Faraday’s law: the induced emf is proportional to the rate at which the magnetic flux through the coil changes.' },
  { q: 'A magnet is pushed into a coil and then pulled out again. How do the induced currents compare?', a: 'They are in opposite directions', w: ['They are in the same direction', 'There is a current only when the magnet is pushed in', 'There is a current only when the magnet is pulled out'], why: 'Pushing in increases the field through the coil and pulling out decreases it, so the induced emf reverses.' },
  { q: 'Which change does not increase the emf induced when a magnet is moved into a coil?', a: 'Using thicker wire for the same number of turns', w: ['Moving the magnet faster', 'Using a coil with more turns', 'Using a stronger magnet'], why: 'The emf depends on how fast the flux changes and on the number of turns. Thicker wire has less resistance, which changes the current but not the emf.' },
  { q: 'What does Faraday’s law of electromagnetic induction say?', a: 'The induced emf is proportional to the rate of change of the magnetic flux through the circuit', w: ['The induced emf is proportional to the magnetic flux through the circuit', 'The induced current is proportional to the resistance of the circuit', 'A steady magnetic field induces a steady emf'], why: 'It is the change in flux, and how quickly it happens, that matters.' },
];

const LENZ_IDEAS: Q[] = [
  { q: 'What does Lenz’s law say about the direction of an induced current?', a: 'It flows in the direction that opposes the change that causes it', w: ['It flows in the direction that helps the change that causes it', 'It always flows clockwise', 'It always flows from north to south'], why: 'The magnetic field of the induced current acts against the change in flux.' },
  { q: 'The north pole of a magnet is pushed towards one end of a coil. What does the induced current make that end of the coil?', a: 'A north pole, which repels the magnet', w: ['A south pole, which attracts the magnet', 'A north pole, which attracts the magnet', 'Neither pole'], why: 'By Lenz’s law the coil opposes the approach of the magnet, so it faces the magnet with a like pole.' },
  { q: 'The north pole of a magnet is pulled away from one end of a coil. What does the induced current make that end of the coil?', a: 'A south pole, which attracts the magnet', w: ['A north pole, which repels the magnet', 'A south pole, which repels the magnet', 'Neither pole'], why: 'The coil opposes the magnet leaving, so it faces the magnet with an unlike pole and pulls it back.' },
  { q: 'Why must the induced current oppose the change that causes it?', a: 'Otherwise energy would be created from nothing', w: ['Otherwise charge would not be conserved', 'Otherwise the magnet would lose its magnetism', 'Because all currents flow that way'], why: 'Work must be done against the opposing force, and that work becomes the electrical energy. If the current helped the change, energy would appear for free.' },
  { q: 'A strong magnet is dropped down a vertical copper pipe. It falls much more slowly than it would outside the pipe. Why?', a: 'Its motion induces currents in the pipe, and their magnetic fields oppose the motion', w: ['Copper is attracted to magnets', 'The air in the pipe is thicker', 'The magnet becomes heavier inside the pipe'], why: 'The falling magnet changes the flux through each ring of the pipe. By Lenz’s law the induced currents push back on the magnet.' },
];

function rodEmf(rng: Rng): GenOutput {
  const c = retry(
    () => ({ B: rng.pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.8, 1.2]), len: rng.pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.8]), v: rng.pick([2, 3, 4, 5, 8, 10, 15, 20]) }),
    (t) => threeDp(t.B * t.len * t.v),
  );
  const emf = clean(c.B * c.len * c.v);
  return {
    prompt: `A metal rod of length ${q(c.len, 'm')} moves at ${q(c.v, 'm/s')} through a magnetic field of ${q(c.B, 'T')}. The rod, its velocity and the field are all at right angles to one another. What emf is induced between the ends of the rod?`,
    parts: [numPart(emf, { suffix: 'V' })],
    hints: ['For a conductor that moves at right angles to a field and to its own length: $\\varepsilon = BLv$'],
    solution: [`$\\varepsilon = BLv = ${c.B} \\times ${c.len} \\times ${c.v} = ${emf}$ V`],
  };
}

function wingEmf(rng: Rng): GenOutput {
  const B = sci(rng.float(4, 6.5, 1), -5);
  const span = rng.pick([30, 35, 45, 60, 65]);
  const v = rng.pick([180, 200, 220, 240, 250]);
  const emf = B.v * span * v;
  return {
    prompt: `An aircraft with a wingspan of ${q(span, 'm')} flies level at ${q(v, 'm/s')} where the vertical part of the Earth’s magnetic field is $${B.tex}\\ \\text{T}$. What emf is induced between its wing tips? Give your answer to 3 decimal places.`,
    parts: [rounded(emf, 3, 'V')],
    hints: ['The wings are a conductor that cuts across the vertical field: $\\varepsilon = BLv$'],
    solution: [`$\\varepsilon = BLv = ${B.tex} \\times ${span} \\times ${v} = ${num(emf, 3)}$ V`],
  };
}

function rodCurrent(rng: Rng): GenOutput {
  const c = retry(
    () => ({ B: rng.pick([0.2, 0.25, 0.4, 0.5, 0.8]), len: rng.pick([0.2, 0.25, 0.4, 0.5]), v: rng.pick([2, 4, 5, 8, 10]), R: rng.pick([0.5, 1, 2, 4, 5]) }),
    (t) => threeDp(t.B * t.len * t.v) && threeDp((t.B * t.len * t.v) / t.R),
  );
  const emf = clean(c.B * c.len * c.v);
  const I = clean(emf / c.R);
  return {
    prompt: `A metal rod slides at ${q(c.v, 'm/s')} along two parallel rails that are ${q(c.len, 'm')} apart, at right angles to a magnetic field of ${q(c.B, 'T')}. The rails are joined by ${an(c.R)} ${ohm(c.R)} resistor, and the rod and the rails have no resistance. Find the emf induced in the rod, and the current in the resistor.`,
    parts: [numPart(emf, { suffix: 'V', label: 'Emf' }), numPart(I, { suffix: 'A', label: 'Current' })],
    hints: ['$\\varepsilon = BLv$, where $L$ is the length of the rod between the rails.', 'The emf drives a current through the resistor: $I = \\dfrac{\\varepsilon}{R}$'],
    solution: [`$\\varepsilon = BLv = ${c.B} \\times ${c.len} \\times ${c.v} = ${emf}$ V`, `$I = \\dfrac{\\varepsilon}{R} = \\dfrac{${emf}}{${c.R}} = ${I}$ A`],
  };
}

function faradayCoil(rng: Rng): GenOutput {
  const c = retry(
    () => ({ N: rng.pick([50, 100, 200, 400, 500]), A: rng.pick([0.002, 0.004, 0.005, 0.008, 0.01, 0.02]), B1: rng.pick([0, 0.1, 0.2, 0.4, 0.6]), B2: rng.pick([0, 0.2, 0.3, 0.5, 0.8, 1.2]), t: rng.pick([0.05, 0.1, 0.2, 0.25, 0.5, 2]) }),
    (x) => x.B1 !== x.B2 && (x.N * x.A * Math.abs(x.B2 - x.B1)) / x.t >= 0.05,
  );
  const dB = clean(Math.abs(c.B2 - c.B1));
  const emf = (c.N * c.A * dB) / c.t;
  return {
    prompt: `A coil of ${c.N} turns has an area of $${c.A}\\ \\text{m}^2$. A magnetic field passes through the coil at right angles to its plane. The field changes steadily from ${q(c.B1, 'T')} to ${q(c.B2, 'T')} in ${q(c.t, 's')}. Find the size of the emf induced in the coil, to 2 decimal places.`,
    parts: [rounded(emf, 2, 'V')],
    hints: ['The magnetic flux through one turn is $\\Phi = BA$.', 'Faraday’s law: $\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t}$, and here $\\Delta\\Phi = A\\Delta B$.'],
    solution: [`$\\Delta\\Phi = A\\Delta B = ${c.A} \\times ${dB} = ${num(c.A * dB, 6)}$ Wb for each turn`, `$\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t} = ${c.N} \\times \\dfrac{${num(c.A * dB, 6)}}{${c.t}} = ${num(emf, 2)}$ V`],
  };
}

function fluxChange(rng: Rng): GenOutput {
  const c = retry(
    () => ({ N: rng.pick([50, 120, 200, 250, 400, 600]), f1: rng.int(1, 12), f2: rng.int(1, 12), t: rng.pick([0.02, 0.04, 0.05, 0.1, 0.2, 0.5]) }),
    (x) => x.f1 !== x.f2,
  );
  const dF = Math.abs(c.f2 - c.f1);
  const emf = (c.N * dF * 1e-3) / c.t;
  return {
    prompt: `The magnetic flux through each turn of a ${c.N}-turn coil changes steadily from ${q(c.f1, 'mWb')} to ${q(c.f2, 'mWb')} in ${q(c.t, 's')}. Find the size of the emf induced in the coil, to 2 decimal places.`,
    parts: [rounded(emf, 2, 'V')],
    hints: ['Find the change in flux, and change the milliwebers to webers: $1\\ \\text{mWb} = 10^{-3}$ Wb.', 'Faraday’s law: $\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t}$'],
    solution: [`$\\Delta\\Phi = ${dF}\\ \\text{mWb} = ${num(dF * 1e-3, 3)}$ Wb`, `$\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t} = ${c.N} \\times \\dfrac{${num(dF * 1e-3, 3)}}{${c.t}} = ${num(emf, 2)}$ V`],
  };
}

// ---------------------------------------------------------------------------- 2.10 generators and transformers

const GENERATOR_1: Q[] = [
  { q: 'What energy change does a generator make?', a: 'Kinetic energy to electrical energy', w: ['Electrical energy to kinetic energy', 'Electrical energy to thermal energy', 'Chemical energy to kinetic energy'], why: 'A generator is turned by something, and the changing flux through its coil induces an emf.' },
  { q: 'The coil of a generator turns steadily in a magnetic field. Why is its output an alternating current?', a: 'Each side of the coil cuts the field one way for half a turn and the other way for the next half', w: ['The magnet changes its poles every half turn', 'The coil stops every half turn', 'The brushes reverse the current'], why: 'The flux through the coil rises and then falls in every turn, so the induced emf reverses every half turn.' },
  { q: 'How is the coil of an alternating current generator connected to its circuit?', a: 'Through two slip rings, each joined to one end of the coil', w: ['Through a split-ring commutator', 'Through a soft iron core', 'Through a second magnet'], why: 'Slip rings keep each end of the coil joined to the same brush, so the alternating emf of the coil reaches the circuit unchanged.' },
  { q: 'The slip rings of a generator are replaced by a split-ring commutator. What is the output now?', a: 'A current that rises and falls but always flows the same way', w: ['An alternating current, as before', 'A perfectly steady current', 'No current at all'], why: 'The commutator swaps the connections every half turn, just as the emf of the coil reverses, so the current in the circuit keeps one direction.' },
  { q: 'For which position of a generator coil is the induced emf greatest?', a: 'When the plane of the coil is parallel to the field, and its sides cut across the field fastest', w: ['When the plane of the coil is at right angles to the field', 'It is the same in every position', 'When the coil is at rest'], why: 'The flux through the coil is changing fastest as the coil passes through the position parallel to the field.' },
  { q: 'The coil of a generator is turned twice as fast. What happens to its output?', a: 'Both the greatest emf and the frequency double', w: ['Only the frequency doubles', 'Only the greatest emf doubles', 'Nothing changes'], why: 'The flux changes twice as fast, so the emf doubles, and the coil makes twice as many turns each second.' },
];

const TRANSFORMER_IDEAS: Q[] = [
  { q: 'A transformer has more turns on its secondary coil than on its primary coil. What does it do?', a: 'It steps the voltage up', w: ['It steps the voltage down', 'It changes alternating current to direct current', 'It increases the power'], why: 'The voltages are in the same ratio as the turns: more secondary turns give a larger secondary voltage.' },
  { q: 'Why does a transformer not work with a steady direct current in its primary coil?', a: 'A steady current gives a steady magnetic field, and only a changing field induces an emf', w: ['A direct current cannot pass through a coil', 'A direct current makes no magnetic field', 'The iron core blocks direct current'], why: 'The secondary emf comes from the changing flux in the core, which needs a changing primary current.' },
  { q: 'An ideal transformer steps the voltage up by a factor of 10. What happens to the current?', a: 'The secondary current is one tenth of the primary current', w: ['The secondary current is 10 times the primary current', 'The two currents are equal', 'The secondary current is one hundredth of the primary current'], why: 'An ideal transformer passes on all of the power: $V_pI_p = V_sI_s$. Ten times the voltage means one tenth of the current.' },
  { q: 'Why is electrical energy sent across the country at a very high voltage?', a: 'A high voltage needs a small current for the same power, so less energy is wasted heating the cables', w: ['A high voltage makes the energy travel faster', 'A high voltage is safer', 'The cables have less resistance at a high voltage'], why: 'The power wasted in a cable is $I^2R$. Raising the voltage lowers the current, and the waste falls with the square of the current.' },
];

interface Transformer {
  Np: number;
  Ns: number;
  Vp: number;
  Vs: number;
}
function transformer(rng: Rng): Transformer {
  return retry(
    () => {
      const ratio = rng.pick([0.05, 0.1, 0.2, 0.25, 0.5, 2, 4, 5, 10, 20]);
      const Np = rng.pick([100, 200, 400, 500, 800, 1000, 2000]);
      const Vp = rng.pick([6, 12, 24, 120, 240]);
      return { Np, Ns: clean(Np * ratio), Vp, Vs: clean(Vp * ratio) };
    },
    (t) => Number.isInteger(t.Ns) && t.Ns >= 10 && t.Vs >= 1.2 && t.Vs <= 5000,
  );
}

function transformerVoltage(rng: Rng): GenOutput {
  const t = transformer(rng);
  return {
    prompt: `A transformer has ${t.Np} turns on its primary coil and ${t.Ns} turns on its secondary coil. The primary coil is connected to ${an(t.Vp)} ${q(t.Vp, 'V')} alternating supply. What is the voltage across the secondary coil?`,
    parts: [numPart(t.Vs, { suffix: 'V' })],
    hints: ['The voltages are in the same ratio as the turns: $\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}$'],
    solution: [`$V_s = V_p \\times \\dfrac{N_s}{N_p} = ${t.Vp} \\times \\dfrac{${t.Ns}}{${t.Np}} = ${t.Vs}$ V`],
  };
}

function transformerTurns(rng: Rng): GenOutput {
  const t = transformer(rng);
  return {
    prompt: `A transformer changes ${an(t.Vp)} ${q(t.Vp, 'V')} alternating supply to ${q(t.Vs, 'V')}. Its primary coil has ${t.Np} turns. How many turns does its secondary coil have?`,
    parts: [numPart(t.Ns, { suffix: 'turns' })],
    hints: ['The turns are in the same ratio as the voltages: $\\dfrac{N_s}{N_p} = \\dfrac{V_s}{V_p}$'],
    solution: [`$N_s = N_p \\times \\dfrac{V_s}{V_p} = ${t.Np} \\times \\dfrac{${t.Vs}}{${t.Vp}} = ${t.Ns}$ turns`],
  };
}

function transformerCurrent(rng: Rng): GenOutput {
  const { t, Is } = retry(
    () => ({ t: transformer(rng), Is: rng.pick([0.2, 0.5, 1.5, 2.5, 4]) }),
    (x) => (x.t.Vs * x.Is) / x.t.Vp >= 0.02 && (x.t.Vs * x.Is) / x.t.Vp <= 20,
  );
  const Ip = (t.Vs * Is) / t.Vp;
  return {
    prompt: `An ideal transformer changes ${an(t.Vp)} ${q(t.Vp, 'V')} alternating supply to ${q(t.Vs, 'V')}. The current in its secondary coil is ${q(Is, 'A')}. Find the power it delivers, and the current in its primary coil, to 3 decimal places.`,
    parts: [numPart(clean(t.Vs * Is), { suffix: 'W', label: 'Power' }), rounded(Ip, 3, 'A', 'Primary current')],
    hints: ['The power delivered is $P = V_sI_s$.', 'An ideal transformer wastes no energy, so the power in equals the power out: $V_pI_p = V_sI_s$.'],
    solution: [`$P = V_sI_s = ${t.Vs} \\times ${Is} = ${clean(t.Vs * Is)}$ W`, `$I_p = \\dfrac{P}{V_p} = \\dfrac{${clean(t.Vs * Is)}}{${t.Vp}} = ${num(Ip, 3)}$ A`],
  };
}

function lineLoss(rng: Rng): GenOutput {
  const c = retry(
    () => ({ P: rng.pick([20, 40, 50, 100, 200, 400]), V: rng.pick([2000, 4000, 5000]), k: rng.pick([10, 20]), R: rng.pick([2, 4, 5, 8, 10, 20]) }),
    (t) => {
      const I = (t.P * 1000) / t.V;
      return Number.isInteger(clean((I / t.k) ** 2 * t.R * 100)) && I * I * t.R < t.P * 1000 * 0.5;
    },
  );
  const I1 = clean((c.P * 1000) / c.V);
  const I2 = clean(I1 / c.k);
  const loss1 = clean(I1 * I1 * c.R);
  const loss2 = clean(I2 * I2 * c.R);
  return {
    prompt: `A power station sends ${q(c.P, 'kW')} of power along cables that have a total resistance of ${ohm(c.R)}. Find the power wasted as heat in the cables when the power is sent at ${q(c.V, 'V')}, and when it is sent at ${q(c.V * c.k, 'V')}.`,
    parts: [numPart(loss1, { suffix: 'W', label: `At ${c.V} V` }), numPart(loss2, { suffix: 'W', label: `At ${c.V * c.k} V` })],
    hints: ['Find the current in the cables each time: $I = \\dfrac{P}{V}$, with the power in watts.', 'The power wasted in the cables is $I^2R$.'],
    solution: [
      `At ${c.V} V: $I = \\dfrac{${c.P * 1000}}{${c.V}} = ${I1}$ A, so the waste is $${I1}^2 \\times ${c.R} = ${loss1}$ W`,
      `At ${c.V * c.k} V: $I = \\dfrac{${c.P * 1000}}{${c.V * c.k}} = ${I2}$ A, so the waste is $${I2}^2 \\times ${c.R} = ${loss2}$ W`,
      `${c.k} times the voltage gives $\\dfrac{1}{${c.k}}$ of the current and $\\dfrac{1}{${c.k * c.k}}$ of the waste`,
    ],
  };
}

export const MAGNETISM_SKILLS: SkillDef[] = [
  skill({ id: 'p30-magnets', name: 'Magnets and magnetic fields', description: 'Describe magnetic poles, domains and field lines, the field of the Earth, and how magnetic fields compare with electric and gravitational fields.', outcomes: ['30-B3'], lessonId: L(7), format: 'mc', gen: bank([MAGNET_1, MAGNET_2, MAGNET_3], ['Like poles repel and unlike poles attract. Field lines run from a north pole round to a south pole.']) }),
  skill({ id: 'p30-current-field', name: 'The magnetic field of a current', description: 'Describe the magnetic field of a straight wire and of a solenoid, find its direction with the right-hand rule, and calculate its strength.', outcomes: ['30-B3'], lessonId: L(7), calculator: true, gen: bank([CURRENT_FIELD_IDEAS, wireField, either(solenoidField, wireFieldCurrent)], ['Grip the wire with the right hand, thumb along the conventional current: the fingers curl the way the field circles']) }),
  skill({ id: 'p30-force-charge', name: 'The force on a moving charge', description: 'Find the size and the direction of the magnetic force on a charge that moves through a magnetic field.', outcomes: ['30-B3'], lessonId: L(8), calculator: true, gen: bank([forceOnCharge, either(forceAngle, fieldFromForce, chargeDirection, fromBank(FORCE_CHARGE_IDEAS, ['$F = qvB\\sin\\theta$: the force needs a charge, a speed and motion across the field.'])), either(velocitySelector, magneticAcceleration)], ['$F = qvB$ for a charge that moves at right angles to the field, and $F = qvB\\sin\\theta$ at an angle']) }),
  skill({ id: 'p30-circular-charge', name: 'Charges moving in circles', description: 'Use the magnetic force as a centripetal force to find the radius, speed, field or mass for a charge that circles in a magnetic field.', outcomes: ['30-B3'], lessonId: L(8), calculator: true, gen: bank([orbitRadius, either(speedFromRadius, fieldForRadius, fromBank(CIRCLE_IDEAS, ['The magnetic force is the centripetal force: $qvB = \\dfrac{mv^2}{r}$, so $r = \\dfrac{mv}{qB}$.'])), either(spectrometerMass, orbitPeriod, selectorSpectrometer)], ['The magnetic force is the centripetal force: $qvB = \\dfrac{mv^2}{r}$']) }),
  skill({ id: 'p30-force-wire', name: 'The force on a current-carrying wire', description: 'Find the size and the direction of the magnetic force on a wire that carries a current through a magnetic field.', outcomes: ['30-B3'], lessonId: L(9), calculator: true, gen: bank([wireForce, either(wireAngle, wireFind, wireDirection), either(wireFloat, currentBalance)], ['$F = BIL$ for a wire at right angles to the field, and $F = BIL\\sin\\theta$ at an angle']) }),
  skill({ id: 'p30-motor', name: 'The electric motor', description: 'Explain how the motor effect turns the coil of a direct current motor, what the commutator does, and what changes the force on the coil.', outcomes: ['30-B3'], lessonId: L(9), calculator: true, gen: bank([MOTOR_1, MOTOR_2, either(coilForce, coilScale, fromBank(MOTOR_3, ['The forces on the two sides of the coil are equal and opposite. Their turning effect depends on how far from the axle they act.']))], ['The force on one side of a coil of $N$ turns is $F = NBIL$']) }),
  skill({ id: 'p30-induction', name: 'Electromagnetic induction', description: 'Use Faraday’s law and Lenz’s law to find the size and the direction of an induced emf, for a moving conductor and for a coil.', outcomes: ['30-B3'], lessonId: L(10), calculator: true, gen: bank([INDUCTION_1, either(rodEmf, wingEmf, rodCurrent, fromBank(LENZ_IDEAS, ['Lenz’s law: an induced current flows in the direction that opposes the change that causes it.'])), either(faradayCoil, fluxChange)], ['Faraday’s law: $\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t}$. For a moving conductor, $\\varepsilon = BLv$']) }),
  skill({ id: 'p30-generator', name: 'Generators and transformers', description: 'Explain how a generator produces an alternating current, and use the turns and power rules of an ideal transformer.', outcomes: ['30-B3'], lessonId: L(10), calculator: true, gen: bank([GENERATOR_1, either(transformerVoltage, transformerTurns, fromBank(TRANSFORMER_IDEAS, ['A transformer needs a changing current. Its voltages are in the same ratio as its turns.'])), either(transformerCurrent, lineLoss)], ['For an ideal transformer: $\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}$ and $V_pI_p = V_sI_s$']) }),
];
