import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.2: kinetic energy = ½mv². The work of a push becomes a trolley's kinetic energy; two
// fair tests (twice the mass, twice the speed) show what each does to it; and two cars braking
// with the same force show why twice the speed needs four times the distance to stop. Every bar
// is measured from the motion (src/video/motion.ts).

const push = (on: string, n: number): MotionForce => ({ on, name: 'Push', n, tone: 'opp' });

// A 4 kg trolley pushed with 10 N for two seconds: 2.5 m/s², so 5 m/s after 5 m. 10 × 5 = 50 J.
const trolley: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9],
  height: 400,
  lanes: [{ surface: 'smooth', label: 'A 4 kg trolley on a smooth track' }],
  bodies: [{ id: 't', shape: 'cart', mass: 4, x: 1.4 }],
  energy: { max: 60, bars: ['work', 'kinetic'] },
  forceScale: 9,
  velocityScale: 18,
  poster: 'push',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: [push('t', 10)] }] },
    push: { phases: [{ dur: 2, forces: [push('t', 10)] }] },
  },
};

/** A fair test on two tracks: each trolley is pushed for two seconds, then rolls on for a moment. */
const test = (o: { masses: [number, number]; forces: [number, number]; span: number; max: number; velocityScale: number }): MotionEl => {
  const forces = [push('a', o.forces[0]), push('b', o.forces[1])];
  return {
    kind: 'motion',
    id: 'sim',
    span: [0, o.span],
    height: 500,
    lanes: [
      { surface: 'smooth', label: 'Trolley A', labelSide: 'right' },
      { surface: 'smooth', label: 'Trolley B', labelSide: 'right' },
    ],
    bodies: [
      { id: 'a', shape: 'cart', mass: o.masses[0], x: 1, lane: 0, tone: 'adj' },
      { id: 'b', shape: 'cart', mass: o.masses[1], x: 1, lane: 1, tone: 'hyp', width: 1.1 * Math.sqrt(o.masses[1] / o.masses[0]) },
    ],
    energy: { of: ['a', 'b'], max: o.max, bars: ['kinetic'], labels: { a: 'A', b: 'B' } },
    forceScale: 5,
    velocityScale: o.velocityScale,
    poster: 'go',
    clips: {
      go: { phases: [{ dur: 2, forces }, { dur: 0.3 }] },
    },
  };
};

// Twice the mass at the same speed: 4 kg and 8 kg, both brought to 5 m/s. 50 J and 100 J.
const masses = test({ masses: [4, 8], forces: [10, 20], span: 12, max: 240, velocityScale: 18 });
// Twice the speed with the same mass: 4 kg at 5 m/s and at 10 m/s. 50 J and 200 J.
const speeds = test({ masses: [4, 4], forces: [10, 20], span: 21, max: 240, velocityScale: 10 });

// Two 1000 kg cars, at 10 m/s and at 20 m/s, braking with the same 5000 N: car A stops in 10 m
// (2 s) and car B in 40 m (4 s). 50 kJ and 200 kJ become heat in the brakes.
const brakes = (on: string): MotionForce => ({ on, name: 'Brakes', n: -5000, resist: true, tone: 'bad' });
const cars: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 46],
  height: 600,
  lanes: [
    // No labels: each car's letter is on it, and its speed over it.
    { surface: 'rough' },
    { surface: 'rough' },
  ],
  bodies: [
    { id: 'a', shape: 'cart', mass: 1000, label: 'A', x: 3, v: 10, lane: 0, width: 4.2, tone: 'adj' },
    { id: 'b', shape: 'cart', mass: 1000, label: 'B', x: 3, v: 20, lane: 1, width: 4.2, tone: 'hyp' },
  ],
  energy: { of: ['a', 'b'], max: 230000, bars: ['kinetic', 'heat'] },
  forceScale: 0.016,
  velocityScale: 5,
  poster: 'brake',
  clips: {
    brake: { phases: [{ dur: 4.5, forces: [brakes('a'), brakes('b')] }] },
  },
};

