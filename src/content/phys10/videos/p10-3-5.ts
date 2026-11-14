import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.5: power = energy transferred ÷ time. Two motors lift the same load through the same
// height, one in half the time; a student climbs the same stairs running and then walking. The
// work is measured from the motion (src/video/motion.ts and src/video/path.ts), and the clock
// shows what differs.

const G = 9.8;

// Two 50 kg loads (490 N) lifted 10 m: motor A at 0.5 m/s takes 20 s, motor B at 1 m/s takes 10 s.
// Each does 490 × 10 = 4900 J. The lift plays four times as fast.
const hold = (on: string): MotionForce[] => [
  { on, name: 'Lift', n: 50 * G, tone: 'opp' },
  { on, name: 'Weight', n: -50 * G, tone: 'hyp' },
];
const FORCES = [...hold('a'), ...hold('b')];
const motors: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: 'up',
  span: [0, 10],
  height: 430,
  lanes: [{ label: 'Motor A' }, { label: 'Motor B' }],
  bodies: [
    { id: 'a', shape: 'block', mass: 50, x: 0, lane: 0, width: 1.9, tone: 'adj' },
    { id: 'b', shape: 'block', mass: 50, x: 0, lane: 1, width: 1.9, tone: 'brand' },
  ],
  energy: { of: ['a', 'b'], max: 5600, bars: ['work'], g: G, labels: { a: 'Motor A', b: 'Motor B' } },
  forceScale: 0.11,
  velocityScale: 30,
  poster: 'lift',
  clips: {
    ready: { phases: [{ dur: 1, freeze: true, forces: FORCES }] },
    lift: {
      phases: [
        { dur: 10, slow: 0.25, set: { a: 0.5, b: 1 }, forces: FORCES, note: 'Four times as fast' },
        { dur: 10, slow: 0.25, set: { b: 0 }, forces: FORCES, note: 'Four times as fast' },
        { dur: 0.001, set: { a: 0 }, forces: FORCES },
      ],
    },
  },
};

// A 60 kg student climbs stairs 5 m high, drawn as a slope 7 m along: running takes 4 s and
// walking 12 s. The force along the slope balances gravity's pull along it, so each climb does
// mgh = 60 × 9.8 × 5 = 2940 J of work.
const STAIRS = Math.hypot(7, 5);
const CLIMB: MotionForce = { on: 'student', name: 'Climb', n: (60 * G * 5) / STAIRS, tone: 'opp' };
const climb = (seconds: number) => [
  { dur: seconds, set: { student: STAIRS / seconds }, forces: [CLIMB] },
  { dur: 0.001, set: { student: 0 }, forces: [CLIMB] },
];
const stairs: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, STAIRS],
  height: 470,
  path: { g: G, points: [[0, 0], [7, 5]] },
  bodies: [{ id: 'student', shape: 'ball', mass: 60, x: 0, width: 1.1, label: '60 kg', tone: 'adj' }],
  energy: { max: 3400, bars: ['work'] },
  velocityScale: 16,
  poster: 'run',
  clips: {
    run: { phases: climb(4) },
    walk: { reset: true, phases: climb(12) },
  },
};

