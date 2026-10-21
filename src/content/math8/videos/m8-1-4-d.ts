import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

// Sides of 9, 12 and 15 cm: a right triangle (drawn to scale).
const right = figure('t', [triangle({ A: [0, 0], B: [12, 0], C: [0, 9], right: 'A', sides: { AB: '12 \\text{ cm}', CA: '9 \\text{ cm}', BC: '15 \\text{ cm}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 380);

// Sides of 7, 9 and 11 m, drawn to scale: the angle between the 7 and the 9 is about 86°, not 90°.
const cosA = (7 * 7 + 9 * 9 - 11 * 11) / (2 * 7 * 9);
const notRight = figure('t', [
  triangle({ A: [0, 0], B: [9, 0], C: [7 * cosA, 7 * Math.sqrt(1 - cosA * cosA)], sides: { AB: '9 \\text{ m}', CA: '7 \\text{ m}', BC: '11 \\text{ m}' }, angles: { A: '\\approx 86^\\circ' } }),
], 380);

// A builder's check: 3 units along each side of a corner and 4 along the other; the diagonal is 5.
const corner = figure('cn', [triangle({ A: [0, 0], B: [4, 0], C: [0, 3], right: 'A', sides: { AB: '4 \\text{ units}', CA: '3 \\text{ units}', BC: '5 \\text{ units}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 380);

const video: Explainer = {
  id: 'm8-1-4-d',
  lessonId: 'm8-1-4',
  title: 'Using the Pythagorean Theorem, Part 4: Is It a Right Triangle?',
  thumbnailTitle: 'Is It a Right Triangle?',
  thumbnail: 't',
  summary:
    'The Pythagorean theorem works in reverse: square the two shorter sides and add; if the sum equals the square of the longest side, the triangle is a right triangle, and if not, it is not. Sides of 9, 12 and 15 cm: 81 + 144 = 225 = 15², so it is a right triangle. Sides of 7, 9 and 11 m: 49 + 81 = 130, but 11² = 121, so it is not. Always use the longest side as c. Builders check a corner with 3, 4 and 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 4', title: 'Is It a Right Triangle?', subtitle: 'The theorem in reverse' }],
      lines: [
        { say: 'Builders need square corners for walls, decks and gardens. How can they check that a corner really is a right angle, using only a tape measure?', show: 'title' },
        { say: 'In this part, you will use the Pythagorean theorem backwards, to test whether a triangle is a right triangle.' },
      ],
    },
    {
      chapter: 'The theorem in reverse',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Is it a right triangle?', md: 'Square the **two shorter** sides and add. If the sum equals the square of the **longest** side, the triangle **is** a right triangle. If not, it is not.' },
      ],
      lines: [
        { say: 'In every right triangle, the squares of the two legs add up to the square of the hypotenuse. This also works the other way around.', show: 'key' },
        { say: 'Square the two shorter sides and add. Then square the longest side.' },
        { say: 'If the two answers are equal, the triangle is a right triangle. If they are not equal, it is not a right triangle.' },
      ],
    },
    {
      chapter: 'Sides of 9, 12 and 15',
      layout: 'split',
      leftWidth: 460,
      left: [right],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['9^2 + 12^2 = 81 + 144 = 225', '15^2 = 225', '225 = 225'] },
        { kind: 'text', id: 'a', size: 'md', md: 'It **is** a right triangle.' },
      ],
      lines: [
        { say: 'A triangle has sides of nine centimetres, twelve centimetres and fifteen centimetres. Is it a right triangle?', show: 't.shape' },
        { say: 'The longest side is fifteen. Square the two shorter sides and add: eighty-one plus one hundred forty-four is two hundred twenty-five.', show: 'm.0', focus: ['m.0', 't.AB', 't.CA'] },
        { say: 'Fifteen squared is also two hundred twenty-five.', show: 'm.1', focus: ['m.1', 't.BC'] },
        { say: 'The two answers are equal, so this is a right triangle. The right angle is across from the longest side, between the sides of nine and twelve.', show: ['m.2', 'a', 't.right'], focus: 't.right' },
      ],
    },
    {
      chapter: 'Sides of 7, 9 and 11',
      layout: 'split',
      leftWidth: 520,
      left: [notRight],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['7^2 + 9^2 = 49 + 81 = 130', '11^2 = 121', '130 \\ne 121'] },
        { kind: 'text', id: 'a', size: 'md', md: 'It is **not** a right triangle.' },
      ],
      lines: [
        { say: 'A triangle has sides of seven metres, nine metres and eleven metres. Is it a right triangle?', show: 't.shape' },
        { say: 'The longest side is eleven. Square the two shorter sides and add: forty-nine plus eighty-one is one hundred thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Eleven squared is one hundred twenty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'One hundred thirty is not equal to one hundred twenty-one, so this is not a right triangle.', show: ['m.2', 'a'], focus: 'm.2' },
        { say: 'It looks close. But the angle between the two shorter sides is about eighty-six degrees, a little less than a right angle.', show: 't.aA', focus: 't.aA' },
      ],
    },
    {
      chapter: 'Use the longest side as c',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use the longest side as c', md: 'Only the longest side can be the hypotenuse. Always square the **two shorter** sides and compare with the square of the **longest** side.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{5^2 + 13^2 = 194 \\ne 12^2}', '5^2 + 12^2 = 25 + 144 = 169 = 13^2 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is a mistake to avoid. Only the longest side can be the hypotenuse.', show: 'oops' },
        { say: 'Suppose a triangle has sides of five, twelve and thirteen. If you add five squared and thirteen squared, you get one hundred ninety-four, which is not twelve squared. You might think it is not a right triangle.', show: 'm.0', focus: 'm.0' },
        { say: 'But that uses the wrong sides! Square the two shorter sides: twenty-five plus one hundred forty-four is one hundred sixty-nine, which is thirteen squared. It is a right triangle.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Checking a corner',
      layout: 'split',
      leftWidth: 520,
      left: [corner],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Checking a corner', md: 'Mark $3$ units along one side of a corner and $4$ units along the other. If the diagonal between the marks is exactly $5$ units, the corner is square.' },
      ],
      lines: [
        { say: 'Builders use this to check a corner. They mark three units along one side of the corner, and four units along the other side.', show: ['cn.AB', 'cn.CA'] },
        { say: 'Then they measure the diagonal between the two marks. If it is exactly five units, the corner is square, because three, four and five is a Pythagorean triple.', show: ['cn.BC', 'cn.right', 'tip'], focus: 'cn.BC' },
        { say: 'If the diagonal is more or less than five units, the corner is not square, and they adjust it until it is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has sides of $8\\ \\text{cm}$, $15\\ \\text{cm}$ and $17\\ \\text{cm}$. Is it a right triangle?',
          choices: ['Yes, because $8^2 + 15^2 = 17^2$.', 'No, because $8 + 15 \\ne 17$.', 'No, because $8^2 + 17^2 \\ne 15^2$.', 'Yes, because $17$ is the longest side.'],
          answer: 0,
          working: 'Square the two shorter sides: $8^2 + 15^2 = 64 + 225 = 289$. The longest side: $17^2 = 289$. They are equal, so it is a right triangle.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has sides of eight, fifteen and seventeen centimetres. Is it a right triangle? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Sixty-four plus two hundred twenty-five is two hundred eighty-nine, which is seventeen squared. Choice C uses the wrong sides. The longest side, seventeen, must be the one on its own.', show: 'q.answer' },
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
            'Square the two shorter sides and add; square the longest side.',
            'Equal: a right triangle ($81 + 144 = 225$). Not equal: not a right triangle ($130 \\ne 121$).',
            'Only the longest side can be the hypotenuse.',
            'Builders check a corner with $3$, $4$ and $5$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To test a triangle, square the two shorter sides and add, then square the longest side.', show: 'sum.0' },
        { say: 'If the answers are equal, it is a right triangle. If not, it is not.', show: 'sum.1' },
        { say: 'Only the longest side can be the hypotenuse.', show: 'sum.2' },
        { say: 'And builders use three, four and five to check that a corner is square. Well done on finishing this lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
