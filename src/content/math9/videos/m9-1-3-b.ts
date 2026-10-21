import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cake } from './lib/m9-1-figures.ts';

const DIMS = { l1: '40\\text{ cm}', w1: '30\\text{ cm}', h1: '10\\text{ cm}', l2: '20\\text{ cm}', w2: '15\\text{ cm}', h2: '10\\text{ cm}' };
// The two-layer cake, joined, and with the top layer lifted off to show where the layers touch.
// Room on the left for the height label.
const joined = figure('d', [cake({ bottom: [40, 30, 10], top: [20, 15, 10], labels: DIMS }), { points: { room: [-3, 5] }, items: [] }], 440);
const lifted = figure('d', [cake({ bottom: [40, 30, 10], top: [20, 15, 10], lift: 9, labels: { l2: '20\\text{ cm}', w2: '15\\text{ cm}' } })], 470);

const video: Explainer = {
  id: 'm9-1-3-b',
  lessonId: 'm9-1-3',
  title: 'Surface Area of Composite Objects, Part 2: Two Rectangular Prisms',
  thumbnailTitle: 'Two Rectangular Prisms',
  thumbnail: 'd',
  summary:
    'When two solids touch, two faces are hidden, so SA = SA₁ + SA₂ − 2 × (overlap area). A cake with a 40 cm by 30 cm by 10 cm bottom layer and a 20 cm by 15 cm by 10 cm top layer has SA = 3800 + 1300 − 2 × 300 = 4500 cm². Subtracting the overlap only once leaves a hidden face in the total; if the cake is not iced underneath, subtract the bottom as well: 4500 − 1200 = 3300 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Square Roots and Surface Area · Part 2', title: 'Two Rectangular Prisms', subtitle: 'Subtract the overlap twice' }],
      lines: [
        { say: 'A baker makes a cake with two layers, a big one on the bottom and a smaller one on top, and wants to know how much icing it needs.', show: 'title' },
        { say: 'In this part, you will find the surface area of an object made of two rectangular prisms, and see why the overlap is subtracted twice.' },
      ],
    },
    {
      chapter: 'Where the layers touch',
      layout: 'split',
      leftWidth: 560,
      left: [lifted],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{overlap} = 20 \\times 15', '\\phantom{\\text{overlap}} = 300\\text{ cm}^2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two solids that touch', md: 'Add the surface areas of the two solids, then subtract the overlap area **twice**: $SA = SA_1 + SA_2 - 2 \\times$ overlap.' },
      ],
      lines: [
        { say: 'Imagine lifting the top layer off the cake. Where the layers touched, two faces were hidden.', show: ['d.bottom', 'd.top'] },
        { say: 'One is the patch on top of the bottom layer, where the top layer sat.', show: 'd.overlap', focus: 'd.overlap' },
        { say: 'The other is the bottom face of the top layer itself. It faces down, so here it is drawn with a dashed outline.', show: 'd.under', focus: 'd.under' },
        { say: 'Both have the same size as the bottom of the top layer: twenty centimetres by fifteen centimetres, which is three hundred square centimetres. That area is the overlap.', show: ['d.t-l', 'd.t-w', 'm.0'], focus: 'm.0' },
        { say: 'So find the surface area of each layer, add them, and subtract the overlap twice: once for each hidden face.', show: 'key' },
      ],
    },
    {
      chapter: 'The bottom layer',
      layout: 'split',
      leftWidth: 540,
      left: [joined],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Bottom layer: $40\\text{ cm}$ by $30\\text{ cm}$ by $10\\text{ cm}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 40 \\times 30 = 2400', '2 \\times 40 \\times 10 = 800', '2 \\times 30 \\times 10 = 600', 'SA_1 = 3800\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Here is the whole cake. The bottom layer is forty centimetres long, thirty centimetres wide and ten centimetres high.', show: ['d.bottom', 'd.top', 'd.b-l', 'd.b-w', 'd.b-h', 'q'], focus: 'd.bottom' },
        { say: 'A rectangular prism has three pairs of matching faces. The top and the bottom are each forty by thirty. Two times forty times thirty is two thousand four hundred.', show: 'm.0', focus: ['m.0', 'd.b-top'] },
        { say: 'The front and the back are each forty by ten. Two times forty times ten is eight hundred.', show: 'm.1', focus: ['m.1', 'd.b-front'] },
        { say: 'The two ends are each thirty by ten. Two times thirty times ten is six hundred.', show: 'm.2', focus: ['m.2', 'd.b-side'] },
        { say: 'Add them: two thousand four hundred plus eight hundred plus six hundred is three thousand eight hundred square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The top layer',
      layout: 'split',
      leftWidth: 540,
      left: [joined],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Top layer: $20\\text{ cm}$ by $15\\text{ cm}$ by $10\\text{ cm}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 20 \\times 15 = 600', '2 \\times 20 \\times 10 = 400', '2 \\times 15 \\times 10 = 300', 'SA_2 = 1300\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'The top layer is twenty centimetres long, fifteen centimetres wide and ten centimetres high. It sits on the middle of the bottom layer.', show: ['d.bottom', 'd.top', 'd.t-l', 'd.t-w', 'd.t-h', 'q'], focus: 'd.top' },
        { say: 'Use the same pairs of faces. The top and the bottom give two times twenty times fifteen, which is six hundred.', show: 'm.0', focus: ['m.0', 'd.t-top'] },
        { say: 'The front and the back give two times twenty times ten, which is four hundred. The two ends give two times fifteen times ten, which is three hundred.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2', 'd.t-front', 'd.t-side'] },
        { say: 'Six hundred plus four hundred plus three hundred is one thousand three hundred square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Put it together',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['SA = SA_1 + SA_2 - 2 \\times (\\text{overlap area})', 'SA = 3800 + 1300 - 2 \\times 300', 'SA = 5100 - 600', 'SA = 4500\\text{ cm}^2'],
        },
      ],
      lines: [
        { say: 'Now put it together. The surface area is the first surface area, plus the second, take away two times the overlap.', show: 'm.0', focus: 'm.0' },
        { say: 'That is three thousand eight hundred, plus one thousand three hundred, take away two times three hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'Three thousand eight hundred plus one thousand three hundred is five thousand one hundred. Two times three hundred is six hundred.', show: 'm.2', focus: 'm.2' },
        { say: 'Five thousand one hundred take away six hundred is four thousand five hundred. The surface area of the cake is four thousand five hundred square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Subtracting once',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting the overlap once', md: 'Subtracting $300$ only once leaves the hidden top of the bottom layer in the total. Both touching faces are inside the cake, so subtract the overlap **twice**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{3800 + 1300 - 300 = 4800}', '\\good{3800 + 1300 - 2 \\times 300 = 4500\\text{ cm}^2}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Some people subtract the overlap only once, and get four thousand eight hundred.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That takes away the bottom of the top layer, but it still counts the patch on top of the bottom layer, which is hidden under the top layer. Nobody can ice it.' },
        { say: 'Both touching faces are inside the cake, so subtract the overlap twice. The answer is four thousand five hundred square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'No icing underneath',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the problem', md: 'A cake is not iced underneath. If the bottom of an object is not covered, subtract the area of the bottom as well.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{bottom} = 40 \\times 30 = 1200\\text{ cm}^2', '4500 - 1200 = 3300\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Now read the problem carefully. A cake is not iced underneath, because it sits on a plate.', show: 'tip' },
        { say: 'If the question asks how much of the cake gets icing, take away the bottom of the bottom layer as well. It is forty by thirty, which is one thousand two hundred square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Four thousand five hundred take away one thousand two hundred is three thousand three hundred. So three thousand three hundred square centimetres of cake get icing.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box $10$ cm long, $10$ cm wide and $4$ cm high has a cube with edges of $4$ cm glued on top. What is the surface area of the whole object, including the bottom?',
          choices: ['$456\\text{ cm}^2$', '$424\\text{ cm}^2$', '$440\\text{ cm}^2$', '$324\\text{ cm}^2$'],
          answer: 1,
          working: 'Box: $2(100 + 40 + 40) = 360$. Cube: $6 \\times 16 = 96$. Overlap: $4 \\times 4 = 16$. $SA = 360 + 96 - 2 \\times 16 = 424\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box ten centimetres long, ten centimetres wide and four centimetres high has a cube with edges of four centimetres glued on top. What is the surface area of the whole object, including the bottom? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B, four hundred twenty-four square centimetres. The box has three hundred sixty, the cube has ninety-six, and the overlap of sixteen is subtracted twice. Choice C subtracts the overlap only once, so it still counts the hidden part of the top of the box.', show: 'q.answer' },
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
          items: [
            'Find the surface area of each part, then subtract the overlap **twice**.',
            '$SA = SA_1 + SA_2 - 2 \\times (\\text{overlap area})$',
            'Two layers of cake: $3800 + 1300 - 2 \\times 300 = 4500\\text{ cm}^2$.',
            'Leave out any surface, like the bottom, that is not covered.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the surface area of two solids that touch, find the surface area of each part, then subtract the overlap twice.', show: ['sum.0', 'sum.1'] },
        { say: 'For the two layers of cake, that gave four thousand five hundred square centimetres.', show: 'sum.2' },
        { say: 'And read the problem: leave out any surface, like the bottom, that is not covered. In the next part, you will put a cylinder on a prism. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
