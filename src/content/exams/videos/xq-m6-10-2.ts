import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

// Exam question for Math 6 lesson 10.2 (volume of rectangular prisms). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 9.3, Measuring Volume, CC BY-NC-SA
// 4.0). One box: 25 × 8 × 35 = 7,000 cm³ = 7 L (1 L = 1,000 cm³). Boxes a day: 42,000 ÷ 7 = 6,000.

const QUESTION =
  'An ice cream maker boxes frozen yogurt mix in boxes that measure 25 cm long, 8 cm wide and 35 cm tall. They produce 42,000 liters of frozen yogurt mix each day. How many boxes of frozen yogurt mix are produced each day?';

const carton = (id: string) =>
  figure(id, [box({ l: 2.5, w: 1.4, h: 3.5, labels: { l: '25\\text{ cm}', w: '8\\text{ cm}', h: '35\\text{ cm}' } })], 320);

const video: Explainer = {
  id: 'xq-m6-10-2',
  lessonId: '',
  exam: {
    lesson: 'm6-10-2',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 9.3, Measuring Volume',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/9-3-measuring-volume',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Boxes of Frozen Yogurt? (Volume of Rectangular Prisms)',
  thumbnailTitle: 'How Many Boxes?',
  thumbnail: 'bx',
  summary:
    'A real test question, solved one small step at a time: frozen yogurt mix is packed in boxes 25 cm long, 8 cm wide and 35 cm tall, and the factory makes 42,000 litres a day. How many boxes is that? The volume of one box is 25 × 8 × 35 = 7,000 cubic centimetres, and 1,000 cubic centimetres is 1 litre, so each box holds 7 litres. 42,000 ÷ 7 = 6,000 boxes a day. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Boxes?', subtitle: 'Volume of rectangular prisms, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume of a box. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'An ice cream maker boxes frozen yogurt mix in boxes that measure $25$ cm long, $8$ cm wide and $35$ cm tall. They produce $42{,}000$ liters of frozen yogurt mix each day. How many boxes of frozen yogurt mix are produced each day?',
          answer: '$6{,}000$ boxes',
          working: '25 × 8 × 35 = 7,000 cm³ = 7 L; 42,000 ÷ 7 = 6,000',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'An ice cream maker boxes frozen yogurt mix in boxes that measure 25 centimetres long, 8 centimetres wide and 35 centimetres tall. They produce 42 thousand litres of frozen yogurt mix each day. How many boxes of frozen yogurt mix are produced each day?', caption: 'Boxes measure 25 cm long, 8 cm wide and 35 cm tall. They produce 42,000 litres of frozen yogurt mix each day. How many boxes are produced each day?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 440,
      left: [carton('ct')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A box of mix', md: 'Each box is a **rectangular prism**. The factory fills boxes with **42,000 litres** of mix a day. We need **how many boxes** that fills, so we need how much **one box** holds.' }],
      lines: [
        { say: 'Each box is a rectangular prism: 25 centimetres long, 8 wide and 35 tall.', show: ['ct.shape', 'ct.front-face', 'ct.top-face', 'ct.side-face', 'ct.l', 'ct.w', 'ct.h'] },
        { say: 'The factory fills boxes with 42 thousand litres of mix a day. To find how many boxes that fills, we first need how much one box holds.', show: 'c', focus: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = l \\times w \\times h', '1{,}000 \\text{ cm}^3 = 1 \\text{ L}'] }],
      lines: [
        { say: 'Here is what we need. The volume of a rectangular prism is length times width times height.', show: 'm.0' },
        { say: 'And a litre is 1 thousand cubic centimetres. A litre fills a cube 10 centimetres on each side.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **volume** of one box', 'Change it to **litres**', '**Divide** the day\'s litres by the litres in one box'] }],
      lines: [
        { say: 'Here is the plan. Find the volume of one box.', show: 'plan.0' },
        { say: 'Change it to litres.', show: 'plan.1' },
        { say: 'Then divide the litres made each day by the litres in one box.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Volume, litres, boxes',
      layout: 'split',
      leftWidth: 440,
      left: [carton('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['25 \\times 8 = 200', '200 \\times 35 = 7{,}000 \\text{ cm}^3', '7{,}000 \\div 1{,}000 = 7 \\text{ L}', '42{,}000 \\div 7 = \\good{6{,}000 \\text{ boxes}}'] }],
      lines: [
        { say: 'Step one. Multiply the length by the width first: 25 times 8 is 200.', show: ['st.shape', 'st.front-face', 'st.top-face', 'st.side-face', 'st.l', 'st.w', 'st.h', 'm.0'], focus: 'm.0' },
        { say: 'Then times the height: 200 times 35 is 7 thousand. One box holds 7 thousand cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. Every 1 thousand cubic centimetres is 1 litre, so 7 thousand cubic centimetres is 7 litres.', show: 'm.2', focus: 'm.2' },
        { say: 'Step three. Each box holds 7 litres, and they make 42 thousand litres. 42 thousand divided by 7 is 6 thousand. They produce 6 thousand boxes each day.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6{,}000 \\times 7 = 42{,}000 \\text{ L} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 6 thousand boxes, with 7 litres in each, is 6 thousand times 7, which is 42 thousand litres. That is what the factory makes. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$6$ boxes', 'divided $42{,}000$ by $7{,}000$: change cm³ to **litres** first'],
            ['$68$ boxes', '**added** $25 + 8 + 35$: volume **multiplies**'],
            ['$7{,}000$', 'that is the volume of **one** box, not the number of boxes'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '6 boxes divides litres by cubic centimetres. The units must match, so change the 7 thousand cubic centimetres to 7 litres first.' },
        { say: '68 adds the three lengths. Volume multiplies them.' },
        { say: 'And 7 thousand is the volume of one box, not the answer. Keep going to the number of boxes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A fish tank is $50$ cm long, $20$ cm wide and $30$ cm tall. How many litres of water does it hold when full? ($1{,}000$ cm³ $= 1$ L)',
          choices: ['$100$ L', '$3{,}000$ L', '$300$ L', '$30$ L'],
          answer: 3,
          working: '50 × 20 × 30 = 30,000 cm³, and 30,000 ÷ 1,000 = 30 L.',
        },
      ],
      lines: [
        { say: 'Your turn. A fish tank is 50 centimetres long, 20 wide and 30 tall. How many litres of water does it hold when full? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '50 times 20 is 1 thousand, and times 30 is 30 thousand cubic centimetres. Divide by 1 thousand: 30 litres. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$V = l \\times w \\times h$', '$1{,}000$ cm³ $= 1$ litre', 'Make the **units match** before dividing', '**Divide** the total by one box'] }],
      lines: [
        { say: 'Here is what to remember. The volume of a box is length times width times height.', show: 'sum.0' },
        { say: '1 thousand cubic centimetres is 1 litre.', show: 'sum.1' },
        { say: 'Make the units match before you divide.', show: 'sum.2' },
        { say: 'And to find how many boxes, divide the total by what one box holds. For more on the volume of rectangular prisms, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
