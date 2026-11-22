import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 6.1 (the critical essay). An exam-style writing question we wrote, in the style
// of a Grade 12 writing test, about a thesis on Shakespeare's Hamlet. The answer is C: it takes a position
// on how and why the play means, and invites argument.

export default englishExam({
  lesson: 'e12-6-1',
  ...ours('a Grade 12 writing test'),
  title: 'Which Is the Strongest Thesis on Hamlet?',
  thumbnailTitle: 'A Sophisticated Thesis',
  subtitle: 'The critical essay, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time. Four students write a thesis for an essay on Hamlet. We test each one: is it arguable, does it say how and why, and could someone disagree with it?',
  intro: [
    'In this video, we solve an exam-style writing question about the critical essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 writing test.',
  ],
  question: {
    prompt: 'Which is the **most sophisticated thesis** for a critical essay on *Hamlet*?',
    text: 'Which is the most sophisticated thesis for a critical essay on Hamlet?',
    choices: [
      'Hamlet is a play about revenge.',
      'In Hamlet, Shakespeare uses many soliloquies.',
      'Through Hamlet’s delay, Shakespeare suggests that a conscience demanding certainty is paralysed in a court built on deception.',
      'Hamlet dies at the end of the play.',
    ],
    answer: 2,
    working: 'C names a **feature** (delay), a **how** (conscience vs deception) and a **why** (what Shakespeare suggests): **arguable**.',
    say: [
      'Which is the most sophisticated thesis for a critical essay on Hamlet?',
      'A: Hamlet is a play about revenge. B: In Hamlet, Shakespeare uses many soliloquies. C: Through Hamlet’s delay, Shakespeare suggests that a conscience demanding certainty is paralysed in a court built on deception. D: Hamlet dies at the end of the play.',
    ],
  },
  ask: [
    ['Four possible **theses**', 'We have four possible theses.'],
    ['Which is most **sophisticated**?', 'We need the most sophisticated one.'],
  ],
  know: {
    title: 'The critical essay',
    md: 'A **sophisticated thesis** takes a **position** on **how** and **why** a text means, so a thoughtful reader **could disagree**. A **fact** or a **topic** is not a thesis. Strong analysis then explores **complexity** and **tension** in the text, and considers a **counter-reading**: another interpretation, which you weigh and answer.',
    say: [
      'Here is the idea we need. A sophisticated thesis takes a position on how and why a text means, so a thoughtful reader could disagree. A fact or a topic is not a thesis.',
      'Strong analysis then explores complexity and tension in the text, and considers a counter-reading, another interpretation, which you weigh and answer.',
    ],
  },
  plan: [
    ['Remove the **facts**', 'Here is the plan. First, remove the plain facts.'],
    ['Remove the **topics**', 'Second, remove the topics.'],
    ['Check for **how** and **why**', 'Third, check for how and why.'],
  ],
  steps: [
    scene('Step 1: Test each one', [table('t', ['Thesis', 'Test'], [['A: *a play about revenge*', '[[bad:a topic]]: no one disagrees'], ['B: *many soliloquies*', '[[bad:a fact]] about form'], ['D: *Hamlet dies*', '[[bad:a plot fact]]'], ['C: *Through Hamlet’s delay…*', '[[good:arguable]]: how **and** why']])], [
      { say: 'Step one. A, Hamlet is a play about revenge, names a topic. No one would disagree, so there is nothing to argue.', show: 't.0' },
      { say: 'B, Shakespeare uses many soliloquies, and D, Hamlet dies, are facts. True, but not arguments.', show: ['t.1', 't.2'] },
      { say: 'C makes a claim someone could challenge.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: How and why', [table('h', ['Part of C', 'Does'], [['*Through Hamlet’s delay*', 'names the **feature**'], ['*a conscience demanding certainty… a court built on deception*', 'the **tension**: how'], ['*Shakespeare suggests*', 'the **meaning**: why']]), text('a', 'Arguable, with how and why → **C**', 'lg')], [
      { say: 'Step two. C names a feature, Hamlet’s delay. It names a tension, a conscience that wants certainty, in a court full of lies.', show: ['h.0', 'h.1'] },
      { say: 'And it says what Shakespeare suggests through it. That is how and why. The answer is C.', show: ['h.2', 'a'] },
    ]),
  ],
  check: [
    ['A reader **could** argue the delay is cowardice', 'Let us check. A reader could argue that Hamlet’s delay is simply cowardice.'],
    ['so C invites **argument**, as a thesis should', 'So C invites argument, as a good thesis should. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'True, but a **topic**: nothing to argue', 'Choice A is the trap. It is true and sounds like a thesis, but it is only a topic, with nothing to argue.'],
      ['B', 'A **fact** about form', 'Choice B is a fact about form.'],
      ['D', 'A **plot** fact', 'Choice D is a plot fact.'],
    ],
  },
  yourTurn: {
    prompt: 'In a critical essay, what is a **counter-reading**?',
    choices: ['an interpretation that challenges yours, which you consider and answer', 'a list of quotations', 'a summary of the plot', 'the conclusion of your essay'],
    answer: 0,
    working: 'Another **interpretation** you **weigh** and answer.',
    ask: 'In a critical essay, what is a counter-reading? A: an interpretation that challenges yours, which you consider and answer. B: a list of quotations. C: a summary of the plot. D: the conclusion of your essay.',
    reveal: 'The answer is A. A counter-reading is another interpretation. Considering it, and answering it, makes your argument stronger.',
  },
  sum: [
    ['A thesis is **arguable**: someone could disagree', 'Here is what to remember. A thesis is arguable. Someone could disagree with it.'],
    ['It says **how** and **why** a text means', 'It says how and why a text means.'],
    ['Weigh a **counter-reading**', 'And strong essays weigh a counter-reading. For more on the critical essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
