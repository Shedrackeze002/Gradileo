import { englishExam, quote, scene, text, bullets } from '../english.ts';

// Grade 5 English, lesson 1.4 (fables and their lessons). An exam-style question we wrote, in the
// style of the key stage 2 English reading test, on Aesop's fable of the ant and the grasshopper,
// retold in our own words (Aesop's fables are in the public domain). The answer is B: the
// grasshopper sings all summer and has no food in winter, so the lesson is to prepare for the future.

const PASSAGE = [
  'All summer long, the Grasshopper sang in the warm grass, while the Ant dragged grain, seed by seed, to her nest.',
  '“Why work so hard?” laughed the Grasshopper. “Come and sing with me!”',
  '“I am storing food for the winter,” said the Ant, and she carried on.',
  'When winter came, the fields were bare and white. The hungry Grasshopper knocked at the Ant’s door and begged for something to eat.',
  '“You sang all summer,” said the Ant. “Now you must dance all winter.”',
];

export default englishExam({
  lesson: 'e5-1-4',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question by Gradileo; the fable is Aesop’s, retold by Gradileo (public domain)',
  verbatim: false,
  title: 'What Is the Lesson of The Ant and the Grasshopper?',
  thumbnailTitle: 'The Moral of a Fable',
  subtitle: 'Finding the lesson, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: which sentence best states the lesson of Aesop’s fable of the ant and the grasshopper? We see what each character does, what happens to each in the end, and turn that into a lesson that fits any reader.',
  intro: [
    'In this video, we solve an exam-style reading question about a fable. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of the reading test that eleven-year-olds take in England, and the fable is Aesop’s, told in our own words.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'Aesop, “The Ant and the Grasshopper”, retold by Gradileo',
    say: [
      'First, read the fable. All summer long, the Grasshopper sang in the warm grass, while the Ant dragged grain, seed by seed, to her nest.',
      '“Why work so hard?” laughed the Grasshopper. “Come and sing with me!” “I am storing food for the winter,” said the Ant, and she carried on.',
      'When winter came, the fields were bare and white. The hungry Grasshopper knocked at the Ant’s door and begged for something to eat.',
      '“You sang all summer,” said the Ant. “Now you must dance all winter.”',
    ],
  },
  question: {
    prompt: 'Which sentence best states the lesson of this fable?',
    text: 'Read the fable “The Ant and the Grasshopper”. Which sentence best states the lesson of this fable?',
    choices: ['Ants are stronger than grasshoppers.', 'Prepare today for what you will need tomorrow.', 'Singing is a waste of time.', 'Always share your food with your friends.'],
    answer: 1,
    working: 'The Ant works ahead and has food in winter; the Grasshopper does not, and goes hungry.',
    say: [
      'Which sentence best states the lesson of this fable?',
      'A: Ants are stronger than grasshoppers. B: Prepare today for what you will need tomorrow. C: Singing is a waste of time. D: Always share your food with your friends.',
    ],
  },
  ask: [
    ['A **fable** teaches a lesson, called its **moral**', 'A fable is a short story that teaches a lesson, and the lesson is called its moral.'],
    ['Which choice is the **lesson** the story teaches?', 'The question asks which choice is that lesson. Not just something true about the story, but the big idea it wants us to learn.'],
  ],
  know: {
    title: 'The moral of a fable',
    md: 'A **moral** is the lesson a fable teaches. It is a rule for **people**, even when the characters are animals, and it fits **any** reader.',
    say: [
      'Here is the idea we need. The moral of a fable is the lesson it teaches. The characters are often animals, but the lesson is always meant for people.',
      'So a good moral is a rule that any reader could follow in their own life.',
    ],
    example: {
      md: '*The Tortoise and the Hare*: the slow tortoise wins → **Slow and steady wins the race.**',
      say: 'For example, in the fable of the tortoise and the hare, the slow tortoise keeps going and beats the boastful hare. The moral is: slow and steady wins the race.',
    },
  },
  plan: [
    ['What does **each character do**?', 'Here is the plan. First, see what each character does.'],
    ['What **happens** to each in the end?', 'Second, see what happens to each of them at the end.'],
    ['Turn that into a **rule for people**', 'Third, turn that into a rule for people, and find the choice that says it.'],
  ],
  steps: [
    scene('Step 1: What each character does', [quote('p', PASSAGE.slice(0, 3)), text('n', '**Ant:** works and stores food · **Grasshopper:** sings and plays')], [
      { say: 'Step one. What does each character do in the summer?', show: 'p' },
      { say: 'The Ant drags grain to her nest. She is storing food for the winter. The Grasshopper sings in the grass and laughs at her for working.', focus: ['p.0', 'p.2'] },
      { say: 'So the Ant works ahead, and the Grasshopper only thinks about today.', show: 'n' },
    ]),
    scene('Step 2: What happens in the end', [quote('p', PASSAGE.slice(3)), text('n', '**Ant:** has food · **Grasshopper:** goes hungry')], [
      { say: 'Step two. What happens when winter comes?', show: 'p' },
      { say: 'The fields are bare. The Grasshopper is hungry and has to beg. The Ant has the food she stored.', focus: 'p.0' },
      { say: 'The one who prepared is safe, and the one who did not prepare goes hungry.', show: 'n' },
    ]),
    scene('Step 3: The lesson', [bullets('c', ['A: Ants are stronger than grasshoppers. [[bad:A fact, not a lesson]]', 'B: Prepare today for what you will need tomorrow. [[good:Fits the whole story]]', 'C: Singing is a waste of time. [[bad:Too narrow]]', 'D: Always share your food with your friends. [[bad:Not what happens]]'])], [
      { say: 'Step three. Now we turn that into a rule for people. Work done now keeps you safe later. Let us test each choice.', show: 'c.0' },
      { say: 'A is about how strong ants are. The story never says that, and it is not a lesson for people.', focus: 'c.0' },
      { say: 'B says prepare today for what you will need tomorrow. That is exactly what the Ant did, and what the Grasshopper did not do.', show: 'c.1', focus: 'c.1' },
      { say: 'C says singing is a waste of time. But the problem was not the singing. It was that the Grasshopper did nothing else to get ready.', show: 'c.2', focus: 'c.2' },
      { say: 'D says always share your food. But the Ant does not share, so that cannot be the lesson of this story.', show: 'c.3', focus: 'c.3' },
    ]),
    scene('Step 4: The answer', [text('ans', '**B.** Prepare today for what you will need tomorrow.', 'lg')], [
      { say: 'Step four. The answer is B: prepare today for what you will need tomorrow.', show: 'ans' },
    ]),
  ],
  check: [
    ['It explains why the **Ant** is safe', 'Let us check. Does our moral explain the ending? The Ant prepared, so she is safe in winter.'],
    ['It explains why the **Grasshopper** is hungry', 'The Grasshopper did not prepare, so he is hungry.'],
    ['It works for **any reader**, not just insects', 'And it is a rule any reader could follow, like saving money or studying before a test. So B is the moral.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'A detail about **animals**, not a lesson for **people**', 'Choice A talks about the animals themselves. A moral is always a lesson for people.'],
      ['C', 'Picks out **one detail** and blames it', 'Choice C picks out one detail, the singing. The lesson is about getting ready, not about music.'],
      ['D', 'A **good** lesson, but not **this** story’s', 'Choice D is a kind idea, but it is not what this story teaches. Always check a moral against what happens in the story.'],
    ],
  },
  yourTurn: {
    prompt: 'A boy who looks after sheep shouts “Wolf!” for fun, again and again, and the villagers run to help each time. When a real wolf comes, nobody believes him. What is the lesson of this fable?',
    choices: ['Wolves are dangerous animals.', 'Villagers should always help.', 'Sheep need a good shepherd.', 'People do not believe someone who often lies.'],
    answer: 3,
    working: 'He lied so often that, when he told the truth, nobody believed him.',
    ask: 'A boy who looks after sheep shouts wolf for fun, again and again, and the villagers run to help each time. When a real wolf comes, nobody believes him. What is the lesson of this fable?',
    reveal: 'The answer is D: people do not believe someone who often lies. The boy lied so often that, when he finally told the truth, nobody believed him.',
  },
  sum: [
    ['A fable’s **moral** is the lesson it teaches', 'Here is what to remember. The moral of a fable is the lesson it teaches.'],
    ['Look at what each character **does**, and what **happens** to them', 'To find it, look at what each character does, and what happens to each of them in the end.'],
    ['A moral is a rule for **people** that fits the **whole** story', 'A moral is a rule for people, and it must fit the whole story, not just one detail. For more on fables and folk tales, watch this lesson’s explainer video on Gradileo.'],
  ],
});
