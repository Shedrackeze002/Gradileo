import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

// Exam question for Math 7 lesson 1.3 (comparing and ordering numbers). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 5.3, Decimals and Fractions, CC BY-NC-SA
// 4.0). 17/20 = 85/100 = 0.85 (multiply top and bottom by 5), and 0.85 > 0.82, so 17/20 > 0.82.

const QUESTION = 'Order each of the following pairs of numbers, using < or >. 17/20 __ 0.82';

const line = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: 0.8,
        max: 0.9,
        step: 0.01,
        every: 5,
        length: 13,
        points: [
          { id: 'a', value: 0.82, tex: '0.82', tone: 'adj' },
          { id: 'b', value: 0.85, tex: '\\tfrac{17}{20} = 0.85', tone: 'good' },
        ],
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'xq-m7-1-3',
  lessonId: '',
  exam: {
    lesson: 'm7-1-3',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.3, Decimals and Fractions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-3-decimals-and-fractions',
    question: QUESTION,
  },
  title: 'Exam Question: Which Is Bigger, 17/20 or 0.82? (Comparing and Ordering Numbers)',
  thumbnailTitle: '17/20 or 0.82?',
  thumbnail: 'nl',
  summary:
    'A real test question, solved one small step at a time: put < or > between 17/20 and 0.82. To compare a fraction with a decimal, write them the same way. Multiply the top and bottom of 17/20 by 5 to get 85/100, which is 0.85. 0.85 is greater than 0.82, so 17/20 > 0.82. Then we check on a number line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '17/20 or 0.82?', subtitle: 'Comparing and ordering numbers, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about comparing a fraction with a decimal. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Order each of the following pairs of numbers, using $<$ or $>$. $\\dfrac{17}{20}$ __ $0.82$',
          answer: '$\\dfrac{17}{20} > 0.82$',
          working: '17/20 = 85/100 = 0.85',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Order the pair of numbers using less than or greater than: 17 twentieths, and 0.82.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'The symbols', md: '$>$ means **is greater than** and $<$ means **is less than**. The symbol always **opens toward the bigger** number. We must decide which is bigger: $\\dfrac{17}{20}$ or $0.82$.' }],
      lines: [
        { say: 'The symbol greater than means the first number is bigger. Less than means it is smaller. The open side always faces the bigger number.', show: 'c' },
        { say: 'So we must decide which is bigger: 17 twentieths, or 0.82.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Compare the same way', md: 'A fraction and a decimal are hard to compare as they are. Write the fraction as a **decimal** first. A denominator that goes into $100$ is easy: make it **hundredths**.' }],
      lines: [
        { say: 'Here is what we need. A fraction and a decimal are hard to compare as they are, so write the fraction as a decimal first.', show: 'c' },
        { say: 'When the denominator goes into 100, it is easy: make the fraction into hundredths.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Make $\\dfrac{17}{20}$ into **hundredths**', 'Write it as a **decimal**', 'Compare the decimals **digit by digit**'] }],
      lines: [
        { say: 'Here is the plan. Make 17 twentieths into hundredths.', show: 'plan.0' },
        { say: 'Write it as a decimal.', show: 'plan.1' },
        { say: 'Then compare the decimals digit by digit.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Write it as a decimal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{17}{20} = \\dfrac{17 \\times 5}{20 \\times 5} = \\dfrac{85}{100}', '\\dfrac{85}{100} = 0.85', '0.8\\good{5} > 0.8\\bad{2}', '\\good{\\dfrac{17}{20} > 0.82}'] }],
      lines: [
        { say: 'Step one. 20 times 5 is 100, so multiply the top and the bottom by 5. 17 times 5 is 85. 17 twentieths is the same as 85 hundredths.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 85 hundredths is 0.85.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Compare 0.85 with 0.82. The ones and the tenths are the same: 0 and 8. In the hundredths, 5 is greater than 2. So 0.85 is greater than 0.82.', show: 'm.2', focus: 'm.2' },
        { say: 'So 17 twentieths is greater than 0.82.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [line('nl')],
      lines: [
        { say: 'Let us check on a number line from 0.8 to 0.9.', show: 'nl.axis' },
        { say: '0.82 is 2 hundredths past 0.8.', show: 'nl.a', focus: 'nl.a' },
        { say: '17 twentieths, which is 0.85, is half way to 0.9, further to the right. Further right means greater. It checks out.', show: 'nl.b', focus: 'nl.b' },
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
            ['"$<$, because $17 < 82$"', 'compared the **top** with the decimal digits: write both as decimals'],
            ['"$\\tfrac{17}{20} = 0.17$"', 'a fraction is **not** its top number: $17 \\div 20 = 0.85$'],
            ['"$<$" written for "greater"', 'the symbol **opens toward** the bigger number'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Comparing 17 with 82 mixes up the parts. Write both numbers as decimals first.' },
        { say: '17 twentieths is not 0.17. 17 divided by 20 is 0.85.' },
        { say: 'And the symbol must open toward the bigger number. 17 twentieths is bigger, so the open side faces it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which is true?',
          choices: ['$\\dfrac{3}{5} < 0.65$', '$\\dfrac{3}{5} > 0.65$', '$\\dfrac{3}{5} = 0.65$', '$\\dfrac{3}{5} = 0.35$'],
          answer: 0,
          working: '3/5 = 60/100 = 0.60, and 0.60 < 0.65.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is true? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '3 fifths is 60 hundredths, 0.60. Compare 0.60 with 0.65: in the hundredths, 0 is less than 5. So 3 fifths is less than 0.65. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write both numbers the **same way**', 'Make the fraction into **hundredths**', 'Compare **digit by digit**', 'The symbol **opens toward** the bigger number'] }],
      lines: [
        { say: 'Here is what to remember. To compare, write both numbers the same way.', show: 'sum.0' },
        { say: 'A fraction can often be made into hundredths.', show: 'sum.1' },
        { say: 'Then compare the decimals digit by digit.', show: 'sum.2' },
        { say: 'And the symbol opens toward the bigger number. For more on comparing and ordering numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
