import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 4.2 (rhetorical analysis). An exam-style question we wrote, in the style of a
// Grade 11 reading test, on Abraham Lincoln's Second Inaugural Address (1865), which is in the public
// domain. The answer is A: as the Civil War ends, Lincoln urges reconciliation and healing rather than
// revenge.

const LINES = ['With malice toward none, with charity for all, with firmness in the right as God gives us to see the right, let us strive on to finish the work we are in, to bind up the nation’s wounds, to care for him who shall have borne the battle and for his widow and his orphan…'];

export default englishExam({
  lesson: 'e11-4-2',
  ...ours('a Grade 11 reading test', 'the speech is Abraham Lincoln’s Second Inaugural Address (1865), in the public domain'),
  title: 'What Is Lincoln’s Purpose in “With Malice Toward None”?',
  thumbnailTitle: 'Rhetorical Situation',
  subtitle: 'Speaker, occasion, audience and purpose, step by step',
  summary:
    'An exam-style question on Abraham Lincoln’s Second Inaugural Address, solved one small step at a time: in March eighteen sixty-five, with the Civil War almost won, Lincoln speaks to a divided nation. We map the rhetorical situation and name his purpose.',
  intro: [
    'In this video, we solve an exam-style question about rhetorical analysis. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Lincoln’s speech, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Abraham Lincoln, Second Inaugural Address (1865), closing sentence',
    say: ['First, read the closing words of the speech. It is March eighteen sixty-five. Lincoln is beginning his second term as president, and the Civil War between North and South is almost over. With malice toward none, with charity for all, with firmness in the right as God gives us to see the right, let us strive on to finish the work we are in, to bind up the nation’s wounds, to care for him who shall have borne the battle and for his widow and his orphan.'],
  },
  question: {
    prompt: 'What is Lincoln’s **main purpose** in these words?',
    text: 'Read the closing words of Lincoln’s Second Inaugural Address. What is Lincoln’s main purpose in these words?',
    choices: [
      'To urge reconciliation and healing, not revenge, as the war ends.',
      'To demand harsh punishment for the South.',
      'To describe the battles of the war in detail.',
      'To announce that he will resign.',
    ],
    answer: 0,
    working: '*malice toward none*, *charity for all*, *bind up the nation’s wounds*: **heal** and **reunite**, not punish.',
    say: [
      'What is Lincoln’s main purpose in these words?',
      'A: To urge reconciliation and healing, not revenge, as the war ends. B: To demand harsh punishment for the South. C: To describe the battles of the war in detail. D: To announce that he will resign.',
    ],
  },
  ask: [
    ['A speech is shaped by its **situation**', 'A speech is shaped by its rhetorical situation.'],
    ['What is Lincoln’s **purpose**?', 'We need Lincoln’s main purpose.'],
  ],
  know: {
    title: 'The rhetorical situation',
    md: 'Analyse a text’s **rhetorical situation** with **SOAPSTone**: **S**peaker, **O**ccasion (the time, place and event), **A**udience, **P**urpose, **S**ubject, **Tone**. Then explain how the writer’s **choices** (words, images, structure, appeals) serve the **purpose**. A **tricolon** or **parallel** phrases (*with… with… with…*) add rhythm and force.',
    say: [
      'Here is the idea we need. Analyse a text’s rhetorical situation with SOAPSTone: the speaker; the occasion, meaning the time, place and event; the audience; the purpose; the subject; and the tone.',
      'Then explain how the writer’s choices, such as words, images, structure and appeals, serve that purpose. Parallel phrases, like with, with, with, add rhythm and force.',
    ],
  },
  plan: [
    ['Map the **situation**', 'Here is the plan. First, map the situation.'],
    ['Read the **key choices**', 'Second, read the key choices.'],
    ['Name the **purpose**', 'Third, name the purpose.'],
  ],
  steps: [
    scene('Step 1: The situation', [table('t', ['SOAPSTone', 'Lincoln, 1865'], [['Speaker', 'the **President**, re-elected'], ['Occasion', 'his second inauguration, as the **Civil War** ends'], ['Audience', 'a **divided** nation, North and South'], ['Tone', '**calm**, merciful, solemn']])], [
      { say: 'Step one. The speaker is the President, just re-elected. The occasion is his second inauguration, as the Civil War comes to an end.', show: ['t.0', 't.1'] },
      { say: 'The audience is a nation deeply divided between North and South. And the tone is calm, merciful and solemn.', show: ['t.2', 't.3'] },
    ]),
    scene('Step 2: Choices and purpose', [quote('p', ['With [[good:malice toward none]], with [[good:charity for all]]… to [[good:bind up the nation’s wounds]]…']), text('a', '**Heal** the nation, not take **revenge** → **A**', 'lg')], [
      { say: 'Step two. Malice toward none: no hatred, even for the enemy. Charity for all. Bind up the nation’s wounds, an image of caring for an injured body.', show: 'p' },
      { say: 'His purpose is to urge reconciliation and healing, not revenge. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['*None* and *all*: **no one** is excluded', 'Let us check. None and all mean no one is excluded, not even the South.'],
    ['That fits **reconciliation**', 'That fits reconciliation. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'The war **was** bitter, but he says *malice toward none*', 'Choice B is the trap. The war was bitter, and many wanted revenge, but Lincoln says malice toward none.'],
      ['C', 'No battle **details**', 'Choice C: there are no battle details.'],
      ['D', 'He is **beginning** a term', 'Choice D: he is beginning a new term, not resigning.'],
    ],
  },
  yourTurn: {
    prompt: 'In SOAPSTone, what does **Occasion** mean?',
    choices: ['the speaker’s attitude', 'the time, place and event that prompts the text', 'the readers or listeners', 'the main idea'],
    answer: 1,
    working: 'The **when**, **where** and **why now**.',
    ask: 'In SOAPSTone, what does occasion mean? A: the speaker’s attitude. B: the time, place and event that prompts the text. C: the readers or listeners. D: the main idea.',
    reveal: 'The answer is B. The occasion is the time, place and event that prompts the text.',
  },
  sum: [
    ['Map **SOAPSTone** first', 'Here is what to remember. Map SOAPSTone first.'],
    ['Then link the writer’s **choices** to the **purpose**', 'Then link the writer’s choices to the purpose.'],
    ['Context explains **why** these words', 'And use the context to explain why these words were chosen. For more on rhetorical analysis, watch this lesson’s explainer video on Gradileo.'],
  ],
});
