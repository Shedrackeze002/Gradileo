import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { ends, exits, guide, hline, numbers, panels } from './lib/m302-5-graphs.ts';

// The cubic y = x³ - 4x + 1: every y-value is an output.
const c = plane({ name: 'c', x: [-4, 4], y: [-10, 10], yStep: 2, every: 0, width: 8, height: 8 });
const cubic = (x: number) => x ** 3 - 4 * x + 1;

// The quadratic y = -(x - 1)² + 4: the outputs stop at its maximum, 4.
const q = plane({ name: 'q', x: [-4, 6], y: [-6, 6], every: 0, width: 8, height: 8 });
const quad = (x: number) => -((x - 1) ** 2) + 4;

// Three graphs to match with y = -x³ + 4x + 2.
const options: [string, (x: number) => number, number, string, 'bad' | 'good'][] = [
  ['g1', (x) => x ** 3 - 4 * x + 2, 2, '\\text{wrong ends}', 'bad'],
  ['g2', (x) => -(x ** 3) + 4 * x - 2, -2, '\\text{wrong } y\\text{-intercept}', 'bad'],
  ['g3', (x) => -(x ** 3) + 4 * x + 2, 2, '\\text{matches}', 'good'],
];
const three = panels({
  x: [-3, 3],
  y: [-8, 8],
  size: 4.4,
  gap: 6.6,
  list: options.map(([name, f, y0, verdict, tone], i) => ({
    name,
    f,
    caption: `\\text{Graph ${i + 1}}`,
    sub: verdict,
    subTone: tone,
    extra: (g) => [ends(g, 'ends', f, ...exits(g, f)), dots(g, [{ id: 'Y', x: 0, y: y0, tone: 'good' }])],
  })),
});

