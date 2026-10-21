import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { die, spinner } from '@/content/math6/videos/lib/m6-12-figures.ts';
import { deckCells, deckGrid } from '@/content/math30-2/videos/lib/m302-3-figures.ts';

// Maya's die and a spinner with 8 equal sections, 3 of them red.
const EIGHT = ['R', 'R', 'R', '', '', '', '', ''];
const EIGHT_TONES: DiagramTone[] = ['bad', 'bad', 'bad', 'muted', 'muted', 'muted', 'muted', 'muted'];
const dieSpinner = (id: string) =>
  figure(id, [die('die', [-6.6, -1.3], 4, { size: 2.6 }), spinner({ name: 'sp', labels: EIGHT, tones: EIGHT_TONES, r: 2.2 })], 360);

// A standard deck: 13 hearts (the second row) and 4 kings (the last column).
const deck = (id: string) =>
  figure(
    id,
    [
      deckGrid({
        marks: [
          { id: 'hearts', cells: deckCells({ rows: [1] }), tone: 'bad', shade: 0.45 },
          { id: 'kings', cells: deckCells({ cols: [12] }), tone: 'theta', shade: 0.45 },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-10-2-c',
  lessonId: 'm8-10-2',
  title: 'Probability of Independent Events, Part 3: The Multiplication Rule',
  thumbnailTitle: 'The Multiplication Rule',
  thumbnail: 'dk',
  summary:
    'If two events are independent, the probability that both happen is the product of their probabilities: P(A and B) = P(A) × P(B). Rolling an even number on a die and spinning red on a spinner with 3 red sections out of 8: 1/2 × 3/8 = 3/16, which matches counting 9 of 48 outcomes. Picking a heart, putting the card back, then picking a king: 13/52 × 4/52 = 1/4 × 1/13 = 1/52.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 3', title: 'The Multiplication Rule', subtitle: 'Multiply the probabilities' }],
      lines: [
        { say: 'Tables and tree diagrams can get very big. A die and a spinner with eight sections already have forty-eight outcomes!', show: 'title' },
        { say: 'In this video, you will learn a quick rule that gives the probability of two independent events without drawing every outcome.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'Probability of two independent events', md: 'If two events are independent, the probability that **both** happen is the probability of the first **times** the probability of the second.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ and } B) = P(A) \\times P(B)'] },
      ],
      lines: [
        { say: 'The table and the tree both led to the same shortcut. For independent events, multiply.', show: 'def' },
        { say: 'If two events are independent, the probability that both happen is the probability of the first, times the probability of the second.' },
        { say: 'In symbols, we call the events capital A and capital B, and write it like this.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A die and a spinner',
      layout: 'split',
      leftWidth: 620,
      left: [dieSpinner('ds')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Maya rolls a die and spins a spinner with $8$ equal sections, $3$ of them red. What is $P(\\text{even and red})$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{even}) = \\dfrac{3}{6} = \\dfrac{1}{2}', 'P(\\text{red}) = \\dfrac{3}{8}', '\\dfrac{1}{2} \\times \\dfrac{3}{8} = \\dfrac{3}{16}'] },
      ],
      lines: [
        { say: 'Maya rolls a die and spins a spinner with eight equal sections. Three of them are red. What is the probability of rolling an even number and spinning red?', show: ['ds.die', 'ds.sp-s0', 'ds.sp-s1', 'ds.sp-s2', 'ds.sp-s3', 'ds.sp-s4', 'ds.sp-s5', 'ds.sp-s6', 'ds.sp-s7', 'ds.sp-pointer', 'q'] },
        { say: 'The die and the spinner are independent, so find each probability, then multiply.' },
        { say: 'The die has three even numbers out of six: two, four and six. So the probability of even is three sixths, which is one half.', show: 'm.0', focus: ['m.0', 'ds.die'] },
        { say: 'Three of the eight sections are red, so the probability of red is three eighths.', show: 'm.1', focus: ['m.1', 'ds.sp-s0', 'ds.sp-s1', 'ds.sp-s2'] },
        { say: 'Now multiply: one half times three eighths. Multiply the tops, one times three is three. Multiply the bottoms, two times eight is sixteen. The answer is three sixteenths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Checking by counting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\times 8 = 48 \\text{ outcomes}', '3 \\text{ even} \\times 3 \\text{ red} = 9 \\text{ outcomes}', '\\dfrac{9}{48} = \\dfrac{3}{16}'] },
      ],
      lines: [
        { say: 'Let’s check by counting. A table for the die and the spinner would have six rows and eight columns. That is forty-eight equally likely outcomes.', show: 'm.0', focus: 'm.0' },
        { say: 'The favourable ones have one of the three even numbers and one of the three red sections. That is three times three, which is nine outcomes.', show: 'm.1', focus: 'm.1' },
        { say: 'So the probability is nine out of forty-eight. Divide the top and the bottom by three, and you get three sixteenths. The rule gives the same answer, with much less work.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Cards put back',
      layout: 'split',
      leftWidth: 640,
      left: [deck('dk')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Leo picks a card from a standard deck, **puts it back**, shuffles and picks again. What is the probability of a heart, then a king?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{heart}) = \\dfrac{13}{52} = \\dfrac{1}{4}', 'P(\\text{king}) = \\dfrac{4}{52} = \\dfrac{1}{13}', '\\dfrac{1}{4} \\times \\dfrac{1}{13} = \\dfrac{1}{52}'] },
      ],
      lines: [
        { say: 'A standard deck has fifty-two cards, in four suits: spades, hearts, diamonds and clubs. Each suit has thirteen cards, and one of them is a king.', show: ['dk.grid', 'dk.heads', 'q'] },
        { say: 'Leo picks a card, puts it back, shuffles, and picks again. What is the probability of a heart, and then a king?' },
        { say: 'Thirteen out of fifty-two cards are hearts. So the probability of a heart is thirteen out of fifty-two, which is one quarter.', show: ['dk.hearts', 'm.0'], focus: ['dk.hearts', 'm.0'] },
        { say: 'Four out of fifty-two cards are kings. So the probability of a king is four out of fifty-two, which is one thirteenth.', show: ['dk.kings', 'm.1'], focus: ['dk.kings', 'm.1'] },
        { say: 'The card is put back, so the deck is the same for both picks, and they are independent. Multiply: one quarter times one thirteenth is one out of fifty-two.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You roll a die and flip a coin. What is the probability of rolling a $6$ **and** getting heads?',
          choices: ['$\\dfrac{1}{8}$', '$\\dfrac{2}{3}$', '$\\dfrac{1}{12}$', '$\\dfrac{1}{6}$'],
          answer: 2,
          working: '$P(6) = \\dfrac{1}{6}$ and $P(\\text{heads}) = \\dfrac{1}{2}$. They are independent, so $\\dfrac{1}{6} \\times \\dfrac{1}{2} = \\dfrac{1}{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. You roll a die and flip a coin. What is the probability of rolling a six and getting heads? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C: one twelfth. The probability of a six is one sixth, and of heads is one half. One sixth times one half is one twelfth. Choice B adds the two probabilities instead of multiplying them.', show: 'q.answer' },
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
          items: ['For independent events, $P(A \\text{ and } B) = P(A) \\times P(B)$.', 'Find each probability on its own, then multiply.', 'Putting a card back keeps the picks independent, so the rule works.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For independent events, the probability that both happen is the product of their probabilities.', show: 'sum.0' },
        { say: 'Find each probability on its own, then multiply.', show: 'sum.1' },
        { say: 'Putting a card back keeps the picks independent, so the rule works. In the next part, you will use the rule with percents, for the weather and for sports. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
