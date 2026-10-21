import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns, partWhole } from '@/content/math5/videos/lib/m5-2-figures.ts';

// $50 paid: the binder ($12.50) and the scissors ($16.25) are spent, and the rest is the change.
const money = figure(
  'mn',
  [partWhole({ total: '\\$50.00', parts: [{ tex: '\\$12.50', share: 12.5 }, { tex: '\\$16.25', share: 16.25 }, { tex: '\\text{change?}', share: 21.25, tone: 'theta' }], width: 12 })],
  250,
);

// Step 1: 12.50 + 16.25 = 28.75 (no regrouping).
const total = figure('tt', [columns({ top: '12.50', bottom: '16.25', answer: '28.75', op: '+' })]);

// Step 2: 50.00 − 28.75 = 21.25, with 50.00 regrouped as 4 tens, 9 ones, 9 tenths and 10 hundredths.
const change = figure('ch', [
  columns({
    top: '50.00',
    bottom: '28.75',
    answer: '21.25',
    op: '-',
    cross: [1, 0, -1, -2],
    marks: [
      { id: 'n1', place: 1, tex: '4', tone: 'theta' },
      { id: 'n0', place: 0, tex: '9', tone: 'theta' },
      { id: 'nd1', place: -1, tex: '9', tone: 'theta' },
      { id: 'nd2', place: -2, tex: '10', tone: 'theta' },
    ],
  }),
]);

// The trail: 25.4 km in all, 10.2 km on Saturday, 5.6 km on Sunday, and the rest still to ride.
const trail = figure(
  'tr',
  [partWhole({ total: '25.4\\text{ km}', parts: [{ tex: '10.2', share: 10.2 }, { tex: '5.6', share: 5.6 }, { tex: '\\text{left?}', share: 9.6, tone: 'theta' }], width: 12 })],
  250,
);

