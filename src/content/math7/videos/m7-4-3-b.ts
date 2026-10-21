import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// From −18 °C up to +7 °C: 18 degrees up to zero, then 7 more.
const thermo = (id: string) =>
  figure(
    id,
    [
      vertical({
        tube: true,
        min: -20,
        max: 10,
        every: 5,
        step: 2,
        unit: 0.2,
        fills: [
          { id: 'cold', value: -18, tone: 'adj' },
          { id: 'warm', value: 7, tone: 'bad' },
        ],
        points: [
          { id: 'before', value: -18, tex: '{-18}^\\circ\\text{C}', tone: 'adj' },
          { id: 'after', value: 7, tex: '+7^\\circ\\text{C}', tone: 'opp' },
        ],
        moves: [
          { id: 'a', from: -18, to: 0, label: '18', tone: 'theta', x: 3.6 },
          { id: 'b', from: 0, to: 7, label: '7', tone: 'good', x: 3.6 },
        ],
        room: 4.6,
      }),
    ],
    540,
  );

// A diver at −9 m below the surface of a lake and a bird at +41 m above it.
const lake = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -10,
        max: 45,
        step: 5,
        unit: 0.12,
        water: { width: 5 },
        points: [
          { id: 'diver', value: -9, tex: '\\text{diver } {-9}\\text{ m}', tone: 'adj' },
          { id: 'bird', value: 41, tex: '\\text{bird } {+41}\\text{ m}', tone: 'opp' },
        ],
        moves: [
          { id: 'a', from: -9, to: 0, label: '9', tone: 'theta', x: 5.6 },
          { id: 'b', from: 0, to: 41, label: '41', tone: 'good', x: 5.6 },
        ],
        room: 6.6,
      }),
    ],
    540,
  );

