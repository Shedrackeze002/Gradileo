import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide } from '@/content/math5/videos/lib/m5-11-figures.ts';

// Taxi fares, F = 2d + 4: data for 0, 2 and 4 km, the line through them and its dashed extension,
// with guides for reading the fare for 3 km (interpolating) and 7 km (extrapolating).
const fares = (id: string) => {
  const g = plane({ x: [0, 8], y: [0, 22], yStep: 2, width: 7, height: 7, titles: { x: '\\text{Distance (km)}', y: '\\text{Fare (\\$)}' } });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'ln', points: [[0, 4], [4, 12]], tone: 'brand' }),
      polyline(g, { id: 'ext', points: [[4, 12], [8, 20]], tone: 'brand', dashed: true }),
      guide(g, 'i1', [3, 0], [3, 10], 'adj', { arrow: true }),
      guide(g, 'i2', [3, 10], [0, 10], 'adj', { arrow: true }),
      guide(g, 'e1', [7, 0], [7, 18], 'hyp', { arrow: true }),
      guide(g, 'e2', [7, 18], [0, 18], 'hyp', { arrow: true }),
      dots(g, [
        { id: 'd0', x: 0, y: 4 },
        { id: 'd1', x: 2, y: 8 },
        { id: 'd2', x: 4, y: 12 },
        { id: 'i', x: 3, y: 10, tex: '\\$10', tone: 'adj', place: 'below right' },
        { id: 'e', x: 7, y: 18, tex: '\\$18', tone: 'hyp', place: 'below right' },
      ]),
    ],
    540,
  );
};
const base = (fig: string) => [`${fig}.grid`, `${fig}.axes`, `${fig}.d0`, `${fig}.d1`, `${fig}.d2`, `${fig}.ln`];

const video: Explainer = {
  id: 'm8-6-2-b',
  lessonId: 'm8-6-2',
  title: 'Graphing and Analyzing Linear Relations, Part 2: Interpolating and Extrapolating',
  thumbnailTitle: 'Interpolating and Extrapolating',
  thumbnail: 'tx',
  summary:
    'Every point on the line of a linear relation belongs to it, so you can read new values from the graph. To interpolate is to find a value between the data points: on the taxi graph for F = 2d + 4, a 3 km ride costs $10. To extrapolate is to find a value beyond the data by extending the line, assuming the pattern keeps going: a 7 km ride costs $18, and 2(7) + 4 = 18 checks it. Read the scale first: each grid line up is $2, not $1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 2', title: 'Interpolating and Extrapolating', subtitle: 'Reading new values from a graph' }],
      lines: [
        { say: 'A graph can answer questions that the table of values does not, like the fare for a ride that is not in the table.', show: 'title' },
        { say: 'In this part, you will read values between the points of a graph, and beyond them.' },
      ],
    },
    {
      chapter: 'Every point counts',
      layout: 'split',
      leftWidth: 600,
      left: [fares('tx')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Taxi fares: $F = 2d + 4$, for a ride of $d$ km. The data are for $0$, $2$ and $4$ km.' }],
      lines: [
        { say: 'This graph shows taxi fares from a table, for rides of zero, two and four kilometres. The fare rule is F equals two d plus four.', show: ['q', 'tx.grid', 'tx.axes', 'tx.d0', 'tx.d1', 'tx.d2'] },
        { say: 'The three points line up, so we can join them with a straight line.', show: 'tx.ln', focus: 'tx.ln' },
        { say: 'Every point on the line belongs to the relation, not just the points from the table. That means you can read new values from the graph.' },
      ],
    },
    {
      chapter: 'Interpolating',
      layout: 'split',
      leftWidth: 600,
      left: [fares('tx')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Interpolate', md: 'To **interpolate** is to find a value **between** the known data points.' }],
      lines: [
        { say: 'To interpolate is to find a value between the known data points.', show: ['def', ...base('tx')] },
        { say: 'What is the fare for a three kilometre ride? Three is between two and four, so this is interpolating.' },
        { say: 'Go up from three on the distance axis until you meet the line.', show: 'tx.i1', focus: 'tx.i1' },
        { say: 'Then go across to the fare axis. The fare is ten dollars.', show: ['tx.i2', 'tx.i'], focus: ['tx.i2', 'tx.i'] },
      ],
    },
    {
      chapter: 'Extrapolating',
      layout: 'split',
      leftWidth: 600,
      left: [fares('tx')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extrapolate', md: 'To **extrapolate** is to find a value **beyond** the known data points, by extending the line. It assumes the pattern keeps going.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['F = 2(7) + 4 = 18 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'To extrapolate is to find a value beyond the known data points, by extending the line. It assumes that the pattern keeps going.', show: ['def', ...base('tx')] },
        { say: 'What is the fare for a seven kilometre ride? Seven is beyond the data, so extend the line. Here it is, dashed.', show: 'tx.ext', focus: 'tx.ext' },
        { say: 'Go up from seven to the dashed line, then across to the fare axis: eighteen dollars.', show: ['tx.e1', 'tx.e2', 'tx.e'], focus: ['tx.e1', 'tx.e2', 'tx.e'] },
        { say: 'Check with the equation. F equals two times seven, plus four, which is fourteen plus four, or eighteen. It matches.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Read the scale',
      layout: 'split',
      leftWidth: 600,
      left: [fares('tx')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not reading the scale', md: 'On this graph, each grid line up is **\\$2**, not \\$1. Always read the numbers on the axes before you count grid lines.' }],
      lines: [
        { say: 'Watch out! On this graph, each grid line up is worth two dollars, not one. Look at the numbers on the fare axis: zero, two, four, six, and so on.', show: ['oops', ...base('tx')], focus: 'tx.axes' },
        { say: 'The point for three kilometres is five grid lines up. If you counted one dollar for each line, you would say five dollars. But five lines of two dollars each make ten dollars.', show: ['tx.i1', 'tx.i2', 'tx.i'], focus: 'tx.i' },
        { say: 'So always read the numbers on the axes before you count grid lines.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On the taxi graph, each grid line up is \\$2. At $5$ km, the line is $7$ grid lines up. What is the fare for a $5$ km ride?',
          choices: ['\\$14', '\\$10', '\\$9', '\\$7'],
          answer: 0,
          working: '$7$ grid lines of \\$2 each make \\$14. Check: $F = 2(5) + 4 = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. On the taxi graph, each grid line up is two dollars. At five kilometres, the line is seven grid lines up. What is the fare for a five kilometre ride? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, fourteen dollars. Seven grid lines of two dollars each make fourteen dollars, and two times five plus four is fourteen as well. Choice D counts the grid lines as one dollar each.', show: 'q.answer' },
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
            'Every point on the line belongs to the relation.',
            'Interpolate: read a value between the data points.',
            'Extrapolate: extend the line to read a value beyond the data.',
            'Read the scale on each axis before you count grid lines.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every point on the line belongs to the relation, so you can read new values from it.', show: 'sum.0' },
        { say: 'To interpolate is to read a value between the data points.', show: 'sum.1' },
        { say: 'To extrapolate is to extend the line and read a value beyond the data.', show: 'sum.2' },
        { say: 'And always read the scale on each axis first. In the next part, you will match an equation to a table of values. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
