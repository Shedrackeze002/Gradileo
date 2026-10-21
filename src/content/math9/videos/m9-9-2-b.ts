import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { diamond } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { arcArrow, colourTurns, design, join, logo, mark, pinwheel, shape, tag } from './lib/m9-9-figures.ts';

// The pinwheel, with an arrow for its smallest turn, a quarter turn of 90°.
const wheel = (id: string) =>
  figure(id, [join(shape({ pieces: pinwheel(1.6), tone: 'adj' }), mark({ id: 'ctr', at: [0, 0] }), arcArrow({ id: 'spin', c: [0, 0], r: 2.35, from: 30, to: 120 }), tag({ id: 'deg', at: [0.71, 2.86], tex: '90^\\circ', tone: 'theta' }))], 460);

// The lesson's logo: a regular hexagon with a triangle joining every second corner.
const big = (id: string) => figure(id, [join(design({ pieces: logo(2) }), mark({ id: 'ctr', at: [0, 0] }))], 440);

// The logo turned 60° (the hexagon fits, but the triangle points down), 120°, 240° and 360°.
const logoTurns = (id: string) =>
  figure(
    id,
    [
      colourTurns({
        pieces: logo(1.1),
        marker: [0, 1.1],
        angles: [0, 60, 120, 240, 360],
        gap: 3,
        labels: ['\\text{start}', '60^\\circ\\ \\text{no}', '120^\\circ \\to 1', '240^\\circ \\to 2', '360^\\circ \\to 3'],
        tones: ['ink', 'bad', 'good', 'good', 'good'],
      }),
    ],
    300,
  );

// An eight-pointed star of eight equal diamonds, tips every 45°: it first fits after 45°.
const star = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ pieces: Array.from({ length: 8 }, (_, k) => diamond(k, 1.6)), tone: 'hyp' }),
        mark({ id: 'ctr', at: [0, 0] }),
        arcArrow({ id: 'spin', c: [0, 0], r: 3.35, from: 45, to: 90 }),
        tag({ id: 'deg', at: [1.45, 3.75], tex: '45^\\circ', tone: 'theta' }),
      ),
    ],
    460,
  );

