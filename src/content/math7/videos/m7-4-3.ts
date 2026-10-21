import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// +4 °C at noon, dropping 9 degrees: 4 down to zero, then 5 more, to −5 °C.
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
        fills: [
          { id: 'warm', value: 4, tone: 'bad' },
          { id: 'cold', value: -5, tone: 'adj' },
        ],
        points: [
          { id: 'noon', value: 4, tex: '+4^\\circ\\text{C}', tone: 'opp' },
          { id: 'eve', value: -5, tex: '{-5}^\\circ\\text{C}', tone: 'adj' },
        ],
        moves: [
          { id: 'a', from: 4, to: 0, label: '-4', tone: 'theta', x: 3.3 },
          { id: 'b', from: 0, to: -5, label: '-5', tone: 'good', x: 3.3 },
        ],
        room: 4.4,
      }),
    ],
    520,
  );

const video: Explainer = {
  id: 'm7-4-3',
  lessonId: 'm7-4-3',
  title: 'Solving Integer Problems, Part 1: Writing Integers for Changes',
  thumbnailTitle: 'Writing Integers for Changes',
  thumbnail: 'th',
  summary:
    'Use a positive integer for a rise, a gain or money in, and a negative integer for a drop, a loss or money out. A temperature of +4 °C that drops 9 degrees is (+4) + (−9) = −5 °C. A hockey player on the ice for 2 goals by their own team and 5 goals by the other team has a plus-minus of (+2) + (−5) = −3. A submarine at −40 m that rises 15 m is at −25 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 1', title: 'Writing Integers for Changes', subtitle: 'Up is positive, down is negative' }],
      lines: [
        { say: 'Weather can change fast. A warm wind can raise the temperature by more than twenty degrees in a few hours. Integers describe changes like this.', show: 'title' },
        { say: 'They also describe heights, game scores and bank balances. In this part, you will write integers for changes, and use them to solve problems.' },
      ],
    },
    {
      chapter: 'Up or down',
      layout: 'split',
      leftWidth: 640,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Situation', 'Integer'],
          rows: [
            ['The temperature rises $5$ degrees', '$+5$'],
            ['The temperature drops $8$ degrees', '$-8$'],
            ['Put \\$20 into a bank account', '$+20$'],
            ['Spend \\$15 with a bank card', '$-15$'],
            ['A hiker climbs $40$ m', '$+40$'],
            ['A diver swims down $6$ m', '$-6$'],
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Positive or negative?', md: '**Positive:** a rise, a gain, or money in. **Negative:** a drop, a loss, or money out.' },
      ],
      lines: [
        { say: 'A change can go up or down. Use a positive integer for a rise, a gain or money in. Use a negative integer for a drop, a loss or money out.', show: 'key' },
        { say: 'The temperature rises five degrees: positive five. The temperature drops eight degrees: negative eight.', show: ['t.0', 't.1'] },
        { say: 'You put twenty dollars into a bank account: positive twenty. You spend fifteen dollars with a bank card: negative fifteen.', show: ['t.2', 't.3'] },
        { say: 'A hiker climbs forty metres: positive forty. A diver swims down six metres: negative six.', show: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'A cold evening',
      layout: 'split',
      leftWidth: 460,
      left: [thermo('th')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'At noon the temperature is $+4^\\circ\\text{C}$. By evening it drops $9$ degrees. What is the temperature in the evening?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(+4) + (-9)', '9 - 4 = 5, \\text{ more negatives}', '(+4) + (-9) = -5'] },
      ],
      lines: [
        { say: 'At noon, the temperature is positive four degrees Celsius. By evening, it drops nine degrees. What is the temperature in the evening?', show: ['q', 'th.axis', 'th.warm', 'th.noon'] },
        { say: 'A drop of nine degrees is negative nine. So add it to the starting temperature: positive four plus negative nine.', show: 'm.0', focus: 'm.0' },
        { say: 'The signs are different, so subtract the sizes. Nine minus four is five, and there are more negatives.', show: 'm.1', focus: 'm.1' },
        { say: 'On the thermometer, the first four degrees of the drop take the temperature down to zero. The other five take it down to negative five.', hide: 'th.warm', show: ['th.cold', 'th.a', 'th.b', 'th.eve'], focus: ['th.a', 'th.b'] },
        { say: 'So the temperature in the evening is negative five degrees Celsius.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Plus-minus',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'In hockey, a player’s **plus-minus** goes up $1$ for each goal the player’s team scores while the player is on the ice, and down $1$ for each goal the other team scores. In one game, Talia was on the ice for $2$ goals by Talia’s team and $5$ goals by the other team. What was Talia’s plus-minus?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Goals for: } {+2} \\qquad \\text{Goals against: } {-5}', '(+2) + (-5) \\;\\to\\; 5 - 2 = 3 \\;\\to\\; -3'] },
      ],
      lines: [
        { say: 'Here is a sports problem. In hockey, a player’s plus-minus goes up one for each goal the player’s team scores while the player is on the ice. It goes down one for each goal the other team scores.', show: 'q' },
        { say: 'In one game, Talia was on the ice for two goals by Talia’s team and five goals by the other team. What was Talia’s plus-minus?' },
        { say: 'The goals for Talia’s team give positive two. The goals against give negative five.', show: 'm.0', focus: 'm.0' },
        { say: 'Add them: positive two plus negative five. Five minus two is three, and there are more negatives. So Talia’s plus-minus for the game was negative three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A submarine is at $-40$ m. It rises $15$ m. Where is it now?',
          choices: ['$-55$ m', '$+25$ m', '$-25$ m', '$+55$ m'],
          answer: 2,
          working: 'A rise is positive: $(-40) + (+15)$. Different signs: $40 - 15 = 25$, and there are more negatives, so it is at $-25$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A submarine is at negative forty metres. It rises fifteen metres. Where is it now? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, negative twenty-five metres. A rise is positive, so add positive fifteen. Forty minus fifteen is twenty-five, and there are more negatives. Choice A moves the wrong way: rising adds a positive integer, so the submarine goes up.', show: 'q.answer' },
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
            'Positive integers: a rise, a gain, or money in.',
            'Negative integers: a drop, a loss, or money out.',
            'Add a change to the starting value: $(+4) + (-9) = -5$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use a positive integer for a rise, a gain or money in.', show: 'sum.0' },
        { say: 'Use a negative integer for a drop, a loss or money out.', show: 'sum.1' },
        { say: 'To find a new value, add the change to the starting value. In the next part, you will find the change between two values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
