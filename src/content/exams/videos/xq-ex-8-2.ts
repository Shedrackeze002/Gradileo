import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 8.2 (Power and Conflict: My Last Duchess, The Charge of the Light Brigade and
// Exposure). An exam-style question we wrote, in the style of a GCSE English Literature exam, on Wilfred
// Owen's "Exposure" (published 1920), which is in the public domain. The answer is A: the refrain stresses
// the futility of the soldiers' suffering, with the weather as the real enemy.

const POEM = ['Our brains ache, in the merciless iced east winds that knive us…<br>Wearied we keep awake because the night is silent…', 'But nothing happens.'];

export default englishExam({
  lesson: 'ex-8-2',
  ...ours('a GCSE English Literature exam', 'the poem is Wilfred Owen’s “Exposure” (published 1920), in the public domain'),
  title: 'Why Does Owen Repeat “But Nothing Happens” in Exposure?',
  thumbnailTitle: 'Exposure',
  subtitle: 'The refrain and its effect, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Wilfred Owen’s “Exposure”. Soldiers wait through a freezing night in the trenches. We look at what attacks them, and explain the effect of the line that ends almost every stanza.',
  intro: [
    'In this video, we solve an exam-style question about Exposure. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Owen’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Wilfred Owen, “Exposure” (published 1920), lines 1 to 2 and the refrain',
    say: [
      'First, the context. Owen fought in the First World War. Here, soldiers wait through a winter night in the trenches. Our brains ache, in the merciless iced east winds that knive us. Wearied we keep awake because the night is silent.',
      'And the line that ends almost every stanza: But nothing happens.',
    ],
  },
  question: {
    prompt: 'What is the main **effect** of the repeated line *“But nothing happens”*?',
    text: 'Read the lines from Exposure. What is the main effect of the repeated line But nothing happens?',
    choices: [
      'It stresses the futility of the soldiers’ suffering: they freeze while they wait, and the weather is the real enemy.',
      'It shows the soldiers are relaxed and safe.',
      'It tells the reader the war has ended.',
      'It builds excitement for a great battle at the end.',
    ],
    answer: 0,
    working: '*merciless iced east winds that **knive** us* = the **weather** attacks; *nothing happens* = **waiting**, **futility**.',
    say: [
      'What is the main effect of the repeated line, but nothing happens?',
      'A: It stresses the futility of the soldiers’ suffering: they freeze while they wait, and the weather is the real enemy. B: It shows the soldiers are relaxed and safe. C: It tells the reader the war has ended. D: It builds excitement for a great battle at the end.',
    ],
  },
  ask: [
    ['A line **repeated** through the poem', 'A line is repeated through the poem.'],
    ['What is its **effect**?', 'We need its effect.'],
  ],
  know: {
    title: 'My Last Duchess, The Charge and Exposure',
    md: '**My Last Duchess** (Browning): a duke’s monologue reveals he had his wife killed: **power** and **control**. **The Charge of the Light Brigade** (Tennyson): soldiers obey a mistaken order and ride to their deaths, praised for their **duty** and **honour**. **Exposure** (Owen): soldiers in the trenches suffer and die from the **cold**; the poem shows the **futility** of war. A **refrain** is a line repeated through a poem.',
    say: [
      'Here is the idea we need. In My Last Duchess, by Browning, a duke’s monologue reveals that he had his wife killed: a poem about power and control. In The Charge of the Light Brigade, by Tennyson, soldiers obey a mistaken order and ride to their deaths, praised for their duty and honour.',
      'In Exposure, by Owen, soldiers in the trenches suffer and die from the cold, and the poem shows the futility of war. And a refrain is a line repeated through a poem.',
    ],
  },
  plan: [
    ['What **attacks** the soldiers?', 'Here is the plan. First, what attacks the soldiers?'],
    ['What does the refrain **say**?', 'Second, what does the refrain say?'],
    ['What is its **effect**?', 'Third, what is its effect?'],
  ],
  steps: [
    scene('Step 1: The real enemy', [quote('p', ['Our brains ache, in the [[bad:merciless iced east winds]] that [[bad:knive]] us…']), table('t', ['Words', 'Effect'], [['*merciless*', 'the wind is **cruel**, like an enemy'], ['*knive us*', 'the cold **stabs**, like a weapon'], ['*Wearied we keep awake*', '**exhausted**, waiting']])], [
      { say: 'Step one. The merciless iced east winds knive us. The wind is personified as cruel, and the cold stabs like a knife.', show: ['p', 't.0', 't.1'] },
      { say: 'Wearied, they keep awake, waiting. The enemy attacking them is the weather.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The refrain', [text('r', '*But **nothing happens**.*: short, flat, **repeated**'), text('e', 'They **suffer** and **die**, yet **nothing** changes: **futility**'), text('a', '**A**', 'lg')], [
      { say: 'Step two. After each stanza of suffering comes the short, flat line: but nothing happens.', show: 'r' },
      { say: 'The soldiers freeze and die, yet nothing changes. The refrain stresses the futility of their suffering. The answer is A.', show: ['e', 'a'] },
    ]),
  ],
  check: [
    ['The poem **ends** on *But nothing happens*', 'Let us check. The poem ends on the same line, after soldiers have frozen to death.'],
    ['so even death is **nothing**: futility', 'So even death counts as nothing happening. A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'We **expect** a battle, but it **never** comes', 'Choice D is the trap. Repetition can build tension, and we expect a battle, but it never comes.'],
      ['B', 'They are **freezing** and **exhausted**', 'Choice B: they are freezing and exhausted, not relaxed.'],
      ['C', 'The war goes **on**', 'Choice C: the war goes on.'],
    ],
  },
  yourTurn: {
    prompt: 'The lines *“Theirs not to reason why, / Theirs but to do and die”* come from which poem?',
    choices: ['Exposure', 'The Charge of the Light Brigade', 'My Last Duchess', 'London'],
    answer: 1,
    working: 'Soldiers **obey** without question: **The Charge of the Light Brigade**.',
    ask: 'The lines, theirs not to reason why, theirs but to do and die, come from which poem? A: Exposure. B: The Charge of the Light Brigade. C: My Last Duchess. D: London.',
    reveal: 'The answer is B, The Charge of the Light Brigade. Tennyson praises the soldiers’ duty to obey, even an order that sends them to die.',
  },
  sum: [
    ['Exposure: the **weather** is the enemy', 'Here is what to remember. In Exposure, the weather is the real enemy.'],
    ['The refrain stresses **futility**', 'The refrain, but nothing happens, stresses futility.'],
    ['Compare: Tennyson’s **duty**, Owen’s **suffering**', 'And compare Tennyson’s praise of duty with Owen’s suffering. For more on these Power and Conflict poems, watch this lesson’s explainer video on Gradileo.'],
  ],
});
