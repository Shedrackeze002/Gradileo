import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 6.1 (the paragraph). An exam-style question we wrote, in the style of a
// Grade 5 writing and editing test, on a paragraph we wrote. The answer is C: sentence 4 is about
// the writer's sister's broken bike, not about why cycling to school is a good idea.

const PARAGRAPH = [
  '(1) Cycling to school is a great way to start the day.',
  '(2) It gives you exercise before you have even sat down at your desk.',
  '(3) It is also kinder to the planet than going by car.',
  '(4) My sister’s bike has a flat tyre at the moment.',
  '(5) Best of all, you arrive feeling awake and ready to learn.',
];

export default englishExam({
  lesson: 'e5-6-1',
  ...ours('a Grade 5 writing and editing test', 'the paragraph is by Gradileo'),
  title: 'Which Sentence Does Not Belong in the Paragraph?',
  thumbnailTitle: 'Stay on Topic',
  subtitle: 'Topic sentences, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a paragraph about cycling to school has one sentence that does not belong. We find the topic sentence, test every other sentence against it, and remove the one that wanders off topic.',
  intro: [
    'In this video, we solve an exam-style writing question about paragraphs. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its paragraph ourselves, in the style of a Grade 5 writing and editing test.',
  ],
  passage: {
    lines: PARAGRAPH,
    by: 'A paragraph written for Gradileo',
    say: ['First, read the paragraph. One: cycling to school is a great way to start the day. Two: it gives you exercise before you have even sat down at your desk. Three: it is also kinder to the planet than going by car. Four: my sister’s bike has a flat tyre at the moment. Five: best of all, you arrive feeling awake and ready to learn.'],
  },
  question: {
    prompt: 'Which sentence does **not** belong in this paragraph?',
    text: 'Read the paragraph about cycling to school. Which sentence does not belong in this paragraph?',
    choices: ['sentence 2', 'sentence 3', 'sentence 4', 'sentence 5'],
    answer: 2,
    working: 'Sentences 2, 3 and 5 give reasons cycling is great; sentence 4 is about a broken bike.',
    say: ['Which sentence does not belong in this paragraph? A: sentence 2. B: sentence 3. C: sentence 4. D: sentence 5.'],
  },
  ask: [
    ['A paragraph is about **one** main idea', 'A good paragraph is about one main idea.'],
    ['Which sentence is **off topic**?', 'So the question asks which sentence wanders away from that idea.'],
  ],
  know: {
    title: 'Topic sentences',
    md: 'A paragraph usually opens with a **topic sentence** that states its main idea. Every other sentence should **support** it: a reason, an example or a detail. A sentence that does not is **off topic**.',
    say: [
      'Here is the idea we need. A paragraph usually opens with a topic sentence, which states its main idea.',
      'Every other sentence should support that idea, with a reason, an example or a detail. A sentence that does not support it is off topic, and should be taken out.',
    ],
  },
  plan: [
    ['Find the **topic sentence**', 'Here is the plan. First, find the topic sentence.'],
    ['Test each other sentence: does it **support** it?', 'Second, test each other sentence: does it support the topic sentence?'],
  ],
  steps: [
    scene('Step 1: The topic sentence', [quote('p', PARAGRAPH.slice(0, 1)), text('n', 'Main idea: cycling to school is **a good idea**. The rest should say **why**.')], [
      { say: 'Step one. The first sentence says cycling to school is a great way to start the day. That is the main idea, so it is the topic sentence.', show: 'p' },
      { say: 'Every other sentence should tell us why cycling to school is great.', show: 'n' },
    ]),
    scene('Step 2: Test each sentence', [
      table('t', ['Sentence', 'Says why cycling is great?'], [['2: exercise before school', '[[good:✓ a reason]]'], ['3: kinder to the planet', '[[good:✓ a reason]]'], ['4: sister’s bike has a flat tyre', '[[bad:✗ not a reason]]'], ['5: you arrive awake and ready', '[[good:✓ a reason]]']]),
    ], [
      { say: 'Step two. Pause and test each sentence: does it give a reason cycling to school is great?', wait: 3 },
      { say: 'Sentence 2: it gives you exercise. Yes, a reason.', show: 't.0' },
      { say: 'Sentence 3: it is kinder to the planet. Another reason.', show: 't.1' },
      { say: 'Sentence 4: my sister’s bike has a flat tyre. That is about bikes, but it is not a reason cycling is great. If anything, it is a reason not to cycle today.', show: 't.2', focus: 't.2' },
      { say: 'Sentence 5: you arrive awake and ready to learn. A reason, and a strong one to finish on.', show: 't.3' },
      { say: 'So sentence 4 does not belong. The answer is C.' },
    ]),
  ],
  check: [
    ['Read it **without** sentence 4: it flows', 'Let us check by reading the paragraph without sentence 4. Exercise, the planet, arriving ready to learn: it flows from one reason to the next.'],
    ['Sentence 4 shares a **word**, bike, but not the **idea**', 'Sentence 4 shares a topic word, bike, with the paragraph, but not its idea.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', '**Best of all** sounds like an ending, but it is a reason', 'Sentence 5 starts with best of all, which might sound like a new idea. It is actually the strongest reason, saved for last.'],
      ['B', 'The **planet** seems far from school, but it is a reason to cycle', 'Sentence 3 talks about the planet, which seems far from school. But it is a reason to cycle instead of going by car.'],
      ['A', 'Exercise is a **clear** reason', 'Sentence 2 is a clear reason.'],
    ],
  },
  yourTurn: {
    prompt: '(1) Owls are skilful night hunters. (2) Their huge eyes see well in the dark. (3) Their soft feathers let them fly almost silently. (4) Owls appear in many old stories. Which sentence does **not** belong?',
    choices: ['sentence 4', 'sentence 2', 'sentence 3', 'sentence 1'],
    answer: 0,
    working: 'Sentences 2 and 3 explain how owls hunt at night; sentence 4 is about stories.',
    ask: 'One: owls are skilful night hunters. Two: their huge eyes see well in the dark. Three: their soft feathers let them fly almost silently. Four: owls appear in many old stories. Which sentence does not belong?',
    reveal: 'The answer is A, sentence 4. Sentences 2 and 3 explain how owls hunt at night. Old stories have nothing to do with hunting.',
  },
  sum: [
    ['The **topic sentence** states the main idea', 'Here is what to remember. The topic sentence states the paragraph’s main idea.'],
    ['Every other sentence must **support** it', 'Every other sentence must support it.'],
    ['Sharing a **word** is not enough: it must share the **idea**', 'And a sentence must share the idea, not just a word. For more on writing paragraphs, watch this lesson’s explainer video on Gradileo.'],
  ],
});
