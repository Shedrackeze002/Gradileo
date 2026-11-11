import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-3-3',
  lessonId: 'c8-3-3',
  title: 'Word Equations',
  thumbnail: 'ide',
  summary:
    'A word equation reads reactants, an arrow, then products, with a plus sign between the substances on each side. When something burns, oxygen is a reactant. A metal and a non-metal make a compound named with the metal first, then the non-metal ending in -ide: oxide, chloride, sulfide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Physical and Chemical Changes', title: 'Word Equations', subtitle: 'A reaction in one line' }],
      lines: [
        { say: 'Every reaction tells a short story: these substances went in, and these came out.', show: 'title' },
        { say: 'A word equation is that story written in one line. In this video, you will learn to write word equations, and to name the compounds a reaction makes.' },
      ],
    },
    {
      chapter: 'Word equations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'lg', lines: ['\\text{reactants} \\rightarrow \\text{products}', '\\text{magnesium} + \\text{oxygen} \\rightarrow \\text{magnesium oxide}', '\\text{methane} + \\text{oxygen} \\rightarrow \\text{carbon dioxide} + \\text{water}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Oxygen from the air', md: 'When something burns in air, **oxygen** is a reactant, even though nobody added it on purpose.' },
      ],
      lines: [
        { say: 'A word equation names the reactants on the left and the products on the right, with an arrow between them. The arrow means react to make, and a plus sign separates the substances on each side.', show: 'eq.0', focus: 'eq.0' },
        { say: 'So when magnesium burns, we write: magnesium plus oxygen makes magnesium oxide.', show: 'eq.1', focus: 'eq.1' },
        { say: 'Methane, the gas in many cookers, burns to make carbon dioxide and water. So the equation is methane plus oxygen makes carbon dioxide plus water.', show: 'eq.2', focus: 'eq.2' },
        { say: 'Notice that oxygen appears in both. When something burns in air, it reacts with oxygen, so oxygen is a reactant, even though nobody added it on purpose.', show: 'tip' },
        { say: 'And the order matters. An equation always runs from what you start with to what is made, so products never go on the left.' },
      ],
    },
    {
      chapter: 'Naming compounds',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ide',
          head: ['Non-metal', 'Becomes', 'Example'],
          rows: [
            ['oxygen', 'oxide', 'magnesium oxide'],
            ['chlorine', 'chloride', 'sodium chloride'],
            ['sulfur', 'sulfide', 'iron sulfide'],
          ],
        },
      ],
      lines: [
        { say: 'When a metal reacts with a non-metal, the compound is named with the metal first, unchanged. Then comes the non-metal, with its name changed to end in i d e.', show: 'ide' },
        { say: 'Oxygen becomes oxide, as in magnesium oxide. Chlorine becomes chloride, as in sodium chloride. And sulfur becomes sulfide, as in iron sulfide.', show: ['ide.0', 'ide.1', 'ide.2'] },
        { say: 'This works backwards too. A name ending in i d e tells you the elements: copper oxide contains copper and oxygen.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Calcium reacts with chlorine. Which is the correct word equation?',
          choices: ['calcium + chlorine → calcium chloride', 'calcium chloride → calcium + chlorine', 'calcium + chlorine → chlorine calcide', 'calcium + chloride → calcium chlorine'],
          answer: 0,
          working: 'The reactants go on the left. The metal comes first in the name, and chlorine becomes chloride.',
        },
      ],
      lines: [
        { say: 'Your turn. Calcium reacts with chlorine. Which is the correct word equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The reactants, calcium and chlorine, go on the left. In the product’s name, the metal comes first, and chlorine becomes chloride: calcium chloride.', show: 'q.answer' },
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
            'A word equation reads **reactants → products**.',
            'A plus sign separates substances on each side.',
            'When something burns, oxygen is a reactant.',
            'Metal first, then the non-metal ending in **-ide**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A word equation reads reactants, an arrow, then products.', show: 'sum.0' },
        { say: 'A plus sign separates the substances on each side.', show: 'sum.1' },
        { say: 'When something burns, oxygen is a reactant.', show: 'sum.2' },
        { say: 'And a metal and a non-metal make a compound named metal first, then the non-metal ending in i d e. Next, you will look closely at burning.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
