import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { cells, counts, note, paper, rect } from './lib/m5-10-figures.ts';

type P = [number, number];
const row = (y: number, from: number, to: number): P[] => Array.from({ length: to - from + 1 }, (_, i) => [from + i, y]);

// The L shape: two rows of 4 squares, with two rows of 2 squares on top.
const bottom = [...row(1, 1, 4), ...row(2, 1, 4)];
const top = [...row(3, 1, 2), ...row(4, 1, 2)];
const lShape = () =>
  figure('L', [
    paper({ cols: 6, rows: 6 }),
    cells({ id: 'cb', list: bottom, tone: 'adj', shade: 0.3 }),
    cells({ id: 'ct', list: top, tone: 'opp', shade: 0.3 }),
    {
      points: { l0: [1, 1], l1: [5, 1], l2: [5, 3], l3: [3, 3], l4: [3, 5], l5: [1, 5] },
      items: [{ kind: 'curve', id: 'edge', points: ['l0', 'l1', 'l2', 'l3', 'l4', 'l5'], closed: true, tone: 'brand', weight: 4 }],
    },
    counts({ id: 'nb', list: bottom }),
    counts({ id: 'nt', list: top, start: 9 }),
  ]);

const video: Explainer = {
  id: 'm5-10-1',
  lessonId: 'm5-10-1',
  title: 'Units of Area, Part 1: What Is Area?',
  thumbnailTitle: 'What Is Area?',
  thumbnail: 'L',
  summary: 'Area as the amount of surface a shape covers, measured by counting squares of one size with no gaps and no overlaps. The square centimetre, counting 12 cm² in an L shape on centimetre grid paper, and why 12 cm is a length but 12 cm² is an area.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 1', title: 'What Is Area?', subtitle: 'Covering a shape with squares' }],
      lines: [
        { say: 'How much paper covers a book? How much carpet covers a floor? How big is a lake? Each of these questions is about area.', show: 'title' },
        { say: 'In this video, you will learn what area is, meet the square centimetre, and find an area by counting squares.' },
      ],
    },
    {
      chapter: 'What is area?',
      layout: 'split',
      leftWidth: 520,
      left: [figure('t', [tiles({ cols: 4, rows: 3 })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Area', md: '**Area** is the amount of surface a shape covers. We measure it by counting how many squares of one size cover the shape, with **no gaps** and **no overlaps**.' }],
      lines: [
        { say: 'Area is the amount of surface a shape covers. Think of the top of your desk, or the floor of your bedroom: all the flat space inside the edges.', show: 't.outline' },
        { say: 'To measure area, we cover the shape with squares that are all the same size, and count them.', show: 't.grid' },
        { say: 'The squares must fit together with no gaps between them, and no overlaps, where one square sits on top of another.', show: 'def' },
        { say: 'This rectangle is covered by three rows of four squares. That is twelve squares, so its area is twelve squares.', show: 't.tile', focus: 't.grid' },
      ],
    },
    {
      chapter: 'The square centimetre',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sq', [rect({ w: 1, h: 1, labels: { bottom: '1\\text{ cm}', left: '1\\text{ cm}' } }), note('in', [0.5, 0.5], '1\\text{ cm}^2', 'center', 'brand')], 380)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Square centimetre', md: 'A **square centimetre** ($\\text{cm}^2$) is the area of a square that is $1\\text{ cm}$ long on each side. It is about the size of the tip of your finger.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{cm: a length}', '\\text{cm}^2\\text{: an area}'] },
      ],
      lines: [
        { say: 'A square centimetre is the area of a square that is one centimetre long on each side. It is about the size of the tip of your finger.', show: ['sq.shape', 'sq.bottom', 'sq.left', 'def'] },
        { say: 'We write a square centimetre with the letters for centimetre, and a small two up high. The small two reminds us that it is a square unit.', show: 'sq.in', focus: 'sq.in' },
        { say: 'A centimetre measures a length, like the side of this square. A square centimetre measures an area: the space inside it.', show: 'm', focus: ['sq.bottom', 'm.0'] },
        { say: 'On centimetre grid paper, each small square is exactly one square centimetre.', focus: ['sq.shape', 'm.1'] },
      ],
    },
    {
      chapter: 'Counting squares',
      layout: 'split',
      leftWidth: 520,
      left: [lShape()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{bottom rows: } 4 + 4 = \\adj{8}', '\\text{top rows: } 2 + 2 = \\opp{4}', '8 + 4 = 12', '\\text{Area} = 12\\text{ cm}^2'] }],
      lines: [
        { say: 'Each small square on this grid paper is one square centimetre. What is the area of this L shape?', show: ['L.paper', 'L.edge'] },
        { say: 'Count the squares row by row. The bottom two rows have four squares each. Four plus four is eight.', show: ['L.cb', 'L.nb', 'm.0'], focus: ['L.cb', 'm.0'] },
        { say: 'The top two rows have two squares each. Two plus two is four.', show: ['L.ct', 'L.nt', 'm.1'], focus: ['L.ct', 'm.1'] },
        { say: 'Add them: eight plus four is twelve. So the area of the L shape is twelve square centimetres.', show: ['m.2', 'm.3'], focus: ['m.3', 'L.edge'] },
        { say: 'Counting in rows is quicker than counting one square at a time, and it helps you not to miss any.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'cm or cm²?', md: 'Lengths use $\\text{cm}$ or $\\text{m}$. Areas use **square** units: $\\text{cm}^2$, $\\text{m}^2$ or $\\text{km}^2$. "$12\\text{ cm}$" is a length, but "$12\\text{ cm}^2$" is an area.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12\\text{ cm} \\;\\to\\; \\text{a length}', '12\\text{ cm}^2 \\;\\to\\; \\text{an area}'] },
      ],
      lines: [
        { say: 'Be careful with the units. Lengths use centimetres or metres. Areas use square units: square centimetres, square metres, or square kilometres.', show: 'oops' },
        { say: 'Twelve centimetres is a length, like a line twelve centimetres long.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve square centimetres is an area, like twelve little squares covering a shape.', show: 'm.1', focus: 'm.1' },
        { say: 'So whenever you find an area, write square units, with the small two up high.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each small square is $1\\text{ cm}^2$. A rectangle on grid paper is covered by $3$ rows of $6$ squares. What is its area?',
          choices: ['$9\\text{ cm}^2$', '$18\\text{ cm}^2$', '$18\\text{ cm}$', '$36\\text{ cm}^2$'],
          answer: 1,
          working: '$3$ rows of $6$ squares is $6 + 6 + 6 = 18$ squares, so the area is $18\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Each small square is one square centimetre. A rectangle on grid paper is covered by three rows of six squares. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eighteen square centimetres. Three rows of six is six plus six plus six, which is eighteen squares. Choice C has the right number, but centimetres measure a length, not an area.', show: 'q.answer' },
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
          items: ['Area is the amount of surface a shape covers.', 'Measure it by counting squares of one size, with no gaps and no overlaps.', '$1\\text{ cm}^2$ is a square $1\\text{ cm}$ by $1\\text{ cm}$. Areas use square units.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Area is the amount of surface a shape covers.', show: 'sum.0' },
        { say: 'We measure it by counting squares of one size, with no gaps and no overlaps.', show: 'sum.1' },
        { say: 'A square centimetre is a square one centimetre on each side, and areas always use square units. In the next part, you will meet bigger units of area. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
