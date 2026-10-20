import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// Kai's 26.796, the estimate 240 and the true product 267.96 on a number line from 0 to 280.
const line = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: 0,
        max: 280,
        step: 10,
        every: 10,
        points: [
          { id: 'kai', value: 26.796, tex: '\\text{Kai: } 26.796', tone: 'bad' },
          { id: 'est', value: 240, tex: '240', tone: 'theta' },
          { id: 'true', value: 267.96, tex: '267.96', tone: 'good', below: true },
        ],
      }),
    ],
    220,
  );

const video: Explainer = {
  id: 'm6-2-2-c',
  lessonId: 'm6-2-2',
  title: 'Multiplying Decimal and Natural Numbers, Part 3: Is the Answer Reasonable?',
  thumbnailTitle: 'Is the Product Reasonable?',
  thumbnail: 'nl',
  summary: 'Estimating to check a product: round the decimal number to a whole number and the two-digit number to the nearest ten. 4.56 × 23 = 104.88 is close to 5 × 20 = 100; Kai’s 6.38 × 42 = 26.796 is about ten times smaller than 6 × 40 = 240, so the point is misplaced and the product is 267.96. From 347 × 26 = 9022, 3.47 × 26 = 90.22.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 3', title: 'Is the Answer Reasonable?', subtitle: 'Estimate to check a product' }],
      lines: [
        { say: 'You have worked out a product, or a friend tells you an answer. How can you tell quickly whether it makes sense?', show: 'title' },
        { say: 'In this video, you will estimate to check a product, and catch a decimal point in the wrong place.' },
      ],
    },
    {
      chapter: 'Estimate to check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Estimate to check', md: 'Round the decimal number to a **whole number** and the two-digit number to the **nearest ten**. Then multiply. The answer should be close to your estimate.' },
      ],
      lines: [
        { say: 'An estimate is a number that is close to the answer, found with friendly numbers that are easy to work with.', show: 'key' },
        { say: 'To check a product, round the decimal number to a whole number. Round the two-digit number to the nearest ten. Then multiply them in your head.' },
        { say: 'If your answer is close to the estimate, it is reasonable. If it is far away, look for a mistake.' },
      ],
    },
    {
      chapter: 'Checking a product',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Check that $4.56 \\times 23 = 104.88$ is reasonable.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['4.56 \\to 5, \\quad 23 \\to 20', '5 \\times 20 = 100', '104.88 \\text{ is close to } 100 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'In the last part, we found that 4.56 times 23 is 104.88. Is that reasonable?', show: 'q' },
        { say: '4.56 is about five, and 23 is about 20.', show: 'm.0', focus: 'm.0' },
        { say: 'Five times 20 is 100.', show: 'm.1', focus: 'm.1' },
        { say: '104.88 is close to 100, so the answer is reasonable.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Spot the mistake',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kai says $6.38 \\times 42 = 26.796$. Is that reasonable?' },
        line('nl'),
        { kind: 'math', id: 'm', size: 'md', lines: ['6.38 \\to 6, \\quad 42 \\to 40, \\quad 6 \\times 40 = 240', '\\bad{26.796} \\text{ is about ten times smaller than } 240'] },
      ],
      lines: [
        { say: 'Kai says that 6.38 times 42 is 26.796. Is that reasonable?', show: ['q', 'nl.axis', 'nl.kai'] },
        { say: 'Estimate. 6.38 is about six, and 42 is about 40. Six times 40 is 240.', show: ['m.0', 'nl.est'], focus: ['m.0', 'nl.est'] },
        { say: 'Kai’s answer, 26.796, is nowhere near 240. It is about ten times smaller. So the decimal point must be in the wrong place.', show: 'm.1', focus: ['m.1', 'nl.kai'] },
      ],
    },
    {
      chapter: 'Fixing the product',
      layout: 'center',
      main: [
        line('nl2'),
        { kind: 'math', id: 'm', size: 'md', lines: ['638 \\times 42 = 26\\,796', '6.38 \\text{ has } \\thc{2} \\text{ decimal places: } \\good{267.\\thc{96}}'] },
      ],
      lines: [
        { say: 'Let’s fix it. Multiply as if there were no decimal point: 638 times 42 is 26,796. Kai got the digits right.', show: ['nl2.axis', 'nl2.kai', 'nl2.est', 'm.0'], focus: 'm.0' },
        { say: 'But 6.38 has two decimal places, so the product needs two decimal places, not three. The answer is 267.96.', show: 'm.1', focus: 'm.1' },
        { say: 'And 267.96 is close to the estimate of 240. That is reasonable.', show: 'nl2.true', focus: ['nl2.true', 'nl2.est'] },
      ],
    },
    {
      chapter: 'Ten times too big or small',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A misplaced point', md: 'A decimal point one place too far left makes the answer about **ten times too small**. One place too far right makes it about **ten times too big**. An estimate catches both.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{26.796} \\qquad \\good{267.96} \\qquad \\bad{2679.6}'] },
      ],
      lines: [
        { say: 'Moving a decimal point one place changes a number a lot. One place too far to the left makes the answer about ten times too small.', show: 'key' },
        { say: 'One place too far to the right makes it about ten times too big. Only one of these three numbers is close to the estimate of 240.', show: 'm.0', focus: 'm.0' },
        { say: 'That is why an estimate is so useful. It tells you roughly how big the answer should be.' },
      ],
    },
    {
      chapter: 'Use a whole-number product',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use a whole-number product', md: 'If you know $347 \\times 26 = 9022$, then $3.47 \\times 26 = 90.22$. Count the decimal places, and check with an estimate.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['347 \\times 26 = 9022', '3.47 \\times 26 = 90.22', '3 \\times 30 = 90 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Here is a handy trick. Earlier in this lesson, we found that 347 times 26 is 9,022.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'So what is 3.47 times 26? The digits are the same. 3.47 has two decimal places, so the product is 90.22.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with an estimate. 3.47 is about three, and 26 is about 30. Three times 30 is 90, which is close to 90.22.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use an estimate to choose the correct product: $5.83 \\times 31$',
          choices: ['$1807.3$', '$18.073$', '$18\\,073$', '$180.73$'],
          answer: 3,
          working: 'Estimate: $5.83$ is about $6$ and $31$ is about $30$, so the product is about $6 \\times 30 = 180$. Only $180.73$ is close. ($583 \\times 31 = 18\\,073$, and $5.83$ has $2$ decimal places.)',
        },
      ],
      lines: [
        { say: 'Your turn. Use an estimate to choose the correct product of 5.83 and 31. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 180.73. 5.83 is about six, and 31 is about 30, so the product is about 180. Choice A, 1,807.3, is about ten times too big.', show: 'q.answer' },
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
          items: ['Estimate: round the decimal number to a whole number and the other number to the nearest ten.', 'A misplaced decimal point makes the answer about ten times too big or too small.', 'From a whole-number product, just count the decimal places: $3.47 \\times 26 = 90.22$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To check a product, estimate: round the decimal number to a whole number, and the other number to the nearest ten, then multiply.', show: 'sum.0' },
        { say: 'A decimal point in the wrong place makes the answer about ten times too big or too small, and an estimate will catch it.', show: 'sum.1' },
        { say: 'And if you know a whole-number product, just count the decimal places. In the next lesson, we divide decimal numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
