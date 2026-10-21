import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

const repeat = (tone: DiagramTone, k: number): DiagramTone[] => Array.from({ length: k }, () => tone);

// 9/12 + 2/12 = 11/12, then take away 4/12 (red): 7/12 are left (green).
const three = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'a', parts: 12, shaded: 11, tones: [...repeat('adj', 9), ...repeat('opp', 2)], at: [0, 2.2], width: 10, label: '\\dfrac{11}{12}' }),
      bar({ name: 'b', parts: 12, shaded: 11, tones: [...repeat('good', 7), ...repeat('bad', 4)], at: [0, 0], width: 10, label: '\\dfrac{7}{12}' }),
    ],
    230,
  );

const video: Explainer = {
  id: 'm7-3-1-d',
  lessonId: 'm7-3-1',
  title: 'Adding and Subtracting Fractions, Part 4: The Lowest Common Denominator',
  thumbnailTitle: 'The Lowest Common Denominator',
  thumbnail: 'th',
  summary:
    'The lowest common denominator is the smallest number both denominators divide into; list multiples until they match. For 5/6 + 3/8 it is 24, not 48: 20/24 + 9/24 = 29/24 = 1 5/24, already in lowest terms. With three fractions, find one denominator for all of them and work left to right: 3/4 + 1/6 − 1/3 = 9/12 + 2/12 − 4/12 = 7/12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Fractions · Part 4', title: 'The Lowest Common Denominator', subtitle: 'Keep the numbers friendly' }],
      lines: [
        { say: 'Multiplying the two denominators always gives a common denominator. But it is not always the best one. A smaller one keeps the numbers friendly.', show: 'title' },
        { say: 'In this part, you will find the lowest common denominator, and use it to add and subtract two or three fractions.' },
      ],
    },
    {
      chapter: 'Listing multiples',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lowest common denominator', md: 'The **lowest common denominator** is the **smallest** number that both denominators divide into. List multiples of each denominator until they match.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Multiples of } 6\\colon\\ 6,\\ 12,\\ 18,\\ \\good{24},\\ 30, \\ldots', '\\text{Multiples of } 8\\colon\\ 8,\\ 16,\\ \\good{24},\\ 32, \\ldots', '6 \\times 8 = 48 \\text{ works as well, but } 24 \\text{ is smaller.}'] },
      ],
      lines: [
        { say: 'The lowest common denominator is the smallest number that both denominators divide into. To find it, list multiples of each denominator until they match.', show: 'def' },
        { say: 'Let’s find it for sixths and eighths. Count by sixes: six, twelve, eighteen, twenty-four, thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Count by eights: eight, sixteen, twenty-four. Twenty-four is in both lists, and it is the first number that is. So the lowest common denominator is twenty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'Six times eight is forty-eight. That is a common denominator as well, but the numbers would be twice as big, and you would have more to simplify at the end.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Sixths and eighths',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\dfrac{5}{6} + \\dfrac{3}{8}$. Write the answer in lowest terms.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{5}{6} = \\dfrac{5 \\times 4}{6 \\times 4} = \\dfrac{20}{24} \\qquad \\dfrac{3}{8} = \\dfrac{3 \\times 3}{8 \\times 3} = \\dfrac{9}{24}',
            '\\dfrac{20}{24} + \\dfrac{9}{24} = \\dfrac{29}{24}',
            '\\dfrac{29}{24} = 1\\dfrac{5}{24}',
          ],
        },
      ],
      lines: [
        { say: 'Now find five sixths plus three eighths, and write the answer in lowest terms. The lowest common denominator is twenty-four.', show: 'q' },
        { say: 'Six times four is twenty-four, so multiply the top of five sixths by four as well. Five sixths is twenty twenty-fourths.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight times three is twenty-four, so multiply the top of three eighths by three. Three eighths is nine twenty-fourths.' },
        { say: 'Add the numerators. Twenty plus nine is twenty-nine. The sum is twenty-nine twenty-fourths.', show: 'm.1', focus: 'm.1' },
        { say: 'Is it in lowest terms? Twenty-nine and twenty-four have no common factor except one. So yes, it is finished.' },
        { say: 'Twenty-four twenty-fourths make one whole, and five are left over. So you can also write the answer as one and five twenty-fourths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Three fractions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\dfrac{3}{4} + \\dfrac{1}{6} - \\dfrac{1}{3}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{3}{4} = \\dfrac{9}{12} \\qquad \\dfrac{1}{6} = \\dfrac{2}{12} \\qquad \\dfrac{1}{3} = \\dfrac{4}{12}', '\\dfrac{9}{12} + \\dfrac{2}{12} - \\dfrac{4}{12} = \\dfrac{9 + 2 - 4}{12} = \\dfrac{7}{12}'] },
        three('th'),
      ],
      lines: [
        { say: 'You can use the same idea with three fractions. Find three quarters plus one sixth minus one third.', show: 'q' },
        { say: 'We need one denominator that four, six and three all divide into. Count by sixes: six, twelve. Four divides into twelve, and three does as well. So use twelve.' },
        { say: 'Three quarters is nine twelfths. One sixth is two twelfths. And one third is four twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'Work from left to right. Nine twelfths plus two twelfths is eleven twelfths.', show: ['th.a-frame', 'th.a-shade', 'th.a-label'], focus: 'th.a-shade' },
        { say: 'Then take away four twelfths, the red parts. Seven twelfths are left. So the answer is seven twelfths.', show: ['m.1', 'th.b-frame', 'th.b-shade', 'th.b-label'], focus: ['m.1', 'th.b-shade'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{1}{4} + \\dfrac{5}{6}$. Write the answer in lowest terms.',
          choices: ['$\\dfrac{6}{10}$', '$\\dfrac{13}{12}$', '$\\dfrac{6}{12}$', '$\\dfrac{26}{24}$'],
          answer: 1,
          working: 'The lowest common denominator is $12$: $\\dfrac{1}{4} = \\dfrac{3}{12}$ and $\\dfrac{5}{6} = \\dfrac{10}{12}$, so the sum is $\\dfrac{13}{12}$, or $1\\dfrac{1}{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one quarter plus five sixths, and write the answer in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirteen twelfths. The lowest common denominator is twelve. One quarter is three twelfths, and five sixths is ten twelfths, so the sum is thirteen twelfths, or one and one twelfth. Choice D has the right value, but two divides both twenty-six and twenty-four, so it is not in lowest terms.', show: 'q.answer' },
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
            'The **lowest common denominator** is the smallest number both denominators divide into.',
            'List multiples of each denominator until they match.',
            '$\\dfrac{5}{6} + \\dfrac{3}{8} = \\dfrac{20}{24} + \\dfrac{9}{24} = \\dfrac{29}{24} = 1\\dfrac{5}{24}$',
            'With three fractions, use one denominator for all of them, and work left to right.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The lowest common denominator is the smallest number that both denominators divide into.', show: 'sum.0' },
        { say: 'To find it, list multiples of each denominator until they match.', show: 'sum.1' },
        { say: 'Then rewrite the fractions, add or subtract the numerators, and check that the answer is in lowest terms.', show: 'sum.2' },
        { say: 'With three fractions, use one denominator for all of them, and work from left to right. Next, you will add and subtract mixed numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
