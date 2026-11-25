import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tag } from '@/content/math9/videos/lib/m9-1-figures.ts';
import { shape, shapeIds } from '@/content/math9/videos/lib/m9-7-figures.ts';

// Exam question for Math 9 lesson 7.1 (scale diagrams and enlargements). The free textbooks we use
// have no question like it at this level, so Gradileo wrote it in the style of a Grade 9 unit
// test. (a) 6 × 2.5 = 15 and 4 × 2.5 = 10, so 15 cm by 10 cm. (b) scale factor = new ÷ original =
// 12 ÷ 30 = 0.4, a reduction since it is less than 1.

const QUESTION =
  'A photo is 6 cm wide and 4 cm tall. (a) It is enlarged with a scale factor of 2.5. What are the dimensions of the enlargement? (b) A drawing 30 cm wide is reduced to 12 cm wide. What is the scale factor?';

type P = [number, number];
const rect = (x: number, y: number, w: number, h: number): P[] => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

const photos = (id: string, big: boolean) =>
  figure(
    id,
    [
      shape({ name: 'o', pts: rect(0, 0, 6, 4), sides: [{ tone: 'adj', label: '6\\text{ cm}' }, { tone: 'opp', label: '4\\text{ cm}' }] }),
      tag('to', [3, 4.1], '\\text{original}', { place: 'above' }),
      shape({ name: 'e', pts: rect(10.5, 0, 15, 10), tone: 'good', sides: [{ tone: 'adj', label: big ? '15\\text{ cm}' : '?' }, { tone: 'opp', label: big ? '10\\text{ cm}' : '?' }] }),
      tag('te', [18, 10.1], '\\text{enlargement, } k = 2.5', { place: 'above' }),
    ],
    420,
  );

