import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 7.2 (slope-point form): Ilya's weekly income, $760 for 3
// policies and $920 for 5. The question is OpenStax College Algebra 2e's own worked example, word
// for word (section 4.1, Linear Functions, CC BY-NC-SA 4.0). The slope is $80 per policy, and
// slope-point form I − 760 = 80(n − 3) gives I(n) = 80n + 520: a base salary of $520 a week plus
// $80 commission for each policy.

/** Income (drawn at 1.5 per hundred dollars) against policies sold (drawn 2.5 times wider). */
const graph = (height = 420): DiagramEl => {
  const k = 2.5;
  const u = (dollars: number) => (dollars / 100) * 1.5;
  return {
    kind: 'diagram',
    id: 'g',
    height,
    points: { O: [0, 0], X: [7 * k, 0], Y: [0, u(1150)], B: [0, u(520)], P: [3 * k, u(760)], Q: [5 * k, u(920)], E: [6.2 * k, u(1016)], R: [5 * k, u(760)] },
    items: [
      { kind: 'line', id: 'xaxis', from: 'O', to: 'X', tone: 'ink', arrow: true, group: 'axes' },
      { kind: 'line', id: 'yaxis', from: 'O', to: 'Y', tone: 'ink', arrow: true, group: 'axes' },
      { kind: 'label', id: 'xl', at: 'X', tex: 'n', place: 'right', group: 'axes' },
      { kind: 'label', id: 'yl', at: 'Y', tex: 'I', place: 'above', group: 'axes' },
      { kind: 'label', id: 'p', at: 'P', tex: '(3, 760)', place: 'above left', dot: true, tone: 'adj', group: 'pts' },
      { kind: 'label', id: 'q', at: 'Q', tex: '(5, 920)', place: 'above left', dot: true, tone: 'adj', group: 'pts' },
      { kind: 'line', id: 'run', from: 'P', to: 'R', tone: 'adj', dashed: true, label: '2', labelSide: 'right', group: 'tri' },
      { kind: 'line', id: 'rise', from: 'R', to: 'Q', tone: 'opp', dashed: true, label: '160', labelSide: 'right', group: 'tri' },
      { kind: 'line', id: 'line', from: 'B', to: 'E', tone: 'brand', weight: 4 },
      { kind: 'label', id: 'b', at: 'B', tex: '(0, 520)', place: 'left', dot: true, tone: 'good' },
    ],
  };
};

const QUESTION =
  'Working as an insurance salesperson, Ilya earns a base salary plus a commission on each new policy. Therefore, Ilya’s weekly income I, depends on the number of new policies, n, he sells during the week. Last week he sold 3 new policies, and earned $760 for the week. The week before, he sold 5 new policies and earned $920. Find an equation for I(n), and interpret the meaning of the components of the equation.';

