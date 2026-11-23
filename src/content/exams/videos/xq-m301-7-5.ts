import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 7.5 (transformations of logarithmic functions). The question
// is an exercise from OpenStax College Algebra 2e, word for word (section 6.4, Graphs of
// Logarithmic Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. A logarithm
// needs a positive argument: 3x + 9 > 0 gives x > −3, so the domain is (−3, ∞) and the vertical
// asymptote is x = −3, as in the book's answer. The reflection and the shift down 7 change neither.

const g = plane({ x: [-4.5, 4.5], y: [-12.5, 1.5], yStep: 2, every: 2, width: 11, height: 10 });

/** y = −ln(3x + 9) − 7 (`f`), its asymptote x = −3 (`va`) and its point at x = −2 (`p`). */
const graph = (height = 500) =>
  figure(
    'gr',
    [
      g,
      polyline(g, { id: 'va', points: [[-3, -12.5], [-3, 1.5]], tone: 'bad', dashed: true }),
      plot(g, { id: 'f', f: (x) => -Math.log(3 * x + 9) - 7, from: -2.99999, to: 4.5, tone: 'good', samples: 400, label: 'g', labelAt: 0.95, side: 'right' }),
      dots(g, [{ id: 'p', x: -2, y: -Math.log(3) - 7, tone: 'good' }]),
    ],
    height,
  );

const QUESTION = 'State the domain and the vertical asymptote of the function. g(x) = −ln(3x + 9) − 7';

const video: Explainer = {
  id: 'xq-m301-7-5',
  lessonId: '',
  exam: {
    lesson: 'm301-7-5',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.4, Graphs of Logarithmic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-4-graphs-of-logarithmic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Domain and Asymptote of g(x) = −ln(3x + 9) − 7 (Transformations of Logarithmic Functions)',
  thumbnailTitle: 'Domain of −ln(3x + 9) − 7',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: state the domain and the vertical asymptote of g(x) = −ln(3x + 9) − 7. A logarithm only accepts positive numbers, so 3x + 9 > 0, which gives x > −3. The domain is (−3, ∞) and the vertical asymptote is x = −3. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Domain of −ln(3x + 9) − 7', subtitle: 'Transformations of logarithmic functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about transformed logarithmic functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'State the domain and the vertical asymptote of the function. $g(x) = -\\ln(3x + 9) - 7$',
          answer: 'domain $(-3, \\infty)$; vertical asymptote $x = -3$',
          working: '$3x + 9 > 0$, so $x > -3$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'State the domain and the vertical asymptote of the function. g of x equals negative natural log of 3 x plus 9, minus 7.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The **domain** is every $x$ we are allowed to put in. The **vertical asymptote** is the line the graph gets closer and closer to, but never touches.' }],
      lines: [
        { say: 'The domain is every x-value we are allowed to put into the function.', show: 't' },
        { say: 'And the vertical asymptote is the vertical line the graph gets closer and closer to, but never touches.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'pos', tone: 'key', title: 'Logs need positive inputs', md: '$\\ln(\\text{something})$ is only defined when the something is **greater than 0**.' },
        { kind: 'callout', id: 'va', tone: 'definition', title: 'The asymptote', md: 'The vertical asymptote is where the inside **equals 0**.' },
      ],
      lines: [
        { say: 'Here is what we need. A logarithm only accepts positive numbers. The natural log of something is defined only when that something is greater than 0.', show: 'pos' },
        { say: 'And the vertical asymptote is where the inside of the log equals 0. The graph gets close to it but never reaches it.', show: 'va' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set the **inside** greater than $0$', 'Solve for $x$: the **domain**', 'The edge of the domain is the **asymptote**'] }],
      lines: [
        { say: 'Here is the plan. First, set the inside of the log greater than 0.', show: 'plan.0' },
        { say: 'Second, solve for x. That gives the domain.', show: 'plan.1' },
        { say: 'Third, the edge of the domain is the vertical asymptote.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The inside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g(x) = -\\ln(\\good{3x + 9}) - 7', '3x + 9 > 0'] }],
      lines: [
        { say: 'Step one. The inside of the log is 3 x plus 9. The minus sign in front and the minus 7 at the end are outside the log, so they do not matter here.', show: 'm.0' },
        { say: 'The inside must be positive: 3 x plus 9 is greater than 0.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The domain',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x > {-9}', 'x > {-3}', '\\text{domain: } \\good{(-3, \\infty)}'] }],
      lines: [
        { say: 'Step two. Subtract 9 from both sides: 3 x is greater than negative 9.', show: 'm.0' },
        { say: 'Divide by 3, which is positive, so the sign stays the same: x is greater than negative 3.', show: 'm.1' },
        { say: 'So the domain is from negative 3 to infinity, not including negative 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The asymptote',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x + 9 = 0', '\\text{vertical asymptote: } \\good{x = -3}'] }],
      lines: [
        { say: 'Step three. The asymptote is where the inside equals 0: 3 x plus 9 equals 0.', show: 'm.0' },
        { say: 'That is at x equals negative 3, the edge of the domain. The vertical asymptote is x equals negative 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['g(-2) = -\\ln 3 - 7 \\approx {-8.10} \\ \\checkmark \\qquad g(-3) = -\\ln 0: \\text{ undefined}'] }],
      lines: [
        { say: 'Let us check on a graph. Here is the line x equals negative 3.', show: ['gr.grid', 'gr.axes', 'gr.va'] },
        { say: 'And here is g. It lives only to the right of x equals negative 3, and it shoots up along the asymptote without ever touching it.', show: 'gr.f', focus: 'gr.f' },
        { say: 'At x equals negative 2, inside the log is 3, so g is about negative 8.10. But at x equals negative 3, we would need the log of 0, which is undefined. It checks out.', show: ['gr.p', 'm.0'], focus: 'm.0' },
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
            ['$x > -9$', 'divide by $3$ too: $3x > -9$ gives $x > -3$'],
            ['the $-7$ changes the domain', 'it moves the graph **down**, not sideways'],
            ['$[-3, \\infty)$', '$\\ln 0$ is undefined: use a **round** bracket'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Finish solving. 3 x greater than negative 9 still needs dividing by 3, which gives x greater than negative 3.' },
        { say: 'The minus 7 and the minus sign in front move the graph down and flip it. Neither moves it left or right, so neither changes the domain.' },
        { say: 'And negative 3 itself is not allowed, since the log of 0 is undefined. Use a round bracket, not a square one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the domain of $f(x) = \\log(5 - x) + 2$?',
          choices: ['$(5, \\infty)$', '$(-5, \\infty)$', '$(-\\infty, 5)$', '$(2, \\infty)$'],
          answer: 2,
          working: '$5 - x > 0$, so $5 > x$: the domain is $(-\\infty, 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the domain of f of x equals log of 5 minus x, plus 2? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'The inside must be positive: 5 minus x is greater than 0, so x is less than 5. The domain is from negative infinity to 5: choice C. The plus 2 does not matter.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The inside of a log must be **greater than 0**', 'Solve that inequality for the **domain**', 'Inside $= 0$ gives the **vertical asymptote**', 'Outside changes do **not** change the domain'] }],
      lines: [
        { say: 'Here is what to remember. The inside of a logarithm must be greater than 0.', show: 'sum.0' },
        { say: 'Solve that inequality to get the domain.', show: 'sum.1' },
        { say: 'Setting the inside equal to 0 gives the vertical asymptote.', show: 'sum.2' },
        { say: 'And changes outside the log, like a reflection or a shift down, do not change the domain. For more on transformations of logarithmic functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
