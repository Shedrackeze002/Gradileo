import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 3.3 (soliloquies, songs and staging). An exam-style question we wrote, in the
// style of a Grade 9 reading test, on Caliban's speech in William Shakespeare's The Tempest (about
// 1611), which is in the public domain. The answer is A: Caliban, often called a monster, speaks some of
// the most beautiful poetry in the play, showing his deep, sensitive bond with the island.

const LINES = ['**Caliban:** Be not afeard; the isle is full of noises,<br>Sounds and sweet airs, that give delight and hurt not.<br>Sometimes a thousand twangling instruments<br>Will hum about mine ears…'];

export default englishExam({
  lesson: 'e9-3-3',
  ...ours('a Grade 9 reading test', 'the play is William Shakespeare’s The Tempest (about 1611), in the public domain'),
  title: 'What Does Caliban’s “The Isle Is Full of Noises” Reveal?',
  thumbnailTitle: 'Caliban’s Speech',
  subtitle: 'Language, staging and character, step by step',
  summary:
    'An exam-style question on The Tempest, solved one small step at a time: Caliban, whom other characters call a monster, tells two frightened men not to fear the island’s sounds. We look at his gentle words and the music they describe, and explain what the speech reveals about him.',
  intro: [
    'In this video, we solve an exam-style question about one of The Tempest’s most famous speeches. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, The Tempest, Act 3, Scene 2',
    say: ['First, read Caliban’s lines. Other characters call him a monster. Here he speaks to Stephano and Trinculo, who are frightened by music they cannot see. Be not afeard; the isle is full of noises, sounds and sweet airs, that give delight and hurt not. Sometimes a thousand twangling instruments will hum about mine ears.'],
  },
  question: {
    prompt: 'What does this speech **mainly** reveal about Caliban?',
    text: 'Read Caliban’s lines from The Tempest, Act 3. What does this speech mainly reveal about Caliban?',
    choices: [
      'He has a deep, sensitive love for the island’s beauty, which complicates the idea that he is only a monster.',
      'He is terrified of the island.',
      'He wants to leave the island at once.',
      'He is planning to play music for Prospero.',
    ],
    answer: 0,
    working: '*sweet airs*, *delight*, *hurt not*, *hum*: gentle, beautiful **verse** from a character called a **monster**.',
    say: [
      'What does this speech mainly reveal about Caliban?',
      'A: He has a deep, sensitive love for the island’s beauty, which complicates the idea that he is only a monster. B: He is terrified of the island. C: He wants to leave the island at once. D: He is planning to play music for Prospero.',
    ],
  },
  ask: [
    ['Caliban is usually called a **monster**', 'Other characters usually call Caliban a monster.'],
    ['What does **this** speech show?', 'We need to say what this speech reveals about him.'],
  ],
  know: {
    title: 'Speech, song and staging',
    md: 'A **soliloquy** reveals a character’s private thoughts; an **aside** is a quick comment to the audience. **Songs** (Ariel’s) add magic and mood. On Shakespeare’s stage there was little **scenery**, so **language** had to create the island: its **sounds**, **music** and **wonder**. Notice **who** gets the most **beautiful** language.',
    say: [
      'Here is the idea we need. A soliloquy reveals a character’s private thoughts, and an aside is a quick comment to the audience. Ariel’s songs add magic and mood.',
      'Shakespeare’s stage had little scenery, so the language itself had to create the island, its sounds, music and wonder. So notice which characters get the most beautiful language.',
    ],
  },
  plan: [
    ['Look at the **words** he uses', 'Here is the plan. First, look at the words Caliban uses.'],
    ['Compare with how others **see** him', 'Second, compare that with how others see him.'],
    ['Say what it **reveals**', 'Third, say what it reveals.'],
  ],
  steps: [
    scene('Step 1: His words', [quote('p', ['Be not afeard; the isle is full of noises,', '[[good:Sounds and sweet airs]], that give [[good:delight]] and [[good:hurt not]].', 'Sometimes a thousand twangling instruments', 'Will [[good:hum]] about mine ears…']), text('n', 'Gentle, musical **verse**; he **comforts** the frightened men')], [
      { say: 'Step one. Pause and notice the words: sweet airs, delight, hurt not, hum.', show: 'p', wait: 3 },
      { say: 'This is gentle, musical verse. And he is comforting two frightened men: be not afraid.', show: 'n' },
    ]),
    scene('Step 2: The contrast', [table('t', ['Others call him', 'This speech shows'], [['**monster**, **beast**', '[[good:sensitive to beauty]]'], ['savage', '[[good:gentle, **comforting**]]']]), text('a', 'He **loves** the island; he is **more** than a monster → **A**', 'lg')], [
      { say: 'Step two. Others call him a monster and a beast. But here he speaks some of the most beautiful poetry in the play.', show: ['t.0', 't.1'] },
      { say: 'It reveals his deep love for the island, and makes us question whether he is only a monster. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['Shakespeare gives him **verse**, not rough prose, here', 'Let us check. Shakespeare gives Caliban verse here, and some of the play’s loveliest lines.'],
    ['That **complicates** how we see him', 'That complicates how we see him. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'He tells **others** not to be afraid', 'Choice B is the trap. The others are frightened, but Caliban tells them to be not afeard.'],
      ['C', 'He **loves** the island; it was his home', 'Choice C: he loves the island, which he sees as his.'],
      ['D', 'The music is the **island’s**, not his', 'Choice D: the music belongs to the island, not to Caliban.'],
    ],
  },
  yourTurn: {
    prompt: 'Shakespeare’s stage had very little **scenery**. How did the audience learn what the island was like?',
    choices: ['From printed programmes.', 'From painted backdrops of every scene.', 'From the characters’ descriptive language.', 'From films shown before the play.'],
    answer: 2,
    working: 'The **language** painted the scene.',
    ask: 'Shakespeare’s stage had very little scenery. How did the audience learn what the island was like? A: From printed programmes. B: From painted backdrops of every scene. C: From the characters’ descriptive language. D: From films shown before the play.',
    reveal: 'The answer is C. With little scenery, the characters’ descriptions, like Caliban’s speech, painted the island in the audience’s minds.',
  },
  sum: [
    ['Notice **who** gets beautiful language', 'Here is what to remember. Notice which characters get beautiful language.'],
    ['Caliban’s speech shows his **love** for the island', 'Caliban’s speech shows his love for the island.'],
    ['**Language** creates the island on a bare stage', 'And language creates the island on a bare stage. For more on soliloquies, songs and staging, watch this lesson’s explainer video on Gradileo.'],
  ],
});
