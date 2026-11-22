import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 4.3 (ethos, pathos and logos). An exam-style question we wrote, in the style
// of a Grade 10 reading test, on a short speech of our own; the doctor and the figures are invented. The
// answer is A: the first sentence builds the speaker's credibility, which is ethos.

const SPEECH = ['¹As a doctor who has treated hundreds of cycling injuries, I urge you to wear a helmet. ²Imagine your little sister lying in a hospital bed. ³In our town last year, nine of the ten cyclists treated for serious head injuries were not wearing helmets.'];

export default englishExam({
  lesson: 'e10-4-3',
  ...ours('a Grade 10 reading test', 'the speech and its figures are invented'),
  title: 'Which Appeal Does the Doctor Use First?',
  thumbnailTitle: 'Ethos, Pathos, Logos',
  subtitle: 'The three appeals, step by step',
  summary:
    'An exam-style question on persuasion, solved one small step at a time: a doctor urges students to wear bike helmets in three sentences. We match each sentence to ethos, pathos or logos, and name the appeal the first sentence uses.',
  intro: [
    'In this video, we solve an exam-style question about ethos, pathos and logos. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, and the speech and its figures are invented.',
  ],
  passage: {
    lines: SPEECH,
    by: 'A short speech (our own; the figures are invented)',
    say: ['First, read the speech. Sentence one: As a doctor who has treated hundreds of cycling injuries, I urge you to wear a helmet. Sentence two: Imagine your little sister lying in a hospital bed. Sentence three: In our town last year, nine of the ten cyclists treated for serious head injuries were not wearing helmets.'],
  },
  question: {
    prompt: 'Which appeal does **sentence 1** mainly use?',
    text: 'Read the speech. Which appeal does sentence 1 mainly use?',
    choices: ['ethos (credibility)', 'pathos (emotion)', 'logos (logic)', 'a bandwagon appeal'],
    answer: 0,
    working: '*As a doctor who has treated hundreds…*: the speaker shows why we should **trust** her: **ethos**.',
    say: ['Which appeal does sentence one mainly use? A: ethos, credibility. B: pathos, emotion. C: logos, logic. D: a bandwagon appeal.'],
  },
  ask: [
    ['Three sentences, three **appeals**', 'The speech has three sentences, and three appeals.'],
    ['Which one does **sentence 1** use?', 'We need the appeal in sentence one.'],
  ],
  know: {
    title: 'Ethos, pathos and logos',
    md: '**Ethos**: an appeal to **credibility**: why we should **trust** the speaker (experience, expertise, fairness). **Pathos**: an appeal to **emotion** (fear, pity, pride, love). **Logos**: an appeal to **logic** (facts, statistics, reasons). Good persuasion often uses **all three**. Other devices: **rhetorical questions**, **repetition**, **parallelism**.',
    say: [
      'Here is the idea we need. Ethos is an appeal to credibility: why we should trust the speaker, such as their experience or expertise. Pathos is an appeal to emotion, such as fear, pity, pride or love. Logos is an appeal to logic, with facts, statistics and reasons.',
      'Good persuasion often uses all three, along with devices like rhetorical questions, repetition and parallelism.',
    ],
  },
  plan: [
    ['Match **each** sentence to an appeal', 'Here is the plan. First, match each sentence to an appeal.'],
    ['Answer for **sentence 1**', 'Second, answer for sentence one.'],
  ],
  steps: [
    scene('Step 1: Match each sentence', [table('t', ['Sentence', 'What it does', 'Appeal'], [['1 *As a doctor who has treated hundreds…*', 'shows her **expertise**', '[[good:ethos]]'], ['2 *Imagine your little sister…*', 'stirs **fear** and **love**', 'pathos'], ['3 *nine of the ten cyclists…*', 'gives a **statistic**', 'logos']])], [
      { say: 'Step one. Sentence one tells us the speaker is a doctor who has treated hundreds of cycling injuries. It shows why we should trust her: ethos.', show: 't.0', focus: 't.0' },
      { say: 'Sentence two asks us to imagine a little sister in hospital. It stirs fear and love: pathos.', show: 't.1' },
      { say: 'Sentence three gives a statistic: logos.', show: 't.2' },
    ]),
    scene('Step 2: The answer', [quote('p', ['[[good:As a doctor who has treated hundreds of cycling injuries]], I urge you to wear a helmet.']), text('a', 'Credibility → **ethos** → **A**', 'lg')], [
      { say: 'Step two. Sentence one builds the speaker’s credibility. That is ethos. The answer is A.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Take away *As a doctor…*: would we trust her **as much**?', 'Let us check. Take away as a doctor. Would we trust her as much? No.'],
    ['That phrase does the work of **ethos**', 'That phrase does the work of ethos. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '*hundreds* is a number, but it shows **experience**, not proof', 'Choice C is the trap. Hundreds is a number, but here it shows her experience, not logical proof.'],
      ['B', 'Emotion comes in **sentence 2**', 'Choice B: the emotional appeal comes in sentence two.'],
      ['D', 'No claim that **everyone** does it', 'Choice D: there is no claim that everyone does it.'],
    ],
  },
  yourTurn: {
    prompt: 'Which appeal is *“Imagine your little sister lying in a hospital bed”*?',
    choices: ['ethos', 'logos', 'pathos', 'a fallacy'],
    answer: 2,
    working: 'It stirs **fear** and **love**: **pathos**.',
    ask: 'Which appeal is: Imagine your little sister lying in a hospital bed? A: ethos. B: logos. C: pathos. D: a fallacy.',
    reveal: 'The answer is C, pathos. It stirs fear and love to move us.',
  },
  sum: [
    ['**Ethos**: trust the **speaker**', 'Here is what to remember. Ethos makes us trust the speaker.'],
    ['**Pathos**: move the **emotions**', 'Pathos moves our emotions.'],
    ['**Logos**: convince with **logic**', 'And logos convinces with logic. For more on ethos, pathos and logos, watch this lesson’s explainer video on Gradileo.'],
  ],
});
