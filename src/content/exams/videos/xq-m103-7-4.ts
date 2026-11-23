import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

// Exam question for Math 10-3 lesson 7.4 (scale diagrams and missing sides). The question is a Try
// It from OpenStax Intermediate Algebra 2e, word for word (section 7.5, Solve Applications with
// Rational Equations, CC BY-NC-SA 4.0), with the book's figure described in brackets from its
// alt text: on the map, Portland to Seattle is 1.5 in, Seattle to Boise 4 in and Boise to Portland
// 3.5 in. The map and real triangles are similar, so x/1.5 = 400/4 and x = 150 miles, as in the
// book's answer. Check: the scale is 100 miles per inch, and 1.5 × 100 = 150.

/** The map triangle, drawn to scale: P (0, 0), S (0, 1.5), B (√12, −0.5). */
function map(): Part {
  const points: Record<string, [number, number]> = { P: [0, 0], S: [0, 1.5], B: [Math.sqrt(12), -0.5] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'fill', points: ['P', 'S', 'B'], tone: 'brand', shade: 0.15, group: 'tri' },
    { kind: 'line', id: 'ps', from: 'P', to: 'S', tone: 'theta', weight: 4, label: '1.5 \\text{ in}', labelSide: 'right', group: 'tri' },
    { kind: 'line', id: 'sb', from: 'S', to: 'B', tone: 'adj', weight: 4, label: '4 \\text{ in}', labelSide: 'right', group: 'tri' },
    { kind: 'line', id: 'bp', from: 'B', to: 'P', tone: 'muted', label: '3.5 \\text{ in}', labelSide: 'right', group: 'tri' },
    { kind: 'label', id: 'ns', at: 'S', tex: '\\text{Seattle}', place: 'above', dot: true, group: 'tri' },
    { kind: 'label', id: 'np', at: 'P', tex: '\\text{Portland}', place: 'below', dot: true, group: 'tri' },
    { kind: 'label', id: 'nb', at: 'B', tex: '\\text{Boise}', place: 'right', dot: true, group: 'tri' },
  ];
  return { points, items };
}

const fig = (height = 380) => figure('mp', [map()], height);

const QUESTION =
  'On the map, Seattle, Portland, and Boise form a triangle. The distance between the cities is measured in inches. The figure on the left below represents the triangle formed by the cities on the map. The actual distance from Seattle to Boise is 400 miles. Find the actual distance from Seattle to Portland. [The figure: on the map, Portland to Seattle is 1.5 inches, Seattle to Boise is 4 inches, and Boise to Portland is 3.5 inches.]';

