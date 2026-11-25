import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import drawn from '@/content/chem30/videos/c30-3-1.ts';
import formulas from '@/content/chem30/videos/c30-3-1-d.ts';
import { grouped, rowStructure, tag } from '@/content/chem30/videos/lib/c30-3a-figures.ts';

// Exam question for Chemistry 30 lesson 3.1 (organic compounds and how they are drawn): the formula
// and Lewis structure of a five-carbon alkane, alkene and alkyne. The question is OpenStax
// Chemistry 2e's own, word for word (end-of-chapter exercise 1, section 20.1, CC BY-NC-SA 4.0). The
// answer, which matches the book's: C5H12 (pentane), C5H10 (such as 1-pentene) and C5H8 (such as
// 1-pentyne); each extra bond between two carbons takes the place of two hydrogen atoms.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts): the lesson's six carbon atoms
// joining into a chain, and an alkane chain growing one CH2 at a time; and the three structural
// formulas, every bond drawn (src/video/solids.ts).

const QUESTION = 'Write the chemical formula and Lewis structure of the following, each of which contains five carbon atoms: (a) an alkane (b) an alkene (c) an alkyne';

const CH2 = { symbol: 'C', up: 'H', down: 'H' } as const;
const alkane = figure('a', [grouped(rowStructure({ name: 'p', atoms: [CH2, CH2, CH2, CH2, CH2], left: 'H', right: 'H' }), 'pentane'), tag('a-name', [3.2, -2.7], '\\text{pentane, } \\ce{C5H12}', { tone: 'good' })], 330);
const alkene = figure('b', [grouped(rowStructure({ name: 'p', atoms: [CH2, { symbol: 'C', up: 'H' }, CH2, CH2, CH2], bonds: [2, 1, 1, 1], right: 'H' }), 'pentene'), tag('b-name', [3.2, -2.7], '\\text{1-pentene, } \\ce{C5H10}', { tone: 'good' })], 330);
const alkyne = figure('c', [grouped(rowStructure({ name: 'p', atoms: [{ symbol: 'C' }, { symbol: 'C' }, CH2, CH2, CH2], bonds: [3, 1, 1, 1], left: 'H', right: 'H' }), 'pentyne'), tag('c-name', [3.2, -2.7], '\\text{1-pentyne, } \\ce{C5H8}', { tone: 'good' })], 330);

