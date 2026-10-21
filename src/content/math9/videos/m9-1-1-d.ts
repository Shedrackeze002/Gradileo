import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rootSquare } from './lib/m9-1-figures.ts';

// The square garden: an area of 6.25 m², with sides of 2.5 m.
const garden = figure(
  'g',
  [
    rootSquare({ n: 1, k: 1, tone: 'good', labels: { side: '2.5\\text{ m}', up: '2.5\\text{ m}', whole: '2.5\\text{ m}', wholeUp: '2.5\\text{ m}', area: '6.25\\text{ m}^2' } }),
    // Room on both sides for the side labels.
    { points: { roomL: [-1.6, 3], roomR: [7.6, 3] }, items: [] },
  ],
  460,
);

const video: Explainer = {
  id: 'm9-1-1-d',
  lessonId: 'm9-1-1',
  title: 'Square Roots of Perfect Squares, Part 4: Is It a Perfect Square?',
  thumbnailTitle: 'Is It a Perfect Square?',
  thumbnail: 'g',
  summary:
    'A fraction in lowest terms is a perfect square when its numerator and denominator are both perfect squares; to test a decimal, write it as a fraction first. 0.36 = 36/100 and 0.0036 = 36/10 000 are perfect squares, but 3.6 = 18/5 and 25/45 = 5/9 are not. A square garden with an area of 6.25 m² has sides of √6.25 = 2.5 m, so it needs 4 × 2.5 = 10 m of fencing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 4', title: 'Is It a Perfect Square?', subtitle: 'Test it as a fraction in lowest terms' }],
      lines: [
        { say: 'Zero point three six is a perfect square. What about three point six? The digits look the same, but the answer is different.', show: 'title' },
        { say: 'In this part, you will test whether a fraction or a decimal is a perfect square, and then use a square root to solve a problem about a garden.' },
      ],
    },
    {
      chapter: 'The test',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Is it a perfect square?', md: 'A fraction in **lowest terms** is a perfect square when its numerator **and** its denominator are both perfect squares. To test a decimal, write it as a fraction first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{4}{9} \\ \\good{\\checkmark} \\qquad \\dfrac{8}{18} = \\dfrac{4}{9} \\ \\good{\\checkmark} \\qquad \\dfrac{5}{9} \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Here is the test. Write the fraction in lowest terms. It is a perfect square when its numerator and its denominator are both perfect squares.', show: 'key' },
        { say: 'Four ninths passes. Eight eighteenths passes as well, once you write it in lowest terms as four ninths. But five ninths fails, because five is not a perfect square.', show: 'm', focus: 'm' },
        { say: 'To test a decimal, write it as a fraction first, and then use the same test.' },
      ],
    },
    {
      chapter: 'Testing four numbers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which of $0.36$, $3.6$, $\\tfrac{25}{45}$ and $0.0036$ are perfect squares?' },
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'As a fraction in lowest terms', 'Perfect square?'],
          rows: [
            ['$0.36$', '$\\dfrac{36}{100}$', '$\\good{\\text{yes: }\\sqrt{0.36} = 0.6}$'],
            ['$3.6$', '$\\dfrac{36}{10} = \\dfrac{18}{5}$', '$\\bad{\\text{no}}$'],
            ['$\\dfrac{25}{45}$', '$\\dfrac{5}{9}$', '$\\bad{\\text{no}}$'],
            ['$0.0036$', '$\\dfrac{36}{10\\,000}$', '$\\good{\\text{yes: }\\sqrt{0.0036} = 0.06}$'],
          ],
        },
      ],
      lines: [
        { say: 'Which of these four numbers are perfect squares? Test them one at a time.', show: 'q' },
        { say: 'Zero point three six is thirty-six over one hundred. Thirty-six and one hundred are both perfect squares, so yes. Its square root is six tenths, or zero point six.', show: 't.0', focus: 't.0' },
        { say: 'Three point six is thirty-six tenths, which is eighteen fifths in lowest terms. Neither eighteen nor five is a perfect square, so no.', show: 't.1', focus: 't.1' },
        { say: 'In lowest terms, twenty-five over forty-five is five over nine. Five is not a perfect square, so no. The twenty-five on top did not help.', show: 't.2', focus: 't.2' },
        { say: 'Zero point zero zero three six is thirty-six over ten thousand. Both are perfect squares, so yes. Its square root is six over one hundred, or zero point zero six.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Same digits, different answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking only at the digits', md: '$0.36$ and $3.6$ both use the digits $3$ and $6$, but only $0.36$ is a perfect square. $3.6$ has an **odd** number of decimal places, and $\\sqrt{3.6}$ is not $0.6$: $0.6^2 = 0.36$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.6^2 = 0.36 \\qquad 6^2 = 36', '\\bad{\\sqrt{3.6} \\ne 0.6}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Thirty-six is a perfect square, so any number with the digits three and six might look like one.', show: 'oops' },
        { say: 'But zero point six squared is zero point three six, and six squared is thirty-six. Neither of them gives three point six.', show: 'm.0', focus: 'm.0' },
        { say: 'Three point six has one decimal place, an odd number, so it cannot be a decimal perfect square. Always test the number itself, not just its digits.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A square garden',
      layout: 'split',
      leftWidth: 480,
      left: [garden],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A square vegetable garden has an area of $6.25\\ \\text{m}^2$. How much fencing goes around it?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\sqrt{6.25} = \\dfrac{\\sqrt{625}}{\\sqrt{100}}', '\\phantom{\\sqrt{6.25}} = \\dfrac{25}{10} = 2.5', '\\text{Check: } 2.5 \\times 2.5 = 6.25 \\ \\good{\\checkmark}', '4 \\times 2.5 = 10\\text{ m}'] },
      ],
      lines: [
        { say: 'Now a problem. A square vegetable garden has an area of six point two five square metres. How much fencing goes around it?', show: ['q', 'g.grid', 'g.shade', 'g.area'] },
        { say: 'The side of a square is the square root of its area. Six point two five is six hundred twenty-five over one hundred. Twenty-five squared is six hundred twenty-five, and ten squared is one hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'So each side is twenty-five tenths, or two point five metres.', show: ['m.1', 'g.side', 'g.up', 'g.whole', 'g.wholeUp'], focus: ['m.1', 'g.side', 'g.up', 'g.whole', 'g.wholeUp'] },
        { say: 'Check: two point five times two point five is six point two five.', show: 'm.2', focus: 'm.2' },
        { say: 'The fence goes along all four sides. Four times two point five is ten. The garden needs ten metres of fencing.', show: 'm.3', focus: ['m.3', 'g.grid'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these numbers is a perfect square?',
          choices: ['$0.9$', '$1.6$', '$0.81$', '$2.5$'],
          answer: 2,
          working: '$0.81 = \\dfrac{81}{100}$, and $81$ and $100$ are both perfect squares: $\\sqrt{0.81} = 0.9$. The others have one decimal place: $0.9 = \\tfrac{9}{10}$, $1.6 = \\tfrac{8}{5}$ and $2.5 = \\tfrac{5}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is a perfect square? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, zero point eight one. It is eighty-one over one hundred, and its square root is zero point nine. Choice B, one point six, has the digits of sixteen, but it is sixteen tenths, or eight fifths, and neither eight nor five is a perfect square.', show: 'q.answer' },
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
            'A fraction in lowest terms is a perfect square when its top and bottom are both perfect squares.',
            'Write a decimal as a fraction first: $0.36 = \\tfrac{36}{100}$ is a perfect square, $3.6 = \\tfrac{18}{5}$ is not.',
            'Test the number itself, not just its digits.',
            'The side of a square is the square root of its area: $\\sqrt{6.25} = 2.5$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A fraction in lowest terms is a perfect square when its top and its bottom are both perfect squares.', show: 'sum.0' },
        { say: 'To test a decimal, write it as a fraction first. Zero point three six is a perfect square, but three point six is not.', show: 'sum.1' },
        { say: 'Test the number itself, not just its digits.', show: 'sum.2' },
        { say: 'And the side of a square is the square root of its area. In the next lesson, you will estimate square roots of numbers that are not perfect squares. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
