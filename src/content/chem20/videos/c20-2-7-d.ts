import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { container, frame, tag } from './lib/c20-2b-figures.ts';

// Where the particles sit in a gas at low pressure, at high pressure, and at low temperature.
const CLUMPS: [number, number][] = [
  [0.9, 0.7], [1.45, 0.75], [1.15, 1.25],
  [3.0, 1.0], [3.5, 1.35],
  [2.2, 2.9], [2.75, 3.05], [2.4, 3.5],
  [0.8, 3.4], [1.2, 3.85],
  [3.6, 3.7],
];
const conditions = figure(
  'c',
  [
    container({ name: 'low', at: [0, 0], w: 4.4, h: 4.4, count: 5, seed: 21 }),
    tag('low-label', [2.2, -0.3], '\\text{low pressure}', { place: 'below', group: 'low-box' }),
    container({ name: 'high', at: [6.4, 0], w: 4.4, h: 4.4, count: 24, seed: 22 }),
    tag('high-label', [8.6, -0.3], '\\text{high pressure}', { place: 'below', group: 'high-box' }),
    container({ name: 'cold', at: [12.8, 0], w: 4.4, h: 4.4, count: CLUMPS.length, spots: CLUMPS, seed: 23 }),
    tag('cold-label', [15.0, -0.3], '\\text{low temperature}', { place: 'below', group: 'cold-box' }),
    frame('room', [0, -1.1], [17.2, -1.1]),
  ],
  380,
);

