import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 3.2 (the derivative from first principles). The question is an
// exercise from OpenStax Calculus Volume 1 (section 3.1, Defining the Derivative, CC BY-NC-SA
// 4.0): the book's instruction "For the following functions, use [the equation] to find the slope
// of the tangent line m_tan = f′(a), and find an equation of the tangent line to f at x = a" is put
// with the one function it asks about, and the equation it links to is written out. The
// difference quotient simplifies to −7/(3(3 + h)) → −7/9, and the tangent is y = −(7/9)x + 14/3,
// as in the book's answers. Check: 7/x = −7x/9 + 14/3 gives (x − 3)² = 0, a double root.

const QUESTION =
  'Use m_tan = lim h→0 (f(a + h) − f(a))/h to (a) find the slope of the tangent line m_tan = f′(a), and (b) find an equation of the tangent line to f at x = a: f(x) = 7/x, a = 3.';

const DEF = 'm_{\\tan} = \\lim_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}';
const g = plane({ x: [0, 7], y: [0, 8], xStep: 1, yStep: 1, width: 7, height: 7 });

/** y = 7/x and its tangent line at (3, 7/3). */
const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'f', f: (x) => 7 / x, from: 0.875, to: 7, tone: 'adj' }),
      plot(g, { id: 't', f: (x) => (-7 / 9) * x + 14 / 3, from: 0, to: 6, tone: 'theta' }),
      dots(g, [{ id: 'p', x: 3, y: 7 / 3, tex: '\\left(3, \\tfrac{7}{3}\\right)', tone: 'theta', place: 'above right' }]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-3-2',
  lessonId: '',
  exam: {
    lesson: 'm31-3-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.1, Defining the Derivative',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative',
    question: QUESTION,
  },
  title: 'Exam Question: The Tangent to y = 7/x at x = 3 from the Definition (First Principles)',
  thumbnailTitle: 'The Derivative from Scratch',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: for f(x) = 7/x at a = 3, use the limit definition m = lim h→0 (f(a + h) − f(a))/h to (a) find the slope of the tangent line and (b) find its equation. We combine the fractions on top, cancel the h, and let h go to 0 to get −7/9. The point is (3, 7/3), so the tangent is y = −(7/9)x + 14/3. Then we check that the line just touches the curve and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Derivative from Scratch', subtitle: 'First principles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the derivative from its definition. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: `Use $${DEF}$ to (a) find the slope of the tangent line $m_{\\tan} = f'(a)$, and (b) find an equation of the tangent line to $f$ at $x = a$: $f(x) = \\dfrac{7}{x}$, $a = 3$.`,
          answer: '(a) $-\\dfrac{7}{9}$ (b) $y = -\\dfrac{7}{9}x + \\dfrac{14}{3}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Use the limit as h goes to 0 of f of "a" plus h, minus f of "a", all over h. Part "a": find the slope of the tangent line, f prime of "a". Part b: find an equation of the tangent line, for f of x equals 7 over x, at "a" equals 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Find the slope of the line that **just touches** $y = \\dfrac{7}{x}$ at $x = 3$, using only the definition: no shortcuts.' }],
      lines: [
        { say: 'Here is the curve y equals 7 over x.', show: ['g.grid', 'g.axes', 'g.f'] },
        { say: 'At x equals 3, the point is 3 comma 7 thirds. We want the line that just touches the curve there: the tangent line.', show: ['g.p', 'g.t'] },
        { say: 'And we must find its slope from the definition, with no shortcut rules.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: [DEF] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The idea', md: 'The fraction is the slope of a secant over a gap of $h$. We cannot put $h = 0$ in straight away: first **simplify until the $h$ on the bottom cancels**.' },
      ],
      lines: [
        { say: 'Here is the definition. The fraction is the slope of a secant line, across a small gap h.', show: 'f' },
        { say: 'Putting h equals 0 in straight away gives 0 over 0. So first we simplify until the h on the bottom cancels. Then we let h go to 0.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $f(3 + h)$ and $f(3)$', 'Combine the fractions on top, then **cancel** $h$', 'Let $h \\to 0$', 'Point-slope form for the **line**'] }],
      lines: [
        { say: 'Here is the plan. Write f of 3 plus h, and f of 3.', show: 'plan.0' },
        { say: 'Combine the fractions on top, then cancel the h.', show: 'plan.1' },
        { say: 'Let h go to 0.', show: 'plan.2' },
        { say: 'Then use point-slope form for the line.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Set it up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(3 + h) = \\dfrac{7}{3 + h}, \\quad f(3) = \\dfrac{7}{3}', 'm_{\\tan} = \\lim_{h \\to 0} \\dfrac{\\dfrac{7}{3 + h} - \\dfrac{7}{3}}{h}'] }],
      lines: [
        { say: 'Step one. Replace x with 3 plus h: f of 3 plus h is 7 over 3 plus h. And f of 3 is 7 thirds.', show: 'm.0' },
        { say: 'Put them into the definition.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Simplify and cancel',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{3 + h} - \\dfrac{7}{3} = \\dfrac{21 - 7(3 + h)}{3(3 + h)} = \\dfrac{-7h}{3(3 + h)}', '\\dfrac{-7h}{3(3 + h)} \\div h = \\dfrac{-7}{3(3 + h)}', 'm_{\\tan} = \\lim_{h \\to 0} \\dfrac{-7}{3(3 + h)} = \\dfrac{-7}{9} = \\good{-\\dfrac{7}{9}}'] }],
      lines: [
        { say: 'Step two. Combine the two fractions on top over the common denominator 3 times 3 plus h. The top becomes 21 minus 7 times 3 plus h, which is negative 7h.', show: 'm.0' },
        { say: 'Dividing by h cancels the h. We are left with negative 7 over 3 times 3 plus h.', show: 'm.1' },
        { say: 'Now h can go to 0: negative 7 over 3 times 3, which is negative 7 ninths. That is the slope, part "a".', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The tangent line',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y - \\dfrac{7}{3} = -\\dfrac{7}{9}(x - 3)', 'y = -\\dfrac{7}{9}x + \\dfrac{7}{3} + \\dfrac{7}{3}', '\\good{y = -\\dfrac{7}{9}x + \\dfrac{14}{3}}'] }],
      lines: [
        { say: 'Step three, part b. The line goes through 3 comma 7 thirds with slope negative 7 ninths. Use point-slope form.', show: 'm.0' },
        { say: 'Expand: negative 7 ninths times negative 3 is 7 thirds. Add the 7 thirds from the left side.', show: 'm.1' },
        { say: 'So the tangent line is y equals negative 7 ninths x, plus 14 thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{x} = -\\dfrac{7}{9}x + \\dfrac{14}{3} \\quad (\\times 9x)', '63 = -7x^2 + 42x \\implies x^2 - 6x + 9 = 0', '(x - 3)^2 = 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that the line really just touches the curve. Set them equal, and multiply by 9x.', show: 'm.0' },
        { say: '63 equals negative 7 x squared plus 42 x. Divide by 7 and tidy up: x squared minus 6x plus 9 equals 0.', show: 'm.1' },
        { say: 'That is x minus 3, squared. A double root at 3: the line meets the curve only there, and just touches it. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$f(3 + h) = \\dfrac{7}{3} + h$', 'replace **every** $x$ with the whole $3 + h$'],
            ['Put $h = 0$ first', '$\\dfrac{0}{0}$: cancel the $h$ **before** the limit'],
            ['$y = -\\dfrac{7}{9}x$', 'the line must pass through $\\left(3, \\tfrac{7}{3}\\right)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'f of 3 plus h is 7 over the whole of 3 plus h, not 7 thirds plus h.' },
        { say: 'Putting h equals 0 in first gives 0 over 0. Cancel the h before you take the limit.' },
        { say: 'And the slope alone is not the line. It must pass through the point at 3 comma 7 thirds.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Use the definition to find $f\'(2)$ for $f(x) = \\dfrac{1}{x}$.',
          choices: ['$-\\dfrac{1}{4}$', '$\\dfrac{1}{4}$', '$-\\dfrac{1}{2}$', '$\\dfrac{1}{2}$'],
          answer: 0,
          working: '$\\dfrac{\\frac{1}{2 + h} - \\frac{1}{2}}{h} = \\dfrac{-1}{2(2 + h)} \\to -\\dfrac{1}{4}$',
        },
      ],
      lines: [
        { say: 'Your turn. Use the definition to find f prime of 2, for f of x equals 1 over x. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Combine the fractions: the top is negative h over 2 times 2 plus h. Cancel the h, and let h go to 0: negative 1 over 4. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$f\'(a) = \\displaystyle\\lim_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}$', 'Simplify the top until the $h$ **cancels**', 'Then let $h \\to 0$', 'Tangent line: point-slope with $\\big(a, f(a)\\big)$'] }],
      lines: [
        { say: 'Here is what to remember. f prime of "a" is the limit as h goes to 0 of f of "a" plus h, minus f of "a", over h.', show: 'sum.0' },
        { say: 'Simplify the top until the h on the bottom cancels.', show: 'sum.1' },
        { say: 'Then let h go to 0.', show: 'sum.2' },
        { say: 'For the tangent line, use point-slope form with the point at "a", f of "a". For more on the derivative from first principles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
