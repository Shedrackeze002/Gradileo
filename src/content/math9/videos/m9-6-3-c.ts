import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-6-3-c',
  lessonId: 'm9-6-3',
  title: 'Solving Problems with Linear Equations, Part 3: Age Problems',
  thumbnailTitle: 'Age Problems',
  thumbnail: false,
  summary:
    'In age problems, a table of ages now and later keeps the expressions straight, and the same number of years is added to every age. Maria is 3 times as old as her brother Kenji, and in 6 years Maria will be twice as old as Kenji: with k for Kenji’s age now, 3k + 6 = 2(k + 6), so 3k + 6 = 2k + 12 and k = 6. Kenji is 6 and Maria is 18; in 6 years they will be 12 and 24, and 24 = 2 × 12.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Equations and Inequalities · Part 3', title: 'Age Problems', subtitle: 'Now and later' }],
      lines: [
        { say: 'Here is a puzzle. Maria is three times as old as her brother Kenji. In six years, Maria will be twice as old as Kenji. How old is each of them now?', show: 'title' },
        { say: 'In this part, you will solve age problems like this one, with a table and an equation.' },
      ],
    },
    {
      chapter: 'A table of ages',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Maria is 3 times as old as her brother Kenji. In 6 years, Maria will be twice as old as Kenji. How old is each of them now?' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Now', 'In 6 years'],
          rows: [
            ['Kenji', '$k$', '$k + 6$'],
            ['Maria', '$3k$', '$3k + 6$'],
          ],
        },
      ],
      lines: [
        { say: 'Maria is three times as old as her brother Kenji. In six years, Maria will be twice as old as Kenji. How old is each of them now?', show: 'q' },
        { say: 'Step one: define a variable. Let k stand for the age of Kenji now, in years. Then Maria is three times that: three k.', show: 't.0', focus: 't.0' },
        { say: 'Step two: in six years, both of them will be six years older. Kenji will be k plus six, and Maria will be three k plus six.', show: 't.1', focus: ['t.0', 't.1'] },
        { say: 'Notice that six is added to every age. Everyone gets older at the same rate.' },
      ],
    },
    {
      chapter: 'Write and solve',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3k + 6 = 2(k + 6)', '3k + 6 = 2k + 12 \\qquad \\text{expand}', 'k + 6 = 12 \\qquad \\text{subtract } 2k', 'k = 6 \\qquad \\text{subtract } 6'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Twice as old', md: '“Maria will be twice as old as Kenji” means Maria’s age $= 2 \\times$ Kenji’s age. Put brackets round $k + 6$.' },
      ],
      lines: [
        { say: 'Step three: write an equation. In six years, Maria will be twice as old as Kenji. So Maria’s age then equals two times Kenji’s age then: three k plus six equals two times k plus six.', show: ['m.0', 'tip'], focus: 'm.0' },
        { say: 'The brackets matter: the whole of Kenji’s age, k plus six, is doubled.' },
        { say: 'Step four: solve. Expand: three k plus six equals two k plus twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract two k from both sides: k plus six equals twelve. Subtract six: k equals six.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Verify and answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Now', 'In 6 years'],
          rows: [
            ['Kenji', '$6$', '$12$'],
            ['Maria', '$18$', '$24$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['18 = 3 \\times 6 \\;\\good{\\checkmark} \\qquad 24 = 2 \\times 12 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'Kenji is 6 years old and Maria is 18 years old.' },
      ],
      lines: [
        { say: 'So Kenji is six now, and Maria is three times six, which is eighteen.', show: 't.0' },
        { say: 'Step five: verify in the words of the problem. In six years, Kenji will be twelve and Maria will be twenty-four.', show: 't.1' },
        { say: 'Is eighteen three times six? Yes. Is twenty-four twice twelve? Yes. Both facts in the problem are true.', show: 'm.0', focus: 'm.0' },
        { say: 'Step six: answer in a sentence. Kenji is six years old, and Maria is eighteen years old. The question asked for both ages, so give both.', show: 'ans' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ana is 4 times as old as Ben. In 5 years, Ana will be 3 times as old as Ben. How old is Ben now?',
          choices: ['$10$', '$15$', '$0$', '$5$'],
          answer: 0,
          working: 'Let $b$ be Ben’s age now. Then $4b + 5 = 3(b + 5)$, so $4b + 5 = 3b + 15$ and $b = 10$. Check: now 10 and 40; in 5 years 15 and 45, and $45 = 3 \\times 15$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ana is four times as old as Ben. In five years, Ana will be three times as old as Ben. How old is Ben now? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, ten. With b for Ben’s age now, four b plus five equals three times b plus five, so b equals ten. In five years they will be fifteen and forty-five, and forty-five is three times fifteen. Choice B adds the five years to Ben only, and not to Ana.', show: 'q.answer' },
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
            'Make a table of ages now and later.',
            'Add the same number of years to every age.',
            '“Twice as old” means $2 \\times$ the other age: use brackets.',
            'Verify every fact in the problem, and give every age it asks for.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Make a table of the ages now and later.', show: 'sum.0' },
        { say: 'Add the same number of years to every age.', show: 'sum.1' },
        { say: 'Twice as old means two times the other age. Use brackets, so the whole age is doubled.', show: 'sum.2' },
        { say: 'And verify every fact in the problem, and give every age it asks for. In the next part, you will solve a problem about perimeters. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
