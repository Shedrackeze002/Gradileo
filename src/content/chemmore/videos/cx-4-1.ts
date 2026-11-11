import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-4-1',
  lessonId: 'cx-4-1',
  title: 'The Earth’s Atmosphere',
  thumbnail: false,
  summary:
    'Dry air today is about 78% nitrogen, 21% oxygen and nearly 1% argon, with a small amount of carbon dioxide. The early atmosphere, from volcanoes, was mostly carbon dioxide; oxygen came from photosynthesis, and the carbon dioxide was locked away in plants, sedimentary rocks and fossil fuels.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Earth’s Atmosphere and Resources', title: 'The Earth’s Atmosphere', subtitle: 'What the air is made of, and how it got that way' }],
      lines: [
        { say: 'Every breath you take is mostly a gas that your body does nothing with at all. And four billion years ago, there would have been almost no oxygen in it.', caption: 'Every breath you take is mostly a gas that your body does nothing with at all. And 4 billion years ago, there would have been almost no oxygen in it.', show: 'title' },
        { say: 'In this lesson, you will learn what the air is made of today, and how the early atmosphere changed into the one we breathe.' },
      ],
    },
    {
      chapter: 'The air today',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Atmosphere', md: 'The layer of gases that surrounds the Earth.' },
        { kind: 'table', id: 't', head: ['Gas', 'Share of dry air'], rows: [['Nitrogen', 'about 78%'], ['Oxygen', 'about 21%'], ['Argon', 'about 0.9%'], ['Carbon dioxide', 'about 0.04%']] },
      ],
      lines: [
        { say: 'The atmosphere is the layer of gases that surrounds the Earth.', show: 'def' },
        { say: 'Dry air is about seventy-eight percent nitrogen, roughly four-fifths.', caption: 'Dry air is about 78% nitrogen, roughly four-fifths.', show: 't.0', focus: 't.0' },
        { say: 'About twenty-one percent is oxygen, roughly one-fifth.', caption: 'About 21% is oxygen, roughly one-fifth.', show: 't.1', focus: 't.1' },
        { say: 'Almost all the rest is argon, a noble gas, and there is a tiny amount of carbon dioxide, about four hundredths of one percent.', caption: 'Almost all the rest is argon, a noble gas, and there is a tiny amount of carbon dioxide, about 0.04%.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'The early atmosphere',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Volcanoes released carbon dioxide, water vapour and nitrogen', 'The water vapour condensed to form the oceans', 'Algae and plants made oxygen by photosynthesis'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}'] },
      ],
      lines: [
        { say: 'In the Earth’s first billion years, intense volcanic activity released gases that formed the early atmosphere. It was mostly carbon dioxide, with water vapour and nitrogen, and very little oxygen.', show: 'b.0' },
        { say: 'As the Earth cooled, the water vapour condensed and formed the oceans.', show: 'b.1' },
        { say: 'Then algae, and later plants, began to photosynthesise. They took in carbon dioxide and water, and gave out oxygen. Over hundreds of millions of years, the oxygen built up to the level that lets animals live.', caption: 'Then algae, and later plants, began to photosynthesise: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Over hundreds of millions of years, the oxygen built up to the level that lets animals live.', show: ['b.2', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Where the carbon dioxide went',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Where the carbon went', 'How'], rows: [['Plants and algae', 'Photosynthesis took it in'], ['Sedimentary rocks', 'Dissolved in the oceans, it formed shells and carbonate rocks such as limestone'], ['Fossil fuels', 'Buried remains became coal, crude oil and natural gas']] }],
      lines: [
        { say: 'So where did all that carbon dioxide go? Some was taken in by plants and algae through photosynthesis.', show: 't.0', focus: 't.0' },
        { say: 'Much of it dissolved in the oceans. Sea creatures built shells and skeletons from carbonates, and these settled to form sedimentary rocks such as limestone.', show: 't.1', focus: 't.1' },
        { say: 'And some was locked into fossil fuels, when the remains of living things were buried before they could decay.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Volcanoes did not make the oxygen', md: 'Volcanoes released **carbon dioxide**, water vapour and nitrogen. The oxygen came later, from **photosynthesis**.' }],
      lines: [
        { say: 'A common mistake is to say that volcanoes made the oxygen. They released carbon dioxide, water vapour and nitrogen. The oxygen came later, from photosynthesis.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A room holds $50\\ \\text{m}^3$ of air. About how much of it is oxygen?',
          choices: ['$39\\ \\text{m}^3$', '$10.5\\ \\text{m}^3$', '$0.02\\ \\text{m}^3$', '$21\\ \\text{m}^3$'],
          answer: 1,
          working: '$21\\%$ of $50 = 0.21 \\times 50 = 10.5\\ \\text{m}^3$',
        },
      ],
      lines: [
        { say: 'Your turn. A room holds fifty cubic metres of air. About how much of it is oxygen? Pause the video and try it.', caption: 'Your turn. A room holds 50 m³ of air. About how much of it is oxygen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, ten point five cubic metres. Oxygen is about twenty-one percent of the air, and twenty-one percent of fifty is ten point five. Choice A is the nitrogen.', caption: 'The answer is B, 10.5 m³. Oxygen is about 21% of the air, and 21% of 50 is 10.5. Choice A is the nitrogen.', show: 'q.answer' },
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
          items: ['Dry air: about 78% nitrogen, 21% oxygen, 0.9% argon.', 'The early atmosphere came from volcanoes: mostly carbon dioxide.', 'Oxygen came from photosynthesis by algae and plants.', 'Carbon dioxide was locked in plants, rocks and fossil fuels.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Dry air is about seventy-eight percent nitrogen, twenty-one percent oxygen, and almost one percent argon.', caption: 'Let’s sum up. Dry air is about 78% nitrogen, 21% oxygen, and almost 1% argon.', show: 'sum.0' },
        { say: 'The early atmosphere came from volcanoes, and was mostly carbon dioxide.', show: 'sum.1' },
        { say: 'The oxygen came from photosynthesis by algae and plants.', show: 'sum.2' },
        { say: 'And the carbon dioxide was locked away in plants, sedimentary rocks and fossil fuels.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
