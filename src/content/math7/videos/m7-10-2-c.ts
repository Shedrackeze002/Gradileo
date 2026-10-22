import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';
import { join, note, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { dotLine } from './lib/m7-10-figures.ts';

// Amara's walking times with the outlier kept: the median, 15.5, sits among the usual times; the
// mean, 19.5, is out in the gap.
const TIMES = [14, 16, 15, 13, 17, 42];
const typical = (id: string) =>
  figure(
    id,
    [
      dotLine({
        min: 10,
        max: 45,
        step: 5,
        values: TIMES,
        odd: [5],
        marks: [
          { id: 'median', value: 15.5, tex: '\\text{median: } 15.5', tone: 'good', height: 1.2, place: 'above left' },
          { id: 'mean', value: 19.5, tex: '\\text{mean: } 19.5', tone: 'theta', height: 2.2, place: 'above right' },
        ],
      }),
    ],
    330,
  );

// Olivia's bowling: five games levelled out to her mean of 120, then a sixth game of 66. The new
// mean, 111, is a dashed line. The scale is 6 units for 140 points.
const K = 6 / 140;
const W = 0.4 + 6 * 1.6;
const bowling = (id: string) =>
  figure(id, [
    barGraph({ categories: ['1', '2', '3', '4', '5', '6'], values: [120, 120, 120, 120, 120, 66], max: 140, step: 20, titles: { x: 'Game', y: 'Score' } }),
    join(seg('new-line', [0, 111 * K], [W, 111 * K], { tone: 'good', dashed: true, weight: 3, group: 'new' }), note('new-label', [W + 0.1, 111 * K], '\\text{new mean } 111', 'right', 'good', 'new'), note('room', [W + 4.2, 111 * K], '', 'center')),
  ]);

const video: Explainer = {
  id: 'm7-10-2-c',
  lessonId: 'm7-10-2',
  title: 'The Effect of Outliers, Part 3: Keeping or Removing an Outlier',
  thumbnailTitle: 'Keeping or Removing an Outlier',
  thumbnail: 'bw',
  summary:
    'If an outlier is a mistake, like a typing error, fix it or leave it out. If it really happened, keep it, but report the median as the typical value: walking times of 13, 14, 15, 16, 17 and 42 minutes have a median of 15.5 but a mean of 19.5. One result can move a mean a lot: a mean of 120 for 5 bowling games means a total of 600, and a sixth game of 66 makes 666 ÷ 6 = 111.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 3', title: 'Keeping or Removing an Outlier', subtitle: 'A mistake, or something real?' }],
      lines: [
        { say: 'You have found an outlier in your data. Should you keep it, or leave it out?', show: 'title' },
        { say: 'In this video, you will decide what to do with an outlier, and see how one unusual result changes a mean.' },
      ],
    },
    {
      chapter: 'A mistake or real?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'If it is a mistake', md: 'Heights in centimetres: $152,\\ 148,\\ 155,\\ \\bad{1{,}500},\\ 150$. Nobody is $1{,}500$ cm tall: it is a typing error. **Fix it** or **leave it out**.' },
        { kind: 'callout', id: 'real', tone: 'key', title: 'If it really happened', md: 'Amara really did take $42$ minutes on a snowy day. **Keep it** in the data, but report the **median** as the typical value.' },
      ],
      lines: [
        { say: 'First ask: is the outlier a mistake, or did it really happen?', show: [] },
        { say: 'Here are some heights in centimetres: one hundred fifty-two, one hundred forty-eight, one hundred fifty-five, one thousand five hundred, and one hundred fifty.', show: 'mis' },
        { say: 'Nobody is one thousand five hundred centimetres tall! Someone typed an extra zero. If an outlier is a mistake like this, fix it, or leave it out.' },
        { say: 'But Amara really did take forty-two minutes on a snowy day. An outlier that really happened is part of the data, so keep it. Then report the median as the typical value.', show: 'real' },
      ],
    },
    {
      chapter: 'Reporting a typical value',
      layout: 'center',
      main: [
        typical('tv'),
        { kind: 'math', id: 'm', size: 'md', lines: ['13,\\ 14,\\ \\mathbf{15},\\ \\mathbf{16},\\ 17,\\ 42', '\\text{median} = (15 + 16) \\div 2 = 15.5'] },
      ],
      lines: [
        { say: 'Keep all six of Amara’s times. In order, they are thirteen, fourteen, fifteen, sixteen, seventeen and forty-two.', show: ['tv.axis', 'tv.dots', 'tv.odd', 'm.0'] },
        { say: 'There are six values, so the median is halfway between the two middle ones, fifteen and sixteen. The median is fifteen point five minutes.', show: ['m.1', 'tv.median'], focus: ['m.1', 'tv.median'] },
        { say: 'Compare it with the mean, nineteen point five minutes. The median sits right among her usual times. The mean is out in the gap. So the median gives the better typical walking time.', show: 'tv.mean', focus: ['tv.median', 'tv.mean'] },
      ],
    },
    {
      chapter: 'One bad game',
      layout: 'split',
      leftWidth: 640,
      left: [bowling('bw')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Olivia’s mean score for $5$ bowling games is $120$. In game $6$ she bowls only $66$. What is her new mean?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['120 \\times 5 = 600', '600 + 66 = 666', '666 \\div 6 = 111'] },
      ],
      lines: [
        { say: 'Olivia’s mean score for five bowling games is one hundred twenty. In game six, she bowls only sixty-six. Find her new mean.', show: 'q' },
        { say: 'We do not know each score, but we do not need them. A mean of one hundred twenty for five games is like five games levelled out to one hundred twenty each. So the total is one hundred twenty times five, which is six hundred.', show: ['bw.scale', 'bw.b0', 'bw.b1', 'bw.b2', 'bw.b3', 'bw.b4', 'm.0'], focus: 'm.0' },
        { say: 'Add game six: six hundred plus sixty-six is six hundred sixty-six.', show: ['bw.b5', 'm.1'], focus: ['bw.b5', 'm.1'] },
        { say: 'Now there are six games, so divide by six. Six hundred sixty-six divided by six is one hundred eleven.', show: ['m.2', 'bw.new'], focus: ['m.2', 'bw.new'] },
        { say: 'Her new mean is one hundred eleven. One low game pulled her mean down by nine points.', focus: 'bw.new' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Averaging the mean with the new score', md: 'The old mean stands for **five** games. Do not just find the mean of $120$ and $66$. Work with the **total** of all the games.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{(120 + 66) \\div 2 = 93} \\quad \\text{wrong}', '\\good{666 \\div 6 = 111} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Watch out. It is tempting to find the mean of the old mean and the new score: one hundred twenty plus sixty-six, divided by two, is ninety-three.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the old mean stands for five games, not one. So find the total of all the games first, then divide by the number of games. The right answer is one hundred eleven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Mia’s mean score for $4$ games is $90$. In game $5$ she scores $40$. What is her new mean?',
          choices: ['$65$', '$100$', '$90$', '$80$'],
          answer: 3,
          working: 'Total of the first four games: $90 \\times 4 = 360$. Add game five: $360 + 40 = 400$. New mean: $400 \\div 5 = 80$.',
        },
      ],
      lines: [
        { say: 'Your turn. Mia’s mean score for four games is ninety. In game five, she scores forty. Find her new mean. Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: eighty. The first four games add to ninety times four, which is three hundred sixty. Add forty to get four hundred, and divide by five games to get eighty. Choice A takes the mean of ninety and forty, as if there were only two games.', show: 'q.answer' },
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
          items: ['If an outlier is a mistake, fix it or leave it out.', 'If it really happened, keep it, and report the median as the typical value.', 'To add a new value to a mean, find the total first: mean × number of values.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If an outlier is a mistake, fix it, or leave it out.', show: 'sum.0' },
        { say: 'If it really happened, keep it, and report the median as the typical value.', show: 'sum.1' },
        { say: 'And to add a new value to a mean, find the total first: the mean times the number of values. In the next lesson, you will read and make circle graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
