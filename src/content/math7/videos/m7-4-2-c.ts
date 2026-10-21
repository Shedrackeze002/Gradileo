import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// From +4 °C at noon down to −5 °C in the evening: 4 degrees down to zero, then 5 more.
const thermo = (id: string) =>
  figure(
    id,
    [
      vertical({
        tube: true,
        min: -6,
        max: 6,
        every: 2,
        unit: 0.42,
        points: [
          { id: 'noon', value: 4, tex: '+4^\\circ\\text{C}', tone: 'opp' },
          { id: 'eve', value: -5, tex: '{-5}^\\circ\\text{C}', tone: 'adj' },
        ],
        moves: [
          { id: 'a', from: 4, to: 0, label: '4', tone: 'theta', x: 3.4 },
          { id: 'b', from: 0, to: -5, label: '5', tone: 'good', x: 3.4 },
        ],
        room: 4.4,
      }),
    ],
    520,
  );

const video: Explainer = {
  id: 'm7-4-2-c',
  lessonId: 'm7-4-2',
  title: 'Subtracting Integers, Part 3: Adding the Opposite',
  thumbnailTitle: 'Subtract by Adding the Opposite',
  thumbnail: 'th',
  summary:
    'Subtracting an integer gives the same answer as adding its opposite: (+2) − (+5) = (+2) + (−5) = −3 and (+3) − (−2) = (+3) + (+2) = +5. A table of (+3) minus +2, +1, 0, −1 and −2 shows the answers going up by 1 each time. So keep the first integer, change subtract to add, and change the sign of the second integer: (−9) − (+12) = −21, (−4) − (−22) = +18, and a fall from +4 °C to −5 °C is (+4) − (−5) = 9 degrees. (+7) − (−3) is +10, not +4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 3', title: 'Adding the Opposite', subtitle: 'A shortcut for subtracting integers' }],
      lines: [
        { say: 'Counters work, but they take time. Is there a shortcut for subtracting integers? There is, and it turns every subtraction into an addition.', show: 'title' },
        { say: 'In this part, you will learn to subtract an integer by adding its opposite.' },
      ],
    },
    {
      chapter: 'Compare the answers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Subtraction', 'Addition'],
          rows: [
            ['$(+2) - (\\opp{+5}) = -3$', '$(+2) + (\\adj{-5}) = -3$'],
            ['$(+3) - (\\adj{-2}) = +5$', '$(+3) + (\\opp{+2}) = +5$'],
            ['$(-4) - (\\opp{+3}) = -7$', '$(-4) + (\\adj{-3}) = -7$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the subtractions from the last part. Positive two minus positive five was negative three. Now look at positive two plus negative five. That is negative three as well!', show: 't.0', focus: 't.0' },
        { say: 'Positive three minus negative two was positive five. And positive three plus positive two is positive five.', show: 't.1', focus: 't.1' },
        { say: 'Negative four minus positive three was negative seven. And negative four plus negative three is negative seven.', show: 't.2', focus: 't.2' },
        { say: 'In each row, subtracting an integer gives the same answer as adding its opposite.', focus: 't' },
      ],
    },
    {
      chapter: 'A pattern',
      layout: 'split',
      leftWidth: 520,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Subtraction', 'Answer'],
          rows: [
            ['$(+3) - (+2)$', '$+1$'],
            ['$(+3) - (+1)$', '$+2$'],
            ['$(+3) - 0$', '$+3$'],
            ['$(+3) - (-1)$', '$+4$'],
            ['$(+3) - (-2)$', '$+5$'],
          ],
        },
      ],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'The pattern', md: 'Each time you subtract $1$ less, the answer goes up by $1$. Subtracting $-2$ gives the same answer as adding $+2$.' }],
      lines: [
        { say: 'Here is another way to see it. Positive three minus positive two is positive one. Positive three minus positive one is positive two.', show: ['t.0', 't.1'] },
        { say: 'Positive three minus zero is positive three. Each time we subtract one less, the answer goes up by one.', show: 't.2', focus: 't.2' },
        { say: 'Keep the pattern going. Subtract negative one, and the answer is positive four. Subtract negative two, and the answer is positive five.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'So positive three minus negative two is positive five, the same as positive three plus positive two. Subtracting a negative is the same as adding a positive.', show: 'key' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtracting integers', md: 'To subtract an integer, **add its opposite**. Keep the first integer, change the subtraction to an addition, and change the sign of the second integer. Then use the rules for adding.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['(+3) \\;\\bad{-}\\; (\\adj{-2}) \\;=\\; (+3) \\;\\good{+}\\; (\\opp{+2})'] },
      ],
      lines: [
        { say: 'Here is the rule. To subtract an integer, add its opposite.', show: 'key' },
        { say: 'Keep the first integer the same. Change the subtraction to an addition. And change the sign of the second integer. So positive three minus negative two becomes positive three plus positive two.', show: 'm.0', focus: 'm.0' },
        { say: 'Now it is an addition, so you can use the rules for adding integers that you already know.' },
      ],
    },
    {
      chapter: 'Subtracting a positive',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-9) - (+12)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-9) - (+12) = (-9) + (-12)', '\\text{Same signs: } 9 + 12 = 21', '(-9) - (+12) = -21'] },
      ],
      lines: [
        { say: 'Find negative nine minus positive twelve.', show: 'q' },
        { say: 'Add the opposite. Keep negative nine, change subtract to add, and change positive twelve to negative twelve. Now it is negative nine plus negative twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'The signs are the same, so add the sizes and keep the sign. Nine plus twelve is twenty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'So negative nine minus positive twelve is negative twenty-one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Subtracting a negative',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-4) - (-22)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(-4) - (-22) = (-4) + (+22)', '\\text{Different signs: } 22 - 4 = 18', '(-4) - (-22) = +18'] },
      ],
      lines: [
        { say: 'Now find negative four minus negative twenty-two.', show: 'q' },
        { say: 'Add the opposite. The opposite of negative twenty-two is positive twenty-two. So it becomes negative four plus positive twenty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'The signs are different, so subtract the sizes. Twenty-two minus four is eighteen. There are more positives, so the answer is positive.', show: 'm.1', focus: 'm.1' },
        { say: 'So negative four minus negative twenty-two is positive eighteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How far did it fall?',
      layout: 'split',
      leftWidth: 540,
      left: [thermo('th')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'At noon it is $+4^\\circ\\text{C}$. By evening it is ${-5}^\\circ\\text{C}$. How many degrees did the temperature fall?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(+4) - (-5) = (+4) + (+5)', '= +9'] },
      ],
      lines: [
        { say: 'Back to the question from the start. At noon it is positive four degrees. By evening it is negative five degrees. How many degrees did the temperature fall?', show: ['q', 'th.axis', 'th.noon', 'th.eve'] },
        { say: 'To find how far apart two temperatures are, subtract the lower one from the higher one: positive four minus negative five.' },
        { say: 'Add the opposite: positive four plus positive five is positive nine. So the temperature fell nine degrees.', show: 'm', focus: 'm.1' },
        { say: 'The thermometer agrees. Four degrees down to zero, and five more degrees down to negative five. Four plus five is nine.', show: ['th.a', 'th.b'], focus: ['th.a', 'th.b'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two minus signs', md: '$(+7) - (-3)$ is **not** $+4$. Subtracting $-3$ is the same as adding $+3$, so $(+7) - (-3) = (+7) + (+3) = +10$.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. In positive seven minus negative three, some people see seven and three, and just subtract to get positive four.', show: 'oops' },
        { say: 'But subtracting negative three is the same as adding positive three. So positive seven minus negative three is positive seven plus positive three, which is positive ten.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $(-5) - (-8)$.',
          choices: ['$-13$', '$-3$', '$+13$', '$+3$'],
          answer: 3,
          working: 'Add the opposite: $(-5) - (-8) = (-5) + (+8)$. Different signs: $8 - 5 = 3$, and there are more positives, so the answer is $+3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find negative five minus negative eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, positive three. Add the opposite: negative five plus positive eight. The signs are different, so eight minus five is three, and the answer is positive. Choice A adds negative eight, but you must change it to its opposite, positive eight.', show: 'q.answer' },
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
            'Subtracting an integer gives the same answer as **adding its opposite**.',
            'Keep the first integer, change $-$ to $+$, and change the sign of the second integer.',
            '$(-9) - (+12) = (-9) + (-12) = -21$',
            '$(-4) - (-22) = (-4) + (+22) = +18$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Subtracting an integer gives the same answer as adding its opposite.', show: 'sum.0' },
        { say: 'Keep the first integer, change the subtraction to an addition, and change the sign of the second integer.', show: 'sum.1' },
        { say: 'So subtracting a positive is like adding a negative.', show: 'sum.2' },
        { say: 'And subtracting a negative is like adding a positive. In the next part, you will subtract with several steps. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
