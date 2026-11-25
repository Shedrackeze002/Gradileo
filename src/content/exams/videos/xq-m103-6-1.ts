import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 6.1 (classifying and measuring angles). The question is a Your
// Turn from OpenStax Contemporary Mathematics, word for word (section 10.2, Angles, CC BY-NC-SA
// 4.0), with the book's figure redrawn from its description: a right angle split by two rays into
// 7x + 2 (next to the horizontal line), 9x, and 6x (next to the vertical line). The three make
// 90°, so 22x + 2 = 90, x = 4, and the angles are 30°, 36° and 24°, as in the book's answer.
// Check: 30 + 36 + 24 = 90.

const toward = (deg: number, r: number): [number, number] => [r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180)];

/** Two perpendicular lines, with two rays splitting the right angle into 30°, 36° and 24°. */
function split(): Part {
  const points: Record<string, [number, number]> = { O: [0, 0], E: [6, 0], W: [-2.5, 0], N: [0, 6], S: [0, -2.5], R1: toward(30, 6), R2: toward(66, 6) };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'h', from: 'W', to: 'E', group: 'lines' },
    { kind: 'line', id: 'v', from: 'S', to: 'N', group: 'lines' },
    { kind: 'right', id: 'sq', at: 'O', from: 'W', to: 'S', group: 'lines' },
    { kind: 'line', id: 'r1', from: 'O', to: 'R1', tone: 'adj', group: 'rays' },
    { kind: 'line', id: 'r2', from: 'O', to: 'R2', tone: 'adj', group: 'rays' },
    { kind: 'angle', id: 'a', at: 'O', from: 'E', to: 'R1', label: '7x + 2', r: 80, labelDist: 140, group: 'angles' },
    { kind: 'angle', id: 'b', at: 'O', from: 'R1', to: 'R2', label: '9x', r: 60, labelDist: 110, group: 'angles' },
    { kind: 'angle', id: 'c', at: 'O', from: 'R2', to: 'N', label: '6x', r: 80, labelDist: 130, group: 'angles' },
  ];
  return { points, items };
}

const QUESTION =
  'Find the measure of each angle in the illustration. [The illustration: two lines meet at a right angle. Two rays from the point where they meet split the right angle into three angles: 7x + 2 next to the horizontal line, 9x in the middle, and 6x next to the vertical line.]';

