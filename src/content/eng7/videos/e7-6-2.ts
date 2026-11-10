import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-6-2',
  lessonId: 'e7-6-2',
  title: 'Complex Sentences',
  summary:
    'Subordinating conjunctions such as because, although, if and while join a dependent clause to a main clause and show cause, contrast, condition or time. Sentences are simple, compound, complex or compound-complex depending on their clauses.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Complex Sentences', subtitle: 'Joining ideas so they connect' }],
      lines: [
        { say: 'Good writers vary their sentences. Short, simple sentences are punchy, and longer sentences that join ideas show how those ideas connect.', show: 'title' },
        { say: 'In this video we join clauses with subordinating conjunctions, and learn the four sentence structures.' },
      ],
    },
    {
      chapter: 'Subordinating conjunctions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Subordinating conjunction', md: 'A **subordinating conjunction** begins a dependent clause and shows how it connects to the main clause.' },
        {
          kind: 'table',
          id: 't',
          head: ['Relationship', 'Conjunctions', 'Example'],
          rows: [
            ['**cause**', 'because, since, as', 'We stayed in **because** it was raining.'],
            ['**contrast**', 'although, though, even though', '**Although** she was tired, she finished the race.'],
            ['**condition**', 'if, unless', 'You will miss the bus **unless** you hurry.'],
            ['**time**', 'when, while, after, before, until', '**While** the cake baked, we washed the dishes.'],
          ],
        },
      ],
      lines: [
        { say: 'A subordinating conjunction begins a dependent clause, and shows how it connects to the main clause.', show: 'def' },
        { say: 'Some show cause: because, since and as. We stayed in because it was raining. Others show contrast: although, though and even though.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'If and unless show a condition. You will miss the bus unless you hurry. And when, while, after, before and until show time.', focus: ['t.2', 't.3'] },
        { say: 'Choose the conjunction that shows the right relationship. Although she was tired, she finished, shows a contrast. Because she was tired, she finished, would make no sense.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Joining two sentences',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q', size: 'md', lines: ['The museum was closed. We visited the park.'] },
        { kind: 'text', id: 'a', size: 'lg', md: '**Since** the museum was closed, we visited the park.' },
      ],
      lines: [
        { say: 'How can we join these two sentences?', show: 'q' },
        { say: 'The first sentence is the reason for the second, so the relationship is cause. Since shows cause, and it can open the sentence.', focus: 'q' },
        { say: 'Since the museum was closed, we visited the park.', show: 'a' },
      ],
    },
    {
      chapter: 'Four sentence structures',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Structure', 'Clauses', 'Example'],
          rows: [
            ['**Simple**', 'one independent', '*The cat slept on the warm windowsill.*'],
            ['**Compound**', 'two or more independent', '*The cat slept, and the dog played.*'],
            ['**Complex**', 'one independent + at least one dependent', '*The cat slept because the sun was warm.*'],
            ['**Compound-complex**', 'two or more independent + at least one dependent', '*When the storm ended, the birds sang, and the children ran outside.*'],
          ],
        },
      ],
      lines: [
        { say: 'Sentences come in four structures. A simple sentence has one independent clause. A compound sentence has two or more, joined by and, but, or, so, or a semicolon.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'A complex sentence has one independent clause and at least one dependent clause. The cat slept, because the sun was warm.', focus: 't.2' },
        { say: 'And a compound-complex sentence has two or more independent clauses and at least one dependent clause.', focus: 't.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Two subjects do not make two clauses', md: '*Ana and Ben laughed and danced all night* has two subjects and two verbs in **one** clause. It is still **simple**.' },
      ],
      lines: [
        { say: 'Do not be fooled by a long sentence. Ana and Ben laughed and danced all night has two subjects and two verbs.', show: 'm' },
        { say: 'But they belong to one clause, with no second subject and verb pair of its own. So it is still a simple sentence.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'p', size: 'md', lines: ['If it rains, we will stay in, but we will still have fun.'] },
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the structure of this sentence?',
          choices: ['Simple', 'Compound', 'Complex', 'Compound-complex'],
          answer: 3,
          working: '“If it rains” is a dependent clause, and “we will stay in” and “we will still have fun” are two independent clauses joined by “but”.',
        },
      ],
      lines: [
        { say: 'Your turn. If it rains, we will stay in, but we will still have fun. What is the structure? Pause the video and try it.', show: ['p', 'q2'], wait: 6 },
        { say: 'The answer is D, compound-complex. If it rains is a dependent clause, and there are two independent clauses joined by but.', show: 'q2.answer' },
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
            '**Subordinating conjunctions** show cause, contrast, condition or time.',
            '**Simple**: one independent clause. **Compound**: two or more.',
            '**Complex**: an independent clause and a dependent clause.',
            '**Compound-complex**: two or more independent and at least one dependent.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Subordinating conjunctions show cause, contrast, condition or time.', show: 'sum.0' },
        { say: 'A simple sentence has one independent clause, and a compound sentence has two or more.', show: 'sum.1' },
        { say: 'A complex sentence has an independent clause and a dependent clause.', show: 'sum.2' },
        { say: 'And a compound-complex sentence has two or more independent clauses and at least one dependent clause.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
