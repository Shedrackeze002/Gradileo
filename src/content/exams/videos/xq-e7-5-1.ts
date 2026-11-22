import { englishExam, ours, quote, scene, table } from '../english.ts';

// Grade 7 English, lesson 5.1 (news reports). An exam-style question we wrote, in the style of a
// Grade 7 media test, on a news lead we wrote about an invented event. The answer is B: the lead tells
// who, what, when and where, but not why the dog was in the river.

const LEAD = ['A teenage kayaker rescued a dog from the Red River in Winnipeg on Saturday morning, pulling the shivering animal onto her boat before paddling it safely to shore.'];

export default englishExam({
  lesson: 'e7-5-1',
  ...ours('a Grade 7 media test', 'the report and its event are invented by Gradileo'),
  title: 'Which of the Five Ws Is Missing From the Lead?',
  thumbnailTitle: 'News Reports',
  subtitle: 'The lead and the five Ws, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: the opening sentence of a news report about a kayaker rescuing a dog answers most of the five Ws. We learn what a lead does, find each W in the sentence, and spot the one it leaves out.',
  intro: [
    'In this video, we solve an exam-style question about news reports. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 media test. The report and its event are made up.',
  ],
  passage: {
    lines: LEAD,
    by: 'A news lead written for Gradileo',
    say: ['First, read the opening sentence of a news report. A teenage kayaker rescued a dog from the Red River in Winnipeg on Saturday morning, pulling the shivering animal onto her boat before paddling it safely to shore.'],
  },
  question: {
    prompt: 'Which of the **five Ws** does this lead **not** answer?',
    text: 'Read the lead of the news report. Which of the five Ws does this lead not answer?',
    choices: ['Who?', 'Why?', 'When?', 'Where?'],
    answer: 1,
    working: 'Who: a teenage kayaker. What: rescued a dog. When: Saturday morning. Where: the Red River in Winnipeg. **Why** the dog was in the river is **not** said.',
    say: ['Which of the five Ws does this lead not answer? A: Who? B: Why? C: When? D: Where?'],
  },
  ask: [
    ['A **lead** is the **first sentence** of a news report', 'A lead is the first sentence of a news report.'],
    ['Which W is **missing**?', 'We need to find which of the five Ws it leaves out.'],
  ],
  know: {
    title: 'News reports and the five Ws',
    md: 'A news report puts the most important facts **first**. Its **lead** tries to answer the **five Ws**: **Who**, **What**, **When**, **Where** and **Why** (and sometimes **How**). Less important details come **later**: the **inverted pyramid**.',
    say: [
      'Here is the idea we need. A news report puts the most important facts first. Its opening sentence, the lead, tries to answer the five Ws: who, what, when, where and why, and sometimes how.',
      'Less important details come later. This shape, with the most important facts at the top, is called the inverted pyramid.',
    ],
  },
  plan: [
    ['Find each **W** in the lead', 'Here is the plan. Find each W in the lead, one at a time.'],
    ['Spot the one with **no answer**', 'Then spot the one with no answer.'],
  ],
  steps: [
    scene('Step 1: Find each W', [quote('p', ['[[theta:A teenage kayaker]] [[good:rescued a dog]] from [[theta:the Red River in Winnipeg]] [[good:on Saturday morning]], pulling the shivering animal onto her boat before paddling it safely to shore.']), table('t', ['W', 'Answer'], [['Who?', 'a teenage kayaker'], ['What?', 'rescued a dog'], ['When?', 'Saturday morning'], ['Where?', 'the Red River in Winnipeg'], ['Why?', '[[bad:not given]]']])], [
      { say: 'Step one. Pause and find each W.', show: 'p', wait: 3 },
      { say: 'Who? A teenage kayaker. What? She rescued a dog.', show: ['t.0', 't.1'] },
      { say: 'When? Saturday morning. Where? The Red River in Winnipeg.', show: ['t.2', 't.3'] },
      { say: 'Why? We never learn why the dog was in the river. That is missing. The answer is B.', show: 't.4', focus: 't.4' },
    ]),
  ],
  check: [
    ['The lead even gives **how**: pulled onto her boat', 'Let us check. The lead even tells us how: she pulled the dog onto her boat and paddled to shore.'],
    ['**Why** would come later, if it is known', 'Why the dog was in the river might come later in the report, if anyone knows. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**Who** is a description, not a **name**, but it still answers', 'Choice A is the trap. We are not told her name, but a teenage kayaker still answers who.'],
      ['C', '**Saturday morning** answers when', 'Choice C: Saturday morning answers when.'],
      ['D', '**the Red River in Winnipeg** answers where', 'Choice D: the Red River in Winnipeg answers where.'],
    ],
  },
  yourTurn: {
    prompt: 'Four headlines report the same event. Which one gives the event a **positive angle**?',
    choices: ['Teen hero saves dog from icy river', 'Dog falls into river', 'River incident on Saturday', 'Kayaker on river with dog'],
    answer: 0,
    working: '**hero** and **saves** make the kayaker the focus and cast her in a good light.',
    ask: 'Four headlines report the same event. Which one gives the event a positive angle? A: Teen hero saves dog from icy river. B: Dog falls into river. C: River incident on Saturday. D: Kayaker on river with dog.',
    reveal: 'The answer is A. Hero and saves put the brave rescue first, and cast the kayaker in a good light.',
  },
  sum: [
    ['The **lead** gives the most important facts **first**', 'Here is what to remember. The lead gives the most important facts first.'],
    ['It answers the **five Ws**: who, what, when, where, why', 'It tries to answer the five Ws: who, what, when, where and why.'],
    ['**Word choice** and **order** give a report its **angle**', 'And word choice and order give a report its angle. For more on news reports, watch this lesson’s explainer video on Gradileo.'],
  ],
});
