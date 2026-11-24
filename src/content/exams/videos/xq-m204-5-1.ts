import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-4 lesson 5.1 (using formulas). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 11.2, Graphing Linear Equations, CC BY-NC-SA 4.0).
// y = 200 + 0.15x: x = 900 gives 200 + 135 = $335, x = 1,600 gives 200 + 240 = $440, and x = 2,000
// gives 200 + 300 = $500. Check: 400 more in sales from 1,600 to 2,000 is 0.15 × 400 = 60 more pay,
// and 440 + 60 = 500.

const QUESTION =
  'Weekly earning At the art gallery where he works, Salvador gets paid $200 per week plus 15% of the sales he makes, so the equation y = 200 + 0.15x gives the amount y he earns for selling x dollars of artwork. Calculate the amount Salvador earns for selling $900, $1,600, and $2,000, and then graph the line.';

const POINTS: [number, number][] = [[900, 335], [1600, 440], [2000, 500]];

const money = (v: number) => (v >= 1000 ? `${Math.floor(v / 1000)}{,}${String(v % 1000).padStart(3, '0')}` : `${v}`);

/** Salvador's pay: the three points, and the line through them once `line` is set. */
const pay = () => {
  const g = plane({ x: [0, 2400], y: [0, 600], xStep: 400, yStep: 100, width: 8, height: 5, titles: { x: '\\text{sales (\\$)}', y: '\\text{pay (\\$)}' }, xTex: (v) => (v % 800 === 0 ? money(v) : '') });
  return figure(
    'g',
    [
      g,
      polyline(g, { id: 'line', points: [[0, 200], [2400, 560]], tone: 'adj' }),
      dots(g, POINTS.map(([x, y], i) => ({ id: `p${i}`, x, y, tex: `${y}`, tone: 'good', place: 'below right' as const }))),
    ],
    440,
  );
};

