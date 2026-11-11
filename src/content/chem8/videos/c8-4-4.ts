import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-4-4',
  lessonId: 'c8-4-4',
  title: 'Polymers, Ceramics and Composites',
  thumbnailTitle: 'Polymers and Ceramics',
  thumbnail: 'kinds',
  summary:
    'Polymers, such as plastics, are long-chain molecules: light, flexible, insulating and slow to rot. Ceramics, such as pottery, brick and glass, are hard and heat-resistant but brittle. Composites combine materials to get the best of each: reinforced concrete, fibreglass and carbon fibre. Choose a material by the property the job needs most.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Materials', title: 'Polymers, Ceramics and Composites', subtitle: 'Choosing the right material' }],
      lines: [
        { say: 'Look around a kitchen. The kettle has a plastic case, the plates are china, and the window is glass. Metals are only one family of materials.', show: 'title' },
        { say: 'In this video, you will meet the other three families, and learn how to choose the right material for a job.' },
      ],
    },
    {
      chapter: 'Three kinds of material',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'kinds',
          head: ['Kind', 'Examples', 'Properties'],
          rows: [
            ['polymers', 'polythene, PVC, nylon', 'light, flexible, waterproof, insulating'],
            ['ceramics', 'china, brick, glass', 'hard, heat-resistant, but brittle'],
            ['composites', 'fibreglass, carbon fibre', 'the best of two materials'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Long life has a cost', md: 'Most plastics do not rot, so plastic litter stays in the environment for hundreds of years.' },
      ],
      lines: [
        { say: 'Polymers are made of very long chain molecules. Most plastics are polymers, like polythene and nylon. They are usually light, flexible and waterproof, and good insulators.', show: ['kinds', 'kinds.0'], focus: 'kinds.0' },
        { say: 'But most plastics do not rot. That makes them useful, but it also means plastic litter stays in the environment for hundreds of years, so reusing and recycling plastics matters.', show: 'oops' },
        { say: 'Ceramics are made by heating clay or minerals to high temperatures: pottery, china, brick and glass. They are hard and resist heat, but they are brittle, so they shatter.', show: 'kinds.1', focus: 'kinds.1' },
        { say: 'Composites combine two or more materials to get the best properties of each, like fibreglass and carbon fibre.', show: 'kinds.2', focus: 'kinds.2' },
        { say: 'Reinforced concrete is a composite. Concrete is strong when squeezed, but cracks when stretched. Steel rods set inside it are strong when stretched, so together they resist both.' },
      ],
    },
    {
      chapter: 'Choosing a material',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'choose',
          head: ['Job', 'Property needed', 'Choice'],
          rows: [
            ['saucepan body', 'conducts heat', 'metal'],
            ['saucepan handle', 'does not conduct heat', 'plastic or wood'],
            ['racing bike frame', 'strong and light', 'carbon fibre'],
          ],
        },
      ],
      lines: [
        { say: 'To choose a material, decide which property matters most for the job, then pick the material that has it.', show: 'choose' },
        { say: 'A saucepan body must conduct heat to the food, so it is made of a metal. But the handle must not conduct heat to the cook’s hand, so it is a hard plastic or wood.', show: ['choose.0', 'choose.1'], focus: 'choose.0' },
        { say: 'A racing bike frame must be strong and light, so carbon fibre is a good choice.', show: 'choose.2', focus: 'choose.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which material is best for the covering of electrical wires?',
          choices: ['copper', 'PVC plastic', 'glass', 'steel'],
          answer: 1,
          working: 'The covering must be a flexible insulator. PVC is a polymer that is flexible and does not conduct electricity.',
        },
      ],
      lines: [
        { say: 'Your turn. Which material is best for the covering of electrical wires? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, P V C plastic. The covering must bend with the wire and must not conduct electricity, so it needs a flexible insulator. Glass is an insulator, but it would shatter.', show: 'q.answer' },
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
            '**Polymers**: light, flexible insulators that are slow to rot.',
            '**Ceramics**: hard and heat-resistant, but brittle.',
            '**Composites** combine the best of two materials.',
            'Choose by the property the job needs most.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Polymers, like plastics, are light, flexible insulators that are slow to rot.', show: 'sum.0' },
        { say: 'Ceramics, like pottery and glass, are hard and heat-resistant, but brittle.', show: 'sum.1' },
        { say: 'Composites combine materials to get the best of each.', show: 'sum.2' },
        { say: 'And to choose a material, find the property the job needs most. That completes Chemistry 8. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
