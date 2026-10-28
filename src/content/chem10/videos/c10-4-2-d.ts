import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-4-2-d',
  lessonId: 'c10-4-2',
  title: 'Balancing Equations, Part 4: Fuels and Polyatomic Ions',
  thumbnailTitle: 'Fuels and Polyatomic Ions',
  thumbnail: false,
  summary:
    'Balance a combustion carbon first, then hydrogen, and oxygen last: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Count a polyatomic ion such as nitrate as one unit, and if oxygen needs half a molecule, double every coefficient: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Reactions · Part 4', title: 'Fuels and Polyatomic Ions', subtitle: 'Habits for harder equations' }],
      lines: [
        { say: 'A camping stove burns propane, and a car engine burns a mixture of fuels. Their equations, and reactions of ions in solution, need a little planning.', show: 'title' },
        { say: 'In this part, you will balance combustion equations, keep polyatomic ions together, and double every coefficient when oxygen needs a half.' },
      ],
    },
    {
      chapter: 'Burning propane',
      layout: 'split',
      leftWidth: 640,
      left: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{C3H8 + O2 -> CO2 + H2O}',
            '\\text{C: } 3 \\ \\Rightarrow\\ \\ce{3CO2}',
            '\\text{H: } 8 \\ \\Rightarrow\\ \\ce{4H2O}',
            '\\text{O: } 3 \\times 2 + 4 = 10 \\ \\Rightarrow\\ \\ce{5O2}',
            '\\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}',
          ],
        },
      ],
      right: [{ kind: 'table', id: 't', head: ['Element', 'Left', 'Right'], rows: [['C', '$3$', '$3$'], ['H', '$8$', '$8$'], ['O', '$10$', '$10$']] }],
      lines: [
        { say: 'When a fuel burns, oxygen appears in both products. So balance carbon first, then hydrogen, and oxygen last.', show: 'm.0', focus: 'm.0' },
        { say: 'Propane, C three H eight, has three carbon atoms, so write three C O two.', caption: 'Propane, C₃H₈, has three carbon atoms, so write 3CO₂.', show: 'm.1', focus: 'm.1' },
        { say: 'It has eight hydrogen atoms, and each water molecule holds two, so write four H two O.', caption: 'It has eight hydrogen atoms, and each water molecule holds two, so write 4H₂O.', show: 'm.2', focus: 'm.2' },
        { say: 'Oxygen last. The right side now has three times two, plus four: ten oxygen atoms. That is five O two.', caption: 'Oxygen last. The right side now has three times two, plus four: ten oxygen atoms. That is 5O₂.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: carbon three, hydrogen eight and oxygen ten, on each side.', show: ['m.4', 't'], focus: ['m.4', 't'] },
      ],
    },
    {
      chapter: 'Keep ions together',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{Pb(NO3)2 + KI -> PbI2 + KNO3}',
            '\\ce{NO3}\\text{: 2 on the left, 1 on the right} \\ \\Rightarrow\\ \\ce{2KNO3}',
            '\\text{K: 2 on the right} \\ \\Rightarrow\\ \\ce{2KI}',
            '\\ce{Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)}',
          ],
        },
      ],
      lines: [
        { say: 'A group such as sulfate, nitrate or hydroxide often passes through a reaction unchanged. Count it as one unit, instead of counting its atoms.' },
        { say: 'Balance lead two nitrate plus potassium iodide gives lead two iodide plus potassium nitrate.', caption: 'Balance lead(II) nitrate plus potassium iodide gives lead(II) iodide plus potassium nitrate.', show: 'm.0', focus: 'm.0' },
        { say: 'Count the nitrate groups as units: two on the left, and one on the right. So write two potassium nitrate.', show: 'm.1', focus: 'm.1' },
        { say: 'Now potassium is two on the right, so write two potassium iodide. That also gives two iodine atoms, to match the lead two iodide.', caption: 'Now potassium is two on the right, so write two potassium iodide. That also gives two iodine atoms, to match the lead(II) iodide.', show: 'm.2', focus: 'm.2' },
        { say: 'The lead two iodide is a yellow precipitate, so it is solid, and the rest stay dissolved. Check: lead one, nitrogen two, oxygen six, potassium two and iodine two, on each side.', caption: 'The lead(II) iodide is a yellow precipitate, so it is solid, and the rest stay dissolved. Check: lead one, nitrogen two, oxygen six, potassium two and iodine two, on each side.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Double everything',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{C2H6 + O2 -> CO2 + H2O}',
            '\\text{C: } \\ce{2CO2} \\qquad \\text{H: } \\ce{3H2O}',
            '\\text{O: } 2 \\times 2 + 3 = 7 \\ \\Rightarrow\\ 3\\tfrac{1}{2}\\ \\ce{O2}\\ \\bad{?}',
            '\\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}',
            '\\text{C: } 4 = 4 \\quad \\text{H: } 12 = 12 \\quad \\text{O: } 14 = 14',
          ],
        },
      ],
      lines: [
        { say: 'Coefficients must be whole numbers. Try ethane, C two H six.', caption: 'Coefficients must be whole numbers. Try ethane, C₂H₆.', show: 'm.0', focus: 'm.0' },
        { say: 'Carbon: two C O two. Hydrogen: six atoms, so three H two O.', caption: 'Carbon: 2CO₂. Hydrogen: six atoms, so 3H₂O.', show: 'm.1', focus: 'm.1' },
        { say: 'Oxygen: the right side has two times two, plus three: seven atoms. That would need three and a half oxygen molecules.', show: 'm.2', focus: 'm.2' },
        { say: 'So double every coefficient: two ethane, seven oxygen, four carbon dioxide and six water.', caption: 'So double every coefficient: 2C₂H₆, 7O₂, 4CO₂ and 6H₂O.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: carbon four, hydrogen twelve and oxygen fourteen, on each side.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Butane burns completely: $\\ce{C4H10 + O2 -> CO2 + H2O}$. Which coefficients, in order, balance the equation with the smallest whole numbers?',
          choices: ['$1,\\ 9,\\ 4,\\ 5$', '$2,\\ 9,\\ 8,\\ 10$', '$2,\\ 13,\\ 8,\\ 10$', '$1,\\ 13,\\ 8,\\ 10$'],
          answer: 2,
          working: '$\\ce{4CO2}$ and $\\ce{5H2O}$ hold $8 + 5 = 13$ O atoms: $6\\tfrac{1}{2}$ $\\ce{O2}$. Doubled: $\\ce{2C4H10 + 13O2 -> 8CO2 + 10H2O}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Butane, C four H ten, burns completely to carbon dioxide and water. Which coefficients, in order, balance the equation with the smallest whole numbers? Pause the video and try it.', caption: 'Your turn. Butane, C₄H₁₀, burns completely to carbon dioxide and water. Which coefficients, in order, balance the equation with the smallest whole numbers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Four carbon dioxide and five water hold thirteen oxygen atoms, which needs six and a half oxygen molecules, so double everything. Choice B has only eighteen oxygen atoms on the left, and choice D has too few carbon atoms on the left.', show: 'q.answer' },
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
            'Combustion: balance carbon, then hydrogen, then **oxygen last**.',
            'Count a polyatomic ion, such as $\\ce{NO3}$ or $\\ce{SO4}$, as **one unit**.',
            'Leave lone elements until last, and if oxygen needs a half, **double everything**.',
            'Finish with an atom check.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To balance a combustion, do carbon, then hydrogen, and oxygen last.', show: 'sum.0' },
        { say: 'Count a polyatomic ion, such as nitrate or sulfate, as one unit.', show: 'sum.1' },
        { say: 'Leave lone elements until last, and if oxygen needs a half, double every coefficient.', show: 'sum.2' },
        { say: 'And always finish with an atom check. That completes this lesson on balancing equations.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
