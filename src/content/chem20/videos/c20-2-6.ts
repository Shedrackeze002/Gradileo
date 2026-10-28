import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { container, frame, tag } from './lib/c20-2b-figures.ts';

// Equal volumes of hydrogen and carbon dioxide, each holding six molecules.
const equal = figure(
  'e',
  [
    container({ name: 'h2', at: [0, 0], w: 5, h: 5, molecule: 'H2', count: 6, seed: 5 }),
    tag('h2-label', [2.5, -0.3], '\\text{hydrogen, } \\ce{H2}', { place: 'below', group: 'h2-box' }),
    container({ name: 'co2', at: [7, 0], w: 5, h: 5, molecule: 'CO2', count: 6, seed: 3 }),
    tag('co2-label', [9.5, -0.3], '\\text{carbon dioxide, } \\ce{CO2}', { place: 'below', group: 'co2-box' }),
    frame('room', [0, -1.1], [12, -1.1]),
  ],
  440,
);

// Twice the amount of gas in a cylinder with a piston takes up twice the volume.
const doubled = figure(
  'd',
  [
    container({ name: 'a', at: [0, 0], w: 3, h: 2.6, lid: 'piston', count: 4, seed: 2 }),
    tag('a-label', [1.5, -0.3], '\\begin{gathered} n \\\\ V \\end{gathered}', { place: 'below' }),
    container({ name: 'b', at: [4.6, 0], w: 3, h: 5.2, lid: 'piston', count: 8, seed: 6 }),
    tag('b-label', [6.1, -0.3], '\\begin{gathered} 2n \\\\ 2V \\end{gathered}', { place: 'below' }),
  ],
  480,
);

