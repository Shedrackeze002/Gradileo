import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, card, tag } from './lib/c10-3-figures.ts';

// Each part of the formula KBr becomes a word of its name: potassium, then bromide.
const builder = figure(
  'nm',
  [
    tag('k', [0, 2.6], '\\Large\\ce{K}'),
    tag('br', [4.4, 2.6], '\\Large\\ce{Br}'),
    arrow('k-down', [0, 2.1], [0, 0.75], { tone: 'opp' }),
    arrow('br-down', [4.4, 2.1], [4.4, 0.75], { tone: 'adj' }),
    card('pos', [0, 0.1], 3.4, 1.1, '\\text{potassium}', 'opp'),
    card('neg', [4.4, 0.1], 3.4, 1.1, '\\text{bromide}', 'adj'),
    tag('pos-note', [0, -1.15], '\\text{keeps its name}', { tone: 'muted' }),
    tag('neg-note', [4.4, -1.15], '\\text{ends in -ide}', { tone: 'muted' }),
  ],
  420,
);

const video: Explainer = {
  id: 'c10-3-2-c',
  lessonId: 'c10-3-2',
  title: 'Ionic Compounds: Names and Formulas, Part 3: Naming Ionic Compounds',
  thumbnailTitle: 'Naming Ionic Compounds',
  thumbnail: 'nm',
  summary:
    'An ionic compound is named with the positive ion first, then the negative ion: the metal keeps its name and the non-metal ion ends in -ide (fluoride, chloride, bromide, iodide, oxide, sulfide, nitride, phosphide). KBr is potassium bromide and AlCl3 is aluminium chloride. Ionic names never count the ions: MgCl2 is magnesium chloride, not magnesium dichloride.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Bonding, Names and Formulas · Part 3', title: 'Naming Ionic Compounds', subtitle: 'The metal, then the -ide' }],
      lines: [
        { say: 'Potassium bromide, calcium sulfide, lithium nitride. The names of ionic compounds all follow one simple pattern.', show: 'title' },
        { say: 'In this part, you will name an ionic compound from its formula, and see why the name never counts the ions.' },
      ],
    },
    {
      chapter: 'The metal, then the non-metal',
      layout: 'split',
      leftWidth: 560,
      left: [builder],
      right: [{ kind: 'callout', id: 'rule', tone: 'key', title: 'Naming an ionic compound', md: 'Name the **positive ion** first, then the **negative ion**. The metal keeps its own name; the non-metal ion ends in **-ide**.' }],
      lines: [
        { say: 'The name of an ionic compound is the name of the positive ion, then the name of the negative ion.', show: 'rule' },
        { say: 'Take K B R. The metal keeps its own name: K is potassium.', caption: 'Take KBr. The metal keeps its own name: K is potassium.', show: ['nm.k', 'nm.br', 'nm.k-down', 'nm.pos', 'nm.pos-note'], focus: 'nm.pos' },
        { say: 'The non-metal changes its ending, just like its ion: bromine becomes bromide. So K B R is potassium bromide.', caption: 'The non-metal changes its ending, just like its ion: bromine becomes bromide. So KBr is potassium bromide.', show: ['nm.br-down', 'nm.neg', 'nm.neg-note'], focus: 'nm.neg' },
      ],
    },
    {
      chapter: 'The non-metal ions',
      layout: 'split',
      left: [
        {
          kind: 'table',
          id: 'a',
          head: ['Element', 'Ion'],
          rows: [
            ['fluorine', 'fluoride $\\ce{F-}$'],
            ['chlorine', 'chloride $\\ce{Cl-}$'],
            ['bromine', 'bromide $\\ce{Br-}$'],
            ['iodine', 'iodide $\\ce{I-}$'],
          ],
        },
      ],
      right: [
        {
          kind: 'table',
          id: 'b',
          head: ['Element', 'Ion'],
          rows: [
            ['oxygen', 'oxide $\\ce{O^2-}$'],
            ['sulfur', 'sulfide $\\ce{S^2-}$'],
            ['nitrogen', 'nitride $\\ce{N^3-}$'],
            ['phosphorus', 'phosphide $\\ce{P^3-}$'],
          ],
        },
        { kind: 'text', id: 'ex', size: 'md', md: '$\\ce{CaS}$ is calcium sulfide; $\\ce{Li3N}$ is lithium nitride.' },
      ],
      lines: [
        { say: 'Here are the non-metal ions you will meet. Fluorine becomes fluoride, chlorine becomes chloride, bromine becomes bromide, and iodine becomes iodide.', show: 'a' },
        { say: 'Oxygen becomes oxide, sulfur becomes sulfide, nitrogen becomes nitride, and phosphorus becomes phosphide.', show: 'b' },
        { say: 'So C A S is calcium sulfide, and L I three N is lithium nitride.', caption: 'So CaS is calcium sulfide, and Li₃N is lithium nitride.', show: 'ex' },
        { say: 'Some countries spell sulfur and sulfide with p h in place of the f. Both spellings are accepted.', caption: 'Some countries spell them sulphur and sulphide. Both spellings are accepted.' },
      ],
    },
    {
      chapter: 'Naming from a formula',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\ce{Na2O}\\text{: sodium and oxygen}', '\\Rightarrow\\ \\text{sodium oxide}', '\\ce{AlCl3}\\text{: aluminium and chlorine}', '\\Rightarrow\\ \\text{aluminium chloride}'],
        },
      ],
      lines: [
        { say: 'Let’s name two compounds. In N A two O, the metal is sodium, and the non-metal is oxygen.', caption: 'Let’s name two compounds. In Na₂O, the metal is sodium, and the non-metal is oxygen.', show: 'm.0', focus: 'm.0' },
        { say: 'Sodium keeps its name, and oxygen becomes oxide: sodium oxide.', show: 'm.1', focus: 'm.1' },
        { say: 'In A L C L three, the metal is aluminium, and the non-metal is chlorine.', caption: 'In AlCl₃, the metal is aluminium, and the non-metal is chlorine.', show: 'm.2', focus: 'm.2' },
        { say: 'Chlorine becomes chloride, so the name is aluminium chloride.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'No counting words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'No counting words in ionic names', md: 'The subscripts are fixed by the charges, so the name never counts the ions.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{MgCl2}\\text{: magnesium chloride, } \\bad{\\text{not magnesium dichloride}}', '\\ce{Al2O3}\\text{: aluminium oxide, } \\bad{\\text{not dialuminium trioxide}}'] },
      ],
      lines: [
        { say: 'Notice that neither name counted the ions. The subscripts in an ionic formula are fixed by the charges, so the name never needs to count them.', show: 'oops' },
        { say: 'M G C L two is magnesium chloride, not magnesium dye-chloride.', caption: 'MgCl₂ is magnesium chloride, not magnesium dichloride.', show: 'm.0', focus: 'm.0' },
        { say: 'And A L two O three is aluminium oxide, not dye-aluminium trioxide.', caption: 'And Al₂O₃ is aluminium oxide, not dialuminium trioxide.', show: 'm.1', focus: 'm.1' },
        { say: 'Counting prefixes, like dye for two and tri for three, belong to compounds of non-metals only. You will meet them in the next lesson.', caption: 'Counting prefixes, like di for two and tri for three, belong to compounds of non-metals only. You will meet them in the next lesson.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Name the compound $\\ce{CaBr2}$.',
          choices: ['calcium bromide', 'calcium dibromide', 'calcium bromine', 'dicalcium bromide'],
          answer: 0,
          working: 'The metal is calcium, and bromine becomes bromide. The subscript only makes the charges cancel, so it is not part of the name.',
        },
      ],
      lines: [
        { say: 'Your turn. Name the compound C A B R two. Pause the video and try it.', caption: 'Your turn. Name the compound CaBr₂. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, calcium bromide. The metal keeps its name, and bromine becomes bromide. Choice B adds a counting word, but ionic names never count the ions.', show: 'q.answer' },
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
            'Name the positive ion first, then the negative ion.',
            'The metal keeps its name; the non-metal ion ends in **-ide**: $\\ce{KBr}$ is potassium bromide.',
            'fluoride, chloride, bromide, iodide, oxide, sulfide, nitride, phosphide.',
            'Ionic names never count the ions: $\\ce{MgCl2}$ is magnesium chloride.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Name the positive ion first, then the negative ion.', show: 'sum.0' },
        { say: 'The metal keeps its name, and the non-metal changes its ending: potassium bromide.', show: 'sum.1' },
        { say: 'Fluoride, chloride, bromide, iodide, oxide, sulfide, nitride and phosphide.', show: 'sum.2' },
        { say: 'And ionic names never count the ions. In part four, you will meet ions made of several atoms. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
