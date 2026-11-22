import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 5.3 (functions, domain and range): two sets of ordered pairs,
// one a function and one not. The question is OpenStax Intermediate Algebra 2e's own worked
// example, word for word (section 3.5, Relations and Functions, CC BY-NC-SA 4.0). (a) is a
// function with domain {−3, −2, −1, 0, 1, 2, 3} and range {0, 1, 8, 27}; (b) is not, because 9,
// 4 and 1 each go to two values, and has domain {0, 1, 4, 9} and range {−3, ..., 3}.

const PAIRS_B: Array<[number, number]> = [[9, -3], [4, -2], [1, -1], [0, 0], [1, 1], [4, 2], [9, 3]];

/** The pairs of part (b) plotted, with the vertical line x = 9 through two of them. */
const plot = (height = 380): DiagramEl => {
  const k = 1.3; // x is drawn 1.3 times wider, to spread the points out
  const points: Record<string, [number, number]> = { X0: [-0.6, 0], X1: [11 * k + 1, 0], Y0: [0, -4.4], Y1: [0, 4.4], V0: [9 * k, -4.2], V1: [9 * k, 4.2] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'xaxis', from: 'X0', to: 'X1', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'Y0', to: 'Y1', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xl', at: 'X1', tex: 'x', place: 'right', group: 'axes' },
    { kind: 'label', id: 'yl', at: 'Y1', tex: 'y', place: 'above', group: 'axes' },
  ];
  PAIRS_B.forEach(([x, yv], i) => {
    points[`P${i}`] = [x * k, yv];
    const place = x === 0 ? 'below left' : x === 9 || x === 1 ? 'right' : yv > 0 ? 'above' : 'below';
    items.push({ kind: 'label', id: `p${i}`, at: `P${i}`, tex: `(${x}, ${yv})`, place, dot: true, tone: 'adj', group: 'pts' });
  });
  items.push({ kind: 'line', id: 'vline', from: 'V0', to: 'V1', tone: 'bad', dashed: true, weight: 4 });
  return { kind: 'diagram', id: 'pl', height, points, items };
};

const QUESTION =
  'Use the set of ordered pairs to (i) determine whether the relation is a function (ii) find the domain of the relation (iii) find the range of the relation. (a) {(−3, 27), (−2, 8), (−1, 1), (0, 0), (1, 1), (2, 8), (3, 27)} (b) {(9, −3), (4, −2), (1, −1), (0, 0), (1, 1), (4, 2), (9, 3)}';