const video: Explainer = {
  id: 'm302-5-1-d',
  lessonId: 'm302-5-1',
  title: 'Characteristics of Polynomial Functions, Part 4: Domain, Range and Matching Graphs',
  thumbnailTitle: 'Domain, Range and Matching',
  thumbnail: 'qd',
  summary: 'Why every polynomial function has all real numbers as its domain, why linear and cubic ranges are all real numbers while a quadratic’s range stops at its vertex (y = −(x − 1)² + 4 has range y ≤ 4), and matching y = −x³ + 4x + 2 with its graph using end behaviour, the y-intercept and the number of intercepts and turning points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 4', title: 'Domain, Range and Matching Graphs', subtitle: 'Putting the clues together' }],
      lines: [
        { say: 'Which values of x can go into a polynomial function, and which values of y can come out? And given an equation, how do you pick out its graph?', show: 'title' },
        { say: 'In this video, you will find the domain and range of polynomial functions. Then you will combine every clue from this lesson to match an equation with its graph.' },
      ],
    },
    {
      chapter: 'Domain',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Domain of a polynomial function', md: 'Any real number can be substituted for $x$, so the domain is always $\\{x \\mid x \\in \\mathbb{R}\\}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = x^3 - 4x + 1', 'x = 2.5\\colon\\quad y = 15.625 - 10 + 1 = 6.625'] },
      ],
      lines: [
        { say: 'The domain is the set of x-values you can use. In a polynomial function, you only ever multiply, add and subtract. There is no division by x, and no square root of x.', show: 'key' },
        { say: 'So any real number can be substituted for x. For example, in y equals x cubed, minus four x, plus one, you can put in 2.5 and get 6.625. Any other number works too.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So the domain of every polynomial function is all real numbers: the set of x, such that x is a real number. The range, the set of y-values, depends on the end behaviour.', focus: 'key' },
      ],
    },
    {
      chapter: 'Range of a cubic',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('cd', [
          c,
          numbers(c, 1, 2),
          plot(c, { id: 'curve', f: cubic, samples: 300 }),
          ends(c, 'ends', cubic, ...exits(c, cubic)),
          guide(c, 'rng', [0, -10], [0, 10], 'good', { dashed: false, weight: 7 }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = x^3 - 4x + 1', '\\text{odd degree: III to I}', '\\text{Range: } \\{y \\mid y \\in \\mathbb{R}\\}'] }],
      lines: [
        { say: 'Here is y equals x cubed, minus four x, plus one.', show: ['m.0', 'cd.c-grid', 'cd.c-axes', 'cd.c-curve'], focus: 'm.0' },
        { say: 'Its degree is odd, and its leading coefficient is positive, so the graph extends from quadrant three to quadrant one. The left end goes down forever, and the right end goes up forever.', show: ['m.1', 'cd.c-ends'], focus: ['m.1', 'cd.c-ends'] },
        { say: 'So the graph reaches every y-value on the way, and the range is all real numbers.', show: ['m.2', 'cd.c-rng'], focus: ['m.2', 'cd.c-rng'] },
        { say: 'The same is true for every cubic, and for every line that is not horizontal. One end goes down forever and the other goes up forever, so the range is all real numbers.' },
      ],
    },
    {
      chapter: 'Range of a quadratic',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('qd', [
          q,
          numbers(q, 2, 2),
          hline(q, 'max', 4, 'theta'),
          plot(q, { id: 'curve', f: quad, samples: 300 }),
          ends(q, 'ends', quad, ...exits(q, quad)),
          guide(q, 'rng', [0, 4], [0, -6], 'good', { dashed: false, weight: 7, arrow: true }),
          dots(q, [{ id: 'V', x: 1, y: 4, tex: '(1, 4)', tone: 'opp', place: 'above right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -(x - 1)^2 + 4', '\\text{vertex } (1, 4)', 'a = -1 < 0\\text{: opens down}', '\\text{maximum value } 4', '\\text{Range: } \\{y \\mid y \\le 4,\\ y \\in \\mathbb{R}\\}'] }],
      lines: [
        { say: 'A quadratic is different. Here is y equals negative, x minus one, squared, plus four. It is in vertex form, so its vertex is at one, four.', show: ['m.0', 'm.1', 'qd.q-grid', 'qd.q-axes', 'qd.q-curve', 'qd.q-ends', 'qd.q-V'], focus: ['m.1', 'qd.q-V'] },
        { say: 'The value of "a" is negative one, which is less than zero, so the parabola opens down. Both ends go down forever, from quadrant three to quadrant four.', show: 'm.2', focus: 'm.2' },
        { say: 'So the vertex is the highest point. The greatest y-value is four, and no output is ever bigger.', show: ['m.3', 'qd.q-max'], focus: ['m.3', 'qd.q-max'] },
        { say: 'The range is every y-value less than or equal to four: the set of y, such that y is less than or equal to four.', show: ['m.4', 'qd.q-rng'], focus: ['m.4', 'qd.q-rng'] },
        { say: 'If a parabola opens up, its vertex is the lowest point instead, and the range is every y-value greater than or equal to the minimum.' },
      ],
    },
    {
      chapter: 'Three clues',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Clue', 'Read it from'],
          rows: [
            ['End behaviour', 'the leading term: degree and sign'],
            ['$y$-intercept', 'the constant term'],
            ['Number of $x$-intercepts and turning points', 'the degree'],
          ],
        },
      ],
      lines: [
        { say: 'To match an equation with a graph, combine the clues from this lesson.', show: 't.0', focus: 't.0' },
        { say: 'First, the end behaviour, from the leading term: its degree, and the sign of its coefficient.' },
        { say: 'Second, the y-intercept, which is the constant term.', show: 't.1', focus: 't.1' },
        { say: 'Third, the number of x-intercepts and turning points the graph can have, which depends on the degree.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Matching a graph',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = -x^3 + 4x + 2'] },
        figure('mt', [three]),
      ],
      lines: [
        { say: 'Which graph could be y equals negative x cubed, plus four x, plus two?', show: ['m.0', 'mt.g1-grid', 'mt.g1-axes', 'mt.g1-curve', 'mt.g1-ends', 'mt.g1-cap', 'mt.g2-grid', 'mt.g2-axes', 'mt.g2-curve', 'mt.g2-ends', 'mt.g2-cap', 'mt.g3-grid', 'mt.g3-axes', 'mt.g3-curve', 'mt.g3-ends', 'mt.g3-cap'] },
        { say: 'Start with the end behaviour. The leading term is negative x cubed: odd degree, negative coefficient. So the graph must go from quadrant two to quadrant four.', focus: 'm.0' },
        { say: 'Graph one goes from quadrant three to quadrant one, so it cannot be our function.', show: 'mt.g1-sub', focus: ['mt.g1-curve', 'mt.g1-sub'] },
        { say: 'Next, the y-intercept is the constant term, two. Graph two has the right ends, but it crosses the y-axis at negative two, so it is not ours either.', show: ['mt.g2-Y', 'mt.g2-sub'], focus: ['mt.g2-Y', 'mt.g2-sub'] },
        { say: 'Graph three goes from quadrant two to quadrant four, and crosses the y-axis at two. It has three x-intercepts and two turning points, which a cubic can have. So graph three matches.', show: ['mt.g3-Y', 'mt.g3-sub'], focus: ['mt.g3-curve', 'mt.g3-Y', 'mt.g3-sub'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the range of $y = 2(x + 3)^2 - 5$.',
          choices: ['$\\{y \\mid y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\le -5,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge -5,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge -3,\\ y \\in \\mathbb{R}\\}$'],
          answer: 2,
          working: 'The vertex is $(-3, -5)$ and $a = 2 > 0$, so the parabola opens up and $-5$ is its minimum value.',
        },
      ],
      lines: [
        { say: 'Your turn. State the range of y equals two, times x plus three, squared, minus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The vertex is at negative three, negative five, and "a" is two, which is positive. So the parabola opens up, and negative five is its minimum value. Choice D uses the x-coordinate of the vertex, but the range is about the y-values.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The domain of every polynomial function is $\\{x \\mid x \\in \\mathbb{R}\\}$.', 'Linear (not horizontal) and cubic functions have range $\\{y \\mid y \\in \\mathbb{R}\\}$.', 'A quadratic’s range stops at its vertex: a maximum or a minimum.', 'To match a graph, check the end behaviour, the $y$-intercept and the intercepts and turning points.'] }],
      lines: [
        { say: 'Let’s sum up. The domain of every polynomial function is all real numbers.', show: 'sum.0' },
        { say: 'Linear functions that are not horizontal, and cubic functions, have a range of all real numbers.', show: 'sum.1' },
        { say: 'A quadratic’s range stops at its vertex, which is a maximum or a minimum.', show: 'sum.2' },
        { say: 'And to match a graph, check the end behaviour, the y-intercept, and the number of intercepts and turning points. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
