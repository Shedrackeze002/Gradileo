import { ATOM } from '@/video/reactions.ts';
import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). A water molecule that lands on the
// iron wets it; an oxygen molecule that then hits wet iron joins it, and the iron becomes rust.
// Dry iron, or wet iron with no oxygen, never rusts. (Real rust is weak and flakes off; here it stays put, so the iron can be
// seen turning to rust atom by atom.) The kinds: 0 iron, 1 O in O2, 2 O in water, 3 H in water, 4 wet iron,
// 5 rusted iron, 6 O in rust.

const { O, H } = ATOM;

/** A piece of iron in air with `water` water molecules and `oxygen` oxygen molecules. */
const iron = (id: string, label: string, water: number, oxygen: number): ParticleBox => ({
  id,
  state: 'gas',
  width: 12,
  height: 9,
  temp: 0.6,
  lump: true,
  cols: 10,
  hold: true,
  // Nothing sticks to the iron, so the gases keep moving and reach all of it.
  cross: 0.2,
  kinds: [
    { n: 10, bond: 0.5, heavy: 3, tone: 'adj', name: 'iron' },
    O,
    O,
    H,
    { n: 0, bond: 0.5, heavy: 3, tone: 'adj', name: 'wet iron' },
    { n: 0, bond: 0.5, heavy: 3, tone: 'opp', name: 'rust' },
    { ...O, tone: 'opp', name: 'oxygen in rust' },
  ],
  molecules: [
    ...(oxygen ? [{ atoms: [1, 1], n: oxygen }] : []),
    ...(water ? [{ atoms: [2, 3, 3], n: water, bent: true }] : []),
  ],
  reactions: [
    { a: 2, b: 0, to: [2, 4] },
    { a: 1, b: 4, free: [6, null], carry: true, to: [6, 5], join: true },
  ],
  tally: { kinds: [5], label: 'rusted iron atoms' },
  label,
});

const rusting: ParticlesEl = {
  kind: 'particles',
  id: 'r',
  boxes: [iron('a', 'water and oxygen', 7, 9), iron('b', 'oxygen, no water', 0, 9), iron('c', 'water, no oxygen', 7, 0)],
  clips: { go: { phases: [{ dur: 1, release: ['a', 'b', 'c'] }, { dur: 14 }] } },
  speed: 3,
  height: 340,
};

const video: Explainer = {
  id: 'c8-4-2',
  lessonId: 'c8-4-2',
  title: 'Rusting and Corrosion',
  thumbnail: 'r',
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
      chapter: 'Rusting up close',
      layout: 'center',
      main: [rusting],
      lines: [
        { say: 'Let’s look at three pieces of iron, in blue, up close, sped up. The first has both water and oxygen round it, the second only oxygen, and the third only water.', show: ['r', 'r.labels', 'r.tally'], play: 'r.go' },
        { say: 'Only the first rusts. Water molecules settle on the iron, and oxygen then joins on to it, turning it into rust, shown in orange: iron joined to oxygen.', focus: 'r.a' },
        { say: 'Without water, or without oxygen, the iron stays as it is. Real rust is weak and flakes off, so the iron underneath is bared and rusts in turn, until the iron is eaten through.', focus: ['r.b', 'r.c'] },
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
