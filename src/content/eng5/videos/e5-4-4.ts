import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-4-4',
  lessonId: 'e5-4-4',
  title: 'Homophones and Multiple-Meaning Words',
  thumbnailTitle: 'Homophones and Multiple Meanings',
  summary:
    'Homophones sound the same but are spelled differently and mean different things, like their, there and they’re. A multiple-meaning word has one spelling but several meanings, and the sentence shows which one is used.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Words', title: 'Homophones and Multiple-Meaning Words', subtitle: 'Words that trip us up' }],
      lines: [
        { say: 'Some words sound exactly alike, but are spelled differently. Others are spelled exactly alike, but mean different things. Both can trip up a reader or a writer.', show: 'title' },
        { say: 'In this lesson, you will learn to choose the right homophone, and to tell which meaning of a multiple-meaning word a sentence uses.' },
      ],
    },
    {
      chapter: 'Homophones',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Homophones', md: '**Homophones** are words that **sound the same** but have **different spellings and meanings**: *flour* (for baking) and *flower* (in a garden).' },
        {
          kind: 'table',
          id: 't',
          head: ['Homophones', 'Meanings'],
          rows: [
            ['their / there / they’re', 'belonging to them / in that place / they are'],
            ['to / too / two', 'towards / also, or too much / the number 2'],
            ['your / you’re', 'belonging to you / you are'],
            ['weak / week', 'not strong / seven days'],
          ],
        },
      ],
      lines: [
        { say: 'Homophones are words that sound the same, but have different spellings and meanings. Flour, for baking, and flower, in a garden.', show: 'def' },
        { say: 'T H E I R means belonging to them. T H E R E means in that place. And T H E Y apostrophe R E is short for they are.', caption: 'Their means belonging to them. There means in that place. And they’re is short for they are.', show: 't', focus: 't.0' },
        { say: 'T O means towards. T O O means also, or too much. And T W O is the number two.', caption: 'To means towards. Too means also, or too much. And two is the number 2.', focus: 't.1' },
        { say: 'Your, Y O U R, means belonging to you, and you’re, with an apostrophe, is short for you are. And weak means not strong, while week is seven days.', caption: 'Your means belonging to you, and you’re is short for you are. And weak means not strong, while week is seven days.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Choosing the right homophone',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The children left _____ bikes by the gate.'] },
        { kind: 'text', id: 'ans', size: 'lg', md: '**their** bikes: the bikes belong to the children' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Test the short forms', md: '“They **are** bikes by the gate”? That makes no sense, so *they’re* is wrong.' },
      ],
      lines: [
        { say: 'Which word fills the gap: their, there, or they’re?', show: 'q' },
        { say: 'The bikes belong to the children, and the word for belonging to them is T H E I R.', caption: 'The bikes belong to the children, and the word for belonging to them is their.', show: 'ans', focus: 'ans' },
        { say: 'Here is a tip to avoid a common mistake. They’re and you’re are short for they are and you are. Say the long form in the sentence. They are bikes by the gate? That does not make sense, so they’re is wrong.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Multiple-meaning words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Multiple-meaning word', md: 'A **multiple-meaning word** is spelled and said the same way but has more than one meaning: a baseball **bat**, and a **bat** that flies at night.' },
        {
          kind: 'table',
          id: 't',
          head: ['Word', 'One meaning', 'Another meaning'],
          rows: [
            ['bark', 'the sound a dog makes', 'the outside of a tree trunk'],
            ['ring', 'a band worn on a finger', 'the sound of a bell'],
            ['light', 'not heavy', 'brightness, as from a lamp'],
          ],
        },
      ],
      lines: [
        { say: 'A multiple-meaning word is spelled and said the same way, but has more than one meaning, like a baseball bat, and a bat that flies at night.', show: 'def' },
        { say: 'Bark can be the sound a dog makes, or the outside of a tree trunk. A ring can be worn on a finger, or be the sound of a bell.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'The rest of the sentence tells you which meaning is used. The box of feathers was so light that the baby could carry it. The baby could carry the box, so the sentence is about weight. Light means not heavy.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which sentence uses the right homophone?',
          choices: [
            'The children left there bikes by the gate.',
            'We waited a whole weak for the parcel.',
            'You’re coat is on the floor.',
            'The parcel took a whole week to arrive.',
          ],
          answer: 3,
          working: '“Week” means seven days. A needs “their”, B needs “week”, and C needs “your” (“You are coat” makes no sense).',
        },
      ],
      lines: [
        { say: 'Your turn. Which sentence uses the right homophone? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Week, W E E K, means seven days. Choice A needs their, for belonging to them. Choice B needs week, not weak. And Choice C needs your, Y O U R, because you are coat makes no sense.', caption: 'The answer is D. Week means seven days. Choice A needs their, for belonging to them. Choice B needs week, not weak. And Choice C needs your, because you are coat makes no sense.', show: 'q2.answer' },
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
            '**Homophones** sound the same but are spelled differently and mean different things.',
            'Test *they’re* and *you’re* by saying *they are* and *you are*.',
            'A **multiple-meaning word** has one spelling but several meanings; the sentence shows which.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Homophones sound the same, but are spelled differently and mean different things.', show: 'sum.0' },
        { say: 'Test they’re and you’re by saying they are and you are.', show: 'sum.1' },
        { say: 'And a multiple-meaning word has one spelling but several meanings. The sentence shows which one is used.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
