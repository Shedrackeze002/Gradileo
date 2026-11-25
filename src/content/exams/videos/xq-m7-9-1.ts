import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cart, move, pt, quadrants, quadrantSigns } from '@/content/math7/videos/lib/m7-9-figures.ts';

// Exam question for Math 7 lesson 9.1 (the Cartesian plane). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 11.1, Use the Rectangular Coordinate System,
// CC BY-NC-SA 4.0). The signs of x and y give the quadrant: (−2, 1) is in II, (−3, −1) in III,
// (4, −4) in IV and (−4, 3/2) in II.

const QUESTION =
  'Plot each point on a rectangular coordinate system and identify the quadrant in which the point is located. (a) (−2, 1) (b) (−3, −1) (c) (4, −4) (d) (−4, 3/2)';

const POINTS: [string, number, number, string, 'above left' | 'below left' | 'below right' | 'above right'][] = [
  ['a', -2, 1, '({-2},\\ 1)', 'above right'],
  ['b', -3, -1, '({-3},\\ {-1})', 'below left'],
  ['c', 4, -4, '(4,\\ {-4})', 'below left'],
  ['d', -4, 1.5, '({-4},\\ \\tfrac{3}{2})', 'above left'],
];

const quads = (id: string) => {
  const g = cart();
  return figure(id, [g, quadrants(g, { d: 3 }), quadrantSigns(g, { d: 3 })]);
};

const plot = (id: string) => {
  const g = cart();
  return figure(
    id,
    [
      g,
      ...POINTS.flatMap(([p, x, y, tex, place]) => [
        move(g, `${p}x`, [0, 0], [x, 0], { tone: 'adj', group: `${p}-moves` }),
        move(g, `${p}y`, [x, 0], [x, y], { tone: 'opp', group: `${p}-moves` }),
        pt(g, p, x, y, tex, place, 'theta'),
      ]),
    ],
  );
};

