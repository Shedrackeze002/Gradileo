import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 5.4 (confidence intervals). Gradileo wrote this one, in the
// style of a Grade 11 statistics unit test, because the free textbooks ask students to compute
// confidence intervals, while Math 20-2 only reads and interprets them. 58% ± 3.1 percentage
// points, 19 times out of 20, is a 95% confidence level and a confidence interval of 54.9% to
// 61.1%. The whole interval is above 50%, so the town can say that a majority supports the park.

/** A number line from 48% to 64%, with the 50% line, the survey result and the interval. */
function interval(): Part {
  const X = (p: number) => (p - 56) * 0.8;
  const points: Record<string, [number, number]> = { L: [X(48), 0], R: [X(64), 0], h0: [X(50), 0], h1: [X(50), 1.6], a: [X(54.9), 0.8], b: [X(61.1), 0.8], p: [X(58), 0.8] };
  const items: DiagramItem[] = [{ kind: 'line', id: 'axis', from: 'L', to: 'R', tone: 'muted', group: 'line' }];
  for (const v of [48, 50, 52, 54, 56, 58, 60, 62, 64]) {
    points[`t${v}`] = [X(v), 0];
    items.push({ kind: 'label', id: `n${v}`, at: `t${v}`, tex: `${v}\\%`, tone: 'muted', place: 'below', dot: true, group: 'line' });
  }
  items.push(
    { kind: 'line', id: 'half', from: 'h0', to: 'h1', tone: 'opp', dashed: true, label: '50\\%', labelSide: 'left', labelAt: 0.95 },
    { kind: 'line', id: 'ci', from: 'a', to: 'b', tone: 'good', weight: 6 },
    { kind: 'label', id: 'lo', at: 'a', tex: '54.9\\%', tone: 'good', place: 'above', dot: true, group: 'ends' },
    { kind: 'label', id: 'hi', at: 'b', tex: '61.1\\%', tone: 'good', place: 'above', dot: true, group: 'ends' },
    { kind: 'label', id: 'mid', at: 'p', tex: '58\\%', tone: 'adj', place: 'below', dot: true },
  );
  return { points, items };
}

const QUESTION =
  'A survey of 1,000 residents of a town found that 58% support building a new park. The results are accurate to within 3.1 percentage points, 19 times out of 20. (a) State the confidence level and the margin of error. (b) State the confidence interval. (c) Can the town say that a majority of all its residents support the park? Explain.';

