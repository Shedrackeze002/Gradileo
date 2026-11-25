import type { DiagramEl, Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 3.4 (optimization): the largest dog park split into 2 equal
// pens with 300 feet of fencing. The question is an exercise from OpenStax College Algebra 2e, word
// for word (section 5.1, Quadratic Functions, CC BY-NC-SA 4.0), whose answer key gives 75 feet by
// 50 feet. With w for the width (three sides, counting the fence between the pens) and L for the
// length, 3w + 2L = 300, so A = w(150 − 1.5w) = −1.5w² + 150w, greatest at w = 50, with L = 75.

/** The park drawn to scale, 75 by 50, with the fence between the pens; `solved` labels the sides. */
const park = (height = 300, solved = false): DiagramEl => ({
  kind: 'diagram',
  id: 'park',
  height,
  points: { A: [0, 0], B: [75, 0], C: [75, 50], D: [0, 50], M: [37.5, 0], N: [37.5, 50], P1: [18.75, 14], P2: [56.25, 14] },
  items: [
    { kind: 'region', id: 'grass', points: ['A', 'B', 'C', 'D'], tone: 'good', shade: 0.12 },
    { kind: 'label', id: 'p1', at: 'P1', tex: '\\text{pen 1}', place: 'center', tone: 'muted' },
    { kind: 'label', id: 'p2', at: 'P2', tex: '\\text{pen 2}', place: 'center', tone: 'muted' },
    { kind: 'line', id: 'top', from: 'D', to: 'C', tone: 'adj', weight: 5, label: solved ? '75\\text{ ft}' : 'L', labelSide: 'left', group: 'len' },
    { kind: 'line', id: 'bot', from: 'A', to: 'B', tone: 'adj', weight: 5, label: solved ? '75\\text{ ft}' : 'L', labelSide: 'right', group: 'len' },
    { kind: 'line', id: 'left', from: 'A', to: 'D', tone: 'hyp', weight: 5, label: solved ? '50\\text{ ft}' : 'w', labelSide: 'left', group: 'wid' },
    { kind: 'line', id: 'mid', from: 'M', to: 'N', tone: 'hyp', weight: 5, label: solved ? '50\\text{ ft}' : 'w', labelSide: 'right', labelAt: 0.75, group: 'wid' },
    { kind: 'line', id: 'right', from: 'B', to: 'C', tone: 'hyp', weight: 5, label: solved ? '50\\text{ ft}' : 'w', labelSide: 'right', group: 'wid' },
  ],
});

const g = plane({ x: [0, 100], y: [0, 4000], xStep: 10, yStep: 500, every: 2, width: 9, height: 6, titles: { x: 'w\\text{ (ft)}', y: 'A\\text{ (ft}^2)' } });

/** The area A = −1.5w² + 150w against the width, with its highest point. */
const areaGraph = () =>
  figure(
    'ag',
    [
      g,
      plot(g, { id: 'curve', f: (w) => -1.5 * w ** 2 + 150 * w, from: 0, to: 100, tone: 'brand' }),
      polyline(g, { id: 'axis', points: [[50, 0], [50, 3750]], tone: 'good', dashed: true }),
      dots(g, [{ id: 'V', x: 50, y: 3750, tex: '(50, 3750)', tone: 'opp', place: 'above' }]),
    ],
    400,
  );

const QUESTION =
  'Find the dimensions of the rectangular dog park split into 2 pens of the same size producing the greatest possible enclosed area given 300 feet of fencing.';

const video: Explainer = {
  id: 'xq-m201-3-4',
  lessonId: '',
  exam: {
    lesson: 'm201-3-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.1, Quadratic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-1-quadratic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Biggest Dog Park From 300 Feet of Fencing (Optimization)',
  thumbnailTitle: 'The Biggest Dog Park',
  thumbnail: 'park',
  summary:
    'A real test question, solved one small step at a time: 300 feet of fencing makes a rectangular dog park split into 2 equal pens. The fence between the pens means three widths and two lengths, so the area is A = −1.5w² + 150w, and its vertex gives the biggest park: 75 feet by 50 feet. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Biggest Dog Park', subtitle: 'Optimization, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about optimization with a quadratic function. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Find the dimensions of the rectangular dog park split into $2$ pens of the same size producing the greatest possible enclosed area given $300$ feet of fencing.',
          answer: '$75$ feet by $50$ feet',
          working: '$3w + 2L = 300$, so $A = w(150 - 1.5w)$, greatest at $w = 50$, $L = 75$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find the dimensions of the rectangular dog park split into 2 pens of the same size, producing the greatest possible enclosed area, given 300 feet of fencing.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        park(380),
        { kind: 'text', id: 't', size: 'md', md: 'All the fence, **including the fence between the pens**, adds up to $300$ ft. Which length and width give the **most** area?' },
      ],
      lines: [
        { say: 'Here is the park: one rectangle, split into two equal pens by a fence across the middle.', show: 'park' },
        { say: 'Call each length L. There are two of them, along the top and the bottom.', show: 'park.len', focus: 'park.len' },
        { say: 'Call each width w. There are three: the two ends, and the fence between the pens.', show: 'park.wid', focus: 'park.wid' },
        { say: 'All of that fence adds up to 300 feet. The question wants the length and the width that give the most area.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'opt', tone: 'definition', title: 'Optimization', md: 'Write the quantity to make biggest as a **quadratic function** of one variable. If $a < 0$, its **maximum** is at the vertex.' },
        { kind: 'callout', id: 'ax', tone: 'key', title: 'The vertex', md: 'For $A = aw^2 + bw + c$, the vertex is at $w = -\\dfrac{b}{2a}$.' },
      ],
      lines: [
        { say: 'Here is what we need. To optimize, write the quantity you want to make biggest as a quadratic function of one variable. If \"a\" is negative, the parabola opens down, and its maximum is at the vertex.', show: 'opt' },
        { say: 'And for \"a\" w squared plus b w plus c, the vertex is at w equals negative b over 2 \"a\".', show: 'ax' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **fencing** equation and solve for $L$', 'Write the **area** as a quadratic in $w$', 'Find the **vertex**, then $L$'] }],
      lines: [
        { say: 'Here is the plan. First, write an equation for the fencing, and solve it for L.', show: 'plan.0' },
        { say: 'Second, write the area as a quadratic function of w.', show: 'plan.1' },
        { say: 'Third, find the vertex, and then the length.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The fencing',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3w + 2L = 300', '2L = 300 - 3w', 'L = 150 - 1.5w'] }],
      lines: [
        { say: 'Step one. Three widths and two lengths use all 300 feet: 3 w plus 2 L equals 300.', show: 'm.0' },
        { say: 'Take 3 w away from both sides: 2 L equals 300 minus 3 w.', show: 'm.1' },
        { say: 'Divide by 2: L equals 150 minus 1.5 w.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The area',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = wL', 'A = w(150 - 1.5w)', 'A = -1.5w^2 + 150w'] }],
      lines: [
        { say: 'Step two. The area of the whole park is width times length.', show: 'm.0' },
        { say: 'Put in L equals 150 minus 1.5 w.', show: 'm.1' },
        { say: 'Multiply out: \"A\" equals negative 1.5 w squared plus 150 w. \"a\" is negative, so the graph opens down and has a maximum.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The vertex',
      layout: 'split',
      leftWidth: 620,
      left: [areaGraph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['w = -\\dfrac{150}{2(-1.5)} = 50', 'L = 150 - 1.5(50) = 75', '\\good{75 \\text{ ft by } 50 \\text{ ft}}'] }],
      lines: [
        { say: 'Step three. The vertex is at w equals negative 150 over 2 times negative 1.5. That is negative 150 over negative 3, which is 50.', show: ['ag.grid', 'ag.axes', 'ag.curve', 'm.0'] },
        { say: 'Here is the area for every width. It is greatest at w equals 50 feet, where the area is 3,750 square feet.', show: ['ag.axis', 'ag.V'], focus: 'ag.V' },
        { say: 'Then the length is 150 minus 1.5 times 50: 150 minus 75, which is 75 feet.', show: 'm.1' },
        { say: 'So the biggest dog park is 75 feet by 50 feet. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        park(320, true),
        { kind: 'math', id: 'm', size: 'md', lines: ['3(50) + 2(75) = 300 \\ \\checkmark', 'w = 40: \\ 40 \\times 90 = 3600 \\quad w = 60: \\ 60 \\times 60 = 3600'] },
      ],
      lines: [
        { say: 'Let us check. Three widths of 50 and two lengths of 75 use 150 plus 150, which is 300 feet of fence.', show: ['park', 'park.len', 'park.wid', 'm.0'] },
        { say: 'And nearby widths give less area. A width of 40 gives a length of 90 and 3,600 square feet. A width of 60 gives a length of 60, and also 3,600 square feet. Both are less than 3,750.', show: 'm.1' },
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
            ['$2w + 2L = 300$', 'the fence **between** the pens is a third width'],
            ['$3750$', 'that is the **area**; the question asks for the **dimensions**'],
            ['only $w = 50$', 'give **both** dimensions: $75$ ft by $50$ ft'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Forgetting the fence between the pens gives 2 w plus 2 L, and a square 75 feet on each side. But that uses 375 feet of fencing once the middle fence goes in.' },
        { say: '3,750 square feet is the greatest area, but the question asks for the dimensions.' },
        { say: 'And the vertex only gives the width. Finish by finding the length too.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A rectangle has a perimeter of $200$ feet. What is the greatest area it can have?',
          choices: ['$5000$ ft²', '$2500$ ft²', '$10\\,000$ ft²', '$1250$ ft²'],
          answer: 1,
          working: '$2w + 2L = 200$, so $L = 100 - w$ and $A = -w^2 + 100w$. The vertex is at $w = 50$, so $A = 50 \\times 50 = 2500$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle has a perimeter of 200 feet. What is the greatest area it can have? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two widths and two lengths make 200, so L is 100 minus w, and the area is negative w squared plus 100 w. The vertex is at w equals 50, so L is 50 too, and the area is 2,500 square feet, choice B. A uses a length of 100, and C squares the whole 100.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Draw it and **count every piece** of fence', 'Solve the constraint for one variable', 'Write the quantity as a quadratic: **vertex** $= -\\dfrac{b}{2a}$', 'Answer what is asked: here, **both** dimensions'] }],
      lines: [
        { say: 'Here is what to remember. Draw the shape and count every piece of fence.', show: 'sum.0' },
        { say: 'Solve the fencing equation for one variable.', show: 'sum.1' },
        { say: 'Write the area as a quadratic function, and find its vertex with negative b over 2 \"a\".', show: 'sum.2' },
        { say: 'And answer what is asked, here both dimensions. For more on optimization, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
