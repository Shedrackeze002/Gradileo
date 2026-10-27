import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { weatherBalloon } from './lib/c20-2b-figures.ts';

// A weather balloon near the ground, and much larger high above it.
const balloon = figure('b', [weatherBalloon({ low: '\\text{near the ground}', high: '\\begin{gathered}\\text{high up: lower}\\\\ \\text{pressure, colder}\\end{gathered}' })], 520);

const video: Explainer = {
  id: 'c20-2-5-d',
  lessonId: 'c20-2-5',
  title: 'The Combined Gas Law, Part 4: Predicting Changes',
  thumbnailTitle: 'Predicting Changes',
  thumbnail: 'b',
  summary:
    'To predict how a gas changes, multiply its volume by the Kelvin temperature factor and divide it by the pressure factor: doubling the pressure and halving the Kelvin temperature multiplies the volume by 1/4. A rising weather balloon grows because the pressure falls by a much larger fraction than its Kelvin temperature. Factors work only in kelvins: warming a gas from 25 °C to 50 °C increases its volume by only about 8%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 4', title: 'Predicting Changes', subtitle: 'Factors, and the Celsius trap' }],
      lines: [
        { say: 'Often you need to know only how a gas changes, not its new value.', show: 'title' },
        { say: 'In this part, you will predict changes with simple factors, settle the weather balloon question, and avoid a common trap with degrees Celsius.' },
      ],
    },
    {
      chapter: 'Changes by factors',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{V_2}{V_1} = \\dfrac{T_2/T_1}{P_2/P_1}'] },
        {
          kind: 'table',
          id: 't',
          head: ['Change', 'Held constant', 'Result'],
          rows: [
            ['pressure tripled', 'temperature', 'volume multiplied by $\\tfrac{1}{3}$'],
            ['Kelvin temperature halved', 'pressure', 'volume multiplied by $\\tfrac{1}{2}$'],
            ['volume cut to a quarter', 'temperature', 'pressure multiplied by $4$'],
            ['Kelvin temperature doubled', 'volume', 'pressure multiplied by $2$'],
            ['amount of gas doubled', 'temperature and pressure', 'volume multiplied by $2$'],
          ],
        },
      ],
      lines: [
        { say: 'From the combined gas law, the volume is multiplied by the factor for the Kelvin temperature, and divided by the factor for the pressure.', show: 'm', focus: 'm' },
        { say: 'With one quantity held constant, this is quick. Triple the pressure at constant temperature, and the volume is multiplied by one third.', show: 't.0', focus: 't.0' },
        { say: 'Halve the Kelvin temperature at constant pressure, and the volume is halved too.', show: 't.1', focus: 't.1' },
        { say: 'Cut the volume to a quarter, and the pressure is multiplied by four. Double the Kelvin temperature in a fixed volume, and the pressure doubles.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'The last row needs one more idea: twice as many gas particles need twice as much room. That is Avogadro’s law, in the next lesson. The combined gas law itself assumes the amount of gas stays the same.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Two changes at once',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'The pressure of a gas is **doubled** and its Kelvin temperature is **halved**. The amount of gas stays the same. What happens to its volume?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{V_2}{V_1} = \\dfrac{T_2/T_1}{P_2/P_1} = \\dfrac{\\tfrac{1}{2}}{2} = \\good{\\tfrac{1}{4}}'] },
      ],
      lines: [
        { say: 'The pressure of a gas is doubled and its Kelvin temperature is halved. What happens to its volume?', show: 'q' },
        { say: 'The temperature factor is one half, and the pressure factor is two. One half divided by two is one quarter. So the volume is multiplied by one quarter.', show: 'm', focus: 'm' },
        { say: 'Both changes shrink the gas: the higher pressure squeezes it, and the lower temperature slows its particles.' },
      ],
    },
    {
      chapter: 'The weather balloon',
      layout: 'split',
      leftWidth: 600,
      left: [balloon],
      right: [
        {
          kind: 'callout',
          id: 'note',
          tone: 'key',
          title: 'Which effect wins?',
          md: 'As the balloon climbs, the pressure around it falls by a **much larger fraction** than its Kelvin temperature does. Dividing by the small pressure factor outweighs multiplying by the temperature factor.',
        },
      ],
      lines: [
        { say: 'Now the weather balloon from part one. As it climbs, the falling pressure lets it swell, and the falling temperature makes it shrink.', show: ['b.ground', 'b.low', 'b.low-label', 'b.rise', 'b.high', 'b.high-label'] },
        { say: 'But the pressure falls by a much larger fraction than the Kelvin temperature does. Dividing by the small pressure factor outweighs multiplying by the temperature factor.', show: 'note' },
        { say: 'So the balloon keeps growing, until it bursts high in the atmosphere.', focus: 'b.high' },
      ],
    },
    {
      chapter: 'The Celsius trap',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'At constant pressure, a gas is warmed from $25^\\circ\\text{C}$ to $50^\\circ\\text{C}$. What happens to its volume?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['T_1 = 25 + 273.15 = 298.15\\ \\text{K}', 'T_2 = 50 + 273.15 = 323.15\\ \\text{K}', '\\dfrac{323.15}{298.15} \\approx 1.084 \\qquad \\text{about } \\good{8\\%} \\text{ larger}'],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Doubling the Celsius temperature', md: 'To double the volume of a gas at $25^\\circ\\text{C}$, its Kelvin temperature must double, from $298.15\\ \\text{K}$ to $596.30\\ \\text{K}$, which is $323.15^\\circ\\text{C}$.' },
      ],
      lines: [
        { say: 'Factors work only with Kelvin temperatures. At constant pressure, a gas is warmed from twenty-five to fifty degrees Celsius. What happens to its volume?', caption: 'Factors work only with Kelvin temperatures. At constant pressure, a gas is warmed from 25°C to 50°C. What happens to its volume?', show: 'q' },
        { say: 'The Celsius temperature doubles, but Charles’s law uses kelvins. In kelvins, the gas goes from two hundred ninety-eight point one five to three hundred twenty-three point one five.', caption: 'The Celsius temperature doubles, but Charles’s law uses kelvins. In kelvins, the gas goes from 298.15 K to 323.15 K.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So the volume is multiplied by about one point zero eight four. It grows by only about eight percent. It does not double.', caption: 'So the volume is multiplied by about 1.084. It grows by only about 8%. It does not double.', show: 'm.2', focus: 'm.2' },
        { say: 'To double the volume, the Kelvin temperature must double, to five hundred ninety-six point three zero kelvins. That is three hundred twenty-three point one five degrees Celsius.', caption: 'To double the volume, the Kelvin temperature must double, to 596.30 K. That is 323.15°C.', show: 'oops', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The pressure of a gas is **tripled** and its Kelvin temperature is **doubled**. The amount of gas stays the same. What happens to its volume?',
          choices: ['It is multiplied by $6$.', 'It is multiplied by $\\tfrac{2}{3}$.', 'It is multiplied by $\\tfrac{3}{2}$.', 'It stays the same.'],
          answer: 1,
          working: '$\\dfrac{V_2}{V_1} = \\dfrac{T_2/T_1}{P_2/P_1} = \\dfrac{2}{3}$: multiply by the temperature factor, $2$, and divide by the pressure factor, $3$.',
        },
      ],
      lines: [
        { say: 'Your turn. The pressure of a gas is tripled and its Kelvin temperature is doubled. The amount of gas stays the same. What happens to its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, two thirds: multiply by the temperature factor, two, and divide by the pressure factor, three. Choice C has the factors the wrong way round.', show: 'q.answer' },
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
            'Multiply the volume by the Kelvin temperature factor and divide it by the pressure factor.',
            'At constant temperature and pressure, the volume is directly proportional to the amount of gas.',
            'Factors work only in kelvins: warming from $25^\\circ\\text{C}$ to $50^\\circ\\text{C}$ increases the volume by only about 8%.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To predict a change, multiply the volume by the Kelvin temperature factor, and divide it by the pressure factor.', show: 'sum.0' },
        { say: 'At constant temperature and pressure, the volume is directly proportional to the amount of gas.', show: 'sum.1' },
        { say: 'And factors work only in kelvins. Next, Avogadro’s law: what happens when the amount of gas changes.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
