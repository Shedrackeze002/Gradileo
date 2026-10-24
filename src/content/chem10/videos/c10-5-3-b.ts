import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { phStrip } from './lib/c10-5-figures.ts';

// The pH scale, acidic, neutral and basic, with some everyday solutions marked at typical values.
const scale = figure('s', [
  phStrip({
    colours: 'nature',
    names: true,
    marks: [
      { id: 'lemon', value: 2, tex: '\\text{lemon juice}' },
      { id: 'coffee', value: 5, tex: '\\text{black coffee}', level: 1 },
      { id: 'water', value: 7, tex: '\\text{pure water}' },
      { id: 'soap', value: 10, tex: '\\text{soapy water}', level: 1 },
      { id: 'oven', value: 13, tex: '\\text{oven cleaner}' },
    ],
  }),
]);

// Baking soda solution at pH 8.4.
const soda = figure('s', [phStrip({ colours: 'nature', names: true, marks: [{ id: 'soda', value: 8.4, tex: '\\text{pH } 8.4', arrow: true, tone: 'theta' }] })], 320);

// Each step down the scale is ten times more acidic.
const tenfold = figure(
  's',
  [
    phStrip({
      colours: 'nature',
      hops: [
        { id: 'hop1', from: 5, to: 4, tex: '\\times 10' },
        { id: 'hop2', from: 4, to: 3, tex: '\\times 10', high: true },
        { id: 'hop3', from: 3, to: 2, tex: '\\times 10' },
      ],
    }),
  ],
  330,
);

