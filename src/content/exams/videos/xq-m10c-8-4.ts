import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 8.4 (the number of solutions): y = −2x − 4 and 4x + 2y = 9.
// The question is an exercise from OpenStax Elementary Algebra 2e, word for word (section 5.1,
// Solve Systems of Equations by Graphing, CC BY-NC-SA 4.0), whose answer key gives "no solution,
// inconsistent, independent". The second line is y = −2x + 9/2: the same slope and a different
// intercept, so the lines are parallel and never meet.

/** The two parallel lines, y = −2x − 4 and y = −2x + 4.5. */
const lines = (height = 440): DiagramEl => ({
  kind: 'diagram',
  id: 'l',
  height,
  points: {
    X0: [-5, 0], X1: [5.6, 0], Y0: [0, -6.2], Y1: [0, 6.4],
    P0: [-3.75, 3.5], P1: [0.9, -5.8], Q0: [-0.6, 5.7], Q1: [5, -5.5], A: [0, -4], B: [0, 4.5],
  },
  items: [
    { kind: 'line', id: 'xaxis', from: 'X0', to: 'X1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'Y0', to: 'Y1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xl', at: 'X1', tex: 'x', place: 'right', group: 'axes' },
    { kind: 'label', id: 'yl', at: 'Y1', tex: 'y', place: 'above', group: 'axes' },
    { kind: 'line', id: 'oneline', from: 'P0', to: 'P1', tone: 'adj', weight: 5, group: 'one' },
    { kind: 'label', id: 'ol', at: 'P0', tex: 'y = -2x - 4', place: 'left', tone: 'adj', group: 'one' },
    { kind: 'label', id: 'a', at: 'A', tex: '(0, -4)', place: 'left', dot: true, tone: 'adj', group: 'one' },
    { kind: 'line', id: 'twoline', from: 'Q0', to: 'Q1', tone: 'opp', weight: 5, group: 'two' },
    { kind: 'label', id: 'tl', at: 'Q1', tex: 'y = -2x + \\tfrac{9}{2}', place: 'right', tone: 'opp', group: 'two' },
    { kind: 'label', id: 'b', at: 'B', tex: '(0, 4.5)', place: 'left', dot: true, tone: 'opp', group: 'two' },
  ],
});

const QUESTION =
  'Without graphing, determine the number of solutions and then classify the system of equations. y = −2x − 4 and 4x + 2y = 9.';

const video: Explainer = {
  id: 'xq-m10c-8-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-8-4',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 5.1, Solve Systems of Equations by Graphing',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/5-1-solve-systems-of-equations-by-graphing',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Solutions Does This System Have?',
  thumbnailTitle: 'How Many Solutions?',
  thumbnail: 'l',
  summary:
    'A real test question, solved one small step at a time: without graphing, how many solutions do y = −2x − 4 and 4x + 2y = 9 have? We write the second equation as y = −2x + 9/2, compare slopes and intercepts, and find parallel lines: no solution, an inconsistent and independent system. Then we see it on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Solutions?', subtitle: 'The number of solutions of a system, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about how many solutions a system of equations has. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Without graphing, determine the number of solutions and then classify the system of equations. $\\begin{cases} y = -2x - 4 \\\\ 4x + 2y = 9 \\end{cases}$',
          answer: 'No solution; the system is inconsistent and independent.',
          working: '$4x + 2y = 9$ is $y = -2x + \\tfrac{9}{2}$: the same slope, $-2$, and a different intercept, so the lines are parallel.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Without graphing, determine the number of solutions and then classify the system of equations: y equals minus 2 x minus 4, and 4 x plus 2 y equals 9.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Two questions: **how many** solutions the system has, and which **type** of system it is. We must decide **without** drawing the lines.' }],
      lines: [{ say: 'The question asks two things: how many solutions the system has, and what type of system it is. And it says without graphing, so we must decide from the equations alone.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'kinds',
          head: ['Slopes and intercepts', 'Lines', 'Solutions'],
          rows: [
            ['different slopes', 'cross once', '**one**'],
            ['same slope, different intercepts', 'parallel', '**none**'],
            ['same slope, same intercept', 'the same line', '**infinitely many**'],
          ],
        },
        { kind: 'callout', id: 'words', tone: 'definition', title: 'Classifying', md: '**Consistent**: at least one solution. **Inconsistent**: no solution. **Independent**: two different lines. **Dependent**: the same line twice.' },
      ],
      lines: [
        { say: 'Here is what we need. Two lines can cross once, be parallel, or be the same line. Compare the slopes and the intercepts to tell which.', show: 'kinds' },
        { say: 'Different slopes: the lines cross once, so there is one solution. The same slope but different intercepts: the lines are parallel and never meet, so there is no solution. The same slope and the same intercept: it is one line, so there are infinitely many solutions.' },
        { say: 'To classify, a system is consistent if it has at least one solution, and inconsistent if it has none. It is independent if the equations give two different lines, and dependent if they give the same line.', show: 'words' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write both equations as $y = mx + b$', 'Compare the **slopes** and the **intercepts**', 'Count the solutions, then **classify**'] }],
      lines: [
        { say: 'Here is the plan. First, write both equations in the form y equals m x plus b.', show: 'plan.0' },
        { say: 'Second, compare the slopes and the intercepts.', show: 'plan.1' },
        { say: 'Third, count the solutions, and then classify the system.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Slope-intercept form',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = -2x - 4', '4x + 2y = 9 \\ \\Rightarrow \\ 2y = -4x + 9', 'y = -2x + \\tfrac{9}{2}'] }],
      lines: [
        { say: 'Step one. The first equation, y equals minus 2 x minus 4, is already in slope intercept form.', show: 'm.0' },
        { say: 'For the second, take 4 x from both sides: 2 y equals minus 4 x plus 9.', show: 'm.1' },
        { say: 'Divide every term by 2: y equals minus 2 x plus 9 halves.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Compare',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'cmp',
          head: ['', 'Slope', '$y$-intercept'],
          rows: [
            ['$y = -2x - 4$', '$-2$', '$-4$'],
            ['$y = -2x + \\tfrac{9}{2}$', '$-2$', '$\\tfrac{9}{2}$'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: '**Same slope, different intercepts**: the lines are **parallel**.' },
      ],
      lines: [
        { say: 'Step two. Both lines have slope minus 2.', show: 'cmp' },
        { say: 'But the intercepts are different: minus 4 and 9 halves. Lines with the same slope and different intercepts are parallel.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Count and classify',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{parallel lines never meet: } \\good{\\text{no solution}}'] },
        { kind: 'callout', id: 'cls', tone: 'key', title: 'Classify', md: 'No solution, so **inconsistent**. Two different lines, so **independent**.' },
      ],
      lines: [
        { say: 'Step three. Parallel lines never meet, so no point is on both lines. The system has no solution.', show: 'm' },
        { say: 'It has no solution, so it is inconsistent. And the two equations give two different lines, so it is independent. The answer: no solution, inconsistent and independent.', show: 'cls', focus: 'cls' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [lines(500), { kind: 'text', id: 't', size: 'md', md: 'Both lines fall $2$ for every $1$ across, so the gap between them never closes.' }],
      lines: [
        { say: 'The question said not to graph, but now that we have the answer, a graph is a good check. Here is y equals minus 2 x minus 4, through the point at 0, minus 4.', show: ['l', 'l.axes', 'l.one'], focus: 'l.one' },
        { say: 'And here is y equals minus 2 x plus 9 halves, through the point at 0, 4.5.', show: 'l.two', focus: 'l.two' },
        { say: 'Both lines fall 2 for every 1 across, so the gap between them never closes. They never cross, so there is no solution.', show: 't' },
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
            ['Slope $4$ from $4x + 2y = 9$', 'solve for $y$ **first**: the slope is $-2$'],
            ['"Same slope, so the same line"', 'check the **intercepts** too'],
            ['"Dependent", since there is no solution', 'dependent means the **same line**; these are two lines'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 4 in 4 x plus 2 y equals 9 is not the slope. Solve for y first.' },
        { say: 'The same slope alone does not mean the same line. Check the intercepts as well.' },
        { say: 'And dependent means the two equations are the same line. These are two different lines, so the system is independent, even though it has no solution.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many solutions does the system $y = 3x + 2$ and $6x - 2y = -4$ have?',
          choices: ['infinitely many', 'none', 'exactly one', 'exactly two'],
          answer: 0,
          working: '$-2y = -6x - 4$, so $y = 3x + 2$: the same line.',
        },
      ],
      lines: [
        { say: 'Your turn. How many solutions does the system y equals 3 x plus 2, and 6 x minus 2 y equals minus 4, have? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Take 6 x from both sides: minus 2 y equals minus 6 x minus 4. Divide every term by minus 2: y equals 3 x plus 2. That is the same line, so there are infinitely many solutions, choice A. Two lines can never cross exactly twice.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write both as $y = mx + b$', 'Different slopes: **one** solution', 'Same slope, different intercepts: **none**', 'Same slope and intercept: **infinitely many**'] }],
      lines: [
        { say: 'Here is what to remember. Write both equations as y equals m x plus b.', show: 'sum.0' },
        { say: 'Different slopes give one solution.', show: 'sum.1' },
        { say: 'The same slope with different intercepts gives no solution.', show: 'sum.2' },
        { say: 'And the same slope with the same intercept gives infinitely many. For more on the number of solutions of a system, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
