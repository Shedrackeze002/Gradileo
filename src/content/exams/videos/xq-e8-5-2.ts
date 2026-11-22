import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 5.2 (news and framing). An exam-style question we wrote, in the style of a
// Grade 8 media test, on two short texts we wrote about an invented event. The answer is D: Text 2 uses
// "I", loaded words and a call for action, so it is an opinion piece.

const TEXTS = [
  '**Text 1:** The city council voted 6–3 on Tuesday to add bike lanes to Main Street. Work will begin in May and take four months, according to the council.',
  '**Text 2:** I have never been prouder of our council. These brilliant new bike lanes will finally make Main Street safe. Anyone who opposes them simply does not care about our children.',
];

export default englishExam({
  lesson: 'e8-5-2',
  ...ours('a Grade 8 media test', 'the texts and the event are invented by Gradileo'),
  title: 'Is Text 2 a News Report or an Opinion Piece?',
  thumbnailTitle: 'News or Opinion?',
  subtitle: 'News, opinion and framing, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: two short texts report the same council vote on bike lanes, and one of them is an opinion piece. We learn the features of each kind of text, compare the two, and explain how the second frames the story.',
  intro: [
    'In this video, we solve an exam-style media question about news and opinion. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 media test. The texts and the event are made up.',
  ],
  passage: {
    lines: TEXTS,
    by: 'Texts written for Gradileo',
    say: [
      'First, read the two texts. Text one: The city council voted six to three on Tuesday to add bike lanes to Main Street. Work will begin in May and take four months, according to the council.',
      'Text two: I have never been prouder of our council. These brilliant new bike lanes will finally make Main Street safe. Anyone who opposes them simply does not care about our children.',
    ],
  },
  question: {
    prompt: 'Which statement about **Text 2** is correct?',
    text: 'Read the two texts about the bike lanes. Which statement about Text 2 is correct?',
    choices: [
      'It is a news report, because it mentions the council.',
      'It is neutral, because it gives both sides.',
      'It is a news report, because it gives exact figures.',
      'It is an opinion piece, because it uses “I”, loaded words and an attack on opponents.',
    ],
    answer: 3,
    working: '*I*, *prouder*, *brilliant*, *finally*, and *does not care about our children*: a writer’s **opinion**, not neutral reporting.',
    say: [
      'Which statement about Text two is correct?',
      'A: It is a news report, because it mentions the council. B: It is neutral, because it gives both sides. C: It is a news report, because it gives exact figures. D: It is an opinion piece, because it uses I, loaded words and an attack on opponents.',
    ],
  },
  ask: [
    ['Both texts are about the **same** vote', 'Both texts are about the same vote.'],
    ['What **kind** of text is Text 2?', 'We need to decide what kind of text Text two is.'],
  ],
  know: {
    title: 'News, opinion and framing',
    md: 'A **news report** gives **facts** in a **neutral** voice, with **sources** (*according to…*). An **opinion piece** gives a writer’s **view**, often with *I*, **loaded** words and a call to agree. **Analysis** explains **why** something happened. **Framing** is how word choice, sources and images **shape** what readers think.',
    say: [
      'Here is the idea we need. A news report gives facts in a neutral voice, with sources, like according to the council. An opinion piece gives the writer’s view, often with I, loaded words and a push to agree.',
      'Analysis explains why something happened. And framing is how word choice, sources and images shape what readers think about a story.',
    ],
  },
  plan: [
    ['Compare the **voice**', 'Here is the plan. First, compare the voice of each text.'],
    ['Compare the **words**', 'Second, compare the words they use.'],
    ['Decide the **kind** of text', 'Third, decide what kind of text Text two is.'],
  ],
  steps: [
    scene('Step 1: Compare the texts', [table('t', ['', 'Text 1', 'Text 2'], [['voice', 'neutral, no *I*', '[[bad:“**I** have never been prouder”]]'], ['words', 'voted, add, begin', '[[bad:**brilliant**, **finally**, **simply**]]'], ['facts', '6–3, May, four months', 'none'], ['sources', '“according to the council”', 'none'], ['other side', '—', '[[bad:attacked: “does not care about our children”]]']])], [
      { say: 'Step one. Text one is neutral: no I, just facts, numbers and a source.', show: ['t.0', 't.1', 't.2', 't.3'] },
      { say: 'Text two uses I, and loaded words like brilliant and finally. It gives no facts or sources. And it attacks anyone who disagrees.', show: 't.4', focus: 't.4' },
    ]),
    scene('Step 2: The kind of text', [text('a', 'Text 2 is an **opinion piece** → **D**', 'lg')], [
      { say: 'Step two. A personal voice, loaded words and an attack on opponents are the marks of an opinion piece. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Text 2 **frames** the vote as a **heroic** win', 'Let us check. Text two frames the vote as a heroic win, and opponents as uncaring.'],
    ['Text 1 lets readers **decide**', 'Text one just reports and lets readers decide. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'The **figures** are in **Text 1**', 'Choice C is the trap. The exact figures are in Text one, not Text two.'],
      ['A', 'Mentioning the council does not make it **news**', 'Choice A: mentioning the council does not make it a news report.'],
      ['B', 'It **attacks** the other side', 'Choice B: it attacks the other side instead of giving it.'],
    ],
  },
  yourTurn: {
    prompt: 'A news website shows a photo of a single empty bike lane beside a traffic jam. How might this photo **frame** the story?',
    choices: ['It is completely neutral.', 'It suggests the bike lanes are a waste of space.', 'It shows the vote count.', 'It explains when work begins.'],
    answer: 1,
    working: 'An **empty** lane next to a **jam** suggests the lane is **unused** and causes traffic.',
    ask: 'A news website shows a photo of a single empty bike lane beside a traffic jam. How might this photo frame the story? A: It is completely neutral. B: It suggests the bike lanes are a waste of space. C: It shows the vote count. D: It explains when work begins.',
    reveal: 'The answer is B. An empty lane next to a traffic jam suggests the lanes are unused and cause traffic. The choice of photo frames the story without a single word.',
  },
  sum: [
    ['**News**: facts, neutral voice, sources', 'Here is what to remember. A news report gives facts, in a neutral voice, with sources.'],
    ['**Opinion**: *I*, loaded words, a push to agree', 'An opinion piece uses I, loaded words, and a push to agree.'],
    ['**Framing**: words, sources and images shape our view', 'Framing is how words, sources and images shape our view. For more on news and framing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
