import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, fractionLine } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { caption } from '@/content/math5/videos/lib/m5-6-figures.ts';

const repeat = (tone: DiagramTone, k: number): DiagramTone[] => Array.from({ length: k }, () => tone);

// The walk on a line from 0 to 2 km in twentieths: 3/4 km to the park, then 2/5 km to the library.
const walk = (id: string) =>
  figure(id, [
    fractionLine({
      min: 0,
      max: 2,
      den: 20,
      length: 12,
      hops: [
        { id: 'h1', from: 0, to: 15, label: '\\tfrac34 \\text{ km}' },
        { id: 'h2', from: 15, to: 23, tone: 'opp', label: '\\tfrac25 \\text{ km}' },
      ],
      points: [
        { id: 'park', at: 15, tex: '\\text{park}', below: true },
        { id: 'lib', at: 23, tex: '\\text{library}', tone: 'opp', below: true },
      ],
    }),
  ], 230);

// The garden in twelfths: tomatoes 4/12, peas 3/12 and flowers 5/12.
const garden = (id: string) =>
  figure(id, [
    bar({ name: 'g', parts: 12, shaded: 12, tones: [...repeat('bad', 4), ...repeat('good', 3), ...repeat('theta', 5)], width: 12, height: 2 }),
    caption({ id: 'tom', at: [2, -0.25], tex: '\\tfrac13 \\text{ tomatoes}', tone: 'bad', place: 'below' }),
    caption({ id: 'pea', at: [5.5, -0.25], tex: '\\tfrac14 \\text{ peas}', tone: 'good', place: 'below' }),
    caption({ id: 'flo', at: [9.5, -0.25], tex: '\\tfrac{5}{12} \\text{ flowers}', tone: 'theta', place: 'below' }),
  ], 220);

