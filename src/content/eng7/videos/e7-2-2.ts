import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-2-2',
  lessonId: 'e7-2-2',
  title: 'Rhythm and Sound',
  summary:
    'Rhythm is the pattern of stressed and unstressed syllables in a line of poetry, and each stressed syllable is a beat. An iamb is an unstressed syllable followed by a stressed one, and poets match rhythm, repetition and sound to a poem’s meaning.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Rhythm and Sound', subtitle: 'The beat of a poem' }],
      lines: [
        { say: 'Read a poem aloud and you will feel a beat, like music.', show: 'title' },
        { say: 'That beat is the poem’s rhythm. In this video we learn to find the beats in a line, meet the most common rhythm in English poetry, and see how sound can match meaning.' },
      ],
    },
    {
      chapter: 'Stressed syllables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rhythm', md: '**Rhythm** is the pattern of **stressed** (strong) and **unstressed** (weak) syllables in a line of poetry. Each strong syllable is called a **beat**.' },
        { kind: 'text', id: 'w', size: 'lg', md: '**GAR**-den · to-**DAY** · ba-**NA**-na' },
      ],
      lines: [
        { say: 'Every word of more than one syllable has one syllable that we say more strongly. That syllable is stressed.', show: 'w' },
        { say: 'We say garden with the stress at the start, today with the stress at the end, and banana with the stress in the middle.', focus: 'w' },
        { say: 'Rhythm is the pattern of stressed and unstressed syllables in a line of poetry. Each strong syllable is called a beat.', show: 'def' },
        { say: 'To find the beats, say the line aloud and tap your finger on the strong syllables.', focus: 'def' },
      ],
    },
    {
      chapter: 'Counting beats',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Half a league, half a league,', 'Half a league onward,', 'All in the valley of Death', 'Rode the six hundred.'], by: 'Alfred Tennyson, “The Charge of the Light Brigade”, first lines' },
        { kind: 'text', id: 'a', size: 'md', md: '**HALF** a **LEAGUE**, **HALF** a **LEAGUE**: four beats, **DUM**-da-da' },
      ],
      lines: [
        { say: 'Listen to the opening of a poem by Alfred Tennyson about a cavalry charge.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Half a league, half a league. Tap it out and you get four beats, each a strong syllable followed by two weak ones.', show: 'a', focus: 'q.0' },
        { say: 'That rhythm drums like horses’ hooves, which suits a poem about soldiers charging on horseback.', focus: 'a' },
      ],
    },
    {
      chapter: 'The iamb',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Iamb', md: 'An **iamb** is an unstressed syllable followed by a stressed one: da-**DUM**, as in *to-**DAY***. Five iambs in a line make **iambic pentameter**.' },
        { kind: 'text', id: 'p', size: 'lg', md: 'shall **I** · com-**PARE** · thee **TO** · a **SUM** · mer’s **DAY**' },
      ],
      lines: [
        { say: 'The most common rhythm in English poetry is the iamb.', caption: 'The most common rhythm in English poetry is the iamb.', show: 'def' },
        { say: 'An iamb is an unstressed syllable followed by a stressed one, da dum, as in the word today.', focus: 'def' },
        { say: 'Five iambs in a line make iambic pentameter. Penta means five. This is the rhythm of Shakespeare’s sonnets.', show: 'p' },
        { say: 'Shall I compare thee to a summer’s day. Da dum, da dum, da dum, da dum, da dum.', focus: 'p' },
      ],
    },
    {
      chapter: 'Sound that matches meaning',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Water, water, every where,', 'And all the boards did shrink;', 'Water, water, every where,', 'Nor any drop to drink.'], by: 'Samuel Taylor Coleridge, “The Rime of the Ancient Mariner”' },
        { kind: 'text', id: 'a', size: 'md', md: '**Repetition** stresses an idea; **alliteration** ties words together; long sounds **slow** a line down.' },
      ],
      lines: [
        { say: 'Poets choose sounds as carefully as words. Here, from Coleridge, the repeated word water hammers home a cruel joke.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'The sailors are surrounded by water, but sea water cannot be drunk.', focus: ['q.0', 'q.3'] },
        { say: 'Repetition stresses an idea, alliteration ties words together, and the length of sounds can speed a line up or slow it down. Coleridge’s line day after day, day after day drags like the windless days it describes.', show: 'a' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A poem about a racing train uses short words, a fast beat and many hard “k” and “t” sounds. What do the sounds do?',
          choices: ['They make the poem rhyme.', 'They imitate the speed and clatter of the train.', 'They slow the reader down.', 'They make the mood peaceful.'],
          answer: 1,
          working: 'Short words and a quick beat make us read fast, and hard consonants sound like metal clattering.',
        },
      ],
      lines: [
        { say: 'Your turn. A poem about a racing train uses short words, a fast beat, and many hard sounds. What do the sounds do? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Short words and a quick beat make us read fast, and hard sounds clatter like metal. So the sound imitates the train.', show: 'q2.answer' },
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
            'A **stressed** syllable is said more strongly; each one is a **beat**.',
            '**Rhythm** is the pattern of stressed and unstressed syllables.',
            'An **iamb** is da-DUM; five make **iambic pentameter**.',
            'Rhythm and sound can match meaning: fast for speed, slow for stillness.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A stressed syllable is said more strongly, and each stressed syllable is a beat.', show: 'sum.0' },
        { say: 'Rhythm is the pattern of stressed and unstressed syllables.', show: 'sum.1' },
        { say: 'An iamb is da dum, and five iambs make iambic pentameter.', show: 'sum.2' },
        { say: 'And rhythm, repetition and alliteration can match a poem’s meaning: fast for speed, and slow for stillness.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
