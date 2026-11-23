import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 3.2 (perfect squares and square roots by prime factors): a
// square mosaic that covers 2704 square centimetres. The question is an exercise from OpenStax
// Elementary Algebra 2e, word for word (section 9.6, Solve Equations with Square Roots,
// CC BY-NC-SA 4.0), whose answer key gives 52.0 cm. In the book the formula is s = √A; the plain
// text writes the root sign. 2704 = 2⁴ × 13², so √2704 = 2² × 13 = 52.

/** The square mosaic, with its area inside and a side to find. */
const mosaic = (side = 's', height = 360): DiagramEl => ({
  kind: 'diagram',
  id: 'sq',
  height,
  points: { A: [0, 0], B: [52, 0], C: [52, 52], D: [0, 52], M: [26, 26] },
  items: [
    { kind: 'region', id: 'area', points: ['A', 'B', 'C', 'D'], tone: 'brand', shade: 0.18 },
    { kind: 'line', id: 'bottom', from: 'A', to: 'B', tone: 'adj', weight: 5, label: side, labelSide: 'right' },
    { kind: 'line', id: 'right', from: 'B', to: 'C', tone: 'ink' },
    { kind: 'line', id: 'top', from: 'C', to: 'D', tone: 'ink' },
    { kind: 'line', id: 'left', from: 'D', to: 'A', tone: 'adj', weight: 5, label: side, labelSide: 'right' },
    { kind: 'label', id: 'a', at: 'M', tex: '2704\\text{ cm}^2', place: 'center' },
  ],
});

const QUESTION =
  'Sergio wants to make a square mosaic as an inlay for a table he is building. He has enough tile to cover an area of 2704 square centimeters. Use the formula s = √A to find the length of each side of his mosaic. Round your answer to the nearest tenth of a centimeter.';

