import type { Explainer, MotionEl } from '@/video/script.ts';
import { drive } from '@/content/phys10/videos/lib/track.ts';

// Lesson 1.3: acceleration (a = Δv ÷ Δt, with its sign) and velocity-time graphs, where the slope
// is the acceleration and the area is the displacement. Each graph draws itself from the motion
// of the cart under it (src/video/motion.ts), so a line below the time axis is a cart that has
// turned round, and the area there is a displacement backwards.

/** From 2 m/s to 10 m/s in 2 s: an acceleration of +4 m/s², over 12 m. */
const speedUp: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 350,
  velocityScale: 14,
  lanes: [{ surface: 'smooth', label: 'Speeding up' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'A', x: 1, v: 2 }],
  clips: { go: { phases: [{ dur: 2, forces: [drive('cart', 4)] }] } },
};

/** Pushed off at +5 m/s against a steady force: a = −2.5 m/s². It stops after 2 s and 5 m, and is back after 4 s at −5 m/s. */
const turn: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 8],
  height: 570,
  graph: { of: ['cart'], seconds: 4, max: 6, min: -6 },
  lanes: [{ surface: 'smooth', label: 'Out and back' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'B', x: 1, v: 5, tone: 'adj' }],
  poster: 'out',
  clips: {
    out: { phases: [{ dur: 2, forces: [drive('cart', -2.5)] }] },
    back: { phases: [{ dur: 2, forces: [drive('cart', -2.5)] }] },
  },
};

/** From the 4 m mark: +2 m/s² for 2 s, a steady 4 m/s for 2 s, then −2 m/s². It is at rest after 6 s and 16 m, and 1 m back by 7 s. */
const journey = (label: string): MotionEl => ({
  kind: 'motion',
  id: 'sim',
  span: [0, 21],
  height: 520,
  graph: { of: ['cart'], seconds: 7, max: 5, min: -3 },
  lanes: [{ surface: 'smooth', label }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'C', x: 4, tone: 'opp' }],
  clips: {
    go: { phases: [{ dur: 2, forces: [drive('cart', 2)] }, { dur: 2 }, { dur: 2, forces: [drive('cart', -2)] }] },
    all: { phases: [{ dur: 2, forces: [drive('cart', 2)] }, { dur: 2 }, { dur: 3, forces: [drive('cart', -2)] }] },
  },
});

