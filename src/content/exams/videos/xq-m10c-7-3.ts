import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 7.3 (general form): the slope and y-intercept of x + 2y = 6.
// The question is OpenStax Elementary Algebra 2e's own worked example, word for word (section 4.5,
// Use the Slope-Intercept Form of an Equation of a Line, CC BY-NC-SA 4.0). Solving for y gives
// y = −(1/2)x + 3: slope −1/2, y-intercept (0, 3). The video also writes it in Alberta's general
// form, x + 2y − 6 = 0.

/** The line x + 2y = 6 with its intercepts and a slope step of run 2, fall 1 (y drawn 1.5 times taller). */
const graph = (height = 440): DiagramEl => ({
  kind: 'diagram',
  id: 'g',
  height,
  points: { X0: [-0.8, 0], X1: [8, 0], Y0: [0, -1.2], Y1: [0, 6.6], A: [0, 4.5], B: [6, 0], S: [-0.8, 5.1], E: [7.6, -1.2], R: [2, 4.5], C: [2, 3] },
  items: [
    { kind: 'line', id: 'xaxis', from: 'X0', to: 'X1', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'line', id: 'yaxis', from: 'Y0', to: 'Y1', tone: 'ink', arrow: true, group: 'axes' },
    { kind: 'label', id: 'xl', at: 'X1', tex: 'x', place: 'right', group: 'axes' },
    { kind: 'label', id: 'yl', at: 'Y1', tex: 'y', place: 'above', group: 'axes' },
    { kind: 'line', id: 'line', from: 'S', to: 'E', tone: 'brand', weight: 5 },
    { kind: 'label', id: 'a', at: 'A', tex: '(0, 3)', place: 'left', dot: true, tone: 'good' },
    { kind: 'label', id: 'b', at: 'B', tex: '(6, 0)', place: 'above right', dot: true, tone: 'adj', group: 'xint' },
    { kind: 'line', id: 'run', from: 'A', to: 'R', tone: 'adj', dashed: true, label: '2', labelSide: 'left', group: 'tri' },
    { kind: 'line', id: 'fall', from: 'R', to: 'C', tone: 'opp', dashed: true, label: '-1', labelSide: 'left', group: 'tri' },
  ],
});

const QUESTION = 'Identify the slope and y-intercept of the line with equation x + 2y = 6.';

