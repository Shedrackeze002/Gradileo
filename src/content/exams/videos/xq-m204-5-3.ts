import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-4 lesson 5.3 (tables and graphs). The question is an Exercise from
// OpenStax Prealgebra 2e, word for word (section 11.2, Graphing Linear Equations, CC BY-NC-SA 4.0).
// y = 594 + 0.32x: 400 miles gives 594 + 128 = $722, 800 gives 594 + 256 = $850 and 1,200 gives
// 594 + 384 = $978, as in the book's answers. Check: each 400 more miles adds 0.32 × 400 = $128.

const QUESTION =
  'Motor home cost The Robinsons rented a motor home for one week to go on vacation. It cost them $594 plus $0.32 per mile to rent the motor home, so the linear equation y = 594 + 0.32x gives the cost, y, for driving x miles. Calculate the rental cost for driving 400, 800, and 1,200 miles, and then graph the line.';

const POINTS: [number, number][] = [[400, 722], [800, 850], [1200, 978]];

const num = (v: number) => (v >= 1000 ? `${Math.floor(v / 1000)}{,}${String(v % 1000).padStart(3, '0')}` : `${v}`);

/** The rental cost: the three points from the table, and the line through them. */
const cost = () => {
  const g = plane({ x: [0, 1600], y: [0, 1200], xStep: 400, yStep: 200, width: 8, height: 5, titles: { x: '\\text{miles}', y: '\\text{cost (\\$)}' }, xTex: num, yTex: num });
  return figure(
    'g',
    [
      g,
      polyline(g, { id: 'line', points: [[0, 594], [1600, 1106]], tone: 'adj' }),
      dots(g, [{ id: 'start', x: 0, y: 594, tex: '594', tone: 'muted', place: 'below right' }]),
      dots(g, POINTS.map(([x, y], i) => ({ id: `p${i}`, x, y, tex: `${y}`, tone: 'good', place: 'below right' as const }))),
    ],
    440,
  );
};

const TABLE = { kind: 'table' as const, id: 't', head: ['Miles $x$', '$594 + 0.32x$', 'Cost $y$'], rows: [['$400$', '$594 + 128$', '\\$722'], ['$800$', '$594 + 256$', '\\$850'], ['$1{,}200$', '$594 + 384$', '\\$978']] };

