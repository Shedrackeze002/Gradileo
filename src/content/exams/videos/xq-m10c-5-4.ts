import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 5.4 (function notation): Sylvia's DVR, N(t) = 85 + 20t. The
// question is an exercise from OpenStax Intermediate Algebra 2e, word for word (section 3.5,
// Relations and Functions, CC BY-NC-SA 4.0), whose answer key gives t independent, N dependent,
// and N(4) = 165: the number of unwatched shows in Sylvia's DVR at the fourth week.

/** N(t) week by week, from 85 shows, as a column graph. Columns are drawn at a fifteenth of their size. */
const columns = (height = 320): DiagramEl => {
  const points: Record<string, [number, number]> = { O: [-1, 0], X: [29, 0] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'base', from: 'O', to: 'X', tone: 'ink', group: 'axis' },
    { kind: 'label', id: 'weeks', at: 'X', tex: '\\text{weeks}', place: 'right', group: 'axis' },
  ];
  for (let t = 0; t <= 4; t++) {
    const n = 85 + 20 * t;
    const x = 6 * t;
    points[`a${t}`] = [x, 0];
    points[`b${t}`] = [x + 3.6, 0];
    points[`c${t}`] = [x + 3.6, n / 15];
    points[`d${t}`] = [x, n / 15];
    points[`top${t}`] = [x + 1.8, n / 15];
    points[`foot${t}`] = [x + 1.8, 0];
    const group = `w${t}`;
    items.push(
      { kind: 'region', id: `bar${t}`, points: [`a${t}`, `b${t}`, `c${t}`, `d${t}`], tone: t === 4 ? 'good' : 'adj', shade: 0.5, group },
      { kind: 'label', id: `n${t}`, at: `top${t}`, tex: String(n), place: 'above', group },
      { kind: 'label', id: `t${t}`, at: `foot${t}`, tex: String(t), place: 'below', group },
    );
  }
  return { kind: 'diagram', id: 'c', height, points, items };
};

const QUESTION =
  'The number of unwatched shows in Sylvia’s DVR is 85. This number grows by 20 unwatched shows per week. The function N(t) = 85 + 20t represents the relation between the number of unwatched shows, N, and the time, t, measured in weeks. (a) Determine the independent and dependent variable. (b) Find N(4). Explain what this result means.';

