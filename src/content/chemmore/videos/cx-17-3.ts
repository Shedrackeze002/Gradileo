import type { Explainer } from '@/video/script.ts';
import { ammoniaAndWater } from '../../chem30/videos/lib/c30-protons.ts';
import { haber } from './lib/cx-molecules.ts';

const video: Explainer = {
  id: 'cx-17-3',
  lessonId: 'cx-17-3',
  title: 'Nitrogen, Ammonia and Nitric Acid',
  thumbnail: 'hb',
  summary:
    'Nitrogen is unreactive because of its strong triple bond. Ammonia is made by the Haber process at about 450 °C and 200 atmospheres over iron; it is very soluble, alkaline and lighter than air, and it reduces hot copper(II) oxide. The percentage of nitrogen in a fertiliser is the nitrogen atoms × 14 ÷ the molar mass × 100. Nitric acid is made by the Ostwald process and is a strong oxidising agent, and nitrates decompose on heating in ways that depend on the metal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-metals and Their Compounds', title: 'Nitrogen, Ammonia and Nitric Acid', subtitle: 'Fixing the nitrogen of the air' }],
      lines: [
        { say: 'Nitrogen makes up nearly four fifths of the air, yet plants cannot use it, and it hardly reacts with anything.', show: 'title' },
        { say: 'In this lesson, you will describe nitrogen and ammonia, work out the nitrogen in a fertiliser, and see how nitric acid is made and behaves.' },
      ],
    },
    {
      chapter: 'The Haber process',
      layout: 'center',
      main: [haber('hb'), { kind: 'math', id: 'e', size: 'md', lines: ['\\ce{N2 + 3H2 <=> 2NH3} \\qquad 450\\ ^\\circ\\text{C},\\ 200\\ \\text{atm, iron catalyst}'] }],
      lines: [
        { say: 'Here is one nitrogen molecule and three hydrogen molecules, up close. The nitrogen atoms are held by a triple bond, which is why nitrogen is so unreactive.', show: 'hb' },
        { say: 'Watch the bonds break and the atoms join up as two ammonia molecules. In industry, this is the Haber process: about four hundred fifty degrees, two hundred atmospheres, and an iron catalyst.', caption: 'Watch the bonds break and the atoms join up as two ammonia molecules. In industry, this is the Haber process: about 450 °C, 200 atmospheres, and an iron catalyst.', show: 'e', play: 'hb.go' },
      ],
    },
    {
      chapter: 'Ammonia is alkaline',
      layout: 'center',
      main: [ammoniaAndWater('aw', { conjugates: false })],
      lines: [
        { say: 'Ammonia is extremely soluble in water, and its solution is alkaline. Here is why: an ammonia molecule beside a water molecule.', show: 'aw' },
        { say: 'The ammonia takes a hydrogen ion from the water, making an ammonium ion and a hydroxide ion. The hydroxide ions make the solution turn damp red litmus blue.', play: 'aw.go' },
      ],
    },
    {
      chapter: 'Ammonia and fertilisers',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Very soluble, alkaline and **lighter than air**.', 'Reduces hot copper(II) oxide: $\\ce{3CuO + 2NH3 -> 3Cu + N2 + 3H2O}$', 'Used for fertilisers, nitric acid and nylon.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\%\\ \\text{N in } \\ce{NH4NO3} = \\dfrac{2 \\times 14}{80} \\times 100 = 35.0\\%'] },
      ],
      lines: [
        { say: 'Ammonia is lighter than air, and it reduces hot copper two oxide to copper. Its main use is making fertilisers, and it is also used for nitric acid and nylon.', caption: 'Ammonia is lighter than air, and it reduces hot copper(II) oxide to copper. Its main use is making fertilisers, and it is also used for nitric acid and nylon.', show: 'b' },
        { say: 'Ammonium nitrate has two nitrogen atoms and a molar mass of eighty. Two times fourteen is twenty-eight, and twenty-eight over eighty is thirty-five percent nitrogen.', caption: 'Ammonium nitrate has two nitrogen atoms and a molar mass of 80. 2 × 14 = 28, and 28 ÷ 80 is 35.0% nitrogen.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Nitric acid',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{4NH3 + 5O2 -> 4NO + 6H2O} \\quad \\text{(platinum catalyst)}', '\\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O}'] },
      ],
      lines: [
        { say: 'In the Ostwald process, ammonia burns over a platinum catalyst to nitrogen monoxide. That is oxidised to nitrogen dioxide, which dissolves in water with more air to give nitric acid.', show: 'm.0' },
        { say: 'Nitric acid is a strong oxidising agent. Concentrated, it even reacts with copper, giving brown nitrogen dioxide gas instead of hydrogen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Heating nitrates',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Nitrate', 'Products on heating'],
          rows: [['Sodium, potassium', 'the nitrite and oxygen'], ['Most others (Ca, Zn, Pb, Cu)', 'the oxide, NO₂ and oxygen'], ['Silver', 'the metal, NO₂ and oxygen'], ['Ammonium', 'dinitrogen oxide and water']],
        },
      ],
      lines: [
        { say: 'Nitrates break down when heated, and the products depend on the metal. Sodium and potassium nitrates give the nitrite and oxygen.', show: 't.0' },
        { say: 'Most other nitrates give the metal oxide, brown nitrogen dioxide and oxygen. Silver nitrate gives the metal itself, and ammonium nitrate gives dinitrogen oxide and water.', show: ['t.1', 't.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the percentage by mass of nitrogen in urea, $\\ce{CO(NH2)2}$ ($M = 60$, N = 14)?',
          choices: ['46.7%', '23.3%', '28.0%', '35.0%'],
          answer: 0,
          working: '$\\dfrac{2 \\times 14}{60} \\times 100 = 46.7\\%$',
        },
      ],
      lines: [
        { say: 'Your turn. Urea has two nitrogen atoms and a molar mass of sixty. What is its percentage of nitrogen by mass? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two times fourteen is twenty-eight, and twenty-eight over sixty, times one hundred, is forty-six point seven percent.', caption: 'The answer is A. 2 × 14 = 28, and 28 ÷ 60 × 100 = 46.7%.', show: 'q.answer' },
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
            'Nitrogen is unreactive because of its triple bond.',
            'Haber process: N₂ + 3H₂ ⇌ 2NH₃; ammonia is soluble, alkaline and light.',
            '% nitrogen = N atoms × 14 ÷ molar mass × 100.',
            'Ostwald process makes nitric acid, a strong oxidising agent.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Nitrogen is unreactive because of its strong triple bond.', show: 'sum.0' },
        { say: 'Ammonia is made by the Haber process, and it is soluble, alkaline and lighter than air.', show: 'sum.1' },
        { say: 'The percentage of nitrogen is the number of nitrogen atoms times fourteen, over the molar mass, times one hundred.', show: 'sum.2' },
        { say: 'And the Ostwald process makes nitric acid, a strong oxidising agent.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
