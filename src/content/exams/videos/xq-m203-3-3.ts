import type { Explainer } from '@/video/script.ts';
import { box, figure, type Part } from '@/video/solids.ts';

// Exam question for Math 20-3 lesson 3.3 (volume and capacity problems). The question is an Example
// from OpenStax Contemporary Mathematics, word for word (section 9.3, Measuring Volume, CC BY-NC-SA
// 4.0). The tank holds 60 × 15 × 34 = 30 600 cm³ = 30 600 mL = 30.6 L. It is 25% full, so 75% is
// empty, and 0.75 × 30.6 = 22.95 L of water fills it, as in the book's answer.
// Check: 30.6 × 0.25 = 7.65 L already in, and 7.65 + 22.95 = 30.6 L.

/** The tank drawn to scale (a tenth of its size), and a quarter of it full of water (the group `water`). */
const L = 6;
const W = 1.5;
const H = 3.4;
const d: [number, number] = [0.5 * Math.cos(Math.PI / 6) * W, 0.5 * Math.sin(Math.PI / 6) * W];
const water: Part = {
  points: {
    W0: [0, 0],
    W1: [L, 0],
    W2: [L, H / 4],
    W3: [0, H / 4],
    W4: [L + d[0], d[1]],
    W5: [L + d[0], H / 4 + d[1]],
    W6: [d[0], H / 4 + d[1]],
    WL: [L + d[0] + 0.15, H / 4 + d[1] / 2 + 0.25],
  },
  items: [
    { kind: 'region', id: 'w-front', points: ['W0', 'W1', 'W2', 'W3'], tone: 'adj', shade: 0.45, group: 'water' },
    { kind: 'region', id: 'w-side', points: ['W1', 'W4', 'W5', 'W2'], tone: 'adj', shade: 0.35, group: 'water' },
    { kind: 'region', id: 'w-top', points: ['W3', 'W2', 'W5', 'W6'], tone: 'adj', shade: 0.25, group: 'water' },
    { kind: 'label', id: 'w-label', at: 'WL', tex: '25\\% \\text{ full}', tone: 'adj', place: 'right', group: 'water' },
  ],
};
const tank = (height = 360) => figure('tk', [box({ l: L, w: W, h: H, labels: { l: '60 \\text{ cm}', w: '15 \\text{ cm}', h: '34 \\text{ cm}' } }), water], height);
const TANK = ['tk', 'tk.shape', 'tk.front-face', 'tk.top-face', 'tk.side-face', 'tk.l', 'tk.w', 'tk.h'];

const QUESTION = 'A fish tank measures 60 cm long, 15 cm wide and 34 cm tall. The tank is 25 percent full. How many liters of water are needed to completely fill the tank?';

