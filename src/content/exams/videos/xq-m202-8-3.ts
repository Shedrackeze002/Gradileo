import type { Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-2 lesson 8.3 (scale diagrams). The question is an exercise from
// OpenStax Elementary Algebra 2e, word for word (section 8.7, Solve Proportion and Similar Figure
// Applications, CC BY-NC-SA 4.0), with its set's instruction in front of it and the book's figure
// description in brackets. New York to Chicago is 8 in on the map and 800 miles for real, so
// 1 in stands for 100 miles, and New York to Memphis, 9.5 in, is 950 miles, as in the book's answer.
// The triangle is drawn to scale from its three map lengths, with north up.

/** The map triangle: Chicago (A), New York (B) and Memphis (C), with its sides in inches. */
const map = (height = 380) =>
  figure(
    'mp',
    [
      triangle({
        name: 'm',
        A: [0, 0],
        B: [8, 0],
        C: [0.182, -5.397],
        names: ['\\text{Chicago}', '\\text{New York}', '\\text{Memphis}'],
        sides: { AB: '8 \\text{ in}', BC: '9.5 \\text{ in}', CA: '5.4 \\text{ in}' },
        tones: { AB: 'adj', BC: 'good' },
      }),
    ],
    height,
  );

const MAP = ['mp.m-shape', 'mp.m-names'];

const QUESTION =
  'Use the map shown. On the map, New York City, Chicago, and Memphis form a triangle whose sides are shown in the figure below. The actual distance from New York to Chicago is 800 miles. Find the actual distance from New York to Memphis. [A triangle with corners Chicago, New York and Memphis. The side from Chicago to New York is 8 inches, the side from New York to Memphis is 9.5 inches, and the side from Memphis to Chicago is 5.4 inches.]';

const video: Explainer = {
  id: 'xq-m202-8-3',
  lessonId: '',
  exam: {
    lesson: 'm202-8-3',
    source: 'OpenStax, Elementary Algebra 2e, Exercise in section 8.7, Solve Proportion and Similar Figure Applications',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/8-7-solve-proportion-and-similar-figure-applications',
    question: QUESTION,
  },
  title: 'Exam Question: A Real Distance From a Map (Scale Diagrams)',
  thumbnailTitle: 'A Real Distance From a Map',
  thumbnail: 'mp',
  summary:
    'A real test question, solved one small step at a time: on a map, New York, Chicago and Memphis form a triangle with sides 8 in, 9.5 in and 5.4 in, and New York to Chicago is really 800 miles. How far is New York from Memphis? We use the known distance to find the scale, 1 inch for 100 miles, and then 9.5 inches is 950 miles. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Real Distance From a Map', subtitle: 'Scale diagrams, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about scale diagrams. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        map(190),
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Use the map shown. On the map, New York City, Chicago, and Memphis form a triangle whose sides are shown in the figure. The actual distance from New York to Chicago is $800$ miles. Find the actual distance from New York to Memphis.',
          answer: '$950$ miles',
          working: '$8$ in stands for $800$ miles, so $1$ in stands for $100$ miles, and $9.5 \\times 100 = 950$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: ['q', ...MAP] },
        { say: 'Use the map shown. On the map, New York City, Chicago, and Memphis form a triangle. The actual distance from New York to Chicago is 800 miles. Find the actual distance from New York to Memphis.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [map(), { kind: 'text', id: 't', size: 'md', md: 'The map is a **scale diagram**: every real distance is shrunk by the **same** amount. The one real distance we know shows how much.' }],
      lines: [
        { say: 'Here is the map triangle. Chicago to New York is 8 inches, New York to Memphis is 9.5 inches, and Memphis to Chicago is 5.4 inches.', show: MAP },
        { say: 'We know one real distance: Chicago to New York is 800 miles. We need the real distance from New York to Memphis.', focus: 'mp.m-AB' },
        { say: 'The map is a scale diagram, so every distance is shrunk by the same amount. The distance we know shows us how much.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'scale', tone: 'key', title: 'The scale', md: 'On a scale diagram, **every** length is in the same ratio to the real length: real length $\\div$ map length is the **same** for every side.' },
        { kind: 'callout', id: 'match', tone: 'tip', title: 'Match the pairs', md: 'Use a map length and the real length of the **same** side to find the scale.' },
      ],
      lines: [
        { say: 'Here is what we need. On a scale diagram, every real length divided by its map length gives the same number. That number is the scale.', show: 'scale' },
        { say: 'To find it, use a map length and the real length of the same side.', show: 'match' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **scale** from New York to Chicago', 'Use it on New York to **Memphis**', '**Check** that the answer makes sense'] }],
      lines: [
        { say: 'Here is the plan. First, find the scale from the side we know, New York to Chicago.', show: 'plan.0' },
        { say: 'Second, use the scale on the side from New York to Memphis.', show: 'plan.1' },
        { say: 'Third, check that the answer makes sense.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Find the scale',
      layout: 'center',
      main: [map(300), { kind: 'math', id: 'm', size: 'md', lines: ['8 \\text{ in} \\to 800 \\text{ mi}, \\quad \\text{so} \\quad 1 \\text{ in} \\to \\good{100} \\text{ mi}'] }],
      lines: [
        { say: 'Step one. On the map, Chicago to New York is 8 inches, and for real it is 800 miles.', show: MAP, focus: 'mp.m-AB' },
        { say: 'Divide both by 8: 1 inch on the map stands for 100 miles.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Use the scale',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{800 \\text{ mi}}{8 \\text{ in}} = \\dfrac{d}{9.5 \\text{ in}}', 'd = 9.5 \\times 100', 'd = \\good{950} \\text{ miles}'] }],
      lines: [
        { say: 'Step two. As a proportion: 800 miles for 8 inches is the same as d miles for 9.5 inches.', show: 'm.0' },
        { say: 'Each inch stands for 100 miles, so multiply 9.5 by 100.', show: 'm.1' },
        { say: 'd is 950. New York is 950 miles from Memphis.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['950 \\div 9.5 = 100 = 800 \\div 8 \\ \\checkmark', '9.5 \\text{ in} > 8 \\text{ in, so } 950 \\text{ mi} > 800 \\text{ mi} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 950 divided by 9.5 is 100, the same scale as 800 divided by 8.', show: 'm.0' },
        { say: 'And it makes sense: on the map, New York to Memphis is longer than New York to Chicago, so the real distance is longer too.', show: 'm.1', focus: 'm.1' },
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
            ['$800 \\div 9.5 \\approx 84$', 'the scale comes from the **same** side: $800$ mi for $8$ in'],
            ['$9.5 \\times 8 = 76$', 'multiply by the miles **per inch**, $100$'],
            ['$950$ in', 'the answer is a real distance, in **miles**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not mix up the sides. The 800 miles goes with the 8 inch side, not the 9.5 inch side.' },
        { say: 'Multiply the map length by the miles per inch, which is 100, not by 8.' },
        { say: 'And give the answer as a real distance, in miles.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On a map, $2$ cm stands for $15$ km. Two towns are $7$ cm apart on the map. How far apart are they really?',
          choices: ['$52.5$ km', '$105$ km', '$30$ km', '$14$ km'],
          answer: 0,
          working: '$1$ cm stands for $15 \\div 2 = 7.5$ km, so $7$ cm stands for $7 \\times 7.5 = 52.5$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. On a map, 2 centimetres stands for 15 kilometres. Two towns are 7 centimetres apart on the map. How far apart are they really? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '1 centimetre stands for 15 divided by 2, which is 7.5 kilometres. So 7 centimetres stands for 7 times 7.5, which is 52.5 kilometres: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A scale diagram shrinks **every** length the same way', 'Find the scale from **one matching pair**', 'Real length $=$ map length $\\times$ scale', 'Check: a longer map length means a longer real one'] }],
      lines: [
        { say: 'Here is what to remember. A scale diagram shrinks or stretches every length the same way.', show: 'sum.0' },
        { say: 'Find the scale from one matching pair: a map length and the real length of the same side.', show: 'sum.1' },
        { say: 'Then multiply any map length by the scale to get the real length.', show: 'sum.2' },
        { say: 'And check that a longer map length gives a longer real one. For more on scale diagrams, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
