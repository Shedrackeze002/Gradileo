import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups, heightFor, longDivision } from '@/content/math5/videos/lib/m5-4-figures.ts';

// 12 shared equally into 3 groups: 4 in each.
const share = figure('sh', [dotGroups({ groups: 3, size: 4, cols: 2, tone: 'theta', labels: ['4', '4', '4'] })], 300);

// 391 ÷ 17 = 23: 39 − 34 = 5, bring down 1 to make 51; 51 − 51 = 0.
const work = (() => {
  const part = longDivision({
    divisor: '17',
    dividend: '391',
    quotient: ' 23',
    steps: [
      { prod: '34', at: 1, diff: '5', down: true },
      { prod: '51', at: 2, diff: '0' },
    ],
  });
  return figure('ld', [part], heightFor(part, 50));
})();

const video: Explainer = {
  id: 'm6-2-3',
  lessonId: 'm6-2-3',
  title: 'Dividing Decimal and Natural Numbers, Part 1: Long Division',
  thumbnailTitle: 'Long Division by Two Digits',
  thumbnail: 'ld',
  summary: 'Dividing means sharing equally. The dividend, divisor and quotient, and long division by a two-digit number with its four steps (divide, multiply, subtract, bring down): 391 ÷ 17 = 23, made easier with a list of multiples of 17 and checked by multiplying 23 × 17 = 391.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 1', title: 'Long Division', subtitle: 'Dividing by a two-digit number' }],
      lines: [
        { say: 'Twelve friends share the cost of a meal. A rope is cut into seventeen equal pieces. To share or split something equally, we divide.', show: 'title' },
        { say: 'In this video, you will learn three words for the parts of a division, and use long division to divide by a two-digit number.' },
      ],
    },
    {
      chapter: 'Sharing equally',
      layout: 'split',
      leftWidth: 560,
      left: [share],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['12 \\div 3 = 4'] }],
      lines: [
        { say: 'Dividing means sharing equally. Here are twelve counters, shared equally into three groups.', show: ['sh.g0', 'sh.g1', 'sh.g2'] },
        { say: 'Each group gets four counters. So twelve divided by three is four.', show: ['sh.labels', 'm.0'], focus: ['sh.labels', 'm.0'] },
      ],
    },
    {
      chapter: 'Words to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dividend, divisor and quotient', md: 'In $391 \\div 17 = 23$, the number being divided ($391$) is the **dividend**. The number you divide by ($17$) is the **divisor**. The answer ($23$) is the **quotient**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\thc{391} \\div \\adj{17} = \\good{23}', '\\thc{\\text{dividend}} \\div \\adj{\\text{divisor}} = \\good{\\text{quotient}}'] },
      ],
      lines: [
        { say: 'Each part of a division has a name. Look at 391 divided by 17 equals 23.', show: ['def', 'm.0'] },
        { say: 'The number being divided, 391, is the dividend.', focus: 'm.0' },
        { say: 'The number you divide by, 17, is the divisor.' },
        { say: 'And the answer, 23, is the quotient. Dividend divided by divisor equals quotient.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Divide:** how many times does the divisor go in?', '**Multiply:** the divisor times that digit.', '**Subtract:** what is left must be less than the divisor.', '**Bring down** the next digit, and repeat.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use friendly multiples', md: 'Write a few multiples of the divisor first: $17,\\ 34,\\ 51,\\ 68,\\ 85, \\ldots$ Then you can see how many times it goes in.' },
      ],
      lines: [
        { say: 'Long division is the standard algorithm for dividing. It repeats four steps: divide, multiply, subtract, bring down.', show: 'b' },
        { say: 'Dividing by a two-digit number like 17 is harder to do in your head. So here is a tip. First, write a few multiples of the divisor.', show: 'tip' },
        { say: 'Seventeen, 34, 51, 68, 85, and so on. Then you can see at a glance how many times 17 goes in.' },
      ],
    },
    {
      chapter: 'Divide 391 by 17',
      layout: 'split',
      leftWidth: 480,
      left: [work],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Multiples: } 17,\\ \\thc{34},\\ \\thc{51},\\ 68,\\ 85', '2 \\times 17 = 34, \\quad 39 - 34 = 5', '3 \\times 17 = 51, \\quad 51 - 51 = 0', '391 \\div 17 = 23'] }],
      lines: [
        { say: 'Let’s divide 391 by 17. Write 391 inside the bracket, and 17 outside. Then list the multiples of 17.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'm.0'] },
        { say: 'Start on the left. Seventeen does not go into three, so use the first two digits: 39.', focus: ['ld.dd0', 'ld.dd1'] },
        { say: 'Divide: how many times does 17 go into 39? Two times, because two times 17 is 34. Three times 17 is 51, which is too big. Write the two above the nine.', show: 'ld.q1', focus: ['ld.q1', 'm.0'] },
        { say: 'Multiply: two times 17 is 34. Write it under 39. Subtract: 39 minus 34 is five. Five is less than 17, so that is right.', show: ['ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'm.1'], focus: ['ld.s0-diff', 'm.1'] },
        { say: 'Bring down the next digit, the one, to make 51.', show: ['ld.s0-arrow', 'ld.s0-down'], focus: ['ld.s0-diff', 'ld.s0-down'] },
        { say: 'Divide: how many times does 17 go into 51? Three times, exactly. Write the three above the one. Multiply: three times 17 is 51. Subtract: 51 minus 51 is zero.', hide: 'ld.s0-arrow', show: ['ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'm.2'], focus: ['ld.q2', 'm.2'] },
        { say: 'There are no more digits to bring down, and nothing is left over. So 391 divided by 17 is 23.', show: 'm.3', focus: ['ld.quotient', 'm.3'] },
      ],
    },
    {
      chapter: 'Check by multiplying',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by multiplying', md: 'Multiply the quotient by the divisor. You should get the dividend.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['23 \\times 17 = 23 \\times 7 + 23 \\times 10', '= 161 + 230 = 391 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Multiplying and dividing undo each other. So check a division by multiplying the quotient by the divisor. You should get the dividend back.', show: 'tip' },
        { say: '23 times 17 is 23 times seven, plus 23 times ten.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 161 plus 230, which is 391. It is the dividend we started with, so the answer is right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $442 \\div 17$.',
          choices: ['$26$', '$25$ R $17$', '$206$', '$16$'],
          answer: 0,
          working: '$17$ goes into $44$ two times ($34$), leaving $10$. Bring down the $2$: $17$ goes into $102$ six times ($102$), leaving $0$. Check: $26 \\times 17 = 442$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 442 divided by 17. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 26. Seventeen goes into 44 two times, leaving ten. Bring down the two to make 102, and 17 goes into 102 six times exactly. Choice B has a remainder of 17, as big as the divisor, so one more 17 still fits.', show: 'q.answer' },
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
          items: ['Dividend $\\div$ divisor $=$ quotient.', 'Long division: divide, multiply, subtract, bring down. Repeat.', 'List multiples of the divisor, and check by multiplying: $23 \\times 17 = 391$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The dividend divided by the divisor equals the quotient.', show: 'sum.0' },
        { say: 'Long division repeats four steps: divide, multiply, subtract, bring down.', show: 'sum.1' },
        { say: 'List a few multiples of the divisor to help, and check by multiplying. In the next part, we divide a decimal number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
