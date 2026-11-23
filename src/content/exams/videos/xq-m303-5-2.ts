import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-3 lesson 5.2 (the equation y = mx + b). The question is an exercise
// from OpenStax Elementary Algebra 2e, word for word (section 4.5, Use the Slope-Intercept Form of
// an Equation of a Line, CC BY-NC-SA 4.0), with the book's circled letters written (a) to (d). The
// book prints no answer for it. (a) S = 400. (b) S = 400 + 0.15(3,600) = 940. (c) The slope 0.15
// means her salary rises $0.15 for each $1 of sales (a 15% commission); the S-intercept 400 is her
// salary in a week with no sales. (d) The line through (0, 400) and (3,600, 940).

const QUESTION =
  'Cherie works in retail and her weekly salary includes commission for the amount she sells. The equation S=400+0.15c models the relation between her weekly salary, S, in dollars and the amount of her sales, c, in dollars. (a) Find Cherie’s salary for a week when her sales were 0. (b) Find Cherie’s salary for a week when her sales were 3600. (c) Interpret the slope and S–intercept of the equation. (d) Graph the equation.';

const g = plane({
  x: [0, 5000],
  y: [0, 1200],
  xStep: 1000,
  yStep: 200,
  width: 10,
  height: 7,
  xTex: (x) => (x >= 1000 ? `${x / 1000}{,}000` : `${x}`),
  yTex: (y) => (y >= 1000 ? `${y / 1000}{,}${String(y % 1000).padStart(3, '0')}` : `${y}`),
  titles: { x: '\\text{sales } c\\ (\\$)', y: '\\text{salary } S\\ (\\$)' },
});

