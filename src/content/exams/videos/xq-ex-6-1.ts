import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 6.1 (Frankenstein). An exam-style question we wrote, in the style of a GCSE
// English Literature exam, on Mary Shelley's Frankenstein (1818), which is in the public domain. The answer
// is D: the creature argues that he was born good and that cruel treatment made him evil.

const LINES = ['**The creature:** I was benevolent and good; misery made me a fiend. Make me happy, and I shall again be virtuous.'];

export default englishExam({
  lesson: 'ex-6-1',
  ...ours('a GCSE English Literature exam', 'the novel is Mary Shelley’s Frankenstein (1818), in the public domain'),
  title: 'What Does the Creature Mean by “Misery Made Me a Fiend”?',
  thumbnailTitle: 'Frankenstein',
  subtitle: 'The creature’s argument, step by step',
  summary:
    'An exam-style question on Frankenstein, solved one small step at a time. The creature meets Victor Frankenstein on a glacier and explains why he has become violent. We follow his argument from good, to misery, to fiend, and link it to the novel’s big question about nature and nurture.',
  intro: [
    'In this video, we solve an exam-style question about Frankenstein. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Shelley’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Mary Shelley, Frankenstein (1818), Volume 2, Chapter 2',
    say: ['First, the context. Victor Frankenstein created a living being and then abandoned it. Rejected by everyone it met, the creature has killed. Now it confronts Victor. I was benevolent and good; misery made me a fiend. Make me happy, and I shall again be virtuous.'],
  },
  question: {
    prompt: 'What is the creature mainly **arguing** in these lines?',
    text: 'Read the creature’s lines from Frankenstein. What is the creature mainly arguing in these lines?',
    choices: [
      'He was always evil, and nothing can change him.',
      'He is happy with the life Victor gave him.',
      'He wants Victor to destroy him at once.',
      'He was born good, and cruel treatment made him evil, so kindness could change him back.',
    ],
    answer: 3,
    working: '*was benevolent and good* (**born good**) → *misery made me a fiend* (**made evil**) → *Make me happy… virtuous* (**can change**).',
    say: [
      'What is the creature mainly arguing in these lines?',
      'A: He was always evil, and nothing can change him. B: He is happy with the life Victor gave him. C: He wants Victor to destroy him at once. D: He was born good, and cruel treatment made him evil, so kindness could change him back.',
    ],
  },
  ask: [
    ['The creature explains his **violence**', 'The creature explains why he has become violent.'],
    ['What is his **argument**?', 'We need to state his argument.'],
  ],
  know: {
    title: 'Frankenstein',
    md: '**Victor Frankenstein** creates life, then **abandons** his creature in horror. The creature, rejected by everyone, learns language by watching a family, then turns to **revenge**, killing Victor’s brother **William**, his friend **Clerval** and his bride **Elizabeth**. Victor tells his story to the explorer **Robert Walton**. Themes: **dangerous ambition**, **responsibility**, **isolation**, and **nature versus nurture**.',
    say: [
      'Here is the idea we need. Victor Frankenstein creates life, then abandons his creature in horror. The creature, rejected by everyone, learns language by watching a family, then turns to revenge, killing Victor’s brother William, his friend Clerval and his bride Elizabeth.',
      'Victor tells his story to the explorer Robert Walton. The themes include dangerous ambition, responsibility, isolation, and nature versus nurture.',
    ],
  },
  plan: [
    ['What was he **at first**?', 'Here is the plan. First, what was the creature at first?'],
    ['What **changed** him?', 'Second, what changed him?'],
    ['What does he **ask**?', 'Third, what does he ask for?'],
  ],
  steps: [
    scene('Step 1: The three steps', [table('t', ['Words', 'Meaning'], [['*I **was** benevolent and good*', 'he was **born good**'], ['*misery **made** me a fiend*', 'suffering **made** him evil'], ['*Make me happy, and I shall **again** be virtuous*', 'kindness could **change** him back']])], [
      { say: 'Step one. I was benevolent and good: he began life kind and good.', show: 't.0' },
      { say: 'Misery made me a fiend. The verb made matters. Suffering made him evil. He was not born that way.', show: 't.1', focus: 't.1' },
      { say: 'Make me happy, and I shall again be virtuous. Kindness could change him back.', show: 't.2' },
    ]),
    scene('Step 2: The argument', [quote('p', ['I was [[good:benevolent and good]]; [[bad:misery made me a fiend]].', 'Make me happy, and I shall [[good:again be virtuous]].']), text('a', 'Born good, **made** evil, can be **changed** → **D**', 'lg')], [
      { say: 'Step two. His argument is that he was born good, and that cruel treatment made him evil.', show: 'p' },
      { say: 'So kindness could change him back. That is an argument for nurture over nature. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['He blames the **rejection** he suffered', 'Let us check. He blames the rejection he suffered, starting with Victor’s.'],
    ['which makes Victor **responsible** too', 'Which makes Victor responsible too. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'He calls himself a *fiend*, but says he **was** good', 'Choice A is the trap. He does call himself a fiend, but he says he was good, and could be again.'],
      ['B', '*misery*: he is **unhappy**', 'Choice B: misery shows he is unhappy.'],
      ['C', 'He asks to be **made happy**, not destroyed', 'Choice C: he asks to be made happy, not destroyed.'],
    ],
  },
  yourTurn: {
    prompt: 'Who tells most of his story to the Arctic explorer **Robert Walton**?',
    choices: ['Victor Frankenstein', 'Elizabeth', 'Henry Clerval', 'William'],
    answer: 0,
    working: 'Walton rescues **Victor**, who tells him everything.',
    ask: 'Who tells most of his story to the Arctic explorer Robert Walton? A: Victor Frankenstein. B: Elizabeth. C: Henry Clerval. D: William.',
    reveal: 'The answer is A, Victor. Walton rescues him from the ice, and Victor tells him his story as a warning.',
  },
  sum: [
    ['The creature: **born good**, **made** evil', 'Here is what to remember. The creature says he was born good and made evil.'],
    ['A key theme: **nature versus nurture**', 'That links to a key theme, nature versus nurture.'],
    ['and Victor’s **responsibility**', 'And to Victor’s responsibility for what he created. For more on Frankenstein, watch this lesson’s explainer video on Gradileo.'],
  ],
});
