import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-5-2',
  lessonId: 'cx-5-2',
  title: 'Transition Metals',
  thumbnail: false,
  summary:
    'The transition metals sit in the middle block of the periodic table. Compared with the alkali metals they have higher melting points and densities, are stronger and harder, and react much more slowly. They form coloured compounds and ions with different charges, shown by Roman numerals in names, and they are useful catalysts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atoms, Structures and the Periodic Table', title: 'Transition Metals', subtitle: 'Iron for bridges, sodium under oil' }],
      lines: [
        { say: 'Iron girders hold up bridges. Sodium is kept under oil, because it reacts with the moisture in the air. Both are metals, from very different parts of the periodic table.', show: 'title' },
        { say: 'In this lesson, you will compare the transition metals with the alkali metals, and meet the properties of their compounds.' },
      ],
    },
    {
      chapter: 'Comparing the metals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Transition metals', md: 'The large block of metals in the **middle** of the periodic table, between Group 2 and Group 3: iron, copper, nickel, chromium and others.' },
        { kind: 'table', id: 't', head: ['', 'Transition metals', 'Alkali metals'], rows: [['Melting point', 'High', 'Low'], ['Density', 'High', 'Low'], ['Strength', 'Strong and hard', 'Soft'], ['Reaction with water', 'Slow, if at all', 'Vigorous']] },
      ],
      lines: [
        { say: 'The transition metals are the large block in the middle of the periodic table, between Group two and Group three.', caption: 'The transition metals are the large block in the middle of the periodic table, between Group 2 and Group 3.', show: 'def' },
        { say: 'Compared with the alkali metals of Group one, they have much higher melting points and densities.', caption: 'Compared with the alkali metals of Group 1, they have much higher melting points and densities.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'They are strong and hard, where the alkali metals are soft enough to cut with a knife.', show: 't.2', focus: 't.2' },
        { say: 'And they react slowly with water and oxygen, if at all, while the alkali metals fizz and dart about on water.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Their compounds',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Coloured compounds: copper(II) sulfate is blue', 'Ions with different charges: Fe²⁺ and Fe³⁺', 'Useful catalysts: iron in the Haber process'] }],
      lines: [
        { say: 'Transition metals form coloured compounds. Copper two sulfate is blue, and iron three compounds are orange-brown. Alkali metal compounds are white.', caption: 'Transition metals form coloured compounds. Copper(II) sulfate is blue, and iron(III) compounds are orange-brown. Alkali metal compounds are white.', show: 'b.0' },
        { say: 'They form ions with different charges. Iron forms both iron two plus and iron three plus ions.', caption: 'They form ions with different charges. Iron forms both Fe²⁺ and Fe³⁺ ions.', show: 'b.1' },
        { say: 'And they, and their compounds, are useful catalysts. Iron is the catalyst in the Haber process.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Roman numerals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Roman numerals in names', md: 'The numeral gives the **charge** on the metal ion: iron(III) contains $\\ce{Fe^3+}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Cu^2+} + 2\\,\\ce{Cl-} \\rightarrow \\ce{CuCl2}'] },
      ],
      lines: [
        { say: 'In a name such as iron three oxide, the Roman numeral gives the charge on the metal ion. Iron three means iron three plus.', caption: 'In a name such as iron(III) oxide, the Roman numeral gives the charge on the metal ion. Iron(III) means Fe³⁺.', show: 'def' },
        { say: 'So for copper two chloride, the copper ion is two plus, and two chloride ions balance it. The formula is C u C l two.', caption: 'So for copper(II) chloride, the copper ion is Cu²⁺, and two Cl⁻ ions balance it. The formula is CuCl₂.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'The numeral is the charge', md: 'Iron(III) oxide is not $\\ce{FeO3}$. Balance the charges: two $\\ce{Fe^3+}$ (6+) with three $\\ce{O^2-}$ (6−) gives $\\ce{Fe2O3}$.' }],
      lines: [{ say: 'A common mistake is to read the numeral as the number of atoms. Iron three oxide is not F e O three. Two iron three plus ions balance three oxide ions, giving F e two O three.', caption: 'A common mistake is to read the numeral as the number of atoms. Iron(III) oxide is not FeO₃. Two Fe³⁺ ions balance three O²⁻ ions, giving Fe₂O₃.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A metal melts at 1455 °C, has a density of 8.9 g/cm³ and does not react with cold water. Which is it most likely to be?',
          choices: ['Sodium', 'Potassium', 'Nickel', 'Lithium'],
          answer: 2,
          working: 'A high melting point, a high density and no reaction with water are the properties of a **transition metal**.',
        },
      ],
      lines: [
        { say: 'Your turn. A metal melts at one thousand four hundred fifty-five degrees Celsius, has a density of eight point nine grams per cubic centimetre, and does not react with cold water. Which is it most likely to be? Pause the video and try it.', caption: 'Your turn. A metal melts at 1455 °C, has a density of 8.9 g/cm³, and does not react with cold water. Which is it most likely to be? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, nickel. Its high melting point, high density and lack of reaction are typical of a transition metal. The other three are alkali metals.', show: 'q.answer' },
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
          items: ['Transition metals are in the middle block of the table.', 'Higher melting points and densities than alkali metals; less reactive.', 'Coloured compounds, ions of different charges, useful catalysts.', 'A Roman numeral gives the charge on the metal ion.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The transition metals are in the middle block of the periodic table.', show: 'sum.0' },
        { say: 'They have higher melting points and densities than the alkali metals, and are much less reactive.', show: 'sum.1' },
        { say: 'They form coloured compounds and ions with different charges, and they are useful catalysts.', show: 'sum.2' },
        { say: 'And a Roman numeral in a name gives the charge on the metal ion.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
