import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c30-2-2-b',
  lessonId: 'c30-2-2',
  title: 'Oxidation Numbers, Part 2: Compounds and Polyatomic Ions',
  thumbnailTitle: 'Compounds and Polyatomic Ions',
  thumbnail: false,
  summary:
    'Assign the atoms the rules fix, call the last one x, and use the sum: 0 for a compound (sulfur is +6 in H₂SO₄) and the charge for a polyatomic ion (chromium is +6 in Cr₂O₇²⁻, manganese +7 in MnO₄⁻). When two elements are left, the more electronegative takes its simple-ion value, such as −1 for chlorine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 2', title: 'Compounds and Polyatomic Ions', subtitle: 'Letting the sum find the last atom' }],
      lines: [
        { say: 'Sulfur is minus two in hydrogen sulfide, the gas that smells of rotten eggs. In sulfuric acid, it is plus six.', show: 'title' },
        { say: 'In this part, you will find the oxidation number of the one atom the rules leave, in compounds and in polyatomic ions.' },
      ],
    },
    {
      chapter: 'Sulfuric acid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the oxidation number of sulfur in sulfuric acid, $\\ce{H2SO4}$?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\ce{H}\\text{: } {+1} \\qquad \\ce{O}\\text{: } {-2} \\qquad \\ce{S}\\text{: } x', '2(+1) + x + 4(-2) = 0', 'x - 6 = 0', 'x = {+6}'],
        },
      ],
      lines: [
        { say: 'What is the oxidation number of sulfur in sulfuric acid, H two S O four?', caption: 'What is the oxidation number of sulfur in sulfuric acid, H₂SO₄?', show: 'q' },
        { say: 'Hydrogen is plus one, and oxygen is minus two. Sulfur is the one atom left, so call its oxidation number x.', show: 'm.0', focus: 'm.0' },
        { say: 'In a compound, the oxidation numbers add up to zero: two hydrogens at plus one, plus x, plus four oxygens at minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'That simplifies to x minus six equals zero. So sulfur is plus six.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two elements left',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two elements left', md: 'The more electronegative one takes the value it has as a simple ion: chlorine is $-1$, as in a chloride ion.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{FeCl3}\\text{: } x + 3(-1) = 0 \\;\\Rightarrow\\; \\ce{Fe}\\ {+3}', '\\ce{PCl5}\\text{: } x + 5(-1) = 0 \\;\\Rightarrow\\; \\ce{P}\\ {+5}'] },
      ],
      lines: [
        { say: 'In some compounds, two elements are left without a rule, as in iron three chloride or phosphorus pentachloride.', caption: 'In some compounds, two elements are left without a rule, as in iron(III) chloride, FeCl₃, or phosphorus pentachloride, PCl₅.', show: 'tip' },
        { say: 'Then the more electronegative one takes the value it has as a simple ion. Chlorine is minus one, as in a chloride ion.' },
        { say: 'In iron three chloride, three chlorines make minus three, so iron is plus three. That three is the Roman numeral in the name.', caption: 'In iron(III) chloride, three chlorines make −3, so iron is +3. That three is the Roman numeral in the name.', show: 'm.0', focus: 'm.0' },
        { say: 'In phosphorus pentachloride, five chlorines make minus five, so phosphorus is plus five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A polyatomic ion',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the oxidation number of chromium in the dichromate ion, $\\ce{Cr2O7^2-}$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{O}\\text{: } {-2} \\qquad \\ce{Cr}\\text{: } x \\text{ (two atoms)}', '2x + 7(-2) = {-2}', '2x - 14 = {-2} \\;\\Rightarrow\\; 2x = 12', 'x = {+6}'] },
      ],
      lines: [
        {
          say: 'Now an ion. What is the oxidation number of chromium in the dye-chromate ion, C R two O seven, two minus?',
          caption: 'Now an ion. What is the oxidation number of chromium in the dichromate ion, Cr₂O₇²⁻?',
          show: 'q',
        },
        { say: 'Oxygen is minus two. Call the oxidation number of chromium x. There are two chromium atoms, so they count as two x.', show: 'm.0', focus: 'm.0' },
        { say: 'In an ion, the oxidation numbers add up to the charge of the ion, minus two. So two x, plus seven times minus two, equals minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Two x minus fourteen is minus two, so two x is twelve, and chromium is plus six.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Adding up to zero in an ion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding up to zero in an ion', md: 'The oxidation numbers of an ion add up to its **charge**, not to 0.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{MnO4^-}', '\\bad{x + 4(-2) = 0 \\;\\Rightarrow\\; x = {+8}}', '\\good{x + 4(-2) = {-1} \\;\\Rightarrow\\; x = {+7}}'] },
      ],
      lines: [
        {
          say: 'A common slip. For the permanganate ion, M N O four minus, writing x plus four times minus two equals zero gives plus eight, which is wrong.',
          caption: 'A common slip. For the permanganate ion, MnO₄⁻, writing x + 4(−2) = 0 gives +8, which is wrong.',
          show: ['oops', 'm.0', 'm.1'],
          focus: 'm.1',
        },
        { say: 'The oxidation numbers of an ion add up to its charge, minus one. So x minus eight equals minus one, and manganese is plus seven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the oxidation number of nitrogen in the nitrate ion, $\\ce{NO3^-}$?',
          choices: ['$+5$', '$+6$', '$-1$', '$+7$'],
          answer: 0,
          working: 'Oxygen is $-2$. The sum is the charge of the ion: $x + 3(-2) = -1$, so $x - 6 = -1$ and nitrogen is $+5$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the oxidation number of nitrogen in the nitrate ion, N O three minus? Pause the video and try it.', caption: 'Your turn. What is the oxidation number of nitrogen in the nitrate ion, NO₃⁻? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, plus five. Three oxygens make minus six, and the sum must be the charge of the ion, minus one. Choice B, plus six, makes the sum zero, as if the ion had no charge.', show: 'q.answer' },
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
            'Assign the atoms the rules fix, and call the last one $x$.',
            'In a compound the sum is $0$: sulfur is $+6$ in $\\ce{H2SO4}$. With two elements left, chlorine is $-1$.',
            'In a polyatomic ion the sum is its **charge**: manganese is $+7$ in $\\ce{MnO4^-}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Assign the atoms the rules fix, and call the last one x.', show: 'sum.0' },
        { say: 'In a compound, the sum is zero. With two elements left, the more electronegative one, such as chlorine, takes its simple ion value.', show: 'sum.1' },
        { say: 'In a polyatomic ion, the sum is the ion’s charge. In part three, you will meet the exceptions: peroxides, metal hydrides, and averages. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
