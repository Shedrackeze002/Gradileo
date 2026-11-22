import { englishExam, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 3.3 (text structures). An exam-style question we wrote, in the style of
// the key stage 2 English reading test, on a paragraph we wrote. The answer is A, cause and effect:
// heavy rain causes the river to flood, which causes the road to close and the school to shut.

const PASSAGE = [
  'Last week, it rained for five days without stopping. Because the ground was already soaked, the water ran straight into the River Lune, and the river burst its banks.',
  'As a result, the main road into town was flooded and had to be closed. The buses could not get through, so the school stayed shut for two days.',
];

export default englishExam({
  lesson: 'e5-3-3',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question and passage by Gradileo',
  verbatim: false,
  title: 'How Is the Passage About the Flood Organised?',
  thumbnailTitle: 'Text Structures',
  subtitle: 'Signal words, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: how is a short report about a flood organised? We hunt for signal words, follow the chain of events, and decide between sequence, compare and contrast, cause and effect, and problem and solution.',
  intro: [
    'In this video, we solve an exam-style reading question about how a text is organised. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of the reading test that eleven-year-olds take in England.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Last week, it rained for five days without stopping. Because the ground was already soaked, the water ran straight into the River Lune, and the river burst its banks.',
      'As a result, the main road into town was flooded and had to be closed. The buses could not get through, so the school stayed shut for two days.',
    ],
  },
  question: {
    prompt: 'How is this passage mainly organised?',
    text: 'Read the passage about the flood. How is this passage mainly organised?',
    choices: ['cause and effect', 'compare and contrast', 'problem and solution', 'a list of instructions'],
    answer: 0,
    working: 'Signal words **because**, **as a result** and **so** link each event to what it caused.',
    say: ['How is this passage mainly organised? A: cause and effect. B: compare and contrast. C: problem and solution. D: a list of instructions.'],
  },
  ask: [
    ['**How** are the ideas connected?', 'The question is not about what happened. It asks how the ideas are connected to each other.'],
    ['That connection is the **text structure**', 'The way a writer connects ideas is called the text structure.'],
  ],
  know: {
    title: 'Text structures and signal words',
    md: '**Sequence**: first, next, then. **Compare and contrast**: both, but, however. **Cause and effect**: because, so, as a result. **Problem and solution**: the problem, to fix this.',
    say: [
      'Here is what we need. Information texts are often organised in one of a few structures, and each has its own signal words.',
      'Sequence puts events in order, with words like first, next and then. Compare and contrast shows how things are alike and different, with words like both, but and however.',
      'Cause and effect shows why something happened, with because, so and as a result. And problem and solution names a problem, then how it was fixed.',
    ],
  },
  plan: [
    ['Find the **signal words**', 'Here is the plan. First, find the signal words.'],
    ['Follow how each event **links** to the next', 'Second, follow how each event links to the next.'],
    ['Name the **structure**', 'Third, name the structure.'],
  ],
  steps: [
    scene('Step 1: Signal words', [quote('p', ['Last week, it rained for five days without stopping. [[theta:Because]] the ground was already soaked, the water ran straight into the River Lune, and the river burst its banks.', '[[theta:As a result]], the main road into town was flooded and had to be closed. The buses could not get through, [[theta:so]] the school stayed shut for two days.'])], [
      { say: 'Step one. Pause and look for signal words.', show: 'p', wait: 3 },
      { say: 'Here they are: because, as a result, and so. All three are cause and effect words.', focus: ['p.0', 'p.1'] },
    ]),
    scene('Step 2: The chain', [table('c', ['Cause', '', 'Effect'], [['five days of rain on soaked ground', '→', 'the river bursts its banks'], ['the river floods', '→', 'the road is closed'], ['the road is closed', '→', 'the buses cannot get through'], ['no buses', '→', 'the school stays shut']])], [
      { say: 'Step two. Now follow the chain. The rain on soaked ground makes the river burst its banks.', show: 'c.0' },
      { say: 'The flood closes the road.', show: 'c.1' },
      { say: 'The closed road stops the buses, and with no buses, the school stays shut.', show: ['c.2', 'c.3'] },
      { say: 'Every event causes the next one, like a row of falling dominoes.' },
    ]),
    scene('Step 3: The answer', [text('ans', '**A. Cause and effect**: each event causes the next.', 'lg')], [
      { say: 'Step three. A passage where each event causes the next is organised by cause and effect. The answer is A.', show: 'ans' },
    ]),
  ],
  check: [
    ['The signal words are all **cause and effect** words', 'Let us check. Every signal word in the passage is a cause and effect word.'],
    ['Nothing is **compared**, nothing is **fixed**, nothing is **instructed**', 'Nothing is compared, no one fixes the flood, and no one is told what to do. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'A flood **is** a problem, but no **solution** is given', 'Choice C is the big trap. A flood is certainly a problem, but problem and solution needs a solution, and nobody fixes anything here.'],
      ['B', 'Nothing is **compared**', 'Choice B needs two things compared, and the passage compares nothing.'],
      ['D', 'There are **no** instructions', 'Choice D would tell the reader what to do, step by step. This passage reports what happened.'],
    ],
  },
  yourTurn: {
    prompt: '*Frogs and toads are both amphibians, and both lay eggs in water. However, frogs have smooth, wet skin, while toads have dry, bumpy skin.* How is this passage organised?',
    choices: ['sequence', 'cause and effect', 'compare and contrast', 'problem and solution'],
    answer: 2,
    working: 'Signal words **both**, **however** and **while** show likenesses and differences.',
    ask: 'Frogs and toads are both amphibians, and both lay eggs in water. However, frogs have smooth, wet skin, while toads have dry, bumpy skin. How is this passage organised?',
    reveal: 'The answer is C, compare and contrast. The signal words both, however and while show how frogs and toads are alike and how they are different.',
  },
  sum: [
    ['**Text structure** is how the ideas are connected', 'Here is what to remember. Text structure is how a writer connects the ideas.'],
    ['**Signal words** point to the structure', 'Signal words point to the structure: because, so and as a result mean cause and effect.'],
    ['Problem and solution needs a **solution**', 'And problem and solution needs a solution, not just a problem. For more on text structures, watch this lesson’s explainer video on Gradileo.'],
  ],
});
