import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 1.2 (character and motive). An exam-style question we wrote, in the style
// of a Grade 6 reading test, on a passage we wrote. The answer is A: Ben skips the final so that his
// little brother, who has no one else to take him, is not left alone on his birthday.

const PASSAGE = [
  'Ben had trained all season for the football final. His boots were cleaned, his kit was packed, and the coach had told him he would start.',
  'Then Mum rang from the hospital: she had to work a double shift. Ben looked at his little brother, Sol, sitting at the kitchen table in his paper birthday crown, waiting for the trip to the zoo she had promised.',
  'Ben picked up the phone. “Coach? I’m sorry. I can’t play today.” Then he turned to Sol and smiled. “Get your coat. We’ve got some lions to see.”',
];

export default englishExam({
  lesson: 'e6-1-2',
  ...ours('a Grade 6 reading test', 'the passage is by Gradileo'),
  title: 'Why Does Ben Miss the Football Final?',
  thumbnailTitle: 'A Character’s Motive',
  subtitle: 'Why characters act, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: Ben has trained all season, but he phones his coach to say he cannot play. We look at what changes, what Ben gives up, and what he does next, to work out his motive.',
  intro: [
    'In this video, we solve an exam-style reading question about a character’s motive. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 6 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Ben had trained all season for the football final. His boots were cleaned, his kit was packed, and the coach had told him he would start.',
      'Then Mum rang from the hospital: she had to work a double shift. Ben looked at his little brother, Sol, sitting at the kitchen table in his paper birthday crown, waiting for the trip to the zoo she had promised.',
      'Ben picked up the phone. “Coach? I’m sorry. I can’t play today.” Then he turned to Sol and smiled. “Get your coat. We’ve got some lions to see.”',
    ],
  },
  question: {
    prompt: 'Why does Ben decide not to play in the final?',
    text: 'Read the passage about Ben. Why does Ben decide not to play in the final?',
    choices: ['He does not want Sol’s birthday to be spoiled.', 'He is worried that his team will lose.', 'He would rather go to the zoo than play football.', 'His coach has told him he will not start.'],
    answer: 0,
    working: 'Mum cannot take Sol to the zoo on his birthday, so Ben gives up the final to take him.',
    say: [
      'Why does Ben decide not to play in the final?',
      'A: He does not want Sol’s birthday to be spoiled. B: He is worried that his team will lose. C: He would rather go to the zoo than play football. D: His coach has told him he will not start.',
    ],
  },
  ask: [
    ['**Why** does Ben act?', 'This question asks why Ben does something.'],
    ['The reason is his **motive**', 'The reason behind a character’s action is called their motive, and the passage never states it outright.'],
  ],
  know: {
    title: 'Motive',
    md: 'A character’s **motive** is the **reason** they act: what they want, need or fear. Writers rarely state it; we **infer** it from **what changes**, what the character **does**, and what they **say**.',
    say: [
      'Here is the idea we need. A character’s motive is the reason behind what they do: what they want, need or fear.',
      'Writers rarely state it. We infer it from what changes in the story, what the character does, and what they say.',
    ],
  },
  plan: [
    ['What does Ben **want** at the start?', 'Here is the plan. First, what does Ben want at the start?'],
    ['What **changes**?', 'Second, what changes?'],
    ['What does he **do** and **say** next?', 'Third, what does he do and say next? That reveals the motive.'],
  ],
  steps: [
    scene('Step 1: What Ben wants, and what changes', [quote('p', PASSAGE.slice(0, 2)), table('t', ['Before', 'After the phone call'], [['Ben is ready to **start** in the final', 'Mum must work a **double shift**'], ['', 'Sol, in his **birthday crown**, waits for the **zoo trip** she **promised**']])], [
      { say: 'Step one. At the start, Ben badly wants to play. He has trained all season, packed his kit, and he will start.', show: 'p', focus: 'p.0' },
      { say: 'Then Mum rings. She has to work a double shift, so she cannot take Sol to the zoo she promised. And it is Sol’s birthday: he is wearing a paper birthday crown.', show: 't', focus: 'p.1' },
    ]),
    scene('Step 2: What Ben does and says', [quote('p', PASSAGE.slice(2)), text('n', 'He gives up the final **and** takes Sol to the zoo → he puts **Sol’s birthday** first.')], [
      { say: 'Step two. Ben phones the coach and says he cannot play. Then, straight away, he smiles at Sol and says, get your coat, we have got some lions to see.', show: 'p' },
      { say: 'He gives up the thing he wanted most, so that Sol still gets his birthday trip. His motive is that he does not want Sol’s birthday to be spoiled. The answer is A.', show: 'n' },
    ]),
  ],
  check: [
    ['The **timing**: he decides right after Mum’s call', 'Let us check. Ben decides straight after Mum’s call, so the call is what changes his mind.'],
    ['His **words** to Sol: *We’ve got some lions to see*', 'And his words to Sol show where his mind is: on his brother’s birthday. Both pieces of evidence point to A.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Sounds like the zoo is **more fun** to him', 'Choice C is tempting because Ben does go to the zoo. But he has trained all season for the final. He goes for Sol, not because he prefers lions.'],
      ['D', '**Opposite** of the passage', 'Choice D is the opposite of the passage: the coach told him he would start.'],
      ['B', '**No evidence** he fears losing', 'Choice B has no evidence. Nothing says Ben is worried about losing.'],
    ],
  },
  yourTurn: {
    prompt: '*Lily stayed late every evening to practise her lines. On the night of the play, she looked out at the front row, found her grandad’s face, and grinned. He had never seen her act before.* Why has Lily worked so hard?',
    choices: ['She was told to stay late.', 'She wants to make her grandad proud.', 'She does not like going home.', 'She wants to be paid for acting.'],
    answer: 1,
    working: 'She looks for her grandad, and he has never seen her act: she wants to impress him.',
    ask: 'Lily stayed late every evening to practise her lines. On the night of the play, she looked out at the front row, found her grandad’s face, and grinned. He had never seen her act before. Why has Lily worked so hard?',
    reveal: 'The answer is B. She looks for her grandad first, and he has never seen her act before. That points to her motive: making him proud.',
  },
  sum: [
    ['A **motive** is the **reason** a character acts', 'Here is what to remember. A motive is the reason a character acts.'],
    ['Look at **what changes**, then what the character **does** and **says**', 'To infer it, look at what changes, then what the character does and says next.'],
    ['Check the answer against **all** the evidence', 'And check your answer against all the evidence, not just one detail. For more on character and motive, watch this lesson’s explainer video on Gradileo.'],
  ],
});
