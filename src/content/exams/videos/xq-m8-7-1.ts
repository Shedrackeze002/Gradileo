import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 8 lesson 7.1 (solving one-step equations). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 8.2, Solve Equations Using the Division and
// Multiplication Properties of Equality, CC BY-NC-SA 4.0). b ÷ (−6) = −24, so b = (−24)(−6) = 144.

const QUESTION = 'Solve: b/(−6) = −24.';

/** What happens to b (top row, to the right), and how to undo it (bottom row, back to the left). */
const machine = (id: string, answer: string): DiagramEl => ({
  kind: 'diagram',
  id,
  height: 300,
  points: { A: [0, 0], B: [7, 0], A1: [0.9, 0], B1: [6.1, 0], C: [7, -2.6], D: [0, -2.6], C1: [6.1, -2.6], D1: [0.9, -2.6] },
  items: [
    { kind: 'label', id: 'b', at: 'A', tex: 'b', place: 'center', tone: 'adj', group: 'top' },
    { kind: 'line', id: 'fwd', from: 'A1', to: 'B1', tone: 'opp', arrow: true, weight: 4, label: '\\div (-6)', labelSide: 'left', group: 'top' },
    { kind: 'label', id: 'out', at: 'B', tex: '-24', place: 'center', group: 'top' },
    { kind: 'label', id: 'out2', at: 'C', tex: '-24', place: 'center', group: 'undo' },
    { kind: 'line', id: 'back', from: 'C1', to: 'D1', tone: 'good', arrow: true, weight: 4, label: '\\times (-6)', labelSide: 'right', group: 'undo' },
    { kind: 'label', id: 'ans', at: 'D', tex: answer, place: 'center', tone: 'good' },
  ],
});

const video: Explainer = {
  id: 'xq-m8-7-1',
  lessonId: '',
  exam: {
    lesson: 'm8-7-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 8.2, Solve Equations Using the Division and Multiplication Properties of Equality',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/8-2-solve-equations-using-the-division-and-multiplication-properties-of-equality',
    question: QUESTION,
  },
  title: 'Exam Question: Solve b ÷ (−6) = −24 (One-Step Equations)',
  thumbnailTitle: 'Undo the Division',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: solve b/(−6) = −24. Here b is divided by −6, so we undo that by multiplying both sides by −6. That gives b = (−24)(−6), and a negative times a negative is positive, so b = 144. Then we check by putting 144 back into the equation, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Undo the Division', subtitle: 'Solving one-step equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about one-step equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve: $\\dfrac{b}{-6} = -24$.',
          answer: '$b = 144$',
          working: 'multiply both sides by −6',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Solve: "b" over negative 6 equals negative 24.', caption: 'Solve: b/(−6) = −24.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [machine('ask', '?'), { kind: 'callout', id: 'c', tone: 'definition', title: 'Solve', md: '**Solve** means find the value of $b$ that makes the equation true. Here, $b$ was **divided by** $-6$, and the result was $-24$. To find $b$, we **undo** the division.' }],
      lines: [
        { say: 'Solve means find the value of "b" that makes the equation true.', show: 'c' },
        { say: 'Here, "b" was divided by negative 6, and the result was negative 24.', show: 'ask.top' },
        { say: 'To find "b", we undo the division, working backwards.', show: ['ask.undo', 'ask.ans'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{multiplying undoes dividing}', '\\text{do the same to both sides}', '(-) \\times (-) = (+)'] }],
      lines: [
        { say: 'Here is what we need. Multiplying undoes dividing. They are inverse operations.', show: 'm.0' },
        { say: 'Whatever we do to one side of an equation, we do to the other side too, so it stays balanced.', show: 'm.1' },
        { say: 'And a negative times a negative is positive.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find what is done to $b$: **divided by** $-6$', '**Multiply** both sides by $-6$', 'Watch the **signs**'] }],
      lines: [
        { say: 'Here is the plan. Find what is done to "b": it is divided by negative 6.', show: 'plan.0' },
        { say: 'Multiply both sides by negative 6.', show: 'plan.1' },
        { say: 'Then watch the signs.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Multiply both sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{b}{\\opp{-6}} = -24', '\\opp{(-6)} \\cdot \\dfrac{b}{-6} = \\opp{(-6)}(-24)', 'b = \\good{144}'] }],
      lines: [
        { say: 'Step one. "b" is divided by negative 6.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. Multiply both sides by negative 6. On the left, multiplying by negative 6 undoes dividing by negative 6, leaving just "b".', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. On the right, negative 6 times negative 24. 6 times 24 is 144, and a negative times a negative is positive. So "b" equals 144.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [machine('ck', '144'), { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{144}{-6} = -24 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Working backwards from negative 24, times negative 6, gave 144.', show: ['ck.top', 'ck.undo', 'ck.ans'] },
        { say: 'Now go forwards. 144 divided by negative 6 is negative 24, because the signs are different. That matches the equation. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$b = 4$', 'divided by $-6$ again: to undo dividing, **multiply**'],
            ['$b = -144$', 'sign slip: $(-6)(-24)$ is **positive**'],
            ['$b = -18$', 'added $6$: $b$ is **divided** by $-6$, not added to it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"b" equals 4 divides negative 24 by negative 6. That divides again. To undo dividing, multiply.' },
        { say: '"b" equals negative 144 is a sign slip. Negative 6 times negative 24 is positive.' },
        { say: 'And "b" equals negative 18 adds 6 to negative 24. But "b" was divided by negative 6, not added to it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve: $\\dfrac{x}{4} = -7$',
          choices: ['$x = -\\tfrac74$', '$x = -28$', '$x = 28$', '$x = -3$'],
          answer: 1,
          working: 'Multiply both sides by 4: x = 4 × (−7) = −28.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve: "x" over 4 equals negative 7. Pause the video and try it.', caption: 'Your turn. Solve: x/4 = −7. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Multiply both sides by 4. 4 times negative 7 is negative 28. So "x" equals negative 28. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find what is **done** to the variable', 'Do the **inverse** to both sides', 'Multiplying undoes **dividing**', '**Check**: put the answer back in'] }],
      lines: [
        { say: 'Here is what to remember. Find what is done to the variable.', show: 'sum.0' },
        { say: 'Do the inverse operation to both sides.', show: 'sum.1' },
        { say: 'Multiplying undoes dividing, and dividing undoes multiplying.', show: 'sum.2' },
        { say: 'And check by putting the answer back into the equation. For more on solving one-step equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
