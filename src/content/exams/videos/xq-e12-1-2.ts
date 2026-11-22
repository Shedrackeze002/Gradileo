import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 1.2 (fiction in context). An exam-style question we wrote, in the style of a
// Grade 12 reading test, on Charlotte Perkins Gilman's "The Yellow Wallpaper" (1892), which is in the
// public domain. The answer is D: knowing that husbands and doctors of the time held authority over
// women's health deepens the reading of the narrator's silenced voice.

const LINES = [
  'John is a physician, and perhaps—(I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind)—perhaps that is one reason I do not get well faster.',
  'You see he does not believe I am sick!',
];

export default englishExam({
  lesson: 'e12-1-2',
  ...ours('a Grade 12 reading test', 'the story is Charlotte Perkins Gilman’s “The Yellow Wallpaper” (1892), in the public domain'),
  title: 'How Does Context Deepen “The Yellow Wallpaper”?',
  thumbnailTitle: 'Fiction in Context',
  subtitle: 'Reading a story in its time, step by step',
  summary:
    'An exam-style question on Charlotte Perkins Gilman’s “The Yellow Wallpaper”, solved one small step at a time. The narrator can only speak freely to her secret journal. We look at who holds power over her, add what we know about women and medicine in the eighteen-nineties, and see how context deepens the reading.',
  intro: [
    'In this video, we solve an exam-style question about reading fiction in its context. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on Gilman’s story, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Charlotte Perkins Gilman, “The Yellow Wallpaper” (1892)',
    say: [
      'First, the context. The narrator has been told by her husband, John, to rest and not to write. She writes in secret. John is a physician, and perhaps, I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind, perhaps that is one reason I do not get well faster.',
      'And later: You see he does not believe I am sick!',
    ],
  },
  question: {
    prompt: 'In the eighteen-nineties, husbands and male doctors usually decided how a woman’s illness was treated. How does this **context** best deepen our reading of these lines?',
    text: 'Read the lines from The Yellow Wallpaper. In the eighteen-nineties, husbands and male doctors usually decided how a woman’s illness was treated. How does this context best deepen our reading of these lines?',
    choices: [
      'It proves that John is a cruel and violent man.',
      'It shows the story is mainly about the history of medicine.',
      'It means the narrator must be exaggerating her illness.',
      'It shows the narrator’s private journal is the only place her voice is heard, since both husband and doctor overrule her.',
    ],
    answer: 3,
    working: 'John is **husband** and **doctor**: two kinds of authority; *dead paper* is her **only** safe listener; *he does not believe I am sick*: her voice is **dismissed**.',
    say: [
      'In the eighteen-nineties, husbands and male doctors usually decided how a woman’s illness was treated. How does this context best deepen our reading of these lines?',
      'A: It proves that John is a cruel and violent man. B: It shows the story is mainly about the history of medicine. C: It means the narrator must be exaggerating her illness. D: It shows the narrator’s private journal is the only place her voice is heard, since both husband and doctor overrule her.',
    ],
  },
  ask: [
    ['We are given a fact about the **period**', 'We are given a fact about the period.'],
    ['How does it **deepen** the reading?', 'We need to say how it deepens our reading of the lines.'],
  ],
  know: {
    title: 'Using context well',
    md: 'Context is the **history**, **society** and **beliefs** around a text. Good use of context **deepens** an interpretation built on the words; it never **replaces** it. Ask: what did people of the time expect of a character like this? How is the character **shaped** by that society, and where do they **push against** it? Always tie the context back to a **quotation**.',
    say: [
      'Here is the idea we need. Context is the history, society and beliefs around a text. Good use of context deepens an interpretation that is built on the words. It never replaces the words.',
      'So ask what people of the time expected of a character like this, how the character is shaped by that society, and where they push against it. And always tie the context back to a quotation.',
    ],
  },
  plan: [
    ['Read what the **words** show', 'Here is the plan. First, read what the words themselves show.'],
    ['Add the **context**', 'Second, add the context.'],
    ['Choose the answer that **joins** them', 'Third, choose the answer that joins the two.'],
  ],
  steps: [
    scene('Step 1: The words', [table('t', ['Words', 'What they show'], [['*John is a **physician***', 'her husband is **also** her doctor'], ['*I would not say it to a **living soul***', 'she cannot speak **openly**'], ['*this is **dead paper***', 'only the journal **listens**'], ['*he does not **believe** I am sick*', 'her own account is **dismissed**']])], [
      { say: 'Step one. John is a physician. Her husband is also her doctor.', show: 't.0' },
      { say: 'She would not say it to a living soul, and only the dead paper of her journal listens.', show: ['t.1', 't.2'] },
      { say: 'And he does not believe she is sick. Her own account of herself is dismissed.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: Add the context', [text('c', 'Eighteen-nineties: husbands and male doctors **decided** a woman’s treatment'), quote('p', ['…this is [[good:dead paper]] and a great relief to my mind…', 'You see [[bad:he does not believe]] I am sick!']), text('a', 'Two authorities **overrule** her; the journal is her only **voice** → **D**', 'lg')], [
      { say: 'Step two. Now add the context. In her time, a husband and a male doctor would decide how she was treated. John is both.', show: 'c' },
      { say: 'So the secret journal becomes the only place her voice is heard. The context deepens what the words already show. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['D starts from the **words** and adds context', 'Let us check. D starts from the words, the dead paper and the disbelief, and adds the context.'],
    ['It **deepens** the reading; it does not replace it', 'It deepens the reading without replacing it. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Context **replaces** the story here', 'Choice B is the trap. It uses the context, but it lets the history replace the story instead of deepening it.'],
      ['A', 'No **violence** in the lines', 'Choice A: nothing in the lines shows violence.'],
      ['C', 'Takes John’s **side** without evidence', 'Choice C: it takes John’s side, with no evidence that she exaggerates.'],
    ],
  },
  yourTurn: {
    prompt: 'In a novel set in early nineteenth-century England, a daughter cannot inherit her father’s house because she is a woman. What would most help a reader understand this?',
    choices: ['the author’s favourite foods', 'the laws of the time about women and property', 'modern spelling rules', 'the number of pages in the novel'],
    answer: 1,
    working: 'The **inheritance laws** of the period explain the problem.',
    ask: 'In a novel set in early nineteenth-century England, a daughter cannot inherit her father’s house because she is a woman. What would most help a reader understand this? A: the author’s favourite foods. B: the laws of the time about women and property. C: modern spelling rules. D: the number of pages in the novel.',
    reveal: 'The answer is B. The laws of the time about women and property explain why she cannot inherit.',
  },
  sum: [
    ['Context **deepens** a reading; it never replaces it', 'Here is what to remember. Context deepens a reading. It never replaces it.'],
    ['Ask how society **shapes** the character', 'Ask how society shapes the character, and where the character pushes against it.'],
    ['Always tie context to a **quotation**', 'And always tie context to a quotation. For more on fiction in context, watch this lesson’s explainer video on Gradileo.'],
  ],
});