const video: Explainer = {
  id: 'xq-m7-9-1',
  lessonId: '',
  exam: {
    lesson: 'm7-9-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 11.1, Use the Rectangular Coordinate System',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-1-use-the-rectangular-coordinate-system',
    question: QUESTION,
  },
  title: 'Exam Question: Which Quadrant Is Each Point In? (The Cartesian Plane)',
  thumbnailTitle: 'Which Quadrant?',
  thumbnail: 'pl',
  summary:
    'A real test question, solved one small step at a time: plot the points (−2, 1), (−3, −1), (4, −4) and (−4, 3/2), and say which quadrant each one is in. The signs of the coordinates tell us: (−, +) is Quadrant II, (−, −) is Quadrant III and (+, −) is Quadrant IV. So the answers are II, III, IV and II. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Quadrant?', subtitle: 'The Cartesian plane, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about plotting points and naming quadrants. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Plot each point on a rectangular coordinate system and identify the quadrant in which the point is located. (a) $(-2, 1)$ (b) $(-3, -1)$ (c) $(4, -4)$ (d) $(-4, \\tfrac{3}{2})$',
          answer: '(a) Quadrant II (b) Quadrant III (c) Quadrant IV (d) Quadrant II',
          working: 'The signs of x and y give the quadrant.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Plot each point on a rectangular coordinate system, and identify the quadrant in which the point is located. Part a, negative 2, 1. Part b, negative 3, negative 1. Part c, 4, negative 4. Part d, negative 4, 3 halves.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Plot and identify', md: '**Plot** means put a dot at each point on the plane. **Identify the quadrant** means say which of the **four** parts of the plane the dot lands in: I, II, III or IV.' }],
      lines: [
        { say: 'Plot means put a dot at each point on the plane.', show: 'c' },
        { say: 'Identify the quadrant means say which of the four parts of the plane the dot lands in: one, two, three or four.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 560,
      left: [quads('qd')],
      right: [{ kind: 'callout', id: 'c', tone: 'key', title: 'The four quadrants', md: 'The axes cut the plane into **four quadrants**, numbered **counterclockwise** from the top right. The **signs** of $(x, y)$ say which one: $(+, +)$ is I, $(-, +)$ is II, $(-, -)$ is III and $(+, -)$ is IV.' }],
      lines: [
        { say: 'Here is what we need. The two axes cut the plane into four quadrants. They are numbered counterclockwise, starting at the top right.', show: ['qd.grid', 'qd.axes', 'qd.quads', 'c'] },
        { say: 'The signs of x and y tell us the quadrant. Both positive is one. x negative and y positive is two. Both negative is three. And x positive, y negative is four.', show: 'qd.signs', focus: 'qd.signs' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['From the **origin**, move **across** by $x$', 'Then **up or down** by $y$, and put a dot', 'Read the **quadrant** from the signs'] }],
      lines: [
        { say: 'Here is the plan for each point. From the origin, move across by x.', show: 'plan.0' },
        { say: 'Then move up or down by y, and put a dot.', show: 'plan.1' },
        { say: 'Then read the quadrant from the signs.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps: Plot and name',
      layout: 'split',
      leftWidth: 600,
      left: [plot('pl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a) } (\\opp{-}, \\adj{+}) \\to \\good{\\text{II}}', '\\text{(b) } (\\opp{-}, \\opp{-}) \\to \\good{\\text{III}}', '\\text{(c) } (\\adj{+}, \\opp{-}) \\to \\good{\\text{IV}}', '\\text{(d) } (\\opp{-}, \\adj{+}) \\to \\good{\\text{II}}'] }],
      lines: [
        { say: 'Here is the plane.', show: ['pl.grid', 'pl.axes'] },
        { say: 'Part a, negative 2, 1. Go 2 left, then 1 up, and put a dot. x is negative and y is positive, so it is in Quadrant two.', show: ['pl.a-moves', 'pl.a', 'm.0'], focus: ['pl.a', 'm.0'] },
        { say: 'Part b, negative 3, negative 1. Go 3 left, then 1 down. Both are negative, so it is in Quadrant three.', show: ['pl.b-moves', 'pl.b', 'm.1'], focus: ['pl.b', 'm.1'] },
        { say: 'Part c, 4, negative 4. Go 4 right, then 4 down. x is positive and y is negative, so it is in Quadrant four.', show: ['pl.c-moves', 'pl.c', 'm.2'], focus: ['pl.c', 'm.2'] },
        { say: 'Part d, negative 4, 3 halves. 3 halves is one and a half. Go 4 left, then one and a half up. x is negative and y is positive, so it is in Quadrant two.', show: ['pl.d-moves', 'pl.d', 'm.3'], focus: ['pl.d', 'm.3'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [quads('ck')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{(a), (d) left and up: II} \\ \\checkmark', '\\text{(b) left and down: III} \\ \\checkmark', '\\text{(c) right and down: IV} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check, with the map of the quadrants. Parts "a" and "d" go left and up, the top left: Quadrant two.', show: ['ck.grid', 'ck.axes', 'ck.quads', 'm.0'], focus: 'm.0' },
        { say: 'Part b goes left and down, the bottom left: Quadrant three.', show: 'm.1', focus: 'm.1' },
        { say: 'Part c goes right and down, the bottom right: Quadrant four. It checks out.', show: 'm.2', focus: 'm.2' },
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
            ['(a) in Quadrant I', 'missed the **minus**: negative $x$ means **left**'],
            ['(c) in Quadrant II', 'counted **clockwise**: the quadrants go **counterclockwise**'],
            ['(d) at $32$ up', '$\\tfrac{3}{2}$ is a fraction: **one and a half**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Putting part a in Quadrant one misses the minus sign. A negative x means left, so it is in Quadrant two.' },
        { say: 'Calling part c Quadrant two counts the quadrants clockwise. They go counterclockwise, so the bottom right is Quadrant four.' },
        { say: 'And 3 halves is a fraction, one and a half, not 32.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In which quadrant is the point $(-5, 2)$?',
          choices: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
          answer: 1,
          working: 'x is negative (left) and y is positive (up): Quadrant II.',
        },
      ],
      lines: [
        { say: 'Your turn. In which quadrant is the point at negative 5, 2? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'x is negative, so go left. y is positive, so go up. Left and up is the top left: Quadrant two. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$x$ **across** first, then $y$ **up or down**', 'Quadrants go **counterclockwise** from the top right', '$(+,+)$ I, $(-,+)$ II, $(-,-)$ III, $(+,-)$ IV', 'Watch the **minus** signs'] }],
      lines: [
        { say: 'Here is what to remember. Move across by x first, then up or down by y.', show: 'sum.0' },
        { say: 'The quadrants go counterclockwise, starting at the top right.', show: 'sum.1' },
        { say: 'The signs tell you the quadrant.', show: 'sum.2' },
        { say: 'And watch the minus signs. For more on the Cartesian plane, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
