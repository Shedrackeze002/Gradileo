import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 3.2 (interior and exterior angles of polygons). The question is
// a "Your Turn" from OpenStax Contemporary Mathematics, word for word (section 10.4, Polygons,
// Perimeter, and Circumference, CC BY-NC-SA 4.0). Diagonals from one corner split a pentagon into
// 5 − 2 = 3 triangles, so the interior angles add to 3 × 180° = 540°, and each of the five equal
// angles of the regular pentagon is 540° / 5 = 108°, as in the book's answer.

const rad = (d: number) => (d * Math.PI) / 180;
const V: Record<string, [number, number]> = {};
for (let k = 0; k < 5; k++) V[`V${k}`] = [3 * Math.cos(rad(90 + 72 * k)), 3 * Math.sin(rad(90 + 72 * k))];

/** A regular pentagon, its diagonals from the top corner, and the angle marks when `angles`. */
const pent = (o: { diag?: boolean; angles?: boolean } = {}, height = 440): DiagramEl => {
  const items: DiagramItem[] = [{ kind: 'region', id: 'shape', points: ['V0', 'V1', 'V2', 'V3', 'V4'], tone: 'brand', shade: 0.12 }];
  for (let k = 0; k < 5; k++) items.push({ kind: 'line', id: `s${k}`, from: `V${k}`, to: `V${(k + 1) % 5}`, tone: 'ink', weight: 4, group: 'edge' });
  if (o.diag) {
    items.push(
      { kind: 'region', id: 't1', points: ['V0', 'V1', 'V2'], tone: 'theta', shade: 0.22, group: 'tri' },
      { kind: 'region', id: 't2', points: ['V0', 'V2', 'V3'], tone: 'opp', shade: 0.22, group: 'tri' },
      { kind: 'region', id: 't3', points: ['V0', 'V3', 'V4'], tone: 'adj', shade: 0.22, group: 'tri' },
      { kind: 'line', id: 'd1', from: 'V0', to: 'V2', tone: 'muted', dashed: true, group: 'tri' },
      { kind: 'line', id: 'd2', from: 'V0', to: 'V3', tone: 'muted', dashed: true, group: 'tri' },
    );
  }
  if (o.angles) {
    for (let k = 0; k < 5; k++) {
      items.push({ kind: 'angle', id: `a${k}`, at: `V${k}`, from: `V${(k + 4) % 5}`, to: `V${(k + 1) % 5}`, tone: 'good', label: '108^\\circ', r: 30, labelDist: 62, group: 'ang' });
    }
  }
  return { kind: 'diagram', id: 'd', height, points: V, items };
};

const QUESTION = 'Find the measure of each interior angle of a regular pentagon and then find the sum of the interior angles.';

