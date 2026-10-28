import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { block, structure, tag } from './lib/c30-3b-figures.ts';

// A diol (blue box with an OH group at each end) and a dicarboxylic acid (orange box with a COOH
// group at each end) link into a polyester: each link is an ester link (green), and water is
// released at every link. Empty symbols are the points where a bond meets a box.
const polyester = figure(
  'f',
  [
    structure({ name: 'md', unit: 1, at: [0, 2.8], atoms: { L: ['HO', 0, 0], a: ['', 1.0, 0], b: ['', 2.0, 0], R: ['OH', 3.0, 0] }, bonds: 'L-a b-R' }),
    block('d', [1.5, 2.8], { w: 1.0, h: 0.6, tone: 'adj' }),
    tag('plus', [4.0, 2.8], '+'),
    structure({ name: 'ma', unit: 1, at: [5.4, 2.8], atoms: { L: ['HOOC', 0, 0], a: ['', 1.5, 0], b: ['', 2.5, 0], R: ['COOH', 4.0, 0] }, bonds: 'L-a b-R' }),
    block('a', [7.4, 2.8], { w: 1.0, h: 0.6, tone: 'opp' }),
    structure({ name: 'c0', unit: 1, atoms: { L: ['', -0.7, 0], O: ['O', 0, 0], a: ['', 0.8, 0] }, bonds: 'L-O O-a' }),
    block('c1', [1.3, 0], { w: 1.0, h: 0.6, tone: 'adj' }),
    structure({ name: 'link1', unit: 1, tone: 'good', atoms: { a: ['', 1.8, 0], O: ['O', 2.55, 0], C: ['C', 3.35, 0], Od: ['O', 3.35, 0.9], b: ['', 4.1, 0] }, bonds: 'a-O O-C C=Od C-b' }),
    block('c2', [4.6, 0], { w: 1.0, h: 0.6, tone: 'opp' }),
    structure({ name: 'link2', unit: 1, tone: 'good', atoms: { a: ['', 5.1, 0], C: ['C', 5.85, 0], Od: ['O', 5.85, 0.9], O: ['O', 6.65, 0], b: ['', 7.4, 0] }, bonds: 'a-C C=Od C-O O-b' }),
    block('c3', [7.9, 0], { w: 1.0, h: 0.6, tone: 'adj' }),
    structure({ name: 'c4', unit: 1, atoms: { a: ['', 8.4, 0], O: ['O', 9.2, 0], R: ['', 9.9, 0] }, bonds: 'a-O O-R' }),
    tag('w1', [2.95, -0.9], '+\\,\\ce{H2O}', { tone: 'theta' }),
    tag('w2', [6.25, -0.9], '+\\,\\ce{H2O}', { tone: 'theta' }),
  ],
  330,
);

