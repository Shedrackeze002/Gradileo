import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heatingCurve } from './lib/c10-1-figures.ts';

const video: Explainer = {
  id: 'c10-1-1-d',
  lessonId: 'c10-1-1',
  title: 'States of Matter and the Particle Model, Part 4: Melting and Boiling Points',
  thumbnailTitle: 'Melting and Boiling Points',
  thumbnail: 'hc',
  summary:
    'A heating curve shows the temperature of a pure substance staying the same while it melts and while it boils. Every pure substance has a fixed melting point and boiling point: below the melting point it is a solid, between the two a liquid, and above the boiling point a gas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 4', title: 'Melting and Boiling Points', subtitle: 'Reading a heating curve' }],
      lines: [
        { say: 'Heat a pure solid steadily, and something surprising happens. While it melts, its temperature stops rising, even though it is still being heated.', show: 'title' },
        { say: 'In this part, you will read a heating curve, and use melting and boiling points to find the state of a substance at any temperature.' },
      ],
    },
    {
      chapter: 'A heating curve',
      layout: 'split',
      leftWidth: 620,
      left: [figure('hc', [heatingCurve()])],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'What happens'],
          rows: [
            ['A', 'the solid warms'],
            ['B', 'melting at $50^\\circ\\text{C}$'],
            ['C', 'the liquid warms'],
            ['D', 'boiling at $120^\\circ\\text{C}$'],
            ['E', 'the gas warms'],
          ],
        },
      ],
      lines: [
        { say: 'A graph of temperature against time is called a heating curve. This one is for a pure substance that melts at fifty degrees Celsius, and boils at one hundred twenty.', show: ['hc.grid', 'hc.axes'] },
        { say: 'In section A, the solid warms up.', show: ['hc.curve-0', 't.0'], focus: 't.0' },
        { say: 'In section B, it melts. Solid and liquid are there together, and the temperature stays at fifty degrees, though it is still being heated.', show: ['hc.curve-1', 'hc.mp', 't.1'], focus: ['hc.curve-1', 't.1'] },
        { say: 'The energy taken in goes into separating the particles, not into making them move faster.' },
        { say: 'In section C, the liquid warms up. In section D, it boils, with liquid and gas together at one hundred twenty degrees. And in section E, the gas warms up.', show: ['hc.curve-2', 'hc.curve-3', 'hc.curve-4', 'hc.bp', 't.2', 't.3', 't.4'], focus: ['hc.curve-3', 't.3'] },
      ],
    },
    {
      chapter: 'Melting and boiling points',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Melting point and boiling point', md: 'The **melting point** is the temperature at which a substance melts; a liquid freezes at the same temperature. The **boiling point** is the temperature at which a liquid boils. Each pure substance has its own fixed melting and boiling points.' },
        { kind: 'bullets', id: 'rule', items: ['Below its melting point, a substance is a **solid**.', 'Between its melting point and its boiling point, it is a **liquid**.', 'Above its boiling point, it is a **gas**.'] },
      ],
      lines: [
        { say: 'The melting point is the temperature at which a substance melts. A liquid freezes at that same temperature. The boiling point is the temperature at which a liquid boils.', show: 'def' },
        { say: 'Each pure substance has its own fixed melting and boiling points, so you can tell its state at any temperature.' },
        { say: 'Below its melting point, it is a solid. Between its melting and boiling points, a liquid. And above its boiling point, a gas.', show: 'rule' },
      ],
    },
    {
      chapter: 'The state at a temperature',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'table',
          id: 'mp',
          head: ['Substance', 'Melts (°C)', 'Boils (°C)'],
          rows: [
            ['oxygen', '−218', '−183'],
            ['ethanol', '−114', '78'],
            ['mercury', '−39', '357'],
            ['water', '0', '100'],
            ['sulfur', '115', '445'],
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'What is the state of ethanol at $-120^\\circ\\text{C}$, $20^\\circ\\text{C}$ and $90^\\circ\\text{C}$?' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['$-120^\\circ\\text{C}$ is below $-114^\\circ\\text{C}$: **solid**.', '$20^\\circ\\text{C}$ is between $-114^\\circ\\text{C}$ and $78^\\circ\\text{C}$: **liquid**.', '$90^\\circ\\text{C}$ is above $78^\\circ\\text{C}$: **gas**.'],
        },
      ],
      lines: [
        { say: 'Here are the melting and boiling points of five substances. What is the state of ethanol at minus one hundred twenty degrees Celsius, twenty degrees, and ninety degrees?', show: ['mp', 'q'], focus: 'mp.1' },
        { say: 'Minus one hundred twenty is below ethanol’s melting point of minus one hundred fourteen, so ethanol is a solid.', show: 'steps.0' },
        { say: 'Twenty degrees is between the melting point and the boiling point, seventy-eight degrees, so ethanol is a liquid.', show: 'steps.1' },
        { say: 'And ninety degrees is above the boiling point, so ethanol is a gas.', show: 'steps.2' },
        { say: 'Mercury heated from minus fifty degrees to four hundred starts as a solid and ends as a gas. So it melts at minus thirty-nine, then boils at three hundred fifty-seven.', focus: 'mp.2' },
      ],
    },
    {
      chapter: 'Negative temperatures',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Take care with negative temperatures', md: 'Further below zero is **colder**: $-120^\\circ\\text{C}$ is colder than $-114^\\circ\\text{C}$, so ethanol is still solid. Oxygen boils at $-183^\\circ\\text{C}$, so at $-150^\\circ\\text{C}$, which is **warmer**, oxygen is already a gas.' }],
      lines: [
        { say: 'Take care with negative temperatures: further below zero is colder. Minus one hundred twenty is colder than minus one hundred fourteen, so ethanol is still a solid.', show: 'oops' },
        { say: 'Oxygen boils at minus one hundred eighty-three degrees, so at minus one hundred fifty, which is warmer, oxygen is already a gas.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Melting and boiling points: oxygen $-218^\\circ\\text{C}$ and $-183^\\circ\\text{C}$; ethanol $-114^\\circ\\text{C}$ and $78^\\circ\\text{C}$; mercury $-39^\\circ\\text{C}$ and $357^\\circ\\text{C}$; sulfur $115^\\circ\\text{C}$ and $445^\\circ\\text{C}$. Which substance is a liquid at $90^\\circ\\text{C}$?',
          choices: ['oxygen', 'ethanol', 'mercury', 'sulfur'],
          answer: 2,
          working: '$90^\\circ\\text{C}$ is between the melting point ($-39^\\circ\\text{C}$) and boiling point ($357^\\circ\\text{C}$) of mercury. Oxygen and ethanol are gases at $90^\\circ\\text{C}$, and sulfur is still a solid.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the melting and boiling points on the screen. Which substance is a liquid at ninety degrees Celsius? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, mercury: ninety degrees is between its melting and boiling points. Ethanol is tempting, but ninety is above its boiling point of seventy-eight, so ethanol is a gas.', show: 'q.answer' },
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
            'A pure substance melts and boils at fixed temperatures.',
            'While it melts or boils, its temperature stays the same: the flat parts of a heating curve.',
            'Below the melting point: solid. Between the two: liquid. Above the boiling point: gas.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A pure substance melts and boils at fixed temperatures, its melting point and its boiling point.', show: 'sum.0' },
        { say: 'While it melts or boils, its temperature stays the same. These are the flat parts of a heating curve.', show: 'sum.1' },
        { say: 'Below its melting point, a substance is a solid; between the two, a liquid; and above its boiling point, a gas. That completes this lesson on states of matter.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
