import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 7.4 (reciprocal functions): the domain and asymptotes of
// f(x) = 2/(5x + 2). The question is an exercise from OpenStax College Algebra 2e, word for word
// apart from "For the following exercises," (section 5.6, Rational Functions, CC BY-NC-SA 4.0),
// whose answer key gives V.A. x = −2/5, H.A. y = 0, domain all reals x ≠ −2/5. In the course's
// language f is the reciprocal of g(x) = (5x + 2)/2, with invariant points (0, 1) and (−4/5, −1).

const g = plane({ x: [-2.5, 1.5], y: [-3, 3], every: 1, width: 9, height: 7 });
const f = (x: number) => 2 / (5 * x + 2);

/** g(x) = (5x + 2)/2 dashed, its reciprocal f in two branches, the asymptote x = −2/5 and the invariant points. */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'g', f: (x) => (5 * x + 2) / 2, tone: 'muted', dashed: true, label: 'y = g(x)', labelAt: 0.15, side: 'left' }),
      polyline(g, { id: 'va', points: [[-0.4, -3], [-0.4, 3]], tone: 'bad', dashed: true }),
      plot(g, { id: 'fl', f, from: -2.5, to: -0.43, tone: 'brand' }),
      plot(g, { id: 'fr', f, from: -0.37, to: 1.5, tone: 'brand', label: 'y = f(x)', labelAt: 0.85 }),
      dots(g, [
        { id: 'P', x: 0, y: 1, tone: 'good', group: 'inv' },
        { id: 'Q', x: -0.8, y: -1, tone: 'good', group: 'inv' },
      ]),
    ],
    520,
  );

const QUESTION = 'Find the domain, vertical asymptotes, and horizontal asymptotes of the functions. f(x) = 2/(5x + 2)';

