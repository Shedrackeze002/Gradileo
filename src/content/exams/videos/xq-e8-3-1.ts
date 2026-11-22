import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 3.1 (A Midsummer Night's Dream: plot and characters). An exam-style question
// we wrote, in the style of a Grade 8 reading test, on William Shakespeare's A Midsummer Night's Dream
// (about 1595), which is in the public domain. The answer is D: Athenian law would force Hermia to marry
// Demetrius, or face death or life as a nun, so the lovers flee.

const LINES = [
  '**Egeus:** As she is mine, I may dispose of her:<br>Which shall be either to this gentleman<br>Or to her death, according to our law…',
  '**Lysander:** The course of true love never did run smooth.',
];

export default englishExam({
  lesson: 'e8-3-1',
  ...ours('a Grade 8 reading test', 'the play is William Shakespeare’s A Midsummer Night’s Dream (about 1595), in the public domain'),
  title: 'Why Do Hermia and Lysander Run Away to the Wood?',
  thumbnailTitle: 'A Midsummer Night’s Dream',
  subtitle: 'Motives and conflict in Act 1, step by step',
  summary:
    'An exam-style question on Shakespeare’s A Midsummer Night’s Dream, solved one small step at a time: Hermia and Lysander decide to run away to the wood outside Athens. We look at what Egeus demands, what the law allows, and what the lovers want, and explain their motive.',
  intro: [
    'In this video, we solve an exam-style question about A Midsummer Night’s Dream. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, A Midsummer Night’s Dream, Act 1, Scene 1',
    say: [
      'First, read two moments from Act One. Hermia’s father, Egeus, tells Duke Theseus: As she is mine, I may dispose of her: which shall be either to this gentleman, or to her death, according to our law.',
      'And Lysander, who loves Hermia, says: The course of true love never did run smooth.',
    ],
  },
  question: {
    prompt: 'Why do Hermia and Lysander **decide to run away** to the wood outside Athens?',
    text: 'Read the lines from A Midsummer Night’s Dream, Act 1. Why do Hermia and Lysander decide to run away to the wood outside Athens?',
    choices: [
      'They want to find the fairies.',
      'They are rehearsing a play for the Duke’s wedding.',
      'Lysander has fallen in love with Helena.',
      'Athenian law says Hermia must marry Demetrius or face death or life as a nun.',
    ],
    answer: 3,
    working: 'Egeus demands she marry **Demetrius** (*this gentleman*) or die *according to our law*; Theseus adds life as a **nun**. Outside Athens, the law cannot touch them.',
    say: [
      'Why do Hermia and Lysander decide to run away to the wood outside Athens?',
      'A: They want to find the fairies. B: They are rehearsing a play for the Duke’s wedding. C: Lysander has fallen in love with Helena. D: Athenian law says Hermia must marry Demetrius or face death or life as a nun.',
    ],
  },
  ask: [
    ['We need the lovers’ **motive**', 'We need the lovers’ motive: the reason they run away.'],
    ['Look at the **conflict** in Act 1', 'The clue is in the conflict of Act One.'],
  ],
  know: {
    title: 'The four groups in the play',
    md: 'The play has **four groups**: the **nobles** (Theseus and Hippolyta, about to marry), the **young lovers** (Hermia, Lysander, Helena, Demetrius), the **fairies** (Oberon, Titania, Puck), and the **mechanicals** (Bottom and the workmen rehearsing a play). Their plots **cross** in the wood.',
    say: [
      'Here is the idea we need. The play has four groups of characters. The nobles, Theseus and Hippolyta, are about to marry. The four young lovers are Hermia, Lysander, Helena and Demetrius.',
      'The fairies are Oberon, Titania and Puck. And the mechanicals are Bottom and the other workmen, who are rehearsing a play. All their plots cross in the wood.',
    ],
  },
  plan: [
    ['What does **Egeus** demand?', 'Here is the plan. First, what does Egeus demand?'],
    ['What does the **law** allow?', 'Second, what does the law allow?'],
    ['Why would the **wood** help?', 'Third, why would the wood help?'],
  ],
  steps: [
    scene('Step 1: The conflict', [table('t', ['Character', 'Wants'], [['**Egeus** (Hermia’s father)', 'Hermia to marry **Demetrius**'], ['**Hermia**', 'to marry **Lysander**'], ['**Athenian law**', 'obey your father, or **death**, or life as a **nun**']])], [
      { say: 'Step one. Egeus wants Hermia to marry Demetrius. That is this gentleman in his speech.', show: 't.0' },
      { say: 'But Hermia loves Lysander.', show: 't.1' },
      { say: 'And the law is on Egeus’s side: she must obey, or face death, or, as Theseus adds, life as a nun.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Why the wood?', [quote('p', ['As she is mine, I may dispose of her… [[bad:according to our law]]']), text('a', 'Outside **Athens**, Athenian law cannot reach them → **D**', 'lg')], [
      { say: 'Step two. The law belongs to Athens. If the lovers escape through the wood, to Lysander’s aunt beyond the city, the law cannot reach them and they can marry.', show: ['p', 'a'] },
      { say: 'So they run away to escape the law. The answer is D.' },
    ]),
  ],
  check: [
    ['**The course of true love never did run smooth**', 'Let us check. Lysander’s line, the course of true love never did run smooth, sums up their problem.'],
    ['The **law** is the obstacle; running away is the **solution**', 'The law is the obstacle, and running away is their solution. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'That happens **later**, because of **magic**', 'Choice C is the trap. Lysander does fall for Helena, but only later, in the wood, because of Puck’s magic.'],
      ['A', 'The lovers do not **know** about the fairies', 'Choice A: the lovers do not know about the fairies.'],
      ['B', 'That is the **mechanicals’** plot', 'Choice B is the mechanicals’ plot, not the lovers’.'],
    ],
  },
  yourTurn: {
    prompt: 'Which group in the play is rehearsing *Pyramus and Thisbe* for the Duke’s wedding?',
    choices: ['the mechanicals', 'the fairies', 'the young lovers', 'the nobles'],
    answer: 0,
    working: 'Bottom, Quince and the other **workmen**: the **mechanicals**.',
    ask: 'Which group in the play is rehearsing Pyramus and Thisbe for the Duke’s wedding? A: the mechanicals. B: the fairies. C: the young lovers. D: the nobles.',
    reveal: 'The answer is A, the mechanicals. Bottom, Quince and the other workmen hope to perform it at the wedding.',
  },
  sum: [
    ['Four groups: **nobles**, **lovers**, **fairies**, **mechanicals**', 'Here is what to remember. The play has four groups: the nobles, the lovers, the fairies and the mechanicals.'],
    ['The lovers flee **Athenian law** and Egeus’s demand', 'The lovers flee Athenian law, and Egeus’s demand.'],
    ['All the plots **cross** in the **wood**', 'And all the plots cross in the wood. For more on A Midsummer Night’s Dream, watch this lesson’s explainer video on Gradileo.'],
  ],
});
