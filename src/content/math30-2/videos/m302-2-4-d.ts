import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-2-4-d',
  lessonId: 'm302-2-4',
  title: 'Combinations, Part 4: Cases and “At Least”',
  thumbnailTitle: 'Cases and “At Least”',
  summary: 'Counting selections with "at least one": 6 toppings give 2⁶ − 1 = 63 choices with at least one topping, and a group of 4 from 5 adults and 4 teens includes at least one teen in 9C4 − 5C4 = 126 − 5 = 121 ways, checked by adding the cases. Why choosing one teen first and then any 3 others overcounts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Counting Methods · Part 4', title: 'Cases and “At Least”', subtitle: 'Everything, minus the selections with none' }],
      lines: [
        { say: 'A sandwich with at least one topping, or a volunteer group with at least one teen: problems with the words at least hide many cases.', show: 'title' },
        { say: 'In this video, you will count them two ways: by adding the cases, and by the quicker method of counting everything and subtracting the selections with none.' },
      ],
    },
    {
      chapter: 'Toppings',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A sandwich shop offers 6 toppings. A customer must choose at least one topping. How many topping combinations are possible?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Each topping on or off: } 2^6 = 64', '\\text{No toppings: } 1', '64 - 1 = 63', '{}_{6}C_{1} + {}_{6}C_{2} + \\cdots + {}_{6}C_{6} = 6 + 15 + 20 + 15 + 6 + 1 = 63'] },
      ],
      lines: [
        { say: 'A sandwich shop offers six toppings. A customer must choose at least one topping. How many topping combinations are possible?', show: 'p' },
        { say: 'Each topping is either on the sandwich or off it: two choices for each of six toppings. That is two to the sixth, or sixty-four patterns.', show: 'm.0', focus: 'm.0' },
        { say: 'Only one of those patterns has no toppings at all, and it is not allowed.', show: 'm.1', focus: 'm.1' },
        { say: 'So subtract it: sixty-four minus one is sixty-three combinations.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it by cases: one topping, six C one, is six. Two toppings, six C two, is fifteen. Then twenty, fifteen, six and one, for three, four, five and six toppings. They add up to sixty-three as well.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'At least one teen',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A food bank needs 4 volunteers. Five adults and four teens have signed up. How many groups include at least one teen?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{All groups: } {}_{9}C_{4} = 126', '\\text{No teens (adults only): } {}_{5}C_{4} = 5', '\\text{At least one teen: } 126 - 5 = 121'] },
      ],
      lines: [
        { say: 'A food bank needs four volunteers. Five adults and four teens have signed up. How many groups include at least one teen?', show: 'p' },
        { say: 'Count all the groups first. There are nine people, and a group is four of them, in no order: nine C four, which is 126.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the groups you do not want: those with no teens. They are made only of adults, so choose four of the five adults: five C four, which is five.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract: 126 minus five is 121 groups with at least one teen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Checking by cases',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Teens', 'Teens chosen', 'Adults chosen', 'Groups'],
          rows: [
            ['1', '${}_{4}C_{1} = 4$', '${}_{5}C_{3} = 10$', '$40$'],
            ['2', '${}_{4}C_{2} = 6$', '${}_{5}C_{2} = 10$', '$60$'],
            ['3', '${}_{4}C_{3} = 4$', '${}_{5}C_{1} = 5$', '$20$'],
            ['4', '${}_{4}C_{4} = 1$', '${}_{5}C_{0} = 1$', '$1$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['40 + 60 + 20 + 1 = 121'] },
      ],
      lines: [
        { say: 'You can check this by adding the cases. At least one teen means exactly one, two, three or four teens. These cases cannot happen together, so they add.' },
        { say: 'Exactly one teen: choose one of four teens and three of five adults. Four times ten is forty groups.', show: 't.0', focus: 't.0' },
        { say: 'Exactly two teens: six times ten is sixty. Exactly three: four times five is twenty. And all four teens: just one group.', show: ['t.1', 't.2', 't.3'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'Forty plus sixty plus twenty plus one is 121, the same answer. Subtracting the groups with no teens got there in one step.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Choosing “one first, then any others”', md: 'Picking one teen first (${}_{4}C_{1}$) and then any 3 of the other 8 people (${}_{8}C_{3}$) counts a group with two teens **twice**: once for each teen picked first.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{{}_{4}C_{1} \\times {}_{8}C_{3} = 4 \\times 56 = 224}', '\\good{{}_{9}C_{4} - {}_{5}C_{4} = 121}'] },
      ],
      lines: [
        { say: 'A tempting shortcut gives the wrong answer. Make sure there is a teen by picking one teen first, in four ways, and then any three of the other eight people, in eight C three, or fifty-six, ways. That gives 224.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But 224 is far more than the 126 groups there are in all! A group with two teens is counted twice: once with the first teen picked first, and again with the second teen picked first. Groups with more teens are counted even more often.', focus: 'm.0' },
        { say: 'Counting all the groups and subtracting the groups with none counts each group exactly once: 121.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A committee of 3 is chosen from 6 students and 4 teachers. How many committees include at least one teacher?',
          choices: ['$120$', '$20$', '$144$', '$100$'],
          answer: 3,
          working: 'All committees: ${}_{10}C_{3} = 120$. No teachers: ${}_{6}C_{3} = 20$. At least one teacher: $120 - 20 = 100$.',
        },
      ],
      lines: [
        { say: 'Your turn. A committee of three is chosen from six students and four teachers. How many committees include at least one teacher? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one hundred. All the committees: ten C three is 120. Committees with no teachers: six C three is twenty. One hundred and twenty minus twenty is one hundred. Choice C, 144, picks one teacher first and then any two others, which counts committees with two or three teachers more than once.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['“At least one”: all the selections minus the selections with none.', 'Or add the cases: exactly one, exactly two, … It gives the same total.', 'Picking “one first, then any others” counts some groups more than once.'] }],
      lines: [
        { say: 'Let’s sum up. For at least one, count all the selections, and subtract the selections with none.', show: 'sum.0' },
        { say: 'Or add the cases: exactly one, exactly two, and so on. It gives the same total, with more work.', show: 'sum.1' },
        { say: 'And never pick one first and then any others: that counts some groups more than once. That completes this lesson on combinations. See you in the next one!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
