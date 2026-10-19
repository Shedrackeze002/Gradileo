import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns, partWhole } from './lib/m5-2-figures.ts';

// 10.20 − 3.85 = 6.35. Hundredths: regroup a tenth. Tenths: regroup a ten as ones, then a one as tenths.
const sub = figure('sb', [
  columns({
    top: '10.20',
    bottom: '3.85',
    answer: '6.35',
    op: '-',
    cross: [1, 0, -1, -2],
    tones: { ad2: 'theta' },
    marks: [
      { id: 'n2', place: -2, tex: '10', tone: 'theta' },
      { id: 't1', place: -1, tex: '1', tone: 'theta' },
      { id: 'n1', place: -1, tex: '11', tone: 'theta' },
      { id: 'n10', place: 1, tex: '0', tone: 'theta' },
      { id: 't0', place: 0, tex: '10', tone: 'theta' },
      { id: 'n0', place: 0, tex: '9', tone: 'theta' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm5-2-1-d',
  lessonId: 'm5-2-1',
  title: 'Adding and Subtracting with Standard Algorithms, Part 4: Finding a Missing Number',
  thumbnailTitle: 'Finding a Missing Number',
  thumbnail: 'bar',
  summary: 'Addition and subtraction undo each other, so a missing number can be found with the opposite operation: a bar split into parts shows why □ + 5 = 12 and □ − 4 = 9, then □ + 3.85 = 10.2 gives 10.2 − 3.85 = 6.35, checked by adding.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 4', title: 'Finding a Missing Number', subtitle: 'Addition and subtraction undo each other' }],
      lines: [
        { say: 'Sometimes a number is missing, and a box stands in its place. Box plus 3.85 equals 10.2. What goes in the box?', show: 'title' },
        { say: 'In this video, you will use the opposite operation to find a missing number.' },
      ],
    },
    {
      chapter: 'Undoing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Opposite operations', md: 'Addition and subtraction **undo** each other. Adding $5$ and then taking away $5$ brings you back to where you started.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 + 5 = 12', '12 - 5 = 7'] },
      ],
      lines: [
        { say: 'Addition and subtraction undo each other. If you add five, and then take five away, you are back where you started.', show: 'key' },
        { say: 'For example, seven plus five is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'And twelve minus five takes you back to seven. Subtracting five undid the adding.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A missing part',
      layout: 'center',
      main: [
        figure('bar', [partWhole({ total: '12', parts: [{ tex: '\\square', share: 7 }, { tex: '5', share: 5 }] })], 230),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\square + 5 = 12', '\\square = 12 - 5 = 7', '\\text{Check: } 7 + 5 = 12 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Here is box plus five equals twelve, drawn as a bar. The whole bar is twelve.', show: ['bar.whole', 'm.0'] },
        { say: 'It is made of two parts. One part is five, and the other part is the missing number.', show: ['bar.part0', 'bar.part1'], focus: 'bar.part0' },
        { say: 'To find a missing part, take the known part away from the whole. Twelve minus five is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Check it: seven plus five is twelve. So seven goes in the box.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A missing whole',
      layout: 'center',
      main: [
        figure('bw', [partWhole({ total: '\\square', parts: [{ tex: '9', share: 9 }, { tex: '4', share: 4 }] })], 230),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\square - 4 = 9', '\\square = 9 + 4 = 13'] },
      ],
      lines: [
        { say: 'Now try box minus four equals nine. This time, the box is the whole. Take four away from it, and nine is left.', show: ['m.0', 'bw.whole', 'bw.part0', 'bw.part1'] },
        { say: 'To find the whole, put the parts back together. Nine plus four is thirteen. Adding undoes the subtracting.', show: 'm.1', focus: 'm.1' },
        { say: 'So, to find a missing number, ask: is it a part or the whole? To find a part, subtract. To find the whole, add.' },
      ],
    },
    {
      chapter: 'What goes in the box?',
      layout: 'split',
      leftWidth: 540,
      left: [sub],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\square + 3.85 = 10.2', '\\square = 10.2 - 3.85', '\\square = 6.35'] }],
      lines: [
        { say: 'Now back to box plus 3.85 equals 10.2. Adding 3.85 gave 10.2. To undo it, subtract: 10.2 minus 3.85.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Write 10.2 as 10.20, so both numbers have two decimal places, and line up the points.', show: ['sb.top', 'sb.bottom', 'sb.bar'], focus: 'sb.ad2' },
        { say: 'Hundredths: zero is less than five. Regroup one tenth as ten hundredths. The two tenths become one, and the hundredths become ten. Ten minus five is five.', show: ['sb.xd1', 'sb.t1', 'sb.xd2', 'sb.n2', 'sb.sd2'], focus: ['sb.t1', 'sb.n2'] },
        { say: 'Tenths: one is less than eight. The ones digit is zero, so go to the tens. Regroup one ten as ten ones. The tens become zero, and the ones become ten.', show: ['sb.xp1', 'sb.n10', 'sb.xp0', 'sb.t0'], focus: ['sb.n10', 'sb.t0'] },
        { say: 'Then regroup one of those ones as ten tenths. The ones become nine, and the tenths become eleven. Eleven minus eight is three.', show: ['sb.n0', 'sb.n1', 'sb.sd1'], hide: ['sb.t0', 'sb.t1'], focus: ['sb.n0', 'sb.n1'] },
        { say: 'Ones: nine minus three is six. The tens are zero now, so we write nothing there. The missing number is 6.35.', show: ['sb.sp0', 'sb.ps', 'm.2'], focus: ['m.2', 'sb.sum'] },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['6.35 + 3.85 = 10.20 = 10.2 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check', md: 'Put your answer in the box and work out the sum. If you get the number on the other side, your answer is right.' },
      ],
      lines: [
        { say: 'Always check by putting your answer back in the box. 6.35 plus 3.85 is 10.20, which is the same as 10.2.', show: 'm.0', focus: 'm.0' },
        { say: 'It matches, so the missing number is 6.35. If it did not match, you would know to look for a mistake.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\square - 2.75 = 4.5$. What goes in the box?',
          choices: ['$1.75$', '$7.25$', '$3.20$', '$6.25$'],
          answer: 1,
          working: 'The box is the whole: taking $2.75$ away left $4.5$. Put the parts back together: $4.50 + 2.75 = 7.25$. Check: $7.25 - 2.75 = 4.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Box minus 2.75 equals 4.5. What goes in the box? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The box is the whole. Taking 2.75 away left 4.5, so add them back together: 4.50 plus 2.75 is 7.25. Choice A subtracts, but to undo taking 2.75 away, you add it back.', show: 'q.answer' },
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
          items: ['Addition and subtraction undo each other.', 'A missing part: subtract the known part from the whole. A missing whole: add the parts.', 'Check by putting your answer back in the box.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Addition and subtraction undo each other.', show: 'sum.0' },
        { say: 'To find a missing part, subtract the known part from the whole. To find a missing whole, add the parts together.', show: 'sum.1' },
        { say: 'And always check by putting your answer back in the box. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
