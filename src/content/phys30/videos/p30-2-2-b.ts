import type { ChargesEl, Explainer } from '@/video/script.ts';

// Lesson 2.2, second half: the net electric force. Each orange arrow is the force of one charge
// on another, worked out from Coulomb's law (src/video/charges.ts), and the yellow arrow is their
// vector sum, so the picture does the addition that the maths beside it writes down. When B slides
// to the point half way between A and C, the arrows change as the law says and the sum turns round.

/** A (+2.0 μC) 0.20 m west of B (+3.0 μC), and C (+6.0 μC) 0.40 m east of B: the forces on B. */
const line: ChargesEl = {
  kind: 'charges',
  id: 'row',
  view: [-0.44, 0.64, -0.11, 0.12],
  height: 250,
  decimals: 1,
  forceDecimals: 2,
  pulls: ['b'],
  spans: [
    ['a', 'b'],
    ['b', 'c'],
  ],
  bodies: [
    { id: 'a', charge: 2, x: -0.2, label: 'A' },
    { id: 'b', charge: 3, x: 0, label: 'B' },
    { id: 'c', charge: 6, x: 0.4, label: 'C' },
  ],
  poster: 'hold',
  clips: { hold: { phases: [{ dur: 1 }] }, mid: { phases: [{ dur: 3, to: { b: 0.1 } }] } },
};

/** A (+5.0 μC) at the corner, B (+2.0 μC) 0.30 m east of it and C (−3.0 μC) 0.30 m north of it: the forces on A. */
const corner: ChargesEl = {
  kind: 'charges',
  id: 'corner',
  view: [-0.33, 0.43, -0.16, 0.42],
  height: 500,
  decimals: 1,
  forceDecimals: 2,
  pulls: ['a'],
  join: true,
  spans: [
    ['a', 'b'],
    ['a', 'c'],
  ],
  bodies: [
    { id: 'a', charge: 5, x: 0, y: 0, label: 'A', labelAt: 'below' },
    { id: 'b', charge: 2, x: 0.3, y: 0, label: 'B' },
    { id: 'c', charge: -3, x: 0, y: 0.3, label: 'C', labelAt: 'right' },
  ],
  clips: {},
};

