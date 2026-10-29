import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pan } from './lib/c30-1a-figures.ts';

// An aluminium saucepan and the water in it, both warming from 18.0 °C to 100.0 °C.
const saucepan = figure('pan', [pan({ water: '\\begin{gathered}\\text{water}\\\\ 1200\\ \\text{g}\\end{gathered}', metal: '\\text{aluminium: } 500\\ \\text{g}', top: '\\text{both: } \\Delta t = 82.0^\\circ\\text{C}' })], 460);

const video: Explainer = {
  id: 'c30-1-2-b',
  lessonId: 'c30-1-2',
  title: 'Calorimetry, Part 2: Heat Lost, Units and Containers',
  thumbnailTitle: 'Heat Lost, Units and Containers',
  thumbnail: 'pan',
  summary:
    'A 1.50 kg iron block that cools from 85.0 °C to 22.0 °C loses 1500 × 0.449 × 63.0 = 42 430.5 J, or 42.4 kJ: the mass must be in grams, and a fall in temperature means heat was lost. A volume of water becomes a mass through its density, 1.00 g/mL. When a saucepan warms with the water in it, find Q for each and add them: about 449 kJ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Thermochemical Changes · Part 2', title: 'Heat Lost, Units and Containers', subtitle: 'Using Q = mcΔt with care' }],
      lines: [
        { say: 'A hot iron block cools on a bench. A saucepan of water heats on a stove. The same equation tells you how much heat moved in each.', show: 'title' },
        { say: 'In this part, you will find heat that is lost, change units first, and add the heat taken in by a container and its water.' },
      ],
    },
    {
      chapter: 'A block that cools',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'A $1.50\\ \\text{kg}$ iron block cools from $85.0^\\circ\\text{C}$ to $22.0^\\circ\\text{C}$. How much heat does it lose, in kilojoules? Use $c = 0.449\\ \\text{J/(g·°C)}$ for iron.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            'm = 1.50\\ \\text{kg} = 1500\\ \\text{g}',
            '\\Delta t = 22.0 - 85.0 = -63.0^\\circ\\text{C}',
            'Q = 1500 \\times 0.449 \\times 63.0 = 42\\,430.5\\ \\text{J}',
            'Q \\approx 42.4\\ \\text{kJ, lost}',
          ],
        },
      ],
      lines: [
        {
          say: 'A one point five zero kilogram iron block cools from eighty-five point zero to twenty-two point zero degrees Celsius. How much heat does it lose?',
          show: 'q',
        },
        { say: 'The specific heat capacity is per gram, so change the mass to one thousand five hundred grams.', show: 'm.0', focus: 'm.0' },
        { say: 'The temperature changes by negative sixty-three point zero degrees: the block cooled, so it lost heat.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Use the size of the change. One thousand five hundred, times zero point four four nine, times sixty-three point zero, is forty-two thousand, four hundred thirty point five joules.',
          caption: 'Use the size of the change. 1500 × 0.449 × 63.0 = 42 430.5 J.',
          show: 'm.2',
          focus: 'm.2',
        },
        { say: 'That is forty-two point four kilojoules, lost by the block.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Grams, not kilograms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Grams, not kilograms', md: '$c$ is per **gram**. Putting $1.50$ for the iron block gives $42.4\\ \\text{J}$: a thousand times too small.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A volume of water', md: 'A volume of water or of a dilute solution becomes a mass through its density, $1.00\\ \\text{g/mL}$: $250.0\\ \\text{mL}$ of water has a mass of $250.0\\ \\text{g}$.' },
      ],
      lines: [
        { say: 'Here is a common mistake: putting in the mass in kilograms gives forty-two point four joules, a thousand times too small.', show: 'mis' },
        { say: 'If you are given a volume of water, or of a dilute solution, change it to a mass with its density: one point zero zero grams per millilitre.', show: 'tip' },
        { say: 'So two hundred fifty point zero millilitres has a mass of two hundred fifty point zero grams.' },
      ],
    },
    {
      chapter: 'A saucepan of water',
      layout: 'split',
      leftWidth: 440,
      left: [saucepan],
      right: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          md: 'A $0.500\\ \\text{kg}$ aluminium saucepan holds $1.20\\ \\text{L}$ of water at $18.0^\\circ\\text{C}$. How much heat brings both to $100.0^\\circ\\text{C}$? $c$: aluminium $0.897$, water $4.19\\ \\text{J/(g·°C)}$. Water: $1.00\\ \\text{kg/L}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\Delta t = 100.0 - 18.0 = 82.0^\\circ\\text{C}',
            '\\text{Al: } 500 \\times 0.897 \\times 82.0 = 36\\,777\\ \\text{J}',
            '\\text{water: } 1200 \\times 4.19 \\times 82.0 = 412\\,296\\ \\text{J}',
            '\\text{total: } 449\\,073\\ \\text{J} \\approx 449\\ \\text{kJ}',
          ],
        },
      ],
      lines: [
        { say: 'When a container warms with the water inside it, each absorbs its own share of heat: find Q for each, and add them.', show: 'pan.pan' },
        {
          say: 'A zero point five zero zero kilogram aluminium saucepan holds one point two zero litres of water at eighteen point zero degrees Celsius. How much heat brings both to one hundred point zero degrees?',
          show: ['q', 'pan.water', 'pan.flame'],
        },
        {
          say: 'Both warm by eighty-two point zero degrees. The masses are five hundred grams of aluminium and one thousand two hundred grams of water.',
          show: ['m.0', 'pan.top'],
          focus: ['m.0', 'pan.top'],
        },
        { say: 'The aluminium takes five hundred, times zero point eight nine seven, times eighty-two point zero: thirty-six thousand, seven hundred seventy-seven joules.', caption: 'The aluminium takes 500 × 0.897 × 82.0 = 36 777 J.', show: 'm.1', focus: ['m.1', 'pan.pan'] },
        { say: 'The water takes one thousand two hundred, times four point one nine, times eighty-two point zero: four hundred twelve thousand, two hundred ninety-six joules.', caption: 'The water takes 1200 × 4.19 × 82.0 = 412 296 J.', show: 'm.2', focus: ['m.2', 'pan.water'] },
        { say: 'Together, that is about four hundred forty-nine kilojoules, and more than nine tenths of it goes into the water.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The temperature of $300.0\\ \\text{mL}$ of water falls from $65.0^\\circ\\text{C}$ to $25.0^\\circ\\text{C}$. How much heat does it gain or lose? The density of water is $1.00\\ \\text{g/mL}$ and its specific heat capacity is $4.19\\ \\text{J/(g·°C)}$.',
          choices: ['$50.3\\ \\text{kJ}$ lost', '$50.3\\ \\text{kJ}$ gained', '$50.3\\ \\text{J}$ lost', '$12.0\\ \\text{kJ}$ lost'],
          answer: 0,
          working: '$m = 300.0\\ \\text{g}$ and $\\Delta t = 25.0 - 65.0 = -40.0^\\circ\\text{C}$. $Q = 300.0 \\times 4.19 \\times 40.0 = 50\\,280\\ \\text{J} \\approx 50.3\\ \\text{kJ}$, lost, since the water cooled.',
        },
      ],
      lines: [
        {
          say: 'Your turn. The temperature of three hundred point zero millilitres of water falls from sixty-five point zero to twenty-five point zero degrees Celsius. How much heat does it gain or lose? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is A. Three hundred millilitres is three hundred grams, so Q is three hundred, times four point one nine, times forty: about fifty point three kilojoules. The water cooled, so the heat was lost.',
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
            'Change kilograms to grams, and a volume of water to a mass with $1.00\\ \\text{g/mL}$.',
            'Use the size of $\\Delta t$ in $Q = mc\\Delta t$; its sign says whether heat was gained or lost.',
            'A container and the water in it each absorb heat: find $Q$ for each, and add.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Change kilograms to grams, and a volume of water to a mass.', show: 'sum.0' },
        { say: 'Use the size of delta t in the equation. Its sign tells you whether heat was gained or lost.', caption: 'Use the size of Δt in the equation. Its sign tells you whether heat was gained or lost.', show: 'sum.1' },
        { say: 'And when a container warms with the water in it, find Q for each, and add. In part three, you will turn the equation around. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
