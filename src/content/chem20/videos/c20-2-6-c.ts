import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { container, frame, tag } from './lib/c20-2b-figures.ts';

// One mole each of four gases at STP: the same volume and number of molecules, different masses.
const GASES = [
  { id: 'h2', molecule: 'H2', tex: '\\begin{gathered}\\ce{H2}\\\\ 2.02\\ \\text{g}\\end{gathered}' },
  { id: 'n2', molecule: 'N2', tex: '\\begin{gathered}\\ce{N2}\\\\ 28.02\\ \\text{g}\\end{gathered}' },
  { id: 'o2', molecule: 'O2', tex: '\\begin{gathered}\\ce{O2}\\\\ 32.00\\ \\text{g}\\end{gathered}' },
  { id: 'co2', molecule: 'CO2', tex: '\\begin{gathered}\\ce{CO2}\\\\ 44.01\\ \\text{g}\\end{gathered}' },
] as const;
const moles = figure(
  'g',
  GASES.flatMap((g, i) => [
    container({ name: g.id, at: [i * 5.2, 0], w: 4.2, h: 4.2, molecule: g.molecule, count: 4, seed: 11 + i }),
    tag(`${g.id}-label`, [i * 5.2 + 2.1, -0.3], g.tex, { place: 'below', group: `${g.id}-mass` }),
  ]).concat(frame('room', [0, -1.6], [19.8, -1.6])),
  380,
);