const video: Explainer = {
  id: 'p30-2-2-b',
  lessonId: 'p30-2-2',
  title: 'The Net Electric Force',
  thumbnailTitle: 'Net Electric Force',
  thumbnail: 'row',
  summary:
    'When a charge has more than one other charge near it, each exerts its own force, and the net force is their vector sum. Add two forces along a line with signs, and two forces at right angles with the Pythagorean theorem and the tangent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'The Net Electric Force', subtitle: 'When more than two charges meet' }],
      lines: [
        { say: 'Coulomb\'s law gives the force between two charges. But what if a charge has two other charges near it?', show: 'title' },
        { say: 'Each of the others exerts its own force on it, as if the rest were not there. The net force is the vector sum of those forces.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Find the **size** of each force with Coulomb\'s law',
            'Decide the **direction** of each force: like charges repel, unlike charges attract',
            '**Add** the forces as vectors',
          ],
        },
      ],
      lines: [
        { say: 'Every problem of this kind takes three steps. First, find the size of each force with Coulomb\'s law.', show: 'steps.0' },
        { say: 'Second, decide the direction of each force. Like charges repel, and unlike charges attract.', show: 'steps.1' },
        { say: 'Third, add the forces as vectors. Along one line, give each force a sign. At right angles, use the Pythagorean theorem and the tangent.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'Three charges on a line',
      layout: 'center',
      main: [
        line,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['F_A = \\dfrac{8.99 \\times 10^{9} \\times 2.0 \\times 10^{-6} \\times 3.0 \\times 10^{-6}}{0.20^2} = \\opp{1.35\\ \\text{N}}', 'F_{\\text{net}} = (+1.35) + (-1.01) = \\thc{+0.34\\ \\text{N}}'],
        },
      ],
      lines: [
        { say: 'Here are three positive charges on a line. Charge A is 0.20 metres west of charge B, and charge C is 0.40 metres east of B. We want the net force on B.', show: ['row', 'row.charge', 'row.distance'] },
        { say: 'Start with the force from A. Coulomb\'s law, with charges of 2.0 and 3.0 microcoulombs and a distance of 0.20 metres, gives 1.35 newtons.', show: 'm.0' },
        { say: 'Both charges are positive, so A pushes B away from it, to the east. In the same way, C pushes B to the west, with 1.01 newtons.', show: 'row.force' },
        { say: 'Take east as positive. The net force is positive 1.35 plus negative 1.01, which is positive 0.34 newtons.', show: ['m.1', 'row.net'] },
        { say: 'So the net force on B is 0.34 newtons east. The nearer charge wins, even though it is much the smaller one.', focus: 'row.a' },
        { say: 'Now slide B to the point half way between the other two, and watch the arrows. It is now the same distance from both, so the larger charge wins. The net force on B is 1.20 newtons west.', play: 'row.mid', playDelay: 4, hide: 'm' },
      ],
    },
    {
      chapter: 'Forces at right angles',
      layout: 'split',
      leftWidth: 520,
      left: [corner],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['F = \\sqrt{1.00^2 + 1.50^2} = \\thc{1.80\\ \\text{N}}', '\\theta = \\tan^{-1}\\!\\left(\\dfrac{1.50}{1.00}\\right) = \\thc{56.3°}'] },
        { kind: 'callout', id: 'trap', tone: 'mistake', title: 'Forces are vectors', md: '$1.00 + 1.50 = 2.50$ N is **not** the net force.' },
      ],
      lines: [
        { say: 'Now the charges are at the corners of a right angle. Charge B is 0.30 metres east of charge A, and charge C is 0.30 metres north of A. This time, we want the net force on A.', show: ['corner', 'corner.charge', 'corner.distance'] },
        { say: 'A and B are both positive, so B pushes A away, to the west. Coulomb\'s law gives 1.00 newtons. C is negative, so it pulls A towards it, to the north, with 1.50 newtons.', show: 'corner.force' },
        { say: 'These two forces are at right angles, so they add like the two shorter sides of a right triangle. The net force is the square root of 1.00 squared plus 1.50 squared: 1.80 newtons.', show: ['m.0', 'corner.net'] },
        { say: 'For its direction, take the inverse tangent of 1.50 over 1.00. That is 56.3 degrees, north of west.', show: ['m.1', 'corner.angle'] },
        { say: 'Do not add the two sizes as plain numbers. 2.50 newtons is not the net force, because the forces point in different directions.', show: 'trap' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Charge A (+4.0 μC) is 0.30 m west of charge B (+1.0 μC). Charge C (−4.0 μC) is 0.30 m east of B. Each of them exerts a force of 0.40 N on B. What is the net force on B?',
          choices: ['0 N', '0.40 N east', '0.80 N east', '0.80 N west'],
          answer: 2,
          working: 'A is positive, like B, so it pushes B east. C is negative, so it pulls B east as well. $0.40 + 0.40 = 0.80$ N east.',
        },
      ],
      lines: [
        { say: 'Your turn. Charge A, positive 4.0 microcoulombs, is 0.30 metres west of charge B, which is positive 1.0 microcoulombs. Charge C, negative 4.0 microcoulombs, is 0.30 metres east of B. Each exerts a force of 0.40 newtons on B. What is the net force on B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'Charge "A" is positive, like B, so it pushes B away from it, to the east. C is negative, so it pulls B towards it, which is also east. The two forces add: 0.80 newtons east. That is choice C.', show: 'q.answer' },
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
            'Each charge exerts its **own force**, as if the others were not there',
            'Find each **size** with Coulomb\'s law, and each **direction** from the signs',
            'Along a line, add the forces with their **signs**',
            'At right angles: $F = \\sqrt{F_1^2 + F_2^2}$ and $\\tan\\theta = \\dfrac{F_2}{F_1}$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Each charge exerts its own force, as if the others were not there.', show: 'sum.0' },
        { say: 'Find the size of each force with Coulomb\'s law, and its direction from the signs of the charges.', show: 'sum.1' },
        { say: 'Along one line, add the forces with their signs.', show: 'sum.2' },
        { say: 'And at right angles, use the Pythagorean theorem for the size, and the tangent for the direction.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
