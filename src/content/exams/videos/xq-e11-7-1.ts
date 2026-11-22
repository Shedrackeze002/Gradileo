import { englishExam, ours, scene, text, table, quote } from '../english.ts';

// Grade 11 English, lesson 7.1 (clauses and sentence combining). An exam-style grammar question we wrote,
// in the style of a Grade 11 language test. The answer is B: "who won the race" is an adjective (relative)
// clause, because it describes the noun "girl".

export default englishExam({
  lesson: 'e11-7-1',
  ...ours('a Grade 11 language test'),
  title: 'What Kind of Clause Is “Who Won the Race”?',
  thumbnailTitle: 'Relative Clauses',
  subtitle: 'Noun, adjective and adverb clauses, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “The girl who won the race is my sister.” We find the clause, ask which word it describes, and name the kind of clause from the job it does in the sentence.',
  intro: [
    'In this video, we solve an exam-style grammar question about clauses. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 language test.',
  ],
  question: {
    prompt: 'In the sentence below, what kind of clause is the underlined part?<br>*The girl <u>who won the race</u> is my sister.*',
    text: 'In the sentence, The girl who won the race is my sister, what kind of clause is, who won the race?',
    choices: ['a noun clause', 'an adjective (relative) clause', 'an adverb clause', 'an independent clause'],
    answer: 1,
    working: '*who won the race* **describes** the noun *girl*: an **adjective (relative) clause**.',
    say: [
      'In the sentence, the girl who won the race is my sister, what kind of clause is the underlined part, who won the race?',
      'A: a noun clause. B: an adjective, or relative, clause. C: an adverb clause. D: an independent clause.',
    ],
  },
  ask: [
    ['*who won the race* is a **clause**', 'Who won the race has a subject and a verb, so it is a clause.'],
    ['What **kind** of clause is it?', 'We need to say what kind of clause it is.'],
  ],
  know: {
    title: 'Three kinds of dependent clause',
    md: 'A **dependent clause** has a subject and a verb but cannot stand alone. We name it by the **job** it does. A **noun clause** works as a noun (*<u>What I need</u> is sleep*). An **adjective (relative) clause** describes a noun and often begins with *who*, *which* or *that*. An **adverb clause** tells *when*, *why*, *where* or *how* (*<u>When the bell rang</u>, we left*).',
    say: [
      'Here is the idea we need. A dependent clause has a subject and a verb, but it cannot stand alone. We name it by the job it does in the sentence.',
      'A noun clause does the job of a noun, as in, what I need is sleep. An adjective, or relative, clause describes a noun, and often begins with who, which or that. An adverb clause tells when, why, where or how, as in, when the bell rang, we left.',
    ],
  },
  plan: [
    ['Check it **cannot** stand alone', 'Here is the plan. First, check that the clause cannot stand alone.'],
    ['Find the word it **describes**', 'Second, find the word it describes.'],
    ['Name it by its **job**', 'Third, name it by its job.'],
  ],
  steps: [
    scene('Step 1: A dependent clause', [quote('p', ['The [[theta:girl]] [[good:who won the race]] is my sister.']), table('t', ['Test', 'Result'], [['subject + verb?', '*who* + *won* ✓'], ['stands alone as a sentence?', '[[bad:no]]: *Who won the race* would be a question']])], [
      { say: 'Step one. Who won the race has a subject, who, and a verb, won. So it is a clause.', show: ['p', 't.0'] },
      { say: 'But it does not stand alone here as a statement. It hangs on the rest of the sentence. So it is a dependent clause, not an independent one.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Its job', [table('j', ['Question', 'Answer'], [['which **girl**?', 'the one *who won the race*'], ['what does it describe?', 'a **noun**, *girl*'], ['what begins it?', 'the relative pronoun **who**']]), text('a', 'Describes a noun → **adjective (relative) clause** → **B**', 'lg')], [
      { say: 'Step two. Ask: which girl? The one who won the race. The clause tells us which girl.', show: 'j.0' },
      { say: 'So it describes a noun, girl, and it begins with the relative pronoun who.', show: ['j.1', 'j.2'] },
      { say: 'A clause that describes a noun is an adjective clause, also called a relative clause. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Remove it: *The girl is my sister* still works', 'Let us check. Take the clause out: the girl is my sister. The sentence still works.'],
    ['It only **added detail** about the girl', 'So the clause only added detail about the girl, just as an adjective does. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'It does not **replace** a noun; it **describes** one', 'Choice A is the trap. The clause sits next to a noun, but it does not do the job of a noun. It describes one.'],
      ['C', 'It tells **which** girl, not when, why or how', 'Choice C: it tells which girl, not when, why or how.'],
      ['D', 'It **cannot** stand alone here', 'Choice D: it cannot stand alone here, so it is not independent.'],
    ],
  },
  yourTurn: {
    prompt: 'In *<u>What I need</u> is sleep*, what kind of clause is the underlined part?',
    choices: ['a noun clause', 'an adjective clause', 'an adverb clause', 'a prepositional phrase'],
    answer: 0,
    working: '*What I need* is the **subject** of *is*: it does a **noun’s** job.',
    ask: 'In the sentence, what I need is sleep, what kind of clause is, what I need? A: a noun clause. B: an adjective clause. C: an adverb clause. D: a prepositional phrase.',
    reveal: 'The answer is A, a noun clause. What I need is the subject of the verb is, so it does the job of a noun.',
  },
  sum: [
    ['Name a clause by its **job**', 'Here is what to remember. Name a clause by the job it does.'],
    ['**Adjective (relative)** clauses describe nouns', 'Adjective, or relative, clauses describe nouns, and often begin with who, which or that.'],
    ['**Noun** clauses act as nouns; **adverb** clauses tell when, why, how', 'Noun clauses act as nouns, and adverb clauses tell when, why, where or how. For more on clauses and sentence combining, watch this lesson’s explainer video on Gradileo.'],
  ],
});
