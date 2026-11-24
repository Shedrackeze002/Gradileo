import type { Explainer } from '@/video/script.ts';
import { cylinder, figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 3.1 (volume of prisms and cylinders). The question is an
// Example from OpenStax Contemporary Mathematics, word for word (section 10.7, Volume and Surface
// Area, CC BY-NC-SA 4.0). The can holds π × 4² × 10 = 160π ≈ 502.7 cm³ and the pan, with radius
// 22 ÷ 2 = 11 cm, holds π × 11² × 3 = 363π ≈ 1140.4 cm³, so it takes 1140.4 ÷ 502.7 ≈ 2.27, about
// 2.3 cans, as in the book's answer. Check: 2.27 × 502.7 ≈ 1141 ≈ 1140.4.

/** The pan's diameter, written under it, before we halve it. */
const across: Part = { points: { D: [24, -3.5] }, items: [{ kind: 'label', id: 'd', at: 'D', tex: '22 \\text{ cm across}', tone: 'adj', place: 'below' }] };

/** The can (radius 4, height 10) and the pie pan (22 across, 3 deep), drawn to scale. */
const pie = (solved = false, height = 360) =>
  figure(
    'pie',
    [
      cylinder({ name: 'can', at: [0, 0], r: 4, h: 10, labels: { r: '4 \\text{ cm}', h: '10 \\text{ cm}' } }),
      cylinder({ name: 'pan', at: [24, 0], r: 11, h: 3, labels: solved ? { r: '11 \\text{ cm}', h: '3 \\text{ cm}' } : { h: '3 \\text{ cm}' } }),
      ...(solved ? [] : [across]),
    ],
    height,
  );

const CAN = ['pie.can-lateral', 'pie.can-top-face', 'pie.can-shape', 'pie.can-r', 'pie.can-h'];
const PAN = ['pie.pan-lateral', 'pie.pan-top-face', 'pie.pan-shape', 'pie.pan-h'];

const QUESTION =
  'A can of apple pie filling has a radius of 4 cm and a height of 10 cm. How many cans are needed to fill a pie pan measuring 22 cm in diameter and 3 cm deep?';

const video: Explainer = {
  id: 'xq-m203-3-1',
  lessonId: '',
  exam: {
    lesson: 'm203-3-1',
    source: 'OpenStax, Contemporary Mathematics, Example in section 10.7, Volume and Surface Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-7-volume-and-surface-area',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Cans Fill the Pie Pan? (Volume of Cylinders)',
  thumbnailTitle: 'How Many Cans Fill the Pie Pan?',
  thumbnail: 'pie',
  summary:
    'A real test question, solved one small step at a time: a can of apple pie filling has a radius of 4 cm and a height of 10 cm. How many cans are needed to fill a pie pan 22 cm in diameter and 3 cm deep? Both are cylinders, so V = πr²h. The can holds π × 4² × 10 ≈ 502.7 cm³, and the pan, with radius 11 cm, holds π × 11² × 3 ≈ 1140.4 cm³. Dividing, 1140.4 ÷ 502.7 ≈ 2.3 cans. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Cans Fill the Pie Pan?', subtitle: 'Volume of cylinders, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume of cylinders. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Contemporary Mathematics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'A can of apple pie filling has a radius of $4$ cm and a height of $10$ cm. How many cans are needed to fill a pie pan measuring $22$ cm in diameter and $3$ cm deep?',
          answer: 'about $2.3$ cans',
          working: '$\\pi(4)^2(10) \\approx 502.7$, $\\pi(11)^2(3) \\approx 1140.4$, and $1140.4 \\div 502.7 \\approx 2.3$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A can of apple pie filling has a radius of 4 centimetres and a height of 10 centimetres.' },
        { say: 'How many cans are needed to fill a pie pan measuring 22 centimetres in diameter and 3 centimetres deep?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pie(), { kind: 'text', id: 't', size: 'md', md: 'The can and the pan are both **cylinders**. We compare how much each one **holds**: its **volume**.' }],
      lines: [
        { say: 'Here is the can: a cylinder with a radius of 4 centimetres and a height of 10 centimetres.', show: ['pie', ...CAN] },
        { say: 'And here is the pie pan. It is a cylinder too, wide and shallow: 22 centimetres across and 3 centimetres deep.', show: [...PAN, 'pie.d'] },
        { say: 'To find how many cans fill the pan, we compare how much each one holds. That is the volume.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = \\pi r^2 h'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Base times height', md: '$\\pi r^2$ is the area of the circle at the **bottom**. Stack it up $h$ high to get the volume. The radius is **half** the diameter.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a cylinder is pi r squared h.', show: 'f' },
        { say: 'Pi r squared is the area of the circle at the bottom. Stacking that circle h high gives the volume. And remember, the radius is half the diameter.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the volume of the **can**', 'Find the volume of the **pan**', '**Divide**: pan $\\div$ can'] }],
      lines: [
        { say: 'Here is the plan. Find the volume of the can.', show: 'plan.0' },
        { say: 'Find the volume of the pan.', show: 'plan.1' },
        { say: 'Then divide the pan by the can, to see how many cans it takes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: The two volumes',
      layout: 'center',
      main: [pie(true, 300), { kind: 'math', id: 'm', size: 'md', lines: ['V_{\\text{can}} = \\pi (4)^2 (10) = 160\\pi \\approx 502.7 \\text{ cm}^3', 'V_{\\text{pan}} = \\pi (11)^2 (3) = 363\\pi \\approx 1140.4 \\text{ cm}^3'] }],
      lines: [
        { say: 'Step one. The can: pi times 4 squared times 10. 4 squared is 16, and 16 times 10 is 160, so the can holds 160 pi, about 502.7 cubic centimetres.', show: ['pie', ...CAN, 'm.0'], focus: 'm.0' },
        { say: 'Step two. The pan is 22 centimetres across, so its radius is 11. Pi times 11 squared times 3: 121 times 3 is 363, so the pan holds 363 pi, about 1 thousand 140.4 cubic centimetres.', caption: 'Step two. The pan is 22 cm across, so its radius is 11. π × 11² × 3: 121 × 3 = 363, so the pan holds 363π, about 1140.4 cubic centimetres.', show: [...PAN, 'pie.pan-r', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Divide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1140.4}{502.7} \\approx 2.27 \\approx \\good{2.3 \\text{ cans}}'] }],
      lines: [
        { say: 'Step three. Divide the pan by the can: 1 thousand 140.4 divided by 502.7 is about 2.27.', caption: 'Step three. Divide the pan by the can: 1140.4 ÷ 502.7 ≈ 2.27.', show: 'm.0' },
        { say: 'So it takes about 2.3 cans of filling to fill the pan. In a shop, you would buy 3 cans, because 2 would leave the pan short.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2.27 \\times 502.7 \\approx 1141 \\approx 1140.4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 2.27 cans of 502.7 cubic centimetres each is about 1 thousand 141, which matches the pan\'s 1 thousand 140.4, apart from rounding. It checks out.', caption: 'Let us check. 2.27 cans of 502.7 cm³ each is about 1141, which matches the pan’s 1140.4, apart from rounding. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$9.1$ cans', 'used the **diameter** $22$ as $r$: halve it'],
            ['$0.44$ cans', 'divided **can $\\div$ pan**: divide the pan by the can'],
            ['$2$ cans', '**rounded down**: $2$ cans leave the pan short'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '9.1 cans uses the diameter, 22, as the radius. Halve it first: the radius is 11.' },
        { say: '0.44 cans divides the can by the pan. We want how many cans fit in the pan, so divide the pan by the can.' },
        { say: 'And 2 cans rounds down. Two cans hold only about 1 thousand 5 cubic centimetres, which leaves the pan short.', caption: 'And 2 cans rounds down. Two cans hold only about 1005 cubic centimetres, which leaves the pan short.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A can of soup has a radius of $3$ cm and a height of $10$ cm. How many cans fill a pot $12$ cm in diameter and $10$ cm deep?',
          choices: ['$16$', '$2$', '$4$', '$0.25$'],
          answer: 2,
          working: 'Can: $\\pi(3)^2(10) = 90\\pi$. Pot: $\\pi(6)^2(10) = 360\\pi$. $360\\pi \\div 90\\pi = 4$ cans.',
        },
      ],
      lines: [
        { say: 'Your turn. A can of soup has a radius of 3 centimetres and a height of 10 centimetres. How many cans fill a pot 12 centimetres in diameter and 10 centimetres deep? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The can holds pi times 9 times 10, which is 90 pi. The pot has a radius of 6, so it holds pi times 36 times 10, which is 360 pi. 360 pi divided by 90 pi is 4 cans. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cylinder: $V = \\pi r^2 h$', '**Halve** the diameter for $r$', 'How many fit: **big $\\div$ small**', 'Think about **rounding** in real life'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a cylinder is pi r squared h.', show: 'sum.0' },
        { say: 'Halve the diameter to get the radius.', show: 'sum.1' },
        { say: 'To find how many small things fill a big one, divide the big volume by the small volume.', show: 'sum.2' },
        { say: 'And think about what the rounding means in real life. For more on the volume of prisms and cylinders, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
