import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c20-4a-figures.ts';

const box = (top: string, bottom: string) => `\\begin{gathered}\\text{${top}}\\\\ \\text{${bottom}}\\end{gathered}`;

// Amount and number of particles, joined both ways through Avogadro's number.
const count = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'n', tex: box('amount', 'n (mol)'), tone: 'brand' },
        { id: 'p', tex: box('particles', 'N'), tone: 'adj' },
      ],
      arrows: [
        { id: 'a1', from: 'n', to: 'p', tex: '\\times N_A', tone: 'good' },
        { id: 'a2', from: 'p', to: 'n', tex: '\\div N_A', tone: 'theta' },
      ],
      width: 3.2,
      height: 2,
      gap: 4.2,
    }),
  ],
  220,
);

// From a mass of methane to its hydrogen atoms, with the values worked out.
const path = figure(
  'p',
  [
    flow({
      nodes: [
        { id: 'm', tex: '\\begin{gathered}\\text{mass}\\\\ \\text{of } \\ce{CH4}\\end{gathered}', tone: 'opp', value: '10.0\\ \\text{g}' },
        { id: 'n', tex: box('amount', 'in moles'), tone: 'brand', value: '0.6231\\ \\text{mol}' },
        { id: 'mol', tex: '\\begin{gathered}\\text{molecules}\\\\ \\text{of } \\ce{CH4}\\end{gathered}', tone: 'adj', value: '3.751 \\times 10^{23}' },
        { id: 'h', tex: box('H', 'atoms'), tone: 'hyp', value: '1.50 \\times 10^{24}' },
      ],
      arrows: [
        { id: 'a1', from: 'm', to: 'n', tex: '\\div M', tone: 'good' },
        { id: 'a2', from: 'n', to: 'mol', tex: '\\times N_A', tone: 'good' },
        { id: 'a3', from: 'mol', to: 'h', tex: '\\times 4', tone: 'theta' },
      ],
      width: 3.6,
      height: 1.9,
      gap: 2.5,
    }),
  ],
  240,
);

