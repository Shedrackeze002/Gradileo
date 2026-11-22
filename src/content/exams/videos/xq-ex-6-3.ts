import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 6.3 (Pride and Prejudice). An exam-style question we wrote, in the style of a
// GCSE English Literature exam, on Jane Austen's Pride and Prejudice (1813), which is in the public domain.
// The answer is C: "In vain have I struggled" shows that Darcy fought against loving Elizabeth, which
// reveals his pride and offends her.

const LINES = ['**Mr Darcy:** In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.'];

export default englishExam({
  lesson: 'ex-6-3',
  ...ours('a GCSE English Literature exam', 'the novel is Jane Austen’s Pride and Prejudice (1813), in the public domain'),
  title: 'Why Does Darcy’s First Proposal Go So Wrong?',
  thumbnailTitle: 'Pride and Prejudice',
  subtitle: 'Darcy’s proposal, step by step',
  summary:
    'An exam-style question on Pride and Prejudice, solved one small step at a time. Mr Darcy surprises Elizabeth Bennet with a proposal. We look at how he begins, what “struggled” tells her, and why his words reveal his pride.',
  intro: [
    'In this video, we solve an exam-style question about Pride and Prejudice. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Austen’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Jane Austen, Pride and Prejudice (1813), Volume 2, Chapter 11',
    say: ['First, the context. Mr Darcy, a rich and proud gentleman, has looked down on Elizabeth Bennet’s family. Suddenly he visits her and says: In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.'],
  },
  question: {
    prompt: 'What does **“In vain have I struggled”** reveal about Darcy?',
    text: 'Read Darcy’s words from Pride and Prejudice. What does In vain have I struggled reveal about Darcy?',
    choices: [
      'He has been ill and is struggling to recover.',
      'He has tried hard to win Elizabeth’s love for many months.',
      'He has fought against loving her because he thinks her family is beneath him, which shows his pride.',
      'He has struggled to find the courage to speak because he is shy.',
    ],
    answer: 2,
    working: '*struggled* **against** his feelings; *will not be **repressed*** = he tried to **crush** them → **pride** about her lower status.',
    say: [
      'What does In vain have I struggled reveal about Darcy?',
      'A: He has been ill and is struggling to recover. B: He has tried hard to win Elizabeth’s love for many months. C: He has fought against loving her because he thinks her family is beneath him, which shows his pride. D: He has struggled to find the courage to speak because he is shy.',
    ],
  },
  ask: [
    ['Darcy says he has **struggled**', 'Darcy begins by saying he has struggled.'],
    ['Struggled **against what**?', 'We need to work out what he struggled against, and what that reveals.'],
  ],
  know: {
    title: 'Pride and Prejudice',
    md: '**Elizabeth Bennet**, the witty second of five daughters, takes a dislike to the proud **Mr Darcy**, and believes lies about him told by **Mr Wickham**. Her sister **Jane** loves Darcy’s friend **Bingley**. Darcy’s first proposal is rejected; his letter explains the truth, and when **Lydia** runs off with Wickham, Darcy quietly saves the family. Themes: **pride**, **prejudice**, **marriage**, **class** and **reputation**.',
    say: [
      'Here is the idea we need. Elizabeth Bennet, the witty second of five daughters, takes a dislike to the proud Mr Darcy, and believes lies about him told by Mr Wickham. Her sister Jane loves Darcy’s friend, Bingley.',
      'Darcy’s first proposal is rejected, but his letter explains the truth, and when Lydia runs off with Wickham, Darcy quietly saves the family. The themes include pride, prejudice, marriage, class and reputation.',
    ],
  },
  plan: [
    ['What did he struggle **against**?', 'Here is the plan. First, what did he struggle against?'],
    ['**Why** would he?', 'Second, why would he?'],
    ['How does Elizabeth **hear** it?', 'Third, how does Elizabeth hear it?'],
  ],
  steps: [
    scene('Step 1: Against his feelings', [table('t', ['Words', 'Meaning'], [['*In vain have I **struggled***', 'I fought, and **failed**'], ['*It will not do*', 'it is no use'], ['*My feelings will not be **repressed***', 'I tried to **crush** my love, and could not']])], [
      { say: 'Step one. In vain have I struggled: he fought, and failed. It will not do: it is no use.', show: ['t.0', 't.1'] },
      { say: 'My feelings will not be repressed. So he was struggling against his own feelings. He tried to crush his love for her.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Why, and the effect', [quote('p', ['[[bad:In vain have I struggled.]] … You must allow me to tell you how ardently I [[good:admire and love]] you.']), text('w', 'Why? He thinks her **family** is **beneath** him'), text('a', 'His proposal shows his **pride**, and **insults** her → **C**', 'lg')], [
      { say: 'Step two. Why would he fight his love? Because he thinks her family, and her lower social position, are beneath him.', show: ['p', 'w'] },
      { say: 'So he begins a proposal by telling her he tried not to love her. It shows his pride, and Elizabeth takes it as an insult. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['He goes on to describe her **inferiority**', 'Let us check. In the full scene, Darcy goes on to speak of her inferiority and her family’s low connections.'],
    ['and Elizabeth **rejects** him', 'And Elizabeth rejects him. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'He struggled **against** loving her, not to win her', 'Choice B is the trap. Struggled sounds like he tried to win her, but he struggled against loving her.'],
      ['A', 'Not about **illness**', 'Choice A: it is not about illness.'],
      ['D', 'Darcy is **proud**, not shy', 'Choice D: Darcy is proud, not shy.'],
    ],
  },
  yourTurn: {
    prompt: 'Whom does **Lydia** Bennet run away with?',
    choices: ['Mr Collins', 'Mr Bingley', 'Mr Wickham', 'Colonel Fitzwilliam'],
    answer: 2,
    working: 'Lydia elopes with **Wickham**.',
    ask: 'Whom does Lydia Bennet run away with? A: Mr Collins. B: Mr Bingley. C: Mr Wickham. D: Colonel Fitzwilliam.',
    reveal: 'The answer is C, Mr Wickham. Their elopement threatens the family’s reputation, until Darcy secretly arranges their marriage.',
  },
  sum: [
    ['*In vain have I struggled*: he fought **against** his love', 'Here is what to remember. In vain have I struggled means he fought against his love.'],
    ['It reveals his **pride** about **class**', 'It reveals his pride about class.'],
    ['Themes: **pride**, **prejudice**, **marriage**', 'And the novel’s themes include pride, prejudice and marriage. For more on Pride and Prejudice, watch this lesson’s explainer video on Gradileo.'],
  ],
});
