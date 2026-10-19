import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups, heightFor, longDivision } from './lib/m5-4-figures.ts';

// 157 ÷ 8 = 19 R 5: 15 − 8 = 7, bring down 7 to make 77, 77 − 72 = 5.
const work = (id: string) => {
  const part = longDivision({
    divisor: '8',
    dividend: '157',
    quotient: ' 19',
    remainder: '5',
    steps: [
      { prod: '8', at: 1, diff: '7', down: true },
      { prod: '72', at: 2, diff: '5' },
    ],
  });
  return figure(id, [part], heightFor(part, 52));
};

const video: Explainer = {
  id: 'm5-4-3-b',
  lessonId: 'm5-4-3',
  title: 'Solving Multiplication and Division Problems, Part 2: What to Do with a Remainder',
  thumbnailTitle: 'What to Do with a Remainder',
  thumbnail: 'vans',
  summary: 'The same division, 157 ÷ 8 = 19 R 5, answers three questions three ways: round up (20 vans for 157 students), drop the remainder (19 cookies each for 8 friends) or answer with the remainder (5 cookies left over). The question decides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing · Part 2', title: 'What to Do with a Remainder', subtitle: 'Round up, drop it, or use it' }],
      lines: [
        { say: '157 students are going on a field trip, and each van holds eight students. 157 divided by eight is 19 remainder five. But you cannot order 19 and a bit vans!', show: 'title' },
        { say: 'In this video, you will decide what a remainder means. Sometimes you round up, sometimes you drop it, and sometimes the remainder is the answer.' },
      ],
    },
    {
      chapter: 'Divide 157 by 8',
      layout: 'split',
      leftWidth: 460,
      left: [work('ld')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['15 \\div 8 = 1 \\text{ R } 7', '77 \\div 8 = 9 \\text{ R } 5', '157 \\div 8 = 19 \\text{ R } 5', '\\text{Check: } 8 \\times 19 + 5 = 157'] }],
      lines: [
        { say: 'First, let’s do the division. Eight does not go into one, so start with 15. One eight fits in 15. Write one on top. 15 minus eight is seven.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'ld.q1', 'ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'm.0'], focus: ['ld.q1', 'm.0'] },
        { say: 'Bring down the seven to make 77. Nine eights are 72. Write nine on top. 77 minus 72 is five.', show: ['ld.s0-down', 'ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'm.1'], focus: ['ld.q2', 'm.1'] },
        { say: 'Five is less than eight, so it is the remainder. 157 divided by eight is 19 remainder five.', show: ['ld.rem', 'm.2'], focus: ['ld.quotient', 'ld.rem', 'm.2'] },
        { say: 'Check: eight times 19 is 152, plus five is 157. Now, what does that remainder mean? It depends on the question.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Vans: round up',
      layout: 'split',
      leftWidth: 560,
      left: [figure('vans', [dotGroups({ groups: 3, size: 4, extra: 1, cols: 2, perRow: 2, tone: 'adj', extraRing: true, labels: ['\\text{van 1}', '\\text{van 2}', '\\text{van 3}', '\\text{van 4}'] })], 440)],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$157$ students go on a field trip. Each van holds $8$ students. How many vans are needed?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['157 \\div 8 = 19 \\text{ R } 5', '19 \\text{ vans hold } 152', '\\good{20 \\text{ vans}}'] },
      ],
      lines: [
        { say: 'Picture a smaller trip first. Thirteen students, and each van holds four. Three vans hold twelve students.', show: ['vans.g0', 'vans.g1', 'vans.g2', 'vans.labels'] },
        { say: 'One student is left. We cannot leave that student behind, so we need one more van, even though it is not full.', show: 'vans.extra', focus: 'vans.extra' },
        { say: 'Now the real trip. 157 students, eight in each van. 157 divided by eight is 19 remainder five.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'Nineteen vans hold 152 students. The other five students still need a ride, so they need one more van.', show: 'm.1', focus: 'm.1' },
        { say: 'So round up: 20 vans are needed. When the remainder needs a group of its own, round up.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Cookies: drop it or use it',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: '$157$ cookies are shared equally among $8$ friends. How many does each friend get? How many are left over?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['157 \\div 8 = 19 \\text{ R } 5', '8 \\times 19 = 152', '\\text{Each friend gets } \\good{19}. \\quad \\opp{5} \\text{ are left over.}'] },
      ],
      lines: [
        { say: 'Now the same numbers in a new story. 157 cookies are shared equally among eight friends. How many does each friend get? And how many are left over?', show: 't' },
        { say: 'Divide: 157 divided by eight is 19 remainder five.', show: 'm.0', focus: 'm.0' },
        { say: 'Each friend gets 19 cookies. That uses eight times 19, which is 152 cookies.', show: 'm.1', focus: 'm.1' },
        { say: 'The five cookies left cannot be shared equally among eight friends. So for each share, we drop the remainder: each friend gets 19.', show: 'm.2', focus: 'm.2' },
        { say: 'But the second question asks how many are left over. For that one, the remainder is the answer: five cookies.' },
      ],
    },
    {
      chapter: 'The question decides',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Question', 'Answer'],
          rows: [
            ['How many vans for $157$ students?', '$20$ vans (**round up**)'],
            ['How many cookies does each of $8$ friends get?', '$19$ cookies (**drop the remainder**)'],
            ['How many cookies are left over?', '$5$ cookies (**the remainder**)'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Every time: } 157 \\div 8 = 19 \\text{ R } 5'] },
      ],
      lines: [
        { say: 'Look at all three answers together. The division was the same every time: 157 divided by eight is 19 remainder five.', show: 'm.0' },
        { say: 'For the vans, the five students need a ride, so we round up to 20.', show: 'tb.0', focus: 'tb.0' },
        { say: 'For each friend’s share, the five cookies cannot be shared fairly, so we drop the remainder: 19.', show: 'tb.1', focus: 'tb.1' },
        { say: 'And when the question asks what is left over, the remainder is the answer: five.', show: 'tb.2', focus: 'tb.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Always rounding the same way', md: 'Do not just write the quotient. Ask: does the remainder need its own group (**round up**)? Can it be left out (**drop it**)? Or is the remainder the answer?' },
      ],
      lines: [
        { say: 'Watch out. Do not just write the quotient, or always round the same way.', show: 'oops' },
        { say: 'Ask yourself: does the remainder need a group of its own? Then round up. Can it be left out? Then drop it. Or does the question ask what is left? Then the remainder is the answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A teacher has $75$ stickers. Each student gets exactly $4$ stickers. How many students get stickers?',
          choices: ['$19$ students', '$3$ students', '$18$ students', '$20$ students'],
          answer: 2,
          working: '$75 \\div 4 = 18$ R $3$. Eighteen students get $4$ stickers each. The $3$ stickers left are not enough for another student, so drop the remainder: $18$ students.',
        },
      ],
      lines: [
        { say: 'Your turn. A teacher has 75 stickers. Each student gets exactly four stickers. How many students get stickers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 18 students. 75 divided by four is 18 remainder three. Three stickers are not enough for another student to get four, so drop the remainder. Choice A rounds up, but the nineteenth student would get only three stickers.', show: 'q.answer' },
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
          items: ['The question decides what a remainder means.', '**Round up** when the remainder needs a group of its own.', '**Drop the remainder** when it cannot make a full group.', 'Use **the remainder** as the answer when the question asks what is left.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The same division can give different answers. The question decides what the remainder means.', show: 'sum.0' },
        { say: 'Round up when the remainder needs a group of its own, like students who need a van.', show: 'sum.1' },
        { say: 'Drop the remainder when it cannot make a full group, like cookies that cannot be shared fairly.', show: 'sum.2' },
        { say: 'And use the remainder as the answer when the question asks what is left over. In the next part, we solve problems with two steps. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
