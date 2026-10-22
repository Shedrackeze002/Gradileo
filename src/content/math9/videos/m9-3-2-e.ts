import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// A day of temperatures: −14.6 °C at 6 a.m., up 9.8 to −4.8 at noon, down 7.3 to −12.1 at 9 p.m.
const day = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -16,
        max: 0,
        step: 1,
        every: 2,
        unit: 0.32,
        tube: true,
        points: [
          { id: 'six', value: -14.6, tex: '-14.6', tone: 'adj' },
          { id: 'noon', value: -4.8, tex: '-4.8', tone: 'good' },
          { id: 'nine', value: -12.1, tex: '-12.1', tone: 'opp' },
        ],
        moves: [
          { id: 'up', from: -14.6, to: -4.8, label: '+9.8', tone: 'good', x: 3.2 },
          { id: 'down', from: -4.8, to: -12.1, label: '-7.3', tone: 'opp', x: 5.2 },
        ],
      }),
    ],
    560,
  );

// From −17.4 °C to −2.9 °C: a rise of 14.5 degrees.
const warmer = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -18,
        max: 0,
        step: 1,
        every: 2,
        unit: 0.3,
        tube: true,
        points: [
          { id: 'cold', value: -17.4, tex: '\\text{morning: } {-17.4}', tone: 'adj' },
          { id: 'warm', value: -2.9, tex: '\\text{afternoon: } {-2.9}', tone: 'opp' },
        ],
        moves: [{ id: 'rise', from: -17.4, to: -2.9, label: '+14.5', tone: 'good', x: 5.2 }],
      }),
    ],
    560,
  );

