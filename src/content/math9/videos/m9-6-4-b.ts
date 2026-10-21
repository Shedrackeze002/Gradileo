import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/m9-5-figures.ts';
import { ineqLine } from './lib/m9-6-figures.ts';

// x > −2: an open dot at −2 and an arrow to the right.
const gt = (id: string) => figure(id, [ineqLine({ min: -6, max: 4, boundary: { value: -2, closed: false, dir: 'right' } })], 200);

// x < 4 above x ≤ 4: the same arrow, an open dot and a closed dot, each named on its left.
const pair = (id: string) =>
  figure(
    id,
    [
      ineqLine({ name: 'a', min: -2, max: 7, boundary: { value: 4, closed: false, dir: 'left' }, at: [0, 2] }),
      ineqLine({ name: 'b', min: -2, max: 7, boundary: { value: 4, closed: true, dir: 'left' } }),
      tag({ id: 'ta', at: [-1.3, 2], tex: 'x < 4', place: 'left' }),
      tag({ id: 'tb', at: [-1.3, 0], tex: 'x \\le 4', place: 'left' }),
    ],
    300,
  );

// The lesson's number line to read: a closed dot at 4 and an arrow to the left.
const read = (id: string) => figure(id, [ineqLine({ min: -3, max: 7, boundary: { value: 4, closed: true, dir: 'left' } })], 200);

const video: Explainer = {
  id: 'm9-6-4-b',
  lessonId: 'm9-6-4',
  title: 'Representing Inequalities, Part 2: Inequalities on a Number Line',
  thumbnailTitle: 'Inequalities on a Number Line',
  thumbnail: 'pr',
  summary:
    'A number line shows a whole solution set at once: a dot at the boundary value, then an arrow over all the solutions. A closed (filled) dot means the boundary is included (≤ or ≥); an open dot means it is not (< or >). The arrow points right for greater values and left for smaller ones: x > −2 is an open dot at −2 with an arrow to the right, and a closed dot at 4 with an arrow to the left is x ≤ 4. x < 4 and x ≤ 4 have the same arrow but different dots.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 2', title: 'Inequalities on a Number Line', subtitle: 'Open or closed, left or right' }],
      lines: [
        { say: 'An inequality like x greater than negative two has infinitely many solutions. You cannot list them all. But you can draw them.', show: 'title' },
        { say: 'In this part, you will show an inequality on a number line, and read one.' },
      ],
    },
    {
      chapter: 'Dot and arrow',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['x > -2'] }, gt('gt')],
      lines: [
        { say: 'Here is the inequality x is greater than negative two. Start with a number line.', show: ['m.0', 'gt.axis'] },
        { say: 'Draw a dot at the boundary value, negative two. The boundary is where the solutions start.', show: 'gt.dot', focus: 'gt.dot' },
        { say: 'Negative two itself is not a solution, because negative two is not greater than negative two. So the dot is open, or hollow.' },
        { say: 'The solutions are the numbers greater than negative two. Greater numbers are to the right, so draw an arrow to the right, over all of them.', show: 'gt.ray', focus: 'gt.ray' },
        { say: 'The arrow goes on forever: negative one, zero, three, one hundred, and every number in between, are all solutions.' },
      ],
    },
    {
      chapter: 'Open or closed',
      layout: 'center',
      main: [
        pair('pr'),
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Closed** dot: the boundary is included, $\\le$ or $\\ge$.', '**Open** dot: the boundary is not included, $<$ or $>$.', 'The arrow points toward the solutions.'],
        },
      ],
      lines: [
        { say: 'Compare x is less than four, on top, with x is less than or equal to four, underneath.', show: ['pr.ta', 'pr.tb', 'pr.a-axis', 'pr.b-axis'] },
        { say: 'Both have their solutions to the left of four, so both arrows point left, toward the smaller numbers.', show: ['pr.a-dot', 'pr.a-ray', 'pr.b-dot', 'pr.b-ray'], focus: ['pr.a-ray', 'pr.b-ray'] },
        { say: 'The difference is the dot. For less than or equal to, four is included, so the dot is closed, or filled in.', show: 'b.0', focus: 'pr.b-dot' },
        { say: 'For less than, four is not included, so the dot is open.', show: 'b.1', focus: 'pr.a-dot' },
        { say: 'And the arrow always points toward the solutions: right for greater values, left for smaller values.', show: 'b.2', focus: 'pr' },
      ],
    },
    {
      chapter: 'Read a number line',
      layout: 'center',
      main: [read('rd'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{boundary } 4 \\qquad \\text{closed: } \\le \\text{ or } \\ge \\qquad \\text{left: smaller}', 'x \\le 4'] }],
      lines: [
        { say: 'Now read one. Which inequality does this number line show? Use x as the variable.', show: ['rd.axis', 'rd.dot', 'rd.ray'] },
        { say: 'The dot is at four, so the boundary is four.', focus: 'rd.dot' },
        { say: 'The dot is closed, so four is included. The symbol is less than or equal to, or greater than or equal to.' },
        { say: 'The arrow points left, toward smaller values. So the inequality is x is less than or equal to four.', show: ['m.0', 'm.1'], focus: ['rd.ray', 'm.1'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Open and closed dots', md: '$x < 4$ and $x \\le 4$ have the same arrow but different dots. Check the boundary: does the inequality allow “equal to”? If yes, fill in the dot.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x < 4\\text{: } 4 < 4 \\text{ is false} \\;\\to\\; \\text{open}', 'x \\le 4\\text{: } 4 \\le 4 \\text{ is true} \\;\\to\\; \\text{closed}'] },
      ],
      lines: [
        { say: 'Watch out: it is easy to mix up open and closed dots. Less than four, and less than or equal to four, have the same arrow but different dots.', show: 'oops' },
        { say: 'Check the boundary. For x less than four, try four: four is less than four is false. Four is not a solution, so the dot is open.', show: 'm.0', focus: 'm.0' },
        { say: 'For x less than or equal to four, four is less than or equal to four is true. Four is a solution, so the dot is closed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A number line has an **open** dot at $1$ and an arrow pointing **left**. Which inequality does it show?',
          choices: ['$x \\le 1$', '$x > 1$', '$x \\ge 1$', '$x < 1$'],
          answer: 3,
          working: 'The open dot means $1$ is not included, so the symbol is $<$ or $>$. The arrow points left, toward smaller numbers: $x < 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. A number line has an open dot at one, and an arrow pointing left. Which inequality does it show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The dot is open, so one is not included: the symbol is less than or greater than. The arrow points left, toward smaller numbers, so the inequality is x is less than one. Choice A would need a closed dot.', show: 'q.answer' },
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
          items: [
            'Draw a dot at the boundary, then an arrow over all the solutions.',
            'Closed dot for $\\le$ and $\\ge$; open dot for $<$ and $>$.',
            'The arrow points right for greater values, left for smaller ones.',
            'Check the boundary: does the inequality allow “equal to”?',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To draw an inequality, put a dot at the boundary, then an arrow over all the solutions.', show: 'sum.0' },
        { say: 'Use a closed dot for less than or equal to, and greater than or equal to. Use an open dot for less than, and greater than.', show: 'sum.1' },
        { say: 'The arrow points right for greater values, and left for smaller values.', show: 'sum.2' },
        { say: 'And check the boundary: does the inequality allow equal to? In the next part, you will write inequalities for real situations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
