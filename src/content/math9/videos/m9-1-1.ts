import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rootSquare } from './lib/m9-1-figures.ts';

// A square of area 1 cut into 100 small squares, with 49 of them shaded as a 7 by 7 square.
const grid49 = figure('g', [rootSquare({ n: 10, k: 7, labels: { side: '0.7', up: '0.7', whole: '1', wholeUp: '1', area: '0.49' } })], 500);
// The same square with 25 small squares shaded as a 5 by 5 square.
const grid25 = figure('g', [rootSquare({ n: 10, k: 5, labels: { side: '0.5', up: '0.5', whole: '1', wholeUp: '1', area: '0.25' } })], 500);
// A square of area 1 cut into 9 small squares, with 4 of them shaded as a 2 by 2 square.
const ninths = figure('g', [rootSquare({ n: 3, k: 2, labels: { side: '\\dfrac{2}{3}', up: '\\dfrac{2}{3}', whole: '1', wholeUp: '1', area: '\\dfrac{4}{9}' } })], 500);

const video: Explainer = {
  id: 'm9-1-1',
  lessonId: 'm9-1-1',
  title: 'Square Roots of Perfect Squares, Part 1: Squares of Decimals and Fractions',
  thumbnailTitle: 'Squares of Decimals and Fractions',
  thumbnail: 'g',
  summary:
    'A square with an area of 1 cut into 100 small squares shows that 49 small squares make a square 0.7 wide, so 0.7² = 0.49 and √0.49 = 0.7. In the same way 0.5² = 0.25, and a square cut into nine shows that (2/3)² = 4/9. A perfect square is the square of another number, which can now be a decimal or a fraction, and its square root is the number that multiplies by itself to give it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 1', title: 'Squares of Decimals and Fractions', subtitle: 'Seeing a square root in a square' }],
      lines: [
        { say: 'A square floor tile, a square photo and a square garden all share one fact: the length of a side is the square root of the area.', show: 'title' },
        { say: 'You already know square roots of whole numbers. The square root of forty-nine is seven, because seven times seven is forty-nine.' },
        { say: 'In this lesson, you will find square roots of decimals and fractions. This first part shows what they look like, using squares.' },
      ],
    },
    {
      chapter: 'A hundred small squares',
      layout: 'split',
      leftWidth: 560,
      left: [grid49],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['0.7 \\times 0.7 = 0.49', '0.7^2 = 0.49', '\\sqrt{0.49} = 0.7'] }],
      lines: [
        { say: 'Picture a square with an area of exactly one square unit. Each side is one unit long.', show: ['g.grid', 'g.whole', 'g.wholeUp'] },
        { say: 'Cut it into one hundred equal small squares, ten along each side. Each small square is one hundredth of the whole, and its sides are one tenth long.' },
        { say: 'Now shade forty-nine of the small squares, set out as a square. The shaded square is seven small squares wide, and seven small squares tall.', show: 'g.shade', focus: 'g.shade' },
        { say: 'Seven tenths is zero point seven. So each side of the shaded square is zero point seven units long.', show: ['g.side', 'g.up'], focus: ['g.side', 'g.up'] },
        { say: 'It covers forty-nine of the one hundred small squares, so its area is zero point four nine.', show: 'g.area', focus: 'g.area' },
        { say: 'The area of a square is the side times the side. So zero point seven times zero point seven is zero point four nine.', show: 'm.0', focus: 'm.0' },
        { say: 'In other words, zero point seven squared is zero point four nine, and the square root of zero point four nine is zero point seven.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Perfect squares and square roots',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sq', tone: 'definition', title: 'Perfect square', md: 'A **perfect square** is a number that is the square of another number. That number can be a decimal or a fraction: $0.49 = 0.7^2$.' },
        { kind: 'callout', id: 'rt', tone: 'definition', title: 'Square root', md: 'The **square root** of a number is a number that, multiplied by itself, gives the original number: $\\sqrt{0.49} = 0.7$, because $0.7 \\times 0.7 = 0.49$.' },
      ],
      lines: [
        { say: 'Numbers like zero point four nine have a name. A perfect square is a number that is the square of another number.', show: 'sq' },
        { say: 'Before, that other number was always a whole number, like seven. Now it can be a decimal or a fraction as well. Zero point four nine is a perfect square, because it is zero point seven squared.' },
        { say: 'The square root of a number is a number that, multiplied by itself, gives the original number.', show: 'rt' },
        { say: 'The square root of zero point four nine is zero point seven, because zero point seven times zero point seven is zero point four nine.' },
      ],
    },
    {
      chapter: 'Twenty-five small squares',
      layout: 'split',
      leftWidth: 560,
      left: [grid25],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['0.5 \\times 0.5 = 0.25', '\\sqrt{0.25} = 0.5'] }],
      lines: [
        { say: 'Let’s try another one. Start with the same square of area one, cut into one hundred small squares.', show: ['g.grid', 'g.whole', 'g.wholeUp'] },
        { say: 'This time, shade twenty-five small squares as a square. It is five small squares wide, and five tall.', show: 'g.shade', focus: 'g.shade' },
        { say: 'Five tenths is zero point five, so its sides are zero point five long. It covers twenty-five of the one hundred small squares, so its area is zero point two five.', show: ['g.side', 'g.up', 'g.area'], focus: ['g.side', 'g.up', 'g.area'] },
        { say: 'So zero point five times zero point five is zero point two five. The square root of zero point two five is zero point five.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Look at the picture. The shaded square covers one quarter of the whole square, and one half times one half is one quarter.' },
      ],
    },
    {
      chapter: 'Four ninths',
      layout: 'split',
      leftWidth: 560,
      left: [ninths],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{2}{3} \\times \\dfrac{2}{3} = \\dfrac{4}{9}', '\\left(\\dfrac{2}{3}\\right)^2 = \\dfrac{4}{9}', '\\sqrt{\\dfrac{4}{9}} = \\dfrac{2}{3}'] }],
      lines: [
        { say: 'Fractions work the same way. Take a square with an area of one, and cut it into nine equal small squares, three along each side.', show: ['g.grid', 'g.whole', 'g.wholeUp'] },
        { say: 'Shade four of them as a square, two small squares wide and two tall.', show: 'g.shade', focus: 'g.shade' },
        { say: 'Each side of the shaded square is two of the three equal parts of a side. So it is two thirds long.', show: ['g.side', 'g.up'], focus: ['g.side', 'g.up'] },
        { say: 'The shaded square covers four of the nine small squares, so its area is four ninths.', show: 'g.area', focus: 'g.area' },
        { say: 'So two thirds times two thirds is four ninths. In other words, two thirds squared is four ninths.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Four ninths is a perfect square, and its square root is two thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check by squaring',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by squaring', md: 'To check a square root, multiply it by itself. You should get back the number you started with.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{0.49} = 0.7 \\qquad \\text{Check: } 0.7 \\times 0.7 = 0.49 \\ \\good{\\checkmark}', '\\sqrt{\\dfrac{4}{9}} = \\dfrac{2}{3} \\qquad \\text{Check: } \\dfrac{2}{3} \\times \\dfrac{2}{3} = \\dfrac{4}{9} \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Squaring and taking the square root undo each other. That gives you an easy way to check your work.', show: 'tip' },
        { say: 'Multiply your square root by itself. You should get back the number you started with.' },
        { say: 'Zero point seven times zero point seven is zero point four nine. And two thirds times two thirds is four ninths. Both check out.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square of area $1$ is cut into $100$ small squares. $64$ of them are shaded as a square. What is $\\sqrt{0.64}$?',
          choices: ['$0.32$', '$0.8$', '$0.08$', '$8$'],
          answer: 1,
          working: 'The shaded square is $8$ small squares wide, and $8$ tenths is $0.8$. Check: $0.8 \\times 0.8 = 0.64$.',
        },
      ],
      lines: [
        { say: 'Your turn. A square of area one is cut into one hundred small squares. Sixty-four of them are shaded as a square. What is the square root of zero point six four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, zero point eight. The shaded square is eight small squares wide, and eight tenths is zero point eight. Choice A, zero point three two, is half of zero point six four, and a square root is not half the number.', show: 'q.answer' },
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
            'In a square of area $1$ cut into $100$, a square of $49$ small squares has sides of $0.7$: $0.7^2 = 0.49$.',
            'A **perfect square** is the square of another number, which can be a decimal or a fraction.',
            'The **square root** multiplies by itself to give the number: $\\sqrt{\\tfrac{4}{9}} = \\tfrac{2}{3}$.',
            'Check a square root by squaring it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a square of area one cut into one hundred small squares, forty-nine small squares make a square with sides of zero point seven.', show: 'sum.0' },
        { say: 'A perfect square is the square of another number, and that number can be a decimal or a fraction.', show: 'sum.1' },
        { say: 'The square root of a number multiplies by itself to give the number. The square root of four ninths is two thirds.', show: 'sum.2' },
        { say: 'And always check a square root by squaring it. In the next part, you will find square roots of fractions step by step. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
