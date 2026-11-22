import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 2.1 (extended metaphor, conceit and allusion). An exam-style question we wrote,
// in the style of a Grade 11 reading test, on John Donne's "A Valediction: Forbidding Mourning" (1633),
// which is in the public domain. The answer is B: the fixed foot of the compass is the beloved's soul,
// which stays at home but leans after the travelling speaker.

const POEM = ['If they be two, they are two so<br>As stiff twin compasses are two;<br>Thy soul, the fixed foot, makes no show<br>To move, but doth, if th’ other do.', 'And though it in the center sit,<br>Yet when the other far doth roam,<br>It leans and hearkens after it,<br>And grows erect, as that comes home.'];

export default englishExam({
  lesson: 'e11-2-1',
  ...ours('a Grade 11 reading test', 'the poem is John Donne’s “A Valediction: Forbidding Mourning” (1633), in the public domain'),
  title: 'What Is the “Fixed Foot” in Donne’s Compass?',
  thumbnailTitle: 'The Metaphysical Conceit',
  subtitle: 'Following an extended metaphor, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on John Donne’s famous comparison of two lovers to the legs of a drawing compass. We see how a compass works, map each part onto the lovers, and explain what the fixed foot stands for.',
  intro: [
    'In this video, we solve an exam-style poetry question about an extended metaphor, called a conceit. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Donne’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'John Donne, “A Valediction: Forbidding Mourning” (1633), stanzas 7 and 8',
    say: [
      'First, read two stanzas. The speaker is leaving on a journey, and tells his wife not to mourn. If they be two, they are two so as stiff twin compasses are two; thy soul, the fixed foot, makes no show to move, but doth, if the other do.',
      'And though it in the center sit, yet when the other far doth roam, it leans and hearkens after it, and grows erect, as that comes home.',
    ],
  },
  question: {
    prompt: 'In Donne’s comparison, what does **the fixed foot** of the compass stand for?',
    text: 'Read the stanzas from Donne’s poem. In Donne’s comparison, what does the fixed foot of the compass stand for?',
    choices: [
      'the speaker, who travels far away',
      'the wife’s soul, which stays at home but leans after him',
      'the road the speaker travels',
      'the circle the compass draws',
    ],
    answer: 1,
    working: '*Thy soul, the fixed foot*: the **wife’s** soul stays in the **centre**, but **leans** after the roaming foot.',
    say: [
      'In Donne’s comparison, what does the fixed foot of the compass stand for?',
      'A: the speaker, who travels far away. B: the wife’s soul, which stays at home but leans after him. C: the road the speaker travels. D: the circle the compass draws.',
    ],
  },
  ask: [
    ['Two lovers compared to a **compass**', 'Donne compares two lovers to a drawing compass.'],
    ['What is the **fixed foot**?', 'We need to know what the fixed foot stands for.'],
  ],
  know: {
    title: 'Extended metaphor, conceit and allusion',
    md: 'An **extended metaphor** carries one comparison through several lines. A **conceit** is a **surprising**, clever extended metaphor that links two very **unlike** things, typical of **metaphysical** poets like Donne. To follow one, **map** each part of the image onto the idea. An **allusion** is a brief reference to a well-known story, person or text (*the Midas touch*).',
    say: [
      'Here is the idea we need. An extended metaphor carries one comparison through several lines. A conceit is a surprising, clever extended metaphor that links two very unlike things, typical of metaphysical poets like Donne.',
      'To follow one, map each part of the image onto the idea. An allusion, by contrast, is a brief reference to a well-known story, person or text, such as the Midas touch.',
    ],
  },
  plan: [
    ['How does a **compass** work?', 'Here is the plan. First, how does a drawing compass work?'],
    ['**Map** each part onto the lovers', 'Second, map each part onto the lovers.'],
  ],
  steps: [
    scene('Step 1: The compass', [text('n', 'A drawing compass has **two legs**: one stays **fixed** at the **centre**; the other **moves** round to draw a circle. When the moving leg goes far, the fixed leg **leans** towards it.')], [
      { say: 'Step one. A drawing compass has two legs joined at the top. One leg stays fixed at the centre, while the other moves round to draw a circle. When the moving leg goes far out, the fixed leg leans towards it.', show: 'n' },
    ]),
    scene('Step 2: Map the parts', [table('t', ['Compass', 'The lovers'], [['two legs, **joined**', 'two people, **one** in love'], ['the **moving** foot that *far doth roam*', 'the **speaker**, travelling'], ['*the fixed foot*… *in the center*', '[[good:the **wife’s soul**, at home]]'], ['*It leans and hearkens after it*', 'she **longs** for him while he is away']]), quote('p', ['[[good:Thy soul, the fixed foot]], makes no show / To move…']), text('a', 'The fixed foot = the wife’s soul → **B**', 'lg')], [
      { say: 'Step two. The two joined legs are the two lovers. The moving foot that roams far is the speaker on his journey.', show: ['t.0', 't.1'] },
      { say: 'Donne tells us directly: thy soul, the fixed foot. The wife’s soul stays at home, in the centre, but leans after him while he is away.', show: ['t.2', 't.3', 'p'], focus: 't.2' },
      { say: 'So the fixed foot is the wife’s soul. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['*grows erect, as that comes home*: she **straightens** when he returns', 'Let us check. The fixed foot grows erect as the other comes home. She straightens when he returns.'],
    ['The mapping **holds** to the end', 'The mapping holds all the way through. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The speaker is the **moving** foot', 'Choice A is the trap. The speaker is in the image, but he is the moving foot, the one that roams.'],
      ['C', 'No **road** in the image', 'Choice C: there is no road in the image.'],
      ['D', 'The circle is drawn by the **moving** foot', 'Choice D: the circle is not a foot at all.'],
    ],
  },
  yourTurn: {
    prompt: '*“She has the **Midas touch**.”* What does this **allusion** suggest?',
    choices: ['Everything she does succeeds or makes money.', 'She is greedy and cruel.', 'She is very strong.', 'She is a fast runner.'],
    answer: 0,
    working: 'King **Midas** turned everything he touched to **gold**.',
    ask: 'She has the Midas touch. What does this allusion suggest? A: Everything she does succeeds or makes money. B: She is greedy and cruel. C: She is very strong. D: She is a fast runner.',
    reveal: 'The answer is A. In Greek myth, everything King Midas touched turned to gold, so the phrase means every venture succeeds.',
  },
  sum: [
    ['A **conceit** links two very unlike things', 'Here is what to remember. A conceit is a clever comparison of two very unlike things.'],
    ['**Map** each part of the image onto the idea', 'Map each part of the image onto the idea.'],
    ['An **allusion** borrows a famous reference', 'And an allusion borrows a famous reference. For more on extended metaphor, conceit and allusion, watch this lesson’s explainer video on Gradileo.'],
  ],
});
