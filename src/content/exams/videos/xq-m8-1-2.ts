import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileSquare } from '@/content/math8/videos/lib/m8-1-figures.ts';

// Exam question for Math 8 lesson 1.2 (estimating square roots). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 5.7, Simplify and Use Square Roots, CC BY-NC-SA
// 4.0). The side is √370. 19² = 361 and 20² = 400, so it is just over 19; 19.2² = 368.64 and
// 19.3² = 372.49, and 370 is closer to 368.64, so to the nearest tenth the side is 19.2 feet.

const QUESTION = 'Katie wants to plant a square lawn in her front yard. She has enough sod to cover an area of 370 square feet. To the nearest tenth of a foot, how long can a side of her square lawn be?';

const lawn = (id: string, side: string) => figure(id, [tileSquare({ cols: 4, tone: 'good', labels: { left: side, bottom: side, area: '370 \\text{ ft}^2' } })], 340);

const video: Explainer = {
  id: 'xq-m8-1-2',
  lessonId: '',
  exam: {
    lesson: 'm8-1-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 5.7, Simplify and Use Square Roots',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-7-simplify-and-use-square-roots',
    question: QUESTION,
  },
  title: 'Exam Question: Katie’s Square Lawn (Estimating Square Roots)',
  thumbnailTitle: 'Katie’s Square Lawn',
  thumbnail: 'ask',
  summary:
    'A real test question, solved one small step at a time: Katie has enough sod for 370 square feet and wants a square lawn. To the nearest tenth of a foot, how long can a side be? The side is √370, which is not a whole number. 19² = 361 and 20² = 400, so √370 is between 19 and 20, much closer to 19. Testing tenths, 19.2² = 368.64 and 19.3² = 372.49, and 370 is closer to 368.64, so the side is about 19.2 feet. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Katie’s Square Lawn', subtitle: 'Estimating square roots, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about estimating a square root. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Katie wants to plant a square lawn in her front yard. She has enough sod to cover an area of $370$ square feet. To the nearest tenth of a foot, how long can a side of her square lawn be?',
          answer: 'about $19.2$ feet',
          working: '19² = 361 < 370 < 400 = 20²; 19.2² = 368.64',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Katie wants to plant a square lawn in her front yard. She has enough sod to cover an area of 370 square feet. To the nearest tenth of a foot, how long can a side of her square lawn be?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 460,
      left: [lawn('ask', 's')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Nearest tenth', md: 'The lawn is a square with area $370$ ft², so each side is $\\sqrt{370}$. $370$ is **not** a perfect square, so the side is not a whole number. **To the nearest tenth** means one decimal place.' }],
      lines: [
        { say: 'Here is the square lawn, with an area of 370 square feet. Each side is the square root of 370.', show: ['ask.tiles', 'ask.area', 'ask.left', 'ask.bottom', 'c'] },
        { say: '370 is not a perfect square, so the side is not a whole number. To the nearest tenth means we give it to one decimal place.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['a^2 < N < b^2 \\ \\Rightarrow \\ a < \\sqrt{N} < b', '\\text{then test tenths by squaring them}'] }],
      lines: [
        { say: 'Here is what we need. If a number lies between two perfect squares, its square root lies between their roots.', show: 'm.0' },
        { say: 'Then we can test tenths, by squaring them, to see which one comes closest.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the perfect squares **either side** of $370$', 'Decide which whole number it is **closer** to', '**Square** tenths to pin it down'] }],
      lines: [
        { say: 'Here is the plan. Find the perfect squares either side of 370.', show: 'plan.0' },
        { say: 'Decide which whole number the root is closer to.', show: 'plan.1' },
        { say: 'Then square tenths, to pin it down.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Squeeze it in',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['19^2 = 361 < \\adj{370} < 400 = 20^2', '370 - 361 = 9, \\quad 400 - 370 = 30', '19.2^2 = 368.64, \\quad 19.3^2 = 372.49', '\\good{s \\approx 19.2 \\text{ ft}}'] }],
      lines: [
        { say: 'Step one. 19 squared is 361, and 20 squared is 400. 370 is between them, so the side is between 19 and 20 feet.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 370 is only 9 more than 361, but 30 less than 400. So the root is much closer to 19.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Try tenths just above 19. 19.2 squared is 368.64, a little under 370. 19.3 squared is 372.49, a little over.', show: 'm.2', focus: 'm.2' },
        { say: '370 is 1.36 above 368.64, but 2.49 below 372.49. It is closer to 19.2 squared. So, to the nearest tenth, a side can be 19.2 feet.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 460,
      left: [lawn('ck', '19.2 \\text{ ft}')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['19.2 \\times 19.2 = 368.64', '\\approx 370 \\text{ ft}^2 \\ \\checkmark', '\\text{a little under, so the sod covers it}'] }],
      lines: [
        { say: 'Let us check. A square lawn 19.2 feet on each side has an area of 19.2 times 19.2, which is 368.64 square feet.', show: ['ck.tiles', 'ck.left', 'ck.bottom', 'm.0'], focus: 'm.0' },
        { say: 'That is very close to 370, and a little under it, so Katie has enough sod. It checks out.', show: ['m.1', 'm.2', 'ck.area'], focus: 'm.1' },
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
            ['$185$ ft', 'halved the area: a square root is **not** half'],
            ['$19$ ft', 'stopped at a whole number: give it to the nearest **tenth**'],
            ['$19.3$ ft', '$19.3^2 = 372.49$ is **further** from $370$ than $19.2^2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '185 is half of 370. But a square root is not half: 185 squared is over 34 thousand.' },
        { say: '19 feet stops at a whole number. The question asks for the nearest tenth.' },
        { say: 'And 19.3 squared is 372.49, which is further from 370 than 368.64 is. So 19.2 is closer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Between which two whole numbers is $\\sqrt{50}$?',
          choices: ['$6$ and $7$', '$24$ and $26$', '$5$ and $6$', '$7$ and $8$'],
          answer: 3,
          working: '7² = 49 < 50 < 64 = 8², so √50 is between 7 and 8.',
        },
      ],
      lines: [
        { say: 'Your turn. Between which two whole numbers is the square root of 50? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '7 squared is 49, and 8 squared is 64. 50 is between them, so the square root of 50 is between 7 and 8, just above 7. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the perfect squares **either side**', 'The root lies between **their** roots', 'Closer square, closer root', '**Square** tenths to pin it down'] }],
      lines: [
        { say: 'Here is what to remember. Find the perfect squares either side of the number.', show: 'sum.0' },
        { say: 'The square root lies between their roots.', show: 'sum.1' },
        { say: 'It is nearer the root of the closer square.', show: 'sum.2' },
        { say: 'And square tenths to pin it down. For more on estimating square roots, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
