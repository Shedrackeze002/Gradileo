import type { Explainer } from '@/video/script.ts';
import { particles } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { link, tag } from './lib/c30-4a-figures.ts';

// N₂O₄ ⇌ 2NO₂ squeezed into half the space: 3 N₂O₄ and 6 NO₂ before; the same molecules just after
// the squeeze (a box of half the area); then 4 N₂O₄ and 4 NO₂ after the shift to the left.
const SMALL = 6 / Math.SQRT2;
const syringe = figure(
  's',
  [
    particles({ name: 'a', state: 'gas', kinds: [{ id: 'n2o4', tone: 'muted', count: 3, atoms: 2 }, { id: 'no2', tone: 'opp', count: 6 }], seed: 5 }),
    particles({ name: 'b', at: [8, 0], size: SMALL, state: 'gas', kinds: [{ id: 'n2o4', tone: 'muted', count: 3, atoms: 2 }, { id: 'no2', tone: 'opp', count: 6 }], seed: 12 }),
    particles({ name: 'c', at: [14.6, 0], size: SMALL, state: 'gas', kinds: [{ id: 'n2o4', tone: 'muted', count: 4, atoms: 2 }, { id: 'no2', tone: 'opp', count: 4 }], seed: 21 }),
    link('arr1', [6.4, 2.1], [7.6, 2.1], { arrow: true, tone: 'muted' }),
    link('arr2', [8 + SMALL + 0.3, 2.1], [14.3, 2.1], { arrow: true, tone: 'muted' }),
    tag('la', [3, -0.2], '\\text{before}', { place: 'below' }),
    tag('lb', [8 + SMALL / 2, -0.2], '\\text{half the volume}', { place: 'below' }),
    tag('lc', [14.6 + SMALL / 2, -0.2], '\\text{after the shift}', { place: 'below' }),
  ],
  380,
);

