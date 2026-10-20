import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { ratioTable } from './lib/m6-5-figures.ts';

const Q = '\\thc{?}';

// 2/3 = 10/?: the top goes from 2 to 10, times 5.
const missing = (id: string) =>
  figure(id, [ratioTable({ rows: ['\\text{numerator}', '\\text{denominator}'], cols: [['2', '3'], ['10', Q]], colWidth: 2.4, arrows: [{ id: 'x5', from: 0, to: 1, label: '\\times 5' }] })]);

// Pancakes: 3 cups of flour for 2 cups of milk; ? cups of flour for 8 cups of milk.
const pancakes = (id: string) =>
  figure(id, [ratioTable({ rows: ['\\text{Flour (cups)}', '\\text{Milk (cups)}'], cols: [['3', '2'], [Q, '8']], colWidth: 2.4, arrows: [{ id: 'x4', from: 0, to: 1, label: '\\times 4' }] })]);

// Teams: red to blue is 3 : 4; 12 students on the blue team.
const teams = (id: string) =>
  figure(id, [ratioTable({ rows: ['\\text{Red team}', '\\text{Blue team}'], cols: [['3', '4'], [Q, '12']], colWidth: 2.4, arrows: [{ id: 'x3', from: 0, to: 1, label: '\\times 3' }] })]);

