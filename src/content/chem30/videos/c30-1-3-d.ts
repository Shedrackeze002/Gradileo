import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chain, join, room } from './lib/c30-1a-figures.ts';

// From a mass to an enthalpy change: divide by the molar mass, then multiply by the molar enthalpy.
const steps = figure(
  'ch',
  [
    join([
      chain({
        vertical: true,
        boxes: ['\\text{mass, } m', '\\text{moles, } n', '\\Delta H'],
        arrows: ['\\div M', '\\times \\Delta_r H_m'],
        tones: ['brand', 'brand', 'opp'],
      }),
      room('space', [-2.5, 0], [6.2, 0]),
    ]),
  ],
  520,
);

const video: Explainer = {
  id: 'c30-1-3-d',
  lessonId: 'c30-1-3',
  title: 'Molar Enthalpy, Part 4: Using a Molar Enthalpy',
  thumbnailTitle: 'Using a Molar Enthalpy',
  thumbnail: 'ch',
  summary:
    'Once a molar enthalpy is known, ΔH = nΔrHm gives the enthalpy change for any amount: change a mass to moles first, and keep the sign. Burning 50.0 g of propane (−2043.9 kJ/mol) gives ΔH = −2317 kJ, and melting 100.0 g of ice (+6.01 kJ/mol) gives +33.4 kJ. Working backwards, heating 2.00 L of water from 20.0 °C to 100.0 °C takes 670.4 kJ, or 13.4 g of methane.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 4', title: 'Using a Molar Enthalpy', subtitle: 'From any amount to its energy, and back' }],
      lines: [
        { say: 'How much fuel should a camper pack to boil water for a week of meals? A molar enthalpy can answer that.', show: 'title' },
        { say: 'In this part, you will use a molar enthalpy to find the enthalpy change for any amount, and work backwards to an amount of fuel.' },
      ],
    },
    {
      chapter: 'From moles to energy',
      layout: 'split',
      left: [steps],
      right: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\Delta H = n\\,\\Delta_r H_m'] },
        { kind: 'text', id: 't', size: 'md', md: 'Change a mass to moles first, $n = \\dfrac{m}{M}$, and keep the sign of the molar enthalpy.' },
      ],
      lines: [
        {
          say: 'Once a molar enthalpy is known, the enthalpy change for any amount follows: delta H equals n, times the molar enthalpy.',
          caption: 'Once a molar enthalpy is known, the enthalpy change for any amount follows: ΔH = nΔrHm.',
          show: 'm',
        },
        { say: 'Given a mass, change it to moles first, by dividing by the molar mass.', show: ['ch.b0', 'ch.a0', 'ch.b1', 't'] },
        { say: 'Then multiply by the molar enthalpy, and keep its sign.', show: ['ch.a1', 'ch.b2'] },
      ],
    },
    {
      chapter: 'Burning propane',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'The molar enthalpy of combustion of propane, $\\ce{C3H8}$, is $-2043.9\\ \\text{kJ/mol}$ (water vapour formed). What is the enthalpy change when $50.0\\ \\text{g}$ of propane burns? $M(\\ce{C3H8}) = 44.11\\ \\text{g/mol}$.',
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{50.0}{44.11} = 1.1335\\ \\text{mol}', '\\Delta H = 1.1335 \\times (-2043.9) = -2317\\ \\text{kJ}'] },
      ],
      lines: [
        {
          say: 'The molar enthalpy of combustion of propane is negative two thousand forty-three point nine kilojoules per mole. What is the enthalpy change when fifty point zero grams burns?',
          caption: 'The molar enthalpy of combustion of propane is −2043.9 kJ/mol. What is the enthalpy change when 50.0 g burns?',
          show: 'q',
        },
        { say: 'Moles first: fifty point zero, over forty-four point one one grams per mole, is one point one three three five moles.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Then delta H is one point one three three five, times negative two thousand forty-three point nine: negative two thousand three hundred seventeen kilojoules. That much energy is released.',
          caption: 'Then ΔH = 1.1335 × (−2043.9) = −2317 kJ. That much energy is released.',
          show: 'm.1',
          focus: 'm.1',
        },
      ],
    },
    {
      chapter: 'Melting ice',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'The molar enthalpy of fusion of ice is $+6.01\\ \\text{kJ/mol}$. What is the enthalpy change when $100.0\\ \\text{g}$ of ice melts? $M(\\ce{H2O}) = 18.02\\ \\text{g/mol}$.',
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['n = \\dfrac{100.0}{18.02} = 5.5494\\ \\text{mol}', '\\Delta H = 5.5494 \\times (+6.01) = +33.35 \\approx +33.4\\ \\text{kJ}'] },
      ],
      lines: [
        {
          say: 'The same rule works for a change of state. The molar enthalpy of fusion of ice is positive six point zero one kilojoules per mole. What is delta H when one hundred point zero grams of ice melts?',
          caption: 'The same rule works for a change of state. The molar enthalpy of fusion of ice is +6.01 kJ/mol. What is ΔH when 100.0 g of ice melts?',
          show: 'q',
        },
        { say: 'One hundred point zero grams, over eighteen point zero two grams per mole, is five point five four nine four moles.', show: 'm.0', focus: 'm.0' },
        { say: 'Times positive six point zero one gives positive thirty-three point four kilojoules. Melting absorbs energy, so the sign stays positive.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'How much fuel?',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'What mass of methane must burn to heat $2.00\\ \\text{L}$ of water ($1.00\\ \\text{kg/L}$) from $20.0^\\circ\\text{C}$ to $100.0^\\circ\\text{C}$, if all the heat goes into the water? $\\Delta_c H_m(\\ce{CH4}) = -802.5\\ \\text{kJ/mol}$, $c = 4.19\\ \\text{J/(g·°C)}$, $M(\\ce{CH4}) = 16.05\\ \\text{g/mol}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['Q = 2000 \\times 4.19 \\times 80.0 = 670\\,400\\ \\text{J} = 670.4\\ \\text{kJ}', 'n = \\dfrac{670.4\\ \\text{kJ}}{802.5\\ \\text{kJ/mol}} = 0.8354\\ \\text{mol}', 'm = nM = 0.8354 \\times 16.05 = 13.41 \\approx 13.4\\ \\text{g}'],
        },
      ],
      lines: [
        {
          say: 'Now work backwards. What mass of methane must burn to heat two point zero zero litres of water from twenty point zero to one hundred point zero degrees Celsius, if all the heat goes into the water?',
          show: 'q',
        },
        {
          say: 'First, the heat the water needs. Two litres of water is two thousand grams, so Q is two thousand, times four point one nine, times eighty point zero: six hundred seventy point four kilojoules.',
          caption: 'First, the heat the water needs. 2.00 L of water is 2000 g, so Q = 2000 × 4.19 × 80.0 = 670.4 kJ.',
          show: 'm.0',
          focus: 'm.0',
        },
        {
          say: 'The methane must release that much. Divide by the size of its molar enthalpy, eight hundred two point five kilojoules per mole: zero point eight three five four moles.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'Then the mass is n times M: zero point eight three five four, times sixteen point zero five, is about thirteen point four grams of methane.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The molar enthalpy of combustion of ethanol, $\\ce{C2H5OH}$, is $-1366.8\\ \\text{kJ/mol}$. What is the enthalpy change when $23.0\\ \\text{g}$ of ethanol burns? $M(\\ce{C2H5OH}) = 46.08\\ \\text{g/mol}$.',
          choices: ['$+682\\ \\text{kJ}$', '$-31\\,436\\ \\text{kJ}$', '$-29.7\\ \\text{kJ}$', '$-682\\ \\text{kJ}$'],
          answer: 3,
          working: '$n = \\dfrac{23.0}{46.08} = 0.4991\\ \\text{mol}$, so $\\Delta H = 0.4991 \\times (-1366.8) = -682\\ \\text{kJ}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. The molar enthalpy of combustion of ethanol is negative one thousand three hundred sixty-six point eight kilojoules per mole. What is the enthalpy change when twenty-three point zero grams burns? Pause the video and try it.',
          caption: 'Your turn. The molar enthalpy of combustion of ethanol is −1366.8 kJ/mol. What is the enthalpy change when 23.0 g burns? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is D, negative six hundred eighty-two kilojoules. Twenty-three point zero grams is zero point four nine nine one moles, and the sign stays negative. Choice B multiplies by the mass instead of the moles.',
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
            '$\\Delta H = n\\,\\Delta_r H_m$: the amount in moles times the molar enthalpy.',
            'Change a mass to moles first, $n = \\dfrac{m}{M}$, and keep the sign.',
            'Backwards: energy needed → moles of fuel → mass of fuel.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Delta H equals the amount in moles, times the molar enthalpy.', caption: 'Let’s sum up. ΔH equals the amount in moles, times the molar enthalpy.', show: 'sum.0' },
        { say: 'Change a mass to moles first, and keep the sign.', show: 'sum.1' },
        { say: 'And backwards: from the energy needed, to moles of fuel, to its mass. That completes this lesson. Next, you will see the four ways chemists write an energy change.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
