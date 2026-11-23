import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 7.2 (dashes, colons, parentheses and ellipses). An exam-style punctuation
// question we wrote, in the style of a Grade 11 language test. The answer is C: square brackets inside a
// quotation mark words the essay writer added or changed so that the quotation makes sense.

export default englishExam({
  lesson: 'e11-7-2',
  ...ours('a Grade 11 language test'),
  title: 'Why Are Square Brackets Used Inside a Quotation?',
  thumbnailTitle: 'Square Brackets',
  subtitle: 'Brackets, dashes and ellipses, step by step',
  summary:
    'An exam-style punctuation question, solved one small step at a time: an essay quotes an athlete, and two words appear in square brackets. We compare the quotation with what the athlete really said, and explain what the brackets tell the reader.',
  intro: [
    'In this video, we solve an exam-style punctuation question about square brackets. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 language test.',
  ],
  question: {
    prompt: 'An athlete said: *“It was the best day of my life.”*<br>An essay quotes this as: *The athlete said that “[winning the final] was the best day of my life.”*<br>Why are the **square brackets** used?',
    text: 'An athlete said: It was the best day of my life. An essay quotes this as: The athlete said that winning the final, in square brackets, was the best day of my life. Why are the square brackets used?',
    choices: [
      'to show that words have been left out',
      'to mark a comment the athlete whispered',
      'to show that the essay writer replaced words so the quotation makes sense',
      'to show that the words are the title of a book',
    ],
    answer: 2,
    working: 'The athlete said *It*; the essay writer put **[winning the final]** in its place so the reader knows what *It* means.',
    say: [
      'An athlete said: It was the best day of my life. An essay quotes this as: the athlete said that, winning the final, in square brackets, was the best day of my life. Why are the square brackets used?',
      'A: to show that words have been left out. B: to mark a comment the athlete whispered. C: to show that the essay writer replaced words so the quotation makes sense. D: to show that the words are the title of a book.',
    ],
  },
  ask: [
    ['Two words are in **square brackets**', 'Two words in the quotation are in square brackets.'],
    ['What do the brackets **tell** the reader?', 'We need to say what the brackets tell the reader.'],
  ],
  know: {
    title: 'Dashes, colons, brackets and ellipses',
    md: 'A **colon** introduces what follows: a list, an explanation or a quotation. **Dashes** set off an interruption or a sharp afterthought, and **parentheses** set off quieter extra information. Inside a quotation, **square brackets [ ]** mark words that **you** added or changed, and an **ellipsis (…)** marks words you **left out**. Both keep a quotation honest.',
    say: [
      'Here is the idea we need. A colon introduces what follows, such as a list, an explanation or a quotation. Dashes set off an interruption or a sharp afterthought, and parentheses set off quieter extra information.',
      'Inside a quotation, square brackets mark words that you, the writer, added or changed, and an ellipsis, three dots, marks words you left out. Both keep a quotation honest.',
    ],
  },
  plan: [
    ['Compare with the **original** words', 'Here is the plan. First, compare the quotation with the original words.'],
    ['See what **changed**', 'Second, see what changed.'],
    ['Say **why** it changed', 'Third, say why it changed.'],
  ],
  steps: [
    scene('Step 1: Compare', [table('t', ['Original', 'In the essay'], [['*“[[theta:It]] was the best day of my life.”*', '*“[[[good:winning the final]]] was the best day of my life.”*']]), text('n', 'Only **one word** changed: *It* became **[winning the final]**')], [
      { say: 'Step one. Put the two side by side. The athlete said, it was the best day of my life.', show: 't.0' },
      { say: 'In the essay, the word it has gone, and winning the final, in square brackets, stands in its place. Everything else is the same.', show: 'n' },
    ]),
    scene('Step 2: Why', [quote('p', ['The athlete said that “[[[good:winning the final]]] was the best day of my life.”']), text('a', 'The writer **replaced** *It* so the quotation is **clear**, and the brackets **admit** it → **C**', 'lg')], [
      { say: 'Step two. On its own, it would leave the reader asking, what was the best day? So the essay writer replaced it with winning the final.', show: 'p' },
      { say: 'The square brackets admit that these are the essay writer’s words, not the athlete’s. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Nothing was **left out**, so this is no ellipsis', 'Let us check. Nothing was left out. A word was swapped, so an ellipsis would be wrong here.'],
    ['Brackets mark the **writer’s** words inside a quotation', 'Square brackets mark the writer’s own words inside a quotation. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Left-out words need an **ellipsis (…)**', 'Choice A is the trap. Brackets and an ellipsis both change a quotation, but words left out need an ellipsis, not brackets.'],
      ['B', 'The athlete never **said** these words', 'Choice B: the athlete never said these words at all.'],
      ['D', 'Titles use **italics** or **quotation marks**', 'Choice D: titles use italics or quotation marks, not square brackets.'],
    ],
  },
  yourTurn: {
    prompt: 'In a quotation, what does an **ellipsis (…)** show?',
    choices: ['that the speaker asked a question', 'that words have been left out', 'that a new speaker begins', 'that a word is misspelt'],
    answer: 1,
    working: 'Three dots = words **omitted**.',
    ask: 'In a quotation, what does an ellipsis, three dots, show? A: that the speaker asked a question. B: that words have been left out. C: that a new speaker begins. D: that a word is misspelt.',
    reveal: 'The answer is B. An ellipsis shows that words have been left out of a quotation.',
  },
  sum: [
    ['**[ ]** inside a quotation: words **you** added or changed', 'Here is what to remember. Square brackets inside a quotation mark words you added or changed.'],
    ['**…** inside a quotation: words **left out**', 'An ellipsis inside a quotation marks words left out.'],
    ['Both keep a quotation **honest**', 'And both keep a quotation honest. For more on dashes, colons, parentheses and ellipses, watch this lesson’s explainer video on Gradileo.'],
  ],
});
