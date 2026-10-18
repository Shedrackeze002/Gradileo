import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { branches, hole, numbers, piece, plane, spot, tag, vAsym } from './lib/m31-2-graphs.ts';

// The lesson's graph: y = −x − 2 up to (−3, 1); then y = (2x − 3)/(3 − x) from (−3, −1.5), with a hole
// at (0, −1) and a separate dot at (0, 2), and a vertical asymptote x = 3.
const g = plane({ x: [-5, 5], y: [-5, 5], every: 0 });
const mid = (x: number) => (2 * x - 3) / (3 - x);
const three = (id: string) =>
  figure(id, [
    g,
    numbers(g, 1, 1),
    vAsym(g, 'v', 3, 'muted'),
    tag(g, 'v-name', 3.1, -4.6, 'x = 3', 'left', 'muted'),
    piece(g, { id: 'left', f: (x) => -x - 2, from: -5, to: -3 }),
    branches(g, { id: 'c', f: mid, from: -3, breaks: [3] }),
    spot(g, 'J1', -3, 1, { tex: '', tone: 'brand' }),
    hole(g, 'J2', -3, -1.5),
    hole(g, 'H', 0, -1),
    spot(g, 'D', 0, 2, { tex: '(0, 2)', place: 'above left', tone: 'opp' }),
  ]);

const video: Explainer = {
  id: 'm31-2-4-b',
  lessonId: 'm31-2-4',
  title: 'Continuity, Part 2: Types of Discontinuity',
  thumbnailTitle: 'The Types of Discontinuity',
  thumbnail: 'g1',
  summary: 'The three types of discontinuity: removable (a hole: the limit exists but f(a) is undefined or different), jump (the one-sided limits differ) and infinite (a vertical asymptote). Classifying the three discontinuities of one graph: a jump at x = −3, a removable discontinuity at x = 0 and an infinite one at x = 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 2', title: 'Types of Discontinuity', subtitle: 'Removable, jump and infinite' }],
      lines: [
        { say: 'In the last part, we saw that a graph can fail to be continuous in different ways. Those ways have names.', show: 'title' },
        { say: 'In this video, you will learn the three types of discontinuity, and classify each break on a graph.' },
      ],
    },
    {
      chapter: 'Three types',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Removable** (a hole): the limit exists, but $f(a)$ is undefined or different from it.', '**Jump:** the one-sided limits exist but are different.', '**Infinite:** $f(x) \\to \\pm\\infty$ near $x = a$, a vertical asymptote.'],
        },
      ],
      lines: [
        { say: 'A removable discontinuity is a hole. The limit exists, so the graph heads toward one point from both sides, but f of "a" is either undefined, or somewhere else.', show: 'b.0', focus: 'b.0' },
        { say: 'A jump discontinuity is where the one-sided limits both exist, but are different. The graph jumps from one height to another.', show: 'b.1', focus: 'b.1' },
        { say: 'An infinite discontinuity is where the values grow without bound near x equals "a". The graph has a vertical asymptote there.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Reading a graph',
      layout: 'split',
      leftWidth: 560,
      left: [three('g1')],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', 'What happens', 'Type'],
          rows: [
            ['$-3$', 'sides head to $1$ and $-1.5$', 'jump'],
            ['$0$', 'limit $-1$, but $f(0) = 2$', 'removable'],
            ['$3$', 'vertical asymptote', 'infinite'],
          ],
        },
      ],
      lines: [
        { say: 'This graph has three discontinuities. Classify each one.', show: ['g1.grid', 'g1.axes', 'g1.left', 'g1.c', 'g1.J1', 'g1.J2', 'g1.H', 'g1.D', 'g1.v', 'g1.v-name'] },
        { say: 'At x equals negative three, the graph comes in from the left toward the solid dot at height one. From the right, it starts at the hollow circle at height negative 1.5.', focus: ['g1.J1', 'g1.J2'] },
        { say: 'The one-sided limits are one and negative 1.5. They are different, so the limit does not exist. This is a jump discontinuity.', show: 't.0', focus: 't.0' },
        { say: 'At x equals zero, the curve heads toward the hollow circle at height negative one from both sides, so the limit is negative one. But the solid dot says f of zero is two.', focus: ['g1.H', 'g1.D'] },
        { say: 'The limit exists, but it does not equal f of zero, so condition three fails. This is a removable discontinuity.', show: 't.1', focus: 't.1' },
        { say: 'At x equals three, the graph shoots off along a vertical asymptote. This is an infinite discontinuity.', show: 't.2', focus: ['t.2', 'g1.v'] },
      ],
    },
    {
      chapter: 'Why removable?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Removable means fixable', md: 'Redefine $f(0) = -1$, and the hole at $x = 0$ is filled: the function becomes continuous there. A jump or an asymptote cannot be fixed by changing one point.' },
      ],
      lines: [
        { say: 'Why is a hole called removable? Because you can remove the discontinuity by changing a single point.', show: 'key' },
        { say: 'If we redefined f of zero to be negative one, the dot would move into the hole, and the graph would be continuous at zero.' },
        { say: 'That does not work for the other two types. At a jump, the two sides head for different heights, so no single point can join them. And at a vertical asymptote, there is no height to aim for at all.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At $x = 5$, $\\displaystyle\\lim_{x \\to 5^-} f(x) = 2$, $\\displaystyle\\lim_{x \\to 5^+} f(x) = 2$, and $f(5)$ is undefined. What type of discontinuity is this?',
          choices: ['jump', 'removable', 'infinite', 'none: $f$ is continuous at $x = 5$'],
          answer: 1,
          working: 'Both one-sided limits are $2$, so the limit exists. But $f(5)$ is undefined, so there is a hole: a removable discontinuity.',
        },
      ],
      lines: [
        { say: 'Your turn. At x equals five, both one-sided limits of f are two, and f of five is undefined. What type of discontinuity is this? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The one-sided limits agree, so the limit is two, but f of five is undefined. That is a hole: a removable discontinuity. Choice A would need the one-sided limits to be different.', show: 'q.answer' },
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
          items: ['**Removable:** a hole. The limit exists, but $f(a)$ is missing or different.', '**Jump:** the one-sided limits are different.', '**Infinite:** a vertical asymptote.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A removable discontinuity is a hole: the limit exists, but f of "a" is missing or in a different place.', show: 'sum.0' },
        { say: 'A jump discontinuity is where the one-sided limits are different.', show: 'sum.1' },
        { say: 'And an infinite discontinuity is a vertical asymptote. In the next part, we see which familiar functions are continuous, and find discontinuities without a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
