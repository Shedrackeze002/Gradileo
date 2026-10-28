import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { balls, flow, tag, water, type Ball } from './lib/c10-5-figures.ts';

// Iron atoms in rows, three water molecules, and sodium chloride with one formula unit ringed.
const iron: Ball[] = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ({ id: `fe${i}${j}`, el: 'Fe', at: [i * 0.86, j * 0.86] as [number, number], group: 'iron' })));
const salt: Ball[] = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ({ id: `s${i}${j}`, el: (i + j) % 2 ? 'Cl' : 'Na', at: [9 + i * 0.97, j * 0.97] as [number, number], group: 'salt' })));
const ringed: Part = { points: {}, items: [] };
for (let i = 0; i <= 32; i++) {
  const a = (2 * Math.PI * i) / 32;
  ringed.points[`u${i}`] = [9.485 + 1.12 * Math.cos(a), 0.66 * Math.sin(a)];
}
ringed.items.push({ kind: 'curve', id: 'unit', points: Array.from({ length: 32 }, (_, i) => `u${i}`), closed: true, tone: 'theta', dashed: true, weight: 3 });
const kinds = figure('k', [
  balls({ balls: [...iron, ...water('w1', [4.4, 1.6], 1, 'water'), ...water('w2', [6.45, 1.4], 1, 'water'), ...water('w3', [5.0, 0.15], 1, 'water'), ...salt] }),
  ringed,
  tag('iron-name', [0.86, -0.75], '\\begin{gathered}\\text{iron}\\\\ \\good{\\text{atoms}}\\end{gathered}', { place: 'below', group: 'iron' }),
  tag('water-name', [5.3, -0.75], '\\begin{gathered}\\text{water}\\\\ \\good{\\text{molecules}}\\end{gathered}', { place: 'below', group: 'water' }),
  tag('salt-name', [9.97, -0.75], '\\begin{gathered}\\text{sodium chloride}\\\\ \\good{\\text{formula units}}\\end{gathered}', { place: 'below', group: 'salt' }),
]);

// Moles and particles, with the way from one to the other.
const convert = figure('f', [
  flow({
    nodes: [
      { id: 'n', tex: '\\text{moles, } n', tone: 'brand' },
      { id: 'N', tex: '\\text{particles, } N', tone: 'adj' },
    ],
    arrows: [
      { id: 'times', from: 'n', to: 'N', tex: '\\times\\, 6.02 \\times 10^{23}', tone: 'good' },
      { id: 'divide', from: 'N', to: 'n', tex: '\\div\\, 6.02 \\times 10^{23}', tone: 'opp' },
    ],
    width: 3.4,
    gap: 4.6,
  }),
]);

