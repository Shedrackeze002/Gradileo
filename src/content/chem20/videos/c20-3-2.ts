import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, beaker, solubilityCurve } from './lib/c20-3a-figures.ts';

// An unsaturated solution beside a saturated one, with undissolved solid on the bottom: particles
// leave the solid and join it again at the same rate.
const twoBeakers = figure(
  'b',
  [
    beaker({ name: 'u', w: 3, h: 3.8, level: 3, label: '\\text{unsaturated}', seed: 2, scatter: [{ id: 'p', count: 5, tone: 'theta', r: 0.24 }] }),
    beaker({
      name: 's',
      at: [3.9, 0],
      w: 3,
      h: 3.8,
      level: 3,
      label: '\\text{saturated}',
      seed: 6,
      solid: { tone: 'theta', height: 0.45 },
      scatter: [{ id: 'p', count: 7, tone: 'theta', r: 0.24 }],
      avoid: [[0.6, 0.4, 2.4, 1.7]],
    }),
    arrow('up', [4.95, 0.7], [4.95, 1.55], { tone: 'good', group: 'swap' }),
    arrow('down', [5.85, 1.55], [5.85, 0.7], { tone: 'opp', group: 'swap' }),
  ],
  460,
);

// The solubility of potassium nitrate against temperature, and the same curve zoomed in on 20 °C.
const curve = figure('c', [solubilityCurve()], 540);
const zoomed = figure('z', [solubilityCurve({ zoom: true })], 540);

