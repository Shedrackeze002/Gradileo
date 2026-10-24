import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { arrow, LETTER_TONE, mol, plus, row } from './lib/c10-4-figures.ts';

// The four patterns as balls: each letter is an element, and touching balls are a compound.
const L = (id: string, letters: string[]) => mol(id, letters, { tones: letters.map((l) => LETTER_TONE[l]) });
const rows = [
  row({ y: 0, title: { id: 'syn-t', tex: '\\text{Synthesis}' }, terms: [L('syn-a', ['A']), plus('syn-p'), L('syn-b', ['B']), arrow('syn-arr'), L('syn-ab', ['A', 'B'])] }),
  row({ y: -1.6, title: { id: 'dec-t', tex: '\\text{Decomposition}' }, terms: [L('dec-ab', ['A', 'B']), arrow('dec-arr'), L('dec-a', ['A']), plus('dec-p'), L('dec-b', ['B'])] }),
  row({ y: -3.2, title: { id: 'sd-t', tex: '\\text{Single displacement}' }, terms: [L('sd-a', ['A']), plus('sd-p1'), L('sd-bc', ['B', 'C']), arrow('sd-arr'), L('sd-ac', ['A', 'C']), plus('sd-p2'), L('sd-b', ['B'])] }),
  row({ y: -4.8, title: { id: 'dd-t', tex: '\\text{Double displacement}' }, terms: [L('dd-ab', ['A', 'B']), plus('dd-p1'), L('dd-cd', ['C', 'D']), arrow('dd-arr'), L('dd-ad', ['A', 'D']), plus('dd-p2'), L('dd-cb', ['C', 'B'])] }),
];
// Room on the left for the row titles.
const room: Part = { points: { 'room-l': [-5, 0] }, items: [] };
const patterns = figure('pat', [room, ...rows], 440);
/** Every part of a row (each molecule's group, each plus sign, the arrow and the title), to show it all at once. */
const rowParts = (k: number) => [...new Set(rows[k].items.map((i) => `pat.${i.group ?? i.id}`))];

