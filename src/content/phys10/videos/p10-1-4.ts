import type { Explainer, MotionEl } from '@/video/script.ts';
import { brake, drive } from './lib/track.ts';

// Lesson 1.4: acceleration as the change in velocity each second, a = (v − u) ÷ t, a negative
// acceleration when something slows down, and v = u + at. The carts are sped up and slowed by
// forces that are not drawn (forces come in the next unit), and src/video/motion.ts works out the
// motion from them, so every velocity on the screen is the one the narration reads.

/** From rest at 2 m/s²: 2, 4, 6 and 8 m/s after each second. */
const speedUp: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 20],
  height: 330,
  strobe: 1,
  velocityScale: 14,
  lanes: [{ surface: 'smooth', label: 'Starting from rest' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'A', x: 1.5 }],
  poster: 'go',
  clips: { go: { phases: [{ dur: 4, forces: [drive('cart', 2)] }] } },
};

/** A steady 6 m/s beside a cart that starts at rest and gains 4 m/s every second: both cover 18 m in 3 s. */
const compare: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 26],
  height: 470,
  lanes: [{ surface: 'smooth', label: 'Cart B: a steady velocity' }, { surface: 'smooth', label: 'Cart C: starting from rest' }],
  bodies: [
    { id: 'top', shape: 'cart', mass: 1, label: 'B', x: 2, width: 1.5, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'cart', mass: 1, label: 'C', x: 2, width: 1.5, lane: 1, tone: 'opp' },
  ],
  velocityScale: 14,
  clips: { go: { phases: [{ dur: 3, set: { top: 6 }, forces: [drive('bottom', 4)] }] } },
};

/** Already moving at 2 m/s, then 2 m/s² for 3 s: it reaches 8 m/s. */
const change: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 20],
  height: 330,
  velocityScale: 14,
  lanes: [{ surface: 'smooth', label: 'Already moving at 2 m/s' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'D', x: 2, v: 2, tone: 'hyp' }],
  clips: { go: { phases: [{ dur: 3, forces: [drive('cart', 2)] }] } },
};

/** Braking from 8 m/s to rest in 4 s: an acceleration of −2 m/s². */
const slowDown: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 20],
  height: 330,
  strobe: 1,
  lanes: [{ surface: 'smooth', label: 'Braking' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'E', x: 2, v: 8, tone: 'adj' }],
  clips: { go: { phases: [{ dur: 4, forces: [brake('cart', 2)] }] } },
};

/** Moving at 4 m/s, then 2 m/s² for 3 s: v = 4 + 2 × 3 = 10 m/s. */
const predict: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 26],
  height: 330,
  lanes: [{ surface: 'smooth', label: 'Moving at 4 m/s, about to speed up' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'F', x: 2, v: 4, tone: 'opp' }],
  velocityScale: 16,
  clips: { go: { phases: [{ dur: 3, forces: [drive('cart', 2)] }] } },
};

