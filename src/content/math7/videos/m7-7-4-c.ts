import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { disc } from './lib/m7-7-figures.ts';

// The trampoline: a diameter of 10 m, so a radius of 5 m.
const tramp = (id: string) => figure(id, [disc({ r: 5, dAt: 90, dSide: 'left', rAt: 0, rSide: 'right', tone: 'good', shade: 0.22, labels: { d: 'd = 10\\text{ m}', r: 'r = 5\\text{ m}' } })], 420);

// A circle of radius 5 and a circle of radius 10, to scale: twice as wide, four times the area. Each
// radius is labelled under its circle, as the small circle has no room inside for the words.
const twice = (id: string) =>
  figure(
    id,
    [
      disc({ name: 'a', r: 5, rAt: 0, tone: 'good', shade: 0.22, draw: ['r'] }),
      disc({ name: 'b', r: 10, at: [17, 0], rAt: 0, tone: 'bad', shade: 0.14, draw: ['r'] }),
      {
        points: { la: [0, -5.6], lb: [17, -10.6] },
        items: [
          { kind: 'label', id: 'a-rl', at: 'la', tex: 'r = 5', tone: 'adj', place: 'below', group: 'a-r' },
          { kind: 'label', id: 'b-rl', at: 'lb', tex: 'r = 10', tone: 'adj', place: 'below', group: 'b-r' },
        ],
      },
    ],
    380,
  );

const video: Explainer = {
  id: 'm7-7-4-c',
  lessonId: 'm7-7-4',
  title: 'Area of a Circle, Part 3: Given the Diameter',
  thumbnailTitle: 'Area from the Diameter',
  thumbnail: 'tp',
  summary:
    'The area formula A = πr² needs the radius, so when you are given the diameter, take half of it first. A round trampoline with a diameter of 10 m has r = 5 m and an area of π × 25 ≈ 78.5 m². Putting the diameter into the formula, π × 10² ≈ 314.2 m², is four times too big, because a circle twice as wide has four times the area.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 3', title: 'Given the Diameter', subtitle: 'Take half of it first' }],
      lines: [
        { say: 'Round things are often measured straight across, through the middle. That gives you the diameter. But the area formula needs the radius.', show: 'title' },
        { say: 'In this video, you will find the area of a circle from its diameter, and see why skipping one step makes the answer four times too big.' },
      ],
    },
    {
      chapter: 'A trampoline',
      layout: 'split',
      leftWidth: 500,
      left: [tramp('tr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Diameter $10$ m. Find the area to the nearest tenth.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = 10 \\div 2 = 5\\text{ m}', 'A = \\pi \\times 5^2 = \\pi \\times 25'] },
        { kind: 'calc', id: 'calc', keys: 'π × 25', result: '78.53981634' },
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['A \\approx 78.5\\text{ m}^2'] },
      ],
      lines: [
        { say: 'A round trampoline has a diameter of ten metres. Find the area of the mat, to the nearest tenth of a square metre.', show: ['q', 'tr.shape', 'tr.centre', 'tr.d'], focus: 'tr.d' },
        { say: 'The formula needs the radius. The radius is half of the diameter: ten divided by two is five metres.', show: ['m.0', 'tr.r'], focus: ['m.0', 'tr.r'] },
        { say: 'Now use "A" equals pi r squared. Five squared is twenty-five, so the area is pi times twenty-five.', show: 'm.1', focus: 'm.1' },
        { say: 'On the calculator: pi, times twenty-five, gives seventy-eight point five three, and more digits.', show: 'calc' },
        { say: 'The digit after the tenths place is three, so round down. The mat has an area of about seventy-eight point five square metres.', show: 'a.0', focus: 'a.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Putting the diameter into the formula', md: '$\\pi \\times 10^2 \\approx 314.2\\text{ m}^2$ is **four times** too big. Always take half of the diameter before you square it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\pi \\times 10^2 \\approx \\bad{314.2\\text{ m}^2} \\quad \\text{wrong}', '\\pi \\times 5^2 \\approx \\good{78.5\\text{ m}^2} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Here is a very common mistake: putting the diameter straight into the formula. Pi times ten squared is about three hundred fourteen point two square metres.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That is four times too big! The right answer, with the radius, is seventy-eight point five square metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Why four times?',
      layout: 'center',
      main: [twice('tw'), { kind: 'text', id: 't', size: 'md', md: 'Twice as wide **and** twice as tall: $2 \\times 2 = 4$ times the area.' }],
      lines: [
        { say: 'Why four times? Here is a circle with a radius of five, and one with a radius of ten.', show: ['tw.a-shape', 'tw.a-centre', 'tw.a-r', 'tw.b-shape', 'tw.b-centre', 'tw.b-r'] },
        { say: 'The big circle is twice as wide as the small one, and it is also twice as tall.', focus: 'tw.b-shape' },
        { say: 'Twice as wide and twice as tall makes two times two, which is four times the area. Using the diameter in place of the radius draws the big circle instead of the small one.', show: 't' },
        { say: 'So always take half of the diameter first, before you square it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round rug has a diameter of $6$ m. Use $3.14$ for $\\pi$. What is its area?',
          choices: ['$113.04\\text{ m}^2$', '$28.26\\text{ m}^2$', '$18.84\\text{ m}^2$', '$9.42\\text{ m}^2$'],
          answer: 1,
          working: 'The radius is $6 \\div 2 = 3$ m. $A = \\pi r^2 = 3.14 \\times 3^2 = 3.14 \\times 9 = 28.26\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A round rug has a diameter of six metres. Use three point one four for pi. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twenty-eight point two six square metres. The radius is three metres, three squared is nine, and three point one four times nine is twenty-eight point two six. Choice A puts the diameter into the formula, so it is four times too big.', show: 'q.answer' },
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
          items: ['The formula $A = \\pi r^2$ needs the **radius**.', 'Given the diameter, take half of it first: $r = d \\div 2$.', 'Using the diameter instead makes the area four times too big.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The area formula, pi r squared, needs the radius.', show: 'sum.0' },
        { say: 'If you are given the diameter, take half of it first.', show: 'sum.1' },
        { say: 'Using the diameter instead makes the area four times too big. In the next part, you will find the area of shapes made with circles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
