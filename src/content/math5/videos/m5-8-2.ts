import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { axes, caption, join, mark, regular, regularAxes, shape, type P } from './lib/m5-8-figures.ts';

// The regular polygons in the lessons: sides, where the first corner is, and a name.
const POLYS: [number, number, string][] = [
  [3, 90, 'triangle'],
  [4, 45, 'square'],
  [5, 90, 'pentagon'],
  [6, 0, 'hexagon'],
  [8, 22.5, 'octagon'],
];

// The five regular polygons in a row, each with its lines of symmetry (`l0`…) and its name.
const row = (id: string) =>
  figure(
    id,
    [
      join(
        ...POLYS.map(([n, start, name], k) => {
          const c: P = [k * 3, 0];
          return join(
            shape({ id: `p${k}`, pieces: [regular(n, 1.1, start, c)] }),
            axes({ id: `l${k}`, c, r: 1.35, angles: regularAxes(n, start) }),
            caption({ id: `cap${k}`, at: [k * 3, -1.75], tex: `\\text{${name}}` }),
          );
        }),
      ),
    ],
    300,
  );

// A regular hexagon: three lines of symmetry through opposite corners (`lv`) and three through
// the middles of opposite sides (`lm`).
const hexagon = (id: string) => figure(id, [join(shape({ pieces: [regular(6, 1.6, 0)] }), axes({ id: 'lv', r: 2, angles: [0, 60, 120] }), axes({ id: 'lm', r: 2, angles: [30, 90, 150] }))]);

/** Two rays from the centre to neighbouring corners of the octagon, and the 45° angle between them. */
function turnAngle(): Part {
  const v = regular(8, 1.6, 22.5);
  const items: DiagramItem[] = [
    { kind: 'line', id: 'ray1', from: 'O', to: 'V0', tone: 'theta', weight: 3, group: 'turn' },
    { kind: 'line', id: 'ray2', from: 'O', to: 'V1', tone: 'theta', weight: 3, group: 'turn' },
    { kind: 'angle', id: 'ang', at: 'O', from: 'V0', to: 'V1', label: '45^\\circ', r: 40, group: 'turn' },
  ];
  return { points: { O: [0, 0], V0: v[0], V1: v[1] }, items };
}

// A stop sign: a regular octagon, its 8 lines of symmetry, and the smallest turn, 45°.
const stop = (id: string) => figure(id, [join(shape({ pieces: [regular(8, 1.6, 22.5)], tone: 'bad', shade: 0.3 }), axes({ r: 2, angles: regularAxes(8, 22.5) }), turnAngle(), mark({ id: 'ctr', at: [0, 0] }))]);

