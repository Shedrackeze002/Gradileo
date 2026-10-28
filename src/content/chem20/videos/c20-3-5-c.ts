import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, dotBeaker, tag } from './lib/c20-3b-figures.ts';

// A tenfold dilution: 10.0 mL made up to 100.0 mL, the same solute in ten times the volume.
const tenfold = figure(
  'd',
  [
    dotBeaker({ name: 'b1', at: [0, 0], w: 2.4, h: 5.4, level: 0.5, dots: 6, seed: 2, r: 0.12, label: '10.0\\ \\text{mL}' }),
    arrow('add', [3.0, 2.7], [4.6, 2.7], { label: '\\times 10', tone: 'theta' }),
    dotBeaker({ name: 'b2', at: [5.2, 0], w: 2.4, h: 5.4, level: 5.0, dots: 6, seed: 11, r: 0.12, label: '100.0\\ \\text{mL}' }),
    tag('c1', [1.2, -1.1], '2.00\\ \\text{mol/L}', { place: 'below', tone: 'theta', group: 'conc1' }),
    tag('c2', [6.4, -1.1], '0.200\\ \\text{mol/L}', { place: 'below', tone: 'theta', group: 'conc2' }),
  ],
  440,
);

const video: Explainer = {
  id: 'c20-3-5-c',
  lessonId: 'c20-3-5',
  title: 'Dilution, Part 3: Dilution Factor',
  thumbnailTitle: 'Dilution Factor',
  thumbnail: 'd',
  summary:
    'The dilution factor is the final volume divided by the starting volume, V₂/V₁, and the concentration falls by the same factor, c₁/c₂. Diluting 10.0 mL of a 2.00 mol/L solution to 250.0 mL is a dilution factor of 25, giving 0.0800 mol/L. A tenfold dilution makes the concentration one tenth of what it was.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 3', title: 'Dilution Factor', subtitle: 'How many times the volume grows' }],
      lines: [
        { say: 'Mix one part of fruit-juice concentrate with four parts water, and the drink fills five times the volume of the concentrate. Every sip holds one fifth as much juice.', show: 'title' },
        { say: 'Chemists often describe a dilution the same way: by how many times the volume grows. In this part, you will use the dilution factor.' },
      ],
    },
    {
      chapter: 'The dilution factor',
      layout: 'split',
      leftWidth: 520,
      left: [tenfold],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dilution factor', md: 'The **dilution factor** is the final volume divided by the starting volume. The concentration falls by the same factor:' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{V_2}{V_1} = \\dfrac{c_1}{c_2}'] },
      ],
      lines: [
        { say: 'The dilution factor is the final volume divided by the starting volume: V two over V one.', caption: 'The dilution factor is the final volume divided by the starting volume: V₂/V₁.', show: 'def' },
        { say: 'Here, ten point zero millilitres of solution is made up to one hundred point zero millilitres. The volume grows ten times, so the dilution factor is ten.', caption: 'Here, 10.0 mL of solution is made up to 100.0 mL. The volume grows ten times, so the dilution factor is 10.', show: ['d.b1-glass', 'd.b1-liquid', 'd.b1-solute', 'd.b1-label', 'd.add', 'd.b2-glass', 'd.b2-liquid', 'd.b2-solute', 'd.b2-label'] },
        { say: 'The same solute is spread through ten times the volume, so the concentration falls by the same factor. Two point zero zero moles per litre becomes zero point two zero zero.', caption: 'The same solute is spread through ten times the volume, so the concentration falls by the same factor. 2.00 mol/L becomes 0.200 mol/L.', show: ['d.conc1', 'd.conc2'], focus: ['d.conc1', 'd.conc2'] },
        { say: 'This comes straight from c one V one equals c two V two: V two over V one equals c one over c two.', caption: 'This comes straight from c₁V₁ = c₂V₂: V₂/V₁ = c₁/c₂.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Using a dilution factor',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$10.0\\ \\text{mL}$ of a $2.00\\ \\text{mol/L}$ solution is diluted to $250.0\\ \\text{mL}$. What is the dilution factor, and what is the new concentration?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Dilution factor: } \\dfrac{250.0}{10.0} = 25', 'c_2 = \\dfrac{2.00}{25} = \\good{0.0800\\ \\text{mol/L}}', '\\text{Check: } \\dfrac{c_1V_1}{V_2} = \\dfrac{2.00 \\times 10.0}{250.0} = 0.0800'] },
      ],
      lines: [
        { say: 'Ten point zero millilitres of a two point zero zero moles per litre solution is diluted to two hundred fifty point zero millilitres. What is the dilution factor, and what is the new concentration?', caption: '10.0 mL of a 2.00 mol/L solution is diluted to 250.0 mL. What is the dilution factor, and what is the new concentration?', show: 'q' },
        { say: 'The dilution factor is the final volume over the starting volume. Two hundred fifty over ten is twenty-five.', caption: 'The dilution factor is the final volume over the starting volume. 250.0 over 10.0 is 25.', show: 'm.0', focus: 'm.0' },
        { say: 'The concentration falls by the same factor. Two point zero zero divided by twenty-five is zero point zero eight zero zero moles per litre.', caption: 'The concentration falls by the same factor. 2.00 ÷ 25 = 0.0800 mol/L.', show: 'm.1', focus: 'm.1' },
        { say: 'The dilution equation agrees. Two times ten, over two hundred fifty, is also zero point zero eight.', caption: 'The dilution equation agrees. 2.00 × 10.0, over 250.0, is also 0.0800.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A tenfold dilution',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Starting volume', 'Final volume', 'Dilution factor', 'New concentration'],
          rows: [
            ['$10.0\\ \\text{mL}$', '$100.0\\ \\text{mL}$', '$10$', 'one tenth'],
            ['$25.0\\ \\text{mL}$', '$250.0\\ \\text{mL}$', '$10$', 'one tenth'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the direction', md: 'The final volume is always the larger one, so a dilution factor is always greater than $1$. A factor less than $1$ means a division is upside down.' },
      ],
      lines: [
        { say: 'A tenfold dilution has a dilution factor of ten. Ten point zero millilitres made up to one hundred point zero millilitres is a tenfold dilution.', caption: 'A tenfold dilution has a dilution factor of 10. 10.0 mL made up to 100.0 mL is a tenfold dilution.', show: 't.0' },
        { say: 'So is twenty-five point zero millilitres made up to two hundred fifty point zero. Either way, the concentration becomes one tenth of what it was.', caption: 'So is 25.0 mL made up to 250.0 mL. Either way, the concentration becomes one tenth of what it was.', show: 't.1' },
        { say: 'The final volume is always the larger one, so a dilution factor is always greater than one. If yours comes out less than one, you have divided upside down.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$5.00\\ \\text{mL}$ of a $1.50\\ \\text{mol/L}$ solution is diluted to $100.0\\ \\text{mL}$. What are the dilution factor and the new concentration? The dilution factor is $\\dfrac{V_2}{V_1} = \\dfrac{c_1}{c_2}$.',
          choices: ['$20$; $0.0750\\ \\text{mol/L}$', '$20$; $30.0\\ \\text{mol/L}$', '$0.05$; $0.0750\\ \\text{mol/L}$', '$95$; $0.0158\\ \\text{mol/L}$'],
          answer: 0,
          working: 'Dilution factor: $\\dfrac{100.0}{5.00} = 20$. New concentration: $\\dfrac{1.50}{20} = 0.0750\\ \\text{mol/L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five point zero zero millilitres of a one point five zero moles per litre solution is diluted to one hundred point zero millilitres. What are the dilution factor and the new concentration? Pause the video and try it.', caption: 'Your turn. 5.00 mL of a 1.50 mol/L solution is diluted to 100.0 mL. What are the dilution factor and the new concentration? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One hundred over five is a dilution factor of twenty, and one point five zero divided by twenty is zero point zero seven five zero moles per litre. Choice B multiplies by the factor instead of dividing, but a dilution always lowers the concentration.', caption: 'The answer is A. 100.0 ÷ 5.00 is a dilution factor of 20, and 1.50 ÷ 20 = 0.0750 mol/L. Choice B multiplies by the factor instead of dividing, but a dilution always lowers the concentration.', show: 'q.answer' },
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
            'The dilution factor is the final volume over the starting volume: $\\dfrac{V_2}{V_1}$.',
            'The concentration falls by the same factor: $\\dfrac{V_2}{V_1} = \\dfrac{c_1}{c_2}$.',
            'A tenfold dilution makes the concentration one tenth of what it was.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The dilution factor is the final volume over the starting volume.', show: 'sum.0' },
        { say: 'The concentration falls by the same factor, so V two over V one equals c one over c two.', caption: 'The concentration falls by the same factor, so V₂/V₁ = c₁/c₂.', show: 'sum.1' },
        { say: 'And a tenfold dilution makes the concentration one tenth of what it was. In part four, you will see how a dilution is made in the lab, safely. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
