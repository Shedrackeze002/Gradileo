import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 1.2 (character). An exam-style question we wrote, in the style of a Grade 10
// reading test, on the first chapter of Jane Austen's Pride and Prejudice (1813), which is in the public
// domain. The answer is C: the narrator states Mrs Bennet's traits outright, which is direct
// characterization.

const LINES = ['Mr. Bennet was so odd a mixture of quick parts, sarcastic humour, reserve, and caprice, that the experience of three-and-twenty years had been insufficient to make his wife understand his character. Her mind was less difficult to develop. She was a woman of mean understanding, little information, and uncertain temper.'];

export default englishExam({
  lesson: 'e10-1-2',
  ...ours('a Grade 10 reading test', 'the novel is Jane Austen’s Pride and Prejudice (1813), in the public domain'),
  title: 'How Does Austen Characterize Mrs Bennet?',
  thumbnailTitle: 'Direct Characterization',
  subtitle: 'Direct and indirect characterization, step by step',
  summary:
    'An exam-style question on Jane Austen’s Pride and Prejudice, solved one small step at a time: at the end of the first chapter, the narrator sums up Mr and Mrs Bennet. We decode the old-fashioned words, ask who is telling us about Mrs Bennet, and name the method.',
  intro: [
    'In this video, we solve an exam-style question about characterization. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Jane Austen’s novel, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Jane Austen, Pride and Prejudice (1813), Chapter 1',
    say: ['First, read the end of the first chapter. Mr. Bennet was so odd a mixture of quick parts, sarcastic humour, reserve, and caprice, that the experience of three-and-twenty years had been insufficient to make his wife understand his character. Her mind was less difficult to develop. She was a woman of mean understanding, little information, and uncertain temper.'],
  },
  question: {
    prompt: 'How does the narrator **mainly** characterize Mrs Bennet in this passage?',
    text: 'Read the passage from Pride and Prejudice. How does the narrator mainly characterize Mrs Bennet in this passage?',
    choices: [
      'Indirectly, through what she says to her husband.',
      'Indirectly, through how other characters react to her.',
      'Directly, by telling the reader her traits.',
      'Indirectly, through a description of her appearance.',
    ],
    answer: 2,
    working: 'The narrator **states** her traits outright: *mean understanding, little information, and uncertain temper*.',
    say: [
      'How does the narrator mainly characterize Mrs Bennet in this passage?',
      'A: Indirectly, through what she says to her husband. B: Indirectly, through how other characters react to her. C: Directly, by telling the reader her traits. D: Indirectly, through a description of her appearance.',
    ],
  },
  ask: [
    ['We need the **method** of characterization', 'We need the method the narrator uses to show us Mrs Bennet.'],
    ['Is it **told** or **shown**?', 'The key question is whether her character is told or shown.'],
  ],
  know: {
    title: 'Direct and indirect characterization',
    md: '**Direct** characterization: the narrator or another character **tells** us a trait (*she was greedy*). **Indirect** characterization: we **infer** traits from **speech**, **thoughts**, **effect on others**, **actions** and **looks** (a handy memory word: **STEAL**). Characters can also be **round** or **flat**, and **dynamic** (they change) or **static** (they stay the same).',
    say: [
      'Here is the idea we need. In direct characterization, the narrator or another character tells us a trait outright, such as she was greedy.',
      'In indirect characterization, we infer traits from a character’s speech, thoughts, effect on others, actions and looks. The word steal helps you remember them. Characters can also be round or flat, and dynamic, if they change, or static, if they stay the same.',
    ],
  },
  plan: [
    ['Decode the **words**', 'Here is the plan. First, decode the old-fashioned words.'],
    ['Ask **who** is telling us', 'Second, ask who is telling us about her.'],
    ['Name the **method**', 'Third, name the method.'],
  ],
  steps: [
    scene('Step 1: Decode', [table('t', ['Austen', 'Meaning'], [['*mean understanding*', 'not very **clever**'], ['*little information*', 'not well **informed**'], ['*uncertain temper*', '**moody**, quick to change']])], [
      { say: 'Step one. Austen’s words are old-fashioned. Mean understanding means she is not very clever.', show: 't.0' },
      { say: 'Little information means she does not know much. And uncertain temper means she is moody.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: Who tells us?', [quote('p', ['[[theta:She was]] a woman of [[good:mean understanding]], [[good:little information]], and [[good:uncertain temper]].']), text('a', 'The **narrator** names her traits outright: **direct** → **C**', 'lg')], [
      { say: 'Step two. Who is telling us this? The narrator, in a plain statement: she was. We are not shown her speech or her actions. We are simply told her traits.', show: 'p' },
      { say: 'That is direct characterization. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['No **dialogue** or **action** in these lines', 'Let us check. There is no dialogue and no action in these lines.'],
    ['Just **traits**, stated by the narrator', 'Just traits, stated by the narrator. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Earlier she **speaks**, but these lines only **tell**', 'Choice A is the trap. Mrs Bennet does talk earlier in the chapter, but these lines tell us about her directly.'],
      ['B', 'No other character **reacts** here', 'Choice B: no other character reacts to her here.'],
      ['D', 'Nothing about her **looks**', 'Choice D: there is nothing about her appearance.'],
    ],
  },
  yourTurn: {
    prompt: 'In *A Christmas Carol*, Scrooge begins mean and ends generous. What kind of character is he?',
    choices: ['flat', 'dynamic', 'static', 'an antagonist only'],
    answer: 1,
    working: 'He **changes** deeply: a **dynamic** character.',
    ask: 'In A Christmas Carol, Scrooge begins mean and ends generous. What kind of character is he? A: flat. B: dynamic. C: static. D: an antagonist only.',
    reveal: 'The answer is B, dynamic. Scrooge changes deeply over the story, from mean to generous.',
  },
  sum: [
    ['**Direct**: the trait is **told**', 'Here is what to remember. In direct characterization, the trait is told.'],
    ['**Indirect**: we **infer** it from speech, thoughts, effect, actions, looks', 'In indirect characterization, we infer it from speech, thoughts, effect on others, actions and looks.'],
    ['**Dynamic** characters change; **static** ones do not', 'And dynamic characters change, while static ones do not. For more on character, watch this lesson’s explainer video on Gradileo.'],
  ],
});
