import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 7.1 (the Pythagorean theorem). The question is an exercise
// from OpenStax Prealgebra 2e, word for word (section 9.3, Use Properties of Angles, Triangles, and
// the Pythagorean Theorem, Everyday Math, CC BY-NC-SA 4.0), with the book's picture redrawn from
// the words. The book prints no answer for it. With the right angle at X, YZ is the hypotenuse:
// XY² + 800² = 1,000², so XY² = 360,000 and XY = 600 ft. Check: 600² + 800² = 1,000,000 = 1,000².

/** The lake, with the bridge XY across it and the right triangle XYZ on the shore. */
function lake(): Part {
  const points: Record<string, [number, number]> = { X: [0, 0], Y: [0, 6], Z: [8, 0] };
  const ring: string[] = [];
  for (let i = 0; i < 40; i++) {
    const a = (2 * Math.PI * i) / 40;
    points[`k${i}`] = [1.3 * Math.cos(a), 3 + 3.1 * Math.sin(a)];
    ring.push(`k${i}`);
  }
  points.L = [-0.65, 1.4];
  const items: DiagramItem[] = [
    { kind: 'region', id: 'water', points: ring, tone: 'adj', shade: 0.25, group: 'lake' },
    { kind: 'label', id: 'lake-label', at: 'L', tex: '\\text{lake}', place: 'center', tone: 'adj', group: 'lake' },
    { kind: 'line', id: 'xz', from: 'X', to: 'Z', label: '800 \\text{ ft}', labelSide: 'right', group: 'tri' },
    { kind: 'line', id: 'yz', from: 'Z', to: 'Y', label: '1{,}000 \\text{ ft}', labelSide: 'right', group: 'tri' },
    { kind: 'right', id: 'rt', at: 'X', from: 'Y', to: 'Z', group: 'tri' },
    { kind: 'label', id: 'nx', at: 'X', tex: 'X', place: 'below left', dot: true, group: 'tri' },
    { kind: 'label', id: 'ny', at: 'Y', tex: 'Y', place: 'above', dot: true, group: 'tri' },
    { kind: 'label', id: 'nz', at: 'Z', tex: 'Z', place: 'below right', dot: true, group: 'tri' },
    { kind: 'line', id: 'bridge', from: 'X', to: 'Y', tone: 'theta', weight: 5, label: '\\text{bridge?}', labelSide: 'right' },
  ];
  return { points, items };
}

const fig = (height = 440) => figure('lk', [lake()], height);

const QUESTION =
  'Measurement A city engineer plans to build a footbridge across a lake from point X to point Y, as shown in the picture below. To find the length of the footbridge, she draws a right triangle XYZ, with right angle at X. She measures the distance from X to Z, 800 feet, and from Y to Z, 1,000 feet. How long will the bridge be?';

