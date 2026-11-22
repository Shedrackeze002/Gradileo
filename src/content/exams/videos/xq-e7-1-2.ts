import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 1.2 (characterization). An exam-style question we wrote, in the style of a
// Grade 7 reading test, on Charles Dickens's description of Scrooge in A Christmas Carol (1843), which
// is in the public domain. The answer is B: every verb is about grabbing and holding on to things.

const PASSAGE = [
  'Oh! But he was a tight-fisted hand at the grindstone, Scrooge! a squeezing, wrenching, grasping, scraping, clutching, covetous, old sinner! Hard and sharp as flint, from which no steel had ever struck out generous fire; secret, and self-contained, and solitary as an oyster.',
];

export default englishExam({
  lesson: 'e7-1-2',
  ...ours('a Grade 7 reading test', 'the passage is from Charles Dickens’s A Christmas Carol (1843), in the public domain'),
  title: 'What Does Dickens’s Description Show About Scrooge?',
  thumbnailTitle: 'Characterization',
  subtitle: 'Inferring character from words, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time, on Charles Dickens’s famous description of Scrooge in A Christmas Carol. We sort direct from indirect characterization, group the describing words, and infer the trait they all point to.',
  intro: [
    'In this video, we solve an exam-style reading question about characterization, how writers show us what a character is like. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test, on a passage from Charles Dickens’s A Christmas Carol, which is in the public domain.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'Charles Dickens, A Christmas Carol (1843)',
    say: [
      'First, read the passage. Oh! But he was a tight-fisted hand at the grindstone, Scrooge! a squeezing, wrenching, grasping, scraping, clutching, covetous, old sinner!',
      'Hard and sharp as flint, from which no steel had ever struck out generous fire; secret, and self-contained, and solitary as an oyster.',
    ],
  },
  question: {
    prompt: 'Which trait does this description **mainly** show about Scrooge?',
    text: 'Read the description of Scrooge from A Christmas Carol. Which trait does this description mainly show about Scrooge?',
    choices: ['He is brave.', 'He is greedy and mean with money.', 'He is cheerful and friendly.', 'He is forgetful.'],
    answer: 1,
    working: '*tight-fisted*, *grasping*, *clutching*, *covetous*: every word is about **grabbing and keeping**.',
    say: ['Which trait does this description mainly show about Scrooge? A: He is brave. B: He is greedy and mean with money. C: He is cheerful and friendly. D: He is forgetful.'],
  },
  ask: [
    ['Dickens piles up **describing words**', 'Dickens piles up describing words about Scrooge.'],
    ['What **trait** do they all point to?', 'We need the one trait they mainly point to.'],
  ],
  know: {
    title: 'Direct and indirect characterization',
    md: '**Direct** characterization tells us a trait outright: *he was mean*. **Indirect** characterization shows it through a character’s **speech**, **thoughts**, **effect on others**, **actions** and **looks**, and through the **images** the writer chooses. We **infer** the trait from the clues.',
    say: [
      'Here is the idea we need. Direct characterization tells us a trait outright, as in he was mean.',
      'Indirect characterization shows it through what a character says, thinks and does, how they look, and how they affect others. Writers also use images. From these clues, we infer the trait.',
    ],
  },
  plan: [
    ['**Group** the describing words', 'Here is the plan. First, group the describing words.'],
    ['Ask what the **images** suggest', 'Second, ask what the images suggest.'],
    ['Name the **trait**', 'Third, name the trait they all point to.'],
  ],
  steps: [
    scene('Step 1: The describing words', [quote('p', ['…a [[bad:tight-fisted]] hand at the grindstone, Scrooge! a [[bad:squeezing]], [[bad:wrenching]], [[bad:grasping]], [[bad:scraping]], [[bad:clutching]], [[bad:covetous]], old sinner!']), text('n', 'Every word is about **grabbing** and **holding on**.')], [
      { say: 'Step one. Pause and look at the words Dickens uses for Scrooge.', show: 'p', wait: 3 },
      { say: 'Tight-fisted means unwilling to spend money. Squeezing, wrenching, grasping, scraping and clutching are all actions of grabbing and holding on. Covetous means wanting what others have.', focus: 'p.0' },
      { say: 'They all point the same way: Scrooge grabs and keeps everything.', show: 'n' },
    ]),
    scene('Step 2: The images', [table('t', ['Image', 'What it suggests'], [['hard and sharp as **flint**', 'cold and **unkind**'], ['no **generous fire**', 'never **gives** anything'], ['solitary as an **oyster**', 'shut away from **others**']])], [
      { say: 'Step two. Hard and sharp as flint, a stone, suggests he is cold and unkind.', show: 't.0' },
      { say: 'No steel had ever struck out generous fire means nothing has ever made him generous.', show: 't.1' },
      { say: 'Solitary as an oyster: shut tight in his shell, away from others.', show: 't.2' },
    ]),
    scene('Step 3: The trait', [text('a', '**B.** Scrooge is **greedy** and **mean with money**.', 'xl')], [
      { say: 'Step three. Together, the words and images show a man who is greedy and mean with money. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['*tight-fisted* and *no generous fire* are about **money** and **giving**', 'Let us check. Tight-fisted and no generous fire are about money and giving.'],
    ['Nothing suggests **bravery**, **cheer** or **forgetting**', 'Nothing in the passage suggests bravery, cheerfulness or forgetfulness. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**Hard** and **sharp** are about coldness, not **courage**', 'Choice A is the trap. Hard and sharp could sound tough, but here they describe a cold heart.'],
      ['C', 'The **opposite** of the description', 'Choice C is the opposite of everything Dickens says.'],
      ['D', 'Nothing about **memory**', 'Choice D has no support in the passage.'],
    ],
  },
  yourTurn: {
    prompt: '*Amara noticed the new boy eating alone. She picked up her tray, walked over and sat beside him.* Which trait do Amara’s **actions** show?',
    choices: ['shyness', 'kindness', 'impatience', 'jealousy'],
    answer: 1,
    working: 'She sees someone alone and **chooses** to join him.',
    ask: 'Amara noticed the new boy eating alone. She picked up her tray, walked over and sat beside him. Which trait do Amara’s actions show? A: shyness. B: kindness. C: impatience. D: jealousy.',
    reveal: 'The answer is B, kindness. The writer never says she is kind, but her actions show it: she notices someone alone and chooses to join him.',
  },
  sum: [
    ['**Direct** characterization tells; **indirect** shows', 'Here is what to remember. Direct characterization tells us a trait, and indirect characterization shows it.'],
    ['Clues: **speech**, **thoughts**, **actions**, **looks**, **images**', 'Look for clues in speech, thoughts, actions, looks and images.'],
    ['Group the clues and **infer** the trait they share', 'Group the clues, and infer the trait they all share. For more on characterization, watch this lesson’s explainer video on Gradileo.'],
  ],
});
