import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 5.2 (representation and power). An exam-style media question we wrote, in the
// style of a Grade 12 media test. The answer is D: a history told only through the governors' letters
// leaves out the colonised people, so it reflects the view of those in power.

export default englishExam({
  lesson: 'e12-5-2',
  ...ours('a Grade 12 media literacy test'),
  title: 'Whose Story Is Missing From This History?',
  thumbnailTitle: 'Representation and Power',
  subtitle: 'Whose stories are told, step by step',
  summary:
    'An exam-style question on representation, solved one small step at a time. A textbook tells the history of a colony using only the letters of its governors. We ask who is speaking, who is silent, and what that means for the story we are given.',
  intro: [
    'In this video, we solve an exam-style question about representation and power. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 media literacy test.',
  ],
  question: {
    prompt: 'A school textbook tells the history of a colony using **only** the letters written by its colonial governors. What is the **main problem** with how the history is represented?',
    text: 'A school textbook tells the history of a colony using only the letters written by its colonial governors. What is the main problem with how the history is represented?',
    choices: [
      'The letters are too old to read.',
      'Governors wrote too many letters.',
      'Letters are less exciting than photographs.',
      'The colonised people’s voices are missing, so the story reflects the view of those in power.',
    ],
    answer: 3,
    working: 'Only **governors** speak → the **colonised** are **silent** → the history shows the **powerful** side.',
    say: [
      'A school textbook tells the history of a colony using only the letters written by its colonial governors. What is the main problem with how the history is represented?',
      'A: The letters are too old to read. B: Governors wrote too many letters. C: Letters are less exciting than photographs. D: The colonised people’s voices are missing, so the story reflects the view of those in power.',
    ],
  },
  ask: [
    ['The history uses **one** kind of source', 'The history uses only one kind of source.'],
    ['What is the **problem**?', 'We need to name the problem with how it represents the past.'],
  ],
  know: {
    title: 'Representation and power',
    md: '**Representation** is how people, places and events are shown in media and texts. Ask four questions: **whose** story is told? **Who** is telling it? **Who** is left out or silent? And **who benefits** from this version? Representation both **reflects** power, since the powerful usually control what is told, and **shapes** it, since repeated images change how audiences see a group.',
    say: [
      'Here is the idea we need. Representation is how people, places and events are shown in media and texts. Ask four questions: whose story is told, who is telling it, who is left out or silent, and who benefits from this version?',
      'Representation reflects power, since the powerful usually control what is told. And it shapes power, since repeated images change how audiences see a group.',
    ],
  },
  plan: [
    ['**Who** is speaking?', 'Here is the plan. First, who is speaking?'],
    ['**Who** is silent?', 'Second, who is silent?'],
    ['What does that **mean**?', 'Third, what does that mean for the history?'],
  ],
  steps: [
    scene('Step 1: Speaking and silent', [table('t', ['Question', 'In this textbook'], [['who speaks', 'colonial **governors**: those in **power**'], ['who is silent', 'the **colonised** people'], ['whose view we get', 'only the **rulers’**']])], [
      { say: 'Step one. Who speaks? Only the colonial governors, the people in power.', show: 't.0' },
      { say: 'Who is silent? The colonised people, whose land it was. So we get only the rulers’ view.', show: ['t.1', 't.2'], focus: 't.1' },
    ]),
    scene('Step 2: What it means', [text('e', 'A history told **only** by the powerful **reflects** their view'), text('a', 'Missing voices → a **one-sided** history → **D**', 'lg')], [
      { say: 'Step two. The governors would describe events in ways that suited them. Without other voices, readers cannot test that view.', show: 'e' },
      { say: 'So the colonised people’s voices are missing, and the story reflects the view of those in power. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['A fix: add **other** sources, such as oral histories', 'Let us check with a fix. Adding other sources, such as oral histories from the colonised people, would solve the problem.'],
    ['That fix targets **missing voices**', 'That fix targets the missing voices. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Age is **not** the problem; **whose** words they are is', 'Choice A is the trap. Old sources can be hard to read, but the problem is whose words they are, not their age.'],
      ['B', 'The **number** of letters is not the issue', 'Choice B: the number of letters is not the issue.'],
      ['C', '**Excitement** is not the issue', 'Choice C: how exciting the sources are is not the issue.'],
    ],
  },
  yourTurn: {
    prompt: 'A film about a deaf athlete is written, directed and acted entirely by hearing people. Which question does this **most** raise?',
    choices: ['how long the film is', 'who gets to tell whose stories', 'whether the soundtrack is loud enough', 'which colours the costumes use'],
    answer: 1,
    working: 'A group’s story told **without** that group → **who tells whose stories?**',
    ask: 'A film about a deaf athlete is written, directed and acted entirely by hearing people. Which question does this most raise? A: how long the film is. B: who gets to tell whose stories. C: whether the soundtrack is loud enough. D: which colours the costumes use.',
    reveal: 'The answer is B. When a group’s story is told entirely by others, we should ask who gets to tell whose stories.',
  },
  sum: [
    ['Ask **whose** story is told, and **by whom**', 'Here is what to remember. Ask whose story is told, and by whom.'],
    ['Notice who is **silent**', 'Notice who is silent.'],
    ['Representation **reflects** and **shapes** power', 'Representation both reflects and shapes power. For more on representation and power, watch this lesson’s explainer video on Gradileo.'],
  ],
});
