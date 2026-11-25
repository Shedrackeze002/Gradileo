import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 2.3 (angles in polygons). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 10.4, Polygons, Perimeter, and
// Circumference, CC BY-NC-SA 4.0): a regular pentagon's interior angles add to
// (5 − 2) × 180° = 540°, and each one is 540° ÷ 5 = 108°.

const R = 5;
/** The corners of the regular pentagon, anticlockwise from the bottom left, with a flat bottom. */
const corners: [number, number][] = [234, 306, 18, 90, 162].map((d) => [R * Math.cos((d * Math.PI) / 180), R * Math.sin((d * Math.PI) / 180)]);

/**
 * The regular pentagon: its sides (`shape`), the two diagonals from the top corner that cut it into
 * three triangles (`diag`, with the triangles `t0` to `t2` shaded), and its five interior angles
 * (`a0` to `a4`, a group `angles`) labelled `angle`.
 */
function pentagon(angle?: string): Part {
  const points = Object.fromEntries(corners.map((p, i) => [`P${i}`, p] as [string, [number, number]]));
  const items: DiagramItem[] = [
    { kind: 'region', id: 't0', points: ['P3', 'P4', 'P0'], tone: 'brand', shade: 0.18 },
    { kind: 'region', id: 't1', points: ['P3', 'P0', 'P1'], tone: 'good', shade: 0.18 },
    { kind: 'region', id: 't2', points: ['P3', 'P1', 'P2'], tone: 'brand', shade: 0.18 },
    ...corners.map((_, i): DiagramItem => ({ kind: 'line', id: `s${i}`, from: `P${i}`, to: `P${(i + 1) % 5}`, group: 'shape' })),
    { kind: 'line', id: 'd0', from: 'P3', to: 'P0', tone: 'adj', dashed: true, group: 'diag' },
    { kind: 'line', id: 'd1', from: 'P3', to: 'P1', tone: 'adj', dashed: true, group: 'diag' },
    ...corners.map((_, i): DiagramItem => ({ kind: 'angle', id: `a${i}`, at: `P${i}`, from: `P${(i + 4) % 5}`, to: `P${(i + 1) % 5}`, r: 30, ...(angle ? { label: angle } : {}), group: 'angles' })),
  ];
  return { points, items };
}

const QUESTION = 'Find the measure of each interior angle of a regular pentagon and then find the sum of the interior angles.';

