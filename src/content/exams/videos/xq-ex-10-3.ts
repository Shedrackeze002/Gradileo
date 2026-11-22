import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 10.3 (Lord of the Flies). An exam-style question we wrote, in the style of a
// GCSE English Literature exam. William Golding's novel is still in copyright, so it is described in our own
// words and not quoted. The answer is D: the conch symbolises order, democracy and the right to speak.

export default englishExam({
  lesson: 'ex-10-3',
  ...ours('a GCSE English Literature exam', 'the novel is William Golding’s Lord of the Flies (1954), still in copyright, so it is described in our own words and not quoted'),
  title: 'What Does the Conch Symbolise in Lord of the Flies?',
  thumbnailTitle: 'Lord of the Flies',
  subtitle: 'The conch as a symbol, step by step',
  summary:
    'An exam-style question on Lord of the Flies, solved one small step at a time. Stranded schoolboys use a shell to call meetings. We look at how the conch is used, what happens to it, and what it stands for.',
  intro: [
    'In this video, we solve an exam-style question about Lord of the Flies. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam. The novel is still in copyright, so we describe it in our own words.',
  ],
  question: {
    prompt: 'On the island, the boys call meetings by blowing a conch shell, and only the boy holding it may speak. What does the conch mainly **symbolise**?',
    text: 'On the island, the boys call meetings by blowing a conch shell, and only the boy holding it may speak. What does the conch mainly symbolise?',
    choices: ['hunting and violence', 'the beauty of nature', 'rescue by the navy', 'order, democracy and the right to speak'],
    answer: 3,
    working: 'Calls **meetings**; holder may **speak** → **rules**, **fair turns**: **order** and **democracy**.',
    say: [
      'On the island, the boys call meetings by blowing a conch shell, and only the boy holding it may speak. What does the conch mainly symbolise?',
      'A: hunting and violence. B: the beauty of nature. C: rescue by the navy. D: order, democracy and the right to speak.',
    ],
  },
  ask: [
    ['The conch is **used** in a special way', 'The conch is used in a special way.'],
    ['What does it **stand for**?', 'We need to say what it symbolises.'],
  ],
  know: {
    title: 'Lord of the Flies',
    md: 'During a war, a plane crashes and a group of British schoolboys is stranded on an island. **Ralph** is elected leader, helped by the thoughtful **Piggy**; **Jack** leads the hunters. Fear of a **beast** grows, the group splits, and the boys turn savage: **Simon** and then **Piggy** are killed, and Ralph is hunted until a **naval officer** arrives. Symbols: the **conch** (order), Piggy’s **glasses** (reason, fire), the **Lord of the Flies** (evil within). Themes: **civilisation versus savagery**.',
    say: [
      'Here is the idea we need. During a war, a plane crashes and a group of British schoolboys is stranded on an island. Ralph is elected leader, helped by the thoughtful Piggy, while Jack leads the hunters. Fear of a beast grows, the group splits, and the boys turn savage: Simon and then Piggy are killed, and Ralph is hunted, until a naval officer arrives.',
      'The symbols include the conch, Piggy’s glasses, and the Lord of the Flies itself. The great theme is civilisation versus savagery.',
    ],
  },
  plan: [
    ['How is the conch **used**?', 'Here is the plan. First, how is the conch used?'],
    ['What **happens** to it?', 'Second, what happens to it?'],
    ['Name what it **symbolises**', 'Third, name what it symbolises.'],
  ],
  steps: [
    scene('Step 1: Its use', [table('t', ['Use', 'Suggests'], [['blown to call **meetings**', 'a **gathering** of all'], ['the **holder** may speak', '**fair** turns, **free** speech'], ['helps elect **Ralph**', '**voting**, **democracy**']])], [
      { say: 'Step one. The conch is blown to call meetings, gathering everyone together.', show: 't.0' },
      { say: 'Only the holder may speak, so everyone gets a fair turn. And it helps elect Ralph as leader. These are the rules of a democracy.', show: ['t.1', 't.2'], focus: 't.1' },
    ]),
    scene('Step 2: What it stands for', [text('m', 'As order **breaks down**, the conch **loses** power'), text('a', 'Order, democracy, the right to speak → **D**', 'lg')], [
      { say: 'Step two. As the boys turn savage, fewer listen to the conch. Its power fades as order breaks down.', show: 'm' },
      { say: 'So the conch stands for order, democracy and the right to speak. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Jack **rejects** the conch when he splits away', 'Let us check. Jack rejects the conch when he forms his own tribe.'],
    ['rejecting **rules** and **fairness**', 'He is rejecting rules and fairness. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Hunting is **Jack’s** symbol, the opposite', 'Choice A is the trap. Hunting is important in the novel, but it belongs to Jack, and stands for the opposite of the conch.'],
      ['B', 'The shell is beautiful, but its **use** matters', 'Choice B: the shell is beautiful, but its use is what matters.'],
      ['C', 'The **fire** is linked to rescue', 'Choice C: it is the signal fire that is linked to rescue.'],
    ],
  },
  yourTurn: {
    prompt: 'What happens to the conch near the end of the novel?',
    choices: ['Jack keeps it as a trophy.', 'Ralph buries it on the beach.', 'It is smashed when Piggy is killed.', 'It is thrown out to sea for rescue.'],
    answer: 2,
    working: 'The conch **shatters** with Piggy’s death: order is **destroyed**.',
    ask: 'What happens to the conch near the end of the novel? A: Jack keeps it as a trophy. B: Ralph buries it on the beach. C: It is smashed when Piggy is killed. D: It is thrown out to sea for rescue.',
    reveal: 'The answer is C. The conch is smashed in the same moment Piggy is killed, showing that order and reason are destroyed together.',
  },
  sum: [
    ['The conch: **order** and **democracy**', 'Here is what to remember. The conch symbolises order and democracy.'],
    ['Its power fades as **savagery** grows', 'Its power fades as savagery grows.'],
    ['Theme: **civilisation versus savagery**', 'And the novel’s great theme is civilisation versus savagery. For more on Lord of the Flies, watch this lesson’s explainer video on Gradileo.'],
  ],
});
