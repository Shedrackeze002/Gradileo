import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 2.1 (unit price and the best buy). The question is an Exercise
// from OpenStax Prealgebra 2e, word for word with its instruction line (section 5.6, Ratios and
// Rate, CC BY-NC-SA 4.0). 2.99 ÷ 40 ≈ 0.0748 → $0.075 an ounce, and 4.39 ÷ 64 ≈ 0.0686 → $0.069 an
// ounce, so the squeeze bottle is the better buy, as in the book's answer. Check: 40 ounces at the
// squeeze bottle's rate cost about 40 × 0.0686 ≈ $2.74, less than $2.99.

const QUESTION =
  'Find each unit price and then identify the better buy. Round to three decimal places. Ketchup, 40-ounce regular bottle for $2.99 or 64-ounce squeeze bottle for $4.39';

const video: Explainer = {
  id: 'xq-m204-2-1',
  lessonId: '',
  exam: {
    lesson: 'm204-2-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.6, Ratios and Rate',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-6-ratios-and-rate',
    question: QUESTION,
  },
  title: 'Exam Question: Which Ketchup Is the Better Buy? (Unit Price)',
  thumbnailTitle: 'Which Ketchup Is the Better Buy?',
  summary:
    'A real test question, solved one small step at a time: ketchup comes in a 40-ounce bottle for $2.99 or a 64-ounce squeeze bottle for $4.39. Which is the better buy? The unit prices are $2.99 ÷ 40 ≈ $0.075 an ounce and $4.39 ÷ 64 ≈ $0.069 an ounce, so the squeeze bottle is the better buy. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Ketchup Is the Better Buy?', subtitle: 'Unit price, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about unit prices. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find each unit price and then identify the better buy. Round to three decimal places. Ketchup, 40-ounce regular bottle for \\$2.99 or 64-ounce squeeze bottle for \\$4.39',
          answer: 'Regular \\$0.075 an ounce, squeeze \\$0.069 an ounce: the squeeze bottle is the better buy',
          working: '2.99 ÷ 40 ≈ 0.075; 4.39 ÷ 64 ≈ 0.069',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find each unit price, and then identify the better buy. Round to three decimal places.' },
        { say: 'Ketchup comes in a 40 ounce regular bottle for 2 dollars 99, or a 64 ounce squeeze bottle for 4 dollars 39.', caption: 'Ketchup comes in a 40-ounce regular bottle for $2.99, or a 64-ounce squeeze bottle for $4.39.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Bottle', 'Size', 'Price'], rows: [['Regular', '$40$ oz', '\\$2.99'], ['Squeeze', '$64$ oz', '\\$4.39']] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Unit price', md: 'The **unit price** is the price of **one unit**, here one ounce. It lets us compare sizes fairly.' },
      ],
      lines: [
        { say: 'Here are the two bottles. The regular bottle costs less, but it also holds less ketchup. So the prices alone do not tell us which is the better deal.', show: 't' },
        { say: 'The unit price is the price of one unit, here one ounce. It lets us compare the two sizes fairly.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{unit price} = \\dfrac{\\text{price}}{\\text{number of units}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The better buy', md: 'The better buy has the **lower** unit price: you pay less for each ounce.' },
      ],
      lines: [
        { say: 'Here is what we need. The unit price is the price, divided by the number of units.', show: 'm' },
        { say: 'The better buy has the lower unit price, because you pay less for each ounce.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Unit price of the **regular** bottle', 'Unit price of the **squeeze** bottle', 'Pick the **lower** one'] }],
      lines: [
        { say: 'Here is the plan. Find the unit price of the regular bottle.', show: 'plan.0' },
        { say: 'Find the unit price of the squeeze bottle.', show: 'plan.1' },
        { say: 'Then pick the lower one.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The unit prices',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{regular: } \\dfrac{\\$2.99}{40} \\approx \\$0.075 \\text{ per oz}', '\\text{squeeze: } \\dfrac{\\$4.39}{64} \\approx \\$0.069 \\text{ per oz}', '\\$0.069 < \\$0.075: \\ \\good{\\text{squeeze bottle}}'] }],
      lines: [
        { say: 'Step one. The regular bottle: 2.99 divided by 40 is 0.07475, which rounds to 0.075. That is about 7 and a half cents an ounce.', caption: 'Step one. The regular bottle: 2.99 ÷ 40 = 0.07475, which rounds to $0.075 an ounce.', show: 'm.0' },
        { say: 'Step two. The squeeze bottle: 4.39 divided by 64 is about 0.0686, which rounds to 0.069. That is about 7 cents an ounce.', caption: 'Step two. The squeeze bottle: 4.39 ÷ 64 ≈ 0.0686, which rounds to $0.069 an ounce.', show: 'm.1' },
        { say: 'Step three. 0.069 is less than 0.075, so each ounce costs less in the squeeze bottle. The squeeze bottle is the better buy.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40 \\text{ oz at } \\$0.0686 \\approx \\$2.74', '\\$2.74 < \\$2.99 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. If 40 ounces were sold at the squeeze bottle’s rate, they would cost about 2 dollars 74.', caption: 'Let us check another way. If 40 ounces were sold at the squeeze bottle’s rate, they would cost about $2.74.', show: 'm.0' },
        { say: 'That is less than the 2 dollars 99 for the regular bottle. So the squeeze bottle really is cheaper per ounce. It checks out.', caption: 'That is less than the $2.99 for the regular bottle. So the squeeze bottle really is cheaper per ounce. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"Regular, it’s cheaper"', 'compared **prices**, not prices **per ounce**'],
            ['"They cost the same"', 'rounded to the **cent**: both are about \\$0.07'],
            ['"Regular", from $13.4 < 14.6$', 'those are **ounces per dollar**: then the **higher** wins'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Choosing the regular bottle because it costs less compares the prices, not the prices per ounce. It is cheaper only because it is smaller.' },
        { say: 'Saying they cost the same rounds to the cent, where both are about 7 cents. That is why the question asks for three decimal places.' },
        { say: 'And dividing the other way, 40 divided by 2.99 is about 13.4 ounces per dollar, and the squeeze bottle gives about 14.6. Those are ounces per dollar, so the higher number wins, and it is still the squeeze bottle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Peanut butter comes in a 16-ounce jar for \\$3.49 or a 40-ounce jar for \\$7.99. Which is the better buy, and what is its unit price, to three decimal places?',
          choices: ['16 oz, \\$0.218 per oz', '40 oz, \\$0.218 per oz', '16 oz, \\$0.200 per oz', '40 oz, \\$0.200 per oz'],
          answer: 3,
          working: '3.49 ÷ 16 ≈ 0.218 and 7.99 ÷ 40 ≈ 0.200, so the 40-ounce jar is the better buy.',
        },
      ],
      lines: [
        { say: 'Your turn. Peanut butter comes in a 16 ounce jar for 3 dollars 49, or a 40 ounce jar for 7 dollars 99. Which is the better buy, and what is its unit price? Pause the video and try it.', caption: 'Your turn. Peanut butter comes in a 16-ounce jar for $3.49, or a 40-ounce jar for $7.99. Which is the better buy, and what is its unit price? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '3.49 divided by 16 is about 0.218, and 7.99 divided by 40 is about 0.200. The 40 ounce jar is the better buy, at 20 cents an ounce. Choice "D".', caption: '3.49 ÷ 16 ≈ 0.218, and 7.99 ÷ 40 ≈ 0.200. The 40-ounce jar is the better buy, at $0.200 an ounce. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unit price $=$ price $\\div$ units', 'The **lower** unit price wins', 'Keep enough **decimal places**', 'A cheaper price is not always a better buy'] }],
      lines: [
        { say: 'Here is what to remember. The unit price is the price divided by the number of units.', show: 'sum.0' },
        { say: 'The lower unit price is the better buy.', show: 'sum.1' },
        { say: 'Keep enough decimal places to see the difference.', show: 'sum.2' },
        { say: 'And a lower price tag is not always the better buy. For more on unit price and the best buy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