const video: Explainer = {
  id: 'c20-2-7-d',
  lessonId: 'c20-2-7',
  title: 'The Ideal Gas Law, Part 4: Real Gases',
  thumbnailTitle: 'Real Gases',
  thumbnail: 'c',
  summary:
    'An ideal gas obeys PV = nRT exactly, because its particles take up no space and do not attract each other; a real gas follows the law only approximately. Real gases behave most like an ideal gas at high temperature and low pressure; at high pressure and low temperature, their particles’ own volume and attractions matter, and they can condense. Gases with weak intermolecular forces, such as helium and hydrogen, are very nearly ideal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 4', title: 'Real Gases', subtitle: 'When a gas is not ideal' }],
      lines: [
        { say: 'The kinetic molecular theory pictured gas particles with no volume of their own, and no attractions between them.', show: 'title' },
        { say: 'That picture is the ideal gas. In this part, you will see when real gases come close to it, and when they do not.' },
      ],
    },
    {
      chapter: 'Ideal and real gases',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ideal', tone: 'definition', title: 'Ideal gas', md: 'An **ideal gas** obeys $PV = nRT$ exactly: its particles take up no space and do not attract each other.' },
        { kind: 'callout', id: 'real', tone: 'definition', title: 'Real gas', md: 'A **real gas** is any actual gas. Its particles do take up a little space and do attract each other a little, so it follows the ideal gas law only **approximately**.' },
        { kind: 'text', id: 'k', size: 'md', md: 'At everyday temperatures and pressures, most gases follow $PV = nRT$ to within a few per cent.' },
      ],
      lines: [
        { say: 'An ideal gas obeys P V equals n R T exactly. Its particles take up no space, and do not attract each other.', caption: 'An ideal gas obeys PV = nRT exactly. Its particles take up no space, and do not attract each other.', show: 'ideal' },
        { say: 'A real gas is any actual gas. Its particles take up a little space and attract each other a little, so it follows the law only approximately.', show: 'real' },
        { say: 'Still, at everyday temperatures and pressures, most gases follow the law to within a few percent, which is why it is so useful.', show: 'k' },
      ],
    },
    {
      chapter: 'Pressure and temperature',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Conditions', 'What the particles do', 'Behaviour'],
          rows: [
            ['low pressure', 'far apart, so their own volume is a tiny part of the container', 'close to ideal'],
            ['high temperature', 'move fast, so attractions barely slow them as they pass', 'close to ideal'],
            ['high pressure', 'crowded together, so their own volume takes up a noticeable part of the container', 'less ideal'],
            ['low temperature', 'move slowly, so attractions pull them towards each other', 'less ideal'],
          ],
        },
      ],
      lines: [
        { say: 'The match depends on how far apart the particles are, and how fast they move. At low pressure, they are far apart, so their own volume is a tiny part of the container.', show: 't.0', focus: 't.0' },
        { say: 'At high temperature, they move fast, so attractions barely slow them as they pass. Both keep a gas close to ideal.', show: 't.1', focus: 't.1' },
        { say: 'At high pressure, the particles are crowded together, so their own volume takes up a noticeable part of the container.', show: 't.2', focus: 't.2' },
        { say: 'At low temperature, they move slowly, so attractions pull them towards each other. Both make a gas less ideal.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Most like an ideal gas',
      layout: 'center',
      main: [
        conditions,
        { kind: 'callout', id: 'key', tone: 'key', title: 'Most like an ideal gas', md: 'Real gases behave most like an ideal gas at **high temperature and low pressure**. Cool a real gas enough, or squeeze it hard enough, and the attractions win: it **condenses** to a liquid.' },
      ],
      lines: [
        { say: 'So real gases behave most like an ideal gas at high temperature and low pressure: particles far apart and moving fast.', show: ['c.low-box', 'c.low-p', 'key'], focus: 'c.low-p' },
        { say: 'At high pressure, their own volume matters. At low temperature, attractions pull them together.', show: ['c.high-box', 'c.high-p', 'c.cold-box', 'c.cold-p'], focus: ['c.high-p', 'c.cold-p'] },
        { say: 'Cool a real gas enough, or squeeze it hard enough, and the attractions win: it condenses to a liquid. An ideal gas would never condense.', focus: 'c' },
      ],
    },
    {
      chapter: 'Which is more ideal?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A sample of nitrogen, $\\ce{N2}$, is studied at $50\\ \\text{kPa}$ and $150^\\circ\\text{C}$, and again at $4000\\ \\text{kPa}$ and $-50^\\circ\\text{C}$. Under which conditions does it behave more like an ideal gas?' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['At $50\\ \\text{kPa}$ the particles are far apart, so their own volume hardly matters.', 'At $150^\\circ\\text{C}$ they move fast, so their attractions hardly matter.', 'So at $50\\ \\text{kPa}$ and $150^\\circ\\text{C}$: low pressure and high temperature.'],
        },
      ],
      lines: [
        {
          say: 'A sample of nitrogen is studied at fifty kilopascals and one hundred fifty degrees Celsius, and again at four thousand kilopascals and minus fifty degrees Celsius. Under which conditions is it more like an ideal gas?',
          caption: 'A sample of nitrogen is studied at 50 kPa and 150°C, and again at 4000 kPa and −50°C. Under which conditions is it more like an ideal gas?',
          show: 'q',
        },
        { say: 'At fifty kilopascals the particles are far apart, and at one hundred fifty degrees Celsius they move fast. So the first conditions are more ideal.', caption: 'At 50 kPa the particles are far apart, and at 150°C they move fast. So the first conditions are more ideal.', show: ['b.0', 'b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Intermolecular forces',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gases', 'Attractions', 'Behaviour'],
          rows: [
            ['helium and hydrogen', 'few electrons: weak London dispersion forces', 'very nearly ideal'],
            ['ammonia and sulfur dioxide', 'polar molecules: stronger attractions', 'less ideal'],
            ['chlorine', 'many electrons: stronger dispersion forces', 'less ideal'],
          ],
        },
        { kind: 'text', id: 'k', size: 'md', md: 'Squeezed hard enough at room temperature, ammonia, sulfur dioxide and chlorine condense, so they are stored as liquids in pressurised cylinders.' },
      ],
      lines: [
        { say: 'Intermolecular forces matter too. Helium and hydrogen have few electrons and weak London dispersion forces, so they behave very nearly ideally.', show: 't.0', focus: 't.0' },
        { say: 'Polar ammonia and sulfur dioxide, and chlorine with its many electrons, attract each other more strongly, so they are less ideal.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Squeezed hard enough at room temperature, all three condense, so they are stored as liquids in pressurised cylinders.', show: 'k', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Under which conditions does a sample of oxygen gas, $\\ce{O2}$, behave **most** like an ideal gas?',
          choices: ['$50\\ \\text{kPa}$ and $200^\\circ\\text{C}$', '$50\\ \\text{kPa}$ and $-20^\\circ\\text{C}$', '$2000\\ \\text{kPa}$ and $200^\\circ\\text{C}$', '$2000\\ \\text{kPa}$ and $-20^\\circ\\text{C}$'],
          answer: 0,
          working: 'Low pressure keeps the particles far apart, and high temperature keeps them moving fast, so their volume and attractions hardly matter.',
        },
      ],
      lines: [
        { say: 'Your turn. Under which conditions does a sample of oxygen gas behave most like an ideal gas? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: the lowest pressure and the highest temperature, so the particles’ volume and attractions hardly matter. Choice D is the least ideal.', show: 'q.answer' },
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
            'An **ideal gas** obeys $PV = nRT$ exactly; a **real gas** follows it only approximately.',
            'Real gases are most like an ideal gas at **high temperature and low pressure**.',
            'At high pressure and low temperature, the particles’ volume and attractions matter, and a gas can condense.',
            'Gases with weak intermolecular forces, such as helium and hydrogen, are very nearly ideal.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An ideal gas obeys P V equals n R T exactly; a real gas, only approximately.', caption: 'Let’s sum up. An ideal gas obeys PV = nRT exactly; a real gas, only approximately.', show: 'sum.0' },
        { say: 'Real gases are most like an ideal gas at high temperature and low pressure.', show: 'sum.1' },
        { say: 'At high pressure and low temperature, the particles’ volume and attractions matter, and a gas can condense.', show: 'sum.2' },
        { say: 'And gases with weak intermolecular forces are very nearly ideal. That completes the ideal gas law. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
