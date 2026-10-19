import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups, heightFor, longDivision } from './lib/m5-4-figures.ts';

// 367 ÷ 7 = 52 R 3: 36 − 35 = 1, bring down 7 to make 17, 17 − 14 = 3.
const work = (id: string) => {
  const part = longDivision({
    divisor: '7',
    dividend: '367',
    quotient: ' 52',
    remainder: '3',
    steps: [
      { prod: '35', at: 1, diff: '1', down: true },
      { prod: '14', at: 2, diff: '3' },
    ],
  });
  return figure(id, [part], heightFor(part, 52));
};

// The 17 apples, before any bag is filled: every dot, but no rings.
const apples = [...[0, 1, 2].flatMap((i) => [0, 1, 2, 3, 4].map((j) => `g.g${i}-d${j}`)), 'g.extra'];

const video: Explainer = {
  id: 'm5-4-2',
  lessonId: 'm5-4-2',
  title: 'Dividing with the Standard Algorithm, Part 1: Words for Division',
  thumbnailTitle: 'Words for Division',
  thumbnail: 'ld',
  summary: 'Sharing 17 apples into bags of 5 to meet the dividend, divisor, quotient and remainder (the remainder is always less than the divisor), then long division of 367 by 7, one place at a time: 52 R 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 1', title: 'Words for Division', subtitle: 'Dividend, divisor, quotient and remainder' }],
      lines: [
        { say: 'A class picks 367 apples at an orchard, and packs them in bags of seven. How many bags can they fill, and how many apples are left over?', show: 'title' },
        { say: 'Dividing a big number in your head is hard. In this video, you will learn the words for division, and see how long division works, one place at a time.' },
      ],
    },
    {
      chapter: 'Packing apples',
      layout: 'center',
      main: [
        figure('g', [dotGroups({ groups: 3, size: 5, extra: 2, cols: 3, tone: 'good', labels: ['\\text{bag 1}', '\\text{bag 2}', '\\text{bag 3}'] })], 300),
        { kind: 'math', id: 'm', size: 'md', lines: ['17 \\div 5 = 3 \\text{ R } 2'] },
      ],
      lines: [
        { say: 'Let’s start small. Say we have 17 apples, and we pack them in bags of five.', show: apples },
        { say: 'Fill one bag with five apples.', show: ['g.g0-ring', 'g.lab0'], focus: 'g.g0' },
        { say: 'Fill a second bag.', show: ['g.g1-ring', 'g.lab1'], focus: 'g.g1' },
        { say: 'And fill a third bag. That uses 15 apples.', show: ['g.g2-ring', 'g.lab2'], focus: 'g.g2' },
        { say: 'Now only two apples are left. Two is less than five, so there are not enough for another bag.', focus: 'g.extra' },
        { say: 'So 17 divided by five is three, with two left over. We write it like this. The R stands for remainder.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Words for division',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['17 \\div \\adj{5} = \\good{3} \\text{ R } \\opp{2}'] },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The **dividend** is the number being divided: $17$.',
            'The [[adj:divisor]] is the number you divide by: $5$.',
            'The [[good:quotient]] is the answer: $3$.',
            'The [[opp:remainder]] is what is left over: $2$. It is always less than the divisor.',
          ],
        },
      ],
      lines: [
        { say: 'Division has four special words. The dividend is the number being divided. Here it is 17, the apples we start with.', show: ['m.0', 'b.0'] },
        { say: 'The divisor is the number you divide by. Here it is five, the number of apples in each bag.', show: 'b.1' },
        { say: 'The quotient is the answer: three bags.', show: 'b.2' },
        { say: 'And the remainder is what is left over: two apples. The remainder is always less than the divisor. If five or more apples were left, we could fill another bag!', show: 'b.3' },
      ],
    },
    {
      chapter: 'Long division',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld')],
      right: [
        { kind: 'callout', id: 'how', tone: 'key', title: 'How to write it', md: 'The **dividend** goes inside the bracket. The [[adj:divisor]] goes outside, on the left. The [[good:quotient]] goes on top, and the [[opp:remainder]] after an R.' },
      ],
      lines: [
        { say: 'Back to the 367 apples, in bags of seven. For big numbers, we use long division. Here is how to write it.', show: 'how' },
        { say: 'The dividend, 367, goes inside the bracket. The divisor, seven, goes outside, on the left.', show: ['ld.bracket', 'ld.dividend', 'ld.dv'], focus: ['ld.dividend', 'ld.dv'] },
        { say: 'The quotient will go on top, above the bracket, one digit at a time. Any remainder goes after an R.', focus: 'ld' },
      ],
    },
    {
      chapter: 'Divide 367 by 7',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['36 \\div 7 = 5 \\text{ R } 1', '7 \\times 5 = 35', '17 \\div 7 = 2 \\text{ R } 3', '7 \\times 2 = 14'] }],
      lines: [
        { say: 'Divide one place at a time, starting on the left. The first digit is three. Can we make a group of seven from three? No. Three is less than seven.', show: ['ld2.bracket', 'ld2.dividend', 'ld2.dv'], focus: 'ld2.dd0' },
        { say: 'So use the first two digits together: 36.', focus: ['ld2.dd0', 'ld2.dd1'] },
        { say: 'How many sevens are in 36? Count up in sevens. Seven times five is 35, and seven times six is 42. 42 is more than 36, so the answer is five. Write the five on top, above the six.', show: ['m.0', 'ld2.q1'], focus: ['ld2.q1', 'm.0'] },
        { say: 'Multiply: seven times five is 35. Write 35 under the 36.', show: ['m.1', 'ld2.s0-prod'], focus: ['ld2.s0-prod', 'm.1'] },
        { say: 'Subtract: 36 minus 35 is one.', show: ['ld2.s0-rule', 'ld2.s0-diff'], focus: 'ld2.s0-diff' },
        { say: 'Now bring down the next digit, the seven. Write it next to the one, to make 17.', show: ['ld2.s0-arrow', 'ld2.s0-down'], focus: ['ld2.s0-down', 'ld2.s0-diff'] },
        { say: 'How many sevens are in 17? Seven times two is 14, and seven times three is 21. 21 is more than 17, so the answer is two. Write the two on top, above the seven.', hide: 'ld2.s0-arrow', show: ['m.2', 'ld2.q2'], focus: ['ld2.q2', 'm.2'] },
        { say: 'Multiply: seven times two is 14. Subtract: 17 minus 14 is three.', show: ['m.3', 'ld2.s1-prod', 'ld2.s1-rule', 'ld2.s1-diff'], focus: ['ld2.s1-diff', 'm.3'] },
        { say: 'There are no more digits to bring down. Three is less than seven, so three is the remainder. Write R three after the quotient.', show: 'ld2.rem', focus: ['ld2.rem', 'ld2.s1-diff'] },
        { say: 'So 367 divided by seven is 52 remainder three. The class fills 52 bags, with three apples left over.', focus: ['ld2.quotient', 'ld2.rem'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $87 \\div 4$.',
          choices: ['$20$ R $7$', '$21$ R $1$', '$21$ R $3$', '$22$'],
          answer: 2,
          working: '$8 \\div 4 = 2$, write $2$; $8 - 8 = 0$. Bring down the $7$: $4$ goes into $7$ once, $7 - 4 = 3$. So $87 \\div 4 = 21$ R $3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 87 divided by four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 21 remainder three. Four goes into eight two times. Bring down the seven. Four goes into seven one time, with three left over. Choice A has a remainder of seven, but a remainder must be less than the divisor, four.', show: 'q.answer' },
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
          items: ['The **dividend** is divided by the **divisor**. The answer is the **quotient**.', 'The **remainder** is what is left over. It is always less than the divisor.', 'Long division works one place at a time, from the left.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The dividend is the number being divided, and the divisor is the number you divide by. The answer is the quotient.', show: 'sum.0' },
        { say: 'The remainder is what is left over, and it is always less than the divisor.', show: 'sum.1' },
        { say: 'Long division works one place at a time, starting on the left. In the next part, we learn the four steps that make it work every time. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
