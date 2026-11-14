/**
 * Grade 10 Physics: the first physics course, before Grade 11 Physics. Gradileo's own outline
 * (docs/PLAN-PHYSICS.md, approved by the owner on 14 November 2026), written for learners anywhere
 * who have never studied physics: describing motion, forces, work, energy and power, waves, sound
 * and light, and electricity, at the level most school systems teach in Grades 9 and 10.
 *
 * It is a draft while its units are being written: Unit 1 is here, and Units 2 to 5 follow.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '10-A1', strand: 'Describing Motion', text: 'Use SI units and prefixes, and tell scalar quantities from vector quantities.' },
  { code: '10-A2', strand: 'Describing Motion', text: 'Describe motion in a straight line with speed, velocity and acceleration, in calculations and on distance-time and velocity-time graphs.' },
  { code: '10-B1', strand: 'Forces', text: 'Identify the forces on an object, find the net force, and apply Newton’s three laws of motion.' },
  { code: '10-B2', strand: 'Forces', text: 'Relate mass, weight and gravity, and describe how friction and air resistance change motion.' },
  { code: '10-C1', strand: 'Work, Energy and Power', text: 'Calculate work, kinetic energy and gravitational potential energy, and apply the conservation of energy.' },
  { code: '10-C2', strand: 'Work, Energy and Power', text: 'Calculate power and efficiency, and describe energy transfers.' },
  { code: '10-D1', strand: 'Waves, Sound and Light', text: 'Describe waves by their amplitude, wavelength, frequency and speed, and use the wave equation.' },
  { code: '10-D2', strand: 'Waves, Sound and Light', text: 'Describe sound, the reflection and refraction of light, and the electromagnetic spectrum.' },
  { code: '10-E1', strand: 'Electricity', text: 'Relate charge, current, voltage and resistance, and use Ohm’s law.' },
  { code: '10-E2', strand: 'Electricity', text: 'Analyse series and parallel circuits, and calculate electrical power and energy.' },
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
  // ---------------- Unit 1: Describing Motion ----------------
  L('p10-1-1', 'p10-u1', '1.1', 'Quantities, Units and Measurement', ['10-A1'],
    ['p10-units', 'p10-scalar-vector'],
    ['Name the SI units of length, mass and time, and convert between units with prefixes', 'Tell a scalar, which has a size only, from a vector, which also has a direction'],
    55, ['physical quantity', 'SI unit', 'prefix', 'scalar', 'vector']),
  L('p10-1-2', 'p10-u1', '1.2', 'Speed, Distance and Time', ['10-A2'],
    ['p10-speed', 'p10-average-speed'],
    ['Use speed = distance ÷ time to find a speed, a distance or a time', 'Find the average speed of a journey made in several parts'],
    60, ['speed', 'average speed', 'steady speed']),
  L('p10-1-3', 'p10-u1', '1.3', 'Displacement and Velocity', ['10-A2'],
    ['p10-displacement', 'p10-velocity'],
    ['Tell distance from displacement and find both for motion along a line', 'Find a velocity with its sign, and tell average speed from average velocity'],
    60, ['position', 'distance', 'displacement', 'velocity', 'average velocity']),
  L('p10-1-4', 'p10-u1', '1.4', 'Acceleration', ['10-A2'],
    ['p10-acceleration', 'p10-accel-solve'],
    ['Find an acceleration from a change in velocity and the time it takes', 'Use v = u + at to find a final velocity, a starting velocity or a time'],
    60, ['acceleration', 'deceleration', 'at rest']),
  L('p10-1-5', 'p10-u1', '1.5', 'Motion Graphs', ['10-A2'],
    ['p10-dt-graph', 'p10-vt-graph'],
    ['Describe motion from a distance-time graph and find speeds from its slope', 'Find accelerations from the slope of a velocity-time graph and distances from the area under it'],
    65, ['distance-time graph', 'velocity-time graph', 'slope', 'area under a graph']),
];

export const UNITS: UnitMeta[] = [
  { id: 'p10-u1', number: 1, title: 'Describing Motion', description: 'Quantities and units, scalars and vectors, speed, displacement and velocity, acceleration, and distance-time and velocity-time graphs.', outcomes: ['10-A1', '10-A2'], lessons: [], color: 'sky' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const PHYS10: CourseMeta = {
  id: 'phys-10',
  title: 'Grade 10 Physics',
  shortTitle: 'Physics 10',
  grade: 10,
  subject: 'Physics',
  description: 'Physics for Grade 10: describing motion, forces and Newton’s laws, work, energy and power, waves, sound and light, and electricity.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  draft: true,
};
