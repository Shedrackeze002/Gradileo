import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

// Legs of 6 cm and 8 cm, drawn to scale; the hypotenuse c is 10 cm.
const tri68 = figure('t', [triangle({ A: [0, 0], B: [8, 0], C: [0, 6], right: 'A', sides: { AB: '8 \\text{ cm}', CA: '6 \\text{ cm}', BC: 'c' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 400);

// Legs of 5 m and 9 m, drawn to scale; the hypotenuse is √106 ≈ 10.3 m.
const tri59 = figure('t', [triangle({ A: [0, 0], B: [9, 0], C: [0, 5], right: 'A', sides: { AB: '9 \\text{ m}', CA: '5 \\text{ m}', BC: 'c' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 340);

const video: Explainer = {
  id: 'm8-1-3-c',
  lessonId: 'm8-1-3',
  title: 'The Pythagorean Theorem, Part 3: Finding the Hypotenuse',
  thumbnailTitle: 'Finding the Hypotenuse',
  thumbnail: 't',
  summary:
    'To find the hypotenuse, square the two legs, add, then take the square root. Legs of 6 cm and 8 cm give c² = 36 + 64 = 100, so c = 10 cm. Legs of 5 m and 9 m give c² = 25 + 81 = 106, so c = √106 ≈ 10.2956, about 10.3 m: use the square root key and round only at the end. The hypotenuse must be longer than each leg.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 3', title: 'Finding the Hypotenuse', subtitle: 'Square, add, square root' }],
      lines: [
        { say: 'If you know the two legs of a right triangle, the Pythagorean theorem tells you how long the hypotenuse is, without measuring it.', show: 'title' },
        { say: 'In this part, you will find the hypotenuse in three steps: square the legs, add, then take the square root.' },
      ],
    },
    {
      chapter: 'Legs of 6 and 8',
      layout: 'split',
      leftWidth: 520,
      left: [tri68],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['c^2 = 6^2 + 8^2', 'c^2 = 36 + 64 = 100', 'c = \\sqrt{100} = 10'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The hypotenuse is $10\\ \\text{cm}$ long.' },
      ],
      lines: [
        { say: 'A right triangle has legs of six centimetres and eight centimetres. How long is the hypotenuse?', show: 't.shape' },
        { say: 'Write the Pythagorean theorem with the legs filled in: c squared equals six squared plus eight squared.', show: 'm.0', focus: ['m.0', 't.BC'] },
        { say: 'Six squared is thirty-six, and eight squared is sixty-four. Add them: c squared is one hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'c squared is one hundred, so c is the square root of one hundred, which is ten.', show: 'm.2', focus: 'm.2' },
        { say: 'The hypotenuse is ten centimetres long.', show: 'a' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'key', items: ['**1.** Square the two legs.', '**2.** **Add** the squares.', '**3.** Take the **square root**.'] },
      ],
      lines: [
        { say: 'Here are the steps for finding the hypotenuse. One: square the two legs.', show: 'key.0' },
        { say: 'Two: add the squares. That gives the area of the square on the hypotenuse.', show: 'key.1' },
        { say: 'Three: take the square root, to go from the area of that square back to its side.', show: 'key.2' },
      ],
    },
    {
      chapter: 'Rounding the answer',
      layout: 'split',
      leftWidth: 520,
      left: [tri59, { kind: 'calc', id: 'calc', keys: '√ 106', result: '10.29563014' }],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['c^2 = 5^2 + 9^2', 'c^2 = 25 + 81 = 106', 'c = \\sqrt{106} \\approx 10.2956', 'c \\approx 10.3'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The hypotenuse is about $10.3\\ \\text{m}$ long.' },
      ],
      lines: [
        { say: 'Most answers are not whole numbers. A right triangle has legs of five metres and nine metres. Find the hypotenuse to the nearest tenth of a metre.', show: 't.shape' },
        { say: 'c squared is five squared plus nine squared: twenty-five plus eighty-one, which is one hundred six.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'One hundred six is not a perfect square. It is between one hundred and one hundred twenty-one, so its square root is between ten and eleven.' },
        { say: 'Use the square root key on a calculator. The square root of one hundred six is about ten point two nine five six.', show: ['calc', 'm.2'], focus: 'm.2' },
        { say: 'Round only at the end. To the nearest tenth, the hypotenuse is about ten point three metres.', show: ['m.3', 'a'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Does the answer make sense?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does your answer make sense?', md: 'The hypotenuse must be **longer** than each leg. It must also be **shorter** than the two legs added together.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['9 < 10.3 < 5 + 9 = 14 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Always check that your answer makes sense. The hypotenuse is the longest side, so it must be longer than each leg.', show: 'tip' },
        { say: 'Ten point three is longer than nine, the longer leg. Good.', show: 'm', focus: 'm' },
        { say: 'And going straight along the hypotenuse is shorter than going along both legs, five plus nine, which is fourteen. Ten point three passes that test as well.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A right triangle has legs of $7\\ \\text{cm}$ and $24\\ \\text{cm}$. How long is the hypotenuse?',
          choices: ['$31\\ \\text{cm}$', '$625\\ \\text{cm}$', '$17\\ \\text{cm}$', '$25\\ \\text{cm}$'],
          answer: 3,
          working: '$c^2 = 7^2 + 24^2 = 49 + 576 = 625$, so $c = \\sqrt{625} = 25\\ \\text{cm}$, because $25 \\times 25 = 625$.',
        },
      ],
      lines: [
        { say: 'Your turn. A right triangle has legs of seven centimetres and twenty-four centimetres. How long is the hypotenuse? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twenty-five centimetres. Forty-nine plus five hundred seventy-six is six hundred twenty-five, and twenty-five times twenty-five is six hundred twenty-five. Choice B forgets to take the square root at the end.', show: 'q.answer' },
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
            'Hypotenuse: square the legs, **add**, then take the square root.',
            'Legs of $6$ and $8$: $c^2 = 36 + 64 = 100$, so $c = 10$.',
            'Use the $\\sqrt{\\ }$ key, and round only at the end: $\\sqrt{106} \\approx 10.3$.',
            'Check: the hypotenuse is longer than each leg.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the hypotenuse, square the two legs, add, then take the square root.', show: 'sum.0' },
        { say: 'Legs of six and eight give a hypotenuse of ten.', show: 'sum.1' },
        { say: 'When the answer is not a whole number, use the square root key, and round only at the end.', show: 'sum.2' },
        { say: 'And check that the hypotenuse is longer than each leg. In the next part, you will find a missing leg. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
