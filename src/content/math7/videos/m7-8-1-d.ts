import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, mark, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { arc, compass, pt } from './lib/m7-8-figures.ts';

type P = [number, number];
const toward = (c: P, deg: number, len: number): P => [c[0] + len * Math.cos((deg * Math.PI) / 180), c[1] + len * Math.sin((deg * Math.PI) / 180)];

// A compass drawing an arc of radius 2.5 about O.
const tool = (id: string) =>
  figure(id, [join(arc('arc', [0, 0], 2.5, -40, 70), compass('cmp', [0, 0], toward([0, 0], 70, 2.5)), pt('O', [0, 0], '', 'below'), seg('r', [0, 0], toward([0, 0], -40, 2.5), { tone: 'muted', dashed: true, weight: 2 }))], 380);

// The perpendicular through P on AB: A (0, 0), B (7.6, 0), P (3.8, 0). Arcs of radius 1.6 about P
// cross AB at C (2.2, 0) and D (5.4, 0); arcs of radius 3.1 about C and D cross at E (3.8, 2.655),
// straight above P; PE is perpendicular to AB.
const Pp: P = [3.8, 0];
const C: P = [2.2, 0];
const D: P = [5.4, 0];
const E: P = [3.8, Math.sqrt(3.1 ** 2 - 1.6 ** 2)];
const onSeg = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [0, 0], [7.6, 0], { tone: 'adj', weight: 4 }),
        pt('A', [0, 0], 'A', 'left'),
        pt('B', [7.6, 0], 'B', 'right'),
        arc('arcC', Pp, 1.6, 155, 205, { group: 'step1' }),
        arc('arcD', Pp, 1.6, -25, 25, { group: 'step1' }),
        compass('cmp1', Pp, toward(Pp, 205, 1.6), { side: 'right' }),
        compass('cmp1b', Pp, toward(Pp, 25, 1.6)),
        pt('C', C, 'C', 'below left', 'ink', 'cd'),
        pt('D', D, 'D', 'below right', 'ink', 'cd'),
        arc('arcE1', C, 3.1, 42, 76, { group: 'step2' }),
        compass('cmp2', C, toward(C, 76, 3.1), { side: 'right' }),
        arc('arcE2', D, 3.1, 104, 138, { group: 'step3' }),
        compass('cmp3', D, toward(D, 104, 3.1)),
        pt('E', E, 'E', 'above right'),
        seg('pe', Pp, [E[0], E[1] + 0.6], { tone: 'opp', weight: 5 }),
        mark('sq', Pp, [4.8, 0], [3.8, 1]),
        pt('P', Pp, 'P', 'below'),
      ),
    ],
    420,
  );

// When P is above AB: P (3.5, 2.4). One arc of radius 3 about P crosses AB at C (1.7, 0) and
// D (5.3, 0); arcs of radius 3 about C and D cross below AB at E (3.5, −2.4); PE ⊥ AB.
const P2: P = [3.5, 2.4];
const C2: P = [1.7, 0];
const D2: P = [5.3, 0];
const offSeg = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [0, 0], [7, 0], { tone: 'adj', weight: 4 }),
        pt('A', [0, 0], 'A', 'left'),
        pt('B', [7, 0], 'B', 'right'),
        arc('arc1', P2, 3, 215, 325, { group: 'step1' }),
        pt('C', C2, 'C', 'below left', 'ink', 'cd'),
        pt('D', D2, 'D', 'below right', 'ink', 'cd'),
        arc('arc2', C2, 3, -70, -36, { group: 'step2' }),
        arc('arc3', D2, 3, -144, -110, { group: 'step2' }),
        pt('E', [3.5, -2.4], 'E', 'below right'),
        seg('pe', P2, [3.5, -2.4], { tone: 'opp', weight: 5 }),
        mark('sq', [3.5, 0], [4.5, 0], [3.5, 1]),
        pt('P', P2, 'P', 'above'),
      ),
    ],
    440,
  );

