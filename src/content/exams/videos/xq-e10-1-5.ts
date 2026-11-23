import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 1.5 (theme, symbol and irony). An exam-style question we wrote, in the style
// of a Grade 10 reading test, on Kate Chopin's "The Story of an Hour" (1894), which is in the public
// domain. The answer is D: a theme is a statement about life, and D is the only complete one.

const LINES = ['“Free! Body and soul free!” she kept whispering.'];

export default englishExam({
  lesson: 'e10-1-5',
  ...ours('a Grade 10 reading test', 'the story is Kate Chopin’s “The Story of an Hour” (1894), in the public domain'),
  title: 'Which Is a Theme of “The Story of an Hour”?',
  thumbnailTitle: 'Writing a Theme',
  subtitle: 'Theme as a statement about life, step by step',
  summary:
    'An exam-style question on Kate Chopin’s “The Story of an Hour”, solved one small step at a time: a woman hears that her husband has died, and to her own surprise feels free. We tell a theme from a topic and a summary, and choose the statement that works as a theme.',
  intro: [
    'In this video, we solve an exam-style question about theme. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Kate Chopin’s story, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Kate Chopin, “The Story of an Hour” (1894)',
    say: [
      'First, here is the story in brief. Louise Mallard is told that her husband has been killed in a railway accident. She weeps, then sits alone at an open window, and slowly a new feeling rises in her. She will live for herself now. Free! Body and soul free! she kept whispering.',
      'But at the end, her husband walks in through the door. He was never on the train. Louise collapses and dies.',
    ],
  },
  question: {
    prompt: 'Which statement best expresses a **theme** of the story?',
    text: 'Read the summary and the line from “The Story of an Hour”. Which statement best expresses a theme of the story?',
    choices: [
      'Freedom.',
      'A woman hears that her husband has died, but he comes home.',
      'The story is about marriage.',
      'A person can feel trapped in a life that others believe is happy.',
    ],
    answer: 3,
    working: 'A **theme** is a **complete statement** about **life**, not one word, a topic, or a plot summary.',
    say: [
      'Which statement best expresses a theme of the story?',
      'A: Freedom. B: A woman hears that her husband has died, but he comes home. C: The story is about marriage. D: A person can feel trapped in a life that others believe is happy.',
    ],
  },
  ask: [
    ['A theme is a **message** about **life**', 'A theme is a message about life.'],
    ['Which choice is a **real** theme?', 'We need the choice that is a real theme statement.'],
  ],
  know: {
    title: 'Theme, symbol and irony',
    md: 'A **topic** is a word or phrase (*freedom*). A **summary** retells the **plot**. A **theme** is a **complete statement about life** that the story suggests, true **beyond** the story. A **symbol** is an object that stands for an idea (the **open window** = new **possibilities**). **Irony**: **verbal** (saying the opposite of what you mean), **situational** (the opposite of what we expect happens), **dramatic** (the audience knows what a character does not).',
    say: [
      'Here is the idea we need. A topic is just a word or phrase, like freedom. A summary retells the plot. A theme is a complete statement about life that the story suggests, and it is true beyond the story.',
      'A symbol is an object that stands for an idea, like the open window, which suggests new possibilities. And there are three kinds of irony. Verbal irony says the opposite of what is meant, situational irony is when the opposite of what we expect happens, and dramatic irony is when the audience knows something a character does not.',
    ],
  },
  plan: [
    ['Sort each choice: **topic**, **summary** or **theme**?', 'Here is the plan. First, sort each choice into topic, summary or theme.'],
    ['Check the theme **fits** the story', 'Second, check that the theme fits the story.'],
  ],
  steps: [
    scene('Step 1: Sort the choices', [table('t', ['Choice', 'What it is'], [['A *Freedom.*', 'a **topic**: one word'], ['B *A woman hears…*', 'a **summary** of the plot'], ['C *about marriage*', 'a **topic** in a sentence'], ['D *A person can feel trapped…*', '[[good:a statement about **life**]]']])], [
      { say: 'Step one. Freedom is a single word. It is a topic, not a statement.', show: 't.0' },
      { say: 'B retells the plot, so it is a summary. C still only names a topic: marriage.', show: ['t.1', 't.2'] },
      { say: 'D is a complete statement about life, true beyond this one story.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: Does it fit?', [quote('p', ['“[[good:Free! Body and soul free!]]” she kept whispering.']), text('a', 'She felt **trapped** in a marriage others saw as normal → **D**', 'lg')], [
      { say: 'Step two. Does it fit? Louise’s whispered joy at being free shows she felt trapped, in a marriage that others thought was perfectly normal. So D is a theme the story suggests. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['D never names **Louise**, yet the story **proves** it', 'Let us check. D never names Louise, yet the story supports it.'],
    ['That is what a **theme** does', 'That is exactly what a theme does. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The right **idea**, but only a **topic**', 'Choice A is the trap. Freedom is the right idea, but one word is only a topic, not a theme.'],
      ['B', 'Retells the **plot**', 'Choice B retells the plot.'],
      ['C', 'Names a topic, makes **no claim**', 'Choice C names a topic but makes no claim about life.'],
    ],
  },
  yourTurn: {
    prompt: 'A fire station burns down. What kind of **irony** is this?',
    choices: ['situational', 'verbal', 'dramatic', 'no irony'],
    answer: 0,
    working: 'The **opposite** of what we expect happens: **situational** irony.',
    ask: 'A fire station burns down. What kind of irony is this? A: situational. B: verbal. C: dramatic. D: no irony.',
    reveal: 'The answer is A, situational irony. We expect a fire station to stop fires, not to burn down.',
  },
  sum: [
    ['A **theme** is a full statement about **life**', 'Here is what to remember. A theme is a full statement about life.'],
    ['Not a **topic** and not a **summary**', 'It is not a topic, and not a summary.'],
    ['Irony: **verbal**, **situational**, **dramatic**', 'And there are three kinds of irony: verbal, situational and dramatic. For more on theme, symbol and irony, watch this lesson’s explainer video on Gradileo.'],
  ],
});
