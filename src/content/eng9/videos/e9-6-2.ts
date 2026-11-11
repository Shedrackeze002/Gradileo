import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e9-6-2',
  lessonId: 'e9-6-2',
  title: 'Sentence Variety',
  summary:
    'A main clause can stand alone and a subordinate clause cannot. Simple sentences have one main clause, compound sentences two or more, complex sentences a main and a subordinate clause, and compound-complex sentences both. Vary sentence length, type and openings to control rhythm, and use a short sentence after long ones for emphasis.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Sentence Variety', subtitle: 'Four sentence types, and why to mix them' }],
      lines: [
        { say: 'A paragraph where every sentence has the same shape soon sounds like a ticking clock.', show: 'title' },
        { say: 'In this video we identify the four sentence types, and use sentence variety to control rhythm and emphasis.' },
      ],
    },
    {
      chapter: 'Clauses',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Clauses', md: 'A **main clause** has a subject and a verb and can **stand alone** as a sentence. A **subordinate clause** cannot stand alone; it usually begins with a word such as *because*, *although*, *when* or *if*.' },
      ],
      lines: [
        { say: 'A main clause has a subject and a verb, and can stand alone as a sentence: the dog barked.', show: 'def' },
        { say: 'A subordinate clause cannot stand alone. It usually begins with a word such as because, although, when or if. When the doorbell rang is not a sentence on its own.', focus: 'def' },
      ],
    },
    {
      chapter: 'Four sentence types',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Type', 'Made of', 'Example'],
          rows: [
            ['**Simple**', 'one main clause', 'The dog barked.'],
            ['**Compound**', 'two or more main clauses', 'The dog barked, and the cat ran away.'],
            ['**Complex**', 'a main clause + a subordinate clause', 'When the doorbell rang, the dog barked.'],
            ['**Compound-complex**', 'two main clauses + a subordinate clause', 'When the storm hit, the lights went out, and we lit candles.'],
          ],
        },
      ],
      lines: [
        { say: 'A simple sentence has one main clause: the dog barked.', show: 't', focus: 't.0' },
        { say: 'A compound sentence has two or more main clauses, joined by and, but, so, or a semicolon: the dog barked, and the cat ran away.', focus: 't.1' },
        { say: 'A complex sentence has one main clause and at least one subordinate clause: when the doorbell rang, the dog barked.', focus: 't.2' },
        { say: 'And a compound-complex sentence has both: two main clauses, and at least one subordinate clause.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Why variety matters',
      layout: 'center',
      main: [
        { kind: 'quote', id: 'q1', size: 'md', lines: ['I woke at six. It was raining. The rain was on the roof. I pulled the covers up. I lay listening.'] },
        { kind: 'quote', id: 'q2', size: 'md', lines: ['I woke at six. Rain was drumming on the roof, so I pulled the covers up and lay listening.'] },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Vary **length**: a short sentence after long ones makes a point land.',
            'Vary **type**: mix simple, compound and complex.',
            'Vary **openings**: *Because the road was flooded, the bus turned back.*',
          ],
        },
      ],
      lines: [
        { say: 'Compare these two versions. The first is all short, simple sentences, so it sounds flat.', show: 'q1' },
        { say: 'The second mixes a short sentence with a longer compound one, so the rhythm moves.', show: 'q2' },
        { say: 'So vary the length of your sentences, and follow long ones with a short one to make a point land. Mix the types too.', show: ['b.0', 'b.1'] },
        { say: 'And vary the openings. Begin with a subordinate clause or a phrase, instead of always starting with the subject.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A fragment on purpose',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'A fragment on purpose', md: 'A one-word sentence such as “**Silence.**” at the end of a tense paragraph can create a powerful pause. Used sparingly and on purpose, it works; used by accident or too often, it reads as an **error**.' },
      ],
      lines: [
        { say: 'A one-word sentence, such as silence, at the end of a tense paragraph can create a powerful pause.', show: 'm' },
        { say: 'Used sparingly and on purpose, it works. But used by accident, or too often, it reads as an error.', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Although it was late, Ada kept reading, but her eyes were closing.” What type of sentence is this?',
          choices: [
            'Simple',
            'Compound-complex',
            'Complex',
            'Compound',
          ],
          answer: 1,
          working: 'Main clauses: “Ada kept reading” and “her eyes were closing” (two). Subordinate clause: “Although it was late” (one). Two main clauses plus a subordinate clause make it compound-complex.',
        },
      ],
      lines: [
        { say: 'Your turn. Although it was late, Ada kept reading, but her eyes were closing. What type of sentence is this? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B. There are two main clauses: Ada kept reading, and her eyes were closing. And there is one subordinate clause: although it was late. So it is compound-complex.', show: 'q2.answer' },
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
            '**Simple**: one main clause. **Compound**: two or more.',
            '**Complex**: main + subordinate. **Compound-complex**: both.',
            'Vary sentence length, type and openings.',
            'A short sentence after long ones adds emphasis.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A simple sentence has one main clause, and a compound sentence has two or more.', show: 'sum.0' },
        { say: 'A complex sentence has a main and a subordinate clause, and a compound-complex sentence has both kinds.', show: 'sum.1' },
        { say: 'Vary your sentence length, type and openings to control rhythm.', show: 'sum.2' },
        { say: 'And a short sentence after long ones adds emphasis.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
