import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 5.2 (derivatives of exponential and logarithmic functions).
// The question is an exercise from OpenStax Calculus Volume 1 (section 3.9, Derivatives of
// Exponential and Logarithmic Functions, CC BY-NC-SA 4.0), word for word without the "[T]" mark,
// with its parts lettered (a) to (c). P = 500,000(1.05)^t, P′(t) = 500,000 ln(1.05)(1.05)^t ≈
// 24,395(1.05)^t, and P′(10) ≈ 39,737 people per year, as in the book's answers. Check: the rate is
// ln(1.05) ≈ 4.88% of the population, a little under the 5% one-year increase (40,722 at t = 10).
// The narration says the year in words, since the checker refuses 4-digit numbers.

const QUESTION =
  'The population of Toledo, Ohio, in 2000 was approximately 500,000. Assume the population is increasing at a rate of 5% per year. (a) Write the exponential function that relates the total population as a function of t. (b) Use a. to determine the rate at which the population is increasing in t years. (c) Use b. to determine the rate at which the population is increasing in 10 years.';

const video: Explainer = {
  id: 'xq-m31-5-2',
  lessonId: '',
  exam: {
    lesson: 'm31-5-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.9, Derivatives of Exponential and Logarithmic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-9-derivatives-of-exponential-and-logarithmic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: How Fast Is a City Growing? (Derivatives of Exponential Functions)',
  thumbnailTitle: 'Where Does ln Come From?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a city of about 500,000 people grows at 5% per year. (a) Write the population as an exponential function of t. (b) Find the rate at which it is growing after t years. (c) Find that rate after 10 years. The model is P = 500,000(1.05)^t. The derivative of b^t is b^t ln b, so P′(t) = 500,000 ln(1.05)(1.05)^t ≈ 24,395(1.05)^t, and P′(10) ≈ 39,737 people per year. Then we check that the answer makes sense and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Where Does ln Come From?', subtitle: 'Derivatives of exponential functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about derivatives of exponential functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'The population of Toledo, Ohio, in 2000 was approximately 500,000. Assume the population is increasing at a rate of 5% per year. (a) Write the exponential function that relates the total population as a function of $t$. (b) Use a. to determine the rate at which the population is increasing in $t$ years. (c) Use b. to determine the rate at which the population is increasing in 10 years.',
          answer: '(a) $P = 500{,}000(1.05)^t$ (b) $P\'(t) \\approx 24{,}395(1.05)^t$ people per year (c) about $39{,}737$ people per year',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'The population of Toledo, Ohio, in the year two thousand was approximately 500,000. Assume the population is increasing at a rate of 5 percent per year.' },
        { say: 'Part "a": write the exponential function for the population as a function of t. Part b: use it to find the rate at which the population is increasing in t years. Part c: find that rate in 10 years.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Part', 'What it wants'],
          rows: [
            ['(a)', 'the population $P(t)$'],
            ['(b)', 'how fast it grows: $P\'(t)$'],
            ['(c)', '$P\'(10)$, in people per year'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what it is asking. Part "a" wants the population itself. Part b wants how fast it is growing: the derivative. And part c wants that rate at 10 years.', show: 'tab' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{d}{dt}\\left(b^t\\right) = b^t \\ln b', '\\dfrac{d}{dt}\\left(e^t\\right) = e^t \\quad (\\ln e = 1)'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Growth by a percent', md: 'Growing by $5\\%$ a year means multiplying by $1.05$ each year: $P = P_0(1.05)^t$.' },
      ],
      lines: [
        { say: 'Here is what we need. The derivative of b to the t is b to the t, times the natural log of b.', show: 'f.0' },
        { say: 'For e to the t, the natural log of e is 1, so it is its own derivative.', show: 'f.1' },
        { say: 'And growing by 5 percent a year means multiplying by 1.05 each year.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Start value times $(1.05)^t$', '(b) Differentiate: $b^t \\to b^t \\ln b$', '(c) Substitute $t = 10$'] }],
      lines: [
        { say: 'Here is the plan. For part "a", the start value times 1.05 to the t.', show: 'plan.0' },
        { say: 'For part b, differentiate, using the rule for b to the t.', show: 'plan.1' },
        { say: 'For part c, substitute t equals 10.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The model',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P_0 = 500{,}000, \\quad b = 1 + 0.05 = 1.05', '\\good{P(t) = 500{,}000(1.05)^t}'] }],
      lines: [
        { say: 'Step one, part "a". The start is 500,000 people, with t counting years from the year two thousand. Each year, multiply by 1 plus 0.05, which is 1.05.', show: 'm.0' },
        { say: 'So P of t is 500,000 times 1.05 to the t.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The rate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P\'(t) = 500{,}000 \\cdot (1.05)^t \\ln(1.05)', '500{,}000 \\ln(1.05) \\approx 500{,}000(0.04879) \\approx 24{,}395', '\\good{P\'(t) \\approx 24{,}395(1.05)^t} \\text{ people per year}'] }],
      lines: [
        { say: 'Step two, part b. The 500,000 stays in front. The derivative of 1.05 to the t is 1.05 to the t, times the natural log of 1.05.', show: 'm.0' },
        { say: 'The natural log of 1.05 is about 0.04879. Times 500,000 is about 24,395.', show: 'm.1' },
        { say: 'So P prime of t is about 24,395 times 1.05 to the t, people per year.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: In 10 years',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(1.05)^{10} \\approx 1.62889', 'P\'(10) \\approx 24{,}395.08 \\times 1.62889 \\approx \\good{39{,}737} \\text{ people per year}'] }],
      lines: [
        { say: 'Step three, part c. 1.05 to the 10 is about 1.62889.', show: 'm.0' },
        { say: 'Multiply by 24,395.08: about 39,737 people per year. Keep the unrounded 24,395.08 here, so the answer is not thrown off.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(10) \\approx 814{,}447', '5\\% \\text{ of } P(10) \\approx 40{,}722', '39{,}737 = P(10)\\ln(1.05) \\text{ is a little less} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check that this makes sense. After 10 years, the population is about 814,447.', show: 'm.0' },
        { say: '5 percent of that is about 40,722. That is how many people the city gains over the whole next year.', show: 'm.1' },
        { say: 'The rate right now, at 10 years, is a little less, because the growth keeps speeding up through the year. The natural log of 1.05 is 4.88 percent, just under 5. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$P\'(t) = 500{,}000 \\cdot t(1.05)^{t - 1}$', 'the power rule is for $x^n$, **not** $b^t$'],
            ['$P = 500{,}000(0.05)^t$', 'growing by $5\\%$ means times **1.05**'],
            ['$P\'(10) = P(10)$', 'part c wants the **rate**, not the population'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The power rule is for x to a fixed power. When the variable is in the exponent, use b to the t times the natural log of b.' },
        { say: 'Growing by 5 percent means multiplying by 1.05, not 0.05. Multiplying by 0.05 would shrink the city.' },
        { say: 'And part c wants the rate, the derivative, not the population.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A culture of 2,000 bacteria grows by $10\\%$ per hour, so $P = 2{,}000(1.1)^t$. How fast is it growing at $t = 0$?',
          choices: ['$200$ per hour', 'about $190.6$ per hour', '$2{,}200$ per hour', '$220$ per hour'],
          answer: 1,
          working: '$P\'(0) = 2{,}000 \\ln(1.1)(1.1)^0 \\approx 2{,}000(0.09531) \\approx 190.6$',
        },
      ],
      lines: [
        { say: 'Your turn. A culture of 2,000 bacteria grows by 10 percent per hour, so P equals 2,000 times 1.1 to the t. How fast is it growing at time 0? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'P prime of t is 2,000 times the natural log of 1.1, times 1.1 to the t. At time 0, 1.1 to the 0 is 1, so the rate is 2,000 times 0.09531, about 190.6 per hour. Choice B. 200 is the gain over the whole first hour.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Growth by $r$: $P = P_0(1 + r)^t$', '$\\dfrac{d}{dt}b^t = b^t \\ln b$', 'Not the power rule: the variable is in the **exponent**', 'Keep extra decimals until the end'] }],
      lines: [
        { say: 'Here is what to remember. Growth by a rate r means P equals the start value times 1 plus r, to the t.', show: 'sum.0' },
        { say: 'The derivative of b to the t is b to the t, times the natural log of b.', show: 'sum.1' },
        { say: 'It is not the power rule, because the variable is in the exponent.', show: 'sum.2' },
        { say: 'And keep extra decimals until the end. For more on derivatives of exponential and logarithmic functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
