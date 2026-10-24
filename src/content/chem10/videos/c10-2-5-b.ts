import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { atomShells } from '@/video/chem.ts';
import { figure, type Part } from '@/video/solids.ts';
import { tag } from './lib/c10-2-figures.ts';

// The melting points of the alkali metals, in degrees Celsius.
const melting = figure('mp', [{ points: { pad: [-1.6, 0] }, items: [] }, barGraph({ categories: ['Li', 'Na', 'K', 'Rb', 'Cs'], values: [181, 98, 63, 39, 28], max: 200, step: 50, tone: 'opp', titles: { y: 'melting point (°C)' } })], 500);

/** A dashed line from the edge of a nucleus at `c` (radius r) up to its outer electron at height R. */
const reach = (id: string, c: [number, number], r: number, R: number): Part => ({
  points: { [`${id}-a`]: [c[0], c[1] + r], [`${id}-b`]: [c[0], c[1] + R] },
  items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone: 'opp', dashed: true, weight: 3 }],
});

// Lithium and potassium: the single outer electron is much further out in potassium.
const twoAtoms = figure(
  'at',
  [
    atomShells({ name: 'li', at: [0, 0], nucleus: '\\text{Li}', shells: [2, 1], r: 0.8, gap: 0.7 }),
    reach('li-reach', [0, 0], 0.8, 2.2),
    tag({ id: 'li-name', at: [0, -4.4], tex: '\\text{lithium}' }),
    atomShells({ name: 'k', at: [6.8, 0], nucleus: '\\text{K}', shells: [2, 8, 8, 1], r: 0.8, gap: 0.7 }),
    reach('k-reach', [6.8, 0], 0.8, 3.6),
    tag({ id: 'k-name', at: [6.8, -4.4], tex: '\\text{potassium}' }),
  ],
  480,
);

