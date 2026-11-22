import type { Explainer } from '@/video/script.ts';
import { cone, figure } from '@/video/solids.ts';

// Exam question for Math 10 lesson 1.7 (volume of prisms, cylinders, pyramids and cones): the
// volume of a cone-shaped wrap of french fries, 8 inches tall and 5 inches across. The question is
// OpenStax Prealgebra 2e's own worked example, word for word (section 9.6, CC BY-NC-SA 4.0), which
// uses 3.14 for π. r = 2.5 in, so V = ⅓πr²h ≈ ⅓ × 3.14 × 6.25 × 8 ≈ 52.33 in³.

const wrap = (height = 360) => figure('wrap', [cone({ r: 2.5, h: 8, down: true, labels: { r: '2.5\\text{ in}', h: '8\\text{ in}' } })], height);

const QUESTION = 'Marty’s favorite gastro pub serves french fries in a paper wrap shaped like a cone. What is the volume of a conic wrap that is 8 inches tall and 5 inches in diameter? Round the answer to the nearest hundredth.';

const video: Explainer = {
  id: 'xq-m10c-1-7',
  lessonId: '',
  exam: {
    lesson: 'm10c-1-7',
    source: 'OpenStax, Prealgebra 2e, Example in section 9.6, Solve Geometry Applications: Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/9-6-solve-geometry-applications-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Fries Fit in a Cone? The Volume of a Cone',
  thumbnailTitle: 'Fries in a Cone',
  thumbnail: 'wrap',
  summary:
    'A real test question, solved one small step at a time: french fries come in a paper cone 8 inches tall and 5 inches across, and we find how much it holds. We turn the diameter into a radius, use the volume of a cone, ⅓πr²h, with 3.14 for π, and check the answer against a cylinder. Then we look at the traps that catch people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Fries in a Cone', subtitle: 'The volume of a cone, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume of a cone. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          answer: 'about 52.33 cubic inches',
          working: '$r = 2.5$ in, so $V = \\tfrac{1}{3}\\pi r^2 h \\approx \\tfrac{1}{3}(3.14)(2.5)^2(8) \\approx 52.33$ in³.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Marty’s favourite gastro pub serves french fries in a paper wrap shaped like a cone. What is the volume of a conic wrap that is 8 inches tall and 5 inches in diameter? Round the answer to the nearest hundredth.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      left: [wrap()],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'How much the cone **holds**: its volume, in **cubic inches**.' },
        { kind: 'text', id: 'd', size: 'md', md: '$5$ inches **across** is the diameter, so the radius is $2.5$ inches.' },
      ],
      lines: [
        { say: 'Let us picture it. The wrap is a cone, point down, with the open circle at the top. It is 8 inches tall.', show: 'wrap' },
        { say: 'The question asks how much the cone holds. That is its volume, in cubic inches.', show: 't' },
        { say: 'Careful: 5 inches is the diameter, the whole way across the circle. The radius is half of that, 2.5 inches.', show: 'd' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V_{\\text{cone}} = \\tfrac{1}{3}\\pi r^2 h'] },
        { kind: 'text', id: 'why', size: 'md', md: 'A cone holds **one third** of the cylinder with the same base and height. The textbook uses $\\pi \\approx 3.14$.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a cone is one third, times pi, times the radius squared, times the height.', show: 'f' },
        { say: 'Why one third? Fill a cone with water and pour it into a cylinder with the same base and height. It takes three cones to fill the cylinder. The textbook uses 3.14 for pi, so we will too.', show: 'why' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Halve the diameter to get the **radius**', 'Put $r$ and $h$ into $\\tfrac{1}{3}\\pi r^2 h$', 'Round to the nearest **hundredth**'] }],
      lines: [
        { say: 'Here is the plan. First, halve the diameter to get the radius.', show: 'plan.0' },
        { say: 'Second, put the radius and the height into the formula.', show: 'plan.1' },
        { say: 'Third, round to the nearest hundredth, two decimal places.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The radius',
      layout: 'split',
      left: [wrap(320)],
      right: [{ kind: 'math', id: 'm', size: 'lg', lines: ['r = 5 \\div 2 = \\adj{2.5\\text{ in}}'] }],
      lines: [{ say: 'Step one. The radius is half the diameter: 5 divided by 2 is 2.5 inches.', show: ['wrap', 'm.0'], focus: 'm.0' }],
    },
    {
      chapter: 'Step 2: The formula',
      layout: 'split',
      left: [wrap(320)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['V \\approx \\tfrac{1}{3} \\times 3.14 \\times 2.5^2 \\times 8', '= \\tfrac{1}{3} \\times 3.14 \\times 6.25 \\times 8', '= \\tfrac{1}{3} \\times 157', '\\approx \\good{52.33\\text{ in}^3}'] }],
      lines: [
        { say: 'Step two. Put 3.14 for pi, 2.5 for the radius and 8 for the height into the formula.', show: ['wrap', 'm.0'] },
        { say: 'Square the radius first: 2.5 times 2.5 is 6.25.', show: 'm.1' },
        { say: 'Multiply: 3.14 times 6.25 is 19.625, and times 8 is 157.', show: 'm.2' },
        { say: 'One third of 157 is 52.333 and so on. To the nearest hundredth, the wrap holds about 52.33 cubic inches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{cylinder: } \\pi r^2 h \\approx 157\\text{ in}^3', '157 \\div 3 \\approx 52.33 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. A cylinder with the same base and height would hold pi r squared h, which is 157 cubic inches.', show: 'm.0' },
        { say: 'The cone holds one third of that: 157 divided by 3 is about 52.33. It matches.', show: 'm.1' },
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
            ['Using the diameter, $5$, as the radius', '$209.33$ in³'],
            ['Forgetting the $\\tfrac{1}{3}$', '$157$ in³'],
            ['Rounding too early', 'a slightly wrong hundredth'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Using 5 as the radius gives 209.33, four times too big, because the radius is squared.' },
        { say: 'Forgetting the one third gives 157, the volume of a cylinder, not a cone.' },
        { say: 'And keep every digit until the end, then round once to the nearest hundredth.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cone-shaped paper cup is 9 cm tall and 6 cm across the top. Using 3.14 for π, how much water does it hold?',
          choices: ['84.78 cm³', '254.34 cm³', '339.12 cm³', '28.26 cm³'],
          answer: 0,
          working: '$r = 3$, so $V \\approx \\tfrac{1}{3}(3.14)(3)^2(9) = 84.78$ cm³.',
        },
      ],
      lines: [
        { say: 'Your turn. A cone-shaped paper cup is 9 centimetres tall and 6 centimetres across the top. Using 3.14 for pi, how much water does it hold? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The radius is 3. One third, times 3.14, times 9, times 9 is 84.78 cubic centimetres. That is choice A. 254.34 forgot the one third, and 339.12 used the diameter.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cone: $V = \\tfrac{1}{3}\\pi r^2 h$', 'Across the circle is the **diameter**: halve it', 'A cone is **one third** of its cylinder', 'Round once, at the end'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a cone is one third pi r squared h.', show: 'sum.0' },
        { say: 'The distance across the circle is the diameter, so halve it to get the radius.', show: 'sum.1' },
        { say: 'A cone holds one third of the cylinder with the same base and height.', show: 'sum.2' },
        { say: 'And round once, at the end. For more on volume, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
