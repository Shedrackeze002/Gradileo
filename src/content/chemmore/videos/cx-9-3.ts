import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-9-3',
  lessonId: 'cx-9-3',
  title: 'E–Z Isomerism',
  thumbnail: false,
  summary:
    'A C=C double bond restricts rotation, so when each carbon of the double bond carries two different groups the alkene has two stereoisomers. The Cahn–Ingold–Prelog rules give priority to the group whose first atom has the higher atomic number: Z has the two priority groups on the same side, and E has them on opposite sides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Organic Mechanisms and Analysis', title: 'E–Z Isomerism', subtitle: 'Same formula, different shape' }],
      lines: [
        { say: 'Bute-two-ene has one structural formula, yet there are two different compounds with that structure. They boil at different temperatures, because the double bond holds their groups in place.', caption: 'But-2-ene has one structural formula, yet there are two different compounds with that structure. They boil at different temperatures, because the double bond holds their groups in place.', show: 'title' },
        { say: 'In this lesson, you will explain E Z isomerism, and name the isomers using priority rules.', caption: 'In this lesson, you will explain E–Z isomerism, and name the isomers using priority rules.' },
      ],
    },
    {
      chapter: 'Restricted rotation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Stereoisomers', md: 'Compounds with the same structural formula but a different arrangement of their atoms in space.' },
        { kind: 'bullets', id: 'b', items: ['The π bond of C=C stops rotation', 'Each carbon of the C=C needs **two different** groups', 'But-2-ene: yes. But-1-ene: no (carbon 1 has two H)'] },
      ],
      lines: [
        { say: 'Stereoisomers have the same structural formula, but their atoms are arranged differently in space.', show: 'def' },
        { say: 'A single bond lets its carbons rotate. A double bond does not, because its pi bond restricts rotation.', caption: 'A single bond lets its carbons rotate. A double bond does not, because its π bond restricts rotation.', show: 'b.0' },
        { say: 'For E Z isomers, each carbon of the double bond must carry two different groups.', caption: 'For E–Z isomers, each carbon of the double bond must carry two different groups.', show: 'b.1' },
        { say: 'Bute-two-ene has a hydrogen and a methyl group on each carbon, so it has E Z isomers. Bute-one-ene does not, because carbon one carries two hydrogens.', caption: 'But-2-ene has an H and a CH₃ on each carbon, so it has E–Z isomers. But-1-ene does not, because carbon 1 carries two hydrogens.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Priority rules',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Higher atomic number = higher priority: Br > Cl > O > C > H', 'Z: priority groups on the **same** side', 'E: priority groups on **opposite** sides'] },
      ],
      lines: [
        { say: 'On each carbon, the group whose first atom has the higher atomic number has priority. Bromine beats chlorine, which beats oxygen, then carbon, then hydrogen.', show: 'b.0' },
        { say: 'If the two higher-priority groups are on the same side, it is the Z isomer, from the German for together.', show: 'b.1' },
        { say: 'If they are on opposite sides, it is the E isomer, from the German for opposite.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Priority is not size', md: 'A single Cl atom (17) outranks a long carbon chain, because chlorine’s atomic number is higher than carbon’s (6).' }],
      lines: [{ say: 'A common mistake is to give priority to the bigger group. Priority depends on atomic number, so a single chlorine atom outranks a long carbon chain.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Carbon 1 carries Br and H; carbon 2 carries Cl and $\\ce{CH3}$. The Br and the Cl are on the same side. Which isomer is it?',
          choices: ['The E isomer', 'Neither: it has no E–Z isomers', 'The E isomer, because $\\ce{CH3}$ is larger', 'The Z isomer'],
          answer: 3,
          working: 'Br beats H, and Cl beats C. The two priority groups, Br and Cl, are on the **same side**: Z.',
        },
      ],
      lines: [
        { say: 'Your turn. Carbon one carries bromine and hydrogen. Carbon two carries chlorine and a methyl group. The bromine and chlorine are on the same side. Which isomer is it? Pause the video and try it.', caption: 'Your turn. Carbon 1 carries Br and H. Carbon 2 carries Cl and CH₃. The Br and Cl are on the same side. Which isomer is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, the Z isomer. Bromine and chlorine are the priority groups, and they are on the same side.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A C=C double bond restricts rotation.', 'Each carbon of the C=C needs two different groups.', 'Priority goes to the higher atomic number.', 'Z: same side. E: opposite sides.'] }],
      lines: [
        { say: 'Let’s sum up. A double bond restricts rotation.', show: 'sum.0' },
        { say: 'For E Z isomers, each carbon of the double bond needs two different groups.', caption: 'For E–Z isomers, each carbon of the double bond needs two different groups.', show: 'sum.1' },
        { say: 'Priority goes to the group whose first atom has the higher atomic number.', show: 'sum.2' },
        { say: 'And Z means the priority groups are on the same side, while E means opposite sides.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
