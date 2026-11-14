import type { Explainer, MotionEl } from '@/video/script.ts';
import { halt, run } from './lib/track.ts';

// Lesson 1.3: distance against displacement, a displacement with a sign, velocity as the
// displacement each second, and average speed against average velocity. The path and the
// displacement arrow under the track are drawn by src/video/motion.ts from where the cart has been.

/** A cart that rolls 8 m to the right, then 3 m back: 11 m travelled, 5 m from its start. */
const thereAndBack: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 350,
  lanes: [{ surface: 'smooth', label: 'Out, and part of the way back' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'A', x: 2 }],
  clips: {
    out: { phases: [run(4, { cart: 2 }), halt('cart')] },
    back: { phases: [run(1.5, { cart: -2 }), halt('cart')] },
  },
};

/** A cart that goes 5 m out and 5 m home, then 4 m further to the left of its start. */
const home: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 350,
  lanes: [{ surface: 'smooth', label: 'Right is positive, left is negative' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'B', x: 6, tone: 'adj' }],
  clips: {
    trip: { phases: [run(2.5, { cart: 2 }), run(2.5, { cart: -2 }), halt('cart')] },
    past: { phases: [run(2, { cart: -2 }), halt('cart')] },
  },
};

/** A cart that moves 8 m to the left in 4 s: its velocity is −2 m/s. */
const leftward: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 350,
  lanes: [{ surface: 'smooth', label: 'Right is positive, left is negative' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'C', x: 9, tone: 'hyp' }],
  clips: { go: { phases: [run(4, { cart: -2 })] } },
};

/** 9 m out in 3 s, then 3 m back in 1 s: 12 m travelled, 6 m from the start, in 4 s. */
const journey: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 350,
  lanes: [{ surface: 'smooth', label: 'A journey that turns back' }],
  bodies: [{ id: 'cart', shape: 'cart', mass: 1, label: 'D', x: 2, tone: 'opp' }],
  clips: { go: { phases: [run(3, { cart: 3 }), run(1, { cart: -3 }), halt('cart')] } },
};

