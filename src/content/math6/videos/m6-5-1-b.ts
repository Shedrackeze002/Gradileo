import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chips } from './lib/m6-3-figures.ts';
import { beads, ratioTable } from './lib/m6-5-figures.ts';

// The 2 : 3 bead pattern repeated five times, as a ratio table.
const table = (id: string) =>
  figure(id, [
    ratioTable({
      rows: ['\\text{Red beads}', '\\text{White beads}'],
      cols: [
        ['2', '3'],
        ['4', '6'],
        ['6', '9'],
        ['8', '12'],
        ['10', '15'],
      ],
    }),
  ], 250);

// 2 : 3 doubled is 4 red and 6 white; 4 : 5 has one white bead fewer.
const compare = (id: string) =>
  figure(id, [
    beads({ name: 'a', repeats: 2, red: 2, white: 3, labels: ['2 : 3', '2 : 3'] }),
    beads({ name: 'b', repeats: 1, red: 4, white: 5, at: [0, -3.4], labels: ['4 : 5'] }),
  ], 300);

// The common factors of 8 and 12, to simplify 8 : 12.
const factors = (id: string) =>
  figure(id, [
    chips({ name: 'a', values: [2, 2, 2], tones: ['good', 'good', 'adj'], title: '8' }),
    chips({ name: 'b', values: [2, 2, 3], tones: ['good', 'good', 'opp'], at: [0, -1.4], title: '12' }),
  ], 200);

const video: Explainer = {
  id: 'm6-5-1-b',
  lessonId: 'm6-5-1',
  title: 'Equivalent Ratios and Proportions, Part 2: Checking Equivalent Ratios',
  thumbnailTitle: 'Checking Equivalent Ratios',
  thumbnail: 'cp',
  summary:
    'A ratio is in simplest form when its terms share no factor but 1; divide both terms by their greatest common factor (8 : 12 ÷ 4 is 2 : 3). Two ratios are equivalent when they simplify to the same ratio: 4 : 6 and 10 : 15 are both 2 : 3, and 6 : 8 and 9 : 12 are both 3 : 4. Adding the same number to both terms (2 : 3 and 4 : 5) does not keep a ratio the same.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 2', title: 'Checking Equivalent Ratios', subtitle: 'Write both in simplest form' }],
      lines: [
        { say: 'Are four to six and ten to fifteen equivalent ratios? Do they describe the same relationship?', show: 'title' },
        { say: 'In this part, you will check whether two ratios are equivalent, by writing each one in simplest form.' },
      ],
    },
    {
      chapter: 'Simplest form',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Simplest form', md: 'A ratio is in **simplest form** when its terms have no common factor except $1$. To simplify, divide both terms by their greatest common factor.' },
        factors('fc'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['8 : 12 \\;\\xrightarrow{\\;\\div 4\\;}\\; 2 : 3'] },
      ],
      lines: [
        { say: 'A ratio is in simplest form when its terms have no common factor except one. To write a ratio in simplest form, divide both terms by their greatest common factor.', show: 'key' },
        { say: 'Let’s simplify eight to twelve. Eight is two times two times two. Twelve is two times two times three.', show: 'fc' },
        { say: 'They share two factors of two, so their greatest common factor is two times two, which is four.', focus: ['fc.a-c0', 'fc.a-c1', 'fc.b-c0', 'fc.b-c1'] },
        { say: 'Divide both terms by four. Eight divided by four is two, and twelve divided by four is three. So eight to twelve in simplest form is two to three.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Are they equivalent?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['4 : 6 \\;\\xrightarrow{\\;\\div 2\\;}\\; 2 : 3', '10 : 15 \\;\\xrightarrow{\\;\\div 5\\;}\\; 2 : 3'] },
        table('rt'),
      ],
      lines: [
        { say: 'Now, are four to six and ten to fifteen equivalent? Write each one in simplest form.' },
        { say: 'Four and six have the greatest common factor two. Divide both terms by two: four to six becomes two to three.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten and fifteen have the greatest common factor five. Divide both terms by five: ten to fifteen becomes two to three as well.', show: 'm.1', focus: 'm.1' },
        { say: 'Both ratios simplify to two to three, so they are equivalent.', focus: ['m.0', 'm.1'] },
        { say: 'You can see it in a ratio table for two to three. Four to six and ten to fifteen are both columns of the same table.', show: 'rt', focus: ['rt.c1', 'rt.c4'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the same number', md: '$2 : 3$ and $4 : 5$ are **not** equivalent. Adding $2$ to both terms does not keep the relationship. Check: $2 \\times 2 = 4$, but $3 \\times 2 = 6$, not $5$.' },
        compare('cp'),
      ],
      lines: [
        { say: 'Watch out for this mistake. Two to three and four to five are not equivalent. Adding two to both terms does not keep the same relationship.', show: 'oops' },
        { say: 'Look at the beads. Two red and three white, repeated twice, gives four red and six white.', show: ['cp.a-string', 'cp.a-k0', 'cp.a-k1', 'cp.a-br0', 'cp.a-br1'] },
        { say: 'Four to five has four red beads but only five white beads. That is one white bead too few, so it is a different pattern.', show: ['cp.b-string', 'cp.b-k0', 'cp.b-br0'], focus: 'cp.b-k0' },
        { say: 'To get from two to four, you multiply by two. So you must multiply three by two as well, and get six, not five.' },
      ],
    },
    {
      chapter: 'Another check',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Are $6 : 8$ and $9 : 12$ equivalent?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 : 8 \\;\\xrightarrow{\\;\\div 2\\;}\\; 3 : 4', '9 : 12 \\;\\xrightarrow{\\;\\div 3\\;}\\; 3 : 4', '\\text{Both are } 3 : 4 \\;\\to\\; \\good{\\text{equivalent}}'] },
      ],
      lines: [
        { say: 'Let’s check one more pair. Are six to eight and nine to twelve equivalent?', show: 't' },
        { say: 'The greatest common factor of six and eight is two. Six to eight simplifies to three to four.', show: 'm.0', focus: 'm.0' },
        { say: 'The greatest common factor of nine and twelve is three. Nine to twelve simplifies to three to four as well.', show: 'm.1', focus: 'm.1' },
        { say: 'Both simplify to three to four, so yes, they are equivalent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which pair of ratios is **equivalent**?',
          choices: ['$6 : 8$ and $15 : 20$', '$2 : 5$ and $4 : 7$', '$3 : 4$ and $4 : 3$', '$5 : 10$ and $10 : 15$'],
          answer: 0,
          working: '$6 : 8$ simplifies to $3 : 4$ (divide by $2$), and $15 : 20$ simplifies to $3 : 4$ (divide by $5$). The others simplify to different ratios.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pair of ratios is equivalent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six to eight simplifies to three to four, dividing by two. Fifteen to twenty simplifies to three to four as well, dividing by five. Choice B adds two to both terms, so those ratios are not equivalent.', show: 'q.answer' },
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
            'A ratio is in **simplest form** when its terms have no common factor except $1$.',
            'To simplify, divide both terms by their greatest common factor: $8 : 12 = 2 : 3$.',
            'Two ratios are equivalent when they simplify to the same ratio.',
            'Adding the same number to both terms does **not** make an equivalent ratio.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A ratio is in simplest form when its terms have no common factor except one.', show: 'sum.0' },
        { say: 'To simplify a ratio, divide both terms by their greatest common factor.', show: 'sum.1' },
        { say: 'Two ratios are equivalent when they simplify to the same ratio.', show: 'sum.2' },
        { say: 'And adding the same number to both terms does not make an equivalent ratio. In the next part, you will use proportions to find a missing term. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
