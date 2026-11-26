import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';
import { substances } from '../../chem10/videos/lib/c10-particles.ts';

const video: Explainer = {
  id: 'cx-20-1',
  lessonId: 'cx-20-1',
  title: 'Elemental Analysis and Purity',
  thumbnail: false,
  summary:
    'Burning or dissolving a weighed sample shows how much of each element it holds. The mass percent of an element is its mass in one mole over the molar mass, and every pure sample of a compound has the same mass percents. If the impurities hold none of the element, its mass gives the mass of the compound and so the purity, and a mixture of two compounds gives one equation in the mass of one of them.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'AP Chemistry', title: 'Elemental Analysis and Purity', subtitle: 'What is in a white powder?' }],
      lines: [
        { say: 'A chemist is handed a white powder. By burning a weighed sample, or dissolving it and collecting one of its elements, they can find how much of each element it holds.', show: 'title' },
        { say: 'In this lesson, you will work out mass percents, and use them to find what a sample is and how pure it is.' },
      ],
    },
    {
      chapter: 'Following the atoms',
      layout: 'center',
      main: [reaction('cb', { from: [{ t: 'CH4' }, { t: 'O2', n: 2 }], to: [{ t: 'CO2' }, { t: 'H2O', n: 2 }], counts: true, foot: { before: 'Burn a weighed sample of a compound…', after: '…and every carbon atom ends up in CO₂, every hydrogen atom in H₂O.' } })],
      lines: [
        { say: 'Here is a molecule of methane, with the oxygen it needs to burn.', show: 'cb' },
        { say: 'Watch the atoms as it burns. Every carbon atom ends up in carbon dioxide, and every hydrogen atom ends up in water. No atom is lost.', caption: 'Watch the atoms as it burns. Every carbon atom ends up in CO₂, and every hydrogen atom ends up in H₂O. No atom is lost.', play: 'cb.go' },
        { say: 'So if a chemist weighs the carbon dioxide and the water, they know how much carbon and hydrogen were in the sample. That is elemental analysis.' },
      ],
    },
    {
      chapter: 'Mass percent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mass percent of an element', md: '$\\text{mass percent} = \\dfrac{\\text{mass of the element in one mole}}{\\text{molar mass}} \\times 100$' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{C2H5OH}: M = 2(12) + 6(1) + 16 = 46\\ \\text{g/mol}', '\\text{C} = \\dfrac{24}{46} \\times 100 = 52.2\\%'] },
      ],
      lines: [
        { say: 'The mass percent of an element is the mass of that element in one mole of the compound, over the molar mass, times one hundred.', show: 'def' },
        { say: 'Ethanol, C two H five O H, has a molar mass of forty-six grams per mole.', caption: 'Ethanol, C₂H₅OH, has a molar mass of 46 g/mol.', show: 'm.0', focus: 'm.0' },
        { say: 'Its two carbon atoms weigh twenty-four grams, so ethanol is fifty-two point two percent carbon by mass.', caption: 'Its two carbon atoms weigh 24 g, so ethanol is 52.2% carbon by mass.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Definite proportions',
      layout: 'center',
      main: [substances('pm', 360)],
      lines: [
        { say: 'In a pure compound, every molecule is the same. Here, every water molecule has two hydrogen atoms joined to one oxygen atom.', show: ['pm', 'pm.labels'], focus: 'pm.cp' },
        { say: 'So every sample of pure water, large or small, from anywhere, has the same mass percent of each element. This is the law of definite proportions, and it is why a mass percent can identify a compound.' },
      ],
    },
    {
      chapter: 'Finding the purity',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CuSO4}: \\dfrac{63.5}{159.5} = 0.3981\\ \\text{copper}', '\\text{mass of } \\ce{CuSO4} = \\dfrac{1.82}{0.3981} = 4.572\\ \\text{g}', '\\text{purity} = \\dfrac{4.572}{5.00} \\times 100 = 91.4\\%'] }],
      lines: [
        { say: 'Now a five gram sample of impure copper sulfate holds one point eight two grams of copper, and the impurities hold none. Pure copper sulfate is zero point three nine eight one copper by mass.', caption: 'Now a 5.00 g sample of impure copper(II) sulfate holds 1.82 g of copper, and the impurities hold none. Pure CuSO₄ is 0.3981 copper by mass.', show: 'm.0', focus: 'm.0' },
        { say: 'All the copper came from the copper sulfate, so divide the copper by that fraction. There are four point five seven two grams of copper sulfate.', caption: 'All the copper came from the copper sulfate, so divide the copper by that fraction. There are 4.572 g of CuSO₄.', show: 'm.1', focus: 'm.1' },
        { say: 'Out of five grams, that is ninety-one point four percent pure.', caption: 'Out of 5.00 g, that is 91.4% pure.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'A mixture of two compounds', md: 'When both compounds contain the element, give each its own mass fraction: $f_1 x + f_2(\\text{total} - x) = \\text{mass of the element}$.' }],
      lines: [{ say: 'When both parts of a mixture contain the element, do not use one mass percent for the whole mixture. Call the mass of one compound x, give each compound its own fraction, and solve one equation for x.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the mass percent of oxygen in water, $\\ce{H2O}$? (H = 1, O = 16)',
          choices: ['16.0%', '88.9%', '11.1%', '33.3%'],
          answer: 1,
          working: '$M = 2 + 16 = 18$ g/mol, so oxygen is $\\dfrac{16}{18} \\times 100 = 88.9\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the mass percent of oxygen in water? Take hydrogen as one and oxygen as sixteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eighty-eight point nine percent. Water has a molar mass of eighteen, and sixteen over eighteen is zero point eight eight nine.', caption: 'The answer is B, 88.9%. Water has a molar mass of 18, and 16 ÷ 18 = 0.889.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mass percent = mass of the element in one mole ÷ molar mass × 100.', 'A pure compound always has the same mass percents.', 'If the impurities hold none of the element, its mass gives the purity.', 'For two compounds, write one equation in the mass of one of them.'] }],
      lines: [
        { say: 'Let’s sum up. The mass percent of an element is its mass in one mole, over the molar mass, times one hundred.', show: 'sum.0' },
        { say: 'A pure compound always has the same mass percents.', show: 'sum.1' },
        { say: 'If the impurities hold none of the element, the element’s mass gives the mass of the compound, and so the purity.', show: 'sum.2' },
        { say: 'And for a mixture of two compounds, write one equation in the mass of one of them.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
