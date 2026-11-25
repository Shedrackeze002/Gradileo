import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc, unroll } from '@/content/math7/videos/lib/m7-7-figures.ts';

// Exam question for Math 7 lesson 7.1 (radius, diameter and circumference). The question is a Try
// It from OpenStax Prealgebra 2e, word for word (section 9.5, Solve Geometry Applications: Circles
// and Irregular Figures, CC BY-NC-SA 4.0). C = πd ≈ 3.14 × 12 = 37.68 feet, as in the book, which
// uses 3.14 for π.

const QUESTION = 'If the diameter of a circular trampoline is 12 feet, what is its circumference?';

const top = (id: string) => figure(id, [disc({ r: 2, tone: 'adj', labels: { d: 'd = 12 \\text{ ft}' } })], 340);

const string = (id: string) =>
  figure(id, [unroll({ d: 2, labels: { d: '12', c: 'C \\approx 37.68 \\text{ ft}', pieces: '12', extra: '1.68' } })], 420);

const video: Explainer = {
  id: 'xq-m7-7-1',
  lessonId: '',
  exam: {
    lesson: 'm7-7-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.5, Solve Geometry Applications: Circles and Irregular Figures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures',
    question: QUESTION,
  },
  title: 'Exam Question: Around a Trampoline (Radius, Diameter and Circumference)',
  thumbnailTitle: 'Around a Trampoline',
  thumbnail: 'ur',
  summary:
    'A real test question, solved one small step at a time: a circular trampoline has a diameter of 12 feet. What is its circumference? The circumference is the distance around the circle, C = πd. With 3.14 for π, as the book uses, C ≈ 3.14 × 12 = 37.68 feet. Then we check that the distance around is a little more than 3 diameters, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Around a Trampoline', subtitle: 'Radius, diameter and circumference, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the circumference of a circle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'If the diameter of a circular trampoline is $12$ feet, what is its circumference?',
          answer: 'about $37.68$ feet',
          working: 'C = πd ≈ 3.14 × 12 = 37.68',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'If the diameter of a circular trampoline is 12 feet, what is its circumference?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 420,
      left: [top('tp')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Diameter and circumference', md: 'The **diameter** goes straight **across** the circle, through the centre: $12$ feet here. The **circumference** is the distance **all the way around** the edge.' }],
      lines: [
        { say: 'Here is the trampoline from above. The diameter goes straight across it, through the centre. Here it is 12 feet.', show: ['tp.shape', 'tp.centre', 'tp.d', 'c'] },
        { say: 'The circumference is the distance all the way around the edge. That is what we must find.', focus: 'tp.shape' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C = \\pi d', '\\pi \\approx 3.14'] }],
      lines: [
        { say: 'Here is what we need. The circumference of any circle is pi times its diameter.', show: 'm.0' },
        { say: 'Pi is a number a little more than 3. The book uses 3.14 for it, so we will too.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $C = \\pi d$', 'Put in $d = 12$ and $\\pi \\approx 3.14$', 'Multiply, and give the **unit**'] }],
      lines: [
        { say: 'Here is the plan. Write the formula: "C" equals pi "d".', show: 'plan.0' },
        { say: 'Put in 12 for "d", and 3.14 for pi.', show: 'plan.1' },
        { say: 'Then multiply, and give the unit.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Use C = πd',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C = \\pi d', 'C \\approx 3.14 \\times \\adj{12}', '= \\good{37.68 \\text{ feet}}'] }],
      lines: [
        { say: 'Step one. The circumference is pi times the diameter.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. The diameter is 12 feet, and pi is about 3.14. So "C" is about 3.14 times 12.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. 3 times 12 is 36, and 0.14 times 12 is 1.68. Together that is 37.68. The circumference is about 37.68 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [string('ur')],
      lines: [
        { say: 'Let us check. Imagine a string wrapped once around the trampoline, then laid out flat.', show: ['ur.circle', 'ur.dia', 'ur.string'] },
        { say: 'The diameter, 12 feet, fits along the string 3 times. That is 36 feet.', show: ['ur.d0', 'ur.d1', 'ur.d2'] },
        { say: 'And there is a little bit more, 1.68 feet. 36 plus 1.68 is 37.68. It checks out.', show: 'ur.extra', focus: 'ur.extra' },
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
            ['$75.36$ ft', 'used $2\\pi d$: $12$ is the **diameter**, not the radius'],
            ['$18.84$ ft', 'halved it: $C = \\pi d$ uses the **whole** diameter'],
            ['$113.04$ ft²', 'found the **area**, $\\pi r^2$: around is $\\pi d$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '75.36 feet uses 2 pi times 12, as if 12 were the radius. 12 feet is the diameter, all the way across.' },
        { say: '18.84 feet uses only half of the diameter. Circumference is pi times the whole diameter.' },
        { say: 'And 113.04 square feet is the area of the trampoline, the space it covers. The question asks for the distance around.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A round table has a **radius** of $5$ feet. Using $3.14$ for $\\pi$, what is its circumference?',
          choices: ['$15.7$ ft', '$78.5$ ft', '$10$ ft', '$31.4$ ft'],
          answer: 3,
          working: 'd = 2 × 5 = 10, so C ≈ 3.14 × 10 = 31.4 ft.',
        },
      ],
      lines: [
        { say: 'Your turn. A round table has a radius of 5 feet. Using 3.14 for pi, what is its circumference? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The diameter is twice the radius: 10 feet. So "C" is about 3.14 times 10, which is 31.4 feet. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Diameter**: across, through the centre', '**Circumference**: all the way around', '$C = \\pi d$, with $\\pi \\approx 3.14$', 'About **3 diameters** and a bit'] }],
      lines: [
        { say: 'Here is what to remember. The diameter goes across, through the centre.', show: 'sum.0' },
        { say: 'The circumference goes all the way around.', show: 'sum.1' },
        { say: '"C" equals pi "d", with pi about 3.14.', show: 'sum.2' },
        { say: 'And the circumference is always about 3 diameters and a bit. For more on radius, diameter and circumference, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
