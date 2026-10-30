import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-2-2',
  lessonId: 'e10-2-2',
  title: 'Sound and Rhythm',
  summary:
    'Poets use sound devices such as alliteration, assonance and onomatopoeia. A rhyme scheme is written with letters, and metre describes the pattern of stressed syllables, as in iambic pentameter.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [
        { kind: 'title', id: 'title', kicker: 'Poetry', title: 'Sound and Rhythm', subtitle: 'Poems are made to be heard' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Once upon a midnight dreary, while I pondered, weak and weary,', 'Over many a quaint and curious volume of forgotten lore—', 'While I nodded, nearly napping, suddenly there came a tapping,', 'As of some one gently rapping, rapping at my chamber door.'], by: 'Edgar Allan Poe, “The Raven”' },
      ],
      lines: [
        { say: 'Read these lines from Poe’s “The Raven” aloud, and listen.', show: ['title', 'q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Before you have worked out what is happening, the sounds have set a mood. Dreary chimes with weary, and the tapping and rapping come again and again, like the knock itself. In this lesson, you will learn the devices of sound, how to write a rhyme scheme, and how to hear a line’s metre.' },
      ],
    },
    {
      chapter: 'Sound devices',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Alliteration**: the same first consonant sound',
            '**Assonance**: the same vowel sound',
            '**Consonance**: the same consonant sound inside or at the end of words',
            '**Onomatopoeia**: a word that imitates a sound',
            '**Internal rhyme**: rhyme within one line',
          ],
        },
      ],
      lines: [
        { say: 'Alliteration is the same consonant sound at the start of nearby words, like silent snow slid slowly.', show: 'b.0', focus: 'b.0' },
        { say: 'Assonance repeats a vowel sound, and consonance repeats a consonant sound inside or at the end of words.', show: ['b.1', 'b.2'], focus: ['b.1', 'b.2'] },
        { say: 'Onomatopoeia is a word that imitates the sound it names, like buzz or sizzle. Internal rhyme is rhyme within a single line.', show: ['b.3', 'b.4'], focus: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Rhyme scheme',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['In Flanders fields the poppies grow', 'Between the crosses, row on row', 'That mark our place: and in the sky', 'The larks still bravely singing, fly', 'Scarce heard amid the guns below.'], by: 'John McCrae, “In Flanders Fields”' },
        { kind: 'text', id: 'ans', size: 'md', md: 'grow A, row A, sky B, fly B, below A: **AABBA**' },
      ],
      lines: [
        { say: 'A rhyme scheme is written with letters. The first line’s end sound is A, and every line that rhymes with it is also A. The next new end sound is B.' },
        { say: 'Let’s try the first stanza of “In Flanders Fields”. The last words are grow, row, sky, fly and below.', show: 'q' },
        { say: 'Grow is A, and row rhymes with it, so row is A. Sky is a new sound, B, and fly rhymes with it. Below rhymes with grow, so it is A again.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Stress and metre',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Iamb and trochee', md: 'An **iamb** is unstressed then stressed: da-DUM. A **trochee** is stressed then unstressed: DUM-da. Five iambs in a line make **iambic pentameter**.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['That time of year thou mayst in me behold'], by: 'William Shakespeare, “Sonnet 73”' },
      ],
      lines: [
        { say: 'In many poems, stressed and unstressed syllables fall in a regular pattern called metre. An iamb is unstressed then stressed, da-DUM. A trochee is the other way round, DUM-da.', show: 'def' },
        { say: 'Iambic pentameter, five iambs in a line, is the most common metre in English poetry, and it is close to the rhythm of ordinary speech.', focus: 'def' },
        { say: 'Tap the beat on this line. That TIME of YEAR thou MAYST in ME be-HOLD. Ten syllables and five stresses make five iambs.', show: 'q', focus: 'q' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Sounds, not letters', md: '“Knock” and “kneed” both begin with k, but their first sound is “n”. “City” and “sun” alliterate, because both begin with an “s” sound.' },
      ],
      lines: [
        { say: 'Here is a common mistake. These devices are about sounds, not spelling.', show: 'm' },
        { say: 'Knock and kneed both begin with the letter k, but their first sound is n. City and sun begin with different letters but the same s sound, so they do alliterate.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The four lines of a stanza end with these words: bright, night, sea, free. What is the rhyme scheme?',
          choices: ['AABB', 'ABAB', 'ABBA', 'AAAB'],
          answer: 0,
          working: 'Bright and night rhyme, so they are both A. Sea and free rhyme, so they are both B. The scheme is AABB.',
        },
      ],
      lines: [
        { say: 'Your turn. The four lines of a stanza end with these words: bright, night, sea, free. What is the rhyme scheme? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A, A A B B. Bright and night rhyme, so they are both A. Sea and free rhyme, so they are both B.', show: 'q2.answer' },
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
            'Sound devices repeat or imitate sounds, not letters.',
            'A rhyme scheme uses a new letter for each new end sound.',
            'An iamb is da-DUM; iambic pentameter is five iambs.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sound devices repeat or imitate sounds, not letters.', show: 'sum.0' },
        { say: 'A rhyme scheme uses the same letter for lines that rhyme, and a new letter for each new end sound.', show: 'sum.1' },
        { say: 'An iamb is da-DUM, and iambic pentameter is five iambs in a line. Always ask what each sound or beat adds to the poem.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
