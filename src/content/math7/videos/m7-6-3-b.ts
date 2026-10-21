import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { seg } from '@/content/math6/videos/lib/m6-9-figures.ts';

// A number line from −10 to 10 with a hop from `from` to `to` (an arrow above the line, labelled).
const hop = (id: string, o: { from: number; to: number; label: string }) =>
  figure(
    id,
    [
      numberLine({
        min: -10,
        max: 10,
        step: 1,
        every: 2,
        length: 20,
        points: [
          { id: 'start', value: o.from, tex: String(o.from).replace('-', '{-}'), tone: 'adj' },
          { id: 'end', value: o.to, tex: String(o.to).replace('-', '{-}'), tone: 'good' },
        ],
      }),
      seg('hop', [o.from + 10, 1.6], [o.to + 10, 1.6], { tone: 'theta', arrow: true, weight: 4, label: o.label, side: o.from > o.to ? 'right' : 'left' }),
    ],
    230,
  );
const hopAll = (id: string) => [`${id}.axis`, `${id}.start`];

const video: Explainer = {
  id: 'm7-6-3-b',
  lessonId: 'm7-6-3',
  title: 'Solving One-Step Equations, Part 2: Adding and Subtracting Integers',
  thumbnailTitle: 'Equations with Integers',
  thumbnail: 'h1',
  summary:
    'Solving one-step equations with negative numbers: x + 7 = 3, so subtract 7 from both sides and x = 3 − 7 = −4; x + (−5) = 2, so x = 2 − (−5) = 2 + 5 = 7; x − 6 = −9, so add 6 and x = −9 + 6 = −3. Always use the inverse operation, and check: adding 7 to both sides of x + 7 = 3 gives 10, and 10 + 7 is 17, not 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'Adding and Subtracting Integers', subtitle: 'The same steps, with negative numbers' }],
      lines: [
        { say: 'Integers are the whole numbers, their opposites, and zero: numbers like three, negative four and zero.', show: 'title' },
        { say: 'In this video, you will solve equations with integers. The steps are the same as before. You just need to add and subtract carefully, and a number line helps.' },
      ],
    },
    {
      chapter: 'Undo adding',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + 7 = 3', 'x + 7 - 7 = 3 - 7', 'x = {-4}', '\\text{Check: } ({-4}) + 7 = 3 \\;\\checkmark'] }, hop('h1', { from: 3, to: -4, label: '7\\text{ to the left}' })],
      lines: [
        { say: 'Solve x plus seven equals three.', show: 'm.0' },
        { say: 'Seven is added to x. To undo adding seven, subtract seven from both sides. Seven minus seven is zero, so x is left by itself. On the right, we get three minus seven.', show: 'm.1', focus: 'm.1' },
        { say: 'To find three minus seven, start at three on the number line, and move seven to the left. You pass zero, and land on negative four.', show: [...hopAll('h1'), 'h1.hop', 'h1.end'], focus: 'h1.hop' },
        { say: 'So x equals negative four.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: negative four plus seven. Start at negative four and move seven to the right. You land on three. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Undo adding a negative',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + ({-5}) = 2', 'x = 2 - ({-5})', 'x = 2 + 5 = 7', '\\text{Check: } 7 + ({-5}) = 2 \\;\\checkmark'] }, hop('h2', { from: 2, to: 7, label: '5\\text{ to the right}' })],
      lines: [
        { say: 'Solve x plus negative five equals two.', show: 'm.0' },
        { say: 'This time, negative five is added to x. To undo adding negative five, subtract negative five from both sides. So x equals two minus negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'Remember: subtracting a negative number is the same as adding the positive number. So two minus negative five is two plus five.', show: 'm.2', focus: 'm.2' },
        { say: 'Start at two, and move five to the right. You land on seven. So x equals seven.', show: [...hopAll('h2'), 'h2.hop', 'h2.end'], focus: 'h2.hop' },
        { say: 'Check: seven plus negative five is the same as seven minus five, which is two. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Undo subtracting',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x - 6 = {-9}', 'x - 6 + 6 = ({-9}) + 6', 'x = {-3}', '\\text{Check: } ({-3}) - 6 = {-9} \\;\\checkmark'] }, hop('h3', { from: -9, to: -3, label: '6\\text{ to the right}' })],
      lines: [
        { say: 'Solve x minus six equals negative nine.', show: 'm.0' },
        { say: 'Six is subtracted from x. To undo subtracting six, add six to both sides. On the right, we get negative nine plus six.', show: 'm.1', focus: 'm.1' },
        { say: 'Start at negative nine, and move six to the right. You land on negative three. So x equals negative three.', show: [...hopAll('h3'), 'h3.hop', 'h3.end', 'm.2'], focus: ['h3.hop', 'm.2'] },
        { say: 'Check: negative three minus six. Start at negative three, and move six to the left. You land on negative nine. It works!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Doing the same operation instead of the opposite', md: 'For $x + 7 = 3$, adding $7$ gives $x = 10$. Check it: $10 + 7 = 17$, not $3$. Always use the **inverse** operation, and always check.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 3 + 7 = 10: \\quad 10 + 7 = 17 \\quad \\bad{\\text{not } 3}', 'x = 3 - 7 = {-4}: \\quad ({-4}) + 7 = 3 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. In x plus seven equals three, some people see the plus sign, and add seven to both sides.', show: 'oops' },
        { say: 'That gives x equals ten. But check it: ten plus seven is seventeen, not three.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven was added to x, so you must do the opposite: subtract seven. That gives negative four, which checks out.', show: 'm.1', focus: 'm.1' },
        { say: 'Always use the inverse operation, and always check your answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x - 4 = {-10}$.',
          choices: ['$x = 6$', '$x = {-14}$', '$x = 14$', '$x = {-6}$'],
          answer: 3,
          working: 'Four is subtracted from $x$, so add $4$ to both sides: $x = ({-10}) + 4 = {-6}$. Check: $({-6}) - 4 = {-10}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x minus four equals negative ten. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, x equals negative six. Add four to both sides: negative ten plus four is negative six. Check: negative six minus four is negative ten. Choice B subtracts four instead of adding it.', show: 'q.answer' },
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
          items: ['Subtract to undo adding, and add to undo subtracting, on both sides.', 'Subtracting a negative is the same as adding: $2 - ({-5}) = 2 + 5$.', 'A number line helps you add and subtract integers.', 'Always check by substituting.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To undo adding, subtract. To undo subtracting, add. Do it to both sides.', show: 'sum.0' },
        { say: 'Subtracting a negative number is the same as adding the positive number.', show: 'sum.1' },
        { say: 'A number line helps you add and subtract integers.', show: 'sum.2' },
        { say: 'And always check by putting your answer back into the equation. In the next part, you will undo multiplying and dividing. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
