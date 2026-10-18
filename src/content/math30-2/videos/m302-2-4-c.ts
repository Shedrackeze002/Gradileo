import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { deck, slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-4-c',
  lessonId: 'm302-2-4',
  title: 'Combinations, Part 3: Choosing from Several Groups',
  thumbnailTitle: 'Choosing from Several Groups',
  thumbnail: 'dk',
  summary: 'A selection that needs some items from one group and some from another is a combination for each group, multiplied: 2 of 6 singers and 3 of 7 dancers give 6C2 × 7C3 = 15 × 35 = 525 acts. The 52 cards of a standard deck, and the 13 × 4C2 = 78 two-card hands that are a pair. Part 4 counts "at least" selections.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 3', title: 'Choosing from Several Groups', subtitle: 'A combination for each group, multiplied' }],
      lines: [
        { say: 'A talent show act needs some singers and some dancers. A committee needs some teachers and some students. Selections like these draw from more than one group at once.', show: 'title' },
        { say: 'In this video, you will count selections from several groups, and count hands from a deck of cards.' },
      ],
    },
    {
      chapter: 'A talent show act',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'An act needs 2 of 6 singers and 3 of 7 dancers. How many different selections are possible?' },
        figure('s', [slots({ values: ['{}_{6}C_{2}', '{}_{7}C_{3}'], captions: ['\\text{singers}', '\\text{dancers}'], widths: [2.2, 2.2] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{6}C_{2} = \\dfrac{6 \\times 5}{2 \\times 1} = 15 \\qquad {}_{7}C_{3} = \\dfrac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35', '15 \\times 35 = 525'] },
      ],
      lines: [
        { say: 'An act needs two of six singers and three of seven dancers. How many different selections are possible?', show: 'p' },
        { say: 'Within each group, order does not matter: swapping two chosen singers gives the same act. So use a combination for each group.', show: ['s.boxes', 's.captions'] },
        { say: 'The singers: six C two is six times five over two, which is fifteen. The dancers: seven C three is seven times six times five over three factorial, which is thirty-five.', show: ['s.values', 'm.0'], focus: ['s.values', 'm.0'] },
        { say: 'The act needs singers and dancers, chosen together. So by the counting principle, multiply: fifteen times thirty-five is 525 selections.', show: ['s.times', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A deck of cards',
      layout: 'center',
      main: [
        figure('dk', [deck()], 330),
        { kind: 'text', id: 't', size: 'md', md: '52 cards: 4 suits (hearts and diamonds are red, clubs and spades are black), each with 13 ranks: A, 2 to 10, J, Q and K.' },
      ],
      lines: [
        { say: 'Many counting problems use a standard deck of playing cards, so it helps to know how one is made up.', show: 'dk.suits' },
        { say: 'A deck has fifty-two cards in four suits: hearts and diamonds, which are red, and clubs and spades, which are black.', show: 'dk', focus: 'dk.suits' },
        { say: 'Each suit has thirteen ranks: the ace, the numbers two to ten, and the jack, queen and king. Four suits times thirteen ranks is fifty-two cards.', show: 't', focus: 'dk' },
        { say: 'So each rank appears four times, once in each suit. For example, there are four kings.', focus: 'dk.r12' },
      ],
    },
    {
      chapter: 'A pair',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many 2-card hands are a pair: two cards of the same rank?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Rank: } 13 \\text{ ways}', '\\text{Two of its 4 cards: } {}_{4}C_{2} = \\dfrac{4 \\times 3}{2 \\times 1} = 6', '13 \\times 6 = 78'] },
      ],
      lines: [
        { say: 'How many two-card hands are a pair, which means two cards of the same rank?', show: 'p' },
        { say: 'Build a pair in two steps. First, choose the rank, such as kings or sevens: thirteen ways.', show: 'm.0', focus: 'm.0' },
        { say: 'Then choose two of the four cards of that rank. A hand does not care about order, so this is four C two: four times three over two, which is six. For the kings, the six pairs are hearts and diamonds, hearts and clubs, hearts and spades, diamonds and clubs, diamonds and spades, and clubs and spades.', show: 'm.1', focus: 'm.1' },
        { say: 'The rank and the two cards are chosen together, so multiply: thirteen times six is seventy-eight pairs.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the groups instead of multiplying', md: 'The act needs singers **and** dancers, chosen together, so the combinations multiply. $15 + 35 = 50$ would count acts made of singers only or dancers only.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{15 + 35 = 50}', '\\good{15 \\times 35 = 525}'] },
      ],
      lines: [
        { say: 'A common mistake is to add the combinations for the groups: fifteen plus thirty-five is fifty.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But every act has singers and dancers. Each of the fifteen pairs of singers can go with each of the thirty-five groups of dancers, so the choices multiply, as in the counting principle: 525.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A committee needs 2 of 5 teachers and 2 of 8 students. How many committees are possible?',
          choices: ['$280$', '$38$', '$715$', '$1120$'],
          answer: 0,
          working: 'Teachers: ${}_{5}C_{2} = 10$. Students: ${}_{8}C_{2} = 28$. Together: $10 \\times 28 = 280$.',
        },
      ],
      lines: [
        { say: 'Your turn. A committee needs two of five teachers and two of eight students. How many committees are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 280. Five C two is ten ways to choose the teachers, and eight C two is twenty-eight ways to choose the students. Ten times twenty-eight is 280. Choice C, 715, chooses any four of the thirteen people, and ignores the rule of two from each group.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From several groups: a combination for each group, then multiply.', 'A standard deck: 52 cards, 4 suits, 13 ranks.', 'A pair: $13 \\times {}_{4}C_{2} = 78$.'] }],
      lines: [
        { say: 'Let’s sum up. To choose from several groups, find a combination for each group, then multiply.', show: 'sum.0' },
        { say: 'A standard deck has fifty-two cards, in four suits of thirteen ranks.', show: 'sum.1' },
        { say: 'And a pair is thirteen times four C two, or seventy-eight hands. In part four, we count selections with at least one of something. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
