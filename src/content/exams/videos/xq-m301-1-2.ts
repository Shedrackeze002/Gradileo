import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 1.2 (reflections and stretches). The question is an exercise
// from OpenStax College Algebra 2e, word for word (section 3.5, Transformation of Functions,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. The −x inside reflects the graph
// in the y-axis, and the 3 outside stretches it vertically by a factor of 3, as in the book's
// answer. The video shows it with f(x) = √x: the point (4, 2) goes to (−4, 2) and then (−4, 6).

const g = plane({ x: [-5.5, 5.5], y: [-1, 7], every: 2, width: 11, height: 8 });

/** y = √x (`f`), its mirror image y = √(−x) (`r`, dashed), y = 3√(−x) (`g`), and where (4, 2) goes. */
const graph = (height = 420, steps: ('r' | 'g')[] = ['r', 'g']) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f: (x) => Math.sqrt(x), from: 0, to: 5.5, tone: 'adj', samples: 80 }),
      ...(steps.includes('r') ? [plot(g, { id: 'r', f: (x) => Math.sqrt(-x), from: -5.5, to: 0, tone: 'opp', dashed: true, samples: 80 })] : []),
      ...(steps.includes('g') ? [plot(g, { id: 'g', f: (x) => 3 * Math.sqrt(-x), from: -5.3, to: 0, tone: 'good', samples: 80 })] : []),
      dots(g, [
        { id: 'p0', x: 4, y: 2, tex: '(4, 2)', tone: 'adj', place: 'below right' },
        ...(steps.includes('r') ? [{ id: 'p1', x: -4, y: 2, tex: '(-4, 2)', tone: 'opp' as const, place: 'below left' as const }] : []),
        ...(steps.includes('g') ? [{ id: 'p2', x: -4, y: 6, tex: '(-4, 6)', tone: 'good' as const, place: 'above right' as const }] : []),
      ]),
    ],
    height,
  );

const QUESTION = 'Describe how the graph of each function is a transformation of the graph of the original function f. g(x) = 3f(−x)';

