import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 3.4 (themes). An exam-style question we wrote, in the style of a Grade 10
// reading test, on William Shakespeare's Romeo and Juliet (about 1597), which is in the public domain.
// The answer is B: Friar Laurence's warning "they stumble that run fast" directly supports the claim
// that the play warns against haste.

export default englishExam({
  lesson: 'e10-3-4',
  ...ours('a Grade 10 reading test', 'the play is William Shakespeare’s Romeo and Juliet (about 1597), in the public domain'),
  title: 'Which Quotation Best Supports the Claim?',
  thumbnailTitle: 'Choosing Evidence',
  subtitle: 'Themes and evidence in Romeo and Juliet, step by step',
  summary:
    'An exam-style question on Romeo and Juliet, solved one small step at a time: a student claims the play warns against acting too quickly. We find the key idea in the claim, test four famous quotations against it, and choose the strongest evidence.',
  intro: [
    'In this video, we solve an exam-style question about choosing evidence for a claim. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  question: {
    prompt: 'A student claims: *“Romeo and Juliet warns that acting too **quickly** leads to disaster.”* Which quotation **best** supports this claim?',
    text: 'A student claims: Romeo and Juliet warns that acting too quickly leads to disaster. Which quotation best supports this claim?',
    choices: [
      '“But, soft! what light through yonder window breaks?”',
      '“Wisely and slow; they stumble that run fast.”',
      '“A plague o’ both your houses!”',
      '“Parting is such sweet sorrow.”',
    ],
    answer: 1,
    working: 'The claim is about **speed**; *they stumble that **run fast*** says exactly that.',
    say: [
      'A student claims: Romeo and Juliet warns that acting too quickly leads to disaster. Which quotation best supports this claim?',
      'A: But, soft! what light through yonder window breaks? B: Wisely and slow; they stumble that run fast. C: A plague o’ both your houses! D: Parting is such sweet sorrow.',
    ],
  },
  ask: [
    ['The claim is about acting too **quickly**', 'The claim is about acting too quickly.'],
    ['Which quotation **proves** it?', 'We need the quotation that proves it best.'],
  ],
  know: {
    title: 'Themes and evidence',
    md: 'A **theme** is a full idea, such as *hatred destroys the innocent* or *haste leads to disaster*. The **best evidence** for a claim matches its **key idea** directly, not just its **topic**. Test each quotation: *Does it say what the claim says?* Key themes of *Romeo and Juliet*: **love**, **hate** and the **feud**, **fate**, and **haste**.',
    say: [
      'Here is the idea we need. A theme is a full idea, such as hatred destroys the innocent, or haste leads to disaster.',
      'The best evidence for a claim matches its key idea directly, not just its topic. So test each quotation: does it say what the claim says? Key themes of Romeo and Juliet include love, hate and the feud, fate, and haste.',
    ],
  },
  plan: [
    ['Find the claim’s **key idea**', 'Here is the plan. First, find the key idea in the claim.'],
    ['**Test** each quotation', 'Second, test each quotation against it.'],
  ],
  steps: [
    scene('Step 1: The key idea', [quote('p', ['Romeo and Juliet warns that acting [[theta:too quickly]] leads to [[theta:disaster]].']), text('n', 'Key idea: **speed** → **harm**')], [
      { say: 'Step one. The key idea is speed leading to harm: acting too quickly leads to disaster.', show: ['p', 'n'] },
    ]),
    scene('Step 2: Test each quotation', [table('t', ['Quotation', 'About…', 'Speed → harm?'], [['*what light through yonder window breaks?*', 'Romeo’s **love** for Juliet', '[[bad:✗]]'], ['*Wisely and slow; they stumble that run fast.*', 'going too **fast** makes you **fall**', '[[good:✓ exactly]]'], ['*A plague o’ both your houses!*', 'the **feud**', '[[bad:✗]]'], ['*Parting is such sweet sorrow.*', 'saying **goodbye**', '[[bad:✗]]']]), text('a', 'Friar Laurence’s warning matches the claim → **B**', 'lg')], [
      { say: 'Step two. What light through yonder window breaks is about Romeo’s love for Juliet. Not speed.', show: 't.0' },
      { say: 'A plague on both your houses is about the feud. Parting is such sweet sorrow is about saying goodbye.', show: ['t.2', 't.3'] },
      { say: 'Wisely and slow; they stumble that run fast. Friar Laurence warns Romeo that people who rush fall. That matches the claim exactly. The answer is B.', show: ['t.1', 'a'], focus: 't.1' },
    ]),
  ],
  check: [
    ['The lovers marry within **a day** of meeting', 'Let us check. The lovers marry within a day of meeting, and everything that follows is rushed.'],
    ['The Friar’s warning **comes true**', 'The Friar’s warning comes true. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'A real **disaster** quote, but about the **feud**', 'Choice C is the trap. A plague on both your houses is about disaster, but it blames the feud, not haste.'],
      ['A', 'About **love**, not speed', 'Choice A is about love, not speed.'],
      ['D', 'About **goodbyes**', 'Choice D is about saying goodbye.'],
    ],
  },
  yourTurn: {
    prompt: 'Which of these states a **theme** of *Romeo and Juliet*, rather than a topic or plot?',
    choices: ['love', 'the feud between two families', 'Romeo and Juliet both die', 'Hatred between groups can destroy the innocent.'],
    answer: 3,
    working: 'A **complete idea** about **life**: a theme.',
    ask: 'Which of these states a theme of Romeo and Juliet, rather than a topic or plot? A: love. B: the feud between two families. C: Romeo and Juliet both die. D: Hatred between groups can destroy the innocent.',
    reveal: 'The answer is D. It is a complete idea about life, while A and B are topics, and C is plot.',
  },
  sum: [
    ['Find the claim’s **key idea**', 'Here is what to remember. Find the key idea in the claim.'],
    ['The best evidence matches the **idea**, not just the **topic**', 'The best evidence matches the idea, not just the topic.'],
    ['Themes are **complete** statements', 'And themes are complete statements. For more on the themes of Romeo and Juliet, watch this lesson’s explainer video on Gradileo.'],
  ],
});
