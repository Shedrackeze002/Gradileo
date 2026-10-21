import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns } from '@/content/math5/videos/lib/m5-2-figures.ts';
import { stack } from './lib/m7-2-figures.ts';

// 17.29 + 5.99 + 10.19 = 33.47.
const total = figure('st', [stack({ rows: ['17.29', '5.99', '10.19'], answer: '33.47', carries: { [-1]: '2', 0: '1', 1: '1' } })], 470);

// 50.00 − 33.47 = 16.53: 50.00 regrouped as 4 tens, 9 ones, 9 tenths and 10 hundredths.
const left = figure('lf', [
  columns({
    top: '50.00',
    bottom: '33.47',
    answer: '16.53',
    op: '-',
    cross: [1, 0, -1, -2],
    marks: [
      { id: 'n1', place: 1, tex: '4', tone: 'theta' },
      { id: 'n0', place: 0, tex: '9', tone: 'theta' },
      { id: 'nd1', place: -1, tex: '9', tone: 'theta' },
      { id: 'nd2', place: -2, tex: '10', tone: 'theta' },
    ],
  }),
], 400);

const video: Explainer = {
  id: 'm7-2-1-d',
  lessonId: 'm7-2-1',
  title: 'Adding and Subtracting Decimals, Part 4: Solving Problems',
  thumbnailTitle: 'Solving Problems with Decimals',
  thumbnail: 'st',
  summary:
    'A problem with more than one step: decide what to find first, and write each step. Rosa has $50 and buys a T-shirt for $17.29, socks for $5.99 and a book for $10.19. Estimate: 50 − (17 + 6 + 10) = 17. The total cost is 17.29 + 5.99 + 10.19 = 33.47, so Rosa has 50.00 − 33.47 = $16.53 left, close to the estimate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 4', title: 'Solving Problems', subtitle: 'More than one step' }],
      lines: [
        { say: 'Some problems take more than one step. You might need to add some amounts first, and then subtract.', show: 'title' },
        { say: 'In this part, you will plan a two-step money problem, write each step, and check the answer with an estimate.' },
      ],
    },
    {
      chapter: 'Make a plan',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Rosa has \\$50. She buys a T-shirt for \\$17.29, socks for \\$5.99 and a book for \\$10.19. How much money does she have left?' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Step 1:** add the three prices to find the **total cost**.', '**Step 2:** subtract the total cost from \\$50 to find the **money left**.'],
        },
      ],
      lines: [
        { say: 'Rosa has fifty dollars of birthday money. Rosa buys a T-shirt for seventeen dollars and twenty-nine cents, socks for five dollars and ninety-nine cents, and a book for ten dollars and nineteen cents. How much money is left?', show: 'q' },
        { say: 'Before you calculate, make a plan. Ask yourself: what do I need to find first?' },
        { say: 'Step one: add the three prices, to find the total cost.', show: 'b.0' },
        { say: 'Step two: subtract the total cost from fifty dollars, to find how much is left.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Estimate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['17.29 \\approx 17 \\qquad 5.99 \\approx 6 \\qquad 10.19 \\approx 10', '17 + 6 + 10 = 33', '50 - 33 = 17'] },
      ],
      lines: [
        { say: 'Estimate first. Round each price to the nearest dollar: seventeen, six and ten.', show: 'm.0', focus: 'm.0' },
        { say: 'Seventeen plus six plus ten is thirty-three. So the things cost about thirty-three dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Fifty minus thirty-three is seventeen. So Rosa should have about seventeen dollars left.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 1: the total cost',
      layout: 'split',
      leftWidth: 480,
      left: [total],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 9 + 9 + 9 = 27', '\\text{Tenths: } 2 + 9 + 1 + \\opp{2} = 14', '\\text{Ones: } 7 + 5 + 0 + \\opp{1} = 13', '\\text{Tens: } 1 + 1 + \\opp{1} = 3'] }],
      lines: [
        { say: 'Step one. Line up the decimal points of the three prices.', show: ['st.row0', 'st.row1', 'st.row2', 'st.bar'] },
        { say: 'Hundredths: nine plus nine plus nine is twenty-seven. Write seven, and carry two into the tenths.', show: ['st.cd2', 'st.sd2', 'st.kd1', 'm.0'], focus: ['m.0', 'st.kd1'] },
        { say: 'Tenths: two plus nine plus one, plus the two we carried, is fourteen. Write four, and carry one.', hide: 'st.cd2', show: ['st.cd1', 'st.sd1', 'st.kp0', 'm.1'], focus: ['m.1', 'st.kp0'] },
        { say: 'Ones: seven plus five plus zero, plus one, is thirteen. Write three, and carry one into the tens.', hide: 'st.cd1', show: ['st.cp0', 'st.sp0', 'st.kp1', 'm.2'], focus: ['m.2', 'st.kp1'] },
        { say: 'Tens: one plus one, plus the one we carried, is three. The total cost is thirty-three dollars and forty-seven cents, close to our estimate of thirty-three.', hide: 'st.cp0', show: ['st.sp1', 'st.ps', 'm.3'], focus: ['m.3', 'st.sum'] },
      ],
    },
    {
      chapter: 'Step 2: the money left',
      layout: 'split',
      leftWidth: 480,
      left: [left],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['50.00 - 33.47 = 16.53', '\\text{Estimate: } 17 \\ \\good{\\checkmark}'] }],
      lines: [
        { say: 'Step two. Subtract the total cost from fifty dollars. Write fifty as fifty point zero zero, and line up the points.', show: ['lf.top', 'lf.bottom', 'lf.bar'] },
        { say: 'The hundredths need regrouping, and so do the tenths and the ones. Trade one ten for ten ones, one of the ones for ten tenths, and one tenth for ten hundredths. So fifty is now forty, plus nine ones, plus nine tenths, plus ten hundredths.', show: ['lf.xp1', 'lf.xp0', 'lf.xd1', 'lf.xd2', 'lf.n1', 'lf.n0', 'lf.nd1', 'lf.nd2'] },
        { say: 'Ten minus seven is three. Nine minus four is five. Nine minus three is six. Four minus three is one.', show: ['lf.sum', 'm.0'], focus: ['lf.sum', 'm.0'] },
        { say: 'Rosa has sixteen dollars and fifty-three cents left. That is close to the estimate of seventeen dollars, so the answer is reasonable.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Use the estimate as a check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use the estimate as a check', md: 'If your answer is far from your estimate, look again. The most common slip is a decimal point in the wrong place.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['16.53 \\approx 17 \\ \\good{\\checkmark} \\qquad 1.653 \\ \\bad{\\times} \\qquad 165.3 \\ \\bad{\\times}'] },
      ],
      lines: [
        { say: 'The estimate is your safety net. If your answer is far from your estimate, look again.', show: 'tip' },
        { say: 'Suppose a decimal point slipped, and you got one point six five three, or one hundred sixty-five point three. Neither is close to seventeen, so you would know straight away that something went wrong.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lena has \\$20 and buys a book for \\$8.45 and a pen for \\$2.30. How much money is left?',
          choices: ['\\$10.75', '\\$11.55', '\\$9.75', '\\$9.25'],
          answer: 3,
          working: 'Total cost: $8.45 + 2.30 = 10.75$. Money left: $20.00 - 10.75 = 9.25$, so \\$9.25. The estimate $20 - (8 + 2) = 10$ is close.',
        },
      ],
      lines: [
        { say: 'Your turn. Lena has twenty dollars, and buys a book for eight dollars and forty-five cents and a pen for two dollars and thirty cents. How much money is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, nine dollars and twenty-five cents. First add the costs: ten dollars and seventy-five cents. Then subtract that from twenty dollars. Choice A is what Lena spent, not what is left.', show: 'q.answer' },
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
          items: ['Make a plan: decide what to find first.', 'Estimate, then write and work out each step.', 'Compare the answer with the estimate to check it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a problem with more than one step, make a plan. Decide what to find first.', show: 'sum.0' },
        { say: 'Estimate, then write each step and work it out carefully.', show: 'sum.1' },
        { say: 'Finally, compare your answer with the estimate. In the next lesson, you will multiply and divide decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
