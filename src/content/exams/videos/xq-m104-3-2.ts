import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 3.2 (fractions, decimals and percents). The question is a Try
// It from OpenStax Prealgebra 2e, word for word (section 6.1, Understand Percent, CC BY-NC-SA 4.0).
// 44% = 44/100 = 11/25 = 0.44, as in the book's answer. Check: 11 ÷ 25 = 0.44.

const QUESTION =
  'Convert the percent to: (a) a fraction and (b) a decimal The U.S. Census estimated that in 2013, 44% of the population of Boston age 25 or older have a bachelor’s or higher degrees.';

const video: Explainer = {
  id: 'xq-m104-3-2',
  lessonId: '',
  exam: {
    lesson: 'm104-3-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.1, Understand Percent',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-1-understand-percent',
    question: QUESTION,
  },
  title: 'Exam Question: Writing 44% as a Fraction and a Decimal (Fractions, Decimals and Percents)',
  thumbnailTitle: '44% as a Fraction and a Decimal',
  summary:
    'A real test question, solved one small step at a time: in 2013, 44% of the population of Boston age 25 or older had a bachelor’s or higher degree. Convert 44% to a fraction and to a decimal. Percent means per hundred, so 44% = 44/100, which simplifies to 11/25, and dividing by 100 gives 0.44. Then we check by dividing 11 by 25 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '44% as a Fraction and a Decimal', subtitle: 'Fractions, decimals and percents, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about fractions, decimals and percents. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Convert the percent to: (a) a fraction and (b) a decimal. The U.S. Census estimated that in $2013$, $44\\%$ of the population of Boston age $25$ or older have a bachelor’s or higher degrees.',
          answer: '(a) $\\tfrac{11}{25}$ (b) $0.44$',
          working: '$44\\% = \\tfrac{44}{100} = \\tfrac{11}{25} = 0.44$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Convert the percent to a fraction and to a decimal. The U.S. Census estimated that in twenty thirteen, 44 percent of the population of Boston age 25 or older have a bachelor\'s or higher degree.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['44\\% = \\ ? \\text{ (fraction)} = \\ ? \\text{ (decimal)}'] },
        { kind: 'text', id: 't', size: 'md', md: 'Only the **number** $44\\%$ matters. The rest tells us what it counts.' },
      ],
      lines: [
        { say: 'The question asks us to write 44 percent in two other ways: as a fraction, and as a decimal.', show: 'm' },
        { say: 'The facts about Boston tell us what the 44 percent counts. For the maths, only the number 44 percent matters.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{percent} = \\text{per hundred}: \\quad 44\\% = \\dfrac{44}{100}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Two quick rules', md: 'Fraction: put the number over $100$, then **simplify**. Decimal: **divide by $100$**, which moves the decimal point **two places left**.' },
      ],
      lines: [
        { say: 'Here is what we need. Percent means per hundred. So 44 percent is 44 out of 100.', show: 'f' },
        { say: 'For the fraction, put the number over 100, then simplify. For the decimal, divide by 100, which moves the decimal point two places to the left.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $44\\%$ over **100**', '**Simplify** the fraction', '**Divide by 100** for the decimal'] }],
      lines: [
        { say: 'Here is the plan. Write 44 percent over 100.', show: 'plan.0' },
        { say: 'Simplify the fraction.', show: 'plan.1' },
        { say: 'Then divide by 100 for the decimal.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Over 100',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['44\\% = \\dfrac{44}{100}'] }],
      lines: [
        { say: 'Step one. 44 percent is 44 over 100.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{44}{100} = \\dfrac{44 \\div 4}{100 \\div 4} = \\good{\\dfrac{11}{25}}'] }],
      lines: [
        { say: 'Step two. 44 and 100 can both be divided by 4. 44 divided by 4 is 11, and 100 divided by 4 is 25. 11 and 25 share no other factor, so the fraction is eleven twenty-fifths.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: The decimal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['44 \\div 100 = \\good{0.44}'] }],
      lines: [
        { say: 'Step three. Divide 44 by 100: move the decimal point two places to the left. That gives 0.44.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['11 \\div 25 = 0.44 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the fraction and the decimal agree. 11 divided by 25 is 0.44. They match. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$4.4$', 'moved the point only **one** place: per **hundred**'],
            ['$0.044$', 'moved the point **three** places'],
            ['$\\dfrac{44}{100}$', 'right value, but **not simplified**: divide by $4$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4.4 moves the decimal point only one place. Percent means per hundred, so move it two places.' },
        { say: '0.044 moves it three places, which is too far.' },
        { say: 'And 44 over 100 has the right value, but a test usually wants the simplest form. Divide the top and bottom by 4.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In a survey, $65\\%$ of workers said they drive to work. Write $65\\%$ as a fraction in simplest form.',
          choices: ['$\\dfrac{65}{10}$', '$\\dfrac{1}{65}$', '$\\dfrac{6}{5}$', '$\\dfrac{13}{20}$'],
          answer: 3,
          working: '$\\dfrac{65}{100} = \\dfrac{65 \\div 5}{100 \\div 5} = \\dfrac{13}{20}$',
        },
      ],
      lines: [
        { say: 'Your turn. In a survey, 65 percent of workers said they drive to work. Write 65 percent as a fraction in simplest form. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '65 percent is 65 over 100. Divide the top and bottom by 5, and you get thirteen twentieths. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent means **per hundred**', 'Fraction: over $100$, then **simplify**', 'Decimal: point **two places left**', 'Check: the fraction and decimal **agree**'] }],
      lines: [
        { say: 'Here is what to remember. Percent means per hundred.', show: 'sum.0' },
        { say: 'For a fraction, put the number over 100, then simplify.', show: 'sum.1' },
        { say: 'For a decimal, move the decimal point two places to the left.', show: 'sum.2' },
        { say: 'And check that your fraction and decimal agree. For more on fractions, decimals and percents, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
