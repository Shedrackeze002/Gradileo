import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 1.1 (structure and pacing). An exam-style question we wrote, in the style of a
// Grade 11 reading test, on the structure of Mary Shelley's Frankenstein (1818), which is in the public
// domain. The answer is C: Victor's story sits inside Walton's letters, which is a frame narrative.

const SUMMARY = ['Frankenstein opens with **letters** from Robert Walton, an explorer in the Arctic, to his sister. Walton rescues **Victor Frankenstein** from the ice, and Victor tells him his life story. Inside Victor’s story, the **creature** tells *his* story. The novel ends with **Walton’s letters** again.'];

export default englishExam({
  lesson: 'e11-1-1',
  ...ours('a Grade 11 reading test', 'the novel is Mary Shelley’s Frankenstein (1818), in the public domain'),
  title: 'How Is Frankenstein Structured?',
  thumbnailTitle: 'Frame Narrative',
  subtitle: 'Structure and pacing, step by step',
  summary:
    'An exam-style question on the structure of Mary Shelley’s Frankenstein, solved one small step at a time. We map the novel’s layers, from Walton’s letters to Victor’s tale to the creature’s, name the structure, and explain what it adds.',
  intro: [
    'In this video, we solve an exam-style question about the structure of a novel. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Mary Shelley’s novel, which is in the public domain.',
  ],
  passage: {
    lines: SUMMARY,
    by: 'A summary of the structure of Mary Shelley’s Frankenstein (1818)',
    say: ['First, read this summary of how the novel is built. Frankenstein opens with letters from Robert Walton, an explorer in the Arctic, to his sister. Walton rescues Victor Frankenstein from the ice, and Victor tells him his life story. Inside Victor’s story, the creature tells his own story. The novel ends with Walton’s letters again.'],
  },
  question: {
    prompt: 'Victor’s story is told **inside** Walton’s letters, which open and close the novel. What is this structure called?',
    text: 'Read the summary of Frankenstein’s structure. Victor’s story is told inside Walton’s letters, which open and close the novel. What is this structure called?',
    choices: ['chronological', 'parallel plots', 'a frame narrative', 'stream of consciousness'],
    answer: 2,
    working: 'An **outer** story (Walton) holds an **inner** story (Victor), like a **frame** around a picture.',
    say: ['Victor’s story is told inside Walton’s letters, which open and close the novel. What is this structure called? A: chronological. B: parallel plots. C: a frame narrative. D: stream of consciousness.'],
  },
  ask: [
    ['One story sits **inside** another', 'In this novel, one story sits inside another.'],
    ['What is that **structure** called?', 'We need the name of that structure.'],
  ],
  know: {
    title: 'Structure and pacing',
    md: '**Chronological**: events in time order. **Non-linear**: out of order, with **flashbacks** or a start **in medias res** (in the middle of things). **Frame narrative**: an **outer** story **contains** an inner one. **Circular**: the ending **returns** to the opening. **Pacing**: a **scene** shows moments in detail and **slows** time; a **summary** covers long stretches quickly and **speeds** it up.',
    say: [
      'Here is the idea we need. A chronological structure tells events in time order. A non-linear one tells them out of order, with flashbacks, or by starting in the middle of things. A frame narrative has an outer story that contains an inner one, and a circular structure ends by returning to its opening.',
      'Pacing matters too. A scene shows moments in detail and slows time down, while a summary covers long stretches quickly and speeds it up.',
    ],
  },
  plan: [
    ['Map the **layers**', 'Here is the plan. First, map the layers of the story.'],
    ['Name the **structure**', 'Second, name the structure.'],
    ['Explain the **effect**', 'Third, explain its effect.'],
  ],
  steps: [
    scene('Step 1: The layers', [table('t', ['Layer', 'Narrator', 'Where'], [['outer', '**Walton**', 'letters at the **start** and **end**'], ['middle', '**Victor**', 'told to Walton'], ['inner', 'the **creature**', 'told to Victor']])], [
      { say: 'Step one. The outer layer is Walton’s letters, at the start and the end.', show: 't.0' },
      { say: 'Inside them, Victor tells his story to Walton. And inside Victor’s story, the creature tells his own. The stories nest, one inside another.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Name and effect', [text('a', 'An outer story **framing** inner ones → **frame narrative** → **C**', 'lg'), text('n', 'Effect: we hear **three** voices, and must judge **whom to believe**')], [
      { say: 'Step two. An outer story framing inner ones is a frame narrative. The answer is C.', show: 'a' },
      { say: 'The effect: we hear three different voices, and must judge whom to believe, Victor or his creature.', show: 'n' },
    ]),
  ],
  check: [
    ['Walton’s letters **open** and **close** the book', 'Let us check. Walton’s letters open and close the book, like the two sides of a frame.'],
    ['So C holds', 'So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Victor’s tale **starts** in the past, after the ending', 'Choice A is the trap. Victor tells his story in order, but the novel itself begins near the end, in the Arctic.'],
      ['B', 'The stories are **nested**, not side by side', 'Choice B: the stories are nested, not running side by side.'],
      ['D', 'Not an unbroken flow of **thoughts**', 'Choice D: the novel is not a flow of one mind’s thoughts.'],
    ],
  },
  yourTurn: {
    prompt: 'Which of these **slows time down** the most in a story?',
    choices: ['A detailed scene of one minute, told over two pages.', '“Three years passed.”', 'A summary of a whole summer in one line.', 'A jump forward to the next morning.'],
    answer: 0,
    working: 'A **scene** in close detail **stretches** time.',
    ask: 'Which of these slows time down the most in a story? A: A detailed scene of one minute, told over two pages. B: Three years passed. C: A summary of a whole summer in one line. D: A jump forward to the next morning.',
    reveal: 'The answer is A. Two pages for one minute stretches time out, which builds tension or importance.',
  },
  sum: [
    ['**Frame narrative**: a story inside a story', 'Here is what to remember. A frame narrative is a story inside a story.'],
    ['**Non-linear**: flashbacks, *in medias res*', 'A non-linear structure uses flashbacks, or starts in the middle of things.'],
    ['**Scene** slows time; **summary** speeds it', 'And a scene slows time, while a summary speeds it up. For more on structure and pacing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
