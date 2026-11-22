import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 1.3 (critical lenses). An exam-style question we wrote, in the style of a
// Grade 12 reading test, on Charles Dickens's Hard Times (1854), which is in the public domain. The
// answer is D: a reading about factory owners' profit and workers' lives uses the economic (Marxist) lens.

const LINES = ['It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled.'];

export default englishExam({
  lesson: 'e12-1-3',
  ...ours('a Grade 12 reading test', 'the novel is Charles Dickens’s Hard Times (1854), in the public domain'),
  title: 'Which Critical Lens Fits This Reading of Hard Times?',
  thumbnailTitle: 'Critical Lenses',
  subtitle: 'Reading through a lens, step by step',
  summary:
    'An exam-style question on Charles Dickens’s Hard Times, solved one small step at a time. A student reads the smoky factory town of Coketown in a particular way. We find the key ideas in the reading and match them to the right critical lens.',
  intro: [
    'In this video, we solve an exam-style question about critical lenses. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Dickens’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Charles Dickens, Hard Times (1854), Book 1, Chapter 5, on Coketown',
    say: ['First, read Dickens’s description of Coketown, an industrial town. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled.'],
  },
  question: {
    prompt: 'A student writes: *“Dickens shows a town built for the factory owners’ profit, where the workers must live among endless smoke and machinery.”*<br>Which critical lens is this reading using?',
    text: 'Read the description of Coketown. A student writes: Dickens shows a town built for the factory owners’ profit, where the workers must live among endless smoke and machinery. Which critical lens is this reading using?',
    choices: ['a feminist lens', 'a psychological lens', 'a reader-response lens', 'an economic (Marxist) lens'],
    answer: 3,
    working: '**owners’ profit** vs **workers’** conditions: money, class and labour → **economic (Marxist)** lens.',
    say: [
      'A student writes: Dickens shows a town built for the factory owners’ profit, where the workers must live among endless smoke and machinery. Which critical lens is this reading using?',
      'A: a feminist lens. B: a psychological lens. C: a reader-response lens. D: an economic, or Marxist, lens.',
    ],
  },
  ask: [
    ['We are given a student’s **reading**', 'We are given a student’s reading of the passage.'],
    ['Which **lens** does it use?', 'We need to name the lens it uses.'],
  ],
  know: {
    title: 'Five critical lenses',
    md: 'A **lens** is a way of reading that asks particular questions. **Historical**: how does the text reflect its time? **Feminist**: how are women and gender roles shown? **Psychological**: what hidden fears and desires drive characters? **Economic (Marxist)**: who has money and power, and who works for them? **Reader-response**: how do different readers make meaning from the text?',
    say: [
      'Here is the idea we need. A lens is a way of reading that asks particular questions. A historical lens asks how the text reflects its time. A feminist lens asks how women and gender roles are shown. A psychological lens looks for the hidden fears and desires that drive characters.',
      'An economic, or Marxist, lens asks who has money and power, and who works for them. And a reader-response lens asks how different readers make meaning from the text.',
    ],
  },
  plan: [
    ['Find the **key ideas** in the reading', 'Here is the plan. First, find the key ideas in the student’s reading.'],
    ['Match them to a **lens**', 'Second, match them to a lens.'],
    ['Check against the **passage**', 'Third, check against the passage.'],
  ],
  steps: [
    scene('Step 1: Key ideas', [table('t', ['In the reading', 'Idea'], [['*factory **owners’ profit***', '**money** and **ownership**'], ['*the **workers** must live…*', '**labour** and **class**'], ['*endless smoke and machinery*', 'the **cost** to workers']])], [
      { say: 'Step one. Factory owners’ profit is about money and ownership.', show: 't.0' },
      { say: 'The workers must live among the smoke. That is about labour and class, and what the system costs those at the bottom.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Match the lens', [table('m', ['Lens', 'Its question'], [['feminist', 'gender roles?'], ['psychological', 'hidden desires?'], ['[[good:economic (Marxist)]]', '[[good:who profits, who works?]]']]), text('a', 'Owners vs workers → **economic (Marxist)** → **D**', 'lg')], [
      { say: 'Step two. The reading says nothing about gender, or about a character’s hidden desires.', show: ['m.0', 'm.1'] },
      { say: 'It asks who profits and who works. That is the economic, or Marxist, lens. The answer is D.', show: ['m.2', 'a'], focus: 'm.2' },
    ]),
  ],
  check: [
    ['The passage supports it: **machinery**, **chimneys**, **smoke**', 'Let us check. The passage supports this reading: machinery, tall chimneys, endless smoke.'],
    ['an industrial town built around **work**', 'It is a town built around industrial work. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Every reading is a reader’s, but this one asks about **class**', 'Choice C is the trap. Every reading comes from a reader, but this one asks about money and class, not about how readers respond.'],
      ['A', 'No mention of **gender**', 'Choice A: the reading does not mention gender.'],
      ['B', 'No character’s **mind** is explored', 'Choice B: it explores no character’s mind.'],
    ],
  },
  yourTurn: {
    prompt: 'A reading focuses on the hidden fears and desires that drive a character’s choices. Which lens is it using?',
    choices: ['historical', 'economic', 'psychological', 'reader-response'],
    answer: 2,
    working: 'Hidden **fears** and **desires**: the **psychological** lens.',
    ask: 'A reading focuses on the hidden fears and desires that drive a character’s choices. Which lens is it using? A: historical. B: economic. C: psychological. D: reader-response.',
    reveal: 'The answer is C, the psychological lens. It looks at the mind beneath a character’s actions.',
  },
  sum: [
    ['Each lens asks its **own** question', 'Here is what to remember. Each lens asks its own question.'],
    ['Economic: **who profits, who works?**', 'The economic lens asks who profits and who works.'],
    ['Match the reading’s **key ideas** to the lens', 'So match the reading’s key ideas to the lens. For more on critical lenses, watch this lesson’s explainer video on Gradileo.'],
  ],
});
