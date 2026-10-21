import type { Explainer } from '@/video/script.ts';
import { boxNet, figure } from '@/video/solids.ts';

// Owen's planter box: 80 cm long, 30 cm wide and 25 cm high, with no top (drawn at a tenth of its size).
const net = boxNet({ l: 8, w: 3, h: 2.5, labels: { l: '80', w: '30', h: '25' }, areas: { bottom: '2\\,400', front: '2\\,000', back: '2\\,000', left: '750', right: '750' } });
// With no top, the net has no rectangle above the front.
const open = { points: Object.fromEntries(Object.entries(net.points).filter(([k]) => !k.startsWith('top'))), items: net.items.filter((i) => !i.id.startsWith('top')) };
const planter = figure('pl', [open], 440);
// Every face except the top, with the area on each.
const OPEN = ['bottom', 'front', 'back', 'left', 'right'].flatMap((f) => [`pl.${f}`, `pl.${f}-edge`, `pl.${f}-area`]);

const video: Explainer = {
  id: 'm8-8-3-e',
  lessonId: 'm8-8-3',
  title: 'Surface Area of Prisms, Part 5: Solving Problems',
  thumbnailTitle: 'Which Faces Count?',
  thumbnail: 'pl',
  summary:
    'Read a problem to decide which faces count: an open box has no top, a tent may have no floor. A planter box 80 cm long, 30 cm wide and 25 cm high with no top needs 2,400 + 4,000 + 1,500 = 7,900 cm² of wood. When paint comes in cans, divide the area by what one can covers and round up: 2.13 m² with cans that cover 0.8 m² each needs 2.13 ÷ 0.8 ≈ 2.66, so 3 cans.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 5', title: 'Solving Problems', subtitle: 'Which faces count, and how much to buy' }],
      lines: [
        { say: 'Real objects are not always closed boxes. A planter box has no lid, and a tent might have no floor.', show: 'title' },
        { say: 'In this video, you will read a problem carefully to decide which faces count, and work out how many cans of paint to buy.' },
      ],
    },
    {
      chapter: 'Which faces count?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['An **open** box has no top.', 'A tent may have **no floor**.', 'A box painted on the outside may not be painted on the **bottom**.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the problem first', md: 'Before you calculate, list the faces the problem needs. Then add only those.' },
      ],
      lines: [
        { say: 'Before you calculate, read the problem, and decide which faces count.', show: 'tip' },
        { say: 'An open box has no top. So leave the top out.', show: 'b.0' },
        { say: 'A tent may have no floor. Then you add only the ends and the sloped sides.', show: 'b.1' },
        { say: 'And a box that stands on the ground may not be painted on the bottom. Make a list of the faces you need, then add only those.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A planter box',
      layout: 'split',
      leftWidth: 600,
      left: [planter],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['80 \\times 30 = 2\\,400', '2 \\times 80 \\times 25 = 4\\,000', '2 \\times 30 \\times 25 = 1\\,500', '\\text{Total: } 7\\,900\\text{ cm}^2'],
        },
      ],
      lines: [
        { say: 'Owen builds a wooden planter box with no top. It is eighty centimetres long, thirty centimetres wide, and twenty-five centimetres high. How much wood covers the outside?', show: ['pl.bottom', 'pl.bottom-edge', 'pl.front', 'pl.front-edge', 'pl.back', 'pl.back-edge', 'pl.left', 'pl.left-edge', 'pl.right', 'pl.right-edge', 'pl.l', 'pl.w', 'pl.h'] },
        { say: 'The box has no top, so its net has only five faces. There is no rectangle above the front.', focus: 'pl.front' },
        { say: 'The bottom is eighty by thirty, which is two thousand four hundred square centimetres.', show: ['m.0', 'pl.bottom-area'], focus: ['m.0', 'pl.bottom'] },
        { say: 'The front and the back are each eighty by twenty-five, which is two thousand. Together, four thousand.', show: ['m.1', 'pl.front-area', 'pl.back-area'], focus: ['m.1', 'pl.fb'] },
        { say: 'The two ends are each thirty by twenty-five, which is seven hundred fifty. Together, one thousand five hundred.', show: ['m.2', 'pl.left-area', 'pl.right-area'], focus: ['m.2', 'pl.ends'] },
        { say: 'Add them: two thousand four hundred plus four thousand plus one thousand five hundred is seven thousand nine hundred. The box needs seven thousand nine hundred square centimetres of wood.', show: [...OPEN, 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Buying paint',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'text', id: 'q', size: 'md', md: 'You need to paint $2.13\\text{ m}^2$. One can of paint covers $0.8\\text{ m}^2$. How many cans do you buy?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2.13 \\div 0.8 \\approx 2.66', '\\text{Buy } 3 \\text{ cans}'] },
      ],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Round up', md: 'Divide the area by the amount one can or roll covers, then **round up**. Part of a can is not enough.' }],
      lines: [
        { say: 'Paint and fabric often come in cans or rolls. Suppose you need to paint two point one three square metres, and one can covers zero point eight square metres. How many cans do you buy?', show: 'q' },
        { say: 'Divide the area by the amount one can covers. Two point one three divided by zero point eight is about two point six six.', show: 'm.0', focus: 'm.0' },
        { say: 'Two cans would not be enough: they cover only one point six square metres. You need part of a third can, and a store sells whole cans.', show: 'key' },
        { say: 'So you buy three cans. Even if the answer were two point one, you would still need three cans, because part of a can is not enough. So always round up.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An open box with **no top** is $20$ cm long, $10$ cm wide and $10$ cm high. What is the area of its outside?',
          choices: ['$800\\text{ cm}^2$', '$1\\,000\\text{ cm}^2$', '$600\\text{ cm}^2$', '$2\\,000\\text{ cm}^2$'],
          answer: 0,
          working: 'Bottom: $20 \\times 10 = 200$. Front and back: $2 \\times 20 \\times 10 = 400$. Ends: $2 \\times 10 \\times 10 = 200$. Total: $200 + 400 + 200 = 800\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. An open box with no top is twenty centimetres long, ten centimetres wide and ten centimetres high. What is the area of its outside? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, eight hundred square centimetres. The bottom is two hundred, the front and back make four hundred, and the two ends make two hundred. Choice B also adds a top, but this box has no top.', show: 'q.answer' },
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
          items: ['Read the problem: count only the faces it needs.', 'An open box has no top; a tent may have no floor.', 'Cans or rolls: divide by what one covers, then **round up**.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Read each problem carefully, and count only the faces it needs.', show: 'sum.0' },
        { say: 'An open box has no top, and a tent may have no floor.', show: 'sum.1' },
        { say: 'When paint or fabric comes in cans or rolls, divide by what one covers, then round up. Well done! Next, you will find the surface area of a cylinder.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
