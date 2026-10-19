import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { cells, counts, note, paper } from './lib/m5-10-figures.ts';

type P = [number, number];

// The triangle with corners (1, 1), (5, 1) and (1, 5): 6 whole squares, and 4 squares cut in half by its slanted side.
const whole: P[] = [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [1, 3]];
const halves: P[] = [[4, 1], [3, 2], [2, 3], [1, 4]];
const triangle = () =>
  figure('tri', [
    paper({ cols: 6, rows: 6 }),
    cells({ id: 'w', list: whole, tone: 'good', shade: 0.35 }),
    cells({ id: 'h', list: halves, tone: 'opp', shade: 0.45, half: true }),
    {
      points: { t0: [1, 1], t1: [5, 1], t2: [1, 5] },
      items: [{ kind: 'curve', id: 'edge', points: ['t0', 't1', 't2'], closed: true, tone: 'brand', weight: 4 }],
    },
    {
      points: { s1: [5, 5], s2: [1, 5] },
      items: [{ kind: 'curve', id: 'square', points: ['t1', 's1', 's2'], tone: 'theta', weight: 3, dashed: true }],
    },
    counts({ id: 'nw', list: whole }),
    counts({ id: 'nh', list: halves, half: true, tone: 'opp' }),
  ]);

// A door: about 1 m wide and 2 m tall, so about two square metres.
const door = () =>
  figure('door', [
    tiles({ cols: 1, rows: 2, labels: { width: '1\\text{ m}', height: '2\\text{ m}' } }),
    note('a', [0.5, 0.5], '1\\text{ m}^2', 'center', 'ink', 'areas'),
    note('b', [0.5, 1.5], '1\\text{ m}^2', 'center', 'ink', 'areas'),
  ], 420);

const video: Explainer = {
  id: 'm5-10-1-d',
  lessonId: 'm5-10-1',
  title: 'Units of Area, Part 4: Estimating Area',
  thumbnailTitle: 'Estimating Area',
  thumbnail: 'tri',
  summary: 'Estimating area with a benchmark (a door is about 1 m wide and 2 m tall, so about 2 m²), and finding the area of a triangle on centimetre grid paper by counting 6 whole squares and 4 half squares: 6 + 2 = 8 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 4', title: 'Estimating Area', subtitle: 'Benchmarks, and whole and half squares' }],
      lines: [
        { say: 'Sometimes you do not need an exact area. You just need a good idea of how big something is. A careful guess like this is called an estimate.', show: 'title' },
        { say: 'In this video, you will estimate an area with a benchmark, and count whole and half squares on grid paper.' },
      ],
    },
    {
      chapter: 'Benchmarks',
      layout: 'split',
      leftWidth: 440,
      left: [door()],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Benchmark', md: 'A **benchmark** is something whose size you know well, so you can compare other things with it.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{door} \\approx 1\\text{ m} \\times 2\\text{ m}', '\\text{door} \\approx 2\\text{ m}^2'] },
      ],
      lines: [
        { say: 'A benchmark is something whose size you know well, so you can compare other things with it. A metre stick is a good benchmark for a length.', show: 'def' },
        { say: 'Think about a door. A door is about as tall as two metre sticks, and about one metre wide.', show: ['door.outline', 'door.width', 'door.height', 'm.0'], focus: 'm.0' },
        { say: 'So a door is about two squares, each one metre by one metre. Its area is about two square metres.', show: ['door.grid', 'door.areas', 'm.1'], focus: ['door.areas', 'm.1'] },
        { say: 'Now you can use the door as a benchmark. If about six doors would cover a wall, the wall is about six times two, which is twelve square metres.' },
      ],
    },
    {
      chapter: 'Whole and half squares',
      layout: 'split',
      leftWidth: 520,
      left: [triangle()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{whole squares: } \\good{6}', '\\text{half squares: } \\opp{4}', '4 \\text{ halves} = 4 \\div 2 = 2', '6 + 2 = 8\\text{ cm}^2'] }],
      lines: [
        { say: 'On grid paper, a shape with a slanted side cuts some squares into pieces. Each small square here is one square centimetre. What is the area of this triangle?', show: ['tri.paper', 'tri.edge'] },
        { say: 'First, count the whole squares inside the triangle. Three in the bottom row, then two, then one. That makes six whole squares.', show: ['tri.w', 'tri.nw', 'm.0'], focus: ['tri.w', 'm.0'] },
        { say: 'The slanted side cuts four more squares exactly in half. Count the half squares: one, two, three, four.', show: ['tri.h', 'tri.nh', 'm.1'], focus: ['tri.h', 'm.1'] },
        { say: 'Two halves make one whole. So four halves make four divided by two, which is two whole squares.', show: 'm.2', focus: 'm.2' },
        { say: 'Add them: six plus two is eight. The area of the triangle is eight square centimetres.', show: 'm.3', focus: ['m.3', 'tri.edge'] },
      ],
    },
    {
      chapter: 'A quick check',
      layout: 'split',
      leftWidth: 520,
      left: [triangle()],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\times 4 = 16', '16 \\div 2 = 8\\text{ cm}^2 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two halves make a whole', md: 'Count the whole squares, then count the half squares and divide by $2$. Add the two numbers.' },
      ],
      lines: [
        { say: 'Here is a way to check. The triangle is exactly half of a square that is four squares across and four squares up.', show: ['tri.paper', 'tri.edge', 'tri.w', 'tri.h', 'tri.square'], focus: 'tri.square' },
        { say: 'That square holds four times four, which is sixteen small squares. Half of sixteen is eight. It matches!', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So remember: count the whole squares, then count the half squares and divide by two. Then add the two numbers.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On centimetre grid paper, a shape covers $9$ whole squares and $6$ half squares. What is its area?',
          choices: ['$12\\text{ cm}^2$', '$15\\text{ cm}^2$', '$18\\text{ cm}^2$', '$21\\text{ cm}^2$'],
          answer: 0,
          working: '$6$ halves make $6 \\div 2 = 3$ whole squares, so the area is $9 + 3 = 12\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. On centimetre grid paper, a shape covers nine whole squares and six half squares. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, twelve square centimetres. Six halves make six divided by two, which is three whole squares, and nine plus three is twelve. Choice B counts each half square as a whole square.', show: 'q.answer' },
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
          items: ['Estimate an area by comparing it with a benchmark: a door is about $2\\text{ m}^2$.', 'On grid paper, count the whole squares, then the half squares.', 'Two half squares make one whole square.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. You can estimate an area by comparing it with a benchmark. A door is about two square metres.', show: 'sum.0' },
        { say: 'On grid paper, count the whole squares first, then count the half squares.', show: 'sum.1' },
        { say: 'And two half squares make one whole square. Great work! Next, you will find the area and perimeter of rectangles.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
