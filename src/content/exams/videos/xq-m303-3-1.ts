import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 30-3 lesson 3.1 (angles in triangles and quadrilaterals). The question is a
// "Your Turn" from OpenStax Contemporary Mathematics, word for word (section 10.3, Triangles,
// CC BY-NC-SA 4.0). The triangle's angles are x°, (x + 1)° and (x − 19)°, so 3x − 18 = 180,
// x = 66, and the angles are 66°, 67° and 47°, as in the book's answer. The video draws the
// triangle to scale with those angles.

const rad = (d: number) => (d * Math.PI) / 180;
const AC = (6 * Math.sin(rad(47))) / Math.sin(rad(67));

/** The triangle: x° at A, (x − 19)° at B, (x + 1)° at C; with `solved`, the angles in degrees. */
const tri = (solved = false, height = 420): DiagramEl => ({
  kind: 'diagram',
  id: 'd',
  height,
  points: { A: [0, 0], B: [6, 0], C: [AC * Math.cos(rad(66)), AC * Math.sin(rad(66))] },
  items: [
    { kind: 'region', id: 'shape', points: ['A', 'B', 'C'], tone: 'brand', shade: 0.12 },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'ink', weight: 4 },
    { kind: 'line', id: 'bc', from: 'B', to: 'C', tone: 'ink', weight: 4 },
    { kind: 'line', id: 'ca', from: 'C', to: 'A', tone: 'ink', weight: 4 },
    { kind: 'angle', id: 'a', at: 'A', from: 'B', to: 'C', tone: 'theta', label: solved ? '66^\\circ' : 'x^\\circ', r: 40, labelDist: 80 },
    { kind: 'angle', id: 'c', at: 'C', from: 'A', to: 'B', tone: 'opp', label: solved ? '67^\\circ' : '(x + 1)^\\circ', r: 40, labelDist: 95 },
    { kind: 'angle', id: 'b', at: 'B', from: 'C', to: 'A', tone: 'hyp', label: solved ? '47^\\circ' : '(x - 19)^\\circ', r: 40, labelDist: 110 },
  ],
});

const QUESTION = 'Find the measures of each angle in the triangle shown.';

