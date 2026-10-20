import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { dot, note, xAt } from './lib/m6-1-figures.ts';

// The integers from −6 to 6, with dots at the ends to say the line goes on forever.
const forever = figure(
  'fv',
  [
    numberLine({ min: -6, max: 6, step: 1, points: Array.from({ length: 13 }, (_, k) => ({ id: `i${k}`, value: k - 6, tex: '', tone: 'theta' as const })) }),
    note({ id: 'more-left', at: [-1.1, 0], tex: '\\cdots', tone: 'theta' }),
    note({ id: 'more-right', at: [13.1, 0], tex: '\\cdots', tone: 'theta' }),
  ],
  260,
);

// The integers between −4 and 3: the ends are hollow (not counted), and the six between are dots.
const between = figure(
  'bt',
  [
    numberLine({ min: -6, max: 5, step: 1 }),
    dot({ id: 'endL', at: [xAt(-4, -6, 5), 0], tone: 'muted', open: true }),
    dot({ id: 'endR', at: [xAt(3, -6, 5), 0], tone: 'muted', open: true }),
    ...[-3, -2, -1, 0, 1, 2].map((v, k) => dot({ id: `b${k}`, at: [xAt(v, -6, 5), 0], tex: String(k + 1), tone: v === 0 ? 'good' : 'theta' })),
  ],
  260,
);

