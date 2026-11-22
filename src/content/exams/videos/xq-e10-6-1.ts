import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 6.1 (the personal response). An exam-style writing question we wrote, in the
// style of a Grade 10 writing test, about responses to Kate Chopin's "The Story of an Hour" (1894). The
// answer is C: it connects the text to the writer's experience and explains what the connection shows.

export default englishExam({
  lesson: 'e10-6-1',
  ...ours('a Grade 10 writing test'),
  title: 'Which Sentence Is a Personal Response?',
  thumbnailTitle: 'Personal Response',
  subtitle: 'Response or summary, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: four sentences written about Kate Chopin’s “The Story of an Hour”. We tell a summary from a fact and a response, and find the sentence that connects the story to experience and explains why.',
  intro: [
    'In this video, we solve an exam-style question about writing a personal response. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 writing test.',
  ],
  question: {
    prompt: 'Students wrote about Kate Chopin’s *“The Story of an Hour”*, in which a woman whispers *“Free!”* after hearing her husband has died. Which sentence is a **personal response**, not a summary?',
    text: 'Students wrote about Kate Chopin’s “The Story of an Hour”, in which a woman whispers “Free!” after hearing her husband has died. Which sentence is a personal response, not a summary?',
    choices: [
      'Louise hears that her husband has died, and goes up to her room.',
      'The story was written by Kate Chopin in 1894.',
      'Louise’s whispered “Free!” reminded me of the guilty relief I felt when a long, hard school year ended, which helped me see that grief and relief can arrive together.',
      'At the end, her husband walks in and Louise dies.',
    ],
    answer: 2,
    working: 'A response **connects** the text to the writer (*reminded me…*) and **explains** what the link shows (*which helped me see…*).',
    say: [
      'Students wrote about Kate Chopin’s The Story of an Hour, in which a woman whispers, Free! after hearing her husband has died. Which sentence is a personal response, not a summary?',
      'A: Louise hears that her husband has died, and goes up to her room. B: The story was written by Kate Chopin in eighteen ninety-four. C: Louise’s whispered Free! reminded me of the guilty relief I felt when a long, hard school year ended, which helped me see that grief and relief can arrive together. D: At the end, her husband walks in and Louise dies.',
    ],
  },
  ask: [
    ['A **response** is not a **summary**', 'A personal response is different from a summary.'],
    ['Which sentence **responds**?', 'We need the sentence that responds.'],
  ],
  know: {
    title: 'The personal response',
    md: 'A **summary** retells **what happens**. A **personal response** **connects** the text to your own **experience**, another **text**, or the **world**, and then **explains** what the connection helps you **understand** about the text. Use **I**, refer to **specific** details, and always come **back** to the text.',
    say: [
      'Here is the idea we need. A summary retells what happens. A personal response connects the text to your own experience, to another text, or to the world.',
      'Then, and this is the key part, it explains what that connection helps you understand about the text. Use I, refer to specific details, and always come back to the text.',
    ],
  },
  plan: [
    ['Sort each sentence: **summary**, **fact** or **response**', 'Here is the plan. First, sort each sentence into summary, fact or response.'],
    ['Check that the response **explains**', 'Second, check that the response explains its connection.'],
  ],
  steps: [
    scene('Step 1: Sort the sentences', [table('t', ['Choice', 'What it does', 'Type'], [['A', 'retells events', 'summary'], ['B', 'author and date', 'fact'], ['C', '**connects** to the writer’s life, then **explains**', '[[good:personal response]]'], ['D', 'retells the ending', 'summary']])], [
      { say: 'Step one. A retells what Louise does. That is summary. D retells the ending, also summary.', show: ['t.0', 't.3'] },
      { say: 'B gives the author and the date. That is a fact, not a response.', show: 't.1' },
      { say: 'C connects the story to the writer’s own life.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Does it explain?', [text('n', '*reminded me of…* = the **connection** · *which helped me see…* = the **explanation**'), text('a', 'Connects **and** explains → **C**', 'lg')], [
      { say: 'Step two. Reminded me of the guilty relief is the connection. Which helped me see that grief and relief can arrive together is the explanation, and it takes us back to Louise.', show: 'n' },
      { say: 'C connects and explains. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['It still refers to a **specific** detail: *“Free!”*', 'Let us check. C still refers to a specific detail from the story: Louise’s whispered free.'],
    ['and returns to the **text**', 'And it returns to the text. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'The **key** moment, but only **retold**', 'Choice D is the trap. It names the story’s key moment, but only retells it.'],
      ['A', 'Retells **events**', 'Choice A retells events.'],
      ['B', 'A **fact** about the story', 'Choice B is a fact about the story.'],
    ],
  },
  yourTurn: {
    prompt: 'After making a connection, what must a strong personal response **also** do?',
    choices: [
      'Explain how the connection deepens understanding of the text.',
      'Retell the whole plot.',
      'List the author’s other books.',
      'Avoid mentioning the text.',
    ],
    answer: 0,
    working: 'Explain **what the link shows** about the text.',
    ask: 'After making a connection, what must a strong personal response also do? A: Explain how the connection deepens understanding of the text. B: Retell the whole plot. C: List the author’s other books. D: Avoid mentioning the text.',
    reveal: 'The answer is A. A connection matters only when you explain what it shows about the text.',
  },
  sum: [
    ['A **summary** retells; a **response** connects', 'Here is what to remember. A summary retells, and a response connects.'],
    ['Connect to **self**, **text** or **world**', 'Connect the text to yourself, another text, or the world.'],
    ['Then **explain** what it shows', 'Then explain what the connection shows. For more on the personal response, watch this lesson’s explainer video on Gradileo.'],
  ],
});
