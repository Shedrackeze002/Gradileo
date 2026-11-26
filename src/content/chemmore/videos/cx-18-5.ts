import type { Explainer } from '@/video/script.ts';
import { carbonatesHeated } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-18-5',
  lessonId: 'cx-18-5',
  title: 'Silicon, Silica and Thermal Stability',
  thumbnail: 'ch',
  summary:
    'Carbon dioxide is a gas of small O=C=O molecules, while silicon dioxide is a hard giant covalent lattice in which each silicon atom is bonded to four oxygen atoms. Silica is an acidic oxide; silicon is a semiconductor, silica makes glass, silica gel dries and silicones seal. Small, highly charged cations polarise carbonate and nitrate ions and make them less stable to heat, so thermal stability rises down Group 2, and Group 1 salts are more stable than Group 2 salts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals, Industry and Inorganic Chemistry', title: 'Silicon, Silica and Thermal Stability', subtitle: 'Why sand is not a gas' }],
      lines: [
        { say: 'Carbon and silicon sit one above the other in Group 4. Yet carbon dioxide is a gas you breathe out, and silicon dioxide is sand.', show: 'title' },
        { say: 'In this lesson, you will compare the two oxides, give the uses of silicon and its compounds, and explain why some carbonates break up on heating more easily than others.' },
      ],
    },
    {
      chapter: 'Two very different oxides',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Carbon dioxide', 'Silicon dioxide'], rows: [['Structure', 'small O=C=O molecules', 'giant lattice, Si bonded to four O'], ['At room temperature', 'gas', 'hard solid'], ['To melt', 'weak forces between molecules', 'many strong Si–O bonds']] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Giant covalent lattice', md: 'Every atom is joined to its neighbours by covalent bonds, throughout the whole solid.' },
      ],
      lines: [
        { say: 'Carbon forms strong double bonds with oxygen, so carbon dioxide is made of small molecules, with only weak forces between them. That is why it is a gas.', show: 't.0' },
        { say: 'Silicon is too large to form those double bonds well, so it makes four single bonds to oxygen, which link every atom into one giant covalent lattice.', show: 'def' },
        { say: 'To melt silica, many strong silicon to oxygen bonds must break, so it is a hard solid with a very high melting point.', show: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Silicon and its uses',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{SiO2 + 2NaOH -> Na2SiO3 + H2O}', '\\ce{SiO2 + 2C -> Si + 2CO}'] },
        { kind: 'table', id: 't', head: ['Substance', 'Use'], rows: [['Silicon', 'computer chips and solar cells'], ['Silica (sand)', 'glass and cement'], ['Silica gel', 'drying agent in packets'], ['Silicones', 'sealants, lubricants, heat-proof rubber']] },
      ],
      lines: [
        { say: 'Silica is an acidic oxide: it reacts with hot sodium hydroxide to give sodium silicate. Silicon itself is made by heating silica with carbon in an electric furnace.', show: 'm' },
        { say: 'Silicon is a semiconductor, used in computer chips and solar cells. Sand makes glass and cement, silica gel keeps packets dry, and silicones make sealants and heat-proof rubber.', show: 't' },
      ],
    },
    {
      chapter: 'Polarising power',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Polarising power', md: 'The ability of a cation to distort the electron cloud of a nearby anion. Small, highly charged cations have a high **charge density**, and so a high polarising power.' },
      ],
      lines: [
        { say: 'Why does one carbonate break up more easily than another? It depends on the metal ion.', show: 'def' },
        { say: 'A small, highly charged cation pulls electrons from the carbonate ion towards itself. That weakens the bonds inside the carbonate ion, so it breaks up into carbon dioxide more easily.' },
      ],
    },
    {
      chapter: 'Heating two carbonates',
      layout: 'center',
      main: [carbonatesHeated('ch')],
      lines: [
        { say: 'Here are magnesium carbonate and barium carbonate, heated to the same temperature.', show: ['ch', 'ch.labels', 'ch.thermo', 'ch.tally'] },
        { say: 'The small magnesium ion polarises its carbonate strongly, so it soon breaks up, and carbon dioxide escapes. The large barium ion barely distorts its carbonate, so barium carbonate hardly changes at this heat.', play: 'ch.heat' },
      ],
    },
    {
      chapter: 'The trends',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{MgCO3} < \\ce{CaCO3} < \\ce{SrCO3} < \\ce{BaCO3} \\quad \\text{(more stable to heat)}', '\\ce{2Mg(NO3)2 -> 2MgO + 4NO2 + O2}'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Group 1', md: 'Larger ions with only a **+1** charge, so Na and K carbonates do not decompose in a Bunsen flame. **Lithium** is the exception: it behaves like magnesium.' },
      ],
      lines: [
        { say: 'Down Group 2 the ions get larger, so their polarising power falls, and the carbonates and nitrates need higher temperatures to decompose.', show: 'm.0' },
        { say: 'Group 2 nitrates give the oxide, nitrogen dioxide and oxygen. Barium nitrate does the same, but needs a higher temperature.', show: 'm.1', focus: 'm.1' },
        { say: 'Group 1 ions are larger and carry only a single positive charge, so their salts are even more stable. Lithium is the exception: its small ion behaves like magnesium.', show: 'k' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which carbonate decomposes at the lowest temperature?',
          choices: ['$\\ce{BaCO3}$', '$\\ce{CaCO3}$', '$\\ce{MgCO3}$', '$\\ce{K2CO3}$'],
          answer: 2,
          working: '$\\ce{Mg^2+}$ is the smallest, most highly charged ion here, so it polarises the carbonate ion most.',
        },
      ],
      lines: [
        { say: 'Your turn. Which carbonate decomposes at the lowest temperature: barium, calcium, magnesium or potassium carbonate? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, magnesium carbonate. The magnesium ion is the smallest, with a two plus charge, so it polarises the carbonate ion most. Potassium carbonate does not decompose in a Bunsen flame at all.', show: 'q.answer' },
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
            'CO₂ is a gas of small molecules; SiO₂ is a hard giant covalent lattice.',
            'SiO₂ is acidic; silicon is a semiconductor; silica makes glass.',
            'Small, highly charged cations polarise anions and make salts less stable.',
            'Stability rises down Group 2, and Group 1 salts are more stable still.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Carbon dioxide is a gas of small molecules, while silicon dioxide is a hard giant covalent lattice.', show: 'sum.0' },
        { say: 'Silica is acidic, silicon is a semiconductor, and silica makes glass.', show: 'sum.1' },
        { say: 'Small, highly charged cations polarise anions and make their salts less stable to heat.', show: 'sum.2' },
        { say: 'So thermal stability rises down Group 2, and Group 1 salts are more stable still.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
