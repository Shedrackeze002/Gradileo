import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c9-3-3',
  lessonId: 'c9-3-3',
  title: 'Types of Reaction',
  thumbnail: 'types',
  summary:
    'Synthesis joins substances, decomposition breaks one apart, displacement swaps a more reactive element in, and combustion burns a fuel in oxygen. The reactivity series runs from potassium to gold, and a metal displaces another from its compound only if it is higher in the series.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Reactions and Conservation of Mass', title: 'Types of Reaction', subtitle: 'Four patterns, and the reactivity series' }],
      lines: [
        { say: 'There are millions of chemical reactions, but most of them follow a handful of patterns.', show: 'title' },
        { say: 'Spotting the pattern lets you predict what a reaction will make. In this video, you will meet four types of reaction, and use the reactivity series to tell whether a reaction will happen at all.' },
      ],
    },
    {
      chapter: 'Four types',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'types',
          head: ['Type', 'Pattern', 'Example'],
          rows: [
            ['synthesis', 'A + B → AB', 'iron + sulfur → iron sulfide'],
            ['decomposition', 'AB → A + B', 'calcium carbonate → calcium oxide + carbon dioxide'],
            ['displacement', 'A + BC → AC + B', 'zinc + copper sulfate → zinc sulfate + copper'],
            ['combustion', 'fuel + oxygen', 'methane + oxygen → carbon dioxide + water'],
          ],
        },
      ],
      lines: [
        { say: 'In synthesis, two or more substances join to make one product. Iron and sulfur join to make iron sulfide.', show: ['types', 'types.0'], focus: 'types.0' },
        { say: 'Decomposition is the opposite: one substance breaks down into two or more simpler ones, often when heated. Calcium carbonate breaks down into calcium oxide and carbon dioxide.', show: 'types.1', focus: 'types.1' },
        { say: 'In displacement, a more reactive element takes the place of a less reactive one in a compound. Zinc pushes copper out of copper sulfate.', show: 'types.2', focus: 'types.2' },
        { say: 'And in combustion, a fuel reacts with oxygen and gives out heat. Fuels containing carbon and hydrogen, like methane, make carbon dioxide and water.', show: 'types.3', focus: 'types.3' },
      ],
    },
    {
      chapter: 'The reactivity series',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'series', tone: 'definition', title: 'Most reactive to least reactive', md: 'potassium, sodium, calcium, magnesium, aluminium, zinc, iron, lead, copper, silver, gold' },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'The rule', md: 'A metal displaces another metal from its compound only if it is **higher** in the series.' },
      ],
      lines: [
        { say: 'The reactivity series lists metals from most reactive to least reactive: potassium, sodium, calcium, magnesium, aluminium, zinc, iron, lead, copper, silver and gold.', show: 'series' },
        { say: 'A metal displaces another metal from its compound only if it is higher in the series.', show: 'rule' },
        { say: 'Put an iron nail into blue copper sulfate solution. Iron is above copper, so it displaces it. A brown coating of copper forms on the nail, and the blue colour fades.' },
        { say: 'But copper in zinc sulfate does nothing, because copper is below zinc. And gold is so unreactive that it is found in the ground as the pure metal.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these will react?',
          choices: ['copper + zinc sulfate', 'silver + iron sulfate', 'magnesium + lead nitrate', 'gold + copper sulfate'],
          answer: 2,
          working: 'Only magnesium is higher in the series than the metal in the compound, so only it can displace lead.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these will react? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Magnesium is above lead in the reactivity series, so it displaces lead from lead nitrate. In every other pair, the metal is below the one in the compound, so nothing happens.', show: 'q.answer' },
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
            'Synthesis joins; decomposition breaks apart.',
            'Displacement swaps a more reactive element in; combustion burns a fuel in oxygen.',
            'Reactivity series: potassium (most) to gold (least).',
            'A metal displaces another only if it is higher in the series.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Synthesis joins substances together, and decomposition breaks one apart.', show: 'sum.0' },
        { say: 'Displacement swaps a more reactive element in, and combustion burns a fuel in oxygen.', show: 'sum.1' },
        { say: 'The reactivity series runs from potassium, the most reactive, to gold, the least.', show: 'sum.2' },
        { say: 'And a metal displaces another from its compound only if it is higher in the series. Next, you will find out what makes reactions faster.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
