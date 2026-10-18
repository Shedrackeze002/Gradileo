import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, fan, polygon, regularCorners } from './lib/m303-3-figures.ts';

type P = [number, number];

/** The lesson's hexagon, split into triangles from its bottom left corner. */
const hex: P[] = [[1.6, 0.9], [4.8, 0.7], [6.2, 2.7], [5.4, 4.9], [2.8, 5.3], [0.8, 3.1]];
const hexCorners = Object.fromEntries(hex.map((p, i) => ['ABCDEF'[i], p]));

/** A regular polygon with `n` sides, split into triangles from its bottom left corner, with a caption. */
const splitRegular = (name: string, n: number, x: number) => {
  const v = regularCorners(n, { c: [x, 0], r: 1.6 });
  return [
    fan({ name, corners: v }),
    polygon({ name, corners: Object.fromEntries(v.map((p, i) => [`v${i}`, p])), names: false, shade: 0, group: `${name}-out` }),
    caption({ name, id: 'cap', at: [x, -2.15], tex: `${n - 2}\\text{ triangles}` }),
  ];
};

const video: Explainer = {
  id: 'm303-3-2',
  lessonId: 'm303-3-2',
  title: 'Angles in Regular Polygons, Part 1: The Interior Angle Sum',
  thumbnailTitle: 'The Interior Angle Sum',
  thumbnail: 'hx',
  summary: 'Splitting a convex polygon into n − 2 triangles from one corner gives the interior angle sum 180°(n − 2): 540° for a pentagon, 720° for a hexagon, 1080° for an octagon and 1440° for a decagon, and a check with a triangle shows why the sum is not 180° × n. Part 2 finds each angle of a regular polygon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 1', title: 'The Interior Angle Sum', subtitle: 'Splitting polygons into triangles' }],
      lines: [
        { say: 'Hex nuts, octagonal signs, gazebo floors and many floor tiles are polygons. To cut, build or check one of these shapes, you need to know its angles.', show: 'title' },
        { say: 'In this video, you will split a polygon into triangles, and find a rule for the sum of its interior angles, whatever its number of sides.' },
      ],
    },
    {
      chapter: 'Polygons',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Polygon', md: 'A **polygon** is a closed shape made of straight sides. It is **convex** when every interior angle is less than $180^\\circ$, so no corner points inward.' },
        { kind: 'table', id: 't', head: ['Sides', '5', '6', '8', '10'], rows: [['Name', 'pentagon', 'hexagon', 'octagon', 'decagon']] },
      ],
      lines: [
        { say: 'A polygon is a closed shape made of straight sides. Triangles and quadrilaterals are polygons, and so are shapes with five, six or more sides.', show: 'def' },
        { say: 'A polygon is convex when every interior angle is less than 180 degrees, so none of its corners point inward. In this lesson, every polygon is convex.' },
        { say: 'Some polygons have names you will hear often. A pentagon has five sides, a hexagon six, an octagon eight, and a decagon ten. We call the number of sides n.', show: 't' },
      ],
    },
    {
      chapter: 'Splitting into triangles',
      layout: 'split',
      left: [figure('hx', [fan({ corners: hex }), polygon({ corners: hexCorners, shade: 0 })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\text{ sides} \\to 4 \\text{ triangles}', 'n \\text{ sides} \\to n - 2 \\text{ triangles}', '4 \\times 180^\\circ = 720^\\circ'] }],
      lines: [
        { say: 'Here is a hexagon, with six sides. Pick one corner, A, and draw every diagonal you can from it.', show: ['hx.shape', 'hx.names', 'hx.diags'], focus: 'hx.diags' },
        { say: 'The diagonals split the hexagon into four triangles.', show: ['hx.t1', 'hx.t2', 'hx.t3', 'hx.t4', 'm.0'], focus: ['hx.t1', 'hx.t2', 'hx.t3', 'hx.t4', 'm.0'] },
        { say: 'Why four, and not six? Corner A has no diagonal to itself, or to its two neighbours, B and F, because those are already joined to A by sides. So there are always two fewer triangles than sides.', focus: ['hx.nA', 'hx.nB', 'hx.nF'] },
        { say: 'In general, a polygon with n sides splits into n minus two triangles.', show: 'm.1', focus: 'm.1' },
        { say: 'The angles of the four triangles fit together exactly to make the six angles of the hexagon. Each triangle holds 180 degrees, so the hexagon’s angles add to four times 180, which is 720 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'More polygons',
      layout: 'center',
      main: [figure('mp', [...splitRegular('p', 5, 0), ...splitRegular('h', 6, 4.6), ...splitRegular('o', 8, 9.4)])],
      lines: [
        { say: 'It works the same way for any polygon. A pentagon, with five sides, splits into three triangles.', show: ['mp.p-out', 'mp.p-diags', 'mp.p-t1', 'mp.p-t2', 'mp.p-t3', 'mp.p-cap'] },
        { say: 'A hexagon splits into four triangles.', show: ['mp.h-out', 'mp.h-diags', 'mp.h-t1', 'mp.h-t2', 'mp.h-t3', 'mp.h-t4', 'mp.h-cap'] },
        { say: 'And an octagon, with eight sides, splits into six triangles. Each time, there are two fewer triangles than sides.', show: ['mp.o-out', 'mp.o-diags', 'mp.o-t1', 'mp.o-t2', 'mp.o-t3', 'mp.o-t4', 'mp.o-t5', 'mp.o-t6', 'mp.o-cap'] },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interior angle sum', md: 'The interior angles of a convex polygon with $n$ sides add to $180^\\circ(n - 2)$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Polygon', 'Sides $n$', 'Triangles', 'Angle sum'],
          rows: [
            ['Pentagon', '5', '3', '$540^\\circ$'],
            ['Hexagon', '6', '4', '$720^\\circ$'],
            ['Octagon', '8', '6', '$1080^\\circ$'],
            ['Decagon', '10', '8', '$1440^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'So here is the rule. The interior angles of a convex polygon with n sides add to 180 degrees, times n minus two.', show: 'def' },
        { say: 'A pentagon has five sides. Five minus two is three triangles, and three times 180 is 540 degrees.', show: 't.0', focus: 't.0' },
        { say: 'A hexagon has four triangles, so its angles add to 720 degrees.', show: 't.1', focus: 't.1' },
        { say: 'An octagon has six triangles, so its angles add to six times 180, which is 1,080 degrees.', show: 't.2', focus: 't.2' },
        { say: 'And a decagon, with ten sides, has eight triangles: eight times 180 is 1,440 degrees.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Check with a triangle',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the 2', md: 'The angle sum is **not** $180^\\circ \\times n$. Test any rule on shapes you know: a triangle must give $180^\\circ$ and a quadrilateral $360^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 3:\\quad 180^\\circ(3 - 2) = 180^\\circ \\;\\good{\\checkmark}', 'n = 4:\\quad 180^\\circ(4 - 2) = 360^\\circ \\;\\good{\\checkmark}', '180^\\circ \\times 3 = \\bad{540^\\circ} \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'A common slip is to multiply 180 by the number of sides, and forget to subtract two first.', show: 'oops' },
        { say: 'Test the rule on shapes you already know. A triangle has three sides: 180 times three minus two is 180. That is right.', show: 'm.0', focus: 'm.0' },
        { say: 'A quadrilateral has four sides: 180 times four minus two is 360. Right again.', show: 'm.1', focus: 'm.1' },
        { say: 'But 180 times three would give a triangle 540 degrees, which is far too much. So always subtract two from the number of sides before you multiply.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A convex polygon has 9 sides. What is the sum of its interior angles?',
          choices: ['$1620^\\circ$', '$1260^\\circ$', '$1440^\\circ$', '$140^\\circ$'],
          answer: 1,
          working: '$180^\\circ(9 - 2) = 180^\\circ \\times 7 = 1260^\\circ$. $1620^\\circ$ is $180^\\circ \\times 9$, which forgets to subtract 2.',
        },
      ],
      lines: [
        { say: 'Your turn. A convex polygon has nine sides. What is the sum of its interior angles? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 1,260 degrees. Nine minus two is seven triangles, and seven times 180 is 1,260. Choice A, 1,620 degrees, is 180 times nine, which forgets to subtract two.', show: 'q.answer' },
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
            'From one corner, a polygon with $n$ sides splits into $n - 2$ triangles.',
            'Its interior angles add to $180^\\circ(n - 2)$.',
            'Check the rule with a triangle ($180^\\circ$) or a quadrilateral ($360^\\circ$).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Draw every diagonal from one corner, and a polygon with n sides splits into n minus two triangles.', show: 'sum.0' },
        { say: 'So its interior angles add to 180 degrees, times n minus two.', show: 'sum.1' },
        { say: 'And check the rule with a triangle or a quadrilateral. In the next part, we find each angle of a regular polygon. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
