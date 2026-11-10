import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e5-2-4',
  lessonId: 'e5-2-4',
  title: 'Forms of Poetry',
  summary:
    'A line is one row of a poem and a stanza is a group of lines. Four forms of poetry are the haiku (5, 7 and 5 syllables), the limerick (five funny lines rhyming AABBA), the acrostic and free verse.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Forms of Poetry', subtitle: 'Lines, stanzas and four forms' }],
      lines: [
        { say: 'Poems come in many shapes. Some follow strict rules about syllables or rhyme, and some follow no rules at all.', show: 'title' },
        { say: 'In this lesson, you will learn four forms of poetry, and how to talk about the parts of a poem: its lines and stanzas.' },
      ],
    },
    {
      chapter: 'Lines and stanzas',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Line and stanza', md: 'A **line** is one row of words in a poem. A **stanza** is a group of lines, set apart from the next group by a blank space.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['The bus is late, the sky is grey,', 'We stamp our feet and blow.', 'At last it rumbles round the bend', 'And splashes through the snow.'] },
      ],
      lines: [
        { say: 'A line is one row of words in a poem. A poem’s lines do not have to be full sentences.', show: 'def' },
        { say: 'A stanza is a group of lines, set apart from the next group by a blank space. Stanzas work like paragraphs in a story.', focus: 'def' },
        { say: 'This is the first stanza of a poem about a school bus. It has four lines.', show: 'q', focus: 'q' },
        { say: 'The whole poem has two more stanzas, one of four lines and one of two. So it has ten lines in three stanzas. To count, find the groups first, then count the rows in each.' },
      ],
    },
    {
      chapter: 'Four forms',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Form', 'The rules'],
          rows: [
            ['**Haiku**', '3 lines of 5, 7 and 5 syllables, often about nature'],
            ['**Limerick**', '5 funny lines, rhyme pattern AABBA, a bouncy rhythm'],
            ['**Acrostic**', 'the first letters of the lines spell a word'],
            ['**Free verse**', 'no fixed rhyme or rhythm; lines of any length'],
          ],
        },
      ],
      lines: [
        { say: 'Here are four forms of poetry.', show: 't' },
        { say: 'A haiku has three lines, of five, seven and five syllables. It is often about nature, and it does not need to rhyme.', focus: 't.0' },
        { say: 'A limerick has five funny lines, with a bouncy rhythm.', focus: 't.1' },
        { say: 'An acrostic is a poem where the first letters of the lines spell a word, read downwards, like a poem about the sea that begins with S, E and A.', focus: 't.2' },
        { say: 'And free verse has no fixed rhyme or rhythm. Its lines can be any length, in natural speech.', focus: 't.3' },
      ],
    },
    {
      chapter: 'A limerick',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['There was an Old Man with a beard,', 'Who said, “It is just as I feared!', 'Two Owls and a Hen,', 'Four Larks and a Wren,', 'Have all built their nests in my beard!”'], by: 'Edward Lear, A Book of Nonsense' },
        { kind: 'text', id: 'rh', size: 'md', md: '*beard* A · *feared* A · *Hen* B · *Wren* B · *beard* A = **AABBA**' },
      ],
      lines: [
        { say: 'Here is a limerick by Edward Lear. Listen for the rhymes.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4'] },
        { say: 'Beard and feared rhyme, so they are "A". Hen and wren are a new sound, "B". And the last line ends with beard again, "A". The pattern is "A", "A", "B", "B", "A".', caption: 'Beard and feared rhyme, so they are A. Hen and wren are a new sound, B. And the last line ends with beard again, A. The pattern is AABBA.', show: 'rh', focus: 'rh' },
      ],
    },
    {
      chapter: 'A haiku',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Old pond, still and green, (5)', 'a frog leaps in with a splash, (7)', 'then silence again. (5)'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Three lines is not enough', md: 'A three-line poem is a haiku only if its lines have 5, 7 and 5 syllables. Count before you name the form.' },
      ],
      lines: [
        { say: 'And here is a haiku. Let’s count the syllables. Old, pond, still, and, green. That is five.', show: 'q.0' },
        { say: 'A, frog, leaps, in, with, a, splash. That is seven. Then, si, lence, a, gain. Five again.', show: ['q.1', 'q.2'] },
        { say: 'Here is a common mistake. A poem with three lines is not a haiku unless its lines have five, seven and five syllables. Always count the syllables before you name the form.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A poem has five funny lines that rhyme AABBA. What form is it?',
          choices: ['A haiku', 'Free verse', 'An acrostic', 'A limerick'],
          answer: 3,
          working: 'A limerick has five funny lines with the rhyme pattern AABBA.',
        },
      ],
      lines: [
        { say: 'Your turn. A poem has five funny lines that rhyme "A", "A", "B", "B", "A". What form is it? Pause the video and try it.', caption: 'Your turn. A poem has five funny lines that rhyme AABBA. What form is it? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D, a limerick. A limerick has five funny lines, with that rhyme pattern and a bouncy rhythm.', show: 'q2.answer' },
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
            'A **line** is one row; a **stanza** is a group of lines.',
            'A **haiku** has 3 lines of 5, 7 and 5 syllables.',
            'A **limerick** has 5 funny lines that rhyme AABBA.',
            'An **acrostic** spells a word; **free verse** has no fixed rules.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A line is one row of a poem, and a stanza is a group of lines set apart by space.', show: 'sum.0' },
        { say: 'A haiku has three lines of five, seven and five syllables.', show: 'sum.1' },
        { say: 'A limerick has five funny lines with a bouncy rhythm.', show: 'sum.2' },
        { say: 'An acrostic spells a word with the first letters of its lines, and free verse has no fixed rhyme or rhythm.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