const video: Explainer = {
  id: 'xq-m202-5-4',
  lessonId: '',
  exam: {
    lesson: 'm202-5-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 statistics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Read a Poll, 58% Accurate to 3.1 Points, 19 Times Out of 20 (Confidence Intervals)',
  thumbnailTitle: '19 Times Out of 20',
  thumbnail: 'ci',
  summary:
    'An exam-style question, solved one small step at a time: a survey of 1,000 residents found that 58% support a new park, accurate to within 3.1 percentage points, 19 times out of 20. We read the confidence level (95%) and the margin of error (3.1 points), find the confidence interval, 54.9% to 61.1%, and see that the whole interval is above 50%, so the town can say a majority supports the park. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: '19 Times Out of 20', subtitle: 'Confidence intervals, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about confidence intervals. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 statistics unit test. It says so at the bottom of the screen the whole way through.' },
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
          prompt: 'A survey of $1{,}000$ residents of a town found that $58\\%$ support building a new park. The results are accurate to within $3.1$ percentage points, $19$ times out of $20$. (a) State the confidence level and the margin of error. (b) State the confidence interval. (c) Can the town say that a majority of all its residents support the park? Explain.',
          answer: '(a) $95\\%$; $\\pm 3.1$ percentage points (b) $54.9\\%$ to $61.1\\%$ (c) Yes: the whole interval is above $50\\%$.',
          working: '$19 \\div 20 = 95\\%$, and $58 \\pm 3.1$ gives $54.9$ to $61.1$.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A survey of 1,000 residents of a town found that 58 percent support building a new park. The results are accurate to within 3.1 percentage points, 19 times out of 20.' },
        { say: 'Part "A": state the confidence level and the margin of error. Part B: state the confidence interval. Part C: can the town say that a majority of all its residents support the park? Explain.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The survey asked only $1{,}000$ residents, not the whole town. The question asks what the survey tells us about **all** the residents, and how sure we can be.' }],
      lines: [
        { say: 'The survey asked only 1,000 residents, not everyone in the town. So 58 percent is an estimate.', show: 't' },
        { say: 'The question asks what the survey tells us about all the residents, and how sure we can be about it.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'moe', tone: 'definition', title: 'Margin of error', md: 'How far the true value for the whole population may reasonably be from the survey result.' },
        { kind: 'callout', id: 'ci', tone: 'key', title: 'Confidence interval', md: '$\\text{survey result} \\pm \\text{margin of error}$' },
        { kind: 'callout', id: 'cl', tone: 'tip', title: 'Confidence level', md: 'How often the method catches the true value. "$19$ times out of $20$" means $19 \\div 20 = 95\\%$.' },
      ],
      lines: [
        { say: 'Here is what we need. The margin of error says how far the true value, for the whole population, may reasonably be from the survey result.', show: 'moe' },
        { say: 'The confidence interval goes from the survey result minus the margin of error, to the survey result plus the margin of error.', show: 'ci' },
        { say: 'And the confidence level says how often this method catches the true value. 19 times out of 20 means 19 divided by 20, which is 95 percent.', show: 'cl' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read the **confidence level** and **margin of error**', 'Find the **interval**: result $\\pm$ margin', 'Compare the interval with $50\\%$'] }],
      lines: [
        { say: 'Here is the plan. First, read the confidence level and the margin of error from the report.', show: 'plan.0' },
        { say: 'Second, find the confidence interval: the result plus or minus the margin of error.', show: 'plan.1' },
        { say: 'Third, compare the whole interval with 50 percent.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{confidence level} = \\dfrac{19}{20} = \\good{95\\%}', '\\text{margin of error} = \\good{\\pm 3.1} \\text{ percentage points}'] }],
      lines: [
        { say: 'Step one, part "A". 19 times out of 20 is 19 divided by 20, which is 0.95. So the confidence level is 95 percent.', show: 'm.0' },
        { say: 'Accurate to within 3.1 percentage points means the margin of error is plus or minus 3.1 percentage points.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Part (b)',
      layout: 'center',
      main: [
        figure('ci', [interval()], 340),
        { kind: 'math', id: 'm', size: 'md', lines: ['58 - 3.1 = 54.9 \\qquad 58 + 3.1 = 61.1'] },
      ],
      lines: [
        { say: 'Step two, part B. Here is a number line in percent, with the survey result, 58 percent.', show: ['ci.line', 'ci.mid'] },
        { say: 'Subtract and add the margin of error: 58 minus 3.1 is 54.9, and 58 plus 3.1 is 61.1.', show: 'm.0' },
        { say: 'So the confidence interval is 54.9 percent to 61.1 percent.', show: ['ci.ci', 'ci.ends'], focus: 'ci.ci' },
      ],
    },
    {
      chapter: 'Step 3: Part (c)',
      layout: 'center',
      main: [
        figure('ci', [interval()], 340),
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '**Yes.** The whole interval, $54.9\\%$ to $61.1\\%$, is **above** $50\\%$, so we are $95\\%$ confident that a majority supports the park.' },
      ],
      lines: [
        { say: 'Step three, part C. A majority means more than 50 percent. Here is the 50 percent line.', show: ['ci.line', 'ci.mid', 'ci.ci', 'ci.ends', 'ci.half'], focus: 'ci.half' },
        { say: 'Even the lowest value in the interval, 54.9 percent, is above 50 percent. So yes: the town can say, with 95 percent confidence, that a majority of all its residents support the park. That is the answer.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{width} = 61.1 - 54.9 = 6.2 = 2 \\times 3.1 \\ \\checkmark', '\\text{middle} = \\dfrac{54.9 + 61.1}{2} = 58 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The width of the interval is 61.1 minus 54.9, which is 6.2. That is twice the margin of error, as it should be.', show: 'm.0' },
        { say: 'And the middle of the interval is 58 percent, the survey result. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['confidence level $= 19\\%$', '"$19$ times out of $20$" is $19 \\div 20 = 95\\%$'],
            ['$58\\% \\times 3.1\\%$', 'the margin is **added and subtracted**, in percentage points'],
            ['"Yes, because $58\\% > 50\\%$"', 'the **whole interval** must be above $50\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The confidence level is not 19 percent. 19 times out of 20 is 19 divided by 20, which is 95 percent.' },
        { say: 'The margin of error is added and subtracted, in percentage points. Do not multiply by it.' },
        { say: 'And it is not enough that 58 is above 50. If the interval had reached below 50 percent, the true value might not be a majority. Here the whole interval is above 50, and that is the reason.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A poll finds that $51\\%$ of voters support a plan, accurate to within $4$ percentage points, $19$ times out of $20$. What is the confidence interval?',
          choices: ['$47\\%$ to $55\\%$', '$51\\%$ to $55\\%$', '$49\\%$ to $53\\%$', '$47\\%$ to $51\\%$'],
          answer: 0,
          working: '$51 - 4 = 47$ and $51 + 4 = 55$. The interval reaches below $50\\%$, so a majority is not certain.',
        },
      ],
      lines: [
        { say: 'Your turn. A poll finds that 51 percent of voters support a plan, accurate to within 4 percentage points, 19 times out of 20. What is the confidence interval? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '51 minus 4 is 47, and 51 plus 4 is 55. So the interval is 47 percent to 55 percent: choice "A". Notice that it reaches below 50 percent, so this poll cannot say that a majority supports the plan.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Interval $=$ result $\\pm$ margin of error', '"$19$ times out of $20$" $= 95\\%$ confidence', 'The width is **twice** the margin of error', 'Compare the **whole interval**, not just the result'] }],
      lines: [
        { say: 'Here is what to remember. The confidence interval is the survey result, plus or minus the margin of error.', show: 'sum.0' },
        { say: '19 times out of 20 means a 95 percent confidence level.', show: 'sum.1' },
        { say: 'The width of the interval is twice the margin of error.', show: 'sum.2' },
        { say: 'And to draw a conclusion, compare the whole interval, not just the survey result. For more on confidence intervals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
