import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { room } from '@/content/math8/videos/lib/m8-5-figures.ts';

// Two thirds of three quarters: the three quarters split into three equal parts, two of them taken.
const strips = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'a', parts: 4, shaded: 3, tone: 'adj', at: [0, 2.4], width: 10, label: '\\dfrac{3}{4}' }),
      bar({ name: 'b', parts: 4, shaded: 3, tones: ['good', 'good', 'adj'], at: [0, 0], width: 10, label: '\\dfrac{2}{3} \\text{ of } \\dfrac{3}{4} = \\dfrac{2}{4} = \\dfrac{1}{2}' }),
      room('lab', [15.5, 0]),
    ],
    300,
  );

const video: Explainer = {
  id: 'm9-3-3-b',
  lessonId: 'm9-3-3',
  title: 'Multiplying and Dividing Rational Numbers, Part 2: Multiplying Fractions',
  thumbnailTitle: 'Multiplying Fractions',
  thumbnail: 'st',
  summary:
    'To multiply fractions, find the sign first, then multiply the numerators and multiply the denominators. Two thirds of three quarters is two quarters, or one half, so −2/3 × 3/4 = −6/12 = −1/2: different signs give a negative product. Dividing out common factors first keeps the numbers small: −4/5 × (−15/8) = 1/1 × 3/2 = 3/2, positive because the signs are the same.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 2', title: 'Multiplying Fractions', subtitle: 'Sign first, then multiply across' }],
      lines: [
        { say: 'What is negative two thirds times three quarters? Multiplying fractions is quicker than adding them: you do not need a common denominator.', show: 'title' },
        { say: 'In this part, you will multiply positive and negative fractions, and simplify before you multiply.' },
      ],
    },
    {
      chapter: 'Two thirds of three quarters',
      layout: 'center',
      main: [strips('st')],
      lines: [
        { say: 'Start with the sizes, without the signs. Two thirds times three quarters means two thirds of three quarters.' },
        { say: 'Here is three quarters of a strip: three of its four equal pieces.', show: ['st.a-frame', 'st.a-shade', 'st.a-label'] },
        { say: 'Split the three quarters into three equal parts. Each part is one quarter.', show: ['st.b-frame', 'st.b-p0', 'st.b-p1', 'st.b-p2'] },
        { say: 'Two thirds of it is two of those three parts: two quarters.', focus: ['st.b-p0', 'st.b-p1'] },
        { say: 'And two quarters is one half. So two thirds of three quarters is one half.', show: 'st.b-label', focus: 'st.b-label' },
      ],
    },
    {
      chapter: 'Multiply across',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Multiplying fractions', md: 'Find the sign first. Then multiply the numerators, and multiply the denominators.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{2 \\times 3}{3 \\times 4} = \\dfrac{6}{12} = \\dfrac{1}{2}', '-\\dfrac{2}{3} \\times \\dfrac{3}{4} = -\\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'There is a quicker way than drawing. To multiply fractions, multiply the numerators, and multiply the denominators.', show: 'key' },
        { say: 'Two times three is six, and three times four is twelve. Six twelfths simplifies to one half, the same as the strip.', show: 'm.0', focus: 'm.0' },
        { say: 'Now put the sign back. Negative two thirds times three quarters has one negative and one positive. The signs are different, so the product is negative: negative one half.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Simplify first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Simplify first', md: 'Divide a numerator and a denominator by a common factor **before** you multiply. The numbers stay small.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['-\\dfrac{2}{\\cancel{3}} \\times \\dfrac{\\cancel{3}}{4} = -\\dfrac{2}{4} = -\\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'You can make the numbers smaller before you multiply. Look for a numerator and a denominator with a common factor, and divide both by it.', show: 'tip' },
        { say: 'Here, there is a three on the bottom of the first fraction and a three on the top of the second. Three divided by three is one, so they cancel out.', show: 'm.0', focus: 'm.0' },
        { say: 'That leaves negative two quarters, which is negative one half. The same answer, with smaller numbers.' },
      ],
    },
    {
      chapter: 'Two negative fractions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $-\\dfrac{4}{5} \\times \\left(-\\dfrac{15}{8}\\right)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Sign: same signs} \\;\\to\\; \\text{positive}', '4 \\text{ and } 8: \\ \\div 4 \\;\\to\\; 1 \\text{ and } 2', '15 \\text{ and } 5: \\ \\div 5 \\;\\to\\; 3 \\text{ and } 1', '\\dfrac{1}{1} \\times \\dfrac{3}{2} = \\dfrac{3}{2} = 1\\tfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Try one more. Find negative four fifths times negative fifteen eighths.', show: 'q' },
        { say: 'Sign first. Both fractions are negative, so the product is positive.', show: 'm.0', focus: 'm.0' },
        { say: 'Now simplify. The four on top and the eight on the bottom share a factor of four. Divide both by four: they become one and two.', show: 'm.1', focus: 'm.1' },
        { say: 'The fifteen on top and the five on the bottom share a factor of five. Divide both by five: they become three and one.', show: 'm.2', focus: 'm.2' },
        { say: 'Now multiply: one times three is three, and one times two is two. The product is three halves, or one and one half.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $-\\dfrac{5}{6} \\times \\left(-\\dfrac{3}{10}\\right)$.',
          choices: ['$-\\dfrac{1}{4}$', '$\\dfrac{25}{9}$', '$\\dfrac{1}{2}$', '$\\dfrac{1}{4}$'],
          answer: 3,
          working: 'Same signs, so the product is positive. $\\dfrac{5 \\times 3}{6 \\times 10} = \\dfrac{15}{60} = \\dfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative five sixths times negative three tenths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one quarter. The signs are the same, so the product is positive. Five times three is fifteen, and six times ten is sixty, so the product is fifteen sixtieths, which is one quarter. Choice A has the right size, but two negative factors give a positive product.', show: 'q.answer' },
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
            'Find the sign first: same signs give a positive product, different signs a negative one.',
            'Multiply the numerators, and multiply the denominators.',
            'Divide out common factors before you multiply, to keep the numbers small.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply fractions, find the sign first.', show: 'sum.0' },
        { say: 'Then multiply the numerators, and multiply the denominators.', show: 'sum.1' },
        { say: 'And divide out common factors before you multiply, to keep the numbers small. In the next part, you will divide fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
