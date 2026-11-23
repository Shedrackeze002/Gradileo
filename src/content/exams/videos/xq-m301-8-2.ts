import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 8.2 (analyzing rational functions). The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 5.6, Rational Functions, CC
// BY-NC-SA 4.0), with its set's instruction in front of it. x² − 25 = (x − 5)(x + 5), so the domain
// leaves out ±5. The factor x + 5 cancels, leaving 1/(x − 5): a vertical asymptote at x = 5, a hole
// at (−5, −1/10) instead of an asymptote at x = −5, and, since the top's degree is lower, the
// horizontal asymptote y = 0, as in the book's answer.

const g = plane({ x: [-8.5, 10.5], y: [-3.5, 3.5], every: 2, width: 13, height: 7 });

/** f(x) = 1/(x − 5) with its hole (`h`), and its asymptotes (`va`, `ha`). */
const graph = (height = 480) =>
  figure(
    'gr',
    [
      g,
      polyline(g, { id: 'va', points: [[5, -3.5], [5, 3.5]], tone: 'bad', dashed: true }),
      plot(g, { id: 'f1', f: (x) => 1 / (x - 5), from: 5.29, to: 10.5, tone: 'good', samples: 160 }),
      plot(g, { id: 'f2', f: (x) => 1 / (x - 5), from: -8.5, to: 4.71, tone: 'good', samples: 200 }),
      dots(g, [
        { id: 'h', x: -5, y: -0.1, tex: '\\left(-5, -\\tfrac{1}{10}\\right)', tone: 'bad', place: 'above', open: true },
      ]),
      { points: { vl: g.map(5, 3.2) }, items: [{ kind: 'label', id: 'v', at: 'vl', tex: 'x = 5', tone: 'bad', place: 'right' }] },
    ],
    height,
  );

const QUESTION = 'Find the domain, vertical asymptotes, and horizontal asymptotes of the functions. f(x) = (x + 5)/(x² − 25)';

