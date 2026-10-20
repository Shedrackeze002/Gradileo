import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';

const sum: DiagramTone[] = ['adj', 'adj', 'adj', 'opp', 'opp', 'opp', 'opp', 'opp'];

// 1/4 as 3/12, then 5/12, then the sum 8/12.
const adding = (id: string) =>
  figure(id, [
    bar({ name: 'q', parts: 4, shaded: 1, tone: 'adj', at: [0, 5.4], width: 8, label: '\\dfrac14' }),
    bar({ name: 'a', parts: 12, shaded: 3, tone: 'adj', at: [0, 3.6], width: 8, label: '\\dfrac{3}{12}' }),
    bar({ name: 'b', parts: 12, shaded: 5, tone: 'opp', at: [0, 1.8], width: 8, label: '\\dfrac{5}{12}' }),
    bar({ name: 's', parts: 12, shaded: 8, tones: sum, at: [0, 0], width: 8, label: '\\dfrac{8}{12}' }),
  ]);

// 8/12 and 2/3 cover the same part of the bar.
const simplest = (id: string) =>
  figure(id, [
    bar({ name: 's', parts: 12, shaded: 8, tones: sum, at: [0, 2.2], width: 10, label: '\\dfrac{8}{12}' }),
    bar({ name: 't', parts: 3, shaded: 2, tone: 'good', at: [0, 0], width: 10, label: '\\dfrac23' }),
  ], 250);

// Six sixteenths is less than five twelfths, one of the fractions being added.
const tooSmall = (id: string) =>
  figure(id, [
    bar({ name: 'w', parts: 16, shaded: 6, tone: 'bad', at: [0, 2.2], width: 10, label: '\\dfrac{6}{16}' }),
    bar({ name: 'b', parts: 12, shaded: 5, tone: 'opp', at: [0, 0], width: 10, label: '\\dfrac{5}{12}' }),
  ], 250);