const video: Explainer = {
  id: 'm6-4-2-d',
  lessonId: 'm6-4-2',
  title: 'Adding and Subtracting Fractions, Part 4: Solving Fraction Problems',
  thumbnailTitle: 'Solving Fraction Problems',
  thumbnail: 'gd',
  summary:
    'Deciding whether to add (in all, altogether) or subtract (how much more, how much is left). Walking 3/4 km and then 2/5 km is 15/20 + 8/20 = 23/20 = 1 3/20 km in all; a garden with 1/3 tomatoes and 1/4 peas leaves 12/12 − 7/12 = 5/12 for flowers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 4', title: 'Solving Fraction Problems', subtitle: 'Add or subtract?' }],
      lines: [
        { say: 'Fractions are everywhere: in distances, recipes and gardens. To solve a problem, you first need to decide what to do.', show: 'title' },
        { say: 'In this part, you will decide whether to add or subtract, then solve problems with fractions.' },
      ],
    },
    {
      chapter: 'Add or subtract?',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Add** when you put amounts together: “in all”, “altogether”, “total”.', '**Subtract** when you compare or take away: “how much more”, “how much is left”, “the rest”.', 'Then find a common denominator, and finish in lowest terms.'],
        },
      ],
      lines: [
        { say: 'Read the problem carefully. Add when you put amounts together. Words like in all, altogether and total tell you to add.', show: 'b.0' },
        { say: 'Subtract when you compare two amounts or take one away. Words like how much more, how much is left and the rest tell you to subtract.', show: 'b.1' },
        { say: 'Then work as before: find a common denominator, add or subtract the numerators, and finish in lowest terms.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Walking to the library',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Kiona walked $\\dfrac{3}{4}$ km to the park. Then Kiona walked $\\dfrac{2}{5}$ km to the library. How far did Kiona walk in all?' },
        walk('wk'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac34 + \\dfrac25 = \\dfrac{15}{20} + \\dfrac{8}{20} = \\dfrac{23}{20}', '\\dfrac{23}{20} = 1\\dfrac{3}{20} \\text{ km}'] },
      ],
      lines: [
        { say: 'Kiona walked three quarters of a kilometre to the park. Then Kiona walked two fifths of a kilometre to the library. How far did Kiona walk in all?', show: 't' },
        { say: 'In all means add. Here is the walk on a number line from zero to two kilometres. First, three quarters of a kilometre to the park.', show: ['wk.axis', 'wk.h1', 'wk.park'] },
        { say: 'Then two fifths of a kilometre more, to the library.', show: ['wk.h2', 'wk.lib'] },
        { say: 'Four and five are not related, so the common denominator is four times five, which is twenty. The number line is cut into twentieths.' },
        { say: 'Three quarters is fifteen twentieths, and two fifths is eight twentieths. Fifteen plus eight is twenty-three, so that is twenty-three twentieths.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-three divided by twenty is one, remainder three. So Kiona walked one and three twentieths of a kilometre in all. On the number line, the library is just past the one.', show: 'm.1', focus: ['m.1', 'wk.lib'] },
      ],
    },
    {
      chapter: 'The rest of the garden',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'In a school garden, tomatoes fill $\\dfrac{1}{3}$ of the garden and peas fill $\\dfrac{1}{4}$. The rest is for flowers. What fraction is for flowers?' },
        garden('gd'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac13 + \\dfrac14 = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}', '1 - \\dfrac{7}{12} = \\dfrac{12}{12} - \\dfrac{7}{12} = \\dfrac{5}{12}'] },
      ],
      lines: [
        { say: 'In a school garden, tomatoes fill one third of the garden, and peas fill one quarter. The rest is for flowers. What fraction is for flowers?', show: ['t', 'gd.g-frame'] },
        { say: 'The rest means subtract. But first, add the parts you know. The common denominator is three times four, which is twelve.' },
        { say: 'One third is four twelfths, and one quarter is three twelfths. Together they fill seven twelfths of the garden.', show: ['gd.g-p0', 'gd.g-p1', 'gd.g-p2', 'gd.g-p3', 'gd.tom', 'gd.g-p4', 'gd.g-p5', 'gd.g-p6', 'gd.pea', 'm.0'], focus: 'm.0' },
        { say: 'The whole garden is one, which is twelve twelfths. Twelve twelfths minus seven twelfths is five twelfths.', show: 'm.1', focus: 'm.1' },
        { say: 'So five twelfths of the garden is for flowers.', show: ['gd.g-p7', 'gd.g-p8', 'gd.g-p9', 'gd.g-p10', 'gd.g-p11', 'gd.flo'], focus: ['gd.g-p7', 'gd.g-p8', 'gd.g-p9', 'gd.g-p10', 'gd.g-p11'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ribbon is $\\dfrac{5}{6}$ m long. Sam cuts off $\\dfrac{1}{4}$ m. How much ribbon is left?',
          choices: ['$1\\dfrac{1}{12}$ m', '$\\dfrac{4}{6}$ m', '$\\dfrac{1}{2}$ m', '$\\dfrac{7}{12}$ m'],
          answer: 3,
          working: '“Left” means subtract. $\\tfrac{5}{6} = \\tfrac{10}{12}$ and $\\tfrac{1}{4} = \\tfrac{3}{12}$, so $\\tfrac{10}{12} - \\tfrac{3}{12} = \\tfrac{7}{12}$ m. (With $24$ as the common denominator, $\\tfrac{14}{24} = \\tfrac{7}{12}$.)',
        },
      ],
      lines: [
        { say: 'Your turn. A ribbon is five sixths of a metre long. Sam cuts off one quarter of a metre. How much ribbon is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, seven twelfths of a metre. Left means subtract. Five sixths is ten twelfths, and one quarter is three twelfths. Ten twelfths minus three twelfths is seven twelfths. Choice A adds instead of subtracting.', show: 'q.answer' },
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
            'Add to put amounts together (“in all”); subtract to compare or take away (“how much is left”, “the rest”).',
            'Find a common denominator, then add or subtract the numerators.',
            'The whole is $1$, written with the same denominator: $1 = \\dfrac{12}{12}$.',
            'Give answers in lowest terms, and as a mixed number when asked.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Add to put amounts together, and subtract to compare or to find what is left.', show: 'sum.0' },
        { say: 'Find a common denominator, then add or subtract the numerators.', show: 'sum.1' },
        { say: 'When you need the rest of something, write the whole as one, with the same denominator.', show: 'sum.2' },
        { say: 'And give your answer in lowest terms, or as a mixed number when you are asked. In the next lesson, you will multiply fractions by counting numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
