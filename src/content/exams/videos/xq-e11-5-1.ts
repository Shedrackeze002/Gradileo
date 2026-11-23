import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 5.1 (news and framing). An exam-style media question we wrote, in the style of
// a Grade 11 media test, on four headlines we invented for one event. The answer is C: "shuts" and
// "abandons readers" frame the decision as harmful, and the road repairs are left out.

const EVENT = ['*The event:* The town council voted 6 to 3 to **close two small libraries** and use the money saved to **repair dangerous roads**.'];

export default englishExam({
  lesson: 'e11-5-1',
  ...ours('a Grade 11 media test', 'the event and headlines are invented'),
  title: 'Which Headline Frames the Decision Most Negatively?',
  thumbnailTitle: 'Framing the News',
  subtitle: 'How headlines shape opinion, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: four headlines report the same council vote to close two libraries and fix roads. We compare what each one includes, leaves out and stresses, and find the most negative framing.',
  intro: [
    'In this video, we solve an exam-style question about news and framing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 media test, and the event and headlines are invented.',
  ],
  passage: {
    lines: EVENT,
    by: 'An invented news event',
    say: ['First, the event. The town council voted six to three to close two small libraries and use the money saved to repair dangerous roads.'],
  },
  question: {
    prompt: 'Which headline **frames** the council’s decision most **negatively**?',
    text: 'Read the description of the event. Which headline frames the council’s decision most negatively?',
    choices: [
      'Council votes on library and road budget',
      'Council fixes dangerous roads with library savings',
      'Council shuts libraries, abandons readers',
      'Roads to be repaired after council vote',
    ],
    answer: 2,
    working: '*shuts* and *abandons readers* stress **loss**; the **road repairs** are **left out**.',
    say: [
      'Which headline frames the council’s decision most negatively?',
      'A: Council votes on library and road budget. B: Council fixes dangerous roads with library savings. C: Council shuts libraries, abandons readers. D: Roads to be repaired after council vote.',
    ],
  },
  ask: [
    ['Four headlines, **one** event', 'Four headlines report the same event.'],
    ['Which is most **negative**?', 'We need the one that frames it most negatively.'],
  ],
  know: {
    title: 'Framing the news',
    md: '**Framing** shapes how readers see a story through **selection** (which facts are included), **omission** (which are left out), **emphasis** and **order** (what comes first, or in the headline), and **word choice** (*shuts* vs *closes*, *abandons* vs *moves*). Two accurate headlines can leave **opposite** impressions.',
    say: [
      'Here is the idea we need. Framing shapes how readers see a story through selection, which facts are included; omission, which are left out; emphasis and order, what comes first or goes in the headline; and word choice, such as shuts rather than closes.',
      'Two headlines can both be accurate, and still leave opposite impressions.',
    ],
  },
  plan: [
    ['What does each headline **include** and **omit**?', 'Here is the plan. First, see what each headline includes and leaves out.'],
    ['Check the **word choice**', 'Second, check the word choice.'],
  ],
  steps: [
    scene('Step 1: Include and omit', [table('t', ['Headline', 'Includes', 'Omits', 'Impression'], [['A *votes on… budget*', 'both, vaguely', 'details', 'neutral'], ['B *fixes dangerous roads…*', '**roads** first', 'the closures’ cost', '[[good:positive]]'], ['C *shuts libraries, abandons readers*', '**libraries** only', '[[bad:the road repairs]]', '[[bad:negative]]'], ['D *Roads to be repaired…*', '**roads** only', 'the libraries', '[[good:positive]]']])], [
      { say: 'Step one. A mentions both, but vaguely: neutral.', show: 't.0' },
      { say: 'B and D lead with the road repairs, and B calls the roads dangerous. Both leave a positive impression.', show: ['t.1', 't.3'] },
      { say: 'C mentions only the libraries, and leaves out the road repairs entirely.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Word choice', [text('n', '*shuts* (harsher than *closes*) · *abandons readers* (people **left behind**)'), text('a', 'Selection + omission + loaded words → **most negative** → **C**', 'lg')], [
      { say: 'Step two. Shuts sounds harsher than closes, and abandons readers suggests people left behind. Together with the missing road repairs, C frames the decision most negatively. The answer is C.', show: ['n', 'a'] },
    ]),
  ],
  check: [
    ['Is C **false**? No: libraries **did** close', 'Let us check. Is C false? No, the libraries did close.'],
    ['Framing works through **choices**, not lies', 'Framing works through choices, not lies. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Vague and **neutral**', 'Choice A is the trap for readers who expect vagueness to hide bad news. Here it is simply neutral.'],
      ['B', 'Frames it **positively**', 'Choice B frames the decision positively.'],
      ['D', 'Frames it **positively**', 'Choice D frames it positively too.'],
    ],
  },
  yourTurn: {
    prompt: 'A story about a new factory reports the **jobs** it creates but leaves out **pollution** concerns. This framing works mainly through…',
    choices: ['omission', 'balance', 'a pull quote', 'chronological order'],
    answer: 0,
    working: 'An important fact **left out**: **omission**.',
    ask: 'A story about a new factory reports the jobs it creates but leaves out pollution concerns. This framing works mainly through: A: omission. B: balance. C: a pull quote. D: chronological order.',
    reveal: 'The answer is A, omission. Leaving out the pollution concerns makes the factory look entirely good.',
  },
  sum: [
    ['Framing: **selection**, **omission**, **emphasis**, **words**', 'Here is what to remember. Framing works through selection, omission, emphasis and word choice.'],
    ['Ask what is **left out**', 'Always ask what is left out.'],
    ['Accurate is not the same as **balanced**', 'And remember that accurate is not the same as balanced. For more on news and framing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
