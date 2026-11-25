import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

// Exam question for Math 10-4 lesson 7.3 (volume and capacity). The question is an exercise from
// OpenStax Contemporary Mathematics, word for word (section 9.3, Measuring Volume, CC BY-NC-SA 4.0).
// 40 × 20 × 120 = 96,000 cm³, and 1 L = 1000 cm³, so the container holds 96 L.
// Check: 40 × 20 = 800 cm² of base, and 800 × 120 = 96,000.

const tank = (height = 380) =>
  figure('tank', [box({ l: 120, w: 20, h: 40, labels: { l: '120 \\text{ cm}', w: '20 \\text{ cm}', h: '40 \\text{ cm}' } })], height);

const QUESTION = 'How much liquid, in liters, can a container with dimensions of 40 cm × 20 cm × 120 cm hold?';

const video: Explainer = {
  id: 'xq-m104-7-3',
  lessonId: '',
  exam: {
    lesson: 'm104-7-3',
    source: 'OpenStax, Contemporary Mathematics, Exercise in section 9.3, Measuring Volume',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-3-measuring-volume',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Litres Does It Hold? (Volume and Capacity)',
  thumbnailTitle: 'How Many Litres Does It Hold?',
  thumbnail: 'tank',
  summary:
    'A real test question, solved one small step at a time: how many litres can a container 40 cm by 20 cm by 120 cm hold? We multiply the three lengths to get the volume, 96,000 cm³, then use 1 L = 1000 cm³ to change it to litres: 96 L. Then we check with the area of the base and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Litres Does It Hold?', subtitle: 'Volume and capacity, step by step' }],
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
          prompt: 'How much liquid, in liters, can a container with dimensions of $40\\,\\text{cm} \\times 20\\,\\text{cm} \\times 120\\,\\text{cm}$ hold?',
          answer: '$96$ L',
          working: '$40 \\times 20 \\times 120 = 96{,}000$ cm³ $= 96$ L',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'How much liquid, in litres, can a container with dimensions of 40 centimetres by 20 centimetres by 120 centimetres hold?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [tank(), { kind: 'text', id: 't', size: 'md', md: 'The sizes are in **centimetres**, but the answer must be in **litres**.' }],
      lines: [
        { say: 'Here is the container: a box measuring 40 centimetres by 20 centimetres by 120 centimetres.', show: 'tank' },
        { say: 'The sizes are in centimetres, but the question wants the answer in litres. So we need the volume, and then a change of units.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = l \\times w \\times h', '1 \\text{ L} = 1000 \\text{ cm}^3'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Cubic centimetres to litres', md: 'A litre fills a cube $10$ cm on each side, and $10 \\times 10 \\times 10 = 1000$. So **divide** cm³ **by $1000$** to get litres.' },
      ],
      lines: [
        { say: 'Here is what we need. The volume of a box is length times width times height. And 1 litre is a thousand cubic centimetres.', show: 'f' },
        { say: 'A litre fills a cube 10 centimetres on each side, and 10 times 10 times 10 is a thousand. So to change cubic centimetres to litres, divide by a thousand.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Multiply** the three lengths', 'Get the volume in **cm³**', '**Divide by $1000$** for litres'] }],
      lines: [
        { say: 'Here is the plan. Multiply the three lengths,', show: 'plan.0' },
        { say: 'to get the volume in cubic centimetres.', show: 'plan.1' },
        { say: 'Then divide by a thousand to get litres.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The volume',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['40 \\times 20 = 800', '800 \\times 120 = 96{,}000 \\text{ cm}^3'] }],
      lines: [
        { say: 'Step one. Multiply two of the lengths first: 40 times 20 is 800.', show: 'm.0' },
        { say: 'Then 800 times 120 is 96 thousand. The volume is 96 thousand cubic centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Litres',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['96{,}000 \\div 1000 = \\good{96 \\text{ L}}'] }],
      lines: [
        { say: 'Step two. Divide by a thousand to change cubic centimetres to litres. 96 thousand divided by a thousand is 96. The container holds 96 litres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\text{ dm} \\times 2 \\text{ dm} \\times 12 \\text{ dm} = 96 \\text{ dm}^3', '1 \\text{ dm}^3 = 1 \\text{ L} \\ \\Rightarrow \\ 96 \\text{ L} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. 10 centimetres is a decimetre, so the box is 4 by 2 by 12 decimetres. That is 96 cubic decimetres.', show: 'm.0' },
        { say: 'A cubic decimetre is exactly one litre, so the box holds 96 litres. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$96{,}000$ L', 'that is in **cm³**: divide by $1000$'],
            ['$960$ L', 'divided by only $100$'],
            ['$180$ L', '**added** the lengths: volume **multiplies**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '96 thousand is the volume in cubic centimetres, not litres. Divide by a thousand.' },
        { say: '960 litres divides by only 100. A litre is a thousand cubic centimetres.' },
        { say: 'And 180 adds the three lengths. Volume multiplies them.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A fish tank is $50$ cm long, $30$ cm wide and $40$ cm tall. How many litres can it hold?',
          choices: ['$600$ L', '$60$ L', '$6$ L', '$120$ L'],
          answer: 1,
          working: '$50 \\times 30 \\times 40 = 60{,}000$ cm³, and $60{,}000 \\div 1000 = 60$ L.',
        },
      ],
      lines: [
        { say: 'Your turn. A fish tank is 50 centimetres long, 30 centimetres wide and 40 centimetres tall. How many litres can it hold? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '50 times 30 times 40 is 60 thousand cubic centimetres. Divide by a thousand: 60 litres. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volume $= l \\times w \\times h$', 'cm $\\times$ cm $\\times$ cm gives **cm³**', '$1$ L $= 1000$ cm³', 'cm³ to litres: **divide by $1000$**'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a box is length times width times height.', show: 'sum.0' },
        { say: 'Lengths in centimetres give a volume in cubic centimetres.', show: 'sum.1' },
        { say: 'A litre is a thousand cubic centimetres.', show: 'sum.2' },
        { say: 'So to get litres, divide by a thousand. For more on volume and capacity, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
