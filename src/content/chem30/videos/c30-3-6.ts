import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bath, ring, room, structure, tag, tube } from './lib/c30-3b-figures.ts';

// Ethanoic acid and ethanol, drawn so that the acid's OH group faces the alcohol's OH group: the
// OH of the acid and the H of the alcohol (in orange, ringed) leave as water.
const reactants = figure(
  'r',
  [
    structure({
      name: 'ac',
      unit: 1.3,
      atoms: { H1: ['H', -1, 0], Ca: ['C', 0, 0], H2: ['H', 0, 1], H3: ['H', 0, -1], Cb: ['C', 1, 0], Od: ['O', 1, 1], Os: ['O', 2, 0, 'opp'], Hs: ['H', 3, 0, 'opp'] },
      bonds: 'H1-Ca Ca-H2 Ca-H3 Ca-Cb Cb=Od Cb-Os Os-Hs',
    }),
    ring('ring1', [3.25, 0], 1.2, 0.55),
    tag('plus', [5.25, 0], '+'),
    structure({
      name: 'al',
      unit: 1.3,
      at: [6.6, 0],
      atoms: { Hx: ['H', 0, 0, 'opp'], O: ['O', 1, 0], C1: ['C', 2, 0], C2: ['C', 3, 0], H1: ['H', 2, 1], H2: ['H', 2, -1], H3: ['H', 3, 1], H4: ['H', 3, -1], H5: ['H', 4, 0] },
      bonds: 'Hx-O O-C1 C1-C2 C1-H1 C1-H2 C2-H3 C2-H4 C2-H5',
    }),
    ring('ring2', [6.6, 0], 0.55, 0.55),
    tag('acid', [1.3, -2.3], '\\text{ethanoic acid}', { tone: 'muted' }),
    tag('alcohol', [9.2, -2.3], '\\text{ethanol}', { tone: 'muted' }),
  ],
  360,
);

// Ethyl ethanoate and water: the acid part and the alcohol part are joined through an oxygen atom.
const ester = figure(
  'e',
  [
    structure({
      name: 'es',
      unit: 1.3,
      atoms: { H1: ['H', -1, 0], Ca: ['C', 0, 0], H2: ['H', 0, 1], H3: ['H', 0, -1], Cb: ['C', 1, 0], Od: ['O', 1, 1], Os: ['O', 2, 0], C1: ['C', 3, 0], C2: ['C', 4, 0], H4: ['H', 3, 1], H5: ['H', 3, -1], H6: ['H', 4, 1], H7: ['H', 4, -1], H8: ['H', 5, 0] },
      bonds: 'H1-Ca Ca-H2 Ca-H3 Ca-Cb Cb=Od Cb-Os Os-C1 C1-C2 C1-H4 C1-H5 C2-H6 C2-H7 C2-H8',
    }),
    tag('plus', [7.75, 0], '+'),
    structure({ name: 'w', unit: 1.3, at: [8.9, 0], atoms: { H1: ['H', 0, 0, 'opp'], O: ['O', 1, 0, 'opp'], H2: ['H', 2, 0, 'opp'] }, bonds: 'H1-O O-H2' }),
  ],
  300,
);

// A test tube of the acid, the alcohol and the catalyst, warmed in a water bath.
const lab = figure(
  'b',
  [
    bath('bath', [0, 0], { w: 5, h: 3.6, label: '\\text{warm water bath}' }),
    tube('t', [2.5, 0.4], { w: 1.2, h: 5.2, level: 2.4, tone: 'theta', shade: 0.35 }),
    tag('mix', [3.3, 4.9], '\\begin{gathered}\\text{acid + alcohol}\\\\ \\text{+ a few drops of}\\\\ \\text{conc. } \\ce{H2SO4}\\end{gathered}', { place: 'right', tone: 'theta' }),
    room('room', [0, 0], [8.4, 5.8]),
  ],
  520,
);

