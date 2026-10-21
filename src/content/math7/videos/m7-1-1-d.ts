import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { venn } from '@/video/numbers.ts';
import { dotGroups } from '@/content/math6/videos/lib/m6-4-figures.ts';
import { carroll, tag } from './lib/m7-1-figures.ts';

// A Carroll diagram that sorts eight numbers by 3 (across the top) and by 4 (down the side).
const sorter = carroll({
  cols: ['\\text{Divisible by 3}', '\\text{Not divisible by 3}'],
  rows: ['\\text{Divisible by 4}', '\\text{Not divisible by 4}'],
  cells: [
    [['312', '1200'], ['128', '2020']],
    [['135', '2001'], ['70', '1001']],
  ],
  colW: 6,
  headW: 5.8,
  rowH: 1.4,
  headH: 1.1,
});
const grid = figure('c', [sorter], 300);

// The same numbers in a Venn diagram: the overlap is divisible by both 3 and 4.
const circles = figure('v', [
  venn({ titles: ['\\text{Divisible by 3}', '\\text{Divisible by 4}'], left: ['135', '2001'], both: ['312', '1200'], right: ['128', '2020'] }),
  tag('out', [5.4, -2.7], '70 \\qquad 1001', { place: 'right', tone: 'muted' }),
], 440);

// 234 students in 26 teams of 9.
const teams = figure('t', [dotGroups({ groups: 26, size: 9, cols: 3, perRow: 9 })], 380);

