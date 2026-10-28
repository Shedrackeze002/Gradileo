import type { Explainer } from '@/video/script.ts';
import { barGraph, marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/c10-2-figures.ts';

// The abundances of chlorine's two isotopes.
const abundance = figure('bars', [barGraph({ categories: ['Cl-35', 'Cl-37'], values: [75.8, 24.2], max: 100, step: 20, titles: { y: 'percentage of atoms' } })], 500);

// Four atoms of chlorine in the usual proportions: three of chlorine-35 and one of chlorine-37.
const four = figure(
  'mb',
  [
    marbles({ groups: [{ id: 'c35', count: 3, tone: 'adj' }, { id: 'c37', count: 1, tone: 'opp' }] }),
    ...[35, 35, 35, 37].map((m, i) => tag({ id: `l${i}`, at: [i, 0], tex: String(m), group: m === 35 ? 'n35' : 'n37' })),
  ],
  260,
);

const video: Explainer = {
  id: 'c10-2-2-b',
  lessonId: 'c10-2-2',
  title: 'Isotopes and Relative Atomic Mass, Part 2: Relative Atomic Mass',
  thumbnailTitle: 'Relative Atomic Mass',
  thumbnail: 'bars',
  summary:
    'The abundance of an isotope is its share of the atoms. The relative atomic mass is the weighted mean mass of an element’s atoms: multiply each isotope’s mass by its percentage, add, and divide by 100. Chlorine that is 75% chlorine-35 and 25% chlorine-37 has a relative atomic mass of 35.5, not the simple average of 36.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 2', title: 'Relative Atomic Mass', subtitle: 'A weighted mean' }],
      lines: [
        { say: 'In part one, you met chlorine’s two isotopes, chlorine-35 and chlorine-37. So where does the 35.45 in the periodic table come from?', show: 'title' },
        { say: 'In this part, you will find an element’s relative atomic mass from its isotopes.' },
      ],
    },
    {
      chapter: 'Abundance',
      layout: 'split',
      leftWidth: 560,
      left: [abundance],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Abundance', md: 'The share of each isotope in a sample, usually given as a **percentage** of the atoms.' },
        { kind: 'text', id: 'about', size: 'md', md: 'About **3** atoms of chlorine-35 for every **1** atom of chlorine-37.' },
      ],
      lines: [
        { say: 'Every sample of chlorine holds both isotopes, in almost exactly the same proportions. The share of each isotope is called its abundance, usually given as a percentage of the atoms.', show: 'def' },
        { say: 'Seventy-five point eight percent of the atoms are chlorine-35, and twenty-four point two percent are chlorine-37.', show: ['bars.scale', 'bars.b0', 'bars.v0', 'bars.b1', 'bars.v1'] },
        { say: 'That is about three atoms of chlorine-35 for every atom of chlorine-37.', show: 'about' },
      ],
    },
    {
      chapter: 'A weighted mean',
      layout: 'split',
      leftWidth: 560,
      left: [four],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\dfrac{35 + 35 + 35 + 37}{4}', '= \\dfrac{142}{4} = 35.5'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Relative atomic mass', md: '$A_r$ is the **weighted mean** mass of an element’s atoms, taking into account the abundance of each isotope. It has no units.' },
      ],
      lines: [
        { say: 'The mass that matters in chemistry is the average mass of all these atoms. Picture just four of them: three of chlorine-35 and one of chlorine-37.', show: ['mb.c35', 'mb.c37', 'mb.n35', 'mb.n37'] },
        { say: 'Their total mass is thirty-five plus thirty-five plus thirty-five plus thirty-seven: one hundred forty-two. Shared among four atoms, that is 35.5 each.', show: 'm', focus: 'm' },
        { say: 'Because there are more chlorine-35 atoms, they count for more. This kind of average is called a weighted mean.', focus: ['mb.c35', 'mb.n35'] },
        {
          say: 'The relative atomic mass of an element, written A r, is the weighted mean mass of its atoms. It is measured against carbon-12, which has a mass of exactly twelve, so it has no units.',
          caption: 'The relative atomic mass of an element, written Aᵣ, is the weighted mean mass of its atoms. It is measured against carbon-12, which has a mass of exactly twelve, so it has no units.',
          show: 'def',
        },
      ],
    },
    {
      chapter: 'Using percentages',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['A_r = \\dfrac{(\\text{mass}_1 \\times \\text{percentage}_1) + (\\text{mass}_2 \\times \\text{percentage}_2)}{100}'] },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Chlorine: $75\\%$ chlorine-35 and $25\\%$ chlorine-37. Taking each mass to be its mass number, find $A_r$ to the nearest tenth.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['35 \\times 75 = 2625 \\qquad 37 \\times 25 = 925', 'A_r = \\dfrac{2625 + 925}{100} = \\dfrac{3550}{100} = 35.5'] },
      ],
      lines: [
        { say: 'With percentages, you multiply each isotope’s mass by its percentage, add the results, and divide by one hundred.', show: 'f' },
        { say: 'A sample of chlorine is seventy-five percent chlorine-35 and twenty-five percent chlorine-37. Taking each mass to be its mass number, find the relative atomic mass to the nearest tenth.', show: 'q' },
        { say: 'Thirty-five times seventy-five is 2,625, and thirty-seven times twenty-five is 925.', show: 'm.0', focus: 'm.0' },
        { say: 'Add them and divide by one hundred: 3,550 over one hundred is 35.5.', show: 'm.1', focus: 'm.1' },
        { say: 'That is closer to thirty-five than to thirty-seven, as it should be, since most of the atoms are chlorine-35.' },
      ],
    },
    {
      chapter: 'Not a simple average',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{35 + 37}{2} = 36} \\qquad \\good{A_r = 35.5}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not just average the mass numbers', md: 'A simple average is right only if the isotopes are equally common. Always weight each mass by its abundance.' },
      ],
      lines: [
        { say: 'Adding thirty-five and thirty-seven and dividing by two gives thirty-six. That would be right only if there were equal numbers of the two isotopes.', show: 'm' },
        { say: 'There are three times as many chlorine-35 atoms, so the relative atomic mass is pulled towards thirty-five. Always weight each mass by its abundance.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a sample of potassium, $93\\%$ of the atoms are potassium-39 and $7\\%$ are potassium-41. Taking the mass of each isotope to be its mass number, calculate the relative atomic mass of potassium to the nearest tenth.',
          choices: ['$40.0$', '$40.9$', '$39.0$', '$39.1$'],
          answer: 3,
          working: '$A_r = \\dfrac{39 \\times 93 + 41 \\times 7}{100} = \\dfrac{3627 + 287}{100} = \\dfrac{3914}{100} = 39.14$, which is $39.1$ to the nearest tenth.',
        },
      ],
      lines: [
        { say: 'Your turn. In a sample of potassium, ninety-three percent of the atoms are potassium-39 and seven percent are potassium-41. Find the relative atomic mass to the nearest tenth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 39.1. Thirty-nine times ninety-three, plus forty-one times seven, is 3,914, and over one hundred that is 39.14. Choice A, forty, is the simple average.', show: 'q.answer' },
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
            'The **abundance** of an isotope is its share of the atoms, as a percentage.',
            '$A_r$ is the **weighted mean**: $A_r = \\dfrac{(m_1 \\times p_1) + (m_2 \\times p_2)}{100}$.',
            '$A_r$ lies closer to the mass of the more abundant isotope.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The abundance of an isotope is its share of the atoms, as a percentage.', show: 'sum.0' },
        { say: 'The relative atomic mass is the weighted mean: multiply each mass by its percentage, add, and divide by one hundred.', show: 'sum.1' },
        { say: 'It lies closer to the mass of the more common isotope. In part three, you will use measured masses, and work backwards to find an abundance. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
