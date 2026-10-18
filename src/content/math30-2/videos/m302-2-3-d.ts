import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m302-2-counting.ts';

const T = '\\adj{\\text{T}}';
const S = '\\opp{\\text{S}}';

const video: Explainer = {
  id: 'm302-2-3-d',
  lessonId: 'm302-2-3',
  title: 'Permutations with Repetition and Restrictions, Part 4: Alternating Patterns',
  thumbnailTitle: 'Alternating Patterns',
  thumbnail: 'pat',
  summary: 'Counting arrangements that alternate between two groups: first the patterns, then the people in them. Three teachers and three students alternating in a row of six chairs: 2 × 3! × 3! = 72 seatings. With 4 teachers and 3 students there is only one pattern: 4! × 3! = 144.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 4', title: 'Alternating Patterns', subtitle: 'First the pattern, then the people' }],
      lines: [
        { say: 'For a choir photo, three teachers and three students sit in a row of six chairs, alternating teacher, student, teacher, student.', show: 'title' },
        { say: 'In this video, you will count arrangements that alternate between two groups. First count the patterns, then arrange the people in them.' },
      ],
    },
    {
      chapter: 'The patterns',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Three teachers and three students sit in a row of six chairs, alternating teacher and student. How many seatings are possible?' },
        figure('pat', [
          slots({ name: 'a', values: [T, S, T, S, T, S], at: [0, 2], size: 1.3, gap: 0.5 }),
          slots({ name: 'b', values: [S, T, S, T, S, T], at: [0, 0], size: 1.3, gap: 0.5 }),
        ], 250),
      ],
      lines: [
        { say: 'Three teachers and three students sit in a row of six chairs, alternating teacher and student. How many seatings are possible?', show: 'p' },
        { say: 'Start with the pattern, before thinking about who sits where. The row could start with a teacher: teacher, student, teacher, student, teacher, student.', show: ['pat.a-boxes', 'pat.a-values'], focus: 'pat.a-values' },
        { say: 'Or the row could start with a student: student, teacher, student, teacher, student, teacher.', show: ['pat.b-boxes', 'pat.b-values'], focus: 'pat.b-values' },
        { say: 'Once the first chair is chosen, the rest of the pattern is fixed. So there are exactly two patterns.' },
      ],
    },
    {
      chapter: 'Arrange each group',
      layout: 'center',
      main: [
        figure('one', [slots({ values: ['3', '3', '2', '2', '1', '1'], captions: ['\\text{teacher}', '\\text{student}', '\\text{teacher}', '\\text{student}', '\\text{teacher}', '\\text{student}'], size: 1.3, gap: 0.5 })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Teachers: } 3! = 6 \\qquad \\text{Students: } 3! = 6', '\\text{Each pattern: } 3! \\times 3! = 36', '\\text{Both patterns: } 2 \\times 3! \\times 3! = 72'] },
      ],
      lines: [
        { say: 'Now take one pattern, starting with a teacher. The three teachers go in the three teacher chairs, in any order: three, then two, then one choices. That is three factorial, or six.', show: ['one.boxes', 'one.captions', 'one.v0', 'one.v2', 'one.v4', 'm.0'], focus: ['one.v0', 'one.v2', 'one.v4'] },
        { say: 'The three students go in the three student chairs, in any order: three factorial again, or six.', show: ['one.v1', 'one.v3', 'one.v5'], focus: ['one.v1', 'one.v3', 'one.v5'] },
        { say: 'The teachers and the students are arranged together, so multiply: six times six is thirty-six seatings for this pattern.', show: ['one.times', 'm.1'], focus: 'm.1' },
        { say: 'The other pattern, starting with a student, has thirty-six seatings as well. So there are two times thirty-six, or seventy-two, seatings in all.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'One more of one group',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'With 4 teachers and 3 students alternating in a row of seven chairs, how many seatings are possible?' },
        figure('odd', [slots({ values: [T, S, T, S, T, S, T], size: 1.2, gap: 0.45 })], 160),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{One pattern: } 4! \\times 3! = 24 \\times 6 = 144'] },
      ],
      lines: [
        { say: 'What if one group is bigger? Four teachers and three students sit in a row of seven chairs, alternating.', show: 'p' },
        { say: 'Now the row must start and end with a teacher: teacher, student, teacher, student, teacher, student, teacher. Starting with a student would need four students. So there is only one pattern.', show: ['odd.boxes', 'odd.values'], focus: 'odd.values' },
        { say: 'Arrange the four teachers in their chairs in four factorial, or twenty-four, ways, and the three students in three factorial, or six, ways.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply: twenty-four times six is 144 seatings.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the second pattern', md: 'When the two groups are the same size, the row can start with either group: **two** patterns. When one group has one more, it must start and end the row: **one** pattern.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\text{ and } 3: \\ \\bad{3! \\times 3! = 36} \\quad \\good{2 \\times 3! \\times 3! = 72}', '4 \\text{ and } 3: \\ \\good{4! \\times 3! = 144}'] },
      ],
      lines: [
        { say: 'A common mistake is to count only one pattern. With three teachers and three students, three factorial times three factorial gives thirty-six, which is only the seatings that start with a teacher.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'When the groups are the same size, the row can start with either group, so there are two patterns. When one group has one more, that group must start and end the row, so there is only one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Four adults and four children sit in a row of 8 seats, alternating adult and child. How many seatings are possible?',
          choices: ['$576$', '$40\\,320$', '$48$', '$1152$'],
          answer: 3,
          working: 'Two patterns (start with an adult or a child). Each: $4! \\times 4! = 24 \\times 24 = 576$. Total: $2 \\times 576 = 1152$.',
        },
      ],
      lines: [
        { say: 'Your turn. Four adults and four children sit in a row of eight seats, alternating adult and child. How many seatings are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 1,152. The groups are the same size, so there are two patterns. In each, the adults can be arranged in four factorial, or twenty-four, ways, and the children in twenty-four ways: 576. Two times 576 is 1,152. Choice A, 576, counts only one pattern.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count the patterns first: two when the groups are the same size, one when a group has one more.', 'Then arrange each group in its own spots, and multiply.', '3 teachers and 3 students: $2 \\times 3! \\times 3! = 72$. 4 teachers and 3 students: $4! \\times 3! = 144$.'] }],
      lines: [
        { say: 'Let’s sum up. Count the patterns first: two when the groups are the same size, and one when a group has one more.', show: 'sum.0' },
        { say: 'Then arrange each group in its own spots, and multiply.', show: 'sum.1' },
        { say: 'For three teachers and three students, that gave seventy-two seatings, and for four teachers and three students, 144. In the next lesson, we count selections where order does not matter: combinations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
