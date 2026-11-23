import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 7.2 (The Merchant of Venice). An exam-style question we wrote, in the style of
// a GCSE English Literature exam, on William Shakespeare's The Merchant of Venice (about 1597), which is in
// the public domain. The answer is A: Shylock argues that Jews share the same humanity as Christians, and so
// will take revenge as Christians do.

const LINES = ['**Shylock:** Hath not a Jew eyes? Hath not a Jew hands, organs, dimensions, senses, affections, passions?… If you prick us, do we not bleed? If you tickle us, do we not laugh? If you poison us, do we not die? And if you wrong us, shall we not revenge?'];

export default englishExam({
  lesson: 'ex-7-2',
  ...ours('a GCSE English Literature exam', 'the play is William Shakespeare’s The Merchant of Venice (about 1597), in the public domain'),
  title: 'What Is Shylock Arguing in “Hath Not a Jew Eyes?”',
  thumbnailTitle: 'The Merchant of Venice',
  subtitle: 'Shylock’s speech, step by step',
  summary:
    'An exam-style question on The Merchant of Venice, solved one small step at a time. Shylock, a Jewish moneylender mocked and spat on by the Christians of Venice, answers his accusers. We follow his questions, from eyes and hands to revenge, and state his argument.',
  intro: [
    'In this video, we solve an exam-style question about The Merchant of Venice. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, The Merchant of Venice, Act 3, Scene 1',
    say: ['First, the context. Shylock, a Jewish moneylender, has been insulted and spat on by Antonio and other Christians of Venice. He says: Hath not a Jew eyes? Hath not a Jew hands, organs, dimensions, senses, affections, passions? If you prick us, do we not bleed? If you tickle us, do we not laugh? If you poison us, do we not die? And if you wrong us, shall we not revenge?'],
  },
  question: {
    prompt: 'What is Shylock mainly **arguing** in this speech?',
    text: 'Read Shylock’s speech from Act 3. What is Shylock mainly arguing in this speech?',
    choices: [
      'Jews share the same humanity as Christians, so when wronged they will seek revenge just as Christians do.',
      'He has forgiven the Christians for how they treated him.',
      'He wants to become a Christian.',
      'He is too ill to continue his business.',
    ],
    answer: 0,
    working: '*eyes… hands… bleed… laugh… die* = the **same body and feelings**; *shall we not revenge?* = the same **response** to wrongs.',
    say: [
      'What is Shylock mainly arguing in this speech?',
      'A: Jews share the same humanity as Christians, so when wronged they will seek revenge just as Christians do. B: He has forgiven the Christians for how they treated him. C: He wants to become a Christian. D: He is too ill to continue his business.',
    ],
  },
  ask: [
    ['Shylock asks a **chain** of questions', 'Shylock asks a chain of questions.'],
    ['What is his **argument**?', 'We need to state his argument.'],
  ],
  know: {
    title: 'The Merchant of Venice',
    md: '**Antonio**, a merchant, borrows money from **Shylock** for his friend **Bassanio**, who wishes to marry **Portia**. Shylock, long insulted by Antonio, demands **a pound of Antonio’s flesh** if the loan is not repaid. Antonio’s ships are lost, but Portia, disguised as a lawyer, wins the trial: the bond allows flesh, but **no blood**. Themes: **prejudice**, **mercy and justice**, **money**, and **revenge**.',
    say: [
      'Here is the idea we need. Antonio, a merchant, borrows money from Shylock for his friend Bassanio, who wishes to marry Portia. Shylock, long insulted by Antonio, demands a pound of Antonio’s flesh if the loan is not repaid.',
      'Antonio’s ships are lost, but Portia, disguised as a lawyer, wins the trial: the bond allows flesh, but no blood. The themes include prejudice, mercy and justice, money, and revenge.',
    ],
  },
  plan: [
    ['Follow the **questions**', 'Here is the plan. First, follow the questions.'],
    ['See where they **lead**', 'Second, see where they lead.'],
    ['State the **argument**', 'Third, state the argument.'],
  ],
  steps: [
    scene('Step 1: The questions', [table('t', ['Questions', 'Point'], [['*eyes… hands… senses… passions?*', 'the **same** body and feelings'], ['*prick… bleed? tickle… laugh? poison… die?*', 'the **same** responses'], ['*wrong us, shall we not **revenge**?*', 'the **same** response to **wrongs**']])], [
      { say: 'Step one. Hath not a Jew eyes, hands, senses, passions? Jews have the same body and feelings as Christians.', show: 't.0' },
      { say: 'Prick us, we bleed. Tickle us, we laugh. Poison us, we die. The same responses.', show: 't.1' },
      { say: 'Then the last step: wrong us, and shall we not revenge? The same response to being wronged.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The argument', [quote('p', ['If you [[theta:prick us]], do we not [[theta:bleed]]?…', 'And if you [[bad:wrong us]], shall we not [[bad:revenge]]?']), text('a', 'Same **humanity**, so the same **revenge** → **A**', 'lg')], [
      { say: 'Step two. Each question has the obvious answer, yes. So the audience agrees, step by step, until the last one.', show: 'p' },
      { say: 'Jews share the same humanity as Christians, so when wronged they will seek revenge, as Christians do. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['He learned revenge from **Christian** example', 'Let us check. Later in the speech, Shylock says he learned revenge from the Christians’ own example.'],
    ['so his **revenge** answers their **prejudice**', 'So his revenge answers their prejudice. A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'He speaks of **revenge**, not forgiveness', 'Choice B is the trap. The speech begins by asking for understanding, but it ends in revenge, not forgiveness.'],
      ['C', 'He defends **Jewish** humanity', 'Choice C: he defends Jewish humanity, not a wish to convert.'],
      ['D', '*bleed*, *die* are **examples**, not illness', 'Choice D: bleed and die are examples, not illness.'],
    ],
  },
  yourTurn: {
    prompt: 'What does Shylock demand if Antonio cannot repay the loan?',
    choices: ['one of Antonio’s ships', 'a pound of Antonio’s flesh', 'Antonio’s house', 'Portia’s fortune'],
    answer: 1,
    working: 'The **bond**: a **pound of flesh**.',
    ask: 'What does Shylock demand if Antonio cannot repay the loan? A: one of Antonio’s ships. B: a pound of Antonio’s flesh. C: Antonio’s house. D: Portia’s fortune.',
    reveal: 'The answer is B, a pound of Antonio’s flesh. Portia later defeats the bond: it allows flesh, but no blood.',
  },
  sum: [
    ['Shylock’s questions build to **revenge**', 'Here is what to remember. Shylock’s questions build, step by step, to revenge.'],
    ['He claims a **shared humanity**', 'He claims a shared humanity with the Christians who mock him.'],
    ['Themes: **prejudice**, **mercy**, **revenge**', 'And the play’s themes include prejudice, mercy and revenge. For more on The Merchant of Venice, watch this lesson’s explainer video on Gradileo.'],
  ],
});
