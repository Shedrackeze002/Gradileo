import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { doubleLine } from '@/content/math6/videos/lib/m6-5-figures.ts';

// Maya's heartbeats: 18 in every 15 seconds, up to one minute.
const heart = (id: string) =>
  figure(
    id,
    [doubleLine({ top: ['0', '18', '36', '54', '72'], bottom: ['0', '15', '30', '45', '60'], titles: ['\\text{Heartbeats}', '\\text{Time (s)}'], titleRoom: 3.4, tones: ['bad', 'adj'] })],
    260,
  );

// The bike ride: 6 km in every 15 minutes, up to one hour.
const bike = (id: string) =>
  figure(
    id,
    [doubleLine({ top: ['0', '6', '12', '18', '24'], bottom: ['0', '15', '30', '45', '60'], titles: ['\\text{Distance (km)}', '\\text{Time (min)}'], titleRoom: 3.8 })],
    240,
  );

const video: Explainer = {
  id: 'm8-3-2-b',
  lessonId: 'm8-3-2',
  title: 'Rates and Unit Rates, Part 2: Scaling Up to a Unit Rate',
  thumbnailTitle: 'Scaling Up to a Unit Rate',
  thumbnail: 'ht',
  summary:
    'Sometimes it is easier to scale up to one unit than to divide. Maya finds 18 heartbeats in 15 seconds; a minute is 60 ÷ 15 = 4 groups of 15 seconds, so her heart rate is 18 × 4 = 72 beats per minute. Dividing first gives the same answer: 18 ÷ 15 = 1.2 beats per second, and 1.2 × 60 = 72. A cyclist who rides 6 km in 15 minutes rides 6 × 4 = 24 km/h.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Proportional Reasoning · Part 2', title: 'Scaling Up to a Unit Rate', subtitle: 'From fifteen seconds to a whole minute' }],
      lines: [
        { say: 'After a warm-up in gym class, Maya checks her pulse and finds eighteen heartbeats in fifteen seconds. What is her heart rate in beats per minute?', show: 'title' },
        { say: 'In this part, you will find a unit rate by scaling up to one whole unit.' },
      ],
    },
    {
      chapter: 'Beats per minute',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Maya finds $18$ heartbeats in $15$ seconds. What is her heart rate in beats per minute?' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Heart rate', md: 'A **heart rate** is the number of heartbeats in **one minute**: a unit rate in beats per minute. One minute is $60$ seconds.' },
      ],
      lines: [
        { say: 'Maya finds eighteen heartbeats in fifteen seconds. What is her heart rate in beats per minute?', show: 'q' },
        { say: 'A heart rate is the number of times a heart beats in one minute. So it is a unit rate, in beats per minute.', show: 'key' },
        { say: 'But Maya only counted for fifteen seconds, not a whole minute. One minute is sixty seconds. How do we get from fifteen seconds to sixty?' },
      ],
    },
    {
      chapter: 'Scaling up',
      layout: 'center',
      main: [
        heart('ht'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['60 \\div 15 = 4', '18 \\times 4 = 72'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Maya’s heart rate is **$72$ beats per minute**.' },
      ],
      lines: [
        { say: 'Here is a double number line. The top line shows heartbeats, and the bottom line shows the time in seconds. In fifteen seconds, there are eighteen heartbeats.', show: ['ht.lines', 'ht.v0', 'ht.v1', 'ht.link1'], focus: 'ht.v1' },
        { say: 'In thirty seconds, twice as long, the heart beats twice as many times: thirty-six.', show: ['ht.v2', 'ht.link2'], focus: 'ht.v2' },
        { say: 'In forty-five seconds, fifty-four beats. And in sixty seconds, a whole minute, seventy-two beats.', show: ['ht.v3', 'ht.v4', 'ht.link3', 'ht.link4'], focus: ['ht.v3', 'ht.v4'] },
        { say: 'In numbers: sixty divided by fifteen is four. So a minute is four groups of fifteen seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'In a minute, there are four times as many beats. Eighteen times four is seventy-two.', show: 'm.1', focus: 'm.1' },
        { say: 'Maya’s heart rate is seventy-two beats per minute.', show: 'a' },
      ],
    },
    {
      chapter: 'Or divide first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['18 \\div 15 = 1.2 \\text{ beats per second}', '1.2 \\times 60 = 72 \\text{ beats per minute}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Scale up when you can', md: 'When the unit you want is a whole number of times what you have, scaling up keeps the numbers whole.' },
      ],
      lines: [
        { say: 'You could divide first instead. Eighteen beats in fifteen seconds is eighteen divided by fifteen, which is one point two beats per second.', show: 'm.0', focus: 'm.0' },
        { say: 'A minute is sixty seconds, so multiply by sixty. One point two times sixty is seventy-two beats per minute. It is the same answer.', show: 'm.1', focus: 'm.1' },
        { say: 'Both ways work. Scaling up was easier here, because sixty seconds is a whole number of groups of fifteen seconds, so the numbers stay whole.', show: 'tip' },
      ],
    },
    {
      chapter: 'A bike ride',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A cyclist rides $6$ km in $15$ minutes. At the same speed, what is the speed in kilometres per hour?' },
        bike('bk'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['60 \\div 15 = 4 \\qquad 6 \\times 4 = 24 \\text{ km/h}'] },
      ],
      lines: [
        { say: 'Let’s try one more. A cyclist rides six kilometres in fifteen minutes. At the same speed, what is the speed in kilometres per hour?', show: 'q' },
        { say: 'The unit we want is one hour, which is sixty minutes. Sixty divided by fifteen is four, so an hour is four groups of fifteen minutes.', show: ['bk.lines', 'bk.v0', 'bk.v1', 'bk.link1'], focus: 'bk.v1' },
        { say: 'In an hour, the cyclist rides four times as far. Six times four is twenty-four. The speed is twenty-four kilometres per hour.', show: ['bk.v2', 'bk.v3', 'bk.v4', 'bk.link4', 'm.0'], focus: ['bk.v4', 'm.0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A swimmer swims $9$ lengths of a pool in $20$ minutes. At the same rate, how many lengths is that per hour?',
          choices: ['$3$ lengths per hour', '$27$ lengths per hour', '$180$ lengths per hour', '$0.45$ lengths per hour'],
          answer: 1,
          working: 'An hour is $60 \\div 20 = 3$ groups of $20$ minutes, so the swimmer swims $9 \\times 3 = 27$ lengths per hour.',
        },
      ],
      lines: [
        { say: 'Your turn. A swimmer swims nine lengths of a pool in twenty minutes. At the same rate, how many lengths is that per hour? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, twenty-seven lengths per hour. Sixty divided by twenty is three, so an hour is three groups of twenty minutes. Nine times three is twenty-seven. Choice A, three, is the number of twenty-minute groups in an hour, not the number of lengths.', show: 'q.answer' },
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
            'To scale up, find how many groups make one unit: $60 \\div 15 = 4$.',
            'Multiply by that number: $18 \\times 4 = 72$ beats per minute.',
            'Dividing first gives the same answer: $18 \\div 15 = 1.2$, and $1.2 \\times 60 = 72$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To scale up to a unit rate, find how many groups make one whole unit, like four groups of fifteen seconds in a minute.', show: 'sum.0' },
        { say: 'Then multiply by that number.', show: 'sum.1' },
        { say: 'Dividing first gives the same answer, but scaling up can keep the numbers whole. In the next part, you will find the cost of one item: a unit price. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
