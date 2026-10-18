import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm303-6-3-d',
  lessonId: 'm303-6-3',
  title: 'Percentiles, Part 4: Comparing Percentile Ranks',
  thumbnailTitle: 'Comparing Percentile Ranks',
  thumbnail: false,
  summary: 'Percentile ranks compare people in different groups, even groups of different sizes: Arjun scored 81 in a class of 24 (17 lower, no ties), a percentile rank of about 73, and Talia scored 76 in a class of 32 (24 lower, 1 other the same), about 78, so Talia did better compared with her class despite the lower score.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 4', title: 'Comparing Percentile Ranks', subtitle: 'A fair comparison across groups' }],
      lines: [
        { say: 'Two students wrote the same exam at different colleges. One has the higher score. Did that student do better?', show: 'title' },
        { say: 'Not necessarily. In this video, you will use percentile ranks to compare people in different groups fairly.' },
      ],
    },
    {
      chapter: 'Different groups',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Comparing across groups', md: 'A percentile rank compares each person with **their own group**. So percentile ranks can compare people in different groups, even when the groups are different sizes.' }],
      lines: [
        { say: 'A raw score depends on the group. A class with a tough instructor, or a hard version of a test, may have low scores all round.', show: 'key' },
        { say: 'A percentile rank compares each person with their own group. So percentile ranks let you compare people in different groups, even when the groups are different sizes.' },
      ],
    },
    {
      chapter: 'Two classes',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Arjun and Talia wrote the same welding theory exam at different colleges. Who did better compared with their own class?' },
        {
          kind: 'table',
          id: 't',
          head: ['', 'Arjun', 'Talia'],
          rows: [
            ['Score', '$81$', '$76$'],
            ['Class size, $n$', '$24$', '$32$'],
            ['Scored lower, $b$', '$17$', '$24$'],
            ['Same score, $e$', '$0 + 1 = 1$', '$1 + 1 = 2$'],
          ],
        },
      ],
      lines: [
        { say: 'Arjun and Talia wrote the same welding theory exam at different colleges. Who did better compared with their own class?', show: 'q' },
        { say: 'Arjun scored 81, and Talia scored 76. By raw score, Arjun is ahead.', show: 't.0', focus: 't.0' },
        { say: 'Arjun’s class had 24 students, and Talia’s had 32.', show: 't.1', focus: 't.1' },
        { say: 'In Arjun’s class, seventeen classmates scored lower. In Talia’s class, 24 classmates scored lower.', show: 't.2', focus: 't.2' },
        { say: 'Nobody else in Arjun’s class had a score of 81, so counting Arjun, e is one. One other student in Talia’s class had a score of 76, so counting Talia, e is two.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Two percentile ranks',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Arjun: } PR = \\dfrac{17 + 0.5(1)}{24} \\times 100 = \\dfrac{17.5}{24} \\times 100 \\approx 73', '\\text{Talia: } PR = \\dfrac{24 + 0.5(2)}{32} \\times 100 = \\dfrac{25}{32} \\times 100 \\approx 78'] },
      ],
      lines: [
        { say: 'Now use the formula for each student. For Arjun: seventeen, plus 0.5 times one, is 17.5. Divided by 24, that is about 0.729, and times 100, about 73.', show: 'm.0', focus: 'm.0' },
        { say: 'For Talia: 24, plus 0.5 times two, is 25. Divided by 32, that is about 0.781, and times 100, about 78.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Who did better?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Talia did better', md: 'Compared with their own classes, Talia (PR $78$) did better than Arjun (PR $73$), even though Arjun had the higher score.' },
        { kind: 'text', id: 't', size: 'md', md: 'In Talia’s class, a score of $76$ was ahead of a larger share of classmates.' },
      ],
      lines: [
        { say: 'Talia’s percentile rank, 78, is higher than Arjun’s, 73. So compared with their own classes, Talia did better, even though Arjun had the higher score.', show: 'key' },
        { say: 'How can that be? Talia’s class seems to have found the exam harder, so a score of 76 put Talia ahead of a larger share of classmates.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing raw scores across groups', md: 'A higher score in one group does not mean a better result than a lower score in another group. Compare **percentile ranks**, which measure each person against their own group.' }],
      lines: [
        { say: 'A common mistake is to compare raw scores from different groups, and decide that the higher score is the better result.', show: 'oops' },
        { say: 'Scores from different groups are not measured against the same people. Compare percentile ranks instead, because each one measures a person against their own group.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Maya scored $68$ in a group of $25$: $18$ scored lower, and no one else had that score. Leo scored $74$ in a group of $40$: $25$ scored lower, and $1$ other had that score. Who did better compared with their own group?',
          choices: ['Leo, with the higher score', 'Maya: PR $74$ against $65$', 'Leo: PR $74$ against $65$', 'Neither: the ranks are equal'],
          answer: 1,
          working: 'Maya: $\\dfrac{18 + 0.5(1)}{25} \\times 100 = 74$. Leo: $\\dfrac{25 + 0.5(2)}{40} \\times 100 = 65$. Maya has the higher percentile rank.',
        },
      ],
      lines: [
        { say: 'Your turn. Maya scored 68 in a group of 25. Eighteen scored lower, and no one else had that score. Leo scored 74 in a group of 40. Twenty-five scored lower, and one other had that score. Who did better compared with their own group? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Maya’s rank is eighteen plus a half, which is 18.5, over 25, times 100: 74. Leo’s is 25 plus one, which is 26, over 40, times 100: 65. Choice A compares the raw scores, but the groups are different, so compare the percentile ranks.', show: 'q.answer' },
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
          items: ['A percentile rank compares a person with their own group.', 'Use percentile ranks, not raw scores, to compare people in different groups.', 'Groups can be different sizes: the formula divides by each group’s $n$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A percentile rank compares a person with their own group.', show: 'sum.0' },
        { say: 'So use percentile ranks, not raw scores, to compare people in different groups.', show: 'sum.1' },
        { say: 'And the groups can be different sizes, because the formula divides by each group’s own n. That completes this lesson on percentiles. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
