import type { DiagramEl, Explainer } from '@/video/script.ts';

// Exam question for Math 20-3 lesson 5.1 (scale drawings and scale factors). The question is from
// the Chapter 8 Practice Test of OpenStax Elementary Algebra 2e, word for word (CC BY-NC-SA 4.0),
// with the map distances from its figure written out in brackets. 2.4 in on the map is 48 miles, so
// the scale is 48 ÷ 2.4 = 20 miles per inch, and Dayton to Columbus is 3.2 × 20 = 64 miles, as in
// the book's answer. Check: 2.4/48 = 3.2/64 = 0.05.

/** The map triangle, drawn to scale from its three sides (in inches). */
const map = (height = 360): DiagramEl => ({
  kind: 'diagram',
  id: 'map',
  height,
  // PL and PR are spare room at the sides, so the city names are not cut off.
  points: { Ci: [0, 0], Co: [5.3, 0], D: [2.2274, 0.8937], PL: [-1.1, 0], PR: [6.4, 0] },
  items: [
    { kind: 'region', id: 'tri', points: ['Ci', 'Co', 'D'], tone: 'brand', shade: 0.12 },
    { kind: 'line', id: 'cd', from: 'Ci', to: 'D', tone: 'adj', label: '2.4 \\text{ in}', labelSide: 'left' },
    { kind: 'line', id: 'dc', from: 'D', to: 'Co', tone: 'opp', label: '3.2 \\text{ in}', labelSide: 'left' },
    { kind: 'line', id: 'cc', from: 'Co', to: 'Ci', tone: 'muted', label: '5.3 \\text{ in}', labelSide: 'left' },
    { kind: 'label', id: 'lci', at: 'Ci', tex: '\\text{Cincinnati}', place: 'below left', dot: true },
    { kind: 'label', id: 'lco', at: 'Co', tex: '\\text{Columbus}', place: 'below right', dot: true },
    { kind: 'label', id: 'ld', at: 'D', tex: '\\text{Dayton}', place: 'above', dot: true },
  ],
});
const MAP = ['map', 'map.tri', 'map.cd', 'map.dc', 'map.cc', 'map.lci', 'map.lco', 'map.ld'];

const QUESTION =
  'The cities of Dayton, Columbus, and Cincinnati form a triangle in southern Ohio, as shown on the figure below, that gives the map distances between these cities in inches. The actual distance from Dayton to Cincinnati is 48 miles. What is the actual distance between Dayton and Columbus? [The figure: on the map, Dayton to Cincinnati is 2.4 inches, Dayton to Columbus is 3.2 inches, and Columbus to Cincinnati is 5.3 inches.]';

