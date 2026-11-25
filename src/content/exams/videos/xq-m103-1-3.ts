import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 1.3 (markups, discounts and sales tax). The question is a Your
// Turn from OpenStax Contemporary Mathematics, word for word (section 6.2, Discounts, Markups, and
// Sales Tax, CC BY-NC-SA 4.0). After a 26% discount, Marisol pays 74% of the original price, so the
// original price is $43.66 ÷ 0.74 = $59.00, as in the book's answer. Check: 26% of $59 is $15.34,
// and $59 − $15.34 = $43.66.

const QUESTION =
  'Marisol needed to buy a new microwave. She got a 26% discount. The sale price Marisol paid was $43.66. What was the original price of the microwave?';

const video: Explainer = {
  id: 'xq-m103-1-3',
  lessonId: '',
  exam: {
    lesson: 'm103-1-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 6.2, Discounts, Markups, and Sales Tax',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/6-2-discounts-markups-and-sales-tax',
    question: QUESTION,
  },
  title: 'Exam Question: Find the Price Before a 26% Discount (Markups, Discounts and Sales Tax)',
  thumbnailTitle: 'What Was the Price Before the Sale?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: Marisol got a 26% discount on a microwave and paid $43.66. What was the original price? After a 26% discount, she pays 100% − 26% = 74% of the original price, so the original price is $43.66 ÷ 0.74 = $59.00. Then we check by taking 26% off $59 and look at the traps, including why adding 26% back does not work.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Was the Price Before the Sale?', subtitle: 'Discounts, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about discounts. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Marisol needed to buy a new microwave. She got a $26\\%$ discount. The sale price Marisol paid was \\$43.66. What was the original price of the microwave?',
          answer: '\\$59.00',
          working: 'She paid $74\\%$ of the original: \\$43.66 ÷ 0.74',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Marisol needed a new microwave. She got a 26 percent discount, and paid 43 dollars 66. What was the original price of the microwave?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['We know', 'We want'],
          rows: [
            ['the discount: $26\\%$', 'the **original** price'],
            ['the sale price: \\$43.66', '(the price **before** the discount)'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'This works **backwards**: we know the price **after** the discount.' },
      ],
      lines: [
        { say: 'Here is what we know: the discount, 26 percent, and the price she paid, 43 dollars 66.', show: 'tab' },
        { say: 'We want the price before the discount. So we are working backwards, from the sale price to the original price.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{sale price} = \\text{original price} \\times (1 - \\text{discount})'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'What is left', md: 'A $26\\%$ discount leaves $100\\% - 26\\% = 74\\%$ of the price to pay.' },
      ],
      lines: [
        { say: 'Here is what we need. The sale price is the original price times 1 minus the discount.', show: 'f' },
        { say: 'In words: take 26 percent off, and you pay the 74 percent that is left.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **percent paid**', 'Write the **equation**', '**Divide** to find the original price'] }],
      lines: [
        { say: 'Here is the plan. Find the percent of the original price that Marisol paid.', show: 'plan.0' },
        { say: 'Write the equation.', show: 'plan.1' },
        { say: 'Then divide to find the original price.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The percent paid',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['100\\% - 26\\% = \\good{74\\% = 0.74}'] }],
      lines: [
        { say: 'Step one. With 26 percent off, Marisol paid 100 minus 26, which is 74 percent of the original price. As a decimal, that is 0.74.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['43.66 = P \\times 0.74'] }],
      lines: [
        { say: 'Step two. Let P be the original price. 74 percent of P is 43 dollars 66. So 43.66 equals P times 0.74.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P = \\dfrac{43.66}{0.74}', 'P = \\good{\\$59.00}'] }],
      lines: [
        { say: 'Step three. Divide both sides by 0.74.', show: 'm.0' },
        { say: '43.66 divided by 0.74 is exactly 59. The original price was 59 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['26\\% \\text{ of } \\$59 = 0.26 \\times 59 = \\$15.34', '\\$59 - \\$15.34 = \\$43.66 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going forwards. 26 percent of 59 dollars is 0.26 times 59, which is 15 dollars 34.', show: 'm.0' },
        { say: 'Take that off: 59 minus 15.34 is 43 dollars 66, the price Marisol paid. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$43.66 \\times 1.26 = 55.01$', '$26\\%$ of the **sale** price is smaller than $26\\%$ of the original'],
            ['$43.66 \\div 0.26$', 'she paid $74\\%$, not $26\\%$'],
            ['$43.66 \\times 0.74$', 'that takes **another** $26\\%$ off: **divide** instead'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding 26 percent back on gives 55 dollars 1, which is wrong. The discount was 26 percent of the original price, not of the sale price.' },
        { say: 'She paid 74 percent, not 26 percent, so do not divide by 0.26.' },
        { say: 'And multiplying by 0.74 takes another discount off. To work backwards, divide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'After a $20\\%$ discount, a jacket costs \\$48. What was its original price?',
          choices: ['\\$60', '\\$57.60', '\\$38.40', '\\$68'],
          answer: 0,
          working: 'She pays $80\\%$: \\$48 ÷ 0.80 = \\$60.',
        },
      ],
      lines: [
        { say: 'Your turn. After a 20 percent discount, a jacket costs 48 dollars. What was its original price? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'With 20 percent off, you pay 80 percent. 48 divided by 0.8 is 60 dollars. Choice A. Adding 20 percent back gives 57 dollars 60, which is the trap.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['After a discount, you pay $100\\%$ minus the discount', 'Sale price $=$ original $\\times$ percent paid', 'Working backwards: **divide** by the percent paid', 'Check by taking the discount off'] }],
      lines: [
        { say: 'Here is what to remember. After a discount, you pay 100 percent minus the discount.', show: 'sum.0' },
        { say: 'The sale price is the original price times the percent paid.', show: 'sum.1' },
        { say: 'To work backwards, divide by the percent paid.', show: 'sum.2' },
        { say: 'And check by taking the discount off your answer. For more on markups, discounts and sales tax, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
