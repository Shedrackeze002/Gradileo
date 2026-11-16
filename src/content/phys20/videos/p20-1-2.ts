import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from '@/content/phys10/videos/lib/track.ts';

// Lesson 1.2: uniform motion (v = Δd ÷ Δt, with its sign) and position-time graphs, where the
// slope is the velocity. The graph plots the cart's position on the track's ruler as it moves
// (src/video/motion.ts), so a line that slopes down is a cart that is coming back, and a line
// under the time axis is a cart on the negative side of the origin.

/** Two carts at constant velocity: A from 2 m to 14 m in 4 s (+3 m/s), B from 12 m to 2 m in 5 s (−2 m/s). */
const steady: MotionEl = {
  kind: 'motion',
  id: 'pair',
  span: [0, 16],
  height: 380,
  strobe: 1,
  lanes: [{ surface: 'smooth', label: 'To the right' }, { surface: 'smooth', label: 'To the left' }],
  bodies: [
    { id: 'a', shape: 'cart', mass: 1, label: 'A', x: 2, lane: 0 },
    { id: 'b', shape: 'cart', mass: 1, label: 'B', x: 12, lane: 1 },
  ],
  clips: {
    right: { phases: [run(4, { a: 3 }), halt('a')] },
    left: { phases: [run(5, { b: -2 }), halt('b')] },
  },
};

/** 8 m out in 4 s (+2 m/s), a wait of 2 s, then 12 m back in 4 s (−3 m/s), ending at −4 m. */
const trip = (label: string, height: number): MotionEl => ({
  kind: 'motion',
  id: 'sim',
  span: [-6, 10],
  height,
  graph: { of: ['cart'], seconds: 10, max: 10, min: -6, y: 'position' },
  lanes: [{ surface: 'smooth', label }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'C', x: 0, tone: 'theta' }],
  poster: 'all',
  clips: {
    out: { phases: [run(4, { cart: 2 }), halt('cart')] },
    wait: { phases: [{ dur: 2 }] },
    back: { phases: [run(4, { cart: -3 }), halt('cart')] },
    all: { phases: [run(4, { cart: 2 }), run(2, { cart: 0 }), run(4, { cart: -3 }), halt('cart')] },
  },
});

