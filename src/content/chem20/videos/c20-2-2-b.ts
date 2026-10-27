import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barometer } from './lib/c20-2a-figures.ts';

// A mercury barometer at sea level: the air holds up a column about 760 mm high.
const baro = figure('b', [barometer()], 560);

const video: Explainer = {
  id: 'c20-2-2-b',
  lessonId: 'c20-2-2',
  title: 'Pressure and Temperature, Part 2: Atmospheric Pressure and the Barometer',
  thumbnailTitle: 'Atmospheric Pressure',
  thumbnail: 'b',
  summary:
    'The weight of the air presses on everything beneath it: about 101 kPa at sea level, and less higher up. A mercury barometer measures it, holding up a column about 760 mm high at sea level. Chemists use three units of pressure: 1 atm = 101.325 kPa = 760 mm Hg.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 2', title: 'Atmospheric Pressure', subtitle: 'The weight of the air, and how to measure it' }],
      lines: [
        { say: 'We live at the bottom of an ocean of air. Gravity pulls the atmosphere down, and its weight presses on everything beneath it.', show: 'title' },
        { say: 'In this part, you will see how large that pressure is, how a barometer measures it, and the three units chemists use for pressure.' },
      ],
    },
    {
      chapter: 'The pressure of the air',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'At sea level: about $101\\ \\text{kPa}$, or about $101\\,000\\ \\text{N}$ on every square metre.',
            'We do not feel it: the air pushes **equally from every side**, and our bodies push back.',
            'Higher up there is **less air above**, so the pressure is lower. It also changes a little with the weather.',
          ],
        },
      ],
      lines: [
        { say: 'At sea level, the pressure of the atmosphere is about one hundred one kilopascals. That is a force of about one hundred one thousand newtons on every square metre, roughly the weight of a ten-tonne mass.', show: 'b.0' },
        { say: 'We do not feel it, because the air pushes equally from every side, and the fluids in our bodies push back out just as hard.', show: 'b.1' },
        { say: 'Higher up, there is less air above, so atmospheric pressure falls. Near the tops of the highest mountains, it is only about a third of its value at sea level. It also rises and falls a little with the weather.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The barometer',
      layout: 'split',
      leftWidth: 640,
      left: [baro],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Barometer', md: 'A **barometer** is an instrument that measures the pressure of the atmosphere.' },
        { kind: 'text', id: 'hg', size: 'md', md: 'Mercury is about $13.6$ times as dense as water. A water barometer would need a tube more than $10\\ \\text{m}$ tall.' },
      ],
      lines: [
        { say: 'A barometer is an instrument that measures the pressure of the atmosphere.', show: 'def' },
        { say: 'The first barometer, made by Evangelista Torricelli in the sixteen forties, used mercury. A glass tube about a metre long, closed at one end, is filled with mercury and turned upside down in a dish of mercury.', show: ['b.dish', 'b.tube', 'b.column'] },
        { say: 'Some mercury runs out, but not all of it. The atmosphere, pressing down on the mercury in the dish, holds up a column in the tube, with a nearly empty space above it.', show: ['b.air', 'b.space'], focus: 'b.air' },
        { say: 'At sea level, the column stands about seven hundred sixty millimetres high. When the air pressure rises, it pushes the column higher. When the pressure falls, the column drops.', show: 'b.height', focus: 'b.height' },
        { say: 'Mercury is used because it is so dense, about thirteen point six times as dense as water. A barometer filled with water would need a tube more than ten metres tall.', show: 'hg', focus: 'b' },
      ],
    },
    {
      chapter: 'Three units of pressure',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Unit', 'Symbol', 'Where it comes from'],
          rows: [
            ['kilopascal', 'kPa', '$1000$ pascals; the pascal is the SI unit'],
            ['atmosphere', 'atm', 'close to the average air pressure at sea level'],
            ['millimetre of mercury', 'mm Hg', 'holds up a column of mercury $1\\ \\text{mm}$ high'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['1\\ \\text{atm} = 101.325\\ \\text{kPa} = 760\\ \\text{mm Hg}'] },
      ],
      lines: [
        { say: 'The barometer gives one of the three units of pressure used in chemistry. The kilopascal is a thousand pascals, and the pascal is the S I unit of pressure.', caption: 'The barometer gives one of the three units of pressure used in chemistry. The kilopascal is a thousand pascals, and the pascal is the SI unit of pressure.', show: ['t', 't.0'] },
        { say: 'The atmosphere is a unit close to the average pressure of the air at sea level.', show: 't.1' },
        { say: 'And the millimetre of mercury is the pressure that holds up a column of mercury one millimetre high.', show: 't.2' },
        { say: 'The three units are related. One atmosphere equals one hundred one point three two five kilopascals, which equals seven hundred sixty millimetres of mercury.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mercury barometer is carried from sea level to the top of a high mountain. What happens to the height of its mercury column?',
          choices: [
            'It falls, because there is less air above pressing down.',
            'It rises, because the air at the top is thinner.',
            'It stays at $760\\ \\text{mm}$, because the tube is the same.',
            'It falls to zero, because there is no air at the top.',
          ],
          answer: 0,
          working: 'Higher up there is less air above, so atmospheric pressure is lower, and it holds up a shorter column. Near the tops of the highest mountains it is only about a third of its value at sea level, but it is not zero.',
        },
      ],
      lines: [
        { say: 'Your turn. A mercury barometer is carried from sea level to the top of a high mountain. What happens to the height of its mercury column? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Higher up there is less air above, so the pressure is lower, and it holds up a shorter column. Choice D goes too far: even on the highest mountains there is about a third of the sea level pressure.', show: 'q.answer' },
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
            'Atmospheric pressure is about $101\\ \\text{kPa}$ at sea level, and lower higher up.',
            'A mercury **barometer** holds up a column of about $760\\ \\text{mm}$ at sea level.',
            '$1\\ \\text{atm} = 101.325\\ \\text{kPa} = 760\\ \\text{mm Hg}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Atmospheric pressure is about one hundred one kilopascals at sea level, and lower higher up.', show: 'sum.0' },
        { say: 'A mercury barometer measures it. At sea level, the air holds up a column about seven hundred sixty millimetres high.', show: 'sum.1' },
        { say: 'And one atmosphere equals one hundred one point three two five kilopascals, or seven hundred sixty millimetres of mercury. In part three, you will use these to convert pressures from one unit to another. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
