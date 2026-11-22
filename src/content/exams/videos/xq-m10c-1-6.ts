import type { Explainer } from '@/video/script.ts';
import { figure, sphere } from '@/video/solids.ts';

// Exam question for Math 10 lesson 1.6 (surface area of pyramids, cones and spheres): the volume
// and surface area of a globe of radius 14 inches. The question is OpenStax Prealgebra 2e's own
// worked example, word for word (section 9.6, CC BY-NC-SA 4.0), which uses 3.14 for π.
// V = ⁴⁄₃πr³ ≈ ⁴⁄₃ × 3.14 × 2744 ≈ 11,488.21 in³; S = 4πr² ≈ 4 × 3.14 × 196 = 2461.76 in².

const globe = (height = 360) => figure('globe', [sphere({ r: 14, labels: { r: '14\\text{ in}' } })], height);

const QUESTION = 'A globe of Earth is in the shape of a sphere with radius 14 inches. Find its (a) volume and (b) surface area. Round the answer to the nearest hundredth.';

const video: Explainer = {
  id: 'xq-m10c-1-6',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-6',
    source: 'OpenStax, Prealgebra 2e, Example in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: The Volume and Surface Area of a Globe',
  thumbnailTitle: 'A Globe of Earth',
  thumbnail: 'globe',
  summary:
    'A real test question, solved one small step at a time: a globe is a sphere with radius 14 inches, and we find its volume and its surface area. We use V = ⁴⁄₃πr³ and S = 4πr² with 3.14 for π, check the surface area with four circles, and look at the traps between r² and r³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Globe of Earth', subtitle: 'Volume and surface area of a sphere, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume and surface area of a globe. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: '(a) about 11,488.21 in³; (b) about 2461.76 in²',
          working: '$V = \\tfrac{4}{3}\\pi r^3 \\approx \\tfrac{4}{3}(3.14)(14)^3 \\approx 11{,}488.21$ in³, and $S = 4\\pi r^2 \\approx 4(3.14)(14)^2 = 2461.76$ in².',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A globe of Earth is in the shape of a sphere with radius 14 inches. Find its volume and its surface area. Round the answer to the nearest hundredth.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [globe()],
      right: [
        { kind: 'text', id: 'v', size: 'md', md: '**Volume**: the space **inside** the globe, in cubic inches.' },
        { kind: 'text', id: 's', size: 'md', md: '**Surface area**: the **map** printed on the outside, in square inches.' },
      ],
      lines: [
        { say: 'Let us picture it. The globe is a sphere, and its radius, from the centre to the surface, is 14 inches.', show: 'globe' },
        { say: 'The volume is the space inside the globe, in cubic inches.', show: 'v' },
        { say: 'The surface area is the outside, where the map of the world is printed, in square inches.', show: 's' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = \\tfrac{4}{3}\\pi r^3', 'S = 4\\pi r^2'] },
        { kind: 'text', id: 'pi', size: 'md', md: 'Volume uses $r$ **cubed**, area uses $r$ **squared**. The textbook uses $\\pi \\approx 3.14$.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a sphere is four thirds, times pi, times the radius cubed.', show: 'f.0' },
        { say: 'The surface area of a sphere is four, times pi, times the radius squared: exactly four circles with the same radius.', show: 'f.1' },
        { say: 'Volume is cubed, because it is three-dimensional, and area is squared. The textbook uses 3.14 for pi, so we will too.', show: 'pi' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Volume: $14^3$, then $\\tfrac{4}{3}\\pi$', 'Surface area: $14^2$, then $4\\pi$', 'Round each to the nearest **hundredth**'] }],
      lines: [
        { say: 'Here is the plan. For the volume, cube 14, then multiply by four thirds of pi.', show: 'plan.0' },
        { say: 'For the surface area, square 14, then multiply by 4 pi.', show: 'plan.1' },
        { say: 'Then round each answer to the nearest hundredth.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The volume',
      layout: 'split',
      left: [globe(320)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['14^3 = 14 \\times 14 \\times 14 = 2744', 'V \\approx \\tfrac{4}{3} \\times 3.14 \\times 2744', '= 34{,}464.64 \\div 3', '\\approx \\good{11{,}488.21\\text{ in}^3}'] }],
      lines: [
        { say: 'Step one. Cube the radius: 14 times 14 is 196, and 196 times 14 is 2,744.', show: ['globe', 'm.0'] },
        { say: 'Now multiply by four thirds of pi. Multiply by 4 and by 3.14 first, then divide by 3.', show: 'm.1' },
        { say: '4 times 3.14 times 2,744 is 34,464.64.', show: 'm.2' },
        { say: 'Divided by 3, that is about 11,488.21 cubic inches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 2: The surface area',
      layout: 'split',
      left: [globe(320)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['14^2 = 196', 'S \\approx 4 \\times 3.14 \\times 196', '= \\good{2461.76\\text{ in}^2}'] }],
      lines: [
        { say: 'Step two. Square the radius: 14 squared is 196.', show: ['globe', 'm.0'] },
        { say: 'Multiply by 4 and by 3.14: 4 times 3.14 is 12.56, and 12.56 times 196 is 2,461.76.', show: 'm.1' },
        { say: 'The surface area is about 2,461.76 square inches. It is already to the nearest hundredth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{one circle: } \\pi r^2 \\approx 615.44\\text{ in}^2', '4 \\times 615.44 = 2461.76 \\ \\checkmark', '\\text{a box } 28 \\times 28 \\times 28 = 21{,}952\\text{ in}^3 > 11{,}488.21 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. One circle with radius 14 is pi r squared, about 615.44 square inches. The surface of a sphere is four of these, and 4 times 615.44 is 2,461.76. It matches.', show: ['m.0', 'm.1'] },
        { say: 'For the volume, a box just big enough to hold the globe is 28 inches on every side, 21,952 cubic inches. A sphere fills a little over half of that box, and 11,488.21 is a little over half. It makes sense.', show: 'm.2' },
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
            ['$r^2$ in the volume', '$\\tfrac{4}{3}\\pi(196) \\approx 820.59$: far too small'],
            ['$r^3$ in the area', '$4\\pi(2744) \\approx 34{,}464.64$: far too big'],
            ['Dividing by 3 in the area', 'Only the volume has $\\tfrac{4}{3}$'],
            ['Using the diameter, $28$', 'Eight times the volume, four times the area'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The volume uses the radius cubed and the area uses it squared. Swapping them gives answers that are far too small or far too big.' },
        { say: 'Only the volume has four thirds. The surface area is simply 4 pi r squared.' },
        { say: 'And the radius is 14, not the diameter, 28. Doubling the radius makes the volume eight times bigger and the area four times bigger.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A ball is a sphere with a radius of 5 cm. Using 3.14 for π, what is its surface area?',
          choices: ['78.5 cm²', '523.33 cm²', '1570 cm²', '314 cm²'],
          answer: 3,
          working: '$S = 4\\pi r^2 \\approx 4(3.14)(5)^2 = 314$ cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A ball is a sphere with a radius of 5 centimetres. Using 3.14 for pi, what is its surface area? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '5 squared is 25, and 4 times 3.14 times 25 is 314 square centimetres. That is choice D. 78.5 is only one circle, 523.33 is the volume, and 1,570 used the radius cubed.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sphere volume: $V = \\tfrac{4}{3}\\pi r^3$', 'Sphere surface area: $S = 4\\pi r^2$, four circles', 'Volume **cubed**, area **squared**', 'Use the **radius**'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a sphere is four thirds pi r cubed.', show: 'sum.0' },
        { say: 'Its surface area is 4 pi r squared: exactly four circles with the same radius.', show: 'sum.1' },
        { say: 'Volume is cubed and area is squared.', show: 'sum.2' },
        { say: 'And always use the radius. For more on the surface area of spheres, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
