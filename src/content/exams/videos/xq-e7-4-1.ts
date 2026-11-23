import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 4.1 (claims, reasons and evidence). An exam-style question we wrote, in the
// style of a Grade 7 reading test. The answer is B: a measured result from a study of many students is
// stronger than a single story, an opinion or a guess. The study is invented for the question.

export default englishExam({
  lesson: 'e7-4-1',
  ...ours('a Grade 7 reading test', 'the study in the question is invented'),
  title: 'Which Evidence Best Supports the Claim?',
  thumbnailTitle: 'Judging Evidence',
  subtitle: 'Claims, reasons and evidence, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a writer claims that schools should start later in the morning, and we choose the strongest evidence. We learn the kinds of evidence, test each choice for how much it proves, and pick the one that is measured and broad.',
  intro: [
    'In this video, we solve an exam-style question about judging evidence. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test. The study in it is invented for the question.',
  ],
  question: {
    prompt: 'A writer claims: *Schools should start later in the morning.* Which evidence **best** supports this claim?',
    text: 'A writer claims: “Schools should start later in the morning.” Which evidence best supports this claim?',
    choices: [
      'My cousin is always tired at school.',
      'In a study of 2,000 students, those who started an hour later slept more and scored higher on tests.',
      'Everyone knows that mornings are hard.',
      'Later starts would be really nice.',
    ],
    answer: 1,
    working: 'A **study** of **many** students with **measured** results beats one story, a vague claim and an opinion.',
    say: [
      'A writer claims: schools should start later in the morning. Which evidence best supports this claim?',
      'A: My cousin is always tired at school. B: In a study of two thousand students, those who started an hour later slept more and scored higher on tests. C: Everyone knows that mornings are hard. D: Later starts would be really nice.',
    ],
  },
  ask: [
    ['**Evidence** backs up a **claim**', 'Evidence is what backs up a claim.'],
    ['Which piece is **strongest**?', 'We need the strongest piece of evidence.'],
  ],
  know: {
    title: 'Kinds of evidence',
    md: 'An argument has a **claim**, **reasons** and **evidence**. Kinds of evidence: **statistics** and **studies**, **expert** opinion, **examples**, and **anecdotes** (personal stories). Strong evidence is **relevant**, **specific**, and based on **many** cases, not one.',
    say: [
      'Here is the idea we need. An argument has a claim, reasons for it, and evidence that backs the reasons up.',
      'Evidence can be statistics and studies, the opinion of an expert, examples, or anecdotes, which are personal stories. Strong evidence is relevant, specific, and based on many cases rather than one.',
    ],
  },
  plan: [
    ['Name the **kind** of each piece of evidence', 'Here is the plan. First, name the kind of each piece of evidence.'],
    ['Ask how **much** each one proves', 'Second, ask how much each one really proves.'],
  ],
  steps: [
    scene('Step 1: Kind and strength', [table('t', ['Choice', 'Kind', 'How strong?'], [['A: my cousin is tired', '**anecdote**', '[[bad:one person only]]'], ['B: study of 2,000 students', '**study** with results', '[[good:many people, measured]]'], ['C: everyone knows', '**vague** claim', '[[bad:no proof]]'], ['D: would be nice', '**opinion**', '[[bad:no proof]]']])], [
      { say: 'Step one. A is an anecdote: one story about one cousin. It might be true, but it proves very little.', show: 't.0' },
      { say: 'C says everyone knows. That sounds strong, but it gives no proof at all. D is just an opinion.', show: ['t.2', 't.3'] },
      { say: 'B is a study of two thousand students, with measured results: more sleep and higher scores. That is specific and based on many cases.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: The answer', [text('a', '**B**: specific, measured, and based on **many** students', 'lg')], [{ say: 'Step two. The strongest evidence is B. The answer is B.', show: 'a' }]),
  ],
  check: [
    ['B is **relevant**: start times, sleep and learning', 'Let us check. B is relevant: it links start times to sleep and to learning.'],
    ['and it could be **checked**', 'And a study can be checked, unlike a feeling. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A **real example**, but just **one** person', 'Choice A is the trap. It feels real, but one cousin is not enough to prove a claim about every school.'],
      ['C', '**Everyone knows** is not proof', 'Choice C: everyone knows is a claim, not proof.'],
      ['D', 'An **opinion**, not evidence', 'Choice D is an opinion.'],
    ],
  },
  yourTurn: {
    prompt: 'A writer argues that the town needs a new library. Which sentence is a **reason**, not evidence?',
    choices: ['A library gives everyone a free place to learn.', 'The old library has 40 seats for 9,000 residents.', 'A survey found 70 out of 100 residents want a new library.', 'Library visits rose by half last year.'],
    answer: 0,
    working: 'A explains **why**; the others give **facts and numbers** that back it up.',
    ask: 'A writer argues that the town needs a new library. Which sentence is a reason, not evidence? A: A library gives everyone a free place to learn. B: The old library has forty seats for nine thousand residents. C: A survey found seventy out of a hundred residents want a new library. D: Library visits rose by half last year.',
    reveal: 'The answer is A. It explains why the town needs a library. The others are pieces of evidence: facts and numbers that back the reasons up.',
  },
  sum: [
    ['**Claim**, **reasons**, **evidence**', 'Here is what to remember. An argument has a claim, reasons and evidence.'],
    ['Know the kinds: **studies**, **experts**, **examples**, **anecdotes**', 'Know the kinds of evidence: studies, experts, examples and anecdotes.'],
    ['Strong evidence is **specific** and based on **many** cases', 'Strong evidence is specific and based on many cases. For more on claims, reasons and evidence, watch this lesson’s explainer video on Gradileo.'],
  ],
});
