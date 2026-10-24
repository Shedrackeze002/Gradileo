import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balls, frame, tag, water } from './lib/c10-5-figures.ts';

// A water molecule with the molar mass of each atom written beside it.
const masses = figure('w', [
  balls({ balls: water('m', [0, 0], 2.2), scale: 2.2 }),
  tag('o-mass', [0, 1.05], '16.0', { place: 'above', tone: 'bad' }),
  tag('h1-mass', [-1.23, -1.66], '1.0', { place: 'below' }),
  tag('h2-mass', [1.23, -1.66], '1.0', { place: 'below' }),
  frame('room', [-2.4, -2.3], [2.4, 1.6]),
]);

const video: Explainer = {
  id: 'c10-5-1-c',
  lessonId: 'c10-5-1',
  title: 'The Mole and Molar Mass, Part 3: Molar Mass',
  thumbnailTitle: 'Molar Mass',
  thumbnail: 'w',
  summary:
    'The molar mass of a substance is the mass of one mole of it, in grams per mole. For an element it is the relative atomic mass in g/mol; for a compound, count the atoms in the formula, multiply each count by the element’s molar mass, and add: water is 18.0 g/mol, carbon dioxide 44.0 g/mol and sulfuric acid 98.1 g/mol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 3', title: 'Molar Mass', subtitle: 'The mass of one mole' }],
      lines: [
        { say: 'A dozen eggs and a dozen watermelons hold the same number of things, but they have very different masses.', show: 'title' },
        { say: 'Moles work the same way. In this part, you will find the mass of one mole of a substance, its molar mass, by adding up the masses of its atoms.' },
      ],
    },
    {
      chapter: 'Molar mass',
      layout: 'split',
      left: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Molar mass', md: 'The **molar mass**, $M$, of a substance is the mass of one mole of it, in grams per mole, $\\text{g/mol}$.' },
        {
          kind: 'table',
          id: 'el',
          head: ['Element', 'Molar mass'],
          rows: [
            ['hydrogen, H', '$1.0\\ \\text{g/mol}$'],
            ['carbon, C', '$12.0\\ \\text{g/mol}$'],
            ['oxygen, O', '$16.0\\ \\text{g/mol}$'],
          ],
        },
      ],
      right: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            '**Count** the atoms of each element. A small number after a symbol counts the atom before it.',
            '**Multiply** each count by that element’s molar mass.',
            '**Add** the results.',
          ],
        },
      ],
      lines: [
        { say: 'One mole of every substance holds the same number of particles. But the mass of a mole depends on how heavy its particles are.' },
        { say: 'The molar mass, capital M, of a substance is the mass of one mole of it, in grams per mole.', show: 'def' },
        { say: 'An element’s molar mass is its relative atomic mass, in grams per mole. Questions give the ones they need: hydrogen is one point zero, carbon twelve point zero, and oxygen sixteen point zero grams per mole.', show: 'el' },
        { say: 'For a compound, add up the molar masses of all its atoms. First, count the atoms of each element: a small number after a symbol counts the atom just before it.', show: 'steps.0', focus: 'steps.0' },
        { say: 'Then multiply each count by that element’s molar mass, and add the results.', show: ['steps.1', 'steps.2'], focus: ['steps.1', 'steps.2'] },
      ],
    },
    {
      chapter: 'Water',
      layout: 'split',
      left: [masses],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find the molar mass of water, $\\ce{H2O}$. Use H $1.0\\ \\text{g/mol}$ and O $16.0\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['M(\\ce{H2O}) = 2 \\times 1.0 + 16.0', '= 2.0 + 16.0', '= \\good{18.0\\ \\text{g/mol}}'] },
      ],
      lines: [
        { say: 'What is the molar mass of water, H two O?', caption: 'What is the molar mass of water, H₂O?', show: ['q', 'w.m'] },
        { say: 'Count first. The small two after the H means one molecule has two hydrogen atoms, and there is one oxygen atom.', show: ['w.o-mass', 'w.h1-mass', 'w.h2-mass'] },
        { say: 'Multiply and add: two times one point zero, plus sixteen point zero. That is two point zero plus sixteen point zero.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So the molar mass of water is eighteen point zero grams per mole: one mole of water has a mass of eighteen point zero grams.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Carbon dioxide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find the molar mass of carbon dioxide, $\\ce{CO2}$. Use C $12.0\\ \\text{g/mol}$ and O $16.0\\ \\text{g/mol}$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Count', 'Molar mass', 'Total'],
          rows: [
            ['C', '$1$', '$12.0$', '$12.0$'],
            ['O', '$2$', '$16.0$', '$2 \\times 16.0 = 32.0$'],
            ['$\\ce{CO2}$', '', '', '[[good:$44.0\\ \\text{g/mol}$]]'],
          ],
        },
      ],
      lines: [
        { say: 'Next, carbon dioxide, C O two. One molecule has one carbon atom and two oxygen atoms.', caption: 'Next, carbon dioxide, CO₂. One molecule has one carbon atom and two oxygen atoms.', show: 'q' },
        { say: 'One carbon atom gives twelve point zero.', show: 't.0', focus: 't.0' },
        { say: 'Two oxygen atoms give two times sixteen point zero, which is thirty-two point zero.', show: 't.1', focus: 't.1' },
        { say: 'Add them: twelve point zero plus thirty-two point zero is forty-four point zero grams per mole.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Sulfuric acid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find the molar mass of sulfuric acid, $\\ce{H2SO4}$. Use H $1.0\\ \\text{g/mol}$, S $32.1\\ \\text{g/mol}$ and O $16.0\\ \\text{g/mol}$.' },
        {
          kind: 'table',
          id: 't',
          head: ['Element', 'Count', 'Molar mass', 'Total'],
          rows: [
            ['H', '$2$', '$1.0$', '$2 \\times 1.0 = 2.0$'],
            ['S', '$1$', '$32.1$', '$32.1$'],
            ['O', '$4$', '$16.0$', '$4 \\times 16.0 = 64.0$'],
            ['$\\ce{H2SO4}$', '', '', '[[good:$98.1\\ \\text{g/mol}$]]'],
          ],
        },
      ],
      lines: [
        { say: 'Now a bigger formula: sulfuric acid, H two S O four. Sulfur is thirty-two point one grams per mole.', caption: 'Now a bigger formula: sulfuric acid, H₂SO₄. Sulfur is 32.1 g/mol.', show: 'q' },
        { say: 'Count first: two hydrogen atoms, one sulfur atom and four oxygen atoms.', show: ['t.0', 't.1', 't.2'] },
        { say: 'Multiply: two point zero for hydrogen, thirty-two point one for sulfur, and four times sixteen point zero, which is sixty-four point zero, for oxygen.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Add them up: two point zero, plus thirty-two point one, plus sixty-four point zero, is ninety-eight point one grams per mole.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the molar mass of ammonia, $\\ce{NH3}$, to the nearest tenth? Use N $14.0\\ \\text{g/mol}$ and H $1.0\\ \\text{g/mol}$.',
          choices: ['$17.0\\ \\text{g/mol}$', '$15.0\\ \\text{g/mol}$', '$43.0\\ \\text{g/mol}$', '$45.0\\ \\text{g/mol}$'],
          answer: 0,
          working: 'One molecule has 1 N and 3 H: $M = 14.0 + 3 \\times 1.0 = 14.0 + 3.0 = 17.0\\ \\text{g/mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the molar mass of ammonia, N H three? Use the molar masses on the screen. Pause the video and try it.', caption: 'Your turn. What is the molar mass of ammonia, NH₃? Use the molar masses on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seventeen point zero grams per mole. One nitrogen gives fourteen point zero, and three hydrogens give three point zero. Choice C, forty-three point zero, multiplies the nitrogen by three, but the three counts only the hydrogen just before it.', show: 'q.answer' },
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
            'The **molar mass**, $M$, is the mass of one mole, in $\\text{g/mol}$.',
            'An element’s molar mass is its relative atomic mass in $\\text{g/mol}$.',
            'For a compound: **count** the atoms, **multiply** each count by its molar mass, and **add**.',
            '$M(\\ce{H2O}) = 18.0$, $M(\\ce{CO2}) = 44.0$ and $M(\\ce{H2SO4}) = 98.1\\ \\text{g/mol}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The molar mass is the mass of one mole, in grams per mole.', show: 'sum.0' },
        { say: 'An element’s molar mass is its relative atomic mass, in grams per mole.', show: 'sum.1' },
        { say: 'For a compound, count the atoms, multiply each count by its molar mass, and add.', show: 'sum.2' },
        { say: 'Water is eighteen point zero grams per mole. In part four, you will find the molar masses of formulas with brackets. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
