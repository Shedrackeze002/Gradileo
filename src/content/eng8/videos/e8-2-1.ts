import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e8-2-1',
  lessonId: 'e8-2-1',
  title: 'Figurative Language and Extended Metaphor',
  summary:
    'Figurative language means more than what the words literally say: similes, metaphors, personification, hyperbole and symbols. An extended metaphor develops one comparison over several lines or a whole poem, and each detail adds to the meaning.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Poetry', title: 'Figurative Language and Extended Metaphor', subtitle: 'Feeling an idea, not just understanding it' }],
      lines: [
        { say: 'Poets rarely say things plainly. They compare, exaggerate, and bring objects to life, because a fresh image can make us feel an idea instead of just understanding it.', show: 'title' },
        { say: 'In this video we review the main kinds of figurative language, and follow one extended metaphor through a poem.' },
      ],
    },
    {
      chapter: 'Figurative language',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Figurative language', md: '**Figurative language** means more than, or something different from, what the words literally say. Each type, such as a simile, is a **figure of speech**.' },
      ],
      lines: [
        { say: 'Figurative language is language that means more than, or something different from, what the words literally say. Each particular type is called a figure of speech.', show: 'def' },
      ],
    },
    {
      chapter: 'Figures of speech',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Figure', 'What it does', 'Example'],
          rows: [
            ['**Simile**', 'compares using *like* or *as*', '*Her laugh rang out like a bell.*'],
            ['**Metaphor**', 'says one thing *is* another', '*The classroom was a zoo after lunch.*'],
            ['**Personification**', 'human qualities for something not human', '*The wind whispered through the trees.*'],
            ['**Hyperbole**', 'exaggerates for effect', '*I’m so hungry I could eat a horse.*'],
            ['**Symbol**', 'an object for a bigger idea', '*a dove for peace*'],
          ],
        },
      ],
      lines: [
        { say: 'A simile compares using like or as: her laugh rang out like a bell. A metaphor says one thing is another: the classroom was a zoo after lunch.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Personification gives human qualities to something that is not human: the wind whispered. Hyperbole exaggerates for effect.', focus: ['t.2', 't.3'] },
        { say: 'And a symbol is an object that stands for a bigger idea, like a dove for peace.', focus: 't.4' },
      ],
    },
    {
      chapter: 'A polite gentleman',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Because I could not stop for Death,', 'He kindly stopped for me;', 'The carriage held but just ourselves', 'And Immortality.'], by: 'Emily Dickinson, “Because I could not stop for Death”, first stanza' },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Metaphor or simile?', md: 'Look for *like* or *as*. *Life is a broken-winged bird* has neither, so it is a **metaphor**. *Life is like a broken-winged bird* is a **simile**.' },
      ],
      lines: [
        { say: 'Emily Dickinson personifies death as a polite gentleman.', show: ['q.0', 'q.1', 'q.2', 'q.3'] },
        { say: 'Death kindly stopped, as a courteous caller might. Giving death good manners makes it seem calm rather than frightening, which is strangely unsettling.', focus: 'q.1' },
        { say: 'To tell a metaphor from a simile, look for like or as. Life is a broken-winged bird has neither, so it is a metaphor.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Extended metaphor',
      layout: 'split',
      left: [{ kind: 'quote', id: 'q', size: 'md', lines: ['Well, son, I’ll tell you:', 'Life for me ain’t been no crystal stair.', 'It’s had tacks in it,', 'And splinters,', 'And boards torn up,', 'And places with no carpet on the floor—', 'Bare.'], by: 'Langston Hughes, “Mother to Son”, first lines' }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Extended metaphor', md: 'An **extended metaphor** is developed over several lines or a whole poem. The poet keeps adding details to the **same comparison**.' }],
      lines: [
        { say: 'An extended metaphor is a metaphor developed over several lines, or a whole poem. The poet keeps adding details to the same comparison.', show: 'def' },
        { say: 'In Mother to Son, by Langston Hughes, the speaker compares her life to a staircase.', show: ['q.0', 'q.1', 'q.2', 'q.3', 'q.4', 'q.5', 'q.6'] },
        { say: 'A crystal stair would be beautiful, shining and easy to climb. Her life has not been like that.', focus: 'q.1' },
        { say: 'The tacks and splinters are things that hurt as you climb: the hardships and pain she has faced. And the boards torn up, with no carpet, suggest gaps, danger and poverty.', focus: ['q.2', 'q.3', 'q.4', 'q.5', 'q.6'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'In the staircase metaphor, the mother’s life has had “tacks”, “splinters” and “boards torn up”. Together, what do these details show?',
          choices: [
            'Her house needs repairs.',
            'Her life has been a hard, painful climb.',
            'She enjoys building stairs.',
            'Her life has been easy and bright.',
          ],
          answer: 1,
          working: 'Every detail adds to one image: climbing a broken, painful staircase stands for a hard life, and she has kept climbing.',
        },
      ],
      lines: [
        { say: 'Your turn. The mother’s staircase has tacks, splinters, and boards torn up. Together, what do these details show? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. Every detail adds to one image. Her life has been a hard, painful climb, but she has kept climbing.', show: 'q2.answer' },
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
            '**Simile** (*like*, *as*), **metaphor** (*is*), **personification**, **hyperbole**, **symbol**.',
            'A simile has *like* or *as*; a metaphor does not.',
            'An **extended metaphor** builds one comparison across many lines.',
            'Explain what each detail of the comparison adds.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The main figures of speech are simile, metaphor, personification, hyperbole and symbol.', show: 'sum.0' },
        { say: 'A simile uses like or as, and a metaphor does not.', show: 'sum.1' },
        { say: 'An extended metaphor builds one comparison across many lines.', show: 'sum.2' },
        { say: 'And always explain what each detail of the comparison adds to the poem’s meaning.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
