import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-2-2-c',
  lessonId: 'c20-2-2',
  title: 'Pressure and Temperature, Part 3: Converting Pressure Units',
  thumbnailTitle: 'Converting Pressure Units',
  thumbnail: false,
  summary:
    'To convert a pressure, multiply by a conversion factor from 1 atm = 101.325 kPa = 760 mm Hg, with the unit you want on top and the unit you have on the bottom. For example, 1.75 atm = 177 kPa and 735 mm Hg = 98.0 kPa. Converting to mm Hg makes the number bigger; converting to atm makes it smaller.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 3', title: 'Converting Pressure Units', subtitle: 'Multiply by a factor equal to one' }],
      lines: [
        { say: 'The same pressure can be written as one atmosphere, as one hundred one point three two five kilopascals, or as seven hundred sixty millimetres of mercury.', show: 'title' },
        { say: 'In this part, you will convert pressures from one of these units to another, using conversion factors.' },
      ],
    },
    {
      chapter: 'Conversion factors',
      layout: 'center',
      main: [
        { kind: 'math', id: 'rel', size: 'lg', lines: ['1\\ \\text{atm} = 101.325\\ \\text{kPa} = 760\\ \\text{mm Hg}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Conversion factor', md: 'A fraction whose top and bottom are the **same pressure** in two units, so it is equal to $1$. Put the unit you **want on top** and the unit you **have on the bottom**, so the unit you have cancels.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{101.325\\ \\text{kPa}}{1\\ \\text{atm}} \\qquad \\dfrac{1\\ \\text{atm}}{101.325\\ \\text{kPa}} \\qquad \\dfrac{760\\ \\text{mm Hg}}{101.325\\ \\text{kPa}}'] },
      ],
      lines: [
        { say: 'Every conversion uses one fact. One atmosphere equals one hundred one point three two five kilopascals, which equals seven hundred sixty millimetres of mercury.', show: 'rel' },
        { say: 'To convert a pressure, multiply it by a conversion factor: a fraction whose top and bottom are the same pressure in two units. Its top and bottom are equal, so the factor is equal to one.', show: 'key' },
        { say: 'Here are three of them. Choose the one with the unit you want on top, and the unit you have on the bottom, so the unit you have cancels.', show: 'm' },
      ],
    },
    {
      chapter: 'Atmospheres and kilopascals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', size: 'md', align: 'center', md: 'Convert $1.75\\ \\text{atm}$ to kilopascals, to the nearest whole number.' },
        { kind: 'math', id: 'm1', size: 'md', lines: ['1.75\\ \\cancel{\\text{atm}} \\times \\dfrac{101.325\\ \\text{kPa}}{1\\ \\cancel{\\text{atm}}} = 177.318\\ldots\\ \\text{kPa} \\approx 177\\ \\text{kPa}'] },
        { kind: 'text', id: 'q2', size: 'md', align: 'center', md: 'Convert $85\\ \\text{kPa}$ to atmospheres, to the nearest thousandth.' },
        { kind: 'math', id: 'm2', size: 'md', lines: ['85\\ \\cancel{\\text{kPa}} \\times \\dfrac{1\\ \\text{atm}}{101.325\\ \\cancel{\\text{kPa}}} = 0.8388\\ldots\\ \\text{atm} \\approx 0.839\\ \\text{atm}'] },
      ],
      lines: [
        { say: 'Convert one point seven five atmospheres to kilopascals, to the nearest whole number.', show: 'q1' },
        { say: 'You want kilopascals and have atmospheres, so use the factor with kilopascals on top. The atmospheres cancel.', show: 'm1', focus: 'm1' },
        { say: 'One point seven five times one hundred one point three two five is one hundred seventy-seven point three one eight. To the nearest whole number, that is one hundred seventy-seven kilopascals.' },
        { say: 'Now convert eighty-five kilopascals to atmospheres, to the nearest thousandth. This time kilopascals must cancel, so they go on the bottom.', show: ['q2', 'm2'], focus: 'm2' },
        { say: 'Eighty-five divided by one hundred one point three two five is zero point eight three eight eight, or zero point eight three nine atmospheres to the nearest thousandth.' },
      ],
    },
    {
      chapter: 'Millimetres of mercury',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', size: 'md', align: 'center', md: 'A barometer reads $735\\ \\text{mm Hg}$. Convert it to kilopascals, to the nearest tenth.' },
        { kind: 'math', id: 'm1', size: 'md', lines: ['735\\ \\cancel{\\text{mm Hg}} \\times \\dfrac{101.325\\ \\text{kPa}}{760\\ \\cancel{\\text{mm Hg}}} = 97.991\\ldots\\ \\text{kPa} \\approx 98.0\\ \\text{kPa}'] },
        {
          kind: 'math',
          id: 'm2',
          size: 'md',
          lines: [
            '250\\ \\text{kPa} \\times \\dfrac{760\\ \\text{mm Hg}}{101.325\\ \\text{kPa}} = 1875.15\\ldots\\ \\text{mm Hg} \\approx 1875\\ \\text{mm Hg}',
            '2050\\ \\text{mm Hg} \\times \\dfrac{1\\ \\text{atm}}{760\\ \\text{mm Hg}} = 2.697\\ldots\\ \\text{atm} \\approx 2.70\\ \\text{atm}',
          ],
        },
      ],
      lines: [
        { say: 'A barometer reads seven hundred thirty-five millimetres of mercury. Convert this pressure to kilopascals, to the nearest tenth.', show: 'q1' },
        { say: 'Multiply by one hundred one point three two five kilopascals over seven hundred sixty millimetres of mercury. The answer is ninety-seven point nine nine one, or ninety-eight point zero kilopascals to the nearest tenth.', show: 'm1', focus: 'm1' },
        { say: 'Going the other way, from kilopascals, the factor turns over. Two hundred fifty kilopascals is one thousand eight hundred seventy-five millimetres of mercury, to the nearest whole number.', show: 'm2.0', focus: 'm2.0' },
        { say: 'And two thousand fifty millimetres of mercury, divided by seven hundred sixty, is two point seven zero atmospheres, to the nearest hundredth.', show: 'm2.1', focus: 'm2.1' },
      ],
    },
    {
      chapter: 'Is the answer sensible?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Is the answer sensible?', md: 'The same pressure is a **large** number in mm Hg, a **middling** one in kPa and a **small** one in atm. Converting to mm Hg makes the number bigger; converting to atm makes it smaller.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A factor upside down', md: '$0.85\\ \\text{atm} \\times \\dfrac{760\\ \\text{mm Hg}}{1\\ \\text{atm}} = 646\\ \\text{mm Hg}$. The factor the wrong way up leaves the units $\\text{atm}^2/\\text{mm Hg}$ and a tiny number.' },
      ],
      lines: [
        { say: 'Check that each answer is sensible. The same pressure is a large number in millimetres of mercury, a middling one in kilopascals, and a small one in atmospheres.', show: 'tip' },
        { say: 'So converting to millimetres of mercury should make the number bigger, and converting to atmospheres should make it smaller.' },
        { say: 'Watch out for a factor upside down. To convert zero point eight five atmospheres to millimetres of mercury, multiply by seven hundred sixty millimetres of mercury over one atmosphere, to get six hundred forty-six.', show: 'oops' },
        { say: 'The factor the wrong way up leaves strange units and a tiny number. Write the units in every step, and check that the unit you started with cancels.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Convert $2.25\\ \\text{atm}$ to millimetres of mercury, to the nearest whole number. Use $1\\ \\text{atm} = 101.325\\ \\text{kPa} = 760\\ \\text{mm Hg}$.',
          choices: ['$228\\ \\text{mm Hg}$', '$338\\ \\text{mm Hg}$', '$17\\ \\text{mm Hg}$', '$1710\\ \\text{mm Hg}$'],
          answer: 3,
          working: '$2.25\\ \\text{atm} \\times \\dfrac{760\\ \\text{mm Hg}}{1\\ \\text{atm}} = 1710\\ \\text{mm Hg}$. Converting to mm Hg makes the number bigger.',
        },
      ],
      lines: [
        { say: 'Your turn. Convert two point two five atmospheres to millimetres of mercury, to the nearest whole number. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Two point two five times seven hundred sixty is one thousand seven hundred ten millimetres of mercury. Choice B divides seven hundred sixty by two point two five: the factor is upside down, and the number got smaller, not bigger.', show: 'q.answer' },
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
            '$1\\ \\text{atm} = 101.325\\ \\text{kPa} = 760\\ \\text{mm Hg}$.',
            'Multiply by a factor with the unit you **want on top** and the unit you **have on the bottom**.',
            'Check: converting to mm Hg makes the number bigger; to atm, smaller.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. One atmosphere equals one hundred one point three two five kilopascals, or seven hundred sixty millimetres of mercury.', show: 'sum.0' },
        { say: 'To convert, multiply by a factor with the unit you want on top and the unit you have on the bottom.', show: 'sum.1' },
        { say: 'Then check the size of the answer. In part four, you will meet absolute zero, and the Kelvin temperature scale. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
