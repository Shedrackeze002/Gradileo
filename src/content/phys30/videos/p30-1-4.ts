import type { Explainer, MotionBody, MotionEl, MotionPhase } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Lesson 1.4, first half: kinetic energy in collisions. The carts are moved by the forces they
// put on each other while they touch (src/video/motion.ts), and the energy bars are worked out
// from their masses and velocities, so the kinetic energy that a collision loses is measured, not
// typed in. One collision is played three ways side by side (elastic, inelastic and completely
// inelastic), and a ballistic pendulum is taken in its two stages: the impact, which conserves
// momentum, and the swing, which conserves energy.

const slowed = (phases: MotionPhase[], slow: number): MotionPhase[] => phases.map((ph) => ({ ...ph, slow, note: 'Slow motion' }));

// The lesson's carts: 2 kg at 6 m/s meets 4 kg at rest, and they stick. 36 J becomes 12 J.
const blue: MotionBody = { id: 'blue', shape: 'cart', mass: 2, x: 1.2, v: 6, label: '2 kg', tone: 'adj', width: 1.3 };
const orange: MotionBody = { id: 'orange', shape: 'cart', mass: 4, x: 5.4, label: '4 kg', tone: 'opp', width: 1.7 };
const stick: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 490,
  bodies: [blue, orange],
  energy: { of: ['blue', 'orange'], max: 40, bars: ['kinetic'], system: ['kinetic', 'lost'] },
  velocityScale: 18,
  clips: { hit: { phases: slowed(collision(blue, orange, { type: 'stick', after: 1.3, hidden: true }), 2) } },
};

/**
 * The same collision three ways, one on each track. The bumpers squeeze less the more they bounce,
 * so that the three touch for the same time and one clip can play them together.
 */
const KINDS = [1, 0.5, 0];
const pairs = KINDS.map((_, lane): [MotionBody, MotionBody] => [
  { id: `blue${lane}`, shape: 'cart', mass: 2, x: 1.5, v: 6, label: '2 kg', tone: 'adj', width: 1.3, lane },
  { id: `orange${lane}`, shape: 'cart', mass: 4, x: 6, label: '4 kg', tone: 'opp', width: 1.7, lane },
]);
const threePhases = (): MotionPhase[] => {
  const each = pairs.map(([a, b], i) => collision(a, b, { type: KINDS[i] ? 'bounce' : 'stick', restitution: KINDS[i], squeeze: 0.08 / (1 + KINDS[i]), after: 0.6, hidden: true }));
  // Every pair approaches, touches and parts for the same times: the phases are laid over one another.
  return slowed(each[0].map((ph, pi) => ({ ...ph, forces: each.flatMap((phases) => phases[pi].forces ?? []) })), 3);
};
const three: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11],
  height: 560,
  lanes: [{ label: 'Elastic', labelSide: 'right' }, { label: 'Inelastic', labelSide: 'right' }, { label: 'Completely inelastic', labelSide: 'right' }],
  bodies: pairs.flat(),
  velocityScale: 14,
  clips: { hit: { phases: threePhases() } },
};

// The lesson's ballistic pendulum: a 10 g bullet at 199 m/s stops inside a 2 kg block.
const bullet: MotionBody = { id: 'bullet', shape: 'ball', mass: 0.01, x: 1.2, v: 199, label: 'Bullet', tone: 'opp', width: 0.3 };
const block: MotionBody = { id: 'block', shape: 'block', mass: 2, x: 6, label: '2 kg', tone: 'adj', width: 1.4 };
const [fly, strike, carry] = collision(bullet, block, { type: 'stick', after: 1.5, squeeze: 0.4, hidden: true });
const impact: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 490,
  bodies: [bullet, block],
  energy: { of: ['bullet', 'block'], max: 200, bars: ['kinetic'], system: ['kinetic', 'lost'], labels: { bullet: 'Bullet', block: 'Block' } },
  velocityScale: 0.5,
  velocityDecimals: 2,
  clips: { hit: { phases: [...slowed([fly, strike], 120), carry] } },
};

