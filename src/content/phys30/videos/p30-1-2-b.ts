import type { Explainer, MotionEl } from '@/video/script.ts';

// Lesson 1.2, second half: force-time graphs. Each force is drawn on a graph against time while
// it acts on a cart or a ball, and the area under the line fills in: a rectangle for a steady
// push, a triangle for a force that rises and falls, and a trapezoid, in milliseconds, for a
// racket on a ball. The impulse written over the graph is that area, and the momentum bar under
// the track is worked out from the motion itself, so the two can be seen to agree
// (src/video/motion.ts).

/** A steady push: 4 N for 2 s on a 2 kg cart. The graph is a rectangle of 8 N·s. */
const steady: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 560,
  bodies: [{ id: 'cart', shape: 'cart', mass: 2, x: 1.2, label: '2 kg', tone: 'adj', width: 1.3 }],
  momentumMax: 10,
  momentumTotal: false,
  forceScale: 16,
  graph: { of: ['cart'], y: 'impulse', seconds: 3, max: 6, force: 'Push' },
  clips: { push: { phases: [{ dur: 2, forces: [{ on: 'cart', name: 'Push', n: 4 }] }, { dur: 0.6 }] } },
};

/** The lesson's triangle: a force on a 15 kg cart that rises to 30 N in 2 s and falls to zero 4 s later. */
const triangle: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 26],
  height: 560,
  bodies: [{ id: 'cart', shape: 'cart', mass: 15, x: 2, label: '15 kg', tone: 'adj', width: 2.6 }],
  momentumMax: 100,
  momentumTotal: false,
  forceScale: 5,
  velocityScale: 16,
  graph: { of: ['cart'], y: 'impulse', seconds: 7, max: 40, force: 'Push' },
  clips: {
    push: {
      phases: [
        { dur: 2, forces: [{ on: 'cart', name: 'Push', n: 0, to: 30 }] },
        { dur: 4, forces: [{ on: 'cart', name: 'Push', n: 30, to: 0 }] },
        { dur: 0.3 },
      ],
    },
  },
};

const MS = 0.001;
/** The lesson's racket: 500 N at its peak, on a 58 g ball for 6 ms, played 500 times slower. */
const racket: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 560,
  bodies: [{ id: 'ball', shape: 'ball', mass: 0.058, x: 1.4, label: '58 g', tone: 'adj' }],
  momentumMax: 2.5,
  momentumTotal: false,
  forceScale: 0.3,
  velocityScale: 3.5,
  graph: { of: ['ball'], y: 'impulse', seconds: 7 * MS, max: 600, force: 'Racket', ms: true },
  clips: {
    hit: {
      phases: [
        { dur: 2 * MS, slow: 500, note: 'Slow motion', forces: [{ on: 'ball', name: 'Racket', n: 0, to: 500 }] },
        { dur: 2 * MS, slow: 500, note: 'Slow motion', forces: [{ on: 'ball', name: 'Racket', n: 500, to: 500 }] },
        { dur: 2 * MS, slow: 500, note: 'Slow motion', forces: [{ on: 'ball', name: 'Racket', n: 500, to: 0 }] },
        { dur: 0.19, slow: 20, note: 'Slow motion' },
      ],
    },
  },
};

/** A tall, narrow push (8 N for 0.5 s) and then a low, wide one (2 N for 3 s) on the same cart. */
const tallAndWide: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 560,
  bodies: [{ id: 'cart', shape: 'cart', mass: 4, x: 1.2, label: '4 kg', tone: 'adj', width: 1.5 }],
  momentumMax: 12,
  momentumTotal: false,
  forceScale: 16,
  graph: { of: ['cart'], y: 'impulse', seconds: 4.5, max: 10, force: 'Push' },
  clips: {
    tall: { phases: [{ dur: 0.5, forces: [{ on: 'cart', name: 'Push', n: 8 }] }, { dur: 0.5 }] },
    wide: { phases: [{ dur: 3, forces: [{ on: 'cart', name: 'Push', n: 2 }] }, { dur: 0.3 }] },
  },
};

