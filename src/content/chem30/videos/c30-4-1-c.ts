import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { settle, tag, timeGraph } from './lib/c30-4a-figures.ts';

// Where an equilibrium lies: mostly reactants (grey) on the left, mostly products (orange) on the right.
const position = figure(
  'p',
  [
    particles({ name: 'l', size: 4.5, state: 'gas', kinds: [{ id: 'r', tone: 'muted', count: 8 }, { id: 'p', tone: 'opp', count: 2 }], seed: 2 }),
    particles({ name: 'r', at: [8, 0], size: 4.5, state: 'gas', kinds: [{ id: 'r', tone: 'muted', count: 2 }, { id: 'p', tone: 'opp', count: 8 }], seed: 8 }),
    tag('ll', [2.25, -0.2], '\\text{lies to the left}', { place: 'below' }),
    tag('rl', [10.25, -0.2], '\\text{lies to the right}', { place: 'below' }),
  ],
  290,
);

// The lesson's graph: a sealed 1 L flask that starts with 0.80 mol/L of N₂O₄. [N₂O₄] falls to 0.50
// and [NO₂] rises to 0.60 mol/L, both flat from 40 s.
const n2o4 = timeGraph({
  x: [0, 80],
  y: [0, 1],
  xStep: 10,
  yStep: 0.1,
  titles: { x: '\\text{Time (s)}', y: '\\text{Concentration (mol/L)}' },
  curves: [
    { id: 'n2o4', points: settle(0.8, 0.5, 40, 80, 4), tone: 'adj', label: '[\\ce{N2O4}]', at: [62, 0.5], place: 'below' },
    { id: 'no2', points: settle(0, 0.6, 40, 80, 4), tone: 'opp', label: '[\\ce{NO2}]', at: [62, 0.6], place: 'above' },
  ],
  marks: [{ id: 'eq', x: 40 }],
});
const graph = figure('g', [n2o4.part], 520);

// The lesson's example: [A] 0.90 → 0.30, [B] 0.50 → 0.20, [C] 0 → 0.60 mol/L, all flat from 30 s.
const abc = timeGraph({
  x: [0, 60],
  y: [0, 1],
  xStep: 10,
  yStep: 0.1,
  titles: { x: '\\text{Time (s)}', y: '\\text{Concentration (mol/L)}' },
  curves: [
    { id: 'a', points: settle(0.9, 0.3, 30, 60, 3), tone: 'adj', label: '[\\text{A}]', at: [48, 0.3], place: 'above' },
    { id: 'b', points: settle(0.5, 0.2, 30, 60, 3), tone: 'good', label: '[\\text{B}]', at: [48, 0.2], place: 'below' },
    { id: 'c', points: settle(0, 0.6, 30, 60, 3), tone: 'opp', label: '[\\text{C}]', at: [48, 0.6], place: 'above' },
  ],
  marks: [{ id: 'eq', x: 30 }],
});
const abcGraph = figure('g', [abc.part], 520);

