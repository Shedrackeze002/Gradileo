import { englishExam, ours, scene, table } from '../english.ts';

// Grade 8 English, lesson 7.1 (the argument essay). An exam-style question we wrote, in the style of a
// Grade 8 writing test. The answer is B: it concedes a fair point and then rebuts it with a reason.

export default englishExam({
  lesson: 'e8-7-1',
  ...ours('a Grade 8 writing test'),
  title: 'Which Sentence Best Concedes and Rebuts?',
  thumbnailTitle: 'Concede and Rebut',
  subtitle: 'Handling the other side in an argument essay, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student argues that the school year should include a week of outdoor learning, and we choose the best way to handle the other side. We learn what conceding and rebutting mean, test four sentences, and pick the one that does both.',
  intro: [
    'In this video, we solve an exam-style writing question about the argument essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 writing test.',
  ],
  question: {
    prompt: 'A student argues that every school year should include **a week of outdoor learning**. Which sentence best **concedes and rebuts** a counterargument?',
    text: 'A student argues that every school year should include a week of outdoor learning. Which sentence best concedes and rebuts a counterargument?',
    choices: [
      'Anyone who disagrees with outdoor learning is lazy.',
      'Although a week outdoors takes time from regular lessons, students learn science and teamwork through hands-on tasks that classrooms cannot offer.',
      'Some people think outdoor learning wastes time.',
      'Outdoor learning is fun.',
    ],
    answer: 1,
    working: '**Although…** admits a fair point (lost lesson time); the **main clause** answers it with a reason.',
    say: [
      'A student argues that every school year should include a week of outdoor learning. Which sentence best concedes and rebuts a counterargument?',
      'A: Anyone who disagrees with outdoor learning is lazy. B: Although a week outdoors takes time from regular lessons, students learn science and teamwork through hands-on tasks that classrooms cannot offer. C: Some people think outdoor learning wastes time. D: Outdoor learning is fun.',
    ],
  },
  ask: [
    ['**Concede**: admit the other side has a point', 'To concede is to admit the other side has a fair point.'],
    ['**Rebut**: then answer it', 'To rebut is to answer it. We need a sentence that does both.'],
  ],
  know: {
    title: 'Conceding and rebutting',
    md: 'A strong argument essay **concedes** (admits a fair point from the other side) and then **rebuts** (explains why its own position still holds). Useful patterns: *Although X, Y.* · *It is true that X; however, Y.* A rebuttal gives a **reason**, never an insult.',
    say: [
      'Here is the idea we need. A strong argument essay concedes, which means it admits a fair point from the other side, and then rebuts, which means it explains why its own position still holds.',
      'Useful patterns are, although X, Y, and, it is true that X; however, Y. A rebuttal gives a reason, never an insult.',
    ],
  },
  plan: [
    ['Does it **admit** a fair point?', 'Here is the plan. First, does each sentence admit a fair point?'],
    ['Does it then **answer** it with a reason?', 'Second, does it then answer it with a reason?'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Sentence', 'Concedes?', 'Rebuts with a reason?'], [['A: … is lazy', '[[bad:✗]]', '[[bad:✗ an insult]]'], ['B: Although… students learn…', '[[good:✓ takes time from lessons]]', '[[good:✓ hands-on learning]]'], ['C: Some people think…', '[[good:✓]]', '[[bad:✗ no answer]]'], ['D: … is fun', '[[bad:✗]]', '[[bad:✗]]']])], [
      { say: 'Step one. A insults the other side. That is not a rebuttal.', show: 't.0' },
      { say: 'C states the other side, but never answers it. It is only half the job.', show: 't.2' },
      { say: 'D is just an opinion.', show: 't.3' },
      { say: 'B admits a fair point, that it takes time from regular lessons, then answers with a reason: hands-on learning classrooms cannot offer. The answer is B.', show: 't.1', focus: 't.1' },
    ]),
  ],
  check: [
    ['Conceding makes the writer seem **fair**', 'Let us check. Conceding makes the writer seem fair, which builds trust.'],
    ['and the rebuttal keeps the argument **standing**', 'And the rebuttal keeps the argument standing. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Concedes, but **never rebuts**', 'Choice C is the trap. It mentions the other side, but leaves it unanswered, which weakens the essay.'],
      ['A', 'An **insult**, not a reason', 'Choice A is an insult, not a reason.'],
      ['D', 'An **opinion** with no counterargument', 'Choice D has no counterargument at all.'],
    ],
  },
  yourTurn: {
    prompt: 'Which is the most **precise, arguable** thesis for an argument essay?',
    choices: ['Our town should replace its old library with a community learning centre that offers free classes, quiet study space and computer access.', 'Libraries are buildings.', 'This essay is about libraries.', 'Some people like libraries.'],
    answer: 0,
    working: 'A takes a **specific** position someone could **dispute**.',
    ask: 'Which is the most precise, arguable thesis for an argument essay? A: Our town should replace its old library with a community learning centre that offers free classes, quiet study space and computer access. B: Libraries are buildings. C: This essay is about libraries. D: Some people like libraries.',
    reveal: 'The answer is A. It takes a specific position that someone could dispute, and previews the reasons.',
  },
  sum: [
    ['**Concede**: admit a fair point from the other side', 'Here is what to remember. To concede is to admit a fair point from the other side.'],
    ['**Rebut**: answer it with a **reason**', 'To rebut is to answer it with a reason.'],
    ['Try *Although X, Y* or *It is true that X; however, Y*', 'Try although X, Y, or it is true that X; however, Y. For more on the argument essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
