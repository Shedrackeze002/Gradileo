import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, beaker, tag } from './lib/c10-5-figures.ts';

// Hydrochloric acid and sodium hydroxide solution mix: the hydrogen and hydroxide ions make water,
// and the sodium and chloride ions are left as the salt.
const mixing = figure('x', [
  beaker({
    name: 'a',
    label: '\\text{hydrochloric acid}',
    ions: [
      { id: 'h0', at: [0.75, 0.65], tex: '\\ce{H+}', tone: 'bad' },
      { id: 'h1', at: [2.2, 1.85], tex: '\\ce{H+}', tone: 'bad' },
      { id: 'c0', at: [2.2, 0.65], tex: '\\ce{Cl-}', tone: 'good' },
      { id: 'c1', at: [0.8, 1.85], tex: '\\ce{Cl-}', tone: 'good' },
    ],
  }),
  tag('plus', [3.75, 1.4], '+'),
  beaker({
    name: 'b',
    at: [4.5, 0],
    label: '\\text{sodium hydroxide}',
    ions: [
      { id: 'n0', at: [0.75, 0.65], tex: '\\ce{Na+}', tone: 'brand' },
      { id: 'n1', at: [2.2, 1.85], tex: '\\ce{Na+}', tone: 'brand' },
      { id: 'o0', at: [2.2, 0.65], tex: '\\ce{OH-}', tone: 'adj' },
      { id: 'o1', at: [0.8, 1.85], tex: '\\ce{OH-}', tone: 'adj' },
    ],
  }),
  arrow('arrow', [7.85, 1.4], [9.15, 1.4]),
  beaker({
    name: 'c',
    at: [9.6, 0],
    label: '\\text{sodium chloride solution}',
    ions: [
      { id: 'w0', at: [0.8, 0.6], tex: '\\ce{H2O}', group: 'water' },
      { id: 'n0', at: [2.2, 0.6], tex: '\\ce{Na+}', tone: 'brand', group: 'salt' },
      { id: 'c0', at: [0.8, 1.35], tex: '\\ce{Cl-}', tone: 'good', group: 'salt' },
      { id: 'w1', at: [2.2, 1.35], tex: '\\ce{H2O}', group: 'water' },
      { id: 'n1', at: [0.8, 2.1], tex: '\\ce{Na+}', tone: 'brand', group: 'salt' },
      { id: 'c1', at: [2.2, 2.1], tex: '\\ce{Cl-}', tone: 'good', group: 'salt' },
    ],
  }),
], 400);

