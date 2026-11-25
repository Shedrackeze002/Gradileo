import type { Explainer } from '@/video/script.ts';

// Exam question for Math 5 lesson 6.2 (ratios, fractions, decimals and percentages). The question
// is an Exercise from OpenStax Prealgebra 2e, word for word with its instruction (section 6.1,
// Understand Percent, CC BY-NC-SA 4.0). 60% = 60/100 = 3/5 (dividing top and bottom by 20), and
// 60/100 = 0.60 = 0.6, as in the book's answer. Check: 3 ÷ 5 = 0.6.

const QUESTION =
  'Convert each percent to (a) a simplified fraction and (b) a decimal. According to the local weather report, the probability of thunderstorms in New York City on July 15 is 60%.';

const video: Explainer = {
  id: 'xq-m5-6-2',
  lessonId: '',
  exam: {
    lesson: 'm5-6-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.1, Understand Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent',
    question: QUESTION,
  },
  title: 'Exam Question: A 60% Chance of Thunderstorms (Fractions, Decimals and Percents)',
  thumbnailTitle: 'What Does 60% Mean?',
  summary:
    'A real test question, solved one small step at a time: the chance of thunderstorms is 60%. Write it as a simplified fraction and as a decimal. Percent means out of 100, so 60% is 60/100, which simplifies to 3/5. And 60 hundredths is 0.60, or 0.6. Then we check that 3 ÷ 5 = 0.6 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does 60% Mean?', subtitle: 'Fractions, decimals and percents, step by step' }],
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
          prompt: 'Convert each percent to (a) a simplified fraction and (b) a decimal. According to the local weather report, the probability of thunderstorms in New York City on July $15$ is $60\\%$.',
          answer: '(a) $\\tfrac{3}{5}$ (b) $0.6$',
          working: '60% = 60/100 = 3/5 = 0.6',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Convert the percent to a simplified fraction, and to a decimal. According to the local weather report, the chance of thunderstorms in New York City on July 15th is 60 percent.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Percent', md: '**Percent** means **out of $100$**. A $60\\%$ chance is like $60$ out of every $100$ days like this one having storms. We write the **same amount** as a fraction and as a decimal.' }],
      lines: [
        { say: 'Percent means out of 100. A 60 percent chance of storms is like 60 out of every 100 days like this one having storms.', show: 'c' },
        { say: 'The question wants the same amount written two other ways: as a fraction, and as a decimal.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Percent', 'Fraction', 'Decimal'],
          rows: [['$n\\%$', '$\\dfrac{n}{100}$', '$n$ hundredths'], ['$25\\%$', '$\\dfrac{25}{100} = \\dfrac{1}{4}$', '$0.25$']],
        },
      ],
      lines: [
        { say: 'Here is what we need. A percent is a number of hundredths. So as a fraction, it goes over 100, and as a decimal, it is that many hundredths.', show: 't', focus: 't.0' },
        { say: 'For example, 25 percent is 25 over 100, which simplifies to 1 quarter, and as a decimal it is 0.25.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $60\\%$ **over $100$**', '**Simplify** the fraction', 'Write **$60$ hundredths** as a decimal'] }],
      lines: [
        { say: 'Here is the plan. Write 60 percent over 100.', show: 'plan.0' },
        { say: 'Simplify the fraction.', show: 'plan.1' },
        { say: 'Then write 60 hundredths as a decimal.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): The fraction',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['60\\% = \\dfrac{60}{100}', '= \\dfrac{60 \\div 20}{100 \\div 20} = \\good{\\dfrac{3}{5}}'] }],
      lines: [
        { say: 'Part a. Percent means out of 100, so 60 percent is 60 over 100.', show: 'm.0' },
        { say: 'To simplify, divide the top and bottom by the same number. 20 goes into both: 60 divided by 20 is 3, and 100 divided by 20 is 5. So 60 percent is 3 fifths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Part (b): The decimal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{60}{100} = 0.60', '0.60 = \\good{0.6}'] }],
      lines: [
        { say: 'Part b. 60 over 100 is 60 hundredths. As a decimal, that is zero point six zero.', caption: 'Part b. 60/100 is 60 hundredths. As a decimal, that is 0.60.', show: 'm.0' },
        { say: 'The zero at the end does not change the value, so we can write it as 0.6, six tenths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{5} = 3 \\div 5 = 0.6 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the fraction and the decimal match. 3 fifths means 3 divided by 5, which is 0.6. Both answers are the same amount. It checks out.', show: 'm', focus: 'm' },
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
            ['(a) $\\tfrac{60}{100}$', 'right, but **not simplified**: divide by $20$'],
            ['(b) $6.0$', 'put the decimal point in the **wrong place**'],
            ['(b) $0.06$', 'that is $6\\%$: $60\\%$ is **$60$ hundredths**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '60 over 100 is the right amount, but the question asks for a simplified fraction. Divide the top and bottom by 20.' },
        { say: '6.0 puts the decimal point in the wrong place. 6.0 is 600 percent, far more than certain, and a probability can never be more than 1.' },
        { say: 'And 0.06 is only 6 hundredths, which is 6 percent. 60 percent is 60 hundredths, or 0.6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a class, $40\\%$ of the students walk to school. Which shows $40\\%$ as a simplified fraction and as a decimal?',
          choices: ['$\\tfrac{2}{5}$ and $0.4$', '$\\tfrac{4}{10}$ and $0.04$', '$\\tfrac{40}{100}$ and $4.0$', '$\\tfrac{1}{4}$ and $0.25$'],
          answer: 0,
          working: '40/100 = 2/5 (divide by 20), and 40 hundredths = 0.40 = 0.4.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class, 40 percent of the students walk to school. Which shows 40 percent as a simplified fraction and as a decimal? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '40 percent is 40 over 100. Divide the top and bottom by 20 to get 2 fifths. And 40 hundredths is 0.4. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent means **out of $100$**', 'Fraction: write it **over $100$**, then **simplify**', 'Decimal: that many **hundredths**', 'The fraction and decimal are the **same amount**'] }],
      lines: [
        { say: 'Here is what to remember. Percent means out of 100.', show: 'sum.0' },
        { say: 'To write a percent as a fraction, put it over 100, then simplify.', show: 'sum.1' },
        { say: 'To write it as a decimal, write that many hundredths.', show: 'sum.2' },
        { say: 'And the fraction, decimal and percent are all the same amount. For more on ratios, fractions, decimals and percentages, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
