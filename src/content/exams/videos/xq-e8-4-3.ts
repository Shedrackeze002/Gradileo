import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 4.3 (evaluating sources and reasoning). An exam-style question we wrote, in
// the style of a Grade 8 reading test. The answer is C, a false choice: the speaker offers only two
// options when many others exist.

export default englishExam({
  lesson: 'e8-4-3',
  ...ours('a Grade 8 reading test'),
  title: 'Which Faulty Reasoning Does the Speaker Use?',
  thumbnailTitle: 'Faulty Reasoning',
  subtitle: 'Spotting the false choice, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a speaker says that either the school bans phones completely or students will never learn anything. We learn the common kinds of faulty reasoning, test the argument against each, and name the flaw.',
  intro: [
    'In this video, we solve an exam-style reading question about faulty reasoning. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test.',
  ],
  question: {
    prompt: 'A speaker says: *“Either we ban phones from school completely, or students will never learn anything again.”* Which faulty reasoning is this?',
    text: 'A speaker says: “Either we ban phones from school completely, or students will never learn anything again.” Which faulty reasoning is this?',
    choices: ['bandwagon', 'an attack on the person', 'a false choice', 'a hasty generalization'],
    answer: 2,
    working: 'Only **two** options are offered, when many **others** exist (phone lockers, rules for class time…).',
    say: [
      'A speaker says: Either we ban phones from school completely, or students will never learn anything again. Which faulty reasoning is this?',
      'A: bandwagon. B: an attack on the person. C: a false choice. D: a hasty generalization.',
    ],
  },
  ask: [
    ['The argument has a **flaw** in its reasoning', 'This argument has a flaw in its reasoning.'],
    ['Which **kind** of flaw?', 'We need to name the kind of flaw.'],
  ],
  know: {
    title: 'Common faulty reasoning',
    md: '**False choice**: only two options are offered when **more** exist. **Bandwagon**: it must be right because **everyone** does it. **Attack on the person**: criticizing the **speaker** instead of the argument. **Hasty generalization**: a big conclusion from **too few** examples.',
    say: [
      'Here is the idea we need. A false choice offers only two options when more exist. Bandwagon says something must be right because everyone does it.',
      'An attack on the person criticizes the speaker instead of their argument. And a hasty generalization draws a big conclusion from too few examples.',
    ],
  },
  plan: [
    ['How many **options** are offered?', 'Here is the plan. First, how many options does the speaker offer?'],
    ['Are there **others**?', 'Second, are there other options?'],
    ['Name the **flaw**', 'Third, name the flaw.'],
  ],
  steps: [
    scene('Step 1: The options', [table('t', ['Offered', 'Ignored']
      , [['ban phones **completely**', 'phones in **lockers** during lessons'], ['students **never learn** again', 'phones allowed only for **research**'], ['', '**clear rules** with consequences']])], [
      { say: 'Step one. The speaker offers only two options: a complete ban, or students never learn anything again.', show: ['t.0', 't.1'] },
      { say: 'But there are many others: lockers during lessons, phones only for research, or clear rules. The speaker ignores them all.', show: 't.2' },
    ]),
    scene('Step 2: Name the flaw', [table('m', ['Flaw', 'Fits?'], [['bandwagon', '[[bad:✗ no “everyone does it”]]'], ['attack on the person', '[[bad:✗ no one is criticized]]'], ['false choice', '[[good:✓ only two options]]'], ['hasty generalization', '[[bad:✗ no examples at all]]']]), text('a', 'The answer is **C, a false choice**.')], [
      { say: 'Step two. Nobody says everyone does it, and nobody is attacked. There are no examples to generalize from.', show: ['m.0', 'm.1', 'm.3'] },
      { say: 'Offering only two options when many exist is a false choice. The answer is C.', show: ['m.2', 'a'], focus: 'm.2' },
    ]),
  ],
  check: [
    ['The word **either… or** is the clue', 'Let us check. Either, or is the classic clue to a false choice.'],
    ['and **never** exaggerates the second option', 'And never anything again exaggerates the second option to make the first look necessary. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', '**Never learn anything** is extreme, but it is not drawn from **examples**', 'Choice D is the trap. Never learn anything sounds like an overgeneralization, but it is not drawn from a few examples.'],
      ['A', 'No appeal to **what everyone does**', 'Choice A: there is no appeal to what everyone does.'],
      ['B', 'No one is **criticized**', 'Choice B: no one is criticized.'],
    ],
  },
  yourTurn: {
    prompt: '*“Two students in my class who play video games got bad marks, so video games ruin everyone’s grades.”* Which faulty reasoning is this?',
    choices: ['false choice', 'bandwagon', 'hasty generalization', 'attack on the person'],
    answer: 2,
    working: 'A big conclusion about **everyone** from just **two** examples.',
    ask: 'Two students in my class who play video games got bad marks, so video games ruin everyone’s grades. Which faulty reasoning is this? A: false choice. B: bandwagon. C: hasty generalization. D: attack on the person.',
    reveal: 'The answer is C, a hasty generalization. A conclusion about everyone is drawn from just two examples.',
  },
  sum: [
    ['**False choice**: only two options when more exist', 'Here is what to remember. A false choice offers only two options when more exist.'],
    ['Others: **bandwagon**, **attack on the person**, **hasty generalization**', 'Others include bandwagon, the attack on the person, and the hasty generalization.'],
    ['Ask: are there **other options**, **enough examples**, a real **argument**?', 'Ask whether there are other options, enough examples, and a real argument. For more on evaluating sources and reasoning, watch this lesson’s explainer video on Gradileo.'],
  ],
});
