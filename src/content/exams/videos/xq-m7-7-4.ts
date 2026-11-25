import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc, rearranged } from '@/content/math7/videos/lib/m7-7-figures.ts';

// Exam question for Math 7 lesson 7.4 (area of a circle). The question is an exercise from OpenStax
// Prealgebra 2e, word for word (section 9.5, Solve Geometry Applications: Circles and Irregular
// Figures, CC BY-NC-SA 4.0). With 3.14 for π, as the book uses: C = 2πr ≈ 2 × 3.14 × 8 = 50.24 in
// and A = πr² ≈ 3.14 × 64 = 200.96 in².

const QUESTION = 'An extra-large pizza is a circle with radius 8 inches. Find the (a) circumference and (b) area of the pizza.';

const pizza = (id: string) => figure(id, [disc({ r: 3.5, tone: 'theta', shade: 0.25, labels: { r: '8 \\text{ in}' }, rAt: 0 })], 340);

const COUNT = 16;
const row = (id: string) => figure(id, [rearranged({ r: 1.6, count: COUNT, labels: { h: '8', base: '\\pi r \\approx 25.12' } })], 300);
const pieces = (id: string) => Array.from({ length: COUNT }, (_, i) => `${id}.p${i}`);

const video: Explainer = {
  id: 'xq-m7-7-4',
  lessonId: '',
  exam: {
    lesson: 'm7-7-4',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.5, Solve Geometry Applications: Circles and Irregular Figures',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-5-solve-geometry-applications-circles-and-irregular-figures',
    question: QUESTION,
  },
  title: 'Exam Question: Around and Across an Extra-Large Pizza (Area of a Circle)',
  thumbnailTitle: 'An Extra-Large Pizza',
  thumbnail: 'pz',
  summary:
    'A real test question, solved one small step at a time: an extra-large pizza is a circle with a radius of 8 inches. Find (a) its circumference and (b) its area. With 3.14 for π, as the book uses, C = 2πr ≈ 2 × 3.14 × 8 = 50.24 inches, and A = πr² ≈ 3.14 × 64 = 200.96 square inches. Then we check by cutting the pizza into slices and laying them side by side, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'An Extra-Large Pizza', subtitle: 'Area of a circle, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the circumference and the area of a circle. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'An extra-large pizza is a circle with radius $8$ inches. Find the (a) circumference and (b) area of the pizza.',
          answer: '(a) about $50.24$ in (b) about $200.96$ in²',
          working: 'C = 2πr ≈ 50.24; A = πr² ≈ 200.96',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'An extra large pizza is a circle with radius 8 inches. Find part a, the circumference, and part b, the area of the pizza.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 420,
      left: [pizza('pz')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Around and inside', md: 'The **radius** goes from the centre to the edge: $8$ inches. The **circumference** is the distance **around** the crust. The **area** is the space **inside**, the amount of pizza, in **square** inches.' }],
      lines: [
        { say: 'Here is the pizza. The radius goes from the centre to the edge: 8 inches.', show: ['pz.shape', 'pz.centre', 'pz.r', 'c'] },
        { say: 'The circumference is the distance around the crust. The area is the space inside, the amount of pizza, measured in square inches.', focus: 'pz.shape' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['C = 2\\pi r', 'A = \\pi r^2', '\\pi \\approx 3.14'] }],
      lines: [
        { say: 'Here is what we need. The circumference is 2 pi "r": the diameter is 2 radii, and pi times the diameter goes around.', show: 'm.0' },
        { say: 'The area is pi "r" squared: pi times the radius times the radius.', show: 'm.1' },
        { say: 'The book uses 3.14 for pi, so we will too.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Put $r = 8$ into $C = 2\\pi r$', '(b) Square the radius, then multiply by $\\pi$', 'Give each answer its **unit**'] }],
      lines: [
        { say: 'Here is the plan. For part a, put 8 into "C" equals 2 pi "r".', show: 'plan.0' },
        { say: 'For part b, square the radius, then multiply by pi.', show: 'plan.1' },
        { say: 'Then give each answer its unit.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Around, then inside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{(a) } C \\approx 2 \\times 3.14 \\times 8 = 6.28 \\times 8', '= \\good{50.24 \\text{ in}}', '\\text{(b) } A \\approx 3.14 \\times 8^2 = 3.14 \\times 64', '= \\good{200.96 \\text{ in}^2}'] }],
      lines: [
        { say: 'Step one. The circumference is about 2 times 3.14 times 8. 2 times 3.14 is 6.28.', show: 'm.0', focus: 'm.0' },
        { say: '6.28 times 8 is 50.24. The crust is about 50.24 inches around.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. The area is about 3.14 times 8 squared. 8 squared is 8 times 8, which is 64.', show: 'm.2', focus: 'm.2' },
        { say: '3.14 times 64 is 200.96. So the pizza covers about 200.96 square inches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [row('rw'), { kind: 'math', id: 'm', size: 'md', lines: ['25.12 \\times 8 = 200.96 \\text{ in}^2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the area. Cut the pizza into 16 thin slices, and lay them side by side, crusts up and down in turn.', show: pieces('rw') },
        { say: 'They make a shape close to a parallelogram. Its height is the radius, 8 inches. Its base is half the crust, half of 50.24, which is 25.12.', show: ['rw.h', 'rw.base'] },
        { say: 'Base times height: 25.12 times 8 is 200.96 square inches, the same as our answer. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$50.24$ in²', 'used $2\\pi r$ for the area: area is $\\pi r^{2}$'],
            ['$25.12$ in', 'used $\\pi r$: around is $2\\pi r$, or $\\pi d$'],
            ['$803.84$ in²', 'squared the **diameter**: square the **radius**, $8$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '50.24 is the circumference, not the area. Area uses the radius squared: pi "r" squared.' },
        { say: '25.12 inches is only half the way around. The circumference is 2 pi "r", or pi times the diameter.' },
        { say: 'And 803.84 squares 16, the diameter. The formula squares the radius, 8.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A round rug has a radius of $3$ m. Using $3.14$ for $\\pi$, what is its area?',
          choices: ['$18.84$ m²', '$9.42$ m²', '$28.26$ m²', '$113.04$ m²'],
          answer: 2,
          working: 'A ≈ 3.14 × 3² = 3.14 × 9 = 28.26 m².',
        },
      ],
      lines: [
        { say: 'Your turn. A round rug has a radius of 3 metres. Using 3.14 for pi, what is its area? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '3 squared is 9, and 3.14 times 9 is 28.26 square metres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Around: $C = 2\\pi r$', 'Inside: $A = \\pi r^2$', 'Square the **radius**, not the diameter', 'Area is in **square** units'] }],
      lines: [
        { say: 'Here is what to remember. The distance around is 2 pi "r".', show: 'sum.0' },
        { say: 'The area inside is pi "r" squared.', show: 'sum.1' },
        { say: 'Square the radius, not the diameter.', show: 'sum.2' },
        { say: 'And area is measured in square units. For more on the area of a circle, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
