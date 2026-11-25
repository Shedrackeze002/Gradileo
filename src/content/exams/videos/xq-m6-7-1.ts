import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fold, join, mark, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { paper, span, tag, type P } from '@/content/math6/videos/lib/m6-7-figures.ts';

// Exam question for Math 6 lesson 7.1 (symmetry between shapes). The free OpenStax books have no
// question like this at this level, so this one is written by Gradileo in the style of a Grade 6
// mathematics unit test. Shape 2 is shape 1 flipped over the vertical line m (x = 6): every corner
// (x, y) goes to (12 − x, y), so the foot that points right now points left. Corner A (3, 1) is 3
// squares left of m, so A′ (9, 1) is 3 squares right of it.

const QUESTION =
  'Shape 1 and shape 2 are drawn on squared paper, on either side of line m. (a) Is shape 2 the image of shape 1 after a reflection in line m, a rotation, or a slide? Explain how you know. (b) Corner A of shape 1 is 3 squares from line m. How far from line m is the matching corner A′ of shape 2?';

const BOOT: P[] = [
  [1, 1],
  [3, 1],
  [3, 2],
  [2, 2],
  [2, 5],
  [1, 5],
];
const mirror = (pts: P[], x = 6): P[] => pts.map(([a, b]) => [2 * x - a, b]);

const boots = (id: string) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, 12], y: [0, 6] }),
        fold({ id: 'm', a: [6, -0.3], b: [6, 6.3] }),
        tag({ id: 'm-name', at: [6, 6.3], tex: 'm', place: 'above', tone: 'good' }),
        shape({ id: 's1', pieces: [BOOT], tone: 'adj', shade: 0.3 }),
        tag({ id: 'n1', at: [1.5, 5.5], tex: '1' }),
        shape({ id: 's2', pieces: [mirror(BOOT)], tone: 'opp', shade: 0.3 }),
        tag({ id: 'n2', at: [10.5, 5.5], tex: '2' }),
        mark({ id: 'A', at: [3, 1], tex: 'A', place: 'below', tone: 'adj' }),
        mark({ id: 'A2', at: [9, 1], tex: "A'", place: 'below', tone: 'opp' }),
        span({ id: 'd1', a: [3, 1], b: [6, 1], label: '3', side: 'left' }),
        span({ id: 'd2', a: [6, 1], b: [9, 1], label: '3', side: 'left' }),
      ),
    ],
    440,
  );

