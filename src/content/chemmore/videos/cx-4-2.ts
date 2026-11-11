import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-4-2',
  lessonId: 'cx-4-2',
  title: 'Greenhouse Gases and Air Pollution',
  thumbnail: false,
  summary:
    'Greenhouse gases such as carbon dioxide, methane and water vapour absorb heat radiated by the Earth and keep it warm; human activity is adding more, which is causing climate change. Burning fuels also releases carbon monoxide and soot from incomplete combustion, sulfur dioxide from sulfur impurities, and oxides of nitrogen from the air.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Earth’s Atmosphere and Resources', title: 'Greenhouse Gases and Air Pollution', subtitle: 'What burning fuel puts into the air' }],
      lines: [
        { say: 'Without any greenhouse gases, the Earth would be frozen. With too much of them, it warms. And burning fuels adds more than just carbon dioxide to the air.', show: 'title' },
        { say: 'In this lesson, you will explain the greenhouse effect and carbon footprints, and how the pollutants from burning fuels form.' },
      ],
    },
    {
      chapter: 'The greenhouse effect',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Greenhouse gas', md: 'A gas that **absorbs the heat** radiated by the Earth and keeps the planet warm: carbon dioxide, methane and water vapour.' },
        { kind: 'bullets', id: 'b', items: ['Sunlight passes through the atmosphere and warms the surface', 'The warm surface radiates heat back out', 'Greenhouse gases absorb some of that heat and send it back'] },
      ],
      lines: [
        { say: 'A greenhouse gas absorbs the heat radiated by the Earth. Carbon dioxide, methane and water vapour are the main ones.', show: 'def' },
        { say: 'Sunlight passes through the atmosphere and warms the Earth’s surface.', show: 'b.0' },
        { say: 'The warm surface radiates heat back out, and greenhouse gases absorb some of it and send it back, which keeps the Earth warm.', show: ['b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Climate change and carbon footprints',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Carbon footprint', md: 'The total amount of carbon dioxide and other greenhouse gases released over the **full life cycle** of a product, a service or an event.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['30\\ \\text{km} \\times 0.2\\ \\text{kg per km} = 6\\ \\text{kg}'] },
      ],
      lines: [
        { say: 'Burning fossil fuels and cutting down forests add carbon dioxide; farming cattle and landfill add methane. Most scientists agree that this is warming the Earth and changing its climate: rising seas, more extreme weather, and habitats shifting.' },
        { say: 'A carbon footprint is the total of the greenhouse gases released over the full life cycle of something.', show: 'def' },
        { say: 'A car releases point two kilograms of carbon dioxide per kilometre. A thirty-kilometre journey releases thirty times point two, which is six kilograms. Using less energy, renewable sources and public transport all cut a footprint.', caption: 'A car releases 0.2 kg of carbon dioxide per km. A 30 km journey releases 30 × 0.2 = 6 kg. Using less energy, renewable sources and public transport all cut a footprint.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Pollutants from burning fuels',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Pollutant', 'How it forms', 'Harm'],
          rows: [['Carbon monoxide', 'Incomplete combustion', 'Toxic; no colour or smell'], ['Soot', 'Incomplete combustion', 'Global dimming; breathing problems'], ['Sulfur dioxide', 'Sulfur impurities burn', 'Acid rain'], ['Oxides of nitrogen', 'Nitrogen and oxygen from the air react in hot engines', 'Acid rain; breathing problems']],
        },
      ],
      lines: [
        { say: 'When there is not enough oxygen, a fuel burns incompletely. This makes carbon monoxide, a toxic gas with no colour or smell that stops the blood carrying oxygen.', show: 't.0', focus: 't.0' },
        { say: 'Incomplete combustion also makes soot, tiny particles of carbon that cause breathing problems and global dimming, by reflecting sunlight.', show: 't.1', focus: 't.1' },
        { say: 'Sulfur impurities in a fuel burn to sulfur dioxide, which causes acid rain.', show: 't.2', focus: 't.2' },
        { say: 'And at the high temperature inside an engine, nitrogen and oxygen from the air react to form oxides of nitrogen, which also cause acid rain.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The nitrogen is not in the fuel', md: 'Oxides of nitrogen form from the nitrogen in the **air**, which reacts with oxygen at the high temperature of an engine.' }],
      lines: [{ say: 'A common mistake is to think the nitrogen comes from the fuel. It comes from the air, which reacts with oxygen at the high temperature of an engine.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas heater burns in a room with poor ventilation. Which harmful gas is it most likely to produce?',
          choices: ['Sulfur dioxide', 'Methane', 'Oxygen', 'Carbon monoxide'],
          answer: 3,
          working: 'Little oxygen means **incomplete combustion**, which makes carbon monoxide.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas heater burns in a room with poor ventilation. Which harmful gas is it most likely to produce? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, carbon monoxide. With little oxygen the gas burns incompletely, and carbon monoxide cannot be seen or smelled, which is why it is so dangerous.', show: 'q.answer' },
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
          items: ['Greenhouse gases absorb heat radiated by the Earth.', 'More carbon dioxide and methane are changing the climate.', 'A carbon footprint covers a product’s whole life.', 'Burning fuels releases CO, soot, SO₂ and oxides of nitrogen.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Greenhouse gases absorb the heat radiated by the Earth.', show: 'sum.0' },
        { say: 'Human activity is adding more carbon dioxide and methane, which is changing the climate.', show: 'sum.1' },
        { say: 'A carbon footprint covers the whole life of a product or event.', show: 'sum.2' },
        { say: 'And burning fuels releases carbon monoxide, soot, sulfur dioxide and oxides of nitrogen.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