const video: Explainer = {
  id: 'c20-2-6-c',
  lessonId: 'c20-2-6',
  title: "Avogadro's Law and Molar Volume, Part 3: Moles and Molar Volume",
  thumbnailTitle: 'Moles and Molar Volume',
  thumbnail: 'g',
  summary:
    'A mole is about 6.02 × 10²³ particles, and the molar mass M is the mass of one mole, so n = m/M; oxygen gas is O₂, so 16.0 g of it is 0.500 mol. The molar volume of a gas is the volume of one mole: 22.4 L/mol at STP (0 °C and 101.325 kPa) and 24.8 L/mol at SATP (25 °C and 100 kPa), the same for every gas, though their masses differ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 3', title: 'Moles and Molar Volume', subtitle: 'One mole of any gas' }],
      lines: [
        { say: 'Avogadro’s law counts gas in moles.', show: 'title' },
        { say: 'In this part, you will recap the mole, then meet the molar volume: the volume of one mole of any gas.' },
      ],
    },
    {
      chapter: 'The mole',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mole', tone: 'definition', title: 'Mole', md: 'The **mole** (mol) is the unit of **amount of substance**. One mole of anything contains about $6.02 \\times 10^{23}$ particles: **Avogadro’s number**.' },
        { kind: 'callout', id: 'mm', tone: 'definition', title: 'Molar mass', md: 'The **molar mass**, $M$, is the mass of one mole, in $\\text{g/mol}$: add up the molar masses of the atoms in the formula. Then $n = \\dfrac{m}{M}$.' },
      ],
      lines: [
        { say: 'Particles are far too small and too many to count one by one, so chemists count them in huge bundles called moles, as eggs are counted in dozens.', show: 'mole' },
        { say: 'One mole of anything contains about six point zero two times ten to the twenty-third particles: Avogadro’s number.', caption: 'One mole of anything contains about 6.02 × 10²³ particles: Avogadro’s number.' },
        { say: 'The molar mass is the mass of one mole, in grams per mole. The amount in moles is the mass divided by the molar mass.', show: 'mm' },
      ],
    },
    {
      chapter: 'From mass to moles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many moles are in $16.0\\ \\text{g}$ of oxygen gas, $\\ce{O2}$? Use the molar mass O $16.00\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['M = 2 \\times 16.00 = 32.00\\ \\text{g/mol}', 'n = \\dfrac{m}{M} = \\dfrac{16.0\\ \\text{g}}{32.00\\ \\text{g/mol}} = \\good{0.500\\ \\text{mol}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Diatomic gases', md: 'Hydrogen, nitrogen, oxygen and chlorine are two-atom molecules: $\\ce{H2}$, $\\ce{N2}$, $\\ce{O2}$ and $\\ce{Cl2}$. Chlorine gas is $2 \\times 35.45 = 70.90\\ \\text{g/mol}$. Noble gases, such as $\\ce{He}$ and $\\ce{Ar}$, are single atoms.' },
      ],
      lines: [
        { say: 'How many moles are in sixteen point zero grams of oxygen gas?', caption: 'How many moles are in 16.0 g of oxygen gas?', show: 'q' },
        { say: 'Oxygen gas is made of O two molecules, so its molar mass is two times sixteen point zero zero, or thirty-two point zero zero grams per mole.', caption: 'Oxygen gas is made of O₂ molecules, so its molar mass is 2 × 16.00, or 32.00 g/mol.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the mass by the molar mass: zero point five zero zero moles.', caption: 'Divide the mass by the molar mass: 0.500 mol.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Watch out: hydrogen, nitrogen, oxygen and chlorine gases are two-atom molecules, so chlorine gas is seventy point nine zero grams per mole. Noble gases, such as helium and argon, are single atoms.',
          caption: 'Watch out: hydrogen, nitrogen, oxygen and chlorine gases are two-atom molecules, so chlorine gas is 70.90 g/mol. Noble gases, such as helium and argon, are single atoms.',
          show: 'oops',
          focus: 'm',
        },
      ],
    },
    {
      chapter: 'Molar volume',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Molar volume', md: 'The **molar volume**, $V_m$, is the volume of one mole of a gas at a stated temperature and pressure, in $\\text{L/mol}$. It is the same for **every** gas.' },
        {
          kind: 'table',
          id: 't',
          head: ['Conditions', 'Temperature', 'Pressure', 'Molar volume'],
          rows: [
            ['STP', '$0^\\circ\\text{C}$', '$101.325\\ \\text{kPa}$', '$22.4\\ \\text{L/mol}$'],
            ['SATP', '$25^\\circ\\text{C}$', '$100\\ \\text{kPa}$', '$24.8\\ \\text{L/mol}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['22.4 \\times \\dfrac{298.15}{273.15} \\times \\dfrac{101.325}{100} = 24.8\\ \\text{L}'] },
      ],
      lines: [
        { say: 'Equal volumes hold equal numbers of particles. So one mole of any gas takes up the same volume at a given temperature and pressure: the molar volume, in litres per mole.', show: 'def' },
        {
          say: 'S T P, standard temperature and pressure, is zero degrees Celsius and one hundred one point three two five kilopascals. There, the molar volume is twenty-two point four litres per mole.',
          caption: 'STP, standard temperature and pressure, is 0°C and 101.325 kPa. There, the molar volume is 22.4 L/mol.',
          show: 't.0',
          focus: 't.0',
        },
        {
          say: 'S A T P, standard ambient temperature and pressure, is twenty-five degrees Celsius and one hundred kilopascals. There, the molar volume is twenty-four point eight litres per mole.',
          caption: 'SATP, standard ambient temperature and pressure, is 25°C and 100 kPa. There, the molar volume is 24.8 L/mol.',
          show: 't.1',
          focus: 't.1',
        },
        { say: 'It is larger at S A T P because the gas is warmer and under slightly less pressure. The combined gas law confirms it.', caption: 'It is larger at SATP because the gas is warmer and under slightly less pressure. The combined gas law confirms it.', show: 'm', focus: 'm' },
        { say: 'Some books define S T P slightly differently, so always use the conditions a question gives you.', caption: 'Some books define STP slightly differently, so always use the conditions a question gives you.', focus: 't' },
      ],
    },
    {
      chapter: 'Same volume, different masses',
      layout: 'center',
      main: [moles, { kind: 'text', id: 'k', size: 'md', md: 'At STP, one mole of each gas fills $22.4\\ \\text{L}$.' }],
      lines: [
        { say: 'So at S T P, one mole of hydrogen, nitrogen, oxygen or carbon dioxide fills twenty-two point four litres, with the same number of molecules.', caption: 'So at STP, one mole of hydrogen, nitrogen, oxygen or carbon dioxide fills 22.4 L, with the same number of molecules.', show: ['g.h2-box', 'g.h2-p', 'g.n2-box', 'g.n2-p', 'g.o2-box', 'g.o2-p', 'g.co2-box', 'g.co2-p', 'k'] },
        { say: 'The volumes are the same, but the masses are not: from two point zero two grams for hydrogen, to forty-four point zero one grams for carbon dioxide.', caption: 'The volumes are the same, but the masses are not: from 2.02 g for hydrogen, to 44.01 g for carbon dioxide.', show: ['g.h2-mass', 'g.n2-mass', 'g.o2-mass', 'g.co2-mass'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the mass and the volume of $1.00\\ \\text{mol}$ of nitrogen gas, $\\ce{N2}$, at STP? Use the molar mass N $14.01\\ \\text{g/mol}$. At STP ($0^\\circ\\text{C}$ and $101.325\\ \\text{kPa}$), the molar volume of a gas is $22.4\\ \\text{L/mol}$.',
          choices: ['$28.02\\ \\text{g}$ and $22.4\\ \\text{L}$', '$14.01\\ \\text{g}$ and $22.4\\ \\text{L}$', '$28.02\\ \\text{g}$ and $24.8\\ \\text{L}$', '$14.01\\ \\text{g}$ and $11.2\\ \\text{L}$'],
          answer: 0,
          working: 'Nitrogen gas is $\\ce{N2}$: $M = 2 \\times 14.01 = 28.02\\ \\text{g/mol}$. One mole of any gas at STP fills $22.4\\ \\text{L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the mass and the volume of one mole of nitrogen gas, at S T P? Pause the video and try it.', caption: 'Your turn. What are the mass and the volume of 1.00 mol of nitrogen gas, at STP? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is A. Nitrogen gas is N two, so one mole has a mass of twenty-eight point zero two grams, and at S T P it fills twenty-two point four litres. Choice B forgets the two atoms in each molecule.',
          caption: 'The answer is A. Nitrogen gas is N₂, so one mole has a mass of 28.02 g, and at STP it fills 22.4 L. Choice B forgets the two atoms in each molecule.',
          show: 'q.answer',
        },
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
            'A **mole** is about $6.02 \\times 10^{23}$ particles, and $n = \\dfrac{m}{M}$.',
            'Hydrogen, nitrogen, oxygen and chlorine gases are two-atom molecules.',
            'Molar volume: $22.4\\ \\text{L/mol}$ at STP ($0^\\circ\\text{C}$, $101.325\\ \\text{kPa}$) and $24.8\\ \\text{L/mol}$ at SATP ($25^\\circ\\text{C}$, $100\\ \\text{kPa}$).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A mole is about six point zero two times ten to the twenty-third particles, and the amount is the mass divided by the molar mass.', caption: 'Let’s sum up. A mole is about 6.02 × 10²³ particles, and the amount is the mass divided by the molar mass.', show: 'sum.0' },
        { say: 'Hydrogen, nitrogen, oxygen and chlorine gases are two-atom molecules.', show: 'sum.1' },
        { say: 'The molar volume is twenty-two point four litres per mole at S T P, and twenty-four point eight at S A T P. In part four, you will put it to use. See you there!', caption: 'The molar volume is 22.4 L/mol at STP, and 24.8 L/mol at SATP. In part four, you will put it to use. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