const video: Explainer = {
  id: 'm5-8-2',
  lessonId: 'm5-8-2',
  title: 'Symmetry of Polygons, Part 1: Regular Polygons',
  thumbnailTitle: 'Regular Polygons',
  thumbnail: 'hx',
  summary: 'A regular polygon has all sides equal and all angles equal, so a regular polygon with n sides has n lines of symmetry and an order of rotation symmetry of n: a regular hexagon has 6 of each, and a stop sign, a regular octagon, has 8 lines of symmetry and fits on itself after a turn of 360° ÷ 8 = 45°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 1', title: 'Regular Polygons', subtitle: 'Equal sides, equal angles, lots of symmetry' }],
      lines: [
        { say: 'A stop sign, a honeycomb cell and a patch on a soccer ball are all regular polygons. Their equal sides and equal angles give them a lot of symmetry.', show: 'title' },
        { say: 'In this video, you will find the lines of symmetry and the order of rotation symmetry of regular polygons.' },
      ],
    },
    {
      chapter: 'Polygons',
      layout: 'center',
      main: [
        row('rw'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Regular polygon', md: 'A **polygon** is a closed 2-D shape with straight sides. A **regular polygon** has all its sides equal **and** all its angles equal.' },
      ],
      lines: [
        { say: 'A polygon is a closed flat shape with straight sides. Triangles, squares, penta-gons, hexagons and octagons are all polygons.', caption: 'A polygon is a closed flat shape with straight sides. Triangles, squares, pentagons, hexagons and octagons are all polygons.', show: [...POLYS.map((_, k) => `rw.p${k}`), ...POLYS.map((_, k) => `rw.cap${k}`)] },
        { say: 'A regular polygon has all its sides equal, and all its angles equal. A triangle with three equal sides is a regular polygon, and so is a square.', show: 'def' },
        { say: 'All five polygons here are regular. A regular penta-gon has five equal sides, a regular hexagon has six, and a regular octagon has eight.', caption: 'All five polygons here are regular. A regular pentagon has five equal sides, a regular hexagon has six, and a regular octagon has eight.' },
      ],
    },
    {
      chapter: 'A regular hexagon',
      layout: 'split',
      leftWidth: 500,
      left: [hexagon('hx')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\text{ equal sides}', '6 \\text{ lines of symmetry}', '\\text{order of rotation symmetry } 6'] }],
      lines: [
        { say: 'Look at this regular hexagon. It has six equal sides, and six equal angles.', show: ['hx.shape', 'm.0'] },
        { say: 'Three lines of symmetry go through opposite corners.', show: 'hx.lv', focus: 'hx.lv' },
        { say: 'Three more go through the middles of opposite sides. That makes six lines of symmetry.', show: ['hx.lm', 'm.1'], focus: ['hx.lm', 'm.1'] },
        { say: 'It also fits on itself six times in a full turn, once for each corner. So its order of rotation symmetry is six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The pattern',
      layout: 'center',
      main: [row('rw2')],
      lines: [
        { say: 'Here are the regular polygons again, with all their lines of symmetry.', show: [...POLYS.map((_, k) => `rw2.p${k}`), ...POLYS.map((_, k) => `rw2.cap${k}`)] },
        { say: 'The triangle with three equal sides has three lines of symmetry. The square has four.', show: ['rw2.l0', 'rw2.l1'], focus: ['rw2.l0', 'rw2.l1'] },
        { say: 'The regular penta-gon has five, and the regular hexagon has six.', caption: 'The regular pentagon has five, and the regular hexagon has six.', show: ['rw2.l2', 'rw2.l3'], focus: ['rw2.l2', 'rw2.l3'] },
        { say: 'And the regular octagon has eight. Do you see the pattern?', show: 'rw2.l4', focus: 'rw2.l4' },
      ],
    },
    {
      chapter: 'Sides, lines and turns',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Regular polygon', 'Sides', 'Lines of symmetry', 'Order of rotation symmetry'],
          rows: [
            ['Triangle (3 equal sides)', '$3$', '$3$', '$3$'],
            ['Square', '$4$', '$4$', '$4$'],
            ['Regular pentagon', '$5$', '$5$', '$5$'],
            ['Regular hexagon', '$6$', '$6$', '$6$'],
            ['Regular octagon', '$8$', '$8$', '$8$'],
          ],
        },
      ],
      lines: [
        { say: 'In a regular polygon, the number of sides, the number of lines of symmetry, and the order of rotation symmetry are all the same.', show: 't.0', focus: 't.0' },
        { say: 'A square has four sides, four lines of symmetry, and an order of rotation symmetry of four.', show: 't.1', focus: 't.1' },
        { say: 'A regular penta-gon has five of each, a regular hexagon has six of each, and a regular octagon has eight of each.', caption: 'A regular pentagon has five of each, a regular hexagon has six of each, and a regular octagon has eight of each.', show: ['t.2', 't.3', 't.4'], focus: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'A stop sign',
      layout: 'split',
      leftWidth: 500,
      left: [stop('ss')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A stop sign is a regular octagon. How many lines of symmetry does it have? What is the smallest turn that makes it fit on itself?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 \\text{ lines of symmetry}', '360^\\circ \\div 8 = 45^\\circ'] },
      ],
      lines: [
        { say: 'A stop sign is a regular octagon. How many lines of symmetry does it have? And what is the smallest turn that makes it fit on itself?', show: ['ss.shape', 'ss.ctr', 'q'] },
        { say: 'A regular octagon has eight sides. So it has eight lines of symmetry, and an order of rotation symmetry of eight.', show: ['ss.l', 'm.0'], focus: ['ss.l', 'm.0'] },
        { say: 'It fits eight times in a full turn of 360 degrees. Share the full turn equally among the eight fits: 360 divided by eight is 45 degrees.', show: ['m.1', 'ss.turn'], hide: 'ss.l', focus: ['m.1', 'ss.turn'] },
        { say: 'So the smallest turn is 45 degrees. That turn moves each corner onto the next corner.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many lines of symmetry does a regular pentagon have, and what is the smallest turn that makes it fit on itself?',
          choices: ['$5$ lines; $60^\\circ$', '$10$ lines; $36^\\circ$', '$5$ lines; $72^\\circ$', '$4$ lines; $90^\\circ$'],
          answer: 2,
          working: 'A regular pentagon has $5$ sides, so $5$ lines of symmetry and order $5$. The smallest turn is $360^\\circ \\div 5 = 72^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many lines of symmetry does a regular penta-gon have, and what is the smallest turn that makes it fit on itself? Pause the video and try it.', caption: 'Your turn. How many lines of symmetry does a regular pentagon have, and what is the smallest turn that makes it fit on itself? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: five lines, and 72 degrees. A regular penta-gon has five sides, so it has five lines of symmetry and order five, and 360 divided by five is 72. Choice A divides 360 by six, not five.', caption: 'The answer is C: five lines, and 72 degrees. A regular pentagon has five sides, so it has five lines of symmetry and order five, and 360 divided by five is 72. Choice A divides 360 by six, not five.', show: 'q.answer' },
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
          items: ['A regular polygon has all sides equal and all angles equal.', 'A regular polygon with $n$ sides has $n$ lines of symmetry and an order of rotation symmetry of $n$.', 'Its smallest turn is $360^\\circ \\div n$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A regular polygon has all sides equal and all angles equal.', show: 'sum.0' },
        { say: 'A regular polygon with n sides has n lines of symmetry, and an order of rotation symmetry of n.', show: 'sum.1' },
        { say: 'And its smallest turn is 360 degrees divided by the number of sides. In the next part, you will look at polygons that are not regular. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
