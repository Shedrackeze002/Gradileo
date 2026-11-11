import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e6-6-3',
  lessonId: 'e6-6-3',
  title: 'Simple and Compound Sentences',
  summary:
    'A clause has a subject and a verb. A simple sentence has one independent clause, a compound sentence joins two with a comma and a FANBOYS conjunction, and a complex sentence adds a dependent clause. A comma alone between two sentences is a comma splice.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Simple and Compound Sentences', subtitle: 'Clauses, and the words that join them' }],
      lines: [
        { say: 'Good writers use sentences of different shapes. Some are short and simple. Others join two or more ideas.', show: 'title' },
        { say: 'To build them well, you need to know about clauses, and the words that join them.' },
      ],
    },
    {
      chapter: 'Clauses',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Clause', md: 'A **clause** is a group of words with a subject and a verb. An **independent clause** can stand alone as a sentence: *the dog barked*. A **dependent clause** cannot: *because it was raining*.' },
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'What it has', 'Example'],
          rows: [
            ['**Simple**', 'one independent clause', '*The dog barked at the mail carrier.*'],
            ['**Compound**', 'two independent clauses, a comma and a conjunction', '*The dog barked, and the cat ran away.*'],
            ['**Complex**', 'an independent and a dependent clause', '*Because it was raining, we stayed inside.*'],
          ],
        },
      ],
      lines: [
        { say: 'A clause is a group of words with a subject and a verb.', show: 'def' },
        { say: 'An independent clause can stand alone as a sentence: the dog barked. A dependent clause cannot stand alone: because it was raining.', focus: 'def' },
        { say: 'A simple sentence has one independent clause.', show: 't', focus: 't.0' },
        { say: 'A compound sentence has two independent clauses, joined by a comma and a conjunction.', focus: 't.1' },
        { say: 'And a complex sentence has an independent clause and a dependent clause.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Simple or compound?',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['Sam and Mia laughed and clapped.'] },
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A phrase is not a clause', md: '“After lunch, we played football” has a comma, but *after lunch* has no verb. It is a phrase, so the sentence is simple.' },
      ],
      lines: [
        { say: 'Is this sentence simple or compound?', show: 'q' },
        { say: 'There are two subjects, Sam and Mia, and two verbs, laughed and clapped. But they form one clause. There is no second subject and verb pair that could stand alone. So it is a simple sentence.', focus: 'q' },
        { say: 'Here is a common mistake. After lunch, we played football, has a comma. But after lunch has no verb, so it is a phrase, not a clause. The sentence is simple.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'FANBOYS',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Conjunction', 'Use', 'Example'],
          rows: [
            ['**f**or', 'gives a reason', '*We stayed inside, for it was raining.*'],
            ['**a**nd', 'adds', '*I played, and she watched.*'],
            ['**n**or', 'adds another negative', '*He did not call, nor did he write.*'],
            ['**b**ut', 'contrasts', '*I like maths, but I don’t like science.*'],
            ['**o**r', 'gives a choice', '*We could walk, or we could take the bus.*'],
            ['**y**et', 'contrasts, often surprisingly', '*It was late, yet we kept playing.*'],
            ['**s**o', 'shows a result', '*I was hungry, so I made a sandwich.*'],
          ],
        },
      ],
      lines: [
        { say: 'The seven coordinating conjunctions join independent clauses into compound sentences. Remember them as FANBOYS: for, and, nor, but, or, yet, and so.', caption: 'The seven coordinating conjunctions join independent clauses into compound sentences. Remember them as FANBOYS: for, and, nor, but, or, yet, and so.', show: 't' },
        { say: 'For gives a reason. And adds. Nor adds another negative.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'But and yet contrast. Or gives a choice. And so shows a result: I was hungry, so I made a sandwich.', focus: ['t.3', 't.4', 't.5', 't.6'] },
      ],
    },
    {
      chapter: 'Avoiding a comma splice',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Comma splice', md: 'A **comma splice** joins two independent clauses with only a comma: *The film was long, I enjoyed it.*' },
        { kind: 'text', id: 'fix', size: 'lg', md: '*The film was long,* ***but*** *I enjoyed it.*' },
      ],
      lines: [
        { say: 'A comma splice joins two independent clauses with only a comma. The film was long, I enjoyed it.', show: 'def' },
        { say: 'A comma alone is not strong enough to hold two sentences together. Add a conjunction that shows how the ideas connect. Here they contrast, so use but: the film was long, but I enjoyed it.', show: 'fix', focus: 'fix' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a compound sentence?',
          choices: [
            'After the storm, the streets were quiet.',
            'Leo and Ana ran and jumped.',
            'The bus was late, so we walked to school.',
            'Because I was tired, I went to bed.',
          ],
          answer: 2,
          working: 'C joins two independent clauses with a comma and “so”. A and B are simple, and D is complex.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a compound sentence? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is C. The bus was late, and we walked to school, can each stand alone, and they are joined by a comma and so. Choices A and B are simple, and Choice D is complex.', show: 'q2.answer' },
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
            '**Simple**: one independent clause; **compound**: two; **complex**: adds a dependent clause.',
            'Join independent clauses with a comma and a **FANBOYS** conjunction.',
            'A comma alone between two sentences is a **comma splice**.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A simple sentence has one independent clause, a compound sentence joins two, and a complex sentence adds a dependent clause.', show: 'sum.0' },
        { say: 'Join independent clauses with a comma and a FANBOYS conjunction.', show: 'sum.1' },
        { say: 'And a comma alone between two sentences is a comma splice.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
