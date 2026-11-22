import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 5.1 (media industries and audiences). An exam-style media question we wrote,
// in the style of a Grade 12 media test. The answer is C: an app paid per click has a reason to write
// headlines that grab clicks, so its funding shapes its content.

export default englishExam({
  lesson: 'e12-5-1',
  ...ours('a Grade 12 media literacy test'),
  title: 'How Does Funding Shape a Free News App?',
  thumbnailTitle: 'Who Pays for the News?',
  subtitle: 'Media industries and audiences, step by step',
  summary:
    'An exam-style media question, solved one small step at a time. A free news app earns all its money from advertisers, who pay it each time a reader clicks. We follow the money, ask what the app is rewarded for, and predict how that shapes what it publishes.',
  intro: [
    'In this video, we solve an exam-style question about media industries. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 media literacy test.',
  ],
  question: {
    prompt: 'A free news app earns **all** its money from advertisers, who pay it each time a reader **clicks** on a story. Which effect on its content is **most likely**?',
    text: 'A free news app earns all its money from advertisers, who pay it each time a reader clicks on a story. Which effect on its content is most likely?',
    choices: [
      'It will publish only long, detailed reports.',
      'It will refuse to show any advertising.',
      'It will favour dramatic headlines designed to attract clicks.',
      'It will charge readers a high subscription fee.',
    ],
    answer: 2,
    working: 'Money comes **per click** → the app is **rewarded** for clicks → **dramatic, clickable** headlines.',
    say: [
      'A free news app earns all its money from advertisers, who pay it each time a reader clicks on a story. Which effect on its content is most likely?',
      'A: It will publish only long, detailed reports. B: It will refuse to show any advertising. C: It will favour dramatic headlines designed to attract clicks. D: It will charge readers a high subscription fee.',
    ],
  },
  ask: [
    ['We know how the app makes **money**', 'We know how the app makes its money.'],
    ['How will that shape its **content**?', 'We need to predict how that shapes its content.'],
  ],
  know: {
    title: 'Media industries',
    md: 'Media content is shaped by **ownership** (who owns the company), **funding** (advertising, subscriptions, public money, sponsors), **audience** (who it must attract) and **platform** (a feed, a channel, a paper). Ask the key question: **who pays, and what are they paying for?** A product that is free to you is usually paid for by **advertisers**, and your **attention** is what is sold.',
    say: [
      'Here is the idea we need. Media content is shaped by ownership, who owns the company; funding, whether from advertising, subscriptions, public money or sponsors; audience, who it must attract; and platform, whether a feed, a channel or a paper.',
      'So ask the key question: who pays, and what are they paying for? A product that is free to you is usually paid for by advertisers, and your attention is what is being sold.',
    ],
  },
  plan: [
    ['**Who** pays?', 'Here is the plan. First, who pays?'],
    ['For **what**?', 'Second, what are they paying for?'],
    ['What does that **reward**?', 'Third, what does that reward in the content?'],
  ],
  steps: [
    scene('Step 1: Follow the money', [table('t', ['Question', 'Answer'], [['who pays?', '**advertisers**, not readers'], ['for what?', 'each **click**'], ['so the app earns more when…', 'more people **click**']])], [
      { say: 'Step one. Who pays? Advertisers, not readers. The app is free.', show: 't.0' },
      { say: 'And they pay for each click. So the app earns more whenever more people click on a story.', show: ['t.1', 't.2'], focus: 't.2' },
    ]),
    scene('Step 2: The effect', [text('e', 'Rewarded for **clicks** → headlines built to be **clicked**'), text('a', 'Dramatic, attention-grabbing headlines → **C**', 'lg')], [
      { say: 'Step two. If the app is rewarded for clicks, it has every reason to write headlines that make people click: dramatic, surprising, emotional.', show: 'e' },
      { say: 'So its funding shapes its content. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['C follows **directly** from per-click funding', 'Let us check. C follows directly from being paid per click.'],
    ['The others **ignore** or **contradict** the model', 'The others ignore or contradict how the app is funded. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Good journalism, but **not** what clicks reward', 'Choice A is the trap. Long, detailed reports sound like good journalism, but per-click funding does not reward them.'],
      ['B', 'Ads are its **only** income', 'Choice B: advertising is its only income.'],
      ['D', 'The app is **free** to readers', 'Choice D: the app is free to readers.'],
    ],
  },
  yourTurn: {
    prompt: 'A documentary praising a soft drink was paid for by the company that makes it. What should a viewer **most** ask?',
    choices: ['whether the funding shapes what the film shows and leaves out', 'how long the documentary is', 'what colour the cans are', 'whether the film has subtitles'],
    answer: 0,
    working: 'Funded by the **maker** → ask about **bias** in what is shown.',
    ask: 'A documentary praising a soft drink was paid for by the company that makes it. What should a viewer most ask? A: whether the funding shapes what the film shows and leaves out. B: how long the documentary is. C: what colour the cans are. D: whether the film has subtitles.',
    reveal: 'The answer is A. When the maker pays for the film, a viewer should ask whether that shapes what is shown, and what is left out.',
  },
  sum: [
    ['Ask: **who pays**, and for **what**?', 'Here is what to remember. Ask who pays, and what they are paying for.'],
    ['**Funding** shapes **content**', 'Funding shapes content.'],
    ['If it is free, your **attention** is sold', 'And if it is free, your attention is what is being sold. For more on media industries and audiences, watch this lesson’s explainer video on Gradileo.'],
  ],
});
