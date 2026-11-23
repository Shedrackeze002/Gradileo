import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 3.3 (comedy and the play within the play). An exam-style question we wrote,
// in the style of a Grade 8 reading test, on Puck's line from William Shakespeare's A Midsummer Night's
// Dream (about 1595), which is in the public domain. The answer is A: Puck finds the lovers' quarrels
// ridiculous, and invites the audience to laugh at them too.

const LINES = ['**Puck:** Shall we their fond pageant see?<br>Lord, what fools these mortals be!'];

export default englishExam({
  lesson: 'e8-3-3',
  ...ours('a Grade 8 reading test', 'the play is William Shakespeare’s A Midsummer Night’s Dream (about 1595), in the public domain'),
  title: 'What Does “Lord, What Fools These Mortals Be!” Reveal?',
  thumbnailTitle: 'Shakespearean Comedy',
  subtitle: 'What key lines reveal, step by step',
  summary:
    'An exam-style question on A Midsummer Night’s Dream, solved one small step at a time: Puck watches the four lovers quarrel in the wood and laughs at them. We put his line in context, decode its words, and explain what it reveals about Puck and about the play as a comedy.',
  intro: [
    'In this video, we solve an exam-style question about a key line from A Midsummer Night’s Dream. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, A Midsummer Night’s Dream, Act 3, Scene 2',
    say: ['First, read Puck’s line. He is watching the four young lovers, confused by his magic, quarrelling in the wood. Shall we their fond pageant see? Lord, what fools these mortals be!'],
  },
  question: {
    prompt: 'What does Puck’s line **mainly** reveal?',
    text: 'Read Puck’s line from A Midsummer Night’s Dream, Act 3. What does Puck’s line mainly reveal?',
    choices: [
      'Puck finds the humans’ love troubles ridiculous, and invites us to laugh at them.',
      'Puck is afraid of the humans.',
      'Puck feels deeply sorry for the lovers.',
      'Puck wants to become human.',
    ],
    answer: 0,
    working: '*fools*, *fond pageant* (a silly show): Puck **mocks** the lovers, and the audience laughs **with** him.',
    say: [
      'What does Puck’s line mainly reveal?',
      'A: Puck finds the humans’ love troubles ridiculous, and invites us to laugh at them. B: Puck is afraid of the humans. C: Puck feels deeply sorry for the lovers. D: Puck wants to become human.',
    ],
  },
  ask: [
    ['Puck is **watching** the lovers quarrel', 'Puck is watching the four lovers quarrel.'],
    ['What does his line **reveal**?', 'We need what his line reveals.'],
  ],
  know: {
    title: 'Shakespearean comedy',
    md: 'A **Shakespearean comedy** has **confusion** and **mistaken identity**, **love** problems, often a **magical** or green **world** away from the city, **comic** characters, and a **happy ending**, usually in **marriages**. *Mortals* means humans; *fond* in Shakespeare’s time meant **foolish**.',
    say: [
      'Here is the idea we need. A Shakespearean comedy has confusion and mistaken identity, problems in love, often a magical world away from the city, comic characters, and a happy ending, usually with marriages.',
      'Two words to know: mortals means humans, and fond, in Shakespeare’s time, meant foolish.',
    ],
  },
  plan: [
    ['Put the line in **context**', 'Here is the plan. First, put the line in context.'],
    ['Decode the **key words**', 'Second, decode the key words.'],
    ['Say what it **reveals**', 'Third, say what it reveals.'],
  ],
  steps: [
    scene('Step 1: Context and words', [table('t', ['Word', 'Meaning'], [['**fond**', 'foolish'], ['**pageant**', 'a show'], ['**mortals**', 'humans'], ['**fools**', 'silly people']]), text('c', 'Context: Puck’s magic has made **both** young men love **Helena**, and the four lovers are **quarrelling**.')], [
      { say: 'Step one. The context: Puck’s magic has gone wrong, and now both young men love Helena. The four lovers are quarrelling wildly.', show: 'c' },
      { say: 'Fond means foolish, a pageant is a show, and mortals are humans. So: shall we watch their silly show? Lord, what fools these humans are!', show: ['t.0', 't.1', 't.2', 't.3'] },
    ]),
    scene('Step 2: What it reveals', [quote('p', ['Shall we their [[theta:fond pageant]] see?', 'Lord, what [[bad:fools]] these [[theta:mortals]] be!']), text('a', 'Puck **mocks** the lovers; we **laugh** with him → **A**', 'lg')], [
      { say: 'Step two. Puck is enjoying the chaos. To him, human love is a silly show. And because he speaks to us, we look down on the lovers with him and laugh.', show: ['p', 'a'] },
      { say: 'The answer is A.' },
    ]),
  ],
  check: [
    ['Confusion and love troubles = **comedy**', 'Let us check. Confusion and love troubles in a magical wood are typical of comedy.'],
    ['and the line **invites laughter**', 'And Puck’s line invites the audience to laugh. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'The lovers suffer, but Puck **enjoys** it', 'Choice C is the trap. The lovers are miserable, but Puck is amused, not sorry.'],
      ['B', 'Puck is **powerful**, not afraid', 'Choice B: Puck has the power here.'],
      ['D', 'He calls humans **fools**', 'Choice D: he calls humans fools, so he hardly wants to be one.'],
    ],
  },
  yourTurn: {
    prompt: 'Which is a typical feature of a **Shakespearean comedy**?',
    choices: ['the death of the hero', 'a battle that ends the play', 'confusion in love that ends in marriages', 'a ghost seeking revenge'],
    answer: 2,
    working: 'Comedies end **happily**, usually in **marriages**.',
    ask: 'Which is a typical feature of a Shakespearean comedy? A: the death of the hero. B: a battle that ends the play. C: confusion in love that ends in marriages. D: a ghost seeking revenge.',
    reveal: 'The answer is C. Shakespeare’s comedies untangle confusion in love and end happily, usually in marriages. A Midsummer Night’s Dream ends with three weddings.',
  },
  sum: [
    ['Comedy: **confusion**, **love** problems, a **happy ending**', 'Here is what to remember. A Shakespearean comedy has confusion, love problems and a happy ending.'],
    ['Decode key words: *fond* = foolish, *mortals* = humans', 'Decode the key words: fond means foolish, and mortals means humans.'],
    ['Ask what a line reveals about the **speaker** and the **play**', 'And ask what a line reveals about the speaker and the play. For more on comedy and the play within the play, watch this lesson’s explainer video on Gradileo.'],
  ],
});
