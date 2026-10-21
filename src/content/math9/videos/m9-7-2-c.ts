import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { blob, scaleBar, seg, shape, spot } from './lib/m9-7-figures.ts';

type P = [number, number];

// A map at 1 : 50 000, in centimetres on the map: the trail from the campground to the lookout is
// 7.4 cm long, and the scale bar's marks are 1 cm (0.5 km) apart.
const camp: P = [1.8, 0.9];
const lookout: P = [camp[0] + 7.4 * Math.cos((20 * Math.PI) / 180), camp[1] + 7.4 * Math.sin((20 * Math.PI) / 180)];
const map = (id: string) =>
  figure(id, [
    shape({ name: 'sheet', pts: [[-0.4, -2.7], [10.4, -2.7], [10.4, 6], [-0.4, 6]], tone: 'muted', shade: 0.05 }),
    blob('lake', [[1.6, 3.4], [3.6, 3.0], [5.4, 3.8], [5.2, 5.3], [3.4, 5.5], [1.5, 4.8]]),
    seg('trail', camp, lookout, { tone: 'theta', dashed: true, label: '7.4\\text{ cm}', side: 'right' }),
    spot('camp', camp, '\\text{Campground}', 'below'),
    spot('look', lookout, '\\text{Lookout}', 'above'),
    scaleBar('bar', [6.8, -1.2], 1, ['0', '', '1\\text{ km}'], { title: '1 : 50\\,000' }),
  ]);

const video: Explainer = {
  id: 'm9-7-2-c',
  lessonId: 'm9-7-2',
  title: 'Scale Diagrams and Maps, Part 3: Map Scales',
  thumbnailTitle: 'Map Scales',
  thumbnail: 'mp',
  summary:
    'Maps of large areas use scales such as 1 : 50 000, so 1 cm on the map is 50 000 cm, or 0.5 km, on the ground (1 km = 100 000 cm). A trail 7.4 cm long on the map is 7.4 × 50 000 = 370 000 cm = 3.7 km long. Always change the units at the end: 370 000 is in centimetres, not kilometres.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 3', title: 'Map Scales', subtitle: 'Big numbers, big distances' }],
      lines: [
        { say: 'A map of a large area has to shrink the land a great deal. So its scale has a big number, such as one to fifty thousand.', show: 'title' },
        { say: 'In this part, you will use a map scale to find a real distance, and change the units so that the answer makes sense.' },
      ],
    },
    {
      chapter: 'One to fifty thousand',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['1 \\text{ cm on the map} = 50\\,000 \\text{ cm on the ground}', '1 \\text{ km} = 1\\,000 \\text{ m} = 100\\,000 \\text{ cm}', '50\\,000 \\text{ cm} = 0.5 \\text{ km}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'On this map', md: 'Every centimetre on the map stands for **half a kilometre** on the ground.' },
      ],
      lines: [
        { say: 'On a map with a scale of one to fifty thousand, one centimetre on the map stands for fifty thousand centimetres on the ground.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifty thousand centimetres is hard to picture, so change it to kilometres. One metre is one hundred centimetres, and one kilometre is one thousand metres. So one kilometre is one hundred thousand centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Fifty thousand is half of one hundred thousand. So fifty thousand centimetres is half a kilometre, or zero point five kilometres.', show: 'm.2', focus: 'm.2' },
        { say: 'On this map, every centimetre stands for half a kilometre on the ground.', show: 'key' },
      ],
    },
    {
      chapter: 'From the map to the trail',
      layout: 'split',
      leftWidth: 620,
      left: [map('mp')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'On a map with a scale of $1 : 50\\,000$, the trail from the campground to the lookout is $7.4$ cm long. How long is the real trail?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['7.4 \\times 50\\,000 = 370\\,000 \\text{ cm}', '370\\,000 \\div 100\\,000 = 3.7', '3.7 \\text{ km}'] },
      ],
      lines: [
        { say: 'Here is a map with a scale of one to fifty thousand. The trail from the campground to the lookout is seven point four centimetres long on the map. How long is the real trail?', show: ['mp.sheet', 'mp.lake', 'mp.camp', 'mp.look', 'mp.trail', 'mp.bar', 'q'], focus: 'mp.trail' },
        { say: 'Step one: real distances are fifty thousand times as long. So multiply: seven point four times fifty thousand is three hundred seventy thousand. That is three hundred seventy thousand centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: change to kilometres. One kilometre is one hundred thousand centimetres, so divide by one hundred thousand. That gives three point seven.', show: 'm.1', focus: 'm.1' },
        { say: 'The trail is three point seven kilometres long.', show: 'm.2', focus: 'm.2' },
        { say: 'You can check with the scale bar. Each centimetre on the map is half a kilometre, so the trail is half of seven point four, which is three point seven kilometres.', focus: 'mp.bar' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to change units', md: '$7.4 \\times 50\\,000 = 370\\,000$ is in **centimetres**, not kilometres. Always ask: what unit is my answer in?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['370\\,000 \\text{ km} \\quad \\text{(far too long for a trail)}', '370\\,000 \\text{ cm} = 3.7 \\text{ km} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Seven point four times fifty thousand is three hundred seventy thousand. But three hundred seventy thousand what?', show: 'oops' },
        { say: 'Some people write three hundred seventy thousand kilometres. A hiking trail that long would reach nearly as far as the Moon! That makes no sense.', show: 'm.0', focus: 'm.0' },
        { say: 'The number is in centimetres, because the map length was in centimetres. Change it: three hundred seventy thousand centimetres is three point seven kilometres.', show: 'm.1', focus: 'm.1' },
        { say: 'So always ask yourself: what unit is my answer in? Then change it to a unit that makes sense for the distance.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A map has a scale of $1 : 200\\,000$. Two villages are $6.5$ cm apart on the map. How far apart are they really?',
          choices: ['$1.3$ km', '$130$ km', '$13$ km', '$1\\,300\\,000$ km'],
          answer: 2,
          working: '$6.5 \\times 200\\,000 = 1\\,300\\,000$ cm, and $1\\,300\\,000 \\div 100\\,000 = 13$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. A map has a scale of one to two hundred thousand. Two villages are six point five centimetres apart on the map. How far apart are they really? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C, thirteen kilometres. Six point five times two hundred thousand is one million three hundred thousand centimetres. Divide by one hundred thousand to get thirteen kilometres. Choice D forgets to change the units: that number is in centimetres.', show: 'q.answer' },
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
            'On a $1 : 50\\,000$ map, $1$ cm stands for $50\\,000$ cm, or $0.5$ km.',
            '$1 \\text{ km} = 100\\,000 \\text{ cm}$.',
            'Multiply by the scale, then change the units: $370\\,000$ cm $= 3.7$ km.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a map with a scale of one to fifty thousand, one centimetre stands for fifty thousand centimetres, or half a kilometre.', show: 'sum.0' },
        { say: 'One kilometre is one hundred thousand centimetres.', show: 'sum.1' },
        { say: 'Multiply by the scale, then change the units, and check that the answer makes sense. In the next part, you will find the scale of a plan yourself. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
