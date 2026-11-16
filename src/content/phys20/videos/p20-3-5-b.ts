import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.5, part 2: springs and elastic potential energy. Every spring obeys Hooke's law in the
// motion itself (src/video/motion.ts), so the extensions and energies on screen are the lesson's:
// 250 N/m needs 25 N for 0.1 m and stores 1.25 J there; 400 N/m compressed by 5 cm stores 0.5 J;
// and a 1.5 kg mass stretches a spring of 117.7 N/m by 12.5 cm, which stores 0.920 J.

/** A little hidden damping, so that a block pulled by a steady force settles where the spring balances it. */
const settle = (on: string, drag: number): MotionForce => ({ on, name: 'Damping', n: 0, drag, hidden: true });

/** The lesson's spring of 250 N/m: a pull of 25 N stretches it by 0.1 m, and 50 N by 0.2 m. */
const hooke: MotionEl = {
  kind: 'motion',
  id: 'hooke',
  span: [0, 0.7],
  bodies: [{ id: 'block', shape: 'block', mass: 0.5, label: '', x: 0.26, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: 250, rest: 0.26 },
  forceScale: 2,
  height: 360,
  poster: 'two',
  clips: {
    one: { phases: [{ dur: 0.6, slow: 4, forces: [{ on: 'block', name: 'Pull', n: 25 }, settle('block', 22)] }] },
    two: { phases: [{ dur: 0.6, slow: 4, forces: [{ on: 'block', name: 'Pull', n: 50 }, settle('block', 22)] }] },
  },
};

/** The same spring stretched slowly to 0.1 m: the pull grows in step with the extension, from zero to 25 N. */
const grows: MotionForce = { on: 'block', name: 'Pull', n: 0, profile: [[0, 0], [0.1, 25]] };
const store: MotionEl = {
  kind: 'motion',
  id: 'store',
  span: [0, 0.4],
  bodies: [{ id: 'block', shape: 'block', mass: 0.5, label: '', x: 0.16, width: 0.05, tone: 'adj' }],
  spring: { on: 'block', k: 250, rest: 0.16 },
  graph: { of: ['block'], y: 'force', force: 'Pull', seconds: 0, metres: 0.15, max: 30 },
  forceScale: 2,
  height: 560,
  clips: {
    // The pull balances the spring all the way, so the block moves out at a steady 0.025 m/s.
    stretch: { phases: [{ dur: 4, set: { block: 0.025 }, forces: [grows] }, { dur: 0.5, set: { block: 0 }, forces: [grows] }] },
  },
};

/** The lesson's spring of 400 N/m, compressed by 5 cm behind a block of 0.25 kg: its 0.5 J sends the block off at 2 m/s. */
const launch: MotionEl = {
  kind: 'motion',
  id: 'launch',
  span: [0, 1],
  bodies: [{ id: 'block', shape: 'block', mass: 0.25, label: '', x: 0.25, width: 0.1, tone: 'adj' }],
  spring: { on: 'block', k: 400, rest: 0.3, loose: true },
  energy: { max: 0.6, bars: ['elastic', 'kinetic'] },
  forceScale: 3.5,
  velocityScale: 40,
  height: 440,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [{ on: 'block', name: 'Hold', n: -20, tone: 'opp' }] }] },
    go: { phases: [{ dur: 0.32, slow: 8, note: 'Slow motion' }] },
  },
};

/** The lesson's hanging mass: 1.5 kg let down on a spring of 117.72 N/m comes to rest 0.125 m lower. */
const WEIGHT: MotionForce = { on: 'mass', name: 'Weight', n: 1.5 * 9.81, tone: 'hyp' };
const hang: MotionEl = {
  kind: 'motion',
  id: 'hang',
  vertical: true,
  span: [0, 0.4],
  bodies: [{ id: 'mass', shape: 'block', mass: 1.5, label: '1.5 kg', x: 0.1, width: 0.09, tone: 'adj' }],
  spring: { on: 'mass', k: 117.72, rest: 0.1, decimals: 3 },
  forceScale: 5,
  height: 560,
  clips: {
    down: { phases: [{ dur: 3, forces: [WEIGHT, settle('mass', 12)] }, { dur: 0.001, set: { mass: 0 }, forces: [WEIGHT] }] },
  },
};

