import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c10-5-figures.ts';

// From a mass, through moles, to a number of particles.
const steps = figure('f', [
  flow({
    nodes: [
      { id: 'm', tex: '\\begin{gathered}\\text{mass}\\\\ m\\end{gathered}', tone: 'opp', value: '9.0\\ \\text{g}' },
      { id: 'n', tex: '\\begin{gathered}\\text{moles}\\\\ n\\end{gathered}', tone: 'brand', value: '0.50\\ \\text{mol}' },
      { id: 'N', tex: '\\begin{gathered}\\text{particles}\\\\ N\\end{gathered}', tone: 'adj', value: '3.01 \\times 10^{23}' },
    ],
    arrows: [
      { id: 'divide', from: 'm', to: 'n', tex: '\\div M', tone: 'good' },
      { id: 'times', from: 'n', to: 'N', tex: '\\times\\, 6.02 \\times 10^{23}', tone: 'theta' },
    ],
    width: 3.1,
    height: 2.2,
    gap: 5.6,
  }),
]);

const video: Explainer = {
  id: 'c10-5-2-b',
  lessonId: 'c10-5-2',
  title: 'Moles, Mass and Particles, Part 2: From Mass to Particles',
  thumbnailTitle: 'From Mass to Particles',
  thumbnail: 'f',
  summary:
    'When the molar mass is not given, work it out first: 25.0 g of calcium carbonate (100.1 g/mol) is 0.25 mol. To turn a mass into a number of particles, divide by the molar mass, then multiply by Avogadro’s number: 9.0 g of water is 0.50 mol, or 3.01 × 10²³ molecules. Never multiply a mass straight by Avogadro’s number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 2', title: 'From Mass to Particles', subtitle: 'Two steps, through moles' }],
      lines: [
        { say: 'In part one, you changed a mass into moles with the molar mass. But what if the molar mass is not given?', show: 'title' },
        { say: 'In this part, you will work it out first. Then you will go on from a mass all the way to a number of particles.' },
      ],
    },
    {
      chapter: 'Molar mass first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A piece of chalk is $25.0\\ \\text{g}$ of calcium carbonate, $\\ce{CaCO3}$. Find the molar mass to the nearest tenth, then the amount in moles to the nearest hundredth. Use Ca $40.1$, C $12.0$ and O $16.0\\ \\text{g/mol}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['M = 40.1 + 12.0 + 3 \\times 16.0', '= 40.1 + 12.0 + 48.0 = \\good{100.1\\ \\text{g/mol}}', 'n = \\dfrac{25.0}{100.1} = 0.2498 \\ldots \\approx \\good{0.25\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'A piece of chalk is twenty-five point zero grams of calcium carbonate. How many moles is that?', show: 'q' },
        { say: 'The molar mass is not given, so work it out first. Calcium carbonate has one calcium atom, one carbon atom and three oxygen atoms.', show: 'm.0', focus: 'm.0' },
        { say: 'Forty point one, plus twelve point zero, plus forty-eight point zero, is one hundred point one grams per mole.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide the mass by the molar mass. Twenty-five point zero over one hundred point one is zero point two four nine eight, or zero point two five moles to the nearest hundredth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mass to particles',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many molecules are in $9.0\\ \\text{g}$ of water, $\\ce{H2O}$? Give the answer in scientific notation to three significant figures. Use H $1.0$ and O $16.0\\ \\text{g/mol}$.' },
        steps,
      ],
      lines: [
        { say: 'Moles connect mass to particles. So a mass can be turned into a number of particles in two steps.', show: ['f.m', 'f.n', 'f.N'] },
        { say: 'First, divide by the molar mass to get moles. Then multiply by Avogadro’s number to get particles.', show: ['f.divide', 'f.times'], focus: ['f.divide', 'f.times'] },
        { say: 'How many molecules are in nine point zero grams of water? The molar mass of water is two times one point zero, plus sixteen point zero: eighteen point zero grams per mole.', show: ['q', 'f.m-value'], focus: 'f' },
        { say: 'Step one: nine point zero divided by eighteen point zero is zero point five zero moles.', show: 'f.n-value', focus: 'f.divide' },
        {
          say: 'Step two: zero point five zero times six point zero two times ten to the twenty-third is three point zero one times ten to the twenty-third molecules.',
          caption: 'Step two: 0.50 × 6.02 × 10²³ is 3.01 × 10²³ molecules.',
          show: 'f.N-value',
          focus: 'f.times',
        },
      ],
    },
    {
      chapter: 'Go through moles',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Go through moles', md: 'Avogadro’s number counts the particles in one **mole**, not in one gram. Change the mass to moles first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{9.0 \\times 6.02 \\times 10^{23} = 5.42 \\times 10^{24}} \\quad \\text{18 times too big}', '\\good{0.50 \\times 6.02 \\times 10^{23} = 3.01 \\times 10^{23}}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Avogadro’s number counts the particles in one mole, not in one gram.', show: 'oops' },
        { say: 'Multiplying the mass straight by Avogadro’s number, nine point zero times six point zero two times ten to the twenty-third, gives an answer eighteen times too big for water.', caption: 'Multiplying the mass straight by Avogadro’s number, 9.0 × 6.02 × 10²³, gives an answer eighteen times too big for water.', show: 'm.0', focus: 'm.0' },
        { say: 'Each mole of water is eighteen grams, so always change the mass into moles first.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many atoms are in $5.4\\ \\text{g}$ of aluminium, $\\ce{Al}$? Use the molar mass Al $27.0\\ \\text{g/mol}$, and $6.02 \\times 10^{23}$ particles per mole.',
          choices: ['$1.20 \\times 10^{23}$', '$3.25 \\times 10^{24}$', '$3.01 \\times 10^{24}$', '$1.20 \\times 10^{22}$'],
          answer: 0,
          working: '$n = \\dfrac{5.4}{27.0} = 0.20\\ \\text{mol}$, so $N = 0.20 \\times 6.02 \\times 10^{23} = 1.204 \\times 10^{23}$, which is $1.20 \\times 10^{23}$ atoms.',
        },
      ],
      lines: [
        { say: 'Your turn. How many atoms are in five point four grams of aluminium? Its molar mass is twenty-seven point zero grams per mole. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is A. Five point four over twenty-seven point zero is zero point two zero moles, and zero point two zero times Avogadro’s number is one point two zero times ten to the twenty-third atoms. Choice B multiplies the mass straight by Avogadro’s number.',
          caption: 'The answer is A. 5.4 ÷ 27.0 is 0.20 mol, and 0.20 × Avogadro’s number is 1.20 × 10²³ atoms. Choice B multiplies the mass straight by Avogadro’s number.',
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
            'If the molar mass is not given, work it out first from the formula.',
            'Mass to particles: divide by the molar mass, then multiply by $6.02 \\times 10^{23}$.',
            '$9.0\\ \\text{g}$ of water is $0.50\\ \\text{mol}$, which is $3.01 \\times 10^{23}$ molecules.',
            'Never multiply a mass by Avogadro’s number directly.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If the molar mass is not given, work it out first from the formula.', show: 'sum.0' },
        { say: 'To go from a mass to a number of particles, divide by the molar mass, then multiply by Avogadro’s number.', show: 'sum.1' },
        { say: 'Nine grams of water is half a mole, or three point zero one times ten to the twenty-third molecules.', caption: 'Nine grams of water is half a mole, or 3.01 × 10²³ molecules.', show: 'sum.2' },
        { say: 'So never multiply a mass straight by Avogadro’s number. In part three, you will use balanced equations to compare moles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
