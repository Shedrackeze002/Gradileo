import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 4.2 (modelling arguments). An exam-style question we wrote, in the style of a
// Grade 12 reading test. The answer is C: the warrant is the general principle that links the data to
// the claim, here that schools should make changes that help students learn.

export default englishExam({
  lesson: 'e12-4-2',
  ...ours('a Grade 12 reading test'),
  title: 'Which Sentence Is the Warrant?',
  thumbnailTitle: 'The Toulmin Model',
  subtitle: 'Claim, data and warrant, step by step',
  summary:
    'An exam-style question on modelling an argument, solved one small step at a time. A short argument says schools should start later. We label its claim, its data and its rebuttal, and then find the warrant, the link that makes the data count.',
  intro: [
    'In this video, we solve an exam-style question about the parts of an argument. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test.',
  ],
  question: {
    prompt: 'An argument has these four sentences. Which one is the **warrant**, the principle that links the evidence to the claim?',
    text: 'An argument has four sentences. Which one is the warrant, the principle that links the evidence to the claim?',
    choices: [
      'Our school should start the day an hour later.',
      'Studies show students at later-starting schools sleep more and earn higher grades.',
      'Schools ought to make changes that help students learn.',
      'Some will say buses cost more, but the timetable can be shifted for free.',
    ],
    answer: 2,
    working: 'Claim (A) ← data (B); **why does B support A?** Because schools *ought to make changes that help students learn* (C) = the **warrant**.',
    say: [
      'An argument has these four sentences. Which one is the warrant, the principle that links the evidence to the claim?',
      'A: Our school should start the day an hour later. B: Studies show students at later-starting schools sleep more and earn higher grades. C: Schools ought to make changes that help students learn. D: Some will say buses cost more, but the timetable can be shifted for free.',
    ],
  },
  ask: [
    ['Four sentences, four **jobs**', 'The four sentences do four different jobs.'],
    ['Which is the **warrant**?', 'We need to find the warrant.'],
  ],
  know: {
    title: 'The Toulmin model',
    md: 'Stephen Toulmin broke an argument into parts. The **claim** is what you want accepted. The **data** (grounds) is the evidence. The **warrant** is the general principle that explains **why** the data supports the claim; it is often **unstated**. **Backing** supports the warrant. A **qualifier** limits the claim (*probably*, *most*). A **rebuttal** answers an objection.',
    say: [
      'Here is the idea we need. The philosopher Stephen Toulmin broke an argument into parts. The claim is what you want accepted. The data, or grounds, is the evidence. The warrant is the general principle that explains why the data supports the claim, and it is often left unstated.',
      'Backing supports the warrant. A qualifier limits the claim, with words like probably or most. And a rebuttal answers an objection.',
    ],
  },
  plan: [
    ['Find the **claim**', 'Here is the plan. First, find the claim.'],
    ['Find the **data** and the **rebuttal**', 'Second, find the data and the rebuttal.'],
    ['Find the **link**', 'Third, find the link between data and claim.'],
  ],
  steps: [
    scene('Step 1: Label the parts', [table('t', ['Sentence', 'Job'], [['A: *should start… later*', '**claim**: what we want accepted'], ['B: *Studies show…*', '**data**: the evidence'], ['D: *Some will say… but…*', '**rebuttal**: answers an objection']])], [
      { say: 'Step one. A, our school should start later, is what the writer wants accepted. That is the claim.', show: 't.0' },
      { say: 'B, studies show students at later-starting schools sleep more and earn higher grades, is the evidence, the data.', show: 't.1' },
      { say: 'D answers an objection about buses. That is a rebuttal.', show: 't.2' },
    ]),
    scene('Step 2: The link', [text('q', 'Why does **B** support **A**?'), text('w', 'Because *schools ought to make changes that help students learn* (C)'), text('a', 'The principle that links data to claim → **warrant** → **C**', 'lg')], [
      { say: 'Step two. Ask: why does B support A? Better grades in other schools do not prove anything about ours, unless we accept a principle.', show: 'q' },
      { say: 'Because schools ought to make changes that help students learn. That principle is the bridge.', show: 'w' },
      { say: 'The general principle that links the data to the claim is the warrant. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Remove C: B still **describes**, but no longer **demands**', 'Let us check. Remove C, and B still describes other schools, but it no longer demands a change here.'],
    ['so C is the **bridge**', 'So C is the bridge. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Evidence is the **data**, not the link', 'Choice B is the trap. Evidence feels like the strongest part, but it is the data, not the link.'],
      ['A', 'That is the **claim**', 'Choice A is the claim.'],
      ['D', 'That is a **rebuttal**', 'Choice D is a rebuttal.'],
    ],
  },
  yourTurn: {
    prompt: 'In *“Later starts will probably help students,”* which word is the **qualifier**?',
    choices: ['later', 'probably', 'help', 'students'],
    answer: 1,
    working: '*probably* **limits** how strongly the claim is made.',
    ask: 'In, later starts will probably help students, which word is the qualifier? A: later. B: probably. C: help. D: students.',
    reveal: 'The answer is B, probably. It limits how strongly the claim is made.',
  },
  sum: [
    ['**Claim**: what you want accepted · **Data**: the evidence', 'Here is what to remember. The claim is what you want accepted, and the data is the evidence.'],
    ['**Warrant**: why the data supports the claim', 'The warrant is the principle that explains why the data supports the claim.'],
    ['**Qualifier** limits · **Rebuttal** answers', 'A qualifier limits the claim, and a rebuttal answers an objection. For more on modelling arguments, watch this lesson’s explainer video on Gradileo.'],
  ],
});
