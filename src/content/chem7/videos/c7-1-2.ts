import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c7-1-2',
  lessonId: 'c7-1-2',
  title: 'What Is Matter?',
  thumbnail: 'def',
  summary:
    'Matter is anything that has mass and takes up space: solids, liquids and gases, including air. Light, sound and heat are forms of energy, not matter. A property is something we can observe or measure about a substance; qualitative properties are described in words and quantitative properties are numbers, and properties help us identify and choose substances.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Matter and Measurement', title: 'What Is Matter?', subtitle: 'The test for matter, and how we describe substances' }],
      lines: [
        { say: 'Chemistry is the study of matter. A stone is obviously matter. But what about the air in a balloon, or the light from a lamp?', show: 'title' },
        { say: 'In this video, you will learn the test for matter, and how scientists describe a substance by its properties.' },
      ],
    },
    {
      chapter: 'The test for matter',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Matter', md: 'Anything that has **mass** and takes up space (has **volume**).' },
        { kind: 'bullets', id: 'ex', items: ['Matter: a brick, water, the air in a tyre, steam.', 'Not matter: light, sound, heat, electricity. These are forms of **energy**.'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Light in weight is still matter', md: 'Helium makes a balloon float, but a full balloon has **more** mass than an empty one.' },
      ],
      lines: [
        { say: 'Matter is anything that has mass and takes up space. Mass is the amount of matter in an object, and volume is the space it takes up.', show: 'def' },
        { say: 'Solids, liquids and gases are all matter. Gases are easy to forget because most are invisible, but a blown-up balloon has a little more mass than an empty one, because the air inside has mass.', show: 'ex.0' },
        { say: 'Light, sound, heat and electricity are not matter. They are forms of energy. They have no mass, and they take up no space.', show: 'ex.1' },
        { say: 'Be careful with gases that are very light. Helium is so light that it lifts a balloon, but it still has mass, so it is still matter.', show: 'oops' },
      ],
    },
    {
      chapter: 'Properties',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'prop', tone: 'definition', title: 'Property', md: 'Something about a substance that we can **observe** or **measure**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'Described by', 'Example'],
          rows: [
            ['qualitative', 'words', 'a shiny grey metal'],
            ['quantitative', 'a number', 'it melts at 327 °C'],
          ],
        },
        { kind: 'bullets', id: 'words', items: ['**Malleable**: can be hammered into shape. **Brittle**: shatters.', '**Conductor**: lets heat or electricity through. **Soluble**: dissolves.'] },
      ],
      lines: [
        { say: 'Every substance has its own set of properties. A property is something about a substance that we can observe or measure.', show: 'prop' },
        { say: 'A qualitative property is described in words, such as a shiny grey metal. A quantitative property is measured as a number, such as a melting point.', show: 't', focus: 't' },
        { say: 'You will use some property words often. Malleable means it can be hammered into a new shape, like aluminium foil, and brittle means it shatters, like glass.', show: 'words.0' },
        { say: 'A conductor lets heat or electricity pass through, like copper, and a soluble substance dissolves in water, like sugar.', show: 'words.1' },
      ],
    },
    {
      chapter: 'Using properties as clues',
      layout: 'center',
      main: [
        { kind: 'text', id: 'puz', md: 'A shiny grey solid **conducts electricity** and is **pulled by a magnet**. Is it copper, iron or sulfur?' },
        { kind: 'bullets', id: 'steps', items: ['Sulfur is yellow and does not conduct: ruled out.', 'Copper conducts, but it is not magnetic: ruled out.', 'So it is **iron**.'] },
      ],
      lines: [
        { say: 'Properties work like clues. Here is a shiny grey solid that conducts electricity and is pulled by a magnet. Is it copper, iron or sulfur?', show: 'puz' },
        { say: 'Test one property at a time and rule out what does not fit. Sulfur is a yellow non-metal that does not conduct, so it is out.', show: 'steps.0' },
        { say: 'Copper conducts, but it is reddish-brown and not magnetic, so it is out as well.', show: 'steps.1' },
        { say: 'Only iron fits every clue.', show: 'steps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is NOT matter?',
          choices: ['The steam from a kettle', 'The air inside a football', 'The helium in a party balloon', 'The sound of a bell'],
          answer: 3,
          working: 'Sound is energy carried by vibrations; it has no mass. Steam, air and helium all have mass and take up space.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is not matter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, the sound of a bell. Sound is a form of energy, with no mass. Steam, air and helium are all gases, and gases are matter.', show: 'q.answer' },
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
            '**Matter** has mass and takes up space; gases are matter too.',
            'Light, sound, heat and electricity are energy, not matter.',
            'A **property** can be observed or measured: in words, or as a number.',
            'Properties help us identify and choose substances.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Matter is anything that has mass and takes up space, and that includes gases such as air.', show: 'sum.0' },
        { say: 'Light, sound, heat and electricity are forms of energy, not matter.', show: 'sum.1' },
        { say: 'A property is something we can observe or measure, described in words or as a number.', show: 'sum.2' },
        { say: 'And properties help us identify a substance, and choose the right one for a job. Next, you will measure mass and volume.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
