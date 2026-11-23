import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 3.3 (the factor theorem). The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 5.5, Zeros of Polynomial Functions,
// CC BY-NC-SA 4.0), with its set's instruction in front of it. f(−2) = 0, synthetic division by −2
// leaves 2x² − 3x + 1 = (2x − 1)(x − 1), so the zeros are −2, 1 and 1/2, as in the book's answer.

const f = (x: number) => 2 * x ** 3 + x * x - 5 * x + 2;
const g = plane({ x: [-3, 2.5], y: [-4, 8], every: 2, width: 11, height: 11 });

/** y = f(x) (`f`) and its three zeros (`z`). */
const graph = (height = 420) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f, from: -2.6, to: 1.75, tone: 'adj', samples: 120 }),
      dots(g, [
        { id: 'z0', x: -2, y: 0, tex: '-2', tone: 'good', place: 'above left', group: 'z' },
        { id: 'z1', x: 0.5, y: 0, tex: '\\tfrac{1}{2}', tone: 'good', place: 'above right', group: 'z' },
        { id: 'z2', x: 1, y: 0, tex: '1', tone: 'good', place: 'below right', group: 'z' },
      ]),
    ],
    height,
  );

const QUESTION = 'Use the given factor and the Factor Theorem to find all real zeros for the given polynomial function. f(x) = 2x³ + x² − 5x + 2; x + 2';

