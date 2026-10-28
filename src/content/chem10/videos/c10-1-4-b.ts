import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-1-4-b',
  lessonId: 'c10-1-4',
  title: 'Physical and Chemical Change, Part 2: Physical and Chemical Properties',
  thumbnailTitle: 'Physical and Chemical Properties',
  thumbnail: false,
  summary:
    'Evidence can mislead: bubbles in boiling water and a glowing light bulb make no new substance, so always ask whether a new substance forms. Physical properties are observed or measured without making a new substance; chemical properties describe how a substance reacts, or does not react.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and the Particle Model · Part 2', title: 'Physical and Chemical Properties', subtitle: 'When evidence misleads, and how substances behave' }],
      lines: [
        { say: 'Boiling water is full of bubbles, and a light bulb gives out heat and light. Yet neither one makes a new substance.', show: 'title' },
        { say: 'In this part, you will see when evidence can mislead you, and sort the properties of substances into physical and chemical properties.' },
      ],
    },
    {
      chapter: 'When evidence misleads',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The real question', md: 'Is a **new substance** made?' },
        {
          kind: 'bullets',
          id: 'ex',
          items: [
            'Bubbles in boiling water are water vapour: **physical**.',
            'A glowing light-bulb filament is still the same metal: **physical**.',
            'Melting ice takes in energy, but it is still water: **physical**.',
            'The fog around dry ice is water droplets condensed from the air: **physical**.',
          ],
        },
      ],
      lines: [
        { say: 'Evidence can mislead you, so always come back to the real question: is a new substance made?', show: 'key' },
        { say: 'Bubbles form when water boils, but the bubbles are water vapour: the same substance in a different state. Boiling is physical.', show: 'ex.0' },
        { say: 'A glowing light bulb filament is still the same metal, and it stops glowing when it is switched off. Physical.', show: 'ex.1' },
        { say: 'Melting ice takes in energy, but melted ice is still water. And the fog around dry ice is tiny droplets of water condensed from the air. Both physical.', show: ['ex.2', 'ex.3'] },
        { say: 'So look for bubbles produced when substances are mixed, as when zinc is added to acid, or vinegar to baking soda.' },
      ],
    },
    {
      chapter: 'Two kinds of property',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'phys', tone: 'definition', title: 'Physical property', md: 'Observed or measured **without** making a new substance: colour, state, smell, melting and boiling points, density, hardness, solubility, conductivity, magnetism.' },
        { kind: 'callout', id: 'chem', tone: 'definition', title: 'Chemical property', md: 'How the substance **reacts** to make new substances: whether it is **flammable**, reacts with water, air or acids, breaks down when heated, or does **not** react.' },
      ],
      lines: [
        { say: 'A property is a characteristic that helps you describe or identify a substance.' },
        { say: 'A physical property can be observed or measured without changing the substance into a new one: its colour, its melting point, its density, or whether it conducts electricity or is magnetic.', show: 'phys' },
        { say: 'A chemical property describes how the substance reacts to make new substances: whether it is flammable, whether it reacts with water, air or acids, and whether it breaks down when heated.', show: 'chem' },
        { say: 'A physical property needs only looking or measuring. A chemical property needs a reaction, and afterwards, the substance you tested has become something else.' },
      ],
    },
    {
      chapter: 'Three substances',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Substance', 'Physical properties', 'Chemical properties'],
          rows: [
            ['magnesium', 'silvery grey; melts at $650^\\circ\\text{C}$', 'burns with a white flame'],
            ['ethanol', 'colourless; boils at $78^\\circ\\text{C}$', 'flammable'],
            ['gold', 'yellow and shiny', 'does not react with air'],
          ],
        },
      ],
      lines: [
        { say: 'Magnesium is silvery grey and melts at six hundred fifty degrees Celsius: physical properties. It burns in air with a bright white flame: a chemical property.', show: 't.0', focus: 't.0' },
        { say: 'Ethanol is a colourless liquid that boils at seventy-eight degrees, and it is flammable. Gold is yellow and shiny, and it does not react with air, so it never tarnishes.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Sorting properties',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which are chemical properties of iron? (a) It is attracted to a magnet. (b) It rusts in damp air. (c) It melts at $1538^\\circ\\text{C}$. (d) It reacts with sulfur when heated.' },
        { kind: 'bullets', id: 'steps', items: ['(a) and (c) can be observed or measured without making anything new: **physical**.', '(b) and (d) are reactions that make rust and iron sulfide: **chemical**.'] },
      ],
      lines: [
        { say: 'Which of these are chemical properties of iron? It is attracted to a magnet; it rusts in damp air; it melts at a high temperature; it reacts with sulfur when heated.', show: 'q' },
        { say: 'Being magnetic, and the melting point, can be observed or measured without turning the iron into anything new. They are physical properties.', show: 'steps.0' },
        { say: 'Rusting and reacting with sulfur make new substances, rust and iron sulfide, so those two are the chemical properties.', show: 'steps.1' },
      ],
    },
    {
      chapter: 'Not reacting counts',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not reacting is a chemical property', md: '“Gold does not react with air” describes how gold behaves in reactions, so it is a **chemical** property. So is “carbon dioxide does not burn”.' }],
      lines: [
        { say: 'Watch out: not reacting is a chemical property too. Gold does not react with air, and carbon dioxide does not burn. Both describe how a substance behaves in reactions.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is a **chemical** property of magnesium?',
          choices: ['It is silvery grey.', 'It burns in air with a bright white flame.', 'It melts at $650^\\circ\\text{C}$.', 'It conducts electricity.'],
          answer: 1,
          working: 'Burning makes a new substance, so flammability is a chemical property. Colour, melting point and conductivity can be observed or measured without making anything new.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a chemical property of magnesium? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: burning makes a new substance. The colour, the melting point and conducting electricity can all be observed or measured without making anything new.', show: 'q.answer' },
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
            'Evidence can mislead: always ask whether a **new substance** is made.',
            '**Physical properties**: observed or measured without making a new substance.',
            '**Chemical properties**: how a substance reacts, or does not react.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Evidence can mislead, so always ask whether a new substance is made.', show: 'sum.0' },
        { say: 'Physical properties can be observed or measured without making a new substance.', show: 'sum.1' },
        { say: 'Chemical properties describe how a substance reacts, or does not react. In part three, you will meet one of the most useful physical properties of all: density. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