const video: Explainer = {
  id: 'c10-5-1',
  lessonId: 'c10-5-1',
  title: 'The Mole and Molar Mass, Part 1: Counting with the Mole',
  thumbnailTitle: 'Counting with the Mole',
  thumbnail: 'k',
  summary:
    'Atoms and molecules are too small and too many to count one by one, so chemists count them in moles. One mole of anything holds 6.02 × 10²³ particles (Avogadro’s number), whether they are atoms, molecules or formula units. To change moles into particles, multiply by Avogadro’s number, and write the answer in scientific notation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 1', title: 'Counting with the Mole', subtitle: 'A chemist’s bundle of particles' }],
      lines: [
        {
          say: 'A single drop of water holds about one point seven times ten to the twenty-first molecules. Counting them at one a second would take more than fifty trillion years.',
          caption: 'A single drop of water holds about 1.7 × 10²¹ molecules. Counting them at one a second would take more than fifty trillion years.',
          show: 'title',
        },
        { say: 'Particles are far too small, and far too many, to count one by one. So chemists count them in huge bundles called moles.' },
        { say: 'In this video, you will meet the mole, and change moles into particles. Later parts count the atoms inside molecules, and find molar masses.' },
      ],
    },
    {
      chapter: 'Counting in bundles',
      layout: 'split',
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Bundle', 'How many it holds'],
          rows: [
            ['a dozen', '$12$'],
            ['a ream', '$500$'],
            ['a mole', '$6.02 \\times 10^{23}$'],
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'mole', tone: 'definition', title: 'Mole', md: 'The **mole** (symbol mol) is the unit chemists use to measure the amount of a substance. One mole of anything holds $6.02 \\times 10^{23}$ particles.' },
        { kind: 'callout', id: 'av', tone: 'definition', title: 'Avogadro’s number', md: '**Avogadro’s number** is $6.02 \\times 10^{23}$, the number of particles in one mole.' },
      ],
      lines: [
        { say: 'People already count in bundles. A dozen eggs is twelve eggs, and a ream of paper is five hundred sheets.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        {
          say: 'Particles need a much bigger bundle, the mole. One mole holds six point zero two times ten to the twenty-third particles.',
          caption: 'Particles need a much bigger bundle, the mole. One mole holds 6.02 × 10²³ particles.',
          show: 't.2',
          focus: 't.2',
        },
        { say: 'The mole is the unit chemists use to measure the amount of a substance. Its symbol is m o l.', caption: 'The mole is the unit chemists use to measure the amount of a substance. Its symbol is mol.', show: 'mole', focus: 't' },
        {
          say: 'Six point zero two times ten to the twenty-third is called Avogadro’s number, after the Italian scientist Amedeo Avogadro. Written out, it is six hundred and two, followed by twenty-one zeros.',
          caption: '6.02 × 10²³ is called Avogadro’s number, after the Italian scientist Amedeo Avogadro. Written out, it is six hundred and two, followed by twenty-one zeros.',
          show: 'av',
        },
      ],
    },
    {
      chapter: 'Atoms, molecules and formula units',
      layout: 'center',
      main: [kinds],
      lines: [
        { say: 'What the particles are depends on the substance.' },
        { say: 'Iron and helium are made of atoms, so a mole of iron is Avogadro’s number of iron atoms.', show: 'k.iron', focus: 'k.iron' },
        { say: 'Water and carbon dioxide are made of molecules, so a mole of water is that many water molecules.', show: 'k.water', focus: 'k.water' },
        { say: 'An ionic compound, such as sodium chloride, is counted in formula units: the smallest group of ions its formula shows. Here, that is one sodium ion and one chloride ion.', show: ['k.salt', 'k.unit'], focus: ['k.salt', 'k.unit'] },
      ],
    },
    {
      chapter: 'Moles to particles',
      layout: 'center',
      main: [convert, { kind: 'math', id: 'm', size: 'lg', lines: ['N = n \\times 6.02 \\times 10^{23} \\qquad n = \\dfrac{N}{6.02 \\times 10^{23}}'] }],
      lines: [
        { say: 'On the left is the amount in moles, called small n. On the right is the number of particles, called capital N.', show: ['f.n', 'f.N'] },
        { say: 'Each mole holds Avogadro’s number of particles. So to change moles into particles, multiply by Avogadro’s number.', show: 'f.times', focus: 'f.times' },
        { say: 'To change particles into moles, divide by it.', show: 'f.divide', focus: 'f.divide' },
        { say: 'As formulas: capital N equals n times Avogadro’s number, and n equals capital N divided by Avogadro’s number.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Moles to molecules',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many molecules are in $2.5\\ \\text{mol}$ of carbon dioxide, $\\ce{CO2}$? Give the answer in scientific notation to three significant figures.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['N = 2.5 \\times 6.02 \\times 10^{23}', '2.5 \\times 6.02 = 15.05, \\text{ so } N = 15.05 \\times 10^{23}', '15.05 \\times 10^{23} = 1.505 \\times 10^{24}', 'N = \\good{1.51 \\times 10^{24}} \\text{ molecules}'],
        },
      ],
      lines: [
        { say: 'How many molecules are in two point five moles of carbon dioxide? Give the answer in scientific notation, to three significant figures.', show: 'q' },
        { say: 'We want particles, so multiply the moles by Avogadro’s number.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply the ordinary numbers first. Two point five times six point zero two is fifteen point zero five, so capital N is fifteen point zero five times ten to the twenty-third.', caption: 'Multiply the ordinary numbers first. 2.5 × 6.02 = 15.05, so N is 15.05 × 10²³.', show: 'm.1', focus: 'm.1' },
        { say: 'Scientific notation has just one digit before the decimal point. So move the decimal point one place to the left, and add one to the power of ten.', show: 'm.2', focus: 'm.2' },
        { say: 'To three significant figures, that is one point five one times ten to the twenty-fourth molecules.', caption: 'To three significant figures, that is 1.51 × 10²⁴ molecules.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many atoms are in $3.0\\ \\text{mol}$ of iron, $\\ce{Fe}$? One mole holds $6.02 \\times 10^{23}$ particles.',
          choices: ['$2.01 \\times 10^{23}$', '$1.81 \\times 10^{24}$', '$1.81 \\times 10^{23}$', '$9.02 \\times 10^{23}$'],
          answer: 1,
          working: '$N = 3.0 \\times 6.02 \\times 10^{23} = 18.06 \\times 10^{23} = 1.806 \\times 10^{24}$, which is $1.81 \\times 10^{24}$ atoms to three significant figures.',
        },
      ],
      lines: [
        { say: 'Your turn. How many atoms are in three moles of iron? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B. Three times six point zero two is eighteen point zero six. Moving the decimal point gives one point eight one times ten to the twenty-fourth atoms. Choice C forgets to add one to the power of ten.',
          caption: 'The answer is B. 3 × 6.02 = 18.06. Moving the decimal point gives 1.81 × 10²⁴ atoms. Choice C forgets to add one to the power of ten.',
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
            'One **mole** (mol) of anything holds $6.02 \\times 10^{23}$ particles: **Avogadro’s number**.',
            'The particles are atoms, molecules or formula units, depending on the substance.',
            'Moles to particles: $N = n \\times 6.02 \\times 10^{23}$. Particles to moles: divide.',
            'Write the answers in scientific notation, with one digit before the decimal point.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. One mole of anything holds six point zero two times ten to the twenty-third particles. That is Avogadro’s number.', caption: 'Let’s sum up. One mole of anything holds 6.02 × 10²³ particles. That is Avogadro’s number.', show: 'sum.0' },
        { say: 'The particles are atoms, molecules or formula units.', show: 'sum.1' },
        { say: 'To change moles into particles, multiply by Avogadro’s number. To go back, divide.', show: 'sum.2' },
        { say: 'Write the answers in scientific notation. In part two, you will change particles into moles, and count the atoms inside molecules. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
