import type { Explainer } from '@/video/script.ts';
import type { DiagramTone } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gives, mol, plus, room, row, star, water } from './lib/c20-4a-figures.ts';

// The five patterns as balls: each letter is an element, and touching balls are a compound. The
// last row is a real fuel, methane, burning.
const TONE: Record<string, DiagramTone> = { A: 'opp', B: 'adj', C: 'good', D: 'hyp' };
const L = (id: string, letters: string[]) => mol(id, letters, { tones: letters.map((l) => TONE[l]) });
const rows = [
  row({ y: 0, title: { id: 'f-t', tex: '\\text{Formation}' }, terms: [L('f-a', ['A']), plus('f-p'), L('f-b', ['B']), gives('f-arr'), L('f-ab', ['A', 'B'])] }),
  row({ y: -1.9, title: { id: 'd-t', tex: '\\text{Simple decomposition}' }, terms: [L('d-ab', ['A', 'B']), gives('d-arr'), L('d-a', ['A']), plus('d-p'), L('d-b', ['B'])] }),
  row({ y: -3.8, title: { id: 's-t', tex: '\\text{Single replacement}' }, terms: [L('s-a', ['A']), plus('s-p1'), L('s-bc', ['B', 'C']), gives('s-arr'), L('s-ac', ['A', 'C']), plus('s-p2'), L('s-b', ['B'])] }),
  row({ y: -5.7, title: { id: 'r-t', tex: '\\text{Double replacement}' }, terms: [L('r-ab', ['A', 'B']), plus('r-p1'), L('r-cd', ['C', 'D']), gives('r-arr'), L('r-ad', ['A', 'D']), plus('r-p2'), L('r-cb', ['C', 'B'])] }),
  row({ y: -7.9, title: { id: 'c-t', tex: '\\text{Complete combustion}' }, terms: [star('c-fuel', 'C', ['H', 'H', 'H', 'H']), plus('c-p1'), mol('c-o2', ['O', 'O']), gives('c-arr'), mol('c-co2', ['O', 'C', 'O']), plus('c-p2'), water('c-h2o')] }),
];
const patterns = figure('pat', [room('pad', [-7.2, 0], [-7.2, -7.9]), ...rows], 580);
/** Every part of a row (each molecule's group, each plus sign, the arrow and the title), to show it all at once. */
const rowParts = (k: number) => [...new Set(rows[k].items.map((i) => `pat.${i.group ?? i.id}`))];

