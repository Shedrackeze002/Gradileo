import type { Explainer, MotionBody, MotionEl, MotionForce } from '@/video/script.ts';
import { collision } from '@/video/motion.ts';

// Lesson 2.2: Newton's three laws, and the second law for vertical motion. Every motion is worked
// out from the forces drawn (src/video/motion.ts): a puck with no net force keeps its velocity, the
// lesson's 40 kg parcel with 20 N of net force speeds up at 0.5 m/s², two carts push each other
// with equal forces, and the scale under a 60 kg person in a lift reads 708.6 N, 588.6 N and
// 468.6 N as the lift speeds up, moves steadily and slows down.

/** Two pucks at 4 m/s: one on smooth ice with no net force, and one that friction stops in 4 m. */
const coast: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 14],
  height: 430,
  strobe: 0.5,
  velocityScale: 20,
  forceScale: 12,
  lanes: [
    { surface: 'smooth', label: 'Smooth ice: no net force' },
    { surface: 'rough', label: 'Rough floor: friction' },
  ],
  bodies: [
    { id: 'ice', shape: 'block', mass: 2, label: 'puck', x: 1.2, v: 4, lane: 0, tone: 'adj' },
    { id: 'floor', shape: 'block', mass: 2, label: 'puck', x: 1.2, v: 4, lane: 1, tone: 'opp' },
  ],
  poster: 'go',
  clips: { go: { phases: [{ dur: 3, forces: [{ on: 'floor', name: 'Friction', n: -4, resist: true }] }] } },
};

/** The lesson's parcel: 40 kg pushed with 60 N against 40 N of friction. The net force is 20 N, and a = 0.5 m/s². */
const parcel: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 10],
  height: 340,
  forceScale: 1.4,
  velocityScale: 40,
  lanes: [{ surface: 'rough', label: 'A parcel of 40 kg' }],
  bodies: [{ id: 'parcel', shape: 'block', mass: 40, label: '40 kg', x: 3, width: 1.2, tone: 'adj' }],
  clips: {
    go: {
      phases: [
        {
          dur: 4,
          forces: [
            { on: 'parcel', name: 'Push', n: 60 },
            { on: 'parcel', name: 'Friction', n: -40, resist: true },
          ],
        },
      ],
    },
  },
};

// A 4 kg cart at 3 m/s hits a 1 kg cart at rest. The forces on the two are equal: the heavy cart
// loses 1.2 m/s, and the light cart gains 4.8 m/s.
const HEAVY: MotionBody = { id: 'heavy', shape: 'cart', mass: 4, label: '4 kg', x: 2.2, v: 3, width: 1.4, tone: 'adj' };
const LIGHT: MotionBody = { id: 'light', shape: 'cart', mass: 1, label: '1 kg', x: 5.4, width: 0.9, tone: 'opp' };
const crash: MotionEl = {
  kind: 'motion',
  id: 'sim',
  span: [0, 12],
  height: 360,
  forceScale: 3.4,
  velocityScale: 22,
  lanes: [{ surface: 'smooth', label: 'A heavy cart hits a light cart' }],
  bodies: [HEAVY, LIGHT],
  clips: { hit: { phases: collision(HEAVY, LIGHT, { type: 'bounce', after: 1, slow: 12, note: 'Slow motion', names: ['Light on heavy', 'Heavy on light'] }) } },
};

