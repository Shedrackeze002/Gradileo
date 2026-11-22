import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 4.1 (rhetorical strategy). An exam-style question we wrote, in the style of a
// Grade 12 reading test, on Frederick Douglass's speech "What to the Slave Is the Fourth of July?" (1852),
// which is in the public domain. The answer is B: Douglass turns a celebration of liberty into an
// accusation, using the audience's own ideals to expose the hypocrisy of slavery.

const LINES = ['What, to the American slave, is your 4th of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim.'];

export default englishExam({
  lesson: 'e12-4-1',
  ...ours('a Grade 12 reading test', 'the speech is Frederick Douglass’s “What to the Slave Is the Fourth of July?” (1852), in the public domain'),
  title: 'What Is Douglass’s Strategy in His Fourth of July Speech?',
  thumbnailTitle: 'Rhetorical Strategy',
  subtitle: 'How a speech persuades, step by step',
  summary:
    'An exam-style question on Frederick Douglass’s famous speech, solved one small step at a time. Invited to speak at a Fourth of July celebration, Douglass, who had escaped slavery, asks his audience a question. We look at the question, his answer and his audience, and name the strategy.',
  intro: [
    'In this video, we solve an exam-style question about rhetorical strategy. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Douglass’s speech, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Frederick Douglass, “What to the Slave Is the Fourth of July?” (1852)',
    say: ['First, the context. Frederick Douglass escaped from slavery and became a great speaker against it. In eighteen fifty-two he was invited to speak at a Fourth of July celebration in New York. He said: What, to the American slave, is your Fourth of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim.'],
  },
  question: {
    prompt: 'What is Douglass’s main **rhetorical strategy** in this passage?',
    text: 'Read the passage from Douglass’s speech. What is Douglass’s main rhetorical strategy in this passage?',
    choices: [
      'He thanks the audience warmly and praises the holiday.',
      'He turns a celebration of liberty into an accusation, using the audience’s own ideals to expose the injustice of slavery.',
      'He tells a funny story to relax the audience.',
      'He lists statistics about the cotton trade.',
    ],
    answer: 1,
    working: '*your* 4th of July = the holiday is **theirs**, not the slave’s; a day of **liberty** *reveals… injustice*: their **ideals** expose their **hypocrisy**.',
    say: [
      'What is Douglass’s main rhetorical strategy in this passage?',
      'A: He thanks the audience warmly and praises the holiday. B: He turns a celebration of liberty into an accusation, using the audience’s own ideals to expose the injustice of slavery. C: He tells a funny story to relax the audience. D: He lists statistics about the cotton trade.',
    ],
  },
  ask: [
    ['He speaks at a **celebration** of freedom', 'Douglass speaks at a celebration of freedom.'],
    ['What is his **strategy**?', 'We need to name the strategy of the passage.'],
  ],
  know: {
    title: 'Rhetorical strategy',
    md: 'A **strategy** is the overall plan of a speech: how all its parts work together to move a particular **audience**. Look at the **occasion** (when and where), the **audience** (what they believe and value), and the **turn** the speaker makes. Then explain the **effect** of each choice on that audience: a question, a repeated word, a shift of tone.',
    say: [
      'Here is the idea we need. A strategy is the overall plan of a speech: how all its parts work together to move a particular audience. So look at the occasion, the audience and what they believe, and the turn the speaker makes.',
      'Then explain the effect of each choice on that audience: a question, a repeated word, or a shift of tone.',
    ],
  },
  plan: [
    ['**Occasion** and **audience**', 'Here is the plan. First, the occasion and the audience.'],
    ['What does he **do** with them?', 'Second, what does he do with them?'],
    ['Name the **strategy**', 'Third, name the strategy.'],
  ],
  steps: [
    scene('Step 1: Occasion and audience', [table('t', ['Element', 'Detail'], [['occasion', 'a **Fourth of July** celebration: the birthday of **liberty**'], ['audience', 'free citizens who **value** freedom and equality'], ['speaker', 'a man who **escaped** slavery']])], [
      { say: 'Step one. The occasion is a Fourth of July celebration, the birthday of American liberty.', show: 't.0' },
      { say: 'The audience are free citizens who value freedom and equality. And the speaker escaped from slavery himself.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: The turn', [quote('p', ['What, to the American slave, is [[theta:your]] 4th of July?', 'I answer: a day that reveals… the [[bad:gross injustice and cruelty]]…']), text('a', 'Their **own ideals** become the **charge** against them → **B**', 'lg')], [
      { say: 'Step two. Your Fourth of July: the holiday is theirs, not the slave’s. And a day of liberty reveals, more than any other, the injustice of slavery.', show: 'p' },
      { say: 'He uses the audience’s own love of freedom to show their hypocrisy. The celebration becomes an accusation. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['The question is **rhetorical**: he answers it himself', 'Let us check. The question is rhetorical. Douglass answers it himself, at once.'],
    ['and the answer **accuses**, it does not praise', 'And his answer accuses. It does not praise. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The **occasion** is a celebration, but he does not **celebrate**', 'Choice A is the trap. The occasion is a celebration, but Douglass does not celebrate it.'],
      ['C', 'The tone is **serious**, not funny', 'Choice C: the tone is serious, not funny.'],
      ['D', 'No **statistics**: a question and an answer', 'Choice D: there are no statistics, just a question and an answer.'],
    ],
  },
  yourTurn: {
    prompt: 'Douglass keeps saying *your*: *your* celebration, *your* liberty, *your* Fourth of July. What is the main effect?',
    choices: ['It separates the enslaved from the celebration, stressing their exclusion.', 'It flatters the audience.', 'It makes the speech sound friendly and relaxed.', 'It shows he has forgotten the date.'],
    answer: 0,
    working: '*your* ≠ *our*: the freedom being celebrated **excludes** the enslaved.',
    ask: 'Douglass keeps saying your: your celebration, your liberty, your Fourth of July. What is the main effect? A: It separates the enslaved from the celebration, stressing their exclusion. B: It flatters the audience. C: It makes the speech sound friendly and relaxed. D: It shows he has forgotten the date.',
    reveal: 'The answer is A. By saying your, not our, Douglass shows that the freedom being celebrated does not include the enslaved.',
  },
  sum: [
    ['A **strategy** is the whole plan of a speech', 'Here is what to remember. A strategy is the whole plan of a speech.'],
    ['Read the **occasion** and the **audience**', 'Read the occasion and the audience.'],
    ['Explain each choice’s **effect** on them', 'And explain each choice’s effect on them. For more on rhetorical strategy, watch this lesson’s explainer video on Gradileo.'],
  ],
});
