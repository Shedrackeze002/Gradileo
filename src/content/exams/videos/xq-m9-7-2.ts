import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { scaleBar, seg, spot } from '@/content/math9/videos/lib/m9-7-figures.ts';

// Exam question for Math 9 lesson 7.2 (scale diagrams and maps). The free textbooks we use have no
// question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit test.
// (a) 1 cm stands for 25 km, so 6.4 cm stands for 6.4 × 25 = 160 km. (b) 175 km is 175 ÷ 25 = 7 cm
// on the map.

const QUESTION =
  'A map has a scale of 1 cm : 25 km. (a) Two towns are 6.4 cm apart on the map. What is the actual distance between them? (b) A road is 175 km long. How long is it on the map?';

const map = (id: string) =>
  figure(
    id,
    [
      seg('road', [0, 2.2], [6.4, 2.2], { tone: 'theta', dashed: true, label: '6.4\\text{ cm}', side: 'left' }),
      spot('a', [0, 2.2], '\\text{Ashton}', 'below'),
      spot('b', [6.4, 2.2], '\\text{Bayview}', 'below'),
      scaleBar('bar', [0, 0], 1, ['0', '25', '50', '75', '100'], { title: '1\\text{ cm} : 25\\text{ km}' }),
    ],
    300,
  );

const video: Explainer = {
  id: 'xq-m9-7-2',
  lessonId: '',
  exam: {
    lesson: 'm9-7-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Distances on a Map (Scale Diagrams and Maps)',
  thumbnailTitle: 'Distances on a Map',
  thumbnail: 'ask',
  summary:
    'An exam-style question, solved one small step at a time: a map has a scale of 1 cm : 25 km. (a) Two towns are 6.4 cm apart on the map. What is the actual distance? (b) A road is 175 km long. How long is it on the map? Each centimetre on the map stands for 25 km, so 6.4 cm stands for 6.4 × 25 = 160 km. Going the other way, 175 km is 175 ÷ 25 = 7 cm on the map. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Distances on a Map', subtitle: 'Scale diagrams and maps, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about scale diagrams and maps. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'A map has a scale of $1$ cm : $25$ km. (a) Two towns are $6.4$ cm apart on the map. What is the actual distance between them? (b) A road is $175$ km long. How long is it on the map?',
          answer: '(a) $160$ km (b) $7$ cm',
          working: '6.4 × 25 = 160; 175 ÷ 25 = 7',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A map has a scale of 1 centimetre to 25 kilometres. Part a: two towns are 6.4 centimetres apart on the map. What is the actual distance between them? Part b: a road is 175 kilometres long. How long is it on the map?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 600,
      left: [map('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Map scale', md: 'A **map scale** compares a distance on the map with the distance it stands for. $1$ cm : $25$ km means **each** centimetre on the map is $25$ km on the ground.' }],
      lines: [
        { say: 'Here are the two towns on the map, 6.4 centimetres apart, and the scale bar below them.', show: ['ask.a', 'ask.b', 'ask.road', 'ask.bar'] },
        { say: 'A map scale compares a distance on the map with the distance it stands for. 1 centimetre to 25 kilometres means each centimetre on the map is 25 kilometres on the ground.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{map} \\to \\text{actual: multiply by } 25', '\\text{actual} \\to \\text{map: divide by } 25'] }],
      lines: [
        { say: 'Here is what we need. To go from a map distance to an actual distance, multiply by 25, because each centimetre is 25 kilometres.', show: 'm.0' },
        { say: 'To go from an actual distance to a map distance, divide by 25.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Map to actual: **multiply**', '(b) Actual to map: **divide**', 'Give each answer its **unit**'] }],
      lines: [
        { say: 'Here is the plan. Part a goes from the map to the ground, so multiply.', show: 'plan.0' },
        { say: 'Part b goes from the ground to the map, so divide.', show: 'plan.1' },
        { say: 'And give each answer its unit: kilometres on the ground, centimetres on the map.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Multiply, then divide',
      layout: 'split',
      leftWidth: 600,
      left: [map('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } 6.4 \\times 25', '= 160 \\text{ km}', '\\text{(b) } 175 \\div 25', '= 7 \\text{ cm}'] }],
      lines: [
        { say: 'Here is the map again.', show: ['st.a', 'st.b', 'st.road', 'st.bar'] },
        { say: 'Step one, part a. The towns are 6.4 centimetres apart. Each centimetre is 25 kilometres, so multiply: 6.4 times 25.', show: 'm.0', focus: ['st.road', 'm.0'] },
        { say: '6 times 25 is 150, and 0.4 times 25 is 10. Together, 160. The towns are 160 kilometres apart.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two, part b. The road is 175 kilometres long. Each 25 kilometres takes 1 centimetre on the map, so divide: 175 divided by 25.', show: 'm.2', focus: 'm.2' },
        { say: '25 goes into 175 seven times. The road is 7 centimetres long on the map.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['160 \\div 25 = 6.4 \\text{ cm} \\ \\checkmark', '7 \\times 25 = 175 \\text{ km} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by going back the other way. 160 kilometres divided by 25 is 6.4 centimetres, the map distance.', show: 'm.0', focus: 'm.0' },
        { say: 'And 7 centimetres times 25 is 175 kilometres, the length of the road. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['(a) $0.256$ km', '**divided**: map to actual is **multiply**'],
            ['(b) $4375$ cm', '**multiplied**: actual to map is **divide**'],
            ['(a) $160$ cm', 'wrong unit: the ground distance is in **km**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '0.256 kilometres divides by 25. Going from the map to the ground, multiply.' },
        { say: '4 thousand 375 centimetres multiplies in part b. Going from the ground to the map, divide.' },
        { say: 'And 160 centimetres has the wrong unit. On the ground, the distance is in kilometres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A map has a scale of $1$ cm : $40$ km. Two cities are $3.5$ cm apart on the map. How far apart are they?',
          choices: ['$43.5$ km', '$11.4$ km', '$140$ km', '$1400$ km'],
          answer: 2,
          working: '3.5 × 40 = 140 km.',
        },
      ],
      lines: [
        { say: 'Your turn. A map has a scale of 1 centimetre to 40 kilometres. Two cities are 3.5 centimetres apart on the map. How far apart are they? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Map to ground, so multiply: 3.5 times 40. 3 times 40 is 120, and half of 40 is 20. 140 kilometres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read the **scale**: $1$ cm stands for how far?', 'Map to actual: **multiply**', 'Actual to map: **divide**', 'Check by going **back**'] }],
      lines: [
        { say: 'Here is what to remember. Read the scale: how far does 1 centimetre stand for?', show: 'sum.0' },
        { say: 'From the map to the ground, multiply.', show: 'sum.1' },
        { say: 'From the ground to the map, divide.', show: 'sum.2' },
        { say: 'And check by going back the other way. For more on scale diagrams and maps, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
