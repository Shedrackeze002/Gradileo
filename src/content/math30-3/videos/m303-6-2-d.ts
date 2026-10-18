import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-6-2-d',
  lessonId: 'm303-6-2',
  title: 'Weighted and Trimmed Means, Part 4: The Mark You Need on a Final Exam',
  thumbnailTitle: 'The Mark You Need',
  thumbnail: false,
  summary: 'Working a weighted mean backwards: with assignments 25% (78%), unit tests 35% (70%) and a final exam 40%, a final mark of 75% needs 0.25(78) + 0.35(70) + 0.40x = 75, so 44 + 0.40x = 75 and x = 77.5%; and why 31 is what the exam must add, not the mark needed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 4', title: 'The Mark You Need', subtitle: 'Working a weighted mean backwards' }],
      lines: [
        { say: 'It is near the end of a course, and only the final exam is left. What mark do you need on it to reach the final mark you want?', show: 'title' },
        { say: 'In this video, you will work a weighted mean backwards to answer that question.' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'The mark you need', md: 'Let $x$ be the unknown mark. Write the weighted mean with $x$ in it, set it equal to the final mark you want, and solve for $x$.' }],
      lines: [
        { say: 'Here is the method. Let x be the unknown mark.', show: 'key' },
        { say: 'Write the weighted mean, with x in place of the mark you do not know yet. Set it equal to the final mark you want, and solve the equation for x.' },
      ],
    },
    {
      chapter: 'What does Sofia need?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Part', 'Weight', 'Mark'], rows: [['Assignments', '25%', '78%'], ['Unit tests', '35%', '70%'], ['Final exam', '40%', '$x$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.25(78) + 0.35(70) + 0.40x = 75', '19.5 + 24.5 + 0.40x = 75 \\quad\\Rightarrow\\quad 44 + 0.40x = 75', '0.40x = 31 \\quad\\Rightarrow\\quad x = 31 \\div 0.40 = 77.5'] },
      ],
      lines: [
        { say: 'In Sofia’s welding program, assignments count 25 percent, unit tests 35 percent, and the final exam 40 percent. Sofia has 78 percent on assignments and 70 percent on unit tests.', show: ['t.0', 't.1'] },
        { say: 'Sofia needs a final mark of 75 percent to get into the next course. What does Sofia need on the final exam?', show: 't.2', focus: 't.2' },
        { say: 'Let x be the exam mark. Write the weighted mean, and set it equal to 75: 0.25 times 78, plus 0.35 times 70, plus 0.40 x, equals 75.', show: 'm.0', focus: 'm.0' },
        { say: 'Work out the marks Sofia already has. 0.25 times 78 is 19.5, and 0.35 times 70 is 24.5. Together they contribute 44.', show: 'm.1', focus: 'm.1' },
        { say: 'So 44 plus 0.40 x equals 75. Subtract 44 from both sides: 0.40 x equals 31.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by 0.40: x is 31 divided by 0.40, which is 77.5. Sofia needs at least 77.5 percent on the final exam.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.25(78) + 0.35(70) + 0.40(77.5)', '= 19.5 + 24.5 + 31 = 75 \\;\\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'Any exam mark of $77.5\\%$ or more gives a final mark of at least $75\\%$.' },
      ],
      lines: [
        { say: 'Check by putting 77.5 back into the weighted mean.', show: 'm.0', focus: 'm.0' },
        { say: '0.40 times 77.5 is 31. Then 19.5 plus 24.5 plus 31 is exactly 75.', show: 'm.1', focus: 'm.1' },
        { say: 'A higher exam mark gives a higher final mark, so Sofia needs 77.5 percent or more.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping at 31', md: '$31$ is what the exam must **add** to the final mark, not the exam mark itself. The exam counts $40\\%$, so divide by $0.40$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{x = 31}: \\; 44 + 0.40(31) = 44 + 12.4 = 56.4', '\\good{x = 77.5}: \\; 44 + 0.40(77.5) = 44 + 31 = 75 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'A common mistake is to stop at 31, and say that Sofia needs 31 percent on the exam.', show: 'oops' },
        { say: 'But 31 is what the exam must add to the final mark. The exam only counts 40 percent, so a mark of 31 would add just 12.4, for a final mark of 56.4.', show: 'm.0', focus: 'm.0' },
        { say: 'Dividing by 0.40 turns what the exam must add into the mark needed: 77.5 percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Labs count $30\\%$, tests $30\\%$ and the final exam $40\\%$. A student has $80\\%$ on labs and $70\\%$ on tests, and wants a final mark of $80\\%$. What mark is needed on the exam?',
          choices: ['$35\\%$', '$80\\%$', '$87.5\\%$', '$90\\%$'],
          answer: 2,
          working: '$0.30(80) + 0.30(70) + 0.40x = 80$, so $45 + 0.40x = 80$, $0.40x = 35$ and $x = 35 \\div 0.40 = 87.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Labs count 30 percent, tests 30 percent, and the final exam 40 percent. A student has 80 percent on labs and 70 percent on tests, and wants a final mark of 80 percent. What mark is needed on the exam? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The labs give 0.30 times 80, which is 24, and the tests give 0.30 times 70, which is 21: 45 in all. So 0.40 x must be 35, and x is 35 divided by 0.40: 87.5 percent. Choice A stops at 35, which is what the exam must add, not the mark.', show: 'q.answer' },
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
          items: ['Write the weighted mean with $x$ for the unknown mark.', 'Set it equal to the final mark you want, and solve.', 'Divide by the exam’s weight; then check your answer.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find the mark you need, write the weighted mean with x for the unknown mark.', show: 'sum.0' },
        { say: 'Set it equal to the final mark you want, and solve.', show: 'sum.1' },
        { say: 'Remember to divide by the exam’s weight, and check your answer. In the next lesson, we compare one value with a whole group, using percentiles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
