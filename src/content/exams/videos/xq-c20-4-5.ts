import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import otherConditions from '@/content/chem20/videos/c20-4-5-c.ts';
import { reaction } from '@/content/chem10/videos/lib/c10-equations.ts';
import { flow, type FlowNode } from '@/content/chem20/videos/lib/c20-4a-figures.ts';

// Exam question for Chemistry 20 lesson 4.5 (gas and solution stoichiometry): the volume of oxygen
// at 423.0 K and 127.4 kPa from 129.7 g of barium peroxide. The question is OpenStax Chemistry
// 2e's own, word for word (end-of-chapter exercise 75, section 9.3, CC BY-NC-SA 4.0). The answer,
// which matches the book's: 2BaO2 -> 2BaO + O2, 129.7 / 169.33 = 0.7660 mol BaO2, x 1/2 = 0.3830
// mol O2, and V = nRT/P = 0.3830 x 8.314 x 423.0 / 127.4 = 10.57 L.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's sealed gas warming
// while its pressure climbs; and atoms drawn as balls (src/video/molecules.ts): two units of barium
// peroxide coming apart into two units of barium oxide and one oxygen molecule.

const two = (top: string, bottom: string) => `\\begin{gathered}\\text{${top}}\\\\ ${bottom}\\end{gathered}`;

const nodes: FlowNode[] = [
  { id: 'm1', tex: two('mass', '\\ce{BaO2}'), tone: 'opp', value: '129.7\\ \\text{g}' },
  { id: 'n1', tex: two('moles', '\\ce{BaO2}'), tone: 'brand', value: '0.7660\\ \\text{mol}' },
  { id: 'n2', tex: two('moles', '\\ce{O2}'), tone: 'brand', value: '0.3830\\ \\text{mol}' },
  { id: 'v2', tex: two('volume', '\\ce{O2}'), tone: 'good', value: '10.57\\ \\text{L}' },
];

/** The chain of conversions, mass of barium peroxide to volume of oxygen. */
const chain = figure(
  'c',
  [
    flow({
      nodes,
      arrows: [
        { id: 'a1', from: 'm1', to: 'n1', tex: '\\div 169.33', tone: 'good' },
        { id: 'a2', from: 'n1', to: 'n2', tex: '\\times \\tfrac{1}{2}', tone: 'theta' },
        { id: 'a3', from: 'n2', to: 'v2', tex: '\\times \\tfrac{RT}{P}', tone: 'good' },
      ],
      width: 2.9,
      height: 1.9,
      gap: 3.3,
    }),
  ],
  240,
);

/** Two units of barium peroxide breaking down into two of barium oxide and one oxygen molecule (clip `go`). */
const peroxide = reaction('bo', { from: [{ t: 'BaO2', n: 2 }], to: [{ t: 'BaO', n: 2 }, { t: 'O2' }], counts: true });

const QUESTION = 'What volume of oxygen at 423.0 K and a pressure of 127.4 kPa is produced by the decomposition of 129.7 g of BaO2 to BaO and O2?';

