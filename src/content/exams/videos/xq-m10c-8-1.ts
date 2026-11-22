import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 8.1 (solving systems graphically): Manny's orange juice. The
// question is an exercise from OpenStax Elementary Algebra 2e, word for word (section 5.1, Solve
// Systems of Equations by Graphing, CC BY-NC-SA 4.0), whose answer key gives 3 quarts of
// concentrate and 9 quarts of water. The system c + w = 12, w = 3c is solved by graphing: the
// lines cross at (3, 9).

/** c + w = 12 and w = 3c on one grid; `cross` adds the crossing point and its dashed read-off. */
const graph = (height = 440, cross = true): DiagramEl => {
  const items: DiagramItem[] = [
    { kind: 'line', id: 'xaxis', from: 'O', to: 'XE', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'O', to: 'YE', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xl', at: 'XE', tex: 'c', place: 'right', group: 'axes' },
    { kind: 'label', id: 'yl', at: 'YE', tex: 'w', place: 'above', group: 'axes' },
    { kind: 'line', id: 'sumline', from: 'A', to: 'B', tone: 'adj', weight: 5, group: 'sum' },
    { kind: 'label', id: 'a', at: 'A', tex: '(0, 12)', place: 'left', dot: true, tone: 'adj', group: 'sum' },
    { kind: 'label', id: 'b', at: 'B', tex: '(12, 0)', place: 'below', dot: true, tone: 'adj', group: 'sum' },
    { kind: 'label', id: 'sl', at: 'M', tex: 'c + w = 12', place: 'above right', tone: 'adj', group: 'sum' },
    { kind: 'line', id: 'triple', from: 'O', to: 'T', tone: 'opp', weight: 5, group: 'times' },
    { kind: 'label', id: 'f', at: 'F', tex: '(4, 12)', place: 'right', dot: true, tone: 'opp', group: 'times' },
    { kind: 'label', id: 'tl', at: 'T', tex: 'w = 3c', place: 'above', tone: 'opp', group: 'times' },
  ];
  if (cross) {
    items.push(
      { kind: 'line', id: 'd0', from: 'X', to: 'X0', tone: 'good', dashed: true, group: 'cross' },
      { kind: 'line', id: 'd1', from: 'X', to: 'X1', tone: 'good', dashed: true, group: 'cross' },
      { kind: 'label', id: 'x', at: 'X', tex: '', dot: true, tone: 'good', group: 'cross' },
      { kind: 'label', id: 'x0', at: 'X0', tex: '3', place: 'below', tone: 'good', group: 'cross' },
      { kind: 'label', id: 'x1', at: 'X1', tex: '9', place: 'left', tone: 'good', group: 'cross' },
    );
  }
  return {
    kind: 'diagram',
    id: 'g',
    height,
    points: {
      O: [0, 0], XE: [14, 0], YE: [0, 14], A: [0, 12], B: [12, 0], T: [4.4, 13.2], F: [4, 12],
      X: [3, 9], X0: [3, 0], X1: [0, 9], M: [8.5, 3.5],
    },
    items,
  };
};

const QUESTION =
  'Manny is making 12 quarts of orange juice from concentrate and water. The number of quarts of water is 3 times the number of quarts of concentrate. How many quarts of concentrate and how many quarts of water does Manny need?';

const video: Explainer = {
  id: 'xq-m10c-8-1',
  lessonId: '',
  exam: {
    lesson: 'm10c-8-1',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 5.1, Solve Systems of Equations by Graphing',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/5-1-solve-systems-of-equations-by-graphing',
    question: QUESTION,
  },
  title: 'Exam Question: Manny’s Orange Juice, a System Solved by Graphing',
  thumbnailTitle: 'Orange Juice by Graphing',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: Manny makes 12 quarts of orange juice, with 3 times as much water as concentrate. We write two equations, c + w = 12 and w = 3c, graph both lines, and read where they cross: 3 quarts of concentrate and 9 quarts of water. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Orange Juice by Graphing', subtitle: 'Solving a system of equations by graphing, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question with a system of two equations, by graphing. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Manny is making $12$ quarts of orange juice from concentrate and water. The number of quarts of water is $3$ times the number of quarts of concentrate. How many quarts of concentrate and how many quarts of water does Manny need?',
          answer: '$3$ quarts of concentrate and $9$ quarts of water',
          working: '$c + w = 12$ and $w = 3c$: the lines cross at $(3, 9)$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Manny is making 12 quarts of orange juice from concentrate and water. The number of quarts of water is 3 times the number of quarts of concentrate. How many quarts of concentrate and how many quarts of water does Manny need?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'There are **two unknowns**: the quarts of concentrate and the quarts of water. The question gives us **two facts** about them, so we can write **two equations**.' }],
      lines: [{ say: 'There are two things we do not know: how much concentrate, and how much water. The question gives us two facts about them, so we can write two equations, one for each fact.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Solution of a system', md: 'A pair of values that makes **both** equations true. On a graph, it is the point where the two lines **cross**, because that point is on both lines.' },
      ],
      lines: [
        { say: 'Here is what we need. The solution of a system is a pair of values that makes both equations true.', show: 'def' },
        { say: 'On a graph, every point on a line makes that line’s equation true. So the point where the two lines cross makes both equations true. That point is the solution.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name the unknowns and write **two equations**', 'Graph **both** lines on one grid', 'Read the point where they **cross**', 'Check it in **both** equations'] }],
      lines: [
        { say: 'Here is the plan. First, name the unknowns and write two equations.', show: 'plan.0' },
        { say: 'Second, graph both lines on the same grid.', show: 'plan.1' },
        { say: 'Third, read the point where they cross.', show: 'plan.2' },
        { say: 'And last, check it in both equations.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Two equations',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['c = \\text{quarts of concentrate}, \\quad w = \\text{quarts of water}', 'c + w = 12', 'w = 3c'] }],
      lines: [
        { say: 'Step one. Let c be the quarts of concentrate, and w the quarts of water.', show: 'm.0' },
        { say: 'Manny makes 12 quarts in all, so c plus w equals 12.', show: 'm.1' },
        { say: 'The water is 3 times the concentrate, so w equals 3 c.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Graph both lines',
      layout: 'split',
      left: [graph(440, false)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['c + w = 12: \\ (0, 12), \\ (12, 0)', 'w = 3c: \\ (0, 0), \\ (4, 12)'] }],
      lines: [
        { say: 'Step two. Put the concentrate, c, across and the water, w, up.', show: ['g', 'g.axes'] },
        { say: 'For c plus w equals 12, use the intercepts. When c is 0, w is 12. When w is 0, c is 12. Join the points at 0, 12 and 12, 0.', show: ['g.sum', 'm.0'], focus: 'g.sum' },
        { say: 'For w equals 3 c, pick two values of c. When c is 0, w is 0. When c is 4, w is 12. Join the points at 0, 0 and 4, 12.', show: ['g.times', 'm.1'], focus: 'g.times' },
      ],
    },
    {
      chapter: 'Step 3: Where they cross',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{cross at } \\good{(3, 9)}', 'c = 3, \\quad w = 9'] }],
      lines: [
        { say: 'Step three. The two lines cross at one point.', show: ['g', 'g.axes', 'g.sum', 'g.times', 'g.x'], focus: 'g.x' },
        { say: 'Read straight down to the c axis: 3. Read across to the w axis: 9. So the lines cross at the point at 3, 9.', show: ['g.cross', 'm.0'] },
        { say: 'So c is 3 and w is 9. Manny needs 3 quarts of concentrate and 9 quarts of water. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['c + w = 3 + 9 = 12 \\ \\checkmark', 'w = 3c: \\ 9 = 3 \\times 3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check in both equations. 3 plus 9 is 12, so there are 12 quarts in all.', show: 'm.0' },
        { say: 'And 9 is 3 times 3, so there is 3 times as much water as concentrate. Both are true, so the answer is right.', show: 'm.1' },
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
            ['$c = 3w$', 'the **water** is 3 times the concentrate: $w = 3c$'],
            ['Answering only $c = 3$', 'the question asks for **both** amounts'],
            ['Trusting a rough graph', 'check the point in **both** equations'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Writing c equals 3 w puts the 3 on the wrong side. That would give 9 quarts of concentrate and only 3 of water.' },
        { say: 'The question asks for both amounts, so give both.' },
        { say: 'And a graph drawn by hand can be a little off, so always check the point in both equations.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The lines $y = x + 1$ and $y = -x + 5$ are graphed on the same grid. Which point is the solution of the system?',
          choices: ['$(3, 2)$', '$(2, 3)$', '$(0, 5)$', '$(4, 1)$'],
          answer: 1,
          working: '$x + 1 = -x + 5$ gives $x = 2$, and $y = 2 + 1 = 3$. Check: $-2 + 5 = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. The lines y equals x plus 1 and y equals minus x plus 5 are graphed on the same grid. Which point is the solution of the system? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The lines cross at the point at 2, 3. Check: 2 plus 1 is 3, and minus 2 plus 5 is 3. Both are true, so it is choice B. C and D are on the second line only, and A swaps x and y.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two unknowns, two facts: **two equations**', 'Graph **both** lines on one grid', 'The solution is where they **cross**', 'Check it in **both** equations'] }],
      lines: [
        { say: 'Here is what to remember. Two unknowns and two facts give two equations.', show: 'sum.0' },
        { say: 'Graph both lines on the same grid.', show: 'sum.1' },
        { say: 'The solution is the point where they cross.', show: 'sum.2' },
        { say: 'And check it in both equations. For more on solving systems by graphing, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
