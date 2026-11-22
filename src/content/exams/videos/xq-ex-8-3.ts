import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 8.3 (Power and Conflict: the modern poems). An exam-style question we wrote,
// in the style of a GCSE English Literature exam. The modern poems are still in copyright, so they are
// described in our own words and not quoted. The answer is B: Remains, by Simon Armitage.

export default englishExam({
  lesson: 'ex-8-3',
  ...ours('a GCSE English Literature exam', 'the poems named are still in copyright, so they are described in our own words and not quoted'),
  title: 'Which Modern Poem Is About a Soldier Haunted by a Memory?',
  thumbnailTitle: 'Power and Conflict: Modern',
  subtitle: 'Knowing the modern poems, step by step',
  summary:
    'An exam-style question on the modern Power and Conflict poems, solved one small step at a time. We match a description of a soldier haunted after coming home to the right poem, by sorting the poems by what each is about.',
  intro: [
    'In this video, we solve an exam-style question about the modern Power and Conflict poems. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam. The poems are still in copyright, so we describe them in our own words.',
  ],
  question: {
    prompt: 'In which poem does a soldier describe being **haunted**, long after returning home, by the memory of **shooting a looter**?',
    text: 'In which poem does a soldier describe being haunted, long after returning home, by the memory of shooting a looter?',
    choices: ['Bayonet Charge', 'Remains', 'Poppies', 'Kamikaze'],
    answer: 1,
    working: 'A soldier, **home** but **haunted** by one killing: **Remains** (Simon Armitage).',
    say: [
      'In which poem does a soldier describe being haunted, long after returning home, by the memory of shooting a looter?',
      'A: Bayonet Charge. B: Remains. C: Poppies. D: Kamikaze.',
    ],
  },
  ask: [
    ['A soldier, **home**, but **haunted**', 'We are looking for a soldier who is home, but haunted.'],
    ['Which **poem**?', 'We need to name the poem.'],
  ],
  know: {
    title: 'The modern Power and Conflict poems',
    md: '**Remains** (Simon Armitage): a soldier cannot forget a looter he shot. **Bayonet Charge** (Ted Hughes): a soldier’s terror in the middle of an attack. **Poppies** (Jane Weir): a mother’s grief as her son leaves for war. **Kamikaze** (Beatrice Garland): a pilot turns back from a suicide mission and is shunned. **War Photographer** (Carol Ann Duffy): a photographer develops pictures of suffering that readers soon forget.',
    say: [
      'Here is the idea we need. In Remains, by Simon Armitage, a soldier cannot forget a looter he shot. In Bayonet Charge, by Ted Hughes, a soldier feels terror in the middle of an attack. In Poppies, by Jane Weir, a mother grieves as her son leaves for war.',
      'In Kamikaze, by Beatrice Garland, a pilot turns back from a suicide mission and is shunned by his family. And in War Photographer, by Carol Ann Duffy, a photographer develops pictures of suffering that readers soon forget.',
    ],
  },
  plan: [
    ['Who **speaks** in each poem?', 'Here is the plan. First, who speaks in each poem?'],
    ['**When** is it set?', 'Second, when is each set: during the fighting, or after?'],
    ['Match the **description**', 'Third, match the description.'],
  ],
  steps: [
    scene('Step 1: Sort the poems', [table('t', ['Poem', 'Who and when'], [['Bayonet Charge', 'a soldier **during** an attack'], ['Poppies', 'a **mother**, as her son leaves'], ['Kamikaze', 'a **pilot** who turned back'], ['Remains', 'a soldier **home**, haunted by a **killing**']])], [
      { say: 'Step one. Bayonet Charge shows a soldier during an attack, not after.', show: 't.0' },
      { say: 'Poppies is spoken by a mother. Kamikaze is about a pilot who turned back from his mission.', show: ['t.1', 't.2'] },
      { say: 'Remains is spoken by a soldier who is home, but haunted by a killing.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The match', [text('m', 'Home + haunted + a **looter** he shot = **Remains**'), text('a', '**B**', 'lg')], [
      { say: 'Step two. A soldier home, haunted by the looter he shot. That is Remains, by Simon Armitage.', show: 'm' },
      { say: 'The title itself suggests what stays behind: the memory, and the guilt. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Remains is about **guilt** and **memory**', 'Let us check. Remains is about guilt and memory that will not go away.'],
    ['which fits *haunted… long after*', 'Which fits haunted, long after returning home. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A soldier, but **during** the attack, not after', 'Choice A is the trap. Bayonet Charge has a soldier too, but it is set during the attack, not after.'],
      ['C', 'A **mother’s** grief', 'Choice C is about a mother’s grief.'],
      ['D', 'A **pilot** who turned back', 'Choice D is about a pilot who turned back.'],
    ],
  },
  yourTurn: {
    prompt: 'Who wrote **War Photographer**?',
    choices: ['Ted Hughes', 'Seamus Heaney', 'Carol Ann Duffy', 'Jane Weir'],
    answer: 2,
    working: 'War Photographer: **Carol Ann Duffy**.',
    ask: 'Who wrote War Photographer? A: Ted Hughes. B: Seamus Heaney. C: Carol Ann Duffy. D: Jane Weir.',
    reveal: 'The answer is C, Carol Ann Duffy.',
  },
  sum: [
    ['Know **who speaks** and **when**', 'Here is what to remember. Know who speaks in each poem, and when it is set.'],
    ['Remains: a soldier haunted by **guilt**', 'Remains is about a soldier haunted by guilt.'],
    ['Match each poem to its **poet**', 'And match each poem to its poet. For more on the modern Power and Conflict poems, watch this lesson’s explainer video on Gradileo.'],
  ],
});
