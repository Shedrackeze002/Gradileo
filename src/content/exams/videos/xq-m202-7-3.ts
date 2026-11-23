import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 7.3 (solving problems with quadratic equations). The question
// is an exercise from OpenStax Intermediate Algebra 2e, word for word (section 9.5, Solve
// Applications of Quadratic Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it.
// With width w, the length is 2w + 2, so w(2w + 2) = 24, w² + w − 12 = (w + 4)(w − 3) = 0, and the
// only width that makes sense is w = 3 ft, with length 8 ft. The table is drawn to scale (8 by 3).

/**
 * The table top as a rectangle: its sides (`shape`), shaded inside (`top`), the width and length
 * labels (`w` and `L`, in terms of w, or the numbers once `solved`) and the area in the middle
 * (`area`).
 */
function table(solved = false): Part {
  const points: Record<string, [number, number]> = { A: [0, 0], B: [8, 0], C: [8, 3], D: [0, 3], M: [4, 1.5], LB: [4, 0], RM: [8, 1.5] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'top', points: ['A', 'B', 'C', 'D'], tone: 'brand', shade: 0.18 },
    { kind: 'line', id: 's0', from: 'A', to: 'B', group: 'shape' },
    { kind: 'line', id: 's1', from: 'B', to: 'C', group: 'shape' },
    { kind: 'line', id: 's2', from: 'C', to: 'D', group: 'shape' },
    { kind: 'line', id: 's3', from: 'D', to: 'A', group: 'shape' },
    { kind: 'label', id: 'L', at: 'LB', tex: solved ? 'L = 8 \\text{ ft}' : 'L = 2w + 2', tone: 'adj', place: 'below' },
    { kind: 'label', id: 'w', at: 'RM', tex: solved ? 'w = 3 \\text{ ft}' : 'w', tone: 'opp', place: 'right' },
    { kind: 'label', id: 'area', at: 'M', tex: 'A = 24 \\text{ ft}^2', place: 'center' },
  ];
  return { points, items };
}

const tableFig = (solved = false, height = 360) => figure('tb', [table(solved)], height);
const ALL = ['tb.top', 'tb.shape', 'tb.L', 'tb.w', 'tb.area'];

const QUESTION =
  'Solve using any method. Round your answers to the nearest tenth, if needed. A rectangular table for the dining room has a surface area of 24 square feet. The length is two more feet than twice the width of the table. Find the length and width of the table.';

