import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const digit = '\\text{digit}';

const video: Explainer = {
  id: 'm302-2-2-c',
  lessonId: 'm302-2-2',
  title: 'Permutations, Part 3: Choosing the Right Model',
  thumbnailTitle: 'Choosing the Right Model',
  thumbnail: 'rep',
  summary: 'Two questions pick the counting model: does order matter, and may objects repeat? A lock with the digits 0 to 9 has 10⁴ = 10 000 four-digit codes with repetition, 10P4 = 5040 without, and 10! = 3 628 800 ten-digit codes using every digit once. Part 4 works backwards from a count.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 3', title: 'Choosing the Right Model', subtitle: '$n!$, ${}_{n}P_{r}$ or $n^r$?' }],
      lines: [
        { say: 'Three counting tools look alike: n factorial, n P r, and n to the power of r. Choosing the wrong one gives the wrong count, sometimes by thousands.', show: 'title' },
        { say: 'In this video, you will ask two questions about any arrangement: does order matter, and may objects repeat? The answers pick the right model.' },
      ],
    },
    {
      chapter: 'Digits may repeat',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A lock uses the digits 0 to 9. How many 4-digit codes are possible if digits **may repeat**?' },
        figure('rep', [slots({ values: ['10', '10', '10', '10'], captions: [digit, digit, digit, digit] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['10 \\times 10 \\times 10 \\times 10 = 10^4 = 10\\,000'] },
      ],
      lines: [
        { say: 'A lock uses the digits zero to nine. Compare the number of codes in three situations. First, how many four-digit codes are possible if digits may repeat?', show: 'p' },
        { say: 'Each of the four positions can be any of the ten digits, even one already used. So every box has ten choices.', show: ['rep.boxes', 'rep.captions', 'rep.values'], focus: 'rep.values' },
        { say: 'Ten to the power of four is 10,000 codes: every code from zero, zero, zero, zero up to nine, nine, nine, nine.', show: ['rep.times', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'No repeats',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many 4-digit codes are possible if digits **may not repeat**?' },
        figure('no', [slots({ values: ['10', '9', '8', '7'], captions: [digit, digit, digit, digit] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{10}P_{4} = 10 \\times 9 \\times 8 \\times 7 = 5040'] },
      ],
      lines: [
        { say: 'Second, how many four-digit codes are possible if digits may not repeat?', show: 'p' },
        { say: 'Now each digit used is gone. Ten choices for the first position, nine for the second, eight for the third, and seven for the fourth.', show: ['no.boxes', 'no.captions', 'no.values'], focus: 'no.values' },
        { say: 'That is ten P four, which is 5,040 codes: about half as many as before.', show: ['no.times', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Every digit once',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many 10-digit codes use **each digit exactly once**?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['10 \\times 9 \\times 8 \\times \\cdots \\times 1 = 10! = 3\\,628\\,800'] },
      ],
      lines: [
        { say: 'Third, how many ten-digit codes use each of the ten digits exactly once?', show: 'p' },
        { say: 'Every digit is used, and none repeats. So this is an arrangement of all ten digits: ten factorial, which is 3,628,800 codes.', show: 'm.0', focus: 'm.0' },
        { say: 'So the same ten digits give 10,000, 5,040 or 3,628,800 codes. The model depends on whether objects can repeat, and on how many of them are arranged.' },
      ],
    },
    {
      chapter: 'The three models',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Situation', 'Order matters?', 'Repeats?', 'Count'],
          rows: [
            ['Arrange all $n$ objects', 'yes', 'no', '$n!$'],
            ['Arrange $r$ of $n$ objects', 'yes', 'no', '${}_{n}P_{r}$'],
            ['Fill $r$ positions from $n$ options', 'yes', 'yes', '$n^r$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the three models side by side. In all of them, order matters: a code of one, two, three, four is not the same as four, three, two, one.', show: 't' },
        { say: 'If all n objects are arranged, with no repeats, the count is n factorial.', focus: 't.0' },
        { say: 'If only r of the n objects are arranged, with no repeats, it is n P r.', focus: 't.1' },
        { say: 'And if each of r positions is filled from n options, and repeats are allowed, it is n to the power of r. So ask two questions: are all the objects used, and can an object be used again?', focus: 't.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using a permutation when repeats are allowed', md: 'A permutation, ${}_{n}P_{r}$, never uses an object twice. When repeats are allowed, every position has all $n$ options: use $n^r$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Repeats allowed: } \\bad{{}_{10}P_{4} = 5040} \\quad \\good{10^4 = 10\\,000}'] },
      ],
      lines: [
        { say: 'A common mistake is to reach for n P r whenever order matters. But a permutation never uses an object twice.', show: 'oops' },
        { say: 'For the lock with repeats allowed, ten P four gives 5,040, which misses every code with a repeated digit, such as seven, seven, one, two. The right count is ten to the fourth, 10,000.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A playlist plays 5 different songs, chosen from 20, in order, with no song played twice. Which expression counts the playlists?',
          choices: ['${}_{20}P_{5}$', '$20^5$', '$20!$', '$5!$'],
          answer: 0,
          working: 'Order matters, no song repeats, and only 5 of the 20 songs are used: ${}_{20}P_{5} = 20 \\times 19 \\times 18 \\times 17 \\times 16$.',
        },
      ],
      lines: [
        { say: 'Your turn. A playlist plays five different songs, chosen from twenty, in order, with no song played twice. Which expression counts the playlists? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twenty P five. Order matters, no song repeats, and only five of the twenty songs are used. Choice B, twenty to the fifth, would let a song play more than once, and choice C arranges all twenty songs.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['All $n$ objects in order, no repeats: $n!$.', '$r$ of $n$ objects in order, no repeats: ${}_{n}P_{r}$.', '$r$ positions, each from $n$ options, repeats allowed: $n^r$.'] }],
      lines: [
        { say: 'Let’s sum up. To arrange all n objects in order, with no repeats, use n factorial.', show: 'sum.0' },
        { say: 'To arrange r of n objects in order, with no repeats, use n P r.', show: 'sum.1' },
        { say: 'And to fill r positions, each from n options, with repeats allowed, use n to the power of r. In part four, we work backwards, from a count to the number of objects. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
