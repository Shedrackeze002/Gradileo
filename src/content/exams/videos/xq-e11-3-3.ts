import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 3.3 (the supernatural and dramatic devices). An exam-style question we wrote,
// in the style of a Grade 11 reading test, on William Shakespeare's Macbeth (about 1606), which is in the
// public domain. The answer is B: the prophecy is true in an unexpected sense that misleads Macbeth,
// which is equivocation.

const LINES = [
  '**Apparition:** Be bloody, bold, and resolute; laugh to scorn<br>The power of man, for none of woman born<br>Shall harm Macbeth.',
  '**Macduff:** …Macduff was from his mother’s womb<br>Untimely ripp’d.',
];

export default englishExam({
  lesson: 'e11-3-3',
  ...ours('a Grade 11 reading test', 'the play is William Shakespeare’s Macbeth (about 1606), in the public domain'),
  title: 'How Do the Witches Trick Macbeth?',
  thumbnailTitle: 'Equivocation',
  subtitle: 'Prophecy and double meaning, step by step',
  summary:
    'An exam-style question on Macbeth, solved one small step at a time: an apparition promises that “none of woman born” can harm Macbeth, and in the final battle Macduff reveals his birth. We compare what Macbeth heard with what was true, and name the device.',
  intro: [
    'In this video, we solve an exam-style question about the supernatural in Macbeth. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Macbeth, Act 4, Scene 1, and Act 5, Scene 8',
    say: [
      'First, read two moments. In Act Four, the witches show Macbeth an apparition, which tells him: Be bloody, bold, and resolute; laugh to scorn the power of man, for none of woman born shall harm Macbeth.',
      'In the final battle, Macduff tells him: Macduff was from his mother’s womb untimely ripped. He was born by an early operation, not in the usual way.',
    ],
  },
  question: {
    prompt: 'The prophecy *“none of woman born / Shall harm Macbeth”* turns out to be true in a way he never expected. What is this device called?',
    text: 'Read the two moments from Macbeth. The prophecy “none of woman born shall harm Macbeth” turns out to be true in a way he never expected. What is this device called?',
    choices: ['an aside', 'equivocation', 'comic relief', 'a soliloquy'],
    answer: 1,
    working: 'Words with a **double meaning**, technically **true** but **misleading**: **equivocation**.',
    say: ['The prophecy, none of woman born shall harm Macbeth, turns out to be true in a way he never expected. What is this device called? A: an aside. B: equivocation. C: comic relief. D: a soliloquy.'],
  },
  ask: [
    ['The prophecy is **true**, but **misleading**', 'The prophecy turns out to be true, but it misled Macbeth.'],
    ['What is that **called**?', 'We need the name of the device.'],
  ],
  know: {
    title: 'Dramatic devices in Macbeth',
    md: '**Prophecy**: a prediction, here from the **witches**. **Equivocation**: speaking with a **double meaning** to **mislead**, saying something technically **true**. **Dramatic irony**: the audience knows more than the character. **Soliloquy**: alone, speaking thoughts aloud. **Aside**: a quick remark the other characters do not hear. Macbeth is full of the idea *fair is foul, and foul is fair*: nothing is what it seems.',
    say: [
      'Here is the idea we need. A prophecy is a prediction, here from the witches. Equivocation is speaking with a double meaning to mislead, while saying something technically true. Dramatic irony is when the audience knows more than a character.',
      'A soliloquy is a character alone, speaking their thoughts aloud, and an aside is a quick remark that other characters do not hear. Macbeth is full of the idea that fair is foul, and foul is fair: nothing is what it seems.',
    ],
  },
  plan: [
    ['What did Macbeth **hear**?', 'Here is the plan. First, what did Macbeth hear?'],
    ['What was **true**?', 'Second, what was actually true?'],
    ['Name the **device**', 'Third, name the device.'],
  ],
  steps: [
    scene('Step 1: Heard and true', [table('t', ['', 'Meaning'], [['what Macbeth **heard**', '[[bad:no human being can ever harm me]]'], ['what was **true**', '[[good:a man not born in the usual way **can**]]'], ['*from his mother’s womb / Untimely ripp’d*', 'Macduff was born by an early **operation**']])], [
      { say: 'Step one. Macbeth heard: no human can ever harm me, because every human is born of a woman. So he laughs at danger.', show: 't.0' },
      { say: 'But the words had a hidden meaning. Macduff was untimely ripped from his mother’s womb, born by an early operation, not in the usual way.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Name it', [quote('p', ['…for [[theta:none of woman born]]', 'Shall harm Macbeth.']), text('a', 'True, but **misleading**: a double meaning → **equivocation** → **B**', 'lg')], [
      { say: 'Step two. The prophecy was technically true, but its double meaning misled Macbeth into false confidence. That is equivocation. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Macbeth: *be these juggling fiends no more believ’d*', 'Let us check. Macbeth himself cries that these juggling fiends should no longer be believed, because they keep the word of promise to our ear, and break it to our hope.'],
    ['He sees the **double meaning** too late', 'He sees the double meaning too late. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'An aside is a **remark**, not a misleading prophecy', 'Choice A is the trap. Asides are common in Macbeth, but an aside is a quick private remark, not a misleading prophecy.'],
      ['C', 'Nothing **funny** here', 'Choice C: nothing here is funny.'],
      ['D', 'Not a speech **alone**', 'Choice D: it is not a speech made alone.'],
    ],
  },
  yourTurn: {
    prompt: 'Macbeth says, so that others on stage cannot hear: *“Stars, hide your fires; / Let not light see my black and deep desires.”* This is…',
    choices: ['a soliloquy', 'a dialogue', 'an aside', 'a prophecy'],
    answer: 2,
    working: 'A quick remark **others on stage do not hear**: an **aside**.',
    ask: 'Macbeth says, so that others on stage cannot hear: Stars, hide your fires; let not light see my black and deep desires. This is: A: a soliloquy. B: a dialogue. C: an aside. D: a prophecy.',
    reveal: 'The answer is C, an aside. Other characters are on stage, but only the audience hears his dark wish.',
  },
  sum: [
    ['**Equivocation**: true words that **mislead**', 'Here is what to remember. Equivocation uses true words that mislead.'],
    ['The witches **equivocate**: *fair is foul*', 'The witches equivocate, because in this play fair is foul.'],
    ['**Aside**: others on stage do not hear', 'And an aside is a remark that others on stage do not hear. For more on the supernatural and dramatic devices, watch this lesson’s explainer video on Gradileo.'],
  ],
});
