import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { fitBar, pieces } from './lib/m8-4-figures.ts';

// Three quarters on top, and the same amount below as six eighths, numbered.
const eighths = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'q', parts: 4, shaded: 3, tone: 'adj', at: [0, 2.6], width: 12, label: '\\dfrac34' }),
      fitBar({ total: 0.75, wholes: 1, piece: 0.125, den: 8, height: 1, tones: ['good', 'good'] }),
    ],
    300,
  );

// Two thirds and three quarters, both in twelfths: 8 twelfths and 9 twelfths.
const twelfths = (id: string) =>
  figure(
    id,
    [
      bar({ name: 'a', parts: 12, shaded: 8, tone: 'adj', at: [0, 2.2], width: 12, label: '\\dfrac{2}{3} = \\dfrac{8}{12}' }),
      bar({ name: 'b', parts: 12, shaded: 9, tone: 'opp', at: [0, 0], width: 12, label: '\\dfrac{3}{4} = \\dfrac{9}{12}' }),
    ],
    250,
  );

const video: Explainer = {
  id: 'm8-4-2-b',
  lessonId: 'm8-4-2',
  title: 'Dividing Fractions, Part 2: A Common Denominator',
  thumbnailTitle: 'A Common Denominator',
  thumbnail: 'eg',
  summary:
    'When two fractions have the same denominator, the pieces are the same size, so you only need to divide the numerators. To find 3/4 ÷ 1/8, write 3/4 as 6/8: how many eighths are in 6 eighths? 6 ÷ 1 = 6. To find 2/3 ÷ 3/4, use twelfths: 8/12 ÷ 9/12 = 8 ÷ 9 = 8/9. The divisor is bigger here, so only 8/9 of it fits and the answer is less than 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Fractions · Part 2', title: 'A Common Denominator', subtitle: 'Pieces of the same size' }],
      lines: [
        { say: 'How many eighths fit into three quarters? Quarters and eighths are different sizes, so it is hard to tell. But when two fractions have the same denominator, the question gets much easier.', show: 'title' },
        { say: 'In this part, you will divide fractions by writing them with a common denominator.' },
      ],
    },
    {
      chapter: 'Same-size pieces',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The same denominator', md: 'When two fractions have the same denominator, the pieces are the same size. Then you only need to **divide the numerators**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{6}{8} \\div \\dfrac{2}{8} = 6 \\div 2 = 3'] },
      ],
      lines: [
        { say: 'When two fractions have the same denominator, the pieces are the same size.', show: 'key' },
        { say: 'For example, six eighths divided by two eighths asks: how many groups of two eighths fit into six eighths? That is just like asking how many groups of two fit into six. Three.', show: 'm.0', focus: 'm.0' },
        { say: 'So with the same denominator, you only need to divide the numerators.' },
      ],
    },
    {
      chapter: 'Eighths in three quarters',
      layout: 'center',
      main: [
        eighths('eg'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{4} = \\dfrac{6}{8}', '\\dfrac{3}{4} \\div \\dfrac{1}{8} = \\dfrac{6}{8} \\div \\dfrac{1}{8} = 6 \\div 1 = 6'] },
      ],
      lines: [
        { say: 'Find three quarters divided by one eighth. Here is three quarters: three of the four equal parts.', show: ['eg.q-frame', 'eg.q-shade', 'eg.q-label'] },
        { say: 'Write it with denominator eight. Each quarter is two eighths, so three quarters is six eighths. The bottom strip shows the same amount, cut into eighths.', show: ['eg.frame', 'm.0'], focus: 'm.0' },
        { say: 'Now the question is: how many eighths are in six eighths? Count them: one, two, three, four, five, six.', show: pieces('eg', 6) },
        { say: 'With the same denominator, divide the numerators. Six divided by one is six. So three quarters divided by one eighth is six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'An answer less than one',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Find $\\dfrac{2}{3} \\div \\dfrac{3}{4}$.' },
        twelfths('tw'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{8}{12} \\div \\dfrac{9}{12} = 8 \\div 9 = \\dfrac{8}{9}'] },
      ],
      lines: [
        { say: 'Find two thirds divided by three quarters. The number you divide by is called the divisor. Here the divisor, three quarters, is bigger than two thirds.', show: 'q' },
        { say: 'Use the common denominator twelve. Two thirds is eight twelfths.', show: ['tw.a-frame', 'tw.a-shade', 'tw.a-label'] },
        { say: 'And three quarters is nine twelfths.', show: ['tw.b-frame', 'tw.b-shade', 'tw.b-label'] },
        { say: 'Eight twelfths is a little less than nine twelfths. So a whole three quarters does not fit into two thirds. Only part of it does.', focus: ['tw.a-shade', 'tw.b-shade'] },
        { say: 'Divide the numerators: eight divided by nine. Eight divided by nine is the fraction eight ninths, just as one divided by two is one half.', show: 'm.0', focus: 'm.0' },
        { say: 'So two thirds divided by three quarters is eight ninths. Eight of the nine twelfths fit. When the divisor is bigger, the answer is less than one.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Write both fractions with a **common denominator**.', '**Divide the numerators.**', 'Write the answer in lowest terms, or as a mixed number.'],
        },
      ],
      lines: [
        { say: 'Here are the steps. First, write both fractions with a common denominator.', show: 'b.0' },
        { say: 'Second, divide the numerators.', show: 'b.1' },
        { say: 'And third, write the answer in lowest terms, or as a mixed number if it is more than one.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\dfrac{5}{6} \\div \\dfrac{1}{12}$.',
          choices: ['$\\dfrac{5}{72}$', '$\\dfrac{6}{5}$', '$\\dfrac{1}{10}$', '$10$'],
          answer: 3,
          working: 'In twelfths, $\\tfrac{5}{6} = \\tfrac{10}{12}$. Then $\\tfrac{10}{12} \\div \\tfrac{1}{12} = 10 \\div 1 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find five sixths divided by one twelfth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, ten. In twelfths, five sixths is ten twelfths. Ten twelfths divided by one twelfth is ten divided by one, which is ten. Choice C, one tenth, divides the wrong way round: one twelfth divided by five sixths.', show: 'q.answer' },
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
            'With the same denominator, the pieces are the same size: divide the numerators.',
            '$\\dfrac{3}{4} \\div \\dfrac{1}{8} = \\dfrac{6}{8} \\div \\dfrac{1}{8} = 6$',
            'A bigger divisor gives an answer less than $1$: $\\dfrac{2}{3} \\div \\dfrac{3}{4} = \\dfrac{8}{9}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When fractions have the same denominator, the pieces are the same size, so divide the numerators.', show: 'sum.0' },
        { say: 'Three quarters divided by one eighth is six eighths divided by one eighth, which is six.', show: 'sum.1' },
        { say: 'And when the divisor is bigger, the answer is less than one. In the next part, you will learn a quicker way to divide: multiplying by the reciprocal. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
