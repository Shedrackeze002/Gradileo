import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, polygon } from './lib/m303-3-figures.ts';

const video: Explainer = {
  id: 'm303-4-2-d',
  lessonId: 'm303-4-2',
  title: 'Dilations, Part 4: Scale Drawings and Scale Models',
  thumbnailTitle: 'Scale Drawings and Models',
  thumbnail: 'pl',
  summary: 'A floor plan or model is a dilation of the real object: a scale of 1 : n has k = 1/n, so real lengths are n times the drawing lengths. A garage plan at 1 : 50 with a room 6.4 cm by 9.2 cm gives a real room 3.2 m by 4.6 m, with an area of 14.72 m². Convert lengths to metres before multiplying (or divide square centimetres by 10 000), and a 1 : 24 model truck 23.5 cm long stands for a truck 5.64 m long.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Dilations · Part 4', title: 'Scale Drawings and Scale Models', subtitle: 'Reading a scale like 1 : 50' }],
      lines: [
        { say: 'Builders read sizes off floor plans, and model makers shrink real vehicles to fit on a shelf. Both are dilations, described by a scale.', show: 'title' },
        { say: 'In this video, you will use a scale to find real lengths and real areas from a drawing, and the real size of an object from a model.' },
      ],
    },
    {
      chapter: 'What a scale means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale', md: 'A scale of $1 : n$ means that $1$ unit on the drawing stands for $n$ of the same units in real life. From real life to the drawing, the scale factor is $k = \\frac{1}{n}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{real length} = n \\times \\text{drawing length}'] },
      ],
      lines: [
        { say: 'A floor plan or a model is a dilation of the real object. Its scale is written as a ratio, like one to fifty.', show: 'def' },
        { say: 'A scale of one to n means one unit on the drawing stands for n of the same units in real life. So from real life to the drawing, the scale factor is one over n: a reduction.' },
        { say: 'Going the other way, from the drawing to real life, multiply by n. Every real length is n times the matching length on the drawing.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Area from a floor plan',
      layout: 'split',
      left: [
        figure('pl', [
          polygon({ corners: { A: [0, 0], B: [9.2, 0], C: [9.2, 6.4], D: [0, 6.4] }, names: false, tone: 'adj', rights: ['A', 'B', 'C', 'D'], sides: { AB: '9.2\\text{ cm}', DA: '6.4\\text{ cm}' } }),
          caption({ id: 'sc', at: [4.6, 3.2], tex: '\\text{Scale } 1 : 50', tone: 'muted' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['6.4 \\times 50 = 320\\text{ cm} = 3.2\\text{ m}', '9.2 \\times 50 = 460\\text{ cm} = 4.6\\text{ m}', '\\text{area} = 3.2 \\times 4.6 = 14.72\\text{ m}^2'],
        },
      ],
      lines: [
        { say: 'A garage plan is drawn at a scale of one to fifty. On the plan, a room is 6.4 centimetres by 9.2 centimetres. Find the real area of the room.', show: ['pl.shape', 'pl.sc'] },
        { say: 'Find the real lengths first. Each real length is fifty times the plan length. 6.4 times fifty is 320 centimetres, which is 3.2 metres.', show: 'm.0', focus: 'm.0' },
        { say: '9.2 times fifty is 460 centimetres, which is 4.6 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Now multiply the real lengths: 3.2 times 4.6 is 14.72. The room has an area of 14.72 square metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Convert the lengths first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Convert the lengths first', md: 'Change the real lengths to metres **before** multiplying. If you find the area in square centimetres first, divide by $10\\,000$ (not $100$) to get square metres.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\text{ m}^2 = 100\\text{ cm} \\times 100\\text{ cm} = 10\\,000\\text{ cm}^2', '320 \\times 460 = 147\\,200\\text{ cm}^2', '147\\,200 \\div 10\\,000 = 14.72\\text{ m}^2'] },
      ],
      lines: [
        { say: 'Notice that we changed the lengths to metres before multiplying. That is the safest way to get an area in square metres.', show: 'tip' },
        { say: 'If you multiply in centimetres instead, be careful when you convert. One square metre is a square 100 centimetres by 100 centimetres, which is 10,000 square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Here, 320 times 460 is 147,200 square centimetres. Divide by 10,000, not by 100: 14.72 square metres, the same answer.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'A scale model',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'A $1 : 24$ model of a pickup truck is $23.5\\text{ cm}$ long. How long is the real truck?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['23.5 \\times 24 = 564\\text{ cm}', '564\\text{ cm} = 5.64\\text{ m}'] },
      ],
      lines: [
        { say: 'Models work the same way. A model of a pickup truck is built at a scale of one to 24, and the model is 23.5 centimetres long. How long is the real truck?', show: 'q' },
        { say: 'Every real length is 24 times the model length. 23.5 times 24 is 564 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by 100 to change centimetres to metres: the real truck is 5.64 metres long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A plan is drawn at a scale of $1 : 100$. A room on the plan is $4\\text{ cm}$ by $3\\text{ cm}$. What is the real area of the room?',
          choices: ['$12\\text{ m}^2$', '$0.12\\text{ m}^2$', '$1.2\\text{ m}^2$', '$120\\text{ m}^2$'],
          answer: 0,
          working: 'Real lengths: $4 \\times 100 = 400\\text{ cm} = 4\\text{ m}$ and $3 \\times 100 = 300\\text{ cm} = 3\\text{ m}$. Area: $4 \\times 3 = 12\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A plan is drawn at a scale of one to 100. A room on the plan is four centimetres by three centimetres. What is the real area of the room? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twelve square metres. The real room is 400 centimetres, or four metres, by 300 centimetres, or three metres, and four times three is twelve. Choice B multiplies the plan’s area of twelve square centimetres by only 100, which gives 1,200 square centimetres, or 0.12 square metres.', show: 'q.answer' },
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
            'A scale of $1 : n$ has $k = \\frac{1}{n}$: multiply drawing lengths by $n$ to get real lengths.',
            'Find the real lengths, change them to metres, then multiply for the area.',
            'In square centimetres, divide by $10\\,000$ to get square metres.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A scale of one to n has a scale factor of one over n, so multiply drawing lengths by n to get real lengths.', show: 'sum.0' },
        { say: 'For an area, find the real lengths, change them to metres, and then multiply.', show: 'sum.1' },
        { say: 'And if you work in square centimetres, divide by 10,000 to get square metres. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