const video: Explainer = {
  id: 'c20-4-3-d',
  lessonId: 'c20-4-3',
  title: 'The Mole and Molar Mass, Part 4: Counting Particles',
  thumbnailTitle: 'Counting Particles',
  thumbnail: 'p',
  summary:
    'Avogadro’s number, 6.02 × 10²³ per mole, turns moles into particles: N = nN_A, and back: n = N/N_A. So 3.40 mol of water is 2.05 × 10²⁴ molecules. To count atoms, go from mass to moles to molecules, then multiply by the atoms in one molecule: 10.0 g of methane holds 1.50 × 10²⁴ hydrogen atoms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 4', title: 'Counting Particles', subtitle: 'Avogadro’s number at work' }],
      lines: [
        { say: 'One mole of anything holds the same number of particles. That number turns an amount in moles into a count of molecules, and molecules into atoms.', show: 'title' },
        { say: 'In this last part, you will use Avogadro’s number to count molecules and atoms, starting from moles or from a mass.' },
      ],
    },
    {
      chapter: 'Avogadro’s number',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Avogadro’s number', md: '$N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}$ is the number of particles in one mole. Then $N = nN_A$ and $n = \\dfrac{N}{N_A}$.' },
        count,
      ],
      lines: [
        { say: 'Avogadro’s number, N sub A, is the number of particles in one mole: six point zero two times ten to the twenty-third per mole.', caption: 'Avogadro’s number, N_A = 6.02 × 10²³ per mole, is the number of particles in one mole.', show: 'def' },
        { say: 'To count the particles, multiply the amount in moles by Avogadro’s number: capital N equals n times N sub A.', caption: 'To count the particles, multiply the amount in moles by Avogadro’s number: N = nN_A.', show: ['f.n', 'f.p', 'f.a1'], focus: 'f.a1' },
        { say: 'To go back, divide the number of particles by Avogadro’s number.', show: 'f.a2', focus: 'f.a2' },
      ],
    },
    {
      chapter: 'Moles to molecules, and back',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Use $N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}$. How many molecules are in $3.40\\ \\text{mol}$ of water? How many moles are $1.20 \\times 10^{25}$ water molecules?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['N = 3.40 \\times 6.02 \\times 10^{23} = 2.0468 \\times 10^{24}', '\\approx \\good{2.05 \\times 10^{24}}\\ \\text{molecules}', 'n = \\dfrac{1.20 \\times 10^{25}}{6.02 \\times 10^{23}} = 19.93 \\approx \\good{19.9\\ \\text{mol}}'],
        },
      ],
      lines: [
        { say: 'How many molecules are in three point four zero moles of water?', show: 'q' },
        { say: 'Multiply by Avogadro’s number. Three point four zero times six point zero two times ten to the twenty-third is two point zero four six eight times ten to the twenty-fourth.', show: 'm.0', focus: 'm.0' },
        { say: 'To three significant figures, two point zero five times ten to the twenty-fourth molecules. Answers this large are written in scientific notation.', show: 'm.1', focus: 'm.1' },
        { say: 'Going back, one point two zero times ten to the twenty-fifth molecules, divided by Avogadro’s number, is nineteen point nine three, or nineteen point nine moles.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Powers of ten on a calculator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Powers of ten on a calculator', md: 'Enter $6.02 \\times 10^{23}$ with the exponent key, often marked EE or EXP: `6.02E23`. Typing `÷ 6.02 × 10^23` divides by 6.02 and then **multiplies** by $10^{23}$. Use the exponent key, or brackets round the whole number.' },
      ],
      lines: [
        { say: 'On a calculator, enter six point zero two times ten to the twenty-third with the exponent key, often marked E E or E X P.', caption: 'On a calculator, enter 6.02 × 10²³ with the exponent key, often marked EE or EXP.', show: 'tip' },
        { say: 'Be careful when you divide by it. Typing divide, six point zero two, times ten to the twenty-third, divides by six point zero two and then multiplies by ten to the twenty-third. Use the exponent key, or put brackets around the whole number.', caption: 'Be careful when you divide by it. Typing ÷ 6.02 × 10^23 divides by 6.02 and then multiplies by 10²³. Use the exponent key, or put brackets around the whole number.' },
      ],
    },
    {
      chapter: 'From a mass to atoms',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many hydrogen atoms are in $10.0\\ \\text{g}$ of methane, $\\ce{CH4}$? Use C $12.01$ and H $1.01\\ \\text{g/mol}$, and $N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['M(\\ce{CH4}) = 12.01 + 4(1.01) = 16.05\\ \\text{g/mol}'] },
        path,
      ],
      lines: [
        { say: 'How many hydrogen atoms are in ten point zero grams of methane?', show: 'q' },
        { say: 'A molecule is made of atoms, so a count of molecules is not a count of atoms. The path runs from mass, to moles, to molecules, to atoms.', show: ['p.m', 'p.n', 'p.mol', 'p.h'] },
        { say: 'The molar mass of methane is twelve point zero one, plus four times one point zero one: sixteen point zero five grams per mole.', show: 'm', focus: 'm' },
        { say: 'Ten point zero grams, divided by the molar mass, sixteen point zero five, is zero point six two three one moles.', show: ['p.m-value', 'p.a1', 'p.n-value'], focus: 'p.a1' },
        { say: 'Times Avogadro’s number, that is three point seven five one times ten to the twenty-third molecules.', show: ['p.a2', 'p.mol-value'], focus: 'p.a2' },
        { say: 'Each methane molecule holds four hydrogen atoms, so multiply by four: one point five zero times ten to the twenty-fourth hydrogen atoms.', show: ['p.a3', 'p.h-value'], focus: ['p.a3', 'p.h-value'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many oxygen atoms are in $2.00\\ \\text{mol}$ of carbon dioxide, $\\ce{CO2}$? Use $N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}$.',
          choices: ['$2.41 \\times 10^{24}$', '$1.20 \\times 10^{24}$', '$3.61 \\times 10^{24}$', '$3.01 \\times 10^{23}$'],
          answer: 0,
          working: 'Molecules: $2.00 \\times 6.02 \\times 10^{23} = 1.204 \\times 10^{24}$. Each $\\ce{CO2}$ holds 2 O atoms: $2 \\times 1.204 \\times 10^{24} = 2.41 \\times 10^{24}$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many oxygen atoms are in two point zero zero moles of carbon dye-oxide? Pause the video and try it.', caption: 'Your turn. How many oxygen atoms are in 2.00 mol of carbon dioxide, CO₂? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two point zero zero moles is one point two zero four times ten to the twenty-fourth molecules, and each molecule holds two oxygen atoms: two point four one times ten to the twenty-fourth. Choice B counts molecules, not atoms, and choice C counts the carbon atoms as well.', show: 'q.answer' },
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
          items: ['**Avogadro’s number**: $N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}$.', '$N = nN_A$ and $n = \\dfrac{N}{N_A}$, in scientific notation.', 'To count atoms, multiply the molecules by the atoms of that element in **one molecule**.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Avogadro’s number is six point zero two times ten to the twenty-third per mole.', caption: 'Let’s sum up. Avogadro’s number is 6.02 × 10²³ per mole.', show: 'sum.0' },
        { say: 'Multiply moles by it to count particles, and divide particles by it to get moles.', show: 'sum.1' },
        { say: 'And to count atoms, multiply the molecules by the atoms of that element in one molecule. That completes this lesson. Next, you will read a balanced equation in moles.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
