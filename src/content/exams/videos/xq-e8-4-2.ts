import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 4.2 (ethos, pathos and logos). An exam-style question we wrote, in the style
// of a Grade 8 reading test. The answer is C, pathos: the sentence appeals to the reader's feelings
// with the image of a lonely, shivering dog. The shelter and its figures are invented.

export default englishExam({
  lesson: 'e8-4-2',
  ...ours('a Grade 8 reading test', 'the shelter and its figures are invented'),
  title: 'Which Appeal Does the Shelter Advert Use?',
  thumbnailTitle: 'Ethos, Pathos, Logos',
  subtitle: 'Appeals to credibility, emotion and logic, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: an animal shelter asks for donations with a picture of a lonely, shivering dog. We learn the three classical appeals, test the sentence against each, and explain why the writer chose this one.',
  intro: [
    'In this video, we solve an exam-style reading question about ethos, pathos and logos. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test. The shelter in it is made up.',
  ],
  question: {
    prompt: 'An animal shelter writes: *“Tonight, Biscuit will curl up alone in a cold cage, waiting for someone to love him.”* Which appeal does this sentence **mainly** use?',
    text: 'An animal shelter writes: “Tonight, Biscuit will curl up alone in a cold cage, waiting for someone to love him.” Which appeal does this sentence mainly use?',
    choices: ['ethos (credibility)', 'logos (logic)', 'pathos (emotion)', 'none of these'],
    answer: 2,
    working: '*alone*, *cold cage*, *waiting for someone to love him*: it aims at our **feelings** of pity.',
    say: [
      'An animal shelter writes: Tonight, Biscuit will curl up alone in a cold cage, waiting for someone to love him. Which appeal does this sentence mainly use?',
      'A: ethos, credibility. B: logos, logic. C: pathos, emotion. D: none of these.',
    ],
  },
  ask: [
    ['There are **three** classic appeals', 'Persuasive writers use three classic appeals.'],
    ['Which one does **this** sentence use?', 'We need the one this sentence mainly uses.'],
  ],
  know: {
    title: 'Ethos, pathos and logos',
    md: '**Ethos** appeals to **credibility**: why we should **trust** the writer (*As a vet for twenty years…*). **Pathos** appeals to **emotion**: pity, fear, pride, joy. **Logos** appeals to **logic**: facts, numbers and reasoning (*Donations cut waiting times by half*).',
    say: [
      'Here is the idea we need. Ethos appeals to credibility: it shows why we should trust the writer, as in, as a vet for twenty years.',
      'Pathos appeals to emotion, such as pity, fear, pride or joy. And logos appeals to logic, with facts, numbers and reasoning.',
    ],
  },
  plan: [
    ['Does it show the writer is **trustworthy**?', 'Here is the plan. First, does it show the writer is trustworthy?'],
    ['Does it give **facts** or **reasoning**?', 'Second, does it give facts or reasoning?'],
    ['Does it stir **feelings**?', 'Third, does it stir feelings?'],
  ],
  steps: [
    scene('Step 1: Test each appeal', [table('t', ['Appeal', 'In the sentence?'], [['ethos', '[[bad:✗ nothing about the shelter’s experience]]'], ['logos', '[[bad:✗ no facts or numbers]]'], ['pathos', '[[good:✓ *alone*, *cold cage*, *waiting to be loved*]]']])], [
      { say: 'Step one. Is there anything about why we should trust the shelter? No.', show: 't.0' },
      { say: 'Are there facts, numbers or reasoning? No.', show: 't.1' },
      { say: 'But alone, a cold cage, and waiting for someone to love him all make us feel sorry for Biscuit. That is pathos.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Why pathos here?', [text('a', 'Pity moves people to **give**. The answer is **C, pathos**.', 'lg')], [
      { say: 'Step two. Why choose pathos? People often donate because they feel moved. A named dog, alone in the cold, makes the need feel real. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Giving the dog a **name** makes it personal', 'Let us check. Even the name, Biscuit, makes the dog feel like an individual we care about.'],
    ['Every detail targets **feeling**', 'Every detail targets our feelings. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A **shelter** sounds trustworthy, but the sentence does not **use** that', 'Choice A is the trap. A shelter may be trustworthy, but this sentence does not build its credibility.'],
      ['B', 'No **facts** or **reasoning**', 'Choice B: there are no facts or reasoning.'],
      ['D', 'There is a **clear** appeal', 'Choice D: there is a clear appeal, to emotion.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses **logos**?',
    choices: ['As a vet for twenty years, I urge you to help.', 'Every twenty dollars pays for a week of food, and last year donations helped us rehome 400 animals.', 'Imagine the joy on a puppy’s face.', 'You are a kind person.'],
    answer: 1,
    working: 'Numbers and a cause-and-effect link: **logic**.',
    ask: 'Which sentence uses logos? A: As a vet for twenty years, I urge you to help. B: Every twenty dollars pays for a week of food, and last year donations helped us rehome four hundred animals. C: Imagine the joy on a puppy’s face. D: You are a kind person.',
    reveal: 'The answer is B. It uses numbers and a clear link between donation and result. A is ethos, and C is pathos.',
  },
  sum: [
    ['**Ethos** = credibility · **pathos** = emotion · **logos** = logic', 'Here is what to remember. Ethos is credibility, pathos is emotion, and logos is logic.'],
    ['Look at **what** the sentence uses to persuade', 'Look at what each sentence uses to persuade.'],
    ['Ask **why** that appeal suits the **audience**', 'And ask why that appeal suits the audience. For more on ethos, pathos and logos, watch this lesson’s explainer video on Gradileo.'],
  ],
});
