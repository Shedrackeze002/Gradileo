import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-4-3',
  lessonId: 'c9-4-3',
  title: 'Neutralization',
  thumbnail: 'uses',
  summary:
    'Neutralization is the reaction of an acid with a base to make a salt and water, as hydrogen ions and hydroxide ions join to make water. The salt takes its first name from the metal in the base and its second from the acid. Antacids, lime for soil and remedies for stings all use neutralization.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Acids and Bases', title: 'Neutralization', subtitle: 'Acid + base → salt + water' }],
      lines: [
        { say: 'Add an alkali to an acid a little at a time, and something remarkable happens. The acid and the alkali cancel each other out.', show: 'title' },
        { say: 'In this video, you will learn what neutralization makes, how to name the salt, and where neutralization is at work in everyday life.' },
      ],
    },
    {
      chapter: 'Neutralization',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{acid} + \\text{base} \\rightarrow \\text{salt} + \\text{water}', '\\ce{H+ + OH- -> H2O}'] },
        {
          kind: 'table',
          id: 'salts',
          head: ['Acid', 'Makes salts called', 'Example'],
          rows: [
            ['hydrochloric acid', 'chlorides', 'sodium chloride'],
            ['sulfuric acid', 'sulfates', 'copper sulfate'],
            ['nitric acid', 'nitrates', 'potassium nitrate'],
          ],
        },
      ],
      lines: [
        { say: 'Neutralization is the reaction of an acid with a base. It makes a salt and water.', show: 'eq.0' },
        { say: 'What really happens is that the hydrogen ions from the acid and the hydroxide ions from the alkali join to make water.', show: 'eq.1' },
        { say: 'The salt takes its first name from the metal in the base, and its second name from the acid.', show: 'salts' },
        { say: 'Hydrochloric acid makes chlorides, sulfuric acid makes sulfates, and nitric acid makes nitrates.', show: ['salts.0', 'salts.1', 'salts.2'], focus: 'salts.2' },
        { say: 'So sulfuric acid and magnesium oxide make magnesium sulfate and water. And remember, in chemistry, a salt is any compound made this way. Table salt is just one of them.' },
      ],
    },
    {
      chapter: 'Everyday neutralization',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'uses',
          head: ['Problem', 'Neutralized with'],
          rows: [
            ['indigestion (too much stomach acid)', 'antacid tablets, a base'],
            ['acidic soil', 'lime'],
            ['bee sting (acidic)', 'baking soda, a weak base'],
            ['wasp sting (alkaline)', 'vinegar, a weak acid'],
            ['acid from bacteria on teeth', 'slightly alkaline toothpaste'],
          ],
        },
      ],
      lines: [
        { say: 'Neutralization is at work all around you.', show: 'uses' },
        { say: 'Indigestion is caused by too much stomach acid, so antacid tablets contain a base, such as magnesium hydroxide.', show: 'uses.0', focus: 'uses.0' },
        { say: 'Farmers spread lime on acidic soil, so crops can grow.', show: 'uses.1', focus: 'uses.1' },
        { say: 'A bee sting is acidic, so it is soothed with baking soda, a weak base. A wasp sting is alkaline, so it is soothed with vinegar, a weak acid.', show: ['uses.2', 'uses.3'], focus: 'uses.3' },
        { say: 'And bacteria on your teeth make acids, so toothpaste is slightly alkaline.', show: 'uses.4', focus: 'uses.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which salt is made when nitric acid neutralizes potassium hydroxide?',
          choices: ['potassium chloride', 'potassium sulfate', 'potassium nitrate', 'hydrogen nitrate'],
          answer: 2,
          working: 'The metal, potassium, comes from the base; nitric acid makes nitrates.',
        },
      ],
      lines: [
        { say: 'Your turn. Which salt is made when nitric acid neutralizes potassium hydroxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, potassium nitrate. The metal, potassium, comes from the base, and nitric acid makes nitrates.', show: 'q.answer' },
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
            'Acid + base → salt + water; $\\ce{H+}$ and $\\ce{OH-}$ make water.',
            'The metal comes from the base; the acid gives chlorides, sulfates or nitrates.',
            'Antacids, lime and sting remedies all use neutralization.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An acid and a base react to make a salt and water, as hydrogen ions and hydroxide ions join to make water.', show: 'sum.0' },
        { say: 'The salt’s first name comes from the metal in the base, and its second from the acid.', show: 'sum.1' },
        { say: 'And antacids, lime for soil and remedies for stings all use neutralization. That completes Chemistry 9. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
