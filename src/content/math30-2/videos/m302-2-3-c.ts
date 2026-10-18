import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const video: Explainer = {
  id: 'm302-2-3-c',
  lessonId: 'm302-2-3',
  title: 'Permutations with Repetition and Restrictions, Part 3: Together or Apart',
  thumbnailTitle: 'Together or Apart',
  thumbnail: 'tw',
  summary: 'Objects that must be together are treated as one unit, then arranged inside it: 6 students with a pair of twins together line up in 5! × 2 = 240 ways, and apart in 720 − 240 = 480 ways. With 3 pine, 2 spruce and 2 aspen trees, the aspens side by side give 6!/(3! 2!) = 60 orders. Part 4 counts alternating patterns.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 3', title: 'Together or Apart', subtitle: 'Treat a group as one unit' }],
      lines: [
        { say: 'Twins who want to stand side by side in a photo, or two players who must not sit next to each other: rules like these change the count.', show: 'title' },
        { say: 'In this video, you will treat objects that must be together as a single unit, and count objects that must be apart by subtracting.' },
      ],
    },
    {
      chapter: 'Together: one unit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Six students, including a pair of twins, line up. How many line-ups have the twins **together**?' },
        figure('tw', [slots({ values: ['\\thc{T_1 T_2}', '', '', '', ''], captions: ['\\text{twins}', '\\text{student}', '\\text{student}', '\\text{student}', '\\text{student}'], widths: [2.4, 1.4, 1.4, 1.4, 1.4], shade: [0] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['5! = 120 \\text{ orders of the 5 units}', '\\times\\, 2! = 2 \\text{ orders of the twins}', '120 \\times 2 = 240'] },
      ],
      lines: [
        { say: 'Six students, including a pair of twins, line up. How many line-ups have the twins together?', show: 'p' },
        { say: 'Tape the twins together, so to speak, and treat them as one unit. Then there are five units to arrange: the twins, and the four other students.', show: ['tw.boxes', 'tw.values', 'tw.captions', 'tw.f0'], focus: 'tw.v0' },
        { say: 'Five units can be arranged in five factorial, or 120, ways.', show: ['tw.times', 'm.0'], focus: 'm.0' },
        { say: 'But inside their unit, the twins can stand in two orders: the first twin on the left, or on the right. That is two factorial, or two.', show: 'm.1', focus: ['m.1', 'tw.v0'] },
        { say: 'So multiply: 120 times two is 240 line-ups with the twins together.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Apart: subtract',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many line-ups have the twins **apart**?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{All line-ups: } 6! = 720', '\\text{Together: } 240', '\\text{Apart: } 720 - 240 = 480'] },
      ],
      lines: [
        { say: 'Now, how many line-ups have the twins apart? Counting them directly is awkward, because the gap between the twins could be one student, or two, or more.', show: 'p' },
        { say: 'Instead, count all the line-ups with no rule at all: six factorial, which is 720.', show: 'm.0', focus: 'm.0' },
        { say: 'Every line-up has the twins either together or apart. You already know that 240 have them together.', show: 'm.1', focus: 'm.1' },
        { say: 'So subtract: 720 minus 240 is 480 line-ups with the twins apart.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Identical objects in a unit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Three pine, two spruce and two aspen trees are planted in a row. Trees of the same type look identical. The aspens must be side by side. How many planting orders are possible?' },
        figure('tr', [slots({ values: ['\\good{\\text{AA}}', '\\text{P}', '\\text{P}', '\\text{P}', '\\adj{\\text{S}}', '\\adj{\\text{S}}'], captions: ['\\text{aspens}', '\\text{pine}', '\\text{pine}', '\\text{pine}', '\\text{spruce}', '\\text{spruce}'], widths: [2.2, 1.3, 1.3, 1.3, 1.3, 1.3], size: 1.3, gap: 0.6, shade: [0] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{6!}{3!\\,2!} = \\dfrac{720}{12} = 60'] },
      ],
      lines: [
        { say: 'Units work with identical objects too. Three pine, two spruce and two aspen trees are planted in a row. Trees of the same type look identical, and the aspens must be side by side. How many planting orders are possible?', show: 'p' },
        { say: 'Treat the two aspens as one unit. Then there are six units: three pines, two spruces, and the aspen block.', show: ['tr.boxes', 'tr.values', 'tr.captions', 'tr.f0'], focus: 'tr.v0' },
        { say: 'The three pines are alike, and so are the two spruces. So divide six factorial by three factorial and by two factorial: 720 over twelve, which is sixty.', show: ['tr.times', 'm.0'], focus: 'm.0' },
        { say: 'This time, do not multiply by two for the inside of the unit. The two aspens are identical, so swapping them changes nothing. The block can only be arranged one way inside. That gives sixty planting orders.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the order inside the unit', md: 'Different objects in a unit can be arranged among themselves. For the twins, $5! = 120$ is only half the answer: multiply by $2!$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{5! = 120}', '\\good{5! \\times 2! = 240}'] },
      ],
      lines: [
        { say: 'A common mistake is to arrange the units and stop. For the twins, that gives five factorial, or 120.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the twins are two different people, so they can swap places inside their unit. Multiply by two factorial, the number of orders inside the unit, to get 240. Only when the objects in a unit are identical, like the aspens, is there just one order inside.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five friends sit in a row of 5 seats. Two of them, Sam and Leo, must sit together. How many seatings are possible?',
          choices: ['$48$', '$24$', '$72$', '$120$'],
          answer: 0,
          working: 'Sam and Leo form one unit, so there are 4 units: $4! = 24$. Inside the unit they can swap: $24 \\times 2 = 48$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five friends sit in a row of five seats. Two of them, Sam and Leo, must sit together. How many seatings are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, forty-eight. Sam and Leo form one unit, so there are four units to arrange: four factorial, or twenty-four. Inside the unit, they can swap places, so multiply by two. Choice B, twenty-four, forgets that swap.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Together: treat the group as one unit, then multiply by its arrangements inside.', 'Apart: all the arrangements minus the “together” arrangements.', 'Identical objects inside a unit add no new orders.'] }],
      lines: [
        { say: 'Let’s sum up. When objects must be together, treat them as one unit, arrange the units, and multiply by the arrangements inside the unit.', show: 'sum.0' },
        { say: 'When objects must be apart, count all the arrangements, and subtract the ones where they are together.', show: 'sum.1' },
        { say: 'And identical objects inside a unit add no new orders. In part four, we count arrangements that alternate between two groups. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
