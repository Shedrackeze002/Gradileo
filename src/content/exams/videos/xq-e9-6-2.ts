import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 6.2 (sentence variety). An exam-style grammar question we wrote, in the style
// of a Grade 9 language test. The answer is C: two main clauses joined by "and", plus the subordinate
// clause "When the storm hit the coast", make a compound-complex sentence.

export default englishExam({
  lesson: 'e9-6-2',
  ...ours('a Grade 9 language test'),
  title: 'Which Sentence Is Compound-Complex?',
  thumbnailTitle: 'Compound-Complex Sentences',
  subtitle: 'The four sentence types, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: four sentences about a storm, one of each type. We count the main clauses and subordinate clauses in each, and find the compound-complex sentence.',
  intro: [
    'In this video, we solve an exam-style grammar question about sentence types. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 language test.',
  ],
  question: {
    prompt: 'Which sentence is **compound-complex**?',
    text: 'Which sentence is compound-complex?',
    choices: [
      'The storm hit the coast.',
      'The storm hit the coast, and the roads flooded.',
      'When the storm hit the coast, the roads flooded, and the schools closed.',
      'When the storm hit the coast, the roads flooded.',
    ],
    answer: 2,
    working: 'Compound-complex = **two or more main clauses** + **at least one subordinate clause**.',
    say: [
      'Which sentence is compound-complex?',
      'A: The storm hit the coast. B: The storm hit the coast, and the roads flooded. C: When the storm hit the coast, the roads flooded, and the schools closed. D: When the storm hit the coast, the roads flooded.',
    ],
  },
  ask: [
    ['Four sentences, four **types**', 'There are four sentences here, and each is a different type.'],
    ['Which is **compound-complex**?', 'We need the compound-complex one.'],
  ],
  know: {
    title: 'The four sentence types',
    md: 'A **main clause** can stand alone; a **subordinate clause** (starting *when*, *because*, *although*…) cannot. **Simple**: one main clause. **Compound**: two or more main clauses (joined by *and*, *but*, *so*…). **Complex**: one main clause + a subordinate clause. **Compound-complex**: two or more main clauses + at least one subordinate clause.',
    say: [
      'Here is the idea we need. A main clause can stand alone as a sentence, and a subordinate clause, starting with a word like when, because or although, cannot.',
      'A simple sentence has one main clause. A compound sentence has two or more. A complex sentence has one main clause and a subordinate clause. And a compound-complex sentence has two or more main clauses and at least one subordinate clause.',
    ],
  },
  plan: [
    ['Count the **main** clauses', 'Here is the plan. First, count the main clauses in each sentence.'],
    ['Look for a **subordinate** clause', 'Second, look for a subordinate clause.'],
  ],
  steps: [
    scene('Step 1: Count the clauses', [table('t', ['Choice', 'Main clauses', 'Subordinate clause', 'Type'], [['A', '1', 'none', 'simple'], ['B', '2', 'none', 'compound'], ['C', '[[good:2]] (*the roads flooded*, *the schools closed*)', '[[good:When the storm hit the coast]]', '[[good:compound-complex]]'], ['D', '1', '*When the storm hit the coast*', 'complex']])], [
      { say: 'Step one. A has one main clause and nothing else: simple.', show: 't.0' },
      { say: 'B has two main clauses joined by and, but no subordinate clause: compound.', show: 't.1' },
      { say: 'D has a subordinate clause, when the storm hit the coast, and one main clause: complex.', show: 't.3' },
      { say: 'C has the subordinate clause too, and two main clauses: the roads flooded, and the schools closed.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The answer', [text('a', '2 main clauses + 1 subordinate clause → **compound-complex** → **C**', 'lg')], [
      { say: 'Step two. Two main clauses plus a subordinate clause make a compound-complex sentence. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['*the roads flooded* and *the schools closed* can **each stand alone**', 'Let us check. The roads flooded, and the schools closed, can each stand alone.'],
    ['*When the storm hit the coast* **cannot**', 'But when the storm hit the coast cannot. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Has the **subordinate** clause, but only **one** main clause', 'Choice D is the trap. It has the subordinate clause, but only one main clause, so it is complex.'],
      ['B', 'Two main clauses, but **no** subordinate clause', 'Choice B: two main clauses, but no subordinate clause.'],
      ['A', 'Just **one** main clause', 'Choice A: just one main clause.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is **complex**?',
    choices: ['I ran, and she walked.', 'Although it was late, we kept reading.', 'We read.', 'We read, and then we slept.'],
    answer: 1,
    working: 'One main clause (*we kept reading*) + a subordinate clause (*Although it was late*).',
    ask: 'Which sentence is complex? A: I ran, and she walked. B: Although it was late, we kept reading. C: We read. D: We read, and then we slept.',
    reveal: 'The answer is B. Although it was late is a subordinate clause, and we kept reading is the one main clause.',
  },
  sum: [
    ['Count **main** clauses and **subordinate** clauses', 'Here is what to remember. Count the main clauses and the subordinate clauses.'],
    ['**Complex**: one main + subordinate', 'A complex sentence has one main clause and a subordinate clause.'],
    ['**Compound-complex**: two or more main + subordinate', 'A compound-complex sentence has two or more main clauses and a subordinate clause. For more on sentence variety, watch this lesson’s explainer video on Gradileo.'],
  ],
});
