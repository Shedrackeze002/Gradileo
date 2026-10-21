import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { paper } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { tag } from '@/content/math8/videos/lib/m8-3-figures.ts';
import { room, shape, shapeIds } from './lib/m9-7-figures.ts';

type P = [number, number];

const rect = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

// A 4 by 2 rectangle, its enlargement with k = 1.5 (6 by 3) and its reduction with k = 0.5 (2 by 1).
const three = (id: string) =>
  figure(
    id,
    [
      paper({ x: [0, 18], y: [0, 5] }),
      shape({ name: 'o', pts: rect(1, 1, 4, 2), sides: [{ tone: 'adj', label: '4' }, { tone: 'opp', label: '2' }] }),
      shape({ name: 'e', pts: rect(7, 1, 6, 3), tone: 'good', sides: [{ tone: 'adj', label: '6' }, { tone: 'opp', label: '3' }] }),
      shape({ name: 'r', pts: rect(15, 1, 2, 1), tone: 'theta', sides: [{ tone: 'adj', label: '2' }, { tone: 'opp', label: '1' }] }),
      tag('to', [3, -1.3], '\\text{Original}', { tone: 'muted' }),
      tag('te', [10, -1.3], 'k = 1.5', { tone: 'good' }),
      tag('tr', [16, -1.3], 'k = 0.5', { tone: 'theta' }),
    ],
    300,
  );

// The sticker: A is 12 cm by 8 cm; B is its reduction with k = 0.75, 9 cm by 6 cm.
const sticker = (id: string) =>
  figure(id, [
    shape({ name: 'a', pts: rect(0, 0, 12, 8), sides: [{ tone: 'adj', label: '12\\text{ cm}' }, { tone: 'opp', label: '8\\text{ cm}' }] }),
    shape({ name: 'b', pts: rect(18.5, 0, 9, 6), tone: 'good', sides: [{ tone: 'adj', label: '9\\text{ cm}' }, { tone: 'opp', label: 'x' }] }),
    tag('na', [6, 4], '\\text{A}'),
    tag('nb', [23, 3], '\\text{B}'),
    room('r', [29.8, 0]),
  ]);

