import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rootSquare } from './lib/m9-1-figures.ts';

// The square patio: an area of 12.5 m², with sides of about 3.54 m.
// Room is kept on the left for the label up the left side.
const patio = figure(
  'g',
  [rootSquare({ n: 1, k: 1, tone: 'brand', labels: { side: '\\approx 3.54\\text{ m}', up: '\\approx 3.54\\text{ m}', area: '12.5\\text{ m}^2' } }), { points: { room: [-2.4, 3] }, items: [] }],
  440,
);

const video: Explainer = {
  id: 'm9-1-2-b',
  lessonId: 'm9-1-2',
  title: 'Square Roots of Non-Perfect Squares, Part 2: Using a Calculator',
  thumbnailTitle: 'Square Roots on a Calculator',
  thumbnail: 'g',
  summary:
    'Estimate with benchmarks first, then use the square root key and round to the place asked for, and check by squaring: √2.7 ≈ 1.64 (1.64² = 2.6896), and for √(3/8) divide first, 3 ÷ 8 = 0.375, so √(3/8) ≈ 0.61. A square patio with an area of 12.5 m² has sides of about 3.54 m, between the benchmarks 3 and 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 2', title: 'Using a Calculator', subtitle: 'Estimate, press, round, check' }],
      lines: [
        { say: 'Benchmarks give a quick estimate of a square root. A calculator gets much closer.', show: 'title' },
        { say: 'In this part, you will use a calculator to find square roots to the nearest hundredth, and use your estimate to catch mistakes.' },
      ],
    },
    {
      chapter: 'The square root of 2.7',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'calc', id: 'calc', keys: '√(2.7)', result: '1.643167673' }],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\sqrt{2.7}$ to the nearest hundredth.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['1^2 = 1 \\qquad 2^2 = 4', '1 < \\sqrt{2.7} < 2', '\\sqrt{2.7} \\approx 1.64', '\\text{Check: } 1.64^2 = 2.6896'] },
      ],
      lines: [
        { say: 'Find the square root of two point seven to the nearest hundredth.', show: 'q' },
        { say: 'Estimate first. One squared is one, and two squared is four. Two point seven is between them, so its square root is between one and two.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Now press the square root key, then two point seven. The calculator shows one point six four three one, and more digits. That fits the estimate.', show: 'calc' },
        { say: 'To round to the nearest hundredth, look at the thousandths digit. It is three, which is less than five, so round down. The square root is about one point six four.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by squaring. One point six four squared is two point six eight nine six, which is close to two point seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A fraction',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'calc', id: 'calc', keys: '√(0.375)', result: '0.6123724357' }],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\sqrt{\\dfrac{3}{8}}$ to the nearest hundredth.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{3}{8} = 3 \\div 8 = 0.375', '0.6^2 = 0.36 \\qquad 0.7^2 = 0.49', '\\sqrt{\\dfrac{3}{8}} \\approx 0.61'] },
      ],
      lines: [
        { say: 'Next, find the square root of three eighths to the nearest hundredth.', show: 'q' },
        { say: 'Three and eight are not perfect squares, so divide first. Three divided by eight is zero point three seven five.', show: 'm.0', focus: 'm.0' },
        { say: 'Estimate. Zero point six squared is zero point three six, and zero point seven squared is zero point four nine. So the square root is between zero point six and zero point seven.', show: 'm.1', focus: 'm.1' },
        { say: 'The calculator shows zero point six one two three, and more digits. The thousandths digit is two, so round down. The square root of three eighths is about zero point six one.', show: ['calc', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Estimate first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate first', md: 'Estimate with benchmarks before you press any keys. If $\\sqrt{2.7}$ came out as $5.2$ or $0.52$, the benchmarks $1^2 = 1$ and $2^2 = 4$ show that something went wrong.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1 < \\sqrt{2.7} < 2', '\\bad{5.2 \\times} \\qquad \\bad{0.52 \\times} \\qquad \\good{1.64 \\ \\checkmark}'] },
      ],
      lines: [
        { say: 'It is easy to press a wrong key. That is why you estimate first.', show: 'tip' },
        { say: 'Suppose the calculator showed five point two, or zero point five two, for the square root of two point seven.', show: 'm.1', focus: 'm.1' },
        { say: 'The benchmarks say the answer must be between one and two. Neither of those fits, so you would know to try again. One point six four fits.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A square patio',
      layout: 'split',
      leftWidth: 500,
      left: [patio],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A square patio has an area of $12.5\\ \\text{m}^2$. How long is each side, to the nearest hundredth of a metre?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3^2 = 9 \\qquad 4^2 = 16', '\\sqrt{12.5} = 3.5355\\ldots', '\\text{side} \\approx 3.54\\text{ m}'] },
      ],
      lines: [
        { say: 'A square patio has an area of twelve point five square metres. How long is each side, to the nearest hundredth of a metre?', show: ['q', 'g.grid', 'g.shade', 'g.area'] },
        { say: 'The side of a square is the square root of its area. Estimate first: three squared is nine, and four squared is sixteen. So the side is between three metres and four metres.', show: 'm.0', focus: 'm.0' },
        { say: 'On a calculator, the square root of twelve point five is three point five three five five, and more digits.', show: 'm.1', focus: 'm.1' },
        { say: 'The thousandths digit is five, so round up. Each side is about three point five four metres long, which fits the estimate.', show: ['m.2', 'g.side', 'g.up'], focus: ['m.2', 'g.side', 'g.up'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square tablecloth has an area of $2.2\\ \\text{m}^2$. How long is each side, to the nearest hundredth of a metre?',
          choices: ['$1.10\\text{ m}$', '$1.48\\text{ m}$', '$4.84\\text{ m}$', '$14.83\\text{ m}$'],
          answer: 1,
          working: '$1^2 = 1$ and $2^2 = 4$, so the side is between $1$ m and $2$ m. $\\sqrt{2.2} = 1.4832\\ldots \\approx 1.48$ m. Check: $1.48^2 = 2.1904$.',
        },
      ],
      lines: [
        { say: 'Your turn. A square tablecloth has an area of two point two square metres. How long is each side, to the nearest hundredth of a metre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, one point four eight metres. The square root of two point two is one point four eight three, and more digits. Choice C, four point eight four, is two point two squared, not its square root, and it is not between the benchmarks one and two.', show: 'q.answer' },
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
            'Estimate with benchmarks first: $1 < \\sqrt{2.7} < 2$.',
            'Use the square root key, round to the place asked for, and check by squaring: $\\sqrt{2.7} \\approx 1.64$.',
            'For a fraction, divide first: $\\tfrac{3}{8} = 0.375$, so $\\sqrt{\\tfrac{3}{8}} \\approx 0.61$.',
            'The side of a square is the square root of its area: $\\sqrt{12.5} \\approx 3.54$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Estimate with benchmarks before you press any keys.', show: 'sum.0' },
        { say: 'Then use the square root key, round to the place the question asks for, and check by squaring.', show: 'sum.1' },
        { say: 'For a fraction, divide the top by the bottom first.', show: 'sum.2' },
        { say: 'And the side of a square is the square root of its area. In the next part, you will work backwards, from a square root to the number. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
