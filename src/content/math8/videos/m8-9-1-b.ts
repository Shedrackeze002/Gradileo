import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved, poly, polyIds } from './lib/m8-9-figures.ts';

type P = [number, number];

// The triangles from part 1: ABC (AB = 6, BC = 9, CA = 7) and DEF, its flipped and turned copy.
const ABC: Record<string, P> = { A: [0, 0], B: [6, 0], C: [0.333, 6.992] };
const DEF = moved(ABC, { flip: true, turn: -90, to: [11.4, 2.4], names: ['D', 'E', 'F'] });
const marked = (id: string) =>
  figure(id, [
    poly({ name: 'p', corners: ABC, places: { B: 'below' }, ticks: { AB: 1, BC: 2, CA: 3 }, arcs: { A: 1, B: 2, C: 3 } }),
    poly({ name: 'q', corners: DEF, places: { D: 'below' }, tone: 'good', ticks: { DE: 1, EF: 2, FD: 3 }, arcs: { D: 1, E: 2, F: 3 } }),
  ]);

// The lesson's example: PQR ≅ XZY, right-angled at Q and at Z. PQ = XZ ≈ 2.74, QR = ZY ≈ 3.65 and
// PR = XY ≈ 4.56: XZY is PQR turned, so its letters are not in the same places on the page.
const PQR: Record<string, P> = { P: [-1.826, -1.217], Q: [0.913, -1.217], R: [0.913, 2.434] };
const XZY: Record<string, P> = { X: [7.832, -0.43], Z: [5.895, 1.506], Y: [3.313, -1.076] };
const example = (id: string) =>
  figure(id, [
    poly({ name: 'p', corners: PQR, rights: ['Q'], arcs: { R: 1 } }),
    poly({ name: 'q', corners: XZY, tone: 'good', rights: ['Z'], arcs: { Y: 1 } }),
  ]);

const both = (id: string) => [...polyIds(id, 'p'), ...polyIds(id, 'q')];

