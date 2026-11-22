import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 3.2 (power, freedom and forgiveness). An exam-style question we wrote, in
// the style of a Grade 9 reading test, on William Shakespeare's The Tempest (about 1611), which is in
// the public domain. The answer is C: Prospero chooses forgiveness over revenge, though he has every
// power to punish.

const LINES = ['**Prospero:** Though with their high wrongs I am struck to th’ quick,<br>Yet with my nobler reason ’gainst my fury<br>Do I take part: the rarer action is<br>In virtue than in vengeance.'];

export default englishExam({
  lesson: 'e9-3-2',
  ...ours('a Grade 9 reading test', 'the play is William Shakespeare’s The Tempest (about 1611), in the public domain'),
  title: 'What Does “The Rarer Action Is in Virtue Than in Vengeance” Reveal?',
  thumbnailTitle: 'Forgiveness in The Tempest',
  subtitle: 'Key lines and themes, step by step',
  summary:
    'An exam-style question on The Tempest, solved one small step at a time: in Act 5, with all his enemies in his power, Prospero makes a choice. We decode his lines word by word, see the conflict between fury and reason, and link his decision to the play’s theme of forgiveness.',
  intro: [
    'In this video, we solve an exam-style question about a key moment in The Tempest. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, The Tempest, Act 5, Scene 1',
    say: ['First, read Prospero’s lines from Act Five. His enemies are now completely in his power. Though with their high wrongs I am struck to the quick, yet with my nobler reason against my fury do I take part: the rarer action is in virtue than in vengeance.'],
  },
  question: {
    prompt: 'What do these lines **reveal** about Prospero’s decision?',
    text: 'Read Prospero’s lines from The Tempest, Act 5. What do these lines reveal about Prospero’s decision?',
    choices: [
      'He has forgotten what his enemies did.',
      'He will take terrible revenge.',
      'Though still hurt and angry, he chooses forgiveness over revenge.',
      'He has lost his magic and cannot punish them.',
    ],
    answer: 2,
    working: '*struck to th’ quick* = deeply **hurt**; *nobler reason ’gainst my fury* = reason **beats** anger; *rarer… in virtue than in vengeance* = **forgiveness** is finer.',
    say: [
      'What do these lines reveal about Prospero’s decision?',
      'A: He has forgotten what his enemies did. B: He will take terrible revenge. C: Though still hurt and angry, he chooses forgiveness over revenge. D: He has lost his magic and cannot punish them.',
    ],
  },
  ask: [
    ['Prospero has his enemies in his **power**', 'Prospero has his enemies in his power.'],
    ['What does he **decide**?', 'We need what he decides, and how he feels about it.'],
  ],
  know: {
    title: 'Themes: power, freedom, forgiveness',
    md: 'The Tempest explores **power** (Prospero’s magic, and who rules the island), **freedom** (Ariel and Caliban long to be free), and **forgiveness** (whether Prospero will punish those who wronged him). Key words: *quick* = the tender, living part (*struck to the quick* = deeply hurt); *rarer* = finer, more precious.',
    say: [
      'Here is the idea we need. The Tempest explores power, through Prospero’s magic and who rules the island; freedom, since Ariel and Caliban both long to be free; and forgiveness, whether Prospero will punish those who wronged him.',
      'Two key words: struck to the quick means deeply hurt, and rarer means finer or more precious.',
    ],
  },
  plan: [
    ['Decode each **phrase**', 'Here is the plan. First, decode each phrase.'],
    ['Find the **conflict** in him', 'Second, find the conflict inside him.'],
    ['Name his **choice**', 'Third, name his choice.'],
  ],
  steps: [
    scene('Step 1: Decode', [table('t', ['Shakespeare', 'Meaning'], [['with their high wrongs I am **struck to th’ quick**', 'their great wrongs **hurt me deeply**'], ['with my **nobler reason** ’gainst my **fury** do I take part', 'I side with my **reason** against my **anger**'], ['the **rarer** action is in **virtue** than in **vengeance**', 'it is **finer** to be good than to take **revenge**']])], [
      { say: 'Step one. Struck to the quick: their wrongs have hurt him deeply. He has not forgotten.', show: 't.0' },
      { say: 'With my nobler reason against my fury do I take part: he sides with his reason, against his anger.', show: 't.1' },
      { say: 'The rarer action is in virtue than in vengeance: it is finer to be good than to take revenge.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: His choice', [quote('p', ['…the [[good:rarer action]] is', 'In [[good:virtue]] than in [[bad:vengeance]].']), text('a', 'Hurt, but **chooses forgiveness** → **C**', 'lg')], [
      { say: 'Step two. He is still hurt and angry, but he chooses forgiveness over revenge. The answer is C.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['He **still has** his magic at this point', 'Let us check. He still has his magic at this point. He could punish them.'],
    ['so forgiveness is a **choice**, not weakness', 'So forgiveness is a choice, not weakness. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '*struck to th’ quick*: he **remembers**, and still **hurts**', 'Choice A is the trap. Forgiveness might look like forgetting, but struck to the quick shows he still feels the hurt.'],
      ['B', 'He rejects **vengeance**', 'Choice B: he rejects vengeance.'],
      ['D', 'He gives up magic **later**, by choice', 'Choice D: he gives up his magic later, by choice.'],
    ],
  },
  yourTurn: {
    prompt: 'Throughout the play, Ariel asks Prospero for his **liberty**. Which theme does this most connect to?',
    choices: ['revenge', 'freedom', 'disguise', 'jealousy'],
    answer: 1,
    working: 'Liberty means **freedom**.',
    ask: 'Throughout the play, Ariel asks Prospero for his liberty. Which theme does this most connect to? A: revenge. B: freedom. C: disguise. D: jealousy.',
    reveal: 'The answer is B, freedom. Liberty means freedom, and Ariel longs to be released from serving Prospero.',
  },
  sum: [
    ['Themes: **power**, **freedom**, **forgiveness**', 'Here is what to remember. The Tempest’s themes include power, freedom and forgiveness.'],
    ['Prospero chooses **virtue** over **vengeance**', 'Prospero chooses virtue over vengeance.'],
    ['Decode key lines **phrase by phrase**', 'And decode key lines phrase by phrase. For more on power, freedom and forgiveness, watch this lesson’s explainer video on Gradileo.'],
  ],
});
