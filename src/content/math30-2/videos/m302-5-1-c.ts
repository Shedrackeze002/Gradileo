import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { numbers, panels, tag } from './lib/m302-5-graphs.ts';

// y = (x + 3)(x - 1)(x - 3): three x-intercepts, a y-intercept of 9 and two turning points.
const g = plane({ x: [-5, 5], y: [-24, 24], yStep: 4, every: 0, width: 8, height: 8 });
const f = (x: number) => (x + 3) * (x - 1) * (x - 3);
// Its turning points, where 3x² - 2x - 9 = 0.
const [tx1, tx2] = [(2 - Math.sqrt(112)) / 6, (2 + Math.sqrt(112)) / 6];
const cubic = () =>
  figure('gr', [
    g,
    numbers(g, 2, 8),
    plot(g, { id: 'curve', f, samples: 300 }),
    dots(g, [
      { id: 'X1', x: -3, y: 0, tex: '-3', tone: 'adj', place: 'below right', group: 'xints' },
      { id: 'X2', x: 1, y: 0, tex: '1', tone: 'adj', place: 'above right', group: 'xints' },
      { id: 'X3', x: 3, y: 0, tex: '3', tone: 'adj', place: 'below right', group: 'xints' },
      { id: 'Y', x: 0, y: 9, tex: '(0, 9)', tone: 'good', place: 'above right' },
      { id: 'T1', x: tx1, y: f(tx1), tone: 'opp', group: 'turns' },
      { id: 'T2', x: tx2, y: f(tx2), tone: 'opp', group: 'turns' },
    ]),
    tag(g, 'T1-t', tx1, f(tx1) + 1, '\\text{high point}', 'above', 'opp', 'turns'),
    tag(g, 'T2-t', tx2, f(tx2) - 1, '\\text{low point}', 'below', 'opp', 'turns'),
  ]);

// Three cubics: what a cubic can do.
const three = panels({
  x: [-4, 4],
  y: [-6, 6],
  size: 4.4,
  gap: 6.4,
  list: [
    { name: 'p1', f: (x) => 0.15 * x ** 3, caption: '1\\ x\\text{-intercept}', sub: '\\text{no turning points}' },
    { name: 'p2', f: (x) => 0.25 * x ** 3 - 2 * x, caption: '3\\ x\\text{-intercepts}', sub: '\\text{2 turning points}' },
    { name: 'p3', f: (x) => 0.25 * x ** 3 - 2 * x + 3, caption: '1\\ x\\text{-intercept}', sub: '\\text{2 turning points}' },
  ],
});

// y = 0.5(x + 2)²(x - 3): it touches the axis at -2 and crosses at 3.
const h = plane({ name: 't', x: [-5, 5], y: [-10, 10], yStep: 2, every: 0, width: 8, height: 8 });
const k = (x: number) => 0.5 * (x + 2) ** 2 * (x - 3);