/** The graph of S = 400 + 0.15c, with its two worked points. */
const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      dots(g, [
        { id: 'p0', x: 0, y: 400, tex: '(0, 400)', tone: 'theta', place: 'below right' },
        { id: 'p1', x: 3600, y: 940, tex: '(3{,}600, 940)', tone: 'opp', place: 'below right' },
      ]),
      plot(g, { id: 'line', f: (c) => 400 + 0.15 * c, from: 0, to: 5000, tone: 'adj' }),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m303-5-2',
  lessonId: '',
  exam: {
    lesson: 'm303-5-2',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 4.5, Use the Slope-Intercept Form of an Equation of a Line',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-5-use-the-slope-intercept-form-of-an-equation-of-a-line',
    question: QUESTION,
  },
  title: 'Exam Question: A Salary With Commission, S = 400 + 0.15c (Linear Equations)',
  thumbnailTitle: 'Salary Plus Commission',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: Cherie\'s weekly salary is S = 400 + 0.15c, where c is her sales in dollars. (a) With no sales, S = 400. (b) With $3,600 of sales, S = 400 + 540 = 940. (c) The slope means she earns $0.15 for every $1 she sells, and the S-intercept is her salary with no sales. (d) We graph the line through (0, 400) and (3,600, 940). Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Salary Plus Commission', subtitle: 'Linear equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a linear equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Cherie works in retail and her weekly salary includes commission for the amount she sells. The equation $S = 400 + 0.15c$ models the relation between her weekly salary, $S$, in dollars and the amount of her sales, $c$, in dollars. (a) Find Cherie’s salary for a week when her sales were $0$. (b) Find Cherie’s salary for a week when her sales were $3600$. (c) Interpret the slope and $S$–intercept of the equation. (d) Graph the equation.',
          answer: '(a) \\$400 (b) \\$940 (c) \\$0.15 more per \\$1 of sales; \\$400 with no sales (d) the line through $(0, 400)$ and $(3600, 940)$',
          working: '(b) $400 + 0.15(3600) = 400 + 540 = 940$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Cherie works in retail and her weekly salary includes commission for the amount she sells. The equation S equals 400 plus 0.15 c models the relation between her weekly salary, S, in dollars, and the amount of her sales, c, in dollars.' },
        { say: 'Part "a": find Cherie’s salary for a week when her sales were 0. Part b: find her salary for a week when her sales were 3,600. Part c: interpret the slope and S-intercept of the equation. Part d: graph the equation.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Cherie earns a **fixed** amount each week, plus a **commission**: a share of every dollar she sells. The equation turns her sales into her salary.' }],
      lines: [
        { say: 'Cherie earns a fixed amount each week, plus a commission, which is a share of every dollar she sells.', show: 't' },
        { say: 'The equation turns her sales, c, into her salary, S. We use it, explain its two numbers, and draw it.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['y = mx + b'] },
        {
          kind: 'table',
          id: 'parts',
          head: ['Part', 'Meaning'],
          rows: [
            ['slope $m$', 'how much $y$ **changes** when $x$ goes up by $1$'],
            ['intercept $b$', 'the value of $y$ when $x = 0$: the **starting** value'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A linear equation can be written y equals m x plus b.', show: 'f' },
        { say: 'The slope, m, is how much y changes when x goes up by 1. The intercept, b, is the value of y when x is 0, the starting value.', show: 'parts' },
        { say: 'Here, S equals 400 plus 0.15 c is the same as S equals 0.15 c plus 400. So the slope is 0.15, and the intercept is 400.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Substitute** $c = 0$', '(b) **Substitute** $c = 3600$', '(c) **Explain** the slope and intercept', '(d) **Plot** two points and join them'] }],
      lines: [
        { say: 'Here is the plan. For part "a", substitute 0 for c.', show: 'plan.0' },
        { say: 'For part b, substitute 3,600 for c.', show: 'plan.1' },
        { say: 'For part c, explain what the slope and the intercept mean for Cherie.', show: 'plan.2' },
        { say: 'And for part d, plot the two points we found, and join them with a line.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: No sales',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['S = 400 + 0.15(0)', 'S = \\good{400}'] }],
      lines: [
        { say: 'Step one, part "a". Put 0 in for c: S equals 400 plus 0.15 times 0.', show: 'm.0' },
        { say: '0.15 times 0 is 0, so S is 400. In a week with no sales, Cherie earns 400 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: 3,600 in sales',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['S = 400 + 0.15(3{,}600)', '= 400 + 540', '= \\good{940}'] }],
      lines: [
        { say: 'Step two, part b. Put 3,600 in for c: S equals 400 plus 0.15 times 3,600.', show: 'm.0' },
        { say: 'Multiply first: 0.15 times 3,600 is 540. That is her commission.', show: 'm.1' },
        { say: '400 plus 540 is 940. In that week, Cherie earns 940 dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: What the numbers mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'slope', tone: 'key', title: 'The slope, 0.15', md: 'For every \\$1 more she sells, her salary goes up by \\$0.15. Her commission is $15\\%$ of her sales.' },
        { kind: 'callout', id: 'int', tone: 'key', title: 'The S-intercept, 400', md: 'In a week with **no** sales, her salary is \\$400: her base pay.' },
      ],
      lines: [
        { say: 'Step three, part c. The slope is 0.15. For every dollar more that Cherie sells, her salary goes up by 15 cents. Her commission is 15% of her sales.', show: 'slope' },
        { say: 'The S-intercept is 400. In a week with no sales, her salary is 400 dollars. That is her base pay.', show: 'int' },
      ],
    },
    {
      chapter: 'Step 4: The graph',
      layout: 'split',
      leftWidth: 680,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Start at **\\$400** on the salary axis, then climb **\\$150** for every **\\$1,000** of sales.' }],
      lines: [
        { say: 'Step four, part d. Sales go across, and salary goes up.', show: ['g.grid', 'g.axes'] },
        { say: 'Plot the two points we found: 0 sales and 400 dollars, and 3,600 in sales and 940 dollars.', show: ['g.p0', 'g.p1'] },
        { say: 'Join them with a straight line. It starts at 400 on the salary axis, and climbs 150 dollars for every 1,000 dollars of sales.', show: ['g.line', 't'], focus: 'g.line' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{slope} = \\dfrac{940 - 400}{3{,}600 - 0} = \\dfrac{540}{3{,}600} = 0.15 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The slope between our two points is 940 minus 400, over 3,600 minus 0. That is 540 over 3,600, which is 0.15, the slope in the equation. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$(400 + 0.15)(3600)$', 'only the **sales** are multiplied by $0.15$'],
            ['\\$0.15 per **sale**', 'it is \\$0.15 per **dollar** of sales'],
            ['intercept: the sales for \\$0 salary', 'it is the **salary** when sales are $0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Only the sales are multiplied by 0.15. The 400 is added after.' },
        { say: 'The slope is 15 cents for every dollar of sales, not for every sale she makes.' },
        { say: 'And the S-intercept is her salary when her sales are 0, not the other way round.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Patel’s weekly salary is $S = 750 + 0.09c$, where $c$ is his sales in dollars. What is his salary in a week when his sales are \\$5,000?',
          choices: ['\\$1,200', '\\$517.50', '\\$450', '\\$5,750'],
          answer: 0,
          working: '$750 + 0.09(5{,}000) = 750 + 450 = 1{,}200$',
        },
      ],
      lines: [
        { say: 'Your turn. Patel’s weekly salary is S equals 750 plus 0.09 c, where c is his sales in dollars. What is his salary in a week when his sales are 5,000 dollars? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '0.09 times 5,000 is 450, and 750 plus 450 is 1,200 dollars: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Substitute**, then multiply before you add', 'Slope: the change for each $1$ more of $x$', 'Intercept: the value when $x = 0$', 'Graph: plot **two** points and join them'] }],
      lines: [
        { say: 'Here is what to remember. To use the equation, substitute, then multiply before you add.', show: 'sum.0' },
        { say: 'The slope is the change for each 1 more of x.', show: 'sum.1' },
        { say: 'The intercept is the value when x is 0.', show: 'sum.2' },
        { say: 'And to graph a line, plot two points and join them. For more on linear equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
