import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { machine } from './lib/m6-11-figures.ts';

// The bean plant's rule: multiply the weeks by 3 (it grows 3 cm a week), then add 4 (its height at the start).
const rule = (id: string, values = true) =>
  figure(
    id,
    [
      machine({
        steps: ['\\times 3', '+ 4'],
        titles: ['\\text{weeks}', '\\text{height (cm)}'],
        sets: values ? [
          { in: '2', mids: ['6'], out: '10' },
          { in: '5', mids: ['15'], out: '19' },
          { in: '0', mids: ['0'], out: '4' },
          { in: '1', mids: ['3'], out: '7' },
        ] : [],
      }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm6-11-1-c',
  lessonId: 'm6-11-1',
  title: 'Independent and Dependent Variables, Part 3: The Rule',
  thumbnailTitle: 'The Rule of a Function',
  thumbnail: 'mc',
  summary: 'A function has a rule that turns each value of the independent variable into the value of the dependent variable, like a machine. For a bean plant 4 cm tall that grows 3 cm a week, the rule is “multiply the weeks by 3, then add 4”: after 2 weeks it is 2 × 3 + 4 = 10 cm, after 5 weeks 19 cm. Test a rule on two or three values before you trust it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions · Part 3', title: 'The Rule', subtitle: 'From the number of weeks to the height' }],
      lines: [
        { say: 'If you know how many weeks the bean plant has been growing, can you work out its height without measuring it?', show: 'title' },
        { say: 'Yes, you can, with a rule! In this video, you will use the rule of a function to find values of the dependent variable.' },
      ],
    },
    {
      chapter: 'A function machine',
      layout: 'center',
      main: [
        rule('mc', false),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rule', md: 'A function has a **rule** that turns each value of the **independent** variable into the value of the **dependent** variable.' },
      ],
      lines: [
        { say: 'A function has a rule. The rule turns each value of the independent variable into the value of the dependent variable.', show: 'def' },
        { say: 'Picture the rule as a machine. You put a number of weeks in, and the height of the plant comes out.', show: ['mc.frame', 'mc.titles'] },
        { say: 'For the bean plant, the rule is: multiply the number of weeks by three, then add four.', show: ['mc.box0', 'mc.box1'], focus: ['mc.box0', 'mc.box1'] },
        { say: 'Why? The plant grows three centimetres every week, so we multiply the weeks by three. And it was four centimetres tall at the start, so we add four.', focus: 'mc' },
      ],
    },
    {
      chapter: 'Using the rule',
      layout: 'center',
      main: [
        rule('ur'),
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 3 = 6, \\quad 6 + 4 = 10 \\;\\to\\; 10\\text{ cm}', '5 \\times 3 = 15, \\quad 15 + 4 = 19 \\;\\to\\; 19\\text{ cm}'] },
      ],
      lines: [
        { say: 'How tall is the plant after two weeks? Put two into the machine.', show: ['ur.frame', 'ur.titles', 'ur.box0', 'ur.box1', 'ur.set0-in'] },
        { say: 'First, multiply by three: two times three is six.', show: 'ur.set0-mid0', focus: 'ur.box0' },
        { say: 'Then add the starting height, four: six plus four is ten. After two weeks, the plant is ten centimetres tall.', show: ['ur.set0-out', 'm.0'], focus: ['ur.box1', 'm.0'] },
        { say: 'Now try five weeks. Five times three is fifteen, and fifteen plus four is nineteen. After five weeks, the plant is nineteen centimetres tall.', show: ['ur.set1-in', 'ur.set1-mid0', 'ur.set1-out', 'm.1'], hide: ['ur.set0-in', 'ur.set0-mid0', 'ur.set0-out'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Test the rule',
      layout: 'center',
      main: [
        rule('tr'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Test a rule on every row', md: 'A rule must work for **every** value, not just one. Test it on two or three values before you trust it.' },
      ],
      lines: [
        { say: 'How do we know the rule is right? Test it on values we already know.', show: ['tr.frame', 'tr.titles', 'tr.box0', 'tr.box1'] },
        { say: 'At the start, after zero weeks, the plant was four centimetres tall. Zero times three is zero, and zero plus four is four. That matches!', show: ['tr.set2-in', 'tr.set2-mid0', 'tr.set2-out'] },
        { say: 'After one week, it was seven centimetres tall. One times three is three, and three plus four is seven. That matches as well!', show: ['tr.set3-in', 'tr.set3-mid0', 'tr.set3-out'], hide: ['tr.set2-in', 'tr.set2-mid0', 'tr.set2-out'] },
        { say: 'A rule must work for every value, not just one. So test it on two or three values before you trust it.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The bean plant’s rule is: multiply the number of weeks by $3$, then add $4$. How tall is the plant after $6$ weeks?',
          choices: ['$13\\text{ cm}$', '$30\\text{ cm}$', '$22\\text{ cm}$', '$18\\text{ cm}$'],
          answer: 2,
          working: '$6 \\times 3 = 18$, then $18 + 4 = 22$, so $22\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The bean plant’s rule is: multiply the number of weeks by three, then add four. How tall is the plant after six weeks? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-two centimetres. Six times three is eighteen, and eighteen plus four is twenty-two. Choice B adds four first and then multiplies, but the rule multiplies first.', show: 'q.answer' },
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
          items: ['A rule turns each value of the independent variable into the value of the dependent variable.', 'Follow the steps in order: for the bean plant, multiply by $3$, then add $4$.', 'Test a rule on two or three values before you trust it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A function has a rule. It turns each value of the independent variable into the value of the dependent variable.', show: 'sum.0' },
        { say: 'Follow the steps of the rule in order. For the bean plant: multiply by three, then add four.', show: 'sum.1' },
        { say: 'And test a rule on two or three values before you trust it. In the next part, you will put the values of a function in a table. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
