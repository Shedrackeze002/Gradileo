import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-2-1',
  lessonId: 'e5-2-1',
  title: 'Rhyme and Rhythm',
  summary:
    'Words rhyme when their ending sounds match, whatever their spelling. A rhyme pattern gives each new end sound a new letter, such as AABB or ABCB, and counting syllables shows a poem’s rhythm.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Rhyme and Rhythm', subtitle: 'How a poem sounds like music' }],
      lines: [
        { say: 'Poems are written to be heard. Two things make a poem sound like music.', show: 'title' },
        { say: 'Rhyme, which is words that end with the same sound, and rhythm, the pattern of beats you hear when you read it aloud. In this lesson, you will learn to hear both.' },
      ],
    },
    {
      chapter: 'Words that rhyme',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rhyme', md: 'Two words **rhyme** when their endings sound the same, from the last vowel sound to the end: c**at** and h**at**, n**ight** and k**ite**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Word', 'Rhymes with', 'Looks similar, but does not rhyme'],
          rows: [
            ['love', 'glove', 'move'],
            ['great', 'late', 'treat'],
            ['bear', 'chair', 'fear'],
            ['shoe', 'blue', 'toe'],
          ],
        },
      ],
      lines: [
        { say: 'Two words rhyme when their endings sound the same, from the last vowel sound to the end, like cat and hat, or night and kite.', show: 'def' },
        { say: 'The letters do not have to match. Only the sound does. Kite and night rhyme, even though they are spelled differently.', focus: 'def' },
        { say: 'And words that look alike may not rhyme at all. Love rhymes with glove, but not with move. Great rhymes with late, but not with treat.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'So always listen for the sound, not the spelling.', focus: 't' },
      ],
    },
    {
      chapter: 'The rhyme pattern',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The puppy chased a yellow **ball** — A', 'Across the yard and down the **hall**. — A', 'He skidded on the kitchen **floor** — B', 'And landed by the open **door**. — B'] },
        { kind: 'text', id: 'ans', size: 'lg', md: 'Rhyme pattern: **AABB**' },
      ],
      lines: [
        { say: 'To show which lines of a poem rhyme, we give the first line’s last sound the letter "A". Every line that rhymes with it is also "A". The next new sound is "B", then "C", and so on.', caption: 'To show which lines of a poem rhyme, we give the first line’s last sound the letter A. Every line that rhymes with it is also A. The next new sound is B, then C, and so on.' },
        { say: 'Ball is the first sound, so it is "A". Hall rhymes with it, so it is "A" too.', caption: 'Ball is the first sound, so it is A. Hall rhymes with it, so it is A too.', show: ['q.0', 'q.1'] },
        { say: 'Floor is a new sound, so it is "B", and door rhymes with it, so it is "B".', caption: 'Floor is a new sound, so it is B, and door rhymes with it, so it is B.', show: ['q.2', 'q.3'] },
        { say: 'The rhyme pattern is "A", "A", "B", "B".', caption: 'The rhyme pattern is AABB.', show: 'ans', focus: 'ans' },
      ],
    },
    {
      chapter: 'Every sound gets a letter',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The rain is raining all around,', 'It falls on field and tree,', 'It rains on the umbrellas here,', 'And on the ships at sea.'], by: 'Robert Louis Stevenson, “Rain”' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Give every new sound a new letter', md: '*around* A, *tree* B, *here* C, *sea* B. The pattern is **ABCB**. Skipping *here* would give the wrong pattern.' },
      ],
      lines: [
        { say: 'In Robert Louis Stevenson’s poem Rain, only the second and fourth lines rhyme.', show: 'q' },
        { say: 'Around is "A", and tree is "B". Here is a new sound, so it is "C". And sea rhymes with tree, so it is "B". The pattern is "A", "B", "C", "B".', caption: 'Around is A, and tree is B. Here is a new sound, so it is C. And sea rhymes with tree, so it is B. The pattern is ABCB.', show: 'm' },
        { say: 'Here is a common mistake. A line that does not rhyme with anything still gets a letter. Here is not left out. Skipping it would give the wrong pattern.', focus: 'm' },
      ],
    },
    {
      chapter: 'Syllables and beats',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Syllable', md: 'A **syllable** is one beat of sound in a word: *cat* (1), *pup-py* (2), *um-brel-la* (3).' },
        { kind: 'text', id: 'line', size: 'md', md: 'In (1) · win-ter (2) · I (1) · get (1) · up (1) · at (1) · night (1) = **8 syllables**' },
      ],
      lines: [
        { say: 'A syllable is one beat of sound in a word. Cat has one syllable, puppy has two, and umbrella has three.', show: 'def' },
        { say: 'To count syllables, put your hand under your chin and say the word slowly. Each time your chin drops, that is one syllable. You can also clap once for each beat.' },
        { say: 'Let’s count the beats in this line. In, win, ter, I, get, up, at, night. That makes eight syllables.', show: 'line', focus: 'line' },
        { say: 'When the lines of a poem have about the same number of beats, the poem has a steady rhythm, like a drum. That is why poems with a steady rhythm are easy to read aloud and remember.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The last words of four lines of a poem are “sky”, “sun”, “high” and “fun”. What is the rhyme pattern?',
          choices: ['AABB', 'ABAB', 'ABCB', 'ABBA'],
          answer: 1,
          working: '“sky” is A and “sun” is B. “high” rhymes with “sky” (A), and “fun” rhymes with “sun” (B): ABAB.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the rhyme pattern of these four line endings. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Sky is "A" and sun is "B". High rhymes with sky, so it is "A", and fun rhymes with sun, so it is "B". The pattern is "A", "B", "A", "B".', caption: 'The answer is B. Sky is A and sun is B. High rhymes with sky, so it is A, and fun rhymes with sun, so it is B. The pattern is ABAB.', show: 'q2.answer' },
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
            'Words **rhyme** when their ending sounds match; spelling does not decide it.',
            'A **rhyme pattern** gives each new end sound a new letter: AABB, ABAB, ABCB.',
            'A **syllable** is one beat; clap or feel your chin to count them.',
            'Lines with a similar number of beats give a poem its **rhythm**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Words rhyme when their ending sounds match. Spelling does not decide it.', show: 'sum.0' },
        { say: 'A rhyme pattern gives each new end sound a new letter.', show: 'sum.1' },
        { say: 'A syllable is one beat. Clap, or feel your chin, to count them.', show: 'sum.2' },
        { say: 'And lines with a similar number of beats give a poem its rhythm.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
