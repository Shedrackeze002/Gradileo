import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved } from '@/content/math8/videos/lib/m8-9-figures.ts';
import { shape, shapeIds } from './lib/m9-7-figures.ts';

type P = [number, number];

// Triangle ABC: AB = 6 cm, BC = 8 cm, right-angled at B (so CA = 10 cm). Triangle DEF is ABC
// enlarged by 1.5: DE = 9 cm, EF = 12 cm, FD = 15 cm.
const ABC: P[] = [
  [0, 0],
  [6, 0],
  [6, 8],
];
const DEF: P[] = [
  [11.5, 0],
  [20.5, 0],
  [20.5, 12],
];
const sides = (ab: string, bc: string, ca?: string) => [{ tone: 'adj' as const, label: ab }, { tone: 'opp' as const, label: bc }, { tone: 'hyp' as const, ...(ca ? { label: ca } : {}) }];
const pair = (id: string, o: { x: string; ca?: string; fd?: string }) =>
  figure(id, [
    shape({ name: 'p', pts: ABC, rights: [1], names: ['A', 'B', 'C'], sides: sides('6\\text{ cm}', '8\\text{ cm}', o.ca) }),
    shape({ name: 'q', pts: DEF, tone: 'good', rights: [1], names: ['D', 'E', 'F'], sides: sides('9\\text{ cm}', o.x, o.fd) }),
  ]);

// The same triangles with DEF flipped over and turned, so its sides sit in new places on the page.
const turned = moved({ D: [0, 0], E: [9, 0], F: [9, 12] }, { flip: true, turn: 105, to: [18.5, 4.5] });
const turnedPair = (id: string) =>
  figure(id, [
    shape({ name: 'p', pts: ABC, rights: [1], names: ['A', 'B', 'C'], sides: sides('6\\text{ cm}', '8\\text{ cm}') }),
    shape({ name: 'q', pts: [turned.D, turned.E, turned.F], tone: 'good', rights: [1], names: ['D', 'E', 'F'], sides: sides('9\\text{ cm}', 'x') }),
  ]);

