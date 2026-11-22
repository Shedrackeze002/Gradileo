import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 7.2 (the quadratic formula). The question is an exercise from
// OpenStax Intermediate Algebra 2e, word for word (section 9.3, Solve Quadratic Equations Using the
// Quadratic Formula, CC BY-NC-SA 4.0), with its set's instruction in front of it. With a = 1, b = 8
// and c = −4 the discriminant is 64 + 16 = 80, √80 = 4√5, and x = (−8 ± 4√5) / 2 = −4 ± 2√5, as in
// the book's answer. On a graph, y = x² + 8x − 4 crosses the x-axis near 0.47 and −8.47.

const g = plane({ x: [-9.5, 1.5], y: [-22, 6], xStep: 1, yStep: 4, every: 2, width: 12, height: 9 });
const R = 2 * Math.sqrt(5);

/** y = x² + 8x − 4 and the two places where it crosses the x-axis (group `roots`). */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'curve', f: (x) => x * x + 8 * x - 4, from: -9.09, to: 1.09, tone: 'adj' }),
      dots(g, [
        { id: 'a', x: -4 - R, y: 0, tex: '-8.47', tone: 'good', place: 'above right', group: 'roots' },
        { id: 'b', x: -4 + R, y: 0, tex: '0.47', tone: 'good', place: 'below right', group: 'roots' },
      ]),
    ],
    height,
  );

const QUESTION = 'Solve by using the Quadratic Formula. x² + 8x − 4 = 0';

