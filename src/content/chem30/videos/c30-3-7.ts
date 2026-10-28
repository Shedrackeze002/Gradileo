import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { column, room } from './lib/c30-3b-figures.ts';

// A fractionating column: crude oil vapour enters at the bottom, the column is hot at the bottom
// and cool at the top, and each fraction is drawn off at its own height.
const tower = figure(
  'c',
  [
    column({
      h: 8,
      w: 2.2,
      feed: '\\begin{gathered}\\text{crude oil}\\\\ \\text{vapour,}\\\\ \\text{about } 400^\\circ\\text{C}\\end{gathered}',
      fractions: [
        { id: 'f0', tex: '\\text{refinery gases}', at: 1 },
        { id: 'f1', tex: '\\text{petrol}', at: 0.82 },
        { id: 'f2', tex: '\\text{kerosene}', at: 0.64 },
        { id: 'f3', tex: '\\text{diesel oil}', at: 0.46 },
        { id: 'f4', tex: '\\text{fuel oil}', at: 0.25 },
        { id: 'f5', tex: '\\text{bitumen}', at: 0 },
      ],
    }),
    room('room', [-3.9, -1.9], [7.6, 9.8]),
  ],
  560,
);

const video: Explainer = {
  id: 'c30-3-7',
  lessonId: 'c30-3-7',
  title: 'Fossil Fuels and Combustion, Part 1: Fractional Distillation',
  thumbnailTitle: 'Fractional Distillation',
  thumbnail: 'c',
  summary:
    'Coal, crude oil and natural gas are fossil fuels: they formed over millions of years from the remains of ancient organisms, and they are non-renewable. Crude oil is a mixture of hundreds of hydrocarbons, separated by fractional distillation: in a column that is hot at the bottom and cool at the top, large molecules condense low down and small ones rise to the top.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Changes of Organic Compounds · Part 1', title: 'Fractional Distillation', subtitle: 'Sorting crude oil by boiling point' }],
      lines: [
        { say: 'Most of the energy used worldwide, to run vehicles, heat homes and make electricity, still comes from burning coal, oil and natural gas.', show: 'title' },
        { say: 'In this part, you will see what these fuels are, and how crude oil is separated. Later parts cover cracking, combustion, and its effects.' },
      ],
    },
    {
      chapter: 'Fossil fuels',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fossil fuel', md: 'A fuel formed over millions of years from the remains of ancient organisms, buried and changed by heat and pressure: **coal**, **crude oil** (petroleum) and **natural gas**. Fossil fuels are **non-renewable**: they form far more slowly than they are used.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Natural gas is mostly methane, $\\ce{CH4}$.', 'Crude oil is a thick mixture of hundreds of hydrocarbons, from 1 to 4 carbon atoms up to more than 40.'],
        },
      ],
      lines: [
        { say: 'A fossil fuel formed over millions of years from the remains of ancient organisms, buried and changed by heat and pressure. Coal, crude oil and natural gas are fossil fuels.', show: 'def' },
        { say: 'They are non-renewable, because they form far more slowly than they are used.' },
        { say: 'Natural gas is mostly methane. Crude oil is a thick mixture of hundreds of hydrocarbons, from small molecules with one to four carbon atoms to large ones with more than forty.', show: ['b.0', 'b.1'] },
        { say: 'As it comes out of the ground, crude oil must first be separated.' },
      ],
    },
    {
      chapter: 'The fractionating column',
      layout: 'split',
      leftWidth: 660,
      left: [tower],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fractional distillation', md: 'Separates a mixture of liquids into **fractions**, each with a range of boiling points.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Large** molecules condense near the **bottom**.', '**Small** molecules rise to the **top**.'],
        },
      ],
      lines: [
        { say: 'Fractional distillation separates a mixture of liquids into parts, called fractions, with different ranges of boiling points.', show: 'def' },
        { say: 'In a refinery, crude oil is heated to about four hundred degrees Celsius, so that most of it vaporises. The vapour enters the bottom of a tall fractionating column.', show: ['c.col', 'c.feed'] },
        { say: 'The column is hottest at the bottom, and coolest at the top.', show: 'c.temp', focus: 'c.temp' },
        { say: 'As the vapour rises, it cools. Each hydrocarbon condenses at the level where the temperature falls below its boiling point, and trays at different heights collect the liquids.', show: ['c.f1', 'c.f2', 'c.f3', 'c.f4'], focus: ['c.f1', 'c.f2', 'c.f3', 'c.f4'] },
        { say: 'Large molecules, with strong London dispersion forces between them and high boiling points, condense near the bottom. The largest do not vaporise at all, and leave the bottom as bitumen.', show: ['c.f5', 'b.0'], focus: ['c.f4', 'c.f5', 'b.0'] },
        { say: 'Small molecules stay as gases, and rise to the top.', show: ['c.f0', 'b.1'], focus: ['c.f0', 'b.1'] },
      ],
    },
    {
      chapter: 'The fractions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Fraction', 'Carbons', 'Boiling range', 'Uses'],
          rows: [
            ['refinery gases', '1 to 4', 'below $25^\\circ\\text{C}$', 'fuel gas, bottled gas'],
            ['petrol', '5 to 10', '$25$ to $180^\\circ\\text{C}$', 'fuel for cars'],
            ['kerosene', '10 to 16', '$180$ to $260^\\circ\\text{C}$', 'fuel for aircraft'],
            ['diesel oil', '14 to 20', '$260$ to $340^\\circ\\text{C}$', 'diesel engines'],
            ['fuel oil, lubricating oil', '20 to 40', '$340$ to $500^\\circ\\text{C}$', 'ships, lubricants'],
            ['residue (bitumen)', 'more than 40', 'above $500^\\circ\\text{C}$', 'roads, roofing'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the fractions, from the top down. Refinery gases, with one to four carbons, boil below twenty-five degrees Celsius, and are used as fuel gas.', show: 't.0', focus: 't.0' },
        { say: 'Petrol, kerosene and diesel oil are fuels for cars, aircraft and diesel engines. Each has bigger molecules and a higher boiling range than the one above it.', show: ['t.1', 't.2', 't.3'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'Fuel oil, with twenty to forty carbons, fuels ships, and the residue, bitumen, surfaces roads and roofs.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'Where does it collect?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Octane, $\\ce{C8H18}$, boils at about $126^\\circ\\text{C}$, and hexadecane, $\\ce{C16H34}$, at about $287^\\circ\\text{C}$. Which collects higher in the column?' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Octane has smaller molecules and weaker dispersion forces, so it boils at a lower temperature.',
            'It stays a gas until it reaches the cooler upper part of the column.',
            'Octane collects higher, in the **petrol** fraction; hexadecane condenses lower, in the **diesel** fraction.',
          ],
        },
      ],
      lines: [
        { say: 'Octane boils at about one hundred twenty-six degrees Celsius, and hexadecane at about two hundred eighty-seven. Which collects higher in the column?', show: 'q' },
        { say: 'Octane has smaller molecules, with weaker dispersion forces between them, so it boils at a lower temperature.', show: 'b.0' },
        { say: 'It stays a gas until it reaches the cooler upper part of the column.', show: 'b.1' },
        { say: 'So octane collects higher, in the petrol fraction. Hexadecane condenses lower down, in the diesel fraction.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a fractionating column, where are the fractions with the lowest boiling points collected?',
          choices: ['At the top, where the column is coolest', 'At the bottom, where the column is hottest', 'At the top, where the column is hottest', 'At the bottom, where the column is coolest'],
          answer: 0,
          working: 'The column is hottest at the bottom and coolest at the top. Small molecules with low boiling points stay as gases until they reach the cool top, where they condense.',
        },
      ],
      lines: [
        { say: 'Your turn. In a fractionating column, where are the fractions with the lowest boiling points collected? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: at the top, where the column is coolest. Choices C and D have the temperatures upside down.', show: 'q.answer' },
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
            '**Fossil fuels** (coal, crude oil, natural gas) formed over millions of years and are non-renewable.',
            'Crude oil is a mixture of hundreds of hydrocarbons.',
            '**Fractional distillation** separates it by boiling point in a column, hot at the bottom and cool at the top.',
            'Small molecules rise to the top; large ones condense near the bottom.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Fossil fuels formed over millions of years, and they are non-renewable.', show: 'sum.0' },
        { say: 'Crude oil is a mixture of hundreds of hydrocarbons.', show: 'sum.1' },
        { say: 'Fractional distillation separates it by boiling point, in a column that is hot at the bottom and cool at the top.', show: 'sum.2' },
        { say: 'Small molecules rise to the top, and large ones condense near the bottom. In part two, you will see how cracking breaks large molecules into smaller ones. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
