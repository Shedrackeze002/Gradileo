import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-3-b',
  lessonId: 'm302-2-3',
  title: 'Permutations with Repetition and Restrictions, Part 2: Fixed Positions',
  thumbnailTitle: 'Fixed Positions',
  thumbnail: 'ends',
  summary: 'When a rule fixes where something goes, place it first, then arrange the rest. Worked examples: 5 friends with the captain in the middle line up in 1 × 4! = 24 ways, and 6 friends with Kai at one of the two ends in 2 × 5! = 240 ways. Part 3 keeps objects together or apart.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 2', title: 'Fixed Positions', subtitle: 'Place the restricted object first' }],
      lines: [
        { say: 'Sometimes a rule fixes where something must go: the captain in the middle of a team photo, or the tallest person at the back.', show: 'title' },
        { say: 'In this video, you will deal with the rule first, by placing the restricted object, and then arrange everything else.' },
      ],
    },
    {
      chapter: 'The captain in the middle',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Five friends line up for a team photo, and the captain must stand in the middle. How many line-ups are possible?' },
        figure('mid', [slots({ values: ['4', '3', '\\thc{1}', '2', '1'], captions: ['', '', '\\text{captain}', '', ''], shade: [2] })], 230),
        { kind: 'math', id: 'm', size: 'md', lines: ['1 \\times 4! = 1 \\times 24 = 24'] },
      ],
      lines: [
        { say: 'Five friends line up for a team photo, and the captain must stand in the middle. How many line-ups are possible?', show: 'p' },
        { say: 'Draw a box for each of the five spots. The middle spot has a rule, so deal with it first.', show: ['mid.boxes', 'mid.f2'] },
        { say: 'Only the captain can stand there, so the middle box has one choice.', show: ['mid.v2', 'mid.c2'], focus: 'mid.v2' },
        { say: 'Now the other four friends fill the other four spots, in any order. That is four, then three, then two, then one choices: four factorial, or twenty-four.', show: ['mid.v0', 'mid.v1', 'mid.v3', 'mid.v4'], focus: ['mid.v0', 'mid.v1', 'mid.v3', 'mid.v4'] },
        { say: 'Multiply: one times twenty-four is twenty-four line-ups.', show: ['mid.times', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'At either end',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Six friends line up, and Kai must stand at one of the two ends. How many line-ups are possible?' },
        figure('ends', [
          slots({ name: 'a', values: ['\\thc{\\text{K}}', '5', '4', '3', '2', '1'], shade: [0], at: [0, 2], size: 1.3, gap: 0.6 }),
          slots({ name: 'b', values: ['5', '4', '3', '2', '1', '\\thc{\\text{K}}'], shade: [5], at: [0, 0], size: 1.3, gap: 0.6 }),
        ], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 5! = 2 \\times 120 = 240'] },
      ],
      lines: [
        { say: 'Now a rule with a choice in it. Six friends line up, and Kai must stand at one of the two ends. How many line-ups are possible?', show: 'p' },
        { say: 'Deal with Kai first. Kai can stand at the left end, or at the right end: two choices of spot.', show: ['ends.a-boxes', 'ends.a-f0', 'ends.a-v0', 'ends.b-boxes', 'ends.b-f5', 'ends.b-v5'], focus: ['ends.a-v0', 'ends.b-v5'] },
        { say: 'Whichever end Kai takes, the other five friends fill the remaining five spots in any order: five factorial, which is 120 ways.', show: ['ends.a-values', 'ends.b-values'], focus: ['ends.a-values', 'ends.b-values'] },
        { say: 'So multiply: two times 120 is 240 line-ups. That is 120 with Kai on the left, and another 120 with Kai on the right.', show: ['ends.a-times', 'ends.b-times', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Why the rule goes first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Place restricted objects first', md: 'When a rule fixes where something goes, deal with that rule first. Then arrange everything else, and multiply.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(\\text{ways to place it}) \\times (\\text{ways to arrange the rest})'] },
      ],
      lines: [
        { say: 'Why does the rule go first? Suppose you filled the line from left to right instead. The first spot would have six choices, but you could not say how many choices the last spot has, because that depends on whether Kai has already been placed.', show: 'key' },
        { say: 'Placing the restricted object first removes that problem. Its choices are clear, and after it is placed, everyone else is free to go anywhere.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the counting principle multiplies the two: the ways to place the restricted object, times the ways to arrange the rest.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the choices for the restricted object', md: '“At one of the two ends” gives Kai **2** choices, not 1. Counting only $5! = 120$ misses every line-up with Kai at the other end.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{5! = 120}', '\\good{2 \\times 5! = 240}'] },
      ],
      lines: [
        { say: 'A common mistake is to place the restricted object, and then forget how many ways there were to place it. For Kai, counting only five factorial, 120, misses every line-up with Kai at the other end.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Kai has two possible spots, so there are two times 120, or 240, line-ups.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Seven students line up for a photo. Ana must stand at the left end and Ben at the right end. How many line-ups are possible?',
          choices: ['$5040$', '$120$', '$240$', '$720$'],
          answer: 1,
          working: 'Ana and Ben each have 1 spot. The other 5 students fill the middle 5 spots: $1 \\times 1 \\times 5! = 120$.',
        },
      ],
      lines: [
        { say: 'Your turn. Seven students line up for a photo. Ana must stand at the left end, and Ben at the right end. How many line-ups are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 120. Ana and Ben each have exactly one spot. The other five students fill the five spots in the middle, in five factorial, or 120, ways. Choice C, 240, lets Ana and Ben swap ends, but the rule gives each of them a fixed end.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Deal with the restricted object first, then arrange the rest.', 'Multiply the ways to place it by the ways to arrange the others.', 'Captain in the middle: $1 \\times 4! = 24$. At either end: $2 \\times 5! = 240$.'] }],
      lines: [
        { say: 'Let’s sum up. Deal with the restricted object first, then arrange the rest.', show: 'sum.0' },
        { say: 'Multiply the ways to place the restricted object by the ways to arrange the others.', show: 'sum.1' },
        { say: 'With the captain in the middle, that was twenty-four line-ups, and with Kai at either end, 240. In part three, we keep objects together, or apart. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
