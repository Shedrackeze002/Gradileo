import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-3-figures.ts';

// Eight counters make four pairs; seven make three pairs and one left over.
const pairs = figure('pr', [
  counters({ name: 'e', rows: 4, cols: 2, label: '8 \\text{ is even}' }),
  counters({ name: 'o', rows: 3, cols: 2, extra: 1, at: [5, 0], label: '7 \\text{ is odd}' }),
]);

const video: Explainer = {
  id: 'm5-3-1-b',
  lessonId: 'm5-3-1',
  title: 'Divisibility Tests, Part 2: The Tests for 2 and 5',
  thumbnailTitle: 'The Tests for 2 and 5',
  thumbnail: 'pr',
  summary: 'The last digits of the multiples of 2 and of 5 give two quick divisibility tests: a number is divisible by 2 when its last digit is even, by 5 when it ends in 0 or 5, and by 10 when it ends in 0. 345 is divisible by 5 but not by 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Divisibility and Factors · Part 2', title: 'The Tests for 2 and 5', subtitle: 'Just look at the last digit' }],
      lines: [
        { say: 'Is 345 divisible by two? Is it divisible by five? You could divide to find out, but there is a much faster way.', show: 'title' },
        { say: 'In this video, you will learn quick tests for two and for five. A quick test like this is called a divisibility test.' },
      ],
    },
    {
      chapter: 'Multiples',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Multiples', md: 'The **multiples** of a number are the answers in its times table. The multiples of $2$ are $2 \\times 1$, $2 \\times 2$, $2 \\times 3$, and so on.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{Multiples of 2: } \\good{2},\\ \\good{4},\\ \\good{6},\\ \\good{8},\\ 1\\good{0},\\ 1\\good{2},\\ 1\\good{4},\\ 1\\good{6},\\ 1\\good{8},\\ 2\\good{0}, \\ldots',
            '\\text{Multiples of 5: } \\opp{5},\\ 1\\opp{0},\\ 1\\opp{5},\\ 2\\opp{0},\\ 2\\opp{5},\\ 3\\opp{0},\\ 3\\opp{5},\\ 4\\opp{0}, \\ldots',
          ],
        },
      ],
      lines: [
        { say: 'The multiples of a number are the answers in its times table. The multiples of two are two, four, six, eight, ten, and so on.', show: 'def' },
        { say: 'Look at the last digits of the multiples of two: two, four, six, eight, zero. Then two, four, six, eight, zero again. They always end in zero, two, four, six or eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the multiples of five: five, ten, fifteen, twenty, twenty-five. They always end in five or zero.', show: 'm.1', focus: 'm.1' },
        { say: 'This pattern goes on forever, however big the numbers get. So the last digit tells you everything!' },
      ],
    },
    {
      chapter: 'Even and odd',
      layout: 'center',
      main: [pairs],
      lines: [
        { say: 'Why does the last digit work for two? Think of making pairs. Eight counters make four pairs, with none left over. So eight is even.', show: ['pr.e-row0', 'pr.e-row1', 'pr.e-row2', 'pr.e-row3', 'pr.e-label'] },
        { say: 'Seven counters make three pairs, and one is left over. So seven is odd.', show: ['pr.o-row0', 'pr.o-row1', 'pr.o-row2', 'pr.o-extra', 'pr.o-label'], focus: 'pr.o-extra' },
        { say: 'Every ten can be split into pairs, and so can every hundred. So only the ones digit can leave a counter over. That is why only the last digit decides.' },
      ],
    },
    {
      chapter: 'The tests',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A number is divisible by $2$ when its last digit is **even**: $0$, $2$, $4$, $6$ or $8$.',
            'A number is divisible by $5$ when its last digit is $0$ or $5$.',
            'A number that ends in $0$ is divisible by $10$ as well.',
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Even and odd', md: '**Even** digits are $0$, $2$, $4$, $6$ and $8$. **Odd** digits are $1$, $3$, $5$, $7$ and $9$.' },
      ],
      lines: [
        { say: 'So here are the tests. A number is divisible by two when its last digit is even.', show: 'b.0' },
        { say: 'The even digits are zero, two, four, six and eight. The odd digits are one, three, five, seven and nine.', show: 'def' },
        { say: 'A number is divisible by five when its last digit is zero or five.', show: 'b.1' },
        { say: 'And a number that ends in zero is divisible by ten as well. Think of counting by tens: ten, twenty, thirty. They all end in zero.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Using the tests',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['34\\opp{5}\\colon \\text{ the last digit is } 5', '5 \\text{ is odd: } \\bad{\\text{not}} \\text{ divisible by } 2', '\\text{ends in 5: divisible by } 5 \\;\\good{\\checkmark}', '127\\good{0}\\colon \\text{ divisible by } 2,\\ 5 \\text{ and } 10'],
        },
      ],
      lines: [
        { say: 'Is 345 divisible by two? Look at the last digit. It is five.', show: 'm.0', focus: 'm.0' },
        { say: 'Five is odd, so 345 is not divisible by two. If you put 345 counters into pairs, one would be left over.', show: 'm.1', focus: 'm.1' },
        { say: 'Is 345 divisible by five? The last digit is five, so yes, it is.', show: 'm.2', focus: 'm.2' },
        { say: 'What about 1,270? It ends in zero. Zero is even, so 1,270 is divisible by two. It ends in zero, so it is divisible by five, and by ten as well.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Look only at the last digit', md: '$345$ has a $4$ in it, but that does not make it even. Only the **last** digit matters for $2$ and $5$.' }],
      lines: [
        { say: '345 has a four in it, and four is even. But that does not make 345 even!', show: 'oops' },
        { say: 'The other digits stand for tens and hundreds, and every ten and every hundred can be split into pairs, or into fives. Only the ones can leave something over.' },
        { say: 'So for two and five, look only at the last digit.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is divisible by **both** $2$ and $5$?',
          choices: ['$480$', '$345$', '$552$', '$205$'],
          answer: 0,
          working: 'To be divisible by $2$, the last digit must be even. To be divisible by $5$, it must be $0$ or $5$. Only $0$ is both, and $480$ ends in $0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is divisible by both two and five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. To be divisible by two, the last digit must be even. To be divisible by five, it must be zero or five. Only zero is both, and 480 ends in zero. Choice C, 552, is even, but it does not end in zero or five.', show: 'q.answer' },
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
          items: ['Divisible by $2$: the last digit is even ($0$, $2$, $4$, $6$, $8$).', 'Divisible by $5$: the last digit is $0$ or $5$.', 'Divisible by $10$: the last digit is $0$.', 'Look only at the last digit.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A number is divisible by two when its last digit is even.', show: 'sum.0' },
        { say: 'It is divisible by five when its last digit is zero or five.', show: 'sum.1' },
        { say: 'And it is divisible by ten when its last digit is zero.', show: 'sum.2' },
        { say: 'For all of these, look only at the last digit. In the next part, we learn the test for three. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
