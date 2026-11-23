import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 7.1 (Much Ado About Nothing). An exam-style question we wrote, in the style of
// a GCSE English Literature exam, on William Shakespeare's Much Ado About Nothing (about 1599), which is in
// the public domain. The answer is D: Beatrice's witty scorn shows her independence and her mockery of
// romantic love.

const LINES = ['**Beatrice:** I had rather hear my dog bark at a crow than a man swear he loves me.'];

export default englishExam({
  lesson: 'ex-7-1',
  ...ours('a GCSE English Literature exam', 'the play is William Shakespeare’s Much Ado About Nothing (about 1599), in the public domain'),
  title: 'What Does Beatrice’s Dog and Crow Line Show?',
  thumbnailTitle: 'Much Ado About Nothing',
  subtitle: 'Beatrice’s wit, step by step',
  summary:
    'An exam-style question on Much Ado About Nothing, solved one small step at a time. In the first scene, Beatrice trades insults with Benedick. We picture her comparison, see what she prefers to a declaration of love, and explain what it shows about her.',
  intro: [
    'In this video, we solve an exam-style question about Much Ado About Nothing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Much Ado About Nothing, Act 1, Scene 1',
    say: ['First, the context. Beatrice and Benedick are old sparring partners, always mocking each other. Beatrice says: I had rather hear my dog bark at a crow than a man swear he loves me.'],
  },
  question: {
    prompt: 'What does this line mainly show about **Beatrice**?',
    text: 'Read Beatrice’s line from Act 1. What does this line mainly show about Beatrice?',
    choices: [
      'She loves animals more than people.',
      'She is secretly engaged to Benedick.',
      'She is shy and quiet in company.',
      'She is witty and independent, and mocks the idea of romantic love.',
    ],
    answer: 3,
    working: 'A **dog barking at a crow** (pointless noise) is **better** than a lover’s vow → she **scorns** romance, **wittily**.',
    say: [
      'What does this line mainly show about Beatrice?',
      'A: She loves animals more than people. B: She is secretly engaged to Benedick. C: She is shy and quiet in company. D: She is witty and independent, and mocks the idea of romantic love.',
    ],
  },
  ask: [
    ['Beatrice makes a **comparison**', 'Beatrice makes a comparison.'],
    ['What does it show about **her**?', 'We need to say what it shows about her.'],
  ],
  know: {
    title: 'Much Ado About Nothing',
    md: 'Soldiers return to **Messina**. **Claudio** falls for **Hero**, but the villain **Don John** tricks him into believing she is unfaithful, and Claudio shames her at their wedding. Meanwhile, friends trick the quarrelling **Beatrice** and **Benedick** into falling in love. The truth is uncovered by the comic constable **Dogberry**, and the play ends in a double wedding. Themes: **love**, **deception**, **honour** and **gender**.',
    say: [
      'Here is the idea we need. Soldiers return to Messina. Claudio falls for Hero, but the villain Don John tricks him into believing she is unfaithful, and Claudio shames her at their wedding. Meanwhile, friends trick the quarrelling Beatrice and Benedick into falling in love.',
      'The truth is uncovered by the comic constable Dogberry, and the play ends in a double wedding. The themes include love, deception, honour and gender.',
    ],
  },
  plan: [
    ['Picture the **comparison**', 'Here is the plan. First, picture the comparison.'],
    ['What does she **prefer**?', 'Second, what does she prefer?'],
    ['What does that **show**?', 'Third, what does that show?'],
  ],
  steps: [
    scene('Step 1: The comparison', [table('t', ['Image', 'Suggests'], [['a **dog barking at a crow**', 'pointless, **annoying** noise'], ['a man **swearing** he loves her', 'a romantic **vow**']]), text('n', 'She would **rather** hear the barking')], [
      { say: 'Step one. Picture a dog barking at a crow. It is loud, pointless noise.', show: 't.0' },
      { say: 'Against that, a man swearing he loves her. And she would rather hear the barking.', show: ['t.1', 'n'] },
    ]),
    scene('Step 2: What it shows', [quote('p', ['I had rather hear my [[theta:dog bark at a crow]] than a man [[bad:swear he loves me]].']), text('a', '**Witty**, **independent**, scornful of romance → **D**', 'lg')], [
      { say: 'Step two. To Beatrice, a lover’s vow is even more pointless than a barking dog. It is a sharp, funny put-down.', show: 'p' },
      { say: 'It shows she is witty and independent, and mocks romantic love. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Her wit **matches** Benedick’s: a **merry war**', 'Let us check. Her wit matches Benedick’s. The play calls their quarrel a merry war.'],
    ['which makes their later love **ironic**', 'Which makes their later love ironic. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The dog is a **joke**, not a preference', 'Choice A is the trap. She mentions her dog, but it is a joke about love, not about animals.'],
      ['B', 'She **mocks** Benedick at this point', 'Choice B: at this point she mocks Benedick.'],
      ['C', 'She is **outspoken**, not shy', 'Choice C: she is outspoken, not shy.'],
    ],
  },
  yourTurn: {
    prompt: 'Who is tricked by Don John into believing that **Hero** is unfaithful?',
    choices: ['Claudio', 'Benedick', 'Leonato', 'Dogberry'],
    answer: 0,
    working: '**Claudio**, Hero’s bridegroom.',
    ask: 'Who is tricked by Don John into believing that Hero is unfaithful? A: Claudio. B: Benedick. C: Leonato. D: Dogberry.',
    reveal: 'The answer is A, Claudio. He believes the trick, and shames Hero at their wedding.',
  },
  sum: [
    ['Beatrice is **witty** and **independent**', 'Here is what to remember. Beatrice is witty and independent.'],
    ['She **mocks** romantic love, at first', 'At first, she mocks romantic love.'],
    ['Themes: **love**, **deception**, **honour**', 'And the play’s themes include love, deception and honour. For more on Much Ado About Nothing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