const video: Explainer = {
  id: 'c20-2-6',
  lessonId: 'c20-2-6',
  title: "Avogadro's Law and Molar Volume, Part 1: Equal Volumes, Equal Numbers",
  thumbnailTitle: 'Equal Volumes, Equal Numbers',
  thumbnail: 'e',
  summary:
    "At the same temperature and pressure, equal volumes of gases hold equal numbers of particles, whichever gas they are, because the particles are tiny compared with the spaces between them and, on average, push on the walls just as hard. Avogadro's law follows: the volume of a gas is directly proportional to the amount of gas, V₁/n₁ = V₂/n₂, so tripling the amount triples the volume.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 1', title: 'Equal Volumes, Equal Numbers', subtitle: "Avogadro's law" }],
      lines: [
        { say: 'Blow into a balloon and it grows. Each breath adds more gas particles, and more particles need more room.', show: 'title' },
        { say: 'Until now, the amount of gas never changed. In this lesson, it does. This part explains Avogadro’s law, and later parts use it with the mole.' },
      ],
    },
    {
      chapter: 'Equal volumes, equal numbers',
      layout: 'center',
      main: [equal, { kind: 'callout', id: 'idea', tone: 'key', title: "Avogadro's idea", md: '**Equal volumes** of gases, at the same temperature and pressure, contain **equal numbers of particles**, whichever gas they are.' }],
      lines: [
        { say: 'In eighteen eleven, the Italian scientist Amedeo Avogadro suggested that equal volumes of gases, at the same temperature and pressure, contain equal numbers of particles, whichever gas they are.', show: 'idea' },
        { say: 'So a litre of hydrogen and a litre of carbon dioxide, side by side in the same room, hold the same number of molecules.', show: ['e.h2-box', 'e.h2-p', 'e.co2-box', 'e.co2-p'] },
        { say: 'That is true even though each carbon dioxide molecule is about twenty-two times heavier than a hydrogen molecule.', focus: 'e.co2-p' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Gas particles are **tiny** compared with the spaces between them, so their size hardly affects the volume.',
            'At the same temperature, the particles of every gas have the same **average kinetic energy**.',
            'Heavier particles move more slowly, but hit harder: on average, each one pushes on the walls just as hard.',
            'So the room a gas needs depends only on **how many** particles there are.',
          ],
        },
      ],
      lines: [
        { say: 'The kinetic molecular theory explains why. Gas particles are tiny compared with the spaces between them, so their own size hardly affects the volume.', show: 'b.0', focus: 'b.0' },
        { say: 'At the same temperature, the particles of every gas have the same average kinetic energy.', show: 'b.1', focus: 'b.1' },
        { say: 'Heavier particles move more slowly, but they hit harder. So, on average, each particle pushes on the walls just as hard.', show: 'b.2', focus: 'b.2' },
        { say: 'The room a gas needs depends only on how many particles there are.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: "Avogadro's law",
      layout: 'split',
      leftWidth: 500,
      left: [doubled],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: "Avogadro's law", md: 'At constant temperature and pressure, the volume of a gas is **directly proportional** to the amount of gas, $n$, in moles.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{V_1}{n_1} = \\dfrac{V_2}{n_2}'] },
        { kind: 'text', id: 'u', size: 'md', md: 'The volumes must be in the same unit.' },
      ],
      lines: [
        { say: 'The amount of gas, n, is counted in moles. Part three recaps what a mole is.', show: ['d.a-box', 'd.a-piston', 'd.a-p', 'd.a-label'] },
        { say: 'Double the amount of gas, and at the same temperature and pressure, the volume doubles too.', show: ['d.b-box', 'd.b-piston', 'd.b-p', 'd.b-label'], focus: 'd.b-p' },
        { say: 'This is Avogadro’s law. At constant temperature and pressure, the volume of a gas is directly proportional to the amount of gas.', show: 'def', focus: 'd' },
        { say: 'V one over n one equals V two over n two, with both volumes in the same unit.', caption: 'V₁/n₁ = V₂/n₂, with both volumes in the same unit.', show: ['m', 'u'] },
      ],
    },
    {
      chapter: 'Tripling the amount',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A flexible container holds $0.80\\ \\text{mol}$ of gas in $19.4\\ \\text{L}$. At the same temperature and pressure, what volume would $2.40\\ \\text{mol}$ of the gas occupy, to the nearest tenth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{V_1}{n_1} = \\dfrac{V_2}{n_2}, \\text{ so } V_2 = V_1 \\times \\dfrac{n_2}{n_1}', 'V_2 = 19.4 \\times \\dfrac{2.40}{0.80} = \\good{58.2\\ \\text{L}}'] },
      ],
      lines: [
        {
          say: 'A flexible container holds zero point eight zero moles of gas in nineteen point four litres. At the same temperature and pressure, what volume would two point four zero moles of the gas occupy?',
          caption: 'A flexible container holds 0.80 mol of gas in 19.4 L. At the same temperature and pressure, what volume would 2.40 mol of the gas occupy?',
          show: 'q',
        },
        { say: 'Solve Avogadro’s law for the new volume: V two equals V one, times n two over n one.', caption: 'Solve Avogadro’s law for the new volume: V₂ = V₁ × n₂/n₁.', show: 'm.0', focus: 'm.0' },
        { say: 'Nineteen point four times two point four zero over zero point eight zero is fifty-eight point two litres. The amount was tripled, so the volume tripled too.', caption: '19.4 × 2.40/0.80 = 58.2 L. The amount was tripled, so the volume tripled too.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A flexible container holds $0.50\\ \\text{mol}$ of gas in $12.2\\ \\text{L}$. At the same temperature and pressure, what volume would $1.50\\ \\text{mol}$ of the gas occupy, to the nearest tenth?',
          choices: ['$4.1\\ \\text{L}$', '$24.4\\ \\text{L}$', '$13.2\\ \\text{L}$', '$36.6\\ \\text{L}$'],
          answer: 3,
          working: '$V_2 = V_1 \\times \\dfrac{n_2}{n_1} = 12.2 \\times \\dfrac{1.50}{0.50} = 36.6\\ \\text{L}$. The amount triples, so the volume triples.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A flexible container holds zero point five zero moles of gas in twelve point two litres. At the same temperature and pressure, what volume would one point five zero moles occupy? Pause the video and try it.',
          caption: 'Your turn. A flexible container holds 0.50 mol of gas in 12.2 L. At the same temperature and pressure, what volume would 1.50 mol occupy? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is D, thirty-six point six litres. The amount of gas triples, so the volume triples. Choice A divides by three instead, but more gas must take up more room.', show: 'q.answer' },
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
            'At the same temperature and pressure, equal volumes of gases hold equal numbers of particles.',
            'Gas particles are tiny, and on average push on the walls just as hard, so only their number matters.',
            "**Avogadro's law**: $\\dfrac{V_1}{n_1} = \\dfrac{V_2}{n_2}$ at constant temperature and pressure.",
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At the same temperature and pressure, equal volumes of gases hold equal numbers of particles.', show: 'sum.0' },
        { say: 'The particles are tiny, and on average push on the walls just as hard, so only their number matters.', show: 'sum.1' },
        { say: 'Avogadro’s law: the volume is directly proportional to the amount of gas. In part two, you will use it to find new volumes, and how much gas to add. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
