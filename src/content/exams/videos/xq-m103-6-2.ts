import type { Explainer } from '@/video/script.ts';
import { crossing } from '@/video/angles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 6.2 (angle relationships). The question is a Your Turn from
// OpenStax Contemporary Mathematics, word for word (section 10.2, Angles, CC BY-NC-SA 4.0), with the
// book's figure redrawn from its description: two intersecting lines, with angles 1 and 3 opposite
// each other, and angles 2 and 4 opposite each other. ∠4 is vertical to ∠2, so it is 67°; ∠1 is
// supplementary to ∠2, so 180° − 67° = 113°; ∠3 is vertical to ∠1, so 113°, as in the book's
// answer. Check: 67 + 113 + 67 + 113 = 360.

const QUESTION =
  'Given the two intersecting lines in the figure shown and m∡2 = 67°, find the measure of the remaining angles. [The figure: two lines cross. Angles 1 and 3 are opposite each other, and angles 2 and 4 are opposite each other.]';

const lines = (height = 400) => figure('x', [crossing({ deg: 113, tilt: 10, len: 4.5, labels: { a1: '1', a2: '2', a3: '3', a4: '4' } })], height);

const video: Explainer = {
  id: 'xq-m103-6-2',
  lessonId: '',
  exam: {
    lesson: 'm103-6-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.2, Angles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-2-angles',
    question: QUESTION,
  },
  title: 'Exam Question: The Four Angles Where Two Lines Cross (Angle Relationships)',
  thumbnailTitle: 'Two Lines Cross: Find the Angles',
  thumbnail: 'x',
  summary:
    'A real test question, solved one small step at a time: two lines cross, making angles 1, 2, 3 and 4, and angle 2 is 67°. Find the other three angles. Angle 4 is vertical to angle 2, so it is also 67°. Angle 1 is next to angle 2 on a straight line, so it is 180° − 67° = 113°, and angle 3 is vertical to angle 1, so it is 113° too. Then we check that the four angles make 360° and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Lines Cross: Find the Angles', subtitle: 'Angle relationships, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about angle relationships. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 560,
      left: [lines()],
      right: [{ kind: 'text', id: 'q', size: 'lg', md: '**The question:** Given the two intersecting lines in the figure shown and $m\\measuredangle 2 = 67^\\circ$, find the measure of the remaining angles.' }],
      lines: [
        { say: 'Here is the question, from the book. We have redrawn its figure.', show: ['x.lines', 'x.a1', 'x.a2', 'x.a3', 'x.a4', 'q'] },
        { say: 'Two lines cross, making four angles, numbered 1 to 4. Angle 2 measures 67 degrees. Find the measures of the other three angles.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Angle', 'Where it is'],
          rows: [
            ['$\\measuredangle 2 = 67^\\circ$', 'given'],
            ['$\\measuredangle 4$', '**opposite** angle 2'],
            ['$\\measuredangle 1$ and $\\measuredangle 3$', '**next to** angle 2, opposite each other'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we know. Angle 2 is 67 degrees. Angle 4 is opposite it, across the crossing point.', show: 'tab' },
        { say: 'Angles 1 and 3 are each next to angle 2, and they are opposite each other. We want all three.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'v', tone: 'definition', title: 'Vertical angles', md: 'Angles **opposite** each other where two lines cross are **vertical angles**. They are **equal**.' },
        { kind: 'callout', id: 's', tone: 'definition', title: 'Supplementary angles', md: 'Two angles **next to each other on a straight line** add to $180^\\circ$. They are **supplementary**.' },
      ],
      lines: [
        { say: 'Here is what we need. Angles opposite each other where two lines cross are called vertical angles, and they are always equal.', show: 'v' },
        { say: 'Two angles next to each other on a straight line add up to 180 degrees. They are called supplementary.', show: 's' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Angle 4: **vertical** to angle 2', 'Angle 1: **supplementary** to angle 2', 'Angle 3: **vertical** to angle 1'] }],
      lines: [
        { say: 'Here is the plan. Angle 4 is vertical to angle 2.', show: 'plan.0' },
        { say: 'Angle 1 is supplementary to angle 2.', show: 'plan.1' },
        { say: 'And angle 3 is vertical to angle 1.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Angle 4',
      layout: 'split',
      leftWidth: 560,
      left: [lines(380)],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m\\measuredangle 4 = m\\measuredangle 2 = \\good{67^\\circ}'] }],
      lines: [
        { say: 'Step one. Here are angles 2 and 4. They are opposite each other, so they are vertical angles.', show: ['x.lines', 'x.a2', 'x.a4'] },
        { say: 'Vertical angles are equal, so angle 4 is also 67 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Angle 1',
      layout: 'split',
      leftWidth: 560,
      left: [lines(380)],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m\\measuredangle 1 + 67^\\circ = 180^\\circ', 'm\\measuredangle 1 = \\good{113^\\circ}'] }],
      lines: [
        { say: 'Step two. Angles 1 and 2 sit next to each other on a straight line, so they add up to 180 degrees.', show: ['x.lines', 'x.a1', 'x.a2', 'm.0'] },
        { say: '180 minus 67 is 113. Angle 1 is 113 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Angle 3',
      layout: 'split',
      leftWidth: 560,
      left: [lines(380)],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m\\measuredangle 3 = m\\measuredangle 1 = \\good{113^\\circ}'] }],
      lines: [
        { say: 'Step three. Angle 3 is opposite angle 1, so they are vertical angles.', show: ['x.lines', 'x.a1', 'x.a3'] },
        { say: 'So angle 3 is also 113 degrees.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['113^\\circ + 67^\\circ + 113^\\circ + 67^\\circ = 360^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The four angles go all the way round the crossing point, so they should make a full turn, 360 degrees. 113 plus 67 plus 113 plus 67 is 360. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$m\\measuredangle 1 = 67^\\circ$', 'angle 1 is **next to** angle 2, not opposite'],
            ['$m\\measuredangle 1 = 90^\\circ - 67^\\circ = 23^\\circ$', 'angles on a **line** make $180^\\circ$, not $90^\\circ$'],
            ['$m\\measuredangle 1 = 360^\\circ - 67^\\circ$', '$360^\\circ$ is **all four** angles'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Angle 1 is next to angle 2, not opposite it, so it is not equal to it.' },
        { say: 'Angles on a straight line make 180 degrees. 90 degrees is for angles that make a right angle.' },
        { say: 'And 360 degrees is all four angles together, not two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two lines cross. One of the four angles is $48^\\circ$. Going round from that angle, what are the other three?',
          choices: ['$48^\\circ$, $48^\\circ$, $132^\\circ$', '$42^\\circ$, $48^\\circ$, $42^\\circ$', '$132^\\circ$, $48^\\circ$, $132^\\circ$', '$312^\\circ$, $48^\\circ$, $312^\\circ$'],
          answer: 2,
          working: 'Next to it: $180^\\circ - 48^\\circ = 132^\\circ$. Opposite: $48^\\circ$. Then $132^\\circ$ again.',
        },
      ],
      lines: [
        { say: 'Your turn. Two lines cross. One of the four angles is 48 degrees. Going round from that angle, what are the other three? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The next angle is supplementary: 180 minus 48 is 132. The opposite angle is vertical, so 48. And the last one is 132 again. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Vertical** angles (opposite) are **equal**', '**Supplementary** angles (on a line) make $180^\\circ$', 'Two crossing lines: two pairs of equal angles', 'All four angles make $360^\\circ$'] }],
      lines: [
        { say: 'Here is what to remember. Vertical angles, opposite each other, are equal.', show: 'sum.0' },
        { say: 'Supplementary angles, next to each other on a straight line, make 180 degrees.', show: 'sum.1' },
        { say: 'So two crossing lines make two pairs of equal angles.', show: 'sum.2' },
        { say: 'And all four angles together make 360 degrees. For more on angle relationships, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
