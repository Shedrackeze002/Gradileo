import type { Explainer, MotionBody, MotionEl, MotionPhase } from '@/video/script.ts';

// Lesson 1.1: momentum and the change in momentum. It grew out of the sample video the owner
// approved on 14 November 2026 (momentum and collisions): the carts and their momentum bars are
// the same, and everything on the bars is worked out from the masses and velocities in the
// picture (src/video/motion.ts). Carts that roll to the left have negative momentum, a push
// raises the bar while it acts, and a ball that bounces off a wall changes its momentum by more
// than a lump of clay that sticks.

const SPAN: [number, number] = [0, 9.6];

/** One cart rolling at a steady velocity: 2 kg at 3 m/s. */
const one: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: SPAN,
  height: 380,
  bodies: [{ id: 'cart', shape: 'cart', mass: 2, x: 1.2, v: 3, label: '2 kg', tone: 'adj', width: 1.3 }],
  momentumMax: 10,
  momentumTotal: false,
  clips: { roll: { phases: [{ dur: 2.4 }] } },
};

/** Two carts at the same velocity: the heavier one has more momentum. */
const two: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: SPAN,
  height: 560,
  lanes: [{}, {}],
  bodies: [
    { id: 'light', shape: 'cart', mass: 1, x: 1.2, v: 3, lane: 0, label: '1 kg', width: 1.1, tone: 'adj' },
    { id: 'heavy', shape: 'cart', mass: 3, x: 1.2, v: 3, lane: 1, label: '3 kg', width: 1.7, tone: 'opp' },
  ],
  momentumMax: 10,
  momentumTotal: false,
  clips: { roll: { phases: [{ dur: 2.4 }] } },
};

/** Two carts that roll towards each other: +4 and −3, so the total is +1. */
const opposite: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 420,
  bodies: [
    { id: 'blue', shape: 'cart', mass: 2, x: 1.6, v: 2, label: '2 kg', tone: 'adj', width: 1.4 },
    { id: 'orange', shape: 'cart', mass: 3, x: 12.4, v: -1, label: '3 kg', tone: 'opp', width: 1.7 },
  ],
  momentumMax: 6,
  momentumMin: -4,
  velocityScale: 30,
  clips: { roll: { phases: [{ dur: 2.7 }] } },
};

/** A cart that is pushed: 2 kg goes from 1 m/s to 4 m/s, so its momentum rises from 2 to 8. */
const pushed: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: SPAN,
  height: 380,
  bodies: [{ id: 'cart', shape: 'cart', mass: 2, x: 1.1, v: 1, label: '2 kg', tone: 'adj', width: 1.3 }],
  momentumMax: 10,
  momentumTotal: false,
  forceScale: 12,
  clips: {
    coast: { phases: [{ dur: 1.8 }] },
    push: { phases: [{ dur: 1, forces: [{ on: 'cart', name: 'Push', n: 6 }] }, { dur: 0.5 }] },
  },
};

const WALL_X = 8.7;
/** A wall: a block so massive that it takes momentum without visibly moving. */
const wall = (id: string, lane: number, label = 'Wall'): MotionBody => ({ id, shape: 'block', mass: 1e6, x: WALL_X, width: 0.5, label, tone: 'hyp', lane, fixed: true });
/** A 0.5 kg ball that rolls in at 4 m/s. */
const thrown = (id: string, label: string, lane: number, tone: 'adj' | 'opp'): MotionBody => ({ id, shape: 'ball', mass: 0.5, x: 1.4, v: 4, label, tone, lane });
/** Seconds for the ball to reach the wall: its edge meets the face of the wall. */
const REACH = (WALL_X - 0.25 - 0.3 - 1.4) / 4;
const TOUCH = 0.04;
/** The moment at the wall, in slow motion: the wall changes the ball's velocity from 4 m/s to `after`. */
const hit = (after: Record<string, number>, flash: [string, string]): MotionPhase => ({
  dur: TOUCH,
  slow: 8,
  contact: flash,
  forces: Object.entries(after).map(([on, v]) => ({ on, name: 'Wall', n: (0.5 * (v - 4)) / TOUCH, hidden: true })),
});

/** The lesson's rebound, with easier numbers: in at 4 m/s, back at 3 m/s. */
const rebound: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: SPAN,
  height: 370,
  bodies: [thrown('ball', 'Ball', 0, 'adj'), wall('wall', 0)],
  momentumMax: 2.5,
  momentumMin: -2,
  momentumTotal: false,
  velocityScale: 22,
  poster: 'go',
  clips: { go: { phases: [{ dur: REACH }, hit({ ball: -3 }, ['ball', 'wall']), { dur: 1.3 }] } },
};

