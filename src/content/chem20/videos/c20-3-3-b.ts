import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, beaker, line, tag } from './lib/c20-3a-figures.ts';

// 50 mL of ethanol and 50 mL of water make slightly less than 100 mL of solution.
const mixing = figure(
  'v',
  [
    beaker({ name: 'eth', w: 2, h: 6, level: 2.5, tone: 'theta', shade: 0.25, label: '\\text{ethanol}' }),
    tag('eth-v', [1, 1.25], '50\\ \\text{mL}', { group: 'eth-glass' }),
    tag('plus', [2.45, 2.5], '+'),
    beaker({ name: 'wat', at: [2.9, 0], w: 2, h: 6, level: 2.5, shade: 0.25, label: '\\text{water}' }),
    tag('wat-v', [3.9, 1.25], '50\\ \\text{mL}', { group: 'wat-glass' }),
    arrow('arrow', [5.2, 2.5], [6.0, 2.5]),
    beaker({ name: 'mix', at: [6.4, 0], w: 2, h: 6, level: 4.8, tone: 'good', shade: 0.25, label: '\\text{solution}' }),
    line('mark', [6.25, 5.0], [8.55, 5.0], { tone: 'theta', dashed: true, weight: 2.5, group: 'line' }),
    tag('mark-v', [7.4, 5.05], '100\\ \\text{mL}', { place: 'above', tone: 'theta', group: 'line' }),
  ],
  480,
);

