import type { Explainer, MotionBody, MotionEl, MotionPhase } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Lesson 1.4, second half: elastic collisions. Every collision here is worked out from the forces
// the carts put on each other while they touch (src/video/motion.ts), with bumpers that give back
// all the energy they take, so the velocities and the energy bars are measured, not typed in. The
// lesson's example (2 kg into 6 kg) is followed by its three cases side by side, and by a
// collision in which both carts are moving, for the rule that the speed of separation equals the
// speed of approach.

const slowed = (phases: MotionPhase[], slow: number): MotionPhase[] => phases.map((ph) => ({ ...ph, slow, note: 'Slow motion' }));

// The lesson's example: 2 kg at 6 m/s into 6 kg at rest. They leave at -3 m/s and +3 m/s.
const small: MotionBody = { id: 'small', shape: 'cart', mass: 2, x: 1.3, v: 6, label: '2 kg', tone: 'adj', width: 1.2 };
const big: MotionBody = { id: 'big', shape: 'cart', mass: 6, x: 5.6, label: '6 kg', tone: 'opp', width: 1.9 };
const bounce: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 470,
  bodies: [small, big],
  energy: { of: ['small', 'big'], max: 40, bars: ['kinetic'], system: ['kinetic'] },
  velocityScale: 18,
  clips: { hit: { phases: slowed(collision(small, big, { type: 'bounce', after: 0.9, hidden: true }), 2) } },
};

/** The same two carts, but they stick: the formulas for an elastic collision do not apply. */
const stuck: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 9.6],
  height: 320,
  bodies: [small, big],
  velocityScale: 18,
  clips: { hit: { phases: slowed(collision(small, big, { type: 'stick', after: 1.4, hidden: true }), 2) } },
};

/**
 * The lesson's three cases, one on each track: every cart on the left arrives at 4 m/s. The gaps
 * and the bumpers are the same, so the three touch at the same moment and one clip plays them all.
 */
const CASES: Array<[first: number, second: number]> = [
  [2, 2],
  [20, 1],
  [1, 20],
];
// Wide enough that two carts in contact still have their velocities side by side.
const wide = (kg: number) => (kg > 10 ? 2.1 : kg > 1 ? 1.6 : 1.1);
const pairs = CASES.map(([m1, m2], lane): [MotionBody, MotionBody] => [
  { id: `in${lane}`, shape: 'cart', mass: m1, x: 3.6, v: 4, label: `${m1} kg`, tone: 'adj', width: wide(m1), lane },
  { id: `out${lane}`, shape: 'cart', mass: m2, x: 3.6 + 2 + (wide(m1) + wide(m2)) / 2, label: `${m2} kg`, tone: 'opp', width: wide(m2), lane },
]);
const casesPhases = (): MotionPhase[] => {
  const each = pairs.map(([a, b]) => collision(a, b, { type: 'bounce', squeeze: 0.04, after: 0.45, hidden: true }));
  return slowed(each[0].map((ph, pi) => ({ ...ph, forces: each.flatMap((phases) => phases[pi].forces ?? []) })), 3);
};
const cases: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 560,
  lanes: [{ label: 'Equal masses' }, { label: 'Heavy hits light' }, { label: 'Light hits heavy' }],
  bodies: pairs.flat(),
  velocityScale: 14,
  clips: { hit: { phases: casesPhases() } },
};

// The lesson's second example: 3 kg at 6 m/s catches 2 kg at 1 m/s. They leave at 2 m/s and 7 m/s.
const back: MotionBody = { id: 'back', shape: 'cart', mass: 3, x: 1.2, v: 6, label: '3 kg', tone: 'adj', width: 1.7 };
const front: MotionBody = { id: 'front', shape: 'cart', mass: 2, x: 4.6, v: 1, label: '2 kg', tone: 'opp', width: 1.5 };
const chase: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 11],
  height: 440,
  bodies: [back, front],
  momentumMax: 22,
  velocityScale: 14,
  clips: { hit: { phases: slowed(collision(back, front, { type: 'bounce', squeeze: 0.08, after: 0.6, hidden: true }), 2.5) } },
};

