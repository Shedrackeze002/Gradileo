import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-1-2',
  lessonId: 'e9-1-2',
  title: 'Character Arcs and Foils',
  summary:
    'A character arc is the way a character changes over a story: dynamic characters change and static ones do not. A catalyst pushes the change and an epiphany is a sudden moment of understanding. A foil is a contrasting character who highlights another character’s qualities, as Bob Cratchit does for Scrooge.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fiction', title: 'Character Arcs and Foils', subtitle: 'How characters change, and who shows it' }],
      lines: [
        { say: 'The characters we remember are usually the ones who change.', show: 'title' },
        { say: 'In this video we trace a character arc, find what drives the change, and see how a contrasting character, called a foil, makes another character stand out.' },
      ],
    },
    {
      chapter: 'Character arcs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Character arc', md: 'A **character arc** is the way a character changes over the course of a story. A **dynamic** character changes; a **static** character stays essentially the same.' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**At the start:** what do they want, believe or fear?',
            '**What changes them?** The **catalyst**: a loss, a meeting, a mistake.',
            '**At the end:** often after an **epiphany**, a sudden understanding.',
          ],
        },
      ],
      lines: [
        { say: 'A character arc is the way a character changes over the course of a story. A dynamic character changes, while a static character stays essentially the same.', show: 'def' },
        { say: 'To trace an arc, ask three questions. First, who is the character at the start? What do they want, believe or fear?', show: 'b.0' },
        { say: 'Second, what changes them? The event that pushes a character to change is called the catalyst. It could be a loss, a meeting, a mistake or a challenge.', show: 'b.1' },
        { say: 'Third, who are they at the end? Often the change comes in an epiphany, a sudden moment of understanding.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Scrooge’s arc',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Stage', 'Scrooge in *A Christmas Carol*'],
          rows: [
            ['**Start**', 'a cold, greedy miser who calls Christmas “humbug”'],
            ['**Catalyst**', 'three ghosts show his lonely past, others’ struggles, and his unloved death'],
            ['**End**', 'he wakes on Christmas morning generous and kind'],
          ],
        },
      ],
      lines: [
        { say: 'In Charles Dickens’s A Christmas Carol, Ebenezer Scrooge begins as a cold, greedy miser who calls Christmas humbug.', show: 't', focus: 't.0' },
        { say: 'Three ghosts visit him. They show him his lonely past, the struggling families around him, and a future in which he dies unloved. They are the catalyst.', focus: 't.1' },
        { say: 'He wakes on Christmas morning transformed, generous and kind. So Scrooge is a dynamic character.', focus: 't.2' },
        { say: 'Arcs can go the other way too. A character who starts out hopeful and ends bitter also has an arc.' },
      ],
    },
    {
      chapter: 'Quote the change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Quote the change', md: 'When you write about an arc, give evidence from **both ends**: what the character says or does at the start, and at the end. The **contrast** proves the change.' },
      ],
      lines: [
        { say: 'A common mistake is to claim a character changes without proving it.', show: 'm' },
        { say: 'Give evidence from both ends: what the character says or does at the start, and what they say or do at the end. The contrast proves the change.', focus: 'm' },
      ],
    },
    {
      chapter: 'Foils',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Foil', md: 'A **foil** is a character whose contrast with another character highlights their traits. Foils usually share a **situation** but differ in a **key quality**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Character', 'Foil', 'The contrast shows…'],
          rows: [
            ['a brave knight', 'his cowardly squire', 'the knight’s courage'],
            ['a hero who forgives an enemy', 'a rival who takes revenge', 'what the hero’s choice means'],
          ],
        },
      ],
      lines: [
        { say: 'A foil is a character whose contrast with another character highlights their traits. Foils usually share a situation, but differ in one key quality.', show: 'def' },
        { say: 'A cowardly squire makes his knight’s courage stand out.', show: 't', focus: 't.0' },
        { say: 'And sometimes a foil makes the opposite choice in the same situation, like a rival who takes revenge where the hero forgives. So we see the road not taken.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Scrooge’s clerk, Bob Cratchit, is poor, with a large family and little money, yet he is warm and cheerful. What is his role?',
          choices: [
            'He is the catalyst for Scrooge’s change.',
            'He is a static narrator.',
            'He is the novel’s villain.',
            'He is a foil: his kindness in poverty shows how cold Scrooge is.',
          ],
          answer: 3,
          working: 'Cratchit shares Scrooge’s world but differs in a key quality. His warmth despite poverty highlights Scrooge’s coldness despite wealth.',
        },
      ],
      lines: [
        { say: 'Your turn. Scrooge’s clerk, Bob Cratchit, is poor, with a large family and little money, yet he is warm and cheerful. What is his role? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. Cratchit is a foil. His kindness in poverty shows how cold Scrooge is, despite all his wealth.', show: 'q2.answer' },
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
            'A **character arc** traces how a character changes.',
            '**Dynamic** characters change; **static** ones do not.',
            'A **catalyst** pushes the change; an **epiphany** is a sudden understanding.',
            'A **foil** contrasts with another character to highlight their qualities.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A character arc traces how a character changes over a story.', show: 'sum.0' },
        { say: 'Dynamic characters change, and static characters do not.', show: 'sum.1' },
        { say: 'A catalyst pushes the change, and an epiphany is a sudden moment of understanding.', show: 'sum.2' },
        { say: 'And a foil contrasts with another character, to highlight their qualities.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
