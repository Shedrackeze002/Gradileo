import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { ends, exits, numbers, panels, quadrants } from './lib/m302-5-graphs.ts';

// Quadrants, read from left to right along a cubic.
const intro = plane({ name: 'q', x: [-4, 4], y: [-6, 6], every: 0, width: 8, height: 8 });
const cubic = (x: number) => 0.25 * x ** 3 - 2 * x;

// The four cases, each with arrowheads where the curve leaves its grid.
const cases: [string, (x: number) => number, string, string][] = [
  ['c1', (x) => 0.25 * x ** 3 - 2 * x, '\\text{odd, positive}', '\\text{III to I}'],
  ['c2', (x) => -0.25 * x ** 3 + 2 * x, '\\text{odd, negative}', '\\text{II to IV}'],
  ['c3', (x) => 0.5 * x * x - 3, '\\text{even, positive}', '\\text{II to I}'],
  ['c4', (x) => -0.5 * x * x + 3, '\\text{even, negative}', '\\text{III to IV}'],
];
const four = panels({
  x: [-4, 4],
  y: [-6, 6],
  size: 4.4,
  gap: 6.4,
  list: cases.map(([name, f, caption, sub]) => ({ name, f, caption, sub, extra: (g) => [ends(g, 'ends', f, ...exits(g, f))] })),
});

// The example y = -2x³ + 3x + 4.
const ex = plane({ name: 'e', x: [-4, 4], y: [-12, 12], yStep: 2, every: 0, width: 8, height: 8 });
const f = (x: number) => -2 * x ** 3 + 3 * x + 4;

// The mistake: an even degree with a negative leading coefficient.
const mis = plane({ name: 'm', x: [-4, 4], y: [-6, 6], every: 0, width: 8, height: 8 });
const down = (x: number) => 4 - x * x;