const video: Explainer = {
  id: 'c30-4-3-c',
  lessonId: 'c30-4-3',
  title: "Le Châtelier's Principle, Part 3: Volume and Pressure",
  thumbnailTitle: 'Volume and Pressure',
  thumbnail: 's',
  summary:
    'Squeezing a gas mixture into a smaller volume raises the pressure, and the equilibrium shifts towards the side with fewer gas molecules; a larger volume shifts it towards more. Count only the gases: N₂ + 3H₂ ⇌ 2NH₃ shifts right, N₂O₄ ⇌ 2NO₂ shifts left, and H₂ + I₂ ⇌ 2HI does not shift. A non-reacting gas added at constant volume, or more of a pure solid or liquid, changes no concentration and causes no shift.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 3', title: 'Volume and Pressure', subtitle: 'Count the gas molecules' }],
      lines: [
        { say: 'Push in the plunger of a sealed syringe of gas, and the pressure inside rises. If the gases are at equilibrium, the mixture shifts to push back.', show: 'title' },
        { say: 'In this part, you will predict the shift when the volume or pressure changes, and see which changes cause no shift at all.' },
      ],
    },
    {
      chapter: 'Count the gas molecules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Volume and pressure', md: 'A **smaller volume** (higher pressure) shifts an equilibrium towards the side with **fewer gas molecules**; a larger volume shifts it towards more. Count only the gases.' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Equilibrium', 'Moles of gas: left → right', 'Smaller volume shifts it'],
          rows: [
            ['$\\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$', '4 → 2', 'right'],
            ['$\\ce{N2O4(g) <=> 2NO2(g)}$', '1 → 2', 'left'],
            ['$\\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$', '0 → 1', 'left'],
            ['$\\ce{H2(g) + I2(g) <=> 2HI(g)}$', '2 → 2', 'no shift'],
          ],
        },
      ],
      lines: [
        { say: 'Squeezing a mixture of gases into a smaller volume raises the pressure. The system shifts towards the side with fewer gas molecules, which lowers the pressure again. A larger volume does the opposite.', show: 'key' },
        { say: 'Count only the gases, using the coefficients. Nitrogen plus three hydrogen: four moles of gas on the left, and two on the right. A smaller volume shifts it right.', show: 'tb.0', focus: 'tb.0' },
        { say: 'Dye-nitrogen tetroxide: one on the left and two on the right, so it shifts left.', caption: 'Dinitrogen tetroxide: one on the left and two on the right, so it shifts left.', show: 'tb.1', focus: 'tb.1' },
        { say: 'For calcium carbonate, the solids do not count: zero on the left and one on the right, so left again.', show: 'tb.2', focus: 'tb.2' },
        { say: 'Hydrogen plus iodine has two on each side, so changing the volume causes no shift.', show: 'tb.3', focus: 'tb.3' },
      ],
    },
    {
      chapter: 'Squeezing a brown gas',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\ce{N2O4(g) <=> 2NO2(g)} \\qquad 1 \\text{ mole of gas} \\to 2'] },
        syringe,
      ],
      lines: [
        { say: 'Dye-nitrogen tetroxide and brown nitrogen dioxide are at equilibrium in a syringe. The plunger is pushed in, halving the volume.', caption: 'Dinitrogen tetroxide and brown nitrogen dioxide are at equilibrium in a syringe. The plunger is pushed in, halving the volume.', show: ['eq', 's.a-box', 's.a-n2o4', 's.a-no2', 's.la'] },
        { say: 'At first the mixture looks darker, because the same gas is squeezed into half the space.', show: ['s.arr1', 's.b-box', 's.b-n2o4', 's.b-no2', 's.lb'], focus: 's.b-no2' },
        { say: 'There is one mole of gas on the left and two on the right, so the smaller volume favours the left. Some brown nitrogen dioxide pairs up into colourless dye-nitrogen tetroxide, and the colour fades a little.', caption: 'There is one mole of gas on the left and two on the right, so the smaller volume favours the left. Some brown nitrogen dioxide pairs up into colourless dinitrogen tetroxide, and the colour fades a little.', show: ['s.arr2', 's.c-box', 's.c-n2o4', 's.c-no2', 's.lc'], focus: 's.c-n2o4' },
      ],
    },
    {
      chapter: 'Changes that cause no shift',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding a gas that does not react', md: 'Argon added to a sealed flask of fixed volume raises the total pressure, but changes the concentration of **no gas in the equilibrium**: no shift. Only a change in volume changes the concentrations of all the gases at once.' },
        { kind: 'callout', id: 'solid', tone: 'tip', title: 'More solid or liquid', md: 'Adding more of a pure solid or liquid changes no concentration, so it causes no shift either.' },
      ],
      lines: [
        { say: 'Here is a trap. Adding argon to a sealed flask of fixed volume raises the total pressure. But argon does not react, and it changes the concentration of no gas in the equilibrium. So there is no shift.', show: 'oops' },
        { say: 'Only a change in volume changes the concentrations of all the gases at once.' },
        { say: 'In the same way, adding more of a pure solid or liquid changes no concentration, so it causes no shift either.', show: 'solid' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The system $\\ce{C(s) + H2O(g) <=> CO(g) + H2(g)}$ is at equilibrium in a closed container. The volume of the container is decreased. How does the equilibrium respond?',
          choices: ['Shifts right, towards the side with more gas molecules.', 'No shift: there are two particles on each side.', 'Shifts left, towards the side with fewer gas molecules.', 'No shift: a solid is present.'],
          answer: 2,
          working: 'Count only the gases: $1$ mole ($\\ce{H2O}$) on the left and $2$ on the right. A smaller volume favours the side with fewer gas molecules: the left.',
        },
      ],
      lines: [
        { say: 'Your turn. Solid carbon and steam are at equilibrium with carbon monoxide and hydrogen. The volume is decreased. How does the equilibrium respond? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Count only the gases: one, the steam, on the left, and two on the right. A smaller volume favours fewer gas molecules: the left. Choice B counts the solid carbon too.', show: 'q.answer' },
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
            'A smaller volume (higher pressure) shifts an equilibrium towards **fewer gas molecules**.',
            'Count only the gases; equal numbers on each side means no shift.',
            'A non-reacting gas at constant volume, or more of a pure solid or liquid, causes **no shift**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A smaller volume, or a higher pressure, shifts an equilibrium towards the side with fewer gas molecules.', show: 'sum.0' },
        { say: 'Count only the gases. Equal numbers on each side means no shift.', show: 'sum.1' },
        { say: 'A gas that does not react, added at constant volume, causes no shift, and neither does more of a pure solid or liquid. In part four, you will change the temperature. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
