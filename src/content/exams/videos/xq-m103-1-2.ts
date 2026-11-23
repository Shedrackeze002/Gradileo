import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 1.2 (unit price and best buys). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 5.6, Ratios and Rate, CC BY-NC-SA 4.0).
// Brand A: $4.59 ÷ 40 = $0.11475 ≈ $0.11 a bag; Brand B: $3.99 ÷ 30 = $0.133 ≈ $0.13 a bag, so Brand
// A is the better buy, as in the book's answer. Check: 40 bags of Brand B would cost 40 × $0.133 =
// $5.32, more than Brand A's $4.59.

const QUESTION =
  'Find each unit price and then determine the better buy. Round to the nearest cent if necessary. Brand A Storage Bags, $4.59 for 40 count, or Brand B Storage Bags, $3.99 for 30 count';

const video: Explainer = {
  id: 'xq-m103-1-2',
  lessonId: '',
  exam: {
    lesson: 'm103-1-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.6, Ratios and Rate',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-6-ratios-and-rate',
    question: QUESTION,
  },
  title: 'Exam Question: Which Box of Storage Bags Is the Better Buy? (Unit Price)',
  thumbnailTitle: 'Which Box Is the Better Buy?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: Brand A storage bags cost $4.59 for 40, and Brand B cost $3.99 for 30. Find each unit price and decide which is the better buy. Dividing the price by the number of bags gives about $0.11 a bag for Brand A and $0.13 a bag for Brand B, so Brand A is the better buy, even though its box costs more. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Box Is the Better Buy?', subtitle: 'Unit price, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about unit prices and best buys. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find each unit price and then determine the better buy. Round to the nearest cent if necessary. Brand A Storage Bags, \\$4.59 for $40$ count, or Brand B Storage Bags, \\$3.99 for $30$ count',
          answer: 'Brand A (about \\$0.11 a bag, against \\$0.13)',
          working: '\\$4.59 ÷ 40 and \\$3.99 ÷ 30',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Brand A storage bags cost 4 dollars 59 for a box of 40. Brand B cost 3 dollars 99 for a box of 30. Find each unit price, round to the nearest cent, and decide which is the better buy.' },
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
          head: ['', 'Brand A', 'Brand B'],
          rows: [
            ['Price of the box', '\\$4.59', '\\$3.99'],
            ['Bags in the box', '$40$', '$30$'],
            ['Price of **one** bag', '?', '?'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'The boxes hold **different** numbers of bags, so the box prices cannot be compared directly.' },
      ],
      lines: [
        { say: 'Here is what we know. Brand A\'s box costs more, but it also holds more bags.', show: 'tab' },
        { say: 'So we cannot just compare the box prices. We need the price of one bag in each box. That is the unit price.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{unit price} = \\dfrac{\\text{total price}}{\\text{number of units}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The better buy', md: 'The better buy has the **lower** unit price.' },
      ],
      lines: [
        { say: 'Here is what we need. The unit price is the total price divided by the number of units: here, the price of one bag.', show: 'f' },
        { say: 'The better buy is the one with the lower unit price.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Brand A: price $\\div$ bags', 'Brand B: price $\\div$ bags', 'Compare: the **lower** one wins'] }],
      lines: [
        { say: 'Here is the plan. Find Brand A\'s unit price.', show: 'plan.0' },
        { say: 'Find Brand B\'s unit price.', show: 'plan.1' },
        { say: 'Then compare them. The lower one is the better buy.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Brand A',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\$4.59}{40 \\text{ bags}} = \\$0.11475 \\text{ per bag}', '\\approx \\good{\\$0.11 \\text{ per bag}}'] }],
      lines: [
        { say: 'Step one. Brand A: 4 dollars 59 divided by 40 bags is 0.11475 dollars per bag.', show: 'm.0' },
        { say: 'To the nearest cent, that is 11 cents a bag.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Brand B',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\$3.99}{30 \\text{ bags}} = \\$0.133 \\text{ per bag}', '\\approx \\good{\\$0.13 \\text{ per bag}}'] }],
      lines: [
        { say: 'Step two. Brand B: 3 dollars 99 divided by 30 bags is 0.133 dollars per bag.', show: 'm.0' },
        { say: 'To the nearest cent, that is 13 cents a bag.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$0.11 < \\$0.13', '\\good{\\text{Brand A is the better buy}}'] }],
      lines: [
        { say: 'Step three. 11 cents is less than 13 cents.', show: 'm.0' },
        { say: 'So Brand A is the better buy, even though its box costs more.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40 \\text{ bags of B} = 40 \\times \\$0.133 = \\$5.32', '\\$5.32 > \\$4.59 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. What would 40 bags of Brand B cost? 40 times 0.133 dollars is 5 dollars 32.', show: 'm.0' },
        { say: 'Brand A sells 40 bags for 4 dollars 59, which is less. Brand A really is cheaper per bag. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"B costs less, so B wins"', 'B\'s box holds **fewer** bags: compare **one** bag'],
            ['$40 \\div 4.59$', 'that is bags per dollar: divide **price by bags**'],
            ['Round before dividing', 'divide first, **then** round to the cent'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The cheaper box is not always the better buy. Brand B\'s box has fewer bags.' },
        { say: 'Divide the price by the number of bags, not the other way round. 40 divided by 4.59 is bags per dollar.' },
        { say: 'And divide first, then round to the nearest cent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Juice boxes come in a $6$-pack for \\$4.20 or a $10$-pack for \\$6.50. Which is the better buy?',
          choices: ['The $6$-pack, at \\$0.70 each', 'The $6$-pack, at \\$0.65 each', 'They cost the same', 'The $10$-pack, at \\$0.65 each'],
          answer: 3,
          working: '\\$4.20 ÷ 6 = \\$0.70, and \\$6.50 ÷ 10 = \\$0.65, which is lower.',
        },
      ],
      lines: [
        { say: 'Your turn. Juice boxes come in a 6-pack for 4 dollars 20, or a 10-pack for 6 dollars 50. Which is the better buy? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4 dollars 20 divided by 6 is 70 cents each. 6 dollars 50 divided by 10 is 65 cents each. The 10-pack is the better buy. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unit price $=$ price $\\div$ number of units', 'Divide first, **then** round to the cent', 'The **lower** unit price is the better buy', 'A cheaper box is **not** always cheaper per item'] }],
      lines: [
        { say: 'Here is what to remember. The unit price is the price divided by the number of units.', show: 'sum.0' },
        { say: 'Divide first, then round to the nearest cent.', show: 'sum.1' },
        { say: 'The lower unit price is the better buy.', show: 'sum.2' },
        { say: 'And a cheaper box is not always cheaper per item. For more on unit prices, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
