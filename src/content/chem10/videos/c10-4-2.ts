import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { labels, row, stack, water } from './lib/c10-4-figures.ts';

// Three water molecules, one above another: one H₂O (labelled beside it), then 3H₂O (labelled below).
const three = row({ terms: [stack(water('w1'), water('w2'), water('w3'))] });
const waters = figure(
  'w',
  [
    three,
    labels([
      { id: 'one', at: [three.end + 0.3, 1.6], tex: '\\ce{H2O}', place: 'right' },
      { id: 'three', at: [three.end / 2, -2.6], tex: '\\ce{3H2O}' },
    ]),
  ],
  520,
);

const video: Explainer = {
  id: 'c10-4-2',
  lessonId: 'c10-4-2',
  title: 'Balancing Equations, Part 1: Counting Atoms',
  thumbnailTitle: 'Counting Atoms',
  thumbnail: 'w',
  summary:
    'A subscript counts the atoms of the element just before it, a number after a bracket multiplies everything inside the bracket, and a coefficient in front multiplies the whole formula. So 3Ca(OH)₂ holds 3 calcium, 6 oxygen and 6 hydrogen atoms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 1', title: 'Counting Atoms', subtitle: 'Subscripts, coefficients and brackets' }],
      lines: [
        { say: 'A word equation says which substances react, but not how many particles of each take part. A symbol equation uses formulas instead, with numbers in front that count the particles.', show: 'title' },
        { say: 'In this lesson, you will balance symbol equations. This first part counts the atoms in a formula. Part two balances simple equations, part three adds state symbols, and part four balances fuels and polyatomic ions.' },
      ],
    },
    {
      chapter: 'Subscripts and coefficients',
      layout: 'split',
      leftWidth: 420,
      left: [waters],
      right: [
        { kind: 'callout', id: 'sub', tone: 'definition', title: 'Subscript', md: 'The small number after a symbol. It counts the atoms of the element **just before** it: $\\ce{H2O}$ holds 2 hydrogen atoms and 1 oxygen atom.' },
        { kind: 'callout', id: 'coef', tone: 'definition', title: 'Coefficient', md: 'The full-size number **in front** of a formula. It counts whole particles: $\\ce{3H2O}$ is three water molecules.' },
      ],
      lines: [
        { say: 'A subscript is the small number written after a symbol. It counts the atoms of the element just before it.', show: 'sub' },
        { say: 'Water, H two O, holds two hydrogen atoms and one oxygen atom. The oxygen has no subscript, and no subscript means one.', caption: 'Water, H₂O, holds two hydrogen atoms and one oxygen atom. The oxygen has no subscript, and no subscript means one.', show: ['w.w1', 'w.one'], focus: 'w.w1' },
        { say: 'A coefficient is the full-size number written in front of a formula. It counts whole particles. Three H two O means three water molecules.', caption: 'A coefficient is the full-size number written in front of a formula. It counts whole particles. 3H₂O means three water molecules.', show: ['coef', 'w.w2', 'w.w3', 'w.three'], focus: ['w.w1', 'w.w2', 'w.w3'] },
        { say: 'So three H two O holds three times two, or six hydrogen atoms, and three oxygen atoms.', caption: 'So 3H₂O holds three times two, or six hydrogen atoms, and three oxygen atoms.', focus: 'w' },
      ],
    },
    {
      chapter: 'Four rules',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'r',
          items: [
            'A **subscript** counts the atom just before it. No subscript means 1.',
            'A subscript after a **bracket** multiplies every atom inside: $\\ce{Ca(OH)2}$ holds 2 O and 2 H.',
            'A **coefficient** multiplies every atom in the whole formula.',
            'When an element appears twice, **add**: $\\ce{C2H5OH}$ holds $5 + 1 = 6$ H.',
          ],
        },
      ],
      lines: [
        { say: 'Four rules count every atom. First, a subscript counts the atom just before it, and no subscript means one.', show: 'r.0' },
        { say: 'Second, a subscript after a bracket multiplies every atom inside the bracket. Calcium hydroxide, C A, O H in brackets, two, holds two oxygen atoms and two hydrogen atoms.', caption: 'Second, a subscript after a bracket multiplies every atom inside the bracket. Calcium hydroxide, Ca(OH)₂, holds two oxygen atoms and two hydrogen atoms.', show: 'r.1' },
        { say: 'Third, a coefficient multiplies every atom in the whole formula.', show: 'r.2' },
        { say: 'Fourth, when an element appears in more than one place, add the counts. Ethanol, C two H five O H, holds five plus one, or six hydrogen atoms.', caption: 'Fourth, when an element appears in more than one place, add the counts. Ethanol, C₂H₅OH, holds five plus one, or six hydrogen atoms.', show: 'r.3' },
      ],
    },
    {
      chapter: 'Brackets and a coefficient',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', align: 'center', md: 'How many atoms of each element are in $\\ce{3Ca(OH)2}$?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Ca(OH)2}: \\quad 1\\ \\text{Ca}, \\quad 1 \\times 2 = 2\\ \\text{O}, \\quad 1 \\times 2 = 2\\ \\text{H}',
            '\\ce{3Ca(OH)2}: \\quad 3\\ \\text{Ca}, \\quad 3 \\times 2 = 6\\ \\text{O}, \\quad 3 \\times 2 = 6\\ \\text{H}',
            '3 + 6 + 6 = 15\\ \\text{atoms in all}',
          ],
        },
      ],
      lines: [
        { say: 'How many atoms of each element are shown by three units of calcium hydroxide?', caption: 'How many atoms of each element are shown by 3Ca(OH)₂?', show: 'q' },
        { say: 'Start with one formula. It holds one calcium atom, and the bracket holds one oxygen and one hydrogen atom, taken two times: two oxygen and two hydrogen atoms.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the coefficient three multiplies them all: three calcium atoms, six oxygen atoms and six hydrogen atoms.', show: 'm.1', focus: 'm.1' },
        { say: 'That is fifteen atoms in all.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'More examples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shown', 'Atoms'],
          rows: [
            ['$\\ce{H2SO4}$', '2 H, 1 S, 4 O'],
            ['$\\ce{4NH3}$', '4 N, 12 H'],
            ['$\\ce{Mg(NO3)2}$', '1 Mg, 2 N, 6 O'],
            ['$\\ce{2Al2(SO4)3}$', '4 Al, 6 S, 24 O'],
          ],
        },
      ],
      lines: [
        { say: 'Sulfuric acid, H two S O four, holds two hydrogen atoms, one sulfur atom and four oxygen atoms.', caption: 'Sulfuric acid, H₂SO₄, holds two hydrogen atoms, one sulfur atom and four oxygen atoms.', show: 't.0', focus: 't.0' },
        { say: 'Four N H three is four ammonia molecules: four nitrogen atoms, and four times three, or twelve hydrogen atoms.', caption: '4NH₃ is four ammonia molecules: four nitrogen atoms, and four times three, or twelve hydrogen atoms.', show: 't.1', focus: 't.1' },
        { say: 'Magnesium nitrate has two nitrate groups in brackets, so it holds two nitrogen atoms and two times three, or six oxygen atoms.', caption: 'Magnesium nitrate, Mg(NO₃)₂, has two nitrate groups in brackets, so it holds two nitrogen atoms and two times three, or six oxygen atoms.', show: 't.2', focus: 't.2' },
        { say: 'And two units of aluminium sulfate: aluminium, two times two is four. Sulfur, two times three is six. Oxygen, two times three times four is twenty-four.', caption: 'And 2Al₂(SO₄)₃: aluminium, two times two is four. Sulfur, two times three is six. Oxygen, two times three times four is twenty-four.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many oxygen atoms are shown by $\\ce{3Mg(NO3)2}$?',
          choices: ['$6$', '$18$', '$9$', '$36$'],
          answer: 1,
          working: 'One $\\ce{Mg(NO3)2}$ holds $3 \\times 2 = 6$ O atoms. The coefficient makes it $3 \\times 6 = 18$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many oxygen atoms are shown by three units of magnesium nitrate? Pause the video and try it.', caption: 'Your turn. How many oxygen atoms are shown by 3Mg(NO₃)₂? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eighteen. One formula holds three times two, or six oxygen atoms, and the coefficient three makes it eighteen. Choice A, six, forgets the coefficient, and choice C, nine, forgets the bracket.', show: 'q.answer' },
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
            'A **subscript** counts the atom just before it; no subscript means 1.',
            'A number after a **bracket** multiplies everything inside it.',
            'A **coefficient** multiplies the whole formula.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A subscript counts the atom just before it, and no subscript means one.', show: 'sum.0' },
        { say: 'A number after a bracket multiplies everything inside the bracket.', show: 'sum.1' },
        { say: 'And a coefficient multiplies the whole formula. In part two, you will use coefficients to balance equations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
