import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 3.2 (characters and relationships). An exam-style question we wrote, in the
// style of a Grade 12 reading test, on William Shakespeare's Hamlet (about 1600), which is in the public
// domain. The answer is A: alone in prayer, Claudius admits he murdered his brother, confirming the
// Ghost's story.

const LINES = ['**Claudius:** O, my offence is rank, it smells to heaven;<br>It hath the primal eldest curse upon’t,<br>A brother’s murder.'];

export default englishExam({
  lesson: 'e12-3-2',
  ...ours('a Grade 12 reading test', 'the play is William Shakespeare’s Hamlet (about 1600), in the public domain'),
  title: 'What Does Claudius’s Prayer Reveal?',
  thumbnailTitle: 'Claudius’s Confession',
  subtitle: 'Characters and motives in Hamlet, step by step',
  summary:
    'An exam-style question on Hamlet, solved one small step at a time. Alone at prayer, King Claudius speaks about his “offence”. We decode his words, link the “primal eldest curse” to the Bible’s first murder, and say what the speech proves.',
  intro: [
    'In this video, we solve an exam-style question about the characters of Hamlet. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Hamlet, Act 3, Scene 3',
    say: ['First, the context. Claudius, Hamlet’s uncle, is now king and has married Hamlet’s mother. Alone, he tries to pray. O, my offence is rank, it smells to heaven; it hath the primal eldest curse upon’t, a brother’s murder.'],
  },
  question: {
    prompt: 'What does this speech **reveal** to the audience?',
    text: 'Read Claudius’s lines from Act 3. What does this speech reveal to the audience?',
    choices: [
      'Claudius really did murder his brother, so the Ghost told the truth.',
      'Claudius believes Hamlet is the murderer.',
      'Claudius is praying for his brother’s soul out of love.',
      'Claudius has been falsely accused by the Ghost.',
    ],
    answer: 0,
    working: '*my offence* + *A brother’s murder* = Claudius **confesses**; the **primal eldest curse** = **Cain**, who killed his brother.',
    say: [
      'What does this speech reveal to the audience?',
      'A: Claudius really did murder his brother, so the Ghost told the truth. B: Claudius believes Hamlet is the murderer. C: Claudius is praying for his brother’s soul out of love. D: Claudius has been falsely accused by the Ghost.',
    ],
  },
  ask: [
    ['Claudius is **alone**', 'Claudius is alone, so he has no reason to lie.'],
    ['What does he **reveal**?', 'We need to say what his words reveal.'],
  ],
  know: {
    title: 'The characters of Hamlet',
    md: '**Hamlet**, prince of Denmark, is told by his father’s **Ghost** that **Claudius**, his uncle, murdered the old king and married **Gertrude**, Hamlet’s mother. **Polonius** is the king’s adviser; his children are **Ophelia**, whom Hamlet once courted, and **Laertes**. **Horatio** is Hamlet’s loyal friend. The *primal eldest curse* is God’s curse on **Cain**, the first murderer, who killed his brother **Abel**.',
    say: [
      'Here is the idea we need. Hamlet, prince of Denmark, is told by his father’s Ghost that Claudius, his uncle, murdered the old king and married Gertrude, Hamlet’s mother. Polonius is the king’s adviser, and his children are Ophelia, whom Hamlet once courted, and Laertes. Horatio is Hamlet’s loyal friend.',
      'And the primal eldest curse is God’s curse on Cain, the first murderer in the Bible, who killed his brother Abel.',
    ],
  },
  plan: [
    ['Decode his **words**', 'Here is the plan. First, decode his words.'],
    ['Link the **curse**', 'Second, link the curse to its story.'],
    ['Say what it **proves**', 'Third, say what it proves.'],
  ],
  steps: [
    scene('Step 1: Decode', [table('t', ['Shakespeare', 'Meaning'], [['*my **offence** is **rank***', 'my crime **stinks**'], ['*it smells to **heaven***', 'even God can **sense** it'], ['*the **primal eldest curse***', 'the **first** curse: on **Cain**'], ['*A **brother’s murder***', 'I **killed** my brother']])], [
      { say: 'Step one. My offence is rank: my crime stinks. It smells to heaven: even God can sense it.', show: ['t.0', 't.1'] },
      { say: 'The primal eldest curse is the first curse in the Bible, on Cain, who killed his brother.', show: 't.2' },
      { say: 'And then he says it plainly: a brother’s murder.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: What it proves', [quote('p', ['O, [[bad:my offence]] is rank, it smells to heaven;', 'It hath the primal eldest curse upon’t,', '[[bad:A brother’s murder]].']), text('a', 'Claudius **confesses**: the Ghost told the **truth** → **A**', 'lg')], [
      { say: 'Step two. Claudius is alone, so this is no performance. He confesses to murdering his brother, the old king.', show: 'p' },
      { say: 'So the audience now knows for certain that the Ghost told the truth. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['*my offence*: he names it as **his own** crime', 'Let us check. My offence: he names it as his own crime.'],
    ['and Hamlet does **not** hear this', 'And Hamlet does not hear this confession, which adds dramatic irony. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'He **is** praying, but for his **own** guilt', 'Choice C is the trap. He is praying, but about his own guilt, not out of love for his brother.'],
      ['B', '*my* offence: he blames **himself**', 'Choice B: he says my offence, blaming himself.'],
      ['D', 'His confession **confirms** the Ghost', 'Choice D: his confession confirms the Ghost.'],
    ],
  },
  yourTurn: {
    prompt: 'Who is **Laertes’s** father?',
    choices: ['Claudius', 'Polonius', 'Horatio', 'the Ghost'],
    answer: 1,
    working: 'Polonius’s children: **Laertes** and **Ophelia**.',
    ask: 'Who is Laertes’s father? A: Claudius. B: Polonius. C: Horatio. D: the Ghost.',
    reveal: 'The answer is B, Polonius. His children are Laertes and Ophelia, and when Hamlet kills Polonius, Laertes seeks revenge.',
  },
  sum: [
    ['Claudius **confesses** when alone', 'Here is what to remember. Claudius confesses when he is alone.'],
    ['The **primal eldest curse**: Cain killed his brother', 'The primal eldest curse is Cain’s, for killing his brother.'],
    ['Know the **families**: Polonius, Laertes, Ophelia', 'And know the families: Polonius and his children, Laertes and Ophelia. For more on the characters of Hamlet, watch this lesson’s explainer video on Gradileo.'],
  ],
});
