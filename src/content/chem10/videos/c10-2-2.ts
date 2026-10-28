import type { Explainer } from '@/video/script.ts';
import { atomShells } from '@/video/chem.ts';
import { figure } from '@/video/solids.ts';
import { tag } from './lib/c10-2-figures.ts';

// The three isotopes of hydrogen side by side, each with one proton and one electron.
const hydrogen = figure(
  'h',
  [0, 1, 2].flatMap((n) => [
    atomShells({ name: `h${n + 1}`, at: [n * 6.4, 0], protons: 1, neutrons: n, shells: [1] }),
    tag({ id: `h${n + 1}-name`, at: [n * 6.4, -3.3], tex: `\\text{hydrogen-${n + 1}}` }),
  ]),
  360,
);

// Chlorine-35 and chlorine-37: the same protons and electrons, different neutrons.
const chlorine = figure(
  'cl',
  [
    atomShells({ name: 'a', at: [0, 0], protons: 17, neutrons: 18, shells: [2, 8, 7], r: 1.6, gap: 0.9 }),
    tag({ id: 'a-name', at: [0, 5.2], tex: '\\text{chlorine-35}' }),
    atomShells({ name: 'b', at: [11, 0], protons: 17, neutrons: 20, shells: [2, 8, 7], r: 1.6, gap: 0.9 }),
    tag({ id: 'b-name', at: [11, 5.2], tex: '\\text{chlorine-37}' }),
  ],
  440,
);

