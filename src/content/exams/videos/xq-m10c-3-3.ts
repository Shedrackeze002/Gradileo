import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 3.3 (irrational numbers and approximating square roots): a
// square garden plot covered by 75 square feet of compost. The question is an exercise from
// OpenStax Prealgebra 2e, word for word (section 5.7, Simplify and Use Square Roots,
// CC BY-NC-SA 4.0), whose answer key gives 8.7 feet. 75 is not a perfect square, so √75 is
// irrational: it lies between √64 = 8 and √81 = 9, and is 8.660…, about 8.7 feet.

/** A number line from 8 to 9 with √75 marked on it, drawn to scale (one unit = 100). */
const line = (height = 200): DiagramEl => ({
  kind: 'diagram',
  id: 'nl',
  height,
  points: { a: [-20, 0], b: [120, 0], p8: [0, 0], p8t: [0, 8], p9: [100, 0], p9t: [100, 8], p5: [50, 0], p5t: [50, 5], r: [66.03, 0] },
  items: [
    { kind: 'line', id: 'axis', from: 'a', to: 'b', tone: 'ink', weight: 3 },
    { kind: 'line', id: 't8', from: 'p8', to: 'p8t', tone: 'ink', weight: 3 },
    { kind: 'line', id: 't9', from: 'p9', to: 'p9t', tone: 'ink', weight: 3 },
    { kind: 'label', id: 'l8', at: 'p8', tex: '8 = \\sqrt{64}', place: 'below' },
    { kind: 'label', id: 'l9', at: 'p9', tex: '9 = \\sqrt{81}', place: 'below' },
    { kind: 'line', id: 't5', from: 'p5', to: 'p5t', tone: 'muted', weight: 2, group: 'half' },
    { kind: 'label', id: 'l5', at: 'p5', tex: '8.5', tone: 'muted', place: 'below', group: 'half' },
    { kind: 'label', id: 'root', at: 'r', tex: '\\sqrt{75} \\approx 8.66', tone: 'good', place: 'above', dot: true },
  ],
});

/** The square garden. */
const garden = (side = 's'): DiagramEl => ({
  kind: 'diagram',
  id: 'sq',
  height: 280,
  points: { A: [0, 0], B: [8.66, 0], C: [8.66, 8.66], D: [0, 8.66], M: [4.33, 4.33] },
  items: [
    { kind: 'region', id: 'area', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.18 },
    { kind: 'line', id: 'bottom', from: 'A', to: 'B', tone: 'adj', weight: 5, label: side, labelSide: 'right' },
    { kind: 'line', id: 'right', from: 'B', to: 'C', tone: 'ink' },
    { kind: 'line', id: 'top', from: 'C', to: 'D', tone: 'ink' },
    { kind: 'line', id: 'left', from: 'D', to: 'A', tone: 'ink' },
    { kind: 'label', id: 'a', at: 'M', tex: '75\\text{ ft}^2', place: 'center' },
  ],
});
const GARDEN = ['sq', 'sq.area', 'sq.a', 'sq.bottom', 'sq.right', 'sq.top', 'sq.left'];

const QUESTION =
  'Reed wants to have a square garden plot in his backyard. He has enough compost to cover an area of 75 square feet. How long can a side of his garden be?';

