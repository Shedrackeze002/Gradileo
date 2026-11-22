import { englishExam, ours, scene, table } from '../english.ts';

// Grade 8 English, lesson 7.2 (the literary paragraph). An exam-style question we wrote, in the style
// of a Grade 8 writing test, using a line from Charles Dickens's A Christmas Carol (1843), which is in
// the public domain. The answer is C: the quotation is woven into the writer's own sentence and then
// analysed.

export default englishExam({
  lesson: 'e8-7-2',
  ...ours('a Grade 8 writing test', 'the quoted words are from Charles Dickens’s A Christmas Carol (1843), in the public domain'),
  title: 'Which Sentence Embeds the Quotation Best?',
  thumbnailTitle: 'Embedding Quotations',
  subtitle: 'Using quotations in a literary paragraph, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student writing about Scrooge wants to use Dickens’s phrase “solitary as an oyster”. We learn how to embed a short quotation in our own sentence, test four versions, and choose the one that blends it in and explains it.',
  intro: [
    'In this video, we solve an exam-style writing question about using quotations in a literary paragraph. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 writing test, using a phrase from Dickens’s A Christmas Carol, which is in the public domain.',
  ],
  question: {
    prompt: 'A student is writing about Scrooge in *A Christmas Carol*. Which sentence **embeds** the quotation **“solitary as an oyster”** best?',
    text: 'A student is writing about Scrooge in A Christmas Carol. Which sentence embeds the quotation “solitary as an oyster” best?',
    choices: [
      '“Solitary as an oyster.” This is a quote about Scrooge.',
      'Dickens says “solitary as an oyster”.',
      'Dickens describes Scrooge as “solitary as an oyster”, suggesting he has shut himself away from others inside a hard shell.',
      'Scrooge is an oyster.',
    ],
    answer: 2,
    working: 'C **weaves** the quotation into the writer’s own sentence, then **analyses** it.',
    say: [
      'A student is writing about Scrooge in A Christmas Carol. Which sentence embeds the quotation, solitary as an oyster, best?',
      'A: Solitary as an oyster. This is a quote about Scrooge. B: Dickens says solitary as an oyster. C: Dickens describes Scrooge as solitary as an oyster, suggesting he has shut himself away from others inside a hard shell. D: Scrooge is an oyster.',
    ],
  },
  ask: [
    ['**Embedding** means blending a quotation into **your own** sentence', 'Embedding means blending a quotation smoothly into your own sentence.'],
    ['Which version does it **best**?', 'We need the version that does it best.'],
  ],
  know: {
    title: 'Embedding quotations',
    md: 'Embed **short** quotations inside your **own sentence**, so it reads smoothly (*Dickens describes Scrooge as “…”*). Do not drop a quotation in **alone**. Always follow it with **analysis**, explaining **what** the words suggest and **why**, rather than just **summarising** the plot.',
    say: [
      'Here is the idea we need. Embed short quotations inside your own sentence, so it reads smoothly, as in, Dickens describes Scrooge as, and then the quotation.',
      'Do not drop a quotation in on its own. And always follow it with analysis, explaining what the words suggest and why, rather than just summarising the plot.',
    ],
  },
  plan: [
    ['Is the quotation **inside** the writer’s own sentence?', 'Here is the plan. First, is the quotation inside the writer’s own sentence?'],
    ['Is it followed by **analysis**?', 'Second, is it followed by analysis?'],
  ],
  steps: [
    scene('Step 1: Test each version', [table('t', ['Version', 'Embedded?', 'Analysed?'], [['A', '[[bad:✗ dropped in alone]]', '[[bad:✗ “a quote about Scrooge”]]'], ['B', '[[good:✓]]', '[[bad:✗ stops there]]'], ['C', '[[good:✓]]', '[[good:✓ shut away inside a hard shell]]'], ['D', '[[bad:✗ not quoted at all]]', '[[bad:✗ too literal]]']])], [
      { say: 'Step one. A drops the quotation in on its own, then says it is a quote about Scrooge. That adds nothing.', show: 't.0' },
      { say: 'B embeds it, but stops there. There is no analysis.', show: 't.1' },
      { say: 'D does not quote at all, and takes the image literally.', show: 't.3' },
      { say: 'C weaves the quotation into the sentence, then explains what it suggests: Scrooge has shut himself away inside a hard shell. The answer is C.', show: 't.2', focus: 't.2' },
    ]),
  ],
  check: [
    ['C reads as **one** smooth sentence', 'Let us check. C reads as one smooth sentence.'],
    ['and the word **suggesting** leads into analysis', 'And the word suggesting leads straight into analysis. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Embedded, but **no analysis**', 'Choice B is the trap. It embeds the quotation neatly, but never explains it.'],
      ['A', 'A **dropped** quotation', 'Choice A is a dropped quotation.'],
      ['D', 'Takes the image **literally**', 'Choice D takes the image literally.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence gives **analysis** rather than **summary**?',
    choices: ['Scrooge works in a counting-house.', 'The repeated verbs “squeezing, wrenching, grasping” make Scrooge’s greed feel physical and violent.', 'Then Scrooge goes home.', 'Scrooge meets a ghost.'],
    answer: 1,
    working: 'B explains **how** the words create an **effect**.',
    ask: 'Which sentence gives analysis rather than summary? A: Scrooge works in a counting-house. B: The repeated verbs squeezing, wrenching, grasping make Scrooge’s greed feel physical and violent. C: Then Scrooge goes home. D: Scrooge meets a ghost.',
    reveal: 'The answer is B. It explains how Dickens’s words create an effect. The others just retell what happens.',
  },
  sum: [
    ['**Embed** short quotations in **your own** sentence', 'Here is what to remember. Embed short quotations in your own sentence.'],
    ['Never **drop** a quotation in alone', 'Never drop a quotation in on its own.'],
    ['Follow it with **analysis**, not summary', 'And follow it with analysis, not summary. For more on the literary paragraph, watch this lesson’s explainer video on Gradileo.'],
  ],
});