const video: Explainer = {
  id: 'm6-1-2',
  lessonId: 'm6-1-2',
  title: 'Comparing and Ordering Positive and Negative Numbers, Part 1: Integers',
  thumbnailTitle: 'Integers',
  thumbnail: 'fv',
  summary: 'The integers are the natural numbers, their opposites and zero, with no fractions or decimal parts. The number line goes on forever both ways, so there is no greatest or least integer. Counting the integers between −4 and 3 (there are 6, and 0 is one of them).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 1', title: 'Integers', subtitle: 'Whole numbers, their opposites and zero' }],
      lines: [
        { say: 'Which is colder, negative thirteen degrees or negative six degrees? Soon you will be able to answer questions like that in a flash.', show: 'title' },
        { say: 'But first, let’s meet a family of numbers that we use all the time. In this video, you will learn what integers are, and count the integers between two numbers.' },
      ],
    },
    {
      chapter: 'What is an integer?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Integer', md: 'The **integers** are the natural numbers $1, 2, 3, \\ldots$, their opposites $-1, -2, -3, \\ldots$ and zero. Integers have no fractions or decimal parts.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ldots,\\ \\adj{-3},\\ \\adj{-2},\\ \\adj{-1},\\ 0,\\ \\opp{1},\\ \\opp{2},\\ \\opp{3},\\ \\ldots'] },
      ],
      lines: [
        { say: 'Start with the natural numbers. These are the counting numbers: one, two, three, and so on.', show: 'def' },
        { say: 'Now add their opposites: negative one, negative two, negative three, and so on. And add zero in the middle.' },
        { say: 'Together, all these numbers are called the integers. Here they are in order, with zero in the middle.', show: 'm.0', focus: 'm.0' },
        { say: 'The three dots at each end mean the list keeps going. Integers have no fractions and no decimal parts. They are whole steps along the number line.' },
      ],
    },
    {
      chapter: 'Is it an integer?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'Integer?'],
          rows: [
            ['$-8$', '[[good:yes]]'],
            ['$0$', '[[good:yes]]'],
            ['$2.5$', '[[bad:no]], it has a decimal part'],
            ['$\\dfrac{1}{2}$', '[[bad:no]], it is a fraction'],
            ['$15$', '[[good:yes]]'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s check some numbers. Is negative eight an integer? Yes. It is the opposite of eight, a natural number.', show: 't.0', focus: 't.0' },
        { say: 'Is zero an integer? Yes. Zero is in the list, right in the middle.', show: 't.1', focus: 't.1' },
        { say: 'What about 2.5? No. It has a decimal part, so it sits between two integers.', show: 't.2', focus: 't.2' },
        { say: 'One half is not an integer either, because it is a fraction. But fifteen is an integer. It is a natural number.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Forever in both directions',
      layout: 'center',
      main: [
        forever,
        { kind: 'callout', id: 'key', tone: 'key', title: 'No greatest, no least', md: 'The number line goes on forever in both directions. There is **no greatest** integer and **no least** integer.' },
      ],
      lines: [
        { say: 'Here are the integers from negative six to six on a number line. Each integer is one whole step from the next.', show: ['fv.axis', ...Array.from({ length: 13 }, (_, k) => `fv.i${k}`)] },
        { say: 'But the number line does not stop at six. It goes on forever to the right: seven, eight, nine, and on and on.', show: 'fv.more-right', focus: 'fv.more-right' },
        { say: 'It goes on forever to the left as well: negative seven, negative eight, negative nine, and on and on.', show: 'fv.more-left', focus: 'fv.more-left' },
        { say: 'So there is no greatest integer, because you can always add one more. And there is no least integer, because you can always go one more step to the left.', show: 'key' },
      ],
    },
    {
      chapter: 'Counting integers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'How many integers are **between** $-4$ and $3$? Do not count $-4$ and $3$.' },
        between,
        { kind: 'math', id: 'm', size: 'md', lines: ['-3,\\ -2,\\ -1,\\ \\good{0},\\ 1,\\ 2', '6 \\text{ integers}'] },
      ],
      lines: [
        { say: 'How many integers are between negative four and three? Do not count negative four and three themselves.', show: ['q', 'bt.axis', 'bt.endL', 'bt.endR'], focus: ['bt.endL', 'bt.endR'] },
        { say: 'List them from left to right. Negative three, negative two, negative one.', show: ['bt.b0', 'bt.b1', 'bt.b2'], focus: ['bt.b0', 'bt.b1', 'bt.b2'] },
        { say: 'Then zero. Remember that zero is an integer, so it counts.', show: 'bt.b3', focus: 'bt.b3' },
        { say: 'Then one and two. We stop there, because three is not counted.', show: ['bt.b4', 'bt.b5', 'm.0'], focus: ['bt.b4', 'bt.b5', 'm.0'] },
        { say: 'That makes six integers between negative four and three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting zero', md: 'Zero is an integer. Between $-4$ and $3$, counting only the negative and positive numbers gives $5$, but the answer is $6$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{-3,\\ -2,\\ -1,\\ 1,\\ 2 \\quad (5)}', '\\good{-3,\\ -2,\\ -1,\\ 0,\\ 1,\\ 2 \\quad (6)}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. It is easy to count the negative numbers and the positive numbers, and skip right over zero.', show: 'oops' },
        { say: 'That gives five, which is one short.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero is neither positive nor negative, but it is still an integer. With zero, there are six.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many integers are between $-5$ and $3$? Do not count $-5$ and $3$.',
          choices: ['$7$', '$6$', '$8$', '$9$'],
          answer: 0,
          working: 'They are $-4, -3, -2, -1, 0, 1, 2$: that is $7$ integers.',
        },
      ],
      lines: [
        { say: 'Your turn. How many integers are between negative five and three? Do not count negative five and three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seven. They are negative four, negative three, negative two, negative one, zero, one and two. Choice B forgets to count zero.', show: 'q.answer' },
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
          items: ['The **integers** are the natural numbers, their opposites, and $0$.', 'Integers have no fractions or decimal parts.', 'There is no greatest integer and no least integer.', 'Zero is an integer: count it!'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The integers are the natural numbers, their opposites, and zero.', show: 'sum.0' },
        { say: 'Integers have no fractions and no decimal parts.', show: 'sum.1' },
        { say: 'The number line goes on forever both ways, so there is no greatest integer and no least integer.', show: 'sum.2' },
        { say: 'And zero is an integer, so remember to count it. In the next part, we compare two numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