const video: Explainer = {
  id: 'xq-m10c-7-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-7-2',
    source: 'OpenStax, College Algebra 2e, Example in section 4.1, Linear Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/4-1-linear-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Ilya’s Weekly Pay. The Equation of a Line Through Two Points',
  thumbnailTitle: 'Ilya’s Weekly Pay',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: Ilya earned $760 in a week when he sold 3 policies and $920 when he sold 5. We find the slope, $80 per policy, write the line in slope-point form, and rearrange it to I(n) = 80n + 520: a base salary of $520 plus $80 for each policy. Then we check both weeks and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Ilya’s Weekly Pay', subtitle: 'Slope-point form, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about finding the equation of a line from two points. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Working as an insurance salesperson, Ilya earns a base salary plus a commission on each new policy. Therefore, Ilya’s weekly income $I$, depends on the number of new policies, $n$, he sells during the week. Last week he sold $3$ new policies, and earned \\$760 for the week. The week before, he sold $5$ new policies and earned \\$920. Find an equation for $I(n)$, and interpret the meaning of the components of the equation.',
          answer: '$I(n) = 80n + 520$: a base salary of \\$520 a week, plus \\$80 for each policy sold.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Working as an insurance salesperson, Ilya earns a base salary plus a commission on each new policy. Therefore, Ilya’s weekly income, I, depends on the number of new policies, n, he sells during the week.' },
        { say: 'Last week he sold 3 new policies, and earned 760 dollars for the week. The week before, he sold 5 new policies and earned 920 dollars. Find an equation for I of n, and interpret the meaning of the components of the equation.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Each week is a **point** $(n, I)$: policies sold, then pay. Two points fix a **line**. A **commission** is money for each sale.' }],
      lines: [
        { say: 'Each week gives us a point: the number of policies, then the pay. So we have the points 3, 760 and 5, 920.', show: ['g', 'g.axes', 'g.pts', 't'] },
        { say: 'Pay that is a base salary plus a fixed commission for each sale makes a straight line. Two points are enough to find its equation.', show: 'g.line' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['m = \\dfrac{y_2 - y_1}{x_2 - x_1}', 'y - y_1 = m(x - x_1)'] },
        { kind: 'text', id: 't', size: 'md', md: '**Slope-point form**: use the slope $m$ and any point $(x_1, y_1)$ on the line.' },
      ],
      lines: [
        { say: 'Here is what we need. The slope through two points is the change in y over the change in x.', show: 'f.0' },
        { say: 'Then slope point form: y minus y 1 equals m times x minus x 1, where x 1, y 1 is any point on the line.', show: ['f.1', 't'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **slope** from the two weeks', 'Write **slope-point form**', 'Rearrange, and say what each part **means**'] }],
      lines: [
        { say: 'Here is the plan. First, find the slope from the two weeks.', show: 'plan.0' },
        { say: 'Second, write the line in slope point form.', show: 'plan.1' },
        { say: 'Third, rearrange it to I of n equals m n plus b, and say what each part means.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The slope',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['m = \\dfrac{920 - 760}{5 - 3} = \\dfrac{160}{2}', '= \\good{80} \\text{ dollars per policy}'] }],
      lines: [
        { say: 'Step one. Going from 3 policies to 5, the pay goes from 760 to 920 dollars. That is a rise of 160 dollars for a run of 2 policies.', show: ['g', 'g.axes', 'g.pts', 'g.tri', 'm.0'], focus: 'g.tri' },
        { say: '160 divided by 2 is 80. So the slope is 80 dollars per policy: Ilya earns 80 dollars more for each extra policy.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Slope-point form',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['I - 760 = 80(n - 3)', 'I - 760 = 80n - 240', 'I = 80n + 520 \\ \\Rightarrow \\ \\good{I(n) = 80n + 520}'] }],
      lines: [
        { say: 'Step two. Use the slope, 80, and the point at 3, 760: I minus 760 equals 80 times n minus 3.', show: 'm.0' },
        { say: 'Expand the bracket: 80 times n is 80 n, and 80 times minus 3 is minus 240.', show: 'm.1' },
        { say: 'Add 760 to both sides: minus 240 plus 760 is 520. So I of n equals 80 n plus 520.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: What the parts mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'slope', tone: 'key', title: '80: the slope', md: 'Ilya earns a **commission of \\$80** for each policy he sells.' },
        { kind: 'callout', id: 'int', tone: 'key', title: '520: the intercept', md: 'With $n = 0$ policies, he still earns **\\$520**: his **base salary** for the week.' },
      ],
      lines: [
        { say: 'Step three. The slope, 80, is the commission: Ilya earns 80 dollars for each policy he sells.', show: 'slope' },
        { say: 'The intercept, 520, is his pay when n is 0, when he sells no policies at all. That is his base salary: 520 dollars a week.', show: 'int' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['I(3) = 240 + 520 = 760 \\ \\checkmark', 'I(5) = 400 + 520 = 920 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check both weeks. For 3 policies: 80 times 3 is 240, plus 520 is 760 dollars.', show: ['g', 'g.axes', 'g.pts', 'g.line', 'g.b', 'm.0'] },
        { say: 'For 5 policies: 80 times 5 is 400, plus 520 is 920 dollars. Both match, and the line meets the I axis at 520, the base salary.', show: 'm.1', focus: 'g.b' },
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
            ['$m = \\dfrac{5 - 3}{920 - 760}$', 'slope is change in **output** over change in input'],
            ['$I - 760 = 80(n + 3)$', 'slope-point form **subtracts** the point: $n - 3$'],
            ['$I = 80n + 760$', 'the intercept is pay at $n = 0$, not at $n = 3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The slope is the change in pay over the change in policies, not the other way round.' },
        { say: 'Slope point form subtracts the coordinates of the point, so it is n minus 3, not n plus 3.' },
        { say: 'And 760 is not the intercept. That is the pay for 3 policies. The intercept is the pay for 0 policies.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A line passes through $(2, 5)$ and $(4, 11)$. Which is its equation?',
          choices: ['$y - 5 = 2(x - 2)$', '$y - 5 = 3(x - 2)$', '$y - 2 = 3(x - 5)$', '$y + 5 = 3(x + 2)$'],
          answer: 1,
          working: '$m = \\dfrac{11 - 5}{4 - 2} = 3$, and through $(2, 5)$: $y - 5 = 3(x - 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A line passes through the points at 2, 5 and 4, 11. Which is its equation? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The slope is 11 minus 5, which is 6, over 4 minus 2, which is 2. So the slope is 3. Through the point at 2, 5: y minus 5 equals 3 times x minus 2, choice B. A has the wrong slope, C swaps x and y, and D adds instead of subtracting.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Slope from two points: $\\dfrac{y_2 - y_1}{x_2 - x_1}$', 'Slope-point form: $y - y_1 = m(x - x_1)$', 'Rearrange to $y = mx + b$ to read the **intercept**', 'Slope: rate per item. Intercept: the **starting** value'] }],
      lines: [
        { say: 'Here is what to remember. Find the slope from the two points.', show: 'sum.0' },
        { say: 'Write slope point form with the slope and one point.', show: 'sum.1' },
        { say: 'Rearrange to y equals m x plus b to read the intercept.', show: 'sum.2' },
        { say: 'And in a story, the slope is the rate for each item, and the intercept is the starting value. For more on slope point form, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