// 25.4 − 15.8 = 9.6: regroup a one for the tenths, then a ten for the ones.
const left = figure('lf', [
  columns({
    top: '25.4',
    bottom: '15.8',
    answer: '9.6',
    op: '-',
    cross: [1, 0, -1],
    marks: [
      { id: 'n1', place: 1, tex: '1', tone: 'theta' },
      { id: 't0', place: 0, tex: '4', tone: 'theta' },
      { id: 'n0', place: 0, tex: '14', tone: 'theta' },
      { id: 'nd1', place: -1, tex: '14', tone: 'theta' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm6-2-1-c',
  lessonId: 'm6-2-1',
  title: 'Solving Addition and Subtraction Problems, Part 3: Two-Step Problems',
  thumbnailTitle: 'Two-Step Problems',
  thumbnail: 'mn',
  summary: 'Making a plan for problems that take two steps: words like total and altogether mean add, and change, left and difference mean subtract. A $12.50 binder and $16.25 scissors cost $28.75, so the change from $50 is $21.25; a family that rides 10.2 km and 5.6 km of a 25.4 km trail has 9.6 km left, checked with an estimate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 3', title: 'Two-Step Problems', subtitle: 'Make a plan, then add and subtract' }],
      lines: [
        { say: 'Some problems cannot be solved in one step. You might need to add first, and then subtract the answer from something else.', show: 'title' },
        { say: 'In this video, you will make a plan for a problem with two steps, solve it with the standard algorithms, and check the answer.' },
      ],
    },
    {
      chapter: 'Make a plan',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['These words', 'usually mean'],
          rows: [
            ['total, in all, altogether', '**add**'],
            ['change, left, how much more, difference', '**subtract**'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Make a plan', md: 'Read the problem carefully. Ask: what do I need to find **first**? Then what?' },
      ],
      lines: [
        { say: 'Before you calculate, read the problem carefully and make a plan. Some words give you a clue.', show: 't' },
        { say: 'Total, in all, and altogether usually mean add.', focus: 't.0' },
        { say: 'Change, left, how much more, and difference usually mean subtract.', focus: 't.1' },
        { say: 'For a problem with two steps, ask yourself: what do I need to find first? And what do I do with it next?', show: 'tip' },
      ],
    },
    {
      chapter: 'Getting change',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'Isabelle buys a binder for \\$12.50 and scissors for \\$16.25. Isabelle pays with a \\$50 bill. How much change should Isabelle get?' }, money],
      lines: [
        { say: 'Isabelle buys a binder for 12 dollars and 50 cents, and scissors for 16 dollars and 25 cents. Isabelle pays with a fifty-dollar bill. How much change should Isabelle get?', show: 'q' },
        { say: 'Picture the fifty dollars as a bar. Part of it pays for the binder, and part of it pays for the scissors.', show: ['mn.whole', 'mn.part0', 'mn.part1'] },
        { say: 'The part that is left over is the change.', show: 'mn.part2', focus: 'mn.part2' },
        { say: 'So here is the plan. Step one: add to find the total cost. Step two: subtract the total from fifty dollars.' },
      ],
    },
    {
      chapter: 'Step 1: the total cost',
      layout: 'split',
      leftWidth: 520,
      left: [total],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 0 + 5 = 5', '\\text{Tenths: } 5 + 2 = 7', '\\text{Ones: } 2 + 6 = 8', '\\text{Tens: } 1 + 1 = 2'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Total cost: **\\$28.75**' },
      ],
      lines: [
        { say: 'Step one: add the two prices. Line up the decimal points.', show: ['tt.top', 'tt.bottom', 'tt.bar'] },
        { say: 'Hundredths: zero plus five is five. Tenths: five plus two is seven.', show: ['tt.sd2', 'tt.sd1', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Ones: two plus six is eight. Tens: one plus one is two. No column adds to ten or more, so there is nothing to regroup.', show: ['tt.sp0', 'tt.sp1', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The total cost is 28 dollars and 75 cents.', show: ['tt.ps', 'a'], focus: 'tt.sum' },
      ],
    },
    {
      chapter: 'Step 2: the change',
      layout: 'split',
      leftWidth: 520,
      left: [change],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 10 - 5 = 5', '\\text{Tenths: } 9 - 7 = 2', '\\text{Ones: } 9 - 8 = 1', '\\text{Tens: } 4 - 2 = 2'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Isabelle should get **\\$21.25** in change.' },
      ],
      lines: [
        { say: 'Step two: subtract the total from fifty dollars. Write 50 as 50.00.', show: ['ch.top', 'ch.bottom', 'ch.bar'] },
        { say: 'The top digits on the right are zeros, so regroup from the tens. 50.00 is 4 tens, 9 ones, 9 tenths and 10 hundredths.', show: ['ch.xp1', 'ch.xp0', 'ch.xd1', 'ch.xd2', 'ch.n1', 'ch.n0', 'ch.nd1', 'ch.nd2'], focus: ['ch.n1', 'ch.n0', 'ch.nd1', 'ch.nd2'] },
        { say: 'Hundredths: ten minus five is five. Tenths: nine minus seven is two.', show: ['ch.sd2', 'ch.sd1', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Ones: nine minus eight is one. Tens: four minus two is two.', show: ['ch.sp0', 'ch.sp1', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'So Isabelle should get 21 dollars and 25 cents in change. Check by adding: 21.25 plus 28.75 is 50.00.', show: ['ch.ps', 'a'], focus: 'ch.sum' },
      ],
    },
    {
      chapter: 'Biking a trail',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A family is biking a trail that is $25.4$ km long. They bike $10.2$ km on Saturday and $5.6$ km on Sunday. How much of the trail is left?' },
        trail,
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Step 1: } 10.2 + 5.6 = 15.8', '\\text{Step 2: } 25.4 - 15.8 = \\; ?'] },
      ],
      lines: [
        { say: 'Here is a problem with distances. A family is biking a trail that is 25.4 kilometres long. They bike 10.2 kilometres on Saturday, and 5.6 kilometres on Sunday. How much of the trail is left?', show: ['q', 'tr.whole'] },
        { say: 'Picture the trail as a bar. The two days take up two parts, and the rest of the trail is left.', show: ['tr.part0', 'tr.part1', 'tr.part2'], focus: 'tr.part2' },
        { say: 'Step one: add the two days. 10.2 plus 5.6 is 15.8 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: subtract that from the length of the trail: 25.4 minus 15.8.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'How much is left?',
      layout: 'split',
      leftWidth: 500,
      left: [left],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Tenths: } 14 - 8 = 6', '\\text{Ones: } 14 - 5 = 9', '\\text{Tens: } 1 - 1 = 0', '\\text{Estimate: } 25 - 16 = 9'] },
        { kind: 'text', id: 'a', size: 'md', md: '**9.6 km** of the trail is left.' },
      ],
      lines: [
        { say: 'Line up the decimal points. Tenths: four minus eight? Too small. Regroup one of the ones as ten tenths. The five ones become four, and the tenths become fourteen. Fourteen minus eight is six.', show: ['lf.top', 'lf.bottom', 'lf.bar', 'lf.xp0', 'lf.t0', 'lf.xd1', 'lf.nd1', 'lf.sd1', 'm.0'], focus: ['lf.t0', 'lf.nd1', 'm.0'] },
        { say: 'Ones: four minus five? Too small again. Regroup one ten as ten ones. The two tens become one, and the ones become fourteen. Fourteen minus five is nine.', hide: 'lf.t0', show: ['lf.xp1', 'lf.n1', 'lf.n0', 'lf.sp0', 'lf.ps', 'm.1'], focus: ['lf.n1', 'lf.n0', 'm.1'] },
        { say: 'Tens: one minus one is zero, so we write nothing there. 9.6 kilometres of the trail is left.', show: ['m.2', 'a'], focus: 'lf.sum' },
        { say: 'Check with an estimate. The trail is about 25 kilometres, and they rode about 16. 25 minus 16 is 9, which is close to 9.6. The answer is reasonable.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sam buys a cap for \\$14.75 and socks for \\$6.40. Sam pays with a \\$30 bill. How much change does Sam get?',
          choices: ['\\$8.85', '\\$21.15', '\\$9.85', '\\$51.15'],
          answer: 0,
          working: 'Step 1: $14.75 + 6.40 = 21.15$. Step 2: $30.00 - 21.15 = 8.85$. Check: $8.85 + 21.15 = 30.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. Sam buys a cap for 14 dollars and 75 cents, and socks for 6 dollars and 40 cents. Sam pays with a thirty-dollar bill. How much change does Sam get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 8 dollars and 85 cents. First add: the total is 21 dollars and 15 cents. Then subtract it from 30 dollars. Choice B is only the first step: it is the total, not the change.', show: 'q.answer' },
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
          items: ['Total, in all and altogether usually mean add. Change, left and difference usually mean subtract.', 'For a two-step problem, make a plan: what do you find first?', 'Check with an estimate or by adding back.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Words like total and altogether usually mean add. Words like change, left and difference usually mean subtract.', show: 'sum.0' },
        { say: 'For a problem with two steps, make a plan. Decide what you need to find first, and what to do with it next.', show: 'sum.1' },
        { say: 'And check your answer with an estimate, or by adding back. In the next lesson, we multiply decimal numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
