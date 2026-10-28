import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chargeBars } from './lib/c10-5-figures.ts';

// Calcium nitrate: one calcium ion (2+) balances two nitrate ions (1− each).
const calcium = figure('c', [
  chargeBars({
    pos: { tex: '\\ce{Ca^2+}', charge: 2, count: 1, sum: '2+' },
    neg: { tex: '\\ce{NO3-}', charge: 1, count: 2, sum: '2-' },
  }),
]);

// Sodium sulfate: two sodium ions (1+ each) balance one sulfate ion (2−).
const sodium = figure('s', [
  chargeBars({
    pos: { tex: '\\ce{Na+}', charge: 1, count: 2, sum: '2+' },
    neg: { tex: '\\ce{SO4^2-}', charge: 2, count: 1, sum: '2-' },
  }),
]);

const video: Explainer = {
  id: 'c10-5-4-c',
  lessonId: 'c10-5-4',
  title: 'Neutralization, Part 3: Formulas of Salts',
  thumbnailTitle: 'Formulas of Salts',
  thumbnail: 'c',
  summary:
    'A salt is an ionic compound, so its formula takes just enough of each ion for the charges to add up to zero. One calcium ion (2+) needs two nitrate ions (1−), so calcium nitrate is Ca(NO₃)₂; two sodium ions balance one sulfate ion, so sodium sulfate is Na₂SO₄, and H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 3', title: 'Formulas of Salts', subtitle: 'Balancing the charges' }],
      lines: [
        { say: 'You can now name the salt that an acid and a base make. But what is its formula?', show: 'title' },
        { say: 'A salt is an ionic compound, so its formula comes from the charges of its ions, as in lesson three point two. In this part, you will write the formulas of salts, and a balanced symbol equation.' },
      ],
    },
    {
      chapter: 'Ions in salts',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Positive ion (from the base)', 'Negative ion (from the acid)'],
          rows: [
            ['sodium, $\\ce{Na+}$', 'chloride, $\\ce{Cl-}$'],
            ['potassium, $\\ce{K+}$', 'nitrate, $\\ce{NO3-}$'],
            ['calcium, $\\ce{Ca^2+}$', 'sulfate, $\\ce{SO4^2-}$'],
            ['magnesium, $\\ce{Mg^2+}$', ''],
          ],
        },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Balance the charges', md: 'Take just enough of each ion for the charges to add up to zero.' },
      ],
      lines: [
        { say: 'The positive ion comes from the base. Sodium and potassium ions are one plus. Calcium and magnesium ions are two plus.', show: 't', focus: 't' },
        { say: 'The negative ion comes from the acid. Chloride and nitrate ions are one minus, and the sulfate ion is two minus.' },
        { say: 'To write the formula, take just enough of each ion for the charges to add up to zero.', show: 'rule' },
      ],
    },
    {
      chapter: 'Calcium nitrate',
      layout: 'split',
      leftWidth: 500,
      left: [calcium],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Calcium hydroxide reacts with nitric acid. Name the salt and write its formula.' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['The salt is **calcium nitrate**: $\\ce{Ca^2+}$ and $\\ce{NO3-}$ ions.', 'One $\\ce{Ca^2+}$ needs two $\\ce{NO3-}$ ions.', 'A polyatomic ion taken more than once goes in brackets: $\\ce{Ca(NO3)2}$.'],
        },
      ],
      lines: [
        { say: 'Calcium hydroxide reacts with nitric acid. Name the salt, and write its formula.', show: 'q' },
        { say: 'The salt is calcium nitrate. It is made of calcium ions, two plus, and nitrate ions, N O three minus.', caption: 'The salt is calcium nitrate. It is made of calcium ions, 2+, and nitrate ions, NO₃⁻.', show: ['steps.0', 'c.pos0'] },
        { say: 'One calcium ion has a charge of two plus. Each nitrate ion is only one minus, so it takes two of them to balance it. Now both rows are the same length.', show: ['steps.1', 'c.neg0', 'c.neg1', 'c.pos-sum', 'c.neg-sum'], focus: ['c.neg0', 'c.neg1'] },
        { say: 'A polyatomic ion taken more than once goes in brackets. So the formula has the nitrate in brackets, with a two after it.', caption: 'A polyatomic ion taken more than once goes in brackets. So the formula is Ca(NO₃)₂.', show: 'steps.2', focus: 'steps.2' },
      ],
    },
    {
      chapter: 'Sodium sulfate',
      layout: 'split',
      leftWidth: 440,
      left: [sodium],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Sulfuric acid reacts with sodium hydroxide. Name the salt, write its formula, then the balanced symbol equation.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ce{Na2SO4}', '\\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}', '\\text{2 Na, 1 S, 4 H and 6 O each side} \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Sulfuric acid reacts with sodium hydroxide. The salt is sodium sulfate, made of sodium ions, one plus, and sulfate ions, two minus.', show: ['q', 's.neg0'] },
        { say: 'Two sodium ions balance one sulfate ion, so the formula is N A two, S O four.', caption: 'Two sodium ions balance one sulfate ion, so the formula is Na₂SO₄.', show: ['s.pos0', 's.pos1', 's.pos-sum', 's.neg-sum', 'm.0'], focus: 'm.0' },
        { say: 'Now the equation. Two sodium ions need two sodium hydroxide, and the two hydroxide ions make two water molecules.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: two sodium, one sulfur, four hydrogen and six oxygen atoms on each side. It is balanced.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Potassium hydroxide reacts with sulfuric acid. What is the formula of the salt? The ions are potassium, $\\ce{K+}$, and sulfate, $\\ce{SO4^2-}$.',
          choices: ['$\\ce{KSO4}$', '$\\ce{K2SO4}$', '$\\ce{K(SO4)2}$', '$\\ce{K2(SO4)2}$'],
          answer: 1,
          working: 'The salt is potassium sulfate. Two $\\ce{K+}$ ions (2+) balance one $\\ce{SO4^2-}$ ion (2−), so the formula is $\\ce{K2SO4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Potassium hydroxide reacts with sulfuric acid. What is the formula of the salt? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The salt is potassium sulfate, and two potassium ions, one plus each, balance one sulfate ion, two minus. Choice A has one plus and two minus, which do not add up to zero.', show: 'q.answer' },
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
            'A salt’s formula takes just enough of each ion for the charges to add up to zero.',
            'Calcium nitrate is $\\ce{Ca(NO3)2}$: one $\\ce{Ca^2+}$ and two $\\ce{NO3-}$.',
            'Sodium sulfate is $\\ce{Na2SO4}$: $\\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$.',
            'A polyatomic ion taken more than once goes in brackets.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A salt’s formula takes just enough of each ion for the charges to add up to zero.', show: 'sum.0' },
        { say: 'Calcium nitrate has one calcium ion for every two nitrate ions.', show: 'sum.1' },
        { say: 'Sodium sulfate has two sodium ions for every sulfate ion, and two sodium hydroxide neutralize one sulfuric acid.', show: 'sum.2' },
        { say: 'And a polyatomic ion taken more than once goes in brackets. In part four, you will see acids react with metal carbonates, and neutralize acids safely. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