const video: Explainer = {
  id: 'xq-m301-3-3',
  lessonId: '',
  exam: {
    lesson: 'm301-3-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.5, Zeros of Polynomial Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-5-zeros-of-polynomial-functions',
    question: QUESTION,
  },
  title: 'Exam Question: All the Zeros of 2x³ + x² − 5x + 2 From One Factor (The Factor Theorem)',
  thumbnailTitle: 'From One Factor to All Zeros',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: given that x + 2 is a factor of f(x) = 2x³ + x² − 5x + 2, find all its real zeros. We check that f(−2) = 0, divide by x + 2 to leave 2x² − 3x + 1, and factor that, so the zeros are −2, 1/2 and 1. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'From One Factor to All Zeros', subtitle: 'The factor theorem, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the factor theorem. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the given factor and the Factor Theorem to find all real zeros for the given polynomial function. $f(x) = 2x^3 + x^2 - 5x + 2$; $x + 2$',
          answer: '$x = -2$, $x = \\frac{1}{2}$ and $x = 1$',
          working: 'Divide by $x + 2$: $2x^2 - 3x + 1 = (2x - 1)(x - 1)$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the given factor and the Factor Theorem to find all real zeros for the given polynomial function. f of x equals 2 x cubed, plus x squared, minus 5 x, plus 2. The given factor is x plus 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A cubic can have up to **three** zeros. We are given **one** factor, so we use it to break the cubic into **smaller pieces** we can solve.' }],
      lines: [
        { say: 'A cubic polynomial can have up to three zeros, the x-values where f of x is 0.', show: 't' },
        { say: 'We are given one factor. We use it to break the cubic into smaller pieces that we can solve.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ft', tone: 'key', title: 'The Factor Theorem', md: '$x - a$ is a factor of $P(x)$ exactly when $P(a) = 0$. Then $P(x) = (x - a)\\,Q(x)$.' },
        { kind: 'callout', id: 'sd', tone: 'tip', title: 'Synthetic division', md: 'Dividing by $x - a$ with synthetic division gives the **quotient** $Q(x)$, one degree lower.' },
      ],
      lines: [
        { say: 'Here is what we need. x minus "a" is a factor of P of x exactly when P of "a" is 0. Then P of x is x minus "a", times another polynomial Q of x.', show: 'ft' },
        { say: 'And synthetic division by "a" gives us that quotient, Q of x, which is one degree lower.', show: 'sd' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Check** that $f({-2}) = 0$', '**Divide** by $x + 2$ to find the quotient', '**Factor** the quotient for the other zeros'] }],
      lines: [
        { say: 'Here is the plan. First, check that f of negative 2 is 0.', show: 'plan.0' },
        { say: 'Second, divide by x plus 2 to find the quotient.', show: 'plan.1' },
        { say: 'Third, factor the quotient to find the other zeros.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Check the factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f({-2}) = 2({-8}) + 4 - 5({-2}) + 2', '= {-16} + 4 + 10 + 2 = \\good{0}'] }],
      lines: [
        { say: 'Step one. x plus 2 is zero when x is negative 2, so work out f of negative 2.', show: 'm.0' },
        { say: 'Negative 16, plus 4, plus 10, plus 2 is 0. So x plus 2 really is a factor, and negative 2 is one zero.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Divide',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\begin{array}{r|rrrr} {-2} & 2 & 1 & {-5} & 2 \\\\ & & {-4} & 6 & {-2} \\\\ \\hline & 2 & {-3} & 1 & 0 \\end{array}', 'Q(x) = \\good{2x^2 - 3x + 1}'],
        },
      ],
      lines: [
        { say: 'Step two. Use synthetic division by negative 2. Bring down the 2. 2 times negative 2 is negative 4, and 1 plus negative 4 is negative 3.', show: 'm.0' },
        { say: 'Negative 3 times negative 2 is 6, and negative 5 plus 6 is 1. Then 1 times negative 2 is negative 2, and 2 plus negative 2 is 0. The remainder is 0, as it should be.' },
        { say: 'The other numbers, 2, negative 3 and 1, make the quotient: 2 x squared, minus 3 x, plus 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Factor the rest',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = (x + 2)(2x^2 - 3x + 1)', '= (x + 2)(2x - 1)(x - 1)', 'x = \\good{-2}, \\ x = \\good{\\tfrac{1}{2}}, \\ x = \\good{1}'] }],
      lines: [
        { say: 'Step three. Now f of x is x plus 2, times 2 x squared, minus 3 x, plus 1.', show: 'm.0' },
        { say: 'The quadratic factors as 2 x minus 1, times x minus 1.', show: 'm.1' },
        { say: 'Set each factor to zero. x plus 2 gives negative 2. 2 x minus 1 gives one half. x minus 1 gives 1. Those are all three real zeros.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(420), { kind: 'math', id: 'm', size: 'md', lines: ['f(1) = 2 + 1 - 5 + 2 = 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check on a graph. Here is y equals f of x.', show: ['gr.grid', 'gr.axes', 'gr.f'] },
        { say: 'It crosses the x-axis three times: at negative 2, at one half, and at 1.', show: 'gr.z', focus: 'gr.z' },
        { say: 'And f of 1 is 2, plus 1, minus 5, plus 2, which is 0. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['zero at $x = 2$', 'the factor $x + 2$ is zero at $x = -2$'],
            ['only $x = -2$', 'the question asks for **all** real zeros: factor the quotient'],
            ['zero at $x = 2$ from $2x - 1$', '$2x - 1 = 0$ gives $x = \\frac{1}{2}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The factor x plus 2 gives the zero negative 2, not positive 2.' },
        { say: 'Do not stop at negative 2. The question asks for all the real zeros, so factor the quotient too.' },
        { say: 'And 2 x minus 1 equals 0 gives x equals one half, not 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a factor of $P(x) = x^3 - 2x^2 - 5x + 6$?',
          choices: ['$x + 1$', '$x - 2$', '$x + 3$', '$x - 1$'],
          answer: 3,
          working: '$P(1) = 1 - 2 - 5 + 6 = 0$, so $x - 1$ is a factor. $P({-1}) = 8$, $P(2) = -4$ and $P({-3}) = -24$ are not zero.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a factor of P of x equals x cubed, minus 2 x squared, minus 5 x, plus 6? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Test the value that makes each factor zero. P of 1 is 1, minus 2, minus 5, plus 6, which is 0, so x minus 1 is a factor: choice D. The others do not give 0.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$x - a$ is a factor when $P(a) = 0$', '**Divide** to get a quotient one degree lower', '**Factor** the quotient for the other zeros', 'Check each zero, or look at the graph'] }],
      lines: [
        { say: 'Here is what to remember. x minus "a" is a factor exactly when P of "a" is 0.', show: 'sum.0' },
        { say: 'Divide by the factor to get a quotient one degree lower.', show: 'sum.1' },
        { say: 'Factor the quotient to find the other zeros.', show: 'sum.2' },
        { say: 'And check each zero, or look where the graph crosses the x-axis. For more on the factor theorem, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