const video: Explainer = {
  id: 'xq-m103-6-1',
  lessonId: '',
  exam: {
    lesson: 'm103-6-1',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.2, Angles',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-2-angles',
    question: QUESTION,
  },
  title: 'Exam Question: Three Angles That Make a Right Angle (Measuring Angles)',
  thumbnailTitle: 'Three Angles in a Right Angle',
  thumbnail: 'sp',
  summary:
    'A real test question, solved one small step at a time: a right angle is split into three angles, 7x + 2, 9x and 6x. Find the measure of each angle. The three angles make the right angle, so 7x + 2 + 9x + 6x = 90, which gives 22x = 88 and x = 4. Then the angles are 30°, 36° and 24°. We check that they add to 90° and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Three Angles in a Right Angle', subtitle: 'Measuring angles, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about angles. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sp', [split()], 420)],
      right: [{ kind: 'text', id: 'q', size: 'lg', md: '**The question:** Find the measure of each angle in the illustration.' }],
      lines: [
        { say: 'Here is the question, from the book. We have redrawn its picture.', show: ['sp.lines', 'q'] },
        { say: 'Two lines meet at a right angle. Two rays split the right angle into three angles: 7 x plus 2, 9 x, and 6 x. Find the measure of each angle.', show: ['sp.rays', 'sp.angles'] },
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
          head: ['We know', 'We want'],
          rows: [
            ['the three angles fill a **right angle**', 'the value of $x$'],
            ['$7x + 2$, $9x$ and $6x$', 'then **each angle** in degrees'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we know. The three angles fill the right angle exactly, and each is written using x.', show: 'tab' },
        { say: 'We want each angle in degrees. To get there, we first find x.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{right angle} = 90^\\circ'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Parts make the whole', md: 'Angles side by side that **fill** a bigger angle **add up** to it.' },
      ],
      lines: [
        { say: 'Here is what we need. A right angle is exactly 90 degrees. The little square in the corner marks it.', show: 'f' },
        { say: 'Angles that sit side by side and fill a bigger angle add up to that angle. So the three angles add up to 90 degrees.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write an **equation**: the angles add to $90^\\circ$', '**Solve** for $x$', 'Put $x$ back in to find **each angle**'] }],
      lines: [
        { say: 'Here is the plan. Write an equation: the three angles add to 90 degrees.', show: 'plan.0' },
        { say: 'Solve it for x.', show: 'plan.1' },
        { say: 'Then put x back in to find each angle.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(7x + 2) + 9x + 6x = 90', '22x + 2 = 90'] }],
      lines: [
        { say: 'Step one. 7 x plus 2, plus 9 x, plus 6 x, equals 90.', show: 'm.0' },
        { say: 'Collect the x terms: 7 plus 9 plus 6 is 22. So 22 x plus 2 equals 90.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Solve for x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['22x = 88', 'x = \\good{4}'] }],
      lines: [
        { say: 'Step two. Take 2 from both sides: 22 x equals 88.', show: 'm.0' },
        { say: 'Divide both sides by 22: x equals 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Each angle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['7x + 2 = 7(4) + 2 = \\good{30^\\circ}', '9x = 9(4) = \\good{36^\\circ}', '6x = 6(4) = \\good{24^\\circ}'] }],
      lines: [
        { say: 'Step three. Put x equals 4 back in. 7 times 4 is 28, plus 2 is 30 degrees.', show: 'm.0' },
        { say: '9 times 4 is 36 degrees.', show: 'm.1' },
        { say: 'And 6 times 4 is 24 degrees.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['30^\\circ + 36^\\circ + 24^\\circ = 90^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 30 plus 36 plus 24 is 90 degrees, a right angle. And each one is acute, less than 90 degrees, as the picture shows. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['Answer "$x = 4$"', 'the question wants the **angles**: put $x$ back in'],
            ['$22x = 92$', 'to undo $+2$, **subtract** $2$'],
            ['$22x + 2 = 180$', 'a **right** angle is $90^\\circ$, not $180^\\circ$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'x equals 4 is not the answer. The question asks for the angles, so put x back in.' },
        { say: 'To undo plus 2, subtract 2 from both sides. Adding it gives 92, which is wrong.' },
        { say: 'And a right angle is 90 degrees. 180 degrees is a straight angle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A straight angle is split into three angles: $2x$, $3x + 10$ and $5x - 10$. What is the largest of the three angles?',
          choices: ['$64^\\circ$', '$80^\\circ$', '$18^\\circ$', '$90^\\circ$'],
          answer: 1,
          working: '$10x = 180$, so $x = 18$: the angles are $36^\\circ$, $64^\\circ$ and $80^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A straight angle is split into three angles: 2 x, 3 x plus 10, and 5 x minus 10. What is the largest of the three angles? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A straight angle is 180 degrees. The x terms make 10 x, and the plus 10 and minus 10 cancel. So 10 x equals 180, and x is 18. The angles are 36, 64 and 80 degrees. The largest is 80 degrees. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Right angle $= 90^\\circ$, straight angle $= 180^\\circ$', 'Angles that fill an angle **add up** to it', 'Solve for $x$, then **put it back in**', 'Check that the angles add up'] }],
      lines: [
        { say: 'Here is what to remember. A right angle is 90 degrees, and a straight angle is 180 degrees.', show: 'sum.0' },
        { say: 'Angles that fill a bigger angle add up to it.', show: 'sum.1' },
        { say: 'Solve for x, then put it back in to find each angle.', show: 'sum.2' },
        { say: 'And check that your angles add up. For more on classifying and measuring angles, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
