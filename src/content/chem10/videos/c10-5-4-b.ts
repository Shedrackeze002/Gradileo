import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c10-5-4-b',
  lessonId: 'c10-5-4',
  title: 'Neutralization, Part 2: Naming Salts',
  thumbnailTitle: 'Naming Salts',
  thumbnail: false,
  summary:
    'A salt’s name has two parts: the metal from the base, then a word from the acid. Hydrochloric acid makes chlorides, sulfuric acid sulfates and nitric acid nitrates, and metal oxides react just like metal hydroxides: sulfuric acid + magnesium oxide → magnesium sulfate + water. The second word is not an element’s name: sodium chloride, not sodium chlorine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Moles, Acids and Bases · Part 2', title: 'Naming Salts', subtitle: 'A metal, then a word from the acid' }],
      lines: [
        { say: 'Sodium chloride is only one salt. Magnesium sulfate, potassium nitrate and calcium chloride are salts too.', show: 'title' },
        { say: 'In this part, you will name the salt that an acid and a base make, and write the word equation.' },
      ],
    },
    {
      chapter: 'Two-part names',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'rules',
          items: ['The **first word** is the [[brand:metal from the base]]: sodium from sodium hydroxide, magnesium from magnesium oxide.', 'The **second word** comes from the [[good:acid]].'],
        },
        {
          kind: 'table',
          id: 't',
          head: ['Acid', 'Formula', 'Salts it makes', 'Example'],
          rows: [
            ['hydrochloric acid', '$\\ce{HCl}$', '[[good:chlorides]]', 'sodium chloride'],
            ['sulfuric acid', '$\\ce{H2SO4}$', '[[good:sulfates]]', 'magnesium sulfate'],
            ['nitric acid', '$\\ce{HNO3}$', '[[good:nitrates]]', 'potassium nitrate'],
          ],
        },
      ],
      lines: [
        { say: 'A salt’s name has two parts. The first word is the metal from the base: sodium from sodium hydroxide, or magnesium from magnesium oxide.', show: 'rules.0' },
        { say: 'The second word comes from the acid.', show: 'rules.1' },
        { say: 'Hydrochloric acid makes chlorides, such as sodium chloride.', show: 't.0', focus: 't.0' },
        { say: 'Sulfuric acid makes sulfates, such as magnesium sulfate.', show: 't.1', focus: 't.1' },
        { say: 'And nitric acid makes nitrates, such as potassium nitrate.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Sulfuric acid and magnesium oxide',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Oxides are bases too', md: 'Metal oxides neutralize acids in just the same way as metal hydroxides: the products are still a salt and water.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write the word equation for the reaction of sulfuric acid with magnesium oxide.' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['The metal from the base is [[brand:magnesium]].', 'Sulfuric acid makes [[good:sulfates]].', 'sulfuric acid + magnesium oxide → [[brand:magnesium]] [[good:sulfate]] + water'],
        },
      ],
      lines: [
        { say: 'Metal oxides neutralize acids in just the same way as metal hydroxides. The products are still a salt and water.', show: 'tip' },
        { say: 'Write the word equation for the reaction of sulfuric acid with magnesium oxide.', show: 'q' },
        { say: 'The metal from the base is magnesium. And sulfuric acid makes sulfates.', show: ['steps.0', 'steps.1'] },
        { say: 'So the word equation is: sulfuric acid plus magnesium oxide gives magnesium sulfate plus water.', show: 'steps.2', focus: 'steps.2' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which acid and which metal hydroxide react to make potassium nitrate and water?' },
        {
          kind: 'bullets',
          id: 'steps',
          items: ['The metal in the salt, [[brand:potassium]], comes from the base: potassium hydroxide.', '[[good:Nitrates]] come from nitric acid.', 'nitric acid + potassium hydroxide → [[brand:potassium]] [[good:nitrate]] + water'],
        },
      ],
      lines: [
        { say: 'You can also work backwards. Which acid and which metal hydroxide react to make potassium nitrate and water?', show: 'q' },
        { say: 'The metal in the salt, potassium, comes from the base. So the base is potassium hydroxide.', show: 'steps.0' },
        { say: 'Nitrates come from nitric acid.', show: 'steps.1' },
        { say: 'So nitric acid plus potassium hydroxide gives potassium nitrate plus water.', show: 'steps.2', focus: 'steps.2' },
      ],
    },
    {
      chapter: 'Chloride, not chlorine',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Chloride, not chlorine', md: 'The second word of a salt’s name is not the name of an element. Hydrochloric acid makes sodium **chloride**, not "sodium chlorine", and sulfuric acid makes sodium **sulfate**, not "sodium sulfur" or "sodium sulfide".' },
        { kind: 'callout', id: 'note', tone: 'key', title: 'Sulfide or sulfate?', md: 'A **sulfide** contains only sulfur. A **sulfate** also contains oxygen.' },
      ],
      lines: [
        { say: 'Be careful with the second word. It is not the name of an element.', show: 'oops' },
        { say: 'Hydrochloric acid makes sodium chloride, not sodium chlorine. And sulfuric acid makes sodium sulfate, not sodium sulfur.' },
        { say: 'It is not sodium sulfide either. A sulfide contains only sulfur, but a sulfate also contains oxygen.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which salt forms when sulfuric acid reacts with potassium hydroxide?',
          choices: ['Potassium sulfur', 'Potassium nitrate', 'Potassium sulfate', 'Potassium chloride'],
          answer: 2,
          working: 'The metal comes from potassium hydroxide: potassium. Sulfuric acid makes sulfates. The salt is potassium sulfate: sulfuric acid + potassium hydroxide → potassium sulfate + water.',
        },
      ],
      lines: [
        { say: 'Your turn. Which salt forms when sulfuric acid reacts with potassium hydroxide? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, potassium sulfate. The metal comes from the base, potassium, and sulfuric acid makes sulfates. Choice A uses the name of the element, sulfur, which is wrong.', show: 'q.answer' },
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
            'A salt’s name: the **metal from the base**, then a word from the **acid**.',
            'Hydrochloric acid makes **chlorides**, sulfuric acid **sulfates** and nitric acid **nitrates**.',
            'Metal oxides and metal hydroxides are both bases: they make a salt and water.',
            'Chloride, not chlorine; sulfate, not sulfur.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A salt’s name is the metal from the base, then a word from the acid.', show: 'sum.0' },
        { say: 'Hydrochloric acid makes chlorides, sulfuric acid makes sulfates, and nitric acid makes nitrates.', show: 'sum.1' },
        { say: 'Metal oxides and metal hydroxides are both bases, and both make a salt and water.', show: 'sum.2' },
        { say: 'And it is chloride, not chlorine. In part three, you will write the formulas of salts. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
