import type { Explainer, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts): they move by themselves, and a clip
// pushes a piston in or heats or cools a box.

/** Gas particles that barely attract one another, with no weight to speak of. */
const GAS = { bond: 0.15, heavy: 0 } as const;

/** Particles hitting the walls of their container. */
const walls: ParticlesEl = {
  kind: 'particles',
  id: 'w',
  boxes: [{ id: 'b', state: 'gas', width: 10, height: 10, temp: 1.6, kinds: [{ n: 14, ...GAS }] }],
  clips: {},
  height: 470,
};

/** A gas under a piston, to push in: the same particles, with less empty space. */
const squeeze: ParticlesEl = {
  kind: 'particles',
  id: 'sq',
  boxes: [{ id: 'b', state: 'gas', width: 8, height: 10, temp: 1.6, piston: true, kinds: [{ n: 12, ...GAS }] }],
  clips: { push: { phases: [{ dur: 4, lid: { b: 0.4 } }] } },
  height: 470,
};

/** A rigid can, heated, and a balloon (a piston, for its rubber), cooled. */
const can: ParticlesEl = {
  kind: 'particles',
  id: 'cn',
  boxes: [
    { id: 'c', state: 'gas', width: 7, height: 8, temp: 1.2, kinds: [{ n: 10, ...GAS }], label: 'rigid can' },
    { id: 'b', state: 'gas', width: 7, height: 8, temp: 1.6, piston: true, kinds: [{ n: 10, ...GAS }], label: 'balloon' },
  ],
  clips: {
    heat: { phases: [{ dur: 4, heat: { c: 3.6 } }] },
    cold: { phases: [{ dur: 4, heat: { b: 0.6 }, lid: { b: 0.62 } }] },
  },
  thermometers: true,
  height: 420,
};

/** Perfume (orange) and air (blue) kept apart until the wall between them is lifted. */
const spread: ParticlesEl = {
  kind: 'particles',
  id: 'df',
  boxes: [{ id: 'g', state: 'gas', kinds: [{ n: 8, tone: 'opp', ...GAS }, { n: 18, tone: 'adj', ...GAS }], apart: true, divider: 0.3, width: 11, height: 9, temp: 1.6, label: 'perfume and air' }],
  clips: { lift: { phases: [{ dur: 12, lift: ['g'] }] } },
  height: 460,
};

