import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part, squarePyramid } from '@/video/solids.ts';

// Exam question for Math 10-4 lesson 8.2 (3-D objects, nets and views). The free OpenStax books have
// no "count the faces, edges and vertices" question at this level, so this one is written by
// Gradileo in the style of a Grade 10 workplace mathematics unit test. A square-based pyramid has
// 1 square base and 4 triangles (5 faces), 4 base edges and 4 slant edges (8 edges), and 4 base
// corners and the apex (5 vertices). Check (Euler): F + V − E = 5 + 5 − 8 = 2.

/** The parts to count, drawn over the pyramid: its faces, its edges and its vertices. */
const marks: Part = {
  points: {},
  items: [
    ...(['ab', 'bc', 'dc', 'ad'] as const).map(
      (e): DiagramItem => ({ kind: 'line', id: `e-${e}`, from: e[0].toUpperCase(), to: e[1].toUpperCase(), tone: 'opp', weight: 5, dashed: e === 'dc' || e === 'ad', group: 'baseedges' }),
    ),
    ...(['A', 'B', 'C', 'D'] as const).map(
      (p): DiagramItem => ({ kind: 'line', id: `s-${p}`, from: p, to: 'V', tone: 'adj', weight: 5, dashed: p === 'D', group: 'slant' }),
    ),
    ...(['A', 'B', 'C', 'D', 'V'] as const).map((p): DiagramItem => ({ kind: 'label', id: `v-${p}`, at: p, tex: '', tone: 'good', dot: true, group: 'verts' })),
  ],
};
const pyramid = (height = 380) => figure('py', [squarePyramid({ b: 6, h: 6 }), marks], height);

const QUESTION = 'A square-based pyramid is a 3-D object. How many faces, edges and vertices does it have?';

const video: Explainer = {
  id: 'xq-m104-8-2',
  lessonId: '',
  exam: {
    lesson: 'm104-8-2',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 10 workplace mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Faces, Edges and Vertices of a Pyramid (3-D Objects)',
  thumbnailTitle: 'Faces, Edges and Vertices of a Pyramid',
  thumbnail: 'py',
  summary:
    'An exam-style question, solved one small step at a time: how many faces, edges and vertices does a square-based pyramid have? We count each kind in turn: 5 faces (a square and 4 triangles), 8 edges (4 round the base and 4 up to the top) and 5 vertices (4 base corners and the apex). Then we check with Euler’s rule and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Faces, Edges and Vertices of a Pyramid', subtitle: '3-D objects, step by step' }],
      lines: [
        { say: 'In this video, we solve a test-style question about 3-D objects. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 10 workplace maths test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: 'A square-based pyramid is a 3-D object. How many faces, edges and vertices does it have?',
          answer: '$5$ faces, $8$ edges, $5$ vertices',
          working: '$F + V - E = 5 + 5 - 8 = 2$',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A square-based pyramid is a 3-D object. How many faces, edges and vertices does it have?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [pyramid(), { kind: 'text', id: 't', size: 'md', md: 'Dashed lines are edges at the **back**, hidden from view. They still **count**.' }],
      lines: [
        { say: 'Here is a square-based pyramid. Its bottom is a square, and its sides rise to a point at the top.', show: 'py.shape' },
        { say: 'The dashed lines are edges at the back, which we cannot see from here. They still count.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{face: a flat surface}', '\\text{edge: where two faces meet}', '\\text{vertex: a corner}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Euler’s rule', md: 'For a solid like this, **faces $+$ vertices $-$ edges $= 2$**. It is a quick way to check a count.' },
      ],
      lines: [
        { say: 'Here is what we need. A face is a flat surface. An edge is a line where two faces meet. A vertex is a corner, where edges meet.', show: 'f' },
        { say: 'And a handy check, called Euler\'s rule: for a solid like this, faces plus vertices minus edges equals 2.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **faces**', 'Count the **edges**', 'Count the **vertices**'] }],
      lines: [
        { say: 'Here is the plan. Count the faces.', show: 'plan.0' },
        { say: 'Count the edges.', show: 'plan.1' },
        { say: 'Then count the vertices.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Faces',
      layout: 'center',
      main: [pyramid(340), { kind: 'math', id: 'm', size: 'md', lines: ['1 \\text{ square} + 4 \\text{ triangles} = \\good{5 \\text{ faces}}'] }],
      lines: [
        { say: 'Step one. The bottom is one square face. Each side of the square has a triangle rising from it, so there are 4 triangles. That makes 5 faces.', show: ['py.shape', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: Edges',
      layout: 'center',
      main: [pyramid(340), { kind: 'math', id: 'm', size: 'md', lines: ['4 \\text{ round the base} + 4 \\text{ up to the top} = \\good{8 \\text{ edges}}'] }],
      lines: [
        { say: 'Step two. There are 4 edges round the square base,', show: ['py.shape', 'py.baseedges'] },
        { say: 'and 4 more running up from each corner to the top. That makes 8 edges.', show: ['py.slant', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 3: Vertices',
      layout: 'center',
      main: [pyramid(340), { kind: 'math', id: 'm', size: 'md', lines: ['4 \\text{ base corners} + 1 \\text{ top} = \\good{5 \\text{ vertices}}'] }],
      lines: [
        { say: 'Step three. The square has 4 corners, and there is 1 more at the top, called the apex. That makes 5 vertices.', show: ['py.shape', 'py.verts', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['F + V - E = 5 + 5 - 8 = 2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with Euler\'s rule. Faces plus vertices minus edges: 5 plus 5 minus 8 is 2. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$4$ faces', 'forgot the **square base** underneath'],
            ['$6$ edges', 'skipped the **hidden** (dashed) edges at the back'],
            ['$4$ vertices', 'forgot the **apex** at the top'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '4 faces counts only the triangles. The square base underneath is a face too.' },
        { say: '6 edges counts only the edges you can see. The dashed edges at the back count as well.' },
        { say: 'And 4 vertices forgets the point at the top.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A triangular prism has two triangle ends joined by three rectangles. How many edges does it have?',
          choices: ['$6$', '$5$', '$9$', '$12$'],
          answer: 2,
          working: '$3$ edges on each triangle end, plus $3$ joining them: $3 + 3 + 3 = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular prism has two triangle ends joined by three rectangles. How many edges does it have? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Each triangle end has 3 edges, which makes 6, and 3 more edges join the two ends. That is 9 edges. Choice "C".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Faces**: flat surfaces', '**Edges**: where faces meet', '**Vertices**: corners', 'Check: $F + V - E = 2$'] }],
      lines: [
        { say: 'Here is what to remember. Faces are the flat surfaces.', show: 'sum.0' },
        { say: 'Edges are where two faces meet, including the hidden ones.', show: 'sum.1' },
        { say: 'Vertices are the corners.', show: 'sum.2' },
        { say: 'And check with Euler\'s rule: faces plus vertices minus edges is 2. For more on 3-D objects, nets and views, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