const video: Explainer = {
  id: 'xq-m202-2-3',
  lessonId: '',
  exam: {
    lesson: 'm202-2-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.4, Polygons, Perimeter, and Circumference',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-4-polygons-perimeter-and-circumference',
    question: QUESTION,
  },
  title: 'Exam Question: The Interior Angles of a Regular Pentagon (Angles in Polygons)',
  thumbnailTitle: 'Angles of a Pentagon',
  thumbnail: 'pg',
  summary:
    'A real test question, solved one small step at a time: find each interior angle of a regular pentagon, and the sum of its interior angles. We cut the pentagon into three triangles to see why the sum is (5 − 2) × 180° = 540°, then share it equally among the five angles to get 108° each. Then we check with the exterior angles and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Angles of a Pentagon', subtitle: 'Angles in polygons, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the angles in a polygon. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'each $108^\\circ$; sum $540^\\circ$', working: 'Sum $= (5 - 2) \\times 180^\\circ = 540^\\circ$, and each $= 540^\\circ \\div 5 = 108^\\circ$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find the measure of each interior angle of a regular pentagon, and then find the sum of the interior angles.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pg', [pentagon()], 380)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A **regular** pentagon has $5$ equal sides and $5$ equal angles. Find **one** angle, and the **total** of all five.' }],
      lines: [
        { say: 'A pentagon has five sides. Regular means all its sides are equal, and all its angles are equal too.', show: 'pg.shape' },
        { say: 'The interior angles are the five angles inside the corners. We need the size of one of them, and the total of all five.', show: ['pg.angles', 't'], focus: 'pg.angles' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sum', tone: 'key', title: 'The interior angle sum', md: 'A polygon with $n$ sides has interior angles that add to $S = (n - 2) \\times 180^\\circ$.' },
        { kind: 'callout', id: 'each', tone: 'definition', title: 'A regular polygon', md: 'All the angles are equal, so each one is the sum shared equally: $S \\div n$.' },
      ],
      lines: [
        { say: 'Here is what we need. The interior angles of a polygon with n sides add to n minus 2, times 180 degrees.', show: 'sum' },
        { say: 'And in a regular polygon the angles are all equal, so each one is the sum divided by n.', show: 'each' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the sides: $n = 5$', 'Find the **sum** of the angles', '**Share** it equally among the $5$ angles'] }],
      lines: [
        { say: 'Here is the plan. First, count the sides: n is 5.', show: 'plan.0' },
        { say: 'Second, find the sum of the interior angles.', show: 'plan.1' },
        { say: 'Third, share the sum equally among the five angles. The question asks for each angle first, but the sum is the quick way to get it.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The sum of the angles',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pg', [pentagon()], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['3 \\text{ triangles} \\times 180^\\circ', 'S = (5 - 2) \\times 180^\\circ', 'S = \\good{540^\\circ}'] }],
      lines: [
        { say: 'Step one. Here is the pentagon. From the top corner, draw the two diagonals.', show: ['pg.shape', 'pg.diag'], focus: 'pg.diag' },
        { say: 'They cut the pentagon into three triangles. The angles of the three triangles make up exactly the angles of the pentagon. Each triangle has 180 degrees, so the pentagon has 3 times 180.', show: ['pg.t0', 'pg.t1', 'pg.t2', 'm.0'] },
        { say: 'That is the formula: 5 sides minus 2 gives 3 triangles, times 180 degrees.', show: 'm.1' },
        { say: '3 times 180 is 540. The interior angles add to 540 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Each angle',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pg', [pentagon('108^\\circ')], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{each} = 540^\\circ \\div 5', '\\text{each} = \\good{108^\\circ}'] }],
      lines: [
        { say: 'Step two. The pentagon is regular, so its five angles are equal. Share 540 degrees equally among them.', show: ['pg.shape', 'm.0'] },
        { say: '540 divided by 5 is 108. Each interior angle is 108 degrees.', show: ['m.1', 'pg.angles'], focus: 'm.1' },
        { say: 'So the answers are: each interior angle is 108 degrees, and the sum is 540 degrees.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{exterior} = 180^\\circ - 108^\\circ = 72^\\circ', '5 \\times 72^\\circ = 360^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the exterior angles. Each exterior angle makes a straight line with an interior angle, so it is 180 minus 108, which is 72 degrees.', show: 'm.0' },
        { say: 'The exterior angles of any polygon add to 360 degrees, and 5 times 72 is 360. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$5 \\times 180^\\circ = 900^\\circ$', 'forgets the $-2$: only **3** triangles fit'],
            ['$360^\\circ \\div 5 = 72^\\circ$', 'that is the **exterior** angle'],
            ['only one answer', 'the question asks for **each** angle **and** the sum'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Five times 180 is 900, which is too big. You can only fit three triangles in a pentagon, so use 5 minus 2.' },
        { say: '360 divided by 5 is 72, but that is the exterior angle, not the interior one.' },
        { say: 'And give both answers. The question asks for each angle, and the sum.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the measure of each interior angle of a regular hexagon?',
          choices: ['$720^\\circ$', '$120^\\circ$', '$60^\\circ$', '$135^\\circ$'],
          answer: 1,
          working: '$S = (6 - 2) \\times 180^\\circ = 720^\\circ$, and $720^\\circ \\div 6 = 120^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the measure of each interior angle of a regular hexagon? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A hexagon has 6 sides. The sum is 6 minus 2, which is 4, times 180, which is 720 degrees. Each angle is 720 divided by 6, which is 120 degrees: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sum of interior angles: $(n - 2) \\times 180^\\circ$', 'It counts the **triangles** inside', 'Regular: each angle $=$ sum $\\div n$', 'Check: exterior angles add to $360^\\circ$'] }],
      lines: [
        { say: 'Here is what to remember. The interior angles of a polygon add to n minus 2, times 180 degrees.', show: 'sum.0' },
        { say: 'n minus 2 counts the triangles you can cut it into.', show: 'sum.1' },
        { say: 'In a regular polygon, each angle is the sum divided by n.', show: 'sum.2' },
        { say: 'And you can check with the exterior angles, which add to 360 degrees. For more on angles in polygons, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
