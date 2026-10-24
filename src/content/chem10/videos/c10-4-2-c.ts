import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, mol, plus, row, stack, water } from './lib/c10-4-figures.ts';

// Sodium and water: each sodium hydroxide takes the OH of one water molecule, and the two hydrogen
// atoms left over pair up as one hydrogen molecule.
const naWater = figure(
  'na',
  [row({ terms: [stack(mol('na1', ['Na']), mol('na2', ['Na'])), plus('p1'), stack(water('w1'), water('w2')), arrow('arr'), stack(mol('s1', ['Na', 'O', 'H']), mol('s2', ['Na', 'O', 'H'])), plus('p2'), mol('h2', ['H', 'H'])] })],
  300,
);

const video: Explainer = {
  id: 'c10-4-2-c',
  lessonId: 'c10-4-2',
  title: 'Balancing Equations, Part 3: State Symbols',
  thumbnailTitle: 'State Symbols',
  thumbnail: 'na',
  summary:
    'State symbols show whether each substance is a solid (s), a liquid (l), a gas (g) or dissolved in water (aq). Water on its own is (l) but a solution is (aq), and a precipitate is (s). Balancing sodium and water, with the lone element left until last, gives 2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 3', title: 'State Symbols', subtitle: 'Solid, liquid, gas or dissolved' }],
      lines: [
        { say: 'Drop zinc into acid, and you see a solid fizzing in a liquid as a gas bubbles off. A symbol equation can show all of that.', show: 'title' },
        { say: 'In this part, you will add state symbols to an equation, tell a liquid from a solution, and balance the reaction of sodium with water.' },
      ],
    },
    {
      chapter: 'Four state symbols',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'State symbols', md: '**(s)** solid, **(l)** liquid, **(g)** gas, and **(aq)** aqueous: dissolved in water. A **precipitate**, a solid that forms when two solutions are mixed, is (s).' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Zn(s) + 2HCl(aq) -> ZnCl2(aq) + H2(g)}'] },
      ],
      lines: [
        { say: 'A state symbol in brackets after a formula shows the state of each substance. S is solid, L is liquid, G is gas, and A Q, aqueous, means dissolved in water.', caption: 'A state symbol in brackets after a formula shows the state of each substance. (s) is solid, (l) is liquid, (g) is gas, and (aq), aqueous, means dissolved in water.', show: 'def' },
        { say: 'This equation says that solid zinc reacts with hydrochloric acid, which is hydrogen chloride dissolved in water.', show: 'm', focus: 'm' },
        { say: 'It makes zinc chloride, which stays dissolved, and hydrogen gas. And a solid that forms when two solutions are mixed, a precipitate, is S.', caption: 'It makes zinc chloride, which stays dissolved, and hydrogen gas. And a solid that forms when two solutions are mixed, a precipitate, is (s).' },
      ],
    },
    {
      chapter: 'Liquid or aqueous?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Liquid or aqueous?', md: 'Water on its own is a liquid. A substance **dissolved** in water is aqueous, even though the solution is a liquid. Use (l) only for a pure liquid, such as water or a molten metal.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H2O(l)} \\qquad \\ce{NaCl(aq)}, \\ \\text{not } \\bad{\\ce{NaCl(l)}}'] },
      ],
      lines: [
        { say: 'Take care with liquid and aqueous. Water on its own is a liquid, so it is H two O, L.', caption: 'Take care with liquid and aqueous. Water on its own is a liquid, so it is H₂O(l).', show: ['oops', 'm'] },
        { say: 'But a substance dissolved in water is aqueous, even though the solution is a liquid. Salt water is sodium chloride, A Q, not sodium chloride, L.', caption: 'But a substance dissolved in water is aqueous, even though the solution is a liquid. Salt water is NaCl(aq), not NaCl(l).', focus: 'm' },
        { say: 'Use L only for a pure liquid, such as water or a molten metal.', caption: 'Use (l) only for a pure liquid, such as water or a molten metal.' },
      ],
    },
    {
      chapter: 'Sodium and water',
      layout: 'center',
      main: [naWater, { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Na + H2O -> NaOH + H2}', '\\ce{2Na + 2H2O -> 2NaOH + H2}'] }],
      lines: [
        { say: 'Now balance sodium plus water gives sodium hydroxide plus hydrogen.', show: 'm.0', focus: 'm.0' },
        { say: 'Think of water as H, O H. Each sodium hydroxide takes the O H group of one water molecule, and that leaves one hydrogen atom behind.', caption: 'Think of water as H–OH. Each sodium hydroxide takes the OH group of one water molecule, and that leaves one hydrogen atom behind.', show: ['na.w1', 'na.arr', 'na.s1'], focus: ['na.w1', 'na.s1'] },
        { say: 'But hydrogen is given off in pairs, as H two. So two water molecules are needed. They give two sodium hydroxide and one hydrogen molecule.', caption: 'But hydrogen is given off in pairs, as H₂. So two water molecules are needed. They give two sodium hydroxide and one hydrogen molecule.', show: ['na.w2', 'na.s2', 'na.p2', 'na.h2'], focus: ['na.w2', 'na.s2', 'na.h2'] },
        { say: 'Sodium is a lone element, written on its own, so it was left until last. Two sodium hydroxide hold two sodium atoms, so write two sodium.', show: ['na.na1', 'na.na2', 'na.p1', 'm.1'], focus: ['na.na1', 'na.na2', 'm.1'] },
        { say: 'Check: sodium, two equals two. Hydrogen, four equals four. Oxygen, two equals two.', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Adding the states',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Substance', 'State', 'Symbol'],
          rows: [
            ['sodium', 'solid', '(s)'],
            ['water', 'a pure liquid', '(l)'],
            ['sodium hydroxide', 'dissolves as it forms', '(aq)'],
            ['hydrogen', 'fizzes off as a gas', '(g)'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{2Na(s) + 2H2O(l) -> 2NaOH(aq) + H2(g)}'] },
      ],
      lines: [
        { say: 'Now add the states. Sodium is a solid, and water is a pure liquid.', show: ['t.0', 't.1'] },
        { say: 'The sodium hydroxide dissolves in the water as it forms, so it is aqueous. And the hydrogen fizzes off as a gas.', show: ['t.2', 't.3'] },
        { say: 'So the full equation is two sodium, solid, plus two water, liquid, gives two sodium hydroxide, aqueous, plus hydrogen gas.', caption: 'So the full equation is 2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g).', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\ce{CuSO4(aq) + 2NaOH(aq) -> Cu(OH)2 + Na2SO4(aq)}$, the copper(II) hydroxide forms as a pale blue precipitate. Which state symbol goes after $\\ce{Cu(OH)2}$?',
          choices: ['(s)', '(l)', '(g)', '(aq)'],
          answer: 0,
          working: 'A precipitate is a solid that forms when two solutions are mixed, so it is (s).',
        },
      ],
      lines: [
        { say: 'Your turn. Copper two sulfate solution reacts with sodium hydroxide solution, and the copper two hydroxide forms as a pale blue precipitate. Which state symbol goes after the copper two hydroxide? Pause the video and try it.', caption: 'Your turn. Copper(II) sulfate solution reacts with sodium hydroxide solution, and the copper(II) hydroxide forms as a pale blue precipitate. Which state symbol goes after Cu(OH)₂? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, S. A precipitate is a solid that forms when two solutions are mixed. Choice D, A Q, would mean it stayed dissolved, but a precipitate has come out of the solution.', caption: 'The answer is A, (s). A precipitate is a solid that forms when two solutions are mixed. Choice D, (aq), would mean it stayed dissolved, but a precipitate has come out of the solution.', show: 'q.answer' },
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
            '**(s)** solid, **(l)** liquid, **(g)** gas, **(aq)** dissolved in water.',
            'Water alone is (l); a solution is (aq); a precipitate is (s).',
            'Leave a lone element, such as $\\ce{Na}$ or $\\ce{H2}$, until last.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The state symbols are S for solid, L for liquid, G for gas, and A Q for dissolved in water.', caption: 'Let’s sum up. The state symbols are (s) for solid, (l) for liquid, (g) for gas, and (aq) for dissolved in water.', show: 'sum.0' },
        { say: 'Water on its own is a liquid, a solution is aqueous, and a precipitate is a solid.', show: 'sum.1' },
        { say: 'When balancing, leave a lone element until last. In part four, you will balance fuels and equations with polyatomic ions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
