import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundred } from '@/content/math6/videos/lib/m6-12-figures.ts';

// Exam question for Math 7 lesson 2.4 (percents, fractions and decimals). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 6.1, Understand Percent, CC BY-NC-SA 4.0).
// 30% = 30/100 = 3/10 (divide top and bottom by 10), and 30/100 = 0.30 = 0.3.

const QUESTION = 'Convert the percent to: (a) a fraction, and (b) a decimal. The probability that it will rain Monday is 30%.';

const grid = (id: string) => figure(id, [hundred({ shaded: 30, tone: 'adj' })], 300);

const video: Explainer = {
  id: 'xq-m7-2-4',
  lessonId: '',
  exam: {
    lesson: 'm7-2-4',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.1, Understand Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent',
    question: QUESTION,
  },
  title: 'Exam Question: A 30% Chance of Rain as a Fraction and a Decimal (Percents, Fractions and Decimals)',
  thumbnailTitle: '30% as a Fraction and a Decimal',
  thumbnail: 'hg',
  summary:
    'A real test question, solved one small step at a time: the probability of rain on Monday is 30%. Write 30% as (a) a fraction and (b) a decimal. Percent means out of 100, so 30% = 30/100, which simplifies to 3/10. And 30 hundredths is 0.30, or 0.3. Then we check on a hundred grid and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '30% as a Fraction and a Decimal', subtitle: 'Percents, fractions and decimals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about percents, fractions and decimals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Convert the percent to: (a) a fraction, and (b) a decimal. The probability that it will rain Monday is $30\\%$.',
          answer: '(a) $\\dfrac{3}{10}$ (b) $0.3$',
          working: '30% = 30/100 = 3/10 = 0.3',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Convert the percent to: part a, a fraction, and part b, a decimal. The probability that it will rain Monday is 30 percent.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Percent', md: '**Percent** means **out of $100$**. A $30\\%$ chance of rain means rain is expected on about $30$ days **out of every $100$** days like Monday. We write the **same amount** two other ways.' }],
      lines: [
        { say: 'Percent means out of 100. A 30 percent chance of rain means rain on about 30 out of every 100 days like this one.', show: 'c' },
        { say: 'We must write the same amount two other ways: as a fraction, and as a decimal.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['p\\% = \\dfrac{p}{100}', '\\dfrac{p}{100}: \\text{ move the point } 2 \\text{ places left}'] }],
      lines: [
        { say: 'Here is what we need. A percent is a number over 100. Then simplify the fraction if you can.', show: 'm.0' },
        { say: 'And dividing by 100 moves the decimal point 2 places to the left.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Write $30$ **over $100$** and simplify', '(b) Divide $30$ by $100$', 'Check on a **hundred grid**'] }],
      lines: [
        { say: 'Here is the plan. For part a, write 30 over 100, and simplify.', show: 'plan.0' },
        { say: 'For part b, divide 30 by 100.', show: 'plan.1' },
        { say: 'Then check on a hundred grid.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Fraction, then decimal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } 30\\% = \\dfrac{30}{100} = \\dfrac{30 \\div 10}{100 \\div 10} = \\good{\\dfrac{3}{10}}', '\\text{(b) } 30\\% = \\dfrac{30}{100} = 0.30 = \\good{0.3}'] }],
      lines: [
        { say: 'Step one. 30 percent is 30 over 100. Both numbers can be divided by 10. 30 divided by 10 is 3, and 100 divided by 10 is 10. So 30 percent is 3 tenths.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 30 over 100 is 30 hundredths. Move the decimal point in 30 two places to the left: 0.30. The zero at the end can go, so it is 0.3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 420,
      left: [grid('hg')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['30 \\text{ of } 100 \\text{ squares}', '= 3 \\text{ of } 10 \\text{ rows} \\ \\checkmark', '3 \\text{ tenths} = 0.3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a hundred grid. Shade 30 of the 100 squares: 30 percent.', show: ['hg.grid', 'hg.shade', 'm.0'] },
        { say: 'The shaded part is 3 full rows out of 10 rows. That is 3 tenths.', show: 'm.1', focus: 'm.1' },
        { say: 'And 3 tenths written as a decimal is 0.3. It checks out.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['(a) $\\dfrac{30}{10}$', 'a percent is out of **$100$**, not $10$'],
            ['(b) $3.0$', 'moved the point the wrong way: move it **left** two places'],
            ['(b) $0.03$', 'that is $3\\%$: $30\\%$ is $30$ hundredths'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '30 over 10 is 3 whole ones, which is 300 percent. A percent is out of 100.' },
        { say: '3.0 moves the decimal point the wrong way. Dividing by 100 moves it 2 places left.' },
        { say: 'And 0.03 is only 3 hundredths, which is 3 percent. 30 percent is 30 hundredths, 0.30.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A store has $75\\%$ off. Which fraction and decimal are equal to $75\\%$?',
          choices: ['$\\dfrac{7}{5}$ and $7.5$', '$\\dfrac{3}{4}$ and $0.75$', '$\\dfrac{3}{4}$ and $0.075$', '$\\dfrac{75}{10}$ and $0.75$'],
          answer: 1,
          working: '75% = 75/100 = 3/4 (divide both by 25), and 75/100 = 0.75.',
        },
      ],
      lines: [
        { say: 'Your turn. A store has 75 percent off. Which fraction and decimal are equal to 75 percent? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '75 percent is 75 over 100. Divide both by 25 to get 3 quarters. And 75 hundredths is 0.75. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent means **out of $100$**', 'Fraction: write **over $100$**, then **simplify**', 'Decimal: move the point **2 places left**', 'Check on a **hundred grid**'] }],
      lines: [
        { say: 'Here is what to remember. Percent means out of 100.', show: 'sum.0' },
        { say: 'To make a fraction, write the percent over 100, then simplify.', show: 'sum.1' },
        { say: 'To make a decimal, move the decimal point 2 places to the left.', show: 'sum.2' },
        { say: 'And a hundred grid shows all three at once. For more on percents, fractions and decimals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
