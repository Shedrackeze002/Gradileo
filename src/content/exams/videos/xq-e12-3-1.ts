import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 3.1 (the language of Hamlet and its soliloquies). An exam-style question we
// wrote, in the style of a Grade 12 reading test, on William Shakespeare's Hamlet (about 1600), which is
// in the public domain. The answer is D: Hamlet weighs whether it is nobler to endure life's suffering or
// to end it.

const LINES = ['**Hamlet:** To be, or not to be, that is the question:<br>Whether ’tis nobler in the mind to suffer<br>The slings and arrows of outrageous fortune,<br>Or to take arms against a sea of troubles<br>And by opposing end them.'];

export default englishExam({
  lesson: 'e12-3-1',
  ...ours('a Grade 12 reading test', 'the play is William Shakespeare’s Hamlet (about 1600), in the public domain'),
  title: 'What Is Hamlet Asking in “To Be, or Not to Be”?',
  thumbnailTitle: 'To Be, or Not to Be',
  subtitle: 'Paraphrasing a soliloquy, step by step',
  summary:
    'An exam-style question on Hamlet’s most famous soliloquy, solved one small step at a time. We paraphrase each phrase, find the two choices Hamlet sets against each other, and say what question he is really weighing.',
  intro: [
    'In this video, we solve an exam-style question about Hamlet’s language. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Hamlet, Act 3, Scene 1',
    say: ['First, the context. Hamlet’s father has died, and the Ghost has told Hamlet that his uncle, now king, murdered him. Alone on stage, Hamlet says: To be, or not to be, that is the question: whether ’tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles and by opposing end them.'],
  },
  question: {
    prompt: 'What question is Hamlet weighing in these lines?',
    text: 'Read Hamlet’s lines from Act 3. What question is Hamlet weighing in these lines?',
    choices: [
      'whether he should become king',
      'whether to join the army and fight a sea battle',
      'whether the Ghost is telling the truth',
      'whether it is nobler to endure life’s suffering or to end it',
    ],
    answer: 3,
    working: '*To be, or not to be* = to **live** or not; *suffer the slings and arrows* = **endure**; *by opposing **end** them* = end the troubles, and life.',
    say: [
      'What question is Hamlet weighing in these lines?',
      'A: whether he should become king. B: whether to join the army and fight a sea battle. C: whether the Ghost is telling the truth. D: whether it is nobler to endure life’s suffering or to end it.',
    ],
  },
  ask: [
    ['A famous line, but **what** does it ask?', 'This is a famous line, but what does it actually ask?'],
    ['Find the **two choices**', 'We need to find the two choices Hamlet sets out.'],
  ],
  know: {
    title: 'Reading a soliloquy',
    md: 'A **soliloquy** is a speech a character makes **alone**, thinking aloud, so we hear their real thoughts. To read one: **paraphrase** each phrase in modern English; then trace the **argument**, the steps of the thinking, often a choice between two options; then say what it **reveals** about the character. Watch for **metaphors** like *slings and arrows*, *a sea of troubles*.',
    say: [
      'Here is the idea we need. A soliloquy is a speech a character makes alone, thinking aloud, so we hear their real thoughts.',
      'To read one, paraphrase each phrase in modern English. Then trace the argument, the steps of the thinking, which is often a choice between two options. Then say what it reveals about the character. And watch for metaphors, like slings and arrows, or a sea of troubles.',
    ],
  },
  plan: [
    ['**Paraphrase** each phrase', 'Here is the plan. First, paraphrase each phrase.'],
    ['Find the **two options**', 'Second, find the two options.'],
    ['State the **question**', 'Third, state the question he is weighing.'],
  ],
  steps: [
    scene('Step 1: Paraphrase', [table('t', ['Shakespeare', 'Meaning'], [['*To be, or not to be*', 'to **live**, or not to live'], ['*suffer the **slings and arrows** of outrageous fortune*', '**endure** the attacks of cruel luck'], ['*take arms against a **sea of troubles***', 'fight back against endless problems'], ['*by opposing **end** them*', 'and so **end** them, and life too']])], [
      { say: 'Step one. To be, or not to be: to live, or not to live.', show: 't.0' },
      { say: 'Suffer the slings and arrows of outrageous fortune: endure everything cruel luck throws at you.', show: 't.1' },
      { say: 'Take arms against a sea of troubles, and by opposing end them. You cannot really fight a sea. Ending the troubles here means ending life itself.', show: ['t.2', 't.3'], focus: 't.3' },
    ]),
    scene('Step 2: The question', [quote('p', ['Whether ’tis [[theta:nobler]] in the mind [[good:to suffer]]…', 'Or to take arms… and by opposing [[bad:end them]].']), text('a', 'Is it nobler to **endure** suffering, or to **end** it? → **D**', 'lg')], [
      { say: 'Step two. The two options are: to suffer, enduring life’s pain, or to end it.', show: 'p' },
      { say: 'And the test is which is nobler. So he is weighing whether it is nobler to endure life’s suffering or to end it. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['The soliloquy goes on to **death** as *sleep*', 'Let us check. The soliloquy goes on to compare death to sleep.'],
    ['so the question **is** about living or dying', 'So the question really is about living or dying. D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '*take arms* and *sea* are **metaphors**', 'Choice B is the trap. Take arms and a sea of troubles sound like a battle at sea, but they are metaphors.'],
      ['A', 'Not about the **crown** here', 'Choice A: these lines are not about the crown.'],
      ['C', 'He tests the Ghost **elsewhere**, with a play', 'Choice C: Hamlet tests the Ghost elsewhere, with a play.'],
    ],
  },
  yourTurn: {
    prompt: 'In an earlier soliloquy, Hamlet cries *“Frailty, thy name is woman!”* after his mother marries his uncle soon after his father’s death. Whom is he thinking of?',
    choices: ['Gertrude, his mother', 'Ophelia', 'Horatio', 'the Ghost'],
    answer: 0,
    working: 'His **mother’s** quick remarriage: **Gertrude**.',
    ask: 'In an earlier soliloquy, Hamlet cries, Frailty, thy name is woman, after his mother marries his uncle soon after his father’s death. Whom is he thinking of? A: Gertrude, his mother. B: Ophelia. C: Horatio. D: the Ghost.',
    reveal: 'The answer is A, Gertrude. Her quick remarriage makes Hamlet see her as weak, frail, and he blames all women.',
  },
  sum: [
    ['A **soliloquy** reveals private thoughts', 'Here is what to remember. A soliloquy reveals a character’s private thoughts.'],
    ['**Paraphrase** phrase by phrase', 'Paraphrase it phrase by phrase.'],
    ['Trace the **argument**: often a choice of two', 'And trace the argument, which is often a choice between two options. For more on the language of Hamlet, watch this lesson’s explainer video on Gradileo.'],
  ],
});