const video: Explainer = {
  id: 'c10-2-2',
  lessonId: 'c10-2-2',
  title: 'Isotopes and Relative Atomic Mass, Part 1: Isotopes',
  thumbnailTitle: 'Isotopes',
  thumbnail: 'h',
  summary:
    'Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons, such as hydrogen-1, hydrogen-2 and hydrogen-3, or chlorine-35 (18 neutrons) and chlorine-37 (20 neutrons). Isotopes have the same electrons, so they react in the same way; atoms with the same mass number but different protons, such as argon-40 and calcium-40, are not isotopes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 1', title: 'Isotopes', subtitle: 'Same element, different neutrons' }],
      lines: [
        { say: 'Look up chlorine in the periodic table and you will find 35.45 beside it. But a mass number counts whole particles. How can a chlorine atom have a mass of 35.45?', show: 'title' },
        { say: 'The answer is that no atom does. Chlorine is a mixture of two kinds of atom, and 35.45 is their average.' },
        { say: 'In this part, you will meet these kinds of atom, called isotopes. Then you will find their average, and work backwards from it.' },
      ],
    },
    {
      chapter: 'Same protons, different neutrons',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Isotopes', md: 'Atoms of the same element with the same number of **protons** but different numbers of **neutrons**, so they have different mass numbers.' },
        hydrogen,
      ],
      lines: [
        { say: 'All atoms of an element have the same number of protons, but not always the same number of neutrons.' },
        { say: 'Isotopes are atoms of the same element that have the same number of protons, but different numbers of neutrons. So isotopes have different mass numbers.', show: 'def' },
        { say: 'An isotope is named by its element and its mass number. Hydrogen-1 has one proton and no neutrons; almost all hydrogen atoms are this kind.', show: ['h.h1-nucleus', 'h.h1-shell-1', 'h.h1-name'], focus: 'h.h1-nucleus' },
        { say: 'Hydrogen-2, sometimes called deuterium, has one neutron, and hydrogen-3, called tritium, has two. Tritium is radioactive.', show: ['h.h2-nucleus', 'h.h2-shell-1', 'h.h2-name', 'h.h3-nucleus', 'h.h3-shell-1', 'h.h3-name'], focus: ['h.h2-nucleus', 'h.h3-nucleus'] },
      ],
    },
    {
      chapter: 'Counting neutrons',
      layout: 'center',
      main: [
        chlorine,
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{chlorine-35: } 35 - 17 = 18 \\text{ neutrons}', '\\text{chlorine-37: } 37 - 17 = 20 \\text{ neutrons}'] },
      ],
      lines: [
        { say: 'Chlorine has two common isotopes, chlorine-35 and chlorine-37. The atomic number of chlorine is seventeen. How many protons, neutrons and electrons does each have?', show: ['cl.a-name', 'cl.b-name'] },
        { say: 'Both are chlorine, so both have seventeen protons and, when neutral, seventeen electrons.', show: ['cl.a-nucleus', 'cl.a-shell-1', 'cl.a-shell-2', 'cl.a-shell-3', 'cl.b-nucleus', 'cl.b-shell-1', 'cl.b-shell-2', 'cl.b-shell-3'] },
        { say: 'Chlorine-35 has thirty-five minus seventeen: eighteen neutrons.', show: 'm.0', focus: ['m.0', 'cl.a-nucleus'] },
        { say: 'Chlorine-37 has thirty-seven minus seventeen: twenty neutrons.', show: 'm.1', focus: ['m.1', 'cl.b-nucleus'] },
      ],
    },
    {
      chapter: 'Isotopes react in the same way',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Same electrons, same chemistry', md: 'Isotopes of an element have the same electrons, arranged in the same way, so they have the **same chemical properties**.' },
        { kind: 'callout', id: 'diff', tone: 'tip', title: 'How isotopes differ', md: 'Only in **physical** properties that depend on mass, such as density; and some isotopes, such as carbon-14, are radioactive.' },
      ],
      lines: [
        { say: 'When atoms react, it is their electrons that meet and rearrange. The nucleus is not involved.' },
        { say: 'Isotopes have the same electrons, arranged in the same way, so they have the same chemical properties. Chlorine-35 and chlorine-37 both react with sodium to make sodium chloride.', show: 'key' },
        { say: 'They differ only in properties that depend on mass, such as density, and some isotopes are radioactive. Carbon-14, for example, slowly decays after a living thing dies, so measuring what is left tells scientists the age of old wood, bone or cloth.', show: 'diff' },
      ],
    },
    {
      chapter: 'Same mass number, different elements',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\ce{^{40}_{18}Ar} \\qquad \\ce{^{40}_{20}Ca}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The same mass number does not make isotopes', md: 'Argon-40 has $18$ protons and calcium-40 has $20$: they are **different elements**. Isotopes must have the same atomic number.' },
      ],
      lines: [
        { say: 'Watch out. Argon-40 and calcium-40 have the same mass number, but they are not isotopes.', show: 'm' },
        { say: 'One has eighteen protons and the other has twenty, so they are different elements. Isotopes must have the same atomic number, so always check the protons first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Atom W has $12$ protons and $12$ neutrons, atom X has $12$ protons and $14$ neutrons, atom Y has $13$ protons and $11$ neutrons, and atom Z has $11$ protons and $14$ neutrons. Which two atoms are isotopes of the same element?',
          choices: ['W and Y', 'X and Z', 'W and X', 'Y and Z'],
          answer: 2,
          working: 'W and X both have $12$ protons, so they are the same element, with different numbers of neutrons. W and Y have the same mass number, $24$, but different numbers of protons, so they are different elements.',
        },
      ],
      lines: [
        { say: 'Your turn. The screen shows the protons and neutrons in four atoms. Which two atoms are isotopes of the same element? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, W and X. Both have twelve protons, so they are the same element, with different numbers of neutrons. W and Y have the same mass number, twenty-four, but different protons, so they are different elements.', show: 'q.answer' },
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
            '**Isotopes**: same number of protons, different numbers of neutrons, so different mass numbers.',
            'Isotopes have the same electrons, so the same chemical properties.',
            'The same mass number but different protons: different elements, not isotopes.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Isotopes are atoms of the same element with the same number of protons, but different numbers of neutrons.', show: 'sum.0' },
        { say: 'They have the same electrons, so they react in the same way.', show: 'sum.1' },
        { say: 'And atoms with the same mass number but different protons are not isotopes. In part two, you will find the average mass of an element’s atoms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
