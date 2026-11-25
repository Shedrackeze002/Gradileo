import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileSquare } from '@/content/math8/videos/lib/m8-1-figures.ts';

// Exam question for Math 8 lesson 1.1 (perfect squares and square roots). The question is a Try It
// from OpenStax Prealgebra 2e, word for word (section 5.7, Simplify and Use Square Roots, CC
// BY-NC-SA 4.0). The area of a square is s², so s = √2704. 50² = 2500 and 60² = 3600, so s is in
// the fifties, and it must end in 2 or 8 for s² to end in 4: 52² = 2704, so s = 52 cm.

const QUESTION = 'Sergio wants to make a square mosaic as an inlay for a table he is building. He has enough tile to cover an area of 2704 square centimeters. How long can a side of his mosaic be?';

const mosaic = (id: string, side: string) => figure(id, [tileSquare({ cols: 5, tone: 'theta', labels: { left: side, bottom: side, area: '2704 \\text{ cm}^2' } })], 340);

const video: Explainer = {
  id: 'xq-m8-1-1',
  lessonId: '',
  exam: {
    lesson: 'm8-1-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.7, Simplify and Use Square Roots',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-7-simplify-and-use-square-roots',
    question: QUESTION,
  },
  title: 'Exam Question: Sergio’s Square Mosaic (Perfect Squares and Square Roots)',
  thumbnailTitle: 'Sergio’s Square Mosaic',
  thumbnail: 'ck',
  summary:
    'A real test question, solved one small step at a time: Sergio has enough tile to cover 2704 square centimetres, and wants a square mosaic. How long can a side be? The area of a square is side × side, so the side is the square root of 2704. Since 50² = 2500 and 60² = 3600, the side is in the fifties, and since 2704 ends in 4, the side ends in 2 or 8. 52² = 2704, so each side is 52 centimetres. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Sergio’s Square Mosaic', subtitle: 'Perfect squares and square roots, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about square roots. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Sergio wants to make a square mosaic as an inlay for a table he is building. He has enough tile to cover an area of $2704$ square centimeters. How long can a side of his mosaic be?',
          answer: '$52$ cm',
          working: 's² = 2704, s = √2704 = 52',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Sergio wants to make a square mosaic, as an inlay for a table he is building. He has enough tile to cover an area of 2 thousand 704 square centimetres. How long can a side of his mosaic be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 460,
      left: [mosaic('ask', 's')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Area to side', md: 'A **mosaic** is a picture made of small tiles. We know the **area** of the square, $2704$ cm², and want the length of one **side**, $s$.' }],
      lines: [
        { say: 'A mosaic is a picture made of small tiles. Here is Sergio\'s square mosaic.', show: ['ask.tiles', 'c'] },
        { say: 'We know its area, 2 thousand 704 square centimetres. We want the length of one side, "s".', show: ['ask.area', 'ask.left', 'ask.bottom'], focus: ['ask.left', 'ask.bottom'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = s \\times s = s^2', 's = \\sqrt{A}', '\\sqrt{2704} \\text{ is the number that, squared, gives } 2704'] }],
      lines: [
        { say: 'Here is what we need. The area of a square is the side times itself: "s" squared.', show: 'm.0' },
        { say: 'So to go back from the area to the side, take the square root.', show: 'm.1' },
        { say: 'The square root of 2 thousand 704 is the number that, multiplied by itself, gives 2 thousand 704.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find two **tens** it lies between', 'Use the **last digit** to narrow it down', '**Square** the guess to test it'] }],
      lines: [
        { say: 'Here is the plan. Find two tens that the square root lies between.', show: 'plan.0' },
        { say: 'Use the last digit to narrow it down.', show: 'plan.1' },
        { say: 'Then square the guess, to test it.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Find the root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['50^2 = 2500 < \\adj{2704} < 3600 = 60^2', '\\text{ends in } 4: \\ 2^2 = 4, \\ 8^2 = 64 \\to 52 \\text{ or } 58', '52^2 = 52 \\times 52 = 2704', '\\good{s = 52 \\text{ cm}}'] }],
      lines: [
        { say: 'Step one. 50 squared is 2 thousand 500, and 60 squared is 3 thousand 600. 2 thousand 704 is between them, so the side is between 50 and 60.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 2 thousand 704 ends in 4. Only numbers ending in 2 or 8 give a square ending in 4, because 2 squared is 4 and 8 squared is 64. So the side is 52 or 58.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 2 thousand 704 is much closer to 2 thousand 500 than to 3 thousand 600, so try 52. 52 times 52 is 2 thousand 704. Exactly right.', show: 'm.2', focus: 'm.2' },
        { say: 'So a side of the mosaic can be 52 centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 460,
      left: [mosaic('ck', '52 \\text{ cm}')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['52 \\times 50 = 2600', '52 \\times 2 = 104', '2600 + 104 = 2704 \\text{ cm}^2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working out 52 times 52 in two parts. 52 times 50 is 2 thousand 600.', show: ['ck.tiles', 'ck.left', 'ck.bottom', 'm.0'] },
        { say: '52 times 2 is 104.', show: 'm.1' },
        { say: 'Together, 2 thousand 704 square centimetres: the area Sergio can cover. It checks out.', show: ['m.2', 'ck.area'], focus: 'm.2' },
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
            ['$1352$ cm', 'halved the area: the square root is **not** half'],
            ['$676$ cm', 'divided by $4$: that treats $2704$ as the **perimeter**'],
            ['$58$ cm', '$58^2 = 3364$: always **square** your guess to test it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 thousand 352 is half of 2 thousand 704. But the square root is not half. 1 thousand 352 squared is far too big.' },
        { say: '676 divides by 4, as if 2 thousand 704 were the distance around the square. It is the area.' },
        { say: 'And 58 also ends in 8, but 58 squared is 3 thousand 364. Always square your guess to test it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A square garden has an area of $196$ m². How long is each side?',
          choices: ['$49$ m', '$14$ m', '$98$ m', '$16$ m'],
          answer: 1,
          working: '14 × 14 = 196, so √196 = 14 m.',
        },
      ],
      lines: [
        { say: 'Your turn. A square garden has an area of 196 square metres. How long is each side? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '10 squared is 100 and 20 squared is 400, so the side is in the teens. 14 times 14 is 196. Each side is 14 metres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Area of a square: $s^2$', 'Side from area: $s = \\sqrt{A}$', 'Narrow it down: **tens**, then the **last digit**', '**Square** the answer to check'] }],
      lines: [
        { say: 'Here is what to remember. The area of a square is its side squared.', show: 'sum.0' },
        { say: 'So the side is the square root of the area.', show: 'sum.1' },
        { say: 'Narrow the root down: first the tens, then the last digit.', show: 'sum.2' },
        { say: 'And square your answer to check it. For more on perfect squares and square roots, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
