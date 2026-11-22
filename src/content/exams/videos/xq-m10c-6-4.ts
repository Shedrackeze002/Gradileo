import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 6.4 (parallel and perpendicular lines): are 7x + 2y = 3 and
// 2x + 7y = 5 perpendicular? The question is OpenStax Elementary Algebra 2e's own worked example,
// word for word (section 4.5, Use the Slope-Intercept Form of an Equation of a Line,
// CC BY-NC-SA 4.0). The slopes are −7/2 and −2/7: reciprocals, but not negative reciprocals, since
// their product is 1, not −1. So the lines are not perpendicular; they meet at about 58°.

/** The two lines drawn to scale, crossing at about (0.24, 0.64) at an angle of about 58°. */
const lines = (height = 380): DiagramEl => ({
  kind: 'diagram',
  id: 'l',
  height,
  points: {
    P: [-0.5, 3.25], Q: [1.1, -2.35], R: [-3, 1.5714], S: [3.2, -0.2],
    I: [0.2444, 0.6444],
  },
  items: [
    { kind: 'line', id: 'one', from: 'P', to: 'Q', tone: 'adj', weight: 5, label: '7x + 2y = 3', labelSide: 'left', labelAt: 0.95 },
    { kind: 'line', id: 'two', from: 'R', to: 'S', tone: 'opp', weight: 5, label: '2x + 7y = 5', labelSide: 'left', labelAt: 0.1 },
    { kind: 'angle', id: 'ang', at: 'I', from: 'S', to: 'Q', tone: 'theta', label: '58^\\circ', r: 50, labelDist: 85 },
  ],
});

const QUESTION = 'Use slopes to determine if the lines, 7x + 2y = 3 and 2x + 7y = 5 are perpendicular.';