const video: Explainer = {
  id: 'm302-5-1-c',
  lessonId: 'm302-5-1',
  title: 'Characteristics of Polynomial Functions, Part 3: Intercepts and Turning Points',
  thumbnailTitle: 'Intercepts and Turning Points',
  thumbnail: 'gr',
  summary: 'Reading the y-intercept from the constant term and the x-intercepts from the factors of y = (x + 3)(x − 1)(x − 3), turning points, why a function of degree n has at most n x-intercepts and n − 1 turning points, what is possible for a cubic and a parabola, and how a squared factor makes the graph of y = 0.5(x + 2)²(x − 3) touch the x-axis.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 3', title: 'Intercepts and Turning Points', subtitle: 'Where the graph meets the axes, and where it turns' }],
      lines: [
        { say: 'Where does a graph cross the axes, and where does it change direction? For a polynomial function, the equation tells you a lot about both.', show: 'title' },
        { say: 'In this video, you will find the intercepts of a polynomial function, count its turning points, and see what happens to the graph when a factor is squared.' },
      ],
    },
    {
      chapter: 'Intercepts',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['The **$y$-intercept** is the value of $y$ when $x = 0$. In standard form, it is the constant term.', 'The **$x$-intercepts** are the zeros of the function: the values of $x$ that make $y = 0$. In factored form, read them from the factors.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = (x + 3)(x - 1)(x - 3)', 'y = x^3 - x^2 - 9x + \\good{9}'] },
      ],
      lines: [
        { say: 'The y-intercept is the value of y when x is zero. In standard form, every term with an x becomes zero, so the y-intercept is just the constant term.', show: 'b.0' },
        { say: 'The x-intercepts are the zeros of the function: the values of x that make y equal zero. In factored form, you can read them straight from the factors.', show: 'b.1' },
        { say: 'Here is one function in both forms. In factored form, it is x plus three, times x minus one, times x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiplied out, it is x cubed, minus x squared, minus nine x, plus nine. So its constant term, and its y-intercept, is nine.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A cubic in factored form',
      layout: 'split',
      leftWidth: 540,
      left: [cubic()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x + 3 = 0 \\;\\to\\; x = -3', 'x - 1 = 0 \\;\\to\\; x = 1', 'x - 3 = 0 \\;\\to\\; x = 3', '(0 + 3)(0 - 1)(0 - 3) = 9'] }],
      lines: [
        { say: 'Find the intercepts of y equals x plus three, times x minus one, times x minus three.', show: ['gr.grid', 'gr.axes', 'gr.curve'] },
        { say: 'A product is zero when one of its factors is zero. x plus three is zero when x is negative three. x minus one is zero when x is one. And x minus three is zero when x is three.', show: ['m.0', 'm.1', 'm.2', 'gr.xints'], focus: ['m.0', 'm.1', 'm.2', 'gr.xints'] },
        { say: 'Those are the three x-intercepts. Notice the signs: the factor x minus one gives positive one, and the factor x plus three gives negative three.' },
        { say: 'For the y-intercept, substitute zero for x: three, times negative one, times negative three, which is nine. That matches the constant term.', show: ['m.3', 'gr.Y'], focus: ['m.3', 'gr.Y'] },
      ],
    },
    {
      chapter: 'Turning points',
      layout: 'split',
      leftWidth: 540,
      left: [cubic()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Turning point', md: 'A point where the graph changes from increasing to decreasing, or from decreasing to increasing.' },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Degree n', md: 'At most $n$ $x$-intercepts, and at most $n - 1$ turning points.' },
      ],
      lines: [
        { say: 'A turning point is a point where the graph changes from increasing to decreasing, or from decreasing to increasing.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.xints', 'gr.Y', 'def'] },
        { say: 'This graph rises to a high point between negative three and one, then falls to a low point between one and three, then rises again. So it has two turning points.', show: 'gr.turns', focus: 'gr.turns' },
        { say: 'Two is the most a cubic can have. In general, a polynomial function of degree n has at most n x-intercepts, and at most n minus one turning points.', show: 'rule' },
        { say: 'A cubic has degree three, so it has at most three x-intercepts and at most two turning points. This one has the most of both.', focus: 'gr' },
      ],
    },
    {
      chapter: 'What is possible',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Degree', '$x$-intercepts', 'Turning points'], rows: [['$1$, linear', '$1$ (none if horizontal)', '$0$'], ['$2$, quadratic', '$0$, $1$ or $2$', 'exactly $1$'], ['$3$, cubic', '$1$, $2$ or $3$', '$0$ or $2$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A cubic always crosses', md: 'The ends of a cubic go in opposite directions, so its graph must cross the $x$-axis at least once.' },
      ],
      lines: [
        { say: 'Here is what is possible for each degree. A line that is not horizontal crosses the x-axis once, and never turns.', show: 't.0', focus: 't.0' },
        { say: 'A parabola has zero, one or two x-intercepts, and exactly one turning point: its vertex.', show: 't.1', focus: 't.1' },
        { say: 'A cubic has one, two or three x-intercepts, and either two turning points or none at all.', show: 't.2', focus: 't.2' },
        { say: 'Why at least one x-intercept? A cubic’s ends go in opposite directions, one up and one down. So somewhere in between, the graph must cross the x-axis.', show: 'tip' },
      ],
    },
    {
      chapter: 'Three cubics',
      layout: 'center',
      main: [figure('cu', [three])],
      lines: [
        { say: 'Here are three cubics.', show: ['cu.p1-grid', 'cu.p1-axes', 'cu.p2-grid', 'cu.p2-axes', 'cu.p3-grid', 'cu.p3-axes'] },
        { say: 'This one never turns. It rises the whole way, like y equals x cubed, so it crosses the x-axis just once.', show: ['cu.p1-curve', 'cu.p1-text'], focus: 'cu.p1-curve' },
        { say: 'This one has two turning points, and crosses the x-axis three times.', show: ['cu.p2-curve', 'cu.p2-text'], focus: 'cu.p2-curve' },
        { say: 'And this one also has two turning points, but both are above the x-axis, so it crosses only once. Two turning points do not guarantee three x-intercepts.', show: ['cu.p3-curve', 'cu.p3-text'], focus: 'cu.p3-curve' },
      ],
    },
    {
      chapter: 'Touching the axis',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('tc', [
          h,
          numbers(h, 2, 2),
          plot(h, { id: 'curve', f: k, samples: 300 }),
          dots(h, [
            { id: 'A', x: -2, y: 0, tex: '\\text{touches}', tone: 'opp', place: 'above' },
            { id: 'B', x: 3, y: 0, tex: '\\text{crosses}', tone: 'adj', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 0.5(x + 2)^2(x - 3)', 'x = 3\\text{: crosses}', 'x = -2\\text{: touches}', '(x + 2)^2 \\ge 0'] }],
      lines: [
        { say: 'Squaring a factor changes the picture. Look at y equals 0.5, times x plus two, squared, times x minus three.', show: ['m.0', 'tc.t-grid', 'tc.t-axes', 'tc.t-curve'], focus: 'm.0' },
        { say: 'The factor x minus three gives an x-intercept at three. There, the graph crosses the axis, as before.', show: ['m.1', 'tc.t-B'], focus: ['m.1', 'tc.t-B'] },
        { say: 'But the factor x plus two is squared. It gives an x-intercept at negative two, where the graph touches the axis and turns back, instead of crossing it.', show: ['m.2', 'tc.t-A'], focus: ['m.2', 'tc.t-A'] },
        { say: 'Why? A square is never negative. So near negative two, y keeps the same sign on both sides, and the graph only touches the axis.', show: 'm.3', focus: 'm.3' },
        { say: 'So this cubic has only two x-intercepts, negative two and three. It still has two turning points: where it touches the axis, and a low point between negative two and three.', focus: 'tc' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the $x$-intercepts and the $y$-intercept of $y = (x - 2)(x + 1)(x + 4)$.',
          choices: ['$x$-intercepts $2$, $-1$, $-4$; $y$-intercept $-8$', '$x$-intercepts $-2$, $1$, $4$; $y$-intercept $-8$', '$x$-intercepts $2$, $-1$, $-4$; $y$-intercept $8$', '$x$-intercepts $-2$, $1$, $4$; $y$-intercept $8$'],
          answer: 0,
          working: 'Each factor is zero when $x = 2$, $x = -1$ or $x = -4$. At $x = 0$: $(0 - 2)(0 + 1)(0 + 4) = -8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the x-intercepts and the y-intercept of y equals x minus two, times x plus one, times x plus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each factor is zero when x is two, negative one or negative four. And at x equals zero, y is negative two, times one, times four: negative eight. Choice B takes the numbers in the factors with the wrong signs: x minus two is zero when x is positive two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The $y$-intercept is the constant term; the $x$-intercepts come from the factors.', 'Degree $n$: at most $n$ $x$-intercepts and at most $n - 1$ turning points.', 'A cubic crosses the $x$-axis at least once; a parabola turns exactly once.', 'A squared factor makes the graph touch the $x$-axis and turn back.'] }],
      lines: [
        { say: 'Let’s sum up. The y-intercept is the constant term, and the x-intercepts come from the factors.', show: 'sum.0' },
        { say: 'A polynomial function of degree n has at most n x-intercepts, and at most n minus one turning points.', show: 'sum.1' },
        { say: 'A cubic crosses the x-axis at least once, and a parabola turns exactly once.', show: 'sum.2' },
        { say: 'And when a factor is squared, the graph touches the x-axis there and turns back. In the next part, we find the domain and range, and put all the clues together to match equations with graphs. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
