import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-6-1',
  lessonId: 'e7-6-1',
  title: 'Phrases and Clauses',
  summary:
    'A clause has a subject and a verb working together, and a phrase does not. An independent clause can stand alone as a sentence, while a dependent clause cannot and often begins with a word such as because, although, when or if.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Phrases and Clauses', subtitle: 'The bricks of a sentence' }],
      lines: [
        { say: 'Sentences are built from smaller units, like a wall from bricks.', show: 'title' },
        { say: 'The two most important units are phrases and clauses. Once you can tell them apart, you can build any kind of sentence, and fix sentences that go wrong.' },
      ],
    },
    {
      chapter: 'Phrase or clause?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Phrase and clause', md: 'A **clause** is a group of words with a **subject** and a **verb** working together: *the dog barked*. A **phrase** is a group of words **without** a subject–verb pair: *under the old bridge*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Group of words', 'Subject + verb?', 'Kind'],
          rows: [
            ['*the dog barked*', 'dog + barked', 'clause'],
            ['*because the bus was late*', 'bus + was', 'clause'],
            ['*after the long and tiring match*', 'none (*match* is a noun)', 'phrase'],
            ['*running through the forest at night*', 'none: who is running?', 'phrase'],
          ],
        },
      ],
      lines: [
        { say: 'A clause is a group of words with a subject and a verb working together. The dog barked is a clause.', show: 'def' },
        { say: 'A phrase is a group of words without a subject and verb pair. Under the old bridge is a phrase.', focus: 'def' },
        { say: 'To test a group of words, ask: who or what is doing something here? In the dog barked, the dog does the barking. In because the bus was late, the subject is bus and the verb is was. Both are clauses.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'After the long and tiring match has no verb at all, because match is a noun. So it is a phrase.', focus: 't.2' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'An -ing word is not always a verb with a subject', md: '*Running through the forest* looks busy, but nobody is named as doing the running, so it is a **phrase**. *Mia was running through the forest* is a **clause**.' },
      ],
      lines: [
        { say: 'Watch out for words ending in ing. Running through the forest at night looks busy, but nobody is named as doing the running.', show: 'm' },
        { say: 'Without a subject, it is a phrase. Add one, Mia was running through the forest, and now it is a clause.', focus: 'm' },
      ],
    },
    {
      chapter: 'Independent and dependent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Two kinds of clause', md: 'An **independent clause** makes complete sense on its own: *The bell rang.* A **dependent clause** has a subject and verb but cannot stand alone: *Although the bell rang…*' },
        { kind: 'text', id: 'w', size: 'md', md: 'Subordinating words: *because, although, when, if, since, while, after, unless*' },
        { kind: 'text', id: 'e', size: 'lg', md: 'we went inside → **because** we went inside…' },
      ],
      lines: [
        { say: 'Clauses come in two kinds. An independent clause makes complete sense on its own, and can stand as a sentence. The bell rang.', show: 'def' },
        { say: 'A dependent clause has a subject and verb but cannot stand alone. It depends on another clause. Although the bell rang leaves us waiting.', focus: 'def' },
        { say: 'Dependent clauses usually begin with a subordinating word, such as because, although, when, if, since, while, after or unless.', show: 'w' },
        { say: 'Adding one of these words makes a clause dependent. We went inside becomes because we went inside, which leaves us waiting for more.', show: 'e', focus: 'e' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'p', size: 'md', lines: ['When the rain stopped, the children ran outside.'] },
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which part is the independent clause?',
          choices: ['When the rain stopped', 'the children ran outside', 'When the rain', 'stopped, the children'],
          answer: 1,
          working: '“When the rain stopped” has a subject and verb, but “when” makes it wait for more. “The children ran outside” makes sense on its own.',
        },
      ],
      lines: [
        { say: 'Your turn. When the rain stopped, the children ran outside. Which part is the independent clause? Pause the video and try it.', show: ['p', 'q2'], wait: 6 },
        { say: 'The answer is B. When the rain stopped has a subject and a verb, but the word when makes it wait for more. The children ran outside makes sense on its own.', show: 'q2.answer' },
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
            'A **clause** has a subject and a verb; a **phrase** does not.',
            'An **independent clause** can stand alone as a sentence.',
            'A **dependent clause** cannot; it often begins with *because*, *although*, *when* or *if*.',
            'Ask: *who or what is doing something?*',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A clause has a subject and a verb, and a phrase does not.', show: 'sum.0' },
        { say: 'An independent clause can stand alone as a sentence.', show: 'sum.1' },
        { say: 'A dependent clause cannot stand alone, and it often begins with because, although, when or if.', show: 'sum.2' },
        { say: 'And to test for a clause, ask: who or what is doing something?', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
