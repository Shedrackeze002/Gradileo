import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-4 lesson 7.2 (area of shapes). The question is an Exercise from OpenStax
// Prealgebra 2e, word for word (section 9.4, Use Properties of Rectangles, Triangles, and
// Trapezoids, CC BY-NC-SA 4.0; the book's sentence is missing a "to"). A = ½h(b + B) = ½ × 15 ×
// (18 + 14) = ½ × 15 × 32 = 240 square feet, as in the book's answer. Check: a 14 × 15 rectangle
// (210) plus two triangles ½ × 2 × 15 = 15 each makes 240.

const QUESTION =
  'Kira wants cover his patio with concrete pavers. If the patio is shaped like a trapezoid whose bases are 18 feet and 14 feet and whose height is 15 feet, how many square feet of pavers will he need?';

/** The patio: a trapezoid with bases 18 (bottom) and 14 (top) and height 15, and the split used in the check. */
const patio = (o: { split?: boolean } = {}): DiagramEl => ({
  kind: 'diagram',
  id: 'pic',
  height: 380,
  points: { A: [0, 0], B: [18, 0], C: [16, 15], D: [2, 15], E: [2, 0], F: [16, 0], M: [9, 15], N: [9, 0] },
  items: [
    { kind: 'region', id: 'fill', points: ['A', 'B', 'C', 'D'], tone: 'brand', shade: 0.18 },
    ...(o.split
      ? [
          { kind: 'region' as const, id: 'l', points: ['A', 'E', 'D'], tone: 'opp' as const, shade: 0.35 },
          { kind: 'region' as const, id: 'r', points: ['F', 'B', 'C'], tone: 'opp' as const, shade: 0.35 },
          { kind: 'line' as const, id: 'h1', from: 'D', to: 'E', tone: 'muted' as const, dashed: true },
          { kind: 'line' as const, id: 'h2', from: 'F', to: 'C', tone: 'muted' as const, dashed: true },
        ]
      : []),
    { kind: 'line', id: 'b1', from: 'A', to: 'B', tone: 'adj', weight: 5, label: '18 \\text{ ft}', labelSide: 'right' },
    { kind: 'line', id: 'b2', from: 'C', to: 'D', tone: 'adj', weight: 5, label: '14 \\text{ ft}', labelSide: 'right' },
    { kind: 'line', id: 's1', from: 'B', to: 'C', tone: 'ink' },
    { kind: 'line', id: 's2', from: 'D', to: 'A', tone: 'ink' },
    { kind: 'line', id: 'h', from: 'M', to: 'N', tone: 'opp', dashed: true, label: '15 \\text{ ft}', labelSide: 'right' },
    { kind: 'right', id: 'rt', at: 'N', from: 'B', to: 'M' },
  ],
});

