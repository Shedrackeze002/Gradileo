import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { note, rect } from './lib/m5-10-figures.ts';

const video: Explainer = {
  id: 'm5-10-1-b',
  lessonId: 'm5-10-1',
  title: 'Units of Area, Part 2: Square Metres and Square Kilometres',
  thumbnailTitle: 'Square Metres and Kilometres',
  thumbnail: 'sm',
  summary: 'The square metre (a square 1 m on each side, about a small table top) and the square kilometre (a square 1 km on each side, about 15 minutes’ walk along one side), and choosing the unit that fits: cm² for small things, m² for rooms and fields, km² for very large places such as a town or a lake.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 2', title: 'Square Metres and Square Kilometres', subtitle: 'Choosing a unit that fits' }],
      lines: [
        { say: 'A square centimetre is great for measuring a sticky note. But imagine measuring a classroom floor in square centimetres. You would need a huge number!', show: 'title' },
        { say: 'In this video, you will meet two bigger units of area, the square metre and the square kilometre, and learn how to choose the unit that fits.' },
      ],
    },
    {
      chapter: 'The square metre',
      layout: 'split',
      leftWidth: 480,
      left: [figure('sm', [rect({ w: 1, h: 1, labels: { bottom: '1\\text{ m}', right: '1\\text{ m}', top: '1\\text{ m}', left: '1\\text{ m}' } }), note('in', [0.5, 0.5], '1\\text{ m}^2', 'center', 'brand')], 420)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Square metre', md: 'A **square metre** ($\\text{m}^2$) is the area of a square that is $1\\text{ m}$ long on each side. Four metre sticks can make its outline. It is about the size of a small table top.' }],
      lines: [
        { say: 'A square metre is the area of a square that is one metre long on each side.', show: ['sm.shape', 'def'] },
        { say: 'You could make its outline with four metre sticks, laid on the floor in a square. One, two, three, four.', show: ['sm.bottom', 'sm.right', 'sm.top', 'sm.left'] },
        { say: 'The space inside is one square metre. It is about the size of a small table top.', show: 'sm.in', focus: 'sm.in' },
        { say: 'We write a square metre with the letter m, for metre, and a small two up high. Square metres are good for rooms, gardens and fields.' },
      ],
    },
    {
      chapter: 'The square kilometre',
      layout: 'split',
      leftWidth: 480,
      left: [figure('sk', [rect({ w: 1, h: 1, tone: 'good', labels: { bottom: '1\\text{ km}', left: '1\\text{ km}' } }), note('in', [0.5, 0.5], '1\\text{ km}^2', 'center', 'good')], 420)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Square kilometre', md: 'A **square kilometre** ($\\text{km}^2$) is the area of a square that is $1\\text{ km}$ long on each side. It takes about $15$ minutes to walk along one side.' }],
      lines: [
        { say: 'A square kilometre is the area of a square that is one kilometre long on each side. A kilometre is a thousand metres.', show: ['sk.shape', 'sk.bottom', 'sk.left', 'def'] },
        { say: 'It takes about fifteen minutes to walk along just one side of it! And the square has four sides. So a square kilometre is a very big area.', focus: 'sk.bottom' },
        { say: 'We write a square kilometre with k m and a small two up high. Square kilometres are good for very large places, like a whole town, a lake, or a big park.', show: 'sk.in', focus: 'sk.in' },
      ],
    },
    {
      chapter: 'Choosing a unit',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Unit', 'Good for', 'Examples'],
          rows: [
            ['$\\text{cm}^2$', 'small things you can hold', 'a sticky note, a phone screen'],
            ['$\\text{m}^2$', 'rooms, gardens and fields', 'a classroom floor, a garden'],
            ['$\\text{km}^2$', 'very large places', 'a town, a lake, a big park'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choose the unit that fits', md: 'A unit that is too small gives a huge number. A unit that is too big gives a tiny one.' },
      ],
      lines: [
        { say: 'So which unit should you use? Choose the unit that fits the size of the thing you are measuring.', show: 't' },
        { say: 'Use square centimetres for small things you can hold, like a sticky note, a phone screen or a playing card.', focus: 't.0' },
        { say: 'Use square metres for rooms, gardens and fields, like a classroom floor or a basketball court.', focus: 't.1' },
        { say: 'And use square kilometres for very large places, like a town, a lake, or a big park.', focus: 't.2' },
        { say: 'A unit that is too small gives a huge number, and a unit that is too big gives a tiny one.', show: 'tip', focus: 't' },
      ],
    },
    {
      chapter: 'A hockey rink',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Which unit is best for the area of a hockey rink?' },
        { kind: 'bullets', id: 'b', items: ['Much bigger than your hand, so $\\text{cm}^2$ would give a huge number.', 'You can walk across it in a minute, so it is much smaller than $1\\text{ km}^2$.', 'Use **square metres**, $\\text{m}^2$.'] },
      ],
      lines: [
        { say: 'Which unit is best for the area of a hockey rink, where people skate on the ice?', show: 'q' },
        { say: 'A hockey rink is much, much bigger than your hand. Square centimetres would give a huge number.', show: 'b.0' },
        { say: 'But you can walk across it in about a minute. So it is much smaller than one square kilometre, which takes fifteen minutes to walk along just one side.', show: 'b.1' },
        { say: 'So square metres fit best. A hockey rink is like a big room, and rooms are measured in square metres.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which unit is best for the area of a city?',
          choices: ['$\\text{cm}^2$', '$\\text{m}^2$', '$\\text{cm}$', '$\\text{km}^2$'],
          answer: 3,
          working: 'A city is a very large place, so square kilometres fit best.',
        },
      ],
      lines: [
        { say: 'Your turn. Which unit is best for the area of a city? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, square kilometres. A city is a very large place. Choice B, square metres, would give a huge number, and choice C is not even an area unit: centimetres measure a length.', show: 'q.answer' },
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
          items: ['$1\\text{ m}^2$ is a square $1\\text{ m}$ by $1\\text{ m}$, about a small table top.', '$1\\text{ km}^2$ is a square $1\\text{ km}$ by $1\\text{ km}$: a very large area.', 'Use $\\text{cm}^2$ for small things, $\\text{m}^2$ for rooms and fields, and $\\text{km}^2$ for very large places.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A square metre is a square one metre on each side, about the size of a small table top.', show: 'sum.0' },
        { say: 'A square kilometre is a square one kilometre on each side, which is a very large area.', show: 'sum.1' },
        { say: 'Use square centimetres for small things, square metres for rooms and fields, and square kilometres for very large places. In the next part, you will see how these units are related. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
