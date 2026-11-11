import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c8-2-4',
  lessonId: 'c8-2-4',
  title: 'Patterns in the Periodic Table',
  thumbnailTitle: 'Periodic Table Patterns',
  thumbnail: 'mp',
  summary:
    'Properties change in a steady trend down a group, so you can predict the next element. The melting points of the alkali metals fall down the group, and caesium melts at about 29 °C. Alkali metals get more reactive down the group, but halogens get less reactive. Each element’s uses depend on its properties.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Periodic Table', title: 'Patterns in the Periodic Table', subtitle: 'Follow the trend, predict the next element' }],
      lines: [
        { say: 'Mendeleev predicted elements nobody had ever seen. You can make predictions too.', show: 'title' },
        { say: 'Because elements in a group are alike, their properties change in a steady pattern down the group. In this video, you will follow a pattern one step further, and see how properties decide what elements are used for.' },
      ],
    },
    {
      chapter: 'Trends',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'mp',
          head: ['Alkali metal', 'Melting point (°C)'],
          rows: [
            ['lithium', '181'],
            ['sodium', '98'],
            ['potassium', '63'],
            ['rubidium', '39'],
            ['caesium', '?'],
          ],
        },
      ],
      lines: [
        { say: 'A trend is a steady change in a property from one element to the next down a group. If you know the trend, you can predict the property of the next element.', show: 'mp' },
        { say: 'Here are the melting points of the alkali metals. Lithium melts at one hundred and eighty-one degrees, sodium at ninety-eight, potassium at sixty-three, and rubidium at thirty-nine.', show: ['mp.0', 'mp.1', 'mp.2', 'mp.3'] },
        { say: 'The melting point falls down the group, and it falls by less each time: eighty-three, then thirty-five, then twenty-four. So the next fall should be smaller still, about ten degrees.' },
        { say: 'That predicts about twenty-nine degrees for caesium. The real value is twenty-eight and a half degrees, so caesium would melt on a hot day.', show: 'mp.4', focus: 'mp.4' },
      ],
    },
    {
      chapter: 'Elements at work',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'uses',
          head: ['Element', 'Use', 'Property'],
          rows: [
            ['copper', 'electrical wires', 'conducts, ductile'],
            ['aluminium', 'aircraft bodies', 'strong, low density'],
            ['gold', 'phone contacts', 'conducts, never tarnishes'],
            ['argon', 'light bulbs', 'unreactive'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Trends can go either way', md: 'Reactivity **rises** down group 1 but **falls** down group 17.' },
      ],
      lines: [
        { say: 'Reactivity follows trends too, but take care with the direction. Alkali metals get more reactive down group one, while halogens get less reactive down group seventeen.', show: 'oops' },
        { say: 'The way an element is used depends on its properties. Copper conducts electricity and can be drawn into wires, so it is used for electrical wiring.', show: ['uses', 'uses.0'], focus: 'uses.0' },
        { say: 'Aluminium is strong and has a low density, so it is used for aircraft bodies.', show: 'uses.1', focus: 'uses.1' },
        { say: 'Gold conducts and never tarnishes, so it coats the contacts inside phones. And argon is unreactive, so it fills light bulbs.', show: ['uses.2', 'uses.3'], focus: 'uses.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Fluorine is at the top of group 17 and iodine is lower down. Which is more reactive?',
          choices: ['iodine, because reactivity rises down every group', 'they are equally reactive', 'neither: halogens do not react', 'fluorine, because halogens get less reactive down the group'],
          answer: 3,
          working: 'Halogens get less reactive down group 17, so fluorine, at the top, is the most reactive.',
        },
      ],
      lines: [
        { say: 'Your turn. Fluorine is at the top of group seventeen, and iodine is lower down. Which is more reactive? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Halogens get less reactive down the group, so fluorine, at the top, is the most reactive of them all.', show: 'q.answer' },
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
            'A **trend** is a steady change down a group.',
            'Follow the trend to predict the next element.',
            'Alkali metals: more reactive down. Halogens: less reactive down.',
            'An element’s uses depend on its properties.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A trend is a steady change in a property down a group.', show: 'sum.0' },
        { say: 'Follow the trend one step further, and you can predict the next element.', show: 'sum.1' },
        { say: 'Alkali metals get more reactive down the group, but halogens get less reactive.', show: 'sum.2' },
        { say: 'And each element is used for a job that suits its properties. Next, you will learn the difference between physical and chemical changes.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
