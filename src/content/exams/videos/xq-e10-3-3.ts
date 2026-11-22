import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 3.3 (soliloquy and dramatic irony). An exam-style question we wrote, in the
// style of a Grade 10 reading test, on William Shakespeare's Romeo and Juliet (about 1597), which is in
// the public domain. The answer is C: the audience knows Juliet is only drugged while Romeo believes she
// is dead, which is dramatic irony.

const LINES = ['**Romeo:** Here’s to my love! [*Drinks.*] O true apothecary!<br>Thy drugs are quick. Thus with a kiss I die.'];

export default englishExam({
  lesson: 'e10-3-3',
  ...ours('a Grade 10 reading test', 'the play is William Shakespeare’s Romeo and Juliet (about 1597), in the public domain'),
  title: 'Why Is Romeo’s Death Scene So Painful to Watch?',
  thumbnailTitle: 'Dramatic Irony',
  subtitle: 'What the audience knows, step by step',
  summary:
    'An exam-style question on the tomb scene in Romeo and Juliet, solved one small step at a time. Romeo finds Juliet lying still and drinks poison. We compare what Romeo knows with what the audience knows, and name the technique that makes the moment so painful.',
  intro: [
    'In this video, we solve an exam-style question about dramatic irony. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Romeo and Juliet, Act 5, Scene 3',
    say: ['First, read Romeo’s last words. He has found Juliet lying still in her family’s tomb, and believes she is dead. Here’s to my love! He drinks. O true apothecary! Thy drugs are quick. Thus with a kiss I die.'],
  },
  question: {
    prompt: 'The audience knows Juliet has only taken a **sleeping potion**. What technique makes Romeo’s death so painful to watch?',
    text: 'Read Romeo’s lines from Act 5. The audience knows Juliet has only taken a sleeping potion. What technique makes Romeo’s death so painful to watch?',
    choices: ['a soliloquy', 'comic relief', 'dramatic irony', 'an aside'],
    answer: 2,
    working: 'The **audience** knows she is **alive**; **Romeo** does not: **dramatic irony**.',
    say: ['The audience knows Juliet has only taken a sleeping potion. What technique makes Romeo’s death so painful to watch? A: a soliloquy. B: comic relief. C: dramatic irony. D: an aside.'],
  },
  ask: [
    ['Romeo believes Juliet is **dead**', 'Romeo believes Juliet is dead.'],
    ['The audience knows she is **alive**', 'But the audience knows she is alive.'],
  ],
  know: {
    title: 'Dramatic techniques',
    md: '**Dramatic irony**: the **audience** knows something a **character** does not. **Soliloquy**: a character **alone** speaks their thoughts aloud. **Aside**: a quick remark to the **audience** that others on stage do not hear. **Monologue**: a long speech **to** other characters. **Comic relief**: a funny moment that **eases** tension. **Foreshadowing**: hints of what is **to come**.',
    say: [
      'Here is the idea we need. Dramatic irony is when the audience knows something a character does not. A soliloquy is a character alone, speaking their thoughts aloud. An aside is a quick remark to the audience that others on stage do not hear.',
      'A monologue is a long speech to other characters. Comic relief is a funny moment that eases tension. And foreshadowing hints at what is to come.',
    ],
  },
  plan: [
    ['What does **Romeo** know?', 'Here is the plan. First, what does Romeo know?'],
    ['What does the **audience** know?', 'Second, what does the audience know?'],
    ['Name the **gap**', 'Third, name the gap between them.'],
  ],
  steps: [
    scene('Step 1: Two kinds of knowledge', [table('t', ['Who', 'Believes Juliet is…'], [['**Romeo**', '[[bad:dead]]'], ['**the audience**', '[[good:alive: drugged by Friar Laurence’s potion]]']])], [
      { say: 'Step one. Romeo believes Juliet is dead. The message explaining the Friar’s plan never reached him.', show: 't.0' },
      { say: 'But we, the audience, watched Juliet drink the potion. We know she is only asleep, and will wake soon.', show: 't.1' },
    ]),
    scene('Step 2: The gap', [quote('p', ['Thy drugs are quick. [[bad:Thus with a kiss I die.]]']), text('a', 'We know what Romeo does not → **dramatic irony** → **C**', 'lg')], [
      { say: 'Step two. We want to shout: stop, she is alive! That gap between what we know and what Romeo knows is dramatic irony. The answer is C.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Moments later, Juliet **wakes**', 'Let us check. Moments later, Juliet wakes and finds Romeo dead.'],
    ['The irony makes the tragedy **unbearable**', 'The irony makes the tragedy almost unbearable. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Romeo **is** alone here, but the question is about the **audience’s** knowledge', 'Choice A is the trap. Romeo does speak alone here, but the pain comes from what the audience knows.'],
      ['B', 'Nothing here is **funny**', 'Choice B: nothing here is funny.'],
      ['D', 'Not a quick remark to the audience', 'Choice D: this is not a quick remark to the audience.'],
    ],
  },
  yourTurn: {
    prompt: 'What do we call a speech in which a character, **alone** on stage, speaks their thoughts aloud?',
    choices: ['dialogue', 'an aside', 'a soliloquy', 'comic relief'],
    answer: 2,
    working: 'Alone, thinking aloud: a **soliloquy**.',
    ask: 'What do we call a speech in which a character, alone on stage, speaks their thoughts aloud? A: dialogue. B: an aside. C: a soliloquy. D: comic relief.',
    reveal: 'The answer is C, a soliloquy. The character is alone, so we hear their private thoughts.',
  },
  sum: [
    ['**Dramatic irony**: we know what a character does not', 'Here is what to remember. Dramatic irony is when we know what a character does not.'],
    ['It builds **tension** and **pity**', 'It builds tension and pity.'],
    ['**Soliloquy**: alone, thinking aloud', 'And a soliloquy is a character alone, thinking aloud. For more on soliloquy and dramatic irony, watch this lesson’s explainer video on Gradileo.'],
  ],
});