const video: Explainer = {
  id: 'xq-m10c-3-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-3-2',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 9.6, Solve Equations with Square Roots',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/9-6-solve-equations-with-square-roots',
    question: QUESTION,
  },
  title: 'Exam Question: A Square Mosaic of 2704 cm². Square Roots by Prime Factors',
  thumbnailTitle: 'A Square Mosaic',
  thumbnail: 'sq',
  summary:
    'A real test question, solved one small step at a time: a square mosaic covers 2704 square centimetres, and we find the length of each side. We write 2704 as a product of primes, pair the factors to take the square root, and check by squaring. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Square Mosaic', subtitle: 'Square roots by prime factors, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the side of a square, with a square root. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '52.0 cm', working: '$2704 = 2^4 \\times 13^2$, so $s = \\sqrt{2704} = 2^2 \\times 13 = 52.0$ cm.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Sergio wants to make a square mosaic as an inlay for a table he is building. He has enough tile to cover an area of 2,704 square centimetres. Use the formula s equals the square root of A to find the length of each side of his mosaic. Round your answer to the nearest tenth of a centimetre.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [mosaic()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The area of a square is $s \\times s = s^2$. We know the **area** and want the **side**: $s = \\sqrt{A}$.' }],
      lines: [
        { say: 'Let us picture it. The mosaic is a square, and its area is 2,704 square centimetres. Each side has the same length, s.', show: ['sq', 'sq.area', 'sq.a', 'sq.bottom', 'sq.right', 'sq.top', 'sq.left'] },
        { say: 'The area of a square is the side times itself, s squared. So to go back from the area to the side, we take the square root.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Square root by prime factors', md: 'Write the number as a product of primes. If every prime comes in **pairs**, it is a **perfect square**: take **one** of each pair.' },
        { kind: 'math', id: 'ex', size: 'md', lines: ['36 = 2 \\times 2 \\times 3 \\times 3 = (2 \\times 3)^2, \\quad \\sqrt{36} = 2 \\times 3 = 6'] },
      ],
      lines: [
        { say: 'Here is what we need. To find a square root without guessing, write the number as a product of primes. If every prime comes in pairs, the number is a perfect square, and its square root takes one prime from each pair.', show: 'def' },
        { say: 'For example, 36 is 2 times 2 times 3 times 3. Take one 2 and one 3, and the square root of 36 is 6.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $2704$ as a product of **primes**', 'Take **one** prime from each **pair**', 'Check by **squaring**'] }],
      lines: [
        { say: 'Here is the plan. First, write 2,704 as a product of primes.', show: 'plan.0' },
        { say: 'Second, take one prime from each pair to find the square root.', show: 'plan.1' },
        { say: 'Third, check by squaring.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Prime factors',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2704 \\div 2 = 1352', '1352 \\div 2 = 676', '676 \\div 2 = 338', '338 \\div 2 = 169 = 13 \\times 13', '2704 = 2 \\times 2 \\times 2 \\times 2 \\times 13 \\times 13'] }],
      lines: [
        { say: 'Step one. 2,704 is even, so divide by 2: 1,352.', show: 'm.0' },
        { say: '1,352 is even too: divide by 2 again, 676.', show: 'm.1' },
        { say: 'Again: 676 divided by 2 is 338.', show: 'm.2' },
        { say: 'And 338 divided by 2 is 169. 169 is odd, and it is 13 times 13, and 13 is prime.', show: 'm.3' },
        { say: 'So 2,704 is 2 times 2 times 2 times 2 times 13 times 13.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Step 2: Take one from each pair',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2704 = (2 \\times 2) \\times (2 \\times 2) \\times (13 \\times 13)', '\\sqrt{2704} = 2 \\times 2 \\times 13 = \\good{52}'] }],
      lines: [
        { say: 'Step two. Group the primes in pairs: two 2s, two more 2s, and two 13s. Every prime has a partner, so 2,704 is a perfect square.', show: 'm.0' },
        { say: 'Take one from each pair: 2 times 2 times 13, which is 52. So each side of the mosaic is 52 centimetres, or 52.0 to the nearest tenth.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [mosaic('52\\text{ cm}')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['52^2 = 52 \\times 52 = 2704 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by squaring. 52 times 52 is 2,704 square centimetres, which is exactly the area of tile Sergio has. It works.', show: ['sq', 'sq.area', 'sq.a', 'sq.bottom', 'sq.right', 'sq.top', 'sq.left', 'm.0'] },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'Answer it gives'],
          rows: [
            ['Halving: $2704 \\div 2$', '$1352$ cm: "square root" is not "half"'],
            ['Dividing by $4$, as for a perimeter', '$676$ cm: that uses the perimeter, not the area'],
            ['Taking **both** primes of a pair', '$2 \\times 2 \\times 2 \\times 2 \\times 13 = 208$ cm'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Halving 2,704 gives 1,352. But a square root is not a half: it is the number that times itself gives 2,704.' },
        { say: 'Dividing by 4 gives 676. That would be the side if 2,704 were the perimeter, the distance around. Here it is the area.' },
        { say: 'And when you take the root, take only one prime from each pair. Keeping too many gives 208, which is much too big.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A square tabletop has an area of 1764 cm². How long is each side?',
          choices: ['441 cm', '42 cm', '882 cm', '21 cm'],
          answer: 1,
          working: '$1764 = 2^2 \\times 3^2 \\times 7^2$, so $\\sqrt{1764} = 2 \\times 3 \\times 7 = 42$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A square tabletop has an area of 1,764 square centimetres. How long is each side? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '1,764 is 2 times 2, times 3 times 3, times 7 times 7. One from each pair is 2 times 3 times 7, which is 42 centimetres. That is choice B. 441 divided by 4, 882 halved, and 21 took one 2 too few.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Side of a square: $s = \\sqrt{A}$', 'Write the number as a product of **primes**', 'All primes in **pairs**: a **perfect square**', 'Take **one** from each pair; check by squaring'] }],
      lines: [
        { say: 'Here is what to remember. The side of a square is the square root of its area.', show: 'sum.0' },
        { say: 'To find a square root, write the number as a product of primes.', show: 'sum.1' },
        { say: 'If every prime comes in pairs, the number is a perfect square.', show: 'sum.2' },
        { say: 'Take one prime from each pair, and check by squaring. For more on perfect squares and square roots, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
