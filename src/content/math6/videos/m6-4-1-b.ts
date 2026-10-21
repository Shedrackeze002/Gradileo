import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar, pie } from '@/content/math5/videos/lib/m5-5-figures.ts';

// Each friend has a colour: the first friend's pieces are yellow, then blue, green and orange.
const FRIENDS: DiagramTone[] = ['theta', 'adj', 'good', 'opp'];

// Way 1: three pizzas cut into quarters.
const quarters = (id: string) => figure(id, [0, 1, 2].map((k) => pie({ name: `p${k}`, parts: 4, shaded: 4, tones: FRIENDS, at: [k * 3.8, 0] })), 240);

// Way 2: two pizzas cut in half (one half for each friend) and one cut into quarters.
const halves = (id: string) =>
  figure(id, [
    pie({ name: 'p0', parts: 2, shaded: 2, tones: ['theta', 'adj'], at: [0, 0] }),
    pie({ name: 'p1', parts: 2, shaded: 2, tones: ['good', 'opp'], at: [3.8, 0] }),
    pie({ name: 'p2', parts: 4, shaded: 4, tones: FRIENDS, at: [7.6, 0] }),
  ], 240);

// Five sandwiches for two campers: two whole sandwiches each, and the last one cut in half.
const sandwiches = (id: string) =>
  figure(id, [
    bar({ name: 's0', parts: 1, shaded: 1, tone: 'theta', at: [0, 0], width: 2.2, height: 1.2 }),
    bar({ name: 's1', parts: 1, shaded: 1, tone: 'theta', at: [2.6, 0], width: 2.2, height: 1.2 }),
    bar({ name: 's2', parts: 1, shaded: 1, tone: 'adj', at: [5.2, 0], width: 2.2, height: 1.2 }),
    bar({ name: 's3', parts: 1, shaded: 1, tone: 'adj', at: [7.8, 0], width: 2.2, height: 1.2 }),
    bar({ name: 's4', parts: 2, shaded: 2, tones: ['theta', 'adj'], at: [10.4, 0], width: 2.2, height: 1.2 }),
  ], 200);

// Six eighths and three quarters cover the same part of a bar.
const same = (id: string) =>
  figure(id, [
    bar({ name: 'e', parts: 8, shaded: 6, tone: 'good', at: [0, 2.2], width: 8, label: '\\dfrac68' }),
    bar({ name: 'q', parts: 4, shaded: 3, tone: 'adj', at: [0, 0], width: 8, label: '\\dfrac34' }),
  ], 250);