const video: Explainer = {
  id: 'xq-m303-3-2',
  lessonId: '',
  exam: {
    lesson: 'm303-3-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.4, Polygons, Perimeter, and Circumference',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-4-polygons-perimeter-and-circumference',
    question: QUESTION,
  },
  title: 'Exam Question: The Angles of a Regular Pentagon (Interior and Exterior Angles)',
  thumbnailTitle: 'The Angles of a Pentagon',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: find each interior angle of a regular pentagon, and the sum of its interior angles. Diagonals from one corner cut the pentagon into 3 triangles, so the angles add to 3 × 180° = 540°. The five angles are equal, so each is 540° ÷ 5 = 108°. Then we check with the exterior angles and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Angles of a Pentagon', subtitle: 'Interior and exterior angles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the angles of a polygon. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: 'Each angle $108^\\circ$; sum $540^\\circ$',
          working: '$(5 - 2) \\times 180^\\circ = 540^\\circ$, and $540^\\circ \\div 5 = 108^\\circ$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Find the measure of each interior angle of a regular pentagon and then find the sum of the interior angles.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [pent()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A **regular** pentagon has $5$ equal sides and $5$ **equal** angles. We want one angle, and all five added up.' }],
      lines: [
        { say: 'Here is a regular pentagon. Regular means all five sides are equal, and all five angles are equal too.', show: ['d.shape', 'd.edge'] },
        { say: 'We want the size of one inside angle, and the total of all five.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['S = (n - 2) \\times 180^\\circ'] },
        { kind: 'callout', id: 'why', tone: 'key', title: 'Why n − 2?', md: 'Diagonals from **one** corner cut a polygon with $n$ sides into $n - 2$ triangles, each with $180^\\circ$.' },
      ],
      lines: [
        { say: 'Here is what we need. The interior angles of a polygon with n sides add to n minus 2, times 180 degrees.', show: 'f' },
        { say: 'That is because diagonals from one corner cut the polygon into n minus 2 triangles, and each triangle\'s angles add to 180 degrees.', show: 'why' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Cut the pentagon into **triangles**', 'Find the **sum** of the angles', '**Share** the sum among the $5$ equal angles'] }],
      lines: [
        { say: 'Here is the plan. First, cut the pentagon into triangles.', show: 'plan.0' },
        { say: 'Second, find the sum of the interior angles.', show: 'plan.1' },
        { say: 'Third, share that sum equally among the five angles.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Triangles',
      layout: 'split',
      leftWidth: 560,
      left: [pent({ diag: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['n = 5', '5 - 2 = \\good{3 \\text{ triangles}}'] }],
      lines: [
        { say: 'Step one. A pentagon has 5 sides, so n is 5.', show: ['d.shape', 'd.edge', 'm.0'] },
        { say: 'Draw the diagonals from the top corner. They cut the pentagon into 5 minus 2, which is 3 triangles.', show: ['d.tri', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The sum',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['S = (5 - 2) \\times 180^\\circ', '= 3 \\times 180^\\circ = \\good{540^\\circ}'] }],
      lines: [
        { say: 'Step two. The angles of the 3 triangles make up the angles of the pentagon.', show: 'm.0' },
        { say: 'So the sum is 3 times 180, which is 540 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Each angle',
      layout: 'split',
      leftWidth: 560,
      left: [pent({ angles: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{540^\\circ}{5} = \\good{108^\\circ}'] }],
      lines: [
        { say: 'Step three. The pentagon is regular, so its five angles are equal. Share 540 degrees among them: 540 divided by 5 is 108 degrees.', show: ['d.shape', 'd.edge', 'm.0'] },
        { say: 'So each interior angle is 108 degrees, and the five add to 540 degrees.', show: 'd.ang', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{exterior angle} = 180^\\circ - 108^\\circ = 72^\\circ', '5 \\times 72^\\circ = 360^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the exterior angles. Each exterior angle is 180 minus 108, which is 72 degrees.', show: 'm.0' },
        { say: 'Walking once around any polygon turns you through 360 degrees, and 5 times 72 is 360. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$5 \\times 180^\\circ = 900^\\circ$', 'a pentagon makes $n - 2 = 3$ triangles, not $5$'],
            ['$\\dfrac{360^\\circ}{5} = 72^\\circ$', 'that is the **exterior** angle'],
            ['each angle $540^\\circ$', '$540^\\circ$ is the **sum**: divide by $5$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Five times 180 counts five triangles, but the diagonals make only three.' },
        { say: '360 divided by 5, which is 72 degrees, is the exterior angle, not the interior one.' },
        { say: 'And 540 degrees is the sum of all five angles. Divide by 5 for each one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A stop sign is a regular octagon, with $8$ sides. What is the measure of each interior angle?',
          choices: ['$108^\\circ$', '$1{,}080^\\circ$', '$45^\\circ$', '$135^\\circ$'],
          answer: 3,
          working: '$(8 - 2) \\times 180^\\circ = 1{,}080^\\circ$, and $1{,}080^\\circ \\div 8 = 135^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A stop sign is a regular octagon, with 8 sides. What is the measure of each interior angle? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '8 minus 2 is 6 triangles, so the sum is 6 times 180, which is 1,080 degrees. Divided by 8, each angle is 135 degrees: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$n$ sides: $n - 2$ triangles', 'Sum of interior angles: $(n - 2) \\times 180^\\circ$', 'Regular: each angle is the sum $\\div\\ n$', 'Check: the exterior angles add to $360^\\circ$'] }],
      lines: [
        { say: 'Here is what to remember. A polygon with n sides splits into n minus 2 triangles.', show: 'sum.0' },
        { say: 'So its interior angles add to n minus 2, times 180 degrees.', show: 'sum.1' },
        { say: 'In a regular polygon, each angle is that sum divided by n.', show: 'sum.2' },
        { say: 'And the exterior angles always add to 360 degrees. For more on the angles of polygons, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
