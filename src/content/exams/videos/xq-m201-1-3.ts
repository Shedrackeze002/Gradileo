import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-1 lesson 1.3 (geometric sequences): website hits that grow by 2.6% a
// week. The question is an exercise from OpenStax College Algebra 2e, word for word (section 9.3,
// Geometric Sequences, CC BY-NC-SA 4.0), whose answer key gives P(n) = 293 · 1.026^n and about
// 333 hits. Growing by 2.6% means multiplying by 1.026, the common ratio; 293 · 1.026^5 ≈ 333.12.

const QUESTION =
  'A business starts a new website. Initially the number of hits is 293 due to the curiosity factor. The business estimates the number of hits will increase by 2.6% per week. (a) Write a formula for the number of hits. (b) Estimate the number of hits in 5 weeks.';

const video: Explainer = {
  id: 'xq-m201-1-3',
  lessonId: '',
  exam: {
    lesson: 'm201-1-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 9.3, Geometric Sequences',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/9-3-geometric-sequences',
    question: QUESTION,
  },
  title: 'Exam Question: Website Hits Growing by 2.6% a Week (Geometric Sequences)',
  thumbnailTitle: 'Website Hits Growing 2.6% a Week',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a new website starts with 293 hits, and hits grow by 2.6% each week. We turn the percent into a common ratio of 1.026, write the formula P = 293 · 1.026^n, and estimate about 333 hits in 5 weeks. Then we check week by week and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Growing Website Hits', subtitle: 'Geometric sequences, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about geometric sequences. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A business starts a new website. Initially the number of hits is $293$ due to the curiosity factor. The business estimates the number of hits will increase by $2.6\\%$ per week. (a) Write a formula for the number of hits. (b) Estimate the number of hits in $5$ weeks.',
          answer: '(a) $P = 293 \\cdot 1.026^n$ (b) about $333$ hits',
          working: '$293 \\cdot 1.026^5 \\approx 333.1$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A business starts a new website. Initially the number of hits is 293, due to the curiosity factor. The business estimates the number of hits will increase by 2.6 percent per week.' },
        { say: 'Part a: write a formula for the number of hits. Part b: estimate the number of hits in 5 weeks.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The hits grow by a **percent** each week, so each week’s number is the last week’s number **times the same amount**. We want a formula, then the hits after $5$ weeks.' }],
      lines: [{ say: 'The hits grow by a percent each week, not by a fixed number. So each week’s hits are the last week’s hits times the same amount. We want a formula, and then the number of hits after 5 weeks.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Geometric sequence', md: 'Each term is the one before **times the same number**, the common ratio $r$.' },
        { kind: 'callout', id: 'pct', tone: 'key', title: 'Percent growth', md: 'Growing by $2.6\\%$ means keeping $100\\%$ and adding $2.6\\%$: multiply by $1 + 0.026 = 1.026$.' },
      ],
      lines: [
        { say: 'Here is what we need. In a geometric sequence, each term is the one before it times the same number, called the common ratio, r.', show: 'def' },
        { say: 'And growing by 2.6 percent means you keep all 100 percent of what you had and add 2.6 percent more. That is the same as multiplying by 1 plus 0.026, which is 1.026.', show: 'pct' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Turn $2.6\\%$ into the **common ratio**', 'Write the **formula** for $n$ weeks', 'Put in $n = 5$ and round'] }],
      lines: [
        { say: 'Here is the plan. First, turn 2.6 percent into the common ratio.', show: 'plan.0' },
        { say: 'Second, write the formula for n weeks.', show: 'plan.1' },
        { say: 'Third, put in n equals 5, and round to a whole number of hits.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The common ratio',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2.6\\% = 0.026', 'r = 1 + 0.026 = \\good{1.026}'] }],
      lines: [
        { say: 'Step one. 2.6 percent is 0.026 as a decimal.', show: 'm.0' },
        { say: 'Add 1 to keep the hits already there: the common ratio is 1.026.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{after } n \\text{ weeks: } 293 \\times \\underbrace{1.026 \\times 1.026 \\times \\cdots}_{n \\text{ times}}', 'P = \\good{293 \\cdot 1.026^n}'] }],
      lines: [
        { say: 'Step two. Start with 293 hits. Each week multiplies by 1.026, so after n weeks we have multiplied by 1.026, n times.', show: 'm.0' },
        { say: 'So the number of hits after n weeks is P equals 293 times 1.026 to the power n. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Five weeks',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P = 293 \\cdot 1.026^5', '\\approx 293 \\times 1.1369 \\approx 333.1', '\\approx \\good{333 \\text{ hits}}'] }],
      lines: [
        { say: 'Step three. Put in n equals 5: 293 times 1.026 to the power 5.', show: 'm.0' },
        { say: 'Do the power first. 1.026 to the power 5 is about 1.1369, and 293 times that is about 333.1.', show: 'm.1' },
        { say: 'Hits are whole numbers, so in 5 weeks we estimate about 333 hits. That is part b.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'wk',
          head: ['Week', '0', '1', '2', '3', '4', '5'],
          rows: [['Hits', '293', '300.62', '308.43', '316.45', '324.68', '333.12']],
        },
        { kind: 'text', id: 't', size: 'md', md: 'Each number is the one before $\\times 1.026$. The gaps grow a little each week: $7.62$, $7.81$, $8.02$, and so on.' },
      ],
      lines: [
        { say: 'Let us check week by week, multiplying by 1.026 each time: 293, then about 300.62, 308.43, 316.45, 324.68, and in week 5, about 333.12. The same answer.', show: 'wk' },
        { say: 'Notice the gaps grow a little each week. That is the mark of percent growth: the bigger the number, the bigger 2.6 percent of it is.', show: 't' },
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
            ['$r = 0.026$ or $r = 2.6$', 'growing by $2.6\\%$ means multiplying by $1.026$'],
            ['$293 \\cdot 1.026 \\times 5$', 'the $5$ is a **power**: multiply by $1.026$ five times'],
            ['$(293 \\cdot 1.026)^5$', 'raise only $1.026$ to the power, then multiply by $293$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The ratio is not 0.026, and not 2.6. Growing by 2.6 percent means multiplying by 1.026.' },
        { say: 'The number of weeks is a power, not something to multiply by. 293 times 1.026 times 5 would be about 1,503 hits, far too many.' },
        { say: 'And only the 1.026 is raised to the power. Work out the power first, then multiply by 293.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A geometric sequence has $t_1 = 5$ and $r = 3$. What is $t_6$?',
          choices: ['$90$', '$3645$', '$1215$', '$729$'],
          answer: 2,
          working: '$t_6 = 5 \\cdot 3^{6-1} = 5 \\cdot 243 = 1215$.',
        },
      ],
      lines: [
        { say: 'Your turn. A geometric sequence has a first term of 5 and a common ratio of 3. What is the 6th term? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'From the first term to the 6th there are 5 steps, so t 6 is 5 times 3 to the power 5. 3 to the power 5 is 243, and 5 times 243 is 1,215, choice C. B uses 6 steps instead of 5, and A multiplies by 3 times 6 instead of raising to a power.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Same **multiplier** each time: **geometric**', 'Growth of $p\\%$: $r = 1 + \\dfrac{p}{100}$', '$t_n = t_1 r^{n-1}$, or start $\\times\\, r^n$ after $n$ steps', 'Do the **power** first'] }],
      lines: [
        { say: 'Here is what to remember. When each term is the one before times the same number, the sequence is geometric.', show: 'sum.0' },
        { say: 'Growth of p percent gives a common ratio of 1 plus p over 100.', show: 'sum.1' },
        { say: 'The general term is t 1 times r to the power n minus 1. Or, counting steps from the start, the start times r to the power of the number of steps.', show: 'sum.2' },
        { say: 'And always do the power first. For more on geometric sequences, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
