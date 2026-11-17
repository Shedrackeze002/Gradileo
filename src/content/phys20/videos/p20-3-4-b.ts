import type { Explainer, MotionEl, MotionForce } from '@/video/script.ts';

// Lesson 3.4, part 2: force-displacement graphs. Each cart is moved by the force on its graph
// (src/video/motion.ts), the graph stands over the track on the same scale, and the area under it
// fills in as the cart moves. The work written over the graph is measured from the motion, and it
// is the lesson's: 240 J under the first graph (160 J and 80 J), and 440 J under the second
// (80 J, 240 J and 120 J), an average force of 44 N over 10 m.

/** A steady push of 30 N on a 10 kg cart: 3 m/s², so 6 m takes two seconds. */
const steady: MotionEl = {
  kind: 'motion',
  id: 'steady',
  span: [0, 12],
  bodies: [{ id: 'cart', shape: 'cart', mass: 10, label: '', x: 1.5, tone: 'adj' }],
  graph: { of: ['cart'], y: 'force', force: 'Push', seconds: 0, metres: 8, max: 50 },
  forceScale: 2.4,
  height: 560,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [{ on: 'cart', name: 'Push', n: 30 }] }] },
    go: { phases: [{ dur: 2, slow: 2, forces: [{ on: 'cart', name: 'Push', n: 30 }] }] },
  },
};

/** The lesson's first graph: 40 N for the first 4 m, then falling steadily to zero at 8 m. */
const fades: MotionForce = { on: 'cart', name: 'Push', n: 0, profile: [[0, 40], [4, 40], [8, 0]] };
const first: MotionEl = {
  kind: 'motion',
  id: 'first',
  span: [0, 12],
  bodies: [{ id: 'cart', shape: 'cart', mass: 20, label: '', x: 1.5, tone: 'adj' }],
  graph: { of: ['cart'], y: 'force', seconds: 0, metres: 8, max: 50 },
  forceScale: 2.4,
  height: 560,
  poster: 'falls',
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [fades] }] },
    // 40 N on 20 kg takes the cart 4 m in two seconds; the next 4 m take 0.8704 s.
    level: { phases: [{ dur: 2, slow: 2, forces: [fades] }] },
    falls: { phases: [{ dur: 0.87042, slow: 4, forces: [fades] }] },
  },
};

/** The lesson's second graph: rising from 20 N to 60 N over 2 m, steady to 6 m, then falling to zero at 10 m. */
const hump: MotionForce = { on: 'cart', name: 'Push', n: 0, profile: [[0, 20], [2, 60], [6, 60], [10, 0]] };
const second: MotionEl = {
  kind: 'motion',
  id: 'second',
  span: [0, 13.5],
  bodies: [{ id: 'cart', shape: 'cart', mass: 40, label: '', x: 1.5, tone: 'adj' }],
  graph: { of: ['cart'], y: 'force', seconds: 0, metres: 10, max: 70 },
  forceScale: 1.8,
  height: 560,
  clips: {
    ready: { phases: [{ dur: 1.5, freeze: true, forces: [hump] }] },
    // The cart passes 2 m after 2.4929 s, 6 m after another 1.3333 s, and 10 m after 0.8973 s more.
    rises: { phases: [{ dur: 2.4929, slow: 1.6, forces: [hump] }] },
    level: { phases: [{ dur: 1.33333, slow: 3, forces: [hump] }] },
    falls: { phases: [{ dur: 0.89728, slow: 4, forces: [hump] }] },
  },
};

