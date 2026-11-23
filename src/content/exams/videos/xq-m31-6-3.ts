import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 6.3 (concavity and curve sketching). The question is an
// exercise from OpenStax Calculus Volume 1 (section 4.5, Derivatives and the Shape of a Graph, CC BY-NC-SA
// 4.0): the book's instruction "For the following exercises, determine a. intervals where f is
// increasing or decreasing, b. local minima and maxima of f, c. intervals where f is concave up and
// concave down, and d. the inflection points of f." is put with the one function it asks about.
// f′ = 3x(x − 4) and f″ = 6x − 12 give the book's answers: increasing for x < 0 and x > 4,
// decreasing on (0, 4), maximum at x = 0, minimum at x = 4, concave down for x < 2, up for x > 2,
// inflection point at x = 2. Check: the inflection point (2, −16) is halfway between (0, 0) and
// (4, −32), as it is for every cubic.

const QUESTION =
  'For f(x) = x³ − 6x², determine (a) intervals where f is increasing or decreasing, (b) local minima and maxima of f, (c) intervals where f is concave up and concave down, and (d) the inflection points of f.';

const F = (x: number) => x ** 3 - 6 * x ** 2;
const g = plane({ x: [-2, 6], y: [-40, 10], xStep: 1, yStep: 10, width: 8, height: 7 });