const video: Explainer = {
  id: 'xq-m203-5-1',
  lessonId: '',
  exam: {
    lesson: 'm203-5-1',
    source: 'OpenStax, Elementary Algebra 2e, Chapter 8 Practice Test',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/8-practice-test',
    question: QUESTION,
  },
  title: 'Exam Question: Real Distances from a Map of Ohio (Scale Drawings)',
  thumbnailTitle: 'How Far Is It Really?',
  thumbnail: 'map',
  summary:
    'A real test question, solved one small step at a time: on a map, Dayton, Columbus and Cincinnati form a triangle. Dayton to Cincinnati is 2.4 inches on the map and 48 miles in real life, and Dayton to Columbus is 3.2 inches on the map. How far apart are Dayton and Columbus really? The scale is 48 ÷ 2.4 = 20 miles per inch, so the distance is 3.2 × 20 = 64 miles. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Far Is It Really?', subtitle: 'Scale drawings, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a map drawn to scale. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from a practice test in the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt:
            'The cities of Dayton, Columbus, and Cincinnati form a triangle in southern Ohio, as shown on the figure, that gives the map distances between these cities in inches. The actual distance from Dayton to Cincinnati is $48$ miles. What is the actual distance between Dayton and Columbus?',
          answer: '$64$ miles',
          working: '$48 \\div 2.4 = 20$ miles per inch, and $3.2 \\times 20 = 64$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'The cities of Dayton, Columbus and Cincinnati form a triangle in southern Ohio. A figure gives the distances between them on a map, in inches.' },
        { say: 'The actual distance from Dayton to Cincinnati is 48 miles. What is the actual distance between Dayton and Columbus?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [map(), { kind: 'text', id: 't', size: 'md', md: 'Every inch on the map stands for the **same** number of real miles. That number is the **scale**.' }],
      lines: [
        { say: 'Here is the map. Dayton to Cincinnati is 2.4 inches, Dayton to Columbus is 3.2 inches, and Columbus to Cincinnati is 5.3 inches.', show: MAP },
        { say: 'We know the real distance for one side, Dayton to Cincinnati: 48 miles. We want the real distance for another side, Dayton to Columbus.', focus: ['map.cd', 'map.dc'] },
        { say: 'Every inch on the map stands for the same number of real miles. That number is the scale.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{scale} = \\dfrac{\\text{real distance}}{\\text{map distance}}', '\\text{real distance} = \\text{map distance} \\times \\text{scale}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Find the scale first', md: 'Use the side you know **both** ways, on the map and in real life, to find the scale. Then use the scale on any other side.' },
      ],
      lines: [
        { say: 'Here is what we need. The scale is the real distance divided by the map distance. Here, it tells us how many miles one inch stands for.', show: 'f.0' },
        { say: 'Then any real distance is the map distance times the scale.', show: 'f.1' },
        { say: 'Use the side you know both ways, on the map and in real life, to find the scale. Then use it on any other side.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **scale** from Dayton to Cincinnati', '**Multiply** the Dayton to Columbus map distance by it', '**Check** with a proportion'] }],
      lines: [
        { say: 'Here is the plan. Find the scale, from Dayton to Cincinnati.', show: 'plan.0' },
        { say: 'Multiply the map distance from Dayton to Columbus by the scale.', show: 'plan.1' },
        { say: 'Then check with a proportion.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Scale, then distance',
      layout: 'center',
      main: [map(300), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{scale} = \\dfrac{48 \\text{ mi}}{2.4 \\text{ in}} = 20 \\text{ miles per inch}', '3.2 \\times 20 = \\good{64 \\text{ miles}}'] }],
      lines: [
        { say: 'Step one. 2.4 inches on the map is 48 real miles. 48 divided by 2.4 is 20, so each inch on the map stands for 20 miles.', show: [...MAP, 'm.0'], focus: ['map.cd', 'm.0'] },
        { say: 'Step two. Dayton to Columbus is 3.2 inches on the map. 3.2 times 20 is 64. Dayton and Columbus are 64 miles apart.', show: 'm.1', focus: ['map.dc', 'm.1'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{2.4}{48} = 0.05, \\qquad \\dfrac{3.2}{64} = 0.05 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a proportion. Map distance over real distance should be the same for every side. 2.4 over 48 is 0.05, and 3.2 over 64 is 0.05 too. It checks out.', show: 'm.0', focus: 'm.0' },
        { say: 'It also makes sense: Dayton to Columbus is the longer side on the map, so it should be the longer distance in real life.' },
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
            ['$36$ miles', 'flipped a ratio: the **longer** map side is the **longer** road'],
            ['$153.6$ miles', 'multiplied by $48$: multiply by the **scale**, $20$'],
            ['$106$ miles', 'used $5.3$ in: that is Columbus to **Cincinnati**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '36 miles flips one of the ratios. Dayton to Columbus is longer on the map, so it must be longer in real life, more than 48 miles.' },
        { say: '153.6 multiplies 3.2 by 48. The 48 miles goes with 2.4 inches, not with one inch. Multiply by the scale, 20 miles per inch.' },
        { say: 'And 106 miles uses the 5.3 inch side. That is Columbus to Cincinnati, the wrong pair of cities.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On a map, two towns $3.5$ cm apart are $70$ km apart in real life. Two other towns are $5$ cm apart on the same map. How far apart are they in real life?',
          choices: ['$20$ km', '$350$ km', '$100$ km', '$49$ km'],
          answer: 2,
          working: 'The scale is $70 \\div 3.5 = 20$ km per cm, and $5 \\times 20 = 100$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. On a map, two towns 3.5 centimetres apart are 70 kilometres apart in real life. Two other towns are 5 centimetres apart on the same map. How far apart are they in real life? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The scale is 70 divided by 3.5, which is 20 kilometres per centimetre. 5 times 20 is 100 kilometres. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Scale $=$ real $\\div$ map', 'Find it from a side you know **both** ways', 'Real $=$ map $\\times$ scale', 'Check: **longer** on the map, **longer** in real life'] }],
      lines: [
        { say: 'Here is what to remember. The scale is the real distance divided by the map distance.', show: 'sum.0' },
        { say: 'Find it from a side you know both ways.', show: 'sum.1' },
        { say: 'Any real distance is the map distance times the scale.', show: 'sum.2' },
        { say: 'And check that a longer distance on the map is longer in real life too. For more on scale drawings and scale factors, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
