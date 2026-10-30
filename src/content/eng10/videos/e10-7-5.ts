import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-7-5',
  lessonId: 'e10-7-5',
  title: 'Word Choice, Tone and Vocabulary in Context',
  thumbnailTitle: 'Word Choice and Tone',
  thumbnail: false,
  summary:
    'Choose between easily confused words, pick words for the feelings they carry, write in a formal register, and work out unfamiliar words from context clues and word parts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Word Choice, Tone and Vocabulary', subtitle: 'The right word for the job' }],
      lines: [
        { say: 'A café sign once read: “Try our desert special!” Customers may have wondered whether they were being offered a plate of sand.', show: 'title' },
        { say: 'One letter changed the meaning. In this lesson you will choose between easily confused words, choose words for the feelings they carry, and work out unfamiliar words from context.' },
      ],
    },
    {
      chapter: 'Commonly confused words',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Word', 'Meaning', 'Example'],
          rows: [
            ['its / it’s', 'belonging to it / it is', 'It’s clear the dog hurt its paw.'],
            ['your / you’re', 'belonging to you / you are', 'You’re welcome to borrow your sister’s bike.'],
            ['then / than', 'time / comparison', 'Amara is taller than Kenji.'],
            ['affect / effect', 'to influence / a result', 'The storm will affect the flight.'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Expand the contraction', md: 'Say it in full: *it is*, *you are*. If the long form fits, use the apostrophe; if not, use the other word.' },
      ],
      lines: [
        { say: 'Many confusions come from words that sound the same but have different spellings and meanings. Its without an apostrophe means belonging to it. It’s means it is.', show: 't.0' },
        { say: 'Your means belonging to you. You’re means you are. Then is about time, and than is for comparison.', show: ['t.1', 't.2'] },
        { say: 'Affect is a verb, to influence. Effect is a noun, a result.', show: 't.3' },
        { say: 'If you are unsure, expand the contraction. If the long form fits, use the apostrophe.', hide: 't', show: 'tip' },
      ],
    },
    {
      chapter: 'Denotation and connotation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Denotation and connotation', md: '**Denotation** is a word’s dictionary meaning. **Connotation** is the feeling or judgement it carries.' },
        { kind: 'text', id: 'ex', md: '*Kwame’s decision to sail across the bay alone was courageous / bold / reckless.*\n\n**Courageous** approves. **Bold** is fairly neutral. **Reckless** condemns.', size: 'md' },
      ],
      lines: [
        { say: 'A word’s denotation is its dictionary meaning. Its connotation is the feeling or judgement it carries.', show: 'def' },
        { say: 'Slender, thin and scrawny all mean not carrying much weight, but slender sounds admiring and scrawny sounds unhealthy.' },
        { say: 'Suppose a writer wants readers to think badly of Kwame’s decision to sail across the bay alone. Courageous approves of it, bold is fairly neutral, and reckless condemns it as foolish. So the writer chooses reckless.', hide: 'def', show: 'ex' },
      ],
    },
    {
      chapter: 'Context clues and word parts',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Definition**: *the summit, the highest point of the mountain*', '**Synonym**: *lethargic; it was sluggish*', '**Antonym**: *tedious, but the second was thrilling*', '**Example**: *nocturnal animals, such as owls and bats*', '**Inference**: *so famished that she ate three plates of rice*'] },
        { kind: 'text', id: 'ans', md: '**malfunction** = *mal-* (badly) + *function* (work): a failure to work properly.', size: 'lg' },
      ],
      lines: [
        { say: 'You do not need a dictionary for every unfamiliar word. The sentence around it often gives a clue. A definition explains the word, and a synonym is a nearby word with the same meaning.', show: ['b.0', 'b.1'] },
        { say: 'An antonym clue uses a contrast word such as but. An example clue follows such as.', show: ['b.2', 'b.3'] },
        { say: 'And inference means the situation as a whole tells you.', show: 'b.4' },
        { say: 'Word parts help too. Malfunction splits into mal, meaning badly, and function. Something that works badly has failed.', hide: 'b', show: 'ans' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Slipping into conversation', md: '*The author totally goes for creepy vibes.* Fine with a friend, but in a literary essay write *The author creates a sense of dread.*' }],
      lines: [
        { say: 'A common mistake is slipping into conversation. “The author totally goes for creepy vibes” may be how you would say it to a friend.', show: 'm' },
        { say: 'But an essay needs a formal register, without slang. Write: the author creates a sense of dread.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'After the marathon, Ruth was so famished that she ate three plates of rice. What does “famished” mean?',
          choices: ['Very tired', 'Very nervous', 'Very hungry', 'Very proud'],
          answer: 2,
          working: 'Eating three plates of rice is a clue from the situation: famished means very hungry.',
        },
      ],
      lines: [
        { say: 'Your turn. After the marathon, Ruth was so famished that she ate three plates of rice. What does famished mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, very hungry. The situation gives the clue: she ate three plates of rice.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Expand contractions to choose the right word.', 'Choose words for their connotation, and keep a formal register.', 'Use context clues and word parts to work out meaning.'] }],
      lines: [
        { say: 'Let’s sum up. Expand contractions to choose the right confused word.', show: 'sum.0' },
        { say: 'Choose words for their connotation, and keep a formal register in essays.', show: 'sum.1' },
        { say: 'And use context clues and word parts to work out what an unfamiliar word means.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
