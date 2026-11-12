import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'ex-9-3',
  lessonId: 'ex-9-3',
  title: 'Love and Relationships: the Modern Poems',
  thumbnail: false,
  summary:
    'The nine more recent poems of the AQA Love and Relationships cluster, described in our own words because they are still in copyright: poems of parents and children, of grandparents and memory, and of romantic love. Each poem’s first publication is credited in the lesson.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry Anthology: Love and Relationships', title: 'The Modern Poems', subtitle: 'Nine poems, in our own words' }],
      lines: [
        { say: 'Nine poems of the Love and Relationships cluster were written since the nineteen sixties, and they are still in copyright. So this video describes them in our own words, and does not quote them.', caption: 'Nine poems of the Love and Relationships cluster were written since the 1960s, and they are still in copyright. So this video describes them in our own words, and does not quote them.', show: 'title' },
        { say: 'Read the full poems in your anthology as you go.' },
      ],
    },
    {
      chapter: 'Parents and children',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Walking Away: Cecil Day-Lewis', 'Follower: Seamus Heaney', 'Mother, any distance: Simon Armitage', 'Before You Were Mine: Carol Ann Duffy'] }],
      lines: [
        { say: 'In Walking Away, a father remembers watching his young son walk away from him, and accepts that a loving parent must allow a child to leave.', show: 'b.0' },
        { say: 'In Follower, Heaney remembers stumbling behind his father’s plough. Now his old father stumbles behind him.', show: 'b.1' },
        { say: 'In Mother, any distance, a son measures his new home while his mother holds the tape, a bond he must stretch to leave.', show: 'b.2' },
        { say: 'And in Before You Were Mine, a daughter imagines her mother’s glamorous youth, before she was born.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Grandparents and memory',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Eden Rock: Charles Causley', 'Climbing My Grandfather: Andrew Waterhouse'] }],
      lines: [
        { say: 'In Eden Rock, a speaker pictures his dead parents young again, at a picnic by a stream, calling him to cross over.', show: 'b.0' },
        { say: 'In Climbing My Grandfather, the whole poem is one extended metaphor: the grandfather is a mountain to be climbed.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Romantic love',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Winter Swans: Owen Sheers', 'Singh Song!: Daljit Nagra', 'Letters from Yorkshire: Maura Dooley'] }],
      lines: [
        { say: 'In Winter Swans, a couple who have argued see two swans, which pair for life, and find their hands joined again.', show: 'b.0' },
        { say: 'In Singh Song, a young shopkeeper keeps leaving the shop to be with his new wife.', show: 'b.1' },
        { say: 'And in Letters from Yorkshire, two people living very different lives stay close through their letters.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which two poems show a parent letting a child go?',
          choices: ['Winter Swans and Singh Song!', 'Eden Rock and Letters from Yorkshire', 'Walking Away and Mother, any distance', 'Follower and Climbing My Grandfather'],
          answer: 2,
          working: 'In both, a child leaves: Day-Lewis writes as the parent, Armitage as the son.',
        },
      ],
      lines: [
        { say: 'Your turn. Which two poems show a parent letting a child go? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. In Walking Away and Mother, any distance, a child leaves. Day-Lewis writes from the parent’s side, and Armitage from the son’s.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Parents and children: Day-Lewis, Heaney, Armitage, Duffy.', 'Grandparents and memory: Causley, Waterhouse.', 'Romantic love: Sheers, Nagra, Dooley.'] }],
      lines: [
        { say: 'Let’s sum up. Four poems explore parents and children.', show: 'sum.0' },
        { say: 'Two explore memory and the generations before us.', show: 'sum.1' },
        { say: 'And three celebrate romantic love, across arguments, cultures and distance.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
