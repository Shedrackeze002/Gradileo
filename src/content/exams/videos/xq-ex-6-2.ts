import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 6.2 (Jane Eyre). An exam-style question we wrote, in the style of a GCSE
// English Literature exam, on Charlotte Brontë's Jane Eyre (1847), which is in the public domain. The answer
// is A: Jane insists on her freedom and her equal worth as a person.

const LINES = ['**Jane:** I am no bird; and no net ensnares me: I am a free human being with an independent will, which I now exert to leave you.'];

export default englishExam({
  lesson: 'ex-6-2',
  ...ours('a GCSE English Literature exam', 'the novel is Charlotte Brontë’s Jane Eyre (1847), in the public domain'),
  title: 'What Does “I Am No Bird” Show About Jane Eyre?',
  thumbnailTitle: 'Jane Eyre',
  subtitle: 'Jane’s independence, step by step',
  summary:
    'An exam-style question on Jane Eyre, solved one small step at a time. Jane, a governess, speaks out to her employer, Mr Rochester. We decode her image of the bird and the net, and explain what it shows about her.',
  intro: [
    'In this video, we solve an exam-style question about Jane Eyre. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Brontë’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Charlotte Brontë, Jane Eyre (1847), Chapter 23',
    say: ['First, the context. Jane is a governess at Thornfield Hall. She loves her employer, Mr Rochester, but believes he will marry someone else. When he tries to hold her back, she says: I am no bird; and no net ensnares me: I am a free human being with an independent will, which I now exert to leave you.'],
  },
  question: {
    prompt: 'What do these words mainly show about **Jane**?',
    text: 'Read Jane’s words from Jane Eyre. What do these words mainly show about Jane?',
    choices: [
      'She insists on her freedom and her equal worth, even though she is poor and a woman.',
      'She wants to become a bird-keeper.',
      'She is afraid of Mr Rochester.',
      'She has stopped caring about Mr Rochester.',
    ],
    answer: 0,
    working: '*no bird… no net* = not **trapped**; *a free human being with an independent will* = **equal** and **independent**.',
    say: [
      'What do these words mainly show about Jane?',
      'A: She insists on her freedom and her equal worth, even though she is poor and a woman. B: She wants to become a bird-keeper. C: She is afraid of Mr Rochester. D: She has stopped caring about Mr Rochester.',
    ],
  },
  ask: [
    ['Jane uses an image: a **bird** in a **net**', 'Jane uses an image of a bird caught in a net.'],
    ['What does it show about **her**?', 'We need to say what her words show about her.'],
  ],
  know: {
    title: 'Jane Eyre',
    md: 'The orphan **Jane** survives a cruel childhood with **Mrs Reed** and at **Lowood** school, where her friend **Helen Burns** dies. As governess at **Thornfield**, she falls in love with **Mr Rochester**, but on their wedding day learns he is already married to **Bertha Mason**, kept locked in the attic. Jane leaves, and returns only when she can marry as an **equal**. Themes: **independence**, **love and morality**, **class** and **the place of women**.',
    say: [
      'Here is the idea we need. The orphan Jane survives a cruel childhood with Mrs Reed and at Lowood school, where her friend Helen Burns dies. As governess at Thornfield, she falls in love with Mr Rochester, but on their wedding day learns he is already married to Bertha Mason, who is kept locked in the attic.',
      'Jane leaves, and returns only when she can marry as an equal. The themes include independence, love and morality, class, and the place of women.',
    ],
  },
  plan: [
    ['Decode the **image**', 'Here is the plan. First, decode the image.'],
    ['Read her **claim**', 'Second, read her claim about herself.'],
    ['Link to her **situation**', 'Third, link it to her situation.'],
  ],
  steps: [
    scene('Step 1: Image and claim', [table('t', ['Words', 'Meaning'], [['*I am **no bird**; and **no net** ensnares me*', 'I am not a **caged**, **trapped** creature'], ['*a **free human being***', 'my **equal** worth as a person'], ['*an **independent will***', 'I make my **own** choices']])], [
      { say: 'Step one. I am no bird, and no net ensnares me. A bird in a net is trapped. Jane refuses to be trapped.', show: 't.0' },
      { say: 'I am a free human being: she claims her equal worth as a person. With an independent will: she makes her own choices.', show: ['t.1', 't.2'], focus: 't.1' },
    ]),
    scene('Step 2: Her situation', [text('s', 'Jane is **poor**, a **servant**, and a **woman** in the eighteen-forties'), quote('p', ['…I am a [[good:free human being]] with an [[good:independent will]]…']), text('a', 'She insists on **freedom** and **equality** → **A**', 'lg')], [
      { say: 'Step two. Jane is poor, a servant, and a woman, in a time when all three meant having little power.', show: 's' },
      { say: 'Yet she speaks to her rich employer as an equal, and insists on her freedom. The answer is A.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['She **loves** him, yet still chooses to **leave**', 'Let us check. Jane loves Rochester, yet she still chooses to leave.'],
    ['her **independence** comes first', 'Her independence comes first. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Leaving is about **pride**, not lost love', 'Choice D is the trap. She says she will leave, but out of self-respect, not because she has stopped caring.'],
      ['B', '*bird* is a **metaphor**', 'Choice B: the bird is a metaphor.'],
      ['C', 'She speaks **boldly**, not fearfully', 'Choice C: she speaks boldly, not fearfully.'],
    ],
  },
  yourTurn: {
    prompt: 'Who is the secret wife that Mr Rochester keeps locked in the attic?',
    choices: ['Blanche Ingram', 'Bertha Mason', 'Helen Burns', 'Mrs Reed'],
    answer: 1,
    working: 'Rochester’s wife: **Bertha Mason**.',
    ask: 'Who is the secret wife that Mr Rochester keeps locked in the attic? A: Blanche Ingram. B: Bertha Mason. C: Helen Burns. D: Mrs Reed.',
    reveal: 'The answer is B, Bertha Mason. Jane learns about her on the day she is meant to marry Rochester.',
  },
  sum: [
    ['*I am no bird*: Jane refuses to be **trapped**', 'Here is what to remember. I am no bird: Jane refuses to be trapped.'],
    ['She claims **equality** despite class and gender', 'She claims equality, despite her class and her gender.'],
    ['Theme: **independence**', 'And independence is a central theme. For more on Jane Eyre, watch this lesson’s explainer video on Gradileo.'],
  ],
});