const video: Explainer = {
  id: 'p20-1-3',
  lessonId: 'p20-1-3',
  title: 'Acceleration and Velocity-Time Graphs',
  thumbnailTitle: 'Velocity-Time Graphs',
  thumbnail: 'sim',
  summary:
    'Acceleration is the rate at which velocity changes. Watch a cart speed up, slow down and turn round while its velocity-time graph draws itself, and see why the slope of the line is the acceleration, why the area under it is the displacement, and what an area below the time axis means.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Kinematics', title: 'Acceleration', subtitle: 'And velocity-time graphs' }],
      lines: [
        { say: 'Press the accelerator, and a car speeds up. Press the brake, and it slows down. In physics, both of these are accelerations.', show: 'title' },
        { say: 'An acceleration is any change in velocity. This lesson measures it, and then reads it from a graph.' },
      ],
    },
    {
      chapter: 'Acceleration',
      layout: 'center',
      main: [
        speedUp,
        { kind: 'math', id: 'a', size: 'md', lines: ['a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{10 - 2}{2} = \\good{{+4}\\ \\text{m/s}^2}'] },
      ],
      lines: [
        { say: 'Acceleration is the rate of change of velocity. Watch the green arrow, the velocity of this cart, as it speeds up for two seconds.', show: ['sim', 'sim.velocity', 'sim.readout', 'sim.clock', 'sim.strobe'], play: 'sim.go', playDelay: 5.6 },
        { say: 'The velocity rose from two to ten metres per second, in two seconds. Acceleration is the change in velocity divided by the time: eight over two is four metres per second squared. Each second, the cart gains four metres per second.', show: 'a', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'Turning round',
      layout: 'center',
      main: [turn, { kind: 'text', id: 'note', size: 'md', md: 'At the turning point, the **velocity is zero**, but the **acceleration is not**.' }],
      lines: [
        { say: 'This cart is pushed off to the right at five metres per second, while a steady force pulls it back to the left. Watch its velocity on the graph.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.clock'], play: 'sim.out', playDelay: 6.4 },
        { say: 'The cart slowed down and stopped. The line fell from five to zero in two seconds, so the acceleration is minus 2.5 metres per second squared.', focus: 'sim.cart' },
        { say: 'But the force has not gone away. Watch what happens next.', play: 'sim.back', playDelay: 2.4 },
        { say: 'The cart came back, speeding up to the left. And the line on the graph never bent. It kept the same slope, straight through zero. At the instant the cart stopped, its velocity was zero, but its acceleration was still minus 2.5.', show: 'note', focus: 'sim' },
      ],
    },
    {
      chapter: 'Slope and area',
      layout: 'center',
      main: [
        journey('Velocity against time'),
        { kind: 'math', id: 'area', size: 'md', lines: ['\\text{area} = \\tfrac{1}{2} \\times 2 \\times 4 \\;+\\; 2 \\times 4 \\;+\\; \\tfrac{1}{2} \\times 2 \\times 4 = 4 + 8 + 4 = \\good{16\\ \\text{m}}'] },
      ],
      lines: [
        { say: 'Now a longer journey. Watch the three parts of the line.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.clock'], play: 'sim.go', playDelay: 2.6 },
        { say: 'On a velocity-time graph, the slope is the acceleration. The first part rose four metres per second in two seconds: plus two metres per second squared. The flat part is zero acceleration, at a steady four metres per second. The last part is minus two.', focus: 'sim' },
        { say: 'While the line sloped down, the cart was still moving forward. A downward slope means slowing down, not moving backwards.', focus: 'sim.cart' },
        { say: 'And the area between the line and the time axis is the displacement. A triangle, a rectangle and a triangle: four plus eight plus four is sixteen metres. Check the cart. It started at four metres, and it is now at twenty.', show: 'area', focus: 'sim' },
      ],
    },
    {
      chapter: 'Below the time axis',
      layout: 'center',
      main: [
        journey('One more second'),
        { kind: 'math', id: 'both', size: 'md', lines: ['\\brand{\\text{Displacement: } 16 - 1 = 15\\ \\text{m}} \\qquad \\text{Distance: } 16 + 1 = 17\\ \\text{m}'] },
      ],
      lines: [
        { say: 'Here is the same journey, but this time the force at the end acts for one more second. Watch the line cross the axis.', show: ['sim', 'sim.velocity', 'sim.graph', 'sim.clock', 'sim.distance', 'sim.displacement'], play: 'sim.all', playDelay: 5.2 },
        { say: 'Below the axis, the velocity is negative, and the cart rolled back one metre. An area below the axis counts as a negative displacement.', focus: 'sim.cart' },
        { say: 'So the displacement is sixteen minus one: fifteen metres. The distance travelled counts both areas as positive: sixteen plus one is seventeen metres.', show: 'both', focus: 'sim' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "A car's velocity changes from 20 m/s to 8 m/s in 4 s. What is its acceleration?",
          choices: ['$3\\ \\text{m/s}^2$', '$-3\\ \\text{m/s}^2$', '$-12\\ \\text{m/s}^2$', '$-7\\ \\text{m/s}^2$'],
          answer: 1,
          working: '$a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{8 - 20}{4} = \\dfrac{-12}{4} = -3\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: "Your turn. A car's velocity changes from twenty metres per second to eight metres per second, in four seconds. What is its acceleration? Pause the video and try it.", show: 'q', wait: 6 },
        { say: 'The change in velocity is the final velocity minus the starting velocity: eight minus twenty is minus twelve. Minus twelve over four is minus three metres per second squared. That is choice B.', show: 'q.answer' },
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
            'Acceleration $a = \\dfrac{\\Delta v}{\\Delta t}$, with its **sign**',
            'Zero velocity does **not** mean zero acceleration',
            'On a velocity-time graph, the **slope** is the acceleration',
            'The **area** is the displacement, and it is **negative below the axis**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Acceleration is the change in velocity divided by the time, with its sign.', show: 'sum.0' },
        { say: 'An object can have zero velocity for an instant, and still be accelerating.', show: 'sum.1' },
        { say: 'On a velocity-time graph, the slope is the acceleration.', show: 'sum.2' },
        { say: 'And the area between the line and the time axis is the displacement. Below the axis, it counts as negative.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
