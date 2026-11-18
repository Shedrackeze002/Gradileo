/**
 * Grade 12 Physics: momentum, fields, light and the atom, after Grade 11 Physics. It follows the
 * four units of Alberta's Physics 30 (docs/PLAN-PHYSICS.md, approved by the owner on 14 November
 * 2026), written for learners anywhere, with one lesson on circuits and one on fission and fusion
 * added because most other school systems examine them at this level.
 *
 * The course is a draft until all four units are in: it is not listed for classes or sign-up.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '30-A1', strand: 'Momentum and Impulse', text: 'Define momentum as a vector, and relate the impulse of a force, in words, in calculations and on a force-time graph, to the change in momentum it causes.' },
  { code: '30-A2', strand: 'Momentum and Impulse', text: 'Apply the conservation of momentum to collisions and explosions in one and two dimensions, and tell elastic from inelastic collisions by their kinetic energy.' },
  { code: '30-B1', strand: 'Forces and Fields', text: 'Explain electric charge and how objects are charged, and apply Coulomb’s law to the forces between point charges.' },
  { code: '30-B2', strand: 'Forces and Fields', text: 'Describe electric fields and potential difference, analyse the motion of charges in uniform electric fields, and analyse circuits with resistors in series and in parallel.' },
  { code: '30-B3', strand: 'Forces and Fields', text: 'Describe magnetic fields, find the magnetic forces on moving charges and on current-carrying conductors, and explain electromagnetic induction, motors and generators.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 60,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Momentum and Impulse ----------------
  L('p30-1-1', 'p30-u1', '1.1', 'Momentum', ['30-A1'],
    ['p30-momentum', 'p30-momentum-change'],
    ['Calculate the momentum of an object, and the total momentum of objects that move along one line', 'Find a change in momentum, with its sign, when an object speeds up, slows down or rebounds'],
    60, ['momentum', 'vector', 'system', 'change in momentum']),
  L('p30-1-2', 'p30-u1', '1.2', 'Impulse and Force-Time Graphs', ['30-A1'],
    ['p30-impulse', 'p30-ft-graph'],
    ['Use impulse = force × time = change in momentum to find a force, a time or a velocity', 'Find an impulse from the area under a force-time graph, and the change in velocity it causes'],
    70, ['impulse', 'average force', 'force-time graph', 'crumple zone']),
  L('p30-1-3', 'p30-u1', '1.3', 'Conservation of Momentum', ['30-A2'],
    ['p30-conservation', 'p30-explosion'],
    ['Use the conservation of momentum to find a velocity after a collision along one line', 'Find the velocities of objects that push apart or explode from rest or while moving'],
    70, ['isolated system', 'conservation of momentum', 'collision', 'recoil', 'explosion']),
  L('p30-1-4', 'p30-u1', '1.4', 'Elastic and Inelastic Collisions', ['30-A2'],
    ['p30-collision-energy', 'p30-elastic'],
    ['Compare the kinetic energy before and after a collision, and say whether it is elastic or inelastic', 'Find the velocities after an elastic head-on collision'],
    70, ['elastic collision', 'inelastic collision', 'completely inelastic collision', 'kinetic energy', 'ballistic pendulum']),
  L('p30-1-5', 'p30-u1', '1.5', 'Collisions and Explosions in Two Dimensions', ['30-A2'],
    ['p30-momentum-components', 'p30-momentum-2d'],
    ['Add momenta that are at right angles, and find the velocity of objects that collide at right angles and stick', 'Use the conservation of momentum in each direction for glancing collisions and explosions'],
    75, ['component', 'resultant', 'glancing collision']),

  // ---------------- Unit 2: Forces and Fields ----------------
  L('p30-2-1', 'p30-u2', '2.1', 'Electric Charge and Charging', ['30-B1'],
    ['p30-charge', 'p30-charging'],
    ['Relate the charge of an object to the number of electrons it has gained or lost', 'Explain charging by friction, by contact and by induction, and find how identical conductors share charge'],
    60, ['charge', 'elementary charge', 'conservation of charge', 'conductor', 'insulator', 'induction', 'grounding']),
  L('p30-2-2', 'p30-u2', '2.2', 'Coulomb’s Law', ['30-B1'],
    ['p30-coulomb', 'p30-coulomb-net'],
    ['Use Coulomb’s law to find the force between two point charges, a charge or a distance', 'Find the net electric force on a charge from two other charges, along a line and at a right angle'],
    75, ['Coulomb’s law', 'point charge', 'inverse square law', 'net force']),
  L('p30-2-3', 'p30-u2', '2.3', 'Electric Fields', ['30-B2'],
    ['p30-field-strength', 'p30-field-net'],
    ['Find an electric field strength from the force on a charge, and the field of a point charge', 'Read electric field lines, and find the net field of two point charges'],
    75, ['electric field', 'field strength', 'test charge', 'field line', 'uniform field']),
  L('p30-2-4', 'p30-u2', '2.4', 'Electric Potential Energy and Potential Difference', ['30-B2'],
    ['p30-potential', 'p30-plates-field'],
    ['Relate potential difference to the energy of each coulomb, in joules and in electronvolts', 'Use E = ΔV ÷ d for the uniform field between parallel plates'],
    70, ['electric potential energy', 'potential difference', 'volt', 'electronvolt', 'parallel plates']),
  L('p30-2-5', 'p30-u2', '2.5', 'Charges Moving Between Parallel Plates', ['30-B2'],
    ['p30-accelerate', 'p30-millikan'],
    ['Find the acceleration, the speed and the path of a charged particle in a uniform electric field', 'Balance the electric force on a charged drop against its weight, as Millikan did, to find its charge'],
    75, ['uniform field', 'accelerating potential', 'deflection', 'Millikan’s experiment', 'quantized']),
  L('p30-2-6', 'p30-u2', '2.6', 'Current, Resistance and Circuits', ['30-B2'],
    ['p30-circuits', 'p30-emf'],
    ['Analyse circuits that combine resistors in series and in parallel', 'Use emf and internal resistance to find the current a battery supplies and its terminal potential difference'],
    75, ['series', 'parallel', 'equivalent resistance', 'emf', 'internal resistance', 'terminal potential difference']),
  L('p30-2-7', 'p30-u2', '2.7', 'Magnetic Fields', ['30-B3'],
    ['p30-magnets', 'p30-current-field'],
    ['Describe magnetic poles, domains and field lines, and compare magnetic fields with electric and gravitational fields', 'Describe the magnetic field of a current, find its direction with the right-hand rule and calculate its strength'],
    60, ['magnetic pole', 'domain', 'magnetic field', 'tesla', 'right-hand rule', 'solenoid', 'electromagnet']),
  L('p30-2-8', 'p30-u2', '2.8', 'The Force on a Moving Charge', ['30-B3'],
    ['p30-force-charge', 'p30-circular-charge'],
    ['Find the size and the direction of the magnetic force on a moving charge', 'Use the magnetic force as a centripetal force for a charge that circles in a magnetic field'],
    75, ['magnetic force', 'right-hand rule', 'velocity selector', 'mass spectrometer']),
  L('p30-2-9', 'p30-u2', '2.9', 'The Motor Effect', ['30-B3'],
    ['p30-force-wire', 'p30-motor'],
    ['Find the size and the direction of the magnetic force on a current-carrying wire', 'Explain how a direct current motor turns, and what its commutator does'],
    70, ['motor effect', 'current balance', 'coil', 'commutator', 'brushes']),
  L('p30-2-10', 'p30-u2', '2.10', 'Electromagnetic Induction and Generators', ['30-B3'],
    ['p30-induction', 'p30-generator'],
    ['Use Faraday’s law and Lenz’s law to find the size and the direction of an induced emf', 'Explain how generators and transformers work, and use the turns and power rules of an ideal transformer'],
    75, ['electromagnetic induction', 'magnetic flux', 'Faraday’s law', 'Lenz’s law', 'generator', 'slip rings', 'transformer']),
];

export const UNITS: UnitMeta[] = [
  { id: 'p30-u1', number: 1, title: 'Momentum and Impulse', description: 'Momentum as a vector, impulse and force-time graphs, the conservation of momentum, elastic and inelastic collisions, and collisions and explosions in two dimensions.', outcomes: ['30-A1', '30-A2'], lessons: [], color: 'sky' },
  { id: 'p30-u2', number: 2, title: 'Forces and Fields', description: 'Electric charge and Coulomb’s law, electric fields and potential difference, charges moving between plates, circuits, magnetic fields and forces, motors, and electromagnetic induction.', outcomes: ['30-B1', '30-B2', '30-B3'], lessons: [], color: 'rose' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const PHYS30: CourseMeta = {
  id: 'phys-30',
  title: 'Grade 12 Physics',
  shortTitle: 'Physics 12',
  grade: 12,
  subject: 'Physics',
  description: 'Physics for Grade 12: momentum and impulse, electric and magnetic forces and fields, electromagnetic radiation, and atomic and nuclear physics.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  draft: true,
};
