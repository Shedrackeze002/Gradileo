import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 7.4 (parallel and perpendicular equations): the line
// perpendicular to y = 3x + 1 through (4, 2). The question is an exercise from OpenStax Elementary
// Algebra 2e, word for word (section 4.6, Find the Equation of a Line, CC BY-NC-SA 4.0), whose
// answer key gives y = −(1/3)x + 10/3. The two lines cross at (0.7, 3.1).

/** y = 3x + 1 and the answer, y = −(1/3)x + 10/3, crossing at right angles at (0.7, 3.1). */
const lines = (height = 440): DiagramEl => ({
  kind: 'diagram',
  id: 'l',
  height,
  points: {
    X0: [-1.4, 0], X1: [6.6, 0], Y0: [0, -1.6], Y1: [0, 6.2],
    G0: [-0.85, -1.55], G1: [1.65, 5.95], N0: [-1.2, 3.7333], N1: [6.4, 1.2],
    P: [4, 2], I: [0.7, 3.1],
  },
  items: [
    { kind: 'line', id: 'xaxis', from: 'X0', to: 'X1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'Y0', to: 'Y1', tone: 'muted', arrow: true, group: 'axes' },
    { kind: 'line', id: 'given', from: 'G0', to: 'G1', tone: 'adj', weight: 5, group: 'gv' },
    { kind: 'label', id: 'gl', at: 'G1', tex: 'y = 3x + 1', place: 'right', tone: 'adj', group: 'gv' },
    { kind: 'label', id: 'p', at: 'P', tex: '(4, 2)', place: 'above right', dot: true, tone: 'opp' },
    { kind: 'line', id: 'new', from: 'N0', to: 'N1', tone: 'good', weight: 5, group: 'nw' },
    { kind: 'label', id: 'nl', at: 'N1', tex: 'y = -\\tfrac{1}{3}x + \\tfrac{10}{3}', place: 'right', tone: 'good', group: 'nw' },
    { kind: 'right', id: 'sq', at: 'I', from: 'G1', to: 'N1' },
  ],
});

const QUESTION =
  'Find an equation of a line perpendicular to the line y = 3x + 1 that contains the point (4, 2). Write the equation in slope–intercept form.';

const video: Explainer = {
  id: 'xq-m10c-7-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-7-4',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 4.6, Find the Equation of a Line',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-6-find-the-equation-of-a-line',
    question: QUESTION,
  },
  title: 'Exam Question: The Line Perpendicular to y = 3x + 1 Through (4, 2)',
  thumbnailTitle: 'A Perpendicular Line',
  thumbnail: 'l',
  summary:
    'A real test question, solved one small step at a time: find the line perpendicular to y = 3x + 1 that passes through (4, 2). We take the negative reciprocal of 3 to get the slope −1/3, use slope-point form with (4, 2), and rearrange to y = −(1/3)x + 10/3. Then we check the point and the right angle, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Perpendicular Line', subtitle: 'Equations of perpendicular lines, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about writing the equation of a perpendicular line. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find an equation of a line perpendicular to the line $y = 3x + 1$ that contains the point $(4, 2)$. Write the equation in slope–intercept form.',
          answer: '$y = -\\dfrac{1}{3}x + \\dfrac{10}{3}$',
          working: '$m = -\\dfrac{1}{3}$; $y - 2 = -\\dfrac{1}{3}(x - 4)$, so $y = -\\dfrac{1}{3}x + \\dfrac{4}{3} + 2 = -\\dfrac{1}{3}x + \\dfrac{10}{3}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find an equation of a line perpendicular to the line y equals 3 x plus 1 that contains the point at 4, 2. Write the equation in slope intercept form.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'We need a **new line** that crosses $y = 3x + 1$ at a **right angle** and passes through the point $(4, 2)$. The answer should look like $y = mx + b$.' }],
      lines: [{ say: 'We need a new line. It must cross the line y equals 3 x plus 1 at a right angle, and it must pass through the point at 4, 2. The answer should be in the form y equals m x plus b.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perpendicular slopes', md: 'Perpendicular lines have slopes that are **negative reciprocals**: flip the fraction and change the sign. Their product is $-1$.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['y - y_1 = m(x - x_1)'] },
      ],
      lines: [
        { say: 'Here is what we need. Perpendicular lines have slopes that are negative reciprocals: flip the fraction and change the sign. Their product is minus 1.', show: 'def' },
        { say: 'And to write a line from a slope and a point, use slope point form: y minus y 1 equals m times x minus x 1.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **perpendicular slope**', 'Use **slope-point form** with $(4, 2)$', 'Rearrange to $y = mx + b$'] }],
      lines: [
        { say: 'Here is the plan. First, find the perpendicular slope.', show: 'plan.0' },
        { say: 'Second, use slope point form with the point at 4, 2.', show: 'plan.1' },
        { say: 'Third, rearrange to y equals m x plus b.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The slope',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m = 3 = \\dfrac{3}{1}', 'm_\\perp = \\good{-\\dfrac{1}{3}}'] }],
      lines: [
        { say: 'Step one. The given line has slope 3, which is 3 over 1.', show: 'm.0' },
        { say: 'Flip it to get 1 third, and change the sign: minus 1 third. That is the slope of our new line.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Slope-point form',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y - 2 = -\\dfrac{1}{3}(x - 4)', 'y - 2 = -\\dfrac{1}{3}x + \\dfrac{4}{3}', 'y = -\\dfrac{1}{3}x + \\dfrac{4}{3} + \\dfrac{6}{3} = \\good{-\\dfrac{1}{3}x + \\dfrac{10}{3}}'] }],
      lines: [
        { say: 'Step two. Use the slope minus 1 third and the point at 4, 2: y minus 2 equals minus 1 third, times x minus 4.', show: 'm.0' },
        { say: 'Expand the bracket. Minus 1 third times x is minus 1 third x. Minus 1 third times minus 4 is plus 4 thirds.', show: 'm.1' },
        { say: 'Step three. Add 2 to both sides. 2 is 6 thirds, and 4 thirds plus 6 thirds is 10 thirds. So y equals minus 1 third x, plus 10 thirds. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [lines(), { kind: 'math', id: 'm', size: 'md', lines: ['x = 4: \\ -\\tfrac{4}{3} + \\tfrac{10}{3} = 2 \\ \\checkmark', '3 \\times \\left(-\\tfrac{1}{3}\\right) = -1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put x equals 4 into our answer: minus 4 thirds plus 10 thirds is 6 thirds, which is 2. So the line passes through the point at 4, 2.', show: ['l', 'l.axes', 'l.gv', 'l.p', 'l.nw', 'm.0'] },
        { say: 'And 3 times minus 1 third is minus 1, so the lines are perpendicular. On the graph they meet at a right angle.', show: ['l.sq', 'm.1'], focus: 'l.sq' },
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
            ['Slope $\\dfrac{1}{3}$', 'flip **and** change the sign: $-\\dfrac{1}{3}$'],
            ['Slope $-3$', 'change the sign **and** flip'],
            ['$y = -\\dfrac{1}{3}x + 1$', 'the new line has a **new** intercept: find it from $(4, 2)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Flipping 3 to 1 third without changing the sign gives a line that is not perpendicular.' },
        { say: 'Changing the sign to minus 3 without flipping is wrong too. You need both.' },
        { say: 'And do not keep the old intercept, 1. The new line goes through the point at 4, 2, so its intercept is 10 thirds.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the line parallel to $y = 2x - 3$ that contains the point $(-2, 1)$.',
          choices: ['$y = 2x - 3$', '$y = -\\dfrac{1}{2}x$', '$y = 2x + 3$', '$y = 2x + 5$'],
          answer: 3,
          working: 'Same slope, $2$: $y - 1 = 2(x + 2)$, so $y = 2x + 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the line parallel to y equals 2 x minus 3 that contains the point at minus 2, 1. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'A parallel line has the same slope, 2. Then y minus 1 equals 2 times x plus 2, which is 2 x plus 4. Add 1: y equals 2 x plus 5, choice D. A is the same line, and B is perpendicular, not parallel.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Parallel: the **same** slope', 'Perpendicular: **flip** and change the **sign**', 'Then slope-point form with the given point', 'Check the point and the slopes'] }],
      lines: [
        { say: 'Here is what to remember. A parallel line has the same slope.', show: 'sum.0' },
        { say: 'A perpendicular line has the negative reciprocal slope: flip it and change the sign.', show: 'sum.1' },
        { say: 'Then use slope point form with the given point.', show: 'sum.2' },
        { say: 'And check that the point fits and the slopes are right. For more on parallel and perpendicular equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
