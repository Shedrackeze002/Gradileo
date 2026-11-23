import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-3 lesson 5.1 (rate of change and initial value). The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 4.1, Linear Functions,
// CC BY-NC-SA 4.0). Three more sessions (2 to 5) add $260 − $125 = $135, so each session costs
// $135 / 3 = $45, as in the book's answer. The membership alone (the initial value) is
// $125 − 2($45) = $35, which the video uses as a check: $35 + 5($45) = $260.

const QUESTION =
  'A gym membership with two personal training sessions costs $125, while gym membership with five personal training sessions costs $260. What is cost per session?';

const g = plane({ x: [0, 6.5], y: [0, 300], yStep: 50, width: 10, height: 7.5, titles: { x: '\\text{sessions}', y: '\\text{cost } (\\$)' } });

/** The two prices, and with `line` the line through them back to the membership alone. */
const graph = (line: boolean, height = 460) =>
  figure(
    'g',
    [
      g,
      ...(line ? [plot(g, { id: 'line', f: (n) => 35 + 45 * n, from: 0, to: 6.2, tone: 'adj' })] : []),
      dots(g, [
        { id: 'p2', x: 2, y: 125, tex: '(2, 125)', tone: 'theta', place: 'below right', group: 'pts' },
        { id: 'p5', x: 5, y: 260, tex: '(5, 260)', tone: 'theta', place: 'below right', group: 'pts' },
        ...(line ? [{ id: 'p0', x: 0, y: 35, tex: '(0, 35)', tone: 'good' as const, place: 'below right' as const }] : []),
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m303-5-1',
  lessonId: '',
  exam: {
    lesson: 'm303-5-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 4.1, Linear Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/4-1-linear-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Cost of Each Training Session (Rate of Change)',
  thumbnailTitle: 'The Cost per Session',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: a gym membership with 2 personal training sessions costs $125, and with 5 sessions it costs $260. What does each session cost? Three more sessions add $135, so each session costs $135 ÷ 3 = $45. Then we check by finding the membership alone, $35, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Cost per Session', subtitle: 'Rate of change, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rate of change. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A gym membership with two personal training sessions costs \\$125, while gym membership with five personal training sessions costs \\$260. What is cost per session?',
          answer: '\\$45 per session',
          working: '$\\dfrac{260 - 125}{5 - 2} = \\dfrac{135}{3} = 45$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A gym membership with two personal training sessions costs 125 dollars, while gym membership with five personal training sessions costs 260 dollars. What is cost per session?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [graph(false)],
      right: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Sessions', 'Cost'],
          rows: [
            ['$2$', '\\$125'],
            ['$5$', '\\$260'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Each price includes the **membership** too, so we cannot just divide one price by its sessions.' },
      ],
      lines: [
        { say: 'Here are the two prices. 2 sessions cost 125 dollars, and 5 sessions cost 260 dollars.', show: ['g.grid', 'g.axes', 'g.pts', 'tab'] },
        { say: 'Each price includes the membership as well as the sessions. So we cannot just divide one price by its number of sessions.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{rate of change} = \\dfrac{\\text{change in cost}}{\\text{change in sessions}}'] },
        { kind: 'callout', id: 'iv', tone: 'key', title: 'Initial value', md: 'The cost at $0$ sessions: here, the **membership alone**.' },
      ],
      lines: [
        { say: 'Here is what we need. The rate of change is the change in cost divided by the change in the number of sessions.', show: 'f' },
        { say: 'And the initial value is the cost at 0 sessions, which here is the membership alone.', show: 'iv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **change** in sessions', 'Find the **change** in cost', '**Divide**: cost per session'] }],
      lines: [
        { say: 'Here is the plan. First, find how many more sessions the second deal has.', show: 'plan.0' },
        { say: 'Second, find how much more it costs.', show: 'plan.1' },
        { say: 'Third, divide, to get the cost of each session.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: More sessions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5 - 2 = \\good{3 \\text{ sessions}}'] }],
      lines: [
        { say: 'Step one. The second deal has 5 minus 2, which is 3 more sessions. The membership is the same in both.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: More cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['260 - 125 = \\good{135 \\text{ dollars}}'] }],
      lines: [
        { say: 'Step two. It costs 260 minus 125, which is 135 dollars more. Those 135 dollars pay for the 3 extra sessions, and nothing else.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{135}{3} = \\good{45 \\text{ dollars per session}}'] }],
      lines: [
        { say: 'Step three. 135 dollars for 3 sessions is 135 divided by 3, which is 45 dollars per session. That is the rate of change.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph(true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['125 - 2(45) = 35', '35 + 5(45) = 260 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. If each session is 45 dollars, the membership alone is 125 minus 2 times 45, which is 35 dollars. That is the initial value, where the line meets the cost axis.', show: ['g.grid', 'g.axes', 'g.pts', 'm.0', 'g.line', 'g.p0'], focus: 'g.p0' },
        { say: 'Then 5 sessions should cost 35 plus 5 times 45, which is 260 dollars, the price in the question. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$260 ÷ 5 = \\$52', 'the price includes the **membership**'],
            ['\\$125 ÷ 2 = \\$62.50', 'the same mistake with the other price'],
            ['\\$135', 'that pays for **3** sessions: divide by $3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '260 divided by 5 is 52 dollars, but the 260 dollars pays for the membership too.' },
        { say: '125 divided by 2 makes the same mistake with the other price.' },
        { say: 'And 135 dollars pays for 3 extra sessions, not one. Divide by 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A taxi ride of $4$ km costs \\$11, and a ride of $10$ km costs \\$20. What is the cost per kilometre?',
          choices: ['\\$2.00', '\\$2.75', '\\$9.00', '\\$1.50'],
          answer: 3,
          working: '$\\dfrac{20 - 11}{10 - 4} = \\dfrac{9}{6} = 1.5$, so \\$1.50 per km.',
        },
      ],
      lines: [
        { say: 'Your turn. A taxi ride of 4 kilometres costs 11 dollars, and a ride of 10 kilometres costs 20 dollars. What is the cost per kilometre? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The longer ride is 6 kilometres more and costs 9 dollars more. 9 divided by 6 is 1 dollar and 50 cents per kilometre: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rate of change: change in output $\\div$ change in input', 'Use the **differences** between two cases', 'Initial value: the output at **zero**', 'Check: initial value $+$ rate $\\times$ input'] }],
      lines: [
        { say: 'Here is what to remember. The rate of change is the change in the output divided by the change in the input.', show: 'sum.0' },
        { say: 'Use the differences between two cases, so that any fixed cost cancels out.', show: 'sum.1' },
        { say: 'The initial value is the output when the input is zero.', show: 'sum.2' },
        { say: 'And check that the initial value plus the rate times the input gives each case. For more on rate of change and initial value, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
