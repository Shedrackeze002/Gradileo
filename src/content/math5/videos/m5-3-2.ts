import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters, rainbow } from './lib/m5-3-figures.ts';

// Twelve counters in equal rows: 1 row of 12, 2 rows of 6 and 3 rows of 4.
const arrays = figure('ar', [
  counters({ name: 'a', rows: 1, cols: 12, label: '1 \\times 12' }),
  counters({ name: 'b', rows: 2, cols: 6, at: [0, -1.9], label: '2 \\times 6', tone: 'opp' }),
  counters({ name: 'c', rows: 3, cols: 4, at: [7.5, -1.9], label: '3 \\times 4', tone: 'good' }),
]);

const video: Explainer = {
  id: 'm5-3-2',
  lessonId: 'm5-3-2',
  title: 'Finding Factors, Part 1: Factors and Factor Pairs',
  thumbnailTitle: 'Factors and Factor Pairs',
  thumbnail: 'ar',
  summary: 'A factor divides a number with no remainder, and two factors that multiply to give the number are a factor pair. Twelve counters in equal rows give the factor pairs 1 × 12, 2 × 6 and 3 × 4; a missing partner is found by dividing (4 × □ = 36 gives 9).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Divisibility and Factors · Part 1', title: 'Factors and Factor Pairs', subtitle: 'Numbers that fit exactly' }],
      lines: [
        { say: 'Twelve chairs can stand in one long row, in two rows of six, or in three rows of four. Each way uses all twelve chairs, with none left over.', show: 'title' },
        { say: 'In this video, you will learn about factors, and how they come in pairs.' },
      ],
    },
    {
      chapter: 'Factors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factor', md: 'A **factor** of a number divides that number with no remainder. $4$ is a factor of $12$ because $12 \\div 4 = 3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['12 \\div 4 = 3 \\text{ R } 0 \\;\\;\\good{\\text{factor}}', '12 \\div 5 = 2 \\text{ R } 2 \\;\\;\\bad{\\text{not a factor}}'] },
      ],
      lines: [
        { say: 'A factor of a number is a number that divides it with no remainder.', show: 'def' },
        { say: 'Four is a factor of twelve, because twelve divided by four is three, with nothing left over.', show: 'm.0', focus: 'm.0' },
        { say: 'Five is not a factor of twelve, because twelve divided by five is two, remainder two.', show: 'm.1', focus: 'm.1' },
        { say: 'So a factor is like a number that fits into another number exactly. You already know how to check, with the divisibility tests and by dividing.' },
      ],
    },
    {
      chapter: 'Twelve in equal rows',
      layout: 'center',
      main: [arrays],
      lines: [
        { say: 'Let’s arrange twelve counters in equal rows, with none left over. One row of twelve works.', show: ['ar.a-row0', 'ar.a-label'] },
        { say: 'Two rows of six works as well.', show: ['ar.b-row0', 'ar.b-row1', 'ar.b-label'] },
        { say: 'And so do three rows of four.', show: ['ar.c-row0', 'ar.c-row1', 'ar.c-row2', 'ar.c-label'] },
        { say: 'Each arrangement gives two numbers that multiply to make twelve: one times twelve, two times six, and three times four.', focus: ['ar.a-label', 'ar.b-label', 'ar.c-label'] },
      ],
    },
    {
      chapter: 'Factor pairs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factor pair', md: 'A **factor pair** is two factors that multiply to give the number. $3 \\times 4 = 12$, so $3$ and $4$ are a factor pair of $12$.' },
        figure('rb', [rainbow({ factors: [1, 2, 3, 4, 6, 12], gap: 1.6 })], 240),
      ],
      lines: [
        { say: 'Two factors that multiply to give the number are called a factor pair. Three times four is twelve, so three and four are a factor pair of twelve.', show: 'def' },
        { say: 'Let’s write all the factors of twelve in order: one, two, three, four, six and twelve.', show: ['rb.f0', 'rb.f1', 'rb.f2', 'rb.f3', 'rb.f4', 'rb.f5'] },
        { say: 'Now join each factor to its partner. One goes with twelve, two goes with six, and three goes with four.', show: ['rb.p0', 'rb.p1', 'rb.p2'] },
        { say: 'The arcs look like a rainbow! A factor rainbow helps you see that every factor has a partner.' },
      ],
    },
    {
      chapter: 'A missing partner',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4 \\times \\square = 36', '\\square = 36 \\div 4 = 9', '\\text{Check: } 4 \\times 9 = 36 \\;\\checkmark'] }],
      lines: [
        { say: 'Four times box equals 36. What is the other factor?', show: 'm.0', focus: 'm.0' },
        { say: 'Division undoes multiplication. So the box is 36 divided by four, which is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: four times nine is 36. So four and nine are a factor pair of 36.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'One and the number itself',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: '1 and the number itself', md: 'Every number has $1$ and itself as factors: $36 = 1 \\times 36$. A factor is never bigger than the number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 = 1 \\times 7', '36 = 1 \\times 36'] },
      ],
      lines: [
        { say: 'Here is something that is always true. Every number has one and itself as factors. For example, 36 is one times 36, and seven is one times seven.', show: ['tip', 'm.0', 'm.1'] },
        { say: 'And a factor is never bigger than the number. A number bigger than 36 cannot fit into 36 even once.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$6 \\times \\square = 42$. What is the missing factor?',
          choices: ['$6$', '$36$', '$48$', '$7$'],
          answer: 3,
          working: 'Divide: $\\square = 42 \\div 6 = 7$. Check: $6 \\times 7 = 42$. So $6$ and $7$ are a factor pair of $42$.',
        },
      ],
      lines: [
        { say: 'Your turn. Six times box equals 42. What is the missing factor? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Divide: 42 divided by six is seven. Check: six times seven is 42. Choice B, 36, subtracts six from 42 instead of dividing.', show: 'q.answer' },
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
          items: ['A factor of a number divides it with no remainder.', 'Two factors that multiply to give the number are a factor pair.', 'Find a missing partner by dividing.', 'Every number has $1$ and itself as factors.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A factor of a number divides it with no remainder.', show: 'sum.0' },
        { say: 'Two factors that multiply to give the number are a factor pair.', show: 'sum.1' },
        { say: 'You can find a missing partner by dividing.', show: 'sum.2' },
        { say: 'And every number has one and itself as factors. In the next part, we find all the factors of a number. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
