import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from '@/content/math6/videos/lib/m6-5-figures.ts';

// A paint mix: 3 cans of blue for every 4 cans of white, five ways, and 3 : 4 = 15 : 20 picked out with ×5 arrows.
const paint = (id: string) =>
  figure(
    id,
    [
      ratioTable({
        rows: ['\\text{Blue (cans)}', '\\text{White (cans)}'],
        cols: [
          ['3', '4'],
          ['6', '8'],
          ['9', '12'],
          ['12', '16'],
          ['15', '20'],
        ],
        titleWidth: 4.8,
        arrows: [{ id: 'x5', from: 0, to: 4, label: '\\times 5' }],
      }),
    ],
    320,
  );

// 3/4 = x/20: the numerators on top, the denominators underneath, with ×5 arrows.
const solve = (id: string) =>
  figure(
    id,
    [ratioTable({ rows: ['\\text{Numerator}', '\\text{Denominator}'], cols: [['3', '4'], ['15', '20']], titleWidth: 4.8, colWidth: 2, arrows: [{ id: 'x5', from: 0, to: 1, label: '\\times 5' }] })],
    300,
  );

// 10/15 = 2/x: going down, ÷5.
const down = (id: string) =>
  figure(
    id,
    [ratioTable({ rows: ['\\text{Numerator}', '\\text{Denominator}'], cols: [['10', '15'], ['2', '3']], titleWidth: 4.8, colWidth: 2, arrows: [{ id: 'd5', from: 0, to: 1, label: '\\div 5' }] })],
    300,
  );

const video: Explainer = {
  id: 'm8-3-3',
  lessonId: 'm8-3-3',
  title: 'Proportional Reasoning, Part 1: Proportions',
  thumbnailTitle: 'Proportions',
  thumbnail: 'pt',
  summary:
    'A proportion says that two ratios are equal, such as 3/4 = 15/20 or 3 : 4 = 15 : 20. To solve a proportion, find the missing term: in 3/4 = x/20 the denominator went from 4 to 20, and 4 × 5 = 20, so multiply the numerator by 5 as well: x = 15. It works going down too: in 10/15 = 2/x the numerator was divided by 5, so x = 15 ÷ 5 = 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 1', title: 'Proportions', subtitle: 'Two ratios that are equal' }],
      lines: [
        { say: 'A pancake recipe for six people uses four eggs. How many eggs do you need for fifteen people? Questions like this come up in recipes, on maps and when you travel.', show: 'title' },
        { say: 'You can answer them with proportional reasoning. In this part, you will learn what a proportion is, and how to solve one.' },
      ],
    },
    {
      chapter: 'Equal ratios',
      layout: 'center',
      main: [
        paint('pt'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proportion', md: 'A **proportion** says that two ratios are equal, such as $\\dfrac{3}{4} = \\dfrac{15}{20}$ or $3 : 4 = 15 : 20$.' },
      ],
      lines: [
        { say: 'A paint colour is mixed with three cans of blue paint for every four cans of white paint. This ratio table shows equivalent ratios that all give the same colour.', show: ['pt.frame', 'pt.c0', 'pt.c1', 'pt.c2', 'pt.c3', 'pt.c4'] },
        { say: 'Three to four and fifteen to twenty are equivalent. Each term of three to four is multiplied by five.', show: 'pt.x5', focus: ['pt.x5', 'pt.c0', 'pt.c4'] },
        { say: 'A proportion says that two ratios are equal. Three over four equals fifteen over twenty is a proportion. So is three to four equals fifteen to twenty.', show: 'def' },
        { say: 'When two quantities always keep the same ratio, like the blue paint and the white paint, we say they are proportional.' },
      ],
    },
    {
      chapter: 'Solving a proportion',
      layout: 'split',
      leftWidth: 560,
      left: [solve('sv')],
      right: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Solve $\\dfrac{3}{4} = \\dfrac{x}{20}$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['4 \\times 5 = 20', 'x = 3 \\times 5 = 15', '\\dfrac{3}{4} = \\dfrac{15}{20}'] },
      ],
      lines: [
        { say: 'To solve a proportion, find the missing term. Solve three over four equals x over twenty. The letter x stands for the number we do not know yet.', show: ['q', 'sv.frame', 'sv.c0', 'sv.c1-b'] },
        { say: 'Look at the terms you know. The denominator went from four to twenty. Four times five is twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'For the ratios to be equal, the numerator must be multiplied by five as well. Three times five is fifteen. So x equals fifteen.', show: ['sv.x5', 'm.1', 'sv.c1-t'], focus: ['sv.x5', 'm.1'] },
        { say: 'Three quarters equals fifteen twentieths. To check, divide both terms of fifteen twentieths by five, and you are back to three quarters.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Going down',
      layout: 'split',
      leftWidth: 560,
      left: [down('dn')],
      right: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Solve $\\dfrac{10}{15} = \\dfrac{2}{x}$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['10 \\div 5 = 2', 'x = 15 \\div 5 = 3', '\\dfrac{10}{15} = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'The missing term can be anywhere, and the numbers can go down as well as up. Solve ten over fifteen equals two over x.', show: ['q', 'dn.frame', 'dn.c0', 'dn.c1-t'] },
        { say: 'This time the numerator went from ten down to two. Ten divided by five is two.', show: 'm.0', focus: 'm.0' },
        { say: 'So divide the denominator by five as well. Fifteen divided by five is three. So x equals three.', show: ['dn.d5', 'm.1', 'dn.c1-b'], focus: ['dn.d5', 'm.1'] },
        { say: 'Ten fifteenths equals two thirds. Whatever you do to one term, do the same to the other.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{4}{7} = \\dfrac{x}{28}$.',
          choices: ['$25$', '$7$', '$112$', '$16$'],
          answer: 3,
          working: 'The denominator went from $7$ to $28$, and $7 \\times 4 = 28$. Multiply the numerator by $4$ as well: $x = 4 \\times 4 = 16$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four over seven equals x over twenty-eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sixteen. Seven times four is twenty-eight, so multiply the numerator by four as well: four times four is sixteen. Choice A, twenty-five, adds twenty-one to the top, because twenty-one was added to the bottom. Equal ratios come from multiplying, not adding.', show: 'q.answer' },
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
            'A **proportion** says that two ratios are equal: $\\dfrac{3}{4} = \\dfrac{15}{20}$.',
            'To solve it, find the number that takes one term to the other: $4 \\times 5 = 20$.',
            'Do the same to the other term: $x = 3 \\times 5 = 15$. It works for dividing too.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A proportion says that two ratios are equal.', show: 'sum.0' },
        { say: 'To solve a proportion, find the number that takes one term to the other.', show: 'sum.1' },
        { say: 'Then do the same to the other term, whether you multiply or divide. In the next part, you will solve proportions when no whole number takes one term to the other. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