const video: Explainer = {
  id: 'c20-3-2',
  lessonId: 'c20-3-2',
  title: 'Solubility and Precipitates, Part 1: Saturated Solutions and Solubility',
  thumbnailTitle: 'Saturated Solutions and Solubility',
  thumbnail: 'c',
  summary:
    'Solubility is the greatest amount of a substance that dissolves in a given amount of solvent at a given temperature. A saturated solution holds all it can, so extra solid stays undissolved; an unsaturated solution can dissolve more. Most solids dissolve better in hot water, while gases dissolve less.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 1', title: 'Saturated Solutions and Solubility', subtitle: 'How much can dissolve?' }],
      lines: [
        { say: 'Pour a clear, colourless solution of silver nitrate into a clear, colourless solution of sodium chloride, and a white cloud appears at once.', show: 'title' },
        { say: 'In this lesson, you will see how much a solvent can dissolve, decide which ionic compounds dissolve well, and predict the solid that forms. This first part is about how much can dissolve.' },
      ],
    },
    {
      chapter: 'Saturated or unsaturated',
      layout: 'split',
      leftWidth: 520,
      left: [twoBeakers],
      right: [
        { kind: 'callout', id: 'sol', tone: 'definition', title: 'Solubility', md: 'The greatest amount of a substance that dissolves in a given amount of solvent at a given **temperature**.' },
        { kind: 'callout', id: 'sat', tone: 'definition', title: 'Saturated and unsaturated', md: 'A **saturated** solution holds all the solute it can; extra solid stays undissolved. An **unsaturated** solution can dissolve more.' },
      ],
      lines: [
        { say: 'Keep adding salt to a glass of water, stirring all the time, and eventually no more dissolves. The extra crystals just sit at the bottom.', show: ['b.s-glass', 'b.s-liquid', 'b.s-p', 'b.s-solid'] },
        { say: 'The solubility of a substance is the greatest amount of it that dissolves in a given amount of solvent, at a given temperature, often in grams per one hundred grams of water.', show: 'sol' },
        { say: 'A saturated solution holds as much solute as it can, so any extra solid stays undissolved. An unsaturated solution holds less, so more can still dissolve.', show: ['sat', 'b.s-label', 'b.u-glass', 'b.u-liquid', 'b.u-p', 'b.u-label'] },
        { say: 'Dissolving does not stop in a saturated solution. Particles keep leaving the solid while others join it, at the same rate, so the amount dissolved stays the same.', show: 'b.swap', focus: 'b.swap' },
      ],
    },
    {
      chapter: 'Potassium nitrate',
      layout: 'split',
      leftWidth: 600,
      left: [zoomed],
      right: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            'Solubility of $\\ce{KNO3}$ at $20^\\circ\\text{C}$: $32\\ \\text{g}$ per $100\\ \\text{g}$ of water.',
            '$25\\ \\text{g}$ all dissolves. **Unsaturated**: $32 - 25 = 7\\ \\text{g}$ more could dissolve.',
            'Add $15\\ \\text{g}$ more: $25 + 15 = 40\\ \\text{g}$ in all.',
            '**Saturated**: $40 - 32 = 8\\ \\text{g}$ of solid stays at the bottom.',
          ],
        },
      ],
      lines: [
        { say: 'This curve shows the solubility of potassium nitrate. At twenty degrees Celsius, it is thirty-two grams per one hundred grams of water.', show: ['z.grid', 'z.axes', 'z.curve', 'z.p20', 's.0'], focus: 'z.p20' },
        { say: 'A student stirs twenty-five grams into one hundred grams of water at twenty degrees. That is less than thirty-two grams, so all of it dissolves.', show: 'z.under', focus: 'z.under' },
        { say: 'The solution is unsaturated: thirty-two minus twenty-five, or seven more grams, could still dissolve.', show: 's.1', focus: 's.1' },
        { say: 'Now the student adds another fifteen grams. That makes forty grams in all, but only thirty-two grams can dissolve.', show: ['s.2', 'z.over'], focus: 'z.over' },
        { say: 'So the solution is now saturated, and forty minus thirty-two, or eight grams of solid, stays at the bottom.', show: 's.3', focus: 's.3' },
      ],
    },
    {
      chapter: 'Temperature',
      layout: 'split',
      leftWidth: 600,
      left: [curve],
      right: [
        {
          kind: 'bullets',
          id: 't',
          items: [
            'Solubility depends on **temperature**, so a solubility value always comes with one.',
            'Most solids dissolve better in hot water: about $110\\ \\text{g}$ of $\\ce{KNO3}$ per $100\\ \\text{g}$ of water at $60^\\circ\\text{C}$.',
            '**Gases** are less soluble in warm water: a warm fizzy drink goes flat sooner.',
          ],
        },
      ],
      lines: [
        { say: 'Solubility depends on temperature, so a solubility value always comes with one.', show: ['c.grid', 'c.axes', 'c.curve', 'c.p20', 't.0'] },
        { say: 'Below the curve, the solution is unsaturated. Above it, there is more solute than can dissolve, and the extra stays as solid.', show: 'c.regions', focus: 'c.regions' },
        { say: 'Most solids dissolve better in hot water. At sixty degrees Celsius, about one hundred ten grams of potassium nitrate dissolves in one hundred grams of water.', show: ['c.p60', 't.1'], focus: 'c.p60' },
        { say: 'Gases do the opposite. They are less soluble in warm water, which is why a warm fizzy drink goes flat sooner than a cold one.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Saturated is not concentrated',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'mis',
          tone: 'mistake',
          title: 'Saturated is not the same as concentrated',
          md: '**Saturated** says the solution holds all it can; **concentrated** says it holds a lot. A saturated solution of silver chloride, which has very low solubility, is extremely dilute. An unsaturated sugar solution can be very concentrated.',
        },
      ],
      lines: [
        { say: 'Saturated is not the same as concentrated. Saturated says the solution holds all it can. Concentrated says it holds a lot.', show: 'mis' },
        { say: 'A saturated solution of silver chloride, which has very low solubility, is extremely dilute. And an unsaturated sugar solution can be very concentrated.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The solubility of sodium chloride is $36\\ \\text{g}$ per $100\\ \\text{g}$ of water at $20^\\circ\\text{C}$. $50\\ \\text{g}$ of it is stirred into $100\\ \\text{g}$ of water at $20^\\circ\\text{C}$. What happens?',
          choices: [
            'All $50\\ \\text{g}$ dissolves, and the solution is unsaturated.',
            'All $50\\ \\text{g}$ dissolves, and the solution is saturated.',
            '$36\\ \\text{g}$ dissolves; the solution is saturated, with $14\\ \\text{g}$ of solid left.',
            '$14\\ \\text{g}$ dissolves, and $36\\ \\text{g}$ of solid is left.',
          ],
          answer: 2,
          working: 'Only $36\\ \\text{g}$ can dissolve in $100\\ \\text{g}$ of water at $20^\\circ\\text{C}$, so the solution is saturated and $50 - 36 = 14\\ \\text{g}$ of solid stays at the bottom.',
        },
      ],
      lines: [
        { say: 'Your turn. The solubility of sodium chloride is thirty-six grams per one hundred grams of water at twenty degrees Celsius. Fifty grams of it is stirred into one hundred grams of water at that temperature. What happens? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Only thirty-six grams can dissolve, so the solution is saturated, and fifty minus thirty-six, or fourteen grams of solid, stays at the bottom.', show: 'q.answer' },
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
            '**Solubility**: the most solute that dissolves in a given amount of solvent at a given temperature.',
            'A **saturated** solution holds all it can; an **unsaturated** one can dissolve more.',
            'Most solids dissolve better in hot water; gases dissolve less.',
            'Saturated is not the same as concentrated.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Solubility is the most solute that dissolves in a given amount of solvent, at a given temperature.', show: 'sum.0' },
        { say: 'A saturated solution holds all it can, and an unsaturated one can dissolve more.', show: 'sum.1' },
        { say: 'Most solids dissolve better in hot water, while gases dissolve less.', show: 'sum.2' },
        { say: 'And saturated is not the same as concentrated. In part two, you will use the solubility rules. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