const video: Explainer = {
  id: 'm6-5-1-c',
  lessonId: 'm6-5-1',
  title: 'Equivalent Ratios and Proportions, Part 3: Proportions',
  thumbnailTitle: 'Proportions',
  thumbnail: 'pc',
  summary:
    'A proportion says two ratios are equivalent, such as 2/3 = 8/12. To find a missing term, find what one term was multiplied by and do the same to the other: 4/6 = 10/? gives 15, 3 cups of flour for 2 cups of milk gives 12 cups of flour for 8 cups of milk, and a red-to-blue team ratio of 3 : 4 with 12 on the blue team gives 9 + 12 = 21 students.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 3', title: 'Proportions', subtitle: 'Find the missing term' }],
      lines: [
        { say: 'A pancake recipe uses three cups of flour for every two cups of milk. You have eight cups of milk. How much flour do you need?', show: 'title' },
        { say: 'In this part, you will use a proportion to find a missing term, and solve ratio problems.' },
      ],
    },
    {
      chapter: 'Proportion',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proportion', md: 'A **proportion** says that two ratios are equivalent. For example, $\\dfrac{2}{3} = \\dfrac{8}{12}$, or $2 : 3 = 8 : 12$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\dfrac{2}{3} = \\dfrac{8}{12}'] },
      ],
      lines: [
        { say: 'Two to three and eight to twelve are equivalent ratios. When we write them with an equals sign between them, we get a proportion.', show: 'm.0', focus: 'm.0' },
        { say: 'A proportion says that two ratios are equivalent. You can write it with fractions, or with colons.', show: 'def' },
        { say: 'When one term of a proportion is missing, you can find it. Let’s see how.' },
      ],
    },
    {
      chapter: 'Find the missing term',
      layout: 'split',
      leftWidth: 600,
      left: [missing('ms')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Solve the proportion $\\dfrac{4}{6} = \\dfrac{10}{?}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{4}{6} = \\dfrac{2}{3}', '2 \\times 5 = 10', '3 \\times 5 = 15', '\\dfrac{4}{6} = \\dfrac{10}{15}'] },
      ],
      lines: [
        { say: 'Solve the proportion: four sixths equals ten over what?', show: 't' },
        { say: 'First, simplify the first ratio. Four sixths is two thirds, dividing both terms by two.', show: 'm.0', focus: 'm.0' },
        { say: 'Now compare the tops. The numerator changed from two to ten. Two times five is ten.', show: ['ms.frame', 'ms.c0', 'ms.c1', 'm.1'], focus: 'm.1' },
        { say: 'In equivalent ratios, both terms are multiplied by the same number. So multiply the bottom by five as well: three times five is fifteen.', show: ['ms.x5', 'm.2'], focus: ['ms.x5', 'm.2'] },
        { say: 'So four sixths equals ten fifteenths. The missing term is fifteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check your answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your answer', md: 'Simplify the new ratio. $10 : 15$ simplifies to $2 : 3$, and so does $4 : 6$. They match.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10 : 15 \\;\\xrightarrow{\\;\\div 5\\;}\\; 2 : 3', '4 : 6 \\;\\xrightarrow{\\;\\div 2\\;}\\; 2 : 3 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Always check your answer. Simplify the new ratio: ten to fifteen, divided by five, is two to three.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'Four to six simplifies to two to three as well. They match, so the answer is right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Pancakes for a crowd',
      layout: 'split',
      leftWidth: 600,
      left: [pancakes('pc')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'A recipe uses $3$ cups of flour for every $2$ cups of milk. How much flour goes with $8$ cups of milk?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{3}{2} = \\dfrac{?}{8} \\quad \\text{(flour over milk)}', '2 \\times 4 = 8', '3 \\times 4 = 12'] },
      ],
      lines: [
        { say: 'Now the pancakes. The recipe uses three cups of flour for every two cups of milk. How much flour goes with eight cups of milk?', show: 't' },
        { say: 'Write a proportion, with flour over milk on both sides. Three over two equals what over eight?', show: ['m.0', 'pc.frame', 'pc.c0', 'pc.c1'], focus: 'm.0' },
        { say: 'The milk changed from two cups to eight cups. Two times four is eight.', show: 'm.1', focus: ['m.1', 'pc.c1-b'] },
        { say: 'So multiply the flour by four as well. Three times four is twelve.', show: ['pc.x4', 'm.2'], focus: ['pc.x4', 'm.2'] },
        { say: 'Twelve cups of flour go with eight cups of milk. That is a lot of pancakes!' },
      ],
    },
    {
      chapter: 'Red team and blue team',
      layout: 'split',
      leftWidth: 600,
      left: [teams('tm')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Every student in a class is on the red team or the blue team. The ratio of red to blue is $3 : 4$. There are $12$ students on the blue team. How many students are in the class?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\times 3 = 12', '3 \\times 3 = 9 \\text{ on red}', '9 + 12 = 21'] },
      ],
      lines: [
        { say: 'Every student in a class is on the red team or the blue team. The ratio of red to blue is three to four. There are twelve students on the blue team. How many students are in the class?', show: ['t', 'tm.frame', 'tm.c0', 'tm.c1'] },
        { say: 'The blue term changed from four to twelve. Four times three is twelve.', show: 'm.0', focus: ['m.0', 'tm.c1-b'] },
        { say: 'Multiply the red term by three as well. Three times three is nine. There are nine students on the red team.', show: ['tm.x3', 'm.1'], focus: ['tm.x3', 'm.1'] },
        { say: 'But the question asks for the whole class. Add both teams: nine plus twelve is twenty-one. There are twenty-one students in the class.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe uses $2$ cups of rice for every $5$ cups of water. How much rice goes with $20$ cups of water?',
          choices: ['$17$ cups', '$50$ cups', '$8$ cups', '$10$ cups'],
          answer: 2,
          working: 'The water goes from $5$ to $20$: $5 \\times 4 = 20$. So the rice goes from $2$ to $2 \\times 4 = 8$ cups.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe uses two cups of rice for every five cups of water. How much rice goes with twenty cups of water? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, eight cups. The water changed from five to twenty, which is times four. So multiply the rice by four as well: two times four is eight. Choice A adds fifteen to both terms, and adding does not keep a ratio the same.', show: 'q.answer' },
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
            'A **proportion** says two ratios are equivalent: $\\dfrac{2}{3} = \\dfrac{8}{12}$.',
            'To find a missing term, find what one term was multiplied by, and multiply the other term by the same number.',
            'Check by simplifying both ratios.',
            'Read the question: it may ask for a total, not just one term.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A proportion says that two ratios are equivalent.', show: 'sum.0' },
        { say: 'To find a missing term, find what one term was multiplied by, and multiply the other term by the same number.', show: 'sum.1' },
        { say: 'Check your answer by simplifying both ratios.', show: 'sum.2' },
        { say: 'And read the question carefully: it may ask for a total. In the next lesson, you will learn about rates and unit rates. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
