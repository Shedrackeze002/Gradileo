import type { Explainer } from '@/video/script.ts';
import { effusion } from './lib/cx-waec.ts';

const video: Explainer = {
  id: 'cx-14-1',
  lessonId: 'cx-14-1',
  title: 'Graham’s Law and Dalton’s Law of Partial Pressures',
  thumbnail: 'ef',
  summary:
    'At the same temperature and pressure, the rate of diffusion of a gas is inversely proportional to the square root of its molar mass, so hydrogen diffuses four times as fast as oxygen. The total pressure of a mixture is the sum of the partial pressures, each equal to the mole fraction times the total. For a gas collected over water, subtract the vapour pressure of water to find the pressure of the dry gas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Gases, Liquids and Solids', title: 'Graham’s Law and Dalton’s Law', subtitle: 'How fast gases spread, and how they share a pressure' }],
      lines: [
        { say: 'Open a bottle of perfume at the front of a classroom, and a little later, people at the back can smell it. Light gases spread faster than heavy ones, and Thomas Graham found exactly how much faster.', show: 'title' },
        { say: 'In this lesson, you will use Graham’s law of diffusion and Dalton’s law of partial pressures.' },
      ],
    },
    {
      chapter: 'Light gases move faster',
      layout: 'center',
      main: [effusion('ef')],
      lines: [
        { say: 'Here are hydrogen and oxygen at the same temperature, each in a container with an open top. The counts show how many molecules are still inside.', show: ['ef', 'ef.labels', 'ef.tally'] },
        { say: 'At the same temperature, every molecule has the same average kinetic energy. An oxygen molecule is sixteen times as heavy, so it moves only a quarter as fast. Watch which container empties first.', play: 'ef.leak', focus: 'ef.h' },
      ],
    },
    {
      chapter: 'Graham’s law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Graham’s law', md: 'At the same temperature and pressure, the rate of diffusion of a gas is **inversely proportional to the square root of its molar mass**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{r_1}{r_2} = \\sqrt{\\dfrac{M_2}{M_1}}', '\\dfrac{r_{\\ce{H2}}}{r_{\\ce{O2}}} = \\sqrt{\\dfrac{32}{2}} = \\sqrt{16} = 4'] },
      ],
      lines: [
        { say: 'Graham’s law says that the rate of diffusion of a gas is inversely proportional to the square root of its molar mass.', show: 'def' },
        { say: 'So the ratio of two rates, r one over r two, equals the square root of M two over M one. Notice the masses are the other way up.', show: 'm.0', focus: 'm.0' },
        { say: 'For hydrogen and oxygen, that is the square root of thirty-two over two, the square root of sixteen, which is four. Hydrogen diffuses four times as fast. The time to diffuse is the other way round: a heavier gas takes longer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The white ring',
      layout: 'center',
      main: [
        {
          kind: 'diagram',
          id: 'tb',
          points: { a: [0, 0], b: [10, 0], c: [10, 1], d: [0, 1], l: [1.5, -0.2], r: [8.5, -0.2], r0: [6.2, 0], r1: [6.2, 1], rt: [6.2, 1.1], m0: [5, -0.15], m1: [5, 1.15] },
          items: [
            { kind: 'region', id: 'tube', points: ['a', 'b', 'c', 'd'], tone: 'muted', shade: 0.12 },
            { kind: 'line', id: 'mid', from: 'm0', to: 'm1', tone: 'muted', dashed: true },
            { kind: 'label', id: 'nh3', at: 'l', tex: '\\text{ammonia}', place: 'below', tone: 'adj' },
            { kind: 'label', id: 'hcl', at: 'r', tex: '\\text{hydrogen chloride}', place: 'below', tone: 'opp' },
            { kind: 'line', id: 'ring', from: 'r0', to: 'r1', tone: 'theta', weight: 10 },
            { kind: 'label', id: 'rl', at: 'rt', tex: '\\text{white ring}', place: 'above', tone: 'theta' },
          ],
          height: 300,
        },
      ],
      lines: [
        { say: 'Here is the classic test. Cotton wool soaked in ammonia solution goes into one end of a long tube, and cotton wool soaked in concentrated hydrochloric acid into the other.', show: ['tb.tube', 'tb.nh3', 'tb.hcl'] },
        { say: 'The two gases diffuse towards each other through the air, and where they meet, they react to form a white ring of solid ammonium chloride.', show: ['tb.ring', 'tb.rl'] },
        { say: 'The ring forms nearer the hydrogen chloride end. Ammonia, with a molar mass of seventeen, is lighter than hydrogen chloride, at thirty-six point five, so it travels further in the same time.', caption: 'The ring forms nearer the hydrogen chloride end. Ammonia (M = 17) is lighter than hydrogen chloride (M = 36.5), so it travels further in the same time.', show: 'tb.mid', focus: 'tb.ring' },
      ],
    },
    {
      chapter: 'Dalton’s law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Dalton’s law of partial pressures', md: 'The total pressure of a mixture of gases that do not react is the **sum of their partial pressures**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['p_A = \\dfrac{n_A}{n_{\\text{total}}} \\times P_{\\text{total}}', 'p_{\\text{dry gas}} = P_{\\text{atmosphere}} - p_{\\text{water vapour}}'] },
      ],
      lines: [
        { say: 'Dalton’s law says that the total pressure of a mixture of gases that do not react is the sum of their partial pressures. Each partial pressure is the gas’s mole fraction times the total pressure.', show: ['def', 'm.0'] },
        { say: 'A gas collected over water is mixed with water vapour. So to find the pressure of the dry gas, subtract the vapour pressure of water from the atmospheric pressure.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Subtract the water vapour first', md: 'Oxygen collected over water at $101.3\\ \\text{kPa}$ and $25\\ ^\\circ\\text{C}$ (water vapour $3.2\\ \\text{kPa}$) is at $98.1\\ \\text{kPa}$, not $101.3\\ \\text{kPa}$.' }],
      lines: [
        { say: 'Here is a common mistake: using the atmospheric pressure for a gas collected over water. If the air pressure is one hundred one point three kilopascals and water vapour adds three point two, the dry oxygen is at ninety-eight point one kilopascals.', caption: 'Here is a common mistake: using the atmospheric pressure for a gas collected over water. If the air pressure is 101.3 kPa and water vapour adds 3.2 kPa, the dry oxygen is at 98.1 kPa.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many times faster does helium ($M = 4$) diffuse than methane ($M = 16$)?',
          choices: ['4 times', '$\\tfrac{1}{2}$ as fast', '2 times', '16 times'],
          answer: 2,
          working: '$\\dfrac{r_{\\ce{He}}}{r_{\\ce{CH4}}} = \\sqrt{\\dfrac{16}{4}} = \\sqrt{4} = 2$',
        },
      ],
      lines: [
        { say: 'Your turn. How many times faster does helium, with a molar mass of four, diffuse than methane, with a molar mass of sixteen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, two times. The rate of helium over the rate of methane is the square root of sixteen over four, which is the square root of four, so two.', show: 'q.answer' },
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
            'Rate of diffusion ∝ 1/√M; the time to diffuse ∝ √M.',
            'The ammonium chloride ring forms nearer the hydrogen chloride end.',
            'Total pressure is the sum of the partial pressures.',
            'Over water, subtract the vapour pressure of water.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The rate of diffusion is proportional to one over the square root of the molar mass, and the time to diffuse to the square root itself.', show: 'sum.0' },
        { say: 'Lighter ammonia travels further, so the white ring forms nearer the hydrogen chloride end.', show: 'sum.1' },
        { say: 'The total pressure of a mixture is the sum of the partial pressures.', show: 'sum.2' },
        { say: 'And for a gas collected over water, subtract the vapour pressure of water to find the pressure of the dry gas.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