const video: Explainer = {
  id: 'xq-m202-7-3',
  lessonId: '',
  exam: {
    lesson: 'm202-7-3',
    source: 'OpenStax, Intermediate Algebra 2e, Exercise in section 9.5, Solve Applications of Quadratic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/9-5-solve-applications-of-quadratic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: The Dining Table With an Area of 24 Square Feet (Solving Problems with Quadratic Equations)',
  thumbnailTitle: 'The Dining Table Problem',
  thumbnail: 'tb',
  summary:
    'A real test question, solved one small step at a time: a dining table has an area of 24 square feet, and its length is two feet more than twice its width. We call the width w, write the length as 2w + 2, and turn the area into the quadratic equation w(2w + 2) = 24. It factors, giving w = 3 or w = −4, and only the positive width makes sense: the table is 3 ft wide and 8 ft long. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Dining Table Problem', subtitle: 'Solving problems with quadratic equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that turns a word problem into a quadratic equation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve using any method. Round your answers to the nearest tenth, if needed. A rectangular table for the dining room has a surface area of $24$ square feet. The length is two more feet than twice the width of the table. Find the length and width of the table.',
          answer: 'width $3$ ft, length $8$ ft',
          working: '$w(2w + 2) = 24$, so $w^2 + w - 12 = (w + 4)(w - 3) = 0$, and the width must be positive: $w = 3$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve using any method, and round to the nearest tenth if needed. A rectangular table for the dining room has a surface area of 24 square feet. The length is two more feet than twice the width of the table. Find the length and width of the table.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [tableFig(), { kind: 'text', id: 't', size: 'md', md: 'Two unknowns, the **length** and the **width**, but the length is written **using** the width. So one letter, $w$, is enough.' }],
      lines: [
        { say: 'Here is the table top, a rectangle with an area of 24 square feet.', show: ['tb.top', 'tb.shape', 'tb.area'] },
        { say: 'We need both the length and the width. The width is unknown, so call it w. The length is twice the width, plus 2, so it is 2 w plus 2.', show: ['tb.w', 'tb.L'] },
        { say: 'That means one letter is enough for both sides.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'area', tone: 'key', title: 'Area of a rectangle', md: 'Area $=$ length $\\times$ width, $\\; A = Lw$.' },
        { kind: 'callout', id: 'pos', tone: 'tip', title: 'Does the answer make sense?', md: 'A length or a width must be **positive**. Throw away a negative solution.' },
      ],
      lines: [
        { say: 'Here is what we need. The area of a rectangle is its length times its width.', show: 'area' },
        { say: 'And a quadratic can give two answers, but a length or a width must be positive. So we throw away any negative answer.', show: 'pos' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **area equation**', 'Get **$0$** on one side', '**Factor** and solve', 'Keep the answer that **makes sense**'] }],
      lines: [
        { say: 'Here is the plan. First, write an equation for the area.', show: 'plan.0' },
        { say: 'Second, move everything to one side, so the other side is 0.', show: 'plan.1' },
        { say: 'Third, factor and solve.', show: 'plan.2' },
        { say: 'Fourth, keep only the answer that makes sense for a table.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The area equation',
      layout: 'center',
      main: [tableFig(false, 320), { kind: 'math', id: 'm', size: 'md', lines: ['L \\times w = 24', '(2w + 2) \\times w = 24'] }],
      lines: [
        { say: 'Step one. Length times width is the area, 24.', show: [...ALL, 'm.0'] },
        { say: 'The length is 2 w plus 2, so 2 w plus 2, times w, equals 24.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Make one side zero',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2w^2 + 2w = 24', '2w^2 + 2w - 24 = 0', 'w^2 + w - 12 = 0'] }],
      lines: [
        { say: 'Step two. Multiply out the brackets: 2 w times w is 2 w squared, and 2 times w is 2 w.', show: 'm.0' },
        { say: 'Subtract 24 from both sides, so the right side is 0.', show: 'm.1' },
        { say: 'Every term is even, so divide by 2 to make the numbers smaller: w squared plus w minus 12 equals 0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Factor and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times (-3) = -12, \\quad 4 + (-3) = 1', '(w + 4)(w - 3) = 0', 'w = -4 \\quad \\text{or} \\quad w = 3'] }],
      lines: [
        { say: 'Step three. Find two numbers that multiply to negative 12 and add to 1. 4 and negative 3 work.', show: 'm.0' },
        { say: 'So the equation factors as w plus 4, times w minus 3, equals 0.', show: 'm.1' },
        { say: 'So w is negative 4 or w is 3. The answers are whole numbers, so there is nothing to round.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 4: Keep the answer that makes sense',
      layout: 'center',
      main: [tableFig(true, 320), { kind: 'math', id: 'm', size: 'md', lines: ['w = \\bad{-4} \\ \\text{(a width cannot be negative)}', 'w = \\good{3 \\text{ ft}}, \\quad L = 2(3) + 2 = \\good{8 \\text{ ft}}'] }],
      lines: [
        { say: 'Step four. A table cannot be negative 4 feet wide, so we throw that answer away.', show: 'm.0' },
        { say: 'So the width is 3 feet. The length is 2 times 3, plus 2, which is 8 feet.', show: [...ALL, 'm.1'], focus: 'm.1' },
        { say: 'The table is 8 feet long and 3 feet wide.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{area: } 8 \\times 3 = 24 \\ \\checkmark', '\\text{length: } 2(3) + 2 = 8 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with the words of the question. The area is 8 times 3, which is 24 square feet.', show: 'm.0' },
        { say: 'And twice the width is 6, and two more is 8, which is the length. Both facts check out.', show: 'm.1', focus: 'm.1' },
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
            ['$w = -4$', 'a width cannot be **negative**'],
            ['$2w + 2 = 24$', '$24$ is the **area**, not the length'],
            ['only $w = 3$', 'the question asks for the length **and** the width'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Negative 4 solves the equation, but a table cannot have a negative width. Throw it away.' },
        { say: 'Do not set the length equal to 24. The 24 is the area, so it is the length times the width.' },
        { say: 'And give both answers. The question asks for the length and the width.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rectangle has an area of $15$ square metres. Its length is $2$ metres more than its width. What is its width?',
          choices: ['$5$ m', '$-5$ m', '$15$ m', '$3$ m'],
          answer: 3,
          working: '$w(w + 2) = 15$, so $w^2 + 2w - 15 = (w + 5)(w - 3) = 0$, and the width must be positive: $w = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle has an area of 15 square metres. Its length is 2 metres more than its width. What is its width? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The length is w plus 2, so w times w plus 2 equals 15. That gives w squared plus 2 w minus 15 equals 0, which factors as w plus 5, times w minus 3. A width cannot be negative 5, so the width is 3 metres: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use **one letter**, and write the other side with it', 'Turn the facts into an **equation**', 'Solve the **quadratic**', 'Keep only the answers that **make sense**'] }],
      lines: [
        { say: 'Here is what to remember. Use one letter for the unknown, and write the other side using it.', show: 'sum.0' },
        { say: 'Turn the facts in the question into an equation.', show: 'sum.1' },
        { say: 'Solve the quadratic, by factoring or with the formula.', show: 'sum.2' },
        { say: 'And keep only the answers that make sense. For more on solving problems with quadratic equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
