import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc } from './lib/m7-7-figures.ts';

// A circle with a radius of 6 cm.
const six = (id: string) => figure(id, [disc({ r: 6, rAt: 30, shade: 0.25, labels: { r: 'r = 6\\text{ cm}' } })], 400);

const video: Explainer = {
  id: 'm7-7-4-b',
  lessonId: 'm7-7-4',
  title: 'Area of a Circle, Part 2: Using the Radius',
  thumbnailTitle: 'Area from the Radius',
  thumbnail: 'sx',
  summary:
    'Using A = πr²: square the radius first, then multiply by π, using the π key and rounding only at the end. A circle with a radius of 6 cm has an area of π × 36 ≈ 113.1 cm². Do not mix up the area, πr² in square units, with the circumference, 2πr, which is a length: 2 × π × 6 ≈ 37.7 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 2', title: 'Using the Radius', subtitle: 'Square it first, then multiply by pi' }],
      lines: [
        { say: 'The area of a circle is pi times r squared. Now let’s use it.', show: 'title' },
        { say: 'In this video, you will find the area of a circle from its radius, step by step, and learn how to tell the area apart from the circumference.' },
      ],
    },
    {
      chapter: 'Squaring the radius',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['6^2 = 6 \\times 6 = 36', '6^2 \\ne 6 \\times 2'] }, { kind: 'callout', id: 'tip', tone: 'tip', title: 'Square first', md: 'Square the radius first, then multiply by $\\pi$. Use the $\\pi$ key on your calculator, and round only at the end.' }],
      lines: [
        { say: 'The formula needs r squared. Squaring a number means multiplying it by itself. So six squared is six times six, which is thirty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'Six squared is not six times two. The small two tells you to multiply six by itself, not to multiply it by two.', show: 'm.1', focus: 'm.1' },
        { say: 'In the order of operations, a square comes before multiplying. So square the radius first, then multiply by pi.', show: 'tip' },
      ],
    },
    {
      chapter: 'A circle from its radius',
      layout: 'split',
      leftWidth: 480,
      left: [six('sx')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Radius $6$ cm. Find the area to the nearest tenth.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = \\pi r^2 = \\pi \\times 6^2 = \\pi \\times 36'] },
        { kind: 'calc', id: 'calc', keys: 'π × 36', result: '113.0973355' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['A \\approx 113.1\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A circle has a radius of six centimetres. Find its area, to the nearest tenth of a square centimetre.', show: ['q', 'sx.shape', 'sx.centre', 'sx.r'] },
        { say: 'Start with the formula: "A" equals pi times r squared. Put six in place of r: pi times six squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Square first: six squared is thirty-six. So the area is pi times thirty-six.', focus: 'm.0' },
        { say: 'On the calculator, press the pi key, then times thirty-six. It shows one hundred thirteen point zero nine, and more digits.', show: 'calc' },
        { say: 'The digit after the tenths place is nine, so round up. The area is about one hundred thirteen point one square centimetres.', show: 'a.0', focus: ['a.0', 'sx.shape'] },
      ],
    },
    {
      chapter: 'Area or circumference?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Formula', 'For $r = 6$ cm', 'Units'],
          rows: [
            ['Circumference: the distance **around**', '$C = 2\\pi r$', '$2 \\times \\pi \\times 6 \\approx 37.7$', 'cm'],
            ['Area: the space **inside**', '$A = \\pi r^2$', '$\\pi \\times 36 \\approx 113.1$', '$\\text{cm}^2$'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two formulas, two jobs', md: 'The circumference is a **length**, in units like cm. The area counts **squares**, in units like $\\text{cm}^2$. Check which one the question asks for.' },
      ],
      lines: [
        { say: 'Watch out. It is easy to mix up the two circle formulas, because both of them have pi and r.', show: 't' },
        { say: 'The circumference is the distance around the circle: two times pi times r. For our circle, it is about thirty-seven point seven centimetres. It is a length.', focus: 't.0' },
        { say: 'The area is the space inside the circle: pi times r squared. For our circle, it is about one hundred thirteen point one square centimetres. It counts squares.', focus: 't.1' },
        { say: 'So read the question carefully. If it asks how far around, find the circumference. If it asks how much space or surface, find the area, and write square units.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle has a radius of $10$ cm. Use $3.14$ for $\\pi$. What is its area?',
          choices: ['$62.8\\text{ cm}^2$', '$31.4\\text{ cm}^2$', '$314\\text{ cm}^2$', '$1\\,256\\text{ cm}^2$'],
          answer: 2,
          working: '$A = \\pi r^2 = 3.14 \\times 10^2 = 3.14 \\times 100 = 314\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle has a radius of ten centimetres. Use three point one four for pi. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, three hundred fourteen square centimetres. Ten squared is one hundred, and three point one four times one hundred is three hundred fourteen. Choice A works out two times pi times r, which is the circumference, not the area.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$A = \\pi r^2$: square the radius first, then multiply by $\\pi$.', '$6^2 = 6 \\times 6 = 36$, not $12$.', 'Area is in square units. The circumference, $2\\pi r$, is a length.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the area of a circle, square the radius first, then multiply by pi.', show: 'sum.0' },
        { say: 'Squaring means multiplying a number by itself: six squared is thirty-six, not twelve.', show: 'sum.1' },
        { say: 'And area is in square units, while the circumference is a length. In the next part, you will find the area of a circle when you know its diameter. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
