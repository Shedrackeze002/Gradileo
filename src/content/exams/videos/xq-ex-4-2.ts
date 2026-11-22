import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 4.2 (spoken language: presenting and answering questions). An exam-style
// question we wrote, in the style of a GCSE English Language spoken language assessment. The answer is D:
// thank the questioner, be honest, and offer to find out.

export default englishExam({
  lesson: 'ex-4-2',
  ...ours('a GCSE English Language spoken language assessment'),
  title: 'How Should You Answer a Question You Cannot Answer?',
  thumbnailTitle: 'Answering Questions',
  subtitle: 'Presenting and answering questions, step by step',
  summary:
    'An exam-style question on spoken language, solved one small step at a time. At the end of a presentation, someone asks a question you cannot answer. We test four responses for honesty, politeness and directness, and choose the best.',
  intro: [
    'In this video, we solve an exam-style question about answering questions after a presentation. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE spoken language assessment.',
  ],
  question: {
    prompt: 'At the end of your presentation on plastic waste, someone asks a question you **cannot answer**. Which response is **best**?',
    text: 'At the end of your presentation on plastic waste, someone asks a question you cannot answer. Which response is best?',
    choices: [
      'Make up a statistic so that you sound confident.',
      'Say “Next question,” and point to someone else.',
      'Say “That’s not really relevant,” and move on.',
      'Say “Thank you, that’s a good question. I’m not certain, but I’ll find out and let you know.”',
    ],
    answer: 3,
    working: 'Thanks them (**polite**), admits it (**honest**), offers to follow up (**helpful**).',
    say: [
      'At the end of your presentation on plastic waste, someone asks a question you cannot answer. Which response is best?',
      'A: Make up a statistic so that you sound confident. B: Say, next question, and point to someone else. C: Say, that’s not really relevant, and move on. D: Say, thank you, that’s a good question. I’m not certain, but I’ll find out and let you know.',
    ],
  },
  ask: [
    ['A question you **cannot** answer', 'Someone asks a question you cannot answer.'],
    ['What is the **best** response?', 'We need the best way to respond.'],
  ],
  know: {
    title: 'Presenting and answering questions',
    md: 'A good presentation has a clear **structure**, **eye contact**, a steady **pace**, and **standard English**. When answering questions: **listen** to the whole question, **thank** the questioner, answer **directly** and briefly, and give a **reason** or **example**. If you do not know, be **honest** and offer to **find out**. Never invent facts.',
    say: [
      'Here is the idea we need. A good presentation has a clear structure, eye contact, a steady pace, and standard English.',
      'When answering questions, listen to the whole question, thank the questioner, answer directly and briefly, and give a reason or an example. If you do not know, be honest, and offer to find out. Never invent facts.',
    ],
  },
  plan: [
    ['Test for **honesty**', 'Here is the plan. First, test each response for honesty.'],
    ['Test for **politeness**', 'Second, test for politeness.'],
    ['Choose the **best**', 'Third, choose the best.'],
  ],
  steps: [
    scene('Step 1: Test each response', [table('t', ['Response', 'Problem'], [['A: make up a statistic', '[[bad:dishonest]]'], ['B: *Next question*', '[[bad:rude]]: ignores the person'], ['C: *not really relevant*', '[[bad:dismissive]]'], ['D: *Thank you… I’ll find out*', '[[good:honest and polite]]']])], [
      { say: 'Step one. A makes up a statistic. That is dishonest, and the audience may catch it.', show: 't.0' },
      { say: 'B ignores the person. C dismisses their question. Both are rude.', show: ['t.1', 't.2'] },
      { say: 'D is honest and polite.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: Why D works', [table('w', ['Part of D', 'Shows'], [['*Thank you, that’s a good question*', '**respect** for the questioner'], ['*I’m not certain*', '**honesty**'], ['*I’ll find out and let you know*', '**helpfulness**']]), text('a', '**D**', 'lg')], [
      { say: 'Step two. Thank you shows respect. I’m not certain is honest.', show: ['w.0', 'w.1'] },
      { say: 'And I’ll find out and let you know is helpful, and keeps your credibility. The answer is D.', show: ['w.2', 'a'] },
    ]),
  ],
  check: [
    ['Honesty **keeps** an audience’s trust', 'Let us check. Honesty keeps an audience’s trust.'],
    ['while a made-up fact can **lose** it', 'A made-up fact can lose it in a moment. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Sounds **confident**, but it is **dishonest**', 'Choice A is the trap. It sounds confident, but inventing facts is dishonest.'],
      ['B', '**Ignores** the questioner', 'Choice B ignores the questioner.'],
      ['C', '**Dismisses** a fair question', 'Choice C dismisses a fair question.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is in **standard English**?',
    choices: ['We was going to start with the facts.', 'We were going to start with the facts.', 'Me and him done the slides.', 'They was really helpful.'],
    answer: 1,
    working: '*We **were***: subject and verb **agree**.',
    ask: 'Which sentence is in standard English? A: We was going to start with the facts. B: We were going to start with the facts. C: Me and him done the slides. D: They was really helpful.',
    reveal: 'The answer is B. We were is standard English. We was, they was, and me and him done are not.',
  },
  sum: [
    ['**Listen**, **thank**, answer **directly**', 'Here is what to remember. Listen to the whole question, thank the questioner, and answer directly.'],
    ['If you don’t know, be **honest**', 'If you do not know, be honest, and offer to find out.'],
    ['Speak in **standard English**', 'And speak in standard English. For more on presenting and answering questions, watch this lesson’s explainer video on Gradileo.'],
  ],
});
