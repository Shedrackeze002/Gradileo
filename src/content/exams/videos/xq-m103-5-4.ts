import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 5.4 (area units and material costs). The question is a Your
// Turn from OpenStax Contemporary Mathematics, word for word (section 10.6, Area, CC BY-NC-SA 4.0).
// 15 ft = 5 yd and 18 ft = 6 yd, so the floor is 5 × 6 = 30 square yards, as in the book's answer.
// Check: 15 × 18 = 270 sq ft, and 270 ÷ 9 = 30 sq yd, since 1 sq yd = 9 sq ft.

/** The bedroom floor, 18 ft by 15 ft, with a grid of square yards (3 ft by 3 ft). */
function floor(): Part {
  const points: Record<string, [number, number]> = { A: [0, 0], B: [18, 0], C: [18, 15], D: [0, 15] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'fill', points: ['A', 'B', 'C', 'D'], tone: 'brand', shade: 0.18, group: 'room' },
    { kind: 'line', id: 'len', from: 'A', to: 'B', tone: 'adj', weight: 3, label: '18 \\text{ ft}', labelSide: 'right', group: 'room' },
    { kind: 'line', id: 'right', from: 'B', to: 'C', tone: 'muted', group: 'room' },
    { kind: 'line', id: 'top', from: 'C', to: 'D', tone: 'muted', group: 'room' },
    { kind: 'line', id: 'wid', from: 'D', to: 'A', tone: 'opp', weight: 3, label: '15 \\text{ ft}', labelSide: 'right', group: 'room' },
  ];
  for (let x = 3; x < 18; x += 3) {
    points[`v${x}a`] = [x, 0];
    points[`v${x}b`] = [x, 15];
    items.push({ kind: 'line', id: `v${x}`, from: `v${x}a`, to: `v${x}b`, tone: 'theta', dashed: true, group: 'yards' });
  }
  for (let y = 3; y < 15; y += 3) {
    points[`h${y}a`] = [0, y];
    points[`h${y}b`] = [18, y];
    items.push({ kind: 'line', id: `h${y}`, from: `h${y}a`, to: `h${y}b`, tone: 'theta', dashed: true, group: 'yards' });
  }
  return { points, items };
}

const QUESTION =
  'You want to carpet your bedroom, which measures 15 ft wide by 18 ft long. Carpeting is sold by the square yard, so you must convert your measurements to yards. How much carpeting do you buy?';

