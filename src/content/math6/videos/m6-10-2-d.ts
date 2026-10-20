import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const faces = (id: string, name?: string) => (name ? [`${id}.${name}-shape`, `${id}.${name}-front-face`, `${id}.${name}-top-face`, `${id}.${name}-side-face`] : [`${id}.shape`, `${id}.front-face`, `${id}.top-face`, `${id}.side-face`]);

// The sandbox: walls 3 m by 2 m (drawn a little taller than the sand), filled with sand 0.5 m deep.
const sandbox = (id: string) =>
  figure(id, [
    box({ name: 'wall', l: 3, w: 2, h: 1, tone: 'muted' }),
    box({ name: 'sand', l: 3, w: 2, h: 0.5, labels: { l: '3\\text{ m}', w: '2\\text{ m}', h: '0.5\\text{ m}' } }),
    { points: { pad: [-0.8, 0] }, items: [] },
    {
      points: {},
      items: [
        { kind: 'region', id: 'sand-fill', points: ['sand-A', 'sand-B', 'sand-C', 'sand-D'], tone: 'theta', shade: 0.35, group: 'sand' },
        { kind: 'region', id: 'sand-top', points: ['sand-D', 'sand-C', 'sand-G', 'sand-H'], tone: 'theta', shade: 0.45, group: 'sand' },
        { kind: 'region', id: 'sand-side', points: ['sand-B', 'sand-F', 'sand-G', 'sand-C'], tone: 'theta', shade: 0.25, group: 'sand' },
      ],
    },
  ]);

const video: Explainer = {
  id: 'm6-10-2-d',
  lessonId: 'm6-10-2',
  title: 'Volume of Rectangular Prisms, Part 4: Solving Volume Problems',
  thumbnailTitle: 'Solving Volume Problems',
  thumbnail: 'aq',
  summary: 'Real volume problems: an aquarium 50 cm long, 20 cm wide and 30 cm high has a volume of 50 × 20 = 1000, then 1000 × 30 = 30 000 cm³ (multiply in an easy order); a sandbox 3 m by 2 m filled with sand 0.5 m deep needs 6 × 0.5 = 3 m³ of sand, because the depth is the height of the sand.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Volume · Part 4', title: 'Solving Volume Problems', subtitle: 'Aquariums and sandboxes' }],
      lines: [
        { say: 'How much water does a fish tank hold? How much sand do you need to fill a sandbox? Volume answers questions like these.', show: 'title' },
        { say: 'In this video, you will solve two real volume problems, and learn a trick that makes the multiplying easier.' },
      ],
    },
    {
      chapter: 'An aquarium',
      layout: 'split',
      leftWidth: 500,
      left: [figure('aq', [box({ l: 5, w: 2, h: 3, labels: { l: '50\\text{ cm}', w: '20\\text{ cm}', h: '30\\text{ cm}' } }), { points: { pad: [-1.2, 0] }, items: [] }])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{base: } 50 \\times 20 = 1000', 'V = 1000 \\times 30', '\\phantom{V} = 30\\,000', 'V = 30\\,000\\text{ cm}^3'] }],
      lines: [
        { say: 'A class aquarium is fifty centimetres long, twenty centimetres wide and thirty centimetres high. What is its volume?', show: [...faces('aq'), 'aq.l', 'aq.w', 'aq.h'] },
        { say: 'Start with the base: fifty times twenty is one thousand. So the base is one thousand square centimetres.', show: 'm.0', focus: ['m.0', 'aq.l', 'aq.w'] },
        { say: 'Then multiply by the height: one thousand times thirty is thirty thousand.', show: ['m.1', 'm.2'], focus: ['m.2', 'aq.h'] },
        { say: 'So the aquarium has a volume of thirty thousand cubic centimetres. That is a lot of centimetre cubes!', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Choose an easy order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choose an easy order', md: 'You can multiply the three dimensions in **any order**. Start with a pair that is easy, like $50 \\times 20 = 1000$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{50 \\times 20 = 1000}, \\quad 1000 \\times 30 = 30\\,000', '50 \\times 30 = 1500, \\quad 1500 \\times 20 = 30\\,000'] },
      ],
      lines: [
        { say: 'Here is a trick. You can multiply the three dimensions in any order, and you always get the same answer.', show: 'tip' },
        { say: 'Fifty times twenty is one thousand: a nice round number. Then one thousand times thirty is easy.', show: 'm.0', focus: 'm.0' },
        { say: 'You could start with fifty times thirty instead. That gives one thousand five hundred, and then times twenty. It works, but it is harder.', show: 'm.1', focus: 'm.1' },
        { say: 'So look for a pair that makes a round number, like ten, one hundred, or one thousand, and multiply those first.', focus: 'tip' },
      ],
    },
    {
      chapter: 'A sandbox',
      layout: 'split',
      leftWidth: 500,
      left: [sandbox('sb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{height} = \\text{depth} = 0.5\\text{ m}', '\\text{base: } 3 \\times 2 = 6', 'V = 6 \\times 0.5 = 3', '\\text{Sand} = 3\\text{ m}^3'] }],
      lines: [
        { say: 'A sandbox is three metres long and two metres wide. Sand fills it to a depth of zero point five metres. How much sand is needed?', show: [...faces('sb', 'wall'), ...faces('sb', 'sand'), 'sb.sand', 'sb.sand-l', 'sb.sand-w', 'sb.sand-h'] },
        { say: 'The sand is a rectangular prism. Its height is the depth of the sand: zero point five metres.', show: 'm.0', focus: ['m.0', 'sb.sand-h'] },
        { say: 'The base is three times two, which is six square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Now multiply by the height: six times zero point five. Zero point five is one half, and one half of six is three.', show: 'm.2', focus: 'm.2' },
        { say: 'So the sandbox needs three cubic metres of sand.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box is $25\\text{ cm}$ long, $10\\text{ cm}$ wide and $4\\text{ cm}$ high. What is its volume?',
          choices: ['$39\\text{ cm}^3$', '$100\\text{ cm}^3$', '$1000\\text{ cm}^3$', '$10\\,000\\text{ cm}^3$'],
          answer: 2,
          working: 'An easy order: $25 \\times 4 = 100$, then $100 \\times 10 = 1000$, so $1000\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box is twenty-five centimetres long, ten centimetres wide and four centimetres high. What is its volume? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, one thousand cubic centimetres. An easy order is twenty-five times four, which is one hundred, then one hundred times ten, which is one thousand. Choice B forgets to multiply by the width.', show: 'q.answer' },
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
          items: ['Find the length, width and height in the problem, then multiply.', 'A depth, like the depth of sand or water, is a height.', 'Multiply in an easy order: look for round numbers first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve a volume problem, find the length, the width and the height, then multiply.', show: 'sum.0' },
        { say: 'A depth, like the depth of sand or water, is the height of a prism.', show: 'sum.1' },
        { say: 'And multiply in an easy order, looking for round numbers first. Great work! You can now find the volume of any rectangular prism.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
