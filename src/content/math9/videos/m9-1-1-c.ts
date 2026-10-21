import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rootSquare } from './lib/m9-1-figures.ts';

// A square 1.2 wide cut into 12 by 12 small squares (each 0.1 wide); the shaded 10 by 10 block is
// one whole, and all 144 small squares make 1.44.
const big = figure('g', [rootSquare({ n: 12, k: 10, labels: { side: '1', up: '1', whole: '1.2', wholeUp: '1.2', area: '1' } })], 500);

const video: Explainer = {
  id: 'm9-1-1-c',
  lessonId: 'm9-1-1',
  title: 'Square Roots of Perfect Squares, Part 3: Square Roots of Decimals',
  thumbnailTitle: 'Square Roots of Decimals',
  thumbnail: 'g',
  summary:
    'To find the square root of a decimal, write it as a fraction over 100 or 10 000, which are perfect squares: 1.44 = 144/100, so √1.44 = 12/10 = 1.2, and 0.0009 = 9/10 000, so √0.0009 = 3/100 = 0.03. A decimal perfect square has an even number of decimal places, and its square root has half as many. √0.4 is not 0.2, because 0.2² = 0.04.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 3', title: 'Square Roots of Decimals', subtitle: 'Write it over 100 or 10 000' }],
      lines: [
        { say: 'You can now find the square root of a fraction: take the square root of the top and of the bottom.', show: 'title' },
        { say: 'In this part, you will use that to find square roots of decimals, and you will learn a quick way to check your answer by counting decimal places.' },
      ],
    },
    {
      chapter: 'One point four four',
      layout: 'split',
      leftWidth: 560,
      left: [big],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $\\sqrt{1.44}$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['1.44 = \\dfrac{144}{100}', '\\sqrt{1.44} = \\dfrac{\\sqrt{144}}{\\sqrt{100}} = \\dfrac{12}{10}', '\\sqrt{1.44} = 1.2'] },
      ],
      lines: [
        { say: 'Find the square root of one point four four. First, write the decimal as a fraction. One point four four is one hundred forty-four over one hundred.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'One hundred forty-four is twelve squared, and one hundred is ten squared. So the square root is twelve over ten, which is one point two.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Here is a picture of it. The shaded square is one whole, with sides of one, cut into one hundred small squares.', show: ['g.grid', 'g.shade', 'g.side', 'g.up', 'g.area'], focus: 'g.shade' },
        { say: 'The big square is twelve small squares wide. That is twelve tenths, or one point two.', show: ['g.whole', 'g.wholeUp'], focus: ['g.whole', 'g.wholeUp'] },
        { say: 'It holds twelve times twelve, or one hundred forty-four small squares. Each is one hundredth, so its area is one point four four. One point two squared is one point four four.' },
      ],
    },
    {
      chapter: 'Over 100 or 10 000',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Square root of a decimal', md: 'Write the decimal as a fraction over $100$ or $10\\,000$. Both are perfect squares: $100 = 10^2$ and $10\\,000 = 100^2$.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $\\sqrt{0.0009}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.0009 = \\dfrac{9}{10\\,000}', '\\sqrt{0.0009} = \\dfrac{\\sqrt{9}}{\\sqrt{10\\,000}} = \\dfrac{3}{100} = 0.03', '\\text{Check: } 0.03 \\times 0.03 = 0.0009 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'That works for any decimal. Write it as a fraction over one hundred, or over ten thousand. Both are perfect squares: one hundred is ten squared, and ten thousand is one hundred squared.', show: 'key' },
        { say: 'Find the square root of zero point zero zero zero nine. It has four decimal places, so it is nine over ten thousand.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'The square root of nine is three, and the square root of ten thousand is one hundred. So the square root is three over one hundred, which is zero point zero three.', show: 'm.1', focus: 'm.1' },
        { say: 'Check. Zero point zero three times zero point zero three is zero point zero zero zero nine. Three times three is nine, and two decimal places plus two decimal places makes four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Count the decimal places',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Perfect square', 'Decimal places', 'Square root', 'Decimal places'],
          rows: [
            ['$1.44$', '$2$', '$1.2$', '$1$'],
            ['$0.0009$', '$4$', '$0.03$', '$2$'],
            ['$0.49$', '$2$', '$0.7$', '$1$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count the decimal places', md: 'A decimal perfect square has an **even** number of decimal places, and its square root has **half** as many.' },
      ],
      lines: [
        { say: 'Look at the decimal places. One point four four has two decimal places, and its square root, one point two, has one.', show: 't.0', focus: 't.0' },
        { say: 'Zero point zero zero zero nine has four decimal places, and its square root, zero point zero three, has two.', show: 't.1', focus: 't.1' },
        { say: 'And zero point four nine has two, while zero point seven has one.', show: 't.2', focus: 't.2' },
        { say: 'Squaring a decimal doubles its number of decimal places. So a decimal perfect square has an even number of decimal places, and its square root has half as many.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'Not just the digits',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Taking the root of the digits only', md: '$\\sqrt{0.4}$ is **not** $0.2$, because $0.2^2 = 0.04$. In fact $0.4 = \\tfrac{4}{10} = \\tfrac{2}{5}$, and $0.4$ is not a perfect square at all.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{0.2 \\times 0.2 = 0.04}', '0.4 = \\dfrac{4}{10} = \\dfrac{2}{5}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Four is two squared, so it is tempting to say that the square root of zero point four is zero point two.', show: 'oops' },
        { say: 'Check by squaring. Zero point two times zero point two is zero point zero four, not zero point four.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point four has only one decimal place, an odd number. As a fraction, it is four tenths, or two fifths in lowest terms. Five is not a perfect square, so zero point four is not a perfect square at all.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\sqrt{0.0016}$.',
          choices: ['$0.04$', '$0.4$', '$0.008$', '$0.004$'],
          answer: 0,
          working: '$0.0016 = \\dfrac{16}{10\\,000}$, so $\\sqrt{0.0016} = \\dfrac{4}{100} = 0.04$. Check: $0.04 \\times 0.04 = 0.0016$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the square root of zero point zero zero one six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, zero point zero four. Zero point zero zero one six is sixteen over ten thousand, and its square root is four over one hundred. Choice B, zero point four, squared is only zero point one six. A number with four decimal places has a square root with two decimal places.', show: 'q.answer' },
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
            'Write the decimal over $100$ or $10\\,000$: $\\sqrt{1.44} = \\tfrac{12}{10} = 1.2$.',
            'A decimal perfect square has an even number of decimal places; its root has half as many.',
            '$\\sqrt{0.4}$ is not $0.2$: always check by squaring.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the square root of a decimal, write it as a fraction over one hundred or ten thousand. The square root of one point four four is twelve tenths, or one point two.', show: 'sum.0' },
        { say: 'A decimal perfect square has an even number of decimal places, and its square root has half as many.', show: 'sum.1' },
        { say: 'And always check by squaring. In the next part, you will decide whether a number is a perfect square, and solve a problem with a square garden. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
