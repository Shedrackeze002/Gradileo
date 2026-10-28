import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hbars, join, room, tag } from './lib/c30-1a-figures.ts';

// Four metals' specific heat capacities, with the unknown metal's value, 0.451, marked across them.
const metals = figure(
  'met',
  [
    join([
      hbars({
        max: 1,
        rows: [
          { label: 'aluminium', value: 0.897 },
          { label: 'iron', value: 0.449, tone: 'theta' },
          { label: 'copper', value: 0.385 },
          { label: 'lead', value: 0.129 },
        ],
        mark: { value: 0.451, tex: '0.451', to: 1 },
      }),
      tag('unit', [0, 0.7], 'c\\ (\\text{J/(g·°C)})', { place: 'above left', tone: 'muted', group: 'axis' }),
      room('space', [-4.4, 0], [7.4, 0]),
    ]),
  ],
  440,
);

const video: Explainer = {
  id: 'c30-1-2-c',
  lessonId: 'c30-1-2',
  title: 'Calorimetry, Part 3: Solving for a Mass, a Heat Capacity or a Temperature',
  thumbnailTitle: 'Solving for m, c or Δt',
  thumbnail: 'met',
  summary:
    'Rearranged, Q = mcΔt gives m = Q/(cΔt), c = Q/(mΔt) and Δt = Q/(mc), with Q in joules. A 50.0 g sample of metal that absorbs 1150 J while warming from 21.0 °C to 72.0 °C has c = 0.451 J/(g·°C), closest to iron. 200.0 g of water at 21.5 °C that absorbs 5.00 kJ warms by 5.97 °C, to 27.5 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 3', title: 'Solving for m, c or Δt', subtitle: 'One equation, four quantities' }],
      lines: [
        { say: 'A lump of unknown metal can be identified without any chemical test at all: weigh it, warm it, and measure the heat it takes in.', show: 'title' },
        { say: 'In this part, you will rearrange Q equals m c delta t, to find a mass, a specific heat capacity or a temperature.', caption: 'In this part, you will rearrange Q = mcΔt, to find a mass, a specific heat capacity or a temperature.' },
      ],
    },
    {
      chapter: 'Rearranging the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['Q = mc\\Delta t', 'm = \\dfrac{Q}{c\\Delta t} \\qquad c = \\dfrac{Q}{m\\Delta t} \\qquad \\Delta t = \\dfrac{Q}{mc}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep Q in joules', md: 'With $c$ in $\\text{J/(g·°C)}$, $Q$ must be in joules. Multiply kilojoules by $1000$ first.' },
      ],
      lines: [
        { say: 'Q equals m c delta t has four quantities. Know any three, and you can find the fourth.', caption: 'Q = mcΔt has four quantities. Know any three, and you can find the fourth.', show: 'm.0' },
        {
          say: 'Divide Q by the other two. The mass is Q over c delta t. The specific heat capacity is Q over m delta t. And the temperature change is Q over m c.',
          caption: 'Divide Q by the other two: m = Q/(cΔt), c = Q/(mΔt) and Δt = Q/(mc).',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Keep Q in joules whenever c is in joules per gram degree Celsius. If Q is given in kilojoules, multiply by one thousand first.', show: 'tip' },
      ],
    },
    {
      chapter: 'Identifying a metal',
      layout: 'split',
      left: [metals],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $50.0\\ \\text{g}$ sample of an unknown metal absorbs $1150\\ \\text{J}$ of heat as it warms from $21.0^\\circ\\text{C}$ to $72.0^\\circ\\text{C}$. Find its specific heat capacity, and identify it.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\Delta t = 72.0 - 21.0 = 51.0^\\circ\\text{C}', 'c = \\dfrac{Q}{m\\Delta t} = \\dfrac{1150}{50.0 \\times 51.0}', 'c = 0.451\\ \\text{J/(g·°C)}: \\text{ iron}'] },
      ],
      lines: [
        {
          say: 'A fifty point zero gram sample of an unknown metal absorbs one thousand one hundred fifty joules of heat, as it warms from twenty-one point zero to seventy-two point zero degrees Celsius. What is the metal?',
          show: 'q',
        },
        { say: 'The temperature change is seventy-two point zero minus twenty-one point zero, or fifty-one point zero degrees.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Then c equals Q over m delta t: one thousand one hundred fifty, divided by fifty point zero times fifty-one point zero.',
          caption: 'Then c = Q/(mΔt): 1150 ÷ (50.0 × 51.0).',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'That is zero point four five one joules per gram degree Celsius.', show: 'm.2', focus: 'm.2' },
        { say: 'Compare it with the table of values. The closest is iron, at zero point four four nine.', show: ['met.axis', 'met.r0', 'met.r1', 'met.r2', 'met.r3', 'met.mark'], focus: ['met.r1', 'met.mark'] },
      ],
    },
    {
      chapter: 'A final temperature',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: '$200.0\\ \\text{g}$ of water at $21.5^\\circ\\text{C}$ absorbs $5.00\\ \\text{kJ}$ of heat. What is its final temperature? Use $c = 4.19\\ \\text{J/(g·°C)}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['Q = 5.00\\ \\text{kJ} = 5000\\ \\text{J}', '\\Delta t = \\dfrac{Q}{mc} = \\dfrac{5000}{200.0 \\times 4.19} = 5.97^\\circ\\text{C}', 't_\\text{final} = 21.5 + 5.97 = 27.47 \\approx 27.5^\\circ\\text{C}'],
        },
      ],
      lines: [
        { say: 'Two hundred point zero grams of water at twenty-one point five degrees Celsius absorbs five point zero zero kilojoules of heat. What is its final temperature?', show: 'q' },
        { say: 'First, change the heat to joules: five thousand joules.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Then delta t equals Q over m c: five thousand, divided by two hundred point zero times four point one nine. The water warms by five point nine seven degrees.',
          caption: 'Then Δt = Q/(mc): 5000 ÷ (200.0 × 4.19). The water warms by 5.97 °C.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'The water gained heat, so add the change to the starting temperature: twenty-one point five plus five point nine seven is twenty-seven point five degrees Celsius, to the nearest tenth.',
          show: 'm.2',
          focus: 'm.2',
        },
        { say: 'If the water had released the heat instead, it would have cooled, and you would subtract.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Some water absorbs $6.28\\ \\text{kJ}$ of heat, and its temperature rises by $12.5^\\circ\\text{C}$. What is the mass of the water? The specific heat capacity of water is $4.19\\ \\text{J/(g·°C)}$.',
          choices: ['$0.120\\ \\text{g}$', '$329\\ \\text{g}$', '$1500\\ \\text{g}$', '$120\\ \\text{g}$'],
          answer: 3,
          working: '$Q = 6280\\ \\text{J}$, so $m = \\dfrac{Q}{c\\Delta t} = \\dfrac{6280}{4.19 \\times 12.5} = 120\\ \\text{g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Some water absorbs six point two eight kilojoules of heat, and its temperature rises by twelve point five degrees Celsius. What is the mass of the water? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is D, one hundred twenty grams. Change the heat to six thousand two hundred eighty joules, then divide by four point one nine times twelve point five. Choice A forgets to change kilojoules to joules.',
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
            '$m = \\dfrac{Q}{c\\Delta t}$, $\\ c = \\dfrac{Q}{m\\Delta t}$, $\\ \\Delta t = \\dfrac{Q}{mc}$, with $Q$ in joules.',
            'A specific heat capacity can identify a metal: $0.451$ is closest to iron.',
            'Add $\\Delta t$ to the starting temperature when heat is gained; subtract it when heat is lost.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rearrange Q equals m c delta t for the quantity you need, and keep Q in joules.', caption: 'Let’s sum up. Rearrange Q = mcΔt for the quantity you need, and keep Q in joules.', show: 'sum.0' },
        { say: 'A specific heat capacity can identify a metal.', show: 'sum.1' },
        {
          say: 'And add the temperature change when heat is gained, or subtract it when heat is lost. In part four, you will put a hot metal into cold water, and see how a calorimeter works. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