const video: Explainer = {
  id: 'c30-4-1-c',
  lessonId: 'c30-4-1',
  title: 'Dynamic Equilibrium, Part 3: Concentration–Time Graphs',
  thumbnailTitle: 'Concentration–Time Graphs',
  thumbnail: 'g',
  summary:
    'The equilibrium position says whether reactants or products are favoured. On a concentration–time graph, equilibrium starts where the curves become flat, the flat levels are the equilibrium concentrations, and the changes in concentration are in the ratio of the coefficients: 0.30 mol/L of N₂O₄ used and 0.60 mol/L of NO₂ made is 1 : 2. From changes of 0.60, 0.30 and 0.60 mol/L, the equation is 2A + B ⇌ 2C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'Concentration–Time Graphs', subtitle: 'Where a system settles, and when' }],
      lines: [
        { say: 'Nobody can watch molecules react, but chemists can measure concentrations as a reaction goes on. A graph shows when a system reaches equilibrium, and where it settles.', show: 'title' },
        { say: 'In this part, you will meet the position of equilibrium, and read graphs of concentration against time.' },
      ],
    },
    {
      chapter: 'The position of equilibrium',
      layout: 'center',
      main: [
        position,
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equilibrium position', md: 'The relative amounts of reactants and products at equilibrium. Mostly products: it **lies to the right**, and products are **favoured**. Mostly reactants: it lies to the left.' },
      ],
      lines: [
        { say: 'Some reversible reactions settle with mostly products. Others hardly get started before the reverse reaction catches up.', show: ['p.l-box', 'p.l-r', 'p.l-p', 'p.r-box', 'p.r-r', 'p.r-p'] },
        { say: 'The equilibrium position describes this. Mostly products: the equilibrium lies to the right, and products are favoured. Mostly reactants: it lies to the left.', show: ['def', 'p.ll', 'p.rl'], focus: ['p.ll', 'p.rl'] },
      ],
    },
    {
      chapter: 'Reading the graph',
      layout: 'split',
      leftWidth: 560,
      left: [graph],
      right: [
        { kind: 'math', id: 'eq', size: 'md', align: 'left', lines: ['\\ce{N2O4(g) <=> 2NO2(g)}'] },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Equilibrium from } 40\\ \\text{s}', '[\\ce{N2O4}] = 0.50\\ \\text{mol/L}', '[\\ce{NO2}] = 0.60\\ \\text{mol/L}', '0.30 : 0.60 = 1 : 2'],
        },
      ],
      lines: [
        { say: 'A sealed one-litre flask starts with zero point eight zero moles per litre of dye-nitrogen tetroxide. Square brackets mean the concentration, in moles per litre.', caption: 'A sealed 1 L flask starts with 0.80 mol/L of dinitrogen tetroxide. Square brackets mean the concentration, in moles per litre.', show: ['eq', 'g.grid', 'g.axes', 'g.n2o4', 'g.n2o4-lab'], focus: 'g.n2o4' },
        { say: 'As it is used up, its concentration falls, while nitrogen dioxide rises from zero.', show: ['g.no2', 'g.no2-lab'], focus: 'g.no2' },
        { say: 'Three things can be read. First, when equilibrium is reached: where the curves become flat, here at forty seconds. From then on, the concentrations stay constant.', show: ['g.eq', 'm.0'], focus: ['g.eq', 'm.0'] },
        { say: 'Second, the equilibrium concentrations, the levels of the flat parts: zero point five zero moles per litre of dye-nitrogen tetroxide, and zero point six zero of nitrogen dioxide.', caption: 'Second, the equilibrium concentrations, the levels of the flat parts: 0.50 mol/L of dinitrogen tetroxide, and 0.60 of nitrogen dioxide.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2', 'g.n2o4-lab', 'g.no2-lab'] },
        { say: 'Third, the mole ratio. Dye-nitrogen tetroxide fell by zero point three zero, while nitrogen dioxide rose by zero point six zero: one to two, the ratio of the coefficients.', caption: 'Third, the mole ratio. Dinitrogen tetroxide fell by 0.30, while nitrogen dioxide rose by 0.60: 1 : 2, the ratio of the coefficients.', show: 'm.3', focus: ['m.3', 'eq'] },
      ],
    },
    {
      chapter: 'Finding the equation',
      layout: 'split',
      leftWidth: 560,
      left: [abcGraph],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\Delta[\\text{A}] = 0.30 - 0.90 = {-0.60}', '\\Delta[\\text{B}] = 0.20 - 0.50 = {-0.30}', '\\Delta[\\text{C}] = 0.60 - 0 = +0.60', '0.60 : 0.30 : 0.60 = 2 : 1 : 2', '\\ce{2A + B <=> 2C}'],
        },
      ],
      lines: [
        { say: 'Gases A and B react in a sealed flask to form gas C, and all three concentrations level off at thirty seconds. What is the balanced equation?', show: ['g.grid', 'g.axes', 'g.a', 'g.a-lab', 'g.b', 'g.b-lab', 'g.c', 'g.c-lab', 'g.eq'] },
        { say: 'Find each change. The concentration of A falls from zero point nine zero to zero point three zero, a change of zero point six zero. B falls by zero point three zero, and C rises by zero point six zero.', caption: 'Find each change. The concentration of A falls from 0.90 to 0.30, a change of 0.60. B falls by 0.30, and C rises by 0.60.', show: ['m.0', 'm.1', 'm.2'], focus: ['m.0', 'm.1', 'm.2'] },
        { say: 'Zero point six zero, to zero point three zero, to zero point six zero simplifies to two, to one, to two. So the equation is two A plus B, in equilibrium with two C.', caption: '0.60 : 0.30 : 0.60 simplifies to 2 : 1 : 2. So the equation is 2A + B ⇌ 2C.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'Take the coefficients from the changes, not the final values. The final values, zero point three zero, zero point two zero and zero point six zero, are not in that ratio.', caption: 'Take the coefficients from the changes, not the final values. The final values, 0.30, 0.20 and 0.60, are not in that ratio.', focus: ['g.a-lab', 'g.b-lab', 'g.c-lab'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Gases A and B react in a sealed flask to form gas C. On a concentration–time graph, $[\\text{A}]$ falls from $0.80$ to $0.50\\ \\text{mol/L}$, $[\\text{B}]$ falls from $0.60$ to $0.50\\ \\text{mol/L}$, and $[\\text{C}]$ rises from $0$ to $0.20\\ \\text{mol/L}$, all levelling off at $40\\ \\text{s}$. Which equation matches?',
          choices: ['$\\ce{5A + 5B <=> 2C}$', '$\\ce{3A + B <=> 2C}$', '$\\ce{A + 3B <=> 2C}$', '$\\ce{3A + B <=> C}$'],
          answer: 1,
          working: 'Changes: $0.30$, $0.10$ and $0.20\\ \\text{mol/L}$, and $0.30 : 0.10 : 0.20 = 3 : 1 : 2$. The final values $0.50 : 0.50 : 0.20$ are not the ratio of the coefficients.',
        },
      ],
      lines: [
        { say: 'Your turn. Gases A and B react to form gas C, with the concentrations shown. Which equation matches? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The changes are zero point three zero, zero point one zero and zero point two zero: three to one to two. Choice A uses the final values, which are not the ratio of the coefficients.', caption: 'The answer is B. The changes are 0.30, 0.10 and 0.20: 3 : 1 : 2. Choice A uses the final values, which are not the ratio of the coefficients.', show: 'q.answer' },
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
            'The **equilibrium position** lies to the right when products are favoured, and to the left when reactants are.',
            'Equilibrium is reached where the curves become **flat**; their levels are the equilibrium concentrations.',
            'The **changes** in concentration, not the final values, are in the ratio of the coefficients.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The equilibrium position lies to the right when products are favoured, and to the left when reactants are.', show: 'sum.0' },
        { say: 'On a concentration–time graph, equilibrium is reached where the curves become flat, and their levels are the equilibrium concentrations.', show: 'sum.1' },
        { say: 'The changes, not the final values, are in the ratio of the coefficients. In part four, you will follow the rates of the two reactions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
