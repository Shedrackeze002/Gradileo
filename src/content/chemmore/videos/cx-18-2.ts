import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';
import { alkaliInWater } from '../../chem10/videos/lib/c10-particles.ts';

const video: Explainer = {
  id: 'cx-18-2',
  lessonId: 'cx-18-2',
  title: 'Sodium, Calcium, Copper, Iron and Aluminium Compounds',
  thumbnail: 'aw',
  summary:
    'Sodium reacts vigorously with water, and its compounds include caustic soda, washing soda and baking soda. Limestone gives quicklime on heating, and quicklime gives slaked lime with water. Blue copper(II) sulfate crystals turn white when their water of crystallisation is driven off, and the formula of a hydrate follows from the masses before and after heating. Iron rusts with oxygen and water, and aluminium is protected by its oxide layer and reacts with alkalis as well as acids.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals, Industry and Inorganic Chemistry', title: 'Compounds of Five Metals', subtitle: 'Sodium, calcium, copper, iron and aluminium' }],
      lines: [
        { say: 'A bar of soap, a bag of cement, a fertiliser spray and a tin of baking soda all depend on compounds of sodium, calcium and copper.', show: 'title' },
        { say: 'In this lesson, you will describe these metals and their compounds, find the water in a hydrated salt, and see how iron and aluminium react.' },
      ],
    },
    {
      chapter: 'Sodium in water',
      layout: 'center',
      main: [alkaliInWater('aw')],
      lines: [
        { say: 'Sodium is a soft, very reactive metal, stored under paraffin oil. Here is sodium in the middle, between lithium and potassium, each about to meet water.', show: ['aw', 'aw.labels'] },
        { say: 'Water molecules attack the metal, setting hydrogen atoms loose, which pair up and bubble away. The metal dissolves as its hydroxide, so the solution is alkaline. Sodium floats, melts into a ball and fizzes.', play: 'aw.drop' },
      ],
    },
    {
      chapter: 'Sodium compounds',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Compound', 'Common name', 'Use'], rows: [['NaOH', 'caustic soda', 'soap and paper'], ['Na₂CO₃·10H₂O', 'washing soda', 'softening water, glass'], ['NaHCO₃', 'baking soda', 'raising dough; antacids']] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Water from the air', md: 'Sodium hydroxide is **deliquescent**: it absorbs water until it dissolves. Washing soda is **efflorescent**: it loses water and crumbles to powder.' },
      ],
      lines: [
        { say: 'Caustic soda is used to make soap and paper, washing soda softens water and makes glass, and baking soda makes dough rise and settles an upset stomach.', show: 't' },
        { say: 'Sodium hydroxide is deliquescent: left open, it absorbs water from the air until it dissolves. Washing soda is the opposite. It is efflorescent, losing water to the air and crumbling to powder.', show: 'k' },
      ],
    },
    {
      chapter: 'Lime from limestone',
      layout: 'center',
      main: [
        reaction('lq', { from: [{ t: 'CaCO3' }], to: [{ t: 'CaO' }, { t: 'CO2' }], height: 250 }),
        reaction('ls', { from: [{ t: 'CaO' }, { t: 'H2O' }], to: [{ t: 'CaOH2' }], height: 250 }),
      ],
      lines: [
        { say: 'Heating limestone drives out carbon dioxide and leaves quicklime, calcium oxide.', show: 'lq', play: 'lq.go' },
        { say: 'Quicklime reacts with water, giving out a lot of heat, to make slaked lime, calcium hydroxide. It is spread on fields to neutralise acid soils, and its solution is limewater.', show: 'ls', play: 'ls.go' },
        { say: 'Plaster of Paris, a calcium sulfate, sets hard with water and is used for casts and moulds.' },
      ],
    },
    {
      chapter: 'Water of crystallisation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Water of crystallisation', md: 'Water chemically bound in the crystals of a salt, such as the five water molecules in $\\ce{CuSO4.5H2O}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{water} = 1.248 - 0.798 = 0.450\\ \\text{g} = 0.0250\\ \\text{mol}', '\\ce{CuSO4} = 0.798 \\div 159.5 = 0.00500\\ \\text{mol} \\;\\Rightarrow\\; x = 5'] },
      ],
      lines: [
        { say: 'Blue copper two sulfate crystals turn white when heated, as their water of crystallisation is driven off. Water turns the white powder blue again, which is a test for water.', caption: 'Blue copper(II) sulfate crystals turn white when heated, as their water of crystallisation is driven off. Water turns the white powder blue again, which is a test for water.', show: 'def' },
        { say: 'One point two four eight grams of the crystals leave zero point seven nine eight grams of white powder. So zero point four five zero grams of water was lost, which is zero point zero two five zero moles.', caption: '1.248 g of the crystals leave 0.798 g of white powder. So 0.450 g of water was lost, which is 0.0250 mol.', show: 'm.0', focus: 'm.0' },
        { say: 'The anhydrous salt is zero point zero zero five zero zero moles. Zero point zero two five zero over zero point zero zero five zero zero is five, so the formula is C u S O four dot five H two O.', caption: 'The anhydrous salt is 0.00500 mol. 0.0250 ÷ 0.00500 = 5, so the formula is CuSO₄·5H₂O.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Iron and aluminium',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Iron rusts only with **oxygen and water**; salt speeds it up.', 'Hot iron and steam: $\\ce{3Fe + 4H2O -> Fe3O4 + 4H2}$', 'Aluminium is protected by a thin, tough **oxide layer**.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{2Al + 2NaOH + 6H2O -> 2NaAl(OH)4 + 3H2}'] },
      ],
      lines: [
        { say: 'Iron rusts only when both oxygen and water are present, and salt speeds it up. Hot iron reacts with steam to give an oxide and hydrogen.', show: ['b.0', 'b.1'] },
        { say: 'Aluminium is covered by a thin, tough oxide layer, so it seems less reactive than it really is.', show: 'b.2' },
        { say: 'Like its oxide, aluminium is amphoteric. It reacts with acids, and also with sodium hydroxide, giving hydrogen. That is why aluminium pans should not hold alkaline solutions.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '2.46 g of hydrated magnesium sulfate, $\\ce{MgSO4} \\cdot x\\,\\ce{H2O}$, leaves 1.20 g of the anhydrous salt ($M = 120$) on heating. What is $x$? ($\\ce{H2O}$ = 18)',
          choices: ['5', '6', '7', '10'],
          answer: 2,
          working: 'Water $= 1.26$ g $= 0.0700$ mol; salt $= 1.20 \\div 120 = 0.0100$ mol; $x = 0.0700 \\div 0.0100 = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two point four six grams of hydrated magnesium sulfate leaves one point two zero grams of the anhydrous salt, with a molar mass of one hundred twenty. What is x? Pause the video and try it.', caption: 'Your turn. 2.46 g of hydrated magnesium sulfate leaves 1.20 g of the anhydrous salt, with a molar mass of 120. What is x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seven. The water lost is one point two six grams, which is zero point zero seven zero zero moles, and the salt is zero point zero one zero zero moles. Seven waters for each magnesium sulfate.', caption: 'The answer is C, 7. The water lost is 1.26 g, which is 0.0700 mol, and the salt is 0.0100 mol. Seven waters for each magnesium sulfate.', show: 'q.answer' },
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
            'Caustic soda NaOH, washing soda Na₂CO₃·10H₂O, baking soda NaHCO₃.',
            'Limestone gives quicklime, and quicklime gives slaked lime with water.',
            'Blue CuSO₄·5H₂O turns white on heating, and blue again with water.',
            'Iron rusts with oxygen and water; aluminium reacts with alkalis too.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The sodium compounds are caustic soda, washing soda and baking soda.', show: 'sum.0' },
        { say: 'Limestone gives quicklime on heating, and quicklime gives slaked lime with water.', show: 'sum.1' },
        { say: 'Blue copper sulfate crystals turn white when their water is driven off, and blue again with water.', show: 'sum.2' },
        { say: 'And iron rusts with oxygen and water, while aluminium, protected by its oxide, reacts with alkalis as well as acids.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
