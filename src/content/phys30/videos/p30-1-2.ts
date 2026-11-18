import type { Explainer, MotionBody, MotionEl } from '@/video/script.ts';

// Lesson 1.2, first half: impulse. A push raises a cart's momentum bar for as long as it acts, a
// large force for a short time and a small force for a long time give two carts the same
// momentum, a kick is played in slow motion, and two carts with the same momentum to lose are
// stopped in half a second and in two seconds: the longer stop needs a quarter of the force.
// Everything on the bars is worked out from the forces in the picture (src/video/motion.ts).

const SPAN: [number, number] = [0, 9.6];

/** A 2 kg cart at rest that is pushed with 4 N for 2 s: its momentum grows to 8 kg·m/s. */
const pushed: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: SPAN,
  height: 400,
  bodies: [{ id: 'cart', shape: 'cart', mass: 2, x: 1.2, label: '2 kg', tone: 'adj', width: 1.3 }],
  momentumMax: 10,
  momentumTotal: false,
  forceScale: 16,
  clips: { push: { phases: [{ dur: 2, forces: [{ on: 'cart', name: 'Push', n: 4 }] }, { dur: 0.6 }] } },
};

/** Two carts of 2 kg each, named A and B so that their momentum bars can be told apart. */
const cart = (id: string, lane: number, tone: 'adj' | 'opp', x = 1, v = 0): MotionBody => ({ id, shape: 'cart', mass: 2, x, v, label: lane ? 'B' : 'A', tone, lane, width: 1.3 });

/** The same impulse two ways: 6 N for 1 s, and 2 N for 3 s. Both carts end with 6 kg·m/s. */
const twoWays: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11],
  height: 560,
  lanes: [{}, {}],
  bodies: [cart('short', 0, 'adj'), cart('long', 1, 'opp')],
  momentumMax: 8,
  momentumTotal: false,
  forceScale: 16,
  clips: {
    go: {
      phases: [
        { dur: 1, forces: [{ on: 'short', name: 'Push', n: 6 }, { on: 'long', name: 'Push', n: 2 }] },
        { dur: 2, forces: [{ on: 'long', name: 'Push', n: 2 }] },
        { dur: 0.4 },
      ],
    },
  },
};

/** A kick in slow motion: 1000 N for 0.01 s on a 0.5 kg ball, which leaves at 20 m/s. */
const kick: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: SPAN,
  height: 440,
  bodies: [{ id: 'ball', shape: 'ball', mass: 0.5, x: 1.5, label: '0.5 kg', tone: 'adj' }],
  momentumMax: 12,
  momentumTotal: false,
  forceScale: 0.14,
  velocityScale: 6,
  clips: {
    kick: {
      phases: [
        { dur: 0.01, slow: 150, note: 'Slow motion', forces: [{ on: 'ball', name: 'Kick', n: 1000 }] },
        { dur: 0.3, slow: 12, note: 'Slow motion' },
      ],
    },
  },
};

/** Two carts with 8 kg·m/s to lose: one is stopped by 16 N in 0.5 s, the other by 4 N in 2 s. */
const stops: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11],
  height: 540,
  lanes: [{ label: 'A hard stop' }, { label: 'A cushioned stop' }],
  // The carts start clear of the names of their tracks.
  bodies: [cart('hard', 0, 'adj', 3, 4), cart('soft', 1, 'opp', 3, 4)],
  momentumMax: 10,
  momentumTotal: false,
  forceScale: 8,
  velocityScale: 20,
  clips: {
    go: {
      phases: [
        { dur: 0.6 },
        { dur: 0.5, forces: [{ on: 'hard', name: 'Stop', n: -16, tone: 'bad' }, { on: 'soft', name: 'Stop', n: -4, tone: 'bad' }] },
        { dur: 1.5, forces: [{ on: 'soft', name: 'Stop', n: -4, tone: 'bad' }] },
        { dur: 0.5 },
      ],
    },
  },
};

