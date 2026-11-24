import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 7.2 (the Pythagorean theorem on the job). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 9.3, Use Properties of Angles,
// Triangles, and the Pythagorean Theorem, CC BY-NC-SA 4.0), with the book's figure described in
// brackets: the path runs across the square garden from corner to corner. The path is the
// hypotenuse of a right triangle with legs of 10 ft: √(10² + 10²) = √200 ≈ 14.1 ft, as in the
// book's answer. Check: 14.1² ≈ 198.8, close to 200.

/** The square garden with the path from corner to corner. */
function garden(): Part {
  const points: Record<string, [number, number]> = { A: [0, 0], B: [10, 0], C: [10, 10], D: [0, 10] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'bed', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.2, group: 'sq' },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'good', label: '10 \\text{ ft}', labelSide: 'right', group: 'sq' },
    { kind: 'line', id: 'bc', from: 'B', to: 'C', tone: 'good', label: '10 \\text{ ft}', labelSide: 'right', group: 'sq' },
    { kind: 'line', id: 'cd', from: 'C', to: 'D', tone: 'good', group: 'sq' },
    { kind: 'line', id: 'da', from: 'D', to: 'A', tone: 'good', group: 'sq' },
    { kind: 'line', id: 'path', from: 'A', to: 'C', tone: 'theta', weight: 6, label: '\\text{path?}', labelSide: 'left' },
    { kind: 'right', id: 'rt', at: 'B', from: 'A', to: 'C', group: 'tri' },
    { kind: 'region', id: 'half', points: ['A', 'B', 'C'], tone: 'opp', shade: 0.25, group: 'tri' },
  ];
  return { points, items };
}

const fig = (height = 420) => figure('gd', [garden()], height);

const QUESTION =
  'Chi is planning to put a path of paving stones through her flower garden. The flower garden is a square with sides of 10 feet. What will the length of the path be? [The figure: the path runs straight across the square garden from one corner to the opposite corner.]';

const video: Explainer = {
  id: 'xq-m103-7-2',
  lessonId: '',
  exam: {
    lesson: 'm103-7-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.3, Use Properties of Angles, Triangles, and the Pythagorean Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: A Path Across a Square Garden (Pythagorean Theorem on the Job)',
  thumbnailTitle: 'How Long Is the Garden Path?',
  thumbnail: 'gd',
  summary:
    'A real test question, solved one small step at a time: Chi’s flower garden is a square with sides of 10 feet, and a path of paving stones runs across it from corner to corner. How long is the path? The path cuts the square into two right triangles, so it is the hypotenuse: √(10² + 10²) = √200 ≈ 14.1 feet. Then we check the size of the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Garden Path?', subtitle: 'The Pythagorean theorem on the job, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about using the Pythagorean theorem on the job. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 560,
      left: [fig()],
      right: [{ kind: 'text', id: 'q', size: 'lg', md: '**The question:** Chi is planning to put a path of paving stones through her flower garden. The flower garden is a square with sides of $10$ feet. What will the length of the path be?' }],
      lines: [
        { say: 'Here is the question, from the book\'s exercises, with our drawing of its picture.', show: ['gd.sq', 'gd.path', 'q'] },
        { say: 'Chi is putting a path of paving stones through her flower garden. The garden is a square with sides of 10 feet. The path runs straight across, from one corner to the opposite corner. How long will the path be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 560,
      left: [fig()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The path cuts the square into two **right triangles**. The path is the **hypotenuse**.' }],
      lines: [
        { say: 'Here is the square garden, with the path from corner to corner.', show: ['gd.sq', 'gd.path'] },
        { say: 'The corners of a square are right angles. So the path cuts the square into two right triangles. Here is one of them.', show: 'gd.tri' },
        { say: 'The path is opposite the right angle, so it is the hypotenuse. The two legs are sides of the square, 10 feet each.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['c^2 = a^2 + b^2', 'c = \\sqrt{a^2 + b^2}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Look for the right angle', md: 'On the job, right angles hide in **corners**: of rooms, gardens, frames and walls.' },
      ],
      lines: [
        { say: 'Here is what we need. For the hypotenuse, c squared equals \"a\" squared plus \"b\" squared, so c is the square root of \"a\" squared plus \"b\" squared.', show: 'f' },
        { say: 'On the job, right angles hide in corners: the corners of rooms, gardens, frames and walls. Spot the corner, and you can use the theorem.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **equation**', '**Add** the squares', 'Take the **square root** and round'] }],
      lines: [
        { say: 'Here is the plan. Write the Pythagorean equation.', show: 'plan.0' },
        { say: 'Add the squares.', show: 'plan.1' },
        { say: 'Then take the square root, and round.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = 10^2 + 10^2'] }],
      lines: [
        { say: 'Step one. Let c be the length of the path. c squared equals 10 squared plus 10 squared.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Add the squares',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = 100 + 100 = 200'] }],
      lines: [
        { say: 'Step two. 10 squared is 100, so c squared is 100 plus 100, which is 200.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Square root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['c = \\sqrt{200} \\approx 14.142', 'c \\approx \\good{14.1 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. c is the square root of 200, which is about 14.142.', show: 'm.0' },
        { say: 'Rounded to the nearest tenth, the path will be about 14.1 feet long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['14.1^2 \\approx 198.8 \\approx 200 \\ \\checkmark', '10 < 14.1 < 20 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 14.1 squared is about 198.8, very close to 200. The small difference is from rounding.', show: 'm.0' },
        { say: 'And the size makes sense. The path is longer than one side, 10 feet, but shorter than going round two sides, 20 feet. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$10 + 10 = 20$ ft', 'that walks **round** two sides: add the **squares**'],
            ['$200$ ft', 'that is $c^2$: take the **square root**'],
            ['$10$ ft', 'the diagonal is **longer** than a side'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '10 plus 10 is 20, but that is the walk round two sides of the garden. The theorem adds the squares, not the sides.' },
        { say: '200 is c squared. Take the square root to get the length.' },
        { say: 'And the path is not 10 feet. A diagonal is always longer than a side.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A square room is $12$ ft on each side. How long is its diagonal, from corner to corner? Round to the nearest tenth.',
          choices: ['$17.0$ ft', '$24.0$ ft', '$288.0$ ft', '$12.0$ ft'],
          answer: 0,
          working: '$\\sqrt{12^2 + 12^2} = \\sqrt{288} \\approx 16.97 \\approx 17.0$ ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A square room is 12 feet on each side. How long is its diagonal, from corner to corner? Round to the nearest tenth. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '12 squared plus 12 squared is 144 plus 144, which is 288. The square root of 288 is about 16.97, which rounds to 17.0 feet. Choice A.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A diagonal makes two **right triangles**', 'The diagonal is the **hypotenuse**', '$c = \\sqrt{a^2 + b^2}$', 'Diagonal: longer than a side, shorter than two'] }],
      lines: [
        { say: 'Here is what to remember. A diagonal cuts a square or rectangle into two right triangles.', show: 'sum.0' },
        { say: 'The diagonal is the hypotenuse.', show: 'sum.1' },
        { say: 'So c is the square root of \"a\" squared plus \"b\" squared.', show: 'sum.2' },
        { say: 'And a diagonal is longer than one side but shorter than two. For more on the Pythagorean theorem on the job, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
