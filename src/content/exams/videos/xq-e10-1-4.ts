import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 1.4 (point of view). An exam-style question we wrote, in the style of a Grade
// 10 reading test, on a short passage of our own. The answer is D: the narrator is outside the story and
// knows the private thoughts of three characters, which is third-person omniscient.

const LINES = ['Maya smiled as she handed in her test, sure she had aced it. Two rows behind her, Leo stared at question six and wished he had studied. At the front desk, Mr Park sighed; he already knew that question six had a mistake in it.'];

export default englishExam({
  lesson: 'e10-1-4',
  ...ours('a Grade 10 reading test', 'the passage is our own'),
  title: 'Which Point of View Is This Passage Told From?',
  thumbnailTitle: 'Point of View',
  subtitle: 'Who tells the story, and what they know, step by step',
  summary:
    'An exam-style question on point of view, solved one small step at a time: a short passage about a test moves from Maya to Leo to their teacher. We check the pronouns, see whose thoughts the narrator knows, and name the point of view.',
  intro: [
    'In this video, we solve an exam-style question about point of view. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, and the passage is our own.',
  ],
  passage: {
    lines: LINES,
    by: 'A short passage (our own)',
    say: ['First, read the passage. Maya smiled as she handed in her test, sure she had aced it. Two rows behind her, Leo stared at question six and wished he had studied. At the front desk, Mr Park sighed; he already knew that question six had a mistake in it.'],
  },
  question: {
    prompt: 'From which **point of view** is this passage told?',
    text: 'Read the passage. From which point of view is this passage told?',
    choices: ['first person', 'second person', 'third-person limited', 'third-person omniscient'],
    answer: 3,
    working: '*she*, *he*: third person. The narrator knows the **thoughts** of **three** characters: **omniscient**.',
    say: ['From which point of view is this passage told? A: first person. B: second person. C: third-person limited. D: third-person omniscient.'],
  },
  ask: [
    ['Who **tells** the story?', 'We need to know who tells the story.'],
    ['and **whose** thoughts can they see?', 'And whose thoughts the narrator can see.'],
  ],
  know: {
    title: 'Points of view',
    md: '**First person**: the narrator is **in** the story (*I*, *we*). **Second person**: *you*. **Third person** (*he*, *she*, *they*), told from **outside**: **limited** knows **one** character’s thoughts; **omniscient** knows **many** characters’ thoughts; **objective** reports only what can be **seen** and **heard**, no thoughts. An **unreliable** narrator cannot be fully trusted.',
    say: [
      'Here is the idea we need. In first person, the narrator is a character in the story, using I or we. Second person uses you.',
      'Third person uses he, she or they, told from outside. Third-person limited knows one character’s thoughts. Third-person omniscient knows many characters’ thoughts. And third-person objective reports only what can be seen and heard. An unreliable narrator is one we cannot fully trust.',
    ],
  },
  plan: [
    ['Check the **pronouns**', 'Here is the plan. First, check the pronouns.'],
    ['Count **whose thoughts** we see', 'Second, count whose thoughts we see.'],
    ['Name the **point of view**', 'Third, name the point of view.'],
  ],
  steps: [
    scene('Step 1: Pronouns', [quote('p', ['Maya smiled as [[theta:she]] handed in [[theta:her]] test… Leo stared… and wished [[theta:he]] had studied… Mr Park sighed; [[theta:he]] already knew…']), text('n', 'No *I* or *you*: a narrator **outside** the story → **third person**')], [
      { say: 'Step one. The pronouns are she, her and he. There is no I and no you. So the narrator is outside the story: third person.', show: ['p', 'n'] },
    ]),
    scene('Step 2: Whose thoughts?', [table('t', ['Character', 'Private thought'], [['Maya', '*sure she had **aced** it*'], ['Leo', '*wished he had **studied***'], ['Mr Park', '*already **knew** that question six had a mistake*']]), text('a', 'Three minds → **third-person omniscient** → **D**', 'lg')], [
      { say: 'Step two. Whose thoughts do we see? Maya is sure she aced it. Leo wishes he had studied. Mr Park already knows about the mistake.', show: ['t.0', 't.1', 't.2'] },
      { say: 'The narrator can see into three different minds. That is third-person omniscient. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['**Limited** would stay inside **one** mind', 'Let us check. A limited narrator would stay inside one mind, perhaps only Maya’s.'],
    ['This narrator **moves** between minds', 'This narrator moves between three minds. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Starts with **Maya**, but does not **stay** with her', 'Choice C is the trap. The passage starts with Maya, so it seems limited, but it moves on to Leo and Mr Park.'],
      ['A', 'No **I**: the narrator is not in the story', 'Choice A: there is no I.'],
      ['B', 'No **you**', 'Choice B: there is no you.'],
    ],
  },
  yourTurn: {
    prompt: 'A narrator says *“I am perfectly calm”*, then describes a crime in a wild, frantic rush. This narrator is most likely…',
    choices: ['omniscient', 'objective', 'second person', 'unreliable'],
    answer: 3,
    working: 'What the narrator **claims** clashes with **how** they tell it: **unreliable**.',
    ask: 'A narrator says, I am perfectly calm, then describes a crime in a wild, frantic rush. This narrator is most likely: A: omniscient. B: objective. C: second person. D: unreliable.',
    reveal: 'The answer is D, unreliable. What the narrator claims clashes with how they tell the story, so we cannot fully trust them.',
  },
  sum: [
    ['Check the **pronouns** first', 'Here is what to remember. Check the pronouns first.'],
    ['**Limited**: one mind · **Omniscient**: many minds', 'Third-person limited sees into one mind, and omniscient sees into many.'],
    ['**Objective**: no thoughts at all', 'And objective shows no thoughts at all. For more on point of view, watch this lesson’s explainer video on Gradileo.'],
  ],
});
