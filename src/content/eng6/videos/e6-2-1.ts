import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-2-1',
  lessonId: 'e6-2-1',
  title: 'Personification and Hyperbole',
  summary:
    'Figures of speech say things that are not literally true in order to say something truer. Personification gives human qualities to non-human things, hyperbole is a huge exaggeration for effect, and similes and metaphors compare.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Personification and Hyperbole', subtitle: 'Figures of speech' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['The wrinkled sea beneath him crawls;', 'He watches from his mountain walls,', 'And like a thunderbolt he falls.'], by: 'Alfred Tennyson, “The Eagle”' },
      ],
      lines: [
        { say: 'Poets often say things that are not literally true, in order to say something truer.', show: 'title' },
        { say: 'When Alfred Tennyson writes that the sea crawls, he does not mean it has legs. He wants you to see the sea far below, wrinkled and slow.', show: ['q.0', 'q.1', 'q.2'], focus: 'q.0' },
        { say: 'In this lesson, you will add two figures of speech to similes and metaphors: personification and hyperbole.' },
      ],
    },
    {
      chapter: 'Four figures of speech',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Figure of speech', md: 'A **figure of speech** is a special use of language that is not literally true, used to create a picture or a feeling.' },
        {
          kind: 'table',
          id: 't',
          head: ['Figure of speech', 'What it does', 'Example'],
          rows: [
            ['**Simile**', 'compares using *like* or *as*', '*And like a thunderbolt he falls.*'],
            ['**Metaphor**', 'says one thing *is* another', '*My little brother is a whirlwind in the kitchen.*'],
            ['**Personification**', 'gives human qualities to something not human', '*The wrinkled sea beneath him crawls.*'],
            ['**Hyperbole**', 'exaggerates hugely for effect', '*This backpack weighs a ton.*'],
          ],
        },
      ],
      lines: [
        { say: 'A figure of speech is a special use of language that is not literally true, used to create a picture or a feeling.', show: 'def' },
        { say: 'A simile compares two different things using like or as. And like a thunderbolt he falls.', show: 't', focus: 't.0' },
        { say: 'A metaphor says one thing is another. My little brother is a whirlwind in the kitchen.', focus: 't.1' },
        { say: 'Personification gives human qualities or actions to something that is not human. The sea crawls, and in the poem, the eagle even has hands.', focus: 't.2' },
        { say: 'And hyperbole exaggerates hugely, for effect. This backpack weighs a ton.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Naming a figure of speech',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The old car coughed and groaned up the hill.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Hyperbole is not lying', md: '“I’ve told you a million times” is an exaggeration so big that no one is meant to believe it. It means “many times”, said with feeling.' },
      ],
      lines: [
        { say: 'Which figure of speech is this?', show: 'q' },
        { say: 'Look for like or as. There are none, so it is not a simile. Cars cannot really cough or groan. Those are things people do. So it is personification.', focus: 'q' },
        { say: 'Here is a common mistake. Hyperbole is not lying. I’ve told you a million times is an exaggeration so big that no one is meant to believe it. Everyone understands that it means many times, said with feeling.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'What figures of speech add',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The fog comes', 'on little cat feet.', 'It sits looking', 'over harbor and city', 'on silent haunches', 'and then moves on.'], by: 'Carl Sandburg, “Fog”' },
      ],
      lines: [
        { say: 'A figure of speech packs a lot of meaning into a few words. To explain one, ask what the two things have in common, and what feeling the comparison creates.' },
        { say: 'Carl Sandburg’s whole poem Fog compares the fog to a cat.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4', 'q.5'] },
        { say: 'Think about how cats move: softly, quietly, on padded feet. They sit very still, then wander off.', focus: ['q.1', 'q.4'] },
        { say: 'So the fog must arrive silently, settle over the city, and drift away without a sound.', focus: 'q' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“I’m so hungry I could eat a horse.” Which figure of speech is this?',
          choices: ['Simile', 'Hyperbole', 'Personification', 'Metaphor'],
          answer: 1,
          working: 'No one could really eat a horse: it is a huge exaggeration that shows how hungry the speaker is.',
        },
      ],
      lines: [
        { say: 'Your turn. Which figure of speech is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, hyperbole. No one could really eat a horse. It is a huge exaggeration that shows how hungry the speaker is.', show: 'q2.answer' },
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
            'A **simile** uses *like* or *as*; a **metaphor** says one thing *is* another.',
            '**Personification** gives human actions or qualities to non-human things.',
            '**Hyperbole** is a huge exaggeration for effect.',
            'Explain a figure of speech: what is shared, and what feeling it creates.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A simile uses like or as, and a metaphor says one thing is another.', show: 'sum.0' },
        { say: 'Personification gives human actions or qualities to non-human things.', show: 'sum.1' },
        { say: 'Hyperbole is a huge exaggeration for effect.', show: 'sum.2' },
        { say: 'And to explain a figure of speech, ask what is shared, and what feeling it creates.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
