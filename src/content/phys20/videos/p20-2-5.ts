import type { Explainer, RampEl } from '@/video/script.ts';

// Lesson 2.5: connected objects and tension. The tensions are worked out from Newton's second
// law for each body (src/video/ramp.ts), so the arrows agree with the lesson's three examples:
// blocks of 5 kg and 3 kg pulled with 24 N (a = 3 m/s², tension 15 N), a 6 kg block pulled across
// a table by a hanging 2 kg (2.45 m/s², 14.7 N), and hanging masses of 3 kg and 5 kg (2.45 m/s²,
// 36.8 N).

/** The lesson's blocks: 5 kg behind and 3 kg in front, on a frictionless surface, pulled with 24 N. */
const train: RampEl = {
  kind: 'ramp',
  id: 'sim',
  angle: 0,
  length: 12,
  bodies: [
    { id: 'rear', mass: 5, x: 1.6, width: 1.3, tone: 'adj' },
    { id: 'front', mass: 3, x: 4.6, width: 1.1, tone: 'opp' },
  ],
  ropes: [['rear', 'front']],
  label: 'Two blocks and a string',
  height: 330,
  pad: [150, 110],
  forceScale: 4,
  velocityScale: 14,
  poster: 'go',
  clips: {
    name: { phases: [{ dur: 2, freeze: true, forces: [{ on: 'front', name: 'Pull', n: 24 }] }] },
    go: { phases: [{ dur: 2, forces: [{ on: 'front', name: 'Pull', n: 24 }] }] },
  },
};

/** The lesson's table: a 6 kg block joined over a pulley to a hanging 2 kg. */
const table: RampEl = {
  kind: 'ramp',
  id: 'sim',
  angle: 0,
  length: 6,
  raise: 2.6,
  bodies: [{ id: 'block', mass: 6, x: 1.6, width: 1.2, tone: 'adj' }],
  hanging: { id: 'hang', mass: 2, drop: 0.7, tone: 'opp' },
  balanced: ['block'],
  label: 'Over a pulley',
  height: 470,
  pad: [215, 36],
  forceScale: 3,
  velocityScale: 16,
  clips: { go: { phases: [{ dur: 1.1, slow: 2.5, note: 'Slow motion' }] } },
};

/** An Atwood machine: 3 kg on one side of the pulley and 5 kg on the other. */
const atwood: RampEl = {
  kind: 'ramp',
  id: 'sim',
  angle: 90,
  length: 4,
  bodies: [{ id: 'light', mass: 3, x: 1, tone: 'adj' }],
  hanging: { id: 'heavy', mass: 5, drop: 1.6, width: 1, tone: 'opp' },
  height: 480,
  pad: [70, 50],
  forceScale: 1.5,
  velocityScale: 16,
  clips: { go: { phases: [{ dur: 1.2, slow: 2.5, note: 'Slow motion' }] } },
};

