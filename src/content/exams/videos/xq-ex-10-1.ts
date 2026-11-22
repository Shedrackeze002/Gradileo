import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 10.1 (An Inspector Calls). An exam-style question we wrote, in the style of a
// GCSE English Literature exam. J. B. Priestley's play (1945) is still in copyright, so it is described in
// our own words and not quoted. The answer is B: the Inspector's final message is that we are all
// responsible for each other.

export default englishExam({
  lesson: 'ex-10-1',
  ...ours('a GCSE English Literature exam', 'the play is J. B. Priestley’s An Inspector Calls (1945), still in copyright, so it is described in our own words and not quoted'),
  title: 'What Is the Inspector’s Final Message?',
  thumbnailTitle: 'An Inspector Calls',
  subtitle: 'The Inspector’s message, step by step',
  summary:
    'An exam-style question on An Inspector Calls, solved one small step at a time. Before he leaves, Inspector Goole gives the Birling family a final warning. We trace what each family member did to Eva Smith, and name the message the Inspector draws from it.',
  intro: [
    'In this video, we solve an exam-style question about An Inspector Calls. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam. The play is still in copyright, so we describe it in our own words.',
  ],
  question: {
    prompt: 'Before leaving, the Inspector tells the Birlings that there are millions of people like Eva Smith, and warns of what will happen if people do not learn his lesson. What is his **main message**?',
    text: 'Before leaving, the Inspector tells the Birlings that there are millions of people like Eva Smith, and warns of what will happen if people do not learn his lesson. What is his main message?',
    choices: [
      'Factory owners should pay their workers less.',
      'We are all responsible for each other, and must care for those with less.',
      'Eva Smith was entirely to blame for her own fate.',
      'The police should solve crimes more quickly.',
    ],
    answer: 1,
    working: '**Each** Birling harmed Eva; *millions* like her → **social responsibility**: we are all **responsible** for each other.',
    say: [
      'Before leaving, the Inspector tells the Birlings that there are millions of people like Eva Smith, and warns of what will happen if people do not learn his lesson. What is his main message?',
      'A: Factory owners should pay their workers less. B: We are all responsible for each other, and must care for those with less. C: Eva Smith was entirely to blame for her own fate. D: The police should solve crimes more quickly.',
    ],
  },
  ask: [
    ['The Inspector’s **last** words to the family', 'We are looking at the Inspector’s last words to the family.'],
    ['What is his **message**?', 'We need to name his main message.'],
  ],
  know: {
    title: 'An Inspector Calls',
    md: 'In **1912**, the wealthy **Birling** family celebrate an engagement, when **Inspector Goole** arrives to ask about the death of a young woman, **Eva Smith**. One by one, he shows that each of them helped to ruin her life: **Mr Birling** sacked her, **Sheila** had her dismissed from a shop, **Gerald** and **Eric** used her, and **Mrs Birling** refused her charity. Priestley wrote it in **1945** to argue for **social responsibility** over selfish **capitalism**.',
    say: [
      'Here is the idea we need. In nineteen twelve, the wealthy Birling family are celebrating an engagement when Inspector Goole arrives, asking about the death of a young woman, Eva Smith. One by one, he shows that each of them helped to ruin her life.',
      'Mr Birling sacked her, Sheila had her dismissed from a shop, Gerald and Eric used her, and Mrs Birling refused her charity. Priestley wrote the play in nineteen forty-five, to argue for social responsibility over selfish capitalism.',
    ],
  },
  plan: [
    ['What did **each** Birling do?', 'Here is the plan. First, what did each Birling do?'],
    ['Why mention **millions**?', 'Second, why does the Inspector mention millions?'],
    ['Name the **message**', 'Third, name the message.'],
  ],
  steps: [
    scene('Step 1: A chain of harm', [table('t', ['Character', 'What they did to Eva'], [['Mr Birling', 'sacked her for asking for **higher wages**'], ['Sheila', 'had her **dismissed** from a shop'], ['Gerald and Eric', 'used her, then **left** her'], ['Mrs Birling', 'refused her **charity**']])], [
      { say: 'Step one. Mr Birling sacked her for asking for higher wages. Sheila had her dismissed from a shop out of jealousy.', show: ['t.0', 't.1'] },
      { say: 'Gerald and Eric used her and left her. And Mrs Birling refused her help when she needed it most.', show: ['t.2', 't.3'] },
    ]),
    scene('Step 2: The message', [text('m', 'Each act was small, but **together** they destroyed her'), text('w', '*Millions* like Eva: the lesson is for **everyone**'), text('a', 'We are all **responsible** for each other → **B**', 'lg')], [
      { say: 'Step two. Each act seemed small, but together they destroyed her.', show: 'm' },
      { say: 'And there are millions like Eva, so the lesson is for everyone, including the audience. We are all responsible for each other. The answer is B.', show: ['w', 'a'] },
    ]),
  ],
  check: [
    ['Mr Birling said each man should look after **himself**', 'Let us check. Earlier, Mr Birling said every man should look after himself.'],
    ['the Inspector **answers** that view', 'The Inspector’s message answers that view directly. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'That is the **Birlings’** excuse, not his message', 'Choice C is the trap. Blaming Eva is what some Birlings want to believe, but the Inspector shows they share the blame.'],
      ['A', 'He **criticises** low pay', 'Choice A: he criticises low pay.'],
      ['D', 'Not about **police** work', 'Choice D: his message is not about police work.'],
    ],
  },
  yourTurn: {
    prompt: 'Which character is sacked from Mr Birling’s factory after asking for higher wages?',
    choices: ['Eva Smith', 'Sheila Birling', 'Edna', 'Gerald Croft'],
    answer: 0,
    working: 'Mr Birling sacks **Eva Smith**.',
    ask: 'Which character is sacked from Mr Birling’s factory after asking for higher wages? A: Eva Smith. B: Sheila Birling. C: Edna. D: Gerald Croft.',
    reveal: 'The answer is A, Eva Smith. It is the first step in the chain that ruins her life.',
  },
  sum: [
    ['Each Birling **harmed** Eva', 'Here is what to remember. Each Birling harmed Eva Smith.'],
    ['Message: we are all **responsible** for each other', 'The Inspector’s message is that we are all responsible for each other.'],
    ['Theme: **social responsibility** over **selfishness**', 'And the play sets social responsibility against selfishness. For more on An Inspector Calls, watch this lesson’s explainer video on Gradileo.'],
  ],
});
