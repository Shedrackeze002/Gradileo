import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rootSquare } from './lib/m9-1-figures.ts';

// A square of area 1 cut into 16 small squares, with 9 of them shaded as a 3 by 3 square.
const sixteenths = figure('g', [rootSquare({ n: 4, k: 3, labels: { side: '\\dfrac{3}{4}', up: '\\dfrac{3}{4}', whole: '1', wholeUp: '1', area: '\\dfrac{9}{16}' } })], 500);

const video: Explainer = {
  id: 'm9-1-1-b',
  lessonId: 'm9-1-1',
  title: 'Square Roots of Perfect Squares, Part 2: Square Roots of Fractions',
  thumbnailTitle: 'Square Roots of Fractions',
  thumbnail: 'g',
  summary:
    'To find the square root of a fraction, take the square root of the numerator and of the denominator: √(9/16) = √9 / √16 = 3/4, which a square cut into 16 shows. If they are not perfect squares, write the fraction in lowest terms first: 8/18 = 4/9, so √(8/18) = 2/3. Take the root of the top and the bottom, not the top only, and check by squaring.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 2', title: 'Square Roots of Fractions', subtitle: 'Top and bottom, in lowest terms' }],
      lines: [
        { say: 'In the last part, you saw that four ninths is two thirds squared, using a square cut into nine.', show: 'title' },
        { say: 'In this part, you will find the square root of any fraction that is a perfect square, step by step, without drawing a picture every time.' },
      ],
    },
    {
      chapter: 'Nine sixteenths',
      layout: 'split',
      leftWidth: 560,
      left: [sixteenths],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{3}{4} \\times \\dfrac{3}{4} = \\dfrac{9}{16}', '\\sqrt{\\dfrac{9}{16}} = \\dfrac{3}{4}'] }],
      lines: [
        { say: 'What is the square root of nine sixteenths? Start with a square of area one, cut into sixteen equal small squares, four along each side.', show: ['g.grid', 'g.whole', 'g.wholeUp'] },
        { say: 'Shade nine of them as a square. It is three small squares wide and three tall.', show: 'g.shade', focus: 'g.shade' },
        { say: 'Each side is three of the four equal parts, so it is three quarters long. The area is nine of the sixteen small squares: nine sixteenths.', show: ['g.side', 'g.up', 'g.area'], focus: ['g.side', 'g.up', 'g.area'] },
        { say: 'So three quarters times three quarters is nine sixteenths, and the square root of nine sixteenths is three quarters.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Top and bottom',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Square root of a fraction', md: 'Take the square root of the **numerator** (the top) and the square root of the **denominator** (the bottom).' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{\\dfrac{9}{16}} = \\dfrac{\\sqrt{9}}{\\sqrt{16}} = \\dfrac{3}{4}', '\\sqrt{\\dfrac{25}{36}} = \\dfrac{\\sqrt{25}}{\\sqrt{36}} = \\dfrac{5}{6}'] },
      ],
      lines: [
        { say: 'Look at the numbers. Nine is three squared, and sixteen is four squared. The square root of nine sixteenths is three over four.', show: 'm.0', focus: 'm.0' },
        { say: 'So here is the rule. To find the square root of a fraction, take the square root of the numerator, which is the top number, and the square root of the denominator, which is the bottom number.', show: 'key' },
        { say: 'Try twenty-five thirty-sixths. The square root of twenty-five is five, and the square root of thirty-six is six. So the square root is five sixths.', show: 'm.1', focus: 'm.1' },
        { say: 'Check by squaring. Five sixths times five sixths is twenty-five thirty-sixths. It works.' },
      ],
    },
    {
      chapter: 'Lowest terms first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $\\sqrt{\\dfrac{8}{18}}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\dfrac{8}{18} = \\dfrac{8 \\div 2}{18 \\div 2} = \\dfrac{4}{9}', '\\sqrt{\\dfrac{4}{9}} = \\dfrac{\\sqrt{4}}{\\sqrt{9}} = \\dfrac{2}{3}', '\\text{Check: } \\left(\\dfrac{2}{3}\\right)^2 = \\dfrac{4}{9} = \\dfrac{8}{18} \\ \\good{\\checkmark}'],
        },
      ],
      lines: [
        { say: 'Now find the square root of eight eighteenths. Eight is not a perfect square, and neither is eighteen. Are we stuck?', show: 'q' },
        { say: 'No. First, write the fraction in lowest terms. Divide the top and the bottom by two. Eight eighteenths is equal to four ninths.', show: 'm.0', focus: 'm.0' },
        { say: 'Four and nine are both perfect squares. The square root of four is two, and the square root of nine is three. So the square root is two thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'Check. Two thirds squared is four ninths, which is equal to eight eighteenths. So the square root of eight eighteenths is two thirds.', show: 'm.2', focus: 'm.2' },
        { say: 'Remember: a fraction in lowest terms is a perfect square when its top and its bottom are both perfect squares.' },
      ],
    },
    {
      chapter: 'Root of the top only',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Taking the root of the top only', md: '$\\sqrt{\\tfrac{9}{16}}$ is **not** $\\tfrac{3}{16}$. Take the square root of the top **and** of the bottom.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{3}{16} \\times \\dfrac{3}{16} = \\dfrac{9}{256}}', '\\good{\\dfrac{3}{4} \\times \\dfrac{3}{4} = \\dfrac{9}{16}}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Some people take the square root of the top number only, and say that the square root of nine sixteenths is three sixteenths.', show: 'oops' },
        { say: 'Check by squaring. Three sixteenths times three sixteenths is nine over two hundred fifty-six, not nine sixteenths.', show: 'm.0', focus: 'm.0' },
        { say: 'The square root of the bottom number is needed as well. Three quarters times three quarters is nine sixteenths, so three quarters is right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\sqrt{\\dfrac{18}{50}}$.',
          choices: ['$\\dfrac{9}{25}$', '$\\dfrac{3}{25}$', '$\\dfrac{9}{5}$', '$\\dfrac{3}{5}$'],
          answer: 3,
          working: 'In lowest terms, $\\dfrac{18}{50} = \\dfrac{9}{25}$. Then $\\sqrt{9} = 3$ and $\\sqrt{25} = 5$, so the square root is $\\dfrac{3}{5}$. Check: $\\left(\\dfrac{3}{5}\\right)^2 = \\dfrac{9}{25} = \\dfrac{18}{50}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the square root of eighteen over fifty. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three fifths. In lowest terms, eighteen over fifty is nine over twenty-five. The square root of nine is three, and the square root of twenty-five is five. Choice A, nine over twenty-five, is only the fraction in lowest terms. Its square root is still to be found.', show: 'q.answer' },
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
            'Square root of a fraction: the root of the top over the root of the bottom: $\\sqrt{\\tfrac{9}{16}} = \\tfrac{3}{4}$.',
            'Write the fraction in lowest terms first: $\\tfrac{8}{18} = \\tfrac{4}{9}$, so $\\sqrt{\\tfrac{8}{18}} = \\tfrac{2}{3}$.',
            'Take the root of the top **and** the bottom, and check by squaring.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the square root of a fraction, take the square root of the top and the square root of the bottom.', show: 'sum.0' },
        { say: 'If they are not perfect squares, write the fraction in lowest terms first. Eight eighteenths is four ninths, so its square root is two thirds.', show: 'sum.1' },
        { say: 'Take the root of both numbers, and check by squaring. In the next part, you will find square roots of decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
