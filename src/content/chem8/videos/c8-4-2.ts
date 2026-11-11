import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-4-2',
  lessonId: 'c8-4-2',
  title: 'Rusting and Corrosion',
  thumbnail: 'tubes',
  summary:
    'Iron rusts only when water and oxygen are both present, and salt makes it faster. Rusting is a slow oxidation, a chemical change, and only iron and steel rust. Paint, oil, plastic and tin are barriers; galvanizing with zinc also protects when scratched, because zinc is more reactive; stainless steel does not rust.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Materials', title: 'Rusting and Corrosion', subtitle: 'What makes iron rust, and how to stop it' }],
      lines: [
        { say: 'Every year, rust eats away a huge amount of iron and steel: car bodies, bridges, ships and railings.', show: 'title' },
        { say: 'If we understand exactly what makes iron rust, we can stop it. In this video, you will find out what rust needs, and the ways we protect iron.' },
      ],
    },
    {
      chapter: 'What makes iron rust',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{iron} + \\text{oxygen} + \\text{water} \\rightarrow \\text{rust}'] },
        {
          kind: 'table',
          id: 'tubes',
          head: ['Tube', 'Conditions', 'After a week'],
          rows: [
            ['A', 'tap water, open to the air', 'rusted'],
            ['B', 'dry air, with a drying agent', 'not rusted'],
            ['C', 'boiled water under oil', 'not rusted'],
            ['D', 'salty water, open to the air', 'rusted even more'],
          ],
        },
      ],
      lines: [
        { say: 'Rusting is the corrosion of iron and steel. Iron reacts slowly with oxygen and water to make rust, a flaky, reddish-brown form of iron oxide. It is a chemical change, and a slow oxidation.', show: 'eq' },
        { say: 'Rust is weak and flakes off, exposing fresh iron underneath, so rusting carries on until the iron is eaten through.' },
        { say: 'A classic experiment uses four nails. In tube A, with water and air, the nail rusts.', show: ['tubes', 'tubes.0'], focus: 'tubes.0' },
        { say: 'In tube B, the air is kept dry, so there is no water, and the nail does not rust.', show: 'tubes.1', focus: 'tubes.1' },
        { say: 'In tube C, boiling removes the air from the water, and oil keeps it out, so there is no oxygen. Again, no rust.', show: 'tubes.2', focus: 'tubes.2' },
        { say: 'In tube D, salty water makes the nail rust even more. So iron needs both water and oxygen to rust, and salt speeds it up.', show: 'tubes.3', focus: 'tubes.3' },
      ],
    },
    {
      chapter: 'Stopping rust',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'bar', tone: 'key', title: 'Barriers', md: 'Paint, oil, plastic and tin keep water and oxygen away from the iron.' },
        { kind: 'callout', id: 'galv', tone: 'tip', title: 'Galvanizing', md: 'A zinc coating. Zinc is **more reactive** than iron, so it reacts instead, even when scratched: **sacrificial protection**.' },
      ],
      lines: [
        { say: 'Most ways of stopping rust put a barrier between the iron and the water and oxygen. Gates and cars are painted, chains are oiled, and food cans are coated with tin.', show: 'bar' },
        { say: 'Galvanizing means coating iron with zinc. Zinc is more reactive than iron, so even if the coating is scratched, the zinc reacts instead of the iron. This is called sacrificial protection.', show: 'galv' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why is a bicycle chain oiled rather than painted?',
          choices: ['oil adds zinc to the chain', 'paint lets water through', 'oil keeps out water and air but lets the chain move', 'chains are made of aluminium'],
          answer: 2,
          working: 'Paint would crack and flake off the moving links. Oil is a barrier that still lets the links move freely.',
        },
      ],
      lines: [
        { say: 'Your turn. Why is a bicycle chain oiled rather than painted? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Paint would crack and flake off the moving links. Oil keeps out water and oxygen, and still lets the chain move freely.', show: 'q.answer' },
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
            'Iron rusts only with **water and oxygen**; salt speeds it up.',
            'Rusting is a slow oxidation; only iron and steel rust.',
            'Paint, oil, plastic and tin are barriers.',
            'Galvanizing with zinc protects even when scratched.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Iron rusts only when water and oxygen are both present, and salt makes it faster.', show: 'sum.0' },
        { say: 'Rusting is a slow oxidation. Other metals corrode, but only iron and steel rust.', show: 'sum.1' },
        { say: 'Paint, oil, plastic and tin protect iron by acting as barriers.', show: 'sum.2' },
        { say: 'And galvanizing with zinc protects iron even when the coating is scratched. Next, you will see how metals and alloys are chosen for their jobs.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
