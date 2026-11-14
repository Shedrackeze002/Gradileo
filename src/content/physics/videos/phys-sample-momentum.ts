import type { Explainer, MotionBody, MotionEl } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// A sample of the animated physics videos (not yet a lesson of a course): momentum, and how a
// collision passes it from one cart to another. The carts are moved by the forces they put on
// each other while they touch (src/video/motion.ts), so the totals on the bars are the physics,
// not numbers typed in.

const SPAN: [number, number] = [0, 9.6];

/** One cart rolling at a steady velocity. */
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
  height: 580,
  lanes: [{}, {}],
  bodies: [
    { id: 'light', shape: 'cart', mass: 1, x: 1.2, v: 3, lane: 0, label: '1 kg', width: 1.1, tone: 'adj' },
    { id: 'heavy', shape: 'cart', mass: 3, x: 1.2, v: 3, lane: 1, label: '3 kg', width: 1.7, tone: 'opp' },
  ],
  momentumMax: 10,
  momentumTotal: false,
  clips: { roll: { phases: [{ dur: 2.4 }] } },
};

/** A collision on one track, in three clips: the approach, the touch (slowed if asked) and after. */
function crash(a: MotionBody, b: MotionBody, o: { type: 'stick' | 'bounce'; after: number; slow?: number; max: number; height?: number }): MotionEl {
  const [approach, touch, away] = collision(a, b, { type: o.type, after: o.after, slow: o.slow, note: o.slow ? 'Slow motion' : undefined, names: ['Force on blue', 'Force on orange'], hidden: !o.slow });
  return {
    kind: 'motion',
    id: 'sim',
    span: SPAN,
    height: o.height ?? 440,
    bodies: [a, b],
    momentumMax: o.max,
    forceScale: 3,
    velocityScale: 26,
    poster: 'touch',
    clips: {
      hit: { reset: true, phases: [approach, touch, away] },
      approach: { reset: true, phases: [approach] },
      touch: { phases: [touch] },
      away: { phases: [away] },
    },
  };
}

const blue = (mass: number, v: number, x = 1.2): MotionBody => ({ id: 'blue', shape: 'cart', mass, x, v, label: 'Blue', tone: 'adj', width: 0.9 + 0.2 * mass });
const orange = (mass: number, x: number): MotionBody => ({ id: 'orange', shape: 'cart', mass, x, label: 'Orange', tone: 'opp', width: 0.9 + 0.2 * mass });

// Blue, 2 kg at 3 m/s, meets orange, 4 kg at rest: they couple and roll on at 1 m/s.
const couple = () => crash(blue(2, 3), orange(4, 5.6), { type: 'stick', after: 2.6, max: 7.5 });
const coupleSlow = () => crash(blue(2, 3, 2.4), orange(4, 5.6), { type: 'stick', after: 2.4, slow: 165, max: 7.5 });
// Equal carts, 1 kg each: blue stops and orange leaves with all the momentum.
const bounce = () => crash(blue(1, 4), orange(1, 4.6), { type: 'bounce', after: 1, max: 5 });
// The "Your turn" collision: 3 kg at 4 m/s meets 1 kg at rest, and they couple at 3 m/s.
const check = () => crash(blue(3, 4), orange(1, 5), { type: 'stick', after: 1.1, max: 14 });