const video: Explainer = {
  id: 'xq-m10c-5-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-5-4',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 3.5, Relations and Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/3-5-relations-and-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Sylvia’s DVR, N(t) = 85 + 20t. Function Notation',
  thumbnailTitle: 'Sylvia’s DVR: Find N(4)',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: Sylvia\'s DVR has 85 unwatched shows and gains 20 a week, so N(t) = 85 + 20t. We decide which variable is independent and which is dependent, find N(4) = 165 by putting 4 in for t, and explain what it means: 165 unwatched shows after 4 weeks. Then we check week by week and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sylvia’s DVR', subtitle: 'Function notation, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about function notation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'The number of unwatched shows in Sylvia’s DVR is $85$. This number grows by $20$ unwatched shows per week. The function $N(t) = 85 + 20t$ represents the relation between the number of unwatched shows, $N$, and the time, $t$, measured in weeks. (a) Determine the independent and dependent variable. (b) Find $N(4)$. Explain what this result means.',
          answer: '(a) $t$ independent, $N$ dependent. (b) $N(4) = 165$: after $4$ weeks there are $165$ unwatched shows.',
          working: '$N(4) = 85 + 20(4) = 85 + 80 = 165$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The number of unwatched shows in Sylvia’s D V R is 85. This number grows by 20 unwatched shows per week. The function N of t equals 85 plus 20 t represents the relation between the number of unwatched shows, N, and the time, t, measured in weeks.' },
        { say: 'Part a: determine the independent and dependent variable. Part b: find N of 4, and explain what this result means.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['N(t) = \\underbrace{85}_{\\text{at the start}} + \\underbrace{20}_{\\text{each week}}\\,t'] },
        { kind: 'text', id: 't', size: 'md', md: 'A **D V R** records TV shows to watch later. The shows pile up: $85$ now, and $20$ more every week.' },
      ],
      lines: [
        { say: 'A D V R records TV shows to watch later. Sylvia has 85 waiting, and 20 more pile up every week.', show: 't' },
        { say: 'The function says the same thing: 85 at the start, plus 20 for each week, t. The question asks which variable depends on which, and how many shows there are after 4 weeks.', show: 'm' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Function notation', md: '$N(t)$ is read "$N$ of $t$". It means the **output** $N$ when the **input** is $t$. To find $N(4)$, **replace** $t$ with $4$.' },
        { kind: 'text', id: 'v', size: 'md', md: 'The **independent** variable is the input. The **dependent** variable is the output: it **depends** on the input.' },
      ],
      lines: [
        { say: 'Here is what we need. N of t, written N with t in brackets, does not mean N times t. It means the output N when the input is t. To find N of 4, replace t with 4.', show: 'def' },
        { say: 'The independent variable is the input. The dependent variable is the output, because its value depends on the input.', show: 'v' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Ask: which depends on which?', 'Replace $t$ with $4$, and work it out', 'Say what the number **means**'] }],
      lines: [
        { say: 'Here is the plan. First, ask which variable depends on which.', show: 'plan.0' },
        { say: 'Second, replace t with 4 and work out N of 4.', show: 'plan.1' },
        { say: 'Third, explain what that number means for Sylvia.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The variables',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['N \\text{ depends on } t', '\\good{t: \\text{ independent}}, \\quad \\good{N: \\text{ dependent}}'] }],
      lines: [
        { say: 'Step one. The number of shows depends on how many weeks have passed. The weeks do not depend on the shows.', show: 'm.0' },
        { say: 'So t, the time in weeks, is the independent variable, and N, the number of unwatched shows, is the dependent variable. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Find N(4)',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['N(4) = 85 + 20(4)', '= 85 + 80', '= \\good{165}'] }],
      lines: [
        { say: 'Step two. Replace t with 4: N of 4 is 85 plus 20 times 4.', show: 'm.0' },
        { say: '20 times 4 is 80, so we have 85 plus 80.', show: 'm.1' },
        { say: 'That is 165. So N of 4 is 165.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: What it means',
      layout: 'center',
      main: [{ kind: 'callout', id: 'mean', tone: 'tip', title: 'N(4) = 165', md: 'After $4$ weeks, Sylvia’s DVR has $165$ unwatched shows.' }],
      lines: [{ say: 'Step three. The input 4 is the time, 4 weeks. The output 165 is the number of unwatched shows. So after 4 weeks, Sylvia’s D V R has 165 unwatched shows. That is part b.', show: 'mean', focus: 'mean' }],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [columns()],
      lines: [
        { say: 'Let us check week by week. At the start, t equals 0, there are 85 shows.', show: ['c', 'c.axis', 'c.w0'] },
        { say: 'Add 20 each week: 105 after one week, 125 after two, and 145 after three.', show: ['c.w1', 'c.w2', 'c.w3'] },
        { say: 'And 165 after four weeks. That matches N of 4.', show: 'c.w4', focus: 'c.w4' },
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
            ['$N(4) = N \\times 4$', '$N(4)$ means "$N$ **of** $4$": put $4$ in for $t$'],
            ['$N(4) = 85 + 20 + 4 = 109$', '$20t$ means $20 \\times t$'],
            ['$N$ is independent', 'the shows **depend** on the weeks'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'N of 4 is not N times 4. It means the value of N when t is 4.' },
        { say: '20 t means 20 times t, so do not just add the 4 on. That would give 109, which is wrong.' },
        { say: 'And N is the dependent variable, because the number of shows depends on the time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'For $f(x) = 3x^2 - 5x$, find $f(2)$.',
          choices: ['$26$', '$2$', '$22$', '$-4$'],
          answer: 1,
          working: '$f(2) = 3(2)^2 - 5(2) = 3(4) - 10 = 12 - 10 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals 3 x squared minus 5 x, find f of 2. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Replace x with 2. 2 squared is 4, and 3 times 4 is 12. 5 times 2 is 10. 12 minus 10 is 2, choice B. A squared 3 times 2 instead of just the 2, and C added the 10 instead of taking it away.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$N(t)$: the output when the input is $t$', 'To find $N(4)$, **replace** $t$ with $4$', 'Input: **independent**. Output: **dependent**', 'Say what the answer **means**, with units'] }],
      lines: [
        { say: 'Here is what to remember. N of t is the output when the input is t.', show: 'sum.0' },
        { say: 'To find N of 4, replace t with 4.', show: 'sum.1' },
        { say: 'The input is the independent variable, and the output is the dependent variable.', show: 'sum.2' },
        { say: 'And say what the answer means, with its units. For more on function notation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
