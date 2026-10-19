import type { Explainer } from '@/video/script.ts';
import { dots } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { riseRun } from '@/content/math30-3/videos/lib/m303-5-graphs.ts';
import { guide, seqPlane } from './lib/m5-11-figures.ts';

const g = seqPlane({ x: 6, y: 10, height: 6 });

// 2, 4, 6, 8: from each point to the next, 1 right and 2 up, so the points line up.
const steps = () =>
  figure('st', [
    g,
    guide(g, 'line', [0, 0], [5, 10], 'muted', { weight: 2.5 }),
    riseRun(g, { id: 's1', from: [1, 2], to: [2, 4], run: '1', rise: '2' }),
    riseRun(g, { id: 's2', from: [2, 4], to: [3, 6], run: '', rise: '' }),
    riseRun(g, { id: 's3', from: [3, 6], to: [4, 8], run: '', rise: '' }),
    dots(g, [
      { id: 'p1', x: 1, y: 2 },
      { id: 'p2', x: 2, y: 4 },
      { id: 'p3', x: 3, y: 6 },
      { id: 'p4', x: 4, y: 8 },
    ]),
  ]);

// The same points with the third term written as 7 by mistake: (3, 7) is off the line.
const check = () =>
  figure('ck', [
    g,
    guide(g, 'line', [0, 0], [5, 10], 'muted', { weight: 2.5 }),
    dots(g, [
      { id: 'p1', x: 1, y: 2 },
      { id: 'p2', x: 2, y: 4 },
      { id: 'bad', x: 3, y: 7, tex: '(3,\\ 7)', place: 'left', tone: 'bad' },
      { id: 'p4', x: 4, y: 8 },
    ]),
  ]);

// (1, 5), (2, 8), (3, 11), (4, 14), and past the graph: (5, 17) and (6, 20).
const h = seqPlane({ name: 'h', x: 7, y: 22, yStep: 2, height: 8 });
const past = () =>
  figure('pa', [
    h,
    guide(h, 'line', [0, 2], [6.6, 21.8], 'muted', { weight: 2.5 }),
    dots(h, [
      { id: 'p1', x: 1, y: 5, tex: '(1,\\ 5)', place: 'below right' },
      { id: 'p2', x: 2, y: 8, tex: '(2,\\ 8)', place: 'below right' },
      { id: 'p3', x: 3, y: 11, tex: '(3,\\ 11)', place: 'below right' },
      { id: 'p4', x: 4, y: 14, tex: '(4,\\ 14)', place: 'below right' },
      { id: 'p5', x: 5, y: 17, tex: '(5,\\ 17)', place: 'below right', tone: 'good' },
      { id: 'p6', x: 6, y: 20, tex: '(6,\\ 20)', place: 'below right', tone: 'good' },
    ]),
  ]);

