import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 5.3 (Great Expectations). An exam-style question we wrote, in the style of a
// GCSE English Literature exam, on Charles Dickens's Great Expectations (1861), which is in the public
// domain. The answer is B: the faded, yellowed white shows that Miss Havisham froze her life at the moment
// of her heartbreak, and has decayed with it.

const LINES = ['I saw that everything within my view which ought to be white, had been white long ago, and had lost its lustre, and was faded and yellow.'];

export default englishExam({
  lesson: 'ex-5-3',
  ...ours('a GCSE English Literature exam', 'the novel is Charles Dickens’s Great Expectations (1861), in the public domain'),
  title: 'What Does Pip’s First Sight of Miss Havisham Suggest?',
  thumbnailTitle: 'Great Expectations',
  subtitle: 'Miss Havisham, step by step',
  summary:
    'An exam-style question on Great Expectations, solved one small step at a time. Young Pip meets Miss Havisham, still in the wedding dress she wore when she was jilted many years before. We read the colours Dickens chooses, and explain what they show.',
  intro: [
    'In this video, we solve an exam-style question about Great Expectations. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Dickens’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Charles Dickens, Great Expectations (1861), Chapter 8',
    say: ['First, the context. Young Pip is taken to meet Miss Havisham, a rich woman who was jilted on her wedding day. She still wears her wedding dress, and all the clocks are stopped. Pip says: I saw that everything within my view which ought to be white, had been white long ago, and had lost its lustre, and was faded and yellow.'],
  },
  question: {
    prompt: 'What does this description most suggest about Miss Havisham?',
    text: 'Read Pip’s description. What does this description most suggest about Miss Havisham?',
    choices: [
      'She has just bought a new wedding dress.',
      'She froze her life at the moment of her heartbreak, and has decayed along with it.',
      'She prefers the colour yellow to white.',
      'She is about to get married.',
    ],
    answer: 1,
    working: '*ought to be white* (a **bride**) + *faded and yellow* (**age**) = time **stopped**, but **decay** went on.',
    say: [
      'What does this description most suggest about Miss Havisham?',
      'A: She has just bought a new wedding dress. B: She froze her life at the moment of her heartbreak, and has decayed along with it. C: She prefers the colour yellow to white. D: She is about to get married.',
    ],
  },
  ask: [
    ['Pip describes Miss Havisham’s **white** things', 'Pip describes the things around Miss Havisham that should be white.'],
    ['What does that **suggest**?', 'We need to say what the description suggests about her.'],
  ],
  know: {
    title: 'Great Expectations',
    md: 'The orphan **Pip** is raised by his sister and her kind husband, **Joe**, a blacksmith. He helps an escaped convict, **Magwitch**, and is invited to play at the house of **Miss Havisham**, who was jilted on her wedding day and has raised **Estella** to break men’s hearts. When Pip receives a fortune from a secret **benefactor**, he becomes a **gentleman**, and a snob. Themes: **social class**, **ambition**, **guilt** and **loyalty**.',
    say: [
      'Here is the idea we need. The orphan Pip is raised by his sister and her kind husband, Joe, a blacksmith. He helps an escaped convict, Magwitch, and is invited to play at the house of Miss Havisham, who was jilted on her wedding day and has raised Estella to break men’s hearts.',
      'When Pip receives a fortune from a secret benefactor, he becomes a gentleman, and a snob. The themes include social class, ambition, guilt and loyalty.',
    ],
  },
  plan: [
    ['What **ought** to be white?', 'Here is the plan. First, what ought to be white?'],
    ['What has **happened** to it?', 'Second, what has happened to it?'],
    ['What does that **show**?', 'Third, what does that show about her?'],
  ],
  steps: [
    scene('Step 1: White and yellow', [table('t', ['Words', 'Meaning'], [['*ought to be **white***', 'a **bride’s** dress and veil'], ['*had been white **long ago***', 'the wedding was **years** ago'], ['*lost its lustre… **faded and yellow***', '**decay** and **age**']])], [
      { say: 'Step one. Ought to be white: a bride’s dress and veil, the colour of a new beginning.', show: 't.0' },
      { say: 'But it had been white long ago. The wedding was many years in the past.', show: 't.1' },
      { say: 'Now it has lost its shine, and is faded and yellow, like old paper. That is decay.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: What it shows', [quote('p', ['…everything… which [[good:ought to be white]], had been white [[theta:long ago]], and… was [[bad:faded and yellow]].']), text('a', 'Life **frozen** at her heartbreak, **decaying** with it → **B**', 'lg')], [
      { say: 'Step two. She stopped her life, and her clocks, at the moment she was jilted. But time did not stop for her things, or for her.', show: 'p' },
      { say: 'Everything decayed with her. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['The **stopped clocks** show the same frozen time', 'Let us check. The stopped clocks show the same frozen moment.'],
    ['while her **dress** shows the decay', 'While her yellowed dress shows the decay. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'She **wears** a wedding dress, but her wedding was **long ago**', 'Choice D is the trap. She wears a wedding dress, but her wedding day was long ago.'],
      ['A', '*faded and yellow*: **old**, not new', 'Choice A: faded and yellow means old, not new.'],
      ['C', 'The yellow is **decay**, not a choice', 'Choice C: the yellow is decay, not a favourite colour.'],
    ],
  },
  yourTurn: {
    prompt: 'Who turns out to be Pip’s **secret benefactor**?',
    choices: ['Miss Havisham', 'Joe Gargery', 'Abel Magwitch', 'Mr Jaggers'],
    answer: 2,
    working: 'The **convict** Pip helped as a child.',
    ask: 'Who turns out to be Pip’s secret benefactor? A: Miss Havisham. B: Joe Gargery. C: Abel Magwitch. D: Mr Jaggers.',
    reveal: 'The answer is C, Magwitch, the convict Pip helped as a child. Pip had assumed it was Miss Havisham.',
  },
  sum: [
    ['Miss Havisham’s life is **frozen** at her heartbreak', 'Here is what to remember. Miss Havisham’s life is frozen at the moment of her heartbreak.'],
    ['**Faded white** shows **decay**', 'Faded, yellowed white shows decay.'],
    ['Themes: **class**, **ambition**, **guilt**', 'And the novel’s themes include class, ambition and guilt. For more on Great Expectations, watch this lesson’s explainer video on Gradileo.'],
  ],
});
