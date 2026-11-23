import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 3.3 (claims and evidence). An exam-style question we wrote, in the style
// of a Grade 6 reading test, on a passage we wrote (its survey is invented for the question). The
// answer is B: it is the only sentence that gives evidence (a survey result) for the claim.

const PASSAGE = [
  '(1) Our school should keep the library open at lunchtime. (2) The library is a lovely, peaceful room with big windows.',
  '(3) In a survey last term, 140 of our 200 pupils said they would use it at lunch to read, study or finish homework.',
  '(4) Some people think pupils should be outside at lunch. (5) Reading is also a wonderful hobby.',
];

export default englishExam({
  lesson: 'e6-3-3',
  ...ours('a Grade 6 reading test', 'the passage and its survey are invented by Gradileo'),
  title: 'Which Sentence Best Supports the Writer’s Claim?',
  thumbnailTitle: 'Claims and Evidence',
  subtitle: 'Evidence, not opinion, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a writer claims the school library should open at lunchtime, and we choose the sentence that best supports that claim. We find the claim, tell evidence apart from opinion, and test each sentence.',
  intro: [
    'In this video, we solve an exam-style reading question about claims and evidence. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 6 reading test. The survey in it is made up for the question.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. One: our school should keep the library open at lunchtime. Two: the library is a lovely, peaceful room with big windows.',
      'Three: in a survey last term, 140 of our 200 pupils said they would use it at lunch to read, study or finish homework.',
      'Four: some people think pupils should be outside at lunch. Five: reading is also a wonderful hobby.',
    ],
  },
  question: {
    prompt: 'Which sentence gives the **best evidence** for the writer’s claim?',
    text: 'Read the passage about the school library. Which sentence gives the best evidence for the writer’s claim?',
    choices: ['sentence 2', 'sentence 3', 'sentence 4', 'sentence 5'],
    answer: 1,
    working: 'Sentence 3 gives a fact that can be checked (a survey) showing pupils would use the library.',
    say: ['Which sentence gives the best evidence for the writer’s claim? A: sentence 2. B: sentence 3. C: sentence 4. D: sentence 5.'],
  },
  ask: [
    ['Find the writer’s **claim**', 'First we need to find the writer’s claim.'],
    ['Which sentence is the strongest **evidence** for it?', 'Then we need the sentence that gives the strongest evidence for it.'],
  ],
  know: {
    title: 'Claims and evidence',
    md: 'A **claim** is what a writer wants you to believe. **Evidence** is the proof: **facts**, **numbers**, **examples** or **expert** views that can be checked. An **opinion** or a description is **not** evidence.',
    say: [
      'Here is the idea we need. A claim is what a writer wants you to believe or do.',
      'Evidence is the proof that supports it: facts, numbers, examples or expert views that could be checked. An opinion, or a nice description, is not evidence.',
    ],
  },
  plan: [
    ['Find the **claim**', 'Here is the plan. First, find the claim.'],
    ['Sort each sentence: **evidence**, **opinion**, or **other**?', 'Second, sort each sentence: is it evidence, opinion, or something else?'],
    ['Check the evidence is **about the claim**', 'Third, check that the evidence is about the claim.'],
  ],
  steps: [
    scene('Step 1: The claim', [quote('p', PASSAGE.slice(0, 1)), text('n', 'Claim: the library should be **open at lunchtime**.')], [
      { say: 'Step one. Sentence 1 states the claim: our school should keep the library open at lunchtime. The word should signals it.', show: ['p', 'n'] },
    ]),
    scene('Step 2: Sort the sentences', [table('t', ['Sentence', 'What it is'], [['2: lovely, peaceful room', 'description and opinion'], ['3: 140 of 200 pupils said they would use it', '[[good:evidence: a survey result]]'], ['4: some people think pupils should be outside', 'the **other side**'], ['5: reading is a wonderful hobby', 'opinion']])], [
      { say: 'Step two. Pause and sort the sentences.', wait: 3 },
      { say: 'Sentence 2 says the library is lovely and peaceful. That is a description, with opinion words like lovely. It does not prove pupils need it at lunch.', show: 't.0' },
      { say: 'Sentence 3 gives a survey: 140 of 200 pupils would use it at lunch. That is a fact that could be checked, and it shows real demand. That is evidence.', show: 't.1', focus: 't.1' },
      { say: 'Sentence 4 gives the other side of the argument, a counterclaim. It does not support the writer.', show: 't.2' },
      { say: 'Sentence 5 is an opinion about reading in general.', show: 't.3' },
      { say: 'So the best evidence is sentence 3. The answer is B.' },
    ]),
  ],
  check: [
    ['It can be **checked**: ask to see the survey', 'Let us check. Sentence 3 could be checked: we could ask to see the survey.'],
    ['It is about the **claim**: pupils would **use** it at **lunchtime**', 'And it is directly about the claim: pupils would use the library at lunchtime. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Sounds positive, but is **description**, not proof', 'Choice A sounds positive about the library, but a nice room does not prove it should open at lunch.'],
      ['D', 'An **opinion**, and about reading in **general**', 'Choice D is an opinion, and it is about reading in general.'],
      ['C', 'A **counterclaim**: it argues the other way', 'Choice C argues the other way, so it cannot support the claim.'],
    ],
  },
  yourTurn: {
    prompt: 'Claim: *Our town needs a new bike lane on Mill Road.* Which sentence is the best **evidence**?',
    choices: ['Cycling is fun for the whole family.', 'Bike lanes look nice.', 'Last year there were 12 accidents involving cyclists on Mill Road.', 'I ride my bike every weekend.'],
    answer: 2,
    working: 'A checkable fact about danger on that road.',
    ask: 'Claim: our town needs a new bike lane on Mill Road. Which sentence is the best evidence?',
    reveal: 'The answer is C. Twelve accidents on Mill Road is a fact that can be checked, and it shows why the lane is needed. The others are opinions or personal stories.',
  },
  sum: [
    ['A **claim** is what the writer wants you to believe', 'Here is what to remember. A claim is what the writer wants you to believe.'],
    ['**Evidence** is checkable: facts, numbers, examples, experts', 'Evidence can be checked: facts, numbers, examples and expert views.'],
    ['Opinions, descriptions and counterclaims are **not** evidence for the claim', 'Opinions, descriptions and counterclaims are not evidence for the claim. For more on claims and evidence, watch this lesson’s explainer video on Gradileo.'],
  ],
});
