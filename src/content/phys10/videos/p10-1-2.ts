import type { Explainer, MotionEl } from '@/video/script.ts';
import { run } from './lib/track.ts';

// Lesson 1.2: speed as the distance travelled each second, v = d ÷ t and its two rearrangements,
// and average speed. The carts move at the speeds given here (src/video/motion.ts), so the marks,
// the clock and the distances on screen are the ones the narration works out.

/** One cart at a steady 2 m/s, leaving a mark every second. */
const steady: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 330,
  speedWord: true,
  strobe: 1,
  lanes: [{ surface: 'smooth', label: 'One mark every second' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'A', x: 1 }],
  poster: 'go',
  clips: { go: { phases: [run(5, { cart: 2 })] } },
};

/** Two carts that start together: 2 m/s and 4 m/s for three seconds. */
const race: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 450,
  speedWord: true,
  strobe: 1,
  lanes: [{ surface: 'smooth', label: 'Cart A' }, { surface: 'smooth', label: 'Cart B' }],
  bodies: [
    { id: 'top', shape: 'cart', mass: 1, label: 'A', x: 1, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'cart', mass: 1, label: 'B', x: 1, lane: 1, tone: 'opp' },
  ],
  clips: { go: { phases: [run(3, { top: 2, bottom: 4 })] } },
};

/** A cart at 3 m/s for four seconds: it should go 12 m. */
const predict: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 330,
  speedWord: true,
  strobe: 1,
  lanes: [{ surface: 'smooth', label: 'A steady 3 metres per second' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'C', x: 1, tone: 'hyp' }],
  clips: { go: { phases: [run(4, { cart: 3 })] } },
};

/** A journey in two parts (4 m/s for 1 s, then 2 m/s for 3 s) beside a steady 2.5 m/s: both cover 10 m in 4 s. */
const journey: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 450,
  speedWord: true,
  strobe: 1,
  lanes: [{ surface: 'smooth', label: 'A journey in two parts' }, { surface: 'smooth', label: 'One steady speed' }],
  bodies: [
    { id: 'top', shape: 'cart', mass: 1, label: 'D', x: 1, lane: 0, tone: 'adj' },
    { id: 'bottom', shape: 'cart', mass: 1, label: 'E', x: 1, lane: 1, tone: 'opp' },
  ],
  clips: {
    trip: { phases: [run(1, { top: 4 }), run(3, { top: 2 })] },
    both: { reset: true, phases: [run(1, { top: 4, bottom: 2.5 }), run(3, { top: 2 })] },
  },
};