const video: Explainer = {
  id: 'xq-m10c-7-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-7-3',
    source: 'OpenStax, Elementary Algebra 2e, Example in section 4.5, Use the Slope-Intercept Form of an Equation of a Line',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-5-use-the-slope-intercept-form-of-an-equation-of-a-line',
    question: QUESTION,
  },
  title: 'Exam Question: The Slope and y-Intercept of x + 2y = 6',
  thumbnailTitle: 'Slope and Intercept of x + 2y = 6',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: what are the slope and y-intercept of x + 2y = 6? We solve for y to get y = −(1/2)x + 3, read off the slope −1/2 and the y-intercept (0, 3), and see the same line in general form. Then we check with a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Slope and Intercept', subtitle: 'Of the line x + 2y = 6, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about reading a line’s slope and intercept from an equation that is not in y equals m x plus b form. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Identify the slope and $y$-intercept of the line with equation $x + 2y = 6$.',
          answer: 'Slope $-\\dfrac{1}{2}$; $y$-intercept $(0, 3)$',
          working: '$2y = -x + 6$, so $y = -\\dfrac{1}{2}x + 3$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Identify the slope and y intercept of the line with equation x plus 2 y equals 6.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x + 2y = 6 \\quad \\text{or} \\quad x + 2y - 6 = 0'] },
        { kind: 'text', id: 't', size: 'md', md: 'The $x$ and $y$ terms are on the **same side**, so we cannot read the slope straight off. **General form** is $Ax + By + C = 0$.' },
      ],
      lines: [
        { say: 'This equation has x and y on the same side. Moving the 6 over gives x plus 2 y minus 6 equals 0, which is general form: \"A\" x plus \"B\" y plus \"C\" equals 0.', show: 'm' },
        { say: 'In this form, the slope and intercept are not on show. We have to rearrange to see them.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['y = mx + b'] },
        { kind: 'text', id: 't', size: 'md', md: 'Once $y$ is **on its own**, the number in front of $x$ is the **slope** $m$, and the number on its own is the **$y$-intercept** $b$, at the point $(0, b)$.' },
      ],
      lines: [
        { say: 'Here is what we need. In slope intercept form, y equals m x plus b.', show: 'f' },
        { say: 'Once y is on its own, the number in front of x is the slope, and the number on its own is the y intercept, b. The line crosses the y axis at the point at 0, b.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Move the $x$ term to the other side', 'Divide **every** term by the number in front of $y$', 'Read off $m$ and $b$'] }],
      lines: [
        { say: 'Here is the plan. First, move the x term to the other side.', show: 'plan.0' },
        { say: 'Second, divide every term by the number in front of y.', show: 'plan.1' },
        { say: 'Third, read off the slope and the intercept.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Get y on its own',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x + 2y = 6', '2y = -x + 6', 'y = -\\dfrac{1}{2}x + 3'] }],
      lines: [
        { say: 'Step one. Start with x plus 2 y equals 6.', show: 'm.0' },
        { say: 'Take x from both sides: 2 y equals minus x plus 6. Write the x term first, so it looks like m x plus b.', show: 'm.1' },
        { say: 'Divide every term by 2: y equals minus one half x, plus 3.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Read off m and b',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = \\underbrace{-\\tfrac{1}{2}}_{m}\\,x + \\underbrace{3}_{b}', '\\good{m = -\\tfrac{1}{2}}, \\quad \\good{y\\text{-intercept } (0, 3)}'] }],
      lines: [
        { say: 'Step two. Now compare with y equals m x plus b. The number in front of x is minus one half, so the slope is minus one half.', show: 'm.0' },
        { say: 'The number on its own is 3, so the y intercept is the point at 0, 3. That is the answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = 0: \\ 2y = 6, \\ y = 3 \\ \\checkmark', 'y = 0: \\ x = 6', '\\dfrac{0 - 3}{6 - 0} = -\\dfrac{1}{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the original equation. Put x equals 0: 2 y equals 6, so y is 3. The line crosses the y axis at 3.', show: ['g', 'g.axes', 'g.a', 'm.0'], focus: 'g.a' },
        { say: 'Put y equals 0: x equals 6. So the line also passes through the point at 6, 0.', show: ['g.xint', 'g.line', 'm.1'] },
        { say: 'From 0, 3 to 6, 0, y falls 3 while x goes 6, a slope of minus 3 over 6, which is minus one half. On the graph, every 2 steps right, the line falls 1.', show: ['g.tri', 'm.2'], focus: 'g.tri' },
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
            ['Slope $1$, from the $x$', 'solve for $y$ **first**'],
            ['$y = -x + 3$', 'divide **every** term by $2$, including $-x$'],
            ['$y$-intercept $(0, 6)$', '$6$ is not yet divided by $2$: it is $(0, 3)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The 1 in front of x in x plus 2 y equals 6 is not the slope. Get y on its own first.' },
        { say: 'When you divide by 2, divide every term. Minus x becomes minus one half x.' },
        { say: 'And the 6 also gets divided by 2, so the y intercept is 3, not 6.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the slope of the line $3x - 4y + 8 = 0$?',
          choices: ['$3$', '$-\\dfrac{3}{4}$', '$\\dfrac{3}{4}$', '$-\\dfrac{4}{3}$'],
          answer: 2,
          working: '$-4y = -3x - 8$, so $y = \\dfrac{3}{4}x + 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the slope of the line 3 x minus 4 y plus 8 equals 0? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Move the 3 x and the 8: minus 4 y equals minus 3 x minus 8. Divide every term by minus 4: y equals 3 quarters x plus 2. The slope is 3 quarters, choice C. B forgets that dividing by minus 4 changes the sign, and A reads the 3 straight off.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['General form: $Ax + By + C = 0$', 'Solve for $y$ to get $y = mx + b$', 'Divide **every** term, and watch the signs', 'Check with the intercepts'] }],
      lines: [
        { say: 'Here is what to remember. General form is \"A\" x plus \"B\" y plus \"C\" equals 0.', show: 'sum.0' },
        { say: 'To find the slope and intercept, solve for y to get y equals m x plus b.', show: 'sum.1' },
        { say: 'Divide every term, and watch the signs.', show: 'sum.2' },
        { say: 'And check with the intercepts. For more on general form, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
