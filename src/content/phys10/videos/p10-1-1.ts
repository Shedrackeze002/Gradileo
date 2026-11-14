import type { Explainer, MotionEl } from '@/video/script.ts';
import { run } from './lib/track.ts';

// Lesson 1.1: a quantity is a number with a unit, SI units and prefixes, km/h to m/s, and scalars
// and vectors. Every motion on the screen is worked out by src/video/motion.ts from the speeds
// given here, so the clock, the distances and the pictures agree.

/** A cart that rolls 10 m along a track in 5 s. */
const roll: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 330,
  lanes: [{ surface: 'smooth', label: 'A track marked in metres' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'cart', x: 1 }],
  poster: 'go',
  clips: { go: { phases: [run(5, { cart: 2 })] } },
};

/** Two cars with the same speed, written in two units: 72 km/h is 20 m/s. */
const cars: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 60],
  height: 400,
  lanes: [{ surface: 'smooth', label: 'Speed in kilometres per hour' }, { surface: 'smooth', label: 'Speed in metres per second' }],
  bodies: [
    { id: 'top', shape: 'cart', mass: 1, label: '72 km/h', x: 5, width: 6, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'cart', mass: 1, label: '20 m/s', x: 5, width: 6, lane: 1, tone: 'opp' },
  ],
  clips: { go: { phases: [run(2.5, { top: 20, bottom: 20 })] } },
};

/** Two carts with the same speed, moving in opposite directions. */
const opposite: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 430,
  speedWord: true,
  velocityScale: 34,
  lanes: [{ surface: 'smooth', label: 'Cart A' }, { surface: 'smooth', label: 'Cart B' }],
  bodies: [
    { id: 'top', shape: 'cart', mass: 1, label: 'A', x: 1.5, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'cart', mass: 1, label: 'B', x: 10.5, lane: 1, tone: 'hyp' },
  ],
  clips: { go: { phases: [run(2.5, { top: 3, bottom: -3 })] } },
};

