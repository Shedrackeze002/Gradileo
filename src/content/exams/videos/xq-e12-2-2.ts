import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 2.2 (poetry of war and witness). An exam-style question we wrote, in the style
// of a Grade 12 reading test, on Wilfred Owen's "Dulce et Decorum Est" (written 1917 to 1918, published
// 1920), which is in the public domain. The answer is A: having witnessed a soldier dying from gas, Owen
// calls the motto that dying for your country is sweet and fitting a lie.

const POEM = ['If you could hear, at every jolt, the blood<br>Come gargling from the froth-corrupted lungs…<br>My friend, you would not tell with such high zest<br>To children ardent for some desperate glory,<br>The old Lie: Dulce et decorum est<br>Pro patria mori.'];

export default englishExam({
  lesson: 'e12-2-2',
  ...ours('a Grade 12 reading test', 'the poem is Wilfred Owen’s “Dulce et Decorum Est” (published 1920), in the public domain'),
  title: 'Why Does Owen Call the Motto “The Old Lie”?',
  thumbnailTitle: 'Poetry of Witness',
  subtitle: 'Poetry of war and witness, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Wilfred Owen’s “Dulce et Decorum Est”. Owen, a soldier in the First World War, describes a man dying in a gas attack. We translate the Latin motto, set it beside what Owen witnessed, and explain why he calls it a lie.',
  intro: [
    'In this video, we solve an exam-style poetry question about the poetry of war and witness. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Owen’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Wilfred Owen, “Dulce et Decorum Est” (published 1920), lines 21 to 22 and 25 to 28',
    say: ['First, the context. Owen fought in the First World War. In this poem, a soldier fails to put on his gas mask in time, and is carried away in a wagon. If you could hear, at every jolt, the blood come gargling from the froth-corrupted lungs, my friend, you would not tell with such high zest to children ardent for some desperate glory, the old Lie: Dulce et decorum est pro patria mori.'],
  },
  question: {
    prompt: 'The Latin motto means *“It is sweet and fitting to die for your country.”* Why does Owen call it **“The old Lie”**?',
    text: 'Read the lines from Dulce et Decorum Est. The Latin motto means, It is sweet and fitting to die for your country. Why does Owen call it the old Lie?',
    choices: [
      'Because what he witnessed shows that death in war is horrifying, neither sweet nor fitting.',
      'Because the Latin has been translated incorrectly.',
      'Because he believes soldiers should never defend their country.',
      'Because the motto is too old for modern readers to understand.',
    ],
    answer: 0,
    working: '*blood… gargling*, *froth-corrupted lungs* = **witnessed horror**; *sweet and fitting* ≠ what he saw → a **lie**.',
    say: [
      'The Latin motto means, it is sweet and fitting to die for your country. Why does Owen call it the old Lie?',
      'A: Because what he witnessed shows that death in war is horrifying, neither sweet nor fitting. B: Because the Latin has been translated incorrectly. C: Because he believes soldiers should never defend their country. D: Because the motto is too old for modern readers to understand.',
    ],
  },
  ask: [
    ['The motto says dying for your country is **sweet**', 'The motto says that dying for your country is sweet and fitting.'],
    ['Why does Owen call it a **lie**?', 'We need to say why Owen calls it a lie.'],
  ],
  know: {
    title: 'Poetry of war and witness',
    md: 'Poets of **witness** write from what they **saw** themselves, so readers cannot look away. Compare war poems by their **form** (regular or broken), **imagery** (heroic or brutal), and **irony** (the gap between what people **say** about war and what **happens**). Many First World War poets turned from **patriotic** praise to **graphic** truth.',
    say: [
      'Here is the idea we need. Poets of witness write from what they saw themselves, so that readers cannot look away. We can compare war poems by their form, regular or broken; their imagery, heroic or brutal; and their irony, the gap between what people say about war and what really happens.',
      'Many First World War poets turned from patriotic praise to graphic truth.',
    ],
  },
  plan: [
    ['Read the **imagery**', 'Here is the plan. First, read the imagery.'],
    ['Set it beside the **motto**', 'Second, set it beside the motto.'],
    ['Explain the **irony**', 'Third, explain the irony.'],
  ],
  steps: [
    scene('Step 1: What he witnessed', [quote('p', ['If you could hear, at every jolt, the [[bad:blood]]', 'Come [[bad:gargling]] from the [[bad:froth-corrupted lungs]]…']), text('n', '**Sound**, **sight**, **body**: brutal, physical detail')], [
      { say: 'Step one. Pause and hear it: blood, gargling, froth-corrupted lungs. Owen makes us hear the dying man at every jolt of the wagon.', show: 'p', wait: 3 },
      { say: 'This is brutal, physical detail, the kind only a witness could give.', show: 'n' },
    ]),
    scene('Step 2: The gap', [table('t', ['The motto says', 'Owen saw'], [['[[good:sweet]]', '[[bad:blood gargling]]'], ['[[good:fitting]]', '[[bad:froth-corrupted lungs]]'], ['told to children *ardent for… glory*', 'a man dying in **agony**']]), text('a', 'The motto hides the **horror** he witnessed → **A**', 'lg')], [
      { say: 'Step two. Set the motto beside what he saw. Sweet, against blood gargling. Fitting, against froth-corrupted lungs.', show: ['t.0', 't.1'] },
      { say: 'And the lie is told to children eager for glory. That gap between the words and the truth is the irony. The answer is A.', show: ['t.2', 'a'] },
    ]),
  ],
  check: [
    ['*If you could hear*: the reader **was not** there', 'Let us check. If you could hear: Owen addresses readers who were not there.'],
    ['his witness **corrects** their belief', 'His witness corrects their belief. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'He attacks the **lie about** war, not soldiers’ duty', 'Choice C is the trap. The poem is angry, but it attacks the lie about war, not soldiers who defend their country.'],
      ['B', 'The **translation** is correct', 'Choice B: the translation is correct.'],
      ['D', 'The problem is **falsehood**, not age', 'Choice D: the problem is that it is false, not that it is old.'],
    ],
  },
  yourTurn: {
    prompt: 'Rupert Brooke’s “The Soldier” (1914) begins: *“If I should die, think only this of me: / That there’s some corner of a foreign field / That is for ever England.”* How does it differ from Owen’s poem?',
    choices: ['Both describe a gas attack in detail.', 'Brooke presents death as noble and peaceful; Owen shows its horror.', 'Owen is more patriotic than Brooke.', 'Brooke’s poem is set in a hospital.'],
    answer: 1,
    working: 'Brooke: **noble**, peaceful grave; Owen: **brutal** death.',
    ask: 'Rupert Brooke’s poem The Soldier begins: If I should die, think only this of me: that there’s some corner of a foreign field that is for ever England. How does it differ from Owen’s poem? A: Both describe a gas attack in detail. B: Brooke presents death as noble and peaceful; Owen shows its horror. C: Owen is more patriotic than Brooke. D: Brooke’s poem is set in a hospital.',
    reveal: 'The answer is B. Brooke, writing early in the war, makes a soldier’s grave a peaceful piece of England. Owen, writing from the trenches, shows the horror.',
  },
  sum: [
    ['Poets of **witness** write what they **saw**', 'Here is what to remember. Poets of witness write what they saw.'],
    ['Irony: the gap between what is **said** and what **happens**', 'Irony is the gap between what is said about war and what happens.'],
    ['Compare **imagery** and **tone** across war poems', 'And compare imagery and tone across war poems. For more on the poetry of war and witness, watch this lesson’s explainer video on Gradileo.'],
  ],
});
