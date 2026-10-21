import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ang, arcOn, ln, ring } from './lib/m9-8-figures.ts';

const R = 4;

/**
 * A central angle AOB and an inscribed angle ACB on the same arc AB, drawn to scale: A and B are
 * `central` degrees apart round the bottom of the circle, and C is at `c` degrees on the other
 * side, so ∠ACB really is half of ∠AOB.
 */
const pair = (id: string, central: number, c: number, labels: { o?: string; c?: string }) =>
  figure(id, [
    ring({ r: R, pts: { A: 270 - central / 2, B: 270 + central / 2, C: c }, centrePlace: 'above' }),
    arcOn('arc', [0, 0], R, 270 - central / 2, 270 + central / 2),
    ln('oa', 'O', 'A', { tone: 'adj', group: 'central' }),
    ln('ob', 'O', 'B', { tone: 'adj', group: 'central' }),
    ang('co', 'O', 'A', 'B', { tone: 'adj', r: 32, ...(labels.o ? { label: labels.o, dist: 62 } : {}), group: 'central' }),
    ln('ca', 'C', 'A', { tone: 'opp', group: 'inscribed' }),
    ln('cb', 'C', 'B', { tone: 'opp', group: 'inscribed' }),
    ang('ci', 'C', 'A', 'B', { tone: 'opp', r: 44, ...(labels.c ? { label: labels.c } : {}), group: 'inscribed' }),
  ]);
const everything = (id: string) => [`${id}.fill`, `${id}.outline`, `${id}.names`, `${id}.arc`, `${id}.central`, `${id}.inscribed`];

const video: Explainer = {
  id: 'm9-8-2-b',
  lessonId: 'm9-8-2',
  title: 'Inscribed and Central Angles, Part 2: The Central Angle Is Twice as Big',
  thumbnailTitle: 'The Central Angle Is Twice as Big',
  thumbnail: 'ex',
  summary:
    'The central angle property: the central angle is twice the inscribed angle subtended by the same arc, so ∠AOB = 2 × ∠ACB. If ∠AOB = 110°, the inscribed angle on the same arc is 110° ÷ 2 = 55°. Going the other way, an inscribed angle of 28° goes with a central angle of 2 × 28° = 56°. The angle at the centre is always the bigger one, so check which way you go.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 2', title: 'The Central Angle Is Twice as Big', subtitle: 'Double it, or cut it in half' }],
      lines: [
        { say: 'Here is the surprisingly simple link between a central angle and an inscribed angle. It works in every circle.', show: 'title' },
        { say: 'In this part, you will learn the central angle property, and use it to find angles.' },
      ],
    },
    {
      chapter: 'The central angle property',
      layout: 'split',
      leftWidth: 560,
      left: [pair('pr', 80, 105, { o: '80^\\circ', c: '40^\\circ' })],
      right: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Central angle property', md: 'The central angle is **twice** the inscribed angle subtended by the same arc.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle AOB = 2 \\times \\angle ACB'] },
      ],
      lines: [
        { say: 'Here, the central angle A O B, in blue, measures eighty degrees. The inscribed angle A C B, in orange, stands on the same arc A B. It measures forty degrees.', show: everything('pr'), focus: ['pr.co', 'pr.ci'] },
        { say: 'Forty is half of eighty. And this is not luck. It is true for every circle, and for every arc.' },
        { say: 'The central angle property says: the central angle is twice the inscribed angle subtended by the same arc.', show: 'k' },
        { say: 'So angle A O B equals two times angle A C B. Or, the other way round, the inscribed angle is half of the central angle.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'From central to inscribed',
      layout: 'split',
      leftWidth: 560,
      left: [pair('ex', 110, 75, { o: '110^\\circ', c: 'x' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$\\angle AOB = 110^\\circ$. Find $x = \\angle ACB$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Both stand on arc } AB.', 'x = 110^\\circ \\div 2', 'x = 55^\\circ'] },
      ],
      lines: [
        { say: 'In this circle, angle A O B is one hundred ten degrees. Find x, the inscribed angle A C B.', show: [...everything('ex'), 'q'] },
        { say: 'Step one: both angles have arms that end at A and B, so both are subtended by arc A B.', show: 'm.0', focus: ['m.0', 'ex.arc'] },
        { say: 'Step two: the inscribed angle is half of the central angle. So x is one hundred ten degrees divided by two.', show: 'm.1', focus: 'm.1' },
        { say: 'x is fifty-five degrees.', show: 'm.2', focus: ['m.2', 'ex.ci'] },
      ],
    },
    {
      chapter: 'From inscribed to central',
      layout: 'split',
      leftWidth: 560,
      left: [pair('ic', 56, 165, { c: '28^\\circ' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'An inscribed angle of $28^\\circ$ stands on arc $AB$. Find the central angle $\\angle AOB$ on the same arc.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle AOB = 2 \\times 28^\\circ', '\\angle AOB = 56^\\circ'] },
      ],
      lines: [
        { say: 'Going the other way, you double. An inscribed angle of twenty-eight degrees stands on arc A B. What is the central angle on the same arc?', show: [...everything('ic'), 'q'] },
        { say: 'The central angle is twice the inscribed angle: two times twenty-eight degrees, which is fifty-six degrees.', show: ['m.0', 'm.1'], focus: ['m.1', 'ic.co'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [pair('wo', 110, 75, { o: '110^\\circ', c: '55^\\circ' })],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Doubling or cutting in half the wrong way', md: 'The angle at the **centre** is the **bigger** one. Check your answer against the diagram.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 110^\\circ = 220^\\circ \\quad \\text{(too big)}', '110^\\circ \\div 2 = 55^\\circ \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Be careful which way you go. The angle at the centre is always the bigger one.', show: [...everything('wo'), 'oops'] },
        { say: 'If you double the central angle instead of cutting it in half, the inscribed angle comes out too big. For a central angle of one hundred ten degrees, doubling gives two hundred twenty degrees. That is far too big for this picture.', show: 'm.0', focus: 'm.0' },
        { say: 'So check your answer against the diagram. The inscribed angle should look about half as wide as the central angle. Fifty-five degrees does.', show: 'm.1', focus: ['m.1', 'wo.ci', 'wo.co'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a circle with centre $O$, the inscribed angle $\\angle ACB = 36^\\circ$. Find the central angle $\\angle AOB$ subtended by the same arc $AB$.',
          choices: ['$18^\\circ$', '$36^\\circ$', '$144^\\circ$', '$72^\\circ$'],
          answer: 3,
          working: 'The central angle is twice the inscribed angle on the same arc: $\\angle AOB = 2 \\times 36^\\circ = 72^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a circle with centre O, the inscribed angle A C B is thirty-six degrees. Find the central angle A O B, subtended by the same arc A B. Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D, seventy-two degrees. The central angle is twice the inscribed angle on the same arc: two times thirty-six is seventy-two. Choice A cuts thirty-six in half instead of doubling it, but the angle at the centre is the bigger one.', show: 'q.answer' },
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
            'The central angle is **twice** the inscribed angle subtended by the same arc: $\\angle AOB = 2 \\times \\angle ACB$.',
            'From central to inscribed, divide by $2$. From inscribed to central, multiply by $2$.',
            'The angle at the centre is the bigger one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The central angle is twice the inscribed angle subtended by the same arc.', show: 'sum.0' },
        { say: 'To go from a central angle to an inscribed angle, divide by two. To go from an inscribed angle to a central angle, multiply by two.', show: 'sum.1' },
        { say: 'And the angle at the centre is always the bigger one. In the next part, you will compare two inscribed angles on the same arc. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
