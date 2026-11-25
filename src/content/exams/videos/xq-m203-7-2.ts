import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 7.2 (the Rule of 72 and investments). The free OpenStax books
// do not teach the Rule of 72, so this one is written by Gradileo in the style of a Grade 11
// workplace mathematics unit test; the rule itself is stated in the question. 72 ÷ 6 = 12 years to
// double, and 24 years is 2 doublings: $4,000 → $8,000 → $16,000.
// Check: 4000 × 1.06²⁴ ≈ $16,195.74, close to the estimate.

const DOUBLING = {
  kind: 'table' as const,
  id: 'd',
  head: ['Years', 'Doublings', 'Value'],
  rows: [
    ['$0$', '$0$', '\\$4,000'],
    ['$12$', '$1$', '\\$8,000'],
    ['$24$', '$2$', '\\$16,000'],
  ],
};

const QUESTION =
  'The Rule of 72 says that an investment doubles in about 72 ÷ r years, where r is the yearly interest rate as a percent. Dana invests $4,000 in a fund that earns 6% interest, compounded annually. (a) Use the Rule of 72 to estimate how many years it takes Dana’s investment to double. (b) Estimate the value of the investment after 24 years.';

const video: Explainer = {
  id: 'xq-m203-7-2',
  lessonId: '',
  exam: {
    lesson: 'm203-7-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: How Fast Does Money Double? (The Rule of 72)',
  thumbnailTitle: 'When Does the Money Double?',
  thumbnail: 'd',
  summary:
    'An exam-style question, solved one small step at a time: Dana invests $4,000 at 6% compounded annually. Using the Rule of 72, how long does it take to double, and about what is it worth after 24 years? 72 ÷ 6 = 12 years to double. 24 years is 2 doublings, so $4,000 becomes $8,000 and then about $16,000. Then we check the estimate with the compound interest formula and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'When Does the Money Double?', subtitle: 'The Rule of 72, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question with the Rule of 72. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt:
            'The Rule of 72 says that an investment doubles in about $72 \\div r$ years, where $r$ is the yearly interest rate as a percent. Dana invests \\$4,000 in a fund that earns $6\\%$ interest, compounded annually. (a) Use the Rule of 72 to estimate how many years it takes Dana’s investment to double. (b) Estimate the value of the investment after $24$ years.',
          answer: '(a) about $12$ years (b) about \\$16,000',
          working: '$72 \\div 6 = 12$; $24$ years is $2$ doublings: 4,000 → 8,000 → 16,000',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The Rule of 72 says that an investment doubles in about 72 divided by r years, where r is the yearly interest rate as a percent.' },
        { say: 'Dana invests 4 thousand dollars in a fund that earns 6 percent interest, compounded annually.', caption: 'Dana invests $4,000 in a fund that earns 6% interest, compounded annually.' },
        { say: 'Part a: use the Rule of 72 to estimate how many years it takes to double. Part b: estimate the value after 24 years.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{years to double} \\approx \\dfrac{72}{r}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A quick estimate', md: 'Use the rate as a **percent**: $6$, not $0.06$. Each doubling **multiplies** the money by $2$; it does not add the same amount again.' },
      ],
      lines: [
        { say: 'Here is what we need. With compound interest, the years to double are about 72 divided by the rate.', show: 'f' },
        { say: 'Use the rate as a percent: 6, not 0.06. And each doubling multiplies the money by 2. It does not just add the first amount again.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Divide $72$ by the **rate**', '(b) Count the **doublings** in $24$ years', '**Double** that many times'] }],
      lines: [
        { say: 'Here is the plan. For part a, divide 72 by the rate.', show: 'plan.0' },
        { say: 'For part b, count how many doublings fit in 24 years.', show: 'plan.1' },
        { say: 'Then double the money that many times.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Part (a): Years to double',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{72}{6} = \\good{12 \\text{ years}}'] }],
      lines: [
        { say: 'Part a. 72 divided by 6 is 12. Dana\'s money doubles about every 12 years.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Part (b): After 24 years',
      layout: 'split',
      leftWidth: 600,
      left: [DOUBLING],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['24 \\div 12 = 2 \\text{ doublings}', '\\$4{,}000 \\times 2 \\times 2', '= \\good{\\$16{,}000}'] }],
      lines: [
        { say: 'Part b. 24 years divided by 12 years is 2 doublings.', show: ['d', 'm.0'], focus: 'm.0' },
        { say: 'After 12 years, 4 thousand dollars doubles to 8 thousand. After 24 years, 8 thousand doubles to 16 thousand.', caption: 'After 12 years, $4,000 doubles to $8,000. After 24 years, $8,000 doubles to $16,000.', show: 'm.1', focus: ['d.1', 'd.2'] },
        { say: 'So after 24 years, Dana\'s investment is worth about 16 thousand dollars.', caption: 'So after 24 years, Dana’s investment is worth about $16,000.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4000 \\times 1.06^{12} \\approx \\$8{,}048.79', '4000 \\times 1.06^{24} \\approx \\$16{,}195.74 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the compound interest formula. After 12 years, 4 thousand times 1.06 to the power 12 is about 8 thousand 48 dollars, so it really has about doubled.', caption: 'Let us check with the compound interest formula. After 12 years, 4,000 × 1.06¹² ≈ $8,048.79, so it really has about doubled.', show: 'm.0' },
        { say: 'After 24 years, it is about 16 thousand 196 dollars. The Rule of 72 estimate of 16 thousand is close. It checks out.', caption: 'After 24 years, it is about $16,195.74. The Rule of 72 estimate of $16,000 is close. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['(b) \\$8,000', 'doubled only **once**: $24$ years is **two** doublings'],
            ['(b) \\$12,000', '**added** \\$4,000 each time: doubling **multiplies**'],
            ['(a) $1200$ years', 'used $0.06$: the rule uses the **percent**, $6$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8 thousand dollars doubles only once. 24 years is two doubling times.', caption: '$8,000 doubles only once. 24 years is two doubling times.' },
        { say: '12 thousand adds 4 thousand dollars each time. But doubling multiplies the whole amount by 2, so the second doubling adds 8 thousand.', caption: '$12,000 adds $4,000 each time. But doubling multiplies the whole amount by 2, so the second doubling adds $8,000.' },
        { say: '1 thousand 200 years divides 72 by 0.06. The Rule of 72 uses the rate as a percent, 6.', caption: '1200 years divides 72 by 0.06. The Rule of 72 uses the rate as a percent, 6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Using the Rule of 72, about how much will \\$1,500 be worth after $27$ years at $8\\%$ interest, compounded annually?',
          choices: ['\\$6,000', '\\$12,000', '\\$4,500', '\\$3,000'],
          answer: 1,
          working: '$72 \\div 8 = 9$ years to double; $27 \\div 9 = 3$ doublings: 1,500 → 3,000 → 6,000 → 12,000.',
        },
      ],
      lines: [
        { say: 'Your turn. Using the Rule of 72, about how much will 1 thousand 500 dollars be worth after 27 years at 8 percent interest, compounded annually? Pause the video and try it.', caption: 'Your turn. Using the Rule of 72, about how much will $1,500 be worth after 27 years at 8% interest, compounded annually? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '72 divided by 8 is 9 years to double, and 27 years is 3 doublings: 1 thousand 500, 3 thousand, 6 thousand, 12 thousand dollars. Choice "B".', caption: '72 ÷ 8 = 9 years to double, and 27 years is 3 doublings: $1,500, $3,000, $6,000, $12,000. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Years to double $\\approx 72 \\div r$', 'Use the rate as a **percent**', 'Count the **doublings**', 'Each doubling **multiplies** by $2$'] }],
      lines: [
        { say: 'Here is what to remember. The years to double are about 72 divided by the rate.', show: 'sum.0' },
        { say: 'Use the rate as a percent.', show: 'sum.1' },
        { say: 'Count how many doublings fit in the time.', show: 'sum.2' },
        { say: 'And each doubling multiplies the money by 2. For more on the Rule of 72 and investments, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
