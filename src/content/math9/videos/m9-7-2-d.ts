import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rateLine, tag } from '@/content/math8/videos/lib/m8-3-figures.ts';
import { room, seg, shape } from './lib/m9-7-figures.ts';

type P = [number, number];

// The gym: 15 cm on the plan for 3000 cm in real life, so 1 cm for 3000 ÷ 15 = 200 cm.
const gym = (id: string) =>
  figure(
    id,
    [
      rateLine({
        max: 15,
        titles: ['\\text{Plan (cm)}', '\\text{Real (cm)}'],
        titleRoom: 3.4,
        marks: [
          { id: 'q', at: 1, top: '1', bottom: '?' },
          { id: 'a', at: 1, top: '1', bottom: '200', tone: 'theta' },
          { id: 'e', at: 15, top: '15', bottom: '3\\,000' },
        ],
      }),
    ],
    260,
  );

// The garden plan at 1 : 200: 9.5 cm by 6 cm, so the garden is 19 m by 12 m.
const garden: P[] = [
  [0, 0],
  [9.5, 0],
  [9.5, 6],
  [0, 6],
];
const plan = (id: string) =>
  figure(id, [
    shape({ name: 'g', pts: garden, tone: 'good', sides: [{ tone: 'adj', label: '9.5\\text{ cm}' }, { tone: 'opp', label: '6\\text{ cm}' }] }),
    seg('rw', [0, 0], [9.5, 0], { tone: 'adj', label: '19\\text{ m}', side: 'right' }),
    seg('rh', [9.5, 0], [9.5, 6], { tone: 'opp', label: '12\\text{ m}', side: 'right' }),
    tag('t', [4.75, 3], '\\text{Garden}'),
    room('r', [11.6, 0]),
  ]);