/** Seconds for the block to reach the top of its swing: a quarter of the period of a 1 m pendulum that swings 18°. */
const QUARTER = 0.505;
const swing: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [-1.5, 1.5],
  height: 470,
  path: { g: 9.81, swing: { length: 1, angle: 30 } },
  bodies: [{ id: 'bob', shape: 'ball', mass: 2.01, x: 0, v: 0.99, width: 0.3, label: 'Block', tone: 'adj' }],
  energy: { max: 1.2, bars: ['kinetic', 'potential', 'total'] },
  velocityScale: 60,
  velocityDecimals: 2,
  cm: true,
  clips: { up: { phases: [{ dur: QUARTER, slow: 4, note: 'Slow motion' }] } },
};

const video: Explainer = {
  id: 'p30-1-4',
  lessonId: 'p30-1-4',
  title: 'Kinetic Energy in Collisions',
  thumbnailTitle: 'Energy in Collisions',
  thumbnail: 'sim',
  summary:
    'Momentum is conserved in every collision, but kinetic energy is not. Watch the energy bars as two carts stick together, see the same collision played three ways (elastic, inelastic and completely inelastic), and follow a ballistic pendulum through its two stages to find the speed of a bullet.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Kinetic Energy in Collisions', subtitle: 'Elastic and inelastic collisions' }],
      lines: [
        { say: 'Drop a steel ball on a steel plate, and it bounces back almost to the height it fell from. Drop a ball of clay, and it stops dead with a thud.', show: 'title' },
        { say: 'Momentum is conserved in both collisions. What differs is the kinetic energy.' },
      ],
    },
    {
      chapter: 'Sticking loses energy',
      layout: 'center',
      main: [stick, { kind: 'math', id: 'ek', size: 'md', lines: ['\\text{before: } \\tfrac{1}{2} \\times 2 \\times 6^2 = \\good{36\\ \\text{J}} \\qquad \\text{after: } \\tfrac{1}{2} \\times 6 \\times 2^2 = \\good{12\\ \\text{J}}'] }],
      lines: [
        { say: 'Kinetic energy is half the mass, times the speed squared. The blue cart, two kilograms, moves at six metres per second, so it has thirty-six joules. The orange cart, four kilograms, is at rest.', show: ['sim', 'sim.velocity', 'sim.energy', 'sim.total'] },
        { say: 'They collide and stick together. Watch the energy bars.', play: 'sim.hit', playDelay: 0.6, wait: 0.8 },
        { say: 'Momentum gives the speed afterwards: two times six equals six times the velocity, so the carts move at two metres per second. That is exactly what they did.', focus: ['sim.blue', 'sim.orange'] },
        { say: 'But look at the energy. Before, thirty-six joules. After, half times six times two squared, which is only twelve. Twenty-four joules of kinetic energy are gone: two thirds of it.', show: 'ek' },
        { say: 'It was not destroyed. It became thermal energy and sound, and it did the work of bending the carts.' },
      ],
    },
    {
      chapter: 'Three kinds of collision',
      layout: 'center',
      main: [three, { kind: 'text', id: 'after', size: 'md', md: 'Kinetic energy left: **36 J**, **18 J** and **12 J** out of 36 J' }],
      lines: [
        { say: 'Here is that same collision three times, with three kinds of bumper. Each blue cart brings twelve units of momentum and thirty-six joules.', show: ['sim', 'sim.velocity'] },
        { say: 'Watch the three together.', play: 'sim.hit', playDelay: 0.4, wait: 1 },
        { say: 'On the top track, the carts bounce apart and keep all thirty-six joules. A collision that loses no kinetic energy is called elastic.', focus: ['sim.blue0', 'sim.orange0'] },
        { say: 'On the middle track, the blue cart stops and the orange cart leaves at three metres per second. Only eighteen joules are left. Some kinetic energy is lost, so the collision is inelastic.', focus: ['sim.blue1', 'sim.orange1'] },
        { say: 'On the bottom track, the carts stick. This is a completely inelastic collision. It loses as much kinetic energy as the conservation of momentum allows.', focus: ['sim.blue2', 'sim.orange2'] },
        { say: 'To find out which kind a collision is, work out the total kinetic energy before and after, and compare. The momentum is the same in all three.', show: 'after' },
      ],
    },
    {
      chapter: 'The ballistic pendulum',
      layout: 'center',
      main: [impact, { kind: 'text', id: 'stage1', size: 'md', md: '**The impact**: momentum is conserved, but most of the kinetic energy is lost' }],
      lines: [
        { say: 'A bullet is too fast to time with a stopwatch. A ballistic pendulum measures its speed with a ruler. The bullet is fired into a heavy block that hangs on strings, and the block swings up.', show: ['sim', 'sim.velocity', 'sim.energy', 'sim.total'] },
        { say: 'There are two stages, and each obeys a different law. First, the impact. A bullet of ten grams stops inside a block of two kilograms.', play: 'sim.hit', playDelay: 6.5 },
        { say: 'This is a completely inelastic collision. Momentum is conserved. But the bullet arrived with about one hundred and ninety-eight joules, and the block and bullet leave with about one. More than ninety-nine percent of the kinetic energy has become thermal energy in the wood.', show: 'stage1' },
      ],
    },
    {
      chapter: 'The swing',
      layout: 'center',
      main: [swing, { kind: 'math', id: 'rise', size: 'md', lines: ['\\tfrac{1}{2}v^2 = gh \\qquad v = \\sqrt{2 \\times 9.81 \\times 0.05} = \\good{0.990\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Second, the swing. The block and the bullet rise together, and now mechanical energy is conserved. Watch the kinetic energy turn into potential energy.', show: ['sim', 'sim.velocity', 'sim.height', 'sim.length', 'sim.energy', 'sim.total'], play: 'sim.up', playDelay: 7 },
        { say: 'The block rose five centimetres. Half v squared equals g times h, so the speed just after the impact was the square root of two, times 9.81, times 0.05. That is 0.990 metres per second.', show: 'rise' },
      ],
    },
    {
      chapter: 'The speed of the bullet',
      layout: 'center',
      main: [
        { kind: 'math', id: 'u', size: 'md', lines: ['0.010 \\times u = (2 + 0.010) \\times 0.990', 'u = \\dfrac{2.010 \\times 0.990}{0.010} = \\good{199\\ \\text{m/s}}'] },
        { kind: 'callout', id: 'trap', tone: 'mistake', title: 'Energy across the impact', md: 'Setting the bullet’s kinetic energy equal to the block’s potential energy gives about 14 m/s, far too slow. Use **momentum for the impact**, and **energy only for the swing**.' },
      ],
      lines: [
        { say: 'Now go back to the impact, which conserves momentum. The momentum of the bullet before equals the momentum of the block and bullet after.', show: 'u.0' },
        { say: 'So the speed of the bullet was 2.010 times 0.990, over 0.010. That is one hundred and ninety-nine metres per second.', show: 'u.1' },
        { say: 'Here is the mistake to avoid. It is tempting to skip the momentum step, and say that the kinetic energy of the bullet becomes the potential energy of the block. That gives about fourteen metres per second, which is far too slow, because it ignores the energy lost in the wood. Use momentum for the impact, and energy only for the swing.', show: 'trap' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 1 kg cart moving at 4 m/s hits a 1 kg cart at rest, and the two stick together. How much kinetic energy is lost?',
          choices: ['$0\\ \\text{J}$', '$2\\ \\text{J}$', '$8\\ \\text{J}$', '$4\\ \\text{J}$'],
          answer: 3,
          working: 'Momentum: $1 \\times 4 = 2v$, so $v = 2\\ \\text{m/s}$. Before: $\\tfrac{1}{2} \\times 1 \\times 4^2 = 8\\ \\text{J}$. After: $\\tfrac{1}{2} \\times 2 \\times 2^2 = 4\\ \\text{J}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A one kilogram cart moving at four metres per second hits a one kilogram cart at rest, and the two stick together. How much kinetic energy is lost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Momentum first. One times four equals two times the velocity, so they move at two metres per second. Before, the kinetic energy is half, times one, times four squared: eight joules. After, it is half, times two, times two squared: four joules. So four joules are lost. Choice D is correct.', show: 'q.answer' },
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
            'Momentum is conserved in **every** collision',
            '**Elastic**: kinetic energy is conserved too',
            '**Inelastic**: some is lost. Objects that stick lose the most',
            'Ballistic pendulum: **momentum** for the impact, **energy** for the swing',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Momentum is conserved in every collision.', show: 'sum.0' },
        { say: 'In an elastic collision, kinetic energy is conserved as well.', show: 'sum.1' },
        { say: 'In an inelastic collision, some kinetic energy is lost, and objects that stick together lose the most.', show: 'sum.2' },
        { say: 'And for a ballistic pendulum, use momentum for the impact, and energy for the swing.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
