import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rateLine } from '@/content/math8/videos/lib/m8-3-figures.ts';

const titles: [string, string] = ['\\text{Plan (cm)}', '\\text{Real (cm)}'];

// A scale of 1 : 50, counted up: 1 cm on the plan for every 50 cm in real life.
const counting = (id: string) =>
  figure(
    id,
    [
      rateLine({
        max: 4,
        titles,
        titleRoom: 3.4,
        marks: [
          { id: 'm0', at: 0, top: '0', bottom: '0' },
          { id: 'm1', at: 1, top: '1', bottom: '50' },
          { id: 'm2', at: 2, top: '2', bottom: '100' },
          { id: 'm3', at: 3, top: '3', bottom: '150' },
          { id: 'm4', at: 4, top: '4', bottom: '200' },
        ],
      }),
    ],
    260,
  );

// The floor plan at 1 : 50: a 14.4 cm wall on the plan is 14.4 × 50 = 720 cm in real life.
const wall = (id: string) =>
  figure(
    id,
    [
      rateLine({
        max: 14.4,
        titles,
        titleRoom: 3.4,
        marks: [
          { id: 'm1', at: 1, top: '1', bottom: '50' },
          { id: 'e', at: 14.4, top: '14.4', bottom: '720', tone: 'theta' },
        ],
      }),
    ],
    260,
  );

