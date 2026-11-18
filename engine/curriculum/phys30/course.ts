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
];

export const UNITS: UnitMeta[] = [
  { id: 'p30-u1', number: 1, title: 'Momentum and Impulse', description: 'Momentum as a vector, impulse and force-time graphs, the conservation of momentum, elastic and inelastic collisions, and collisions and explosions in two dimensions.', outcomes: ['30-A1', '30-A2'], lessons: [], color: 'sky' },
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
