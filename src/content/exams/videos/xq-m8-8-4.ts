import type { Explainer } from '@/video/script.ts';
import { cylinder, cylinderNet, figure } from '@/video/solids.ts';

// Exam question for Math 8 lesson 8.4 (surface area of cylinders). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 9.6, Solve Geometry Applications: Volume and
// Surface Area, CC BY-NC-SA 4.0). With 3.14 for π, as the book uses: V = 3.14 × 4² × 7 = 351.68
// cu. cm; the two circles are 2 × 3.14 × 16 = 100.48 and the curved side unrolls into a rectangle
// 2 × 3.14 × 4 × 7 = 175.84, so SA = 276.32 sq. cm.

const QUESTION = 'Find the (a) volume and (b) surface area of the cylinder with radius 4 cm and height 7cm.';

const can = (id: string) => figure(id, [cylinder({ r: 4, h: 7, labels: { r: '4\\text{ cm}', h: '7\\text{ cm}' } })], 400);
const net = (id: string) =>
  figure(id, [cylinderNet({ r: 4, h: 7, labels: { c: '2\\pi r', h: '7', r: '4' }, areas: { rect: '2\\pi r h', circle: '\\pi r^2' } })], 460);

const video: Explainer = {
  id: 'xq-m8-8-4',
  lessonId: '',
  exam: {
    lesson: 'm8-8-4',
    source: 'OpenStax, Prealgebra 2e, Try It in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: Volume and Surface Area of a Cylinder (Surface Area of Cylinders)',
  thumbnailTitle: 'Surface Area of a Cylinder',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: find the (a) volume and (b) surface area of a cylinder with radius 4 cm and height 7 cm. With 3.14 for π, as the book uses, the volume is πr²h = 3.14 × 16 × 7 = 351.68 cubic centimetres. Unrolled, the cylinder is two circles and a rectangle. The circles are 2 × 3.14 × 16 = 100.48, and the rectangle is 2πr × h = 25.12 × 7 = 175.84, so the surface area is 276.32 square centimetres. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Surface Area of a Cylinder', subtitle: 'Surface area of cylinders, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the surface area of cylinders. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the (a) volume and (b) surface area of the cylinder with radius $4$ cm and height $7$ cm.',
          answer: '(a) $351.68 \\text{ cm}^3$ (b) $276.32 \\text{ cm}^2$',
          working: 'V = πr²h; SA = two circles + a rectangle',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Find the, a, volume, and, b, surface area of the cylinder with radius 4 centimetres and height 7 centimetres.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [can('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A cylinder', md: 'A **cylinder** has two equal **circles**, top and bottom, joined by a **curved** side. The **volume** is the space inside, in $\\text{cm}^3$. The **surface area** is the area of the whole outside, in $\\text{cm}^2$.' }],
      lines: [
        { say: 'Here is the cylinder. Its radius is 4 centimetres, and its height is 7 centimetres.', show: ['ask.shape', 'ask.lateral', 'ask.top-face', 'ask.r', 'ask.h'] },
        { say: 'A cylinder has two equal circles, the top and the bottom, joined by a curved side.', show: 'c' },
        { say: 'The volume is the space inside, in cubic centimetres. The surface area is the area of the whole outside, in square centimetres.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = \\pi r^2 h', 'SA = 2\\pi r^2 + 2\\pi r h', '\\pi \\approx 3.14'] }],
      lines: [
        { say: 'Here is what we need. The volume is the area of the circle, pi "r" squared, times the height.', show: 'm.0' },
        { say: 'The surface area is the two circles, 2 pi "r" squared, plus the curved side. Unrolled, the curved side is a rectangle as long as the circumference, 2 pi "r", and as tall as the height.', show: 'm.1' },
        { say: 'Pi is a little more than 3. The book uses 3.14 for it, so we will too.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Circle** area times **height**', '(b) Area of the **two circles**', 'Add the **rectangle**: $2\\pi r \\times h$'] }],
      lines: [
        { say: 'Here is the plan. For part a, find the area of the circle, and multiply by the height.', show: 'plan.0' },
        { say: 'For part b, find the area of the two circles.', show: 'plan.1' },
        { say: 'Then add the rectangle: the circumference times the height.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Volume, circles, rectangle',
      layout: 'split',
      leftWidth: 520,
      left: [net('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\pi r^2 = 3.14 \\times 16 = 50.24', '\\text{(a) } V = 50.24 \\times 7 = \\good{351.68 \\text{ cm}^3}', '\\text{circles: } 2 \\times 50.24 = 100.48', '\\text{rectangle: } 25.12 \\times 7 = 175.84', '\\text{(b) } SA = \\good{276.32 \\text{ cm}^2}'] }],
      lines: [
        { say: 'Step one, part a. The area of the circle is pi "r" squared. 4 squared is 16, and 3.14 times 16 is 50.24 square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by the height, 7. 50.24 times 7 is 351.68. So the volume is 351.68 cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two, part b. Unroll the cylinder into its net: two circles and a rectangle.', show: ['st.rect', 'st.circles', 'st.c', 'st.h', 'st.r'] },
        { say: 'The two circles are 2 times 50.24, which is 100.48 square centimetres.', show: 'm.2', focus: ['st.circles', 'm.2'] },
        { say: 'Step three. The rectangle is as long as the circumference: 2 times 3.14 times 4, which is 25.12. Its height is 7, so its area is 25.12 times 7, which is 175.84.', show: 'm.3', focus: ['st.rect', 'm.3'] },
        { say: 'Add them: 100.48 plus 175.84 is 276.32. So the surface area is 276.32 square centimetres.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['SA = 2\\pi r(r + h) = 25.12 \\times 11 = 276.32 \\ \\checkmark', 'V \\approx 3 \\times 16 \\times 7 = 336 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check part b another way. Both parts of the surface area have 2 pi "r" in them, so it is 2 pi "r" times "r" plus "h". That is 25.12 times 11, which is 276.32. The same.', caption: 'Let us check part b another way. Both parts have 2πr in them, so SA = 2πr(r + h) = 25.12 × 11 = 276.32. The same.', show: 'm.0', focus: 'm.0' },
        { say: 'And estimate part a with 3 for pi: 3 times 16 times 7 is 336. Our answer, 351.68, is a little more, because pi is a little more than 3. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$SA = 175.84$', 'only the **curved** side: add the **two** circles'],
            ['$SA = 226.08$', 'only **one** circle: a cylinder has a top **and** a bottom'],
            ['$V = 175.84$', 'used $2r = 8$: $r^2$ is $4 \\times 4 = 16$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '175.84 for the surface area is only the curved side. Add the two circles as well.' },
        { say: '226.08 adds only one circle. A cylinder has a top and a bottom.' },
        { say: 'And 175.84 for the volume uses 2 times 4, which is 8, for "r" squared. But "r" squared is 4 times 4, which is 16.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cylinder has radius $2$ cm and height $5$ cm. Using $3.14$ for $\\pi$, what is its **volume**?',
          choices: ['$31.4 \\text{ cm}^3$', '$157 \\text{ cm}^3$', '$62.8 \\text{ cm}^3$', '$87.92 \\text{ cm}^3$'],
          answer: 2,
          working: 'V = πr²h = 3.14 × 4 × 5 = 62.8 cm³.',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder has radius 2 centimetres and height 5 centimetres. Using 3.14 for pi, what is its volume? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '"r" squared is 2 times 2, which is 4. 3.14 times 4 is 12.56, and 12.56 times 5 is 62.8. So 62.8 cubic centimetres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volume $= \\pi r^2 h$', 'The net: **two circles** and a **rectangle**', 'The rectangle is $2\\pi r$ by $h$', 'Surface area $= 2\\pi r^2 + 2\\pi r h$'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a cylinder is pi "r" squared times the height.', show: 'sum.0' },
        { say: 'Its net is two circles and a rectangle.', show: 'sum.1' },
        { say: 'The rectangle is as long as the circumference, 2 pi "r", and as tall as the height.', show: 'sum.2' },
        { say: 'So the surface area is 2 pi "r" squared plus 2 pi "r" "h". For more on the surface area of cylinders, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
