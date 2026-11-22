import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import molarMass from '@/content/chem20/videos/c20-4-3-c.ts';
import { flow } from '@/content/chem20/videos/lib/c20-4a-figures.ts';

// Exam question for Chemistry 20 lesson 4.3 (the mole and molar mass): count the atoms in a
// 1.25-carat diamond (1 carat = 200 mg). The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 26, section 3.1, CC BY-NC-SA 4.0). The answer, which matches the
// book's: 0.250 g / 12.01 g/mol = 0.02082 mol, and x 6.022 x 10^23 = 1.25 x 10^22 carbon atoms.
//
// The pictures are atoms drawn as balls (src/video/molecules.ts) joining into methane with its
// molar mass, the chain carats -> grams -> moles -> atoms, and simulated particles
// (src/video/particles.ts): a diamond as a lattice of carbon atoms, vibrating in place.

/** A diamond up close: nothing but carbon atoms, held in a rigid lattice. */
const diamond: ParticlesEl = {
  kind: 'particles',
  id: 'dm',
  boxes: [{ id: 'd', state: 'solid', kinds: [{ n: 40, bond: 3, heavy: 1, tone: 'adj', name: 'carbon atom' }], cols: 10, width: 13, height: 6, temp: 0.05, label: 'a diamond: carbon atoms only' }],
  clips: {},
  key: true,
  height: 330,
};

/** The chain of conversions, carats to atoms. */
const chain = figure(
  'c',
  [
    flow({
      nodes: [
        { id: 'ct', tex: '\\begin{gathered}1.25\\\\ \\text{carats}\\end{gathered}', tone: 'theta' },
        { id: 'g', tex: '\\begin{gathered}\\text{mass}\\\\ (\\text{g})\\end{gathered}', tone: 'opp', value: '0.250\\ \\text{g}' },
        { id: 'n', tex: '\\begin{gathered}\\text{amount}\\\\ (\\text{mol})\\end{gathered}', tone: 'brand', value: '0.02082\\ \\text{mol}' },
        { id: 'at', tex: '\\begin{gathered}\\text{number}\\\\ \\text{of atoms}\\end{gathered}', tone: 'good', value: '1.25 \\times 10^{22}' },
      ],
      arrows: [
        { id: 'a1', from: 'ct', to: 'g', tex: '\\times 200\\ \\text{mg}', tone: 'theta' },
        { id: 'a2', from: 'g', to: 'n', tex: '\\div 12.01', tone: 'good' },
        { id: 'a3', from: 'n', to: 'at', tex: '\\times N_A', tone: 'good' },
      ],
      width: 3.8,
      height: 2.2,
      gap: 4.0,
    }),
  ],
  260,
);

const QUESTION = 'Diamond is one form of elemental carbon. An engagement ring contains a diamond weighing 1.25 carats (1 carat = 200 mg). How many atoms are present in the diamond?';