/** The cubic: concave down (blue) before x = 2, concave up (orange) after, with its three key points. */
const graph = (height = 470) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'down', f: F, from: -1.6, to: 2, tone: 'adj' }),
      plot(g, { id: 'up', f: F, from: 2, to: 6, tone: 'opp' }),
      dots(g, [
        { id: 'max', x: 0, y: 0, tex: '(0, 0)', tone: 'theta', place: 'above right' },
        { id: 'inf', x: 2, y: -16, tex: '(2, -16)', tone: 'theta', place: 'right' },
        { id: 'min', x: 4, y: -32, tex: '(4, -32)', tone: 'theta', place: 'below' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-6-3',
  lessonId: '',
  exam: {
    lesson: 'm31-6-3',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 4.5, Derivatives and the Shape of a Graph',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/4-5-derivatives-and-the-shape-of-a-graph',
    question: QUESTION,
  },
  title: 'Exam Question: The Shape of f(x) = x³ − 6x² (Concavity and Inflection Points)',
  thumbnailTitle: 'Where the Curve Changes Its Bend',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: for f(x) = x³ − 6x², find (a) where f is increasing or decreasing, (b) its local maxima and minima, (c) where it is concave up or down, and (d) its inflection points. The first derivative f′(x) = 3x(x − 4) gives increasing for x < 0 and x > 4, decreasing on (0, 4), a local maximum at x = 0 and a local minimum at x = 4. The second derivative f″(x) = 6x − 12 gives concave down for x < 2, concave up for x > 2, and an inflection point at x = 2. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where the Curve Changes Its Bend', subtitle: 'Concavity and curve sketching, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about concavity and inflection points. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'For $f(x) = x^3 - 6x^2$, determine (a) intervals where $f$ is increasing or decreasing, (b) local minima and maxima of $f$, (c) intervals where $f$ is concave up and concave down, and (d) the inflection points of $f$.',
          answer: '(a) increasing for $x < 0$ and $x > 4$, decreasing for $0 < x < 4$ (b) maximum at $x = 0$, minimum at $x = 4$ (c) concave down for $x < 2$, up for $x > 2$ (d) inflection point at $x = 2$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'For f of x equals x cubed minus 6 x squared. Part "a": where is f increasing or decreasing? Part b: the local minima and maxima. Part c: where is f concave up and concave down? Part d: the inflection points.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Parts', 'Tool', 'It tells us'],
          rows: [
            ['(a), (b)', '$f\'$', 'going **up** or **down**, and the turns'],
            ['(c), (d)', '$f\'\'$', 'bending like a **cup** or a **cap**, and where the bend changes'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what it is asking. Parts "a" and b use the first derivative: is the graph going up or down, and where does it turn?', show: 'tab' },
        { say: 'Parts c and d use the second derivative: is the graph bending like a cup or like a cap, and where does the bend change?' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['Sign', 'Meaning'],
          rows: [
            ['$f\'\' > 0$', 'concave **up**: a cup, the slope is increasing'],
            ['$f\'\' < 0$', 'concave **down**: a cap, the slope is decreasing'],
            ['$f\'\'$ changes sign', 'an **inflection point**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need for the new parts. Where the second derivative is positive, the graph is concave up, like a cup. The slope is increasing.', show: 'rules' },
        { say: 'Where it is negative, the graph is concave down, like a cap. And where the second derivative changes sign, the bend changes: an inflection point.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['$f\'$: critical numbers and **sign chart**', '(a), (b) from the signs of $f\'$', '$f\'\'$: where it is $0$, and its **signs**', '(c), (d) from the signs of $f\'\'$'] }],
      lines: [
        { say: 'Here is the plan. Find the first derivative, its critical numbers, and its signs.', show: 'plan.0' },
        { say: 'Read parts "a" and b from those signs.', show: 'plan.1' },
        { say: 'Then find the second derivative, where it is 0, and its signs.', show: 'plan.2' },
        { say: 'And read parts c and d from those.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The first derivative',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f\'(x) = 3x^2 - 12x = 3x(x - 4)', '+ \\ (x < 0), \\quad - \\ (0 < x < 4), \\quad + \\ (x > 4)'] }],
      lines: [
        { say: 'Step one. f prime of x is 3 x squared minus 12x, which factors as 3x times x minus 4. It is 0 at 0 and at 4.', show: 'm.0' },
        { say: 'Test the signs. Below 0, both factors are negative, so f prime is positive. Between 0 and 4, it is negative. Above 4, positive.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Parts (a) and (b)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) increasing: } \\good{x < 0, \\ x > 4}; \\ \\text{decreasing: } \\good{0 < x < 4}', '\\text{(b) max at } \\good{x = 0} \\ (f = 0); \\ \\text{min at } \\good{x = 4} \\ (f = -32)'] }],
      lines: [
        { say: 'Step two, part "a". f is increasing where f prime is positive: below 0 and above 4. It is decreasing between 0 and 4.', show: 'm.0' },
        { say: 'Part b. At 0, up turns to down: a local maximum, f of 0 is 0. At 4, down turns to up: a local minimum, f of 4 is 64 minus 96, which is negative 32.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Parts (c) and (d)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f\'\'(x) = 6x - 12 = 0 \\implies x = 2', '\\text{(c) concave down: } \\good{x < 2}; \\ \\text{concave up: } \\good{x > 2}', '\\text{(d) inflection point at } \\good{x = 2}: \\ (2, -16)'] }],
      lines: [
        { say: 'Step three. Differentiate again: f double prime of x is 6x minus 12. It is 0 at x equals 2.', show: 'm.0' },
        { say: 'Part c. Below 2, 6x minus 12 is negative, so the graph is concave down. Above 2, it is positive, so concave up.', show: 'm.1' },
        { say: 'Part d. The sign changes at 2, so there is an inflection point there. f of 2 is 8 minus 24, which is negative 16.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Blue: concave **down**. Orange: concave **up**. The bend changes at $(2, -16)$, exactly **halfway** between the hill and the valley.' }],
      lines: [
        { say: 'Let us check on a graph. Up to 2, the graph bends like a cap: concave down.', show: ['g.grid', 'g.axes', 'g.down'] },
        { say: 'After 2, it bends like a cup: concave up.', show: 'g.up' },
        { say: 'Here is the hill at 0, the valley at 4, and the inflection point at 2, exactly halfway between them, as it always is for a cubic. It checks out.', show: ['g.max', 'g.min', 'g.inf', 't'] },
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
            ['Concavity from $f\'$', 'concavity comes from $f\'\'$'],
            ['"Concave down means decreasing"', 'different ideas: $(-1, 0)$ is **increasing** and concave down'],
            ['$f\'\' = 0$ means inflection', 'only if $f\'\'$ **changes sign** there'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The signs of f prime tell you up or down. Concavity needs the second derivative.' },
        { say: 'Concave down does not mean decreasing. Between negative 1 and 0, the graph is going up and is concave down.' },
        { say: 'And f double prime equal to 0 is not enough. The sign has to change, as it does here at 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the inflection point of $f(x) = x^3 + 3x^2$.',
          choices: ['$(0, 0)$', '$(-1, 2)$', '$(-2, 4)$', '$(1, 4)$'],
          answer: 1,
          working: '$f\'\'(x) = 6x + 6 = 0$ at $x = -1$, and it changes sign there; $f(-1) = -1 + 3 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the inflection point of f of x equals x cubed plus 3 x squared. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'f double prime is 6x plus 6, which is 0 at negative 1 and changes sign there. f of negative 1 is negative 1 plus 3, which is 2. Choice B. The points at 0 and negative 2 are the turning points, not the inflection point.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$f\'$: increasing, decreasing, maxima and minima', '$f\'\'$: concave up ($+$) or down ($-$)', 'Inflection point: $f\'\'$ **changes sign**', 'Give the **point**: find $f$ there too'] }],
      lines: [
        { say: 'Here is what to remember. The first derivative gives increasing, decreasing, and the maxima and minima.', show: 'sum.0' },
        { say: 'The second derivative gives concave up where it is positive, and concave down where it is negative.', show: 'sum.1' },
        { say: 'An inflection point is where the second derivative changes sign.', show: 'sum.2' },
        { say: 'And to give the point, find f there too. For more on concavity and curve sketching, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
