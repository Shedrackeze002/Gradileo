import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 6.4 (the argumentative essay). An exam-style writing question we wrote, in the
// style of a Grade 11 writing test. The answer is A: it grants the opposing point honestly, then turns it
// into support for the writer's own position.

export default englishExam({
  lesson: 'e11-6-4',
  ...ours('a Grade 11 writing test'),
  title: 'Which Sentence Concedes, Then Turns the Point?',
  thumbnailTitle: 'Concession and Turn',
  subtitle: 'Conceding gracefully, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: an essay argues for a four-day school week and must deal with the point that school days would be longer. We see what a graceful concession does, test four sentences, and choose the one that concedes and then turns.',
  intro: [
    'In this video, we solve an exam-style question about the argumentative essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 writing test.',
  ],
  question: {
    prompt: 'An essay argues for a **four-day school week**. Opponents point out that each school day would be **longer**. Which sentence **concedes** this point and **turns** it to the writer’s advantage?',
    text: 'An essay argues for a four-day school week. Opponents point out that each school day would be longer. Which sentence concedes this point and turns it to the writer’s advantage?',
    choices: [
      'Admittedly, the days would be longer; however, longer lessons allow deeper projects, and a full free day lets students rest and return more focused.',
      'Longer days are not a real problem at all.',
      'Opponents clearly have not thought about this.',
      'The days would be longer, so maybe a four-day week is a bad idea.',
    ],
    answer: 0,
    working: '**Admittedly…** grants the point; **however…** turns it into a **reason for** the writer’s side.',
    say: [
      'An essay argues for a four-day school week. Opponents point out that each school day would be longer. Which sentence concedes this point and turns it to the writer’s advantage?',
      'A: Admittedly, the days would be longer; however, longer lessons allow deeper projects, and a full free day lets students rest and return more focused. B: Longer days are not a real problem at all. C: Opponents clearly have not thought about this. D: The days would be longer, so maybe a four-day week is a bad idea.',
    ],
  },
  ask: [
    ['**Concede**: admit the other side has a point', 'To concede is to admit the other side has a point.'],
    ['**Turn**: make it work for you', 'To turn it is to make that point work for your argument.'],
  ],
  know: {
    title: 'The argumentative essay',
    md: 'Each body paragraph builds a **claim**, supports it with **evidence**, and explains the **reasoning** that links them. A **concession** honestly admits a point against you (*Admittedly*, *It is true that*, *Granted*). A strong writer then **turns** it (*however*, *yet*, *but*), showing why the point does not defeat the argument, or even helps it. Conceding builds **credibility**.',
    say: [
      'Here is the idea we need. Each body paragraph builds a claim, supports it with evidence, and explains the reasoning that links them.',
      'A concession honestly admits a point against you, with words like admittedly, it is true that, or granted. A strong writer then turns it, with however, yet or but, showing why the point does not defeat the argument, or even helps it. Conceding builds credibility.',
    ],
  },
  plan: [
    ['Does it **admit** the point?', 'Here is the plan. First, ask whether each sentence admits the point.'],
    ['Does it **turn** it to the writer’s side?', 'Second, ask whether it turns the point to the writer’s side.'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Choice', 'Admits the point?', 'Turns it?'], [['A', '[[good:✓ Admittedly…]]', '[[good:✓ however… deeper projects, rest]]'], ['B', '[[bad:✗ denies it]]', '✗'], ['C', '[[bad:✗ attacks opponents]]', '✗'], ['D', '✓', '[[bad:✗ gives up the argument]]']])], [
      { say: 'Step one. B denies the point outright, and C attacks the opponents instead of answering them.', show: ['t.1', 't.2'] },
      { say: 'D admits the point, but then gives up the whole argument.', show: 't.3' },
      { say: 'A admits the point, admittedly, the days would be longer, then turns it: longer lessons allow deeper projects, and the free day lets students rest.', show: 't.0', focus: 't.0' },
    ]),
    scene('Step 2: The answer', [quote('p', ['[[theta:Admittedly]], the days would be longer; [[good:however]], longer lessons allow deeper projects…']), text('a', 'Concedes **and** turns → **A**', 'lg')], [
      { say: 'Step two. A concedes the point, and then turns it into a reason for a four-day week. The answer is A.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['A doubtful reader sees the writer is **fair**', 'Let us check. A doubtful reader sees that the writer is fair, which makes the argument more credible.'],
    ['and gets a **reason** to agree', 'And they get a reason to agree. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Concedes, but then **surrenders**', 'Choice D is the trap. It concedes the point, but then surrenders the argument.'],
      ['B', '**Denies** a true point', 'Choice B denies a point that is true.'],
      ['C', 'Attacks **people**, not the point', 'Choice C attacks people, not the point.'],
    ],
  },
  yourTurn: {
    prompt: 'A strong argumentative body paragraph needs…',
    choices: ['only a quotation', 'a summary of the topic', 'the writer’s feelings alone', 'a claim, evidence, and reasoning that links them'],
    answer: 3,
    working: '**Claim**, **evidence**, **reasoning**.',
    ask: 'A strong argumentative body paragraph needs: A: only a quotation. B: a summary of the topic. C: the writer’s feelings alone. D: a claim, evidence, and reasoning that links them.',
    reveal: 'The answer is D. A claim, evidence to support it, and reasoning that explains how the evidence proves the claim.',
  },
  sum: [
    ['Build each paragraph: **claim**, **evidence**, **reasoning**', 'Here is what to remember. Build each paragraph with a claim, evidence and reasoning.'],
    ['**Concede** honestly: *Admittedly…*', 'Concede honestly, with words like admittedly.'],
    ['Then **turn** it: *however…*', 'Then turn the point, with however. For more on the argumentative essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
