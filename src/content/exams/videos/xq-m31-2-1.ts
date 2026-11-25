import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 2.1 (limits from graphs and tables). Two exercises from
// OpenStax Calculus Volume 1 (section 2.2, The Limit of a Function, CC BY-NC-SA 4.0) that share
// the book's set-up "For the following exercises, consider the function f(x) = (x² − 1)/|x − 1|",
// put together as parts (a) and (b), without the "[T]" mark; the book's table is written out as
// the x-values it lists. For x < 1, f(x) = −(x + 1), and for x > 1, f(x) = x + 1, so the table
// gives −1.9, −1.99, −1.999, −1.9999 and 2.1, 2.01, 2.001, 2.0001, and the limit does not exist
// (left −2, right 2), as in the book's answer to (b).

const QUESTION =
  'Consider the function f(x) = (x² − 1)/|x − 1|. (a) Complete the following table for the function. Round your solutions to four decimal places. Use x = 0.9, 0.99, 0.999, 0.9999 and x = 1.1, 1.01, 1.001, 1.0001. (b) What do your results in the preceding exercise indicate about the two-sided limit lim x→1 f(x)? Explain your response.';

const g = plane({ x: [-1, 3], y: [-4, 4], xStep: 1, yStep: 1, width: 6, height: 7 });

