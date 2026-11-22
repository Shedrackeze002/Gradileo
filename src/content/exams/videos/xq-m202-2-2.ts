import type { Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 2.2 (angles in triangles). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 10.3, Triangles, CC BY-NC-SA 4.0), with
// the book's figure description in brackets: the angles x°, (x + 1)° and (x − 19)° add to 180°,
// so 3x − 18 = 180, x = 66, and the angles are 66°, 67° and 47°.

/** The triangle drawn with its true angles: 66° at A, 67° at B and 47° at C, labels set well inside the corners. */
const tri = (height = 480, values = false) => {
  const t = triangle({
    A: [0, 0],
    B: [12, 0],
    C: [6.144, 13.798],
    angles: values ? { A: '66^\\circ', B: '67^\\circ', C: '47^\\circ' } : { A: 'x^\\circ', B: '(x + 1)^\\circ', C: '(x - 19)^\\circ' },
  });
  const dist: Record<string, number> = { aA: 105, aB: 135, aC: 175 };
  return figure('tri', [{ ...t, items: t.items.map((it) => (it.kind === 'angle' && dist[it.id] ? { ...it, labelDist: dist[it.id] } : it)) }], height);
};

const QUESTION =
  'Find the measures of each angle in the triangle shown. [A triangle with its angles marked x degrees, (x plus 1) degrees, and (x minus 19) degrees.]';

const video: Explainer = {
  id: 'xq-m202-2-2',
  lessonId: '',
  exam: {
    lesson: 'm202-2-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.3, Triangles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-3-triangles',
    question: QUESTION,
  },
  title: 'Exam Question: Find the Angles x, x + 1 and x − 19 in a Triangle (Angles in Triangles)',
  thumbnailTitle: 'Find Each Angle',
  thumbnail: 'tri',
  summary:
    'A real test question, solved one small step at a time: a triangle has angles x°, (x + 1)° and (x − 19)°. Find each angle. We use the fact that the angles of a triangle add to 180°, solve 3x − 18 = 180 to get x = 66, and find the angles 66°, 67° and 47°. Then we check that they add to 180° and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find Each Angle', subtitle: 'Angles in triangles, step by step' }],
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
          prompt: 'Find the measures of each angle in the triangle shown. [A triangle with its angles marked $x^\\circ$, $(x + 1)^\\circ$ and $(x - 19)^\\circ$.]',
          answer: '$66^\\circ$, $67^\\circ$ and $47^\\circ$',
          working: '$x + (x + 1) + (x - 19) = 180$, so $3x - 18 = 180$ and $x = 66$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A triangle has its angles marked x degrees, x plus 1 degrees, and x minus 19 degrees. Find the measures of each angle in the triangle shown.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [tri()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Each angle is written with the **same unknown**, $x$. Find $x$, then find **all three** angles.' }],
      lines: [
        { say: 'Here is the triangle. Each angle is written using the same unknown, x.', show: ['tri.shape', 'tri.aA', 'tri.aB', 'tri.aC'] },
        { say: 'So we need to find x first, and then use it to find all three angles.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'sum', tone: 'key', title: 'The angle sum of a triangle', md: 'The three interior angles of **any** triangle add to $180^\\circ$.' }],
      lines: [{ say: 'Here is the one fact we need. The three angles inside any triangle add up to 180 degrees.', show: 'sum' }],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Add the angles and set the sum to $180$', '**Solve** for $x$', '**Substitute** to find each angle'] }],
      lines: [
        { say: 'Here is the plan. First, add the three angles and set the sum equal to 180.', show: 'plan.0' },
        { say: 'Second, solve that equation for x.', show: 'plan.1' },
        { say: 'Third, substitute x back in to find each angle.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Write the equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + (x + 1) + (x - 19) = 180'] }],
      lines: [
        { say: 'Step one. The three angles add to 180 degrees.', show: 'm.0' },
        { say: 'So x, plus x plus 1, plus x minus 19, equals 180.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Solve for x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x + 1 - 19 = 180', '3x - 18 = 180', '3x = 198', 'x = \\good{66}'] }],
      lines: [
        { say: 'Step two. Collect the x terms: x plus x plus x is 3 x.', show: 'm.0' },
        { say: 'Collect the numbers: plus 1, minus 19, is minus 18. So 3 x minus 18 equals 180.', show: 'm.1' },
        { say: 'Add 18 to both sides: 3 x equals 198.', show: 'm.2' },
        { say: 'Divide both sides by 3: x equals 66.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Find each angle',
      layout: 'split',
      leftWidth: 560,
      left: [tri(480, true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = \\good{66^\\circ}', 'x + 1 = \\good{67^\\circ}', 'x - 19 = \\good{47^\\circ}'] }],
      lines: [
        { say: 'Step three. Substitute 66 for x. The first angle is x, which is 66 degrees.', show: ['m.0', 'tri.shape', 'tri.aA'], focus: 'tri.aA' },
        { say: 'The second is x plus 1, which is 67 degrees.', show: ['m.1', 'tri.aB'], focus: 'tri.aB' },
        { say: 'And the third is x minus 19: 66 minus 19 is 47 degrees.', show: ['m.2', 'tri.aC'], focus: 'tri.aC' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['66^\\circ + 67^\\circ + 47^\\circ = 180^\\circ \\ \\checkmark'] }, { kind: 'text', id: 't', size: 'md', md: 'All three angles are **positive**, so the triangle can exist.' }],
      lines: [
        { say: 'Let us check. 66 plus 67 is 133, and 133 plus 47 is 180. The angles add to 180 degrees.', show: 'm.0' },
        { say: 'And all three angles are positive, so this triangle really can exist.', show: 't' },
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
            ['stopping at $x = 66$', 'the question asks for **each angle**'],
            ['$3x + 18 = 180$', '$+1 - 19$ is $\\bad{-18}$, not $+18$'],
            ['$x - 19 = 85$', 'that **adds** 19; subtract it: $47^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not stop at x equals 66. The question asks for each of the three angles.' },
        { say: 'Take care with the signs. Plus 1 minus 19 is minus 18, not plus 18.' },
        { say: 'And x minus 19 means subtract 19 from 66, which gives 47, not 85.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The angles of a triangle are $2x^\\circ$, $3x^\\circ$ and $4x^\\circ$. What is the largest angle?',
          choices: ['$80^\\circ$', '$60^\\circ$', '$40^\\circ$', '$20^\\circ$'],
          answer: 0,
          working: '$2x + 3x + 4x = 180$, so $9x = 180$ and $x = 20$. The largest is $4x = 80^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. The angles of a triangle are 2 x, 3 x and 4 x degrees. What is the largest angle? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '2 x plus 3 x plus 4 x is 9 x, and 9 x equals 180, so x is 20. The largest angle is 4 x, which is 80 degrees: choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The angles of a triangle add to $180^\\circ$', 'Set the **sum** of the expressions to $180$', '**Solve** for $x$, minding the signs', '**Substitute** to find every angle'] }],
      lines: [
        { say: 'Here is what to remember. The angles of a triangle add to 180 degrees.', show: 'sum.0' },
        { say: 'Set the sum of the angle expressions equal to 180.', show: 'sum.1' },
        { say: 'Solve for x, and mind the signs.', show: 'sum.2' },
        { say: 'Then substitute to find every angle. For more on angles in triangles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
