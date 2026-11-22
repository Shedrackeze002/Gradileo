import { englishExam, ours, scene, table } from '../english.ts';

// Grade 7 English, lesson 7.4 (research and citing sources). An exam-style question we wrote, in the
// style of a Grade 7 writing test, on a source sentence we wrote. The answer is A: it puts the idea in
// new words and a new structure and names the source.

const SOURCE = ['“Honeybees communicate the location of food to other bees by performing a dance that shows the direction and distance of the flowers.” (from a science encyclopedia)'];

export default englishExam({
  lesson: 'e7-7-4',
  ...ours('a Grade 7 writing test', 'the source sentence is by Gradileo'),
  title: 'Which Is the Best Paraphrase of the Source?',
  thumbnailTitle: 'Paraphrasing',
  subtitle: 'Paraphrasing and avoiding plagiarism, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a student wants to use a sentence about the honeybee dance in a report. We learn the difference between quoting, paraphrasing and plagiarism, test four versions, and pick the one that uses new words and credits the source.',
  intro: [
    'In this video, we solve an exam-style writing question about paraphrasing and citing sources. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 writing test.',
  ],
  passage: {
    lines: SOURCE,
    by: 'A source sentence written for Gradileo',
    say: ['First, read the source. Honeybees communicate the location of food to other bees by performing a dance that shows the direction and distance of the flowers. It comes from a science encyclopedia.'],
  },
  question: {
    prompt: 'Which is the **best paraphrase** of the source, used correctly in a report?',
    text: 'Read the source. Which is the best paraphrase of the source, used correctly in a report?',
    choices: [
      'According to a science encyclopedia, a honeybee can dance to tell other bees which way to fly to find flowers and how far away they are.',
      'Honeybees communicate the location of food to other bees by performing a dance that shows the direction and distance of the flowers.',
      'Honeybees tell the location of food to other bees by doing a dance that shows the direction and distance of flowers.',
      'Bees are insects that make honey.',
    ],
    answer: 0,
    working: 'A keeps the **meaning**, uses **new words and structure**, and **credits** the source.',
    say: [
      'Which is the best paraphrase of the source, used correctly in a report?',
      'A: According to a science encyclopedia, a honeybee can dance to tell other bees which way to fly to find flowers and how far away they are. B: the source sentence copied word for word, with no quotation marks. C: the source sentence with only a few words swapped. D: Bees are insects that make honey.',
    ],
  },
  ask: [
    ['To **paraphrase** is to put an idea in **your own words**', 'To paraphrase is to put someone else’s idea in your own words.'],
    ['Which version does that **correctly**?', 'We need the version that does it correctly.'],
  ],
  know: {
    title: 'Quoting, paraphrasing and plagiarism',
    md: 'A **quotation** copies the **exact words** inside “quotation marks” and names the source. A **paraphrase** keeps the **meaning** but uses **new words and structure**, and still **names the source**. **Plagiarism** is passing off someone else’s words or ideas as your own, including copying and only **swapping a few words**.',
    say: [
      'Here is the idea we need. A quotation copies the exact words, inside quotation marks, and names the source.',
      'A paraphrase keeps the meaning but uses new words and a new structure, and it still names the source. Plagiarism is passing off someone else’s words or ideas as your own. That includes copying a sentence and only swapping a few words.',
    ],
  },
  plan: [
    ['Is the **meaning** kept?', 'Here is the plan. First, is the meaning kept?'],
    ['Are the **words** really new?', 'Second, are the words really new?'],
    ['Is the source **credited**?', 'Third, is the source credited?'],
  ],
  steps: [
    scene('Step 1: Test each version', [table('t', ['Version', 'Meaning kept?', 'New words?', 'Credited?'], [['A', '[[good:✓]]', '[[good:✓]]', '[[good:✓ “According to…”]]'], ['B', '✓', '[[bad:✗ copied exactly]]', '[[bad:✗]]'], ['C', '✓', '[[bad:✗ a few words swapped]]', '[[bad:✗]]'], ['D', '[[bad:✗ a different fact]]', '✓', '[[bad:✗]]']])], [
      { say: 'Step one. B copies the sentence word for word, with no quotation marks and no credit. That is plagiarism.', show: 't.1' },
      { say: 'C swaps a few words, communicate for tell, performing for doing, but keeps the same structure. That is still plagiarism.', show: 't.2' },
      { say: 'D uses new words, but it gives a completely different fact. The meaning is lost.', show: 't.3' },
      { say: 'A keeps the meaning, uses new words and a new structure, and begins According to a science encyclopedia. The answer is A.', show: 't.0', focus: 't.0' },
    ]),
  ],
  check: [
    ['Cover the source: could you write A **yourself**?', 'Let us check. A good test is to cover the source and write the idea from memory. A reads like that.'],
    ['and A tells the reader **where** the idea came from', 'And A tells the reader where the idea came from. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Swapping **a few words** is still plagiarism', 'Choice C is the trap. Swapping a few words feels like a paraphrase, but the sentence is still the author’s.'],
      ['B', 'A **copy** with no quotation marks', 'Choice B is a straight copy, with no quotation marks or credit.'],
      ['D', 'Loses the **meaning**', 'Choice D loses the meaning.'],
    ],
  },
  yourTurn: {
    prompt: 'A student wants to research honeybees. Which is the most **focused** research question?',
    choices: ['What are animals?', 'Are bees good?', 'Why is nature interesting?', 'How do honeybees use dance to share where food is?'],
    answer: 3,
    working: 'D is **specific** and **answerable** with research.',
    ask: 'A student wants to research honeybees. Which is the most focused research question? A: What are animals? B: Are bees good? C: Why is nature interesting? D: How do honeybees use dance to share where food is?',
    reveal: 'The answer is D. It is specific, and research could answer it. The others are too broad or too vague.',
  },
  sum: [
    ['**Quote**: exact words in quotation marks, with the source', 'Here is what to remember. A quotation uses the exact words, in quotation marks, with the source.'],
    ['**Paraphrase**: new words and structure, still **credited**', 'A paraphrase uses new words and structure, and is still credited.'],
    ['Copying or **swapping a few words** is **plagiarism**', 'Copying, or swapping only a few words, is plagiarism. For more on research and citing sources, watch this lesson’s explainer video on Gradileo.'],
  ],
});
