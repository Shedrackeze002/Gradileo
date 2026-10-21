import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { room } from '@/content/math8/videos/lib/m8-5-figures.ts';

// How many quarters fit into one half? Two.
const fit = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'h', parts: 2, shaded: 1, tone: 'adj', at: [0, 2.4], width: 10, label: '\\dfrac{1}{2}' }),
      bar({ name: 'q', parts: 4, shaded: 2, tones: ['good', 'opp'], at: [0, 0], width: 10, label: '\\dfrac{1}{2} \\div \\dfrac{1}{4} = 2' }),
      room('lab', [13.5, 0]),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-3-3-c',
  lessonId: 'm9-3-3',
  title: 'Multiplying and Dividing Rational Numbers, Part 3: Dividing Fractions',
  thumbnailTitle: 'Dividing Fractions',
  thumbnail: 'ft',
  summary:
    'Dividing asks how many times one number fits into another: two quarters fit into one half, so 1/2 ÷ 1/4 = 2, the same as 1/2 × 4. The reciprocal of a fraction is the fraction flipped over, and a number times its reciprocal is 1. To divide by a fraction, multiply by its reciprocal: −3/5 ÷ (−9/10) = −3/5 × (−10/9) = 30/45 = 2/3, positive because the signs are the same. Flip only the second fraction, the divisor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 3', title: 'Dividing Fractions', subtitle: 'Multiply by the reciprocal' }],
      lines: [
        { say: 'Dividing by a fraction sounds hard. But there is a neat trick that turns every division into a multiplication.', show: 'title' },
        { say: 'In this part, you will learn what a reciprocal is, and use it to divide positive and negative fractions.' },
      ],
    },
    {
      chapter: 'How many fit?',
      layout: 'center',
      main: [fit('ft'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{2} \\div \\dfrac{1}{4} = 2 = \\dfrac{1}{2} \\times 4'] }],
      lines: [
        { say: 'Dividing asks how many times one number fits into another. One half divided by one quarter asks: how many quarters fit into one half?', show: ['ft.h-frame', 'ft.h-shade', 'ft.h-label'] },
        { say: 'Here is a strip cut into quarters. One quarter fits, and then a second quarter. Two quarters fill one half exactly.', show: ['ft.q-frame', 'ft.q-shade'], focus: 'ft.q-shade' },
        { say: 'So one half divided by one quarter is two.', show: 'ft.q-label', focus: 'ft.q-label' },
        { say: 'Notice that one half times four is also two. Dividing by one quarter gave the same answer as multiplying by four.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Reciprocals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reciprocal', md: 'The **reciprocal** of a fraction is the fraction flipped over: the numerator and the denominator swap. A number times its reciprocal is $1$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{4} \\;\\to\\; \\dfrac{4}{1} = 4', '-\\dfrac{9}{10} \\;\\to\\; -\\dfrac{10}{9}', '-\\dfrac{9}{10} \\times \\left(-\\dfrac{10}{9}\\right) = \\dfrac{90}{90} = 1'] },
      ],
      lines: [
        { say: 'Four is the reciprocal of one quarter. The reciprocal of a fraction is the fraction flipped over: the numerator and the denominator swap places.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'The reciprocal of a negative fraction is also negative. The sign stays, and only the top and the bottom swap. The reciprocal of negative nine tenths is negative ten ninths.', show: 'm.1', focus: 'm.1' },
        { say: 'A number times its reciprocal is always one. Negative nine tenths times negative ten ninths is ninety over ninety, which is one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Dividing negative fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Dividing by a fraction', md: 'To divide by a fraction, **multiply by its reciprocal**.' },
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-\\dfrac{3}{5} \\div \\left(-\\dfrac{9}{10}\\right)$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['= -\\dfrac{3}{5} \\times \\left(-\\dfrac{10}{9}\\right)', '\\text{Sign: same signs} \\;\\to\\; \\text{positive}', '\\dfrac{3 \\times 10}{5 \\times 9} = \\dfrac{30}{45} = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'Here is the rule. To divide by a fraction, multiply by its reciprocal.', show: 'key' },
        { say: 'Find negative three fifths divided by negative nine tenths. Keep the first fraction, change divide to multiply, and flip the second fraction. That gives negative three fifths times negative ten ninths.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Sign: two negatives give a positive.', show: 'm.1', focus: 'm.1' },
        { say: 'Sizes: three times ten is thirty, and five times nine is forty-five. Thirty forty-fifths simplifies to two thirds, so the answer is positive two thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Simplify first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{5} \\times \\dfrac{10}{9}', '3 \\text{ and } 9: \\ \\div 3 \\;\\to\\; 1 \\text{ and } 3', '10 \\text{ and } 5: \\ \\div 5 \\;\\to\\; 2 \\text{ and } 1', '\\dfrac{1}{1} \\times \\dfrac{2}{3} = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'You can simplify first, once the division has become a multiplication. Look at three fifths times ten ninths.', show: 'm.0', focus: 'm.0' },
        { say: 'The three on top and the nine on the bottom share a factor of three. Divide both by three: they become one and three.', show: 'm.1', focus: 'm.1' },
        { say: 'The ten on top and the five on the bottom share a factor of five. Divide both by five: they become two and one.', show: 'm.2', focus: 'm.2' },
        { say: 'Now one over one, times two thirds, is two thirds. The same answer, with no big numbers to simplify at the end.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Flip the second fraction only', md: 'Flip the **second** fraction, the divisor: the number you divide by. Keep the first fraction as it is.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{1}{2} \\times \\dfrac{1}{4} = \\dfrac{1}{8}} \\qquad \\bad{\\dfrac{2}{1} \\times \\dfrac{1}{4} = \\dfrac{1}{2}}', '\\good{\\dfrac{1}{2} \\div \\dfrac{1}{4} = \\dfrac{1}{2} \\times \\dfrac{4}{1} = 2}'] },
      ],
      lines: [
        { say: 'Watch out for two mistakes. If you forget to flip, one half times one quarter gives one eighth. If you flip the first fraction instead, you get one half.', show: 'm.0', focus: 'm.0' },
        { say: 'But the strip showed that two quarters fit into one half, so the answer must be two.' },
        { say: 'Only the second fraction is flipped. That is the divisor, the number you divide by. One half times four is two, which matches.', show: ['oops', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{5}{8} \\div \\left(-\\dfrac{3}{4}\\right)$.',
          choices: ['$-\\dfrac{15}{32}$', '$-\\dfrac{5}{6}$', '$\\dfrac{5}{6}$', '$-\\dfrac{6}{5}$'],
          answer: 1,
          working: 'Multiply by the reciprocal: $\\dfrac{5}{8} \\times \\left(-\\dfrac{4}{3}\\right) = -\\dfrac{20}{24} = -\\dfrac{5}{6}$. Different signs, so the answer is negative.',
        },
      ],
      lines: [
        { say: 'Your turn. Find five eighths divided by negative three quarters. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative five sixths. Multiply by the reciprocal of negative three quarters, which is negative four thirds. Five eighths times negative four thirds is negative twenty over twenty-four, which is negative five sixths. Choice D flips the first fraction instead of the second.', show: 'q.answer' },
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
            'The **reciprocal** of a fraction is the fraction flipped over: $-\\dfrac{9}{10} \\to -\\dfrac{10}{9}$.',
            'To divide by a fraction, multiply by its reciprocal.',
            'Find the sign, then simplify and multiply.',
            'Flip only the second fraction, the divisor.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The reciprocal of a fraction is the fraction flipped over, and it keeps its sign.', show: 'sum.0' },
        { say: 'To divide by a fraction, multiply by its reciprocal.', show: 'sum.1' },
        { say: 'Find the sign, then simplify and multiply.', show: 'sum.2' },
        { say: 'And flip only the second fraction, the divisor. In the next part, you will multiply mixed numbers and use a calculator. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
