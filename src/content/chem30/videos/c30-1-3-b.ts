import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, beaker, cup, tag } from './lib/c30-1a-figures.ts';

// 50.0 mL of acid and 50.0 mL of base make 100.0 mL, or 100.0 g, of solution in the calorimeter.
const mixing = figure(
  'mix',
  [
    beaker({ name: 'acid', at: [0, 0], w: 2.0, tone: 'hyp', label: '\\ce{HCl}', sub: '50.0\\ \\text{mL}' }),
    tag('plus', [3.4, 1.5], '+', { group: 'acid' }),
    beaker({ name: 'base', at: [4.8, 0], w: 2.0, tone: 'adj', label: '\\ce{NaOH}', sub: '50.0\\ \\text{mL}' }),
    arrow('pour', [7.3, 1.5], [8.5, 1.5], { tone: 'theta', group: 'base' }),
    cup({ name: 'cup', at: [11.3, 0], tone: 'brand', reading: 4.2, stirrer: false }),
    tag('total', [11.3, -0.4], '100.0\\ \\text{g}', { place: 'below', group: 'cup-cups' }),
  ],
  420,
);

const video: Explainer = {
  id: 'c30-1-3-b',
  lessonId: 'c30-1-3',
  title: 'Molar Enthalpy, Part 2: Neutralisation and the Sign of ΔH',
  thumbnailTitle: 'Neutralisation and the Sign of ΔH',
  thumbnail: 'mix',
  summary:
    'For a reaction between two solutions, the mass of water is the total volume times 1.00 g/mL. Mixing 50.0 mL each of 1.00 mol/L hydrochloric acid and sodium hydroxide raises 100.0 g of solution from 21.0 °C to 27.7 °C: Q = 2.807 kJ and n(HCl) = 0.0500 mol, so the molar enthalpy of neutralisation is −56.1 kJ/mol. Q is always positive; the sign of ΔH comes from what the water did.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 2', title: 'Neutralisation and the Sign of ΔH', subtitle: 'Read the thermometer before you divide' }],
      lines: [
        { say: 'Mix hydrochloric acid with sodium hydroxide solution, and the mixture warms up. How much energy does each mole of acid release?', show: 'title' },
        { say: 'In this part, you will find that molar enthalpy of neutralisation from calorimetry data, and give it the right sign.' },
      ],
    },
    {
      chapter: 'Two solutions, one mass',
      layout: 'split',
      left: [mixing],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A dilute solution is assumed to have the density ($1.00\\ \\text{g/mL}$) and the specific heat capacity of water.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 50.0 + 50.0 = 100.0\\ \\text{mL}', 'm = 100.0\\ \\text{mL} \\times 1.00\\ \\text{g/mL}', 'm = 100.0\\ \\text{g}'] },
      ],
      lines: [
        { say: 'For a reaction between two solutions, the mass of water is the total volume of the mixture, times its density.', show: ['mix.acid', 'mix.base'] },
        { say: 'A dilute solution is assumed to have the density, one point zero zero grams per millilitre, and the specific heat capacity of water.', show: 't' },
        {
          say: 'So fifty point zero millilitres of acid and fifty point zero millilitres of base make one hundred point zero grams of solution.',
          show: ['mix.cup-cups', 'mix.cup-liquid', 'mix.cup-lid', 'mix.cup-thermometer', 'm'],
          focus: ['mix.total', 'm'],
        },
      ],
    },
    {
      chapter: 'Neutralisation',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: '$50.0\\ \\text{mL}$ of $1.00\\ \\text{mol/L}$ $\\ce{HCl(aq)}$ and $50.0\\ \\text{mL}$ of $1.00\\ \\text{mol/L}$ $\\ce{NaOH(aq)}$, both at $21.0^\\circ\\text{C}$, are mixed in a polystyrene cup. The highest temperature is $27.7^\\circ\\text{C}$. Find the molar enthalpy of neutralisation of the acid. $c = 4.19\\ \\text{J/(g·°C)}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\ce{HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l)}',
            'Q = 100.0 \\times 4.19 \\times 6.7 = 2807\\ \\text{J} = 2.807\\ \\text{kJ}',
            'n(\\ce{HCl}) = 1.00\\ \\text{mol/L} \\times 0.0500\\ \\text{L} = 0.0500\\ \\text{mol}',
            '\\Delta_r H_m = \\dfrac{-2.807\\ \\text{kJ}}{0.0500\\ \\text{mol}} = -56.1\\ \\text{kJ/mol}',
          ],
        },
      ],
      lines: [
        {
          say: 'Fifty point zero millilitres of one point zero zero moles per litre hydrochloric acid, and fifty point zero millilitres of one point zero zero moles per litre sodium hydroxide, both at twenty-one point zero degrees Celsius, are mixed.',
          show: ['q', 'm.0'],
        },
        { say: 'The highest temperature reached is twenty-seven point seven degrees. Find the molar enthalpy of neutralisation of the acid.' },
        {
          say: 'The mass is one hundred point zero grams, and the temperature rises by six point seven degrees. So Q is two thousand eight hundred seven joules, or two point eight zero seven kilojoules.',
          caption: 'The mass is 100.0 g, and the temperature rises by 6.7 °C. So Q = 2807 J, or 2.807 kJ.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'The amount of acid is one point zero zero moles per litre, times zero point zero five zero zero litres: zero point zero five zero zero moles.',
          show: 'm.2',
          focus: 'm.2',
        },
        {
          say: 'The mixture warmed, so the reaction released energy, and delta H is negative. Divide: negative fifty-six point one kilojoules per mole. Exothermic.',
          caption: 'The mixture warmed, so the reaction released energy, and ΔH is negative. Divide: −56.1 kJ/mol. Exothermic.',
          show: 'm.3',
          focus: 'm.3',
        },
      ],
    },
    {
      chapter: 'The sign comes from the water',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'mis',
          tone: 'mistake',
          title: 'The sign comes from the water',
          md: '$Q$ is a positive number. A **rise** in the water’s temperature means the reaction released energy, so $\\Delta H$ is **negative**; a fall means $\\Delta H$ is positive.',
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{{+56.1}\\ \\text{kJ/mol}} \\qquad \\good{{-56.1}\\ \\text{kJ/mol}}'] },
      ],
      lines: [
        {
          say: 'Here is the trap. Q, from m c delta t, is a positive number. The sign of delta H comes from what the water did: a rise in temperature means energy was released, so delta H is negative.',
          caption: 'Here is the trap. Q, from mcΔt, is a positive number. The sign of ΔH comes from what the water did: a rise in temperature means energy was released, so ΔH is negative.',
          show: 'mis',
        },
        { say: 'Reporting positive fifty-six point one kilojoules per mole would claim that this neutralisation absorbs energy, while the thermometer showed the opposite.', show: 'm' },
        { say: 'So before you divide, ask one question: did the water warm up, or cool down?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$40.0\\ \\text{mL}$ of $1.50\\ \\text{mol/L}$ $\\ce{HCl(aq)}$ and $40.0\\ \\text{mL}$ of $1.50\\ \\text{mol/L}$ $\\ce{NaOH(aq)}$ are mixed in a polystyrene cup. The temperature rises from $20.5^\\circ\\text{C}$ to $30.7^\\circ\\text{C}$. What is the molar enthalpy of neutralisation of the acid? Use $1.00\\ \\text{g/mL}$ and $4.19\\ \\text{J/(g·°C)}$.',
          choices: ['$-57.0\\ \\text{kJ/mol}$', '$+57.0\\ \\text{kJ/mol}$', '$-28.5\\ \\text{kJ/mol}$', '$-0.0570\\ \\text{kJ/mol}$'],
          answer: 0,
          working: '$Q = 80.0 \\times 4.19 \\times 10.2 = 3419\\ \\text{J} = 3.419\\ \\text{kJ}$ and $n(\\ce{HCl}) = 1.50 \\times 0.0400 = 0.0600\\ \\text{mol}$. The water warmed, so $\\Delta_r H_m = \\dfrac{-3.419}{0.0600} = -57.0\\ \\text{kJ/mol}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. Forty point zero millilitres each of one point five zero moles per litre hydrochloric acid and sodium hydroxide are mixed, and the temperature rises from twenty point five to thirty point seven degrees Celsius. Find the molar enthalpy of neutralisation. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A. Eighty point zero grams warm by ten point two degrees, so Q is three point four one nine kilojoules, and the acid is zero point zero six zero zero moles. The water warmed, so the answer is negative. Choice C divides by the moles of acid and base together.',
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
            'Two solutions: the mass of water is the total volume × $1.00\\ \\text{g/mL}$.',
            'Neutralisation of $\\ce{HCl}$: $Q = 2.807\\ \\text{kJ}$, $n = 0.0500\\ \\text{mol}$, $\\Delta_r H_m = -56.1\\ \\text{kJ/mol}$.',
            '$Q$ is positive; the sign of $\\Delta H$ comes from the water: warmed means negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For two solutions, the mass of water is the total volume, times one point zero zero grams per millilitre.', show: 'sum.0' },
        { say: 'The neutralisation of hydrochloric acid released fifty-six point one kilojoules per mole.', show: 'sum.1' },
        {
          say: 'And the sign of delta H comes from the water: if it warmed, delta H is negative. In part three, you will burn fuels in a bomb calorimeter. See you there!',
          caption: 'And the sign of ΔH comes from the water: if it warmed, ΔH is negative. In part three, you will burn fuels in a bomb calorimeter. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
