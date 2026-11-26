import type { Explainer } from '@/video/script.ts';
import { reaction } from '../../chem10/videos/lib/c10-equations.ts';

const video: Explainer = {
  id: 'cx-17-5',
  lessonId: 'cx-17-5',
  title: 'Carbon: Coal, Fuel Gases and the Oxides of Carbon',
  thumbnail: 'bf',
  summary:
    'Coal ranges from peat to anthracite as its carbon content rises, and destructive distillation of coal gives coke, coal tar, ammoniacal liquor and coal gas. Water gas (CO and H₂) is made by passing steam over white-hot coke, and producer gas (CO and N₂) by passing air over it. Carbon dioxide is acidic and turns limewater milky, while carbon monoxide is neutral, poisonous and a reducing agent. Most carbonates give the oxide and carbon dioxide on heating, but sodium and potassium carbonates do not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Non-metals and Their Compounds', title: 'Carbon: Coal, Fuel Gases and the Oxides of Carbon', subtitle: 'From buried plants to the blast furnace' }],
      lines: [
        { say: 'Coal formed from plants buried for millions of years. Heated without air, it gives coke, the fuel that runs a blast furnace.', show: 'title' },
        { say: 'In this lesson, you will describe coal and its products, the fuel gases made from coke, and the two oxides of carbon.' },
      ],
    },
    {
      chapter: 'Coal and coke',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Type of coal', 'Carbon'], rows: [['Peat', 'about 50 to 60%'], ['Lignite (brown coal)', 'about 60 to 75%'], ['Bituminous coal', 'about 75 to 90%'], ['Anthracite', 'about 92 to 98%']] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Destructive distillation', md: 'Heating a substance strongly **without air**, so that it breaks down into new products: coke, coal tar, ammoniacal liquor and coal gas.' },
      ],
      lines: [
        { say: 'The older and more compressed a coal is, the more carbon it holds, from peat at about half carbon up to anthracite at almost all carbon.', show: 't' },
        { say: 'Destructive distillation heats coal strongly without air. It gives coke, which is almost pure carbon, coal tar for dyes, drugs and road tar, ammoniacal liquor for fertiliser, and coal gas as a fuel.', show: 'def' },
      ],
    },
    {
      chapter: 'Water gas',
      layout: 'center',
      main: [
        reaction('wg', { from: [{ t: 'C' }, { t: 'H2O' }], to: [{ t: 'CO' }, { t: 'H2' }], counts: true, height: 300 }),
        { kind: 'math', id: 'p', size: 'md', lines: ['\\text{producer gas: } \\ce{2C + O2 -> 2CO} \\quad (+\\ \\ce{N2}\\text{ from the air})'] },
      ],
      lines: [
        { say: 'Here is steam passing over white-hot coke, up close. The carbon atom takes the oxygen from the water molecule, and the hydrogen is set free.', show: 'wg', play: 'wg.go' },
        { say: 'This mixture of carbon monoxide and hydrogen is water gas. Both gases burn, so it is a good fuel, and as synthesis gas it is used to make methanol.' },
        { say: 'Producer gas is made with air instead of steam. It carries the nitrogen of the air, which does not burn, so it is a poorer fuel.', show: 'p' },
      ],
    },
    {
      chapter: 'The oxides of carbon',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Carbon dioxide', 'Carbon monoxide'],
          rows: [
            ['Made from', 'marble and dilute HCl', 'methanoic acid and conc. H₂SO₄'],
            ['Burning', 'does not burn', 'blue flame'],
            ['Nature', 'acidic', 'neutral'],
            ['In the body', 'harmless in small amounts', 'poisonous'],
            ['Use', 'fire extinguishers, fizzy drinks', 'reducing agent'],
          ],
        },
      ],
      lines: [
        { say: 'Carbon dioxide is made from marble chips and dilute acid. It does not burn, it is acidic, and it is used in fire extinguishers and fizzy drinks.', show: ['t.0', 't.1', 't.2'] },
        { say: 'Carbon monoxide burns with a blue flame and is neutral. It is poisonous, because it binds to haemoglobin in the blood, and it is a reducing agent.', show: ['t.3', 't.4'] },
        { say: 'Carbon dioxide turns limewater milky. With more carbon dioxide, the milkiness clears again, as soluble calcium hydrogencarbonate forms.' },
      ],
    },
    {
      chapter: 'Carbon monoxide reduces iron oxide',
      layout: 'center',
      main: [reaction('bf', { from: [{ t: 'Fe2O3' }, { t: 'CO', n: 3 }], to: [{ t: 'Fe', n: 2 }, { t: 'CO2', n: 3 }], counts: true, height: 340 })],
      lines: [
        { say: 'In the blast furnace, carbon monoxide meets iron three oxide.', caption: 'In the blast furnace, carbon monoxide meets iron(III) oxide.', show: 'bf' },
        { say: 'Each carbon monoxide molecule takes one oxygen and becomes carbon dioxide. Three of them strip all three oxygens, and two iron atoms are left behind.', play: 'bf.go' },
      ],
    },
    {
      chapter: 'Heating carbonates',
      layout: 'center',
      main: [
        reaction('hc', { from: [{ t: 'CaCO3' }], to: [{ t: 'CaO' }, { t: 'CO2' }], height: 280 }),
        { kind: 'bullets', id: 'b', items: ['Sodium and potassium carbonates do **not** decompose.', 'Green copper(II) carbonate turns black.', 'White zinc carbonate gives zinc oxide, **yellow when hot**.'] },
      ],
      lines: [
        { say: 'Most carbonates break down on heating to the oxide and carbon dioxide. Here, calcium carbonate gives calcium oxide and carbon dioxide.', show: 'hc', play: 'hc.go' },
        { say: 'Sodium and potassium carbonates do not decompose. Green copper two carbonate turns black, and white zinc carbonate gives zinc oxide, which is yellow when hot.', caption: 'Sodium and potassium carbonates do not decompose. Green copper(II) carbonate turns black, and white zinc carbonate gives zinc oxide, which is yellow when hot.', show: 'b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What volume of $\\ce{CO2}$, at room temperature and pressure, forms when 5.0 g of $\\ce{CaCO3}$ ($M = 100$) decomposes completely? (1 mol of gas = 24 dm³)',
          choices: ['2.4 dm³', '0.050 dm³', '12 dm³', '1.2 dm³'],
          answer: 3,
          working: '$5.0 \\div 100 = 0.050$ mol of $\\ce{CaCO3}$ gives 0.050 mol of $\\ce{CO2}$, and $0.050 \\times 24 = 1.2$ dm³.',
        },
      ],
      lines: [
        { say: 'Your turn. What volume of carbon dioxide forms at room temperature and pressure when five grams of calcium carbonate decomposes completely? Pause the video and try it.', caption: 'Your turn. What volume of carbon dioxide forms at room temperature and pressure when 5.0 g of calcium carbonate decomposes completely? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Five grams is zero point zero five zero moles, which gives zero point zero five zero moles of carbon dioxide, and that times twenty-four is one point two cubic decimetres.', caption: 'The answer is D. 5.0 g is 0.050 mol, which gives 0.050 mol of carbon dioxide, and 0.050 × 24 = 1.2 dm³.', show: 'q.answer' },
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
            'Destructive distillation of coal: coke, coal tar, ammoniacal liquor, coal gas.',
            'Water gas (CO + H₂) uses steam; producer gas (CO + N₂) uses air.',
            'CO₂ is acidic and turns limewater milky; CO is neutral, poisonous and reducing.',
            'Most carbonates give the oxide and CO₂ on heating; Na and K carbonates do not.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Destructive distillation of coal gives coke, coal tar, ammoniacal liquor and coal gas.', show: 'sum.0' },
        { say: 'Water gas is made with steam, and producer gas with air.', show: 'sum.1' },
        { say: 'Carbon dioxide is acidic and turns limewater milky, while carbon monoxide is neutral, poisonous and a reducing agent.', show: 'sum.2' },
        { say: 'And most carbonates give the oxide and carbon dioxide on heating, but sodium and potassium carbonates do not.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
