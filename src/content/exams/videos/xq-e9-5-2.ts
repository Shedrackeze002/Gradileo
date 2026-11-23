import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 5.2 (misinformation and checking sources). An exam-style question we wrote, in
// the style of a Grade 9 media test, on an invented social media post. The answer is D: leave the post
// and read laterally, checking what trusted sources say about the claim and about who posted it.

const POST = ['**BREAKING!!!** Scientists CONFIRM that eating chocolate cures colds in 24 hours!!! Doctors don’t want you to know this. SHARE before they delete it!!!<br>*Posted by HealthTruthNow · 1.2 million shares*'];

export default englishExam({
  lesson: 'e9-5-2',
  ...ours('a Grade 9 media test', 'the post is invented'),
  title: 'How Should You Check This Viral Post?',
  thumbnailTitle: 'Lateral Reading',
  subtitle: 'Checking a claim, step by step',
  summary:
    'An exam-style media question, solved one small step at a time: a viral post claims chocolate cures colds. We spot the warning signs, learn what lateral reading means, and choose the best way to check the claim.',
  intro: [
    'In this video, we solve an exam-style question about checking a claim online. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 media test, and the post is invented.',
  ],
  passage: {
    lines: POST,
    by: 'An invented social media post',
    say: ['First, read the post. Breaking! Scientists confirm that eating chocolate cures colds in twenty-four hours! Doctors don’t want you to know this. Share before they delete it! It was posted by an account called Health Truth Now, and it has one point two million shares.'],
  },
  question: {
    prompt: 'What is the **best first step** to check whether this claim is true?',
    text: 'Read the social media post. What is the best first step to check whether this claim is true?',
    choices: [
      'Read the post again, more carefully.',
      'Trust it, because 1.2 million people shared it.',
      'Look at the comments under the post.',
      'Open new tabs and search what trusted sources say about the claim and about HealthTruthNow.',
    ],
    answer: 3,
    working: '**Lateral reading**: leave the post, check the claim and the **source** elsewhere.',
    say: [
      'What is the best first step to check whether this claim is true?',
      'A: Read the post again, more carefully. B: Trust it, because one point two million people shared it. C: Look at the comments under the post. D: Open new tabs and search what trusted sources say about the claim and about Health Truth Now.',
    ],
  },
  ask: [
    ['We need to **check** a claim', 'We need to check whether the claim is true.'],
    ['What is the **best first step**?', 'And choose the best first step.'],
  ],
  know: {
    title: 'Misinformation and lateral reading',
    md: '**Misinformation** is false or misleading information. Warning signs: **capital letters** and **!!!**, **urgency** (*share before they delete it*), **secrets** (*they don’t want you to know*), **no named** scientist or study. **Lateral reading** means leaving the page and opening **new tabs** to see what **trusted sources** say about the claim and about **who** posted it.',
    say: [
      'Here is the idea we need. Misinformation is false or misleading information. Warning signs include capital letters and lots of exclamation marks, urgency, claims of secrets, and no named scientist or study.',
      'Lateral reading means leaving the page and opening new tabs, to see what trusted sources say about the claim and about who posted it.',
    ],
  },
  plan: [
    ['Spot the **warning signs**', 'Here is the plan. First, spot the warning signs.'],
    ['Decide **where** to check', 'Second, decide where to check.'],
    ['Choose the **best** step', 'Third, choose the best step.'],
  ],
  steps: [
    scene('Step 1: Warning signs', [table('t', ['In the post', 'Warning sign'], [['**BREAKING!!!**, **CONFIRM**', '[[bad:capitals and !!! to excite]]'], ['*Scientists*', '[[bad:no named scientist or study]]'], ['*Doctors don’t want you to know*', '[[bad:a "secret" to build distrust]]'], ['*SHARE before they delete it*', '[[bad:urgency: share before thinking]]']])], [
      { say: 'Step one. Pause and spot the warning signs. Capital letters and exclamation marks to excite us.', show: 't.0', wait: 2 },
      { say: 'Scientists, but no named scientist or study.', show: 't.1' },
      { say: 'A secret that doctors are hiding, and urgency: share before they delete it.', show: ['t.2', 't.3'] },
    ]),
    scene('Step 2: Read laterally', [text('n', 'The post **cannot** check itself: reading it again only repeats its claims.'), text('a', 'Leave it: check **trusted sources** and **who** posted it → **D**', 'lg')], [
      { say: 'Step two. The post cannot check itself. Reading it again only repeats its claims.', show: 'n' },
      { say: 'So we leave it, open new tabs, and see what trusted sources say about the claim and about Health Truth Now. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Health sites and fact-checkers **name** their evidence', 'Let us check. Trusted health sites and fact-checkers name their evidence.'],
    ['so they can **confirm** or **debunk** it', 'So they can confirm or debunk the claim. D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', '**Popular** is not the same as **true**', 'Choice B is the trap. A huge number of shares feels convincing, but popular is not the same as true.'],
      ['A', 'Rereading stays **on the page**', 'Choice A: rereading keeps us on the page.'],
      ['C', 'Comments are **opinions**, not evidence', 'Choice C: comments are opinions, not evidence.'],
    ],
  },
  yourTurn: {
    prompt: 'Which headline is most likely to be **clickbait**?',
    choices: [
      'Council approves new cycle lanes on High Street',
      'You WON’T BELIEVE what this cat did next!!!',
      'Study finds teens sleep less during exam weeks',
      'Library extends weekend opening hours',
    ],
    answer: 1,
    working: 'Capitals, **!!!**, and a **teaser** with no facts: **clickbait**.',
    ask: 'Which headline is most likely to be clickbait? A: Council approves new cycle lanes on High Street. B: You won’t believe what this cat did next! C: Study finds teens sleep less during exam weeks. D: Library extends weekend opening hours.',
    reveal: 'The answer is B. It uses capitals and exclamation marks, and teases without giving any facts, just to make us click.',
  },
  sum: [
    ['Watch for **warning signs**: capitals, urgency, secrets', 'Here is what to remember. Watch for warning signs like capitals, urgency and secrets.'],
    ['**Lateral reading**: leave the page and check elsewhere', 'Lateral reading means leaving the page and checking elsewhere.'],
    ['Check the **claim** and **who** posted it', 'Check both the claim and who posted it. For more on misinformation and checking sources, watch this lesson’s explainer video on Gradileo.'],
  ],
});