const video: Explainer = {
  id: 'c10-4-3',
  lessonId: 'c10-4-3',
  title: 'Types of Reactions, Part 1: Five Types of Reactions',
  thumbnailTitle: 'Five Types of Reactions',
  thumbnail: 'pat',
  summary:
    'Sort each reactant and product into an element or a compound, and the pattern gives the type: synthesis (A + B → AB), decomposition (AB → A + B), single displacement (A + BC → AC + B), double displacement (AB + CD → AD + CB), or combustion, a fuel burning in oxygen.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 1', title: 'Five Types of Reactions', subtitle: 'Spotting the pattern' }],
      lines: [
        { say: 'Millions of different reactions are known, but most of the ones you will meet follow a handful of patterns. Spot the pattern, and you can often predict what a reaction will make.', show: 'title' },
        { say: 'This first part names the five types. Part two predicts the type from the reactants and the products of burning, part three covers displacement, and part four precipitates.' },
      ],
    },
    {
      chapter: 'Elements and compounds',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Element: one symbol', 'Compound: two or more'], rows: [['$\\ce{Na}$', '$\\ce{NaCl}$'], ['$\\ce{O2}$', '$\\ce{H2O}$'], ['$\\ce{Cu}$', '$\\ce{CH4}$']] },
      ],
      lines: [
        { say: 'Start by sorting each reactant and product into an element or a compound.', show: 't' },
        { say: 'An element’s formula has one symbol, like sodium, oxygen, O two, or copper. A compound’s formula has two or more, like sodium chloride, water, or methane.', caption: 'An element’s formula has one symbol, like Na, O₂ or Cu. A compound’s formula has two or more, like NaCl, H₂O or CH₄.' },
      ],
    },
    {
      chapter: 'Four patterns',
      layout: 'center',
      main: [patterns],
      lines: [
        { say: 'In a synthesis, two or more reactants combine into a single product. "A" plus B gives "A" B.', caption: 'In a synthesis, two or more reactants combine into a single product. A + B → AB.', show: rowParts(0) },
        { say: 'A decomposition is the reverse. One reactant breaks down into two or more simpler products, usually when it is heated or when electricity passes through it.', caption: 'A decomposition is the reverse. One reactant breaks down into two or more simpler products, usually when it is heated or when electricity passes through it: AB → A + B.', show: rowParts(1) },
        { say: 'In a single displacement, an element takes the place of another element in a compound. "A" pushes B out, and takes its partner, C.', caption: 'In a single displacement, an element takes the place of another element in a compound. A pushes B out, and takes its partner, C.', show: rowParts(2) },
        { say: 'In a double displacement, two compounds, usually dissolved in water, swap partners. "A" goes with D, and C goes with B.', caption: 'In a double displacement, two compounds, usually dissolved in water, swap partners. A goes with D, and C goes with B.', show: rowParts(3) },
      ],
    },
    {
      chapter: 'Examples of each',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Type', 'Example'],
          rows: [
            ['Synthesis', '$\\ce{2Na + Cl2 -> 2NaCl}$'],
            ['Decomposition', '$\\ce{CaCO3 -> CaO + CO2}$'],
            ['Single displacement', '$\\ce{Zn + CuSO4 -> ZnSO4 + Cu}$'],
            ['Double displacement', '$\\ce{AgNO3 + NaCl -> AgCl + NaNO3}$'],
            ['Combustion', '$\\ce{CH4 + 2O2 -> CO2 + 2H2O}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is a real example of each. Sodium and chlorine combine into sodium chloride: a synthesis. Calcium carbonate breaks down into calcium oxide and carbon dioxide: a decomposition.', show: ['t.0', 't.1'] },
        { say: 'Zinc pushes copper out of copper two sulfate: a single displacement. And silver nitrate and sodium chloride swap partners: a double displacement.', caption: 'Zinc pushes copper out of copper(II) sulfate: a single displacement. And silver nitrate and sodium chloride swap partners: a double displacement.', show: ['t.2', 't.3'] },
        { say: 'The fifth type is combustion: a fuel burns in oxygen and gives out energy. Methane is a hydrocarbon, a compound of carbon and hydrogen only, so in plenty of oxygen it burns completely to carbon dioxide and water.', show: 't.4', focus: 't.4' },
        { say: 'Fuels that also contain oxygen, such as ethanol, burn to the same products.' },
      ],
    },
    {
      chapter: 'Name the type',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2Al + 3CuCl2 -> 2AlCl3 + 3Cu}', '\\text{element} + \\text{compound} \\rightarrow \\text{compound} + \\text{element}', '\\ce{2KClO3 -> 2KCl + 3O2}'] },
        { kind: 'callout', id: 'note', tone: 'tip', title: 'Burning a metal or hydrogen', md: '$\\ce{2Mg + O2 -> 2MgO}$ is a synthesis and also a burning, so it fits two types. The practice questions leave such reactions out.' },
      ],
      lines: [
        { say: 'What type of reaction is aluminium plus copper two chloride? Aluminium is an element and copper two chloride is a compound. The products are a compound and an element.', caption: 'What type of reaction is 2Al + 3CuCl₂ → 2AlCl₃ + 3Cu? Aluminium is an element and copper(II) chloride is a compound. The products are a compound and an element.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The aluminium has taken the place of the copper, so it is a single displacement.' },
        { say: 'Next, heating potassium chlorate. There is one reactant, and it forms two products, so it is a decomposition.', show: 'm.2', focus: 'm.2' },
        { say: 'Watch out for a metal or hydrogen burning in oxygen. Two elements make one compound, a synthesis, but it is also burning, so the practice questions leave these out.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What type of reaction is $\\ce{CaCl2 + Na2CO3 -> CaCO3 + 2NaCl}$?',
          choices: ['Double displacement', 'Single displacement', 'Synthesis', 'Decomposition'],
          answer: 0,
          working: 'Two compounds swap partners: calcium pairs with carbonate, and sodium with chloride.',
        },
      ],
      lines: [
        { say: 'Your turn. What type of reaction is calcium chloride plus sodium carbonate gives calcium carbonate plus sodium chloride? Pause the video and try it.', caption: 'Your turn. What type of reaction is CaCl₂ + Na₂CO₃ → CaCO₃ + 2NaCl? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, double displacement. Two compounds swap partners: calcium pairs with carbonate, and sodium with chloride. Choice B needs an element as a reactant, and there is none here.', show: 'q.answer' },
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
            '**Synthesis:** A + B → AB. **Decomposition:** AB → A + B.',
            '**Single displacement:** A + BC → AC + B.',
            '**Double displacement:** AB + CD → AD + CB.',
            '**Combustion:** a fuel burns in oxygen; a hydrocarbon makes carbon dioxide and water.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a synthesis, reactants combine into one product, and in a decomposition, one reactant breaks down.', show: 'sum.0' },
        { say: 'In a single displacement, an element takes the place of another in a compound.', show: 'sum.1' },
        { say: 'In a double displacement, two compounds swap partners.', show: 'sum.2' },
        { say: 'And in a combustion, a fuel burns in oxygen. In part two, you will predict the type from the reactants alone. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
