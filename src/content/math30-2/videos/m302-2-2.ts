import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-2',
  lessonId: 'm302-2-2',
  title: 'Permutations, Part 1: Factorial Notation',
  thumbnailTitle: 'Factorial Notation',
  thumbnail: 'ph',
  summary: 'Hanging 8 different photos in a row in 8 × 7 × … × 1 = 8! = 40 320 ways, the definition of n! and 0! = 1, and cancelling factorials: 9!/7! = 9 × 8 = 72, while 9!/3! is not 3!. Part 2 arranges only some of the objects.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 1', title: 'Factorial Notation', subtitle: 'Arranging objects in a row' }],
      lines: [
        { say: 'A coach setting a batting order, a DJ planning a set, and a teacher scheduling presentations all face the same question: in how many orders can things be arranged? When order matters, you are counting permutations.', show: 'title' },
        { say: 'In this video, you will count the arrangements of objects in a row, write them with factorial notation, and simplify fractions of factorials.' },
      ],
    },
    {
      chapter: 'Photos on a wall',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'In how many ways can 8 different photos be hung in a row?' },
        figure('ph', [slots({ values: ['8', '7', '6', '5', '4', '3', '2', '1'], captions: ['\\text{1st}', '\\text{2nd}', '\\text{3rd}', '\\text{4th}', '\\text{5th}', '\\text{6th}', '\\text{7th}', '\\text{8th}'], size: 1.3, gap: 0.7 })], 230),
        { kind: 'math', id: 'm', size: 'md', lines: ['8 \\times 7 \\times 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 40\\,320'] },
      ],
      lines: [
        { say: 'In how many ways can eight different photos be hung in a row on a wall?', show: 'p' },
        { say: 'Draw a box for each spot on the wall. Any of the eight photos can go in the first spot: eight choices.', show: ['ph.boxes', 'ph.captions', 'ph.v0'], focus: 'ph.v0' },
        { say: 'Once one photo is hung, seven are left for the second spot. Then six for the third, and so on, until only one photo is left for the last spot.', show: ['ph.v1', 'ph.v2', 'ph.v3', 'ph.v4', 'ph.v5', 'ph.v6', 'ph.v7'], focus: ['ph.v1', 'ph.v2', 'ph.v3', 'ph.v4', 'ph.v5', 'ph.v6', 'ph.v7'] },
        { say: 'By the counting principle, multiply: eight times seven times six, and so on down to one. That is 40,320 ways.', show: ['ph.times', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Factorial notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factorial', md: 'For a natural number $n$, $n!$ (read “$n$ factorial”) is $n(n - 1)(n - 2) \\cdots (2)(1)$. By definition, $0! = 1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['8! = 8 \\times 7 \\times 6 \\times \\cdots \\times 1 = 40\\,320', 'n! = n \\times (n - 1)!', '1! = 1 \\times 0!, \\ \\text{so } 0! = 1'] },
      ],
      lines: [
        { say: 'A product that counts down to one like this has a short name. It is written eight followed by an exclamation mark, and read eight factorial.', show: 'm.0', focus: 'm.0' },
        { say: 'For any natural number n, n factorial is n, times n minus one, times n minus two, and so on down to two times one. It counts the ways to arrange n different objects in a row.', show: 'def' },
        { say: 'Notice a pattern: n factorial equals n times, n minus one, factorial. For example, eight factorial is eight times seven factorial.', show: 'm.1', focus: 'm.1' },
        { say: 'By definition, zero factorial is one. The pattern needs it: with n equal to one, one factorial equals one times zero factorial. One factorial is one, so zero factorial must be one too.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A factorial fraction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Evaluate $\\dfrac{9!}{7!}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{9!}{7!} = \\dfrac{9 \\times 8 \\times \\bad{\\cancel{7!}}}{\\bad{\\cancel{7!}}}', '= 9 \\times 8 = 72'] },
      ],
      lines: [
        { say: 'Because of that pattern, factorials cancel neatly in fractions. Evaluate nine factorial over seven factorial.', show: 'p' },
        { say: 'Write the larger factorial only until you reach the smaller one. Nine factorial is nine times eight times seven factorial. Then the seven factorials on the top and the bottom cancel.', show: 'm.0', focus: 'm.0' },
        { say: 'That leaves nine times eight, which is seventy-two. There was no need to work out nine factorial, which is 362,880.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cancelling the numbers instead of the factorials', md: '$\\dfrac{9!}{3!}$ is **not** $3!$. Write out the larger factorial until you reach the smaller one, then cancel.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{9!}{3!} \\ne 3! = 6}', '\\dfrac{9!}{3!} = 9 \\times 8 \\times 7 \\times 6 \\times 5 \\times 4 = 60\\,480'] },
      ],
      lines: [
        { say: 'A common mistake is to divide the numbers inside the factorials. Nine divided by three is three, so it is tempting to say that nine factorial over three factorial is three factorial, or six.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But factorials do not divide that way. Write nine factorial down to three factorial: nine times eight times seven times six times five times four, times three factorial. Cancel the three factorials.', show: 'm.1', focus: 'm.1' },
        { say: 'That leaves nine times eight times seven times six times five times four, which is 60,480: nowhere near six.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\dfrac{6!}{3!}$.',
          choices: ['$2$', '$120$', '$6$', '$720$'],
          answer: 1,
          working: '$\\dfrac{6!}{3!} = \\dfrac{6 \\times 5 \\times 4 \\times 3!}{3!} = 6 \\times 5 \\times 4 = 120$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate six factorial over three factorial. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 120. Six factorial is six times five times four times three factorial, and the three factorials cancel, leaving six times five times four. Choice A divides six by three and takes two factorial, but factorials do not cancel that way.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$n! = n(n - 1)(n - 2) \\cdots (2)(1)$ counts the arrangements of $n$ different objects; $0! = 1$.', '$n! = n \\times (n - 1)!$, so factorials cancel: $\\dfrac{9!}{7!} = 9 \\times 8$.', 'Write the larger factorial down to the smaller one, then cancel.'] }],
      lines: [
        { say: 'Let’s sum up. n factorial is n times n minus one, and so on down to one. It counts the arrangements of n different objects, and zero factorial is one.', show: 'sum.0' },
        { say: 'n factorial equals n times, n minus one, factorial, so factorials cancel in fractions.', show: 'sum.1' },
        { say: 'To cancel, write the larger factorial down to the smaller one. In part two, we arrange only some of the objects. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
