import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { hops } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { note, vertical, xAt } from './lib/m6-1-figures.ts';

// −7 and 7 are each 7 steps from zero.
const seven = (id: string) =>
  figure(
    id,
    [
      numberLine({
        min: -8,
        max: 8,
        step: 1,
        points: [
          { id: 'm7', value: -7, tex: '', tone: 'adj' },
          { id: 'zero', value: 0, tex: '', tone: 'ink' },
          { id: 'p7', value: 7, tex: '', tone: 'opp' },
        ],
      }),
      hops({ name: 'left', min: -8, max: 8, from: -7, step: 1, count: 7, tone: 'adj' }),
      hops({ name: 'right', min: -8, max: 8, from: 0, step: 1, count: 7, tone: 'opp' }),
      note({ id: 'lnote', at: [xAt(-3.5, -8, 8), 1.45], tex: '7\\text{ units}', tone: 'adj' }),
      note({ id: 'rnote', at: [xAt(3.5, -8, 8), 1.45], tex: '7\\text{ units}', tone: 'opp' }),
    ],
    300,
  );

// A diver at −9 m in a lake whose surface is 0 m.
const lake = figure(
  'lk',
  [
    vertical({
      min: -10,
      max: 3,
      unit: 0.42,
      every: 2,
      water: { label: '\\text{water}', width: 5 },
      points: [
        { id: 'surf', value: 0, tex: '\\text{surface: } 0\\text{ m}', tone: 'ink', place: 'above right' },
        { id: 'diver', value: -9, tex: '\\text{diver: } {-9}\\text{ m}', tone: 'theta' },
      ],
      moves: [{ id: 'dist', from: 0, to: -9, label: '9\\text{ m}', tone: 'opp', x: 3.6 }],
      room: 5,
    }),
  ],
  560,
);

// −12 is 12 units from zero; 5 is only 5 units from zero.
const compare = figure(
  'cp',
  [
    numberLine({
      min: -14,
      max: 6,
      step: 1,
      every: 2,
      spans: [
        { id: 'far', from: -12, to: 0, tone: 'adj', label: '12\\text{ units}' },
        { id: 'near', from: 0, to: 5, tone: 'opp', label: '5\\text{ units}' },
      ],
      points: [
        { id: 'm12', value: -12, tex: '-12', tone: 'adj' },
        { id: 'p5', value: 5, tex: '5', tone: 'opp' },
      ],
    }),
  ],
  300,
);

