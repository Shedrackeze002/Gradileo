import type { Explainer } from '@/video/script.ts';
import { transversal } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 6.3 (parallel lines and transversals). The question is a Your
// Turn from OpenStax Contemporary Mathematics, word for word (section 10.2, Angles, CC BY-NC-SA
// 4.0), with the book's figure redrawn from its description: parallel lines l1 and l2 cut by a
// transversal, angles 1 to 4 at l1 and 5 to 8 at l2, with 1 and 5 corresponding (1 above left,
// 2 above right, 3 below left, 4 below right, and the same for 5 to 8). ∠5 corresponds to ∠1, ∠4
// is vertical to ∠1 and ∠8 is vertical to ∠5, so all three are 120°, as in the book's answer.
// Check: ∠2 = 180° − 120° = 60°, and ∠4 + ∠2 = 180°.

const QUESTION =
  'In the given figure if m∡1 = 120°, find the m∡5, m∡4, and m∡8. [The figure: two parallel lines, l1 and l2, are cut by a transversal. It makes angles 1, 2, 3 and 4 with l1 and angles 5, 6, 7 and 8 with l2, numbered in the same order at each line: 1 above left, 2 above right, 3 below left, 4 below right.]';

const fig = (height = 440) => figure('tv', [transversal({ deg: 60, gap: 3.2, len: 7, names: ['l_1', 'l_2', 't'], labels: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8' } })], height);
const all = ['tv.lines', 'tv.marks', 'tv.a1', 'tv.a2', 'tv.a3', 'tv.a4', 'tv.a5', 'tv.a6', 'tv.a7', 'tv.a8'];

const video: Explainer = {
  id: 'xq-m103-6-3',
  lessonId: '',
  exam: {
    lesson: 'm103-6-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.2, Angles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-2-angles',
    question: QUESTION,
  },
  title: 'Exam Question: Angles Made by a Transversal (Parallel Lines)',
  thumbnailTitle: 'Parallel Lines: Find Angles 5, 4 and 8',
  thumbnail: 'tv',
  summary:
    'A real test question, solved one small step at a time: two parallel lines are cut by a transversal, making angles 1 to 8, and angle 1 is 120°. Find angles 5, 4 and 8. Angle 5 corresponds to angle 1, so it is 120°. Angle 4 is vertical to angle 1, and angle 8 is vertical to angle 5, so both are 120° too. Then we check with supplementary angles and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Parallel Lines: Find Angles 5, 4 and 8', subtitle: 'Parallel lines and transversals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about parallel lines and a transversal. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 600,
      left: [fig()],
      right: [{ kind: 'text', id: 'q', size: 'lg', md: '**The question:** In the given figure if $m\\measuredangle 1 = 120^\\circ$, find the $m\\measuredangle 5$, $m\\measuredangle 4$, and $m\\measuredangle 8$.' }],
      lines: [
        { say: 'Here is the question, from the book. We have redrawn its figure.', show: [...all, 'q'] },
        { say: 'Two parallel lines, l 1 and l 2, are cut by a third line, called a transversal. Angle 1 is 120 degrees. Find angles 5, 4 and 8.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [fig()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Angles $1$ to $4$ are where $t$ crosses $l_1$. Angles $5$ to $8$ are where it crosses $l_2$, in the **same order**. The arrows show the lines are **parallel**.' }],
      lines: [
        { say: 'Here are the two lines. The arrows on them show they are parallel.', show: ['tv.lines', 'tv.marks'] },
        { say: 'Angles 1 to 4 are where the transversal crosses l 1.', show: ['tv.a1', 'tv.a2', 'tv.a3', 'tv.a4'] },
        { say: 'Angles 5 to 8 are where it crosses l 2, numbered in the same order: above left, above right, below left, below right.', show: ['tv.a5', 'tv.a6', 'tv.a7', 'tv.a8', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Corresponding angles', md: 'Angles in the **same position** at each crossing. When the lines are **parallel**, they are **equal**.' },
        { kind: 'callout', id: 'v', tone: 'definition', title: 'Vertical angles', md: 'Angles **opposite** each other at one crossing. They are always **equal**.' },
      ],
      lines: [
        { say: 'Here is what we need. Corresponding angles are in the same position at each crossing. When the lines are parallel, corresponding angles are equal.', show: 'c' },
        { say: 'Vertical angles are opposite each other at one crossing, and they are always equal.', show: 'v' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Angle 5: **corresponding** to angle 1', 'Angle 4: **vertical** to angle 1', 'Angle 8: **vertical** to angle 5'] }],
      lines: [
        { say: 'Here is the plan. Angle 5 corresponds to angle 1.', show: 'plan.0' },
        { say: 'Angle 4 is vertical to angle 1.', show: 'plan.1' },
        { say: 'And angle 8 is vertical to angle 5.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Angle 5',
      layout: 'split',
      leftWidth: 600,
      left: [fig()],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m\\measuredangle 5 = m\\measuredangle 1 = \\good{120^\\circ}'] }],
      lines: [
        { say: 'Step one. Angle 1 is above and to the left of the top crossing. Angle 5 is above and to the left of the bottom crossing. They are in the same position, so they are corresponding angles.', show: ['tv.lines', 'tv.marks', 'tv.a1', 'tv.a5'] },
        { say: 'The lines are parallel, so corresponding angles are equal. Angle 5 is 120 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Angle 4',
      layout: 'split',
      leftWidth: 600,
      left: [fig()],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m\\measuredangle 4 = m\\measuredangle 1 = \\good{120^\\circ}'] }],
      lines: [
        { say: 'Step two. Angle 4 is opposite angle 1 at the top crossing, so they are vertical angles.', show: ['tv.lines', 'tv.marks', 'tv.a1', 'tv.a4'] },
        { say: 'Vertical angles are equal, so angle 4 is 120 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Angle 8',
      layout: 'split',
      leftWidth: 600,
      left: [fig()],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m\\measuredangle 8 = m\\measuredangle 5 = \\good{120^\\circ}'] }],
      lines: [
        { say: 'Step three. Angle 8 is opposite angle 5 at the bottom crossing, so they are vertical angles.', show: ['tv.lines', 'tv.marks', 'tv.a5', 'tv.a8'] },
        { say: 'So angle 8 is also 120 degrees. All three angles are 120 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m\\measuredangle 2 = 180^\\circ - 120^\\circ = 60^\\circ', 'm\\measuredangle 4 + m\\measuredangle 2 = 120^\\circ + 60^\\circ = 180^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Angles 1 and 2 sit on a straight line, so angle 2 is 180 minus 120, which is 60 degrees.', show: 'm.0' },
        { say: 'Angles 4 and 2 also sit on a straight line, so they should make 180 degrees. 120 plus 60 is 180. It checks out. In fact, every wide angle in the figure is 120 degrees, and every narrow one is 60 degrees.', show: 'm.1', focus: 'm.1' },
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
            ['$m\\measuredangle 5 = 60^\\circ$', 'corresponding angles are **equal**, not supplementary'],
            ['$m\\measuredangle 4 = 60^\\circ$', 'angle 4 is **opposite** angle 1, not next to it'],
            ['lines **not** parallel', 'then corresponding angles are **not** equal'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Corresponding angles are equal. They do not add to 180 degrees.' },
        { say: 'Angle 4 is opposite angle 1, so it is equal to it. The angles next to angle 1 are the 60-degree ones.' },
        { say: 'And corresponding angles are only equal when the lines are parallel. Look for the arrows, or for the word parallel.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In the same kind of figure, two parallel lines are cut by a transversal, numbered the same way, and $m\\measuredangle 3 = 65^\\circ$. What is $m\\measuredangle 7$?',
          choices: ['$115^\\circ$', '$25^\\circ$', '$130^\\circ$', '$65^\\circ$'],
          answer: 3,
          working: 'Angles $3$ and $7$ are both below left: corresponding, so equal.',
        },
      ],
      lines: [
        { say: 'Your turn. In the same kind of figure, numbered the same way, angle 3 is 65 degrees. What is angle 7? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Angle 3 is below left at the top crossing, and angle 7 is below left at the bottom crossing. They are corresponding angles, so angle 7 is also 65 degrees. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Corresponding** angles: same position, equal (parallel lines)', '**Vertical** angles: opposite, always equal', 'Angles on a line make $180^\\circ$', 'Only **two** sizes of angle: here $120^\\circ$ and $60^\\circ$'] }],
      lines: [
        { say: 'Here is what to remember. Corresponding angles are in the same position, and they are equal when the lines are parallel.', show: 'sum.0' },
        { say: 'Vertical angles are opposite each other, and they are always equal.', show: 'sum.1' },
        { say: 'Angles next to each other on a line make 180 degrees.', show: 'sum.2' },
        { say: 'So with parallel lines, there are only two sizes of angle. For more on parallel lines and transversals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
