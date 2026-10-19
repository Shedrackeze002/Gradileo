import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { packs } from './lib/m5-7-figures.ts';

const ALL = [0, 1, 2, 3];
const boxes = (id: string) => ALL.map((i) => `${id}.pack${i}`);
const stars = (id: string) => ALL.map((i) => `${id}.stars${i}`);
const hearts = (id: string) => ALL.map((i) => `${id}.hearts${i}`);

// 4 packs, each with 6 stars and 3 hearts.
const stickers = (id: string) => figure(id, [packs({ count: 4, stars: 6, hearts: 3 })]);

const video: Explainer = {
  id: 'm5-7-1-c',
  lessonId: 'm5-7-1',
  title: 'Order of Operations with Parentheses, Part 3: Writing an Expression for a Problem',
  thumbnailTitle: 'Expressions for Problems',
  thumbnail: 'pk',
  summary: 'Using parentheses to show which part of a problem to work out first: 4 packs of 6 star and 3 heart stickers is 4 × (6 + 3) = 36 (without the parentheses, 4 × 6 + 3 = 27 counts the hearts in only one pack), and $50 less a $12 book and a $15 game is 50 − (12 + 15) = 23.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Writing an Expression for a Problem', subtitle: 'Parentheses show what to work out first' }],
      lines: [
        { say: 'In a word problem, some parts must be worked out before others. Parentheses show which part to work out first.', show: 'title' },
        { say: 'In this video, you will write expressions with parentheses for problems, and evaluate them.' },
      ],
    },
    {
      chapter: 'Packs of stickers',
      layout: 'center',
      main: [
        stickers('pk'),
        { kind: 'text', id: 'q', size: 'md', md: 'Kai gets $4$ packs of stickers. Each pack has $6$ star stickers and $3$ heart stickers. How many stickers does Kai get?' },
      ],
      lines: [
        { say: 'Kai gets four packs of stickers. Each pack has six star stickers and three heart stickers. How many stickers does Kai get?', show: ['q', ...boxes('pk'), ...stars('pk'), ...hearts('pk')] },
        { say: 'Look at one pack. It has six stars and three hearts. So each pack has six plus three stickers.', focus: ['pk.stars0', 'pk.hearts0'] },
        { say: 'There are four packs. So we need four groups of six plus three.', focus: 'pk' },
      ],
    },
    {
      chapter: 'The expression',
      layout: 'center',
      main: [
        stickers('pk2'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times (6 + 3)', '= 4 \\times 9 = 36'] },
      ],
      lines: [
        { say: 'Write it as four times, six plus three in parentheses. The parentheses show that we find the stickers in one pack first.', show: [...boxes('pk2'), ...stars('pk2'), ...hearts('pk2'), 'm.0'], focus: 'm.0' },
        { say: 'Parentheses first: six plus three is nine stickers in each pack.' },
        { say: 'Then multiply: four times nine is thirty-six. Kai gets thirty-six stickers.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Forgetting the parentheses',
      layout: 'center',
      main: [
        stickers('pk3'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times 6 + 3 = 24 + 3 = \\bad{27} \\quad \\text{\\bad{wrong}}', '4 \\times (6 + 3) = \\good{36} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'What if you forget the parentheses? Four times six plus three means multiply first. Four times six is twenty-four, plus three is twenty-seven.', show: ['m.0', ...boxes('pk3'), ...stars('pk3'), 'pk3.hearts0'], focus: 'm.0' },
        { say: 'Look at what that counts. It counts the stars in all four packs, but the hearts in only one pack.', focus: ['pk3.stars0', 'pk3.stars1', 'pk3.stars2', 'pk3.stars3', 'pk3.hearts0'] },
        { say: 'The parentheses make sure every pack gets both kinds of stickers. Four times, six plus three, is thirty-six.', show: ['m.1', 'pk3.hearts1', 'pk3.hearts2', 'pk3.hearts3'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Money left',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Liam has \\$50. Liam buys a book for \\$12 and a game for \\$15. How many dollars does Liam have left?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['50 - (12 + 15)', '= 50 - 27', '= 23'] },
      ],
      lines: [
        { say: 'Liam has fifty dollars. Liam buys a book for twelve dollars and a game for fifteen dollars. How many dollars does Liam have left?', show: 'q' },
        { say: 'Liam spends twelve plus fifteen dollars, and that whole amount comes out of the fifty. So the expression is fifty minus, twelve plus fifteen in parentheses.', show: 'm.0', focus: 'm.0' },
        { say: 'Parentheses first: twelve plus fifteen is twenty-seven. Liam spends twenty-seven dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Then subtract: fifty minus twenty-seven is twenty-three. Liam has twenty-three dollars left.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['50 - 12 + 15 = 38 + 15 = \\bad{53} \\quad \\text{\\bad{wrong}}', '50 - (12 + 15) = \\good{23} \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check that it makes sense', md: 'Liam spent money, so Liam must have **less** than \\$50 left. An answer of \\$53 cannot be right.' },
      ],
      lines: [
        { say: 'Without the parentheses, fifty minus twelve plus fifteen means: subtract twelve, then add fifteen. That gives fifty-three dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Does that make sense? Liam spent money, so Liam must have less than fifty dollars left. Fifty-three dollars cannot be right.', show: 'tip' },
        { say: 'Both costs must be taken away, so they go together in the parentheses. Fifty minus twenty-seven is twenty-three dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Nia gets $3$ bags of fruit. Each bag has $5$ apples and $2$ oranges. Which expression gives the number of pieces of fruit Nia gets?',
          choices: ['$3 \\times 5 + 2$', '$3 \\times (5 + 2)$', '$3 + 5 + 2$', '$(3 + 5) \\times 2$'],
          answer: 1,
          working: 'Each bag has $5 + 2$ pieces of fruit, and there are $3$ bags: $3 \\times (5 + 2) = 3 \\times 7 = 21$.',
        },
      ],
      lines: [
        { say: 'Your turn. Nia gets three bags of fruit. Each bag has five apples and two oranges. Which expression gives the number of pieces of fruit Nia gets? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: three times, five plus two in parentheses, which is twenty-one. Each bag has five plus two pieces of fruit. Choice A counts the oranges in only one bag.', show: 'q.answer' },
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
          items: ['In a problem, put the part you must work out first in parentheses.', '$4 \\times (6 + 3)$ gives every pack both kinds of stickers.', 'Check that your answer makes sense in the story.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a problem, put the part you must work out first in parentheses.', show: 'sum.0' },
        { say: 'Four times, six plus three, gives every pack both kinds of stickers.', show: 'sum.1' },
        { say: 'And check that your answer makes sense in the story. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
