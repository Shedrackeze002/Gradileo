import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ineqLine } from '@/content/math9/videos/lib/m9-6-figures.ts';
import { tag } from '@/content/math9/videos/lib/m9-1-figures.ts';

// Exam question for Math 9 lesson 6.4 (representing inequalities). The question is a Try It from
// OpenStax Elementary Algebra 2e, word for word (section 2.7, Solve Linear Inequalities,
// CC BY-NC-SA 4.0). (a) x ≤ −1: closed dot at −1, shade left. (b) x > 2: open dot at 2, shade right.
// (c) x < 3: open dot at 3, shade left. A closed dot means the number is included; open, not.

const QUESTION = 'Graph on the number line: (a) x ≤ −1 (b) x > 2 (c) x < 3';

const lines = (id: string) =>
  figure(
    id,
    [
      tag('a-name', [-1.2, 4.4], 'x \\le {-1}', { place: 'left', tone: 'theta' }),
      ineqLine({ name: 'a', min: -5, max: 5, at: [0, 4.4], boundary: { value: -1, closed: true, dir: 'left', tone: 'adj' } }),
      tag('b-name', [-1.2, 2.2], 'x > 2', { place: 'left', tone: 'theta' }),
      ineqLine({ name: 'b', min: -5, max: 5, at: [0, 2.2], boundary: { value: 2, closed: false, dir: 'right', tone: 'opp' } }),
      tag('c-name', [-1.2, 0], 'x < 3', { place: 'left', tone: 'theta' }),
      ineqLine({ name: 'c', min: -5, max: 5, boundary: { value: 3, closed: false, dir: 'left', tone: 'good' } }),
    ],
    460,
  );

