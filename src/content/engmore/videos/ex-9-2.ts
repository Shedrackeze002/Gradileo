import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-9-2',
  lessonId: 'ex-9-2',
  title: 'Love and Relationships: Sonnet 29, Neutral Tones and The Farmer’s Bride',
  thumbnail: false,
  summary:
    'Three poems from the AQA Love and Relationships cluster: Elizabeth Barrett Browning’s “Sonnet 29”, where longing ends in fulfilment; Hardy’s “Neutral Tones”, the memory of a dying love; and Mew’s “The Farmer’s Bride”, a farmer who controls and longs for his frightened wife. Quotations are from public domain editions, credited in the lesson.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry Anthology: Love and Relationships', title: 'Sonnet 29, Neutral Tones and The Farmer’s Bride', subtitle: 'Barrett Browning, Hardy and Mew' }],
      lines: [
        { say: 'Three poems from the Love and Relationships cluster: a sonnet of longing, the memory of a love that died, and a marriage built on control.', show: 'title' },
        { say: 'In this lesson, you will learn what each poem is about, read its key lines, and compare the poems.' },
      ],
    },
    {
      chapter: 'Sonnet 29',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['I think of thee!—my thoughts do twine and bud', 'About thee, as wild vines, about a tree,'], by: 'Elizabeth Barrett Browning, “Sonnet 29”' }],
      lines: [
        { say: 'Elizabeth Barrett wrote this sonnet while Robert Browning was courting her. Her thoughts grow around him like wild vines around a tree.', show: 'q' },
        { say: 'Then her argument turns. Thoughts are not enough: she wants the man himself. In the last line, he is so near that she no longer needs to think of him.' },
      ],
    },
    {
      chapter: 'Neutral Tones',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['Your eyes on me were as eyes that rove', 'Over tedious riddles solved years ago;'], by: 'Thomas Hardy, “Neutral Tones”' }],
      lines: [
        { say: 'In Neutral Tones, Hardy remembers standing with a lover by a pond on a grey winter day, when he realised their love had died.', show: 'q' },
        { say: 'She looks at him with boredom, like an old riddle already solved. Even the sun is white, drained of colour.' },
        { say: 'The poem ends with the same pond, sun and leaves it began with, so he is trapped in the memory.' },
      ],
    },
    {
      chapter: 'The Farmer’s Bride',
      layout: 'center',
      main: [{ kind: 'quote', id: 'q', lines: ['We caught her, fetched her home at last', 'And turned the key upon her, fast.'], by: 'Charlotte Mew, “The Farmer’s Bride”' }],
      lines: [
        { say: 'In The Farmer’s Bride, from nineteen sixteen, a farmer tells how his young wife became afraid of him and ran away.', caption: 'In The Farmer’s Bride, from 1916, a farmer tells how his young wife became afraid of him and ran away.', show: 'q' },
        { say: 'She is hunted down like an animal and locked in, treated as his property. Yet the poem ends with his longing for her breaking out of control.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why does “Neutral Tones” end with the same images it began with?',
          choices: ['Because Hardy ran out of new images', 'To show that the speaker is trapped in the memory', 'To show that the couple have made up', 'Because the poem is a sonnet'],
          answer: 1,
          working: 'The cyclical structure brings him back to the pond: he cannot escape that moment.',
        },
      ],
      lines: [
        { say: 'Your turn. Why does Neutral Tones end with the same images it began with? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The cyclical structure brings him back to the pond every time love hurts him: he is trapped in the memory.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sonnet 29: longing that ends in fulfilment.', 'Neutral Tones: the lasting memory of a love that died.', 'The Farmer’s Bride: control, and a lonely longing.'] }],
      lines: [
        { say: 'Let’s sum up. In Sonnet 29, longing gives way to the lover himself.', show: 'sum.0' },
        { say: 'Neutral Tones remembers, in bleak images, the day a love died.', show: 'sum.1' },
        { say: 'And The Farmer’s Bride shows a man who controls his wife, and longs for her.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
