import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart, triangle } from './lib/m6-8-figures.ts';

const g = cart({ y: [-2, 4] });

// Triangle ABC, A(−4, 1), B(−1, 1), C(−4, 3), translated 5 units right and 2 units down to
// A'(1, −1), B'(4, −1), C'(1, 1). The arrows show one vertex's move: C's (above the shapes),
// B's, or A's (without labels; the working beside the figure gives the numbers).
type P = [number, number];
const ABC: P[] = [
  [-4, 1],
  [-1, 1],
  [-4, 3],
];
const IMAGE: P[] = ABC.map(([x, y]) => [x + 5, y - 2]);
const slide = (id: string, o: { arrows?: 'A' | 'B' | 'C' } = {}) =>
  figure(id, [
    g,
    triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['below left', 'below', 'above left'] }),
    triangle(g, { id: 'i', corners: IMAGE, names: ["A'", "B'", "C'"], places: ['below left', 'below right', 'below left'], tone: 'good' }),
    ...(o.arrows === 'C'
      ? [move(g, 'cx', [-4, 3], [1, 3], { label: '5\\text{ right}', side: 'left' }), move(g, 'cy', [1, 3], [1, 1], { label: '2\\text{ down}', side: 'left' })]
      : o.arrows === 'B'
        ? [move(g, 'bx', [-1, 1], [4, 1], { label: '5\\text{ right}', side: 'left' }), move(g, 'by', [4, 1], [4, -1])]
        : o.arrows === 'A'
          ? [move(g, 'ax', [-4, 1], [1, 1]), move(g, 'ay', [1, 1], [1, -1])]
          : []),
  ]);