// Drawing at 1 : 40: a 600 cm wall in real life is 600 ÷ 40 = 15 cm on the plan.
const drawn = (id: string) =>
  figure(
    id,
    [
      rateLine({
        max: 15,
        titles,
        titleRoom: 3.4,
        marks: [
          { id: 'm1', at: 1, top: '1', bottom: '40' },
          { id: 'e', at: 15, top: '15', bottom: '600', tone: 'theta' },
        ],
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm9-7-2-b',
  lessonId: 'm9-7-2',
  title: 'Scale Diagrams and Maps, Part 2: Ratio Scales',
  thumbnailTitle: 'Ratio Scales',
  thumbnail: 'ct',
  summary:
    'A scale of 1 : 50 means 1 unit on the drawing stands for 50 of the same units in real life, so 1 cm on a plan is 50 cm in real life; change units at the end (1 m = 100 cm). A 14.4 cm wall on a 1 : 50 plan is 14.4 × 50 = 720 cm = 7.2 m long. To draw a 6 m wall at 1 : 40, change to centimetres first: 600 ÷ 40 = 15 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 2', title: 'Ratio Scales', subtitle: 'The same unit on both sides' }],
      lines: [
        { say: 'Builders and designers often write a scale as a ratio, like one to fifty. It looks simple, but it hides one important detail about units.', show: 'title' },
        { say: 'In this part, you will use ratio scales to find real lengths, and lengths on a plan.' },
      ],
    },
    {
      chapter: 'What one to fifty means',
      layout: 'split',
      leftWidth: 620,
      left: [counting('ct')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio scale', md: 'A scale of $1 : 50$ means $1$ unit on the drawing stands for $50$ of the **same** units in real life.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 \\text{ m} = 100 \\text{ cm}'] },
      ],
      lines: [
        { say: 'A scale of one to fifty means that one unit on the drawing stands for fifty of the same units in real life.', show: 'def' },
        { say: 'So one centimetre on the plan stands for fifty centimetres in real life. Here is a double number line. The top line is the plan, and the bottom line is real life.', show: ['ct.lines', 'ct.m0', 'ct.m1'], focus: 'ct.m1' },
        { say: 'Two centimetres on the plan is one hundred centimetres in real life. Three centimetres is one hundred fifty, and four centimetres is two hundred.', show: ['ct.m2', 'ct.m3', 'ct.m4'], focus: ['ct.m2', 'ct.m3', 'ct.m4'] },
        { say: 'Notice that both numbers in the ratio use the same unit, usually centimetres. So you often need to change the answer to metres at the end. Remember: one metre is one hundred centimetres.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A plan at one to fifty',
      layout: 'split',
      leftWidth: 620,
      left: [wall('wl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'On a plan with a scale of $1 : 50$, a wall is $14.4$ cm long. How long is the real wall?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['14.4 \\times 50 = 720 \\text{ cm}', '720 \\text{ cm} \\div 100 = 7.2 \\text{ m}'] },
      ],
      lines: [
        { say: 'On a plan drawn to a scale of one to fifty, a wall is fourteen point four centimetres long. How long is the real wall?', show: ['q', 'wl.lines', 'wl.m1', 'wl.e-tt', 'wl.e-top'] },
        { say: 'Step one: real lengths are fifty times as long as plan lengths. So multiply: fourteen point four times fifty.', focus: ['wl.m1', 'wl.e-top'] },
        { say: 'A quick way to multiply by fifty is to multiply by one hundred, then take half. Fourteen point four times one hundred is one thousand four hundred forty, and half of that is seven hundred twenty.', show: ['m.0', 'wl.e-bt', 'wl.e-bottom'], focus: ['m.0', 'wl.e-bottom'] },
        { say: 'The plan length was in centimetres, so this is seven hundred twenty centimetres, not metres.' },
        { say: 'Step two: change to metres. There are one hundred centimetres in a metre, so divide by one hundred. Seven hundred twenty centimetres is seven point two metres. The real wall is seven point two metres long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Drawing at one to forty',
      layout: 'split',
      leftWidth: 620,
      left: [drawn('dr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Ayesha draws a $6$ m wall on a plan with a scale of $1 : 40$. How long is the wall on her plan?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\text{ m} = 600 \\text{ cm}', '600 \\div 40 = 15', '15 \\text{ cm on the plan}'] },
      ],
      lines: [
        { say: 'Now go the other way. Ayesha draws a six metre wall on a plan with a scale of one to forty. How long is the wall on her plan?', show: ['q', 'dr.lines', 'dr.m1'] },
        { say: 'Step one: change to the same unit as the plan. The scale compares centimetres with centimetres, so write six metres as six hundred centimetres.', show: ['m.0', 'dr.e-bt', 'dr.e-bottom'], focus: ['m.0', 'dr.e-bottom'] },
        { say: 'Step two: every forty centimetres in real life takes one centimetre on the plan. So divide by forty. Six hundred divided by forty is fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'The wall is fifteen centimetres long on Ayesha’s plan.', show: ['m.2', 'dr.e-tt', 'dr.e-top'], focus: ['m.2', 'dr.e-top'] },
        { say: 'Check by going forward: fifteen times forty is six hundred centimetres, which is six metres. It works.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A model car is built to a scale of $1 : 24$. The model is $18$ cm long. How long is the real car?',
          choices: ['$0.75$ m', '$4.32$ m', '$43.2$ m', '$432$ m'],
          answer: 1,
          working: '$18 \\times 24 = 432$ cm, and $432 \\div 100 = 4.32$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A model car is built to a scale of one to twenty-four. The model is eighteen centimetres long. How long is the real car? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four point three two metres. Eighteen times twenty-four is four hundred thirty-two centimetres, and dividing by one hundred gives four point three two metres. Choice D forgets to change units: four hundred thirty-two is in centimetres, not metres.', show: 'q.answer' },
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
            'In a scale $1 : n$, both parts use the **same unit**.',
            'Real length $= n \\times$ drawing length.',
            'Drawing length $=$ real length $\\div n$. Change to the same unit first.',
            '$1 \\text{ m} = 100 \\text{ cm}$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a ratio scale such as one to fifty, both parts use the same unit.', show: 'sum.0' },
        { say: 'To find a real length, multiply the drawing length by the second number.', show: 'sum.1' },
        { say: 'To find a drawing length, divide the real length by the second number, after changing it to the same unit.', show: 'sum.2' },
        { say: 'And remember that one metre is one hundred centimetres. In the next part, you will use the much bigger scales on maps. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
