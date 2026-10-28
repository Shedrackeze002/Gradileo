import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { charlesGraph, gasBox, tag } from './lib/c20-2a-figures.ts';

// A gas under a free piston, cool and then warmed: faster particles push the piston up.
const pistons = figure(
  'p',
  [
    gasBox({ name: 'cool', at: [0, 0], w: 4, h: 3, count: 7, r: 0.24, speed: 0.45, seed: 81, top: 'piston', walls: 6 }),
    tag('cool-l', [2, -0.3], '\\text{cool}', { place: 'below', tone: 'adj', group: 'cool-p' }),
    gasBox({ name: 'hot', at: [6, 0], w: 4, h: 4.8, count: 7, r: 0.24, speed: 1.1, seed: 82, top: 'piston', walls: 6, hits: 4 }),
    tag('hot-l', [8, -0.3], '\\text{warmed}', { place: 'below', tone: 'opp', group: 'hot-p' }),
  ],
  460,
);

const graph = figure('g', [charlesGraph()], 540);

const video: Explainer = {
  id: 'c20-2-4',
  lessonId: 'c20-2-4',
  title: "Charles's Law and Gay-Lussac's Law, Part 1: Volume and Temperature",
  thumbnailTitle: 'Volume and Temperature',
  thumbnail: 'g',
  summary:
    "At constant pressure, a gas expands as it is warmed. Graphs of volume against Celsius temperature are straight lines that all extend back to zero volume at about −273 °C: absolute zero. In kelvins, the volume is directly proportional to the temperature. This is Charles's law: V₁/T₁ = V₂/T₂.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 1', title: 'Volume and Temperature', subtitle: 'A warmer gas takes up more room' }],
      lines: [
        { say: 'Carry a party balloon from a warm room out into freezing air, and it shrinks. Bring it back inside, and it swells again.', show: 'title' },
        { say: 'In this lesson, you will see how the volume and the pressure of a gas depend on its temperature, and why that temperature must always be in kelvins. This first part looks at volume, at constant pressure.' },
      ],
    },
    {
      chapter: 'Heating at constant pressure',
      layout: 'split',
      leftWidth: 600,
      left: [pistons],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A piston that **slides freely** keeps the pressure on the gas the same.', 'Warmed, the gas pushes the piston out: its volume **grows**.', 'Cooled, its volume **shrinks**.'],
        },
      ],
      lines: [
        { say: 'Imagine a gas trapped under a piston that slides freely, so the pressure on the gas stays the same.', show: ['p.cool-box', 'p.cool-piston', 'p.cool-p', 'p.cool-l', 'b.0'] },
        { say: 'As the gas is warmed, it pushes the piston out, and its volume grows.', show: ['p.hot-box', 'p.hot-piston', 'p.hot-p', 'p.hot-l', 'b.1'] },
        { say: 'As it is cooled, its volume shrinks. So how exactly does the volume depend on the temperature?', show: 'b.2' },
      ],
    },
    {
      chapter: 'Back to absolute zero',
      layout: 'center',
      main: [graph],
      lines: [
        { say: 'A graph of volume against temperature in degrees Celsius is a straight line. Here are three samples of gas of different sizes, measured between minus fifty and one hundred degrees Celsius.', show: ['g.grid', 'g.axes', 'g.s1', 'g.s2', 'g.s3'] },
        { say: 'Each line has been extended backwards, to lower temperatures. All three reach zero volume at the same temperature, about minus two hundred seventy-three degrees Celsius.', show: ['g.x1', 'g.x2', 'g.x3', 'g.zero'], focus: 'g.zero' },
        { say: 'No real gas ever shrinks to nothing: every gas turns into a liquid or a solid long before it gets that cold. The dashed lines only extend the pattern beyond the measurements.', focus: ['g.x1', 'g.x2', 'g.x3'] },
        { say: 'But every gas points to the same temperature, and it turns out to be the lowest temperature there can be: absolute zero. That is zero kelvins, or minus two hundred seventy-three point one five degrees Celsius.', focus: 'g.zero' },
      ],
    },
    {
      chapter: 'Charles’s law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dir', tone: 'definition', title: 'Directly proportional', md: 'Two quantities are **directly proportional** when their ratio stays the same. If one is multiplied by a factor, the other is multiplied by the same factor.' },
        { kind: 'callout', id: 'law', tone: 'key', title: 'Charles’s law', md: 'For a fixed amount of gas at constant pressure, the volume is directly proportional to the **Kelvin** temperature.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}'] },
      ],
      lines: [
        { say: 'Measured in kelvins, each line on the graph would pass through the origin. Double the Kelvin temperature, and the volume doubles too.' },
        { say: 'Two quantities are directly proportional when their ratio stays the same. If one is multiplied by a factor, the other is multiplied by the same factor.', show: 'dir' },
        { say: 'Charles’s law says that for a fixed amount of gas at constant pressure, the volume is directly proportional to the Kelvin temperature: V one over T one equals V two over T two.', caption: 'Charles’s law says that for a fixed amount of gas at constant pressure, the volume is directly proportional to the Kelvin temperature: V₁/T₁ = V₂/T₂.', show: ['law', 'm'], focus: 'm' },
        { say: 'The law is named after the French scientist and balloonist Jacques Charles.' },
      ],
    },
    {
      chapter: 'Why a hotter gas takes more room',
      layout: 'split',
      leftWidth: 600,
      left: [pistons],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Heated particles move **faster**: they hit the walls more often and harder.', 'The piston can move, so the gas **expands**.', 'Spread out, the particles hit each part of the wall less often, until the pressures **balance** again.'],
        },
      ],
      lines: [
        { say: 'The kinetic molecular theory explains Charles’s law. When a gas is heated, its particles move faster on average, so they hit the walls more often and harder.', show: ['p.cool-box', 'p.cool-piston', 'p.cool-p', 'p.cool-v', 'p.cool-l', 'p.hot-box', 'p.hot-piston', 'p.hot-p', 'p.hot-v', 'p.hot-hits', 'p.hot-l', 'b.0'], focus: ['p.hot-v', 'p.hot-hits'] },
        { say: 'In a balloon, or under a free piston, the walls can move, so the gas expands.', show: 'b.1', focus: 'p.hot-piston' },
        { say: 'As it spreads out, its particles reach each part of the wall less often, until the pressure inside matches the pressure outside again. So a hotter gas at the same pressure takes up more room.', show: 'b.2', focus: 'p' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At constant pressure, the **Kelvin** temperature of a fixed amount of gas is tripled. What happens to its volume?',
          choices: ['It triples.', 'It falls to a third.', 'It stays the same, because the pressure is constant.', 'It becomes nine times as large.'],
          answer: 0,
          working: 'By Charles’s law, the volume is directly proportional to the Kelvin temperature, so multiplying the Kelvin temperature by $3$ multiplies the volume by $3$.',
        },
      ],
      lines: [
        { say: 'Your turn. At constant pressure, the Kelvin temperature of a fixed amount of gas is tripled. What happens to its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: it triples. The volume is directly proportional to the Kelvin temperature, so both are multiplied by the same factor. Choice B is what happens when the pressure triples, by Boyle’s law.', show: 'q.answer' },
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
            'Graphs of volume against Celsius temperature all extend to zero volume at **absolute zero**.',
            '**Directly proportional** quantities change by the same factor.',
            '**Charles’s law**: at constant pressure, $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$, with $T$ in kelvins.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Graphs of gas volume against Celsius temperature all extend back to zero volume at absolute zero.', show: 'sum.0' },
        { say: 'Directly proportional quantities change by the same factor.', show: 'sum.1' },
        { say: 'And Charles’s law says that at constant pressure, the volume is directly proportional to the Kelvin temperature. In part two, you will use it to find a new volume. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