const video: Explainer = {
  id: 'xq-c30-3-1',
  lessonId: '',
  exam: {
    lesson: 'c30-3-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 1, section 20.1, Hydrocarbons',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/20-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Five Carbons, Three Families. Organic Compounds and How They Are Drawn',
  thumbnailTitle: 'Five Carbons, Three Families',
  thumbnail: 'gc',
  summary:
    'A real test question, solved one small step at a time: write the formula and Lewis structure of a five-carbon alkane, alkene and alkyne. We use the four bonds of every carbon atom to draw pentane, C₅H₁₂, then see that a double bond costs two hydrogen atoms (1-pentene, C₅H₁₀) and a triple bond four (1-pentyne, C₅H₈).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Five Carbons, Three Families', subtitle: 'Formulas and Lewis structures of an alkane, an alkene and an alkyne' }],
      lines: [
        { say: 'In this video, we solve a real test question about organic compounds and how they are drawn. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'C₅H₁₂, C₅H₁₀ and C₅H₈' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Write the chemical formula and Lewis structure of the following, each of which contains five carbon atoms: part a, an alkane; part b, an alkene; part c, an alkyne.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Same **five carbons**, but **single**, **double** or **triple** bonds between them. How many **hydrogens** fit?' }],
      lines: [
        { say: 'All three have a chain of five carbon atoms. The difference is the bonds between the carbons: all single, one double, or one triple. We need to draw every bond and count the hydrogen atoms that fit.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(drawn, 'cr'), { kind: 'math', id: 'k', size: 'md', lines: ['\\text{every carbon makes } \\textbf{4} \\text{ bonds} \\qquad \\text{every hydrogen makes } \\textbf{1}'] }],
      lines: [
        { say: 'Here is what we need. Six carbon atoms.', show: 'cr' },
        { say: 'Carbon atoms bond to each other, one after another, to make a chain.', play: 'cr.chain' },
        { say: 'Every carbon atom makes four bonds in all, and every hydrogen atom makes one. Whatever bonds a carbon does not use on other carbons, it uses on hydrogens.', show: 'k.0' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Draw five carbons in a row with **single** bonds, and fill with H', 'Make **one** bond **double**, and fill with H', 'Make **one** bond **triple**, and fill with H'] }],
      lines: [
        { say: 'Here is the plan. First, draw five carbons in a row joined by single bonds, and give every carbon hydrogens until it has four bonds.', show: 'plan.0' },
        { say: 'Then make one of the carbon to carbon bonds double, and fill with hydrogens again.', show: 'plan.1' },
        { say: 'Then make one bond triple, and fill again.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The alkane',
      layout: 'center',
      main: [pick(formulas, 'gc'), { kind: 'math', id: 'n', size: 'md', lines: ['\\ce{C_nH_{2n+2}}: \\ n = 5 \\Rightarrow \\good{\\ce{C5H12}}'] }],
      lines: [
        { say: 'Step one. An alkane has only single bonds. Watch a chain grow from methane: each new carbon brings two more hydrogens.', show: 'gc', play: 'gc.grow' },
        { say: 'So an alkane is C n H two n plus two. With five carbons, that is C five H twelve.', show: 'n.0', focus: 'n.0', caption: 'So an alkane is CₙH₂ₙ₊₂. With five carbons, that is C₅H₁₂.' },
      ],
    },
    {
      chapter: 'Step 1: Pentane, bond by bond',
      layout: 'center',
      main: [alkane],
      lines: [
        { say: 'Here is its Lewis structure, pentane, with every bond drawn. The three middle carbons each have two hydrogens, and the two end carbons each have three. Every carbon has four bonds.', show: ['a.pentane', 'a.a-name'] },
      ],
    },
    {
      chapter: 'Step 2: The alkene',
      layout: 'center',
      main: [alkene, { kind: 'math', id: 'e', size: 'md', lines: ['\\ce{C5H12} - 2\\ce{H} = \\good{\\ce{C5H10}}'] }],
      lines: [
        { say: 'Step two. Make the first carbon to carbon bond double. Those two carbons now spend an extra bond on each other, so each one has room for one fewer hydrogen.', show: 'b.pentene' },
        { say: 'Two hydrogens fewer: C five H ten. This one is one pentene.', show: ['b.b-name', 'e.0'], focus: 'e.0', caption: 'Two hydrogens fewer: C₅H₁₀. This one is 1-pentene.' },
      ],
    },
    {
      chapter: 'Step 3: The alkyne',
      layout: 'center',
      main: [alkyne, { kind: 'math', id: 'y', size: 'md', lines: ['\\ce{C5H12} - 4\\ce{H} = \\good{\\ce{C5H8}}'] }],
      lines: [
        { say: 'Step three. Make that bond triple. The two carbons now share three bonds, so each of them has room for only one more: the first carbon keeps one hydrogen, and the second keeps none.', show: 'c.pentyne' },
        { say: 'Four hydrogens fewer than the alkane: C five H eight. This one is one pentyne.', show: ['c.c-name', 'y.0'], focus: 'y.0', caption: 'Four hydrogens fewer than the alkane: C₅H₈. This one is 1-pentyne.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\ce{C_nH_{2n+2}} \\qquad \\ce{C_nH_{2n}} \\qquad \\ce{C_nH_{2n-2}}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) $\\ce{C5H12}$, pentane. (b) $\\ce{C5H10}$, such as 1-pentene. (c) $\\ce{C5H8}$, such as 1-pentyne.' },
      ],
      lines: [
        { say: 'Does it make sense? The formulas follow the general patterns: alkanes are C n H two n plus two, alkenes C n H two n, and alkynes C n H two n minus two.', show: 'x.0', caption: 'Does it make sense? The formulas follow the general patterns: alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ and alkynes CₙH₂ₙ₋₂.' },
        { say: 'So the alkane is C five H twelve, the alkene C five H ten, and the alkyne C five H eight. The double or triple bond could sit in the middle of the chain too, with the same formula. That matches the book.', show: 'ans', caption: 'So the alkane is C₅H₁₂, the alkene C₅H₁₀ and the alkyne C₅H₈. The double or triple bond could sit in the middle of the chain too, with the same formula. That matches the book.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['Alkyne $\\ce{C5H10}$', 'Took away only **two** H for the triple bond; it takes **four**'],
            ['Alkene $\\ce{C5H12}$', 'Kept every H, giving a carbon **five** bonds'],
            ['Alkane $\\ce{C5H10}$', 'Gave the **end** carbons two H, like the middle ones'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'An alkyne of C five H ten takes away only two hydrogens. A triple bond is two extra bonds, so it costs four.', focus: 'traps.0', caption: 'An alkyne of C₅H₁₀ takes away only two hydrogens. A triple bond is two extra bonds, so it costs four.' },
        { say: 'An alkene of C five H twelve keeps all the hydrogens, so the carbons of the double bond would have five bonds. Carbon only makes four.', focus: 'traps.1', caption: 'An alkene of C₅H₁₂ keeps all the hydrogens, so the carbons of the double bond would have five bonds. Carbon only makes four.' },
        { say: 'And an alkane of C five H ten forgets that the end carbons have only one carbon neighbour, so they each carry three hydrogens.', focus: 'traps.2', caption: 'And an alkane of C₅H₁₀ forgets that the end carbons have only one carbon neighbour, so they each carry three hydrogens.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which formula is an **alkyne** with **six** carbon atoms?',
          choices: ['$\\ce{C6H10}$', '$\\ce{C6H12}$', '$\\ce{C6H14}$', '$\\ce{C6H6}$'],
          answer: 0,
          working: 'An alkyne is $\\ce{C_nH_{2n-2}}$: $2(6) - 2 = 10$, so $\\ce{C6H10}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which formula is an alkyne with six carbon atoms? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'An alkyne is C n H two n minus two. Two times six minus two is ten, so it is C six H ten: choice A.', show: 'q2.answer', caption: 'An alkyne is CₙH₂ₙ₋₂. 2 × 6 − 2 = 10, so it is C₆H₁₀: choice A.' },
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
          items: ['Every carbon makes **4** bonds; fill the rest with **H**', 'Alkane $\\ce{C_nH_{2n+2}}$, alkene $\\ce{C_nH_{2n}}$, alkyne $\\ce{C_nH_{2n-2}}$', 'Each extra carbon–carbon bond costs **two** H'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Every carbon atom makes four bonds, and hydrogens fill whatever the carbons do not use on each other.', show: 'sum.0' },
        { say: 'Alkanes are C n H two n plus two, alkenes C n H two n, and alkynes C n H two n minus two.', show: 'sum.1', caption: 'Alkanes are CₙH₂ₙ₊₂, alkenes CₙH₂ₙ and alkynes CₙH₂ₙ₋₂.' },
        { say: 'Each extra bond between two carbons costs two hydrogens. For more on organic compounds and how they are drawn, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
