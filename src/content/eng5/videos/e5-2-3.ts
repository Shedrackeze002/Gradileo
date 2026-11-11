import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-2-3',
  lessonId: 'e5-2-3',
  title: 'Images and the Senses',
  summary:
    'Imagery is language that appeals to sight, hearing, smell, taste or touch. Vivid words are exact words that help the reader picture one particular thing, such as bounded instead of went.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Images and the Senses', subtitle: 'Words that paint pictures' }],
      lines: [
        { say: 'When you read a good poem, you can almost see, hear, smell, taste or feel what the poet describes.', show: 'title' },
        { say: 'Words that create these pictures in your mind are called images, or imagery. In this lesson, you will learn which senses an image speaks to, and how exact words make images stronger.' },
      ],
    },
    {
      chapter: 'Imagery',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Imagery', md: '**Imagery** is language that appeals to one of the five senses: **sight**, **hearing**, **smell**, **taste** or **touch**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Sense', 'Example image'],
          rows: [
            ['Sight', '*a red kite against the grey sky*'],
            ['Hearing', '*the crunch of boots on frozen snow*'],
            ['Smell', '*the smoky scent of the campfire*'],
            ['Taste', '*sour lemonade that made us squint*'],
            ['Touch', '*the rough, scratchy wool of the blanket*'],
          ],
        },
      ],
      lines: [
        { say: 'Imagery is language that appeals to one of the five senses: sight, hearing, smell, taste or touch.', show: 'def' },
        { say: 'A red kite against the grey sky is something we see. The crunch of boots on frozen snow is something we hear.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'The smoky scent of the campfire is a smell, and sour lemonade that made us squint is a taste.', focus: ['t.2', 't.3'] },
        { say: 'And the rough, scratchy wool of the blanket is something we feel, by touch.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Seeing the wind',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Who has seen the wind?', 'Neither I nor you:', 'But when the leaves hang trembling,', 'The wind is passing through.'], by: 'Christina Rossetti, “Who Has Seen the Wind?”' },
      ],
      lines: [
        { say: 'Christina Rossetti’s poem uses sight to show something you cannot see at all.', show: ['q.0', 'q.1'] },
        { say: 'We cannot see the wind. But we can see the leaves trembling, so we know the wind is there.', show: ['q.2', 'q.3'], focus: ['q.2', 'q.3'] },
        { say: 'To name the sense an image appeals to, ask: which sense would I use to notice this?' },
      ],
    },
    {
      chapter: 'Vivid words',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Vague', 'Vivid'],
          rows: [
            ['The dog *went* across the yard.', 'The dog *bounded* across the yard.'],
            ['She ate a *nice* apple.', 'She bit into a *crisp, juicy* apple.'],
            ['The *big* wave hit the boat.', 'The *towering* wave slammed into the boat.'],
          ],
        },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Vivid does not mean long', md: '*A very nice, really good, big cake* tells you less than *a three-layer chocolate cake*.' },
      ],
      lines: [
        { say: 'A vivid word is exact. It helps the reader picture one particular thing, instead of something vague.', show: 't' },
        { say: 'The dog went across the yard is vague. The dog bounded across the yard shows us how it moved, with big, happy leaps.', focus: 't.0' },
        { say: 'A nice apple tells us little. A crisp, juicy apple lets us almost taste it. And a towering wave that slammed into the boat is much stronger than a big wave that hit it.', focus: ['t.1', 't.2'] },
        { say: 'Here is a common mistake. Piling up adjectives does not make writing vivid. A very nice, really good, big cake tells you less than a three-layer chocolate cake. Choose one exact word over three vague ones.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The kettle whistled and the bacon sizzled in the pan.” Which sense does this image appeal to most?',
          choices: ['Hearing', 'Sight', 'Touch', 'Taste'],
          answer: 0,
          working: '“Whistled” and “sizzled” are both sounds, so the image appeals to hearing.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sense does this image appeal to most? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A, hearing. Whistled and sizzled are both sounds. You would notice them with your ears, even with your eyes closed.', show: 'q2.answer' },
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
            '**Imagery** appeals to sight, hearing, smell, taste or touch.',
            'Ask “which sense would I use to notice this?”',
            '**Vivid** words are exact: *bounded*, not *went*; *crisp*, not *nice*.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Imagery appeals to sight, hearing, smell, taste or touch.', show: 'sum.0' },
        { say: 'To name the sense, ask which sense you would use to notice it.', show: 'sum.1' },
        { say: 'And vivid words are exact: bounded instead of went, and crisp instead of nice.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
