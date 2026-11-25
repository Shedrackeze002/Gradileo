import type { DiagramEl, DiagramItem, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 2.3 (surface area applications). The question is a Your Turn
// from OpenStax Contemporary Mathematics, word for word (section 10.6, Area, CC BY-NC-SA 4.0). The
// floor is 30 × 15 = 450 ft², one box covers 10 ft², so 450 ÷ 10 = 45 boxes, and 45 × $45 = $2,025,
// as in the book's answer. Check: $2,025 ÷ 450 ft² = $4.50 per square foot = $45 ÷ 10 ft².

/** The 30 ft by 15 ft floor, split into the 45 patches of 10 ft² (2 ft by 5 ft) that one box covers each. */
const floor = (height = 330, grid = true): DiagramEl => {
  const points: Record<string, [number, number]> = { A: [0, 0], B: [30, 0], C: [30, 15], D: [0, 15] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'fl', points: ['A', 'B', 'C', 'D'], tone: 'adj', shade: 0.2, group: 'room' },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'ink', weight: 3, label: '30 \\text{ ft}', labelSide: 'right', group: 'room' },
    { kind: 'line', id: 'bc', from: 'B', to: 'C', tone: 'ink', weight: 3, group: 'room' },
    { kind: 'line', id: 'cd', from: 'C', to: 'D', tone: 'ink', weight: 3, group: 'room' },
    { kind: 'line', id: 'da', from: 'D', to: 'A', tone: 'ink', weight: 3, label: '15 \\text{ ft}', labelSide: 'right', group: 'room' },
  ];
  for (let x = 2; grid && x < 30; x += 2) {
    points[`v${x}a`] = [x, 0];
    points[`v${x}b`] = [x, 15];
    items.push({ kind: 'line', id: `v${x}`, from: `v${x}a`, to: `v${x}b`, tone: 'muted', weight: 1, group: 'boxes' });
  }
  for (const y of grid ? [5, 10] : []) {
    points[`h${y}a`] = [0, y];
    points[`h${y}b`] = [30, y];
    items.push({ kind: 'line', id: `h${y}`, from: `h${y}a`, to: `h${y}b`, tone: 'muted', weight: 1, group: 'boxes' });
  }
  points.P = [0, 15];
  points.Q = [2, 15];
  points.R = [2, 10];
  points.S = [0, 10];
  points.pl = [2, 12.5];
  items.push({ kind: 'region', id: 'one', points: ['P', 'Q', 'R', 'S'], tone: 'opp', shade: 0.7, group: 'one' });
  items.push({ kind: 'label', id: 'onel', at: 'pl', tex: '1 \\text{ box} = 10 \\text{ ft}^2', tone: 'opp', place: 'right', group: 'one' });
  return { kind: 'diagram', id: 'fl', height, points, items };
};

const QUESTION =
  'You remodel your kitchen and decide to change out the tile floor. The floor measures 30 ft by 15 ft. One box of tile costs $45 and covers 10 ft². How many boxes of tile should you buy, and what will it cost?';