const video: Explainer = {
  id: 'p20-1-2',
  lessonId: 'p20-1-2',
  title: 'Uniform Motion and Position-Time Graphs',
  thumbnailTitle: 'Position-Time Graphs',
  thumbnail: 'sim',
  summary:
    'In uniform motion the velocity never changes. Find a velocity, with its sign, from two positions and a time, then watch a position-time graph draw itself as a cart moves out, waits and comes back, and see why its slope is the velocity.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Uniform Motion', subtitle: 'And position-time graphs' }],
      lines: [
        { say: 'A car on a straight road, with its cruise control set, covers the same distance every second, in the same direction. That is the simplest motion there is, and it is called uniform motion.', show: 'title' },
        { say: 'In this lesson, you will measure it, and then read it from a graph.' },
      ],
    },
    {
      chapter: 'Uniform motion',
      layout: 'center',
      main: [
        steady,
        { kind: 'math', id: 'va', size: 'md', lines: ['\\adj{v = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{14 - 2}{4} = {+3}\\ \\text{m/s}} \\qquad\\qquad \\opp{v = \\dfrac{2 - 12}{5} = {-2}\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'Cart A moves with a constant velocity. Watch the marks it leaves, one every second.', show: ['pair', 'pair.strobe', 'pair.velocity'], play: 'pair.right', playDelay: 3.4 },
        { say: 'The marks are equally spaced: equal displacements in equal times. The cart went from the position two metres to fourteen metres, in four seconds. Velocity is displacement divided by time: twelve over four is plus three metres per second.', show: 'va', focus: 'pair.a' },
        { say: 'Cart B moves the other way.', play: 'pair.left', playDelay: 0.6 },
        { say: 'It went from twelve metres to two metres, in five seconds. Its displacement is two minus twelve: minus ten metres. So its velocity is minus two metres per second. The sign says that it moves to the left.', focus: 'pair.b' },
      ],
    },
    {
      chapter: 'Position-time graphs',
      layout: 'center',
      main: [trip('Position against time', 570), { kind: 'text', id: 'rule', size: 'md', md: 'On a position-time graph, the **slope** is the **velocity**.' }],
      lines: [
        { say: 'A position-time graph has time along the bottom, and position up the side. Watch this cart, and watch the graph draw itself.', show: ['sim', 'sim.clock', 'sim.graph', 'sim.velocity'], play: 'sim.out', playDelay: 5.4 },
        { say: 'A straight line means a constant velocity. The position rose eight metres in four seconds, so the slope is plus two metres per second. The slope of a position-time graph is the velocity.', show: 'rule', focus: 'sim.cart' },
        { say: 'Now the cart waits, for two seconds.', play: 'sim.wait', playDelay: 0.8 },
        { say: 'The line is flat. Its slope is zero, and so is the velocity.' },
        { say: 'Then the cart comes back, and keeps going past the origin.', play: 'sim.back', playDelay: 1.4 },
        { say: 'This line slopes down, so the velocity is negative. The position fell from plus eight to minus four, in four seconds. Minus twelve over four is minus three metres per second. And where the line dips under the time axis, the cart is on the negative side of the origin.', focus: 'sim' },
      ],
    },
    {
      chapter: 'Average velocity from the graph',
      layout: 'center',
      main: [
        trip('The same trip again', 520),
        { kind: 'math', id: 'avg', size: 'md', lines: ['\\text{Distance: } 8 + 12 = 20\\ \\text{m} \\qquad \\brand{v_{\\text{av}} = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{{-4} - 0}{10} = {-0.4}\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'Here is the whole trip again. This time, watch the distance and the displacement under the track.', show: ['sim', 'sim.clock', 'sim.graph', 'sim.distance', 'sim.displacement'], play: 'sim.all', playDelay: 4.4 },
        { say: 'The cart travelled eight metres out and twelve metres back: twenty metres. But its displacement is only minus four metres.', focus: 'sim.cart' },
        { say: 'The average velocity is the total displacement divided by the total time. Minus four over ten is minus 0.4 metres per second. On the graph, that is the slope of a straight line from the first point to the last.', show: 'avg', focus: 'sim' },
        { say: 'One warning. The height of this graph is the position, not the velocity. For the velocity, always look at the slope.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a position-time graph, a straight line falls from 20 m at $t = 2\\ \\text{s}$ to 5 m at $t = 7\\ \\text{s}$. What is the velocity?',
          choices: ['$3\\ \\text{m/s}$', '$-5\\ \\text{m/s}$', '$-3\\ \\text{m/s}$', '$-15\\ \\text{m/s}$'],
          answer: 2,
          working: 'The slope is the velocity: $v = \\dfrac{5 - 20}{7 - 2} = \\dfrac{-15}{5} = -3\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a position-time graph, a straight line falls from twenty metres at two seconds, to five metres at seven seconds. What is the velocity? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The slope is the velocity. The position changed by five minus twenty, which is minus fifteen metres, in five seconds. Minus fifteen over five is minus three metres per second. That is choice C.', show: 'q.answer' },
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
            'Uniform motion: **equal displacements in equal times**',
            'Velocity $v = \\dfrac{\\Delta d}{\\Delta t}$, and its **sign** is its direction',
            'On a position-time graph, the **slope** is the velocity',
            'A flat line means **at rest**; a line that slopes down means **moving back**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In uniform motion, an object makes equal displacements in equal times.', show: 'sum.0' },
        { say: 'Velocity is displacement divided by time, and its sign is its direction.', show: 'sum.1' },
        { say: 'On a position-time graph, the slope is the velocity.', show: 'sum.2' },
        { say: 'A flat line means the object is at rest, and a line that slopes down means it is moving back.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
