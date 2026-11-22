import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 3.1 (summarizing). An exam-style question we wrote, in the style of a
// Grade 6 reading test, on a passage we wrote about Mary Anning. The answer is A: it gives the main
// idea (she made important fossil discoveries) and the key point that she won little credit.

const PASSAGE = [
  'Mary Anning grew up in Lyme Regis, a town on the south coast of England, in the early 1800s. Her family was poor, and they sold fossils from the crumbling cliffs to visitors.',
  'When she was about twelve, Mary and her brother found the skeleton of an ichthyosaur, a sea reptile that lived in the time of the dinosaurs. Later, she found the first nearly complete plesiosaur.',
  'Scientists came to study her finds, yet as a woman she was not allowed to join the scientific societies of her day, and others often took the credit for her work.',
];

export default englishExam({
  lesson: 'e6-3-1',
  ...ours('a Grade 6 reading test', 'the passage is by Gradileo'),
  title: 'Which Is the Best Summary of the Passage About Mary Anning?',
  thumbnailTitle: 'Writing a Summary',
  subtitle: 'Main ideas, not every detail, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: which is the best summary of a short passage about the fossil hunter Mary Anning? We pick out the main idea of each paragraph, leave out the small details, and choose the summary that covers the whole passage.',
  intro: [
    'In this video, we solve an exam-style reading question about summarizing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 6 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Mary Anning grew up in Lyme Regis, a town on the south coast of England, in the early eighteen hundreds. Her family was poor, and they sold fossils from the crumbling cliffs to visitors.',
      'When she was about twelve, Mary and her brother found the skeleton of an ichthyosaur, a sea reptile that lived in the time of the dinosaurs. Later, she found the first nearly complete plesiosaur.',
      'Scientists came to study her finds, yet as a woman she was not allowed to join the scientific societies of her day, and others often took the credit for her work.',
    ],
  },
  question: {
    prompt: 'Which is the **best summary** of this passage?',
    text: 'Read the passage about Mary Anning. Which is the best summary of this passage?',
    choices: [
      'Mary Anning made important fossil discoveries, but because she was a woman she received little credit.',
      'Mary Anning lived in Lyme Regis, a town on the south coast of England.',
      'Ichthyosaurs were sea reptiles that lived in the time of the dinosaurs.',
      'Mary Anning’s family sold fossils, and she had a brother who helped her.',
    ],
    answer: 0,
    working: 'It covers the main idea of every paragraph and leaves out small details.',
    say: [
      'Which is the best summary of this passage?',
      'A: Mary Anning made important fossil discoveries, but because she was a woman she received little credit. B: Mary Anning lived in Lyme Regis, a town on the south coast of England. C: Ichthyosaurs were sea reptiles that lived in the time of the dinosaurs. D: Mary Anning’s family sold fossils, and she had a brother who helped her.',
    ],
  },
  ask: [
    ['A **summary** retells the **most important** ideas', 'A summary retells the most important ideas of a text, briefly, in your own words.'],
    ['The **best** one covers the **whole** passage', 'The best summary covers the whole passage, not just one part of it.'],
  ],
  know: {
    title: 'Summarizing',
    md: 'A **summary** is **short**, gives only the **main ideas**, covers the **whole** text, and leaves out small **details** and opinions. Tip: find the main idea of **each paragraph**, then join them.',
    say: [
      'Here is the idea we need. A summary is short. It gives only the main ideas, it covers the whole text, and it leaves out small details and your own opinions.',
      'A useful method is to find the main idea of each paragraph, then join them together.',
    ],
  },
  plan: [
    ['Find the main idea of **each paragraph**', 'Here is the plan. First, find the main idea of each paragraph.'],
    ['Join them into **one** short statement', 'Second, join them into one short statement.'],
    ['Pick the choice that **matches**', 'Third, pick the choice that matches it.'],
  ],
  steps: [
    scene('Step 1: Each paragraph’s main idea', [table('t', ['Paragraph', 'Main idea'], [['1', 'A poor girl from a seaside town who sold fossils'], ['2', 'She made **important discoveries**: an ichthyosaur, a plesiosaur'], ['3', 'As a **woman**, she got **little credit**']])], [
      { say: 'Step one. Pause and find the main idea of each paragraph.', wait: 3 },
      { say: 'Paragraph 1 introduces Mary: a poor girl from a seaside town, whose family sold fossils.', show: 't.0' },
      { say: 'Paragraph 2 is about her great discoveries: an ichthyosaur, and the first nearly complete plesiosaur.', show: 't.1' },
      { say: 'Paragraph 3 says that, because she was a woman, she was shut out of scientific societies and others took the credit.', show: 't.2' },
    ]),
    scene('Step 2: Join them and match', [text('n', 'Important **discoveries** + little **credit** as a woman', 'lg'), text('a', 'That matches **A**.')], [
      { say: 'Step two. The heart of the passage is paragraphs 2 and 3: she made important discoveries, but received little credit because she was a woman. Paragraph 1 is background.', show: 'n' },
      { say: 'Choice A says exactly that. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['A covers the **discoveries** and the **lack of credit**', 'Let us check. A covers both big ideas: the discoveries and the lack of credit.'],
    ['It is **short** and leaves out details like her brother', 'It is short, and it leaves out details like the town’s name and her brother. That is what a summary should do.'],
  ],
  traps: {
    say: 'The wrong answers are all true, which is what makes them traps.',
    rows: [
      ['B', 'True, but only the **first** paragraph’s **setting**', 'Choice B is true, but it only covers the setting from the first paragraph.'],
      ['C', 'A **detail** about one fossil, not about **Mary**', 'Choice C explains one word in the passage. It does not even mention Mary.'],
      ['D', 'Two **small details**, and misses the main ideas', 'Choice D strings together small details and misses both main ideas.'],
    ],
  },
  yourTurn: {
    prompt: 'A passage explains that sea turtles lay eggs on beaches, that the baby turtles must race to the sea, and that lights from buildings confuse them, so many towns now dim their lights. Which is the best summary?',
    choices: ['Baby sea turtles face dangers reaching the sea, so some towns dim their lights to help.', 'Sea turtles have hard shells.', 'Towns turn off their lights at night.', 'Sea turtles lay eggs.'],
    answer: 0,
    working: 'A joins the main ideas: the danger and the solution.',
    ask: 'A passage explains that sea turtles lay eggs on beaches, that the baby turtles must race to the sea, and that lights from buildings confuse them, so many towns now dim their lights. Which is the best summary?',
    reveal: 'The answer is A. It joins the main ideas, the danger to the baby turtles and how towns help, in one short sentence. The others are single details.',
  },
  sum: [
    ['A **summary** is short and gives only **main ideas**', 'Here is what to remember. A summary is short and gives only the main ideas.'],
    ['Find each **paragraph’s** main idea, then **join** them', 'Find the main idea of each paragraph, then join them together.'],
    ['A **true** detail is not a summary', 'A true detail is not a summary: it must cover the whole text. For more on summarizing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
