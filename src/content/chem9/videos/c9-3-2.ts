import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-3-2',
  lessonId: 'c9-3-2',
  title: 'Balancing Equations',
  thumbnail: 'ch4',
  summary:
    'A symbol equation uses formulas, and coefficients count whole molecules. It is balanced when each kind of atom appears the same number of times on both sides, which shows conservation of mass. Balance by changing coefficients only, never the formulas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Conservation of Mass', title: 'Balancing Equations', subtitle: 'Same atoms in, same atoms out' }],
      lines: [
        { say: 'A word equation names the substances in a reaction. A symbol equation goes further: it shows the formulas, and how many of each particle react.', show: 'title' },
        { say: 'Because atoms are never created or destroyed, a symbol equation must be balanced. In this video, you will learn to count atoms and balance equations.' },
      ],
    },
    {
      chapter: 'Counting atoms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'h2', size: 'lg', lines: ['\\ce{2H2 + O2 -> 2H2O}'] },
        {
          kind: 'table',
          id: 'count',
          head: ['Atom', 'Left', 'Right'],
          rows: [
            ['H', '2 × 2 = 4', '2 × 2 = 4'],
            ['O', '2', '2 × 1 = 2'],
          ],
        },
      ],
      lines: [
        { say: 'Here is hydrogen burning in oxygen to make water. The big number in front of a formula is a coefficient. It counts whole molecules.', show: 'h2' },
        { say: 'To count the atoms, multiply the coefficient by the small number after each symbol. Hydrogen: two times two is four on the left, and two times two is four on the right.', show: ['count', 'count.0'], focus: 'count.0' },
        { say: 'Oxygen: two on the left, and two times one is two on the right. Every count matches, so the equation is balanced.', show: 'count.1', focus: 'count.1' },
      ],
    },
    {
      chapter: 'Balancing',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'ch4',
          size: 'md',
          lines: ['\\ce{CH4 + O2 -> CO2 + H2O}', '\\ce{CH4 + O2 -> CO2 + 2H2O}', '\\ce{CH4 + 2O2 -> CO2 + 2H2O}'],
        },
        { kind: 'callout', id: 'never', tone: 'mistake', title: 'Never change the formulas', md: 'Changing $\\ce{H2O}$ to $\\ce{H2O2}$ makes hydrogen peroxide, a different substance. Change only the **coefficients**.' },
      ],
      lines: [
        { say: 'Let’s balance methane burning. First, write the correct formulas, and count each kind of atom.', show: 'ch4.0' },
        { say: 'Carbon is one on each side, so it is balanced. Hydrogen is four on the left but only two on the right, so put a two in front of the water.', show: 'ch4.1' },
        { say: 'Now count oxygen on the right: two in carbon dioxide, plus two in the water, makes four. So put a two in front of the oxygen on the left.', show: 'ch4.2' },
        { say: 'Check every element again. Carbon one and one, hydrogen four and four, oxygen four and four. It is balanced.' },
        { say: 'Never change the small numbers in a formula. Changing H two O into H two O two would balance the oxygen, but it would make a completely different substance.', show: 'never' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the balanced equation for magnesium burning: $\\ce{Mg + O2 -> MgO}$?',
          choices: ['$\\ce{Mg + O2 -> MgO2}$', '$\\ce{Mg + O2 -> 2MgO}$', '$\\ce{Mg + O -> MgO}$', '$\\ce{2Mg + O2 -> 2MgO}$'],
          answer: 3,
          working: 'Put 2 in front of MgO to balance oxygen, then 2 in front of Mg to balance magnesium.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the balanced equation for magnesium burning in oxygen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. A two in front of M g O balances the oxygen, and then a two in front of M g balances the magnesium. The other options change the formulas, or leave it unbalanced.', show: 'q.answer' },
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
            'Coefficients count whole molecules.',
            'Balanced: the same number of each atom on both sides.',
            'Change coefficients only, never the formulas.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a symbol equation, coefficients count whole molecules.', show: 'sum.0' },
        { say: 'An equation is balanced when each kind of atom appears the same number of times on both sides, which shows conservation of mass.', show: 'sum.1' },
        { say: 'And you balance by changing the coefficients only, never the formulas. Next, you will sort reactions into types.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