const video: Explainer = {
  id: 'xq-m301-8-2',
  lessonId: '',
  exam: {
    lesson: 'm301-8-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.6, Rational Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-6-rational-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Asymptotes and a Hole in (x + 5)/(x² − 25) (Analyzing Rational Functions)',
  thumbnailTitle: 'Asymptote or Hole?',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: find the domain, vertical asymptotes and horizontal asymptotes of f(x) = (x + 5)/(x² − 25). Factoring shows x cannot be 5 or −5, but the factor x + 5 cancels, so x = −5 is a hole, not an asymptote. The only vertical asymptote is x = 5, and the horizontal asymptote is y = 0. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Asymptote or Hole?', subtitle: 'Analyzing rational functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about analyzing rational functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the domain, vertical asymptotes, and horizontal asymptotes of the functions. $f(x) = \\dfrac{x + 5}{x^2 - 25}$',
          answer: 'domain all reals $x \\ne 5, -5$; vertical asymptote $x = 5$; horizontal asymptote $y = 0$',
          working: '$\\dfrac{x + 5}{(x - 5)(x + 5)} = \\dfrac{1}{x - 5}$ for $x \\ne -5$, so $x = -5$ is a hole.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the domain, vertical asymptotes, and horizontal asymptotes of the functions. f of x equals x plus 5, over x squared minus 25.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Three things: which $x$ are **allowed**, where the graph shoots up or down beside a **vertical** line, and what height it settles towards far to the **left and right**.' }],
      lines: [
        { say: 'We need three things. The domain: which x-values are allowed.', show: 't' },
        { say: 'The vertical asymptotes: where the graph shoots up or down beside a vertical line. And the horizontal asymptote: the height the graph settles towards far to the left and right.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['A factor of the denominator that…', 'gives'],
          rows: [
            ['**cancels** with the numerator', 'a **hole** (a single missing point)'],
            ['does **not** cancel', 'a **vertical asymptote**'],
          ],
        },
        { kind: 'callout', id: 'ha', tone: 'key', title: 'Horizontal asymptote', md: 'If the top has **lower degree** than the bottom, the horizontal asymptote is $y = 0$.' },
      ],
      lines: [
        { say: 'Here is what we need. Factor the denominator. A factor that cancels with the numerator gives a hole: one missing point. A factor that does not cancel gives a vertical asymptote.', show: 'rules' },
        { say: 'And if the top has a lower degree than the bottom, the horizontal asymptote is y equals 0.', show: 'ha' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Factor** the denominator: the domain', '**Cancel**: a hole or an asymptote?', 'Compare **degrees**: the horizontal asymptote'] }],
      lines: [
        { say: 'Here is the plan. First, factor the denominator to find the domain.', show: 'plan.0' },
        { say: 'Second, cancel what we can, to tell holes from asymptotes.', show: 'plan.1' },
        { say: 'Third, compare the degrees to find the horizontal asymptote.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The domain',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - 25 = (x - 5)(x + 5)', '\\text{domain: all reals } \\good{x \\ne 5, \\ x \\ne -5}'] }],
      lines: [
        { say: 'Step one. x squared minus 25 is a difference of squares: x minus 5, times x plus 5.', show: 'm.0' },
        { say: 'We cannot divide by 0, so x cannot be 5 or negative 5. The domain is all real numbers except 5 and negative 5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Cancel',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = \\dfrac{\\bad{x + 5}}{(x - 5)(\\bad{x + 5})} = \\dfrac{1}{x - 5}, \\quad x \\ne -5', 'x = -5: \\ \\text{a hole at } \\left(-5, \\tfrac{1}{-10}\\right)', '\\text{vertical asymptote: } \\good{x = 5}'] }],
      lines: [
        { say: 'Step two. The factor x plus 5 is on the top and the bottom, so it cancels. f of x is 1 over x minus 5, but x still cannot be negative 5.', show: 'm.0' },
        { say: 'Because x plus 5 cancelled, x equals negative 5 is a hole, not an asymptote. The hole is at height 1 over negative 5 minus 5, which is negative one tenth.', show: 'm.1' },
        { say: 'The factor x minus 5 did not cancel, so the only vertical asymptote is x equals 5.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Horizontal asymptote',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{top: degree } 1, \\quad \\text{bottom: degree } 2', '1 < 2 \\ \\Rightarrow \\ \\good{y = 0}'] }],
      lines: [
        { say: 'Step three. The top, x plus 5, has degree 1. The bottom, x squared minus 25, has degree 2.', show: 'm.0' },
        { say: 'The bottom grows faster, so for very big x the fraction gets close to 0. The horizontal asymptote is y equals 0.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Let us check on a graph. Here is the vertical asymptote, x equals 5.', show: ['gr.grid', 'gr.axes', 'gr.va', 'gr.v'] },
        { say: 'The graph shoots down on its left and up on its right, and flattens towards y equals 0 far away, which is the x-axis.', show: ['gr.f1', 'gr.f2'] },
        { say: 'At x equals negative 5 there is no asymptote, just an open circle: the hole at negative 5, negative one tenth. It checks out.', show: 'gr.h', focus: 'gr.h' },
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
            ['asymptotes at $x = 5$ and $x = -5$', '$x + 5$ **cancels**: $x = -5$ is a hole'],
            ['domain $x \\ne 5$ only', 'a hole is still **not allowed**: $x \\ne -5$ too'],
            ['horizontal asymptote $y = 1$', 'that is for **equal** degrees; here $1 < 2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not call both zeros of the denominator asymptotes. Cancel first. A factor that cancels gives a hole.' },
        { say: 'But the hole is still missing from the domain. x cannot be negative 5 in the original function.' },
        { say: 'And y equals the ratio of leading coefficients only works when the degrees are equal. Here the top is lower, so it is y equals 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Where is the hole in the graph of $f(x) = \\dfrac{x - 2}{x^2 - 4}$?',
          choices: ['$\\left(-2, \\tfrac{1}{4}\\right)$', '$(2, 0)$', '$(-2, 0)$', '$\\left(2, \\tfrac{1}{4}\\right)$'],
          answer: 3,
          working: '$\\dfrac{x - 2}{(x - 2)(x + 2)} = \\dfrac{1}{x + 2}$ for $x \\ne 2$; at $x = 2$ the height is $\\dfrac{1}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Where is the hole in the graph of f of x equals x minus 2, over x squared minus 4? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'x squared minus 4 is x minus 2, times x plus 2. The factor x minus 2 cancels, so the hole is at x equals 2. Its height is 1 over 2 plus 2, which is one quarter: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Factor**: zeros of the denominator leave the domain', 'A factor that **cancels** gives a **hole**', 'A factor that **stays** gives a **vertical asymptote**', 'Lower degree on top: $y = 0$'] }],
      lines: [
        { say: 'Here is what to remember. Factor the denominator. Its zeros are left out of the domain.', show: 'sum.0' },
        { say: 'A factor that cancels gives a hole.', show: 'sum.1' },
        { say: 'A factor that stays gives a vertical asymptote.', show: 'sum.2' },
        { say: 'And when the top has a lower degree, the horizontal asymptote is y equals 0. For more on analyzing rational functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
