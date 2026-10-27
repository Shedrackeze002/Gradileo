import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { forceOnArea, gasBox } from './lib/c20-2a-figures.ts';

// A box on the floor: its weight pushes down over the area it rests on.
const crate = figure('f', [forceOnArea({ force: 'F = 120\\ \\text{N}', area: 'A = 0.040\\ \\text{m}^2' })], 420);

// Gas particles hitting the walls of their container from every direction.
const walls = figure('w', [gasBox({ w: 6, h: 6, count: 9, speed: 1.1, seed: 12, hits: 8 })], 460);

const video: Explainer = {
  id: 'c20-2-2',
  lessonId: 'c20-2-2',
  title: 'Pressure and Temperature, Part 1: What Is Pressure?',
  thumbnailTitle: 'What Is Pressure?',
  thumbnail: 'w',
  summary:
    'Pressure is force per unit area, P = F/A, measured in pascals; 1 kPa = 1000 Pa. A box pushing with 120 N on 0.040 m² exerts 3000 Pa, or 3.0 kPa. In a gas, the force comes from particles hitting the walls, so the pressure rises when they hit more often or harder.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 1', title: 'What Is Pressure?', subtitle: 'Force spread over an area' }],
      lines: [
        { say: 'Squeeze a sealed plastic bottle, and you can feel the air inside pushing back. That push is pressure, and it comes from the particles of the gas striking the walls.', show: 'title' },
        { say: 'In this lesson, you will explain gas pressure, measure it, and convert it between units. Then you will meet absolute zero and the Kelvin scale. This first part explains what pressure is.' },
      ],
    },
    {
      chapter: 'Force and area',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pressure', md: '**Pressure** is the force acting on each unit of area. With the force in newtons and the area in square metres, the pressure is in **pascals**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P = \\dfrac{F}{A}', '1\\ \\text{Pa} = 1\\ \\text{N/m}^2 \\qquad 1\\ \\text{kPa} = 1000\\ \\text{Pa}'] },
      ],
      lines: [
        { say: 'Stand in deep snow in ordinary boots, and you sink. Strap on snowshoes, and you stay on top.' },
        { say: 'Your weight is the same either way. But the snowshoes spread it over a much larger area, so the push on each square centimetre of snow is much smaller.' },
        { say: 'Pressure is the force acting on each unit of area: P equals F over A.', caption: 'Pressure is the force acting on each unit of area: P = F/A.', show: ['def', 'm.0'] },
        { say: 'With the force in newtons and the area in square metres, the pressure is in pascals. One pascal is one newton per square metre.', show: 'm.1' },
        { say: 'A pascal is a very small pressure, so gas pressures are usually given in kilopascals. One kilopascal is a thousand pascals.' },
      ],
    },
    {
      chapter: 'A box on the floor',
      layout: 'split',
      leftWidth: 560,
      left: [crate],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A box pushes down on the floor with a force of $120\\ \\text{N}$, spread over an area of $0.040\\ \\text{m}^2$. What pressure does it exert, in kilopascals?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['P = \\dfrac{F}{A} = \\dfrac{120\\ \\text{N}}{0.040\\ \\text{m}^2}', '\\phantom{P} = 3000\\ \\text{Pa}', '\\phantom{P} = 3.0\\ \\text{kPa}'] },
      ],
      lines: [
        { say: 'A box pushes down on the floor with a force of one hundred twenty newtons, spread over an area of zero point zero four zero square metres. What pressure does it exert, in kilopascals?', show: ['q', 'f.floor', 'f.box', 'f.force', 'f.area'] },
        { say: 'Pressure is force over area: one hundred twenty newtons, divided by zero point zero four zero square metres.', show: 'm.0', focus: ['m.0', 'f.force', 'f.area'] },
        { say: 'That is three thousand pascals.', show: 'm.1', focus: 'm.1' },
        { say: 'A kilopascal is a thousand pascals, so divide by a thousand: the pressure is three point zero kilopascals.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Pressure in a gas',
      layout: 'split',
      leftWidth: 560,
      left: [walls],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            'The force comes from **collisions** with the walls.',
            'A gas pushes on the top and sides as hard as on the bottom.',
            'Pressure rises when particles hit **more often** (more particles, less room) or **harder** (a higher temperature).',
          ],
        },
      ],
      lines: [
        { say: 'In a gas, the force comes from collisions. Every second, an enormous number of particles hit each square centimetre of the wall, and each one gives it a tiny push.', show: ['w.box', 'w.p', 'w.v', 'w.hits', 's.0'], focus: 'w.hits' },
        { say: 'Together, the pushes make a steady force. That force, divided by the area of the wall, is the gas pressure.' },
        { say: 'The particles move in every direction, so a gas pushes on the top and sides of its container as hard as on the bottom.', show: 's.1', focus: 'w' },
        { say: 'The pressure rises when the particles hit the walls more often, because there are more particles or less room. It also rises when they hit harder, because they move faster at a higher temperature.', show: 's.2' },
        { say: 'The gas laws in the coming lessons put numbers to these ideas.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A crate pushes down on the floor with a force of $600\\ \\text{N}$, spread over an area of $0.25\\ \\text{m}^2$. What pressure does it exert, in kilopascals?',
          choices: ['$0.24\\ \\text{kPa}$', '$150\\ \\text{kPa}$', '$2.4\\ \\text{kPa}$', '$2400\\ \\text{kPa}$'],
          answer: 2,
          working: '$P = \\dfrac{F}{A} = \\dfrac{600\\ \\text{N}}{0.25\\ \\text{m}^2} = 2400\\ \\text{Pa} = 2.4\\ \\text{kPa}$',
        },
      ],
      lines: [
        { say: 'Your turn. A crate pushes down on the floor with a force of six hundred newtons, spread over an area of zero point two five square metres. What pressure does it exert, in kilopascals? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Six hundred divided by zero point two five is two thousand four hundred pascals, which is two point four kilopascals. Choice D forgets to change pascals to kilopascals.', show: 'q.answer' },
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
            'Pressure is force per unit area: $P = \\dfrac{F}{A}$, in pascals.',
            '$1\\ \\text{kPa} = 1000\\ \\text{Pa}$.',
            'Gas pressure comes from particles **colliding with the walls**.',
            'More frequent or harder collisions mean a **higher pressure**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Pressure is force per unit area, P equals F over A, measured in pascals.', caption: 'Let’s sum up. Pressure is force per unit area, P = F/A, measured in pascals.', show: 'sum.0' },
        { say: 'One kilopascal is a thousand pascals.', show: 'sum.1' },
        { say: 'Gas pressure comes from particles colliding with the walls of the container.', show: 'sum.2' },
        { say: 'More frequent or harder collisions mean a higher pressure. In part two, you will meet the pressure of the air around us, and how a barometer measures it. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
