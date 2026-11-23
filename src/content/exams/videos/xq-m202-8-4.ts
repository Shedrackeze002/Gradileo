import type { Explainer } from '@/video/script.ts';
import { cylinder, figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 8.4 (area, surface area and volume of similar objects).
// Gradileo wrote this one, in the style of a Grade 11 measurement unit test, because the free
// OpenStax books have no questions on how areas and volumes of similar objects grow. The scale
// factor is k = 15 ÷ 10 = 1.5, so the label's area is 180 × 1.5² = 405 cm² and the volume is
// 400 × 1.5³ = 1350 mL. The cans are drawn to scale (radius 2 and height 4, then 3 and 6).

/** The facts printed under each can: `sInfo` under the small one and `lInfo` under the large one. */
const info = (large: boolean): Part => ({
  points: { SI: [0, -0.9], LI: [11, -1.2] },
  items: [
    { kind: 'label', id: 'sInfo', at: 'SI', tex: '180 \\text{ cm}^2, \\ 400 \\text{ mL}', place: 'below' },
    { kind: 'label', id: 'lInfo', at: 'LI', tex: large ? '\\good{405 \\text{ cm}^2, \\ 1350 \\text{ mL}}' : '? \\text{ cm}^2, \\ ? \\text{ mL}', place: 'below' },
  ],
});

/** The small can `s` (10 cm tall) and the large can `l` (15 cm tall), with their facts below. */
const cans = (solved = false, height = 360) =>
  figure(
    'cn',
    [
      cylinder({ name: 's', at: [0, 0], r: 2, h: 4, labels: { h: '10 \\text{ cm}' } }),
      cylinder({ name: 'l', at: [11, 0], r: 3, h: 6, labels: { h: '15 \\text{ cm}' } }),
      info(solved),
    ],
    height,
  );

const SMALL = ['cn.s-lateral', 'cn.s-top-face', 'cn.s-shape', 'cn.s-h'];
const LARGE = ['cn.l-lateral', 'cn.l-top-face', 'cn.l-shape', 'cn.l-h'];
const CANS = [...SMALL, ...LARGE, 'cn.sInfo', 'cn.lInfo'];

const QUESTION =
  "Two soup cans are similar. The small can is 10 cm tall and the large can is 15 cm tall. The small can's label has an area of 180 cm², and the small can holds 400 mL. (a) What is the scale factor from the small can to the large can? (b) What is the area of the large can's label? (c) How much does the large can hold?";

const video: Explainer = {
  id: 'xq-m202-8-4',
  lessonId: '',
  exam: {
    lesson: 'm202-8-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 measurement unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: The Label and Volume of a Larger Similar Can (Area and Volume of Similar Objects)',
  thumbnailTitle: 'Two Similar Soup Cans',
  thumbnail: 'cn',
  summary:
    "An exam-style question, solved one small step at a time: two similar soup cans are 10 cm and 15 cm tall, and the small can's label is 180 cm² and it holds 400 mL. We find the scale factor k = 1.5, multiply the area by k² to get a 405 cm² label, and multiply the volume by k³ to get 1350 mL. Then we check and look at the traps.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Two Similar Soup Cans', subtitle: 'Area and volume of similar objects, step by step' }],
      lines: [
        { say: 'In this video, we solve a test question about the areas and volumes of similar objects. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 measurement unit test. It says so at the bottom of the screen the whole way through.' },
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
          prompt: "Two soup cans are similar. The small can is $10$ cm tall and the large can is $15$ cm tall. The small can's label has an area of $180\\ \\text{cm}^2$, and the small can holds $400$ mL. (a) What is the scale factor from the small can to the large can? (b) What is the area of the large can's label? (c) How much does the large can hold?",
          answer: '(a) $1.5$ (b) $405\\ \\text{cm}^2$ (c) $1350$ mL',
          working: '$k = 15 \\div 10 = 1.5$, area $180 \\times 1.5^2 = 405$, volume $400 \\times 1.5^3 = 1350$.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Two soup cans are similar. The small can is 10 centimetres tall and the large can is 15 centimetres tall. The small can\'s label has an area of 180 square centimetres, and the small can holds 400 millilitres.' },
        { say: 'Part "a": what is the scale factor from the small can to the large can? Part b: what is the area of the large can\'s label? Part c: how much does the large can hold?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [cans(), { kind: 'text', id: 't', size: 'md', md: 'Three different kinds of measurement: a **length** (height), an **area** (label) and a **volume** (soup).' }],
      lines: [
        { say: 'Here is the small can, 10 centimetres tall, with a 180 square centimetre label, holding 400 millilitres.', show: [...SMALL, 'cn.sInfo'] },
        { say: 'And here is the large can, 15 centimetres tall. We need its label area and how much it holds.', show: [...LARGE, 'cn.lInfo'] },
        { say: 'Notice the three kinds of measurement: a length, an area and a volume. They do not all grow by the same amount.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rules', size: 'lg', lines: ['\\text{lengths: } \\times k', '\\text{areas and surface areas: } \\times k^2', '\\text{volumes and capacities: } \\times k^3'] },
      ],
      lines: [
        { say: 'Here is what we need. When two objects are similar, every length on the big one is the scale factor k times the length on the small one.', show: 'rules.0' },
        { say: 'An area has two lengths multiplied together, so it grows by k squared.', show: 'rules.1' },
        { say: 'A volume has three lengths multiplied together, so it grows by k cubed.', show: 'rules.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $k$ from the **heights**', 'Multiply the **area** by $k^2$', 'Multiply the **volume** by $k^3$'] }],
      lines: [
        { say: 'Here is the plan. First, find the scale factor from the heights.', show: 'plan.0' },
        { say: 'Second, multiply the label\'s area by k squared.', show: 'plan.1' },
        { say: 'Third, multiply the volume by k cubed.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The scale factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['k = \\dfrac{\\text{large}}{\\text{small}} = \\dfrac{15}{10}', 'k = \\good{1.5}'] }],
      lines: [
        { say: 'Step one. The scale factor from small to large is the large height divided by the small height: 15 over 10.', show: 'm.0' },
        { say: '15 divided by 10 is 1.5. Every length on the large can is 1.5 times as long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The label',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['k^2 = 1.5^2 = 2.25', '180 \\times 2.25 = \\good{405} \\text{ cm}^2'] }],
      lines: [
        { say: 'Step two. The label is an area, so it grows by k squared. 1.5 squared is 2.25.', show: 'm.0' },
        { say: '180 times 2.25 is 405. The large can\'s label is 405 square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The volume',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['k^3 = 1.5^3 = 3.375', '400 \\times 3.375 = \\good{1350} \\text{ mL}'] }],
      lines: [
        { say: 'Step three. The soup fills a volume, so it grows by k cubed. 1.5 cubed is 1.5 times 1.5 times 1.5, which is 3.375.', show: 'm.0' },
        { say: '400 times 3.375 is 1,350. The large can holds 1,350 millilitres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [cans(true, 320), { kind: 'math', id: 'm', size: 'md', lines: ['405 \\div 180 = 2.25 = 1.5^2 \\ \\checkmark \\qquad 1350 \\div 400 = 3.375 = 1.5^3 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Here are both cans with all their facts.', show: CANS },
        { say: '405 divided by 180 is 2.25, which is 1.5 squared. And 1,350 divided by 400 is 3.375, which is 1.5 cubed. Both check out.', show: 'm.0', focus: 'm.0' },
        { say: 'Notice the large can is only 1.5 times as tall, but it holds more than 3 times as much soup.' },
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
            ['$180 \\times 1.5 = 270$', 'an **area** grows by $k^2$, not $k$'],
            ['$400 \\times 1.5^2 = 900$', 'a **volume** grows by $k^3$'],
            ['$k = 10 \\div 15$', 'that goes from large to small; use **new** $\\div$ **old**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying the area by 1.5 gives 270, which is too small. An area grows by k squared.' },
        { say: 'Multiplying the volume by 1.5 squared gives 900, which is still too small. A volume grows by k cubed.' },
        { say: 'And find k as the new length divided by the old length. 10 over 15 would shrink the can instead.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two boxes are similar, with a scale factor of $2$ from the small box to the large box. The small box holds $3$ L. How much does the large box hold?',
          choices: ['$6$ L', '$24$ L', '$12$ L', '$9$ L'],
          answer: 1,
          working: 'A volume grows by $k^3 = 2^3 = 8$, so $3 \\times 8 = 24$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. Two boxes are similar, with a scale factor of 2 from the small box to the large box. The small box holds 3 litres. How much does the large box hold? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Capacity is a volume, so it grows by k cubed. 2 cubed is 8, and 3 times 8 is 24 litres: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$k = $ new length $\\div$ old length', 'Lengths: $\\times\\, k$', 'Areas and surface areas: $\\times\\, k^2$', 'Volumes and capacities: $\\times\\, k^3$'] }],
      lines: [
        { say: 'Here is what to remember. The scale factor is the new length divided by the old length.', show: 'sum.0' },
        { say: 'Lengths are multiplied by k.', show: 'sum.1' },
        { say: 'Areas and surface areas are multiplied by k squared.', show: 'sum.2' },
        { say: 'And volumes and capacities are multiplied by k cubed. For more on the area and volume of similar objects, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
