import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The phone bill: a $20 fee and $5 for each of g GB, $45 in all.
const bill = (id: string) =>
  figure(
    id,
    [
      bars({
        rows: [
          {
            id: 'b',
            pieces: [
              { w: 4, tex: '\\$20 \\text{ fee}', tone: 'opp' },
              { w: 5, tex: '5g', tone: 'adj' },
            ],
          },
        ],
        total: '\\$45',
      }),
    ],
    200,
  );

const video: Explainer = {
  id: 'm8-7-4',
  lessonId: 'm8-7-4',
  title: 'Solving Problems with Equations, Part 1: From Words to an Equation',
  thumbnailTitle: 'From Words to an Equation',
  thumbnail: 'bl',
  summary:
    'Four steps for any problem: choose a letter for the unknown and say what it means; write an equation that says the same as the words; solve it; check the answer in the problem. "Each" or "per" usually means multiply, a starting fee is added once, and "shared equally" means divide. A phone plan of $20 a month plus $5 for each GB, with a $45 bill, gives 5g + 20 = 45, so g = 5 GB. Writing 20g + 5 = 45 mixes up the rate and the fee.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 1', title: 'From Words to an Equation', subtitle: 'Four steps for any problem' }],
      lines: [
        { say: 'You can now solve one-step, two-step and bracket equations. The last skill is turning a real problem into an equation.', show: 'title' },
        { say: 'In this part, you will learn four steps for any problem. Once the equation is written, the problem is mostly solved.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**1.** Choose a letter for the unknown, and say what it means.', '**2.** Write an equation that says the same thing as the words.', '**3.** Solve the equation.', '**4.** Check the answer **in the problem**, not just in your equation.'],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Words to look for', md: '“Each” or “per” usually means **multiply**. A starting fee is **added once**. “Shared equally” means **divide**.' },
      ],
      lines: [
        { say: 'Use these four steps for any problem. Step one: choose a letter for the unknown, and say what it stands for.', show: 'b.0' },
        { say: 'Step two: write an equation that says the same thing as the words.', show: 'b.1' },
        { say: 'Step three: solve the equation.', show: 'b.2' },
        { say: 'Step four: check the answer in the problem, not just in your equation. If you wrote the wrong equation, checking in the equation will not catch it.', show: 'b.3' },
        { say: 'Some words point to operations. Each, or per, usually means multiply. A starting fee or a starting amount is added once. And shared equally means divide.', show: 'key' },
      ],
    },
    {
      chapter: 'A phone bill',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A phone plan costs \\$20 a month plus \\$5 for each GB of data. Last month, Priya’s bill was \\$45. How much data did Priya use?' },
        bill('bl'),
        { kind: 'math', id: 'm', size: 'md', lines: ['5g + 20 = 45 \\qquad 5g = 25 \\qquad g = 5', '\\text{Check: } 5 \\times 5 = 25, \\quad 25 + 20 = 45 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'A phone plan costs twenty dollars a month, plus five dollars for each gigabyte of data. Last month, the bill for Priya was forty-five dollars. How much data did Priya use?', show: 'q' },
        { say: 'Step one: let g stand for the number of gigabytes used.' },
        { say: 'Step two: five dollars for each gigabyte is five g. The twenty dollar fee is added once. Together they make forty-five dollars. So five g plus twenty equals forty-five.', show: ['bl.b-p0', 'bl.b-p1', 'bl.total'] },
        { say: 'Step three: subtract twenty from both sides, so five g equals twenty-five. Divide both sides by five: g equals five.', show: 'm.0', focus: 'm.0' },
        { say: 'Step four: check in the problem. Five gigabytes cost five times five, or twenty-five dollars. Add the twenty dollar fee, and the bill is forty-five dollars. It works. Priya used five gigabytes of data.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the rate and the fixed amount', md: 'Writing $20g + 5 = 45$ would mean \\$20 for **each** GB plus a \\$5 fee. The number that goes with the variable is the amount **per** GB.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['20g + 5 = 45 \\;\\bad{\\times} \\qquad 5g + 20 = 45 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some students write twenty g plus five equals forty-five.', show: 'oops' },
        { say: 'That equation means twenty dollars for each gigabyte, plus a five dollar fee. That is not the plan in the question.', show: 'm.0', focus: 'm.0' },
        { say: 'The number that goes with the variable is the rate: the amount for each one. Here, that is five dollars per gigabyte.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gym charges a \\$30 joining fee plus \\$15 for each month. A member has paid \\$120 in all. Which equation gives the number of months, $m$?',
          choices: ['$15m + 30 = 120$', '$30m + 15 = 120$', '$15m - 30 = 120$', '$45m = 120$'],
          answer: 0,
          working: '\\$15 for each month is $15m$, and the \\$30 fee is added once: $15m + 30 = 120$. Then $15m = 90$ and $m = 6$ months.',
        },
      ],
      lines: [
        { say: 'Your turn. A gym charges a thirty dollar joining fee, plus fifteen dollars for each month. A member has paid one hundred twenty dollars in all. Which equation gives the number of months, m? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen dollars for each month is fifteen m, and the thirty dollar fee is added once. Then fifteen m is ninety, so m is six months. Choice B mixes up the rate and the fee: it charges thirty dollars for each month.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Choose a letter for the unknown, and say what it means.',
            'Write an equation: a rate multiplies the variable, and a fixed amount is added once.',
            'Solve the equation.',
            'Check the answer in the problem, and give it in a sentence with units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, choose a letter for the unknown, and say what it means.', show: 'sum.0' },
        { say: 'Write an equation that matches the words. A rate multiplies the variable, and a fixed amount is added once.', show: 'sum.1' },
        { say: 'Solve the equation.', show: 'sum.2' },
        { say: 'Then check the answer in the problem, and give it in a sentence, with units. In the next part, you will solve problems with integers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
