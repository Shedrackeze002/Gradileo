import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import ez from '@/content/chemmore/videos/cx-9-3.ts';

// Exam question for More Chemistry Topics lesson 9.3 (E/Z isomerism): why but-2-ene has
// stereoisomers and but-1-ene does not, and naming an isomer of 2-chlorobut-2-ene with the
// priority rules. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's single bond turning and double bond locked (src/video/molecules.ts).

const QUESTION = 'This question is about E/Z isomerism. (a) Explain why but-2-ene, CH₃CH=CHCH₃, exists as E and Z isomers. (b) Explain why but-1-ene, CH₂=CHCH₂CH₃, does not. (c) In one isomer of 2-chlorobut-2-ene, CH₃CCl=CHCH₃, the chlorine atom and the hydrogen atom are on the same side of the double bond. Use the priority rules to decide whether this is the E or the Z isomer.';

const video: Explainer = {
  id: 'xq-cx-9-3',
  lessonId: '',
  exam: {
    lesson: 'cx-9-3',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: But-2-ene, But-1-ene and an E or Z Chloroalkene. E/Z Isomerism',
  thumbnailTitle: 'E or Z?',
  thumbnail: 'rr',
  summary:
    'A test-style question, solved one small step at a time: why does but-2-ene have E and Z isomers, why does but-1-ene not, and is an isomer of 2-chlorobut-2-ene with Cl and H on the same side E or Z? The double bond cannot rotate and each carbon of but-2-ene carries two different groups, but-1-ene has two hydrogens on one carbon, and the priority groups Cl and CH₃ are on opposite sides, so the isomer is E.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'E or Z?', subtitle: 'Isomers about a double bond' }],
      lines: [
        { say: 'In this video, we solve a test-style question about E and Z isomers. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'No rotation and two different groups on each carbon; two H on one carbon; E' }],
      lines: [
        { say: 'Here is the question. This question is about E Z isomerism. Part a: explain why but-2-ene exists as E and Z isomers. Part b: explain why but-1-ene does not. Part c: in one isomer of 2-chlorobut-2-ene, the chlorine atom and the hydrogen atom are on the same side of the double bond. Use the priority rules to decide whether this is the E or the Z isomer.', caption: 'Here is the question. This question is about E/Z isomerism. Part a: explain why but-2-ene, CH₃CH=CHCH₃, exists as E and Z isomers. Part b: explain why but-1-ene, CH₂=CHCH₂CH₃, does not. Part c: in one isomer of 2-chlorobut-2-ene, CH₃CCl=CHCH₃, the chlorine atom and the hydrogen atom are on the same side of the double bond. Use the priority rules to decide whether this is the E or the Z isomer.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Check **both carbons** of the double bond, then compare the **priority** groups' }],
      lines: [
        { say: 'We look at the two groups on each carbon of the double bond. Then, for part c, we find the higher priority group on each carbon and see whether they are on the same side.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(ez, 'rr')],
      lines: [
        { say: 'Here is what we need. On the left, a single bond: its groups turn freely, so every arrangement is the same compound.', show: 'rr', play: 'rr.single' },
        { say: 'On the right, a double bond. To turn, the pi bond would have to break first. So the two arrangements are different compounds.', caption: 'On the right, a double bond. To turn, the π bond would have to break first. So the two arrangements are different compounds.', play: 'rr.double' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['The C=C **cannot rotate**', 'Each carbon needs **two different** groups', 'Higher **atomic number** first: Z same side, E opposite'] }],
      lines: [
        { say: 'Here is the plan. The double bond cannot rotate.', show: 'plan.0' },
        { say: 'Each carbon of the double bond must carry two different groups.', show: 'plan.1' },
        { say: 'And on each carbon, the group whose first atom has the higher atomic number has priority. Z means the priority groups are on the same side, and E means opposite sides.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: But-2-ene',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Alkene', 'Groups on first C', 'Groups on second C', 'E/Z?'],
          rows: [
            ['but-2-ene', 'CH₃ and **H**', 'CH₃ and **H**', '**yes**'],
            ['but-1-ene', '**H and H**', 'H and C₂H₅', '**no**'],
          ],
        },
      ],
      lines: [
        { say: 'Step one. In but-2-ene, each carbon of the double bond carries a methyl group and a hydrogen, two different groups. The double bond cannot rotate, so the methyl groups can be on the same side or opposite sides, and these are two different compounds. That is part a.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'In but-1-ene, the first carbon carries two hydrogen atoms. Swapping them gives the same molecule, so there are no E and Z isomers. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 2: Find the priorities',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'p',
          head: ['Carbon', 'Groups (atomic number of first atom)', 'Higher priority'],
          rows: [
            ['C2', 'Cl (17) and CH₃ (6)', '**Cl**'],
            ['C3', 'H (1) and CH₃ (6)', '**CH₃**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Carbon 2 carries a chlorine and a methyl group. Chlorine has atomic number 17 and carbon only 6, so chlorine has priority.', show: ['p', 'p.0'], focus: 'p.0' },
        { say: 'Carbon 3 carries a hydrogen and a methyl group. Carbon beats hydrogen, so here the methyl group has priority.', show: 'p.1', focus: 'p.1' },
      ],
    },
    {
      chapter: 'Step 3: E or Z?',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Cl and **H** on the **same** side', 'So Cl and **CH₃** (the priority groups) are on **opposite** sides', 'Opposite sides: the **E** isomer'] }],
      lines: [
        { say: 'Step three. We are told the chlorine and the hydrogen are on the same side.', show: 's.0' },
        { say: 'The hydrogen and the methyl group share carbon 3, so the methyl group must be on the other side, opposite the chlorine.', show: 's.1' },
        { say: 'The two priority groups are on opposite sides, so this is the E isomer. That is part c.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) The C=C **cannot rotate**, and each carbon has **two different groups**. (b) One carbon has **two hydrogens**. (c) The priority groups, **Cl** and **CH₃**, are on **opposite** sides: **E**.' },
      ],
      lines: [
        { say: 'Does it make sense? E comes from the German entgegen, meaning opposite, and Z from zusammen, meaning together. We compared only the priority groups, never the hydrogen.', show: 'ans' },
        { say: 'So restricted rotation and two different groups on each carbon give E and Z isomers, and this isomer is E.' },
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
            ['Cl and H together, so **Z**', 'Compare the **priority** groups'],
            ['But-1-ene has E/Z: it has **CH₃** and C₂H₅', 'Check **both** carbons'],
            ['Priority by **group mass**', 'First atom’s **atomic number**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Chlorine and hydrogen are not both priority groups. On carbon 3, the methyl group wins.', focus: 'traps.0' },
        { say: 'One carbon with two different groups is not enough. Both carbons of the double bond need them.', focus: 'traps.1' },
        { say: 'And we compare the atomic numbers of the atoms joined directly to the double bond carbon.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these alkenes has E and Z isomers?',
          choices: ['propene', 'ethene', 'pent-2-ene', '2-methylpropene'],
          answer: 2,
          working: 'In pent-2-ene, CH₃CH=CHCH₂CH₃, each carbon of the double bond carries a hydrogen and an alkyl group.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these alkenes has E and Z isomers? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'In pent-2-ene, each carbon of the double bond carries a hydrogen and a different alkyl group. The others each have a carbon with two identical groups: choice C.', show: 'q2.answer' },
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
          items: ['No rotation about **C=C**', '**Two different** groups on **each** carbon', 'Priority groups together **Z**, opposite **E**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A carbon to carbon double bond cannot rotate.', show: 'sum.0' },
        { say: 'E and Z isomers need two different groups on each carbon of the double bond.', show: 'sum.1' },
        { say: 'And priority groups on the same side give Z, on opposite sides E. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