const video: Explainer = {
  id: 'm9-7-3-c',
  lessonId: 'm9-7-3',
  title: 'Similar Polygons, Part 3: Finding a Missing Side',
  thumbnailTitle: 'Finding a Missing Side',
  thumbnail: 'vo',
  summary:
    'In similar polygons, every pair of corresponding sides has the same ratio. If △ABC ∼ △DEF with AB = 6 cm, BC = 8 cm and DE = 9 cm, then AB matches DE and BC matches EF, so the scale factor is 9/6 = 1.5 and EF = 8 × 1.5 = 12 cm. Going the other way, DF = 15 cm gives AC = 15 ÷ 1.5 = 10 cm. Match sides by the order of the letters, not by their position on the page.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 3', title: 'Finding a Missing Side', subtitle: 'Use the order of the letters' }],
      lines: [
        { say: 'Similar shapes let you find lengths you have not measured. If you know one pair of matching sides, you can find the scale factor, and every other side follows.', show: 'title' },
        { say: 'In this part, you will use the order of the letters to match the sides, then find a missing side.' },
      ],
    },
    {
      chapter: 'Using the vertex order',
      layout: 'split',
      leftWidth: 600,
      left: [pair('vo', { x: 'x' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$\\triangle ABC \\sim \\triangle DEF$. $AB = 6$ cm, $BC = 8$ cm and $DE = 9$ cm. Find $x = EF$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AB \\leftrightarrow DE, \\quad BC \\leftrightarrow EF', 'k = \\dfrac{DE}{AB} = \\dfrac{9}{6} = 1.5', '\\dfrac{x}{8} = 1.5', 'x = 8 \\times 1.5 = 12 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Triangle A B C is similar to triangle D E F. Side A B is six centimetres, side B C is eight centimetres, and side D E is nine centimetres. Find x, the length of side E F.', show: [...shapeIds('vo', 'p', { lens: true, names: true }), ...shapeIds('vo', 'q', { lens: true, names: true }), 'q'] },
        { say: 'Step one: match the sides using the order of the letters. A B matches D E, because both use the first two letters. And B C matches E F, because both use the second and third letters.', show: 'm.0', focus: ['m.0', 'vo.p-len0', 'vo.q-len0', 'vo.p-len1', 'vo.q-len1'] },
        { say: 'Step two: find the scale factor from the pair where you know both lengths. D E over A B is nine over six, which is one point five.', show: 'm.1', focus: ['m.1', 'vo.p-len0', 'vo.q-len0'] },
        { say: 'Step three: every pair of matching sides has that same ratio. So x over eight is one point five as well.', show: 'm.2', focus: ['m.2', 'vo.p-len1', 'vo.q-len1'] },
        { say: 'Step four: multiply. x equals eight times one point five, which is twelve. Side E F is twelve centimetres long.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: triangle D E F is the bigger triangle, and twelve is bigger than eight. That makes sense for an enlargement.' },
      ],
    },
    {
      chapter: 'Going the other way',
      layout: 'split',
      leftWidth: 600,
      left: [pair('ow', { x: '12\\text{ cm}', ca: 'y', fd: '15\\text{ cm}' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The same triangles. $DF = 15$ cm. Find $y = AC$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['CA \\leftrightarrow FD', 'y = 15 \\div 1.5 = 10 \\text{ cm}', '\\text{Check: } \\dfrac{15}{10} = 1.5 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Now go the other way, from the big triangle to the small one. Side D F of the big triangle is fifteen centimetres. Find y, the length of side A C.', show: [...shapeIds('ow', 'p', { lens: true, names: true }), ...shapeIds('ow', 'q', { lens: true, names: true }), 'q'] },
        { say: 'C A uses the third and first letters, so it matches F D. These are the pink sides.', show: 'm.0', focus: ['m.0', 'ow.p-len2', 'ow.q-len2'] },
        { say: 'The big triangle’s sides are one point five times the small triangle’s. So to go from big to small, divide by one point five. Fifteen divided by one point five is ten.', show: 'm.1', focus: 'm.1' },
        { say: 'So A C is ten centimetres. Check: fifteen over ten is one point five, the same scale factor. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 600,
      left: [turnedPair('tn')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Matching the wrong sides', md: 'Use the **order of the letters**, not the position on the page. The second shape may be **turned** or **flipped**.' }],
      lines: [
        { say: 'Here is a common mistake. The second triangle may be turned or flipped over, so its sides are in different places on the page.', show: [...shapeIds('tn', 'p', { lens: true, names: true }), ...shapeIds('tn', 'q', { lens: true, names: true })] },
        { say: 'Here, triangle D E F has been flipped over and turned. Side D E is no longer along the bottom.', focus: ['tn.q-len0'] },
        { say: 'If you match sides by where they sit on the page, you can easily pick the wrong pair.', show: 'oops' },
        { say: 'So always use the order of the letters. A B still matches D E, and B C still matches E F, however the triangle is turned. So x is still twelve centimetres.', focus: ['tn.p-len0', 'tn.q-len0', 'tn.p-len1', 'tn.q-len1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\triangle PQR \\sim \\triangle XYZ$. $PQ = 4$ cm, $QR = 10$ cm and $XY = 6$ cm. How long is $YZ$?',
          choices: ['$15$ cm', '$12$ cm', '$6.67$ cm', '$2.4$ cm'],
          answer: 0,
          working: '$PQ$ matches $XY$, so $k = \\dfrac{6}{4} = 1.5$. $QR$ matches $YZ$, so $YZ = 10 \\times 1.5 = 15\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle P Q R is similar to triangle X Y Z. P Q is four centimetres, Q R is ten centimetres, and X Y is six centimetres. How long is Y Z? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A, fifteen centimetres. P Q matches X Y, so the scale factor is six over four, which is one point five. Q R matches Y Z, so Y Z is ten times one point five, which is fifteen. Choice B adds two, the difference between six and four, but similar shapes multiply.', show: 'q.answer' },
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
            'Match sides by the order of the letters: in $\\triangle ABC \\sim \\triangle DEF$, $AB$ matches $DE$.',
            'Find the scale factor from one pair you know both lengths of.',
            'Multiply to go to the bigger shape, and divide to go to the smaller one.',
            'The second shape may be turned or flipped: trust the letters, not the picture.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Match the sides by the order of the letters.', show: 'sum.0' },
        { say: 'Find the scale factor from one pair of matching sides where you know both lengths.', show: 'sum.1' },
        { say: 'Then multiply by the scale factor to go to the bigger shape, or divide to go to the smaller one.', show: 'sum.2' },
        { say: 'And remember, the second shape may be turned or flipped, so trust the letters, not the picture. In the next part, you will use shadows and similar triangles to measure a tree. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
