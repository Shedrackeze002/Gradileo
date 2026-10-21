import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { intLine } from '@/content/math7/videos/lib/m7-4-figures.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';
import { chips, groupIds, groupsOf } from './lib/m8-5-figures.ts';

// A positive counter (+1) and a negative counter (−1).
const pair = (id: string) =>
  figure(
    id,
    [
      chips({
        chips: [
          { id: 'p', sign: '+', col: 0, row: 0 },
          { id: 'n', sign: '-', col: 2.5, row: 0 },
        ],
        notes: [
          { id: 'pl', col: 0, row: 0.5, tex: '+1', tone: 'theta', place: 'below' },
          { id: 'nl', col: 2.5, row: 0.5, tex: '-1', tone: 'bad', place: 'below' },
        ],
      }),
    ],
    190,
  );

// Three groups of four counters of one sign, two by two, each box labelled with its value.
const threeFours = (id: string, sign: '+' | '-') => {
  const g = groupsOf({ prefix: 'g', groups: 3, size: 4, sign, perRow: 2, space: 1.6, labels: Array(3).fill(sign === '+' ? '+4' : '-4'), tone: sign === '+' ? 'theta' : 'bad' });
  return figure(id, [chips(g)], 300);
};
const group = (fig: string, k: number) => [...groupIds(fig, 'g', k, 4), `${fig}.gbox${k}`];

// 3 × (−4): three jumps of −4 from 0 to −12.
const jumps = (id: string) =>
  figure(
    id,
    [
      intLine({
        min: -14,
        max: 2,
        every: 2,
        moves: [
          { id: 'a', from: 0, to: -4, hop: 0, tone: 'adj', label: '-4' },
          { id: 'b', from: -4, to: -8, hop: 0, tone: 'adj', label: '-4' },
          { id: 'c', from: -8, to: -12, hop: 0, tone: 'adj', label: '-4' },
        ],
        points: [
          { id: 'start', value: 0, tex: '\\text{start}', tone: 'theta' },
          { id: 'end', value: -12, tex: '\\text{end}', tone: 'good' },
        ],
      }),
    ],
    250,
  );

// The cold night: four drops of 3 degrees, one each hour, and the total change of −12.
const night = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -12,
        max: 0,
        every: 3,
        unit: 0.35,
        moves: [
          { id: 'h0', from: 0, to: -3, label: '-3', tone: 'adj', x: 0.9 },
          { id: 'h1', from: -3, to: -6, label: '-3', tone: 'adj', x: 1.5 },
          { id: 'h2', from: -6, to: -9, label: '-3', tone: 'adj', x: 2.1 },
          { id: 'h3', from: -9, to: -12, label: '-3', tone: 'adj', x: 2.7 },
          { id: 'total', from: 0, to: -12, label: '-12', tone: 'good', x: 4.7 },
        ],
      }),
    ],
    470,
  );

