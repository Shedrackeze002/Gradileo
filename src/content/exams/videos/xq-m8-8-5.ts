import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';
import { discLayers, topDiameter } from '@/content/math8/videos/lib/m8-8-figures.ts';

// Exam question for Math 8 lesson 8.5 (volume of prisms and cylinders). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 9.6, Solve Geometry Applications:
// Volume and Surface Area, CC BY-NC-SA 4.0). The diameter is 6, so r = 3. With 3.14 for π, as the
// book uses: the base is 3.14 × 9 = 28.26, V = 28.26 × 24 = 678.24 cu. in., and
// SA = 2(28.26) + 2 × 3.14 × 3 × 24 = 56.52 + 452.16 = 508.68 sq. in.

const QUESTION = 'Barber shop pole: A cylindrical barber shop pole has a diameter of 6 inches and height of 24 inches. Find its (a) volume and (b) surface area.';

const pole = (id: string, layers = false) =>
  figure(
    id,
    [
      cylinder({ r: 3, h: 24, labels: { h: '24\\text{ in}' } }),
      topDiameter({ r: 3, h: 24, label: '6\\text{ in}' }),
      ...(layers ? [discLayers({ r: 3, h: 24, every: 3 })] : []),
    ],
    460,
  );

const video: Explainer = {
  id: 'xq-m8-8-5',
  lessonId: '',
  exam: {
    lesson: 'm8-8-5',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: The Barber Shop Pole (Volume of Prisms and Cylinders)',
  thumbnailTitle: 'The Barber Shop Pole',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: a cylindrical barber shop pole has a diameter of 6 inches and a height of 24 inches. Find its (a) volume and (b) surface area. The radius is half the diameter, 3 inches. With 3.14 for π, as the book uses, the base is 3.14 × 9 = 28.26 square inches, so the volume is 28.26 × 24 = 678.24 cubic inches. The surface area is the two circles, 56.52, plus the curved side, 2 × 3.14 × 3 × 24 = 452.16, which is 508.68 square inches. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Barber Shop Pole', subtitle: 'Volume of prisms and cylinders, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume of prisms and cylinders. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Barber shop pole: A cylindrical barber shop pole has a diameter of $6$ inches and height of $24$ inches. Find its (a) volume and (b) surface area.',
          answer: '(a) $678.24 \\text{ in}^3$ (b) $508.68 \\text{ in}^2$',
          working: 'r = 3; V = πr²h; SA = 2πr² + 2πrh',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Barber shop pole. A cylindrical barber shop pole has a diameter of 6 inches and height of 24 inches. Find its, a, volume, and, b, surface area.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 420,
      left: [pole('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Diameter and radius', md: 'The pole is a **cylinder**. The **diameter** goes all the way across the circle: $6$ inches. The **radius** goes from the centre to the edge, **half** the diameter: $3$ inches.' }],
      lines: [
        { say: 'The pole is a cylinder, 24 inches tall.', show: ['ask.shape', 'ask.lateral', 'ask.top-face', 'ask.h'] },
        { say: 'The question gives the diameter, the distance all the way across the circle: 6 inches.', show: ['ask.d', 'c'], focus: 'ask.d' },
        { say: 'The formulas use the radius, from the centre to the edge. It is half the diameter: 3 inches.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = \\text{base area} \\times \\text{height}', 'V = \\pi r^2 h', 'SA = 2\\pi r^2 + 2\\pi r h'] }],
      lines: [
        { say: 'Here is what we need. For any prism or cylinder, the volume is the area of the base times the height.', show: 'm.0' },
        { say: 'The base of a cylinder is a circle, with area pi "r" squared. So the volume is pi "r" squared "h". The book uses 3.14 for pi, so we will too.', show: 'm.1' },
        { say: 'And the surface area is the two circles plus the curved side: 2 pi "r" squared, plus 2 pi "r" "h".', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Halve** the diameter: $r = 3$', '(a) **Base area** times **height**', '(b) Two **circles** plus the **curved** side'] }],
      lines: [
        { say: 'Here is the plan. Halve the diameter to get the radius.', show: 'plan.0' },
        { say: 'For part a, find the base area, and multiply by the height.', show: 'plan.1' },
        { say: 'For part b, add the two circles and the curved side.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Radius, volume, surface area',
      layout: 'split',
      leftWidth: 420,
      left: [pole('st', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = 6 \\div 2 = 3', '\\pi r^2 = 3.14 \\times 9 = 28.26', '\\text{(a) } V = 28.26 \\times 24 = \\good{678.24 \\text{ in}^3}', '2 \\times 28.26 = 56.52', '2 \\times 3.14 \\times 3 \\times 24 = 452.16', '\\text{(b) } SA = \\good{508.68 \\text{ in}^2}'] }],
      lines: [
        { say: 'Step one. The radius is half the diameter: 6 divided by 2 is 3 inches.', show: ['st.shape', 'st.lateral', 'st.top-face', 'st.d', 'st.h', 'm.0'], focus: ['st.d', 'm.0'] },
        { say: 'Step two, part a. The base is a circle. 3 squared is 9, and 3.14 times 9 is 28.26 square inches.', show: 'm.1', focus: ['st.top-face', 'm.1'] },
        { say: 'Think of the pole as a stack of thin circles, all the way up its 24 inches. So multiply the base by the height: 28.26 times 24 is 678.24. The volume is 678.24 cubic inches.', show: ['st.layers', 'm.2'], focus: ['st.layers', 'm.2'] },
        { say: 'Step three, part b. The two circles are 2 times 28.26, which is 56.52 square inches.', show: 'm.3', focus: 'm.3' },
        { say: 'The curved side is 2 times 3.14 times 3 times 24, which is 452.16 square inches.', show: 'm.4', focus: ['st.lateral', 'm.4'] },
        { say: 'Add them: 56.52 plus 452.16 is 508.68. So the surface area is 508.68 square inches.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V \\approx 3 \\times 9 \\times 24 = 648 \\ \\checkmark', 'SA = 2\\pi r(r + h) = 18.84 \\times 27 = 508.68 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Estimate the volume with 3 for pi: 3 times 9 times 24 is 648. Our answer, 678.24, is a little more, because pi is a little more than 3.', show: 'm.0', focus: 'm.0' },
        { say: 'And for part b, both parts have 2 pi "r" in them, so the surface area is 2 pi "r" times "r" plus "h". That is 18.84 times 27, which is 508.68. The same. It checks out.', caption: 'And for part b, both parts have 2πr in them, so SA = 2πr(r + h) = 18.84 × 27 = 508.68. The same. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$V = 2{,}712.96$', 'used the **diameter** $6$ as the radius: $r = 3$'],
            ['$V = 452.16$', 'used $3 \\times 2 = 6$, not $3^2 = 9$'],
            ['$V$ in $\\text{in}^2$', 'volume is in **cubic** inches, $\\text{in}^3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'About 2 thousand 713 cubic inches uses the diameter, 6, as the radius. The radius is half of it: 3.' },
        { say: '452.16 uses 3 times 2 for "r" squared. But 3 squared is 3 times 3, which is 9.' },
        { say: 'And the volume is in cubic inches, not square inches, because it fills space.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A triangular prism is $10$ cm long. Its triangle end has a base of $6$ cm and a height of $4$ cm. What is its **volume**?',
          choices: ['$240 \\text{ cm}^3$', '$120 \\text{ cm}^3$', '$20 \\text{ cm}^3$', '$60 \\text{ cm}^3$'],
          answer: 1,
          working: 'Base area = ½ × 6 × 4 = 12 cm². V = 12 × 10 = 120 cm³.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular prism is 10 centimetres long. Its triangle end has a base of 6 centimetres and a height of 4 centimetres. What is its volume? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The base is the triangle: half of 6 times 4, which is 12 square centimetres. Multiply by the length, 10: 120 cubic centimetres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volume $=$ **base area** $\\times$ **height**', 'Cylinder: $V = \\pi r^2 h$', 'Given the **diameter**? **Halve** it first', 'Volume is in **cubic** units'] }],
      lines: [
        { say: 'Here is what to remember. The volume of any prism or cylinder is the base area times the height.', show: 'sum.0' },
        { say: 'For a cylinder, that is pi "r" squared "h".', show: 'sum.1' },
        { say: 'If you are given the diameter, halve it first to get the radius.', show: 'sum.2' },
        { say: 'And volume is in cubic units. For more on the volume of prisms and cylinders, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