const video: Explainer = {
  id: 'm6-4-2-b',
  lessonId: 'm6-4-2',
  title: 'Adding and Subtracting Fractions, Part 2: Related Denominators',
  thumbnailTitle: 'Related Denominators',
  thumbnail: 'ad',
  summary:
    'Denominators are related when one is a multiple of the other, like 4 and 12 (4 × 3 = 12). Then the larger denominator is a common denominator: 1/4 + 5/12 = 3/12 + 5/12 = 8/12 = 2/3 in lowest terms, and 5/6 − 1/3 = 5/6 − 2/6 = 1/2. Adding the denominators (6/16) is wrong: the answer would be smaller than 5/12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 2', title: 'Related Denominators', subtitle: 'Quarters and twelfths' }],
      lines: [
        { say: 'One quarter plus five twelfths. The pieces are different sizes, so we cannot add them yet. But quarters and twelfths have something in common.', show: 'title' },
        { say: 'In this part, you will add and subtract fractions whose denominators are related.' },
      ],
    },
    {
      chapter: 'Related denominators',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Related denominators', md: 'Two denominators are **related** when one is a multiple of the other. $4$ and $12$ are related, because $4 \\times 3 = 12$. The number $3$ is the **factor** that relates them.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 3 = 12', '\\text{Multiples of } 4\\colon\\ 4,\\ 8,\\ 12,\\ 16, \\ldots'] },
      ],
      lines: [
        { say: 'A multiple of a number is that number times a whole number. Four, eight, twelve and sixteen are multiples of four.', show: 'm.1', focus: 'm.1' },
        { say: 'Twelve is a multiple of four, because four times three is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'When one denominator is a multiple of the other, we say the denominators are related. Four and twelve are related, and the number three is the factor that relates them.', show: 'def' },
        { say: 'When the denominators are related, the larger one can be the common denominator.' },
      ],
    },
    {
      chapter: 'Quarters and twelfths',
      layout: 'split',
      leftWidth: 560,
      left: [adding('ad')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $\\dfrac{1}{4} + \\dfrac{5}{12}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\times 3 = 12', '\\dfrac{1}{4} = \\dfrac{1 \\times 3}{4 \\times 3} = \\dfrac{3}{12}', '\\dfrac{3}{12} + \\dfrac{5}{12} = \\dfrac{8}{12}'] },
      ],
      lines: [
        { say: 'Let’s find one quarter plus five twelfths.', show: ['t', 'ad.q-frame', 'ad.q-shade', 'ad.q-label', 'ad.b-frame', 'ad.b-shade', 'ad.b-label'] },
        { say: 'The denominators, four and twelve, are related: four times three is twelve. So use twelve as the common denominator.', show: 'm.0', focus: 'm.0' },
        { say: 'Five twelfths already has the denominator twelve. Change one quarter into twelfths. Multiply the top and the bottom by three: one quarter equals three twelfths.', show: ['ad.a-frame', 'ad.a-shade', 'ad.a-label', 'm.1'], focus: ['ad.q-shade', 'ad.a-shade', 'm.1'] },
        { say: 'Now the pieces are the same size. Add the numerators: three plus five is eight. So the sum is eight twelfths.', show: ['ad.s-frame', 'ad.s-shade', 'ad.s-label', 'm.2'], focus: ['ad.s-shade', 'm.2'] },
      ],
    },
    {
      chapter: 'Lowest terms',
      layout: 'center',
      main: [
        simplest('sm'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{8}{12} = \\dfrac{8 \\div 4}{12 \\div 4} = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'Eight twelfths is correct, but we can write it more simply. A fraction is in lowest terms when its numerator and denominator have no common factor except one.', show: ['sm.s-frame', 'sm.s-shade', 'sm.s-label'] },
        { say: 'Eight and twelve share the factor four. Divide the top and the bottom by four: eight twelfths equals two thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Look at the bars. Two thirds covers exactly the same part as eight twelfths. So one quarter plus five twelfths equals two thirds.', show: ['sm.t-frame', 'sm.t-shade', 'sm.t-label'], focus: ['sm.s-shade', 'sm.t-shade'] },
      ],
    },
    {
      chapter: 'Subtracting',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $\\dfrac{5}{6} - \\dfrac{1}{3}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 2 = 6', '\\dfrac{1}{3} = \\dfrac{1 \\times 2}{3 \\times 2} = \\dfrac{2}{6}', '\\dfrac{5}{6} - \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Subtracting works the same way. Find five sixths minus one third.', show: 't' },
        { say: 'Three and six are related: three times two is six. So use six as the common denominator.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the top and the bottom of one third by two. One third equals two sixths.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract the numerators: five minus two is three. That is three sixths. Three and six share the factor three, so three sixths is one half in lowest terms.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the denominators', md: '$\\dfrac{1}{4} + \\dfrac{5}{12}$ is **not** $\\dfrac{6}{16}$. The denominator tells the size of the pieces. Make the pieces the same size, then add only the numerators.' },
        tooSmall('ts'),
      ],
      lines: [
        { say: 'Watch out for this mistake. It is tempting to add the tops and add the bottoms: one plus five is six, and four plus twelve is sixteen. But one quarter plus five twelfths is not six sixteenths!', show: 'oops' },
        { say: 'Look at the bars. Six sixteenths is even less than five twelfths, one of the fractions we started with.', show: ['ts.w-frame', 'ts.w-shade', 'ts.w-label', 'ts.b-frame', 'ts.b-shade', 'ts.b-label'], focus: ['ts.w-shade', 'ts.b-shade'] },
        { say: 'Adding something cannot make the answer smaller! The denominator tells the size of the pieces, so never add the denominators. Make the pieces the same size, then add only the numerators.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{1}{3} + \\dfrac{4}{9}$.',
          choices: ['$\\dfrac{5}{12}$', '$\\dfrac{5}{9}$', '$\\dfrac{7}{9}$', '$\\dfrac{7}{12}$'],
          answer: 2,
          working: '$3 \\times 3 = 9$, so $\\tfrac{1}{3} = \\tfrac{3}{9}$. Then $\\tfrac{3}{9} + \\tfrac{4}{9} = \\tfrac{7}{9}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one third plus four ninths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seven ninths. Three times three is nine, so one third is three ninths. Three ninths plus four ninths is seven ninths. Choice A adds the denominators, which changes the size of the pieces.', show: 'q.answer' },
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
            'Denominators are **related** when one is a multiple of the other: $4 \\times 3 = 12$.',
            'Use the larger denominator. Multiply the other fraction’s top and bottom by the factor that relates them.',
            'Add or subtract the numerators, then write the answer in lowest terms: $\\dfrac{8}{12} = \\dfrac{2}{3}$.',
            'Never add the denominators.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Denominators are related when one is a multiple of the other.', show: 'sum.0' },
        { say: 'Then the larger denominator is a common denominator. Multiply the other fraction’s top and bottom by the factor that relates them.', show: 'sum.1' },
        { say: 'Add or subtract the numerators, and write the answer in lowest terms.', show: 'sum.2' },
        { say: 'And never add the denominators. In the next part, you will add fractions whose denominators are not related. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