/** A spring of 250 N/m, stretched slowly: the pull must grow in step with the extension, from zero to 50 N at 0.2 m. */
const grows: MotionForce = { on: 'block', name: 'Pull', n: 0, profile: [[0, 0], [0.2, 50]] };
const spring: MotionEl = {
  kind: 'motion',
  id: 'spring',
  span: [0, 0.62],
  bodies: [{ id: 'block', shape: 'block', mass: 0.5, label: '', x: 0.26, width: 0.07, tone: 'adj' }],
  spring: { on: 'block', k: 250, rest: 0.26 },
  graph: { of: ['block'], y: 'force', force: 'Pull', seconds: 0, metres: 0.25, max: 60 },
  forceScale: 2,
  height: 560,
  clips: {
    // The pull balances the spring all the way, so the block moves out at a steady 0.05 m/s.
    stretch: { phases: [{ dur: 4, set: { block: 0.05 }, forces: [grows] }, { dur: 0.5, set: { block: 0 }, forces: [grows] }] },
  },
};

const video: Explainer = {
  id: 'p20-3-4-b',
  lessonId: 'p20-3-4',
  title: 'Work, Part 2: Force-Displacement Graphs',
  thumbnailTitle: 'Force-Displacement Graphs',
  thumbnail: 'first',
  summary:
    'When a force changes as an object moves, the work it does is the area under its force-displacement graph. Watch the area fill in as a cart moves, split it into rectangles and triangles, find an average force, and see why a spring gives a triangle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Work and Energy', title: 'Force-Displacement Graphs', subtitle: 'Work when the force changes' }],
      lines: [
        { say: 'Work is force times displacement. But that only works for a steady force, and many forces are not steady.', show: 'title' },
        { say: 'The pull of a spring grows as it stretches. The push of an engine falls as a car speeds up. For forces like these, you need a graph.' },
      ],
    },
    {
      chapter: 'A steady force',
      layout: 'split',
      leftWidth: 640,
      left: [steady],
      right: [{ kind: 'math', id: 's', size: 'md', lines: ['W = Fd', 'W = 30 \\times 6 = \\opp{180\\ \\text{J}}', '\\thc{W = \\text{area under the graph}}'] }],
      lines: [
        { say: 'Start with a steady force. A cart is pushed with 30 newtons. The graph above the track shows the force against the displacement, and for a steady force it is a level line.', show: ['steady', 'steady.graph'], play: 'steady.ready' },
        { say: 'Watch the graph as the cart moves six metres. The shaded area under the line grows with every metre.', play: 'steady.go' },
        { say: 'The work is F times d: 30 times six, which is 180 joules. And that is the area of the shaded rectangle. Its height is the force, and its width is the displacement.', show: ['s.0', 's.1'] },
        { say: 'This idea holds for a graph of any shape. The work done by a force is the area under its force-displacement graph.', show: 's.2' },
      ],
    },
    {
      chapter: 'A force that changes',
      layout: 'split',
      leftWidth: 640,
      left: [first],
      right: [{ kind: 'math', id: 'f', size: 'md', lines: ['40 \\times 4 = 160\\ \\text{J}', '\\tfrac{1}{2} \\times 4 \\times 40 = 80\\ \\text{J}', 'W = 160 + 80 = \\opp{240\\ \\text{J}}'] }],
      lines: [
        { say: 'Here is a force that changes. It is a steady forty newtons for the first four metres. Then it falls steadily to zero over the next four.', show: ['first', 'first.graph'], play: 'first.ready' },
        { say: 'Over the first four metres, the area is a rectangle: forty times four, which is 160 joules.', show: 'f.0', play: 'first.level' },
        { say: 'Now the force fades. Watch the arrow on the cart shrink as the point slides down the graph.', play: 'first.falls' },
        { say: 'This part of the area is a triangle. Half its base times its height is one half, times four, times forty: 80 joules.', show: 'f.1' },
        { say: 'Add the two areas. The work done over the whole eight metres is 240 joules.', show: 'f.2' },
      ],
    },
    {
      chapter: 'Three parts, and the average force',
      layout: 'split',
      leftWidth: 640,
      left: [second],
      right: [
        {
          kind: 'math',
          id: 't',
          size: 'md',
          lines: ['\\tfrac{1}{2}(20 + 60) \\times 2 = 80\\ \\text{J}', '60 \\times 4 = 240\\ \\text{J}', '\\tfrac{1}{2} \\times 4 \\times 60 = 120\\ \\text{J}', 'W = \\opp{440\\ \\text{J}}', 'F_{\\text{avg}} = \\dfrac{440}{10} = \\thc{44\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'This force rises, stays steady, and then falls to zero. Split the area into three simple shapes.', show: ['second', 'second.graph'], play: 'second.ready' },
        { say: 'From zero to two metres, the area is a trapezoid. Half the sum of the two sides, times the width: one half, times eighty, times two, is 80 joules.', show: 't.0', play: 'second.rises' },
        { say: 'From two to six metres, it is a rectangle: sixty times four is 240 joules.', show: 't.1', play: 'second.level' },
        { say: 'From six to ten metres, it is a triangle: one half, times four, times sixty, is 120 joules.', show: 't.2', play: 'second.falls' },
        { say: 'The work is the sum: 440 joules. Do not multiply the largest force by the whole displacement. Sixty times ten is 600 joules, the area of a rectangle that the graph does not fill.', show: 't.3' },
        { say: 'The average force is the steady force that would do the same work over the same displacement: 440 over ten, which is 44 newtons.', show: 't.4' },
      ],
    },
    {
      chapter: 'A spring gives a triangle',
      layout: 'split',
      leftWidth: 640,
      left: [spring],
      right: [{ kind: 'math', id: 'k', size: 'md', lines: ['W = \\tfrac{1}{2} \\times \\text{base} \\times \\text{height}', 'W = \\tfrac{1}{2} \\times 0.2 \\times 50 = \\opp{5\\ \\text{J}}'] }],
      lines: [
        { say: 'One shape matters more than any other. Stretch a spring slowly, and the pull you need starts at zero and grows steadily.', show: ['spring', 'spring.graph'] },
        { say: 'Watch the graph. It is a straight line from the origin, so the area under it is a triangle.', play: 'spring.stretch' },
        { say: 'The work done is half the base times the height: one half, times 0.2 metres, times fifty newtons, is five joules. That work is now stored in the spring, and it is where the next lesson begins.', show: ['k.0', 'k.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A force on a cart, in the direction of its motion, is a steady 20 N for the first 3 m. It then falls steadily to zero over the next 2 m. How much work does the force do over the whole 5 m?',
          choices: ['$100\\ \\text{J}$', '$60\\ \\text{J}$', '$80\\ \\text{J}$', '$50\\ \\text{J}$'],
          answer: 2,
          working: 'Rectangle: $20 \\times 3 = 60\\ \\text{J}$. Triangle: $\\tfrac{1}{2} \\times 2 \\times 20 = 20\\ \\text{J}$. The work is $60 + 20 = 80\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A force on a cart is a steady twenty newtons for the first three metres. It then falls steadily to zero over the next two metres. How much work does the force do over the whole five metres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Sketch the graph. The rectangle is twenty times three: sixty joules. The triangle is one half, times two, times twenty: twenty joules. So the work is eighty joules. That is choice C. A hundred joules is the common mistake, from multiplying twenty newtons by the whole five metres.', show: 'q.answer' },
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
            'The work done by a force is the **area under its force-displacement graph**',
            'Split the area into rectangles, triangles and trapezoids, and add them',
            'Average force $=$ work $\\div$ displacement',
            'A force that rises steadily from zero, like the pull on a spring, gives a **triangle**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The work done by a force is the area under its force-displacement graph.', show: 'sum.0' },
        { say: 'Split the area into rectangles, triangles and trapezoids, and add them.', show: 'sum.1' },
        { say: 'The average force is the work divided by the displacement.', show: 'sum.2' },
        { say: 'And a force that rises steadily from zero, like the pull on a spring, gives a triangle.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
