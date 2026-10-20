import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const faces = (id: string) => [`${id}.shape`, `${id}.front-face`, `${id}.top-face`, `${id}.side-face`];

const video: Explainer = {
  id: 'm6-10-2-c',
  lessonId: 'm6-10-2',
  title: 'Volume of Rectangular Prisms, Part 3: Finding a Missing Dimension',
  thumbnailTitle: 'A Missing Dimension',
  thumbnail: 'su',
  summary: 'When you know the volume of a rectangular prism and two of its dimensions, multiply the two you know, then divide the volume by that product. A storage unit of 72 m³ that is 6 m long and 4 m wide has a base of 24 m², so it is 72 ÷ 24 = 3 m high; dividing by only 6 or only 4 gives a wrong answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 3', title: 'Finding a Missing Dimension', subtitle: 'Multiply the two you know, then divide' }],
      lines: [
        { say: 'A storage unit holds seventy-two cubic metres. You know how long it is and how wide it is. How tall is it?', show: 'title' },
        { say: 'In this video, you will work backwards from the volume to find a missing length, width or height.' },
      ],
    },
    {
      chapter: 'A missing height',
      layout: 'split',
      leftWidth: 500,
      left: [figure('su', [box({ l: 6, w: 4, h: 3, labels: { l: '6\\text{ m}', w: '4\\text{ m}', h: '?' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 72\\text{ m}^3', '\\text{base: } 6 \\times 4 = 24\\text{ m}^2', 'h = 72 \\div 24 = 3', '\\text{Check: } 6 \\times 4 \\times 3 = 72 \\;\\checkmark', '\\text{Height} = 3\\text{ m}'] }],
      lines: [
        { say: 'A storage unit has a volume of seventy-two cubic metres. It is six metres long and four metres wide. How high is it?', show: [...faces('su'), 'su.l', 'su.w', 'su.h', 'm.0'] },
        { say: 'First, multiply the two dimensions you know. The base is six times four, which is twenty-four square metres.', show: 'm.1', focus: ['m.1', 'su.l', 'su.w'] },
        { say: 'Volume is the area of the base times the height. So seventy-two equals twenty-four times the height.', focus: 'm.0' },
        { say: 'Divide the volume by the base: seventy-two divided by twenty-four is three.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: six times four times three is seventy-two. It matches! So the storage unit is three metres high.', show: ['m.3', 'm.4'], focus: ['m.4', 'su.h'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Divide by the base area', md: 'Divide the volume by the product of **both** known dimensions. Dividing $72$ by only $6$ or only $4$ gives the wrong answer.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{72 \\div 6 = 12} \\quad \\text{check: } 6 \\times 4 \\times 12 = 288 \\ne 72', '\\good{72 \\div 24 = 3} \\quad \\text{check: } 6 \\times 4 \\times 3 = 72 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Here is a common mistake: dividing the volume by just one of the dimensions you know.', show: 'oops' },
        { say: 'Seventy-two divided by six is twelve. But check it: six times four times twelve is two hundred and eighty-eight, not seventy-two. A height of twelve metres is far too tall!', show: 'm.0', focus: 'm.0' },
        { say: 'You must divide by the product of both known dimensions: six times four, which is twenty-four. Then seventy-two divided by twenty-four is three, and the check works.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A missing length',
      layout: 'split',
      leftWidth: 500,
      left: [figure('ml', [box({ l: 5, w: 1.5, h: 1, labels: { l: '?', w: '3\\text{ cm}', h: '2\\text{ cm}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 60\\text{ cm}^3', '3 \\times 2 = 6', 'l = 60 \\div 6 = 10', '\\text{Check: } 10 \\times 3 \\times 2 = 60 \\;\\checkmark', '\\text{Length} = 10\\text{ cm}'] }],
      lines: [
        { say: 'The same idea works for any missing dimension. A box has a volume of sixty cubic centimetres. It is three centimetres wide and two centimetres high. How long is it?', show: [...faces('ml'), 'ml.l', 'ml.w', 'ml.h', 'm.0'] },
        { say: 'Multiply the two dimensions you know: three times two is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide the volume by that: sixty divided by six is ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: ten times three times two is sixty. So the box is ten centimetres long.', show: ['m.3', 'm.4'], focus: ['m.4', 'ml.l'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box has a volume of $90\\text{ cm}^3$. It is $5\\text{ cm}$ long and $3\\text{ cm}$ wide. How high is it?',
          choices: ['$6\\text{ cm}$', '$18\\text{ cm}$', '$30\\text{ cm}$', '$82\\text{ cm}$'],
          answer: 0,
          working: 'Base: $5 \\times 3 = 15$. Height: $90 \\div 15 = 6\\text{ cm}$. Check: $5 \\times 3 \\times 6 = 90$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. A box has a volume of ninety cubic centimetres. It is five centimetres long and three centimetres wide. How high is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, six centimetres. Five times three is fifteen, and ninety divided by fifteen is six. Choice B divides by only the length, five.', show: 'q.answer' },
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
          items: ['Multiply the two dimensions you know.', 'Divide the volume by that product to find the missing dimension.', 'Check by multiplying all three dimensions.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a missing dimension, first multiply the two dimensions you know.', show: 'sum.0' },
        { say: 'Then divide the volume by that product.', show: 'sum.1' },
        { say: 'And check by multiplying all three dimensions: you should get the volume back. In the next part, you will solve some real volume problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
