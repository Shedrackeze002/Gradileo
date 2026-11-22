import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 4.4 (evaluating arguments). An exam-style question we wrote, in the style of a
// Grade 11 reading test. The answer is C: assuming that because one thing came after another, the first
// caused it, is the post hoc fallacy.

const ARG = ['“Last week I wore my lucky socks, and our team won. So my socks made us win, and I’m wearing them every game from now on.”'];

export default englishExam({
  lesson: 'e11-4-4',
  ...ours('a Grade 11 reading test', 'the argument is our own'),
  title: 'Which Fallacy Is the “Lucky Socks” Argument?',
  thumbnailTitle: 'Post Hoc Fallacy',
  subtitle: 'Evaluating arguments, step by step',
  summary:
    'An exam-style question on faulty reasoning, solved one small step at a time: a fan believes their lucky socks won the game. We separate “after” from “because”, compare four subtle fallacies, and name the one in the argument.',
  intro: [
    'In this video, we solve an exam-style question about evaluating arguments. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, and the argument is our own.',
  ],
  passage: {
    lines: ARG,
    by: 'A fan’s argument (our own)',
    say: ['First, read the argument. Last week I wore my lucky socks, and our team won. So my socks made us win, and I’m wearing them every game from now on.'],
  },
  question: {
    prompt: 'Which **fallacy** does this argument contain?',
    text: 'Read the argument. Which fallacy does this argument contain?',
    choices: ['circular reasoning', 'a red herring', 'post hoc (false cause)', 'a false analogy'],
    answer: 2,
    working: 'The win came **after** the socks, so the speaker assumes the socks **caused** it: **post hoc**.',
    say: ['Which fallacy does this argument contain? A: circular reasoning. B: a red herring. C: post hoc, or false cause. D: a false analogy.'],
  },
  ask: [
    ['Something happened **after** the socks', 'The win happened after the socks were worn.'],
    ['Does that mean the socks **caused** it?', 'We need to name the fallacy in thinking that.'],
  ],
  know: {
    title: 'Subtler fallacies',
    md: '**Post hoc** (false cause): *B came after A, so A caused B.* **Circular reasoning**: the conclusion is just the premise **repeated**. **Red herring**: a **distraction** from the real issue. **False analogy**: comparing two things that are **not alike** in the way that matters. **Appeal to tradition**: *we have always done it this way.* Good evidence is **relevant**, **sufficient** and **representative**.',
    say: [
      'Here is the idea we need. Post hoc, or false cause, says B came after A, so A caused B. Circular reasoning simply repeats its premise as its conclusion. A red herring distracts from the real issue. A false analogy compares two things that are not alike in the way that matters. And an appeal to tradition says, we have always done it this way.',
      'Good evidence is relevant, sufficient and representative.',
    ],
  },
  plan: [
    ['Find the **link** the speaker makes', 'Here is the plan. First, find the link the speaker makes.'],
    ['Test the **evidence**', 'Second, test the evidence.'],
    ['Name the **fallacy**', 'Third, name the fallacy.'],
  ],
  steps: [
    scene('Step 1: The link', [quote('p', ['I wore my lucky socks, [[theta:and]] our team won. [[bad:So my socks made us win]]…']), table('t', ['What happened', 'What the speaker assumes'], [['socks, **then** a win', '[[bad:socks **caused** the win]]']])], [
      { say: 'Step one. Two things happened: the socks were worn, and then the team won. The speaker jumps from then to because: the socks made us win.', show: ['p', 't.0'] },
    ]),
    scene('Step 2: Test and name', [table('e', ['Test', 'Result'], [['**Relevant**? Can socks affect a game?', '[[bad:✗ no mechanism]]'], ['**Sufficient**? How many games?', '[[bad:✗ only one]]']]), text('a', '*After*, so *because*: **post hoc** → **C**', 'lg')], [
      { say: 'Step two. Test the evidence. Socks have no way to affect how a team plays. And one game is far too little evidence.', show: ['e.0', 'e.1'] },
      { say: 'Assuming that because one thing came after another, the first caused it, is the post hoc fallacy. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['*Post hoc* is Latin for **after this**', 'Let us check. Post hoc is Latin for after this. The full phrase means, after this, therefore because of this.'],
    ['That is the argument **exactly**', 'That is the argument exactly. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'It **reaches** a conclusion; it does not just **repeat** one', 'Choice A is the trap. The argument is weak, but it does not just repeat its premise. It jumps from one event to a cause.'],
      ['B', 'No **distraction** from the issue', 'Choice B: there is no distraction from the issue.'],
      ['D', 'No **comparison** between two things', 'Choice D: there is no comparison between two things.'],
    ],
  },
  yourTurn: {
    prompt: '*“This book is the best, because **no book is better**.”* Which fallacy is this?',
    choices: ['post hoc', 'a red herring', 'appeal to tradition', 'circular reasoning'],
    answer: 3,
    working: '*No book is better* just **restates** *the best*: **circular**.',
    ask: 'This book is the best, because no book is better. Which fallacy is this? A: post hoc. B: a red herring. C: appeal to tradition. D: circular reasoning.',
    reveal: 'The answer is D, circular reasoning. No book is better just restates, it is the best, so it proves nothing.',
  },
  sum: [
    ['**Post hoc**: after ≠ because', 'Here is what to remember. Post hoc confuses after with because.'],
    ['**Circular**: the conclusion repeats the premise', 'Circular reasoning repeats its premise as its conclusion.'],
    ['Test evidence: **relevant**, **sufficient**, **representative**', 'And test whether evidence is relevant, sufficient and representative. For more on evaluating arguments, watch this lesson’s explainer video on Gradileo.'],
  ],
});
