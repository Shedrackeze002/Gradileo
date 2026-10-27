import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { kelvinGraph } from './lib/c20-2a-figures.ts';

// Kelvin against Celsius temperature: a line of slope 1 that meets 0 K at −273.15 °C.
const scales = figure('k', [kelvinGraph()]);

const video: Explainer = {
  id: 'c20-2-2-d',
  lessonId: 'c20-2-2',
  title: 'Pressure and Temperature, Part 4: Absolute Zero and the Kelvin Scale',
  thumbnailTitle: 'Absolute Zero and Kelvins',
  thumbnail: 'k',
  summary:
    'Absolute zero, 0 K or −273.15 °C, is the lowest temperature possible. The Kelvin scale starts there: T(K) = T(°C) + 273.15, with no degree sign and no negative values. The average kinetic energy of gas particles is proportional to the Kelvin temperature, so gas calculations always use kelvins.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 4', title: 'Absolute Zero and the Kelvin Scale', subtitle: 'The temperature scale gases need' }],
      lines: [
        { say: 'Pressure tells you how hard a gas pushes. Temperature tells you how fast its particles are moving.', show: 'title' },
        { say: 'In this part, you will meet absolute zero, the coldest temperature possible, convert temperatures to the Kelvin scale that starts there, and see why gas calculations always use kelvins.' },
      ],
    },
    {
      chapter: 'Absolute zero',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'lg', align: 'center', md: 'Temperature measures the **average kinetic energy** of the particles.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Absolute zero', md: 'The lowest temperature possible, $-273.15^\\circ\\text{C}$. The particles would have the **least kinetic energy possible**. It can be approached very closely, but never quite reached.' },
      ],
      lines: [
        { say: 'Temperature measures the average kinetic energy of the particles. The hotter a gas, the faster its particles move on average.', show: 't' },
        { say: 'Cool a gas, and its particles slow down. Keep cooling it, and you approach a temperature at which the particles would have the least kinetic energy they can have. Nothing can be colder than that.' },
        { say: 'This is absolute zero, minus two hundred seventy-three point one five degrees Celsius. It can be approached very closely, but never quite reached.', show: 'def' },
      ],
    },
    {
      chapter: 'The Kelvin scale',
      layout: 'split',
      leftWidth: 620,
      left: [scales],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['T(\\text{K}) = T(^\\circ\\text{C}) + 273.15'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Kelvin scale', md: 'Starts at absolute zero, $0\\ \\text{K}$. **No degree sign**, and **never negative**.' },
      ],
      lines: [
        { say: 'The Celsius scale puts its zero where water freezes: a convenient choice, but not a fundamental one. That is why Celsius temperatures can be negative.', show: ['k.grid', 'k.axes'] },
        { say: 'The Kelvin scale puts its zero at absolute zero instead. A change of one kelvin is the same as a change of one degree Celsius.', show: ['k.line', 'k.zero'], focus: 'k.zero' },
        { say: 'So the Kelvin temperature is the Celsius temperature plus two hundred seventy-three point one five. On the graph, the line has a slope of one, and meets zero kelvins at minus two hundred seventy-three point one five degrees Celsius.', show: 'm', focus: ['m', 'k.line'] },
        { say: 'Water freezes at two hundred seventy-three point one five kelvins, and boils at three hundred seventy-three point one five kelvins.', show: ['k.freeze', 'k.boil'], focus: ['k.freeze', 'k.boil'] },
        { say: 'Kelvin temperatures are written without a degree sign, and they are never negative.', show: 'def', focus: 'def' },
      ],
    },
    {
      chapter: 'Converting temperatures',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['', 'Celsius', 'Kelvin'],
          rows: [
            ['Absolute zero', '$-273.15^\\circ\\text{C}$', '$0\\ \\text{K}$'],
            ['Water freezes', '$0^\\circ\\text{C}$', '$273.15\\ \\text{K}$'],
            ['A warm room', '$25^\\circ\\text{C}$', '$298.15\\ \\text{K}$'],
            ['Water boils', '$100^\\circ\\text{C}$', '$373.15\\ \\text{K}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['{-40}^\\circ\\text{C} \\to \\text{K}\\text{:} \\quad T = -40 + 273.15 = 233.15\\ \\text{K}', '350\\ \\text{K} \\to {}^\\circ\\text{C}\\text{:} \\quad T = 350 - 273.15 = 76.85^\\circ\\text{C}'] },
        { kind: 'text', id: 'oops', size: 'md', align: 'center', md: '**Watch out:** the Kelvin number is always $273.15$ **larger**. Add to go to kelvins; subtract to go back.' },
      ],
      lines: [
        { say: 'Here are some temperatures on both scales. A warm room, at twenty-five degrees Celsius, is two hundred ninety-eight point one five kelvins.', show: 'tb' },
        { say: 'Convert minus forty degrees Celsius to kelvins. Add two hundred seventy-three point one five: the answer is two hundred thirty-three point one five kelvins.', show: 'm.0', focus: 'm.0' },
        { say: 'Convert three hundred fifty kelvins to degrees Celsius. Going from kelvins to Celsius, subtract. Three hundred fifty minus two hundred seventy-three point one five is seventy-six point eight five degrees Celsius.', show: 'm.1', focus: 'm.1' },
        { say: 'The Kelvin number is always two hundred seventy-three point one five larger than the Celsius number. If you ever get a negative Kelvin temperature, you have gone the wrong way.', show: 'oops', focus: 'm' },
      ],
    },
    {
      chapter: 'Why gas laws use kelvins',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A gas is at $20^\\circ\\text{C}$. Its Kelvin temperature is doubled. What is its new temperature in degrees Celsius?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['T_1 = 20 + 273.15 = 293.15\\ \\text{K}', 'T_2 = 2 \\times 293.15 = 586.30\\ \\text{K}', 'T_2 = 586.30 - 273.15 = 313.15^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'The kinetic molecular theory says that the average kinetic energy of the particles is proportional to the Kelvin temperature. Double the Kelvin temperature, and the average kinetic energy doubles too.' },
        { say: 'The Celsius temperature is not proportional to it, because zero degrees Celsius is simply where water freezes. On the graph, the line does not pass through the point where both temperatures are zero.' },
        { say: 'A gas is at twenty degrees Celsius, and its Kelvin temperature is doubled. What is its new temperature in degrees Celsius?', show: 'q' },
        { say: 'Change to kelvins: two hundred ninety-three point one five. Double it: five hundred eighty-six point three zero kelvins.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Change back: three hundred thirteen point one five degrees Celsius, not forty. Warming a gas from twenty to forty degrees Celsius raises its Kelvin temperature by under seven percent. So whenever you multiply or divide temperatures, as every gas law does, use kelvins.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Convert $200\\ \\text{K}$ to degrees Celsius. Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
          choices: ['$473.15^\\circ\\text{C}$', '$-73.15^\\circ\\text{C}$', '$73.15^\\circ\\text{C}$', '$-473.15^\\circ\\text{C}$'],
          answer: 1,
          working: 'From kelvins to Celsius, subtract: $T = 200 - 273.15 = -73.15^\\circ\\text{C}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Convert two hundred kelvins to degrees Celsius. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, minus seventy-three point one five degrees Celsius. From kelvins to Celsius, subtract two hundred seventy-three point one five. Choice A adds it instead, which goes the wrong way.', show: 'q.answer' },
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
            '**Absolute zero**, $0\\ \\text{K}$ or $-273.15^\\circ\\text{C}$, is the lowest temperature possible.',
            '$T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$: no degree sign, never negative.',
            'Doubling a Kelvin temperature doubles the average kinetic energy, so gas laws use **kelvins**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Absolute zero, zero kelvins or minus two hundred seventy-three point one five degrees Celsius, is the lowest temperature possible.', show: 'sum.0' },
        { say: 'To change Celsius to kelvins, add two hundred seventy-three point one five. Kelvin temperatures have no degree sign, and are never negative.', show: 'sum.1' },
        { say: 'Doubling a Kelvin temperature doubles the average kinetic energy, so gas calculations always use kelvins. That completes this lesson on pressure and temperature. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
