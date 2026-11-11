import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-2-2',
  lessonId: 'cx-2-2',
  title: 'Identifying Ions: Flame Tests and Precipitates',
  thumbnailTitle: 'Identifying Ions',
  thumbnail: false,
  summary:
    'Flame colours and the precipitates formed with sodium hydroxide solution identify metal ions. Carbonates fizz with acid, halides give white, cream or yellow precipitates with silver nitrate, and sulfates give a white precipitate with barium chloride. One test for each ion names an unknown compound.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Analysis', title: 'Identifying Ions', subtitle: 'Flame tests and precipitates' }],
      lines: [
        { say: 'A white powder is found in an unlabelled jar. It could be table salt, washing soda, or something far less friendly, and looking at it tells you nothing.', show: 'title' },
        { say: 'In this lesson, you will name the metal ion and the negative ion in a compound from a few quick tests, each of which shows one kind of ion by a colour.' },
      ],
    },
    {
      chapter: 'Flame tests',
      layout: 'split',
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Metal ion', 'Flame colour'],
          rows: [['Lithium', 'Crimson'], ['Sodium', 'Yellow'], ['Potassium', 'Lilac'], ['Calcium', 'Orange-red'], ['Copper', 'Green']],
        },
      ],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Flame test', md: 'A test that identifies some **metal ions** by the colour they give to a flame.' }],
      lines: [
        { say: 'A flame test identifies some metal ions by the colour they give to a flame. A clean wire loop is dipped into the compound, and held in a blue Bunsen flame.', show: 'def' },
        { say: 'Lithium gives crimson, sodium yellow, and potassium lilac. Calcium gives orange-red, and copper gives green.', show: 't', focus: 't' },
        { say: 'The colour comes from the metal ion, so sodium chloride and sodium sulfate both give the same yellow flame.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Precipitates with sodium hydroxide',
      layout: 'split',
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Metal ion', 'Precipitate'],
          rows: [['Copper(II)', 'Blue'], ['Iron(II)', 'Green'], ['Iron(III)', 'Brown'], ['Calcium, magnesium', 'White'], ['Aluminium', 'White, then dissolves']],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Precipitate', md: 'A **solid** that forms when two solutions are mixed, because one of the products does not dissolve in water.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Cu^2+ + 2OH- -> Cu(OH)2}'] },
      ],
      lines: [
        { say: 'A precipitate is a solid that forms when two solutions are mixed, because one of the products does not dissolve in water. It makes the liquid cloudy.', show: 'def' },
        { say: 'Most metal hydroxides do not dissolve. So adding sodium hydroxide solution gives a precipitate, and its colour identifies the metal ion. Copper two gives blue, iron two green, and iron three brown.', caption: 'Most metal hydroxides do not dissolve. So adding sodium hydroxide solution gives a precipitate, and its colour identifies the metal ion. Copper(II) gives blue, iron(II) green, and iron(III) brown.', show: ['t.0', 't.1', 't.2'] },
        { say: 'Calcium, magnesium and aluminium all give white. Add more sodium hydroxide, and only the aluminium precipitate dissolves.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'In the ionic equation, the number of hydroxide ions equals the charge on the metal ion. A copper ion, two plus, needs two hydroxide ions.', caption: 'In the ionic equation, the number of hydroxide ions equals the charge on the metal ion: Cu²⁺ + 2OH⁻ → Cu(OH)₂.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Tests for negative ions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Ion', 'What is added', 'Positive result'],
          rows: [
            ['Carbonate', 'Dilute acid', 'Fizzing: carbon dioxide'],
            ['Chloride, bromide, iodide', 'Dilute nitric acid, then silver nitrate', 'White, cream, yellow precipitate'],
            ['Sulfate', 'Dilute hydrochloric acid, then barium chloride', 'White precipitate'],
          ],
        },
      ],
      lines: [
        { say: 'Three tests cover the common negative ions. A carbonate fizzes with dilute acid, giving carbon dioxide.', show: 't.0' },
        { say: 'For a halide, add dilute nitric acid, then silver nitrate solution. Chloride gives a white precipitate, bromide cream, and iodide yellow.', show: 't.1', focus: 't.1' },
        { say: 'For a sulfate, add dilute hydrochloric acid, then barium chloride solution. A white precipitate of barium sulfate forms.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Leaving out the acid', md: 'Carbonate ions also give a white precipitate with silver nitrate and with barium chloride. The acid added first **removes them**. Use nitric acid before silver nitrate: hydrochloric acid would add chloride ions of its own.' }],
      lines: [
        { say: 'A common mistake is to leave out the acid. Carbonate ions also give a white precipitate with silver nitrate and with barium chloride, which would look like a positive result. The acid removes them first.', show: 'm' },
        { say: 'And the acid must not contain the ion you are testing for. Hydrochloric acid would add chloride ions of its own, so nitric acid is used before silver nitrate.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A white solid gives a yellow flame. Its solution, with dilute hydrochloric acid and then barium chloride, gives a white precipitate. What is it?',
          choices: ['Potassium sulfate', 'Sodium chloride', 'Sodium carbonate', 'Sodium sulfate'],
          answer: 3,
          working: 'A yellow flame shows sodium ions. A white precipitate with barium chloride shows sulfate ions.',
        },
      ],
      lines: [
        { say: 'Your turn. A white solid gives a yellow flame. Its solution, with dilute hydrochloric acid and then barium chloride, gives a white precipitate. What is the solid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sodium sulfate. A yellow flame shows sodium ions, and a white precipitate with barium chloride shows sulfate ions. It takes two tests to name a compound: one for each ion.', show: 'q.answer' },
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
            'Flame tests: lithium crimson, sodium yellow, potassium lilac, calcium orange-red, copper green.',
            'Sodium hydroxide: copper(II) blue, iron(II) green, iron(III) brown.',
            'Carbonates fizz with acid. Halides: silver nitrate. Sulfates: barium chloride.',
            'To identify a compound, test for the positive ion and for the negative ion.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Flame tests give lithium crimson, sodium yellow, potassium lilac, calcium orange-red and copper green.', show: 'sum.0' },
        { say: 'Sodium hydroxide solution gives coloured precipitates: blue for copper two, green for iron two, and brown for iron three.', caption: 'Sodium hydroxide solution gives coloured precipitates: blue for copper(II), green for iron(II), and brown for iron(III).', show: 'sum.1' },
        { say: 'Carbonates fizz with acid, halides are tested with silver nitrate, and sulfates with barium chloride.', show: 'sum.2' },
        { say: 'And to identify a compound, test for the positive ion and for the negative ion.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