const video: Explainer = {
  id: 'xq-m10c-3-3',
  lessonId: '',
  exam: {
    lesson: 'm10c-3-3',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.7, Simplify and Use Square Roots',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-7-simplify-and-use-square-roots',
    question: QUESTION,
  },
  title: 'Exam Question: How Long Is the Garden? Estimating an Irrational Square Root',
  thumbnailTitle: 'How Long Is the Garden?',
  thumbnail: 'nl',
  summary:
    'A real test question, solved one small step at a time: Reed has compost for a square garden of 75 square feet, and we find how long a side can be. 75 is not a perfect square, so √75 is irrational. We trap it between 8 and 9, estimate it on a number line, then use a calculator and round to 8.7 feet. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Long Is the Garden?', subtitle: 'Estimating an irrational square root, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a square garden, and a square root that never ends. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'about 8.7 feet', working: '$s = \\sqrt{75} \\approx 8.66$, so about $8.7$ feet.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed, from the landscaping exercises.', show: 'q' },
        { say: 'Reed wants to have a square garden plot in his backyard. He has enough compost to cover an area of 75 square feet. How long can a side of his garden be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [garden()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A square with area $75$: its side times itself is $75$, so $s = \\sqrt{75}$.' }],
      lines: [
        { say: 'Let us picture it. The garden is a square, and the compost covers 75 square feet. The side is s.', show: GARDEN },
        { say: 'The side times itself makes the area, 75. So the side is the square root of 75.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Irrational numbers', md: 'The square root of a number that is **not** a perfect square is **irrational**: its decimal goes on for ever without repeating. We **estimate** it, or round it.' },
        { kind: 'text', id: 't', size: 'md', md: 'Perfect squares: $49, 64, 81, 100, \\ldots$' },
      ],
      lines: [
        { say: 'Here is what we need. If a number is not a perfect square, its square root is irrational. Its decimal goes on for ever and never repeats, so we can only estimate it or round it.', show: 'def' },
        { say: 'The perfect squares near 75 are 49, 64, 81 and 100. 75 is not one of them, so the square root of 75 is irrational.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Trap $\\sqrt{75}$ between two **whole numbers**', 'Estimate where it sits on a **number line**', 'Use a **calculator** and round'] }],
      lines: [
        { say: 'Here is the plan. First, trap the square root of 75 between two whole numbers.', show: 'plan.0' },
        { say: 'Second, estimate where it sits between them.', show: 'plan.1' },
        { say: 'Third, use a calculator and round to the nearest tenth, as the answer in the book does.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Trap it',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['64 < 75 < 81', '\\sqrt{64} < \\sqrt{75} < \\sqrt{81}', '8 < \\sqrt{75} < 9'] }],
      lines: [
        { say: 'Step one. 75 sits between the perfect squares 64 and 81.', show: 'm.0' },
        { say: 'So its square root sits between the square root of 64 and the square root of 81.', show: 'm.1' },
        { say: 'That is between 8 and 9. The side is more than 8 feet and less than 9 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Estimate',
      layout: 'center',
      main: [line(), { kind: 'text', id: 't', size: 'md', md: '$75$ is $11$ above $64$ and only $6$ below $81$, so $\\sqrt{75}$ is **closer to 9**.' }],
      lines: [
        { say: 'Step two. On a number line, the square root of 75 is somewhere between 8 and 9.', show: ['nl', 'nl.axis', 'nl.t8', 'nl.t9', 'nl.l8', 'nl.l9', 'nl.half'] },
        { say: '75 is 11 more than 64, but only 6 less than 81. So it is closer to 81, and its square root is closer to 9 than to 8: past the halfway mark, 8.5.', show: 't' },
        { say: 'A calculator gives 8.660 and so on, a decimal that never ends. To the nearest tenth, that is 8.7.', show: 'nl.root', focus: 'nl.root' },
      ],
    },
    {
      chapter: 'Step 3: Round',
      layout: 'split',
      left: [{ kind: 'calc', id: 'calc', keys: '√(75)', result: '8.660254' }],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['s = \\sqrt{75} \\approx 8.660', '\\approx \\good{8.7\\text{ ft}}'] }],
      lines: [
        { say: 'Step three. The side is the square root of 75, which is 8.660 and so on.', show: ['calc', 'm.0'] },
        { say: 'The hundredths digit is 6, so we round the tenths up. A side of Reed\'s garden can be about 8.7 feet long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      left: [garden('8.7\\text{ ft}')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['8.7^2 = 75.69 \\approx 75 \\ \\checkmark', '8 < 8.7 < 9 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by squaring. 8.7 times 8.7 is 75.69, very close to 75. It is a tiny bit more because we rounded up, so in real life Reed should make the side just under 8.7 feet.', show: [...GARDEN, 'm.0'] },
        { say: 'And 8.7 is between 8 and 9, and closer to 9, as we estimated.', show: 'm.1' },
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
            ['Halving: $75 \\div 2$', '$37.5$ ft: much too long'],
            ['Dividing by $4$, as for a perimeter', '$18.75$ ft: that uses the perimeter, not the area'],
            ['Rounding to a whole number', '$9$ ft: a $9$ ft square needs $81$ ft$^2$ of compost'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Halving 75 gives 37.5 feet. A square that big would have an area of more than 1,400 square feet.' },
        { say: 'Dividing by 4 gives 18.75. That is what you do with a perimeter, the distance around, not an area.' },
        { say: 'And rounding to 9 feet is too much: a 9 foot square needs 81 square feet of compost, and Reed has only 75.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A square sandbox has an area of 50 square feet. How long is each side, to the nearest tenth of a foot?',
          choices: ['25.0 ft', '12.5 ft', '7.1 ft', '6.9 ft'],
          answer: 2,
          working: '$49 < 50 < 64$, so $7 < \\sqrt{50} < 8$, and $\\sqrt{50} \\approx 7.07 \\approx 7.1$ ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A square sandbox has an area of 50 square feet. How long is each side, to the nearest tenth of a foot? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '50 is just above 49, so its square root is just above 7. A calculator gives 7.07, which is 7.1 feet. That is choice C. 25 halved, 12.5 divided by 4, and 6.9 is less than 7, so it cannot be right.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Not a perfect square: the root is **irrational**', 'Trap it between the roots of the **perfect squares** on each side', 'Closer square, closer root', 'Round, and check by **squaring**'] }],
      lines: [
        { say: 'Here is what to remember. The square root of a number that is not a perfect square is irrational.', show: 'sum.0' },
        { say: 'Trap it between the square roots of the perfect squares on each side.', show: 'sum.1' },
        { say: 'It sits closer to the root of the closer perfect square.', show: 'sum.2' },
        { say: 'Then round, and check by squaring. For more on irrational numbers, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