// A 60 kg person on a scale in a lift: up at 2 m/s² for a second, steady for a second and a half,
// then slowing at 2 m/s² for a second. The scale pushes up with m(g + a).
const WEIGHT: MotionForce = { on: 'person', name: 'Weight', n: -588.6, tone: 'hyp' };
const scale = (n: number): MotionForce => ({ on: 'person', name: 'Normal force', n, tone: 'adj' });
const lift: MotionEl = {
  kind: 'motion',
  id: 'sim',
  vertical: 'up',
  span: [0, 6],
  height: 560,
  forceScale: 0.14,
  velocityScale: 26,
  bodies: [{ id: 'person', shape: 'block', mass: 60, label: '60 kg', x: 0, width: 1.2, tone: 'theta' }],
  clips: {
    rest: { phases: [{ dur: 1.5, freeze: true, forces: [scale(588.6), WEIGHT] }] },
    up: { phases: [{ dur: 1, slow: 2.5, forces: [scale(708.6), WEIGHT], note: 'Slow motion' }] },
    steady: { phases: [{ dur: 1.5, slow: 1.6, forces: [scale(588.6), WEIGHT], note: 'Slow motion' }] },
    slow: { phases: [{ dur: 1, slow: 2.5, forces: [scale(468.6), WEIGHT], note: 'Slow motion' }] },
  },
};