const video: Explainer = {
  id: 'm7-4-3-b',
  lessonId: 'm7-4-3',
  title: 'Solving Integer Problems, Part 2: Change and Difference',
  thumbnailTitle: 'Change and Difference',
  thumbnail: 'th',
  summary:
    'The change from one value to another is new value − old value, and the difference between two values is higher value − lower value. A temperature that goes from −18 °C to +7 °C changes by (+7) − (−18) = (+7) + (+18) = +25 degrees: 18 degrees up to 0 and 7 more. It is not 18 − 7 = 11. A bird at +41 m is (+41) − (−9) = 50 m above a diver at −9 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 2', title: 'Change and Difference', subtitle: 'New minus old, higher minus lower' }],
      lines: [
        { say: 'One cold morning, a warm wind arrives, and the temperature climbs from below zero to above zero. By how many degrees did it rise?', show: 'title' },
        { say: 'In this part, you will use subtraction of integers to find a change, or the difference between two values.' },
      ],
    },
    {
      chapter: 'Change and difference',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Change and difference', md: 'The **change** from one value to another is **new value $-$ old value**. The **difference** between two values is how far apart they are: **higher value $-$ lower value**.' },
      ],
      lines: [
        { say: 'Two words help here. The change from one value to another is the new value minus the old value. A rise gives a positive change, and a drop gives a negative change.', show: 'def' },
        { say: 'The difference between two values is how far apart they are. Subtract the lower value from the higher value, so the difference is never negative.' },
      ],
    },
    {
      chapter: 'A warm wind',
      layout: 'split',
      leftWidth: 460,
      left: [thermo('th')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'One morning the temperature is ${-18}^\\circ\\text{C}$. After a warm wind arrives, it is $+7^\\circ\\text{C}$. By how many degrees did the temperature rise?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{new} - \\text{old} = (+7) - (-18)', '= (+7) + (+18)', '= +25'] },
      ],
      lines: [
        { say: 'One morning, the temperature is negative eighteen degrees Celsius. After a warm wind arrives, it is positive seven degrees. By how many degrees did the temperature rise?', show: ['q', 'th.axis', 'th.cold', 'th.before'] },
        { say: 'Find the change: new minus old. The new temperature is positive seven, and the old one is negative eighteen. So the change is positive seven minus negative eighteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the opposite: positive seven plus positive eighteen.', show: 'm.1', focus: 'm.1' },
        { say: 'That is positive twenty-five. The change is positive, so it is a rise. The temperature rose twenty-five degrees.', hide: 'th.cold', show: ['th.warm', 'th.after', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Count through zero',
      layout: 'split',
      leftWidth: 460,
      left: [thermo('th')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count through zero', md: 'From $-18$ up to $0$ is $18$ degrees. From $0$ up to $+7$ is $7$ more. Altogether, $18 + 7 = 25$ degrees.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting only the digits', md: '$18 - 7 = 11$ is **not** the change. The temperature had to climb $18$ degrees just to reach $0$, and then $7$ more.' },
      ],
      lines: [
        { say: 'You can check by counting through zero on the thermometer. From negative eighteen up to zero is eighteen degrees.', show: ['th.axis', 'th.warm', 'th.before', 'th.after', 'th.a'], focus: 'th.a' },
        { say: 'From zero up to positive seven is seven more degrees. Eighteen plus seven is twenty-five, the same answer.', show: ['th.b', 'tip'], focus: 'th.b' },
        { say: 'Watch out for this mistake. Some people see eighteen and seven, and subtract to get eleven. But the temperature had to climb eighteen degrees just to reach zero, and then seven more.', show: 'oops' },
      ],
    },
    {
      chapter: 'Above and below the water',
      layout: 'split',
      leftWidth: 500,
      left: [lake('lk')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Heights are measured from the surface of a lake, at $0$ m. A diver is at $-9$ m and a bird is flying at $+41$ m. How far above the diver is the bird?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{higher} - \\text{lower} = (+41) - (-9)', '= (+41) + (+9)', '= +50'] },
      ],
      lines: [
        { say: 'Heights are measured from the surface of a lake, at zero metres. A diver is at negative nine metres, and a bird is flying at positive forty-one metres. How far above the diver is the bird?', show: ['q', 'lk.axis', 'lk.water', 'lk.diver', 'lk.bird'] },
        { say: 'Find the difference: higher minus lower. That is positive forty-one minus negative nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the opposite: positive forty-one plus positive nine, which is positive fifty.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check by counting through zero. The diver is nine metres below the surface, and the bird is forty-one metres above it. Nine plus forty-one is fifty. So the bird is fifty metres above the diver.', show: ['lk.a', 'lk.b'], focus: ['lk.a', 'lk.b'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Early in the morning it is $-11^\\circ\\text{C}$. At noon it is $+4^\\circ\\text{C}$. By how many degrees did the temperature rise?',
          choices: ['$15$ degrees', '$7$ degrees', '$-7$ degrees', '$-15$ degrees'],
          answer: 0,
          working: 'New $-$ old: $(+4) - (-11) = (+4) + (+11) = +15$. Check: $11$ degrees up to $0$, and $4$ more, makes $15$.',
        },
      ],
      lines: [
        { say: 'Your turn. Early in the morning, it is negative eleven degrees. At noon, it is positive four degrees. By how many degrees did the temperature rise? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, fifteen degrees. New minus old is positive four minus negative eleven, which is positive four plus positive eleven: fifteen. Choice B subtracts only the digits, eleven minus four.', show: 'q.answer' },
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
          items: ['A **change** is new value $-$ old value.', 'A **difference** is higher value $-$ lower value.', 'Subtracting a negative is the same as adding a positive.', 'Count through $0$ to check.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A change is the new value minus the old value.', show: 'sum.0' },
        { say: 'A difference is the higher value minus the lower value.', show: 'sum.1' },
        { say: 'When you subtract a negative, add its opposite.', show: 'sum.2' },
        { say: 'And count through zero to check your answer. In the next part, you will follow several changes in a row. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
