import { englishExam, quote, scene, text } from '../english.ts';

// Grade 5 English, lesson 1.2 (characters). An exam-style question we wrote, in the style of the
// key stage 2 English reading test, on a short passage we wrote. The answer is C: Priya gives up
// her place and her own lunch money without being asked, so she is generous.

const PASSAGE = [
  'The queue for the tuck shop stretched right across the playground. Priya was nearly at the front when she noticed Sam, the new boy, standing alone by the wall with empty hands.',
  'She stepped out of the line, walked over and pressed her last two coins into his palm. “Get yourself something,” she said with a grin. “I had a big breakfast anyway.”',
];

export default englishExam({
  lesson: 'e5-1-2',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question and passage by Gradileo',
  verbatim: false,
  title: 'Which Word Best Describes Priya?',
  thumbnailTitle: 'Character Traits',
  subtitle: 'Reading what a character does, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: which word best describes Priya, who gives her last coins to a new boy at school? We look at what she does and says, ask what kind of person acts that way, and back the answer with evidence.',
  intro: [
    'In this video, we solve an exam-style reading question about a character. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its story ourselves, in the style of the reading test that eleven-year-olds take in England.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. The queue for the tuck shop stretched right across the playground. Priya was nearly at the front when she noticed Sam, the new boy, standing alone by the wall with empty hands.',
      'She stepped out of the line, walked over and pressed her last two coins into his palm. “Get yourself something,” she said with a grin. “I had a big breakfast anyway.”',
    ],
  },
  question: {
    prompt: 'Which word best describes Priya in this passage?',
    text: 'Read the passage about Priya. Which word best describes Priya in this passage?',
    choices: ['impatient', 'shy', 'generous', 'greedy'],
    answer: 2,
    working: 'She gives her last coins to Sam, unasked, and even gives up her place in the queue.',
    say: ['Which word best describes Priya in this passage? A: impatient. B: shy. C: generous. D: greedy.'],
  },
  ask: [
    ['A word for **what kind of person** Priya is', 'The question wants a word for what kind of person Priya is. That kind of word is called a character trait.'],
    ['The writer **does not tell us**: we work it out', 'The passage never says what Priya is like, so we have to work it out from what she does.'],
  ],
  know: {
    title: 'Character traits',
    md: 'A **character trait** is what a character is like inside: kind, brave, selfish. We **infer** it from what the character **does** and **says**.',
    say: [
      'Here is the idea we need. A character trait is what a character is like inside, such as kind, brave or selfish.',
      'Writers usually show traits instead of naming them. We infer the trait, which means we work it out, from what the character does and says.',
    ],
    example: {
      md: '*Leo ran back into the storm to fetch his little sister’s lost cat.* → **brave**',
      say: 'For example, if Leo runs back into a storm to fetch a lost cat, the writer does not need to say he is brave. His action shows it.',
    },
  },
  plan: [
    ['What does Priya **do**?', 'Here is the plan. First, see what Priya does.'],
    ['What does Priya **say**?', 'Second, see what Priya says.'],
    ['Which **trait** do they show?', 'Third, decide which trait her actions and words show, and check it against the choices.'],
  ],
  steps: [
    scene('Step 1: What Priya does', [quote('p', PASSAGE), text('n', 'She leaves the queue · she gives away her **last** coins')], [
      { say: 'Step one. What does Priya do? Pause and find her actions.', show: 'p', wait: 3 },
      { say: 'She was nearly at the front of a long queue, and she steps out of it. Then she gives her last two coins to Sam.', focus: 'p.1' },
      { say: 'Notice the word last. She gives away all the money she has, and nobody asked her to.', show: 'n' },
    ]),
    scene('Step 2: What Priya says', [quote('p', PASSAGE), text('n', '“I had a big breakfast anyway” → she makes it **easy** for Sam to accept')], [
      { say: 'Step two. What does she say? “Get yourself something. I had a big breakfast anyway.”', show: 'p', focus: 'p.1' },
      { say: 'She says it with a grin, and she gives a reason so that Sam will not feel bad taking the money. She is thinking about him, not about herself.', show: 'n' },
    ]),
    scene('Step 3: Name the trait', [text('n', 'Gives what she has to someone else → **generous**', 'lg')], [
      { say: 'Step three. Someone who gives what they have to another person, happily, is generous. So the answer is C, generous.', show: 'n' },
    ]),
  ],
  check: [
    ['**Impatient**? She **leaves** the queue she waited in', 'Let us check the other words against the evidence. Impatient does not fit: she leaves a queue she has waited in, which is the opposite of impatient.'],
    ['**Shy**? She walks over and **speaks** with a grin', 'Shy does not fit: she walks straight over to a new boy and talks to him.'],
    ['**Greedy**? She gives her **last** coins away', 'And greedy is the opposite of what she does. Only generous matches every action.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Mixes up the **queue** with Priya’s feelings', 'Choice A grabs the word queue. But nothing shows Priya getting cross or restless about it.'],
      ['B', 'Describes **Sam**, not Priya', 'Choice B describes Sam, standing alone by the wall. Make sure the trait belongs to the right character.'],
      ['D', 'The **opposite** of what she does', 'Choice D is the opposite of Priya. A trap answer often flips the right one.'],
    ],
  },
  yourTurn: {
    prompt: 'Max checked the map three times, packed a spare torch and wrote the emergency number on his hand before the hike. Which word best describes Max?',
    choices: ['lazy', 'careful', 'forgetful', 'rude'],
    answer: 1,
    working: 'He checks, packs spares and plans for trouble before he goes.',
    ask: 'Max checked the map three times, packed a spare torch and wrote the emergency number on his hand before the hike. Which word best describes Max?',
    reveal: 'The answer is B, careful. He checks the map again and again, packs a spare and plans for an emergency, which is what a careful person does.',
  },
  sum: [
    ['A **character trait** is what a character is like inside', 'Here is what to remember. A character trait is what a character is like inside.'],
    ['Infer it from what the character **does** and **says**', 'We infer it from what the character does and says.'],
    ['Check the trait belongs to the **right** character, and fits **every** action', 'Check that the trait belongs to the right character and fits everything they do. For more on characters, watch this lesson’s explainer video on Gradileo.'],
  ],
});
