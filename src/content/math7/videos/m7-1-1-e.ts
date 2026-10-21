import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { dotGroups } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { ring, tag } from './lib/m7-1-figures.ts';

// 12 counters shared into 3 equal groups of 4.
const twelve = figure('g', [dotGroups({ groups: 3, size: 4, cols: 2, labels: ['4', '4', '4'] })], 300);

// 0 counters shared into 5 groups: five empty rings, each with 0 under it.
const empty: Part[] = Array.from({ length: 5 }, (_, i) => [
  ring(`e${i}`, i * 1.9, -1.5, i * 1.9 + 1.4, 0, { tone: 'adj', r: 0.28, group: 'rings' }),
  tag(`z${i}`, [i * 1.9 + 0.7, -1.75], '0', { place: 'below', group: 'zeros' }),
]).flat();
const none = figure('z', empty, 260);

const video: Explainer = {
  id: 'm7-1-1-e',
  lessonId: 'm7-1-1',
  title: 'Divisibility Rules, Part 5: Why We Cannot Divide by Zero',
  thumbnailTitle: 'Why We Cannot Divide by Zero',
  thumbnail: false,
  summary:
    'Division undoes multiplication: 12 ÷ 3 = 4 because 4 × 3 = 12. So 12 ÷ 0 would need a number that gives 12 when multiplied by 0, and there is none, because any number times 0 is 0. We cannot divide by 0. Dividing 0 by a number is fine: 0 ÷ 5 = 0, because 0 × 5 = 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 5', title: 'Why We Cannot Divide by Zero', subtitle: 'Division undoes multiplication' }],
      lines: [
        { say: 'A calculator can do almost anything. But type twelve divided by zero, and it shows an error. Why does it refuse?', show: 'title' },
        { say: 'In this part, you will find out why dividing by zero has no answer, and why dividing zero by a number is perfectly fine.' },
      ],
    },
    {
      chapter: 'Division undoes multiplication',
      layout: 'split',
      leftWidth: 520,
      left: [twelve],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['12 \\div 3 = 4', '\\text{because } 4 \\times 3 = 12'] }],
      lines: [
        { say: 'Start with something that works. Share twelve counters into three equal groups. Each group gets four.', show: ['g.g0', 'g.g1', 'g.g2', 'g.labels'] },
        { say: 'So twelve divided by three is four.', show: 'm.0', focus: 'm.0' },
        { say: 'Now go backwards. Three groups of four counters is four times three, which is twelve. Multiplying takes us back to where we started.', show: 'm.1', focus: 'm.1' },
        { say: 'Division undoes multiplication. Every division has a matching multiplication that checks it.' },
      ],
    },
    {
      chapter: 'Trying to divide by zero',
      layout: 'split',
      leftWidth: 620,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Try', 'Times 0', 'Makes 12?'],
          rows: [
            ['$1$', '$1 \\times 0 = 0$', 'no'],
            ['$5$', '$5 \\times 0 = 0$', 'no'],
            ['$12$', '$12 \\times 0 = 0$', 'no'],
            ['$100$', '$100 \\times 0 = 0$', 'no'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['12 \\div 0 = \\ ?', '? \\times 0 = 12'] }],
      lines: [
        { say: 'Now try twelve divided by zero. Call the answer question mark.', show: 'm.0', focus: 'm.0' },
        { say: 'If twelve divided by zero had an answer, then the answer times zero would have to give back twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Let’s try some numbers. One times zero is zero. Five times zero is zero. Twelve times zero is zero. Even one hundred times zero is zero.', show: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'Any number times zero is zero. No number times zero makes twelve. So twelve divided by zero has no answer. We say we cannot divide by zero.' },
      ],
    },
    {
      chapter: 'Sharing into zero groups',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 \\div 3: \\quad 3 + 3 + 3 + 3 = 12 \\quad (4 \\text{ groups})', '12 \\div 0: \\quad 0 + 0 + 0 + 0 + \\cdots = 0'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'We cannot divide by 0', md: 'Dividing by $0$ asks: how many groups of $0$ make $12$? No number of empty groups ever adds up to $12$, so there is **no answer**.' },
      ],
      lines: [
        { say: 'Here is another way to picture it. Twelve divided by three asks: how many groups of three make twelve? Four groups do.', show: 'm.0', focus: 'm.0' },
        { say: 'So twelve divided by zero asks: how many groups of zero make twelve? A group of zero is an empty group.', show: 'm.1', focus: 'm.1' },
        { say: 'Ten empty groups hold nothing. A thousand empty groups still hold nothing. However many you take, you never get twelve. That is why there is no answer.', show: 'key' },
      ],
    },
    {
      chapter: 'Dividing zero is fine',
      layout: 'split',
      leftWidth: 560,
      left: [none],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['0 \\div 5 = 0', '\\text{because } 0 \\times 5 = 0'] }],
      lines: [
        { say: 'Dividing zero by a number is different. That is fine. Share zero counters into five groups.', show: 'z.rings' },
        { say: 'There is nothing to share, so every group gets zero. Zero divided by five is zero.', show: ['z.zeros', 'm.0'], focus: 'm.0' },
        { say: 'Check it with multiplication. Zero times five is zero, which is where we started. So the answer zero is right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Saying 12 ÷ 0 = 0', md: 'Check it with multiplication: $0 \\times 0 = 0$, not $12$. So $0$ is not the answer. **There is no answer.**' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0 \\div 5 = 0 \\quad \\good{\\checkmark}', '12 \\div 0 \\ \\text{has no answer}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Some people say that twelve divided by zero is zero.', show: 'oops' },
        { say: 'Check it with multiplication. If the answer were zero, then zero times zero would be twelve. But zero times zero is zero. So zero is not the answer. There is no answer at all.' },
        { say: 'Remember the difference. Zero divided by a number is zero. A number divided by zero has no answer.', show: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these has **no** answer?',
          choices: ['$0 \\div 8$', '$8 \\div 8$', '$8 \\div 0$', '$0 \\div 1$'],
          answer: 2,
          working: '$8 \\div 0$ would need a number that gives $8$ when multiplied by $0$, and there is none. $0 \\div 8 = 0$, because $0 \\times 8 = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these divisions has no answer? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, eight divided by zero. No number times zero makes eight. Choice A, zero divided by eight, does have an answer. It is zero, because zero times eight is zero.', show: 'q.answer' },
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
            'Division undoes multiplication: $12 \\div 3 = 4$ because $4 \\times 3 = 12$.',
            'We **cannot divide by $0$**: no number times $0$ gives a number that is not $0$.',
            'Dividing $0$ by a number is fine: $0 \\div 5 = 0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Division undoes multiplication. Twelve divided by three is four, because four times three is twelve.', show: 'sum.0' },
        { say: 'We cannot divide by zero, because no number times zero makes twelve, or any number other than zero.', show: 'sum.1' },
        { say: 'But dividing zero by a number is fine: the answer is zero. In the next lesson, you will see how fractions and decimals are connected by division. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
