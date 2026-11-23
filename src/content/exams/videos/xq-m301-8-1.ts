import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 8.1 (exploring rational functions using transformations). The
// question is an exercise from OpenStax College Algebra 2e, word for word (section 5.6, Rational
// Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. The book prints no answer
// for this one. Left 3 replaces x with x + 3 and down 1 subtracts 1, so f(x) = 1/(x + 3) − 1: the
// asymptotes of y = 1/x (x = 0 and y = 0) move to x = −3 and y = −1. The point (1, 1) moves to
// (−2, 0), which is also the x-intercept.

const g = plane({ x: [-8.5, 4.5], y: [-4.5, 4.5], every: 2, width: 13, height: 9 });

/** y = 1/x (`p`, dashed), f(x) = 1/(x + 3) − 1 (`f`), their asymptotes and a moved point. */
const graph = (height = 500, moved = true) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'p1', f: (x) => 1 / x, from: 0.18, to: 4.5, tone: 'adj', dashed: true, samples: 160 }),
      plot(g, { id: 'p2', f: (x) => 1 / x, from: -8.5, to: -0.18, tone: 'adj', dashed: true, samples: 160 }),
      ...(moved
        ? [
            polyline(g, { id: 'va', points: [[-3, -4.5], [-3, 4.5]], tone: 'bad', dashed: true }),
            polyline(g, { id: 'ha', points: [[-8.5, -1], [4.5, -1]], tone: 'bad', dashed: true }),
            plot(g, { id: 'f1', f: (x) => 1 / (x + 3) - 1, from: -2.84, to: 4.5, tone: 'good', samples: 200 }),
            plot(g, { id: 'f2', f: (x) => 1 / (x + 3) - 1, from: -8.5, to: -3.2, tone: 'good', samples: 200 }),
            dots(g, [
              { id: 'a', x: 1, y: 1, tex: '(1, 1)', tone: 'adj', place: 'above right' },
              { id: 'b', x: -2, y: 0, tex: '(-2, 0)', tone: 'good', place: 'above right' },
            ]),
          ]
        : []),
    ],
    height,
  );

const PARENT = ['gr.grid', 'gr.axes', 'gr.p1', 'gr.p2'];

const QUESTION =
  'Use the given transformation to graph the function. Note the vertical and horizontal asymptotes. The reciprocal function shifted down one unit and left three units.';