const video: Explainer = {
  id: 'c20-2-1-c',
  lessonId: 'c20-2-1',
  title: 'Gases and the Kinetic Molecular Theory, Part 3: Explaining How Gases Behave',
  thumbnailTitle: 'Explaining How Gases Behave',
  thumbnail: 'cn',
  summary:
    'The kinetic molecular theory explains how gases behave. Particles hitting the walls make pressure; empty space makes a gas easy to compress; faster particles in a heated, rigid can hit the walls more often and harder; slower particles in the cold need less room; and random motion spreads a smell by diffusion. The particles never change size.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 3', title: 'Explaining How Gases Behave', subtitle: 'Everyday gases, one theory' }],
      lines: [
        { say: 'Leave a sealed can of gas in hot sunshine, and the pressure inside it rises. Take a balloon out into the cold, and it shrinks.', show: 'title' },
        { say: 'In this part, you will use the kinetic molecular theory to explain these and other everyday observations about gases.' },
      ],
    },
    {
      chapter: 'Why a gas exerts pressure',
      layout: 'split',
      leftWidth: 560,
      left: [walls],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: ['The particles move constantly and randomly, so they keep **running into the walls**.', 'Each collision gives the wall a **tiny push**.', 'An enormous number of collisions add up to a **steady push** over the whole wall.'],
        },
      ],
      lines: [
        { say: 'Start with pressure, the push a gas exerts on the walls of its container. Why does a gas push at all?', show: 'w' },
        { say: 'The particles move constantly and randomly, so they keep running into the walls.', show: ['s.0', 'w.hits'] },
        { say: 'Each collision gives the wall a tiny push.', show: 's.1' },
        { say: 'An enormous number of collisions every second add up to a steady push over the whole wall. The number under the box counts the hits each second.', show: ['s.2', 'w.rate'] },
      ],
    },
    {
      chapter: 'Compressing a gas',
      layout: 'split',
      leftWidth: 620,
      left: [squeeze],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: ['**Easily compressed:** squeezing only shrinks the empty space.', '**Low density:** a litre of gas holds far fewer particles than a litre of liquid.', '**Fills its container:** nothing holds the particles together.'],
        },
      ],
      lines: [
        { say: 'A gas can be compressed much more easily than a liquid or a solid, because its particles are far apart, with mostly empty space between them.', show: 'sq' },
        { say: 'Squeezing a gas only shrinks the empty space. In a liquid or a solid, the particles are already touching, so there is almost no space to remove.', show: 's.0', play: 'sq.push' },
        { say: 'The same empty space explains the low density of a gas: a litre of gas holds far fewer particles than a litre of liquid.', show: 's.1' },
        { say: 'And a gas fills its container because nothing holds its particles together. They move in straight lines until they hit something, so they spread out until they meet the walls.', show: 's.2' },
      ],
    },
    {
      chapter: 'Hotter and colder',
      layout: 'split',
      leftWidth: 640,
      left: [can],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: ['**Heated, rigid can:** faster particles hit the walls **more often and harder**. The pressure rises.', '**Balloon in the cold:** slower particles hit the rubber **less often and less hard**, so at the same pressure they need **less room**.'],
        },
      ],
      lines: [
        { say: 'A sealed, rigid can of gas is heated. A higher temperature means a greater average kinetic energy, so the particles move faster.', show: ['cn', 'cn.labels', 'cn.thermo'], play: 'cn.heat', focus: 'cn.c' },
        { say: 'The can is rigid, so the particles have the same space to move in. Moving faster, they reach the walls more often, and each collision is harder. So the pressure rises.', show: ['s.0', 'cn.hits', 'cn.rate'], focus: 'cn.c' },
        { say: 'Now take a balloon from a warm room into the cold outdoors. The particles inside slow down, so they hit the rubber less often and less hard.', show: 's.1', play: 'cn.cold', focus: 'cn.b' },
        { say: 'The air outside and the stretched rubber now push in harder than the gas pushes out, so the balloon is squeezed smaller, until the pushes balance. At the same pressure, slower particles need less room.' },
      ],
    },
    {
      chapter: 'Diffusion',
      layout: 'split',
      leftWidth: 500,
      left: [spread],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Diffusion', md: 'The spreading of one substance through another by the **random motion** of its particles, until the two are evenly mixed.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Particles do not change size', md: 'Heated or cooled, they stay the same size. What changes is **how fast** they move.' },
      ],
      lines: [
        { say: 'Why does the smell of perfume spread across a room, even when the air seems still? The particles move constantly and randomly, so they spread out on their own. No draught is needed. Here, perfume particles in orange are kept apart from the air, in blue. Let’s lift the wall.', show: ['df', 'df.labels'], play: 'df.lift' },
        { say: 'This is diffusion. It is much slower than the speeds of the particles suggest, because each perfume molecule keeps colliding with air molecules and changing direction.', show: 'def' },
        { say: 'One last warning. Gas particles never grow when they are heated, or shrink when they are cooled. A balloon shrinks in the cold because its particles slow down, not because they get smaller.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use the kinetic molecular theory. Why can a gas be compressed much more easily than a liquid or a solid?',
          choices: [
            'Its particles are far apart, with mostly empty space between them.',
            'Its particles are softer and can be squashed.',
            'Its particles shrink when they are pushed together.',
            'Its particles attract each other, so they pull closer together.',
          ],
          answer: 0,
          working: 'Squeezing a gas only shrinks the empty space between its particles. The particles themselves never change size.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the kinetic molecular theory. Why can a gas be compressed much more easily than a liquid or a solid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Its particles are far apart, with mostly empty space between them, and squeezing shrinks only that space. Choices B and C are wrong, because gas particles never change size.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['What we observe', 'The explanation from the theory'],
          rows: [
            ['A gas exerts pressure', 'Its particles keep colliding with the walls.'],
            ['A gas is easily compressed', 'Its particles are far apart, with mostly empty space.'],
            ['A heated rigid container: pressure rises', 'Faster particles hit the walls more often and harder.'],
            ['A balloon shrinks in the cold', 'Slower particles need less room at the same pressure.'],
            ['A smell spreads through still air', 'Random motion spreads the particles out.'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A gas exerts pressure because its particles keep colliding with the walls. It is easily compressed because it is mostly empty space.', show: ['t.0', 't.1'] },
        { say: 'Heated in a rigid container, its faster particles hit the walls more often and harder. Cooled in a balloon, its slower particles need less room.', show: ['t.2', 't.3'] },
        { say: 'And random motion spreads a smell by diffusion. In part four, you will compare light and heavy particles, and real gases with ideal ones. See you there!', show: 't.4' },
      ],
    },
  ],
};

export default video;
