import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-2-4-b',
  lessonId: 'm302-2-4',
  title: 'Combinations, Part 2: Counting Combinations',
  thumbnailTitle: 'Counting Combinations',
  summary: 'Choosing 2 of 4 friends in order gives 4P2 = 12, but each pair is counted twice, so there are 6 pairs. Dividing by r! gives nCr = nPr/r! = n!/((n − r)! r!). Worked example: 3 of 8 friends can be invited in 8C3 = 56 ways, and hanging the 3 chosen paintings in order multiplies by 3! to give 8P3 = 336. Part 3 chooses from several groups.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 2', title: 'Counting Combinations', subtitle: '${}_{n}C_{r} = \\dfrac{n!}{(n - r)!\\,r!}$' }],
      lines: [
        { say: 'Out of four friends, you can bring two to a concert. How many different pairs could you bring? Counting in order gives too many, because every pair is counted twice.', show: 'title' },
        { say: 'In this video, you will count combinations by dividing the permutations by the number of ways to order each group.' },
      ],
    },
    {
      chapter: 'Pairs from four friends',
      layout: 'split',
      leftWidth: 520,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['In order', 'Pair'],
          rows: [
            ['AB, BA', '$\\{\\text{A}, \\text{B}\\}$'],
            ['AC, CA', '$\\{\\text{A}, \\text{C}\\}$'],
            ['AD, DA', '$\\{\\text{A}, \\text{D}\\}$'],
            ['BC, CB', '$\\{\\text{B}, \\text{C}\\}$'],
            ['BD, DB', '$\\{\\text{B}, \\text{D}\\}$'],
            ['CD, DC', '$\\{\\text{C}, \\text{D}\\}$'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['{}_{4}P_{2} = 4 \\times 3 = 12', '\\text{each pair twice}', '12 \\div 2 = 6 \\text{ pairs}'] }],
      lines: [
        { say: 'Call the four friends "A", B, C and D. First, count as if order mattered: choose a first friend and then a second. That is four P two, or four times three, which is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Now list them in pairs. "A" then B, and B then "A", are the same two friends. So are "A" then C, and C then "A".', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'In fact, every pair appears twice in the ordered list: once in each order.', show: ['t.2', 't.3', 't.4', 't.5', 'm.1'], focus: 'm.1' },
        { say: 'So divide by two: twelve divided by two is six pairs.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Divide by r factorial',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Combination', md: 'A **combination** is a selection in which order does not matter. The number of combinations of $n$ different objects taken $r$ at a time is ${}_{n}C_{r} = \\dfrac{{}_{n}P_{r}}{r!} = \\dfrac{n!}{(n - r)!\\,r!}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{n}C_{r} = \\dfrac{{}_{n}P_{r}}{r!} = \\dfrac{n!}{(n - r)!\\,r!}'] },
      ],
      lines: [
        { say: 'Why divide by two? Two friends can be put in order in two factorial, or two, ways.' },
        { say: 'In general, every group of r objects can be put in order in r factorial ways. So the permutations count each group r factorial times, and dividing by r factorial counts each group once.', show: 'def' },
        { say: 'A selection in which order does not matter is called a combination. The number of combinations of n different objects taken r at a time is written with a small n, a capital C, and a small r. Read it as n C r.', show: 'm.0', focus: 'm.0' },
        { say: 'It equals n P r divided by r factorial, which is n factorial over n minus r, factorial, times r factorial.' },
      ],
    },
    {
      chapter: 'Inviting friends',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Jessie has 3 extra concert tickets to give to 3 of 8 friends. How many different groups can be invited?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{8}C_{3} = \\dfrac{8!}{5!\\,3!}', '= \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = \\dfrac{336}{6} = 56'] },
      ],
      lines: [
        { say: 'Jessie has three extra concert tickets to give to three of eight friends. How many different groups can be invited?', show: 'p' },
        { say: 'The friends all get the same kind of ticket, so swapping two of them changes nothing. Order does not matter: this is eight C three.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight factorial over five factorial cancels to eight times seven times six, which counts the ordered choices. Then divide by three factorial, the orders of each group of three.', focus: 'm.0' },
        { say: 'Eight times seven times six is 336, and 336 divided by six is fifty-six groups.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Choosing and arranging is a permutation', md: 'Choosing 3 of 8 paintings is ${}_{8}C_{3} = 56$. Hanging those 3 in a row multiplies by $3! = 6$, giving $336 = {}_{8}P_{3}$. If the question cares about order, a combination alone is not enough.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{8}C_{3} \\times 3! = 56 \\times 6 = 336 = {}_{8}P_{3}'] },
      ],
      lines: [
        { say: 'Watch for questions that choose and then arrange. Choosing three of eight paintings for a wall is eight C three, or fifty-six.', show: 'oops' },
        { say: 'But if the three paintings are then hung in a row, each choice of three can be arranged in three factorial, or six, ways. Fifty-six times six is 336, which is eight P three.', show: 'm.0', focus: 'm.0' },
        { say: 'So choosing and then arranging is a permutation. If the question cares about the order, a combination alone is not enough.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A teacher chooses 4 of 10 students to present on the first day. The order of the presentations does not matter. How many groups are possible?',
          choices: ['$5040$', '$40$', '$210$', '$24$'],
          answer: 2,
          working: '${}_{10}C_{4} = \\dfrac{10 \\times 9 \\times 8 \\times 7}{4 \\times 3 \\times 2 \\times 1} = \\dfrac{5040}{24} = 210$.',
        },
      ],
      lines: [
        { say: 'Your turn. A teacher chooses four of ten students to present on the first day. The order of the presentations does not matter. How many groups are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 210. This is ten C four: ten times nine times eight times seven, which is 5,040, divided by four factorial, which is twenty-four. Choice A, 5,040, counts the groups in order, so each group is counted twenty-four times.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each group of $r$ objects can be ordered in $r!$ ways.', '${}_{n}C_{r} = \\dfrac{{}_{n}P_{r}}{r!} = \\dfrac{n!}{(n - r)!\\,r!}$', 'Choosing and then arranging: ${}_{n}C_{r} \\times r! = {}_{n}P_{r}$.'] }],
      lines: [
        { say: 'Let’s sum up. Every group of r objects can be put in order in r factorial ways.', show: 'sum.0' },
        { say: 'So n C r is n P r divided by r factorial, or n factorial over n minus r, factorial, times r factorial.', show: 'sum.1' },
        { say: 'And choosing then arranging gives n C r times r factorial, which is n P r. In part three, we choose from more than one group at once. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
