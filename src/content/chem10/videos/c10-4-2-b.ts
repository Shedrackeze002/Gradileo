import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, mol, plus, row, stack, water } from './lib/c10-4-figures.ts';

// Hydrogen burning, with room for a second hydrogen and a second water molecule.
const burn = () => figure('h', [row({ terms: [stack(mol('h1', ['H', 'H']), mol('h2', ['H', 'H'])), plus('p'), mol('o2', ['O', 'O']), arrow('arr'), stack(water('w1'), water('w2'))] })], 360);
const unbalanced = ['h.h1', 'h.p', 'h.o2', 'h.arr', 'h.w1'];

const video: Explainer = {
  id: 'c10-4-2-b',
  lessonId: 'c10-4-2',
  title: 'Balancing Equations, Part 2: Balancing Step by Step',
  thumbnailTitle: 'Balancing Step by Step',
  thumbnail: 'h',
  summary:
    'A balanced equation has the same number of atoms of each element on both sides, as the conservation of mass requires. Count the atoms, change a coefficient (never a subscript) and count again: H₂ + O₂ → H₂O becomes 2H₂ + O₂ → 2H₂O, and N₂ + H₂ → NH₃ becomes N₂ + 3H₂ → 2NH₃.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 2', title: 'Balancing Step by Step', subtitle: 'Change the coefficients, never the subscripts' }],
      lines: [
        { say: 'Atoms are never made or destroyed in a reaction. So a correct symbol equation has the same atoms on both sides. We say it is balanced.', show: 'title' },
        { say: 'In this part, you will check whether an equation is balanced, and balance it step by step by changing coefficients.' },
      ],
    },
    {
      chapter: 'Counting both sides',
      layout: 'split',
      leftWidth: 620,
      left: [burn()],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\ce{H2 + O2 -> H2O}'] },
        { kind: 'table', id: 't', head: ['Element', 'Left', 'Right'], rows: [['H', '$2$', '$2$'], ['O', '$2$', '$\\bad{1}$']] },
      ],
      lines: [
        { say: 'The unbalanced symbol equation for hydrogen burning is H two plus O two gives H two O.', caption: 'The unbalanced symbol equation for hydrogen burning is H₂ + O₂ → H₂O.', show: ['m', ...unbalanced] },
        { say: 'Count the atoms on each side. Hydrogen: two on the left, and two on the right.', show: 't.0', focus: 't.0' },
        { say: 'Oxygen: two on the left, but only one on the right. One oxygen atom has gone missing, so this equation breaks the law of conservation of mass.', show: 't.1', focus: ['t.1', 'h.o2'] },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 's',
          items: [
            '**Count** the atoms of each element on both sides.',
            '**Pick** an element that does not match and change a coefficient so that it does.',
            '**Count again**: the change may upset another element. Repeat until every element matches.',
            '**Check** that the coefficients are the smallest whole numbers. A coefficient of 1 is not written.',
          ],
        },
      ],
      lines: [
        { say: 'To fix it, change the coefficients only. First, count the atoms of each element on both sides.', show: 's.0' },
        { say: 'Next, pick an element that does not match, and change a coefficient so that it does.', show: 's.1' },
        { say: 'Then count again, because the change may upset another element. Repeat until every element matches.', show: 's.2' },
        { say: 'Finally, check that the coefficients are the smallest whole numbers that work. A coefficient of one is not written. In the practice questions, leave its box empty.', show: 's.3' },
      ],
    },
    {
      chapter: 'Hydrogen and oxygen',
      layout: 'split',
      leftWidth: 620,
      left: [burn()],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\ce{H2 + O2 -> 2H2O}', '\\ce{2H2 + O2 -> 2H2O}', '\\text{H: } 4 = 4 \\quad \\text{O: } 2 = 2'] }],
      lines: [
        { say: 'Back to hydrogen and oxygen. Oxygen has two atoms on the left and one on the right.', show: unbalanced, focus: ['h.o2', 'h.w1'] },
        { say: 'Write a two in front of the water. Two water molecules hold two oxygen atoms, so oxygen matches.', show: ['m.0', 'h.w2'], focus: ['m.0', 'h.w1', 'h.w2'] },
        { say: 'Count again. Now hydrogen is two on the left and four on the right. Write a two in front of the hydrogen as well.', show: ['m.1', 'h.h2'], focus: ['m.1', 'h.h1', 'h.h2'] },
        { say: 'Check: hydrogen, four equals four, and oxygen, two equals two. The balanced equation is two H two plus O two gives two H two O.', caption: 'Check: hydrogen, four equals four, and oxygen, two equals two. The balanced equation is 2H₂ + O₂ → 2H₂O.', show: 'm.2', focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Making ammonia',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{N2 + H2 -> NH3}',
            '\\text{N: 2 on the left} \\ \\Rightarrow\\ \\ce{2NH3}',
            '\\ce{2NH3}\\text{: } 2 \\times 3 = 6\\ \\text{H} \\ \\Rightarrow\\ \\ce{3H2}',
            '\\ce{N2 + 3H2 -> 2NH3} \\qquad \\text{N: } 2 = 2 \\quad \\text{H: } 6 = 6',
          ],
        },
      ],
      lines: [
        { say: 'Now balance nitrogen plus hydrogen gives ammonia, N H three.', caption: 'Now balance nitrogen plus hydrogen gives ammonia, NH₃.', show: 'm.0', focus: 'm.0' },
        { say: 'Nitrogen first. There are two nitrogen atoms on the left, so write two N H three.', caption: 'Nitrogen first. There are two nitrogen atoms on the left, so write 2NH₃.', show: 'm.1', focus: 'm.1' },
        { say: 'Two ammonia molecules hold two times three, or six hydrogen atoms. That is three hydrogen molecules, so write three H two.', caption: 'Two ammonia molecules hold two times three, or six hydrogen atoms. That is three hydrogen molecules, so write 3H₂.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: nitrogen, two equals two, and hydrogen, six equals six.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Never change subscripts',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Change coefficients, never subscripts', md: '$\\ce{H2O2}$ is hydrogen peroxide, a different substance from water. Subscripts say **what** a substance is; coefficients say **how many** particles.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\ce{H2 + O2 -> H2O2}} \\qquad \\good{\\ce{2H2 + O2 -> 2H2O}}'] },
      ],
      lines: [
        { say: 'You might be tempted to fix the oxygen by writing H two O two on the right.', caption: 'You might be tempted to fix the oxygen by writing H₂O₂ on the right.', show: 'm', focus: 'm' },
        { say: 'But H two O two is hydrogen peroxide, a different substance from water. The subscripts say what a substance is, so they never change. Only the coefficients change, because they say how many particles there are.', caption: 'But H₂O₂ is hydrogen peroxide, a different substance from water. The subscripts say what a substance is, so they never change. Only the coefficients change, because they say how many particles there are.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the balanced equation for $\\ce{Na + Cl2 -> NaCl}$, with the smallest whole-number coefficients?',
          choices: ['$\\ce{Na + Cl2 -> NaCl2}$', '$\\ce{Na + Cl2 -> 2NaCl}$', '$\\ce{4Na + 2Cl2 -> 4NaCl}$', '$\\ce{2Na + Cl2 -> 2NaCl}$'],
          answer: 3,
          working: 'Chlorine: write $\\ce{2NaCl}$. Then sodium is 2 on the right, so write $\\ce{2Na}$. Check: Na $2 = 2$, Cl $2 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the balanced equation for sodium plus chlorine gives sodium chloride, with the smallest whole-number coefficients? Pause the video and try it.', caption: 'Your turn. Which is the balanced equation for Na + Cl₂ → NaCl, with the smallest whole-number coefficients? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Chlorine comes in pairs, so write two sodium chloride. Then there are two sodium atoms on the right, so write two sodium. Choice A changes a subscript, B leaves sodium unbalanced, and C is not in the smallest numbers.', show: 'q.answer' },
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
            'A **balanced** equation has the same atoms of each element on both sides.',
            'Count, change a **coefficient**, and count again until every element matches.',
            'Never change a subscript, and use the smallest whole numbers.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A balanced equation has the same number of atoms of each element on both sides, as the conservation of mass requires.', show: 'sum.0' },
        { say: 'Count the atoms, change a coefficient, and count again, until every element matches.', show: 'sum.1' },
        { say: 'Never change a subscript, and use the smallest whole numbers. In part three, you will add state symbols to an equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