const video: Explainer = {
  id: 'p20-2-5',
  lessonId: 'p20-2-5',
  title: 'Connected Objects and Tension',
  thumbnail: 'sim',
  summary:
    'When objects are joined by a string, they speed up together. Treat them as one system to find the acceleration, then look at one object alone to find the tension, for two blocks on a surface, a block pulled by a hanging mass, and two masses over a pulley.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Connected Objects', subtitle: 'Tension, strings and pulleys' }],
      lines: [
        { say: 'A locomotive does not pull each wagon separately. It pulls the first, the first pulls the second, and so on down the train, through the couplings between them.', show: 'title' },
        { say: 'To find how fast the train speeds up, and how hard each coupling is stretched, we use one idea twice. First look at everything together. Then look at one piece alone.' },
      ],
    },
    {
      chapter: 'Two blocks and a string',
      layout: 'center',
      main: [
        train,
        {
          kind: 'math',
          id: 'steps',
          size: 'md',
          lines: ['\\text{Both blocks: } a = \\dfrac{F_{\\text{net}}}{m_{\\text{total}}} = \\dfrac{24}{5 + 3} = \\good{3\\ \\text{m/s}^2}', '\\text{Rear block alone: } \\brand{F_T = ma = 5 \\times 3 = 15\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Two blocks, of five kilograms and three kilograms, are joined by a light string on a frictionless surface. A force of twenty-four newtons pulls the front block.', show: 'sim', play: 'sim.name', playDelay: 6.4 },
        { say: 'Step one. Treat both blocks as one system. The string pulls on both of them, but those pulls are inside the system, and they cancel. The only outside force along the surface is the pull. Twenty-four newtons, on eight kilograms, gives three metres per second squared.', show: ['steps.0', 'sim.velocity', 'sim.readout'], play: 'sim.go', playDelay: 11 },
        { say: 'Step two. Look at the rear block alone. Now the string is an outside force, and it is the only force along the surface on this block. So the tension is the mass times the acceleration: five times three is fifteen newtons.', show: ['steps.1', 'sim.tension'], focus: 'sim.rear' },
        { say: 'The tension is less than the pull. The pull has to speed up both blocks, but the string only has to speed up the one behind it. Check the front block: twenty-four minus fifteen leaves nine newtons, and three kilograms times three is nine.', show: 'sim.net', focus: 'sim.front' },
      ],
    },
    {
      chapter: 'Over a pulley',
      layout: 'center',
      main: [
        table,
        { kind: 'math', id: 'pull', size: 'md', lines: ['a = \\dfrac{m_{\\text{hang}}\\,g}{m_{\\text{total}}} = \\dfrac{2 \\times 9.81}{2 + 6} = \\good{2.45\\ \\text{m/s}^2} \\qquad \\brand{F_T = 6 \\times 2.45 = 14.7\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'A pulley changes the direction of a string, without changing its tension. Here a block of six kilograms, on a frictionless table, is joined to a mass of two kilograms that hangs over the edge.', show: ['sim', 'sim.weight'] },
        { say: 'Treat them as one system again. Along the string, the only outside force is the weight of the hanging mass: 19.6 newtons. But it has to speed up both masses, all eight kilograms. Watch.', show: ['sim.velocity', 'sim.readout'], play: 'sim.go', playDelay: 9.6 },
        { say: 'The acceleration is 19.6 over eight: 2.45 metres per second squared. The hanging mass does not fall freely, because it has to drag the block with it.', show: 'pull', focus: 'sim.hang' },
        { say: 'For the tension, look at the block on the table alone. The string is the only force along the table on it: six times 2.45 is 14.7 newtons. That is less than the weight of the hanging mass. If the two were equal, the hanging mass would not speed up at all.', show: 'sim.tension', focus: 'sim.block' },
      ],
    },
    {
      chapter: 'Two hanging masses',
      layout: 'split',
      leftWidth: 500,
      left: [atwood],
      right: [
        { kind: 'math', id: 'acc', size: 'md', lines: ['a = \\dfrac{(5 - 3) \\times 9.81}{5 + 3}', '\\good{a = 2.45\\ \\text{m/s}^2}'] },
        { kind: 'math', id: 'ten', size: 'md', lines: ['F_T - mg = ma', '\\brand{F_T = 3 \\times (9.81 + 2.45) = 36.8\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'Hang a mass on each side of a pulley, and you have an Atwood machine. Here there are three kilograms on the left, and five on the right. The heavier one falls, and the lighter one rises.', show: ['sim', 'sim.weight', 'sim.velocity'], play: 'sim.go', playDelay: 9.4 },
        { say: 'The two weights pull in opposite senses round the pulley, so the driving force is their difference: two kilograms times g, which is 19.6 newtons. It speeds up all eight kilograms, at 2.45 metres per second squared.', show: 'acc' },
        { say: 'For the tension, take the lighter mass alone. It speeds up upwards, so the tension is greater than its weight: three times 9.81 plus 2.45, which is 36.8 newtons.', show: ['ten', 'sim.tension'], focus: 'sim.light' },
        { say: 'Notice where the tension lies: between the two weights, 29.4 and 49.1 newtons. It is more than the weight of the mass that rises, and less than the weight of the mass that falls.', focus: 'sim' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 4 kg block on a frictionless table is joined over a pulley to a hanging 1 kg mass. Use $g = 9.81\\ \\text{m/s}^2$. What is the acceleration of the masses?',
          choices: ['$9.81\\ \\text{m/s}^2$', '$1.96\\ \\text{m/s}^2$', '$2.45\\ \\text{m/s}^2$', '$7.85\\ \\text{m/s}^2$'],
          answer: 1,
          working: 'The weight of the hanging mass speeds up both masses: $a = \\dfrac{1 \\times 9.81}{1 + 4} = 1.96\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A block of four kilograms, on a frictionless table, is joined over a pulley to a hanging mass of one kilogram. Use 9.81 metres per second squared for g. What is the acceleration of the masses? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The driving force is the weight of the hanging mass: 9.81 newtons. It speeds up both masses, five kilograms in all. 9.81 over five is 1.96 metres per second squared. That is choice B. Remember to divide by the total mass.', show: 'q.answer' },
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
            'Objects joined by a light string have the **same size of acceleration**',
            'Step 1: the whole system gives the acceleration, $a = \\dfrac{F_{\\text{net}}}{m_{\\text{total}}}$',
            'Step 2: **one object alone** gives the tension',
            'A pulley changes the **direction** of the tension, not its size',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Objects joined by a light string speed up together, with the same size of acceleration.', show: 'sum.0' },
        { say: 'Step one: treat them as one system, and divide the net outside force by the total mass. That gives the acceleration.', show: 'sum.1' },
        { say: 'Step two: look at one object alone. That gives the tension.', show: 'sum.2' },
        { say: 'And a frictionless pulley changes the direction of the tension, not its size.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
