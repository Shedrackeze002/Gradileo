import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-2-5',
  lessonId: 'e7-2-5',
  title: 'Speaker and Tone',
  summary:
    'The speaker is the voice of a poem, and it is not always the poet. Tone is the speaker’s attitude to the subject, revealed by word choice, punctuation and what is praised or mocked, while mood is the reader’s feeling.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Speaker and Tone', subtitle: 'Who is talking, and how they feel' }],
      lines: [
        { say: 'Every poem has a voice. Sometimes it sounds like the poet, and sometimes it is a character, an animal, or even a tree.', show: 'title' },
        { say: 'In this video we learn to describe that voice, called the speaker, and the attitude it takes, called the tone.' },
      ],
    },
    {
      chapter: 'The speaker',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Speaker', md: 'The **speaker** is the voice that speaks the words of a poem. The speaker may be close to the poet, or a character the poet has invented.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['I am the old oak at the end of the lane'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Write “**the speaker** feels…”, not “the poet feels…”.' },
      ],
      lines: [
        { say: 'The speaker is the voice that speaks the words of a poem. The speaker may be close to the poet, or a character the poet has invented.', show: 'def' },
        { say: 'If a poem begins, I am the old oak at the end of the lane, the speaker is a tree, not the poet.', show: 'q', focus: 'q' },
        { say: 'Because poets so often invent speakers, it is safer to write the speaker feels, than the poet feels.', show: 'a' },
      ],
    },
    {
      chapter: 'Dickinson’s nobody',
      layout: 'split',
      left: [{ kind: 'quote', id: 'q', size: 'md', lines: ['I’m nobody! Who are you?', 'Are you nobody, too?', 'Then there’s a pair of us — don’t tell!', 'They’d banish us, you know.', 'How dreary to be somebody!', 'How public, like a frog', 'To tell your name the livelong day', 'To an admiring bog!'], by: 'Emily Dickinson' }],
      right: [{ kind: 'text', id: 'a', size: 'md', md: 'The speaker is **happy to be a nobody** and whispers to us as if sharing a **secret**. Being famous sounds **dreary**.' }],
      lines: [
        { say: 'Here is a poem by Emily Dickinson. Who is the speaker?', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Dickinson’s speaker is happy to be a nobody, and whispers to the reader as if sharing a secret: don’t tell!', show: 'a', focus: 'q.2' },
        { say: 'Being somebody, famous and public, sounds dreary to her, like a frog croaking its name all day to an admiring bog.', show: ['q.4', 'q.5', 'q.6', 'q.7'], focus: ['q.4', 'q.5', 'q.6', 'q.7'] },
      ],
    },
    {
      chapter: 'Tone',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tone', md: '**Tone** is the speaker’s attitude towards the subject: admiring, playful, bitter, weary, angry, thoughtful and so on.' },
        {
          kind: 'table',
          id: 't',
          head: ['Clue', 'In Dickinson’s poem'],
          rows: [
            ['**word choice**', '*dreary*, *like a frog*'],
            ['**punctuation**', 'exclamation marks, *don’t tell!*'],
            ['**what is praised or mocked**', 'fame is mocked'],
          ],
        },
        { kind: 'text', id: 'a', size: 'md', md: 'Tone: **playful**' },
      ],
      lines: [
        { say: 'Tone is the speaker’s attitude towards the subject. It might be admiring, playful, bitter, weary, angry or thoughtful.', show: 'def' },
        { say: 'Tone comes from three clues: word choice, punctuation, and what the speaker praises or mocks.', show: 't' },
        { say: 'Dickinson’s exclamation marks, her secret, and her joke about a frog make the tone playful, while dreary and like a frog mock the idea of fame.', show: 'a', focus: ['t.0', 't.1', 't.2'] },
      ],
    },
    {
      chapter: 'An open tone',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['I shall be telling this with a sigh', 'Somewhere ages and ages hence:', 'Two roads diverged in a wood, and I—', 'I took the one less traveled by,', 'And that has made all the difference.'], by: 'Robert Frost, “The Road Not Taken”, last stanza' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Tone and mood', md: '**Tone** belongs to the speaker: their attitude. **Mood** belongs to the reader: the feeling the poem creates. A speaker can sound calm while the reader feels uneasy.' },
      ],
      lines: [
        { say: 'Here is the last stanza of Robert Frost’s The Road Not Taken.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4'] },
        { say: 'Is the speaker’s sigh one of regret, or of quiet satisfaction? The poem does not say. Its tone is thoughtful and open, which is one reason readers still argue about it.', focus: ['q.0', 'q.4'] },
        { say: 'Do not mix up tone and mood. Tone belongs to the speaker: it is their attitude. Mood belongs to the reader: it is the feeling the poem creates.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Oh, wonderful. Another rainy Monday. Just what I needed.” What is the speaker’s tone?',
          choices: ['Sarcastic', 'Admiring', 'Joyful', 'Frightened'],
          answer: 0,
          working: 'The words “wonderful” and “just what I needed” say the opposite of what the speaker means, so the tone is sarcastic.',
        },
      ],
      lines: [
        { say: 'Your turn. Oh, wonderful. Another rainy Monday. Just what I needed. What is the speaker’s tone? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A, sarcastic. Wonderful, and just what I needed, say the opposite of what the speaker really means.', show: 'q2.answer' },
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
            'The **speaker** is the voice of the poem, not always the poet.',
            '**Tone** is the speaker’s attitude to the subject.',
            'Word choice, punctuation and what is praised or mocked reveal tone.',
            'Tone is the speaker’s attitude; **mood** is the reader’s feeling.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The speaker is the voice of the poem, and it is not always the poet.', show: 'sum.0' },
        { say: 'Tone is the speaker’s attitude to the subject.', show: 'sum.1' },
        { say: 'Word choice, punctuation, and what is praised or mocked reveal the tone.', show: 'sum.2' },
        { say: 'And remember that tone is the speaker’s attitude, while mood is the reader’s feeling.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