const video: Explainer = {
  id: 'm302-5-1-b',
  lessonId: 'm302-5-1',
  title: 'Characteristics of Polynomial Functions, Part 2: End Behaviour',
  thumbnailTitle: 'End Behaviour',
  thumbnail: false,
  summary: 'Describing where a polynomial graph starts and ends by quadrants, why only the leading term matters far from the origin, the four cases from the degree (odd or even) and the sign of the leading coefficient, and the end behaviour of y = 4 + 3x − 2x³ (quadrant II to quadrant IV).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomial Functions · Part 2', title: 'End Behaviour', subtitle: 'Where the graph starts and ends' }],
      lines: [
        { say: 'Far to the left and far to the right, every polynomial graph heads up or down forever. You can tell which way from the equation, without drawing a thing.', show: 'title' },
        { say: 'In this video, you will describe the end behaviour of a polynomial function from its degree and its leading coefficient.' },
      ],
    },
    {
      chapter: 'Quadrants',
      layout: 'split',
      leftWidth: 520,
      left: [figure('qd', [intro, numbers(intro, 2, 2), quadrants(intro, 2.4, 4.4), plot(intro, { id: 'curve', f: cubic, samples: 200 }), ends(intro, 'ends', cubic, ...exits(intro, cubic))])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'End behaviour', md: 'The direction the graph goes at the far left and the far right. We describe it by the quadrants where the graph **starts** and **ends**.' }],
      lines: [
        { say: 'End behaviour is the direction a graph goes at the far left and the far right. We describe it by the quadrants where the graph starts and ends.', show: 'def' },
        { say: 'The quadrants are numbered counterclockwise from the top right. Quadrant one is at the top right, two at the top left, three at the bottom left, and four at the bottom right.', show: ['qd.q-grid', 'qd.q-axes', 'qd.q-quads'], focus: 'qd.q-quads' },
        { say: 'Read a graph from left to right. This one comes up from the bottom left, in quadrant three. It wiggles in the middle, and leaves at the top right, in quadrant one.', show: ['qd.q-curve', 'qd.q-ends'], focus: ['qd.q-ends', 'qd.q-QIII', 'qd.q-QI'] },
        { say: 'So we say the graph extends from quadrant three to quadrant one. What happens in the middle does not change that.', focus: 'qd.q-curve' },
      ],
    },
    {
      chapter: 'The leading term wins',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = -2x^3 + 3x + 4', 'x = 10\\colon\\quad {-2}(10)^3 + 3(10) + 4 = \\opp{-2000} + 30 + 4 = -1966', 'x = -10\\colon\\quad {-2}(-10)^3 + 3(-10) + 4 = \\opp{2000} - 30 + 4 = 1974'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Only the leading term matters', md: 'The **degree** decides whether the two ends go the same way. The **sign of the leading coefficient** decides which way the right end goes.' },
      ],
      lines: [
        { say: 'Why can we ignore the middle? Take y equals negative two x cubed, plus three x, plus four.', show: 'm.0', focus: 'm.0' },
        { say: 'At x equals ten, the leading term is negative 2,000, while the other terms add only 34. The total is negative 1,966: large and negative. So the right end goes down.', show: 'm.1', focus: 'm.1' },
        { say: 'At x equals negative ten, the leading term is positive 2,000, and the total is 1,974: large and positive. So the left end goes up.', show: 'm.2', focus: 'm.2' },
        { say: 'Far from the origin, the leading term is far bigger than all the other terms together. So only the leading term matters. Its degree decides whether the two ends go the same way, and the sign of its coefficient decides which way the right end goes.', show: 'key' },
      ],
    },
    {
      chapter: 'Four cases',
      layout: 'center',
      main: [
        figure('ends', [four]),
        { kind: 'callout', id: 'key', tone: 'key', title: 'End behaviour', md: 'Odd degree: the ends go **opposite** ways. Even degree: the **same** way. A positive leading coefficient sends the **right end up**.' },
      ],
      lines: [
        { say: 'That gives four cases.', show: ['ends.c1-grid', 'ends.c1-axes', 'ends.c2-grid', 'ends.c2-axes', 'ends.c3-grid', 'ends.c3-axes', 'ends.c4-grid', 'ends.c4-axes'] },
        { say: 'Odd degree, one or three, with a positive leading coefficient: the graph falls on the left and rises on the right. It extends from quadrant three to quadrant one.', show: ['ends.c1-curve', 'ends.c1-ends', 'ends.c1-text'], focus: 'ends.c1-curve' },
        { say: 'Odd degree with a negative leading coefficient is the reverse: up on the left and down on the right, from quadrant two to quadrant four.', show: ['ends.c2-curve', 'ends.c2-ends', 'ends.c2-text'], focus: 'ends.c2-curve' },
        { say: 'Even degree, like a quadratic, with a positive leading coefficient: both ends go up, from quadrant two to quadrant one.', show: ['ends.c3-curve', 'ends.c3-ends', 'ends.c3-text'], focus: 'ends.c3-curve' },
        { say: 'And even degree with a negative leading coefficient: both ends go down, from quadrant three to quadrant four.', show: ['ends.c4-curve', 'ends.c4-ends', 'ends.c4-text'], focus: 'ends.c4-curve' },
        { say: 'So with an odd degree, the ends go opposite ways, and with an even degree, they go the same way. A positive leading coefficient always sends the right end up.', show: 'key', focus: 'ends' },
      ],
    },
    {
      chapter: 'From the equation',
      layout: 'split',
      leftWidth: 520,
      left: [figure('gr', [ex, numbers(ex, 2, 4), quadrants(ex, 3, 7), plot(ex, { id: 'curve', f, samples: 300 }), ends(ex, 'ends', f, ...exits(ex, f))])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 4 + 3x - 2x^3', '\\text{leading term } {-2x^3}', '\\text{degree } 3\\text{: odd}', '\\text{coefficient } {-2}\\text{: negative}', '\\text{quadrant II to quadrant IV}'] }],
      lines: [
        { say: 'Describe the end behaviour of y equals four, plus three x, minus two x cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'Find the leading term first: the term with the highest power, negative two x cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'The degree, three, is odd, so the two ends go in opposite directions.', show: 'm.2', focus: 'm.2' },
        { say: 'The leading coefficient, negative two, is negative, so the right end goes down. That means the left end goes up.', show: 'm.3', focus: 'm.3' },
        { say: 'So the graph extends from quadrant two to quadrant four.', show: 'm.4', focus: 'm.4' },
        { say: 'The graph agrees. It comes down from the top left, in quadrant two, turns twice in the middle, and leaves at the bottom right, in quadrant four.', show: ['gr.e-grid', 'gr.e-axes', 'gr.e-quads', 'gr.e-curve', 'gr.e-ends'], focus: ['gr.e-ends', 'gr.e-QII', 'gr.e-QIV'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 460,
      left: [figure('mg', [mis, quadrants(mis, 3.5, 3.2), plot(mis, { id: 'curve', f: down, samples: 200 }), ends(mis, 'ends', down, ...exits(mis, down))])],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A negative sign does not split the ends', md: 'For an even degree, both ends still go the same way. A negative leading coefficient just turns them both **down**: $y = 4 - x^2$ goes from quadrant III to quadrant IV.' }],
      lines: [
        { say: 'A common mistake is to think that a negative leading coefficient makes the ends go in opposite directions. It does not.', show: 'oops' },
        { say: 'Here is y equals four minus x squared. Its leading term is negative x squared. The degree, two, is even, so both ends go the same way. The negative sign just turns them both down.', show: ['mg.m-grid', 'mg.m-axes', 'mg.m-quads', 'mg.m-curve', 'mg.m-ends'], focus: 'mg.m-ends' },
        { say: 'So the graph extends from quadrant three to quadrant four. Only an odd degree makes the ends go opposite ways.', focus: ['mg.m-QIII', 'mg.m-QIV'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Describe the end behaviour of $y = 5 - 2x + 3x^2$.',
          choices: ['Quadrant III to quadrant I', 'Quadrant II to quadrant IV', 'Quadrant III to quadrant IV', 'Quadrant II to quadrant I'],
          answer: 3,
          working: 'The leading term is $3x^2$. The degree is even, so both ends go the same way, and the leading coefficient $3$ is positive, so both ends go up.',
        },
      ],
      lines: [
        { say: 'Your turn. Describe the end behaviour of y equals five, minus two x, plus three x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The leading term is three x squared, the term with the highest power. The degree is even, so both ends go the same way, and the leading coefficient is positive, so both go up. Choice B reads the term negative two x instead, but that is not the highest power.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['End behaviour names the quadrants where the graph starts and ends.', 'Only the leading term matters far from the origin.', 'Odd degree: the ends go opposite ways. Even degree: the same way.', 'A positive leading coefficient sends the right end up.'] }],
      lines: [
        { say: 'Let’s sum up. End behaviour names the quadrants where the graph starts and ends, reading from left to right.', show: 'sum.0' },
        { say: 'Far from the origin, only the leading term matters.', show: 'sum.1' },
        { say: 'With an odd degree, the ends go opposite ways. With an even degree, they go the same way.', show: 'sum.2' },
        { say: 'And a positive leading coefficient sends the right end up. In the next part, we find the intercepts and count the turning points. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
