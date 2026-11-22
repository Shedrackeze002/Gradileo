import { englishExam, ours, quote, scene, table } from '../english.ts';

// Grade 7 English, lesson 1.1 (conflict and suspense). An exam-style question we wrote, in the style
// of a Grade 7 reading test, on a passage we wrote. The answer is C: the short sentences, the ticking
// clock and the unseen footsteps all slow the moment down and keep us waiting.

const PASSAGE = [
  'Nadia pressed herself against the cupboard door. Footsteps. Slow ones. They stopped outside the room.',
  'The clock on the wall ticked. Once. Twice. The door handle began to turn.',
];

export default englishExam({
  lesson: 'e7-1-1',
  ...ours('a Grade 7 reading test', 'the passage is by Gradileo'),
  title: 'How Does the Writer Build Suspense?',
  thumbnailTitle: 'Building Suspense',
  subtitle: 'Conflict and suspense, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: Nadia hides in a cupboard while footsteps come closer, and we explain how the writer builds suspense. We learn the main tools of suspense, find them in the passage, and match them to the best answer.',
  intro: [
    'In this video, we solve an exam-style reading question about suspense. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 7 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Nadia pressed herself against the cupboard door. Footsteps. Slow ones. They stopped outside the room.',
      'The clock on the wall ticked. Once. Twice. The door handle began to turn.',
    ],
  },
  question: {
    prompt: 'How does the writer **mainly** build suspense in this passage?',
    text: 'Read the passage about Nadia. How does the writer mainly build suspense in this passage?',
    choices: [
      'by describing Nadia’s home in detail',
      'by explaining who is outside the door',
      'by using short sentences and slow, small sounds that delay what happens',
      'by using long sentences full of dialogue',
    ],
    answer: 2,
    working: 'Short sentences (*Footsteps. Slow ones.*), the ticking clock and the turning handle **slow time** and keep the danger **unseen**.',
    say: [
      'How does the writer mainly build suspense in this passage?',
      'A: by describing Nadia’s home in detail. B: by explaining who is outside the door. C: by using short sentences and slow, small sounds that delay what happens. D: by using long sentences full of dialogue.',
    ],
  },
  ask: [
    ['**Suspense** is the feeling of **waiting** to find out', 'Suspense is that tense feeling of waiting to find out what will happen.'],
    ['**How** does the writer create it here?', 'The question asks how this writer creates it.'],
  ],
  know: {
    title: 'Tools for building suspense',
    md: 'Writers build suspense with **short sentences** that make us read in bursts, by **slowing time** with small details (a clock, a sound), by keeping the danger **unseen**, and by **delaying** the moment we are waiting for.',
    say: [
      'Here is the idea we need. Writers build suspense in a few main ways. Short sentences make us read in quick, tense bursts.',
      'Small details, like a ticking clock or a sound, slow time down. Keeping the danger unseen makes us imagine the worst. And delaying the big moment keeps us waiting.',
    ],
  },
  plan: [
    ['Look at the **sentence lengths**', 'Here is the plan. First, look at the length of the sentences.'],
    ['Find the **details** that slow time', 'Second, find the details that slow time down.'],
    ['Ask what is kept **hidden**', 'Third, ask what the writer keeps hidden.'],
  ],
  steps: [
    scene('Step 1: The tools in the passage', [quote('p', ['Nadia pressed herself against the cupboard door. [[theta:Footsteps.]] [[theta:Slow ones.]] They stopped outside the room.', 'The clock on the wall [[theta:ticked]]. [[theta:Once.]] [[theta:Twice.]] The door handle [[theta:began to turn]].'])], [
      { say: 'Step one. Pause and find the parts that make you tense.', show: 'p', wait: 3 },
      { say: 'Footsteps. Slow ones. Once. Twice. These sentences are only one or two words long, so we read in short, nervous bursts.', focus: ['p.0', 'p.1'] },
      { say: 'The ticking clock counts out the seconds, and the handle only begins to turn. Time is slowed right down.', focus: 'p.1' },
      { say: 'And we never find out who is outside. The danger stays unseen.' },
    ]),
    scene('Step 2: Match the choices', [table('t', ['Choice', 'In the passage?'], [['A: home in detail', '[[bad:✗ only a cupboard and a clock]]'], ['B: explains who is outside', '[[bad:✗ it is kept hidden]]'], ['C: short sentences, slow sounds', '[[good:✓ Footsteps. Once. Twice.]]'], ['D: long sentences, dialogue', '[[bad:✗ no one speaks]]']])], [
      { say: 'Step two. A: there is almost no description of the home.', show: 't.0' },
      { say: 'B is the opposite: the writer hides who is outside.', show: 't.1' },
      { say: 'D: the sentences are short, and nobody speaks.', show: 't.3' },
      { say: 'C matches everything we found. The answer is C.', show: 't.2', focus: 't.2' },
    ]),
  ],
  check: [
    ['Rewrite it with **long** sentences and it loses its **tension**', 'Let us check. Imagine the passage as one long, calm sentence. The tension would drain away.'],
    ['The suspense comes from **short bursts** and **delay**', 'So the suspense comes from the short bursts and the delay. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Telling us **who** would **end** the suspense', 'Choice B is the trap. If the writer told us who was outside, the suspense would end.'],
      ['A', 'There is very little **description**', 'Choice A: there is very little description of the place.'],
      ['D', 'The sentences are **short**, with no **dialogue**', 'Choice D gets the sentences backwards.'],
    ],
  },
  yourTurn: {
    prompt: '*Leo wanted to tell the truth about the broken window, but he was afraid of losing his best friend.* What kind of **conflict** does Leo face?',
    choices: ['internal conflict: a struggle inside his own mind', 'external conflict with nature', 'external conflict with society', 'no conflict at all'],
    answer: 0,
    working: 'Leo is torn between **two feelings**: the truth and his fear.',
    ask: 'Leo wanted to tell the truth about the broken window, but he was afraid of losing his best friend. What kind of conflict does Leo face? A: internal conflict, a struggle inside his own mind. B: external conflict with nature. C: external conflict with society. D: no conflict at all.',
    reveal: 'The answer is A, internal conflict. Leo is torn between telling the truth and his fear of losing his friend, and that struggle happens inside his own mind.',
  },
  sum: [
    ['**Suspense** keeps the reader waiting and worried', 'Here is what to remember. Suspense keeps the reader waiting and worried.'],
    ['Tools: **short sentences**, **slowed time**, **hidden** danger, **delay**', 'Writers build it with short sentences, slowed time, hidden danger and delay.'],
    ['Explain **how** each tool affects the reader', 'And in an answer, explain how each tool affects the reader. For more on conflict and suspense, watch this lesson’s explainer video on Gradileo.'],
  ],
});
