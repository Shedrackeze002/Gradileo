import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { vertical } from '@/content/math6/videos/lib/m6-1-figures.ts';

// The balance going up and down: 40 → −90 → −55 → −125 → −25, one arrow for each change.
const balance = (id: string) =>
  figure(
    id,
    [
      vertical({
        min: -140,
        max: 50,
        step: 10,
        every: 2,
        unit: 0.05,
        points: [
          { id: 'start', value: 40, tex: '', tone: 'theta' },
          { id: 'end', value: -25, tex: '', tone: 'good' },
        ],
        moves: [
          { id: 'm0', from: 40, to: -90, label: '-130', tone: 'adj', x: 1.2 },
          { id: 'm1', from: -90, to: -55, label: '+35', tone: 'opp', x: 3.9 },
          { id: 'm2', from: -55, to: -125, label: '-70', tone: 'adj', x: 6.6 },
          { id: 'm3', from: -125, to: -25, label: '+100', tone: 'opp', x: 9.3 },
        ],
        room: 10.9,
      }),
    ],
    540,
  );

const video: Explainer = {
  id: 'm7-4-3-c',
  lessonId: 'm7-4-3',
  title: 'Solving Integer Problems, Part 3: Several Changes in a Row',
  thumbnailTitle: 'Several Changes in a Row',
  thumbnail: 'bl',
  summary:
    'When there are several changes, start at the first value and add each change in turn. A bank account that starts at $40 (and may go below $0) with changes −130, +35, −70 and +100 goes to −90, −55, −125 and then −25: a balance of −$25 means $25 is owed to the bank. To check, group the money in (+135) and the money out (−200): (+40) + (+135) + (−200) = −25.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting Integers · Part 3', title: 'Several Changes in a Row', subtitle: 'One step at a time' }],
      lines: [
        { say: 'Money goes into a bank account and comes out of it, again and again. After all the changes, how much is left?', show: 'title' },
        { say: 'In this part, you will follow several changes in a row, one step at a time, and check the answer by grouping.' },
      ],
    },
    {
      chapter: 'A bank account',
      layout: 'split',
      leftWidth: 560,
      left: [balance('bl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Nadia’s bank account starts the month at \\$40. The bank lets the balance go below \\$0. What is the balance at the end of the month?' },
        {
          kind: 'table',
          id: 't',
          head: ['Change', 'Integer', 'Balance'],
          rows: [
            ['Hockey stick', '$-130$', '$-90$'],
            ['Birthday money', '$+35$', '$-55$'],
            ['Phone bill', '$-70$', '$-125$'],
            ['Babysitting pay', '$+100$', '$-25$'],
          ],
        },
      ],
      lines: [
        { say: 'Nadia’s bank account starts the month at forty dollars. The bank lets the balance go below zero dollars. Here are the changes during the month. What is the balance at the end of the month?', show: ['q', 'bl.axis', 'bl.start'] },
        { say: 'Start at forty, and add each change in turn. First, Nadia buys a hockey stick for one hundred and thirty dollars. Money out is negative. Positive forty plus negative one hundred and thirty is negative ninety.', show: ['t.0', 'bl.m0'], focus: ['t.0', 'bl.m0'] },
        { say: 'A balance of negative ninety dollars means Nadia owes the bank ninety dollars. Next comes thirty-five dollars of birthday money. Negative ninety plus positive thirty-five is negative fifty-five.', show: ['t.1', 'bl.m1'], focus: ['t.1', 'bl.m1'] },
        { say: 'Then Nadia pays a phone bill of seventy dollars. Negative fifty-five plus negative seventy is negative one hundred and twenty-five.', show: ['t.2', 'bl.m2'], focus: ['t.2', 'bl.m2'] },
        { say: 'Last, Nadia earns one hundred dollars babysitting. Negative one hundred and twenty-five plus positive one hundred is negative twenty-five.', show: ['t.3', 'bl.m3', 'bl.end'], focus: ['t.3', 'bl.m3'] },
        { say: 'So the balance at the end of the month is negative twenty-five dollars. Nadia owes the bank twenty-five dollars.' },
      ],
    },
    {
      chapter: 'Check with groups',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with groups', md: 'Add all the money in. Add all the money out. Then combine them with the starting balance.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{In: } 35 + 100 = 135', '\\text{Out: } 130 + 70 = 200', '(+40) + (+135) + (-200) = -25'] },
      ],
      lines: [
        { say: 'You can check the answer a different way. Integers can be added in any order, so group them.', show: 'tip' },
        { say: 'Add all the money in: thirty-five plus one hundred is one hundred and thirty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'Add all the money out: one hundred and thirty plus seventy is two hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'Now combine: positive forty plus positive one hundred and thirty-five is positive one hundred and seventy-five. Then add negative two hundred. That is negative twenty-five, the same answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A submarine starts at $-20$ m. It goes down $15$ m, then up $30$ m, then down $5$ m. Where is it now?',
          choices: ['$-70$ m', '$+10$ m', '$-30$ m', '$-10$ m'],
          answer: 3,
          working: '$(-20) + (-15) = -35$, then $(-35) + (+30) = -5$, then $(-5) + (-5) = -10$. The submarine is at $-10$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A submarine starts at negative twenty metres. It goes down fifteen metres, then up thirty metres, then down five metres. Where is it now? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative ten metres. Negative twenty plus negative fifteen is negative thirty-five. Plus positive thirty is negative five. Plus negative five is negative ten. Choice A treats every change as going down, but up thirty metres is positive thirty.', show: 'q.answer' },
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
          items: ['For several changes, start at the first value.', 'Add each change in turn, one step at a time.', 'Check by grouping the positives and the negatives.', 'A negative balance means money is owed.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For several changes in a row, start at the first value.', show: 'sum.0' },
        { say: 'Then add each change in turn, one step at a time.', show: 'sum.1' },
        { say: 'Check your answer by grouping the positives and the negatives.', show: 'sum.2' },
        { say: 'And remember that a negative bank balance means money is owed. Great work with integers! Next, you will explore patterns. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
