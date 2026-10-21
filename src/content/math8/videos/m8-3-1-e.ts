import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tape } from './lib/m8-3-figures.ts';

const P = '\\text{peanuts}';
const R = '\\text{raisins}';
const Ch = '\\text{chips}';

// The trail mix in 1-cup blocks (6 : 4 : 2), and the same mix in 2-cup blocks (3 : 2 : 1).
const mix = (id: string) =>
  figure(
    id,
    [
      tape({
        name: 'cup',
        unit: 1,
        total: '12\\ \\text{cups}',
        parts: [
          { id: 'p', count: 6, tone: 'opp', name: P },
          { id: 'r', count: 4, tone: 'brand', name: R },
          { id: 'c', count: 2, tone: 'adj', name: Ch },
        ],
      }),
      tape({
        name: 'two',
        unit: 2,
        at: [0, -2.9],
        parts: [
          { id: 'p', count: 3, tone: 'opp', name: P, value: '2' },
          { id: 'r', count: 2, tone: 'brand', name: R, value: '2' },
          { id: 'c', count: 1, tone: 'adj', name: Ch, value: '2' },
        ],
      }),
    ],
    330,
  );

// The bead kit, red : blue : green = 2 : 3 : 5, with 6 beads in each block and 60 in all.
const kit = (id: string) =>
  figure(
    id,
    [
      tape({
        stacked: true,
        unit: 1.2,
        total: '60',
        parts: [
          { id: 'r', count: 2, tone: 'bad', name: '\\text{Red}', value: '6' },
          { id: 'b', count: 3, tone: 'adj', name: '\\text{Blue}', value: '6' },
          { id: 'g', count: 5, tone: 'good', name: '\\text{Green}', value: '6' },
        ],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm8-3-1-e',
  lessonId: 'm8-3-1',
  title: 'Two-Term and Three-Term Ratios, Part 5: Three-Term Ratios',
  thumbnailTitle: 'Three-Term Ratios',
  thumbnail: 'mx',
  summary:
    'A three-term ratio compares three quantities, like 3 : 2 : 1, and works like a two-term ratio: multiply or divide all three terms by the same number. A trail mix of 6 cups of peanuts, 4 of raisins and 2 of chocolate chips is 6 : 4 : 2 = 3 : 2 : 1, and peanuts are 6/12 = 1/2 of the mix. If red : blue : green beads are 2 : 3 : 5 and there are 12 red beads, the scale factor is 6, so there are 30 green beads and 60 beads in all (10 parts × 6).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 5', title: 'Three-Term Ratios', subtitle: 'Comparing three amounts at once' }],
      lines: [
        { say: 'Kai’s trail mix has peanuts, raisins and chocolate chips. To compare all three amounts at once, you need a ratio with three terms.', show: 'title' },
        { say: 'In this part, you will write three-term ratios in lowest terms, and use them to solve problems.' },
      ],
    },
    {
      chapter: 'Three quantities',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Three-term ratio', md: 'A **three-term ratio** compares three quantities, like $3 : 2 : 1$. Multiply or divide **all three** terms by the same number to get an equivalent ratio.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['3 : 2 : 1'] },
      ],
      lines: [
        { say: 'A three-term ratio compares three quantities. This one is read three to two to one.', show: ['def', 'm.0'] },
        { say: 'Three-term ratios work just like two-term ratios. The order still matters, and you make an equivalent ratio by multiplying or dividing all three terms by the same number.' },
      ],
    },
    {
      chapter: 'Kai’s trail mix',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Kai’s trail mix has $6$ cups of peanuts, $4$ cups of raisins and $2$ cups of chocolate chips. Write the ratio of peanuts to raisins to chocolate chips in lowest terms.' },
        mix('mx'),
        { kind: 'math', id: 'm', size: 'md', lines: ['6 : 4 : 2 = \\dfrac{6}{2} : \\dfrac{4}{2} : \\dfrac{2}{2} = 3 : 2 : 1'] },
      ],
      lines: [
        { say: 'Kai’s trail mix has six cups of peanuts, four cups of raisins and two cups of chocolate chips. Write the ratio of peanuts to raisins to chocolate chips in lowest terms.', show: 'q' },
        { say: 'Here is the mix as a tape diagram. Each block is one cup: six blocks of peanuts, four of raisins and two of chocolate chips.', show: ['mx.cup-p', 'mx.cup-r', 'mx.cup-c'] },
        { say: 'The ratio is six to four to two. The greatest common factor of six, four and two is two, so divide all three terms by two.' },
        { say: 'Six divided by two is three. Four divided by two is two. Two divided by two is one. In lowest terms, the ratio is three to two to one.', show: 'm.0', focus: 'm.0' },
        { say: 'In the tape diagram, put the cups together in pairs. Each new block holds two cups: three blocks of peanuts, two of raisins and one of chocolate chips.', show: ['mx.two-p', 'mx.two-r', 'mx.two-c', 'mx.two-p-v', 'mx.two-r-v', 'mx.two-c-v'] },
      ],
    },
    {
      chapter: 'What fraction is peanuts?',
      layout: 'center',
      main: [
        mix('mx'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 + 4 + 2 = 12', '\\dfrac{6}{12} = \\dfrac{1}{2} \\qquad \\dfrac{3}{6} = \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'What fraction of the mix is peanuts? This compares a part with the whole, so first find the whole. Six plus four plus two is twelve cups.', show: ['mx.cup-p', 'mx.cup-r', 'mx.cup-c', 'mx.cup-total', 'm.0'], focus: ['mx.cup-total', 'm.0'] },
        { say: 'Peanuts to the whole mix is six to twelve. As a fraction, that is six twelfths, which is one half in lowest terms.', show: 'm.1', focus: ['m.1', 'mx.cup-p'] },
        { say: 'The tape diagram of two-cup blocks agrees. Three of its six blocks are peanuts, and three sixths is one half as well. Half of Kai’s trail mix is peanuts.', show: ['mx.two-p', 'mx.two-r', 'mx.two-c', 'mx.two-p-v', 'mx.two-r-v', 'mx.two-c-v'], focus: 'mx.two-p' },
      ],
    },
    {
      chapter: 'A bead kit',
      layout: 'split',
      leftWidth: 560,
      left: [kit('kt')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The ratio of red to blue to green beads in a kit is $2 : 3 : 5$. There are $12$ red beads. How many green beads are there? How many beads are there in all?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 6 = 12', '2 : 3 : 5 = 12 : 18 : 30', '12 + 18 + 30 = 60'] },
      ],
      lines: [
        { say: 'Now use a three-term ratio to solve a problem. The ratio of red to blue to green beads in a kit is two to three to five. There are twelve red beads. How many green beads are there? How many beads are there in all?', show: 'q' },
        { say: 'Draw a row of blocks for each colour: two blocks for red, three for blue and five for green. Every block holds the same number of beads.', show: ['kt.r', 'kt.b', 'kt.g'] },
        { say: 'The two red blocks hold twelve beads. Twelve divided by two is six, so each block holds six beads.', show: 'kt.r-v', focus: 'kt.r' },
        { say: 'In numbers, two times six is twelve. So the scale factor, the number that every term is multiplied by, is six.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply every term by six. Two to three to five equals twelve to eighteen to thirty. There are thirty green beads.', show: ['m.1', 'kt.b-v', 'kt.g-v'], focus: ['m.1', 'kt.g'] },
        { say: 'In all, twelve plus eighteen plus thirty is sixty beads.', show: ['m.2', 'kt.total'], focus: ['m.2', 'kt.total'] },
      ],
    },
    {
      chapter: 'Check with the total',
      layout: 'center',
      main: [
        kit('kt'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with the total', md: 'The ratio $2 : 3 : 5$ has $2 + 3 + 5 = 10$ parts. The total, $60$, is $10 \\times 6$. The scale factor works for the total too.' },
      ],
      lines: [
        { say: 'Here is a quick check. The ratio two to three to five has two plus three plus five, which is ten parts. That is ten blocks.', show: ['kt.r', 'kt.b', 'kt.g', 'kt.r-v', 'kt.b-v', 'kt.g-v', 'tip'] },
        { say: 'Ten blocks of six beads is sixty beads, and that matches the total. The scale factor, six, works for the total as well.', show: 'kt.total', focus: 'kt.total' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At an animal shelter, the ratio of cats to dogs to rabbits is $3 : 4 : 1$. There are $12$ dogs. How many animals are there in all?',
          choices: ['$8$', '$15$', '$36$', '$24$'],
          answer: 3,
          working: '$4 \\times 3 = 12$, so the scale factor is $3$: $3 : 4 : 1 = 9 : 12 : 3$. In all, $9 + 12 + 3 = 24$, or $8$ parts $\\times\\ 3 = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. At an animal shelter, the ratio of cats to dogs to rabbits is three to four to one. There are twelve dogs. How many animals are there in all? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twenty-four. Four times three is twelve, so the scale factor is three. The ratio has three plus four plus one, which is eight parts, and eight times three is twenty-four. Choice A, eight, is the number of parts in the ratio, not the number of animals.', show: 'q.answer' },
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
            'A **three-term ratio** compares three quantities, like $3 : 2 : 1$.',
            'Multiply or divide **all three** terms by the same number: $6 : 4 : 2 = 3 : 2 : 1$.',
            'For a part of the whole, add all the terms first: peanuts are $\\dfrac{6}{12} = \\dfrac{1}{2}$ of the mix.',
            'Find the scale factor from the term you know: $2 : 3 : 5 = 12 : 18 : 30$. It works for the total too.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A three-term ratio compares three quantities.', show: 'sum.0' },
        { say: 'It works just like a two-term ratio: multiply or divide all three terms by the same number.', show: 'sum.1' },
        { say: 'To compare a part with the whole, add all the terms to find the whole first.', show: 'sum.2' },
        { say: 'And to solve a problem, find the scale factor from the term you know. It works for the total as well. Next, you will compare quantities with different units, called rates. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
