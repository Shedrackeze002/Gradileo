import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-4-1',
  lessonId: 'c8-4-1',
  title: 'Burning',
  thumbnail: 'tri',
  summary:
    'Combustion is a fuel reacting with oxygen, giving out heat and light. Fuels of carbon and hydrogen burn to carbon dioxide and water, and carbon dioxide turns limewater cloudy. Too little oxygen gives poisonous carbon monoxide. A fire needs fuel, heat and oxygen, the fire triangle; remove one to put it out. Never use water on burning oil.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Materials', title: 'Burning', subtitle: 'Combustion and the fire triangle' }],
      lines: [
        { say: 'A gas stove, a campfire and a car engine all depend on burning. Burning gives us heat and light, but it also makes waste gases, and out of control it is dangerous.', show: 'title' },
        { say: 'In this video, you will find out what burning is, what it makes, and how fires are put out.' },
      ],
    },
    {
      chapter: 'Combustion',
      layout: 'center',
      main: [
        { kind: 'math', id: 'eq', size: 'md', lines: ['\\text{methane} + \\text{oxygen} \\rightarrow \\text{carbon dioxide} + \\text{water}'] },
        { kind: 'callout', id: 'co', tone: 'mistake', title: 'Too little oxygen', md: 'Fuels burn incompletely and make **carbon monoxide**, a poisonous gas with no colour or smell.' },
      ],
      lines: [
        { say: 'Combustion is the chemical name for burning. A fuel reacts with oxygen, giving out heat and usually light.', show: 'eq' },
        { say: 'Many fuels, like natural gas, petrol and candle wax, are made of carbon and hydrogen. When they burn in plenty of oxygen, the carbon becomes carbon dioxide and the hydrogen becomes water.' },
        { say: 'To test for carbon dioxide, bubble the gas through limewater. If it is carbon dioxide, the limewater turns cloudy.' },
        { say: 'With too little oxygen, fuels burn incompletely and make carbon monoxide, a poisonous gas with no colour or smell. That is why gas heaters and boilers need good air flow and regular checks.', show: 'co' },
      ],
    },
    {
      chapter: 'The fire triangle',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fire triangle', md: 'A fire needs **fuel**, **heat** and **oxygen**. Remove any one side, and the fire goes out.' },
        {
          kind: 'table',
          id: 'tri',
          head: ['Method', 'Side removed'],
          rows: [
            ['spraying water on burning wood', 'heat'],
            ['a fire blanket over a pan', 'oxygen'],
            ['turning off the gas', 'fuel'],
          ],
        },
      ],
      lines: [
        { say: 'A fire needs three things at once: fuel, heat and oxygen. These are the three sides of the fire triangle. Take away any one side, and the fire goes out.', show: 'def' },
        { say: 'Spraying water on burning wood cools it, so it removes the heat.', show: ['tri', 'tri.0'], focus: 'tri.0' },
        { say: 'A fire blanket over a burning pan cuts off the oxygen.', show: 'tri.1', focus: 'tri.1' },
        { say: 'And turning off the gas supply removes the fuel.', show: 'tri.2', focus: 'tri.2' },
        { say: 'Never throw water on a burning pan of oil. The water sinks below the hot oil and boils instantly, and the steam throws burning oil out of the pan.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Firefighters cut a wide strip of trees out of a forest, ahead of a wildfire. Which side of the fire triangle does this remove?',
          choices: ['heat', 'oxygen', 'carbon dioxide', 'fuel'],
          answer: 3,
          working: 'The trees are what burns. With no trees in the strip, the fire runs out of fuel when it reaches it.',
        },
      ],
      lines: [
        { say: 'Your turn. Firefighters cut a wide strip of trees out of a forest, ahead of a wildfire. Which side of the fire triangle does this remove? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fuel. The trees are what burns, so when the fire reaches the cleared strip, it runs out of fuel.', show: 'q.answer' },
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
            '**Combustion**: a fuel reacts with oxygen, giving heat and light.',
            'Carbon and hydrogen burn to carbon dioxide and water.',
            'Too little oxygen gives poisonous carbon monoxide.',
            'The **fire triangle**: fuel, heat, oxygen. Remove one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Combustion is a fuel reacting with oxygen, giving out heat and light.', show: 'sum.0' },
        { say: 'Fuels of carbon and hydrogen burn to make carbon dioxide and water.', show: 'sum.1' },
        { say: 'With too little oxygen, they make poisonous carbon monoxide.', show: 'sum.2' },
        { say: 'And a fire needs fuel, heat and oxygen, so removing any one puts it out. Next, you will see a much slower reaction with oxygen: rusting.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
