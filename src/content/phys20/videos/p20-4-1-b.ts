import type { Explainer, MotionEl } from '@/video/script.ts';

// Lesson 4.1, part 2: the restoring force. The block is on the lesson's spring of 50 N/m, with a
// mass of 0.5 kg and an amplitude of 8 cm, so the force at an extreme is 4 N and the greatest
// acceleration is 8 m/s². The force arrow is the spring's own, worked out from Hooke's law as the
// block moves (src/video/motion.ts), so it shrinks to nothing at equilibrium by itself.

/** One period of the lesson's block: 2π√(0.5 ÷ 50) s. */
const T = 2 * Math.PI * Math.sqrt(0.5 / 50);
const SLOW = { slow: 6, note: 'Slow motion' };

const block = (id: string, clips: MotionEl['clips'], height: number): MotionEl => ({
  kind: 'motion',
  id,
  span: [0, 0.5],
  bodies: [{ id: 'block', shape: 'block', mass: 0.5, label: '', x: 0.3, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: 50, rest: 0.22 },
  equilibrium: 0.22,
  cm: true,
  forceScale: 26,
  velocityScale: 110,
  height,
  clips,
});

/** Held at the right extreme, then let go for two oscillations. */
const pull = block('pull', { ready: { phases: [{ dur: 1, freeze: true }] }, go: { phases: [{ dur: 2 * T, ...SLOW }] } }, 420);
pull.poster = 'go';

/**
 * The same block followed a quarter of an oscillation at a time: extreme, middle, other extreme.
 * It makes one oscillation first, so that the acceleration it shows at the extreme is the one it has.
 */
const ends = block(
  'ends',
  {
    once: { phases: [{ dur: T, ...SLOW }] },
    middle: { phases: [{ dur: T / 4, ...SLOW, slow: 14 }] },
    left: { phases: [{ dur: T / 4, ...SLOW, slow: 14 }] },
    on: { phases: [{ dur: 1.5 * T, ...SLOW }] },
  },
  420,
);

/** The lesson's first two examples: the block at its extreme, 8 cm out. */
const size = block('size', { once: { phases: [{ dur: T, ...SLOW }] }, go: { phases: [{ dur: T, ...SLOW }] } }, 420);

/**
 * The lesson's third example: 0.5 kg on 100 N/m, with an acceleration of 5 m/s² to the left when
 * it is 2.5 cm to the right. From an amplitude of 5 cm that is a sixth of an oscillation in.
 */
const T_FIND = 2 * Math.PI * Math.sqrt(0.5 / 100);
const find: MotionEl = {
  kind: 'motion',
  id: 'find',
  span: [0, 0.5],
  bodies: [{ id: 'block', shape: 'block', mass: 0.5, label: '', x: 0.27, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: 100, rest: 0.22 },
  equilibrium: 0.22,
  cm: true,
  forceScale: 26,
  height: 420,
  clips: { go: { phases: [{ dur: T_FIND / 6, slow: 30, note: 'Slow motion' }] } },
};

const video: Explainer = {
  id: 'p20-4-1-b',
  lessonId: 'p20-4-1',
  title: 'Simple Harmonic Motion, Part 2: The Restoring Force',
  thumbnailTitle: 'The Restoring Force',
  thumbnail: 'pull',
  summary:
    'Why does an oscillating mass keep coming back? Watch the force of a spring point back towards equilibrium wherever the block is, growing with the displacement, and see why the force is greatest where the block stops and zero where it is fastest. Then use F = −kx to find a force, an acceleration and a position.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Oscillations and Waves', title: 'The Restoring Force', subtitle: 'Why an oscillation keeps coming back' }],
      lines: [
        { say: 'An oscillating mass never settles for long. Whenever it moves away from the middle, something brings it back.', show: 'title' },
        { say: 'This lesson is about that something: the restoring force.' },
      ],
    },
    {
      chapter: 'The restoring force',
      layout: 'center',
      main: [pull],
      lines: [
        { say: 'Hold this block eight centimetres to the right of its equilibrium position. The stretched spring pulls it to the left, back towards the middle.', show: ['pull', 'pull.amplitude'], play: 'pull.ready' },
        { say: 'Now let go, and watch the force. On the right, the spring pulls to the left. On the left, the squeezed spring pushes to the right.', play: 'pull.go', playDelay: 1.5 },
        { say: 'Whenever the block is away from equilibrium, the force points back towards it. This is the restoring force.' },
        { say: 'And the further the block is from equilibrium, the larger the force. For a spring, Hooke’s law gives its size: k times x.' },
      ],
    },
    {
      chapter: 'Simple harmonic motion',
      layout: 'center',
      main: [ends, { kind: 'math', id: 'f', size: 'md', lines: ['\\brand{F = -kx} \\qquad a = -\\dfrac{kx}{m}'] }],
      lines: [
        { say: 'An object is in simple harmonic motion when the restoring force on it is proportional to its displacement, and points towards the equilibrium position. F equals minus k x.', show: ['ends', 'ends.amplitude', 'ends.displacement', 'f.0'], play: 'ends.once', playDelay: 2 },
        { say: 'The minus sign says that the force is always opposite to the displacement. By Newton’s second law, the acceleration is minus k x over m.' },
        { say: 'That one rule explains the whole motion. At an extreme, the displacement is greatest, so the force and the acceleration are greatest. But the block has stopped, for an instant.', show: ['ends.velocity', 'ends.readout'] },
        { say: 'The force speeds the block up, towards the middle. At equilibrium there is no force, and no acceleration. But the block is now moving at its fastest, so it overshoots.', play: 'ends.middle' },
        { say: 'Now the force builds up against the motion. It stops the block at the other extreme, and sends it back.', play: 'ends.left' },
        { say: 'So do not think that the force is greatest where the speed is greatest. It is the other way round.', play: 'ends.on' },
      ],
    },
    {
      chapter: 'The size of the force',
      layout: 'split',
      leftWidth: 640,
      left: [size],
      right: [{ kind: 'math', id: 's', size: 'md', lines: ['x = 8\\ \\text{cm} = 0.08\\ \\text{m}', 'F = kx = 50 \\times 0.08', 'F = \\brand{4\\ \\text{N}}', 'a = \\dfrac{F}{m} = \\dfrac{4}{0.5} = \\thc{8\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Put numbers on it. This spring has a spring constant of fifty newtons per metre, and the block is eight centimetres from equilibrium. How large is the restoring force?', show: ['size', 'size.amplitude', 'size.displacement'], play: 'size.once', playDelay: 2 },
        { say: 'Change the units first: eight centimetres is 0.08 metres. Then the force is k times x: fifty times 0.08.', show: ['s.0', 's.1'] },
        { say: 'That is four newtons, towards the equilibrium position.', show: 's.2' },
        { say: 'The block has a mass of 0.5 kilograms. Its acceleration is greatest at an extreme, where the force is four newtons. Four over 0.5 is eight metres per second squared.', show: ['s.3', 'size.readout'] },
        { say: 'Let it go, and the acceleration is never larger than that.', play: 'size.go' },
      ],
    },
    {
      chapter: 'From an acceleration to a position',
      layout: 'split',
      leftWidth: 640,
      left: [find],
      right: [{ kind: 'math', id: 'p', size: 'md', lines: ['F = ma = 0.5 \\times 5 = \\brand{2.5\\ \\text{N}}', 'x = \\dfrac{F}{k} = \\dfrac{2.5}{100} = 0.025\\ \\text{m}', '\\good{2.5\\ \\text{cm to the right}}'] }],
      lines: [
        { say: 'The rule works backwards, too. A block of 0.5 kilograms oscillates on a spring of 100 newtons per metre. At one instant, its acceleration is five metres per second squared, to the left. Where is the block?', show: ['find', 'find.amplitude'] },
        { say: 'The restoring force is the mass times the acceleration: 0.5 times five, which is 2.5 newtons.', show: 'p.0' },
        { say: 'The displacement is the force over the spring constant: 2.5 over 100, which is 0.025 metres.', show: 'p.1' },
        { say: 'On which side? The acceleration points to the left, towards equilibrium. So the block must be on the right: 2.5 centimetres to the right of the equilibrium position. Watch it get there.', show: ['p.2', 'find.displacement', 'find.readout'], play: 'find.go', playDelay: 11 },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 0.2 kg mass on a spring with a spring constant of 40 N/m is 5 cm from its equilibrium position. What is the size of its acceleration?',
          choices: ['$1000\\ \\text{m/s}^2$', '$10\\ \\text{m/s}^2$', '$2\\ \\text{m/s}^2$', '$0.4\\ \\text{m/s}^2$'],
          answer: 1,
          working: 'Change the units: $x = 5\\ \\text{cm} = 0.05\\ \\text{m}$. Force: $F = kx = 40 \\times 0.05 = 2\\ \\text{N}$. Acceleration: $a = \\dfrac{F}{m} = \\dfrac{2}{0.2} = 10\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A mass of 0.2 kilograms, on a spring with a spring constant of forty newtons per metre, is five centimetres from its equilibrium position. What is the size of its acceleration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Five centimetres is 0.05 metres. The force is forty times 0.05, which is two newtons. And two over 0.2 is ten metres per second squared. That is choice B. Two is the force, not the acceleration.', show: 'q.answer' },
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
            'A **restoring force** always points towards the equilibrium position',
            'Simple harmonic motion: $F = -kx$, so $a = -\\dfrac{kx}{m}$',
            'At an **extreme**: force and acceleration greatest, speed zero',
            'At **equilibrium**: force and acceleration zero, speed greatest',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A restoring force always points towards the equilibrium position.', show: 'sum.0' },
        { say: 'In simple harmonic motion, that force is proportional to the displacement: F equals minus k x.', show: 'sum.1' },
        { say: 'At an extreme, the force and the acceleration are greatest, and the speed is zero.', show: 'sum.2' },
        { say: 'At equilibrium, the force and the acceleration are zero, and the speed is greatest.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