const video: Explainer = {
  id: 'p20-2-2',
  lessonId: 'p20-2-2',
  title: 'Newton’s Laws of Motion',
  thumbnail: 'sim',
  summary:
    'Three laws link every force to the motion it causes. See an object with no net force keep its velocity, find an acceleration from a net force, watch two carts push each other with equal forces, and find out why you feel heavier in a lift that is speeding up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dynamics', title: 'Newton’s Laws of Motion', subtitle: 'Three laws that link force and motion' }],
      lines: [
        { say: 'For two thousand years, people believed that a moving object needs a force to keep it moving. After all, everything they pushed soon stopped.', show: 'title' },
        { say: 'Isaac Newton saw that the stopping was itself the work of a force. He wrote three laws that still predict the motion of everything from tennis balls to spacecraft.' },
      ],
    },
    {
      chapter: 'The first law',
      layout: 'center',
      main: [coast, { kind: 'text', id: 'first', size: 'md', md: '**First law:** with no net force, an object keeps its velocity.' }],
      lines: [
        { say: 'Two pucks are sent off at four metres per second. One slides on smooth ice, with no net force on it. The other slides on a rough floor.', show: ['sim', 'sim.velocity', 'sim.strobe'], play: 'sim.go', playDelay: 7 },
        { say: 'The puck on the floor stopped, because friction acted on it. The puck on the ice kept its velocity. That is the first law: an object stays at rest, or keeps moving at a constant velocity, unless a net force acts on it.', show: 'first', focus: 'sim.ice' },
        { say: 'This tendency to keep the same velocity is called inertia, and mass is the measure of it.' },
      ],
    },
    {
      chapter: 'The second law',
      layout: 'center',
      main: [parcel, { kind: 'math', id: 'second', size: 'md', lines: ['F_{\\text{net}} = ma \\qquad\\Rightarrow\\qquad a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{60 - 40}{40} = \\good{0.5\\ \\text{m/s}^2}'] }],
      lines: [
        { say: 'The second law says what a net force does. The acceleration is the net force divided by the mass, and it points the way the net force points. This parcel of forty kilograms is pushed with sixty newtons, against forty newtons of friction.', show: ['sim', 'sim.net', 'sim.velocity', 'sim.readout'], play: 'sim.go', playDelay: 11 },
        { say: 'Find the net force first: sixty minus forty is twenty newtons. Then divide by the mass. Twenty over forty is 0.5 metres per second squared.', show: 'second', focus: 'sim.parcel' },
        { say: 'A common mistake is to use the push alone. But friction takes away forty of its sixty newtons, and only the twenty that are left speed the parcel up.' },
      ],
    },
    {
      chapter: 'The third law',
      layout: 'center',
      main: [crash, { kind: 'text', id: 'third', size: 'md', md: '**Third law:** forces come in pairs, **equal** in size, **opposite** in direction, on **different** objects.' }],
      lines: [
        { say: 'The third law is about pairs of forces. Watch a heavy cart hit a light one, in slow motion.', show: ['sim', 'sim.velocity'], play: 'sim.hit', playDelay: 2.6 },
        { say: 'While they touched, the heavy cart pushed the light one forwards, and the light cart pushed the heavy one back, with a force of exactly the same size. When A pushes on B, B pushes on A, equally hard, the opposite way.', show: 'third', focus: 'sim' },
        { say: 'The light cart came off worse, but not because the force on it was larger. The same force acted on a smaller mass, and gave it a larger acceleration. And the two forces never cancel, because they act on different objects.', focus: 'sim.light' },
      ],
    },
    {
      chapter: 'In a lift',
      layout: 'split',
      leftWidth: 520,
      left: [lift],
      right: [
        { kind: 'math', id: 'law', size: 'md', lines: ['F_N - mg = ma', 'F_N = m(g + a)'] },
        { kind: 'math', id: 'up', size: 'md', lines: ['\\adj{60 \\times (9.81 + 2) = 708.6\\ \\text{N}}'] },
        { kind: 'math', id: 'down', size: 'md', lines: ['\\adj{60 \\times (9.81 - 2) = 468.6\\ \\text{N}}'] },
      ],
      lines: [
        { say: 'A person of sixty kilograms stands on a scale in a lift. Two forces act on them: their weight, 588.6 newtons, downwards, and the normal force of the scale, upwards. At rest, the two are equal.', show: 'sim', play: 'sim.rest', playDelay: 3 },
        { say: 'Now the lift speeds up, at two metres per second squared. For an upward acceleration, the net force must point up, so the normal force must be greater than the weight.', show: ['sim.velocity', 'sim.readout', 'sim.net'], play: 'sim.up', playDelay: 5 },
        { say: 'Take up as positive. The normal force minus m g equals m "a". So the normal force is m, times g plus "a": sixty times 11.81, which is 708.6 newtons. That is what the scale reads, and the person feels heavier.', show: ['law', 'up'] },
        { say: 'Next, the lift rises at a steady velocity. There is no acceleration, so the scale reads the true weight again, although the lift is still moving.', play: 'sim.steady', playDelay: 2 },
        { say: 'Finally, the lift slows down. It is still moving up, but its acceleration points down, so the scale reads less than the weight: sixty times 7.81, which is 468.6 newtons.', show: 'down', play: 'sim.slow', playDelay: 2.4 },
        { say: 'The reading depends on the acceleration, not on the direction of travel.', focus: 'sim.person' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cable pulls upwards with a force of 1500 N on a 130 kg load. Use $g = 9.81\\ \\text{m/s}^2$. What is the acceleration of the load?',
          choices: ['$11.5\\ \\text{m/s}^2$', '$9.81\\ \\text{m/s}^2$', '$21.3\\ \\text{m/s}^2$', '$1.73\\ \\text{m/s}^2$'],
          answer: 3,
          working: 'Weight: $130 \\times 9.81 = 1275.3\\ \\text{N}$. Net force: $1500 - 1275.3 = 224.7\\ \\text{N}$ upwards. $a = \\dfrac{224.7}{130} = 1.73\\ \\text{m/s}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cable pulls upwards with a force of fifteen hundred newtons, on a load of a hundred and thirty kilograms. Use 9.81 metres per second squared for g. What is the acceleration of the load? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Find the net force first. The weight is a hundred and thirty times 9.81: 1275.3 newtons. So the net force is fifteen hundred minus 1275.3, which is 224.7 newtons, upwards. Divide by the mass, and the acceleration is 1.73 metres per second squared. That is choice D.', show: 'q.answer' },
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
            '**First law:** with no net force, an object keeps its velocity',
            '**Second law:** $F_{\\text{net}} = ma$, so find the net force first',
            '**Third law:** forces come in equal and opposite pairs, on **different** objects',
            'Vertical motion, with up as positive: $F_{\\text{up}} - mg = ma$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The first law: with no net force, an object keeps its velocity.', show: 'sum.0' },
        { say: 'The second law: the net force equals the mass times the acceleration. Always find the net force first.', show: 'sum.1' },
        { say: 'The third law: forces come in pairs that are equal in size and opposite in direction, and they act on different objects.', show: 'sum.2' },
        { say: 'And for vertical motion, with up as positive, the upward force minus m g equals m "a".', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
