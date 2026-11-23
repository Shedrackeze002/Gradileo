import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 1.3 (narrators). An exam-style question we wrote, in the style of a Grade 8
// reading test, on the opening of Edgar Allan Poe's "The Tell-Tale Heart" (1843), which is in the
// public domain. The answer is D: a first-person narrator who insists he is sane while sounding wildly
// agitated, so the reader cannot trust him.

const PASSAGE = [
  'True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth.',
];

export default englishExam({
  lesson: 'e8-1-3',
  ...ours('a Grade 8 reading test', 'the passage is from Edgar Allan Poe’s “The Tell-Tale Heart” (1843), in the public domain'),
  title: 'What Kind of Narrator Tells “The Tell-Tale Heart”?',
  thumbnailTitle: 'Unreliable Narrators',
  subtitle: 'Point of view and reliability, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time, on the opening of Edgar Allan Poe’s “The Tell-Tale Heart”. We name the point of view from the pronouns, then look closely at what the narrator claims and how he sounds, and decide whether we can trust him.',
  intro: [
    'In this video, we solve an exam-style reading question about narrators. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test, on the opening of Edgar Allan Poe’s The Tell-Tale Heart, which is in the public domain.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'Edgar Allan Poe, “The Tell-Tale Heart” (1843)',
    say: ['First, read the opening of the story. True! Nervous, very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses, not destroyed, not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth.'],
  },
  question: {
    prompt: 'Which best describes the **narrator** of this passage?',
    text: 'Read the opening of “The Tell-Tale Heart”. Which best describes the narrator of this passage?',
    choices: [
      'a third-person omniscient narrator who knows every character’s thoughts',
      'a calm, reliable first-person narrator',
      'a third-person limited narrator following one character',
      'an unreliable first-person narrator whose claims we should doubt',
    ],
    answer: 3,
    working: '**I**, **my** → first person. Insisting he is not **mad** while claiming to hear **all things in heaven and earth** → **unreliable**.',
    say: [
      'Which best describes the narrator of this passage?',
      'A: a third-person omniscient narrator who knows every character’s thoughts. B: a calm, reliable first-person narrator. C: a third-person limited narrator following one character. D: an unreliable first-person narrator whose claims we should doubt.',
    ],
  },
  ask: [
    ['Two things to judge: **point of view** and **reliability**', 'We need to judge two things: the point of view, and whether the narrator is reliable.'],
    ['Which choice gets **both** right?', 'The answer must get both right.'],
  ],
  know: {
    title: 'Narrators and reliability',
    md: '**First person**: the narrator is a character (*I*, *me*). **Third-person limited**: *he/she*, inside **one** character’s head. **Omniscient**: *he/she*, knows **everyone’s** thoughts. An **unreliable** narrator cannot be fully **trusted**: they may be lying, confused, or blind to their own faults.',
    say: [
      'Here is the idea we need. A first-person narrator is a character in the story, who says I and me. A third-person limited narrator uses he or she, and stays inside one character’s head. An omniscient narrator knows everyone’s thoughts.',
      'An unreliable narrator is one we cannot fully trust. They may be lying, confused, or blind to their own faults.',
    ],
  },
  plan: [
    ['Check the **pronouns**', 'Here is the plan. First, check the pronouns.'],
    ['Compare what he **claims** with how he **sounds**', 'Second, compare what the narrator claims with how he sounds.'],
  ],
  steps: [
    scene('Step 1: The pronouns', [quote('p', ['…nervous [[theta:I]] had been and am; but why will you say that [[theta:I]] am mad? The disease had sharpened [[theta:my]] senses… [[theta:I]] heard all things…']), text('n', '**I**, **my** → **first person**: rules out A and C')], [
      { say: 'Step one. Pause and look at the pronouns.', show: 'p', wait: 3 },
      { say: 'I and my. The narrator is a character telling his own story. That is first person, which rules out A and C.', show: 'n' },
    ]),
    scene('Step 2: Can we trust him?', [table('t', ['He claims', 'But he sounds…'], [['he is **not mad**', '[[bad:dashes, repetition: “very, very dreadfully”]]'], ['his senses are **sharper**', '[[bad:hears “all things in the heaven and in the earth”]]'], ['he is only **nervous**', '[[bad:he admits a “disease”]]']]), text('a', 'First person + not trustworthy → **D**')], [
      { say: 'Step two. He insists he is not mad. But the dashes and the repetition, very, very dreadfully, make him sound frantic.', show: 't.0' },
      { say: 'He claims he can hear all things in heaven and earth. No sane person could.', show: 't.1' },
      { say: 'And he admits to a disease. Everything he says makes us doubt him. So he is unreliable, and the answer is D.', show: ['t.2', 'a'] },
    ]),
  ],
  check: [
    ['B is **first person**, but he is not **calm**', 'Let us check. B gets the first person right, but he is anything but calm.'],
    ['The **gap** between his claims and his voice makes him unreliable', 'The gap between his claims and his voice is what makes him unreliable. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Right **person**, wrong **reliability**', 'Choice B is the trap. It gets the first person right, but believes his claim that he is sane.'],
      ['A', 'He uses **I**, not *he* or *she*', 'Choice A: he uses I, so it is not third person.'],
      ['C', 'Also **third** person', 'Choice C is third person too.'],
    ],
  },
  yourTurn: {
    prompt: '*Maya stared at the letter. She wondered whether her brother would ever forgive her.* The story stays with Maya’s thoughts only. Which narrator is this?',
    choices: ['first person', 'second person', 'third-person limited', 'omniscient'],
    answer: 2,
    working: '*She*, and **only Maya’s** thoughts → third-person limited.',
    ask: 'Maya stared at the letter. She wondered whether her brother would ever forgive her. The story stays with Maya’s thoughts only. Which narrator is this? A: first person. B: second person. C: third-person limited. D: omniscient.',
    reveal: 'The answer is C, third-person limited. The narrator uses she, and only tells us what Maya thinks.',
  },
  sum: [
    ['**Pronouns** tell you first or third person', 'Here is what to remember. The pronouns tell you whether the narrator is first or third person.'],
    ['**Limited** = one mind · **omniscient** = every mind', 'Limited means one character’s mind, and omniscient means every mind.'],
    ['An **unreliable** narrator’s claims clash with the **clues**', 'An unreliable narrator’s claims clash with the clues around them. For more on narrators, watch this lesson’s explainer video on Gradileo.'],
  ],
});
