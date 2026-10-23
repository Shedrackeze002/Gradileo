import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tag } from '@/content/math8/videos/lib/m8-3-figures.ts';
import { canoe, room, seg, shape, shapeIds } from './lib/m9-7-figures.ts';

type P = [number, number];

const rect = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

// The model canoe (26 cm long) and the real canoe (520 cm long), seen from above, drawn to the same
// scale: the model is 0.05 times, one twentieth, as long.
const canoes = (id: string) =>
  figure(
    id,
    [
      canoe('m', [0, 0], 26, 4.5, 'theta'),
      tag('nm', [13, 7], '\\text{Model: } 26 \\text{ cm}', { tone: 'theta', place: 'above' }),
      canoe('c', [60, 0], 520, 90),
      tag('nc', [320, 50], '\\text{Real canoe: how long?}', { tone: 'good', place: 'above' }),
      seg('len', [60, -62], [580, -62], { tone: 'good', weight: 3 }),
      seg('len-a', [60, -54], [60, -70], { tone: 'good', weight: 3 }),
      seg('len-b', [580, -54], [580, -70], { tone: 'good', weight: 3 }),
    ],
    250,
  );

// Sofia's photo, 10 cm by 15 cm, and its scale copy with k = 2.5: 25 cm by 37.5 cm.
const photos = (id: string, longer: string) =>
  figure(id, [
    shape({ name: 'p', pts: rect(0, 0, 10, 15), sides: [{ tone: 'adj', label: '10\\text{ cm}' }, undefined, undefined, { tone: 'opp', label: '15\\text{ cm}' }] }),
    shape({ name: 'c', pts: rect(17, 0, 25, 37.5), tone: 'good', sides: [{ tone: 'adj', label: '25\\text{ cm}' }, undefined, undefined, { tone: 'opp', label: longer }] }),
    tag('np', [5, 7.5], '\\text{Photo}'),
    tag('nc', [29.5, 18.75], '\\text{Copy}'),
    room('r', [-7, 0]),
  ]);