const video: Explainer = {
  id: 'c20-3-3-b',
  lessonId: 'c20-3-3',
  title: 'Percent Concentration and Parts per Million, Part 2: Percent by Volume and Percent by Mass',
  thumbnailTitle: 'Percent by Volume and by Mass',
  thumbnail: 'v',
  summary:
    'Percent by volume, % (V/V), is millilitres of solute per 100 mL of solution, measured after mixing: 90 mL of ethanol in 650 mL of solution is 13.8% (V/V). Percent by mass, % (w/w), is grams of solute per 100 g of solution, where the solution is the solute plus the water: 24.5 g of salt in 160 g of water is 13.3% (w/w).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 2', title: 'Percent by Volume and Percent by Mass', subtitle: 'Two more ways to measure' }],
      lines: [
        { say: 'When the solute is a liquid, measuring it by volume is easiest. When precision matters, chemists weigh everything on a balance instead.', show: 'title' },
        { say: 'In this part, you will find percent by volume and percent by mass, and see the trap in each.' },
      ],
    },
    {
      chapter: 'Percent by volume',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent by volume', md: '% (V/V) $= \\dfrac{\\text{volume of solute}}{\\text{volume of solution}} \\times 100\\%$: millilitres of solute per $100\\ \\text{mL}$ of solution.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A solution contains $90\\ \\text{mL}$ of ethanol in $650\\ \\text{mL}$ of solution. What is its concentration in % (V/V), to the nearest tenth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{90\\ \\text{mL}}{650\\ \\text{mL}} \\times 100\\% = 13.846\\% \\approx 13.8\\%\\ (\\text{V/V})'] },
      ],
      lines: [
        { say: 'When the solute is a liquid, such as ethanol mixed with water, it is easier to measure both by volume.' },
        { say: 'Percent by volume, V over V, is the volume of solute divided by the volume of solution, times one hundred percent: millilitres of solute per one hundred millilitres of solution.', caption: 'Percent by volume, % (V/V), is the volume of solute divided by the volume of solution, times 100%: millilitres of solute per 100 mL of solution.', show: 'def' },
        { say: 'A solution contains ninety millilitres of ethanol in six hundred fifty millilitres of solution. What is its concentration, to the nearest tenth?', show: 'q' },
        { say: 'Ninety divided by six hundred fifty, times one hundred percent, is thirteen point eight four six percent. Rounded, thirteen point eight percent, V over V.', caption: '90 ÷ 650 × 100% = 13.846%. Rounded, 13.8% (V/V).', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Volumes do not always add',
      layout: 'split',
      leftWidth: 640,
      left: [mixing],
      right: [
        { kind: 'callout', id: 'note', tone: 'key', title: 'Volumes do not always add', md: '$50\\ \\text{mL}$ of ethanol and $50\\ \\text{mL}$ of water make slightly **less** than $100\\ \\text{mL}$: the molecules pack together more closely.' },
        { kind: 'text', id: 't', size: 'md', md: 'So % (V/V) uses the volume of the **solution**, measured after mixing.' },
      ],
      lines: [
        { say: 'Here is why the question gives the volume of the solution. Mix fifty millilitres of ethanol with fifty millilitres of water.', show: ['v.eth-glass', 'v.eth-liquid', 'v.eth-label', 'v.plus', 'v.wat-glass', 'v.wat-liquid', 'v.wat-label'] },
        { say: 'You get slightly less than one hundred millilitres of solution. The two kinds of molecule pack together more closely than either does alone.', show: ['v.arrow', 'v.mix-glass', 'v.mix-liquid', 'v.mix-label', 'v.line', 'note'], focus: 'v.line' },
        { say: 'So percent by volume uses the volume of the solution, measured after mixing, not the sum of the volumes poured in.', show: 't' },
      ],
    },
    {
      chapter: 'Percent by mass',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent by mass', md: '% (w/w) $= \\dfrac{\\text{mass of solute}}{\\text{mass of solution}} \\times 100\\%$: grams of solute per $100\\ \\text{g}$ of solution.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$24.5\\ \\text{g}$ of salt is dissolved in $160\\ \\text{g}$ of water. What is the concentration in % (w/w), to the nearest tenth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{mass of solution} = 24.5 + 160 = 184.5\\ \\text{g}', '\\dfrac{24.5}{184.5} \\times 100\\% = 13.28\\% \\approx 13.3\\%\\ (\\text{w/w})'] },
      ],
      lines: [
        { say: 'Percent by mass compares two masses. Masses are easy to measure precisely on a balance, and unlike a volume, a mass does not change when the solution warms up or cools down.' },
        { say: 'Percent by mass, w over w, is the mass of solute divided by the mass of solution, times one hundred percent.', caption: 'Percent by mass, % (w/w), is the mass of solute divided by the mass of solution, times 100%.', show: 'def' },
        { say: 'Twenty-four point five grams of salt is dissolved in one hundred sixty grams of water. What is the concentration, to the nearest tenth?', show: 'q' },
        { say: 'The question gives the mass of the water. Add the solute to find the mass of the solution: one hundred eighty-four point five grams.', show: 'm.0', focus: 'm.0' },
        { say: 'Then twenty-four point five over one hundred eighty-four point five, times one hundred percent, is thirteen point three percent, w over w.', caption: 'Then 24.5 ÷ 184.5 × 100% = 13.28%, or 13.3% (w/w).', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The mass of the solution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'The mass of the solution', md: 'The solution is the solute **plus** the water. Dividing by the mass of the water alone gives too large a concentration:' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{24.5}{160} \\times 100\\% = 15.3\\%}'] },
      ],
      lines: [
        { say: 'The trap is dividing by the mass of the water alone. That gives fifteen point three percent, a concentration larger than it should be.', show: ['mis', 'm'] },
        { say: 'So read whether a question gives you the mass of the water, or the mass of the solution.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$15.0\\ \\text{g}$ of salt is dissolved in $135\\ \\text{g}$ of water. What is the concentration in % (w/w)? Percent by mass, % (w/w), is grams of solute per $100\\ \\text{g}$ of solution.',
          choices: ['$11.1\\%$', '$10.0\\%$', '$0.10\\%$', '$15.0\\%$'],
          answer: 1,
          working: 'The mass of the solution is $15.0 + 135 = 150\\ \\text{g}$, so $\\dfrac{15.0}{150} \\times 100\\% = 10.0\\%$ (w/w).',
        },
      ],
      lines: [
        { say: 'Your turn. Fifteen point zero grams of salt is dissolved in one hundred thirty-five grams of water. What is the concentration, as percent by mass? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The solution has a mass of fifteen plus one hundred thirty-five, or one hundred fifty grams, so the concentration is ten point zero percent. Choice A divides by the mass of the water alone.', show: 'q.answer' },
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
            '% (V/V) is millilitres of solute per $100\\ \\text{mL}$ of solution, measured after mixing.',
            '% (w/w) is grams of solute per $100\\ \\text{g}$ of solution.',
            'The mass of a solution is the mass of the solute plus the mass of the water.',
            'Each percentage is $\\dfrac{\\text{solute}}{\\text{solution}} \\times 100\\%$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Percent by volume is millilitres of solute per one hundred millilitres of solution, measured after mixing.', show: 'sum.0' },
        { say: 'Percent by mass is grams of solute per one hundred grams of solution.', show: 'sum.1' },
        { say: 'The mass of a solution is the mass of the solute plus the mass of the water.', show: 'sum.2' },
        { say: 'And each percentage is the solute over the solution, times one hundred percent. In part three, you will use parts per million. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
