import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, rainbow } from './lib/m5-3-figures.ts';

// The factors of 36: 1 and 36, 2 and 18, 3 and 12, 4 and 9, and 6, its own partner (ringed).
const rb = figure('rb', [rainbow({ factors: [1, 2, 3, 4, 6, 9, 12, 18, 36], size: '\\large' })]);

// 36 chairs as 6 rows of 6.
const square = figure('sq', [counters({ rows: 6, cols: 6, tone: 'good', label: '6 \\times 6 = 36' })], 420);

const video: Explainer = {
  id: 'm5-3-2-c',
  lessonId: 'm5-3-2',
  title: 'Finding Factors, Part 3: Factors in Problems',
  thumbnailTitle: 'Factors in Problems',
  thumbnail: 'rb',
  summary: 'Problems about equal rows or equal groups are asking for factors. Mr. Okafor puts 36 chairs in equal rows: any factor of 36 works (1, 2, 3, 4, 6, 9, 12, 18 or 36 chairs in a row), and 6 × 6 gives the factor 6 only once.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Divisibility and Factors · Part 3', title: 'Factors in Problems', subtitle: 'Equal rows and equal groups' }],
      lines: [
        { say: 'Many problems about equal rows or equal groups are really asking for factors. Once you see that, they become much easier.', show: 'title' },
        { say: 'In this video, you will use factors to solve a problem about rows of chairs.' },
      ],
    },
    {
      chapter: 'Equal rows',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Equal rows, equal groups', md: 'When things are put in **equal rows** or **equal groups** with none left over, the number in each row or group is a **factor** of the total.' },
        { kind: 'text', id: 't', size: 'md', md: '$12$ chairs: $1$, $2$, $3$, $4$, $6$ or $12$ in each row.' },
      ],
      lines: [
        { say: 'When things are put in equal rows, or equal groups, with none left over, the number in each row is a factor of the total.', show: 'key' },
        { say: 'Remember the twelve chairs. They could be in rows of one, two, three, four, six or twelve. Those are exactly the factors of twelve.', show: 't' },
        { say: 'Five chairs in a row does not work, because two would be left over. And five is not a factor of twelve.' },
      ],
    },
    {
      chapter: 'Rows of chairs',
      layout: 'split',
      leftWidth: 700,
      left: [rb],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Mr. Okafor has $36$ chairs. He wants equal rows with no chairs left over. How many chairs could be in each row?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 \\times 36 \\qquad 2 \\times 18', '3 \\times 12 \\qquad 4 \\times 9', '5\\colon \\; \\bad{\\text{no}} \\qquad 6 \\times 6'] },
      ],
      lines: [
        { say: 'Mr. Oh-kah-for has 36 chairs. Mr. Oh-kah-for wants to put them in equal rows, with no chairs left over. How many chairs could be in each row?', caption: 'Mr. Okafor has 36 chairs. Mr. Okafor wants to put them in equal rows, with no chairs left over. How many chairs could be in each row?', show: 'q' },
        { say: 'The number of chairs in each row must be a factor of 36. So let’s find the factor pairs of 36, in order.' },
        { say: 'One times 36. Two times eighteen, because 36 is even.', show: ['m.0', 'rb.f0', 'rb.f8', 'rb.p0', 'rb.f1', 'rb.f7', 'rb.p1'], focus: 'm.0' },
        { say: 'Three times twelve, because three plus six is nine, which is in the three times table. And four times nine, because 36 divided by four is nine.', show: ['m.1', 'rb.f2', 'rb.f6', 'rb.p2', 'rb.f3', 'rb.f5', 'rb.p3'], focus: 'm.1' },
        { say: 'Five is not a factor, because the last digit is six, not zero or five. And six times six is 36. The partner of six is six itself! It is ringed.', show: ['m.2', 'rb.f4', 'rb.self'], focus: ['m.2', 'rb.self'] },
        { say: 'Seven times seven is 49, which is bigger than 36, so we can stop. There could be 1, 2, 3, 4, 6, 9, 12, 18 or 36 chairs in each row.', focus: 'rb' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Writing a factor twice', md: '$6 \\times 6 = 36$ is one factor pair, but $6$ is only one factor. List it once.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{1,\\ 2,\\ 3,\\ 4,\\ 6,\\ 6,\\ 9,\\ 12,\\ 18,\\ 36}', '\\good{1,\\ 2,\\ 3,\\ 4,\\ 6,\\ 9,\\ 12,\\ 18,\\ 36}'] },
      ],
      lines: [
        { say: 'Be careful with six times six. It is one factor pair, but six is only one factor. So write it in the list just once.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18 and 36. That is nine factors.', show: 'm.1', focus: 'm.1' },
        { say: 'Numbers like 36, 25 and 49 have a factor that is its own partner. So they have an odd number of factors.' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'split',
      leftWidth: 460,
      left: [square],
      right: [{ kind: 'bullets', id: 'b', items: ['$1$ chair in a row: $36$ rows.', '$36$ chairs in a row: one long row.', '$6$ in a row: $6$ rows of $6$, a square.'] }],
      lines: [
        { say: 'Every answer works, but think about what each one means for the room. One chair in each row means 36 rows of one chair. That is a very long, thin line!', show: 'b.0' },
        { say: 'Thirty-six chairs in a row means one very long row.', show: 'b.1' },
        { say: 'Six chairs in each row gives six rows of six, a neat square. All of these use every chair, with none left over.', show: ['b.2', 'sq.row0', 'sq.row1', 'sq.row2', 'sq.row3', 'sq.row4', 'sq.row5', 'sq.label'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A baker puts $20$ muffins in equal rows with none left over. Which could **not** be the number of muffins in a row?',
          choices: ['$4$', '$5$', '$6$', '$10$'],
          answer: 2,
          working: 'The number in a row must be a factor of $20$: $1, 2, 4, 5, 10$ or $20$. $6$ is not a factor, because $20 \\div 6 = 3$ R $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A baker puts twenty muffins in equal rows, with none left over. Which could not be the number of muffins in a row? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The number in each row must be a factor of twenty, and six is not: twenty divided by six is three, remainder two. Choice B works: four rows of five use all twenty muffins.', show: 'q.answer' },
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
          items: ['Equal rows or groups with none left over: the number in each is a factor of the total.', 'Find the factor pairs in order, and stop when the number times itself is too big.', 'A factor that pairs with itself, like $6 \\times 6$, is listed once.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When things are put in equal rows or groups with none left over, the number in each is a factor of the total.', show: 'sum.0' },
        { say: 'Find the factor pairs in order, and stop when the number you are checking, times itself, is bigger than the total.', show: 'sum.1' },
        { say: 'And a factor that pairs with itself is listed only once. Practise finding factors in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
