import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 6.1 (verbals). An exam-style grammar question we wrote, in the style of a
// Grade 9 language test. The answer is B: "Swimming across the lake" describes Ana, so it is a
// participial phrase acting as an adjective.

export default englishExam({
  lesson: 'e9-6-1',
  ...ours('a Grade 9 language test'),
  title: 'Gerund, Participle or Infinitive?',
  thumbnailTitle: 'Verbals',
  subtitle: 'Gerunds, participles and infinitives, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: in the sentence “Swimming across the lake, Ana spotted a heron”, what kind of phrase is “Swimming across the lake”? We learn the three verbals, ask what job the phrase does, and name it.',
  intro: [
    'In this video, we solve an exam-style grammar question about verbals. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 language test.',
  ],
  question: {
    prompt: 'In the sentence below, what kind of phrase is the underlined part?<br><u>Swimming across the lake</u>, Ana spotted a heron.',
    text: 'In the sentence below, what kind of phrase is the underlined part? Swimming across the lake, Ana spotted a heron.',
    choices: ['a gerund phrase', 'a participial phrase', 'an infinitive phrase', 'a main clause'],
    answer: 1,
    working: '*Swimming across the lake* **describes Ana**: it works as an **adjective**, so it is a **participial** phrase.',
    say: [
      'In the sentence below, what kind of phrase is the underlined part? Swimming across the lake, Ana spotted a heron. The underlined part is swimming across the lake.',
      'A: a gerund phrase. B: a participial phrase. C: an infinitive phrase. D: a main clause.',
    ],
  },
  ask: [
    ['*Swimming* comes from a **verb**', 'Swimming comes from a verb, but here it is not the main verb.'],
    ['What **kind** of phrase is it?', 'We need to name the kind of phrase.'],
  ],
  know: {
    title: 'The three verbals',
    md: 'A **verbal** is a verb form used as another part of speech. **Gerund** (*-ing*) = a **noun**: *Swimming is fun.* **Participle** (*-ing* or *-ed*) = an **adjective**, describing a noun: *the swimming girl*. **Infinitive** (*to* + verb) = a noun, adjective or adverb: *I like to swim.* Ask what **job** the word does.',
    say: [
      'Here is the idea we need. A verbal is a verb form used as another part of speech. A gerund ends in i n g and works as a noun: swimming is fun.',
      'A participle, ending in i n g or e d, works as an adjective and describes a noun: the swimming girl. An infinitive is to plus a verb: I like to swim. To tell them apart, ask what job the word does.',
    ],
  },
  plan: [
    ['Ask what **job** the phrase does', 'Here is the plan. First, ask what job the phrase does.'],
    ['Match the job to a **verbal**', 'Second, match that job to a verbal.'],
  ],
  steps: [
    scene('Step 1: What job?', [quote('p', ['[[theta:Swimming across the lake]], [[good:Ana]] spotted a heron.']), table('t', ['Test', 'Result'], [['Is it the **subject**? (a noun job)', '[[bad:no: **Ana** is the subject]]'], ['Does it **describe** a noun?', '[[good:yes: it tells us about **Ana**]]']])], [
      { say: 'Step one. Who spotted the heron? Ana. So Ana is the subject, and swimming across the lake is not doing a noun’s job.', show: ['p', 't.0'] },
      { say: 'Instead, it describes Ana. It tells us what she was doing. That is an adjective’s job.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Name it', [table('v', ['Verbal', 'Job', 'Fits?'], [['gerund', 'noun', '[[bad:✗]]'], ['participle', 'adjective', '[[good:✓]]'], ['infinitive', '*to* + verb', '[[bad:✗ no *to*]]']]), text('a', 'An *-ing* phrase **describing** a noun: **participial** phrase → **B**', 'lg')], [
      { say: 'Step two. A gerund does a noun’s job, so that does not fit. An infinitive needs to, and there is no to here.', show: ['v.0', 'v.2'] },
      { say: 'A participle does an adjective’s job. So swimming across the lake is a participial phrase. The answer is B.', show: ['v.1', 'a'] },
    ]),
  ],
  check: [
    ['Compare: *Swimming across the lake is hard.*', 'Let us check. Compare: swimming across the lake is hard. There, the phrase is the subject, so it is a gerund.'],
    ['Here it **describes Ana**, so it is a participle', 'In our sentence it describes Ana, so it is a participle. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Gerunds end in *-ing* too, but act as **nouns**', 'Choice A is the trap. Gerunds also end in i n g, but they work as nouns, and this phrase describes Ana.'],
      ['C', 'No **to**: not an infinitive', 'Choice C: there is no to, so it is not an infinitive.'],
      ['D', 'No **subject** of its own: not a clause', 'Choice D: it has no subject of its own, so it cannot be a main clause.'],
    ],
  },
  yourTurn: {
    prompt: 'In *“**Running** is my favourite sport”*, what is *running*?',
    choices: ['a gerund', 'a participle', 'an infinitive', 'an adverb'],
    answer: 0,
    working: '*Running* is the **subject**, a noun job: a **gerund**.',
    ask: 'In, running is my favourite sport, what is running? A: a gerund. B: a participle. C: an infinitive. D: an adverb.',
    reveal: 'The answer is A, a gerund. Running is the subject of the sentence, which is a noun’s job.',
  },
  sum: [
    ['**Gerund**: an *-ing* word doing a **noun’s** job', 'Here is what to remember. A gerund is an i n g word doing a noun’s job.'],
    ['**Participle**: describes a noun, like an **adjective**', 'A participle describes a noun, like an adjective.'],
    ['**Infinitive**: *to* + verb', 'And an infinitive is to plus a verb. For more on verbals, watch this lesson’s explainer video on Gradileo.'],
  ],
});
