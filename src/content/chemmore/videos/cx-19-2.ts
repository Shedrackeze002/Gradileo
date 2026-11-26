import type { Explainer } from '@/video/script.ts';
import { cracking, hexaneIsomers } from '../../chem30/videos/lib/c30-organic.ts';

const video: Explainer = {
  id: 'cx-19-2',
  lessonId: 'cx-19-2',
  title: 'Petrol, Octane Number and Petrochemicals',
  thumbnail: 'hx',
  summary:
    'Knocking is the early, uneven burning of the fuel and air in an engine, and the octane number measures how well a petrol resists it, against 2,2,4-trimethylpentane (100) and heptane (0). Branched, cyclic and aromatic hydrocarbons have higher octane numbers than straight chains, so refineries use reforming, isomerisation and cracking to improve petrol, and lead additives were phased out because lead is poisonous. Petrochemicals such as ethene are the raw materials for plastics, solvents, detergents and drugs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Organic Chemistry and Biochemistry', title: 'Petrol, Octane Number and Petrochemicals', subtitle: 'Changing the shape of a fuel' }],
      lines: [
        { say: 'Petrol straight from the distillation of crude oil would make a car engine knock and lose power.', show: 'title' },
        { say: 'In this lesson, you will explain knocking and the octane number, and describe how refineries improve petrol and what else they make from crude oil.' },
      ],
    },
    {
      chapter: 'Knocking and the octane number',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'definition', title: 'Knocking', md: 'The early, uneven explosion of the fuel and air in a cylinder, **before the spark**. It wastes energy and damages the engine.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Octane number', md: 'The percentage of 2,2,4-trimethylpentane (**100**) in a mixture with heptane (**0**) that knocks the same way in a test engine.' },
      ],
      lines: [
        { say: 'Knocking is the early, uneven explosion of the fuel and air in a cylinder, before the spark. It makes a metallic noise, wastes energy and damages the engine.', show: 'k' },
        { say: 'The octane number compares a petrol with two standards: two two four trimethylpentane, given one hundred, and heptane, given zero. A petrol that knocks like a mix of ninety-five percent of the first and five percent heptane has an octane number of ninety-five.', caption: 'The octane number compares a petrol with two standards: 2,2,4-trimethylpentane, given 100, and heptane, given 0. A petrol that knocks like a mix of 95% of the first and 5% heptane has an octane number of 95.', show: 'def' },
      ],
    },
    {
      chapter: 'Branching the chain',
      layout: 'center',
      main: [hexaneIsomers('hx')],
      lines: [
        { say: 'Branched, cyclic and aromatic hydrocarbons burn more smoothly than straight chains, so they have higher octane numbers. Here is hexane, a straight chain.', show: 'hx' },
        { say: 'Move one carbon into a branch, and it becomes methylpentane, with the same formula.', play: 'hx.one' },
        { say: 'Move another, and it is dimethylbutane, more compact still. Its octane number is much higher than hexane’s. Turning straight chains into branched ones like this is called isomerisation.', play: 'hx.two' },
      ],
    },
    {
      chapter: 'Cracking',
      layout: 'center',
      main: [cracking('ck', 380)],
      lines: [
        { say: 'Cracking breaks large alkanes into smaller ones, the right size for petrol, and alkenes. Here is hexane cracking into butane and ethene.', show: 'ck' },
        { say: 'One carbon to carbon bond breaks, and a hydrogen atom moves along, so the two carbons at the end share a second pair and become ethene. No atom is lost.', play: 'ck.crack' },
      ],
    },
    {
      chapter: 'Reforming and additives',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{C6H14 -> C6H6 + 4H2} \\quad \\text{(reforming)}'] },
        { kind: 'callout', id: 'w', tone: 'mistake', title: 'Lead additives', md: 'Tetraethyl lead raised the octane number, but its lead is **poisonous**, so it has been phased out. Ethanol and MTBE are used instead.' },
      ],
      lines: [
        { say: 'Reforming turns straight chains into rings and aromatic compounds over a catalyst. Hexane becomes benzene, and the hydrogen given off is useful for making ammonia.', show: 'm' },
        { say: 'Additives raise the octane number too. Tetraethyl lead was used in the past, but the lead it releases is poisonous, so it has been phased out in most countries. Oxygen-containing compounds such as ethanol are used instead.', show: 'w' },
      ],
    },
    {
      chapter: 'Petrochemicals',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['From', 'Made into'], rows: [['Ethene', 'poly(ethene), ethanol, ethane-1,2-diol'], ['Propene', 'poly(propene)'], ['Other fractions', 'detergents, solvents, drugs']] },
      ],
      lines: [
        { say: 'Petrochemicals are chemicals made from crude oil or natural gas. Ethene from cracking becomes poly ethene, ethanol and ethane-one-two-diol, and propene becomes poly propene.', caption: 'Petrochemicals are chemicals made from crude oil or natural gas. Ethene from cracking becomes poly(ethene), ethanol and ethane-1,2-diol, and propene becomes poly(propene).', show: ['t.0', 't.1'] },
        { say: 'Other fractions are made into detergents, solvents and drugs.', show: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these $\\ce{C8H18}$ isomers has the highest octane number?',
          choices: ['Octane', '2-Methylheptane', '2,2,4-Trimethylpentane', '3-Methylheptane'],
          answer: 2,
          working: 'It is the most highly branched, so it burns most smoothly; it defines an octane number of 100.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these isomers has the highest octane number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two two four trimethylpentane. It is the most highly branched, so it burns most smoothly. It is the standard given one hundred.', caption: 'The answer is C, 2,2,4-trimethylpentane. It is the most highly branched, so it burns most smoothly. It is the standard given 100.', show: 'q.answer' },
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
            'Knocking is early, uneven burning; the octane number measures resistance to it.',
            'Branched, cyclic and aromatic hydrocarbons have higher octane numbers.',
            'Reforming, isomerisation and cracking improve petrol; lead was phased out.',
            'Petrochemicals such as ethene are the raw materials for plastics.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Knocking is early, uneven burning in the engine, and the octane number measures how well a petrol resists it.', show: 'sum.0' },
        { say: 'Branched, cyclic and aromatic hydrocarbons have higher octane numbers than straight chains.', show: 'sum.1' },
        { say: 'Reforming, isomerisation and cracking improve petrol, and lead additives were phased out because lead is poisonous.', show: 'sum.2' },
        { say: 'And petrochemicals such as ethene are the raw materials for plastics and many other products.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
