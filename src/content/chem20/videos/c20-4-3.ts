import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { massBar, room } from './lib/c20-4a-figures.ts';

// The molar mass of water as a bar: 2 H and 1 O.
const waterBar = figure(
  'wb',
  [
    massBar({
      pieces: [
        { id: 'h', top: '2\\ \\text{H}', bottom: '2.02', value: 2.02, tone: 'adj' },
        { id: 'o', top: '1\\ \\text{O}', bottom: '16.00', value: 16.0, tone: 'bad' },
      ],
      total: '18.02\\ \\text{g/mol}',
    }),
    room('pad', [16.6, 0], [16.6, 1.1]),
  ],
  220,
);

// The molar mass of glucose as a bar: 6 C, 12 H and 6 O.
const glucoseBar = figure(
  'gb',
  [
    massBar({
      pieces: [
        { id: 'c', top: '6\\ \\text{C}', bottom: '72.06', value: 72.06, tone: 'theta' },
        { id: 'h', top: '12\\ \\text{H}', bottom: '12.12', value: 12.12, tone: 'adj' },
        { id: 'o', top: '6\\ \\text{O}', bottom: '96.00', value: 96.0, tone: 'bad' },
      ],
      total: '180.18\\ \\text{g/mol}',
    }),
    room('pad', [16.9, 0], [16.9, 1.1]),
  ],
  220,
);

