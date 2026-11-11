import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'e7-6-3',
  lessonId: 'e7-6-3',
  title: 'Fragments and Run-ons',
  summary:
    'A fragment is missing a subject, a verb or a complete thought. A run-on joins two sentences with no punctuation and a comma splice joins them with only a comma, and both are fixed with a full stop, a semicolon, a comma and conjunction, or a subordinating conjunction.',
  thumbnail: false,
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Grammar and Punctuation', title: 'Fragments and Run-ons', subtitle: 'Too little, and too much' }],
      lines: [
        { say: 'Two of the most common sentence errors are opposites.', show: 'title' },
        { say: 'A fragment is too little: it is missing part of a sentence. A run-on is too much: two sentences crammed together with nothing proper between them. In this video we learn to spot and fix both.' },
      ],
    },
    {
      chapter: 'Sentence fragments',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fragment', md: 'A **fragment** is a group of words punctuated like a sentence that is not a complete sentence. It is missing a **subject**, a **verb** or a **complete thought**.' },
        {
          kind: 'table',
          id: 't',
          head: ['Fragment', 'What is missing', 'One fix'],
          rows: [
            ['*Running down the hill.*', 'a subject and a full verb', '*Leo was running down the hill.*'],
            ['*Because the shop was closed.*', 'a main clause', '*We left because the shop was closed.*'],
            ['*The girl with the red umbrella.*', 'a verb', '*The girl with the red umbrella waved.*'],
          ],
        },
      ],
      lines: [
        { say: 'A fragment is a group of words punctuated like a sentence that is not a complete sentence. It is missing a subject, a verb, or a complete thought.', show: 'def' },
        { say: 'Running down the hill has no subject and no full verb. Add them: Leo was running down the hill.', show: 't', focus: 't.0' },
        { say: 'Because the shop was closed is a dependent clause on its own, so it needs a main clause: we left because the shop was closed.', focus: 't.1' },
        { say: 'And the girl with the red umbrella has no verb. What did she do? The girl with the red umbrella waved.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Fragments on purpose',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'm', tone: 'mistake', title: 'Commands are complete', md: '*Stop!* is a full sentence. In a command, the subject *you* is understood: *(You) stop!*' },
        { kind: 'quote', id: 'q', size: 'md', lines: ['Footsteps. Closer. Closer.'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Fragments for drama in stories; **avoid them** in essays.' },
      ],
      lines: [
        { say: 'Be careful not to call a command a fragment. Stop is a full sentence, because the subject, you, is understood.', show: 'm' },
        { say: 'Writers of stories sometimes use fragments on purpose, for drama. Footsteps. Closer. Closer.', show: 'q' },
        { say: 'That works in a story. But in essays and formal writing, avoid fragments.', show: 'a' },
      ],
    },
    {
      chapter: 'Run-ons and comma splices',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Run-on and comma splice', md: 'A **run-on sentence** joins two independent clauses with no punctuation: *I love pizza I eat it every Friday.* A **comma splice** joins them with only a comma: *It was late, we went home.*' },
        {
          kind: 'table',
          id: 't',
          head: ['Fix', 'Example'],
          rows: [
            ['a full stop', '*It was late. We went home.*'],
            ['a comma and a coordinating conjunction', '*It was late, so we went home.*'],
            ['a semicolon', '*It was late; we went home.*'],
            ['a subordinating conjunction', '*Because it was late, we went home.*'],
          ],
        },
      ],
      lines: [
        { say: 'A run-on sentence joins two independent clauses with no punctuation at all. I love pizza I eat it every Friday.', show: 'def' },
        { say: 'A comma splice joins them with only a comma. It was late, we went home. A comma alone is not strong enough to hold two sentences together.', focus: 'def' },
        { say: 'There are four good fixes. Use a full stop, to make two sentences. Or use a comma and a joining word, like so.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'Or use a semicolon. Or make one clause dependent with a word like because.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: '“Ravi was tired, he kept working.” Which is a correct fix?',
          choices: ['Ravi was tired he kept working.', 'Ravi was tired, he, kept working.', 'Because Ravi was tired.', 'Ravi was tired, but he kept working.'],
          answer: 3,
          working: 'The original is a comma splice. A comma and the conjunction “but” join the two clauses correctly. A is a run-on, and C is a fragment.',
        },
      ],
      lines: [
        { say: 'Your turn. Ravi was tired, he kept working. Which is a correct fix? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is D. The original is a comma splice, and a comma with the conjunction but joins the two clauses correctly. Choice A is a run-on, and C is a fragment.', show: 'q2.answer' },
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
            'A **fragment** is missing a subject, a verb or a complete thought.',
            'A dependent clause alone is a fragment; join it to a main clause.',
            'A **run-on** has no punctuation between sentences; a **comma splice** has only a comma.',
            'Fix them with a full stop, a semicolon, a comma and conjunction, or a subordinator.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A fragment is missing a subject, a verb, or a complete thought.', show: 'sum.0' },
        { say: 'A dependent clause on its own is a fragment, so join it to a main clause.', show: 'sum.1' },
        { say: 'A run-on has no punctuation between two sentences, and a comma splice has only a comma.', show: 'sum.2' },
        { say: 'And you can fix them with a full stop, a semicolon, a comma and a conjunction, or a subordinating conjunction.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