const video: Explainer = {
  id: 'm7-1-1-d',
  lessonId: 'm7-1-1',
  title: 'Divisibility Rules, Part 4: Sorting Numbers and Sharing Equally',
  thumbnailTitle: 'Sorting Numbers and Sharing Equally',
  thumbnail: 'c',
  summary:
    'A Carroll diagram sorts numbers by two rules, and each number goes in exactly one section: 312 has digit sum 6 and ends in 12 = 4 × 3, so it is divisible by both 3 and 4. In a Venn diagram, the numbers in the overlap pass both rules. 234 students can be split into teams of 9 with nobody left out, because 2 + 3 + 4 = 9: there are 234 ÷ 9 = 26 teams.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Number Relationships · Part 4', title: 'Sorting Numbers and Sharing Equally', subtitle: 'Carroll diagrams, Venn diagrams and teams' }],
      lines: [
        { say: 'Divisibility rules are not just for testing one number. You can use them to sort a whole set of numbers, and to share things out fairly.', show: 'title' },
        { say: 'In this part, you will sort numbers in a Carroll diagram and a Venn diagram, and split a big group of students into equal teams.' },
      ],
    },
    {
      chapter: 'A Carroll diagram',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Carroll diagram', md: 'A **Carroll diagram** sorts things using two rules. Each column and each row is one rule or its opposite, so every number goes in **exactly one** section.' },
        grid,
      ],
      lines: [
        { say: 'A Carroll diagram is a table that sorts things using two rules.', show: 'def' },
        { say: 'This one sorts numbers by three, across the top, and by four, down the side. The columns are divisible by three, and not divisible by three. The rows are divisible by four, and not divisible by four.', show: 'c.frame' },
        { say: 'Every number fits in exactly one of the four sections. To place a number, you test it with both rules.' },
      ],
    },
    {
      chapter: 'Sorting the numbers',
      layout: 'center',
      main: [
        grid,
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '312: \\ 3 + 1 + 2 = 6 \\ \\good{\\checkmark} \\qquad 12 = 4 \\times 3 \\ \\good{\\checkmark}',
            '128: \\ 1 + 2 + 8 = 11 \\ \\bad{\\times} \\qquad 28 = 4 \\times 7 \\ \\good{\\checkmark}',
            '135: \\ 1 + 3 + 5 = 9 \\ \\good{\\checkmark} \\qquad 35 \\text{ is not a multiple of } 4 \\ \\bad{\\times}',
            '70: \\ 7 + 0 = 7 \\ \\bad{\\times} \\qquad 70 \\text{ is not a multiple of } 4 \\ \\bad{\\times}',
          ],
        },
      ],
      lines: [
        { say: 'Start with three hundred twelve. Its digit sum is three plus one plus two, which is six. Six is divisible by three, so three hundred twelve is as well.', show: ['c.frame', 'm.0'], focus: 'm.0' },
        { say: 'Its last two digits make twelve, which is four times three. So it is divisible by four. It goes in the top left section: divisible by three and by four.', show: ['c.n00-0', 'c.h00'], focus: 'c.n00-0' },
        { say: 'One hundred twenty-eight has digit sum eleven, so it is not divisible by three. But twenty-eight is four times seven, so it is divisible by four. It goes top right.', hide: 'c.h00', show: ['m.1', 'c.n01-0', 'c.h01'], focus: ['m.1', 'c.n01-0'] },
        { say: 'One hundred thirty-five has digit sum nine, so it is divisible by three. But thirty-five is not a multiple of four. It goes bottom left.', hide: 'c.h01', show: ['m.2', 'c.n10-0', 'c.h10'], focus: ['m.2', 'c.n10-0'] },
        { say: 'Seventy fails both tests. Its digit sum is seven, and seventy is not a multiple of four. It goes bottom right.', hide: 'c.h10', show: ['m.3', 'c.n11-0', 'c.h11'], focus: ['m.3', 'c.n11-0'] },
        { say: 'Test the other four numbers the same way, and each one lands in its own section.', hide: 'c.h11', show: ['c.n00-1', 'c.n01-1', 'c.n10-1', 'c.n11-1'], focus: 'c' },
      ],
    },
    {
      chapter: 'A Venn diagram',
      layout: 'center',
      main: [circles, { kind: 'text', id: 'key', size: 'md', align: 'center', md: 'The **overlap** holds the numbers that pass **both** rules.' }],
      lines: [
        { say: 'A Venn diagram sorts numbers in a similar way. Each circle holds the numbers that pass one rule.', show: ['v.a', 'v.b'] },
        { say: 'The left circle is for numbers divisible by three. The right circle is for numbers divisible by four.', focus: ['v.a', 'v.b'] },
        { say: 'The circles overlap in the middle. Three hundred twelve and one thousand two hundred go in the overlap, because they pass both tests.', show: ['v.lens', 'v.both', 'key'], focus: 'v.both' },
        { say: 'Numbers divisible by only one of them go in the rest of that circle.', show: ['v.left', 'v.right'], focus: ['v.left', 'v.right'] },
        { say: 'Seventy and one thousand one pass neither test, so they go outside both circles.', show: 'v.out', focus: 'v.out' },
      ],
    },
    {
      chapter: 'Teams of nine',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Can $234$ students be split into teams of $9$ with nobody left out? If so, how many teams are there?' },
        teams,
        { kind: 'math', id: 'm', size: 'md', lines: ['2 + 3 + 4 = 9 \\ \\good{\\checkmark} \\qquad 234 \\div 9 = 26 \\text{ teams}'] },
      ],
      lines: [
        { say: 'Back to the question from the start of this lesson. Can two hundred thirty-four students be split into teams of nine, with nobody left out? If so, how many teams are there?', show: 'q' },
        { say: 'Nobody is left out when two hundred thirty-four is divisible by nine. The digit sum is two plus three plus four, which is nine. So yes, it is divisible by nine.' },
        { say: 'To find the number of teams, divide. Two hundred thirty-four divided by nine is twenty-six. Here are all the students, in twenty-six teams of nine, with nobody left over.', show: ['m', 't'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A Carroll diagram sorts numbers by $3$ and by $4$. Where does $222$ go?',
          choices: ['Divisible by $3$ and by $4$', 'Divisible by $3$, not by $4$', 'Divisible by $4$, not by $3$', 'Divisible by neither'],
          answer: 1,
          working: 'The digit sum of $222$ is $6$, which is divisible by $3$. The last two digits make $22$, which is not a multiple of $4$. So $222$ is divisible by $3$ but not by $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. A Carroll diagram sorts numbers by three and by four. Which section does two hundred twenty-two go in? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The digit sum is six, so two hundred twenty-two is divisible by three. Its last two digits make twenty-two, which is not a multiple of four. Choice A is wrong, because it fails the test for four.', show: 'q.answer' },
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
            'A **Carroll diagram** sorts numbers by two rules. Each number goes in exactly one section.',
            'In a **Venn diagram**, the overlap holds the numbers that pass both rules.',
            'Things share into equal groups of $9$ with none left over when the number is divisible by $9$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A Carroll diagram sorts numbers using two rules, and each number goes in exactly one section.', show: 'sum.0' },
        { say: 'In a Venn diagram, the numbers in the overlap pass both rules.', show: 'sum.1' },
        { say: 'And a group shares into equal teams with nobody left out when its size is divisible by the team size. In the next part, you will find out why we can never divide by zero. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