const video: Explainer = {
  id: 'p30-1-4-b',
  lessonId: 'p30-1-4',
  title: 'Elastic Collisions',
  thumbnail: 'sim',
  summary:
    'An elastic collision conserves momentum and kinetic energy together, and that is enough to find both velocities afterwards. Watch a light cart bounce off a heavy one, meet the two formulas, see the three cases worth remembering side by side, and learn why the speed of separation equals the speed of approach.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Momentum and Impulse', title: 'Elastic Collisions', subtitle: 'Momentum and kinetic energy, both conserved' }],
      lines: [
        { say: 'On a billiard table, the cue ball rolls straight into a ball at rest. The cue ball stops dead, and the other ball leaves with all of its speed.', show: 'title' },
        { say: 'Momentum alone cannot explain that. It takes a second conservation law, working at the same time.' },
      ],
    },
    {
      chapter: 'Two laws at once',
      layout: 'center',
      main: [bounce, { kind: 'math', id: 'p', size: 'md', lines: ['\\text{momentum: }\\ 2 \\times 6 = \\adj{2 \\times (-3)} + \\opp{6 \\times 3} = \\thc{12\\ \\text{kg·m/s}}'] }],
      lines: [
        { say: 'An elastic collision conserves two things at once: the total momentum, and the total kinetic energy. Here a cart of two kilograms, moving east at six metres per second, is about to hit a cart of six kilograms at rest. Their bumpers are perfectly springy.', show: ['sim', 'sim.velocity', 'sim.energy', 'sim.total'] },
        { say: 'Watch the velocities, and the energy bars.', play: 'sim.hit', playDelay: 0.5, wait: 1 },
        { say: 'The small cart bounces back at three metres per second, and the big cart moves on at three metres per second. The total kinetic energy dipped while the bumpers were squeezed, and then all thirty-six joules came back. Twenty-seven of them, three quarters, have passed to the big cart.', focus: 'sim.big' },
        { say: 'Momentum is conserved too. Before, two times six is twelve. After, two times negative three, plus six times three, is twelve again.', show: 'p' },
      ],
    },
    {
      chapter: 'The two formulas',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['v_1 = \\dfrac{m_1 - m_2}{m_1 + m_2}\\,u \\qquad\\qquad v_2 = \\dfrac{2m_1}{m_1 + m_2}\\,u'] },
        { kind: 'math', id: 'w', size: 'md', lines: ['\\adj{v_1} = \\dfrac{2 - 6}{2 + 6} \\times 6 = \\adj{-3\\ \\text{m/s}} \\qquad \\opp{v_2} = \\dfrac{2 \\times 2}{2 + 6} \\times 6 = \\opp{+3\\ \\text{m/s}}'] },
        { kind: 'text', id: 'when', size: 'md', md: 'For an **elastic**, **head-on** collision with the **target at rest**' },
      ],
      lines: [
        { say: 'Two conservation laws give two equations, and two equations are enough to find two unknown velocities. Solving them together gives this pair of formulas.', show: 'f' },
        { say: 'The object of mass m one arrives with velocity u, and the target, of mass m two, is at rest. The first formula gives the velocity of the object that arrived. The second gives the velocity of the target.' },
        { say: 'Try them on the collision we just watched. For the small cart: two minus six, over two plus six, times six. That is negative three. For the big cart: two times two, over eight, times six. That is positive three. The formulas agree with the carts.', show: 'w' },
        { say: 'They hold when the collision is elastic and head-on, and the target is at rest.', show: 'when' },
      ],
    },
    {
      chapter: 'Three cases',
      layout: 'center',
      main: [cases, { kind: 'text', id: 'same', size: 'md', md: 'Every collision is **elastic**, and every moving cart arrives at **4 m/s**' }],
      lines: [
        { say: 'The formulas explain three cases that are worth remembering. On each track, the blue cart arrives at four metres per second, and the collision is elastic.', show: ['sim', 'sim.velocity', 'same'] },
        { say: 'Watch all three.', play: 'sim.hit', playDelay: 0.4, wait: 1.2 },
        { say: 'Equal masses: the moving cart stops, and the target leaves with all of its velocity. That is the billiard shot.', focus: ['sim.in0', 'sim.out0'] },
        { say: 'A heavy cart hits a light one: the heavy cart hardly slows down, and the light one leaves at almost twice the speed of the heavy cart.', focus: ['sim.in1', 'sim.out1'] },
        { say: 'A light cart hits a heavy one: the light cart bounces back at almost the speed it came in with, and the heavy cart hardly moves.', focus: ['sim.in2', 'sim.out2'] },
      ],
    },
    {
      chapter: 'Approach and separation',
      layout: 'center',
      main: [chase, { kind: 'math', id: 'sep', size: 'md', lines: ['\\text{approach: }\\ 6 - 1 = \\good{5\\ \\text{m/s}} \\qquad \\text{separation: }\\ 7 - 2 = \\good{5\\ \\text{m/s}}'] }],
      lines: [
        { say: 'Elastic head-on collisions share one more property. Here a cart of three kilograms, at six metres per second, is catching a cart of two kilograms that moves at one metre per second. The gap between them closes at five metres per second.', show: ['sim', 'sim.velocity', 'sim.bars', 'sim.total'] },
        { say: 'They collide elastically.', play: 'sim.hit', playDelay: 0.3, wait: 1.2 },
        { say: 'Now the front cart moves at seven metres per second, and the back cart at two. They move apart at five metres per second, exactly the speed at which they approached.', show: 'sep' },
        { say: 'In an elastic head-on collision, the speed of separation always equals the speed of approach, even when both objects are moving. Used with the conservation of momentum, it solves a problem with no squares at all.' },
      ],
    },
    {
      chapter: 'When the formulas fail',
      layout: 'center',
      main: [
        stuck,
        { kind: 'callout', id: 'trap', tone: 'mistake', title: 'The elastic formulas for every collision', md: 'The two formulas need an **elastic**, head-on collision with the target at rest. If the objects stick together, or kinetic energy is lost, use the **conservation of momentum** alone.' },
      ],
      lines: [
        { say: 'One warning. Here are the same two carts as before, two kilograms and six kilograms. But this time the bumpers are sticky.', show: ['sim', 'sim.velocity'] },
        { say: 'Watch what they do.', play: 'sim.hit', playDelay: 0.3, wait: 1.5 },
        { say: 'The formulas said negative three and positive three. The carts move off together at one and a half metres per second, because this collision is not elastic. If objects stick together, or the question says that kinetic energy is lost, use the conservation of momentum alone.', show: 'trap' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A 1 kg cart moving at 6 m/s makes an elastic head-on collision with a 2 kg cart at rest. What is the velocity of the 2 kg cart just afterwards?',
          choices: ['$4\\ \\text{m/s}$', '$2\\ \\text{m/s}$', '$6\\ \\text{m/s}$', '$3\\ \\text{m/s}$'],
          answer: 0,
          working: '$v_2 = \\dfrac{2m_1}{m_1 + m_2}\\,u = \\dfrac{2 \\times 1}{1 + 2} \\times 6 = 4\\ \\text{m/s}$',
        },
      ],
      lines: [
        { say: 'Your turn. A one kilogram cart moving at six metres per second makes an elastic head-on collision with a two kilogram cart at rest. What is the velocity of the two kilogram cart just afterwards? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Choice A is correct. The target is at rest and the collision is elastic, so use the second formula. Two times one, over one plus two, times six, is four metres per second. The one kilogram cart bounces back at two, so they separate at six, the speed of approach.', show: 'q.answer' },
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
            'Elastic: **momentum** and **kinetic energy** are both conserved',
            'Target at rest: $v_1 = \\dfrac{m_1 - m_2}{m_1 + m_2}\\,u$ and $v_2 = \\dfrac{2m_1}{m_1 + m_2}\\,u$',
            'Equal masses: the moving object **stops**, and the target takes its velocity',
            'Speed of **separation** = speed of **approach**',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An elastic collision conserves both momentum and kinetic energy.', show: 'sum.0' },
        { say: 'For a head-on collision with a target at rest, two formulas give the two velocities.', show: 'sum.1' },
        { say: 'With equal masses, the moving object stops, and the target takes its velocity.', show: 'sum.2' },
        { say: 'And the speed of separation equals the speed of approach.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
