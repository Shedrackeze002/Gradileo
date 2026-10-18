import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { venn } from './lib/m302-1-figures.ts';

/** Dogs inside mammals, inside all animals. */
const places = venn({
  box: [-5.6, -3.8, 5.6, 4],
  universe: '\\text{Animals}',
  sets: [
    { key: 'Q', c: [0.2, -0.3], r: 3.3, title: '\\text{Mammals}', tone: 'opp', titlePos: [3.4, 3.25] },
    { key: 'P', c: [1.1, -1.1], r: 1.6, title: '\\text{Dogs}', tone: 'adj', titlePos: [1.1, 0.95] },
  ],
});

const video: Explainer = {
  id: 'm302-1-3',
  lessonId: 'm302-1-3',
  title: 'Conditional Statements, Part 1: If–Then Statements',
  thumbnailTitle: 'If–Then Statements',
  thumbnail: 'v',
  summary: 'A conditional statement "If p, then q" has a hypothesis p and a conclusion q. It is false only when p is true and q is false, and one counterexample shows that: 2 is a counterexample to "If a number is prime, then it is odd". A true statement as a Venn diagram, with p inside q. Part 2 forms the converse.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 1', title: 'If–Then Statements', subtitle: 'Hypothesis, conclusion and counterexample' }],
      lines: [
        { say: 'If an animal is a dog, then it is a mammal. Statements like this one appear in rules, contracts, computer code and mathematics.', show: 'title' },
        { say: 'Knowing when such a statement is true, and what you can conclude from it, is the heart of logical reasoning. In this video, you will name the parts of an if-then statement, decide when it is true, and show that it is false with a single example.' },
      ],
    },
    {
      chapter: 'Conditional statements',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conditional statement', md: 'A **conditional statement** has the form “If $p$, then $q$.” The part after “if”, $p$, is the **hypothesis**. The part after “then”, $q$, is the **conclusion**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{If } \\adj{p}, \\text{ then } \\opp{q}.'] },
        { kind: 'text', id: 'ex', size: 'md', md: 'If [[adj:an animal is a dog]], then [[opp:it is a mammal]].' },
      ],
      lines: [
        { say: 'A statement of the form, if p, then q, is called a conditional statement. The letters p and q stand for two smaller statements.', show: ['def', 'm.0'] },
        { say: 'The part after if, p, is called the hypothesis. The part after then, q, is called the conclusion.', focus: 'm.0' },
        { say: 'In our example, the hypothesis is: an animal is a dog. The conclusion is: it is a mammal.', show: 'ex' },
        { say: 'Every dog is a mammal, so this statement is true.' },
      ],
    },
    {
      chapter: 'When is it false?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'promise', size: 'md', md: '“If it rains, then I will bring an umbrella.”' },
        { kind: 'table', id: 't', head: ['It rains?', 'Umbrella?', 'Promise'], rows: [['yes', 'yes', 'kept'], ['yes', 'no', '**broken**'], ['no', 'yes or no', 'not broken']] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'False only one way', md: 'A conditional statement is false only when the hypothesis is true and the conclusion is false. An example of that case is a **counterexample**.' },
      ],
      lines: [
        { say: 'When is a conditional statement true? Think of it as a promise: if it rains, then I will bring an umbrella.', show: 'promise' },
        { say: 'If it rains and I bring an umbrella, the promise is kept.', show: 't.0', focus: 't.0' },
        { say: 'If it rains and I do not bring an umbrella, the promise is broken.', show: 't.1', focus: 't.1' },
        { say: 'And if it does not rain, the promise says nothing about what happens, so it is not broken, umbrella or not.', show: 't.2', focus: 't.2' },
        { say: 'In the same way, a conditional statement is false only when the hypothesis is true and the conclusion is false. An example of that case is called a counterexample, and one counterexample is enough to show that a statement is false.', show: 'key', focus: 't.1' },
      ],
    },
    {
      chapter: 'Is it true?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: '“If a number is prime, then it is odd.” Identify the hypothesis and the conclusion, and decide whether the statement is true.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['p: \\text{ a number is prime}', 'q: \\text{ it is odd}', '2 \\text{ is prime, and } 2 \\text{ is even}', '\\text{False: } 2 \\text{ is a counterexample.}'] },
      ],
      lines: [
        { say: 'Let’s test a statement. If a number is prime, then it is odd. Identify the hypothesis and the conclusion, and decide whether the statement is true.', show: 'p' },
        { say: 'The hypothesis, p, is: a number is prime. The conclusion, q, is: it is odd.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Three, five, seven and eleven are all prime and odd. But many examples that work do not prove a statement true. Look for a counterexample instead: a prime number that is not odd.', focus: 'm' },
        { say: 'Two is prime, because its only factors are one and two. And two is even.', show: 'm.2', focus: 'm.2' },
        { say: 'So the hypothesis is true and the conclusion is false. The statement is false, and two is a counterexample.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A true statement in a Venn diagram',
      layout: 'split',
      leftWidth: 560,
      left: [figure('v', [places])],
      right: [
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'A true statement “If $p$, then $q$”: everything that satisfies $p$ lies inside the set of things that satisfy $q$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{p} \\text{ inside } \\opp{q}'] },
      ],
      lines: [
        { say: 'A true conditional statement can be shown with a Venn diagram. The rectangle is all animals.', show: 'v.box' },
        { say: 'One circle holds all the mammals.', show: 'v.Q', focus: 'v.Q' },
        { say: 'Every dog is also a mammal, so the dogs circle sits inside the mammals circle.', show: 'v.P', focus: 'v.P' },
        { say: 'That is what a true statement, if p, then q, looks like: everything that satisfies p lies inside the set of things that satisfy q.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'A counterexample would be a point inside the p circle but outside the q circle. When p sits inside q, there is no such point.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not every example is a counterexample', md: 'A counterexample to “If $p$, then $q$” must make $p$ **true** and $q$ **false**. For “If a number is prime, then it is odd”:' },
        { kind: 'table', id: 't', head: ['Number', 'Prime?', 'Odd?', 'Counterexample?'], rows: [['$9$', 'no', 'yes', 'no'], ['$4$', 'no', 'no', 'no'], ['$2$', 'yes', 'no', '**yes**']] },
      ],
      lines: [
        { say: 'A common mistake is to think that any example that looks wrong is a counterexample. A counterexample must make the hypothesis true and the conclusion false.', show: 'oops' },
        { say: 'Nine is odd but not prime. The hypothesis is false, so nine says nothing about the statement. It is not a counterexample.', show: 't.0', focus: 't.0' },
        { say: 'Four is neither prime nor odd. Again the hypothesis is false, so four is not a counterexample either.', show: 't.1', focus: 't.1' },
        { say: 'Only a prime number that is not odd breaks the statement. Two is the one counterexample.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is a counterexample to “If a number is a multiple of 3, then it is odd”?',
          choices: ['$6$', '$9$', '$7$', '$4$'],
          answer: 0,
          working: '$6$ is a multiple of $3$ (the hypothesis is true) and $6$ is even (the conclusion is false).',
        },
      ],
      lines: [
        { say: 'Your turn. Which number is a counterexample to the statement: if a number is a multiple of three, then it is odd? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, six. Six is a multiple of three, so the hypothesis is true, and six is even, so the conclusion is false. Choice B, nine, is a multiple of three, but it is odd, so the statement holds for it. And choice D, four, is even, but it is not a multiple of three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In “If $p$, then $q$”, $p$ is the hypothesis and $q$ is the conclusion.', 'It is false only when $p$ is true and $q$ is false.', 'One counterexample shows that a statement is false; examples that work do not prove it true.'] }],
      lines: [
        { say: 'Let’s sum up. In the statement if p, then q, p is the hypothesis and q is the conclusion.', show: 'sum.0' },
        { say: 'The statement is false only when p is true and q is false.', show: 'sum.1' },
        { say: 'One counterexample shows that a statement is false, but examples that work do not prove it true. In part two, we switch the hypothesis and the conclusion, to form the converse. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
