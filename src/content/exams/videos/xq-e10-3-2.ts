import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 3.2 (character and motive). An exam-style question we wrote, in the style of a
// Grade 10 reading test, on William Shakespeare's Romeo and Juliet (about 1597), which is in the public
// domain. The answer is A: Tybalt rejects peace and hates all Montagues, so he is hot-tempered and full
// of hatred.

const LINES = ['**Benvolio:** I do but keep the peace: put up thy sword,<br>Or manage it to part these men with me.', '**Tybalt:** What, drawn, and talk of peace! I hate the word,<br>As I hate hell, all Montagues, and thee:<br>Have at thee, coward!'];

export default englishExam({
  lesson: 'e10-3-2',
  ...ours('a Grade 10 reading test', 'the play is William Shakespeare’s Romeo and Juliet (about 1597), in the public domain'),
  title: 'What Do Tybalt’s First Words Reveal About Him?',
  thumbnailTitle: 'Tybalt',
  subtitle: 'Character and motive from a character’s lines, step by step',
  summary:
    'An exam-style question on Romeo and Juliet, solved one small step at a time: in the opening street fight, Benvolio tries to stop the brawl and Tybalt arrives. We contrast the two speakers, decode Tybalt’s reply, and infer what kind of man he is.',
  intro: [
    'In this video, we solve an exam-style question about character and motive. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Romeo and Juliet, Act 1, Scene 1',
    say: [
      'First, read the lines. Servants of the two feuding families are fighting in the street. Benvolio, a Montague, draws his sword to separate them. I do but keep the peace: put up thy sword, or manage it to part these men with me.',
      'Tybalt, a Capulet, replies: What, drawn, and talk of peace! I hate the word, as I hate hell, all Montagues, and thee: Have at thee, coward!',
    ],
  },
  question: {
    prompt: 'What do Tybalt’s lines **mainly** reveal about him?',
    text: 'Read the lines from Romeo and Juliet, Act 1. What do Tybalt’s lines mainly reveal about him?',
    choices: [
      'He is hot-tempered and full of hatred for the Montagues.',
      'He wants to end the feud between the families.',
      'He is afraid to fight Benvolio.',
      'He has misunderstood what Benvolio said.',
    ],
    answer: 0,
    working: '*I hate the word* (**peace**), *as I hate hell, all Montagues*, *Have at thee, coward!*: **hatred** and **aggression**.',
    say: [
      'What do Tybalt’s lines mainly reveal about him?',
      'A: He is hot-tempered and full of hatred for the Montagues. B: He wants to end the feud between the families. C: He is afraid to fight Benvolio. D: He has misunderstood what Benvolio said.',
    ],
  },
  ask: [
    ['A character is revealed by **what they say**', 'A character is revealed by what they say.'],
    ['What do Tybalt’s words **show**?', 'We need to infer what Tybalt’s words show about him.'],
  ],
  know: {
    title: 'Inferring character and motive',
    md: 'We **infer** a character’s traits and **motives** (why they act) from their **words** and **actions**, and from how they **contrast** with other characters (a **foil**). Back every inference with a **quotation**. In *Romeo and Juliet*, the **Montagues** (Romeo, Benvolio) and **Capulets** (Juliet, her cousin Tybalt) are locked in an old **feud**.',
    say: [
      'Here is the idea we need. We infer a character’s traits, and their motives, why they act, from their words and actions, and from how they contrast with other characters, called foils. Back every inference with a quotation.',
      'In Romeo and Juliet, the Montagues, Romeo’s family, and the Capulets, Juliet’s family, are locked in an old feud. Tybalt is Juliet’s cousin.',
    ],
  },
  plan: [
    ['Compare him with **Benvolio**', 'Here is the plan. First, compare Tybalt with Benvolio.'],
    ['Decode his **words**', 'Second, decode his words.'],
    ['Infer his **character**', 'Third, infer his character.'],
  ],
  steps: [
    scene('Step 1: Two speakers', [table('t', ['Benvolio', 'Tybalt'], [['*I do but **keep the peace***', '*I **hate** the word*'], ['*put up thy sword*', '*Have at thee, coward!*']])], [
      { say: 'Step one. Benvolio says he is only keeping the peace, and asks Tybalt to put his sword away.', show: 't.0' },
      { say: 'Tybalt answers that he hates the very word peace, and attacks: have at thee, coward! Benvolio is a foil, and his calm makes Tybalt’s anger stand out.', show: 't.1' },
    ]),
    scene('Step 2: Infer his character', [quote('p', ['[[bad:I hate the word]],', 'As I hate hell, [[bad:all Montagues]], and thee:', '[[bad:Have at thee, coward!]]']), text('a', 'Quick to fight, full of **hatred** → **A**', 'lg')], [
      { say: 'Step two. He hates peace as much as hell. He hates all Montagues, not just one. And he attacks at once.', show: 'p' },
      { say: 'So Tybalt is hot-tempered and full of hatred for the Montagues. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['Later, Tybalt **kills** Mercutio', 'Let us check. Later in the play, Tybalt kills Romeo’s friend Mercutio in another fight.'],
    ['His **anger** drives the tragedy', 'His anger helps drive the tragedy. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '**Benvolio** wants peace; Tybalt **hates** it', 'Choice B is the trap. Someone here wants peace, but it is Benvolio, not Tybalt.'],
      ['C', '*Have at thee*: he **attacks**', 'Choice C: have at thee means he attacks.'],
      ['D', 'He understands, and **rejects** it', 'Choice D: he understands Benvolio perfectly, and rejects peace.'],
    ],
  },
  yourTurn: {
    prompt: 'Friar Laurence agrees to marry Romeo and Juliet in secret. What is his **motive**?',
    choices: ['He wants money.', 'He hopes the marriage will end the feud.', 'Lord Capulet asked him to.', 'He wants Juliet to marry Paris.'],
    answer: 1,
    working: '*this alliance may so happy prove, / To turn your households’ rancour to pure love*.',
    ask: 'Friar Laurence agrees to marry Romeo and Juliet in secret. What is his motive? A: He wants money. B: He hopes the marriage will end the feud. C: Lord Capulet asked him to. D: He wants Juliet to marry Paris.',
    reveal: 'The answer is B. He says the marriage may turn the households’ rancour, their bitter hatred, into pure love.',
  },
  sum: [
    ['Infer character from **words** and **actions**', 'Here is what to remember. Infer character from words and actions.'],
    ['Use **foils** to see contrasts', 'Use foils to see the contrasts.'],
    ['Back each inference with a **quotation**', 'And back each inference with a quotation. For more on character and motive, watch this lesson’s explainer video on Gradileo.'],
  ],
});