const video: Explainer = {
  id: 'xq-m201-7-4',
  lessonId: '',
  exam: {
    lesson: 'm201-7-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.6, Rational Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-6-rational-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Domain and Asymptotes of f(x) = 2/(5x + 2) (Reciprocal Functions)',
  thumbnailTitle: 'Asymptotes of 2/(5x + 2)',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: find the domain, vertical asymptote and horizontal asymptote of f(x) = 2/(5x + 2). The bottom is 0 at x = −2/5, so the domain is all real numbers except −2/5 and the vertical asymptote is x = −2/5. As x grows, the fraction shrinks toward 0, so the horizontal asymptote is y = 0. Then we see it on a graph as the reciprocal of a line and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find the Asymptotes', subtitle: 'Reciprocal functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about reciprocal functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the domain, vertical asymptotes, and horizontal asymptotes of the functions. $f(x) = \\dfrac{2}{5x + 2}$',
          answer: 'Domain $x \\neq -\\tfrac{2}{5}$; V.A. $x = -\\tfrac{2}{5}$; H.A. $y = 0$',
          working: '$5x + 2 = 0$ at $x = -\\tfrac{2}{5}$, and $\\dfrac{2}{5x + 2} \\to 0$ as $x$ grows.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the domain, the vertical asymptotes and the horizontal asymptotes of f of x equals 2 over 5 x plus 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Which $x$ values are **allowed**, which **vertical line** the graph never touches, and which **horizontal line** it approaches far to the left and right.' }],
      lines: [{ say: 'We need three things: which x values are allowed, the vertical line the graph never touches, and the horizontal line the graph gets closer and closer to, far to the left and right.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rec', tone: 'definition', title: 'A reciprocal function', md: '$f(x) = \\dfrac{2}{5x + 2} = \\dfrac{1}{g(x)}$ where $g(x) = \\dfrac{5x + 2}{2}$ is a **line**.' },
        { kind: 'callout', id: 'asy', tone: 'key', title: 'Asymptotes', md: 'Where $g(x) = 0$, $f$ has a **vertical asymptote**. Where $g$ gets huge, $\\dfrac{1}{g}$ gets close to $0$.' },
      ],
      lines: [
        { say: 'Here is what we need. 2 over 5 x plus 2 is 1 over 5 x plus 2 over 2. So f is the reciprocal of a line, g of x equals 5 x plus 2, over 2.', show: 'rec' },
        { say: 'Where g is 0, we would divide by 0, so f has a vertical asymptote there. And where g gets huge, 1 over g gets very close to 0.', show: 'asy' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find where the **denominator** is $0$: the domain', 'That $x$ gives the **vertical asymptote**', 'Large $x$ gives the **horizontal asymptote**'] }],
      lines: [
        { say: 'Here is the plan. First, find where the denominator is 0. That gives the domain.', show: 'plan.0' },
        { say: 'Second, that same x value gives the vertical asymptote.', show: 'plan.1' },
        { say: 'Third, see what happens for very large x. That gives the horizontal asymptote.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The domain',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['5x + 2 = 0', 'x = -\\dfrac{2}{5}', '\\text{domain: } \\good{\\left\\{x \\mid x \\neq -\\tfrac{2}{5},\\ x \\in \\mathbb{R}\\right\\}}'] }],
      lines: [
        { say: 'Step one. The denominator is 0 when 5 x plus 2 equals 0.', show: 'm.0' },
        { say: 'Subtract 2 and divide by 5: x equals negative 2 fifths.', show: 'm.1' },
        { say: 'So the domain is all real numbers except negative 2 fifths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The vertical asymptote',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = -0.39: \\quad \\dfrac{2}{0.05} = 40', 'x = -0.41: \\quad \\dfrac{2}{-0.05} = -40', '\\text{V.A.: } \\good{x = -\\tfrac{2}{5}}'] }],
      lines: [
        { say: 'Step two. The top is 2, which is never 0. So near negative 2 fifths, we divide 2 by a tiny number. Just to the right, at negative 0.39, f is 2 over 0.05, which is 40.', show: 'm.0' },
        { say: 'Just to the left, at negative 0.41, f is 2 over negative 0.05, which is negative 40. The graph shoots up on one side and down on the other.', show: 'm.1' },
        { say: 'So the vertical asymptote is the line x equals negative 2 fifths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The horizontal asymptote',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 100: \\quad \\dfrac{2}{502} \\approx 0.004', 'x = -100: \\quad \\dfrac{2}{-498} \\approx -0.004', '\\text{H.A.: } \\good{y = 0}'] }],
      lines: [
        { say: 'Step three. For a big x like 100, f is 2 over 502, about 0.004. Very close to 0.', show: 'm.0' },
        { say: 'For x equals negative 100, f is 2 over negative 498, about negative 0.004. Also very close to 0.', show: 'm.1' },
        { say: 'The top stays 2 while the bottom grows, so the fraction shrinks toward 0. The horizontal asymptote is y equals 0, the x-axis.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 700,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Where the line $g$ crosses $0$, $f$ has its **asymptote**. Where $g = \\pm 1$, so does $f$: the **invariant points** $(0, 1)$ and $\\left(-\\tfrac{4}{5}, -1\\right)$.' }],
      lines: [
        { say: 'Let us check on a graph. Here is the line g, dashed.', show: ['gr.grid', 'gr.axes', 'gr.g'] },
        { say: 'g crosses 0 at negative 2 fifths, and there is the vertical asymptote.', show: 'gr.va' },
        { say: 'Here is f, the reciprocal. It hugs the asymptote, and flattens toward the x-axis on both sides.', show: ['gr.fl', 'gr.fr'] },
        { say: 'Where g is 1 or negative 1, its reciprocal is the same, so the two graphs meet at the point at 0, 1, and the point at negative 4 fifths, negative 1. These are the invariant points.', show: ['gr.inv', 't'], focus: 'gr.inv' },
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
            ['V.A. $x = \\tfrac{2}{5}$', 'solve $5x + 2 = 0$: the sign is **negative**'],
            ['H.A. $y = 2$', 'the top stays $2$ but the bottom grows: $y = 0$'],
            ['domain $x \\neq 0$', 'exclude where the **denominator** is $0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Watch the sign. 5 x plus 2 is 0 at negative 2 fifths, not positive 2 fifths.' },
        { say: 'The horizontal asymptote is not y equals 2. The fraction shrinks toward 0 as the bottom grows.' },
        { say: 'And x equals 0 is allowed. f of 0 is 2 over 2, which is 1. Only the value that makes the bottom 0 is excluded.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the asymptotes of $y = \\dfrac{1}{x - 3}$.',
          choices: ['$x = -3$ and $y = 0$', '$x = 3$ and $y = 1$', '$x = 3$ and $y = 0$', '$x = 0$ and $y = 3$'],
          answer: 2,
          working: '$x - 3 = 0$ at $x = 3$, and $\\dfrac{1}{x - 3} \\to 0$ as $x$ grows.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the asymptotes of y equals 1 over x minus 3. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The bottom is 0 when x is 3, so the vertical asymptote is x equals 3. As x grows, 1 over x minus 3 shrinks toward 0, so the horizontal asymptote is y equals 0, choice C. A gets the sign wrong, and B uses the top as the horizontal asymptote.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Bottom $= 0$: excluded from the **domain**', 'That $x$ is the **vertical asymptote**', 'Bottom grows, top fixed: **H.A.** $y = 0$', '$g = \\pm 1$: **invariant points**'] }],
      lines: [
        { say: 'Here is what to remember. Where the bottom is 0, x is excluded from the domain.', show: 'sum.0' },
        { say: 'If the top is not 0 there, that x is a vertical asymptote.', show: 'sum.1' },
        { say: 'When the bottom grows and the top stays the same, the horizontal asymptote is y equals 0.', show: 'sum.2' },
        { say: 'And a function and its reciprocal meet where they equal 1 or negative 1. For more on reciprocal functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
