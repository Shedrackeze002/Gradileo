import type { Explainer } from '@/video/script.ts';

/** A symbol with its oxidation number above it. */
const on = (sym: string, v: string) => `\\overset{${v}}{\\mathrm{${sym}}}`;
/** Atoms of a formula with their oxidation numbers, spaced so the numbers do not touch. */
const ons = (...atoms: string[]) => atoms.join('\\,');

const video: Explainer = {
  id: 'c30-2-2-d',
  lessonId: 'c30-2-2',
  title: 'Oxidation Numbers, Part 4: Oxidation Numbers and Redox',
  thumbnailTitle: 'Oxidation Numbers and Redox',
  thumbnail: false,
  summary:
    'Oxidation is an increase in oxidation number and reduction is a decrease; a reaction is redox only when some oxidation numbers change. Carbon goes from −4 to +4 as methane burns, while AgNO₃ + NaCl → AgCl + NaNO₃ changes none. The oxidising agent is the reactant containing the element reduced, such as HNO₃ when copper dissolves in nitric acid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 4', title: 'Oxidation Numbers and Redox', subtitle: 'Up is oxidation, down is reduction' }],
      lines: [
        { say: 'Back to burning methane. No ion appears anywhere in the equation, so how can you tell that carbon is oxidised?', show: 'title' },
        { say: 'In this part, you will use changes in oxidation numbers to decide whether a reaction is redox, what is oxidised and reduced, and which reactants are the agents.' },
      ],
    },
    {
      chapter: 'Up and down',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Oxidation and reduction by oxidation numbers', md: '**Oxidation** is an [[opp:increase]] in oxidation number; **reduction** is a [[adj:decrease]]. A reaction is **redox** when the oxidation numbers of some elements change.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Fe -> Fe^2+ + 2e-} \\qquad 0 \\to {+2}'] },
      ],
      lines: [
        { say: 'Losing electrons makes an atom’s oxidation number go up. An iron atom, zero, loses two electrons and becomes plus two. Gaining electrons makes it go down.', show: 'm' },
        { say: 'So oxidation is an increase in oxidation number, and reduction is a decrease. A reaction is redox when the oxidation numbers of some elements change. The test works for molecules too.', show: 'def' },
      ],
    },
    {
      chapter: 'Burning methane',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            `${on('C', '\\opp{-4}')}\\,${on('H', '+1')}_4 + 2\\,${on('O', '\\adj{0}')}_2 \\longrightarrow ${on('C', '\\opp{+4}')}\\,${on('O', '\\adj{-2}')}_2 + 2\\,${on('H', '+1')}_2\\,${on('O', '\\adj{-2}')}`,
            '\\text{C: } {-4} \\to {+4} \\quad \\opp{\\text{oxidised}}',
            '\\text{O: } 0 \\to {-2} \\quad \\adj{\\text{reduced}}',
            '\\text{H: } {+1} \\text{ throughout}',
          ],
        },
      ],
      lines: [
        { say: 'Methane plus two oxygen gives carbon dye-oxide plus two water. Here are the oxidation numbers of every atom.', caption: 'CH₄ + 2O₂ → CO₂ + 2H₂O. Here are the oxidation numbers of every atom.', show: 'm.0' },
        { say: 'In methane, hydrogen is plus one, so carbon is minus four. In carbon dye-oxide, carbon is plus four. It goes up by eight: carbon is oxidised.', caption: 'In methane, hydrogen is +1, so carbon is −4. In carbon dioxide, carbon is +4. It goes up by eight: carbon is oxidised.', show: 'm.1', focus: 'm.1' },
        { say: 'Oxygen goes from zero in oxygen gas to minus two in both products: it is reduced.', show: 'm.2', focus: 'm.2' },
        { say: 'Hydrogen stays plus one. Oxidation numbers change, so burning methane is a redox reaction.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Is it redox?',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{AgNO3 + NaCl -> AgCl + NaNO3}',
            `${ons(on('Ag', '+1'), on('N', '+5'), on('O', '-2'))}_3 + ${ons(on('Na', '+1'), on('Cl', '-1'))}`,
            `\\longrightarrow ${ons(on('Ag', '+1'), on('Cl', '-1'))} + ${ons(on('Na', '+1'), on('N', '+5'), on('O', '-2'))}_3`,
          ],
        },
        { kind: 'text', id: 'no', size: 'md', align: 'center', md: 'No oxidation number changes: **not** redox. The ions swap partners.' },
      ],
      lines: [
        {
          say: 'Is silver nitrate plus sodium chloride, giving silver chloride plus sodium nitrate, a redox reaction?',
          caption: 'Is AgNO₃ + NaCl → AgCl + NaNO₃ a redox reaction?',
          show: 'm.0',
        },
        { say: 'In the reactants: silver plus one, nitrogen plus five, oxygen minus two, sodium plus one, and chlorine minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'In the products: silver plus one, chlorine minus one, sodium plus one, nitrogen plus five, and oxygen minus two.', show: 'm.2', focus: 'm.2' },
        { say: 'No oxidation number changes, so it is not a redox reaction. It is a double replacement: the ions swap partners.', show: 'no' },
      ],
    },
    {
      chapter: 'Finding the agents',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '\\ce{3Cu + 8HNO3 -> 3Cu(NO3)2 + 2NO + 4H2O}',
            '\\ce{Cu}\\text{: } 0 \\to {+2} \\quad \\opp{\\text{oxidised}}',
            '\\ce{N}\\text{: } {+5} \\ (\\ce{HNO3}) \\to {+2} \\ (\\ce{NO}) \\quad \\adj{\\text{reduced}}',
            '\\text{Oxidising agent: } \\adj{\\ce{HNO3}} \\qquad \\text{Reducing agent: } \\opp{\\ce{Cu}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Copper dissolves in dilute nitric acid: three copper plus eight H N O three gives three copper two nitrate, plus two nitrogen monoxide, plus four water. Find the agents.',
          caption: 'Copper dissolves in dilute nitric acid: 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O. Find the agents.',
          show: 'm.0',
        },
        { say: 'Copper goes from zero to plus two: it is oxidised.', show: 'm.1', focus: 'm.1' },
        {
          say: 'Nitrogen is plus five in nitric acid and plus two in nitrogen monoxide: it is reduced. The nitrogen in the nitrate ions of copper two nitrate stays plus five. Hydrogen and oxygen do not change.',
          caption: 'Nitrogen is +5 in HNO₃ and +2 in NO: it is reduced. The nitrogen in the nitrate ions of Cu(NO₃)₂ stays +5. Hydrogen and oxygen do not change.',
          show: 'm.2',
          focus: 'm.2',
        },
        {
          say: 'The agents are reactants. The oxidising agent is nitric acid, the reactant containing the nitrogen reduced. The reducing agent is copper. Say nitric acid, not nitrogen: an agent is a substance you could put in a bottle.',
          show: 'm.3',
          focus: 'm.3',
        },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In the reaction $\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$, which reactant is the **oxidising agent**?',
          choices: ['$\\ce{CO}$', '$\\ce{Fe2O3}$', '$\\ce{Fe}$', '$\\ce{CO2}$'],
          answer: 1,
          working: 'Iron goes from $+3$ in $\\ce{Fe2O3}$ to $0$: it is reduced, so $\\ce{Fe2O3}$, the reactant containing it, is the oxidising agent. Carbon goes from $+2$ in $\\ce{CO}$ to $+4$ in $\\ce{CO2}$, so $\\ce{CO}$ is the reducing agent.',
        },
      ],
      lines: [
        {
          say: 'Your turn. In the reaction iron three oxide, plus three carbon monoxide, gives two iron, plus three carbon dye-oxide, which reactant is the oxidising agent? Pause the video and try it.',
          caption: 'Your turn. In the reaction Fe₂O₃ + 3CO → 2Fe + 3CO₂, which reactant is the oxidising agent? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        {
          say: 'The answer is B, iron three oxide. Iron goes from plus three to zero: it is reduced, so the reactant containing it is the oxidising agent. Carbon goes from plus two to plus four, so choice A, carbon monoxide, is the reducing agent.',
          caption: 'The answer is B, iron(III) oxide. Iron goes from +3 to 0: it is reduced, so the reactant containing it is the oxidising agent. Carbon goes from +2 to +4, so choice A, carbon monoxide, is the reducing agent.',
          show: 'q.answer',
        },
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
            '**Oxidation** is an increase in oxidation number; **reduction** is a decrease.',
            'If no oxidation number changes, the reaction is **not** redox.',
            'The oxidising agent is the **reactant** containing the element reduced; the reducing agent contains the element oxidised.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Oxidation is an increase in oxidation number, and reduction is a decrease.', show: 'sum.0' },
        { say: 'If no oxidation number changes, the reaction is not redox.', show: 'sum.1' },
        { say: 'The agents are the reactants containing the elements reduced and oxidised. That completes oxidation numbers. Next, you will predict which redox reactions happen at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
