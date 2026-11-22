import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 10.2 (Blood Brothers). An exam-style question we wrote, in the style of a GCSE
// English Literature exam. Willy Russell's play is still in copyright, so it is described in our own words
// and not quoted. The answer is C: the twins are raised in different social classes.

export default englishExam({
  lesson: 'ex-10-2',
  ...ours('a GCSE English Literature exam', 'the play is Willy Russell’s Blood Brothers (1983), still in copyright, so it is described in our own words and not quoted'),
  title: 'Why Do the Twins’ Lives Turn Out So Differently?',
  thumbnailTitle: 'Blood Brothers',
  subtitle: 'Class and fate, step by step',
  summary:
    'An exam-style question on Blood Brothers, solved one small step at a time. Twin brothers are separated as babies: one stays with his poor mother, the other is raised by a rich family. We compare their lives and name what makes the difference.',
  intro: [
    'In this video, we solve an exam-style question about Blood Brothers. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam. The play is still in copyright, so we describe it in our own words.',
  ],
  question: {
    prompt: 'Mickey and Eddie are twins, separated at birth. What is the **main reason** their lives turn out so differently?',
    text: 'Mickey and Eddie are twins, separated at birth. What is the main reason their lives turn out so differently?',
    choices: [
      'Eddie is naturally cleverer than Mickey.',
      'Mickey does not try hard enough at school.',
      'They are raised in different social classes, with very different money, schooling and chances.',
      'Their friend Linda chooses Eddie over Mickey.',
    ],
    answer: 2,
    working: '**Same** genes, **different** class: Eddie gets money, university, a good job; Mickey gets poverty and unemployment.',
    say: [
      'Mickey and Eddie are twins, separated at birth. What is the main reason their lives turn out so differently?',
      'A: Eddie is naturally cleverer than Mickey. B: Mickey does not try hard enough at school. C: They are raised in different social classes, with very different money, schooling and chances. D: Their friend Linda chooses Eddie over Mickey.',
    ],
  },
  ask: [
    ['**Twins**, separated at birth', 'Mickey and Eddie are twins, separated at birth.'],
    ['Why do their lives **differ**?', 'We need the main reason their lives turn out so differently.'],
  ],
  know: {
    title: 'Blood Brothers',
    md: 'Poor **Mrs Johnstone** cannot afford twins, so she gives one baby to her wealthy employer, **Mrs Lyons**. **Mickey** grows up poor; **Eddie** grows up rich. They meet, become **blood brothers**, and both love **Linda**. As adults, Eddie goes to university while Mickey loses his job and turns to crime; the play ends with both brothers dead. A **Narrator** warns of **superstition** and fate. Themes: **social class**, **nature versus nurture**, and **fate**.',
    say: [
      'Here is the idea we need. Poor Mrs Johnstone cannot afford twins, so she gives one baby to her wealthy employer, Mrs Lyons. Mickey grows up poor, and Eddie grows up rich. They meet, become blood brothers, and both love Linda.',
      'As adults, Eddie goes to university while Mickey loses his job and turns to crime, and the play ends with both brothers dead. A Narrator warns of superstition and fate. The themes include social class, nature versus nurture, and fate.',
    ],
  },
  plan: [
    ['What is the **same**?', 'Here is the plan. First, what is the same about the twins?'],
    ['What is **different**?', 'Second, what is different?'],
    ['Name the **cause**', 'Third, name the cause.'],
  ],
  steps: [
    scene('Step 1: Same and different', [table('t', ['Stage', 'Mickey', 'Eddie'], [['born', 'same **mother**, same day', 'same **mother**, same day'], ['raised', '**poor**, many siblings', '**rich**, only child'], ['as adults', '**unemployed**, depressed', '**university**, a councillor']])], [
      { say: 'Step one. The twins have the same mother and are born on the same day. Nature gives them the same start.', show: 't.0' },
      { say: 'But Mickey is raised poor, in a crowded house, and Eddie is raised rich. As adults, Mickey is unemployed and depressed, while Eddie goes to university and becomes a councillor.', show: ['t.1', 't.2'], focus: 't.2' },
    ]),
    scene('Step 2: The cause', [text('m', 'Same **nature**, different **nurture**: the difference is **class**'), text('a', 'Different classes, different chances → **C**', 'lg')], [
      { say: 'Step two. Since the twins share the same nature, the difference must come from how they are raised, and that is decided by class.', show: 'm' },
      { say: 'Money, schooling and chances make their lives different. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Russell uses **twins** to remove nature as an excuse', 'Let us check. Russell uses twins so that nature cannot be the excuse.'],
    ['so **class** is left as the cause', 'So class is left as the cause. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'They are **twins**: nature is the **same**', 'Choice A is the trap. One seems cleverer, but they are twins, so their nature is the same.'],
      ['B', 'Blames Mickey, not the **system**', 'Choice B blames Mickey, not the system around him.'],
      ['D', 'Linda matters, but is not the **main** reason', 'Choice D: Linda matters, but she is not the main reason.'],
    ],
  },
  yourTurn: {
    prompt: 'Which character speaks directly to the audience and warns of superstition and fate?',
    choices: ['Mrs Johnstone', 'the Narrator', 'Linda', 'Mrs Lyons'],
    answer: 1,
    working: 'The **Narrator** comments and warns throughout.',
    ask: 'Which character speaks directly to the audience and warns of superstition and fate? A: Mrs Johnstone. B: the Narrator. C: Linda. D: Mrs Lyons.',
    reveal: 'The answer is B, the Narrator. His warnings build a sense that the ending cannot be escaped.',
  },
  sum: [
    ['Twins: the same **nature**, different **nurture**', 'Here is what to remember. The twins share the same nature, but different nurture.'],
    ['**Class** decides their chances', 'Class decides their chances.'],
    ['Themes: **class**, **fate**, **nature versus nurture**', 'And the play’s themes are class, fate, and nature versus nurture. For more on Blood Brothers, watch this lesson’s explainer video on Gradileo.'],
  ],
});
