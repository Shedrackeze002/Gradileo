import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 7.4 (rhetorical figures). An exam-style question we wrote, in the style of a
// Grade 12 language test, on the old saying "Eat to live, do not live to eat". The answer is D: the words
// are repeated in reverse order (A B, B A), which is chiasmus.

export default englishExam({
  lesson: 'e12-7-4',
  ...ours('a Grade 12 language test'),
  title: 'Which Figure Is “Eat to Live, Do Not Live to Eat”?',
  thumbnailTitle: 'Chiasmus',
  subtitle: 'Rhetorical figures, step by step',
  summary:
    'An exam-style question on rhetorical figures, solved one small step at a time, on the old saying “Eat to live, do not live to eat.” We mark the key words, spot the mirror pattern, and name the figure.',
  intro: [
    'In this video, we solve an exam-style question about rhetorical figures. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 language test.',
  ],
  question: {
    prompt: 'Which **rhetorical figure** is used in the old saying *“Eat to live, do not live to eat”*?',
    text: 'Which rhetorical figure is used in the old saying: Eat to live, do not live to eat?',
    choices: ['litotes', 'zeugma', 'metonymy', 'chiasmus'],
    answer: 3,
    working: '**eat** … **live** / **live** … **eat**: A B, B A, a **mirror**: **chiasmus**.',
    say: [
      'Which rhetorical figure is used in the old saying: eat to live, do not live to eat?',
      'A: litotes. B: zeugma. C: metonymy. D: chiasmus.',
    ],
  },
  ask: [
    ['A short **saying**', 'We have a short, old saying.'],
    ['Which **figure**?', 'We need to name the rhetorical figure.'],
  ],
  know: {
    title: 'Rhetorical figures',
    md: '**Chiasmus**: words repeated in **reverse** order (A B, B A). **Zeugma**: one word governs two others in different senses (*she lost her keys and her temper*). **Litotes**: understatement by denying the opposite (*not bad*). **Synecdoche**: a part for the whole (*all hands on deck*). **Metonymy**: a related thing for the thing (*the crown* for the monarch). **Apostrophe**: addressing the absent. **Paradox**: a true-seeming contradiction.',
    say: [
      'Here is the idea we need. Chiasmus repeats words in reverse order, A B, then B A. Zeugma uses one word with two others in different senses, as in, she lost her keys and her temper. Litotes is understatement by denying the opposite, like not bad.',
      'Synecdoche uses a part for the whole, like all hands on deck. Metonymy uses a related thing for the thing, like the crown for the monarch. Apostrophe addresses someone absent, and paradox is a contradiction that seems true.',
    ],
  },
  plan: [
    ['Mark the **key words**', 'Here is the plan. First, mark the key words.'],
    ['Find the **pattern**', 'Second, find the pattern.'],
    ['Name the **figure**', 'Third, name the figure.'],
  ],
  steps: [
    scene('Step 1: The pattern', [quote('p', ['[[good:Eat]] to [[theta:live]], do not [[theta:live]] to [[good:eat]].']), table('t', ['First half', 'Second half'], [['**eat** → **live**', '**live** → **eat**'], ['A → B', 'B → A']])], [
      { say: 'Step one. The first half goes eat, then live. The second half goes live, then eat.', show: ['p', 't.0'] },
      { say: 'A B, then B A. The second half mirrors the first.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: Name it', [text('d', 'Words repeated in **reverse** order = **chiasmus**'), text('e', 'Effect: memorable, and it **flips** the priority'), text('a', '**D**', 'lg')], [
      { say: 'Step two. Repeating words in reverse order is chiasmus, named after the Greek letter chi, shaped like an X.', show: 'd' },
      { say: 'The mirror makes the saying memorable, and the flip shows which way round the priority should be. The answer is D.', show: ['e', 'a'] },
    ]),
  ],
  check: [
    ['No understatement, no **double** sense, no **stand-in** word', 'Let us check. There is no understatement, no word used in two senses, and no stand-in word.'],
    ['just the **mirror**', 'Just the mirror. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Zeugma uses **one** word in **two** senses', 'Choice B is the trap. Zeugma also plays with repeated structure, but it uses one word in two senses, and nothing here does that.'],
      ['A', 'No **understatement**', 'Choice A: there is no understatement.'],
      ['C', 'No **stand-in** word', 'Choice C: no word stands in for another.'],
    ],
  },
  yourTurn: {
    prompt: 'In *“The White House announced a new policy”*, the White House stands for the president and staff. Which figure is this?',
    choices: ['litotes', 'zeugma', 'paradox', 'metonymy'],
    answer: 3,
    working: 'A **place** linked to the thing stands in for it: **metonymy**.',
    ask: 'In, the White House announced a new policy, the White House stands for the president and staff. Which figure is this? A: litotes. B: zeugma. C: paradox. D: metonymy.',
    reveal: 'The answer is D, metonymy. A building closely linked to the president stands in for the people who work there.',
  },
  sum: [
    ['**Chiasmus**: A B, B A', 'Here is what to remember. Chiasmus repeats words in reverse order: A B, then B A.'],
    ['**Metonymy**: a related thing stands in', 'In metonymy, a related thing stands in for the thing itself.'],
    ['Name the figure, then its **effect**', 'Name the figure, then explain its effect. For more on rhetorical figures, watch this lesson’s explainer video on Gradileo.'],
  ],
});