const video: Explainer = {
  id: 'm6-1-1-c',
  lessonId: 'm6-1-1',
  title: 'Negative Numbers and Magnitude, Part 3: Magnitude',
  thumbnailTitle: 'Magnitude',
  thumbnail: 'mg',
  summary: 'The magnitude of a number is its distance from zero, so it is never negative: −7 and 7 both have magnitude 7. The sign tells the direction and the magnitude tells how far. A diver at −9 m is 9 m below the surface, and −12 has a greater magnitude than 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 3', title: 'Magnitude', subtitle: 'How far is a number from zero?' }],
      lines: [
        { say: 'Negative seven and seven are on different sides of zero. But they have something in common. Each of them is seven steps away from zero.', show: 'title' },
        { say: 'In this video, you will learn a new word for how far a number is from zero. The word is magnitude.' },
      ],
    },
    {
      chapter: 'Distance from zero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Magnitude', md: 'The **magnitude** of a number is its distance from $0$ on the number line. It counts the units from $0$, so it is never negative.' },
        seven('mg'),
      ],
      lines: [
        { say: 'The magnitude of a number is its distance from zero on the number line. It counts the units from zero, so a magnitude is never negative.', show: 'def' },
        { say: 'Let’s find the magnitude of negative seven. Find negative seven on the number line.', show: ['mg.axis', 'mg.zero', 'mg.m7'], focus: 'mg.m7' },
        { say: 'Now count the steps from negative seven to zero. One, two, three, four, five, six, seven. Negative seven is seven units from zero, so its magnitude is seven.', show: ['mg.left-hops', 'mg.lnote'], focus: ['mg.left-hops', 'mg.lnote'] },
        { say: 'Now try seven. Count from zero to seven: that is seven units as well, on the other side of zero.', show: ['mg.p7', 'mg.right-hops', 'mg.rnote'], focus: ['mg.right-hops', 'mg.rnote'] },
        { say: 'So negative seven and seven have the same magnitude. The magnitude of each one is seven.', focus: ['mg.m7', 'mg.p7'] },
      ],
    },
    {
      chapter: 'Sign and size',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two parts of a number', md: 'The **sign** tells the **direction** from $0$. The **magnitude** tells **how far** from $0$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'Direction from 0', 'Magnitude'],
          rows: [
            ['$-7$', 'left (or down)', '$7$'],
            ['$7$', 'right (or up)', '$7$'],
            ['$-2$', 'left (or down)', '$2$'],
          ],
        },
      ],
      lines: [
        { say: 'So a positive or negative number tells us two things. The sign tells the direction from zero. The magnitude tells how far from zero.', show: 'key' },
        { say: 'Negative seven is to the left of zero, or below it on a vertical number line. Its magnitude is seven.', show: 't.0', focus: 't.0' },
        { say: 'Seven is to the right of zero, or above it. Its magnitude is seven as well.', show: 't.1', focus: 't.1' },
        { say: 'And negative two is to the left of zero, just two units away. Its magnitude is two.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A diver in a lake',
      layout: 'split',
      leftWidth: 560,
      left: [lake],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A diver is at $-9$ m. Heights are measured from the surface of the water, $0$ m. How far below the surface is the diver?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{sign: below the surface}', '\\text{magnitude of } {-9} \\text{ is } 9', '9\\text{ m below the surface}'] },
      ],
      lines: [
        { say: 'Here is a diver in a lake. Heights are measured from the surface of the water, which is zero metres. The diver is at negative nine metres. How far below the surface is the diver?', show: ['q', 'lk.axis', 'lk.water', 'lk.surf', 'lk.diver'] },
        { say: 'The negative sign tells us the direction. The diver is below the surface.', show: 'm.0', focus: ['lk.diver', 'm.0'] },
        { say: 'The magnitude tells us how far. The magnitude of negative nine is nine.', show: ['m.1', 'lk.dist'], focus: ['lk.dist', 'm.1'] },
        { say: 'So the diver is nine metres below the surface.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A magnitude is not negative', md: 'The magnitude of $-9$ is $9$, not $-9$. A distance is never negative. You cannot walk $-9$ steps!' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{magnitude of } {-9} = \\bad{-9} \\quad \\bad{\\times}', '\\text{magnitude of } {-9} = \\good{9} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. The magnitude of negative nine is nine, not negative nine.', show: 'oops' },
        { say: 'A magnitude is a distance. If you walk from one place to another, you walk some number of steps. You cannot walk negative nine steps!', show: 'm.0', focus: 'm.0' },
        { say: 'So a magnitude is never negative. The magnitude of negative nine is just nine.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Which is farther from zero?',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'Which number has the greater magnitude: $-12$ or $5$?' }, compare, { kind: 'math', id: 'm', size: 'md', lines: ['12 > 5'] }],
      lines: [
        { say: 'Which number has the greater magnitude: negative twelve or five?', show: 'q' },
        { say: 'Put them on a number line. Negative twelve is twelve units from zero.', show: ['cp.axis', 'cp.m12', 'cp.far'], focus: 'cp.far' },
        { say: 'Five is only five units from zero.', show: ['cp.p5', 'cp.near'], focus: 'cp.near' },
        { say: 'Twelve is greater than five, so negative twelve has the greater magnitude. It is farther from zero, even though it is the smaller number.', show: 'm.0', focus: ['m.0', 'cp.far'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number has the **greatest magnitude**?',
          choices: ['$-15$', '$9$', '$-6$', '$12$'],
          answer: 0,
          working: 'The magnitudes are $15$, $9$, $6$ and $12$. The greatest is $15$, so $-15$ is farthest from $0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which number has the greatest magnitude: negative fifteen, nine, negative six or twelve? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, negative fifteen. Its magnitude is fifteen, so it is the farthest from zero. Choice D, twelve, is the greatest number, but it is only twelve units from zero.', show: 'q.answer' },
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
          items: ['**Magnitude** is the distance from $0$: the magnitude of $-9$ is $9$.', 'A magnitude is never negative.', 'The sign tells the direction from $0$. The magnitude tells how far.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The magnitude of a number is its distance from zero. The magnitude of negative nine is nine.', show: 'sum.0' },
        { say: 'A magnitude is a distance, so it is never negative.', show: 'sum.1' },
        { say: 'The sign tells the direction from zero, and the magnitude tells how far. In the next part, we meet numbers that have the same magnitude but different signs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
