import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-3-1',
  lessonId: 'c7-3-1',
  title: 'Pure Substances and Mixtures',
  thumbnail: 'kinds',
  summary:
    'A pure substance contains only one substance; a mixture contains two or more substances that are not chemically joined. A pure substance melts and boils at fixed temperatures, while a mixture melts over a range. Mechanical mixtures have parts you can see, suspensions are cloudy and settle, colloids are cloudy and never settle, and solutions are clear and the same all through.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Mixtures and Solutions', title: 'Pure Substances and Mixtures', subtitle: 'What pure means to a chemist' }],
      lines: [
        { say: 'A carton of juice says one hundred percent pure. A bottle says pure spring water. To a chemist, neither is pure.', show: 'title' },
        { say: 'In this video, you will learn what pure means in science, and how to sort mixtures into four kinds.' },
      ],
    },
    {
      chapter: 'Pure or mixture?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'pure', tone: 'definition', title: 'Pure substance', md: 'Contains only **one** substance: distilled water, oxygen, table salt, copper.' },
        { kind: 'callout', id: 'mix', tone: 'definition', title: 'Mixture', md: '**Two or more** substances mixed but **not chemically joined**: air, sea water, orange juice, soil.' },
      ],
      lines: [
        { say: 'A pure substance contains only one substance, made of only one kind of particle. Distilled water, oxygen gas, table salt and copper are pure substances.', show: 'pure' },
        { say: 'A mixture contains two or more substances that are mixed together but not chemically joined. Each keeps its own properties, and they can be separated again.', show: 'mix' },
        { say: 'In everyday talk, pure means nothing added. Pure orange juice has nothing added, but it is still a mixture of water, sugars, acids and much more. And tap water has minerals dissolved in it, so only distilled water is pure.' },
      ],
    },
    {
      chapter: 'A test for purity',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Sample', 'Melts', 'So it is…'], rows: [['A', 'sharply at 122 °C', 'pure'], ['B', 'from 110 °C to 118 °C', 'a mixture']] },
      ],
      lines: [
        { say: 'Melting points give us a test. A pure solid melts sharply, at one exact temperature. A mixture melts gradually, over a range of temperatures.', show: 't' },
        { say: 'Sample A melts sharply at one hundred and twenty-two degrees, so it is pure.', focus: 't.0' },
        { say: 'Sample B starts to melt at one hundred and ten degrees and is not fully melted until one hundred and eighteen. It melts over a range, so it is a mixture.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Four kinds of mixture',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'kinds',
          head: ['Kind', 'See the parts?', 'Clear?', 'Settles?', 'Example'],
          rows: [
            ['mechanical', 'yes', 'separate pieces', 'already apart', 'gravel and sand'],
            ['suspension', 'not at first', 'cloudy', 'yes', 'muddy water'],
            ['colloid', 'no', 'cloudy', 'never', 'milk, fog'],
            ['solution', 'no', 'clear', 'never', 'salt water'],
          ],
        },
      ],
      lines: [
        { say: 'Mixtures are sorted by how well their parts are mixed. In a mechanical mixture, you can see the parts and pick them out, like gravel and sand.', show: 'kinds', focus: 'kinds.0' },
        { say: 'A suspension is cloudy, and its parts settle out if it is left to stand, like muddy water.', focus: 'kinds.1' },
        { say: 'A colloid is cloudy too, but its tiny bits are spread so finely that they never settle, like milk or fog.', focus: 'kinds.2' },
        { say: 'And a solution is one substance dissolved completely in another. It is usually clear, it looks the same all through, and it never separates by standing.', focus: 'kinds.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A mixture looks cloudy, but even after a week nothing has settled. What kind of mixture is it?',
          choices: ['A colloid', 'A solution', 'A suspension', 'A mechanical mixture'],
          answer: 0,
          working: 'It is cloudy, so not a solution. Nothing settles, so not a suspension. Cloudy and never settling: a colloid.',
        },
      ],
      lines: [
        { say: 'Your turn. A mixture looks cloudy, but even after a week nothing has settled. What kind of mixture is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, a colloid. It is cloudy, so it is not a solution, and nothing settles, so it is not a suspension.', show: 'q.answer' },
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
            'A **pure substance** contains only one substance.',
            'A **mixture** has two or more, not chemically joined.',
            'Pure: melts at one temperature. Mixture: melts over a range.',
            'Mechanical, suspension, colloid, solution.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A pure substance contains only one substance.', show: 'sum.0' },
        { say: 'A mixture contains two or more substances that are not chemically joined.', show: 'sum.1' },
        { say: 'A pure substance melts at one fixed temperature, and a mixture melts over a range.', show: 'sum.2' },
        { say: 'And mixtures can be mechanical mixtures, suspensions, colloids or solutions. Next, you will look closely at solutions.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
