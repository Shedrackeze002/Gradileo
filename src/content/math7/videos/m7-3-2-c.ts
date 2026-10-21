import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pie } from '@/content/math5/videos/lib/m5-5-figures.ts';

// 5 1/4 as five whole pies and a quarter. The last whole is also drawn cut into quarters (c4), to
// swap in when it is regrouped: then 4 wholes and 5 quarters.
const pies = (id: string) =>
  figure(
    id,
    [
      ...[0, 1, 2, 3, 4].map((k) => pie({ name: `w${k}`, parts: 1, shaded: 1, tone: 'adj', at: [k * 2.3, 0], r: 0.95 })),
      pie({ name: 'c4', parts: 4, shaded: 4, tone: 'opp', at: [4 * 2.3, 0], r: 0.95 }),
      pie({ name: 'q', parts: 4, shaded: 1, tone: 'opp', at: [5 * 2.3, 0], r: 0.95 }),
    ],
    190,
  );

const video: Explainer = {
  id: 'm7-3-2-c',
  lessonId: 'm7-3-2',
  title: 'Adding and Subtracting Mixed Numbers, Part 3: Subtracting Mixed Numbers',
  thumbnailTitle: 'Subtracting Mixed Numbers',
  thumbnail: 'pp',
  summary:
    'To subtract mixed numbers, subtract the whole numbers and subtract the fractions, using a common denominator: 5 5/6 − 2 1/3 = 5 5/6 − 2 2/6 = 3 3/6 = 3 1/2. When the first fraction is too small, regroup 1 whole as a fraction: 5 1/4 = 4 5/4, so 5 1/4 − 2 3/4 = 4 5/4 − 2 3/4 = 2 2/4 = 2 1/2. Taking the smaller fraction from the bigger one instead gives the wrong answer, 3 1/2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 3', title: 'Subtracting Mixed Numbers', subtitle: 'Regroup when the fraction is too small' }],
      lines: [
        { say: 'You have five and one quarter pizzas, and you give away two and three quarters. How can you take three quarters away, when you only have one quarter?', show: 'title' },
        { say: 'In this part, you will subtract mixed numbers, and learn to regroup a whole when the fraction is too small.' },
      ],
    },
    {
      chapter: 'No regrouping',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $5\\dfrac{5}{6} - 2\\dfrac{1}{3}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\dfrac{1}{3} = 2\\dfrac{2}{6}', '\\text{Wholes: } 5 - 2 = 3 \\qquad \\text{Fractions: } \\dfrac{5}{6} - \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}', '5\\dfrac{5}{6} - 2\\dfrac{1}{3} = 3\\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Subtracting mixed numbers works like adding them. Subtract the whole numbers, and subtract the fractions. Find five and five sixths minus two and one third.', show: 'q' },
        { say: 'Six is a multiple of three, so use sixths. One third is two sixths, so the second number is two and two sixths.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract the whole numbers: five minus two is three. Subtract the fractions: five sixths minus two sixths is three sixths.', show: 'm.1', focus: 'm.1' },
        { say: 'Three divides both three and six, so three sixths in lowest terms is one half. The answer is three and one half.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'When the fraction is too small',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $5\\dfrac{1}{4} - 2\\dfrac{3}{4}$.' },
        pies('pp'),
        { kind: 'math', id: 'm', size: 'md', lines: ['5\\dfrac{1}{4} = 4 + \\dfrac{4}{4} + \\dfrac{1}{4} = 4\\dfrac{5}{4}', '4\\dfrac{5}{4} - 2\\dfrac{3}{4} = 2\\dfrac{2}{4} = 2\\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Now find five and one quarter minus two and three quarters. Here is five and one quarter: five whole pizzas, and one quarter of a pizza.', show: ['q', 'pp.w0-rim', 'pp.w0-shade', 'pp.w1-rim', 'pp.w1-shade', 'pp.w2-rim', 'pp.w2-shade', 'pp.w3-rim', 'pp.w3-shade', 'pp.w4-rim', 'pp.w4-shade', 'pp.q-rim', 'pp.q-shade'] },
        { say: 'We need to take away three quarters, but there is only one quarter. We cannot take three quarters from one quarter.', focus: 'pp.q-shade' },
        {
          say: 'So we regroup. Cut one of the whole pizzas into four quarters. One whole is four quarters, so the amount does not change.',
          hide: ['pp.w4-rim', 'pp.w4-shade'],
          show: ['pp.c4-rim', 'pp.c4-s0', 'pp.c4-s1', 'pp.c4-s2', 'pp.c4-s3'],
          focus: ['pp.c4-s0', 'pp.c4-s1', 'pp.c4-s2', 'pp.c4-s3'],
        },
        { say: 'Now there are four whole pizzas and five quarters. So five and one quarter is the same as four and five quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Now take away two wholes, and three quarters.', hide: ['pp.w0-shade', 'pp.w1-shade', 'pp.c4-s1', 'pp.c4-s2', 'pp.c4-s3'] },
        { say: 'Two whole pizzas and two quarters are left. Two quarters is one half. So five and one quarter minus two and three quarters is two and one half.', show: 'm.1', focus: ['m.1', 'pp.w2-shade', 'pp.w3-shade', 'pp.c4-s0', 'pp.q-shade'] },
      ],
    },
    {
      chapter: 'Regrouping in numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Regrouping', md: 'When the first fraction is smaller than the one you take away, **regroup**: take $1$ whole from the whole number and add it to the fraction. In quarters, $1 = \\dfrac{4}{4}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5\\dfrac{1}{4} \\;\\to\\; 4\\dfrac{5}{4}', '\\text{Wholes: } 4 - 2 = 2 \\qquad \\text{Fractions: } \\dfrac{5}{4} - \\dfrac{3}{4} = \\dfrac{2}{4} = \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Here is the same thing in numbers. When the first fraction is smaller than the fraction you take away, regroup. Take one whole from the whole number, and add it to the fraction.', show: 'key' },
        { say: 'One whole is four quarters. So five and one quarter becomes four and five quarters: one less whole, and four more quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Now subtract. Four minus two is two. Five quarters minus three quarters is two quarters, which is one half. The answer is two and one half.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting the fractions backwards', md: 'Do **not** take the smaller fraction away from the bigger one. $\\dfrac{3}{4} - \\dfrac{1}{4}$ gives a wrong answer: $5\\dfrac{1}{4} - 2\\dfrac{3}{4} \\ne 3\\dfrac{1}{2}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Check: } 2\\dfrac{3}{4} + 3\\dfrac{1}{2} = 6\\dfrac{1}{4} \\ne 5\\dfrac{1}{4} \\;\\bad{\\times}', '\\text{Check: } 2\\dfrac{3}{4} + 2\\dfrac{1}{2} = 5\\dfrac{1}{4} \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. You cannot take three quarters from one quarter, so some people turn it around, and take one quarter from three quarters instead.', show: 'oops' },
        { say: 'That gives three and one half, which is wrong. You can check a subtraction by adding back. Two and three quarters plus three and one half is six and one quarter, not five and one quarter.', show: 'm.0', focus: 'm.0' },
        { say: 'Two and three quarters plus two and one half is five and one quarter. So regroup first. The correct answer is two and one half.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $4\\dfrac{1}{5} - 1\\dfrac{3}{5}$.',
          choices: ['$3\\dfrac{2}{5}$', '$2\\dfrac{2}{5}$', '$2\\dfrac{3}{5}$', '$5\\dfrac{4}{5}$'],
          answer: 2,
          working: 'Regroup: $4\\dfrac{1}{5} = 3\\dfrac{6}{5}$. Then $3 - 1 = 2$ and $\\dfrac{6}{5} - \\dfrac{3}{5} = \\dfrac{3}{5}$, so the answer is $2\\dfrac{3}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find four and one fifth minus one and three fifths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two and three fifths. One fifth is too small, so regroup: four and one fifth is three and six fifths. Three minus one is two, and six fifths minus three fifths is three fifths. Choice A takes one fifth from three fifths, which is backwards.', show: 'q.answer' },
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
            'Subtract the whole numbers, and subtract the fractions, using a common denominator.',
            'If the first fraction is too small, **regroup** $1$ whole: $5\\dfrac{1}{4} = 4\\dfrac{5}{4}$.',
            'Never take the smaller fraction from the bigger one instead.',
            'Check by adding back.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To subtract mixed numbers, subtract the whole numbers, and subtract the fractions, using a common denominator.', show: 'sum.0' },
        { say: 'If the first fraction is too small, regroup one whole as a fraction.', show: 'sum.1' },
        { say: 'Never turn the fractions around and take the smaller one from the bigger one.', show: 'sum.2' },
        { say: 'And check your answer by adding back. In the next part, you will regroup in harder questions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
