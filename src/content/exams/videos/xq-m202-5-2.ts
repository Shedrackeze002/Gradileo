import type { Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 5.2 (the normal distribution). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 8.7, The Normal Distribution,
// CC BY-NC-SA 4.0). With mean 500 and standard deviation 100, the strips of the 68–95–99.7 rule
// give 300 to 500 = 13.5% + 34% = 47.5%, 600 to 800 = 13.5% + 2.35% = 15.85%, and
// 400 to 700 = 34% + 34% + 13.5% = 81.5%, as in the book's answers.

const LABELS = ['200', '300', '400', '500', '600', '700', '800'];

/** The strips one standard deviation wide, each labelled with its percent. */
const STRIPS = [
  { id: 'l2', from: -3, to: -2, tone: 'good' as const, label: '2.35\\%', labelAt: [-2.85, 1.25] as [number, number] },
  { id: 'l1', from: -2, to: -1, tone: 'opp' as const, label: '13.5\\%' },
  { id: 'l0', from: -1, to: 0, tone: 'adj' as const, label: '34\\%' },
  { id: 'r0', from: 0, to: 1, tone: 'adj' as const, label: '34\\%' },
  { id: 'r1', from: 1, to: 2, tone: 'opp' as const, label: '13.5\\%' },
  { id: 'r2', from: 2, to: 3, tone: 'good' as const, label: '2.35\\%', labelAt: [2.85, 1.25] as [number, number] },
];

const curve = (height = 330) => figure('nc', [normalCurve({ labels: LABELS, width: 2.4, height: 5.5, regions: STRIPS })], height);
const BASE = ['nc.axis', 'nc.curve'];

const QUESTION =
  'Suppose we have data that are normally distributed with mean 500 and standard deviation 100. What proportions of the data fall in these ranges? (a) 300 to 500 (b) 600 to 800 (c) 400 to 700';

const video: Explainer = {
  id: 'xq-m202-5-2',
  lessonId: '',
  exam: {
    lesson: 'm202-5-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 8.7, The Normal Distribution',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/8-7-the-normal-distribution',
    question: QUESTION,
  },
  title: 'Exam Question: Percents Under a Normal Curve With Mean 500 (The 68–95–99.7 Rule)',
  thumbnailTitle: 'The 68–95–99.7 Rule',
  thumbnail: 'nc',
  summary:
    'A real test question, solved one small step at a time: data are normally distributed with mean 500 and standard deviation 100. What proportions fall from 300 to 500, from 600 to 800, and from 400 to 700? We mark the curve in standard deviations, split it into strips with the 68–95–99.7 rule, and add the strips: 47.5%, 15.85% and 81.5%. Then we check with symmetry and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Percents Under a Normal Curve', subtitle: 'The normal distribution, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the normal distribution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Suppose we have data that are normally distributed with mean $500$ and standard deviation $100$. What proportions of the data fall in these ranges? (a) $300$ to $500$ (b) $600$ to $800$ (c) $400$ to $700$',
          answer: '(a) $47.5\\%$ (b) $15.85\\%$ (c) $81.5\\%$',
          working: '(a) $13.5 + 34$; (b) $13.5 + 2.35$; (c) $34 + 34 + 13.5$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Suppose we have data that are normally distributed with mean 500 and standard deviation 100. What proportions of the data fall in these ranges? Part "A": 300 to 500. Part B: 600 to 800. Part C: 400 to 700.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [curve(300), { kind: 'text', id: 't', size: 'md', md: 'Each tick is one standard deviation, $100$, from the mean. Find the **percent of the data** between each pair of values.' }],
      lines: [
        { say: 'Here is the normal curve, with the mean, 500, in the middle. Each tick is one standard deviation, 100, further out: 600, 700 and 800 above, and 400, 300 and 200 below.', show: BASE },
        { say: 'For each range, we need the percent of the data that falls between the two values. That is the area under the curve between them.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'The 68–95–99.7 rule', md: 'About $68\\%$ of the data is within $1$ standard deviation of the mean, $95\\%$ within $2$, and $99.7\\%$ within $3$.' },
        { kind: 'callout', id: 'half', tone: 'tip', title: 'Strips', md: 'The curve is symmetric, so each side gets half: $34\\%$ from the mean to $1\\sigma$, $13.5\\%$ from $1\\sigma$ to $2\\sigma$, $2.35\\%$ from $2\\sigma$ to $3\\sigma$.' },
      ],
      lines: [
        { say: 'Here is what we need. The 68, 95, 99.7 rule. About 68 percent of normal data is within one standard deviation of the mean, 95 percent within two, and 99.7 percent within three.', show: 'rule' },
        { say: 'The curve is symmetric, so each side gets half. From the mean to one standard deviation is half of 68, which is 34 percent. From one to two is half of 95 minus 68, which is 13.5 percent. And from two to three is half of 99.7 minus 95, which is 2.35 percent.', show: 'half' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Mark the values in **standard deviations**', 'Split the curve into **strips**', '**Add** the strips in each range'] }],
      lines: [
        { say: 'Here is the plan. First, mark each value as a number of standard deviations from the mean.', show: 'plan.0' },
        { say: 'Second, split the curve into strips, one standard deviation wide.', show: 'plan.1' },
        { say: 'Third, add the strips that each range covers.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a), 300 to 500',
      layout: 'center',
      main: [curve(), { kind: 'math', id: 'm', size: 'md', lines: ['300 = 500 - 2(100)', '13.5\\% + 34\\% = \\good{47.5\\%}'] }],
      lines: [
        { say: 'Step one, part "A". 300 is two standard deviations below the mean, and 500 is the mean itself.', show: [...BASE, 'm.0'] },
        { say: 'From 300 to 400 is a 13.5 percent strip, and from 400 to 500 is a 34 percent strip.', show: ['nc.l1', 'nc.l0'], focus: ['nc.l1', 'nc.l0'] },
        { say: '13.5 plus 34 is 47.5. So 47.5 percent of the data falls between 300 and 500.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Part (b), 600 to 800',
      layout: 'center',
      main: [curve(), { kind: 'math', id: 'm', size: 'md', lines: ['600 = 500 + 1(100), \\quad 800 = 500 + 3(100)', '13.5\\% + 2.35\\% = \\good{15.85\\%}'] }],
      lines: [
        { say: 'Step two, part B. 600 is one standard deviation above the mean, and 800 is three above.', show: [...BASE, 'm.0'] },
        { say: 'From 600 to 700 is a 13.5 percent strip, and from 700 to 800 is a 2.35 percent strip.', show: ['nc.r1', 'nc.r2'], focus: ['nc.r1', 'nc.r2'] },
        { say: '13.5 plus 2.35 is 15.85. So 15.85 percent of the data falls between 600 and 800.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Part (c), 400 to 700',
      layout: 'center',
      main: [curve(), { kind: 'math', id: 'm', size: 'md', lines: ['400 = 500 - 1(100), \\quad 700 = 500 + 2(100)', '34\\% + 34\\% + 13.5\\% = \\good{81.5\\%}'] }],
      lines: [
        { say: 'Step three, part C. 400 is one standard deviation below the mean, and 700 is two above. This range crosses the mean, so it covers strips on both sides.', show: [...BASE, 'm.0'] },
        { say: 'From 400 to 500 is 34 percent, from 500 to 600 is another 34 percent, and from 600 to 700 is 13.5 percent.', show: ['nc.l0', 'nc.r0', 'nc.r1'], focus: ['nc.l0', 'nc.r0', 'nc.r1'] },
        { say: '34 plus 34 plus 13.5 is 81.5. So 81.5 percent of the data falls between 400 and 700.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a)} \\ \\ 95\\% \\div 2 = 47.5\\% \\ \\checkmark', '\\text{(c)} \\ \\ \\tfrac{68\\%}{2} + \\tfrac{95\\%}{2} = 34\\% + 47.5\\% = 81.5\\% \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with symmetry. 300 to 700 is within two standard deviations, which is 95 percent. 300 to 500 is the left half of that: 95 divided by 2 is 47.5 percent. It matches.', show: 'm.0' },
        { say: 'For part C, 400 to 500 is half of 68 percent, which is 34, and 500 to 700 is half of 95 percent, which is 47.5. Together that is 81.5 percent. It matches too.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['(a) $95\\%$', '$300$ to $500$ is only **one side** of the mean: half of $95\\%$'],
            ['(b) $34\\% + 13.5\\%$', 'start at $600$, **one** standard deviation above the mean'],
            ['(c) $68\\% + 95\\%$', 'add **halves**: one side to $1\\sigma$, the other side to $2\\sigma$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'In part "A", 95 percent is for 300 to 700. 300 to 500 is only one side of the mean, so take half.' },
        { say: 'In part B, the range starts at 600, not at the mean. So the 34 percent strip from 500 to 600 is not included.' },
        { say: 'And in part C, do not add the whole 68 and the whole 95. Each side of the mean gets only half of its percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Data are normally distributed with mean $60$ and standard deviation $5$. About what percent of the data is above $70$?',
          choices: ['$13.5\\%$', '$5\\%$', '$2.5\\%$', '$47.5\\%$'],
          answer: 2,
          working: '$70$ is $2$ standard deviations above the mean, so the area above it is $2.35\\% + 0.15\\% = 2.5\\%$, or $(100\\% - 95\\%) \\div 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Data are normally distributed with mean 60 and standard deviation 5. About what percent of the data is above 70? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '70 is two standard deviations above the mean. 95 percent of the data is within two standard deviations, so 5 percent is outside, split equally between the two tails. Half of 5 is 2.5 percent: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$68\\%$, $95\\%$, $99.7\\%$ within $1$, $2$, $3$ standard deviations', 'Strips: $34\\%$, $13.5\\%$, $2.35\\%$ on each side', 'Write each value in **standard deviations**', '**Add** the strips the range covers'] }],
      lines: [
        { say: 'Here is what to remember. About 68, 95 and 99.7 percent of normal data lies within 1, 2 and 3 standard deviations of the mean.', show: 'sum.0' },
        { say: 'On each side, the strips are 34, 13.5 and 2.35 percent.', show: 'sum.1' },
        { say: 'Write each value as a number of standard deviations from the mean.', show: 'sum.2' },
        { say: 'Then add the strips the range covers. For more on the normal distribution, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