const video: Explainer = {
  id: 'xq-m204-5-1',
  lessonId: '',
  exam: {
    lesson: 'm204-5-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 11.2, Graphing Linear Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-2-graphing-linear-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Base Pay Plus Commission (Using Formulas)',
  thumbnailTitle: 'What Does Salvador Earn?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: Salvador earns $200 a week plus 15% of his art sales, so y = 200 + 0.15x gives his pay y for x dollars of sales. Substituting gives $335 for $900 of sales, $440 for $1,600 and $500 for $2,000. Then we plot the three points and draw the line, check the answers, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does Salvador Earn?', subtitle: 'Using a formula, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using a formula. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            '**Weekly earning** At the art gallery where he works, Salvador gets paid \\$200 per week plus $15\\%$ of the sales he makes, so the equation $y = 200 + 0.15x$ gives the amount $y$ he earns for selling $x$ dollars of artwork. Calculate the amount Salvador earns for selling \\$900, \\$1,600, and \\$2,000, and then graph the line.',
          answer: '\\$335, \\$440, \\$500',
          working: '200 + 0.15 × 900 = 335; 200 + 0.15 × 1,600 = 440; 200 + 0.15 × 2,000 = 500',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'At the art gallery where he works, Salvador gets paid 200 dollars per week, plus 15 percent of the sales he makes. So the equation y equals 200 plus 0.15 x gives the amount y he earns, for selling x dollars of artwork.', caption: 'At the art gallery where he works, Salvador gets paid $200 per week, plus 15% of the sales he makes. So the equation y = 200 + 0.15x gives the amount y he earns, for selling x dollars of artwork.' },
        { say: 'Calculate what Salvador earns for selling 900, 1 thousand 600, and 2 thousand dollars of art. Then graph the line.', caption: 'Calculate what Salvador earns for selling $900, $1,600 and $2,000 of art. Then graph the line.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 200 + 0.15x'] },
        { kind: 'bullets', id: 'k', items: ['$x$ is the **sales**, in dollars', '$200$ is the **base pay** each week', '$0.15x$ is the **commission**, $15\\%$ of sales', '$y$ is his **total pay**'] },
      ],
      lines: [
        { say: 'This equation is a formula for Salvador’s pay. Each letter stands for an amount.', show: 'm' },
        { say: 'x is his sales, in dollars.', show: 'k.0' },
        { say: '200 is his base pay. He gets it every week, even if he sells nothing.', show: 'k.1' },
        { say: '0.15 x is his commission, 15 percent of his sales.', show: 'k.2' },
        { say: 'And y is his total pay for the week.', show: 'k.3' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'key', title: 'Substitute', md: 'Put the number in place of the letter, in **brackets**: $x = 900$ makes $0.15x$ into $0.15(900)$.' },
        { kind: 'callout', id: 'b', tone: 'key', title: 'Order of operations', md: '**Multiply** before you **add**: find $0.15x$ first, then add the $200$.' },
      ],
      lines: [
        { say: 'Here is what we need. To use a formula, substitute: put the number in place of the letter, in brackets. So x equals 900 turns 0.15 x into 0.15 times 900.', show: 'a' },
        { say: 'Then follow the order of operations. Multiply before you add: find the commission first, then add the 200.', show: 'b' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Substitute** each sales amount for $x$', 'Find the **commission**, then **add** \\$200', '**Plot** the points and draw the **line**'] }],
      lines: [
        { say: 'Here is the plan. Substitute each sales amount for x.', show: 'plan.0' },
        { say: 'Find the commission, then add the 200 dollars.', show: 'plan.1' },
        { say: 'Then plot the three points and draw the line through them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The pay',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'y = 200 + 0.15(900) = 200 + 135 = \\good{\\$335}',
            'y = 200 + 0.15(1{,}600) = 200 + 240 = \\good{\\$440}',
            'y = 200 + 0.15(2{,}000) = 200 + 300 = \\good{\\$500}',
          ],
        },
      ],
      lines: [
        { say: 'Sales of 900 dollars. 0.15 times 900 is 135 dollars of commission. Add the 200: Salvador earns 335 dollars.', caption: 'Sales of $900. 0.15 × 900 = $135 of commission. Add the $200: Salvador earns $335.', show: 'm.0', focus: 'm.0' },
        { say: 'Sales of 1 thousand 600 dollars. 0.15 times 1 thousand 600 is 240. Add the 200: he earns 440 dollars.', caption: 'Sales of $1,600. 0.15 × 1,600 = $240. Add the $200: he earns $440.', show: 'm.1', focus: 'm.1' },
        { say: 'Sales of 2 thousand dollars. 0.15 times 2 thousand is 300. Add the 200: he earns 500 dollars.', caption: 'Sales of $2,000. 0.15 × 2,000 = $300. Add the $200: he earns $500.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The graph',
      layout: 'split',
      leftWidth: 640,
      left: [pay()],
      right: [{ kind: 'table', id: 't', head: ['Sales $x$', 'Pay $y$'], rows: [['\\$900', '\\$335'], ['\\$1,600', '\\$440'], ['\\$2,000', '\\$500']] }],
      lines: [
        { say: 'Now the graph. Sales go across the bottom, and pay goes up the side. Each point is a pair from our table.', show: ['g.grid', 'g.axes', 't'] },
        { say: '900 dollars of sales and 335 dollars of pay.', caption: '$900 of sales and $335 of pay.', show: 'g.p0', focus: ['g.p0', 't.0'] },
        { say: '1 thousand 600 and 440.', caption: '$1,600 and $440.', show: 'g.p1', focus: ['g.p1', 't.1'] },
        { say: '2 thousand and 500.', caption: '$2,000 and $500.', show: 'g.p2', focus: ['g.p2', 't.2'] },
        { say: 'The points lie in a straight line, so we draw the line through them. It meets the pay axis at 200, his base pay, when he sells nothing.', show: 'g.line', focus: 'g.line' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\$2{,}000 - \\$1{,}600 = \\$400 \\text{ more sales}', '0.15 \\times 400 = \\$60 \\text{ more pay}', '\\$440 + \\$60 = \\$500 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Going from 1 thousand 600 to 2 thousand is 400 dollars more in sales.', caption: 'Let us check. Going from $1,600 to $2,000 is $400 more in sales.', show: 'm.0' },
        { say: 'He earns 15 percent of that extra, which is 60 dollars more pay.', caption: 'He earns 15% of that extra, which is $60 more pay.', show: 'm.1' },
        { say: '440 plus 60 is 500, which matches. It checks out.', caption: '$440 + $60 = $500, which matches. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['\\$135', 'left out the \\$200 **base pay**'],
            ['\\$1,100', 'added the **sales**: multiply by $0.15$ first'],
            ['\\$13,700', 'used $15$: $15\\%$ is $0.15$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps, for 900 dollars of sales.', caption: 'Here are the traps, for $900 of sales.', show: 'traps' },
        { say: '135 dollars is only the commission. Add the 200 dollars of base pay.', caption: '$135 is only the commission. Add the $200 of base pay.' },
        { say: '1 thousand 100 dollars adds the whole 900 dollars of sales. Salvador only gets 15 percent of it, so multiply first.', caption: '$1,100 adds the whole $900 of sales. Salvador only gets 15% of it, so multiply first.' },
        { say: 'And 13 thousand 700 multiplies by 15 instead of 0.15. His pay can not be far more than his sales.', caption: 'And $13,700 multiplies by 15 instead of 0.15. His pay can not be far more than his sales.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A car salesperson’s weekly pay is $y = 300 + 0.05x$, where $x$ is the week’s sales in dollars. What is the pay for a week with \\$4,000 of sales?',
          choices: ['\\$20,300', '\\$500', '\\$200', '\\$4,300'],
          answer: 1,
          working: '0.05 × 4,000 = 200, and 300 + 200 = 500.',
        },
      ],
      lines: [
        { say: 'Your turn. A salesperson’s weekly pay is y equals 300 plus 0.05 x, where x is the week’s sales in dollars. What is the pay for a week with 4 thousand dollars of sales? Pause the video and try it.', caption: 'Your turn. A salesperson’s weekly pay is y = 300 + 0.05x, where x is the week’s sales in dollars. What is the pay for a week with $4,000 of sales? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '0.05 times 4 thousand is 200. Add the 300: 500 dollars. Choice "B".', caption: '0.05 × 4,000 = 200. Add the 300: $500. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Know what each **letter** means', '**Substitute** the number, in brackets', '**Multiply** before you **add**', 'Plot the pairs to **graph** the line'] }],
      lines: [
        { say: 'Here is what to remember. Know what each letter in the formula stands for.', show: 'sum.0' },
        { say: 'Substitute the number for the letter, in brackets.', show: 'sum.1' },
        { say: 'Multiply before you add.', show: 'sum.2' },
        { say: 'And plot the pairs to graph the line. For more on using formulas, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