const video: Explainer = {
  id: 'p10-3-2',
  lessonId: 'p10-3-2',
  title: 'Kinetic Energy',
  thumbnail: 'sim',
  summary:
    'Anything that moves has kinetic energy: half the mass times the speed squared. Watch the work of a push become a trolley’s kinetic energy, test what twice the mass and twice the speed do to it, and see why a car at twice the speed needs four times the distance to stop.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work, Energy and Power', title: 'Kinetic Energy', subtitle: 'The energy of anything that moves' }],
      lines: [
        { say: 'A moving object can do things that a resting one cannot. A rolling bowling ball knocks down pins, and a moving hammer drives in a nail.', show: 'title' },
        { say: 'The energy an object has because it is moving is called kinetic energy. In this lesson, you will see where it comes from, and what decides how much there is.' },
      ],
    },
    {
      chapter: 'The energy of motion',
      layout: 'center',
      main: [trolley, { kind: 'math', id: 'ke', size: 'md', lines: ['\\good{E_k} = \\tfrac12 mv^2 = \\tfrac12 \\times 4 \\times 5^2 = \\tfrac12 \\times 4 \\times 25 = \\good{50\\ \\text{J}}'] }],
      lines: [
        { say: 'This trolley has a mass of four kilograms, and it is at rest. A push of ten newtons is about to act on it for five metres.', show: 'sim', play: 'sim.ready', playDelay: 4 },
        { say: 'Ten newtons times five metres is fifty joules of work. Watch where that energy goes.', show: ['sim.energy', 'sim.velocity', 'sim.distance'], play: 'sim.push', playDelay: 4.5 },
        { say: 'The trolley is now moving at five metres per second, and the fifty joules of work have become its kinetic energy.', focus: 'sim.t' },
        { say: 'There is a formula that gives the kinetic energy straight from the mass and the speed. Kinetic energy equals half, times the mass, times the speed squared.', show: 'ke' },
        { say: 'Square the speed first. Five squared is twenty-five. Then half of four, times twenty-five, is fifty joules. That is exactly the work that was done.' },
      ],
    },
    {
      chapter: 'Twice the mass',
      layout: 'center',
      main: [masses, { kind: 'text', id: 'm2', size: 'md', md: 'Same speed, **twice the mass**: **twice** the kinetic energy.' }],
      lines: [
        { say: 'What does mass do to kinetic energy? Here is a fair test. Trolley A is four kilograms, and trolley B is eight. Both are pushed up to the same speed, five metres per second.', show: ['sim', 'sim.velocity', 'sim.energy'], play: 'sim.go', playDelay: 8 },
        { say: 'Trolley A has fifty joules, as before. Trolley B has one hundred. At the same speed, twice the mass has twice the kinetic energy.', show: 'm2', focus: 'sim.b' },
      ],
    },
    {
      chapter: 'Twice the speed',
      layout: 'center',
      main: [speeds, { kind: 'math', id: 'v2', size: 'md', lines: ['\\tfrac12 \\times 4 \\times 5^2 = \\good{50\\ \\text{J}} \\qquad \\tfrac12 \\times 4 \\times 10^2 = \\good{200\\ \\text{J}}'] }],
      lines: [
        { say: 'Now the speed. Both trolleys are four kilograms. This time, trolley B is pushed up to ten metres per second, twice the speed of trolley A.', show: ['sim', 'sim.velocity', 'sim.energy'], play: 'sim.go', playDelay: 6 },
        { say: 'Trolley B does not have twice the energy. It has two hundred joules, four times as much.', focus: 'sim.b' },
        { say: 'This is because the speed is squared. Five squared is twenty-five, but ten squared is one hundred. Twice the speed means four times the kinetic energy, and three times the speed means nine times.', show: 'v2' },
      ],
    },
    {
      chapter: 'Why speed is dangerous',
      layout: 'center',
      main: [cars],
      lines: [
        { say: 'This matters on the road. Two cars have the same mass, one thousand kilograms. Car A travels at ten metres per second, and car B at twenty.', show: ['sim', 'sim.velocity', 'sim.energy'] },
        { say: 'To stop a car, the brakes must take away all of its kinetic energy, and turn it into heat. Both drivers brake at the same moment, with the same force.', show: 'sim.distance', play: 'sim.brake', playDelay: 7.5 },
        { say: 'Car A stopped in ten metres. Car B had four times the kinetic energy to lose, so it needed four times the distance: forty metres.', focus: 'sim.b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball of mass 2 kg moves at 6 m/s. What is its kinetic energy?',
          choices: ['6 J', '12 J', '18 J', '36 J'],
          answer: 3,
          working: '$E_k = \\tfrac12 mv^2 = \\tfrac12 \\times 2 \\times 6^2 = \\tfrac12 \\times 2 \\times 36 = 36\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball of mass two kilograms moves at six metres per second. What is its kinetic energy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Square the speed first. Six squared is thirty-six. Half of two, times thirty-six, is thirty-six joules. That is choice D.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'end',
          check: true,
          items: [
            'Kinetic energy is the energy of motion: $E_k = \\tfrac12 mv^2$, in joules',
            'Square the speed first, and only the speed',
            'Twice the mass gives twice the kinetic energy',
            'Twice the speed gives four times the kinetic energy',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Kinetic energy is the energy of motion. It equals half, times the mass, times the speed squared.', show: 'end.0' },
        { say: 'Square the speed first, and only the speed.', show: 'end.1' },
        { say: 'Twice the mass gives twice the kinetic energy.', show: 'end.2' },
        { say: 'And twice the speed gives four times the kinetic energy.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
