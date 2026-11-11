import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-27-1',
  lessonId: 'mx-27-1',
  title: 'The Midpoint and Proportionality Theorems',
  thumbnail: 'm',
  summary: 'The line joining the midpoints of two sides of a triangle is parallel to the third side and half its length, so BC = 17 cm gives DE = 8.5 cm. More generally, a line parallel to one side divides the other two sides in the same ratio: if DE ∥ BC, then AD/DB = AE/EC and AD/AB = AE/AC. Match part with part, or part of a side with the whole side.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometry Theorems, Vectors and Transformation Matrices', title: 'The Midpoint and Proportionality Theorems', subtitle: 'Lines parallel to a side of a triangle' }],
      lines: [
        { say: 'Join the middles of two sides of any triangle, and something neat happens: the new line is parallel to the third side, and exactly half as long.', show: 'title' },
        { say: 'In this video, you will learn this midpoint theorem, and then widen it to any line drawn parallel to a side.' },
      ],
    },
    {
      chapter: 'The midpoint theorem',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 420,
          points: { A: [2, 4], B: [0, 0], C: [6, 0], D: [1, 2], E: [4, 2] },
          items: [
            { kind: 'line', id: 'ab', from: 'A', to: 'B', weight: 3 },
            { kind: 'line', id: 'ac', from: 'A', to: 'C', weight: 3 },
            { kind: 'line', id: 'bc', from: 'B', to: 'C', weight: 3, label: '17' },
            { kind: 'line', id: 'de', from: 'D', to: 'E', tone: 'brand', weight: 3, label: '8.5', labelSide: 'right' },
            { kind: 'label', id: 'la', at: 'A', tex: 'A', place: 'above' },
            { kind: 'label', id: 'lb', at: 'B', tex: 'B', place: 'left' },
            { kind: 'label', id: 'lc', at: 'C', tex: 'C', place: 'right' },
            { kind: 'label', id: 'ld', at: 'D', tex: 'D', place: 'left', dot: true },
            { kind: 'label', id: 'le', at: 'E', tex: 'E', place: 'right', dot: true },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Midpoint theorem', md: 'The segment joining the midpoints of two sides is **parallel to the third side** and **half its length**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['DE = \\tfrac{1}{2}BC = \\tfrac{1}{2} \\times 17 = 8.5'] },
      ],
      lines: [
        { say: 'In triangle ABC, D is the midpoint of AB, and E is the midpoint of AC.', show: ['g.ab', 'g.ac', 'g.bc', 'g.la', 'g.lb', 'g.lc', 'g.ld', 'g.le'] },
        { say: 'The midpoint theorem says that DE is parallel to BC, and half as long.', show: ['g.de', 'def'] },
        { say: 'The reason is similarity. Triangles ADE and ABC share the angle at A, and each side from A is halved, so the small triangle is the big one with a scale factor of a half.' },
        { say: 'So if BC is seventeen centimetres, DE is eight point five centimetres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Expressions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['BC = 2 \\times DE', '3x + 2 = 2(x + 4)', '3x + 2 = 2x + 8 \\ \\Rightarrow \\ x = 6', 'BC = 20 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Suppose DE is x plus four centimetres, and BC is three x plus two. BC is twice DE.', show: 'm.0', focus: 'm.0' },
        { say: 'So three x plus two equals two lots of x plus four.', show: 'm.1', focus: 'm.1' },
        { say: 'Expanding, three x plus two equals two x plus eight, so x is six.', show: 'm.2', focus: 'm.2' },
        { say: 'Then BC is twenty centimetres. Joining all three midpoints gives a triangle with half the perimeter and a quarter of the area.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The proportionality theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proportionality theorem', md: 'A line parallel to one side of a triangle divides the other two sides in the same ratio.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{AD}{DB} = \\dfrac{AE}{EC}: \\quad \\dfrac{4}{6} = \\dfrac{6}{EC} \\ \\Rightarrow \\ EC = 9', '\\dfrac{AD}{AB} = \\dfrac{AE}{AC}: \\quad \\dfrac{3}{12} = \\dfrac{AE}{20} \\ \\Rightarrow \\ AE = 5'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Parts and wholes', md: 'Match part with part, or part with whole, on both sides.' },
      ],
      lines: [
        { say: 'The line does not need to pass through midpoints, as long as it is parallel to a side. Then it divides the other two sides in the same ratio.', show: 'def' },
        { say: 'If AD is four, DB is six, and AE is six, then four over six equals six over EC, so EC is nine centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The line also cuts off the same fraction of each whole side. With AD of three, AB of twelve, and AC of twenty, AE is five centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Keep each ratio consistent. Matching a part with a whole side gives a wrong answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$DE \\parallel BC$, $AD = x$, $DB = x + 3$, $AE = 4$ and $EC = 6$. Find $x$.',
          choices: ['$2$', '$4$', '$6$', '$9$'],
          answer: 2,
          working: '$\\dfrac{x}{x + 3} = \\dfrac{4}{6}$, so $6x = 4x + 12$ and $x = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. DE is parallel to BC. Find x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. X over x plus three equals four over six. Cross-multiplying gives six x equals four x plus twelve, so x is six. Choice B is the length of AE.', show: 'q.answer' },
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
          items: ['Midpoint theorem: parallel to the third side and half its length.', 'All three midpoints: half the perimeter, a quarter of the area.', 'If $DE \\parallel BC$: $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$ and $\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The line joining the midpoints of two sides is parallel to the third side and half its length.', show: 'sum.0' },
        { say: 'Joining all three midpoints gives a triangle with half the perimeter and a quarter of the area.', show: 'sum.1' },
        { say: 'And a line parallel to one side divides the other two sides in the same ratio. See you in the next lesson!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
