import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 5.1 (Greek and Latin roots). An exam-style question we wrote, in the style
// of a Grade 6 vocabulary test. The answer is C: tele (far) + scope (look at) = an instrument for
// looking at things far away.

export default englishExam({
  lesson: 'e6-5-1',
  ...ours('a Grade 6 vocabulary test'),
  title: 'What Does Telescope Mean, From Its Greek Roots?',
  thumbnailTitle: 'Greek and Latin Roots',
  subtitle: 'Building meaning from parts, step by step',
  summary:
    'An exam-style vocabulary question, solved one small step at a time: the Greek root tele means far, and scope means look at, so what does telescope mean? We split the word, join the meanings, and check with other tele and scope words.',
  intro: [
    'In this video, we solve an exam-style question about Greek and Latin roots. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 vocabulary test.',
  ],
  question: {
    prompt: 'The Greek root **tele** means “far”, and **scope** means “look at”. What does **telescope** mean?',
    text: 'The Greek root tele means “far”, and scope means “look at”. What does telescope mean?',
    choices: ['a machine that sends messages', 'a tool for looking at very small things', 'an instrument for looking at things far away', 'a person who studies the stars'],
    answer: 2,
    working: '**tele** (far) + **scope** (look at) → something for looking at what is far away.',
    say: ['The Greek root tele means far, and scope means look at. What does telescope mean?', 'A: a machine that sends messages. B: a tool for looking at very small things. C: an instrument for looking at things far away. D: a person who studies the stars.'],
  },
  ask: [
    ['We are **given** the meaning of each root', 'The question gives us the meaning of each root.'],
    ['**Join** them to find the word’s meaning', 'Our job is to join them to find the meaning of the whole word.'],
  ],
  know: {
    title: 'Roots',
    md: 'A **root** is a word part that carries the **main meaning**. Many English words are built from **Greek** and **Latin** roots: **tele** (far), **scope** (look at), **micro** (small), **phon** (sound), **graph** (write), **port** (carry).',
    say: [
      'Here is the idea we need. A root is a word part that carries the main meaning. Many English words are built from Greek and Latin roots.',
      'For example, tele means far, scope means look at, micro means small, phon means sound, graph means write, and port means carry. If you know the roots, you can work out words you have never seen.',
    ],
  },
  plan: [
    ['**Split** the word into roots', 'Here is the plan. First, split the word into its roots.'],
    ['**Join** the meanings', 'Second, join their meanings.'],
    ['Check with **other** words', 'Third, check with other words that share the roots.'],
  ],
  steps: [
    scene('Step 1: Split and join', [text('w', '**tele** + **scope**', 'xl'), text('m', 'far + look at → **a thing for looking at what is far away**', 'lg')], [
      { say: 'Step one. Telescope splits into tele and scope.', show: 'w' },
      { say: 'Tele means far, and scope means look at. Joined, they make: something for looking at things far away.', show: 'm' },
      { say: 'That matches C: an instrument for looking at things far away.' },
    ]),
    scene('Step 2: Test each choice', [table('t', ['Choice', 'Roots it would need'], [['A: sends messages', 'like **tele**graph: far + write'], ['B: very small things', '**micro**scope: small + look at'], ['C: far away', '[[good:**tele** + **scope** ✓]]'], ['D: a person who studies stars', 'astronomer: no **scope**']])], [
      { say: 'Step two. Let us test the others. A, a machine that sends messages, is closer to telegraph: far plus write.', show: 't.0' },
      { say: 'B, looking at very small things, would be a microscope: small plus look at.', show: 't.1' },
      { say: 'D is a person, an astronomer. A telescope is an instrument, not a person. Only C uses both roots. The answer is C.', show: ['t.2', 't.3'], focus: 't.2' },
    ]),
  ],
  check: [
    ['**tele**: telephone (far sound), television (far seeing)', 'Let us check tele with other words. A telephone carries sound far away. Television shows pictures from far away.'],
    ['**scope**: microscope, periscope: all for **looking**', 'And scope: a microscope and a periscope are both for looking. The roots hold, so C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Uses **scope** but not **tele**: that is a **microscope**', 'Choice B is the closest trap. It uses the look at part, but describes a microscope.'],
      ['A', 'Uses **tele** but not **scope**', 'Choice A uses the far part, but not the look at part.'],
      ['D', 'Linked to **stars**, but describes a **person**', 'Choice D is linked to telescopes in our minds, but it describes a person, not an instrument.'],
    ],
  },
  yourTurn: {
    prompt: 'The Latin root **port** means “carry”, and the suffix **-able** means “able to be”. What does **portable** mean?',
    choices: ['able to be carried', 'a place for ships', 'a kind of door', 'able to be eaten'],
    answer: 0,
    working: '**port** (carry) + **able** (able to be) → able to be carried.',
    ask: 'The Latin root port means carry, and the suffix able means able to be. What does portable mean?',
    reveal: 'The answer is A, able to be carried. A portable speaker is one you can carry around.',
  },
  sum: [
    ['A **root** carries a word’s **main meaning**', 'Here is what to remember. A root carries a word’s main meaning.'],
    ['**Split** the word, then **join** the meanings of its parts', 'Split the word, then join the meanings of its parts.'],
    ['Check with **other** words that share the root', 'And check with other words that share the root. For more on Greek and Latin roots, watch this lesson’s explainer video on Gradileo.'],
  ],
});
