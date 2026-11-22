import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 6.5 (revising and editing). An exam-style question we wrote, in the style of a
// Grade 10 writing test. The answer is C: closing the bridge is the result of it being unsafe, so the
// transition must show cause and effect.

export default englishExam({
  lesson: 'e10-6-5',
  ...ours('a Grade 10 writing test'),
  title: 'Which Transition Fits the Gap?',
  thumbnailTitle: 'Transitions',
  subtitle: 'Choosing a transition, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: “The bridge was old and unsafe. ___, the council closed it.” We work out how the two sentences connect, sort transitions by their job, and choose the one that fits.',
  intro: [
    'In this video, we solve an exam-style question about transitions. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 writing test.',
  ],
  question: {
    prompt: 'Which transition best fills the gap?<br>*The bridge was old and unsafe. ___, the council closed it.*',
    text: 'Which transition best fills the gap? The bridge was old and unsafe. Blank, the council closed it.',
    choices: ['However', 'For example', 'As a result', 'In contrast'],
    answer: 2,
    working: 'Unsafe → closed: a **cause** and its **effect** → **As a result**.',
    say: [
      'Which transition best fills the gap? The bridge was old and unsafe. Blank, the council closed it.',
      'A: However. B: For example. C: As a result. D: In contrast.',
    ],
  },
  ask: [
    ['A **transition** shows how ideas connect', 'A transition shows how two ideas connect.'],
    ['How do **these** two connect?', 'We need to work out how these two sentences connect.'],
  ],
  know: {
    title: 'Transitions and revision',
    md: 'Transitions by job. **Cause and effect**: *as a result*, *therefore*, *consequently*. **Contrast**: *however*, *in contrast*, *on the other hand*. **Example**: *for example*, *for instance*. **Addition**: *also*, *in addition*. **Time**: *then*, *afterwards*. When revising, also **cut wordiness**, and keep every sentence on the paragraph’s **topic sentence**.',
    say: [
      'Here is the idea we need. Transitions have different jobs. As a result, therefore and consequently show cause and effect. However, in contrast and on the other hand show contrast. For example and for instance give an example. Also and in addition add a point. Then and afterwards show time.',
      'When revising, also cut wordiness, and keep every sentence on the paragraph’s topic sentence.',
    ],
  },
  plan: [
    ['Find the **link** between the sentences', 'Here is the plan. First, find the link between the two sentences.'],
    ['Match a **transition** to that link', 'Second, match a transition to that link.'],
  ],
  steps: [
    scene('Step 1: The link', [quote('p', ['The bridge was [[theta:old and unsafe]]. ___, the council [[good:closed it]].']), text('n', 'Why was it closed? **Because** it was unsafe: **cause → effect**')], [
      { say: 'Step one. Why did the council close the bridge? Because it was old and unsafe. The first sentence is the cause, and the second is the effect.', show: ['p', 'n'] },
    ]),
    scene('Step 2: Match a transition', [table('t', ['Transition', 'Job', 'Fits?'], [['However', 'contrast', '[[bad:✗]]'], ['For example', 'example', '[[bad:✗]]'], ['As a result', 'cause → effect', '[[good:✓]]'], ['In contrast', 'contrast', '[[bad:✗]]']]), text('a', '*…unsafe. **As a result**, the council closed it.* → **C**', 'lg')], [
      { say: 'Step two. However and in contrast show a contrast, but closing an unsafe bridge is not surprising. For example would need an example.', show: ['t.0', 't.1', 't.3'] },
      { say: 'As a result shows cause and effect. The bridge was old and unsafe. As a result, the council closed it. The answer is C.', show: ['t.2', 'a'], focus: 't.2' },
    ]),
  ],
  check: [
    ['Try *However*: it suggests a **surprise**', 'Let us check. Try however: it suggests the closing was surprising, which makes no sense.'],
    ['Only *As a result* reads **logically**', 'Only as a result reads logically. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**However** is common, but signals **contrast**', 'Choice A is the trap. However is a very common transition, but it signals contrast.'],
      ['B', 'Not an **example** of anything', 'Choice B: the second sentence is not an example.'],
      ['D', 'Nothing is being **contrasted**', 'Choice D: nothing is being contrasted.'],
    ],
  },
  yourTurn: {
    prompt: 'A paragraph’s topic sentence is *“Exercise improves mood.”* Which sentence does **not** belong?',
    choices: [
      'My favourite colour is blue.',
      'Running releases chemicals that lift our spirits.',
      'Even a short walk can ease stress.',
      'People who exercise often report feeling calmer.',
    ],
    answer: 0,
    working: 'It is **off topic**: nothing to do with exercise or mood.',
    ask: 'A paragraph’s topic sentence is: Exercise improves mood. Which sentence does not belong? A: My favourite colour is blue. B: Running releases chemicals that lift our spirits. C: Even a short walk can ease stress. D: People who exercise often report feeling calmer.',
    reveal: 'The answer is A. It has nothing to do with exercise or mood, so it breaks the paragraph’s focus.',
  },
  sum: [
    ['Find **how** the ideas connect', 'Here is what to remember. First find how the ideas connect.'],
    ['Cause → effect: *as a result*, *therefore*', 'For cause and effect, use as a result or therefore.'],
    ['Contrast: *however*, *in contrast*', 'And for contrast, use however or in contrast. For more on revising and editing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
