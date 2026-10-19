import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns, partWhole } from './lib/m5-2-figures.ts';

// The trail as a bar: Saturday, Sunday, and the part that is left.
const trail = figure('tr', [
  partWhole({
    total: '12.5 \\text{ km}',
    parts: [
      { tex: '\\text{Sat } 4.75', share: 4.75, tone: 'adj' },
      { tex: '\\text{Sun } 3.875', share: 3.875, tone: 'opp' },
      { tex: '\\text{left: } ?', share: 3.875, tone: 'good' },
    ],
    width: 12,
  }),
]);

// Step one: 4.750 + 3.875 = 8.625, carrying into the tenths and the ones.
const add = figure('ad', [
  columns({
    top: '4.750',
    bottom: '3.875',
    answer: '8.625',
    op: '+',
    tones: { ad3: 'theta' },
    marks: [
      { id: 'k1', place: -1, tex: '1' },
      { id: 'k0', place: 0, tex: '1' },
    ],
  }),
]);

// Step two: 12.500 − 8.625 = 3.875, regrouping in four columns.
const sub = figure('sb', [
  columns({
    top: '12.500',
    bottom: '8.625',
    answer: '3.875',
    op: '-',
    cross: [1, 0, -1, -2, -3],
    tones: { ad2: 'theta', ad3: 'theta' },
    marks: [
      { id: 'a1', place: -1, tex: '4', tone: 'theta' },
      { id: 't2', place: -2, tex: '10', tone: 'theta' },
      { id: 'n2', place: -2, tex: '9', tone: 'theta' },
      { id: 'n3', place: -3, tex: '10', tone: 'theta' },
      { id: 'a0', place: 0, tex: '1', tone: 'theta' },
      { id: 'b1', place: -1, tex: '14', tone: 'theta' },
      { id: 'n10', place: 1, tex: '0', tone: 'theta' },
      { id: 'b0', place: 0, tex: '11', tone: 'theta' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm5-2-2-d',
  lessonId: 'm5-2-2',
  title: 'Estimating and Solving Problems, Part 4: Problems with Measurements',
  thumbnailTitle: 'Two-Step Problems',
  thumbnail: 'tr',
  summary: 'A two-step problem with metric measurements: a 12.5 km trail, with 4.75 km hiked on Saturday and 3.875 km on Sunday. Add the two days (8.625 km), then subtract from the whole trail (3.875 km left), and check by adding and by estimating.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 4', title: 'Problems with Measurements', subtitle: 'Two steps, with decimals' }],
      lines: [
        { say: 'Metric measurements use decimals: 2.5 kilometres, 0.875 kilograms, 1.25 litres. Many problems about them take two steps.', show: 'title' },
        { say: 'In this video, you will solve a two-step problem about a hiking trail.' },
      ],
    },
    {
      chapter: 'A hiking trail',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'A trail is $12.5$ km long. Kateri hikes $4.75$ km on Saturday and $3.875$ km on Sunday. How much of the trail is left?' }, trail],
      lines: [
        { say: 'A trail is 12.5 kilometres long. Kateri hikes 4.75 kilometres on Saturday, and 3.875 kilometres on Sunday. How much of the trail is left?', show: 'q' },
        { say: 'Picture the whole trail as a bar, 12.5 kilometres long.', show: 'tr.whole' },
        { say: 'Part of it was hiked on Saturday, and part on Sunday. The rest is left, and that is what we want to find.', show: ['tr.part0', 'tr.part1', 'tr.part2'], focus: 'tr.part2' },
        { say: 'So there are two steps. First, add the two days to find how far Kateri hiked. Then subtract that from the whole trail.' },
      ],
    },
    {
      chapter: 'Step 1: add',
      layout: 'split',
      leftWidth: 520,
      left: [add],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4.75 + 3.875', '= 4.750 + 3.875', '= 8.625 \\text{ km}'] }],
      lines: [
        { say: 'Step one: add the two days. Line up the decimal points, and write 4.75 as 4.750.', show: ['m.0', 'm.1', 'ad.top', 'ad.bottom', 'ad.bar'], focus: 'ad.ad3' },
        { say: 'Thousandths: zero plus five is five. Hundredths: five plus seven is twelve. Write the two, and carry one.', show: ['ad.sd3', 'ad.sd2', 'ad.k1'], focus: 'ad.k1' },
        { say: 'Tenths: one plus seven plus eight is sixteen. Write the six, and carry one. Ones: one plus four plus three is eight.', show: ['ad.sd1', 'ad.k0', 'ad.sp0', 'ad.ps'], focus: 'ad.k0' },
        { say: 'So Kateri hiked 8.625 kilometres over the two days.', show: 'm.2', focus: ['m.2', 'ad.sum'] },
      ],
    },
    {
      chapter: 'Step 2: subtract',
      layout: 'split',
      leftWidth: 560,
      left: [sub],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12.5 - 8.625', '= 12.500 - 8.625', '= 3.875 \\text{ km}'] }],
      lines: [
        { say: 'Step two: subtract from the whole trail. Write 12.5 as 12.500, and line up the points.', show: ['m.0', 'm.1', 'sb.top', 'sb.bottom', 'sb.bar'], focus: ['sb.ad2', 'sb.ad3'] },
        { say: 'Thousandths: zero is less than five, and the hundredths are zero. So regroup from the tenths. The five tenths become four, and the hundredths get ten.', show: ['sb.xd1', 'sb.a1', 'sb.xd2', 'sb.t2'], focus: ['sb.a1', 'sb.t2'] },
        { say: 'Then one hundredth becomes ten thousandths. The hundredths become nine, and the thousandths become ten. Ten minus five is five. And in the hundredths, nine minus two is seven.', show: ['sb.n2', 'sb.xd3', 'sb.n3', 'sb.sd3', 'sb.sd2'], hide: 'sb.t2', focus: ['sb.n2', 'sb.n3'] },
        { say: 'Tenths: four is less than six. Regroup one one as ten tenths. The two ones become one, and the tenths become fourteen. Fourteen minus six is eight.', show: ['sb.xp0', 'sb.a0', 'sb.b1', 'sb.sd1'], hide: 'sb.a1', focus: ['sb.a0', 'sb.b1'] },
        { say: 'Ones: one is less than eight. Regroup one ten as ten ones. The tens become zero, and the ones become eleven. Eleven minus eight is three.', show: ['sb.xp1', 'sb.n10', 'sb.b0', 'sb.sp0', 'sb.ps'], hide: 'sb.a0', focus: ['sb.n10', 'sb.b0'] },
        { say: 'There is 3.875 kilometres of the trail left.', show: 'm.2', focus: ['m.2', 'sb.sum'] },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['8.625 + 3.875 = 12.5 \\;\\;\\checkmark', '\\text{Estimate: } 13 - 9 = 4'] }],
      lines: [
        { say: 'Check by adding. The part hiked plus the part left should be the whole trail. 8.625 plus 3.875 is 12.5. It matches!', show: 'm.0', focus: 'm.0' },
        { say: 'You can also check with an estimate. Round to whole kilometres: about 13 minus 9, which is 4. And 3.875 is close to 4, so the answer is reasonable.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the second step', md: 'After you add the two days, you are not done. The question asks how much is **left**, so you still need to subtract.' }],
      lines: [
        { say: 'A common mistake is to stop too soon. After you add the two days, you are not done yet.', show: 'oops' },
        { say: 'The question asks how much is left, so you still need to subtract. Before you finish, read the question again, and check that your answer is what it asks for.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ribbon is $5$ m long. Ava cuts off $1.25$ m and then $2.4$ m. How much ribbon is left?',
          choices: ['$3.65$ m', '$1.35$ m', '$3.51$ m', '$2.35$ m'],
          answer: 1,
          working: 'Step 1: $1.25 + 2.40 = 3.65$ m cut off. Step 2: $5.00 - 3.65 = 1.35$ m left. Check: $3.65 + 1.35 = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ribbon is five metres long. Ava cuts off 1.25 metres, and then 2.4 metres. How much ribbon is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. First add: 1.25 plus 2.40 is 3.65 metres cut off. Then subtract: 5.00 minus 3.65 is 1.35 metres left. Choice A stops after the first step. It is how much was cut off, not how much is left.', show: 'q.answer' },
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
          items: ['Some problems need two steps: here, add, then subtract.', 'Line up the decimal points, and write zeros at the right end.', 'Read the question again: does your answer give what it asks for? Check by adding or estimating.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Some problems need two steps. Here, we added the two days, then subtracted from the whole trail.', show: 'sum.0' },
        { say: 'Line up the decimal points, and write zeros at the right end when you need them.', show: 'sum.1' },
        { say: 'And read the question again, to be sure your answer gives what it asks for. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
