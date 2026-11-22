import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 4.3 (satire and the comedy of manners). An exam-style question we wrote, in the
// style of a Grade 12 reading test, on Oscar Wilde's The Importance of Being Earnest (1895), which is in
// the public domain. The answer is A: Lady Bracknell judges a tragedy as if it were bad manners, so Wilde
// mocks an upper class that cares more for respectability than for feeling.

const LINES = ['**Lady Bracknell:** To lose one parent, Mr. Worthing, may be regarded as a misfortune; to lose both looks like carelessness.'];

export default englishExam({
  lesson: 'e12-4-3',
  ...ours('a Grade 12 reading test', 'the play is Oscar Wilde’s The Importance of Being Earnest (1895), in the public domain'),
  title: 'What Is Wilde Mocking in Lady Bracknell’s Line?',
  thumbnailTitle: 'Comedy of Manners',
  subtitle: 'Satire and its targets, step by step',
  summary:
    'An exam-style question on Oscar Wilde’s The Importance of Being Earnest, solved one small step at a time. Lady Bracknell interviews a young man who hopes to marry her daughter, and learns he has lost both his parents. We look at her reply, find the joke, and name the target of Wilde’s satire.',
  intro: [
    'In this video, we solve an exam-style question about satire and the comedy of manners. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Wilde’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Oscar Wilde, The Importance of Being Earnest (1895), Act 1',
    say: ['First, the context. Jack Worthing wants to marry Gwendolen. Her mother, Lady Bracknell, questions him, and learns that he has lost both his parents. She replies: To lose one parent, Mr. Worthing, may be regarded as a misfortune; to lose both looks like carelessness.'],
  },
  question: {
    prompt: 'What is Wilde **satirising** through this line?',
    text: 'Read Lady Bracknell’s line. What is Wilde satirising through this line?',
    choices: [
      'an upper class so obsessed with respectability that it treats a tragedy as bad manners',
      'parents who neglect their children',
      'young men who lie about their families',
      'the poor quality of hospitals in the eighteen-nineties',
    ],
    answer: 0,
    working: '*misfortune* → *carelessness*: she judges **grief** as a lapse of **manners**; her **values** are the target.',
    say: [
      'What is Wilde satirising through this line?',
      'A: an upper class so obsessed with respectability that it treats a tragedy as bad manners. B: parents who neglect their children. C: young men who lie about their families. D: the poor quality of hospitals in the eighteen-nineties.',
    ],
  },
  ask: [
    ['Lady Bracknell makes a **shocking** judgement', 'Lady Bracknell makes a shocking judgement.'],
    ['What is the **target** of the satire?', 'We need to find the target of Wilde’s satire.'],
  ],
  know: {
    title: 'Satire and the comedy of manners',
    md: '**Satire** uses humour to **expose** and **criticise** folly or vice. Its **target** is what is being mocked; its **techniques** include **exaggeration**, **irony**, **understatement** and **inversion** (turning values upside down). The **comedy of manners** satirises the upper classes: their **rules**, **snobbery** and concern for **appearances**, usually through witty dialogue.',
    say: [
      'Here is the idea we need. Satire uses humour to expose and criticise foolishness or wrongdoing. Its target is what is being mocked, and its techniques include exaggeration, irony, understatement, and inversion, which turns values upside down.',
      'The comedy of manners satirises the upper classes: their rules, their snobbery and their concern for appearances, usually through witty dialogue.',
    ],
  },
  plan: [
    ['Find the **inversion**', 'Here is the plan. First, find the inversion in the line.'],
    ['Ask **who** is being judged', 'Second, ask who is really being judged.'],
    ['Name the **target**', 'Third, name the target.'],
  ],
  steps: [
    scene('Step 1: The inversion', [quote('p', ['To lose one parent… may be regarded as a [[good:misfortune]];', 'to lose both looks like [[bad:carelessness]].']), table('t', ['Expected', 'Lady Bracknell'], [['losing both parents = a **greater** tragedy', 'losing both = **careless**, like losing an umbrella']])], [
      { say: 'Step one. Losing one parent is a misfortune, she says. Fair enough. But losing both looks like carelessness.', show: 'p' },
      { say: 'We expect more sympathy for a greater loss. Instead, she treats it like losing an umbrella. Values are turned upside down.', show: 't.0', focus: 't.0' },
    ]),
    scene('Step 2: The target', [text('j', 'The joke is on **her**, not on Jack'), text('a', 'An upper class that judges **grief** by **manners** → **A**', 'lg')], [
      { say: 'Step two. The audience laughs at her, not at Jack. Her reply shows a world where everything, even death, is judged as good or bad form.', show: 'j' },
      { say: 'So Wilde mocks an upper class obsessed with respectability. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['She goes on to ask about his **family background**', 'Let us check. She goes on to question his background, his income and his address, all to judge if he is respectable.'],
    ['Respectability, again, is the **target**', 'Respectability is the target again. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'The parents are not **blamed** by Wilde; *she* blames **Jack**', 'Choice B is the trap. The word carelessness sounds like blame for neglect, but it is Lady Bracknell who blames Jack, and Wilde laughs at her for it.'],
      ['C', 'Jack has not **lied** here', 'Choice C: Jack has not lied about his parents here.'],
      ['D', 'No **hospitals** in the line', 'Choice D: nothing in the line is about hospitals.'],
    ],
  },
  yourTurn: {
    prompt: 'A satire makes a greedy banker so greedy that he tries to charge his own shadow rent. Which technique is this?',
    choices: ['understatement', 'flashback', 'exaggeration', 'alliteration'],
    answer: 2,
    working: 'A flaw **blown up** until absurd: **exaggeration**.',
    ask: 'A satire makes a greedy banker so greedy that he tries to charge his own shadow rent. Which technique is this? A: understatement. B: flashback. C: exaggeration. D: alliteration.',
    reveal: 'The answer is C, exaggeration. The satirist blows up a real flaw until it becomes absurd, so we see it clearly.',
  },
  sum: [
    ['Satire **exposes** folly through humour', 'Here is what to remember. Satire exposes foolishness through humour.'],
    ['Find its **target** and its **technique**', 'Find its target and its technique.'],
    ['Comedy of manners mocks **upper-class** values', 'The comedy of manners mocks upper-class values. For more on satire and the comedy of manners, watch this lesson’s explainer video on Gradileo.'],
  ],
});
