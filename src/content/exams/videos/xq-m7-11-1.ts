import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { letterTiles } from '@/content/math7/videos/lib/m7-11-figures.ts';

// Exam question for Math 7 lesson 11.1 (expressing probabilities). The question is from the
// Chapter 5 Practice Test of OpenStax Prealgebra 2e, word for word (CC BY-NC-SA 4.0). 12 of the 16
// nurses are women, so the probability is 12/16 = 3/4, and 3 ÷ 4 = 0.75.

const QUESTION =
  'Of the 16 nurses in Doreen’s department, 12 are women and 4 are men. One of the nurses will be assigned at random to work an extra shift next week. (a) Find the probability a woman nurse will be assigned the extra shift. (b) Convert the fraction to a decimal.';

const N = 16;
const WOMEN = 12;
// Two rows of 8 tiles: the first row all women, the second 4 women and 4 men.
const row = (name: string, from: number, dy: number): Part => {
  const p = letterTiles({ name, letters: Array.from({ length: 8 }, (_, i) => (from + i < WOMEN ? 'W' : 'M')), tones: Array.from({ length: 8 }, (_, i) => (from + i < WOMEN ? 'adj' : 'opp')), gap: 1.4, size: 1.2 });
  for (const k of Object.keys(p.points)) p.points[k] = [p.points[k][0], p.points[k][1] + dy];
  return p;
};
const nurses = (id: string) => figure(id, [row('r0', 0, 0), row('r1', 8, -1.5)], 300);
const tiles = (id: string, from: number, to: number) => Array.from({ length: to - from }, (_, i) => `${id}.r${Math.floor((from + i) / 8)}-t${(from + i) % 8}`);

const video: Explainer = {
  id: 'xq-m7-11-1',
  lessonId: '',
  exam: {
    lesson: 'm7-11-1',
    source: 'OpenStax, Prealgebra 2e, Chapter 5 Practice Test',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-practice-test',
    question: QUESTION,
  },
  title: 'Exam Question: Who Works the Extra Shift? (Expressing Probabilities)',
  thumbnailTitle: 'Who Works the Extra Shift?',
  thumbnail: 'ns',
  summary:
    'A real test question, solved one small step at a time: of the 16 nurses in Doreen’s department, 12 are women and 4 are men, and one nurse is chosen at random for an extra shift. Find the probability that a woman is chosen, as a fraction and then as a decimal. The probability is the number of favourable outcomes over the total: 12/16, which simplifies to 3/4, and 3 ÷ 4 = 0.75. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Who Works the Extra Shift?', subtitle: 'Expressing probabilities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about probability. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Of the $16$ nurses in Doreen’s department, $12$ are women and $4$ are men. One of the nurses will be assigned at random to work an extra shift next week. (a) Find the probability a woman nurse will be assigned the extra shift. (b) Convert the fraction to a decimal.',
          answer: '(a) $\\tfrac{12}{16} = \\tfrac{3}{4}$ (b) $0.75$',
          working: 'women ÷ all nurses; 3 ÷ 4',
        },
      ],
      lines: [
        { say: 'Here is the question, from a practice test in the book.', show: 'q' },
        { say: 'Of the 16 nurses in Doreen\'s department, 12 are women and 4 are men. One of the nurses will be assigned at random to work an extra shift next week.' },
        { say: 'Part a: find the probability a woman nurse will be assigned the extra shift. Part b: convert the fraction to a decimal.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [nurses('ns'), { kind: 'callout', id: 'c', tone: 'definition', title: 'At random', md: '**At random** means every nurse has the **same chance** of being picked. The **probability** says how likely it is that the one picked is a woman, from $0$ (impossible) to $1$ (certain).' }],
      lines: [
        { say: 'Here are the 16 nurses: 12 women and 4 men.', show: [...tiles('ns', 0, WOMEN), ...tiles('ns', WOMEN, N)] },
        { say: 'At random means every nurse has the same chance of being picked. The probability says how likely it is that the one picked is a woman, from 0, impossible, to 1, certain.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}', '\\dfrac{a}{b} = a \\div b'] }],
      lines: [
        { say: 'Here is what we need. When every outcome is equally likely, the probability of an event is the number of favourable outcomes, over the total number of outcomes.', show: 'm.0' },
        { say: 'And a fraction is a division: "a" over "b" is "a" divided by "b". That turns it into a decimal.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Count the **favourable** outcomes and the **total**', 'Write the fraction and **simplify**', '**Divide** to get the decimal'] }],
      lines: [
        { say: 'Here is the plan. Count the favourable outcomes, and the total.', show: 'plan.0' },
        { say: 'Write the fraction, and simplify it.', show: 'plan.1' },
        { say: 'Then divide, to get the decimal.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Fraction, then decimal',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{woman}) = \\dfrac{\\adj{12}}{16}', '\\dfrac{12 \\div 4}{16 \\div 4} = \\good{\\dfrac{3}{4}}', '3 \\div 4 = \\good{0.75}'] }],
      lines: [
        { say: 'Step one. A favourable outcome is picking a woman: there are 12 of them. The total is all 16 nurses. So the probability is 12 over 16.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two. 12 and 16 can both be divided by 4. 12 divided by 4 is 3, and 16 divided by 4 is 4. So the probability is 3 quarters.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three, part b. 3 quarters means 3 divided by 4, which is 0.75.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [nurses('ck'), { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{man}) = \\tfrac{4}{16} = \\tfrac{1}{4} = 0.25', '0.75 + 0.25 = 1 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Split the nurses into 4 equal groups of 4. 3 of the 4 groups are women, so 3 quarters of the nurses are women.', show: tiles('ck', 0, N) },
        { say: 'The chance of a man is 4 out of 16, one quarter, or 0.25.', show: 'm.0', focus: 'm.0' },
        { say: 'Someone is always picked, so the two must add to 1. 0.75 plus 0.25 is 1. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$\\tfrac{12}{4} = 3$', 'compared women with **men**: divide by **all** $16$'],
            ['$\\tfrac{4}{16}$', 'that is the chance of a **man**'],
            ['$3.4$', 'wrote the digits: $\\tfrac{3}{4}$ means $3 \\div 4 = 0.75$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '12 over 4 compares the women with the men, and gives 3, more than 1. A probability is never more than 1. Divide by all 16 nurses.' },
        { say: '4 over 16 is the chance of picking a man, not a woman.' },
        { say: 'And 3.4 just writes the digits. 3 quarters means 3 divided by 4, which is 0.75.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A bag has $5$ red marbles and $15$ blue marbles. One marble is picked at random. What is the probability that it is red, as a decimal?',
          choices: ['$0.5$', '$0.25$', '$0.33$', '$0.75$'],
          answer: 1,
          working: '5 red out of 20 marbles: 5/20 = 1/4 = 0.25.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag has 5 red marbles and 15 blue marbles. One marble is picked at random. What is the probability that it is red, as a decimal? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'There are 20 marbles in all, and 5 are red. 5 over 20 is one quarter, which is 0.25. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P = \\dfrac{\\text{favourable}}{\\text{total}}$', 'Divide by the **total**, not the rest', '**Simplify** the fraction', 'Fraction to decimal: **divide**'] }],
      lines: [
        { say: 'Here is what to remember. The probability is the favourable outcomes over the total.', show: 'sum.0' },
        { say: 'Divide by the total, not by the rest.', show: 'sum.1' },
        { say: 'Simplify the fraction.', show: 'sum.2' },
        { say: 'And to make a decimal, divide the top by the bottom. For more on expressing probabilities, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
