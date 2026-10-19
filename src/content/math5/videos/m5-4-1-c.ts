import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm5-4-1-c',
  lessonId: 'm5-4-1',
  title: 'Multiplying with the Standard Algorithm, Part 3: Checking with an Estimate',
  thumbnailTitle: 'Checking with an Estimate',
  thumbnail: 'far',
  summary: 'Estimating a product by rounding each number to its greatest place (347 × 26 is about 300 × 30 = 9000), multiplying numbers that end in zeros by counting the zeros, and using the estimate to decide whether an answer is reasonable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 3', title: 'Checking with an Estimate', subtitle: 'Is your answer reasonable?' }],
      lines: [
        { say: 'In part two, we found that 347 times 26 is 9,022. But how can you tell that an answer is right? One slip, like a forgotten zero, can make an answer far too small.', show: 'title' },
        { say: 'In this video, you will estimate a product, and use the estimate to check that your answer is reasonable.' },
      ],
    },
    {
      chapter: 'Round to the greatest place',
      layout: 'center',
      main: [
        figure('nl', [
          numberLine({ name: 'a', min: 300, max: 400, step: 10, every: 5, length: 11, at: [0, 2.6], points: [{ id: 'p', value: 347, tex: '347', tone: 'theta' }], spans: [{ id: 'near', from: 300, to: 347, tone: 'good' }] }),
          numberLine({ name: 'b', min: 20, max: 30, step: 1, every: 5, length: 11, at: [0, 0], points: [{ id: 'p', value: 26, tex: '26', tone: 'theta' }], spans: [{ id: 'near', from: 26, to: 30, tone: 'good' }] }),
        ], 320),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Estimate', md: 'An **estimate** is a number close to the exact answer, found with easy numbers. Round each number to its **greatest place**, then multiply.' },
      ],
      lines: [
        { say: 'An estimate is a number close to the exact answer, found with easy numbers. To estimate a product, round each number to its greatest place, then multiply.', show: 'def' },
        { say: 'The greatest place is the place of the first digit. 347 has three hundreds, so its greatest place is the hundreds.', show: ['nl.a-axis', 'nl.a-p'] },
        { say: 'On the number line, 347 is between 300 and 400, and it is closer to 300. So 347 rounds to 300.', show: 'nl.a-near', focus: 'nl.a-near' },
        { say: '26 has two tens, so its greatest place is the tens. 26 is between 20 and 30, and it is closer to 30. So 26 rounds to 30.', show: ['nl.b-axis', 'nl.b-p', 'nl.b-near'], focus: 'nl.b-near' },
      ],
    },
    {
      chapter: 'Count the zeros',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['300 \\times 30', '3 \\times 3 = 9', '9 \\text{ and three zeros: } 9000'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count the zeros', md: 'Multiply the front digits. Then write all the zeros: $400 \\times 30$ is $4 \\times 3 = 12$ with three zeros, $12\\,000$.' },
      ],
      lines: [
        { say: 'Now multiply 300 times 30. Numbers that end in zeros are easy to multiply.', show: 'm.0', focus: 'm.0' },
        { say: 'First, multiply the front digits. Three times three is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Then count the zeros. 300 has two zeros, and 30 has one more. That makes three zeros. Write them after the nine: 9,000.', show: 'm.2', focus: 'm.2' },
        { say: 'Here is another one. 400 times 30: four times three is 12. Then write all three zeros: 12,000.', show: 'tip' },
        { say: 'This works because each zero stands for another ten. Multiplying by ten moves every digit one place to the left, so all the zeros come along.' },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'center',
      main: [
        figure('far', [
          numberLine({
            min: 0,
            max: 10000,
            step: 1000,
            every: 5,
            length: 14,
            points: [
              { id: 'est', value: 9000, tex: '9000', tone: 'theta' },
              { id: 'ans', value: 9022, tex: '9022', tone: 'good', below: true },
              { id: 'bad', value: 2776, tex: '2776', tone: 'bad' },
            ],
          }),
        ], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Estimate: } 300 \\times 30 = 9000', '\\good{9022 \\text{ is close to } 9000}', '\\bad{2776 \\text{ is far from } 9000}'] },
      ],
      lines: [
        { say: 'So the estimate is 9,000.', show: ['far.axis', 'far.est', 'm.0'], focus: 'm.0' },
        { say: 'Our answer was 9,022. That is very close to 9,000, so the answer is reasonable.', show: ['far.ans', 'm.1'], focus: ['far.ans', 'm.1'] },
        { say: 'Reasonable means it makes sense. An estimate does not prove that an answer is exactly right, but it catches big mistakes.' },
        { say: 'Remember the mistake of forgetting the zero? It gave 2,776. That is far from 9,000, so you would know to go back and check your work.', show: ['far.bad', 'm.2'], focus: ['far.bad', 'm.2'] },
      ],
    },
    {
      chapter: 'Catching a mistake',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Kai multiplied $612 \\times 4$ and got $1448$. Is that reasonable?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['612 \\text{ rounds to } 600', '600 \\times 4 = 2400', '\\bad{1448 \\text{ is far from } 2400}', '\\good{612 \\times 4 = 2448}'] },
      ],
      lines: [
        { say: 'Let’s try one more. Kai multiplied 612 times four, and got 1,448. Is that reasonable?', show: 't' },
        { say: 'Round 612 to its greatest place, the hundreds. 612 is closer to 600 than to 700, so it rounds to 600.', show: 'm.0', focus: 'm.0' },
        { say: 'Six times four is 24, then write two zeros: 600 times four is 2,400.', show: 'm.1', focus: 'm.1' },
        { say: 'Kai’s answer, 1,448, is about a thousand less than 2,400. It is not reasonable, so Kai should check the work.', show: 'm.2', focus: 'm.2' },
        { say: 'Working it again: four times two is eight, four times one is four, and four times six is 24. So 612 times four is 2,448, which is close to the estimate.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Estimate $412 \\times 28$ by rounding each number to its greatest place.',
          choices: ['$12\\,000$', '$1200$', '$8000$', '$120\\,000$'],
          answer: 0,
          working: '$412$ rounds to $400$ and $28$ rounds to $30$. Then $4 \\times 3 = 12$, with three zeros: $400 \\times 30 = 12\\,000$.',
        },
      ],
      lines: [
        { say: 'Your turn. Estimate 412 times 28, by rounding each number to its greatest place. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 12,000. 412 rounds to 400, and 28 rounds to 30. Four times three is 12, then write three zeros. Choice C rounds 28 down to 20, but 28 is closer to 30.', show: 'q.answer' },
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
          items: ['To estimate, round each number to its greatest place, then multiply.', 'With zeros, multiply the front digits, then write all the zeros.', 'An answer close to the estimate is **reasonable**. One far away needs checking.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To estimate a product, round each number to its greatest place, then multiply.', show: 'sum.0' },
        { say: 'To multiply numbers that end in zeros, multiply the front digits, then write all the zeros.', show: 'sum.1' },
        { say: 'If your answer is close to the estimate, it is reasonable. If it is far away, go back and check your work. Next, we learn to divide with the standard algorithm. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