const video: Explainer = {
  id: 'xq-m301-8-1',
  lessonId: '',
  exam: {
    lesson: 'm301-8-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.6, Rational Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-6-rational-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Shift y = 1/x Down 1 and Left 3 (Exploring Rational Functions)',
  thumbnailTitle: 'Shift y = 1/x Down 1, Left 3',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: the reciprocal function y = 1/x is shifted down one unit and left three units. We write the new function, f(x) = 1/(x + 3) − 1, move both asymptotes with it to x = −3 and y = −1, and graph it by moving a point. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Shift y = 1/x Down 1, Left 3', subtitle: 'Exploring rational functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about rational functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use the given transformation to graph the function. Note the vertical and horizontal asymptotes. The reciprocal function shifted down one unit and left three units.',
          answer: '$f(x) = \\dfrac{1}{x + 3} - 1$; vertical asymptote $x = -3$, horizontal asymptote $y = -1$',
          working: 'Left $3$: $x \\to x + 3$. Down $1$: subtract $1$. The asymptotes move the same way.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the given transformation to graph the function. Note the vertical and horizontal asymptotes. The reciprocal function shifted down one unit and left three units.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [graph(420, false), { kind: 'text', id: 't', size: 'md', md: 'The **reciprocal function** is $y = \\dfrac{1}{x}$. Slide its whole graph, **asymptotes too**, $1$ down and $3$ left.' }],
      lines: [
        { say: 'The reciprocal function is y equals 1 over x. Here is its graph: two branches, one in each corner.', show: PARENT },
        { say: 'Its asymptotes are the two axes, x equals 0 and y equals 0. We slide the whole picture, asymptotes too, 1 down and 3 left.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Translations', md: '$y = \\dfrac{1}{x - h} + k$ is $y = \\dfrac{1}{x}$ moved $h$ **right** and $k$ **up**.' },
        { kind: 'callout', id: 'asy', tone: 'definition', title: 'The asymptotes move too', md: 'Vertical asymptote $x = h$, horizontal asymptote $y = k$.' },
      ],
      lines: [
        { say: 'Here is what we need. y equals 1 over x minus h, plus k, is the reciprocal graph moved h right and k up.', show: 'rule' },
        { say: 'Its asymptotes move with it: the vertical asymptote is x equals h, and the horizontal asymptote is y equals k.', show: 'asy' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **equation**', 'Move the **asymptotes**', '**Graph** by moving a point'] }],
      lines: [
        { say: 'Here is the plan. First, write the equation of the moved graph.', show: 'plan.0' },
        { say: 'Second, move the asymptotes.', show: 'plan.1' },
        { say: 'Third, graph it by moving a point.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{left } 3: \\quad y = \\dfrac{1}{x \\good{+ 3}}', '\\text{down } 1: \\quad f(x) = \\good{\\dfrac{1}{x + 3} - 1}'] }],
      lines: [
        { say: 'Step one. Left 3 goes inside, with the opposite sign: replace x with x plus 3. That gives 1 over x plus 3.', show: 'm.0' },
        { say: 'Down 1 goes outside: subtract 1. So f of x equals 1 over x plus 3, minus 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The asymptotes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 0 \\ \\to \\ \\good{x = -3}', 'y = 0 \\ \\to \\ \\good{y = -1}'] }],
      lines: [
        { say: 'Step two. The vertical asymptote x equals 0 moves 3 left, to x equals negative 3. That is where x plus 3 is 0, so we would divide by 0.', show: 'm.0' },
        { say: 'The horizontal asymptote y equals 0 moves 1 down, to y equals negative 1.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Graph it',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Step three. Start with y equals 1 over x.', show: PARENT },
        { say: 'Draw the new asymptotes, x equals negative 3 and y equals negative 1.', show: ['gr.va', 'gr.ha'] },
        { say: 'The point at 1, 1 is on y equals 1 over x. Move it 3 left and 1 down, to negative 2, 0.', show: ['gr.a', 'gr.b'], focus: 'gr.b' },
        { say: 'Then draw the same two branches around the new asymptotes.', show: ['gr.f1', 'gr.f2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(-2) = \\dfrac{1}{1} - 1 = 0 \\ \\checkmark', 'f(-3) = \\dfrac{1}{0} - 1: \\ \\text{undefined} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. f of negative 2 is 1 over 1, minus 1, which is 0. So the point at negative 2, 0 is on the graph, just as we moved it.', show: 'm.0' },
        { say: 'And at x equals negative 3 we would divide by 0, so the function is undefined there. That is the vertical asymptote. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{1}{x - 3} - 1$', 'left $3$ is $x + 3$: inside, the sign is **opposite**'],
            ['$x = -1$, $y = -3$', 'the **left** shift moves the **vertical** asymptote'],
            ['$\\dfrac{1}{x} + 3 - 1$', 'the $+3$ must be **under** the $1$, with the $x$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x minus 3 would move the graph right. Left 3 is x plus 3.' },
        { say: 'Do not swap the asymptotes. Moving left or right moves the vertical asymptote. Moving up or down moves the horizontal one.' },
        { say: 'And the 3 belongs in the denominator, with the x. 1 over x, plus 3, is a different function.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The graph of $y = \\dfrac{1}{x}$ is shifted up $4$ units and right $2$ units. What are the asymptotes of the new graph?',
          choices: ['$x = -2$, $y = 4$', '$x = 4$, $y = 2$', '$x = 2$, $y = 4$', '$x = 2$, $y = -4$'],
          answer: 2,
          working: 'The new function is $y = \\dfrac{1}{x - 2} + 4$: right $2$ moves $x = 0$ to $x = 2$, and up $4$ moves $y = 0$ to $y = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals 1 over x is shifted up 4 units and right 2 units. What are the asymptotes of the new graph? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'Right 2 moves the vertical asymptote from x equals 0 to x equals 2. Up 4 moves the horizontal asymptote from y equals 0 to y equals 4: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = \\dfrac{1}{x - h} + k$: right $h$, up $k$', 'Vertical asymptote $x = h$', 'Horizontal asymptote $y = k$', 'Move a point, then draw the branches'] }],
      lines: [
        { say: 'Here is what to remember. y equals 1 over x minus h, plus k, moves the reciprocal graph h right and k up.', show: 'sum.0' },
        { say: 'The vertical asymptote becomes x equals h.', show: 'sum.1' },
        { say: 'The horizontal asymptote becomes y equals k.', show: 'sum.2' },
        { say: 'And to graph it, move a point, then draw the branches around the new asymptotes. For more on exploring rational functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
