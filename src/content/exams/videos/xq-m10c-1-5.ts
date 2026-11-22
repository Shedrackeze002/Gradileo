import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';

// Exam question for Math 10 lesson 1.5 (surface area of prisms and cylinders): the volume and
// surface area of a soda can, radius 4 cm and height 13 cm. The question is OpenStax Prealgebra
// 2e's own worked example, word for word (section 9.6, CC BY-NC-SA 4.0), which uses 3.14 for π.
// V = πr²h ≈ 3.14 × 16 × 13 = 653.12 cm³; SA = 2πr² + 2πrh ≈ 100.48 + 326.56 = 427.04 cm².

const can = (height = 360) => figure('can', [cylinder({ r: 4, h: 13, labels: { r: '4\\text{ cm}', h: '13\\text{ cm}' } })], height);

const QUESTION = 'Find the (a) volume and (b) surface area of a can of soda. The radius of the base is 4 centimeters and the height is 13 centimeters. Assume the can is shaped exactly like a cylinder.';

const video: Explainer = {
  id: 'xq-m10c-1-5',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-5',
    source: 'OpenStax, Prealgebra 2e, Example in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: The Volume and Surface Area of a Soda Can',
  thumbnailTitle: 'A Soda Can',
  thumbnail: 'can',
  summary:
    'A real test question, solved one small step at a time: a soda can is a cylinder with radius 4 cm and height 13 cm, and we find its volume and its surface area. We picture the can, cut its surface into two circles and a rectangle, use the formulas with 3.14 for π, and look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Soda Can', subtitle: 'Volume and surface area of a cylinder, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume and surface area of a soda can. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: '(a) about 653.12 cm³; (b) about 427.04 cm²',
          working: '$V = \\pi r^2 h \\approx 3.14(4)^2(13) = 653.12$ cm³, and $SA = 2\\pi r^2 + 2\\pi r h \\approx 100.48 + 326.56 = 427.04$ cm².',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find the volume, and the surface area, of a can of soda. The radius of the base is 4 centimetres and the height is 13 centimetres. Assume the can is shaped exactly like a cylinder.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [can()],
      right: [
        { kind: 'text', id: 'v', size: 'md', md: '**Volume**: how much the can **holds**, in cubic centimetres.' },
        { kind: 'text', id: 's', size: 'md', md: '**Surface area**: how much **metal** covers it, in square centimetres.' },
      ],
      lines: [
        { say: 'Let us picture it. Here is the can: a cylinder with a radius of 4 centimetres and a height of 13 centimetres.', show: 'can' },
        { say: 'The volume is how much the can holds. It is measured in cubic centimetres.', show: 'v' },
        { say: 'The surface area is how much metal covers the outside of the can, top, bottom and sides. It is measured in square centimetres.', show: 's' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = \\pi r^2 h', 'SA = \\underbrace{2\\pi r^2}_{\\text{two circles}} + \\underbrace{2\\pi r h}_{\\text{the side}}'] },
        { kind: 'callout', id: 'pi', tone: 'definition', title: 'Using π', md: 'The textbook uses $\\pi \\approx 3.14$, so we will too. A calculator\'s $\\pi$ gives answers a little different.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a cylinder is pi, times the radius squared, times the height: the area of the circle at the bottom, stacked up the height of the can.', show: 'f.0' },
        { say: 'The surface area is two circles, one on top and one on the bottom, plus the side. Unrolled, the side is a rectangle as tall as the can and as long as the distance around the circle, two pi r.', show: 'f.1' },
        { say: 'The textbook uses 3.14 for pi, so we will too.', show: 'pi' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Volume: put $r = 4$ and $h = 13$ into $\\pi r^2 h$', 'Surface area: the **two circles**, then the **side**', 'Add them up, with the right **units**'] }],
      lines: [
        { say: 'Here is the plan. First, the volume: put the radius and the height into pi r squared h.', show: 'plan.0' },
        { say: 'Second, the surface area: find the two circles, then the side.', show: 'plan.1' },
        { say: 'Third, add them up, and give each answer its right units.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The volume',
      layout: 'split',
      left: [can(320)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['V = \\pi r^2 h', '\\approx 3.14 \\times 4^2 \\times 13', '= 3.14 \\times 16 \\times 13', '= \\good{653.12\\text{ cm}^3}'] }],
      lines: [
        { say: 'Step one. The volume is pi r squared h.', show: ['can', 'm.0'] },
        { say: 'Put in 3.14 for pi, 4 for the radius and 13 for the height.', show: 'm.1' },
        { say: 'Square the radius first: 4 squared is 16. Then multiply: 3.14 times 16 is 50.24, and 50.24 times 13 is 653.12.', show: 'm.2' },
        { say: 'The can holds about 653.12 cubic centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 2: The two circles',
      layout: 'split',
      left: [can(320)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['2\\pi r^2 \\approx 2 \\times 3.14 \\times 4^2', '= 2 \\times 50.24 = \\adj{100.48\\text{ cm}^2}'] }],
      lines: [
        { say: 'Step two. The top and the bottom are circles with a radius of 4 centimetres. One circle is pi r squared: 3.14 times 16, which is 50.24 square centimetres.', show: ['can', 'm.0'] },
        { say: 'There are two of them, so the circles cover 100.48 square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The side',
      layout: 'split',
      left: [can(320)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['2\\pi r h \\approx 2 \\times 3.14 \\times 4 \\times 13', '= \\adj{326.56\\text{ cm}^2}', 'SA \\approx 100.48 + 326.56', '= \\good{427.04\\text{ cm}^2}'] }],
      lines: [
        { say: 'Step three. Unroll the side and it is a rectangle. Its length is the distance around the circle, two pi r, and its height is 13.', show: ['can', 'm.0'] },
        { say: 'Two times 3.14 times 4 is 25.12, and 25.12 times 13 is 326.56 square centimetres.', show: 'm.1' },
        { say: 'Add the circles and the side: 100.48 plus 326.56 is 427.04. The surface area is about 427.04 square centimetres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{a box } 8 \\times 8 \\times 13: \\ V = 832\\text{ cm}^3', '653.12 \\text{ is a little less: } \\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'Volume in **cubic** units, surface area in **square** units.' },
      ],
      lines: [
        { say: 'Let us check the volume roughly. A box just big enough to hold the can is 8 by 8 by 13 centimetres, which is 832 cubic centimetres. The can is a little smaller than that box, and 653.12 is a little less than 832, so it makes sense.', show: 'm' },
        { say: 'And check the units: volume is in cubic centimetres, and surface area is in square centimetres.', show: 't' },
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
            ['Using the diameter, $8$', 'Every answer comes out far too big'],
            ['Only **one** circle', 'Forgets that a can has a top **and** a bottom: $376.8$ cm²'],
            ['Squaring after multiplying', '$(3.14 \\times 4)^2$ is not $3.14 \\times 4^2$'],
            ['Mixing up the units', 'cm³ for volume, cm² for area'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The formulas use the radius, 4, not the diameter, 8. Using the diameter makes every answer far too big.' },
        { say: 'A can has a top and a bottom, so there are two circles. With only one, you would get 376.8 square centimetres.' },
        { say: 'Square the radius before you multiply by pi. And give the volume in cubic centimetres, and the area in square centimetres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cylinder has a radius of 3 cm and a height of 10 cm. Using 3.14 for π, what is its surface area?',
          choices: ['188.4 cm²', '216.66 cm²', '244.92 cm²', '282.6 cm²'],
          answer: 2,
          working: '$2\\pi r^2 \\approx 56.52$ and $2\\pi r h \\approx 188.4$, so $SA \\approx 244.92$ cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder has a radius of 3 centimetres and a height of 10 centimetres. Using 3.14 for pi, what is its surface area? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The two circles are 2 times 3.14 times 9, which is 56.52. The side is 2 times 3.14 times 3 times 10, which is 188.4. Together, 244.92 square centimetres. That is choice C. 188.4 is the side alone, 216.66 has only one circle, and 282.6 is the volume.', show: 'q2.answer' },
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
          items: ['Volume: $V = \\pi r^2 h$', 'Surface area: $SA = 2\\pi r^2 + 2\\pi r h$', 'Use the **radius**, and square it first', 'cm³ for volume, cm² for area'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The volume of a cylinder is pi r squared h.', show: 'sum.0' },
        { say: 'The surface area is two circles plus the side: two pi r squared, plus two pi r h.', show: 'sum.1' },
        { say: 'Use the radius, not the diameter, and square it before you multiply.', show: 'sum.2' },
        { say: 'And give volume in cubic units and area in square units. For more on surface area, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
