import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 7.1 (the analytical essay). An exam-style writing question we wrote, in the
// style of a Grade 9 writing test, about a thesis on Romeo and Juliet. The answer is D: it makes an
// arguable interpretation and says how the writer will prove it.

export default englishExam({
  lesson: 'e9-7-1',
  ...ours('a Grade 9 writing test'),
  title: 'Which Is the Strongest Analytical Thesis?',
  thumbnailTitle: 'Analytical Thesis',
  subtitle: 'Writing a thesis that argues, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: four possible thesis statements for an essay on Romeo and Juliet. We learn what makes a thesis analytical, test each one, and choose the strongest.',
  intro: [
    'In this video, we solve an exam-style question about writing an analytical thesis. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 writing test.',
  ],
  question: {
    prompt: 'A student is writing an essay on Shakespeare’s *Romeo and Juliet*. Which is the **strongest analytical thesis**?',
    text: 'A student is writing an essay on Shakespeare’s Romeo and Juliet. Which is the strongest analytical thesis?',
    choices: [
      'Romeo and Juliet is a play by William Shakespeare.',
      'Romeo and Juliet is a really good play that everyone should read.',
      'In this essay, I will write about Romeo and Juliet.',
      'Through the hasty decisions of its young lovers, Romeo and Juliet suggests that impatience, more than fate, causes the tragedy.',
    ],
    answer: 3,
    working: 'An analytical thesis makes an **arguable interpretation** (*impatience, more than fate*) and points to the **evidence** (*hasty decisions*).',
    say: [
      'A student is writing an essay on Shakespeare’s Romeo and Juliet. Which is the strongest analytical thesis?',
      'A: Romeo and Juliet is a play by William Shakespeare. B: Romeo and Juliet is a really good play that everyone should read. C: In this essay, I will write about Romeo and Juliet. D: Through the hasty decisions of its young lovers, Romeo and Juliet suggests that impatience, more than fate, causes the tragedy.',
    ],
  },
  ask: [
    ['We need an **analytical** thesis', 'We need the strongest analytical thesis.'],
    ['What makes a thesis **strong**?', 'So first, what makes a thesis strong?'],
  ],
  know: {
    title: 'The analytical thesis',
    md: 'A **thesis** is the essay’s main claim, usually at the end of the introduction. An **analytical** thesis makes an **interpretation** that someone **could disagree with**, and hints at **how** you will prove it. It is **not** a fact, a personal opinion of liking, or an announcement (*In this essay I will…*). Each body paragraph opens with a **topic sentence** that supports it.',
    say: [
      'Here is the idea we need. A thesis is the essay’s main claim, usually at the end of the introduction. An analytical thesis makes an interpretation that someone could disagree with, and hints at how you will prove it.',
      'A plain fact, a statement that you liked the book, or an announcement like in this essay I will, is not an analytical thesis. Each body paragraph then opens with a topic sentence that supports it.',
    ],
  },
  plan: [
    ['Test: is it **arguable**?', 'Here is the plan. First, test whether each thesis is arguable.'],
    ['Test: does it show **how**?', 'Second, test whether it shows how it will be proved.'],
  ],
  steps: [
    scene('Step 1: Test each thesis', [table('t', ['Choice', 'What it is', 'Arguable?'], [['A', 'a **fact**', '[[bad:✗ no one disagrees]]'], ['B', 'a **liking**, not analysis', '[[bad:✗ just opinion]]'], ['C', 'an **announcement**', '[[bad:✗ makes no claim]]'], ['D', 'an **interpretation** with evidence', '[[good:✓ some blame fate instead]]']])], [
      { say: 'Step one. A is a fact. No one could disagree that Shakespeare wrote the play.', show: 't.0' },
      { say: 'B says the play is good and everyone should read it. That is a liking, not an analysis of the play.', show: 't.1' },
      { say: 'C only announces the topic. It makes no claim at all.', show: 't.2' },
      { say: 'D makes an interpretation: impatience, more than fate, causes the tragedy. Some readers would argue it is fate, so it is arguable.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: Does it show how?', [text('n', '*Through the **hasty decisions** of its young lovers* → the essay will analyse those **decisions**'), text('a', 'Arguable + shows the evidence → **D**', 'lg')], [
      { say: 'Step two. Through the hasty decisions of its young lovers tells us how the essay will prove it. It will analyse their decisions.', show: 'n' },
      { say: 'So D is arguable, and shows its evidence. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Each body paragraph can analyse **one** hasty decision', 'Let us check. Each body paragraph could analyse one hasty decision, like the quick marriage.'],
    ['so D can **organise** the whole essay', 'So D can organise the whole essay. It holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Sounds like an opinion, but **liking** is not **analysis**', 'Choice B is the trap. It sounds like an argument, but saying you like a play is not analysing it.'],
      ['A', 'A **fact**, not a claim', 'Choice A is a fact, not a claim.'],
      ['C', 'An **announcement**, not a claim', 'Choice C announces the topic but makes no claim.'],
    ],
  },
  yourTurn: {
    prompt: 'What should a **topic sentence** in a body paragraph do?',
    choices: [
      'State the paragraph’s main point, which supports the thesis.',
      'Repeat the essay’s title.',
      'Give a quotation with no explanation.',
      'Introduce a completely new topic.',
    ],
    answer: 0,
    working: 'It states the **paragraph’s point**, linked to the **thesis**.',
    ask: 'What should a topic sentence in a body paragraph do? A: State the paragraph’s main point, which supports the thesis. B: Repeat the essay’s title. C: Give a quotation with no explanation. D: Introduce a completely new topic.',
    reveal: 'The answer is A. A topic sentence states the paragraph’s main point, and that point supports the thesis.',
  },
  sum: [
    ['A thesis must be **arguable**', 'Here is what to remember. An analytical thesis must be arguable.'],
    ['It hints at **how** you will prove it', 'It hints at how you will prove it.'],
    ['Not a **fact**, a **liking** or an **announcement**', 'And it is not a fact, a liking or an announcement. For more on the analytical essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
