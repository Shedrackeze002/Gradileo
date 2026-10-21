import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squaresOnSides, triangle } from '@/video/triangles.ts';

// The square on the hypotenuse (25) less the square on one leg (9) leaves the other (16).
const sq345 = figure('sq', [squaresOnSides({ a: 3, b: 4, areas: { a: '9', b: '16', c: '25' } })]);

// A hypotenuse of 13 ft and a leg of 5 ft, drawn to scale; the other leg x is 12 ft.
const tri = figure('t', [triangle({ A: [0, 0], B: [12, 0], C: [0, 5], right: 'A', sides: { AB: 'x', CA: '5 \\text{ ft}', BC: '13 \\text{ ft}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 320);

// A hypotenuse of 15 cm and a leg of 9.5 cm, drawn to scale; the other leg is about 11.6 cm.
const tri2 = figure('t', [triangle({ A: [0, 0], B: [Math.sqrt(134.75), 0], C: [0, 9.5], right: 'A', sides: { AB: 'x', CA: '9.5 \\text{ cm}', BC: '15 \\text{ cm}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } })], 400);

const video: Explainer = {
  id: 'm8-1-3-d',
  lessonId: 'm8-1-3',
  title: 'The Pythagorean Theorem, Part 4: Finding a Leg',
  thumbnailTitle: 'Finding a Leg',
  thumbnail: 't',
  summary:
    'When you know the hypotenuse and one leg, subtract: a² + b² = c², so b² = c² − a². A hypotenuse of 13 ft and a leg of 5 ft give x² = 169 − 25 = 144, so x = 12 ft. A hypotenuse of 15 cm and a leg of 9.5 cm give x² = 225 − 90.25 = 134.75, so x ≈ 11.6 cm. Adding the squares instead gives a "leg" longer than the hypotenuse, which is impossible.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 4', title: 'Finding a Leg', subtitle: 'Subtract instead of adding' }],
      lines: [
        { say: 'Sometimes you know the hypotenuse and one leg of a right triangle, and the missing side is the other leg.', show: 'title' },
        { say: 'In this part, you will find a leg by subtracting the squares instead of adding them.' },
      ],
    },
    {
      chapter: 'Subtract for a leg',
      layout: 'split',
      leftWidth: 560,
      left: [sq345],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\hyp{25} - \\opp{9} = \\adj{16}', 'a^2 + b^2 = c^2', 'b^2 = c^2 - a^2'] }],
      lines: [
        { say: 'Remember the squares on the sides. The square on the hypotenuse has the same area as the two squares on the legs together.', show: ['sq.tri', 'sq.sq-a', 'sq.sq-b', 'sq.sq-c'] },
        { say: 'So if you know the big square and one small square, subtract to find the other one. Twenty-five minus nine is sixteen.', show: 'm.0', focus: ['m.0', 'sq.sq-b'] },
        { say: 'As a rule: if "a" squared plus b squared equals c squared, then b squared equals c squared minus "a" squared.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'To find the hypotenuse, you add. To find a leg, you subtract.' },
      ],
    },
    {
      chapter: 'A whole-number leg',
      layout: 'split',
      leftWidth: 520,
      left: [tri],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['5^2 + x^2 = 13^2', 'x^2 = 13^2 - 5^2', 'x^2 = 169 - 25 = 144', 'x = \\sqrt{144} = 12'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The other leg is $12\\ \\text{ft}$ long.' },
      ],
      lines: [
        { say: 'The hypotenuse of a right triangle is thirteen feet, and one leg is five feet. Find the other leg, x.', show: 't.shape' },
        { say: 'Start with the theorem: five squared plus x squared equals thirteen squared.', show: 'm.0', focus: 'm.0' },
        { say: 'To get x squared on its own, subtract: x squared is thirteen squared minus five squared.', show: 'm.1', focus: 'm.1' },
        { say: 'That is one hundred sixty-nine minus twenty-five, which is one hundred forty-four.', show: 'm.2', focus: 'm.2' },
        { say: 'The square root of one hundred forty-four is twelve. The other leg is twelve feet long. Check: twelve is shorter than the hypotenuse, as a leg should be.', show: ['m.3', 'a'], focus: ['m.3', 't.AB'] },
      ],
    },
    {
      chapter: 'A leg with rounding',
      layout: 'split',
      leftWidth: 480,
      left: [tri2],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['x^2 = 15^2 - 9.5^2', 'x^2 = 225 - 90.25', 'x^2 = 134.75', 'x = \\sqrt{134.75} \\approx 11.608'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The other leg is about $11.6\\ \\text{cm}$ long.' },
      ],
      lines: [
        { say: 'The hypotenuse is fifteen centimetres, and one leg is nine point five centimetres. Find the other leg to the nearest tenth of a centimetre.', show: 't.shape' },
        { say: 'x squared is fifteen squared minus nine point five squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifteen squared is two hundred twenty-five. Nine point five squared is ninety point two five.', show: 'm.1', focus: 'm.1' },
        { say: 'Two hundred twenty-five minus ninety point two five is one hundred thirty-four point seven five.', show: 'm.2', focus: 'm.2' },
        { say: 'Its square root is about eleven point six zero eight. So the other leg is about eleven point six centimetres long, shorter than the hypotenuse.', show: ['m.3', 'a'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Adding when you should subtract',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding when you should subtract', md: 'If you add the squares when you are finding a **leg**, your answer will be longer than the hypotenuse. That is impossible. A leg is always **shorter** than the hypotenuse.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{13^2 + 5^2 = 194, \\quad \\sqrt{194} \\approx 13.9}', '13.9 > 13 \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. If you add the squares when you are finding a leg, your answer comes out longer than the hypotenuse.', show: 'oops' },
        { say: 'For example, adding thirteen squared and five squared gives one hundred ninety-four. Its square root is about thirteen point nine.', show: 'm.0', focus: 'm.0' },
        { say: 'That is longer than the hypotenuse, thirteen feet, which is impossible. A leg is always shorter than the hypotenuse.', show: 'm.1', focus: 'm.1' },
        { say: 'So when you are finding a leg, subtract, and check that your leg is shorter than the hypotenuse.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The hypotenuse of a right triangle is $10\\ \\text{m}$ and one leg is $6\\ \\text{m}$. How long is the other leg?',
          choices: ['$4\\ \\text{m}$', '$8\\ \\text{m}$', '$11.7\\ \\text{m}$', '$64\\ \\text{m}$'],
          answer: 1,
          working: '$x^2 = 10^2 - 6^2 = 100 - 36 = 64$, so $x = \\sqrt{64} = 8\\ \\text{m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The hypotenuse of a right triangle is ten metres, and one leg is six metres. How long is the other leg? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eight metres. One hundred minus thirty-six is sixty-four, and the square root of sixty-four is eight. Choice C adds the squares instead, and gives a leg longer than the hypotenuse.', show: 'q.answer' },
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
            'Pythagorean theorem: $a^2 + b^2 = c^2$, so a leg is $b^2 = c^2 - a^2$.',
            'Leg: square both sides you know, **subtract**, then take the square root.',
            'Hypotenuse: square the legs, **add**, then take the square root.',
            'Round only at the end, and check that a leg is shorter than the hypotenuse.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If "a" squared plus b squared equals c squared, then b squared equals c squared minus "a" squared.', show: 'sum.0' },
        { say: 'To find a leg, square both sides you know, subtract, then take the square root.', show: 'sum.1' },
        { say: 'To find the hypotenuse, square the legs, add, then take the square root.', show: 'sum.2' },
        { say: 'Round only at the end, and check that your answer makes sense. In the next lesson, you will use the theorem to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
