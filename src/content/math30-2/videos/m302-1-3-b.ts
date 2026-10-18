import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { mark, venn } from './lib/m302-1-figures.ts';

/** Dogs inside mammals, inside all animals, with a cat: a mammal that is not a dog. */
const places = venn({
  box: [-5.6, -3.8, 5.6, 4],
  universe: '\\text{Animals}',
  sets: [
    { key: 'Q', c: [0.2, -0.3], r: 3.3, title: '\\text{Mammals}', tone: 'opp', titlePos: [3.4, 3.25] },
    { key: 'P', c: [1.1, -1.1], r: 1.6, title: '\\text{Dogs}', tone: 'adj', titlePos: [1.1, 0.95] },
  ],
});

const video: Explainer = {
  id: 'm302-1-3-b',
  lessonId: 'm302-1-3',
  title: 'Conditional Statements, Part 2: The Converse',
  thumbnailTitle: 'The Converse',
  thumbnail: 'v',
  summary: 'The converse of "If p, then q" is "If q, then p". "If an animal is a dog, then it is a mammal" is true, but its converse is false: a cat is a counterexample. Also: if x = 3, then x² = 9, whose converse fails for x = −3. Part 3 forms the inverse and the contrapositive.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 2', title: 'The Converse', subtitle: 'Switching the hypothesis and the conclusion' }],
      lines: [
        { say: 'Every square is a rectangle. But is every rectangle a square? Switching the two parts of a statement can change whether it is true.', show: 'title' },
        { say: 'In this video, you will write the converse of a conditional statement, and test whether the converse is true.' },
      ],
    },
    {
      chapter: 'The converse',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Converse', md: 'The **converse** of “If $p$, then $q$” is “If $q$, then $p$.” The hypothesis and the conclusion are switched.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Statement: If } \\adj{p}, \\text{ then } \\opp{q}.', '\\text{Converse: If } \\opp{q}, \\text{ then } \\adj{p}.'] },
      ],
      lines: [
        { say: 'Start with a conditional statement: if p, then q.', show: 'm.0', focus: 'm.0' },
        { say: 'Its converse switches the hypothesis and the conclusion: if q, then p. What was the conclusion becomes the hypothesis, and what was the hypothesis becomes the conclusion.', show: ['def', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Dogs and mammals',
      layout: 'split',
      leftWidth: 600,
      left: [figure('v', [places, mark({ id: 'rd', at: [-1.8, 1.05], tex: '\\text{cat}', tone: 'theta', place: 'below' })])],
      right: [
        { kind: 'text', id: 's', size: 'md', align: 'left', md: 'Statement: If an animal is a [[adj:dog]], then it is a [[opp:mammal]]. [[good:True.]]' },
        { kind: 'text', id: 'c', size: 'md', align: 'left', md: 'Converse: If an animal is a [[opp:mammal]], then it is a [[adj:dog]]. [[bad:False.]]' },
      ],
      lines: [
        { say: 'The statement, if an animal is a dog, then it is a mammal, is true. In the diagram, the dogs circle sits inside the mammals circle.', show: ['v.box', 'v.Q', 'v.P', 's'] },
        { say: 'Switch the parts to write its converse: if an animal is a mammal, then it is a dog.', show: 'c' },
        { say: 'Is the converse true? Look for a counterexample: an animal that is a mammal, but not a dog.', focus: 'v.Q' },
        { say: 'A cat is one. A cat is inside the mammals circle, but outside the dogs circle. So the converse is false.', show: 'v.rd', focus: 'v.rd' },
        { say: 'The diagram shows why. The dogs circle is inside the mammals circle, but the mammals circle is not inside the dogs circle: there is room among the mammals outside the dogs.' },
      ],
    },
    {
      chapter: 'An example with numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{If } x = 3, \\text{ then } x^2 = 9. \\quad \\good{\\text{True}}', '\\text{If } x^2 = 9, \\text{ then } x = 3. \\quad \\bad{\\text{False}}', '(-3)^2 = 9, \\text{ but } {-3} \\ne 3'] }],
      lines: [
        { say: 'Here is an example with numbers. If x equals three, then x squared equals nine. That is true: three times three is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Its converse is: if x squared equals nine, then x equals three.', show: 'm.1', focus: 'm.1' },
        { say: 'Look for a counterexample: a number whose square is nine, but which is not three. Negative three works: negative three times negative three is also nine.', show: 'm.2', focus: 'm.2' },
        { say: 'So the converse is false, even though the original statement is true.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A true statement can have a false converse', md: 'Never assume a converse is true just because the statement is. Test it separately by looking for a counterexample.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{If a number is a multiple of 4, then it is even.} \\quad \\good{\\text{True}}', '\\text{If a number is even, then it is a multiple of 4.} \\quad \\bad{\\text{False: } 6}'] },
      ],
      lines: [
        { say: 'A common mistake is to assume that a converse is true just because the original statement is true. Each one must be tested on its own.', show: 'oops' },
        { say: 'For example, if a number is a multiple of four, then it is even. That is true.', show: 'm.0', focus: 'm.0' },
        { say: 'But the converse, if a number is even, then it is a multiple of four, is false. Six is even, and six is not a multiple of four.', show: 'm.1', focus: 'm.1' },
        { say: 'So whenever you meet a converse, test it separately, by looking for a counterexample.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The statement “If a number is a multiple of 6, then it is a multiple of 3” is true. Which number is a counterexample to its **converse**?',
          choices: ['$12$', '$9$', '$6$', '$4$'],
          answer: 1,
          working: 'The converse is “If a number is a multiple of 3, then it is a multiple of 6.” $9$ is a multiple of $3$ but not of $6$.',
        },
      ],
      lines: [
        { say: 'Your turn. The statement, if a number is a multiple of six, then it is a multiple of three, is true. Which number is a counterexample to its converse? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, nine. The converse is: if a number is a multiple of three, then it is a multiple of six. Nine is a multiple of three, but not of six, so it breaks the converse. Choice D, four, is not a multiple of three, so it does not test the converse at all.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The converse of “If $p$, then $q$” is “If $q$, then $p$.”', 'A true statement can have a false converse: test the converse separately.', 'In a Venn diagram, $p$ inside $q$ does not put $q$ inside $p$.'] }],
      lines: [
        { say: 'Let’s sum up. The converse of if p, then q, is if q, then p.', show: 'sum.0' },
        { say: 'A true statement can have a false converse, so always test the converse separately, with a counterexample.', show: 'sum.1' },
        { say: 'In a Venn diagram, p inside q does not put q inside p. In part three, we negate the parts, to form the inverse and the contrapositive. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