const video: Explainer = {
  id: 'p30-1-2-b',
  lessonId: 'p30-1-2',
  title: 'Force-Time Graphs',
  thumbnail: 'sim',
  summary:
    'A real force is seldom steady. Watch three forces draw their own graphs against time as they act, and see the area under each graph fill in to give the impulse: a rectangle, a triangle, and the trapezoid of a racket on a tennis ball. Then find the average force, and see why a low, wide graph can beat a tall, narrow one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Force-Time Graphs', subtitle: 'Impulse as an area' }],
      lines: [
        { say: 'When a bat hits a ball, the force is not steady. It rises from zero as the ball is squashed, reaches a peak, and falls back to zero as the ball leaves.', show: 'title' },
        { say: 'So how do we find the impulse of a force that keeps changing? The answer is on a graph of force against time.' },
      ],
    },
    {
      chapter: 'A steady force',
      layout: 'center',
      main: [steady, { kind: 'math', id: 'rect', size: 'md', lines: ['\\text{area} = \\text{height} \\times \\text{width} = \\opp{4 \\times 2} = \\opp{8\\ \\text{N·s}}'] }],
      lines: [
        { say: 'Start with a steady force. A push of four newtons acts on this cart for two seconds. The graph draws the force as it acts.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.bars'], play: 'sim.push', playDelay: 5 },
        { say: 'The graph is a rectangle. Its height is the force, four newtons, and its width is the time, two seconds.', focus: 'sim.graph' },
        { say: 'Height times width is four times two, which is eight newton seconds. That is the impulse, and it is the area of the rectangle. The momentum bar agrees: eight kilogram metres per second.', show: 'rect' },
      ],
    },
    {
      chapter: 'A force that changes',
      layout: 'center',
      main: [triangle, { kind: 'math', id: 'tri', size: 'md', lines: ['\\text{area} = \\tfrac{1}{2} \\times 6 \\times 30 = \\opp{90\\ \\text{N·s}} \\qquad v = 90 \\div 15 = \\good{6\\ \\text{m/s}}'] }],
      lines: [
        { say: 'The same is true of any force. The impulse of a force is the area under its force-time graph.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.bars'] },
        { say: 'This cart of fifteen kilograms starts at rest. The push on it rises to thirty newtons in two seconds, and then falls back to zero over the next four. Watch the area fill in.', play: 'sim.push', playDelay: 5.5 },
        { say: 'The graph is a triangle. Its area is half the base times the height: half, times six, times thirty. That is ninety newton seconds.', show: 'tri', focus: 'sim.graph' },
        { say: 'The impulse equals the change in momentum. The cart started at rest, so ninety equals fifteen times its final velocity. The cart ends at six metres per second.', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'A racket and a ball',
      layout: 'center',
      main: [racket, { kind: 'math', id: 'trap', size: 'md', lines: ['\\text{area} = \\tfrac{1}{2} \\times (6 + 2) \\times 500 = 2000\\ \\text{N·ms} = \\opp{2.0\\ \\text{N·s}}'] }],
      lines: [
        { say: 'A collision is over in a few thousandths of a second, so its graph has a time axis in milliseconds. Here a racket hits a tennis ball of fifty-eight grams, slowed down five hundred times.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.bars'] },
        { say: 'The force rises to five hundred newtons, holds, and falls away.', play: 'sim.hit', playDelay: 0.2, wait: 3.4 },
        { say: 'This shape is a trapezoid. Its parallel sides are six milliseconds and two milliseconds long, and its height is five hundred newtons. Half, times eight, times five hundred is two thousand newton milliseconds.', show: 'trap', focus: 'sim.graph' },
        { say: 'Change the milliseconds to seconds before you go on. Two thousand newton milliseconds is 2.0 newton seconds. Divide by the mass, 0.058 kilograms, and the ball leaves at 34.5 metres per second.', focus: 'sim.ball' },
      ],
    },
    {
      chapter: 'The average force',
      layout: 'center',
      main: [
        { kind: 'math', id: 'avg', size: 'md', lines: ['F_{\\text{average}} = \\dfrac{\\text{impulse}}{\\text{time}} = \\dfrac{2.0}{0.006} = \\good{333\\ \\text{N}}'] },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Average force', md: 'The steady force that would give the **same impulse** in the **same time**. It is less than the peak force.' },
      ],
      lines: [
        { say: 'The average force is the steady force that would give the same impulse in the same time. Divide the impulse by the time: 2.0 over 0.006 is 333 newtons.', show: 'avg' },
        { say: 'That is less than the peak of five hundred newtons. When a question about a collision asks for the force, it means this average.', show: 'note' },
      ],
    },
    {
      chapter: 'Peak or area',
      layout: 'center',
      main: [tallAndWide, { kind: 'text', id: 'rule', size: 'md', md: 'The **peak** is the greatest force. The **area** is the impulse.' }],
      lines: [
        { say: 'Here is a mistake to avoid. This cart gets two pushes. The first is strong and short: eight newtons for half a second.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.bars'], play: 'sim.tall', playDelay: 7 },
        { say: 'Its graph is tall and narrow, and its area is eight times one half: four newton seconds.' },
        { say: 'The second push is gentle and long: two newtons for three seconds.', play: 'sim.wide', playDelay: 0.6, wait: 0.6 },
        { say: 'Its graph is low and wide, and its area is two times three: six newton seconds. That brings the total to ten. The gentle push gave the cart more momentum than the strong one. The peak of a graph is the greatest force. The impulse is the whole area.', show: 'rule' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The net force on a 4 kg cart at rest rises steadily from 0 to 40 N in 0.5 s, then falls steadily back to 0 in the next 0.5 s. How fast is the cart moving at the end?',
          choices: ['$5\\ \\text{m/s}$', '$10\\ \\text{m/s}$', '$20\\ \\text{m/s}$', '$40\\ \\text{m/s}$'],
          answer: 0,
          working: 'The graph is a triangle: area $= \\tfrac{1}{2} \\times 1 \\times 40 = 20\\ \\text{N·s}$, so $v = \\dfrac{20}{4} = 5\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cart of four kilograms is at rest. The net force on it rises steadily from zero to forty newtons in half a second, then falls steadily back to zero in the next half second. How fast is the cart moving at the end? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The graph is a triangle with a base of one second and a height of forty newtons. Its area is half, times one, times forty, which is twenty newton seconds. Twenty over four kilograms is five metres per second. Choice A is correct.', show: 'q.answer' },
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
            'Impulse = **area under the force-time graph**',
            'Split the area into rectangles, triangles and trapezoids',
            'Change **milliseconds to seconds** before you calculate',
            '**Average force** = impulse ÷ time, less than the peak force',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The impulse of a force is the area under its force-time graph.', show: 'sum.0' },
        { say: 'Find the area from simple shapes: rectangles, triangles and trapezoids.', show: 'sum.1' },
        { say: 'Change milliseconds to seconds before you calculate.', show: 'sum.2' },
        { say: 'And the average force is the impulse divided by the time. It is always less than the peak.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
