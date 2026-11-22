import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 3.2 (Shakespeare's language). An exam-style question we wrote, in the style of
// a Grade 8 reading test, on two passages from William Shakespeare's A Midsummer Night's Dream (about
// 1595), which is in the public domain. The answer is C: Shakespeare usually gives verse to nobles,
// lovers and fairies, and plain prose to working people like Bottom.

const LINES = [
  '**Lysander** (a young noble): Ay me! for aught that I could ever read,<br>Could ever hear by tale or history,<br>The course of true love never did run smooth.',
  '**Bottom** (a weaver): You were best to call them generally, man by man, according to the scrip.',
];

export default englishExam({
  lesson: 'e8-3-2',
  ...ours('a Grade 8 reading test', 'the play is William Shakespeare’s A Midsummer Night’s Dream (about 1595), in the public domain'),
  title: 'Why Does Bottom Speak in Prose but Lysander in Verse?',
  thumbnailTitle: 'Verse and Prose',
  subtitle: 'Shakespeare’s language, step by step',
  summary:
    'An exam-style question on Shakespeare’s language, solved one small step at a time: in A Midsummer Night’s Dream, Lysander speaks in rhythmic verse while Bottom the weaver speaks in plain prose. We tell verse from prose, notice who speaks each, and explain why.',
  intro: [
    'In this video, we solve an exam-style question about Shakespeare’s language. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test, on Shakespeare’s A Midsummer Night’s Dream, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, A Midsummer Night’s Dream, Act 1, Scenes 1 and 2',
    say: [
      'First, read two passages. Lysander, a young noble, says: Ay me! for aught that I could ever read, could ever hear by tale or history, the course of true love never did run smooth.',
      'Bottom, a weaver, says: You were best to call them generally, man by man, according to the scrip.',
    ],
  },
  question: {
    prompt: 'Why does Lysander speak in **verse**, while Bottom speaks in **prose**?',
    text: 'Read the two passages from A Midsummer Night’s Dream. Why does Lysander speak in verse, while Bottom speaks in prose?',
    choices: [
      'Bottom has forgotten his lines.',
      'Lysander is angry, and Bottom is calm.',
      'Shakespeare usually gives verse to nobles and lovers, and plain prose to working people like Bottom.',
      'Prose was the only way to write comedy.',
    ],
    answer: 2,
    working: 'Verse (regular lines with a beat) marks **nobles**, **lovers** and **fairies**; prose marks **working people** and comic scenes.',
    say: [
      'Why does Lysander speak in verse, while Bottom speaks in prose?',
      'A: Bottom has forgotten his lines. B: Lysander is angry, and Bottom is calm. C: Shakespeare usually gives verse to nobles and lovers, and plain prose to working people like Bottom. D: Prose was the only way to write comedy.',
    ],
  },
  ask: [
    ['Two ways of speaking: **verse** and **prose**', 'Shakespeare’s characters speak in two ways: verse and prose.'],
    ['**Why** the difference here?', 'We need to explain why these two characters speak differently.'],
  ],
  know: {
    title: 'Verse, prose and Shakespeare’s English',
    md: '**Verse** has a regular **beat** (usually iambic pentameter), and each line starts with a **capital**. **Prose** is ordinary sentences running to the edge of the page. Shakespeare often gives **verse** to **nobles**, **lovers** and **fairies**, and **prose** to **working people** and comic moments. Also: *thou/thee* = you, *thy* = your, *art* = are.',
    say: [
      'Here is the idea we need. Verse has a regular beat, usually iambic pentameter, and each line starts with a capital letter. Prose is ordinary sentences that run to the edge of the page.',
      'Shakespeare often gives verse to nobles, lovers and fairies, and prose to working people and comic moments. Also remember: thou and thee mean you, thy means your, and art means are.',
    ],
  },
  plan: [
    ['Which passage is **verse**, which **prose**?', 'Here is the plan. First, which passage is verse, and which is prose?'],
    ['**Who** speaks each?', 'Second, who speaks each one?'],
    ['What **pattern** does that show?', 'Third, what pattern does that show?'],
  ],
  steps: [
    scene('Step 1: Verse or prose?', [table('t', ['', 'Lysander', 'Bottom'], [['line breaks and capitals', '✓ three lines', '✗ one running sentence'], ['regular beat', '✓ the **COURSE** of **TRUE** love **NEV**er…', '✗ ordinary speech'], ['so it is', '[[good:**verse**]]', '[[bad:**prose**]]']])], [
      { say: 'Step one. Lysander’s words are set out in lines, each starting with a capital, with a regular beat: the COURSE of TRUE love NEV er DID run SMOOTH. That is verse.', show: ['t.0', 't.1'] },
      { say: 'Bottom’s words are one ordinary sentence. That is prose.', show: 't.2' },
    ]),
    scene('Step 2: Who speaks, and why', [table('w', ['Speaker', 'Who they are', 'Form'], [['Lysander', 'a young **noble**, a **lover**', 'verse'], ['Bottom', 'a **weaver**, a working man', 'prose']]), text('a', 'Verse for **nobles and lovers**, prose for **working people** → **C**', 'lg')], [
      { say: 'Step two. Lysander is a young noble and a lover. Bottom is a weaver, a working man.', show: ['w.0', 'w.1'] },
      { say: 'This is Shakespeare’s usual pattern: verse for nobles, lovers and fairies, prose for working people and comedy. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Bottom’s **mistakes** (*scrip* for *script*) add to the **comedy**', 'Let us check. Bottom even says scrip instead of script, and his muddled prose adds to the comedy.'],
    ['The **form** tells us about the **speaker**', 'So the form of speech tells us about the speaker. C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Comedies use **both**', 'Choice D is the trap. Comedy scenes often use prose, but this whole play is a comedy, and the lovers speak in verse.'],
      ['B', 'The form shows **status**, not mood', 'Choice B: the form here shows who they are, not their mood.'],
      ['A', 'Bottom is **giving orders**, not forgetting', 'Choice A: Bottom has not forgotten anything. He is giving orders.'],
    ],
  },
  yourTurn: {
    prompt: 'In Shakespeare’s English, what does *“Thou art my friend”* mean?',
    choices: ['They are my friends.', 'You are my friend.', 'I was your friend.', 'Your friend is mine.'],
    answer: 1,
    working: '**thou** = you, **art** = are.',
    ask: 'In Shakespeare’s English, what does thou art my friend mean? A: They are my friends. B: You are my friend. C: I was your friend. D: Your friend is mine.',
    reveal: 'The answer is B. Thou means you, and art means are, so thou art my friend means you are my friend.',
  },
  sum: [
    ['**Verse**: lines with a regular beat · **prose**: ordinary sentences', 'Here is what to remember. Verse has lines with a regular beat, and prose is ordinary sentences.'],
    ['Verse for **nobles, lovers, fairies**; prose for **working people**', 'Shakespeare often gives verse to nobles, lovers and fairies, and prose to working people.'],
    ['*thou/thee* = you · *thy* = your · *art* = are', 'And thou and thee mean you, thy means your, and art means are. For more on Shakespeare’s language, watch this lesson’s explainer video on Gradileo.'],
  ],
});
