import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-12-1',
  lessonId: 'cx-12-1',
  title: 'Optical Isomerism',
  thumbnail: false,
  summary:
    'A chiral centre is a carbon bonded to four different groups, and a molecule with one has two enantiomers: non-superimposable mirror images that rotate plane-polarised light in opposite directions. A racemic mixture has equal amounts of each and does not rotate the light. Nucleophilic attack on a planar C=O group from either side gives a racemate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Chemistry', title: 'Optical Isomerism', subtitle: 'Left-handed and right-handed molecules' }],
      lines: [
        { say: 'Your hands are mirror images, but you cannot lay one exactly on top of the other. Some molecules are handed in the same way, and the two hands can act very differently in the body.', show: 'title' },
        { say: 'In this lesson, you will find chiral centres, explain enantiomers, and explain why some reactions give a racemic mixture.' },
      ],
    },
    {
      chapter: 'Chiral centres',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Chiral centre', md: 'A carbon atom bonded to **four different** atoms or groups.' },
        { kind: 'bullets', id: 'b', items: ['Butan-2-ol: C2 has H, OH, $\\ce{CH3}$ and $\\ce{C2H5}$, so it is chiral', 'Propan-2-ol: two $\\ce{CH3}$ groups, so it is not'] },
      ],
      lines: [
        { say: 'A chiral centre is a carbon atom bonded to four different groups.', show: 'def' },
        { say: 'In butan-two-ol, carbon two carries a hydrogen, an O H, a methyl and an ethyl group. All four are different, so it is a chiral centre.', caption: 'In butan-2-ol, carbon 2 carries H, OH, CH₃ and C₂H₅. All four are different, so it is a chiral centre.', show: 'b.0' },
        { say: 'In propan-two-ol, the central carbon has two identical methyl groups, so it is not chiral.', caption: 'In propan-2-ol, the central carbon has two identical CH₃ groups, so it is not chiral.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Enantiomers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Enantiomers', md: 'Non-superimposable mirror images. They rotate **plane-polarised light** by the same amount in opposite directions.' },
        { kind: 'callout', id: 'rac', tone: 'key', title: 'Racemic mixture', md: 'Equal amounts of both enantiomers: the rotations cancel.' },
      ],
      lines: [
        { say: 'A molecule with a chiral centre has two enantiomers: mirror images that cannot be superimposed.', show: 'def' },
        { say: 'They are identical in almost every way, except that they rotate plane-polarised light by the same amount, in opposite directions.' },
        { say: 'A racemic mixture contains equal amounts of both, so the rotations cancel and the light is not rotated at all.', show: 'rac' },
      ],
    },
    {
      chapter: 'Why a racemate forms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3CHO + HCN -> CH3CH(OH)CN}'] }],
      lines: [
        { say: 'The C double bond O group of an aldehyde is planar. A cyanide ion is equally likely to attack it from above or from below.', caption: 'The C=O group of an aldehyde is planar. A cyanide ion is equally likely to attack it from above or from below.', show: 'm' },
        { say: 'So ethanal gives equal amounts of the two enantiomers of the product: a racemic mixture.' },
        { say: 'Drugs are often made as a single enantiomer instead, because the other one may be inactive or even harmful.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these molecules has a chiral centre?',
          choices: ['Propan-2-ol, $\\ce{CH3CH(OH)CH3}$', 'Ethanol, $\\ce{CH3CH2OH}$', '2-hydroxypropanoic acid, $\\ce{CH3CH(OH)COOH}$', 'Propanone, $\\ce{CH3COCH3}$'],
          answer: 2,
          working: 'Carbon 2 of 2-hydroxypropanoic acid carries H, OH, $\\ce{CH3}$ and COOH: **four different groups**.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these molecules has a chiral centre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two hydroxypropanoic acid. Its second carbon carries four different groups.', caption: 'The answer is C, 2-hydroxypropanoic acid. Its second carbon carries four different groups.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A chiral centre has four different groups.', 'Enantiomers are non-superimposable mirror images.', 'They rotate plane-polarised light in opposite directions.', 'Attack on a planar C=O gives a racemic mixture.'] }],
      lines: [
        { say: 'Let’s sum up. A chiral centre is a carbon with four different groups.', show: 'sum.0' },
        { say: 'Enantiomers are mirror images that cannot be superimposed.', show: 'sum.1' },
        { say: 'They rotate plane-polarised light in opposite directions.', show: 'sum.2' },
        { say: 'And attack on a planar C double bond O from either side gives a racemic mixture.', caption: 'And attack on a planar C=O from either side gives a racemic mixture.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
