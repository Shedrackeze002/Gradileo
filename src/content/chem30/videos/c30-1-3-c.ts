import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bomb, burnerCan, join, room } from './lib/c30-1a-figures.ts';

// A bomb calorimeter, with its parts named.
const calorimeter = figure(
  'bomb',
  [
    join([
      bomb({
        labels: {
          wires: '\\text{ignition wires}',
          thermometer: '\\text{thermometer}',
          bomb: '\\text{steel bomb}',
          water: '\\text{water}',
          sample: '\\text{sample}',
          jacket: '\\text{insulated jacket}',
        },
      }),
      room('space', [-4.2, 0], [10.4, 9.6]),
    ]),
  ],
  560,
);

// A burner under a can of water: much of the heat escapes to the air.
const burner = figure(
  'burn',
  [join([burnerCan({ labels: { thermometer: '\\text{thermometer}', can: '\\text{can of water}', flame: '\\text{flame}', burner: '\\text{burner}', loss: '\\begin{gathered}\\text{heat lost}\\\\ \\text{to the air}\\end{gathered}' } }), room('space', [-7.4, 0], [8.4, 7.9])])],
  500,
);

const video: Explainer = {
  id: 'c30-1-3-c',
  lessonId: 'c30-1-3',
  title: 'Molar Enthalpy, Part 3: The Bomb Calorimeter',
  thumbnailTitle: 'The Bomb Calorimeter',
  thumbnail: 'bomb',
  summary:
    'Combustion is studied in a bomb calorimeter, a sealed steel bomb filled with oxygen in a bucket of water inside an insulated jacket, whose whole instrument has one heat capacity, C, so Q = CΔt. Burning 1.200 g of glucose raises a 9.25 kJ/°C calorimeter by 2.02 °C: Q = 18.69 kJ and n = 0.006660 mol, so the molar enthalpy of combustion is −2806 kJ/mol. A burner under a can of water loses much of its heat to the air.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 3', title: 'The Bomb Calorimeter', subtitle: 'Burning a sample under water' }],
      lines: [
        { say: 'How much energy is in a spoonful of sugar? To find out, chemists burn it completely, sealed inside a steel container under water.', show: 'title' },
        { say: 'In this part, you will see how a bomb calorimeter works, and use it to find a molar enthalpy of combustion.' },
      ],
    },
    {
      chapter: 'Inside a bomb calorimeter',
      layout: 'split',
      leftWidth: 620,
      left: [calorimeter],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Heat capacity', md: 'The bomb, the bucket and the water warm together, so the calorimeter has one **heat capacity**, $C$, in $\\text{kJ/°C}$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['Q = C\\Delta t'] },
      ],
      lines: [
        {
          say: 'Combustion is studied in a bomb calorimeter. The bomb is a sealed steel container, filled with oxygen, with the sample inside.',
          show: ['bomb.bomb', 'bomb.bomb-tag', 'bomb.sample', 'bomb.sample-tag'],
        },
        {
          say: 'It sits in a bucket of water, inside an insulated jacket. The sample is ignited electrically, and the temperature is measured.',
          show: ['bomb.bucket', 'bomb.water-tag', 'bomb.jacket', 'bomb.jacket-tag', 'bomb.wires', 'bomb.wires-tag', 'bomb.thermometer', 'bomb.thermometer-tag'],
        },
        {
          say: 'The steel bomb, the bucket and the water all warm together. So the whole calorimeter is described by one heat capacity, capital C, in kilojoules per degree Celsius, found beforehand by burning a sample with a known energy.',
          caption: 'The steel bomb, the bucket and the water all warm together. So the whole calorimeter is described by one heat capacity, C, in kJ/°C, found beforehand by burning a sample with a known energy.',
          show: 'def',
        },
        { say: 'Then the heat is simply Q equals C delta t.', caption: 'Then the heat is simply Q = CΔt.', show: 'm' },
      ],
    },
    {
      chapter: 'Burning glucose',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A $1.200\\ \\text{g}$ sample of glucose, $\\ce{C6H12O6}$, burns in a bomb calorimeter with $C = 9.25\\ \\text{kJ/°C}$. The temperature rises by $2.02^\\circ\\text{C}$. Find the molar enthalpy of combustion. $M(\\ce{C6H12O6}) = 180.18\\ \\text{g/mol}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['Q = C\\Delta t = 9.25 \\times 2.02 = 18.69\\ \\text{kJ}', 'n = \\dfrac{1.200}{180.18} = 0.006660\\ \\text{mol}', '\\Delta_c H_m = \\dfrac{-18.69\\ \\text{kJ}}{0.006660\\ \\text{mol}} = -2806\\ \\text{kJ/mol}'],
        },
      ],
      lines: [
        {
          say: 'A one point two zero zero gram sample of glucose burns in a bomb calorimeter, whose heat capacity is nine point two five kilojoules per degree Celsius. The temperature rises by two point zero two degrees.',
          show: 'q',
        },
        { say: 'Heat: nine point two five times two point zero two is eighteen point six nine kilojoules.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Amount: one point two zero zero grams, over one hundred eighty point one eight grams per mole, is zero point zero zero six six six zero moles.',
          show: 'm.1',
          focus: 'm.1',
        },
        {
          say: 'The calorimeter warmed, so delta H is negative. Divide: the molar enthalpy of combustion of glucose is negative two thousand eight hundred six kilojoules per mole.',
          caption: 'The calorimeter warmed, so ΔH is negative. Divide: the molar enthalpy of combustion of glucose is −2806 kJ/mol.',
          show: 'm.2',
          focus: 'm.2',
        },
      ],
    },
    {
      chapter: 'A simple calorimeter for fuels',
      layout: 'split',
      leftWidth: 600,
      left: [burner],
      right: [{ kind: 'callout', id: 'note', tone: 'key', title: 'A burner under a can', md: 'Quick and simple, but much of the heat of the flame warms the **air**, so the molar enthalpy found is usually far **smaller in size** than the bomb calorimeter value.' }],
      lines: [
        { say: 'A fuel can also be burned in a small burner under a metal can of water. This is quick and simple.', show: ['burn.burner', 'burn.burner-tag', 'burn.flame', 'burn.flame-tag', 'burn.can', 'burn.can-tag', 'burn.thermometer', 'burn.thermometer-tag'] },
        { say: 'But much of the heat of the flame warms the air instead of the water.', show: 'burn.loss', focus: 'burn.loss' },
        { say: 'So the molar enthalpy found this way is usually far smaller in size than the bomb calorimeter value.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $0.800\\ \\text{g}$ sample of methanol, $\\ce{CH3OH}$, burns in a bomb calorimeter with $C = 10.50\\ \\text{kJ/°C}$. The temperature rises by $1.73^\\circ\\text{C}$. What is the molar enthalpy of combustion of methanol? $M(\\ce{CH3OH}) = 32.05\\ \\text{g/mol}$.',
          choices: ['$-728\\ \\text{kJ/mol}$', '$+728\\ \\text{kJ/mol}$', '$-22.7\\ \\text{kJ/mol}$', '$-0.453\\ \\text{kJ/mol}$'],
          answer: 0,
          working: '$Q = 10.50 \\times 1.73 = 18.17\\ \\text{kJ}$ and $n = \\dfrac{0.800}{32.05} = 0.02496\\ \\text{mol}$, so $\\Delta_c H_m = \\dfrac{-18.17}{0.02496} = -728\\ \\text{kJ/mol}$.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A zero point eight zero zero gram sample of methanol burns in a bomb calorimeter with a heat capacity of ten point five zero kilojoules per degree Celsius. The temperature rises by one point seven three degrees. Find the molar enthalpy of combustion. Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A. Q is ten point five zero times one point seven three, about eighteen point one seven kilojoules, and n is zero point zero two four nine six moles. Burning releases energy, so the answer is negative. Choice C divides by the mass instead of the moles.',
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
            'A bomb calorimeter has one heat capacity, $C$, for the whole instrument: $Q = C\\Delta t$.',
            'Glucose: $Q = 18.69\\ \\text{kJ}$, $n = 0.006660\\ \\text{mol}$, $\\Delta_c H_m = -2806\\ \\text{kJ/mol}$.',
            'A burner under a can loses much of its heat to the air, so its value is too small in size.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A bomb calorimeter has one heat capacity for the whole instrument, so Q equals C delta t.', caption: 'Let’s sum up. A bomb calorimeter has one heat capacity for the whole instrument, so Q = CΔt.', show: 'sum.0' },
        { say: 'Burning glucose gave a molar enthalpy of combustion of negative two thousand eight hundred six kilojoules per mole.', caption: 'Burning glucose gave a molar enthalpy of combustion of −2806 kJ/mol.', show: 'sum.1' },
        { say: 'And a burner under a can loses much of its heat to the air. In part four, you will use a molar enthalpy to find the energy of any amount. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
