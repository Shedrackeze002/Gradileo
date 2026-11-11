import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-4-3',
  lessonId: 'c8-4-3',
  title: 'Metals and Alloys',
  thumbnail: 'alloys',
  summary:
    'Metals are chosen for their properties: copper conducts, aluminium is light, steel is strong, and titanium and gold do not react. An alloy is a metal mixed with other elements, such as steel, brass and bronze. Different-sized atoms stop the layers sliding, so alloys are usually harder than pure metals. 18-carat gold is 18 ÷ 24 = 75% gold.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Materials', title: 'Metals and Alloys', subtitle: 'The right metal for the job' }],
      lines: [
        { say: 'Copper pipes carry water, aluminium cans hold drinks, and steel beams hold up skyscrapers. Each metal is chosen for its properties.', show: 'title' },
        { say: 'And very often, the metal in an object is not pure at all, but an alloy. In this video, you will see how metals are chosen, and why alloys are so useful.' },
      ],
    },
    {
      chapter: 'Choosing a metal',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'uses',
          head: ['Metal', 'Use', 'Why'],
          rows: [
            ['copper', 'wiring, water pipes', 'conducts; easy to bend'],
            ['aluminium', 'drink cans, power cables', 'low density; resists corrosion'],
            ['steel', 'bridges, cars', 'very strong and cheap'],
            ['titanium', 'hip joints', 'strong, light, does not react'],
          ],
        },
      ],
      lines: [
        { say: 'Engineers choose a metal by asking which properties a job needs.', show: 'uses' },
        { say: 'Copper conducts electricity and is easy to bend, so it is used for wiring and water pipes.', show: 'uses.0', focus: 'uses.0' },
        { say: 'Aluminium has a low density and resists corrosion. Copper conducts better, but overhead power cables are aluminium, because a long cable is much lighter and needs fewer pylons.', show: 'uses.1', focus: 'uses.1' },
        { say: 'Steel is very strong and cheap, so it is used for bridges. And titanium is strong, light and does not react with the body, so it is used for hip joints.', show: ['uses.2', 'uses.3'], focus: 'uses.2' },
      ],
    },
    {
      chapter: 'Alloys',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'alloys',
          head: ['Alloy', 'Made of'],
          rows: [
            ['steel', 'iron and a little carbon'],
            ['stainless steel', 'iron, chromium and nickel'],
            ['brass', 'copper and zinc'],
          ],
        },
        { kind: 'math', id: 'carat', size: 'md', lines: ['\\dfrac{18}{24} \\times 100 = 75\\%'] },
      ],
      lines: [
        { say: 'An alloy is a mixture of a metal with one or more other elements. Steel is iron with a little carbon, and brass is copper and zinc.', show: 'alloys' },
        { say: 'In a pure metal, the atoms are all the same size, and they sit in neat layers that slide over one another easily, so the metal is soft.' },
        { say: 'In an alloy, atoms of a different size disrupt the layers, so they cannot slide as easily. That is why alloys are usually harder than pure metals.' },
        { say: 'Pure gold is too soft for everyday jewellery, so it is alloyed with copper or silver. Pure gold is twenty-four carat, and eighteen carat gold has eighteen parts of gold in every twenty-four. That is seventy-five percent gold.', show: 'carat' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why is an alloy usually harder than the pure metal?',
          choices: ['atoms of a different size stop the layers sliding', 'the atoms in an alloy are all the same size', 'alloys contain no metal atoms', 'alloys are always heavier'],
          answer: 0,
          working: 'In a pure metal, same-sized atoms form layers that slide easily. Different-sized atoms in an alloy disrupt the layers.',
        },
      ],
      lines: [
        { say: 'Your turn. Why is an alloy usually harder than the pure metal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Atoms of a different size disrupt the neat layers of metal atoms, so the layers cannot slide over one another as easily.', show: 'q.answer' },
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
            'Metals are chosen for their properties.',
            'An **alloy** is a metal mixed with other elements.',
            'Different-sized atoms make alloys harder.',
            'Carats: 24 is pure; 18 carat is 75% gold.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Metals are chosen for their properties: copper conducts, aluminium is light, and steel is strong.', show: 'sum.0' },
        { say: 'An alloy is a metal mixed with other elements, like steel, brass and bronze.', show: 'sum.1' },
        { say: 'Different-sized atoms stop the layers sliding, so alloys are usually harder.', show: 'sum.2' },
        { say: 'And gold’s purity is measured in carats, where twenty-four carat is pure. Next, you will meet the materials that are not metals.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
