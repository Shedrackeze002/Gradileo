import { englishExam, quote, scene, text, bullets } from '../english.ts';

// Grade 5 English, lesson 3.1 (main idea and details). An exam-style question we wrote, in the
// style of the key stage 2 English reading test, on a paragraph we wrote. The answer is C: every
// detail (feet, fur, fat, eating little) explains how camels cope in the desert.

const PASSAGE = [
  'Camels are built for life in the desert. Their wide, padded feet stop them sinking into soft sand. Thick fur on their backs shades them from the burning sun, and long eyelashes keep out blowing sand.',
  'A camel’s hump is a store of fat, which its body can use for energy when there is little to eat. A camel can also go for days without drinking, and then drink a huge amount of water in just a few minutes.',
];

export default englishExam({
  lesson: 'e5-3-1',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question and passage by Gradileo',
  verbatim: false,
  title: 'What Is the Main Idea of the Passage About Camels?',
  thumbnailTitle: 'Finding the Main Idea',
  subtitle: 'Main idea and details, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: what is the main idea of a short passage about camels? We find what the passage is about, see what all its details have in common, and tell the main idea apart from a single detail.',
  intro: [
    'In this video, we solve an exam-style reading question about the main idea of a passage. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of the reading test that eleven-year-olds take in England.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Camels are built for life in the desert. Their wide, padded feet stop them sinking into soft sand. Thick fur on their backs shades them from the burning sun, and long eyelashes keep out blowing sand.',
      'A camel’s hump is a store of fat, which its body can use for energy when there is little to eat. A camel can also go for days without drinking, and then drink a huge amount of water in just a few minutes.',
    ],
  },
  question: {
    prompt: 'What is the main idea of this passage?',
    text: 'Read the passage about camels. What is the main idea of this passage?',
    choices: ['A camel’s hump is full of fat.', 'Camels have long eyelashes.', 'Camels’ bodies help them survive in the desert.', 'Deserts are very hot and sandy places.'],
    answer: 2,
    working: 'Every detail (feet, fur, eyelashes, hump, drinking) is a way a camel copes with the desert.',
    say: [
      'What is the main idea of this passage?',
      'A: A camel’s hump is full of fat. B: Camels have long eyelashes. C: Camels’ bodies help them survive in the desert. D: Deserts are very hot and sandy places.',
    ],
  },
  ask: [
    ['The **main idea** is what the whole passage is mostly about', 'The main idea is the most important point of the passage: what the whole of it is mostly about.'],
    ['Not **one** detail, but the point they **all** support', 'So we are not looking for one fact from the passage, but for the big point that all the facts support.'],
  ],
  know: {
    title: 'Main idea and details',
    md: 'The **main idea** is the most important point of a text. The **supporting details** are facts and examples that explain or prove it. Often the first sentence states the main idea.',
    say: [
      'Here is the idea we need. The main idea is the most important point a text makes.',
      'The supporting details are the facts and examples that explain or prove it. In many paragraphs, the first sentence states the main idea, and the rest give details.',
    ],
    example: {
      md: 'Test: **every** detail should fit **under** the main idea, like things in a box.',
      say: 'Here is a good test. Think of the main idea as a box. Every detail in the passage should fit inside it.',
    },
  },
  plan: [
    ['List the **details**', 'Here is the plan. First, list the details.'],
    ['Find what they **all** have in common', 'Second, find what they all have in common.'],
    ['Pick the choice that covers **every** detail', 'Third, pick the choice that covers every detail.'],
  ],
  steps: [
    scene('Step 1: List the details', [bullets('d', ['wide, padded **feet** → no sinking in sand', 'thick **fur** → shade from the sun', 'long **eyelashes** → keep out sand', '**hump** of fat → energy when food is scarce', 'days without **drinking**'])], [
      { say: 'Step one. Pause and list the facts the passage gives about camels.', wait: 3 },
      { say: 'Wide, padded feet stop them sinking in sand.', show: 'd.0' },
      { say: 'Thick fur shades them from the sun, and long eyelashes keep out sand.', show: ['d.1', 'd.2'] },
      { say: 'The hump stores fat for energy, and they can go for days without drinking.', show: ['d.3', 'd.4'] },
    ]),
    scene('Step 2: What they share', [quote('p', PASSAGE.slice(0, 1)), text('n', 'Every detail is a way a camel **copes with the desert**.')], [
      { say: 'Step two. What do all these details have in common? Each one is a way a camel copes with the desert: the sand, the sun, and the lack of food and water.', show: 'n' },
      { say: 'And the first sentence says exactly that: camels are built for life in the desert. That is the main idea.', show: 'p', focus: 'p.0' },
    ]),
    scene('Step 3: The answer', [text('ans', '**C.** Camels’ bodies help them survive in the desert.', 'lg')], [
      { say: 'Step three. Choice C says camels’ bodies help them survive in the desert. Every detail fits inside it. So the answer is C.', show: 'ans' },
    ]),
  ],
  check: [
    ['Feet, fur, eyelashes, hump, drinking: all fit under **C**', 'Let us check with our box test. Feet, fur, eyelashes, hump, drinking: every detail fits inside choice C.'],
    ['C matches the passage’s **first sentence**', 'And C says the same thing as the passage’s first sentence. Both checks agree.'],
  ],
  traps: {
    say: 'The wrong answers are true, which is what makes them traps.',
    rows: [
      ['A', 'A true **detail**, not the main idea', 'The hump is full of fat, but that is only one detail. The feet and fur do not fit inside it.'],
      ['B', 'Another single **detail**', 'Long eyelashes is also just one detail.'],
      ['D', 'True, but the passage is about **camels**, not deserts', 'Deserts are hot and sandy, but the passage is about camels. Its main idea must be about what it mostly describes.'],
    ],
  },
  yourTurn: {
    prompt: '*Bees are busy workers. Some collect nectar from flowers. Others guard the hive, and some feed the young bees. A few even fan their wings to keep the hive cool.* What is the main idea?',
    choices: ['Bees in a hive do many different jobs.', 'Some bees fan their wings.', 'Flowers make nectar.', 'Young bees must be fed.'],
    answer: 0,
    working: 'Collecting, guarding, feeding and fanning are all jobs: they all fit under A.',
    ask: 'Bees are busy workers. Some collect nectar from flowers. Others guard the hive, and some feed the young bees. A few even fan their wings to keep the hive cool. What is the main idea?',
    reveal: 'The answer is A. Collecting nectar, guarding, feeding and fanning are all jobs, so they all fit inside the main idea that bees do many different jobs.',
  },
  sum: [
    ['The **main idea** is what the whole text is mostly about', 'Here is what to remember. The main idea is what the whole text is mostly about.'],
    ['**Details** support it; a single detail is not the main idea', 'Details support it, and a single detail is never the main idea.'],
    ['Box test: **every** detail must fit inside the main idea', 'Use the box test: every detail must fit inside the main idea. For more on main ideas and details, watch this lesson’s explainer video on Gradileo.'],
  ],
});
