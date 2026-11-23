import { englishExam, ours, scene, table } from '../english.ts';

// Grade 8 English, lesson 1.4 (theme across texts). An exam-style question we wrote, in the style of a
// Grade 8 reading test, on a story we summarise. The answer is B: a complete, specific statement about
// life, rather than a topic word, a plot summary or a cliché.

const SUMMARY = ['Kai lies to his team so he can be captain. He wins the title, but his teammates stop trusting him, and the season feels empty. At the end, he admits the lie and steps down, and his friends slowly return.'];

export default englishExam({
  lesson: 'e8-1-4',
  ...ours('a Grade 8 reading test', 'the story is by Gradileo'),
  title: 'Which Sentence Best States the Theme?',
  thumbnailTitle: 'Stating a Theme',
  subtitle: 'Writing a precise theme statement, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: Kai lies to become captain, wins, and loses his friends’ trust. We learn what a theme statement must be, test four candidates against that rule, and choose the most precise one.',
  intro: [
    'In this video, we solve an exam-style reading question about theme. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its story ourselves, in the style of a Grade 8 reading test.',
  ],
  passage: {
    lines: SUMMARY,
    by: 'A story written for Gradileo, summarised',
    say: ['First, here is what happens in the story. Kai lies to his team so he can be captain. He wins the title, but his teammates stop trusting him, and the season feels empty. At the end, he admits the lie and steps down, and his friends slowly return.'],
  },
  question: {
    prompt: 'Which sentence best states the story’s **theme**?',
    text: 'Read the summary of the story about Kai. Which sentence best states the story’s theme?',
    choices: [
      'Honesty.',
      'Success gained through dishonesty can cost us the trust that makes it worth having.',
      'Kai lies, wins the title, and then admits the truth.',
      'Cheaters never win.',
    ],
    answer: 1,
    working: 'B is a **full sentence** about **life**, fits the **whole** story, and avoids a **cliché**.',
    say: [
      'Which sentence best states the story’s theme?',
      'A: Honesty. B: Success gained through dishonesty can cost us the trust that makes it worth having. C: Kai lies, wins the title, and then admits the truth. D: Cheaters never win.',
    ],
  },
  ask: [
    ['A **theme** is the story’s **message** about life', 'A theme is the story’s message about life.'],
    ['Which sentence states it **best**?', 'We need the sentence that states it best.'],
  ],
  know: {
    title: 'Writing a theme statement',
    md: 'A theme statement is a **complete sentence** about **life** or **people**, not just a **topic** word (*honesty*). It does not retell the **plot** or name the **characters**. It should fit the **whole** story and avoid **clichés** that oversimplify (*cheaters never win*).',
    say: [
      'Here is the idea we need. A theme statement is a complete sentence about life or people, not just a topic word like honesty.',
      'It does not retell the plot or name the characters. It should fit the whole story, and avoid clichés that oversimplify, like cheaters never win.',
    ],
  },
  plan: [
    ['Is it a **full sentence** about **life**?', 'Here is the plan. First, is it a full sentence about life?'],
    ['Does it fit the **whole** story?', 'Second, does it fit the whole story?'],
    ['Is it **precise**, not a cliché?', 'Third, is it precise rather than a cliché?'],
  ],
  steps: [
    scene('Step 1: Test each statement', [table('t', ['Statement', 'Problem'], [['A: Honesty.', '[[bad:just a **topic**]]'], ['B: Success through dishonesty…', '[[good:✓ about life; fits the whole story]]'], ['C: Kai lies, wins…', '[[bad:retells the **plot**]]'], ['D: Cheaters never win.', '[[bad:**cliché**, and **false** here: Kai **did** win]]']])], [
      { say: 'Step one. A is just a topic. It does not say anything about honesty.', show: 't.0' },
      { say: 'C retells the plot and names Kai. That is a summary, not a theme.', show: 't.2' },
      { say: 'D is a cliché, and it does not even fit the story: Kai did win the title. What he lost was trust.', show: 't.3' },
      { say: 'B is a full sentence about life. It fits the whole story: the win, the lost trust, and the empty feeling. The answer is B.', show: 't.1', focus: 't.1' },
    ]),
  ],
  check: [
    ['B would apply to **other** stories too', 'Let us check. B could apply to other stories too, which is what a theme should do.'],
    ['and it explains **why** the season felt **empty**', 'And it explains why the season felt empty. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'A **cliché** that does not fit: Kai **did** win', 'Choice D is the trap. It sounds like a lesson, but it is a cliché, and the story shows the opposite: Kai did win.'],
      ['A', 'A **topic**, not a statement', 'Choice A is a topic, not a statement.'],
      ['C', 'A **plot summary**', 'Choice C is a plot summary.'],
    ],
  },
  yourTurn: {
    prompt: 'Two stories both show characters who are changed by caring for an animal. Which sentence best **compares** how they treat this theme?',
    choices: ['Both stories have animals.', 'Animals are nice.', 'The first story is longer.', 'Both show that caring for another creature can teach patience, though one shows it through joy and the other through loss.'],
    answer: 3,
    working: 'D names the **shared** theme and how each text treats it **differently**.',
    ask: 'Two stories both show characters who are changed by caring for an animal. Which sentence best compares how they treat this theme? A: Both stories have animals. B: Animals are nice. C: The first story is longer. D: Both show that caring for another creature can teach patience, though one shows it through joy and the other through loss.',
    reveal: 'The answer is D. It names the shared theme, and how each story treats it differently: one through joy, the other through loss.',
  },
  sum: [
    ['A theme is a **complete sentence** about **life**', 'Here is what to remember. A theme is a complete sentence about life.'],
    ['Not a **topic**, not a **plot summary**, not a **cliché**', 'It is not a topic, not a plot summary, and not a cliché.'],
    ['It must fit the **whole** story', 'And it must fit the whole story. For more on theme across texts, watch this lesson’s explainer video on Gradileo.'],
  ],
});
