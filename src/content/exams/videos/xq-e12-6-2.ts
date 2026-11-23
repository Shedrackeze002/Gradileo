import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 6.2 (the comparative literary essay). An exam-style writing question we wrote,
// in the style of a Grade 12 writing test, about Rupert Brooke's "The Soldier" and Wilfred Owen's "Dulce et
// Decorum Est" (both in the public domain). The answer is D: it shows something that only the comparison
// reveals.

export default englishExam({
  lesson: 'e12-6-2',
  ...ours('a Grade 12 writing test'),
  title: 'Which Comparative Thesis Reveals the Most?',
  thumbnailTitle: 'The Comparative Essay',
  subtitle: 'Comparing two poems, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time. A student is comparing two First World War poems, Rupert Brooke’s “The Soldier” and Wilfred Owen’s “Dulce et Decorum Est”. We test four comparative theses and find the one that shows something neither poem shows alone.',
  intro: [
    'In this video, we solve an exam-style writing question about the comparative essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 writing test.',
  ],
  question: {
    prompt: 'A student is comparing Brooke’s *“The Soldier”* (a peaceful grave that is *“for ever England”*) with Owen’s *“Dulce et Decorum Est”* (a soldier dying in a gas attack). Which **comparative thesis** is strongest?',
    text: 'A student is comparing Brooke’s The Soldier, a peaceful grave that is for ever England, with Owen’s Dulce et Decorum Est, a soldier dying in a gas attack. Which comparative thesis is strongest?',
    choices: [
      'Both poems are about the First World War.',
      'Owen’s poem is better than Brooke’s.',
      'Brooke uses a sonnet, and Owen uses a different form.',
      'Read together, Brooke’s peaceful English grave and Owen’s choking soldier show how the trenches turned war poetry from patriotic comfort into bitter witness.',
    ],
    answer: 3,
    working: 'D uses **both** poems to show a **change** neither shows **alone**: from **comfort** to **witness**.',
    say: [
      'A student is comparing Brooke’s The Soldier, a peaceful grave that is for ever England, with Owen’s Dulce et Decorum Est, a soldier dying in a gas attack. Which comparative thesis is strongest?',
      'A: Both poems are about the First World War. B: Owen’s poem is better than Brooke’s. C: Brooke uses a sonnet, and Owen uses a different form. D: Read together, Brooke’s peaceful English grave and Owen’s choking soldier show how the trenches turned war poetry from patriotic comfort into bitter witness.',
    ],
  },
  ask: [
    ['Two poems, one **essay**', 'We have two poems and one essay.'],
    ['Which thesis is **strongest**?', 'We need the strongest comparative thesis.'],
  ],
  know: {
    title: 'The comparative essay',
    md: 'A strong comparative thesis does more than list **similarities** and **differences**. It makes an **argument** that the **comparison itself** reveals: something we see only when the texts sit **side by side**. Link the texts in every paragraph with words like **whereas**, **while**, **similarly** and **in contrast**, and avoid simply **ranking** them.',
    say: [
      'Here is the idea we need. A strong comparative thesis does more than list similarities and differences. It makes an argument that the comparison itself reveals, something we see only when the texts sit side by side.',
      'Link the texts in every paragraph, with words like whereas, while, similarly and in contrast, and avoid simply ranking one above the other.',
    ],
  },
  plan: [
    ['Remove the **obvious**', 'Here is the plan. First, remove the obvious.'],
    ['Remove **ranking** and **listing**', 'Second, remove ranking and listing.'],
    ['Find what the **comparison** reveals', 'Third, find what the comparison reveals.'],
  ],
  steps: [
    scene('Step 1: Test each one', [table('t', ['Thesis', 'Problem'], [['A: *both about the war*', '[[bad:obvious]]: a shared topic'], ['B: *Owen’s is better*', '[[bad:a ranking]], not an analysis'], ['C: *a sonnet… a different form*', '[[bad:a list]]: so what?']])], [
      { say: 'Step one. A, both poems are about the war, is obvious. It is a shared topic, not an argument.', show: 't.0' },
      { say: 'B, Owen’s poem is better, simply ranks them. And C lists a difference in form without saying what it shows.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: What the pair reveals', [table('r', ['Brooke', 'Owen'], [['peaceful grave', 'choking soldier'], ['**patriotic comfort**', '**bitter witness**']]), text('w', 'Together they show a **change** in war poetry'), text('a', 'Only the comparison reveals it → **D**', 'lg')], [
      { say: 'Step two. Brooke, early in the war, gives patriotic comfort: a peaceful grave. Owen, from the trenches, gives bitter witness: a choking soldier.', show: ['r.0', 'r.1'] },
      { say: 'Side by side, they show how the war changed what poets could write. Neither poem shows that change alone.', show: 'w' },
      { say: 'So D is the strongest comparative thesis. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['D is **arguable**: someone could dispute *turned*', 'Let us check. D is arguable. Someone could dispute whether the trenches really turned war poetry.'],
    ['and it **needs** both poems', 'And it needs both poems to work. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'A real difference, but **no argument**', 'Choice C is the trap. It names a real difference, but makes no argument about what it shows.'],
      ['A', 'Too **obvious** to argue', 'Choice A is too obvious to argue.'],
      ['B', '**Ranking** is not analysis', 'Choice B: ranking is not analysis.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word best signals a **contrast** between two texts in a comparative essay?',
    choices: ['similarly', 'whereas', 'also', 'likewise'],
    answer: 1,
    working: '*whereas* sets two ideas **against** each other.',
    ask: 'Which word best signals a contrast between two texts in a comparative essay? A: similarly. B: whereas. C: also. D: likewise.',
    reveal: 'The answer is B, whereas. The others all signal likeness.',
  },
  sum: [
    ['A comparative thesis reveals what **neither text** shows alone', 'Here is what to remember. A comparative thesis reveals what neither text shows alone.'],
    ['Avoid **listing** and **ranking**', 'Avoid listing and ranking.'],
    ['Link the texts with **whereas**, **while**, **in contrast**', 'And link the texts with words like whereas, while and in contrast. For more on the comparative literary essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
