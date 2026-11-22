import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 3.1 (reading Shakespeare's language). An exam-style question we wrote, in the
// style of a Grade 10 reading test, on William Shakespeare's Romeo and Juliet (about 1597), which is in
// the public domain. The answer is B: "wherefore" means "why", so Juliet asks why Romeo has to be a
// Montague.

const LINES = ['**Juliet:** O Romeo, Romeo, wherefore art thou Romeo?<br>Deny thy father and refuse thy name;<br>Or, if thou wilt not, be but sworn my love,<br>And I’ll no longer be a Capulet.'];

export default englishExam({
  lesson: 'e10-3-1',
  ...ours('a Grade 10 reading test', 'the play is William Shakespeare’s Romeo and Juliet (about 1597), in the public domain'),
  title: 'What Does “Wherefore Art Thou Romeo?” Really Mean?',
  thumbnailTitle: 'Wherefore Art Thou?',
  subtitle: 'Reading Shakespeare’s English, step by step',
  summary:
    'An exam-style question on one of Shakespeare’s most misread lines, solved one small step at a time. Juliet, alone on her balcony, says “wherefore art thou Romeo?” We decode wherefore, thou and thy, use the next lines as a check, and paraphrase her question in modern English.',
  intro: [
    'In this video, we solve an exam-style question about Shakespeare’s language. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Romeo and Juliet, Act 2, Scene 2',
    say: ['First, read Juliet’s lines. She is alone on her balcony at night, and does not know Romeo can hear her. She has just learned that he is a Montague, the family her own family hates. O Romeo, Romeo, wherefore art thou Romeo? Deny thy father and refuse thy name; or, if thou wilt not, be but sworn my love, and I’ll no longer be a Capulet.'],
  },
  question: {
    prompt: 'What does Juliet mean by *“**wherefore** art thou Romeo?”*',
    text: 'Read Juliet’s lines from Romeo and Juliet, Act 2. What does Juliet mean by “wherefore art thou Romeo?”',
    choices: [
      'Where are you, Romeo?',
      'Why do you have to be Romeo, a Montague?',
      'When will you come, Romeo?',
      'Who are you, Romeo?',
    ],
    answer: 1,
    working: '**wherefore** = **why**; **art thou** = **are you**: *Why are you Romeo?*',
    say: [
      'What does Juliet mean by, wherefore art thou Romeo?',
      'A: Where are you, Romeo? B: Why do you have to be Romeo, a Montague? C: When will you come, Romeo? D: Who are you, Romeo?',
    ],
  },
  ask: [
    ['Old words: **wherefore**, **art**, **thou**', 'The line uses old words: wherefore, art and thou.'],
    ['What is Juliet **asking**?', 'We need to work out what Juliet is really asking.'],
  ],
  know: {
    title: 'Shakespeare’s English',
    md: '**thou** / **thee** = *you*; **thy** / **thine** = *your*; **art** = *are*; **wilt** = *will*; **wherefore** = ***why*** (not *where*!); **hence** = *from here*; **anon** = *soon*. Shakespeare often changes word order: *be but sworn my love* = *just swear you love me*. To **paraphrase**, swap each old word for a modern one, then say the line in plain English.',
    say: [
      'Here is the idea we need. Thou and thee mean you, thy and thine mean your, art means are, and wilt means will. And wherefore means why, not where.',
      'Shakespeare also changes word order. Be but sworn my love means just swear you love me. To paraphrase, swap each old word for a modern one, then say the line in plain English.',
    ],
  },
  plan: [
    ['Swap the **old words**', 'Here is the plan. First, swap the old words.'],
    ['Check with the **next lines**', 'Second, check with the next lines.'],
    ['**Paraphrase** the question', 'Third, paraphrase her question.'],
  ],
  steps: [
    scene('Step 1: Swap the words', [table('t', ['Shakespeare', 'Modern English'], [['**wherefore**', '[[good:why]]'], ['**art thou**', 'are you'], ['*wherefore art thou Romeo?*', '[[good:Why are you Romeo?]]']])], [
      { say: 'Step one. Wherefore means why. Art thou means are you.', show: ['t.0', 't.1'] },
      { say: 'So wherefore art thou Romeo means: why are you Romeo?', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Check the next lines', [quote('p', ['[[good:Deny thy father and refuse thy name]];', 'Or… be but sworn my love,', 'And [[good:I’ll no longer be a Capulet]].']), text('a', 'Why must you be **Romeo**, a **Montague**? → **B**', 'lg')], [
      { say: 'Step two. Check with the next lines. Deny your father and refuse your name. Or just swear you love me, and I will stop being a Capulet.', show: 'p' },
      { say: 'Her problem is his name. She is asking why he has to be Romeo, a Montague, her family’s enemy. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['She **does not know** he is there', 'Let us check. Juliet does not know Romeo is below her balcony, so she is not asking where he is.'],
    ['She is wishing away his **name**', 'She is wishing away his name. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**Wherefore** sounds like *where*, but means **why**', 'Choice A is the trap, and a very famous one. Wherefore sounds like where, but it means why.'],
      ['C', 'Nothing about **time**', 'Choice C: nothing here is about time.'],
      ['D', 'She **knows** who he is', 'Choice D: she knows exactly who he is.'],
    ],
  },
  yourTurn: {
    prompt: 'In Shakespeare’s English, what does **thou** mean?',
    choices: ['you', 'they', 'we', 'them'],
    answer: 0,
    working: '**thou** = **you** (and **thy** = *your*).',
    ask: 'In Shakespeare’s English, what does thou mean? A: you. B: they. C: we. D: them.',
    reveal: 'The answer is A, you. Thou means you, and thy means your.',
  },
  sum: [
    ['**Wherefore** means **why**', 'Here is what to remember. Wherefore means why.'],
    ['**Thou** = you, **thy** = your, **art** = are', 'Thou means you, thy means your, and art means are.'],
    ['Swap the words, then **paraphrase**', 'Swap the old words, then paraphrase. For more on reading Shakespeare’s language, watch this lesson’s explainer video on Gradileo.'],
  ],
});
