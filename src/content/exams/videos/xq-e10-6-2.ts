import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 6.2 (the analytical essay: thesis, evidence, analysis). An exam-style writing
// question we wrote, in the style of a Grade 10 writing test, about a paragraph on Shelley's
// "Ozymandias" (1818). The answer is D: it explains how the quoted words work and links them to the
// point, which is analysis.

export default englishExam({
  lesson: 'e10-6-2',
  ...ours('a Grade 10 writing test'),
  title: 'Which Sentence Analyses the Quotation?',
  thumbnailTitle: 'Point, Evidence, Analysis',
  subtitle: 'Building an analytical paragraph, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student has written a point and a quotation about Shelley’s “Ozymandias”, and needs the analysis. We learn the point, evidence, analysis pattern, test four sentences, and choose the one that truly analyses.',
  intro: [
    'In this video, we solve an exam-style question about building an analytical paragraph. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 writing test.',
  ],
  question: {
    prompt: 'A student’s paragraph begins:<br>**Point:** *Shelley mocks the king’s pride.* **Evidence:** *The statue’s base commands, “Look on my Works, ye Mighty, and despair!”*<br>Which sentence gives the best **analysis** next?',
    text: 'A student’s paragraph begins. Point: Shelley mocks the king’s pride. Evidence: The statue’s base commands, “Look on my Works, ye Mighty, and despair!” Which sentence gives the best analysis next?',
    choices: [
      'Then the poem says that nothing beside remains.',
      'This quotation comes from line 11 of the poem.',
      'Shelley was an English Romantic poet.',
      'The command “despair” shows the king expected his works to crush every rival, so the empty desert that follows turns his arrogance into a joke.',
    ],
    answer: 3,
    working: 'Analysis **zooms in** on a word (*despair*), explains **how** it works, and **links** back to the point (*mocks… pride*).',
    say: [
      'A student’s paragraph begins. Point: Shelley mocks the king’s pride. Evidence: The statue’s base commands, Look on my Works, ye Mighty, and despair! Which sentence gives the best analysis next?',
      'A: Then the poem says that nothing beside remains. B: This quotation comes from line eleven of the poem. C: Shelley was an English Romantic poet. D: The command despair shows the king expected his works to crush every rival, so the empty desert that follows turns his arrogance into a joke.',
    ],
  },
  ask: [
    ['The paragraph has a **point** and **evidence**', 'The paragraph already has a point and evidence.'],
    ['Which sentence **analyses**?', 'We need the sentence that analyses the evidence.'],
  ],
  know: {
    title: 'Point, evidence, analysis',
    md: 'An analytical paragraph has three parts. **Point**: a topic sentence that supports the **thesis**. **Evidence**: a short, **embedded** quotation. **Analysis**: explain **how** the words create meaning (zoom in on a **word**, **image** or **device**) and **link** back to the point. Analysis answers *how?* and *why?*, never just *what happens?*',
    say: [
      'Here is the idea we need. An analytical paragraph has three parts. The point is a topic sentence that supports the thesis. The evidence is a short quotation, embedded in your sentence.',
      'And the analysis explains how the words create meaning. Zoom in on a word, image or device, and link back to your point. Analysis answers how and why, never just what happens.',
    ],
  },
  plan: [
    ['Test each sentence: **how** or **what**?', 'Here is the plan. First, test whether each sentence explains how, or only says what.'],
    ['Check it **links** to the point', 'Second, check that it links back to the point.'],
  ],
  steps: [
    scene('Step 1: How or what?', [table('t', ['Choice', 'What it does', 'Analysis?'], [['A', 'adds more **plot**', '[[bad:✗ summary]]'], ['B', 'gives a **line number**', '[[bad:✗ a fact]]'], ['C', 'gives the **poet’s** background', '[[bad:✗ context only]]'], ['D', 'explains **how** *despair* works', '[[good:✓]]']])], [
      { say: 'Step one. A adds more of what happens. That is summary. B gives a line number, and C gives the poet’s background. Neither explains the quotation.', show: ['t.0', 't.1', 't.2'] },
      { say: 'D zooms in on one word, despair, and explains how it works.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: Does it link to the point?', [quote('p', ['The command “[[theta:despair]]” shows the king [[good:expected his works to crush every rival]], so the empty desert that follows [[good:turns his arrogance into a joke]].']), text('a', 'Explains **how** and links to **mocks his pride** → **D**', 'lg')], [
      { say: 'Step two. Turns his arrogance into a joke links straight back to the point: Shelley mocks the king’s pride. D explains how, and links back. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Ask of D: does it say **why the words matter**?', 'Let us check. Ask of D: does it say why the words matter?'],
    ['Yes: it explains the **mockery**', 'Yes. It explains how the poem mocks the king. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**Relevant** evidence, but only **retold**', 'Choice A is the trap. Nothing beside remains is relevant, but the sentence only adds more plot.'],
      ['B', 'A **line number** explains nothing', 'Choice B: a line number explains nothing.'],
      ['C', '**Context**, not analysis', 'Choice C is context, not analysis.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence **punctuates** the quotation correctly?',
    choices: [
      'The king says "Look on my Works, ye Mighty, and despair!".',
      'The king commands, “Look on my Works, ye Mighty, and despair!”',
      'The king commands “look on my works ye mighty and despair”',
      'The king commands, Look on my Works, ye Mighty, and despair!',
    ],
    answer: 1,
    working: 'A **comma** before, **quotation marks** around, the **exact** words, the **!** inside.',
    ask: 'Which sentence punctuates the quotation correctly? A has the exclamation mark followed by an extra full stop outside the quotation marks. B has a comma after commands, then the exact words in quotation marks, with the exclamation mark inside. C has no comma, no capitals, and no punctuation inside. D has no quotation marks at all.',
    reveal: 'The answer is B. A comma introduces the quotation, quotation marks go around the exact words, and the exclamation mark stays inside.',
  },
  sum: [
    ['**Point**, **evidence**, **analysis**', 'Here is what to remember. A paragraph needs a point, evidence and analysis.'],
    ['Analysis explains **how** the words work', 'Analysis explains how the words work.'],
    ['and **links** back to the point', 'And it links back to the point. For more on the analytical essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
