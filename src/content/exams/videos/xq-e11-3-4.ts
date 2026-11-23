import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 3.4 (tragedy and theme). An exam-style question we wrote, in the style of a
// Grade 11 reading test, on William Shakespeare's Macbeth (about 1606), which is in the public domain. The
// answer is B: Macbeth himself names "vaulting ambition" as his only motive, his tragic flaw.

const LINES = ['**Macbeth:** I have no spur<br>To prick the sides of my intent, but only<br>Vaulting ambition, which o’erleaps itself<br>And falls on th’ other.'];

export default englishExam({
  lesson: 'e11-3-4',
  ...ours('a Grade 11 reading test', 'the play is William Shakespeare’s Macbeth (about 1606), in the public domain'),
  title: 'What Is Macbeth’s Tragic Flaw?',
  thumbnailTitle: 'The Tragic Hero',
  subtitle: 'Tragedy and theme in Macbeth, step by step',
  summary:
    'An exam-style question on Macbeth, solved one small step at a time: alone, before the murder, Macbeth admits what is driving him. We decode his image of a horse and rider, name his tragic flaw, and see how the play’s ending proves it.',
  intro: [
    'In this video, we solve an exam-style question about tragedy in Macbeth. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Macbeth, Act 1, Scene 7',
    say: ['First, read Macbeth’s lines. Alone, he weighs up whether to murder King Duncan, who is a guest in his castle and has done him no wrong. I have no spur to prick the sides of my intent, but only vaulting ambition, which o’erleaps itself and falls on the other.'],
  },
  question: {
    prompt: 'According to these lines, what is Macbeth’s **tragic flaw**?',
    text: 'Read Macbeth’s lines from Act 1. According to these lines, what is Macbeth’s tragic flaw?',
    choices: ['jealousy', 'vaulting ambition', 'laziness', 'cowardice'],
    answer: 1,
    working: 'His **only** spur is *Vaulting ambition, which o’erleaps itself / And falls*: ambition that leaps too high and **falls**.',
    say: ['According to these lines, what is Macbeth’s tragic flaw? A: jealousy. B: vaulting ambition. C: laziness. D: cowardice.'],
  },
  ask: [
    ['A tragic hero has a **flaw**', 'A tragic hero has a flaw that leads to their downfall.'],
    ['What is **Macbeth’s**?', 'We need Macbeth’s flaw.'],
  ],
  know: {
    title: 'Tragedy',
    md: 'A **tragic hero** is a person of **high** status and real **qualities** whose **tragic flaw** (in Greek, *hamartia*) leads to their **downfall**. They often realise their error too late. The audience feels **pity** and **fear**, and at the end a release of those feelings: **catharsis**. Themes in Macbeth: **ambition**, **guilt**, **appearance and reality**, and the **supernatural**.',
    say: [
      'Here is the idea we need. A tragic hero is a person of high status and real qualities, whose tragic flaw, called hamartia in Greek, leads to their downfall. They often realise their error too late.',
      'The audience feels pity and fear, and at the end a release of those feelings, called catharsis. The themes of Macbeth include ambition, guilt, appearance and reality, and the supernatural.',
    ],
  },
  plan: [
    ['Decode the **horse-riding** image', 'Here is the plan. First, decode the horse-riding image.'],
    ['Name the **flaw**', 'Second, name the flaw.'],
  ],
  steps: [
    scene('Step 1: The image', [table('t', ['Shakespeare', 'Meaning'], [['*spur / To prick the sides of my intent*', 'a **spur** drives a horse on; nothing drives my **plan** on'], ['*but only / Vaulting ambition*', '**except** ambition that leaps **too high**'], ['*which o’erleaps itself / And falls on th’ other*', 'like a rider who **jumps** too hard and **falls** on the other side']])], [
      { say: 'Step one. A spur is a spike on a rider’s boot that drives a horse forward. Macbeth says nothing drives his plan on, no good reason at all.', show: 't.0' },
      { say: 'Nothing, except vaulting ambition: ambition that leaps too high.', show: 't.1' },
      { say: 'Like a rider who jumps into the saddle so hard that he falls off the other side.', show: 't.2' },
    ]),
    scene('Step 2: The flaw', [quote('p', ['…but only', '[[bad:Vaulting ambition]], which [[bad:o’erleaps itself]]', 'And [[bad:falls]] on th’ other.']), text('a', 'His flaw is **vaulting ambition**, and it will make him **fall** → **B**', 'lg')], [
      { say: 'Step two. Macbeth names his own flaw: vaulting ambition. And he even predicts where it leads: to a fall. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['The image **foreshadows** his downfall', 'Let us check. The image of falling foreshadows his downfall: he becomes king, then loses everything.'],
    ['Ambition drives the whole **tragedy**', 'Ambition drives the whole tragedy. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'He **hesitates**, but he is a brave **soldier**', 'Choice D is the trap. Macbeth hesitates here, but he is a famously brave soldier, and his flaw is ambition.'],
      ['A', 'He names **ambition**, not jealousy', 'Choice A: he names ambition, not jealousy.'],
      ['C', 'Nothing suggests **laziness**', 'Choice C: nothing here suggests laziness.'],
    ],
  },
  yourTurn: {
    prompt: 'What is **catharsis**?',
    choices: ['a tragic hero’s flaw', 'a sudden change of fortune', 'a prophecy that comes true', 'the release of pity and fear that the audience feels at a tragedy’s end'],
    answer: 3,
    working: 'The audience’s **emotional release**.',
    ask: 'What is catharsis? A: a tragic hero’s flaw. B: a sudden change of fortune. C: a prophecy that comes true. D: the release of pity and fear that the audience feels at a tragedy’s end.',
    reveal: 'The answer is D. Catharsis is the release of the pity and fear the audience has built up during the tragedy.',
  },
  sum: [
    ['A **tragic hero** falls through a **flaw**', 'Here is what to remember. A tragic hero falls through a flaw.'],
    ['Macbeth’s flaw: **vaulting ambition**', 'Macbeth’s flaw is vaulting ambition.'],
    ['**Catharsis**: the audience’s release', 'And catharsis is the audience’s release of pity and fear. For more on tragedy and theme, watch this lesson’s explainer video on Gradileo.'],
  ],
});
