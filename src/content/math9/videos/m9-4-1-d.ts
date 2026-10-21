import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { machine, shift } from '@/content/math6/videos/lib/m6-11-figures.ts';

// t = 3n + 1 as a machine (× 3, then + 1), and the machine run backwards (− 1, then ÷ 3).
const machines = (id: string) =>
  figure(
    id,
    [
      machine({ name: 'fw', steps: ['\\times 3', '+\\,1'], titles: ['n', 't'], sets: [{ in: '?', mids: ['?'], out: '100' }] }),
      shift(machine({ name: 'bw', steps: ['-\\,1', '\\div 3'], titles: ['t', 'n'], sets: [{ in: '100', mids: ['99'], out: '33' }] }), 0, -3.4),
    ],
    420,
  );

const video: Explainer = {
  id: 'm9-4-1-d',
  lessonId: 'm9-4-1',
  title: 'Writing Equations to Describe Patterns, Part 4: Using the Equation',
  thumbnailTitle: 'Using the Equation',
  thumbnail: 'mc',
  summary:
    'Once an equation is verified, it finds values far beyond the table. For the toothpick squares, t = 3n + 1, Figure 50 has 3(50) + 1 = 151 toothpicks. To find which figure has 100 toothpicks, work backwards: 100 = 3n + 1, subtract 1 from both sides to get 3n = 99, then divide by 3 to get n = 33, and verify that 3(33) + 1 = 100. Not every number of toothpicks is possible: 50 = 3n + 1 gives n = 16.33…, which is not a figure number.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 4', title: 'Using the Equation', subtitle: 'Far beyond the table' }],
      lines: [
        { say: 'Once an equation is verified, you can trust it to find values far beyond the table, without drawing a single toothpick.', show: 'title' },
        { say: 'In this part, you will use an equation to find a figure far along a pattern, and to work backwards from a number of toothpicks to the figure.' },
      ],
    },
    {
      chapter: 'Far beyond the table',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Toothpick squares: $t = 3n + 1$. How many toothpicks are in Figure $50$?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['t = 3(50) + 1 = 150 + 1 = 151'] },
      ],
      lines: [
        { say: 'The toothpick squares follow the equation t equals three n plus one, where n is the figure number and t is the number of toothpicks.', show: 'q' },
        { say: 'How many toothpicks are in Figure fifty? Substitute n equals fifty: three times fifty, plus one, is one hundred fifty plus one, which is one hundred fifty-one.', show: 'm.0', focus: 'm.0' },
        { say: 'Drawing fifty squares would take a long time. The equation answers in one line.' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which figure has $100$ toothpicks?' },
        machines('mc'),
      ],
      lines: [
        { say: 'Now a different question. Which figure has one hundred toothpicks? This time you know t, and you want n.', show: 'q' },
        { say: 'Think of the equation as a machine. It takes the figure number, multiplies by three, then adds one, to give the number of toothpicks.', show: ['mc.fw-frame', 'mc.fw-box0', 'mc.fw-box1', 'mc.fw-titles'] },
        { say: 'Here, the output is one hundred, and the input is unknown.', show: 'mc.fw-set0', focus: 'mc.fw-set0' },
        { say: 'To work backwards, run the machine in reverse, and undo each step in the opposite order. First undo the plus one: subtract one. One hundred minus one is ninety-nine.', show: ['mc.bw-frame', 'mc.bw-box0', 'mc.bw-titles', 'mc.bw-set0-in', 'mc.bw-set0-mid0'], focus: 'mc.bw-box0' },
        { say: 'Then undo the times three: divide by three. Ninety-nine divided by three is thirty-three. So it is Figure thirty-three.', show: ['mc.bw-box1', 'mc.bw-set0-out'], focus: ['mc.bw-box1', 'mc.bw-set0-out'] },
      ],
    },
    {
      chapter: 'Solving the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['100 = 3n + 1', '100 - 1 = 3n + 1 - 1', '99 = 3n', '99 \\div 3 = 3n \\div 3', 'n = 33'] },
      ],
      lines: [
        { say: 'Here is the same thing with the equation. Substitute t equals one hundred: one hundred equals three n plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract one from both sides. Doing the same thing to both sides keeps the two sides equal. That leaves ninety-nine equals three n.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Divide both sides by three. Ninety-nine divided by three is thirty-three, so n equals thirty-three.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Verify',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(33) + 1 = 99 + 1 = 100 \\;\\good{\\checkmark}'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'Figure $33$ has $100$ toothpicks.' },
      ],
      lines: [
        { say: 'Always verify. Substitute n equals thirty-three back into the equation: three times thirty-three, plus one, is ninety-nine plus one, which is one hundred. It matches.', show: 'm.0', focus: 'm.0' },
        { say: 'So Figure thirty-three has one hundred toothpicks.', show: 'a' },
      ],
    },
    {
      chapter: 'Not every number works',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which figure has $50$ toothpicks?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['50 = 3n + 1 \\;\\to\\; 49 = 3n \\;\\to\\; n = 16.33\\ldots', '\\text{Figure 16: } 49 \\qquad \\text{Figure 17: } 52'] },
      ],
      lines: [
        { say: 'Here is something to watch for. Which figure has fifty toothpicks?', show: 'q' },
        { say: 'Subtract one: forty-nine equals three n. Divide by three: n is sixteen point three three, and so on.', show: 'm.0', focus: 'm.0' },
        { say: 'But figure numbers are whole numbers. Figure sixteen has forty-nine toothpicks, and Figure seventeen has fifty-two. No figure has exactly fifty toothpicks.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The equation $t = 4n + 2$ gives the number of tiles, $t$, in Figure $n$ of a pattern. Which figure has $86$ tiles?',
          choices: ['Figure $346$', 'Figure $22$', 'Figure $84$', 'Figure $21$'],
          answer: 3,
          working: '$86 = 4n + 2$. Subtract $2$: $84 = 4n$. Divide by $4$: $n = 21$. Check: $4(21) + 2 = 86$.',
        },
      ],
      lines: [
        { say: 'Your turn. The equation t equals four n plus two gives the number of tiles, t, in Figure n of a pattern. Which figure has eighty-six tiles? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, Figure twenty-one. Subtract two from both sides: four n equals eighty-four. Divide both sides by four: n equals twenty-one. Check: four times twenty-one, plus two, is eighty-six. Choice B adds two instead of subtracting it.', show: 'q.answer' },
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
            'To find a figure’s value, substitute its figure number: $t = 3(50) + 1 = 151$.',
            'To find the figure, work backwards: undo $+\\,1$, then undo $\\times 3$.',
            'Do the same to both sides of the equation, then verify.',
            'A figure number must be a whole number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the value for a figure, substitute its figure number.', show: 'sum.0' },
        { say: 'To find which figure has a value, work backwards, undoing each step in the opposite order.', show: 'sum.1' },
        { say: 'Do the same thing to both sides of the equation, then verify your answer.', show: 'sum.2' },
        { say: 'And remember that a figure number must be a whole number. In the next part, you will write an equation from a table that skips values. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
