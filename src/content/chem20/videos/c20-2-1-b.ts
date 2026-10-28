import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { collision, gasBox, join, zigzag } from './lib/c20-2a-figures.ts';

// A fast particle hits a slow one of the same mass, and they swap speeds.
const bump = figure('c', [collision()], 380);

// One particle's path through a gas: short straight lines, a new direction at every collision.
const path = figure(
  'z',
  [
    join([
      gasBox({ w: 7, h: 6, count: 0, speed: 0 }),
      zigzag('zz', [
        [0.8, 0.9],
        [2.6, 2.1],
        [1.6, 3.6],
        [3.4, 4.6],
        [4.6, 3.0],
        [5.4, 4.9],
        [6.2, 2.0],
      ]),
    ]),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-2-1-b',
  lessonId: 'c20-2-1',
  title: 'Gases and the Kinetic Molecular Theory, Part 2: Inside the Theory',
  thumbnailTitle: 'Inside the Theory',
  thumbnail: 'c',
  summary:
    'Kinetic energy is the energy of motion, ½mv². Collisions in a gas are elastic: no kinetic energy is lost overall, so the particles keep moving. An ideal gas follows the theory exactly, and a real gas is mostly empty space, with fast particles that zigzag between collisions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 2', title: 'Inside the Theory', subtitle: 'Energy, collisions and empty space' }],
      lines: [
        { say: 'Drop a rubber ball, and each bounce is a little lower than the last, until it stops. Gas particles hit the walls of their container all the time, yet they never run down.', show: 'title' },
        { say: 'In this part, you will look closely at the ideas behind the kinetic molecular theory: kinetic energy, elastic collisions and the ideal gas. Then you will see just how empty a gas is.' },
      ],
    },
    {
      chapter: 'Kinetic energy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Kinetic energy', md: '**Kinetic energy** is the energy a particle has because it is moving.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['E_\\text{k} = \\tfrac{1}{2}mv^2'] },
        { kind: 'text', id: 'note', size: 'md', align: 'center', md: '$m$ is the mass of the particle, and $v$ is its speed.' },
      ],
      lines: [
        { say: 'Kinetic energy is the energy a particle has because it is moving.', show: 'def' },
        { say: 'A particle of mass m, moving at speed v, has kinetic energy E k equals one half m v squared.', caption: 'A particle of mass m, moving at speed v, has kinetic energy Eₖ = ½mv².', show: ['m', 'note'] },
        { say: 'So a particle has more kinetic energy the faster it moves, and the heavier it is.' },
      ],
    },
    {
      chapter: 'Elastic collisions',
      layout: 'split',
      leftWidth: 620,
      left: [bump],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Elastic collision', md: 'In an **elastic collision**, no kinetic energy is lost overall. One particle may speed up and the other slow down, but their **total** kinetic energy stays the same.' }],
      lines: [
        { say: 'In an elastic collision, no kinetic energy is lost overall.', show: 'def' },
        { say: 'Here a fast particle hits a slow one. Afterwards, the first has slowed down and the second has sped up. But their total kinetic energy is the same after the collision as before.', show: ['c.before', 'c.after'] },
        { say: 'The theory treats every collision in a gas, between particles or with the walls, as elastic. So, unlike the rubber ball, the particles never run down. They keep moving.' },
      ],
    },
    {
      chapter: 'An ideal gas',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Ideal gas', md: 'An imaginary gas that follows the kinetic molecular theory **exactly**: its particles take up **no space** of their own and **neither attract nor repel** each other.' }],
      lines: [
        { say: 'An ideal gas is an imaginary gas that follows the kinetic molecular theory exactly. Its particles take up no space of their own, and neither attract nor repel each other.', show: 'def' },
        { say: 'No real gas is quite like that, but many real gases come close to it under everyday conditions.' },
      ],
    },
    {
      chapter: 'Mostly empty space',
      layout: 'split',
      leftWidth: 560,
      left: [path],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$18\\ \\text{g}$ of water', 'Space it fills'],
          rows: [
            ['liquid', 'about $18\\ \\text{mL}$'],
            ['steam at $100^\\circ\\text{C}$', 'about $30\\ \\text{L}$'],
          ],
        },
        { kind: 'text', id: 'fast', size: 'md', md: 'In air at room temperature, molecules move at **hundreds of metres per second**, and collide **billions of times a second**.' },
      ],
      lines: [
        { say: 'The second idea says that a gas is mostly empty space. About eighteen grams of liquid water fills about eighteen millilitres.', show: ['t', 't.0'] },
        { say: 'Boiled to steam at one hundred degrees Celsius and normal air pressure, the same molecules fill about thirty litres: well over a thousand times as much space.', show: 't.1' },
        { say: 'The molecules have not grown. The gaps between them have.' },
        { say: 'The particles are fast, too. At room temperature, the molecules in air move at hundreds of metres per second.', show: 'fast' },
        { say: 'But each one collides with others billions of times a second, so its path is a zigzag of very short straight lines.', show: ['z.box', 'z.zz', 'z.zz-others'], focus: 'z.zz' },
      ],
    },
    {
      chapter: 'Misreading the theory',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Misreading the theory',
          md: 'Gas particles do **not** stand still until the gas is heated, and do **not** slow down each time they hit the walls. Most of a gas is **empty space**, not particles. And ideal gas particles do **not** attract each other at all.',
        },
      ],
      lines: [
        { say: 'Watch out for these misreadings. Gas particles do not stand still until the gas is heated. And they do not slow down each time they hit the walls: their collisions lose no kinetic energy overall.', show: 'oops' },
        { say: 'Most of the volume of a gas is not taken up by the particles themselves: it is empty space. And the particles of an ideal gas do not attract each other at all.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which statement is part of the kinetic molecular theory of an ideal gas?',
          choices: [
            'Gas particles slow down a little every time they hit the walls, until they stop.',
            'Most of the volume of a gas is taken up by the particles themselves.',
            'Gas particles attract each other strongly, which keeps them close together.',
            'Gas particles are very small compared with the distances between them.',
          ],
          answer: 3,
          working: 'A gas is mostly empty space: its particles are tiny compared with the gaps between them. Collisions lose no kinetic energy overall, and ideal gas particles do not attract each other.',
        },
      ],
      lines: [
        { say: 'Your turn. Which statement is part of the kinetic molecular theory of an ideal gas? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Gas particles are very small compared with the distances between them. Choice A is wrong, because collisions lose no kinetic energy overall, so the particles never slow to a stop.', show: 'q.answer' },
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
            '**Kinetic energy** is the energy of motion: $E_\\text{k} = \\tfrac{1}{2}mv^2$.',
            'In an **elastic collision**, the total kinetic energy stays the same.',
            'An **ideal gas** follows the theory exactly: no particle volume, no attractions.',
            'A gas is **mostly empty space**; its fast particles zigzag between collisions.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Kinetic energy is the energy of motion, one half m v squared.', caption: 'Let’s sum up. Kinetic energy is the energy of motion, ½mv².', show: 'sum.0' },
        { say: 'In an elastic collision, the total kinetic energy stays the same, so gas particles keep moving.', show: 'sum.1' },
        { say: 'An ideal gas follows the theory exactly: its particles take up no space and do not attract each other.', show: 'sum.2' },
        { say: 'And a gas is mostly empty space, with fast particles that zigzag between collisions. In part three, you will use the theory to explain how gases behave. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
