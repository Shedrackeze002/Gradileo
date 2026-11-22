import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 3.1 (The Tempest: plot and characters). An exam-style question we wrote, in
// the style of a Grade 9 reading test, on William Shakespeare's The Tempest (about 1611), which is in
// the public domain. The answer is B: Prospero raises the storm to bring the enemies who stole his
// dukedom to the island, where he has power over them.

const LINES = [
  '**Prospero:** Twelve year since, Miranda, twelve year since,<br>Thy father was the Duke of Milan and<br>A prince of power.',
  '**Prospero:** By accident most strange, bountiful Fortune,<br>Now my dear lady, hath mine enemies<br>Brought to this shore…',
];

export default englishExam({
  lesson: 'e9-3-1',
  ...ours('a Grade 9 reading test', 'the play is William Shakespeare’s The Tempest (about 1611), in the public domain'),
  title: 'Why Does Prospero Raise the Tempest?',
  thumbnailTitle: 'The Tempest',
  subtitle: 'Plot and motive in Act 1, step by step',
  summary:
    'An exam-style question on Shakespeare’s The Tempest, solved one small step at a time: Prospero uses his magic to wreck a ship near his island. We piece together his past from what he tells Miranda, see who is on the ship, and explain his motive.',
  intro: [
    'In this video, we solve an exam-style question about The Tempest. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, The Tempest, Act 1, Scene 2',
    say: [
      'First, read two moments from Act One, where Prospero speaks to his daughter, Miranda. Twelve year since, Miranda, twelve year since, thy father was the Duke of Milan and a prince of power.',
      'And later: By accident most strange, bountiful Fortune, now my dear lady, hath mine enemies brought to this shore.',
    ],
  },
  question: {
    prompt: 'Why does Prospero use his magic to **raise the storm** at the start of the play?',
    text: 'Read the lines from The Tempest, Act 1. Why does Prospero use his magic to raise the storm at the start of the play?',
    choices: [
      'He wants to sink every ship that passes the island.',
      'His enemies, who stole his dukedom, are sailing nearby, and he wants them on his island.',
      'Miranda asked him to make the weather more exciting.',
      'He is testing a new spell for Ariel.',
    ],
    answer: 1,
    working: 'Prospero **was** Duke of Milan; his **enemies** (his brother Antonio and King Alonso) are on the ship, and Fortune has brought them **near**.',
    say: [
      'Why does Prospero use his magic to raise the storm at the start of the play?',
      'A: He wants to sink every ship that passes the island. B: His enemies, who stole his dukedom, are sailing nearby, and he wants them on his island. C: Miranda asked him to make the weather more exciting. D: He is testing a new spell for Ariel.',
    ],
  },
  ask: [
    ['We need Prospero’s **motive**', 'We need Prospero’s motive for the storm.'],
    ['The clue is his **past**', 'The clue is in what he tells Miranda about his past.'],
  ],
  know: {
    title: 'The main plot and the two conspiracies',
    md: 'Twelve years ago, **Prospero**, Duke of Milan, was overthrown by his brother **Antonio**, helped by **Alonso**, King of Naples, and cast out to sea with baby **Miranda**. On the island he commands the spirit **Ariel** and the islander **Caliban**. Two **conspiracies** follow: Antonio and Sebastian plot to kill Alonso, and Caliban plots with Stephano and Trinculo to kill Prospero.',
    say: [
      'Here is the idea we need. Twelve years ago, Prospero, Duke of Milan, was overthrown by his brother Antonio, with help from Alonso, King of Naples, and cast out to sea with his baby daughter, Miranda.',
      'On the island, he commands the spirit Ariel and the islander Caliban. Two plots against people follow: Antonio and Sebastian plan to kill Alonso, and Caliban plans with Stephano and Trinculo to kill Prospero.',
    ],
  },
  plan: [
    ['What **happened** to Prospero?', 'Here is the plan. First, what happened to Prospero?'],
    ['**Who** is on the ship?', 'Second, who is on the ship?'],
    ['What does he **want**?', 'Third, what does he want?'],
  ],
  steps: [
    scene('Step 1: Past and ship', [table('t', ['Clue', 'Meaning'], [['*Thy father **was** the Duke of Milan*', 'he **lost** his dukedom'], ['the **ship**', 'carries **Antonio** and **Alonso**: the men who overthrew him'], ['*Fortune… hath mine enemies / Brought to this shore*', 'a **chance** he may never get again']])], [
      { say: 'Step one. Was the Duke of Milan: he lost his dukedom twelve years ago.', show: 't.0' },
      { say: 'The ship carries Antonio and Alonso, the very men who overthrew him.', show: 't.1' },
      { say: 'And Fortune has brought them close to his island. It is a chance he may never get again.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The motive', [quote('p', ['…hath [[bad:mine enemies]] / Brought to [[theta:this shore]]']), text('a', 'Bring his enemies onto **his** island, where his magic rules → **B**', 'lg')], [
      { say: 'Step two. So Prospero raises the storm to bring his enemies onto his island, where his magic gives him power over them. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['No one actually **drowns**: Ariel brings them **safe** ashore', 'Let us check. No one drowns. Ariel brings everyone safely ashore, so Prospero is not simply destroying ships.'],
    ['He wants them **alive**, and **in his power**', 'He wants them alive, and in his power. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Everyone **survives**: this ship was **chosen**', 'Choice A is the trap. A storm sounds destructive, but this ship was chosen, and everyone survives.'],
      ['C', 'Miranda **begs** him to calm the storm', 'Choice C: Miranda begs him to calm the storm.'],
      ['D', 'Ariel **carries out** the storm; it is no test', 'Choice D: Ariel carries out the storm for Prospero, but it is no test.'],
    ],
  },
  yourTurn: {
    prompt: 'Who plots with Stephano and Trinculo to kill Prospero?',
    choices: ['Caliban', 'Ariel', 'Miranda', 'Ferdinand'],
    answer: 0,
    working: 'Caliban resents Prospero for **taking** the island.',
    ask: 'Who plots with Stephano and Trinculo to kill Prospero? A: Caliban. B: Ariel. C: Miranda. D: Ferdinand.',
    reveal: 'The answer is A, Caliban. He believes the island was his, and resents Prospero for taking it from him.',
  },
  sum: [
    ['Prospero was **overthrown** by Antonio, helped by Alonso', 'Here is what to remember. Prospero was overthrown by his brother Antonio, helped by Alonso.'],
    ['The storm brings his **enemies** into his **power**', 'The storm brings his enemies into his power.'],
    ['Two **conspiracies**: against Alonso, and against Prospero', 'And there are two conspiracies: one against Alonso, and one against Prospero. For more on The Tempest, watch this lesson’s explainer video on Gradileo.'],
  ],
});