const video: Explainer = {
  id: 'xq-m203-3-3',
  lessonId: '',
  exam: {
    lesson: 'm203-3-3',
    source: 'OpenStax, Contemporary Mathematics, Example in section 9.3, Measuring Volume',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-3-measuring-volume',
    question: QUESTION,
  },
  title: 'Exam Question: Filling a Fish Tank (Volume and Capacity)',
  thumbnailTitle: 'How Much Water Fills the Tank?',
  thumbnail: 'tk',
  summary:
    'A real test question, solved one small step at a time: a fish tank measures 60 cm long, 15 cm wide and 34 cm tall, and it is 25 percent full. How many litres of water are needed to fill it? The tank holds 60 × 15 × 34 = 30,600 cm³. One cubic centimetre is one millilitre, so that is 30.6 L. Three quarters of the tank is empty, and 0.75 × 30.6 = 22.95 L. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Filling a Fish Tank', subtitle: 'Volume and capacity, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about volume and capacity. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A fish tank measures $60$ cm long, $15$ cm wide and $34$ cm tall. The tank is $25$ percent full. How many liters of water are needed to completely fill the tank?',
          answer: '$22.95$ L',
          working: '$60 \\times 15 \\times 34 = 30\\,600\\ \\text{cm}^3 = 30.6$ L, and $0.75 \\times 30.6 = 22.95$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'A fish tank measures 60 centimetres long, 15 centimetres wide and 34 centimetres tall. The tank is 25 percent full.' },
        { say: 'How many litres of water are needed to completely fill the tank?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [tank(), { kind: 'text', id: 't', size: 'md', md: 'A **quarter** of the tank has water in it already. We fill the **empty** part, and give the answer in **litres**.' }],
      lines: [
        { say: 'Here is the tank: a box 60 centimetres long, 15 centimetres wide and 34 centimetres tall.', show: TANK },
        { say: 'It is 25 percent full, so a quarter of it has water in it already.', show: 'tk.water' },
        { say: 'We need the water for the empty part on top, and the answer must be in litres, not cubic centimetres.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = l \\times w \\times h', '1 \\text{ cm}^3 = 1 \\text{ mL}, \\qquad 1000 \\text{ mL} = 1 \\text{ L}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Volume and capacity', md: 'A cube $1$ cm on each side holds exactly $1$ mL. So cubic centimetres become millilitres, and we **divide by** $1000$ for litres.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a box is length times width times height.', show: 'f.0' },
        { say: 'A cube 1 centimetre on each side holds exactly 1 millilitre, and 1 thousand millilitres make a litre. So cubic centimetres become millilitres, and we divide by 1 thousand to get litres.', caption: 'A cube 1 cm on each side holds exactly 1 mL, and 1000 mL make a litre. So cubic centimetres become millilitres, and we divide by 1000 to get litres.', show: ['f.1', 'c'] },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **volume** in cm³', 'Change it to **litres**', 'Take the **empty** part: $75\\%$'] }],
      lines: [
        { say: 'Here is the plan. Find the volume of the tank in cubic centimetres.', show: 'plan.0' },
        { say: 'Change it to litres.', show: 'plan.1' },
        { say: 'Then take the empty part. 25 percent is full, so 75 percent is empty.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Volume in litres',
      layout: 'center',
      main: [tank(300), { kind: 'math', id: 'm', size: 'md', lines: ['V = 60 \\times 15 \\times 34 = 30\\,600 \\text{ cm}^3', '30\\,600 \\text{ mL} \\div 1000 = 30.6 \\text{ L}'] }],
      lines: [
        { say: 'Step one. 60 times 15 is 900, and 900 times 34 is 30 thousand 600 cubic centimetres.', caption: 'Step one. 60 × 15 = 900, and 900 × 34 = 30,600 cubic centimetres.', show: [...TANK, 'm.0'], focus: 'm.0' },
        { say: 'Step two. That is 30 thousand 600 millilitres. Divide by 1 thousand: the full tank holds 30.6 litres.', caption: 'Step two. That is 30,600 millilitres. Divide by 1000: the full tank holds 30.6 litres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The empty part',
      layout: 'center',
      main: [tank(300), { kind: 'math', id: 'm', size: 'md', lines: ['100\\% - 25\\% = 75\\% \\text{ empty}', '0.75 \\times 30.6 = \\good{22.95 \\text{ L}}'] }],
      lines: [
        { say: 'Step three. A quarter of the tank has water already, so 100 percent minus 25 percent, 75 percent, is empty.', show: [...TANK, 'tk.water', 'm.0'], focus: 'm.0' },
        { say: '75 percent is 0.75. 0.75 times 30.6 is 22.95. We need 22.95 litres of water to fill the tank.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0.25 \\times 30.6 = 7.65 \\text{ L already in}', '7.65 + 22.95 = 30.6 \\text{ L} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The water already in the tank is 25 percent of 30.6, which is 7.65 litres.', show: 'm.0' },
        { say: '7.65 plus 22.95 is 30.6 litres, the whole tank. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$7.65$ L', 'that is the water **already in**: we need the **empty** part'],
            ['$30.6$ L', 'filled the **whole** tank: a quarter is full already'],
            ['$22\\,950$ L', 'skipped the change: those are **millilitres**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '7.65 litres is the water already in the tank, the 25 percent. We need the 75 percent that is empty.' },
        { say: '30.6 litres fills the whole tank, as if it were empty. A quarter of it is full already.' },
        { say: 'And 22 thousand 950 forgets to change millilitres to litres. Divide by 1 thousand.', caption: 'And 22,950 forgets to change millilitres to litres. Divide by 1000.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cooler measures $50$ cm long, $30$ cm wide and $40$ cm tall. It is half full of ice. How many litres of space are left?',
          choices: ['$60$ L', '$30\\,000$ L', '$15$ L', '$30$ L'],
          answer: 3,
          working: '$50 \\times 30 \\times 40 = 60\\,000\\ \\text{cm}^3 = 60$ L, and half of $60$ is $30$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A cooler measures 50 centimetres long, 30 centimetres wide and 40 centimetres tall. It is half full of ice. How many litres of space are left? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '50 times 30 times 40 is 60 thousand cubic centimetres, which is 60 litres. Half of 60 is 30 litres. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Box: $V = l \\times w \\times h$', '$1 \\text{ cm}^3 = 1$ mL, and $1000$ mL $= 1$ L', 'Fill only the **empty** part', 'Check: full part **plus** empty part'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a box is length times width times height.', show: 'sum.0' },
        { say: 'One cubic centimetre holds one millilitre, and 1 thousand millilitres make a litre.', caption: 'One cubic centimetre holds one millilitre, and 1000 millilitres make a litre.', show: 'sum.1' },
        { say: 'To fill a container, find only the empty part.', show: 'sum.2' },
        { say: 'And check that the full part plus the empty part makes the whole. For more on volume and capacity, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
