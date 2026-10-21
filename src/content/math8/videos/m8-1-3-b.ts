import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squaresOnSides } from '@/video/triangles.ts';

// A 3-4-5 right triangle with a square on each side: 9 + 16 = 25.
const sq345 = figure('sq', [squaresOnSides({ a: 3, b: 4, areas: { a: '9', b: '16', c: '25' } })]);

// A 6-8-10 right triangle with a square on each side: 36 + 64 = 100.
const sq6810 = figure('sq', [squaresOnSides({ a: 6, b: 8, areas: { a: '36', b: '64', c: '100' } })]);

const video: Explainer = {
  id: 'm8-1-3-b',
  lessonId: 'm8-1-3',
  title: 'The Pythagorean Theorem, Part 2: Squares on the Sides',
  thumbnailTitle: 'Squares on the Sides',
  thumbnail: 'sq',
  summary:
    'Draw a square on each side of a right triangle with legs of 3 and 4 units: the squares on the legs have areas of 9 and 16, and the square on the hypotenuse has an area of 25, and 9 + 16 = 25. This is the Pythagorean theorem: in a right triangle with legs a and b and hypotenuse c, a² + b² = c². The areas of the squares on the legs add up to the area of the square on the hypotenuse. It works for a 6-8-10 triangle too: 36 + 64 = 100.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Squares, Square Roots and the Pythagorean Theorem · Part 2', title: 'Squares on the Sides', subtitle: 'Discovering the Pythagorean theorem' }],
      lines: [
        { say: 'Long ago, people noticed something amazing about right triangles. It has to do with squares.', show: 'title' },
        { say: 'In this part, you will draw a square on each side of a right triangle, count the unit squares, and discover the Pythagorean theorem.' },
      ],
    },
    {
      chapter: 'A square on each side',
      layout: 'split',
      leftWidth: 560,
      left: [sq345],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\opp{3^2 = 9}', '\\adj{4^2 = 16}', '\\hyp{5^2 = 25}', '9 + 16 = 25'] }],
      lines: [
        { say: 'Here is a right triangle with legs of three units and four units. Its hypotenuse is five units long.', show: 'sq.tri' },
        { say: 'Draw a square on the leg of three. It is three by three, so it holds nine unit squares. Its area is nine.', show: ['sq.sq-a', 'm.0'], focus: ['sq.sq-a', 'm.0'] },
        { say: 'Draw a square on the leg of four. It is four by four, with an area of sixteen.', show: ['sq.sq-b', 'm.1'], focus: ['sq.sq-b', 'm.1'] },
        { say: 'Now draw a square on the hypotenuse. It is five by five, with an area of twenty-five.', show: ['sq.sq-c', 'm.2'], focus: ['sq.sq-c', 'm.2'] },
        { say: 'Look at the areas. Nine plus sixteen is twenty-five! The two squares on the legs together have exactly the same area as the square on the hypotenuse.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The Pythagorean theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pythagorean theorem', md: 'In a right triangle with legs $a$ and $b$ and hypotenuse $c$, the areas of the squares on the two legs add up to the area of the square on the hypotenuse:' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['a^2 + b^2 = c^2'] },
      ],
      lines: [
        { say: 'This works for every right triangle, not just this one. It is called the Pythagorean theorem, after Pythagoras, a teacher who lived long ago. A theorem is a rule that has been proved to be true.', show: 'def' },
        { say: 'Call the legs "a" and b, and the hypotenuse c. Then "a" squared plus b squared equals c squared.', show: 'm', focus: 'm' },
        { say: 'In words: the areas of the squares on the two legs add up to the area of the square on the hypotenuse.' },
        { say: 'Remember, c is always the hypotenuse, the side across from the right angle. And the rule is only true for right triangles.' },
      ],
    },
    {
      chapter: 'Another right triangle',
      layout: 'split',
      leftWidth: 560,
      left: [sq6810],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['6^2 + 8^2 = 36 + 64', '= 100', '10^2 = 100 \\ \\good{\\checkmark}'] }],
      lines: [
        { say: 'Let’s check with another right triangle. Its legs are six units and eight units, and its hypotenuse is ten units.', show: 'sq.tri' },
        { say: 'The squares on the legs have areas of thirty-six and sixty-four. Together, that is one hundred.', show: ['sq.sq-a', 'sq.sq-b', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The square on the hypotenuse is ten by ten, which is also one hundred. It works again!', show: ['sq.sq-c', 'm.2'], focus: ['sq.sq-c', 'm.2'] },
        { say: 'In the next parts, you will turn this around, and use the theorem to find a side you do not know.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The squares on the two legs of a right triangle have areas of $25\\ \\text{cm}^2$ and $144\\ \\text{cm}^2$. What is the area of the square on the hypotenuse?',
          choices: ['$119\\ \\text{cm}^2$', '$17\\ \\text{cm}^2$', '$169\\ \\text{cm}^2$', '$13\\ \\text{cm}^2$'],
          answer: 2,
          working: 'The areas of the squares on the legs add up to the area of the square on the hypotenuse: $25 + 144 = 169\\ \\text{cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. The squares on the two legs of a right triangle have areas of twenty-five and one hundred forty-four square centimetres. What is the area of the square on the hypotenuse? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, one hundred sixty-nine square centimetres. The two smaller areas add up to the big one: twenty-five plus one hundred forty-four. Choice D, thirteen, is the length of the hypotenuse, not the area of its square.', show: 'q.answer' },
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
            'Squares on a $3$-$4$-$5$ right triangle: $9 + 16 = 25$.',
            '**Pythagorean theorem:** $a^2 + b^2 = c^2$, where $c$ is the hypotenuse.',
            'The squares on the legs add up to the square on the hypotenuse.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a right triangle with sides of three, four and five, the squares have areas of nine, sixteen and twenty-five, and nine plus sixteen is twenty-five.', show: 'sum.0' },
        { say: 'The Pythagorean theorem says "a" squared plus b squared equals c squared, where c is the hypotenuse.', show: 'sum.1' },
        { say: 'The squares on the legs add up to the square on the hypotenuse. In the next part, you will use the theorem to find the hypotenuse. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
