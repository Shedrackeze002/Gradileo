import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-3-6-d',
  lessonId: 'c20-3-6',
  title: 'Acids, Bases and Neutralisation, Part 4: Salt and Water',
  thumbnailTitle: 'Salt and Water',
  thumbnail: false,
  summary:
    'In neutralisation, hydroxide ions take hydrogen ions from hydronium ions, forming water: an acid and a hydroxide base make a salt and water. The salt holds the metal ion from the base and the anion from the acid, such as calcium nitrate, Ca(NO₃)₂. To balance, match the metal and the anion first, then add one water molecule for each hydrogen ion neutralised.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter as Solutions, Acids and Bases · Part 4', title: 'Salt and Water', subtitle: 'Neutralisation' }],
      lines: [
        { say: 'Acids and bases cancel each other out. Add a base to an acid, and the acid loses its acidic properties. So where do its ions go, and what is left behind?', show: 'title' },
        { say: 'In this part, you will see what happens, predict the salt that forms, and balance the equation.' },
      ],
    },
    {
      chapter: 'Neutralisation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H3O+(aq) + OH-(aq) -> 2H2O(l)}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Neutralisation', md: '**Neutralisation** is the reaction of an acid with a base. An acid and a hydroxide base make a salt and water: acid + hydroxide base → salt + water.' },
        { kind: 'callout', id: 'salt', tone: 'definition', title: 'Salt', md: 'A **salt** is an ionic compound. The salt from a neutralisation is made of the **metal ion from the base** and the **anion from the acid**.' },
      ],
      lines: [
        { say: 'Add a base to an acid, and the hydroxide ions take the hydrogen ions from the hydronium ions, forming water.', show: 'm' },
        { say: 'The ions that made one solution acidic and the other basic are used up. This is neutralisation: the reaction of an acid with a base. An acid and a hydroxide base make a salt and water.', show: 'def' },
        { say: 'A salt is an ionic compound. The salt from a neutralisation is made of the metal ion from the base, and the anion from the acid.', show: 'salt' },
      ],
    },
    {
      chapter: 'Writing the salt',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Acid', '$\\ce{HCl}$', '$\\ce{HBr}$', '$\\ce{HNO3}$', '$\\ce{H2SO4}$', '$\\ce{H3PO4}$'],
          rows: [['Anion', 'chloride, $\\ce{Cl-}$', 'bromide, $\\ce{Br-}$', 'nitrate, $\\ce{NO3-}$', 'sulfate, $\\ce{SO4^2-}$', 'phosphate, $\\ce{PO4^3-}$']],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{HBr(aq) + KOH(aq) -> KBr(aq) + H2O(l)}', '\\ce{HNO3(aq) + Ca(OH)2(s) ->} \\text{ salt: } \\good{\\ce{Ca(NO3)2}}'] },
      ],
      lines: [
        { say: 'The anion is what is left of the acid once its hydrogen ions are gone: chloride, bromide, nitrate, sulfate or phosphate.', show: 't' },
        { say: 'Write the salt’s formula with the fewest ions whose charges cancel. Hydrobromic acid and potassium hydroxide make potassium bromide: one potassium ion balances one bromide ion.', show: 'm.0', focus: 'm.0' },
        { say: 'Nitric acid and calcium hydroxide: the metal ion is calcium, two plus, and the anion is nitrate, one minus. Two nitrate ions balance one calcium ion.', show: 'm.1', focus: 'm.1' },
        { say: 'A polyatomic ion taken more than once goes in brackets, so the salt is calcium nitrate, C a, N O three in brackets, two.', caption: 'A polyatomic ion taken more than once goes in brackets, so the salt is calcium nitrate, Ca(NO₃)₂.' },
        { say: 'Calcium hydroxide has low solubility, so it is written as a solid. It still neutralises the acid: it dissolves as its hydroxide ions react.' },
      ],
    },
    {
      chapter: 'Balancing a neutralisation',
      layout: 'center',
      main: [
        { kind: 'text', id: 'k', size: 'md', align: 'center', md: 'Match the metal and the anion first, then add one $\\ce{H2O}$ for each $\\ce{H+}$ neutralised.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}', '\\ce{2H3PO4 + 3Ca(OH)2 -> Ca3(PO4)2 + 6H2O}'] },
      ],
      lines: [
        { say: 'To balance, write the salt’s formula, then match the metal and the anion, then count the water.', show: 'k' },
        { say: 'Sulfuric acid and sodium hydroxide make sodium sulfate. Two sodium ions balance one sulfate ion, so you need two sodium hydroxide, and one sulfuric acid.', show: 'm.0', focus: 'm.0' },
        { say: 'Sulfuric acid gives up two hydrogen ions, which meet the two hydroxide ions: two water molecules. Check: four hydrogen and six oxygen atoms on each side.' },
        { say: 'Phosphoric acid and calcium hydroxide make calcium phosphate. Three calcium ions, six plus, balance two phosphate ions, six minus. So: three calcium hydroxide, and two phosphoric acid.', show: 'm.1', focus: 'm.1' },
        { say: 'Two phosphoric acid molecules give up six hydrogen ions, which meet six hydroxide ions, making six water molecules.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Phosphoric acid is neutralised by potassium hydroxide: $\\ce{H3PO4 + KOH -> K3PO4 + H2O}$. What are the coefficients of the balanced equation, in order?',
          choices: ['$1,\\ 1,\\ 1,\\ 1$', '$1,\\ 3,\\ 1,\\ 3$', '$1,\\ 3,\\ 1,\\ 1$', '$3,\\ 1,\\ 1,\\ 3$'],
          answer: 1,
          working: 'Three $\\ce{K+}$ balance one $\\ce{PO4^3-}$, so the salt is $\\ce{K3PO4}$ and needs $\\ce{3KOH}$. $\\ce{H3PO4}$ gives up 3 $\\ce{H+}$, making 3 $\\ce{H2O}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Phosphoric acid is neutralised by potassium hydroxide, making potassium phosphate and water. What are the coefficients of the balanced equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: one, three, one, three. Three potassium ions balance one phosphate ion, so you need three potassium hydroxide. Phosphoric acid gives up three hydrogen ions, making three water molecules. Choice C forgets to count the water.', show: 'q.answer' },
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
            'Neutralisation: $\\ce{H3O+ + OH- -> 2H2O}$, so acid + hydroxide base → salt + water.',
            'The salt holds the metal ion from the base and the anion from the acid.',
            'To balance, match the metal and the anion first, then add one $\\ce{H2O}$ for each $\\ce{H+}$ neutralised.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In neutralisation, hydronium and hydroxide ions form water, so an acid and a hydroxide base make a salt and water.', show: 'sum.0' },
        { say: 'The salt holds the metal ion from the base, and the anion from the acid.', show: 'sum.1' },
        { say: 'To balance, match the metal and the anion first, then add one water molecule for each hydrogen ion neutralised. That completes this lesson on acids, bases and neutralisation. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
