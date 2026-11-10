import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-2-2',
  lessonId: 'e6-2-2',
  title: 'Sound Devices and Repetition',
  thumbnailTitle: 'Sound Devices',
  summary:
    'Sound devices choose words for how they sound: alliteration repeats beginning sounds, assonance repeats vowel sounds, onomatopoeia sounds like what it names, and rhyme matches endings. Repetition and refrains make words stand out and build rhythm.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Sound Devices', subtitle: 'Words chosen for their sound' }],
      lines: [
        { say: 'Poetry is meant to be heard. Poets choose words for their sounds as well as their meanings, so that a line can hiss, buzz, rush or slow down.', show: 'title' },
        { say: 'In this lesson, you will learn the main sound devices, and the power of repetition.' },
      ],
    },
    {
      chapter: 'Sound devices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Sound device', md: 'A **sound device** is a way of choosing and arranging words for how they **sound** when read aloud, not only for what they mean.' },
        {
          kind: 'table',
          id: 't',
          head: ['Device', 'What it is', 'Example'],
          rows: [
            ['**Alliteration**', 'the same beginning sound in nearby words', 'He **c**lasps the **c**rag with **c**rooked hands'],
            ['**Assonance**', 'the same vowel sound inside nearby words', '*Each sw**ee**t gr**ee**n l**ea**f*'],
            ['**Onomatopoeia**', 'a word that sounds like what it names', '*buzz, crackle, hiss, splash*'],
            ['**Rhyme**', 'words whose endings sound the same', '*witches / ditches*'],
          ],
        },
      ],
      lines: [
        { say: 'A sound device is a way of choosing and arranging words for how they sound when read aloud. Sound devices make a line musical, help it stick in the memory, and can even imitate the thing being described.', show: 'def' },
        { say: 'Alliteration is the same beginning sound in nearby words. He clasps the crag with crooked hands.', show: 't', focus: 't.0' },
        { say: 'Assonance is the same vowel sound inside nearby words. Each sweet green leaf.', focus: 't.1' },
        { say: 'Onomatopoeia is a word that sounds like what it names, like buzz, crackle, hiss and splash.', focus: 't.2' },
        { say: 'And rhyme is words whose endings sound the same, like witches and ditches.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Hearing the devices',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Faster than fairies, faster than witches,', 'Bridges and houses, hedges and ditches;', 'And charging along like troops in a battle,', 'All through the meadows the horses and cattle:'], by: 'Robert Louis Stevenson, “From a Railway Carriage”' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Sounds, not letters', md: '*Cat* and *city* both start with c, but do not alliterate: *city* begins with an s sound. *Kite* and *cat* do alliterate.' },
      ],
      lines: [
        { say: 'Robert Louis Stevenson’s poem about a speeding train is full of sound.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Which sound device is in the first line? Say it aloud, and listen to the starts of the words: faster, fairies, faster. The same beginning sound repeats, so it is alliteration.', focus: 'q.0' },
        { say: 'Witches and ditches, battle and cattle, also rhyme.', focus: ['q.1', 'q.3'] },
        { say: 'Here is a common mistake. Alliteration and assonance are about sounds, not letters. Cat and city both start with C, but they do not alliterate, because city begins with an S sound. Kite and cat do.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Repetition and refrain',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Refrain', md: 'A **refrain** is a line or group of lines that repeats regularly in a poem, like the chorus of a song.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['We **waited** and we **waited**,', 'As the cold rain came down,', 'We **waited** for the last bus', 'To carry us to town.'] },
      ],
      lines: [
        { say: 'When a poet repeats a word, phrase or line, the repetition makes it stand out, and can create a rhythm or a feeling. A line that repeats regularly, like the chorus of a song, is called a refrain.', show: 'def' },
        { say: 'In this short poem, the word waited comes three times in three lines.', show: 'q' },
        { say: 'Saying it again and again makes the reader feel how long the wait is. So the repetition stresses how long and tiring the wait was.', focus: 'q' },
        { say: 'In Stevenson’s poem, the repeated pattern, faster than, faster than, gives the lines a quick, steady beat, like a train’s wheels clattering on the rails.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“The bacon sizzled and the fire crackled.” Which sound device is used?',
          choices: ['Alliteration', 'Assonance', 'Onomatopoeia', 'A refrain'],
          answer: 2,
          working: '“Sizzled” and “crackled” sound like the noises they name.',
        },
      ],
      lines: [
        { say: 'Your turn. Which sound device is used here? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C, onomatopoeia. Sizzled and crackled sound like the noises they name.', show: 'q2.answer' },
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
            '**Alliteration** repeats beginning sounds; **assonance** repeats vowel sounds.',
            '**Onomatopoeia** sounds like what it names.',
            '**Repetition** builds rhythm or feeling; a **refrain** repeats like a chorus.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Alliteration repeats beginning sounds, and assonance repeats vowel sounds inside words.', show: 'sum.0' },
        { say: 'Onomatopoeia sounds like what it names.', show: 'sum.1' },
        { say: 'And repetition makes words stand out and builds rhythm or feeling. A refrain repeats, like a chorus.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