const video: Explainer = {
  id: 'm8-5-1',
  lessonId: 'm8-5-1',
  title: 'Multiplying Integers, Part 1: Equal Groups',
  thumbnailTitle: 'Equal Groups of Integers',
  thumbnail: 'ng',
  summary:
    'Multiplying is adding equal groups: 3 × (−4) means 3 groups of (−4), which is (−4) + (−4) + (−4) = −12, twelve negative counters. On a number line, three jumps of −4 from 0 end at −12. A temperature that drops 3 °C every hour for 4 hours changes by 4 × (−3) = −12 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Multiplying and Dividing Integers · Part 1', title: 'Equal Groups', subtitle: 'Multiplying as repeated addition' }],
      lines: [
        { say: 'On a cold night, the temperature drops three degrees every hour, for four hours. What is the total change in temperature? To find out, you can multiply integers.', show: 'title' },
        { say: 'In this part, you will see what it means to multiply a positive integer by a negative integer, with groups of counters and with jumps on a number line.' },
      ],
    },
    {
      chapter: 'Integers and counters',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Integers', md: 'The **integers** are the whole numbers, their opposites and zero: $\\ldots,\\ -3,\\ -2,\\ -1,\\ 0,\\ 1,\\ 2,\\ 3,\\ \\ldots$' },
        pair('pr'),
      ],
      lines: [
        { say: 'First, a quick reminder. The integers are the whole numbers, their opposites, and zero. So negative three, negative two, negative one, zero, one, two and three are all integers.', show: 'def' },
        { say: 'We can show integers with counters. A yellow counter with a plus sign is worth positive one.', show: ['pr.p', 'pr.pl'] },
        { say: 'A red counter with a minus sign is worth negative one. Four red counters together are worth negative four.', show: ['pr.n', 'pr.nl'] },
      ],
    },
    {
      chapter: 'Equal groups',
      layout: 'center',
      main: [threeFours('pg', '+'), { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times 4 = 4 + 4 + 4 = 12'] }],
      lines: [
        { say: 'Multiplying is a quick way to add equal groups. Three times four means three groups of four.', show: [...group('pg', 0), ...group('pg', 1), ...group('pg', 2)] },
        { say: 'Altogether there are twelve positive counters. So three times four equals four plus four plus four, which is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The first number tells you how many groups there are. The second number tells you what is in each group.' },
      ],
    },
    {
      chapter: 'Groups of negative four',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $3 \\times (-4)$.' },
        threeFours('ng', '-'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times (-4) = (-4) + (-4) + (-4)', '3 \\times (-4) = -12'] },
      ],
      lines: [
        { say: 'Now try it with a negative integer. What is three times negative four? It means three groups of negative four.', show: 'q' },
        { say: 'Here is one group: four negative counters. This group is worth negative four.', show: group('ng', 0) },
        { say: 'Here is a second group of negative four, and a third.', show: [...group('ng', 1), ...group('ng', 2)] },
        { say: 'Adding the groups gives negative four, plus negative four, plus negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'Count all the counters. There are twelve negative counters, so three times negative four equals negative twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Jumps on a number line',
      layout: 'center',
      main: [jumps('nl'), { kind: 'math', id: 'm', size: 'lg', lines: ['3 \\times (-4) = -12'] }],
      lines: [
        { say: 'You can also multiply on a number line. Start at zero.', show: ['nl.axis', 'nl.start'] },
        { say: 'Three times negative four means three jumps of negative four. A negative jump goes to the left. The first jump lands on negative four.', show: 'nl.a', focus: 'nl.a' },
        { say: 'The second jump lands on negative eight.', show: 'nl.b', focus: 'nl.b' },
        { say: 'And the third jump lands on negative twelve.', show: ['nl.c', 'nl.end'], focus: ['nl.c', 'nl.end'] },
        { say: 'Three jumps of negative four take you to negative twelve. The number line gives the same answer: three times negative four equals negative twelve.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The cold night',
      layout: 'split',
      leftWidth: 420,
      left: [night('cn')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The temperature drops $3^\\circ\\text{C}$ every hour for $4$ hours. What is the total change?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\times (-3)', '= (-3) + (-3) + (-3) + (-3)', '= -12'] },
      ],
      lines: [
        { say: 'Now back to the cold night. The temperature drops three degrees Celsius every hour, for four hours. What is the total change?', show: 'q' },
        { say: 'A drop of three degrees is a change of negative three. In the first hour, the temperature changes by negative three.', show: ['cn.axis', 'cn.h0'], focus: 'cn.h0' },
        { say: 'Each hour brings one more change of negative three. There are four hours, so there are four groups of negative three: four times negative three.', show: ['cn.h1', 'cn.h2', 'cn.h3', 'm.0'], focus: ['cn.h1', 'cn.h2', 'cn.h3', 'm.0'] },
        { say: 'Negative three, plus negative three, plus negative three, plus negative three, is negative twelve.', show: ['m.1', 'm.2', 'cn.total'], focus: ['m.2', 'cn.total'] },
        { say: 'So the temperature changes by negative twelve degrees Celsius. By the end of the four hours, it is twelve degrees colder than at the start.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use equal groups to find $5 \\times (-2)$.',
          choices: ['$10$', '$-10$', '$3$', '$-7$'],
          answer: 1,
          working: '$5 \\times (-2)$ is $5$ groups of $(-2)$: $(-2) + (-2) + (-2) + (-2) + (-2) = -10$, or ten negative counters.',
        },
      ],
      lines: [
        { say: 'Your turn. Use equal groups to find five times negative two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative ten. Five groups of negative two make ten negative counters. Choice A has the right size but the wrong sign: groups of negative counters always make a negative total.', show: 'q.answer' },
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
            '$3 \\times (-4)$ means $3$ groups of $(-4)$.',
            'Add the groups: $(-4) + (-4) + (-4) = -12$.',
            'On a number line, $3$ jumps of $-4$ from $0$ end at $-12$.',
            'A positive integer times a negative integer is negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Three times negative four means three groups of negative four.', show: 'sum.0' },
        { say: 'Adding the groups gives negative twelve.', show: 'sum.1' },
        { say: 'On a number line, three jumps of negative four from zero end at negative twelve.', show: 'sum.2' },
        { say: 'Groups of negative counters make a negative total, so a positive integer times a negative integer is negative. In the next part, you will see what happens when the first number is negative. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