const both = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.t`, `${id}.t-fill`, `${id}.t-0`, `${id}.t-1`, `${id}.t-2`];
const image = (id: string) => [`${id}.i`, `${id}.i-fill`, `${id}.i-0`, `${id}.i-1`, `${id}.i-2`];

const video: Explainer = {
  id: 'm6-8-2',
  lessonId: 'm6-8-2',
  title: 'Translations and Reflections, Part 1: Translations',
  thumbnailTitle: 'Translations',
  thumbnail: 'tr',
  summary:
    'A translation slides a shape without turning or flipping it: every point moves the same distance in the same direction, and the image of point A is A′ (A prime). Triangle ABC translated 5 units right and 2 units down: right and left change x, up and down change y, so B(−1, 1) goes to B′(4, −1). To describe a translation, compare a vertex with its image: A(−4, 1) to A′(1, −1) is 5 right and 2 down.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 1', title: 'Translations', subtitle: 'Sliding a shape in the Cartesian plane' }],
      lines: [
        { say: 'In a video game, a spaceship slides across the screen. It does not turn, and it does not flip. It just slides.', show: 'title' },
        { say: 'In this video, you will slide shapes in the Cartesian plane, and see how their coordinates change.' },
      ],
    },
    {
      chapter: 'Translation',
      layout: 'split',
      leftWidth: 640,
      left: [slide('tr', { arrows: 'C' })],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Translation and image',
          md: 'A **translation** slides a shape without turning or flipping it. Every point moves the same distance in the same direction. The new shape is the **image**. The image of $A$ is $A\'$, said "A prime".',
        },
      ],
      lines: [
        { say: 'Here is triangle A B C.', show: both('tr') },
        { say: 'A translation slides a shape without turning or flipping it. Every point moves the same distance, in the same direction.', show: 'def' },
        { say: 'This translation slides the triangle five units to the right, and two units down. Watch Point C: five right, then two down.', show: ['tr.cx', 'tr.cy'], focus: ['tr.cx', 'tr.cy'] },
        { say: 'The new triangle is called the image. The image of Point A is written A with a small mark, and we say A prime. In the same way, the image of B is B prime, and the image of C is C prime.', show: image('tr'), focus: 'tr.i' },
        { say: 'A translation has two parts: a horizontal part, right or left, and a vertical part, up or down.' },
      ],
    },
    {
      chapter: 'Translating a vertex',
      layout: 'split',
      leftWidth: 640,
      left: [slide('tv', { arrows: 'B' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $B\'$, the image of $B(-1,\\ 1)$, after a translation $5$ units right and $2$ units down.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{x: {-1} + 5 = 4}', '\\opp{y: 1 - 2 = {-1}}', "B'(4,\\ {-1})"] },
      ],
      lines: [
        { say: 'Let’s find the coordinates of B prime. Point B is at negative one, one.', show: [...both('tv'), 'q'], focus: 'tv.t-1' },
        { say: 'Moving right changes the x-coordinate. Five units right means add five: negative one plus five is four.', show: ['tv.bx', 'm.0'], focus: ['tv.bx', 'm.0'] },
        { say: 'Moving down changes the y-coordinate. Two units down means subtract two: one minus two is negative one.', show: ['tv.by', 'm.1'], focus: ['tv.by', 'm.1'] },
        { say: 'So B prime is at four, negative one.', show: [...image('tv'), 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Every vertex',
      layout: 'split',
      leftWidth: 640,
      left: [slide('ev')],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Vertex', 'Image'],
          rows: [
            ['$A(-4,\\ 1)$', "$A'(1,\\ {-1})$"],
            ['$B(-1,\\ 1)$', "$B'(4,\\ {-1})$"],
            ['$C(-4,\\ 3)$', "$C'(1,\\ 1)$"],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{x + 5}, \\quad \\opp{y - 2}'] },
      ],
      lines: [
        { say: 'Every vertex moves in the same way. Add five to every x-coordinate, and subtract two from every y-coordinate.', show: [...both('ev'), ...image('ev'), 'm.0'] },
        { say: 'Point A at negative four, one goes to A prime, at one, negative one.', show: 't.0', focus: 't.0' },
        { say: 'Point B at negative one, one goes to B prime, at four, negative one.', show: 't.1', focus: 't.1' },
        { say: 'And Point C at negative four, three goes to C prime, at one, one. The image is the same size and shape, and it faces the same way.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which coordinate changes?', md: '**Right** and **left** change the $x$-coordinate. **Up** and **down** change the $y$-coordinate. Do not mix them up.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{\\text{right or left} \\to x}', '\\opp{\\text{up or down} \\to y}'] },
      ],
      lines: [
        { say: 'Watch out. Right and left change the x-coordinate, because the x-axis runs across.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Up and down change the y-coordinate, because the y-axis runs up and down.', show: 'm.1', focus: 'm.1' },
        { say: 'If you add the five to the y-coordinate by mistake, the image ends up in the wrong place. So always ask: does this move go across, or up and down?' },
      ],
    },
    {
      chapter: 'Describing a translation',
      layout: 'split',
      leftWidth: 640,
      left: [slide('ds', { arrows: 'A' })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(-4,\\ 1) \\to A\'(1,\\ {-1})', '\\adj{x: {-4} \\to 1}', '\\adj{4 + 1 = 5 \\text{ right}}', '\\opp{y: 1 \\to {-1}}', '\\opp{1 + 1 = 2 \\text{ down}}'] }],
      lines: [
        { say: 'Now work backwards. If you see a shape and its image, how do you describe the translation? Compare one vertex with its image.', show: [...both('ds'), ...image('ds')] },
        { say: 'Point A is at negative four, one, and A prime is at one, negative one.', show: 'm.0', focus: 'm.0' },
        { say: 'Across: from negative four to zero is four units, and one more to one. That is five units to the right.', show: ['ds.ax', 'm.1', 'm.2'], focus: ['ds.ax', 'm.1', 'm.2'] },
        { say: 'Up or down: from one to zero is one unit, and one more to negative one. That is two units down.', show: ['ds.ay', 'm.3', 'm.4'], focus: ['ds.ay', 'm.3', 'm.4'] },
        { say: 'So the translation is five units right and two units down.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Point $P(2,\\ {-3})$ is translated $4$ units left and $5$ units up. Where is $P'$?",
          choices: ['$(6,\\ 2)$', '$(-2,\\ 2)$', '$(-2,\\ {-8})$', '$(7,\\ {-7})$'],
          answer: 1,
          working: 'Left changes $x$: $2 - 4 = -2$. Up changes $y$: $-3 + 5 = 2$. So $P\'(-2,\\ 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point P, at two, negative three, is translated four units left and five units up. Where is P prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: x is negative two, and y is two. Four units left changes x: two minus four is negative two. Five units up changes y: negative three plus five is two. Choice A moves right instead of left.', show: 'q.answer' },
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
          items: ['A translation slides every point the same distance in the same direction.', 'Right or left changes $x$. Up or down changes $y$.', 'Describe a translation by its horizontal and vertical parts, such as $5$ units right and $2$ units down.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A translation slides every point the same distance, in the same direction.', show: 'sum.0' },
        { say: 'Right or left changes the x-coordinate. Up or down changes the y-coordinate.', show: 'sum.1' },
        { say: 'Describe a translation by its horizontal part and its vertical part, such as five units right and two units down. In the next part, you will reflect shapes in the axes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
