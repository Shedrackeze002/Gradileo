import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';
import { magnetSand } from '../../chem10/videos/lib/c10-particles.ts';

const video: Explainer = {
  id: 'cx-18-4',
  lessonId: 'cx-18-4',
  title: 'Mining, Ores and Cement',
  thumbnail: 'ms',
  summary:
    'An ore is a rock with enough metal to be worth extracting: gold occurs native, while aluminium and manganese occur as oxides. Ores are mined in open pits or underground, then crushed and concentrated to remove waste rock. Gold is dissolved by cyanide, and illegal mining with mercury pollutes rivers and land, which reclamation repairs. Cement is made by heating limestone and clay in a rotary kiln to clinker, which is ground with gypsum, and it sets by hydration.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals, Industry and Inorganic Chemistry', title: 'Mining, Ores and Cement', subtitle: 'Turning rock into metal and concrete' }],
      lines: [
        { say: 'Ghana’s gold, bauxite and manganese have been mined for generations, and limestone is quarried across West Africa to make cement.', show: 'title' },
        { say: 'In this lesson, you will describe how ores are mined and processed, the effects of mining, and how cement is made and sets.' },
      ],
    },
    {
      chapter: 'Ores and mining',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ore', md: 'A rock that contains enough of a metal or its compound to be **worth extracting**.' },
        { kind: 'bullets', id: 'b', items: ['Unreactive gold occurs **native**; aluminium and manganese occur as **oxides**.', '**Open-pit** mining is cheap but scars large areas.', '**Underground** mining reaches deep ores through shafts and tunnels.'] },
      ],
      lines: [
        { say: 'An ore is a rock with enough of a metal or its compound to be worth extracting. Unreactive gold is found native, as the metal itself, while reactive metals such as aluminium and manganese are found as oxides.', show: ['def', 'b.0'] },
        { say: 'Ores near the surface are dug from open pits, which is cheap but scars large areas. Deeper ores are reached underground, through shafts and tunnels.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Concentrating the ore',
      layout: 'center',
      main: [magnetSand('ms', 380)],
      lines: [
        { say: 'After mining, the ore is crushed and concentrated, to remove the waste rock, called gangue, so less energy is needed later. Washing and froth flotation do this, and for an iron ore, so does a magnet.', show: 'ms' },
        { say: 'Here the magnet pulls the iron mineral out, and the sand is left behind.', play: 'ms.go' },
      ],
    },
    {
      chapter: 'Processing the ores',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Ore', 'Main mineral', 'Processing'], rows: [['Gold ore', 'native gold', 'cyanide leaching'], ['Bauxite', 'aluminium oxide', 'alumina, then electrolysis'], ['Haematite', 'iron(III) oxide', 'blast furnace'], ['Manganese ore', 'manganese(IV) oxide', 'hard steels, dry cells']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{gold dissolves as } \\ce{[Au(CN)2]-}'] },
      ],
      lines: [
        { say: 'Bauxite becomes alumina for electrolysis, haematite goes to the blast furnace, and manganese makes hard, tough steels for rails and rock crushers.', show: ['t.1', 't.2', 't.3'] },
        { say: 'Gold is dissolved from crushed ore by cyanide solution, as a complex ion, and then recovered with zinc or activated carbon.', show: ['t.0', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Mining and the environment',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'w', tone: 'mistake', title: 'Galamsey', md: 'Illegal small-scale gold mining often uses **mercury**, which is burned off as poisonous vapour, and its digging silts the rivers.' },
        { kind: 'callout', id: 'r', tone: 'key', title: 'Land reclamation', md: 'Filling in the pits, replacing the topsoil and replanting the land.' },
      ],
      lines: [
        { say: 'Mining clears forest and farmland, and its waste can pollute rivers. Illegal gold mining, known in Ghana as galamsey, collects gold with mercury and burns the mercury off as a poisonous vapour, while the digging silts the rivers.', show: 'w' },
        { say: 'Land reclamation repairs the damage: the pits are filled in, the topsoil is put back, and the land is replanted.', show: 'r' },
      ],
    },
    {
      chapter: 'Making cement',
      layout: 'center',
      main: [
        reaction('k', { from: [{ t: 'CaCO3' }], to: [{ t: 'CaO' }, { t: 'CO2' }], height: 260 }),
        { kind: 'bullets', id: 'b', items: ['Limestone and clay heated in a **rotary kiln** at about 1400 °C.', 'CaO reacts with the clay to form **clinker**, ground with a little **gypsum**.', 'Cement **sets by hydration**, even under water.'] },
      ],
      lines: [
        { say: 'Limestone and clay are crushed, mixed and heated in a rotary kiln at about fourteen hundred degrees. The limestone breaks down to calcium oxide and carbon dioxide.', caption: 'Limestone and clay are crushed, mixed and heated in a rotary kiln at about 1400 °C. The limestone breaks down to calcium oxide and carbon dioxide.', show: ['k', 'b.0'], play: 'k.go' },
        { say: 'The calcium oxide reacts with the silica and alumina in the clay, making clinker, which is ground with a little gypsum to slow the setting.', show: 'b.1' },
        { say: 'Cement sets by reacting with water, forming interlocking crystals, so it even sets under water. Mortar is cement, sand and water, and concrete adds gravel. A cement works gives off dust and a great deal of carbon dioxide.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What mass of carbon dioxide is released when 25 tonnes of limestone is fully decomposed? ($\\ce{CaCO3}$ = 100, $\\ce{CO2}$ = 44)',
          choices: ['11.0 tonnes', '44.0 tonnes', '14.0 tonnes', '5.68 tonnes'],
          answer: 0,
          working: '100 tonnes gives 44 tonnes, so $25 \\times 44 \\div 100 = 11.0$ tonnes.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of carbon dioxide is released when twenty-five tonnes of limestone is fully decomposed? Pause the video and try it.', caption: 'Your turn. What mass of carbon dioxide is released when 25 tonnes of limestone is fully decomposed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One hundred tonnes of calcium carbonate gives forty-four tonnes of carbon dioxide, so twenty-five tonnes gives a quarter of that, eleven tonnes.', caption: 'The answer is A. 100 tonnes of calcium carbonate gives 44 tonnes of carbon dioxide, so 25 tonnes gives a quarter of that, 11.0 tonnes.', show: 'q.answer' },
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
            'An ore is worth extracting; gold occurs native, Al and Mn as oxides.',
            'Ores are mined in open pits or underground, crushed and concentrated.',
            'Gold dissolves in cyanide; galamsey’s mercury and silt harm rivers.',
            'Cement: limestone and clay in a rotary kiln, ground with gypsum; sets by hydration.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ore is worth extracting. Gold occurs native, and aluminium and manganese as oxides.', show: 'sum.0' },
        { say: 'Ores are mined in open pits or underground, then crushed and concentrated.', show: 'sum.1' },
        { say: 'Gold is dissolved by cyanide, and galamsey’s mercury and silt harm rivers and land.', show: 'sum.2' },
        { say: 'And cement is made from limestone and clay in a rotary kiln, ground with gypsum, and it sets by hydration.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
