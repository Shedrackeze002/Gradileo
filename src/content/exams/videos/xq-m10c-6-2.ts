import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 6.2 (intercepts, domain and range of linear relations):
// Damien's 1000-mile drive from Chicago to Denver, distance left against time. The question is
// an exercise from OpenStax Elementary Algebra 2e, word for word (section 4.3, Graph with
// Intercepts, CC BY-NC-SA 4.0), with the graph described in brackets from the book's own
// description. The answer key gives (0, 1000) and (15, 0): at the start 1000 miles are left, and
// after 15 hours none are.

/** Distance left (drawn in hundreds of miles) against hours since leaving Chicago. */
const graph = (height = 340): DiagramEl => ({
  kind: 'diagram',
  id: 'g',
  height,
  points: { O: [0, 0], X: [17, 0], Y: [0, 12.5], Yi: [0, 10], Xi: [15, 0], P: [6, 6], P0: [6, 0], P1: [0, 6] },
  items: [
    { kind: 'line', id: 'xaxis', from: 'O', to: 'X', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'O', to: 'Y', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xl', at: 'X', tex: '\\text{hours}', place: 'below left', group: 'axes' },
    { kind: 'label', id: 'yl', at: 'Y', tex: '\\text{miles left}', place: 'right', group: 'axes' },
    { kind: 'line', id: 'line', from: 'Yi', to: 'Xi', tone: 'brand', weight: 5 },
    { kind: 'label', id: 'yi', at: 'Yi', tex: '(0, 1000)', place: 'right', dot: true, tone: 'good' },
    { kind: 'label', id: 'xi', at: 'Xi', tex: '(15, 0)', place: 'above right', dot: true, tone: 'good' },
    { kind: 'line', id: 'g1', from: 'P', to: 'P0', tone: 'muted', dashed: true, group: 'mid' },
    { kind: 'line', id: 'g2', from: 'P', to: 'P1', tone: 'muted', dashed: true, group: 'mid' },
    { kind: 'label', id: 'p', at: 'P', tex: '(6, 600)', place: 'above right', dot: true, tone: 'adj', group: 'mid' },
  ],
});

const QUESTION =
  'Damien is driving from Chicago to Denver, a distance of 1000 miles. The x-axis on the graph below shows the time in hours since Damien left Chicago. The y-axis represents the distance he has left to drive. [The graph is a straight line through the points (0, 1000), (3, 800), (6, 600), (9, 400), (12, 200) and (15, 0). The points (0, 1000) and (15, 0) are marked.] (a) Find the x- and y-intercepts. (b) Explain what the x- and y-intercepts mean for Damien.';

const video: Explainer = {
  id: 'xq-m10c-6-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-6-2',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 4.3, Graph with Intercepts',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-3-graph-with-intercepts',
    question: QUESTION,
  },
  title: 'Exam Question: Damien’s Road Trip. What the Intercepts Mean',
  thumbnailTitle: 'Damien’s Road Trip',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: a graph shows how far Damien has left to drive on his 1000-mile trip from Chicago to Denver. We find where the line crosses each axis, (0, 1000) and (15, 0), and explain what each means: 1000 miles to go at the start, and none left after 15 hours. Then we check with the slope and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Damien’s Road Trip', subtitle: 'Intercepts in context, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the intercepts of a graph, and what they mean. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Damien is driving from Chicago to Denver, a distance of $1000$ miles. The $x$-axis on the graph below shows the time in hours since Damien left Chicago. The $y$-axis represents the distance he has left to drive. (a) Find the $x$- and $y$-intercepts. (b) Explain what the $x$- and $y$-intercepts mean for Damien.',
          answer: '(a) $y$-intercept $(0, 1000)$, $x$-intercept $(15, 0)$. (b) At the start he has $1000$ miles left; after $15$ hours he has $0$ miles left.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed, from the road trip exercises.', show: 'q' },
        { say: 'Damien is driving from Chicago to Denver, a distance of 1,000 miles. The x axis on the graph below shows the time in hours since Damien left Chicago. The y axis represents the distance he has left to drive.' },
        { say: 'Part a: find the x and y intercepts. Part b: explain what the x and y intercepts mean for Damien.' },
        { say: 'If you would like to try it first, pause the video now. You will see the graph in a moment.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Across: **hours** since leaving Chicago. Up: **miles left** to drive. The line goes **down**, because the distance left shrinks as he drives.' }],
      lines: [
        { say: 'Here is the graph. Time in hours goes across, and the miles Damien has left to drive go up.', show: ['g', 'g.axes'] },
        { say: 'The line goes down from left to right, because the farther he drives, the less he has left. The question asks where the line crosses each axis, and what that tells us about his trip.', show: ['g.line', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Intercepts', md: 'The **$y$-intercept** is where a line crosses the $y$-axis, so $x = 0$ there. The **$x$-intercept** is where it crosses the $x$-axis, so $y = 0$ there.' },
        { kind: 'text', id: 't', size: 'md', md: 'In a story, the $y$-intercept is usually the **start**, and the $x$-intercept is when the quantity **runs out**.' },
      ],
      lines: [
        { say: 'Here is what we need. The y intercept is where a line crosses the y axis, so x is 0 there. The x intercept is where it crosses the x axis, so y is 0 there.', show: 'def' },
        { say: 'In a story, the y intercept is usually the starting value, and the x intercept is often when the quantity runs out.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find where the line meets the **$y$-axis**', 'Find where it meets the **$x$-axis**', 'Say what each **means** for Damien'] }],
      lines: [
        { say: 'Here is the plan. First, find where the line meets the y axis.', show: 'plan.0' },
        { say: 'Second, find where it meets the x axis.', show: 'plan.1' },
        { say: 'Third, say what each point means for Damien.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two intercepts',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['y\\text{-intercept: } \\good{(0, 1000)}', 'x\\text{-intercept: } \\good{(15, 0)}'] }],
      lines: [
        { say: 'Step one. The line meets the y axis at 1,000, where the time is 0. So the y intercept is 0, 1,000.', show: ['g', 'g.axes', 'g.line', 'g.yi', 'm.0'], focus: 'g.yi' },
        { say: 'It meets the x axis at 15, where the distance left is 0. So the x intercept is 15, 0. That is part a.', show: ['g.xi', 'm.1'], focus: 'g.xi' },
      ],
    },
    {
      chapter: 'Step 2: What they mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'y', tone: 'key', title: '(0, 1000)', md: 'After $0$ hours, Damien has **$1000$ miles** left: he is just leaving Chicago.' },
        { kind: 'callout', id: 'x', tone: 'key', title: '(15, 0)', md: 'After $15$ hours, Damien has **$0$ miles** left: he has arrived in Denver.' },
      ],
      lines: [
        { say: 'Step two. The point at 0, 1,000 means that after 0 hours, Damien has 1,000 miles left to drive. That is the moment he leaves Chicago.', show: 'y', focus: 'y' },
        { say: 'The point at 15, 0 means that after 15 hours, he has 0 miles left. He has arrived in Denver, so the whole trip takes 15 hours. That is part b.', show: 'x', focus: 'x' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1000\\text{ mi}}{15\\text{ h}} \\approx 66.7\\text{ mph}', '6 \\text{ h: } 1000 - 400 = 600 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the story makes sense. 1,000 miles in 15 hours is about 66.7 miles an hour, a sensible highway speed.', show: ['g', 'g.axes', 'g.line', 'g.yi', 'g.xi', 'm.0'] },
        { say: 'And another point on the line agrees. After 6 hours, at that speed, he has driven 400 miles, leaving 600. The graph passes through 6, 600.', show: ['g.mid', 'm.1'], focus: 'g.mid' },
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
            ['$x$-intercept $= (0, 15)$', 'on the $x$-axis, $y = 0$: write $(15, 0)$'],
            ['$(15, 0)$ means he drove $0$ miles', '$y$ is the distance **left**, not driven'],
            ['$(0, 1000)$ means he is in Denver', 'time $0$ is the **start**, in Chicago'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'An intercept is still an ordered pair, with x first. On the x axis, y is 0, so the x intercept is 15, 0, not 0, 15.' },
        { say: 'The y axis shows the distance left, not the distance driven. So 15, 0 means nothing is left to drive.' },
        { say: 'And time 0 is the start of the trip, in Chicago, with all 1,000 miles still to go.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the intercepts of the line $2x + 3y = 12$.',
          choices: ['$(6, 0)$ and $(0, 4)$', '$(4, 0)$ and $(0, 6)$', '$(2, 0)$ and $(0, 3)$', '$(12, 0)$ and $(0, 12)$'],
          answer: 0,
          working: '$y = 0$: $2x = 12$, $x = 6$. $x = 0$: $3y = 12$, $y = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the intercepts of the line 2 x plus 3 y equals 12. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'For the x intercept, put y equals 0: 2 x is 12, so x is 6. For the y intercept, put x equals 0: 3 y is 12, so y is 4. That is 6, 0 and 0, 4, choice A. B swaps them, and C and D use the coefficients instead of solving.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y$-intercept: where $x = 0$', '$x$-intercept: where $y = 0$', 'Write each as an **ordered pair**', 'In a story: the **start**, and when it **runs out**'] }],
      lines: [
        { say: 'Here is what to remember. The y intercept is where x is 0.', show: 'sum.0' },
        { say: 'The x intercept is where y is 0.', show: 'sum.1' },
        { say: 'Write each one as an ordered pair, x first.', show: 'sum.2' },
        { say: 'And in a story, the y intercept is often the start, and the x intercept is when the quantity runs out. For more on intercepts, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
