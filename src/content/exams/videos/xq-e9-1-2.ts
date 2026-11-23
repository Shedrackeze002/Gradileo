import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 1.2 (character arcs and foils). An exam-style question we wrote, in the style
// of a Grade 9 reading test, on a story we summarise. The answer is D: Theo's caution sets off Mira's
// boldness, so he is her foil.

const SUMMARY = [
  'Mira and Theo are twins who find a map to a hidden cave. Mira charges ahead without a torch, sure she can find the way. Theo checks the tide tables, packs rope, and asks a fisherman about the rocks.',
  'When the tide turns, Mira is trapped on a ledge. Theo’s rope gets her out. On the walk home, Mira asks Theo to teach her how to read the tide tables.',
];

export default englishExam({
  lesson: 'e9-1-2',
  ...ours('a Grade 9 reading test', 'the story is by Gradileo'),
  title: 'What Role Does Theo Play in Mira’s Story?',
  thumbnailTitle: 'Character Foils',
  subtitle: 'Arcs and foils, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: twins explore a sea cave, one reckless and one careful. We compare the two characters trait by trait, see how one makes the other stand out, and trace how Mira changes by the end.',
  intro: [
    'In this video, we solve an exam-style reading question about character foils and arcs. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its story ourselves, in the style of a Grade 9 reading test.',
  ],
  passage: {
    lines: SUMMARY,
    by: 'A story written for Gradileo, summarised',
    say: [
      'First, here is the story. Mira and Theo are twins who find a map to a hidden cave. Mira charges ahead without a torch, sure she can find the way. Theo checks the tide tables, packs rope, and asks a fisherman about the rocks.',
      'When the tide turns, Mira is trapped on a ledge. Theo’s rope gets her out. On the walk home, Mira asks Theo to teach her how to read the tide tables.',
    ],
  },
  question: {
    prompt: 'What role does **Theo** mainly play in the story?',
    text: 'Read the story about Mira and Theo. What role does Theo mainly play in the story?',
    choices: ['He is the villain who traps Mira.', 'He is the narrator.', 'He is a minor character with no effect on Mira.', 'He is a foil whose caution highlights Mira’s recklessness.'],
    answer: 3,
    working: 'Theo’s **careful** choices set off Mira’s **reckless** ones, and help **change** her.',
    say: ['What role does Theo mainly play in the story? A: He is the villain who traps Mira. B: He is the narrator. C: He is a minor character with no effect on Mira. D: He is a foil whose caution highlights Mira’s recklessness.'],
  },
  ask: [
    ['Two twins who act **very differently**', 'The twins act very differently.'],
    ['What is Theo’s **role**?', 'We need to name Theo’s role.'],
  ],
  know: {
    title: 'Character arcs and foils',
    md: 'A **character arc** is how a character **changes** from beginning to end. A **foil** is a character whose **contrasting** traits make another character’s traits **stand out**, the way a dark background makes a jewel shine.',
    say: [
      'Here is the idea we need. A character arc is how a character changes from the beginning of a story to the end.',
      'A foil is a character whose contrasting traits make another character’s traits stand out, the way a dark background makes a jewel shine.',
    ],
  },
  plan: [
    ['**Compare** the twins trait by trait', 'Here is the plan. First, compare the twins trait by trait.'],
    ['Ask what Theo makes us **notice** about Mira', 'Second, ask what Theo makes us notice about Mira.'],
    ['Trace Mira’s **arc**', 'Third, trace Mira’s arc.'],
  ],
  steps: [
    scene('Step 1: Compare the twins', [table('t', ['', 'Mira', 'Theo'], [['preparation', '[[bad:no torch]]', '[[good:tide tables, rope]]'], ['attitude', '[[bad:“sure she can find the way”]]', '[[good:asks a fisherman]]'], ['outcome', 'trapped on a ledge', 'rescues her']])], [
      { say: 'Step one. Mira takes no torch and is sure she can find the way. Theo checks the tides, packs rope, and asks for advice.', show: ['t.0', 't.1'] },
      { say: 'Mira ends up trapped, and Theo’s preparation saves her.', show: 't.2' },
    ]),
    scene('Step 2: Foil and arc', [text('f', 'Theo’s **caution** makes Mira’s **recklessness** stand out: a **foil**', 'lg'), text('a', 'Mira’s arc: **reckless** → asks to **learn** caution. The answer is **D**.')], [
      { say: 'Step two. Every careful thing Theo does makes Mira’s carelessness more obvious. That makes him her foil.', show: 'f' },
      { say: 'And he helps shape her arc: at the end, Mira asks to learn the tide tables. She has begun to change. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Without Theo, Mira’s recklessness would be **less visible**', 'Let us check. Without Theo, we would notice Mira’s recklessness much less.'],
    ['and her **change** would have no model', 'And her change at the end would have no model. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'He **changes** Mira’s story completely', 'Choice C is the trap. Theo might seem quiet, but he saves Mira and changes her.'],
      ['A', 'The **tide** traps her, not Theo', 'Choice A: the tide traps her, and Theo rescues her.'],
      ['B', 'The story is told in the **third** person', 'Choice B: the story is told in the third person, not by Theo.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence best describes **Mira’s character arc**?',
    choices: ['She stays exactly the same.', 'She moves from overconfidence to a willingness to learn.', 'She becomes more reckless.', 'She stops speaking to Theo.'],
    answer: 1,
    working: 'From **charging ahead** to **asking to learn**.',
    ask: 'Which sentence best describes Mira’s character arc? A: She stays exactly the same. B: She moves from overconfidence to a willingness to learn. C: She becomes more reckless. D: She stops speaking to Theo.',
    reveal: 'The answer is B. She begins sure of herself and careless, and ends by asking Theo to teach her.',
  },
  sum: [
    ['An **arc** is how a character **changes**', 'Here is what to remember. A character arc is how a character changes.'],
    ['A **foil** **contrasts** with another character', 'A foil contrasts with another character.'],
    ['Compare trait by trait, and ask what the contrast **reveals**', 'Compare them trait by trait, and ask what the contrast reveals. For more on character arcs and foils, watch this lesson’s explainer video on Gradileo.'],
  ],
});
