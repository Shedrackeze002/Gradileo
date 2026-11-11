import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'cx-11-1',
  lessonId: 'cx-11-1',
  title: 'Period 3 Elements and Their Oxides',
  thumbnail: false,
  summary:
    'Sodium reacts vigorously with cold water and magnesium only slowly, though magnesium burns in steam. The oxides of sodium, magnesium and aluminium are ionic, silicon dioxide is giant covalent, and the phosphorus and sulfur oxides are simple molecules. Ionic oxides are basic, the simple covalent oxides form acids, silicon dioxide is acidic, and aluminium oxide is amphoteric, reacting with both acids and bases.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'A Level Period 3 and Transition Metals', title: 'Period 3 Oxides', subtitle: 'From basic to acidic' }],
      lines: [
        { say: 'Across Period three, the elements change from a soft metal that fizzes on water to a yellow non-metal that burns with a blue flame. Their oxides change too, from strongly basic to strongly acidic.', caption: 'Across Period 3, the elements change from a soft metal that fizzes on water to a yellow non-metal that burns with a blue flame. Their oxides change too, from strongly basic to strongly acidic.', show: 'title' },
        { say: 'In this lesson, you will link the properties of the Period three oxides to their structure and bonding.', caption: 'In this lesson, you will link the properties of the Period 3 oxides to their structure and bonding.' },
      ],
    },
    {
      chapter: 'With water and oxygen',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{2Na + 2H2O -> 2NaOH + H2}', '\\ce{Mg + H2O(g) -> MgO + H2}'] }],
      lines: [
        { say: 'Sodium reacts vigorously with cold water, giving a strongly alkaline solution.', show: 'm.0', focus: 'm.0' },
        { say: 'Magnesium reacts only very slowly with cold water, but burns in steam with a bright white light, giving its oxide.', show: 'm.1', focus: 'm.1' },
        { say: 'In oxygen, sodium burns with a yellow-orange flame, magnesium and aluminium with white flames, and sulfur with a blue flame.' },
      ],
    },
    {
      chapter: 'Structure and pH',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Oxide', 'Structure', 'With water'], rows: [['$\\ce{Na2O}$, $\\ce{MgO}$', 'ionic', 'alkaline: pH 14 and 9'], ['$\\ce{Al2O3}$, $\\ce{SiO2}$', 'ionic; giant covalent', 'insoluble: pH 7'], ['$\\ce{P4O10}$, $\\ce{SO2}$, $\\ce{SO3}$', 'simple molecular', 'acidic: pH 0 to 3']] }],
      lines: [
        { say: 'Sodium and magnesium oxides are ionic. Their oxide ions react with water to make hydroxide ions, so they are basic.', show: 't.0', focus: 't.0' },
        { say: 'Aluminium oxide and silicon dioxide do not dissolve, so the water stays neutral.', show: 't.1', focus: 't.1' },
        { say: 'The phosphorus and sulfur oxides are simple molecules. They react with water to make acids, such as phosphoric and sulfuric acid.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Amphoteric aluminium oxide',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}', '\\ce{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}'] }],
      lines: [
        { say: 'Aluminium oxide is amphoteric. It reacts with acids, like a base.', show: 'm.0', focus: 'm.0' },
        { say: 'And it reacts with sodium hydroxide, like an acid, forming the aluminate ion.', show: 'm.1', focus: 'm.1' },
        { say: 'Silicon dioxide is insoluble, but it is still acidic: it reacts with hot, concentrated sodium hydroxide.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Insoluble is not neutral', md: '$\\ce{SiO2}$ and $\\ce{Al2O3}$ give pH 7 only because they do not dissolve. Their reactions show their real character.' }],
      lines: [{ say: 'A common mistake is to call silicon dioxide and aluminium oxide neutral. They give pH seven only because they do not dissolve.', caption: 'A common mistake is to call silicon dioxide and aluminium oxide neutral. They give pH 7 only because they do not dissolve.', show: 'm' }],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which Period 3 oxide reacts with both hydrochloric acid and sodium hydroxide?',
          choices: ['Magnesium oxide', 'Aluminium oxide', 'Sulfur dioxide', 'Sodium oxide'],
          answer: 1,
          working: 'Aluminium oxide is **amphoteric**: it acts as a base with acids and as an acid with bases.',
        },
      ],
      lines: [
        { say: 'Your turn. Which Period three oxide reacts with both hydrochloric acid and sodium hydroxide? Pause the video and try it.', caption: 'Your turn. Which Period 3 oxide reacts with both hydrochloric acid and sodium hydroxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, aluminium oxide. It is amphoteric.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sodium reacts vigorously with water; magnesium burns in steam.', 'Ionic oxides are basic.', 'Simple covalent oxides form acids; silicon dioxide is acidic.', 'Aluminium oxide is amphoteric.'] }],
      lines: [
        { say: 'Let’s sum up. Sodium reacts vigorously with water, and magnesium burns in steam.', show: 'sum.0' },
        { say: 'The ionic oxides are basic.', show: 'sum.1' },
        { say: 'The simple covalent oxides form acids, and silicon dioxide is acidic too.', show: 'sum.2' },
        { say: 'And aluminium oxide is amphoteric, reacting with both acids and bases.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