const video: Explainer = {
  id: 'p20-3-5-b',
  lessonId: 'p20-3-5',
  title: 'Kinetic and Potential Energy, Part 2: Springs and Elastic Energy',
  thumbnailTitle: 'Springs and Elastic Energy',
  thumbnail: 'hooke',
  summary:
    'Pull on a spring and it pulls back. See Hooke’s law as a spring stretches twice as far for twice the force, find the energy a spring stores from the triangle under its force graph, watch that energy launch a block, and measure a spring constant with a hanging mass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'Springs and Elastic Energy', subtitle: 'Hooke’s law, and the energy in a spring' }],
      lines: [
        { say: 'Pull on a spring, and it pulls back. The more you stretch it, the harder it pulls.', show: 'title' },
        { say: 'This lesson finds the force of a spring, and the energy that a stretched or squeezed spring stores.' },
      ],
    },
    {
      chapter: 'Hooke’s law',
      layout: 'center',
      main: [hooke, { kind: 'math', id: 'h', size: 'md', lines: ['\\brand{F = kx}', 'F = 250 \\times 0.1 = \\opp{25\\ \\text{N}} \\qquad F = 250 \\times 0.2 = \\opp{50\\ \\text{N}}'] }],
      lines: [
        { say: 'Here is a spring, fixed to a wall, with a block on its end. Pull the block with 25 newtons, and the spring stretches until its own force balances the pull.', show: ['hooke', 'hooke.extension'], play: 'hooke.one', playDelay: 4 },
        { say: 'It has stretched by 0.1 metres. Now double the pull, to fifty newtons. The extension doubles too: 0.2 metres.', play: 'hooke.two', playDelay: 3 },
        { say: 'This is Hooke’s law. The force needed to stretch or compress a spring is proportional to the change in its length: F equals k x.', show: 'h.0' },
        { say: 'x is the extension, measured from the natural length of the spring, in metres. k is the spring constant, in newtons per metre. A stiff spring has a large k.' },
        { say: 'This spring has a spring constant of 250 newtons per metre. So an extension of 0.1 metres needs 25 newtons, and 0.2 metres needs fifty.', show: 'h.1' },
      ],
    },
    {
      chapter: 'The energy in a spring',
      layout: 'split',
      leftWidth: 640,
      left: [store],
      right: [{ kind: 'math', id: 's', size: 'md', lines: ['W = \\tfrac{1}{2} \\times x \\times kx', '\\brand{E_e = \\tfrac{1}{2}kx^2}', 'E_e = \\tfrac{1}{2} \\times 250 \\times 0.1^2', 'E_e = \\brand{1.25\\ \\text{J}}'] }],
      lines: [
        { say: 'How much energy does a stretched spring store? Stretch this one slowly, and watch the graph of the force against the extension.', show: ['store', 'store.graph'], play: 'store.stretch', playDelay: 3 },
        { say: 'The force is not steady. It rises from zero to k x. So the graph is a straight line from the origin, and the work done is the area of the triangle under it.' },
        { say: 'The base of the triangle is x, and its height is k x. So the work is one half, times x, times k x.', show: 's.0' },
        { say: 'That work is stored in the spring as elastic potential energy: one half k x squared.', show: 's.1' },
        { say: 'For this spring, stretched by 0.1 metres: one half, times 250, times 0.1 squared, is 1.25 joules. That is the area under the graph.', show: ['s.2', 's.3'] },
      ],
    },
    {
      chapter: 'A compressed spring',
      layout: 'center',
      main: [
        launch,
        { kind: 'math', id: 'c', size: 'md', lines: ['x = 5\\ \\text{cm} = 0.05\\ \\text{m} \\qquad E_e = \\tfrac{1}{2} \\times 400 \\times 0.05^2 = \\brand{0.5\\ \\text{J}}', '\\bad{\\tfrac{1}{2} \\times 400 \\times 5^2 = 5000\\ \\text{J}} \\quad \\text{is wrong: } x \\text{ must be in metres}'] },
      ],
      lines: [
        { say: 'A spring stores energy when it is compressed, too. This spring has a spring constant of 400 newtons per metre, and it is held compressed by five centimetres.', show: ['launch', 'launch.extension', 'launch.energy'], play: 'launch.ready' },
        { say: 'Change the units first: five centimetres is 0.05 metres. Then one half, times 400, times 0.05 squared, is 0.5 joules.', show: 'c.0' },
        { say: 'Now let go. The spring gives that energy to the block, as kinetic energy.', show: 'launch.velocity', play: 'launch.go' },
        { say: 'Do not leave the compression in centimetres. Using five gives 5,000 joules, which is ten thousand times too large, because the extension is squared.', show: 'c.1' },
      ],
    },
    {
      chapter: 'Measuring a spring constant',
      layout: 'split',
      leftWidth: 500,
      left: [hang],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\thc{kx = mg}', 'mg = 1.5 \\times 9.81 = \\hyp{14.715\\ \\text{N}}', 'k = \\dfrac{14.715}{0.125} = \\brand{117.7\\ \\text{N/m}}', 'E_e = \\tfrac{1}{2} \\times 117.7 \\times 0.125^2', 'E_e = \\brand{0.920\\ \\text{J}}'] }],
      lines: [
        { say: 'A hanging mass gives a simple way to measure a spring constant. Here a mass of 1.5 kilograms is hooked onto a spring at its natural length.', show: ['hang', 'hang.extension'] },
        { say: 'Let the mass down. The spring stretches until its upward force balances the weight.', play: 'hang.down' },
        { say: 'At rest, k x equals m g. The weight is 1.5 times 9.81, which is 14.715 newtons. And the spring is now 0.125 metres longer than before.', show: ['m.0', 'm.1'] },
        { say: 'So the spring constant is 14.715 over 0.125: that is 117.7 newtons per metre.', show: 'm.2' },
        { say: 'The energy stored is one half, times 117.7, times 0.125 squared: 0.920 joules.', show: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spring with a spring constant of 200 N/m is stretched by 10 cm. How much elastic potential energy does it store?',
          choices: ['$10\\,000\\ \\text{J}$', '$20\\ \\text{J}$', '$10\\ \\text{J}$', '$1\\ \\text{J}$'],
          answer: 3,
          working: 'Change the units: $x = 10\\ \\text{cm} = 0.1\\ \\text{m}$. Then $E_e = \\tfrac{1}{2}kx^2 = \\tfrac{1}{2} \\times 200 \\times 0.1^2 = 1\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A spring with a spring constant of 200 newtons per metre is stretched by ten centimetres. How much elastic potential energy does it store? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Change the units first: ten centimetres is 0.1 metres. Then one half, times 200, times 0.1 squared, is one joule. That is choice D. Ten thousand joules is the common mistake, from leaving the extension in centimetres.', show: 'q.answer' },
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
            'Hooke’s law: $F = kx$, with $x$ in metres and $k$ in newtons per metre',
            'The work done in stretching a spring is the **triangle** under its force graph',
            'Elastic potential energy: $E_e = \\tfrac{1}{2}kx^2$, for a stretch or a compression',
            'A mass hanging at rest on a spring: $kx = mg$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Hooke’s law says that F equals k x, with x in metres and k in newtons per metre.', show: 'sum.0' },
        { say: 'The work done in stretching a spring is the triangle under its force graph.', show: 'sum.1' },
        { say: 'So the elastic potential energy is one half k x squared, for a stretch or a compression.', show: 'sum.2' },
        { say: 'And for a mass hanging at rest on a spring, k x equals m g.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