const video: Explainer = {
  id: 'c20-4-1-d',
  lessonId: 'c20-4-1',
  title: 'Balancing Equations and Types of Reactions, Part 4: Five Types of Reactions',
  thumbnailTitle: 'Five Types of Reactions',
  thumbnail: 'pat',
  summary:
    'Formation: element + element → compound. Simple decomposition: compound → elements. Single replacement: element + compound → element + compound. Double replacement: two compounds swap ions. Complete combustion: a hydrocarbon, alcohol or sugar burns in oxygen to carbon dioxide and water. The reactants alone decide the type, and a fuel with oxygen is a combustion, not a single replacement.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'Five Types of Reactions', subtitle: 'Spot the pattern from the reactants' }],
      lines: [
        { say: 'Many reactions follow one of a few patterns. Recognise the pattern, and you know what to expect before you balance anything.', show: 'title' },
        { say: 'In this last part, you will sort reactions into five types, and predict the type from the reactants alone.' },
      ],
    },
    {
      chapter: 'Element or compound?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Element or compound?', md: 'An **element**’s formula has one symbol: $\\ce{Na}$, $\\ce{O2}$, $\\ce{P4}$. A **compound**’s formula has two or more: $\\ce{NaCl}$, $\\ce{H2O}$, $\\ce{CH4}$.' },
      ],
      lines: [
        { say: 'First, sort every reactant and product. An element’s formula has one symbol, even with a subscript, like sodium, O two, or P four.', caption: 'First, sort every reactant and product. An element’s formula has one symbol, even with a subscript, like Na, O₂ or P₄.', show: 'tip' },
        { say: 'A compound’s formula has two or more symbols, like sodium chloride, water or methane. Then match the pattern.' },
      ],
    },
    {
      chapter: 'Five patterns',
      layout: 'center',
      main: [patterns],
      lines: [
        { say: 'In a formation, elements combine to make one compound. Sodium and chlorine form sodium chloride.', caption: 'In a formation, elements combine to make one compound: 2Na + Cl₂ → 2NaCl.', show: rowParts(0) },
        { say: 'A simple decomposition is the reverse: a compound breaks down into its elements, usually when heated, or when electricity passes through it. Water splits into hydrogen and oxygen.', caption: 'A simple decomposition is the reverse: a compound breaks down into its elements, usually when heated, or when electricity passes through it: 2H₂O → 2H₂ + O₂.', show: rowParts(1) },
        { say: 'In a single replacement, an element takes the place of a similar element in a compound. Zinc replaces copper in copper two sulfate, and chlorine replaces bromine in sodium bromide.', caption: 'In a single replacement, an element takes the place of a similar element in a compound: Zn + CuSO₄ → ZnSO₄ + Cu, and Cl₂ + 2NaBr → 2NaCl + Br₂.', show: rowParts(2) },
        { say: 'In a double replacement, two compounds, usually in solution, swap ions. It is the kind of reaction that forms a precipitate, and a neutralisation is one as well.', caption: 'In a double replacement, two compounds, usually in solution, swap ions: AgNO₃ + NaCl → AgCl + NaNO₃. It is the kind of reaction that forms a precipitate, and a neutralisation is one as well.', show: rowParts(3) },
        { say: 'In a complete combustion, a fuel burns in plenty of oxygen to form only carbon dye-oxide and water. The fuel is a hydrocarbon, such as methane, an alcohol, or a sugar.', caption: 'In a complete combustion, a fuel burns in plenty of oxygen to form only carbon dioxide and water: CH₄ + 2O₂ → CO₂ + 2H₂O. The fuel is a hydrocarbon, such as methane, an alcohol, or a sugar.', show: rowParts(4) },
      ],
    },
    {
      chapter: 'Name the type',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{2Al + 3CuCl2 -> 2AlCl3 + 3Cu}',
            '\\text{element + compound: } \\good{\\text{single replacement}}',
            '\\ce{2HgO -> 2Hg + O2}',
            '\\text{one compound: } \\good{\\text{simple decomposition}}',
          ],
        },
      ],
      lines: [
        { say: 'What type of reaction is this? Aluminium reacts with copper two chloride to form aluminium chloride and copper.', caption: 'What type of reaction is 2Al + 3CuCl₂ → 2AlCl₃ + 3Cu?', show: 'm.0' },
        { say: 'An element and a compound give a compound and an element: aluminium has taken the place of copper. It is a single replacement.', show: 'm.1', focus: 'm.1' },
        { say: 'Now heat mercury two oxide, and it breaks down into mercury and oxygen. One compound reacts, and both products are elements. It is a simple decomposition.', caption: 'Now heat mercury(II) oxide: 2HgO → 2Hg + O₂. One compound reacts, and both products are elements. It is a simple decomposition.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Predict from the reactants',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**One compound**: simple decomposition.',
            '**Two elements**: formation.',
            '**A hydrocarbon, alcohol or sugar with** $\\ce{O2}$: complete combustion.',
            '**An element and a compound**, not a fuel with oxygen: single replacement.',
            '**Two compounds**: double replacement.',
          ],
        },
      ],
      lines: [
        { say: 'You do not even need the products: the reactants alone decide the type. One compound alone is a simple decomposition. Two elements make a formation.', show: ['b.0', 'b.1'] },
        { say: 'A hydrocarbon, an alcohol or a sugar with oxygen is a complete combustion.', show: 'b.2', focus: 'b.2' },
        { say: 'Any other element with a compound is a single replacement, and two compounds make a double replacement.', show: ['b.3', 'b.4'] },
        { say: 'Watch out: pentane and oxygen look like an element and a compound, but nothing is replaced. The pentane burns to carbon dye-oxide and water. So look for a fuel with oxygen first.', caption: 'Watch out: pentane, C₅H₁₂, and oxygen look like an element and a compound, but nothing is replaced. The pentane burns to carbon dioxide and water. So look for a fuel with oxygen first.', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A reaction has the reactants $\\ce{C2H5OH}$ and $\\ce{O2}$. Before you see the products, what type of reaction is it?',
          choices: ['Single replacement', 'Formation', 'Complete combustion', 'Double replacement'],
          answer: 2,
          working: '$\\ce{C2H5OH}$ is ethanol, an alcohol, and it reacts with oxygen, so it burns: $\\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A reaction has the reactants ethanol and oxygen. Before you see the products, what type of reaction is it? Pause the video and try it.', caption: 'Your turn. A reaction has the reactants ethanol, C₂H₅OH, and oxygen, O₂. Before you see the products, what type of reaction is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, complete combustion. Ethanol is an alcohol, a fuel, and it burns in oxygen to carbon dye-oxide and water. Choice A is the trap: oxygen is an element and ethanol a compound, but nothing is replaced.', caption: 'The answer is C, complete combustion. Ethanol is an alcohol, a fuel, and it burns in oxygen to carbon dioxide and water. Choice A is the trap: oxygen is an element and ethanol a compound, but nothing is replaced.', show: 'q.answer' },
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
            '**Formation**: element + element → compound. **Simple decomposition**: compound → elements.',
            '**Single replacement**: element + compound. **Double replacement**: two compounds swap ions.',
            '**Complete combustion**: a hydrocarbon, alcohol or sugar burns in oxygen to $\\ce{CO2}$ and $\\ce{H2O}$.',
            'The reactants alone decide the type; a fuel with oxygen is a combustion.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a formation, elements make a compound. In a simple decomposition, a compound breaks into its elements.', show: 'sum.0' },
        { say: 'In a single replacement, an element replaces another in a compound, and in a double replacement, two compounds swap ions.', show: 'sum.1' },
        { say: 'In a complete combustion, a hydrocarbon, alcohol or sugar burns in oxygen to carbon dye-oxide and water.', caption: 'In a complete combustion, a hydrocarbon, alcohol or sugar burns in oxygen to carbon dioxide and water.', show: 'sum.2' },
        { say: 'And the reactants alone decide the type. That completes this lesson. Next, you will write net ionic equations, which show only the ions that react.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
