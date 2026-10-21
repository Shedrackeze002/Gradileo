import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { base, cart, move, pt, shapeIds, triangle } from './lib/m7-9-figures.ts';

type P = [number, number];

// Triangle DEF, D(1, 2), E(4, 3), F(2, 5), was translated 6 units left and 3 units down to
// D'(−5, −1), E'(−2, 0), F'(−4, 2).
const g = cart({ x: [-6, 5], y: [-2, 6] });
const DEF: P[] = [
  [1, 2],
  [4, 3],
  [2, 5],
];
const IMG: P[] = DEF.map(([x, y]) => [x - 6, y - 3]);
const pair = (id: string, o: { from?: number } = {}) =>
  figure(id, [
    g,
    triangle(g, { id: 't', corners: DEF, names: ['D', 'E', 'F'], places: ['below', 'right', 'above'] }),
    triangle(g, { id: 'i', corners: IMG, names: ["D'", "E'", "F'"], places: ['below', 'above right', 'above left'], tone: 'good' }),
    ...(o.from === undefined
      ? []
      : [
          move(g, 'x', DEF[o.from], [IMG[o.from][0], DEF[o.from][1]], { label: '6\\text{ left}', side: 'right', tone: 'adj' }),
          move(g, 'y', [IMG[o.from][0], DEF[o.from][1]], IMG[o.from], { label: '3\\text{ down}', side: 'right', tone: 'opp' }),
        ]),
  ]);

// Two slides in a row from S(2, 1): 4 left and 2 up to T(−2, 3), then 1 right and 5 down to
// U(−1, −2). Together: 3 left and 3 down.
const k = cart({ x: [-4, 4], y: [-3, 4] });
const twice = (id: string) =>
  figure(id, [
    k,
    pt(k, 'S', 2, 1, 'S', 'right', 'theta'),
    move(k, 'a', [2, 1], [-2, 3], { tone: 'adj', dashed: false }),
    pt(k, 'T', -2, 3, 'T', 'above left', 'adj'),
    move(k, 'b', [-2, 3], [-1, -2], { tone: 'hyp', dashed: false }),
    pt(k, 'U', -1, -2, 'U', 'below left', 'hyp'),
    move(k, 'c', [2, 1], [-1, -2], { tone: 'good' }),
  ]);

