import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 8.2 (solving by substitution): Geraldine's two job offers. The
// question is an exercise from OpenStax Elementary Algebra 2e, word for word (section 5.2, Solving
// Systems of Equations by Substitution, CC BY-NC-SA 4.0), whose answer key gives 160 policies.
// With p for the pay and n for the policies sold, p = 12 000 + 100n and p = 20 000 + 50n, so
// 50n = 8000 and n = 160, when both pay $28 000.

/** Both pay lines, with n drawn at 1/10 and pay at 1/2000, crossing at (160, 28 000). */
const graph = (height = 440): DiagramEl => ({
  kind: 'diagram',
  id: 'g',
  height,
  points: {
    O: [0, 0], XE: [27, 0], YE: [0, 20], A: [0, 6], A1: [25, 18.5], B: [0, 10], B1: [25, 16.25],
    X: [16, 14], X0: [16, 0],
  },
  items: [
    { kind: 'line', id: 'xaxis', from: 'O', to: 'XE', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'O', to: 'YE', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xl', at: 'XE', tex: 'n', place: 'right', group: 'axes' },
    { kind: 'label', id: 'yl', at: 'YE', tex: 'p', place: 'above', group: 'axes' },
    { kind: 'line', id: 'firstline', from: 'A', to: 'A1', tone: 'adj', weight: 5, group: 'first' },
    { kind: 'label', id: 'a', at: 'A', tex: '12\\,000', place: 'left', dot: true, tone: 'adj', group: 'first' },
    { kind: 'label', id: 'al', at: 'A1', tex: '\\text{first}', place: 'right', tone: 'adj', group: 'first' },
    { kind: 'line', id: 'secondline', from: 'B', to: 'B1', tone: 'opp', weight: 5, group: 'second' },
    { kind: 'label', id: 'b', at: 'B', tex: '20\\,000', place: 'left', dot: true, tone: 'opp', group: 'second' },
    { kind: 'label', id: 'bl', at: 'B1', tex: '\\text{second}', place: 'right', tone: 'opp', group: 'second' },
    { kind: 'line', id: 'd0', from: 'X', to: 'X0', tone: 'good', dashed: true, group: 'cross' },
    { kind: 'label', id: 'x', at: 'X', tex: '(160, \\ 28\\,000)', place: 'above left', dot: true, tone: 'good', group: 'cross' },
    { kind: 'label', id: 'x0', at: 'X0', tex: '160', place: 'below', tone: 'good', group: 'cross' },
  ],
});

const QUESTION =
  'Geraldine has been offered positions by two insurance companies. The first company pays a salary of $12,000 plus a commission of $100 for each policy sold. The second pays a salary of $20,000 plus a commission of $50 for each policy sold. How many policies would need to be sold to make the total pay the same?';

const video: Explainer = {
  id: 'xq-m10c-8-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-8-2',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 5.2, Solving Systems of Equations by Substitution',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/5-2-solving-systems-of-equations-by-substitution',
    question: QUESTION,
  },
  title: 'Exam Question: Geraldine’s Two Job Offers, Solved by Substitution',
  thumbnailTitle: 'Two Job Offers',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: one job pays $12,000 plus $100 a policy, and another pays $20,000 plus $50 a policy. We write both as equations, substitute one into the other, and find that 160 policies make the pay the same, $28,000. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Job Offers', subtitle: 'Solving a system by substitution, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question with a system of two equations, by substitution. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Geraldine has been offered positions by two insurance companies. The first company pays a salary of \\$12,000 plus a commission of \\$100 for each policy sold. The second pays a salary of \\$20,000 plus a commission of \\$50 for each policy sold. How many policies would need to be sold to make the total pay the same?',
          answer: '$160$ policies',
          working: '$12\\,000 + 100n = 20\\,000 + 50n$, so $50n = 8000$ and $n = 160$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Geraldine has been offered positions by two insurance companies. The first company pays a salary of 12,000 dollars plus a commission of 100 dollars for each policy sold.' },
        { say: 'The second pays a salary of 20,000 dollars plus a commission of 50 dollars for each policy sold. How many policies would need to be sold to make the total pay the same?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The **first** job starts lower but grows faster. The **second** starts higher but grows slower. We want the number of policies where the two pays are **equal**.' }],
      lines: [{ say: 'The first job starts with less money, but earns more for each policy. The second starts with more, but earns less for each policy. So at some number of policies, the pays must be equal. That number is what we want.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Substitution', md: 'When one equation says what a variable **equals**, put that expression in its place in the other equation. Then there is only **one** variable left to solve for.' },
      ],
      lines: [
        { say: 'Here is what we need. Substitution: when one equation tells us what a variable equals, we put that expression in its place in the other equation.', show: 'def' },
        { say: 'That leaves an equation with only one variable, which we can solve.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write each job’s pay as an **equation**', '**Substitute** one into the other', 'Solve for the number of policies', 'Check'] }],
      lines: [
        { say: 'Here is the plan. First, write each job’s pay as an equation.', show: 'plan.0' },
        { say: 'Second, substitute one into the other.', show: 'plan.1' },
        { say: 'Third, solve for the number of policies.', show: 'plan.2' },
        { say: 'And last, check.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: Two equations',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = \\text{policies sold}, \\quad p = \\text{total pay}', '\\text{First: } p = 12\\,000 + 100n', '\\text{Second: } p = 20\\,000 + 50n'] }],
      lines: [
        { say: 'Step one. Let n be the number of policies sold, and p the total pay.', show: 'm.0' },
        { say: 'The first job pays 12,000 dollars, plus 100 dollars for each of the n policies. So p equals 12,000 plus 100 n.', show: 'm.1' },
        { say: 'The second job pays 20,000 dollars plus 50 dollars a policy. So p equals 20,000 plus 50 n.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Substitute',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['12\\,000 + 100n = 20\\,000 + 50n', '100n - 50n = 20\\,000 - 12\\,000', '50n = 8000', 'n = \\dfrac{8000}{50} = \\good{160}'] }],
      lines: [
        { say: 'Step two. The second equation says p equals 20,000 plus 50 n. Put that in place of p in the first equation: 12,000 plus 100 n equals 20,000 plus 50 n.', show: 'm.0' },
        { say: 'Step three. Take 50 n from both sides, and take 12,000 from both sides.', show: 'm.1' },
        { say: '100 n minus 50 n is 50 n. 20,000 minus 12,000 is 8,000.', show: 'm.2' },
        { say: 'Divide by 50: 8,000 over 50 is 160. So 160 policies would need to be sold to make the total pay the same. That is the answer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['12\\,000 + 100(160) = 28\\,000', '20\\,000 + 50(160) = 28\\,000', '\\text{equal} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The first job at 160 policies: 100 times 160 is 16,000, plus 12,000 is 28,000 dollars.', show: ['g', 'g.axes', 'g.first', 'm.0'], focus: 'g.first' },
        { say: 'The second job: 50 times 160 is 8,000, plus 20,000 is also 28,000 dollars.', show: ['g.second', 'm.1'], focus: 'g.second' },
        { say: 'The pays are equal, so the answer is right. On the graph, the two pay lines cross at 160 policies. Before that the second job pays more, and after it the first job pays more.', show: ['g.cross', 'm.2'], focus: 'g.cross' },
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
            ['$p = 100 + 12\\,000n$', 'the **salary** is fixed; the commission is per **policy**'],
            ['$150n = 8000$', 'subtract $50n$ from **both** sides: $100n - 50n = 50n$'],
            ['Answering $28\\,000$', 'the question asks for the number of **policies**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not mix up the salary and the commission. The salary is paid once. The commission is paid for each policy, so it goes with n.' },
        { say: 'When you move 50 n across, subtract it. 100 n minus 50 n is 50 n, not 150 n.' },
        { say: 'And the question asks how many policies. 28,000 dollars is the pay, not the answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve by substitution: $y = 2x$ and $x + y = 9$.',
          choices: ['$(6, 3)$', '$(4.5, 4.5)$', '$(3, 6)$', '$(9, 18)$'],
          answer: 2,
          working: '$x + 2x = 9$, so $3x = 9$, $x = 3$ and $y = 2(3) = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve by substitution: y equals 2 x, and x plus y equals 9. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Put 2 x in place of y: x plus 2 x equals 9, so 3 x equals 9 and x is 3. Then y is 2 times 3, which is 6. The answer is the point at 3, 6, choice C. A swaps x and y, and D only fits the first equation.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write each situation as an **equation**', '**Substitute** what one variable equals', 'Solve the one-variable equation', 'Answer the question that was **asked**'] }],
      lines: [
        { say: 'Here is what to remember. Write each situation as an equation.', show: 'sum.0' },
        { say: 'Substitute what one variable equals into the other equation.', show: 'sum.1' },
        { say: 'Solve the equation with one variable.', show: 'sum.2' },
        { say: 'And answer the question that was asked. For more on solving systems by substitution, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
