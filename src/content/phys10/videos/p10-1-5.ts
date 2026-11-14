import type { Explainer, MotionEl } from '@/video/script.ts';
import { brake, drive, halt, run } from './lib/track.ts';

// Lesson 1.5: distance-time graphs (the slope is the speed, a flat line means at rest) and
// velocity-time graphs (the slope is the acceleration, the area under the line is the distance).
// Each graph draws itself from the motion of the cart under it (src/video/motion.ts), so the line
// and the cart always agree.

/** 6 m in 3 s, a rest of 2 s, then 6 m in 2 s: the distance-time graph of the whole trip. */
const trip: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 520,
  speedWord: true,
  graph: { of: ['cart'], seconds: 7, max: 12, y: 'distance' },
  lanes: [{ surface: 'smooth', label: 'Distance against time' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'A', x: 1 }],
  poster: 'go',
  clips: {
    go: { phases: [run(3, { cart: 2 }), halt('cart')] },
    rest: { phases: [{ dur: 2 }] },
    fast: { phases: [run(2, { cart: 3 }), halt('cart')] },
  },
};

/** From rest at 2 m/s² for 3 s: the distance-time graph curves upwards. */
const curve: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 520,
  speedWord: true,
  graph: { of: ['cart'], seconds: 3, max: 10, y: 'distance' },
  lanes: [{ surface: 'smooth', label: 'Speeding up' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'B', x: 1, tone: 'adj' }],
  clips: { go: { phases: [{ dur: 3, forces: [drive('cart', 2)] }] } },
};

/** Up to 4 m/s in 2 s, steady for 2 s, then braking to rest in 2 s: 4 + 8 + 4 = 16 m. */
const tram = (label: string): MotionEl => ({
  kind: 'motion',
  id: 'sim',
  span: [0, 18],
  height: 520,
  graph: { of: ['cart'], seconds: 6, max: 5 },
  lanes: [{ surface: 'smooth', label }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'C', x: 1, tone: 'opp' }],
  clips: {
    up: { phases: [{ dur: 2, forces: [drive('cart', 2)] }] },
    steady: { phases: [{ dur: 2 }] },
    down: { phases: [{ dur: 2, forces: [brake('cart', 2)] }] },
    all: { phases: [{ dur: 2, forces: [drive('cart', 2)] }, { dur: 2 }, { dur: 2, forces: [brake('cart', 2)] }] },
  },
});