const video: Explainer = {
  id: 'p10-1-1',
  lessonId: 'p10-1-1',
  title: 'Quantities, Units and Vectors',
  thumbnailTitle: 'Units and Vectors',
  thumbnail: 'sim',
  summary:
    'A measurement means nothing without its unit, and some measurements need a direction too. Meet the SI units, change kilometres to metres and kilometres per hour to metres per second, and watch two carts with the same speed show the difference between a scalar and a vector.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Describing Motion', title: 'Quantities, Units and Vectors', subtitle: 'What a measurement needs before it means anything' }],
      lines: [
        { say: 'Physics describes the world with measurements. How far, how fast, how heavy, how long.', show: 'title' },
        { say: 'In this lesson, you will see what a measurement needs before it means anything: a unit, and sometimes a direction as well.' },
      ],
    },
    {
      chapter: 'A number needs a unit',
      layout: 'center',
      main: [roll, { kind: 'callout', id: 'def', tone: 'definition', title: 'Physical quantity', md: 'Anything that can be **measured**. It is written as a **number and a unit**, such as 10 m, 5 s or 60 kg.' }],
      lines: [
        { say: 'Here is a cart on a track. Watch it roll, and keep an eye on the clock.', show: ['sim', 'sim.clock', 'sim.distance'], play: 'sim.go', playDelay: 3 },
        { say: 'How far did it go? If I only say ten, you cannot tell what I mean. Ten what? The track is marked in metres, so the cart went ten metres. And the clock shows that it took five seconds.', focus: 'sim.cart' },
        { say: 'Anything we can measure is called a physical quantity. A quantity is always written as a number and a unit. The number on its own means nothing.', show: 'def', focus: 'sim' },
      ],
    },
    {
      chapter: 'SI units',
      layout: 'center',
      main: [
        { kind: 'text', id: 'si', size: 'lg', md: 'Scientists everywhere use the same units: the **SI units**.' },
        {
          kind: 'table',
          id: 'units',
          head: ['Quantity', 'SI unit', 'Symbol'],
          rows: [
            ['length (distance)', 'metre', 'm'],
            ['mass', 'kilogram', 'kg'],
            ['time', 'second', 's'],
            ['speed', 'metre per second', 'm/s'],
          ],
        },
      ],
      lines: [
        { say: 'Scientists everywhere use one agreed set of units, called the S I units. That way, a measurement made in one country means the same in every other.', caption: 'Scientists everywhere use one agreed set of units, called the SI units. That way, a measurement made in one country means the same in every other.', show: 'si' },
        { say: 'Length is measured in metres.', show: ['units', 'units.0'], focus: 'units.0' },
        { say: 'Mass is measured in kilograms, and time is measured in seconds.', show: ['units.1', 'units.2'], focus: ['units.1', 'units.2'] },
        { say: 'Speed, which you will meet in the next lesson, is measured in metres per second.', show: 'units.3', focus: 'units.3' },
      ],
    },
    {
      chapter: 'Prefixes',
      layout: 'center',
      main: [
        { kind: 'text', id: 'pre', size: 'lg', md: '**kilo** (k) means × 1000 · **centi** (c) means ÷ 100 · **milli** (m) means ÷ 1000' },
        { kind: 'math', id: 'conv', size: 'lg', lines: ['3.5\\ \\text{km} = 3.5 \\times 1000 = \\good{3500\\ \\text{m}}', '250\\ \\text{m} = 250 \\div 1000 = \\good{0.25\\ \\text{km}}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which way?', md: 'Changing to a **smaller** unit gives a bigger number: **multiply**. Changing to a **larger** unit: **divide**.' },
      ],
      lines: [
        { say: 'A prefix in front of a unit makes it larger or smaller. Kilo means one thousand times. Centi means one hundredth, and milli means one thousandth.', show: 'pre' },
        { say: 'A cycle path is three point five kilometres long. A metre is smaller than a kilometre, so there are more of them. Multiply by one thousand, and the path is three thousand five hundred metres long.', show: 'conv.0' },
        { say: 'Now the other way. Two hundred and fifty metres is a short walk, less than one kilometre. Divide by one thousand, and you get zero point two five kilometres.', show: 'conv.1' },
        { say: 'So when you change to a smaller unit, multiply. When you change to a larger unit, divide. Then check that your answer makes sense.', show: 'tip' },
      ],
    },
    {
      chapter: 'Kilometres per hour',
      layout: 'center',
      main: [cars, { kind: 'math', id: 'kmh', size: 'md', lines: ['72\\ \\text{km/h} = \\dfrac{72\\,000\\ \\text{m}}{3600\\ \\text{s}} = \\good{20\\ \\text{m/s}} \\qquad \\text{km/h} \\div 3.6 = \\text{m/s}'] }],
      lines: [
        { say: 'Road signs give speeds in kilometres per hour, but physics uses metres per second. Here are two cars. One is labelled seventy-two kilometres per hour, and the other is labelled twenty metres per second.', show: ['sim', 'sim.clock'] },
        { say: 'Watch them drive, and see which one is faster.', show: 'sim.strobe', play: 'sim.go', playDelay: 1.2 },
        { say: 'Neither. They stay side by side the whole way. Seventy-two kilometres per hour and twenty metres per second are the same speed, written in different units.' },
        { say: 'Here is why. Seventy-two kilometres is seventy-two thousand metres, and one hour is three thousand six hundred seconds. Divide, and you get twenty metres every second. The shortcut is to divide kilometres per hour by three point six.', show: 'kmh' },
      ],
    },
    {
      chapter: 'Scalars and vectors',
      layout: 'center',
      main: [
        opposite,
        {
          kind: 'table',
          id: 'sv',
          head: ['Scalar: a size only', 'Vector: a size and a direction'],
          rows: [
            ['speed: 3 m/s', 'velocity: 3 m/s to the right'],
            ['distance: 50 m', 'displacement: 50 m north'],
          ],
        },
      ],
      lines: [
        { say: 'Now look at two carts, A and B. Watch the green arrows as they move.', show: ['sim', 'sim.velocity'], play: 'sim.go', playDelay: 2.4 },
        { say: 'Both carts have the same speed, three metres per second. But they are not doing the same thing. Cart A moves to the right, and cart B moves to the left.', focus: ['sim.top', 'sim.bottom'] },
        { say: 'Speed has a size only. A quantity like that is called a scalar. Distance, mass and time are scalars as well.', show: ['sv', 'sv.0'], focus: 'sim' },
        { say: 'To say where a cart is heading, you need a direction too. A quantity with a size and a direction is called a vector. Velocity is a vector: three metres per second to the right. Displacement and force are vectors as well.', show: 'sv.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car travels at 90 km/h. What is its speed in metres per second?',
          choices: ['$324\\ \\text{m/s}$', '$25\\ \\text{m/s}$', '$9\\ \\text{m/s}$', '$250\\ \\text{m/s}$'],
          answer: 1,
          working: 'Divide by 3.6: $90 \\div 3.6 = 25\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A car travels at ninety kilometres per hour. What is its speed in metres per second? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'To change kilometres per hour to metres per second, divide by three point six. Ninety divided by three point six is twenty-five metres per second. That is choice B.', show: 'q.answer' },
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
            'A **physical quantity** is a number with a unit',
            'SI units: the **metre**, the **kilogram** and the **second**',
            'Smaller unit: multiply. Larger unit: divide',
            'km/h ÷ 3.6 = m/s',
            'A **scalar** has a size only; a **vector** has a size and a direction',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A physical quantity is a number with a unit.', show: 'sum.0' },
        { say: 'The S I units of length, mass and time are the metre, the kilogram and the second.', caption: 'The SI units of length, mass and time are the metre, the kilogram and the second.', show: 'sum.1' },
        { say: 'To change to a smaller unit, multiply. To change to a larger unit, divide. And to change kilometres per hour to metres per second, divide by three point six.', show: ['sum.2', 'sum.3'] },
        { say: 'A scalar has a size only. A vector has a size and a direction.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
