import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 7.1 (syntax for effect). An exam-style question we wrote, in the style of a
// Grade 12 language test, on "I came, I saw, I conquered", the English form of words attributed to Julius
// Caesar. The answer is B: leaving out "and" (asyndeton) makes the victory sound swift and certain.

export default englishExam({
  lesson: 'e12-7-1',
  ...ours('a Grade 12 language test'),
  title: 'Which Device Is “I Came, I Saw, I Conquered”?',
  thumbnailTitle: 'Asyndeton',
  subtitle: 'Syntax for effect, step by step',
  summary:
    'An exam-style question on syntax, solved one small step at a time, on the famous “I came, I saw, I conquered”. We notice the missing word, name the device, and explain why it makes the victory sound so fast.',
  intro: [
    'In this video, we solve an exam-style question about syntax for effect. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 language test.',
  ],
  question: {
    prompt: 'Julius Caesar is said to have reported a victory with: *“I came, I saw, I conquered.”* Which **device** does this sentence use?',
    text: 'Julius Caesar is said to have reported a victory with: I came, I saw, I conquered. Which device does this sentence use?',
    choices: ['polysyndeton', 'asyndeton', 'chiasmus', 'inversion'],
    answer: 1,
    working: 'No *and* between the clauses → **asyndeton**: quick, **decisive**.',
    say: [
      'Julius Caesar is said to have reported a victory with: I came, I saw, I conquered. Which device does this sentence use?',
      'A: polysyndeton. B: asyndeton. C: chiasmus. D: inversion.',
    ],
  },
  ask: [
    ['Three short **clauses**', 'The sentence has three short clauses.'],
    ['Which **device**?', 'We need to name the device.'],
  ],
  know: {
    title: 'Syntax for effect',
    md: '**Asyndeton**: leaving out conjunctions (*I came, I saw, I conquered*): fast, decisive. **Polysyndeton**: piling them up (*and… and… and…*): slow, overwhelming. **Periodic** sentences hold the main point to the **end**; **loose** sentences give it **first**. **Inversion** reverses normal word order. **Parallelism** repeats a structure; **antithesis** sets opposites side by side.',
    say: [
      'Here is the idea we need. Asyndeton leaves out conjunctions, as in I came, I saw, I conquered, and feels fast and decisive. Polysyndeton piles them up, and, and, and, and feels slow or overwhelming.',
      'Periodic sentences hold the main point to the end, while loose sentences give it first. Inversion reverses normal word order. Parallelism repeats a structure, and antithesis sets opposites side by side.',
    ],
  },
  plan: [
    ['Look at the **joins**', 'Here is the plan. First, look at how the clauses are joined.'],
    ['Name the **device**', 'Second, name the device.'],
    ['Explain the **effect**', 'Third, explain the effect.'],
  ],
  steps: [
    scene('Step 1: The joins', [quote('p', ['I came[[bad:,]] I saw[[bad:,]] I conquered.']), table('t', ['Normal', 'Caesar'], [['*I came, I saw, **and** I conquered*', 'no **and**: only commas']])], [
      { say: 'Step one. Normally we would write: I came, I saw, and I conquered.', show: 'p' },
      { say: 'Caesar leaves out the and. Only commas join the clauses.', show: 't.0', focus: 't.0' },
    ]),
    scene('Step 2: Device and effect', [text('d', 'Leaving out conjunctions = **asyndeton**'), text('e', 'Effect: **swift**, **certain**: the victory was as quick as the sentence'), text('a', '**B**', 'lg')], [
      { say: 'Step two. Leaving out conjunctions is called asyndeton.', show: 'd' },
      { say: 'The effect is speed and certainty. Three quick beats, as if the victory took no effort. The answer is B.', show: ['e', 'a'] },
    ]),
  ],
  check: [
    ['Polysyndeton would **add** *and*s', 'Let us check. Polysyndeton would add ands: I came and I saw and I conquered.'],
    ['Caesar does the **opposite**', 'Caesar does the opposite. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Polysyndeton **adds** conjunctions; this one **removes** them', 'Choice A is the trap. The names sound alike, but polysyndeton adds conjunctions, and this sentence removes them.'],
      ['C', 'Nothing is **reversed** (A B B A)', 'Choice C: nothing is reversed, as chiasmus needs.'],
      ['D', 'Normal **subject–verb** order', 'Choice D: the word order is normal, subject then verb.'],
    ],
  },
  yourTurn: {
    prompt: 'In Tennyson’s line *“Into the valley of Death / Rode the six hundred”*, which device puts the verb before its subject?',
    choices: ['inversion', 'asyndeton', 'antithesis', 'a loose sentence'],
    answer: 0,
    working: '*Rode* (verb) before *the six hundred* (subject): **inversion**.',
    ask: 'In Tennyson’s line, into the valley of Death rode the six hundred, which device puts the verb before its subject? A: inversion. B: asyndeton. C: antithesis. D: a loose sentence.',
    reveal: 'The answer is A, inversion. Rode comes before the six hundred, which builds suspense and gives the line a heavy, marching rhythm.',
  },
  sum: [
    ['**Asyndeton**: no conjunctions, fast', 'Here is what to remember. Asyndeton leaves out conjunctions, and feels fast.'],
    ['**Polysyndeton**: many conjunctions, slow', 'Polysyndeton piles them up, and feels slow.'],
    ['Always explain the **effect**', 'Always explain the effect. For more on syntax for effect, watch this lesson’s explainer video on Gradileo.'],
  ],
});
