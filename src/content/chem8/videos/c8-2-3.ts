import type { Explainer } from '@/video/script.ts';

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
        { say: 'So the alkali metals get more reactive down the group.' },
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