const video: Explainer = {
  id: 'xq-m204-7-2',
  lessonId: '',
  exam: {
    lesson: 'm204-7-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.4, Use Properties of Rectangles, Triangles, and Trapezoids',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-4-use-properties-of-rectangles-triangles-and-trapezoids',
    question: QUESTION,
  },
  title: 'Exam Question: Pavers for a Trapezoid Patio (Area of Shapes)',
  thumbnailTitle: 'How Many Square Feet of Pavers?',
  thumbnail: 'pic',
  summary:
    'A real test question, solved one small step at a time: a patio is a trapezoid with bases 18 feet and 14 feet and a height of 15 feet. How many square feet of pavers does it need? With A = ½h(b + B), the area is ½ × 15 × (18 + 14) = ½ × 15 × 32 = 240 square feet. Then we check by cutting the trapezoid into a rectangle and two triangles, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Square Feet of Pavers?', subtitle: 'Area, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about area. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Kira wants cover his patio with concrete pavers. If the patio is shaped like a trapezoid whose bases are $18$ feet and $14$ feet and whose height is $15$ feet, how many square feet of pavers will he need?',
          answer: '$240$ square feet',
          working: '½ × 15 × (18 + 14) = 240',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Kira wants to cover his patio with concrete pavers. The patio is shaped like a trapezoid. Its bases are 18 feet and 14 feet, and its height is 15 feet. How many square feet of pavers will he need?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [patio()],
      right: [
        { kind: 'callout', id: 'a', tone: 'definition', title: 'Trapezoid', md: 'A **trapezoid** has two **parallel** sides, called the **bases**. The **height** is the distance **straight across** between them.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Square feet', md: 'Pavers **cover** the patio, so we need its **area**, in **square feet**.' },
      ],
      lines: [
        { say: 'A trapezoid has two parallel sides, called the bases. Here they are 18 feet and 14 feet.', show: ['pic', 'pic.fill', 'pic.b1', 'pic.b2', 'pic.s1', 'pic.s2', 'a'], focus: ['pic.b1', 'pic.b2'] },
        { say: 'The height is the distance straight across between the bases, at a right angle. Here it is 15 feet. It is not the slanted side.', show: ['pic.h', 'pic.rt'], focus: 'pic.h' },
        { say: 'The pavers cover the patio, so we need its area, in square feet.', show: 'b', focus: 'pic.fill' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['A = \\tfrac{1}{2}\\, h\\, (b + B)'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Why it works', md: 'Add the two bases, multiply by the height, then take **half**. It is like a rectangle whose length is the **average** of the bases.' },
      ],
      lines: [
        { say: 'Here is what we need. The area of a trapezoid is one half, times the height, times the sum of the two bases.', show: 'm' },
        { say: 'It works like a rectangle whose length is the average of the two bases.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Add** the bases', '**Multiply** by the height', 'Take **half**'] }],
      lines: [
        { say: 'Here is the plan. Add the bases.', show: 'plan.0' },
        { say: 'Multiply by the height.', show: 'plan.1' },
        { say: 'Then take half.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: The area',
      layout: 'split',
      leftWidth: 600,
      left: [patio()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['18 + 14 = 32', '15 \\times 32 = 480', '\\tfrac{1}{2} \\times 480 = \\good{240 \\text{ ft}^2}'] }],
      lines: [
        { say: 'Step one. Add the bases: 18 plus 14 is 32.', show: ['pic', 'pic.fill', 'pic.b1', 'pic.b2', 'pic.s1', 'pic.s2', 'm.0'], focus: ['pic.b1', 'pic.b2'] },
        { say: 'Step two. Multiply by the height: 15 times 32 is 480.', show: ['pic.h', 'pic.rt', 'm.1'], focus: 'pic.h' },
        { say: 'Step three. Take half: half of 480 is 240. Kira needs 240 square feet of pavers.', show: 'm.2', focus: ['pic.fill', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 600,
      left: [patio({ split: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['14 \\times 15 = 210', '2 \\times \\tfrac{1}{2} \\times 2 \\times 15 = 30', '210 + 30 = 240 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by cutting the patio into pieces. The middle is a rectangle, 14 feet by 15 feet, which is 210 square feet.', show: ['pic', 'pic.fill', 'pic.b1', 'pic.b2', 'pic.s1', 'pic.s2', 'pic.h', 'pic.h1', 'pic.h2', 'pic.rt', 'm.0'], focus: 'pic.fill' },
        { say: 'The bottom is 4 feet longer than the top, so there is 2 feet on each side. That leaves two triangles, each with base 2 and height 15. Each is half of 2 times 15, which is 15, so together they make 30.', show: ['pic.l', 'pic.r', 'm.1'], focus: ['pic.l', 'pic.r'] },
        { say: '210 plus 30 is 240 square feet. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['$480$ sq ft', 'forgot to take **half**'],
            ['$270$ sq ft', 'used only the **longer** base: $18 \\times 15$'],
            ['$47$ ft', 'added the lengths: area needs **multiplying**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '480 forgets to take half.' },
        { say: '270 treats the patio as an 18 by 15 rectangle. The top is only 14 feet, so that is too much.' },
        { say: 'And 47 adds the three lengths. Area is never found by adding lengths, and its units are square feet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A garden bed is a trapezoid with bases $10$ m and $6$ m, and a height of $4$ m. What is its area?',
          choices: ['$64\\text{ m}^2$', '$32\\text{ m}^2$', '$240\\text{ m}^2$', '$20\\text{ m}^2$'],
          answer: 1,
          working: '½ × 4 × (10 + 6) = ½ × 4 × 16 = 32.',
        },
      ],
      lines: [
        { say: 'Your turn. A garden bed is a trapezoid with bases 10 metres and 6 metres, and a height of 4 metres. What is its area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '10 plus 6 is 16. 4 times 16 is 64, and half of 64 is 32 square metres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$A = \\tfrac{1}{2}\\, h\\, (b + B)$', 'The height is **straight across**, not slanted', 'Do not forget the **half**', 'Area is in **square** units'] }],
      lines: [
        { say: 'Here is what to remember. The area of a trapezoid is one half, times the height, times the sum of the bases.', show: 'sum.0' },
        { say: 'The height goes straight across, at a right angle, not along a slanted side.', show: 'sum.1' },
        { say: 'Do not forget the half.', show: 'sum.2' },
        { say: 'And area is in square units. For more on the area of shapes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