const video: Explainer = {
  id: 'phys-sample-momentum',
  lessonId: '',
  label: 'Momentum',
  tags: ['physics', 'momentum', 'collisions', 'conservation of momentum', 'Newton’s third law', 'high school physics'],
  title: 'Momentum and Collisions',
  thumbnail: 'sim',
  summary:
    'Momentum is mass times velocity. Watch two carts collide and see momentum pass from one to the other while the total stays exactly the same, then slow the collision down to see why: the carts push on each other with equal and opposite forces.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum', title: 'Momentum and Collisions', subtitle: 'A collision shares motion out, but never loses it' }],
      lines: [
        { say: 'A rolling shopping cart is easy to stop. A rolling truck at the same speed is not. The difference between them is momentum.', show: 'title' },
        { say: 'In this video, you will see what momentum is, and watch it pass from one cart to another in a collision.' },
      ],
    },
    {
      chapter: 'What momentum is',
      layout: 'center',
      main: [{ kind: 'text', id: 'def', size: 'lg', md: '[[theta:Momentum]] is **mass × velocity**: $p = m \\times v$' }, one],
      lines: [
        { say: 'Momentum is how much motion an object has. To find it, multiply the mass by the velocity.', show: 'def' },
        { say: 'This cart has a mass of two kilograms, and it rolls to the right at three metres per second.', show: ['sim', 'sim.velocity'], play: 'sim.roll', playDelay: 1.2 },
        { say: 'Two times three is six. So its momentum is six kilogram metres per second. The bar under the track shows it.', show: 'sim.bars' },
        { say: 'Momentum has a direction as well. It points the same way as the velocity.', focus: 'sim.cart' },
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
      chapter: 'A collision',
      layout: 'center',
      main: [couple(), { kind: 'text', id: 'point', size: 'lg', md: 'Momentum **passed** from blue to orange. The [[theta:total]] did not change.' }],
      lines: [
        { say: 'Now for a collision. The blue cart has a mass of two kilograms, and it rolls at three metres per second. The orange cart has four kilograms, and it is at rest.', show: ['sim', 'sim.velocity'] },
        { say: 'Before they meet, look at the bars. Blue has six. Orange has zero. So the total momentum is six.', show: ['sim.bars', 'sim.total'] },
        { say: 'Watch the bars as the carts collide and lock together.', play: 'sim.hit', playDelay: 1.6 },
        { say: 'The blue cart slowed down, and the orange cart sped up. Now they roll together at one metre per second.', focus: ['sim.blue', 'sim.orange'] },
        { say: 'Blue’s momentum fell from six to two. Orange’s rose from zero to four. Blue lost exactly what orange gained, so the total is still six.', show: 'point', focus: 'sim' },
      ],
    },
    {
      chapter: 'Why the total stays the same',
      layout: 'center',
      main: [coupleSlow(), { kind: 'callout', id: 'law', tone: 'key', title: 'Conservation of momentum', md: 'Total momentum **before** a collision = total momentum **after** it.' }],
      lines: [
        { say: 'Here is the same collision again. This time, we slow the moment of contact right down.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'], play: 'sim.approach', playDelay: 4.4 },
        {
          say: 'While the bumpers are squeezed together, the blue cart pushes the orange cart forwards. And the orange cart pushes the blue cart backwards, exactly as hard. That is Newton’s third law. The two forces are equal, they point in opposite directions, and they last for exactly the same time.',
          play: 'sim.touch',
        },
        { say: 'So every bit of momentum that the blue cart loses, the orange cart gains. None is lost, and none is created.', play: 'sim.away', playDelay: 1 },
        { say: 'This is the law of conservation of momentum. The total momentum before a collision equals the total momentum after it.', show: 'law' },
      ],
    },
    {
      chapter: 'A bounce',
      layout: 'center',
      main: [bounce()],
      lines: [
        { say: 'Carts do not have to lock together. These two have the same mass, one kilogram each, and springy bumpers. Blue rolls in at four metres per second.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'Watch where the momentum goes this time.', play: 'sim.hit', playDelay: 1.4 },
        { say: 'The blue cart stopped dead, and the orange cart left with all four units of momentum. All of it was passed on, and the total is still four.', focus: 'sim.orange' },
      ],
    },
    {
      chapter: 'Predicting a collision',
      layout: 'center',
      main: [
        { kind: 'text', id: 'lead', size: 'lg', md: 'Total momentum **before** = total momentum **after**' },
        { kind: 'math', id: 'work', size: 'lg', lines: ['\\adj{2 \\times 3} + \\opp{4 \\times 0} = (\\adj{2} + \\opp{4}) \\times v', '6 = 6 \\times v', 'v = 1\\ \\text{m/s}'] },
      ],
      lines: [
        { say: 'Because the total never changes, we can predict a collision before it happens.', show: 'lead' },
        { say: 'Take the two carts that locked together. Before, blue had two times three, and orange had four times zero. After, they move as one object of six kilograms, at one velocity.', show: 'work.0' },
        { say: 'So six equals six times the velocity.', show: 'work.1' },
        { say: 'The velocity is one metre per second, which is exactly what the carts did.', show: 'work.2', focus: 'work.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 3 kg cart moving at 4 m/s hits a 1 kg cart that is at rest. The carts lock together. How fast do they move afterwards?',
          choices: ['$1\\ \\text{m/s}$', '$3\\ \\text{m/s}$', '$4\\ \\text{m/s}$', '$12\\ \\text{m/s}$'],
          answer: 1,
          working: 'Before: $3 \\times 4 + 1 \\times 0 = 12\\ \\text{kg·m/s}$. After: $(3 + 1) \\times v = 12$, so $v = 3\\ \\text{m/s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A three kilogram cart moving at four metres per second hits a one kilogram cart that is at rest. The carts lock together. How fast do they move afterwards? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Before the collision, the total momentum is three times four, which is twelve. Afterwards, four kilograms move together, and twelve divided by four is three metres per second. That is choice B.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Check it',
      layout: 'center',
      main: [check()],
      lines: [
        { say: 'Do not just take my word for it. Here is that collision. Blue is the three kilogram cart, with twelve units of momentum.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'Watch the speed after they lock together.', play: 'sim.hit', playDelay: 1.4 },
        { say: 'Three metres per second, and the total is still twelve.', focus: ['sim.blue', 'sim.orange'] },
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
            '**Momentum** = mass × velocity, in kg·m/s',
            'In a collision, objects push on each other with **equal and opposite** forces',
            'What one object loses, the other **gains**',
            'Total momentum before = total momentum after',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Momentum is mass times velocity.', show: 'sum.0' },
        { say: 'In a collision, the objects push on each other with equal and opposite forces.', show: 'sum.1' },
        { say: 'So whatever momentum one object loses, the other gains.', show: 'sum.2' },
        { say: 'And the total momentum before the collision equals the total momentum after it.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
