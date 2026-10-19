import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { approach, guide, hole, numbers, piece, plane, spot } from './lib/m31-2-graphs.ts';

// f(x) = 3 − 0.2(x − 1)² for x ≠ 1, with f(1) = −1: the graph heads for (1, 3), but the dot is at (1, −1).
const g = plane({ x: [-2, 4], y: [-2, 4], every: 0 });
const f = (x: number) => 3 - 0.2 * (x - 1) ** 2;
const graph = (id: string, withDot: boolean) =>
  figure(id, [
    g,
    numbers(g, 1, 1),
    guide(g, 'read', [1, 3], [-2, 3], 'theta'),
    piece(g, { id: 'c', f }),
    approach(g, { id: 'L', f, from: -1.4, to: 0.55 }),
    approach(g, { id: 'R', f, from: 3.4, to: 1.45 }),
    hole(g, 'H', 1, 3, { tex: '(1, 3)', place: 'above' }),
    ...(withDot ? [spot(g, 'D', 1, -1, { tex: '(1, -1)', place: 'right', tone: 'opp' })] : []),
  ]);

const video: Explainer = {
  id: 'm31-2-1',
  lessonId: 'm31-2-1',
  title: 'Limits from Graphs and Tables, Part 1: The Idea of a Limit',
  thumbnailTitle: 'What Is a Limit?',
  thumbnail: 'g2',
  summary: 'What a limit is: the height a graph heads toward as x closes in on a number from both sides. A table of values closing in on x = 1 and a graph with a hole at (1, 3) and a separate dot at (1, −1) show that the limit is 3 while f(1) = −1: the limit never depends on the value at the point itself.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 1', title: 'The Idea of a Limit', subtitle: 'Where is the graph heading?' }],
      lines: [
        { say: 'All of calculus rests on one question. What happens to the values of a function as x gets closer and closer to a number?', show: 'title' },
        { say: 'Not at the number itself, but on the way there. The answer is called a limit. In this video, you will see what a limit means, on a graph and in a table.' },
      ],
    },
    {
      chapter: 'Closing in',
      layout: 'split',
      leftWidth: 540,
      left: [graph('g1', false)],
      right: [
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$'], rows: [['$0.9$', '$2.998$'], ['$0.99$', '$2.99998$'], ['$0.999$', '$2.9999998$'], ['$1.001$', '$2.9999998$'], ['$1.01$', '$2.99998$'], ['$1.1$', '$2.998$']] },
      ],
      lines: [
        { say: 'Here is the graph of a function f. Notice the hollow circle at the point at one, three. The graph comes right up to it, but that point is not on the graph.', show: ['g1.grid', 'g1.axes', 'g1.c', 'g1.H'], focus: 'g1.H' },
        { say: 'Let x get closer and closer to one from the left. Try x equals 0.9, then 0.99, then 0.999.', show: ['g1.L', 't.0', 't.1', 't.2'], focus: 'g1.L' },
        { say: 'The heights are 2.998, then 2.99998, then 2.9999998. They are closing in on three.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Now come in from the right: x equals 1.1, then 1.01, then 1.001. The heights close in on three again.', show: ['g1.R', 't.5', 't.4', 't.3'], focus: ['g1.R', 't.3', 't.4', 't.5'] },
        { say: 'From both sides, as x approaches one, the graph heads toward a height of three. We say that the limit of f of x, as x approaches one, is three.', show: 'g1.read', focus: 'g1.read' },
      ],
    },
    {
      chapter: 'What a limit means',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\lim_{x \\to a} f(x) = L'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Limit', md: '$f(x)$ can be made as close to $L$ as we like by taking $x$ close enough to $a$, on either side, **but not equal to** $a$.' },
      ],
      lines: [
        { say: 'Here is how we write it. The limit as x approaches "a" of f of x equals L.', show: 'm', focus: 'm' },
        { say: 'It means that f of x can be made as close to L as we like, by taking x close enough to "a", on either side.', show: 'def' },
        { say: 'The last part of the definition matters most: x gets close to "a", but is never equal to "a". A limit describes where the graph is heading as x approaches "a". It says nothing about what happens exactly at "a".' },
      ],
    },
    {
      chapter: 'A hole and a separate dot',
      layout: 'split',
      leftWidth: 540,
      left: [graph('g2', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\lim_{x \\to 1} f(x) = 3', 'f(1) = -1'] }],
      lines: [
        { say: 'Now suppose the graph of f also has a solid dot at the point at one, negative one. Find the limit of f of x as x approaches one, and find f of one.', show: ['g2.grid', 'g2.axes', 'g2.c', 'g2.H', 'g2.D'], focus: 'g2.D' },
        { say: 'For the limit, follow the curve. As x approaches one from either side, the curve heads toward the hollow circle at one, three.', show: ['g2.L', 'g2.R'], focus: ['g2.L', 'g2.R'] },
        { say: 'So the limit as x approaches one of f of x is three.', show: ['m.0', 'g2.read'], focus: ['m.0', 'g2.H'] },
        { say: 'But f of one is the actual value of the function at one. The solid dot shows it: f of one is negative one.', show: 'm.1', focus: ['m.1', 'g2.D'] },
        { say: 'The limit and the function value are different numbers. The graph heads toward three, even though the function’s value at one is somewhere else entirely.', focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The limit is not the function value', md: 'Reading the solid dot gives $f(a)$, not the limit. The two can be different, and the limit can exist even when $f(a)$ is undefined.' },
        { kind: 'bullets', id: 'b', items: ['To find $\\lim_{x \\to a} f(x)$: follow the curve toward $x = a$ from both sides.', 'To find $f(a)$: look for the solid dot at $x = a$.'] },
      ],
      lines: [
        { say: 'A common mistake is to read the solid dot and call that the limit. The dot gives the function value, f of "a", not the limit.', show: 'oops' },
        { say: 'The two can be different, as we just saw. And if the dot were not there at all, so that f of one were undefined, the limit would still be three. The curve would still head to the same place.' },
        { say: 'So to find a limit, follow the curve toward x equals "a" from both sides, and see what height it heads for.', show: 'b.0', focus: 'b.0' },
        { say: 'To find the function value, look for the solid dot at x equals "a".', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The graph of $y = g(x)$ heads toward a hollow circle at $(2, 5)$ from both sides, and has a solid dot at $(2, 1)$. Find $\\displaystyle\\lim_{x \\to 2} g(x)$ and $g(2)$.',
          choices: ['limit $1$, $g(2) = 5$', 'limit $5$, $g(2) = 5$', 'limit $5$, $g(2) = 1$', 'no limit, $g(2) = 1$'],
          answer: 2,
          working: 'Both sides head toward the height of the hollow circle, so $\\displaystyle\\lim_{x \\to 2} g(x) = 5$. The solid dot gives the value: $g(2) = 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals g of x heads toward a hollow circle at the point at two, five, from both sides, and has a solid dot at the point at two, one. Find the limit as x approaches two of g of x, and find g of two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Both sides head toward the hollow circle, so the limit is five. The solid dot gives the value, so g of two is one. Choice A swaps them: the solid dot gives the function value, not the limit.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$\\lim_{x \\to a} f(x) = L$: $f(x)$ heads toward $L$ as $x$ approaches $a$ from both sides.', '$x$ gets close to $a$ but never equals $a$: the value $f(a)$ does not matter.', 'A table of $x$-values closing in from both sides shows the limit too.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The limit as x approaches "a" of f of x equals L means that f of x heads toward L as x approaches "a" from both sides.', show: 'sum.0' },
        { say: 'x gets close to "a", but never equals "a", so the value of f at "a" does not matter.', show: 'sum.1' },
        { say: 'And a table of x-values closing in from both sides can show the limit too. In the next part, we look at each side on its own. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
