import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import proteins from '@/content/chemmore/videos/cx-12-6.ts';

// Exam question for More Chemistry Topics lesson 12.6 (amino acids, proteins and DNA): the
// zwitterion of glycine, glycine in acid, and joining two glycines by a peptide link. Written by
// Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's two glycine molecules forming a peptide link (src/video/molecules.ts).

const QUESTION = 'Glycine, H₂NCH₂COOH, is the simplest amino acid. (a) Give the formula of the zwitterion of glycine, and explain how it forms. (b) Give the formula of the glycine species present in a strongly acidic solution. (c) Two glycine molecules join to form a dipeptide. Name the link formed, the type of reaction, and the other product.';

const video: Explainer = {
  id: 'xq-cx-12-6',
  lessonId: '',
  exam: {
    lesson: 'cx-12-6',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Glycine as a Zwitterion, in Acid and in a Dipeptide. Amino Acids and Proteins',
  thumbnailTitle: 'Amino Acids',
  thumbnail: 'pp',
  summary:
    'A test-style question, solved one small step at a time: what is the zwitterion of glycine, what form does glycine take in strong acid, and what happens when two glycines join? The COOH gives its H⁺ to the NH₂, giving ⁺H₃NCH₂COO⁻; in strong acid the carboxylate is protonated too, giving ⁺H₃NCH₂COOH; and two glycines join by condensation, forming a peptide link and water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Amino Acids', subtitle: 'Glycine in three forms' }],
      lines: [
        { say: 'In this video, we solve a test-style question about amino acids. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '⁺H₃NCH₂COO⁻; ⁺H₃NCH₂COOH; peptide link, condensation, water' }],
      lines: [
        { say: 'Here is the question. Glycine is the simplest amino acid. Part a: give the formula of the zwitterion of glycine, and explain how it forms. Part b: give the formula of the glycine species present in a strongly acidic solution. Part c: two glycine molecules join to form a dipeptide. Name the link formed, the type of reaction, and the other product.', caption: 'Here is the question. Glycine, H₂NCH₂COOH, is the simplest amino acid. Part a: give the formula of the zwitterion of glycine, and explain how it forms. Part b: give the formula of the glycine species present in a strongly acidic solution. Part c: two glycine molecules join to form a dipeptide. Name the link formed, the type of reaction, and the other product.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'An amino acid has an **acid** group and a **base** group in the **same** molecule' }],
      lines: [
        { say: 'Glycine has a carboxylic acid group at one end and an amine group at the other. They can swap a hydrogen ion with each other, with the solution, or join with another molecule.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(proteins, 'pp')],
      lines: [
        { say: 'Here is what we need for part c. Here are two glycine molecules, with every atom drawn.', show: 'pp' },
        { say: 'The O H of one carboxyl group and an H of the other’s amine group leave as water, and the carbon bonds to the nitrogen: a peptide link.', caption: 'The OH of one carboxyl group and an H of the other’s amine group leave as water, and the carbon bonds to the nitrogen: a peptide link.', play: 'pp.go' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['COOH **gives** H⁺; NH₂ **accepts** H⁺', 'In strong acid, **both** ends hold H⁺', 'Two amino acids join with **loss of water**'] }],
      lines: [
        { say: 'Here is the plan. The carboxyl group can give a hydrogen ion, and the amine group can accept one.', show: 'plan.0' },
        { say: 'In a strongly acidic solution, both ends hold a hydrogen ion.', show: 'plan.1' },
        { say: 'And two amino acids join together, losing a water molecule.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The zwitterion',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{H2NCH2COOH} \\rightarrow {}^{+}\\ce{H3NCH2COO-}', '\\good{\\text{zwitterion: } {}^{+}\\ce{H3NCH2COO-}}'] }],
      lines: [
        { say: 'Step one. The C O O H group gives its hydrogen ion to the N H two group of the same molecule.', caption: 'Step one. The COOH group gives its hydrogen ion to the NH₂ group of the same molecule.', show: 'm.0' },
        { say: 'One end becomes N H three plus and the other C O O minus. The molecule has both charges and no overall charge: a zwitterion. That is part a.', caption: 'One end becomes NH₃⁺ and the other COO⁻. The molecule has both charges and no overall charge: a zwitterion, ⁺H₃NCH₂COO⁻. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: In strong acid',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Solution', 'Amine end', 'Acid end', 'Species'],
          rows: [
            ['**strong acid**', 'NH₃⁺', '**COOH**', '**⁺H₃NCH₂COOH**'],
            ['isoelectric point', 'NH₃⁺', 'COO⁻', '⁺H₃NCH₂COO⁻'],
            ['strong alkali', 'NH₂', 'COO⁻', 'H₂NCH₂COO⁻'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. In strongly acidic solution, there are plenty of hydrogen ions. The C O O minus end takes one back, and the N H three plus end keeps its hydrogen.', caption: 'Step two. In strongly acidic solution, there are plenty of hydrogen ions. The COO⁻ end takes one back, and the NH₃⁺ end keeps its hydrogen.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'So the species is the positive ion, N H three plus C H two C O O H. That is part b.', caption: 'So the species is the positive ion, ⁺H₃NCH₂COOH. That is part b.', focus: 't.0' },
        { say: 'For comparison, the zwitterion is found at the isoelectric point, and in strong alkali the amine end loses its hydrogen ion, giving a negative ion.', show: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Step 3: The dipeptide',
      layout: 'center',
      main: [{ kind: 'math', id: 'd', size: 'md', lines: ['\\ce{2H2NCH2COOH -> H2NCH2CONHCH2COOH + H2O}', '\\good{\\text{peptide link (CONH), condensation, water}}'] }],
      lines: [
        { say: 'Step three. The carboxyl group of one glycine reacts with the amine group of the other. An O H and an H leave as water.', caption: 'Step three. The carboxyl group of one glycine reacts with the amine group of the other. An OH and an H leave as water.', show: 'd.0' },
        { say: 'The new C O N H group is a peptide link. Two molecules join with the loss of a small molecule, so this is a condensation reaction, and the other product is water. That is part c.', caption: 'The new –CONH– group is a peptide link. Two molecules join with the loss of a small molecule, so this is a condensation reaction, and the other product is water. That is part c.', show: 'd.1', focus: 'd.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **⁺H₃NCH₂COO⁻**: the COOH gives H⁺ to the NH₂. (b) **⁺H₃NCH₂COOH**. (c) A **peptide link**, by **condensation**, with **water**.' },
      ],
      lines: [
        { say: 'Does it make sense? The dipeptide still has an amine group at one end and a carboxyl group at the other, so it can keep joining more amino acids to make a protein.', show: 'ans' },
        { say: 'So the zwitterion has both charges, strong acid gives the positive ion, and amino acids join by condensation through peptide links.' },
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
            ['Zwitterion **H₂NCH₂COO⁻**', 'That is glycine in **alkali**'],
            ['In acid: **H₃N⁺CH₂COO⁻**', 'Strong acid protonates the **COO⁻** too'],
            ['**Addition** reaction', 'Water is **lost**: condensation'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A zwitterion has both a positive and a negative end. H two N C H two C O O minus has only the negative one.', caption: 'A zwitterion has both a positive and a negative end. H₂NCH₂COO⁻ has only the negative one.', focus: 'traps.0' },
        { say: 'In strong acid, the carboxylate end takes a hydrogen ion back, so the species is positive overall.', focus: 'traps.1' },
        { say: 'And because a water molecule is lost when the two join, the reaction is condensation.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which bonds hold a protein’s α-helix in shape?',
          choices: ['peptide links', 'hydrogen bonds', 'disulfide bridges', 'ionic bonds'],
          answer: 1,
          working: 'The α-helix is secondary structure, held by hydrogen bonds between the C=O and N–H groups of the chain.',
        },
      ],
      lines: [
        { say: 'Your turn. Which bonds hold a protein’s alpha helix in shape? Pause the video and try it.', caption: 'Your turn. Which bonds hold a protein’s α-helix in shape? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The alpha helix is the secondary structure, held by hydrogen bonds between the C double bond O and N H groups of the chain: choice B.', caption: 'The α-helix is the secondary structure, held by hydrogen bonds between the C=O and N–H groups of the chain: choice B.', show: 'q2.answer' },
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
          items: ['Zwitterion: **⁺H₃N** and **COO⁻** in one molecule', 'Strong acid: **positive** ion; strong alkali: **negative** ion', 'Peptide link by **condensation**, losing water'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A zwitterion has a positive amine end and a negative carboxylate end.', show: 'sum.0' },
        { say: 'In strong acid an amino acid is a positive ion, and in strong alkali a negative ion.', show: 'sum.1' },
        { say: 'And amino acids join by condensation through peptide links. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