const video: Explainer = {
  id: 'm9-7-1-d',
  lessonId: 'm9-7-1',
  title: 'Scale Diagrams and Enlargements, Part 4: Working Backward',
  thumbnailTitle: 'Working Backward',
  thumbnail: 'ph',
  summary:
    'To find an original length from the image, undo the multiplication: original length = image length ÷ k. A model canoe built with a scale factor of 0.05 is 26 cm long, so the real canoe is 26 ÷ 0.05 = 520 cm, or 5.2 m. In a two-step problem, find k from a pair of sides you know first: a 10 cm by 15 cm photo copied with a shorter side of 25 cm has k = 2.5, so its longer side is 2.5 × 15 = 37.5 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 4', title: 'Working Backward', subtitle: 'From the image to the original' }],
      lines: [
        { say: 'Sometimes you know the image, but not the original. A model is sitting in front of you, and you want to know how big the real thing is.', show: 'title' },
        { say: 'In this part, you will work backward from an image to the original, and solve problems that take two steps.' },
      ],
    },
    {
      chapter: 'Undo the multiplication',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{image length} = k \\times \\text{original length}', '\\text{original length} = \\text{image length} \\div k', 'k = 3: \\quad 15 \\text{ cm} \\div 3 = 5 \\text{ cm}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Working backward', md: 'To go from the image back to the original, **divide** by the scale factor.' },
      ],
      lines: [
        { say: 'To make the image, you multiply each original length by the scale factor.', show: 'm.0', focus: 'm.0' },
        { say: 'To go back, undo that multiplication. Dividing undoes multiplying, so divide the image length by the scale factor.', show: ['m.1', 'key'], focus: 'm.1' },
        { say: 'For example, if the scale factor is three and a side on the image is fifteen centimetres long, the original side is fifteen divided by three, which is five centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by going forward again: three times five is fifteen. It works.' },
      ],
    },
    {
      chapter: 'A model canoe',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A model canoe is built with a scale factor of $0.05$. The model is $26$ cm long. How long is the real canoe?' },
        canoes('cn'),
      ],
      lines: [
        { say: 'A model canoe is built with a scale factor of zero point zero five. The model is twenty-six centimetres long. How long is the real canoe?', show: ['q', 'cn.m', 'cn.nm'] },
        { say: 'The scale factor is much less than one, so the model is a big reduction of the real canoe. Here they are, drawn to the same scale. The model is tiny next to the real canoe.', show: ['cn.c', 'cn.nc', 'cn.len', 'cn.len-a', 'cn.len-b'], focus: 'cn.c' },
        { say: 'The real canoe is the original, and the model is the image. You know the image, so work backward: divide by the scale factor.', focus: 'cn.m' },
      ],
    },
    {
      chapter: 'Dividing by the scale factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{original} = 26 \\div 0.05', '0.05 = \\tfrac{1}{20}, \\text{ so } 26 \\div 0.05 = 26 \\times 20 = 520 \\text{ cm}', '520 \\text{ cm} \\div 100 = 5.2 \\text{ m}'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The real canoe is **5.2 m** long.' },
      ],
      lines: [
        { say: 'The real length is the model length divided by the scale factor: twenty-six divided by zero point zero five.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point zero five is five over one hundred, which is the same as one over twenty. So dividing by zero point zero five is the same as multiplying by twenty. Twenty-six times twenty is five hundred twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'The real canoe is five hundred twenty centimetres long. There are one hundred centimetres in a metre, so divide by one hundred: that is five point two metres.', show: ['m.2', 'a'], focus: 'm.2' },
        { say: 'Does that make sense? A canoe about five metres long is a normal size for a real canoe. And the real canoe is twenty times as long as the model, just like the picture shows.' },
      ],
    },
    {
      chapter: 'Enlarging a photo',
      layout: 'split',
      leftWidth: 600,
      left: [photos('ph', 'x')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Sofia has a $10$ cm by $15$ cm photo. She wants a scale copy whose shorter side is $25$ cm. How long is the longer side?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = \\dfrac{25}{10} = 2.5', 'x = 2.5 \\times 15 = 37.5', 'x = 37.5 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Here is a problem with two steps. Sofia has a photo that is ten centimetres by fifteen centimetres. She wants a scale copy whose shorter side is twenty-five centimetres. How long is the longer side?', show: [...shapeIds('ph', 'p', { lens: true }), ...shapeIds('ph', 'c', { lens: true }), 'ph.np', 'ph.nc', 'q'] },
        { say: 'Step one: use the pair of sides you know to find the scale factor. The shorter sides are ten centimetres on the photo and twenty-five centimetres on the copy.', focus: ['ph.p-len0', 'ph.c-len0'] },
        { say: 'The copy is the image, so k is twenty-five over ten, which is two point five.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: use the scale factor on the other side. Two point five times fifteen is thirty-seven point five.', show: 'm.1', focus: ['m.1', 'ph.p-len3', 'ph.c-len3'] },
        { say: 'The longer side of the copy is thirty-seven point five centimetres. The copy is an enlargement, so it makes sense that both of its sides are bigger than the photo’s.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A model of a bridge is built with a scale factor of $0.02$. The model is $84$ cm long. How long is the real bridge?',
          choices: ['$1.68$ cm', '$4.2$ m', '$42$ m', '$420$ m'],
          answer: 2,
          working: 'Work backward: $84 \\div 0.02 = 4{,}200$ cm, and $4{,}200 \\div 100 = 42$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A model of a bridge is built with a scale factor of zero point zero two. The model is eighty-four centimetres long. How long is the real bridge? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C, forty-two metres. Eighty-four divided by zero point zero two is four thousand two hundred centimetres, which is forty-two metres. Choice A multiplies by the scale factor instead of dividing, which would make the real bridge smaller than its model.', show: 'q.answer' },
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
            'Original length $=$ image length $\\div k$.',
            'In a two-step problem, find $k$ from a pair of sides you know, then use it on the other side.',
            'Check that the answer makes sense. Change units if needed.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To work backward from the image to the original, divide by the scale factor.', show: 'sum.0' },
        { say: 'In a problem with two steps, first find the scale factor from a pair of matching sides you know. Then use it on the other side.', show: 'sum.1' },
        { say: 'And always check that your answer makes sense, and change the units if you need to. In the next lesson, you will read the scales on plans and maps. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
