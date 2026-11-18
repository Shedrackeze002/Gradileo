import type { Explainer, MotionEl } from '@/video/script.ts';

// Lesson 4.2, part 2: energy in simple harmonic motion. The block is the lesson's: 0.5 kg on a
// spring of 200 N/m with an amplitude of 10 cm, so the total energy is 1.00 J, the greatest speed
// is 2.00 m/s, and at 6 cm the spring holds 0.36 J and the block 0.64 J (1.60 m/s). The spring
// obeys Hooke's law in the motion itself (src/video/motion.ts), and the bars are worked out from
// where the block is and how fast it is moving, so they are not typed in.

const K = 200;
const M = 0.5;
/** One period: 2π√(0.5 ÷ 200) s, and the angular rate of 20 rad/s that goes with it. */
const T = 2 * Math.PI * Math.sqrt(M / K);
const RATE = Math.sqrt(K / M);
const SLOW = { slow: 8, note: 'Slow motion' };
const CREEP = { slow: 30, note: 'Slow motion' };

/** The block, let go from `A` metres to the right of where it rests. */
const block = (id: string, A: number, clips: MotionEl['clips'], height: number): MotionEl => ({
  kind: 'motion',
  id,
  span: [0, 0.5],
  lanes: [{ surface: 'smooth' }],
  bodies: [{ id: 'block', shape: 'block', mass: M, label: '', x: 0.25 + A, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: K, rest: 0.25, hidden: true },
  equilibrium: 0.25,
  cm: true,
  energy: { max: 1.1, bars: ['elastic', 'kinetic', 'total'], names: { total: 'Total energy' } },
  velocityScale: 60,
  height,
  clips,
});

/** Held at the extreme, then followed a quarter of an oscillation at a time, and then let run. */
const swap = block(
  'swap',
  0.1,
  {
    ready: { phases: [{ dur: 1, freeze: true }] },
    in: { phases: [{ dur: T / 4, ...CREEP }] },
    out: { phases: [{ dur: T / 4, ...CREEP }] },
    on: { phases: [{ dur: 2.5 * T, ...SLOW }] },
  },
  520,
);
swap.poster = 'in';

/** Two oscillations, with the bar for the total. */
const tot = block('tot', 0.1, { go: { phases: [{ dur: 2 * T, ...SLOW }] } }, 520);

/** One oscillation, and then a quarter more: the block is at equilibrium, at its fastest. */
const fast = block('fast', 0.1, { once: { phases: [{ dur: T, ...SLOW }] }, in: { phases: [{ dur: T / 4, ...CREEP }] } }, 520);

/** From the extreme in to 6 cm: 10 cos(20t) = 6. */
const part = block('part', 0.1, { go: { phases: [{ dur: Math.acos(0.6) / RATE, ...CREEP }] } }, 520);

/** The same block and spring from 5 cm and from 10 cm: a quarter of the energy, and half the greatest speed. */
const RUN = { go: { phases: [{ dur: 2 * T, ...SLOW }] } };
const half = block('half', 0.05, RUN, 520);
const full = block('full', 0.1, RUN, 520);

const video: Explainer = {
  id: 'p20-4-2-b',
  lessonId: 'p20-4-2',
  title: 'The Mass on a Spring, Part 2: Energy in an Oscillation',
  thumbnailTitle: 'Energy in an Oscillation',
  thumbnail: 'swap',
  summary:
    'Where does the energy of an oscillating mass go? Watch it swap between the elastic potential energy of the spring and the kinetic energy of the block while the total stays the same, then use E = ½kA² to find the total energy, the greatest speed, and the speed part of the way out.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'Energy in an Oscillation', subtitle: 'Elastic and kinetic, swapping back and forth' }],
      lines: [
        { say: 'A mass on a spring speeds up and slows down, over and over. So its kinetic energy keeps changing.', show: 'title' },
        { say: 'This lesson follows that energy. It is never lost. It moves into the spring, and back out again.' },
      ],
    },
    {
      chapter: 'The energy swaps',
      layout: 'center',
      main: [swap],
      lines: [
        { say: 'Here is a block of 0.5 kilograms on a spring, on a frictionless surface. Hold it ten centimetres from equilibrium. The stretched spring stores elastic potential energy, and the block has no kinetic energy.', show: ['swap', 'swap.amplitude', 'swap.energy'], play: 'swap.ready' },
        { say: 'Let go. The spring gives up its energy, and the block gains kinetic energy. At equilibrium the spring is neither stretched nor squeezed, so all of the energy is kinetic.', show: 'swap.velocity', play: 'swap.in', playDelay: 4 },
        { say: 'The block overshoots, and squeezes the spring. Its kinetic energy goes back into the spring, until the block stops at the other extreme.', play: 'swap.out', playDelay: 3 },
        { say: 'And so it goes on. The energy swaps between elastic and kinetic, and back, twice in every oscillation.', play: 'swap.on' },
      ],
    },
    {
      chapter: 'The total energy',
      layout: 'split',
      leftWidth: 640,
      left: [tot],
      right: [{ kind: 'math', id: 'e', size: 'md', lines: ['\\brand{E = \\dfrac{1}{2}kA^2}', 'E = \\dfrac{1}{2} \\times 200 \\times 0.1^2', 'E = \\thc{1.00\\ \\text{J}}'] }],
      lines: [
        { say: 'Now add the two bars together. The sum never changes. Only the spring does work on the block, so mechanical energy is conserved.', show: ['tot', 'tot.amplitude', 'tot.energy', 'tot.total', 'tot.velocity'], play: 'tot.go', playDelay: 2 },
        { say: 'At an extreme, all of that energy is elastic. So the total energy is a half k A squared, where capital A is the amplitude.', show: 'e.0' },
        { say: 'This spring has a spring constant of 200 newtons per metre. The amplitude is ten centimetres, which is 0.1 metres. So the energy is a half, times 200, times 0.1 squared.', show: 'e.1' },
        { say: 'The total energy is one joule.', show: 'e.2' },
      ],
    },
    {
      chapter: 'The greatest speed',
      layout: 'split',
      leftWidth: 640,
      left: [fast],
      right: [{ kind: 'math', id: 'v', size: 'md', lines: ['\\dfrac{1}{2}mv^2 = 1.00\\ \\text{J}', 'v = \\sqrt{\\dfrac{2E}{m}} = \\sqrt{\\dfrac{2 \\times 1.00}{0.5}}', 'v = \\sqrt{4} = \\good{2.00\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Where is the block moving fastest? At equilibrium, where all of the one joule is kinetic energy.', show: ['fast', 'fast.amplitude', 'fast.energy', 'fast.velocity'], play: 'fast.once', playDelay: 1 },
        { say: 'There, a half m v squared equals one joule. So the speed is the square root of two E over m.', show: ['v.0', 'v.1'] },
        { say: 'Two times one, over 0.5, is four, and the square root of four is two. The greatest speed is two metres per second. Watch the block reach it.', show: ['v.2', 'fast.readout'], play: 'fast.in', playDelay: 8 },
      ],
    },
    {
      chapter: 'Part of the way out',
      layout: 'split',
      leftWidth: 640,
      left: [part],
      right: [{ kind: 'math', id: 'p', size: 'md', lines: ['E_e = \\dfrac{1}{2} \\times 200 \\times 0.06^2', 'E_e = \\brand{0.36\\ \\text{J}}', 'E_k = 1.00 - 0.36 = \\good{0.64\\ \\text{J}}', 'v = \\sqrt{\\dfrac{2 \\times 0.64}{0.5}} = \\good{1.60\\ \\text{m/s}}'] }],
      lines: [
        { say: 'How fast is the block when it is six centimetres from equilibrium? Let it go, and stop it there.', show: ['part', 'part.amplitude', 'part.energy', 'part.total', 'part.displacement'], play: 'part.go', playDelay: 5 },
        { say: 'The energy in the spring is a half k x squared: a half, times 200, times 0.06 squared. That is 0.36 joules.', show: ['p.0', 'p.1'] },
        { say: 'The rest of the one joule is kinetic. One minus 0.36 is 0.64 joules.', show: 'p.2' },
        { say: 'So the speed is the square root of two times 0.64, over 0.5. That is 1.6 metres per second.', show: ['p.3', 'part.velocity', 'part.readout'] },
        { say: 'Notice the trap here. At six centimetres out of ten, the spring does not hold sixty percent of the energy. Elastic energy depends on x squared, so it holds only thirty-six percent.' },
      ],
    },
    {
      chapter: 'Twice the amplitude',
      layout: 'split',
      leftWidth: 544,
      left: [half],
      right: [full],
      lines: [
        { say: 'What does a larger amplitude do to the energy? Here are the same block and spring, let go from five centimetres, and from ten.', show: ['half', 'full', 'half.amplitude', 'full.amplitude', 'half.energy', 'full.energy', 'half.total', 'full.total'] },
        { say: 'Watch the bars.', show: ['half.velocity', 'full.velocity'], play: ['half.go', 'full.go'], playDelay: 1 },
        { say: 'Twice the amplitude gives four times the energy: one joule, against a quarter of a joule. That is because the amplitude is squared. The greatest speed is twice as large, and the two blocks still stay in step.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 0.2 kg mass oscillates on a spring with a spring constant of 80 N/m, with an amplitude of 5 cm, on a frictionless surface. What is its greatest speed?',
          choices: ['$0.10\\ \\text{m/s}$', '$100\\ \\text{m/s}$', '$0.71\\ \\text{m/s}$', '$1.0\\ \\text{m/s}$'],
          answer: 3,
          working: 'Change the units: $A = 5\\ \\text{cm} = 0.05\\ \\text{m}$. Total energy: $E = \\dfrac{1}{2} \\times 80 \\times 0.05^2 = 0.10\\ \\text{J}$. At equilibrium it is all kinetic: $v = \\sqrt{\\dfrac{2 \\times 0.10}{0.2}} = \\sqrt{1} = 1.0\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A mass of 0.2 kilograms oscillates on a spring with a spring constant of eighty newtons per metre, with an amplitude of five centimetres. What is its greatest speed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Five centimetres is 0.05 metres. The total energy is a half, times eighty, times 0.05 squared, which is 0.1 joules. At equilibrium that is all kinetic. Two times 0.1, over 0.2, is one, so the greatest speed is one metre per second. That is choice D. 0.1 is the energy, not the speed.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Total energy of a mass on a spring: $E = \\dfrac{1}{2}kA^2$',
            'At an **extreme** it is all elastic; at **equilibrium** it is all kinetic',
            'At any point: $\\dfrac{1}{2}mv^2 + \\dfrac{1}{2}kx^2 = \\dfrac{1}{2}kA^2$',
            'Twice the amplitude: **four times** the energy, twice the greatest speed',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The total energy of a mass on a spring is a half k A squared.', show: 'sum.0' },
        { say: 'At an extreme it is all elastic potential energy, and at equilibrium it is all kinetic energy.', show: 'sum.1' },
        { say: 'At any point between, the kinetic energy and the elastic energy add up to the total.', show: 'sum.2' },
        { say: 'And twice the amplitude means four times the energy, and twice the greatest speed.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