const video: Explainer = {
  id: 'xq-m103-7-4',
  lessonId: '',
  exam: {
    lesson: 'm103-7-4',
    source: 'OpenStax, Intermediate Algebra 2e, Try It in section 7.5, Solve Applications with Rational Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/7-5-solve-applications-with-rational-equations',
    question: QUESTION,
  },
  title: 'Exam Question: From Map Inches to Real Miles (Scale Diagrams)',
  thumbnailTitle: 'How Far Is Seattle to Portland?',
  thumbnail: 'mp',
  summary:
    'A real test question, solved one small step at a time: on a map, Seattle, Portland and Boise form a triangle with sides of 1.5, 4 and 3.5 inches. The actual distance from Seattle to Boise is 400 miles. What is the actual distance from Seattle to Portland? The map triangle and the real one are similar, so we match the sides: x/1.5 = 400/4, which gives x = 150 miles. Then we check with the map scale, 100 miles per inch, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Far Is Seattle to Portland?', subtitle: 'Scale diagrams, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about scale diagrams. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 600,
      left: [fig()],
      right: [{ kind: 'text', id: 'q', size: 'md', md: '**The question:** On the map, Seattle, Portland, and Boise form a triangle. The distance between the cities is measured in inches. The figure on the left below represents the triangle formed by the cities on the map. The actual distance from Seattle to Boise is $400$ miles. Find the actual distance from Seattle to Portland.' }],
      lines: [
        { say: 'Here is the question, from the book, with our drawing of its map triangle.', show: ['mp.tri', 'q'] },
        { say: 'On the map, Seattle, Portland and Boise form a triangle, measured in inches: 1.5 inches from Portland to Seattle, 4 inches from Seattle to Boise, and 3.5 inches from Boise to Portland. The actual distance from Seattle to Boise is 400 miles. Find the actual distance from Seattle to Portland.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Side', 'On the map', 'Real distance'],
          rows: [
            ['Seattle to Boise', '$4$ in', '$400$ mi'],
            ['Seattle to Portland', '$1.5$ in', '$x$ mi'],
          ],
        },
        { kind: 'text', id: 't', size: 'md', md: 'A map is a **scale diagram**: the map triangle and the real triangle are **similar**.' },
      ],
      lines: [
        { say: 'Here is what we know. Seattle to Boise is 4 inches on the map and 400 miles in real life. Seattle to Portland is 1.5 inches on the map. We call its real distance x.', show: 'tab' },
        { say: 'A map is a scale diagram. The triangle on the map and the real triangle have the same shape, so they are similar.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{\\text{real}}{\\text{map}} = \\dfrac{\\text{real}}{\\text{map}}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Match the sides', md: 'Use the side you know in **both** worlds, and the side you want. Keep **real over map** on both sides.' },
      ],
      lines: [
        { say: 'Here is what we need. In similar figures, matching sides are in proportion. Real distance over map distance is the same for every side.', show: 'f' },
        { say: 'Use the side we know in both worlds, Seattle to Boise, and the side we want, Seattle to Portland. Keep real over map on both sides.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Match the **sides**', 'Write the **proportion**', '**Solve** for $x$'] }],
      lines: [
        { say: 'Here is the plan. Match the sides.', show: 'plan.0' },
        { say: 'Write the proportion.', show: 'plan.1' },
        { say: 'Then solve for x.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Match the sides',
      layout: 'split',
      leftWidth: 600,
      left: [fig()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Blue: **Seattle to Boise**, $4$ in $\\to 400$ mi. Yellow: **Seattle to Portland**, $1.5$ in $\\to x$ mi.' }],
      lines: [
        { say: 'Step one. The blue side, Seattle to Boise, is 4 inches on the map and 400 miles for real.', show: ['mp.tri'] },
        { say: 'The yellow side, Seattle to Portland, is 1.5 inches on the map. Its real length is x. We do not need the third side.', show: 't' },
      ],
    },
    {
      chapter: 'Step 2: The proportion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{x}{1.5} = \\dfrac{400}{4}'] }],
      lines: [
        { say: 'Step two. Real over map: x over 1.5 equals 400 over 4.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{x}{1.5} = 100', 'x = 1.5 \\times 100 = \\good{150 \\text{ miles}}'] }],
      lines: [
        { say: 'Step three. 400 over 4 is 100. So x over 1.5 equals 100.', show: 'm.0' },
        { say: 'Multiply both sides by 1.5: x is 150. Seattle to Portland is 150 miles.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{scale: } 400 \\div 4 = 100 \\text{ miles per inch}', '1.5 \\times 100 = 150 \\ \\checkmark', '\\text{Portland to Boise: } 3.5 \\times 100 = 350 \\text{ miles}'] }],
      lines: [
        { say: 'Let us check with the map scale. 4 inches stands for 400 miles, so each inch stands for 100 miles.', show: 'm.0' },
        { say: '1.5 inches is 1.5 times 100, which is 150 miles. And it is the shortest side on the map, so it should be the shortest real distance. It checks out.', show: 'm.1' },
        { say: 'The same scale gives the third side too: Portland to Boise is 3.5 times 100, which is 350 miles.', show: 'm.2' },
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
            ['$\\dfrac{x}{3.5} = \\dfrac{400}{4}$', '$3.5$ in is Portland to **Boise**, not Seattle'],
            ['$\\dfrac{x}{1.5} = \\dfrac{4}{400}$', 'keep **real over map** on both sides'],
            ['$400 \\div 1.5 \\approx 267$ mi', 'the $400$ mi matches the **4 in** side'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Pick the right map side. 3.5 inches is Portland to Boise, not Seattle to Portland.' },
        { say: 'Keep real over map on both sides. Flipping one fraction gives a tiny, wrong answer.' },
        { say: 'And the 400 miles goes with the 4-inch side, not the 1.5-inch side.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'On a map, $3$ cm stands for $45$ km. Two towns are $2.5$ cm apart on the map. How far apart are they really?',
          choices: ['$54$ km', '$112.5$ km', '$37.5$ km', '$18.75$ km'],
          answer: 2,
          working: '$\\dfrac{x}{2.5} = \\dfrac{45}{3} = 15$, so $x = 37.5$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. On a map, 3 centimetres stands for 45 kilometres. Two towns are 2.5 centimetres apart on the map. How far apart are they really? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '45 over 3 is 15, so each centimetre stands for 15 kilometres. 2.5 times 15 is 37.5 kilometres. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A map is a **scale diagram**: similar to the real thing', '**Match** each map side with its real side', 'Keep **real over map** on both sides', 'Check with the scale: real distance **per** map unit'] }],
      lines: [
        { say: 'Here is what to remember. A map is a scale diagram, similar to the real thing.', show: 'sum.0' },
        { say: 'Match each map side with its real side.', show: 'sum.1' },
        { say: 'Keep real over map on both sides of the proportion.', show: 'sum.2' },
        { say: 'And check with the scale, the real distance for each map unit. For more on scale diagrams and missing sides, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