/** A ball that bounces beside a lump of clay that sticks. */
const bounceOrStick: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: SPAN,
  height: 600,
  lanes: [{ label: 'A ball that bounces' }, { label: 'Clay that sticks' }],
  bodies: [thrown('ball', 'Ball', 0, 'adj'), wall('wall', 0), thrown('clay', 'Clay', 1, 'opp'), wall('wall2', 1, '')],
  momentumMax: 2.5,
  momentumMin: -2,
  momentumTotal: false,
  velocityScale: 22,
  clips: { go: { phases: [{ dur: REACH }, hit({ ball: -3, clay: 0 }, ['ball', 'wall']), { dur: 1.3 }] } },
};

const video: Explainer = {
  id: 'p30-1-1',
  lessonId: 'p30-1-1',
  title: 'Momentum',
  thumbnail: 'sim',
  summary:
    'Momentum is mass times velocity, and it has a direction. Watch carts carry it along a track, see why a cart that rolls the other way counts as negative, and find out why a ball that bounces off a wall changes its momentum by more than a lump of clay that sticks.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Momentum', subtitle: 'How hard a moving object is to stop' }],
      lines: [
        { say: 'A rolling shopping cart is easy to stop. A loaded truck at the same speed is not. And a bullet is far harder to stop than a tossed ball of the same mass.', show: 'title' },
        { say: 'How hard it is to stop something depends on its mass and its velocity together. Physics puts the two into one quantity: momentum.' },
      ],
    },
    {
      chapter: 'What momentum is',
      layout: 'center',
      main: [{ kind: 'text', id: 'def', size: 'lg', md: '[[theta:Momentum]] is **mass × velocity**: $p = mv$' }, one],
      lines: [
        { say: 'To find the momentum of an object, multiply its mass by its velocity.', show: 'def' },
        { say: 'This cart has a mass of two kilograms, and it rolls to the right at three metres per second.', show: ['sim', 'sim.velocity'], play: 'sim.roll', playDelay: 1.2 },
        { say: 'Two times three is six. So its momentum is six kilogram metres per second. The bar under the track shows it.', show: 'sim.bars' },
        { say: 'The mass must be in kilograms, so change grams to kilograms first. And an object at rest has no momentum at all, whatever its mass.', focus: 'sim.cart' },
      ],
    },
    {
      chapter: 'Mass matters',
      layout: 'center',
      main: [two],
      lines: [
        { say: 'Here are two carts with the same velocity, three metres per second. The top cart has a mass of one kilogram. The bottom cart has three kilograms.', show: ['sim', 'sim.velocity'], play: 'sim.roll', playDelay: 2 },
        { say: 'They move side by side, but they do not have the same momentum. One times three is three. Three times three is nine.', show: 'sim.bars' },
        { say: 'The heavy cart has three times the momentum, so it takes three times as much to stop it.', focus: 'sim.heavy' },
      ],
    },
    {
      chapter: 'Momentum has a direction',
      layout: 'center',
      main: [opposite, { kind: 'math', id: 'sum', size: 'md', lines: ['p_{\\text{total}} = \\adj{2 \\times 2} + \\opp{3 \\times (-1)} = \\adj{4} + \\opp{(-3)} = +1\\ \\text{kg·m/s}'] }],
      lines: [
        { say: 'Momentum is a vector. It points the same way as the velocity. Along a straight track, we choose one direction as positive. Here, that is to the right.', show: ['sim', 'sim.velocity'] },
        { say: 'The blue cart rolls to the right at two metres per second. The orange cart rolls to the left, so its velocity is negative one metre per second.', play: 'sim.roll', playDelay: 0.4 },
        { say: 'Blue has two times two, which is positive four. Orange has three times negative one, which is negative three. Its bar grows to the left of zero.', show: 'sim.bars' },
        { say: 'To find the total momentum of the two carts, add them with their signs. Four plus negative three is positive one.', show: ['sim.total', 'sum'] },
        { say: 'If you forget the signs and add four and three, you get seven, which is wrong. Give every velocity its sign first, and then add.', focus: 'sum' },
      ],
    },
    {
      chapter: 'Change in momentum',
      layout: 'center',
      main: [pushed, { kind: 'math', id: 'dp', size: 'md', lines: ['\\Delta p = mv - mu = m(v - u)', '\\Delta p = 2 \\times (4 - 1) = +6\\ \\text{kg·m/s}'] }],
      lines: [
        { say: 'When the velocity of an object changes, its momentum changes too. This cart of two kilograms rolls at one metre per second, so its momentum is two.', show: ['sim', 'sim.velocity', 'sim.bars'], play: 'sim.coast', playDelay: 6.5 },
        { say: 'Now a push speeds it up. Watch the bar while the push acts.', play: 'sim.push', playDelay: 1.2 },
        { say: 'The cart now moves at four metres per second, and its momentum is eight.', focus: 'sim.cart' },
        { say: 'The change in momentum is the final momentum minus the initial momentum. We write u for the velocity at the start, and v for the velocity at the end.', show: 'dp.0' },
        { say: 'So the change is two, times four minus one. That is positive six kilogram metres per second.', show: 'dp.1' },
      ],
    },
    {
      chapter: 'A rebound',
      layout: 'center',
      main: [rebound, { kind: 'math', id: 'rb', size: 'md', lines: ['u = +4\\ \\text{m/s} \\qquad v = \\bad{-3\\ \\text{m/s}}', '\\Delta p = m(v - u) = 0.5 \\times (\\bad{-3} - 4) = \\bad{-3.5\\ \\text{kg·m/s}}'] }],
      lines: [
        { say: 'The sign matters most when an object turns back. This ball has a mass of half a kilogram. It rolls towards a wall at four metres per second, so its momentum is positive two.', show: ['sim', 'sim.velocity', 'sim.bars'] },
        { say: 'Watch the bar as the ball hits the wall and bounces back.', play: 'sim.go', playDelay: 0.8 },
        { say: 'It comes back at three metres per second. It now moves to the left, so its final velocity is negative three.', show: 'rb.0', focus: 'sim.ball' },
        { say: 'The change in momentum is 0.5, times negative three minus four. That is 0.5 times negative seven, which is negative 3.5.', show: 'rb.1' },
        { say: 'The change points to the left, the way the wall pushed the ball. And notice the trap. The velocities differ by seven, not by one, because they point in opposite directions.', focus: 'rb.1' },
      ],
    },
    {
      chapter: 'Bounce or stick',
      layout: 'center',
      main: [bounceOrStick],
      lines: [
        { say: 'Here is the same ball beside a lump of clay of the same mass. Both hit the wall at four metres per second. The ball bounces, and the clay sticks.', show: ['sim', 'sim.velocity', 'sim.bars'] },
        { say: 'Which one has the greater change in momentum?', play: 'sim.go', playDelay: 0.4 },
        { say: 'The clay went from positive two to zero, a change of negative two. The ball went from positive two to negative 1.5, a change of negative 3.5.', focus: 'sim.clay' },
        { say: 'The ball that bounces has the greater change, because the wall has to stop it, and then throw it back.', focus: 'sim.ball' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 0.2 kg ball moving to the right at 10 m/s hits a wall and bounces straight back at 8 m/s. Take right as positive. What is the change in its momentum?',
          choices: ['$-0.4\\ \\text{kg·m/s}$', '$+0.4\\ \\text{kg·m/s}$', '$-3.6\\ \\text{kg·m/s}$', '$+3.6\\ \\text{kg·m/s}$'],
          answer: 2,
          working: '$u = +10$ and $v = -8$, so $\\Delta p = 0.2 \\times (-8 - 10) = -3.6\\ \\text{kg·m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball of 0.2 kilograms moves to the right at ten metres per second. It hits a wall and bounces straight back at eight metres per second. Take right as positive. What is the change in its momentum? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The ball starts at positive ten and ends at negative eight. So the change is 0.2, times negative eight minus ten. That is 0.2 times negative eighteen, which is negative 3.6. That is choice C.', show: 'q.answer' },
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
            '**Momentum** = mass × velocity: $p = mv$, in kg·m/s',
            'Momentum is a **vector**: give each velocity a sign, then add',
            '**Change in momentum**: $\\Delta p = m(v - u)$',
            'An object that **rebounds** changes its momentum by more than one that stops',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Momentum is mass times velocity, in kilogram metres per second.', show: 'sum.0' },
        { say: 'It is a vector. Along a line, give each velocity a sign, and add the momenta with their signs.', show: 'sum.1' },
        { say: 'The change in momentum is the mass, times the final velocity minus the initial velocity.', show: 'sum.2' },
        { say: 'And an object that rebounds has a greater change in momentum than one that only stops.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