const video: Explainer = {
  id: 'p10-1-5',
  lessonId: 'p10-1-5',
  title: 'Motion Graphs',
  thumbnail: 'sim',
  summary:
    'A graph lets you see a whole journey at a glance. Watch a distance-time graph and a velocity-time graph draw themselves as a cart moves, and see why the slope of one is the speed, the slope of the other is the acceleration, and the area under a velocity-time graph is the distance travelled.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Describing Motion', title: 'Motion Graphs', subtitle: 'Seeing a whole journey at a glance' }],
      lines: [
        { say: 'A table of times and distances holds everything about a journey. But a graph lets you see it at a glance: where the object was fast, where it rested, and where it sped up.', show: 'title' },
        { say: 'In this lesson, you will watch two kinds of graph draw themselves, and learn to read them both.' },
      ],
    },
    {
      chapter: 'Distance-time graphs',
      layout: 'center',
      main: [trip, { kind: 'text', id: 'rule', size: 'md', md: 'On a distance-time graph, the **slope** is the **speed**. A **flat** line means **at rest**.' }],
      lines: [
        { say: 'This graph has time along the bottom, and the distance travelled up the side. Watch the cart, and watch the graph draw itself.', show: ['sim', 'sim.clock', 'sim.graph', 'sim.distance'], play: 'sim.go', playDelay: 6.2 },
        { say: 'The cart moved at a steady speed, so the line is straight and sloping. It rose six metres in three seconds. Six divided by three is two metres per second. The slope of the line is the speed.', focus: 'sim.cart' },
        { say: 'Now the cart stops, for two seconds. Watch the line.', play: 'sim.rest', playDelay: 1.6 },
        { say: 'Time carried on, but the distance did not change. So the line is flat. A flat line means the cart is at rest.' },
        { say: 'Now the cart sets off again, faster than before.', play: 'sim.fast', playDelay: 1.2 },
        { say: 'This part of the line is steeper. It rose six metres in only two seconds, which is three metres per second. The steeper the line, the faster the object.', show: 'rule', focus: 'sim' },
      ],
    },
    {
      chapter: 'A curved line',
      layout: 'center',
      main: [curve, { kind: 'text', id: 'bend', size: 'md', md: 'A line that **curves upwards** means the object is **speeding up**.' }],
      lines: [
        { say: 'What does the graph look like when a cart speeds up? Watch this one start from rest.', show: ['sim', 'sim.clock', 'sim.graph', 'sim.velocity'], play: 'sim.go', playDelay: 3.4 },
        { say: 'Each second, the cart covered more distance than in the second before. So the line gets steeper and steeper. A line that curves upwards means the object is speeding up.', show: 'bend', focus: 'sim' },
      ],
    },
    {
      chapter: 'Velocity-time graphs',
      layout: 'center',
      main: [tram('Velocity against time'), { kind: 'text', id: 'slope', size: 'md', md: 'On a velocity-time graph, the **slope** is the **acceleration**.' }],
      lines: [
        { say: 'The second kind of graph has velocity up the side. Read the label on the side first, because this graph means something different. Watch the cart speed up.', show: ['sim', 'sim.clock', 'sim.graph', 'sim.velocity'], play: 'sim.up', playDelay: 8.2 },
        { say: 'The line slopes up. The velocity rose by four metres per second in two seconds, so the acceleration is two metres per second squared. On this graph, the slope is the acceleration.', show: 'slope', focus: 'sim.cart' },
        { say: 'Now the cart holds a steady velocity.', play: 'sim.steady', playDelay: 0.8 },
        { say: 'The line is flat. But look at the cart. It is still moving, at four metres per second. On a velocity-time graph, a flat line above zero means a steady velocity, not rest.', focus: 'sim.cart' },
        { say: 'Last, the cart brakes.', play: 'sim.down', playDelay: 0.6 },
        { say: 'The line slopes down, all the way to zero, and the cart is at rest. A downward slope is a negative acceleration.', focus: 'sim' },
      ],
    },
    {
      chapter: 'The area under the line',
      layout: 'center',
      main: [
        tram('The same journey again'),
        { kind: 'math', id: 'area', size: 'md', lines: ['\\text{area} = \\tfrac{1}{2} \\times 2 \\times 4 \\;+\\; 2 \\times 4 \\;+\\; \\tfrac{1}{2} \\times 2 \\times 4 = 4 + 8 + 4 = \\good{16\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'A velocity-time graph hides one more thing. Here is the same journey again. This time, watch the distance the cart travels, and the shaded area under the line.', show: ['sim', 'sim.clock', 'sim.graph', 'sim.velocity', 'sim.distance'], play: 'sim.all', playDelay: 4.5 },
        { say: 'The cart travelled sixteen metres. Now look at the area under the line. It is made of a triangle, a rectangle, and another triangle.', focus: 'sim.cart' },
        { say: 'The first triangle is half of two times four, which is four. The rectangle is two times four, which is eight. The last triangle is four again. Four plus eight plus four is sixteen metres.', show: 'area', focus: 'sim' },
        { say: 'So the area under a velocity-time graph is the distance travelled.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a velocity-time graph, a straight line rises from 0 m/s to 12 m/s in 4 s. How far does the object travel in those 4 s?',
          choices: ['$48\\ \\text{m}$', '$24\\ \\text{m}$', '$3\\ \\text{m}$', '$16\\ \\text{m}$'],
          answer: 1,
          working: 'The distance is the area under the line, a triangle: $\\tfrac{1}{2} \\times 4 \\times 12 = 24\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a velocity-time graph, a straight line rises from zero to twelve metres per second, in four seconds. How far does the object travel in those four seconds? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The distance is the area under the line, and here that area is a triangle. Half of four times twelve is twenty-four metres. That is choice B.', show: 'q.answer' },
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
            'Distance-time graph: the **slope** is the **speed**',
            'A flat line on a distance-time graph means **at rest**',
            'Velocity-time graph: the **slope** is the **acceleration**',
            'A flat line above zero on a velocity-time graph means a **steady velocity**',
            'The **area** under a velocity-time graph is the **distance travelled**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. On a distance-time graph, the slope is the speed, and a flat line means at rest.', show: ['sum.0', 'sum.1'] },
        { say: 'On a velocity-time graph, the slope is the acceleration, and a flat line above zero means a steady velocity.', show: ['sum.2', 'sum.3'] },
        { say: 'And the area under a velocity-time graph is the distance travelled.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