const video: Explainer = {
  id: 'xq-m204-5-3',
  lessonId: '',
  exam: {
    lesson: 'm204-5-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 11.2, Graphing Linear Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-2-graphing-linear-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Renting a Motor Home (Tables and Graphs)',
  thumbnailTitle: 'What Does the Motor Home Cost?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: a motor home costs $594 for the week plus $0.32 a mile, so y = 594 + 0.32x gives the cost y for x miles. We make a table of values: 400 miles cost $722, 800 miles cost $850 and 1,200 miles cost $978. Then we plot the points and draw the line, see that every 400 miles adds $128, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'What Does the Motor Home Cost?', subtitle: 'Tables and graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a table of values and a graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
            '**Motor home cost** The Robinsons rented a motor home for one week to go on vacation. It cost them \\$594 plus \\$0.32 per mile to rent the motor home, so the linear equation $y = 594 + 0.32x$ gives the cost, $y$, for driving $x$ miles. Calculate the rental cost for driving $400$, $800$, and $1{,}200$ miles, and then graph the line.',
          answer: '\\$722, \\$850, \\$978',
          working: '594 + 0.32 × 400 = 722; 594 + 0.32 × 800 = 850; 594 + 0.32 × 1,200 = 978',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The Robinsons rented a motor home for one week. It cost them 594 dollars, plus 32 cents per mile. So the equation y equals 594 plus 0.32 x gives the cost y, for driving x miles.', caption: 'The Robinsons rented a motor home for one week. It cost them $594, plus $0.32 per mile. So the equation y = 594 + 0.32x gives the cost y, for driving x miles.' },
        { say: 'Calculate the rental cost for driving 400, 800, and 1 thousand 200 miles. Then graph the line.', caption: 'Calculate the rental cost for driving 400, 800, and 1,200 miles. Then graph the line.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 594 + 0.32x'] },
        { kind: 'bullets', id: 'k', items: ['$594$: the **fixed** cost for the week', '$0.32x$: **\\$0.32** for **each** mile', '$y$: the **total** cost'] },
      ],
      lines: [
        { say: 'This rule has two parts. 594 dollars is the fixed cost. They pay it once, even if they drive nowhere.', show: ['m', 'k.0'] },
        { say: '0.32 x is 32 cents for each mile they drive.', show: 'k.1' },
        { say: 'And y is the total cost.', show: 'k.2' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Table of values', md: 'Pick values of $x$, **substitute** each one into the rule, and write each $x$ with its $y$.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Graphing', md: 'Each row is a **point** $(x, y)$. When the points lie in a straight line, draw the **line** through them.' },
      ],
      lines: [
        { say: 'Here is what we need. To make a table of values, pick values of x, substitute each one into the rule, and write each x with its y.', show: 'a' },
        { say: 'Each row of the table is a point. When the points lie in a straight line, draw the line through them.', show: 'b' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Make a **table** for $400$, $800$ and $1{,}200$ miles', '**Plot** the points', 'Draw the **line**'] }],
      lines: [
        { say: 'Here is the plan. Make a table of values for 400, 800 and 1 thousand 200 miles.', caption: 'Here is the plan. Make a table of values for 400, 800 and 1,200 miles.', show: 'plan.0' },
        { say: 'Plot the points.', show: 'plan.1' },
        { say: 'Then draw the line.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The table',
      layout: 'center',
      main: [TABLE],
      lines: [
        { say: 'Step one. 400 miles: 0.32 times 400 is 128. Add the 594: 722 dollars.', caption: 'Step one. 400 miles: 0.32 × 400 = 128. Add the 594: $722.', show: 't', focus: 't.0' },
        { say: '800 miles: 0.32 times 800 is 256. Add 594: 850 dollars.', caption: '800 miles: 0.32 × 800 = 256. Add 594: $850.', focus: 't.1' },
        { say: '1 thousand 200 miles: 0.32 times 1 thousand 200 is 384. Add 594: 978 dollars.', caption: '1,200 miles: 0.32 × 1,200 = 384. Add 594: $978.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: The graph',
      layout: 'split',
      leftWidth: 640,
      left: [cost()],
      right: [{ kind: 'table', id: 'pts', head: ['$x$', '$y$'], rows: [['$400$', '$722$'], ['$800$', '$850$'], ['$1{,}200$', '$978$']] }],
      lines: [
        { say: 'Step two. Miles go across the bottom, and the cost goes up the side. Plot each row as a point.', show: ['g.grid', 'g.axes', 'pts'] },
        { say: '400 and 722.', show: 'g.p0', focus: ['g.p0', 'pts.0'] },
        { say: '800 and 850.', show: 'g.p1', focus: ['g.p1', 'pts.1'] },
        { say: '1 thousand 200 and 978.', caption: '1,200 and 978.', show: 'g.p2', focus: ['g.p2', 'pts.2'] },
        { say: 'Step three. The points lie in a straight line, so draw the line through them. It meets the cost axis at 594, the cost for driving zero miles.', show: ['g.line', 'g.start'], focus: ['g.line', 'g.start'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.32 \\times 400 = \\$128 \\text{ for each 400 miles}', '722 + 128 = 850, \\quad 850 + 128 = 978 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Each row is 400 miles more than the last, and 400 more miles cost 0.32 times 400, which is 128 dollars more.', caption: 'Let us check. Each row is 400 miles more than the last, and 400 more miles cost 0.32 × 400 = $128 more.', show: 'm.0' },
        { say: '722 plus 128 is 850, and 850 plus 128 is 978. The costs go up by the same amount each time, which is why the graph is a straight line. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$128 for 400 miles', 'left out the \\$594 **fixed** cost'],
            ['\\$994 for 400 miles', 'added the **miles**: multiply by $0.32$ first'],
            ['\\$1,444 for 800 miles', 'doubled \\$722: the \\$594 is paid **once**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '128 dollars for 400 miles is only the mileage. Add the 594 dollar fixed cost.', caption: '$128 for 400 miles is only the mileage. Add the $594 fixed cost.' },
        { say: '994 dollars adds 400 miles as if each mile cost a dollar. Multiply the miles by 0.32 first.', caption: '$994 adds 400 miles as if each mile cost a dollar. Multiply the miles by 0.32 first.' },
        { say: 'And 1 thousand 444 dollars for 800 miles doubles the 722. But the 594 is paid only once, so only the mileage doubles.', caption: 'And $1,444 for 800 miles doubles the $722. But the $594 is paid only once, so only the mileage doubles.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The cost to rent a hall is $y = 200 + 15x$ dollars, where $x$ is the number of guests. What does the hall cost for $40$ guests?',
          choices: ['\\$800', '\\$8,600', '\\$600', '\\$255'],
          answer: 0,
          working: '15 × 40 = 600, and 200 + 600 = 800.',
        },
      ],
      lines: [
        { say: 'Your turn. The cost to rent a hall is y equals 200 plus 15 x dollars, where x is the number of guests. What does the hall cost for 40 guests? Pause the video and try it.', caption: 'Your turn. The cost to rent a hall is y = 200 + 15x dollars, where x is the number of guests. What does the hall cost for 40 guests? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '15 times 40 is 600. Add the 200: 800 dollars. Choice "A".', caption: '15 × 40 = 600. Add the 200: $800. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Substitute** each $x$ to fill the table', 'The **fixed** cost is paid once', 'Each row is a **point** to plot', 'Equal steps make a **straight line**'] }],
      lines: [
        { say: 'Here is what to remember. Substitute each x into the rule to fill the table.', show: 'sum.0' },
        { say: 'A fixed cost is paid only once.', show: 'sum.1' },
        { say: 'Each row of the table is a point to plot.', show: 'sum.2' },
        { say: 'And when y goes up by equal steps, the graph is a straight line. For more on tables and graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