const video: Explainer = {
  id: 'c10-5-4',
  lessonId: 'c10-5-4',
  title: 'Neutralization, Part 1: Acids Meet Bases',
  thumbnailTitle: 'Acids Meet Bases',
  thumbnail: 'x',
  summary:
    'Neutralization is the reaction of an acid with a base, and it makes a salt and water. The hydrogen ions from the acid and the hydroxide ions from the alkali join to make water, and the ions left over make up the salt: hydrochloric acid and sodium hydroxide make sodium chloride and water.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 1', title: 'Acids Meet Bases', subtitle: 'Neutralization makes a salt and water' }],
      lines: [
        { say: 'An indigestion tablet, a bag of lime spread on a farmer’s field, and toothpaste all do the same job. They cancel out an acid.', show: 'title' },
        { say: 'In this video, you will see what happens when an acid meets a base. Later parts name the products, write their formulas, and show how to neutralize an acid safely.' },
      ],
    },
    {
      chapter: 'Neutralization',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Neutralization', md: '**Neutralization** is the reaction of an acid with a base. It makes a salt and water.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{acid} + \\text{base} \\longrightarrow \\text{salt} + \\text{water}'] },
        { kind: 'callout', id: 'salt', tone: 'definition', title: 'Salt', md: 'A **salt** is an ionic compound made when the hydrogen of an acid is replaced by a metal. Sodium chloride, common table salt, is only one of many salts.' },
      ],
      lines: [
        { say: 'When an acid meets a base, the two react, and neither is left over. This reaction is called neutralization.', show: 'def' },
        { say: 'It makes a salt and water. Acid plus base gives salt plus water.', show: 'm', focus: 'm' },
        { say: 'A salt is an ionic compound made when the hydrogen of an acid is replaced by a metal. Sodium chloride, common table salt, is only one of many salts.', show: 'salt' },
      ],
    },
    {
      chapter: 'Where the water comes from',
      layout: 'center',
      main: [mixing, { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H+ + OH- -> H2O}'] }],
      lines: [
        { say: 'In water, an acid such as hydrochloric acid forms hydrogen ions.', show: ['x.a-glass', 'x.a-liquid', 'x.a-label', 'x.a-h0', 'x.a-h1', 'x.a-c0', 'x.a-c1'], focus: ['x.a-h0', 'x.a-h1'] },
        { say: 'And an alkali such as sodium hydroxide forms hydroxide ions.', show: ['x.plus', 'x.b-glass', 'x.b-liquid', 'x.b-label', 'x.b-n0', 'x.b-n1', 'x.b-o0', 'x.b-o1'], focus: ['x.b-o0', 'x.b-o1'] },
        { say: 'When they mix, the hydrogen ions and the hydroxide ions join to make water. H plus, plus O H minus, gives H two O.', caption: 'When they mix, the hydrogen ions and the hydroxide ions join to make water. H⁺ + OH⁻ gives H₂O.', show: ['x.arrow', 'x.c-glass', 'x.c-liquid', 'x.c-water', 'm'], focus: ['x.c-water', 'm'] },
        { say: 'The ions that are left, the metal ion from the base and the negative ion from the acid, make up the salt. Here, sodium ions and chloride ions make sodium chloride.', show: ['x.c-salt', 'x.c-label'], focus: 'x.c-salt' },
      ],
    },
    {
      chapter: 'Hydrochloric acid and sodium hydroxide',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What are the products when hydrochloric acid reacts with sodium hydroxide?' },
        { kind: 'text', id: 'w', size: 'md', align: 'center', md: 'hydrochloric acid + [[brand:sodium]] hydroxide → [[brand:sodium]] [[good:chloride]] + water' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HCl + NaOH -> NaCl + H2O}'] },
      ],
      lines: [
        { say: 'What are the products when hydrochloric acid reacts with sodium hydroxide?', show: 'q' },
        { say: 'An acid and a base make a salt and water. The salt contains the metal from the base, sodium, and the chloride from hydrochloric acid.' },
        { say: 'So the word equation is: hydrochloric acid plus sodium hydroxide gives sodium chloride plus water.', show: 'w' },
        { say: 'Here is the same reaction as a symbol equation. One of each reactant makes one of each product, so it is already balanced.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Hydrochloric acid reacts with potassium hydroxide. What are the products?',
          choices: ['Potassium chloride and water', 'Potassium chloride and hydrogen', 'Potassium chloride, water and carbon dioxide', 'Potassium sulfate and water'],
          answer: 0,
          working: 'Potassium hydroxide is a base, so the products are a salt and water. The salt has potassium from the base and chloride from hydrochloric acid: potassium chloride.',
        },
      ],
      lines: [
        { say: 'Your turn. Hydrochloric acid reacts with potassium hydroxide. What are the products? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, potassium chloride and water. An acid and a base make a salt and water, and the salt has potassium from the base and chloride from the acid. No gas forms, so choices B and C are wrong.', show: 'q.answer' },
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
            '**Neutralization**: acid + base → salt + water.',
            'A **salt** is an ionic compound made when the hydrogen of an acid is replaced by a metal.',
            'The hydrogen ions and hydroxide ions join to make water: $\\ce{H+ + OH- -> H2O}$.',
            'Hydrochloric acid + sodium hydroxide → sodium chloride + water.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Neutralization is the reaction of an acid with a base. It makes a salt and water.', show: 'sum.0' },
        { say: 'A salt is an ionic compound made when the hydrogen of an acid is replaced by a metal.', show: 'sum.1' },
        { say: 'The hydrogen ions and the hydroxide ions join to make water.', show: 'sum.2' },
        { say: 'Hydrochloric acid and sodium hydroxide make sodium chloride and water. In part two, you will name the salts that other acids and bases make. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
