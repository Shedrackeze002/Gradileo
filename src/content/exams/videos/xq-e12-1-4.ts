import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 1.4 (ambiguity and open endings). An exam-style question we wrote, in the
// style of a Grade 12 reading test, on Henry James's The Turn of the Screw (1898), which is in the public
// domain. The answer is B: the governess alone claims to see the ghosts, so the text supports both a
// supernatural reading and a reading in which she imagines them.

const LINES = ['We were alone with the quiet day, and his little heart, dispossessed, had stopped.'];

export default englishExam({
  lesson: 'e12-1-4',
  ...ours('a Grade 12 reading test', 'the novella is Henry James’s The Turn of the Screw (1898), in the public domain'),
  title: 'Why Is The Turn of the Screw Called Ambiguous?',
  thumbnailTitle: 'Ambiguous Endings',
  subtitle: 'Ambiguity and open endings, step by step',
  summary:
    'An exam-style question on Henry James’s The Turn of the Screw, solved one small step at a time. A governess believes two ghosts are haunting the children in her care, and the story ends in sudden death. We weigh the evidence on each side and explain why readers still argue about it.',
  intro: [
    'In this video, we solve an exam-style question about ambiguity. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 reading test, on James’s novella, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Henry James, The Turn of the Screw (1898), the final sentence',
    say: ['First, the context. A young governess, who tells the story, believes the ghosts of two former servants are trying to possess the children she looks after. In the last scene she holds the boy, Miles, as she fights the ghost she sees at the window. The story ends: We were alone with the quiet day, and his little heart, dispossessed, had stopped.'],
  },
  question: {
    prompt: 'Why do critics often call this ending **ambiguous**?',
    text: 'Read the final sentence of The Turn of the Screw. Why do critics often call this ending ambiguous?',
    choices: [
      'The last sentence contains words that are hard to understand.',
      'Only the governess sees the ghosts, so the text supports both a ghost story and a story of her imagining them.',
      'James forgot to explain what happened to Miles.',
      'The story stops before the final scene happens.',
    ],
    answer: 1,
    working: 'Only **she** sees them; *dispossessed* = freed from a ghost, **or** frightened to death by her: **two** readings fit.',
    say: [
      'Why do critics often call this ending ambiguous?',
      'A: The last sentence contains words that are hard to understand. B: Only the governess sees the ghosts, so the text supports both a ghost story and a story of her imagining them. C: James forgot to explain what happened to Miles. D: The story stops before the final scene happens.',
    ],
  },
  ask: [
    ['The ending is called **ambiguous**', 'Critics call this ending ambiguous.'],
    ['What makes **two** readings possible?', 'We need to find what makes two readings possible.'],
  ],
  know: {
    title: 'Ambiguity and open endings',
    md: '**Deliberate ambiguity** means the text supports **more than one** reading, and the writer chooses not to settle it. To show ambiguity, give the **evidence on each side**. An **open ending** leaves the main question for readers to decide; an **ironic ending** turns out the opposite of what a character expects. Ask what the ending makes the reader **feel** and **think** about.',
    say: [
      'Here is the idea we need. Deliberate ambiguity means the text supports more than one reading, and the writer chooses not to settle it. To show ambiguity, give the evidence on each side.',
      'An open ending leaves the main question for readers to decide, and an ironic ending turns out the opposite of what a character expects. Ask what the ending makes the reader feel and think about.',
    ],
  },
  plan: [
    ['Evidence for **ghosts**', 'Here is the plan. First, the evidence that the ghosts are real.'],
    ['Evidence for **imagination**', 'Second, the evidence that she imagines them.'],
    ['See how the ending holds **both**', 'Third, see how the ending holds both.'],
  ],
  steps: [
    scene('Step 1: Both sides', [table('t', ['The ghosts are real', 'She imagines them'], [['she describes a man she had **never met**, and the housekeeper **recognises** him', 'only **she** ever sees the ghosts'], ['the children act **strangely**, as if hiding something', 'she is the **narrator**: we hear only her view'], ['Miles was sent home from school for **unexplained** reasons', 'her fear grows **wilder** as the story goes on']])], [
      { say: 'Step one. Look at both columns, row by row. For real ghosts: she describes a man she had never met, and the housekeeper recognises him as a dead servant. Against that: only she ever sees the ghosts.', show: 't.0' },
      { say: 'The children act strangely, as if hiding something. But she tells the whole story, so we hear only her view.', show: 't.1' },
      { say: 'Miles was sent home from school for reasons no one explains. But her fear grows wilder as the story goes on.', show: 't.2' },
    ]),
    scene('Step 2: The ending', [quote('p', ['…his little heart, [[theta:dispossessed]], had [[bad:stopped]].']), table('r', ['Reading', '*dispossessed* means'], [['ghost story', 'freed from the ghost, but too late'], ['imagined', 'frightened to death by **her** struggle']]), text('a', 'The text supports **both** readings → **B**', 'lg')], [
      { say: 'Step two. Dispossessed can mean freed from a ghost that possessed him. Or the boy may have died of fear in her grip, with no ghost there at all.', show: ['p', 'r.0', 'r.1'] },
      { say: 'The last word keeps both readings alive. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['B names the **evidence**: only she sees them', 'Let us check. B names the evidence, that only she sees the ghosts.'],
    ['and the **two** readings it supports', 'And it names the two readings that evidence supports. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'The ambiguity is **deliberate**, not a mistake', 'Choice C is the trap. Unanswered questions can look like a mistake, but the ambiguity is deliberate.'],
      ['A', 'The words are **clear**; the meaning is open', 'Choice A: the words are clear. It is the meaning that is open.'],
      ['D', 'The final scene **does** happen', 'Choice D: the final scene does happen, and Miles dies.'],
    ],
  },
  yourTurn: {
    prompt: 'A story ends without revealing whether the main character accepts the job offer, leaving readers to decide. What kind of ending is this?',
    choices: ['a twist ending', 'a happy ending', 'a circular ending', 'an open ending'],
    answer: 3,
    working: 'The main question is left **unresolved**: an **open** ending.',
    ask: 'A story ends without revealing whether the main character accepts the job offer, leaving readers to decide. What kind of ending is this? A: a twist ending. B: a happy ending. C: a circular ending. D: an open ending.',
    reveal: 'The answer is D, an open ending. The main question is left for readers to decide.',
  },
  sum: [
    ['Ambiguity = **more than one** reading the text supports', 'Here is what to remember. Ambiguity means the text supports more than one reading.'],
    ['Give the evidence on **each** side', 'Give the evidence on each side.'],
    ['Ask what an open ending makes you **think** about', 'And ask what an open ending makes you think about. For more on ambiguity and open endings, watch this lesson’s explainer video on Gradileo.'],
  ],
});