const video: Explainer = {
  id: 'p10-1-4',
  lessonId: 'p10-1-4',
  title: 'Acceleration',
  thumbnail: 'sim',
  summary:
    'Acceleration is how quickly velocity changes. Watch a cart gain two metres per second every second, see why a fast cart can have no acceleration at all, work out an acceleration when a cart speeds up and when it brakes, and predict a velocity before the cart gets there.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Describing Motion', title: 'Acceleration', subtitle: 'How quickly a velocity changes' }],
      lines: [
        { say: 'A car pulling away from traffic lights, and a car cruising along a highway, are both moving. But only one of them is changing its velocity.', show: 'title' },
        { say: 'In this lesson, you will see what acceleration means, how to work it out, and how to use it to predict a velocity.' },
      ],
    },
    {
      chapter: 'A changing velocity',
      layout: 'center',
      main: [
        speedUp,
        {
          kind: 'table',
          id: 'vt',
          head: ['Time (s)', '0', '1', '2', '3', '4'],
          rows: [['Velocity (m/s)', '0', '2', '4', '6', '8']],
        },
        { kind: 'text', id: 'def', size: 'md', md: '**Acceleration** is the **change in velocity each second**. Here it is **2 m/s²**.' },
      ],
      lines: [
        { say: 'This cart starts at rest. Watch its green velocity arrow, and the marks it leaves each second.', show: ['sim', 'sim.velocity', 'sim.clock', 'sim.strobe'], play: 'sim.go', playDelay: 3.4 },
        { say: 'The arrow kept growing, and the marks got further and further apart. The cart was speeding up.', focus: 'sim.cart' },
        { say: 'Here is its velocity at each second. Zero, then two, four, six, and eight metres per second. Every second, the velocity grows by the same amount, two metres per second.', show: ['vt', 'vt.0'], focus: 'sim' },
        { say: 'The change in velocity each second is called the acceleration. This cart gains two metres per second, every second. We say its acceleration is two metres per second squared.', show: 'def' },
      ],
    },
    {
      chapter: 'Fast or accelerating?',
      layout: 'center',
      main: [compare, { kind: 'text', id: 'rule', size: 'md', md: 'A **steady** velocity means **zero** acceleration, however fast.' }],
      lines: [
        { say: 'Acceleration is not the same thing as speed. Cart B moves at a steady six metres per second. Cart C starts at rest. Watch them both.', show: ['sim', 'sim.velocity', 'sim.clock', 'sim.readout'], play: 'sim.go', playDelay: 7.5 },
        { say: 'Cart B was fast from the start, but its arrow never changed. Its velocity is steady, so its acceleration is zero.', focus: 'sim.top' },
        { say: 'Cart C began at rest, yet its velocity grew by four metres per second every second. Its acceleration is four metres per second squared, and by the end, it is the faster cart.', focus: 'sim.bottom' },
        { say: 'So a steady velocity means zero acceleration, however fast the object is going.', show: 'rule', focus: 'sim' },
      ],
    },
    {
      chapter: 'The acceleration formula',
      layout: 'center',
      main: [
        change,
        {
          kind: 'math',
          id: 'law',
          size: 'md',
          lines: [
            '\\text{acceleration} = \\dfrac{\\text{change in velocity}}{\\text{time}} \\qquad a = \\dfrac{v - u}{t}',
            'a = \\dfrac{8 - 2}{3} = \\dfrac{6\\ \\text{m/s}}{3\\ \\text{s}} = \\good{2\\ \\text{m/s}^2}',
          ],
        },
      ],
      lines: [
        { say: 'To find an acceleration, divide the change in velocity by the time taken.', show: ['sim', 'sim.velocity', 'sim.clock', 'law.0'] },
        { say: 'In symbols, u is the starting velocity, and v is the final velocity. The change in velocity is always final minus starting, v minus u.', focus: 'law.0' },
        { say: 'This cart is already moving at two metres per second. Watch it for three seconds.', play: 'sim.go', playDelay: 3.6, focus: 'sim' },
        { say: 'Its velocity rose from two to eight metres per second. Eight minus two is six. Six divided by three seconds gives two metres per second squared.', show: 'law.1' },
      ],
    },
    {
      chapter: 'Slowing down',
      layout: 'center',
      main: [slowDown, { kind: 'math', id: 'neg', size: 'md', lines: ['a = \\dfrac{v - u}{t} = \\dfrac{0 - 8}{4} = \\good{-2\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'Now a cart moving at eight metres per second puts its brakes on. Watch the arrow shrink.', show: ['sim', 'sim.velocity', 'sim.clock', 'sim.strobe'], play: 'sim.go', playDelay: 4.4 },
        { say: 'This time the marks crowd together, and after four seconds the cart is at rest.', focus: 'sim.cart' },
        { say: 'The final velocity is zero, and the starting velocity is eight. Zero minus eight is minus eight. Divide by four seconds, and the acceleration is minus two metres per second squared.', show: 'neg', focus: 'sim' },
        { say: 'The minus sign shows that the cart is slowing down. Each second, it loses two metres per second. This is sometimes called a deceleration.', focus: 'neg' },
      ],
    },
    {
      chapter: 'Predicting a velocity',
      layout: 'center',
      main: [predict, { kind: 'math', id: 'vuat', size: 'md', lines: ['v = u + at', 'v = 4 + 2 \\times 3 = \\good{10\\ \\text{m/s}}'] }],
      lines: [
        { say: 'When you know the acceleration, you can predict a velocity. In t seconds, the velocity changes by a times t. So the final velocity is the starting velocity, plus the acceleration times the time.', show: ['sim', 'sim.velocity', 'sim.clock', 'vuat.0'] },
        { say: 'This cart moves at four metres per second, and it is about to accelerate at two metres per second squared, for three seconds. Four, plus two times three, is ten metres per second.', show: 'vuat.1' },
        { say: 'Let us check. Watch the velocity as the clock reaches three seconds.', play: 'sim.go', playDelay: 2.2, focus: 'sim' },
        { say: 'Ten metres per second, exactly as predicted.', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car speeds up from 6 m/s to 21 m/s in 5 s. What is its acceleration?',
          choices: ['$5.4\\ \\text{m/s}^2$', '$4.2\\ \\text{m/s}^2$', '$3\\ \\text{m/s}^2$', '$15\\ \\text{m/s}^2$'],
          answer: 2,
          working: 'Change in velocity $= 21 - 6 = 15\\ \\text{m/s}$. Acceleration $= 15 \\div 5 = 3\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A car speeds up from six metres per second to twenty-one metres per second, in five seconds. What is its acceleration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The change in velocity is twenty-one minus six, which is fifteen metres per second. Fifteen divided by five is three metres per second squared. That is choice C.', show: 'q.answer' },
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
            '**Acceleration** is the change in velocity each second, in m/s²',
            'a = (v − u) ÷ t, final velocity minus starting velocity',
            'A steady velocity means zero acceleration',
            'Slowing down gives a **negative** acceleration',
            'v = u + at predicts the final velocity',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Acceleration is the change in velocity each second, measured in metres per second squared.', show: 'sum.0' },
        { say: 'To find it, take the final velocity minus the starting velocity, and divide by the time.', show: 'sum.1' },
        { say: 'A steady velocity means zero acceleration, and slowing down gives a negative acceleration.', show: ['sum.2', 'sum.3'] },
        { say: 'And v equals u plus a t predicts the final velocity.', caption: 'And v = u + at predicts the final velocity.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
