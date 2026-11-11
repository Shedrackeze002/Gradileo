import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-1-2',
  lessonId: 'cx-1-2',
  title: 'Extracting Metals from Their Ores',
  thumbnailTitle: 'Extracting Metals',
  thumbnail: false,
  summary:
    'A metal’s place in the reactivity series decides how it is extracted: metals below carbon by heating their oxides with carbon, metals above carbon by electrolysis, and gold is found native. Extraction is a reduction, and the formula of an oxide gives the greatest mass of metal an ore can yield.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Metals and Their Reactions', title: 'Extracting Metals', subtitle: 'From rock to metal' }],
      lines: [
        { say: 'Almost every metal object around you began as rock. A few metals, such as gold, lie in the ground as the metal itself, but most are locked in compounds.', show: 'title' },
        { say: 'In this lesson, you will choose how a metal is extracted, explain the choice, and calculate how much metal an ore can give.' },
      ],
    },
    {
      chapter: 'Ores and extraction',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ore', tone: 'definition', title: 'Ore', md: 'A rock that contains enough of a metal, or of a metal compound, to make extracting the metal worthwhile.' },
        { kind: 'callout', id: 'ext', tone: 'definition', title: 'Extraction', md: 'Getting a metal out of its compound. The oxide **loses oxygen**, so extraction is a **reduction**.' },
      ],
      lines: [
        { say: 'An ore is a rock that contains enough of a metal, or of a metal compound, to make extracting the metal worthwhile. Most ores contain the metal as an oxide.', show: 'ore' },
        { say: 'Extraction means getting the metal out of its compound. The oxide has to lose its oxygen, and losing oxygen is called reduction. Gaining oxygen is oxidation.', show: 'ext', focus: 'ext' },
      ],
    },
    {
      chapter: 'Choosing the method',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Place in the series', 'Metals', 'How the metal is obtained'],
          rows: [
            ['Above carbon', 'sodium, magnesium, aluminium', 'Electrolysis of the molten compound'],
            ['Below carbon', 'zinc, iron, lead, copper', 'Heating the oxide with carbon'],
            ['At the very bottom', 'gold, platinum', 'Found native, as the metal itself'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{2ZnO + C -> 2Zn + CO2}'] },
      ],
      lines: [
        { say: 'The method depends on where the metal sits in the reactivity series, compared with carbon.', show: 't' },
        { say: 'Carbon is more reactive than zinc, iron, lead and copper, so it can take their oxygen away. In a furnace, zinc oxide and carbon give zinc and carbon dioxide.', caption: 'Carbon is more reactive than zinc, iron, lead and copper, so it can take their oxygen away. In a furnace: 2ZnO + C → 2Zn + CO₂.', show: 'm', focus: ['t.1', 'm'] },
        { say: 'Aluminium, magnesium and sodium are above carbon. They hold on to oxygen more strongly than carbon does, so the only way to pull their compounds apart is with electricity.', focus: 't.0' },
        { say: 'Gold and platinum are so unreactive that they are found native, as the metal itself.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Why not electrolysis for everything?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}'] },
        { kind: 'callout', id: 'tip', tone: 'mistake', title: 'Follow the oxygen', md: 'The substance that **gives its oxygen away** is reduced. The substance that **takes the oxygen** is oxidised.' },
      ],
      lines: [
        { say: 'Electrolysis works for any metal compound, but it is expensive. The compound must be kept molten, and a very large current must flow all the time. So it is kept for the metals that carbon cannot reduce.' },
        { say: 'In the blast furnace, carbon monoxide takes the oxygen from iron three oxide.', caption: 'In the blast furnace, carbon monoxide takes the oxygen from iron(III) oxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂.', show: 'm' },
        { say: 'It is easy to attach the word reduced to the wrong substance, so follow the oxygen. The iron oxide gives its oxygen away, so it is reduced. The carbon monoxide takes the oxygen, so it is oxidised.', show: 'tip', focus: 'tip' },
      ],
    },
    {
      chapter: 'Copper from poor ores',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Phytomining:** plants take up copper compounds; they are burned, and the ash is rich in copper.',
            '**Bioleaching:** bacteria feed on the ore and make a solution of copper ions.',
          ],
        },
      ],
      lines: [
        { say: 'Rich copper ores are running out, so two newer methods collect copper from low-grade ores. In phytomining, plants take up copper compounds through their roots. The plants are burned, and the ash is rich in copper.', show: 'b.0' },
        { say: 'In bioleaching, bacteria feed on the ore and produce a solution of copper ions. Both methods are slow, but they need far less digging and far less energy.', show: 'b.1' },
      ],
    },
    {
      chapter: 'How much metal is in an ore?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'What percentage of the mass of $\\ce{Fe2O3}$ is iron? (Fe = 56, O = 16)' },
        { kind: 'math', id: 'm', size: 'md', lines: ['M_r = (2 \\times 56) + (3 \\times 16) = 160', '\\text{iron} = 2 \\times 56 = 112', '\\dfrac{112}{160} \\times 100 = 70\\%'] },
      ],
      lines: [
        { say: 'A metal oxide is only partly metal by mass. What percentage of iron three oxide is iron?', caption: 'A metal oxide is only partly metal by mass. What percentage of Fe₂O₃ is iron?', show: 'q' },
        { say: 'The relative formula mass is two times fifty-six, plus three times sixteen, which is one hundred sixty.', caption: 'The relative formula mass is (2 × 56) + (3 × 16) = 160.', show: 'm.0', focus: 'm.0' },
        { say: 'The iron in it is two times fifty-six, which is one hundred twelve.', caption: 'The iron in it is 2 × 56 = 112.', show: 'm.1', focus: 'm.1' },
        { say: 'One hundred twelve over one hundred sixty, times one hundred, is seventy percent. So two hundred kilograms of this oxide can give at most one hundred forty kilograms of iron.', caption: '112 ÷ 160 × 100 = 70%. So 200 kg of this oxide can give at most 140 kg of iron.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Magnesium is above carbon in the reactivity series. How is it extracted?',
          choices: ['Electrolysis of its molten compound', 'Heating its oxide with carbon', 'It is found native', 'Heating its oxide in air'],
          answer: 0,
          working: 'Carbon cannot take the oxygen from a metal above it, so electricity is needed.',
        },
      ],
      lines: [
        { say: 'Your turn. Magnesium is above carbon in the reactivity series. How is it extracted? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, electrolysis of its molten compound. Carbon cannot take the oxygen from a metal above it, so choice B does not work.', show: 'q.answer' },
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
            'Extracting a metal from its oxide is a reduction: the oxide loses oxygen.',
            'Below carbon: heat the oxide with carbon. Above carbon: electrolysis.',
            'Phytomining and bioleaching obtain copper from low-grade ores.',
            'Mass of metal = mass of compound × (metal in the formula ÷ formula mass).',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Extracting a metal from its oxide is a reduction, because the oxide loses oxygen.', show: 'sum.0' },
        { say: 'Metals below carbon are extracted by heating their oxides with carbon, and metals above carbon need electrolysis.', show: 'sum.1' },
        { say: 'Phytomining and bioleaching obtain copper from low-grade ores.', show: 'sum.2' },
        { say: 'And the formula of the compound tells you the greatest mass of metal it can give.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
