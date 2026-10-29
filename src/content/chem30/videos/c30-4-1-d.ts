import type { Explainer } from '@/video/script.ts';
import { dots } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { join, settle, timeGraph } from './lib/c30-4a-figures.ts';

const TIME = '\\text{Time (s)}';
const RATE = '\\text{Rate (mol/(L·s))}';

// The lesson's rate–time graph for the flask that starts with 0.80 mol/L of N₂O₄: the forward
// rate falls from 0.80 and the reverse rate rises from 0, both 0.30 from 40 s.
const rateCurves = (name?: string, at?: [number, number]) =>
  timeGraph({
    name,
    at,
    x: [0, 80],
    y: [0, 1],
    xStep: 10,
    yStep: 0.1,
    every: name ? 2 : 1,
    titles: { x: TIME, y: RATE },
    curves: [
      { id: 'fwd', points: settle(0.8, 0.3, 40, 80, 4), tone: 'adj', label: '\\text{forward}', at: [10, 0.58], place: 'above right' },
      { id: 'rev', points: settle(0, 0.3, 40, 80, 4), tone: 'opp', label: '\\text{reverse}', at: [24, 0.2], place: 'below right' },
    ],
    marks: [{ id: 'eq', x: 40 }],
  });

const r = rateCurves();
// Readings at 20 s (forward about 0.43, reverse about 0.23) and at 60 s (both 0.30).
const graph = figure(
  'g',
  [
    r.part,
    dots(r.g, [
      { id: 'f20', x: 20, y: 0.425, tone: 'adj', group: 't20' },
      { id: 'r20', x: 20, y: 0.225, tone: 'opp', group: 't20' },
      { id: 'b60', x: 60, y: 0.3, tone: 'theta' },
    ]),
  ],
  520,
);

// The concentration graph and the rate graph side by side, each with equilibrium at 40 s.
const conc = timeGraph({
  name: 'c',
  x: [0, 80],
  y: [0, 1],
  xStep: 10,
  yStep: 0.1,
  every: 2,
  titles: { x: TIME, y: '\\text{Concentration (mol/L)}' },
  curves: [
    { id: 'n2o4', points: settle(0.8, 0.5, 40, 80, 4), tone: 'adj', label: '[\\ce{N2O4}]', at: [62, 0.5], place: 'below' },
    { id: 'no2', points: settle(0, 0.6, 40, 80, 4), tone: 'opp', label: '[\\ce{NO2}]', at: [62, 0.6], place: 'above' },
  ],
  marks: [{ id: 'eq', x: 40, tone: 'theta' }],
});
const rates2 = timeGraph({
  name: 'r',
  at: [11, 0],
  x: [0, 80],
  y: [0, 1],
  xStep: 10,
  yStep: 0.1,
  every: 2,
  titles: { x: TIME, y: RATE },
  curves: [
    { id: 'fwd', points: settle(0.8, 0.3, 40, 80, 4), tone: 'adj', label: '\\text{forward}', at: [10, 0.58], place: 'above right' },
    { id: 'rev', points: settle(0, 0.3, 40, 80, 4), tone: 'opp', label: '\\text{reverse}', at: [24, 0.2], place: 'below right' },
  ],
  marks: [{ id: 'eq', x: 40, tone: 'theta' }],
});
const both = figure('b', [join([conc.part, rates2.part])], 440);

