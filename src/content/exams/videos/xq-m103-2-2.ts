import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10-3 lesson 2.2 (salary, commission and piecework). The question is a Try
// It from OpenStax Prealgebra 2e, word for word (section 6.3, Solve Sales Tax, Commission, and
// Discount Applications, CC BY-NC-SA 4.0). $1,140 is what percent of $28,500? 1,140 ÷ 28,500 =
// 0.04 = 4%, as in the book's answer. Check: 4% of $28,500 is 0.04 × 28,500 = $1,140.

const QUESTION = 'Homer received $1,140 commission when he sold a car for $28,500. What rate of commission did he get?';

const video: Explainer = {
  id: 'xq-m103-2-2',
  lessonId: '',
  exam: {
    lesson: 'm103-2-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 6.3, Solve Sales Tax, Commission, and Discount Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/6-3-solve-sales-tax-commission-and-discount-applications',
    question: QUESTION,
  },
  title: 'Exam Question: Find the Rate of Commission on a Car Sale (Salary and Commission)',
  thumbnailTitle: 'What Rate of Commission?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: Homer earned $1,140 commission for selling a car for $28,500. What rate of commission did he get? Commission = rate × sales, so the rate is 1,140 ÷ 28,500 = 0.04, which is 4%. Then we check by finding 4% of $28,500 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Rate of Commission?', subtitle: 'Commission, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about commission. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Homer received \\$1,140 commission when he sold a car for \\$28,500. What rate of commission did he get?',
          answer: '$4\\%$',
          working: '$1{,}140 \\div 28{,}500 = 0.04$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Homer received 1,140 dollars commission when he sold a car for 28,500 dollars. What rate of commission did he get?' },
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
            ['the sale: \\$28,500', 'the **rate** of commission:'],
            ['the commission: \\$1,140', 'what **percent** of the sale he earned'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we know: the price of the car, and the commission Homer earned on it.', show: 'tab' },
        { say: 'We want the rate of commission: what percent of the sale he was paid. It is the question: 1,140 is what percent of 28,500?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{commission} = \\text{rate} \\times \\text{total sales}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Working backwards', md: 'To find the **rate**, divide: rate $= \\dfrac{\\text{commission}}{\\text{sales}}$. Then change the decimal to a **percent**.' },
      ],
      lines: [
        { say: 'Here is what we need. Commission is the rate times the total sales.', show: 'f' },
        { say: 'To find the rate, work backwards: divide the commission by the sales. Then change the decimal to a percent.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **equation**', '**Divide** to find the rate', 'Change to a **percent**'] }],
      lines: [
        { say: 'Here is the plan. Write the equation.', show: 'plan.0' },
        { say: 'Divide to find the rate.', show: 'plan.1' },
        { say: 'Then change it to a percent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1{,}140 = r \\times 28{,}500'] }],
      lines: [
        { say: 'Step one. Let r be the rate. The commission, 1,140, equals r times the sale, 28,500.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r = \\dfrac{1{,}140}{28{,}500}', 'r = 0.04'] }],
      lines: [
        { say: 'Step two. Divide both sides by 28,500.', show: 'm.0' },
        { say: '1,140 divided by 28,500 is 0.04.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: A percent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.04 \\times 100\\% = \\good{4\\%}'] }],
      lines: [
        { say: 'Step three. To change a decimal to a percent, multiply by 100. 0.04 is 4 percent. Homer\'s rate of commission is 4 percent.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4\\% \\text{ of } \\$28{,}500 = 0.04 \\times 28{,}500', '= \\$1{,}140 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going forwards. 4 percent of 28,500 is 0.04 times 28,500.', show: 'm.0' },
        { say: 'That is 1,140 dollars, exactly Homer\'s commission. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$28{,}500 \\div 1{,}140 = 25$', 'divided the **wrong way**: commission over sales'],
            ['"$0.04\\%$"', '$0.04$ is a decimal: it is $4\\%$'],
            ['$1{,}140 \\times 28{,}500$', 'multiply only to find the **commission**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing the sale by the commission gives 25, which is not a rate. Divide the commission by the sale.' },
        { say: '0.04 is a decimal, not a percent. Multiply by 100 to get 4 percent.' },
        { say: 'And you multiply only when you know the rate and want the commission.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A salesperson earns a $6\\%$ commission. How much must she sell to earn \\$1,500 in commission?',
          choices: ['\\$90', '\\$9,000', '\\$25,000', '\\$2,500'],
          answer: 2,
          working: '$1{,}500 = 0.06 \\times S$, so $S = 1{,}500 \\div 0.06 = 25{,}000$.',
        },
      ],
      lines: [
        { say: 'Your turn. A salesperson earns a 6 percent commission. How much must she sell to earn 1,500 dollars in commission? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '1,500 equals 0.06 times the sales. Divide: 1,500 divided by 0.06 is 25,000 dollars. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Commission $=$ rate $\\times$ sales', 'Rate $=$ commission $\\div$ sales', 'Decimal to percent: $\\times 100$', 'Check by finding the commission'] }],
      lines: [
        { say: 'Here is what to remember. Commission is the rate times the sales.', show: 'sum.0' },
        { say: 'To find the rate, divide the commission by the sales.', show: 'sum.1' },
        { say: 'Multiply by 100 to change the decimal to a percent.', show: 'sum.2' },
        { say: 'And check by finding the commission from your rate. For more on salary, commission and piecework, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
