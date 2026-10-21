import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bars } from '@/content/math6/videos/lib/m6-6-figures.ts';

// The $20 bill split into the hot dogs, the juices and the change.
const bill = figure('br', [
  bars({
    rows: [
      {
        id: 'r',
        pieces: [
          { w: 8.25, tex: '\\text{hot dogs}', tone: 'opp' },
          { w: 3, tex: '\\text{juices}', tone: 'adj' },
          { w: 8.75, tex: '\\text{change}', tone: 'good' },
        ],
      },
    ],
    total: '20',
  }),
], 230);

const video: Explainer = {
  id: 'm7-2-3-c',
  lessonId: 'm7-2-3',
  title: 'Order of Operations with Decimals, Part 3: Writing an Expression',
  thumbnailTitle: 'Writing an Expression',
  thumbnail: 'br',
  summary:
    'For a problem with several steps, write one expression and use brackets to keep parts together. 3 hot dogs at $2.75 and 2 juices at $1.50, paid with a $20 bill: 20 − (3 × 2.75 + 2 × 1.50) = 20 − 11.25 = 8.75, so the change is $8.75. The mean of jumps of 3.45 m, 3.6 m and 3.21 m is (3.45 + 3.6 + 3.21) ÷ 3 = 3.42 m; without the brackets only 3.21 would be divided by 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 3', title: 'Writing an Expression', subtitle: 'Brackets keep parts together' }],
      lines: [
        { say: 'Some problems take several steps. Instead of writing each step on its own, you can write one expression for the whole problem.', show: 'title' },
        { say: 'In this part, you will write expressions for two problems, and see how brackets keep the parts together.' },
      ],
    },
    {
      chapter: 'At the snack stand',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Malik buys $3$ hot dogs at \\$2.75 each and $2$ juices at \\$1.50 each. He pays with a \\$20 bill. How much change does he get?' },
        bill,
        { kind: 'math', id: 'm', size: 'lg', lines: ['20 - (\\opp{3 \\times 2.75} + \\adj{2 \\times 1.50})'] },
      ],
      lines: [
        { say: 'At the snack stand, Malik buys three hot dogs at two dollars and seventy-five cents each, and two juices at one dollar and fifty cents each. Malik pays with a twenty-dollar bill. How much change is there?', show: 'q' },
        { say: 'Picture the twenty dollars split into three parts: the cost of the hot dogs, the cost of the juices, and the change that is left.', show: ['br.r-p0', 'br.r-p1', 'br.r-p2', 'br.total'] },
        { say: 'The hot dogs cost three times two dollars and seventy-five cents. The juices cost two times one dollar and fifty cents. Together, those make the total cost.', focus: ['br.r-p0', 'br.r-p1'] },
        { say: 'The change is twenty minus the total cost. So the expression is twenty minus, in brackets, three times two point seven five plus two times one point five zero. The brackets keep the total cost together.', show: 'm', focus: ['m', 'br.r-p2'] },
      ],
    },
    {
      chapter: 'Evaluating the expression',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } 20 - (3 \\times 3 + 2 \\times 1.5) = 20 - 12 = 8', '20 - (\\opp{3 \\times 2.75} + \\adj{2 \\times 1.50})', '= 20 - (8.25 + 3.00)', '= 20 - 11.25', '= 8.75'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Malik gets **\\$8.75** in change.' },
      ],
      lines: [
        { say: 'Estimate first. Two dollars and seventy-five cents is about three dollars, so three times three is nine. Two times one point five is three. Twenty minus twelve is eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Now evaluate. Brackets first, and inside the brackets, multiply first. Three times two point seven five is eight point two five. Two times one point five zero is three point zero zero.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Still inside the brackets, add: eight point two five plus three is eleven point two five.', show: 'm.3', focus: 'm.3' },
        { say: 'Finally, subtract: twenty minus eleven point two five is eight point seven five. Malik gets eight dollars and seventy-five cents in change, close to the estimate of eight.', show: ['m.4', 'a'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'The mean of three jumps',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Grace’s long jumps are $3.45$ m, $3.6$ m and $3.21$ m. Find the mean jump.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean', md: 'The **mean** shares the total out equally: add the values, then divide by how many there are.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(3.45 + 3.60 + 3.21) \\div 3', '= 10.26 \\div 3', '= 3.42'] },
      ],
      lines: [
        { say: 'Grace does three long jumps: three point four five metres, three point six metres and three point two one metres. What is the mean jump?', show: 'q' },
        { say: 'The mean shares the total out equally. Add the values, then divide by how many there are.', show: 'def' },
        { say: 'So the expression is: three point four five plus three point six plus three point two one, all in brackets, divided by three. Estimate: every jump is between three and four metres, so the mean must be as well.', show: 'm.0', focus: 'm.0' },
        { say: 'Brackets first. Write three point six as three point six zero, and add: ten point two six.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide: ten point two six divided by three is three point four two. The mean jump is three point four two metres, between three and four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the brackets', md: '$3.45 + 3.6 + 3.21 \\div 3$ is **not** the mean. Without brackets, only $3.21$ is divided by $3$. The brackets make you add all three jumps first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3.45 + 3.6 + \\bad{3.21 \\div 3} = 3.45 + 3.6 + 1.07 = 8.12 \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. If you forget the brackets, the order of operations says to divide first.', show: 'oops' },
        { say: 'Then only three point two one is divided by three. You get one point zero seven, and the total comes out as eight point one two.', show: 'm', focus: 'm' },
        { say: 'A mean jump of eight metres, when every jump was less than four metres? That cannot be right. The brackets make you add all three jumps first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Pens cost \\$1.25 each and notebooks cost \\$2.40 each. Ali buys $4$ pens and $2$ notebooks, and pays with a \\$20 bill. Which expression gives the change?',
          choices: ['$20 - 4 \\times 1.25 + 2 \\times 2.40$', '$(20 - 4) \\times 1.25 + 2 \\times 2.40$', '$20 - (4 \\times 1.25 + 2 \\times 2.40)$', '$20 - 4 + 2 \\times 1.25 + 2.40$'],
          answer: 2,
          working: 'The brackets keep the total cost together: $20 - (4 \\times 1.25 + 2 \\times 2.40) = 20 - (5 + 4.80) = 20 - 9.80 = 10.20$, so the change is \\$10.20.',
        },
      ],
      lines: [
        { say: 'Your turn. Pens cost one dollar and twenty-five cents each, and notebooks cost two dollars and forty cents each. Ali buys four pens and two notebooks, and pays with a twenty-dollar bill. Which expression gives the change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The brackets keep the whole cost together, so all of it is taken away from twenty. The change is ten dollars and twenty cents. Choice A subtracts the pens, but then adds the notebooks.', show: 'q.answer' },
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
            'For a word problem, write one expression for the whole problem.',
            'Use brackets to keep parts together, like a total cost or the sum before a mean.',
            'Estimate, then follow the order of operations.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a problem with several steps, you can write one expression for the whole problem.', show: 'sum.0' },
        { say: 'Brackets keep parts together, like a total cost, or the sum you divide to find a mean.', show: 'sum.1' },
        { say: 'Estimate first, then follow the order of operations. In the next lesson, you will change between percents, fractions and decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
