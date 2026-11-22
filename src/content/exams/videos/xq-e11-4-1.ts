import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 4.1 (the essay). An exam-style question we wrote, in the style of a Grade 11
// reading test, on Henry David Thoreau's Walden (1854), which is in the public domain. The answer is C:
// Thoreau's central idea is to live deliberately, attending to what truly matters.

const LINES = ['I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.'];

export default englishExam({
  lesson: 'e11-4-1',
  ...ours('a Grade 11 reading test', 'the essay is Henry David Thoreau’s Walden (1854), in the public domain'),
  title: 'What Is the Central Idea of Thoreau’s Walden?',
  thumbnailTitle: 'Central Idea',
  subtitle: 'Finding an essay’s central idea, step by step',
  summary:
    'An exam-style question on Henry David Thoreau’s Walden, solved one small step at a time: Thoreau explains why he went to live alone in a cabin by a pond. We decode deliberately and front, and name the central idea of the passage.',
  intro: [
    'In this video, we solve an exam-style question about an essay’s central idea. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Thoreau’s book, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Henry David Thoreau, Walden (1854), Chapter 2',
    say: ['First, read Thoreau’s sentence. In eighteen forty-five, he went to live alone for two years in a small cabin he built by Walden Pond, in the woods of Massachusetts. I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.'],
  },
  question: {
    prompt: 'What is the **central idea** of this passage?',
    text: 'Read the passage from Walden. What is the central idea of this passage?',
    choices: [
      'Living in the woods is cheaper than living in a town.',
      'Thoreau wanted to escape from his enemies.',
      'A meaningful life means living deliberately, focused on what truly matters.',
      'Everyone should move to the countryside.',
    ],
    answer: 2,
    working: '*live deliberately*, *only the essential facts*, *discover that I had not lived*: live **on purpose**, for what **matters**.',
    say: [
      'What is the central idea of this passage?',
      'A: Living in the woods is cheaper than living in a town. B: Thoreau wanted to escape from his enemies. C: A meaningful life means living deliberately, focused on what truly matters. D: Everyone should move to the countryside.',
    ],
  },
  ask: [
    ['An essay has a **central idea**', 'Every essay has a central idea.'],
    ['What is **Thoreau’s**?', 'We need Thoreau’s central idea here.'],
  ],
  know: {
    title: 'Kinds of essay',
    md: '**Expository**: explains or informs. **Argumentative**: argues for a position. **Personal** (reflective): explores the writer’s experience and what it means. **Satirical**: mocks a problem through irony and exaggeration. The **central idea** may be **stated** or **implied**; find it by asking what the **key words** and **purpose** add up to, beyond the topic.',
    say: [
      'Here is the idea we need. An expository essay explains or informs. An argumentative essay argues for a position. A personal, or reflective, essay explores the writer’s experience and what it means. And a satirical essay mocks a problem through irony and exaggeration.',
      'The central idea may be stated or implied. Find it by asking what the key words and the purpose add up to, beyond the topic.',
    ],
  },
  plan: [
    ['Decode the **key words**', 'Here is the plan. First, decode the key words.'],
    ['Ask what they **add up to**', 'Second, ask what they add up to.'],
  ],
  steps: [
    scene('Step 1: Key words', [table('t', ['Thoreau', 'Meaning'], [['*live deliberately*', 'live **on purpose**, thoughtfully'], ['*to front only the essential facts of life*', 'to **face** only what truly **matters**'], ['*discover that I had not lived*', 'realise too late that life was **wasted**']])], [
      { say: 'Step one. Live deliberately means live on purpose, thoughtfully, not by habit.', show: 't.0' },
      { say: 'To front only the essential facts of life means to face only what truly matters.', show: 't.1' },
      { say: 'And he does not want to discover, when he dies, that he had not truly lived.', show: 't.2' },
    ]),
    scene('Step 2: The central idea', [quote('p', ['…I wished to [[good:live deliberately]], to front only the [[good:essential facts of life]]…']), text('a', 'A meaningful life is lived **deliberately**, for what **matters** → **C**', 'lg')], [
      { say: 'Step two. The woods are only the setting. The real idea is about how to live: deliberately, focused on what truly matters. The answer is C.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['The woods are the **means**; living fully is the **goal**', 'Let us check. The woods are the means, and living fully is the goal.'],
    ['C names the **goal**', 'C names the goal. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Mistakes the **setting** for the **idea**', 'Choice D is the trap. It mistakes the setting for the idea. Thoreau is not telling everyone to move.'],
      ['A', 'Money is **not** mentioned here', 'Choice A: money is not mentioned here.'],
      ['B', 'No **enemies**', 'Choice B: there are no enemies.'],
    ],
  },
  yourTurn: {
    prompt: 'An essay that **mocks** a problem through **irony** and **exaggeration** is…',
    choices: ['satirical', 'expository', 'personal', 'descriptive'],
    answer: 0,
    working: 'Mocking through irony and exaggeration: **satire**.',
    ask: 'An essay that mocks a problem through irony and exaggeration is: A: satirical. B: expository. C: personal. D: descriptive.',
    reveal: 'The answer is A, satirical. Satire uses irony and exaggeration to mock a problem and push for change.',
  },
  sum: [
    ['Essays: **expository**, **argumentative**, **personal**, **satirical**', 'Here is what to remember. Essays can be expository, argumentative, personal or satirical.'],
    ['The central idea may be **implied**', 'The central idea may be implied.'],
    ['Look past the **topic** to the **point**', 'So look past the topic to the point. For more on the essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
