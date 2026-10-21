import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

// The cube-shaped gift box: edges of 4 cm, each face cut into 4 by 4 squares of 1 cm.
const giftBox = figure('bx', [box({ l: 4, w: 4, h: 4, cells: 4, labels: { l: '4\\text{ cm}', w: '4\\text{ cm}', h: '4\\text{ cm}' } }), { points: { room: [-1.4, 2] }, items: [] }], 460);

const video: Explainer = {
  id: 'm9-2-4',
  lessonId: 'm9-2-4',
  title: 'Using Exponents to Solve Problems, Part 1: Area and Volume',
  thumbnailTitle: 'Area and Volume',
  thumbnail: 'bx',
  summary:
    'The area of a square with side s is A = s², the volume of a cube with edge s is V = s³, and the surface area of a cube is SA = 6s², because a cube has 6 square faces. A cube-shaped gift box with edges of 4 cm has V = 4³ = 64 cm³ and SA = 6 × 4² = 96 cm². Area is in square units and volume in cubic units: the exponent on the unit matches the exponent in the formula.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 1', title: 'Area and Volume', subtitle: 'Squares, cubes and their units' }],
      lines: [
        { say: 'A video shared online can reach thousands of people in a few hours. Bacteria in a warm kitchen can double every twenty minutes. Powers are the natural way to describe growth like this.', show: 'title' },
        { say: 'In this lesson, you will use powers to solve problems. This first part starts with something you have met before: areas and volumes.' },
      ],
    },
    {
      chapter: 'Squares and cubes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Squares and cubes', md: 'The area of a square and the volume of a cube are powers of the side length $s$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{square: } A = s^2', '\\text{cube: } V = s^3', '\\text{cube: } SA = 6s^2'] },
      ],
      lines: [
        { say: 'The area of a square and the volume of a cube are powers of the side length.', show: 'key' },
        { say: 'A square with side s has an area of s squared: s times s. That is why the power two is called squared.', show: 'm.0', focus: 'm.0' },
        { say: 'A cube with edge s has a volume of s cubed: s times s times s. That is why the power three is called cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'And a cube has six faces, each a square with an area of s squared. So its surface area is six times s squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A gift box',
      layout: 'split',
      leftWidth: 520,
      left: [giftBox],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A cube-shaped gift box has edges of $4\\ \\text{cm}$. Find its volume and its surface area.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['V = 4^3 = 4 \\times 4 \\times 4', '\\phantom{V} = 64\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A cube-shaped gift box has edges of four centimetres. Find its volume and its surface area.', show: ['q', 'bx.shape', 'bx.front-face', 'bx.top-face', 'bx.side-face', 'bx.l', 'bx.w', 'bx.h'] },
        { say: 'Start with the volume. Volume is the edge cubed: four cubed, which is four times four times four.', show: 'm.0', focus: 'm.0' },
        { say: 'Picture the box filled with one-centimetre cubes. Each layer is four by four, which is sixteen cubes, and there are four layers.', show: 'bx.cells' },
        { say: 'Four times four is sixteen, and sixteen times four is sixty-four. The volume is sixty-four cubic centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Surface area',
      layout: 'split',
      leftWidth: 520,
      left: [giftBox],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{one face: } 4^2 = 16\\text{ cm}^2', 'SA = 6 \\times 16', '\\phantom{SA} = 96\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Now the surface area. Each face is a square with sides of four centimetres.', show: ['bx.shape', 'bx.front-face', 'bx.top-face', 'bx.side-face', 'bx.cells', 'bx.l', 'bx.w', 'bx.h'], focus: 'bx.front-face' },
        { say: 'One face has an area of four squared, which is sixteen square centimetres. You can count the sixteen small squares on the front.', show: 'm.0', focus: 'm.0' },
        { say: 'A cube has six faces, all the same. Six times sixteen is ninety-six. The surface area is ninety-six square centimetres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Square and cubic units',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Square and cubic units', md: 'Area is measured in **square** units ($\\text{cm}^2$) and volume in **cubic** units ($\\text{cm}^3$). The exponent on the unit matches the exponent in the formula.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['V = 4^3 = 64\\text{ cm}^{\\thc{3}}', 'SA = 6 \\times 4^2 = 96\\text{ cm}^{\\thc{2}}'] },
      ],
      lines: [
        { say: 'Watch the units. A common mistake is to write the volume in square centimetres, or the area in cubic centimetres.', show: 'oops' },
        { say: 'Volume uses three lengths multiplied together, so it is measured in centimetres cubed. Its formula has the exponent three.', show: 'm.0', focus: 'm.0' },
        { say: 'Area uses two lengths multiplied together, so it is measured in centimetres squared. The exponent on the unit matches the exponent in the formula.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cube has edges of $5\\ \\text{cm}$. What is its surface area?',
          choices: ['$150\\text{ cm}^2$', '$125\\text{ cm}^2$', '$30\\text{ cm}^2$', '$900\\text{ cm}^2$'],
          answer: 0,
          working: 'One face: $5^2 = 25\\text{ cm}^2$. Six faces: $SA = 6 \\times 25 = 150\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cube has edges of five centimetres. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one hundred fifty square centimetres. One face is five squared, or twenty-five, and six faces make one hundred fifty. Choice B, one hundred twenty-five, is five cubed. That is the volume, in cubic centimetres, not the surface area.', show: 'q.answer' },
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
            'Area of a square: $s^2$. Volume of a cube: $s^3$. Surface area of a cube: $6s^2$.',
            'A cube with edges of $4$ cm: $V = 4^3 = 64\\text{ cm}^3$ and $SA = 6 \\times 4^2 = 96\\text{ cm}^2$.',
            'Area is in square units; volume is in cubic units.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The area of a square is s squared, the volume of a cube is s cubed, and the surface area of a cube is six s squared.', show: 'sum.0' },
        { say: 'So a cube with edges of four centimetres has a volume of sixty-four cubic centimetres and a surface area of ninety-six square centimetres.', show: 'sum.1' },
        { say: 'And area is in square units, while volume is in cubic units. In the next part, you will use powers of two to describe doubling. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