const video: Explainer = {
  id: 'xq-c20-4-3',
  lessonId: '',
  exam: {
    lesson: 'c20-4-3',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 26, section 3.1, Formula Mass and the Mole Concept',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/3-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Atoms in a Diamond? The Mole and Molar Mass',
  thumbnailTitle: 'How Many Atoms in a Diamond?',
  thumbnail: 'dm',
  summary:
    'A real test question, solved one small step at a time: how many carbon atoms are in a 1.25-carat diamond? We turn carats into grams, grams into moles with the molar mass of carbon, and moles into atoms with Avogadro\'s number, to get 1.25 × 10²² atoms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Atoms in a Diamond?', subtitle: 'Mass to moles to atoms, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about counting the atoms in a diamond. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION.replace('1 carat = 200 mg', '1 carat $= 200\\ \\text{mg}$'), answer: '1.25 × 10²² atoms' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Diamond is one form of elemental carbon.', show: 'q' },
        { say: 'An engagement ring contains a diamond weighing one point two five carats, where one carat is two hundred milligrams. How many atoms are present in the diamond?', caption: 'An engagement ring contains a diamond weighing 1.25 carats (1 carat = 200 mg). How many atoms are present in the diamond?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [diamond, { kind: 'text', id: 'plain', size: 'md', md: 'Count the **carbon atoms** in a diamond whose **mass** we know' }],
      lines: [
        { say: 'Elemental carbon means the diamond is made of carbon atoms and nothing else, held together in a rigid lattice.', show: ['dm', 'dm.labels', 'dm.key'] },
        { say: 'So we must count those atoms, starting from the diamond\'s mass. Atoms are far too small to count one by one, so we count them in moles.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(molarMass, 'me'), { kind: 'math', id: 'k', size: 'md', lines: ['n = \\dfrac{m}{M} \\qquad N = n \\times N_A, \\quad N_A = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}'] }],
      lines: [
        { say: 'Here is what we need. One carbon atom and four hydrogen atoms join into methane. The molar mass of each atom is the mass of one mole of it, so carbon is twelve point zero one grams per mole.', show: 'me', play: 'me.go', caption: 'Here is what we need. One carbon atom and four hydrogen atoms join into methane. The molar mass of each atom is the mass of one mole of it, so carbon is 12.01 g/mol.' },
        { say: 'To turn a mass into moles, divide by the molar mass. To turn moles into a number of particles, multiply by Avogadro\'s number, six point zero two two times ten to the twenty three per mole.', show: 'k.0', caption: 'To turn a mass into moles, divide by the molar mass: n = m ÷ M. To turn moles into a number of particles, multiply by Avogadro\'s number, 6.022 × 10²³ per mole.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [chain],
      lines: [
        { say: 'Here is the plan, as a chain. First, carats to grams, using two hundred milligrams per carat.', show: ['c.ct', 'c.g', 'c.a1'], focus: 'c.a1' },
        { say: 'Then grams to moles, dividing by the molar mass of carbon.', show: ['c.n', 'c.a2'], focus: 'c.a2' },
        { say: 'Then moles to atoms, multiplying by Avogadro\'s number.', show: ['c.at', 'c.a3'], focus: 'c.a3' },
      ],
    },
    {
      chapter: 'Step 1: Carats to grams',
      layout: 'center',
      main: [{ kind: 'math', id: 'g', size: 'lg', lines: ['1.25 \\times 200\\ \\text{mg} = 250\\ \\text{mg}', '250\\ \\text{mg} = \\good{0.250\\ \\text{g}}'] }],
      lines: [
        { say: 'Step one. Each carat is two hundred milligrams, so one point two five carats is two hundred and fifty milligrams.', show: 'g.0', caption: 'Step one. Each carat is 200 mg, so 1.25 carats is 1.25 × 200 = 250 mg.' },
        { say: 'Molar masses are in grams, so convert: there are a thousand milligrams in a gram, so that is zero point two five zero grams.', show: 'g.1', focus: 'g.1', caption: 'Molar masses are in grams, so convert: there are 1000 mg in a gram, so that is 0.250 g.' },
      ],
    },
    {
      chapter: 'Step 2: Grams to moles',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['n = \\dfrac{0.250\\ \\text{g}}{12.01\\ \\text{g/mol}} = \\good{0.02082\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. Divide by the molar mass of carbon: zero point two five zero grams over twelve point zero one grams per mole is zero point zero two zero eight two moles of carbon atoms.', show: 'n.0', focus: 'n.0', caption: 'Step two. n = 0.250 g ÷ 12.01 g/mol = 0.02082 mol of carbon atoms.' },
      ],
    },
    {
      chapter: 'Step 3: Moles to atoms',
      layout: 'center',
      main: [diamond, { kind: 'math', id: 'a', size: 'md', lines: ['0.02082\\ \\text{mol} \\times 6.022 \\times 10^{23}\\ \\text{mol}^{-1} = \\good{1.25 \\times 10^{22}\\ \\text{atoms}}'] }],
      lines: [
        { say: 'Step three. Each mole holds six point zero two two times ten to the twenty three atoms, so multiply.', show: ['dm', 'dm.labels'] },
        { say: 'Zero point zero two zero eight two times six point zero two two times ten to the twenty three is one point two five times ten to the twenty two carbon atoms, to three significant figures.', show: 'a.0', focus: 'a.0', caption: '0.02082 mol × 6.022 × 10²³ mol⁻¹ = 1.25 × 10²² carbon atoms, to three significant figures.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        chain,
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'About $1.25 \\times 10^{22}$ carbon atoms: twelve and a half thousand billion billion.' },
      ],
      lines: [
        { say: 'Here is the whole chain again, with the value under each box.', show: ['c', 'c.ct', 'c.g', 'c.n', 'c.at', 'c.a1', 'c.a2', 'c.a3', 'c.g-value', 'c.n-value', 'c.at-value'] },
        { say: 'The diamond holds about one point two five times ten to the twenty two carbon atoms. That is a huge number, which makes sense for something you can see and hold. It matches the book.', show: 'ans', caption: 'The diamond holds about 1.25 × 10²² carbon atoms. That is a huge number, which makes sense for something you can see and hold. It matches the book.' },
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
            ['$1.25 \\times 10^{25}$', 'Used **250 g**, not 250 mg'],
            ['$0.0208$', 'Stopped at **moles**; the question asks for atoms'],
            ['$1.81 \\times 10^{24}$', '**Multiplied** by the molar mass instead of dividing'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'One point two five times ten to the twenty five comes from forgetting to change milligrams into grams. That diamond would weigh a quarter of a kilogram.', focus: 'traps.0', caption: '1.25 × 10²⁵ comes from forgetting to change milligrams into grams. That diamond would weigh a quarter of a kilogram.' },
        { say: 'Zero point zero two zero eight is the amount in moles. The question asks for the number of atoms, so there is one more step.', focus: 'traps.1', caption: '0.0208 is the amount in moles. The question asks for the number of atoms, so there is one more step.' },
        { say: 'And one point eight one times ten to the twenty four comes from multiplying by the molar mass. To go from grams to moles, divide.', focus: 'traps.2', caption: 'And 1.81 × 10²⁴ comes from multiplying by the molar mass. To go from grams to moles, divide.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How many atoms are in $5.00\\ \\text{g}$ of aluminium? The molar mass of aluminium is $26.98\\ \\text{g/mol}$, and $N_A = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}$.',
          choices: ['$8.12 \\times 10^{25}$', '$1.12 \\times 10^{23}$', '$0.185$', '$3.01 \\times 10^{24}$'],
          answer: 1,
          working: '$n = \\dfrac{5.00}{26.98} = 0.1853\\ \\text{mol}$, and $0.1853 \\times 6.022 \\times 10^{23} = 1.12 \\times 10^{23}$ atoms.',
        },
      ],
      lines: [
        { say: 'Your turn. How many atoms are in five point zero zero grams of aluminium? Its molar mass is twenty six point nine eight grams per mole. Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. How many atoms are in 5.00 g of aluminium? Its molar mass is 26.98 g/mol. Pause the video and try it.' },
        { say: 'Five point zero zero over twenty six point nine eight is zero point one eight five three moles, and times Avogadro\'s number that is one point one two times ten to the twenty three atoms: choice B.', show: 'q2.answer', caption: '5.00 ÷ 26.98 = 0.1853 mol, and 0.1853 × 6.022 × 10²³ = 1.12 × 10²³ atoms: choice B.' },
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
          items: ['Put the mass in **grams** first', 'Grams to moles: **divide by the molar mass**', 'Moles to particles: **multiply by** $N_A$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Put the mass in grams first, because molar masses are in grams per mole.', show: 'sum.0' },
        { say: 'To go from grams to moles, divide by the molar mass.', show: 'sum.1' },
        { say: 'To go from moles to particles, multiply by Avogadro\'s number. For more on the mole, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
