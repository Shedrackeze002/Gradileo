import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from '@/content/math8/videos/lib/m8-2-figures.ts';

// Exam question for Math 8 lesson 2.2 (percent of a number). The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 6.3, Solve Sales Tax, Commission, and Discount
// Applications, CC BY-NC-SA 4.0). 10.5% = 0.105, and 0.105 × 7420 = 779.1, so $779.10.
// Check: 10% is 742 and 0.5% is 37.10, together 779.10.

const QUESTION = 'Denise receives 10.5% commission when she books a tour at the travel agency. How much commission will she receive for booking a tour with total cost $7,420?';

const bar = (id: string, part: string) =>
  figure(
    id,
    [
      pieceBar({
        pieces: [
          { w: 1.05, below: part, tone: 'good' },
          { w: 8.95, tex: '\\text{the rest}', tone: 'adj' },
        ],
        brackets: [{ id: 'all', from: 0, to: 1, tex: '100\\% = \\$7{,}420', tone: 'adj' }],
      }),
    ],
    280,
  );

const video: Explainer = {
  id: 'xq-m8-2-2',
  lessonId: '',
  exam: {
    lesson: 'm8-2-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 6.3, Solve Sales Tax, Commission, and Discount Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-3-solve-sales-tax-commission-and-discount-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Denise’s Commission (Percent of a Number)',
  thumbnailTitle: 'Denise’s Commission',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Denise receives 10.5% commission when she books a tour. How much commission does she receive for a tour that costs $7,420 in total? The commission is 10.5% of $7,420. As a decimal, 10.5% is 0.105, and 0.105 × 7420 = 779.1, so she receives $779.10. We check by splitting 10.5% into 10% ($742) and 0.5% ($37.10), then look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Denise’s Commission', subtitle: 'Percent of a number, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about finding a percent of a number. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Denise receives 10.5% commission when she books a tour at the travel agency. How much commission will she receive for booking a tour with total cost \\$7,420?',
          answer: '\\$779.10',
          working: '0.105 × 7420 = 779.1',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Denise receives 10.5 percent commission when she books a tour at the travel agency. How much commission will she receive for booking a tour with total cost 7 thousand 420 dollars?', caption: 'Denise receives 10.5% commission when she books a tour at the travel agency. How much commission will she receive for booking a tour with total cost $7,420?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [bar('ask', '10.5\\% = \\ ?'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Commission', md: 'A **commission** is money a person earns as a **percent** of what they sell. Denise earns 10.5% **of** the tour\'s cost, so we want 10.5% of \\$7,420.' }],
      lines: [
        { say: 'A commission is money a person earns as a percent of what they sell.', show: 'c' },
        { say: 'The whole tour costs 7 thousand 420 dollars. That is 100 percent.', caption: 'The whole tour costs $7,420. That is 100%.', show: ['ask.p0', 'ask.p1', 'ask.all'] },
        { say: 'Denise gets 10.5 percent of it: a small slice, a little more than a tenth. How much is that slice?', show: 'ask.below0', focus: 'ask.p0' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{percent of a number} = \\text{decimal} \\times \\text{number}', '10.5\\% = \\dfrac{10.5}{100} = 0.105'] }],
      lines: [
        { say: 'Here is what we need. To find a percent of a number, write the percent as a decimal and multiply.', show: 'm.0' },
        { say: 'To write 10.5 percent as a decimal, divide by 100: move the decimal point to the left, by two places. 10.5 percent is 0.105.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write 10.5% as a **decimal**', '**Multiply** by the tour\'s cost', 'Write the answer in **dollars and cents**'] }],
      lines: [
        { say: 'Here is the plan. Write 10.5 percent as a decimal.', show: 'plan.0' },
        { say: 'Multiply by the cost of the tour.', show: 'plan.1' },
        { say: 'Then write the answer in dollars and cents.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Decimal, multiply, dollars',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['10.5\\% = \\adj{0.105}', '0.105 \\times 7420 = 779.1', '\\text{commission} = \\good{\\$779.10}'] }],
      lines: [
        { say: 'Step one. 10.5 percent is 0.105.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply 0.105 by 7 thousand 420. That gives 779.1.', caption: 'Step two. Multiply 0.105 × 7,420. That gives 779.1.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Money has two decimal places, so Denise receives 779 dollars and 10 cents.', caption: 'Step three. Money has two decimal places, so Denise receives $779.10.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [bar('ck', '10.5\\% = \\$779.10'), { kind: 'math', id: 'm', size: 'md', lines: ['10\\% \\text{ of } 7420 = 742, \\quad 0.5\\% \\text{ of } 7420 = 37.10', '742 + 37.10 = 779.10 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by splitting 10.5 percent into 10 percent and half a percent. 10 percent of 7 thousand 420 is 742. Half a percent is half of 1 percent, 74.20, so 37.10.', caption: 'Let us check by splitting 10.5% into 10% and 0.5%. 10% of 7,420 is 742. 0.5% is half of 1%, 74.20, so 37.10.', show: ['ck.p0', 'ck.p1', 'ck.all', 'm.0'], focus: 'm.0' },
        { say: '742 plus 37.10 is 779.10. The same answer. It checks out.', caption: '742 + 37.10 = 779.10. The same answer. It checks out.', show: ['m.1', 'ck.below0'], focus: 'm.1' },
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
            ['\\$77,910', 'multiplied by $10.5$: first **divide by 100**'],
            ['\\$7,791', 'used $1.05$: move the point **two** places, to $0.105$'],
            ['\\$6,640.90', 'took the commission **away**: the question asks for the commission'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '77 thousand 910 dollars multiplies by 10.5. A percent must be divided by 100 first. Besides, a commission is never more than the tour costs.', caption: '$77,910 multiplies by 10.5. A percent must be divided by 100 first. Besides, a commission is never more than the tour costs.' },
        { say: '7 thousand 791 dollars uses 1.05. The point moves two places, so 10.5 percent is 0.105.', caption: '$7,791 uses 1.05. The point moves two places, so 10.5% is 0.105.' },
        { say: 'And 6 thousand 640 dollars and 90 cents takes the commission away from the cost. The question asks for the commission itself.', caption: 'And $6,640.90 takes the commission away from the cost. The question asks for the commission itself.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A salesperson earns 4% commission. How much commission do they earn on a sale of \\$2,500?',
          choices: ['\\$100', '\\$1,000', '\\$10', '\\$2,400'],
          answer: 0,
          working: '4% = 0.04, and 0.04 × 2500 = 100, so \\$100.',
        },
      ],
      lines: [
        { say: 'Your turn. A salesperson earns 4 percent commission. How much commission do they earn on a sale of 2 thousand 500 dollars? Pause the video and try it.', caption: 'Your turn. A salesperson earns 4% commission. How much commission do they earn on a sale of $2,500? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '4 percent is 0.04. 0.04 times 2 thousand 500 is 100. They earn 100 dollars. Choice "A".', caption: '4% is 0.04. 0.04 × 2,500 = 100. They earn $100. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent to decimal: move the point **two** places left', 'Percent **of** a number: **multiply**', 'Check: split it into **easy** percents', 'Money: **two** decimal places'] }],
      lines: [
        { say: 'Here is what to remember. To write a percent as a decimal, move the decimal point to the left, by two places.', show: 'sum.0' },
        { say: 'To find a percent of a number, multiply.', show: 'sum.1' },
        { say: 'Check by splitting the percent into easy ones, like 10 percent and 1 percent.', show: 'sum.2' },
        { say: 'And write money with two decimal places. For more on percent of a number, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
