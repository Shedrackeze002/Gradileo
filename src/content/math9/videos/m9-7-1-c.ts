import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tag } from '@/content/math8/videos/lib/m8-3-figures.ts';
import { room, shape, shapeIds } from './lib/m9-7-figures.ts';

type P = [number, number];

const rect = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

// The poster, 60 cm by 45 cm, and the flyer, its reduction with k = 0.4: 24 cm by 18 cm, drawn to
// the same scale.
const posters = (id: string, flyer: { len: string; wid: string }) =>
  figure(id, [
    shape({ name: 'p', pts: rect(0, 0, 60, 45), sides: [{ tone: 'adj', label: '60\\text{ cm}' }, { tone: 'opp', label: '45\\text{ cm}' }] }),
    shape({ name: 'f', pts: rect(80, 0, 24, 18), tone: 'good', sides: [{ tone: 'adj', label: flyer.len }, { tone: 'opp', label: flyer.wid }] }),
    tag('np', [30, 22.5], '\\text{Poster}'),
    tag('nf', [92, 9], '\\text{Flyer}'),
    room('r', [113, 0]),
  ]);

const video: Explainer = {
  id: 'm9-7-1-c',
  lessonId: 'm9-7-1',
  title: 'Scale Diagrams and Enlargements, Part 3: Finding New Lengths',
  thumbnailTitle: 'Finding New Lengths',
  thumbnail: 'pf',
  summary:
    'To find a length on the image, multiply the matching original length by the scale factor: image length = k × original length. A 60 cm by 45 cm poster reduced with a scale factor of 0.4 makes a flyer 0.4 × 60 = 24 cm long and 0.4 × 45 = 18 cm wide. The flyer keeps the poster’s shape: 45/60 and 18/24 are both 0.75.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 3', title: 'Finding New Lengths', subtitle: 'Multiply by the scale factor' }],
      lines: [
        { say: 'Once you know the scale factor, you can find any length on the image, even before you draw it.', show: 'title' },
        { say: 'In this part, you will multiply by the scale factor to find new lengths, and check that the shape stays the same.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Finding a new length', md: 'Multiply the matching **original** length by the scale factor $k$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{image length} = k \\times \\text{original length}', 'k = 3: \\quad 3 \\times 5 \\text{ cm} = 15 \\text{ cm}', 'k = 0.5: \\quad 0.5 \\times 8 \\text{ cm} = 4 \\text{ cm}'] },
      ],
      lines: [
        { say: 'In a scale diagram, every length on the original is multiplied by the scale factor. So to find a length on the image, multiply the matching original length by k.', show: ['key', 'm.0'], focus: 'm.0' },
        { say: 'For example, with a scale factor of three, a side that is five centimetres long on the original is three times five, or fifteen centimetres long on the image.', show: 'm.1', focus: 'm.1' },
        { say: 'It works the same way for a reduction. With a scale factor of zero point five, a side that is eight centimetres long becomes zero point five times eight, which is four centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'When k is less than one, the image lengths come out smaller, just as they should.' },
      ],
    },
    {
      chapter: 'A poster becomes a flyer',
      layout: 'split',
      leftWidth: 620,
      left: [posters('pf', { len: '24\\text{ cm}', wid: '18\\text{ cm}' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A poster is $60$ cm long and $45$ cm wide. Liam reduces it with a scale factor of $0.4$ to make a flyer. Find the size of the flyer.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Length: } 0.4 \\times 60 = 24', '\\text{Width: } 0.4 \\times 45 = 18', '24 \\text{ cm by } 18 \\text{ cm}'] },
      ],
      lines: [
        { say: 'A poster is sixty centimetres long and forty-five centimetres wide. Liam reduces it with a scale factor of zero point four to make a flyer. Find the size of the flyer.', show: [...shapeIds('pf', 'p', { lens: true }), 'pf.np', 'q'] },
        { say: 'Step one: the length. Multiply the poster’s length by the scale factor. Zero point four times sixty is twenty-four.', show: 'm.0', focus: ['m.0', 'pf.p-len0'] },
        { say: 'Here is a quick way to multiply by zero point four. Zero point four is four tenths. One tenth of sixty is six, and four tenths is four times six, which is twenty-four. The flyer is twenty-four centimetres long.', show: ['pf.f', 'pf.f-len0', 'pf.nf'], focus: ['m.0', 'pf.f-len0'] },
        { say: 'Step two: the width. Zero point four times forty-five. One tenth of forty-five is four point five, and four times four point five is eighteen. The flyer is eighteen centimetres wide.', show: ['m.1', 'pf.f-len1'], focus: ['m.1', 'pf.p-len1', 'pf.f-len1'] },
        { say: 'So the flyer is twenty-four centimetres by eighteen centimetres. In the picture, the flyer is drawn to the same scale as the poster. It really is less than half as long, and less than half as wide.', show: 'm.2', focus: ['m.2', 'pf.f'] },
      ],
    },
    {
      chapter: 'Same shape?',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'Compare the width with the length in each one.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Poster: } \\dfrac{45}{60} = 0.75', '\\text{Flyer: } \\dfrac{18}{24} = 0.75'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Same shape, new size', md: 'In a scale diagram, the sides of the image compare with each other in the **same way** as the sides of the original.' },
      ],
      lines: [
        { say: 'Here is a good way to check that the flyer has the same shape as the poster. Compare the width with the length in each one.', show: 't' },
        { say: 'For the poster, forty-five over sixty is zero point seven five. The width is three quarters of the length.', show: 'm.0', focus: 'm.0' },
        { say: 'For the flyer, eighteen over twenty-four is zero point seven five as well. The width is still three quarters of the length.', show: 'm.1', focus: 'm.1' },
        { say: 'The sides compare in the same way, so the flyer is the same shape as the poster, just smaller. That is exactly what a scale diagram should be.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A photo is $9$ cm by $12$ cm. It is enlarged with a scale factor of $1.5$. What size is the enlarged photo?',
          choices: ['$13.5$ cm by $18$ cm', '$10.5$ cm by $13.5$ cm', '$6$ cm by $8$ cm', '$18$ cm by $24$ cm'],
          answer: 0,
          working: '$1.5 \\times 9 = 13.5$ and $1.5 \\times 12 = 18$, so the enlarged photo is $13.5$ cm by $18$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A photo is nine centimetres by twelve centimetres. It is enlarged with a scale factor of one point five. What size is the enlarged photo? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: thirteen point five centimetres by eighteen centimetres. One point five times nine is thirteen point five, and one point five times twelve is eighteen. Choice B adds one point five to each side, but a scale factor multiplies.', show: 'q.answer' },
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
            'Image length $= k \\times$ original length.',
            'It works for enlargements ($k > 1$) and reductions ($0 < k < 1$).',
            'Check the shape: the sides of the image compare in the same way as the sides of the original.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a length on the image, multiply the matching original length by the scale factor.', show: 'sum.0' },
        { say: 'This works for enlargements, and for reductions.', show: 'sum.1' },
        { say: 'And you can check the shape: the sides of the image compare with each other in the same way as the sides of the original. In the next part, you will work backward, from an image to the original. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