const video: Explainer = {
  id: 'p10-1-3',
  lessonId: 'p10-1-3',
  title: 'Displacement and Velocity',
  thumbnail: 'sim',
  summary:
    'How far you travelled and how far you ended from your start are two different things. Watch a cart turn back, see its path and its displacement drawn under the track, and find out why a velocity can be negative and why a round trip has an average velocity of zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Describing Motion', title: 'Displacement and Velocity', subtitle: 'How far you went, and where you ended up' }],
      lines: [
        { say: 'Walk fifty metres to a shop, and fifty metres back home. You have walked one hundred metres, yet you are exactly where you started.', show: 'title' },
        { say: 'Physics needs two different words for these two ideas. In this lesson, you will meet them both, and see what they do to speed.' },
      ],
    },
    {
      chapter: 'Distance and displacement',
      layout: 'center',
      main: [
        thereAndBack,
        { kind: 'text', id: 'dist', size: 'md', md: '**Distance**: all the ground covered. 8 + 3 = **11 m**' },
        { kind: 'text', id: 'disp', size: 'md', md: '**Displacement**: the change in position. **5 m to the right**' },
      ],
      lines: [
        { say: 'Watch this cart. The grey arrow under the track draws the path it takes.', show: ['sim', 'sim.distance'], play: 'sim.out', playDelay: 2.4 },
        { say: 'So far, it has travelled eight metres. Now it turns round, and rolls part of the way back.', play: 'sim.back', playDelay: 3.2 },
        { say: 'The cart came back three metres. Every metre counts, whichever way it went. So the distance travelled is eight plus three, which is eleven metres.', show: 'dist', focus: 'sim.cart' },
        { say: 'But where did the cart end up? The violet arrow goes straight from where it started to where it is now. The cart is five metres to the right of its start.', show: 'sim.displacement' },
        { say: 'That arrow is the displacement, the change in position. Distance is a scalar. Displacement has a direction, so it is a vector.', show: 'disp', focus: 'sim' },
      ],
    },
    {
      chapter: 'Positive and negative',
      layout: 'center',
      main: [home, { kind: 'callout', id: 'sign', tone: 'tip', title: 'On a straight line', md: 'Choose one direction as **positive**. The opposite direction is **negative**. Add the parts of the journey **with their signs**.' }],
      lines: [
        { say: 'On a straight line, we show the direction with a sign. Here, right is positive and left is negative. Watch this cart go out and come all the way home.', show: ['sim', 'sim.distance', 'sim.displacement'], play: 'sim.trip', playDelay: 5.5 },
        { say: 'The cart travelled ten metres, five out and five back. But it is back where it began, so its displacement is zero.', focus: 'sim.cart' },
        { say: 'Now the cart carries on to the left.', play: 'sim.past', playDelay: 0.6 },
        { say: 'The cart is four metres to the left of its start, so its displacement is minus four metres. The minus sign tells you the direction.', focus: 'sim.cart' },
        { say: 'You can work it out as well. Plus five, minus five, minus four, makes minus four metres. Add the parts of the journey with their signs.', show: 'sign', focus: 'sim' },
      ],
    },
    {
      chapter: 'Velocity',
      layout: 'center',
      main: [
        leftward,
        { kind: 'text', id: 'def', size: 'md', md: '**Velocity** is the **displacement each second**: speed in a stated direction.' },
        { kind: 'math', id: 'vel', size: 'md', lines: ['v = \\dfrac{s}{t} = \\dfrac{-8\\ \\text{m}}{4\\ \\text{s}} = \\good{-2\\ \\text{m/s}}'] },
      ],
      lines: [
        { say: 'Speed tells you how fast. Velocity tells you how fast, and which way. Velocity is the displacement each second.', show: ['sim', 'def'] },
        { say: 'Watch this cart for four seconds. Keep an eye on its displacement.', show: ['sim.clock', 'sim.displacement', 'sim.velocity'], play: 'sim.go', playDelay: 2.2 },
        { say: 'In four seconds, the cart moved eight metres to the left. So its displacement is minus eight metres.', focus: 'sim.cart' },
        { say: 'Velocity equals displacement divided by time. We write v equals s over t, where s stands for displacement. Minus eight divided by four is minus two metres per second.', show: 'vel', focus: 'sim' },
        { say: 'The speed of the cart is two metres per second. The velocity is minus two metres per second, which means two metres per second to the left.', focus: 'vel' },
      ],
    },
    {
      chapter: 'Average speed and average velocity',
      layout: 'center',
      main: [
        journey,
        {
          kind: 'math',
          id: 'avg',
          size: 'md',
          lines: [
            '\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}} = \\dfrac{12\\ \\text{m}}{4\\ \\text{s}} = \\good{3\\ \\text{m/s}}',
            '\\text{average velocity} = \\dfrac{\\text{displacement}}{\\text{total time}} = \\dfrac{+6\\ \\text{m}}{4\\ \\text{s}} = \\good{+1.5\\ \\text{m/s}}',
          ],
        },
      ],
      lines: [
        { say: 'Because distance and displacement can differ, average speed and average velocity can differ as well. Watch one more journey.', show: ['sim', 'sim.clock', 'sim.distance', 'sim.displacement'], play: 'sim.go', playDelay: 6.5 },
        { say: 'In four seconds, this cart travelled twelve metres, but it ended only six metres from its start.', focus: 'sim.cart' },
        { say: 'Average speed uses the total distance. Twelve metres divided by four seconds is three metres per second.', show: 'avg.0', focus: 'sim' },
        { say: 'Average velocity uses the displacement. Plus six metres divided by four seconds is plus one point five metres per second.', show: 'avg.1' },
        { say: 'The cart moved quickly the whole time, yet its average velocity is small, because it turned back. And after a full round trip, the average velocity is zero, however fast the trip was.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A swimmer swims one 50 m length of a pool in 40 s, then turns and swims 50 m back to the start in 60 s. What are the average speed and the average velocity for the whole swim?',
          choices: ['speed 1 m/s, velocity 0 m/s', 'speed 1 m/s, velocity 1 m/s', 'speed 0 m/s, velocity 1 m/s', 'speed 2 m/s, velocity 0 m/s'],
          answer: 0,
          working: 'Distance $= 50 + 50 = 100\\ \\text{m}$ and time $= 40 + 60 = 100\\ \\text{s}$, so the average speed is $1\\ \\text{m/s}$. The swimmer ends at the start, so the displacement is $0\\ \\text{m}$ and the average velocity is $0\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A swimmer swims one fifty metre length of a pool in forty seconds, then turns and swims fifty metres back to the start in sixty seconds. What are the average speed and the average velocity for the whole swim? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The distance is fifty plus fifty, which is one hundred metres, and the time is one hundred seconds. So the average speed is one metre per second. But the swimmer ends at the start, so the displacement is zero, and the average velocity is zero. That is choice A.', show: 'q.answer' },
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
            '**Distance** is all the ground covered: a scalar',
            '**Displacement** is the change in position, with its direction: a vector',
            'On a straight line, a sign gives the direction',
            '**Velocity** = displacement ÷ time',
            'Average speed uses the distance; average velocity uses the displacement',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Distance is all the ground covered. Displacement is the change in position, with its direction.', show: ['sum.0', 'sum.1'] },
        { say: 'On a straight line, a plus or minus sign gives the direction.', show: 'sum.2' },
        { say: 'Velocity equals displacement divided by time.', show: 'sum.3' },
        { say: 'And average speed uses the total distance, while average velocity uses the displacement.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