const video: Explainer = {
  id: 'p10-3-5',
  lessonId: 'p10-3-5',
  title: 'Power',
  thumbnail: 'sim',
  summary:
    'Power is how quickly energy is transferred: power = energy ÷ time, in watts. Watch two motors do the same work in different times, compare running and walking up the same stairs, and use power and time to find the energy an appliance transfers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work, Energy and Power', title: 'Power', subtitle: 'How quickly energy is transferred' }],
      lines: [
        { say: 'Two people carry identical boxes up the same staircase. One walks, and one runs. They do exactly the same work, because the force and the height are the same.', show: 'title' },
        { say: 'What differs is how quickly they do it. That is what power measures.' },
      ],
    },
    {
      chapter: 'The same work, done faster',
      layout: 'center',
      main: [
        motors,
        {
          kind: 'math',
          id: 'p',
          size: 'md',
          lines: ['\\text{power} = \\dfrac{\\text{energy transferred}}{\\text{time}} \\qquad P_A = \\dfrac{4900}{20} = \\thc{245\\ \\text{W}} \\qquad P_B = \\dfrac{4900}{10} = \\thc{490\\ \\text{W}}'],
        },
      ],
      lines: [
        { say: 'Two motors each lift a fifty kilogram load through ten metres. On Earth, g is nine point eight newtons per kilogram, so each load weighs four hundred and ninety newtons.', show: 'sim', play: 'sim.ready', playDelay: 6 },
        { say: 'Lifting it through ten metres takes four hundred and ninety, times ten, which is four thousand nine hundred joules of work. That is the same for both motors. But watch the clock.', show: ['sim.energy', 'sim.clock'], play: 'sim.lift', playDelay: 9 },
        { say: 'Motor B finished in ten seconds. Motor A took twenty. They did exactly the same work, but motor B did it twice as quickly.', focus: 'sim.b' },
        { say: 'How quickly work is done is called power. Power equals the energy transferred, divided by the time taken. For motor A, four thousand nine hundred joules in twenty seconds is two hundred and forty-five joules every second.', show: 'p' },
        { say: 'A joule every second is called a watt. So motor A has a power of two hundred and forty-five watts. Motor B, in half the time, has twice the power: four hundred and ninety watts.' },
      ],
    },
    {
      chapter: 'Your own power',
      layout: 'center',
      main: [stairs, { kind: 'math', id: 'run', size: 'md', lines: ['\\text{running: } P = \\dfrac{2940}{4} = \\thc{735\\ \\text{W}} \\qquad \\text{walking: } P = \\dfrac{2940}{12} = \\thc{245\\ \\text{W}}'] }],
      lines: [
        { say: 'You can measure your own power on a staircase. This student has a mass of sixty kilograms, and the stairs are five metres high. Climbing them takes m g h of work: sixty, times nine point eight, times five, which is two thousand nine hundred and forty joules.', show: ['sim', 'sim.height', 'sim.energy', 'sim.clock'] },
        { say: 'First, the student runs up, in four seconds.', play: 'sim.run', playDelay: 0.5 },
        { say: 'Two thousand nine hundred and forty joules in four seconds is a power of seven hundred and thirty-five watts.', show: 'run.0' },
        { say: 'Now the same student walks up, and takes twelve seconds. The work is the same as before, because the mass and the height are the same. But it is spread over three times as long.', play: 'sim.walk', playDelay: 0.5 },
        { say: 'So the power is only two hundred and forty-five watts. More time for the same work means less power.' },
      ],
    },
    {
      chapter: 'Energy from power',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'lg', lines: ['E = P \\times t', '2\\ \\text{kW} = 2000\\ \\text{W} \\qquad 5\\ \\text{min} = 300\\ \\text{s}', 'E = 2000 \\times 300 = 600\\,000\\ \\text{J} = \\thc{600\\ \\text{kJ}}'] },
      ],
      lines: [
        { say: 'Turn the formula round, and power tells you how much energy an appliance transfers. Energy equals power times time.', show: 'e.0' },
        { say: 'A kettle has a power of two kilowatts, and it is switched on for five minutes. First change the units. Two kilowatts is two thousand watts. And a watt is a joule every second, so the time must be in seconds: five minutes is three hundred seconds.', show: 'e.1' },
        { say: 'Two thousand, times three hundred, is six hundred thousand joules, or six hundred kilojoules.', show: 'e.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A motor transfers 3000 J of energy in 20 s. What is its power?',
          choices: ['150 W', '300 W', '3020 W', '60 000 W'],
          answer: 0,
          working: '$P = \\dfrac{E}{t} = \\dfrac{3000}{20} = 150\\ \\text{W}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A motor transfers three thousand joules of energy in twenty seconds. What is its power? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Power is energy divided by time. Three thousand divided by twenty is one hundred and fifty watts. That is choice A.', show: 'q.answer' },
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
            'Power is the energy transferred each second: $P = \\dfrac{E}{t}$, in watts',
            '1 W = 1 J/s, and 1 kW = 1000 W',
            'The same work in less time means more power',
            'Energy = power × time, with the time in seconds',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Power is the energy transferred each second. It equals energy divided by time, and it is measured in watts.', show: 'end.0' },
        { say: 'One watt is one joule per second, and one kilowatt is one thousand watts.', show: 'end.1' },
        { say: 'The same work done in less time means more power.', show: 'end.2' },
        { say: 'And energy equals power times time, with the time in seconds.', show: 'end.3' },
      ],
    },
  ],
};

export default video;
