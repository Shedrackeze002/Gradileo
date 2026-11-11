import type { Explainer } from '@/video/script.ts';

const s60 = 3 * Math.sin(Math.PI / 3);
const c60 = 3 * Math.cos(Math.PI / 3);
const s50 = 12 * Math.sin((50 * Math.PI) / 180);
const c50 = 12 * Math.cos((50 * Math.PI) / 180);

const video: Explainer = {
  id: 'mx-10-1',
  lessonId: 'mx-10-1',
  title: 'Bearings',
  thumbnail: 'b',
  summary: 'A bearing is an angle measured clockwise from north and written with three figures, such as 060°. The bearing back differs by 180°, so 060° becomes 240°. A ship that sails 12 km on 050° is 12 sin 50° ≈ 9.2 km east, and 5 km north then 3 km east is √34 ≈ 5.8 km on a bearing of about 031.0°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bearings, Loci and Measures', title: 'Bearings', subtitle: 'Directions measured from north' }],
      lines: [
        { say: 'Sailors, pilots and walkers need a way to give a direction that cannot be misread. North-east is only accurate to the nearest forty five degrees.', show: 'title' },
        { say: 'In this video, you will learn to read and write bearings, find the bearing back, and use trigonometry to work out distances and bearings on a journey.' },
      ],
    },
    {
      chapter: 'Three-figure bearings',
      layout: 'split',
      leftWidth: 620,
      left: [
        {
          kind: 'diagram',
          id: 'b',
          height: 460,
          points: { A: [0, 0], NA: [0, 2.6], B: [s60, c60], NB: [s60, c60 + 2.2], SB: [s60, c60 - 2.2] },
          items: [
            { kind: 'line', id: 'na', from: 'A', to: 'NA', tone: 'muted', arrow: true },
            { kind: 'label', id: 'nal', at: 'NA', tex: 'N', place: 'above', tone: 'muted' },
            { kind: 'label', id: 'A', at: 'A', tex: 'A', place: 'below left', dot: true },
            { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'adj' },
            { kind: 'label', id: 'B', at: 'B', tex: 'B', place: 'right', dot: true },
            { kind: 'angle', id: 'a60', at: 'A', from: 'NA', to: 'B', label: '60^\\circ', tone: 'theta' },
            { kind: 'line', id: 'nb', from: 'B', to: 'NB', tone: 'muted', arrow: true, group: 'back' },
            { kind: 'label', id: 'nbl', at: 'NB', tex: 'N', place: 'above', tone: 'muted', group: 'back' },
            { kind: 'line', id: 'sb', from: 'B', to: 'SB', tone: 'muted', dashed: true, group: 'back' },
            { kind: 'angle', id: 'b60', at: 'B', from: 'SB', to: 'A', label: '60^\\circ', tone: 'good', group: 'back' },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bearing', md: 'An angle measured **clockwise from north**, written with **three figures**: $060^\\circ$, and due west is $270^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{B from A: } 060^\\circ', '\\text{A from B: } 060^\\circ + 180^\\circ', '= 240^\\circ'] },
      ],
      lines: [
        { say: 'A bearing is a direction given as an angle measured clockwise from north. It is always written with three figures, so sixty degrees is written zero six zero, and due west is two seven zero.', caption: 'A bearing is a direction given as an angle measured clockwise from north. It is always written with three figures, so 60° is written 060°, and due west is 270°.', show: 'def' },
        { say: 'Stand at "A" and face north. Turn clockwise through sixty degrees, and you face B. So the bearing of B from "A" is zero six zero degrees.', caption: 'Stand at A and face north. Turn clockwise through 60 degrees, and you face B. So the bearing of B from A is 060°.', show: ['b.na', 'b.nal', 'b.A', 'b.ab', 'b.B', 'b.a60', 'm.0'], focus: ['b.a60', 'm.0'] },
        { say: 'Now the bearing back, of "A" from B. Draw a north line at B too. The two north lines are parallel, so the angle between south and "A" is also sixty degrees.', show: 'b.back', focus: 'b.b60' },
        { say: 'Turning clockwise from north to "A" takes one hundred eighty degrees to reach south, and sixty more. So the bearing of "A" from B is two four zero degrees.', caption: 'Turning clockwise from north to A takes 180 degrees to reach south, and 60 more. So the bearing of A from B is 240°.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'The bearing back',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Add or subtract 180°', md: 'If the bearing is less than $180^\\circ$, **add** $180^\\circ$. If it is $180^\\circ$ or more, **subtract** $180^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['075^\\circ + 180^\\circ = 255^\\circ', '310^\\circ - 180^\\circ = 130^\\circ'] },
      ],
      lines: [
        { say: 'The bearing back always differs from the bearing there by one hundred eighty degrees. If the bearing is less than one hundred eighty, add one hundred eighty. If it is one hundred eighty or more, take one hundred eighty away.', show: 'tip' },
        { say: 'So a bearing of zero seven five degrees has the bearing back two five five degrees.', caption: 'So a bearing of 075° has the bearing back 255°.', show: 'm.0', focus: 'm.0' },
        { say: 'And a bearing of three hundred ten degrees has the bearing back one hundred thirty degrees. The answer must always be between zero and three hundred sixty.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'How far east?',
      layout: 'split',
      leftWidth: 620,
      left: [
        {
          kind: 'diagram',
          id: 's',
          height: 480,
          points: { H: [0, 0], N: [0, 11], S: [s50, c50], F: [s50, 0] },
          items: [
            { kind: 'line', id: 'n', from: 'H', to: 'N', tone: 'muted', arrow: true },
            { kind: 'label', id: 'nl', at: 'N', tex: 'N', place: 'above', tone: 'muted' },
            { kind: 'label', id: 'H', at: 'H', tex: '\\text{Harbour}', place: 'below', dot: true },
            { kind: 'line', id: 'path', from: 'H', to: 'S', tone: 'hyp', label: '12\\text{ km}', labelSide: 'left' },
            { kind: 'label', id: 'S', at: 'S', tex: '\\text{Ship}', place: 'right', dot: true },
            { kind: 'angle', id: 'a50', at: 'H', from: 'N', to: 'S', label: '50^\\circ', tone: 'theta' },
            { kind: 'line', id: 'east', from: 'H', to: 'F', tone: 'opp', dashed: true, label: '\\text{east}', labelSide: 'right' },
            { kind: 'line', id: 'up', from: 'F', to: 'S', tone: 'adj', dashed: true },
            { kind: 'right', id: 'r', at: 'F', from: 'H', to: 'S' },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin 50^\\circ = \\frac{\\text{east}}{12}', '\\text{east} = 12 \\sin 50^\\circ = 9.19\\ldots', '\\approx 9.2\\text{ km}'] },
        { kind: 'text', id: 'n', md: 'North: $12 \\cos 50^\\circ \\approx 7.7$ km.' },
      ],
      lines: [
        { say: 'A journey on a bearing makes a right-angled triangle with the north line, so we can use trigonometry.', show: ['s.n', 's.nl', 's.H'] },
        { say: 'A ship sails twelve kilometres from a harbour on a bearing of zero five zero degrees. How far east of the harbour is it?', caption: 'A ship sails 12 kilometres from a harbour on a bearing of 050°. How far east of the harbour is it?', show: ['s.path', 's.S', 's.a50'], focus: 's.a50' },
        { say: 'The distance east makes a right angle with the north–south direction. It is opposite the fifty degree angle, and the twelve kilometres is the hypotenuse.', show: ['s.east', 's.up', 's.r'], focus: 's.east' },
        { say: 'So sine fifty equals the distance east over twelve, and the distance east is twelve sine fifty, which is about nine point two kilometres.', show: ['m.0', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'In the same way, the distance north is twelve cosine fifty, about seven point seven kilometres.', show: 'n' },
      ],
    },
    {
      chapter: 'Finding a bearing',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'diagram',
          id: 'w',
          height: 470,
          points: { O: [0, 0], P: [0, 5], Q: [3, 5], NQ: [0, 6.4] },
          items: [
            { kind: 'line', id: 'np', from: 'P', to: 'NQ', tone: 'muted', arrow: true },
            { kind: 'label', id: 'nl', at: 'NQ', tex: 'N', place: 'above', tone: 'muted' },
            { kind: 'label', id: 'O', at: 'O', tex: '\\text{Start}', place: 'below', dot: true },
            { kind: 'line', id: 'op', from: 'O', to: 'P', tone: 'adj', label: '5\\text{ km}', labelSide: 'left' },
            { kind: 'line', id: 'pq', from: 'P', to: 'Q', tone: 'opp', label: '3\\text{ km}', labelSide: 'left' },
            { kind: 'right', id: 'r', at: 'P', from: 'O', to: 'Q' },
            { kind: 'line', id: 'oq', from: 'O', to: 'Q', tone: 'hyp' },
            { kind: 'label', id: 'Q', at: 'Q', tex: '\\text{Sam}', place: 'right', dot: true },
            { kind: 'angle', id: 't', at: 'O', from: 'P', to: 'Q', label: '\\theta', tone: 'theta' },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{5^2 + 3^2} = \\sqrt{34}', '= 5.83\\ldots \\approx 5.8\\text{ km}', '\\tan\\theta = \\frac{3}{5}', '\\theta = \\tan^{-1}(0.6) = 30.96\\ldots^\\circ', '\\text{Bearing} \\approx 031.0^\\circ'] },
      ],
      lines: [
        { say: 'Sam walks five kilometres due north, then three kilometres due east. Find Sam’s distance and bearing from the start.', show: ['w.np', 'w.nl', 'w.O', 'w.op', 'w.pq', 'w.r', 'w.Q'] },
        { say: 'The direct line back to the start is the hypotenuse of a right-angled triangle. By Pythagoras’ theorem, it is the square root of five squared plus three squared, which is the square root of thirty four, about five point eight kilometres.', show: ['w.oq', 'm.0', 'm.1'], focus: ['w.oq', 'm.1'] },
        { say: 'The bearing is the angle theta at the start, measured clockwise from north. Three kilometres is opposite theta and five kilometres is next to it, so tan theta is three fifths.', show: ['w.t', 'm.2'], focus: ['w.t', 'm.2'] },
        { say: 'The inverse tangent of zero point six is thirty point nine six degrees, so Sam is on a bearing of about zero three one point zero degrees.', caption: 'The inverse tangent of 0.6 is 30.96 degrees, so Sam is on a bearing of about 031.0°.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The bearing of $Q$ from $P$ is $125^\\circ$. What is the bearing of $P$ from $Q$?',
          choices: ['$305^\\circ$', '$055^\\circ$', '$235^\\circ$', '$125^\\circ$'],
          answer: 0,
          working: '$125^\\circ$ is less than $180^\\circ$, so add $180^\\circ$: $125^\\circ + 180^\\circ = 305^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. The bearing of Q from P is one hundred twenty five degrees. What is the bearing of P from Q? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One hundred twenty five is less than one hundred eighty, so add one hundred eighty, which gives three hundred five degrees. Choice B takes one hundred twenty five from one hundred eighty, and choice C takes it from three hundred sixty.', show: 'q.answer' },
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
          items: ['A bearing is measured clockwise from north, with three figures.', 'The bearing back differs by $180^\\circ$.', 'Draw a north line at each point and find the right-angled triangle.', 'Use Pythagoras’ theorem and trigonometry for distances and bearings.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A bearing is measured clockwise from north, and written with three figures.', show: 'sum.0' },
        { say: 'The bearing back differs by one hundred eighty degrees.', show: 'sum.1' },
        { say: 'Draw a north line at each point, and look for the right-angled triangle.', show: 'sum.2' },
        { say: 'Then use Pythagoras’ theorem and trigonometry to find distances and bearings. In the next lesson, we construct loci. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