const video: Explainer = {
  id: 'xq-m203-2-3',
  lessonId: '',
  exam: {
    lesson: 'm203-2-3',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.6, Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-6-area',
    question: QUESTION,
  },
  title: 'Exam Question: Tiling a Kitchen Floor (Area and Cost)',
  thumbnailTitle: 'How Much Will the Tile Cost?',
  thumbnail: 'fl',
  summary:
    'A real test question, solved one small step at a time: a kitchen floor measures 30 ft by 15 ft. One box of tile costs $45 and covers 10 square feet. How many boxes should you buy, and what will they cost? The floor is 30 × 15 = 450 square feet, so you need 450 ÷ 10 = 45 boxes, and 45 boxes at $45 each cost $2,025. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Tiling a Kitchen Floor', subtitle: 'Area and cost, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about area and cost. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You remodel your kitchen and decide to change out the tile floor. The floor measures $30$ ft by $15$ ft. One box of tile costs \\$45 and covers $10\\ \\text{ft}^2$. How many boxes of tile should you buy, and what will it cost?',
          answer: '$45$ boxes, costing \\$2,025',
          working: '$30 \\times 15 = 450$, $450 \\div 10 = 45$, $45 \\times 45 = 2{,}025$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You remodel your kitchen, and decide to change the tile floor. The floor measures 30 feet by 15 feet.' },
        { say: 'One box of tile costs 45 dollars, and covers 10 square feet. How many boxes of tile should you buy, and what will it cost?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [floor(330, false), { kind: 'text', id: 't', size: 'md', md: 'Tile is sold by the **box**, so turn the floor\'s **area** into boxes, then boxes into **dollars**.' }],
      lines: [
        { say: 'Here is the floor, 30 feet by 15 feet.', show: ['fl', 'fl.room'] },
        { say: 'Each box covers a patch of 10 square feet, like this one.', show: 'fl.one' },
        { say: 'Tile is sold by the box, so we turn the area of the floor into boxes, and then the boxes into dollars.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A = l \\times w', '\\text{boxes} = \\dfrac{\\text{area}}{\\text{area for each box}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Round up', md: 'You can only buy **whole** boxes. If the division does not come out even, **round up**, or part of the floor goes bare.' },
      ],
      lines: [
        { say: 'Here is what we need. The area of a rectangle is length times width.', show: 'f.0' },
        { say: 'The number of boxes is the area, divided by the area that each box covers.', show: 'f.1' },
        { say: 'You can only buy whole boxes. If the division does not come out even, round up, or part of the floor goes bare.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **area** of the floor', 'Divide to get the number of **boxes**', '**Multiply** by the price of a box'] }],
      lines: [
        { say: 'Here is the plan. Find the area of the floor.', show: 'plan.0' },
        { say: 'Divide to get the number of boxes.', show: 'plan.1' },
        { say: 'Then multiply by the price of one box.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The area',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = 30 \\times 15 = 450 \\text{ ft}^2'] }],
      lines: [
        { say: 'Step one. The floor is 30 feet by 15 feet. 30 times 15 is 450 square feet.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: The boxes',
      layout: 'center',
      main: [floor(300), { kind: 'math', id: 'm', size: 'md', lines: ['450 \\div 10 = \\good{45 \\text{ boxes}}'] }],
      lines: [
        { say: 'Step two. Each box covers 10 square feet, so 450 divided by 10 is 45 boxes.', show: ['fl', 'fl.room', 'fl.boxes', 'fl.one', 'm'], focus: 'm' },
        { say: 'Here they are as patches: 15 across and 3 down, which is 45. It divides evenly, so 45 boxes is just enough, with no rounding.' },
      ],
    },
    {
      chapter: 'Step 3: The cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['45 \\times \\$45 = \\good{\\$2{,}025}'] }],
      lines: [
        { say: 'Step three. 45 boxes at 45 dollars each is 2 thousand and 25 dollars.', caption: 'Step three. 45 boxes at 45 dollars each is 2,025 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'So you should buy 45 boxes of tile, and they will cost 2 thousand and 25 dollars.', caption: 'So you should buy 45 boxes of tile, and they will cost 2,025 dollars.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\$45}{10 \\text{ ft}^2} = \\$4.50 \\text{ per ft}^2', '450 \\times \\$4.50 = \\$2{,}025 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another way. A box costs 45 dollars for 10 square feet, which is 4 dollars 50 for each square foot.', caption: 'Let us check another way. A box costs 45 dollars for 10 square feet, which is 4.50 dollars for each square foot.', show: 'm.0' },
        { say: '450 square feet at 4 dollars 50 each is 2 thousand and 25 dollars. It checks out.', caption: '450 square feet at 4.50 dollars each is 2,025 dollars. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['\\$20,250', 'multiplied the **area** by the price: price is per **box**'],
            ['\\$405', 'used the **perimeter**, $90$ ft: tile covers the **area**'],
            ['\\$202.50', 'multiplied the boxes by \\$4.50: that is per **square foot**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '20 thousand 250 dollars multiplies 450 square feet by 45 dollars. But 45 dollars is the price of a box, not of a square foot.', caption: '20,250 dollars multiplies 450 square feet by 45 dollars. But 45 dollars is the price of a box, not of a square foot.' },
        { say: '405 dollars uses the perimeter, 90 feet, as if tile went round the edge. Tile covers the whole area.' },
        { say: 'And 202 dollars 50 multiplies the 45 boxes by the price of a square foot. Use the price of a box with the number of boxes.', caption: 'And 202.50 dollars multiplies the 45 boxes by the price of a square foot. Use the price of a box with the number of boxes.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A bathroom floor is $12$ ft by $10$ ft. One box of tile costs \\$30 and covers $15\\ \\text{ft}^2$. What will the tile cost?',
          choices: ['\\$3,600', '\\$90', '\\$240', '\\$8'],
          answer: 2,
          working: '$12 \\times 10 = 120\\ \\text{ft}^2$, $120 \\div 15 = 8$ boxes, and $8 \\times 30 = 240$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A bathroom floor is 12 feet by 10 feet. One box of tile costs 30 dollars and covers 15 square feet. What will the tile cost? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The area is 120 square feet. 120 divided by 15 is 8 boxes, and 8 times 30 is 240 dollars. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **area** first', 'Area $\\div$ coverage $=$ **boxes**', '**Round up** to whole boxes', 'Boxes $\\times$ price of a **box**'] }],
      lines: [
        { say: 'Here is what to remember. Find the area first.', show: 'sum.0' },
        { say: 'Divide by the area each box covers, to get the number of boxes.', show: 'sum.1' },
        { say: 'Round up to whole boxes.', show: 'sum.2' },
        { say: 'And multiply by the price of one box. For more on surface area applications, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