const video: Explainer = {
  id: 'm5-11-1-d',
  lessonId: 'm5-11-1',
  title: 'Arithmetic Sequences in Tables and Graphs, Part 4: A Straight Line',
  thumbnailTitle: 'The Graph Is a Straight Line',
  thumbnail: 'st',
  summary: 'The points of an arithmetic sequence lie on a straight line, because each point is the same step right and up from the one before (1 right and 2 up for 2, 4, 6, 8). A point off the line shows a wrong term, and the points (1, 5), (2, 8), (3, 11), (4, 14) continue to (5, 17) and (6, 20).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 4', title: 'A Straight Line', subtitle: 'The points of an arithmetic sequence line up' }],
      lines: [
        { say: 'When you plot the points of an arithmettic sequence, something special happens. The points line up!', caption: 'When you plot the points of an arithmetic sequence, something special happens. The points line up!', show: 'title' },
        { say: 'In this video, you will see why the points make a straight line. Then you will use the line to check your work, and to find terms past the end of the graph.' },
      ],
    },
    {
      chapter: 'Steps on the graph',
      layout: 'split',
      leftWidth: 560,
      left: [steps()],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'A straight line', md: 'Each point is the **same step** right and up from the one before, so the points of an arithmetic sequence lie on a **straight line**.' }],
      lines: [
        { say: 'Here are the points for the sequence two, four, six, eight.', show: ['st.grid', 'st.axes', 'st.p1', 'st.p2', 'st.p3', 'st.p4'] },
        { say: 'From the first point to the next, go one step right, to the next position. Then go two steps up, because each term is two more than the one before.', show: 'st.s1', focus: 'st.s1' },
        { say: 'From the second point to the third, it is the same: one right and two up. And again from the third to the fourth.', show: ['st.s2', 'st.s3'], focus: ['st.s2', 'st.s3'] },
        { say: 'The steps are always the same, so the points lie on a straight line, like stairs with equal steps.', show: 'st.line', focus: 'st.line' },
        { say: 'This is true for every arithmettic sequence. You add the same number each time, so every point goes up by the same amount.', caption: 'This is true for every arithmetic sequence. You add the same number each time, so every point goes up by the same amount.', show: 'key' },
      ],
    },
    {
      chapter: 'Checking your work',
      layout: 'split',
      leftWidth: 560,
      left: [check()],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Use the line to check your work', md: 'If one point is not on the same straight line as the others, a term is wrong.' }],
      lines: [
        { say: 'The straight line is a great way to check your work. Suppose someone wrote the sequence as two, four, seven, eight, by mistake.', show: ['ck.grid', 'ck.axes', 'ck.p1', 'ck.p2', 'ck.p4'] },
        { say: 'Plot the points. The point for the third term, three, seven, sits above the line through the others.', show: ['ck.bad', 'ck.line'], focus: 'ck.bad' },
        { say: 'If one point is not on the same straight line as the others, a term is wrong. Here the third term should be six, not seven.', show: 'tip' },
      ],
    },
    {
      chapter: 'Going past the graph',
      layout: 'split',
      leftWidth: 560,
      left: [past()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 - 5 = 3', '\\text{position 5: } 14 + 3 = 17', '\\text{position 6: } 17 + 3 = 20', '(6,\\ 20)'] }],
      lines: [
        { say: 'A graph shows the points one, five, then two, eight, then three, eleven, and four, fourteen. If the pattern continues, what is the term at position six?', show: ['pa.h-grid', 'pa.h-axes', 'pa.h-p1', 'pa.h-p2', 'pa.h-p3', 'pa.h-p4'] },
        { say: 'First, find the change. The terms go from five to eight, so they go up by three each time.', show: 'm.0', focus: 'm.0' },
        { say: 'Position five is fourteen plus three, which is seventeen.', show: ['m.1', 'pa.h-p5'], focus: ['m.1', 'pa.h-p5'] },
        { say: 'Position six is seventeen plus three, which is twenty. Its point is six, twenty.', show: ['m.2', 'm.3', 'pa.h-p6'], focus: ['m.3', 'pa.h-p6'] },
        { say: 'And look: the new points sit on the same straight line as the others. That tells us the pattern really does continue.', show: 'pa.h-line', focus: 'pa.h-line' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A graph shows the points $(1,\\ 4)$, $(2,\\ 6)$, $(3,\\ 8)$ and $(4,\\ 10)$. If the pattern continues, what is the term at position $6$?',
          choices: ['$14$', '$12$', '$16$', '$6$'],
          answer: 0,
          working: 'The terms go up by $2$: position $5$ is $10 + 2 = 12$, and position $6$ is $12 + 2 = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph shows the points one, four, then two, six, then three, eight, and four, ten. If the pattern continues, what is the term at position six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, fourteen. The terms go up by two each time. Position five is ten plus two, which is twelve, and position six is twelve plus two, which is fourteen. Choice B is the term at position five, so it stops one step early.', show: 'q.answer' },
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
          items: ['The points of an arithmetic sequence lie on a straight line.', 'A point off the line means a term is wrong.', 'Keep adding the change to find terms past the graph.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The points of an arithmettic sequence lie on a straight line, because each step is the same.', caption: 'Let’s sum up. The points of an arithmetic sequence lie on a straight line, because each step is the same.', show: 'sum.0' },
        { say: 'If a point is off the line, a term is wrong.', show: 'sum.1' },
        { say: 'And to find terms past the graph, keep adding the change. Next, you will find rules for sequences. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