const video: Explainer = {
  id: 'xq-c20-4-5',
  lessonId: '',
  exam: {
    lesson: 'c20-4-5',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 75, section 9.3, Stoichiometry of Gaseous Substances',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/9-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: How Much Oxygen From Barium Peroxide? Gas Stoichiometry',
  thumbnailTitle: 'How Much Oxygen From Barium Peroxide?',
  thumbnail: 'bo',
  summary:
    'A real test question, solved one small step at a time: what volume of oxygen at 423.0 K and 127.4 kPa comes from 129.7 g of barium peroxide? We balance the equation, turn the mass into moles, use the mole ratio, and find the volume with the ideal gas law, to get 10.6 L.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Much Oxygen From Barium Peroxide?', subtitle: 'From a mass of solid to a volume of gas' }],
      lines: [
        { say: 'In this video, we solve a real test question about the volume of gas a reaction gives off. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'What volume of oxygen at $423.0\\ \\text{K}$ and a pressure of $127.4\\ \\text{kPa}$ is produced by the decomposition of $129.7\\ \\text{g}$ of $\\ce{BaO2}$ to $\\ce{BaO}$ and $\\ce{O2}$?',
          answer: '10.6 L of oxygen',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. What volume of oxygen at four hundred and twenty three point zero kelvins and a pressure of one hundred and twenty seven point four kilopascals is produced by the decomposition of one hundred and twenty nine point seven grams of B a O two to B a O and O two?', show: 'q', caption: 'Here is the question, exactly as it was printed. What volume of oxygen at 423.0 K and a pressure of 127.4 kPa is produced by the decomposition of 129.7 g of BaO₂ to BaO and O₂?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'From a **mass of solid** to the **volume of gas** it gives off, at a **hot** temperature and a **high** pressure' }],
      lines: [
        { say: 'Barium peroxide is a solid that breaks down into barium oxide and oxygen gas. We know the mass of the solid, and we want the volume of the oxygen.', show: 'plain' },
        { say: 'Four hundred and twenty three kelvins and one hundred and twenty seven kilopascals are neither S T P nor S A T P, so we cannot use a molar volume. We need the ideal gas law.', caption: '423.0 K and 127.4 kPa are neither STP nor SATP, so we cannot use a molar volume. We need the ideal gas law.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        pick(otherConditions, 'sg'),
        { kind: 'math', id: 'k', size: 'md', lines: ['PV = nRT \\qquad V = \\dfrac{nRT}{P} \\qquad R = 8.314\\ \\text{kPa·L/(mol·K)}'] },
      ],
      lines: [
        { say: 'Here is what we need. A gas is sealed in a tube, with a gauge to read its pressure.', show: ['sg', 'sg.labels', 'sg.thermo', 'sg.gauge'] },
        { say: 'Warm it, and the particles move faster and hit the walls harder and more often, so the pressure climbs. Pressure, volume, temperature and amount are all linked.', show: 'sg.hits', play: 'sg.warm', focus: 'sg.gauge' },
        { say: 'The ideal gas law ties them together: P V equals n R T. So the volume is n R T over P, with R equal to eight point three one four, the pressure in kilopascals and the temperature in kelvins.', show: 'k.0', caption: 'The ideal gas law ties them together: PV = nRT. So V = nRT ÷ P, with R = 8.314 kPa·L/(mol·K), the pressure in kPa and the temperature in kelvins.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [chain],
      lines: [
        { say: 'Here is the plan, as a chain. First, the mass of barium peroxide to moles, dividing by its molar mass.', show: ['c.m1', 'c.n1', 'c.a1'], focus: 'c.a1' },
        { say: 'Then moles of barium peroxide to moles of oxygen, using the mole ratio from the balanced equation.', show: ['c.n2', 'c.a2'], focus: 'c.a2' },
        { say: 'Then moles of oxygen to a volume, with the ideal gas law.', show: ['c.v2', 'c.a3'], focus: 'c.a3' },
      ],
    },
    {
      chapter: 'Step 1: The balanced equation',
      layout: 'center',
      main: [peroxide, { kind: 'math', id: 'e', size: 'lg', lines: ['\\ce{2BaO2 -> 2BaO + O2}'] }],
      lines: [
        { say: 'Step one. Each unit of barium peroxide has two oxygen atoms, and each barium oxide keeps one. Watch two units break down.', show: 'bo', play: 'bo.go' },
        { say: 'The two spare oxygen atoms join as one oxygen molecule. So the balanced equation is two B a O two gives two B a O plus O two.', show: 'e.0', focus: 'e.0', caption: 'The two spare oxygen atoms join as one oxygen molecule. So the balanced equation is 2BaO₂ → 2BaO + O₂.' },
      ],
    },
    {
      chapter: 'Step 2: Grams to moles',
      layout: 'center',
      main: [{ kind: 'math', id: 'n', size: 'lg', lines: ['M(\\ce{BaO2}) = 137.33 + 2(16.00) = 169.33\\ \\text{g/mol}', 'n(\\ce{BaO2}) = \\dfrac{129.7}{169.33} = \\good{0.7660\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step two. Barium is one hundred and thirty seven point three three, and two oxygens add thirty two, so the molar mass is one hundred and sixty nine point three three grams per mole.', show: 'n.0', caption: 'Step two. Ba is 137.33 and two O add 32.00, so M(BaO₂) = 169.33 g/mol.' },
        { say: 'One hundred and twenty nine point seven grams divided by that is zero point seven six six zero moles of barium peroxide.', show: 'n.1', focus: 'n.1', caption: 'n = 129.7 g ÷ 169.33 g/mol = 0.7660 mol of BaO₂.' },
      ],
    },
    {
      chapter: 'Step 3: The mole ratio',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['n(\\ce{O2}) = 0.7660\\ \\text{mol} \\times \\dfrac{1}{2} = \\good{0.3830\\ \\text{mol}}'] }],
      lines: [
        { say: 'Step three. Two barium peroxide give one oxygen molecule. Oxygen is wanted and barium peroxide is given, so multiply by one over two: zero point three eight three zero moles of oxygen.', show: 'r.0', focus: 'r.0', caption: 'Step three. Two BaO₂ give one O₂. O₂ is wanted and BaO₂ is given, so multiply by 1/2: 0.3830 mol of O₂.' },
      ],
    },
    {
      chapter: 'Step 4: Moles to a volume',
      layout: 'center',
      main: [{ kind: 'math', id: 'v', size: 'md', lines: ['V = \\dfrac{nRT}{P} = \\dfrac{0.3830 \\times 8.314 \\times 423.0}{127.4}', '= 10.57\\ \\text{L} \\approx \\good{10.6\\ \\text{L}}'] }],
      lines: [
        { say: 'Step four. The temperature is already in kelvins and the pressure in kilopascals, so substitute straight into V equals n R T over P.', show: 'v.0', caption: 'Step four. The temperature is already in kelvins and the pressure in kPa, so substitute straight into V = nRT ÷ P.' },
        { say: 'Zero point three eight three zero times eight point three one four times four hundred and twenty three, over one hundred and twenty seven point four, is ten point five seven litres, or ten point six litres.', show: 'v.1', focus: 'v.1', caption: '0.3830 × 8.314 × 423.0 ÷ 127.4 = 10.57 L, or 10.6 L.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        chain,
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: 'About $10.6\\ \\text{L}$ of oxygen at $423.0\\ \\text{K}$ and $127.4\\ \\text{kPa}$.' },
      ],
      lines: [
        { say: 'Here is the whole chain again, with the value under each box.', show: ['c', 'c.m1', 'c.n1', 'c.n2', 'c.v2', 'c.a1', 'c.a2', 'c.a3', 'c.m1-value', 'c.n1-value', 'c.n2-value', 'c.v2-value'] },
        { say: 'Does it make sense? At these conditions, one mole of gas fills R T over P, about twenty seven point six litres. A little over a third of a mole fills about ten litres.', caption: 'Does it make sense? At these conditions, one mole of gas fills RT ÷ P, about 27.6 L. A little over a third of a mole fills about ten litres.' },
        { say: 'So the reaction gives about ten point six litres of oxygen. That matches the book.', show: 'ans', caption: 'So the reaction gives about 10.6 L of oxygen. That matches the book.' },
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
            ['$21.1\\ \\text{L}$', 'Left out the **mole ratio**'],
            ['$8.58\\ \\text{L}$', 'Used **22.4 L/mol**, which is only for STP'],
            ['$0.104\\ \\text{L}$', 'Used **R = 0.08206**, which needs atmospheres'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Twenty one point one litres comes from leaving out the mole ratio. Two barium peroxide give only one oxygen molecule.', focus: 'traps.0', caption: '21.1 L comes from leaving out the mole ratio. Two BaO₂ give only one O₂.' },
        { say: 'Eight point five eight litres comes from using twenty two point four litres per mole. That molar volume is for S T P only, and this gas is much hotter.', focus: 'traps.1', caption: '8.58 L comes from using 22.4 L/mol. That molar volume is for STP only, and this gas is much hotter.' },
        { say: 'And zero point one zero four litres comes from using the gas constant for atmospheres with a pressure in kilopascals. With kilopascals, R is eight point three one four.', focus: 'traps.2', caption: 'And 0.104 L comes from using R = 0.08206, the value for atmospheres, with a pressure in kPa. With kPa, R = 8.314.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Limestone breaks down: $\\ce{CaCO3 -> CaO + CO2}$. What volume of $\\ce{CO2}$ at $350.0\\ \\text{K}$ and $105.0\\ \\text{kPa}$ forms from $25.0\\ \\text{g}$ of $\\ce{CaCO3}$? Use $M = 100.09\\ \\text{g/mol}$ and $R = 8.314\\ \\text{kPa·L/(mol·K)}$.',
          choices: ['$6.92\\ \\text{L}$', '$5.59\\ \\text{L}$', '$3.46\\ \\text{L}$', '$13.8\\ \\text{L}$'],
          answer: 0,
          working: '$n = \\dfrac{25.0}{100.09} = 0.2498\\ \\text{mol}$ of both, and $V = \\dfrac{0.2498 \\times 8.314 \\times 350.0}{105.0} = 6.92\\ \\text{L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Limestone breaks down into calcium oxide and carbon dioxide. What volume of carbon dioxide at three hundred and fifty kelvins and one hundred and five kilopascals forms from twenty five point zero grams of calcium carbonate? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Limestone breaks down: CaCO₃ → CaO + CO₂. What volume of CO₂ at 350.0 K and 105.0 kPa forms from 25.0 g of CaCO₃? Pause the video and try it.' },
        { say: 'Twenty five point zero over one hundred point zero nine is zero point two four nine eight moles, and the ratio is one to one. Then n R T over P is six point nine two litres: choice A.', show: 'q2.answer', caption: '25.0 ÷ 100.09 = 0.2498 mol, and the ratio is 1 to 1. Then V = nRT ÷ P = 6.92 L: choice A.' },
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
          items: ['Mass to moles, **mole ratio**, moles to volume', 'Not at STP or SATP? Use $V = \\dfrac{nRT}{P}$', 'Kelvins, kilopascals and $R = 8.314$'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Go from mass to moles, use the mole ratio, then go from moles to a volume.', show: 'sum.0' },
        { say: 'If the gas is not at S T P or S A T P, find the volume with the ideal gas law, V equals n R T over P.', show: 'sum.1', caption: 'If the gas is not at STP or SATP, find the volume with the ideal gas law, V = nRT ÷ P.' },
        { say: 'Use kelvins, kilopascals and R equal to eight point three one four. For more on gas stoichiometry, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2', caption: 'Use kelvins, kilopascals and R = 8.314. For more on gas stoichiometry, watch this lesson\'s explainer videos on Gradileo.' },
      ],
    },
  ],
};

export default video;
