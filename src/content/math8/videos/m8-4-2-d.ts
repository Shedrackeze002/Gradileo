import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fitBar, pieces } from './lib/m8-4-figures.ts';

// The ribbon: 3 3/4 m, in quarters of a metre; two 1 1/2 m pieces fit, and 3/4 m (half a piece) is left.
const ribbon = (id: string) => figure(id, [fitBar({ total: 3.75, piece: 1.5, den: 4, exact: true, scale: true, rest: '\\tfrac34\\ \\text{m} = \\tfrac12\\ \\text{piece}' })], 270);

const video: Explainer = {
  id: 'm8-4-2-d',
  lessonId: 'm8-4-2',
  title: 'Dividing Fractions, Part 4: Dividing Mixed Numbers',
  thumbnailTitle: 'Dividing Mixed Numbers',
  thumbnail: 'rb',
  summary:
    'To divide mixed numbers, write each one as an improper fraction, then multiply by the reciprocal of the divisor. Estimate first: 3 3/4 is about 4, and 1 1/2 fits into 4 between 2 and 3 times. Then 3 3/4 ÷ 1 1/2 = 15/4 ÷ 3/2 = 15/4 × 2/3 = 30/12 = 5/2 = 2 1/2. In the same way, 5 ÷ 1 1/4 = 5/1 × 4/5 = 4. Dividing the whole numbers and the fractions separately gives 4 1/2, which the estimate shows is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 4', title: 'Dividing Mixed Numbers', subtitle: 'Estimate, then use the reciprocal' }],
      lines: [
        { say: 'A ribbon is three and three quarter metres long. How many pieces, each one and one half metres long, can be cut from it?', show: 'title' },
        { say: 'In this part, you will divide mixed numbers, and use an estimate to check your answer.' },
      ],
    },
    {
      chapter: 'Estimate first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $3\\dfrac{3}{4} \\div 1\\dfrac{1}{2}$.' },
        ribbon('rb'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate first', md: '$3\\dfrac{3}{4}$ is about $4$, and $1\\dfrac{1}{2}$ fits into $4$ between $2$ and $3$ times.' },
      ],
      lines: [
        { say: 'How many pieces of one and one half metres fit into three and three quarter metres? That is three and three quarters divided by one and one half.', show: 'q' },
        { say: 'Estimate first. Three and three quarters is about four. Two pieces make three metres, and three pieces make four and a half metres. So the answer is between two and three.', show: 'tip' },
        { say: 'Here is the ribbon, with a mark at every quarter of a metre, and a thicker mark at each whole metre.', show: ['rb.frame', 'rb.scale'] },
        { say: 'Mark off pieces one and one half metres long. One piece. Two pieces.', show: pieces('rb', 2) },
        { say: 'What is left is three quarters of a metre. That is exactly half of a piece, because half of one and one half is three quarters. So the answer should be two and one half.', show: 'rb.rest', focus: 'rb.rest' },
      ],
    },
    {
      chapter: 'Improper fractions, then the reciprocal',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '3\\dfrac{3}{4} = \\dfrac{15}{4} \\qquad 1\\dfrac{1}{2} = \\dfrac{3}{2}',
            '\\dfrac{15}{4} \\div \\dfrac{3}{2} = \\dfrac{15}{4} \\times \\dfrac{2}{3}',
            '= \\dfrac{30}{12} = \\dfrac{5}{2} = 2\\dfrac{1}{2}',
          ],
        },
      ],
      lines: [
        { say: 'Now calculate. First, write each mixed number as an improper fraction. Three and three quarters is fifteen quarters, and one and one half is three halves.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by the reciprocal of the divisor. The reciprocal of three halves is two thirds. So it is fifteen quarters times two thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'Fifteen times two is thirty, and four times three is twelve. That is thirty twelfths. Six divides both, so it is five halves, which is two and one half.', show: 'm.2', focus: 'm.2' },
        { say: 'It matches the estimate and the picture: two whole pieces, and half of a third piece.' },
      ],
    },
    {
      chapter: 'A whole number divided by a mixed number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $5 \\div 1\\dfrac{1}{4}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 \\div 1\\dfrac{1}{4} = \\dfrac{5}{1} \\div \\dfrac{5}{4}', '= \\dfrac{5}{1} \\times \\dfrac{4}{5} = \\dfrac{20}{5} = 4'] },
      ],
      lines: [
        { say: 'Here is one more. Find five divided by one and one quarter.', show: 'q' },
        { say: 'Estimate: one and one quarter is a bit more than one, so a bit fewer than five of them fit into five.' },
        { say: 'A whole number is a fraction over one, so five is five over one. And one and one quarter is five quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by the reciprocal, four fifths. Five times four is twenty, and one times five is five. Twenty fifths is four. Four is a bit fewer than five, just as we estimated.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the parts separately', md: '$3\\dfrac{3}{4} \\div 1\\dfrac{1}{2}$ is **not** $3 \\div 1$ plus $\\dfrac{3}{4} \\div \\dfrac{1}{2}$. Write improper fractions first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{3 \\div 1 = 3 \\qquad \\dfrac{3}{4} \\div \\dfrac{1}{2} = 1\\dfrac{1}{2} \\qquad 3 + 1\\dfrac{1}{2} = 4\\dfrac{1}{2}}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people divide the whole numbers, three divided by one is three, and then the fractions, three quarters divided by one half is one and one half.', show: 'oops' },
        { say: 'Adding those gives four and one half. But the estimate said between two and three! The estimate catches the mistake.', show: 'm.0', focus: 'm.0' },
        { say: 'So always write the mixed numbers as improper fractions first, and estimate to check.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $2\\dfrac{1}{4} \\div 1\\dfrac{1}{2}$.',
          choices: ['$3\\dfrac{3}{8}$', '$1\\dfrac{1}{2}$', '$2\\dfrac{1}{2}$', '$\\dfrac{2}{3}$'],
          answer: 1,
          working: '$2\\tfrac14 = \\tfrac94$ and $1\\tfrac12 = \\tfrac32$, so $\\tfrac94 \\times \\tfrac23 = \\tfrac{18}{12} = \\tfrac32 = 1\\tfrac12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find two and one quarter divided by one and one half. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, one and one half. Two and one quarter is nine quarters, and one and one half is three halves. Nine quarters times two thirds is eighteen twelfths, which is one and one half. Choice C, two and one half, divides the whole numbers and the fractions separately.', show: 'q.answer' },
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
            'Estimate first: $3\\dfrac{3}{4} \\div 1\\dfrac{1}{2}$ is between $2$ and $3$.',
            'Write each mixed number as an improper fraction, then multiply by the reciprocal of the divisor.',
            '$\\dfrac{15}{4} \\times \\dfrac{2}{3} = \\dfrac{30}{12} = 2\\dfrac{1}{2}$',
            'Never divide the whole numbers and the fractions separately.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Estimate first, so you know roughly what to expect.', show: 'sum.0' },
        { say: 'Write each mixed number as an improper fraction, then multiply by the reciprocal of the divisor.', show: 'sum.1' },
        { say: 'Simplify, and write the answer as a mixed number.', show: 'sum.2' },
        { say: 'And never divide the whole numbers and the fractions separately. Next, you will decide whether a problem needs multiplying or dividing. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
