import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-1-5',
  lessonId: 'e10-1-5',
  title: 'Theme, Symbol and Irony',
  thumbnailTitle: 'Theme and Irony',
  summary:
    'A theme is a complete, general statement about life that a story supports. Symbols stand for ideas, and irony comes in three kinds: verbal, situational and dramatic.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Short Stories', title: 'Theme, Symbol and Irony', subtitle: 'What a story is really saying' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['But in a last word to the wise of these days let it be said that of all who give gifts these two were the wisest.'], by: 'O. Henry, “The Gift of the Magi”' },
      ],
      lines: [
        { say: 'At the end of “The Gift of the Magi”, a young couple have each sold their greatest treasure to buy a present for the other. Then O. Henry steps forward to tell us what he thinks.', show: 'title' },
        { say: 'Two people who end up with useless presents are called the wisest? That surprise is irony, and it points us to the story’s theme.', show: 'q' },
        { say: 'In this lesson, you will learn to state a theme, interpret a symbol and recognize three kinds of irony.' },
      ],
    },
    {
      chapter: 'Theme',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theme', md: 'The central message about life. A **topic** is a word, like love. A theme is a **complete sentence** about the topic.' },
        { kind: 'text', id: 'ans', size: 'md', md: 'The love behind a sacrifice matters more than the gift itself.' },
      ],
      lines: [
        { say: 'The theme of a story is its central message or insight about life. A topic is just a word, like love or greed. A theme is a complete sentence that says something about that topic.', show: 'def' },
        { say: 'Let’s write one for “The Gift of the Magi”. The topic is love and sacrifice.' },
        { say: 'Turn that into a general statement, with no names, orders or absolutes: the love behind a sacrifice matters more than the gift itself.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Symbol',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Symbol', md: 'An object, place, person or action that stands for something beyond itself.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'The **open window** in “The Story of an Hour”: new life opening ahead',
            'The **combs** and the **watch chain**: the love each partner showed',
          ],
        },
      ],
      lines: [
        { say: 'A symbol is an object, place, person or action that stands for something beyond itself, usually an idea or a feeling.', show: 'def' },
        { say: 'Mrs. Mallard realizes she is free while sitting at an open window, and the window suggests the new life opening in front of her.', show: 'b.0', focus: 'b.0' },
        { say: 'In “The Gift of the Magi”, the combs and the watch chain stand for the love each partner showed by what they gave up.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Three kinds of irony',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Irony', 'What it is'],
          rows: [
            ['**Verbal**', 'saying the opposite of what is meant'],
            ['**Situational**', 'the opposite of what was expected happens'],
            ['**Dramatic**', 'the reader knows what a character does not'],
          ],
        },
      ],
      lines: [
        { say: 'Verbal irony is when a speaker says the opposite of what they mean. In “The Cask of Amontillado”, Montresor wishes Fortunato a long life while planning to end it.', show: 't.0', focus: 't.0' },
        { say: 'Situational irony is when what happens is the opposite of what was expected. In “The Gift of the Magi”, each gift was bought for the very treasure the other has just sold.', show: 't.1', focus: 't.1' },
        { say: 'Dramatic irony is when the reader knows something a character does not. The doctors think Mrs. Mallard died of joy, but the reader knows better.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Irony is not just bad luck', md: 'Rain on a picnic day is unlucky, not ironic. Situational irony needs a reversal of what was **expected**.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Irony is not just bad luck.', show: 'm' },
        { say: 'Rain on a picnic day is unlucky, but it is not ironic. Situational irony needs a reversal of what was expected, like a fire station burning down.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is an example of situational irony?',
          choices: [
            'It rains on the day of the school picnic, so it is cancelled.',
            'A fire station burns down while the crew is out at a party.',
            'A student says “Lovely weather!” while standing in a storm.',
            'The reader knows a secret that a character has not learned.',
          ],
          answer: 1,
          working: 'Situational irony reverses what was expected: a fire station is expected to be safe from fire. Choice C is verbal irony and Choice D is dramatic irony.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is an example of situational irony? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. A fire station is expected to be safe from fire, so its burning down reverses what we expect. Choice C is verbal irony, and Choice D is dramatic irony.', show: 'q2.answer' },
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
            'A theme is a complete, general statement that the story supports.',
            'A symbol is an object that stands for an idea.',
            'Irony is verbal, situational or dramatic.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A theme is a complete, general statement about life that the story supports.', show: 'sum.0' },
        { say: 'A symbol is an object that stands for an idea, and you support your reading with the moment that links them.', show: 'sum.1' },
        { say: 'Irony can be verbal, situational or dramatic.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
