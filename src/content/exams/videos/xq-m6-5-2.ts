import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-2-figures.ts';

// Exam question for Math 6 lesson 5.2 (rates and unit rates). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 5.6, Ratios and Rate, CC BY-NC-SA 4.0). Unit price
// = $6.99 ÷ 24 = 0.291… dollars per box, which rounds to $0.29 per box, as in the book's answer.
// Check: 24 × $0.29 = $6.96, just under $6.99.

const QUESTION = 'Find the unit price. Round your answer to the nearest cent if necessary. 24-pack of juice boxes for $6.99';

/** 6.99 ÷ 24 = 0.291… as long division, one zero written on to reach the thousandths. */
const work = (() => {
  const part = decimalDivision({
    divisor: '24',
    dividend: '6.990',
    quotient: '0291',
    zerosFrom: 3,
    steps: [
      { prod: '48', at: 1, diff: '21', down: true },
      { prod: '216', at: 2, diff: '3', down: true },
      { prod: '24', at: 3, diff: '6' },
    ],
  });
  return figure('ld', [part], heightFor(part, 44));
})();

const video: Explainer = {
  id: 'xq-m6-5-2',
  lessonId: '',
  exam: {
    lesson: 'm6-5-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.6, Ratios and Rate',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-6-ratios-and-rate',
    question: QUESTION,
  },
  title: 'Exam Question: The Price of One Juice Box (Rates and Unit Rates)',
  thumbnailTitle: 'What Does One Juice Box Cost?',
  thumbnail: 'ld',
  summary:
    'A real test question, solved one small step at a time: a 24-pack of juice boxes costs $6.99. Find the unit price, the cost of one box, rounded to the nearest cent. The unit price is the total price divided by the number of boxes: $6.99 ÷ 24 = $0.291…, which rounds to $0.29 per box. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does One Juice Box Cost?', subtitle: 'Rates and unit rates, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about unit price. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the unit price. Round your answer to the nearest cent if necessary. $24$-pack of juice boxes for \\$6.99',
          answer: '\\$0.29 per box',
          working: '6.99 ÷ 24 = 0.291… ≈ 0.29',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the unit price. Round your answer to the nearest cent if necessary. A 24-pack of juice boxes for 6 dollars and 99 cents.', caption: 'Find the unit price. Round your answer to the nearest cent if necessary. 24-pack of juice boxes for $6.99.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Unit price', md: 'A **rate** compares two different kinds of amount, like dollars and boxes. The **unit price** is the price of **one** item: here, the cost of **one** juice box.' }],
      lines: [
        { say: 'A rate compares two different kinds of amount, like dollars and juice boxes.', show: 'c' },
        { say: 'The unit price is a rate for just one item. Here, it is the cost of one juice box.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'f', size: 'lg', lines: ['\\text{unit price} = \\dfrac{\\text{total price}}{\\text{number of items}}'] }],
      lines: [
        { say: 'Here is what we need. The unit price is the total price divided by the number of items.', show: 'f' },
        { say: 'Money is rounded to the nearest cent, which is two decimal places. So we divide to three places, and round.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **division**', 'Divide to **three** decimal places', '**Round** to the nearest cent'] }],
      lines: [
        { say: 'Here is the plan. Write the division.', show: 'plan.0' },
        { say: 'Divide to three decimal places.', show: 'plan.1' },
        { say: 'Then round to the nearest cent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Divide and round',
      layout: 'split',
      leftWidth: 520,
      left: [work],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\$6.99 \\div 24', '= 0.29\\underline{1}\\dots', '1 < 5: \\text{ round down}', '\\approx \\good{\\$0.29} \\text{ per box}'] }],
      lines: [
        { say: 'Step one. The unit price is 6 dollars 99 divided by 24 boxes.', caption: 'Step one. The unit price is $6.99 ÷ 24 boxes.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'ld.qp', 'm.0'], focus: 'm.0' },
        { say: 'Step two. 24 does not go into 6, so write a zero. 24 goes into 69 twice: 48, and 21 is left. Bring down the 9 to make 219.', show: ['ld.q0', 'ld.q1', 'ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'ld.s0-arrow', 'ld.s0-down'], focus: 'ld.s0-down' },
        { say: '24 goes into 219 nine times: 216, and 3 is left. Write a zero after the 9s to keep going, and bring it down to make 30.', show: ['ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'ld.zeros', 'ld.s1-arrow', 'ld.s1-down'], hide: 'ld.s0-arrow', focus: 'ld.s1-down' },
        { say: '24 goes into 30 once. So far the answer is 0.291, and that is enough to round.', show: ['ld.q3', 'ld.s2-prod', 'ld.s2-rule', 'ld.s2-diff', 'm.1'], hide: 'ld.s1-arrow', focus: 'm.1' },
        { say: 'Step three. To round to the nearest cent, look at the third decimal place. It is 1, which is less than 5, so round down.', show: 'm.2', focus: 'm.2' },
        { say: 'The unit price is 29 cents per juice box.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['24 \\times \\$0.29 = \\$6.96 \\approx \\$6.99 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 24 boxes at 29 cents each is 6 dollars and 96 cents, just 3 cents under the real price. That small gap comes from rounding. It checks out.', caption: 'Let us check. 24 boxes at $0.29 each is $6.96, just 3 cents under the real price. That gap comes from rounding. It checks out.', show: 'm', focus: 'm' },
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
            ['\\$3.43', 'divided $24 \\div 6.99$: price **over** items, not items over price'],
            ['\\$0.30', 'rounded **up**: the next digit, $1$, is less than $5$'],
            ['\\$2.91', 'the point is in the wrong place: one box costs **less** than \\$1'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '3 dollars 43 divides the wrong way round. That is boxes per dollar. The unit price is the price divided by the number of items.', caption: '$3.43 divides the wrong way round. That is boxes per dollar. The unit price is price ÷ number of items.' },
        { say: '30 cents rounds up. The next digit is 1, so we round down.' },
        { say: 'And 2 dollars 91 puts the point in the wrong place. 24 boxes cost under 7 dollars, so one box costs much less than a dollar.', caption: '$2.91 puts the point in the wrong place. 24 boxes cost under $7, so one box costs much less than $1.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A box of $12$ pencils costs \\$3.00. What is the unit price?',
          choices: ['\\$4.00 per pencil', '\\$2.50 per pencil', '\\$0.25 per pencil', '\\$0.36 per pencil'],
          answer: 2,
          working: '3.00 ÷ 12 = 0.25, so \\$0.25 per pencil.',
        },
      ],
      lines: [
        { say: 'Your turn. A box of 12 pencils costs 3 dollars. What is the unit price? Pause the video and try it.', caption: 'Your turn. A box of 12 pencils costs $3.00. What is the unit price?', show: 'q2', wait: 8 },
        { say: '3 dollars divided by 12 is 25 cents per pencil. Choice "C".', caption: '$3.00 ÷ 12 = $0.25 per pencil. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unit price: the cost of **one**', '**Price** ÷ number of items', 'Divide to **three** places, round to **two**', 'Check by **multiplying** back'] }],
      lines: [
        { say: 'Here is what to remember. The unit price is the cost of one item.', show: 'sum.0' },
        { say: 'Divide the price by the number of items.', show: 'sum.1' },
        { say: 'Divide to three decimal places, then round to the nearest cent.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on rates and unit rates, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
