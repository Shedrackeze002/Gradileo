import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10-4 lesson 8.3 (symmetry and transformations). The free OpenStax books
// have no line-of-symmetry question at this level, so this one is written by Gradileo in the style
// of a Grade 10 workplace mathematics unit test. A rectangle that is not a square has 2 lines of
// symmetry (through the middles of opposite sides); its diagonals are not lines of symmetry.
// Check: folding along a diagonal of a 6 by 4 rectangle does not match the corners.

/** A 6 by 4 rectangle with its two lines of symmetry and one diagonal that is not. */
const rect = (height = 340): DiagramEl => ({
  kind: 'diagram',
  id: 'rc',
  height,
  points: { A: [0, 0], B: [6, 0], C: [6, 4], D: [0, 4], T: [3, 4.6], U: [3, -0.6], L: [-0.6, 2], R: [6.6, 2] },
  items: [
    { kind: 'region', id: 'fill', points: ['A', 'B', 'C', 'D'], tone: 'brand', shade: 0.14, group: 'shape' },
    { kind: 'curve', id: 'edge', points: ['A', 'B', 'C', 'D'], closed: true, tone: 'ink', weight: 3, group: 'shape' },
    { kind: 'line', id: 'up', from: 'U', to: 'T', tone: 'good', weight: 3, dashed: true, group: 'vert' },
    { kind: 'line', id: 'side', from: 'L', to: 'R', tone: 'good', weight: 3, dashed: true, group: 'horiz' },
    { kind: 'line', id: 'diag', from: 'A', to: 'C', tone: 'bad', weight: 3, dashed: true, group: 'diag' },
  ],
});

const QUESTION = 'A rectangle is 6 cm long and 4 cm wide. How many lines of symmetry does it have?';

const video: Explainer = {
  id: 'xq-m104-8-3',
  lessonId: '',
  exam: {
    lesson: 'm104-8-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Lines of Symmetry of a Rectangle (Symmetry and Transformations)',
  thumbnailTitle: 'Lines of Symmetry of a Rectangle',
  thumbnail: 'rc',
  summary:
    'An exam-style question, solved one small step at a time: a rectangle is 6 cm long and 4 cm wide. How many lines of symmetry does it have? A line of symmetry folds a shape onto itself. The rectangle folds exactly in half down the middle and across the middle, but not along a diagonal, so it has 2 lines of symmetry. Then we check with the fold test and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Lines of Symmetry of a Rectangle', subtitle: 'Symmetry, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about symmetry. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'A rectangle is $6$ cm long and $4$ cm wide. How many lines of symmetry does it have?',
          answer: '$2$',
          working: 'down the middle and across the middle; the diagonals do not work',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A rectangle is 6 centimetres long and 4 centimetres wide. How many lines of symmetry does it have?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [rect(), { kind: 'text', id: 't', size: 'md', md: 'The rectangle is **longer** than it is wide, so it is **not** a square.' }],
      lines: [
        { say: 'Here is the rectangle, 6 centimetres long and 4 centimetres wide.', show: 'rc.shape' },
        { say: 'Notice that it is longer than it is wide, so it is not a square. That will matter.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'key', title: 'The fold test', md: 'A **line of symmetry** splits a shape into two halves that are **mirror images**. If you fold the shape along it, the two halves match **exactly**.' },
      ],
      lines: [
        { say: 'Here is what we need. A line of symmetry splits a shape into two halves that are mirror images of each other.', show: 'c' },
        { say: 'Here is a test: if you folded the shape along the line, the two halves would match exactly, edge on edge and corner on corner.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Try a fold **down the middle**', 'Try a fold **across the middle**', 'Try the **diagonals**'] }],
      lines: [
        { say: 'Here is the plan. Try a fold down the middle.', show: 'plan.0' },
        { say: 'Try a fold across the middle.', show: 'plan.1' },
        { say: 'Then try the diagonals.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Down the middle',
      layout: 'center',
      main: [rect(), { kind: 'math', id: 'm', size: 'md', lines: ['3 \\text{ cm} \\mid 3 \\text{ cm}: \\text{ halves match} \\ \\checkmark'] }],
      lines: [
        { say: 'Step one. Fold down the middle, 3 centimetres from each end. The left half lands exactly on the right half. That is one line of symmetry.', show: ['rc.shape', 'rc.vert', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: Across the middle',
      layout: 'center',
      main: [rect(), { kind: 'math', id: 'm', size: 'md', lines: ['2 \\text{ cm above}, \\ 2 \\text{ cm below}: \\text{ halves match} \\ \\checkmark'] }],
      lines: [
        { say: 'Step two. Fold across the middle, 2 centimetres from the top and the bottom. The top half lands exactly on the bottom half. That is a second line of symmetry.', show: ['rc.shape', 'rc.vert', 'rc.horiz', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: The diagonals',
      layout: 'center',
      main: [rect(), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{diagonal: corners do not match} \\ \\times', '\\good{2 \\text{ lines of symmetry}}'] }],
      lines: [
        { say: 'Step three. Now try a diagonal, from corner to corner. Folding along it, the long side lands on the short side, and the corners stick out. So a diagonal is not a line of symmetry. The other diagonal fails in the same way.', show: ['rc.shape', 'rc.vert', 'rc.horiz', 'rc.diag', 'm.0'] },
        { say: 'So the rectangle has 2 lines of symmetry.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{diagonal fold: } 6 \\text{ cm side onto a } 4 \\text{ cm side}', '6 \\ne 4 \\ \\Rightarrow \\ \\text{no match} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check why the diagonal fails. Folding along a diagonal would put a 6 centimetre side on top of a 4 centimetre side.', show: 'm.0' },
        { say: '6 is not 4, so the sides cannot match. Only a square, with all sides equal, has diagonal lines of symmetry. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$4$', 'counted the **diagonals**: only a **square** has those'],
            ['$1$', 'found only one fold: try **both** directions'],
            ['$0$', 'thought the sides must all be equal: they need not be'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4 counts the diagonals too. That is the answer for a square, but this rectangle is not a square.' },
        { say: '1 finds only one fold. Try down the middle and across the middle.' },
        { say: 'And 0 thinks a shape needs equal sides to have symmetry. It does not: two matching halves are enough.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many lines of symmetry does an equilateral triangle (all three sides equal) have?',
          choices: ['$3$', '$1$', '$6$', '$0$'],
          answer: 0,
          working: 'One line from each corner to the middle of the opposite side: $3$ lines.',
        },
      ],
      lines: [
        { say: 'Your turn. How many lines of symmetry does an equilateral triangle have? All three of its sides are equal. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'A fold from each corner to the middle of the opposite side matches the two halves. There are 3 corners, so 3 lines. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A line of symmetry makes **mirror halves**', 'Use the **fold test**', 'Rectangle: **$2$** lines', 'Square: **$4$** lines (diagonals too)'] }],
      lines: [
        { say: 'Here is what to remember. A line of symmetry splits a shape into mirror halves.', show: 'sum.0' },
        { say: 'Test each line by imagining a fold.', show: 'sum.1' },
        { say: 'A rectangle that is not a square has 2 lines of symmetry.', show: 'sum.2' },
        { say: 'And a square has 4, because its diagonals work too. For more on symmetry and transformations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
