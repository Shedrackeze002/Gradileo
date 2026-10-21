import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shareTree } from './lib/m9-2-figures.ts';

// Priya shares with 3 friends; each new person shares with 3 more: 3, 9, 27 new people.
const tree = figure(
  'tr',
  [
    shareTree({
      k: 3,
      rounds: 3,
      top: '\\text{Priya}',
      labels: ['\\text{round 1: } 3', '\\text{round 2: } 3^2 = 9', '\\text{round 3: } 3^3 = 27'],
      tones: ['adj', 'opp', 'good'],
    }),
  ],
  430,
);

const video: Explainer = {
  id: 'm9-2-4-c',
  lessonId: 'm9-2-4',
  title: 'Using Exponents to Solve Problems, Part 3: Sharing in Rounds',
  thumbnailTitle: 'Sharing in Rounds',
  thumbnail: 'tr',
  summary:
    'Priya shares a story with 3 friends, and in each round after that every person who just got it shares it with 3 new people. Round n reaches 3ⁿ new people: 3, 9, 27 and 81 in round 4. After 4 rounds, not counting Priya, 3 + 9 + 27 + 81 = 120 people have it. When each person shares with k new people, round n reaches kⁿ new people.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Powers and Exponent Laws · Part 3', title: 'Sharing in Rounds', subtitle: 'How a story spreads' }],
      lines: [
        { say: 'A story shared online can reach a huge number of people very quickly, even if each person only shares it with a few friends.', show: 'title' },
        { say: 'In this part, you will use powers to count how many people get a story in each round of sharing, and in total.' },
      ],
    },
    {
      chapter: 'Rounds of sharing',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Priya shares a story about a school fundraiser with $3$ friends. In each round after that, every person who just got it shares it with $3$ new people.' },
        tree,
      ],
      lines: [
        { say: 'Priya shares a story about a school fundraiser with three friends. In each round after that, every person who just got the story shares it with three new people.', show: ['q', 'tr.root'] },
        { say: 'In round one, Priya shares it with three friends. That is three new people.', show: ['tr.round1', 'tr.label1'], focus: 'tr.round1' },
        { say: 'In round two, each of those three people shares it with three more. Three groups of three is nine new people, or three squared.', show: ['tr.round2', 'tr.label2'], focus: 'tr.round2' },
        { say: 'In round three, each of those nine people shares it with three more. Nine groups of three is twenty-seven, or three cubed.', show: ['tr.round3', 'tr.label3'], focus: 'tr.round3' },
      ],
    },
    {
      chapter: 'Round four',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many new people get the story in round $4$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{round 1: } 3, \\quad \\text{round 2: } 3^2 = 9, \\quad \\text{round 3: } 3^3 = 27', '\\text{round 4: } 3^4 = 81'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Sharing in rounds', md: 'When each person shares with $k$ new people, round $n$ reaches $k^n$ new people.' },
      ],
      lines: [
        { say: 'How many new people get the story in round four? Look at the pattern. Round one is three, round two is three squared, and round three is three cubed.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'The exponent matches the round. So round four reaches three to the power of four, which is eighty-one new people.', show: 'm.1', focus: 'm.1' },
        { say: 'In general, when each person shares with the same number of new people, round n reaches that number to the power of n.', show: 'key' },
      ],
    },
    {
      chapter: 'How many in total?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How many people have the story after $4$ rounds, not counting Priya?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 + 9 + 27 + 81', '= 120'] },
      ],
      lines: [
        { say: 'Now a different question. How many people have the story after four rounds, not counting Priya?', show: 'q' },
        { say: 'Everyone who got it in any round has it now. So add the new people from all four rounds: three plus nine plus twenty-seven plus eighty-one.', show: 'm.0', focus: 'm.0' },
        { say: 'That is one hundred twenty people.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One round or all of them?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'One round or all of them?', md: '$3^4 = 81$ counts only the **new** people in round $4$. The total after $4$ rounds adds every round: $3 + 9 + 27 + 81 = 120$.' },
      ],
      lines: [
        { say: 'Read these questions carefully. Three to the power of four, eighty-one, counts only the new people in round four.', show: 'oops' },
        { say: 'The total after four rounds adds up every round, which gives one hundred twenty. Ask yourself: does the question want one round, or all of them?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A message is sent to $2$ people. In each round after that, every person who just got it sends it to $2$ new people. How many **new** people get it in round $5$?',
          choices: ['$10$', '$25$', '$62$', '$32$'],
          answer: 3,
          working: 'Round $n$ reaches $2^n$ new people, so round $5$ reaches $2^5 = 32$.',
        },
      ],
      lines: [
        { say: 'Your turn. A message is sent to two people. In each round after that, every person who just got it sends it to two new people. How many new people get it in round five? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, thirty-two. Round five reaches two to the power of five, which is thirty-two new people. Choice C, sixty-two, is the total after five rounds, two plus four plus eight plus sixteen plus thirty-two. The question asks only for the new people in round five.', show: 'q.answer' },
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
          items: [
            'When each person shares with $3$ new people, round $n$ reaches $3^n$ new people.',
            'Round $4$: $3^4 = 81$ new people.',
            'The total after $4$ rounds adds every round: $3 + 9 + 27 + 81 = 120$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When each person shares with three new people, round n reaches three to the power of n new people.', show: 'sum.0' },
        { say: 'So round four reaches eighty-one new people.', show: 'sum.1' },
        { say: 'And the total after four rounds adds every round: one hundred twenty. In the next part, you will fold paper in half again and again. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
