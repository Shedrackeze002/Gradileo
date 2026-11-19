import type { Explainer, MotionBody, MotionEl } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Lesson 1.3, first half: conservation of momentum in collisions. It grew out of the sample video
// the owner approved on 14 November 2026: the carts are moved by the forces they put on each
// other while they touch (src/video/motion.ts), so the totals on the bars are the physics, not
// numbers typed in. New here are a head-on collision, where one momentum is negative, and a
// bounce in which the carts part with some of their kinetic energy lost.

const SPAN: [number, number] = [0, 9.6];

interface Crash {
  type: 'stick' | 'bounce';
  after: number;
  max: number;
  /** The most negative momentum on the bars, when a body moves to the left. */
  min?: number;
  /** Slow motion while the bodies touch, with the forces drawn. */
  slow?: number;
  restitution?: number;
  height?: number;
  span?: [number, number];
  /** Play the whole collision this many times slower (a tackle is over in a second). */
  pace?: number;
  /** How far the two squeeze together, in metres (blocks have no bumpers to squeeze). */
  squeeze?: number;
}

/** A collision on one track, in three clips: the approach, the touch (slowed if asked) and after. */
function crash(a: MotionBody, b: MotionBody, o: Crash): MotionEl {
  const phases = collision(a, b, { type: o.type, after: o.after, slow: o.slow, restitution: o.restitution, squeeze: o.squeeze, note: o.slow ? 'Slow motion' : undefined, names: ['Force on blue', 'Force on orange'], hidden: !o.slow });
  const [approach, touch, away] = o.pace ? phases.map((ph) => ({ ...ph, slow: o.pace, note: 'Slow motion' })) : phases;
  return {
    kind: 'motion',
    id: 'sim',
    span: o.span ?? SPAN,
    height: o.height ?? 440,
    bodies: [a, b],
    momentumMax: o.max,
    ...(o.min ? { momentumMin: o.min } : {}),
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

const blue = (mass: number, v: number, x = 1.2): MotionBody => ({ id: 'blue', shape: 'cart', mass, x, v, label: `${mass} kg`, tone: 'adj', width: 0.9 + 0.2 * mass });
const orange = (mass: number, x: number, v = 0): MotionBody => ({ id: 'orange', shape: 'cart', mass, x, v, label: `${mass} kg`, tone: 'opp', width: 0.9 + 0.2 * mass });

// Blue, 2 kg at 3 m/s, meets orange, 4 kg at rest: they couple and roll on at 1 m/s.
const couple = () => crash(blue(2, 3), orange(4, 5.6), { type: 'stick', after: 2.6, max: 7.5 });
const coupleSlow = () => crash(blue(2, 3, 2.4), orange(4, 5.6), { type: 'stick', after: 2.4, slow: 165, max: 7.5 });
// The lesson's tackle: 80 kg running east at 7 m/s meets 100 kg running west at 3 m/s, and they hold on.
const tackle = (): MotionEl => ({
  ...crash(
    { id: 'blue', shape: 'block', mass: 80, x: 1.6, v: 7, label: '80 kg', tone: 'adj', width: 1.3 },
    { id: 'orange', shape: 'block', mass: 100, x: 10.4, v: -3, label: '100 kg', tone: 'opp', width: 1.3 },
    { type: 'stick', after: 1.4, max: 600, min: -340, span: [0, 12], height: 440, pace: 2.5, squeeze: 0.03 },
  ),
  velocityScale: 14,
});
// The lesson's bounce: 2 kg at 4 m/s meets 1 kg at -1 m/s, and they part at half the closing speed.
const bounce = () => crash(blue(2, 4, 1), orange(1, 5.8, -1), { type: 'bounce', restitution: 0.5, after: 0.8, max: 9, min: -2, height: 420 });
// The "Your turn" collision: 3 kg at 4 m/s meets 1 kg at rest, and they couple at 3 m/s.
const check = () => crash(blue(3, 4), orange(1, 5), { type: 'stick', after: 1.1, max: 14 });

const video: Explainer = {
  id: 'p30-1-3',
  lessonId: 'p30-1-3',
  title: 'Conservation of Momentum',
  thumbnailTitle: 'Momentum in Collisions',
  thumbnail: 'sim',
  summary:
    'Watch two carts collide and see momentum pass from one to the other while the total stays exactly the same, then slow the collision down to see why: the carts push on each other with equal and opposite forces. Then use the law to solve a collision, a head-on tackle and a bounce.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Conservation of Momentum', subtitle: 'A collision shares momentum out, but never loses it' }],
      lines: [
        { say: 'In a collision, one object slows down and another speeds up. It looks as if motion is simply passed along. Physics makes that idea exact.', show: 'title' },
        { say: 'In this video, you will watch momentum pass from one cart to another, and see that the total never changes.' },
      ],
    },
    {
      chapter: 'A collision',
      layout: 'center',
      main: [couple(), { kind: 'text', id: 'point', size: 'lg', md: 'Momentum **passed** from blue to orange. The [[theta:total]] did not change.' }],
      lines: [
        { say: 'The blue cart has a mass of two kilograms, and it rolls at three metres per second. The orange cart has four kilograms, and it is at rest.', show: ['sim', 'sim.velocity'] },
        { say: 'Before they meet, look at the bars. Blue has six. Orange has zero. So the total momentum is six.', show: ['sim.bars', 'sim.total'] },
        { say: 'Watch the bars as the carts collide and lock together.', play: 'sim.hit', playDelay: 1.6 },
        { say: 'The blue cart slowed down, and the orange cart sped up. Now they roll together at one metre per second.', focus: ['sim.blue', 'sim.orange'] },
        { say: 'Blue’s momentum fell from six to two. Orange’s rose from zero to four. Blue lost exactly what orange gained, so the total is still six.', show: 'point', focus: 'sim' },
      ],
    },
    {
      chapter: 'Why the total stays the same',
      layout: 'center',
      main: [coupleSlow(), { kind: 'callout', id: 'law', tone: 'key', title: 'Conservation of momentum', md: 'The total momentum of an **isolated system** stays constant: total **before** = total **after**.' }],
      lines: [
        { say: 'Here is the same collision again. This time, we slow the moment of contact right down.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'], play: 'sim.approach', playDelay: 4.4 },
        {
          say: 'While the bumpers are squeezed together, the blue cart pushes the orange cart forwards. And the orange cart pushes the blue cart backwards, exactly as hard. That is Newton’s third law. The two forces are equal, they point in opposite directions, and they last for exactly the same time. So the two impulses are equal and opposite.',
          play: 'sim.touch',
        },
        { say: 'Every bit of momentum that the blue cart loses, the orange cart gains. None is lost, and none is created.', play: 'sim.away', playDelay: 1 },
        { say: 'This is the law of conservation of momentum. When no net force acts on a system from outside, its total momentum stays constant.', show: 'law' },
      ],
    },
    {
      chapter: 'Solving a collision',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\thc{m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2}'] },
        { kind: 'math', id: 'work', size: 'lg', lines: ['\\adj{2 \\times 3} + \\opp{4 \\times 0} = (\\adj{2} + \\opp{4}) \\times v', '6 = 6v \\qquad v = 1\\ \\text{m/s}'] },
      ],
      lines: [
        { say: 'Because the total never changes, we can predict a collision before it happens. Add up the momentum of everything just before the collision, and set it equal to the total just after.', show: 'eq' },
        { say: 'Take the two carts that locked together. Before, blue had two times three, and orange had four times zero. After, they move as one object of six kilograms, at one velocity.', show: 'work.0' },
        { say: 'So six equals six times the velocity. The velocity is one metre per second, which is exactly what the carts did.', show: 'work.1', focus: 'work.1' },
      ],
    },
    {
      chapter: 'A head-on collision',
      layout: 'center',
      main: [tackle(), { kind: 'math', id: 'tk', size: 'md', lines: ['\\adj{80 \\times 7} + \\opp{100 \\times (-3)} = 180v', '\\adj{560} \\opp{{}- 300} = 260 = 180v \\qquad v = \\good{+1.44\\ \\text{m/s}}'] }],
      lines: [
        { say: 'When two objects meet head on, one of the momenta is negative. A rugby player of eighty kilograms runs east at seven metres per second. A player of one hundred kilograms runs west at three metres per second. Take east as positive.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'They tackle, and hold on to each other. Which way do they go?', play: 'sim.hit', playDelay: 0.6, wait: 0.8 },
        { say: 'Before the tackle, the total is eighty times seven, plus one hundred times negative three. After it, one hundred and eighty kilograms move together.', show: 'tk.0' },
        { say: 'Five hundred and sixty minus three hundred is two hundred and sixty. Divide by one hundred and eighty, and the velocity is positive 1.44 metres per second. They move east. The lighter player wins, because that player brought more momentum.', show: 'tk.1' },
        { say: 'If you leave out the sign and add five hundred and sixty to three hundred, you get 4.8 metres per second, which is far too fast. Choose the positive direction before you write any numbers.', focus: 'tk.0' },
      ],
    },
    {
      chapter: 'A bounce',
      layout: 'center',
      main: [bounce(), { kind: 'math', id: 'bn', size: 'md', lines: ['\\adj{2 \\times 4} + \\opp{1 \\times (-1)} = \\adj{2 \\times 1.5} + \\opp{1 \\times v}', '7 = 3 + v \\qquad v = \\good{+4\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Objects do not have to stick together. If they bounce apart, you need one of the velocities after the collision to find the other. The blue cart, two kilograms, moves at four metres per second. The orange cart, one kilogram, comes the other way at one metre per second.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'Watch them bounce. Afterwards, the blue cart moves at 1.5 metres per second.', play: 'sim.hit', playDelay: 0.4, wait: 0.6 },
        { say: 'Before, the total is two times four, plus one times negative one, which is seven. After, blue has two times 1.5, which is three.', show: 'bn.0' },
        { say: 'So the orange cart must have the other four. Its velocity is positive four metres per second. It has turned around, and the total is still seven.', show: 'bn.1', focus: 'sim.orange' },
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
            'In a collision, objects push on each other with **equal and opposite** forces',
            'What one object loses, the other **gains**',
            'Total momentum just before = total momentum just after',
            'Give every velocity its **sign** before you add',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In a collision, the objects push on each other with equal and opposite forces.', show: 'sum.0' },
        { say: 'So whatever momentum one object loses, the other gains.', show: 'sum.1' },
        { say: 'The total momentum just before the collision equals the total momentum just after it.', show: 'sum.2' },
        { say: 'And every velocity needs its sign before you add.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