const video: Explainer = {
  id: 'xq-m10c-5-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-5-3',
    source: 'OpenStax, Intermediate Algebra 2e, Example in section 3.5, Relations and Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/3-5-relations-and-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Is It a Function? Domain and Range From Ordered Pairs',
  thumbnailTitle: 'Is It a Function?',
  thumbnail: 'pl',
  summary:
    'A real test question, solved one small step at a time: two sets of ordered pairs, and for each we decide whether it is a function and find its domain and range. In the first, every x goes to one y, so it is a function. In the second, 9 goes to both 3 and −3, so it is not, and the vertical line test shows why. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is It a Function?', subtitle: 'Functions, domain and range, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about functions, domain and range. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the set of ordered pairs to (i) determine whether the relation is a function (ii) find the domain of the relation (iii) find the range of the relation. (a) $\\{(-3, 27), (-2, 8), (-1, 1), (0, 0), (1, 1), (2, 8), (3, 27)\\}$ (b) $\\{(9, -3), (4, -2), (1, -1), (0, 0), (1, 1), (4, 2), (9, 3)\\}$',
          answer: '(a) function; $\\{-3, \\ldots, 3\\}$; $\\{0, 1, 8, 27\\}$. (b) not a function; $\\{0, 1, 4, 9\\}$; $\\{-3, \\ldots, 3\\}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Use the set of ordered pairs to, one, determine whether the relation is a function, two, find the domain of the relation, and three, find the range of the relation.' },
        { say: 'Set a is minus 3 27, minus 2 8, minus 1 1, 0 0, 1 1, 2 8, and 3 27. Set b is 9 minus 3, 4 minus 2, 1 minus 1, 0 0, 1 1, 4 2, and 9 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(x, y): \\ x \\text{ is the input}, \\ y \\text{ is the output}'] },
        { kind: 'text', id: 't', size: 'md', md: 'For **each** set: is it a **function**? What is its **domain**? What is its **range**? That is three answers for (a) and three for (b).' },
      ],
      lines: [
        { say: 'Each ordered pair has an input, x, and an output, y.', show: 'm' },
        { say: 'For each of the two sets, we must say whether it is a function, and give its domain and its range. So there are six answers in all.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Function', md: 'A relation is a **function** when each $x$-value is matched with **only one** $y$-value. Two different $x$-values may share a $y$-value.' },
        { kind: 'math', id: 'dr', size: 'md', lines: ['\\text{domain} = \\text{all } x\\text{-values}, \\quad \\text{range} = \\text{all } y\\text{-values}'] },
      ],
      lines: [
        { say: 'Here is what we need. A relation is a function when each x value is matched with only one y value. It is fine for two different x values to share the same y value.', show: 'def' },
        { say: 'The domain is the set of all the x values, and the range is the set of all the y values. Each value is listed only once.', show: 'dr' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Look for an $x$-value that **repeats** with a different $y$', 'List the **$x$-values**: the domain', 'List the **$y$-values**: the range'] }],
      lines: [
        { say: 'Here is the plan, for each set. First, look for an x value that appears twice with different y values. If there is one, it is not a function.', show: 'plan.0' },
        { say: 'Second, list the x values for the domain.', show: 'plan.1' },
        { say: 'Third, list the y values for the range.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Set (a)',
      layout: 'center',
      main: [
        { kind: 'table', id: 'ta', head: ['$x$', '$-3$', '$-2$', '$-1$', '$0$', '$1$', '$2$', '$3$'], rows: [['$y$', '$27$', '$8$', '$1$', '$0$', '$1$', '$8$', '$27$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{each } x \\text{ once} \\Rightarrow \\good{\\text{a function}}', '\\text{domain } \\good{\\{-3, -2, -1, 0, 1, 2, 3\\}}, \\ \\text{range } \\good{\\{0, 1, 8, 27\\}}'] },
      ],
      lines: [
        { say: 'Step one, set a. Put the pairs in a table. Every x value, from minus 3 to 3, appears only once.', show: 'ta' },
        { say: 'So each x is matched with only one y, and set a is a function. Some y values repeat, like 27 for both minus 3 and 3, but that is allowed.', show: 'm.0' },
        { say: 'The domain is minus 3, minus 2, minus 1, 0, 1, 2 and 3. The range is 0, 1, 8 and 27, each listed once.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Set (b)',
      layout: 'split',
      left: [plot()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['9 \\to -3 \\text{ and } 9 \\to 3', '\\Rightarrow \\good{\\text{not a function}}', '\\text{domain } \\good{\\{0, 1, 4, 9\\}}', '\\text{range } \\good{\\{-3, -2, -1, 0, 1, 2, 3\\}}'] }],
      lines: [
        { say: 'Step two, set b. Plot the pairs. The x value 9 appears twice: once with minus 3, and once with 3.', show: ['pl', 'pl.axes', 'pl.pts', 'm.0'] },
        { say: 'So 9 is matched with two y values, and set b is not a function. The same happens for 4 and for 1. On the graph, the vertical line x equals 9 passes through two points.', show: ['pl.vline', 'm.1'], focus: 'pl.vline' },
        { say: 'The domain is the x values: 0, 1, 4 and 9, each listed once.', show: 'm.2' },
        { say: 'The range is the y values: minus 3, minus 2, minus 1, 0, 1, 2 and 3.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['(a): \\ 7 \\text{ pairs}, \\ 7 \\text{ different } x\\text{-values} \\ \\checkmark', '(b): \\ 7 \\text{ pairs}, \\ \\text{only } 4 \\text{ different } x\\text{-values} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by counting. Set a has 7 pairs and 7 different x values, so no x can have two outputs. It is a function.', show: 'm.0' },
        { say: 'Set b has 7 pairs but only 4 different x values, so some x values must have more than one output. It is not a function.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Why it is wrong'],
          rows: [
            ['(a) is not a function: $27$ repeats', 'a repeated **$y$** is fine; only a repeated **$x$** matters'],
            ['Range of (a): $\\{27, 8, 1, 0, 1, 8, 27\\}$', 'list each value **once**'],
            ['Domain of (b) includes $-3$', 'the domain is the **$x$**-values'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Set a repeats the y value 27, but that does not stop it being a function. Only an x value with two different outputs does.' },
        { say: 'In a set, list each value once, so the range of a is just 0, 1, 8 and 27.' },
        { say: 'And the domain is the x values, so minus 3 is not in the domain of b. It is in the range.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which relation is a function?',
          choices: ['$\\{(1, 2), (2, 2), (3, 2)\\}$', '$\\{(2, 1), (2, 2), (2, 3)\\}$', '$\\{(1, 1), (1, -1), (4, 2)\\}$', '$\\{(0, 5), (3, 4), (0, -5)\\}$'],
          answer: 0,
          working: 'In A each $x$-value appears once. B, C and D each repeat an $x$-value with a different $y$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which relation is a function? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'In A, the x values 1, 2 and 3 each appear once, so it is a function, choice A, even though every output is 2. B repeats 2, C repeats 1, and D repeats 0, each with a different output.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Function**: each $x$ has only **one** $y$', 'A repeated $y$ is fine', '**Domain**: the $x$-values. **Range**: the $y$-values', 'Vertical line through two points: **not** a function'] }],
      lines: [
        { say: 'Here is what to remember. A function matches each x with only one y.', show: 'sum.0' },
        { say: 'A repeated y value is fine.', show: 'sum.1' },
        { say: 'The domain is the set of x values, and the range is the set of y values, each listed once.', show: 'sum.2' },
        { say: 'And if a vertical line passes through two points of the graph, it is not a function. For more on functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
