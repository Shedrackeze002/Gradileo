import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-6-1',
  lessonId: 'cx-6-1',
  title: 'Corrosion, Alloys and Materials',
  thumbnail: false,
  summary:
    'Iron rusts only when both oxygen and water are present. Barrier methods keep them out, and sacrificial protection uses a more reactive metal that corrodes instead. Alloys are harder than pure metals because different-sized atoms stop the layers sliding; ceramics, polymers and composites each suit different uses.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Materials and Industry', title: 'Corrosion, Alloys and Materials', subtitle: 'Stopping rust, and choosing the right material' }],
      lines: [
        { say: 'A steel bike left out in the rain grows orange flakes. An aluminium ladder beside it looks almost the same for years.', show: 'title' },
        { say: 'In this lesson, you will see what iron needs in order to rust, how rusting is prevented, and why alloys and other materials suit their uses.' },
      ],
    },
    {
      chapter: 'Rusting',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Corrosion', md: 'The destruction of a material by reactions with substances around it. **Rusting** is the corrosion of iron.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{iron} + \\text{oxygen} + \\text{water} \\rightarrow \\text{rust}'] },
      ],
      lines: [
        { say: 'Corrosion is the destruction of a material by reactions with substances around it. Rusting is the corrosion of iron.', show: 'def' },
        { say: 'Iron rusts only when both oxygen and water are present. A nail in dry air, or in boiled water sealed under oil, stays shiny. Salt water makes rusting faster.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Preventing rust',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Method', 'How it works'], rows: [['Barrier: paint, grease, plating', 'Keeps oxygen and water away'], ['Sacrificial protection', 'A more reactive metal corrodes instead'], ['Galvanising', 'A zinc coating: a barrier, and sacrificial']] }],
      lines: [
        { say: 'Barrier methods keep oxygen and water away from the iron: painting, oiling and greasing, or electroplating it with another metal.', show: 't.0', focus: 't.0' },
        { say: 'Sacrificial protection uses a metal that is more reactive than iron, such as zinc or magnesium. It reacts in place of the iron, so it corrodes and the iron is left alone.', show: 't.1', focus: 't.1' },
        { say: 'Galvanising coats iron with zinc, which does both. Even if the coating is scratched, the zinc still corrodes first.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Alloys',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Alloy', md: 'A mixture of a metal with other elements. The different-sized atoms **distort the layers**, so they cannot slide easily, and the alloy is harder.' },
        { kind: 'table', id: 't', head: ['Alloy', 'Made of'], rows: [['Bronze', 'Copper and tin'], ['Brass', 'Copper and zinc'], ['Stainless steel', 'Iron with chromium and nickel'], ['18 carat gold', '75% gold']] },
      ],
      lines: [
        { say: 'An alloy is a mixture of a metal with other elements. In a pure metal, layers of identical atoms slide easily. In an alloy, different-sized atoms distort the layers, so the alloy is harder.', show: 'def' },
        { say: 'Bronze is copper and tin, brass is copper and zinc, and stainless steel contains chromium and nickel, so it does not rust.', show: ['t.0', 't.1', 't.2'], focus: ['t.0', 't.1', 't.2'] },
        { say: 'Pure gold is twenty-four carat, and too soft for jewellery. Eighteen carat gold is eighteen over twenty-four, which is seventy-five percent gold.', caption: 'Pure gold is 24 carat, and too soft for jewellery. 18 carat gold is 18 ÷ 24 = 75% gold.', show: 't.3', focus: 't.3' },
        { say: 'Other materials suit other jobs. Glass and clay ceramics are made by heating. Polymers depend on their monomers and the conditions. And composites, such as concrete and carbon fibre, set a reinforcement in a matrix.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Order of reactivity: magnesium, zinc, iron, tin, copper. Which metal could give **sacrificial protection** to an iron pipe?',
          choices: ['Copper', 'Tin', 'None of them', 'Zinc'],
          answer: 3,
          working: 'A sacrificial metal must be **more reactive** than iron. Zinc is above iron.',
        },
      ],
      lines: [
        { say: 'Your turn. The order of reactivity is magnesium, zinc, iron, tin, copper. Which metal could give sacrificial protection to an iron pipe? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, zinc. A sacrificial metal must be more reactive than iron, so that it corrodes first. Tin and copper are less reactive, so the iron would corrode instead.', show: 'q.answer' },
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
          items: ['Iron rusts only with both oxygen and water.', 'Barriers keep them out; a more reactive metal can be sacrificed.', 'Alloys are harder: different-sized atoms stop layers sliding.', 'Pure gold is 24 carat.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Iron rusts only when both oxygen and water are present.', show: 'sum.0' },
        { say: 'Barrier methods keep them out, and a more reactive metal can be sacrificed to protect the iron.', show: 'sum.1' },
        { say: 'Alloys are harder than pure metals, because different-sized atoms stop the layers sliding.', show: 'sum.2' },
        { say: 'And pure gold is twenty-four carat.', caption: 'And pure gold is 24 carat.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
