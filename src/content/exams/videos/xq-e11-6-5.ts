import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 6.5 (revising for style). An exam-style writing question we wrote, in the
// style of a Grade 11 writing test. The answer is B: one long sentence builds the scene, and a short final
// sentence lands with emphasis.

const DRAFT = ['*Draft:* The storm came. The power went out. The house went dark. We waited.'];

export default englishExam({
  lesson: 'e11-6-5',
  ...ours('a Grade 11 writing test', 'the draft is our own'),
  title: 'Which Revision Varies the Sentences Best?',
  thumbnailTitle: 'Sentence Variety',
  subtitle: 'Revising for rhythm and emphasis, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a draft of four short, choppy sentences about a storm. We see why the rhythm feels flat, test four revisions, and choose the one that uses sentence length for emphasis.',
  intro: [
    'In this video, we solve an exam-style question about revising for style. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 writing test, and the draft is our own.',
  ],
  passage: {
    lines: DRAFT,
    by: 'A student’s draft (our own)',
    say: ['First, read the draft. The storm came. The power went out. The house went dark. We waited.'],
  },
  question: {
    prompt: 'Which revision best **varies sentence length** for rhythm and emphasis?',
    text: 'Read the draft. Which revision best varies sentence length for rhythm and emphasis?',
    choices: [
      'The storm came, and the power went out, and the house went dark, and we waited, and we waited.',
      'When the storm finally broke over the valley, the power flickered, failed, and left the house in total darkness. We waited.',
      'The storm came. The power went out. The house went very dark. We waited there.',
      'Storm. Power. Dark. Waiting.',
    ],
    answer: 1,
    working: 'A **long** sentence builds the scene; a **short** one lands with **emphasis**: *We waited.*',
    say: [
      'Which revision best varies sentence length for rhythm and emphasis?',
      'A: The storm came, and the power went out, and the house went dark, and we waited, and we waited. B: When the storm finally broke over the valley, the power flickered, failed, and left the house in total darkness. We waited. C: The storm came. The power went out. The house went very dark. We waited there. D: Storm. Power. Dark. Waiting.',
    ],
  },
  ask: [
    ['The draft is all **short** sentences', 'The draft uses only short sentences.'],
    ['Which revision **varies** them best?', 'We need the revision that varies them best.'],
  ],
  know: {
    title: 'Revising for style',
    md: 'Vary sentence **length** and **openings**. A run of **short** sentences sounds **choppy**; a run of **long** ones can **drag**. A **short** sentence after a long one gets **emphasis**. Also revise for **precision** (exact words: *flickered*, *failed*), **concision** (cut padding: *due to the fact that* → *because*) and a **consistent tone**.',
    say: [
      'Here is the idea we need. Vary the length and the openings of your sentences. A run of short sentences sounds choppy, and a run of long ones can drag. A short sentence placed after a long one gets emphasis.',
      'Also revise for precision, choosing exact words like flickered and failed; for concision, cutting padding like due to the fact that; and for a consistent tone.',
    ],
  },
  plan: [
    ['Describe each revision’s **rhythm**', 'Here is the plan. First, describe each revision’s rhythm.'],
    ['Find **variety** with **emphasis**', 'Second, find the one with variety and emphasis.'],
  ],
  steps: [
    scene('Step 1: Test each revision', [table('t', ['Choice', 'Rhythm', 'Problem?'], [['A', 'one long chain of *and*s', '[[bad:drags, no variety]]'], ['B', '**long**, then **short**', '[[good:✓ variety, emphasis]]'], ['C', 'still all **short**', '[[bad:choppy, padded]]'], ['D', 'fragments only', '[[bad:choppy, unclear]]']])], [
      { say: 'Step one. A strings everything together with and, and, and. It drags, with no variety.', show: 't.0' },
      { say: 'C keeps all the short sentences, and just adds padding, very and there. D breaks everything into single-word fragments.', show: ['t.2', 't.3'] },
      { say: 'B builds the scene in one long sentence, with precise verbs, flickered and failed, then ends with a short one: we waited.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: The emphasis', [quote('p', ['…the power [[good:flickered, failed]], and left the house in total darkness. [[theta:We waited.]]']), text('a', 'Long sentence builds; short sentence **lands** → **B**', 'lg')], [
      { say: 'Step two. After the long sentence, the short one, we waited, lands with weight, like the silence in the dark house. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Read B aloud: the rhythm **slows**, then **stops**', 'Let us check. Read B aloud: the rhythm flows, then stops dead.'],
    ['Sound matches **meaning**', 'The sound matches the meaning. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Longer, but **one** long chain is not **variety**', 'Choice A is the trap. It is longer, but one long chain of ands is not variety.'],
      ['C', 'Still **choppy**, with padding', 'Choice C is still choppy, with added padding.'],
      ['D', 'Fragments lose **clarity**', 'Choice D: the fragments lose clarity.'],
    ],
  },
  yourTurn: {
    prompt: 'Which is the most **concise** replacement for *“due to the fact that”*?',
    choices: ['because', 'owing to the fact that', 'in view of the fact that', 'for the reason that'],
    answer: 0,
    working: 'One word, **same** meaning: **because**.',
    ask: 'Which is the most concise replacement for, due to the fact that? A: because. B: owing to the fact that. C: in view of the fact that. D: for the reason that.',
    reveal: 'The answer is A, because. One word says the same thing as five.',
  },
  sum: [
    ['**Vary** sentence length and openings', 'Here is what to remember. Vary sentence length and openings.'],
    ['A **short** sentence after a long one gets **emphasis**', 'A short sentence after a long one gets emphasis.'],
    ['Revise for **precision** and **concision**', 'And revise for precision and concision. For more on revising for style, watch this lesson’s explainer video on Gradileo.'],
  ],
});
