import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 2.4 (continuity). The question is an exercise from OpenStax
// Calculus Volume 1 (section 2.4, Continuity, CC BY-NC-SA 4.0): the book's instruction "In the
// following exercises, find the value(s) of k that makes each function continuous over the given
// interval." is put with the one function it asks about. The pieces must meet at x = 3:
// √(3k) = 3 + 1 = 4, so 3k = 16 and k = 16/3, as in the book's answer.

const QUESTION =
  'Find the value(s) of k that makes the function continuous over the given interval: f(x) = √(kx) for 0 ≤ x ≤ 3, and f(x) = x + 1 for 3 < x ≤ 10.';

const PIECES = 'f(x) = \\begin{cases} \\sqrt{kx}, & 0 \\le x \\le 3 \\\\ x + 1, & 3 < x \\le 10 \\end{cases}';

const g = plane({ x: [0, 10], y: [0, 12], xStep: 1, yStep: 2, width: 9, height: 7 });

/** The two pieces with k = 16/3, meeting at (3, 4). */
const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'a', f: (x) => Math.sqrt((16 / 3) * x), from: 0, to: 3, tone: 'adj' }),
      plot(g, { id: 'b', f: (x) => x + 1, from: 3, to: 10, tone: 'opp', label: 'y = x + 1', labelAt: 0.7, side: 'right' }),
      dots(g, [{ id: 'p', x: 3, y: 4, tex: '(3, 4)', tone: 'theta', place: 'below right' }]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-2-4',
  lessonId: '',
  exam: {
    lesson: 'm31-2-4',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 2.4, Continuity',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/2-4-continuity',
    question: QUESTION,
  },
  title: 'Exam Question: Find k So That √(kx) and x + 1 Join (Continuity)',
  thumbnailTitle: 'Make the Pieces Meet',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: find k so that f(x) = √(kx) for 0 ≤ x ≤ 3 and f(x) = x + 1 for 3 < x ≤ 10 is continuous. The only place it could break is x = 3, so the two pieces must give the same value there: √(3k) = 4, so 3k = 16 and k = 16/3. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Make the Pieces Meet', subtitle: 'Continuity, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about continuity. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: `Find the value(s) of $k$ that makes the function continuous over the given interval: $${PIECES}$`,
          answer: '$k = \\dfrac{16}{3}$',
          working: '$\\sqrt{3k} = 3 + 1 = 4$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Find the value of k that makes the function continuous. f of x is the square root of k x, for x from 0 to 3, and x plus 1, for x more than 3 up to 10.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: [PIECES] },
        { kind: 'text', id: 't', size: 'md', md: 'Each piece is continuous on its own. The only place the graph could **break** is where the pieces meet: $x = 3$.' },
      ],
      lines: [
        { say: 'Here is the function. Continuous means you can draw the graph without lifting your pencil.', show: 'm' },
        { say: 'Each piece is continuous on its own. The only place the graph could break is where the pieces meet, at x equals 3.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\lim_{x \\to a} f(x) = f(a)'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Continuous at a join', md: 'The **left** piece and the **right** piece must give the **same** value at the join.' },
      ],
      lines: [
        { say: 'Here is what we need. f is continuous at a when the limit there equals the value there.', show: 'f' },
        { say: 'At a join, that means the left piece and the right piece must give the same value.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **left** value at $x = 3$', 'Find the **right** limit at $x = 3$', 'Set them **equal** and solve for $k$'] }],
      lines: [
        { say: 'Here is the plan. Find the value of the left piece at 3.', show: 'plan.0' },
        { say: 'Find the limit of the right piece at 3.', show: 'plan.1' },
        { say: 'Set them equal, and solve for k.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The two sides at x = 3',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{left: } f(3) = \\sqrt{k \\cdot 3} = \\good{\\sqrt{3k}}', '\\text{right: } \\lim_{x \\to 3^+} (x + 1) = 3 + 1 = \\good{4}'] }],
      lines: [
        { say: 'Step one. The left piece includes 3, so f of 3 is the square root of k times 3: root 3k.', show: 'm.0' },
        { say: 'The right piece heads to 3 plus 1, which is 4, as x comes down to 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Solve for k',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{3k} = 4', '3k = 16', 'k = \\good{\\dfrac{16}{3}}'] }],
      lines: [
        { say: 'Step two. Set the two sides equal: root 3k equals 4.', show: 'm.0' },
        { say: 'Square both sides: 3k equals 16.', show: 'm.1' },
        { say: 'Divide by 3: k equals 16 thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{\\tfrac{16}{3} \\cdot 3} = \\sqrt{16} = 4 \\ \\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'The two pieces meet at $(3, 4)$: no gap and no jump.' },
      ],
      lines: [
        { say: 'Let us check. With k equal to 16 thirds, the left piece at 3 is the square root of 16, which is 4. That matches the right side.', show: 'm' },
        { say: 'On a graph, here is the left piece, rising to 3.', show: ['g.grid', 'g.axes', 'g.a'] },
        { say: 'And the right piece starts at the same point, 3 comma 4. No gap and no jump. It checks out.', show: ['g.b', 'g.p', 't'] },
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
            ['$\\sqrt{3k} = 3$', 'the right piece is $x + 1$: at $3$ it is **4**'],
            ['$3k = 4$', 'square **both** sides: $3k = 16$'],
            ['Check $x = 10$', 'the pieces only meet at $x = 3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The right piece is x plus 1, not x. At 3, it is 4.' },
        { say: 'Square both sides: 4 squared is 16, so 3k is 16, not 4.' },
        { say: 'And 10 is just the end of the interval. The only join to check is at 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find $k$ so that $f(x) = \\begin{cases} kx^2, & x \\le 2 \\\\ x + 5, & x > 2 \\end{cases}$ is continuous.',
          choices: ['$\\dfrac{7}{2}$', '$4$', '$\\dfrac{7}{4}$', '$7$'],
          answer: 2,
          working: '$k \\cdot 2^2 = 2 + 5$, so $4k = 7$ and $k = \\dfrac{7}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find k so that f of x, which is k x squared for x up to 2, and x plus 5 for x more than 2, is continuous. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'At the join, x equals 2. The left piece gives k times 4, and the right piece gives 7. So 4k is 7, and k is 7 quarters. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Continuous: $\\displaystyle\\lim_{x \\to a} f(x) = f(a)$', 'A piecewise function can only break at a **join**', 'Make both pieces give the **same value** there', 'Solve, then **check** on a graph'] }],
      lines: [
        { say: 'Here is what to remember. f is continuous at a when its limit there equals its value there.', show: 'sum.0' },
        { say: 'A piecewise function made of continuous pieces can only break at a join.', show: 'sum.1' },
        { say: 'So make both pieces give the same value at the join.', show: 'sum.2' },
        { say: 'Solve, then check. For more on continuity, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