const video: Explainer = {
  id: 'm6-4-1-b',
  lessonId: 'm6-4-1',
  title: 'Fractions as Quotients, Part 2: More Than One Way to Share',
  thumbnailTitle: 'More Than One Way to Share',
  thumbnail: 'hv',
  summary:
    'Three pizzas for four friends can be cut into quarters, or two pizzas into halves and one into quarters: either way each friend gets 1/2 + 1/4 = 3/4. Five sandwiches for two campers is 5 ÷ 2 = 5/2 = 2 1/2 each, and 6 pizzas for 8 friends is 6/8 = 3/4, the same share as 3 for 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 2', title: 'More Than One Way to Share', subtitle: 'Different cuts, the same share' }],
      lines: [
        { say: 'There is more than one way to cut three pizzas for four friends. Does each friend still get the same amount?', show: 'title' },
        { say: 'In this part, you will model sharing in different ways, and share when everyone gets more than one whole.' },
      ],
    },
    {
      chapter: 'Way 1: all quarters',
      layout: 'center',
      main: [quarters('qt'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac14 + \\dfrac14 + \\dfrac14 = \\dfrac34'] }],
      lines: [
        { say: 'Here is the way we shared before. Cut all three pizzas into quarters.', show: ['qt.p0-rim', 'qt.p1-rim', 'qt.p2-rim', 'qt.p0-shade', 'qt.p1-shade', 'qt.p2-shade'] },
        { say: 'Each friend takes one quarter from each pizza. The first friend gets the three yellow pieces: three quarters of a pizza.', show: 'm.0', focus: ['qt.p0-s0', 'qt.p1-s0', 'qt.p2-s0', 'm.0'] },
      ],
    },
    {
      chapter: 'Way 2: halves and quarters',
      layout: 'center',
      main: [halves('hv'), { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac12 + \\dfrac14 = \\dfrac24 + \\dfrac14 = \\dfrac34'] }],
      lines: [
        { say: 'Here is another way. Cut two of the pizzas in half. That makes four halves, so each friend gets one half.', show: ['hv.p0-rim', 'hv.p1-rim', 'hv.p0-shade', 'hv.p1-shade'] },
        { say: 'Cut the last pizza into quarters. Each friend gets one quarter from it.', show: ['hv.p2-rim', 'hv.p2-shade'] },
        { say: 'Look at the first friend’s yellow pieces: one half, and one quarter.', focus: ['hv.p0-s0', 'hv.p2-s0'] },
        { say: 'One half is the same as two quarters. So one half and one quarter is two quarters and one quarter, which makes three quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'The answer is the same! However you cut the pizzas, each friend gets three quarters of a pizza, because three divided by four is always three quarters.' },
      ],
    },
    {
      chapter: 'More than one whole each',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: '$5$ sandwiches are shared equally by $2$ campers. How much does each camper get?' },
        sandwiches('sw'),
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\div 2 = \\dfrac{5}{2}', '5 \\div 2 = 2 \\text{ R } 1 \\;\\to\\; 2 \\text{ whole sandwiches and } \\dfrac12', '\\dfrac{5}{2} = 2\\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Sometimes each share is more than one whole. Five sandwiches are shared equally by two campers. How much does each camper get?', show: ['t', 'sw.s0-frame', 'sw.s1-frame', 'sw.s2-frame', 'sw.s3-frame', 'sw.s4-frame'] },
        { say: 'Each camper gets five divided by two, which is five halves of a sandwich. But what does that look like?', show: 'm.0', focus: 'm.0' },
        { say: 'Five divided by two is two, remainder one. So each camper gets two whole sandwiches, and one sandwich is left over.', show: ['sw.s0-shade', 'sw.s1-shade', 'sw.s2-shade', 'sw.s3-shade', 'm.1'], focus: 'm.1' },
        { say: 'Cut the last sandwich in half. Each camper gets one half more.', show: 'sw.s4-shade', focus: 'sw.s4-shade' },
        { say: 'So each camper gets two and one half sandwiches. A number like two and one half, with a whole number part and a fraction part, is a mixed number. Five halves and two and one half are the same amount.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Equivalent fractions, same share',
      layout: 'center',
      main: [
        same('sm'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['6 \\div 8 = \\dfrac{6}{8} = \\dfrac{6 \\div 2}{8 \\div 2} = \\dfrac{3}{4}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Equivalent fractions, same share', md: 'Equivalent fractions show the same quotient: $\\dfrac{6}{8} = \\dfrac{3}{4}$.' },
      ],
      lines: [
        { say: 'Here is something neat. Six pizzas shared by eight friends gives six eighths of a pizza each.', show: ['sm.e-frame', 'sm.e-shade', 'sm.e-label'] },
        { say: 'Divide the top and the bottom by two. Six eighths equals three quarters.', show: ['sm.q-frame', 'sm.q-shade', 'sm.q-label', 'm.0'], focus: 'm.0' },
        { say: 'Look at the bars: six eighths and three quarters cover the same amount. That makes sense. Six pizzas for eight friends is like two tables, each with three pizzas for four friends.', focus: ['sm.e-shade', 'sm.q-shade'] },
        { say: 'Equivalent fractions show the same quotient, so they give the same share.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$7$ granola bars are shared equally by $2$ hikers. How many bars does each hiker get?',
          choices: ['$\\dfrac{2}{7}$', '$3$', '$2\\dfrac{1}{2}$', '$3\\dfrac{1}{2}$'],
          answer: 3,
          working: '$7 \\div 2 = \\tfrac{7}{2}$. $7 \\div 2 = 3$ R $1$, so each hiker gets $3$ whole bars, and the last bar is cut in half: $3\\tfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Seven granola bars are shared equally by two hikers. How many bars does each hiker get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, three and one half bars. Seven divided by two is three, remainder one. So each hiker gets three whole bars, and the last bar is cut in half. Choice A, two sevenths, flips the fraction.', show: 'q.answer' },
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
            'You can share in different ways, but each share is always the same: $\\dfrac12 + \\dfrac14 = \\dfrac34$.',
            'When there are more wholes than shares, each share is more than one whole: $5 \\div 2 = \\dfrac52 = 2\\dfrac12$.',
            'Equivalent fractions show the same share: $\\dfrac68 = \\dfrac34$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. You can cut things up in different ways, but each equal share comes out the same.', show: 'sum.0' },
        { say: 'When there are more wholes than shares, each share is more than one whole. Five divided by two is five halves, or two and one half.', show: 'sum.1' },
        { say: 'And equivalent fractions show the same share. In the next part, you will see that every fraction is a division, and turn a fraction into a decimal. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
