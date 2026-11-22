import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 1.1 (narrative technique and time). An exam-style question we wrote, in the
// style of a Grade 12 reading test, on Virginia Woolf's Mrs Dalloway (1925), which is in the public
// domain. The answer is A: the narration follows Clarissa's thoughts, sliding from a June morning in
// London into a memory of her youth at Bourton.

const LINES = ['What a lark! What a plunge! For so it had always seemed to her, when, with a little squeak of the hinges, which she could hear now, she had burst open the French windows and plunged at Bourton into the open air.'];

export default englishExam({
  lesson: 'e12-1-1',
  ...ours('a Grade 12 reading test', 'the novel is Virginia Woolf’s Mrs Dalloway (1925), in the public domain'),
  title: 'How Does Mrs Dalloway Move Through Time?',
  thumbnailTitle: 'Stream of Consciousness',
  subtitle: 'Narrative technique and time, step by step',
  summary:
    'An exam-style question on Virginia Woolf’s Mrs Dalloway, solved one small step at a time. Clarissa Dalloway steps out into a London morning, and within one sentence we are somewhere else. We track the shift in time and name the technique that carries it.',
  intro: [
    'In this video, we solve an exam-style question about narrative technique and time. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Woolf’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Virginia Woolf, Mrs Dalloway (1925), opening pages',
    say: ['First, the context. Clarissa Dalloway, a middle-aged woman, steps out on a June morning in London to buy flowers for a party. Then: What a lark! What a plunge! For so it had always seemed to her, when, with a little squeak of the hinges, which she could hear now, she had burst open the French windows and plunged at Bourton into the open air.'],
  },
  question: {
    prompt: 'What does this sentence mainly **do** with time?',
    text: 'Read the sentence from Mrs Dalloway. What does this sentence mainly do with time?',
    choices: [
      'It follows Clarissa’s thoughts as the present moment slides into a memory of her youth at Bourton.',
      'It jumps forward to describe the party that evening.',
      'It gives an objective, step-by-step account of the morning.',
      'It switches to a different narrator who remembers Bourton.',
    ],
    answer: 0,
    working: '*What a lark!* = **now** (London); *had burst open… at Bourton* = **then**; *which she could hear now* = memory felt in the **present**: **stream of consciousness**.',
    say: [
      'What does this sentence mainly do with time?',
      'A: It follows Clarissa’s thoughts as the present moment slides into a memory of her youth at Bourton. B: It jumps forward to describe the party that evening. C: It gives an objective, step-by-step account of the morning. D: It switches to a different narrator who remembers Bourton.',
    ],
  },
  ask: [
    ['The sentence starts on a London **morning**', 'The sentence starts on a June morning in London.'],
    ['Where, and **when**, does it end?', 'We need to see where, and when, it ends up.'],
  ],
  know: {
    title: 'Narrative technique and time',
    md: '**Stream of consciousness** follows a character’s thoughts as they flow, with memories and feelings breaking in. **Multiple narrators** tell the story in turn; **shifting focalization** moves whose eyes we see through. Stories also play with **time**: **compression** covers years in a line, **expansion** stretches a moment over pages, and **memory** pulls the past into the present.',
    say: [
      'Here is the idea we need. Stream of consciousness follows a character’s thoughts as they flow, with memories and feelings breaking in. Multiple narrators tell a story in turn, and shifting focalization changes whose eyes we see through.',
      'Stories also play with time. Compression covers years in a single line, expansion stretches one moment over pages, and memory pulls the past into the present.',
    ],
  },
  plan: [
    ['Mark the **time** of each part', 'Here is the plan. First, mark the time of each part of the sentence.'],
    ['Find the **hinge** between them', 'Second, find the hinge between them.'],
    ['Name the **technique**', 'Third, name the technique.'],
  ],
  steps: [
    scene('Step 1: Now and then', [table('t', ['Words', 'When?'], [['*What a lark! What a plunge!*', '**now**: the London morning'], ['*she **had** burst open the French windows… at Bourton*', '**then**: her youth'], ['*which she could hear **now***', 'the past **felt** in the present']])], [
      { say: 'Step one. What a lark! What a plunge! That is Clarissa’s feeling now, stepping into the London morning.', show: 't.0' },
      { say: 'But she had burst open the windows at Bourton. The past perfect, had burst, takes us back to her youth.', show: 't.1' },
      { say: 'And yet the squeak of the hinges is one she could hear now. The memory is so vivid it sounds in the present.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The technique', [quote('p', ['[[theta:What a lark! What a plunge!]] For so it had always seemed to her, when… she had burst open the French windows and plunged [[good:at Bourton]] into the open air.']), text('a', 'Thoughts flow from **now** into **memory** → **stream of consciousness** → **A**', 'lg')], [
      { say: 'Step two. The hinge is the feeling itself. The word plunge in London reminds her of plunging into the air at Bourton, and her mind travels there.', show: 'p' },
      { say: 'The narration follows her thoughts, not the clock. That is stream of consciousness, and the answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['The narrator stays close to **Clarissa’s** mind', 'Let us check. The narrator stays close to Clarissa’s mind throughout.'],
    ['and the memory comes from **her** feeling', 'The memory comes from her own feeling, not from a new narrator. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Same **her** throughout: it is still Clarissa remembering', 'Choice D is the trap. The memory feels like another voice, but it is still Clarissa’s mind, the same her.'],
      ['B', 'It goes **back**, to her youth, not forward', 'Choice B: the sentence goes back to her youth, not forward to the party.'],
      ['C', 'Exclamations and memory: **subjective**, not objective', 'Choice C: exclamations and memory make it subjective, not an objective account.'],
    ],
  },
  yourTurn: {
    prompt: 'A novel tells its story through chapters narrated in turn by three different characters. What is this technique called?',
    choices: ['multiple narrators', 'compression', 'an omniscient narrator', 'a flashforward'],
    answer: 0,
    working: 'Several characters **take turns** telling: **multiple narrators**.',
    ask: 'A novel tells its story through chapters narrated in turn by three different characters. What is this technique called? A: multiple narrators. B: compression. C: an omniscient narrator. D: a flashforward.',
    reveal: 'The answer is A, multiple narrators. Each character tells part of the story from their own point of view.',
  },
  sum: [
    ['**Stream of consciousness** follows thoughts, not the clock', 'Here is what to remember. Stream of consciousness follows a character’s thoughts, not the clock.'],
    ['Watch **tense** shifts: *had* takes us into the past', 'Watch for tense shifts. A word like had can take us into the past.'],
    ['Ask what pulls the **memory** in', 'And ask what pulls the memory in. For more on narrative technique and time, watch this lesson’s explainer video on Gradileo.'],
  ],
});