const video: Explainer = {
  id: 'c30-4-1-d',
  lessonId: 'c30-4-1',
  title: 'Dynamic Equilibrium, Part 4: Rate–Time Graphs',
  thumbnailTitle: 'Rate–Time Graphs',
  thumbnail: 'g',
  summary:
    'On a rate–time graph, the forward rate starts high and falls as the reactants are used up, while the reverse rate starts at zero and rises as the products build up. Equilibrium is reached where the two rates meet, at the same moment the concentration curves become flat, and both reactions continue at that rate. Starting from the products gives the mirror image.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 4', title: 'Rate–Time Graphs', subtitle: 'Where the two rates meet' }],
      lines: [
        { say: 'A concentration graph shows what a flask holds, but not why the amounts stop changing. For that, follow the rates of the forward and reverse reactions.', show: 'title' },
        { say: 'In this part, you will read a rate–time graph, and see how it matches the concentration graph.' },
      ],
    },
    {
      chapter: 'Forward and reverse rates',
      layout: 'split',
      leftWidth: 560,
      left: [graph],
      right: [
        { kind: 'math', id: 'eq', size: 'md', align: 'left', lines: ['\\ce{N2O4(g) <=> 2NO2(g)}'] },
        { kind: 'bullets', id: 'b', items: ['The **forward** rate starts high and falls as $\\ce{N2O4}$ is used up.', 'The **reverse** rate starts at zero and rises as $\\ce{NO2}$ builds up.', 'They meet at $40\\ \\text{s}$ and stay together: **equilibrium**.'] },
      ],
      lines: [
        { say: 'The same flask of dye-nitrogen tetroxide can be followed by plotting the rates of the forward and reverse reactions against time.', caption: 'The same flask of dinitrogen tetroxide can be followed by plotting the rates of the forward and reverse reactions against time.', show: ['eq', 'g.grid', 'g.axes'] },
        { say: 'The forward rate starts high, and falls as dye-nitrogen tetroxide is used up.', caption: 'The forward rate starts high, and falls as dinitrogen tetroxide is used up.', show: ['g.fwd', 'g.fwd-lab', 'b.0'], focus: 'g.fwd' },
        { say: 'The reverse rate starts at zero, because there is no nitrogen dioxide at first. It rises as nitrogen dioxide builds up.', show: ['g.rev', 'g.rev-lab', 'b.1'], focus: 'g.rev' },
        { say: 'Equilibrium is reached where the two curves meet, at forty seconds. From then on they stay together: both reactions continue, at the same rate.', show: ['g.eq', 'b.2'], focus: ['g.eq', 'b.2'] },
      ],
    },
    {
      chapter: 'Reading a rate graph',
      layout: 'split',
      leftWidth: 560,
      left: [graph],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Describe the system at $20\\ \\text{s}$ and at $60\\ \\text{s}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['20\\ \\text{s:}\\ \\adj{0.43} > \\opp{0.23}', '\\text{not at equilibrium}', '60\\ \\text{s:}\\ \\adj{0.30} = \\opp{0.30}', '\\text{dynamic equilibrium}'] },
      ],
      lines: [
        { say: 'Use the graph to describe the system at twenty seconds, and at sixty seconds.', show: ['q', 'g.grid', 'g.axes', 'g.fwd', 'g.fwd-lab', 'g.rev', 'g.rev-lab', 'g.eq'] },
        { say: 'At twenty seconds, the forward rate is about zero point four three, and the reverse rate about zero point two three.', show: ['g.t20', 'm.0'], focus: ['g.t20', 'm.0'] },
        { say: 'The forward rate is greater, so nitrogen dioxide is still forming overall. The system is not at equilibrium yet.', show: 'm.1', focus: 'm.1' },
        { say: 'At sixty seconds, both rates are zero point three zero. They are equal, so the concentrations are constant: a dynamic equilibrium, with both reactions still going.', show: ['g.b60', 'm.2', 'm.3'], focus: ['g.b60', 'm.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Two graphs, one story',
      layout: 'center',
      main: [both],
      lines: [
        { say: 'Put the two graphs side by side. While the forward rate is greater, dye-nitrogen tetroxide is used up faster than it re-forms, so the concentrations keep changing.', caption: 'Put the two graphs side by side. While the forward rate is greater, dinitrogen tetroxide is used up faster than it re-forms, so the concentrations keep changing.', show: ['b.c-grid', 'b.c-axes', 'b.c-n2o4', 'b.c-n2o4-lab', 'b.c-no2', 'b.c-no2-lab', 'b.r-grid', 'b.r-axes', 'b.r-fwd', 'b.r-fwd-lab', 'b.r-rev', 'b.r-rev-lab'] },
        { say: 'At forty seconds the rates become equal, and at that same moment the concentration curves become flat. Equal rates mean constant concentrations.', show: ['b.c-eq', 'b.r-eq'], focus: ['b.c-eq', 'b.r-eq'] },
        { say: 'If the flask started with nitrogen dioxide only, the graphs would be the mirror image. The reverse rate would start high and fall, and the forward rate would rise from zero, until they met.', focus: 'b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sealed flask starts with reactants only. Its forward rate falls from $0.70$ and its reverse rate rises from $0$, until both are $0.25\\ \\text{mol/(L·s)}$ at $30\\ \\text{s}$. Which describes the system at $15\\ \\text{s}$?',
          choices: ['Products are still forming overall: the forward rate is greater.', 'It is at equilibrium, because both reactions are happening.', 'Reactants are forming overall: the reverse rate is greater.', 'Both reactions have stopped.'],
          answer: 0,
          working: 'At $15\\ \\text{s}$ the curves have not met: the forward rate is still greater. Equilibrium needs equal rates, reached at $30\\ \\text{s}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A flask starts with reactants only. Its forward rate falls and its reverse rate rises, until both are zero point two five at thirty seconds. Which describes the system at fifteen seconds? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. At fifteen seconds the curves have not met, so the forward rate is still greater. Choice B is tempting, but both reactions happen long before equilibrium. Equilibrium needs equal rates.', show: 'q.answer' },
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
            'The **forward** rate falls as reactants are used up; the **reverse** rate rises as products build up.',
            'Equilibrium is reached where the rates meet, just as the concentration curves become **flat**.',
            'Starting from the products gives the mirror image.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The forward rate falls as the reactants are used up, and the reverse rate rises as the products build up.', show: 'sum.0' },
        { say: 'Equilibrium is reached where the two rates meet, at the same moment the concentration curves become flat.', show: 'sum.1' },
        { say: 'And starting from the products gives the mirror image. That completes this lesson. Next, you will put a number on the position of equilibrium: the equilibrium constant.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
