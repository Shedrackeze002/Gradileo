import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balls, frame, pair, tag, water } from './lib/c10-5-figures.ts';

// One water molecule, large, with its atoms counted.
const molecule = figure('w', [
  balls({ balls: water('m', [0, 0], 2.2), scale: 2.2 }),
  tag('o-count', [0, 1.2], '\\text{1 oxygen atom}', { place: 'above', tone: 'bad' }),
  tag('h-count', [0, -2.0], '\\text{2 hydrogen atoms}', { place: 'below' }),
  frame('room', [-2.6, -2.4], [2.6, 1.6]),
]);

// A molecule of oxygen gas: two oxygen atoms.
const oxygen = figure('o', [
  balls({ balls: pair('o2', 'O', 'O', [0, 0], { gap: 1.5 }), scale: 2 }),
  tag('name', [0, -1.15], '\\text{one } \\ce{O2} \\text{ molecule}', { place: 'below' }),
  tag('atoms', [0, 1.15], '\\text{2 oxygen atoms}', { place: 'above', tone: 'bad' }),
  frame('room', [-2.4, -1.8], [2.4, 1.8]),
]);

const video: Explainer = {
  id: 'c10-5-1-b',
  lessonId: 'c10-5-1',
  title: 'The Mole and Molar Mass, Part 2: Particles to Moles, Atoms in Molecules',
  thumbnailTitle: 'Particles to Moles',
  thumbnail: 'w',
  summary:
    'To change a number of particles into moles, divide by Avogadro’s number, 6.02 × 10²³, using the calculator’s exponent key. A molecule is made of atoms, so a mole of molecules holds more atoms: 1 mol of water holds 2 mol of hydrogen atoms. If a question asks for atoms, multiply by the number of those atoms in one molecule.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 2', title: 'Particles to Moles, Atoms in Molecules', subtitle: 'Dividing by Avogadro’s number' }],
      lines: [
        { say: 'In part one, you changed moles into particles, by multiplying by Avogadro’s number.', show: 'title' },
        { say: 'In this part, you will go the other way, from particles to moles. Then you will count the atoms inside molecules, where many mistakes happen.' },
      ],
    },
    {
      chapter: 'Particles to moles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A piece of iron contains $9.03 \\times 10^{23}$ iron atoms. How many moles of iron is that, to the nearest hundredth?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['n = \\dfrac{N}{6.02 \\times 10^{23}} = \\dfrac{9.03 \\times \\cancel{10^{23}}}{6.02 \\times \\cancel{10^{23}}}', '= \\dfrac{9.03}{6.02} = 1.5', 'n = \\good{1.50\\ \\text{mol}}'],
        },
      ],
      lines: [
        {
          say: 'A piece of iron contains nine point zero three times ten to the twenty-third iron atoms. How many moles of iron is that, to the nearest hundredth?',
          caption: 'A piece of iron contains 9.03 × 10²³ iron atoms. How many moles of iron is that, to the nearest hundredth?',
          show: 'q',
        },
        { say: 'We have particles, and we want moles. So divide the number of atoms by Avogadro’s number.', show: 'm.0', focus: 'm.0' },
        { say: 'The powers of ten are the same, so they cancel. That leaves nine point zero three divided by six point zero two, which is one point five.', caption: 'The powers of ten are the same, so they cancel. That leaves 9.03 ÷ 6.02, which is 1.5.', show: 'm.1', focus: 'm.1' },
        { say: 'So there are one point five zero moles. That makes sense: there are more atoms than in one mole, so it is more than one mole.', caption: 'So there are 1.50 mol. That makes sense: there are more atoms than in one mole, so it is more than one mole.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'On a calculator',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'calc', id: 'calc', keys: '9.03 EXP 23 ÷ 6.02 EXP 23', result: '1.5' }],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Powers of ten on a calculator', md: 'Enter $6.02 \\times 10^{23}$ with the **exponent key**, often marked EXP, EE or $\\times 10^x$: type 6.02, the exponent key, then 23.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Typing the times sign', md: 'Typing $\\div\\, 6.02 \\times 10^{23}$ divides by $6.02$, then **multiplies** by $10^{23}$: you get $1.5 \\times 10^{46}$. Use the exponent key, or put brackets round the whole number.' },
      ],
      lines: [
        { say: 'On a calculator, enter Avogadro’s number with the exponent key. It is often marked E X P, or E E. Type six point zero two, the exponent key, then twenty-three.', caption: 'On a calculator, enter Avogadro’s number with the exponent key. It is often marked EXP, or EE. Type 6.02, the exponent key, then 23.', show: ['tip', 'calc'] },
        {
          say: 'Do not type the times sign. Then the calculator divides by six point zero two, and multiplies by ten to the twenty-third, giving one point five times ten to the forty-sixth.',
          caption: 'Do not type the times sign. Then the calculator divides by 6.02, and multiplies by 10²³, giving 1.5 × 10⁴⁶.',
          show: 'oops',
        },
        { say: 'So use the exponent key, or put brackets round the whole number.' },
      ],
    },
    {
      chapter: 'Atoms inside molecules',
      layout: 'split',
      leftWidth: 440,
      left: [molecule],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$\\ce{H2O}$', 'H atoms', 'O atoms', 'All atoms'],
          rows: [
            ['1 molecule', '$2$', '$1$', '$3$'],
            ['1 mol', '$2\\ \\text{mol}$', '$1\\ \\text{mol}$', '$3\\ \\text{mol}$'],
          ],
        },
      ],
      lines: [
        { say: 'A molecule is made of atoms, so a mole of molecules holds even more atoms.', show: 'w.m' },
        { say: 'One molecule of water, H two O, has two hydrogen atoms and one oxygen atom: three atoms in all.', caption: 'One molecule of water, H₂O, has two hydrogen atoms and one oxygen atom: three atoms in all.', show: ['w.o-count', 'w.h-count', 't.0'], focus: 't.0' },
        { say: 'So one mole of water molecules holds two moles of hydrogen atoms, and one mole of oxygen atoms. That is three moles of atoms in all.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Hydrogen atoms in water',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many hydrogen atoms are in $2\\ \\text{mol}$ of water, $\\ce{H2O}$? Give the answer in scientific notation to three significant figures.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{H atoms: } 2 \\times 2 = 4\\ \\text{mol}', 'N = 4 \\times 6.02 \\times 10^{23} = 24.08 \\times 10^{23}', '= 2.408 \\times 10^{24} \\approx \\good{2.41 \\times 10^{24}} \\text{ hydrogen atoms}'],
        },
      ],
      lines: [
        { say: 'How many hydrogen atoms are in two moles of water? Give the answer in scientific notation, to three significant figures.', show: 'q' },
        { say: 'Each water molecule has two hydrogen atoms. So two moles of water hold two times two, which is four moles of hydrogen atoms.', show: 'm.0', focus: 'm.0' },
        { say: 'Now multiply by Avogadro’s number. Four times six point zero two is twenty-four point zero eight.', caption: 'Now multiply by Avogadro’s number. 4 × 6.02 = 24.08.', show: 'm.1', focus: 'm.1' },
        { say: 'Move the decimal point one place left, and add one to the power. To three significant figures, that is two point four one times ten to the twenty-fourth hydrogen atoms.', caption: 'Move the decimal point one place left, and add one to the power. To three significant figures, that is 2.41 × 10²⁴ hydrogen atoms.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Molecules or atoms?',
      layout: 'split',
      left: [oxygen],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Molecules or atoms?', md: 'One mole of oxygen gas, $\\ce{O2}$, is $6.02 \\times 10^{23}$ **molecules**, but each molecule has 2 atoms, so it is $2 \\times 6.02 \\times 10^{23} = 1.20 \\times 10^{24}$ oxygen **atoms**.' },
      ],
      lines: [
        { say: 'Read each question carefully. One mole of oxygen gas, O two, is six point zero two times ten to the twenty-third molecules.', caption: 'Read each question carefully. One mole of oxygen gas, O₂, is 6.02 × 10²³ molecules.', show: ['o.o2', 'o.name'] },
        {
          say: 'But each molecule has two oxygen atoms. So it holds two times six point zero two times ten to the twenty-third oxygen atoms: one point two zero times ten to the twenty-fourth.',
          caption: 'But each molecule has two oxygen atoms. So it holds 2 × 6.02 × 10²³ oxygen atoms: 1.20 × 10²⁴.',
          show: ['o.atoms', 'oops'],
          focus: 'o.o2',
        },
        { say: 'If a question asks for atoms, multiply by the number of those atoms in one molecule.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many atoms in total are in $0.5\\ \\text{mol}$ of carbon dioxide, $\\ce{CO2}$? One mole holds $6.02 \\times 10^{23}$ particles.',
          choices: ['$3.01 \\times 10^{23}$', '$6.02 \\times 10^{23}$', '$1.81 \\times 10^{24}$', '$9.03 \\times 10^{23}$'],
          answer: 3,
          working: 'Each $\\ce{CO2}$ molecule has 1 C and 2 O: 3 atoms. Moles of atoms: $3 \\times 0.5 = 1.5\\ \\text{mol}$, so $N = 1.5 \\times 6.02 \\times 10^{23} = 9.03 \\times 10^{23}$ atoms.',
        },
      ],
      lines: [
        { say: 'Your turn. How many atoms in total are in zero point five moles of carbon dioxide, C O two? Pause the video and try it.', caption: 'Your turn. How many atoms in total are in 0.5 mol of carbon dioxide, CO₂? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is D. Each molecule has three atoms, so there are one point five moles of atoms, and one point five times six point zero two is nine point zero three. Choice A counts the molecules, not the atoms.',
          caption: 'The answer is D. Each molecule has three atoms, so there are 1.5 mol of atoms, and 1.5 × 6.02 = 9.03. Choice A counts the molecules, not the atoms.',
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
            'Particles to moles: $n = \\dfrac{N}{6.02 \\times 10^{23}}$.',
            'On a calculator, use the exponent key, or brackets round $6.02 \\times 10^{23}$.',
            'A mole of molecules holds more atoms: $1\\ \\text{mol}$ of $\\ce{H2O}$ holds $2\\ \\text{mol}$ of hydrogen atoms.',
            'For atoms, multiply by the number of those atoms in one molecule.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To change particles into moles, divide by Avogadro’s number.', show: 'sum.0' },
        { say: 'On a calculator, use the exponent key.', show: 'sum.1' },
        { say: 'A mole of molecules holds more atoms: a mole of water holds two moles of hydrogen atoms.', show: 'sum.2' },
        { say: 'For atoms, multiply by the number in one molecule. In part three, you will find the mass of one mole: the molar mass. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
