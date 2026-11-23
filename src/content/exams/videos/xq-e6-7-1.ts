import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 7.1 (narrative writing). An exam-style question we wrote, in the style of
// a Grade 6 writing test. The answer is C: it drops the reader into a moment of action and raises a
// question, while the others open with a summary, a date, or a statement of what the story is about.

export default englishExam({
  lesson: 'e6-7-1',
  ...ours('a Grade 6 writing test'),
  title: 'Which Opening Best Hooks the Reader?',
  thumbnailTitle: 'Story Openings',
  subtitle: 'Strong openings in narrative writing, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student is writing a story about getting lost in a forest, and we choose the opening that best hooks the reader. We learn what a hook does, test each opening for action and questions, and pick the strongest.',
  intro: [
    'In this video, we solve an exam-style question about story openings. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 writing test.',
  ],
  question: {
    prompt: 'A student is writing a story about getting lost in a forest. Which opening sentence would **best hook** the reader?',
    text: 'A student is writing a story about getting lost in a forest. Which opening sentence would best hook the reader?',
    choices: [
      'This is a story about the day I got lost in a forest.',
      'It was a Saturday in October, and the weather was fine.',
      'The path had disappeared, and somewhere behind me, a twig snapped.',
      'My name is Leo, and I am eleven years old.',
    ],
    answer: 2,
    working: 'C starts in the middle of the **action** and makes us ask **what snapped the twig?**',
    say: [
      'A student is writing a story about getting lost in a forest. Which opening sentence would best hook the reader?',
      'A: This is a story about the day I got lost in a forest. B: It was a Saturday in October, and the weather was fine. C: The path had disappeared, and somewhere behind me, a twig snapped. D: My name is Leo, and I am eleven years old.',
    ],
  },
  ask: [
    ['A **hook** makes the reader want to **read on**', 'A hook is an opening that makes the reader want to keep reading.'],
    ['Which opening does that **best**?', 'All four could start the story, so we need the one that does this best.'],
  ],
  know: {
    title: 'Hooks for story openings',
    md: 'Strong openings often start **in the action**, use a **sound** or **detail** that sets the mood, or raise a **question** the reader wants answered. Weak openings **announce** the story or give facts the reader does not need **yet**.',
    say: [
      'Here is the idea we need. A strong opening often starts in the middle of the action, uses a sound or a detail that sets the mood, or raises a question the reader wants answered.',
      'A weak opening announces what the story is about, or gives facts, like a name or a date, that the reader does not need yet.',
    ],
  },
  plan: [
    ['Does it start in the **action**?', 'Here is the plan. First, ask whether each opening starts in the action.'],
    ['Does it raise a **question**?', 'Second, ask whether it raises a question in the reader’s mind.'],
  ],
  steps: [
    scene('Step 1: Test each opening', [table('t', ['Opening', 'In the action?', 'Raises a question?'], [['A: This is a story about…', '[[bad:✗ announces the story]]', '[[bad:✗ tells us the ending]]'], ['B: It was a Saturday…', '[[bad:✗ date and weather]]', '[[bad:✗]]'], ['C: The path had disappeared…', '[[good:✓ already lost]]', '[[good:✓ what snapped the twig?]]'], ['D: My name is Leo…', '[[bad:✗ facts about the narrator]]', '[[bad:✗]]']])], [
      { say: 'Step one. Pause and read each opening as if you were picking up a new book.', wait: 3 },
      { say: 'A announces the story, and even tells us what happens. Nothing is left to wonder about.', show: 't.0' },
      { say: 'B gives the day and the weather. Calm facts, with no action.', show: 't.1' },
      { say: 'C drops us straight in: the path is gone, and something is behind us. We want to know what snapped the twig.', show: 't.2', focus: 't.2' },
      { say: 'D tells us facts about the narrator, which can wait.', show: 't.3' },
    ]),
    scene('Step 2: The answer', [text('a', '**C.** The path had disappeared, and somewhere behind me, a twig snapped.', 'lg')], [
      { say: 'Step two. Only C starts in the action and raises a question. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['C uses a **sound** to build tension', 'Let us check. C uses a sound, a twig snapping, to build tension.'],
    ['The other details can come **later**', 'The name, the date and the weather can all come later in the story. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Clearly about the topic, but gives it **away**', 'Choice A is the trap. It fits the topic perfectly, but it tells us what happens before we have a reason to care.'],
      ['B', 'Sets the scene, but **calmly**', 'Choice B sets the scene, but nothing happens.'],
      ['D', 'Introduces the narrator, but no **action**', 'Choice D introduces the narrator, but there is no action yet.'],
    ],
  },
  yourTurn: {
    prompt: 'Which line of **dialogue** best shows that a character is nervous?',
    choices: ['“I-I’m sure it’s fine,” Maya whispered, twisting her sleeve.', '“I am nervous,” said Maya.', '“Hello,” said Maya.', '“Let’s go,” Maya said.'],
    answer: 0,
    working: 'The stammer, the whisper and the **twisting** show nerves without naming them.',
    ask: 'Which line of dialogue best shows that a character is nervous? A: I, I am sure it is fine, Maya whispered, twisting her sleeve. B: I am nervous, said Maya. C: Hello, said Maya. D: Let us go, Maya said.',
    reveal: 'The answer is A. The stammer, the whisper and the twisting sleeve show that Maya is nervous without saying it. B tells us, but does not show us.',
  },
  sum: [
    ['A **hook** makes the reader want to read on', 'Here is what to remember. A hook makes the reader want to read on.'],
    ['Start in the **action**, or raise a **question**', 'Start in the action, or raise a question the reader wants answered.'],
    ['Do not **announce** the story; names and dates can wait', 'Do not announce the story, and save names and dates for later. For more on narrative writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
