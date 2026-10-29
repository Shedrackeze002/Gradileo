import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cup, hbars, join, room, tag } from './lib/c30-1a-figures.ts';

// How far the copper and the water change temperature as they reach 24.5 °C together.
const changes = figure(
  'dt',
  [
    join([
      hbars({
        max: 80,
        gap: 1.6,
        rows: [
          { label: 'copper', value: 73.5, shown: '73.5^\\circ\\text{C}', tone: 'opp' },
          { label: 'water', value: 4.5, shown: '4.5^\\circ\\text{C}', tone: 'adj' },
        ],
      }),
      tag('title', [3, 1.0], '\\text{change in temperature}', { place: 'above', tone: 'muted', group: 'axis' }),
      room('space', [-3.2, 0], [8, 0]),
    ]),
  ],
  360,
);

// A simple calorimeter, with its parts named.
const calorimeter = figure(
  'cal',
  [
    join([
      cup({
        reading: 3.9,
        labels: { thermometer: '\\text{thermometer}', lid: '\\text{lid}', cups: '\\text{polystyrene cups}', liquid: '\\text{solution}', stirrer: '\\text{stirrer}' },
      }),
      room('space', [-4.6, 0], [10.4, 7]),
    ]),
  ],
  520,
);

const video: Explainer = {
  id: 'c30-1-2-d',
  lessonId: 'c30-1-2',
  title: 'Calorimetry, Part 4: Heat Lost, Heat Gained and the Calorimeter',
  thumbnailTitle: 'Heat Lost, Heat Gained',
  thumbnail: 'cal',
  summary:
    'In an insulated cup, the heat lost by a hot object equals the heat gained by the cold water, and both end at the same temperature: 100.0 g of copper at 98.0 °C in 150.0 g of water at 20.0 °C ends at 24.5 °C. A simple calorimeter of two polystyrene cups assumes no heat is exchanged with the outside, the cup absorbs almost none, a dilute solution behaves like water, and all the energy shows up in the water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 4', title: 'Heat Lost, Heat Gained and the Calorimeter', subtitle: 'What one loses, the other gains' }],
      lines: [
        { say: 'Drop a hot piece of copper into cold water. The copper cools and the water warms, until both are at the same temperature.', show: 'title' },
        { say: 'In this part, you will use that to find a final temperature, and see what a simple calorimeter assumes.' },
      ],
    },
    {
      chapter: 'Heat lost equals heat gained',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'If no heat escapes', md: 'heat lost by the hot object $=$ heat gained by the cold water' },
        { kind: 'text', id: 't', size: 'md', align: 'center', md: 'Each side is a $Q = mc\\Delta t$, with each $\\Delta t$ measured to the shared final temperature, $t_f$.' },
      ],
      lines: [
        { say: 'In an insulated container, heat flows from the hot object to the cold water until both reach the same temperature. If no heat escapes, the heat lost by the hot object equals the heat gained by the water.', show: 'key' },
        { say: 'Each side is a Q equals m c delta t, and each delta t is measured to the shared final temperature, t f.', caption: 'Each side is a Q = mcΔt, and each Δt is measured to the shared final temperature, t_f.', show: 't' },
      ],
    },
    {
      chapter: 'A hot metal in cold water',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: '$100.0\\ \\text{g}$ of copper at $98.0^\\circ\\text{C}$ is dropped into $150.0\\ \\text{g}$ of water at $20.0^\\circ\\text{C}$ in an insulated cup. Find the final temperature. $c$: copper $0.385$, water $4.19\\ \\text{J/(g·°C)}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '100.0(0.385)(98.0 - t_f) = 150.0(4.19)(t_f - 20.0)',
            '38.5(98.0 - t_f) = 628.5(t_f - 20.0)',
            '3773 - 38.5\\,t_f = 628.5\\,t_f - 12\\,570',
            '667.0\\,t_f = 16\\,343',
            't_f = 24.5^\\circ\\text{C}',
          ],
        },
      ],
      lines: [
        {
          say: 'One hundred point zero grams of copper at ninety-eight point zero degrees Celsius is dropped into one hundred fifty point zero grams of water at twenty point zero degrees. What is the final temperature?',
          show: 'q',
        },
        {
          say: 'Heat lost by the copper equals heat gained by the water. The copper cools down to t f, and the water warms up to t f.',
          caption: 'Heat lost by the copper equals heat gained by the water. The copper cools down to t_f, and the water warms up to t_f.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'Multiply the masses by the heat capacities: thirty-eight point five on the left, and six hundred twenty-eight point five on the right.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Expand, and collect the t f terms on one side: six hundred sixty-seven point zero t f equals sixteen thousand three hundred forty-three.',
          caption: 'Expand, and collect the t_f terms on one side: 667.0 t_f = 16 343.',
          show: ['m.2', 'm.3'],
          focus: 'm.3',
        },
        { say: 'Divide, and the final temperature is twenty-four point five degrees Celsius.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Why the water hardly warms',
      layout: 'split',
      leftWidth: 560,
      left: [changes],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{copper: } 38.5 \\times 73.5 \\approx 2830\\ \\text{J}', '\\text{water: } 628.5 \\times 4.5 \\approx 2830\\ \\text{J}'] },
        { kind: 'text', id: 't', size: 'md', md: 'The same heat, but water’s specific heat capacity is far larger.' },
      ],
      lines: [
        { say: 'Look at the two changes. The copper cools by seventy-three point five degrees, but the water warms by only four point five.', show: ['dt.axis', 'dt.r0', 'dt.r1'] },
        {
          say: 'Yet they exchanged the same heat, about two thousand eight hundred thirty joules. Water’s specific heat capacity is simply far larger.',
          show: ['m', 't'],
        },
      ],
    },
    {
      chapter: 'The simple calorimeter',
      layout: 'split',
      leftWidth: 600,
      left: [calorimeter],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Calorimeter', md: 'A container in which an energy change is measured through the temperature change of the water around it.' }],
      lines: [
        { say: 'A calorimeter is a container in which an energy change is measured, through the temperature change of the water around it.', show: 'def' },
        {
          say: 'A simple one, for reactions in solution, is two nested polystyrene cups with a lid, a thermometer through the lid, and a stirrer.',
          show: ['cal.cups', 'cal.cups-tag', 'cal.liquid', 'cal.liquid-tag', 'cal.lid', 'cal.lid-tag', 'cal.thermometer', 'cal.thermometer-tag', 'cal.stirrer', 'cal.stirrer-tag'],
        },
        { say: 'The reactants are mixed and stirred, and the highest or lowest temperature is recorded.', focus: ['cal.thermometer', 'cal.stirrer'] },
      ],
    },
    {
      chapter: 'Four assumptions',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'No heat is lost to, or gained from, the surroundings outside the cup.',
            'The cup, thermometer and stirrer absorb a negligible amount of heat.',
            'A dilute solution behaves like water: $1.00\\ \\text{g/mL}$ and $4.19\\ \\text{J/(g·°C)}$.',
            'All the energy of the reaction shows up as a temperature change of the water.',
          ],
        },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Whose mass?', md: 'In $Q = mc\\Delta t$, use the mass and $c$ of the **water** (or solution), not of the solid that dissolves or reacts.' },
      ],
      lines: [
        { say: 'The calculation rests on four assumptions. First, no heat is lost to, or gained from, the outside: polystyrene insulates well, and the lid cuts heat loss.', show: 'b.0' },
        { say: 'Second, the cup, the thermometer and the stirrer absorb a negligible amount of heat.', show: 'b.1' },
        { say: 'Third, a dilute solution behaves like water, with its density and its specific heat capacity.', show: 'b.2' },
        { say: 'Fourth, all the energy of the reaction shows up in the water, spread evenly by stirring.', show: 'b.3' },
        { say: 'So the mass in the equation is the water’s, not the solid’s. And since some heat always leaks away, a measured change is usually a little too small.', show: 'mis' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $50.0\\ \\text{g}$ piece of iron at $95.0^\\circ\\text{C}$ is dropped into $100.0\\ \\text{g}$ of water at $20.0^\\circ\\text{C}$ in an insulated cup. What is the final temperature? $c$: iron $0.449$, water $4.19\\ \\text{J/(g·°C)}$.',
          choices: ['$57.5^\\circ\\text{C}$', '$23.8^\\circ\\text{C}$', '$81.8^\\circ\\text{C}$', '$27.3^\\circ\\text{C}$'],
          answer: 1,
          working: '$50.0(0.449)(95.0 - t_f) = 100.0(4.19)(t_f - 20.0)$, so $22.45(95.0 - t_f) = 419.0(t_f - 20.0)$ and $t_f = \\dfrac{2132.75 + 8380}{441.45} = 23.8^\\circ\\text{C}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A fifty point zero gram piece of iron at ninety-five point zero degrees Celsius is dropped into one hundred point zero grams of water at twenty point zero degrees. What is the final temperature? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, twenty-three point eight degrees. Choice A just averages the two temperatures, but water’s large heat capacity keeps the final temperature close to its own.',
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
            'With no heat lost: heat lost by the hot object = heat gained by the cold water.',
            'Each $\\Delta t$ is measured to the shared final temperature, $t_f$.',
            'A simple calorimeter: two polystyrene cups, a lid, a thermometer and a stirrer.',
            'It assumes no heat exchange with the outside, a cup that absorbs almost none, and a solution that behaves like water.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With no heat lost, the heat lost by the hot object equals the heat gained by the cold water, both ending at the same temperature.', show: ['sum.0', 'sum.1'] },
        { say: 'A simple calorimeter is two polystyrene cups, a lid, a thermometer and a stirrer.', show: 'sum.2' },
        { say: 'It assumes no heat is exchanged with the outside, and a solution that behaves like water. That completes this lesson. Next, you will turn calorimetry into molar enthalpy.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
