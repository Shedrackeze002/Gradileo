import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 7.3 (Julius Caesar). An exam-style question we wrote, in the style of a GCSE
// English Literature exam, on William Shakespeare's Julius Caesar (about 1599), which is in the public
// domain. The answer is B: repeating "Brutus is an honourable man" beside evidence against him makes the
// phrase sound ironic, and turns the crowd.

const LINES = ['**Antony:** He was my friend, faithful and just to me:<br>But Brutus says he was ambitious;<br>And Brutus is an honourable man.<br>He hath brought many captives home to Rome<br>Whose ransoms did the general coffers fill:<br>Did this in Caesar seem ambitious?'];

export default englishExam({
  lesson: 'ex-7-3',
  ...ours('a GCSE English Literature exam', 'the play is William Shakespeare’s Julius Caesar (about 1599), in the public domain'),
  title: 'Why Does Antony Keep Saying “Brutus Is an Honourable Man”?',
  thumbnailTitle: 'Julius Caesar',
  subtitle: 'Antony’s funeral speech, step by step',
  summary:
    'An exam-style question on Julius Caesar, solved one small step at a time. At Caesar’s funeral, Mark Antony may not blame the men who killed him. We follow how he places one repeated phrase beside the evidence, and explain how it turns the crowd.',
  intro: [
    'In this video, we solve an exam-style question about Julius Caesar. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Julius Caesar, Act 3, Scene 2',
    say: ['First, the context. Brutus and the other conspirators have killed Caesar, claiming he was too ambitious. Brutus lets Mark Antony speak at the funeral, as long as he does not blame them. Antony says: He was my friend, faithful and just to me: but Brutus says he was ambitious; and Brutus is an honourable man. He hath brought many captives home to Rome, whose ransoms did the general coffers fill: did this in Caesar seem ambitious?'],
  },
  question: {
    prompt: 'What is the main **effect** of Antony repeating *“Brutus is an honourable man”*?',
    text: 'Read Antony’s lines from Act 3. What is the main effect of Antony repeating Brutus is an honourable man?',
    choices: [
      'It shows that Antony sincerely admires Brutus.',
      'Placed beside evidence that Caesar was not ambitious, it becomes ironic and turns the crowd against Brutus.',
      'It reminds the crowd that Brutus will be their next ruler.',
      'It shows Antony has forgotten what else to say.',
    ],
    answer: 1,
    working: '*Brutus says he was ambitious* **vs** evidence (*faithful*, *ransoms… coffers fill*) → *honourable* sounds **ironic**.',
    say: [
      'What is the main effect of Antony repeating, Brutus is an honourable man?',
      'A: It shows that Antony sincerely admires Brutus. B: Placed beside evidence that Caesar was not ambitious, it becomes ironic and turns the crowd against Brutus. C: It reminds the crowd that Brutus will be their next ruler. D: It shows Antony has forgotten what else to say.',
    ],
  },
  ask: [
    ['Antony **repeats** one phrase', 'Antony repeats one phrase again and again.'],
    ['What is its **effect**?', 'We need its effect on the crowd.'],
  ],
  know: {
    title: 'Julius Caesar',
    md: '**Cassius** persuades the noble **Brutus** to join a plot against **Caesar**, fearing he will become a tyrant. Caesar is stabbed in the Senate. Brutus explains the killing to the crowd, but **Mark Antony**’s funeral speech turns them into a **mob**. Civil war follows; at **Philippi**, haunted by Caesar’s ghost, Brutus and Cassius take their own lives. Themes: **power**, **honour**, **persuasion** and **fate**.',
    say: [
      'Here is the idea we need. Cassius persuades the noble Brutus to join a plot against Caesar, fearing he will become a tyrant. Caesar is stabbed in the Senate. Brutus explains the killing to the crowd, but Mark Antony’s funeral speech turns them into a mob.',
      'Civil war follows. At Philippi, haunted by Caesar’s ghost, Brutus and Cassius take their own lives. The themes include power, honour, persuasion and fate.',
    ],
  },
  plan: [
    ['What does **Brutus** claim?', 'Here is the plan. First, what does Brutus claim?'],
    ['What **evidence** does Antony give?', 'Second, what evidence does Antony give?'],
    ['How does the phrase **change**?', 'Third, how does the repeated phrase change?'],
  ],
  steps: [
    scene('Step 1: Claim and evidence', [table('t', ['Antony repeats', 'Antony’s evidence'], [['*Brutus says he was **ambitious***', '*He was my friend, **faithful and just***'], ['*Brutus is an **honourable** man*', '*ransoms did the general coffers **fill***: money for **Rome**']])], [
      { say: 'Step one. Brutus claims Caesar was ambitious, greedy for power. Antony never contradicts him directly.', show: 't.0' },
      { say: 'Instead he gives evidence. Caesar was faithful and just. He brought captives home, and their ransoms filled Rome’s treasury, not his own pocket. Did this seem ambitious?', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Irony', [quote('p', ['But Brutus says he was ambitious;', 'And Brutus is an [[theta:honourable]] man.', '…Did this in Caesar seem [[bad:ambitious]]?']), text('a', 'Each repeat sounds more **ironic**; the crowd **turns** → **B**', 'lg')], [
      { say: 'Step two. Each time the evidence shows Caesar was not ambitious, Antony repeats: and Brutus is an honourable man.', show: 'p' },
      { say: 'The phrase sounds more and more ironic, until the crowd hears the opposite. Antony turns them against Brutus without breaking his promise. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['By the end, the crowd calls the conspirators **traitors**', 'Let us check. By the end of the speech, the crowd calls the conspirators traitors.'],
    ['so the phrase **worked** as irony', 'So the phrase worked as irony. B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The **words** praise Brutus; the **context** mocks him', 'Choice A is the trap. The words praise Brutus, but the evidence around them makes them mock him.'],
      ['C', 'Nothing about Brutus **ruling**', 'Choice C: nothing here says Brutus will rule.'],
      ['D', 'The repetition is **deliberate**', 'Choice D: the repetition is deliberate and skilful.'],
    ],
  },
  yourTurn: {
    prompt: 'Who says *“Et tu, Brute?”* (*“You too, Brutus?”*)',
    choices: ['Brutus', 'Cassius', 'Julius Caesar', 'Mark Antony'],
    answer: 2,
    working: '**Caesar**, as he sees his friend among the killers.',
    ask: 'Who says, Et tu, Brute, which means, you too, Brutus? A: Brutus. B: Cassius. C: Julius Caesar. D: Mark Antony.',
    reveal: 'The answer is C, Julius Caesar. He says it as he sees his friend Brutus among the men stabbing him.',
  },
  sum: [
    ['Repetition **beside evidence** creates **irony**', 'Here is what to remember. Repetition placed beside evidence can create irony.'],
    ['Antony turns the crowd **without** breaking his promise', 'Antony turns the crowd without breaking his promise.'],
    ['Themes: **power**, **honour**, **persuasion**', 'And the play’s themes include power, honour and persuasion. For more on Julius Caesar, watch this lesson’s explainer video on Gradileo.'],
  ],
});