const video: Explainer = {
  id: 'm9-3-2-e',
  lessonId: 'm9-3-2',
  title: 'Adding and Subtracting Rational Numbers, Part 5: Solving Problems with Changes',
  thumbnailTitle: 'Problems with Changes',
  thumbnail: 'dy',
  summary:
    'In problems, a rise, a gain or a deposit is a positive change, and a drop, a loss or a payment is a negative change. A temperature of −14.6 °C that rises 9.8 degrees becomes −14.6 + 9.8 = −4.8 °C, and then falls 7.3 degrees to −4.8 + (−7.3) = −12.1 °C. To find how much warmer one temperature is than another, subtract warmer minus colder: −2.9 − (−17.4) = 14.5 degrees.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Numbers · Part 5', title: 'Solving Problems with Changes', subtitle: 'Rises, drops, deposits and payments' }],
      lines: [
        { say: 'Temperatures rise and fall. Money goes into a bank account and comes out again. Adding and subtracting rational numbers keeps track of it all.', show: 'title' },
        { say: 'In this part, you will turn changes into positive and negative numbers, and solve problems with them.' },
      ],
    },
    {
      chapter: 'Positive and negative changes',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A **rise**, a **gain** or a **deposit** is a **positive** change.',
            'A **drop**, a **loss** or a **payment** is a **negative** change.',
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rises } 9.8 \\;\\to\\; +9.8 \\qquad \\text{falls } 7.3 \\;\\to\\; {-7.3}'] },
      ],
      lines: [
        { say: 'In a problem, decide first whether each change is positive or negative.', show: 'b' },
        { say: 'Rises, gains and deposits are positive changes. A deposit is money you put into a bank account.', show: 'b.0', focus: 'b.0' },
        { say: 'A drop, a loss or a payment is a negative change. A payment takes money out of the account.', show: 'b.1', focus: 'b.1' },
        { say: 'So a temperature that rises nine point eight degrees changes by positive nine point eight. A temperature that falls seven point three degrees changes by negative seven point three.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A day of temperatures',
      layout: 'split',
      leftWidth: 500,
      left: [day('dy')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'At 6 a.m. it is $-14.6^\\circ\\text{C}$. By noon it has **risen** $9.8$ degrees. By 9 p.m. it has **fallen** $7.3$ degrees from noon. What is the temperature at 9 p.m.?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Noon: } {-14.6} + 9.8 = -4.8', '\\text{9 p.m.: } {-4.8} + (-7.3)', '= -12.1'] },
      ],
      lines: [
        { say: 'At six in the morning, the temperature in a northern town is negative fourteen point six degrees Celsius. By noon it has risen nine point eight degrees. By nine in the evening, it has fallen seven point three degrees from noon. What is the temperature at nine in the evening?', show: ['q', 'dy.axis', 'dy.six'] },
        { say: 'A temperature rise is a positive change, so the noon temperature is negative fourteen point six plus nine point eight.', show: 'dy.up', focus: 'dy.up' },
        { say: 'The signs are different, so subtract the sizes: fourteen point six minus nine point eight is four point eight. The negative number has the greater size, so at noon it is negative four point eight degrees.', show: ['m.0', 'dy.noon'], focus: ['m.0', 'dy.noon'] },
        { say: 'A fall is a negative change, so the temperature at nine in the evening is negative four point eight plus negative seven point three.', show: 'dy.down', focus: 'dy.down' },
        { say: 'The signs are the same, so add the sizes and keep the sign. At nine in the evening, it is negative twelve point one degrees Celsius.', show: ['m.1', 'm.2', 'dy.nine'], focus: ['m.2', 'dy.nine'] },
      ],
    },
    {
      chapter: 'How much warmer?',
      layout: 'split',
      leftWidth: 560,
      left: [warmer('wm')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'How much warmer?', md: 'The difference between two temperatures is **warmer − colder**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-2.9 - (-17.4)', '= -2.9 + 17.4', '= 14.5'] },
      ],
      lines: [
        { say: 'Subtracting finds a difference. One morning it is negative seventeen point four degrees. By the afternoon it is negative two point nine degrees. How much warmer is it?', show: ['wm.axis', 'wm.cold', 'wm.warm'] },
        { say: 'The difference between two temperatures is the warmer one minus the colder one: negative two point nine minus negative seventeen point four.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'Add the opposite: negative two point nine plus seventeen point four.', show: 'm.1', focus: 'm.1' },
        { say: 'The signs are different, so subtract the sizes: seventeen point four minus two point nine is fourteen point five. Seventeen point four has the greater size, so the answer is positive. It is fourteen point five degrees warmer.', show: ['m.2', 'wm.rise'], focus: ['m.2', 'wm.rise'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bank account has a balance of \\$23.50. A payment of \\$41.75 comes out, then a deposit of \\$12.40 goes in. What is the new balance? (A negative balance means the account owes money.)',
          choices: ['\\$77.65', '\\$5.85', '−⁠\\$5.85', '−⁠\\$30.65'],
          answer: 2,
          working: 'The payment is negative and the deposit is positive: $23.50 + (-41.75) = -18.25$, then $-18.25 + 12.40 = -5.85$. The new balance is −⁠\\$5.85.',
        },
      ],
      lines: [
        { say: 'Your turn. A bank account has a balance of twenty-three dollars and fifty cents. A payment of forty-one dollars and seventy-five cents comes out, then a deposit of twelve dollars and forty cents goes in. What is the new balance? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative five dollars and eighty-five cents. The payment takes the balance down to negative eighteen dollars and twenty-five cents. The deposit then brings it up to negative five dollars and eighty-five cents. Choice D treats the deposit as a negative change as well.', show: 'q.answer' },
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
            'A rise, a gain or a deposit is a positive change.',
            'A drop, a loss or a payment is a negative change.',
            'Add the changes one at a time: $-14.6 + 9.8 = -4.8$, then $-4.8 + (-7.3) = -12.1$.',
            'How much warmer: warmer $-$ colder.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rises, gains and deposits are positive changes.', show: 'sum.0' },
        { say: 'A drop, a loss or a payment is a negative change.', show: 'sum.1' },
        { say: 'Add the changes one at a time, using the sign rules.', show: 'sum.2' },
        { say: 'And to find how much warmer one temperature is, subtract: warmer minus colder. Next, you will multiply and divide rational numbers. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