const video: Explainer = {
  id: 'xq-m9-6-4',
  lessonId: '',
  exam: {
    lesson: 'm9-6-4',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 2.7, Solve Linear Inequalities',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/2-7-solve-linear-inequalities',
    question: QUESTION,
  },
  title: 'Exam Question: Graph Three Inequalities (Representing Inequalities)',
  thumbnailTitle: 'Graph Three Inequalities',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: graph on the number line (a) x ≤ −1 (b) x > 2 (c) x < 3. For each one, we put a dot at the number: a closed dot when the number is included (≤ or ≥), an open dot when it is not (< or >). Then we shade the side with the solutions: left for less than, right for greater than. Then we check with test points and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph Three Inequalities', subtitle: 'Representing inequalities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about representing inequalities. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Graph on the number line: (a) $x \\le -1$ (b) $x > 2$ (c) $x < 3$', answer: '(a) closed dot at $-1$, shade left (b) open dot at $2$, shade right (c) open dot at $3$, shade left', working: 'closed for ≤ and ≥, open for < and >' }],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Graph on the number line. Part a: "x" is less than or equal to negative 1. Part b: "x" is greater than 2. Part c: "x" is less than 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x > 2: \\ 2.5,\\ 3,\\ 10,\\ 100 \\ldots'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Inequality', md: 'An **inequality** has many solutions, not just one. Its graph shows **all** of them at once on a number line.' },
      ],
      lines: [
        { say: 'An inequality like "x" is greater than 2 is true for 2.5, for 3, for 10, for 100, and for every number in between.', show: 'm.0' },
        { say: 'An inequality has many solutions, not just one. Its graph shows all of them at once on a number line.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['Sign', 'Dot', 'Shade'],
          rows: [
            ['$<$ less than', 'open: not included', 'left'],
            ['$\\le$ less than or equal', '**closed**: included', 'left'],
            ['$>$ greater than', 'open: not included', 'right'],
            ['$\\ge$ greater than or equal', '**closed**: included', 'right'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. With "less than" or "greater than", the number itself is not a solution, so we draw an open dot.', show: 'rules' },
        { say: 'With "or equal to", the number is a solution, so we draw a closed, filled-in dot.' },
        { say: 'Less than means smaller numbers, so we shade to the left. Greater than means bigger numbers, so we shade to the right.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **boundary** number', 'Choose an **open** or **closed** dot', 'Shade **left** or **right**'] }],
      lines: [
        { say: 'Here is the plan. Find the boundary number.', show: 'plan.0' },
        { say: 'Choose an open or a closed dot.', show: 'plan.1' },
        { say: 'Then shade to the left or the right.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: One graph each',
      layout: 'center',
      main: [lines('st')],
      lines: [
        { say: 'Here are three number lines, one for each part.', show: ['st.a-axis', 'st.b-axis', 'st.c-axis', 'st.a-name', 'st.b-name', 'st.c-name'] },
        { say: 'Part a. "x" is less than or equal to negative 1. The boundary is negative 1. "Or equal to" means negative 1 is included, so the dot is closed. Less than means shade to the left.', show: ['st.a-dot', 'st.a-ray'], focus: ['st.a-dot', 'st.a-ray', 'st.a-name'] },
        { say: 'Part b. "x" is greater than 2. The boundary is 2, and 2 itself is not included, so the dot is open. Greater than means shade to the right.', show: ['st.b-dot', 'st.b-ray'], focus: ['st.b-dot', 'st.b-ray', 'st.b-name'] },
        { say: 'Part c. "x" is less than 3. An open dot at 3, because 3 is not included, and shade to the left.', show: ['st.c-dot', 'st.c-ray'], focus: ['st.c-dot', 'st.c-ray', 'st.c-name'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } x = {-3}: \\ {-3} \\le {-1} \\ \\checkmark \\text{ shaded}', '\\text{(b) } x = 4: \\ 4 > 2 \\ \\checkmark \\text{ shaded}', '\\text{(c) } x = 0: \\ 0 < 3 \\ \\checkmark \\text{ shaded}'] }],
      lines: [
        { say: 'Let us check each graph with a test point from the shaded part. In part a, negative 3 is shaded, and negative 3 is less than negative 1. True.', show: 'm.0', focus: 'm.0' },
        { say: 'In part b, 4 is shaded, and 4 is greater than 2. True.', show: 'm.1', focus: 'm.1' },
        { say: 'In part c, 0 is shaded, and 0 is less than 3. True. Every test point works. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['(a) open dot', '$\\le$ includes $-1$: the dot is **closed**'],
            ['(a) shaded right', '$-1$ is negative, but less than means **left**'],
            ['(c) closed dot at $3$', '$<$ does **not** include $3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'In part a, an open dot leaves out negative 1. But less than or equal to includes it, so the dot is closed.' },
        { say: 'In part a, shading to the right is a common slip. Less than always means the smaller numbers, to the left, even for a negative boundary.' },
        { say: 'And in part c, a closed dot includes 3. But 3 is not less than 3, so the dot is open.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A number line has an **open** dot at $3$ and is shaded to the **left**. Which inequality does it show?',
          choices: ['$x \\le 3$', '$x < 3$', '$x > 3$', '$x \\ge 3$'],
          answer: 1,
          working: 'Open dot: 3 is not included. Shaded left: less than. So x < 3.',
        },
      ],
      lines: [
        { say: 'Your turn. A number line has an open dot at 3, and is shaded to the left. Which inequality does it show? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The open dot means 3 is not included, and shading to the left means less than. So "x" is less than 3. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Dot at the **boundary** number', '**Closed** for $\\le$, $\\ge$; **open** for $<$, $>$', 'Less: **left**; greater: **right**', 'Check with a **test point**'] }],
      lines: [
        { say: 'Here is what to remember. Put a dot at the boundary number.', show: 'sum.0' },
        { say: 'Closed for "or equal to", open for strictly less than or greater than.', show: 'sum.1' },
        { say: 'Shade left for less than, and right for greater than.', show: 'sum.2' },
        { say: 'And check with a test point from the shaded part. For more on representing inequalities, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
