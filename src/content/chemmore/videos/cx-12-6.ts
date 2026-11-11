import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-6',
  lessonId: 'cx-12-6',
  title: 'Amino Acids, Proteins and DNA',
  thumbnail: false,
  summary:
    'Amino acids are positive in acid, zwitterions at their isoelectric point and negative in alkali. They join by condensation into proteins through peptide links, and a protein’s primary, secondary and tertiary structures are held by peptide links, hydrogen bonds, ionic bonds and disulfide bridges. DNA has a phosphate–deoxyribose backbone with bases paired A–T and C–G by hydrogen bonds, and cisplatin binds to guanine to stop DNA being copied.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'Amino Acids, Proteins and DNA', subtitle: 'The chemistry of life' }],
      lines: [
        { say: 'Twenty amino acids, joined in different orders, make every protein in your body. Four bases, paired up, store the instructions for making them.', show: 'title' },
        { say: 'In this lesson, you will describe amino acids and proteins, the structure of D N A, and how the drug cisplatin works.', caption: 'In this lesson, you will describe amino acids and proteins, the structure of DNA, and how the drug cisplatin works.' },
      ],
    },
    {
      chapter: 'Amino acids',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Conditions', 'Form'], rows: [['acid', '$\\ce{H3N+CH(R)COOH}$'], ['isoelectric point', '$\\ce{H3N+CH(R)COO-}$, a zwitterion'], ['alkali', '$\\ce{H2NCH(R)COO-}$']] }],
      lines: [
        { say: 'An amino acid has an amine group and a carboxylic acid group on the same carbon, so it is both a base and an acid.' },
        { say: 'In acid, the amine group gains a hydrogen ion, and the amino acid is positive.', show: 't.0', focus: 't.0' },
        { say: 'At its isoelectric point, it is a zwitterion: it has a positive and a negative charge, but no overall charge.', show: 't.1', focus: 't.1' },
        { say: 'And in alkali, the acid group loses a hydrogen ion, so it is negative.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Proteins',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Peptide links, –CONH–, form by condensation', 'Primary: the sequence of amino acids', 'Secondary: α-helix or β-sheet, held by hydrogen bonds', 'Tertiary: the folded shape, with ionic bonds and disulfide bridges'] }],
      lines: [
        { say: 'Amino acids join by condensation, forming peptide links and losing water. Hydrolysis with hot hydrochloric acid breaks them again.', show: 'b.0' },
        { say: 'The primary structure is the sequence of amino acids.', show: 'b.1' },
        { say: 'The secondary structure is a helix or a pleated sheet, held by hydrogen bonds between peptide links.', show: 'b.2' },
        { say: 'And the tertiary structure is the overall folded shape, held by hydrogen bonds, ionic bonds and disulfide bridges. An enzyme’s active site depends on that shape.', show: 'b.3' },
      ],
    },
    {
      chapter: 'DNA and cisplatin',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Backbone: phosphate and 2-deoxyribose', 'A pairs with T: two hydrogen bonds', 'C pairs with G: three hydrogen bonds', 'Cisplatin binds to guanine and stops DNA copying'] }],
      lines: [
        { say: 'Each D N A strand has a backbone of alternating phosphate and sugar groups, with a base on each sugar.', caption: 'Each DNA strand has a backbone of alternating phosphate and sugar groups, with a base on each sugar.', show: 'b.0' },
        { say: 'Two strands twist into a double helix, held by hydrogen bonds between bases. Adenine pairs with thymine, with two hydrogen bonds.', show: 'b.1' },
        { say: 'Cytosine pairs with guanine, with three.', show: 'b.2' },
        { say: 'The anticancer drug cisplatin binds to guanine bases, bending the D N A so it cannot be copied, which stops cancer cells dividing.', caption: 'The anticancer drug cisplatin binds to guanine bases, bending the DNA so it cannot be copied, which stops cancer cells dividing.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'One DNA strand reads ATGC. How many hydrogen bonds hold it to its partner strand?',
          choices: ['8', '10', '12', '4'],
          answer: 1,
          working: 'Two A–T pairs give $2 \\times 2 = 4$, and two C–G pairs give $2 \\times 3 = 6$: **10** in all.',
        },
      ],
      lines: [
        { say: 'Your turn. One D N A strand reads A, T, G, C. How many hydrogen bonds hold it to its partner strand? Pause the video and try it.', caption: 'Your turn. One DNA strand reads ATGC. How many hydrogen bonds hold it to its partner strand? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, ten. The two A T pairs give four hydrogen bonds, and the two C G pairs give six.', caption: 'The answer is B, 10. The two A–T pairs give four hydrogen bonds, and the two C–G pairs give six.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Amino acids: positive in acid, zwitterions, negative in alkali.', 'Peptide links form by condensation.', 'DNA: A–T with two hydrogen bonds, C–G with three.', 'Cisplatin binds to guanine and stops DNA copying.'] }],
      lines: [
        { say: 'Let’s sum up. Amino acids are positive in acid, zwitterions at the isoelectric point, and negative in alkali.', show: 'sum.0' },
        { say: 'They join by condensation into proteins through peptide links.', show: 'sum.1' },
        { say: 'In D N A, adenine and thymine share two hydrogen bonds, and cytosine and guanine share three.', caption: 'In DNA, adenine and thymine share two hydrogen bonds, and cytosine and guanine share three.', show: 'sum.2' },
        { say: 'And cisplatin binds to guanine, stopping D N A from being copied.', caption: 'And cisplatin binds to guanine, stopping DNA from being copied.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