const video: Explainer = {
  id: 'm7-9-2-c',
  lessonId: 'm7-9-2',
  title: 'Translations, Part 3: Describing a Translation',
  thumbnailTitle: 'Describing a Translation',
  thumbnail: 'ds',
  summary:
    'To describe a translation, follow one vertex to its image and subtract: new x − old x gives the move across, and new y − old y the move up or down. D(1, 2) to D′(−5, −1) is −6 and −3: 6 units left and 3 units down. Two translations in a row make one: add the horizontal moves and add the vertical moves. Always go from the original to the image, or the directions come out backwards.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 3', title: 'Describing a Translation', subtitle: 'What was the slide?' }],
      lines: [
        { say: 'Sometimes you see a shape and its image, and you need to work out the slide that moved it.', show: 'title' },
        { say: 'In this video, you will describe a translation by following one vertex to its image.' },
      ],
    },
    {
      chapter: 'Follow one vertex',
      layout: 'split',
      leftWidth: 660,
      left: [pair('fv', { from: 0 })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Triangle $DEF$ was translated to $D\'E\'F\'$. Describe the translation.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ["D(1,\\ 2) \\to D'(-5,\\ {-1})", '\\adj{\\text{across: } {-5} - 1 = {-6}}', '\\adj{6 \\text{ units left}}', '\\opp{\\text{up/down: } {-1} - 2 = {-3}}', '\\opp{3 \\text{ units down}}'],
        },
      ],
      lines: [
        { say: 'Triangle D E F was translated to triangle D prime, E prime, F prime. What was the translation?', show: [...base('fv'), ...shapeIds('fv', 't'), ...shapeIds('fv', 'i'), 'q'] },
        { say: 'In a translation, every vertex moves the same way, so you only need to follow one. Follow D, at one, two, to its image, D prime, at negative five, negative one.', show: 'm.0', focus: ['fv.t-0', 'fv.i-0', 'm.0'] },
        { say: 'For the move across, subtract: new x minus old x. Negative five minus one is negative six. Negative means left, so the move is six units left.', show: ['fv.x', 'm.1', 'm.2'], focus: ['fv.x', 'm.1', 'm.2'] },
        { say: 'For the move up or down, subtract: new y minus old y. Negative one minus two is negative three. Negative means down, so the move is three units down.', show: ['fv.y', 'm.3', 'm.4'], focus: ['fv.y', 'm.3', 'm.4'] },
        { say: 'So the translation is six units left and three units down.', focus: 'fv' },
      ],
    },
    {
      chapter: 'Check another vertex',
      layout: 'split',
      leftWidth: 660,
      left: [pair('ck', { from: 2 })],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ["F(2,\\ 5) \\to F'(-4,\\ 2)", '\\adj{{-4} - 2 = {-6}}', '\\opp{2 - 5 = {-3}}', '(\\adj{-6},\\ \\opp{-3})'],
        },
      ],
      lines: [
        { say: 'You can check with another vertex. Vertex F is at two, five, and its image, F prime, is at negative four, two, in the top left.', show: [...base('ck'), ...shapeIds('ck', 't'), ...shapeIds('ck', 'i'), 'm.0'], focus: ['ck.t-2', 'ck.i-2'] },
        { say: 'Across: negative four minus two is negative six. Up or down: two minus five is negative three. The same moves, so the answer checks out.', show: ['ck.x', 'ck.y', 'm.1', 'm.2'], focus: ['ck.x', 'ck.y', 'm.1', 'm.2'] },
        { say: 'With signs, six units left and three units down is written as a horizontal move of negative six and a vertical move of negative three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two slides in a row',
      layout: 'split',
      leftWidth: 600,
      left: [twice('tw')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$4$ left and $2$ up, then $1$ right and $5$ down.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{across: } {-4} + 1 = {-3}}', '\\opp{\\text{up/down: } 2 + ({-5}) = {-3}}', '\\good{3 \\text{ left and } 3 \\text{ down}}'] },
      ],
      lines: [
        { say: 'Here is a useful fact. Two translations in a row make one translation.', show: [...base('tw'), 'tw.S', 'q'] },
        { say: 'Point S slides four units left and two units up, to T. Then it slides one unit right and five units down, to U.', show: ['tw.a', 'tw.T', 'tw.b', 'tw.U'], focus: ['tw.a', 'tw.b'] },
        { say: 'To combine them, add the horizontal moves: negative four plus one is negative three. Then add the vertical moves: two plus negative five is negative three.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So the two slides together are one slide of three units left and three units down, straight from S to U.', show: ['tw.c', 'm.2'], focus: ['tw.c', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Going the wrong way', md: 'Describe the move **from** the original **to** the image: new $-$ old. Going from the image back to the original gives the **opposite** directions.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ["\\good{D \\to D'\\!: \\ 6 \\text{ left}, \\ 3 \\text{ down}}", "\\bad{D' \\to D\\!: \\ 6 \\text{ right}, \\ 3 \\text{ up}}"] },
      ],
      lines: [
        { say: 'Watch out. Always describe the move from the original to the image. That is new minus old.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'If you go from the image back to the original by mistake, you get the opposite directions: six units right and three units up. That is the slide that would undo the translation.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Point $G(-2,\\ 4)$ is translated to $G'(3,\\ 1)$. Describe the translation.",
          choices: ['$5$ units right and $3$ units down', '$5$ units left and $3$ units up', '$1$ unit right and $3$ units down', '$3$ units right and $5$ units down'],
          answer: 0,
          working: 'Across: $3 - (-2) = 5$, so $5$ units right. Up or down: $1 - 4 = -3$, so $3$ units down.',
        },
      ],
      lines: [
        { say: 'Your turn. Point G, at negative two, four, is translated to G prime, at three, one. Describe the translation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Across: three minus negative two is five, so five units right. Up or down: one minus four is negative three, so three units down. Choice B goes from the image back to the original.', show: 'q.answer' },
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
          items: ['Follow one vertex to its image. New $-$ old gives each move.', 'Negative across is left, and negative up or down is down.', 'Two translations make one: add the horizontal moves and add the vertical moves.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To describe a translation, follow one vertex to its image. New minus old gives each move.', show: 'sum.0' },
        { say: 'A negative move across means left, and a negative move up or down means down.', show: 'sum.1' },
        { say: 'Two translations in a row make one translation. Add the horizontal moves, and add the vertical moves. In the next lesson, you will flip and turn shapes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