const video: Explainer = {
  id: 'xq-m10c-6-4',
  lessonId: '',
  exam: {
    lesson: 'm10c-6-4',
    source: 'OpenStax, Elementary Algebra 2e, Example in section 4.5, Use the Slope-Intercept Form of an Equation of a Line',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-5-use-the-slope-intercept-form-of-an-equation-of-a-line',
    question: QUESTION,
  },
  title: 'Exam Question: Are 7x + 2y = 3 and 2x + 7y = 5 Perpendicular?',
  thumbnailTitle: 'Are They Perpendicular?',
  thumbnail: 'l',
  summary:
    'A real test question, solved one small step at a time: are the lines 7x + 2y = 3 and 2x + 7y = 5 perpendicular? We solve each for y to read off the slopes, −7/2 and −2/7, and multiply them. The product is 1, not −1, so the lines are not perpendicular, and a drawing to scale shows them meeting at about 58°. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Are They Perpendicular?', subtitle: 'Slopes of perpendicular lines, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about perpendicular lines. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Use slopes to determine if the lines, $7x + 2y = 3$ and $2x + 7y = 5$ are perpendicular.',
          answer: 'Not perpendicular',
          working: 'The slopes are $-\\dfrac{7}{2}$ and $-\\dfrac{2}{7}$, and $\\left(-\\dfrac{7}{2}\\right)\\left(-\\dfrac{2}{7}\\right) = 1 \\neq -1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Use slopes to determine if the lines 7 x plus 2 y equals 3, and 2 x plus 7 y equals 5, are perpendicular.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: '**Perpendicular** lines meet at a **right angle**, $90^\\circ$. We must decide using the **slopes**, not by looking at a picture.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7x + 2y = 3 \\qquad 2x + 7y = 5'] },
      ],
      lines: [
        { say: 'Perpendicular lines meet at a right angle, 90 degrees.', show: 't' },
        { say: 'We have two lines, both in general form. The question wants us to decide using their slopes, not by guessing from a drawing.', show: 'm' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perpendicular slopes', md: 'Two lines are **perpendicular** when their slopes are **negative reciprocals**: their **product is $-1$**. For example, $2$ and $-\\dfrac{1}{2}$.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['y = mx + b: \\ m \\text{ is the slope}'] },
      ],
      lines: [
        { say: 'Here is what we need. Two lines are perpendicular when their slopes are negative reciprocals. That means you flip the fraction and change the sign, so their product is minus 1. For example, 2 and minus a half.', show: 'def' },
        { say: 'To read a slope, write the equation as y equals m x plus b. Then m is the slope.', show: 'f' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Solve each equation for $y$', 'Read off the two **slopes**', '**Multiply** them: is the product $-1$?'] }],
      lines: [
        { say: 'Here is the plan. First, solve each equation for y.', show: 'plan.0' },
        { say: 'Second, read off the two slopes.', show: 'plan.1' },
        { say: 'Third, multiply them, and see whether the product is minus 1.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Solve for y',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['7x + 2y = 3 \\ \\Rightarrow \\ 2y = -7x + 3 \\ \\Rightarrow \\ y = -\\dfrac{7}{2}x + \\dfrac{3}{2}', '2x + 7y = 5 \\ \\Rightarrow \\ 7y = -2x + 5 \\ \\Rightarrow \\ y = -\\dfrac{2}{7}x + \\dfrac{5}{7}'] }],
      lines: [
        { say: 'Step one. In the first equation, take 7 x from both sides: 2 y equals minus 7 x plus 3. Divide by 2: y equals minus 7 halves x, plus 3 halves.', show: 'm.0' },
        { say: 'In the second, take 2 x from both sides: 7 y equals minus 2 x plus 5. Divide by 7: y equals minus 2 sevenths x, plus 5 sevenths.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Compare the slopes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['m_1 = -\\dfrac{7}{2}, \\quad m_2 = -\\dfrac{2}{7}', 'm_1 \\times m_2 = \\left(-\\dfrac{7}{2}\\right)\\left(-\\dfrac{2}{7}\\right) = +1', '\\good{\\text{not perpendicular}}'] }],
      lines: [
        { say: 'Step two. The slopes are minus 7 halves and minus 2 sevenths. They are reciprocals: one is the other flipped over.', show: 'm.0' },
        { say: 'But they have the same sign. Multiply them: a negative times a negative is positive, and 7 halves times 2 sevenths is 1. The product is plus 1, not minus 1.', show: 'm.1' },
        { say: 'So the slopes are not negative reciprocals, and the lines are not perpendicular. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [lines(400), { kind: 'text', id: 't', size: 'md', md: 'Drawn **to scale**, the lines meet at about $58^\\circ$, **not** $90^\\circ$.' }],
      lines: [
        { say: 'Let us check with a drawing to scale. Here is the first line, falling steeply.', show: ['l', 'l.one'] },
        { say: 'Here is the second, falling gently. Both slopes are negative, so both lines fall from left to right.', show: 'l.two' },
        { say: 'Two lines that both fall can never meet at a right angle. These meet at about 58 degrees.', show: ['l.ang', 't'], focus: 'l.ang' },
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
            ['"Reciprocals, so perpendicular"', 'they must be **negative** reciprocals'],
            ['Slopes $7$ and $2$, read from $7x$ and $2x$', 'solve for $y$ **first**'],
            ['Slope $-7$ for $7x + 2y = 3$', 'divide **every** term by $2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Seeing 7 halves and 2 sevenths and saying perpendicular is the big one. They must be negative reciprocals, with opposite signs.' },
        { say: 'The numbers in front of x in general form are not the slopes. Solve for y first.' },
        { say: 'And when you divide by 2, divide every term, so the slope is minus 7 halves, not minus 7.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which line is perpendicular to $y = 2x - 5$?',
          choices: ['$y = 2x + 1$', '$y = -2x + 3$', '$y = -\\dfrac{1}{2}x + 4$', '$y = \\dfrac{1}{2}x - 1$'],
          answer: 2,
          working: 'The negative reciprocal of $2$ is $-\\dfrac{1}{2}$, and $2 \\times \\left(-\\dfrac{1}{2}\\right) = -1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which line is perpendicular to y equals 2 x minus 5? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Flip 2 to get one half, and change the sign: minus one half. That is choice C, and 2 times minus one half is minus 1. A is parallel, B only changes the sign, and D only flips.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Solve for $y$ to find each **slope**', 'Parallel: **equal** slopes', 'Perpendicular: **flip** and change the **sign**', 'Check: the product is $-1$'] }],
      lines: [
        { say: 'Here is what to remember. Solve for y to find each slope.', show: 'sum.0' },
        { say: 'Parallel lines have equal slopes.', show: 'sum.1' },
        { say: 'Perpendicular slopes are negative reciprocals: flip the fraction and change the sign.', show: 'sum.2' },
        { say: 'And check that their product is minus 1. For more on parallel and perpendicular lines, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
