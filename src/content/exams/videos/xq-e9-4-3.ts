import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 4.3 (sound and faulty reasoning). An exam-style question we wrote, in the
// style of a Grade 9 reading test, on a short letter we wrote ourselves. The answer is B: the writer
// claims one small step will lead, link by link, to disaster, which is the slippery slope fallacy.

const LETTER = ['If the school lets students use phones at lunch, they will soon use them in class. Then no one will listen to teachers, marks will fall, and before long the whole school will fail. We must ban phones at lunch.'];

export default englishExam({
  lesson: 'e9-4-3',
  ...ours('a Grade 9 reading test', 'the letter is our own'),
  title: 'Which Fallacy Is in This Letter?',
  thumbnailTitle: 'The Slippery Slope',
  subtitle: 'Spotting faulty reasoning, step by step',
  summary:
    'An exam-style question on faulty reasoning, solved one small step at a time: a letter to a school newspaper argues that phones at lunch will end with the whole school failing. We trace the chain of claims, test each link, and name the fallacy.',
  intro: [
    'In this video, we solve an exam-style question about faulty reasoning. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, and the letter is our own.',
  ],
  passage: {
    lines: LETTER,
    by: 'A letter to a school newspaper (our own)',
    say: ['First, read the letter. If the school lets students use phones at lunch, they will soon use them in class. Then no one will listen to teachers, marks will fall, and before long the whole school will fail. We must ban phones at lunch.'],
  },
  question: {
    prompt: 'Which **fallacy** does the writer use?',
    text: 'Read the letter to the school newspaper. Which fallacy does the writer use?',
    choices: ['a straw man', 'a slippery slope', 'a bandwagon appeal', 'an attack on the person'],
    answer: 1,
    working: 'One small step → a **chain** of worse and worse results → **disaster**, with no evidence for each link.',
    say: ['Which fallacy does the writer use? A: a straw man. B: a slippery slope. C: a bandwagon appeal. D: an attack on the person.'],
  },
  ask: [
    ['The writer predicts a **chain** of events', 'The writer predicts a chain of events.'],
    ['Which **fallacy** is that?', 'We need to name the fallacy.'],
  ],
  know: {
    title: 'Reasoning and fallacies',
    md: '**Deductive** reasoning moves from a general rule to a **certain** conclusion; **inductive** reasoning moves from examples to a **likely** one. A **fallacy** is faulty reasoning. **Slippery slope**: one step will lead, link by link, to **disaster**. **Straw man**: **twisting** an opponent’s view into a weaker one. **Bandwagon**: *everyone* does it. **Attack on the person**: criticising the **speaker**, not the argument.',
    say: [
      'Here is the idea we need. Deductive reasoning moves from a general rule to a certain conclusion, and inductive reasoning moves from examples to a likely one. A fallacy is faulty reasoning.',
      'A slippery slope claims one step will lead, link by link, to disaster. A straw man twists an opponent’s view into a weaker one. A bandwagon appeal says everyone does it. And an attack on the person criticises the speaker instead of the argument.',
    ],
  },
  plan: [
    ['Trace the **chain**', 'Here is the plan. First, trace the chain of claims.'],
    ['Test each **link**', 'Second, test each link.'],
    ['Name the **fallacy**', 'Third, name the fallacy.'],
  ],
  steps: [
    scene('Step 1: The chain', [table('t', ['Link', 'Claim', 'Evidence?'], [['1', 'phones at **lunch**', 'the proposal'], ['2', '→ phones in **class**', '[[bad:none given]]'], ['3', '→ no one **listens**, marks **fall**', '[[bad:none given]]'], ['4', '→ the whole school **fails**', '[[bad:none given]]']])], [
      { say: 'Step one. Trace the chain. It starts with phones at lunch, which is the actual proposal.', show: 't.0' },
      { say: 'Then phones in class, then no one listening and marks falling, and then the whole school failing.', show: ['t.1', 't.2', 't.3'] },
      { say: 'Notice that no evidence is given for any of these links. Each one is simply assumed.', focus: ['t.1', 't.2', 't.3'] },
    ]),
    scene('Step 2: Name it', [quote('p', ['…they will [[bad:soon]] use them in class. [[bad:Then]] no one will listen… [[bad:before long]] the whole school will fail.']), text('a', 'Small step → unproven chain → disaster: **slippery slope** → **B**', 'lg')], [
      { say: 'Step two. Soon, then, before long: words that push us down the chain. A small step, then an unproven chain, then disaster. That is a slippery slope. The answer is B.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Could phones at lunch **stay** at lunch?', 'Let us check. Could phones at lunch simply stay at lunch? The writer never shows why not.'],
    ['The links are **assumed**, not proved', 'The links are assumed, not proved. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Nobody’s **view** is twisted', 'Choice A is the trap. The writer argues against an idea, but does not twist anyone’s view.'],
      ['C', 'No claim that **everyone** agrees', 'Choice C: there is no claim that everyone agrees.'],
      ['D', 'No **person** is attacked', 'Choice D: no person is attacked.'],
    ],
  },
  yourTurn: {
    prompt: 'Ms Diaz suggests a **longer break**. Her opponent replies: *“Ms Diaz wants students to do no work at all.”* Which fallacy is this?',
    choices: ['a slippery slope', 'a bandwagon appeal', 'a straw man', 'deductive reasoning'],
    answer: 2,
    working: 'Her view is **twisted** into a weaker one: a **straw man**.',
    ask: 'Ms Diaz suggests a longer break. Her opponent replies: Ms Diaz wants students to do no work at all. Which fallacy is this? A: a slippery slope. B: a bandwagon appeal. C: a straw man. D: deductive reasoning.',
    reveal: 'The answer is C, a straw man. A longer break is twisted into no work at all, which is much easier to attack.',
  },
  sum: [
    ['**Slippery slope**: one step → disaster, with no proof', 'Here is what to remember. A slippery slope claims one step leads to disaster, with no proof.'],
    ['**Straw man**: twisting the other view', 'A straw man twists the other side’s view.'],
    ['Test every **link** for evidence', 'And test every link of an argument for evidence. For more on sound and faulty reasoning, watch this lesson’s explainer video on Gradileo.'],
  ],
});