const video: Explainer = {
  id: 'p10-1-2',
  lessonId: 'p10-1-2',
  title: 'Speed, Distance and Time',
  thumbnail: 'sim',
  summary:
    'Speed is the distance travelled each second. Watch carts leave a mark every second, work out a speed from a distance and a time, predict how far a cart will go, and see what the average speed of a journey really means.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Describing Motion', title: 'Speed, Distance and Time', subtitle: 'How fast, how far and how long' }],
      lines: [
        { say: 'A sprinter and a snail can both travel one metre. What differs is how long it takes.', show: 'title' },
        { say: 'In this lesson, you will see what speed means, how to work it out, and what the average speed of a journey tells you.' },
      ],
    },
    {
      chapter: 'What speed means',
      layout: 'center',
      main: [steady, { kind: 'callout', id: 'def', tone: 'definition', title: 'Speed', md: 'The **distance travelled each second**. It tells us how fast something moves.' }],
      lines: [
        { say: 'This cart rolls along a track at a steady pace. Watch the marks it leaves behind, one every second.', show: ['sim', 'sim.clock', 'sim.strobe'], play: 'sim.go', playDelay: 3 },
        { say: 'The marks are evenly spaced, two metres apart. In every second, the cart covers the same two metres. So it has a steady speed of two metres per second.', show: 'sim.velocity', focus: 'sim.cart' },
        { say: 'Speed is the distance travelled each second. It tells us how fast something moves.', show: 'def', focus: 'sim' },
      ],
    },
    {
      chapter: 'A faster cart',
      layout: 'center',
      main: [race, { kind: 'text', id: 'rule', size: 'md', md: 'In the same time, the **faster** cart travels **further**.' }],
      lines: [
        { say: 'Now two carts start together. Watch how far each one goes in three seconds.', show: ['sim', 'sim.clock', 'sim.strobe'], play: 'sim.go', playDelay: 2.6 },
        { say: 'Cart A covered six metres, and cart B covered twelve. The marks of cart B are twice as far apart, because it covers four metres every second. Its speed is four metres per second.', show: ['sim.velocity', 'sim.distance'], focus: 'sim.bottom' },
        { say: 'In the same time, a faster object travels further.', show: 'rule', focus: 'sim' },
      ],
    },
    {
      chapter: 'The speed formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'law', size: 'xl', lines: ['\\text{speed} = \\dfrac{\\text{distance}}{\\text{time}}', 'v = \\dfrac{d}{t}'] },
        { kind: 'math', id: 'check', size: 'md', lines: ['v = \\dfrac{12\\ \\text{m}}{3\\ \\text{s}} = \\good{4\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'To find a speed, divide the distance travelled by the time taken.', show: 'law.0' },
        { say: 'In symbols, v equals d over t. With the distance in metres and the time in seconds, the speed is in metres per second.', show: 'law.1', focus: 'law.1' },
        { say: 'Check it with cart B. It travelled twelve metres in three seconds. Twelve divided by three is four metres per second, just as we saw.', show: 'check', focus: 'law' },
      ],
    },
    {
      chapter: 'Finding a distance or a time',
      layout: 'center',
      main: [predict, { kind: 'math', id: 'turn', size: 'md', lines: ['d = v \\times t = 3 \\times 4 = \\good{12\\ \\text{m}} \\qquad t = \\dfrac{d}{v} = \\dfrac{12}{3} = \\good{4\\ \\text{s}}'] }],
      lines: [
        { say: 'The formula can be turned round, to find a distance. Distance equals speed times time.', show: ['sim', 'sim.velocity', 'sim.clock'] },
        { say: 'This cart moves at three metres per second. How far will it go in four seconds? Three times four is twelve metres. Let us check. Watch the distance and the clock.', show: ['sim.distance', 'sim.strobe'], play: 'sim.go', playDelay: 9.5 },
        { say: 'After four seconds, the cart has gone exactly twelve metres.', focus: 'sim.cart' },
        { say: 'And when you know the distance and the speed, you can find the time. Time equals distance divided by speed. Twelve metres, at three metres per second, takes four seconds.', show: 'turn', focus: 'sim' },
      ],
    },
    {
      chapter: 'Average speed',
      layout: 'center',
      main: [journey, { kind: 'math', id: 'avg', size: 'md', lines: ['\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}} = \\dfrac{10\\ \\text{m}}{4\\ \\text{s}} = \\good{2.5\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Real journeys are rarely steady. Watch cart D on the top track. It starts fast, then slows down.', show: ['sim', 'sim.clock', 'sim.velocity', 'sim.distance'], play: 'sim.trip', playDelay: 4 },
        { say: 'It moved at four metres per second for one second, then at two metres per second for three seconds. Altogether, it travelled ten metres in four seconds.', focus: 'sim.top' },
        { say: 'The average speed is the total distance divided by the total time. Ten metres divided by four seconds is two point five metres per second.', show: 'avg', focus: 'sim' },
        { say: 'Here is what that number means. Cart E, on the bottom track, will move at a steady two point five metres per second. Start them together.', show: 'sim.strobe', play: 'sim.both', playDelay: 8 },
        { say: 'They finish in the same place at the same time. The average speed is the steady speed that covers the same distance in the same time.', focus: ['sim.top', 'sim.bottom'] },
        { say: 'Notice that two point five is not halfway between four and two. The cart spent longer at the slower speed. So always use the total distance and the total time.', focus: 'sim' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A runner covers 240 m in the first 40 s of a run, then 160 m in the next 60 s. What is the runner’s average speed for the whole run?',
          choices: ['$6\\ \\text{m/s}$', '$4.3\\ \\text{m/s}$', '$0.25\\ \\text{m/s}$', '$4\\ \\text{m/s}$'],
          answer: 3,
          working: 'Total distance $= 240 + 160 = 400\\ \\text{m}$. Total time $= 40 + 60 = 100\\ \\text{s}$. Average speed $= 400 \\div 100 = 4\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A runner covers two hundred and forty metres in the first forty seconds of a run, then one hundred and sixty metres in the next sixty seconds. What is the average speed for the whole run? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The total distance is two hundred and forty plus one hundred and sixty, which is four hundred metres. The total time is forty plus sixty, which is one hundred seconds. Four hundred divided by one hundred is four metres per second. That is choice D.', show: 'q.answer' },
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
            '**Speed** is the distance travelled each second, in m/s',
            'speed = distance ÷ time',
            'distance = speed × time, and time = distance ÷ speed',
            '**Average speed** = total distance ÷ total time',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Speed is the distance travelled each second, measured in metres per second.', show: 'sum.0' },
        { say: 'Speed equals distance divided by time.', show: 'sum.1' },
        { say: 'Turn it round to find a distance, speed times time, or a time, distance divided by speed.', show: 'sum.2' },
        { say: 'And the average speed of a journey is the total distance divided by the total time.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