const video: Explainer = {
  id: 'c10-5-3-b',
  lessonId: 'c10-5-3',
  title: 'Acids, Bases and the pH Scale, Part 2: The pH Scale',
  thumbnailTitle: 'The pH Scale',
  thumbnail: 's',
  summary:
    'The pH scale runs from 0 to 14: below 7 is acidic, 7 is neutral and above 7 is basic, and the lower the pH, the more acidic the solution. Each step of 1 pH unit is a tenfold change, so a pH of 2 is 1000 times more acidic than a pH of 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 2', title: 'The pH Scale', subtitle: 'From 0 to 14, ten times per step' }],
      lines: [
        { say: 'Lemon juice and black coffee are both acidic, but lemon juice is far more acidic. How can we measure how acidic a solution is?', show: 'title' },
        { say: 'In this part, you will use the p H scale, and see why one step on it is a tenfold change.', caption: 'In this part, you will use the pH scale, and see why one step on it is a tenfold change.' },
      ],
    },
    {
      chapter: 'The pH scale',
      layout: 'center',
      main: [scale],
      lines: [
        { say: 'The p H scale shows how acidic or basic a solution is, usually from zero to fourteen.', caption: 'The pH scale shows how acidic or basic a solution is, usually from zero to fourteen.', show: 's.scale' },
        { say: 'A p H below seven is acidic. A p H of exactly seven is neutral, and a p H above seven is basic.', caption: 'A pH below 7 is acidic. A pH of exactly 7 is neutral, and a pH above 7 is basic.', show: ['s.acidic', 's.neutral', 's.basic'] },
        { say: 'Pure water at room temperature has a p H of seven. Lemon juice is about two, and black coffee about five.', caption: 'Pure water at room temperature has a pH of 7. Lemon juice is about 2, and black coffee about 5.', show: ['s.water', 's.lemon', 's.coffee'] },
        { say: 'Soapy water is about ten, and oven cleaner about thirteen. These are typical values: real samples vary.', show: ['s.soap', 's.oven'] },
        { say: 'The further the p H is from seven, the more acidic or basic the solution.', caption: 'The further the pH is from 7, the more acidic or basic the solution.', focus: ['s.lemon', 's.oven'] },
      ],
    },
    {
      chapter: 'Acidic, neutral or basic?',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A sample of baking soda solution has a pH of 8.4. Is it acidic, neutral or basic?' }, soda],
      lines: [
        { say: 'A sample of baking soda solution has a p H of eight point four. Is it acidic, neutral or basic?', caption: 'A sample of baking soda solution has a pH of 8.4. Is it acidic, neutral or basic?', show: ['q', 's.scale', 's.acidic', 's.neutral', 's.basic'] },
        { say: 'Eight point four is above seven, so the solution is basic. But only slightly basic, because eight point four is close to seven.', show: 's.soda', focus: 's.soda' },
      ],
    },
    {
      chapter: 'Putting solutions in order',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Put these in order from the most acidic to the most basic: vinegar (pH 2.8), milk (pH 6.6), oven cleaner (pH 13.5) and lemon juice (pH 2.2).' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Solution', 'pH'],
          rows: [
            ['most acidic', 'lemon juice', '$2.2$'],
            ['', 'vinegar', '$2.8$'],
            ['', 'milk', '$6.6$'],
            ['most basic', 'oven cleaner', '$13.5$'],
          ],
        },
      ],
      lines: [
        { say: 'Put these four solutions in order, from the most acidic to the most basic.', show: 'q' },
        { say: 'The lower the p H, the more acidic the solution. So the most acidic has the lowest p H: lemon juice, at two point two.', caption: 'The lower the pH, the more acidic the solution. So the most acidic has the lowest pH: lemon juice, at 2.2.', show: 't.0', focus: 't.0' },
        { say: 'Then vinegar at two point eight, and milk at six point six.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Last comes the highest p H, oven cleaner at thirteen point five. It is the most basic.', caption: 'Last comes the highest pH, oven cleaner at 13.5. It is the most basic.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Ten times for every step',
      layout: 'center',
      main: [
        tenfold,
        {
          kind: 'table',
          id: 't',
          head: ['Difference in pH', '$1$', '$2$', '$3$', '$4$'],
          rows: [['Times more acidic', '$10$', '$100$', '$1000$', '$10\\,000$']],
        },
      ],
      lines: [
        { say: 'The p H scale is not like a ruler. Each step of one p H unit is a change of ten times in acidity.', caption: 'The pH scale is not like a ruler. Each step of 1 pH unit is a change of ten times in acidity.', show: ['s.scale', 's.acidic', 's.neutral', 's.basic'] },
        { say: 'A solution with a p H of four is ten times more acidic than one with a p H of five.', caption: 'A solution with a pH of 4 is ten times more acidic than one with a pH of 5.', show: 's.hop1', focus: 's.hop1' },
        { say: 'And a p H of three is ten times ten, a hundred times, more acidic than a p H of five.', caption: 'And a pH of 3 is 10 × 10, a hundred times, more acidic than a pH of 5.', show: 's.hop2', focus: ['s.hop1', 's.hop2'] },
        { say: 'Each further step multiplies by ten again: a difference of three is a thousand times, and four is ten thousand times.', show: ['s.hop3', 't'], focus: 't' },
      ],
    },
    {
      chapter: 'Comparing two acids',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Solution A has a pH of 2, and solution B has a pH of 5. How many times more acidic is solution A than solution B?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 - 2 = 3 \\text{ units}', '10 \\times 10 \\times 10 = \\good{1000 \\text{ times}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply, do not add', md: 'A difference of 3 pH units is not 3 times, or 30 times, more acidic. Multiply by 10 once for each unit.' },
      ],
      lines: [
        { say: 'Solution A has a p H of two, and solution B has a p H of five. How many times more acidic is solution A?', caption: 'Solution A has a pH of 2, and solution B has a pH of 5. How many times more acidic is solution A?', show: 'q' },
        { say: 'The p H values differ by five minus two, which is three units.', caption: 'The pH values differ by 5 − 2, which is three units.', show: 'm.0', focus: 'm.0' },
        { say: 'Each unit is a factor of ten. Ten times ten times ten is a thousand, so solution A is a thousand times more acidic.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not add, or multiply the difference by ten. Multiply by ten once for each unit.', show: 'oops' },
        { say: 'Adding water spreads an acid out, so its p H rises towards seven. A rise from two to three makes it ten times less acidic.', caption: 'Adding water spreads an acid out, so its pH rises towards 7. A rise from 2 to 3 makes it ten times less acidic.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solution X has a pH of 3, and solution Y has a pH of 5. How many times more acidic is solution X than solution Y? Each change of 1 pH unit is a tenfold change in acidity.',
          choices: ['$2$ times', '$100$ times', '$20$ times', '$1000$ times'],
          answer: 1,
          working: 'The pH values differ by $5 - 3 = 2$, so X is $10 \\times 10 = 100$ times more acidic.',
        },
      ],
      lines: [
        { say: 'Your turn. Solution X has a p H of three, and solution Y has a p H of five. How many times more acidic is solution X? Pause the video and try it.', caption: 'Your turn. Solution X has a pH of 3, and solution Y has a pH of 5. How many times more acidic is solution X? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, a hundred times. The difference is two units, and ten times ten is a hundred. Choice C multiplies the difference by ten.', show: 'q.answer' },
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
            'On the **pH scale**, below 7 is acidic, 7 is neutral and above 7 is basic.',
            'The lower the pH, the more acidic; the higher the pH, the more basic.',
            'Each step of 1 pH unit is a **tenfold** change: 2 units is 100 times, 3 units is 1000 times.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On the p H scale, below seven is acidic, seven is neutral, and above seven is basic.', caption: 'Let’s sum up. On the pH scale, below 7 is acidic, 7 is neutral, and above 7 is basic.', show: 'sum.0' },
        { say: 'The lower the p H, the more acidic the solution. The higher the p H, the more basic.', caption: 'The lower the pH, the more acidic the solution. The higher the pH, the more basic.', show: 'sum.1' },
        { say: 'And each step of one p H unit is a tenfold change. In part three, you will use indicators. See you there!', caption: 'And each step of 1 pH unit is a tenfold change. In part three, you will use indicators. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
