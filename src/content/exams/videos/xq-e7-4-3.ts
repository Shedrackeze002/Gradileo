import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 4.3 (fact, opinion and bias). An exam-style question we wrote, in the style
// of a Grade 7 reading test. The answer is D: "the best band in the world" is a judgement that cannot
// be proved, even though it is dressed up like a fact. The band is invented.

export default englishExam({
  lesson: 'e7-4-3',
  ...ours('a Grade 7 reading test', 'the band is invented'),
  title: 'Which Sentence Is an Opinion Dressed as a Fact?',
  thumbnailTitle: 'Fact and Opinion',
  subtitle: 'Facts, opinions and bias, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: four sentences about an invented band, and one of them is an opinion made to sound like a fact. We learn how to test a fact, check each sentence, and spot the judgement word hiding in it.',
  intro: [
    'In this video, we solve an exam-style reading question about facts and opinions. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test. The band in it is made up.',
  ],
  question: {
    prompt: 'Which sentence about the band **Skyline** is an **opinion**, even though it sounds like a fact?',
    text: 'Which sentence about the band Skyline is an opinion, even though it sounds like a fact?',
    choices: [
      'Skyline formed in Halifax in 2019.',
      'The band has four members.',
      'Their first album sold 50,000 copies.',
      'It is a simple truth that Skyline is the best band in the world.',
    ],
    answer: 3,
    working: '**best** is a judgement that cannot be **proved**, whatever *“simple truth”* claims.',
    say: [
      'Which sentence about the band Skyline is an opinion, even though it sounds like a fact?',
      'A: Skyline formed in Halifax in twenty nineteen. B: The band has four members. C: Their first album sold fifty thousand copies. D: It is a simple truth that Skyline is the best band in the world.',
    ],
  },
  ask: [
    ['Three sentences are **facts**', 'Three of these sentences are facts.'],
    ['One is an **opinion** in disguise', 'One is an opinion dressed up to look like a fact.'],
  ],
  know: {
    title: 'Facts, opinions and bias',
    md: 'A **fact** can be **checked** and proved true or false. An **opinion** is a **judgement**, often with words like *best*, *worst*, *amazing*. Writers sometimes **dress** opinions as facts with phrases like *it is a simple truth* or *everyone knows*. Choosing only facts that help one side is **bias**.',
    say: [
      'Here is the idea we need. A fact can be checked, and proved true or false. An opinion is a judgement, often using words like best, worst or amazing.',
      'Writers sometimes dress opinions up as facts, with phrases like it is a simple truth, or everyone knows. And choosing only the facts that help one side is called bias.',
    ],
  },
  plan: [
    ['Ask of each: could we **check** it?', 'Here is the plan. First, ask of each sentence: could we check it?'],
    ['Look for **judgement** words', 'Second, look for judgement words.'],
  ],
  steps: [
    scene('Step 1: Check each sentence', [table('t', ['Sentence', 'Could we check it?'], [['formed in Halifax in 2019', '[[good:✓ records]]'], ['four members', '[[good:✓ count them]]'], ['sold 50,000 copies', '[[good:✓ sales figures]]'], ['**best** band in the world', '[[bad:✗ “best” is a judgement]]']])], [
      { say: 'Step one. Where and when a band formed can be checked in records. The number of members can be counted. Album sales can be checked in sales figures.', show: ['t.0', 't.1', 't.2'] },
      { say: 'But best band in the world cannot be checked. People disagree about which band is best.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The disguise', [text('d', '[[theta:It is a simple truth that]] Skyline is the [[bad:best]] band in the world.', 'lg'), text('a', 'The disguise makes an opinion **sound** certain. The answer is **D**.')], [
      { say: 'Step two. It is a simple truth that is the disguise. It makes the sentence sound certain. But calling something true does not make it a fact.', show: 'd' },
      { say: 'Best is still a judgement. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Could someone **sensibly disagree** with D?', 'Let us check. Could someone sensibly disagree with D? Yes, easily.'],
    ['Nobody could disagree with a **true** fact', 'Nobody could sensibly disagree with A, B or C if the records show they are true. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'A big **number** feels like praise, but it is **checkable**', 'Choice C is the trap. Fifty thousand sounds like praise, but a sales figure can be checked, so it is a fact.'],
      ['A', 'A **place** and a **date**: checkable', 'Choice A gives a place and a date, which can be checked.'],
      ['B', 'A **number** of members: checkable', 'Choice B gives a number that can be counted.'],
    ],
  },
  yourTurn: {
    prompt: 'A school newsletter reports a sports day but mentions **only** the events the home team won. This shows:',
    choices: ['a fact', 'a rhetorical question', 'bias by leaving things out', 'a flashback'],
    answer: 2,
    working: 'Choosing only the facts that **help one side** is **bias**.',
    ask: 'A school newsletter reports a sports day but mentions only the events the home team won. This shows: A: a fact. B: a rhetorical question. C: bias by leaving things out. D: a flashback.',
    reveal: 'The answer is C, bias by leaving things out. Each fact might be true, but choosing only the wins gives a one-sided picture.',
  },
  sum: [
    ['A **fact** can be **checked**; an **opinion** is a **judgement**', 'Here is what to remember. A fact can be checked, and an opinion is a judgement.'],
    ['Watch for **disguises**: *it is a simple truth*, *everyone knows*', 'Watch for disguises like it is a simple truth, or everyone knows.'],
    ['**Bias** can hide in what a writer **leaves out**', 'And bias can hide in what a writer leaves out. For more on fact, opinion and bias, watch this lesson’s explainer video on Gradileo.'],
  ],
});
