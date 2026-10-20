import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { link } from '@/content/math5/videos/lib/m5-1-figures.ts';
import { note, xAt } from './lib/m6-1-figures.ts';

// The number line as a mirror at zero: 3 and −3, then 5 and −5, the same distance from zero on each side.
const mirror = figure(
  'mr',
  [
    numberLine({
      min: -6,
      max: 6,
      step: 1,
      points: [
        { id: 'm3', value: -3, tex: '-3', tone: 'adj' },
        { id: 'p3', value: 3, tex: '3', tone: 'adj' },
        { id: 'm5', value: -5, tex: '-5', tone: 'opp' },
        { id: 'p5', value: 5, tex: '5', tone: 'opp' },
      ],
    }),
    link({ id: 'glass', from: [xAt(0, -6, 6), -1.1], to: [xAt(0, -6, 6), 1.5], tone: 'theta' }),
    note({ id: 'glass-label', at: [xAt(0, -6, 6), 1.75], tex: '\\text{mirror}', tone: 'theta' }),
  ],
  320,
);

// The opposite of −12: 12 units left of zero, so 12 units right of zero.
const twelve = figure(
  'tw',
  [
    numberLine({
      min: -14,
      max: 14,
      step: 1,
      every: 2,
      spans: [
        { id: 'left', from: -12, to: 0, tone: 'adj', label: '12\\text{ units}' },
        { id: 'right', from: 0, to: 12, tone: 'opp', label: '12\\text{ units}' },
      ],
      points: [
        { id: 'm12', value: -12, tex: '-12', tone: 'adj' },
        { id: 'p12', value: 12, tex: '12', tone: 'opp' },
      ],
    }),
  ],
  300,
);

// Two opposites 10 units apart: zero is halfway, so each is 5 units from zero.
const apart = figure(
  'ap',
  [
    numberLine({
      min: -7,
      max: 7,
      step: 1,
      spans: [
        { id: 'all', from: -5, to: 5, tone: 'theta', label: '10\\text{ units}' },
        { id: 'l5', from: -5, to: 0, tone: 'adj', label: '5' },
        { id: 'r5', from: 0, to: 5, tone: 'opp', label: '5' },
      ],
      points: [
        { id: 'zero', value: 0, tex: '', tone: 'ink' },
        { id: 'm5', value: -5, tex: '', tone: 'adj' },
        { id: 'p5', value: 5, tex: '', tone: 'opp' },
      ],
    }),
  ],
  280,
);

// Owing $14 is −14 dollars; earning $14 brings the money back to zero.
const debt = figure(
  'db',
  [
    numberLine({
      min: -16,
      max: 4,
      step: 1,
      every: 2,
      spans: [{ id: 'earn', from: -14, to: 0, tone: 'good', label: '\\text{earn } \\$14' }],
      points: [
        { id: 'owe', value: -14, tex: '-14', tone: 'bad' },
        { id: 'zero', value: 0, tex: '0', tone: 'ink' },
      ],
    }),
  ],
  280,
);

