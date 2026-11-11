import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-2-4',
  lessonId: 'c9-2-4',
  title: 'Relative Formula Mass',
  thumbnail: 'mr',
  summary:
    'The relative formula mass of a compound is the sum of the relative atomic masses of every atom in its formula; a number after a bracket multiplies everything inside. The percentage by mass of an element is its share of the formula mass, times 100.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulas and Names', title: 'Relative Formula Mass', subtitle: 'Comparing the masses of compounds' }],
      lines: [
        { say: 'Atoms are far too small to weigh one at a time, but chemists can still compare their masses.', show: 'title' },
        { say: 'In this video, you will work out the relative formula mass of a compound, and what percentage of its mass comes from each element.' },
      ],
    },
    {
      chapter: 'Relative formula mass',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Relative formula mass', md: 'The **sum** of the relative atomic masses, $A_r$, of **all the atoms** in the formula.' },
        {
          kind: 'math',
          id: 'mr',
          size: 'md',
          lines: [
            '\\ce{H2O}: \\; 2 \\times 1 + 16 = 18',
            '\\ce{CO2}: \\; 12 + 2 \\times 16 = 44',
            '\\ce{Ca(OH)2}: \\; 40 + 2 \\times 16 + 2 \\times 1 = 74',
          ],
        },
      ],
      lines: [
        { say: 'The relative atomic mass compares the mass of an element’s atoms. Carbon is twelve and hydrogen is one, so a carbon atom is about twelve times as heavy as a hydrogen atom.', show: 'def' },
        { say: 'The relative formula mass of a compound is the sum of the relative atomic masses of all the atoms in its formula.' },
        { say: 'Water, H two O, has two hydrogen atoms at one each, and one oxygen at sixteen. Two plus sixteen is eighteen.', show: 'mr.0' },
        { say: 'Carbon dioxide has one carbon at twelve and two oxygens at sixteen each. Twelve plus thirty-two is forty-four. Be careful to count the oxygen twice.', show: 'mr.1' },
        { say: 'A number after a bracket multiplies everything inside. Calcium hydroxide has one calcium at forty, two oxygens and two hydrogens: forty plus thirty-two plus two is seventy-four.', show: 'mr.2' },
      ],
    },
    {
      chapter: 'Percentage by mass',
      layout: 'center',
      main: [
        { kind: 'math', id: 'pc', size: 'md', lines: ['\\%\\text{ by mass} = \\dfrac{A_r \\times \\text{number of atoms}}{M_r} \\times 100'] },
        { kind: 'math', id: 'o', size: 'md', lines: ['\\text{O in } \\ce{CO2}: \\; \\dfrac{32}{44} \\times 100 = 72.7\\%'] },
      ],
      lines: [
        { say: 'To find what percentage of a compound’s mass comes from one element, take the mass of that element in the formula, divide by the relative formula mass, and multiply by one hundred.', show: 'pc' },
        { say: 'In carbon dioxide, the oxygen contributes thirty-two out of forty-four. Thirty-two divided by forty-four, times one hundred, is about seventy-two point seven percent.', show: 'o' },
        { say: 'This matters in real life. A farmer comparing fertilizers wants the one with the highest percentage of nitrogen.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $M_r$ of magnesium oxide, MgO. ($A_r$: Mg = 24, O = 16.)',
          choices: ['24', '16', '40', '56'],
          answer: 2,
          working: '$M_r = 24 + 16 = 40$.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium is twenty-four and oxygen is sixteen. What is the relative formula mass of magnesium oxide, M g O? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. One magnesium and one oxygen: twenty-four plus sixteen is forty.', show: 'q.answer' },
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
            '$M_r$ = sum of the $A_r$ of every atom.',
            'A number after a bracket multiplies everything inside.',
            '% by mass = (mass of the element ÷ $M_r$) × 100.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The relative formula mass is the sum of the relative atomic masses of every atom in the formula.', show: 'sum.0' },
        { say: 'A number after a bracket multiplies everything inside it.', show: 'sum.1' },
        { say: 'And the percentage by mass is the element’s share of the formula mass, times one hundred. Next, you will see why mass is never lost in a reaction.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
