import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import chirality from '@/content/chemmore/videos/cx-12-1.ts';

// Exam question for More Chemistry Topics lesson 12.1 (optical isomerism): the chiral centre in
// lactic acid, telling the enantiomers apart, and why lactic acid made from ethanal is racemic.
// Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's chiral centre being built from methane (src/video/molecules.ts).

const QUESTION = 'Lactic acid, CH₃CH(OH)COOH, has two optical isomers. (a) Explain what is meant by a chiral centre, and identify the chiral centre in lactic acid. (b) State how the two enantiomers of lactic acid can be distinguished. (c) Lactic acid made in the laboratory from ethanal, by adding HCN and then hydrolysing, has no effect on plane-polarised light. Explain why.';

const video: Explainer = {
  id: 'xq-cx-12-1',
  lessonId: '',
  exam: {
    lesson: 'cx-12-1',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: The Two Lactic Acids and a Racemic Mixture. Optical Isomerism',
  thumbnailTitle: 'Optical Isomers',
  thumbnail: 'cc',
  summary:
    'A test-style question, solved one small step at a time: what is a chiral centre and where is it in lactic acid, how are its enantiomers told apart, and why does lactic acid made from ethanal not rotate plane-polarised light? The chiral centre is the carbon bonded to H, CH₃, OH and COOH; the enantiomers rotate plane-polarised light in opposite directions; and the planar C=O of ethanal is attacked equally from both sides, giving a racemic mixture.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Optical Isomers', subtitle: 'The two lactic acids' }],
      lines: [
        { say: 'In this video, we solve a test-style question about optical isomers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Four different groups, the middle carbon; opposite rotation of light; racemic mixture' }],
      lines: [
        { say: 'Here is the question. Lactic acid has two optical isomers. Part a: explain what is meant by a chiral centre, and identify the chiral centre in lactic acid. Part b: state how the two enantiomers of lactic acid can be distinguished. Part c: lactic acid made in the laboratory from ethanal, by adding H C N and then hydrolysing, has no effect on plane-polarised light. Explain why.', caption: 'Here is the question. Lactic acid, CH₃CH(OH)COOH, has two optical isomers. Part a: explain what is meant by a chiral centre, and identify the chiral centre in lactic acid. Part b: state how the two enantiomers of lactic acid can be distinguished. Part c: lactic acid made in the laboratory from ethanal, by adding HCN and then hydrolysing, has no effect on plane-polarised light. Explain why.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Find the carbon with **four different groups**, then think about **light** and **mixtures**' }],
      lines: [
        { say: 'Optical isomers come from a carbon with four different groups. Then we use their effect on light, and ask what happens when both isomers are made in equal amounts.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(chirality, 'cc')],
      lines: [
        { say: 'Here is what we need. Here is a chiral centre being built. Methane’s carbon has four identical groups, all hydrogen atoms.', show: 'cc' },
        { say: 'Swap one hydrogen for a methyl group, one for an O H group, and one for a C O O H group. Now the carbon holds four different groups: a chiral centre. This molecule is lactic acid.', caption: 'Swap one hydrogen for a methyl group, one for an OH group, and one for a COOH group. Now the carbon holds four different groups: a chiral centre. This molecule is lactic acid.', play: 'cc.swap' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Chiral centre: C with **four different** groups', 'Enantiomers rotate plane-polarised light **opposite ways**', 'Equal amounts of both: **racemic**, no rotation'] }],
      lines: [
        { say: 'Here is the plan. A chiral centre is a carbon with four different groups.', show: 'plan.0' },
        { say: 'Its two enantiomers rotate plane-polarised light by the same amount in opposite directions.', show: 'plan.1' },
        { say: 'And a mixture with equal amounts of each, a racemic mixture, has no overall effect.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The chiral centre',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Carbon', 'Groups attached', 'Chiral?'],
          rows: [
            ['CH₃', 'three H and one C', 'no'],
            ['**CH(OH)**', '**H, CH₃, OH, COOH**', '**yes**'],
            ['COOH', 'only three groups', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. A chiral centre is a carbon atom bonded to four different atoms or groups, so its mirror image cannot be placed on top of it.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'In lactic acid, the middle carbon is bonded to a hydrogen, a methyl group, an O H group and a C O O H group. These are all different, so that is the chiral centre. That is part a.', caption: 'In lactic acid, the middle carbon is bonded to H, CH₃, OH and COOH. These are all different, so that is the chiral centre. That is part a.', show: 't.1', focus: 't.1' },
        { say: 'The other two carbons are not chiral: one has three hydrogens, and the other has a double bond, so only three groups.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 2: Telling them apart',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Shine **plane-polarised light** through a solution of each', 'One rotates the plane **clockwise**, the other **anticlockwise**', 'By the **same angle**'] }],
      lines: [
        { say: 'Step two. Enantiomers have the same physical and chemical properties in most tests, so we shine plane-polarised light through a solution of each.', show: 's.0' },
        { say: 'One enantiomer rotates the plane of the light clockwise, and the other rotates it anticlockwise.', show: 's.1' },
        { say: 'They rotate it by the same angle, for the same concentration. That is part b.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 3: The racemic mixture',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'r', items: ['The C=O group of ethanal is **planar**', 'CN⁻ attacks from **above** and **below** equally', '**50:50** mixture: the rotations **cancel**'] }],
      lines: [
        { say: 'Step three. In ethanal, the carbon of the C double bond O group and the three atoms around it lie flat, in one plane.', caption: 'Step three. In ethanal, the carbon of the C=O group and the three atoms around it lie flat, in one plane.', show: 'r.0' },
        { say: 'The cyanide ion is equally likely to attack from above or below that plane, so the two enantiomers form in equal amounts.', show: 'r.1' },
        { say: 'This is a racemic mixture. The rotation caused by one enantiomer is cancelled by the other, so there is no effect on the light. That is part c.', show: 'r.2', focus: 'r.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) A carbon with **four different groups**: the **CH(OH)** carbon. (b) They rotate **plane-polarised light** in **opposite directions**. (c) The **planar C=O** is attacked **equally from both sides**, giving a **racemic mixture**, whose rotations **cancel**.' },
      ],
      lines: [
        { say: 'Does it make sense? Lactic acid from muscles is made by an enzyme, which forms only one enantiomer, so it does rotate light. Only the laboratory route gives the racemic mixture.', show: 'ans' },
        { say: 'So the middle carbon is the chiral centre, the enantiomers rotate light opposite ways, and attack from both sides gives a racemic mixture.' },
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
            ['The **COOH** carbon is chiral', 'It has only **three** groups'],
            ['Tell them apart by **boiling point**', 'Their boiling points are the **same**'],
            ['No rotation because it is **not chiral**', 'Each molecule **is** chiral: they **cancel**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The carboxyl carbon has a double bond to oxygen, so it carries only three groups.', focus: 'traps.0' },
        { say: 'Enantiomers have identical boiling points and most other physical properties. Only their effect on plane-polarised light differs.', focus: 'traps.1' },
        { say: 'And every molecule in the racemic mixture is chiral. The light is unaffected because the two effects cancel.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these molecules has a chiral centre?',
          choices: ['butan-2-ol', 'propan-2-ol', 'ethanol', 'propanone'],
          answer: 0,
          working: 'In butan-2-ol, CH₃CH(OH)CH₂CH₃, carbon 2 holds H, OH, CH₃ and C₂H₅: four different groups.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these molecules has a chiral centre? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'In butan-2-ol, carbon 2 holds a hydrogen, an O H group, a methyl group and an ethyl group, four different groups: choice A.', caption: 'In butan-2-ol, carbon 2 holds H, OH, CH₃ and C₂H₅, four different groups: choice A.', show: 'q2.answer' },
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
          items: ['Chiral centre: **four different** groups', 'Enantiomers rotate light **opposite ways**', 'Planar C=O attacked both sides: **racemic**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A chiral centre is a carbon with four different groups.', show: 'sum.0' },
        { say: 'Its enantiomers rotate plane-polarised light in opposite directions.', show: 'sum.1' },
        { say: 'And attack on a planar C double bond O from both sides gives a racemic mixture. For more, watch this lesson\'s explainer video on Gradileo.', caption: 'And attack on a planar C=O from both sides gives a racemic mixture. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
