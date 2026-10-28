import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { beaker, molecule, tag } from './lib/c20-3a-figures.ts';

// A litre of a dilute solution in water: about a kilogram, a million milligrams, with one
// milligram of solute in it.
const litre = figure(
  'l',
  [
    beaker({ w: 3.4, h: 4.2, level: 3.4, label: '1\\ \\text{L of solution}' }),
    molecule('solute', [{ sym: '', at: [1.7, 1.5], r: 0.16, tone: 'opp', shade: 0.9 }]),
    tag('mg', [1.7, 1.75], '1\\ \\text{mg of solute}', { place: 'above', tone: 'opp', group: 'solute' }),
    tag('kg', [1.7, 4.5], '\\approx 1\\ \\text{kg} = 1\\,000\\,000\\ \\text{mg}', { place: 'above' }),
  ],
  460,
);

const video: Explainer = {
  id: 'c20-3-3-d',
  lessonId: 'c20-3-3',
  title: 'Percent Concentration and Parts per Million, Part 4: Parts per Million in Water',
  thumbnailTitle: 'Parts per Million in Water',
  thumbnail: 'l',
  summary:
    'A litre of a dilute solution in water has a mass of about 1 kg, a million milligrams, so 1 ppm is 1 mg of solute per litre. A 2.4 L sample holding 7.35 mg of nitrate has 3.06 ppm, and a pool of 35,000 L at 1.8 ppm of chlorine holds 63,000 mg, or 63.0 g.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'Parts per Million in Water', subtitle: 'Milligrams per litre' }],
      lines: [
        { say: 'A swimming pool holds tens of thousands of litres of water. How much chlorine is in all of it?', show: 'title' },
        { say: 'In this part, you will use a quick rule for dilute solutions in water, both to find a concentration and to find a mass.' },
      ],
    },
    {
      chapter: 'Milligrams per litre',
      layout: 'split',
      leftWidth: 500,
      left: [litre],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1\\ \\text{L of water} \\approx 1\\ \\text{kg} = 1\\,000\\,000\\ \\text{mg}', '1\\ \\text{mg in } 1\\,000\\,000\\ \\text{mg} = 1\\ \\text{ppm}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Parts per million in water', md: 'For a dilute solution in water, $1\\ \\text{ppm} = 1\\ \\text{mg}$ of solute per litre of solution ($1\\ \\text{mg/kg}$).' },
      ],
      lines: [
        { say: 'A dilute solution in water is almost all water. And a litre of water has a mass of about one kilogram, which is one million milligrams.', show: ['l.glass', 'l.liquid', 'l.label', 'l.kg', 'm.0'], focus: 'm.0' },
        { say: 'So one milligram of solute in a litre of such a solution is one milligram in a million milligrams: one part per million.', show: ['l.solute', 'm.1'], focus: ['m.1', 'l.solute'] },
        { say: 'That gives a much quicker rule. For a dilute solution in water, one part per million is one milligram of solute per litre of solution.', show: 'def' },
      ],
    },
    {
      chapter: 'A water sample',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A $2.4\\ \\text{L}$ water sample contains $7.35\\ \\text{mg}$ of nitrate. What is the concentration of nitrate in parts per million, to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{ppm} = \\text{mg per L}', '\\dfrac{7.35\\ \\text{mg}}{2.4\\ \\text{L}} = 3.0625\\ \\text{ppm}', '\\approx 3.06\\ \\text{ppm}'] },
      ],
      lines: [
        { say: 'Example. A two point four litre water sample contains seven point three five milligrams of nitrate. What is the concentration of nitrate in parts per million, to the nearest hundredth?', show: 'q' },
        { say: 'For a dilute solution in water, parts per million is milligrams per litre.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven point three five milligrams divided by two point four litres is three point zero six two five.', show: 'm.1', focus: 'm.1' },
        { say: 'Rounded, the sample holds three point zero six parts per million of nitrate.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Chlorine in a pool',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A pool holds $35\\,000\\ \\text{L}$ of water with 1.8 ppm of chlorine. What mass of chlorine, in grams, does it contain, to the nearest tenth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1.8\\ \\text{mg/L} \\times 35\\,000\\ \\text{L} = 63\\,000\\ \\text{mg}', '63\\,000\\ \\text{mg} \\div 1000 = 63.0\\ \\text{g}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Milligrams are not grams', md: 'Parts per million times litres gives **milligrams**. Stopping there would report $63\\,000\\ \\text{g}$, a thousand times too much.' },
      ],
      lines: [
        { say: 'The rule also works backwards. Milligrams per litre, times litres, gives milligrams.' },
        { say: 'A pool holds thirty-five thousand litres of water, with one point eight parts per million of chlorine. What mass of chlorine, in grams, does it contain, to the nearest tenth?', show: 'q' },
        { say: 'One point eight parts per million is one point eight milligrams in every litre. One point eight times thirty-five thousand is sixty-three thousand milligrams.', show: 'm.0', focus: 'm.0' },
        { say: 'Change milligrams to grams, using one thousand milligrams in a gram. The pool holds sixty-three point zero grams of chlorine.', show: 'm.1', focus: 'm.1' },
        { say: 'Stopping at the milligrams would report sixty-three thousand grams, a thousand times too much. So divide by one thousand.', show: 'mis' },
      ],
    },
    {
      chapter: 'Limits',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'note', tone: 'key', title: 'Limits are stated in the question', md: 'Health authorities set the highest concentrations they allow for substances such as lead or nitrate in drinking water. The limits differ from place to place and change over time, so a question that compares a sample with a limit **states the limit to use**.' },
      ],
      lines: [
        { say: 'Health authorities set the highest concentrations they allow for substances such as lead or nitrate in drinking water. These limits differ from place to place, and change over time.', show: 'note' },
        { say: 'So this course does not quote them. If a question compares a sample with a limit, it states the limit to use.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $1.5\\ \\text{L}$ water sample contains $0.48\\ \\text{mg}$ of fluoride. What is the concentration of fluoride in parts per million? For a dilute solution in water, $1\\ \\text{ppm} = 1\\ \\text{mg}$ of solute per litre of solution.',
          choices: ['$0.32\\ \\text{ppm}$', '$0.72\\ \\text{ppm}$', '$3.1\\ \\text{ppm}$', '$320\\ \\text{ppm}$'],
          answer: 0,
          working: '$\\dfrac{0.48\\ \\text{mg}}{1.5\\ \\text{L}} = 0.32\\ \\text{ppm}$',
        },
      ],
      lines: [
        { say: 'Your turn. A one point five litre water sample contains zero point four eight milligrams of fluoride. What is the concentration of fluoride in parts per million? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Parts per million is milligrams per litre, and zero point four eight divided by one point five is zero point three two. Choice B multiplies instead of dividing.', show: 'q.answer' },
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
            'For a dilute solution in water, $1\\ \\text{ppm} = 1\\ \\text{mg}$ of solute per litre.',
            'For a water sample, ppm $=$ milligrams $\\div$ litres.',
            'Backwards: $\\text{mg/L} \\times \\text{L} = \\text{mg}$; divide by $1000$ for grams.',
            'A question that compares a sample with a limit states the limit.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a dilute solution in water, one part per million is one milligram of solute per litre.', show: 'sum.0' },
        { say: 'So for a water sample, parts per million is milligrams divided by litres.', show: 'sum.1' },
        { say: 'Backwards, milligrams per litre times litres gives milligrams. Divide by one thousand for grams.', show: 'sum.2' },
        { say: 'And a question that compares a sample with a limit states the limit. That completes this lesson. Next, you will count the solute in moles, and give concentrations in moles per litre.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