/** The graph of f: y = −(x + 1) on the left of 1, y = x + 1 on the right, with a hole at each end. */
const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'left', f: (x) => -(x + 1), from: -1, to: 1, tone: 'adj' }),
      plot(g, { id: 'right', f: (x) => x + 1, from: 1, to: 3, tone: 'opp' }),
      dots(g, [
        { id: 'l', x: 1, y: -2, tex: '(1, -2)', tone: 'adj', place: 'right', open: true },
        { id: 'r', x: 1, y: 2, tex: '(1, 2)', tone: 'opp', place: 'below right', open: true },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-2-1',
  lessonId: '',
  exam: {
    lesson: 'm31-2-1',
    source: 'OpenStax, Calculus Volume 1, Exercises in section 2.2, The Limit of a Function',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/2-2-the-limit-of-a-function',
    question: QUESTION,
  },
  title: 'Exam Question: Does the Limit of (x² − 1)/|x − 1| Exist at x = 1? (Limits from Tables)',
  thumbnailTitle: 'Left Says −2, Right Says 2',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: for f(x) = (x² − 1)/|x − 1|, (a) complete a table of values for x = 0.9, 0.99, 0.999, 0.9999 and x = 1.1, 1.01, 1.001, 1.0001, and (b) say what it shows about the limit as x approaches 1. From the left, the values approach −2, and from the right they approach 2, so the two-sided limit does not exist. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Left Says −2, Right Says 2', subtitle: 'Limits from tables, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about limits from a table. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Consider the function $f(x) = \\dfrac{x^2 - 1}{|x - 1|}$. (a) Complete the following table for the function. Round your solutions to four decimal places. Use $x = 0.9, 0.99, 0.999, 0.9999$ and $x = 1.1, 1.01, 1.001, 1.0001$. (b) What do your results in the preceding exercise indicate about the two-sided limit $\\displaystyle\\lim_{x \\to 1} f(x)$? Explain your response.',
          answer: '(a) $-1.9, -1.99, -1.999, -1.9999$ and $2.1, 2.01, 2.001, 2.0001$ (b) It does not exist: from the left $f(x) \\to -2$, from the right $f(x) \\to 2$.',
        },
      ],
      lines: [
        { say: 'Here is the question. The book asks it as two exercises, so we call them parts "a" and b.', show: 'q' },
        { say: 'Consider the function f of x equals x squared minus 1, over the absolute value of x minus 1.' },
        { say: 'Part "a": complete the table, to four decimal places, for x equals 0.9, 0.99, 0.999 and 0.9999, and for 1.1, 1.01, 1.001 and 1.0001. Part b: what do the results say about the two-sided limit as x approaches 1? Explain.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['f(1) = \\dfrac{0}{0} \\ \\text{(undefined)}'] },
        { kind: 'text', id: 't', size: 'md', md: 'We cannot put $x = 1$ in. So we creep up on $1$ from the **left** (just below) and from the **right** (just above), and watch where $f(x)$ is heading.' },
      ],
      lines: [
        { say: 'Here is what it is asking. At x equals 1, the top and the bottom are both 0, so f of 1 is undefined.', show: 'm' },
        { say: 'So we creep up on 1 from the left, just below it, and from the right, just above it, and watch where f of x is heading.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['|x - 1| = \\begin{cases} -(x - 1) & x < 1 \\\\ x - 1 & x > 1 \\end{cases}'] },
        { kind: 'callout', id: 'two', tone: 'key', title: 'Two-sided limit', md: 'The limit exists only if the **left** and the **right** head to the **same** number.' },
      ],
      lines: [
        { say: 'Here is what we need. The absolute value of x minus 1 is negative x minus 1 when x is less than 1, and x minus 1 when x is more than 1.', show: 'f' },
        { say: 'And a two-sided limit exists only if the left side and the right side head to the same number.', show: 'two' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Work out $f(x)$ for each $x$ in the table', 'See where each side is **heading**', '**Compare** the two sides'] }],
      lines: [
        { say: 'Here is the plan. Work out f of x for each x in the table.', show: 'plan.0' },
        { say: 'See where each side is heading.', show: 'plan.1' },
        { say: 'Then compare the two sides.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: One value',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(0.9) = \\dfrac{0.81 - 1}{|0.9 - 1|} = \\dfrac{-0.19}{0.1} = \\good{-1.9}', 'f(1.1) = \\dfrac{1.21 - 1}{|1.1 - 1|} = \\dfrac{0.21}{0.1} = \\good{2.1}'] }],
      lines: [
        { say: 'Step one. Try 0.9. The top is 0.81 minus 1, which is negative 0.19. The bottom is the absolute value of negative 0.1, which is 0.1. So f is negative 1.9.', show: 'm.0' },
        { say: 'Now try 1.1. The top is 1.21 minus 1, which is 0.21. The bottom is 0.1. So f is 2.1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The whole table',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['$x$', '$f(x)$', '$x$', '$f(x)$'],
          rows: [
            ['$0.9$', '$-1.9000$', '$1.1$', '$2.1000$'],
            ['$0.99$', '$-1.9900$', '$1.01$', '$2.0100$'],
            ['$0.999$', '$-1.9990$', '$1.001$', '$2.0010$'],
            ['$0.9999$', '$-1.9999$', '$1.0001$', '$2.0001$'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Left of $1$: $f(x) = -(x + 1)$. Right of $1$: $f(x) = x + 1$.' },
      ],
      lines: [
        { say: 'Step two, part "a". Here is the whole table.', show: 'tab' },
        { say: 'There is a shortcut. The top, x squared minus 1, is x minus 1 times x plus 1. On the left, the bottom is negative x minus 1, so f is negative x plus 1. On the right, f is just x plus 1.', show: 't' },
      ],
    },
    {
      chapter: 'Step 3: Compare the sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\lim_{x \\to 1^-} f(x) = \\good{-2}', '\\lim_{x \\to 1^+} f(x) = \\good{2}', '-2 \\ne 2 \\implies \\lim_{x \\to 1} f(x) \\ \\good{\\text{does not exist}}'] }],
      lines: [
        { say: 'Step three, part b. From the left, the values are heading to negative 2.', show: 'm.0' },
        { say: 'From the right, they are heading to 2.', show: 'm.1' },
        { say: 'Negative 2 is not 2. The two sides disagree, so the two-sided limit does not exist.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The graph **jumps** at $x = 1$: the left piece ends at $-2$ and the right piece starts at $2$.' }],
      lines: [
        { say: 'Let us check on a graph.', show: ['g.grid', 'g.axes'] },
        { say: 'On the left of 1, the graph is negative x plus 1. It heads down to negative 2, with a hole there.', show: ['g.left', 'g.l'] },
        { say: 'On the right of 1, it is x plus 1. It starts from 2, with a hole there. The graph jumps, so there is no single limit. It checks out.', show: ['g.right', 'g.r', 't'] },
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
            ['Only check one side', 'the other side may disagree'],
            ['$|0.9 - 1| = -0.1$', 'absolute value is **never** negative'],
            ['"The limit is $0$" because $f(1) = \\frac{0}{0}$', '$\\frac{0}{0}$ tells you **nothing**: look nearby'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Checking only one side would give a limit of 2, or negative 2. Always check both.' },
        { say: 'The absolute value of negative 0.1 is positive 0.1. Absolute value is never negative.' },
        { say: 'And 0 over 0 does not mean 0. It tells you nothing, so you have to look at the values nearby.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'For $g(x) = \\dfrac{x^2 - 4}{|x - 2|}$, what is $\\displaystyle\\lim_{x \\to 2^-} g(x)$?',
          choices: ['$4$', '$0$', 'does not exist', '$-4$'],
          answer: 3,
          working: 'For $x < 2$, $|x - 2| = -(x - 2)$, so $g(x) = -(x + 2) \\to -4$.',
        },
      ],
      lines: [
        { say: 'Your turn. For g of x equals x squared minus 4, over the absolute value of x minus 2, what is the limit as x approaches 2 from the left? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'On the left of 2, the bottom is negative x minus 2, so g is negative x plus 2. As x heads to 2, that heads to negative 4. Choice D. The one-sided limit exists, even though the two-sided one does not.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use $x$-values **closer and closer** to $a$', 'Check the **left** and the **right**', 'Same number: the limit exists', 'Different numbers: the limit **does not exist**'] }],
      lines: [
        { say: 'Here is what to remember. Use x values that get closer and closer to the point.', show: 'sum.0' },
        { say: 'Check the left side and the right side.', show: 'sum.1' },
        { say: 'If they head to the same number, the limit exists.', show: 'sum.2' },
        { say: 'If they head to different numbers, it does not exist. For more on limits from graphs and tables, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
