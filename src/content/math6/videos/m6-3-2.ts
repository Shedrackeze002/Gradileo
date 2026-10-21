import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { box, figure } from '@/video/solids.ts';
import { powerParts } from './lib/m6-3-figures.ts';

// A square of 3 by 3 tiles (3 squared) and a cube of 3 by 3 by 3 blocks (3 cubed).
const square = (id: string) => figure(id, [tiles({ name: 'sq', cols: 3, rows: 3, labels: { width: '3', height: '3' } })]);
const cube = (id: string) => figure(id, [box({ name: 'cb', l: 3, w: 3, h: 3, cells: 3, labels: { l: '3', w: '3', h: '3' } })]);

const video: Explainer = {
  id: 'm6-3-2',
  lessonId: 'm6-3-2',
  title: 'Powers, Part 1: Base and Exponent',
  thumbnailTitle: 'Base and Exponent',
  thumbnail: 'pw',
  summary:
    'A power is a short way to write repeated multiplication: a square of 3 by 3 tiles is 3 × 3 = 3² (three squared), and a cube of 3 by 3 by 3 blocks is 3 × 3 × 3 = 3³ (three cubed). In 2⁵ the base 2 is the factor that repeats and the exponent 5 says how many times; 7 × 7 × 7 × 7 = 7⁴, and 5³ means 5 × 5 × 5, not 5 × 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Prime Factorization and Powers · Part 1', title: 'Base and Exponent', subtitle: 'A short way to write repeated factors' }],
      lines: [
        { say: 'The prime factorization of ninety-six is two times two times two times two times two times three. That is five factors of two, and a three. That is a lot to write!', show: 'title' },
        { say: 'Powers give us a short way to write a factor that repeats. In this part, you will learn what a power is, and how to read and write one.' },
      ],
    },
    {
      chapter: 'A square of tiles',
      layout: 'split',
      leftWidth: 460,
      left: [square('sq')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3 \\times 3 = 9', '3 \\times 3 = 3^2', '\\text{“three squared”}'] }],
      lines: [
        { say: 'Let’s start with a picture. Here is a square made of small square tiles. It is three tiles wide and three tiles tall.', show: ['sq.sq-outline', 'sq.sq-grid', 'sq.sq-width', 'sq.sq-height'] },
        { say: 'The number of tiles is three times three, which is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'There is a short way to write three times three. Write a three, with a small two up high. The small two says: use three as a factor two times.', show: 'm.1', focus: 'm.1' },
        { say: 'We read it as three squared, because three times three tiles make a square.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A cube of blocks',
      layout: 'split',
      leftWidth: 460,
      left: [cube('cb')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['3 \\times 3 \\times 3 = 27', '3 \\times 3 \\times 3 = 3^3', '\\text{“three cubed”}'] }],
      lines: [
        { say: 'Now here is a cube built from small blocks. It is three blocks long, three blocks wide and three blocks tall.', show: ['cb.cb-shape', 'cb.cb-front-face', 'cb.cb-top-face', 'cb.cb-side-face', 'cb.cb-cells', 'cb.cb-l', 'cb.cb-w', 'cb.cb-h'] },
        { say: 'Each layer has three times three blocks, which is nine. And there are three layers. So there are three times three times three blocks: twenty-seven.', show: 'm.0', focus: 'm.0' },
        { say: 'We write three times three times three as a three with a small three up high. Three is a factor three times.', show: 'm.1', focus: 'm.1' },
        { say: 'We read it as three cubed, because the blocks make a cube.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Powers',
      layout: 'center',
      main: [
        figure('pw', [powerParts({ base: '2', exp: '5' })], 300),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{2}^{\\opp{5}} = 2 \\times 2 \\times 2 \\times 2 \\times 2'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Power, base and exponent', md: 'A **power** is a short way to write repeated multiplication of the same factor. The **base** is the factor that repeats. The **exponent** tells how many times the base is a factor.' },
      ],
      lines: [
        { say: 'Three squared and three cubed are powers. A power is a short way to write repeated multiplication of the same factor. Here is another power.', show: 'pw.power' },
        { say: 'The big number is the base. It is the factor that repeats. Here, the base is two.', show: 'pw.base', focus: 'pw.base' },
        { say: 'The small raised number is the exponent. It tells how many times the base is a factor: here, five.', show: 'pw.exp', focus: 'pw.exp' },
        { say: 'So this power means two times two times two times two times two. That is five factors of two.', show: 'm.0', focus: 'm.0' },
        { say: 'We read it as two to the power of five.', show: 'def' },
      ],
    },
    {
      chapter: 'Reading powers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Power', 'Read as', 'Means'],
          rows: [
            ['$3^2$', 'three squared', '$3 \\times 3$'],
            ['$4^2$', 'four squared', '$4 \\times 4$'],
            ['$5^3$', 'five cubed', '$5 \\times 5 \\times 5$'],
            ['$10^4$', 'ten to the power of four', '$10 \\times 10 \\times 10 \\times 10$'],
          ],
        },
      ],
      lines: [
        { say: 'A power with exponent two is usually read as squared. Three squared means three times three.', show: 't.0', focus: 't.0' },
        { say: 'Four squared means four times four.', show: 't.1', focus: 't.1' },
        { say: 'A power with exponent three is usually read as cubed. Five cubed means five times five times five.', show: 't.2', focus: 't.2' },
        { say: 'For other exponents, say to the power of. Ten to the power of four means four factors of ten.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Writing a power',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Write $7 \\times 7 \\times 7 \\times 7$ as a power. What are the base and the exponent?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{repeated factor: } 7 \\;\\to\\; \\text{base } \\adj{7}', '\\text{number of factors: } 4 \\;\\to\\; \\text{exponent } \\opp{4}', '7 \\times 7 \\times 7 \\times 7 = \\adj{7}^{\\opp{4}}'] },
      ],
      lines: [
        { say: 'Let’s write a power. Write seven times seven times seven times seven as a power. What are the base and the exponent?', show: 't' },
        { say: 'The factor that repeats is seven. So the base is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Now count the factors of seven: one, two, three, four. There are four factors, so the exponent is four.', show: 'm.1', focus: 'm.1' },
        { say: 'So seven times seven times seven times seven is seven to the power of four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A power is not multiplying by the exponent', md: '$5^3$ does not mean $5 \\times 3$. It means three factors of $5$: $5^3 = 5 \\times 5 \\times 5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5^3 \\ne \\bad{5 \\times 3}', '5^3 = \\good{5 \\times 5 \\times 5} = 125'] },
      ],
      lines: [
        { say: 'Watch out for a very common mistake. Five cubed does not mean five times three.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The exponent is not a factor. It counts the factors. Five cubed means three factors of five: five times five times five.', show: 'm.1', focus: 'm.1' },
        { say: 'Five times five is twenty-five, and twenty-five times five is one hundred twenty-five. That is much more than five times three, which is only fifteen!' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $6 \\times 6 \\times 6$ as a power.',
          choices: ['$3^6$', '$6^3$', '$6 \\times 3$', '$6^6$'],
          answer: 1,
          working: 'The factor that repeats is $6$, so the base is $6$. There are $3$ factors, so the exponent is $3$: $6 \\times 6 \\times 6 = 6^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write six times six times six as a power. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, six cubed. The repeated factor, six, is the base. There are three factors, so the exponent is three. Choice A, three to the power of six, swaps the base and the exponent: it means six factors of three.', show: 'q.answer' },
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
            'A **power** is repeated multiplication: $2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2$.',
            'The **base** is the factor that repeats. The **exponent** tells how many times it is a factor.',
            'Exponent $2$: “squared”. Exponent $3$: “cubed”.',
            '$5^3$ means $5 \\times 5 \\times 5$, not $5 \\times 3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A power is a short way to write repeated multiplication of the same factor.', show: 'sum.0' },
        { say: 'The base is the factor that repeats, and the exponent tells how many times it is a factor.', show: 'sum.1' },
        { say: 'A power with exponent two is read as squared, and one with exponent three as cubed.', show: 'sum.2' },
        { say: 'And the exponent is not a factor: five cubed means five times five times five. In the next part, you will find the value of a power. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
