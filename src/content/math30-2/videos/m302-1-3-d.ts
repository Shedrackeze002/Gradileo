import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const h = 2 * Math.sqrt(3);
const equilateral = triangle({ A: [0, 0], B: [4, 0], C: [2, h], ticks: { AB: 1, BC: 1, CA: 1 }, angles: { A: '60^\\circ', B: '60^\\circ', C: '60^\\circ' } });

const video: Explainer = {
  id: 'm302-1-3-d',
  lessonId: 'm302-1-3',
  title: 'Conditional Statements, Part 4: Biconditional Statements',
  thumbnailTitle: 'Biconditional Statements',
  thumbnail: 'tri',
  summary: 'When a conditional statement and its converse are both true, they combine into a biconditional, "p if and only if q": a triangle has three equal sides if and only if it has three equal angles. "A number is even if and only if it is divisible by 4" is false, because 6 is a counterexample to one direction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 4', title: 'Biconditional Statements', subtitle: '“If and only if”' }],
      lines: [
        { say: 'Some statements work in both directions. A triangle with three equal sides has three equal angles, and a triangle with three equal angles has three equal sides.', show: 'title' },
        { say: 'In this video, you will combine a statement and its converse into one biconditional statement, and test whether a biconditional is true.' },
      ],
    },
    {
      chapter: 'If and only if',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Biconditional statement', md: 'When a conditional statement and its converse are both true, they can be combined into a **biconditional** statement: “$p$ if and only if $q$.”' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{If } \\adj{p}, \\text{ then } \\opp{q}. \\quad \\good{\\text{True}}', '\\text{If } \\opp{q}, \\text{ then } \\adj{p}. \\quad \\good{\\text{True}}', '\\adj{p} \\text{ if and only if } \\opp{q}'] },
      ],
      lines: [
        { say: 'Suppose a conditional statement, if p, then q, is true.', show: 'm.0', focus: 'm.0' },
        { say: 'And suppose its converse, if q, then p, is true as well.', show: 'm.1', focus: 'm.1' },
        { say: 'Then the two can be combined into one statement: p if and only if q. This is called a biconditional statement.', show: ['def', 'm.2'], focus: 'm.2' },
        { say: 'The words if and only if carry both directions. P if q gives one direction, and p only if q gives the other. So a biconditional says that p and q are always true together, or false together.' },
      ],
    },
    {
      chapter: 'A true biconditional',
      layout: 'split',
      leftWidth: 480,
      left: [figure('tri', [equilateral])],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Can “If a triangle has three equal sides, then it has three equal angles” be written as a true biconditional?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Statement: } \\good{\\text{true}}', '\\text{Converse: } \\good{\\text{true}}'] },
        { kind: 'text', id: 'a', size: 'md', align: 'left', md: 'A triangle has three equal sides **if and only if** it has three equal angles.' },
      ],
      lines: [
        { say: 'Can this statement be written as a true biconditional? If a triangle has three equal sides, then it has three equal angles.', show: 'p' },
        { say: 'First, the statement itself. A triangle with three equal sides is called equilateral, and each of its angles is sixty degrees. So the statement is true.', show: ['tri.shape', 'tri.tAB', 'tri.tBC', 'tri.tCA', 'tri.aA', 'tri.aB', 'tri.aC', 'm.0'], focus: 'm.0' },
        { say: 'Next, the converse: if a triangle has three equal angles, then it has three equal sides. That is also true. Equal angles sit opposite equal sides.', show: 'm.1', focus: 'm.1' },
        { say: 'Both directions are true, so they combine into a true biconditional: a triangle has three equal sides if and only if it has three equal angles.', show: 'a' },
      ],
    },
    {
      chapter: 'A false biconditional',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Is “A number is even if and only if it is divisible by 4” true?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{If divisible by 4, then even.} \\quad \\good{\\text{True}}', '\\text{If even, then divisible by 4.} \\quad \\bad{\\text{False: } 6}', '\\text{The biconditional is false.}'] },
      ],
      lines: [
        { say: 'Now test a biconditional: a number is even if and only if it is divisible by four. Split it into its two directions.', show: 'p' },
        { say: 'If a number is divisible by four, then it is even. That is true: four, eight, twelve and every other multiple of four is even.', show: 'm.0', focus: 'm.0' },
        { say: 'If a number is even, then it is divisible by four. That is false. Six is even, but six is not divisible by four.', show: 'm.1', focus: 'm.1' },
        { say: 'One direction has a counterexample, so the biconditional is false.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Definitions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A good definition works both ways', md: 'A definition can always be written as a true biconditional.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{An angle is a right angle if and only if it measures } 90^\\circ.', '\\text{A number is even if and only if it is divisible by } 2.'] },
      ],
      lines: [
        { say: 'Good definitions in mathematics work in both directions, so they can always be written as true biconditionals.', show: 'tip' },
        { say: 'An angle is a right angle if and only if it measures ninety degrees. Every right angle measures ninety degrees, and every ninety-degree angle is a right angle.', show: 'm.0', focus: 'm.0' },
        { say: 'And a number is even if and only if it is divisible by two. That is exactly what even means.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Checking only one direction', md: 'A biconditional makes two claims. Check the statement **and** its converse: one counterexample in either direction makes the biconditional false.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{If } p, \\text{ then } q \\quad \\text{and} \\quad \\text{if } q, \\text{ then } p'] },
      ],
      lines: [
        { say: 'A common mistake is to check only one direction. A biconditional makes two claims at once: if p, then q, and if q, then p.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'In the last example, the first direction was true, but that was not enough. The biconditional is true only when both directions are true, and one counterexample in either direction makes it false.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which biconditional is true?',
          choices: ['An angle is a right angle if and only if it measures $90^\\circ$.', 'A number is odd if and only if it is prime.', 'A shape is a rectangle if and only if it has four sides.', 'A number is positive if and only if it is greater than $1$.'],
          answer: 0,
          working: 'A is true both ways. B fails both ways: $9$ is odd but not prime, and $2$ is prime but not odd. C fails one way: a kite has four sides. D fails one way: $0.5$ is positive but not greater than $1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which biconditional is true? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A. Every right angle measures ninety degrees, and every ninety-degree angle is a right angle. Choice C fails in one direction: a kite has four sides, but it is not a rectangle. And choice D fails because one half is positive, but it is not greater than one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['“$p$ if and only if $q$” means “if $p$, then $q$” and “if $q$, then $p$”.', 'A biconditional is true only when both directions are true.', 'One counterexample in either direction makes it false.'] }],
      lines: [
        { say: 'Let’s sum up. P if and only if q means two things: if p, then q, and if q, then p.', show: 'sum.0' },
        { say: 'A biconditional is true only when both directions are true.', show: 'sum.1' },
        { say: 'And one counterexample in either direction makes it false. In the next lesson, we start counting methods, with tree diagrams and the fundamental counting principle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
