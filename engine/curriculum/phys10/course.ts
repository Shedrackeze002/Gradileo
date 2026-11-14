/**
 * Grade 10 Physics: the first physics course, before Grade 11 Physics. Gradileo's own outline
 * (docs/PLAN-PHYSICS.md, approved by the owner on 14 November 2026), written for learners anywhere
 * who have never studied physics: describing motion, forces, work, energy and power, waves, sound
 * and light, and electricity, at the level most school systems teach in Grades 9 and 10.
 *
 * It is a draft until Physics is added as a subject in the app (placement, topics and the
 * pages that list the subjects); all five units are written.
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

  // ---------------- Unit 2: Forces and Newton's Laws ----------------
  L('p10-2-1', 'p10-u2', '2.1', 'Forces and Net Force', ['10-B1'],
    ['p10-force-types', 'p10-net-force'],
    ['Name the forces acting on an object and tell contact forces from non-contact forces', 'Find the net force of forces along one line, and tell balanced forces from unbalanced forces'],
    60, ['force', 'newton', 'contact force', 'non-contact force', 'net force', 'balanced forces']),
  L('p10-2-2', 'p10-u2', '2.2', 'Newton’s First Law and Inertia', ['10-B1'],
    ['p10-first-law', 'p10-inertia'],
    ['Use Newton’s first law: with balanced forces an object stays at rest or keeps a steady velocity', 'Explain everyday events with inertia, and link inertia to mass'],
    55, ['Newton’s first law', 'inertia', 'steady velocity', 'equilibrium']),
  L('p10-2-3', 'p10-u2', '2.3', 'Newton’s Second Law', ['10-B1'],
    ['p10-second-law', 'p10-second-law-net'],
    ['Use F = ma to find a net force, a mass or an acceleration', 'Find the net force first when several forces act, then the acceleration'],
    65, ['Newton’s second law', 'net force', 'mass', 'acceleration']),
  L('p10-2-4', 'p10-u2', '2.4', 'Mass, Weight and Gravity', ['10-B2'],
    ['p10-weight', 'p10-mass-weight'],
    ['Use weight = mass × g on Earth and on other worlds', 'Tell mass, which stays the same everywhere, from weight, which depends on gravity'],
    60, ['mass', 'weight', 'gravitational field strength', 'kilogram', 'newton']),
  L('p10-2-5', 'p10-u2', '2.5', 'Friction and Air Resistance', ['10-B2'],
    ['p10-friction', 'p10-terminal-velocity'],
    ['Describe friction, give its direction, and find how it changes the net force', 'Describe how air resistance grows with speed and explain terminal velocity'],
    60, ['friction', 'air resistance', 'drag', 'terminal velocity', 'streamlined']),
  L('p10-2-6', 'p10-u2', '2.6', 'Newton’s Third Law', ['10-B1'],
    ['p10-third-law', 'p10-third-law-apply'],
    ['State Newton’s third law and identify the two forces of an interaction pair', 'Use the third law to explain how things push off, recoil and move'],
    55, ['Newton’s third law', 'interaction pair', 'action and reaction', 'recoil']),

  // ---------------- Unit 3: Work, Energy and Power ----------------
  L('p10-3-1', 'p10-u3', '3.1', 'Work', ['10-C1'],
    ['p10-work', 'p10-work-done'],
    ['Use work = force × distance to find the work done, the force or the distance', 'Decide whether a force does work, and say where the energy goes'],
    55, ['work', 'joule', 'kilojoule', 'energy transfer']),
  L('p10-3-2', 'p10-u3', '3.2', 'Kinetic Energy', ['10-C1'],
    ['p10-kinetic-energy', 'p10-ke-compare'],
    ['Use kinetic energy = ½mv² to find an energy, a mass or a speed', 'Explain how kinetic energy changes with mass and with the square of the speed'],
    60, ['kinetic energy', 'speed squared', 'proportional']),
  L('p10-3-3', 'p10-u3', '3.3', 'Gravitational Potential Energy', ['10-C1'],
    ['p10-gpe', 'p10-gpe-change'],
    ['Use gravitational potential energy = mgh to find an energy, a height or a mass', 'Find the change in gravitational potential energy between two heights'],
    60, ['gravitational potential energy', 'height', 'gravitational field strength']),
  L('p10-3-4', 'p10-u3', '3.4', 'Conservation of Energy', ['10-C1'],
    ['p10-energy-stores', 'p10-energy-conservation'],
    ['Name energy stores and describe the transfers between them', 'Use the conservation of energy to find energies, speeds and heights of falling and rising objects'],
    65, ['conservation of energy', 'energy store', 'energy transfer', 'elastic potential energy', 'chemical energy', 'thermal energy']),
  L('p10-3-5', 'p10-u3', '3.5', 'Power', ['10-C2'],
    ['p10-power', 'p10-power-lift'],
    ['Use power = energy ÷ time to find a power, an energy or a time', 'Find the work done and the power needed to lift a load'],
    60, ['power', 'watt', 'kilowatt']),
  L('p10-3-6', 'p10-u3', '3.6', 'Efficiency and Energy Transfers', ['10-C2'],
    ['p10-efficiency', 'p10-energy-transfers'],
    ['Calculate efficiency, useful energy and wasted energy', 'Identify the useful and wasted energy transfers of a device'],
    55, ['efficiency', 'useful energy', 'wasted energy']),

  // ---------------- Unit 4: Waves, Sound and Light ----------------
  L('p10-4-1', 'p10-u4', '4.1', 'What a Wave Is', ['10-D1'],
    ['p10-wave-types', 'p10-wave-parts'],
    ['Say what a wave transfers, and tell transverse waves from longitudinal waves', 'Name the parts of a wave, and read its amplitude and wavelength from a graph'],
    55, ['wave', 'transverse', 'longitudinal', 'amplitude', 'wavelength', 'crest', 'trough']),
  L('p10-4-2', 'p10-u4', '4.2', 'The Wave Equation', ['10-D1'],
    ['p10-frequency-period', 'p10-wave-equation'],
    ['Find a frequency from a count of waves, and change between frequency and period', 'Use wave speed = frequency × wavelength to find a speed, a frequency or a wavelength'],
    60, ['frequency', 'hertz', 'period', 'wave speed', 'wave equation']),
  L('p10-4-3', 'p10-u4', '4.3', 'Sound', ['10-D2'],
    ['p10-sound', 'p10-echo'],
    ['Describe how sound is made and travels, and link pitch to frequency and loudness to amplitude', 'Use the speed of sound to find distances and times, including for echoes'],
    60, ['sound', 'vibration', 'pitch', 'loudness', 'echo', 'ultrasound']),
  L('p10-4-4', 'p10-u4', '4.4', 'Reflection and Refraction', ['10-D2'],
    ['p10-reflection', 'p10-refraction'],
    ['Use the law of reflection, and describe the image in a plane mirror', 'Describe how light changes speed and direction when it passes from one material into another'],
    65, ['ray', 'normal', 'angle of incidence', 'angle of reflection', 'plane mirror', 'refraction']),
  L('p10-4-5', 'p10-u4', '4.5', 'The Electromagnetic Spectrum', ['10-D2'],
    ['p10-em-spectrum', 'p10-em-waves'],
    ['Order the waves of the electromagnetic spectrum, and give their uses and dangers', 'Use the speed of electromagnetic waves to find times, distances, wavelengths and frequencies'],
    60, ['electromagnetic wave', 'electromagnetic spectrum', 'speed of light', 'radio waves', 'microwaves', 'infrared', 'ultraviolet', 'X-rays', 'gamma rays']),

  // ---------------- Unit 5: Electricity ----------------
  L('p10-5-1', 'p10-u5', '5.1', 'Charge and Current', ['10-E1'],
    ['p10-charge', 'p10-current'],
    ['Describe electric charge, conductors and insulators, and what an electric current is', 'Use charge = current × time to find a charge, a current or a time'],
    60, ['electric charge', 'coulomb', 'conductor', 'insulator', 'electric current', 'ampere', 'conventional current']),
  L('p10-5-2', 'p10-u5', '5.2', 'Voltage, Resistance and Ohm’s Law', ['10-E1'],
    ['p10-resistance', 'p10-ohms-law'],
    ['Describe voltage and resistance, how they are measured, and what changes the current in a circuit', 'Use voltage = current × resistance to find a voltage, a current or a resistance'],
    65, ['voltage', 'potential difference', 'volt', 'resistance', 'ohm', 'ammeter', 'voltmeter', 'Ohm’s law']),
  L('p10-5-3', 'p10-u5', '5.3', 'Series Circuits', ['10-E2'],
    ['p10-series', 'p10-series-voltage'],
    ['Find the total resistance and the current of resistors in series', 'Describe current and voltage in a series circuit, and find how the supply voltage is shared'],
    60, ['series circuit', 'total resistance', 'supply voltage']),
  L('p10-5-4', 'p10-u5', '5.4', 'Parallel Circuits', ['10-E2'],
    ['p10-parallel', 'p10-parallel-resistance'],
    ['Describe current and voltage in a parallel circuit, and find the branch currents', 'Find the total resistance of two resistors in parallel, and compare it with series'],
    65, ['parallel circuit', 'branch', 'junction']),
  L('p10-5-5', 'p10-u5', '5.5', 'Electrical Power and Energy', ['10-E2'],
    ['p10-electrical-power', 'p10-electrical-energy'],
    ['Use power = current × voltage to find a power, a current or a voltage', 'Find the energy an appliance transfers in joules and in kilowatt-hours, and what it costs'],
    60, ['electrical power', 'watt', 'kilowatt-hour']),
];

export const UNITS: UnitMeta[] = [
  { id: 'p10-u1', number: 1, title: 'Describing Motion', description: 'Quantities and units, scalars and vectors, speed, displacement and velocity, acceleration, and distance-time and velocity-time graphs.', outcomes: ['10-A1', '10-A2'], lessons: [], color: 'sky' },
  { id: 'p10-u2', number: 2, title: 'Forces and Newton’s Laws', description: 'Kinds of force and net force, Newton’s three laws of motion, mass, weight and gravity, and friction and air resistance.', outcomes: ['10-B1', '10-B2'], lessons: [], color: 'rose' },
  { id: 'p10-u3', number: 3, title: 'Work, Energy and Power', description: 'Work, kinetic energy, gravitational potential energy, the conservation of energy, power and efficiency.', outcomes: ['10-C1', '10-C2'], lessons: [], color: 'amber' },
  { id: 'p10-u4', number: 4, title: 'Waves, Sound and Light', description: 'Transverse and longitudinal waves, frequency, period and the wave equation, sound and echoes, reflection and refraction, and the electromagnetic spectrum.', outcomes: ['10-D1', '10-D2'], lessons: [], color: 'violet' },
  { id: 'p10-u5', number: 5, title: 'Electricity', description: 'Charge and current, voltage, resistance and Ohm’s law, series and parallel circuits, and electrical power and energy.', outcomes: ['10-E1', '10-E2'], lessons: [], color: 'emerald' },
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
