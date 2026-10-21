import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

const repeat = (tone: DiagramTone, k: number): DiagramTone[] => Array.from({ length: k }, () => tone);

// 2/3 and 1/4, each cut again into twelfths: 8/12 and 3/12.
const twelfths = (id: string) =>
  figure(id, [
    bar({ name: 'h', parts: 3, shaded: 2, tone: 'adj', at: [0, 5.4], width: 8, label: '\\dfrac23' }),
    bar({ name: 'h12', parts: 12, shaded: 8, tone: 'adj', at: [0, 3.6], width: 8, label: '\\dfrac{8}{12}' }),
    bar({ name: 'q', parts: 4, shaded: 1, tone: 'opp', at: [0, 1.8], width: 8, label: '\\dfrac14' }),
    bar({ name: 'q12', parts: 12, shaded: 3, tone: 'opp', at: [0, 0], width: 8, label: '\\dfrac{3}{12}' }),
  ]);

// The sum: 8 twelfths and 3 more twelfths make 11 twelfths.
const sumBar = (id: string) => figure(id, [bar({ name: 's', parts: 12, shaded: 11, tones: [...repeat('adj', 8), ...repeat('opp', 3)], width: 10, label: '\\dfrac{11}{12}' })], 170);

// Eight tenths, take away five tenths (red): three tenths are left (green).
const tenths = (id: string) => figure(id, [bar({ name: 't', parts: 10, shaded: 8, tones: [...repeat('bad', 5), ...repeat('good', 3)], width: 10 })], 160);

// 9/12 + 8/12 = 17/12: one whole bar of twelfths, and 5 twelfths more.
const overOne = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 12, shaded: 12, tones: [...repeat('adj', 9), ...repeat('opp', 3)], at: [0, 2.1], width: 10, label: '1' }),
    bar({ name: 'b', parts: 12, shaded: 5, tone: 'opp', at: [0, 0], width: 10, label: '\\dfrac{5}{12}' }),
  ], 240);

