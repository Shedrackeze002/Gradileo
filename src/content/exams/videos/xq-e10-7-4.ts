import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 7.4 (modifiers and parallel structure). An exam-style grammar question we
// wrote, in the style of a Grade 10 language test. The answer is C: "Walking to school" must describe the
// person walking, so "I" must come straight after the comma.

export default englishExam({
  lesson: 'e10-7-4',
  ...ours('a Grade 10 language test'),
  title: 'Which Sentence Fixes the Dangling Modifier?',
  thumbnailTitle: 'Dangling Modifiers',
  subtitle: 'Modifiers and parallel structure, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “Walking to school, the rain soaked my backpack.” We ask who is walking, see why the sentence goes wrong, and choose the version that fixes it.',
  intro: [
    'In this video, we solve an exam-style grammar question about dangling modifiers. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 language test.',
  ],
  question: {
    prompt: 'Which sentence is **correct**, with no dangling modifier?',
    text: 'Which sentence is correct, with no dangling modifier?',
    choices: [
      'Walking to school, the rain soaked my backpack.',
      'Walking to school, my backpack was soaked by the rain.',
      'Walking to school, I got my backpack soaked by the rain.',
      'Walking to school, rain soaked the backpack.',
    ],
    answer: 2,
    working: '*Walking to school* must describe **who** walks; only C puts **I** right after it.',
    say: [
      'Which sentence is correct, with no dangling modifier?',
      'A: Walking to school, the rain soaked my backpack. B: Walking to school, my backpack was soaked by the rain. C: Walking to school, I got my backpack soaked by the rain. D: Walking to school, rain soaked the backpack.',
    ],
  },
  ask: [
    ['An opening phrase **describes** what comes next', 'An opening phrase describes whatever comes straight after it.'],
    ['Which sentence gets that **right**?', 'We need the sentence that gets that right.'],
  ],
  know: {
    title: 'Modifiers and parallel structure',
    md: 'A **modifier** describes something. An opening phrase like *Walking to school,* modifies the **noun right after the comma**. If that noun cannot do the action, the modifier **dangles** (*Walking to school, the rain…* : the rain was walking?). A **misplaced** modifier sits next to the wrong word. **Parallel structure**: items in a list or comparison take the **same form** (*hiking, swimming and biking*).',
    say: [
      'Here is the idea we need. A modifier describes something. An opening phrase like walking to school describes the noun that comes right after the comma.',
      'If that noun cannot do the action, the modifier dangles. Walking to school, the rain: was the rain walking? A misplaced modifier sits next to the wrong word. And parallel structure means items in a list or comparison take the same form: hiking, swimming and biking.',
    ],
  },
  plan: [
    ['Ask **who** is walking', 'Here is the plan. First, ask who is walking.'],
    ['Check the word **after the comma**', 'Second, check the word right after the comma in each sentence.'],
  ],
  steps: [
    scene('Step 1: Who is walking?', [quote('p', ['[[theta:Walking to school]], [[bad:the rain]] soaked my backpack.']), text('n', 'A person walks to school: **I**. Not the rain, not a backpack.')], [
      { say: 'Step one. Who is walking to school? A person: I. The rain cannot walk, and neither can a backpack.', show: ['p', 'n'] },
    ]),
    scene('Step 2: After the comma', [table('t', ['Choice', 'Right after the comma', 'Can it walk?'], [['A', '*the rain*', '[[bad:✗]]'], ['B', '*my backpack*', '[[bad:✗]]'], ['C', '*I*', '[[good:✓]]'], ['D', '*rain*', '[[bad:✗]]']]), text('a', '*Walking to school, **I** got my backpack soaked…* → **C**', 'lg')], [
      { say: 'Step two. In A and D, the word after the comma is rain. In B, it is my backpack. None of them can walk.', show: ['t.0', 't.1', 't.3'] },
      { say: 'In C, the word after the comma is I. I can walk to school. The answer is C.', show: ['t.2', 'a'], focus: 't.2' },
    ]),
  ],
  check: [
    ['Read C: *I was walking to school*', 'Let us check. C tells us I was walking to school, and my backpack got soaked.'],
    ['It makes **sense**', 'That makes sense. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Mentions **my**, but the backpack is **after** the comma', 'Choice B is the trap. It says my backpack, so a person is nearby, but the backpack itself comes after the comma.'],
      ['A', 'The **rain** is walking', 'Choice A says the rain was walking.'],
      ['D', 'The **rain** is walking again', 'Choice D says the rain was walking too.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses **parallel structure**?',
    choices: [
      'She likes hiking, to swim, and biking.',
      'She likes to hike, swimming, and bikes.',
      'She likes hiking, swimming, and to bike.',
      'She likes hiking, swimming, and biking.',
    ],
    answer: 3,
    working: 'All three items in the **same form**: *-ing*.',
    ask: 'Which sentence uses parallel structure? A: She likes hiking, to swim, and biking. B: She likes to hike, swimming, and bikes. C: She likes hiking, swimming, and to bike. D: She likes hiking, swimming, and biking.',
    reveal: 'The answer is D. Hiking, swimming and biking all take the same form.',
  },
  sum: [
    ['An opening phrase describes the word **after the comma**', 'Here is what to remember. An opening phrase describes the word after the comma.'],
    ['If that word cannot do the action, it **dangles**', 'If that word cannot do the action, the modifier dangles.'],
    ['Lists need **parallel** forms', 'And lists need parallel forms. For more on modifiers and parallel structure, watch this lesson’s explainer video on Gradileo.'],
  ],
});
