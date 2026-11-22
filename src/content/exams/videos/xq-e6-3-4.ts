import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 3.4 (author's purpose and point of view). An exam-style question we
// wrote, in the style of a Grade 6 reading test, on a passage we wrote. The answer is C: the writer
// admits zoos have a good side, but the loaded words and the ending show they think zoos should change.

const PASSAGE = [
  'Some zoos do valuable work: they breed rare animals and teach visitors about wildlife. Yet too many still keep elephants, which walk many kilometres a day in the wild, in small, bare enclosures.',
  'An elephant pacing the same few metres, hour after hour, is not a lesson in nature. It is a warning. If zoos want our respect, they must give every animal the space it needs, or stop keeping it.',
];

export default englishExam({
  lesson: 'e6-3-4',
  ...ours('a Grade 6 reading test', 'the passage is by Gradileo'),
  title: 'What Is the Writer’s Point of View About Zoos?',
  thumbnailTitle: 'Author’s Point of View',
  subtitle: 'Purpose and viewpoint, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a writer discusses zoos and elephants, and we work out their point of view. We separate what they admit from what they argue, notice their loaded words, and use the ending to decide.',
  intro: [
    'In this video, we solve an exam-style reading question about an author’s point of view. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 6 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Some zoos do valuable work: they breed rare animals and teach visitors about wildlife. Yet too many still keep elephants, which walk many kilometres a day in the wild, in small, bare enclosures.',
      'An elephant pacing the same few metres, hour after hour, is not a lesson in nature. It is a warning. If zoos want our respect, they must give every animal the space it needs, or stop keeping it.',
    ],
  },
  question: {
    prompt: 'Which sentence best describes the writer’s **point of view** about zoos?',
    text: 'Read the passage about zoos. Which sentence best describes the writer’s point of view about zoos?',
    choices: ['Zoos are perfect places for all animals.', 'Zoos should be closed down at once.', 'Zoos can do good, but they must change how they keep animals like elephants.', 'The writer has no opinion about zoos.'],
    answer: 2,
    working: 'The writer admits “valuable work”, but “too many”, “warning” and “must” show they want change.',
    say: [
      'Which sentence best describes the writer’s point of view about zoos?',
      'A: Zoos are perfect places for all animals. B: Zoos should be closed down at once. C: Zoos can do good, but they must change how they keep animals like elephants. D: The writer has no opinion about zoos.',
    ],
  },
  ask: [
    ['**Point of view** is the writer’s **opinion**', 'Here, point of view means the writer’s opinion, or attitude, towards zoos.'],
    ['Find the choice that matches **all** of what they say', 'We need the choice that matches everything they say, not just one part.'],
  ],
  know: {
    title: 'Author’s purpose and point of view',
    md: 'An author’s **purpose** is **why** they write: to **inform**, **persuade** or **entertain**. Their **point of view** is their **opinion**. Clues: **loaded words**, what they **admit**, and how they **end**.',
    say: [
      'Here is the idea we need. An author’s purpose is why they write: to inform, to persuade or to entertain. Their point of view is their opinion on the topic.',
      'Clues to the point of view include loaded words, which carry strong feelings, what the writer admits on the other side, and how they end.',
    ],
  },
  plan: [
    ['What does the writer **admit**?', 'Here is the plan. First, what does the writer admit is good?'],
    ['What do their **loaded words** show?', 'Second, what do their loaded words show?'],
    ['What does the **ending** call for?', 'Third, what does the ending call for?'],
  ],
  steps: [
    scene('Step 1: What the writer admits, and argues', [quote('p', ['Some zoos do [[good:valuable work]]: they breed rare animals and teach visitors about wildlife. Yet [[bad:too many]] still keep elephants… in [[bad:small, bare]] enclosures.', 'An elephant [[bad:pacing]] the same few metres… is not a lesson in nature. It is a [[bad:warning]]. If zoos want our respect, they [[theta:must]] give every animal the space it needs, or stop keeping it.'])], [
      { say: 'Step one. The writer admits that some zoos do valuable work. So they do not think all zoos are bad.', show: 'p', focus: 'p.0' },
      { say: 'But then comes yet, and loaded words: too many, small, bare, pacing, a warning. These words make us feel sorry for the elephants.', focus: ['p.0', 'p.1'] },
      { say: 'The ending says zoos must give animals space, or stop keeping them. That calls for change.', focus: 'p.1' },
    ]),
    scene('Step 2: Match the choices', [table('t', ['Choice', 'Fits?'], [['A: perfect for all animals', '[[bad:✗ ignores the criticism]]'], ['B: closed at once', '[[bad:✗ the writer admits valuable work]]'], ['C: can do good, but must change', '[[good:✓ both sides of the passage]]'], ['D: no opinion', '[[bad:✗ “must”, “warning”]]']])], [
      { say: 'Step two. A ignores all the criticism.', show: 't.0' },
      { say: 'B goes too far. The writer admits that zoos do valuable work, and only says zoos must give space or stop keeping some animals.', show: 't.1' },
      { say: 'C matches both halves: zoos can do good, but must change.', show: 't.2', focus: 't.2' },
      { say: 'D is wrong: words like must and warning show a strong opinion. The answer is C.', show: 't.3' },
    ]),
  ],
  check: [
    ['C fits the **admission** and the **demand**', 'Let us check. C fits both the writer’s admission and their demand.'],
    ['Purpose: to **persuade** zoos to change', 'And it tells us the purpose too: this writer wants to persuade zoos to change.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Too **extreme**: ignores “valuable work”', 'Choice B is the strongest trap. The angry words make the writer seem against all zoos, but they admit some zoos do valuable work.'],
      ['A', 'Takes only the **first** sentence', 'Choice A takes only the first sentence and ignores the rest.'],
      ['D', 'Mistakes a **fair** start for **no** opinion', 'Choice D mistakes the fair start for having no opinion.'],
    ],
  },
  yourTurn: {
    prompt: '*Video games can teach problem-solving, but many children now play for hours every night. Families should set clear limits, so that games stay a treat and not a habit.* What is the writer’s point of view?',
    choices: ['Video games should be banned.', 'Children should play as much as they like.', 'Video games are boring.', 'Games have benefits, but playing time should be limited.'],
    answer: 3,
    working: 'The writer admits a benefit, then argues for limits.',
    ask: 'Video games can teach problem-solving, but many children now play for hours every night. Families should set clear limits, so that games stay a treat and not a habit. What is the writer’s point of view?',
    reveal: 'The answer is D. The writer admits a benefit, problem-solving, then argues for limits. Banning is too extreme, and B is the opposite.',
  },
  sum: [
    ['**Point of view** = the writer’s opinion · **purpose** = why they write', 'Here is what to remember. Point of view is the writer’s opinion, and purpose is why they write.'],
    ['Use **loaded words**, what they **admit**, and the **ending**', 'Use the loaded words, what the writer admits, and how they end.'],
    ['Avoid answers that are too **extreme** or take only **one part**', 'And avoid answers that are too extreme, or that use only one part of the passage. For more on author’s purpose and point of view, watch this lesson’s explainer video on Gradileo.'],
  ],
});
