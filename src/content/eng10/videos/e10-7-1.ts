import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e10-7-1',
  lessonId: 'e10-7-1',
  title: 'Sentences: Fragments, Run-ons and Comma Splices',
  thumbnailTitle: 'Fragments, Run-ons, Comma Splices',
  thumbnail: false,
  summary:
    'Learn what makes a complete sentence, spot fragments, run-ons and comma splices, fix them in four ways, and name the four kinds of sentence.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Language', title: 'Fragments, Run-ons and Comma Splices', subtitle: 'Make every sentence show its edges' }],
      lines: [
        { say: 'Read this text message aloud: “missed the bus walking now be there soon”. You can follow it, but only because you can guess where each thought ends.', show: 'title' },
        { say: 'In an essay, every sentence has to show its own edges. In this lesson you will find the most common sentence errors, and fix them.' },
      ],
    },
    {
      chapter: 'Clauses and fragments',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Independent and dependent clauses', md: 'An **independent clause** has a subject and a verb and makes sense alone: *The bus was late.* A **dependent clause** starts with a word such as *because* or *although*: *because the bus was late …*' },
        { kind: 'bullets', id: 'b', items: ['*Running down the hall to catch the last bus.* No subject', '*A tall glass of cold mango juice with ice.* No verb', '*Because the power went out during the storm.* Dependent'] },
      ],
      lines: [
        { say: 'A clause is a group of words with a subject and a verb. An independent clause makes sense on its own. A dependent clause begins with a word such as because or although, so it leaves the reader waiting.', show: 'def' },
        { say: 'A fragment is punctuated as a sentence, but has no independent clause. Here are three.', hide: 'def', show: 'b.0' },
        { say: 'The first has no subject: who was running? The second has no verb at all.', show: 'b.1' },
        { say: 'The third has a subject and a verb, but because makes it dependent.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Run-ons and comma splices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Run-on and comma splice', md: 'A **run-on** joins two independent clauses with nothing between them: *The bus broke down on the bridge Wei was late for the test.* A **comma splice** joins them with only a comma: *The bus broke down on the bridge, Wei was late for the test.*' },
        { kind: 'bullets', id: 'fix', items: ['A **period**: *The forecast promised sunshine. It rained all afternoon.*', 'A **semicolon**: *The forecast promised sunshine; it rained all afternoon.*', 'A comma and **FANBOYS**: *The forecast promised sunshine, but it rained all afternoon.*', 'A **subordinating conjunction**: *Although the forecast promised sunshine, it rained all afternoon.*'] },
      ],
      lines: [
        { say: 'A run-on has nothing between two independent clauses. A comma splice has only a comma, which is too weak on its own.', show: 'def' },
        { say: 'There are four ways to fix either one. First, a period makes two sentences.', hide: 'def', show: 'fix.0' },
        { say: 'Second, a semicolon joins two closely related clauses.', show: 'fix.1' },
        { say: 'Third, a comma and a coordinating conjunction: for, and, nor, but, or, yet, so.', show: 'fix.2' },
        { say: 'Fourth, a subordinating conjunction, such as although, makes one clause dependent.', show: 'fix.3' },
      ],
    },
    {
      chapter: 'Fixing a comma splice',
      layout: 'center',
      main: [
        { kind: 'text', id: 'bad', md: 'Splice: *Nia forgot her umbrella, she got soaked on the walk home.*', size: 'lg' },
        { kind: 'bullets', id: 'steps', items: ['Two independent clauses: *Nia forgot her umbrella* and *she got soaked on the walk home*.', 'Forgetting caused the soaking, so *so* or *because* fits.'] },
        { kind: 'text', id: 'ans', md: 'Fixed: *Nia forgot her umbrella, so she got soaked on the walk home.*', size: 'lg' },
      ],
      lines: [
        { say: 'Let’s fix this one: Nia forgot her umbrella, she got soaked on the walk home.', show: 'bad' },
        { say: 'First find the two independent clauses.', show: 'steps.0' },
        { say: 'Next decide how they relate. Forgetting the umbrella caused the soaking, so the word so fits.', show: 'steps.1' },
        { say: 'Join them with a comma and so. A period or a semicolon would also be correct.', show: 'ans' },
      ],
    },
    {
      chapter: 'Four kinds of sentence',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Kind', 'Clauses'],
          rows: [
            ['Simple', 'one independent clause'],
            ['Compound', 'two or more independent clauses'],
            ['Complex', 'one independent clause and a dependent clause'],
            ['Compound-complex', 'two or more independent and a dependent clause'],
          ],
        },
      ],
      lines: [
        { say: 'A simple sentence has one independent clause.', show: 't.0' },
        { say: 'A compound sentence has two or more.', show: 't.1' },
        { say: 'A complex sentence has one independent clause and a dependent clause.', show: 't.2' },
        { say: 'And a compound-complex sentence has two or more independent clauses and a dependent clause.', show: 't.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [{ kind: 'callout', id: 'm', tone: 'mistake', title: 'Fixes that are not fixes', md: '*Nia forgot her umbrella so, she got soaked.* The comma goes **before** the conjunction, not after it.\n\n*She got soaked on the walk home. Because Nia forgot her umbrella.* This just makes a new fragment.' }],
      lines: [
        { say: 'Some fixes are not fixes. In the first example, the comma sits after the word so. A comma goes before the conjunction.', show: 'm' },
        { say: 'And in the second, splitting off a dependent clause with a period just makes a new fragment.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these four sentences is correct, with no run-on, comma splice or misplaced comma?',
          choices: [
            'The museum was closed, so the children went to the park.',
            'The museum was closed, the children went to the park.',
            'The museum was closed the children went to the park.',
            'The museum was closed, so, the children went to the park.',
          ],
          answer: 0,
          working: 'Choice A joins the clauses with a comma before so. B is a comma splice, C a run-on, and D has an extra comma after so.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these four sentences is correct, with no run-on, comma splice or misplaced comma? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is Choice A. B has only a comma between the clauses, C has nothing, and D adds a second comma.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A sentence needs an independent clause.', 'Fix a run-on or comma splice with a period, semicolon, comma and conjunction, or subordinating conjunction.', 'Count clauses to name the kind of sentence.'] }],
      lines: [
        { say: 'Let’s sum up. A sentence needs at least one independent clause.', show: 'sum.0' },
        { say: 'Fix a run-on or comma splice with a period, a semicolon, a comma and a conjunction, or a subordinating conjunction.', show: 'sum.1' },
        { say: 'And count clauses, not words, to name the kind of sentence.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
