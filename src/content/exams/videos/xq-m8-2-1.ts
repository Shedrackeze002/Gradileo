import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from '@/content/math8/videos/lib/m8-2-figures.ts';

// Exam question for Math 8 lesson 2.1 (percents greater than 100% and less than 1%). The question
// is an exercise from OpenStax Prealgebra 2e, word for word with the instruction above it (section
// 6.3, Solve Sales Tax, Commission, and Discount Applications, CC BY-NC-SA 4.0). The mark-up is
// 225% of $115 = 2.25 × 115 = $258.75, and the list price is 115 + 258.75 = $373.75 (325% of 115).

const QUESTION =
  'Find (a) the amount of the mark-up and (b) the list price. Alan bought a used bicycle for $115. After re-conditioning it, he added 225% mark-up and then advertised it for sale.';

const bar = (id: string, markup: string) =>
  figure(
    id,
    [
      pieceBar({
        pieces: [
          { w: 4, tex: '\\$115', below: '\\text{cost: } 100\\%', tone: 'adj' },
          { w: 9, tex: markup, below: '\\text{mark-up: } 225\\%', tone: 'opp' },
        ],
        brackets: [{ id: 'lp', from: 0, to: 1, tex: '\\text{list price: } 325\\%', tone: 'good' }],
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'xq-m8-2-1',
  lessonId: '',
  exam: {
    lesson: 'm8-2-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.3, Solve Sales Tax, Commission, and Discount Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-3-solve-sales-tax-commission-and-discount-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Alan’s Bicycle Mark-Up (Percents Greater Than 100%)',
  thumbnailTitle: 'Alan’s Bicycle Mark-Up',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Alan bought a used bicycle for $115, re-conditioned it, and added a 225% mark-up. Find the amount of the mark-up and the list price. A percent over 100% is more than the whole amount: 225% = 2.25. So the mark-up is 2.25 × $115 = $258.75, and the list price is $115 + $258.75 = $373.75. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Alan’s Bicycle Mark-Up', subtitle: 'Percents greater than 100%, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a percent greater than 100 percent. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find (a) the amount of the mark-up and (b) the list price. Alan bought a used bicycle for \\$115. After re-conditioning it, he added 225% mark-up and then advertised it for sale.',
          answer: '(a) \\$258.75 (b) \\$373.75',
          working: '2.25 × 115; 115 + 258.75',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find, part a, the amount of the mark-up, and part b, the list price. Alan bought a used bicycle for 115 dollars. After re-conditioning it, he added 225 percent mark-up, and then advertised it for sale.', caption: 'Find (a) the amount of the mark-up and (b) the list price. Alan bought a used bicycle for $115. After re-conditioning it, he added 225% mark-up and then advertised it for sale.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bar('ask', '?'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Mark-up and list price', md: 'The **mark-up** is the amount Alan adds on top of what he paid. The **list price** is what he asks for: the cost **plus** the mark-up. A mark-up of 225% is **more than** the whole cost.' }],
      lines: [
        { say: 'Alan paid 115 dollars. That is the cost: 100 percent.', caption: 'Alan paid $115. That is the cost: 100%.', show: 'ask.p0' },
        { say: 'The mark-up is the amount he adds on top. It is 225 percent of the cost, so it is more than twice what he paid.', show: ['ask.p1', 'ask.below0', 'ask.below1', 'c'] },
        { say: 'The list price is what he asks for: the cost plus the mark-up.', show: 'ask.lp' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['225\\% = \\dfrac{225}{100} = 2.25', '\\text{mark-up} = \\text{rate} \\times \\text{cost}', '\\text{list price} = \\text{cost} + \\text{mark-up}'] }],
      lines: [
        { say: 'Here is what we need. Percent means out of 100, so 225 percent is 225 hundredths, which is 2.25. A percent over 100 is more than 1 whole.', show: 'm.0' },
        { say: 'The mark-up is the rate times the cost.', show: 'm.1' },
        { say: 'And the list price is the cost plus the mark-up.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write 225% as a **decimal**', '**Multiply** by the cost: the mark-up', '**Add** the cost: the list price'] }],
      lines: [
        { say: 'Here is the plan. Write 225 percent as a decimal.', show: 'plan.0' },
        { say: 'Multiply by the cost, to get the mark-up.', show: 'plan.1' },
        { say: 'Then add the cost, to get the list price.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Mark-up, then list price',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['225\\% = \\adj{2.25}', '\\text{(a) } 2.25 \\times 115 = \\good{\\$258.75}', '\\text{(b) } 115 + 258.75 = \\good{\\$373.75}'] }],
      lines: [
        { say: 'Step one. 225 percent is 2.25.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. The mark-up is 2.25 times 115. 2 times 115 is 230, and a quarter of 115 is 28.75. Together, 258 dollars and 75 cents.', caption: 'Step two. The mark-up is 2.25 × 115. 2 × 115 = 230, and a quarter of 115 is 28.75. Together, $258.75.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. The list price is the cost plus the mark-up: 115 plus 258.75, which is 373 dollars and 75 cents.', caption: 'Step three. The list price is the cost plus the mark-up: 115 + 258.75 = $373.75.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [bar('ck', '\\$258.75'), { kind: 'math', id: 'm', size: 'md', lines: ['100\\% + 225\\% = 325\\% = 3.25', '3.25 \\times 115 = 373.75 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the list price another way. The cost is 100 percent, and the mark-up adds 225 percent more. So the list price is 325 percent of the cost.', show: ['ck.p0', 'ck.p1', 'ck.below0', 'ck.below1', 'ck.lp', 'm.0'], focus: 'm.0' },
        { say: '3.25 times 115 is 373.75. The same list price. It checks out.', caption: '3.25 × 115 = 373.75. The same list price. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(a) \\$25.88', '225% is $2.25$, not $0.225$'],
            ['(b) \\$258.75', 'that is only the **mark-up**: add the **cost**'],
            ['(b) \\$340', 'added $225$ to $115$: 225% is a **percent of** $115$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'About 25 dollars and 88 cents uses 0.225. But 225 percent is 2.25: more than 1 whole.', caption: 'About $25.88 uses 0.225. But 225% is 2.25: more than 1 whole.' },
        { say: '258 dollars and 75 cents for part b is only the mark-up. The list price adds the cost too.', caption: '$258.75 for part (b) is only the mark-up. The list price adds the cost too.' },
        { say: 'And 340 dollars adds 225 to 115. But 225 percent is a percent of 115, not 225 dollars.', caption: 'And $340 adds 225 to 115. But 225% is a percent of 115, not $225.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is 150% of $60$?',
          choices: ['$9$', '$210$', '$90$', '$0.9$'],
          answer: 2,
          working: '150% = 1.5, and 1.5 × 60 = 90.',
        },
      ],
      lines: [
        { say: 'Your turn. What is 150 percent of 60? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '150 percent is 1.5. 1.5 times 60 is 90. It is more than 60, because 150 percent is more than the whole. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent to decimal: **divide by 100**', 'Over 100%: **more** than the whole', 'Mark-up $=$ rate $\\times$ cost', 'List price $=$ cost $+$ mark-up'] }],
      lines: [
        { say: 'Here is what to remember. To write a percent as a decimal, divide by 100.', show: 'sum.0' },
        { say: 'A percent over 100 is more than the whole amount.', show: 'sum.1' },
        { say: 'The mark-up is the rate times the cost.', show: 'sum.2' },
        { say: 'And the list price is the cost plus the mark-up. For more on percents greater than 100 percent and less than 1 percent, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
