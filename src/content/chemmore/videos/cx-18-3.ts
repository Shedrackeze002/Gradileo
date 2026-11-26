import type { Explainer } from '@/video/script.ts';
import { fermenting } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-18-3',
  lessonId: 'cx-18-3',
  title: 'The Chemical Industry and Fermentation',
  thumbnail: 'fm',
  summary:
    'Heavy chemicals such as sulfuric acid and cement are made in huge amounts at low cost, while fine chemicals such as medicines are made in small amounts at high purity. A plant is sited where raw materials, energy, water, transport, labour, a market and safety come together at the lowest cost. Fermentation by yeast breaks sugar into ethanol and carbon dioxide without air at about 30 to 40 °C, and it makes bread rise, gives palm wine and helps make cassava safe as gari.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals, Industry and Inorganic Chemistry', title: 'The Chemical Industry and Fermentation', subtitle: 'From factories to palm wine' }],
      lines: [
        { say: 'Every country needs sulfuric acid, fertilisers, soap, cement and medicines. Long before modern factories, people in West Africa were already using living things to make bread, gari and palm wine.', show: 'title' },
        { say: 'In this lesson, you will tell heavy chemicals from fine ones, decide where a plant should be built, and describe fermentation.' },
      ],
    },
    {
      chapter: 'Heavy and fine chemicals',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Heavy chemical', 'Fine chemical'], rows: [['Amount', 'millions of tonnes', 'kilograms'], ['Cost', 'low per tonne', 'high value'], ['Examples', 'sulfuric acid, ammonia, NaOH, cement', 'medicines, dyes, perfumes']] },
      ],
      lines: [
        { say: 'A heavy chemical is made in very large amounts at a low cost per tonne, such as sulfuric acid, ammonia, sodium hydroxide and cement.', show: ['t.0', 't.1'] },
        { say: 'A fine chemical is made in small amounts, at high purity and high value, such as a medicine, a dye or a perfume.', show: 't.2' },
      ],
    },
    {
      chapter: 'Siting a chemical plant',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Raw materials**, especially bulky ones such as limestone.', '**Energy**, such as electricity for aluminium smelting.', '**Water** for cooling and for the reactions.', '**Transport**, **labour** and a **market**.', '**Safety** and the **environment**, with ways to treat waste.'] },
      ],
      lines: [
        { say: 'A plant is built where its needs come together at the lowest cost: raw materials, especially bulky ones like limestone for cement, energy, and water for cooling.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'It also needs transport, workers and a market, and it must be safely away from crowded homes, with a way to treat its waste.', show: ['b.3', 'b.4'] },
        { say: 'A by-product, such as slag or chlorine, can be sold to cut costs. Industry brings jobs and saves on imports, but untreated waste can poison rivers and air, so it must be controlled.' },
      ],
    },
    {
      chapter: 'Fermentation up close',
      layout: 'center',
      main: [fermenting('fm')],
      lines: [
        { say: 'Biotechnology uses living things such as yeast to make useful products. Here are sugar molecules and yeast cells in water, with no air.', show: ['fm', 'fm.key', 'fm.tally'] },
        { say: 'When a sugar molecule meets a yeast cell, the yeast’s enzymes split it. Part becomes ethanol, which stays in the solution, and part becomes carbon dioxide, which bubbles out. The yeast itself is not used up.', play: 'fm.ferment' },
      ],
    },
    {
      chapter: 'Fermentation in food',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{C6H12O6 -> 2C2H5OH + 2CO2} \\qquad 30\\text{ to }40\\ ^\\circ\\text{C, no air}'] },
        { kind: 'bullets', id: 'b', items: ['**Bread**: the carbon dioxide makes the dough rise.', '**Palm wine**: yeasts make ethanol; left open, it turns sour.', '**Gari**: fermenting cassava helps release its poisonous cyanide compounds.'] },
      ],
      lines: [
        { say: 'Glucose gives two ethanol molecules and two carbon dioxide molecules. It works best at about thirty to forty degrees. Hotter than that, the enzymes are destroyed.', caption: 'Glucose gives two ethanol molecules and two carbon dioxide molecules. It works best at about 30 to 40 °C. Hotter than that, the enzymes are destroyed.', show: 'm' },
        { say: 'In bread, the carbon dioxide makes the dough rise, and baking drives off the ethanol. In palm wine, yeasts make ethanol, and left open to air, microbes turn it sour.', show: ['b.0', 'b.1'] },
        { say: 'And grated cassava is fermented to sour it and help release its poisonous cyanide compounds, before it is pressed and roasted into gari.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What mass of ethanol ($M = 46$) can be made from 45 g of glucose ($M = 180$)?',
          choices: ['46.0 g', '23.0 g', '11.5 g', '92.0 g'],
          answer: 1,
          working: 'Glucose $= 45 \\div 180 = 0.25$ mol, giving $2 \\times 0.25 = 0.50$ mol of ethanol $= 0.50 \\times 46 = 23.0$ g.',
        },
      ],
      lines: [
        { say: 'Your turn. What mass of ethanol can be made from forty-five grams of glucose? Pause the video and try it.', caption: 'Your turn. What mass of ethanol can be made from 45 g of glucose? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Forty-five grams of glucose is zero point two five moles. Each glucose gives two ethanol molecules, so that is zero point five zero moles of ethanol, which is twenty-three grams.', caption: 'The answer is B. 45 g of glucose is 0.25 mol. Each glucose gives two ethanol molecules, so that is 0.50 mol of ethanol, which is 23.0 g.', show: 'q.answer' },
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
            'Heavy chemicals: huge amounts, low cost. Fine chemicals: small amounts, high purity.',
            'Siting: raw materials, energy, water, transport, labour, market and safety.',
            'Fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, by yeast, without air, at 30 to 40 °C.',
            'It makes bread rise, gives palm wine and helps make cassava safe as gari.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Heavy chemicals are made in huge amounts at low cost, and fine chemicals in small amounts at high purity.', show: 'sum.0' },
        { say: 'A plant is sited by its raw materials, energy, water, transport, labour, market and safety.', show: 'sum.1' },
        { say: 'Fermentation by yeast turns glucose into ethanol and carbon dioxide, without air, at about thirty to forty degrees.', caption: 'Fermentation by yeast turns glucose into ethanol and carbon dioxide, without air, at about 30 to 40 °C.', show: 'sum.2' },
        { say: 'And it makes bread rise, gives palm wine, and helps make cassava safe as gari.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