const video: Explainer = {
  id: 'c10-2-5-b',
  lessonId: 'c10-2-5',
  title: 'Families of Elements, Part 2: The Alkali Metals',
  thumbnailTitle: 'The Alkali Metals',
  thumbnail: 'mp',
  summary:
    'The alkali metals of group 1 are soft, low-density, very reactive metals stored under oil. They react with water to form an alkaline hydroxide and hydrogen (2Na + 2H₂O → 2NaOH + H₂). Down the group they become more reactive and their melting points fall, because the single outer electron is further from the nucleus and is lost more easily.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms and the Periodic Table · Part 2', title: 'The Alkali Metals', subtitle: 'Group 1, and why it gets more reactive' }],
      lines: [
        { say: 'Drop potassium into water and it bursts into a lilac flame. Lithium, two places above it, just fizzes steadily.', show: 'title' },
        { say: 'In this part, you will meet the alkali metals, see how they react with water, and find out why they get more reactive down the group.' },
      ],
    },
    {
      chapter: 'Unusual metals',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Soft enough to cut with a knife', 'Shiny when freshly cut, but tarnish within seconds in air', 'Stored under oil, away from air and water', 'Lithium, sodium and potassium are less dense than water: they float'],
        },
      ],
      lines: [
        { say: 'The group one metals are unusual metals. They are soft enough to cut with a knife.', show: 'b.0', focus: 'b.0' },
        { say: 'Their freshly cut surfaces are shiny, but they tarnish within seconds as they react with the air. So they are stored under oil, to keep air and water away.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'Lithium, sodium and potassium are even less dense than water, so they float on it.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Reacting with water',
      layout: 'center',
      main: [
        { kind: 'text', id: 'lead', size: 'md', align: 'center', md: 'Alkali metal + water → metal hydroxide (an alkaline solution) + hydrogen' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{sodium} + \\text{water} \\rightarrow \\text{sodium hydroxide} + \\text{hydrogen}', '\\ce{2Na + 2H2O -> 2NaOH + H2}'] },
      ],
      lines: [
        { say: 'All the alkali metals react with water, giving off hydrogen gas, and leaving an alkaline solution of the metal hydroxide.', show: 'lead' },
        { say: 'Sodium and water react to form sodium hydroxide and hydrogen.', show: 'm.0', focus: 'm.0' },
        { say: 'In symbols: two N A, plus two H two O, gives two N A O H, plus H two.', caption: 'In symbols: 2Na + 2H₂O → 2NaOH + H₂.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Down the group',
      layout: 'split',
      leftWidth: 520,
      left: [melting],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Metal', 'With cold water'],
          rows: [
            ['lithium', 'fizzes steadily'],
            ['sodium', 'melts into a ball and whizzes around, fizzing'],
            ['potassium', 'whizzes around and catches fire, lilac flame'],
            ['rubidium', 'reacts violently'],
            ['caesium', 'reacts explosively'],
          ],
        },
      ],
      lines: [
        { say: 'How vigorously they react depends on where they are in the group. Lithium fizzes steadily.', show: 't.0', focus: 't.0' },
        { say: 'Sodium melts into a ball and whizzes around, fizzing.', show: 't.1', focus: 't.1' },
        { say: 'Potassium whizzes around and catches fire with a lilac flame.', show: 't.2', focus: 't.2' },
        { say: 'Rubidium reacts violently, and caesium explosively.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        {
          say: 'So going down group one, the metals become more reactive, and their melting points fall: from one hundred eighty-one degrees Celsius for lithium to twenty-eight for caesium.',
          show: ['mp.scale', 'mp.b0', 'mp.v0', 'mp.b1', 'mp.v1', 'mp.b2', 'mp.v2', 'mp.b3', 'mp.v3', 'mp.b4', 'mp.v4'],
          focus: 't',
        },
      ],
    },
    {
      chapter: 'Why reactivity increases',
      layout: 'split',
      leftWidth: 620,
      left: [twoAtoms],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reactivity', md: 'How readily an element takes part in chemical reactions: how quickly and vigorously it reacts.' },
        { kind: 'bullets', id: 'b', items: ['Each alkali metal reacts by **losing** its one outer electron.', 'More shells: the outer electron is further out, held less strongly, and lost more easily.'] },
      ],
      lines: [
        { say: 'Reactivity describes how readily an element takes part in chemical reactions: how quickly and vigorously it reacts.', show: 'def' },
        { say: 'Each alkali metal reacts by losing its single outer electron.', show: ['b.0', 'at.li-nucleus', 'at.li-shell-1', 'at.li-shell-2', 'at.li-name', 'at.k-nucleus', 'at.k-shell-1', 'at.k-shell-2', 'at.k-shell-3', 'at.k-shell-4', 'at.k-name'], focus: 'b.0' },
        { say: 'Going down the group, the atoms have more shells, so the outer electron is further from the nucleus, and is held less strongly.', show: ['b.1', 'at.li-reach', 'at.k-reach'], focus: ['b.1', 'at.li-reach', 'at.k-reach'] },
        { say: 'It is lost more easily, so the metal reacts more readily.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Put potassium (atomic number $19$), lithium ($3$) and caesium ($55$), all alkali metals, in order of reactivity, most reactive first.',
          choices: ['Lithium, potassium, caesium', 'Caesium, potassium, lithium', 'Potassium, lithium, caesium', 'Caesium, lithium, potassium'],
          answer: 1,
          working: 'A larger atomic number means further down the group: lithium, then potassium, then caesium. Reactivity increases down group 1, so caesium is the most reactive.',
        },
      ],
      lines: [
        { say: 'Your turn. Put potassium, lithium and caesium, all alkali metals, in order of reactivity, most reactive first. Their atomic numbers are on the screen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: caesium, potassium, lithium. A larger atomic number means further down the group, and reactivity increases down group one. Choice A is the right order, but least reactive first.', show: 'q.answer' },
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
            '**Alkali metals**: soft, low-density, very reactive metals, stored under oil.',
            'With water: metal hydroxide + hydrogen, $\\ce{2Na + 2H2O -> 2NaOH + H2}$.',
            'Down group 1: **more reactive**, lower melting points; the outer electron is further out and lost more easily.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The alkali metals are soft, low-density and very reactive, so they are stored under oil.', show: 'sum.0' },
        { say: 'They react with water to form a hydroxide and hydrogen gas.', show: 'sum.1' },
        { say: 'And down group one, they become more reactive and their melting points fall, because the outer electron is further from the nucleus and is lost more easily. In part three, you will meet the halogens. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