const video: Explainer = {
  id: 'm6-1-1-d',
  lessonId: 'm6-1-1',
  title: 'Negative Numbers and Magnitude, Part 4: Opposites',
  thumbnailTitle: 'Opposites',
  thumbnail: 'mr',
  summary: 'Opposites (additive inverses) have the same magnitude but different signs, like 3 and −3: the number line is a mirror at zero. The opposite of −12 is 12, two opposites 10 units apart are 5 and −5, and someone who owes $14 must earn the opposite, $14, to get back to zero.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 4', title: 'Opposites', subtitle: 'The same distance from zero, on different sides' }],
      lines: [
        { say: 'Stand in front of a mirror and raise your right hand. Your reflection raises the hand on the other side. The number line has a mirror like that, right at zero.', show: 'title' },
        { say: 'In this video, you will learn about opposites: pairs of numbers that are the same distance from zero, on different sides of it.' },
      ],
    },
    {
      chapter: 'Opposites',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Opposites (additive inverses)', md: 'Two numbers are **opposites** when they have the same magnitude but different signs, like $3$ and $-3$. A number and its opposite are called **additive inverses**.' },
        mirror,
      ],
      lines: [
        { say: 'Two numbers are opposites when they have the same magnitude but different signs. Three and negative three are opposites.', show: 'def' },
        { say: 'A number and its opposite have another name: additive inverses. It is a long name, but it means the same thing. You will see where the name comes from when we add positive and negative numbers.' },
        { say: 'Look at the number line. Three is three units to the right of zero. Negative three is three units to the left of zero.', show: ['mr.axis', 'mr.m3', 'mr.p3'], focus: ['mr.m3', 'mr.p3'] },
        { say: 'Picture a mirror standing at zero. Negative three is the reflection of three.', show: ['mr.glass', 'mr.glass-label'], focus: 'mr.glass' },
        { say: 'Every positive number has an opposite negative number, the same distance away on the other side. Five and negative five are opposites as well.', show: ['mr.m5', 'mr.p5'], focus: ['mr.m5', 'mr.p5'] },
      ],
    },
    {
      chapter: 'Finding an opposite',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'What is the opposite of $-12$?' }, twelve, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{The opposite of } {-12} \\text{ is } 12.'] }],
      lines: [
        { say: 'What is the opposite of negative twelve?', show: 'q' },
        { say: 'Find negative twelve on the number line. It is twelve units to the left of zero.', show: ['tw.axis', 'tw.m12', 'tw.left'], focus: ['tw.m12', 'tw.left'] },
        { say: 'Its opposite is the same distance on the other side. The number twelve units to the right of zero is twelve.', show: ['tw.right', 'tw.p12'], focus: ['tw.right', 'tw.p12'] },
        { say: 'So the opposite of negative twelve is twelve. To find an opposite, keep the magnitude and change the sign.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Two opposites',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'Two numbers are opposites. On a number line, they are $10$ units apart. What are the numbers?' }, apart, { kind: 'math', id: 'm', size: 'md', lines: ['10 \\div 2 = 5', '5 \\text{ and } {-5}'] }],
      lines: [
        { say: 'Here is a puzzle. Two numbers are opposites. On a number line, they are ten units apart. What are the numbers?', show: ['q', 'ap.axis', 'ap.all'], focus: 'ap.all' },
        { say: 'Opposites are the same distance from zero. So zero is exactly halfway between them.', show: 'ap.zero', focus: 'ap.zero' },
        { say: 'Half of ten is five. So each number is five units from zero.', hide: 'ap.all', show: ['ap.l5', 'ap.r5', 'm.0'], focus: ['ap.l5', 'ap.r5', 'm.0'] },
        { say: 'The numbers are five and negative five. Check: from negative five to five is ten units. It works!', show: ['ap.m5', 'ap.p5', 'm.1'], focus: ['ap.m5', 'ap.p5', 'm.1'] },
      ],
    },
    {
      chapter: 'Opposites in real life',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Getting back to zero', md: 'If Kiona owes \\$14, her money is $-14$ dollars. To get back to \\$0, she needs to earn the opposite: \\$14.' },
        debt,
      ],
      lines: [
        { say: 'Opposites show up in real life. Kiona owes fourteen dollars. So Kiona’s money is negative fourteen dollars.', show: ['tip', 'db.axis', 'db.owe'], focus: 'db.owe' },
        { say: 'How much does Kiona need to earn to get back to zero dollars? The opposite amount: fourteen dollars.', show: ['db.earn', 'db.zero'], focus: 'db.earn' },
        { say: 'Negative fourteen is fourteen units from zero, so it takes fourteen units the other way to get back to zero.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two numbers are opposites. On a number line, they are $16$ units apart. What are the numbers?',
          choices: ['$16$ and $-16$', '$0$ and $16$', '$8$ and $-8$', '$4$ and $-4$'],
          answer: 2,
          working: 'Zero is halfway between opposites. Half of $16$ is $8$, so the numbers are $8$ and $-8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two numbers are opposites. On a number line, they are sixteen units apart. What are the numbers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, eight and negative eight. Zero is halfway between them, and half of sixteen is eight. Choice A, sixteen and negative sixteen, are thirty-two units apart.', show: 'q.answer' },
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
            '**Opposites** (additive inverses) have the same magnitude and different signs, like $9$ and $-9$.',
            'The number line is a mirror at $0$.',
            'To find an opposite, keep the magnitude and change the sign.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Opposites, or additive inverses, have the same magnitude and different signs, like nine and negative nine.', show: 'sum.0' },
        { say: 'The number line is like a mirror at zero. A number and its opposite are reflections of each other.', show: 'sum.1' },
        { say: 'To find an opposite, keep the magnitude and change the sign. In the next lesson, we compare and order positive and negative numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