const video: Explainer = {
  id: 'c20-4-3',
  lessonId: 'c20-4-3',
  title: 'The Mole and Molar Mass, Part 1: Molar Mass',
  thumbnailTitle: 'Molar Mass',
  thumbnail: 'gb',
  summary:
    'The molar mass of a substance is the mass of one mole of it, in grams per mole: add the molar masses of all the atoms in one formula unit, to two decimal places. Water is 2(1.01) + 16.00 = 18.02 g/mol and glucose 180.18 g/mol. A subscript after a bracket multiplies every atom inside it, so Al₂(SO₄)₃ holds 12 oxygen atoms and has a molar mass of 342.14 g/mol.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Quantitative Relationships in Chemical Changes · Part 1', title: 'Molar Mass', subtitle: 'The mass of one mole' }],
      lines: [
        { say: 'A small sip of water, five point zero zero grams of it, holds about one point six seven times ten to the twenty-third water molecules. Counting them at one a second would take far longer than the universe has existed.', caption: 'A small sip of water, 5.00 g of it, holds about 1.67 × 10²³ water molecules. Counting them at one a second would take far longer than the universe has existed.', show: 'title' },
        { say: 'Yet a chemist counts them in a moment with a balance, because a mole of any substance has a known mass.' },
        { say: 'This first part finds molar masses. Later parts add hydrates, convert between mass and moles, and count molecules and atoms.' },
      ],
    },
    {
      chapter: 'The mole and molar mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'mole', size: 'md', align: 'center', md: 'One **mole** of anything holds $6.02 \\times 10^{23}$ particles: **Avogadro’s number**.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Molar mass', md: 'The **molar mass**, $M$, of a substance is the mass of one mole of it, in grams per mole ($\\text{g/mol}$). For a compound, add the molar masses of all the atoms in one formula unit.' },
        { kind: 'text', id: 'dp', size: 'md', align: 'center', md: 'Use the values a question gives, to two decimal places: H $1.01\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.' },
      ],
      lines: [
        { say: 'The mole is the chemist’s counting unit. One mole of anything holds six point zero two times ten to the twenty-third particles: Avogadro’s number.', caption: 'The mole is the chemist’s counting unit. One mole of anything holds 6.02 × 10²³ particles: Avogadro’s number.', show: 'mole' },
        { say: 'The molar mass, capital M, is the mass of one mole of a substance, in grams per mole. For a compound, add the molar masses of all the atoms in one formula unit.', show: 'def' },
        { say: 'Each element’s molar mass comes from the periodic table, and questions state the values to use, to two decimal places. Keep the compound’s molar mass to two decimal places as well.', show: 'dp' },
      ],
    },
    {
      chapter: 'Water',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the molar mass of water, $\\ce{H2O}$, to the nearest hundredth? Use H $1.01\\ \\text{g/mol}$ and O $16.00\\ \\text{g/mol}$.' },
        waterBar,
        { kind: 'math', id: 'm', size: 'lg', lines: ['M(\\ce{H2O}) = 2(1.01) + 16.00 = \\good{18.02\\ \\text{g/mol}}'] },
      ],
      lines: [
        { say: 'Water first. One molecule holds two hydrogen atoms and one oxygen atom.', show: ['q', 'wb.h', 'wb.o'] },
        { say: 'Two times one point zero one, plus sixteen point zero zero, is eighteen point zero two grams per mole.', show: ['m', 'wb.total'], focus: ['m', 'wb.total'] },
      ],
    },
    {
      chapter: 'Glucose',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the molar mass of glucose, $\\ce{C6H12O6}$? Use C $12.01$, H $1.01$ and O $16.00\\ \\text{g/mol}$.' },
        glucoseBar,
        { kind: 'math', id: 'm', size: 'md', lines: ['M = 6(12.01) + 12(1.01) + 6(16.00)', '= 72.06 + 12.12 + 96.00 = \\good{180.18\\ \\text{g/mol}}'] },
      ],
      lines: [
        { say: 'Glucose, C six H twelve O six, holds six carbon atoms, twelve hydrogen atoms and six oxygen atoms.', caption: 'Glucose, C₆H₁₂O₆, holds six carbon atoms, twelve hydrogen atoms and six oxygen atoms.', show: ['q', 'm.0'] },
        { say: 'Six times twelve point zero one is seventy-two point zero six grams of carbon.', show: 'gb.c', focus: 'gb.c' },
        { say: 'Twelve times one point zero one is twelve point one two grams of hydrogen, and six times sixteen point zero zero is ninety-six point zero zero grams of oxygen.', show: ['gb.h', 'gb.o'], focus: ['gb.h', 'gb.o'] },
        { say: 'Together, one hundred eighty point one eight grams per mole.', show: ['m.1', 'gb.total'], focus: ['m.1', 'gb.total'] },
      ],
    },
    {
      chapter: 'Brackets',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Use Ca $40.08$, O $16.00$, H $1.01$, Al $26.98$ and S $32.06\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{Ca(OH)2}\\text{: } 1\\ \\text{Ca}, \\ 2\\ \\text{O}, \\ 2\\ \\text{H}',
            'M = 40.08 + 2(16.00) + 2(1.01) = \\good{74.10\\ \\text{g/mol}}',
            '\\ce{Al2(SO4)3}\\text{: } 2\\ \\text{Al}, \\ 3\\ \\text{S}, \\ 3 \\times 4 = 12\\ \\text{O}',
            'M = 2(26.98) + 3(32.06) + 12(16.00) = \\good{342.14\\ \\text{g/mol}}',
          ],
        },
      ],
      lines: [
        { say: 'A subscript after a bracket multiplies everything inside it. So calcium hydroxide holds one calcium, two oxygen and two hydrogen atoms.', caption: 'A subscript after a bracket multiplies everything inside it. So Ca(OH)₂ holds one calcium, two oxygen and two hydrogen atoms.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Forty point zero eight, plus two times sixteen point zero zero, plus two times one point zero one: seventy-four point one zero grams per mole.', show: 'm.1', focus: 'm.1' },
        { say: 'Aluminium sulfate holds two aluminium atoms, three sulfur atoms, and three times four, or twelve oxygen atoms.', caption: 'Al₂(SO₄)₃ holds two aluminium atoms, three sulfur atoms, and 3 × 4, or twelve oxygen atoms.', show: 'm.2', focus: 'm.2' },
        { say: 'Two times twenty-six point nine eight, plus three times thirty-two point zero six, plus twelve times sixteen: three hundred forty-two point one four grams per mole.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The bracket multiplies everything',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The bracket multiplies everything inside', md: 'In $\\ce{Al2(SO4)3}$ the 3 multiplies both the sulfur and the oxygen. Counting only 1 S and 4 O gives $2(26.98) + 32.06 + 4(16.00) = 150.02\\ \\text{g/mol}$, far too small.' },
      ],
      lines: [
        { say: 'A common slip is to forget the bracket, and count only one sulfur and four oxygen atoms. That gives one hundred fifty point zero two grams per mole, far too small.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the molar mass of magnesium nitrate, $\\ce{Mg(NO3)2}$, to the nearest hundredth? Use these molar masses: Mg $24.31\\ \\text{g/mol}$, N $14.01\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.',
          choices: ['$86.32\\ \\text{g/mol}$', '$100.33\\ \\text{g/mol}$', '$134.32\\ \\text{g/mol}$', '$148.33\\ \\text{g/mol}$'],
          answer: 3,
          working: 'One formula unit holds 1 Mg, 2 N and $2 \\times 3 = 6$ O: $24.31 + 2(14.01) + 6(16.00) = 148.33\\ \\text{g/mol}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the molar mass of magnesium nitrate, to the nearest hundredth? Use the molar masses on the screen. Pause the video and try it.', caption: 'Your turn. What is the molar mass of magnesium nitrate, Mg(NO₃)₂, to the nearest hundredth? Use the molar masses on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred forty-eight point three three grams per mole: the bracket gives two nitrogen and six oxygen atoms. Choice A forgets the bracket, and choices B and C apply it to only one element.', show: 'q.answer' },
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
            'The **molar mass**, $M$, is the mass of one mole, in $\\text{g/mol}$.',
            'Add the molar masses of all the atoms, to two decimal places: $M(\\ce{H2O}) = 18.02\\ \\text{g/mol}$.',
            'A subscript after a bracket multiplies **every atom** inside it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The molar mass is the mass of one mole, in grams per mole.', show: 'sum.0' },
        { say: 'Add the molar masses of all the atoms, to two decimal places. Water is eighteen point zero two grams per mole.', show: 'sum.1' },
        { say: 'And a subscript after a bracket multiplies every atom inside it. In part two, you will find the molar mass of a hydrate, a crystal with water built in. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