const video: Explainer = {
  id: 'm8-9-1-b',
  lessonId: 'm8-9-1',
  title: 'Congruent Polygons, Part 2: Congruence Statements',
  thumbnailTitle: 'Congruence Statements',
  thumbnail: 'ex',
  summary:
    'A congruence statement such as △ABC ≅ △DEF lists the vertices in matching order: A matches D, B matches E and C matches F, so side AB matches DE. For △PQR ≅ △XZY, P matches X, Q matches Z and R matches Y, so side QR corresponds to ZY and ∠R corresponds to ∠Y. The second polygon may be turned or flipped, so use the order of the letters, not the picture.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 2', title: 'Congruence Statements', subtitle: 'The order of the letters matters' }],
      lines: [
        { say: 'When two shapes are congruent, you can say so in one short line of maths. But the order of the letters in that line matters a lot.', show: 'title' },
        { say: 'In this video, you will learn to read a statement of congruence, and use it to find the parts that match.' },
      ],
    },
    {
      chapter: 'Matching order',
      layout: 'split',
      leftWidth: 640,
      left: [marked('mo')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Congruence statement',
          md: 'It lists the vertices in **matching order**.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\triangle ABC \\cong \\triangle DEF', 'A \\leftrightarrow D', 'B \\leftrightarrow E', 'C \\leftrightarrow F'] },
      ],
      lines: [
        { say: 'Here are the two triangles from the last part, with their matching marks. We can write: triangle A B C is congruent to triangle D E F.', show: [...both('mo'), 'mo.p-m-A', 'mo.q-m-D', 'mo.p-m-B', 'mo.q-m-E', 'mo.p-m-C', 'mo.q-m-F', 'm.0'], focus: 'm.0' },
        { say: 'A line like this is called a statement of congruence, or a congruence statement. It lists the vertices, or corners, in matching order.', show: 'def' },
        { say: 'The first letter on the left matches the first letter on the right. So vertex A matches vertex D, and angle A equals angle D. Look: each has one arc.', show: 'm.1', focus: ['m.1', 'mo.p-m-A', 'mo.q-m-D'] },
        { say: 'The second letters match: B matches E, with two arcs each. And the third letters match: C matches F, with three arcs each.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3', 'mo.p-m-B', 'mo.q-m-E', 'mo.p-m-C', 'mo.q-m-F'] },
      ],
    },
    {
      chapter: 'Matching sides',
      layout: 'split',
      leftWidth: 640,
      left: [marked('ms')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A side joins two vertices. It matches the side that joins the **matching** vertices.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AB \\leftrightarrow DE', 'BC \\leftrightarrow EF', 'CA \\leftrightarrow FD'] },
      ],
      lines: [
        { say: 'The statement tells you the matching sides as well. A side joins two vertices.', show: [...both('ms'), 't'] },
        { say: 'Side A B joins the first and second vertices of A B C. So it matches the side that joins the first and second vertices of D E F. That is side D E. Both have one tick mark.', show: ['m.0', 'ms.p-t-AB', 'ms.q-t-DE'], focus: ['m.0', 'ms.p-AB', 'ms.q-DE', 'ms.p-t-AB', 'ms.q-t-DE'] },
        { say: 'In the same way, B C joins the second and third vertices, so it matches E F.', show: ['m.1', 'ms.p-t-BC', 'ms.q-t-EF'], focus: ['m.1', 'ms.p-BC', 'ms.q-EF', 'ms.p-t-BC', 'ms.q-t-EF'] },
        { say: 'And C A joins the third and first vertices, so it matches F D.', show: ['m.2', 'ms.p-t-CA', 'ms.q-t-FD'], focus: ['m.2', 'ms.p-CA', 'ms.q-FD', 'ms.p-t-CA', 'ms.q-t-FD'] },
      ],
    },
    {
      chapter: 'Reading a statement',
      layout: 'split',
      leftWidth: 620,
      left: [example('ex')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$\\triangle PQR \\cong \\triangle XZY$. Which side corresponds to $QR$? Which angle corresponds to $\\angle R$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P \\leftrightarrow X,\\ \\ Q \\leftrightarrow Z,', 'R \\leftrightarrow Y', 'QR \\leftrightarrow ZY', '\\angle R \\leftrightarrow \\angle Y'] },
      ],
      lines: [
        { say: 'Let’s try one. Triangle P Q R is congruent to triangle X Z Y. Which side corresponds to Q R, and which angle corresponds to angle R?', show: [...both('ex'), 'q'] },
        { say: 'Step one: match the letters in order. P matches X, Q matches Z, and R matches Y. The second triangle is not in alphabetical order, so take care.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Step two: side Q R joins Q and R. Q matches Z, and R matches Y. So side Q R corresponds to side Z Y.', show: 'm.2', focus: ['m.2', 'ex.p-QR', 'ex.q-ZY'] },
        { say: 'Step three: R is the third letter of P Q R. The third letter of X Z Y is Y. So angle R corresponds to angle Y.', show: ['m.3', 'ex.p-m-R', 'ex.q-m-Y'], focus: ['m.3', 'ex.p-m-R', 'ex.q-m-Y'] },
        { say: 'Check with the picture. Q R and Z Y are both the longer of the two sides next to the square corner, and they really are the same length.', focus: ['ex.p-QR', 'ex.q-ZY'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 620,
      left: [example('wo')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Going by the picture', md: 'The second polygon may be **turned** or **flipped**. Do not match vertices by where they sit on the page. Use the **order of the letters**.' }],
      lines: [
        { say: 'Watch out. It is tempting to match the vertices by where they sit on the page. Point P is at the bottom left of its triangle, and Point Y is at the bottom left of the other one.', show: both('wo'), focus: ['wo.p-nP', 'wo.q-nY'] },
        { say: 'But P does not match Y. The second triangle has been turned, so its vertices are in new places on the page.', show: 'oops' },
        { say: 'Always use the order of the letters in the statement. P is the first letter, so it matches X, the first letter of X Z Y.', focus: ['wo.p-nP', 'wo.q-nX'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Quadrilateral $ABCD \\cong$ quadrilateral $KNML$. Which side corresponds to $BC$?',
          choices: ['$KN$', '$ML$', '$LK$', '$NM$'],
          answer: 3,
          working: 'Match in order: $A \\leftrightarrow K$, $B \\leftrightarrow N$, $C \\leftrightarrow M$, $D \\leftrightarrow L$. $BC$ joins $B$ and $C$, which match $N$ and $M$, so $BC$ corresponds to $NM$.',
        },
      ],
      lines: [
        { say: 'Your turn. Quadrilateral A B C D is congruent to quadrilateral K N M L. Which side corresponds to side B C? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: N M. Vertex B is the second letter, and it matches N, the second letter of K N M L. Vertex C is third, and it matches M. Choice A, K N, corresponds to side A B, the first two letters.', show: 'q.answer' },
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
            'A congruence statement such as $\\triangle ABC \\cong \\triangle DEF$ lists the vertices in matching order.',
            'Matching letters give matching angles. Matching pairs of letters give matching sides.',
            'Use the order of the letters, not the picture.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A statement of congruence lists the vertices in matching order: first with first, second with second, and so on.', show: 'sum.0' },
        { say: 'Matching letters give the matching angles, and matching pairs of letters give the matching sides.', show: 'sum.1' },
        { say: 'And always use the order of the letters, not where the vertices sit in the picture. In the next part, you will use matching parts to find missing measures. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
