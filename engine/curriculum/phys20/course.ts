/**
 * Grade 11 Physics: mechanics and waves with full calculations, after Grade 10 Physics. It
 * follows the four units of Alberta's Physics 20 (docs/PLAN-PHYSICS.md, approved by the owner on
 * 14 November 2026), written for learners anywhere: kinematics, dynamics, circular motion, work
 * and energy, and oscillations and waves. It uses vectors and trigonometry.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: '20-A1', strand: 'Kinematics', text: 'Describe motion in one dimension with position, displacement, velocity and acceleration, in graphs and with the equations of uniformly accelerated motion.' },
  { code: '20-A2', strand: 'Kinematics', text: 'Describe motion in two dimensions with vectors: components and resultants, relative velocity and projectile motion.' },
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
  // ---------------- Unit 1: Kinematics ----------------
  L('p20-1-1', 'p20-u1', '1.1', 'Scalars, Vectors and Displacement', ['20-A1'],
    ['p20-position', 'p20-collinear'],
    ['Find a displacement from two positions, with its sign, and tell it from the distance travelled', 'Add vectors that lie along one line and state the resultant with its direction'],
    60, ['scalar', 'vector', 'position', 'displacement', 'resultant']),
  L('p20-1-2', 'p20-u1', '1.2', 'Uniform Motion and Position-Time Graphs', ['20-A1'],
    ['p20-uniform', 'p20-pt-graph'],
    ['Use velocity = displacement ÷ time for uniform motion, with signs for direction', 'Read velocities and displacements from a position-time graph'],
    60, ['uniform motion', 'velocity', 'average velocity', 'position-time graph']),
  L('p20-1-3', 'p20-u1', '1.3', 'Acceleration and Velocity-Time Graphs', ['20-A1'],
    ['p20-accel', 'p20-vt-graph'],
    ['Find an acceleration, with its sign, from a change in velocity', 'Find accelerations from the slope of a velocity-time graph and displacements from the area under it'],
    65, ['acceleration', 'uniformly accelerated motion', 'velocity-time graph']),
  L('p20-1-4', 'p20-u1', '1.4', 'The Equations of Motion', ['20-A1'],
    ['p20-motion-time', 'p20-motion-squared'],
    ['Use the equations of motion that contain the time to find a displacement, a time or an acceleration', 'Use v² = u² + 2ad when the time is not known'],
    70, ['equations of motion', 'initial velocity', 'final velocity']),
  L('p20-1-5', 'p20-u1', '1.5', 'Free Fall', ['20-A1'],
    ['p20-free-drop', 'p20-free-throw'],
    ['Find the speed, the distance fallen and the time of fall of an object dropped from rest', 'Find the time to the top, the greatest height and the velocity of an object thrown straight up'],
    65, ['free fall', 'acceleration due to gravity']),
  L('p20-1-6', 'p20-u1', '1.6', 'Vectors in Two Dimensions', ['20-A2'],
    ['p20-components', 'p20-resultant'],
    ['Resolve a vector into two perpendicular components', 'Add two vectors by their components and give the size and the direction of the resultant'],
    70, ['component', 'resolve', 'resultant']),
  L('p20-1-7', 'p20-u1', '1.7', 'Relative Velocity', ['20-A2'],
    ['p20-relative-line', 'p20-relative-plane'],
    ['Find a velocity relative to the ground from velocities along one line', 'Find the velocity, crossing time and drift of a boat crossing a current, and the heading that takes it straight across'],
    65, ['relative velocity', 'frame of reference', 'heading']),
  L('p20-1-8', 'p20-u1', '1.8', 'Projectile Motion', ['20-A2'],
    ['p20-projectile-level', 'p20-projectile-angle'],
    ['Find the time of flight, the range and the landing velocity of an object launched horizontally', 'Find the time of flight, the greatest height and the range of an object launched at an angle'],
    75, ['projectile', 'trajectory', 'range', 'time of flight']),
];

export const UNITS: UnitMeta[] = [
  { id: 'p20-u1', number: 1, title: 'Kinematics', description: 'Position, displacement and velocity, acceleration, motion graphs, the equations of motion, free fall, vectors in two dimensions, relative velocity and projectile motion.', outcomes: ['20-A1', '20-A2'], lessons: [], color: 'sky' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const PHYS20: CourseMeta = {
  id: 'phys-20',
  title: 'Grade 11 Physics',
  shortTitle: 'Physics 11',
  grade: 11,
  subject: 'Physics',
  description: 'Physics for Grade 11: kinematics, dynamics, circular motion, work and energy, and oscillations and waves, with vectors and full calculations.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
  draft: true,
};
