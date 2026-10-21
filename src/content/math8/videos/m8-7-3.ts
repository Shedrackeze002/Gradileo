import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { areaModel } from '@/video/algebra.ts';
import { tileGroups } from '@/content/math6/videos/lib/m6-6-figures.ts';

// 3(x + 2): three groups, each with one x-tile and two unit tiles.
const groups = (id: string) =>
  figure(id, [tileGroups({ groups: [0, 1, 2].map((g) => ({ id: `g${g}`, x: 1, units: 2, caption: 'x + 2' })), gap: 1 })], 300);
const group = (fig: string, g: number) => [`${fig}.g${g}-xs`, `${fig}.g${g}-us`, `${fig}.g${g}-box`, `${fig}.g${g}-cap`];

// Area models for 3(x + 2) and −2(x − 5).
const area = (id: string, top: string[], side: string, cells: string[]) => figure(id, [areaModel({ top, side: [side], cells: [cells] })], 220);

const video: Explainer = {
  id: 'm8-7-3',
  lessonId: 'm8-7-3',
  title: 'Equations with Brackets, Part 1: What the Brackets Mean',
  thumbnailTitle: 'What the Brackets Mean',
  thumbnail: 'gp',
  summary:
    '3(x + 2) means 3 groups of x + 2: three x-tiles and six unit tiles, so 3(x + 2) = 3x + 6. The distributive property says a number outside brackets multiplies each term inside: a(x + b) = ax + ab. With a negative number outside, watch the signs: −2(x − 5) = −2x + 10. 3(x − 4) is not 3x − 4; the 3 multiplies both terms, so 3(x − 4) = 3x − 12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations · Part 1', title: 'What the Brackets Mean', subtitle: 'The distributive property' }],
      lines: [
        { say: 'Three friends each buy a hockey ticket, and each pays a four-dollar service fee on top. Each friend pays for the same two things, so the total is three groups of a ticket plus a fee.', show: 'title' },
        { say: 'Brackets show groups like this. In this part, you will see what brackets mean, and how to multiply them out with the distributive property.' },
      ],
    },
    {
      chapter: 'Three groups',
      layout: 'center',
      main: [groups('gp'), { kind: 'math', id: 'm', size: 'lg', lines: ['3(x + 2) = 3x + 6'] }],
      lines: [
        { say: 'Three times the bracket x plus two means three groups of x plus two.' },
        { say: 'Here is one group: one x-tile and two unit tiles.', show: group('gp', 0) },
        { say: 'Here is a second group, and a third.', show: [...group('gp', 1), ...group('gp', 2)] },
        { say: 'Altogether, there are three x-tiles and six unit tiles. So three times the bracket x plus two equals three x plus six.', show: 'm.0', focus: ['gp.g0-xs', 'gp.g1-xs', 'gp.g2-xs', 'gp.g0-us', 'gp.g1-us', 'gp.g2-us', 'm.0'] },
      ],
    },
    {
      chapter: 'The distributive property',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Distributive property', md: 'A number outside brackets multiplies **each** term inside: $a(x + b) = ax + ab$.' },
        area('am', ['x', '+2'], '3', ['3x', '+6']),
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(x + 2) = 3 \\times x + 3 \\times 2 = 3x + 6'] },
      ],
      lines: [
        { say: 'This is called the distributive property. A number outside brackets multiplies each term inside.', show: 'def' },
        { say: 'An area model shows it. Put the three down the side, and the x and the two along the top.', show: ['am.top', 'am.side', 'am.outline', 'am.grid'] },
        { say: 'Three times x is three x, and three times two is six.', show: ['am.c0-0', 'am.c0-1'], focus: ['am.c0-0', 'am.c0-1'] },
        { say: 'Add the parts: three times the bracket x plus two equals three x plus six.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A negative outside',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Expand $-2(x - 5)$.' },
        area('an', ['x', '-5'], '-2', ['-2x', '+10']),
        { kind: 'math', id: 'm', size: 'lg', lines: ['-2(x - 5) = -2x + 10'] },
      ],
      lines: [
        { say: 'With a negative number outside the brackets, watch the signs. Expand the negative two, times the bracket x minus five. Expand means multiply out the brackets.', show: ['q', 'an.top', 'an.side', 'an.outline', 'an.grid'] },
        { say: 'Negative two times x is negative two x.', show: 'an.c0-0', focus: 'an.c0-0' },
        { say: 'Negative two times negative five is positive ten, because a negative times a negative is positive.', show: 'an.c0-1', focus: 'an.c0-1' },
        { say: 'So negative two, times the bracket x minus five, equals negative two x plus ten.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying only the first term', md: '$3(x - 4)$ is **not** $3x - 4$. The $3$ multiplies **both** terms.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(x - 4) = 3x - 4 \\;\\bad{\\times}', '3(x - 4) = 3x - 12 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some students write three times the bracket x minus four as three x minus four. They only multiplied the x.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the three multiplies both terms. Three times x is three x, and three times negative four is negative twelve. So the answer is three x minus twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Think of the groups: three groups of x minus four hold three x-tiles, and three groups of negative four, which make negative twelve.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand $-3(x - 4)$.',
          choices: ['$-3x - 4$', '$-3x - 12$', '$-3x + 12$', '$3x + 12$'],
          answer: 2,
          working: '$-3 \\times x = -3x$ and $-3 \\times (-4) = 12$, so $-3(x - 4) = -3x + 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand the negative three, times the bracket x minus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative three x plus twelve. Negative three times x is negative three x, and negative three times negative four is positive twelve. Choice B forgets that a negative times a negative is positive.', show: 'q.answer' },
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
            '$3(x + 2)$ means $3$ groups of $x + 2$.',
            'The distributive property: the number outside multiplies each term inside.',
            '$3(x + 2) = 3x + 6$ and $-2(x - 5) = -2x + 10$.',
            'Multiply every term, and watch the signs.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Three times the bracket x plus two means three groups of x plus two.', show: 'sum.0' },
        { say: 'By the distributive property, the number outside multiplies each term inside.', show: 'sum.1' },
        { say: 'So it equals three x plus six. And negative two times the bracket x minus five equals negative two x plus ten.', show: 'sum.2' },
        { say: 'Multiply every term in the brackets, and watch the signs. In the next part, you will solve equations with brackets, in two ways. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