const video: Explainer = {
  id: 'p30-1-2',
  lessonId: 'p30-1-2',
  title: 'Impulse',
  thumbnail: 'sim',
  summary:
    'A force changes momentum, and how much depends on how long it acts. Watch a push fill a momentum bar, see a large force for a short time match a small force for a long time, find the force of a kick, and learn why an airbag, which makes a stop last longer, makes the force smaller.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Impulse', subtitle: 'How a force changes momentum' }],
      lines: [
        { say: 'A cricketer who catches a fast ball draws the hands back as the ball arrives. A car has a front that is built to crumple. Both do the same thing. They make a change in momentum take longer.', show: 'title' },
        { say: 'To see why that helps, we need one idea: impulse.' },
      ],
    },
    {
      chapter: 'A force changes momentum',
      layout: 'center',
      main: [pushed, { kind: 'math', id: 'imp', size: 'md', lines: ['\\text{impulse} = F\\Delta t = \\opp{4 \\times 2} = \\opp{8\\ \\text{N·s}}', '\\thc{F\\Delta t = \\Delta p = m(v - u)}'] }],
      lines: [
        { say: 'This cart of two kilograms is at rest, so it has no momentum. Now a steady push of four newtons acts on it for two seconds. Watch the momentum bar.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.clock'], play: 'sim.push', playDelay: 8.5 },
        { say: 'While the push acted, the momentum grew steadily. After two seconds it was eight kilogram metres per second. Then the push stopped, and the momentum stayed the same.', focus: 'sim.cart' },
        { say: 'The force multiplied by the time for which it acts is called the impulse. Four newtons for two seconds is an impulse of eight newton seconds.', show: 'imp.0' },
        { say: 'And that is exactly the change in momentum. The impulse of the net force on an object equals the change in its momentum. This is Newton’s second law, written another way.', show: 'imp.1' },
        { say: 'A newton second is the same as a kilogram metre per second, so the units agree.' },
      ],
    },
    {
      chapter: 'Force and time',
      layout: 'center',
      main: [twoWays, { kind: 'math', id: 'same', size: 'md', lines: ['\\adj{6 \\times 1 = 6\\ \\text{N·s}} \\qquad \\opp{2 \\times 3 = 6\\ \\text{N·s}}'] }],
      lines: [
        { say: 'The impulse depends on two things: how large the force is, and how long it acts. Here are two carts of two kilograms each. Cart A gets a push of six newtons for one second. Cart B gets only two newtons, but for three seconds.', show: ['sim', 'sim.velocity', 'sim.bars'] },
        { say: 'Watch the two momentum bars.', play: 'sim.go', playDelay: 0.3, wait: 1.6 },
        { say: 'Six times one is six newton seconds. Two times three is six newton seconds. The impulses are equal, so both carts end with the same momentum, and the same velocity.', show: 'same' },
        { say: 'A small force for a long time can do the same as a large force for a short time.' },
      ],
    },
    {
      chapter: 'Finding the force',
      layout: 'center',
      main: [kick, { kind: 'math', id: 'f', size: 'md', lines: ['F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{0.5 \\times (20 - 0)}{0.01} = \\opp{1000\\ \\text{N}}'] }],
      lines: [
        { say: 'Turn the equation round, and it gives the force. A ball of half a kilogram is at rest. A boot kicks it, and the ball leaves at twenty metres per second. The boot touches the ball for only one hundredth of a second.', show: ['sim', 'sim.velocity', 'sim.bars'] },
        { say: 'Here is the kick, slowed down.', play: 'sim.kick', playDelay: 0.4, wait: 2.6 },
        { say: 'The change in momentum is 0.5 times twenty, which is ten kilogram metres per second. Divide by the time, 0.01 seconds, and the average force is one thousand newtons.', show: 'f' },
        { say: 'That is about the weight of a person of one hundred kilograms, from a single kick. A short time means a large force.' },
      ],
    },
    {
      chapter: 'Making a stop safer',
      layout: 'center',
      main: [stops, { kind: 'text', id: 'rule', size: 'md', md: 'The same $\\Delta p$ over a **longer time** needs a **smaller force**' }],
      lines: [
        { say: 'Now use the idea the other way. In a crash, a passenger must lose all of the momentum that the passenger had. Nothing can change that. What a designer can change is the time.', show: ['sim', 'sim.velocity', 'sim.bars'] },
        { say: 'These two carts have the same mass, two kilograms, and the same velocity, so they have the same momentum to lose. Cart A is stopped in half a second. Cart B is stopped in two seconds. Watch the red arrows.', play: 'sim.go', playDelay: 11.5 },
        { say: 'Both carts lost eight kilogram metres per second, so the impulse was the same. But the stop that took four times as long needed only a quarter of the force: four newtons, not sixteen.', show: 'rule' },
      ],
    },
    {
      chapter: 'An airbag',
      layout: 'center',
      main: [
        { kind: 'math', id: 'bag', size: 'md', lines: ['\\Delta p = 70 \\times 15 = 1050\\ \\text{kg·m/s}', '\\text{dashboard:}\\quad F = \\dfrac{1050}{0.01} = \\bad{105\\,000\\ \\text{N}}', '\\text{airbag:}\\quad F = \\dfrac{1050}{0.25} = \\good{4200\\ \\text{N}}'] },
        { kind: 'callout', id: 'trap', tone: 'mistake', title: 'A common mistake', md: 'The airbag does **not** reduce the impulse. It spreads the same impulse over a longer time.' },
      ],
      lines: [
        { say: 'Here it is with the numbers of a real crash. A passenger of seventy kilograms moves at fifteen metres per second, and is brought to rest. The momentum to lose is seventy times fifteen, which is 1,050.', show: 'bag.0' },
        { say: 'Without an airbag, the passenger hits the dashboard and stops in one hundredth of a second. The average force is one hundred and five thousand newtons.', show: 'bag.1' },
        { say: 'An airbag makes the stop last a quarter of a second. Now the force is 4,200 newtons. The stop takes twenty-five times as long, so the force is twenty-five times smaller.', show: 'bag.2' },
        { say: 'Take care with the words. The airbag does not reduce the impulse, because the change in momentum is the same. It spreads the same impulse over a longer time. Seat belts, crumple zones and helmets all work this way.', show: 'trap' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 1200 kg car moving at 25 m/s brakes with a steady net force of 6000 N. How long does it take to stop?',
          choices: ['$0.2\\ \\text{s}$', '$2.5\\ \\text{s}$', '$4\\ \\text{s}$', '$5\\ \\text{s}$'],
          answer: 3,
          working: '$\\Delta p = 1200 \\times 25 = 30\\,000\\ \\text{kg·m/s}$, so $\\Delta t = \\dfrac{\\Delta p}{F} = \\dfrac{30\\,000}{6000} = 5\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A car of twelve hundred kilograms moves at twenty-five metres per second. It brakes with a steady net force of six thousand newtons. How long does it take to stop? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The car must lose all of its momentum: twelve hundred times twenty-five, which is thirty thousand. The time is the change in momentum over the force. Thirty thousand over six thousand is five seconds. That is choice D.', show: 'q.answer' },
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
            '**Impulse** = force × time: $F\\Delta t$, in N·s',
            'Impulse = **change in momentum**: $F\\Delta t = m(v - u)$',
            'Average force: $F = \\Delta p \\div \\Delta t$',
            'A **longer** stop needs a **smaller** force: airbags, crumple zones, helmets',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Impulse is force multiplied by time, in newton seconds.', show: 'sum.0' },
        { say: 'The impulse of the net force equals the change in momentum.', show: 'sum.1' },
        { say: 'So the average force is the change in momentum, divided by the time.', show: 'sum.2' },
        { say: 'And when a stop is made to last longer, the same change in momentum needs a smaller force.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