const video: Explainer = {
  id: 'xq-m202-7-2',
  lessonId: '',
  exam: {
    lesson: 'm202-7-2',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 9.3, Solve Quadratic Equations Using the Quadratic Formula',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/9-3-solve-quadratic-equations-using-the-quadratic-formula',
    question: QUESTION,
  },
  title: 'Exam Question: Solve x² + 8x − 4 = 0 (The Quadratic Formula)',
  thumbnailTitle: 'Solve x² + 8x − 4 = 0',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve x² + 8x − 4 = 0 with the quadratic formula. We read off a = 1, b = 8 and c = −4, find the discriminant 80, put everything in the formula, and simplify √80 = 4√5 to get x = −4 ± 2√5. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve x² + 8x − 4 = 0', subtitle: 'The quadratic formula, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the quadratic formula. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve by using the Quadratic Formula. $x^2 + 8x - 4 = 0$',
          answer: '$x = -4 \\pm 2\\sqrt{5}$',
          working: '$b^2 - 4ac = 64 + 16 = 80$, so $x = \\dfrac{-8 \\pm 4\\sqrt{5}}{2} = -4 \\pm 2\\sqrt{5}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve by using the quadratic formula: x squared plus 8 x minus 4 equals 0.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $x$ that makes $x^2 + 8x - 4$ equal $0$. No two whole numbers multiply to $-4$ and add to $8$, so it does **not factor**: use the **formula**.' }],
      lines: [
        { say: 'We need every value of x that makes x squared plus 8 x minus 4 equal 0.', show: 't' },
        { say: 'Try to factor it, and you get stuck: no two whole numbers multiply to negative 4 and add to 8. That is exactly when the quadratic formula helps.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'qf', tone: 'key', title: 'The quadratic formula', md: 'For $ax^2 + bx + c = 0$: $\\; x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$' },
        { kind: 'callout', id: 'disc', tone: 'definition', title: 'The discriminant', md: 'The part under the root, $b^2 - 4ac$. Work it out **first**: it keeps the formula tidy.' },
      ],
      lines: [
        { say: 'Here is what we need. For "a" x squared plus b x plus c equals 0, x equals negative b, plus or minus the square root of b squared minus 4 "a" c, all over 2 "a".', show: 'qf' },
        { say: 'The part under the square root, b squared minus 4 "a" c, is called the discriminant. Working it out first keeps the formula tidy.', show: 'disc' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read off $a$, $b$ and $c$', 'Work out the **discriminant**', 'Put them in the **formula**', '**Simplify** the root and the fraction'] }],
      lines: [
        { say: 'Here is the plan. First, read off "a", b and c.', show: 'plan.0' },
        { say: 'Second, work out the discriminant.', show: 'plan.1' },
        { say: 'Third, put everything into the formula.', show: 'plan.2' },
        { say: 'Fourth, simplify the square root and the fraction.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Read off a, b and c',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1x^2 + 8x - 4 = 0', 'a = 1, \\quad b = 8, \\quad c = \\good{-4}'] }],
      lines: [
        { say: 'Step one. The equation is already in standard form, with 0 on one side.', show: 'm.0' },
        { say: 'x squared means 1 x squared, so "a" is 1. b is 8. And c is negative 4: keep the minus sign with it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The discriminant',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['b^2 - 4ac = 8^2 - 4(1)(-4)', '= 64 + 16', '= \\good{80}'] }],
      lines: [
        { say: 'Step two. Put the numbers into b squared minus 4 "a" c.', show: 'm.0' },
        { say: '8 squared is 64. Negative 4, times 1, times negative 4, is positive 16.', show: 'm.1' },
        { say: '64 plus 16 is 80. The discriminant is 80. It is positive, so there are two answers.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Use the formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', 'x = \\dfrac{-8 \\pm \\sqrt{80}}{2(1)}'] }],
      lines: [
        { say: 'Step three. Here is the formula.', show: 'm.0' },
        { say: 'Negative b is negative 8. Under the root goes the discriminant, 80. And 2 "a" is 2 times 1, which is 2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 4: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{80} = \\sqrt{16}\\sqrt{5} = 4\\sqrt{5}', 'x = \\dfrac{-8 \\pm 4\\sqrt{5}}{2}', 'x = \\good{-4 \\pm 2\\sqrt{5}}'] }],
      lines: [
        { say: 'Step four. 80 is 16 times 5, and 16 is a perfect square. So the square root of 80 is 4 root 5.', show: 'm.0' },
        { say: 'So x is negative 8, plus or minus 4 root 5, all over 2.', show: 'm.1' },
        { say: 'Divide both terms by 2. Negative 8 over 2 is negative 4, and 4 root 5 over 2 is 2 root 5. So x equals negative 4, plus or minus 2 root 5.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['{-4} - 2\\sqrt{5} \\approx {-8.47}, \\qquad {-4} + 2\\sqrt{5} \\approx 0.47'] }],
      lines: [
        { say: 'Let us check on a graph. 2 root 5 is about 4.47, so the answers are about negative 8.47 and 0.47.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'm.0'] },
        { say: 'The graph of y equals x squared plus 8 x minus 4 crosses the x-axis at exactly those two places. It checks out.', show: 'gr.roots', focus: 'gr.roots' },
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
            ['$x = \\dfrac{8 \\pm \\sqrt{80}}{2}$', 'the formula starts with $-b$, so $-8$'],
            ['$8^2 - 4(1)(4) = 48$', '$c$ is $-4$, so $-4ac$ is $+16$'],
            ['$-8 \\pm 2\\sqrt{5}$', 'divide **both** terms by $2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The formula starts with negative b. b is 8, so the top starts with negative 8, not 8.' },
        { say: 'c is negative 4, not 4. Negative 4 times 1 times negative 4 is plus 16, so the discriminant is 80, not 48.' },
        { say: 'And when you divide by 2, divide both terms: negative 8 and 4 root 5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $x^2 + 2x - 1 = 0$ with the quadratic formula.',
          choices: ['$x = 1 \\pm \\sqrt{2}$', '$x = -2 \\pm \\sqrt{2}$', '$x = -1 \\pm \\sqrt{2}$', '$x = -1 \\pm 2\\sqrt{2}$'],
          answer: 2,
          working: '$b^2 - 4ac = 4 + 4 = 8$ and $\\sqrt{8} = 2\\sqrt{2}$, so $x = \\dfrac{-2 \\pm 2\\sqrt{2}}{2} = -1 \\pm \\sqrt{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared plus 2 x minus 1 equals 0 with the quadratic formula. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '"a" is 1, b is 2 and c is negative 1. The discriminant is 4 plus 4, which is 8, and the square root of 8 is 2 root 2. So x is negative 2, plus or minus 2 root 2, over 2, which is negative 1 plus or minus root 2: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read off $a$, $b$, $c$ **with their signs**', 'Work out $b^2 - 4ac$ **first**', 'The formula starts with $-b$', 'Simplify the root, then divide **every** term'] }],
      lines: [
        { say: 'Here is what to remember. Read off "a", b and c with their signs.', show: 'sum.0' },
        { say: 'Work out the discriminant, b squared minus 4 "a" c, first.', show: 'sum.1' },
        { say: 'The formula starts with negative b.', show: 'sum.2' },
        { say: 'And simplify the square root, then divide every term. For more on the quadratic formula, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