const video: Explainer = {
  id: 'xq-m103-5-4',
  lessonId: '',
  exam: {
    lesson: 'm103-5-4',
    source: 'OpenStax, Contemporary Mathematics, Your Turn in section 10.6, Area',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/contemporary-mathematics/pages/10-6-area',
    question: QUESTION,
  },
  title: 'Exam Question: Carpet Sold by the Square Yard (Area Units and Material Costs)',
  thumbnailTitle: 'How Many Square Yards of Carpet?',
  thumbnail: 'fl',
  summary:
    'A real test question, solved one small step at a time: a bedroom is 15 ft wide by 18 ft long, and carpet is sold by the square yard. How much carpet do you buy? We change each length to yards first, 15 ft = 5 yd and 18 ft = 6 yd, then multiply: 5 × 6 = 30 square yards. Then we check with square feet, using 1 square yard = 9 square feet, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Square Yards of Carpet?', subtitle: 'Area units, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about area units and buying materials. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'You want to carpet your bedroom, which measures $15$ ft wide by $18$ ft long. Carpeting is sold by the square yard, so you must convert your measurements to yards. How much carpeting do you buy?',
          answer: '$30$ square yards',
          working: '$15$ ft $= 5$ yd, $18$ ft $= 6$ yd, and $5 \\times 6 = 30$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'You want to carpet your bedroom, which is 15 feet wide by 18 feet long. Carpet is sold by the square yard, so you must change your measurements to yards. How much carpet do you buy?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [figure('fl', [floor()], 420)],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Each dashed square is $3$ ft by $3$ ft: **one square yard**. How many cover the floor?' }],
      lines: [
        { say: 'Here is the bedroom floor, 18 feet long and 15 feet wide.', show: 'fl.room' },
        { say: 'Now split it into squares 3 feet on each side. Each one is a square yard, because a yard is 3 feet.', show: 'fl.yards' },
        { say: 'The question is: how many square yards cover the floor?', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['1 \\text{ yd} = 3 \\text{ ft}', '1 \\text{ sq yd} = 3 \\times 3 = 9 \\text{ sq ft}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Convert first', md: 'Change each **length** to yards **before** you multiply. Then the area comes out in **square yards**.' },
      ],
      lines: [
        { say: 'Here is what we need. One yard is 3 feet.', show: 'f.0' },
        { say: 'So one square yard is 3 feet by 3 feet, which is 9 square feet, not 3.', show: 'f.1' },
        { say: 'The easiest way is to change each length to yards before you multiply. Then the area comes out in square yards.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Change each length to **yards**', '**Multiply** for the area', '**Check** with square feet'] }],
      lines: [
        { say: 'Here is the plan. Change each length to yards.', show: 'plan.0' },
        { say: 'Multiply to find the area.', show: 'plan.1' },
        { say: 'Then check with square feet.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Lengths in yards',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15 \\text{ ft} \\div 3 = 5 \\text{ yd}', '18 \\text{ ft} \\div 3 = 6 \\text{ yd}'] }],
      lines: [
        { say: 'Step one. A yard is 3 feet, so divide each length by 3. 15 feet is 5 yards.', show: 'm.0' },
        { say: '18 feet is 6 yards. That matches the picture: 5 squares one way, 6 the other.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = 5 \\text{ yd} \\times 6 \\text{ yd} = \\good{30 \\text{ sq yd}}'] }],
      lines: [
        { say: 'Step two. The area is 5 yards times 6 yards, which is 30 square yards. You buy 30 square yards of carpet.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Check with square feet',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['15 \\times 18 = 270 \\text{ sq ft}', '270 \\div 9 = 30 \\text{ sq yd} \\ \\checkmark'] }],
      lines: [
        { say: 'Step three. Let us check with square feet. The floor is 15 times 18, which is 270 square feet.', show: 'm.0' },
        { say: 'Each square yard is 9 square feet, so divide by 9. 270 divided by 9 is 30 square yards, the same answer. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$270$', 'that is **square feet**: carpet is sold by the square yard'],
            ['$270 \\div 3 = 90$', '$1$ sq yd $= 9$ sq ft, not $3$'],
            ['$5 + 6 = 11$', 'area means **multiply**: $5 \\times 6$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '270 is the area in square feet. The carpet is sold by the square yard.' },
        { say: 'Dividing 270 by 3 gives 90, which is three times too much. A square yard is 3 feet by 3 feet, which is 9 square feet.' },
        { say: 'And area means multiply the lengths, not add them.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A hallway floor is $9$ ft by $12$ ft. Its flooring is sold by the square yard. How many square yards are needed?',
          choices: ['$108$ sq yd', '$12$ sq yd', '$36$ sq yd', '$7$ sq yd'],
          answer: 1,
          working: '$9$ ft $= 3$ yd and $12$ ft $= 4$ yd, so $3 \\times 4 = 12$ sq yd.',
        },
      ],
      lines: [
        { say: 'Your turn. A hallway floor is 9 feet by 12 feet. Its flooring is sold by the square yard. How many square yards are needed? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '9 feet is 3 yards, and 12 feet is 4 yards. 3 times 4 is 12 square yards. Choice B. As a check, 108 square feet divided by 9 is 12.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1$ yd $= 3$ ft', '$1$ sq yd $= 9$ sq ft', 'Convert the **lengths** first, then multiply', 'Buy in the unit the material is **sold** in'] }],
      lines: [
        { say: 'Here is what to remember. One yard is 3 feet.', show: 'sum.0' },
        { say: 'One square yard is 9 square feet.', show: 'sum.1' },
        { say: 'Convert the lengths first, then multiply.', show: 'sum.2' },
        { say: 'And give the amount in the unit the material is sold in. For more on area units and material costs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
