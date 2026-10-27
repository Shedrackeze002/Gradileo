import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gasBox, tag } from './lib/c20-2a-figures.ts';

// Particles hitting the walls of their container.
const walls = figure('w', [gasBox({ w: 6, h: 6, count: 9, speed: 1.1, seed: 12, hits: 6 })], 460);

// A gas under a piston, then pushed in: the same particles, with less empty space.
const squeeze = figure(
  'sq',
  [
    gasBox({ name: 'a', at: [0, 0], w: 4, h: 6, count: 8, speed: 0, seed: 5, top: 'piston', walls: 7 }),
    tag('a-l', [2, -0.3], '\\text{before}', { place: 'below', group: 'a-p' }),
    gasBox({ name: 'b', at: [6.5, 0], w: 4, h: 2.6, count: 8, speed: 0, seed: 6, top: 'piston', walls: 7, push: '\\text{push}' }),
    tag('b-l', [8.5, -0.3], '\\text{pushed in}', { place: 'below', group: 'b-p' }),
  ],
  460,
);

// The same rigid can of gas, cool and then hot: the same space, faster particles.
const can = figure(
  'cn',
  [
    gasBox({ name: 'cool', at: [0, 0], w: 5, h: 5, count: 7, speed: 0.5, seed: 21 }),
    tag('cool-l', [2.5, -0.3], '\\text{cool}', { place: 'below', tone: 'adj', group: 'cool-p' }),
    gasBox({ name: 'hot', at: [6.5, 0], w: 5, h: 5, count: 7, speed: 1.3, seed: 21, hits: 4 }),
    tag('hot-l', [9, -0.3], '\\text{heated}', { place: 'below', tone: 'opp', group: 'hot-p' }),
  ],
  380,
);

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
        { say: 'Start with pressure, the push a gas exerts on the walls of its container. Why does a gas push at all?', show: ['w.box', 'w.p', 'w.v'] },
        { say: 'The particles move constantly and randomly, so they keep running into the walls.', show: ['s.0', 'w.hits'], focus: 'w.hits' },
        { say: 'Each collision gives the wall a tiny push.', show: 's.1' },
        { say: 'An enormous number of collisions every second add up to a steady push over the whole wall.', show: 's.2', focus: 'w' },
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
        { say: 'A gas can be compressed much more easily than a liquid or a solid, because its particles are far apart, with mostly empty space between them.', show: ['sq.a-box', 'sq.a-piston', 'sq.a-p', 'sq.a-l'] },
        { say: 'Squeezing a gas only shrinks the empty space. In a liquid or a solid, the particles are already touching, so there is almost no space to remove.', show: ['sq.b-box', 'sq.b-piston', 'sq.b-push', 'sq.b-p', 'sq.b-l', 's.0'] },
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
        { say: 'A sealed, rigid can of gas is heated. A higher temperature means a greater average kinetic energy, so the particles move faster.', show: ['cn.cool-box', 'cn.cool-p', 'cn.cool-v', 'cn.cool-l', 'cn.hot-box', 'cn.hot-p', 'cn.hot-v', 'cn.hot-l'], focus: 'cn.hot-v' },
        { say: 'The can is rigid, so the particles have the same space to move in. Moving faster, they reach the walls more often, and each collision is harder. So the pressure rises.', show: ['s.0', 'cn.hot-hits'], focus: 'cn.hot-hits' },
        { say: 'Now take a balloon from a warm room into the cold outdoors. The particles inside slow down, so they hit the rubber less often and less hard.', show: 's.1', focus: 'cn' },
        { say: 'The air outside and the stretched rubber now push in harder than the gas pushes out, so the balloon is squeezed smaller, until the pushes balance. At the same pressure, slower particles need less room.' },
      ],
    },
    {
      chapter: 'Diffusion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Diffusion', md: '**Diffusion** is the spreading of the particles of one substance through another by their own random motion, until the two are evenly mixed.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Particles do not change size', md: 'Gas particles never grow when heated or shrink when cooled. What changes is **how fast** they move and **how often** they hit things.' },
      ],
      lines: [
        { say: 'Why does the smell of perfume spread across a room, even when the air seems still? The particles move constantly and randomly, so they spread out on their own. No draught is needed.', show: 'def' },
        { say: 'This is diffusion. It is much slower than the speeds of the particles suggest, because each perfume molecule keeps colliding with air molecules and changing direction.' },
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
