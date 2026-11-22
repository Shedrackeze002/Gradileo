import { englishExam, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 3.2 (text features). An exam-style question we wrote, in the style of
// the key stage 2 English reading test. The answer is C: an index lists the topics in a book in
// alphabetical order with their page numbers, so it finds "eggs" fastest.

export default englishExam({
  lesson: 'e5-3-2',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question by Gradileo',
  verbatim: false,
  title: 'Which Part of the Book Finds the Page About Owl Eggs?',
  thumbnailTitle: 'Using Text Features',
  subtitle: 'Index, glossary and captions, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: in an information book about owls, which part would help you find the page about owl eggs most quickly? We look at what each text feature is for, and match the job to the tool.',
  intro: [
    'In this video, we solve an exam-style reading question about the features of an information book. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of the reading test that eleven-year-olds take in England.',
  ],
  question: {
    prompt: 'Jade has an information book called *All About Owls*. She wants to find the page about **owl eggs** as quickly as possible. Which part of the book should she use?',
    text: 'Jade has an information book called All About Owls. She wants to find the page about owl eggs as quickly as possible. Which part of the book should she use?',
    choices: ['the glossary', 'the front cover', 'the index', 'a caption'],
    answer: 2,
    working: 'An index lists topics from A to Z with their page numbers: look under **E** for **eggs**.',
    say: [
      'Jade has an information book called All About Owls. She wants to find the page about owl eggs as quickly as possible. Which part of the book should she use?',
      'A: the glossary. B: the front cover. C: the index. D: a caption.',
    ],
  },
  ask: [
    ['Jade needs a **page number**', 'Jade already knows what she wants to read about. What she needs is the page it is on.'],
    ['Which feature gives page numbers for **topics**?', 'So the question is really: which part of the book tells you the page number for a topic?'],
  ],
  know: {
    title: 'Text features',
    md: '**Text features** help you find and understand information: the **contents** page, the **index**, the **glossary**, **headings**, **captions** and **diagrams**. Each one has its own job.',
    say: [
      'Here is the idea we need. Information books have text features, parts that help you find and understand information.',
      'They include the contents page, the index, the glossary, headings, captions and diagrams. Each one has its own job, so the trick is to match the job to the feature.',
    ],
  },
  plan: [
    ['Say what **each** choice is for', 'Here is the plan. First, say what each choice is for.'],
    ['Match the **job** to the feature', 'Second, match Jade’s job to the right feature.'],
  ],
  steps: [
    scene('Step 1: What each feature does', [
      table('t', ['Feature', 'Its job'], [['glossary', 'the **meanings** of special words, A to Z'], ['front cover', 'the **title** and author'], ['index', '**topics**, A to Z, with their **page numbers**'], ['caption', 'words under a **picture**, explaining it']]),
    ], [
      { say: 'Step one. Pause and think: what is each part of a book for?', wait: 3 },
      { say: 'A glossary gives the meanings of special words, in alphabetical order. It is like a small dictionary at the back of the book.', show: 't.0' },
      { say: 'The front cover shows the title and the author.', show: 't.1' },
      { say: 'An index, at the very back, lists the topics in the book from A to Z, with the page numbers where each one appears.', show: 't.2', focus: 't.2' },
      { say: 'And a caption is the words under a picture, explaining what it shows.', show: 't.3' },
    ]),
    scene('Step 2: Use the index', [table('i', ['Index', ''], [['barn owl', '4, 12'], ['**eggs**', '**18–19**'], ['feathers', '8'], ['hunting', '14–16']]), text('n', 'Look under **E** for **eggs** → pages **18 to 19**')], [
      { say: 'Step two. Here is what an index might look like. The topics are in alphabetical order.', show: 'i' },
      { say: 'Jade looks under E for eggs, and the index sends her straight to pages 18 and 19.', show: 'n', focus: 'i.1' },
      { say: 'So the index is the fastest way. The answer is C.' },
    ]),
  ],
  check: [
    ['The index gives the **exact page**', 'Let us check. The index gives the exact page, so Jade does not have to flip through the book.'],
    ['None of the others gives a page for **eggs**', 'None of the other features gives page numbers for topics. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The glossary is also A to Z, but gives **meanings**, not pages', 'Choice A is the big trap. The glossary is also at the back, in A to Z order. But it tells you what a word means, not where to find it.'],
      ['B', 'The cover only tells you the **title**', 'The front cover tells Jade the book is about owls, which she already knows.'],
      ['D', 'A caption explains **one picture**', 'A caption explains one picture, and Jade would have to find the right page first.'],
    ],
  },
  yourTurn: {
    prompt: 'In the same book, Jade reads that owls are **nocturnal**, but she does not know what the word means. Which part of the book should she use?',
    choices: ['the index', 'the glossary', 'the contents page', 'a heading'],
    answer: 1,
    working: 'The glossary gives the meanings of special words used in the book.',
    ask: 'In the same book, Jade reads that owls are nocturnal, but she does not know what the word means. Which part of the book should she use?',
    reveal: 'The answer is B, the glossary. It gives the meanings of special words in the book. Nocturnal means active at night.',
  },
  sum: [
    ['Each text feature has its **own job**', 'Here is what to remember. Each text feature has its own job.'],
    ['**Index**: topics and **page numbers** · **glossary**: **meanings**', 'The index gives the page numbers for topics, and the glossary gives the meanings of words.'],
    ['Match what you **need** to the feature that does it', 'So match what you need to the feature that does that job. For more on text features, watch this lesson’s explainer video on Gradileo.'],
  ],
});