const video: Explainer = {
  id: 'xq-m9-7-1',
  lessonId: '',
  exam: {
    lesson: 'm9-7-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Enlarge a Photo (Scale Diagrams and Enlargements)',
  thumbnailTitle: 'Enlarge a Photo',
  thumbnail: 'st',
  summary:
    'An exam-style question, solved one small step at a time: a photo is 6 cm wide and 4 cm tall. (a) It is enlarged with a scale factor of 2.5. What are its new dimensions? (b) A drawing 30 cm wide is reduced to 12 cm wide. What is the scale factor? For an enlargement, multiply every length by the scale factor: 6 × 2.5 = 15 and 4 × 2.5 = 10, so 15 cm by 10 cm. The scale factor is the new length divided by the original: 12 ÷ 30 = 0.4. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Enlarge a Photo', subtitle: 'Scale diagrams and enlargements, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about scale diagrams and enlargements. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A photo is $6$ cm wide and $4$ cm tall. (a) It is enlarged with a scale factor of $2.5$. What are the dimensions of the enlargement? (b) A drawing $30$ cm wide is reduced to $12$ cm wide. What is the scale factor?',
          answer: '(a) $15$ cm by $10$ cm (b) $0.4$',
          working: '6 × 2.5 and 4 × 2.5; 12 ÷ 30',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A photo is 6 centimetres wide and 4 centimetres tall. Part a: it is enlarged with a scale factor of 2.5. What are the dimensions of the enlargement? Part b: a drawing 30 centimetres wide is reduced to 12 centimetres wide. What is the scale factor?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [photos('ask', false), { kind: 'callout', id: 'c', tone: 'definition', title: 'Scale factor', md: 'The **scale factor** $k$ is the number every length is **multiplied** by. $k > 1$ is an **enlargement**; $k < 1$ is a **reduction**.' }],
      lines: [
        { say: 'Here is the photo, and its enlargement. We want the lengths of the enlargement.', show: [...shapeIds('ask', 'o', { lens: true }), 'ask.to', ...shapeIds('ask', 'e', { lens: true }), 'ask.te'] },
        { say: 'The scale factor is the number every length is multiplied by. A scale factor greater than 1 makes an enlargement, and less than 1 makes a reduction.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{new length} = k \\times \\text{original length}', 'k = \\dfrac{\\text{new length}}{\\text{original length}}'] }],
      lines: [
        { say: 'Here is what we need. A new length is the scale factor times the original length.', show: 'm.0' },
        { say: 'Turned around, the scale factor is the new length divided by the original length.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Multiply **each** length by $2.5$', '(b) Divide **new** by **original**', 'Decide: enlargement or **reduction**?'] }],
      lines: [
        { say: 'Here is the plan. For part a, multiply each length by 2.5.', show: 'plan.0' },
        { say: 'For part b, divide the new length by the original length.', show: 'plan.1' },
        { say: 'Then check that the answer fits: an enlargement or a reduction.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Multiply, then divide',
      layout: 'split',
      leftWidth: 620,
      left: [photos('st', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times 2.5 = \\good{15 \\text{ cm}}', '4 \\times 2.5 = \\good{10 \\text{ cm}}', '\\text{(b) } k = \\dfrac{12}{30} = \\good{0.4}'] }],
      lines: [
        { say: 'Here is the photo again.', show: [...shapeIds('st', 'o', { lens: true }), 'st.to'] },
        { say: 'Step one, part a. Multiply the width by the scale factor: 6 times 2.5 is 15 centimetres.', show: ['m.0', 'st.e', 'st.te'], focus: 'm.0' },
        { say: 'Step two. Multiply the height too: 4 times 2.5 is 10 centimetres. The enlargement is 15 centimetres by 10 centimetres.', show: ['m.1', 'st.e-lens'], focus: ['st.e-lens', 'm.1'] },
        { say: 'Step three, part b. The new width is 12, and the original is 30. 12 divided by 30 is 0.4. The scale factor is 0.4, which is less than 1, so it is a reduction, as the question says.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{15}{6} = 2.5 \\text{ and } \\tfrac{10}{4} = 2.5 \\ \\checkmark', '30 \\times 0.4 = 12 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 15 over 6 is 2.5, and 10 over 4 is 2.5. Both sides grew by the same scale factor, so the shape is the same.', show: 'm.0', focus: 'm.0' },
        { say: 'And 30 times 0.4 is 12, the new width. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$8.5$ cm by $6.5$ cm', '**added** $2.5$: a scale factor **multiplies**'],
            ['$15$ cm by $4$ cm', 'scaled only one side: scale **every** length'],
            ['$k = 2.5$ in (b)', 'divided original by new: it is **new ÷ original**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '8.5 by 6.5 adds 2.5 to each side. A scale factor multiplies.' },
        { say: '15 by 4 scales only the width. Every length must be multiplied, or the photo is stretched.' },
        { say: 'And 2.5 in part b divides the original by the new length. The scale factor is new over original, which gives 0.4, less than 1 for a reduction.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rectangle $8$ cm by $5$ cm is reduced with a scale factor of $0.5$. What are its new dimensions?',
          choices: ['$4$ cm by $2.5$ cm', '$16$ cm by $10$ cm', '$7.5$ cm by $4.5$ cm', '$4$ cm by $5$ cm'],
          answer: 0,
          working: '8 × 0.5 = 4 and 5 × 0.5 = 2.5.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle 8 centimetres by 5 centimetres is reduced with a scale factor of 0.5. What are its new dimensions? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '8 times 0.5 is 4, and 5 times 0.5 is 2.5. So 4 centimetres by 2.5 centimetres. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['New length $= k \\times$ original', '$k = $ new $\\div$ original', '$k > 1$ enlarges; $k < 1$ **reduces**', 'Scale **every** length'] }],
      lines: [
        { say: 'Here is what to remember. A new length is the scale factor times the original.', show: 'sum.0' },
        { say: 'The scale factor is the new length divided by the original.', show: 'sum.1' },
        { say: 'A scale factor greater than 1 enlarges, and less than 1 reduces.', show: 'sum.2' },
        { say: 'And scale every length by the same factor. For more on scale diagrams and enlargements, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