const video: Explainer = {
  id: 'm9-7-1-b',
  lessonId: 'm9-7-1',
  title: 'Scale Diagrams and Enlargements, Part 2: Enlargements and Reductions',
  thumbnailTitle: 'Enlargements and Reductions',
  thumbnail: 'th',
  summary:
    'A scale factor greater than 1 makes an enlargement, a scale factor between 0 and 1 makes a reduction, and a scale factor of 1 keeps the same size. A 12 cm by 8 cm sticker reduced to a length of 9 cm has k = 9/12 = 0.75, so its new width is 0.75 × 8 = 6 cm. Always put the image on top: 12/9 would wrongly suggest an enlargement. When the decimal repeats, use a fraction, such as k = 4/6 = 2/3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 2', title: 'Enlargements and Reductions', subtitle: 'Bigger, smaller or the same size' }],
      lines: [
        { say: 'A scale diagram does not have to be bigger than the original. A poster can shrink to fit on a flyer, and a map shrinks a whole park onto one sheet of paper.', show: 'title' },
        { say: 'In this part, you will use the scale factor to tell whether an image is bigger or smaller than the original.' },
      ],
    },
    {
      chapter: 'Bigger or smaller?',
      layout: 'center',
      main: [
        three('th'),
        {
          kind: 'bullets',
          id: 'b',
          items: ['$k > 1$: the image is bigger. It is an **enlargement**.', '$0 < k < 1$: the image is smaller. It is a **reduction**.', '$k = 1$: the image is the same size.'],
        },
      ],
      lines: [
        { say: 'Here is a rectangle on squared paper. It is four squares long and two squares tall. This is the original.', show: ['th.paper', ...shapeIds('th', 'o', { lens: true }), 'th.to'] },
        { say: 'Multiply every length by one point five. Four becomes six, and two becomes three. The image is bigger.', show: [...shapeIds('th', 'e', { lens: true }), 'th.te'], focus: 'th.e' },
        { say: 'When the scale factor is greater than one, the image is bigger than the original. We call it an enlargement.', show: 'b.0' },
        { say: 'Now multiply every length by zero point five instead. Four becomes two, and two becomes one. This image is smaller.', show: [...shapeIds('th', 'r', { lens: true }), 'th.tr'], focus: 'th.r' },
        { say: 'When the scale factor is between zero and one, the image is smaller than the original. We call it a reduction.', show: 'b.1' },
        { say: 'And if the scale factor is exactly one, every length stays the same, so the image is the same size as the original.', show: 'b.2', focus: 'th' },
      ],
    },
    {
      chapter: 'A sticker that shrinks',
      layout: 'split',
      leftWidth: 600,
      left: [sticker('st')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $12$ cm by $8$ cm sticker (A) is reduced so that its length is $9$ cm (B). Find the scale factor and the new width, $x$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = \\dfrac{9}{12} = \\dfrac{3}{4} = 0.75', 'k < 1: \\text{ a reduction}', 'x = 0.75 \\times 8 = 6', 'x = 6 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Let’s try one. A sticker is twelve centimetres long and eight centimetres wide. It is shrunk so that its length is nine centimetres. Find the scale factor, and the new width, x.', show: [...shapeIds('st', 'a', { lens: true }), ...shapeIds('st', 'b', { lens: true }), 'st.na', 'st.nb', 'q'] },
        { say: 'Step one: the scale factor is the image length over the original length. The image is the new sticker, so that is nine over twelve.', focus: ['st.a-len0', 'st.b-len0'] },
        { say: 'Both numbers divide by three, so nine over twelve is three quarters, or zero point seven five.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: the scale factor is less than one, so this is a reduction. That makes sense, because the sticker got smaller.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: multiply the original width by the scale factor. Zero point seven five times eight is six.', show: 'm.2', focus: ['m.2', 'st.a-len1', 'st.b-len1'] },
        { say: 'So the new width is six centimetres. The new sticker is nine centimetres by six centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'Always put the **image** on top. A **reduction** must have a scale factor **less than 1**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{12}{9} \\approx 1.33 \\quad \\text{(wrong: the sticker got smaller)}', '\\dfrac{9}{12} = 0.75 \\quad \\text{(image over original)} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Some people always divide the bigger number by the smaller number. For the sticker, that gives twelve over nine, which is about one point three three.', show: 'm.0', focus: 'm.0' },
        { say: 'But a scale factor greater than one means an enlargement, and the sticker got smaller! That answer cannot be right.', show: 'oops' },
        { say: 'So always put the image on top, and the original on the bottom. Nine over twelve is zero point seven five. A reduction must have a scale factor less than one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Fractions or decimals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Fractions or decimals', md: 'A scale factor can be a decimal or a fraction. When the decimal repeats, use the **fraction**: it is exact.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\text{ cm} \\to 4 \\text{ cm}: \\quad k = \\dfrac{4}{6} = \\dfrac{2}{3}', '\\dfrac{2}{3} = 0.666\\ldots \\approx 0.67', '\\text{Check: } \\dfrac{2}{3} \\times 6 = 4 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'A scale factor can be a decimal, like zero point seven five, or a fraction, like three quarters. Both are fine.', show: 'tip' },
        { say: 'Suppose a side that is six centimetres long becomes four centimetres long. The scale factor is four over six, which simplifies to two thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'As a decimal, two thirds is zero point six six six, and the sixes never end. Zero point six seven is close, but it is not exact.', show: 'm.1', focus: 'm.1' },
        { say: 'So when the decimal repeats, use the fraction. Check: two thirds of six is four, which is the image length, exactly.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle is $10$ cm by $6$ cm. A scale diagram of it is $4$ cm by $2.4\\text{ cm}$. What is the scale factor, and what kind of scale diagram is it?',
          choices: ['$2.5$, an enlargement', '$0.4$, an enlargement', '$2.5$, a reduction', '$0.4$, a reduction'],
          answer: 3,
          working: '$k = \\dfrac{4}{10} = 0.4$, and $\\dfrac{2.4}{6} = 0.4$ as well. Since $0.4 < 1$, the scale diagram is a reduction.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle is ten centimetres by six centimetres. A scale diagram of it is four centimetres by two point four centimetres. What is the scale factor, and what kind of scale diagram is it? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: zero point four, a reduction. Four over ten is zero point four, and two point four over six is zero point four as well. Choice A divides the wrong way. Ten over four is two point five, but the image is smaller, so it cannot be an enlargement.', show: 'q.answer' },
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
            '$k > 1$ is an **enlargement**. $0 < k < 1$ is a **reduction**. $k = 1$ keeps the same size.',
            'Put the **image** on top: $k = \\dfrac{\\text{image}}{\\text{original}}$.',
            'New length $= k \\times$ original length.',
            'When the decimal repeats, use a fraction, such as $\\dfrac{2}{3}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A scale factor greater than one makes an enlargement. A scale factor between zero and one makes a reduction. And a scale factor of one keeps the same size.', show: 'sum.0' },
        { say: 'Always put the image on top when you find the scale factor.', show: 'sum.1' },
        { say: 'To find a new length, multiply the original length by the scale factor.', show: 'sum.2' },
        { say: 'And when the decimal repeats, use a fraction. In the next part, you will use the scale factor to find new lengths in real problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
