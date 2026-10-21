import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieAngles, SPORTS } from './lib/m7-10-figures.ts';

// The sports circle graph with each central angle marked: 35% → 126°, 25% → 90°, 20% → 72°,
// 15% → 54° and 5% → 18°.
const ANGLES = [126, 90, 72, 54, 18];
const graph = (id: string) =>
  figure(id, [pieAngles({ slices: SPORTS, percent: true, angles: ANGLES.map((a) => `${a}^\\circ`), arc: 34, dists: [95, 95, 95, 95, 72] })], 560);
const sectors = (id: string) => SPORTS.map((_, i) => `${id}.s${i}`);

const video: Explainer = {
  id: 'm7-10-3-c',
  lessonId: 'm7-10-3',
  title: 'Circle Graphs, Part 3: Central Angles',
  thumbnailTitle: 'Central Angles',
  thumbnail: 'an',
  summary:
    'A central angle has its vertex at the centre of the circle, and the central angles of all the sectors add to 360°, a full turn. Each sector’s central angle is its percent of 360°: for sports of 35%, 25%, 20%, 15% and 5%, the angles are 0.35 × 360° = 126°, 90°, 72°, 54° and 18°, which add to 360°. A quarter of the data, 25%, is a quarter turn, 90°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 3', title: 'Central Angles', subtitle: 'Each sector’s share of 360°' }],
      lines: [
        { say: 'To draw a circle graph, you need to know how wide to make each slice. That width is measured as an angle.', show: 'title' },
        { say: 'In this video, you will find the angle of each sector from its percent.' },
      ],
    },
    {
      chapter: 'Central angles',
      layout: 'split',
      leftWidth: 700,
      left: [graph('ca')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Central angle', md: 'A **central angle** has its vertex at the **centre** of the circle. The central angles of all the sectors add to $360^\\circ$, a full turn.' }],
      lines: [
        { say: 'Here is the circle graph of favourite sports again.', show: sectors('ca') },
        { say: 'Each sector has a central angle. A central angle has its vertex at the centre of the circle, between the two straight edges of the sector.', show: ['def', 'ca.a0'], focus: 'ca.a0' },
        { say: 'All the central angles together go once around the centre. One full turn is three hundred sixty degrees, so the central angles always add to three hundred sixty degrees.' },
      ],
    },
    {
      chapter: 'A quarter of the circle',
      layout: 'split',
      leftWidth: 700,
      left: [graph('qt')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['25\\% = \\tfrac{1}{4} \\text{ of the circle}', '\\tfrac{1}{4} \\text{ of } 360^\\circ = 90^\\circ'] }],
      lines: [
        { say: 'Start with soccer, at twenty-five percent. Twenty-five percent is one quarter of the whole.', show: [...sectors('qt'), 'm.0'], focus: ['qt.s1', 'm.0'] },
        { say: 'So soccer gets one quarter of the circle. One quarter of three hundred sixty degrees is ninety degrees: a square corner.', show: ['qt.a1', 'm.1'], focus: ['qt.a1', 'm.1'] },
        { say: 'In the same way, a sector of fifty percent would be half the circle, one hundred eighty degrees. So the central angle is always the same share of three hundred sixty degrees as the sector is of the data.' },
      ],
    },
    {
      chapter: 'Angles for every sector',
      layout: 'split',
      leftWidth: 700,
      left: [graph('ev')],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Central angle', md: 'central angle $=$ percent $\\times 360^\\circ$' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['0.35 \\times 360^\\circ = 126^\\circ', '0.25 \\times 360^\\circ = 90^\\circ', '0.20 \\times 360^\\circ = 72^\\circ', '0.15 \\times 360^\\circ = 54^\\circ', '0.05 \\times 360^\\circ = 18^\\circ'],
        },
      ],
      lines: [
        { say: 'To find any central angle, multiply the percent by three hundred sixty degrees.', show: [...sectors('ev'), 'key'] },
        { say: 'Hockey is thirty-five percent: zero point three five times three hundred sixty degrees is one hundred twenty-six degrees.', show: ['m.0', 'ev.a0'], focus: ['m.0', 'ev.a0'] },
        { say: 'Soccer is twenty-five percent, which gives ninety degrees. Basketball is twenty percent: zero point two zero times three hundred sixty is seventy-two degrees.', show: ['m.1', 'm.2', 'ev.a1', 'ev.a2'], focus: ['m.1', 'm.2'] },
        { say: 'Volleyball is fifteen percent, which gives fifty-four degrees. And swimming is five percent, which gives eighteen degrees.', show: ['m.3', 'm.4', 'ev.a3', 'ev.a4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Check the total',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['126^\\circ + 90^\\circ + 72^\\circ + 54^\\circ + 18^\\circ = 360^\\circ \\ \\checkmark'] }],
      lines: [
        { say: 'Now check. The central angles should add to one full turn.', show: [] },
        { say: 'One hundred twenty-six plus ninety plus seventy-two plus fifty-four plus eighteen is three hundred sixty degrees. They do, so the angles are right.', show: 'm', focus: 'm' },
        { say: 'This check matches the percents: they add to one hundred percent, so the angles add to all of three hundred sixty degrees.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sector is $30\\%$ of a circle graph. What is its central angle?',
          choices: ['$30^\\circ$', '$120^\\circ$', '$330^\\circ$', '$108^\\circ$'],
          answer: 3,
          working: '$0.30 \\times 360^\\circ = 108^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A sector is thirty percent of a circle graph. What is its central angle? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: one hundred eight degrees. Zero point three zero times three hundred sixty degrees is one hundred eight degrees. Choice A uses the percent as the angle, but the angle is thirty percent of three hundred sixty.', show: 'q.answer' },
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
          items: ['A central angle has its vertex at the centre of the circle.', 'Central angle $=$ percent $\\times 360^\\circ$.', 'The central angles add to $360^\\circ$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A central angle has its vertex at the centre of the circle.', show: 'sum.0' },
        { say: 'The central angle of a sector is its percent times three hundred sixty degrees.', show: 'sum.1' },
        { say: 'And the central angles always add to three hundred sixty degrees. In the next part, you will make a circle graph from a survey. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
