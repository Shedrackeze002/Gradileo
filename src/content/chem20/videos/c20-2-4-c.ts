import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { gasBox, tag } from './lib/c20-2a-figures.ts';

// The same rigid container, cool and then heated: the walls cannot move, so the pressure rises.
const rigid = figure(
  'r',
  [
    gasBox({ name: 'cool', at: [0, 0], w: 5, h: 5, count: 7, speed: 0.5, seed: 91, hits: 2 }),
    tag('cool-l', [2.5, -0.3], '\\text{cool}', { place: 'below', tone: 'adj', group: 'cool-p' }),
    gasBox({ name: 'hot', at: [6.5, 0], w: 5, h: 5, count: 7, speed: 1.3, seed: 91, hits: 6 }),
    tag('hot-l', [9, -0.3], '\\text{heated}', { place: 'below', tone: 'opp', group: 'hot-p' }),
  ],
  380,
);

const video: Explainer = {
  id: 'c20-2-4-c',
  lessonId: 'c20-2-4',
  title: "Charles's Law and Gay-Lussac's Law, Part 3: Gay-Lussac's Law",
  thumbnailTitle: "Gay-Lussac's Law",
  thumbnail: 'r',
  summary:
    "A gas in a rigid container cannot expand, so heating it makes its faster particles hit the walls more often and harder, and the pressure rises. Gay-Lussac's law: at constant volume, P₁/T₁ = P₂/T₂, with temperatures in kelvins. A can at 250 kPa and 22 °C reaches 286 kPa at 65 °C. Never heat a sealed container.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 3', title: 'Gay-Lussac’s Law', subtitle: 'Heating a gas that cannot expand' }],
      lines: [
        { say: 'Leave a sealed aerosol can in hot sunshine, and the pressure inside it rises. The can cannot grow, so the gas pushes harder instead.', show: 'title' },
        { say: 'In this part, you will see how the pressure of a gas at constant volume depends on its temperature, and use Gay-Lussac’s law to find a new pressure.' },
      ],
    },
    {
      chapter: 'Heating at constant volume',
      layout: 'split',
      leftWidth: 640,
      left: [rigid],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A **rigid** container cannot expand.', 'Heated particles move faster: they hit the walls **more often and harder**.', 'The walls cannot move, so the **pressure rises**.'],
        },
      ],
      lines: [
        { say: 'A gas in a rigid container, such as a steel gas cylinder or an aerosol can, cannot expand.', show: ['r.cool-box', 'r.cool-p', 'r.cool-v', 'r.cool-hits', 'r.cool-l', 'b.0'] },
        { say: 'When it is heated, its particles move faster, and hit the walls more often and harder.', show: ['r.hot-box', 'r.hot-p', 'r.hot-v', 'r.hot-hits', 'r.hot-l', 'b.1'], focus: ['r.hot-v', 'r.hot-hits'] },
        { say: 'The walls cannot move outwards, so the pressure rises. Cooling the gas does the opposite.', show: 'b.2', focus: 'r' },
        { say: 'Measured in kelvins, the pressure of the gas is directly proportional to its temperature. And graphs of pressure against Celsius temperature point back to absolute zero, too.' },
      ],
    },
    {
      chapter: 'Gay-Lussac’s law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'law', tone: 'key', title: 'Gay-Lussac’s law', md: 'For a fixed amount of gas at constant volume, the pressure is directly proportional to the **Kelvin** temperature.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}'] },
        { kind: 'math', id: 'solve', size: 'lg', lines: ['P_2 = P_1 \\times \\dfrac{T_2}{T_1} \\qquad T_2 = T_1 \\times \\dfrac{P_2}{P_1}'] },
      ],
      lines: [
        { say: 'Gay-Lussac’s law says that for a fixed amount of gas at constant volume, the pressure is directly proportional to the Kelvin temperature. P one over T one equals P two over T two.', caption: 'Gay-Lussac’s law says that for a fixed amount of gas at constant volume, the pressure is directly proportional to the Kelvin temperature. P₁/T₁ = P₂/T₂.', show: ['law', 'm'], focus: 'm' },
        { say: 'The law is named after the French chemist Joseph Louis Gay-Lussac. Some books call it Amontons’s law, or simply the pressure law.' },
        { say: 'To use it, solve for P two equals P one times T two over T one, or for T two equals T one times P two over P one, with temperatures in kelvins.', caption: 'To use it, solve for P₂ = P₁ × T₂/T₁, or for T₂ = T₁ × P₂/P₁, with temperatures in kelvins.', show: 'solve', focus: 'solve' },
      ],
    },
    {
      chapter: 'A heated aerosol can',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'The gas in a sealed aerosol can is at $250\\ \\text{kPa}$ and $22^\\circ\\text{C}$. What is its pressure at $65^\\circ\\text{C}$, to the nearest whole number? Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['T_1 = 22 + 273.15 = 295.15\\ \\text{K}', 'T_2 = 65 + 273.15 = 338.15\\ \\text{K}', 'P_2 = 250 \\times \\dfrac{338.15}{295.15} = 286.42\\ldots', 'P_2 = 286\\ \\text{kPa}'] },
      ],
      lines: [
        { say: 'The gas in a sealed aerosol can is at two hundred fifty kilopascals and twenty-two degrees Celsius. What is its pressure at sixty-five degrees Celsius, to the nearest whole number?', show: 'q' },
        { say: 'Change both temperatures to kelvins. T one is two hundred ninety-five point one five kelvins, and T two is three hundred thirty-eight point one five kelvins.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'P two equals two hundred fifty, times three hundred thirty-eight point one five over two hundred ninety-five point one five. That is two hundred eighty-six point four two.', show: 'm.2', focus: 'm.2' },
        { say: 'To the nearest whole number, the pressure is two hundred eighty-six kilopascals. The can got hotter, so the pressure went up.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Never heat a sealed container',
      layout: 'center',
      main: [{ kind: 'callout', id: 'warn', tone: 'mistake', title: 'Never heat a sealed container', md: 'Its gas has no room to expand, so the pressure keeps rising with the Kelvin temperature until the container may **burst**. Aerosol cans warn: do not heat, pierce or burn, even when empty.' }],
      lines: [
        { say: 'A sealed container gives its gas no room to expand, so heating it raises the pressure inside. In a fire, the temperature can climb by hundreds of degrees, and the pressure keeps rising with the Kelvin temperature until the container bursts.', show: 'warn' },
        { say: 'That is why aerosol cans carry warnings not to heat them, pierce them or throw them on a fire, even when they seem empty, and why gas cylinders are stored away from heat.' },
        { say: 'A pressure cooker has a valve that lets gas escape before the pressure gets too high.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The gas in a rigid sealed flask is at $120\\ \\text{kPa}$ and $10^\\circ\\text{C}$. What is its pressure at $90^\\circ\\text{C}$, to the nearest whole number? Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
          choices: ['$1080\\ \\text{kPa}$', '$154\\ \\text{kPa}$', '$94\\ \\text{kPa}$', '$200\\ \\text{kPa}$'],
          answer: 1,
          working: '$T_1 = 283.15\\ \\text{K}$ and $T_2 = 363.15\\ \\text{K}$. $P_2 = 120 \\times \\dfrac{363.15}{283.15} = 153.90\\ldots = 154\\ \\text{kPa}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The gas in a rigid sealed flask is at one hundred twenty kilopascals and ten degrees Celsius. What is its pressure at ninety degrees Celsius, to the nearest whole number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, one hundred fifty-four kilopascals. In kelvins, the temperatures are two hundred eighty-three point one five and three hundred sixty-three point one five. Choice A uses the Celsius temperatures, and choice C has the fraction upside down: a hotter gas cannot have a lower pressure.', show: 'q.answer' },
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
            'In a rigid container, a hotter gas has a **higher pressure**.',
            '**Gay-Lussac’s law**: at constant volume, $\\dfrac{P_1}{T_1} = \\dfrac{P_2}{T_2}$, with $T$ in kelvins.',
            'Never heat a sealed container: its pressure rises until it may burst.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a rigid container, a hotter gas has a higher pressure, because its particles hit the walls more often and harder.', show: 'sum.0' },
        { say: 'Gay-Lussac’s law: at constant volume, P one over T one equals P two over T two, with temperatures in kelvins.', caption: 'Gay-Lussac’s law: at constant volume, P₁/T₁ = P₂/T₂, with temperatures in kelvins.', show: 'sum.1' },
        { say: 'And never heat a sealed container. In part four, you will work back from a volume or a pressure to find a temperature. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
