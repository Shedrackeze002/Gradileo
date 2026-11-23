import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { dots, plane, polyline, type Plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 9.1 (linear inequalities in two variables): Hugh's two jobs.
// The question is a Try It from OpenStax Intermediate Algebra 2e, word for word (section 3.4, Graph
// Linear Inequalities in Two Variables, CC BY-NC-SA 4.0), whose answer is 10x + 13y ≥ 260: the
// boundary runs from (26, 0) to (0, 20), and the side away from the origin is shaded. "$13 hour" is
// as the book prints it.

/** A shaded region on a plane, through the plane's points `pts`. */
const shade = (g: Plane, id: string, pts: [number, number][]): Part => {
  const points: Record<string, [number, number]> = {};
  pts.forEach(([x, y], i) => (points[g.n(`${id}-${i}`)] = g.map(x, y)));
  return { points, items: [{ kind: 'region', id: g.n(id), points: pts.map((_, i) => g.n(`${id}-${i}`)), tone: 'good', shade: 0.2 }] };
};

const g = plane({ x: [0, 30], y: [0, 24], xStep: 2, yStep: 2, every: 2, width: 8, height: 6.4 });

/** The boundary 10x + 13y = 260, the shaded solutions, and the three chosen pairs. */
const graph = (shaded: boolean) =>
  figure(
    'gr',
    [
      g,
      ...(shaded ? [shade(g, 'sol', [[0, 20], [26, 0], [30, 0], [30, 24], [0, 24]])] : []),
      polyline(g, { id: 'edge', points: [[0, 20], [26, 0]], tone: 'brand' }),
      dots(g, [
        { id: 'Y', x: 0, y: 20, tex: '(0, 20)', tone: 'brand', place: 'above right', group: 'ends' },
        { id: 'X', x: 26, y: 0, tex: '(26, 0)', tone: 'brand', place: 'above right', group: 'ends' },
      ]),
      ...(shaded
        ? [
            dots(g, [
              { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'bad', place: 'above right' },
              { id: 'P', x: 13, y: 10, tex: '(13, 10)', tone: 'good', place: 'above right', group: 'pairs' },
              { id: 'Q', x: 20, y: 10, tex: '(20, 10)', tone: 'good', place: 'right', group: 'pairs' },
            ]),
          ]
        : []),
    ],
    440,
  );

const QUESTION =
  'Hugh works two part time jobs. One at a grocery store that pays $10 an hour and the other is babysitting for $13 hour. Between the two jobs, Hugh wants to earn at least $260 a week. How many hours does Hugh need to work at each job to earn at least $260? (a) Let x be the number of hours he works at the grocery store and let y be the number of hours he works babysitting. Write an inequality that would model this situation. (b) Graph the inequality. (c) Find three ordered pairs (x, y) that would be solutions to the inequality. Then, explain what that means for Hugh.';

const video: Explainer = {
  id: 'xq-m201-9-1',
  lessonId: '',
  exam: {
    lesson: 'm201-9-1',
    source: 'OpenStax, Intermediate Algebra 2e, Try It in section 3.4, Graph Linear Inequalities in Two Variables',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/3-4-graph-linear-inequalities-in-two-variables',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Hours Must Hugh Work? (Linear Inequalities in Two Variables)',
  thumbnailTitle: 'How Many Hours for Hugh?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: Hugh earns $10 an hour at a grocery store and $13 an hour babysitting, and wants at least $260 a week. We write the inequality 10x + 13y ≥ 260, graph its boundary through (26, 0) and (0, 20) as a solid line, test the origin to decide which side to shade, and pick three solutions such as (13, 10) and (20, 10). Then we check them and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Hours for Hugh?', subtitle: 'Linear inequalities in two variables, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about linear inequalities in two variables. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
            'Hugh works two part time jobs. One at a grocery store that pays \\$10 an hour and the other is babysitting for \\$13 hour. Between the two jobs, Hugh wants to earn at least \\$260 a week. How many hours does Hugh need to work at each job to earn at least \\$260? (a) Let $x$ be the number of hours he works at the grocery store and let $y$ be the number of hours he works babysitting. Write an inequality that would model this situation. (b) Graph the inequality. (c) Find three ordered pairs $(x, y)$ that would be solutions to the inequality. Then, explain what that means for Hugh.',
          answer: '(a) $10x + 13y \\ge 260$ (b) shade above the solid line through $(26, 0)$ and $(0, 20)$ (c) for example $(0, 20)$, $(13, 10)$, $(20, 10)$',
          working: 'Test $(0, 0)$: $0 \\ge 260$ is false, so shade the side **away** from the origin.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Hugh has two part-time jobs. The grocery store pays 10 dollars an hour, and babysitting pays 13 dollars an hour. He wants to earn at least 260 dollars a week. Let x be his hours at the grocery store, and y his hours babysitting.' },
        { say: 'Part a: write an inequality. Part b: graph it. Part c: find three ordered pairs that are solutions, and explain what they mean for Hugh.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Turn "earn **at least** \\$260" into an inequality in $x$ and $y$, draw **every** pair of hours that works as a region of the graph, and read some pairs from it.' }],
      lines: [{ say: 'We need to turn, earn at least 260 dollars, into an inequality in x and y. Its graph is a whole region of the plane, every pair of hours that works. Then we read some pairs from it.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'bd', tone: 'definition', title: 'The boundary', md: 'Graph the **equation** first. Use a **solid** line for $\\ge$ or $\\le$ (the line is included) and a **dashed** line for $>$ or $<$.' },
        { kind: 'callout', id: 'test', tone: 'key', title: 'A test point', md: 'Put a point not on the line, such as $(0, 0)$, into the inequality. If it is **true**, shade its side; if **false**, shade the other side.' },
      ],
      lines: [
        { say: 'Here is what we need. The boundary of the region is the line we get by replacing the inequality sign with an equals sign. It is solid when the line itself is included, for greater than or equal to, and dashed when it is not.', show: 'bd' },
        { say: 'To choose a side, test a point that is not on the line, such as the origin. If the inequality is true there, shade that side. If it is false, shade the other side.', show: 'test' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Write the **inequality**', '(b) Graph the **boundary**, then **test** and shade', '(c) Read three **solutions**'] }],
      lines: [
        { say: 'Here is the plan. For part a, write the inequality.', show: 'plan.0' },
        { say: 'For part b, graph the boundary line, then use a test point to shade the right side.', show: 'plan.1' },
        { say: 'For part c, read three solutions from the shaded region.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The inequality',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{grocery: } 10x \\qquad \\text{babysitting: } 13y', '10x + 13y \\ge 260'] }],
      lines: [
        { say: 'Step one. At 10 dollars an hour, x hours at the grocery store earn 10 x dollars. At 13 dollars an hour, y hours babysitting earn 13 y dollars.', show: 'm.0' },
        { say: 'Together, that must be at least 260, so greater than or equal to: 10 x plus 13 y is greater than or equal to 260. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The boundary line',
      layout: 'split',
      leftWidth: 620,
      left: [graph(false)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['10x + 13y = 260', 'x = 0: \\ y = 20', 'y = 0: \\ x = 26'] }],
      lines: [
        { say: 'Step two. The boundary is the line 10 x plus 13 y equals 260.', show: ['m.0', 'gr.grid', 'gr.axes'] },
        { say: 'When x is 0, 13 y is 260, so y is 20. That is the point at 0, 20.', show: ['m.1', 'gr.Y'] },
        { say: 'When y is 0, 10 x is 260, so x is 26. That is the point at 26, 0.', show: ['m.2', 'gr.X'] },
        { say: 'Join them with a solid line, because earning exactly 260 dollars counts as at least 260.', show: 'gr.edge', focus: 'gr.edge' },
      ],
    },
    {
      chapter: 'Step 3: Test and shade',
      layout: 'split',
      leftWidth: 620,
      left: [graph(true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['(0, 0): \\ 0 + 0 \\ge 260?', '0 \\ge 260 \\quad \\text{false}'] }],
      lines: [
        { say: 'Step three. Here is the line again.', show: ['gr.grid', 'gr.axes', 'gr.edge', 'gr.ends'] },
        { say: 'Test the origin, 0 hours at each job.', show: ['m.0', 'gr.O'] },
        { say: '0 is not at least 260, so the origin is not a solution. Of course: working no hours earns nothing.', show: 'm.1' },
        { say: 'So shade the other side of the line, away from the origin. Hours cannot be negative, so we stay in the first quadrant. The shaded region and the solid line are the graph, part b.', show: 'gr.sol', focus: 'gr.sol' },
      ],
    },
    {
      chapter: 'Step 4: Three solutions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['$(x, y)$', '$10x + 13y$', 'meaning for Hugh'],
          rows: [
            ['$(0, 20)$', '$260$', '20 h babysitting only: exactly \\$260'],
            ['$(13, 10)$', '$260$', '13 h grocery, 10 h babysitting: \\$260'],
            ['$(20, 10)$', '$330$', '20 h grocery, 10 h babysitting: \\$330'],
          ],
        },
      ],
      lines: [
        { say: 'Step four. Any point in the shaded region or on the line works. Here are three.', show: 'tab' },
        { say: 'The point at 0, 20: babysitting for 20 hours alone earns exactly 260 dollars.' },
        { say: 'The point at 13, 10: 13 hours at the grocery store and 10 hours babysitting earns 130 plus 130, which is 260 dollars.' },
        { say: 'The point at 20, 10: 20 hours at the store and 10 babysitting earns 200 plus 130, which is 330 dollars, more than enough. That is part c.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph(true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['(10, 5): \\ 100 + 65 = 165', '165 \\ge 260 \\quad \\text{false}'] }],
      lines: [
        { say: 'Let us check on the graph. Our three pairs sit on the line or in the shaded region.', show: ['gr.grid', 'gr.axes', 'gr.sol', 'gr.edge', 'gr.ends', 'gr.pairs'] },
        { say: 'And a point below the line, like 10 hours and 5 hours, earns only 100 plus 65, which is 165 dollars. Not enough, which is why it is not shaded.', show: ['m.0', 'm.1'] },
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
            ['$10x + 13y \\le 260$', '"at least" means $\\ge$'],
            ['a dashed boundary', '$\\ge$ includes the line, so draw it **solid**'],
            ['shading the origin side', '$(0, 0)$ gives $0 \\ge 260$: **false**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'At least 260 means 260 or more, so the sign is greater than or equal to, not less than or equal to.' },
        { say: 'Because the line is included, draw it solid, not dashed.' },
        { say: 'And always test a point. The origin makes the inequality false, so its side is not shaded.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which point is a solution of $2x + 3y < 12$?',
          choices: ['$(3, 2)$', '$(6, 0)$', '$(1, 2)$', '$(0, 5)$'],
          answer: 2,
          working: '$2(1) + 3(2) = 8 < 12$. $(3, 2)$ and $(6, 0)$ give exactly $12$, which is not less than $12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is a solution of 2 x plus 3 y is less than 12? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Test each one. The point at 1, 2 gives 2 plus 6, which is 8, and 8 is less than 12, so the answer is choice C. A and B give exactly 12, on the dashed boundary, which is not included, and D gives 15.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['"At least" is $\\ge$, "at most" is $\\le$', 'Boundary: **solid** for $\\ge, \\le$; **dashed** for $>, <$', '**Test** a point to choose the side', 'Every shaded point is a solution'] }],
      lines: [
        { say: 'Here is what to remember. At least means greater than or equal to, and at most means less than or equal to.', show: 'sum.0' },
        { say: 'Draw the boundary solid when it is included, and dashed when it is not.', show: 'sum.1' },
        { say: 'Test a point to choose which side to shade.', show: 'sum.2' },
        { say: 'And every point in the shaded region is a solution. For more on linear inequalities in two variables, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