const video: Explainer = {
  id: 'xq-m303-3-1',
  lessonId: '',
  exam: {
    lesson: 'm303-3-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.3, Triangles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles',
    question: `${QUESTION} [A triangle with its angles marked x°, (x + 1)° and (x − 19)°.]`,
  },
  title: 'Exam Question: Three Angles Written With x (Angles in Triangles)',
  thumbnailTitle: 'Find Every Angle',
  thumbnail: 'd',
  summary:
    'A real test question, solved one small step at a time: a triangle has angles x°, (x + 1)° and (x − 19)°. Find the measure of each angle. The angles of a triangle add to 180°, so 3x − 18 = 180 and x = 66. Then we put x back in: 66°, 67° and 47°. We check that they add to 180° and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find Every Angle', subtitle: 'Angles in triangles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the angles in a triangle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: `${QUESTION} (Triangle on the next screen.)`,
          answer: '$66^\\circ$, $67^\\circ$ and $47^\\circ$',
          working: '$x + (x + 1) + (x - 19) = 180$, so $x = 66$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'Find the measures of each angle in the triangle shown.' },
      ],
    },
    {
      chapter: 'The triangle',
      layout: 'split',
      leftWidth: 620,
      left: [tri()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'One angle is $x^\\circ$. The others are **one more** than $x$, and **19 less** than $x$.' }],
      lines: [
        { say: 'Here is the triangle. One angle is x degrees.', show: ['d.shape', 'd.ab', 'd.bc', 'd.ca', 'd.a'], focus: 'd.a' },
        { say: 'Another is x plus 1 degrees, one more than x.', show: 'd.c', focus: 'd.c' },
        { say: 'And the third is x minus 19 degrees, 19 less than x.', show: ['d.b', 't'], focus: 'd.b' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'sum', tone: 'key', title: 'Angles in a triangle', md: 'The three angles of **any** triangle add to $180^\\circ$.' }],
      lines: [
        { say: 'Here is what we need. The three angles of any triangle add to 180 degrees.', show: 'sum' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** the three angles and set the sum to $180$', '**Solve** for $x$', 'Put $x$ back in to get **each** angle'] }],
      lines: [
        { say: 'Here is the plan. First, add the three angles, and set the sum equal to 180.', show: 'plan.0' },
        { say: 'Second, solve that equation for x.', show: 'plan.1' },
        { say: 'Third, put x back into each label, to get each angle.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Add to 180',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + (x + 1) + (x - 19) = 180'] }],
      lines: [
        { say: 'Step one. x, plus x plus 1, plus x minus 19, equals 180.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Solve for x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x + 1 - 19 = 180', '3x - 18 = 180', '3x = 198', '\\good{x = 66}'] }],
      lines: [
        { say: 'Step two. Collect the x terms: there are three of them, so 3x. Then the numbers: plus 1, minus 19.', show: 'm.0' },
        { say: '1 minus 19 is negative 18, so 3x minus 18 equals 180.', show: 'm.1' },
        { say: 'Add 18 to both sides: 3x equals 198.', show: 'm.2' },
        { say: 'Divide by 3: x equals 66.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Each angle',
      layout: 'split',
      leftWidth: 620,
      left: [tri(true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = \\good{66^\\circ}', 'x + 1 = \\good{67^\\circ}', 'x - 19 = \\good{47^\\circ}'] }],
      lines: [
        { say: 'Step three. The question wants each angle, so put 66 back in. The first angle is 66 degrees.', show: ['d.shape', 'd.ab', 'd.bc', 'd.ca', 'd.a', 'm.0'], focus: 'd.a' },
        { say: 'The second is 66 plus 1, which is 67 degrees.', show: ['d.c', 'm.1'], focus: 'd.c' },
        { say: 'And the third is 66 minus 19, which is 47 degrees.', show: ['d.b', 'm.2'], focus: 'd.b' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['66^\\circ + 67^\\circ + 47^\\circ = 180^\\circ \\ \\checkmark', '67 = 66 + 1, \\quad 47 = 66 - 19 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 66 plus 67 plus 47 is 180 degrees.', show: 'm.0' },
        { say: 'And the angles fit the labels: 67 is one more than 66, and 47 is 19 less. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['answering only $x = 66$', 'the question asks for **each** angle'],
            ['$3x + 18 = 180$', '$1 - 19$ is **negative** $18$'],
            ['setting the sum to $360$', 'that is a **quadrilateral**: a triangle is $180^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x equals 66 is not the end. The question asks for each angle, so put x back in.' },
        { say: '1 minus 19 is negative 18, not positive 18.' },
        { say: 'And the angles of a quadrilateral add to 360 degrees, but a triangle\'s add to 180.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The angles of a triangle are $x^\\circ$, $2x^\\circ$ and $3x^\\circ$. What is the largest angle?',
          choices: ['$30^\\circ$', '$60^\\circ$', '$90^\\circ$', '$120^\\circ$'],
          answer: 2,
          working: '$x + 2x + 3x = 180$, so $6x = 180$ and $x = 30$. The largest is $3x = 90^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. The angles of a triangle are x, 2x and 3x degrees. What is the largest angle? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'x plus 2x plus 3x is 6x, which equals 180, so x is 30. The largest angle is 3x, which is 90 degrees: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A triangle\'s angles add to $180^\\circ$', 'Add the labels and **solve** for $x$', 'Put $x$ back in for **each** angle', 'Check: the angles add to $180^\\circ$'] }],
      lines: [
        { say: 'Here is what to remember. A triangle\'s angles add to 180 degrees.', show: 'sum.0' },
        { say: 'Add the labels, set them equal to 180, and solve for x.', show: 'sum.1' },
        { say: 'Put x back in, to get each angle.', show: 'sum.2' },
        { say: 'And check that the angles add to 180. For more on angles in triangles and quadrilaterals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
