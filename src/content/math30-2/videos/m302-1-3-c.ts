import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { mark, venn } from './lib/m302-1-figures.ts';

/** p: a multiple of 10, inside q: a multiple of 5, with 20, 15 and 7 placed. */
const multiples = [
  venn({
    box: [-5, -3.7, 5, 3.9],
    universe: 'U',
    sets: [
      { key: 'q', c: [0, -0.3], r: 3.2, title: 'q', tone: 'opp', titlePos: [2.9, 3.0] },
      { key: 'p', c: [0.7, -1.1], r: 1.5, title: 'p', tone: 'adj', titlePos: [0.7, 0.85] },
    ],
  }),
  mark({ id: 'n20', at: [0.7, -1.1], tex: '20', tone: 'adj', place: 'below' }),
  mark({ id: 'n15', at: [-1.7, 0.9], tex: '15', tone: 'opp', place: 'below' }),
  mark({ id: 'n7', at: [-4, -2.6], tex: '7', tone: 'theta', place: 'right' }),
];

const video: Explainer = {
  id: 'm302-1-3-c',
  lessonId: 'm302-1-3',
  title: 'Conditional Statements, Part 3: The Inverse and the Contrapositive',
  thumbnailTitle: 'Inverse and Contrapositive',
  thumbnail: 'v',
  summary: 'The inverse of "If p, then q" is "If not p, then not q", and the contrapositive is "If not q, then not p". With "If a number is a multiple of 10, then it is a multiple of 5": the statement and contrapositive are true, the converse and inverse false (15). A statement and its contrapositive always agree. Part 4 meets biconditional statements.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Set Theory and Logic · Part 3', title: 'The Inverse and the Contrapositive', subtitle: 'Negate, or switch and negate' }],
      lines: [
        { say: 'Some ways of rewording a statement always mean the same thing, and some do not. Knowing which is which keeps your reasoning sound.', show: 'title' },
        { say: 'In this video, you will write the inverse and the contrapositive of a conditional statement, and see which forms always agree with each other.' },
      ],
    },
    {
      chapter: 'Negating a statement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inverse and contrapositive', md: 'The **inverse** of “If $p$, then $q$” is “If not $p$, then not $q$”: both parts are negated. The **contrapositive** is “If not $q$, then not $p$”: the parts are switched **and** negated.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['p: \\text{ a number is a multiple of } 10', '\\text{not } p: \\text{ a number is not a multiple of } 10'] },
      ],
      lines: [
        { say: 'To negate a statement, say its opposite. The negation of p is written not p.', show: 'm.0' },
        { say: 'If p is: a number is a multiple of ten, then not p is: a number is not a multiple of ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Negating gives two more forms of a conditional statement. The inverse of if p, then q, negates both parts: if not p, then not q.', show: 'def' },
        { say: 'The contrapositive switches the parts and negates them: if not q, then not p.' },
      ],
    },
    {
      chapter: 'All four forms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'pq', size: 'md', lines: ['\\adj{p}: \\text{ a multiple of } 10 \\qquad \\opp{q}: \\text{ a multiple of } 5'] },
        {
          kind: 'table',
          id: 't',
          head: ['Name', 'Form', 'True?'],
          rows: [
            ['Statement', 'If $p$, then $q$.', 'yes'],
            ['Converse', 'If $q$, then $p$.', 'no: $15$'],
            ['Inverse', 'If not $p$, then not $q$.', 'no: $15$'],
            ['Contrapositive', 'If not $q$, then not $p$.', 'yes'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all four forms for one statement. Let p be: a number is a multiple of ten, and q be: it is a multiple of five.', show: 'pq' },
        { say: 'The statement: if a number is a multiple of ten, then it is a multiple of five. That is true: every multiple of ten ends in zero, so five divides it.', show: 't.0', focus: 't.0' },
        { say: 'The converse: if a number is a multiple of five, then it is a multiple of ten. That is false. Fifteen is a multiple of five, but not of ten.', show: 't.1', focus: 't.1' },
        { say: 'The inverse: if a number is not a multiple of ten, then it is not a multiple of five. Also false, and fifteen is again a counterexample: it is not a multiple of ten, but it is a multiple of five.', show: 't.2', focus: 't.2' },
        { say: 'The contrapositive: if a number is not a multiple of five, then it is not a multiple of ten. That is true.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Why they agree',
      layout: 'split',
      leftWidth: 540,
      left: [figure('v', multiples)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{p}: \\text{ a multiple of } 10', '\\opp{q}: \\text{ a multiple of } 5'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Pairs that always agree', md: 'A statement and its contrapositive are both true or both false. So are the converse and the inverse.' },
      ],
      lines: [
        { say: 'A Venn diagram shows why. Every multiple of ten is a multiple of five, so the p circle sits inside the q circle. Twenty is in both.', show: ['m', 'v.box', 'v.q', 'v.p', 'v.n20'], focus: 'v.n20' },
        { say: 'Fifteen is in the q circle but outside the p circle. That one number breaks both the converse and the inverse.', show: 'v.n15', focus: 'v.n15' },
        { say: 'Now the contrapositive. A number that is not a multiple of five, such as seven, is outside the q circle. And everything outside the q circle is also outside the p circle, which sits inside it. So if not q, then not p: the contrapositive is true.', show: 'v.n7', focus: 'v.n7' },
        { say: 'This always happens. A statement and its contrapositive are always both true or both false. The converse and the inverse also always agree with each other.', show: 'tip' },
      ],
    },
    {
      chapter: 'Writing the contrapositive',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Write the contrapositive of “If a quadrilateral is a square, then it has four right angles.” Is it true?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['p: \\text{ a quadrilateral is a square}', 'q: \\text{ it has four right angles}', '\\text{If it does not have four right angles,}', '\\text{then it is not a square.} \\quad \\good{\\text{True}}'] },
      ],
      lines: [
        { say: 'Write the contrapositive of: if a quadrilateral is a square, then it has four right angles. Is the contrapositive true?', show: 'p' },
        { say: 'The hypothesis, p, is: a quadrilateral is a square. The conclusion, q, is: it has four right angles.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Switch the parts and negate them both: if a quadrilateral does not have four right angles, then it is not a square.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The original statement is true, because every square has four right angles. So the contrapositive is true as well.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Inverse or contrapositive?', md: 'Negating both parts **without** switching them gives the inverse, which can be false when the statement is true. The contrapositive needs both steps: switch **and** negate.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Inverse: If it is not a square,}', '\\text{then it does not have four right angles.}', '\\bad{\\text{False: a 2 by 5 rectangle has four right angles.}}'] },
      ],
      lines: [
        { say: 'A common mistake is to negate both parts but forget to switch them. That gives the inverse, not the contrapositive.', show: 'oops' },
        { say: 'The inverse of the square statement is: if a quadrilateral is not a square, then it does not have four right angles.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'That is false. A rectangle that is two by five is not a square, but it does have four right angles.', show: 'm.2', focus: 'm.2' },
        { say: 'So remember: the contrapositive needs both steps. Switch the parts, and negate them.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the contrapositive of “If it is snowing, then it is cold”?',
          choices: ['If it is cold, then it is snowing.', 'If it is not snowing, then it is not cold.', 'If it is snowing, then it is not cold.', 'If it is not cold, then it is not snowing.'],
          answer: 3,
          working: 'Switch the parts and negate both: “If it is not cold, then it is not snowing.”',
        },
      ],
      lines: [
        { say: 'Your turn. What is the contrapositive of: if it is snowing, then it is cold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: if it is not cold, then it is not snowing. The parts are switched and both are negated. Choice B negates both parts but does not switch them, so it is the inverse. And choice A is the converse.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Inverse: if not $p$, then not $q$. Contrapositive: if not $q$, then not $p$.', 'A statement and its contrapositive are both true or both false.', 'The converse and the inverse also always agree with each other.'] }],
      lines: [
        { say: 'Let’s sum up. The inverse is if not p, then not q. The contrapositive is if not q, then not p.', show: 'sum.0' },
        { say: 'A statement and its contrapositive are always both true or both false.', show: 'sum.1' },
        { say: 'And the converse and the inverse always agree with each other. In part four, we combine a statement and its converse into one: the biconditional. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