const video: Explainer = {
  id: 'c30-3-6',
  lessonId: 'c30-3-6',
  title: 'Esterification and Polymerisation, Part 1: Esterification',
  thumbnailTitle: 'Esterification',
  thumbnail: 'r',
  summary:
    'Esterification is the reaction of a carboxylic acid with an alcohol to form an ester and water. It is a condensation reaction: the OH of the acid and the H of the alcohol leave as water, and the two join through an oxygen atom. The reaction is slow and reversible, so concentrated sulfuric acid is added as a catalyst and the mixture is warmed in a water bath.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 1', title: 'Esterification', subtitle: 'An acid and an alcohol join' }],
      lines: [
        { say: 'The smell of a ripe banana, a pineapple or a pear comes from esters, small molecules that fruits make from acids and alcohols.', show: 'title' },
        { say: 'In this part, you will see how an acid and an alcohol join to make an ester. Then you will name esters, and build long chains called polymers, by addition and by condensation.' },
      ],
    },
    {
      chapter: 'Esterification',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Esterification', md: 'The reaction of a **carboxylic acid** with an **alcohol** to form an **ester** and **water**.' },
        { kind: 'callout', id: 'cond', tone: 'definition', title: 'Condensation reaction', md: 'Two molecules join, and a small molecule, usually water, is released.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{carboxylic acid + alcohol} \\ \\ce{<=>} \\ \\text{ester + water}'] },
      ],
      lines: [
        { say: 'Esterification is the reaction of a carboxylic acid with an alcohol, to form an ester and water.', show: ['def', 'm'] },
        { say: 'It is a condensation reaction. Two molecules join, and a small molecule, water, is released.', show: 'cond' },
        { say: 'Notice the double arrow. The reaction is reversible: the ester and water can react to give back the acid and the alcohol.', focus: 'm' },
      ],
    },
    {
      chapter: 'Which atoms leave',
      layout: 'center',
      main: [
        reactants,
        { kind: 'text', id: 't', size: 'md', md: 'The **OH** of the acid’s carboxyl group and the **H** of the alcohol’s OH group leave as water.' },
      ],
      lines: [
        { say: 'Let’s see which atoms leave. Here is ethanoic acid. Its carboxyl group has a carbon with a double-bonded oxygen, and an O H group.', caption: 'Let’s see which atoms leave. Here is ethanoic acid. Its carboxyl group has a carbon with a double-bonded oxygen, and an OH group.', show: ['r.ac', 'r.acid'] },
        { say: 'Here is ethanol, drawn the other way round, so its O H group faces the acid.', caption: 'Here is ethanol, drawn the other way round, so its OH group faces the acid.', show: ['r.plus', 'r.al', 'r.alcohol'] },
        { say: 'The O H of the acid, and the hydrogen atom of the alcohol’s O H group, leave together. That is H two O: a molecule of water.', caption: 'The OH of the acid, and the hydrogen atom of the alcohol’s OH group, leave together. That is H₂O: a molecule of water.', show: ['r.ring1', 'r.ring2', 't'], focus: ['r.ring1', 'r.ring2', 'r.ac-Os', 'r.ac-Hs', 'r.al-Hx'] },
      ],
    },
    {
      chapter: 'The ester',
      layout: 'center',
      main: [
        ester,
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3-COOH + CH3-CH2-OH}', '\\ce{<=>[H2SO4] CH3-COO-CH2-CH3 + H2O}', '\\text{ethyl ethanoate}'] },
      ],
      lines: [
        { say: 'The acid and the alcohol join through an oxygen atom. The carbon of the acid’s carboxyl group bonds to the oxygen atom of the alcohol.', show: 'e.es', focus: ['e.es-Cb-Os', 'e.es-Os'] },
        { say: 'Water is the other product.', show: ['e.plus', 'e.w'] },
        { say: 'Here is the equation, with the condensed formulas. The ester link is C O O, in the middle of the ester. This ester is called ethyl etha-no-ate.', caption: 'Here is the equation, with the condensed formulas. The ester link is COO, in the middle of the ester. This ester is called ethyl ethanoate.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'In the laboratory',
      layout: 'split',
      leftWidth: 560,
      left: [lab],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            'Warm the acid, the alcohol and a few drops of **concentrated sulfuric acid** (the catalyst) in a water bath.',
            'Pour the mixture into **sodium hydrogen carbonate** solution, which neutralises the leftover acid.',
            'Waft the air above it gently towards your nose: a fruity smell.',
          ],
        },
      ],
      lines: [
        { say: 'Esterification is slow and reversible, so a few drops of concentrated sulfuric acid are added as a catalyst.', show: ['b.t', 'b.mix'] },
        { say: 'In the laboratory, the acid, the alcohol and the catalyst are warmed together in a water bath.', show: ['b.bath', 's.0'] },
        { say: 'The mixture is then poured into sodium hydrogen carbonate solution, which neutralises the leftover acid.', show: 's.1' },
        { say: 'Then the fruity smell of the ester can be noticed, by gently wafting the air above it towards the nose.', show: 's.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Propanoic acid, $\\ce{C3H6O2}$, reacts with ethanol, $\\ce{C2H6O}$, to form an ester and water. What is the molecular formula of the ester?',
          choices: ['$\\ce{C5H12O3}$', '$\\ce{C5H10O3}$', '$\\ce{C5H10O2}$', '$\\ce{C5H8O2}$'],
          answer: 2,
          working: 'The ester is the acid and the alcohol joined, less one water: $\\ce{C3H6O2} + \\ce{C2H6O} = \\ce{C5H12O3}$, and taking away $\\ce{H2O}$ leaves $\\ce{C5H10O2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Propanoic acid reacts with ethanol to form an ester and water. What is the molecular formula of the ester? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: C five H ten O two. The acid and the alcohol together have five carbons, twelve hydrogens and three oxygens, and one water molecule leaves. Choice A forgets the water.', caption: 'The answer is C: C₅H₁₀O₂. The acid and the alcohol together have five carbons, twelve hydrogens and three oxygens, and one water molecule leaves. Choice A forgets the water.', show: 'q.answer' },
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
            '**Esterification**: carboxylic acid + alcohol ⇌ ester + water.',
            'It is a **condensation reaction**: two molecules join and water is released.',
            'The OH of the acid and the H of the alcohol leave; the two join through an oxygen atom.',
            'Slow and reversible: concentrated sulfuric acid is the catalyst, warmed in a water bath.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In esterification, a carboxylic acid and an alcohol form an ester and water.', show: 'sum.0' },
        { say: 'It is a condensation reaction: two molecules join, and water is released.', show: 'sum.1' },
        { say: 'The O H of the acid and the H of the alcohol leave, and the two parts join through an oxygen atom.', caption: 'The OH of the acid and the H of the alcohol leave, and the two parts join through an oxygen atom.', show: 'sum.2' },
        { say: 'The reaction is slow and reversible, so concentrated sulfuric acid is used as a catalyst. In part two, you will name esters. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
