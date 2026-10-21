import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sides } from '@/content/math6/videos/lib/m6-6-figures.ts';

type P = [number, number];
const CORNERS: P[] = [
  [0, 0],
  [9, 0],
  [3.5, 4.5],
];

// A triangle with sides x + 4, 2x + 1 and 3x − 2.
const warm = (id: string) => figure(id, [sides({ corners: CORNERS, labels: ['2x + 1', '3x - 2', 'x + 4'] })], 340);

// The triangular sign: two sides known, the third side unknown.
const sign = (id: string) =>
  figure(
    id,
    [
      sides({
        corners: CORNERS,
        labels: ['(x^2 + 3x + 1)\\text{ cm}', '?', '(2x^2 + x + 2)\\text{ cm}'],
        tones: ['brand', 'theta', 'brand'],
      }),
    ],
    320,
  );

const video: Explainer = {
  id: 'm9-5-3-c',
  lessonId: 'm9-5-3',
  title: 'Adding and Subtracting Polynomials, Part 3: Solving Problems',
  thumbnailTitle: 'Perimeters and Missing Sides',
  thumbnail: 'sg',
  summary:
    'The perimeter is the sum of the sides, so a perimeter is found by adding polynomials, and a missing side is the perimeter minus the sides you know. For a triangular sign with perimeter (4x² + 9x + 5) cm and sides (x² + 3x + 1) cm and (2x² + x + 2) cm, the third side is (4x² + 9x + 5) − (x² + 3x + 1) − (2x² + x + 2) = (x² + 5x + 2) cm. Adding the three sides gives the perimeter back, and x = 2 checks it with numbers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 3', title: 'Solving Problems', subtitle: 'Perimeters and missing sides' }],
      lines: [
        { say: 'The perimeter of a shape is the distance all the way around it: the sum of its sides. When the sides are polynomials, the perimeter is a polynomial as well.', show: 'title' },
        { say: 'In this part, you will add polynomials to find a perimeter, and subtract them to find a missing side.' },
      ],
    },
    {
      chapter: 'Perimeter',
      layout: 'center',
      main: [warm('wm'), { kind: 'math', id: 'm', size: 'lg', lines: ['P = (x + 4) + (2x + 1) + (3x - 2)', '= (x + 2x + 3x) + (4 + 1 - 2) = 6x + 3'] }],
      lines: [
        { say: 'This triangle has sides of x plus four, two x plus one, and three x minus two, all in centimetres.', show: 'wm' },
        { say: 'Its perimeter is the sum of the three sides.', show: 'm.0', focus: 'm.0' },
        { say: 'Collect the like terms. One x plus two x plus three x is six x. Four plus one minus two is three. So the perimeter is six x plus three centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A missing side',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The perimeter of a triangular sign is $(4x^2 + 9x + 5)$ cm. Two of its sides measure $(x^2 + 3x + 1)$ cm and $(2x^2 + x + 2)$ cm. Write an expression for the third side.' },
        sign('sg'),
      ],
      lines: [
        { say: 'Now turn it around. The perimeter of a triangular sign is four x squared, plus nine x, plus five, centimetres.', show: 'q' },
        { say: 'Two of its sides measure x squared, plus three x, plus one, and two x squared, plus x, plus two, centimetres. Write an expression for the third side.', show: 'sg' },
        { say: 'The three sides add up to the perimeter. So the missing side is the perimeter, minus the two sides you know.', focus: 'sg.l1' },
      ],
    },
    {
      chapter: 'Subtract the known sides',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{third side} = (4x^2 + 9x + 5) - (x^2 + 3x + 1) - (2x^2 + x + 2)',
            '= 4x^2 + 9x + 5 \\bad{\\,-\\,x^2 - 3x - 1} \\bad{\\,-\\,2x^2 - x - 2}',
            '= \\adj{(4x^2 - x^2 - 2x^2)} + \\good{(9x - 3x - x)} + \\opp{(5 - 1 - 2)}',
            '= \\adj{x^2} + \\good{5x} + \\opp{2}',
          ],
        },
      ],
      lines: [
        { say: 'Write the subtraction: the perimeter, minus the first side, minus the second side.', show: 'm.0', focus: 'm.0' },
        { say: 'Change the sign of every term being subtracted. Both sides lose their brackets, and every one of their terms becomes negative.', show: 'm.1', focus: 'm.1' },
        { say: 'Group the like terms.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the coefficients. Four minus one minus two is one, so x squared. Nine minus three minus one is five, so five x. Five minus one minus two is two.', show: 'm.3', focus: 'm.3' },
        { say: 'The third side is x squared, plus five x, plus two, centimetres.' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['(x^2 + 3x + 1) + (2x^2 + x + 2) + (x^2 + 5x + 2)', '= 4x^2 + 9x + 5 \\;\\good{\\checkmark}', 'x = 2\\text{: sides } 11, \\; 12 \\text{ and } 16 \\text{ cm}', '11 + 12 + 16 = 39 \\qquad 4(4) + 9(2) + 5 = 39 \\;\\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Check by adding all three sides. One x squared plus two x squared plus one x squared is four x squared. Three x plus x plus five x is nine x. One plus two plus two is five. That is the perimeter.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'You can check with numbers as well. If x is two, the sides are eleven, twelve and sixteen centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'They add up to thirty-nine centimetres. And the perimeter, four times four, plus nine times two, plus five, is thirty-nine as well. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has a perimeter of $(5x^2 + 7x + 4)$ m. Two of its sides measure $(2x^2 + x + 1)$ m and $(x^2 + 4x)$ m. What is the third side?',
          choices: ['$(8x^2 + 12x + 5)$ m', '$(2x^2 + 4x + 5)$ m', '$(3x^2 + 6x + 3)$ m', '$(2x^2 + 2x + 3)$ m'],
          answer: 3,
          working: 'Subtract both sides, changing the sign of every term: $5x^2 + 7x + 4 - 2x^2 - x - 1 - x^2 - 4x$, which is $2x^2 + 2x + 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has a perimeter of five x squared, plus seven x, plus four, metres. Two of its sides measure two x squared, plus x, plus one, and x squared plus four x, metres. What is the third side? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Subtract both sides from the perimeter, changing the sign of every term: two x squared, plus two x, plus three. Choice B changes the sign of only the first term of the first side.', show: 'q.answer' },
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
            'The perimeter is the sum of the sides: add the polynomials.',
            'A missing side is the perimeter minus the sides you know.',
            'Change the sign of every term being subtracted.',
            'Check by adding all the sides, or by substituting a number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The perimeter is the sum of the sides, so you add the polynomials.', show: 'sum.0' },
        { say: 'A missing side is the perimeter minus the sides you know.', show: 'sum.1' },
        { say: 'Change the sign of every term being subtracted.', show: 'sum.2' },
        { say: 'And check by adding all the sides, or by substituting a number. In the next lesson, you will multiply and divide polynomials. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
