import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 3.3 (delay, madness and dramatic devices). An exam-style question we wrote, in
// the style of a Grade 12 reading test, on William Shakespeare's Hamlet (about 1600), which is in the
// public domain. The answer is B: Hamlet stages a play that copies his father's murder to see whether
// Claudius reacts with guilt, and so test the Ghost's story.

const LINES = ['**Hamlet:** The spirit that I have seen<br>May be a devil…<br>…The play’s the thing<br>Wherein I’ll catch the conscience of the king.'];

export default englishExam({
  lesson: 'e12-3-3',
  ...ours('a Grade 12 reading test', 'the play is William Shakespeare’s Hamlet (about 1600), in the public domain'),
  title: 'Why Does Hamlet Stage a Play Within the Play?',
  thumbnailTitle: 'The Play Within the Play',
  subtitle: 'Dramatic devices in Hamlet, step by step',
  summary:
    'An exam-style question on Hamlet, solved one small step at a time. Hamlet asks travelling actors to perform a murder just like his father’s, in front of the king. We find his doubt, his plan, and the purpose of the play within the play.',
  intro: [
    'In this video, we solve an exam-style question about Hamlet’s dramatic devices. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Hamlet, Act 2, Scene 2',
    say: ['First, the context. Actors have arrived at the castle, and Hamlet asks them to perform a play in which a man poisons a king, just as the Ghost says Claudius did. Alone, Hamlet says: The spirit that I have seen may be a devil. The play’s the thing wherein I’ll catch the conscience of the king.'],
  },
  question: {
    prompt: 'What is the **purpose** of the play within the play?',
    text: 'Read Hamlet’s lines from Act 2. What is the purpose of the play within the play?',
    choices: [
      'to entertain the court and cheer up his mother',
      'to test whether Claudius reacts with guilt, and so whether the Ghost told the truth',
      'to warn Polonius that he is in danger',
      'to prove to Ophelia that he is not mad',
    ],
    answer: 1,
    working: '*May be a devil* = **doubt**; *catch the conscience of the king* = **test** Claudius’s **guilt**.',
    say: [
      'What is the purpose of the play within the play?',
      'A: to entertain the court and cheer up his mother. B: to test whether Claudius reacts with guilt, and so whether the Ghost told the truth. C: to warn Polonius that he is in danger. D: to prove to Ophelia that he is not mad.',
    ],
  },
  ask: [
    ['Hamlet has a play **performed**', 'Hamlet has a play performed in front of the king.'],
    ['**Why**?', 'We need to say why.'],
  ],
  know: {
    title: 'Dramatic devices in Hamlet',
    md: 'The **play within a play** (*The Mousetrap*) copies the murder in front of Claudius. Hamlet’s **feigned madness** (his *antic disposition*) hides his plans. The **Ghost** sets the revenge plot going, but may be a **devil** in disguise. **Foils**, like **Laertes**, who rushes to avenge his father, show up Hamlet’s **delay**. **Asides** and **dramatic irony** let the audience know more than the characters.',
    say: [
      'Here is the idea we need. The play within a play, The Mousetrap, copies the murder in front of Claudius. Hamlet’s feigned madness, his antic disposition, hides his plans. The Ghost sets the revenge plot going, but it may be a devil in disguise.',
      'Foils, like Laertes, who rushes to avenge his father, show up Hamlet’s delay by contrast. And asides and dramatic irony let the audience know more than the characters.',
    ],
  },
  plan: [
    ['Find Hamlet’s **doubt**', 'Here is the plan. First, find Hamlet’s doubt.'],
    ['Find his **plan**', 'Second, find his plan.'],
    ['Name the **purpose**', 'Third, name the purpose.'],
  ],
  steps: [
    scene('Step 1: Doubt and plan', [table('t', ['Words', 'Meaning'], [['*The spirit that I have seen / **May be a devil***', 'the Ghost might be **lying**, to trick him'], ['*The **play’s the thing***', 'the play is the **tool**'], ['*catch the **conscience** of the king*', 'expose Claudius’s **guilt**']])], [
      { say: 'Step one. The spirit that I have seen may be a devil. Hamlet doubts the Ghost. It might be a devil, tricking him into murder.', show: 't.0' },
      { say: 'So he needs proof. The play’s the thing: the play is his tool, to catch the conscience of the king, to expose his guilt.', show: ['t.1', 't.2'], focus: 't.2' },
    ]),
    scene('Step 2: The purpose', [quote('p', ['The play’s the thing', 'Wherein I’ll [[good:catch the conscience]] of the king.']), text('a', 'Test Claudius’s reaction → test the **Ghost** → **B**', 'lg')], [
      { say: 'Step two. If Claudius reacts with guilt when he sees the murder acted out, the Ghost told the truth.', show: 'p' },
      { say: 'So the play is a test, of Claudius and of the Ghost. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['At the play, Claudius **rises** and calls for light', 'Let us check. At the play, Claudius rises and calls for lights, and rushes out.'],
    ['Hamlet takes this as **proof**', 'Hamlet takes this as proof that the Ghost was honest. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'It looks like **entertainment**, but it is a **trap**', 'Choice A is the trap. The play looks like entertainment for the court, but it is a trap.'],
      ['C', 'Polonius is **not** its target', 'Choice C: Polonius is not its target.'],
      ['D', 'The target is the **king**, not Ophelia', 'Choice D: the target is the king, not Ophelia.'],
    ],
  },
  yourTurn: {
    prompt: 'Laertes, whose father is killed, rushes straight back to Denmark to take revenge. Why is he called Hamlet’s **foil**?',
    choices: ['He is Hamlet’s brother.', 'He never meets Hamlet.', 'His quick action contrasts with Hamlet’s delay.', 'He is secretly the Ghost.'],
    answer: 2,
    working: 'A **foil** shows up a character by **contrast**: Laertes **acts**, Hamlet **delays**.',
    ask: 'Laertes, whose father is killed, rushes straight back to Denmark to take revenge. Why is he called Hamlet’s foil? A: He is Hamlet’s brother. B: He never meets Hamlet. C: His quick action contrasts with Hamlet’s delay. D: He is secretly the Ghost.',
    reveal: 'The answer is C. Laertes acts at once to avenge his father, which highlights how long Hamlet delays.',
  },
  sum: [
    ['The **play within the play** tests the king and the Ghost', 'Here is what to remember. The play within the play tests the king, and the Ghost.'],
    ['A **foil** shows a character by **contrast**', 'A foil shows up a character by contrast.'],
    ['Ask what each **device** does for the plot', 'And ask what each device does for the plot. For more on delay, madness and dramatic devices, watch this lesson’s explainer video on Gradileo.'],
  ],
});