const video: Explainer = {
  id: 'xq-m103-7-1',
  lessonId: '',
  exam: {
    lesson: 'm103-7-1',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.3, Use Properties of Angles, Triangles, and the Pythagorean Theorem',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Is the Footbridge? (The Pythagorean Theorem)',
  thumbnailTitle: 'How Long Is the Footbridge?',
  thumbnail: 'lk',
  summary:
    'A real test question, solved one small step at a time: an engineer plans a footbridge across a lake from X to Y. She draws a right triangle XYZ with the right angle at X, and measures XZ = 800 feet and YZ = 1,000 feet. How long will the bridge be? YZ is opposite the right angle, so it is the hypotenuse: XY² + 800² = 1,000², so XY² = 360,000 and XY = 600 feet. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Footbridge?', subtitle: 'The Pythagorean theorem, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the Pythagorean theorem. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Measurement A city engineer plans to build a footbridge across a lake from point $X$ to point $Y$, as shown in the picture below. To find the length of the footbridge, she draws a right triangle $XYZ$, with right angle at $X$. She measures the distance from $X$ to $Z$, $800$ feet, and from $Y$ to $Z$, $1{,}000$ feet. How long will the bridge be?',
          answer: '$600$ feet',
          working: '$XY^2 + 800^2 = 1{,}000^2$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises. In a moment, we will see our own drawing of the book\'s picture.', show: 'q' },
        { say: 'An engineer plans a footbridge across a lake, from point X to point Y. She draws a right triangle X Y Z, with the right angle at X. X to Z is 800 feet, and Y to Z is 1,000 feet. How long will the bridge be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [fig()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'She cannot measure across the water, so she measures **on land** and uses the **right triangle**.' }],
      lines: [
        { say: 'Here is the lake. The bridge will go across it, from X to Y.', show: ['lk.lake', 'lk.bridge'] },
        { say: 'She cannot measure across the water. So she makes a right triangle with a corner Z on land, and measures X Z, 800 feet, and Y Z, 1,000 feet.', show: 'lk.tri' },
        { say: 'Two sides of a right triangle are known, so we can find the third. That is the Pythagorean theorem.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['a^2 + b^2 = c^2'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Find the hypotenuse first', md: 'The **hypotenuse** $c$ is the longest side, **opposite** the right angle. Here the right angle is at $X$, so the hypotenuse is $YZ$.' },
      ],
      lines: [
        { say: 'Here is what we need. In a right triangle, \"a\" squared plus \"b\" squared equals c squared, where c is the hypotenuse.', show: 'f' },
        { say: 'The hypotenuse is the longest side, opposite the right angle. The right angle is at X, so the hypotenuse is Y Z, the 1,000-foot side. The bridge is one of the shorter sides.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **equation** with $c = 1{,}000$', 'Find $XY^2$', 'Take the **square root**'] }],
      lines: [
        { say: 'Here is the plan. Write the Pythagorean equation, with 1,000 as the hypotenuse.', show: 'plan.0' },
        { say: 'Find X Y squared.', show: 'plan.1' },
        { say: 'Then take the square root.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['XY^2 + XZ^2 = YZ^2', 'XY^2 + 800^2 = 1{,}000^2'] }],
      lines: [
        { say: 'Step one. The two shorter sides are X Y and X Z, and the hypotenuse is Y Z. So X Y squared plus X Z squared equals Y Z squared.', show: 'm.0' },
        { say: 'Put in the lengths: X Y squared plus 800 squared equals 1,000 squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Find XY squared',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['XY^2 + 640{,}000 = 1{,}000{,}000', 'XY^2 = 360{,}000'] }],
      lines: [
        { say: 'Step two. 800 squared is 640,000, and 1,000 squared is 1,000,000.', show: 'm.0' },
        { say: 'Take 640,000 from both sides: X Y squared is 360,000.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Square root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['XY = \\sqrt{360{,}000} = \\good{600 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. Take the square root. The square root of 360,000 is 600, because 600 times 600 is 360,000. The bridge will be 600 feet long.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['600^2 + 800^2 = 360{,}000 + 640{,}000 = 1{,}000{,}000 \\ \\checkmark', '600 < 1{,}000: \\text{ shorter than the hypotenuse} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 600 squared plus 800 squared is 360,000 plus 640,000, which is 1,000,000, and that is 1,000 squared.', show: 'm.0' },
        { say: 'And 600 is shorter than the hypotenuse, as a leg must be. It checks out. You may notice 600, 800, 1,000 is just 3, 4, 5 made 200 times bigger.', show: 'm.1', focus: 'm.1' },
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
            ['$\\sqrt{800^2 + 1{,}000^2} \\approx 1{,}281$', '$1{,}000$ is the **hypotenuse**: subtract, do not add'],
            ['$1{,}000 - 800 = 200$', 'subtract the **squares**, not the lengths'],
            ['$360{,}000$ ft', 'that is $XY^2$: take the **square root**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding the squares treats the bridge as the hypotenuse. But the 1,000-foot side is opposite the right angle, so subtract.' },
        { say: 'Subtract the squares, not the lengths. 1,000 minus 800 is 200, which is far too short.' },
        { say: 'And 360,000 is X Y squared. Take the square root to get the length.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A $13$ ft ladder leans against a wall. Its foot is $5$ ft from the wall. How high up the wall does it reach?',
          choices: ['$8$ ft', '$18$ ft', '$13.9$ ft', '$12$ ft'],
          answer: 3,
          working: '$h^2 + 5^2 = 13^2$, so $h^2 = 144$ and $h = 12$ ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A 13-foot ladder leans against a wall. Its foot is 5 feet from the wall. How high up the wall does it reach? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The ladder is the hypotenuse. h squared plus 25 equals 169, so h squared is 144, and h is 12 feet. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a^2 + b^2 = c^2$ in a **right** triangle', 'The hypotenuse is **opposite** the right angle', 'Finding a shorter side: **subtract** the squares', 'Take the **square root** at the end'] }],
      lines: [
        { say: 'Here is what to remember. In a right triangle, \"a\" squared plus \"b\" squared equals c squared.', show: 'sum.0' },
        { say: 'The hypotenuse is the side opposite the right angle.', show: 'sum.1' },
        { say: 'To find a shorter side, subtract the squares.', show: 'sum.2' },
        { say: 'And take the square root at the end. For more on the Pythagorean theorem, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