const video: Explainer = {
  id: 'm6-4-2-c',
  lessonId: 'm6-4-2',
  title: 'Adding and Subtracting Fractions, Part 3: Denominators That Are Not Related',
  thumbnailTitle: 'Denominators That Are Not Related',
  thumbnail: 'tw',
  summary:
    'When neither denominator is a multiple of the other, their product is a common denominator: 2/3 + 1/4 = 8/12 + 3/12 = 11/12, 4/5 − 1/2 = 8/10 − 5/10 = 3/10, and 3/4 + 2/3 = 9/12 + 8/12 = 17/12 = 1 5/12. Always finish in lowest terms: 1/4 + 1/6 = 10/24 = 5/12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 3', title: 'Denominators That Are Not Related', subtitle: 'Multiply the denominators' }],
      lines: [
        { say: 'Thirds and quarters. Three is not a multiple of four, and four is not a multiple of three. So how do we find a common denominator?', show: 'title' },
        { say: 'In this part, you will add and subtract fractions whose denominators are not related.' },
      ],
    },
    {
      chapter: 'Multiply the denominators',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Denominators that are not related', md: 'When neither denominator is a multiple of the other, the **product** of the denominators is always a common denominator: $3 \\times 4 = 12$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Multiples of } 3\\colon\\ 3,\\ 6,\\ 9,\\ \\good{12},\\ 15, \\ldots', '\\text{Multiples of } 4\\colon\\ 4,\\ 8,\\ \\good{12},\\ 16, \\ldots'] },
      ],
      lines: [
        { say: 'Three and four are not related. Neither one is a multiple of the other.', show: 'key' },
        { say: 'But we need a number that both thirds and quarters can be cut into. Count in steps of three: three, six, nine, twelve. Count in steps of four: four, eight, twelve. Twelve is in both lists!', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'And twelve is three times four. Multiplying the denominators always gives a common denominator.' },
      ],
    },
    {
      chapter: 'Thirds and quarters',
      layout: 'split',
      leftWidth: 560,
      left: [twelfths('tw')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $\\dfrac{2}{3} + \\dfrac{1}{4}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\times 4 = 12', '\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12}', '\\dfrac{1}{4} = \\dfrac{1 \\times 3}{4 \\times 3} = \\dfrac{3}{12}'] },
      ],
      lines: [
        { say: 'Let’s find two thirds plus one quarter.', show: ['t', 'tw.h-frame', 'tw.h-shade', 'tw.h-label', 'tw.q-frame', 'tw.q-shade', 'tw.q-label'] },
        { say: 'Multiply the denominators: three times four is twelve. Use twelve as the common denominator.', show: 'm.0', focus: 'm.0' },
        { say: 'Change two thirds into twelfths. Three times four is twelve, so multiply the top by four as well. Two thirds is eight twelfths.', show: ['tw.h12-frame', 'tw.h12-shade', 'tw.h12-label', 'm.1'], focus: ['tw.h-shade', 'tw.h12-shade', 'm.1'] },
        { say: 'Change one quarter into twelfths. Four times three is twelve, so multiply the top by three. One quarter is three twelfths.', show: ['tw.q12-frame', 'tw.q12-shade', 'tw.q12-label', 'm.2'], focus: ['tw.q-shade', 'tw.q12-shade', 'm.2'] },
      ],
    },
    {
      chapter: 'Add the twelfths',
      layout: 'center',
      main: [sumBar('sb'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}'] }],
      lines: [
        { say: 'Now all the pieces are twelfths. Eight twelfths, in blue, and three more twelfths, in orange.', show: ['sb.s-frame', 'sb.s-shade'] },
        { say: 'Add the numerators: eight plus three is eleven. So two thirds plus one quarter equals eleven twelfths.', show: ['sb.s-label', 'm.0'], focus: 'm.0' },
        { say: 'Eleven and twelve have no common factor except one, so eleven twelfths is already in lowest terms.' },
      ],
    },
    {
      chapter: 'Subtracting',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $\\dfrac{4}{5} - \\dfrac{1}{2}$.' },
        tenths('tn'),
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 2 = 10 \\qquad \\dfrac{4}{5} = \\dfrac{8}{10} \\qquad \\dfrac{1}{2} = \\dfrac{5}{10}', '\\dfrac{8}{10} - \\dfrac{5}{10} = \\dfrac{3}{10}'] },
      ],
      lines: [
        { say: 'Subtracting works the same way. Find four fifths minus one half.', show: 't' },
        { say: 'Five and two are not related, so multiply them: five times two is ten.' },
        { say: 'Four fifths is eight tenths, multiplying the top and bottom by two. One half is five tenths, multiplying the top and bottom by five.', show: 'm.0', focus: 'm.0' },
        { say: 'Start with eight tenths. Take away five tenths, the red pieces. Three tenths are left, the green pieces. So four fifths minus one half is three tenths.', show: ['tn.t-frame', 'tn.t-shade', 'm.1'], focus: ['tn.t-p5', 'tn.t-p6', 'tn.t-p7', 'm.1'] },
      ],
    },
    {
      chapter: 'A sum bigger than 1',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $\\dfrac{3}{4} + \\dfrac{2}{3}$. Write the answer as a mixed number.' },
        overOne('ov'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{9}{12} + \\dfrac{8}{12} = \\dfrac{17}{12}', '17 \\div 12 = 1 \\text{ R } 5 \\;\\to\\; \\dfrac{17}{12} = 1\\dfrac{5}{12}'] },
      ],
      lines: [
        { say: 'Sometimes the sum is more than one whole. Find three quarters plus two thirds, and write the answer as a mixed number.', show: 't' },
        { say: 'The common denominator is four times three, which is twelve. Three quarters is nine twelfths, and two thirds is eight twelfths.' },
        { say: 'Nine twelfths plus eight twelfths is seventeen twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve twelfths fill one whole bar, and five twelfths are left over. Seventeen divided by twelve is one, remainder five. So the sum is one and five twelfths.', show: ['ov.a-frame', 'ov.a-shade', 'ov.a-label', 'ov.b-frame', 'ov.b-shade', 'ov.b-label', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finish the job',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Finish the job', md: 'Always check if your answer is in **lowest terms**. If the numerator and denominator share a factor, divide both by it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac14 + \\dfrac16 = \\dfrac{6}{24} + \\dfrac{4}{24} = \\dfrac{10}{24}', '\\dfrac{10}{24} = \\dfrac{10 \\div 2}{24 \\div 2} = \\dfrac{5}{12}'] },
      ],
      lines: [
        { say: 'Here is a tip. Always check if your answer is in lowest terms.', show: 'tip' },
        { say: 'Find one quarter plus one sixth. Multiply the denominators: four times six is twenty-four. One quarter is six twenty-fourths, and one sixth is four twenty-fourths. The sum is ten twenty-fourths.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten and twenty-four share the factor two. Divide both by two: ten twenty-fourths is five twelfths. The product of the denominators always works, but you may need to simplify at the end.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{2}{5} + \\dfrac{1}{3}$.',
          choices: ['$\\dfrac{3}{8}$', '$\\dfrac{11}{15}$', '$\\dfrac{3}{15}$', '$\\dfrac{7}{15}$'],
          answer: 1,
          working: '$5 \\times 3 = 15$. $\\tfrac{2}{5} = \\tfrac{6}{15}$ and $\\tfrac{1}{3} = \\tfrac{5}{15}$, so the sum is $\\tfrac{11}{15}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find two fifths plus one third. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eleven fifteenths. Five times three is fifteen. Two fifths is six fifteenths, and one third is five fifteenths. Six plus five is eleven. Choice A adds the numerators and the denominators, which does not work.', show: 'q.answer' },
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
            'When the denominators are not related, multiply them to get a common denominator.',
            'Change each fraction, then add or subtract the numerators: $\\dfrac23 + \\dfrac14 = \\dfrac{11}{12}$.',
            'Write a sum bigger than $1$ as a mixed number when asked: $\\dfrac{17}{12} = 1\\dfrac{5}{12}$.',
            'Finish in lowest terms.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the denominators are not related, multiply them to get a common denominator.', show: 'sum.0' },
        { say: 'Change each fraction into an equivalent fraction, then add or subtract the numerators.', show: 'sum.1' },
        { say: 'Write a sum bigger than one as a mixed number when you are asked to.', show: 'sum.2' },
        { say: 'And always finish in lowest terms. In the next part, you will use all of this to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
