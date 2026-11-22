import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 1.1 (plot and subplot). An exam-style question we wrote, in the style of a
// Grade 8 reading test, on a story opening we wrote. The answer is A, in medias res: the story begins
// in the middle of the action, and only later explains how the characters got there.

const PASSAGE = [
  'The rope snapped. Zara grabbed the edge of the bridge with one hand as her backpack tumbled into the river below.',
  '*Three days earlier, she had laughed when her brother said the old trail was too dangerous.*',
];

export default englishExam({
  lesson: 'e8-1-1',
  ...ours('a Grade 8 reading test', 'the passage is by Gradileo'),
  title: 'Which Plot Device Does This Opening Use?',
  thumbnailTitle: 'Plot Devices',
  subtitle: 'In medias res, twists and frame stories, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a story opens with Zara hanging from a broken bridge, then jumps back three days. We learn the main plot devices, test the opening against each one, and name the device it uses.',
  intro: [
    'In this video, we solve an exam-style reading question about plot devices. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 8 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A story opening written for Gradileo',
    say: [
      'First, read the opening of a story. The rope snapped. Zara grabbed the edge of the bridge with one hand as her backpack tumbled into the river below.',
      'Then the next paragraph begins: Three days earlier, she had laughed when her brother said the old trail was too dangerous.',
    ],
  },
  question: {
    prompt: 'Which **plot device** does the writer use to open this story?',
    text: 'Read the opening of the story about Zara. Which plot device does the writer use to open this story?',
    choices: ['in medias res', 'a twist ending', 'a frame story', 'a subplot'],
    answer: 0,
    working: 'The story starts **in the middle of the action** (the rope snapping), then goes **back** to explain how it happened.',
    say: ['Which plot device does the writer use to open this story? A: in medias res. B: a twist ending. C: a frame story. D: a subplot.'],
  },
  ask: [
    ['A **plot device** is a way of **arranging** events', 'A plot device is a technique for arranging the events of a story.'],
    ['Which one does this **opening** use?', 'We need the one this opening uses.'],
  ],
  know: {
    title: 'Plot devices',
    md: '**In medias res** (Latin for *into the middle of things*): the story starts in the **middle of the action**, then fills in what came before. A **twist** is a surprise that changes how we see the story, usually near the **end**. A **frame story** is a story **told inside** another story. A **subplot** is a **secondary** storyline.',
    say: [
      'Here is the idea we need. In medias res is Latin for into the middle of things. The story starts in the middle of the action, and fills in what came before later.',
      'A twist is a surprise that changes how we see the story, usually near the end. A frame story is a story told inside another story. And a subplot is a secondary storyline that runs alongside the main plot.',
    ],
  },
  plan: [
    ['Where does the story **start**?', 'Here is the plan. First, ask where the story starts.'],
    ['What happens **next** in the telling?', 'Second, ask what happens next in the telling.'],
    ['Match to a **device**', 'Third, match it to a device.'],
  ],
  steps: [
    scene('Step 1: Where it starts', [quote('p', ['[[bad:The rope snapped.]] Zara grabbed the edge of the bridge with one hand as her backpack tumbled into the river below.', '[[theta:Three days earlier]], she had laughed when her brother said the old trail was too dangerous.'])], [
      { say: 'Step one. The very first words are: the rope snapped. We are dropped straight into a moment of danger, with no introduction.', show: 'p', focus: 'p.0' },
      { say: 'Then the writer jumps back: three days earlier. Now the story will explain how Zara got onto that bridge.', focus: 'p.1' },
    ]),
    scene('Step 2: Match the device', [table('t', ['Device', 'Fits?'], [['in medias res', '[[good:✓ starts mid-action, then goes back]]'], ['twist ending', '[[bad:✗ this is the opening]]'], ['frame story', '[[bad:✗ no one is telling a story]]'], ['subplot', '[[bad:✗ only one storyline so far]]']]), text('a', 'The answer is **A, in medias res**.')], [
      { say: 'Step two. Starting in the middle of the action, then going back, is in medias res.', show: 't.0', focus: 't.0' },
      { say: 'A twist comes near the end. There is no storyteller, so it is not a frame story. And there is only one storyline, so there is no subplot yet. The answer is A.', show: ['t.1', 't.2', 't.3', 'a'] },
    ]),
  ],
  check: [
    ['The opening **hooks** us with danger first', 'Let us check. The opening hooks us with danger first.'],
    ['and **explains** it afterwards', 'And it explains how it happened afterwards. That is in medias res, so A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'The jump back is a **flashback**, not a story **inside** a story', 'Choice C is the trap. The jump back in time might feel like a story within a story, but nobody is telling it to anyone.'],
      ['B', 'A twist comes at the **end**', 'Choice B: a twist usually comes at the end.'],
      ['D', 'There is no **second** storyline yet', 'Choice D: there is no second storyline yet.'],
    ],
  },
  yourTurn: {
    prompt: 'In a novel, the main plot follows a girl training for a marathon, while a second storyline follows her grandmother learning to use a computer. The grandmother’s story is:',
    choices: ['a subplot', 'the climax', 'a frame story', 'in medias res'],
    answer: 0,
    working: 'A **secondary** storyline that runs alongside the main plot.',
    ask: 'In a novel, the main plot follows a girl training for a marathon, while a second storyline follows her grandmother learning to use a computer. The grandmother’s story is: A: a subplot. B: the climax. C: a frame story. D: in medias res.',
    reveal: 'The answer is A, a subplot. It is a secondary storyline that runs alongside the main plot, and often connects to its theme.',
  },
  sum: [
    ['**In medias res**: start mid-action, then go back', 'Here is what to remember. In medias res starts in the middle of the action, then goes back.'],
    ['**Twist**: a late surprise · **frame**: a story inside a story', 'A twist is a late surprise, and a frame story is a story inside a story.'],
    ['A **subplot** is a secondary storyline', 'And a subplot is a secondary storyline. For more on plot and subplot, watch this lesson’s explainer video on Gradileo.'],
  ],
});
