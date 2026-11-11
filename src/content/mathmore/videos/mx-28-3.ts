import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-28-3',
  lessonId: 'mx-28-3',
  title: 'Spearman’s Rank Correlation Coefficient',
  thumbnail: 'm',
  summary: 'Spearman’s coefficient compares two rankings. Rank both sets the same way, find the differences d, and use r_s = 1 − 6Σd²/(n(n² − 1)); for two judges and five dancers with Σd² = 4, r_s = 0.8. It runs from −1 to 1 and suits ranks and monotonic relationships. Reject H₀: ρ_s = 0 when r_s is beyond the critical value.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Regression, Expected Value and Statistical Tests', title: 'Spearman’s Rank Correlation Coefficient', subtitle: 'Do two rankings agree?' }],
      lines: [
        { say: 'Two judges score the same dancers. They may use the scale differently, but do they put the dancers in the same order?', show: 'title' },
        { say: 'In this video, you will learn Spearman’s coefficient, which answers that by comparing the ranks instead of the scores.' },
      ],
    },
    {
      chapter: 'The coefficient',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Spearman’s rank correlation coefficient', md: 'Rank each set, and let $d$ be the difference between the two ranks of each item. With no tied ranks:' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['r_s = 1 - \\dfrac{6\\sum d^2}{n(n^2 - 1)}'] },
      ],
      lines: [
        { say: 'Spearman’s rank correlation coefficient measures how closely two rankings agree. Rank each set of data, and find the difference d between the two ranks of each item.', show: 'def' },
        { say: 'Then use this formula, where n is the number of items. A value of one means the rankings are identical, negative one means one is the reverse of the other, and a value near zero means little association.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Two judges',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Dancer', '1', '2', '3', '4', '5'],
          rows: [
            ['Judge A', '$7$', '$9$', '$4$', '$6$', '$8$'],
            ['Judge B', '$6$', '$8$', '$5$', '$4$', '$9$'],
            ['Rank A', '$3$', '$1$', '$5$', '$4$', '$2$'],
            ['Rank B', '$3$', '$2$', '$4$', '$5$', '$1$'],
            ['$d$', '$0$', '$-1$', '$1$', '$-1$', '$1$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['r_s = 1 - \\dfrac{6 \\times 4}{5(25 - 1)} = 1 - \\dfrac{24}{120} = 0.8'] },
      ],
      lines: [
        { say: 'Here are the scores that two judges gave five dancers.', show: ['tb.0', 'tb.1'] },
        { say: 'Rank each judge’s scores, with one for the largest. For judge A, nine is ranked one, eight is two, and so on.', show: ['tb.2', 'tb.3'] },
        { say: 'The differences are zero, negative one, one, negative one and one. Their squares add up to four.', show: 'tb.4' },
        { say: 'So r s is one minus twenty-four over a hundred and twenty, which is zero point eight. The judges agree quite closely.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Interpreting and testing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Ranking in different directions', md: 'Rank both sets the same way. Mixing the directions flips the sign of $r_s$.' },
        { kind: 'text', id: 'use', md: 'Spearman’s suits ranks, judgements and **monotonic** relationships. The product moment $r$ suits measurements with a **linear** pattern.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['H_0: \\rho_s = 0, \\quad H_1: \\rho_s > 0', 'r_s = 0.69 > 0.643: \\ \\text{reject } H_0'] },
      ],
      lines: [
        { say: 'Rank both sets the same way, with one for the largest in both, or for the smallest in both. Mixing the directions flips the sign.', show: 'oops' },
        { say: 'Spearman’s coefficient only needs the order of the values, so it suits ranks and judgements, and relationships that always rise or always fall without being straight lines. The product moment coefficient measures how close the points are to a straight line.', show: 'use' },
        { say: 'To test for positive association, the null hypothesis says there is no association in the population, and the alternative says it is positive.', show: 'm.0', focus: 'm.0' },
        { say: 'For eight pairs, r s is zero point six nine, and the five percent critical value is zero point six four three. The value is beyond it, so we reject the null hypothesis: there is evidence of positive association.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $6$ items, $\\sum d^2 = 14$. Find $r_s$.',
          choices: ['$0.6$', '$0.4$', '$0.067$', '$0.8$'],
          answer: 0,
          working: '$r_s = 1 - \\dfrac{6 \\times 14}{6(36 - 1)} = 1 - \\dfrac{84}{210} = 0.6$.',
        },
      ],
      lines: [
        { say: 'Your turn. For six items, the sum of d squared is fourteen. Find r s. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six times fourteen is eighty-four, and six times thirty-five is two hundred and ten. One minus eighty-four over two hundred and ten is zero point six. Choice B forgets to take the fraction away from one.', show: 'q.answer' },
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
          items: ['Rank both sets the same way and find $\\sum d^2$.', '$r_s = 1 - \\dfrac{6\\sum d^2}{n(n^2 - 1)}$, from $-1$ to $1$.', 'It suits ranks and monotonic relationships.', 'Reject $H_0: \\rho_s = 0$ beyond the critical value.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rank both sets the same way, and find the sum of the squared differences.', show: 'sum.0' },
        { say: 'Put it into Spearman’s formula. The result runs from negative one to one.', show: 'sum.1' },
        { say: 'It suits ranks and relationships that always rise or always fall.', show: 'sum.2' },
        { say: 'And reject the null hypothesis when r s is beyond the critical value. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
