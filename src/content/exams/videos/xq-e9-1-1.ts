import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 1.1 (the structure of a novel). An exam-style question we wrote, in the
// style of a Grade 9 reading test, on two passages we wrote. The answer is A: Passage 1 summarises
// months in one sentence (fast pace), while Passage 2 stretches seconds over many details (slow pace).

const PASSAGES = [
  '**Passage 1:** The winter passed slowly. Leila trained every morning, failed her first two tests, and by March had almost given up.',
  '**Passage 2:** Leila stepped onto the ice. The crowd went silent. She could hear her own breathing, the scrape of her blade, the hum of the lights. Her coach’s face was a blur. She raised her arms.',
];

export default englishExam({
  lesson: 'e9-1-1',
  ...ours('a Grade 9 reading test', 'the passages are by Gradileo'),
  title: 'How Does the Writer Control the Pace?',
  thumbnailTitle: 'Pace in a Novel',
  subtitle: 'Summary and scene, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: two passages from the same novel cover very different amounts of time. We compare how much time each covers with how many words it uses, and explain how the writer speeds up and slows down the story.',
  intro: [
    'In this video, we solve an exam-style reading question about pace in a novel. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passages ourselves, in the style of a Grade 9 reading test.',
  ],
  passage: {
    lines: PASSAGES,
    by: 'Passages written for Gradileo',
    say: [
      'First, read the two passages. Passage one: The winter passed slowly. Leila trained every morning, failed her first two tests, and by March had almost given up.',
      'Passage two: Leila stepped onto the ice. The crowd went silent. She could hear her own breathing, the scrape of her blade, the hum of the lights. Her coach’s face was a blur. She raised her arms.',
    ],
  },
  question: {
    prompt: 'How does the writer control **pace** in these two passages?',
    text: 'Read the two passages about Leila. How does the writer control pace in these two passages?',
    choices: [
      'Passage 1 speeds through months in summary; Passage 2 slows a few seconds down with sensory detail.',
      'Both passages move at the same speed.',
      'Passage 1 is slow because it uses long words; Passage 2 is fast because it has short sentences.',
      'Passage 2 is a flashback to before Passage 1.',
    ],
    answer: 0,
    working: 'Passage 1: **months** in **one** sentence (fast). Passage 2: **seconds** over **five** sentences of detail (slow).',
    say: [
      'How does the writer control pace in these two passages?',
      'A: Passage one speeds through months in summary; passage two slows a few seconds down with sensory detail. B: Both passages move at the same speed. C: Passage one is slow because it uses long words; passage two is fast because it has short sentences. D: Passage two is a flashback to before passage one.',
    ],
  },
  ask: [
    ['**Pace** is how fast the story seems to move', 'Pace is how fast the story seems to move.'],
    ['How does the writer **change** it?', 'We need to explain how the writer changes it.'],
  ],
  know: {
    title: 'Structure and pace',
    md: 'Novels are built from **chapters**, **scenes** and **summary**, and may use **flashbacks** or **multiple narrators**. **Pace** depends on how much **story time** passes compared with how many **words** are used. **Summary** covers a lot of time quickly (**fast**). A detailed **scene** stretches a short moment (**slow**).',
    say: [
      'Here is the idea we need. Novels are built from chapters, scenes and summary, and may use flashbacks or several narrators.',
      'Pace depends on how much story time passes compared with how many words the writer uses. Summary covers a lot of time quickly, which feels fast. A detailed scene stretches a short moment, which feels slow.',
    ],
  },
  plan: [
    ['How much **time** does each passage cover?', 'Here is the plan. First, how much time does each passage cover?'],
    ['How many **words** and **details**?', 'Second, how many words and details does each use?'],
    ['Compare: **fast** or **slow**?', 'Third, compare them: fast or slow?'],
  ],
  steps: [
    scene('Step 1: Time against words', [table('t', ['', 'Story time', 'Words and detail', 'Pace'], [['Passage 1', '**months** (winter to March)', '**one** summary sentence', '[[theta:fast]]'], ['Passage 2', '**seconds**', '**five** sentences of sound and sight', '[[theta:slow]]']])], [
      { say: 'Step one. Passage one covers a whole winter, from training to March, in just one sentence. That is summary, and it feels fast.', show: 't.0' },
      { say: 'Passage two covers a few seconds, but uses five sentences full of detail: her breathing, the scrape of her blade, the hum of the lights. That stretches the moment, so it feels slow.', show: 't.1' },
    ]),
    scene('Step 2: Why?', [text('a', 'Skip the dull months; **slow down** the big moment → **A**', 'lg')], [
      { say: 'Step two. The writer rushes through the months of training, then slows right down at the big moment, so we feel its tension. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['The short sentences in Passage 2 add **tension**', 'Let us check. Passage two’s short sentences add tension, but it is still slow: very little time passes.'],
    ['Pace is about **time** against **words**', 'Pace is about story time against words. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '**Short sentences** feel quick, but the **moment** is stretched', 'Choice C is the trap. Short sentences can feel quick, but Passage two spends many words on a few seconds, so the story slows.'],
      ['B', 'Months versus **seconds**', 'Choice B: months against seconds is not the same speed.'],
      ['D', 'Passage 2 comes **after** March', 'Choice D: Passage two comes after the winter, not before it.'],
    ],
  },
  yourTurn: {
    prompt: 'A novel tells the same day from **two characters’** points of view, in alternating chapters. This structure is called:',
    choices: ['multiple narrators', 'a flashback', 'in medias res', 'a summary'],
    answer: 0,
    working: 'Two characters take turns **narrating**.',
    ask: 'A novel tells the same day from two characters’ points of view, in alternating chapters. This structure is called: A: multiple narrators. B: a flashback. C: in medias res. D: a summary.',
    reveal: 'The answer is A, multiple narrators. Each chapter is told by a different character, so we see events from more than one side.',
  },
  sum: [
    ['**Pace** = story time compared with words', 'Here is what to remember. Pace compares story time with the number of words.'],
    ['**Summary** speeds up · detailed **scene** slows down', 'Summary speeds the story up, and a detailed scene slows it down.'],
    ['Writers slow down for **key moments**', 'Writers slow down for key moments. For more on the structure of a novel, watch this lesson’s explainer video on Gradileo.'],
  ],
});