const video: Explainer = {
  id: 'm9-7-2-d',
  lessonId: 'm9-7-2',
  title: 'Scale Diagrams and Maps, Part 4: Finding the Scale',
  thumbnailTitle: 'Finding the Scale',
  thumbnail: false,
  summary:
    'To find the scale, put the real length and the drawing length in the same unit, then divide the real length by the drawing length: a 30 m gym drawn 15 cm long has 3000 ÷ 15 = 200, so the scale is 1 : 200. On a 1 : 200 plan, a garden 9.5 cm by 6 cm is 19 m by 12 m, so it needs 2 × 19 + 2 × 12 = 62 m of fencing. Check that every answer makes sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 4', title: 'Finding the Scale', subtitle: 'And solving problems with it' }],
      lines: [
        { say: 'So far, the scale was given to you. But if you know a real length and its length on a drawing, you can work out the scale yourself.', show: 'title' },
        { say: 'In this part, you will find the scale of a plan, and then use a scale to solve a problem about fencing.' },
      ],
    },
    {
      chapter: 'The scale of a gym plan',
      layout: 'split',
      leftWidth: 620,
      left: [gym('gy')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A school gym is $30$ m long. On a plan, it is $15$ cm long. What is the scale?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['30 \\text{ m} = 3\\,000 \\text{ cm}', '3\\,000 \\div 15 = 200', '\\text{Scale } 1 : 200'] },
      ],
      lines: [
        { say: 'A school gym is thirty metres long. On a plan, it is fifteen centimetres long. What is the scale?', show: ['q', 'gy.lines', 'gy.e-tt', 'gy.e-top'] },
        { say: 'Step one: put both lengths in the same unit. The plan is in centimetres, so change thirty metres to centimetres. Thirty times one hundred is three thousand centimetres.', show: ['m.0', 'gy.e-bt', 'gy.e-bottom'], focus: ['m.0', 'gy.e-bottom'] },
        { say: 'A ratio scale starts with one, so ask: one centimetre on the plan stands for how many centimetres in real life?', show: ['gy.q-tt', 'gy.q-bt', 'gy.q-top', 'gy.q-bottom'], focus: 'gy.q-bottom' },
        { say: 'Step two: divide the real length by the plan length. Three thousand divided by fifteen is two hundred. So one centimetre on the plan stands for two hundred centimetres in real life.', hide: 'gy.q-bottom', show: ['m.1', 'gy.a-bottom'], focus: ['m.1', 'gy.a-bottom'] },
        { say: 'The scale is one to two hundred.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Fencing a garden',
      layout: 'split',
      leftWidth: 560,
      left: [plan('gd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A garden plan has a scale of $1 : 200$. The garden is a $9.5$ cm by $6$ cm rectangle on the plan. How much fencing goes around the real garden?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['9.5 \\times 200 = 1\\,900 \\text{ cm} = 19 \\text{ m}', '6 \\times 200 = 1\\,200 \\text{ cm} = 12 \\text{ m}', '2 \\times 19 + 2 \\times 12 = 62', '62 \\text{ m of fencing}'] },
      ],
      lines: [
        { say: 'Now use a scale. A plan of a garden has a scale of one to two hundred. On the plan, the garden is a rectangle nine point five centimetres by six centimetres. How much fencing goes around the real garden?', show: ['gd.g', 'gd.g-len0', 'gd.g-len1', 'gd.t', 'q'] },
        { say: 'Step one: the real length. Nine point five times two hundred is one thousand nine hundred centimetres. Divide by one hundred: that is nineteen metres.', hide: 'gd.g-len0', show: ['m.0', 'gd.rw'], focus: ['m.0', 'gd.rw'] },
        { say: 'Step two: the real width. Six times two hundred is one thousand two hundred centimetres, which is twelve metres.', hide: 'gd.g-len1', show: ['m.1', 'gd.rh'], focus: ['m.1', 'gd.rh'] },
        { say: 'Step three: the fence goes all the way around, so find the perimeter. That is two lengths and two widths: two times nineteen, plus two times twelve. Thirty-eight plus twenty-four is sixty-two.', show: 'm.2', focus: ['m.2', 'gd.g'] },
        { say: 'The garden needs sixty-two metres of fencing.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check that the answer makes sense', md: 'A garden plan should give a garden a few metres long, not a few kilometres, and not a few millimetres. A quick estimate catches most mistakes with units.' }],
      lines: [
        { say: 'Always check that an answer makes sense. A garden should be a few metres long. Not a few kilometres, and not a few millimetres.', show: 'tip' },
        { say: 'Nineteen metres by twelve metres is a sensible size for a garden, so the answer is believable.' },
        { say: 'If you had forgotten to change units, you would have had one thousand nine hundred metres, almost two kilometres! A quick estimate like this catches most mistakes with units.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A park is $450$ m long. On a map, the park is $9$ cm long. What is the scale of the map?',
          choices: ['$1 : 5\\,000$', '$1 : 50$', '$1 : 500$', '$1 : 50\\,000$'],
          answer: 0,
          working: '$450$ m $= 45\\,000$ cm, and $45\\,000 \\div 9 = 5\\,000$, so the scale is $1 : 5\\,000$.',
        },
      ],
      lines: [
        { say: 'Your turn. A park is four hundred fifty metres long. On a map, the park is nine centimetres long. What is the scale of the map? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A, one to five thousand. Four hundred fifty metres is forty-five thousand centimetres, and forty-five thousand divided by nine is five thousand. Choice B divides four hundred fifty by nine, without changing metres to centimetres first.', show: 'q.answer' },
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
            'To find the scale, put both lengths in the **same unit**.',
            'Then divide: real length $\\div$ drawing length $= n$, and the scale is $1 : n$.',
            'Use the scale to find real lengths, then answer the question (such as a perimeter).',
            'Check that the answer makes sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a scale, first put the real length and the drawing length in the same unit.', show: 'sum.0' },
        { say: 'Then divide the real length by the drawing length. That number is the second number in the scale.', show: 'sum.1' },
        { say: 'To solve a problem, use the scale to find the real lengths, then answer the question, such as a perimeter.', show: 'sum.2' },
        { say: 'And check that the answer makes sense. In the next lesson, you will meet similar polygons: shapes with the same shape but different sizes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