const video: Explainer = {
  id: 'xq-m6-7-1',
  lessonId: '',
  exam: {
    lesson: 'm6-7-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 6 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Reflection, Rotation or Slide? (Symmetry Between Shapes)',
  thumbnailTitle: 'Reflection, Rotation or Slide?',
  thumbnail: 'bt',
  summary:
    'An exam-style question, solved one small step at a time: two shapes sit on squared paper on either side of line m. Is shape 2 a reflection of shape 1 in line m, a rotation, or a slide? And corner A is 3 squares from m: how far is the matching corner A′? Shape 2 faces the opposite way, so it was flipped: it is a reflection. A reflected point is the same distance from the mirror line, so A′ is also 3 squares from m. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Reflection, Rotation or Slide?', subtitle: 'Symmetry between shapes, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about symmetry between two shapes. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Shape $1$ and shape $2$ are drawn on squared paper, on either side of line $m$. (a) Is shape $2$ the image of shape $1$ after a reflection in line $m$, a rotation, or a slide? Explain how you know. (b) Corner $A$ of shape $1$ is $3$ squares from line $m$. How far from line $m$ is the matching corner $A\'$ of shape $2$?',
          answer: '(a) a reflection: shape $2$ faces the **opposite** way (b) $3$ squares',
          working: 'flipped, not turned; same distance from the mirror line',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Shape 1 and shape 2 are drawn on squared paper, on either side of line m. Part a. Is shape 2 the image of shape 1 after a reflection in line m, a rotation, or a slide? Explain how you know. Part b. Corner A of shape 1 is 3 squares from line m. How far from line m is the matching corner, A prime, of shape 2?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [boots('bt')],
      lines: [
        { say: 'Here are the two shapes. Each looks like a boot, and line m runs down the middle between them.', show: ['bt.paper', 'bt.m', 'bt.m-name', 'bt.s1', 'bt.n1', 'bt.s2', 'bt.n2'] },
        { say: 'The image is the shape after the move. We must decide which move takes shape 1 onto shape 2, and then find how far the corner A prime is from the line.', show: ['bt.A', 'bt.A2'], focus: ['bt.A', 'bt.A2'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Move', 'What it does'], rows: [['**slide**', 'faces the **same** way, not turned'], ['**rotation**', 'turned about a point: the shape is **tipped round**'], ['**reflection**', '**flipped** over a line: it faces the **opposite** way, and each point is the **same distance** from the line']] }],
      lines: [
        { say: 'Here is what we need. A slide moves a shape without turning it, so it faces the same way.', show: 't' },
        { say: 'A rotation turns a shape about a point, so it ends up tipped round.' },
        { say: 'A reflection flips a shape over a mirror line. The image faces the opposite way, and each point of the image is the same distance from the line as the point it came from.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Look at which way each shape **faces**', 'Name the **move**', 'Count the squares from **A** and **A′** to the line'] }],
      lines: [
        { say: 'Here is the plan. Look at which way each shape faces.', show: 'plan.0' },
        { say: 'Name the move.', show: 'plan.1' },
        { say: 'Then count the squares from A and from A prime to the line.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Name the move',
      layout: 'split',
      leftWidth: 560,
      left: [boots('bt')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{toe: right} \\to \\text{left}', '\\text{(a) } \\good{\\text{a reflection}}', 'A: 3 \\text{ squares}, \\ A\': \\good{3 \\text{ squares}}'] }],
      lines: [
        { say: 'Step one. The toe of boot 1 points right, toward the line. The toe of boot 2 points left, also toward the line. Both stand upright.', show: ['bt.paper', 'bt.m', 'bt.m-name', 'bt.s1', 'bt.n1', 'bt.s2', 'bt.n2', 'm.0'], focus: 'm.0' },
        { say: 'Step two. A slide would keep the toe pointing right, and a rotation would tip the boot over. Boot 2 is upright but faces the opposite way, so it was flipped. Shape 2 is a reflection of shape 1 in line m.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Count from A to the line: 1, 2, 3 squares.', show: ['bt.A', 'bt.d1'], focus: 'bt.d1' },
        { say: 'In a reflection, the image is the same distance from the line, on the other side. So A prime is also 3 squares from line m.', show: ['bt.A2', 'bt.d2', 'm.2'], focus: ['bt.d2', 'm.2'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{boot 1 top: } 5 \\text{ and } 4 \\text{ squares from } m', '\\text{boot 2 top: } 5 \\text{ and } 4 \\text{ squares from } m \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check another pair of corners. The top corners of boot 1 are 5 and 4 squares from the line.', show: 'm.0' },
        { say: 'The top corners of boot 2 are also 5 and 4 squares away, on the other side. The corners match, so the reflection works. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['"a slide"', 'a slide faces the **same** way: boot $2$ faces the **other** way'],
            ['"a rotation"', 'a turn would **tip** the boot: boot $2$ is still upright'],
            ['(b) $6$ squares', 'that is from $A$ to $A\'$: we want the distance to the **line**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Calling it a slide misses that boot 2 faces the other way. A slide keeps the direction.' },
        { say: 'Calling it a rotation misses that boot 2 is still standing up. A turn about a point would tip it over.' },
        { say: 'And 6 squares is the distance from A to A prime. The question asks for the distance from A prime to the line, which is half of that.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Point $P$ is $4$ squares to the left of a mirror line. Where is its reflection $P\'$?',
          choices: ['$8$ squares to the right of the line', '$4$ squares to the left of the line', 'on the line', '$4$ squares to the right of the line'],
          answer: 3,
          working: 'A reflection is the same distance from the line, on the other side.',
        },
      ],
      lines: [
        { say: 'Your turn. Point P is 4 squares to the left of a mirror line. Where is its reflection, P prime? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The image is the same distance from the line, on the other side: 4 squares to the right. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Slide: faces the **same** way', 'Rotation: **turned** about a point', 'Reflection: **flipped**, faces the **opposite** way', 'Image points are the **same distance** from the line'] }],
      lines: [
        { say: 'Here is what to remember. A slide keeps a shape facing the same way.', show: 'sum.0' },
        { say: 'A rotation turns it about a point.', show: 'sum.1' },
        { say: 'A reflection flips it, so it faces the opposite way.', show: 'sum.2' },
        { say: 'And in a reflection, each image point is the same distance from the mirror line. For more on symmetry between shapes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
