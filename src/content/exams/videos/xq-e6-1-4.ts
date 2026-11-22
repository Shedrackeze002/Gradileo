import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 1.4 (theme). An exam-style question we wrote, in the style of a Grade 6
// reading test, on Hans Christian Andersen's "The Emperor's New Clothes" (1837, public domain),
// retold in our own words. The answer is B: everyone lies to avoid looking foolish, and only an
// honest child tells the truth.

const PASSAGE = [
  'Two tricksters promised the Emperor a suit of magic cloth that foolish people could not see. There was no cloth at all, but nobody dared to say so: not the ministers, not the courtiers, not even the Emperor himself.',
  'So the Emperor marched through the town in his “new clothes”, and the crowd cheered and praised them, until a small child called out, “But he isn’t wearing anything!”',
  'Then the whole crowd began to whisper, and then to shout, the same thing.',
];

export default englishExam({
  lesson: 'e6-1-4',
  ...ours('a Grade 6 reading test', 'the story is Hans Christian Andersen’s “The Emperor’s New Clothes” (1837, public domain), retold by Gradileo'),
  title: 'What Is a Theme of The Emperor’s New Clothes?',
  thumbnailTitle: 'Finding the Theme',
  subtitle: 'Theme, not topic, step by step',
  summary:
    'An exam-style reading question on Hans Christian Andersen’s “The Emperor’s New Clothes”, solved one small step at a time: which sentence best states a theme? We tell a theme apart from a topic and a plot summary, follow what the characters learn, and turn it into a message about life.',
  intro: [
    'In this video, we solve an exam-style reading question about the theme of a story. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 reading test. The story is Hans Christian Andersen’s, told in our own words.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'Hans Christian Andersen, “The Emperor’s New Clothes”, retold by Gradileo',
    say: [
      'First, read the story. Two tricksters promised the Emperor a suit of magic cloth that foolish people could not see. There was no cloth at all, but nobody dared to say so: not the ministers, not the courtiers, not even the Emperor himself.',
      'So the Emperor marched through the town in his new clothes, and the crowd cheered and praised them, until a small child called out, “But he isn’t wearing anything!” Then the whole crowd began to whisper, and then to shout, the same thing.',
    ],
  },
  question: {
    prompt: 'Which sentence best states a **theme** of this story?',
    text: 'Read the retelling of “The Emperor’s New Clothes”. Which sentence best states a theme of this story?',
    choices: ['An emperor walks through a town.', 'People may hide the truth to avoid looking foolish.', 'The story is about clothes.', 'Tricksters sell magic cloth to an emperor.'],
    answer: 1,
    working: 'Everyone pretends, out of fear of looking foolish; only the child is honest.',
    say: ['Which sentence best states a theme of this story? A: An emperor walks through a town. B: People may hide the truth to avoid looking foolish. C: The story is about clothes. D: Tricksters sell magic cloth to an emperor.'],
  },
  ask: [
    ['A **theme** is a message about **life**', 'A theme is a message about life that the story makes us think about.'],
    ['Not what **happens**, but what it **means**', 'So we are not looking for what happens in the story, but for what it means.'],
  ],
  know: {
    title: 'Theme',
    md: 'A **theme** is a message about **life** or **people** that a story shows. A **topic** is one word or phrase (*honesty*); a theme is a **full sentence** about it (*Honesty takes courage*). A **plot summary** says what happens, not what it means.',
    say: [
      'Here is the idea we need. A theme is a message about life or people that a story shows us.',
      'It is different from a topic, which is just a word or phrase, like honesty. A theme is a full sentence about the topic, like: honesty takes courage.',
      'And it is different from a plot summary, which tells what happens, not what it means.',
    ],
  },
  plan: [
    ['Sort the choices: **plot**, **topic** or **theme**?', 'Here is the plan. First, sort each choice: is it plot, topic or theme?'],
    ['Check the theme against **what characters do** and **learn**', 'Second, check the theme against what the characters do and learn.'],
  ],
  steps: [
    scene('Step 1: Sort the choices', [table('t', ['Choice', 'What it is'], [['A: an emperor walks through a town', 'plot: what happens'], ['B: people hide the truth to avoid looking foolish', '[[good:theme: a message about people]]'], ['C: about clothes', 'topic, and not even the real one'], ['D: tricksters sell magic cloth', 'plot: what happens']])], [
      { say: 'Step one. Pause and sort the choices.', wait: 3 },
      { say: 'A and D tell us what happens. They are plot, not theme.', show: ['t.0', 't.3'] },
      { say: 'C is just a topic, and not even the real one. The clothes do not exist!', show: 't.2' },
      { say: 'B is a full sentence about people in general. That is what a theme looks like.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Check it against the story', [quote('p', PASSAGE), text('n', 'Everyone **pretends** → afraid of looking **foolish** · the **child** tells the truth')], [
      { say: 'Step two. Does B fit what the characters do? Nobody dares to say there is no cloth, because the tricksters said only foolish people could not see it.', show: 'p', focus: 'p.0' },
      { say: 'The whole crowd praises clothes that are not there. Only a child, who has no fear of looking foolish, tells the truth, and then everyone admits it.', focus: ['p.1', 'p.2'] },
      { say: 'So people may hide the truth to avoid looking foolish. The answer is B.', show: 'n' },
    ]),
  ],
  check: [
    ['It is about **people**, not just this emperor', 'Let us check. B is about people in general, not just this emperor, so it reaches beyond the story.'],
    ['It explains **why** everyone pretends', 'And it explains the key puzzle of the story: why everyone pretends. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'A true **summary** of the plot', 'Choice D is true, but it is a summary of the plot. A theme must say something about life.'],
      ['A', 'A **detail** of the plot', 'Choice A is just one event.'],
      ['C', 'A **topic** in one word, and the wrong one', 'Choice C names a topic, not a message, and the story is not really about clothes at all.'],
    ],
  },
  yourTurn: {
    prompt: 'A proud hare mocks a slow tortoise and challenges him to a race. The hare races ahead, then naps, sure he will win. The tortoise keeps plodding and crosses the line first. Which sentence best states the theme?',
    choices: ['A hare and a tortoise have a race.', 'Hares are faster than tortoises.', 'The story is about running.', 'Steady effort can beat overconfidence.'],
    answer: 3,
    working: 'The confident hare stops; the steady tortoise wins.',
    ask: 'A proud hare mocks a slow tortoise and challenges him to a race. The hare races ahead, then naps, sure he will win. The tortoise keeps plodding and crosses the line first. Which sentence best states the theme?',
    reveal: 'The answer is D: steady effort can beat overconfidence. A is the plot, B is a fact, and C is only a topic.',
  },
  sum: [
    ['A **theme** is a message about life, in a **full sentence**', 'Here is what to remember. A theme is a message about life, written as a full sentence.'],
    ['It is not the **plot** or a one-word **topic**', 'It is not the plot, and not a one-word topic.'],
    ['Check it against what the characters **do** and **learn**', 'Check it against what the characters do and learn. For more on theme, watch this lesson’s explainer video on Gradileo.'],
  ],
});
