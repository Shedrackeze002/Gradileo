import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from './lib/m6-1-figures.ts';

// Heights compared to the surface of a lake (0 m): an osprey at 7 m, a dock at 1 m, a loon at −3 m and a fish at −8 m.
const lake = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -10,
        max: 10,
        every: 2,
        unit: 0.3,
        water: { label: '\\text{lake}', width: 5.2 },
        points: [
          { id: 'osprey', value: 7, tex: '\\text{osprey: } 7\\text{ m}', tone: 'opp' },
          { id: 'dock', value: 1, tex: '\\text{dock: } 1\\text{ m}', tone: 'ink' },
          { id: 'loon', value: -3, tex: '\\text{loon: } {-3}\\text{ m}', tone: 'theta' },
          { id: 'fish', value: -8, tex: '\\text{fish: } {-8}\\text{ m}', tone: 'good' },
        ],
        room: 5.2,
      }),
    ],
    560,
  );

// Three temperatures at 7 a.m. on a thermometer: −15, −4 and 2 degrees.
const thermo = figure(
  'th',
  [
    vertical({
      tube: true,
      min: -20,
      max: 10,
      every: 5,
      unit: 0.2,
      points: [
        { id: 'sea', value: 2, tex: '\\text{seaside town}', tone: 'opp' },
        { id: 'river', value: -4, tex: '\\text{river town}', tone: 'theta' },
        { id: 'mtn', value: -15, tex: '\\text{mountain village}', tone: 'adj' },
      ],
      room: 5.4,
    }),
  ],
  560,
);

const video: Explainer = {
  id: 'm6-1-2-c',
  lessonId: 'm6-1-2',
  title: 'Comparing and Ordering Positive and Negative Numbers, Part 3: Comparing on a Vertical Number Line',
  thumbnailTitle: 'Comparing Up and Down',
  thumbnail: 'lk',
  summary: 'On a vertical number line, numbers get greater going up, like a thermometer: higher is warmer. Heights at a lake (a loon at −3 m is above a fish at −8 m, so −8 < −3), and the coldest of −15 °C, −4 °C and 2 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Positive and Negative Numbers · Part 3', title: 'Comparing on a Vertical Number Line', subtitle: 'Higher means greater' }],
      lines: [
        { say: 'At a lake, a bird flies high above the water. A loon dives under the surface, and a fish swims deep down. Who is the highest? Who is the lowest?', show: 'title' },
        { say: 'In this video, you will compare numbers on a number line that stands up, where higher means greater.' },
      ],
    },
    {
      chapter: 'Up is greater',
      layout: 'split',
      leftWidth: 560,
      left: [lake('lk')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Higher is greater', md: 'On a vertical number line, numbers get **greater** as you move **up**. The lower number is less.' }],
      lines: [
        { say: 'On a vertical number line, numbers get greater as you move up. A thermometer works this way: higher is warmer.', show: ['key', 'lk.axis'] },
        { say: 'This vertical number line shows heights compared to the surface of a lake. The surface is zero metres, and the water is below it.', show: 'lk.water' },
        { say: 'An osprey, a bird that catches fish, flies at seven metres. A dock sits at one metre above the water.', show: ['lk.osprey', 'lk.dock'], focus: ['lk.osprey', 'lk.dock'] },
        { say: 'Under the water, a loon is diving at negative three metres. And a fish swims at negative eight metres.', show: ['lk.loon', 'lk.fish'], focus: ['lk.loon', 'lk.fish'] },
      ],
    },
    {
      chapter: 'Which is lower?',
      layout: 'split',
      leftWidth: 560,
      left: [lake('lk2')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The loon is at $-3$ m and the fish is at $-8$ m. Which is lower?' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['-8 < -3'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The **fish** is lower.' },
      ],
      lines: [
        { say: 'The loon is at negative three metres, and the fish is at negative eight metres. Which one is lower?', show: ['q', 'lk2.axis', 'lk2.water', 'lk2.loon', 'lk2.fish'] },
        { say: 'On a vertical number line, the lower number is farther down. Negative eight is below negative three.', focus: ['lk2.fish', 'lk2.loon'] },
        { say: 'So negative eight is less than negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'The fish is lower. And the osprey, at seven metres, is the highest of all.', show: ['a', 'lk2.osprey', 'lk2.dock'], focus: ['lk2.fish', 'lk2.osprey'] },
      ],
    },
    {
      chapter: 'Which place was colder?',
      layout: 'split',
      leftWidth: 540,
      left: [thermo],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'At 7 a.m., it was ${-15}^\\circ\\text{C}$ in a mountain village, ${-4}^\\circ\\text{C}$ in a river town and $2^\\circ\\text{C}$ in a seaside town. Which place was the coldest?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-15 < -4 < 2'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The **mountain village** was the coldest.' },
      ],
      lines: [
        { say: 'At seven in the morning, it was negative fifteen degrees in a mountain village, negative four degrees in a river town, and two degrees in a seaside town. Which place was the coldest?', show: 'q' },
        { say: 'Picture a thermometer. The coldest temperature is the lowest one.', show: 'th.axis' },
        { say: 'Two degrees is above zero. Negative four is a little below zero. Negative fifteen is far below zero.', show: ['th.sea', 'th.river', 'th.mtn'] },
        { say: 'Negative fifteen is the lowest, so it is the least. From least to greatest, the temperatures are negative fifteen, negative four, and two.', show: 'm.0', focus: ['th.mtn', 'm.0'] },
        { say: 'So the mountain village was the coldest.', show: 'a', focus: 'th.mtn' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'At noon, four towns had temperatures of $-2^\\circ\\text{C}$, ${-11}^\\circ\\text{C}$, $3^\\circ\\text{C}$ and ${-7}^\\circ\\text{C}$. Which temperature is the coldest?',
          choices: ['${-2}^\\circ\\text{C}$', '${-11}^\\circ\\text{C}$', '$3^\\circ\\text{C}$', '${-7}^\\circ\\text{C}$'],
          answer: 1,
          working: 'The coldest temperature is the lowest on a thermometer. $-11$ is farthest below $0$, so $-11 < -7 < -2 < 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. At noon, four towns had temperatures of negative two, negative eleven, three and negative seven degrees. Which temperature is the coldest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, negative eleven degrees. It is the lowest on a thermometer, the farthest below zero. Choice D, negative seven, is cold, but negative eleven is lower still.', show: 'q.answer' },
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
          items: ['On a vertical number line, numbers increase going **up**.', 'The lower number is the lesser one: $-8 < -3$.', 'On a thermometer, higher is warmer and lower is colder.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a vertical number line, numbers increase as you go up.', show: 'sum.0' },
        { say: 'So the lower number is the lesser one. Negative eight is less than negative three.', show: 'sum.1' },
        { say: 'On a thermometer, higher is warmer and lower is colder. In the next part, we put a whole list of numbers in order. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