const video: Explainer = {
  id: 'm9-9-2-b',
  lessonId: 'm9-9-2',
  title: 'Rotation Symmetry, Part 2: The Angle of Rotation Symmetry',
  thumbnailTitle: 'The Angle of Rotation',
  thumbnail: 'lg',
  summary:
    'The angle of rotation symmetry is the smallest turn that makes a shape fit onto itself, and it equals 360° divided by the order: 90° for a pinwheel of order 4. A logo made of a regular hexagon with a triangle inside fits after 120°, 240° and 360° but not after 60°, so its order is 3 and its angle is 360° ÷ 3 = 120°. Working backward, a design that first fits after 45° has order 360° ÷ 45° = 8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 2', title: 'The Angle of Rotation Symmetry', subtitle: 'The smallest turn that fits' }],
      lines: [
        { say: 'You know how to count the order of rotation. Now a new question: how far do you have to turn a shape before it first fits onto itself?', show: 'title' },
        { say: 'In this video, you will find the angle of rotation symmetry, and work backward from it to the order.' },
      ],
    },
    {
      chapter: 'The smallest turn',
      layout: 'split',
      leftWidth: 520,
      left: [wheel('pw')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle of rotation symmetry', md: 'The **angle of rotation symmetry** is the **smallest** turn that makes a shape fit onto itself.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{angle} = 360^\\circ \\div \\text{order}', '360^\\circ \\div 4 = 90^\\circ'] },
      ],
      lines: [
        { say: 'The angle of rotation symmetry is the smallest turn that makes a shape fit onto itself.', show: ['def', 'pw.shape', 'pw.ctr'] },
        { say: 'The pinwheel first fits after a quarter turn, ninety degrees. So its angle of rotation symmetry is ninety degrees.', show: ['pw.spin', 'pw.deg'], focus: ['pw.spin', 'pw.deg'] },
        { say: 'Its fits are evenly spaced around the circle: at ninety, one hundred eighty, two hundred seventy and three hundred sixty degrees. Four equal turns make one full turn.' },
        { say: 'So you can find the angle by sharing the full turn equally. The angle of rotation symmetry equals three hundred sixty degrees, divided by the order.', show: 'm.0', focus: 'm.0' },
        { say: 'For the pinwheel, three hundred sixty divided by four is ninety degrees. That matches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A hexagon logo',
      layout: 'split',
      leftWidth: 520,
      left: [big('lg')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'This logo is a regular hexagon with a coloured triangle inside. Find its **order** and its **angle** of rotation symmetry.' }],
      lines: [
        { say: 'Here is a logo. It is a regular hexagon, with an orange triangle inside that joins every second corner. Find its order and its angle of rotation symmetry.', show: ['lg.shape', 'lg.ctr', 'q'] },
        { say: 'On its own, the hexagon would fit onto itself six times in a full turn, every sixty degrees. But the triangle has to fit as well.' },
      ],
    },
    {
      chapter: 'Turning the logo',
      layout: 'center',
      main: [logoTurns('tn'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{order } 3', '\\text{angle} = 360^\\circ \\div 3 = 120^\\circ'] }],
      lines: [
        { say: 'Here is the logo at the start, over a dashed outline of where it began.', show: 'tn.c0' },
        { say: 'Turn it sixty degrees. The hexagon fits, but the triangle now points down, and it started pointing up. That is not a fit.', show: 'tn.c1', focus: 'tn.c1' },
        { say: 'Turn it one hundred twenty degrees. Now the hexagon and the triangle both fit. That is one.', show: 'tn.c2', focus: 'tn.c2' },
        { say: 'At two hundred forty degrees it fits again, that is two. And at three hundred sixty degrees, the full turn, that is three.', show: ['tn.c3', 'tn.c4'], focus: ['tn.c3', 'tn.c4'] },
        { say: 'So the logo has rotation symmetry of order three.', show: 'm.0', focus: 'm.0' },
        { say: 'Its angle of rotation symmetry is three hundred sixty divided by three, which is one hundred twenty degrees. That is exactly the first turn that worked.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'split',
      leftWidth: 520,
      left: [star('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{first fit: } 45^\\circ', '\\text{order} = 360^\\circ \\div 45^\\circ', '\\text{order} = 8'] }],
      lines: [
        { say: 'You can also work backward. This star first fits onto itself after a turn of forty-five degrees. What is its order?', show: ['st.shape', 'st.ctr', 'st.spin', 'st.deg', 'm.0'], focus: ['st.spin', 'st.deg'] },
        { say: 'Count how many forty-five degree turns make one full turn. Divide three hundred sixty by forty-five.', show: 'm.1', focus: 'm.1' },
        { say: 'The answer is eight. So the star has rotation symmetry of order eight, one fit for each of its eight points.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A design first fits onto itself after a turn of $40^\\circ$. What is its order of rotation?',
          choices: ['$9$', '$4$', '$40$', '$8$'],
          answer: 0,
          working: 'The order is $360^\\circ \\div 40^\\circ = 9$: nine turns of $40^\\circ$ make one full turn.',
        },
      ],
      lines: [
        { say: 'Your turn. A design first fits onto itself after a turn of forty degrees. What is its order of rotation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, nine. Three hundred sixty divided by forty is nine, so nine turns of forty degrees make one full turn. Choice B, four, would need a turn of ninety degrees each time.', show: 'q.answer' },
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
          items: [
            'The **angle of rotation symmetry** is the smallest turn that makes a shape fit onto itself.',
            'Angle $= 360^\\circ \\div \\text{order}$. The pinwheel: $360^\\circ \\div 4 = 90^\\circ$.',
            'Every part must fit: the hexagon logo has order $3$ and angle $120^\\circ$.',
            'Work backward: order $= 360^\\circ \\div \\text{angle}$. A first fit at $45^\\circ$ means order $8$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The angle of rotation symmetry is the smallest turn that makes a shape fit onto itself.', show: 'sum.0' },
        { say: 'It equals three hundred sixty degrees divided by the order. For the pinwheel, that is ninety degrees.', show: 'sum.1' },
        { say: 'Every part of a design must fit, so the hexagon logo has order three, and an angle of one hundred twenty degrees.', show: 'sum.2' },
        { say: 'And to work backward, divide three hundred sixty by the angle to get the order. In the next part, you will describe the symmetry of a shape in full: lines, turns, both, or neither. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
