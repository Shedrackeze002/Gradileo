import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, frame, mitreEnd } from './lib/m303-3-figures.ts';

const video: Explainer = {
  id: 'm303-3-3-b',
  lessonId: 'm303-3-3',
  title: 'Problems with Polygons, Part 2: Mitre Cuts',
  thumbnailTitle: 'Mitre Cuts',
  thumbnail: 'fr',
  summary: 'The pieces of a frame meet at mitre joints, and a mitre saw reads 0° for a square cut. At each corner of a regular frame with n sides the frame turns through one exterior angle, 360° ÷ n, and the two pieces share it, so the saw is set to 180° ÷ n: 45° for a square picture frame and 22.5° for an octagonal mirror. Setting 45° for an octagon makes a square. Part 3 covers central angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 2', title: 'Mitre Cuts', subtitle: 'Setting the saw for a frame' }],
      lines: [
        { say: 'A picture frame or a mirror frame is made of straight pieces of wood, cut at an angle so they meet neatly at the corners.', show: 'title' },
        { say: 'In this video, you will find the saw setting for a frame shaped like any regular polygon, and see why it is half of an exterior angle.' },
      ],
    },
    {
      chapter: 'Mitre joints',
      layout: 'split',
      left: [figure('fr', [frame({ n: 8 })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mitre joint', md: 'The pieces of a frame meet at **mitre joints**, where both ends are cut at the same angle. A mitre saw’s scale reads $0^\\circ$ for a square ($90^\\circ$) cut.' },
      ],
      lines: [
        { say: 'Here is a frame for an octagonal mirror. It is made of eight straight pieces, and the bottom one is shaded.', show: ['fr.frame', 'fr.piece'], focus: 'fr.piece' },
        { say: 'Neighbouring pieces meet at mitre joints, the lines across each corner. At a mitre joint, the two pieces are cut at the same angle, so they fit together neatly.', show: ['fr.joints', 'def'], focus: 'fr.joints' },
        { say: 'A mitre saw measures that angle from a square cut. Its scale reads zero degrees for a square cut, straight across the wood at ninety degrees. Turn the saw, and it cuts at an angle off square.' },
      ],
    },
    {
      chapter: 'The saw setting',
      layout: 'split',
      left: [figure('tu', [frame({ n: 8, turn: '45^\\circ' })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{turn at a corner} = \\dfrac{360^\\circ}{n}', '\\text{each piece} = \\dfrac{360^\\circ}{n} \\div 2', '\\text{mitre angle} = \\dfrac{180^\\circ}{n}'] },
      ],
      lines: [
        { say: 'Follow the outside of the frame. At each corner, it turns through one exterior angle. For a regular polygon with n sides, that is 360 divided by n: here, 360 divided by eight, or 45 degrees.', show: ['tu.frame', 'tu.ext', 'tu.turn', 'm.0'], focus: ['tu.turn', 'm.0'] },
        { say: 'Two pieces meet at each corner, and they share that turn equally. Each piece supplies half of it.', show: ['tu.joints', 'm.1'], focus: ['tu.j1', 'm.1'] },
        { say: 'So each end is cut half an exterior angle off square. Half of 360 over n is 180 over n. That is the mitre angle: the saw setting.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'One piece',
      layout: 'split',
      left: [figure('pc', [mitreEnd({ angle: 22.5, label: '22.5^\\circ', length: 5, width: 2.2, r: 90, labelDist: 130, labelAt: -1.4 })])],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Mitre angle', md: 'For a frame shaped like a regular polygon with $n$ sides, set the mitre saw to half an exterior angle, $180^\\circ \\div n$.' },
      ],
      lines: [
        { say: 'Here is one piece of the octagonal frame. The dashed line is where a square cut would go, at zero degrees on the saw.', show: ['pc.piece', 'pc.square'], focus: 'pc.square' },
        { say: 'The real cut is turned 22.5 degrees from it: 180 divided by eight. The outer edge, at the bottom, is the longer edge.', show: ['pc.cut', 'pc.m'], focus: ['pc.cut', 'pc.m'] },
        { say: 'So for a frame shaped like a regular polygon with n sides, set the mitre saw to 180 divided by n degrees.', show: 'key' },
      ],
    },
    {
      chapter: 'Picture frames and mirrors',
      layout: 'center',
      main: [
        figure('two', [
          frame({ name: 'a', n: 4, r: 2.4, width: 0.45 }),
          caption({ id: 'a-cap', at: [0, -2.85], tex: '180^\\circ \\div 4 = 45^\\circ' }),
          frame({ name: 'b', n: 8, r: 2.4, width: 0.45, c: [6.5, 0] }),
          caption({ id: 'b-cap', at: [6.5, -2.85], tex: '180^\\circ \\div 8 = 22.5^\\circ' }),
        ]),
      ],
      lines: [
        { say: 'What saw setting is needed for a square picture frame, and for a regular octagonal mirror frame?', show: ['two.a-frame', 'two.a-joints', 'two.b-frame', 'two.b-joints'] },
        { say: 'A square has four sides, so set the saw to 180 divided by four, which is 45 degrees. That is the familiar 45-degree cut for picture frames.', show: 'two.a-cap', focus: 'two.a-joints' },
        { say: 'An octagon has eight sides: 180 divided by eight is 22.5 degrees. The more sides a frame has, the smaller the cut.', show: 'two.b-cap', focus: 'two.b-joints' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the whole exterior angle', md: 'Setting the saw to $45^\\circ$ for an octagon (its full exterior angle) makes each joint turn $90^\\circ$, and the frame closes up as a **square**. Each of the two pieces at a joint supplies only **half** the turn.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{octagon: } \\bad{45^\\circ} \\;\\to\\; 45^\\circ + 45^\\circ = 90^\\circ \\text{ per corner}', '\\good{22.5^\\circ} \\;\\to\\; 22.5^\\circ + 22.5^\\circ = 45^\\circ \\text{ per corner}'] },
      ],
      lines: [
        { say: 'A common mistake is to set the saw to the whole exterior angle. For an octagon, that is 45 degrees.', show: 'oops' },
        { say: 'But each joint has two cut ends. Two ends cut at 45 degrees turn the frame 90 degrees at every corner, and after four corners it has closed up as a square, not an octagon.', show: 'm.0', focus: 'm.0' },
        { say: 'Two ends cut at 22.5 degrees turn the frame 45 degrees at each corner. Eight corners make the full 360 degrees: an octagon.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What mitre saw setting is needed for a frame shaped like a regular hexagon (6 sides)?',
          choices: ['$60^\\circ$', '$30^\\circ$', '$120^\\circ$', '$15^\\circ$'],
          answer: 1,
          working: 'Mitre angle $= \\dfrac{180^\\circ}{n} = \\dfrac{180^\\circ}{6} = 30^\\circ$, half of the $60^\\circ$ exterior angle.',
        },
      ],
      lines: [
        { say: 'Your turn. What mitre saw setting is needed for a frame shaped like a regular hexagon, with six sides? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 30 degrees. 180 divided by six is 30, half of the sixty-degree exterior angle. Choice A, sixty degrees, is the whole exterior angle. Each piece supplies only half of it.', show: 'q.answer' },
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
            'A mitre saw reads $0^\\circ$ for a square cut.',
            'At each corner, a regular frame turns through one exterior angle, $360^\\circ \\div n$.',
            'Each piece supplies half: set the saw to $180^\\circ \\div n$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A mitre saw measures the cut from square: zero degrees is a square cut.', show: 'sum.0' },
        { say: 'At each corner, a frame shaped like a regular polygon turns through one exterior angle, 360 divided by n.', show: 'sum.1' },
        { say: 'The two pieces at a joint share that turn, so set the saw to half of it: 180 divided by n. In the next part, we split a regular polygon into triangles from its centre. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
