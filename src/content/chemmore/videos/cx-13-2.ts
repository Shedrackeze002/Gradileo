import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';
import { haber } from './lib/cx-molecules.ts';

const video: Explainer = {
  id: 'cx-13-2',
  lessonId: 'cx-13-2',
  title: 'The Laws of Chemical Combination',
  thumbnail: 'w',
  summary:
    'Mass is conserved in every reaction, so an apparent gain or loss is a gas joining or leaving. A pure compound always has the same composition by mass. When two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a simple ratio, and reacting gas volumes are in the ratio of the coefficients at the same temperature and pressure.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Measurement, Chemical Laws and Orbitals', title: 'The Laws of Chemical Combination', subtitle: 'Patterns that pointed to atoms' }],
      lines: [
        { say: 'Long before anyone could see an atom, chemists weighed what went into a reaction and what came out, and found patterns that never failed.', show: 'title' },
        { say: 'In this lesson, you will use four of those laws: conservation of mass, constant composition, multiple proportions and combining volumes.' },
      ],
    },
    {
      chapter: 'Every atom is kept',
      layout: 'center',
      main: [reaction('w', { from: [{ t: 'H2', n: 2 }, { t: 'O2' }], to: [{ t: 'H2O', n: 2 }], counts: true })],
      lines: [
        { say: 'Here are two hydrogen molecules and one oxygen molecule, with the atoms of each element counted.', show: 'w' },
        { say: 'Watch them react. The bonds break, and the same atoms join up again as two water molecules.', play: 'w.go' },
        { say: 'Four hydrogen atoms and two oxygen atoms before, and the same after. No atom is made or lost, so the mass of the products equals the mass of the reactants. That is the law of conservation of mass.' },
      ],
    },
    {
      chapter: 'Mass and composition',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'gas', tone: 'key', title: 'Apparent changes in mass', md: 'Heated calcium carbonate **loses** mass as carbon dioxide escapes. Burning magnesium **gains** mass as oxygen joins it.' },
        { kind: 'callout', id: 'cc', tone: 'definition', title: 'Constant composition', md: 'A pure compound always contains the same elements in the same proportions by mass, however it is made.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{O} : \\text{H} = 16.0 : 2.00 = 8 : 1', '5.00 \\times 8 = 40.0\\ \\text{g of oxygen}'] },
      ],
      lines: [
        { say: 'When a reaction seems to gain or lose mass, a gas has joined or left. Heated calcium carbonate loses mass as carbon dioxide escapes, and burning magnesium gains mass as oxygen joins it.', show: 'gas' },
        { say: 'The law of constant composition says a pure compound always has the same elements in the same proportions by mass, however it is made.', show: 'cc' },
        { say: 'Water contains two point zero zero grams of hydrogen for every sixteen point zero grams of oxygen, a ratio of eight to one. So with five point zero zero grams of hydrogen, there are forty point zero grams of oxygen.', caption: 'Water contains 2.00 g of hydrogen for every 16.0 g of oxygen, a ratio of 8 : 1. So with 5.00 g of hydrogen, there are 40.0 g of oxygen.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Multiple proportions',
      layout: 'center',
      main: [
        reaction('co', { from: [{ t: 'C', n: 2 }, { t: 'O2' }], to: [{ t: 'CO', n: 2 }], foot: { after: '12 g of carbon : 16 g of oxygen' }, height: 300 }),
        reaction('co2', { from: [{ t: 'C' }, { t: 'O2' }], to: [{ t: 'CO2' }], foot: { after: '12 g of carbon : 32 g of oxygen' }, height: 260 }),
      ],
      lines: [
        { say: 'Carbon and oxygen make two compounds. In carbon monoxide, each carbon atom takes one oxygen atom.', show: 'co', play: 'co.go' },
        { say: 'In carbon dioxide, each carbon atom takes two.', show: 'co2', play: 'co2.go' },
        { say: 'So twelve grams of carbon combines with sixteen grams of oxygen in one, and thirty-two grams in the other. Sixteen to thirty-two is one to two, a simple whole-number ratio. That is the law of multiple proportions.', caption: 'So 12 g of carbon combines with 16 g of oxygen in one, and 32 g in the other. 16 : 32 is 1 : 2, a simple whole-number ratio. That is the law of multiple proportions.' },
      ],
    },
    {
      chapter: 'Combining volumes',
      layout: 'center',
      main: [haber('hb'), { kind: 'math', id: 'v', size: 'md', lines: ['20\\ \\text{cm}^3 + 60\\ \\text{cm}^3 \\rightarrow 40\\ \\text{cm}^3'] }],
      lines: [
        { say: 'Gases react in simple volume ratios too. One nitrogen molecule and three hydrogen molecules make two ammonia molecules.', show: 'hb', play: 'hb.go' },
        { say: 'Equal volumes of gases at the same temperature and pressure hold equal numbers of molecules. So twenty cubic centimetres of nitrogen reacts with sixty of hydrogen, and gives forty of ammonia. That is Gay-Lussac’s law of combining volumes.', caption: 'Equal volumes of gases at the same temperature and pressure hold equal numbers of molecules. So 20 cm³ of nitrogen reacts with 60 cm³ of hydrogen, and gives 40 cm³ of ammonia. That is Gay-Lussac’s law of combining volumes.', show: 'v', focus: 'v' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Liquids do not count', md: 'Volume ratios apply only to **gases**. Water formed as a liquid at room temperature takes up almost no volume.' }],
      lines: [
        { say: 'Here is a common mistake: using a volume for a liquid. The ratios only apply to gases. Water formed as a liquid at room temperature takes up almost no volume, so leave it out.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Methane burns: $\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$. What volume of oxygen reacts with $30\\ \\text{cm}^3$ of methane?',
          choices: ['$15\\ \\text{cm}^3$', '$30\\ \\text{cm}^3$', '$90\\ \\text{cm}^3$', '$60\\ \\text{cm}^3$'],
          answer: 3,
          working: 'The ratio of methane to oxygen is $1 : 2$, so $30 \\times 2 = 60\\ \\text{cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Methane burns: C H four, plus two O two, gives C O two, plus two H two O. What volume of oxygen reacts with thirty cubic centimetres of methane? Pause the video and try it.', caption: 'Your turn. Methane burns: CH₄ + 2O₂ → CO₂ + 2H₂O. What volume of oxygen reacts with 30 cm³ of methane? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Methane and oxygen react in the ratio one to two, so thirty cubic centimetres of methane needs sixty of oxygen.', caption: 'The answer is D. Methane and oxygen react in the ratio 1 : 2, so 30 cm³ of methane needs 60 cm³ of oxygen.', show: 'q.answer' },
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
            'Mass is conserved; apparent changes come from gases joining or leaving.',
            'A pure compound always has the same composition by mass.',
            'Multiple proportions: masses combining with a fixed mass are in a simple ratio.',
            'Reacting gas volumes are in the ratio of the coefficients.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Mass is conserved in every reaction, and an apparent change comes from a gas joining or leaving.', show: 'sum.0' },
        { say: 'A pure compound always has the same composition by mass.', show: 'sum.1' },
        { say: 'When two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a simple ratio.', show: 'sum.2' },
        { say: 'And the volumes of reacting gases are in the ratio of the coefficients, at the same temperature and pressure.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