const video: Explainer = {
  id: 'xq-m301-1-2',
  lessonId: '',
  exam: {
    lesson: 'm301-1-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.5, Transformation of Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-5-transformation-of-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Describe the Graph of g(x) = 3f(−x) (Reflections and Stretches)',
  thumbnailTitle: 'Describe g(x) = 3f(−x)',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: how is the graph of g(x) = 3f(−x) a transformation of the graph of f? The −x inside reflects the graph in the y-axis, and the 3 outside stretches it vertically by a factor of 3. Then we watch it happen to y = √x, check with one point, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Describe g(x) = 3f(−x)', subtitle: 'Reflections and stretches, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about reflections and stretches. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Describe how the graph of each function is a transformation of the graph of the original function $f$. $g(x) = 3f(-x)$',
          answer: 'a **reflection in the $y$-axis** and a **vertical stretch by a factor of $3$**',
          working: '$-x$ is inside, so it reflects left and right. $3$ is outside, so it stretches up and down.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Describe how the graph of each function is a transformation of the graph of the original function f. g of x equals 3 times f of negative x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We are not told what $f$ is. We only need to say **what happens** to its graph: which way it flips, and which way it stretches.' }],
      lines: [
        { say: 'We are not told what f is, and we do not need to be.', show: 't' },
        { say: 'The question only asks what happens to the graph of f: which way it flips, and which way it is stretched.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'refl', tone: 'key', title: 'Reflections', md: '$y = -f(x)$ reflects in the **$x$-axis** (up and down flip). $y = f(-x)$ reflects in the **$y$-axis** (left and right flip).' },
        { kind: 'callout', id: 'str', tone: 'definition', title: 'Vertical stretch', md: '$y = a f(x)$ with $a > 1$ stretches the graph **vertically** by a factor of $a$: every $y$-value is multiplied by $a$.' },
      ],
      lines: [
        { say: 'Here is what we need. A negative sign outside the function, negative f of x, flips the graph up and down, in the x-axis. A negative sign inside, f of negative x, flips it left and right, in the y-axis.', show: 'refl' },
        { say: 'And a number "a" outside, bigger than 1, stretches the graph vertically. Every y-value is multiplied by "a".', show: 'str' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Look **inside**: what does $-x$ do?', 'Look **outside**: what does the $3$ do?', '**Check** with a real graph and one point'] }],
      lines: [
        { say: 'Here is the plan. First, look inside the function: what does negative x do?', show: 'plan.0' },
        { say: 'Second, look outside: what does the 3 do?', show: 'plan.1' },
        { say: 'Third, check with a real graph, following one point.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The inside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g(x) = 3f(\\good{-x})', 'x \\to -x: \\quad \\text{reflection in the } y\\text{-axis}'] }],
      lines: [
        { say: 'Step one. Inside the function, x has been replaced with negative x.', show: 'm.0' },
        { say: 'A point that was at x equals 4 now happens at x equals negative 4. Left and right swap, so the graph is reflected in the y-axis.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The outside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g(x) = \\good{3}f(-x)', 'y \\to 3y: \\quad \\text{vertical stretch by a factor of } 3'] }],
      lines: [
        { say: 'Step two. Outside the function, the whole thing is multiplied by 3.', show: 'm.0' },
        { say: 'Every y-value becomes 3 times as big, so the graph is stretched vertically by a factor of 3. So the answer is a reflection in the y-axis, and a vertical stretch by a factor of 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(440)],
      lines: [
        { say: 'Let us check with a real function. Take f of x equals the square root of x, and follow the point at 4, 2.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.p0'], focus: 'gr.p0' },
        { say: 'Reflect in the y-axis: the curve flips to the left, and the point moves to negative 4, 2.', show: ['gr.r', 'gr.p1'], focus: 'gr.p1' },
        { say: 'Stretch by 3: the y-value 2 becomes 6, so the point lands at negative 4, 6.', show: ['gr.g', 'gr.p2'], focus: 'gr.p2' },
        { say: 'And 3 times the square root of negative negative 4 is 3 times the square root of 4, which is 6. It checks out.' },
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
            ['"reflection in the **$x$-axis**"', 'the minus is **inside**, on $x$: it flips left and right'],
            ['"**horizontal** stretch by $3$"', 'the $3$ is **outside**, so the stretch is **vertical**'],
            ['"compression by $3$"', '$3 > 1$ makes $y$-values **bigger**: a stretch'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The minus sign is inside, on the x. It reflects the graph in the y-axis, not the x-axis.' },
        { say: 'The 3 is outside, multiplying the y-values, so the stretch is vertical, not horizontal.' },
        { say: 'And multiplying by 3 makes the y-values bigger, so it is a stretch, not a compression.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How is the graph of $g(x) = -2f(x)$ a transformation of the graph of $f$?',
          choices: [
            'a reflection in the $y$-axis and a vertical stretch by $2$',
            'a reflection in the $x$-axis and a horizontal stretch by $2$',
            'a reflection in the $x$-axis and a vertical stretch by $2$',
            'a reflection in the $y$-axis and a horizontal stretch by $2$',
          ],
          answer: 2,
          working: 'The minus and the $2$ are both **outside**: the minus flips up and down, in the $x$-axis, and the $2$ stretches vertically.',
        },
      ],
      lines: [
        { say: 'Your turn. How is the graph of g of x equals negative 2 f of x a transformation of the graph of f? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'This time the minus sign and the 2 are both outside. The minus flips the graph in the x-axis, and the 2 stretches it vertically: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$-f(x)$: reflection in the **$x$-axis**', '$f(-x)$: reflection in the **$y$-axis**', '$a f(x)$, $a > 1$: **vertical** stretch by $a$', 'Check by following one point'] }],
      lines: [
        { say: 'Here is what to remember. A minus outside, negative f of x, reflects in the x-axis.', show: 'sum.0' },
        { say: 'A minus inside, f of negative x, reflects in the y-axis.', show: 'sum.1' },
        { say: 'A number "a" bigger than 1 outside stretches the graph vertically by a factor of "a".', show: 'sum.2' },
        { say: 'And check by following one point. For more on reflections and stretches, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
