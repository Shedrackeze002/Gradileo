import { englishExam, ks2, ks2Intro, scene, table } from '../english.ts';

// Grade 5 English, lesson 5.2 (complete sentences). The Standards and Testing Agency's own question,
// word for word: 2024 key stage 2 English grammar, punctuation and spelling test, Paper 1, question 5.
// The answer is "Hold the handrail to keep yourself steady.": it opens with a bossy verb and tells
// the reader to do something.

export default englishExam({
  lesson: 'e5-5-2',
  ...ks2(2024, 5),
  title: 'Which Sentence Is a Command?',
  thumbnailTitle: 'Spot the Command',
  subtitle: 'Kinds of sentence, step by step',
  summary:
    'A real test question, solved one small step at a time: four sentences about a sprained ankle, and only one is a command. We learn the four kinds of sentence, test each one, and see why a sentence that talks about instructions is not itself a command.',
  intro: ks2Intro('kinds of sentence'),
  question: {
    prompt: 'Which sentence is a **command**?',
    text: 'Which sentence is a command? Tick one.',
    choices: ['The nurse will bandage your sprained ankle.', 'You have been told to stay at home and rest.', 'Putting an ice pack on it should help.', 'Hold the handrail to keep yourself steady.'],
    answer: 3,
    working: 'It starts with the command verb **Hold** and tells the reader what to do.',
    say: ['Which sentence is a command? Tick one.', 'The nurse will bandage your sprained ankle. You have been told to stay at home and rest. Putting an ice pack on it should help. Hold the handrail to keep yourself steady.'],
  },
  ask: [
    ['Four sentences, all about **the same injury**', 'All four sentences are about the same sprained ankle, and they are all full of advice.'],
    ['Which one **is** a command?', 'But only one of them is a command, so we need to know exactly what makes a sentence a command.'],
  ],
  know: {
    title: 'Four kinds of sentence',
    md: '**Statement**: tells you something. **Question**: asks something. **Exclamation**: starts with *What* or *How* and ends with **!** **Command**: tells someone to **do** something, and usually starts with a **command verb**: *Sit down. Close the door.*',
    say: [
      'Here is the idea we need. There are four kinds of sentence. A statement tells you something. A question asks something.',
      'An exclamation, in these tests, starts with what or how, as in what a lovely day, and ends with an exclamation mark.',
      'A command tells someone to do something. It usually starts with a command verb, sometimes called a bossy verb, like sit down, or close the door.',
    ],
  },
  plan: [
    ['Look at how each sentence **starts**', 'Here is the plan. First, look at how each sentence starts.'],
    ['Ask: does it **tell** something, or tell someone **to do** something?', 'Second, ask whether it tells us something, or tells someone to do something.'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [
      table('t', ['Sentence starts…', 'What it does', 'Kind'], [['**The nurse** will…', 'tells us what will happen', 'statement'], ['**You have been** told…', 'tells us what someone said', 'statement'], ['**Putting** an ice pack…', 'gives a suggestion as a fact', 'statement'], ['**Hold** the handrail…', 'tells **you** to do something', '[[good:command]]']]),
    ], [
      { say: 'Step one. Pause and look at how each sentence starts.', wait: 3 },
      { say: 'The first starts with the nurse, and tells us what the nurse will do. That is a statement.', show: 't.0' },
      { say: 'The second starts with you have been told. It reports an instruction, but it is not giving one. It is a statement.', show: 't.1', focus: 't.1' },
      { say: 'The third says an ice pack should help. That is good advice, but it is told as a fact. A statement.', show: 't.2' },
      { say: 'The fourth starts with the verb hold. It tells you, the reader, to do something. That is a command.', show: 't.3', focus: 't.3' },
      { say: 'So the answer is the last sentence: Hold the handrail to keep yourself steady.' },
    ]),
  ],
  check: [
    ['It starts with a **command verb**: *Hold*', 'Let us check. The sentence starts with a command verb, hold.'],
    ['Its subject, **you**, is understood: *(You) hold the handrail*', 'And a command has a hidden subject: you. You hold the handrail. The other sentences all have their subject written out.'],
  ],
  traps: {
    say: 'The trap in this question is that every sentence gives advice, so they all feel a bit like commands.',
    rows: [
      ['B', 'It **talks about** an instruction, but does not **give** one', 'The second sentence is the biggest trap. It tells us that someone was told to rest. It reports a command, but it is a statement.'],
      ['C', 'Advice told as a **fact**', 'The third sentence is helpful advice, but it is told as a fact, so it is a statement.'],
      ['A', 'Says what **will** happen', 'The first tells us what will happen, so it is a statement.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is a **command**?',
    choices: ['Mum asked us to tidy up.', 'Put your shoes by the door.', 'What a mess this room is!', 'Are your shoes by the door?'],
    answer: 1,
    working: 'It starts with the command verb **Put**.',
    ask: 'Which sentence is a command?',
    reveal: 'The answer is B. It starts with the command verb put, and tells someone what to do. A is a statement, C is an exclamation and D is a question.',
  },
  sum: [
    ['Four kinds: **statement**, **question**, **exclamation**, **command**', 'Here is what to remember. There are four kinds of sentence: statement, question, exclamation and command.'],
    ['A command tells someone **to do** something, often with a **command verb**', 'A command tells someone to do something, and usually starts with a command verb.'],
    ['Talking **about** an instruction is a **statement**', 'A sentence that only talks about an instruction is a statement. For more on complete sentences, watch this lesson’s explainer video on Gradileo.'],
  ],
});
