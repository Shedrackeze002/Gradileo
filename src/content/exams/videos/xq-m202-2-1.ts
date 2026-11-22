import type { Explainer } from '@/video/script.ts';
import { transversal } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 2.1 (angles formed by parallel lines). The question is from
// Check Your Understanding in OpenStax Contemporary Mathematics, word for word apart from "For the
// following exercises," (section 10.2, Angles, CC BY-NC-SA 4.0), with the book's figure
// description in brackets. The 31° angle is above l₁, right of the transversal, so angle 1 is
// 180° − 31° = 149° (a straight line), and angle 5 corresponds to angle 1: 149°.

const labels = { 1: '1', 2: '31^\\circ', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8' } as const;

/** The book's figure: l₁ ∥ l₂ cut by a transversal at 31°, the angles numbered as printed. */
const lines = (height = 380) => figure('tr', [transversal({ deg: 31, gap: 4.5, len: 13.5, names: ['l_1', 'l_2', 't'], labels })], height);

const QUESTION =
  'Determine the measure of the angles in the given figure. [Two parallel lines, l1 and l2, are intersected by a transversal. The transversal makes four angles labeled 1, 31 degrees, 3, and 4 with the line l1. The transversal makes four angles numbered 5, 6, 7, and 8 with the line l2. 1, 31 degrees, 7, and 8 are exterior angles. 3, 4, 5, and 6 are interior angles.] Find the measure of ∠5 and state the reason for your solution.';

const video: Explainer = {
  id: 'xq-m202-2-1',
  lessonId: '',
  exam: {
    lesson: 'm202-2-1',
    source: 'OpenStax, Contemporary Mathematics, Check Your Understanding in section 10.2, Angles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-2-angles',
    question: QUESTION,
  },
  title: 'Exam Question: Find Angle 5 Between Parallel Lines (Angles Formed by Parallel Lines)',
  thumbnailTitle: 'Find Angle 5',
  thumbnail: 'tr',
  summary:
    'A real test question, solved one small step at a time: two parallel lines are cut by a transversal that makes a 31° angle, and we find the measure of angle 5 with a reason. Angle 1 makes a straight line with the 31° angle, so it is 149°, and angle 5 corresponds to angle 1, so it is 149° too. Then we check it a second way and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find Angle 5', subtitle: 'Angles formed by parallel lines, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the angles formed by parallel lines. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        lines(300),
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Determine the measure of the angles in the given figure. Find the measure of $\\angle 5$ and state the reason for your solution.',
          answer: '$149^\\circ$',
          working: '$\\angle 1 = 180^\\circ - 31^\\circ = 149^\\circ$, and $\\angle 5 = \\angle 1$ (corresponding angles).',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: ['q', 'tr.lines', 'tr.marks', 'tr.a1', 'tr.a2', 'tr.a3', 'tr.a4', 'tr.a5', 'tr.a6', 'tr.a7', 'tr.a8'] },
        { say: 'Two parallel lines, l 1 and l 2, are cut by a transversal. At l 1, the angles are labelled 1, 31 degrees, 3 and 4. At l 2, they are numbered 5, 6, 7 and 8.' },
        { say: 'Determine the measure of the angles in the given figure. Find the measure of angle 5, and state the reason for your solution.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [lines()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'We know **one** angle, $31^\\circ$. Find **angle 5**, and give the **angle fact** that proves it.' }],
      lines: [
        { say: 'We know just one angle: the 31 degree angle above l 1, on the right of the transversal.', show: ['tr.lines', 'tr.marks', 'tr.a2'], focus: 'tr.a2' },
        { say: 'We need angle 5, above l 2 on the left, and the angle fact, or reason, that tells us its size.', show: ['tr.a5', 't'], focus: 'tr.a5' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sup', tone: 'definition', title: 'Angles on a straight line', md: 'Two angles that make a **straight line** are **supplementary**: they add to $180^\\circ$.' },
        { kind: 'callout', id: 'cor', tone: 'key', title: 'Corresponding angles', md: 'Angles in **matching positions** at the two crossings. When the lines are **parallel**, they are **equal**.' },
      ],
      lines: [
        { say: 'Here is what we need. Two angles that make a straight line are supplementary. They add to 180 degrees.', show: 'sup' },
        { say: 'And corresponding angles sit in matching positions at the two crossings, like the top left corner of each. When the lines are parallel, corresponding angles are equal.', show: 'cor' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find **angle 1** from the $31^\\circ$ angle', 'Find **angle 5** from angle 1', 'Give the **reason** for each step'] }],
      lines: [
        { say: 'Here is the plan. Angle 5 is not next to the 31 degree angle, so we go in two steps. First, find angle 1 from the 31 degree angle.', show: 'plan.0' },
        { say: 'Second, find angle 5 from angle 1.', show: 'plan.1' },
        { say: 'And give the reason for each step, because the question asks for it.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Angle 1',
      layout: 'split',
      leftWidth: 620,
      left: [lines()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle 1 + 31^\\circ = 180^\\circ', '\\angle 1 = \\good{149^\\circ}', '\\text{(angles on a straight line)}'] }],
      lines: [
        { say: 'Step one. Here is the figure again.', show: ['tr.lines', 'tr.marks', 'tr.a2'] },
        { say: 'Angle 1 and the 31 degree angle sit side by side on line l 1. Together they make a straight line, so they add to 180 degrees.', show: ['tr.a1', 'm.0'], focus: ['tr.a1', 'tr.a2'] },
        { say: '180 minus 31 is 149. So angle 1 is 149 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The reason: angles on a straight line are supplementary.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Angle 5',
      layout: 'split',
      leftWidth: 620,
      left: [lines()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle 5 = \\angle 1', '\\angle 5 = \\good{149^\\circ}', '\\text{(corresponding, } l_1 \\parallel l_2)'] }],
      lines: [
        { say: 'Step two. Angle 1 is above l 1, on the left of the transversal.', show: ['tr.lines', 'tr.marks', 'tr.a1'], focus: 'tr.a1' },
        { say: 'Angle 5 is above l 2, on the left of the transversal. Same position at the other crossing, so they are corresponding angles.', show: ['tr.a5', 'm.0'], focus: ['tr.a1', 'tr.a5'] },
        { say: 'The lines are parallel, so corresponding angles are equal. Angle 5 is 149 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The reason: corresponding angles are equal, because l 1 is parallel to l 2.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [lines()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle 3 = 31^\\circ', '\\angle 5 = 180^\\circ - \\angle 3', '= 149^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. Angle 3 is across from the 31 degree angle, so they are vertically opposite, and angle 3 is 31 degrees.', show: ['tr.lines', 'tr.marks', 'tr.a2', 'tr.a3', 'm.0'], focus: ['tr.a2', 'tr.a3'] },
        { say: 'Angles 3 and 5 are both between the lines, on the same side of the transversal. Same-side interior angles add to 180 degrees.', show: ['tr.a5', 'm.1'], focus: ['tr.a3', 'tr.a5'] },
        { say: 'So angle 5 is 180 minus 31, which is 149 degrees again. And angle 5 looks wide, more than a right angle, which fits.', show: 'm.2', focus: 'm.2' },
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
            ['$\\angle 5 = 31^\\circ$', 'the $31^\\circ$ angle corresponds to **angle 6**, not angle 5'],
            ['no reason given', 'the question asks you to **state the reason**'],
            ['"corresponding" for any lines', 'they are equal only when the lines are **parallel**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not just copy the 31 degrees across. The 31 degree angle is in the top right position, so it matches angle 6, not angle 5.' },
        { say: 'The question asks for the reason too. Name the angle fact for each step.' },
        { say: 'And corresponding angles are only equal because the lines are parallel. Say so in your reason.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In the same figure, what is the measure of $\\angle 7$?',
          choices: ['$149^\\circ$', '$59^\\circ$', '$121^\\circ$', '$31^\\circ$'],
          answer: 3,
          working: '$\\angle 3 = 31^\\circ$ (vertically opposite), and $\\angle 7 = \\angle 3$ (corresponding angles).',
        },
      ],
      lines: [
        { say: 'Your turn. In the same figure, what is the measure of angle 7? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Angle 3 is vertically opposite the 31 degree angle, so it is 31 degrees. Angle 7 is below l 2 on the left, the same position as angle 3, so they are corresponding angles. Angle 7 is 31 degrees: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['On a straight line, angles add to $180^\\circ$', 'Parallel lines: **corresponding** angles are equal', 'Work step by step from the angle you **know**', 'Give a **reason** for every step'] }],
      lines: [
        { say: 'Here is what to remember. Angles on a straight line add to 180 degrees.', show: 'sum.0' },
        { say: 'When the lines are parallel, corresponding angles are equal.', show: 'sum.1' },
        { say: 'Work step by step, starting from the angle you know.', show: 'sum.2' },
        { say: 'And give a reason for every step. For more on angles formed by parallel lines, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
