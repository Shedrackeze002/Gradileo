import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-3-3',
  lessonId: 'e9-3-3',
  title: 'Soliloquies, Songs and Staging',
  summary:
    'A soliloquy reveals a character’s private thoughts, an aside is shared with the audience, and the epilogue speaks to the audience at the end. Prospero’s farewell to magic and his epilogue mark the play’s turning point and close. On a bare stage, songs, verse and description create the island, and Caliban’s verse reveals a depth beyond the “monster” others see.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Tempest', title: 'Soliloquies, Songs and Staging', subtitle: 'Building an island with words' }],
      lines: [
        { say: 'Shakespeare’s stage had almost no scenery. To create a magical island, he relied on language, music and the actors’ voices.', show: 'title' },
        { say: 'In this video we look at the speeches that let us into characters’ minds, and at how verse, prose and songs build the world of the play.' },
      ],
    },
    {
      chapter: 'Speeches to the audience',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Soliloquy', md: 'A **soliloquy** is a speech in which a character, alone on stage, speaks their **thoughts aloud**, so the audience hears their private thoughts and decisions.' },
        {
          kind: 'table',
          id: 't',
          head: ['Device', 'What it is', 'Effect'],
          rows: [
            ['**Aside**', 'a line to the audience that others do not hear', 'shares secrets; dramatic irony'],
            ['**Epilogue**', 'a speech to the audience at the end', 'steps outside the story to close it'],
          ],
        },
      ],
      lines: [
        { say: 'A soliloquy is a speech in which a character, alone on stage, speaks their thoughts aloud. So the audience hears their private thoughts and decisions.', show: 'def' },
        { say: 'An aside is a line spoken to the audience that the other characters do not hear. It shares secrets, and creates dramatic irony.', show: 't', focus: 't.0' },
        { say: 'And an epilogue is a speech to the audience at the end of the play. It steps outside the story to close it.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Prospero’s farewell',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'lg', lines: ['I’ll break my staff,', 'Bury it certain fathoms in the earth,', 'And deeper than did ever plummet sound', 'I’ll drown my book.'], by: 'Prospero, Act 5, Scene 1' },
      ],
      lines: [
        { say: 'In Act five, Prospero makes a solemn speech in which he gives up his power.', show: 'q' },
        { say: 'His staff and his book are the sources of his magic. He will bury the staff deep in the earth, and drown the book deeper than any plummet, a weight for measuring depth, has ever reached.', focus: ['q.1', 'q.2'] },
        { say: 'These are images of depths that can never be reached again. So Prospero is giving up his magic for good, and the audience shares this turning point in his inner life.', focus: 'q.3' },
        { say: 'Then, in the epilogue, Prospero speaks to the audience without his magic. Only their applause, he says, can release him from the island. So the play ends with power passing to the audience.' },
      ],
    },
    {
      chapter: 'Songs and verse',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Ariel’s songs', md: '“Full fathom five thy father lies.” A **fathom** is about six feet of water, so the song pictures the King thirty feet under the sea, changed into “something rich and strange”.' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Be not afeard; the isle is full of noises,', 'Sounds and sweet airs, that give delight and hurt not.'], by: 'Caliban, Act 3, Scene 2' },
      ],
      lines: [
        { say: 'Ariel’s songs fill the island with music. When Ferdinand believes his father has drowned, Ariel sings: full fathom five thy father lies. A fathom is about six feet of water, so the King is pictured thirty feet under the sea, changed into something rich and strange.', show: 'k' },
        { say: 'Shakespeare usually gives verse to serious feeling and prose to comedy, so the comic drunks speak prose. But Caliban, often called a monster, usually speaks in verse, and some of the play’s most beautiful lines are his.', show: 'q' },
        { say: 'He is comforting the frightened drunks. His words are gentle and musical, sounds and sweet airs that give delight and hurt not. They show his deep love for the island, and complicate the idea that he is only a beast.', focus: 'q' },
      ],
    },
    {
      chapter: 'Staging matters',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Staging matters', md: 'A play was written to be **performed**. Ask how a scene would look and sound on stage: the music, the invisible Ariel, the sudden vanishing of the masque.' },
      ],
      lines: [
        { say: 'A common mistake is to write about a play as if it were a novel. It was written to be performed.', show: 'm' },
        { say: 'So ask how a scene would look and sound on stage: the music, the invisible Ariel, or the sudden vanishing of the masque.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Why might Shakespeare give Caliban, often called a monster, beautiful verse such as “the isle is full of noises, / Sounds and sweet airs”?',
          choices: [
            'To show his deep love for the island and complicate the idea that he is only a beast',
            'To show that he is a comic character, like Stephano',
            'Because all servants in Shakespeare speak in verse',
            'To show that he is lying',
          ],
          answer: 0,
          working: 'Verse usually marks serious feeling. Gentle, musical lines from Caliban reveal a depth and love of beauty beyond the “monster” others see.',
        },
      ],
      lines: [
        { say: 'Your turn. Why might Shakespeare give Caliban, often called a monster, such beautiful verse? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is "A". Verse usually marks serious feeling. Gentle, musical lines from Caliban reveal a love of beauty and a depth beyond the monster others see.', caption: 'The answer is A. Verse usually marks serious feeling. Gentle, musical lines from Caliban reveal a love of beauty and a depth beyond the monster others see.', show: 'q2.answer' },
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
            'A **soliloquy** reveals private thoughts; an **aside** is shared with the audience.',
            'The **epilogue** speaks to the audience at the end.',
            'Prospero’s farewell to magic marks the play’s turning point.',
            'Songs, verse and description create the island on a bare stage.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A soliloquy reveals a character’s private thoughts, and an aside is shared with the audience.', show: 'sum.0' },
        { say: 'The epilogue speaks to the audience at the end of the play.', show: 'sum.1' },
        { say: 'Prospero’s farewell to magic marks the play’s turning point.', show: 'sum.2' },
        { say: 'And songs, verse and description create the island on a bare stage. Caliban’s verse reveals a depth beyond the monster others see.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
