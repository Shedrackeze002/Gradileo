import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { machine, shift } from '@/content/math6/videos/lib/m6-11-figures.ts';

// 3n + 1 forwards (n = 50 gives 151), and backwards from 64: 64 − 1 = 63, 63 ÷ 3 = 21.
const forwards = (id: string) =>
  figure(id, [machine({ name: 'f', steps: ['\\times 3', '+ 1'], titles: ['n', '\\text{toothpicks}'], sets: [{ in: '50', mids: ['150'], out: '151' }] })], 210);

const both = (id: string) =>
  figure(id, [
    join(
      machine({ name: 'f', steps: ['\\times 3', '+ 1'], titles: ['n', '\\text{toothpicks}'], sets: [{ in: '?', mids: ['?'], out: '64' }] }),
      shift(machine({ name: 'b', steps: ['- 1', '\\div 3'], titles: ['\\text{toothpicks}', 'n'], sets: [{ in: '64', mids: ['63'], out: '21', tone: 'opp' }] }), 0, -3.8),
    ),
  ]);

const video: Explainer = {
  id: 'm7-5-1-d',
  lessonId: 'm7-5-1',
  title: 'Patterns and Linear Relations, Part 4: Using a Relation',
  thumbnailTitle: 'Using a Relation',
  thumbnail: 'wb',
  summary:
    'Once you have the relation, you can find any term without drawing it: Figure 50 of the toothpick pattern uses 3(50) + 1 = 151 toothpicks. To find which figure has a certain value, work backwards and undo the steps in reverse order: 3n + 1 = 64, so 64 − 1 = 63 and 63 ÷ 3 = 21, and Figure 21 uses 64 toothpicks. In the same way, 30 chairs need (30 − 2) ÷ 2 = 14 tables.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Patterns and Linear Relations · Part 4', title: 'Using a Relation', subtitle: 'Forwards and backwards' }],
      lines: [
        { say: 'At last, we can answer the question from the start: how many toothpicks are needed for fifty squares? And we can go backwards as well.', show: 'title' },
        { say: 'In this part, you will use a relation to find any term, and work backwards to find which figure has a certain number of toothpicks.' },
      ],
    },
    {
      chapter: 'Figure 50',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The toothpick pattern is $t = 3n + 1$. How many toothpicks are in Figure $50$?' },
        forwards('fw'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(50) + 1 = 150 + 1 = 151'] },
      ],
      lines: [
        { say: 'The toothpick pattern is t equals three n plus one. How many toothpicks are in Figure fifty?', show: 'q' },
        { say: 'The relation is like a machine. It takes the figure number, multiplies by three, then adds one.', show: ['fw.f-frame', 'fw.f-titles', 'fw.f-box0', 'fw.f-box1'] },
        { say: 'Put in fifty. Three times fifty is one hundred and fifty. Add one to get one hundred and fifty-one.', show: 'fw.f-set0' },
        { say: 'In numbers, replace n with fifty: three times fifty, plus one, is one hundred and fifty-one. So Figure fifty uses one hundred and fifty-one toothpicks. No drawing needed!', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'split',
      leftWidth: 640,
      left: [both('wb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which figure uses $64$ toothpicks?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3n + 1 = 64', '64 - 1 = 63', '63 \\div 3 = 21', '3(21) + 1 = 64 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Now go the other way. Which figure uses sixty-four toothpicks? We need three n plus one to equal sixty-four.', show: ['q', 'm.0', 'wb.f-frame', 'wb.f-titles', 'wb.f-box0', 'wb.f-box1', 'wb.f-set0'] },
        { say: 'Work backwards. The machine multiplies first and adds last. So to undo it, start with the last step.', show: ['wb.b-frame', 'wb.b-titles', 'wb.b-box0', 'wb.b-box1', 'wb.b-set0-in'] },
        { say: 'Undo adding one by subtracting one. Sixty-four minus one is sixty-three.', show: ['wb.b-set0-mid0', 'm.1'], focus: ['wb.b-box0', 'm.1'] },
        { say: 'Undo multiplying by three by dividing by three. Sixty-three divided by three is twenty-one.', show: ['wb.b-set0-out', 'm.2'], focus: ['wb.b-box1', 'm.2'] },
        { say: 'Check: three times twenty-one is sixty-three, plus one is sixty-four. It works. So Figure twenty-one uses sixty-four toothpicks.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Undo in reverse order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Undo in reverse order', md: 'The expression $3n + 1$ **multiplies first** and **adds last**. To work backwards, **subtract first** and **divide last**.' },
      ],
      lines: [
        { say: 'Here is the key idea. The expression three n plus one multiplies first, and adds last.', show: 'tip' },
        { say: 'To work backwards, undo the steps in reverse order. Subtract first, and divide last.' },
        { say: 'It is like getting dressed. You put on your socks, then your shoes. To undress, you take off your shoes first, then your socks.' },
      ],
    },
    {
      chapter: 'Chairs for a party',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Square tables in a row need $2n + 2$ chairs for $n$ tables. How many tables are needed for $30$ chairs?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2n + 2 = 30', '30 - 2 = 28 \\qquad 28 \\div 2 = 14', '\\text{Check: } 2(14) + 2 = 30 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Try it with the tables and chairs. A row of n square tables needs two n plus two chairs. How many tables are needed for thirty chairs?', show: ['q', 'm.0'] },
        { say: 'The expression multiplies by two, then adds two. Undo in reverse order. Subtract two: thirty minus two is twenty-eight. Then divide by two: twenty-eight divided by two is fourteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: two times fourteen is twenty-eight, plus two is thirty. So fourteen tables are needed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pattern has the expression $4n + 2$. Which term number $n$ has the value $50$?',
          choices: ['$202$', '$13$', '$48$', '$12$'],
          answer: 3,
          working: 'Undo in reverse order: $50 - 2 = 48$, then $48 \\div 4 = 12$. Check: $4(12) + 2 = 50$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pattern has the expression four n plus two. Which term number n has the value fifty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, twelve. Undo in reverse order: fifty minus two is forty-eight, and forty-eight divided by four is twelve. Choice A puts fifty in place of n, but fifty is the value of the term, not the term number.', show: 'q.answer' },
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
            'Substitute a term number to find a term: $3(50) + 1 = 151$.',
            'Work backwards to find a term number: undo the steps in reverse order.',
            '$3n + 1 = 64$: subtract $1$, then divide by $3$, so $n = 21$.',
            'Always check your answer in the expression.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a term, substitute the term number into the expression.', show: 'sum.0' },
        { say: 'To find a term number, work backwards: undo the steps in reverse order.', show: 'sum.1' },
        { say: 'For three n plus one equals sixty-four, subtract one, then divide by three. The answer is twenty-one.', show: 'sum.2' },
        { say: 'And always check your answer in the expression. Next, you will make tables of values and graphs. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
