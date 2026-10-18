import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dice, slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-1-c',
  lessonId: 'm302-2-1',
  title: 'The Fundamental Counting Principle, Part 3: Add or Multiply?',
  thumbnailTitle: 'Add or Multiply?',
  thumbnail: 'dc',
  summary: 'Choices made together ("and") multiply; choices that replace each other ("or") add. Worked examples: 3 hot or 4 cold drinks with one of 5 muffins make (3 + 4) × 5 = 35 deals, and 8 of the 36 outcomes of two dice have a sum of 7 or 11. Part 4 counts what you do not want and subtracts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 3', title: 'Add or Multiply?', subtitle: '“And” multiplies; “or” adds' }],
      lines: [
        { say: 'At a café, you choose a drink and a muffin. But the drink can be hot or cold. Some choices are made together, and some replace each other, and they are counted in different ways.', show: 'title' },
        { say: 'In this video, you will decide when to multiply and when to add, and count the outcomes of rolling two dice.' },
      ],
    },
    {
      chapter: 'And or or?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Read for “and” and “or”', md: 'Choices made together (“a drink **and** a muffin”) are **multiplied**. Choices that replace each other (“a hot drink **or** a cold drink”) are **added**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{and: } m \\times n', '\\text{or: } m + n'] },
      ],
      lines: [
        { say: 'Read the problem for the words and, and or.', show: 'key' },
        { say: 'Choices made together, such as a drink and a muffin, are multiplied. Every drink can go with every muffin, so each drink splits into all the muffins.', show: 'm.0', focus: 'm.0' },
        { say: 'Choices that replace each other, such as a hot drink or a cold drink, are added. You pick one drink from one list or the other, so the two lists are simply put together.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A breakfast deal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A café sells 3 hot drinks and 4 cold drinks, and 5 kinds of muffins. A deal is one drink and one muffin. How many deals are possible?' },
        figure('s', [slots({ values: ['3 + 4', '5'], captions: ['\\text{drink}', '\\text{muffin}'], widths: [2.6, 1.4] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Drinks: } 3 + 4 = 7', '\\text{Deals: } 7 \\times 5 = 35'] },
      ],
      lines: [
        { say: 'A café sells three hot drinks and four cold drinks, and five kinds of muffins. A deal is one drink and one muffin. How many deals are possible?', show: 'p' },
        { say: 'A deal is a drink and a muffin, so draw two boxes: one for the drink, and one for the muffin.', show: ['s.boxes', 's.captions'] },
        { say: 'The drink is hot or cold: one drink, chosen from either list. So add: three plus four is seven drinks.', show: ['s.v0', 'm.0'], focus: ['s.v0', 'm.0'] },
        { say: 'The muffin has five options. And a deal is a drink and a muffin, so multiply: seven times five is thirty-five deals.', show: ['s.v1', 's.times', 'm.1'], focus: ['s.v1', 'm.1'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying choices that cannot happen together', md: '$3 \\times 4 \\times 5 = 60$ counts deals with a hot drink **and** a cold drink, which is not allowed. Before you multiply, ask whether each outcome really includes one choice from every group.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3 \\times 4 \\times 5 = 60}', '\\good{(3 + 4) \\times 5 = 35}'] },
      ],
      lines: [
        { say: 'A common mistake is to multiply every number in the problem: three times four times five is sixty.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But that counts deals with a hot drink and a cold drink and a muffin, and a deal has only one drink. Before you multiply, ask whether each outcome really includes one choice from every group.' },
        { say: 'Here, the hot and cold drinks replace each other, so they are added first: three plus four, times five, is thirty-five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two dice',
      layout: 'split',
      leftWidth: 560,
      left: [figure('dc', [dice({ mark: [{ total: 7, tone: 'good' }, { total: 11, tone: 'theta' }] })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times 6 = 36 \\text{ outcomes}', '\\good{7}: (1, 6), (2, 5), (3, 4),', '\\quad (4, 3), (5, 2), (6, 1)', '\\thc{11}: (5, 6), (6, 5)', '6 + 2 = 8'] },
      ],
      lines: [
        { say: 'A red die and a blue die are rolled in a board game. A player moves ahead on a sum of seven or eleven. How many of the outcomes let the player move?', show: ['dc.grid', 'dc.red', 'dc.blue'] },
        { say: 'First, how many outcomes are there? The red die has six outcomes, and so does the blue die. They are rolled together, so multiply: six times six is thirty-six. The table shows each sum.', show: ['dc.sums', 'm.0'], focus: 'm.0' },
        { say: 'Make an organized list for a sum of seven. Fix the red die at one, two, three, and so on: one and six, two and five, three and four, four and three, five and two, six and one. That is six outcomes.', show: ['dc.s7', 'm.1', 'm.2'], focus: ['dc.s7', 'm.1', 'm.2'] },
        { say: 'A sum of eleven comes from five and six, or six and five: two outcomes.', show: ['dc.s11', 'm.3'], focus: ['dc.s11', 'm.3'] },
        { say: 'A roll cannot have a sum of seven and a sum of eleven at the same time, so these outcomes replace each other. Add them: six plus two is eight outcomes.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Order matters with two dice',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Order matters with two dice', md: '$(2, 5)$ and $(5, 2)$ are different outcomes, because the red die and the blue die can be told apart. That is why there are $6 \\times 6 = 36$ outcomes in all.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(\\bad{2}, \\adj{5}) \\ne (\\bad{5}, \\adj{2})'] },
      ],
      lines: [
        { say: 'One more detail. Two, five and five, two are different outcomes. In the first, the red die shows two and the blue die shows five. In the second, it is the other way around.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'Because the dice can be told apart, both outcomes are counted. That is why there are thirty-six outcomes, and six of them have a sum of seven.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A school lunch is one meal and one juice. There are 4 hot meals, 3 cold meals and 2 kinds of juice. How many different lunches are possible?',
          choices: ['$24$', '$9$', '$12$', '$14$'],
          answer: 3,
          working: 'A meal is hot **or** cold: $4 + 3 = 7$. A lunch is a meal **and** a juice: $7 \\times 2 = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. A school lunch is one meal and one juice. There are four hot meals, three cold meals and two kinds of juice. How many different lunches are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, fourteen. The meal is hot or cold, so add: four plus three is seven meals. A lunch is a meal and a juice, so multiply: seven times two is fourteen. Choice A multiplies all three numbers, which would count lunches with a hot meal and a cold meal together.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['“And”: choices made together are multiplied.', '“Or”: choices that replace each other are added.', 'Two dice have $6 \\times 6 = 36$ outcomes; $(2, 5)$ and $(5, 2)$ are different.'] }],
      lines: [
        { say: 'Let’s sum up. Choices made together, joined by and, are multiplied.', show: 'sum.0' },
        { say: 'Choices that replace each other, joined by or, are added.', show: 'sum.1' },
        { say: 'And two dice have thirty-six outcomes, because the order of the dice matters. In part four, we count the outcomes we do not want, and subtract. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
