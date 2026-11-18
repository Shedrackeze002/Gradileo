import type { Explainer, ParticleBox, ParticlesEl, Tone } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts). A piece of each alkali metal sits in
// water: a water particle that meets the metal sets a hydrogen atom loose and leaves the metal
// dissolved (as its hydroxide), and two loose hydrogen atoms join as a gas molecule that rises out.
// Each metal reacts more readily than the one above it, and gives out more heat, so the bubbles
// and the thermometers rise faster down the group.

const DISSOLVED = { n: 0, bond: 0.15, heavy: 0.3 } as const;

const alkali = (id: string, name: string, tone: Tone, chance: number, heat: number): ParticleBox => ({
  id,
  state: 'liquid',
  width: 8,
  height: 11,
  temp: 0.45,
  escape: [4],
  lump: true,
  waits: true,
  kinds: [
    { n: 12, bond: 3, heavy: 2, tone, name: 'metal' },
    { ...DISSOLVED, n: 20, size: 0.8, tone: 'adj', name: 'water' },
    { ...DISSOLVED, size: 0.8, tone, name: 'dissolved metal' },
    { ...DISSOLVED, size: 0.8, tone: 'theta', name: 'hydrogen atom' },
    { ...DISSOLVED, size: 0.8, heavy: -1.5, tone: 'theta', name: 'hydrogen gas' },
  ],
  reactions: [
    { a: 1, b: 0, to: [3, 2], chance, heat },
    { a: 3, b: 3, to: [4, 4], join: true },
  ],
  label: name,
});

const group1: ParticlesEl = {
  kind: 'particles',
  id: 'g1',
  boxes: [alkali('li', 'lithium', 'good', 0.0003, 0.01), alkali('na', 'sodium', 'opp', 0.0015, 0.03), alkali('k', 'potassium', 'brand', 0.008, 0.07)],
  clips: { drop: { phases: [{ dur: 1, release: ['li', 'na', 'k'] }, { dur: 12 }] } },
  thermometers: true,
  height: 420,
};


const video: Explainer = {
  id: 'c8-2-3',
  lessonId: 'c8-2-3',
  title: 'Families of Elements',
  thumbnail: 'water',
  summary:
    'Group 1, the alkali metals, are soft, very reactive metals that react with water to give hydrogen and an alkaline solution, and they get more reactive down the group. Group 17, the halogens, are reactive non-metals that get darker and less reactive down the group. Group 18, the noble gases, are very unreactive.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Periodic Table', title: 'Families of Elements', subtitle: 'Alkali metals, halogens and noble gases' }],
      lines: [
        { say: 'Drop a small piece of potassium into water, and it whizzes around and bursts into a lilac flame. Neon in a glass tube glows red, but never reacts with anything.', show: 'title' },
        { say: 'Both behaviours come from the family, or group, each element belongs to. In this video, you will meet three famous families.' },
      ],
    },
    {
      chapter: 'Group 1: the alkali metals',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{sodium} + \\text{water} \\rightarrow \\text{sodium hydroxide} + \\text{hydrogen}'] },
        {
          kind: 'table',
          id: 'water',
          head: ['Metal', 'With water'],
          rows: [
            ['lithium', 'fizzes steadily'],
            ['sodium', 'melts into a ball and whizzes around'],
            ['potassium', 'bursts into a lilac flame'],
          ],
        },
      ],
      lines: [
        { say: 'The alkali metals are group one: lithium, sodium, potassium and the elements below. They are soft enough to cut with a knife, and very reactive, so they are stored under oil.', show: 'eq' },
        { say: 'With water, they give off hydrogen gas and make a hydroxide, which dissolves to give an alkaline solution. That is how they got their name.' },
        { say: 'Lithium fizzes steadily. Sodium melts into a ball and whizzes around. Potassium bursts into a lilac flame.', show: ['water', 'water.0', 'water.1', 'water.2'] },
      ],
    },
    {
      chapter: 'Group 1, up close',
      layout: 'center',
      main: [group1],
      lines: [
        { say: 'Let’s watch all three in water, up close: lithium, sodium and potassium, each a small piece in the same amount of water.', show: ['g1', 'g1.labels', 'g1.thermo'] },
        { say: 'Where water meets the metal, hydrogen is set loose and bubbles away, and the metal dissolves. Lithium reacts slowly, sodium faster, and potassium fastest of all.', play: 'g1.drop' },
        { say: 'Potassium also gives out the most heat, so its water warms fastest. So the alkali metals get more reactive down the group.', focus: 'g1.k' },
      ],
    },
    {
      chapter: 'Halogens and noble gases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'hal',
          head: ['Halogen', 'At room temperature'],
          rows: [
            ['fluorine', 'pale yellow gas'],
            ['chlorine', 'green gas'],
            ['bromine', 'red-brown liquid'],
            ['iodine', 'grey-black solid'],
          ],
        },
        { kind: 'callout', id: 'noble', tone: 'key', title: 'Group 18: noble gases', md: 'Helium, neon, argon: colourless gases that are **very unreactive**.' },
      ],
      lines: [
        { say: 'The halogens are group seventeen: fluorine, chlorine, bromine and iodine. They are reactive non-metals.', show: 'hal' },
        { say: 'Down the group they get darker, and they change from gases to a liquid to a solid. And unlike group one, they get less reactive down the group.', show: ['hal.0', 'hal.1', 'hal.2', 'hal.3'] },
        { say: 'Chlorine kills bacteria, so small amounts are used to make drinking water and swimming pools safe.' },
        { say: 'The noble gases are group eighteen. They are very unreactive, and that is what makes them useful. Argon fills light bulbs, and neon glows red in signs.', show: 'noble' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Helium and hydrogen are both less dense than air. Why are party balloons filled with helium?',
          choices: ['helium is a metal', 'helium is unreactive, so it cannot burn', 'helium is an alkali metal', 'hydrogen is denser than air'],
          answer: 1,
          working: 'Hydrogen is flammable and can explode. Helium is a noble gas, so it does not react and cannot burn.',
        },
      ],
      lines: [
        { say: 'Your turn. Helium and hydrogen are both less dense than air. Why are party balloons filled with helium? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Hydrogen is flammable and can explode, but helium is a noble gas. It is unreactive, so it cannot burn.', show: 'q.answer' },
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
            '**Group 1**: soft, very reactive alkali metals.',
            'With water they give hydrogen and an alkaline solution.',
            '**Group 17**: halogens, less reactive down the group.',
            '**Group 18**: noble gases, very unreactive.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Group one, the alkali metals, are soft and very reactive, and get more reactive down the group.', show: 'sum.0' },
        { say: 'With water, they give hydrogen and an alkaline solution.', show: 'sum.1' },
        { say: 'Group seventeen, the halogens, are reactive non-metals that get less reactive down the group.', show: 'sum.2' },
        { say: 'And group eighteen, the noble gases, are very unreactive. Next, you will use patterns like these to make predictions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