const video: Explainer = {
  id: 'm7-8-1-d',
  lessonId: 'm7-8-1',
  title: 'Parallel and Perpendicular Line Segments, Part 4: Constructing a Perpendicular Segment',
  thumbnailTitle: 'Constructing a Perpendicular',
  thumbnail: 'on',
  summary:
    'Constructing a perpendicular through point P on segment AB with a compass and a ruler: arcs centred at P cross AB at C and D; with the compass opened wider, arcs from C and D cross at E; segment PE is perpendicular to AB. When P is not on AB, one arc centred at P crosses AB at C and D, arcs from C and D cross on the other side at E, and PE is perpendicular to AB. Check with a protractor (90°) or the square corner of a sheet of paper.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 4', title: 'Constructing a Perpendicular Segment', subtitle: 'With a compass and a ruler' }],
      lines: [
        { say: 'How can you draw a perfect right angle, without a protractor? You can construct one, with just a compass and a ruler.', show: 'title' },
        { say: 'To construct means to draw exactly, with tools, step by step. In this video, you will construct a segment perpendicular to another one.' },
      ],
    },
    {
      chapter: 'A compass',
      layout: 'split',
      leftWidth: 480,
      left: [tool('tl')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Compass', md: 'A **compass** has a sharp point and a pencil. Keep the point still and swing the pencil: it draws an **arc**, a part of a circle. Every point on the arc is the **same distance** from the compass point.' }],
      lines: [
        { say: 'A compass is a drawing tool with two legs. One leg has a sharp point, and the other holds a pencil.', show: ['tl.cmp', 'tl.O'] },
        { say: 'Keep the sharp point still, and swing the pencil around. It draws a curve called an arc: a part of a circle.', show: ['tl.arc', 'def'], focus: 'tl.arc' },
        { say: 'Every point on the arc is the same distance from the compass point. That distance is how wide the compass is open. This is what makes constructions exact.', show: 'tl.r', focus: 'tl.r' },
      ],
    },
    {
      chapter: 'Step 1: two arcs from P',
      layout: 'split',
      leftWidth: 620,
      left: [onSeg('s1')],
      right: [{ kind: 'text', id: 't', size: 'md', md: '**Step 1.** Place the compass point on $P$. Draw an arc on each side of $P$ that crosses $AB$. Label the crossings $C$ and $D$.' }],
      lines: [
        { say: 'Here is segment A B, with a point P on it. We want a segment through P that is perpendicular to A B.', show: ['s1.ab', 's1.A', 's1.B', 's1.P'] },
        { say: 'Step one. Place the compass point on P. Draw a small arc that crosses A B on the left of P.', show: ['t', 's1.cmp1', 's1.arcC'], focus: 's1.arcC' },
        { say: 'Without changing the compass, draw another arc that crosses A B on the right of P.', show: ['s1.cmp1b', 's1.arcD'], hide: 's1.cmp1', focus: 's1.arcD' },
        { say: 'Label the crossings C and D. The compass did not change, so C and D are the same distance from P.', show: 's1.cd', hide: 's1.cmp1b', focus: 's1.cd' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: two crossing arcs',
      layout: 'split',
      leftWidth: 620,
      left: [onSeg('s2')],
      right: [
        { kind: 'text', id: 't2', size: 'md', md: '**Step 2.** Open the compass wider. Place the point on $C$ and draw an arc above $AB$.' },
        { kind: 'text', id: 't3', size: 'md', md: '**Step 3.** Keep the same opening. Place the point on $D$ and draw an arc that crosses the last arc. Label the crossing $E$.' },
      ],
      lines: [
        { say: 'Step two. Open the compass wider than before. Place the compass point on C, and draw an arc above A B.', show: ['s2.ab', 's2.A', 's2.B', 's2.P', 's2.step1', 's2.cd', 't2', 's2.cmp2', 's2.arcE1'], focus: 's2.arcE1' },
        { say: 'Step three. Keep the same opening. Place the compass point on D, and draw an arc that crosses the last arc.', show: ['t3', 's2.cmp3', 's2.arcE2'], hide: 's2.cmp2', focus: 's2.arcE2' },
        { say: 'Label the point where the two arcs cross E. Point E is the same distance from C as it is from D.', show: 's2.E', hide: 's2.cmp3', focus: 's2.E' },
      ],
    },
    {
      chapter: 'Step 4: join P and E',
      layout: 'split',
      leftWidth: 620,
      left: [onSeg('s4')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '**Step 4.** Use the ruler to join $P$ and $E$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['PE \\perp AB'] },
      ],
      lines: [
        { say: 'Step four. Use the ruler to join P and E.', show: ['s4.ab', 's4.A', 's4.B', 's4.P', 's4.step1', 's4.cd', 's4.step2', 's4.step3', 's4.E', 't', 's4.pe'], focus: 's4.pe' },
        { say: 'Segment P E is perpendicular to A B. It meets A B at a right angle, exactly at P.', show: ['s4.sq', 'm.0'], focus: ['s4.sq', 'm.0'] },
        { say: 'Why does it work? E is the same distance from C and from D, and so is P. A line through two points like that always crosses C D at a right angle.' },
      ],
    },
    {
      chapter: 'When P is not on the segment',
      layout: 'split',
      leftWidth: 560,
      left: [offSeg('of')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['One arc centred at $P$ crosses $AB$ twice, at $C$ and $D$.', 'Arcs from $C$ and $D$ cross on the other side of $AB$, at $E$.', 'Join $P$ to $E$: $PE \\perp AB$.'],
        },
      ],
      lines: [
        { say: 'What if point P is not on the segment, but above it? The steps are almost the same.', show: ['of.ab', 'of.A', 'of.B', 'of.P'] },
        { say: 'Place the compass point on P, open it wide enough, and draw one arc that crosses A B twice. Label the crossings C and D.', show: ['b.0', 'of.step1', 'of.cd'], focus: 'of.step1' },
        { say: 'Then, keeping the same opening, draw arcs from C and from D on the other side of A B, below it. Label the point where they cross E.', show: ['b.1', 'of.step2', 'of.E'], focus: 'of.step2' },
        { say: 'Join P to E with the ruler. Segment P E is perpendicular to A B.', show: ['b.2', 'of.pe', 'of.sq'], focus: ['of.pe', 'of.sq'] },
      ],
    },
    {
      chapter: 'Check your work',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your work', md: 'Check a perpendicular construction with a **protractor**: the angle should be $90^\\circ$. Or fit the **square corner of a sheet of paper** into the angle.' }],
      lines: [
        { say: 'When you finish a construction, check it. Measure the angle where the segments meet with a protractor. It should be ninety degrees.', show: 'tip' },
        { say: 'No protractor? Use the square corner of a sheet of paper. If the corner fits exactly into the angle, it is a right angle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In step 1, the compass point is on $P$, and two arcs cross $AB$ at $C$ and $D$ without changing the compass. What is true about $C$ and $D$?',
          choices: ['$PC = PD$', '$CD$ is perpendicular to $AB$', '$C$ and $D$ are on segment $PE$', '$PC$ is twice as long as $PD$'],
          answer: 0,
          working: 'The compass opening did not change, so $C$ and $D$ are the same distance from $P$: $PC = PD$.',
        },
      ],
      lines: [
        { say: 'Your turn. In step one, the compass point is on P, and two arcs cross A B at C and D, without changing the compass. What is true about C and D? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: P C equals P D. The compass opening did not change, so C and D are the same distance from P. Choice B is wrong: C and D are both on A B, so C D is part of A B, not perpendicular to it.', show: 'q.answer' },
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
          items: ['A compass draws arcs: every point on an arc is the same distance from the compass point.', 'Arcs from $P$ give $C$ and $D$. Wider arcs from $C$ and $D$ cross at $E$.', 'Join $P$ and $E$: $PE \\perp AB$. Check with a protractor.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A compass draws arcs, and every point on an arc is the same distance from the compass point.', show: 'sum.0' },
        { say: 'To construct a perpendicular, draw arcs from P to find C and D. Then draw wider arcs from C and D that cross at E.', show: 'sum.1' },
        { say: 'Join P and E, and check the right angle with a protractor. In the next part, you will construct parallel segments. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