const video: Explainer = {
  id: 'c30-3-6-d',
  lessonId: 'c30-3-6',
  title: 'Esterification and Polymerisation, Part 4: Condensation Polymers',
  thumbnailTitle: 'Condensation Polymers',
  thumbnail: 'f',
  summary:
    'A condensation polymer forms when monomers with two reacting groups join by condensation reactions, releasing water at every link: a diol and a dicarboxylic acid make a polyester, and a diamine and a dicarboxylic acid make a polyamide such as nylon. Breaking each link and adding back water gives the monomers. An addition polymer loses no atoms, so a chain’s molar mass divided by the monomer’s gives the number of units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 4', title: 'Condensation Polymers', subtitle: 'Linking with water released' }],
      lines: [
        { say: 'The polyester in a shirt is a chain of acid and alcohol molecules, joined by ester links.', show: 'title' },
        { say: 'In this part, you will see how monomers with two reacting groups link into chains, and find the monomers of such a polymer.' },
      ],
    },
    {
      chapter: 'Two reacting groups',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Condensation polymer', md: 'Monomers with **two reacting groups** each join by a condensation reaction, releasing a small molecule, usually **water**, at every link.' },
        polyester,
      ],
      lines: [
        { say: 'A condensation polymer forms when monomers with two reacting groups join, releasing a small molecule, usually water, at every link.', show: 'def' },
        { say: 'Take a diol, a molecule with two O H groups, and a dye-carboxylic acid, with two C O O H groups.', caption: 'Take a diol, a molecule with two OH groups, and a dicarboxylic acid, with two COOH groups.', show: ['f.md', 'f.d', 'f.plus', 'f.ma', 'f.a'] },
        { say: 'An O H group of the diol reacts with a C O O H group of the acid, as in esterification: an ester link forms, and water is released.', caption: 'An OH group of the diol reacts with a COOH group of the acid, as in esterification: an ester link forms, and water is released.', show: ['f.c1', 'f.link1', 'f.c2', 'f.w1'], focus: ['f.link1', 'f.w1'] },
        { say: 'Each monomer still has a group at its other end, so the chain keeps growing, releasing water at every link. All the links are ester links: this is a polyester.', show: ['f.c0', 'f.link2', 'f.c3', 'f.c4', 'f.w2'], focus: ['f.link1', 'f.link2', 'f.w1', 'f.w2'] },
      ],
    },
    {
      chapter: 'Polyesters, nylon and nature',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Polyester**: a diol + a dicarboxylic acid, joined by ester links, $\\ce{-COO-{}}$. Ethane-1,2-diol and benzene-1,4-dicarboxylic acid make the polyester of drink bottles and clothing fibres.',
            '**Polyamide**: a diamine (two $\\ce{-NH2}$ groups) + a dicarboxylic acid, joined by amide links, $\\ce{-CO-NH-{}}$. Hexane-1,6-diamine and hexanedioic acid make **nylon**.',
            'Living things make condensation polymers too: **proteins** from amino acids, and **starch** and **cellulose** from glucose.',
          ],
        },
      ],
      lines: [
        { say: 'Ethane one, two dye-ol and benzene one, four dye-carboxylic acid make the polyester of drink bottles and clothing fibres.', caption: 'Ethane-1,2-diol and benzene-1,4-dicarboxylic acid make the polyester of drink bottles and clothing fibres.', show: 'b.0' },
        { say: 'A dye-amine has two N H two groups. With a dye-carboxylic acid, it forms a polyamide, joined by amide links. Hexane one, six dye-amine and hexane-dioic acid make nylon.', caption: 'A diamine has two NH₂ groups. With a dicarboxylic acid, it forms a polyamide, joined by amide links. Hexane-1,6-diamine and hexanedioic acid make nylon.', show: 'b.1' },
        { say: 'Living things make condensation polymers too: proteins from amino acids, and starch and cellulose from glucose.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Finding the monomers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which monomers made $\\ce{-O-CH2-CH2-O-CO-(CH2)4-CO-O-CH2-CH2-O-CO-(CH2)4-CO-{}}$?' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{-O-CO-{}}\\ \\text{links: a polyester}',
            '\\text{break each link and add back water}',
            '\\ce{HO-CH2-CH2-OH}\\ \\ \\text{and}\\ \\ \\ce{HOOC-(CH2)4-COOH}',
            '\\text{ethane-1,2-diol and hexanedioic acid}',
          ],
        },
      ],
      lines: [
        { say: 'Here is a segment of a polymer. Which monomers made it?', show: 'q' },
        { say: 'Look at the links. O, C O, is an ester link, so this is a polyester, a condensation polymer.', caption: 'Look at the links. –O–CO– is an ester link, so this is a polyester, a condensation polymer.', show: 'm.0', focus: 'm.0' },
        { say: 'Break each link and add back water: an O H on each carbon with a double-bonded oxygen, and an H on each oxygen.', caption: 'Break each link and add back water: an OH on each carbon with a double-bonded oxygen, and an H on each oxygen.', show: 'm.1', focus: 'm.1' },
        { say: 'The pieces are ethane one, two dye-ol and hexane-dioic acid.', caption: 'The pieces are ethane-1,2-diol and hexanedioic acid.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Addition or condensation?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Addition or condensation?', md: 'A $\\ce{C=C}$ double bond in the monomer means an **addition** polymer, with no other product. Two reacting groups on each monomer ($\\ce{-OH}$, $\\ce{-COOH}$ or $\\ce{-NH2}$) mean a **condensation** polymer, with water released at each link.' },
        { kind: 'callout', id: 'env', tone: 'key', title: 'Plastics and the environment', md: 'Most addition polymers are not broken down by living things, so plastic waste can last for hundreds of years. Some condensation polymers, such as poly(lactic acid) from plant sugars, are designed to be biodegradable.' },
      ],
      lines: [
        { say: 'To tell the two kinds apart, look at the monomers. A carbon–carbon double bond means an addition polymer.', show: 'tip' },
        { say: 'Two reacting groups on each monomer, such as O H, C O O H or N H two, mean a condensation polymer.', caption: 'Two reacting groups on each monomer, such as OH, COOH or NH₂, mean a condensation polymer.' },
        { say: 'Most addition polymers are not broken down by living things, so plastic waste can last for hundreds of years. Some condensation polymers are designed to break down.', show: 'env' },
      ],
    },
    {
      chapter: 'Counting units',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'An addition polymer loses no atoms, so each unit has the molar mass of the monomer. $M(\\ce{C2H4}) = 28.06\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2000 \\times 28.06\\ \\text{g/mol} = 56\\,120\\ \\text{g/mol}', '\\text{units} = \\dfrac{M(\\text{chain})}{M(\\text{monomer})}'] },
      ],
      lines: [
        { say: 'One last idea. An addition polymer loses no atoms, so each unit has the molar mass of the monomer: for ethene, twenty-eight point zero six grams per mole.', show: 't' },
        { say: 'So a poly ethene chain of two thousand units has a molar mass of two thousand times that, or 56,120 grams per mole.', caption: 'So a poly(ethene) chain of 2,000 units has a molar mass of 2,000 times that, or 56,120 grams per mole.', show: 'm.0', focus: 'm.0' },
        { say: 'Turn it round: dividing the molar mass of a chain by that of its monomer gives the number of units.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Hexane-1,6-diamine, $\\ce{H2N-(CH2)6-NH2}$, and hexanedioic acid, $\\ce{HOOC-(CH2)4-COOH}$, link into long chains (nylon). What kind of polymer forms?',
          choices: ['An addition polymer; no other product forms', 'A condensation polymer; water also forms', 'An addition polymer; water also forms', 'A condensation polymer; no other product forms'],
          answer: 1,
          working: 'Each $\\ce{-NH2}$ reacts with a $\\ce{-COOH}$, forming an amide link and releasing water. Neither monomer has a $\\ce{C=C}$ double bond.',
        },
      ],
      lines: [
        { say: 'Your turn. Hexane one, six dye-amine and hexane-dioic acid link into long chains of nylon. What kind of polymer forms? Pause the video and try it.', caption: 'Your turn. Hexane-1,6-diamine and hexanedioic acid link into long chains of nylon. What kind of polymer forms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Each N H two group reacts with a C O O H group, making an amide link and releasing water. Neither monomer has a carbon–carbon double bond.', caption: 'The answer is B. Each NH₂ group reacts with a COOH group, making an amide link and releasing water. Neither monomer has a carbon–carbon double bond.', show: 'q.answer' },
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
            '**Condensation polymers** form from monomers with two reacting groups, releasing water at each link.',
            'Polyesters: diol + dicarboxylic acid. Polyamides such as nylon: diamine + dicarboxylic acid. Also proteins, starch and cellulose.',
            'To find the monomers, break each link and add back water.',
            'An addition polymer loses no atoms: units = $M(\\text{chain}) \\div M(\\text{monomer})$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Condensation polymers form from monomers with two reacting groups, releasing water at each link.', show: 'sum.0' },
        { say: 'A diol and a dye-carboxylic acid make a polyester, and a dye-amine and a dye-carboxylic acid make a polyamide, such as nylon.', caption: 'A diol and a dicarboxylic acid make a polyester, and a diamine and a dicarboxylic acid make a polyamide, such as nylon.', show: 'sum.1' },
        { say: 'To find the monomers, break each link and add back water.', show: 'sum.2' },
        { say: 'And for an addition polymer, the chain’s molar mass divided by the monomer’s gives the number of units. Now you can name esters and build polymers. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
