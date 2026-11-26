import type { Explainer } from '@/video/script.ts';
import { sparkedHydrogen } from '../../chem10/videos/lib/c10-particles.ts';
import { oxideInWater } from './lib/cx-molecules.ts';

const video: Explainer = {
  id: 'cx-17-1',
  lessonId: 'cx-17-1',
  title: 'Hydrogen, Oxygen and the Classes of Oxides',
  thumbnail: 'sy',
  summary:
    'Hydrogen is made from zinc and dilute acid, burns with a pop to form water, and reduces hot copper(II) oxide. Oxygen is made from hydrogen peroxide with manganese(IV) oxide, and in industry from liquid air; it relights a glowing splint. At room temperature and pressure a mole of gas occupies 24 dm³. Oxides are acidic, basic, amphoteric (ZnO, Al₂O₃, PbO) or neutral (CO, NO, N₂O).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-metals and Their Compounds', title: 'Hydrogen, Oxygen and the Classes of Oxides', subtitle: 'Two elements that make water' }],
      lines: [
        { say: 'Hydrogen is the lightest element, and oxygen the most abundant in the Earth’s crust. Together, they make water.', show: 'title' },
        { say: 'In this lesson, you will describe hydrogen and oxygen, calculate a volume of hydrogen, and sort oxides into four classes.' },
      ],
    },
    {
      chapter: 'Hydrogen burns',
      layout: 'center',
      main: [sparkedHydrogen('sy')],
      lines: [
        { say: 'Here are hydrogen molecules and oxygen molecules, up close.', show: ['sy', 'sy.labels', 'sy.key', 'sy.thermo'] },
        { say: 'A spark sets them off. The atoms swap partners and join as water, and each reaction gives out heat that sets off the next. In a test tube, that is the squeaky pop.', show: 'sy.tally', play: 'sy.spark' },
      ],
    },
    {
      chapter: 'Hydrogen',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reducing agent', md: 'A substance that removes oxygen from another (or gives it electrons). Hydrogen reduces the oxides of metals low in the reactivity series.' },
        { kind: 'math', id: 'e', size: 'md', lines: ['\\ce{CuO + H2 -> Cu + H2O}'] },
        { kind: 'math', id: 'v', size: 'md', lines: ['\\ce{Mg + 2HCl -> MgCl2 + H2}', '2.4 \\div 24 = 0.10\\ \\text{mol} \\quad\\Rightarrow\\quad 0.10 \\times 24 = 2.4\\ \\text{dm}^3'] },
      ],
      lines: [
        { say: 'Hydrogen is made in the laboratory from zinc and dilute hydrochloric acid. It is a reducing agent: passed over hot copper two oxide, it takes the oxygen and leaves copper.', caption: 'Hydrogen is made in the laboratory from zinc and dilute hydrochloric acid. It is a reducing agent: passed over hot copper(II) oxide, it takes the oxygen and leaves copper.', show: ['def', 'e'] },
        { say: 'How much hydrogen does two point four grams of magnesium give with excess acid? That is zero point one zero moles of magnesium, which gives zero point one zero moles of hydrogen. At room temperature and pressure a mole of gas fills twenty-four cubic decimetres, so that is two point four cubic decimetres.', caption: 'How much hydrogen does 2.4 g of magnesium give with excess acid? That is 0.10 mol of magnesium, which gives 0.10 mol of hydrogen. At room temperature and pressure a mole of gas fills 24 dm³, so that is 2.4 dm³.', show: 'v', focus: 'v' },
      ],
    },
    {
      chapter: 'Oxygen',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Laboratory: hydrogen peroxide with a **manganese(IV) oxide** catalyst.', 'Industry: **fractional distillation** of liquid air.', 'Test: relights a **glowing splint**.', 'Uses: hospitals, welding, steelmaking.'],
        },
      ],
      lines: [
        { say: 'Oxygen is made in the laboratory by breaking down hydrogen peroxide, with manganese four oxide as a catalyst, and in industry by the fractional distillation of liquid air.', caption: 'Oxygen is made in the laboratory by breaking down hydrogen peroxide, with manganese(IV) oxide as a catalyst, and in industry by the fractional distillation of liquid air.', show: ['b.0', 'b.1'] },
        { say: 'It relights a glowing splint, and it is used in hospitals, for welding and in making steel.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'A basic oxide in water',
      layout: 'center',
      main: [oxideInWater('ox')],
      lines: [
        { say: 'Here is sodium oxide, a metal oxide, meeting water. Its oxide ion meets a water molecule.', show: 'ox' },
        { say: 'The oxide ion takes a hydrogen ion from the water, and both become hydroxide ions. So the solution is alkaline: sodium oxide is a basic oxide.', play: 'ox.go' },
      ],
    },
    {
      chapter: 'Four classes of oxide',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Class', 'Reacts with', 'Examples'],
          rows: [['Acidic', 'alkalis', 'CO₂, SO₂, NO₂'], ['Basic', 'acids', 'Na₂O, CaO, CuO'], ['Amphoteric', 'both', 'ZnO, Al₂O₃, PbO'], ['Neutral', 'neither', 'CO, NO, N₂O']],
        },
        { kind: 'math', id: 'z', size: 'md', lines: ['\\ce{ZnO + 2HCl -> ZnCl2 + H2O}', '\\ce{ZnO + 2NaOH -> Na2ZnO2 + H2O}'] },
      ],
      lines: [
        { say: 'Most non-metal oxides are acidic: they react with alkalis, and many dissolve to form acids. Most metal oxides are basic: they react with acids to form a salt and water.', show: ['t.0', 't.1'] },
        { say: 'Amphoteric oxides, like zinc oxide, react with both. Zinc oxide makes zinc chloride with hydrochloric acid, and sodium zincate with sodium hydroxide.', show: ['t.2', 'z'], focus: ['t.2', 'z'] },
        { say: 'And neutral oxides, like carbon monoxide, react with neither.', show: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which oxide reacts with both hydrochloric acid and sodium hydroxide solution?',
          choices: ['$\\ce{CaO}$', '$\\ce{Al2O3}$', '$\\ce{CO}$', '$\\ce{SO2}$'],
          answer: 1,
          working: 'Aluminium oxide is amphoteric: it reacts with both acids and alkalis.',
        },
      ],
      lines: [
        { say: 'Your turn. Which oxide reacts with both hydrochloric acid and sodium hydroxide solution? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, aluminium oxide. It is amphoteric. Calcium oxide is basic, sulfur dioxide is acidic, and carbon monoxide is neutral.', show: 'q.answer' },
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
            'Hydrogen: zinc and dilute acid; burns with a pop; reduces hot CuO.',
            'Oxygen: H₂O₂ and MnO₂, or liquid air; relights a glowing splint.',
            'Volume of gas = moles × 24 dm³ at room temperature and pressure.',
            'Oxides are acidic, basic, amphoteric or neutral.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Hydrogen is made from zinc and dilute acid, burns with a pop, and reduces hot copper two oxide.', caption: 'Let’s sum up. Hydrogen is made from zinc and dilute acid, burns with a pop, and reduces hot copper(II) oxide.', show: 'sum.0' },
        { say: 'Oxygen comes from hydrogen peroxide or liquid air, and relights a glowing splint.', show: 'sum.1' },
        { say: 'A volume of gas at room temperature and pressure is the number of moles times twenty-four cubic decimetres.', show: 'sum.2' },
        { say: 'And oxides are acidic, basic, amphoteric or neutral.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
