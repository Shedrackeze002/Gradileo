import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 6.4 (The Sign of Four). An exam-style question we wrote, in the style of a
// GCSE English Literature exam, on Arthur Conan Doyle's The Sign of Four (1890), which is in the public
// domain. The answer is B: Holmes craves mental challenge and cannot bear an idle mind.

const LINES = ['**Holmes:** My mind rebels at stagnation. Give me problems, give me work, give me the most abstruse cryptogram, or the most intricate analysis, and I am in my own proper atmosphere.'];

export default englishExam({
  lesson: 'ex-6-4',
  ...ours('a GCSE English Literature exam', 'the novel is Arthur Conan Doyle’s The Sign of Four (1890), in the public domain'),
  title: 'What Does “My Mind Rebels at Stagnation” Show About Holmes?',
  thumbnailTitle: 'The Sign of Four',
  subtitle: 'Sherlock Holmes’s mind, step by step',
  summary:
    'An exam-style question on The Sign of Four, solved one small step at a time. At the start of the novel, Sherlock Holmes explains to Dr Watson why he cannot stand an empty day. We decode his words and say what they show about him.',
  intro: [
    'In this video, we solve an exam-style question about The Sign of Four. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Conan Doyle’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Arthur Conan Doyle, The Sign of Four (1890), Chapter 1',
    say: ['First, the context. Without a case to solve, Holmes has turned to drugs, and Watson is worried. Holmes explains: My mind rebels at stagnation. Give me problems, give me work, give me the most abstruse cryptogram, or the most intricate analysis, and I am in my own proper atmosphere.'],
  },
  question: {
    prompt: 'What do these words mainly show about **Holmes**?',
    text: 'Read Holmes’s words from The Sign of Four. What do these words mainly show about Holmes?',
    choices: [
      'He wants to rest and do nothing.',
      'He craves mental challenge, and an idle mind is torture to him.',
      'He dislikes working with Watson.',
      'He thinks puzzles are a waste of time.',
    ],
    answer: 1,
    working: '*rebels at stagnation* = **hates** being idle; *Give me problems, give me work…* = **craves** challenge.',
    say: [
      'What do these words mainly show about Holmes?',
      'A: He wants to rest and do nothing. B: He craves mental challenge, and an idle mind is torture to him. C: He dislikes working with Watson. D: He thinks puzzles are a waste of time.',
    ],
  },
  ask: [
    ['Holmes describes his **mind**', 'Holmes describes his own mind.'],
    ['What does it **show**?', 'We need to say what his words show about him.'],
  ],
  know: {
    title: 'The Sign of Four',
    md: '**Mary Morstan** brings **Sherlock Holmes** and **Dr Watson** a mystery: a pearl sent to her every year, and a meeting with a stranger. It leads to **Thaddeus Sholto**, a murder, and a stolen **Agra treasure**. The criminal, **Jonathan Small**, is caught after a boat chase on the Thames. Watson, the **narrator**, falls in love with Mary. Themes: **reason** and **deduction**, **greed**, **empire** and **crime**.',
    say: [
      'Here is the idea we need. Mary Morstan brings Sherlock Holmes and Dr Watson a mystery: a pearl sent to her every year, and a meeting with a stranger. It leads to Thaddeus Sholto, a murder, and a stolen treasure from Agra, in India.',
      'The criminal, Jonathan Small, is caught after a boat chase on the Thames. Watson, the narrator, falls in love with Mary. The themes include reason and deduction, greed, empire and crime.',
    ],
  },
  plan: [
    ['Decode the **words**', 'Here is the plan. First, decode the words.'],
    ['Notice the **repetition**', 'Second, notice the repetition.'],
    ['Say what it **shows**', 'Third, say what it shows.'],
  ],
  steps: [
    scene('Step 1: Decode', [table('t', ['Words', 'Meaning'], [['*My mind **rebels** at **stagnation***', 'my mind **fights against** being idle'], ['*the most **abstruse cryptogram***', 'the hardest **code** to crack'], ['*my own **proper atmosphere***', 'where I **belong**, and feel alive']])], [
      { say: 'Step one. My mind rebels at stagnation. Stagnation is still, unmoving water that goes bad. His mind fights against being idle.', show: 't.0' },
      { say: 'The most abstruse cryptogram is the hardest code to crack. And in his own proper atmosphere means where he belongs, and feels alive.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Repetition', [quote('p', ['[[good:Give me]] problems, [[good:give me]] work, [[good:give me]] the most abstruse cryptogram…']), text('a', 'He **craves** challenge; idleness is **torture** → **B**', 'lg')], [
      { say: 'Step two. Give me, give me, give me. The repetition sounds hungry, almost desperate.', show: 'p' },
      { say: 'Holmes craves mental challenge, and an idle mind torments him, which is why he turns to drugs without a case. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['This explains his **drug use** between cases', 'Let us check. This explains his drug use when he has no case.'],
    ['the mystery that follows **cures** it', 'And the mystery that follows cures it. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'He **hates** stagnation, the opposite of rest', 'Choice A is the trap. Stagnation sounds restful, but he hates it.'],
      ['C', 'Watson is not **mentioned**', 'Choice C: Watson is not mentioned in these words.'],
      ['D', 'Puzzles are his **proper atmosphere**', 'Choice D: puzzles are his proper atmosphere.'],
    ],
  },
  yourTurn: {
    prompt: 'Who **narrates** The Sign of Four?',
    choices: ['Sherlock Holmes', 'Mary Morstan', 'Jonathan Small', 'Dr Watson'],
    answer: 3,
    working: 'Holmes’s friend and assistant, **Dr Watson**, tells the story.',
    ask: 'Who narrates The Sign of Four? A: Sherlock Holmes. B: Mary Morstan. C: Jonathan Small. D: Dr Watson.',
    reveal: 'The answer is D, Dr Watson. He tells the story, which lets readers admire Holmes through his friend’s eyes.',
  },
  sum: [
    ['Holmes **craves** mental challenge', 'Here is what to remember. Holmes craves mental challenge.'],
    ['Idleness drives him to **drugs**', 'Idleness drives him to drugs.'],
    ['Themes: **reason**, **greed**, **empire**', 'And the novel’s themes include reason, greed and empire. For more on The Sign of Four, watch this lesson’s explainer video on Gradileo.'],
  ],
});
