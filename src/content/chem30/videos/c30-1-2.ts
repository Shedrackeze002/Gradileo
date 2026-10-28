import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hbars, join, room, tag } from './lib/c30-1a-figures.ts';

// The specific heat capacities used in this unit, in J/(g·°C): water's is by far the largest.
const capacities = figure(
  'c',
  [
    join([
      hbars({
        max: 4.5,
        rows: [
          { label: 'water', value: 4.19 },
          { label: 'ethanol', value: 2.44 },
          { label: 'aluminium', value: 0.897 },
          { label: 'glass', value: 0.84, shown: '0.840' },
          { label: 'iron', value: 0.449 },
          { label: 'copper', value: 0.385 },
          { label: 'lead', value: 0.129 },
        ],
      }),
      tag('unit', [0, 1.0], 'c\\ (\\text{J/(g·°C)})', { place: 'above', tone: 'muted', group: 'axis' }),
      room('space', [-4.4, 0], [7.4, 0]),
    ]),
  ],
  540,
);

const video: Explainer = {
  id: 'c30-1-2',
  lessonId: 'c30-1-2',
  title: 'Calorimetry, Part 1: Heat and Specific Heat Capacity',
  thumbnailTitle: 'Heat and Specific Heat Capacity',
  thumbnail: 'c',
  summary:
    'Heat, Q, is energy that moves from a hotter substance to a colder one because of a difference in temperature, measured in joules or kilojoules. The specific heat capacity, c, is the heat needed to warm one gram of a substance by one degree Celsius: 4.19 J/(g·°C) for water, almost eleven times that of copper. Q = mcΔt gives the heat: warming 250.0 g of water from 20.0 °C to 75.0 °C takes 57.6 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 1', title: 'Heat and Specific Heat Capacity', subtitle: 'Why water warms so slowly' }],
      lines: [
        { say: 'At the beach on a sunny afternoon, the dry sand can be too hot to walk on while the sea stays cool, after the same sunshine all day.', show: 'title' },
        { say: 'Water needs far more energy than sand to warm by each degree, and that makes it ideal for measuring energy.' },
        { say: 'This lesson builds one equation for heat. Later parts use it, turn it around, and take it into a calorimeter.' },
      ],
    },
    {
      chapter: 'Heat',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Heat', md: '**Heat**, $Q$, is energy that moves from one substance to another because of a difference in temperature. It flows from hotter to colder, and is measured in joules ($\\text{J}$) or kilojoules: $1\\ \\text{kJ} = 1000\\ \\text{J}$.' },
        { kind: 'text', id: 'tub', size: 'md', align: 'center', md: 'A bathtub of warm water holds far more energy than a cup of boiling water, even though the cup is hotter.' },
        { kind: 'text', id: 'three', size: 'md', align: 'center', md: 'The heat gained or lost depends on **how much** there is, **what it is made of**, and **how far its temperature changes**.' },
      ],
      lines: [
        { say: 'Heat, Q, is energy that moves from one substance to another because of a difference in temperature.', show: 'def' },
        { say: 'It flows from hotter to colder, and is measured in joules or kilojoules.' },
        { say: 'Heat is not temperature. A bathtub of warm water holds far more energy than a cup of boiling water, though the cup is hotter.', show: 'tub' },
        { say: 'The heat a substance gains or loses depends on how much of it there is, what it is made of, and how far its temperature changes.', show: 'three' },
      ],
    },
    {
      chapter: 'Specific heat capacity',
      layout: 'split',
      leftWidth: 600,
      left: [capacities],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Specific heat capacity', md: 'The heat needed to raise the temperature of **one gram** of a substance by **one degree Celsius**: $c$, in $\\text{J/(g·°C)}$.' },
        { kind: 'text', id: 'eleven', size: 'md', md: 'A gram of water takes almost **eleven times** as much heat as a gram of copper to warm by $1^\\circ\\text{C}$.' },
      ],
      lines: [
        { say: 'What it is made of is described by its specific heat capacity, c: the heat needed to warm one gram of it by one degree Celsius.', show: 'def' },
        { say: 'Its unit is joules per gram degree Celsius. Water’s value, four point one nine, is one of the largest of any common substance.', show: ['c.axis', 'c.r0'], focus: 'c.r0' },
        { say: 'Ethanol, aluminium, glass, iron, copper and lead all need far less.', show: ['c.r1', 'c.r2', 'c.r3', 'c.r4', 'c.r5', 'c.r6'], focus: 'c' },
        { say: 'A gram of water takes almost eleven times as much heat as a gram of copper. That is why the sea stays cool while the sand gets hot.', show: 'eleven', focus: ['c.r0', 'c.r5'] },
      ],
    },
    {
      chapter: 'One equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['Q = mc\\Delta t'] },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$m$: the mass, in grams.',
            '$c$: the specific heat capacity, in $\\text{J/(g·°C)}$.',
            '$\\Delta t = t_\\text{final} - t_\\text{initial}$, in degrees Celsius. Then $Q$ is in joules.',
            'A rise means heat was **gained**; a fall means heat was **lost**.',
          ],
        },
      ],
      lines: [
        { say: 'Put the three things together, and you get one equation: Q equals m c delta t.', caption: 'Put the three things together, and you get one equation: Q = mcΔt.', show: 'm' },
        {
          say: 'Here m is the mass in grams, c is the specific heat capacity, and delta t is the final temperature minus the initial one. Then Q comes out in joules.',
          caption: 'Here m is the mass in grams, c is the specific heat capacity, and Δt is the final temperature minus the initial one. Then Q comes out in joules.',
          show: ['b.0', 'b.1', 'b.2'],
        },
        { say: 'A rise in temperature means heat was gained; a fall means heat was lost.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Warming water',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'How much heat is needed to warm $250.0\\ \\text{g}$ of water from $20.0^\\circ\\text{C}$ to $75.0^\\circ\\text{C}$? Give the answer in kilojoules, to the nearest tenth. Use $c = 4.19\\ \\text{J/(g·°C)}$ for water.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\Delta t = 75.0 - 20.0 = 55.0^\\circ\\text{C}', 'Q = mc\\Delta t = 250.0 \\times 4.19 \\times 55.0 = 57\\,612.5\\ \\text{J}', '57\\,612.5\\ \\text{J} \\div 1000 \\approx 57.6\\ \\text{kJ, gained}'],
        },
      ],
      lines: [
        {
          say: 'Let’s use it. How much heat warms two hundred fifty point zero grams of water from twenty point zero to seventy-five point zero degrees Celsius?',
          show: 'q',
        },
        { say: 'The change in temperature is fifty-five point zero degrees.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Then Q equals two hundred fifty point zero, times four point one nine, times fifty-five point zero: fifty-seven thousand, six hundred twelve point five joules.',
          caption: 'Then Q = 250.0 × 4.19 × 55.0 = 57 612.5 J.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'In kilojoules, that is fifty-seven point six, to the nearest tenth, gained by the water.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How much heat does $150.0\\ \\text{g}$ of water absorb as it warms by $30.0^\\circ\\text{C}$? The specific heat capacity of water is $4.19\\ \\text{J/(g·°C)}$.',
          choices: ['$4.50\\ \\text{kJ}$', '$1.89\\ \\text{kJ}$', '$18.9\\ \\text{kJ}$', '$18\\,855\\ \\text{kJ}$'],
          answer: 2,
          working: '$Q = mc\\Delta t = 150.0 \\times 4.19 \\times 30.0 = 18\\,855\\ \\text{J}$, which is $18.9\\ \\text{kJ}$.',
        },
      ],
      lines: [
        { say: 'Your turn. How much heat does one hundred fifty point zero grams of water absorb as it warms by thirty point zero degrees Celsius? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C. One hundred fifty, times four point one nine, times thirty, is eighteen thousand, eight hundred fifty-five joules: eighteen point nine kilojoules. Choice D forgets to change joules to kilojoules.',
          show: 'q.answer',
        },
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
            '**Heat**, $Q$, is energy that moves because of a difference in temperature, in J or kJ.',
            '**Specific heat capacity**, $c$: the heat to warm $1\\ \\text{g}$ by $1^\\circ\\text{C}$. Water: $4.19\\ \\text{J/(g·°C)}$.',
            '$Q = mc\\Delta t$, with $m$ in grams and $\\Delta t = t_\\text{final} - t_\\text{initial}$.',
            'A rise in temperature means heat was gained; a fall means heat was lost.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Heat, Q, is energy that moves because of a difference in temperature.', show: 'sum.0' },
        { say: 'The specific heat capacity is the heat to warm one gram by one degree; for water, four point one nine.', show: 'sum.1' },
        { say: 'Q equals m c delta t, with the mass in grams.', caption: 'Q = mcΔt, with the mass in grams.', show: 'sum.2' },
        { say: 'And a rise means heat was gained. In part two, you will find heat lost, and heat shared with a container. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
