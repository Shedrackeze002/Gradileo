import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';
import { aluminiumCell } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-18-1',
  lessonId: 'cx-18-1',
  title: 'Extracting Aluminium, Iron and Tin',
  thumbnail: 'al',
  summary:
    'Metals above carbon in the reactivity series are extracted by electrolysis, and metals below it by reduction with carbon or carbon monoxide. Aluminium comes from alumina dissolved in molten cryolite, with carbon anodes that burn away. Iron comes from haematite, coke and limestone in the blast furnace, where carbon monoxide reduces the ore and calcium oxide removes sand as slag. Tin comes from cassiterite reduced with carbon, and the mass of metal follows from the formula of the ore or from the charge passed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals, Industry and Inorganic Chemistry', title: 'Extracting Aluminium, Iron and Tin', subtitle: 'Getting metals out of their ores' }],
      lines: [
        { say: 'Aluminium is the most common metal in the Earth’s crust, yet it was once more precious than gold, because nobody could get it out of its ore cheaply.', show: 'title' },
        { say: 'In this lesson, you will describe how aluminium, iron and tin are extracted, and calculate the mass of metal you get.' },
      ],
    },
    {
      chapter: 'Choosing a method',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraction', md: 'Obtaining a metal from its ore. Metals **above carbon** in the reactivity series need electrolysis; metals **below carbon** are reduced with carbon or carbon monoxide.' },
        { kind: 'table', id: 't', head: ['Metal', 'Ore', 'Method'], rows: [['Aluminium', 'bauxite (Al₂O₃)', 'electrolysis'], ['Iron', 'haematite (Fe₂O₃)', 'blast furnace'], ['Tin', 'cassiterite (SnO₂)', 'reduction with carbon']] },
      ],
      lines: [
        { say: 'The method depends on reactivity. A metal above carbon holds its oxygen too tightly for carbon to take it, so it needs electrolysis. A metal below carbon can be reduced with carbon or carbon monoxide.', show: 'def' },
        { say: 'So aluminium is extracted by electrolysis, while iron and tin are reduced with carbon.', show: 't' },
      ],
    },
    {
      chapter: 'Electrolysis of alumina',
      layout: 'center',
      main: [aluminiumCell('al')],
      lines: [
        { say: 'Bauxite is purified to alumina, aluminium oxide, and dissolved in molten cryolite. That lowers the working temperature from over two thousand degrees to about nine hundred fifty, and saves a great deal of energy.', caption: 'Bauxite is purified to alumina, aluminium oxide, and dissolved in molten cryolite. That lowers the working temperature from over 2000 °C to about 950 °C, and saves a great deal of energy.', show: ['al', 'al.key', 'al.tally'] },
        { say: 'With the current on, aluminium ions drift to the cathode and each takes three electrons to become aluminium metal. Oxide ions give up electrons at the anode, and the oxygen atoms pair up and bubble away.', play: 'al.run' },
      ],
    },
    {
      chapter: 'Aluminium from a charge',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'md', lines: ['\\text{cathode: } \\ce{Al^3+ + 3e- -> Al} \\qquad \\text{anode: } \\ce{2O^2- -> O2 + 4e-}'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['Q = 10 \\times 2 \\times 3600 = 72\\,000\\ \\text{C} \\;\\Rightarrow\\; 0.746\\ \\text{mol } e^-', '\\ce{Al} = 0.746 \\div 3 = 0.249\\ \\text{mol} = 6.72\\ \\text{g}'] },
      ],
      lines: [
        { say: 'The hot oxygen burns the carbon anodes away as carbon dioxide, so they are replaced regularly. And because the process uses so much electricity, recycling aluminium saves most of the energy.', show: 'e' },
        { say: 'A current of ten amps for two hours passes seventy-two thousand coulombs. Divided by the Faraday constant, that is zero point seven four six moles of electrons.', caption: 'A current of 10 A for 2 hours passes 72 000 C. Divided by the Faraday constant, 96 500, that is 0.746 mol of electrons.', show: 'm.0', focus: 'm.0' },
        { say: 'Each aluminium ion needs three electrons, so that makes zero point two four nine moles of aluminium, which is six point seven two grams.', caption: 'Each aluminium ion needs three electrons, so that makes 0.249 mol of aluminium, which is 6.72 g.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The blast furnace',
      layout: 'center',
      main: [
        reaction('co', { from: [{ t: 'CO2' }, { t: 'C' }], to: [{ t: 'CO', n: 2 }], counts: true, height: 280 }),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}', '\\ce{CaO + SiO2 -> CaSiO3} \\quad \\text{(slag)}'] },
      ],
      lines: [
        { say: 'Haematite, coke and limestone go in at the top of the blast furnace, and hot air is blown in at the bottom. The coke burns to carbon dioxide, which then meets more hot coke.', show: 'co' },
        { say: 'The carbon atom takes one oxygen from the carbon dioxide, and they become two carbon monoxide molecules. Carbon monoxide is the gas that reduces the ore.', play: 'co.go' },
        { say: 'It takes the oxygen from iron three oxide, leaving molten iron. Limestone breaks down to calcium oxide, which removes sand as slag, used for roads and cement.', caption: 'It takes the oxygen from iron(III) oxide, leaving molten iron. Limestone breaks down to calcium oxide, which removes sand as slag, used for roads and cement.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Tin, and masses in extraction',
      layout: 'center',
      main: [
        { kind: 'math', id: 's', size: 'md', lines: ['\\ce{SnO2 + 2C -> Sn + 2CO}'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Fe2O3}: M = 160,\\ \\text{iron} = 2 \\times 56 = 112', '160\\ \\text{kg of oxide} \\;\\Rightarrow\\; 112\\ \\text{kg of iron}'] },
      ],
      lines: [
        { say: 'Tin is easier still. Cassiterite is concentrated and heated with coke, which takes its oxygen.', show: 's' },
        { say: 'To find the mass of metal in an ore, use the formula. Iron three oxide has a molar mass of one hundred sixty, and its two iron atoms make up one hundred twelve of that. So one hundred sixty kilograms of the oxide gives one hundred twelve kilograms of iron.', caption: 'To find the mass of metal in an ore, use the formula. Iron(III) oxide has a molar mass of 160, and its two iron atoms make up 112 of that. So 160 kg of the oxide gives 112 kg of iron.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What mass of iron can be extracted from 80 kg of $\\ce{Fe2O3}$? (Fe = 56, O = 16)',
          choices: ['112 kg', '56 kg', '40 kg', '28 kg'],
          answer: 1,
          working: '$\\ce{Fe2O3}$ has $M = 160$, of which iron is 112. So $80 \\times 112 \\div 160 = 56$ kg.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of iron can be extracted from eighty kilograms of iron three oxide? Pause the video and try it.', caption: 'Your turn. What mass of iron can be extracted from 80 kg of iron(III) oxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Iron is one hundred twelve out of every one hundred sixty, and eighty kilograms is half of one hundred sixty, so it gives half of one hundred twelve, fifty-six kilograms.', caption: 'The answer is B. Iron is 112 out of every 160, and 80 kg is half of 160, so it gives half of 112, 56 kg.', show: 'q.answer' },
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
            'Aluminium: electrolysis of alumina in molten cryolite; the carbon anodes burn away.',
            'Iron: the blast furnace, where CO reduces the ore and slag is CaSiO₃.',
            'Tin: cassiterite reduced with carbon.',
            'Mass of metal: from the formula of the ore, or from charge = current × time.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Aluminium is extracted by electrolysis of alumina in molten cryolite, and the carbon anodes burn away.', show: 'sum.0' },
        { say: 'Iron is made in the blast furnace, where carbon monoxide reduces the ore and the slag is calcium silicate.', show: 'sum.1' },
        { say: 'Tin comes from cassiterite reduced with carbon.', show: 'sum.2' },
        { say: 'And the mass of metal comes from the formula of the ore, or in electrolysis from the charge, which is current times time.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
