import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-2-b',
  lessonId: 'm302-2-2',
  title: 'Permutations, Part 2: Arranging Some of the Objects',
  thumbnailTitle: 'Arranging Some of the Objects',
  thumbnail: 'dj',
  summary: 'A DJ with 10 songs can open with 4 of them in 10 × 9 × 8 × 7 = 5040 ways. The number of permutations of n objects taken r at a time is nPr = n!/(n − r)!. Worked example: gold, silver and bronze for 8 runners, 8P3 = 336, and why nPn = n! needs 0! = 1. Part 3 chooses between n!, nPr and nʳ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 2', title: 'Arranging Some of the Objects', subtitle: '${}_{n}P_{r} = \\dfrac{n!}{(n - r)!}$' }],
      lines: [
        { say: 'A DJ has ten songs ready, but plays only four of them to open a dance. The order matters, because the first song sets the mood.', show: 'title' },
        { say: 'In this video, you will count the arrangements of some of the objects, called permutations, and write them with a formula.' },
      ],
    },
    {
      chapter: 'The opening set',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A DJ with 10 songs plays 4 of them, in order, to open a dance. How many opening sets are possible?' },
        figure('dj', [slots({ values: ['10', '9', '8', '7'], captions: ['\\text{1st song}', '\\text{2nd song}', '\\text{3rd song}', '\\text{4th song}'], size: 1.5, gap: 1.1 })], 230),
        { kind: 'math', id: 'm', size: 'md', lines: ['10 \\times 9 \\times 8 \\times 7 = 5040'] },
      ],
      lines: [
        { say: 'A DJ with ten songs plays four of them, in order, to open a dance. How many opening sets are possible?', show: 'p' },
        { say: 'Draw a box for each of the four places in the set. The first song can be any of the ten.', show: ['dj.boxes', 'dj.captions', 'dj.v0'], focus: 'dj.v0' },
        { say: 'A song is not played twice, so nine are left for the second place, then eight for the third, and seven for the fourth.', show: ['dj.v1', 'dj.v2', 'dj.v3'], focus: ['dj.v1', 'dj.v2', 'dj.v3'] },
        { say: 'Multiply: ten times nine times eight times seven is 5,040 opening sets. The product stops after four factors, because only four songs are placed.', show: ['dj.times', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Permutations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Permutation', md: 'A **permutation** is an arrangement of objects in a definite order. The number of permutations of $n$ different objects taken $r$ at a time is ${}_{n}P_{r} = \\dfrac{n!}{(n - r)!}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{10}P_{4} = \\dfrac{10!}{6!} = \\dfrac{10 \\times 9 \\times 8 \\times 7 \\times \\bad{\\cancel{6!}}}{\\bad{\\cancel{6!}}}', '= 5040'] },
      ],
      lines: [
        { say: 'An arrangement of objects in a definite order is called a permutation.', show: 'def' },
        { say: 'The number of permutations of n different objects taken r at a time is written with a small n before a capital P, and a small r after it. Read it as n P r.' },
        { say: 'It equals n factorial over n minus r, factorial. For the DJ, n is ten and r is four, so ten P four is ten factorial over six factorial.', show: 'm.0', focus: 'm.0' },
        { say: 'Write ten factorial down to six factorial, and cancel. That leaves ten times nine times eight times seven, the same 5,040. The bottom of the formula cancels the songs that are not placed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Gold, silver and bronze',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Eight runners race for gold, silver and bronze. In how many ways can the medals be awarded?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{8}P_{3} = \\dfrac{8!}{5!} = 8 \\times 7 \\times 6 = 336', '{}_{n}P_{n} = \\dfrac{n!}{0!} = n!'] },
      ],
      lines: [
        { say: 'Here is another. Eight runners race for gold, silver and bronze. In how many ways can the medals be awarded?', show: 'p' },
        { say: 'The medals are different, so order matters, and a runner cannot win two medals. So this is eight P three: eight factorial over five factorial.', show: 'm.0', focus: 'm.0' },
        { say: 'Cancel five factorial, and you are left with eight times seven times six, which is 336 ways.' },
        { say: 'What if you arrange all n objects? Then r equals n, and n P n is n factorial over zero factorial. Zero factorial is one, so n P n is n factorial, the count from part one. That is one more reason why zero factorial is defined as one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the wrong factorial', md: 'The bottom of ${}_{n}P_{r}$ is $(n - r)!$, not $r!$. Divide by the factorial of the objects that are **not** placed.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{10!}{4!} = 151\\,200}', '\\good{\\dfrac{10!}{6!} = 5040}'] },
      ],
      lines: [
        { say: 'A common mistake is to divide by r factorial instead of n minus r, factorial. For the DJ, ten factorial over four factorial is 151,200, far too many.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The bottom of the formula cancels the songs that are not placed. Four songs are placed and six are not, so divide by six factorial, and get 5,040.', show: 'm.1', focus: 'm.1' },
        { say: 'A quick check: the answer should be a product of r numbers, counting down from n. Ten times nine times eight times seven has four factors, one for each song placed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A club with 12 members elects a president, a vice-president and a secretary. No one may hold two jobs. In how many ways can the three jobs be filled?',
          choices: ['$36$', '$220$', '$1320$', '$1728$'],
          answer: 2,
          working: 'The jobs are different, so order matters: ${}_{12}P_{3} = 12 \\times 11 \\times 10 = 1320$.',
        },
      ],
      lines: [
        { say: 'Your turn. A club with twelve members elects a president, a vice-president and a secretary. No one may hold two jobs. In how many ways can the three jobs be filled? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 1,320. The jobs are different, so order matters, and this is twelve P three: twelve times eleven times ten. Choice D, 1,728, is twelve cubed, which would let one person hold more than one job.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A permutation is an arrangement of objects in a definite order.', '${}_{n}P_{r} = \\dfrac{n!}{(n - r)!}$: the first $r$ factors of $n!$.', '${}_{n}P_{n} = n!$, which is one reason that $0! = 1$.'] }],
      lines: [
        { say: 'Let’s sum up. A permutation is an arrangement of objects in a definite order.', show: 'sum.0' },
        { say: 'n P r equals n factorial over n minus r, factorial. It is the product of the first r factors of n factorial.', show: 'sum.1' },
        { say: 'And n P n is n factorial. In part three, we choose between three counting models: n factorial, n P r, and n to the power r. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
