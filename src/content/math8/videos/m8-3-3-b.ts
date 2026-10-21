import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from '@/content/math6/videos/lib/m6-5-figures.ts';

// 6/9 = 2/3 = 8/12: down to lowest terms (÷3), then up to twelfths (×4).
const lowest = (id: string) =>
  figure(
    id,
    [
      ratioTable({
        rows: ['\\text{Numerator}', '\\text{Denominator}'],
        cols: [
          ['6', '9'],
          ['2', '3'],
          ['8', '12'],
        ],
        titleWidth: 4.8,
        colWidth: 2,
        arrows: [
          { id: 'd3', from: 0, to: 1, label: '\\div 3', tone: 'adj' },
          { id: 'x4', from: 1, to: 2, label: '\\times 4' },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-3-3-b',
  lessonId: 'm8-3-3',
  title: 'Proportional Reasoning, Part 2: No Whole-Number Multiplier',
  thumbnailTitle: 'No Whole-Number Multiplier',
  thumbnail: 'lw',
  summary:
    'When no whole number takes one term of a proportion to the other, there are two ways to solve it. Write a ratio in lowest terms first: 6/9 = 2/3, and 3 × 4 = 12, so in 6/9 = x/12, x = 2 × 4 = 8. Or multiply both sides by the denominator under x: in 5/4 = x/7, x = 7 × 5/4 = 35/4 = 8.75. Check by dividing each ratio: 8.75 ÷ 7 = 1.25 and 5 ÷ 4 = 1.25.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 2', title: 'No Whole-Number Multiplier', subtitle: 'Two more ways to solve a proportion' }],
      lines: [
        { say: 'In three over four equals x over twenty, four times five is twenty, so the answer came quickly. But what if no whole number takes one term to the other?', show: 'title' },
        { say: 'In this part, you will learn two more ways to solve a proportion: writing a ratio in lowest terms first, and multiplying both sides.' },
      ],
    },
    {
      chapter: 'Lowest terms first',
      layout: 'split',
      leftWidth: 600,
      left: [lowest('lw')],
      right: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Solve $\\dfrac{6}{9} = \\dfrac{x}{12}$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{6}{9} = \\dfrac{6 \\div 3}{9 \\div 3} = \\dfrac{2}{3}', '3 \\times 4 = 12', 'x = 2 \\times 4 = 8'] },
      ],
      lines: [
        { say: 'Solve six over nine equals x over twelve.', show: ['q', 'lw.frame', 'lw.c0'] },
        { say: 'Is there a whole number that takes nine to twelve? Nine times one is nine, and nine times two is eighteen. Twelve is in between, so no whole number works.' },
        { say: 'So write six ninths in lowest terms first. Three divides both six and nine. Six divided by three is two, and nine divided by three is three. Six ninths equals two thirds.', show: ['lw.d3', 'lw.c1', 'm.0'], focus: ['lw.d3', 'm.0'] },
        { say: 'Now three times four is twelve. That works!', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply the numerator by four as well. Two times four is eight. So x equals eight.', show: ['lw.x4', 'lw.c2', 'm.2'], focus: ['lw.x4', 'm.2'] },
      ],
    },
    {
      chapter: 'Multiply both sides',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'Solve $\\dfrac{5}{4} = \\dfrac{x}{7}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 \\times \\dfrac{5}{4} = 7 \\times \\dfrac{x}{7}', 'x = \\dfrac{7 \\times 5}{4} = \\dfrac{35}{4}', 'x = 35 \\div 4 = 8.75'] },
      ],
      lines: [
        { say: 'Here is a harder one. Solve five over four equals x over seven.', show: 'q' },
        { say: 'No whole number takes four to seven, and five quarters is already in lowest terms. So use the second way: multiply both sides.' },
        { say: 'x over seven means x divided by seven. To get x by itself, undo the dividing: multiply both sides by seven. Both sides are equal, so after multiplying by the same number, they are still equal.', show: 'm.0', focus: 'm.0' },
        { say: 'On the right, seven times x over seven is just x. On the left, seven times five quarters is thirty-five quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'Thirty-five divided by four is eight point seven five. So x equals eight point seven five. An answer does not have to be a whole number.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check your answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['8.75 \\div 7 = 1.25', '5 \\div 4 = 1.25'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your answer', md: 'Divide each ratio. If the two answers are equal, the ratios are equal, so the proportion is true.' },
      ],
      lines: [
        { say: 'Check your answer by dividing each ratio. Put eight point seven five back in place of x. Eight point seven five divided by seven is one point two five.', show: 'm.0', focus: 'm.0' },
        { say: 'And five divided by four is one point two five as well. The two ratios are equal, so x equals eight point seven five is right.', show: 'm.1', focus: 'm.1' },
        { say: 'Dividing each ratio is a good check for any proportion. For the first one, six divided by nine and eight divided by twelve both give zero point six six six, and so on.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{9}{6} = \\dfrac{x}{10}$.',
          choices: ['$13$', '$15$', '$6\\tfrac{2}{3}$', '$90$'],
          answer: 1,
          working: 'In lowest terms, $\\tfrac{9}{6} = \\tfrac{3}{2}$. Since $2 \\times 5 = 10$, $x = 3 \\times 5 = 15$. Or multiply both sides by $10$: $x = 10 \\times \\tfrac{9}{6} = \\tfrac{90}{6} = 15$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve nine over six equals x over ten. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, fifteen. In lowest terms, nine sixths is three halves. Two times five is ten, so x is three times five, which is fifteen. Choice A, thirteen, adds four to the top because four was added to the bottom, but equal ratios come from multiplying, not adding.', show: 'q.answer' },
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
            'Write a ratio in lowest terms first: $\\dfrac{6}{9} = \\dfrac{2}{3} = \\dfrac{8}{12}$.',
            'Or multiply both sides: $\\dfrac{5}{4} = \\dfrac{x}{7}$ gives $x = 7 \\times \\dfrac{5}{4} = 8.75$.',
            'Check by dividing each ratio: $8.75 \\div 7 = 5 \\div 4 = 1.25$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When no whole number takes one term to the other, try writing a ratio in lowest terms first.', show: 'sum.0' },
        { say: 'Or multiply both sides by the number under x.', show: 'sum.1' },
        { say: 'And check your answer by dividing each ratio. In the next part, you will solve problems with the unit-rate method. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
