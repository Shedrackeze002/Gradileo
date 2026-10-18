import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { deckCells, deckGrid, diceGrid, vennBox } from './lib/m302-3-figures.ts';

const t = (s: string) => `\\text{${s}}`;
const seven: [number, number][] = [1, 2, 3, 4, 5, 6].map((r) => [r, 7 - r]);
const doubles: [number, number][] = [1, 2, 3, 4, 5, 6].map((r) => [r, r]);

const video: Explainer = {
  id: 'm302-3-3',
  lessonId: 'm302-3-3',
  title: 'Mutually Exclusive Events, Part 1: Adding Probabilities',
  thumbnailTitle: 'Mutually Exclusive Events',
  thumbnail: 'apart',
  summary: 'Mutually exclusive events cannot happen at the same time (rolling a 2 and rolling a 5), unlike rolling an even number and a number greater than 3. For mutually exclusive events, P(A or B) = P(A) + P(B): a king or a queen (8/52 = 2/13), and a sum of 7 or doubles on two dice (12/36 = 1/3). Part 2 handles events that overlap.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Mutually Exclusive Events', subtitle: 'When one event rules out the other' }],
      lines: [
        { say: 'A card drawn from a deck cannot be both a king and a queen. But it can be both a king and a heart. Whether two events can happen together decides how you find the probability that one or the other happens.', show: 'title' },
        { say: 'In this video, you will learn what mutually exclusive events are, how to tell whether two events are mutually exclusive, and how to add their probabilities.' },
      ],
    },
    {
      chapter: 'Mutually exclusive events',
      layout: 'split',
      leftWidth: 580,
      left: [figure('apart', [vennBox({ apart: true, titles: [t('Roll a 2'), t('Roll a 5')], values: { a: '2', b: '5', out: '1, 3, 4, 6' } })], 440)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Mutually exclusive events', md: 'Two events are **mutually exclusive** if they cannot happen at the same time: they have no outcomes in common. In a Venn diagram, their circles do not overlap.' }],
      lines: [
        { say: 'Two events are mutually exclusive if they cannot happen at the same time. They have no outcomes in common.', show: 'def' },
        { say: 'For example, a fair six-sided die is rolled. The rectangle holds all six outcomes. One event is rolling a two, and the other is rolling a five.', show: ['apart.box', 'apart.a', 'apart.b', 'apart.values'] },
        { say: 'A single roll cannot be both a two and a five, so these events are mutually exclusive. In a Venn diagram, their circles do not overlap.', show: ['apart.sa', 'apart.sb'], focus: ['apart.sa', 'apart.sb'] },
      ],
    },
    {
      chapter: 'Can they happen together?',
      layout: 'split',
      leftWidth: 580,
      left: [figure('over', [vennBox({ titles: [t('Even'), t('Greater than 3')], values: { a: '2', both: '4, 6', b: '5', out: '1, 3' } })], 440)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{even: } 2, 4, 6', '\\text{greater than 3: } 4, 5, 6', '\\text{both: } 4, 6'] }],
      lines: [
        { say: 'What about rolling an even number, and rolling a number greater than three?', show: ['over.box', 'over.a', 'over.b'] },
        { say: 'The even numbers are two, four and six. The numbers greater than three are four, five and six.', show: ['m.0', 'm.1'] },
        { say: 'A roll of four or six is in both events. So these events can happen together, and they are not mutually exclusive. Their circles overlap, and four and six sit in the overlap.', show: ['m.2', 'over.values', 'over.sab'], focus: ['m.2', 'over.vab', 'over.sab'] },
      ],
    },
    {
      chapter: 'Adding probabilities',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Mutually exclusive events', md: 'The favourable outcomes do not overlap, so add the probabilities: $P(A \\text{ or } B) = P(A) + P(B)$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(2 \\text{ or } 5) = \\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{2}{6} = \\dfrac{1}{3}'] },
      ],
      lines: [
        { say: 'When two events are mutually exclusive, the outcomes of one are never outcomes of the other. So to count the outcomes in either event, add the two counts.', show: 'key' },
        { say: 'That means P of A or B equals P of A plus P of B. Here, “or” means one event or the other happens.' },
        { say: 'For the die, P of two or five is one sixth plus one sixth, which is two sixths, or one third.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A king or a queen',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'One card is drawn from a standard deck of 52. What is the probability that it is a king or a queen?' },
        figure('deck', [deckGrid({ marks: [{ id: 'q', cells: deckCells({ cols: [11] }), tone: 'adj' }, { id: 'k', cells: deckCells({ cols: [12] }), tone: 'opp' }] })], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{king or queen}) = \\dfrac{4}{52} + \\dfrac{4}{52} = \\dfrac{8}{52} = \\dfrac{2}{13}'] },
      ],
      lines: [
        { say: 'One card is drawn from a standard deck of fifty-two cards. What is the probability that it is a king or a queen?', show: ['p', 'deck.grid', 'deck.heads'] },
        { say: 'There are four kings, one in each suit, and four queens.', show: ['deck.k', 'deck.q'], focus: ['deck.k', 'deck.q'] },
        { say: 'No card is both a king and a queen, so the events are mutually exclusive, and you can add.' },
        { say: 'P of king or queen is four over fifty-two plus four over fifty-two. That is eight over fifty-two, which is two thirteenths.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Two dice',
      layout: 'split',
      leftWidth: 540,
      left: [figure('dice', [diceGrid({ marks: [{ id: 'seven', cells: seven, tone: 'theta' }, { id: 'doubles', cells: doubles, tone: 'adj' }] })], 470)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Two dice are rolled. What is the probability that the sum is 7 or that doubles are rolled?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{sum of 7: } 6 \\text{ outcomes}', '\\text{doubles: } 6 \\text{ outcomes}', 'P = \\dfrac{6}{36} + \\dfrac{6}{36} = \\dfrac{12}{36} = \\dfrac{1}{3}'] },
      ],
      lines: [
        { say: 'Two dice are rolled. What is the probability that the sum is seven, or that doubles are rolled?', show: 'p' },
        { say: 'The grid shows all thirty-six outcomes, with the sum of the two dice in each cell.', show: ['dice.grid', 'dice.heads', 'dice.sums'] },
        { say: 'A sum of seven happens six ways: a one and a six, a two and a five, a three and a four, and the same pairs the other way round.', show: ['dice.seven', 'm.0'], focus: ['dice.seven', 'm.0'] },
        { say: 'Doubles also happen six ways: one and one, two and two, and so on, up to six and six.', show: ['dice.doubles', 'm.1'], focus: ['dice.doubles', 'm.1'] },
        { say: 'Can one roll be both? Doubles always have an even sum, and seven is odd. So no outcome is in both events, and they are mutually exclusive. In the grid, the two diagonals never meet.', focus: ['dice.seven', 'dice.doubles'] },
        { say: 'So the probability is six thirty-sixths plus six thirty-sixths, which is twelve thirty-sixths, or one third.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check before you add', md: 'Add the probabilities only when the events cannot happen together. “Even” and “greater than 3” share the outcomes 4 and 6, so adding counts them twice.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{3}{6} + \\dfrac{3}{6} = 1} \\qquad \\good{2, 4, 5, 6: \\ \\dfrac{4}{6} = \\dfrac{2}{3}}'] },
      ],
      lines: [
        { say: 'A common mistake is to add probabilities without checking that the events are mutually exclusive.', show: 'oops' },
        { say: 'P of even is three sixths, and P of greater than three is three sixths. Adding them gives one, which would mean the event is certain. But a roll of one or three is neither even nor greater than three.', show: 'm', focus: 'm' },
        { say: 'The outcomes that are even or greater than three are two, four, five and six: four sixths, or two thirds. Adding counted four and six twice. The next part shows how to fix that.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag holds 3 red, 5 green and 4 yellow marbles. One marble is drawn at random. What is the probability that it is red or yellow?',
          choices: ['$\\dfrac{1}{12}$', '$\\dfrac{7}{12}$', '$\\dfrac{5}{12}$', '$\\dfrac{7}{24}$'],
          answer: 1,
          working: 'No marble is both red and yellow, so $P(\\text{red or yellow}) = \\dfrac{3}{12} + \\dfrac{4}{12} = \\dfrac{7}{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag holds three red, five green and four yellow marbles. One marble is drawn at random. What is the probability that it is red or yellow? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, seven twelfths. A marble cannot be both red and yellow, so the events are mutually exclusive, and you add: three twelfths plus four twelfths. Choice A multiplies the two probabilities instead of adding them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['Mutually exclusive events cannot happen together: they share no outcomes.', 'Mutually exclusive: $P(A \\text{ or } B) = P(A) + P(B)$.', 'Check for shared outcomes before you add.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Mutually exclusive events cannot happen at the same time: they share no outcomes.', show: 'sum.0' },
        { say: 'For mutually exclusive events, P of A or B is P of A plus P of B.', show: 'sum.1' },
        { say: 'And check for shared outcomes before you add. In part two, we find P of A or B when the events do overlap. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
